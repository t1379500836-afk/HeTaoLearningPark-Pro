<template>
  <div class="practice-view">
    <section class="page-header">
      <h1>课后练习</h1>
      <p>每日一练，巩固所学知识</p>
    </section>

    <section class="practice-content">
      <div class="placeholder">
        <p>课后练习模块开发中...</p>
        <router-link :to="prefixedPath('/levels')" class="btn">去课程体系</router-link>
      </div>
    </section>
  </div>
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
.practice-view {
  min-height: 100vh;
  padding: 40px 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.page-header p {
  font-size: 1.1rem;
  color: #666;
}

.practice-content {
  max-width: 800px;
  margin: 0 auto;
}

.placeholder {
  background: #fff;
  border-radius: 12px;
  padding: 60px 20px;
  text-align: center;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.placeholder p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
}

.btn {
  display: inline-block;
  background: var(--primary-color);
  color: #fff;
  padding: 12px 30px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s;
}

.btn:hover {
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }
}
</style>
