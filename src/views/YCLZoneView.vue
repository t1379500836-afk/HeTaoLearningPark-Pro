<template>
  <div class="ycl-zone-view">
    <!-- 悬浮返回按钮 -->
    <button class="floating-back-btn" @click="goBack" aria-label="返回上一页">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>

    <!-- Hero区域 -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>🎯 YCL 考级专区</h1>
        <p class="subtitle">青少年人工智能编程水平测试 · 冲刺练习</p>
        <p class="description">YCL是由工信部教育与考试中心主办的青少年编程能力测评，获得YCL证书可作为科技特长生的重要参考依据</p>
      </div>
    </section>

    <!-- 考试信息区 -->
    <section class="exam-info-section">
      <h2>📋 考试信息</h2>
      <div class="info-cards">
        <div class="info-card">
          <div class="info-icon">⏱️</div>
          <div class="info-content">
            <h3>考试时长</h3>
            <p class="info-value">{{ examInfo.basic.duration }}分钟</p>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon">📊</div>
          <div class="info-content">
            <h3>满分/及格</h3>
            <p class="info-value">{{ examInfo.basic.totalScore }}/{{ examInfo.basic.passingScore }}分</p>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon">📝</div>
          <div class="info-content">
            <h3>题型分布</h3>
            <p class="info-value">单选15题 + 多选5题 + 编程4题</p>
          </div>
        </div>
      </div>

      <!-- 题型详情 -->
      <div class="question-types">
        <h3>题型详情</h3>
        <div class="type-list">
          <div v-for="type in examInfo.questionTypes" :key="type.id" class="type-item">
            <div class="type-header">
              <span class="type-name">{{ type.name }}</span>
              <span class="type-score">{{ type.totalScore }}分</span>
            </div>
            <p class="type-desc">{{ type.description }}</p>
            <p class="type-count">共{{ type.count }}题，{{ type.scorePerQuestion || type.scores?.join('/') }}分/题</p>
          </div>
        </div>
      </div>

      <!-- 时间建议 -->
      <div class="time-allocation">
        <h3>⏰ 时间分配建议</h3>
        <div class="time-bars">
          <div class="time-bar">
            <span class="time-label">客观题</span>
            <div class="bar-container">
              <div class="bar-fill" style="width: 39%; background: #4CAF50;"></div>
            </div>
            <span class="time-value">{{ examInfo.timeAllocation.objective }}分钟</span>
          </div>
          <div class="time-bar">
            <span class="time-label">编程题</span>
            <div class="bar-container">
              <div class="bar-fill" style="width: 56%; background: #2196F3;"></div>
            </div>
            <span class="time-value">{{ examInfo.timeAllocation.coding }}分钟</span>
          </div>
          <div class="time-bar">
            <span class="time-label">检查</span>
            <div class="bar-container">
              <div class="bar-fill" style="width: 5%; background: #FF9800;"></div>
            </div>
            <span class="time-value">{{ examInfo.timeAllocation.review }}分钟</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 等级选择区 -->
    <section class="level-select-section">
      <h2>🏆 选择等级</h2>
      <p class="section-desc">根据你的学习阶段选择对应的考级等级</p>
      <div class="level-cards">
        <div
          v-for="level in accessibleLevels"
          :key="level.id"
          class="level-card"
          :class="{ locked: !level.accessible }"
          @click="level.accessible && selectLevel(level.id)"
        >
          <div class="level-header">
            <span class="level-badge">{{ level.name }}</span>
            <span v-if="!level.accessible" class="lock-icon">🔒</span>
          </div>
          <h3>{{ level.fullName }}</h3>
          <p class="level-target">适用阶段：{{ level.targetStage }}</p>
          <p class="level-desc">{{ level.description }}</p>
          <div class="level-stats">
            <span class="stat">📖 {{ getKnowledgeCount(level.id) }}个知识点</span>
            <span class="stat">📝 5套练习</span>
          </div>
          <button
            v-if="level.accessible"
            class="level-btn"
            :disabled="!level.accessible"
          >
            开始练习
          </button>
          <p v-else class="unlock-tip">需完成{{ level.targetStage }}阶段解锁</p>
        </div>
      </div>
    </section>

    <!-- 考前准备提醒 -->
    <section class="preparation-section">
      <h2>🎒 考前准备</h2>
      <div class="prep-grid">
        <div class="prep-card">
          <h3>💻 设备要求</h3>
          <ul>
            <li v-for="device in examInfo.preparation.devices" :key="device.type">
              <strong>{{ device.type }}</strong>：{{ device.requirement || device.purpose }}
            </li>
          </ul>
        </div>
        <div class="prep-card">
          <h3>📄 证件要求</h3>
          <ul>
            <li v-for="doc in examInfo.preparation.documents" :key="doc.type">
              <strong>{{ doc.type }}</strong>
              <span v-if="doc.options">（{{ doc.options.join('、') }}，{{ doc.note }}）</span>
            </li>
          </ul>
        </div>
        <div class="prep-card">
          <h3>💡 考前提示</h3>
          <ul>
            <li v-for="(tip, index) in examInfo.preparation.tips" :key="index">{{ tip }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getCurrentPrefix, prefixedPath as buildPrefixedPath } from '@/composables/useRoutePrefix.js'
import { examInfo } from '@/data/courses/YCL/config/exam-info.js'
import { levelInfo, getKnowledgePointsByLevel, canAccessLevel } from '@/data/courses/YCL/config/knowledge-points.js'

const router = useRouter()
const route = useRoute()

// 获取当前路由前缀
const currentPrefix = computed(() => getCurrentPrefix(route))

// 构建带前缀的路径
function prefixedPath(path) {
  return buildPrefixedPath(currentPrefix.value, path)
}

// 获取可访问的等级列表
const accessibleLevels = computed(() => {
  return Object.entries(levelInfo).map(([levelId, info]) => ({
    id: levelId,
    ...info,
    accessible: canAccessLevel(levelId, currentPrefix.value)
  }))
})

// 获取知识点数量
function getKnowledgeCount(levelId) {
  const points = getKnowledgePointsByLevel(levelId)
  return points ? points.length : 0
}

// 选择等级
function selectLevel(levelId) {
  router.push(prefixedPath(`/ycl/practice/${levelId}`))
}

// 返回上一页
function goBack() {
  // 如果没有历史记录，则返回首页
  if (window.history.length <= 1) {
    router.push(prefixedPath('/'))
  } else {
    router.back()
  }
}
</script>

<style scoped>
.ycl-zone-view {
  min-height: 100vh;
  padding-bottom: 60px;
}

/* 悬浮返回按钮 */
.floating-back-btn {
  position: fixed;
  bottom: 30px;
  left: 30px;
  width: 56px;
  height: 56px;
  background: #667eea;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all 0.3s ease;
  z-index: 1000;
}

.floating-back-btn:hover {
  background: #5a6fd6;
  transform: scale(1.1);
  box-shadow: 0 6px 24px rgba(102, 126, 234, 0.5);
}

.floating-back-btn:active {
  transform: scale(0.95);
}

/* Hero区域 */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 20px;
  text-align: center;
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.hero-content .subtitle {
  font-size: 1.3rem;
  opacity: 0.95;
  margin-bottom: 15px;
}

.hero-content .description {
  max-width: 600px;
  margin: 0 auto;
  font-size: 1rem;
  opacity: 0.85;
  line-height: 1.6;
}

/* 考试信息区 */
.exam-info-section {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

.exam-info-section h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 25px;
  text-align: center;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.info-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
}

.info-icon {
  font-size: 2.5rem;
}

.info-content h3 {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 5px;
}

.info-value {
  font-size: 1.1rem;
  color: #333;
  font-weight: 600;
}

/* 题型详情 */
.question-types {
  background: white;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
}

.question-types h3 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 20px;
}

.type-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.type-item {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
}

.type-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.type-name {
  font-weight: 600;
  color: #333;
}

.type-score {
  background: #667eea;
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.85rem;
}

.type-desc {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.type-count {
  color: #888;
  font-size: 0.85rem;
}

/* 时间分配 */
.time-allocation {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
}

.time-allocation h3 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 20px;
}

.time-bars {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.time-bar {
  display: flex;
  align-items: center;
  gap: 15px;
}

.time-label {
  width: 70px;
  font-size: 0.9rem;
  color: #666;
}

.bar-container {
  flex: 1;
  height: 12px;
  background: #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 0.5s ease;
}

.time-value {
  width: 60px;
  text-align: right;
  font-size: 0.9rem;
  color: #333;
  font-weight: 500;
}

/* 等级选择区 */
.level-select-section {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

.level-select-section h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}

.section-desc {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}

.level-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.level-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.level-card:hover:not(.locked) {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.level-card.locked {
  opacity: 0.6;
  cursor: not-allowed;
}

.level-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.level-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.lock-icon {
  font-size: 1.2rem;
}

.level-card h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

.level-target {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.level-desc {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 15px;
}

.level-stats {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.stat {
  font-size: 0.85rem;
  color: #888;
}

.level-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.3s;
}

.level-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.unlock-tip {
  text-align: center;
  color: #999;
  font-size: 0.85rem;
}

/* 考前准备 */
.preparation-section {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

.preparation-section h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 25px;
  text-align: center;
}

.prep-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.prep-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
}

.prep-card h3 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 15px;
}

.prep-card ul {
  list-style: none;
  padding: 0;
}

.prep-card li {
  padding: 8px 0;
  color: #666;
  font-size: 0.9rem;
  border-bottom: 1px solid #f0f0f0;
}

.prep-card li:last-child {
  border-bottom: none;
}

.prep-card li strong {
  color: #333;
}

/* 响应式 */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-content .subtitle {
    font-size: 1.1rem;
  }

  .info-cards {
    grid-template-columns: 1fr;
  }

  .level-cards {
    grid-template-columns: 1fr;
  }
}

/* 更小屏幕适配 480px */
@media (max-width: 480px) {
  .ycl-zone-view {
    padding-bottom: 80px;
  }

  .hero-section {
    padding: 40px 15px;
  }

  .hero-content h1 {
    font-size: 1.6rem;
  }

  .hero-content .subtitle {
    font-size: 1rem;
  }

  .hero-content .description {
    font-size: 0.9rem;
    padding: 0 10px;
  }

  .exam-info-section,
  .level-select-section,
  .preparation-section {
    padding: 30px 15px;
  }

  .exam-info-section h2,
  .level-select-section h2,
  .preparation-section h2 {
    font-size: 1.5rem;
  }

  .section-desc {
    font-size: 0.9rem;
  }

  .info-card {
    padding: 18px;
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .info-icon {
    font-size: 2rem;
  }

  .info-content h3 {
    font-size: 0.85rem;
  }

  .info-value {
    font-size: 1rem;
  }

  .question-types,
  .time-allocation {
    padding: 18px;
  }

  .question-types h3,
  .time-allocation h3 {
    font-size: 1.1rem;
  }

  .type-list {
    grid-template-columns: 1fr;
  }

  .type-item {
    padding: 15px;
  }

  .type-name {
    font-size: 0.95rem;
  }

  .type-desc,
  .type-count {
    font-size: 0.85rem;
  }

  .time-bar {
    flex-wrap: wrap;
    gap: 10px;
  }

  .time-label {
    width: 60px;
    font-size: 0.85rem;
  }

  .bar-container {
    flex: 1;
    min-width: 100px;
  }

  .time-value {
    width: 50px;
    font-size: 0.85rem;
  }

  .level-card {
    padding: 20px;
  }

  .level-card h3 {
    font-size: 1.3rem;
  }

  .level-target,
  .level-desc {
    font-size: 0.9rem;
  }

  .level-stats {
    flex-direction: column;
    gap: 8px;
  }

  .stat {
    font-size: 0.8rem;
  }

  .level-btn {
    padding: 10px;
    font-size: 0.95rem;
  }

  .prep-grid {
    gap: 15px;
  }

  .prep-card {
    padding: 18px;
  }

  .prep-card h3 {
    font-size: 1rem;
  }

  .prep-card li {
    font-size: 0.85rem;
    padding: 6px 0;
  }

  .floating-back-btn {
    width: 48px;
    height: 48px;
    bottom: 15px;
    left: 15px;
  }

  .floating-back-btn svg {
    width: 18px;
    height: 18px;
  }
}
</style>
