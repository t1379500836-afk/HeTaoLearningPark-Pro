<template>
  <div class="question-view">
    <div class="question-container">
      <!-- 左侧：题目信息 -->
      <div class="info-left">
        <div class="nav-header">
          <router-link :to="prefixedPath('/library')" class="back-link">
            ← 返回题库
          </router-link>
        </div>

        <div v-if="!question" class="empty-state">
          <p>题目不存在或已删除</p>
          <router-link :to="prefixedPath('/library')">返回题库</router-link>
        </div>

        <template v-else>
          <!-- 编号 + 标题 -->
          <div class="question-id-title">
            <span class="question-id">T{{ question.id }}</span>
            <span class="question-title">{{ question.title }}</span>
          </div>

          <!-- 难度 + 标签 -->
          <div class="difficulty-tags-row">
            <span class="info-difficulty" :class="question.difficulty">
              {{ difficultyLabel(question.difficulty) }}
            </span>
            <span
              v-for="tagId in (question.tags || [])"
              :key="tagId"
              class="info-tag"
              :style="{ background: tagMap[tagId]?.color || '#ccc' }"
            >
              {{ tagMap[tagId]?.name || '' }}
            </span>
          </div>

          <!-- 运行通过进度条 -->
          <div class="stats-progress">
            <div class="stats-row">
              <span>运行 {{ stats.attempts }} 次</span>
              <span class="stats-divider">|</span>
              <span>通过 {{ stats.passed }} 次</span>
            </div>
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: progressPercent + '%' }"
              ></div>
            </div>
          </div>

          <!-- 题目描述 -->
          <div class="content-card" v-html="renderedContent"></div>

          <!-- 提交后的测试结果（编程题） -->
          <div v-if="programResult" class="test-results-submit">
            <div class="result-badge" :class="programResult.status">
              {{ programResult.status === 'passed' ? '✅ 全部通过！' : '❌ 未全部通过' }}
              <span v-if="programResult.totalScore > 0" class="result-score">
                {{ programResult.earnedScore }}/{{ programResult.totalScore }} 分
              </span>
            </div>
            <div class="test-results">
              <div
                v-for="(r, idx) in programResult.results"
                :key="idx"
                class="test-result-item"
                :class="r.passed ? 'pass' : 'fail'"
              >
                <div class="result-header">
                  <span>{{ r.passed ? '✅' : '❌' }} 测试用例 {{ idx + 1 }}</span>
                </div>
                <div class="result-detail">
                  <div><strong>输入：</strong><code>{{ r.input }}</code></div>
                  <div><strong>期望输出：</strong><code>{{ r.expectedOutput }}</code></div>
                  <div><strong>实际输出：</strong><code>{{ r.actualOutput || '(无输出)' }}</code></div>
                  <div v-if="r.error" class="error-msg"><strong>错误：</strong>{{ r.error }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- 右侧：答题区 -->
      <div class="answer-right">
        <template v-if="question">
          <!-- 选择题 -->
          <section v-if="question.type === 'choice'" class="answer-section">
            <h3>请选择正确答案</h3>
            <div class="options-list">
              <label
                v-for="(opt, idx) in question.choices || []"
                :key="idx"
                class="option-item"
                :class="{
                  selected: selectedOption === idx,
                  correct: showResult && opt.isCorrect,
                  wrong: showResult && selectedOption === idx && !opt.isCorrect
                }"
              >
                <input
                  v-model="selectedOption"
                  type="radio"
                  :value="idx"
                  :disabled="showResult"
                />
                <span class="option-index">{{ ['A', 'B', 'C', 'D', 'E', 'F'][idx] }}</span>
                <span class="option-text">{{ opt.content }}</span>
              </label>
            </div>

            <div v-if="!showResult" class="submit-area">
              <button
                class="submit-btn"
                :disabled="selectedOption === -1"
                @click="submitChoice"
              >
                提交答案
              </button>
            </div>

            <div v-else class="result-area">
              <div class="result-badge" :class="choiceResult.correct ? 'pass' : 'fail'">
                {{ choiceResult.correct ? '✅ 回答正确！' : '❌ 回答错误' }}
                <span class="result-score">
                  {{ choiceResult.earnedScore }}/{{ choiceResult.totalScore }} 分
                </span>
              </div>
              <p v-if="!choiceResult.correct" class="result-hint">
                正确答案是：<strong>{{ ['A', 'B', 'C', 'D', 'E', 'F'][choiceResult.answer] }}</strong>
              </p>
              <button class="retry-btn" @click="resetChoice">重新作答</button>
            </div>
          </section>

          <!-- 编程题 -->
          <section v-else class="answer-section">
            <h3>编写代码</h3>

            <!-- 测试用例（只显示第一条） -->
            <div class="testcases-table" v-if="firstTestCase">
              <table>
                <thead>
                  <tr>
                    <th>输入</th>
                    <th>期望输出</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>{{ firstTestCase.input }}</code></td>
                    <td><code>{{ firstTestCase.expectedOutput }}</code></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 代码编辑器 -->
            <div class="editor-section">
              <div class="input-area">
                <div class="input-header">
                  <span>代码输入</span>
                  <div class="header-btns">
                    <button class="tool-btn run-btn" @click="runCode" :disabled="isRunning">
                      {{ isRunning ? '■ 运行中' : '▶ 运行' }}
                    </button>
                    <button class="tool-btn clear-btn" @click="clearCode">清空</button>
                  </div>
                </div>
                <textarea
                  ref="codeTextareaRef"
                  v-model="codeInput"
                  class="code-input"
                  placeholder="在此编写 Python 代码..."
                  spellcheck="false"
                ></textarea>
              </div>
              <div class="output-area">
                <div class="output-header">
                  <span>输出结果</span>
                  <button class="tool-btn-small" @click="clearOutput">清空</button>
                </div>
                <div v-if="skulptLoading" class="loading-state">正在初始化 Python 环境，请稍等...</div>
                <pre v-else class="output-content" :class="{ error: hasError }">{{ runOutput || '运行代码后查看输出结果...' }}</pre>

                <!-- 终端输入行 -->
                <div v-if="waitingForInput" class="terminal-input-line">
                  <span class="terminal-prompt">{{ inputPrompt }}</span>
                  <input
                    v-model="terminalInput"
                    type="text"
                    class="terminal-input"
                    @keydown.enter.prevent="submitTerminalInput"
                  />
                </div>
                <div v-else-if="isRunning" class="terminal-status">程序运行中...</div>
              </div>
            </div>

            <div class="submit-area">
              <button class="submit-btn" :disabled="isJudging" @click="submitCode">
                {{ isJudging ? '提交中...' : '提交' }}
              </button>
            </div>
          </section>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLibrary } from '@/composables/useLibrary.js'
import { getCurrentPrefix, prefixedPath as buildPrefixedPath } from '@/composables/useRoutePrefix.js'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

const route = useRoute()
const router = useRouter()
const prefix = computed(() => getCurrentPrefix(route))

const { tagMap, getQuestionById, judgeChoice, judgeProgram, reload, questionStats } = useLibrary()

onMounted(() => {
  reload()
  const checkCodeMirror = setInterval(() => {
    if (typeof CodeMirror !== 'undefined') {
      clearInterval(checkCodeMirror)
      initCodeMirror()
    }
  }, 100)
  setTimeout(() => {
    if (!cmEditor) clearInterval(checkCodeMirror)
  }, 10000)
})

const question = computed(() => getQuestionById(props.id))

const stats = computed(() => {
  return questionStats.value[props.id] || { attempts: 0, passed: 0 }
})

const progressPercent = computed(() => {
  const { attempts, passed } = stats.value
  if (!attempts) return 0
  return Math.round((passed / attempts) * 100)
})

const firstTestCase = computed(() => {
  const cases = question.value?.testCases
  if (!cases || cases.length === 0) return null
  return cases[0]
})

const renderedContent = computed(() => {
  if (!question.value) return ''
  return question.value.content.replace(/\n/g, '<br>')
})

const starterCode = computed(() => {
  if (!question.value) return ''
  return ''
})

function difficultyLabel(diff) {
  const map = { easy: '简单', medium: '中等', hard: '困难' }
  return map[diff] || diff
}

function prefixedPath(path) {
  return buildPrefixedPath(prefix.value, path)
}

// 选择题逻辑
const selectedOption = ref(-1)
const showResult = ref(false)
const choiceResult = ref(null)

async function submitChoice() {
  if (selectedOption.value === -1) return
  choiceResult.value = judgeChoice(question.value, selectedOption.value)
  showResult.value = true

  try {
    await fetch('/api/library/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionId: question.value.id,
        status: choiceResult.value.correct ? 'passed' : 'failed',
        score: choiceResult.value.score,
        earnedScore: choiceResult.value.earnedScore,
        totalScore: choiceResult.value.totalScore
      })
    })
    // 提交成功后刷新统计数据
    await reload()
  } catch (e) {
    console.log('提交记录失败', e)
  }
}

function resetChoice() {
  selectedOption.value = -1
  showResult.value = false
  choiceResult.value = null
}

// 编程题逻辑
const isRunning = ref(false)
const isJudging = ref(false)
const programResult = ref(null)
const runOutput = ref('')
const hasError = ref(false)
const skulptLoading = ref(false)
const codeInput = ref('# 在此编写代码\nprint("Hello, World!")')
let runWorker = null
let workerReady = false

// 终端输入相关
const waitingForInput = ref(false)
const inputPrompt = ref('> ')
const terminalInput = ref('')
let pendingInputResolve = null

// CodeMirror
const codeTextareaRef = ref(null)
let cmEditor = null


function clearOutput() {
  runOutput.value = ''
  hasError.value = false
}

function clearCode() {
  if (cmEditor) {
    cmEditor.setValue('# 在此编写代码\n')
    cmEditor.clearHistory()
  } else {
    codeInput.value = '# 在此编写代码\n'
  }
}

function initCodeMirror() {
  if (typeof CodeMirror === 'undefined' || !codeTextareaRef.value) return

  cmEditor = CodeMirror.fromTextArea(codeTextareaRef.value, {
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

  cmEditor.on('change', () => {
    codeInput.value = cmEditor.getValue()
  })
}

function submitTerminalInput() {
  const text = terminalInput.value
  runOutput.value += (inputPrompt.value || '> ') + text + '\n'
  terminalInput.value = ''
  if (pendingInputResolve) {
    pendingInputResolve(text)
    pendingInputResolve = null
  }
}

function stopRun() {
  if (runWorker) {
    runWorker.terminate()
    runWorker = null
  }
  workerReady = false
  isRunning.value = false
  waitingForInput.value = false
  if (pendingInputResolve) {
    pendingInputResolve('')
    pendingInputResolve = null
  }
}

function initRunWorker() {
  if (runWorker) runWorker.terminate()
  runWorker = new Worker('/skulpt.worker.js')
  workerReady = false
  skulptLoading.value = true

  runWorker.onmessage = (e) => {
    const { type, text, prompt, message } = e.data
    if (type === 'ready') {
      workerReady = true
      skulptLoading.value = false
    } else if (type === 'output') {
      runOutput.value += text
    } else if (type === 'input') {
      waitingForInput.value = true
      inputPrompt.value = prompt || '> '
      pendingInputResolve = (val) => {
        waitingForInput.value = false
        runWorker.postMessage({ type: 'input', input: val })
      }
    } else if (type === 'done') {
      if (!runOutput.value) runOutput.value = '代码执行成功，无输出。'
      isRunning.value = false
      waitingForInput.value = false
    } else if (type === 'error') {
      hasError.value = true
      runOutput.value = message
      isRunning.value = false
      waitingForInput.value = false
    }
  }

  runWorker.onerror = () => {
    skulptLoading.value = false
    workerReady = false
    hasError.value = true
    runOutput.value = 'Python 环境加载失败，请刷新页面重试'
    isRunning.value = false
  }
}

// 初始化 worker
initRunWorker()

// 运行代码（纯执行，显示输出到下方）
async function runCode() {
  if (!codeInput.value.trim()) return
  if (!workerReady || skulptLoading.value) return

  isRunning.value = true
  runOutput.value = ''
  hasError.value = false
  runWorker.postMessage({ type: 'run', code: codeInput.value })
}

// 提交判题
async function submitCode() {
  if (!question.value) return
  const code = codeInput.value
  if (!code.trim()) return

  isJudging.value = true
  programResult.value = null
  runOutput.value = ''
  hasError.value = false

  try {
    const result = await judgeProgram(question.value, code)
    programResult.value = result

    const submitStatus = result.status === 'timeout' ? 'error' : result.status
    try {
      await fetch('/api/library/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: question.value.id,
          status: submitStatus,
          score: result.score,
          earnedScore: result.earnedScore,
          totalScore: result.totalScore,
          code
        })
      })
      // 提交成功后刷新统计数据
      await reload()
    } catch (e) {
      console.log('提交记录失败', e)
    }
  } catch (e) {
    programResult.value = {
      status: 'error',
      score: 0,
      results: [],
      error: e.message || '运行出错'
    }
  } finally {
    isJudging.value = false
  }
}
</script>

<style scoped>
.question-view {
  min-height: 100vh;
  padding: 30px 20px;
  background: #f5f6fa;
}

.question-container {
  display: grid;
  grid-template-columns: 40% 60%;
  gap: 20px;
  align-items: start;
  max-width: 1400px;
  margin: 0 auto;
}

/* 左侧信息区 - 整体一个面板 */
.info-left {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.nav-header {
  margin-bottom: 0;
}

.back-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.back-link:hover {
  opacity: 0.8;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.empty-state a {
  color: var(--primary-color);
}

/* 编号 + 标题 */
.question-id-title {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.question-id {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary-color);
  flex-shrink: 0;
}

.question-title {
  font-size: 1.2rem;
  color: #333;
  font-weight: 600;
  line-height: 1.4;
}

/* 难度 + 标签行 */
.difficulty-tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.info-difficulty {
  font-size: 0.8rem;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 500;
}

.info-difficulty.easy {
  background: #e8f5e9;
  color: #2e7d32;
}

.info-difficulty.medium {
  background: #fff8e1;
  color: #f9a825;
}

.info-difficulty.hard {
  background: #ffebee;
  color: #c62828;
}

.info-tag {
  font-size: 0.78rem;
  padding: 3px 10px;
  border-radius: 10px;
  font-weight: 500;
  color: #fff;
}

/* 进度条 */
.stats-progress {
  padding: 14px 0;
  border-top: 1px solid #f0f0f0;
}

.stats-row {
  display: flex;
  gap: 8px;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 10px;
}

.stats-divider {
  color: #ddd;
}

.progress-bar {
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff9f00, #ff7f00);
  border-radius: 4px;
  transition: width 0.4s ease;
}

/* 题目描述 */
.content-card {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #444;
  border-top: 1px solid #f0f0f0;
  padding-top: 18px;
}

/* 提交后的测试结果（左侧） */
.test-results-submit {
  border-top: 1px solid #f0f0f0;
  padding-top: 16px;
  margin-top: 8px;
}

.test-results-submit .result-badge {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.test-results-submit .result-badge.pass,
.test-results-submit .result-badge.passed {
  background: #e8f5e9;
  color: #2e7d32;
}

.test-results-submit .result-badge.fail,
.test-results-submit .result-badge.failed {
  background: #ffebee;
  color: #c62828;
}

.test-results-submit .result-score {
  margin-left: 8px;
  font-size: 0.82rem;
  opacity: 0.8;
}

.test-results-submit .test-results {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  text-align: left;
}

.test-results-submit .test-result-item {
  border-radius: 10px;
  padding: 12px;
  border: 2px solid #eee;
}

.test-results-submit .test-result-item.pass {
  border-color: #2ecc71;
  background: #f0fff4;
}

.test-results-submit .test-result-item.fail {
  border-color: #e74c3c;
  background: #fff5f5;
}

.test-results-submit .result-header {
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.test-results-submit .result-detail {
  font-size: 0.82rem;
  color: #555;
  line-height: 1.7;
}

.test-results-submit .result-detail code {
  background: #f4f4f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Consolas', 'Courier New', monospace;
  white-space: pre-wrap;
  word-break: break-all;
  display: inline;
}

.test-results-submit .error-msg {
  color: #e74c3c;
  margin-top: 4px;
}

.content-card :deep(code) {
  background: #f4f4f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Consolas', monospace;
  font-size: 0.9em;
  color: #c7254e;
}

.content-card :deep(pre) {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 12px 0;
}

.content-card :deep(pre code) {
  background: transparent;
  padding: 0;
  color: #333;
}

/* 右侧答题区 - 整体一个面板 */
.answer-right {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.answer-section {
  display: flex;
  flex-direction: column;
}

.answer-section > * {
  margin-bottom: 14px;
}

.answer-section > *:last-child {
  margin-bottom: 0;
}

.answer-section h3 {
  font-size: 1rem;
  color: #333;
  margin: 0;
  font-weight: 600;
}

/* 选择题选项 */
.options-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.option-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border: 2px solid #e8e8e8;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 44px;
}

.option-item:hover {
  border-color: var(--primary-color);
  background: #fff8ed;
}

.option-item.selected {
  border-color: var(--primary-color);
  background: #fff8ed;
}

.option-item.correct {
  border-color: #2ecc71;
  background: #e8f5e9;
}

.option-item.wrong {
  border-color: #e74c3c;
  background: #ffebee;
}

.option-item input[type='radio'] {
  width: 18px;
  height: 18px;
  accent-color: var(--primary-color);
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 2px;
}

.option-index {
  font-weight: 700;
  color: var(--primary-color);
  font-size: 0.95rem;
  flex-shrink: 0;
  min-width: 22px;
}

.option-text {
  font-size: 0.9rem;
  color: #444;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;
}

/* 测试用例表格 */
.testcases-table {
  margin-bottom: 16px;
  overflow-x: auto;
}

.testcases-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.testcases-table th,
.testcases-table td {
  padding: 10px 14px;
  border: 1px solid #eee;
  vertical-align: top;
}

.testcases-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #555;
}

.testcases-table td:first-child {
  text-align: left;
}

.testcases-table td:last-child {
  text-align: left;
}

.testcases-table code {
  background: #f4f4f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Consolas', monospace;
  font-size: 0.85em;
  white-space: pre-wrap;
  word-break: break-all;
  display: inline;
}

/* 编辑器区域 - 上下布局 */
.editor-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.input-area {
  background: #1a1d21;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 280px;
}

.input-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #2d3436;
  border-bottom: 1px solid #444;
  flex-shrink: 0;
}

.input-header span {
  color: #ccc;
  font-size: 0.85rem;
}

.header-btns {
  display: flex;
  gap: 8px;
}

.code-input {
  display: none;
}

:deep(.CodeMirror) {
  flex: 1;
  height: 100% !important;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 14px;
  direction: ltr;
  background: #282c34;
}

:deep(.CodeMirror-gutters) {
  background: #282c34;
  border-right: 1px solid #3e4451;
}

:deep(.CodeMirror-linenumber) {
  color: #5c6370;
  padding: 0 8px;
}

:deep(.CodeMirror-cursor) {
  border-left: 2px solid #528bff;
}

:deep(.CodeMirror-selected) {
  background: #3e4451 !important;
}

:deep(.cm-s-monokai .cm-keyword) { color: #c678dd; }
:deep(.cm-s-monokai .cm-string) { color: #98c379; }
:deep(.cm-s-monokai .cm-number) { color: #d19a66; }
:deep(.cm-s-monokai .cm-comment) { color: #5c6370; font-style: italic; }
:deep(.cm-s-monokai .cm-def) { color: #61afef; }
:deep(.cm-s-monokai .cm-variable) { color: #e06c75; }
:deep(.cm-s-monokai .cm-operator) { color: #56b6c2; }

:deep(.CodeMirror-vscrollbar),
:deep(.CodeMirror-hscrollbar) {
  outline: none;
}

:deep(.CodeMirror-vscrollbar::-webkit-scrollbar),
:deep(.CodeMirror-hscrollbar::-webkit-scrollbar) {
  width: 8px;
  height: 8px;
}

:deep(.CodeMirror-vscrollbar::-webkit-scrollbar-track),
:deep(.CodeMirror-hscrollbar::-webkit-scrollbar-track) {
  background: #282c34;
}

:deep(.CodeMirror-vscrollbar::-webkit-scrollbar-thumb),
:deep(.CodeMirror-hscrollbar::-webkit-scrollbar-thumb) {
  background: #4a4e57;
  border-radius: 4px;
}

:deep(.CodeMirror-vscrollbar::-webkit-scrollbar-thumb:hover),
:deep(.CodeMirror-hscrollbar::-webkit-scrollbar-thumb:hover) {
  background: #5c6370;
}

.output-area {
  background: #1a1d21;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 200px;
}

.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 15px;
  background: #2d3436;
  color: #ccc;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.tool-btn {
  padding: 5px 14px;
  border-radius: 5px;
  border: none;
  font-size: 0.82rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.tool-btn:hover:not(:disabled) {
  opacity: 0.85;
}

.tool-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.run-btn {
  background: #27ae60;
  color: #fff;
}

.tool-btn.clear-btn,
.tool-btn-small {
  background: #555;
  color: #ddd;
  border: 1px solid #666;
  padding: 5px 12px;
  border-radius: 5px;
  font-size: 0.82rem;
  cursor: pointer;
  transition: background 0.2s;
}

.tool-btn-small {
  padding: 3px 10px;
  font-size: 0.78rem;
}

.tool-btn.clear-btn:hover,
.tool-btn-small:hover {
  background: #666;
  color: #fff;
}

.output-content {
  flex: 1;
  margin: 0;
  padding: 10px 15px;
  color: #abb2bf;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 0.85rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-y: auto;
  min-height: 0;
}

.output-content::-webkit-scrollbar {
  width: 8px;
}

.output-content::-webkit-scrollbar-track {
  background: #1a1d21;
}

.output-content::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 4px;
}

.output-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.output-content.error {
  color: #e74c3c;
}

/* 提交区域 */
.submit-area {
  text-align: center;
}

.submit-btn {
  background: linear-gradient(135deg, #ff9f00 0%, #ff7f00 100%);
  color: #fff;
  border: none;
  padding: 11px 32px;
  border-radius: 22px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
  min-height: 44px;
}

.submit-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 结果区域 */
.result-area {
  margin-top: 16px;
  text-align: center;
}

.result-badge {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.result-badge.pass,
.result-badge.passed {
  background: #e8f5e9;
  color: #2e7d32;
}

.result-badge.fail,
.result-badge.failed {
  background: #ffebee;
  color: #c62828;
}

.result-score {
  margin-left: 8px;
  font-size: 0.82rem;
  opacity: 0.8;
}

.result-hint {
  color: #666;
  font-size: 0.9rem;
}

.retry-btn {
  margin-top: 10px;
  background: #f0f0f0;
  color: #555;
  border: none;
  padding: 8px 20px;
  border-radius: 18px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s;
}

.retry-btn:hover {
  background: #e0e0e0;
}

/* 测试结果列表 */
.test-results {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 14px;
  text-align: left;
}

.test-result-item {
  border-radius: 10px;
  padding: 12px;
  border: 2px solid #eee;
}

.test-result-item.pass {
  border-color: #2ecc71;
  background: #f0fff4;
}

.test-result-item.fail {
  border-color: #e74c3c;
  background: #fff5f5;
}

.result-header {
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.result-detail {
  font-size: 0.82rem;
  color: #555;
  line-height: 1.7;
}

.result-detail code {
  background: #f4f4f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Consolas', monospace;
  white-space: pre-wrap;
  word-break: break-all;
  display: inline;
}

.error-msg {
  color: #e74c3c;
  margin-top: 4px;
}

.loading-state {
  text-align: center;
  padding: 20px;
  color: #888;
  font-size: 0.85rem;
}

.terminal-input-line {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background: #1a1d21;
  border-top: 1px solid #444;
  gap: 8px;
  min-height: 44px;
  flex-shrink: 0;
}

.terminal-prompt {
  color: #888;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 0.85rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.terminal-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #abb2bf;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 0.85rem;
  outline: none;
  min-height: 24px;
}

.terminal-input:focus {
  background: #25282e;
  border-radius: 4px;
  padding: 4px 8px;
}

.terminal-status {
  padding: 10px 15px;
  color: #666;
  font-size: 0.85rem;
  border-top: 1px solid #444;
  min-height: 44px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .question-container {
    grid-template-columns: 1fr;
  }

  .question-view {
    padding: 20px 15px;
  }

  .info-left,
  .answer-right {
    padding: 18px;
  }
}

@media (max-width: 480px) {
  .question-id-title {
    padding: 0;
  }

  .question-title {
    font-size: 1.05rem;
  }

  .difficulty-tags-row,
  .stats-progress,
  .content-card,
  .answer-section {
    padding: 0;
  }

  .submit-btn {
    width: 100%;
    padding: 12px;
  }
}
</style>