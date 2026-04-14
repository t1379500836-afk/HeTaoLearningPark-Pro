<template>
  <div class="stage-view">
    <!-- 悬浮返回按钮 -->
    <button class="floating-back-btn" @click="goBack" aria-label="返回上一页">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>

    <!-- StageLocked content shown when stage is not unlocked -->
    <div v-if="!isAccessible" class="stage-locked">
      <div class="locked-icon">🔒</div>
      <h2>课程未解锁</h2>
      <p>您当前的学习阶段尚未解锁此课程，下阶段报名之后自动解锁哟~</p>
      <button @click="goToLevels" class="back-btn">
        返回课程体系
      </button>
    </div>

    <!-- Normal content when stage is unlocked -->
    <template v-else>
    <section class="page-header">
      <div class="breadcrumb">
        <router-link :to="prefixedPath('/levels')">课程体系</router-link>
        <span class="separator">/</span>
        <span class="current">{{ stageInfo.name }}</span>
      </div>
      <h1>{{ stageInfo.name }}</h1>
      <p>{{ stageInfo.description }}</p>
    </section>

    <section class="levels">
      <router-link
        v-for="level in stageInfo.levels"
        :key="level.id"
        :to="prefixedPath(`/levels/${stage}/${level.id}`)"
        class="level-card"
      >
        <div class="level-icon">{{ level.icon }}</div>
        <h3>{{ level.name }}</h3>
        <p>{{ level.description }}</p>
        <div class="level-lessons">
          <span v-for="lesson in level.lessons" :key="lesson" class="lesson-tag">{{ lesson }}</span>
        </div>
      </router-link>
    </section>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { stageConfig, getUnitInfo, getUnitLessons } from '@/config/courses.config.js'
import { getCurrentPrefix, getAllowedStages, prefixedPath as buildPrefixedPath } from '@/composables/useRoutePrefix.js'

const route = useRoute()
const router = useRouter()
const stage = computed(() => route.params.stage)

// 获取当前路由前缀
const prefix = computed(() => getCurrentPrefix(route))

// 获取允许访问的阶段
const allowedStages = computed(() => getAllowedStages(prefix.value))

// Level 图标映射
const levelIcons = {
  L1: '1️⃣',
  L2: '2️⃣',
  L3: '3️⃣',
  L4: '4️⃣',
  L5: '5️⃣',
  L6: '6️⃣',
  L7: '7️⃣',
  L8: '8️⃣',
  L9: '9️⃣',
  L10: '🔟',
  L11: '1️⃣1️⃣',
  L12: '1️⃣2️⃣',
  L13: '1️⃣3️⃣',
  L14: '1️⃣4️⃣',
  L15: '1️⃣5️⃣',
  L16: '1️⃣6️⃣',
  L17: '1️⃣7️⃣',
  L18: '1️⃣8️⃣'
}

// 从配置文件构建阶段数据
const stageInfo = computed(() => {
  const config = stageConfig[stage.value]
  if (!config) return { name: '', description: '', levels: [] }

  return {
    name: config.name,
    description: config.description,
    levels: config.units.map(unitId => {
      const unitInfo = getUnitInfo(unitId)
      const lessons = getUnitLessons(unitId)
      return {
        id: unitId,
        name: unitInfo.name,
        icon: levelIcons[unitId] || '📚',
        description: unitInfo.description,
        lessons: lessons
      }
    })
  }
})

// 检查当前阶段是否可访问（结合前缀权限）
const isAccessible = computed(() => allowedStages.value.includes(stage.value))

// 生成带前缀的路径
function prefixedPath(path) {
  return buildPrefixedPath(prefix.value, path)
}

// Navigate back to course levels page
function goToLevels() {
  router.push(prefixedPath('/levels'))
}

// 返回上一页
function goBack() {
  router.back()
}
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

.stage-locked {
  text-align: center;
  padding: 80px 20px;
  max-width: 600px;
  margin: 40px auto;
}

.locked-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.stage-locked h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 15px;
}

.stage-locked p {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
}

.back-btn {
  background: var(--primary-color);
  color: #fff;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: opacity 0.3s;
}

.back-btn:hover {
  opacity: 0.9;
}

.stage-view {
  min-height: 100vh;
  padding: 40px 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 50px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.breadcrumb a {
  color: var(--primary-color);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
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

.page-header p {
  font-size: 1.1rem;
  color: #666;
  min-height: 1.6em;
}

.levels {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.level-card {
  background: #fff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  text-decoration: none;
  color: inherit;
}

.level-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.level-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.level-card h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 8px;
  min-height: 1.3em;
}

.level-card p {
  color: #666;
  margin-bottom: 20px;
  min-height: 1.6em;
}

.level-lessons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.lesson-tag {
  background: #f5f5f5;
  color: #666;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.85rem;
}

@media (max-width: 1024px) {
  .levels {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }

  .level-card {
    padding: 25px;
  }
}

@media (max-width: 768px) {
  .stage-view {
    padding: 30px 15px;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .page-header p {
    font-size: 1rem;
  }

  .levels {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .level-card {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .stage-view {
    padding: 20px 12px;
  }

  .page-header {
    margin-bottom: 30px;
  }

  .page-header h1 {
    font-size: 1.5rem;
  }

  .level-icon {
    font-size: 2.5rem;
  }

  .level-card h3 {
    font-size: 1.1rem;
  }

  .lesson-tag {
    font-size: 0.75rem;
    padding: 3px 8px;
  }

  /* 触控优化：返回按钮 */
  .back-btn {
    padding: 12px 24px;
    min-height: var(--touch-target-min);
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
</style>
