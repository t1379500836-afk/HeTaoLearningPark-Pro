<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="logo">
        <img src="@/assets/images/hetao-logo.png" alt="核桃编程Logo" class="logo-img">
        <span style="color: #fff;">核桃Python学习站</span>
      </div>
      <p class="slogan">让每个孩子爱上编程，在快乐中成长。</p>
      <div class="footer-links">
        <a href="#">关于我们</a>
        <a href="#levels">课程介绍</a>
        <a href="#practice">练习题库</a>
        <router-link :to="prefixedPath('/contact')">联系作者</router-link>
      </div>
      <p class="copyright">@核桃编程成都基地Python10组版权所有，禁止转发使用</p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getCurrentPrefix, prefixedPath as buildPrefixedPath } from '@/composables/useRoutePrefix.js'

const route = useRoute()
const prefix = computed(() => getCurrentPrefix(route))

function prefixedPath(path) {
  return buildPrefixedPath(prefix.value, path)
}
</script>

<style scoped>
.footer {
  background-color: #333;
  color: #fff;
  padding: 40px 20px;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: bold;
}

.logo-img {
  height: 40px;
  width: 40px;
  display: block;
  object-fit: cover;
  object-position: center left;
  margin-right: 2px;
  margin-top: 3px;
}

.slogan {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 20px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.footer-links a {
  color: #aaa;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #fff;
}

.copyright {
  font-size: 0.8rem;
  color: #666;
  margin-top: 20px;
}

/* Responsive */
@media (max-width: 768px) {
  .footer {
    padding: 30px 20px;
  }

  .footer-links {
    gap: 15px;
  }

  .footer-links a {
    font-size: 0.9rem;
  }
}

/* 480px断点：小屏幕优化 */
@media (max-width: 480px) {
  .logo {
    font-size: 1.2rem;
  }

  .logo-img {
    height: 32px;
    width: 32px;
    margin-right: 0;
  }

  .slogan {
    font-size: 0.9rem;
  }
}
</style>
