<template>
  <!-- 验证弹窗遮罩层 -->
  <Transition name="fade">
    <div v-if="show" class="auth-overlay" @click.self="handleOverlayClick">
      <!-- 弹窗主体 -->
      <Transition name="pop">
        <div v-if="show" class="auth-modal" :class="{ 'shake': isShaking }">
          <!-- 神秘图标 -->
          <div class="auth-icon">
            <span class="icon-emoji">🔐</span>
          </div>

          <!-- 提示文案 -->
          <h2 class="auth-title">请和老师核对暗号</h2>
          <p class="auth-subtitle">输入老师告诉你的专属口令</p>

          <!-- 输入框 -->
          <div class="auth-input-wrapper">
            <input
              ref="inputRef"
              v-model="inputKey"
              type="text"
              class="auth-input"
              :class="{ 'error': authError }"
              placeholder="请输入暗号..."
              @keyup.enter="handleConfirm"
              @input="clearError"
            />
            <Transition name="shake">
              <span v-if="authError" class="error-message">{{ authError }}</span>
            </Transition>
          </div>

          <!-- 确定按钮 -->
          <button class="auth-button" @click="handleConfirm" :disabled="!inputKey.trim()">
            确定
          </button>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useAuth } from '@/composables/useAuth.js'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['success'])

const { authenticate, authError, clearError } = useAuth()

const inputKey = ref('')
const inputRef = ref(null)
const isShaking = ref(false)

// 弹窗显示时自动聚焦
watch(() => props.show, (newVal) => {
  if (newVal) {
    nextTick(() => {
      inputRef.value?.focus()
    })
  } else {
    inputKey.value = ''
  }
})

// 处理确认
const handleConfirm = () => {
  if (!inputKey.value.trim()) return

  const success = authenticate(inputKey.value)

  if (success) {
    emit('success')
  } else {
    // 抖动效果
    isShaking.value = true
    setTimeout(() => {
      isShaking.value = false
    }, 500)
  }
}

// 点击遮罩层（不做任何操作，必须输入正确口令）
const handleOverlayClick = () => {
  // 抖动提示
  isShaking.value = true
  setTimeout(() => {
    isShaking.value = false
  }, 500)
}
</script>

<style scoped>
/* 遮罩层 */
.auth-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* 弹窗主体 */
.auth-modal {
  background: rgba(255, 255, 255, 0.95);
  border-radius: var(--radius-lg);
  padding: 40px 50px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 10000;
}

/* 神秘图标 */
.auth-icon {
  margin-bottom: 20px;
}

.icon-emoji {
  font-size: 60px;
  display: inline-block;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* 标题 */
.auth-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 8px;
}

.auth-subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
}

/* 输入框 */
.auth-input-wrapper {
  margin-bottom: 24px;
  position: relative;
}

.auth-input {
  width: 100%;
  padding: 14px 20px;
  font-size: 18px;
  border: 2px solid #e0e0e0;
  border-radius: var(--radius-pill);
  outline: none;
  transition: all 0.3s ease;
  text-align: center;
  letter-spacing: 2px;
}

.auth-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(255, 159, 0, 0.2);
}

.auth-input.error {
  border-color: var(--danger-color);
  animation: shake 0.5s ease;
}

.auth-input::placeholder {
  color: #aaa;
  letter-spacing: 0;
}

/* 错误提示 */
.error-message {
  display: block;
  color: var(--danger-color);
  font-size: 14px;
  margin-top: 8px;
}

/* 确定按钮 */
.auth-button {
  width: 100%;
  padding: 14px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, var(--primary-color), #ffb347);
  border: none;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: all 0.3s ease;
}

.auth-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(255, 159, 0, 0.4);
}

.auth-button:active:not(:disabled) {
  transform: translateY(0);
}

.auth-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 抖动动画 */
.shake {
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  60% { transform: translateX(-10px); }
  80% { transform: translateX(10px); }
}

/* 淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 弹出动画 */
.pop-enter-active {
  animation: popIn 0.3s ease;
}

.pop-leave-active {
  animation: popOut 0.2s ease;
}

@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes popOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
}

/* 响应式 */
@media (max-width: 480px) {
  .auth-modal {
    padding: 30px 25px;
    margin: 0 20px;
  }

  .auth-title {
    font-size: 20px;
  }

  .icon-emoji {
    font-size: 50px;
  }
}
</style>
