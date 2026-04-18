<template>
  <div id="app">
    <!-- 404 页面不显示页头页脚 -->
    <template v-if="!is404Page">
      <Navigation />
    </template>
    <main class="main-content" :class="{ 'full-page': is404Page }">
      <RouterView />
    </main>
    <template v-if="!is404Page">
      <Footer />
    </template>
    <!-- 口令验证弹窗（404 页面不需要验证） -->
    <AuthModal :show="needAuth && !is404Page" @success="onAuthSuccess" />
    <!-- 彩带庆祝动画（独立于弹窗） -->
    <CelebrationEffect :show="showCelebration" />
  </div>
</template>

<script setup>
import Navigation from './components/shared/Navigation.vue'
import Footer from './components/shared/Footer.vue'
import AuthModal from './components/shared/AuthModal.vue'
import CelebrationEffect from './components/shared/CelebrationEffect.vue'
import { useAuth } from './composables/useAuth.js'
import { useDauTracker } from './composables/useDauTracker.js'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 检测是否是 404 页面（通过路由名称或 meta 判断）
const is404Page = computed(() => route.name === 'not-found' || route.meta?.is404 === true)

const { needAuth, teacherName } = useAuth()

useDauTracker()

const showCelebration = ref(false)

// 验证成功回调
const onAuthSuccess = () => {
  // 显示彩带动画
  showCelebration.value = true
  console.log(`欢迎，${teacherName.value}的班级！`)

  // 4秒后隐藏彩带
  setTimeout(() => {
    showCelebration.value = false
  }, 4000)
}
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

main.full-page {
  /* 404 页面占满整个视口 */
  min-height: 100vh;
}
</style>
