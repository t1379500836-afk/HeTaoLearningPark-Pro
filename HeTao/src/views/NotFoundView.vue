<template>
  <div class="not-found">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1 class="error-title">页面不存在</h1>
      <p class="error-message">
        您访问的页面不存在，请检查地址是否正确。
      </p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.not-found-content {
  text-align: center;
  color: #fff;
}

.error-code {
  font-size: 10rem;
  font-weight: 700;
  line-height: 1;
  text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.error-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 15px;
}

.error-message {
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 480px) {
  .error-code {
    font-size: 6rem;
  }

  .error-title {
    font-size: 1.5rem;
  }

  .error-message {
    font-size: 1rem;
  }
}
</style>
