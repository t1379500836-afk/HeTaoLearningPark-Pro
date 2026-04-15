<template>
  <div class="level-view">
    <!-- 悬浮返回按钮 -->
    <button class="floating-back-btn" @click="goBack" aria-label="返回上一页">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>

    <section class="page-header">
      <div class="breadcrumb">
        <router-link :to="prefixedPath('/levels')">课程体系</router-link>
        <span class="separator">/</span>
        <router-link :to="prefixedPath(`/levels/${stage}`)">{{ stageInfo.name }}</router-link>
        <span class="separator">/</span>
        <span class="current">{{ levelInfo.name }}</span>
      </div>
      <h1>{{ levelInfo.name }}</h1>
      <p>{{ levelInfo.description }}</p>
    </section>

    <section class="lessons">
      <router-link
        v-for="lesson in lessons"
        :key="lesson.id"
        :to="prefixedPath(`/lesson/${stage}/${level}/${lesson.id}`)"
        class="lesson-card"
      >
        <div class="lesson-number">{{ lesson.id }}</div>
        <h3>{{ lesson.title }}</h3>
        <p>{{ lesson.description }}</p>
        <div class="lesson-meta">
          <span class="meta-item">📖 知识点</span>
          <span class="meta-item">⌨️ 打字练习</span>
          <span class="meta-item">✏️ 课后习题</span>
        </div>
      </router-link>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getStageName, getUnitInfo, lessonConfig } from '@/config/courses.config.js'
import { getCurrentPrefix, prefixedPath as buildPrefixedPath } from '@/composables/useRoutePrefix.js'

const route = useRoute()
const router = useRouter()
const stage = computed(() => route.params.stage)
const level = computed(() => route.params.unit)

// 获取当前路由前缀
const prefix = computed(() => getCurrentPrefix(route))

// 直接从静态配置获取课程卡片数据，无需动态 import
const lessons = computed(() => {
  return ['1', '2', '3', '4'].map(num => {
    const id = `${level.value}-${num}`
    const config = lessonConfig[id]
    return {
      id,
      title: config?.title || `课时 ${num}`,
      description: config?.subtitle || '知识点讲解、打字练习与课后习题'
    }
  })
})

const stageInfo = computed(() => ({ name: getStageName(stage.value) }))
const levelInfo = computed(() => getUnitInfo(level.value))

// 生成带前缀的路径
function prefixedPath(path) {
  return buildPrefixedPath(prefix.value, path)
}

// 返回上一页
const goBack = () => {
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

.level-view {
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

.lessons {
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  gap: 20px;
}

.lesson-card {
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
}

.lesson-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
}

.lesson-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 10px;
}

.lesson-card h3 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 8px;
  min-height: 1.2em;
}

.lesson-card p {
  color: #666;
  margin-bottom: 15px;
  min-height: 1.6em;
}

.lesson-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: auto;
}

.meta-item {
  background: #f5f5f5;
  color: #666;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
}

@media (max-width: 1024px) {
  .lesson-card {
    padding: 22px;
  }
}

@media (max-width: 768px) {
  .level-view {
    padding: 30px 15px;
  }

  .page-header {
    margin-bottom: 40px;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .page-header p {
    font-size: 1rem;
  }

  .lesson-card {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .level-view {
    padding: 20px 12px;
  }

  .page-header {
    margin-bottom: 30px;
  }

  .page-header h1 {
    font-size: 1.5rem;
  }

  .page-header p {
    font-size: 0.9rem;
  }

  .lesson-card {
    padding: 18px;
  }

  .lesson-number {
    font-size: 1.3rem;
  }

  .lesson-card h3 {
    font-size: 1.1rem;
  }

  .lesson-card p {
    font-size: 0.9rem;
  }

  .meta-item {
    font-size: 0.75rem;
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
</style>
