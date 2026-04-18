<template>
  <div class="messages-view">
    <!-- 教师寄语：公告栏布局 -->
    <section class="bulletin-section">
      <h2 class="section-title">💌 教师寄语</h2>

      <div class="bulletin-layout">
        <!-- 左侧标题列表 -->
        <div class="bulletin-sidebar">
          <div v-if="isLoading && !teacherMessages.length" class="sidebar-loading">
            <div class="mini-spinner"></div>
            <span>加载中...</span>
          </div>
          <div v-else-if="!teacherMessages.length" class="sidebar-empty">
            暂无寄语
          </div>
          <ul v-else class="msg-list">
            <li
              v-for="(msg, index) in teacherMessages"
              :key="msg.id"
              class="msg-item"
              :class="{ active: selectedIdx === index }"
              @click="selectedIdx = index"
            >
              <span class="msg-item-title">{{ msg.title || '无标题' }}</span>
              <span class="msg-item-date">{{ formatTime(msg.createdAt) }}</span>
            </li>
          </ul>
        </div>

        <!-- 右侧正文 -->
        <div class="bulletin-content">
          <div v-if="!teacherMessages.length" class="content-empty">
            <span class="empty-icon">📭</span>
            <p>老师还没有发布寄语哦~</p>
          </div>
          <template v-else-if="currentMsg">
            <div class="content-header">
              <h3 class="content-title">{{ currentMsg.title || '无标题' }}</h3>
              <span class="content-date">{{ formatTime(currentMsg.createdAt) }}</span>
            </div>
            <div class="content-body">{{ currentMsg.content }}</div>
            <div class="content-footer">
              <span class="content-author">—— {{ teacherName }}</span>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- 匿名悄悄话 -->
    <section class="whisper-section">
      <h2 class="section-title">🤫 匿名悄悄话</h2>
      <p class="whisper-tip">💡 有什么想对老师说的话、不好意思开口的小心愿，或者任何建议，都可以悄悄告诉老师哦～记得文明发言，做礼貌的好孩子！</p>
      <div class="whisper-form">
        <textarea
          v-model="whisperContent"
          class="whisper-textarea"
          placeholder="想对老师说什么呢？匿名发送~"
          maxlength="500"
          rows="3"
        ></textarea>
        <div class="whisper-actions">
          <EmojiPicker @select="insertEmoji" />
          <span class="char-count">{{ whisperContent.length }}/500</span>
          <button
            class="btn btn-send"
            :disabled="!whisperContent.trim() || submitStatus === 'submitting'"
            @click="handleSubmit"
          >
            {{ submitStatus === 'submitting' ? '发送中...' : '发送悄悄话 💌' }}
          </button>
        </div>
        <p v-if="submitStatus?.error" class="status-hint error">{{ submitStatus.error }}</p>
        <p v-if="submitStatus === 'success'" class="status-hint success">✅ 发送成功！老师会看到你的悄悄话</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMessages } from '@/composables/useMessages.js'
import { useAuth } from '@/composables/useAuth.js'
import { getTeacherInfo } from '@/config/messages.config.js'
import EmojiPicker from '@/components/shared/EmojiPicker.vue'

const {
  teacherMessages,
  isLoading,
  submitStatus,
  loadStatic,
  fetchFresh,
  submitWhisper,
  formatTime
} = useMessages()

const { teacherKey } = useAuth()
const teacherName = computed(() => {
  const info = getTeacherInfo(teacherKey.value)
  return info.teacherName || ''
})

const selectedIdx = ref(0)
const whisperContent = ref('')

const currentMsg = computed(() => teacherMessages.value[selectedIdx.value] || null)

function insertEmoji(emoji) {
  whisperContent.value += emoji
}

async function handleSubmit() {
  const ok = await submitWhisper(whisperContent.value)
  if (ok) whisperContent.value = ''
}

onMounted(() => {
  loadStatic()
  fetchFresh()
})
</script>

<style scoped>
.messages-view {
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 20px 60px;
  min-height: 100vh;
}

.section-title {
  font-size: 1.5rem;
  color: #333;
  margin: 0 0 20px;
}

/* ===== 公告栏布局 ===== */
.bulletin-layout {
  display: flex;
  background: #fff;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  min-height: 420px;
}

.bulletin-sidebar {
  width: 240px;
  flex-shrink: 0;
  border-right: 1px solid #f0f0f0;
  overflow-y: auto;
  max-height: 500px;
}

.sidebar-loading,
.sidebar-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 200px;
  color: #aaa;
  font-size: 0.95rem;
  gap: 8px;
}

.msg-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.msg-item {
  padding: 16px 18px;
  cursor: pointer;
  border-bottom: 1px solid #f5f5f5;
  transition: background 0.15s;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.msg-item:hover {
  background: #fafafa;
}

.msg-item.active {
  background: linear-gradient(135deg, #fff8ed 0%, #fff 100%);
  border-left: 3px solid var(--primary-color);
}

.msg-item-title {
  font-size: 0.95rem;
  color: #333;
  line-height: 1.4;
  font-weight: 500;
}

.msg-item.active .msg-item-title {
  color: var(--primary-color);
}

.msg-item-date {
  font-size: 0.8rem;
  color: #aaa;
}

/* 右侧正文 */
.bulletin-content {
  flex: 1;
  padding: 30px 32px;
  display: flex;
  flex-direction: column;
  max-height: 500px;
  overflow-y: auto;
}

.content-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #bbb;
  gap: 12px;
}

.empty-icon {
  font-size: 3rem;
}

.content-empty p {
  margin: 0;
  font-size: 0.95rem;
}

.content-header {
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.content-title {
  margin: 0 0 6px;
  font-size: 1.2rem;
  color: #333;
  font-weight: 600;
}

.content-date {
  font-size: 0.85rem;
  color: #aaa;
}

.content-body {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  white-space: pre-wrap;
  word-break: break-word;
  flex: 1;
}

.content-footer {
  text-align: right;
  margin-top: 16px;
  padding-top: 12px;
}

.content-author {
  font-size: 0.9rem;
  color: #999;
  font-style: italic;
}

/* ===== 悄悄话 ===== */
.whisper-section {
  margin-top: 50px;
}

.whisper-tip {
  margin: 0 0 16px;
  padding: 10px 16px;
  background: linear-gradient(135deg, #f0f2ff, #faf0ff);
  border-radius: var(--radius-md);
  font-size: 0.88rem;
  color: #7c6ee8;
  line-height: 1.5;
}

.whisper-form {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 24px 28px;
  box-shadow: var(--shadow-sm);
}

.whisper-textarea {
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e8e8e8;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-family: var(--font-main);
  resize: vertical;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.whisper-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.whisper-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}

.char-count {
  color: #bbb;
  font-size: 0.85rem;
  margin-left: auto;
}

.btn {
  padding: 10px 22px;
  border: none;
  border-radius: var(--radius-pill);
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  min-height: var(--touch-target-min);
  display: inline-flex;
  align-items: center;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-send {
  background: var(--primary-color);
  color: #fff;
}

.btn-send:hover:not(:disabled) {
  background: #e89200;
}

.status-hint {
  font-size: 0.9rem;
  margin: 10px 0 0;
}

.status-hint.error { color: var(--danger-color); }
.status-hint.success { color: var(--success-color); }

.mini-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid #e0e0e0;
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .messages-view {
    padding: 30px 20px 40px;
  }

  .bulletin-layout {
    flex-direction: column;
    min-height: auto;
  }

  .bulletin-sidebar {
    width: 100%;
    max-height: 160px;
    border-right: none;
    border-bottom: 1px solid #f0f0f0;
  }

  .bulletin-content {
    padding: 20px 18px;
    min-height: 280px;
  }

  .section-title {
    font-size: 1.3rem;
  }

  .msg-item {
    padding: 10px 14px;
  }

  .whisper-form {
    padding: 18px;
  }
}

@media (max-width: 480px) {
  .messages-view {
    padding: 20px 12px 30px;
  }

  .section-title {
    font-size: 1.15rem;
  }

  .bulletin-sidebar {
    max-height: 130px;
  }

  .msg-item {
    padding: 8px 14px;
  }

  .bulletin-content {
    padding: 16px 14px;
    min-height: 240px;
  }

  .content-body {
    font-size: 1rem;
  }

  .whisper-form {
    padding: 14px;
  }

  .whisper-textarea {
    padding: 10px 14px;
  }

  .whisper-actions {
    flex-wrap: wrap;
  }

  .btn-send {
    width: 100%;
    justify-content: center;
  }
}
</style>
