<template>
  <div class="stage-locked">
    <div class="locked-icon">🔒</div>
    <h2>课程未解锁</h2>
    <p>{{ message }}</p>
    <button @click="goBack" class="back-btn">
      返回
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  stageName: {
    type: String,
    default: '此课程'
  }
})

const router = useRouter()
const route = useRoute()

const message = computed(() => {
  return `您当前的学习阶段尚未解锁${props.stageName}，下阶段报名之后自动解锁哟~`
})

function goBack() {
  router.back()
}
</script>

<style scoped>
.stage-locked {
  text-align: center;
  padding: 80px 20px;
  max-width: 600px;
  margin: 40px auto;
}

.locked-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.stage-locked h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 15px;
}

.stage-locked p {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
}

.back-btn {
  background: var(--primary-color);
  color: #fff;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: opacity 0.3s;
}

.back-btn:hover {
  opacity: 0.9;
}
</style>
