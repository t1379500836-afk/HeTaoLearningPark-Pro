<template>
  <div class="ycl-practice-view">
    <!-- 悬浮返回按钮 -->
    <button class="floating-back-btn" @click="goBack" aria-label="返回上一页">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>

    <!-- 面包屑导航 -->
    <nav class="breadcrumb">
      <router-link :to="prefixedPath('/ycl')">YCL专区</router-link>
      <span class="separator">/</span>
      <span class="current">{{ levelInfoData?.fullName || '练习' }}</span>
    </nav>

    <!-- 等级信息头部 -->
    <header class="level-header">
      <div class="level-info">
        <h1>{{ levelInfoData?.fullName }}</h1>
        <p class="level-desc">{{ levelInfoData?.description }}</p>
      </div>
      <div class="level-badge">{{ levelInfoData?.name }}</div>
    </header>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="error-state">
      <p>⚠️ {{ error }}</p>
      <button @click="loadData" class="retry-btn">重试</button>
    </div>

    <!-- 无权限 -->
    <div v-else-if="!hasAccess" class="no-access">
      <div class="lock-icon">🔒</div>
      <h2>暂无访问权限</h2>
      <p>您当前的学习阶段暂未解锁{{ levelInfoData?.fullName }}练习</p>
      <router-link :to="prefixedPath('/ycl')" class="back-btn">返回专区</router-link>
    </div>

    <!-- 主内容区 -->
    <template v-else>
      <!-- 入口选择区 -->
      <div v-if="!currentMode" class="mode-selection">
        <h2>🎯 选择学习方式</h2>
        <p class="selection-desc">根据你的需求选择合适的学习路径</p>
        <div class="mode-cards">
          <!-- 考点复习入口 -->
          <div class="mode-card review-card" @click="currentMode = 'review'">
            <div class="mode-icon">📚</div>
            <h3>考点复习</h3>
            <p>系统复习必考知识点，掌握核心考点</p>
            <ul class="mode-features">
              <li>✅ 必考知识点详解</li>
              <li>✅ 理论+代码示例</li>
              <li>✅ 分值占比分析</li>
            </ul>
            <button class="mode-btn">开始复习</button>
          </div>

          <!-- 练习套卷入口 -->
          <div class="mode-card practice-card" @click="currentMode = 'practice'">
            <div class="mode-icon">📝</div>
            <h3>练习套卷</h3>
            <p>模拟真实考试，检验学习成果</p>
            <ul class="mode-features">
              <li>✅ 真题模拟练习</li>
              <li>✅ 计时测试模式</li>
              <li>✅ 评分与解析</li>
            </ul>
            <button class="mode-btn">开始练习</button>
          </div>
        </div>
      </div>

      <!-- 考点复习模式 -->
      <div v-else-if="currentMode === 'review'" class="review-mode">
        <div class="mode-header">
          <button class="back-to-selection" @click="currentMode = null">
            ← 返回选择
          </button>
          <h2>📚 考点复习</h2>
        </div>

        <!-- 复习进度 -->
        <div class="review-progress">
          <div class="progress-info">
            <span>复习进度：{{ reviewedPoints.length }} / {{ allKnowledgePoints.length }}</span>
            <span class="progress-percent">{{ reviewProgress }}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: reviewProgress + '%' }"></div>
          </div>
        </div>

        <!-- 知识点列表 -->
        <div class="knowledge-points-list">
          <div
            v-for="(kp, index) in allKnowledgePoints"
            :key="kp.id"
            class="kp-detail-card"
            :class="{ reviewed: reviewedPoints.includes(kp.id) }"
          >
            <div class="kp-card-header" @click="toggleKnowledgePoint(kp.id)">
              <div class="kp-left">
                <span class="kp-number">{{ index + 1 }}</span>
                <div class="kp-title-area">
                  <h4>{{ kp.name }}</h4>
                  <div class="kp-tags">
                    <!-- 显示客观题和编程题的考情 -->
                    <span class="kp-tag objective" v-if="kp.examStatus?.objective">
                      选择: {{ kp.examStatus.objective }}
                    </span>
                    <span class="kp-tag coding" v-if="kp.examStatus?.coding && kp.examStatus.coding !== '-'">
                      编程: {{ kp.examStatus.coding }}
                    </span>
                    <!-- 兼容旧数据格式 -->
                    <span class="kp-tag" :class="getImportanceClass(kp)" v-if="!kp.examStatus?.objective && !kp.examStatus?.coding">
                      {{ kp.examStatus || '选考' }}
                    </span>
                    <span v-if="kp.scoreRange" class="kp-score">
                      {{ kp.scoreRange[0] }}-{{ kp.scoreRange[1] }}分
                    </span>
                  </div>
                </div>
              </div>
              <div class="kp-right">
                <span class="expand-icon" :class="{ expanded: expandedPoint === kp.id }">▼</span>
              </div>
            </div>

            <!-- 展开的知识点详情 -->
            <div v-if="expandedPoint === kp.id" class="kp-detail-content">
              <!-- 理论讲解 -->
              <div class="theory-section" v-if="getTheoryContent(kp)">
                <h5>📖 知识讲解</h5>
                <div class="theory-content" v-html="getTheoryContent(kp)"></div>
              </div>

              <!-- 复习位置提示 -->
              <div class="review-location" v-if="kp.reviewLocation">
                <span class="location-icon">📍</span>
                <span>正课位置：{{ kp.reviewLocation }}</span>
              </div>

              <!-- 标记已复习按钮 -->
              <div class="kp-actions">
                <button
                  v-if="!reviewedPoints.includes(kp.id)"
                  class="mark-reviewed-btn"
                  @click.stop="markAsReviewed(kp.id)"
                >
                  ✓ 标记为已复习
                </button>
                <button
                  v-else
                  class="reviewed-btn"
                  @click.stop="unmarkAsReviewed(kp.id)"
                >
                  ✓ 已复习
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 复习完毕按钮 -->
        <div class="review-complete-section" v-if="reviewedPoints.length > 0">
          <button class="review-complete-btn" @click="goToExam">
            🎯 复习完毕，进入模拟考试
          </button>
        </div>
      </div>

      <!-- 练习套卷模式 -->
      <div v-else-if="currentMode === 'practice'" class="practice-mode">
        <div class="mode-header">
          <button class="back-to-selection" @click="currentMode = null">
            ← 返回选择
          </button>
          <h2>📝 练习套卷</h2>
        </div>

        <div class="sets-grid">
          <div
            v-for="set in practiceSets"
            :key="set.id"
            class="set-card"
            :class="{ locked: set.status === 'pending', completed: setRecords[set.id] }"
            @click="startPractice(set)"
          >
            <div class="set-header">
              <span class="set-difficulty" :class="set.difficulty">
                {{ getDifficultyText(set.difficulty) }}
              </span>
              <span v-if="set.status === 'pending'" class="set-status">即将开放</span>
              <span v-else-if="setRecords[set.id]" class="set-status completed">已完成</span>
            </div>
            <h3 class="set-name">{{ set.name }}</h3>
            <p class="set-desc">{{ set.description }}</p>
            <div class="set-meta">
              <span class="meta-item">
                <span class="icon">⏱️</span>
                {{ set.duration || 90 }}分钟
              </span>
              <span class="meta-item">
                <span class="icon">📊</span>
                {{ set.totalScore || 100 }}分
              </span>
            </div>

            <!-- 统一信息区域 -->
            <div class="set-record">
              <div class="record-item">
                <span class="record-label">选择题得分</span>
                <span v-if="setRecords[set.id]" class="record-score" :class="{ pass: (setRecords[set.id].objectiveScore || 0) >= 30 }">
                  {{ setRecords[set.id].objectiveScore || 0 }}/{{ setRecords[set.id].objectiveTotal || 45 }}
                </span>
                <span v-else class="record-empty">暂无数据</span>
              </div>
              <div class="record-item">
                <span class="record-label">编程题</span>
                <span v-if="setRecords[set.id]" class="record-time">请找老师核对</span>
                <span v-else class="record-empty">暂无数据</span>
              </div>
              <div class="record-item">
                <span class="record-label">完成时间</span>
                <span v-if="setRecords[set.id]" class="record-time">{{ formatTime(setRecords[set.id].submitTime) }}</span>
                <span v-else class="record-empty">暂无数据</span>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="set-actions">
              <button
                v-if="set.status === 'available' && setRecords[set.id]"
                class="review-btn"
                @click.stop="viewReview(set)"
              >
                查看解析
              </button>
              <button
                v-if="set.status === 'available'"
                class="start-btn"
                :class="{ 'has-record': setRecords[set.id] }"
                @click.stop="startPractice(set)"
              >
                {{ setRecords[set.id] ? '重新练习' : '开始练习' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCurrentPrefix, prefixedPath as buildPrefixedPath } from '@/composables/useRoutePrefix.js'
import { levelInfo, canAccessLevel, getKnowledgePointsByLevel } from '@/data/courses/YCL/config/knowledge-points.js'
import { getSetListByLevel } from '@/data/courses/YCL/index.js'
import { getTheoryByKnowledgePoint } from '@/data/courses/YCL/config/theory.js'
import { getLevelRecords, formatTime } from '@/data/courses/YCL/utils/examRecord.js'

const route = useRoute()
const router = useRouter()

// 状态
const loading = ref(true)
const error = ref(null)
const practiceSets = ref([])
const setRecords = ref({})  // 套卷记录（缓存，避免重复调用）
const expandedPoint = ref(null)
const reviewedPoints = ref([])

// 从 URL query 参数读取当前模式，实现状态持久化
const currentMode = computed({
  get: () => route.query.mode || null, // null | 'review' | 'practice'
  set: (value) => {
    const newQuery = { ...route.query }
    if (value) {
      newQuery.mode = value
    } else {
      delete newQuery.mode
    }
    router.replace({ query: newQuery })
  }
})

// 获取当前路由前缀
const currentPrefix = computed(() => getCurrentPrefix(route))

// 获取当前等级
const currentLevel = computed(() => {
  const level = route.params.level
  if (level?.startsWith('level')) {
    return level
  }
  return `level${level}`
})

// 获取等级信息
const levelInfoData = computed(() => levelInfo[currentLevel.value])

// 检查访问权限
const hasAccess = computed(() => {
  return canAccessLevel(currentLevel.value, currentPrefix.value)
})

// 获取所有知识点
const allKnowledgePoints = computed(() => {
  return getKnowledgePointsByLevel(currentLevel.value)
})

// 复习进度
const reviewProgress = computed(() => {
  if (allKnowledgePoints.value.length === 0) return 0
  return Math.round((reviewedPoints.value.length / allKnowledgePoints.value.length) * 100)
})

// 构建带前缀的路径
function prefixedPath(path) {
  return buildPrefixedPath(currentPrefix.value, path)
}

// 获取难度文本
function getDifficultyText(difficulty) {
  const map = {
    basic: '基础',
    advanced: '进阶',
    expert: '提升'
  }
  return map[difficulty] || difficulty
}

// 获取重要性样式类
function getImportanceClass(kp) {
  if (kp.examStatus === '必考') return 'required'
  if (kp.importance >= 4) return 'important'
  return 'optional'
}

// 简单的 Markdown 转 HTML 函数
function markdownToHtml(markdown) {
  if (!markdown) return ''

  // 1. 先处理代码块，用占位符替换
  const codeBlocks = []
  let html = markdown.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const escapedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`
    codeBlocks.push(`<pre><code class="language-${lang || 'python'}">${escapedCode}</code></pre>`)
    return placeholder
  })

  // 2. 处理行内代码，用占位符替换
  const inlineCodes = []
  html = html.replace(/`([^`]+)`/g, (match, code) => {
    const placeholder = `__INLINE_CODE_${inlineCodes.length}__`
    inlineCodes.push(`<code>${code}</code>`)
    return placeholder
  })

  // 3. 按行处理
  const lines = html.split('\n')
  const result = []
  let inTable = false
  let tableRows = []
  let inList = false
  let listItems = []
  let inParagraph = false
  let paragraphContent = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()

    // 空行
    if (trimmedLine === '') {
      if (inTable) {
        // 结束表格
        result.push(buildTable(tableRows))
        inTable = false
        tableRows = []
      }
      if (inList) {
        // 结束列表
        result.push('<ul>' + listItems.join('') + '</ul>')
        inList = false
        listItems = []
      }
      if (inParagraph) {
        result.push('<p>' + paragraphContent.join(' ') + '</p>')
        inParagraph = false
        paragraphContent = []
      }
      continue
    }

    // 代码块占位符 - 直接输出
    if (trimmedLine.startsWith('__CODE_BLOCK_')) {
      const idx = parseInt(trimmedLine.match(/__CODE_BLOCK_(\d+)__/)[1])
      result.push(codeBlocks[idx])
      continue
    }

    // 标题
    if (trimmedLine.startsWith('### ')) {
      if (inTable) { result.push(buildTable(tableRows)); inTable = false; tableRows = [] }
      if (inList) { result.push('<ul>' + listItems.join('') + '</ul>'); inList = false; listItems = [] }
      if (inParagraph) { result.push('<p>' + paragraphContent.join(' ') + '</p>'); inParagraph = false; paragraphContent = [] }
      result.push('<h3>' + trimmedLine.slice(4) + '</h3>')
      continue
    }
    if (trimmedLine.startsWith('## ')) {
      if (inTable) { result.push(buildTable(tableRows)); inTable = false; tableRows = [] }
      if (inList) { result.push('<ul>' + listItems.join('') + '</ul>'); inList = false; listItems = [] }
      if (inParagraph) { result.push('<p>' + paragraphContent.join(' ') + '</p>'); inParagraph = false; paragraphContent = [] }
      result.push('<h2>' + trimmedLine.slice(3) + '</h2>')
      continue
    }

    // 表格行
    if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
      if (inList) { result.push('<ul>' + listItems.join('') + '</ul>'); inList = false; listItems = [] }
      if (inParagraph) { result.push('<p>' + paragraphContent.join(' ') + '</p>'); inParagraph = false; paragraphContent = [] }
      inTable = true
      tableRows.push(trimmedLine)
      continue
    }

    // 列表项
    if (trimmedLine.startsWith('- ')) {
      if (inTable) { result.push(buildTable(tableRows)); inTable = false; tableRows = [] }
      if (inParagraph) { result.push('<p>' + paragraphContent.join(' ') + '</p>'); inParagraph = false; paragraphContent = [] }
      inList = true
      listItems.push('<li>' + trimmedLine.slice(2) + '</li>')
      continue
    }

    // 普通文本
    if (inTable) { result.push(buildTable(tableRows)); inTable = false; tableRows = [] }
    if (inList) { result.push('<ul>' + listItems.join('') + '</ul>'); inList = false; listItems = [] }
    inParagraph = true
    paragraphContent.push(trimmedLine)
  }

  // 处理末尾状态
  if (inTable) result.push(buildTable(tableRows))
  if (inList) result.push('<ul>' + listItems.join('') + '</ul>')
  if (inParagraph && paragraphContent.length > 0) result.push('<p>' + paragraphContent.join(' ') + '</p>')

  // 4. 合并结果
  html = result.join('\n')

  // 5. 恢复行内代码占位符
  inlineCodes.forEach((code, idx) => {
    html = html.replace(`__INLINE_CODE_${idx}__`, code)
  })

  // 6. 处理 ** 加粗语法（排除数字之间的幂运算符）
  // 只处理 **文字** 的模式，不处理 2**3 这样的数字运算
  html = html.replace(/(?<![0-9])\*\*([^*]+?)\*\*(?![0-9])/g, '<strong>$1</strong>')

  return html
}

// 构建表格 HTML
function buildTable(rows) {
  if (rows.length < 2) return rows.join('\n')

  let html = '<table>\n'
  let isFirst = true

  for (const row of rows) {
    const cells = row.slice(1, -1).split('|').map(c => c.trim())

    // 跳过分隔行
    if (cells.every(c => /^[-:]+$/.test(c))) {
      isFirst = false
      continue
    }

    if (isFirst) {
      html += '<thead><tr>'
      cells.forEach(cell => { html += `<th>${cell}</th>` })
      html += '</tr></thead><tbody>'
      isFirst = false
    } else {
      html += '<tr>'
      cells.forEach(cell => { html += `<td>${cell}</td>` })
      html += '</tr>'
    }
  }

  html += '</tbody></table>'
  return html
}

// 获取理论内容（转换为 HTML）
function getTheoryContent(kp) {
  const theory = getTheoryByKnowledgePoint(currentLevel.value, kp.id)
  if (theory && theory.content) {
    return markdownToHtml(theory.content)
  }
  return null
}

// 切换知识点展开状态
function toggleKnowledgePoint(kpId) {
  expandedPoint.value = expandedPoint.value === kpId ? null : kpId
}

// 标记为已复习
function markAsReviewed(kpId) {
  if (!reviewedPoints.value.includes(kpId)) {
    reviewedPoints.value.push(kpId)
    saveReviewedPoints()
  }
}

// 取消复习标记
function unmarkAsReviewed(kpId) {
  const index = reviewedPoints.value.indexOf(kpId)
  if (index > -1) {
    reviewedPoints.value.splice(index, 1)
    saveReviewedPoints()
  }
}

// 保存复习进度到本地存储
function saveReviewedPoints() {
  localStorage.setItem(`ycl_review_${currentLevel.value}`, JSON.stringify(reviewedPoints.value))
}

// 加载复习进度
function loadReviewedPoints() {
  try {
    const saved = localStorage.getItem(`ycl_review_${currentLevel.value}`)
    if (saved) {
      reviewedPoints.value = JSON.parse(saved)
    }
  } catch (e) {
    console.error('加载复习进度失败', e)
  }
}

// 加载考试记录
function loadExamRecords() {
  const records = getLevelRecords(currentLevel.value)
  setRecords.value = records || {}
}

// 加载数据
async function loadData() {
  loading.value = true
  error.value = null

  try {
    // 获取套卷列表
    const sets = getSetListByLevel(currentLevel.value)
    practiceSets.value = sets
    // 加载复习进度
    loadReviewedPoints()
    // 加载考试记录
    loadExamRecords()
  } catch (err) {
    error.value = '加载数据失败'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// 开始练习
function startPractice(set) {
  if (set.status !== 'available') return

  router.push({
    path: prefixedPath(`/ycl/exam/${currentLevel.value}/${set.id}`)
  })
}

// 查看解析
function viewReview(set) {
  router.push({
    path: prefixedPath(`/ycl/exam/${currentLevel.value}/${set.id}`),
    query: { review: 'true' }
  })
}

// 复习完毕，进入考试
function goToExam() {
  // 找到第一个可用的套卷
  const availableSet = practiceSets.value.find(s => s.status === 'available')
  if (availableSet) {
    router.push({
      path: prefixedPath(`/ycl/exam/${currentLevel.value}/${availableSet.id}`)
    })
  }
}

// 返回上一级
function goBack() {
  if (currentMode.value) {
    // 如果当前在复习或练习模式，返回到选择学习方式页
    const newQuery = { ...route.query }
    delete newQuery.mode
    router.replace({ query: newQuery })
  } else {
    // 如果在选择学习方式页，返回 YCL 专区首页
    router.push(prefixedPath('/ycl'))
  }
}

// 监听路由变化
watch(() => route.params.level, (newLevel, oldLevel) => {
  // 等级变化时清除模式和展开状态（跳过首次加载）
  // oldLevel 为 undefined 表示是首次加载，此时应保留 URL 中的 mode 参数
  if (oldLevel !== undefined && newLevel !== oldLevel) {
    // 通过 router.replace 清除 query.mode
    if (route.query.mode) {
      const newQuery = { ...route.query }
      delete newQuery.mode
      router.replace({ query: newQuery })
    }
    expandedPoint.value = null
    reviewedPoints.value = []
  }
  loadData()
}, { immediate: true })

// 注意：watch immediate:true 已处理首次加载，无需在 onMounted 中重复调用 loadData
</script>

<style scoped>
.ycl-practice-view {
  min-height: 100vh;
  padding: 20px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding-bottom: 100px;
  box-sizing: border-box;
}

/* 悬浮返回按钮 */
.floating-back-btn {
  position: fixed;
  bottom: 30px;
  left: 30px;
  width: 56px;
  height: 56px;
  background: #667eea;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all 0.3s ease;
  z-index: 1000;
}

.floating-back-btn:hover {
  background: #5a6fd6;
  transform: scale(1.1);
  box-shadow: 0 6px 24px rgba(102, 126, 234, 0.5);
}

.floating-back-btn:active {
  transform: scale(0.95);
}

/* 面包屑导航 */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 25px;
  font-size: 0.9rem;
}

.breadcrumb a {
  color: #667eea;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.breadcrumb .separator {
  color: #ccc;
}

.breadcrumb .current {
  color: #666;
}

/* 等级头部 */
.level-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 16px;
  margin-bottom: 30px;
}

.level-info h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.level-desc {
  opacity: 0.9;
  font-size: 1rem;
}

.level-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 25px;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: 600;
}

/* 加载状态 */
.loading-state {
  text-align: center;
  padding: 60px 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 错误状态 */
.error-state {
  text-align: center;
  padding: 60px 20px;
  background: #fff5f5;
  border-radius: 12px;
}

.retry-btn {
  margin-top: 15px;
  padding: 10px 30px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
}

/* 无权限 */
.no-access {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.lock-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.no-access h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

.no-access p {
  color: #666;
  margin-bottom: 25px;
}

.back-btn {
  display: inline-block;
  padding: 12px 30px;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 500;
}

/* 入口选择区 */
.mode-selection {
  text-align: center;
}

.mode-selection h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 10px;
}

.selection-desc {
  color: #666;
  margin-bottom: 30px;
}

.mode-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.mode-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
}

.mode-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.mode-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.mode-card h3 {
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 10px;
}

.mode-card > p {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.mode-features {
  list-style: none;
  padding: 0;
  margin: 0 0 25px 0;
}

.mode-features li {
  padding: 8px 0;
  color: #555;
  font-size: 0.95rem;
}

.mode-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.3s;
}

.mode-btn:hover {
  opacity: 0.9;
}

/* 模式头部 */
.mode-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
}

.back-to-selection {
  padding: 8px 16px;
  background: #f5f5f5;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #666;
  transition: all 0.3s;
}

.back-to-selection:hover {
  background: #e8e8e8;
}

.mode-header h2 {
  font-size: 1.5rem;
  color: #333;
}

/* 复习进度 */
.review-progress {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.9rem;
  color: #666;
}

.progress-percent {
  color: #667eea;
  font-weight: 600;
}

.progress-bar {
  height: 8px;
  background: #e8e8e8;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
  transition: width 0.3s;
}

/* 知识点详情卡片 */
.knowledge-points-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.kp-detail-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s;
}

.kp-detail-card:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.kp-detail-card.reviewed {
  border-left: 4px solid #4caf50;
}

.kp-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  cursor: pointer;
}

.kp-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.kp-number {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
}

.kp-title-area h4 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 6px;
}

.kp-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.kp-tag {
  padding: 3px 10px;
  border-radius: 10px;
  font-size: 0.75rem;
}

.kp-tag.required {
  background: #ffebee;
  color: #c62828;
}

.kp-tag.objective {
  background: #e3f2fd;
  color: #1565c0;
}

.kp-tag.coding {
  background: #f3e5f5;
  color: #7b1fa2;
}

.kp-tag.important {
  background: #fff8e1;
  color: #f57f17;
}

.kp-tag.optional {
  background: #e8f5e9;
  color: #2e7d32;
}

.kp-score {
  font-size: 0.8rem;
  color: #888;
}

.expand-icon {
  color: #999;
  font-size: 0.8rem;
  transition: transform 0.3s;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

/* 知识点详情内容 */
.kp-detail-content {
  padding: 0 20px 20px;
  border-top: 1px solid #f0f0f0;
}

.theory-section {
  margin-top: 20px;
}

.theory-section h5 {
  font-size: 1rem;
  color: #333;
  margin-bottom: 15px;
}

.theory-content {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  font-size: 0.95rem;
  line-height: 1.8;
  color: #444;
}

.theory-content :deep(h2) {
  font-size: 1.1rem;
  color: #333;
  margin: 15px 0 10px;
}

.theory-content :deep(h3) {
  font-size: 1rem;
  color: #444;
  margin: 12px 0 8px;
}

.theory-content :deep(p) {
  margin: 8px 0;
}

.theory-content :deep(code) {
  background: #e8e8e8;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Consolas', monospace;
}

.theory-content :deep(pre) {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 15px 0;
}

.theory-content :deep(pre code) {
  background: transparent;
  padding: 0;
}

.theory-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
}

.theory-content :deep(th),
.theory-content :deep(td) {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.theory-content :deep(th) {
  background: #e8e8e8;
}

.theory-content :deep(ul) {
  padding-left: 20px;
}

.theory-content :deep(li) {
  margin: 5px 0;
}

.review-location {
  margin-top: 15px;
  padding: 10px 15px;
  background: #fff8e1;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #8c6e00;
  display: flex;
  align-items: center;
  gap: 8px;
}

.kp-actions {
  margin-top: 20px;
}

.mark-reviewed-btn {
  padding: 10px 20px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.mark-reviewed-btn:hover {
  background: #43a047;
}

.reviewed-btn {
  padding: 10px 20px;
  background: #e8f5e9;
  color: #4caf50;
  border: 2px solid #4caf50;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
}

/* 复习完毕按钮 */
.review-complete-section {
  margin-top: 40px;
  text-align: center;
}

.review-complete-btn {
  padding: 16px 40px;
  background: linear-gradient(135deg, #ff9f43 0%, #ff6b6b 100%);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(255, 159, 67, 0.4);
  transition: all 0.3s;
}

.review-complete-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(255, 159, 67, 0.5);
}

/* 练习套卷 */
.sets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.set-card {
  background: white;
  border-radius: 16px;
  padding: 28px 30px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.set-card:hover:not(.locked) {
  transform: translateY(-3px);
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.12);
}

.set-card.locked {
  opacity: 0.6;
  cursor: not-allowed;
}

.set-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.set-difficulty {
  padding: 5px 14px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.set-difficulty.basic {
  background: #e8f5e9;
  color: #2e7d32;
}

.set-difficulty.advanced {
  background: #fff3e0;
  color: #ef6c00;
}

.set-difficulty.expert {
  background: #fce4ec;
  color: #c2185b;
}

.set-status {
  font-size: 0.85rem;
  color: #999;
}

.set-name {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 10px;
  font-weight: 600;
}

.set-desc {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 18px;
  line-height: 1.6;
}

.set-meta {
  display: flex;
  gap: 24px;
  margin-bottom: 18px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: #888;
}

.start-btn {
  width: 100%;
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.3s;
}

.start-btn:hover {
  opacity: 0.9;
}

/* 已完成套卷样式 */
.set-card.completed {
  border: 2px solid #4caf50;
}

.set-status.completed {
  background: #e8f5e9;
  color: #4caf50;
  padding: 5px 14px;
  border-radius: 12px;
  font-weight: 500;
}

/* 历史记录样式 */
.set-record {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 18px 20px;
  margin-bottom: 18px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.record-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  text-align: center;
}

.record-label {
  font-size: 0.85rem;
  color: #888;
}

.record-score {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.record-score.pass {
  color: #4caf50;
}

.record-time {
  font-size: 0.9rem;
  color: #666;
}

.record-empty {
  font-size: 0.9rem;
  color: #bbb;
  font-style: italic;
}

/* 操作按钮容器 */
.set-actions {
  display: flex;
  gap: 12px;
  margin-top: auto;
}

.review-btn {
  flex: 1;
  padding: 12px 20px;
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.review-btn:hover {
  background: #667eea;
  color: white;
}

.start-btn.has-record {
  background: linear-gradient(135deg, #4caf50 0%, #43a047 100%);
}

/* 桌面端优化 - 大于 1024px */
@media (min-width: 1024px) {
  .ycl-practice-view {
    max-width: 1100px;
  }

  .sets-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
  }

  .set-card {
    padding: 32px;
  }

  .set-record {
    padding: 20px 24px;
    gap: 20px;
  }

  .record-item {
    gap: 8px;
  }

  .record-score {
    font-size: 1.3rem;
  }

  .set-actions {
    gap: 14px;
  }

  .review-btn,
  .start-btn {
    padding: 14px 24px;
    font-size: 1.05rem;
  }
}

/* 平板端优化 - 768px 到 1023px */
@media (min-width: 768px) and (max-width: 1023px) {
  .sets-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

/* 响应式 - 768px 以下 */
@media (max-width: 768px) {
  .level-header {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .level-info h1 {
    font-size: 1.5rem;
  }

  .mode-cards {
    grid-template-columns: 1fr;
  }

  .sets-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .set-card {
    padding: 24px;
  }

  .set-record {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 16px;
  }

  .record-item {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }

  .set-actions {
    flex-direction: column;
    gap: 10px;
  }

  .floating-back-btn {
    width: 52px;
    height: 52px;
    bottom: 20px;
    left: 20px;
  }

  .floating-back-btn svg {
    width: 20px;
    height: 20px;
  }

  .kp-card-header {
    padding: 15px;
  }

  .kp-left {
    gap: 10px;
  }

  .kp-number {
    width: 28px;
    height: 28px;
    font-size: 0.8rem;
  }

  .kp-title-area h4 {
    font-size: 1rem;
  }

  .theory-content {
    padding: 15px;
    font-size: 0.9rem;
  }
}

/* 更小屏幕适配 480px */
@media (max-width: 480px) {
  .ycl-practice-view {
    padding: 15px;
    padding-bottom: 80px;
  }

  .breadcrumb {
    font-size: 0.85rem;
    margin-bottom: 20px;
  }

  .level-header {
    padding: 20px;
  }

  .level-info h1 {
    font-size: 1.3rem;
  }

  .level-desc {
    font-size: 0.9rem;
  }

  .level-badge {
    padding: 8px 18px;
    font-size: 1rem;
  }

  .mode-selection h2 {
    font-size: 1.5rem;
  }

  .mode-card {
    padding: 20px;
  }

  .mode-icon {
    font-size: 2.5rem;
  }

  .mode-card h3 {
    font-size: 1.2rem;
  }

  .mode-features li {
    font-size: 0.9rem;
  }

  .mode-header h2 {
    font-size: 1.3rem;
  }

  .progress-info {
    font-size: 0.85rem;
  }

  .kp-card-header {
    padding: 12px;
  }

  .kp-number {
    width: 24px;
    height: 24px;
    font-size: 0.75rem;
  }

  .kp-title-area h4 {
    font-size: 0.95rem;
  }

  .kp-tag {
    font-size: 0.7rem;
    padding: 2px 8px;
  }

  .kp-score {
    font-size: 0.75rem;
  }

  .set-card {
    padding: 20px;
  }

  .set-name {
    font-size: 1.05rem;
  }

  .set-desc {
    font-size: 0.9rem;
    margin-bottom: 14px;
  }

  .set-meta {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    margin-bottom: 14px;
  }

  .set-record {
    padding: 14px 16px;
    margin-bottom: 14px;
  }

  .record-item {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .record-score {
    font-size: 1.1rem;
  }

  .set-actions {
    flex-direction: column;
    gap: 10px;
  }

  .review-btn,
  .start-btn {
    padding: 12px 18px;
    font-size: 0.95rem;
  }

  .review-complete-btn {
    padding: 14px 30px;
    font-size: 1rem;
  }

  .floating-back-btn {
    width: 48px;
    height: 48px;
    bottom: 15px;
    left: 15px;
  }

  .floating-back-btn svg {
    width: 18px;
    height: 18px;
  }
}
</style>
