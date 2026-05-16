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

    <!-- 历史悄悄话悬浮球 -->
    <div class="history-float-btn" @click="openHistoryModal">
      <span class="float-icon">💬</span>
      <span class="float-text">查看悄悄话</span>
    </div>

    <!-- 历史悄悄话弹窗 -->
    <div v-if="historyModalVisible" class="history-modal-overlay" @click.self="closeHistoryModal">
      <div class="history-modal">
        <div class="history-modal-header">
          <h3 class="history-modal-title">💬 班级悄悄话</h3>
          <button class="modal-close" @click="closeHistoryModal">✕</button>
        </div>

        <!-- 筛选工具栏 -->
        <div class="history-modal-toolbar">
          <div class="date-range-btns">
            <button
              v-for="opt in dateRangeOpts"
              :key="opt.value"
              class="range-btn"
              :class="{ active: historyRange === opt.value }"
              @click="onHistoryRangeChange(opt.value)"
            >
              {{ opt.label }}
            </button>
          </div>
          <div v-if="historyRange === 'custom'" class="custom-dates">
            <input
              v-model="historyStartDate"
              type="date"
              class="date-input"
              :max="today"
              @change="loadHistoryWhispers"
            />
            <span>至</span>
            <input
              v-model="historyEndDate"
              type="date"
              class="date-input"
              :min="historyStartDate"
              :max="today"
              @change="loadHistoryWhispers"
            />
          </div>
        </div>

        <!-- 列表内容 -->
        <div class="history-modal-body">
          <div v-if="historyLoading" class="history-loading">
            <div class="spinner"></div>
            <p>加载中...</p>
          </div>
          <template v-else-if="historyWhispers.length">
            <div class="history-list">
              <div v-for="w in historyWhispers" :key="w.id" class="history-card">
                <div class="history-question">
                  <span class="q-icon">Q</span>
                  <p class="q-text">{{ w.content }}</p>
                  <span class="q-time">{{ formatTime(w.createdAt) }}</span>
                </div>
                <div v-if="w.replies && w.replies.length" class="history-answers">
                  <div v-for="reply in w.replies" :key="reply.id" class="answer-item">
                    <span class="a-icon">{{ teacherName }}老师</span>
                    <p class="a-text">{{ reply.content }}</p>
                    <span class="a-time">{{ formatTime(reply.createdAt) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <div v-else class="history-empty">
            <span class="empty-icon">📭</span>
            <p>暂无历史悄悄话</p>
          </div>
        </div>

        <!-- 分页 -->
        <div v-if="historyTotal > historyPageSize" class="history-modal-footer">
          <div class="pagination-wrap">
            <button
              class="page-btn"
              :disabled="historyPage === 1"
              @click="loadHistoryWhispers(historyPage - 1)"
            >
              上一页
            </button>
            <span class="page-info">{{ historyPage }} / {{ Math.ceil(historyTotal / historyPageSize) }}</span>
            <button
              class="page-btn"
              :disabled="historyPage >= Math.ceil(historyTotal / historyPageSize)"
              @click="loadHistoryWhispers(historyPage + 1)"
            >
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
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
  formatTime,
  // 历史悄悄话
  historyWhispers,
  historyLoading,
  historyPage,
  historyPageSize,
  historyTotal,
  historyRange,
  historyStartDate,
  historyEndDate,
  fetchHistoryWhispers
} = useMessages()

const { teacherId } = useAuth()
const teacherName = computed(() => {
  const info = getTeacherInfo(teacherId.value)
  return info.teacherName || ''
})

const selectedIdx = ref(0)
const whisperContent = ref('')

const currentMsg = computed(() => teacherMessages.value[selectedIdx.value] || null)

// 历史悄悄话弹窗
const historyModalVisible = ref(false)

const dateRangeOpts = [
  { label: '全部', value: 'all' },
  { label: '今天', value: 'today' },
  { label: '近7天', value: '7d' },
  { label: '近30天', value: '30d' },
  { label: '自定义', value: 'custom' }
]

const today = computed(() => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
})

function openHistoryModal() {
  historyModalVisible.value = true
  loadHistoryWhispers(1)
}

function closeHistoryModal() {
  historyModalVisible.value = false
}

function loadHistoryWhispers(page = 1) {
  historyRange.value = historyRange.value || 'all'
  fetchHistoryWhispers(page)
}

function onHistoryRangeChange(value) {
  historyRange.value = value
  if (value !== 'custom') {
    historyStartDate.value = null
    historyEndDate.value = null
  }
  loadHistoryWhispers(1)
}

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

  .public-whispers {
    margin-top: 40px;
  }

  .public-whispers__title {
    font-size: 1.1rem;
  }

  .public-whisper-card {
    padding: 16px;
  }

  .q-icon, .a-icon {
    font-size: 0.85rem;
    width: 24px;
    height: 24px;
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

/* ===== Q&A 样式 ===== */
.q-icon, .a-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.q-icon {
  background: #f0f0ff;
  color: #7c6ee8;
}

.a-icon {
  background: #e8f5e9;
  color: #4caf50;
  padding: 2px 10px;
  border-radius: 12px;
  width: auto;
  min-width: 48px;
  height: auto;
  font-size: 0.75rem;
}

.q-text, .a-text {
  flex: 1;
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #444;
  white-space: pre-wrap;
  word-break: break-word;
}

.q-time, .a-time {
  font-size: 0.8rem;
  color: #aaa;
  flex-shrink: 0;
}

.answer-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding-left: 8px;
}

/* ===== 历史悄悄话悬浮球 ===== */
.history-float-btn {
  position: fixed;
  right: 24px;
  bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  z-index: 100;
}

.history-float-btn > .float-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff9a56, #ff6b6b);
  box-shadow: 0 4px 16px rgba(255, 107, 107, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float-bounce 2s ease-in-out infinite;
  transition: transform 0.2s, box-shadow 0.2s;
}

.history-float-btn:hover > .float-icon {
  transform: scale(1.08);
  box-shadow: 0 6px 24px rgba(255, 107, 107, 0.5);
}

.float-icon {
  font-size: 1.6rem;
}

.float-text {
  font-size: 0.7rem;
  color: #ff9a56;
  font-weight: 600;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(255,255,255,0.8);
}

.history-float-btn > .float-icon,
.float-text {
  animation: float-bounce 2s ease-in-out infinite;
}

@keyframes float-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* ===== 历史悄悄话弹窗 ===== */
.history-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 200;
  padding: 80px 20px 20px;
}

.history-modal {
  width: 100%;
  max-width: 500px;
  max-height: 85vh;
  background: #fff;
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.history-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.history-modal-title {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
}

.modal-close {
  width: 32px;
  height: 32px;
  border: none;
  background: #f5f5f5;
  border-radius: 50%;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.modal-close:hover {
  background: #e8e8e8;
}

/* 筛选工具栏 */
.history-modal-toolbar {
  padding: 12px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.date-range-btns {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.range-btn {
  padding: 6px 14px;
  border: 1px solid #e8e8e8;
  border-radius: 20px;
  background: #fff;
  font-size: 0.85rem;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.range-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.range-btn.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: #fff;
}

.custom-dates {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

.date-input {
  padding: 6px 10px;
  border: 1px solid #e8e8e8;
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  outline: none;
}

.date-input:focus {
  border-color: var(--primary-color);
}

/* 列表内容 */
.history-modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
  min-height: 200px;
}

.history-loading,
.history-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #aaa;
  gap: 12px;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #f3f3f3;
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.history-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.history-card {
  background: #f9f9f9;
  border-radius: var(--radius-md);
  padding: 14px 16px;
}

.history-question {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.history-answers {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 分页 */
.history-modal-footer {
  padding: 12px 20px;
  border-top: 1px solid #f0f0f0;
}

.pagination-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.page-btn {
  padding: 6px 16px;
  border: 1px solid #e8e8e8;
  border-radius: var(--radius-md);
  background: #fff;
  font-size: 0.85rem;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 0.85rem;
  color: #999;
}

/* 响应式 */
@media (max-width: 768px) {
  .history-float-btn {
    right: 16px;
    bottom: 60px;
  }

  .history-float-btn > .float-icon {
    width: 50px;
    height: 50px;
  }

  .float-icon {
    font-size: 1.4rem;
  }

  .float-text {
    font-size: 0.65rem;
  }

  .date-range-btns {
    gap: 6px;
  }

  .range-btn {
    padding: 5px 12px;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .history-modal {
    max-height: 90vh;
  }

  .history-modal-header,
  .history-modal-toolbar,
  .history-modal-body,
  .history-modal-footer {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
