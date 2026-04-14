<template>
  <span :class="badgeClass" class="difficulty-badge">
    {{ emoji }} {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  level: {
    type: String,
    default: 'easy',
    validator: (value) => ['easy', 'medium', 'hard'].includes(value)
  }
})

const config = {
  easy: { emoji: '🟢', label: '基础' },
  medium: { emoji: '🟡', label: '进阶' },
  hard: { emoji: '🔴', label: '挑战' }
}

const current = computed(() => config[props.level] || config.easy)
const emoji = computed(() => current.value.emoji)
const label = computed(() => current.value.label)
const badgeClass = computed(() => `level-${props.level}`)
</script>

<style scoped>
.difficulty-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.difficulty-badge.level-easy {
  background: #e8f5e9;
  color: #2e7d32;
}

.difficulty-badge.level-medium {
  background: #fff8e1;
  color: #f57f17;
}

.difficulty-badge.level-hard {
  background: #ffebee;
  color: #c62828;
}
</style>
