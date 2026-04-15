<template>
  <div class="chinese-typing-container" :class="{ embedded }">
    <!-- 练习区域 -->
    <div v-if="!isCompleted" class="practice-area">
      <!-- 进度显示 -->
      <div v-if="!embedded" class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>

      <!-- 当前题目信息 -->
      <div v-if="currentItem.type === 'poem'" class="item-info">
        <span class="item-title">{{ currentItem.title }}</span>
        <span class="item-author">{{ currentItem.author }}</span>
      </div>
      <div v-else class="item-info">
        <span class="item-type">成语</span>
      </div>

      <!-- 目标文字显示 -->
      <div class="target-text">
        <span
          v-for="(char, index) in displayChars"
          :key="index"
          class="char"
          :class="{
            'typed': index < inputValue.length,
            'current': index === inputValue.length,
            'correct': char === inputValue[index],
            'error': index < inputValue.length && char !== inputValue[index]
          }"
        >
          {{ char }}
        </span>
        <span v-if="inputValue.length > 0 && inputValue.length < targetText.length" class="cursor">|</span>
      </div>

      <!-- 输入框 -->
      <input
        ref="inputRef"
        v-model="inputValue"
        type="text"
        class="typing-input"
        :placeholder="inputValue.length === 0 ? '请输入上面的文字...' : ''"
        @input="handleInput"
        @keydown="handleKeydown"
        autofocus
      />

      <!-- 实时统计 -->
      <div v-if="!embedded" class="live-stats">
        <div class="stat-item">
          <span class="stat-label">用时</span>
          <span class="stat-value">{{ timerDisplay }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">字数</span>
          <span class="stat-value">{{ correctChars }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">进度</span>
          <span class="stat-value">{{ currentIndex + 1 }}/{{ items.length }}</span>
        </div>
      </div>
    </div>

    <!-- 完成界面 -->
    <div v-else class="completion-screen">
      <div class="completion-content">
        <div class="trophy-icon">🏆</div>
        <h2 class="completion-title">练习完成！</h2>

        <!-- 统计数据 -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">⚡</div>
            <div class="stat-value-main">{{ charsPerMinute }}</div>
            <div class="stat-label-main">字/分钟</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🎯</div>
            <div class="stat-value-main">{{ accuracy }}%</div>
            <div class="stat-label-main">准确率</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⏱️</div>
            <div class="stat-value-main">{{ timerDisplay }}</div>
            <div class="stat-label-main">用时</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-value-main">{{ correctCount }}</div>
            <div class="stat-label-main">完成</div>
          </div>
        </div>

        <!-- 鼓励语 -->
        <div class="encouragement">
          {{ getEncouragementText() }}
        </div>

        <!-- 按钮组 -->
        <div class="button-group">
          <button @click="restart" class="btn btn-primary">
            再练一次
          </button>
          <button v-if="!embedded" @click="goBack" class="btn btn-secondary">
            返回
          </button>
        </div>
      </div>
    </div>

    <!-- 排行榜 -->
    <div v-if="!embedded && scoreHistory.length > 0" class="leaderboard">
      <h3 class="leaderboard-title">📊 最佳成绩</h3>
      <div class="leaderboard-list">
        <div
          v-for="(score, index) in topScores"
          :key="score.id"
          class="leaderboard-item"
          :class="{ 'latest': score.isLatest }"
        >
          <div class="rank">{{ index + 1 }}</div>
          <div class="score-info">
            <span class="score-value">{{ score.charsPerMinute }} 字/分</span>
            <span class="score-accuracy">{{ score.accuracy }}%</span>
          </div>
          <div class="score-time">{{ formatTime(score.timestamp) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'

const props = defineProps({
  // 练习内容列表
  items: {
    type: Array,
    default: () => []
  },
  // 是否为嵌入式模式
  embedded: {
    type: Boolean,
    default: false
  },
  // 历史成绩
  scoreHistory: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['complete', 'restart', 'update:scoreHistory'])

// 状态变量
const currentIndex = ref(0)
const inputValue = ref('')
const startTime = ref(null)
const correctChars = ref(0)
const totalChars = ref(0)
const elapsedSeconds = ref(0)
const timerInterval = ref(null)
const isCompleted = ref(false)
const inputRef = ref(null)

// 历史成绩（本地副本）
const localScoreHistory = ref([...props.scoreHistory])

// 当前题目
const currentItem = computed(() => {
  return props.items[currentIndex.value] || { text: '', type: '' }
})

// 目标文字
const targetText = computed(() => {
  return currentItem.value.text || ''
})

// 显示字符数组
const displayChars = computed(() => {
  return targetText.value.split('')
})

// 进度百分比
const progressPercent = computed(() => {
  if (props.items.length === 0) return 0
  return ((currentIndex.value) / props.items.length) * 100
})

// 计时器显示
const timerDisplay = computed(() => {
  const minutes = Math.floor(elapsedSeconds.value / 60)
  const seconds = elapsedSeconds.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

// 字/分钟
const charsPerMinute = computed(() => {
  if (elapsedSeconds.value === 0) return 0
  const elapsedMinutes = elapsedSeconds.value / 60
  return Math.round(correctChars.value / elapsedMinutes)
})

// 准确率
const accuracy = computed(() => {
  if (totalChars.value === 0) return 100
  return Math.round((correctChars.value / totalChars.value) * 100)
})

// 完成数量
const correctCount = computed(() => {
  return currentIndex.value
})

// 排行榜（前5名）
const topScores = computed(() => {
  return [...localScoreHistory.value]
    .sort((a, b) => b.charsPerMinute - a.charsPerMinute)
    .slice(0, 5)
})

// 开始计时
const startTimer = () => {
  startTime.value = Date.now()
  timerInterval.value = setInterval(() => {
    elapsedSeconds.value = Math.floor((Date.now() - startTime.value) / 1000)
  }, 1000)
}

// 停止计时
const stopTimer = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
}

// 处理输入
const handleInput = () => {
  // 开始计时
  if (!startTime.value && inputValue.value.length > 0) {
    startTimer()
  }

  // 统计字符
  if (inputValue.value.length > 0) {
    totalChars.value += 1
  }

  // 检查是否完成当前项
  if (inputValue.value === targetText.value) {
    correctChars.value += targetText.value.length
    completeCurrentItem()
  }
}

// 处理按键
const handleKeydown = (e) => {
  // 不需要特殊处理，让输入法正常工作
}

// 完成当前项
const completeCurrentItem = () => {
  inputValue.value = ''

  // 移动到下一项
  if (currentIndex.value < props.items.length - 1) {
    currentIndex.value++
  } else {
    // 完成所有练习
    completePractice()
  }
}

// 完成练习
const completePractice = () => {
  stopTimer()

  const currentScore = {
    id: Date.now().toString(),
    charsPerMinute: charsPerMinute.value,
    accuracy: accuracy.value,
    correctCount: correctCount.value,
    correctChars: correctChars.value,
    elapsedTime: timerDisplay.value,
    timestamp: new Date().toISOString(),
    isLatest: true
  }

  // 标记之前的成绩为非最新
  localScoreHistory.value.forEach(s => s.isLatest = false)
  localScoreHistory.value.push(currentScore)

  // 同步到父组件
  emit('update:scoreHistory', [...localScoreHistory.value])
  emit('complete', currentScore)

  isCompleted.value = true
}

// 获取鼓励语
const getEncouragementText = () => {
  const score = charsPerMinute.value
  const prevScore = localScoreHistory.value.length > 1
    ? localScoreHistory.value[localScoreHistory.value.length - 2].charsPerMinute
    : null

  if (prevScore && score > prevScore) {
    return `太棒了！你的速度比上次快了 ${score - prevScore} 字/分钟，继续加油！🎉`
  } else if (prevScore && score < prevScore) {
    return `不错的成绩！多练习几次，你一定能超越自己！💪`
  } else if (score >= 60) {
    return '哇！你是打字小高手！神速！⚡'
  } else if (score >= 40) {
    return '很棒！你的打字速度很快，继续加油！👍'
  } else if (score >= 20) {
    return '不错哦！熟能生巧，继续练习会更快！🌟'
  } else {
    return '没关系，慢慢来！多练几次就熟练了！💪'
  }
}

// 格式化时间
const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date

  if (diff < 60000) {
    return '刚刚'
  } else if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}分钟前`
  } else if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)}小时前`
  } else {
    return `${date.getMonth() + 1}/${date.getDate()}`
  }
}

// 重新开始
const restart = () => {
  currentIndex.value = 0
  inputValue.value = ''
  startTime.value = null
  correctChars.value = 0
  totalChars.value = 0
  elapsedSeconds.value = 0
  isCompleted.value = false
  emit('restart')
}

// 返回
const goBack = () => {
  emit('restart')
}

// 监听分数历史变化
watch(() => props.scoreHistory, (newHistory) => {
  localScoreHistory.value = [...newHistory]
}, { deep: true })

// 组件挂载后聚焦输入框
onMounted(() => {
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus()
    }
  })
})
</script>

<style scoped>
.chinese-typing-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.chinese-typing-container.embedded {
  padding: 10px;
}

/* 进度条 */
.progress-bar {
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #8BC34A);
  transition: width 0.3s ease;
  border-radius: 4px;
}

/* 题目信息 */
.item-info {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  padding: 10px 15px;
  background: #f5f5f5;
  border-radius: 8px;
}

.item-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.item-author {
  font-size: 14px;
  color: #666;
}

.item-type {
  font-size: 16px;
  color: #666;
  padding: 4px 12px;
  background: #e0e0e0;
  border-radius: 4px;
}

/* 目标文字显示 */
.target-text {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  padding: 25px;
  font-size: 28px;
  font-family: 'Microsoft YaHei', 'SimSun', sans-serif;
  line-height: 1.8;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
  min-height: 80px;
  align-items: center;
  justify-content: center;
}

.char {
  padding: 2px 3px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.char.typed {
  background: #f0f0f0;
}

.char.current {
  background: #ffeb3b;
  animation: blink 1s infinite;
}

.char.correct {
  color: #4CAF50;
  background: #E8F5E9;
}

.char.error {
  color: #f44336;
  background: #FFEBEE;
  text-decoration: line-through;
}

.cursor {
  color: #2196F3;
  animation: blink 1s infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* 输入框 */
.typing-input {
  width: 100%;
  padding: 15px 20px;
  font-size: 20px;
  font-family: 'Microsoft YaHei', 'SimSun', sans-serif;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  outline: none;
  transition: all 0.3s ease;
  background: white;
  margin-bottom: 15px;
}

.typing-input:focus {
  border-color: #2196F3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.typing-input::placeholder {
  color: #aaa;
}

/* 实时统计 */
.live-stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 10px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.stat-label {
  font-size: 12px;
  color: #666;
}

.stat-value {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

/* 完成界面 */
.completion-screen {
  padding: 20px 0;
}

.completion-content {
  text-align: center;
}

.trophy-icon {
  font-size: 64px;
  margin-bottom: 10px;
  animation: bounce 1s ease;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.completion-title {
  font-size: 28px;
  color: #333;
  margin-bottom: 30px;
}

/* 统计网格 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-bottom: 30px;
}

.stat-card {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.stat-icon {
  font-size: 24px;
  margin-bottom: 10px;
}

.stat-value-main {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label-main {
  font-size: 12px;
  opacity: 0.9;
}

/* 鼓励语 */
.encouragement {
  font-size: 16px;
  color: #666;
  padding: 15px;
  background: #fff9c4;
  border-radius: 10px;
  margin-bottom: 20px;
}

/* 按钮组 */
.button-group {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.btn {
  padding: 12px 30px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #e0e0e0;
  color: #333;
}

.btn-secondary:hover {
  background: #d0d0d0;
}

/* 排行榜 */
.leaderboard {
  margin-top: 30px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
}

.leaderboard-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.leaderboard-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.leaderboard-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 15px;
  background: white;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.leaderboard-item.latest {
  background: #E3F2FD;
  border: 2px solid #2196F3;
}

.rank {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: white;
  border-radius: 50%;
  font-weight: bold;
  font-size: 14px;
}

.leaderboard-item:nth-child(2) .rank {
  background: linear-gradient(135deg, #C0C0C0, #A8A8A8);
}

.leaderboard-item:nth-child(3) .rank {
  background: linear-gradient(135deg, #CD7F32, #B8860B);
}

.score-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.score-value {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.score-accuracy {
  font-size: 12px;
  color: #666;
}

.score-time {
  font-size: 12px;
  color: #999;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .target-text {
    font-size: 22px;
    padding: 15px;
  }

  .typing-input {
    font-size: 18px;
    padding: 12px 15px;
  }

  .button-group {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .live-stats {
    gap: 15px;
  }

  .stat-value {
    font-size: 16px;
  }

  .item-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
