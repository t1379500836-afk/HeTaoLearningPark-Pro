<template>
  <div class="lesson-view">
    <!-- 悬浮返回按钮 -->
    <button class="floating-back-btn" @click="goBack" aria-label="返回上一页">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>

    <!-- 加载状态 -->
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>正在加载课程内容...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="reload" class="retry-btn">重试</button>
    </div>

    <!-- 课程内容 -->
    <template v-else>
      <!-- 页面头部 -->
      <section class="page-header">
        <div class="breadcrumb">
          <router-link :to="prefixedPath('/levels')">课程体系</router-link>
          <span class="separator">/</span>
          <router-link :to="prefixedPath(`/levels/${stage}`)">{{ getStageName(stage) }}</router-link>
          <span class="separator">/</span>
          <router-link :to="prefixedPath(`/levels/${stage}/${unit}`)">{{ getUnitInfo(unit).name }}</router-link>
          <span class="separator">/</span>
          <span class="current">{{ lessonId }} {{ meta.title || '' }}</span>
        </div>
        <h1>{{ meta.title }}</h1>
        <p>{{ meta.subtitle }}</p>
        <div v-if="meta.estimatedTime" class="meta-info">
          <span class="meta-item">⏱️ {{ meta.estimatedTime }}</span>
          <span class="meta-item">📊 {{ meta.difficulty }}</span>
        </div>
      </section>

      <!-- 学习目标 -->
      <section v-if="meta.learningGoals && meta.learningGoals.length" class="section goals-section">
        <h2>📌 学习目标</h2>
        <ul class="goals-list">
          <li v-for="(goal, index) in meta.learningGoals" :key="index">
            <span class="check-icon">✓</span> {{ goal }}
          </li>
        </ul>
      </section>

      <!-- 单词卡 -->
      <section v-if="vocab && vocab.length > 0" class="section">
        <FlashcardDisplay :vocab="vocab" :typing-words="typingWords" @scroll-to-typing="scrollToTypingSection" />
      </section>

      <!-- 知识点 -->
      <section v-if="knowledgePoints && knowledgePoints.length > 0" class="section">
        <h2 class="section-title">📚 知识讲解</h2>
        <KnowledgeCard
          v-for="kp in knowledgePoints"
          :key="kp.id"
          :kp="kp"
          :default-level="defaultLevel"
        />
      </section>

      <!-- 打字练习 - 等待数据加载完成后再挂载，避免焦点抢占 -->
      <section id="typing-practice" v-if="typingWords && typingWords.easy && !isLoading" class="section">
        <h2>⌨️ 打字练习</h2>
        <p class="section-desc">通过打字巩固今天学习的词汇和代码</p>

        <!-- 模式切换按钮 -->
        <div class="typing-mode-switch">
          <button
            :class="{ active: typingMode === 'word' }"
            @click="typingMode = 'word'"
            class="mode-btn"
          >
            📝 单词模式
          </button>
          <button
            :class="{ active: typingMode === 'code' }"
            @click="typingMode = 'code'"
            class="mode-btn"
          >
            💻 代码模式
          </button>
          <button
            :class="{ active: typingMode === 'chinese' }"
            @click="typingMode = 'chinese'"
            class="mode-btn"
          >
            📖 中文练习
          </button>
        </div>

        <!-- 单词模式 -->
        <TypingPractice
          v-if="typingMode === 'word'"
          :custom-words="allTypingWords"
          :auto-focus="false"
          embedded
        />

        <!-- 代码模式 -->
        <TypingPractice
          v-if="typingMode === 'code'"
          :key="templateVersion"
          mode="code"
          :custom-templates="allTypingTemplates"
          :auto-focus="false"
          embedded
        />

        <!-- 中文练习模式 -->
        <ChineseTypingPractice
          v-if="typingMode === 'chinese'"
          :key="chineseContentVersion"
          :items="chineseTypingItems"
          :auto-focus="false"
          embedded
        />
      </section>

      <!-- 课后习题 -->
      <section v-if="exercises && exercises.length > 0" class="section">
        <h2>✏️ 课后习题</h2>
        <p class="section-desc">编程 × 数学融合，难度分层适配</p>

        <!-- 难度筛选 -->
        <div class="difficulty-filter">
          <button
            v-for="level in difficultyLevels"
            :key="level.value"
            :class="{ active: selectedDifficulty === level.value }"
            @click="selectedDifficulty = level.value"
            class="filter-btn"
          >
            {{ level.emoji }} {{ level.label }} ({{ getExerciseCount(level.value) }})
          </button>
        </div>

        <!-- 习题列表 -->
        <div class="exercises-list">
          <ExerciseCard
            v-for="exercise in filteredExercises"
            :key="exercise.id"
            :exercise="exercise"
          />
        </div>
      </section>

      <!-- 课程导航 -->
      <section class="lesson-navigation">
        <router-link
          v-if="prevLesson"
          :to="prefixedPath(`/lesson/${stage}/${unit}/${prevLesson}`)"
          class="nav-btn prev"
        >
          ← 上一课
        </router-link>
        <router-link
          v-if="nextLesson"
          :to="prefixedPath(`/lesson/${stage}/${unit}/${nextLesson}`)"
          class="nav-btn next"
        >
          下一课 →
        </router-link>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLessonData } from '@/composables/useLessonData.js'
import { getStageName, getUnitInfo } from '@/config/courses.config.js'
import { getCurrentPrefix, prefixedPath as buildPrefixedPath } from '@/composables/useRoutePrefix.js'
import { notifyPageReady } from '@/composables/useLoading.js'
import FlashcardDisplay from '@/components/course/FlashcardDisplay.vue'
import KnowledgeCard from '@/components/course/KnowledgeCard.vue'
import ExerciseCard from '@/components/course/ExerciseCard.vue'
import TypingPractice from '@/components/course/TypingPractice.vue'
import ChineseTypingPractice from '@/components/course/ChineseTypingPractice.vue'
import { getMixedContent } from '@/data/chinese-typing-pool.js'

const route = useRoute()
const router = useRouter()
const stage = computed(() => route.params.stage)
const unit = computed(() => route.params.unit)
const lesson = computed(() => route.params.lesson)

// 获取当前路由前缀
const prefix = computed(() => getCurrentPrefix(route))

// 生成带前缀的路径
function prefixedPath(path) {
  return buildPrefixedPath(prefix.value, path)
}

// 使用数据加载 composable
const {
  isLoading,
  error,
  lessonId,
  meta,
  vocab,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates,
  getExercisesByLevel,
  reload
} = useLessonData(stage, unit, lesson)

// 难度相关
const defaultLevel = ref('easy')
const selectedDifficulty = ref('all')

const difficultyLevels = [
  { value: 'all', label: '全部', emoji: '📚' },
  { value: 'easy', label: '基础', emoji: '🟢' },
  { value: 'medium', label: '进阶', emoji: '🟡' },
  { value: 'hard', label: '挑战', emoji: '🔴' }
]

// 筛选后的习题
const filteredExercises = computed(() => {
  if (selectedDifficulty.value === 'all') {
    return exercises.value
  }
  return getExercisesByLevel(selectedDifficulty.value)
})

// 习题数量统计
const getExerciseCount = (level) => {
  if (level === 'all') {
    return exercises.value.length
  }
  return getExercisesByLevel(level).length
}

// 所有打字单词
const allTypingWords = computed(() => {
  const all = [
    ...(typingWords.value.easy || []),
    ...(typingWords.value.medium || []),
    ...(typingWords.value.hard || [])
  ]
  // 去重
  return [...new Set(all)]
})

// 打字练习模式（单词/代码/中文）
const typingMode = ref('word')

// 中文打字练习内容
const chineseTypingItems = ref([])
const chineseContentVersion = ref(0)  // 用于强制刷新组件

// 刷新中文练习内容
const refreshChineseContent = () => {
  chineseTypingItems.value = getMixedContent(5, 'mixed')
  chineseContentVersion.value++
}

// 随机抽取函数（Fisher-Yates 洗牌算法）
const shuffleAndPick = (array, count) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

// 每次练习随机抽取5个代码模板
const practiceTemplatesCount = 5
const allTypingTemplates = ref([])
const templateVersion = ref(0)  // 用于强制刷新组件

// 刷新代码模板（重新随机抽取）
const refreshCodeTemplates = () => {
  const all = [
    ...(typingTemplates.value.easy || []),
    ...(typingTemplates.value.medium || []),
    ...(typingTemplates.value.hard || [])
  ]
  const unique = [...new Set(all)]
  allTypingTemplates.value = shuffleAndPick(unique, practiceTemplatesCount)
  templateVersion.value++  // 递增版本号，强制组件重新创建
}

// 监听模式切换，切换到代码模式或中文模式时刷新模板
watch(typingMode, (newMode) => {
  if (newMode === 'code') {
    refreshCodeTemplates()
  } else if (newMode === 'chinese') {
    refreshChineseContent()
  }
})

// 单元内课次列表（用于导航）
// TODO: 从配置文件或 lesson-data 中获取
const getUnitLessons = () => {
  // L1 单元的课次
  if (unit.value?.startsWith('L1')) {
    return ['L1-1', 'L1-2', 'L1-3', 'L1-4']
  }
  // L7 单元的课次
  if (unit.value?.startsWith('L7')) {
    return ['L7-1', 'L7-2', 'L7-3', 'L7-4']
  }
  // L8 单元的课次
  if (unit.value?.startsWith('L8')) {
    return ['L8-1', 'L8-2', 'L8-3', 'L8-4']
  }
  // 其他单元的默认课次
  return ['1', '2', '3', '4'].map(n => `${unit.value}-${n}`)
}

const unitLessons = computed(() => getUnitLessons())
const currentIndex = computed(() => {
  return unitLessons.value.findIndex(l => l === lessonId.value || l === lesson.value)
})

const prevLesson = computed(() => {
  if (currentIndex.value > 0) {
    return unitLessons.value[currentIndex.value - 1]
  }
  return null
})

const nextLesson = computed(() => {
  if (currentIndex.value >= 0 && currentIndex.value < unitLessons.value.length - 1) {
    return unitLessons.value[currentIndex.value + 1]
  }
  return null
})

// 滚动到打字练习区域
const scrollToTypingSection = () => {
  const element = document.getElementById('typing-practice')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// 返回上一页
const goBack = () => {
  router.back()
}

// 强制滚动到顶部的函数
const scrollToTop = () => {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

// 页面加载时滚动到顶部
onMounted(() => {
  nextTick(() => {
    scrollToTop()
  })
})

// 监听路由变化，重置难度选择和打字模式
watch(() => route.params.lesson, () => {
  selectedDifficulty.value = 'all'
  defaultLevel.value = 'easy'
  typingMode.value = 'word'
}, { immediate: true })

// 路由变化后滚动到顶部
watch(() => route.fullPath, () => {
  nextTick(() => {
    scrollToTop()
  })
})

// 内容渲染完成后再次滚动到顶部（确保在 TypingPractice 挂载后执行）
watch(isLoading, (newVal) => {
  if (!newVal) {
    nextTick(() => {
      scrollToTop()
      // 通知全局 loading 可以隐藏了
      notifyPageReady()
    })
  }
})
</script>

<style scoped>
/* 悬浮返回按钮 */
.floating-back-btn {
  position: fixed;
  bottom: 30px;
  left: 30px;
  width: 56px;
  height: 56px;
  background: #ff9f43;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 16px rgba(255, 159, 67, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all 0.3s ease;
  z-index: 1000;
}

.floating-back-btn:hover {
  background: #ff8c23;
  transform: scale(1.1);
  box-shadow: 0 6px 24px rgba(255, 159, 67, 0.5);
}

.floating-back-btn:active {
  transform: scale(0.95);
}

.lesson-view {
  min-height: 100vh;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 加载状态 */
.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #666;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f0f0f0;
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.retry-btn {
  margin-top: 20px;
  padding: 12px 24px;
  background: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

/* 页面头部 */
.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 15px;
  font-size: 0.9rem;
  flex-wrap: wrap;
}

.breadcrumb a {
  color: var(--primary-color);
  text-decoration: none;
  transition: opacity 0.3s;
}

.breadcrumb a:hover {
  opacity: 0.7;
}

.breadcrumb .separator {
  color: #999;
}

.breadcrumb .current {
  color: #666;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.page-header > p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 15px;
}

.meta-info {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.meta-item {
  background: #f5f5f5;
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 0.9rem;
  color: #555;
}

/* 通用区块样式 */
.section {
  background: #fff;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--primary-color);
}

.section-desc {
  color: #666;
  margin-top: -10px;
  margin-bottom: 20px;
}

/* 学习目标 */
.goals-section h2 {
  margin: 0 0 20px 0;
  font-size: 1.3rem;
  color: #333;
}

.goals-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}

.goals-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f9f9f9;
  border-radius: 8px;
  color: #444;
}

.check-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: #4caf50;
  color: #fff;
  border-radius: 50%;
  font-size: 0.8rem;
  flex-shrink: 0;
}

/* 难度筛选 */
.difficulty-filter {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 10px 18px;
  border: 2px solid #e0e0e0;
  background: #fff;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.95rem;
}

/* 打字模式切换 */
.typing-mode-switch {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.mode-btn {
  padding: 10px 18px;
  border: 2px solid #e0e0e0;
  background: #fff;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.95rem;
}

.mode-btn:hover {
  border-color: var(--primary-color);
  background: #fff8f0;
}

.mode-btn.active {
  border-color: var(--primary-color);
  background: var(--primary-color);
  color: #fff;
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

/* 习题列表 */
.exercises-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 课程导航 */
.lesson-navigation {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 40px;
}

.nav-btn {
  flex: 1;
  padding: 16px 32px;
  background: var(--primary-color);
  color: #fff;
  text-decoration: none;
  border-radius: 12px;
  text-align: center;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.nav-btn:only-child {
  flex: 0;
  margin: 0 auto;
  max-width: 200px;
}

/* 响应式 */
@media (max-width: 1024px) {
  .lesson-view {
    max-width: 900px;
  }

  .section {
    padding: 25px;
  }
}

@media (max-width: 768px) {
  .lesson-view {
    padding: 30px 15px;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .page-header > p {
    font-size: 1rem;
  }

  .section {
    padding: 20px;
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 1.3rem;
  }

  .lesson-navigation {
    flex-direction: column;
  }

  .nav-btn {
    width: 100%;
  }

  .difficulty-filter {
    gap: 8px;
  }

  .filter-btn {
    padding: 8px 14px;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .lesson-view {
    padding: 20px 12px;
  }

  .page-header h1 {
    font-size: 1.5rem;
  }

  .page-header > p {
    font-size: 0.9rem;
  }

  .breadcrumb {
    font-size: 0.8rem;
  }

  .section {
    padding: 18px;
  }

  .section-title {
    font-size: 1.1rem;
  }

  .meta-item {
    font-size: 0.8rem;
    padding: 4px 10px;
  }

  /* 悬浮返回按钮 - 手机端适配 */
  .floating-back-btn {
    width: 52px;
    height: 52px;
    bottom: 20px;
    left: 20px;
  }

  .floating-back-btn svg {
    width: 20px;
    height: 20px;
  }
}

/* 平板端适配 */
@media (min-width: 481px) and (max-width: 1024px) {
  .floating-back-btn {
    width: 54px;
    height: 54px;
    bottom: 25px;
    left: 25px;
  }
}

/* 面包屑响应式优化 */
@media (max-width: 768px) {
  .breadcrumb {
    font-size: 0.8rem;
    gap: 6px;
    flex-wrap: nowrap;
  }

  .breadcrumb .separator {
    margin: 0 2px;
  }

  /* 移动端：超长链接文字截断 */
  .breadcrumb a:not(:first-child):not(:last-child) {
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

@media (max-width: 480px) {
  .breadcrumb {
    font-size: 0.75rem;
  }

  /* 超小屏幕：所有链接截断 */
  .breadcrumb a {
    max-width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
