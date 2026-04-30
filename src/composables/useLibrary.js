import { ref, computed } from 'vue'

// 使用 ref 存储配置，支持热更新
const configRef = ref({ tags: [], questions: [] })

async function loadStaticConfig() {
  try {
    // 使用绝对路径 + 时间戳绕过 Vite 模块缓存
    const mod = await import(`/src/config/questions.config.js?t=${Date.now()}`)
    const cfg = mod.questionsConfig || mod.default || { tags: [], questions: [] }
    configRef.value = cfg
  } catch (e) {
    console.log('题库静态配置未找到，使用空数据', e)
    configRef.value = { tags: [], questions: [] }
  }
}

// 立即尝试加载
loadStaticConfig()

// 响应式状态
const questions = computed(() => configRef.value.questions || [])
const tags = computed(() => configRef.value.tags || [])

const selectedTagIds = ref([])
const selectedDifficulty = ref('all')
const selectedType = ref('all')
const searchKeyword = ref('')

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
        return selectedTagIds.value.some(id => qTags.includes(id))
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

  // 重新加载配置
  async function reload() {
    await loadStaticConfig()
    await loadStats()
  }

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

  // 编程题本地判分（前端 Skulpt 运行）
  async function judgeProgram(question, code) {
    const testCases = question.testCases || []
    if (!testCases.length || !code.trim()) {
      return { status: 'error', score: 0, results: [] }
    }

    // 等待 Skulpt 加载
    if (typeof window.Sk === 'undefined' || typeof window.Sk.builtinFiles === 'undefined') {
      return { status: 'error', score: 0, results: [], error: 'Python 环境尚未加载完成，请稍后再试' }
    }

    const results = []
    let passedCount = 0
    let earnedScore = 0
    let totalScore = 0

    for (const tc of testCases) {
      let actualOutput = ''
      let error = ''

      try {
        function outf(text) {
          actualOutput += text
        }

        function builtinRead(x) {
          if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined) {
            throw "File not found: '" + x + "'"
          }
          return Sk.builtinFiles['files'][x]
        }

        // 重定向输入（按行分割，每次 input() 取下一行）
        const inputLines = (tc.input || '').split('\n')
        let lineIndex = 0
        Sk.configure({
          output: outf,
          read: builtinRead,
          inputfun: () => {
            const line = inputLines[lineIndex] || ''
            lineIndex++
            return line
          },
          inputfunTakesPrompt: false,
          execLimit: 500
        })

        // 运行学生代码
        await Sk.misceval.asyncToPromise(function() {
          return Sk.importMainWithBody('<stdin>', false, code, true)
        })

      } catch (err) {
        error = err.toString() || String(err)
      }

      const tcScore = Number(tc.score) || 0
      totalScore += tcScore

      const passed = !error && actualOutput.trim() === (tc.expectedOutput || '').trim()
      if (passed) {
        passedCount++
        earnedScore += tcScore
      }

      results.push({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: actualOutput.trim(),
        passed,
        error
      })
    }

    // 如果设置了分值，按累加分值计算；否则按通过比例
    const score = totalScore > 0 ? Math.round((earnedScore / totalScore) * 100) : Math.round((passedCount / testCases.length) * 100)
    const status = passedCount === testCases.length ? 'passed' : 'failed'

    console.log('[judgeProgram]', { totalScore, earnedScore, score, status, testCaseScores: testCases.map(tc => tc.score) })

    return { status, score, results, earnedScore, totalScore }
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
    questionStats,
    getQuestionById,
    reload,
    judgeChoice,
    judgeProgram
  }
}
