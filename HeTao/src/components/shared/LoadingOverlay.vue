<template>
  <Transition name="fade">
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-content">
        <div class="spinner-wrapper">
          <div class="spinner"></div>
          <div class="spinner-inner"></div>
        </div>
        <p class="loading-text">{{ text }}</p>
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: '加载中...'
  }
})
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.spinner-wrapper {
  position: relative;
  width: 60px;
  height: 60px;
}

.spinner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 4px solid #f0f0f0;
  border-top-color: var(--primary-color, #ff9f00);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.spinner-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  background: var(--primary-color, #ff9f00);
  border-radius: 50%;
  animation: pulse 1.2s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(0.7);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

.loading-text {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
  font-weight: 500;
}

.loading-dots {
  display: flex;
  gap: 8px;
}

.loading-dots span {
  width: 10px;
  height: 10px;
  background: var(--primary-color, #ff9f00);
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite;
}

.loading-dots span:nth-child(1) {
  animation-delay: 0s;
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .spinner-wrapper {
    width: 50px;
    height: 50px;
  }

  .spinner-inner {
    width: 20px;
    height: 20px;
  }

  .loading-text {
    font-size: 1rem;
  }

  .loading-dots span {
    width: 8px;
    height: 8px;
  }
}
</style>
