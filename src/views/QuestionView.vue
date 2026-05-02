<template>
  <div class="question-view">
    <div class="question-container">
      <!-- 返回 + 标题 -->
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
        <!-- 题目信息 -->
        <section class="info-card">
          <div class="info-tags">
            <span class="info-type" :class="question.type">
              {{ question.type === 'choice' ? '选择题' : '编程题' }}
            </span>
            <span class="info-difficulty" :class="question.difficulty">
              {{ difficultyLabel(question.difficulty) }}
            </span>
            <span
              v-for="tagId in question.tags || []"
              :key="tagId"
              class="info-tag"
              :style="{ background: tagMap[tagId]?.color || '#ccc' }"
            >
              {{ tagMap[tagId]?.name || '' }}
            </span>
          </div>
          <h1 class="question-title">{{ question.title }}</h1>
        </section>

        <!-- 题目内容 -->
        <section class="content-card" v-html="renderedContent"></section>

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

          <!-- 测试用例 -->
          <div class="testcases-table">
            <table>
              <thead>
                <tr>
                  <th>输入</th>
                  <th>期望输出</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tc, idx) in question.testCases || []" :key="idx">
                  <td><code>{{ tc.input }}</code></td>
                  <td><code>{{ tc.expectedOutput }}</code></td>
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

    <!-- 浮动返回 -->
    <button class="floating-back" @click="goBack">←</button>
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

const { tagMap, getQuestionById, judgeChoice, judgeProgram, reload } = useLibrary()

onMounted(() => {
  reload()
})

const question = computed(() => getQuestionById(props.id))

const renderedContent = computed(() => {
  if (!question.value) return ''
  // 简单处理换行
  return question.value.content.replace(/\n/g, '<br>')
})

const starterCode = computed(() => {
  if (!question.value) return ''
  // 编程题可以预设一个空函数框架，这里先返回空字符串
  return ''
})

function difficultyLabel(diff) {
  const map = { easy: '简单', medium: '中等', hard: '困难' }
  return map[diff] || diff
}

function prefixedPath(path) {
  return buildPrefixedPath(prefix.value, path)
}

function goBack() {
  router.push(prefixedPath('/library'))
}

// 选择题逻辑
const selectedOption = ref(-1)
const showResult = ref(false)
const choiceResult = ref(null)

async function submitChoice() {
  if (selectedOption.value === -1) return
  choiceResult.value = judgeChoice(question.value, selectedOption.value)
  showResult.value = true

  // 记录全局统计
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

    // 记录全局统计
    try {
      const submitStatus = result.status === 'timeout' ? 'error' : result.status
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
  padding: 40px 20px 80px;
  background: #fafafa;
}

.question-container {
  max-width: 900px;
  margin: 0 auto;
}

.nav-header {
  margin-bottom: 20px;
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
  padding: 80px 20px;
  color: #999;
}

.empty-state a {
  color: var(--primary-color);
}

/* 信息卡片 */
.info-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;
}

.info-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.info-type,
.info-difficulty,
.info-tag {
  font-size: 0.8rem;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 500;
}

.info-type.choice {
  background: #e8f5e9;
  color: #2e7d32;
}

.info-type.program {
  background: #fff3e0;
  color: #ef6c00;
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
  color: #fff;
}

.question-title {
  font-size: 1.5rem;
  color: #333;
  line-height: 1.4;
  margin: 0;
}

/* 内容卡片 */
.content-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;
  font-size: 1rem;
  line-height: 1.8;
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

/* 答题区域 */
.answer-section {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.answer-section h3 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 20px;
}

/* 选择题选项 */
.options-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 2px solid #e8e8e8;
  border-radius: 12px;
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
  width: 20px;
  height: 20px;
  accent-color: var(--primary-color);
  cursor: pointer;
  flex-shrink: 0;
}

.option-index {
  font-weight: 700;
  color: var(--primary-color);
  font-size: 1rem;
  flex-shrink: 0;
  min-width: 24px;
}

.option-text {
  font-size: 0.95rem;
  color: #444;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;
}

/* 提交区域 */
.submit-area {
  text-align: center;
}

.submit-btn {
  background: linear-gradient(135deg, #ff9f00 0%, #ff7f00 100%);
  color: #fff;
  border: none;
  padding: 12px 36px;
  border-radius: 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
  min-height: 48px;
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
  margin-top: 20px;
  text-align: center;
}

.result-badge {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 24px;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.result-badge.pass {
  background: #e8f5e9;
  color: #2e7d32;
}

.result-badge.fail {
  background: #ffebee;
  color: #c62828;
}

.result-badge.passed {
  background: #e8f5e9;
  color: #2e7d32;
}

.result-badge.failed {
  background: #ffebee;
  color: #c62828;
}

.result-score {
  margin-left: 10px;
  font-size: 0.85rem;
  opacity: 0.8;
}

.result-hint {
  color: #666;
  font-size: 0.95rem;
}

.retry-btn {
  margin-top: 12px;
  background: #f0f0f0;
  color: #555;
  border: none;
  padding: 10px 24px;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
}

.retry-btn:hover {
  background: #e0e0e0;
}

/* 编程题测试用例表格 */
.testcases-table {
  margin-bottom: 20px;
  overflow-x: auto;
}

.testcases-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.testcases-table th,
.testcases-table td {
  padding: 10px 14px;
  border: 1px solid #eee;
  vertical-align: top;
}

.testcases-table td:first-child {
  text-align: left;
}

.testcases-table td:last-child {
  text-align: left;
}

.testcases-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #555;
}

.testcases-table code {
  background: #f4f4f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Consolas', monospace;
  font-size: 0.85em;
  white-space: pre-wrap;
  word-break: break-all;
  display: inline-block;
  text-align: center;
  max-width: 100%;
}

/* 编辑器 */
.editor-box {
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
}

/* 编程题结果 */
.test-results {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
  text-align: left;
}

.test-result-item {
  border-radius: 12px;
  padding: 14px;
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
  font-size: 0.95rem;
}

.result-detail {
  font-size: 0.85rem;
  color: #555;
  line-height: 1.8;
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

/* 浮动返回 */
.floating-back {
  position: fixed;
  bottom: 30px;
  left: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary-color);
  color: #fff;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 159, 0, 0.4);
  transition: transform 0.2s, box-shadow 0.2s;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-back:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(255, 159, 0, 0.5);
}

/* 响应式 */
@media (max-width: 768px) {
  .question-view {
    padding: 20px 15px 80px;
  }

  .question-title {
    font-size: 1.2rem;
  }

  .info-card,
  .content-card,
  .answer-section {
    padding: 18px;
    border-radius: 12px;
  }

  .option-item {
    padding: 12px;
  }

  .submit-btn {
    width: 100%;
    padding: 14px;
    min-height: 48px;
  }

  .floating-back {
    width: 44px;
    height: 44px;
    bottom: 20px;
    left: 20px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .question-title {
    font-size: 1.1rem;
  }

  .option-index {
    font-size: 0.9rem;
  }

  .option-text {
    font-size: 0.9rem;
  }
}
</style>