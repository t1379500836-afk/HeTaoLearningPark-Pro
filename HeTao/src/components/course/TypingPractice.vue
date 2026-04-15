<template>
  <section class="typing-section">
    <div :class="containerClass">
      <h2 class="section-title">金手指打字练习</h2>
      <div class="typing-demo">
        <!-- 单词模式显示 -->
        <div v-if="mode === 'word'" class="word-display">
          <transition name="word-slide" mode="out-in">
            <span :key="currentWord" class="word-current">{{ currentWord }}</span>
          </transition>
          <transition name="word-preview" mode="out-in">
            <span :key="remainingText" class="word-remaining">{{ remainingText }}</span>
          </transition>
        </div>

        <!-- 代码模式显示 -->
        <div v-else class="code-display">
          <pre class="code-current">{{ currentTemplate }}</pre>
          <textarea
            ref="codeTextarea"
            v-model="inputValue"
            @input="checkInput"
            @keydown="handleKeyDown"
            class="code-input"
            placeholder="输入上面显示的代码..."
            spellcheck="false"
            rows="8"
          ></textarea>
        </div>

        <!-- 单词模式输入框 -->
        <input
          v-if="mode === 'word'"
          ref="typingInput"
          v-model="inputValue"
          @input="checkInput"
          @keydown="handleKeyDown"
          class="typing-input"
          placeholder="输入上面显示的文字..."
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
        />

        <!-- 输入控制区：错误提示和操作按钮 -->
        <div class="input-controls">
          <div v-if="hasInputError" class="error-hint">
            ⚠️ 输入有误，请自行修改
          </div>
          <button @click="clearInput" class="control-btn clear-btn">
            🗑️ 清除输入
          </button>
          <button @click="restartPractice" class="control-btn restart-btn">
            🔄 重新开始
          </button>
        </div>

        <!-- 输入法提示 -->
        <div class="input-method-hint">
          💡 开始前请切换为英文输入法，调整好大小写模式
        </div>

        <!-- 统计信息 -->
        <div class="stats">
          <div class="stat-item">
            <div class="stat-value">{{ lettersPerMinute }}</div>
            <div class="stat-label">字母/分钟</div>
          </div>
          <div class="stat-item">
            <div class="stat-value" :class="{ 'success': accuracy >= 90 }">{{ accuracy }}%</div>
            <div class="stat-label">准确率</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ timerDisplay }}</div>
            <div class="stat-label">用时</div>
          </div>
        </div>

        <!-- 成绩榜 -->
        <div v-if="scoreHistory.length > 0" class="score-board">
          <h3 class="score-board-title">🏆 我的成绩榜</h3>
          <div class="score-list">
            <div
              v-for="(score, index) in topScores"
              :key="score.id"
              class="score-item"
              :class="{ 'latest': score.isLatest }"
            >
              <div class="score-rank">
                <span v-if="index === 0" class="rank-badge gold">🥇</span>
                <span v-else-if="index === 1" class="rank-badge silver">🥈</span>
                <span v-else-if="index === 2" class="rank-badge bronze">🥉</span>
                <span v-else class="rank-number">{{ index + 1 }}</span>
              </div>
              <div class="score-details">
                <div class="score-speed">{{ score.lettersPerMinute }} 字母/分钟</div>
                <div class="score-meta">
                  <span class="meta-item">准确率 {{ score.accuracy }}%</span>
                  <span class="meta-item">用时 {{ score.elapsedTime }}</span>
                </div>
              </div>
              <div v-if="score.isLatest" class="score-latest-badge">本次</div>
            </div>
          </div>
        </div>

        <!-- 关卡选择（仅在显示关卡选择时显示） -->
        <div v-if="showLevelSelector" class="practice-levels">
          <h4>练习关卡</h4>
          <div class="level-buttons">
            <button
              v-for="(level, index) in levels"
              :key="index"
              @click="setLevel(index)"
              class="level-btn"
              :class="{ active: currentLevelIndex === index }"
            >
              {{ level.name }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 虚拟键盘显示 -->
    <div class="virtual-keyboard">
      <div v-for="(row, rowIndex) in keyboardLayout" :key="rowIndex" class="keyboard-row">
        <div
          v-for="key in row"
          :key="key"
          class="keyboard-key"
          :class="{
            'active': activeKey === key,
            'correct': activeKey === key && keyStatus === 'correct',
            'error': activeKey === key && keyStatus === 'error',
            'wide': isWideKey(key),
            'extra-wide': isExtraWideKey(key),
            'space-key': key === 'Space'
          }"
        >
          {{ formatKeyLabel(key) }}
        </div>
      </div>
    </div>

    <!-- 完成祝贺界面 -->
    <div v-if="isCompleted" class="completion-overlay">
      <div class="completion-card">
        <div class="completion-emoji">🎉</div>
        <h2 class="completion-title">{{ completionTitle }}</h2>
        <p class="completion-message">{{ completionMessage }}</p>

        <!-- 成绩对比话术 -->
        <div v-if="lastScore" class="comparison-box">
          <div class="comparison-icon">📊</div>
          <p class="comparison-text">{{ comparisonMessage }}</p>
        </div>

        <div class="completion-stats">
          <div class="completion-stat">
            <span class="stat-label">速度</span>
            <span class="stat-value">{{ lettersPerMinute }} 字母/分钟</span>
          </div>
          <div class="completion-stat">
            <span class="stat-label">准确率</span>
            <span class="stat-value">{{ accuracy }}%</span>
          </div>
          <div class="completion-stat">
            <span class="stat-label">用时</span>
            <span class="stat-value">{{ timerDisplay }}</span>
          </div>
        </div>

        <!-- 本次排名 -->
        <div v-if="currentRank" class="current-rank">
          <span class="rank-icon">🏅</span>
          本次排名：第 <strong>{{ currentRank }}</strong> 名
        </div>

        <div class="completion-actions">
          <button @click="goBack" class="completion-btn secondary">
            返回 ←
          </button>
          <button @click="restartPractice" class="completion-btn primary">
            再来一次 🚀
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// Fisher-Yates 洗牌算法 - 随机抽取指定数量的项目
const shuffleAndPick = (array, count) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

// 组件props
const props = defineProps({
  id: String,
  mode: {
    type: String,
    default: 'word',  // 'word' | 'code'
    validator: (value) => ['word', 'code'].includes(value)
  },
  customWords: {
    type: Array,
    default: () => []
  },
  customTemplates: {
    type: Array,
    default: () => []
  },
  showLevelSelector: {
    type: Boolean,
    default: false  // 默认不显示关卡选择
  },
  // 是否自动聚焦输入框（默认不自动聚焦，避免页面滚动问题）
  autoFocus: {
    type: Boolean,
    default: false
  },
  // 嵌入式模式：用于课程页面，移除固定宽度和内边距
  embedded: {
    type: Boolean,
    default: false
  },
  // 每轮练习的单词/模板数量（默认8个）
  wordCount: {
    type: Number,
    default: 8
  },
  // 外部管理的排行榜数据（用于持久化）
  scoreHistory: {
    type: Array,
    default: () => []
  }
})

// 组件emit
const emit = defineEmits(['complete', 'restart', 'update:scoreHistory'])

// 容器类名：根据嵌入式模式返回不同类名
const containerClass = computed(() => ({
  'container': true,
  'embedded': props.embedded
}))

// 打字练习数据（每个关卡最多8个单词/模板）
// 基于 PY2 课程 L7-L8 单元的单词卡内容
const levels = [
  // 课程单词关卡 - L7 单元
  {
    name: 'L7-1 单词',
    title: 'L7-1: split, encode, decode, print',
    type: 'word',
    words: ['split', 'encode', 'decode', 'print', 'string', 'traversal', 'hello', 'world']
  },
  {
    name: 'L7-2 单词',
    title: 'L7-2: weather, float, max, index',
    type: 'word',
    words: ['weather', 'float', 'maximum', 'minimum', 'index', 'find', 'number', 'list']
  },
  {
    name: 'L7-3 单词',
    title: 'L7-3: sum, sort, player, record',
    type: 'word',
    words: ['sum', 'sort', 'player', 'record', 'score', 'game', 'add', 'total']
  },
  {
    name: 'L7-4 单词',
    title: 'L7-4: initial, power, claw, detect',
    type: 'word',
    words: ['initial', 'power', 'claw', 'detect', 'robot', 'action', 'move', 'sensor']
  },
  // 课程单词关卡 - L8 单元
  {
    name: 'L8-1 单词',
    title: 'L8-1: power, note, dict, get',
    type: 'word',
    words: ['power', 'note', 'dict', 'dictionary', 'value', 'key', 'pair', 'data']
  },
  {
    name: 'L8-2 单词',
    title: 'L8-2: set, add, in, score',
    type: 'word',
    words: ['set', 'add', 'insert', 'score', 'append', 'remove', 'pop', 'count']
  },
  {
    name: 'L8-3 单词',
    title: 'L8-3: line, sensor, wait, time',
    type: 'word',
    words: ['line', 'sensor', 'wait', 'time', 'while', 'loop', 'break', 'continue']
  },
  {
    name: 'L8-4 单词',
    title: 'L8-4: reverse, count, sorted, slice',
    type: 'word',
    words: ['reverse', 'count', 'sorted', 'slice', 'order', 'range', 'step', 'index']
  },
  // 基础指法关卡（键盘练习）
  {
    name: 'Home Row',
    title: '基准行练习 (A S D F J K L ;)',
    type: 'word',
    words: ['asdf', 'jkl;', 'fad', 'sak', 'lad', 'ask', 'fall', 'dads']
  },
  {
    name: 'Top Row',
    title: '上排键练习 (Q W E R T Y U I O P)',
    type: 'word',
    words: ['qwer', 'tyui', 'op', 'power', 'write', 'type', 'quit', 'trip']
  },
  {
    name: 'Bottom Row',
    title: '下排键练习 (Z X C V B N M)',
    type: 'word',
    words: ['zxcv', 'bnm', 'zero', 'max', 'box', 'cube', 'mix', 'vex']
  },
  // 代码模板关卡 - L7 单元
  {
    name: 'L7-1: 遍历与split',
    title: '字符串遍历与split命令',
    type: 'code',
    templates: [
      'for i in s:',
      's.split(" ")',
      'print("Hello")',
      'print(*words)'
    ]
  },
  {
    name: 'L7-2: 查找与列表',
    title: 'max/min/float/index',
    type: 'code',
    templates: [
      'max(scores)',
      'min(numbers)',
      'float(12)',
      'list.index("item")'
    ]
  },
  {
    name: 'L7-3: 排序与求和',
    title: 'sum/sort 命令',
    type: 'code',
    templates: [
      'sum(numbers)',
      'list.sort()',
      'numbers.sort()',
      'sum([1, 2, 3])'
    ]
  },
  {
    name: 'L7-4: 变量与赋值',
    title: '变量赋值基础',
    type: 'code',
    templates: [
      'name = "Tom"',
      'age = 10',
      'power = 5',
      'score = 95.5'
    ]
  },
  // 代码模板关卡 - L8 单元
  {
    name: 'L8-1: 字典基础',
    title: 'dict/get 命令',
    type: 'code',
    templates: [
      '{"name": "Tom"}',
      'dict["key"]',
      'dict.get("key")',
      'dict.get("key", 0)'
    ]
  },
  {
    name: 'L8-2: 列表操作',
    title: 'append/insert 操作',
    type: 'code',
    templates: [
      'list.append(item)',
      'list.insert(0, item)',
      'list.pop()',
      'list.count(x)'
    ]
  },
  {
    name: 'L8-3: 循环结构',
    title: 'while/for 循环',
    type: 'code',
    templates: [
      'while x > 0:',
      'while True:\n    break',
      'for i in range(5):',
      'for item in list:'
    ]
  },
  {
    name: 'L8-4: 列表高级',
    title: 'reverse/sorted 操作',
    type: 'code',
    templates: [
      'list.reverse()',
      'sorted(list)',
      'list.sort(reverse=True)',
      '[x * 2 for x in nums]'
    ]
  }
]

// 状态管理
const currentLevelIndex = ref(0)
const currentWordIndex = ref(0)
const inputValue = ref('')
const correctCount = ref(0)
const startTime = ref(null)
const typingInput = ref(null)
const codeTextarea = ref(null)

// 新增状态 - 完成练习相关
const isCompleted = ref(false)           // 是否完成练习
const correctChars = ref(0)              // 正确输入的字母数
const errorChars = ref(0)                // 错误输入的字母数
const elapsedSeconds = ref(0)            // 经过的时间（秒）
const timerInterval = ref(null)          // 计时器定时器

// 成绩榜相关
const scoreHistory = ref(props.scoreHistory.map(s => ({ ...s })))  // 历史成绩记录（从props初始化）
const lastScore = ref(null)              // 上次成绩（用于下次）
const previousScore = ref(null)          // 上一次练习成绩（用于对比显示）

// 虚拟键盘状态
const keyboardLayout = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
  ['Space']
]

const activeKey = ref('')           // 当前激活的按键
const keyStatus = ref('default')    // 按键状态: 'default' | 'correct' | 'error'
const keyTimer = ref(null)          // 按键高亮计时器

// 计算属性
const mode = computed(() => props.mode)

// 使用自定义内容或关卡内容
const currentLevel = computed(() => {
  // 优先检查代码模式：如果 mode 是 code 且有自定义模板，直接使用
  if (props.mode === 'code' && props.customTemplates.length > 0) {
    return { type: 'code', templates: props.customTemplates, title: '代码练习' }
  }
  // 然后检查自定义单词
  if (props.customWords.length > 0) {
    const selectedWords = shuffleAndPick(props.customWords, props.wordCount)
    return { type: 'word', words: selectedWords, title: '单词练习' }
  }
  // 最后使用内置关卡
  return levels[currentLevelIndex.value]
})

const currentWord = computed(() => {
  if (currentLevel.value.words) {
    return currentLevel.value.words[currentWordIndex.value] || ''
  }
  return ''
})

const currentTemplate = computed(() => {
  if (currentLevel.value.templates) {
    return currentLevel.value.templates[currentWordIndex.value] || ''
  }
  return ''
})

const remainingWords = computed(() => {
  const items = currentLevel.value.words || currentLevel.value.templates || []
  return items.slice(currentWordIndex.value + 1)
})

const remainingText = computed(() => {
  // 只显示下一个单词
  const nextWords = remainingWords.value.slice(0, 1)
  return nextWords.length > 0 ? ' ' + nextWords.join(' ') : ''
})

// 检测是否有输入错误
const hasInputError = computed(() => {
  if (inputValue.value.length === 0) return false

  if (mode.value === 'word' || currentLevel.value.type === 'word') {
    return !currentWord.value.startsWith(inputValue.value)
  } else {
    // 代码模式：检查输入是否与目标匹配
    const input = inputValue.value
    const target = currentTemplate.value
    return input.length > 0 && !target.startsWith(input)
  }
})

// 每分钟正确字母数
const lettersPerMinute = computed(() => {
  if (elapsedSeconds.value === 0) return 0
  const elapsedMinutes = elapsedSeconds.value / 60
  return Math.round(correctChars.value / elapsedMinutes)
})

// 准确率按字符计算
const totalAttempts = computed(() => correctChars.value + errorChars.value)
const accuracy = computed(() => {
  if (totalAttempts.value === 0) return 100
  return Math.round((correctChars.value / totalAttempts.value) * 100)
})

// 计时显示（分:秒格式，从0:00开始）
const timerDisplay = computed(() => {
  const minutes = Math.floor(elapsedSeconds.value / 60)
  const seconds = elapsedSeconds.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

// 成绩榜（前5名，按字母/分钟排序）
const topScores = computed(() => {
  return [...scoreHistory.value]
    .sort((a, b) => b.lettersPerMinute - a.lettersPerMinute)
    .slice(0, 5)
})

// 当前成绩排名
const currentRank = computed(() => {
  if (scoreHistory.value.length === 0) return null
  const sorted = [...scoreHistory.value].sort((a, b) => b.lettersPerMinute - a.lettersPerMinute)
  return sorted.findIndex(s => s.isLatest) + 1
})

// 根据表现生成鼓励话术
const completionTitle = computed(() => {
  if (accuracy.value >= 95 && lettersPerMinute.value >= 150) {
    return '太棒了！你是打字小天才！'
  } else if (accuracy.value >= 90 && lettersPerMinute.value >= 100) {
    return '真厉害！继续加油！'
  } else if (accuracy.value >= 80) {
    return '做得不错！再接再厉！'
  } else {
    return '完成练习！继续努力！'
  }
})

const completionMessage = computed(() => {
  const messages = [
    '每一次练习都是进步！',
    '坚持不懈，你会越来越棒！',
    '你的努力一定会得到回报！',
    '相信自己，你是最棒的！',
    '小小手指，大大能量！'
  ]
  return messages[Math.floor(Math.random() * messages.length)]
})

// 与上次成绩对比的话术（儿童友好版）
const comparisonMessage = computed(() => {
  // 第一次练习
  if (!previousScore.value) {
    const firstTimeMessages = [
      '这是你的第一次练习，做得真棒！继续练习会越来越厉害！✨',
      '太棒了！第一次就这么认真，继续加油哦！💪',
      '你已经迈出第一步了，每天进步一点点，未来更精彩！🌟',
      '好样的！坚持练习，你的打字速度会越来越快！🚀'
    ]
    return firstTimeMessages[Math.floor(Math.random() * firstTimeMessages.length)]
  }

  const currentLPM = lettersPerMinute.value
  const prevLPM = previousScore.value.lettersPerMinute

  // 简化对比：主要对比速度
  const speedDiff = currentLPM - prevLPM

  // 速度明显提升（快5个以上）
  if (speedDiff >= 5) {
    const fastMessages = [
      `哇！你的速度快了 ${speedDiff} 字母/分钟，像闪电一样！⚡`,
      `太厉害了！比上次快了 ${speedDiff} 字母/分钟，进步超大！🎉`,
      `你越来越厉害了！速度快了 ${speedDiff} 字母/分钟，继续保持！🌟`
    ]
    return fastMessages[Math.floor(Math.random() * fastMessages.length)]
  }

  // 速度轻微提升（快1-4个）
  if (speedDiff >= 1) {
    const slightFastMessages = [
      `很棒！比上次快了一点点，继续加油会更厉害！💪`,
      `稳稳的进步！速度提升 ${speedDiff} 字母/分钟，做得好！👍`,
      `每一次练习都有进步，你正在变得更棒！✨`
    ]
    return slightFastMessages[Math.floor(Math.random() * slightFastMessages.length)]
  }

  // 速度持平或差不多（±0）
  if (speedDiff === 0) {
    const stableMessages = [
      '发挥很稳定！继续保持这个节奏，会越来越厉害！🎯',
      '稳扎稳打！你的表现很棒，继续练习会更出色！💫',
      '坚持练习就是胜利，你已经很棒了！🌟'
    ]
    return stableMessages[Math.floor(Math.random() * stableMessages.length)]
  }

  // 速度轻微下降（慢1-4个）
  if (speedDiff >= -4) {
    const gentleMessages = [
      '别担心，打字速度有波动很正常，多练习就会更稳定！🌱',
      '今天可能有点累，没关系，休息后继续练习会更棒！💪',
      '每次练习都在积累，你的手指正在记住位置呢！✨'
    ]
    return gentleMessages[Math.floor(Math.random() * gentleMessages.length)]
  }

  // 速度下降较多（慢5个以上）
  const slowMessages = [
    '没关系，今天可能状态不好，下次一定会更好！💪',
    '别灰心！打字就像骑自行车，多练几次就会熟练！🚴',
    '相信自己！每个打字高手都经历过这个过程，加油！⭐'
  ]
  return slowMessages[Math.floor(Math.random() * slowMessages.length)]
})

// 虚拟键盘辅助函数
// 将按键码映射到键盘布局中的显示名称
const mapKeyToDisplay = (key) => {
  if (key.length === 1) {
    return key.toLowerCase()
  }

  const keyMap = {
    ' ': 'Space',
    'Control': 'Control',
    'Meta': 'Meta',
    'Alt': 'Alt',
    'Shift': 'Shift',
    'CapsLock': 'CapsLock',
    'Enter': 'Enter',
    'Backspace': 'Backspace',
    'Tab': 'Tab'
  }

  return keyMap[key] || key
}

// 显示按键反馈（正确/错误）
const showKeyFeedback = (key, status) => {
  if (keyTimer.value) {
    clearTimeout(keyTimer.value)
  }

  const displayKey = mapKeyToDisplay(key)
  activeKey.value = displayKey
  keyStatus.value = status

  keyTimer.value = setTimeout(() => {
    activeKey.value = ''
    keyStatus.value = 'default'
  }, 300)
}

// 判断是否为宽按键
const isWideKey = (key) => {
  return ['Tab', 'Backspace', 'CapsLock', 'Enter', '\\'].includes(key)
}

// 判断是否为超宽按键
const isExtraWideKey = (key) => {
  return ['Shift'].includes(key)
}

// 格式化按键标签显示
const formatKeyLabel = (key) => {
  const labelMap = {
    'Backspace': '⌫',
    'Tab': '⇥',
    'Enter': '↵',
    'Shift': '⇧',
    'Control': 'Ctrl',
    'Meta': '⌘',
    'Alt': 'Alt',
    'CapsLock': '⇪',
    'Space': ''
  }
  return labelMap[key] || key.toUpperCase()
}

// 方法
const setLevel = (index) => {
  currentLevelIndex.value = index
  resetPractice()
}

const resetPractice = () => {
  stopTimer()  // 先停止计时器
  currentWordIndex.value = 0
  inputValue.value = ''
  correctCount.value = 0
  correctChars.value = 0
  errorChars.value = 0
  startTime.value = null
  isCompleted.value = false
  elapsedSeconds.value = 0  // 重置计时器为0
  // 注意：不清空 scoreHistory 和 lastScore，保留历史成绩
  focusInput()
}

const clearInput = () => {
  inputValue.value = ''
  focusInput()
}

const focusInput = () => {
  if (mode.value === 'code' || currentLevel.value.type === 'code') {
    codeTextarea.value?.focus()
  } else {
    typingInput.value?.focus()
  }
}

const checkInput = () => {
  const input = inputValue.value

  // 开始计时
  if (!startTime.value && input.length > 0) {
    startTime.value = Date.now()
    startTimer()
  }

  // 获取当前目标
  const target = mode.value === 'code' || currentLevel.value.type === 'code'
    ? currentTemplate.value
    : currentWord.value

  if (!target) return

  // 完成当前项
  if (input === target) {
    correctCount.value++
    inputValue.value = ''

    const items = currentLevel.value.words || currentLevel.value.templates || []
    if (currentWordIndex.value < items.length - 1) {
      currentWordIndex.value++
    } else {
      // 完成关卡 - 显示祝贺界面
      completePractice()
    }
  }
  // 错误不干预，让用户自行修改
}

const handleKeyDown = (e) => {
  const char = e.key

  // 代码模式下支持Tab键缩进
  if ((mode.value === 'code' || currentLevel.value.type === 'code') && e.key === 'Tab') {
    e.preventDefault()
    const textarea = e.target
    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    // 检查Tab键输入是否正确（目标应该是4个空格）
    const target = currentTemplate.value
    const insertSpaces = '    '
    let tabCorrect = true

    // 检查接下来应该输入的4个字符是否都是空格
    for (let i = 0; i < 4; i++) {
      const targetChar = target[inputValue.value.length + i]
      if (targetChar !== ' ') {
        tabCorrect = false
        break
      }
    }

    // 更新统计
    if (tabCorrect) {
      correctChars.value += 4
      showKeyFeedback('Tab', 'correct')
    } else {
      errorChars.value += 4
      showKeyFeedback('Tab', 'error')
    }

    // 插入4个空格作为缩进（Python PEP 8标准）
    inputValue.value = inputValue.value.substring(0, start) + insertSpaces + inputValue.value.substring(end)
    // 恢复光标位置
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + 4
    }, 0)
    return
  }

  // 判断输入是否正确（仅对单字符输入）
  if (char && char.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
    const target = mode.value === 'code' || currentLevel.value.type === 'code'
      ? currentTemplate.value
      : currentWord.value

    if (target) {
      const targetChar = target[inputValue.value.length]
      if (char === targetChar) {
        // 正确输入
        correctChars.value++
        showKeyFeedback(char, 'correct')
      } else if (targetChar) {
        // 错误输入
        errorChars.value++
        showKeyFeedback(char, 'error')
      }
    }
  }

  // 处理特殊按键显示
  if (['Backspace', 'Tab', 'Enter', 'Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(char)) {
    showKeyFeedback(char, 'default')
  }
}

// 启动计时器
const startTimer = () => {
  if (timerInterval.value) return
  timerInterval.value = setInterval(() => {
    elapsedSeconds.value++
  }, 1000)
}

// 停止计时器
const stopTimer = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
}

// 生成唯一ID
const generateScoreId = () => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

// 完成练习
const completePractice = () => {
  stopTimer()

  // 保存当前成绩到历史记录
  const currentScore = {
    id: generateScoreId(),
    lettersPerMinute: lettersPerMinute.value,
    accuracy: accuracy.value,
    correctWords: correctCount.value,
    correctChars: correctChars.value,
    elapsedTime: timerDisplay.value,
    timestamp: new Date().toISOString(),
    isLatest: true
  }

  // 标记之前的成绩为非最新
  scoreHistory.value.forEach(s => s.isLatest = false)

  // 添加新成绩
  scoreHistory.value.push(currentScore)

  // 同步排行榜数据到父组件
  emit('update:scoreHistory', scoreHistory.value.map(s => ({ ...s })))

  // 保存上一次成绩用于对比显示（在更新前先保存）
  previousScore.value = lastScore.value ? { ...lastScore.value } : null

  // 更新上次成绩（用于下次对比）
  lastScore.value = { ...currentScore }

  isCompleted.value = true
  emit('complete', {
    lettersPerMinute: lettersPerMinute.value,
    accuracy: accuracy.value,
    correctWords: correctCount.value,
    correctChars: correctChars.value,
    elapsedTime: timerDisplay.value,
    rank: currentRank.value
  })
}

// 重新开始（提供给按钮使用）
const restartPractice = () => {
  resetPractice()
  // 触发 restart 事件，让父组件知道可以刷新内容了
  emit('restart')
}

// 返回上一页或首页
const goBack = () => {
  // 关闭完成弹窗，重置练习状态
  isCompleted.value = false
  resetPractice()
  // 触发 restart 事件，让父组件知道可以刷新内容了
  emit('restart')
}

// 监听自定义内容变化，重置练习状态（保留排行榜数据）
watch(() => [props.customWords, props.customTemplates], () => {
  // 当父组件更新内容时，重置练习状态
  resetPractice()
}, { deep: true })

onMounted(() => {
  // 根据 prop 决定是否自动聚焦
  if (props.autoFocus) {
    focusInput()
  }
})

onUnmounted(() => {
  stopTimer()  // 清理计时器
  if (keyTimer.value) {
    clearTimeout(keyTimer.value)
  }
})
</script>

<style scoped>
/* ============================================
   打字练习组件 - 桌面端样式重构
   ============================================ */

/* ============================================
   1. 容器层
   ============================================ */
.typing-section {
  padding: var(--spacing-xl) 0;
  background: linear-gradient(to bottom, var(--bg-color) 0%, #f0f0f0 100%);
}

.container {
  max-width: var(--max-width-container);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.container.embedded {
  max-width: none;
  padding: 0;
}

/* ============================================
   2. 标题区
   ============================================ */
.section-title {
  text-align: center;
  margin-bottom: var(--spacing-lg);
  font-size: 2rem;
  color: #333;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background-color: var(--primary-color);
  margin: 10px auto 0;
  border-radius: 2px;
}

/* ============================================
   3. 主练习卡片 (.typing-demo)
   ============================================ */
.typing-demo {
  background: var(--typing-bg);
  color: var(--typing-text);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  text-align: center;
  font-family: var(--font-code);
}

/* 3.1 任务标题 */
.task-title {
  margin-bottom: var(--spacing-md);
  color: var(--accent-color);
}

/* 3.2 单词显示区 */
.word-display {
  font-size: 2rem;
  letter-spacing: 5px;
  margin-bottom: var(--spacing-md);
  min-height: 60px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.word-current {
  color: #fff;
  font-size: 2.5rem;
  font-weight: bold;
  padding: 10px 20px;
  background: linear-gradient(135deg, rgba(255, 159, 0, 0.2) 0%, rgba(255, 159, 0, 0.1) 100%);
  border-radius: 12px;
  border: 2px solid var(--primary-color);
  box-shadow: 0 4px 20px rgba(255, 159, 0, 0.3);
  animation: wordAppear 0.3s ease;
  position: relative;
}

.word-current::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
  border-radius: 2px;
}

.word-remaining {
  color: #666;
  font-size: 1.2rem;
  opacity: 0.7;
  font-style: italic;
  padding: 5px 15px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

@keyframes wordAppear {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(-10px);
  }
  50% {
    transform: scale(1.05) translateY(0);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* 单词切换过渡动画 - 从右侧滑入并放大 */
.word-slide-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.word-slide-leave-active {
  transition: all 0.3s ease-out;
}

.word-slide-enter-from {
  opacity: 0.5;
  transform: translateX(60px) scale(0.8);
}

.word-slide-leave-to {
  opacity: 0;
  transform: translateX(-60px) scale(0.7);
}

/* 下一个单词预览过渡动画 - 从右侧淡入 */
.word-preview-enter-active,
.word-preview-leave-active {
  transition: all 0.3s ease;
}

.word-preview-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.word-preview-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* 3.3 代码显示区 */
.code-display {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  align-items: center;
}

.code-current {
  background: #1a1d21;
  color: #fff;
  padding: 15px 20px;
  border-radius: var(--radius-md);
  font-size: 1rem;
  line-height: 1.6;
  white-space: pre-wrap;
  min-width: 300px;
  max-width: 600px;
  text-align: left;
}

/* 3.4 输入框 */
.typing-input,
.code-input {
  width: 100%;
  max-width: 600px;
  padding: 15px 20px;
  font-size: 1.2rem;
  font-family: var(--font-code);
  border: 2px solid #444;
  border-radius: var(--radius-md);
  background: #1a1d21;
  color: #fff;
  outline: none;
  resize: vertical;
  line-height: 1.6;
}

.typing-input {
  text-align: center;
  max-width: 500px;
  margin-bottom: var(--spacing-md);
}

.typing-input:focus,
.code-input:focus {
  border-color: var(--primary-color);
}

/* 3.5 控制区 */
.input-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  flex-wrap: wrap;
}

.error-hint {
  color: var(--typing-key-error);
  font-size: 0.9rem;
  padding: 8px 16px;
  background: rgba(231, 76, 60, 0.1);
  border-radius: var(--radius-md);
  border: 1px solid var(--typing-key-error);
}

.control-btn {
  padding: 8px 16px;
  color: #fff;
  border: 1px solid #555;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.clear-btn { background: #444; }
.clear-btn:hover {
  background: #555;
  transform: translateY(-1px);
}

.restart-btn {
  background: var(--primary-color);
  border-color: var(--primary-color);
}
.restart-btn:hover {
  background: #e67e22;
  transform: translateY(-1px);
}

/* 3.6 输入法提示 */
.input-method-hint {
  text-align: center;
  padding: 12px 20px;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border: 2px solid #f39c12;
  border-radius: 12px;
  color: #d68910;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* 3.7 统计信息 */
.stats {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
}
.stat-value.success {
  color: var(--success-color);
}

.stat-label {
  font-size: 0.8rem;
  color: #aaa;
  margin-top: 5px;
}

/* ============================================
   4. 成绩榜
   ============================================ */
.score-board {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  border-radius: 16px;
  padding: 20px;
  border: 2px solid #81c784;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  max-width: 380px;
}

.score-board-title {
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  color: #2e7d32;
  text-align: center;
}

.score-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.score-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 12px;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.score-item.latest {
  border-color: #4caf50;
  background: linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
}

.score-rank {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.rank-badge { font-size: 1.2rem; }
.rank-number {
  font-size: 0.9rem;
  font-weight: bold;
  color: #666;
}

.score-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.score-speed {
  font-size: 0.95rem;
  font-weight: bold;
  color: #333;
}

.score-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 0.85rem;
  color: #2e7d32;
  font-weight: 500;
  text-align: center;
}

.score-meta .meta-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.score-latest-badge {
  padding: 2px 6px;
  background: #4caf50;
  color: #fff;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: bold;
  flex-shrink: 0;
}

/* ============================================
   5. 关卡选择
   ============================================ */
.practice-levels {
  margin-top: var(--spacing-md);
}

.practice-levels h4 {
  margin-bottom: 15px;
  color: #ccc;
}

.level-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.level-btn {
  padding: 8px 16px;
  background: #333;
  color: #fff;
  border: 1px solid #555;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s;
}

.level-btn:hover {
  background: #444;
}

.level-btn.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
}

/* ============================================
   6. 完成弹窗
   ============================================ */
.completion-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.completion-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  color: #fff;
  animation: slideUp 0.4s ease;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.completion-emoji {
  font-size: 4rem;
  margin-bottom: 20px;
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.completion-title {
  font-size: 1.8rem;
  margin: 0 0 15px 0;
  font-weight: bold;
}

.completion-message {
  font-size: 1.1rem;
  margin: 0 0 30px 0;
  opacity: 0.9;
}

.comparison-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  margin-bottom: 25px;
}

.comparison-icon {
  font-size: 1.8rem;
  flex-shrink: 0;
}

.comparison-text {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
}

.completion-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
  gap: 15px;
  flex-wrap: wrap;
}

.completion-stat {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 80px;
}

.completion-stat .stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.completion-stat .stat-value {
  font-size: 1.5rem;
  font-weight: bold;
}

.current-rank {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 25px;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 12px 20px;
  border-radius: 24px;
}

.rank-icon { font-size: 1.3rem; }
.current-rank strong {
  font-size: 1.3rem;
  color: #ffd700;
}

.completion-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.completion-btn {
  padding: 15px 35px;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 140px;
}

.completion-btn.primary {
  background: #fff;
  color: #667eea;
}

.completion-btn.secondary {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: 2px solid #fff;
}

.completion-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.3);
}

.completion-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* ============================================
   8. 虚拟键盘显示
   ============================================ */
.virtual-keyboard {
  margin-top: 30px;
  padding: 20px;
  background: #1a1d21;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  overflow-x: auto;
  max-width: 100%;
}

.keyboard-row {
  display: flex;
  gap: 6px;
  justify-content: center;
  min-width: max-content;
}

.keyboard-key {
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #333;
  border: 1px solid #444;
  border-radius: 6px;
  color: #ccc;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.15s ease;
  user-select: none;
  padding: 0 8px;
  flex-shrink: 0;
}

.keyboard-key.wide {
  min-width: 60px;
}

.keyboard-key.extra-wide {
  min-width: 90px;
}

.keyboard-key.space-key {
  min-width: 300px;
}

/* 激活状态 */
.keyboard-key.active {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* 正确状态 - 绿色 */
.keyboard-key.active.correct {
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  border-color: #27ae60;
  color: #fff;
  box-shadow: 0 0 15px rgba(46, 204, 113, 0.5);
}

/* 错误状态 - 红色 */
.keyboard-key.active.error {
  background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
  border-color: #c0392b;
  color: #fff;
  box-shadow: 0 0 15px rgba(231, 76, 60, 0.5);
}

/* ============================================
   9. 移动端响应式
   ============================================ */
@media (max-width: 768px) {
  /* 完成弹窗移动端优化 */
  .completion-card {
    padding: 24px 20px;
    border-radius: 20px;
    max-height: 85vh;
    overflow-y: auto;
  }

  .completion-emoji {
    font-size: 3rem;
    margin-bottom: 15px;
  }

  .completion-title {
    font-size: 1.4rem;
    margin-bottom: 10px;
  }

  .completion-message {
    font-size: 0.95rem;
    margin-bottom: 20px;
  }

  .comparison-box {
    padding: 12px 15px;
    margin-bottom: 15px;
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }

  .comparison-icon {
    font-size: 1.5rem;
  }

  .comparison-text {
    font-size: 0.9rem;
  }

  .completion-stats {
    gap: 10px;
    margin-bottom: 20px;
  }

  .completion-stat {
    min-width: 60px;
    flex: 1 1 calc(50% - 10px);
    max-width: calc(50% - 5px);
  }

  .completion-stat .stat-label {
    font-size: 0.75rem;
  }

  .completion-stat .stat-value {
    font-size: 1.2rem;
  }

  .current-rank {
    padding: 10px 15px;
    margin-bottom: 15px;
    font-size: 0.95rem;
  }

  .current-rank strong {
    font-size: 1.1rem;
  }

  .completion-actions {
    flex-direction: column;
    gap: 10px;
  }

  .completion-btn {
    padding: 12px 24px;
    font-size: 1rem;
    min-width: 100%;
    width: 100%;
  }

  /* 虚拟键盘移动端 */
  .virtual-keyboard {
    padding: 12px;
    gap: 3px;
  }

  .keyboard-row {
    gap: 3px;
  }

  .keyboard-key {
    min-width: 24px;
    max-width: 32px;
    height: 28px;
    font-size: 0.55rem;
    padding: 0 3px;
  }

  .keyboard-key.wide {
    min-width: 36px;
    max-width: 50px;
  }

  .keyboard-key.extra-wide {
    min-width: 50px;
    max-width: 70px;
  }

  .keyboard-key.space-key {
    min-width: 80px;
    max-width: 120px;
    flex: 1;
  }
}

@media (max-width: 480px) {
  .completion-card {
    padding: 20px 16px;
    width: 95%;
  }

  .completion-stats {
    justify-content: center;
  }

  .completion-stat {
    flex: 1 1 calc(33% - 8px);
    max-width: calc(33% - 6px);
  }

  /* 虚拟键盘超小屏幕 */
  .virtual-keyboard {
    padding: 10px;
  }

  .keyboard-key {
    min-width: 20px;
    max-width: 28px;
    height: 26px;
    font-size: 0.5rem;
    padding: 0 2px;
  }

  .keyboard-key.wide {
    min-width: 32px;
    max-width: 45px;
  }

  .keyboard-key.extra-wide {
    min-width: 45px;
    max-width: 60px;
  }

  .keyboard-key.space-key {
    min-width: 60px;
    max-width: 100px;
  }
}
</style>
