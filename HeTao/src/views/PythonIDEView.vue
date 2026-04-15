<template>
  <div class="python-ide-view">
    <section class="page-header">
      <h1>Python 在线编辑器</h1>
      <p>在线编写和运行 Python 代码，支持标准库</p>
    </section>

    <CodeEditor />
  </div>
</template>

<script setup>
import CodeEditor from '@/components/course/CodeEditor.vue'
</script>

<style scoped>
.python-ide-view {
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

/* Responsive */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }
}
</style>
