<template>
  <div class="messages-view">
    <!-- 管理员：教师选择 -->
    <template v-if="isAdmin">
      <div v-if="!selectedTeacherKey" class="teacher-select-panel">
        <div class="panel-header">
          <h3>选择教师查看消息</h3>
          <el-input
            v-model="searchText"
            placeholder="搜索教师..."
            clearable
            prefix-icon="Search"
            style="max-width: 300px"
          />
        </div>
        <div v-loading="loadingTeachers" class="teacher-grid">
          <div v-if="!filteredTeachers.length && !loadingTeachers" class="empty-state">
            <el-empty description="暂无教师" />
          </div>
          <div
            v-for="t in paginatedTeachers"
            :key="t.key"
            class="teacher-card"
            @click="selectTeacherByRow(t)"
          >
            <div class="teacher-avatar" :style="{ background: getGradient(t.displayName) }">
              {{ getInitial(t.displayName) }}
            </div>
            <div class="teacher-card__info">
              <span class="teacher-card__name">{{ t.displayName || '-' }}</span>
              <span class="teacher-card__role">{{ t.role === 'admin' ? '管理员' : '教师' }}</span>
            </div>
          </div>
        </div>
        <div v-if="filteredTeachers.length > teacherPageSize" class="pagination-wrap">
          <el-pagination
            v-model:current-page="teacherPage"
            :page-size="teacherPageSize"
            :total="filteredTeachers.length"
            layout="prev, pager, next"
            background
            small
          />
        </div>
      </div>

      <template v-else>
        <div class="selected-header">
          <el-button @click="selectedTeacherKey = null" class="back-btn">
            <el-icon><ArrowLeft /></el-icon> 返回教师列表
          </el-button>
          <span class="selected-name">{{ selectedTeacherName }} 的消息</span>
        </div>

        <el-tabs v-model="activeTab" class="main-tabs">
          <el-tab-pane label="教师寄语" name="messages">
            <div class="tab-header">
              <el-button type="primary" @click="openAddDialog" class="add-btn">
                <el-icon><Plus /></el-icon> 新增寄语
              </el-button>
            </div>
            <div class="table-scroll">
              <el-table :data="paginatedMessages" stripe v-loading="loadingMessages" empty-text="暂无寄语">
                <el-table-column prop="title" label="标题" min-width="120">
                  <template #default="{ row }">
                    <span style="font-weight:500">{{ row.title || '无标题' }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="content" label="内容" min-width="200">
                  <template #default="{ row }">
                    <span class="msg-preview">{{ row.content }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="时间" width="140">
                  <template #default="{ row }">{{ formatDate(row.createdAt) }}</template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                  <template #default="{ row }">
                    <el-button type="primary" link size="small" @click="openEditDialog(row)">编辑</el-button>
                    <el-button type="danger" link size="small" @click="handleDeleteMessage(row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-if="messages.length > pageSize" class="pagination-wrap">
              <el-pagination
                v-model:current-page="currentPage"
                :page-size="pageSize"
                :total="messages.length"
                layout="prev, pager, next"
                background
                small
              />
            </div>
          </el-tab-pane>

          <el-tab-pane label="匿名悄悄话" name="whispers">
            <div class="tab-header">
              <el-tag type="info" size="large">共 {{ whispers.length }} 条悄悄话</el-tag>
            </div>
            <div v-loading="loadingWhispers" class="whisper-list">
              <div v-if="!whispers.length && !loadingWhispers" class="empty-state">
                <el-empty description="还没有悄悄话~" />
              </div>
              <div v-for="w in whispers" :key="w.id" class="whisper-card">
                <div class="whisper-body">
                  <span class="whisper-icon">🤫</span>
                  <p class="whisper-text">{{ w.content }}</p>
                </div>
                <div class="whisper-meta">
                  <span>{{ formatDate(w.createdAt) }}</span>
                  <el-button type="danger" link size="small" @click="handleDeleteWhisper(w.id)">删除</el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </template>

    <!-- 普通教师：直接看到自己的 -->
    <template v-else>
      <el-tabs v-model="activeTab" class="main-tabs">
        <el-tab-pane label="教师寄语" name="messages">
          <div class="tab-header">
            <el-button type="primary" @click="openAddDialog">
              <el-icon><Plus /></el-icon> 新增寄语
            </el-button>
          </div>
          <div class="table-scroll">
            <el-table :data="paginatedMessages" stripe v-loading="loadingMessages" empty-text="暂无寄语">
              <el-table-column prop="title" label="标题" min-width="120">
                <template #default="{ row }">
                  <span style="font-weight:500">{{ row.title || '无标题' }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="content" label="内容" min-width="200">
                <template #default="{ row }">
                  <span class="msg-preview">{{ row.content }}</span>
                </template>
              </el-table-column>
              <el-table-column label="时间" width="140">
                <template #default="{ row }">{{ formatDate(row.createdAt) }}</template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template #default="{ row }">
                  <el-button type="primary" link size="small" @click="openEditDialog(row)">编辑</el-button>
                  <el-button type="danger" link size="small" @click="handleDeleteMessage(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="messages.length > pageSize" class="pagination-wrap">
            <el-pagination
              v-model:current-page="currentPage"
              :page-size="pageSize"
              :total="messages.length"
              layout="prev, pager, next"
              background
              small
            />
          </div>
        </el-tab-pane>

        <el-tab-pane label="匿名悄悄话" name="whispers">
          <div class="tab-header">
            <el-tag type="info" size="large">共 {{ whispers.length }} 条悄悄话</el-tag>
          </div>
          <div v-loading="loadingWhispers" class="whisper-list">
            <div v-if="!whispers.length && !loadingWhispers" class="empty-state">
              <el-empty description="还没有悄悄话~" />
            </div>
            <div v-for="w in whispers" :key="w.id" class="whisper-card">
              <div class="whisper-body">
                <span class="whisper-icon">🤫</span>
                <p class="whisper-text">{{ w.content }}</p>
              </div>
              <div class="whisper-meta">
                <span>{{ formatDate(w.createdAt) }}</span>
                <el-button type="danger" link size="small" @click="handleDeleteWhisper(w.id)">删除</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>

    <!-- 新增/编辑寄语对话框 -->
    <el-dialog v-model="dialogVisible" width="min(500px, 92vw)" destroy-on-close class="msg-dialog">
      <template #header>
        <div class="dialog-header">
          <span class="dialog-icon">{{ isEditing ? '✏️' : '💌' }}</span>
          <span class="dialog-title">{{ isEditing ? '编辑寄语' : '新增寄语' }}</span>
        </div>
      </template>
      <el-form label-position="top" class="dialog-form">
        <el-form-item label="标题">
          <div class="field-row">
            <el-input
              v-model="dialogTitle"
              maxlength="100"
              show-word-limit
              placeholder="输入寄语标题..."
            />
            <EmojiPicker @select="dialogTitle += $event" />
          </div>
        </el-form-item>
        <el-form-item label="正文内容">
          <div class="field-col">
            <el-input
              v-model="dialogContent"
              type="textarea"
              :rows="5"
              maxlength="500"
              show-word-limit
              placeholder="写下对同学们的寄语..."
            />
            <div class="field-col__footer">
              <EmojiPicker @select="dialogContent += $event" />
              <span class="char-hint">{{ dialogContent.length }} / 500</span>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" :loading="submitting" @click="handleSave" class="save-btn">
            {{ isEditing ? '更新寄语' : '发布寄语' }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { inject } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import api from '../api.js'
import EmojiPicker from '../components/EmojiPicker.vue'

const user = inject('user')
const isAdmin = computed(() => user.value?.role === 'admin')

const activeTab = ref('messages')

// 头像配色
const PALETTE = [
  ['#667eea', '#764ba2'],
  ['#7c6ee8', '#8654b0'],
  ['#5a82e6', '#6e42a4'],
  ['#8478f0', '#9460b8'],
]

function getGradient(name) {
  if (!name) return `linear-gradient(135deg, ${PALETTE[0][0]}, ${PALETTE[0][1]})`
  let h = 0
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  const [c1, c2] = PALETTE[Math.abs(h) % PALETTE.length]
  return `linear-gradient(135deg, ${c1}, ${c2})`
}

function getInitial(name) {
  if (!name) return '?'
  const text = name.endsWith('老师') ? name.slice(0, -2) : name
  return text.length > 4 ? text.slice(0, 4) : text
}

// 教师列表（admin 用）
const teachers = ref([])
const loadingTeachers = ref(false)
const searchText = ref('')
const selectedTeacherKey = ref(null)
const selectedTeacherName = ref('')
const teacherPage = ref(1)
const teacherPageSize = 20

const filteredTeachers = computed(() => {
  if (!searchText.value) return teachers.value
  const kw = searchText.value.toLowerCase()
  return teachers.value.filter(t => t.displayName.toLowerCase().includes(kw))
})

const paginatedTeachers = computed(() => {
  const start = (teacherPage.value - 1) * teacherPageSize
  return filteredTeachers.value.slice(start, start + teacherPageSize)
})

function selectTeacherByRow(row) {
  selectedTeacherKey.value = row.key
  selectedTeacherName.value = row.displayName
}

// 寄语
const messages = ref([])
const loadingMessages = ref(false)
const currentPage = ref(1)
const pageSize = 10
const paginatedMessages = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return messages.value.slice(start, start + pageSize)
})

// 悄悄话
const whispers = ref([])
const loadingWhispers = ref(false)

// 对话框
const dialogVisible = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const dialogTitle = ref('')
const dialogContent = ref('')
const submitting = ref(false)

onMounted(() => {
  if (isAdmin.value) {
    loadTeachers()
  } else {
    loadData()
  }
})

watch(selectedTeacherKey, (key) => {
  if (key) loadData()
})

async function loadTeachers() {
  loadingTeachers.value = true
  try {
    const { data } = await api.get('/teachers')
    teachers.value = (Array.isArray(data) ? data : []).map(t => ({
      key: t.key,
      displayName: t.display_name || t.displayName,
      role: t.role
    }))
  } finally {
    loadingTeachers.value = false
  }
}

async function loadData() {
  const params = {}
  if (isAdmin.value && selectedTeacherKey.value) {
    params.teacherKey = selectedTeacherKey.value
  }
  loadMessages(params)
  loadWhispers(params)
}

async function loadMessages(params = {}) {
  loadingMessages.value = true
  currentPage.value = 1
  try {
    const { data } = await api.get('/messages/manage/messages', { params })
    messages.value = data.data || []
  } finally {
    loadingMessages.value = false
  }
}

async function loadWhispers(params = {}) {
  loadingWhispers.value = true
  try {
    const { data } = await api.get('/messages/manage/whispers', { params })
    whispers.value = data.data || []
  } finally {
    loadingWhispers.value = false
  }
}

function openAddDialog() {
  isEditing.value = false
  editingId.value = null
  dialogTitle.value = ''
  dialogContent.value = ''
  dialogVisible.value = true
}

function openEditDialog(row) {
  isEditing.value = true
  editingId.value = row.id
  dialogTitle.value = row.title || ''
  dialogContent.value = row.content
  dialogVisible.value = true
}

async function handleSave() {
  if (!dialogContent.value.trim()) {
    return ElMessage.warning('请输入寄语内容')
  }
  submitting.value = true
  try {
    const payload = { title: dialogTitle.value, content: dialogContent.value }
    if (isEditing.value) {
      await api.put(`/messages/manage/message/${editingId.value}`, payload)
      ElMessage.success('寄语已更新')
    } else {
      await api.post('/messages/manage/message', payload)
      ElMessage.success('寄语已发布')
    }
    dialogVisible.value = false
    loadData()
  } finally {
    submitting.value = false
  }
}

async function handleDeleteMessage(id) {
  await ElMessageBox.confirm('确定删除这条寄语吗？', '删除确认', { type: 'warning' })
  await api.delete(`/messages/manage/message/${id}`)
  ElMessage.success('已删除')
  loadData()
}

async function handleDeleteWhisper(id) {
  await ElMessageBox.confirm('确定删除这条悄悄话吗？', '删除确认', { type: 'warning' })
  await api.delete(`/messages/manage/whisper/${id}`)
  ElMessage.success('已删除')
  loadData()
}

function formatDate(isoString) {
  if (!isoString) return ''
  const d = new Date(isoString)
  return `${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}
</script>

<style scoped>
.messages-view {
  max-width: 100%;
}

/* 新增寄语按钮 */
.add-btn {
  background: linear-gradient(135deg, #667eea, #764ba2) !important;
  border: none !important;
  border-radius: 20px !important;
  font-weight: 500;
  padding: 8px 20px !important;
}

.add-btn:hover {
  opacity: 0.9;
}

/* 教师选择面板 */
.teacher-select-panel {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.panel-header h3 {
  margin: 0;
  font-size: 16px;
  color: #1a1a2e;
}

.teacher-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  min-height: 100px;
}

.teacher-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #fafafa;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.teacher-card:hover {
  background: #f0f2ff;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
}

.teacher-avatar {
  min-width: 44px;
  height: 44px;
  border-radius: 14px;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0 10px;
  box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3);
}

.teacher-card__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.teacher-card__name {
  font-weight: 600;
  font-size: 14px;
  color: #1a1a2e;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.teacher-card__role {
  font-size: 12px;
  color: #aaa;
}

/* 选中教师后的头部 */
.selected-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.back-btn {
  padding: 6px 12px;
  border-radius: 10px;
}

.selected-name {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}

/* 通用 */
.main-tabs {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.table-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 12px;
}

.table-scroll :deep(.el-table) {
  border-radius: 12px;
  overflow: hidden;
}

.table-scroll :deep(.el-table th.el-table__cell) {
  border-radius: 0;
}

.msg-preview {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

/* 悄悄话卡片 */
.whisper-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.whisper-card {
  background: #fafafa;
  border-radius: 14px;
  padding: 16px 20px;
  transition: background 0.15s;
}

.whisper-card:hover {
  background: #f5f5f5;
}

.whisper-body {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.whisper-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.whisper-text {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #444;
  white-space: pre-wrap;
  word-break: break-word;
}

.whisper-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #eee;
  font-size: 0.82rem;
  color: #aaa;
}

.empty-state {
  padding: 30px 0;
  grid-column: 1 / -1;
}

.pagination-wrap {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

/* 弹窗 */
.dialog-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dialog-icon {
  font-size: 22px;
}

.dialog-title {
  font-size: 17px;
  font-weight: 700;
  color: #1a1a2e;
}

.field-row {
  display: flex;
  gap: 8px;
  width: 100%;
}

.field-row .el-input {
  flex: 1;
}

.field-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.field-col__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.char-hint {
  font-size: 12px;
  color: #bbb;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.save-btn {
  background: linear-gradient(135deg, #667eea, #764ba2) !important;
  border: none !important;
  border-radius: 20px !important;
  font-weight: 500;
}

.save-btn:hover {
  opacity: 0.9;
}

:deep(.el-dialog) {
  border-radius: 16px !important;
}

:deep(.el-dialog__header) {
  border-radius: 16px 16px 0 0;
}

@media (max-width: 768px) {
  .main-tabs {
    padding: 14px;
  }

  .teacher-select-panel {
    padding: 16px;
  }

  .panel-header {
    flex-direction: column;
    align-items: stretch;
  }

  .panel-header .el-input {
    max-width: 100%;
  }

  .teacher-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 8px;
  }

  .teacher-card {
    padding: 12px;
  }
}
</style>
