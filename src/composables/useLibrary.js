import { ref, computed, watch } from 'vue'
import { questionsConfig } from '@/config/questions.config.js'

// 使用 ref 存储配置，支持热更新
const configRef = ref(questionsConfig || { tags: [], questions: [] })

// 当前 OJ 判题 Worker，可被终止
let currentWorker = null
let currentResolve = null

// 响应式状态
const questions = computed(() => configRef.value.questions || [])
const tags = computed(() => configRef.value.tags || [])

const selectedTagIds = ref([])
const selectedDifficulty = ref('all')
const selectedType = ref('all')
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

// 递归扁平化标签树
function flattenTags(tree, result = []) {
  tree.forEach(t => {
    result.push(t)
    if (t.children && t.children.length > 0) {
      flattenTags(t.children, result)
    }
  })
  return result
}

export function useLibrary() {
  // 扁平化后的所有标签
  const flatTags = computed(() => flattenTags(tags.value))

  // 标签映射（包含子标签）
  const tagMap = computed(() => {
    const map = {}
    flatTags.value.forEach(t => { map[t.id] = t })
    return map
  })

  // 标签名搜索关键词（弹窗内用）
  const tagSearchKeyword = ref('')

  // 根据关键词过滤后的标签树（用于弹窗展示）
  const filteredTagTree = computed(() => {
    const kw = tagSearchKeyword.value.trim().toLowerCase()
    if (!kw) return tags.value

    // 先找出匹配的标签及其所有祖先
    const matchedIds = new Set()
    flatTags.value.forEach(t => {
      if (t.name.toLowerCase().includes(kw)) {
        matchedIds.add(t.id)
        // 向上回溯祖先
        let parent = flatTags.value.find(p => p.children?.some(c => c.id === t.id))
        while (parent) {
          matchedIds.add(parent.id)
          parent = flatTags.value.find(p => p.children?.some(c => c.id === parent.id))
        }
      }
    })

    // 递归过滤树，保留匹配节点及其路径
    function filterTree(nodes) {
      return nodes.map(node => {
        const children = node.children ? filterTree(node.children) : []
        if (matchedIds.has(node.id) || children.length > 0) {
          return { ...node, children }
        }
        return null
      }).filter(Boolean)
    }

    return filterTree(tags.value)
  })

  // 已选标签的完整对象列表
  const selectedTags = computed(() => {
    return selectedTagIds.value.map(id => tagMap.value[id]).filter(Boolean)
  })

  // 筛选后的题目
  const filteredQuestions = computed(() => {
    let result = questions.value

    // 按类型筛选
    if (selectedType.value !== 'all') {
      result = result.filter(q => q.type === selectedType.value)
    }

    // 按难度筛选
    if (selectedDifficulty.value !== 'all') {
      result = result.filter(q => q.difficulty === selectedDifficulty.value)
    }

    // 按标签筛选（多选，满足任一即可）
    if (selectedTagIds.value.length > 0) {
      result = result.filter(q => {
        const qTags = Array.isArray(q.tags) ? q.tags : []
        // 统一转为字符串比较，解决类型不一致问题（题目tags是字符串数组，标签id是数字）
        const selectedStr = selectedTagIds.value.map(String)
        const qTagsStr = qTags.map(String)
        return selectedStr.some(id => qTagsStr.includes(id))
      })
    }

    // 按关键词搜索（支持标题、编号 Txxx 或纯数字 id）
    if (searchKeyword.value.trim()) {
      const kw = searchKeyword.value.trim().toLowerCase()
      result = result.filter(q => {
        const matchTitle = q.title.toLowerCase().includes(kw)
        const matchId = String(q.id).toLowerCase().includes(kw)
        const matchTid = (`T${q.id}`).toLowerCase().includes(kw)
        return matchTitle || matchId || matchTid
      })
    }

    return result
  })

  const paginatedQuestions = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return filteredQuestions.value.slice(start, start + pageSize.value)
  })

  const totalPages = computed(() => Math.ceil(filteredQuestions.value.length / pageSize.value))

  function goToPage(page) {
    currentPage.value = Math.max(1, Math.min(page, totalPages.value || 1))
  }

  function nextPage() { goToPage(currentPage.value + 1) }
  function prevPage() { goToPage(currentPage.value - 1) }

  watch([selectedTagIds, selectedDifficulty, selectedType, searchKeyword], () => {
    currentPage.value = 1
  })

  // 根据 ID 获取题目
  function getQuestionById(id) {
    const numId = Number(id)
    return questions.value.find(q => q.id === numId)
  }

  // 题目统计（通过/尝试）
  const questionStats = ref({})

  async function loadStats() {
    try {
      const res = await fetch('/api/library/stats')
      if (!res.ok) return
      const { data } = await res.json()
      const map = {}
      data.forEach(s => {
        map[s.question_id] = {
          attempts: Number(s.attempts) || 0,
          passed: Number(s.passed) || 0
        }
      })
      questionStats.value = map
    } catch (e) {
      console.log('统计加载失败', e)
    }
  }

  // 重新加载配置（刷新页面时调用）
  async function reload() {
    await loadStats()
  }

  // 初始化加载统计
  loadStats()

  // 选择题本地判分
  function judgeChoice(question, selectedIndex) {
    const choices = question.choices || []
    if (selectedIndex < 0 || selectedIndex >= choices.length) {
      return { correct: false, answer: -1, score: 0, earnedScore: 0, totalScore: 100 }
    }
    const correctIndex = choices.findIndex(c => c.isCorrect)
    const isCorrect = choices[selectedIndex].isCorrect
    return {
      correct: isCorrect,
      answer: correctIndex,
      score: isCorrect ? 100 : 0,
      earnedScore: isCorrect ? 100 : 0,
      totalScore: 100
    }
  }

  // 编程题 OJ 判题（前端 Worker 运行）
  function judgeProgram(question, code) {
    return new Promise((resolve) => {
      const testCases = question.testCases || []
      if (!testCases.length || !code.trim()) {
        resolve({ status: 'error', score: 0, results: [], earnedScore: 0, totalScore: 0 })
        return
      }

      // 终止之前的 worker
      if (currentWorker) currentWorker.terminate()
      const worker = new Worker('/skulpt-oj.worker.js')
      currentWorker = worker

      const results = []
      let earnedScore = 0
      let totalScore = 0
      let done = false

      const cleanup = () => {
        worker.terminate()
        if (currentWorker === worker) currentWorker = null
      }

      const safeResolve = (data) => {
        if (!done) { done = true; cleanup(); resolve(data) }
      }

      currentResolve = safeResolve

      worker.onmessage = (e) => {
        if (done) return
        const { type, index, passed, actualOutput, error, status, score, message } = e.data

        if (type === 'ready') {
          worker.postMessage({ type: 'run', code, testCases: JSON.parse(JSON.stringify(testCases)) })
          return
        }

        if (type === 'result') {
          const tc = testCases[index]
          const tcScore = Number(tc?.score) || 0
          totalScore += tcScore
          if (passed) earnedScore += tcScore
          results[index] = {
            input: tc?.input || '',
            expectedOutput: tc?.expectedOutput || '',
            actualOutput,
            passed,
            error: error || ''
          }
          return
        }

        if (type === 'done') {
          safeResolve({ status, score, results, earnedScore, totalScore })
          return
        }

        if (type === 'error') {
          safeResolve({ status: 'error', score: 0, results, earnedScore: 0, totalScore, error: message })
        }
      }

      worker.onerror = () => {
        if (done) return
        safeResolve({ status: 'error', score: 0, results, earnedScore: 0, totalScore })
      }

      // 超时保护：60秒强制终止
      setTimeout(() => {
        if (!done) { done = true; cleanup(); resolve({ status: 'timeout', score: 0, results, earnedScore, totalScore, error: '判题超时' }) }
      }, 60000)
    })
  }

  // 强制终止当前判题 Worker
  function stopJudge() {
    if (currentWorker) {
      currentWorker.terminate()
      currentWorker = null
    }
    if (currentResolve) {
      currentResolve({ status: 'stopped', score: 0, results: [], earnedScore: 0, totalScore: 0 })
      currentResolve = null
    }
  }

  return {
    questions,
    tags,
    flatTags,
    tagMap,
    tagSearchKeyword,
    filteredTagTree,
    selectedTags,
    selectedTagIds,
    selectedDifficulty,
    selectedType,
    searchKeyword,
    filteredQuestions,
    paginatedQuestions,
    totalPages,
    currentPage,
    pageSize,
    goToPage,
    nextPage,
    prevPage,
    questionStats,
    getQuestionById,
    reload,
    judgeChoice,
    judgeProgram,
    stopJudge
  }
}
