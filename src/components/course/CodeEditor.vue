<template>
  <section class="editor-section">
    <div class="container">
      <h2 class="section-title">Python 在线编辑器</h2>
      <p class="editor-note">支持 Python 标准库（print, input, math, random, json, turtle 等）</p>
      <div class="editor-wrapper">
        <div class="editor-container">
          <div class="sidebar">
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
            <button @click="runCode" class="run-btn" :disabled="isRunning">
              {{ isRunning ? '运行中...' : '▶ 运行' }}
            </button>
            <button @click="clearCode" class="clear-btn">清空</button>
            <textarea ref="codeTextarea">{{ currentTemplate.content }}</textarea>
          </div>
        </div>
        <div class="output-container">
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
          <pre v-else :class="{ 'error': hasError }">{{ output || '运行代码后查看输出结果...' }}</pre>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Props
const props = defineProps({
  id: String
})

// Skulpt 实例
const skulptLoading = ref(true)
const skulptLoadError = ref('')

// CodeMirror 编辑器实例
let cmEditor = null
const codeTextarea = ref(null)

// CDN 源列表（按优先级排序，国内优先）
const SKULPT_CDNS = [
  {
    core: 'https://unpkg.com/skulpt@1.2.0/dist/skulpt.min.js',
    stdlib: 'https://unpkg.com/skulpt@1.2.0/dist/skulpt-stdlib.js'
  },
  {
    core: 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt.min.js',
    stdlib: 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt-stdlib.js'
  },
  {
    core: 'https://cdnjs.cloudflare.com/ajax/libs/skulpt/1.2.0/skulpt.min.js',
    stdlib: 'https://cdnjs.cloudflare.com/ajax/libs/skulpt/1.2.0/skulpt-stdlib.js'
  }
]

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

// 执行状态
const isRunning = ref(false)
const output = ref('')
const hasError = ref(false)

// 加载单个脚本（带超时）
const loadScript = (src, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src

    const timer = setTimeout(() => {
      script.remove()
      reject(new Error(`加载超时 (${timeout}ms)`))
    }, timeout)

    script.onload = () => {
      clearTimeout(timer)
      resolve()
    }

    script.onerror = () => {
      clearTimeout(timer)
      script.remove()
      reject(new Error('加载失败'))
    }

    document.head.appendChild(script)
  })
}

// 加载 Skulpt（支持 CDN 降级）
const loadSkulpt = async () => {
  // 如果已加载，直接返回
  if (typeof window.Sk !== 'undefined' && typeof window.Sk.builtinFiles !== 'undefined') {
    skulptLoading.value = false
    return
  }

  let lastError = null

  // 依次尝试各个 CDN 源
  for (let i = 0; i < SKULPT_CDNS.length; i++) {
    const cdn = SKULPT_CDNS[i]
    try {
      console.log(`正在尝试加载 Skulpt (CDN ${i + 1}/${SKULPT_CDNS.length})...`)

      // 加载核心库
      if (typeof window.Sk === 'undefined') {
        await loadScript(cdn.core)
      }

      // 加载标准库
      if (typeof window.Sk.builtinFiles === 'undefined') {
        await loadScript(cdn.stdlib)

        // 等待 builtinFiles 初始化
        let retries = 0
        while (typeof window.Sk.builtinFiles === 'undefined' && retries < 30) {
          await new Promise(r => setTimeout(r, 100))
          retries++
        }

        if (typeof window.Sk.builtinFiles === 'undefined') {
          throw new Error('标准库初始化失败')
        }
      }

      console.log('Skulpt 加载成功')
      skulptLoading.value = false
      return
    } catch (error) {
      console.warn(`CDN ${i + 1} 加载失败:`, error.message)
      lastError = error
      // 继续尝试下一个 CDN
    }
  }

  // 所有 CDN 都失败
  skulptLoadError.value = `Python 环境加载失败，请检查网络连接后刷新页面重试`
  skulptLoading.value = false
  console.error('所有 CDN 源均加载失败:', lastError)
}

// 初始化 CodeMirror
const initCodeMirror = () => {
  if (typeof CodeMirror === 'undefined') {
    console.error('CodeMirror 未加载')
    return
  }

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
    lineHeight: 1.5,
    viewportMargin: Infinity  // 确保长代码正确渲染
  })
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

// 运行代码（使用 Skulpt）
const runCode = async () => {
  if (!cmEditor || isRunning.value || skulptLoading.value) return

  const code = cmEditor.getValue()
  if (!code.trim()) return

  isRunning.value = true
  output.value = ''
  hasError.value = false

  try {
    // 配置 Skulpt 输出函数 - 直接更新 ref
    function outf(text) {
      output.value += text
    }

    // 配置 Skulpt 读取函数（用于 import）
    function builtinRead(x) {
      if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
        throw "File not found: '" + x + "'"
      }
      return Sk.builtinFiles["files"][x]
    }

    // 配置 Skulpt
    Sk.configure({
      output: outf,
      read: builtinRead,
      inputfun: (prompt) => {
        // 使用浏览器原生 prompt 进行输入
        // 支持 Skulpt 的同步输入机制
        const result = window.prompt(prompt || '> ')
        return result !== null ? result : ''
      },
      inputfunTakesPrompt: true,
    })

    // 运行代码
    await Sk.misceval.asyncToPromise(function() {
      return Sk.importMainWithBody("<stdin>", false, code, true)
    })

    if (!output.value) {
      output.value = '代码执行成功，无输出。'
    }

  } catch (error) {
    hasError.value = true
    output.value = error.toString() || String(error)
  } finally {
    isRunning.value = false
  }
}

// 清空输出
const clearOutput = () => {
  output.value = ''
  hasError.value = false
}

// 组件挂载
onMounted(() => {
  // 加载 Skulpt
  loadSkulpt()

  // 等待 CodeMirror 加载
  const checkCodeMirror = setInterval(() => {
    if (typeof CodeMirror !== 'undefined') {
      clearInterval(checkCodeMirror)
      initCodeMirror()
    }
  }, 100)
})
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/theme/monokai.min.css');

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
</style>
