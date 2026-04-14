<template>
  <Transition name="fade">
    <div v-if="show" class="celebration-container">
      <!-- 彩带 -->
      <div
        v-for="(confetti, index) in confettiList"
        :key="'c' + index"
        class="confetti"
        :class="confetti.shape"
        :style="confetti.style"
      ></div>
      <!-- 闪光粒子 -->
      <div
        v-for="(sparkle, index) in sparkleList"
        :key="'s' + index"
        class="sparkle"
        :style="sparkle.style"
      >✨</div>
      <!-- 星星 -->
      <div
        v-for="(star, index) in starList"
        :key="'st' + index"
        class="star"
        :style="star.style"
      >⭐</div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

// 彩带颜色 - 丰富的渐变色
const confettiColors = [
  '#ff9f00', '#ffb347', '#ffd700',           // 金色系
  '#ff6b6b', '#ff8e8e', '#ff4757',           // 红色系
  '#4facfe', '#00f2fe', '#00d4ff',           // 蓝色系
  '#2ecc71', '#00ff88', '#7bed9f',           // 绿色系
  '#9b59b6', '#a55eea', '#d980fa',           // 紫色系
  '#f1c40f', '#ffeaa7', '#fdcb6e',           // 黄色系
  '#ff7675', '#fd79a8', '#e84393',           // 粉色系
]

// 彩带形状
const confettiShapes = ['square', 'rectangle', 'circle', 'ribbon', 'triangle']

// 生成彩带数据
const confettiList = computed(() => {
  return Array.from({ length: 120 }, (_, i) => {
    const color = confettiColors[Math.floor(Math.random() * confettiColors.length)]
    const shape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)]
    const left = Math.random() * 100
    const delay = Math.random() * 1.5
    const duration = 2 + Math.random() * 2
    const size = 8 + Math.random() * 10
    const swingAmplitude = 30 + Math.random() * 50  // 摇摆幅度

    return {
      shape,
      style: {
        left: `${left}%`,
        backgroundColor: shape === 'triangle' ? 'transparent' : color,
        color: color,  // 三角形边框色
        width: shape === 'ribbon' ? `${size * 0.4}px` : shape === 'rectangle' ? `${size * 1.5}px` : `${size}px`,
        height: shape === 'ribbon' ? `${size * 2}px` : shape === 'rectangle' ? `${size}px` : `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        '--swing-amplitude': `${swingAmplitude}px`,
      }
    }
  })
})

// 闪光粒子数据
const sparkleList = computed(() => {
  return Array.from({ length: 30 }, (_, i) => {
    const left = Math.random() * 100
    const delay = Math.random() * 2
    const duration = 1.5 + Math.random() * 1.5
    const size = 16 + Math.random() * 16

    return {
      style: {
        left: `${left}%`,
        fontSize: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }
    }
  })
})

// 星星数据
const starList = computed(() => {
  return Array.from({ length: 15 }, (_, i) => {
    const left = Math.random() * 100
    const delay = Math.random() * 2.5
    const duration = 2 + Math.random() * 2
    const size = 20 + Math.random() * 20

    return {
      style: {
        left: `${left}%`,
        fontSize: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }
    }
  })
})
</script>

<style scoped>
/* 彩带特效容器 */
.celebration-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10001;
  overflow: hidden;
}

/* 彩带基础样式 */
.confetti {
  position: absolute;
  top: -20px;
  animation: confettiFall linear forwards;
}

/* 形状变体 */
.confetti.square {
  border-radius: 2px;
}

.confetti.rectangle {
  border-radius: 3px;
}

.confetti.circle {
  border-radius: 50%;
}

.confetti.ribbon {
  border-radius: 1px;
  box-shadow: 0 0 3px currentColor;
}

.confetti.triangle {
  width: 0 !important;
  height: 0 !important;
  background: transparent !important;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 12px solid currentColor;
}

/* 彩带飘落动画 - 带摇摆效果 */
@keyframes confettiFall {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg) scale(1);
    opacity: 1;
  }
  25% {
    transform: translateY(25vh) translateX(calc(var(--swing-amplitude) * 1)) rotate(180deg) scale(0.9);
    opacity: 1;
  }
  50% {
    transform: translateY(50vh) translateX(calc(var(--swing-amplitude) * -1)) rotate(360deg) scale(1);
    opacity: 0.9;
  }
  75% {
    transform: translateY(75vh) translateX(calc(var(--swing-amplitude) * 0.5)) rotate(540deg) scale(0.9);
    opacity: 0.8;
  }
  100% {
    transform: translateY(105vh) translateX(calc(var(--swing-amplitude) * -0.5)) rotate(720deg) scale(0.8);
    opacity: 0;
  }
}

/* 闪光粒子 */
.sparkle {
  position: absolute;
  top: -30px;
  animation: sparkleFall linear forwards;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.8));
}

@keyframes sparkleFall {
  0% {
    transform: translateY(0) rotate(0deg) scale(0);
    opacity: 0;
  }
  10% {
    transform: translateY(10vh) rotate(36deg) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateY(50vh) rotate(180deg) scale(1.2);
    opacity: 1;
  }
  90% {
    transform: translateY(90vh) rotate(324deg) scale(1);
    opacity: 0.8;
  }
  100% {
    transform: translateY(105vh) rotate(360deg) scale(0);
    opacity: 0;
  }
}

/* 星星 */
.star {
  position: absolute;
  top: -40px;
  animation: starFall linear forwards;
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6));
}

@keyframes starFall {
  0% {
    transform: translateY(0) rotate(0deg) scale(0.5);
    opacity: 0;
  }
  15% {
    transform: translateY(15vh) rotate(72deg) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateY(50vh) rotate(180deg) scale(1.3);
    opacity: 1;
  }
  85% {
    transform: translateY(85vh) rotate(288deg) scale(1);
    opacity: 0.7;
  }
  100% {
    transform: translateY(105vh) rotate(360deg) scale(0.5);
    opacity: 0;
  }
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
</style>
