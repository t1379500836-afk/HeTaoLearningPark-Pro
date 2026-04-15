<template>
  <div class="flashcard-section">
    <h2 class="section-title">📇 单词卡</h2>
    <p class="section-desc">学习编程英语，掌握核心词汇</p>

    <!-- 难度筛选 -->
    <div class="filter-bar">
      <button
        v-for="level in levels"
        :key="level.value"
        :class="{ active: selectedLevel === level.value }"
        @click="selectedLevel = level.value"
        class="filter-btn"
      >
        {{ level.emoji }} {{ level.label }}
      </button>
    </div>

    <!-- 单词卡片网格 -->
    <div class="vocab-grid">
      <div
        v-for="word in filteredVocab"
        :key="word.word"
        class="vocab-card"
      >
        <!-- 卡片内容 -->
        <div class="card-front">
          <button
            @click="playPronunciation(word.word, $event)"
            class="speaker-btn"
            :class="{ playing: playingWord === word.word }"
            title="点击发音"
          >
            <span :class="{ 'sound-wave': playingWord === word.word }">🔊</span>
          </button>
          <div class="word-main">{{ word.word }}</div>
          <div class="pronunciation">{{ word.pronunciation }}</div>
          <div class="word-meaning">
            <span class="part-of-speech">{{ word.partOfSpeech }}</span>
            <span class="meaning-text">{{ word.meaning }}</span>
          </div>
          <div class="example-box">
            <p class="example">{{ word.example }}</p>
            <p class="translation">{{ word.exampleTranslation }}</p>
          </div>
          <DifficultyBadge :level="word.level" />
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="filteredVocab.length === 0" class="empty-state">
      <p>暂无此难度的单词</p>
    </div>

    <!-- 打字练习入口 -->
    <div class="typing-practice-link">
      <h3>⌨️ 练习打字</h3>
      <p>通过打字巩固这些单词的记忆</p>
      <button @click="scrollToTyping" class="practice-link-btn">
        开始练习 →
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DifficultyBadge from './DifficultyBadge.vue'

const props = defineProps({
  vocab: {
    type: Array,
    default: () => []
  },
  typingWords: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['scroll-to-typing'])

const selectedLevel = ref('all')
const playingWord = ref(null)

const levels = [
  { value: 'all', label: '全部', emoji: '📚' },
  { value: 'easy', label: '简单', emoji: '🟢' },
  { value: 'medium', label: '中等', emoji: '🟡' },
  { value: 'hard', label: '困难', emoji: '🔴' }
]

const filteredVocab = computed(() => {
  if (selectedLevel.value === 'all') {
    return props.vocab
  }
  return props.vocab.filter(word => word.level === selectedLevel.value)
})

const typingWordsForLevel = computed(() => {
  if (selectedLevel.value === 'all') {
    return props.vocab.map(w => w.word)
  }
  const levelKey = selectedLevel.value === 'hard' ? 'hard' : selectedLevel.value === 'medium' ? 'medium' : 'easy'
  return props.typingWords[levelKey] || []
})

// TTS 发音功能
const playPronunciation = (word, event) => {
  event.stopPropagation() // 阻止触发翻卡

  // 停止之前的播放
  if (window.currentAudio) {
    window.currentAudio.pause()
    window.currentAudio = null
  }

  playingWord.value = word

  // 使用有道 TTS API
  const audio = new Audio(
    `https://dict.youdao.com/dictvoice?type=2&audio=${encodeURIComponent(word)}`
  )

  audio.onended = () => {
    playingWord.value = null
  }

  audio.onerror = () => {
    playingWord.value = null
    console.error('TTS播放失败')
  }

  window.currentAudio = audio
  audio.play().catch(err => {
    playingWord.value = null
    console.error('TTS error:', err)
  })
}

// 滚动到打字练习区域
const scrollToTyping = () => {
  emit('scroll-to-typing')
}
</script>

<style scoped>
.flashcard-section {
  background: #fff;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 1.5rem;
  color: #333;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-desc {
  color: #666;
  margin: 0 0 20px 0;
}

.filter-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 8px 16px;
  border: 2px solid #e0e0e0;
  background: #fff;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.filter-btn:hover {
  border-color: var(--primary-color);
  background: #fff8f0;
}

.filter-btn.active {
  border-color: var(--primary-color);
  background: var(--primary-color);
  color: #fff;
}

.vocab-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.vocab-card {
  background: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  min-height: 280px;
  cursor: default;
  transition: all 0.4s;
  position: relative;
}

.vocab-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--primary-color);
}

.card-front {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.word-main {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.pronunciation {
  color: #888;
  font-family: 'Arial', sans-serif;
  margin-bottom: 12px;
}

.word-meaning {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 12px 0;
  padding: 8px 12px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 8px;
  border-left: 3px solid var(--primary-color);
}

.part-of-speech {
  display: inline-block;
  padding: 2px 8px;
  background: var(--primary-color);
  color: #fff;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.meaning-text {
  color: #495057;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4;
}

.example-box {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed #dee2e6;
}

.example {
  color: #6c757d;
  font-style: italic;
  font-size: 0.85rem;
  margin: 0 0 4px 0;
}

.translation {
  color: #868e96;
  font-size: 0.8rem;
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #999;
}

/* 喇叭按钮样式 */
.speaker-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #e0e0e0;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s;
  z-index: 10;
}

.speaker-btn:hover {
  border-color: var(--primary-color);
  background: #fff8f0;
  transform: scale(1.1);
}

.speaker-btn.playing {
  border-color: #4caf50;
  background: #e8f5e9;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.sound-wave {
  display: inline-block;
  animation: wave 0.5s infinite;
}

@keyframes wave {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.typing-practice-link {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  color: #fff;
}

.typing-practice-link h3 {
  margin: 0 0 8px 0;
  font-size: 1.2rem;
}

.typing-practice-link p {
  margin: 0 0 16px 0;
  opacity: 0.9;
}

.practice-link-btn {
  display: inline-block;
  padding: 12px 28px;
  background: #fff;
  color: #f5576c;
  border: none;
  border-radius: 24px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.practice-link-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .flashcard-section {
    padding: 20px;
  }

  .vocab-grid {
    grid-template-columns: 1fr;
  }

  .filter-bar {
    gap: 8px;
  }

  .filter-btn {
    padding: 6px 12px;
    font-size: 0.85rem;
  }

  .speaker-btn {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
}
</style>
