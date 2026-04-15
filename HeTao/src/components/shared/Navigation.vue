<template>
  <header class="header">
    <nav class="nav">
      <div class="logo">
        <router-link :to="prefixedPath('/')">
          <img src="@/assets/images/hetao-logo.png" alt="核桃编程" class="logo-img" />
        </router-link>
      </div>
      <div
        class="hamburger"
        :class="{ active: isMenuOpen }"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul class="nav-links" :class="{ active: isMenuOpen }">
        <li v-for="link in navLinks" :key="link.to">
          <router-link
            :to="prefixedPath(link.to)"
            :class="{ active: isActive(link.to) }"
            @click="handleNavClick"
          >
            {{ link.text }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getCurrentPrefix, prefixedPath as buildPrefixedPath } from '@/composables/useRoutePrefix.js'

const router = useRouter()
const route = useRoute()

// 获取当前路由前缀
const prefix = computed(() => getCurrentPrefix(route))

// 导航链接配置
const navLinks = [
  { to: '/', text: '首页' },
  { to: '/levels', text: '课程体系' },
  { to: '/practice', text: '练习题库' },
  { to: '/typing', text: '打字练习' },
  { to: '/python', text: 'Python IDE' },
  { to: '/ycl', text: 'YCL专区' }
]

// 状态管理
const isMenuOpen = ref(false)

// 生成带前缀的路径
function prefixedPath(path) {
  return buildPrefixedPath(prefix.value, path)
}

// 切换汉堡菜单
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// 处理导航点击
const handleNavClick = () => {
  isMenuOpen.value = false
}

// 判断当前路由是否激活
const isActive = (to) => {
  // 移除前缀后比较
  let pathWithoutPrefix = route.path
  if (prefix.value) {
    pathWithoutPrefix = pathWithoutPrefix.replace(`/${prefix.value}`, '') || '/'
  }

  if (to === '/') return pathWithoutPrefix === '/'
  return pathWithoutPrefix.startsWith(to)
}
</script>

<style scoped>
.header {
  background-color: #fff;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
}

.logo a {
  display: block;
  text-decoration: none;
}

.logo-img {
  height: 40px;
  width: auto;
  display: block;
}

.nav-links {
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  transition: all 0.3s;
  padding: 5px 10px;
  border-radius: 20px;
}

.nav-links a:hover,
.nav-links a.active {
  color: #fff;
  background-color: var(--primary-color);
}

/* Hamburger Menu */
.hamburger {
  display: none;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  z-index: 1001;
  /* 触控优化：确保点击区域至少44×44px */
  min-width: var(--touch-target-min);
  min-height: var(--touch-target-min);
  padding: 10px;
}

.hamburger span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: 3px;
  transition: all 0.3s;
}

/* Hamburger Animation */
.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 6px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -6px);
}

/* Responsive */
@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    height: 100vh;
    width: 55%;
    background-color: #fff;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: -5px 0 15px rgba(0,0,0,0.1);
    transition: right 0.3s ease-in-out;
    z-index: 999;
  }

  .nav-links.active {
    right: 0;
  }

  .hamburger {
    display: flex;
  }

  .nav-links li {
    margin: 10px 0;
  }

  .nav-links a {
    padding: 10px 20px;
    font-size: 1.1rem;
    /* 触控优化：确保点击区域足够 */
    min-height: var(--touch-target-min);
    display: flex;
    align-items: center;
  }
}

/* 480px断点：小屏幕优化 */
@media (max-width: 480px) {
  .nav {
    padding: 1rem 15px;
  }

  .logo-img {
    height: 32px;
  }

  .nav-links {
    width: 60%;
  }

  .nav-links a {
    padding: 12px 16px;
    font-size: 1rem;
  }
}
</style>
