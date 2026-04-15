<template>
  <section class="hero" id="home">
    <!-- 个性化标题 -->
    <h1 v-if="isAuthenticated && teacherName" class="hero-title-custom">
      <span class="title-decor title-decor-left">
        <i></i><i></i><i></i>
      </span>
      <span class="title-main">{{ teacherName }}班级</span>
      <span class="title-divider">·</span>
      <span class="title-sub">专属编程探索之旅</span>
      <span class="title-decor title-decor-right">
        <i></i><i></i><i></i>
      </span>
    </h1>
    <!-- 默认标题 -->
    <h1 v-else>{{ heroTitle }}</h1>
    <p>课前预习 · 课后复习 · 趣味打字 · 在线编程 · YCL考级冲刺</p>
    <router-link :to="prefixedPath('/levels')" class="cta-btn">开始学习</router-link>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getCurrentPrefix, prefixedPath as buildPrefixedPath } from '@/composables/useRoutePrefix.js'
import { useAuth } from '@/composables/useAuth.js'

const route = useRoute()
const { teacherName, isAuthenticated } = useAuth()

// 获取当前路由前缀
const prefix = computed(() => getCurrentPrefix(route))

// 生成带前缀的路径
function prefixedPath(path) {
  return buildPrefixedPath(prefix.value, path)
}

// 个性化标题
const heroTitle = computed(() => {
  if (isAuthenticated.value && teacherName.value) {
    return `${teacherName.value}班级专属编程探索之旅`
  }
  return '开启孩子的编程探索之旅'
})
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--primary-color) 0%, #ff6b6b 100%);
  color: white;
  padding: 4rem 20px;
  text-align: center;
  border-radius: 0 0 50% 50% / 40px;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

/* 个性化标题样式 - 横向布局 */
.hero-title-custom {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0 0.3em;
  margin-bottom: 1rem;
}

.title-main {
  font-weight: 700;
}

.title-divider {
  opacity: 0.6;
  margin: 0 0.1em;
  font-weight: 300;
}

.title-sub {
  font-weight: 400;
  opacity: 0.92;
}

/* 动态彩色气泡装饰 */
.title-decor {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin: 0 8px;
}

.title-decor i {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  font-style: normal;
  animation: float 2s ease-in-out infinite;
}

.title-decor-left i:nth-child(1) { background: #ff6b6b; animation-delay: 0s; }
.title-decor-left i:nth-child(2) { background: #ffd93d; animation-delay: 0.3s; }
.title-decor-left i:nth-child(3) { background: #6bcb77; animation-delay: 0.6s; }

.title-decor-right i:nth-child(1) { background: #4d96ff; animation-delay: 0.2s; }
.title-decor-right i:nth-child(2) { background: #9b59b6; animation-delay: 0.5s; }
.title-decor-right i:nth-child(3) { background: #ff9f43; animation-delay: 0.8s; }

@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.9;
  }
  50% {
    transform: translateY(-6px) scale(1.15);
    opacity: 1;
  }
}

.hero p {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  opacity: 0.9;
}

.cta-btn {
  display: inline-block;
  background-color: white;
  color: var(--primary-color);
  padding: 12px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transition: transform 0.2s;
}

.cta-btn:hover {
  transform: translateY(-3px);
}

/* Responsive */
@media (max-width: 1024px) {
  .hero h1 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 3rem 20px;
    border-radius: 0 0 30% 30% / 30px;
  }

  .hero h1 {
    font-size: 1.8rem;
  }

  .hero p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .hero h1 {
    font-size: 1.5rem;
  }

  .hero p {
    font-size: 0.9rem;
  }

  .cta-btn {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}
</style>
