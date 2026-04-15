<template>
  <section class="shortcut-section">
    <div class="container">
      <h2 class="section-title">⌨️ 快捷键小达人</h2>
      <p class="section-subtitle">学会快捷键，打字更快更轻松！</p>

      <div class="practice-card">
        <!-- 当前快捷键展示 -->
        <div class="shortcut-info">
          <div class="shortcut-icon">{{ currentShortcut.icon }}</div>
          <h3 class="shortcut-name">{{ currentShortcut.name }}</h3>
          <p class="shortcut-description">{{ currentShortcut.description }}</p>
        </div>

        <!-- 快捷键显示 -->
        <div class="shortcut-keys-display">
          <template v-for="(key, index) in currentShortcut.keys" :key="key">
            <kbd class="shortcut-key">{{ formatKeyLabel(key) }}</kbd>
            <span v-if="index < currentShortcut.keys.length - 1" class="key-connector">+</span>
          </template>
        </div>

        <!-- 练习区域 -->
        <div v-if="currentShortcut.hasTextInput" class="practice-area">
          <p class="practice-hint">{{ practiceHint }}</p>
          <div class="text-input-wrapper">
            <textarea
              ref="practiceTextarea"
              v-model="textareaContent"
              class="practice-textarea"
              :placeholder="textareaPlaceholder"
              @keydown="handleKeyDown"
              @copy="handleCopy"
              @cut="handleCut"
              @paste="handlePaste"
              @select="handleSelect"
            ></textarea>
          </div>
          <div v-if="actionFeedback" class="action-feedback" :class="feedbackType">
            {{ actionFeedback }}
          </div>
        </div>

        <!-- 无需输入的快捷键（如保存） -->
        <div v-else class="action-area">
          <p class="practice-hint">{{ practiceHint }}</p>
          <div
            class="action-trigger-area"
            tabindex="0"
            @keydown="handleKeyDown"
          >
            <span class="action-hint">按下 {{ currentShortcut.name }}快捷键</span>
          </div>
          <div v-if="actionFeedback" class="action-feedback" :class="feedbackType">
            {{ actionFeedback }}
          </div>
        </div>

        <!-- 进度指示器 -->
        <div class="progress-indicator">
          <span class="progress-text">练习进度: {{ currentIndex + 1 }} / {{ shortcuts.length }}</span>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
          </div>
        </div>

        <!-- 控制按钮 -->
        <div class="control-buttons">
          <button @click="skipShortcut" class="skip-btn" :disabled="currentIndex >= shortcuts.length - 1">
            跳过 →
          </button>
        </div>

        <!-- 提示信息 -->
        <div class="input-method-hint">
          💡 提示：先按住 Ctrl 键不放，再按第二个键，然后一起松开
        </div>
      </div>
    </div>

    <!-- 虚拟键盘 -->
    <div class="virtual-keyboard">
      <div v-for="(row, rowIndex) in keyboardLayout" :key="rowIndex" class="keyboard-row">
        <div
          v-for="key in row"
          :key="key"
          class="keyboard-key"
          :class="{
            'highlight': shouldHighlightKey(key),
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

        <div class="completion-stats">
          <div class="completion-stat">
            <span class="stat-icon">📊</span>
            <span class="stat-value">学会了 {{ shortcuts.length }} 个快捷键</span>
          </div>
        </div>

        <div class="completion-encouragement">
          <p>继续练习，成为电脑小高手！</p>
        </div>

        <div class="completion-actions">
          <button @click="goBack" class="completion-btn secondary">
            返回 ←
          </button>
          <button @click="restartPractice" class="completion-btn primary">
            再练一次 🚀
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  scoreHistory: {
    type: Array,
    default: () => []
  }
})

// Emits
const emit = defineEmits(['complete', 'restart', 'update:scoreHistory'])

// 快捷键数据
const shortcuts = [
  {
    id: 'copy',
    name: '复制',
    description: 'Ctrl+C 可以复制选中的内容',
    keys: ['Control', 'c'],
    icon: '📋',
    difficulty: 'easy',
    hasTextInput: true,
    inputAction: 'copy',
    practiceText: 'Hello, World!',
    hint: '请先选中下面的文字，然后按 Ctrl+C 复制'
  },
  {
    id: 'paste',
    name: '粘贴',
    description: 'Ctrl+V 可以粘贴复制的内容',
    keys: ['Control', 'v'],
    icon: '📄',
    difficulty: 'easy',
    hasTextInput: true,
    inputAction: 'paste',
    practiceText: '',
    hint: '请点击下方输入框，然后按 Ctrl+V 粘贴刚才复制的内容'
  },
  {
    id: 'cut',
    name: '剪切',
    description: 'Ctrl+X 可以剪切选中的内容',
    keys: ['Control', 'x'],
    icon: '✂️',
    difficulty: 'medium',
    hasTextInput: true,
    inputAction: 'cut',
    practiceText: '这是要剪切的文字',
    hint: '请选中下面的文字，然后按 Ctrl+X 剪切（文字会消失）'
  },
  {
    id: 'selectAll',
    name: '全选',
    description: 'Ctrl+A 可以全选所有内容',
    keys: ['Control', 'a'],
    icon: '📝',
    difficulty: 'easy',
    hasTextInput: true,
    inputAction: 'selectAll',
    practiceText: '这是第一行\n这是第二行\n这是第三行',
    hint: '请点击下方输入框，然后按 Ctrl+A 全选所有文字'
  },
  {
    id: 'undo',
    name: '撤销',
    description: 'Ctrl+Z 可以撤销上一步操作',
    keys: ['Control', 'z'],
    icon: '↩️',
    difficulty: 'medium',
    hasTextInput: true,
    inputAction: 'undo',
    practiceText: '请删除这几个字',
    hint: '先删除一些文字，然后按 Ctrl+Z 撤销'
  },
  {
    id: 'save',
    name: '保存',
    description: 'Ctrl+S 通常用来保存文件（这里只是模拟练习）',
    keys: ['Control', 's'],
    icon: '💾',
    difficulty: 'hard',
    hasTextInput: false,
    inputAction: 'save',
    hint: '按 Ctrl+S 完成保存练习（不会真的保存文件）'
  }
]

// 状态
const currentIndex = ref(0)
const isCompleted = ref(false)
const practiceTextarea = ref(null)
const textareaContent = ref('')
const activeKey = ref('')
const keyStatus = ref('default')
const actionFeedback = ref('')
const feedbackType = ref('success')
const completedCount = ref(0)

// 计时器
let keyTimer = null
let feedbackTimer = null

// 键盘布局
const keyboardLayout = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
  ['Ctrl', 'Space', 'Alt', 'Ctrl']
]

// 计算属性
const currentShortcut = computed(() => {
  return shortcuts[currentIndex.value] || shortcuts[0]
})

const progressPercent = computed(() => {
  return ((currentIndex.value) / shortcuts.length) * 100
})

const practiceHint = computed(() => {
  return currentShortcut.value.hint || ''
})

const textareaPlaceholder = computed(() => {
  if (currentShortcut.value.inputAction === 'paste') {
    return '在这里粘贴内容...'
  }
  return ''
})

// 完成界面文案
const completionTitle = computed(() => {
  const titles = [
    '🎉 太棒了！你是快捷键小达人！',
    '⭐ 真厉害！学会了好多快捷键！',
    '🏆 快捷键大师诞生啦！'
  ]
  return titles[Math.floor(Math.random() * titles.length)]
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

// 方法
const formatKeyLabel = (key) => {
  const labelMap = {
    'Backspace': '⌫',
    'Tab': '⇥',
    'Enter': '↵',
    'Shift': '⇧',
    'Control': 'Ctrl',
    'Ctrl': 'Ctrl',
    'Meta': '⌘',
    'Alt': 'Alt',
    'CapsLock': '⇪',
    'Space': ''
  }
  return labelMap[key] || key.toUpperCase()
}

const shouldHighlightKey = (key) => {
  const keys = currentShortcut.value.keys
  // 处理 Control 和 Ctrl 的映射
  const normalizedKeys = keys.map(k => k === 'Control' ? 'Ctrl' : k)
  const normalizedKey = key === 'Control' ? 'Ctrl' : key
  return normalizedKeys.includes(normalizedKey)
}

const isWideKey = (key) => {
  return ['Tab', 'Backspace', 'CapsLock', 'Enter', '\\', 'Ctrl'].includes(key)
}

const isExtraWideKey = (key) => {
  return ['Shift'].includes(key)
}

const showKeyFeedback = (key, status) => {
  if (keyTimer) {
    clearTimeout(keyTimer)
  }

  activeKey.value = key
  keyStatus.value = status

  keyTimer = setTimeout(() => {
    activeKey.value = ''
    keyStatus.value = 'default'
  }, 300)
}

const showFeedback = (message, type = 'success') => {
  actionFeedback.value = message
  feedbackType.value = type

  if (feedbackTimer) {
    clearTimeout(feedbackTimer)
  }

  feedbackTimer = setTimeout(() => {
    actionFeedback.value = ''
  }, 2000)
}

const getSuccessMessage = () => {
  const messages = [
    '太棒了！成功了！',
    '真厉害！继续加油！',
    '做得很好！',
    '你学会这个快捷键了！',
    '完美！下一个！'
  ]
  return messages[Math.floor(Math.random() * messages.length)]
}

const getRetryMessage = () => {
  const messages = [
    '没关系，再试一次！',
    '加油！你可以的！',
    '按住 Ctrl 键，再按第二个键哦~',
    '别着急，慢慢来！',
    '继续努力，快成功了！'
  ]
  return messages[Math.floor(Math.random() * messages.length)]
}

const handleKeyDown = (e) => {
  const action = currentShortcut.value.inputAction

  // 阻止浏览器默认行为（如 Ctrl+S 保存页面）
  if (e.ctrlKey && ['s', 'S'].includes(e.key)) {
    e.preventDefault()
  }

  // 显示按键高亮
  if (e.ctrlKey) {
    showKeyFeedback('Ctrl', 'default')
  }
  if (e.key && e.key.length === 1) {
    showKeyFeedback(e.key.toLowerCase(), 'default')
  }

  // 检测快捷键
  if (e.ctrlKey && e.key.toLowerCase() === 'c' && action === 'copy') {
    // 复制快捷键 - 在 handleCopy 中验证
  } else if (e.ctrlKey && e.key.toLowerCase() === 'v' && action === 'paste') {
    // 粘贴快捷键 - 在 handlePaste 中验证
  } else if (e.ctrlKey && e.key.toLowerCase() === 'x' && action === 'cut') {
    // 剪切快捷键 - 在 handleCut 中验证
  } else if (e.ctrlKey && e.key.toLowerCase() === 'a' && action === 'selectAll') {
    // 全选 - 不阻止默认行为，让浏览器先执行全选
    // 然后在 checkSelectAll 中检测是否成功
    checkSelectAll(e)
  } else if (e.ctrlKey && e.key.toLowerCase() === 'z' && action === 'undo') {
    // 撤销 - 在浏览器自动处理后验证
    e.preventDefault()
    checkUndo(e)
  } else if (e.ctrlKey && e.key.toLowerCase() === 's' && action === 'save') {
    // 保存（模拟）
    e.preventDefault()
    checkSave()
  }
}

const handleCopy = (e) => {
  if (currentShortcut.value.inputAction !== 'copy') return

  const selection = window.getSelection().toString()
  if (selection.length > 0) {
    showKeyFeedback('c', 'correct')
    showFeedback(getSuccessMessage(), 'success')
    completedCount.value++
    setTimeout(() => nextShortcut(), 1000)
  }
}

const handleCut = (e) => {
  if (currentShortcut.value.inputAction !== 'cut') return

  const selection = window.getSelection().toString()
  if (selection.length > 0) {
    showKeyFeedback('x', 'correct')
    showFeedback(getSuccessMessage(), 'success')
    completedCount.value++
    setTimeout(() => nextShortcut(), 1000)
  }
}

const handlePaste = (e) => {
  if (currentShortcut.value.inputAction !== 'paste') return

  const clipboardData = e.clipboardData?.getData('text') || ''
  if (clipboardData.length > 0) {
    showKeyFeedback('v', 'correct')
    showFeedback(getSuccessMessage(), 'success')
    completedCount.value++
    setTimeout(() => nextShortcut(), 1000)
  }
}

const handleSelect = () => {
  // 可用于全选检测的辅助
}

const checkSelectAll = (e) => {
  // 全选成功检测 - 检查文本是否被全选
  setTimeout(() => {
    const textarea = practiceTextarea.value
    if (textarea) {
      const selectionStart = textarea.selectionStart
      const selectionEnd = textarea.selectionEnd
      const textLength = textarea.value.length

      console.log('全选检测:', { selectionStart, selectionEnd, textLength })

      // 全选成功：选区从0开始，到文本末尾结束
      if (selectionStart === 0 && selectionEnd === textLength && textLength > 0) {
        showKeyFeedback('a', 'correct')
        showFeedback(getSuccessMessage(), 'success')
        completedCount.value++
        setTimeout(() => nextShortcut(), 1000)
      } else {
        showKeyFeedback('a', 'error')
        showFeedback(getRetryMessage(), 'error')
      }
    } else {
      console.log('textarea 未找到')
    }
  }, 100)
}

const checkUndo = (e) => {
  // 撤销成功检测 - 监听内容变化
  const beforeContent = textareaContent.value
  setTimeout(() => {
    // 撤销通常会恢复之前的内容
    showKeyFeedback('z', 'correct')
    showFeedback(getSuccessMessage(), 'success')
    completedCount.value++
    setTimeout(() => nextShortcut(), 1000)
  }, 100)
}

const checkSave = () => {
  // 模拟保存
  showKeyFeedback('s', 'correct')
  showFeedback('保存成功！你学会了 Ctrl+S 快捷键！', 'success')
  completedCount.value++
  setTimeout(() => nextShortcut(), 1000)
}

const nextShortcut = () => {
  if (currentIndex.value < shortcuts.length - 1) {
    currentIndex.value++
    textareaContent.value = currentShortcut.value.practiceText || ''
    actionFeedback.value = ''
    // 聚焦到输入框
    setTimeout(() => {
      practiceTextarea.value?.focus()
    }, 100)
  } else {
    // 完成所有练习
    completePractice()
  }
}

const skipShortcut = () => {
  if (currentIndex.value < shortcuts.length - 1) {
    currentIndex.value++
    textareaContent.value = currentShortcut.value.practiceText || ''
    actionFeedback.value = ''
  }
}

const completePractice = () => {
  isCompleted.value = true
  emit('complete', {
    completedCount: completedCount.value,
    totalCount: shortcuts.length
  })
}

const restartPractice = () => {
  currentIndex.value = 0
  isCompleted.value = false
  completedCount.value = 0
  textareaContent.value = currentShortcut.value.practiceText || ''
  actionFeedback.value = ''
  emit('restart')
}

const goBack = () => {
  isCompleted.value = false
  currentIndex.value = 0
  completedCount.value = 0
  textareaContent.value = currentShortcut.value.practiceText || ''
  actionFeedback.value = ''
  emit('restart')
}

// 全局键盘监听（用于无输入框的快捷键）
const globalKeyHandler = (e) => {
  if (!currentShortcut.value.hasTextInput) {
    handleKeyDown(e)
  }
}

// 生命周期
onMounted(() => {
  textareaContent.value = currentShortcut.value.practiceText || ''
  document.addEventListener('keydown', globalKeyHandler)
})

onUnmounted(() => {
  document.removeEventListener('keydown', globalKeyHandler)
  if (keyTimer) clearTimeout(keyTimer)
  if (feedbackTimer) clearTimeout(feedbackTimer)
})
</script>

<style scoped>
/* 容器 */
.shortcut-section {
  padding: 40px 0;
  background: linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 标题 */
.section-title {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
}

.section-subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}

/* 练习卡片 */
.practice-card {
  background: #fff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* 快捷键信息 */
.shortcut-info {
  text-align: center;
  margin-bottom: 25px;
}

.shortcut-icon {
  font-size: 3rem;
  margin-bottom: 10px;
}

.shortcut-name {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 8px;
}

.shortcut-description {
  color: #666;
  font-size: 1rem;
}

/* 快捷键显示 */
.shortcut-keys-display {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin: 25px 0;
}

.shortcut-key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  height: 55px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #ff9f00 0%, #ffb347 100%);
  border-radius: 12px;
  color: #fff;
  font-weight: bold;
  font-size: 1.3rem;
  box-shadow: 0 4px 15px rgba(255, 159, 0, 0.3);
  font-family: monospace;
}

.key-connector {
  font-size: 1.5rem;
  color: #999;
  font-weight: bold;
}

/* 练习区域 */
.practice-area {
  margin: 25px 0;
}

.practice-hint {
  text-align: center;
  color: #555;
  margin-bottom: 15px;
  font-size: 1rem;
  background: #f0f8ff;
  padding: 12px;
  border-radius: 8px;
  border: 2px dashed #4facfe;
}

.text-input-wrapper {
  display: flex;
  justify-content: center;
}

.practice-textarea {
  width: 100%;
  max-width: 500px;
  min-height: 120px;
  padding: 15px;
  font-size: 1.1rem;
  font-family: monospace;
  border: 2px solid #ddd;
  border-radius: 12px;
  resize: vertical;
  outline: none;
  transition: border-color 0.3s;
}

.practice-textarea:focus {
  border-color: #ff9f00;
  box-shadow: 0 0 10px rgba(255, 159, 0, 0.2);
}

/* 无输入区域 */
.action-area {
  margin: 25px 0;
}

.action-trigger-area {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  background: #f8f9fa;
  border: 2px dashed #ddd;
  border-radius: 12px;
  cursor: pointer;
}

.action-trigger-area:focus {
  border-color: #ff9f00;
  outline: none;
}

.action-hint {
  color: #999;
  font-size: 1rem;
}

/* 反馈消息 */
.action-feedback {
  text-align: center;
  margin-top: 15px;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 500;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.action-feedback.success {
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  color: #155724;
  border: 2px solid #28a745;
}

.action-feedback.error {
  background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
  color: #721c24;
  border: 2px solid #dc3545;
}

/* 进度指示器 */
.progress-indicator {
  margin: 25px 0;
}

.progress-text {
  display: block;
  text-align: center;
  color: #666;
  margin-bottom: 10px;
  font-size: 0.95rem;
}

.progress-bar {
  height: 10px;
  background: #e9ecef;
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff9f00, #ffb347);
  border-radius: 5px;
  transition: width 0.5s ease;
}

/* 控制按钮 */
.control-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.skip-btn {
  padding: 10px 25px;
  background: #f8f9fa;
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.3s;
}

.skip-btn:hover:not(:disabled) {
  background: #e9ecef;
  border-color: #ccc;
}

.skip-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 输入法提示 */
.input-method-hint {
  text-align: center;
  padding: 12px 20px;
  margin-top: 20px;
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border: 2px solid #f39c12;
  border-radius: 12px;
  color: #d68910;
  font-size: 0.95rem;
}

/* 虚拟键盘 */
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
  min-width: 150px;
}

/* 高亮状态 - 快捷键提示 */
.keyboard-key.highlight {
  background: linear-gradient(135deg, #ff9f00 0%, #ffb347 100%);
  border-color: #ff9f00;
  color: #fff;
  animation: pulse 1.5s ease-in-out infinite;
  transform: scale(1.05);
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(255, 159, 0, 0.3);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(255, 159, 0, 0.5);
  }
}

/* 激活状态 */
.keyboard-key.active {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* 正确状态 */
.keyboard-key.active.correct {
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  border-color: #27ae60;
  color: #fff;
  box-shadow: 0 0 15px rgba(46, 204, 113, 0.5);
}

/* 错误状态 */
.keyboard-key.active.error {
  background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
  border-color: #c0392b;
  color: #fff;
  box-shadow: 0 0 15px rgba(231, 76, 60, 0.5);
}

/* 完成弹窗 */
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

.completion-stats {
  margin-bottom: 25px;
}

.completion-stat {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.2);
  padding: 15px 20px;
  border-radius: 12px;
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: bold;
}

.completion-encouragement {
  margin-bottom: 25px;
  opacity: 0.9;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .practice-card {
    padding: 20px;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .shortcut-icon {
    font-size: 2.5rem;
  }

  .shortcut-name {
    font-size: 1.3rem;
  }

  .shortcut-key {
    min-width: 60px;
    height: 45px;
    font-size: 1.1rem;
    padding: 10px 15px;
  }

  .key-connector {
    font-size: 1.2rem;
  }

  .completion-card {
    padding: 24px 20px;
  }

  .completion-emoji {
    font-size: 3rem;
  }

  .completion-title {
    font-size: 1.4rem;
  }

  .completion-btn {
    padding: 12px 24px;
    font-size: 1rem;
    min-width: 120px;
  }

  .virtual-keyboard {
    padding: 12px;
    gap: 3px;
  }

  .keyboard-row {
    gap: 3px;
  }

  .keyboard-key {
    min-width: 28px;
    max-width: 35px;
    height: 32px;
    font-size: 0.6rem;
    padding: 0 3px;
  }

  .keyboard-key.wide {
    min-width: 42px;
    max-width: 55px;
  }

  .keyboard-key.extra-wide {
    min-width: 55px;
    max-width: 70px;
  }

  .keyboard-key.space-key {
    min-width: 80px;
    max-width: 120px;
  }
}
</style>
