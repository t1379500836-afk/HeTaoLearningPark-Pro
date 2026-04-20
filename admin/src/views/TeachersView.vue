<template>
  <div>
    <!-- ====== Admin 视图 ====== -->
    <template v-if="user.role === 'admin'">
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-card__shine"></div>
          <div class="stat-card__body">
            <div class="stat-card__icon">
              <el-icon :size="26"><User /></el-icon>
            </div>
            <div>
              <div class="stat-card__num">{{ stats.total }}</div>
              <div class="stat-card__label">账号总数</div>
            </div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card__shine"></div>
          <div class="stat-card__body">
            <div class="stat-card__icon">
              <el-icon :size="26"><UserFilled /></el-icon>
            </div>
            <div>
              <div class="stat-card__num">{{ stats.admins }}</div>
              <div class="stat-card__label">管理员</div>
            </div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card__shine"></div>
          <div class="stat-card__body">
            <div class="stat-card__icon">
              <el-icon :size="26"><Reading /></el-icon>
            </div>
            <div>
              <div class="stat-card__num">{{ stats.teacherCount }}</div>
              <div class="stat-card__label">课导老师</div>
            </div>
          </div>
        </div>
      </div>

      <div class="toolbar">
        <el-input v-model="searchQuery" placeholder="搜索账号、花名或口令…" prefix-icon="Search" clearable class="toolbar__search" />
        <el-button type="primary" class="btn-primary" @click="openAdd">
          <el-icon><Plus /></el-icon> 新增教师
        </el-button>
      </div>

      <div class="table-wrap">
        <el-table :data="paginatedTeachers" style="width:100%">
          <el-table-column label="教师" min-width="200">
            <template #default="{ row }">
              <div class="teacher-cell">
                <div class="teacher-avatar" :style="{ background: getGradient(row.display_name) }">
                  {{ getInitial(row.display_name) }}
                </div>
                <div class="teacher-cell__info">
                  <span class="teacher-cell__name">{{ row.display_name || '-' }}</span>
                  <span class="teacher-cell__sub">@{{ row.username }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="口令" min-width="180">
            <template #default="{ row }">
              <div class="key-cell">
                <code class="key-code">{{ row.key }}</code>
                <el-tooltip content="复制口令" placement="top">
                  <button class="icon-btn" @click="copyKey(row.key)">
                    <el-icon><CopyDocument /></el-icon>
                  </button>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="角色" width="100" align="center">
            <template #default="{ row }">
              <span :class="['role-badge', row.role === 'admin' ? 'role-badge--admin' : 'role-badge--teacher']">
                {{ row.role === 'admin' ? '管理员' : '教师' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" width="120" align="center">
            <template #default="{ row }">
              <span class="cell-date">{{ formatDate(row.updated_at) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template #default="{ row }">
              <div class="action-group">
                <button class="action-btn action-btn--edit" @click="openEdit(row)">
                  <el-icon><Edit /></el-icon> 编辑
                </button>
                <el-popconfirm title="确认删除该教师？" @confirm="handleDelete(row.id)">
                  <template #reference>
                    <button class="action-btn action-btn--del">
                      <el-icon><Delete /></el-icon> 删除
                    </button>
                  </template>
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-wrap" v-if="filteredTeachers.length > pageSize">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="filteredTeachers.length"
          layout="prev, pager, next"
          background
        />
      </div>
    </template>

    <!-- ====== Teacher 个人资料 ====== -->
    <template v-else>
      <div class="profile-card">
        <div class="profile-top">
          <div class="profile-banner">
            <div class="profile-orb profile-orb--1"></div>
            <div class="profile-orb profile-orb--2"></div>
            <div class="profile-orb profile-orb--3"></div>
          </div>
          <div class="profile-avatar-area">
            <div class="profile-avatar" :style="{ background: getGradient(me.display_name || me.displayName) }">
              {{ getInitial(me.display_name || me.displayName) }}
            </div>
          </div>
          <div class="profile-head">
            <h2 class="profile-name">{{ me.display_name || me.displayName || '-' }}</h2>
            <span class="role-badge role-badge--teacher">教师</span>
          </div>
        </div>
        <div class="profile-body">
          <div class="info-grid">
            <div class="info-item">
              <div class="info-item__icon"><el-icon><User /></el-icon></div>
              <div>
                <div class="info-item__label">登录账号</div>
                <div class="info-item__value">{{ me.username || '-' }}</div>
              </div>
            </div>
            <div class="info-item">
              <div class="info-item__icon"><el-icon><Key /></el-icon></div>
              <div>
                <div class="info-item__label">学生口令</div>
                <div class="info-item__value">
                  <code class="key-code">{{ me.key || '-' }}</code>
                  <el-tooltip v-if="me.key" content="复制口令" placement="top">
                    <button class="icon-btn" @click="copyKey(me.key)">
                      <el-icon><CopyDocument /></el-icon>
                    </button>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <div class="info-item">
              <div class="info-item__icon"><el-icon><UserFilled /></el-icon></div>
              <div>
                <div class="info-item__label">角色</div>
                <div class="info-item__value">教师</div>
              </div>
            </div>
            <div class="info-item">
              <div class="info-item__icon"><el-icon><Calendar /></el-icon></div>
              <div>
                <div class="info-item__label">最后登录时间</div>
                <div class="info-item__value">{{ formatDate(me.updated_at) }}</div>
              </div>
            </div>
          </div>
          <div class="profile-foot">
            <el-button class="btn-primary" size="large" @click="openEditSelf">
              <el-icon><Edit /></el-icon> 编辑个人信息
            </el-button>
          </div>
        </div>
      </div>
    </template>

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑教师' : '新增教师'" width="480px" destroy-on-close class="teacher-dialog">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="登录账号">
          <el-input v-model="editForm.username" placeholder="登录时使用的账号" />
        </el-form-item>
        <el-form-item :label="isEdit ? '新密码' : '密码'">
          <el-input v-model="editForm.password" type="password" show-password :placeholder="isEdit ? '留空则不修改' : '请输入密码'" />
        </el-form-item>
        <el-form-item label="花名">
          <div style="display:flex;gap:8px;width:100%">
            <el-input v-model="editForm.namePrefix" placeholder="请输入花名" style="flex:1" />
            <el-input v-model="editForm.nameSuffix" style="width:90px" />
          </div>
        </el-form-item>
        <el-form-item label="口令">
          <el-input v-model="editForm.key" placeholder="学生端验证用的口令" />
        </el-form-item>
        <el-form-item v-if="user.role === 'admin' && !isSelfEdit" label="角色">
          <el-select v-model="editForm.role" style="width:100%">
            <el-option label="教师" value="teacher" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" class="btn-primary" :loading="saving" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, inject, watch } from 'vue'
import { ElMessage } from 'element-plus'
import api from '../api.js'

const user = inject('user')

const teachers = ref([])
const me = ref({})
const dialogVisible = ref(false)
const isEdit = ref(false)
const isSelfEdit = ref(false)
const saving = ref(false)
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = 10
const editForm = reactive({
  id: null,
  username: '',
  password: '',
  namePrefix: '',
  nameSuffix: '老师',
  key: '',
  role: 'teacher',
})

const stats = computed(() => {
  const total = teachers.value.length
  const admins = teachers.value.filter(t => t.role === 'admin').length
  return { total, admins, teacherCount: total - admins }
})

const filteredTeachers = computed(() => {
  if (!searchQuery.value) return teachers.value
  const q = searchQuery.value.toLowerCase()
  return teachers.value.filter(t =>
    t.username?.toLowerCase().includes(q) ||
    t.display_name?.toLowerCase().includes(q) ||
    t.key?.toLowerCase().includes(q)
  )
})

const paginatedTeachers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredTeachers.value.slice(start, start + pageSize)
})

watch(searchQuery, () => { currentPage.value = 1 })

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

function formatDate(d) {
  if (!d) return '-'
  const o = new Date(d)
  return `${o.getFullYear()}-${String(o.getMonth() + 1).padStart(2, '0')}-${String(o.getDate()).padStart(2, '0')}`
}

async function copyKey(key) {
  // 优先使用现代 Clipboard API（HTTPS 环境）
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(key)
      ElMessage.success('口令已复制到剪贴板')
      return
    } catch (err) {
      console.error('Clipboard API failed:', err)
    }
  }

  // 降级方案：使用 execCommand（兼容 HTTP）
  try {
    const textarea = document.createElement('textarea')
    textarea.value = key
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    textarea.style.top = '0'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()

    const successful = document.execCommand('copy')
    document.body.removeChild(textarea)

    if (successful) {
      ElMessage.success('口令已复制到剪贴板')
    } else {
      throw new Error('execCommand copy failed')
    }
  } catch (err) {
    console.error('Copy failed:', err)
    ElMessage.error('复制失败，请手动复制')
  }
}

onMounted(() => {
  if (user.value.role === 'admin') loadTeachers()
  else loadMe()
})

async function loadTeachers() {
  const { data } = await api.get('/teachers')
  teachers.value = data
}

async function loadMe() {
  const { data } = await api.get('/auth/me')
  me.value = data
}

function resetForm() {
  editForm.id = null
  editForm.username = ''
  editForm.password = ''
  editForm.namePrefix = ''
  editForm.nameSuffix = '老师'
  editForm.key = ''
  editForm.role = 'teacher'
}

function openAdd() {
  resetForm()
  isEdit.value = false
  isSelfEdit.value = false
  dialogVisible.value = true
}

function parseDisplayName(full) {
  if (!full) return { prefix: '', suffix: '老师' }
  if (full.endsWith('老师')) return { prefix: full.slice(0, -2), suffix: '老师' }
  return { prefix: full, suffix: '' }
}

function openEdit(row) {
  editForm.id = row.id
  editForm.username = row.username
  editForm.password = ''
  const parsed = parseDisplayName(row.display_name)
  editForm.namePrefix = parsed.prefix
  editForm.nameSuffix = parsed.suffix
  editForm.key = row.key
  editForm.role = row.role
  isEdit.value = true
  isSelfEdit.value = false
  dialogVisible.value = true
}

function openEditSelf() {
  editForm.id = me.value.id
  editForm.username = me.value.username
  editForm.password = ''
  const fullName = me.value.display_name || me.value.displayName || ''
  const parsed = parseDisplayName(fullName)
  editForm.namePrefix = parsed.prefix
  editForm.nameSuffix = parsed.suffix
  editForm.key = me.value.key
  editForm.role = 'teacher'
  isEdit.value = true
  isSelfEdit.value = true
  dialogVisible.value = true
}

async function handleSave() {
  saving.value = true
  try {
    const displayName = editForm.namePrefix + editForm.nameSuffix
    if (isEdit.value) {
      const body = { username: editForm.username, displayName, key: editForm.key }
      if (editForm.password) body.password = editForm.password
      if (user.value.role === 'admin' && !isSelfEdit.value) body.role = editForm.role
      await api.put(`/teachers/${editForm.id}`, body)
      ElMessage.success('更新成功')
    } else {
      await api.post('/teachers', {
        username: editForm.username,
        password: editForm.password,
        displayName,
        key: editForm.key,
        role: editForm.role,
      })
      ElMessage.success('新增成功')
    }
    dialogVisible.value = false
    user.value.role === 'admin' ? loadTeachers() : loadMe()
  } finally {
    saving.value = false
  }
}

async function handleDelete(id) {
  await api.delete(`/teachers/${id}`)
  ElMessage.success('删除成功')
  loadTeachers()
}
</script>

<style scoped>
/* 工具栏 */
.toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; gap: 16px; }
.toolbar__search { max-width: 320px; }
.toolbar__search :deep(.el-input__wrapper) { border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }

/* 表格 */
.table-wrap { background: #fff; border-radius: 16px; padding: 4px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
:deep(.el-table) { --el-table-border-color: #f0f0f0; --el-table-header-bg-color: transparent; border-radius: 12px; }
:deep(.el-table th.el-table__cell) { background: transparent !important; font-weight: 600; color: #888; font-size: 13px; }
:deep(.el-table td.el-table__cell) { border-bottom: 1px solid #f5f5f5; }
:deep(.el-table .el-table__row:hover > td) { background: #f8f9ff !important; }

/* 分页 */
.pagination-wrap { display: flex; justify-content: center; margin-top: 20px; }
:deep(.el-pagination) { --el-pagination-button-bg-color: #fff; --el-pagination-hover-color: #667eea; }
:deep(.el-pagination .el-pager li.is-active) { background: #667eea !important; color: #fff; }

/* 教师单元格 */
.teacher-cell { display: flex; align-items: center; gap: 12px; }
.teacher-avatar { min-width: 40px; height: 40px; border-radius: 10px; color: #fff; font-weight: 700; font-size: 13px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 0 10px; box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3); }
.teacher-cell__info { display: flex; flex-direction: column; }
.teacher-cell__name { font-weight: 600; font-size: 14px; color: #1a1a2e; }
.teacher-cell__sub { font-size: 12px; color: #aaa; }

.key-cell { display: flex; align-items: center; gap: 6px; }
.cell-date { font-size: 13px; color: #999; }

/* 操作按钮 */
.action-group { display: flex; align-items: center; justify-content: center; gap: 4px; }
.action-btn { display: inline-flex; align-items: center; gap: 3px; padding: 5px 12px; border: none; border-radius: 8px; font-size: 13px; cursor: pointer; background: transparent; transition: all 0.2s; }
.action-btn--edit { color: #667eea; }
.action-btn--edit:hover { background: #f0f2ff; }
.action-btn--del { color: #e74c3c; }
.action-btn--del:hover { background: #fdf0ef; }

/* 个人资料 */
.profile-card { background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
.profile-top { position: relative; }
.profile-banner { position: relative; height: 140px; background: linear-gradient(135deg, #667eea, #764ba2); overflow: hidden; }
.profile-orb { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.08); }
.profile-orb--1 { width: 220px; height: 220px; top: -90px; right: -50px; animation: orb-float 6s ease-in-out infinite; }
.profile-orb--2 { width: 140px; height: 140px; bottom: -60px; left: 40px; animation: orb-float 8s ease-in-out infinite reverse; }
.profile-orb--3 { width: 70px; height: 70px; top: 25px; right: 140px; animation: orb-float 5s ease-in-out infinite 1s; }
@keyframes orb-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
.profile-avatar-area { display: flex; justify-content: center; margin-top: -44px; position: relative; z-index: 1; }
.profile-avatar { min-width: 88px; height: 88px; border-radius: 22px; color: #fff; font-size: 24px; font-weight: 700; display: flex; align-items: center; justify-content: center; padding: 0 20px; border: 4px solid #fff; box-shadow: 0 4px 14px rgba(102, 126, 234, 0.3); }
.profile-head { text-align: center; padding: 14px 24px 0; display: flex; align-items: center; justify-content: center; gap: 10px; }
.profile-name { margin: 0; font-size: 22px; font-weight: 700; color: #1a1a2e; }
.profile-body { padding: 24px 28px 28px; }
.info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 28px; }
.info-item { display: flex; align-items: center; gap: 14px; padding: 16px 18px; background: #f8f9ff; border-radius: 12px; transition: background 0.2s; }
.info-item:hover { background: #f0f2ff; }
.info-item__icon { width: 42px; height: 42px; border-radius: 10px; background: linear-gradient(135deg, #667eea, #764ba2); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.info-item__label { font-size: 12px; color: #999; margin-bottom: 2px; }
.info-item__value { font-size: 14px; font-weight: 500; color: #333; display: flex; align-items: center; gap: 6px; }
.profile-foot { display: flex; justify-content: center; }

/* 弹窗内部表单 */
:deep(.el-dialog__body .el-input__wrapper) { border-radius: 10px; }
:deep(.el-dialog__body .el-select .el-input__wrapper) { border-radius: 10px; }

/* 响应式 */
@media (max-width: 768px) {
  .toolbar { flex-direction: column; }
  .toolbar__search { max-width: 100%; width: 100%; }
  .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .profile-banner { height: 100px; }
  .profile-avatar { min-width: 64px; height: 64px; font-size: 18px; border-radius: 16px; }
  .profile-name { font-size: 18px; }
  .profile-body { padding: 16px; }
  .info-grid { grid-template-columns: 1fr; gap: 10px; }
  .info-item { padding: 12px 14px; }
  .info-item__icon { width: 36px; height: 36px; font-size: 16px; }
}
</style>

<style>
.teacher-dialog.el-dialog { border-radius: 16px !important; overflow: hidden; }
.teacher-dialog .el-dialog__header { margin-right: 0; padding: 20px 24px 16px; border-bottom: 1px solid #f0f0f0; background: #fafbff; }
.teacher-dialog .el-dialog__title { font-weight: 600; color: #1a1a2e; }
.teacher-dialog .el-dialog__body { padding: 24px; }
.teacher-dialog .el-dialog__footer { padding: 12px 24px 20px; }
</style>
