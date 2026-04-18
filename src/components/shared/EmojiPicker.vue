<template>
  <div class="emoji-picker" ref="pickerRef">
    <button
      type="button"
      class="emoji-trigger"
      :class="{ active: showPicker }"
      @click="showPicker = !showPicker"
      :title="showPicker ? '收起表情' : '选择表情'"
    >
      😊
    </button>
    <Transition name="fade">
      <div v-if="showPicker" class="emoji-panel">
        <div class="emoji-grid">
          <button
            v-for="emoji in emojis"
            :key="emoji"
            type="button"
            class="emoji-btn"
            @click="selectEmoji(emoji)"
          >
            {{ emoji }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['select'])

const showPicker = ref(false)
const pickerRef = ref(null)

const emojis = [
  '😊','😂','🥰','😎','🤔','😴','😱','🤗',
  '😢','😤','🤣','😍','🥺','😋','🤩','😇',
  '👍','👎','👏','🙌','💪','🤝','✌️','🤞',
  '❤️','💕','💖','⭐','🌟','✨','🔥','💯',
  '🎉','🎊','🌈','☀️','🌙','⚡','🍀','🌸',
  '🎵','🎶','🐱','🐶','🐼','🦊','🐸','🐰',
  '🦄','🐝','🎈','🎁','🏆','🎯','📚','💻'
]

function selectEmoji(emoji) {
  emit('select', emoji)
}

function handleClickOutside(e) {
  if (pickerRef.value && !pickerRef.value.contains(e.target)) {
    showPicker.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
.emoji-picker {
  position: relative;
  display: inline-block;
}

.emoji-trigger {
  background: none;
  border: 2px solid #e0e0e0;
  border-radius: var(--radius-md);
  font-size: 1.4rem;
  cursor: pointer;
  padding: 6px 10px;
  min-width: var(--touch-target-min);
  min-height: var(--touch-target-min);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s;
}

.emoji-trigger:hover,
.emoji-trigger.active {
  border-color: var(--primary-color);
}

.emoji-panel {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  background: #fff;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: 10px;
  z-index: 100;
  width: auto;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 2px;
}

.emoji-btn {
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  padding: 4px;
  border-radius: var(--radius-sm);
  min-width: var(--touch-target-min);
  min-height: var(--touch-target-min);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}

.emoji-btn:hover {
  background: #f0f0f0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

@media (max-width: 768px) {
  .emoji-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (max-width: 480px) {
  .emoji-panel {
    padding: 8px;
  }

  .emoji-grid {
    grid-template-columns: repeat(5, 1fr);
  }

  .emoji-btn {
    font-size: 1.1rem;
    padding: 2px;
  }
}
</style>
