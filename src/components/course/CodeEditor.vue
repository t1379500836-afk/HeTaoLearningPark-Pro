<template>
  <section class="editor-section" :class="{ 'minimal-mode': !showHeader }">
    <div class="container">
      <h2 v-if="showHeader" class="section-title">Python 在线编辑器</h2>
      <p v-if="showHeader" class="editor-note">支持 Python 标准库（print, input, math, random, json, turtle 等）</p>
      <div class="editor-wrapper">
        <div class="editor-container" :style="{ height }">
          <div v-if="showTemplates" class="sidebar">
            <h4>代码模板</h4>
            <ul class="file-list">
              <li
                v-for="template in templates"
                :key="template.name"
                @click="selectTemplate(template)"
                :class="{ active: currentTemplate.name === template.name }"
              >
                {{ template.name }}
              </li>
            </ul>
          </div>
          <div class="code-area">
            <button v-if="!isRunning" @click="runCode" class="run-btn">
              ▶ 运行
            </button>
            <button v-else @click="stopCode" class="stop-btn">
              ■ 停止
            </button>
            <button @click="clearCode" class="clear-btn">清空</button>
            <textarea ref="codeTextarea">{{ currentTemplate.content }}</textarea>
          </div>
        </div>
        <div class="output-container" :style="{ height }">
          <div class="output-header">
            <h4>输出结果</h4>
            <button @click="clearOutput" class="clear-output-btn">清空</button>
          </div>
          <div v-if="skulptLoading" class="loading-state">
            正在初始化 Python 环境，请稍等...
          </div>
          <div v-else-if="skulptLoadError" class="error-state">
            {{ skulptLoadError }}
          </div>
          <pre v-else ref="outputPreRef" :class="{ 'error': hasError }">{{ output || '运行代码后查看输出结果...' }}</pre>

          <!-- 终端输入行 -->
          <div v-if="waitingForInput" class="terminal-input-line">
            <span class="terminal-prompt">{{ inputPrompt }}</span>
            <input
              ref="terminalInputRef"
              v-model="terminalInput"
              type="text"
              class="terminal-input"
              @keydown.enter.prevent="submitTerminalInput"
            />
          </div>
          <div v-else-if="isRunning" class="terminal-status">程序运行中...</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  id: String,
  initialCode: String,
  showTemplates: { type: Boolean, default: true },
  showHeader: { type: Boolean, default: true },
  height: { type: String, default: '500px' }
})

// Worker
let worker = null
let workerReady = false
let forceStopTimer = null
let stoppingByUser = false

// 加载状态
const skulptLoading = ref(true)
const skulptLoadError = ref('')

// CodeMirror
let cmEditor = null
const codeTextarea = ref(null)

// 终端输入
const waitingForInput = ref(false)
const inputPrompt = ref('> ')
const terminalInput = ref('')
const terminalInputRef = ref(null)
const outputPreRef = ref(null)

// 执行状态
const isRunning = ref(false)
const output = ref('')
const hasError = ref(false)

// 代码模板
const templates = [
  {
    name: 'Hello World',
    content: '# 你的第一个 Python 程序\n\nprint("Hello, World!")\nprint("欢迎来到核桃编程!")'
  },
  {
    name: '输入输出',
    content: '# 练习 input() 和 print()\n\nname = input("请输入你的名字: ")\nage = input("请输入你的年龄: ")\n\nprint(f"你好, {name}!")\nprint(f"你今年 {age} 岁了")'
  },
  {
    name: '变量与计算',
    content: '# 变量和数学运算\n\na = 10\nb = 20\n\nprint(f"a + b = {a + b}")\nprint(f"a * b = {a * b}")\nprint(f"a 的平方 = {a ** 2}")'
  },
  {
    name: '条件判断',
    content: '# if 条件判断\n\nscore = int(input("请输入分数: "))\n\nif score >= 90:\n    print("优秀!")\nelif score >= 60:\n    print("及格了")\nelse:\n    print("需要加油哦")'
  },
  {
    name: '循环',
    content: '# for 循环练习\n\n# 打印 1 到 10\nfor i in range(1, 11):\n    print(f"数字: {i}")\n\n# 计算 1 到 100 的和\ntotal = sum(range(1, 101))\nprint(f"1到100的和: {total}")'
  }
]
const currentTemplate = ref(templates[0])

// 创建 Worker
function createWorker() {
  if (worker) worker.terminate()
  worker = new Worker('/skulpt.worker.js')
  workerReady = false
  skulptLoading.value = true
  skulptLoadError.value = ''

  worker.onmessage = (e) => {
    const { type, text, prompt, message } = e.data

    switch (type) {
      case 'ready':
        workerReady = true
        skulptLoading.value = false
        break

      case 'output':
        output.value += text
        scrollOutputToBottom()
        break

      case 'input':
        waitingForInput.value = true
        inputPrompt.value = prompt || '> '
        nextTick(() => {
          terminalInputRef.value?.focus()
          scrollOutputToBottom()
        })
        break

      case 'done':
        if (!output.value) {
          output.value = '代码执行成功，无输出。'
        }
        finishRun()
        break

      case 'error':
        hasError.value = true
        if (output.value) {
          output.value += '\n' + message
        } else {
          output.value = message
        }
        finishRun()
        break
    }
  }

  worker.onerror = (e) => {
    skulptLoadError.value = 'Python 环境加载失败，请刷新页面重试'
    skulptLoading.value = false
  }
}

function finishRun() {
  isRunning.value = false
  waitingForInput.value = false
  // 用户点停止时，不取消 force timer，让它兜底终止 Worker
  if (forceStopTimer && !stoppingByUser) {
    clearTimeout(forceStopTimer)
    forceStopTimer = null
  }
  stoppingByUser = false
}

// 初始化 CodeMirror
const initCodeMirror = () => {
  if (typeof CodeMirror === 'undefined') return

  cmEditor = CodeMirror.fromTextArea(codeTextarea.value, {
    mode: 'python',
    theme: 'monokai',
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    autoCloseBrackets: true,
    matchBrackets: true,
    styleActiveLine: true,
    viewportMargin: Infinity
  })

  if (props.initialCode !== undefined) {
    cmEditor.setValue(props.initialCode)
  }
}

// 选择模板
const selectTemplate = (template) => {
  if (cmEditor) {
    cmEditor.setValue(template.content)
    cmEditor.clearHistory()
  }
  currentTemplate.value = template
}

// 清空代码
const clearCode = () => {
  if (cmEditor) {
    cmEditor.setValue('# 在这里写你的代码\n')
  }
}

// 滚动输出到底部
function scrollOutputToBottom() {
  nextTick(() => {
    const el = outputPreRef.value
    if (el) el.scrollTop = el.scrollHeight
  })
}

// 运行代码
const runCode = () => {
  if (!cmEditor || isRunning.value || skulptLoading.value || !workerReady) return

  const code = cmEditor.getValue()
  if (!code.trim()) return

  // 重置状态
  output.value = ''
  hasError.value = false
  waitingForInput.value = false
  isRunning.value = true

  worker.postMessage({ type: 'run', code })
}

// 停止运行
function stopCode() {
  if (!worker) return
  stoppingByUser = true
  worker.postMessage({ type: 'stop' })
  // 兜底：500ms 后强制终止并重建 Worker
  forceStopTimer = setTimeout(() => {
    forceStopTimer = null
    stoppingByUser = false
    createWorker()
    finishRun()
  }, 500)
}

// 提交终端输入
function submitTerminalInput() {
  const text = terminalInput.value
  output.value += (inputPrompt.value || '> ') + text + '\n'
  terminalInput.value = ''
  waitingForInput.value = false
  scrollOutputToBottom()
  if (worker) {
    worker.postMessage({ type: 'input', input: text })
  }
}

// 清空输出
const clearOutput = () => {
  output.value = ''
  hasError.value = false
}

// 获取代码（供父组件调用）
function getCode() {
  return cmEditor ? cmEditor.getValue() : ''
}

defineExpose({ getCode })

onMounted(() => {
  createWorker()

  const checkCodeMirror = setInterval(() => {
    if (typeof CodeMirror !== 'undefined') {
      clearInterval(checkCodeMirror)
      initCodeMirror()
    }
  }, 100)

  // CodeMirror 加载超时保护
  setTimeout(() => {
    if (!cmEditor) clearInterval(checkCodeMirror)
  }, 10000)
})

onUnmounted(() => {
  if (forceStopTimer) clearTimeout(forceStopTimer)
  if (worker) worker.terminate()
  worker = null
})
</script>

<style scoped>
/* CodeMirror CSS 由 index.html 全局加载 */

.editor-section {
  padding: var(--spacing-xl) 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.section-title {
  text-align: center;
  margin-bottom: 10px;
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

.editor-note {
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: var(--spacing-md);
}

/* 编辑器和输出的弹性容器 */
.editor-wrapper {
  display: flex;
  gap: var(--spacing-md);
}

.editor-container {
  display: flex;
  height: 500px;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-editor);
  background: var(--editor-bg);
  flex: 1;
  min-width: 0;
}

.sidebar {
  width: 180px;
  background: var(--editor-sidebar);
  padding: var(--spacing-md);
  border-right: 1px solid #ddd;
}

.sidebar h4 {
  margin-bottom: 15px;
  color: #333;
  font-size: 1rem;
}

.file-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.file-list li {
  padding: 10px 12px;
  cursor: pointer;
  border-radius: var(--radius-sm);
  color: #555;
  transition: background 0.2s;
  margin-bottom: 5px;
  font-size: 0.9rem;
}

.file-list li:hover {
  background: #e0e0e0;
}

.file-list li.active {
  background: var(--primary-color);
  color: #fff;
  font-weight: 500;
}

.code-area {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 防止内容溢出 */
}

/* 工具栏容器 - 包裹按钮 */
.code-area::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  background: var(--editor-bg);
  z-index: 20;
  pointer-events: none;
}

.code-area textarea {
  flex: 1;
  display: none; /* 隐藏原始 textarea */
}

.run-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--success-color);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  z-index: 25; /* 确保在滚动条之上 */
  font-size: 0.9rem;
  transition: opacity 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.run-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.run-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.clear-btn {
  position: absolute;
  top: 8px;
  right: 85px;
  background: #666;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  z-index: 25; /* 确保在滚动条之上 */
  font-size: 0.9rem;
  transition: opacity 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.clear-btn:hover {
  opacity: 0.9;
}

/* CodeMirror 样式调整 */
:deep(.CodeMirror) {
  height: 100% !important;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 14px;
  direction: ltr; /* 确保正确的滚动方向 */
  padding-top: 45px; /* 为按钮留出空间 */
}

/* 确保滚动条容器正确显示 */
:deep(.CodeMirror-scroll) {
  overflow: auto !important;
}

/* CodeMirror 滚动条样式 - 深色主题 */
:deep(.CodeMirror-vscrollbar),
:deep(.CodeMirror-hscrollbar) {
  position: absolute !important;
  z-index: 6 !important;
}

:deep(.CodeMirror-vscrollbar) {
  right: 0 !important;
  top: 0 !important;
  bottom: 0 !important;
}

:deep(.CodeMirror-hscrollbar) {
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
}

:deep(.CodeMirror-vscrollbar::-webkit-scrollbar),
:deep(.CodeMirror-hscrollbar::-webkit-scrollbar),
:deep(.CodeMirror::-webkit-scrollbar) {
  width: 10px;
  height: 10px;
}

:deep(.CodeMirror-vscrollbar::-webkit-scrollbar-track),
:deep(.CodeMirror-hscrollbar::-webkit-scrollbar-track),
:deep(.CodeMirror::-webkit-scrollbar-track) {
  background: #282c34;
}

:deep(.CodeMirror-vscrollbar::-webkit-scrollbar-thumb),
:deep(.CodeMirror-hscrollbar::-webkit-scrollbar-thumb),
:deep(.CodeMirror::-webkit-scrollbar-thumb) {
  background: #444;
  border-radius: 5px;
}

:deep(.CodeMirror-vscrollbar::-webkit-scrollbar-thumb:hover),
:deep(.CodeMirror-hscrollbar::-webkit-scrollbar-thumb:hover),
:deep(.CodeMirror::-webkit-scrollbar-thumb:hover) {
  background: #555;
}

.output-container {
  width: 400px;
  height: 500px;
  background: #1a1d21;
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background: #2d3436;
  border-bottom: 1px solid #444;
}

.output-header h4 {
  color: #ccc;
  font-size: 0.9rem;
  margin: 0;
}

.clear-output-btn {
  background: transparent;
  color: #888;
  border: 1px solid #555;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.8rem;
}

.clear-output-btn:hover {
  background: #333;
  color: #fff;
}

.output-container pre {
  padding: 15px;
  margin: 0;
  color: #abb2bf;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 0.9rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.output-container pre.error {
  color: #e74c3c;
}

/* 自定义滚动条样式 - 深色主题 */
.output-container pre::-webkit-scrollbar {
  width: 10px;
}

.output-container pre::-webkit-scrollbar-track {
  background: #1a1d21;
}

.output-container pre::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 5px;
}

.output-container pre::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 响应式 */
@media (max-width: 1024px) {
  /* 中等屏幕时让编辑器和输出区域上下排列 */
  .editor-wrapper {
    flex-direction: column;
  }

  .output-container {
    width: 100%;
    height: 300px;
  }
}

@media (max-width: 768px) {
  .editor-container {
    flex-direction: column;
    height: auto;
  }

  .sidebar {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 15px;
    border-right: none;
    border-bottom: 1px solid #ddd;
    overflow-x: auto;
  }

  .sidebar h4 {
    margin-bottom: 0;
    margin-right: 10px;
    white-space: nowrap;
  }

  .file-list {
    display: flex;
    gap: 5px;
  }

  .file-list li {
    margin-bottom: 0;
    white-space: nowrap;
  }

  .code-area {
    height: 400px;
  }

  .run-btn {
    top: 5px;
    right: 5px;
    padding: 6px 12px;
    font-size: 0.8rem;
  }

  .clear-btn {
    top: 5px;
    right: 70px;
    padding: 6px 12px;
    font-size: 0.8rem;
  }

  .output-container {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 var(--spacing-sm);
  }

  .section-title {
    font-size: 1.5rem;
  }

  .editor-note {
    font-size: 0.8rem;
  }

  .code-area {
    height: 350px;
  }

  /* 触控优化：按钮 */
  .run-btn {
    padding: 10px 14px;
    min-height: var(--touch-target-min);
  }

  .clear-btn {
    padding: 10px 14px;
    min-height: var(--touch-target-min);
  }

  .clear-output-btn {
    padding: 6px 10px;
    min-height: var(--touch-target-min);
  }

  /* 模板列表触控优化 */
  .file-list li {
    padding: 12px 14px;
    min-height: var(--touch-target-min);
  }

  .output-container {
    height: 200px;
  }

  .output-container pre {
    font-size: 0.85rem;
    padding: 12px;
  }
}

/* 加载和错误状态样式 */
.loading-state, .error-state {
  padding: 15px;
  text-align: center;
  color: #666;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-state {
  color: #e74c3c;
}

/* 停止按钮 */
.stop-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  z-index: 25;
  font-size: 0.9rem;
  transition: opacity 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.stop-btn:hover {
  opacity: 0.9;
}

/* 终端输入行 */
.terminal-input-line {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background: #1a1d21;
  border-top: 1px solid #444;
  gap: 8px;
  min-height: 44px;
}

.terminal-prompt {
  color: #888;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 0.9rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.terminal-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #abb2bf;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 0.9rem;
  outline: none;
  min-height: 24px;
}

.terminal-input:focus {
  background: #25282e;
  border-radius: 4px;
  padding: 4px 8px;
}

/* 运行状态提示 */
.terminal-status {
  padding: 10px 15px;
  color: #666;
  font-size: 0.85rem;
  border-top: 1px solid #444;
  min-height: 44px;
  display: flex;
  align-items: center;
}

/* minimal 模式（无标题） */
.editor-section.minimal-mode {
  padding: 0;
}

.editor-section.minimal-mode .container {
  max-width: none;
  padding: 0;
}

/* 响应式补充 */
@media (max-width: 768px) {
  .stop-btn {
    top: 5px;
    right: 5px;
    padding: 6px 12px;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .stop-btn {
    padding: 10px 14px;
    min-height: var(--touch-target-min);
  }

  .terminal-input-line {
    padding: 12px;
    min-height: var(--touch-target-min);
  }

  .terminal-input {
    font-size: 0.85rem;
  }
}
</style>
