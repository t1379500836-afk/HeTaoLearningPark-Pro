<template>
  <div class="library-view">
    <div class="tab-bar">
      <button
        :class="['tab-btn', { active: activeTab === 'questions' }]"
        @click="activeTab = 'questions'"
      >
        <el-icon><Document /></el-icon>
        题目管理
      </button>
      <button
        :class="['tab-btn', { active: activeTab === 'tags' }]"
        @click="activeTab = 'tags'"
      >
        <el-icon><Collection /></el-icon>
        标签管理
      </button>
    </div>

    <div class="tab-content">
      <QuestionsView v-if="activeTab === 'questions'" />
      <TagsView v-if="activeTab === 'tags'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import QuestionsView from './QuestionsView.vue'
import TagsView from './TagsView.vue'

const activeTab = ref('questions')
</script>

<style scoped>
.library-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tab-bar {
  display: flex;
  gap: 8px;
  background: #fff;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  background: #f5f5f5;
  color: #333;
}

.tab-btn.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
}

.tab-content {
  min-height: 0;
}

@media (max-width: 768px) {
  .tab-btn {
    flex: 1;
    justify-content: center;
    padding: 10px 12px;
    font-size: 13px;
  }
}
</style>
