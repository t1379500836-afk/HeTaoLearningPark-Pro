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
            <div class="editor-box">
              <CodeEditor
                ref="editorRef"
                :initial-code="starterCode"
                :show-header="false"
                :show-templates="false"
                height="350px"
              />
            </div>

            <div class="submit-area">
              <button class="submit-btn" :disabled="isJudging" @click="runTests">
                {{ isJudging ? '判题中...' : '运行测试' }}
              </button>
            </div>

            <!-- 运行结果 -->
            <div v-if="programResult" class="result-area">
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
          </section>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CodeEditor from '@/components/course/CodeEditor.vue'
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
const editorRef = ref(null)
const isJudging = ref(false)
const programResult = ref(null)

async function runTests() {
  if (!editorRef.value || !question.value) return
  const code = editorRef.value.getCode()
  if (!code.trim()) return

  isJudging.value = true
  programResult.value = null

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
  grid-template-columns: 380px 1fr;
  gap: 24px;
  align-items: start;
  max-width: 1400px;
  margin: 0 auto;
}

/* 左侧信息区 */
.info-left {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.nav-header {
  margin-bottom: 0;
}

.back-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: opacity 0.2s;
}

.back-link:hover {
  opacity: 0.8;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  background: #fff;
  border-radius: 16px;
}

.empty-state a {
  color: var(--primary-color);
}

/* 编号 + 标题 */
.question-id-title {
  display: flex;
  align-items: baseline;
  gap: 10px;
  background: #fff;
  border-radius: 12px;
  padding: 18px 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
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
  background: #fff;
  border-radius: 12px;
  padding: 14px 18px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
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
  background: #fff;
  border-radius: 12px;
  padding: 14px 18px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
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
  background: #fff;
  border-radius: 12px;
  padding: 18px 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  font-size: 0.95rem;
  line-height: 1.7;
  color: #444;
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

/* 右侧答题区 */
.answer-right {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.answer-section {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.answer-section h3 {
  font-size: 1rem;
  color: #333;
  margin-bottom: 16px;
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

/* 编辑器 */
.editor-box {
  margin-bottom: 16px;
  border-radius: 10px;
  overflow: hidden;
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

/* 响应式 */
@media (max-width: 900px) {
  .question-container {
    grid-template-columns: 1fr;
  }

  .question-view {
    padding: 20px 15px;
  }
}

@media (max-width: 480px) {
  .question-id-title {
    padding: 14px 16px;
  }

  .question-title {
    font-size: 1.05rem;
  }

  .difficulty-tags-row,
  .stats-progress,
  .content-card,
  .answer-section {
    padding: 14px 16px;
  }

  .submit-btn {
    width: 100%;
    padding: 12px;
  }
}
</style>