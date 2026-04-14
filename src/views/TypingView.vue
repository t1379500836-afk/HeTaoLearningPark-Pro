<template>
  <div class="typing-view">
    <section class="page-header">
      <h1>打字练习</h1>
      <p>提高打字速度和准确率，为编程学习打下基础</p>
    </section>

    <!-- 模式切换 -->
    <div class="mode-selector">
      <button
        :class="{ active: mode === 'word' }"
        @click="switchMode('word')"
        class="selector-btn"
      >
        📝 单词练习
      </button>
      <button
        :class="{ active: mode === 'code' }"
        @click="switchMode('code')"
        class="selector-btn"
      >
        💻 代码练习
      </button>
      <button
        :class="{ active: mode === 'chinese' }"
        @click="switchMode('chinese')"
        class="selector-btn"
      >
        📖 中文练习
      </button>
      <button
        :class="{ active: mode === 'shortcut' }"
        @click="switchMode('shortcut')"
        class="selector-btn"
      >
        ⌨️ 快捷键练习
      </button>
    </div>

    <!-- 单词练习选项 -->
    <div v-if="mode === 'word'" class="word-options">
      <div class="option-group">
        <span class="option-label">难度：</span>
        <div class="option-buttons">
          <button
            v-for="level in wordDifficultyOptions"
            :key="level.value"
            :class="{ active: wordDifficulty === level.value }"
            @click="setWordDifficulty(level.value)"
            class="option-btn"
          >
            {{ level.emoji }} {{ level.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- 中文练习选项 -->
    <div v-if="mode === 'chinese'" class="chinese-options">
      <!-- 内容类型选择 -->
      <div class="option-group">
        <span class="option-label">内容类型：</span>
        <div class="option-buttons">
          <button
            v-for="type in contentTypeOptions"
            :key="type.value"
            :class="{ active: chineseContentType === type.value }"
            @click="setChineseContentType(type.value)"
            class="option-btn"
          >
            {{ type.emoji }} {{ type.label }}
          </button>
        </div>
      </div>
      <!-- 难度选择 -->
      <div class="option-group">
        <span class="option-label">难度：</span>
        <div class="option-buttons">
          <button
            v-for="level in chineseDifficultyLevels"
            :key="level.value"
            :class="{ active: chineseDifficulty === level.value }"
            @click="setChineseDifficulty(level.value)"
            class="option-btn"
          >
            {{ level.emoji }} {{ level.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- 打字练习组件 -->
    <TypingPractice
      v-if="mode !== 'chinese' && mode !== 'shortcut'"
      :mode="mode"
      :custom-words="currentWords"
      :custom-templates="currentTemplates"
      :score-history="scoreHistory"
      @update:score-history="handleScoreHistoryUpdate"
      @complete="handleComplete"
      @restart="handleRestart"
    />

    <!-- 中文打字练习组件 -->
    <ChineseTypingPractice
      v-if="mode === 'chinese'"
      :items="chineseItems"
      :score-history="chineseScoreHistory"
      @update:score-history="handleChineseScoreHistoryUpdate"
      @complete="handleComplete"
      @restart="handleRestart"
    />

    <!-- 快捷键练习组件 -->
    <ShortcutPractice
      v-if="mode === 'shortcut'"
      :score-history="shortcutScoreHistory"
      @update:score-history="handleShortcutScoreHistoryUpdate"
      @complete="handleComplete"
      @restart="handleRestart"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import TypingPractice from '@/components/course/TypingPractice.vue'
import ChineseTypingPractice from '@/components/course/ChineseTypingPractice.vue'
import ShortcutPractice from '@/components/course/ShortcutPractice.vue'
import { getRandomTemplates } from '@/data/courses/PY2/typing-templates-pool.js'
import { getRandomWords } from '@/data/courses/PY2/typing-words-pool.js'
import { getRandomPoems, getRandomIdioms, getMixedContent } from '@/data/chinese-typing-pool.js'

// PY2 课程所有课次的单词池 (L7-L12 共24课)
// 从 typing-words-pool.js 聚合而来，包含68个easy、73个medium、66个hard单词

// 练习模式
const mode = ref('word')  // 'word' | 'code' | 'chinese'
const currentWords = ref([])  // 当前使用的单词列表
const scoreHistory = ref([])  // 排行榜数据（持久化）

// 单词练习选项
const wordDifficulty = ref('all')  // 'all' | 'easy' | 'medium' | 'hard'

// 单词难度选项
const wordDifficultyOptions = [
  { value: 'all', label: '全部', emoji: '📚' },
  { value: 'easy', label: '基础', emoji: '🟢' },
  { value: 'medium', label: '进阶', emoji: '🟡' },
  { value: 'hard', label: '挑战', emoji: '🔴' }
]

// 中文打字练习状态
const chineseContentType = ref('mixed')  // 'poem' | 'idiom' | 'mixed'
const chineseDifficulty = ref('mixed')  // 'mixed' | 'easy' | 'medium' | 'hard'
const chineseItems = ref([])  // 当前中文练习内容
const chineseScoreHistory = ref([])  // 中文练习排行榜

// 快捷键练习状态
const shortcutScoreHistory = ref([])  // 快捷键练习排行榜

// 中文练习选项
const contentTypeOptions = [
  { value: 'poem', label: '古诗词', emoji: '📜' },
  { value: 'idiom', label: '成语俗语', emoji: '📖' },
  { value: 'mixed', label: '混合', emoji: '🎲' }
]

const chineseDifficultyLevels = [
  { value: 'mixed', label: '全部', emoji: '📚' },
  { value: 'easy', label: '基础', emoji: '🟢' },
  { value: 'medium', label: '进阶', emoji: '🟡' },
  { value: 'hard', label: '挑战', emoji: '🔴' }
]

// 每次练习抽取数量
const practiceCount = 5
const wordPracticeCount = 8  // 单词每次练习8个

// 当前使用的代码模板
const currentTemplates = ref([])

// 刷新内容
const refreshContent = () => {
  if (mode.value === 'code') {
    // 代码模式：从所有课程的模板池随机抽取
    currentTemplates.value = getRandomTemplates(practiceCount, 'all')
    currentWords.value = []
    chineseItems.value = []
  } else if (mode.value === 'chinese') {
    // 中文模式：根据选择获取内容
    refreshChineseContent()
    currentWords.value = []
    currentTemplates.value = []
  } else {
    // 单词模式：从所有课程的单词池随机抽取
    currentWords.value = getRandomWords(wordPracticeCount, wordDifficulty.value)
    currentTemplates.value = []
    chineseItems.value = []
  }
}

// 设置单词难度
const setWordDifficulty = (level) => {
  wordDifficulty.value = level
  refreshContent()
}

// 刷新中文练习内容
const refreshChineseContent = () => {
  const count = 5
  if (chineseContentType.value === 'poem') {
    chineseItems.value = getRandomPoems(count, chineseDifficulty.value)
  } else if (chineseContentType.value === 'idiom') {
    chineseItems.value = getRandomIdioms(count, chineseDifficulty.value)
  } else {
    chineseItems.value = getMixedContent(count, chineseDifficulty.value)
  }
}

// 设置中文内容类型
const setChineseContentType = (type) => {
  chineseContentType.value = type
  refreshChineseContent()
}

// 设置中文难度
const setChineseDifficulty = (level) => {
  chineseDifficulty.value = level
  refreshChineseContent()
}

// 切换模式
const switchMode = (newMode) => {
  if (mode.value !== newMode) {
    mode.value = newMode
    refreshContent()
  }
}

// 处理练习完成事件
const handleComplete = () => {
  // 练习完成后，显示完成报告
  // 用户点击"返回"或"重新开始"后，会触发 handleRestart
}

// 处理排行榜数据更新
const handleScoreHistoryUpdate = (newHistory) => {
  scoreHistory.value = newHistory
}

// 处理中文练习排行榜数据更新
const handleChineseScoreHistoryUpdate = (newHistory) => {
  chineseScoreHistory.value = newHistory
}

// 处理快捷键练习排行榜数据更新
const handleShortcutScoreHistoryUpdate = (newHistory) => {
  shortcutScoreHistory.value = newHistory
}

// 处理重新开始/返回事件（用户点击按钮后刷新内容）
const handleRestart = () => {
  // 从课程题库中随机选择新的内容
  refreshContent()
}

// 监听模式变化
watch(mode, () => {
  refreshContent()
})

// 初始化
refreshContent()
</script>

<style scoped>
.typing-view {
  min-height: 100vh;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.page-header p {
  font-size: 1.1rem;
  color: #666;
}

/* 模式选择器 */
.mode-selector {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.selector-btn {
  padding: 12px 24px;
  border: 2px solid #e0e0e0;
  background: #fff;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
}

.selector-btn:hover {
  border-color: var(--primary-color);
  background: #fff8f0;
}

.selector-btn.active {
  border-color: var(--primary-color);
  background: var(--primary-color);
  color: #fff;
}

/* 难度选择器 */
.difficulty-selector {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.difficulty-btn {
  padding: 10px 18px;
  border: 2px solid #e0e0e0;
  background: #fff;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.95rem;
}

.difficulty-btn:hover {
  border-color: var(--primary-color);
  background: #fff8f0;
}

.difficulty-btn.active {
  border-color: var(--primary-color);
  background: var(--primary-color);
  color: #fff;
}

/* 单词练习选项 */
.word-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
}

/* 中文练习选项 */
.chinese-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
}

.option-group {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.option-label {
  font-size: 0.95rem;
  color: #333;
  font-weight: 500;
}

.option-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.option-btn {
  padding: 8px 16px;
  border: 2px solid #e0e0e0;
  background: #fff;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.option-btn:hover {
  border-color: #E91E63;
  background: #FCE4EC;
}

.option-btn.active {
  border-color: #E91E63;
  background: #E91E63;
  color: #fff;
}

/* Responsive */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }

  .mode-selector {
    gap: 10px;
  }

  .selector-btn {
    padding: 10px 18px;
    font-size: 0.9rem;
  }

  .difficulty-selector {
    gap: 8px;
  }

  .difficulty-btn {
    padding: 8px 14px;
    font-size: 0.85rem;
  }

  .current-level {
    font-size: 0.9rem;
    padding: 8px 16px;
  }

  .chinese-options {
    padding: 15px;
    gap: 12px;
  }

  .option-group {
    flex-direction: column;
    align-items: flex-start;
  }

  .option-label {
    font-size: 0.9rem;
  }

  .option-buttons {
    gap: 6px;
  }

  .option-btn {
    padding: 6px 12px;
    font-size: 0.85rem;
  }
}
</style>
