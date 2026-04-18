<template>
  <el-popover :width="320" trigger="click" placement="top">
    <template #reference>
      <el-button size="small">😊 表情</el-button>
    </template>
    <div class="emoji-grid">
      <span
        v-for="emoji in emojis"
        :key="emoji"
        class="emoji-item"
        @click="$emit('select', emoji)"
      >{{ emoji }}</span>
    </div>
  </el-popover>
</template>

<script setup>
defineEmits(['select'])

const emojis = [
  '😊','😂','🥰','😎','🤔','😴','😱','🤗',
  '😢','😤','🤣','😍','🥺','😋','🤩','😇',
  '👍','👎','👏','🙌','💪','🤝','✌️','🤞',
  '❤️','💕','💖','⭐','🌟','✨','🔥','💯',
  '🎉','🎊','🌈','☀️','🌙','⚡','🍀','🌸',
  '🎵','🎶','🐱','🐶','🐼','🦊','🐸','🐰',
  '🦄','🐝','🎈','🎁','🏆','🎯','📚','💻'
]
</script>

<style scoped>
.emoji-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 2px;
}

.emoji-item {
  font-size: 1.3rem;
  text-align: center;
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.15s;
}

.emoji-item:hover {
  background: #f0f0f0;
}
</style>
