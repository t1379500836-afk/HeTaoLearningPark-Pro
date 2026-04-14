<template>
  <div class="exercise-card" :class="{ solved: isSolved }">
    <!-- 题目头部 -->
    <div class="exercise-header">
      <DifficultyBadge :level="exercise.level" />
      <span v-if="exercise.mathConcept" class="math-tag">📐 {{ exercise.mathConcept }}</span>
    </div>

    <!-- 题目内容 -->
    <div class="question-content">
      <p class="question-text" v-html="formattedQuestion"></p>
    </div>

    <!-- 选项 -->
    <div class="options" v-if="exercise.type === 'multiple-choice'">
      <div
        v-for="(option, index) in exercise.options"
        :key="index"
        class="option-wrapper"
      >
        <span class="option-label">{{ getOptionLabel(index) }}</span>
        <button
          :class="getOptionClass(index)"
          @click="selectOption(index)"
          :disabled="isSolved"
          class="option-btn"
        >
          <span v-html="formatOptionContent(option)"></span>
        </button>
      </div>
    </div>

    <!-- 提示 -->
    <div v-if="showHint && !isSolved" class="hint-box">
      💡 提示：{{ exercise.hint }}
    </div>

    <!-- 结果反馈 -->
    <div v-if="isSolved" class="result-feedback" :class="{ correct: isCorrect, incorrect: !isCorrect }">
      <div class="feedback-header">
        <span v-if="isCorrect">🎉</span>
        <span v-else>💪</span>
        <span class="feedback-text">
          {{ isCorrect ? '太棒了，答对了！' : '再想想看...' }}
        </span>
      </div>
      <div class="explanation">
        <strong>解析：</strong>
        <span v-html="formattedExplanation"></span>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <button v-if="!isSolved && !showHint" @click="showHint = true" class="hint-btn">
        💡 显示提示
      </button>
      <button v-if="isSolved" @click="reset" class="reset-btn">
        🔄 重新练习
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DifficultyBadge from './DifficultyBadge.vue'

const props = defineProps({
  exercise: {
    type: Object,
    required: true
  }
})

const selectedOption = ref(null)
const showHint = ref(false)

const isSolved = computed(() => selectedOption.value !== null)
const isCorrect = computed(() => selectedOption.value === props.exercise.answer)

const formattedQuestion = computed(() => {
  return formatMarkdown(props.exercise.question)
})

const formattedExplanation = computed(() => {
  const explanation = props.exercise.correction || props.exercise.explanation
  return formatMarkdown(explanation)
})

// 获取选项标签 (A., B., C. 等)
const getOptionLabel = (index) => {
  const labels = ['A.', 'B.', 'C.', 'D.', 'E.', 'F.']
  return labels[index] || `${index + 1}.`
}

// 格式化选项内容（去掉标签部分，处理换行）
const formatOptionContent = (option) => {
  if (!option) return ''
  // 匹配开头的 "A.", "B.", "C." 等标签，并移除
  // 然后将 \n 转换为 <br>
  return option
    .replace(/^[A-F]\.\s*/, '')  // 移除开头的标签
    .replace(/\\n/g, '<br>')    // 将 \n 转为 <br>
}

const formatMarkdown = (text) => {
  if (!text) return ''
  // 简单的代码块格式化
  return text
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>')
}

const getOptionClass = (index) => {
  if (!isSolved.value) {
    return { selected: selectedOption.value === index }
  }
  return {
    correct: index === props.exercise.answer,
    incorrect: index === selectedOption.value && !isCorrect.value,
    selected: selectedOption.value === index
  }
}

const selectOption = (index) => {
  if (!isSolved.value) {
    selectedOption.value = index
  }
}

const reset = () => {
  selectedOption.value = null
  showHint.value = false
}
</script>

<style scoped>
.exercise-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.exercise-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.exercise-card.solved {
  border-color: #e0e0e0;
}

.exercise-card.solved.correct {
  border-color: #4caf50;
  background: #f1f8f4;
}

.exercise-card.solved.incorrect {
  border-color: #ff9800;
  background: #fff8f0;
}

.exercise-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.math-tag {
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.question-content {
  margin-bottom: 16px;
}

.question-text {
  margin: 0;
  line-height: 1.7;
  color: #333;
}

/* 行内代码样式 */
.question-text :deep(code) {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.9em;
  color: #e91e63;
}

/* 代码块样式 - 优化后 */
.question-text :deep(pre) {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 12px 0;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  border: 1px solid #3e3e3e;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
}

.question-text :deep(pre code) {
  background: transparent;
  padding: 0;
  color: inherit;
  font-size: inherit;
}

/* 选项容器 - 使用 flex 垂直排列 */
.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 选项包装器 - 包含标签和按钮 */
.option-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

/* 选项标签 - A., B., C. */
.option-label {
  flex-shrink: 0;
  font-weight: 600;
  font-size: 1rem;
  color: #555;
  min-width: 32px;
  padding-top: 14px;
  user-select: none;
}

.option-btn {
  flex: 1;
  padding: 14px 18px;
  border: 2px solid #e0e0e0;
  background: #fff;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
  font-size: 0.95rem;
  color: #333;
  /* 保留换行符同时支持自动换行 */
  white-space: pre-wrap;
  word-break: break-word;
}

.option-btn:hover:not(:disabled) {
  border-color: var(--primary-color);
  background: #fff8f0;
}

.option-btn.selected {
  border-color: var(--primary-color);
  background: var(--primary-color);
  color: #fff;
}

.option-btn.correct {
  border-color: #4caf50;
  background: #4caf50;
  color: #fff;
}

.option-btn.incorrect {
  border-color: #ff9800;
  background: #ff9800;
  color: #fff;
}

.hint-box {
  margin-top: 16px;
  padding: 12px;
  background: #fff8e1;
  border-radius: 8px;
  border-left: 4px solid #ffc107;
  color: #f57c00;
  font-size: 0.9rem;
}

.result-feedback {
  margin-top: 16px;
  padding: 16px;
  border-radius: 8px;
}

.result-feedback.correct {
  background: #e8f5e9;
  border-left: 4px solid #4caf50;
}

.result-feedback.incorrect {
  background: #fff3e0;
  border-left: 4px solid #ff9800;
}

.feedback-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  margin-bottom: 8px;
}

.result-feedback.correct .feedback-header {
  color: #2e7d32;
}

.result-feedback.incorrect .feedback-header {
  color: #e65100;
}

.explanation {
  color: #555;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* 解析中的代码样式 */
.explanation :deep(code) {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.9em;
  color: #1976d2;
}

.explanation :deep(pre) {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 8px 0;
  border-left: 3px solid #2196f3;
}

.explanation :deep(pre code) {
  background: transparent;
  padding: 0;
  color: #333;
}

.action-buttons {
  margin-top: 16px;
  display: flex;
  gap: 10px;
}

.hint-btn,
.reset-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s;
}

.hint-btn {
  background: #fff8e1;
  color: #f57c00;
}

.hint-btn:hover {
  background: #ffecb3;
}

.reset-btn {
  background: #e3f2fd;
  color: #1976d2;
}

.reset-btn:hover {
  background: #bbdefb;
}

@media (max-width: 768px) {
  .exercise-card {
    padding: 16px;
  }

  .option-label {
    font-size: 0.9rem;
    min-width: 28px;
  }

  .option-btn {
    padding: 12px 14px;
    font-size: 0.9rem;
  }
}
</style>
