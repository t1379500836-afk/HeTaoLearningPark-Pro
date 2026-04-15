<template>
  <div class="ycl-exam-view">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>正在加载试卷...</p>
    </div>

    <!-- 复习模式：查看解析（优先显示） -->
    <div v-else-if="isReviewMode" class="review-mode">
      <!-- 悬浮返回按钮 -->
      <button class="floating-back-btn" @click="goBack" aria-label="返回列表">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>

      <!-- 顶部状态栏 -->
      <header class="review-header">
        <div class="review-title">📋 {{ practiceSet?.meta?.name || '练习套卷' }} - 答案解析</div>
        <button @click="exitReview" class="btn-exit-review">返回成绩</button>
      </header>

      <!-- 题目导航 -->
      <nav class="question-nav">
        <button
          v-for="(q, index) in questions"
          :key="q.id"
          class="nav-btn"
          :class="{
            active: currentIndex === index,
            correct: isAnswerCorrect(q),
            wrong: isAnswerWrong(q)
          }"
          @click="goToQuestion(index)"
        >
          {{ index + 1 }}
        </button>
      </nav>

      <!-- 题目内容 -->
      <main class="question-content review-content">
        <div class="question-header">
          <span class="question-type">{{ getQuestionTypeText(currentQuestion?.type) }}</span>
          <span class="question-score">{{ currentQuestion?.score }}分</span>
          <span class="result-tag" :class="isAnswerCorrect(currentQuestion) ? 'correct' : 'wrong'">
            {{ isAnswerCorrect(currentQuestion) ? '✓ 正确' : '✗ 错误' }}
          </span>
        </div>

        <div class="question-body">
          <p class="question-text">{{ currentQuestion?.question }}</p>

          <!-- 代码块 -->
          <pre v-if="currentQuestion?.code" class="code-block"><code>{{ currentQuestion?.code }}</code></pre>

          <!-- 单选题选项 -->
          <div v-if="currentQuestion?.type === 'single-choice'" class="options review-options">
            <label
              v-for="(option, index) in currentQuestion?.options"
              :key="index"
              class="option"
              :class="{
                'user-answer': answers[currentQuestion?.id] === index,
                'correct-answer': currentQuestion?.answer === index,
                'wrong-answer': answers[currentQuestion?.id] === index && currentQuestion?.answer !== index
              }"
            >
              <span class="option-label">{{ ['A', 'B', 'C', 'D'][index] }}.</span>
              <span class="option-text" v-html="formatOption(option)"></span>
              <span v-if="currentQuestion?.answer === index" class="answer-marker correct">✓ 正确答案</span>
              <span v-if="answers[currentQuestion?.id] === index && currentQuestion?.answer !== index" class="answer-marker wrong">✗ 您的答案</span>
            </label>
          </div>

          <!-- 多选题选项 -->
          <div v-else-if="currentQuestion?.type === 'multiple-choice'" class="options review-options">
            <label
              v-for="(option, index) in currentQuestion?.options"
              :key="index"
              class="option"
              :class="{
                'user-answer': answers[currentQuestion?.id]?.includes(index),
                'correct-answer': currentQuestion?.answer?.includes(index),
                'wrong-answer': answers[currentQuestion?.id]?.includes(index) && !currentQuestion?.answer?.includes(index),
                'missed-answer': !answers[currentQuestion?.id]?.includes(index) && currentQuestion?.answer?.includes(index)
              }"
            >
              <span class="option-label">{{ ['A', 'B', 'C', 'D'][index] }}.</span>
              <span class="option-text" v-html="formatOption(option)"></span>
              <span v-if="currentQuestion?.answer?.includes(index)" class="answer-marker correct">✓ 正确答案</span>
              <span v-if="answers[currentQuestion?.id]?.includes(index) && !currentQuestion?.answer?.includes(index)" class="answer-marker wrong">✗ 您的选择</span>
            </label>
          </div>

          <!-- 编程题 -->
          <div v-else-if="currentQuestion?.type === 'coding'" class="coding-area review-coding">
            <div class="test-cases">
              <h4>测试用例</h4>
              <div v-for="(tc, idx) in currentQuestion?.testCases" :key="idx" class="test-case">
                <p><strong>输入：</strong><span v-html="formatOption(tc.input || '无')"></span></p>
                <p><strong>输出：</strong><span v-html="formatOption(tc.expectedOutput)"></span></p>
              </div>
            </div>
            <!-- 代码对比区域 -->
            <div class="code-comparison">
              <div class="user-code-section">
                <h4>
                  <span>📝 您的答案</span>
                  <span class="code-status" v-if="answers[currentQuestion?.id] && answers[currentQuestion?.id].trim()">
                    已作答
                  </span>
                  <span class="code-status empty" v-else>未作答</span>
                </h4>
                <pre class="user-code"><code>{{ answers[currentQuestion?.id] || '# 未作答' }}</code></pre>
              </div>
              <div class="reference-code-section" v-if="currentQuestion?.referenceAnswer">
                <h4>✨ 参考答案</h4>
                <pre class="reference-code"><code>{{ currentQuestion?.referenceAnswer }}</code></pre>
              </div>
            </div>
            <!-- 编程题评分提示 -->
            <div class="coding-score-tip">
              <span class="tip-icon">💡</span>
              <span>编程题需要老师评分，请找老师核对答案获得最终分数</span>
            </div>
          </div>

          <!-- 解析说明 -->
          <div class="explanation-section" v-if="currentQuestion?.explanation">
            <h4>📝 解析</h4>
            <p class="explanation-text">{{ currentQuestion?.explanation }}</p>
          </div>
        </div>

        <!-- 题目导航按钮 -->
        <div class="question-actions">
          <button
            @click="prevQuestion"
            :disabled="currentIndex === 0"
            class="btn-nav"
          >
            上一题
          </button>
          <span class="question-counter">{{ currentIndex + 1 }} / {{ questions.length }}</span>
          <button
            v-if="currentIndex < questions.length - 1"
            @click="nextQuestion"
            class="btn-nav primary"
          >
            下一题
          </button>
          <button
            v-else
            @click="exitReview"
            class="btn-nav submit"
          >
            返回成绩
          </button>
        </div>
      </main>
    </div>

    <!-- 考试完成：结果页 -->
    <div v-else-if="examSubmitted" class="exam-result">
      <div class="result-content">
        <!-- 左侧：得分展示 -->
        <div class="score-section">
          <div class="score-display objective-only">
            <span class="score-label">选择题得分</span>
            <span class="score-value">{{ objectiveScore }}</span>
            <span class="score-total">/ {{ objectiveTotal }}</span>
          </div>
          <div class="pass-status" :class="{ passed: objectiveScore >= objectiveTotal * 0.6, failed: objectiveScore < objectiveTotal * 0.6 }">
            {{ objectiveScore >= objectiveTotal * 0.6 ? '🎉 选择题通过！' : '💪 继续加油！' }}
          </div>
        </div>

        <!-- 右侧：答题情况 -->
        <div class="stats-section">
          <h3>📊 答题情况</h3>
          <div class="result-stats">
            <div class="stat-item">
              <span class="stat-label">单选题</span>
              <span class="stat-value">{{ singleChoiceCorrect }}/{{ singleChoiceCount }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">多选题</span>
              <span class="stat-value">{{ multipleChoiceCorrect }}/{{ multipleChoiceCount }}</span>
            </div>
            <div class="stat-item coding-item">
              <span class="stat-label">编程题</span>
              <span class="stat-value pending">已答{{ codingAnswered }}/{{ codingCount }}题</span>
              <span class="stat-tip">请找老师核对答案</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 编程题提示 -->
      <div class="coding-notice" v-if="codingCount > 0">
        <div class="notice-icon">📝</div>
        <div class="notice-content">
          <p class="notice-title">编程题需要老师评分</p>
          <p class="notice-desc">您已完成 {{ codingAnswered }} 道编程题，请找老师核对答案获得最终分数。</p>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="result-actions">
        <button @click="reviewAnswers" class="btn-review">查看解析</button>
        <button @click="goBack" class="btn-back">返回列表</button>
      </div>
    </div>

    <!-- 考试未开始: 信息页 -->
    <div v-else-if="!examStarted" class="exam-intro">
      <div class="intro-header">
        <h1>{{ practiceSet?.meta?.name || '练习套卷' }}</h1>
        <p class="intro-desc">{{ practiceSet?.meta?.description }}</p>
      </div>

      <div class="exam-info-cards">
        <div class="info-card">
          <span class="icon">⏱️</span>
          <div>
            <h3>考试时长</h3>
            <p>{{ practiceSet?.meta?.duration || 90 }}分钟</p>
          </div>
        </div>
        <div class="info-card">
          <span class="icon">📊</span>
          <div>
            <h3>总分</h3>
            <p>{{ practiceSet?.meta?.totalScore || 100 }}分</p>
          </div>
        </div>
        <div class="info-card">
          <span class="icon">📝</span>
          <div>
            <h3>题目数量</h3>
            <p>{{ totalQuestions }}题</p>
          </div>
        </div>
      </div>

      <div class="question-preview">
        <h3>题型分布</h3>
        <div class="type-list">
          <div class="type-item">
            <span class="type-name">单选题</span>
            <span class="type-count">{{ singleChoiceCount }}题 × 2分 = {{ singleChoiceCount * 2 }}分</span>
          </div>
          <div class="type-item">
            <span class="type-name">多选题</span>
            <span class="type-count">{{ multipleChoiceCount }}题 × 3分 = {{ multipleChoiceCount * 3 }}分</span>
          </div>
          <div class="type-item">
            <span class="type-name">编程题</span>
            <span class="type-count">{{ codingCount }}题 = 55分</span>
          </div>
        </div>
      </div>

      <div class="exam-tips">
        <h3>📌 考试须知</h3>
        <ul>
          <li>请确保网络稳定，避免考试中断</li>
          <li>考试过程中请保持专注，不要切换页面</li>
          <li>编程题会自动保存，可以反复修改</li>
          <li>时间到后系统会自动提交</li>
        </ul>
      </div>

      <div class="start-actions">
        <button @click="goBack" class="btn-back">返回</button>
        <button @click="startExam" class="btn-start">开始考试</button>
      </div>
    </div>

    <!-- 考试进行中 -->
    <div v-else class="exam-content">
      <!-- 顶部状态栏 -->
      <header class="exam-header">
        <div class="exam-title">{{ practiceSet?.meta?.name }}</div>
        <div class="exam-status">
          <div class="timer" :class="{ warning: remainingTime < 600 }">
            <span class="timer-icon">⏱️</span>
            <span class="timer-text">{{ formatTime(remainingTime) }}</span>
          </div>
          <button @click="showAbandonConfirm = true" class="btn-abandon">放弃考试</button>
          <button @click="submitExam" class="btn-submit">提交试卷</button>
        </div>
      </header>

      <!-- 题目导航 -->
      <nav class="question-nav">
        <button
          v-for="(q, index) in questions"
          :key="q.id"
          class="nav-btn"
          :class="{
            active: currentIndex === index,
            answered: isAnswered(q),
            current: currentIndex === index
          }"
          @click="goToQuestion(index)"
        >
          {{ index + 1 }}
        </button>
      </nav>

      <!-- 题目内容 -->
      <main class="question-content">
        <div class="question-header">
          <span class="question-type">{{ getQuestionTypeText(currentQuestion?.type) }}</span>
          <span class="question-score">{{ currentQuestion?.score }}分</span>
        </div>

        <div class="question-body">
          <p class="question-text">{{ currentQuestion?.question }}</p>

          <!-- 代码块 -->
          <pre v-if="currentQuestion?.code" class="code-block"><code>{{ currentQuestion?.code }}</code></pre>

          <!-- 单选题选项 -->
          <div v-if="currentQuestion?.type === 'single-choice'" class="options">
            <label
              v-for="(option, index) in currentQuestion?.options"
              :key="index"
              class="option"
              :class="{ selected: answers[currentQuestion?.id] === index }"
            >
              <input
                type="radio"
                :name="currentQuestion?.id"
                :value="index"
                v-model="answers[currentQuestion?.id]"
              />
              <span class="option-label">{{ ['A', 'B', 'C', 'D'][index] }}.</span>
              <span class="option-text" v-html="formatOption(option)"></span>
            </label>
          </div>

          <!-- 多选题选项 -->
          <div v-else-if="currentQuestion?.type === 'multiple-choice'" class="options">
            <label
              v-for="(option, index) in currentQuestion?.options"
              :key="index"
              class="option"
              :class="{ selected: answers[currentQuestion?.id]?.includes(index) }"
            >
              <input
                type="checkbox"
                :value="index"
                v-model="answers[currentQuestion?.id]"
              />
              <span class="option-label">{{ ['A', 'B', 'C', 'D'][index] }}.</span>
              <span class="option-text" v-html="formatOption(option)"></span>
            </label>
          </div>

          <!-- 编程题 -->
          <div v-else-if="currentQuestion?.type === 'coding'" class="coding-area">
            <div class="test-cases">
              <h4>测试用例</h4>
              <div v-for="(tc, idx) in currentQuestion?.testCases" :key="idx" class="test-case">
                <p><strong>输入：</strong><span v-html="formatOption(tc.input || '无')"></span></p>
                <p><strong>输出：</strong><span v-html="formatOption(tc.expectedOutput)"></span></p>
              </div>
            </div>
            <textarea
              v-model="answers[currentQuestion?.id]"
              class="code-editor"
              placeholder="在此编写代码..."
            ></textarea>
          </div>
        </div>

        <!-- 题目导航按钮 -->
        <div class="question-actions">
          <button
            @click="prevQuestion"
            :disabled="currentIndex === 0"
            class="btn-nav"
          >
            上一题
          </button>
          <button
            v-if="currentIndex < questions.length - 1"
            @click="nextQuestion"
            class="btn-nav primary"
          >
            下一题
          </button>
          <button
            v-else
            @click="submitExam"
            class="btn-nav submit"
          >
            提交试卷
          </button>
        </div>
      </main>
    </div>

    <!-- 提交确认弹窗 -->
    <div v-if="showSubmitConfirm" class="modal-overlay" @click.self="cancelSubmit">
      <div class="modal-content">
        <div class="modal-icon">⚠️</div>
        <h3 class="modal-title">确认提交</h3>
        <p class="modal-message">确定要提交试卷吗？提交后将无法修改答案。</p>
        <div class="modal-stats" v-if="answeredCount < totalQuestions">
          <span class="warning-text">⚠️ 您还有 {{ totalQuestions - answeredCount }} 道题未作答</span>
        </div>
        <div class="modal-actions">
          <button class="btn-cancel" @click="cancelSubmit">继续答题</button>
          <button class="btn-confirm" @click="confirmSubmit">确认提交</button>
        </div>
      </div>
    </div>

    <!-- 放弃考试确认弹窗 -->
    <div v-if="showAbandonConfirm" class="modal-overlay" @click.self="showAbandonConfirm = false">
      <div class="modal-content abandon-modal">
        <div class="modal-icon danger">🚫</div>
        <h3 class="modal-title">放弃考试</h3>
        <p class="modal-message">确定要放弃本次考试吗？</p>
        <p class="modal-warning">⚠️ 放弃后当前答题进度将不会保存！</p>
        <div class="modal-actions">
          <button class="btn-cancel" @click="showAbandonConfirm = false">继续考试</button>
          <button class="btn-danger" @click="abandonExam">确认放弃</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCurrentPrefix, prefixedPath as buildPrefixedPath } from '@/composables/useRoutePrefix.js'
import { examInfo } from '@/data/courses/YCL/config/exam-info.js'
import {
  getSetRecord,
  saveRecord,
  formatDuration as formatDurationDisplay,
  formatTime as formatTimeDisplay
} from '@/data/courses/YCL/utils/examRecord.js'

const route = useRoute()
const router = useRouter()

// 获取当前路由前缀
const currentPrefix = computed(() => getCurrentPrefix(route))

// 构建带前缀的路径
function prefixedPath(path) {
  return buildPrefixedPath(currentPrefix.value, path)
}

// Props
const props = defineProps({
  level: String,
  setId: String
})

// 状态
const loading = ref(true)
const practiceSet = ref(null)
const questions = ref([])
const currentIndex = ref(0)
const answers = ref({})
const examStarted = ref(false)
const examSubmitted = ref(false)
const showSubmitConfirm = ref(false)  // 提交确认弹窗
const showAbandonConfirm = ref(false) // 放弃考试确认弹窗
const remainingTime = ref(90 * 60) // 90分钟
const examStartTime = ref(null)  // 考试开始时间
const timer = ref(null)  // 计时器（使用 ref 确保响应式清理）

// 复习模式
const isReviewMode = ref(false)
const reviewRecord = ref(null)

// 当前题目
const currentQuestion = computed(() => questions.value[currentIndex.value])

// 统计
const totalQuestions = computed(() => questions.value.length)
const singleChoiceCount = computed(() => questions.value.filter(q => q.type === 'single-choice').length)
const multipleChoiceCount = computed(() => questions.value.filter(q => q.type === 'multiple-choice').length)
const codingCount = computed(() => questions.value.filter(q => q.type === 'coding').length)
const answeredCount = computed(() => questions.value.filter(q => isAnswered(q)).length)

// 编程题统计
const codingAnswered = computed(() => questions.value.filter(q => q.type === 'coding' && isAnswered(q)).length)

// 加载套卷数据
async function loadPracticeSet() {
  loading.value = true
  try {
    const { getPracticeSet } = await import('@/data/courses/YCL/index.js')
    const set = await getPracticeSet(props.level, props.setId)
    practiceSet.value = set
    questions.value = set?.questions || []
    remainingTime.value = (set?.meta?.duration || 90) * 60

    // 初始化多选题答案为数组
    questions.value.forEach(q => {
      if (q.type === 'multiple-choice') {
        answers.value[q.id] = []
      }
    })

    // 检查是否为复习模式
    if (route.query.review === 'true') {
      const record = getSetRecord(props.level, props.setId)
      if (record) {
        isReviewMode.value = true
        reviewRecord.value = record
        // 恢复答题数据
        record.questions.forEach(q => {
          // 多选题需要确保是数组
          if (q.type === 'multiple-choice') {
            answers.value[q.id] = Array.isArray(q.userAnswer) ? q.userAnswer : []
          } else {
            answers.value[q.id] = q.userAnswer
          }
        })
        examSubmitted.value = true
      }
    }
  } catch (err) {
    console.error('加载套卷失败:', err)
  } finally {
    loading.value = false
  }
}

// 开始考试
function startExam() {
  examStarted.value = true
  examStartTime.value = Date.now()
  startTimer()
}

// 开始计时
function startTimer() {
  timer.value = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
    } else {
      submitExam()
    }
  }, 1000)
}

// 格式化时间
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// 格式化选项文本（将 \n 转为 <br>，保留缩进空格）
function formatOption(text) {
  if (!text) return ''
  // 先处理换行符
  let result = text.replace(/\\n/g, '\n').replace(/\n/g, '<br>')
  // 将每行开头的空格转换为 &nbsp;（在 <br> 之后或字符串开头）
  result = result.replace(/(^|<br>)( +)/g, (match, prefix, spaces) => {
    return prefix + '&nbsp;'.repeat(spaces.length)
  })
  return result
}

// 题目是否已作答
function isAnswered(question) {
  const answer = answers.value[question?.id]
  if (answer === undefined || answer === null) return false
  if (Array.isArray(answer)) return answer.length > 0
  if (typeof answer === 'string') return answer.trim().length > 0
  return true
}

// 获取题型文本
function getQuestionTypeText(type) {
  const map = {
    'single-choice': '单选题',
    'multiple-choice': '多选题',
    'coding': '编程题'
  }
  return map[type] || type
}

// 题目导航
function goToQuestion(index) {
  currentIndex.value = index
  // 切换到多选题时，确保答案是数组
  const q = questions.value[index]
  if (q && q.type === 'multiple-choice' && !Array.isArray(answers.value[q.id])) {
    answers.value[q.id] = []
  }
}

function prevQuestion() {
  if (currentIndex.value > 0) {
    currentIndex.value--
    // 切换到多选题时，确保答案是数组
    const q = questions.value[currentIndex.value]
    if (q && q.type === 'multiple-choice' && !Array.isArray(answers.value[q.id])) {
      answers.value[q.id] = []
    }
  }
}

function nextQuestion() {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++
    // 切换到多选题时，确保答案是数组
    const q = questions.value[currentIndex.value]
    if (q && q.type === 'multiple-choice' && !Array.isArray(answers.value[q.id])) {
      answers.value[q.id] = []
    }
  }
}

// 提交试卷（显示确认弹窗）
function submitExam() {
  showSubmitConfirm.value = true
}

// 确认提交
function confirmSubmit() {
  showSubmitConfirm.value = false
  clearInterval(timer.value)
  timer.value = null
  examStarted.value = false
  examSubmitted.value = true
  calculateScore()

  // 保存考试记录到 localStorage
  saveExamRecord()
}

// 取消提交
function cancelSubmit() {
  showSubmitConfirm.value = false
}

// 计算得分
const calculatedScore = ref(0)
const singleChoiceCorrect = ref(0)
const multipleChoiceCorrect = ref(0)
const codingScore = ref(0)
const objectiveScore = ref(0)  // 选择题总分
const objectiveTotal = ref(0)  // 选择题满分
const codingTotal = ref(0)     // 编程题满分

function calculateScore() {
  let score = 0
  let objScore = 0
  let objTotal = 0
  let codeTotal = 0
  singleChoiceCorrect.value = 0
  multipleChoiceCorrect.value = 0
  codingScore.value = 0

  questions.value.forEach(q => {
    const answer = answers.value[q.id]

    if (q.type === 'single-choice') {
      objTotal += q.score
      if (answer === q.answer) {
        score += q.score
        objScore += q.score
        singleChoiceCorrect.value++
      }
    } else if (q.type === 'multiple-choice') {
      objTotal += q.score
      if (arraysEqual(answer, q.answer)) {
        score += q.score
        objScore += q.score
        multipleChoiceCorrect.value++
      } else if (answer && q.answer.some(a => answer.includes(a))) {
        // 部分正确：从配置获取分值，默认1分
        const partialScore = examInfo.multipleChoiceRule?.scoringRule?.partialCorrect ?? 1
        score += partialScore
        objScore += partialScore
      }
    } else if (q.type === 'coding') {
      codeTotal += q.score
    }
  })

  calculatedScore.value = score
  objectiveScore.value = objScore
  objectiveTotal.value = objTotal
  codingTotal.value = codeTotal
  // codingAnswered 是 computed 属性，自动计算
}

function arraysEqual(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) return false
  return a.length === b.length && a.every(x => b.includes(x))
}

// 保存考试记录
function saveExamRecord() {
  const duration = examStartTime.value ? Math.floor((Date.now() - examStartTime.value) / 1000) : 0
  const totalScore = practiceSet.value?.meta?.totalScore || 100

  // 构建题目答题数据
  const questionRecords = questions.value.map(q => {
    const userAnswer = answers.value[q.id]
    let isCorrect = false

    if (q.type === 'single-choice') {
      isCorrect = userAnswer === q.answer
    } else if (q.type === 'multiple-choice') {
      isCorrect = arraysEqual(userAnswer, q.answer)
    }
    // 编程题不判断对错，由老师评分

    return {
      id: q.id,
      type: q.type,
      question: q.question,
      options: q.options,
      code: q.code,  // 题目代码
      userAnswer: userAnswer,
      correctAnswer: q.answer,
      referenceAnswer: q.referenceAnswer,  // 编程题参考答案
      isCorrect: isCorrect,
      score: q.score,
      explanation: q.explanation || ''
    }
  })

  const record = {
    setName: practiceSet.value?.meta?.name || '模拟试卷',
    // 选择题分数
    objectiveScore: objectiveScore.value,
    objectiveTotal: objectiveTotal.value,
    // 编程题（需要老师评分）
    codingAnswered: codingAnswered.value,
    codingTotal: codingTotal.value,
    // 总分（仅选择题）
    score: objectiveScore.value,
    totalScore: totalScore,
    // 统计
    correctCount: singleChoiceCorrect.value + multipleChoiceCorrect.value,
    totalCount: totalQuestions.value,
    duration: duration,
    submitTime: new Date().toISOString(),
    questions: questionRecords
  }

  saveRecord(props.level, props.setId, record)
}

// 查看解析
function reviewAnswers() {
  // 直接在当前页面进入复习模式
  isReviewMode.value = true
  examSubmitted.value = false
  examStarted.value = false
  currentIndex.value = 0
}

// 退出复习模式
function exitReview() {
  isReviewMode.value = false
  examSubmitted.value = true
}

// 判断题目是否答对
function isAnswerCorrect(question) {
  if (!question) return false
  const userAnswer = answers.value[question.id]

  if (question.type === 'single-choice') {
    return userAnswer === question.answer
  } else if (question.type === 'multiple-choice') {
    return arraysEqual(userAnswer, question.answer)
  }
  return false
}

// 判断题目是否答错
function isAnswerWrong(question) {
  if (!question) return false
  const userAnswer = answers.value[question.id]
  if (userAnswer === undefined || userAnswer === null) return false
  return !isAnswerCorrect(question)
}

// 返回上一页
function goBack() {
  // 直接返回练习列表页，并带上 mode=practice 参数
  router.push({
    path: prefixedPath(`/ycl/practice/${props.level}`),
    query: { mode: 'practice' }
  })
}

// 放弃考试
function abandonExam() {
  // 停止计时器
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
  // 返回练习列表页
  goBack()
}

// 生命周期
onMounted(() => {
  loadPracticeSet()
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
})
</script>

<style scoped>
.ycl-exam-view {
  min-height: 100vh;
  background: #f5f7fa;
}

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
  to { transform: rotate(360deg); }
}

/* 悬浮返回按钮 */
.floating-back-btn {
  position: fixed;
  bottom: 30px;
  left: 30px;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  background: linear-gradient(135deg, #5a6fd6 0%, #6a4192 100%);
  transform: scale(1.1);
  box-shadow: 0 6px 24px rgba(102, 126, 234, 0.5);
}

.floating-back-btn:active {
  transform: scale(0.95);
}

.floating-back-btn svg {
  width: 24px;
  height: 24px;
}

/* 考试介绍页 */
.exam-intro {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.intro-header {
  text-align: center;
  margin-bottom: 30px;
}

.intro-header h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
}

.intro-desc {
  color: #666;
}

.exam-info-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.info-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.info-card .icon {
  font-size: 2rem;
}

.info-card h3 {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 5px;
}

.info-card p {
  font-size: 1.2rem;
  color: #333;
  font-weight: 600;
}

.question-preview,
.exam-tips {
  background: white;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.question-preview h3,
.exam-tips h3 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 15px;
}

.type-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.type-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.type-name {
  font-weight: 500;
  color: #333;
}

.type-count {
  color: #666;
}

.exam-tips ul {
  list-style: none;
  padding: 0;
}

.exam-tips li {
  padding: 8px 0;
  color: #666;
  border-bottom: 1px solid #f0f0f0;
}

.exam-tips li:last-child {
  border-bottom: none;
}

.start-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.btn-back,
.btn-start {
  padding: 15px 40px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
}

.btn-back {
  background: #f0f0f0;
  color: #666;
}

.btn-start {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* 考试进行中 */
.exam-content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.exam-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.exam-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.exam-status {
  display: flex;
  align-items: center;
  gap: 20px;
}

.timer {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 15px;
  background: #f0f0f0;
  border-radius: 20px;
}

.timer.warning {
  background: #fff3e0;
  color: #f57c00;
}

.timer-text {
  font-weight: 600;
  font-size: 1.1rem;
}

.btn-submit {
  padding: 10px 25px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-submit:hover {
  background: #43a047;
}

.btn-abandon {
  padding: 10px 20px;
  background: transparent;
  color: #f44336;
  border: 2px solid #f44336;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-abandon:hover {
  background: #ffebee;
}

.question-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 15px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.nav-btn {
  width: 36px;
  height: 36px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-btn.answered {
  background: #e8f5e9;
  border-color: #4caf50;
}

.nav-btn.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.question-content {
  flex: 1;
  padding: 30px 20px;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.question-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.question-type {
  padding: 5px 15px;
  background: #667eea;
  color: white;
  border-radius: 15px;
  font-size: 0.9rem;
}

.question-score {
  font-weight: 600;
  color: #ff9800;
}

.question-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 20px;
}

.code-block {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 20px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 20px;
  background: white;
  border: 2px solid #eee;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.option:hover {
  border-color: #667eea;
}

.option.selected {
  background: #e8eaf6;
  border-color: #667eea;
}

.option input {
  display: none;
}

.option-label {
  font-weight: 600;
  color: #667eea;
}

.option-text {
  flex: 1;
  white-space: pre-wrap;
  font-family: 'Consolas', 'Monaco', monospace;
}

.coding-area {
  margin-top: 20px;
}

.test-cases {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
}

.test-cases h4 {
  margin-bottom: 10px;
  color: #333;
}

.test-case {
  padding: 10px;
  background: white;
  border-radius: 8px;
  margin-bottom: 10px;
}

.test-case p {
  margin: 5px 0;
  font-size: 0.9rem;
  color: #666;
}

.code-editor {
  width: 100%;
  min-height: 200px;
  padding: 15px;
  border: 2px solid #eee;
  border-radius: 10px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  resize: vertical;
}

.code-editor:focus {
  outline: none;
  border-color: #667eea;
}

.question-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.btn-nav {
  padding: 12px 30px;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  border: 2px solid #ddd;
  background: white;
}

.btn-nav:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-nav.primary {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.btn-nav.submit {
  background: #4caf50;
  border-color: #4caf50;
  color: white;
}

/* 考试结果页 */
.exam-result {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.result-content {
  display: flex;
  gap: 30px;
  max-width: 800px;
  width: 100%;
  margin-bottom: 25px;
}

/* 左侧得分区域 */
.score-section {
  flex: 0 0 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.score-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  color: white;
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
}

.score-label {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 5px;
}

.score-value {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1;
}

.score-total {
  font-size: 1.2rem;
  opacity: 0.8;
}

.pass-status {
  margin-top: 15px;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 20px;
}

.pass-status.passed {
  background: #e8f5e9;
  color: #2e7d32;
}

.pass-status.failed {
  background: #fff3e0;
  color: #ef6c00;
}

/* 右侧统计区域 */
.stats-section {
  flex: 1;
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
}

.stats-section h3 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 20px;
}

.result-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 10px;
}

.stat-label {
  color: #666;
  font-size: 0.95rem;
}

.stat-value {
  font-weight: 600;
  color: #333;
  font-size: 1rem;
}

.stat-value.pending {
  color: #666;
  font-size: 0.9rem;
}

.stat-tip {
  font-size: 0.8rem;
  color: #ff9800;
  margin-left: 8px;
}

.coding-item {
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

/* 编程题提示区域 */
.coding-notice {
  display: flex;
  align-items: center;
  gap: 15px;
  max-width: 600px;
  margin: 0 auto 25px;
  padding: 20px 25px;
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
  border-radius: 16px;
  border-left: 4px solid #ff9800;
}

.notice-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.notice-content {
  flex: 1;
}

.notice-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #f57c00;
  margin: 0 0 5px 0;
}

.notice-desc {
  font-size: 0.95rem;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

/* 选择题单独展示样式 */
.score-display.objective-only {
  background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
}

/* 操作按钮 */
.result-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn-review {
  padding: 12px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-review:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-back {
  padding: 12px 30px;
  background: #f5f5f5;
  color: #666;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-back:hover {
  background: #e8e8e8;
}

/* 响应式 */
@media (max-width: 768px) {
  .exam-info-cards {
    grid-template-columns: 1fr;
  }

  .question-content {
    padding: 20px 15px;
  }

  /* 结果页响应式 */
  .result-content {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .score-section {
    flex: none;
  }

  .score-display {
    width: 160px;
    height: 160px;
  }

  .score-value {
    font-size: 2.8rem;
  }

  .stats-section {
    width: 100%;
    max-width: 300px;
  }

  .result-actions {
    flex-direction: column;
    gap: 12px;
  }

  .btn-review,
  .btn-back {
    width: 100%;
    max-width: 250px;
  }

  /* 编程题提示区域响应式 */
  .coding-notice {
    flex-direction: column;
    text-align: center;
    padding: 15px 20px;
  }

  .notice-icon {
    font-size: 2rem;
  }
}

/* 更小屏幕适配 */
@media (max-width: 480px) {
  .intro-header h1 {
    font-size: 1.5rem;
  }

  .intro-desc {
    font-size: 0.9rem;
  }

  .exam-info-cards {
    gap: 12px;
  }

  .info-card {
    padding: 15px;
  }

  .info-card .icon {
    font-size: 1.5rem;
  }

  .info-card h3 {
    font-size: 0.75rem;
  }

  .info-card p {
    font-size: 1rem;
  }

  .question-preview,
  .exam-tips {
    padding: 18px;
  }

  .question-preview h3,
  .exam-tips h3 {
    font-size: 1rem;
  }

  .type-item {
    padding: 8px 12px;
    font-size: 0.9rem;
  }

  .exam-tips li {
    font-size: 0.9rem;
  }

  .start-actions {
    flex-direction: column;
    gap: 12px;
    margin-top: 25px;
  }

  .btn-back,
  .btn-start {
    width: 100%;
    padding: 12px 30px;
  }

  /* 答题页面小屏适配 */
  .exam-header {
    padding: 12px 15px;
  }

  .exam-title {
    font-size: 1rem;
  }

  .timer {
    padding: 6px 12px;
    font-size: 0.85rem;
  }

  .btn-submit {
    padding: 8px 18px;
    font-size: 0.9rem;
  }

  .question-nav {
    padding: 12px 15px;
    gap: 6px;
  }

  .nav-btn {
    width: 32px;
    height: 32px;
    font-size: 0.85rem;
  }

  .question-text {
    font-size: 1rem;
  }

  .option {
    padding: 12px 15px;
    font-size: 0.95rem;
  }

  .code-editor {
    min-height: 150px;
    font-size: 0.85rem;
  }

  .btn-nav {
    padding: 10px 20px;
    font-size: 0.9rem;
  }

  /* 结果页小屏适配 */
  .score-display {
    width: 140px;
    height: 140px;
  }

  .score-label {
    font-size: 0.8rem;
  }

  .score-value {
    font-size: 2.2rem;
  }

  .score-total {
    font-size: 1rem;
  }

  .stats-section {
    padding: 18px;
  }

  .stats-section h3 {
    font-size: 1rem;
  }

  .stat-item {
    padding: 10px 14px;
  }

  .stat-label {
    font-size: 0.85rem;
  }

  .stat-value {
    font-size: 0.9rem;
  }

  /* 编程题提示区域小屏适配 */
  .coding-notice {
    padding: 12px 15px;
    margin-bottom: 20px;
  }

  .notice-title {
    font-size: 1rem;
  }

  .notice-desc {
    font-size: 0.85rem;
  }
}

/* 提交确认弹窗 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: white;
  border-radius: 20px;
  padding: 30px 40px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.modal-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

.modal-message {
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 15px;
}

.modal-stats {
  padding: 12px 20px;
  background: #fff8e1;
  border-radius: 10px;
  margin-bottom: 20px;
}

.warning-text {
  color: #f57c00;
  font-size: 0.9rem;
  font-weight: 500;
}

.modal-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 10px;
}

.btn-cancel {
  padding: 12px 30px;
  background: #f5f5f5;
  color: #666;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cancel:hover {
  background: #e8e8e8;
}

.btn-confirm {
  padding: 12px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-confirm:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

/* 放弃弹窗样式 */
.abandon-modal .modal-icon.danger {
  color: #f44336;
}

.abandon-modal .modal-warning {
  color: #ff9800;
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: center;
}

.btn-danger {
  padding: 12px 30px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-danger:hover {
  background: #d32f2f;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(244, 67, 54, 0.4);
}

@media (max-width: 768px) {
  .modal-content {
    padding: 25px 20px;
    margin: 0 15px;
  }

  .modal-actions {
    flex-direction: column;
  }

  .btn-cancel,
  .btn-confirm {
    width: 100%;
  }
}

/* 复习模式样式 */
.review-mode {
  min-height: 100vh;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.review-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.btn-exit-review {
  padding: 8px 20px;
  background: #f5f5f5;
  color: #666;
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-exit-review:hover {
  background: #e8e8e8;
}

.question-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 15px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.nav-btn {
  width: 36px;
  height: 36px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-btn.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.nav-btn.correct {
  background: #e8f5e9;
  border-color: #4caf50;
}

.nav-btn.wrong {
  background: #ffebee;
  border-color: #f44336;
}

.review-content {
  flex: 1;
  padding: 30px 20px;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.result-tag {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.result-tag.correct {
  background: #e8f5e9;
  color: #2e7d32;
}

.result-tag.wrong {
  background: #ffebee;
  color: #c62828;
}

.review-options .option {
  cursor: default;
  position: relative;
}

.review-options .option.user-answer {
  background: #fff3e0;
  border-color: #ff9800;
}

.review-options .option.correct-answer {
  background: #e8f5e9;
  border-color: #4caf50;
}

.review-options .option.wrong-answer {
  background: #ffebee;
  border-color: #f44336;
}

.review-options .option.missed-answer {
  background: #e3f2fd;
  border-color: #2196f3;
}

.answer-marker {
  font-size: 0.75rem;
  margin-left: auto;
  padding: 2px 8px;
  border-radius: 10px;
}

.answer-marker.correct {
  background: #4caf50;
  color: white;
}

.answer-marker.wrong {
  background: #f44336;
  color: white;
}

.question-counter {
  font-size: 0.95rem;
  color: #666;
  padding: 0 15px;
}

/* 解析说明样式 */
.explanation-section {
  margin-top: 25px;
  padding: 20px;
  background: #f0f4ff;
  border-radius: 12px;
  border-left: 4px solid #667eea;
}

.explanation-section h4 {
  margin: 0 0 10px 0;
  color: #667eea;
  font-size: 1rem;
}

.explanation-text {
  color: #555;
  line-height: 1.8;
  margin: 0;
}

/* 编程题复习样式 */
.review-coding .user-code-section,
.review-coding .reference-code-section {
  margin-top: 20px;
}

.review-coding h4 {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.code-status {
  font-size: 0.8rem;
  padding: 2px 8px;
  background: #e8f5e9;
  color: #4caf50;
  border-radius: 10px;
  font-weight: 500;
}

.code-status.empty {
  background: #ffebee;
  color: #f44336;
}

/* 代码对比区域 */
.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .code-comparison {
    grid-template-columns: 1fr;
  }
}

.review-coding .user-code,
.review-coding .reference-code {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  min-height: 150px;
}

.review-coding .user-code-section {
  background: #fff8e1;
  padding: 15px;
  border-radius: 12px;
  border-left: 4px solid #ff9800;
}

.review-coding .reference-code-section {
  background: #e8f5e9;
  padding: 15px;
  border-radius: 12px;
  border-left: 4px solid #4caf50;
}

/* 编程题评分提示 */
.coding-score-tip {
  margin-top: 20px;
  padding: 12px 20px;
  background: #e3f2fd;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1976d2;
  font-size: 0.95rem;
}

.tip-icon {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .review-header {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }

  .review-content {
    padding: 20px 15px;
  }

  .question-counter {
    display: none;
  }
}
</style>
