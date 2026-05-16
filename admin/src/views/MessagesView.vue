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
            size="small"
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
                size="small"
              />
            </div>
          </el-tab-pane>

          <el-tab-pane label="匿名悄悄话" name="whispers">
            <div class="tab-header whispers-toolbar">
              <el-tag type="info" size="large">共 {{ whispersTotal }} 条悄悄话</el-tag>
              <el-radio-group v-model="whisperRange" @change="onWhisperRangeChange" style="margin-left:12px">
                <el-radio-button value="all">全部</el-radio-button>
                <el-radio-button value="today">今天</el-radio-button>
                <el-radio-button value="7d">近 7 天</el-radio-button>
                <el-radio-button value="30d">近 30 天</el-radio-button>
                <el-radio-button value="custom">自定义</el-radio-button>
              </el-radio-group>
              <div v-if="whisperRange === 'custom'" class="whispers-toolbar__dates">
                <el-date-picker
                  v-model="whisperStartDate"
                  type="date"
                  placeholder="开始日期"
                  :disabled-date="d => d > new Date()"
                  value-format="YYYY-MM-DD"
                  @change="onWhisperDateChange"
                />
                <span class="whispers-toolbar__sep">至</span>
                <el-date-picker
                  v-model="whisperEndDate"
                  type="date"
                  placeholder="结束日期"
                  :disabled-date="d => whisperStartDate ? d < new Date(whisperStartDate) : d > new Date()"
                  value-format="YYYY-MM-DD"
                  @change="onWhisperDateChange"
                />
              </div>
              <div class="select-all-wrap">
                <el-checkbox
                  :model-value="isAllSelected"
                  :indeterminate="isIndeterminate"
                  @change="handleSelectAll"
                >全选</el-checkbox>
              </div>
              <div v-if="selectedWhispers.length" class="batch-actions">
                <span class="batch-count">已选 {{ selectedWhispers.length }} 项</span>
                <el-button size="small" @click="handleBatchShow">批量显示</el-button>
                <el-button size="small" @click="handleBatchHide">批量隐藏</el-button>
              </div>
            </div>
            <div v-loading="loadingWhispers" class="whisper-list">
              <div v-if="!paginatedWhispers.length && !loadingWhispers" class="empty-state">
                <el-empty description="还没有悄悄话~" />
              </div>
              <div v-for="w in paginatedWhispers" :key="w.id" class="whisper-card" :class="{ selected: selectedWhispers.includes(w.id) }">
                <div class="whisper-card__main">
                  <div class="whisper-checkbox">
                    <el-checkbox v-model="w._selected" @change="handleSelectChange(w.id)"></el-checkbox>
                  </div>
                  <div class="whisper-body">
                    <span class="whisper-icon">🤫</span>
                    <div class="whisper-content">
                      <p class="whisper-text">{{ w.content }}</p>
                      <!-- 回复列表 -->
                      <div v-if="w.replies && w.replies.length" class="reply-list">
                        <div v-for="reply in w.replies" :key="reply.id" class="reply-item">
                          <span class="reply-icon">💬</span>
                          <div class="reply-body">
                            <div class="reply-main">
                              <span class="reply-text">{{ reply.content }}</span>
                              <div class="reply-btns">
                                <el-button type="primary" link size="small" @click="openEditReplyDialog(reply, w)">编辑</el-button>
                                <el-button type="danger" link size="small" @click="handleDeleteReply(reply.id)">删除</el-button>
                              </div>
                            </div>
                            <span class="reply-time">{{ formatDate(reply.createdAt) }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="whisper-footer">
                  <div class="whisper-footer__meta">
                    <span>{{ formatDate(w.createdAt) }}</span>
                  </div>
                  <div class="whisper-footer__actions">
                    <el-switch
                      v-model="w.isPublic"
                      active-text="显示给学生"
                      inactive-text="隐藏"
                      inline-prompt
                      size="small"
                      style="--el-switch-on-color: #67c23a; --el-switch-off-color: #909399"
                      @change="handleTogglePublic(w)"
                    />
                    <el-button type="primary" link size="small" @click="openReplyDialog(w)">回复</el-button>
                    <el-button type="danger" link size="small" @click="handleDeleteWhisper(w.id)">删除</el-button>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="whispersTotal > whisperPageSize" class="pagination-wrap">
              <el-pagination
                v-model:current-page="whisperPage"
                :page-size="whisperPageSize"
                :total="whispersTotal"
                layout="prev, pager, next"
                background
                size="small"
              />
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
              size="small"
            />
          </div>
        </el-tab-pane>

        <el-tab-pane label="匿名悄悄话" name="whispers">
          <div class="tab-header whispers-toolbar">
            <el-tag type="info" size="large">共 {{ whispersTotal }} 条悄悄话</el-tag>
            <el-radio-group v-model="whisperRange" @change="onWhisperRangeChange" style="margin-left:12px">
              <el-radio-button value="all">全部</el-radio-button>
              <el-radio-button value="today">今天</el-radio-button>
              <el-radio-button value="7d">近 7 天</el-radio-button>
              <el-radio-button value="30d">近 30 天</el-radio-button>
              <el-radio-button value="custom">自定义</el-radio-button>
            </el-radio-group>
            <div v-if="whisperRange === 'custom'" class="whispers-toolbar__dates">
              <el-date-picker
                v-model="whisperStartDate"
                type="date"
                placeholder="开始日期"
                :disabled-date="d => d > new Date()"
                value-format="YYYY-MM-DD"
                @change="onWhisperDateChange"
              />
              <span class="whispers-toolbar__sep">至</span>
              <el-date-picker
                v-model="whisperEndDate"
                type="date"
                placeholder="结束日期"
                :disabled-date="d => whisperStartDate ? d < new Date(whisperStartDate) : d > new Date()"
                value-format="YYYY-MM-DD"
                @change="onWhisperDateChange"
              />
            </div>
            <div class="select-all-wrap">
              <el-checkbox
                :model-value="isAllSelected"
                :indeterminate="isIndeterminate"
                @change="handleSelectAll"
              >全选</el-checkbox>
            </div>
            <div v-if="selectedWhispers.length" class="batch-actions">
              <span class="batch-count">已选 {{ selectedWhispers.length }} 项</span>
              <el-button size="small" @click="handleBatchShow">批量显示</el-button>
              <el-button size="small" @click="handleBatchHide">批量隐藏</el-button>
            </div>
          </div>
          <div v-loading="loadingWhispers" class="whisper-list">
            <div v-if="!paginatedWhispers.length && !loadingWhispers" class="empty-state">
              <el-empty description="还没有悄悄话~" />
            </div>
            <div v-for="w in paginatedWhispers" :key="w.id" class="whisper-card" :class="{ selected: selectedWhispers.includes(w.id) }">
              <div class="whisper-checkbox">
                <el-checkbox v-model="w._selected" @change="handleSelectChange(w.id)"></el-checkbox>
              </div>
              <div class="whisper-body">
                <span class="whisper-icon">🤫</span>
                <div class="whisper-content">
                  <p class="whisper-text">{{ w.content }}</p>
                  <!-- 回复列表 -->
                  <div v-if="w.replies && w.replies.length" class="reply-list">
                    <div v-for="reply in w.replies" :key="reply.id" class="reply-item">
                      <span class="reply-icon">💬</span>
                      <div class="reply-body">
                        <div class="reply-main">
                          <span class="reply-text">{{ reply.content }}</span>
                          <div class="reply-btns">
                            <el-button type="primary" link size="small" @click="openEditReplyDialog(reply, w)">编辑</el-button>
                            <el-button type="danger" link size="small" @click="handleDeleteReply(reply.id)">删除</el-button>
                          </div>
                        </div>
                        <span class="reply-time">{{ formatDate(reply.createdAt) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="whisper-footer">
                <div class="whisper-footer__meta">
                  <span>{{ formatDate(w.createdAt) }}</span>
                </div>
                <div class="whisper-footer__actions">
                  <el-switch
                    v-model="w.isPublic"
                    active-text="显示给学生"
                    inactive-text="隐藏"
                    inline-prompt
                    size="small"
                    style="--el-switch-on-color: #67c23a; --el-switch-off-color: #909399"
                    @change="handleTogglePublic(w)"
                  />
                  <el-button type="primary" link size="small" @click="openReplyDialog(w)">回复</el-button>
                  <el-button type="danger" link size="small" @click="handleDeleteWhisper(w.id)">删除</el-button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="whispersTotal > whisperPageSize" class="pagination-wrap">
            <el-pagination
              v-model:current-page="whisperPage"
              :page-size="whisperPageSize"
              :total="whispersTotal"
              layout="prev, pager, next"
              background
              size="small"
            />
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

    <!-- 回复悄悄话对话框 -->
    <el-dialog v-model="replyDialogVisible" width="min(450px, 92vw)" destroy-on-close class="msg-dialog">
      <template #header>
        <div class="dialog-header">
          <span class="dialog-icon">💬</span>
          <span class="dialog-title">{{ isEditingReply ? '编辑回复' : '回复悄悄话' }}</span>
        </div>
      </template>
      <div class="reply-origin">
        <span class="reply-origin__label">学生留言：</span>
        <p class="reply-origin__content">{{ replyWhisperContent }}</p>
      </div>
      <el-form label-position="top" class="dialog-form">
        <el-form-item label="回复内容">
          <div class="field-col">
            <el-input
              v-model="replyContent"
              type="textarea"
              :rows="4"
              maxlength="500"
              show-word-limit
              placeholder="写下你的回复..."
            />
            <div class="field-col__footer">
              <EmojiPicker @select="replyContent += $event" />
              <span class="char-hint">{{ replyContent.length }} / 500</span>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="replyDialogVisible = false">取消</el-button>
          <el-button type="primary" :loading="submittingReply" @click="handleSubmitReply" class="save-btn">{{ isEditingReply ? '更新回复' : '发送回复' }}</el-button>
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
const whisperPage = ref(1)
const whisperPageSize = 10
const whispersTotal = ref(0)
const whisperRange = ref('all')
const whisperStartDate = ref(null)
const whisperEndDate = ref(null)
const paginatedWhispers = computed(() => whispers.value)

// 回复对话框
const replyDialogVisible = ref(false)
const isEditingReply = ref(false)
const editingReplyId = ref(null)
const replyWhisperId = ref(null)
const replyWhisperContent = ref('')
const replyContent = ref('')
const submittingReply = ref(false)

// 批量选择
const selectedWhispers = ref([])

const isAllSelected = computed(() => {
  if (paginatedWhispers.value.length === 0) return false
  return paginatedWhispers.value.every(w => selectedWhispers.value.includes(w.id))
})

const isIndeterminate = computed(() => {
  const currentPageSelected = paginatedWhispers.value.filter(w => selectedWhispers.value.includes(w.id)).length
  return currentPageSelected > 0 && currentPageSelected < paginatedWhispers.value.length
})

function handleSelectAll(val) {
  if (val) {
    paginatedWhispers.value.forEach(w => {
      if (!selectedWhispers.value.includes(w.id)) {
        selectedWhispers.value.push(w.id)
      }
      w._selected = true
    })
  } else {
    paginatedWhispers.value.forEach(w => {
      const idx = selectedWhispers.value.indexOf(w.id)
      if (idx > -1) selectedWhispers.value.splice(idx, 1)
      w._selected = false
    })
  }
}

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
  whisperPage.value = 1
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
    const { start, end } = getWhisperDateRange()
    const queryParams = {
      ...params,
      page: whisperPage.value,
      pageSize: whisperPageSize,
      ...(start && { startDate: start }),
      ...(end && { endDate: end })
    }
    const { data } = await api.get('/messages/manage/whispers', { params: queryParams })
    whispers.value = (data.data || []).map(w => ({
      ...w,
      _selected: selectedWhispers.value.includes(w.id)
    }))
    whispersTotal.value = data.total || 0
    const maxPage = Math.max(1, Math.ceil(whispersTotal.value / whisperPageSize))
    if (whisperPage.value > maxPage) whisperPage.value = maxPage
  } finally {
    loadingWhispers.value = false
  }
}

function getWhisperDateRange() {
  const d = new Date()
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  if (whisperRange.value === 'custom' && whisperStartDate.value && whisperEndDate.value) {
    return { start: whisperStartDate.value, end: whisperEndDate.value }
  }
  if (whisperRange.value === 'today') return { start: today, end: today }
  if (whisperRange.value === '7d') {
    const ds = new Date(Date.now() - 6 * 86400000)
    const start = `${ds.getFullYear()}-${String(ds.getMonth() + 1).padStart(2, '0')}-${String(ds.getDate()).padStart(2, '0')}`
    return { start, end: today }
  }
  if (whisperRange.value === '30d') {
    const ds = new Date(Date.now() - 29 * 86400000)
    const start = `${ds.getFullYear()}-${String(ds.getMonth() + 1).padStart(2, '0')}-${String(ds.getDate()).padStart(2, '0')}`
    return { start, end: today }
  }
  return { start: null, end: null }
}

function onWhisperRangeChange() {
  whisperPage.value = 1
  loadWhispers(isAdmin.value && selectedTeacherKey.value ? { teacherKey: selectedTeacherKey.value } : {})
}

function onWhisperDateChange() {
  if (whisperStartDate.value && whisperEndDate.value) {
    whisperPage.value = 1
    loadWhispers(isAdmin.value && selectedTeacherKey.value ? { teacherKey: selectedTeacherKey.value } : {})
  }
}

watch(whisperPage, () => {
  if (activeTab.value === 'whispers') {
    loadWhispers(isAdmin.value && selectedTeacherKey.value ? { teacherKey: selectedTeacherKey.value } : {})
  }
})

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
    // 管理员添加寄语时，需要指定当前选中的教师
    if (isAdmin.value && selectedTeacherKey.value) {
      payload.teacherKey = selectedTeacherKey.value
    }
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

function openReplyDialog(w) {
  isEditingReply.value = false
  editingReplyId.value = null
  replyWhisperId.value = w.id
  replyWhisperContent.value = w.content
  replyContent.value = ''
  replyDialogVisible.value = true
}

function openEditReplyDialog(reply, w) {
  isEditingReply.value = true
  editingReplyId.value = reply.id
  replyWhisperId.value = w.id
  replyWhisperContent.value = w.content
  replyContent.value = reply.content
  replyDialogVisible.value = true
}

async function handleSubmitReply() {
  if (!replyContent.value.trim()) {
    return ElMessage.warning('请输入回复内容')
  }
  submittingReply.value = true
  try {
    if (isEditingReply.value) {
      await api.put(`/messages/manage/reply/${editingReplyId.value}`, {
        replyContent: replyContent.value
      })
      ElMessage.success('回复已更新')
    } else {
      await api.post(`/messages/manage/whisper/${replyWhisperId.value}/reply`, {
        replyContent: replyContent.value
      })
      ElMessage.success('回复成功')
    }
    replyDialogVisible.value = false
    loadData()
  } catch (err) {
    ElMessage.error(err.message || '操作失败')
  } finally {
    submittingReply.value = false
  }
}

async function handleDeleteReply(replyId) {
  await ElMessageBox.confirm('确定删除这条回复吗？', '删除确认', { type: 'warning' })
  await api.delete(`/messages/manage/reply/${replyId}`)
  ElMessage.success('已删除')
  loadData()
}

function handleSelectChange(id) {
  const idx = selectedWhispers.value.indexOf(id)
  if (idx > -1) {
    selectedWhispers.value.splice(idx, 1)
  } else {
    selectedWhispers.value.push(id)
  }
}

async function handleBatchShow() {
  if (!selectedWhispers.value.length) return
  for (const id of selectedWhispers.value) {
    await api.patch(`/messages/manage/whisper/${id}/public`, { isPublic: true })
  }
  ElMessage.success(`已设置 ${selectedWhispers.value.length} 项显示`)
  selectedWhispers.value = []
  loadWhispers(isAdmin.value && selectedTeacherKey.value ? { teacherKey: selectedTeacherKey.value } : {})
}

async function handleBatchHide() {
  if (!selectedWhispers.value.length) return
  for (const id of selectedWhispers.value) {
    await api.patch(`/messages/manage/whisper/${id}/public`, { isPublic: false })
  }
  ElMessage.success(`已设置 ${selectedWhispers.value.length} 项隐藏`)
  selectedWhispers.value = []
  loadWhispers(isAdmin.value && selectedTeacherKey.value ? { teacherKey: selectedTeacherKey.value } : {})
}

async function handleTogglePublic(w) {
  try {
    await api.patch(`/messages/manage/whisper/${w.id}/public`, {
      isPublic: w.isPublic
    })
  } catch (err) {
    ElMessage.error(err.message || '设置失败')
    w.isPublic = !w.isPublic
  }
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
  flex-wrap: wrap;
  gap: 10px;
}

.whispers-toolbar {
  justify-content: flex-start;
}

.whispers-toolbar__dates { display: flex; align-items: center; gap: 8px; }
.whispers-toolbar__sep { color: #999; font-size: 14px; }

.select-all-wrap {
  margin-left: 12px;
}

.batch-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.batch-count {
  font-size: 0.85rem;
  color: #666;
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
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.whisper-card:hover {
  background: #f5f5f5;
}

.whisper-card.selected {
  background: #f0f7ff;
  border: 1px solid #409eff;
}

.whisper-checkbox {
  flex-shrink: 0;
  padding-top: 4px;
}

.whisper-body {
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  min-width: 0;
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

.whisper-content {
  flex: 1;
}

.whisper-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid #eee;
  flex-wrap: wrap;
  gap: 8px;
}

.whisper-footer__meta {
  font-size: 0.82rem;
  color: #aaa;
}

.whisper-footer__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.reply-actions-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px dashed #e0e0e0;
  flex-wrap: wrap;
}

.reply-actions-label {
  font-size: 0.8rem;
  color: #999;
}

.reply-action-btns {
  display: flex;
  gap: 4px;
}

/* 回复列表 */
.reply-list {
  margin-top: 12px;
  padding-left: 12px;
  border-left: 2px solid #e0e0e0;
}

.reply-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 0;
}

.reply-icon {
  font-size: 0.9rem;
  flex-shrink: 0;
}

.reply-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.reply-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.reply-text {
  font-size: 0.9rem;
  color: #666;
  white-space: pre-wrap;
  word-break: break-word;
  flex: 1;
}

.reply-btns {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.reply-time {
  font-size: 0.75rem;
  color: #aaa;
}

/* 回复对话框 */
.reply-origin {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}

.reply-origin__label {
  font-size: 0.85rem;
  color: #999;
}

.reply-origin__content {
  margin: 8px 0 0;
  font-size: 0.95rem;
  color: #444;
  white-space: pre-wrap;
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

@media (max-width: 580px) {
  .whispers-toolbar { flex-direction: column; align-items: flex-start; }
  .whispers-toolbar__dates { width: 100%; flex-wrap: wrap; }
  .whispers-toolbar__dates :deep(.el-date-editor) { flex: 1; min-width: 120px; }
  .whispers-toolbar :deep(.el-radio-button__inner) { padding: 6px 10px; font-size: 13px; }

  .whisper-card {
    padding: 12px 14px;
  }

  .whisper-body {
    flex-direction: column;
  }

  .whisper-icon {
    margin-top: 0;
  }

  .whisper-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .whisper-footer__meta,
  .whisper-footer__actions {
    width: 100%;
  }

  .whisper-footer__actions {
    justify-content: flex-start;
  }

  .reply-item {
    flex-direction: column;
    gap: 6px;
    padding: 10px 0;
  }

  .reply-icon {
    font-size: 1rem;
  }

  .reply-body,
  .reply-content {
    width: 100%;
    min-width: 0;
  }

  .reply-main {
    flex-direction: column;
  }

  .reply-btns {
    width: 100%;
    justify-content: flex-start;
    margin-top: 4px;
    padding-top: 4px;
    border-top: 1px dashed #eee;
  }

  .reply-text {
    font-size: 0.85rem;
    line-height: 1.5;
  }
}
</style>
