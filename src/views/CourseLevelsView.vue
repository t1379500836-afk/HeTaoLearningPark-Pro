<template>
  <div class="course-levels-view">
    <!-- Hero 区域 -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">核桃编程学习体系</h1>
        <p class="hero-subtitle">循序渐进，从零基础到竞赛高手</p>
        <div class="path-indicator">
          <span class="path-step" :class="{ active: currentIndex === 0 }">图形化</span>
          <span class="path-arrow">→</span>
          <span class="path-step" :class="{ active: currentIndex === 1 }">Python</span>
          <span class="path-arrow">→</span>
          <span class="path-step" :class="{ active: currentIndex === 2 }">C++</span>
        </div>
        <!-- 阶段入口单独一行 -->
        <div class="stage-entrances" v-show="currentIndex === 1">
          <router-link
            v-for="stage in visibleStages"
            :key="stage.id"
            :to="stage.accessible ? prefixedPath(`/levels/${stage.id}`) : '#'"
            class="stage-entrance"
            :class="{
              locked: !stage.accessible,
              bounce: stage.id === highestUnlockedStage
            }"
            @click.prevent="!stage.accessible && showLockedMessage(stage.name)"
          >
            <span class="entrance-emoji">{{ stage.emoji }}</span>
            <span class="entrance-name">{{ stage.id }}</span>
            <span v-if="!stage.accessible" class="lock-icon">🔒</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 轮播式课程卡片 -->
    <section class="carousel-section">
      <!-- 左箭头 -->
      <button
        class="carousel-btn prev-btn"
        @click="prevCard"
        aria-label="上一个"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>

      <!-- 轮播容器 -->
      <div class="carousel-container">
        <div
          class="carousel-track"
          :style="{ transform: `translateX(calc(${getTranslateX}))` }"
        >
          <!-- 图形化编程 -->
          <div
            class="carousel-card scratch-card"
            :class="{ 'side-card': currentIndex !== 0, 'active-card': currentIndex === 0 }"
            @click="prevCard"
          >
            <div class="card-glow scratch-glow"></div>
            <div class="card-content">
              <div class="card-header">
                <div class="card-icon scratch-icon">
                  <svg viewBox="0 0 48 48" fill="none">
                    <rect x="8" y="8" width="32" height="32" rx="8" fill="currentColor"/>
                    <circle cx="18" cy="20" r="3" fill="white"/>
                    <circle cx="30" cy="20" r="3" fill="white"/>
                    <path d="M16 30 Q24 36 32 30" stroke="white" stroke-width="3" stroke-linecap="round" fill="none"/>
                  </svg>
                </div>
                <div class="card-badge">入门推荐</div>
              </div>
              <h2 class="card-title">图形化编程</h2>
              <p class="card-description">零基础启蒙，培养编程思维和逻辑能力</p>
              <div class="card-features">
                <div class="feature-item">
                  <span class="feature-icon">🎮</span>
                  <span>趣味游戏制作</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🎨</span>
                  <span>创意动画设计</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🧩</span>
                  <span>积木式编程</span>
                </div>
              </div>
              <div class="card-meta">
                <span class="meta-item"><strong>课程周期</strong> 1年</span>
              </div>
              <div class="card-action">
                <span class="coming-soon">即将上线</span>
              </div>
            </div>
          </div>

          <!-- Python 编程（中心卡片） -->
          <div
            class="carousel-card python-card main-card"
            :class="{ 'side-card': currentIndex !== 1, 'active-card': currentIndex === 1 }"
            @click="currentIndex !== 1 && (currentIndex = 1)"
          >
            <div class="card-glow python-glow"></div>
            <div class="main-badge">当前学习</div>
            <div class="card-content">
              <div class="card-header">
                <div class="card-icon python-icon">
                  <svg viewBox="0 0 48 48" fill="none">
                    <path d="M24 4C14 4 15 8 15 8v6h10v2H10s-6-.5-6 10 5 10 5 10h4v-5s0-5 5-5h10s5 0 5-5V10s1-6-9-6zm-5 3a2 2 0 110 4 2 2 0 010-4z" fill="currentColor"/>
                    <path d="M24 44c10 0 9-4 9-4v-6H23v-2h15s6 .5 6-10-5-10-5-10h-4v5s0 5-5 5H20s-5 0-5 5v11s-1 6 9 6zm5-3a2 2 0 110-4 2 2 0 010 4z" fill="currentColor" opacity="0.8"/>
                  </svg>
                </div>
              </div>
              <h2 class="card-title">Python 编程</h2>
              <p class="card-description">
                <strong>代码编程的第一步</strong>，从图形化到代码的完美过渡。
                Python 是全球最流行的编程语言之一，语法简洁易懂，是学习真正编程的最佳起点。
              </p>
              <div class="card-features">
                <div class="feature-item">
                  <span class="feature-icon">📝</span>
                  <span>真实代码编写体验</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🤖</span>
                  <span>智能硬件控制</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">📱</span>
                  <span>App应用开发基础</span>
                </div>
                <div class="feature-item highlight">
                  <span class="feature-icon">⭐</span>
                  <span>通往 C++ 竞赛的必经之路</span>
                </div>
              </div>
              <div class="card-meta">
                <span class="meta-item"><strong>课程周期</strong> 1年半</span>
              </div>

              <!-- Python 阶段选择 -->
              <div class="python-stages">
                <div
                  v-for="stage in visibleStages"
                  :key="stage.id"
                  class="stage-item"
                  :class="{ locked: !stage.accessible }"
                  :style="{ '--stage-color': stage.color }"
                >
                  <router-link
                    v-if="stage.accessible"
                    :to="prefixedPath(`/levels/${stage.id}`)"
                    class="stage-link"
                  >
                    <div class="stage-icon">{{ stage.emoji }}</div>
                    <div class="stage-info">
                      <h4>{{ stage.id }}</h4>
                      <p>{{ stage.name }}</p>
                    </div>
                    <div class="stage-levels">{{ stage.levels.length }} Levels</div>
                    <svg class="stage-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </router-link>
                  <div v-else class="stage-locked" @click="showLockedMessage(stage.name)">
                    <div class="stage-icon">{{ stage.emoji }}</div>
                    <div class="stage-info">
                      <h4>{{ stage.id }}</h4>
                      <p>{{ stage.name }}</p>
                    </div>
                    <div class="stage-levels">{{ stage.levels.length }} Levels</div>
                    <span class="lock-icon">🔒</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- C++ 编程 -->
          <div
            class="carousel-card cpp-card"
            :class="{ 'side-card': currentIndex !== 2, 'active-card': currentIndex === 2 }"
            @click="nextCard"
          >
            <div class="card-glow cpp-glow"></div>
            <div class="card-content">
              <div class="card-header">
                <div class="card-icon cpp-icon">
                  <svg viewBox="0 0 48 48" fill="none">
                    <rect x="6" y="10" width="36" height="28" rx="4" fill="currentColor"/>
                    <text x="12" y="30" fill="white" font-size="14" font-weight="bold">C++</text>
                  </svg>
                </div>
                <div class="card-badge advanced">进阶挑战</div>
              </div>
              <h2 class="card-title">C++ 编程</h2>
              <p class="card-description">算法竞赛首选语言，需要扎实的编程基础</p>
              <div class="card-features">
                <div class="feature-item">
                  <span class="feature-icon">🏆</span>
                  <span>信息学奥赛 NOI/CSP</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">📊</span>
                  <span>算法与数据结构</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🎮</span>
                  <span>Pygame游戏开发</span>
                </div>
              </div>
              <div class="card-meta">
                <span class="meta-item"><strong>课程周期</strong> 3年</span>
              </div>
              <div class="card-prerequisite">
                <span class="prerequisite-icon">⚠️</span>
                <span>需要先完成 Python 全部课程，具备扎实的编程基础</span>
              </div>
              <div class="card-action">
                <span class="coming-soon">即将上线</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右箭头 -->
      <button
        class="carousel-btn next-btn"
        @click="nextCard"
        aria-label="下一个"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      <!-- 轮播指示器 -->
      <div class="carousel-indicators">
        <button
          v-for="(name, index) in ['图形化', 'Python', 'C++']"
          :key="index"
          class="indicator"
          :class="{ active: currentIndex === index }"
          @click="currentIndex = index"
        >
          {{ name }}
        </button>
      </div>
    </section>

    <!-- 学习路径说明 -->
    <section class="learning-path-section">
      <h3>为什么要按顺序学习？</h3>
      <div class="path-cards">
        <div class="path-card">
          <div class="path-header">
            <span class="path-step-num">1</span>
            <span class="path-title">图形化：培养思维</span>
          </div>
          <p>通过拖拽积木理解程序逻辑，无需担心语法错误，专注培养解决问题的思维方式。</p>
        </div>
        <div class="path-card featured">
          <div class="path-header">
            <span class="path-step-num">2</span>
            <span class="path-title">Python：掌握代码</span>
          </div>
          <p><strong>这是最关键的一步！</strong>从图形化过渡到真实代码，学习变量、循环、函数等核心概念。跳过这一步直接学 C++，就像还没学会走就想跑，会大大增加学习难度和挫败感。</p>
        </div>
        <div class="path-card">
          <div class="path-header">
            <span class="path-step-num">3</span>
            <span class="path-title">C++：冲刺竞赛</span>
          </div>
          <p>有了 Python 打下的坚实基础，学习 C++ 复杂的语法和指针概念会轻松很多。这时候你已经有能力挑战信息学奥赛了！</p>
        </div>
      </div>
      <div class="path-reminder">
        <span class="reminder-icon">💡</span>
        <span>每一个阶段都是为下一个阶段做准备，稳扎稳打才能走得更远。</span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { stageConfig } from '@/config/courses.config.js'
import { getCurrentPrefix, getAllowedStages, prefixedPath as buildPrefixedPath } from '@/composables/useRoutePrefix.js'

const router = useRouter()
const route = useRoute()

// 轮播索引，默认为 1（Python 居中）
const currentIndex = ref(1)

// 响应式屏幕宽度
const screenWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)

// 更新屏幕宽度
function updateScreenWidth() {
  screenWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth)
})

// 根据屏幕宽度计算卡片单元宽度
function getUnitWidth() {
  if (screenWidth.value <= 480) return 275  // 260 + 15
  if (screenWidth.value <= 768) return 295  // 280 + 15
  if (screenWidth.value <= 1024) return 340 // 320 + 20
  return 400 // 380 + 20
}

// 计算轮播偏移量
const getTranslateX = computed(() => {
  const unitWidth = getUnitWidth()
  // 在移动端（768px 以下），Python 卡片默认通过 CSS 居中
  // 偏移量相对于 Python 卡片位置
  const offset = (1 - currentIndex.value) * unitWidth
  return `${offset}px`
})

// 切换卡片（循环逻辑）
function prevCard() {
  currentIndex.value = currentIndex.value === 0 ? 2 : currentIndex.value - 1
}

function nextCard() {
  currentIndex.value = currentIndex.value === 2 ? 0 : currentIndex.value + 1
}

// 获取当前路由前缀
const prefix = computed(() => getCurrentPrefix(route))

// 获取允许访问的阶段
const allowedStages = computed(() => getAllowedStages(prefix.value))

// 课程阶段颜色和图标配置
const stageStyles = {
  PY1: { color: '#ff9f43', emoji: '🌱' },
  PY2: { color: '#4facfe', emoji: '🌿' },
  PY3: { color: '#a55eea', emoji: '🌳' }
}

// 从配置文件加载课程阶段数据
const baseStages = Object.values(stageConfig).map(stage => ({
  id: stage.id,
  name: stage.name,
  description: stage.description,
  color: stageStyles[stage.id]?.color || '#666',
  emoji: stageStyles[stage.id]?.emoji || '📚',
  levels: stage.units
}))

// 根据前缀过滤可见阶段，并添加可访问状态
const visibleStages = computed(() => {
  return baseStages.map(stage => ({
    ...stage,
    accessible: allowedStages.value.includes(stage.id)
  }))
})

// 找出当前解锁的最高阶段（用于跳动提示）
const highestUnlockedStage = computed(() => {
  // 按 PY3 > PY2 > PY1 的顺序查找第一个解锁的阶段
  for (let i = visibleStages.value.length - 1; i >= 0; i--) {
    if (visibleStages.value[i].accessible) {
      return visibleStages.value[i].id
    }
  }
  return null
})

// 生成带前缀的路径
function prefixedPath(path) {
  return buildPrefixedPath(prefix.value, path)
}

// 显示锁定提示对话框
const showLockedMessage = (stageName) => {
  router.push({ path: prefixedPath('/locked'), query: { stage: stageName } })
}
</script>

<style scoped>
.course-levels-view {
  min-height: 100vh;
  padding-bottom: 60px;
  background: linear-gradient(180deg, #f8f9fa 0%, #fff 100%);
}

/* Hero 区域 */
.hero-section {
  background: linear-gradient(135deg, #ff9f43 0%, #ff6b6b 50%, #a55eea 100%);
  padding: 50px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.3; }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 12px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.hero-subtitle {
  font-size: 1.1rem;
  color: rgba(255,255,255,0.9);
  margin-bottom: 25px;
}

.path-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.path-step {
  background: rgba(255,255,255,0.2);
  color: #fff;
  padding: 8px 20px;
  border-radius: 25px;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
}

.path-step.active {
  background: #fff;
  color: #ff9f43;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transform: scale(1.05);
}

.path-arrow {
  color: rgba(255,255,255,0.7);
  font-size: 1.5rem;
}

/* 阶段入口 */
.stage-entrances {
  display: flex;
  justify-content: center;
  gap: 12px;
  animation: fadeIn 0.3s ease;
  margin-top: 15px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.stage-entrance {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: rgba(255,255,255,0.95);
  color: #333;
  padding: 10px 16px;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  min-width: 70px;
  position: relative;
}

.stage-entrance:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
}

.stage-entrance.locked {
  opacity: 0.6;
  cursor: pointer;
}

.stage-entrance.locked:hover {
  opacity: 0.8;
}

.entrance-emoji {
  font-size: 1.3rem;
}

.entrance-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #ff9f43;
}

.lock-icon {
  font-size: 0.75rem;
  position: absolute;
  top: 4px;
  right: 4px;
  opacity: 0.7;
}

/* 跳动动画 */
.stage-entrance.bounce {
  animation: bounce 1.5s ease-in-out infinite;
  position: relative;
}

.stage-entrance.bounce::after {
  content: '点击开始';
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  color: #fff;
  background: #ff9f43;
  padding: 2px 8px;
  border-radius: 8px;
  white-space: nowrap;
  animation: fadeInOut 1.5s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes fadeInOut {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

/* 轮播区域 */
.carousel-section {
  position: relative;
  padding: 60px 20px 100px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

/* 轮播按钮 */
.carousel-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  flex-shrink: 0;
  z-index: 10;
}

.carousel-btn:hover:not(:disabled) {
  background: #ff9f43;
  box-shadow: 0 6px 25px rgba(255,159,67,0.4);
}

.carousel-btn:hover:not(:disabled) svg {
  color: #fff;
}

.carousel-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.carousel-btn svg {
  width: 24px;
  height: 24px;
  color: #666;
  transition: color 0.3s;
}

.next-btn svg {
  /* 箭头已经朝右，无需旋转 */
}

/* 轮播容器 */
.carousel-container {
  flex: 1;
  min-width: 0;
  max-width: 1200px;
  overflow: hidden;
  padding: 20px 0;
}

.carousel-track {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  width: max-content;
  /* 桌面端：380px 卡片，20px gap */
  /* 第二个卡片起始 = 380 + 20 = 400px，中心 = 400 + 190 = 590px */
  margin-left: calc(50% - 590px);
}

/* 卡片样式 */
.carousel-card {
  flex: 0 0 380px;
  max-width: 380px;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  overflow: hidden;
  position: relative;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center center;
}

/* 侧边卡片样式（低饱和度、缩小） */
.carousel-card.side-card {
  opacity: 0.5;
  transform: scale(0.85);
  filter: grayscale(30%);
  cursor: pointer;
}

.carousel-card.side-card:hover {
  opacity: 0.7;
  filter: grayscale(10%);
  transform: scale(0.9);
}

/* 当前活动卡片 */
.carousel-card.active-card {
  opacity: 1;
  transform: scale(1);
  filter: none;
  z-index: 10;
}

.card-content {
  padding: 30px;
}

/* 卡片发光效果 */
.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
}

.python-glow {
  background: linear-gradient(90deg, #ff9f43, #ff6b6b);
}

.scratch-glow {
  background: linear-gradient(90deg, #4cd964, #34c759);
}

.cpp-glow {
  background: linear-gradient(90deg, #5856d6, #007aff);
}

/* Python 主卡片样式 */
.python-card {
  border: 2px solid #ff9f43;
  box-shadow: 0 15px 50px rgba(255,159,67,0.2);
}

.main-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(135deg, #ff9f43, #ff6b6b);
  color: #fff;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 5;
}

/* 卡片头部 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.card-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-icon svg {
  width: 36px;
  height: 36px;
}

.scratch-icon {
  background: linear-gradient(135deg, #4cd964, #34c759);
  color: #fff;
}

.python-icon {
  background: linear-gradient(135deg, #ff9f43, #ff6b6b);
  color: #fff;
}

.cpp-icon {
  background: linear-gradient(135deg, #5856d6, #007aff);
  color: #fff;
}

.card-badge {
  background: #e8f5e9;
  color: #2e7d32;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.card-badge.advanced {
  background: #e3f2fd;
  color: #1565c0;
}

/* 卡片标题和描述 */
.card-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

.card-description {
  color: #666;
  line-height: 1.7;
  margin-bottom: 20px;
}

/* 特性列表 */
.card-features {
  margin-bottom: 15px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
  color: #555;
}

.feature-icon {
  font-size: 1.1rem;
}

.feature-item.highlight {
  background: linear-gradient(90deg, #fff7ed, #ffedd5);
  margin: 0 -15px;
  padding: 8px 15px;
  border-radius: 8px;
  color: #ea580c;
  font-weight: 500;
}

/* 元信息 */
.card-meta {
  padding-top: 15px;
  border-top: 1px solid #eee;
  margin-bottom: 15px;
}

.meta-item {
  font-size: 0.9rem;
  color: #888;
}

.meta-item strong {
  color: #555;
  margin-right: 5px;
}

/* 前置要求提示 */
.card-prerequisite {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fef3c7;
  color: #92400e;
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 0.85rem;
  margin-bottom: 15px;
}

.prerequisite-icon {
  font-size: 1rem;
}

/* 操作按钮 */
.card-action {
  margin-top: auto;
}

.coming-soon {
  display: block;
  text-align: center;
  background: #f5f5f5;
  color: #999;
  padding: 12px;
  border-radius: 12px;
  font-size: 0.95rem;
}

/* Python 阶段选择 */
.python-stages {
  margin-top: 15px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.stage-item {
  border-radius: 12px;
  margin-bottom: 10px;
  overflow: hidden;
  background: #f8f9fa;
  transition: all 0.2s;
}

.stage-item:last-child {
  margin-bottom: 0;
}

.stage-item:not(.locked):hover {
  background: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
}

.stage-link,
.stage-locked {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  position: relative;
}

.stage-icon {
  font-size: 1.5rem;
  margin-right: 12px;
}

.stage-info {
  flex: 1;
}

.stage-info h4 {
  font-size: 1rem;
  color: var(--stage-color);
  margin-bottom: 2px;
}

.stage-info p {
  font-size: 0.85rem;
  color: #666;
}

.stage-levels {
  font-size: 0.8rem;
  color: #999;
  background: #eee;
  padding: 4px 10px;
  border-radius: 10px;
  margin-right: 10px;
}

.stage-arrow {
  width: 20px;
  height: 20px;
  color: #ccc;
}

.stage-item.locked {
  opacity: 0.7;
}

.stage-item .lock-icon {
  font-size: 1rem;
  position: static;
  margin-left: auto;
}

/* 轮播指示器 */
.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-top: 30px;
}

.indicator {
  background: #e0e0e0;
  color: #666;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
}

.indicator:hover {
  background: #d0d0d0;
}

.indicator.active {
  background: linear-gradient(135deg, #ff9f43, #ff6b6b);
  color: #fff;
  font-weight: 500;
}

/* 学习路径说明 */
.learning-path-section {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px 40px;
}

.learning-path-section h3 {
  font-size: 1.4rem;
  color: #333;
  text-align: center;
  margin-bottom: 25px;
}

.path-cards {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.path-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px 25px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.06);
  border-left: 4px solid #ddd;
}

.path-card.featured {
  border-left-color: #ff9f43;
  background: linear-gradient(90deg, #fffbf5, #fff);
}

.path-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.path-step-num {
  width: 28px;
  height: 28px;
  background: #eee;
  color: #666;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
}

.path-card.featured .path-step-num {
  background: linear-gradient(135deg, #ff9f43, #ff6b6b);
  color: #fff;
}

.path-title {
  font-weight: 600;
  color: #333;
}

.path-card p {
  color: #555;
  line-height: 1.7;
  margin: 0;
  font-size: 0.95rem;
}

.path-reminder {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 25px;
  padding: 15px 20px;
  background: #f0f9ff;
  border-radius: 12px;
  color: #0369a1;
  font-size: 0.95rem;
}

.reminder-icon {
  font-size: 1.2rem;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .carousel-card {
    flex: 0 0 340px;
    max-width: 340px;
  }
}

@media (max-width: 1024px) {
  .carousel-section {
    padding: 50px 15px 100px;
  }

  .carousel-container {
    overflow: hidden;
  }

  .carousel-track {
    width: max-content;
    /* 320px 卡片，20px gap */
    /* 第二个卡片起始 = 320 + 20 = 340px，中心 = 340 + 160 = 500px */
    margin-left: calc(50% - 500px);
    justify-content: flex-start;
  }

  .carousel-btn {
    width: 50px;
    height: 50px;
  }

  .carousel-card {
    flex: 0 0 320px;
    max-width: 320px;
  }

  .carousel-card.side-card {
    opacity: 0.4;
    transform: scale(0.8);
  }

  .carousel-card.active-card {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 15px 30px;
  }

  .path-indicator {
    flex-wrap: nowrap;
  }

  .stage-entrances {
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 12px;
  }

  .stage-entrance {
    padding: 8px 12px;
    min-width: 60px;
  }

  .entrance-emoji {
    font-size: 1.1rem;
  }

  .entrance-name {
    font-size: 0.8rem;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .path-step {
    padding: 6px 15px;
    font-size: 0.9rem;
  }

  .carousel-section {
    padding: 30px 0 80px;
    flex-direction: column;
    position: relative;
  }

  .carousel-container {
    order: 1;
    max-width: 100%;
    overflow: hidden;
    width: 100%;
  }

  .carousel-track {
    gap: 15px;
    width: max-content;
    /* 让第二个卡片（Python）的中心对齐容器中心 */
    /* 第二个卡片起始位置 = 280 + 15 = 295px，中心 = 295 + 140 = 435px */
    /* margin-left = 容器中心 - 第二个卡片中心 = 50% - 435px */
    margin-left: calc(50% - 435px);
    justify-content: flex-start;
  }

  .carousel-card {
    flex: 0 0 280px;
    max-width: 280px;
  }

  .carousel-card.side-card {
    opacity: 0.3;
    transform: scale(0.75);
  }

  .carousel-card.active-card {
    opacity: 1;
    transform: scale(1);
  }

  .carousel-btn {
    order: 2;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    background: rgba(255,255,255,0.9);
  }

  .prev-btn {
    left: 5px;
  }

  .next-btn {
    right: 5px;
  }

  .carousel-btn svg {
    width: 20px;
    height: 20px;
  }

  .carousel-indicators {
    margin-top: 20px;
    order: 3;
  }

  .indicator {
    padding: 6px 14px;
    font-size: 0.85rem;
  }

  .card-content {
    padding: 22px;
  }

  .card-title {
    font-size: 1.3rem;
  }

  .card-icon {
    width: 48px;
    height: 48px;
  }

  .card-icon svg {
    width: 30px;
    height: 30px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.5rem;
  }

  .path-indicator {
    gap: 10px;
  }

  .path-arrow {
    font-size: 1.2rem;
  }

  .stage-entrances {
    gap: 6px;
  }

  .stage-entrance {
    padding: 6px 10px;
    min-width: 55px;
  }

  .entrance-emoji {
    font-size: 1rem;
  }

  .entrance-name {
    font-size: 0.75rem;
  }

  .stage-entrances {
    margin-top: 10px;
    gap: 8px;
  }

  .stage-entrance.bounce::after {
    display: none;
  }

  .carousel-section {
    padding: 25px 0 70px;
  }

  .carousel-track {
    /* 260px 卡片，15px gap */
    /* 第二个卡片起始 = 260 + 15 = 275px，中心 = 275 + 130 = 405px */
    margin-left: calc(50% - 405px);
    justify-content: flex-start;
  }

  .carousel-card {
    flex: 0 0 260px;
    max-width: 260px;
  }

  .carousel-card.side-card {
    opacity: 0.2;
    transform: scale(0.7);
  }

  .carousel-card.active-card {
    opacity: 1;
    transform: scale(1);
  }

  .carousel-btn {
    width: 40px;
    height: 40px;
  }

  .card-content {
    padding: 18px;
  }

  .card-title {
    font-size: 1.2rem;
  }

  .stage-link,
  .stage-locked {
    padding: 10px 12px;
  }

  .stage-icon {
    font-size: 1.3rem;
  }

  .main-badge {
    top: 10px;
    right: 10px;
    padding: 4px 12px;
    font-size: 0.8rem;
  }

  .learning-path-section h3 {
    font-size: 1.2rem;
  }

  .path-card {
    padding: 15px 18px;
  }

  .indicator {
    padding: 5px 12px;
    font-size: 0.8rem;
  }
}
</style>
