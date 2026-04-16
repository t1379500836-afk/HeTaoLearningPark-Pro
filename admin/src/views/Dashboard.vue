<template>
  <el-container class="dashboard">
    <!-- 移动端遮罩 -->
    <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false"></div>

    <!-- 侧边栏 -->
    <el-aside :width="sidebarCollapsed ? '64px' : '220px'" :class="['sidebar', { 'sidebar--open': sidebarOpen, 'sidebar--collapsed': sidebarCollapsed }]">
      <div class="sidebar-logo" @click="sidebarCollapsed && (sidebarCollapsed = false)">
        <svg class="sidebar-logo__svg" viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="rgba(255,255,255,0.15)"/><path d="M11 13h14v2H11zm0 5h10v2H11zm0 5h12v2H11z" fill="#fff"/></svg>
        <span class="sidebar-title">管理后台</span>
      </div>
      <el-menu
        :default-active="activeMenu"
        class="sidebar-menu"
        background-color="#1a1a2e"
        text-color="rgba(255,255,255,0.65)"
        active-text-color="#fff"
        @select="onMenuSelect"
      >
        <el-menu-item index="teachers">
          <el-icon><User /></el-icon>
          <span>教师管理</span>
        </el-menu-item>
      </el-menu>
      <div class="sidebar-footer">
        <button class="collapse-btn" @click="sidebarCollapsed = !sidebarCollapsed">
          <el-icon :size="18"><Fold v-if="!sidebarCollapsed" /><Expand v-else /></el-icon>
        </button>
      </div>
    </el-aside>

    <!-- 右侧主体 -->
    <el-container>
      <!-- 顶栏（不动） -->
      <el-header class="header">
        <div class="header-left">
          <button class="mobile-menu-btn" @click="sidebarOpen = !sidebarOpen">
            <el-icon :size="20"><Expand /></el-icon>
          </button>
          <h4 class="page-title">{{ pageTitle }}</h4>
        </div>
        <div class="header-right">
          <el-icon><UserFilled /></el-icon>
          <span class="user-name">{{ user.displayName }}</span>
          <el-tag :type="user.role === 'admin' ? 'danger' : 'primary'" size="small" effect="dark" round>
            {{ user.role === 'admin' ? '管理员' : '教师' }}
          </el-tag>
          <el-divider direction="vertical" />
          <el-button text @click="$emit('logout')">
            <el-icon><SwitchButton /></el-icon> 退出
          </el-button>
        </div>
      </el-header>

      <!-- 内容区 -->
      <el-main class="main-content">
        <template v-if="activeMenu === 'teachers'">

          <!-- ====== Admin 视图 ====== -->
          <template v-if="user.role === 'admin'">
            <!-- 统计卡片 -->
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

            <!-- 搜索 + 新增 -->
            <div class="toolbar">
              <el-input
                v-model="searchQuery"
                placeholder="搜索账号、花名或口令…"
                prefix-icon="Search"
                clearable
                class="toolbar__search"
              />
              <el-button type="primary" class="btn-primary" @click="openAdd">
                <el-icon><Plus /></el-icon> 新增教师
              </el-button>
            </div>

            <!-- 表格 -->
            <div class="table-wrap">
              <el-table :data="filteredTeachers" style="width:100%">
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
          </template>

          <!-- ====== Teacher 个人资料 ====== -->
          <template v-else>
            <div class="profile-card">
              <!-- 顶部：横幅 + 头像 + 姓名 -->
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
              <!-- 主体：信息网格 + 操作 -->
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
        </template>
      </el-main>
    </el-container>

    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑教师' : '新增教师'"
      width="480px"
      destroy-on-close
      class="teacher-dialog"
    >
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="登录账号">
          <el-input v-model="editForm.username" placeholder="登录时使用的账号" />
        </el-form-item>
        <el-form-item :label="isEdit ? '新密码' : '密码'">
          <el-input v-model="editForm.password" type="password" show-password
            :placeholder="isEdit ? '留空则不修改' : '请输入密码'" />
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
  </el-container>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import api from '../api.js'

const props = defineProps({ user: Object })
defineEmits(['logout'])

const activeMenu = ref('teachers')
const sidebarOpen = ref(false)
const sidebarCollapsed = ref(false)
const pageTitle = ref('教师管理')
const teachers = ref([])
const me = ref({})
const dialogVisible = ref(false)
const isEdit = ref(false)
const isSelfEdit = ref(false)
const saving = ref(false)
const searchQuery = ref('')
const editForm = reactive({
  id: null,
  username: '',
  password: '',
  namePrefix: '',
  nameSuffix: '老师',
  key: '',
  role: 'teacher',
})

/* ---- 统计 ---- */
const stats = computed(() => {
  const total = teachers.value.length
  const admins = teachers.value.filter(t => t.role === 'admin').length
  return { total, admins, teacherCount: total - admins }
})

/* ---- 搜索过滤 ---- */
const filteredTeachers = computed(() => {
  if (!searchQuery.value) return teachers.value
  const q = searchQuery.value.toLowerCase()
  return teachers.value.filter(t =>
    t.username?.toLowerCase().includes(q) ||
    t.display_name?.toLowerCase().includes(q) ||
    t.key?.toLowerCase().includes(q)
  )
})

/* ---- 工具函数 ---- */
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
  try {
    await navigator.clipboard.writeText(key)
    ElMessage.success('口令已复制到剪贴板')
  } catch {
    ElMessage.error('复制失败，请手动复制')
  }
}

/* ---- 生命周期 ---- */
onMounted(() => {
  if (props.user.role === 'admin') loadTeachers()
  else loadMe()
})

function onMenuSelect(index) {
  activeMenu.value = index
  sidebarOpen.value = false
}

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
      if (props.user.role === 'admin' && !isSelfEdit.value) body.role = editForm.role
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
    props.user.role === 'admin' ? loadTeachers() : loadMe()
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
.dashboard { height: 100vh; }

/* ============ 侧边栏 ============ */
.sidebar {
  background: #1a1a2e;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
}
.sidebar-logo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 20px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  overflow: hidden;
  white-space: nowrap;
  transition: padding 0.3s ease;
}
.sidebar-logo__svg {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  transition: width 0.3s ease, height 0.3s ease;
}
.sidebar--collapsed .sidebar-logo {
  padding: 20px 8px;
  justify-content: center;
}
.sidebar--collapsed .sidebar-logo__svg {
  width: 40px;
  height: 40px;
}
.sidebar-title {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  overflow: hidden;
  transition: opacity 0.2s, width 0.3s, margin 0.3s;
}
.sidebar--collapsed .sidebar-title {
  opacity: 0;
  width: 0;
  margin: 0;
  gap: 0;
}
.sidebar-menu {
  border-right: none !important;
  flex: 1;
  padding-top: 8px;
}
.sidebar-menu .el-menu-item {
  margin: 4px 8px;
  border-radius: 8px;
  height: 44px;
  line-height: 44px;
  overflow: hidden;
  white-space: nowrap;
  transition: padding 0.3s ease, justify-content 0s;
}
.sidebar-menu .el-menu-item .el-icon {
  flex-shrink: 0;
}
.sidebar-menu .el-menu-item span {
  overflow: hidden;
  transition: opacity 0.2s;
}
.sidebar--collapsed .sidebar-menu .el-menu-item {
  padding-left: 0 !important;
  padding-right: 0 !important;
  justify-content: center;
}
.sidebar--collapsed .sidebar-menu .el-menu-item span {
  opacity: 0;
  width: 0;
  display: none;
}
.sidebar-menu .el-menu-item.is-active {
  background: linear-gradient(135deg, #667eea, #764ba2) !important;
  color: #fff !important;
}

/* 折叠按钮 */
.sidebar-footer {
  padding: 12px;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.collapse-btn {
  width: 100%;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.65);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;
}
.collapse-btn:hover {
  background: rgba(255,255,255,0.12);
  color: #fff;
}

/* ============ 顶栏 ============ */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 24px;
  height: 56px;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}
.page-title { margin: 0; font-size: 16px; font-weight: 600; color: #1a1a2e; }
.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
}
.user-name { font-weight: 500; color: #333; }

/* ============ 内容区 ============ */
.main-content {
  background: #f0f2f5;
  padding: 24px;
  overflow-y: auto;
}

/* ---- 统计卡片（统一渐变） ---- */
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}
.stat-card {
  position: relative;
  border-radius: 16px;
  padding: 22px 24px;
  color: #fff;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea, #764ba2);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.25);
  transition: transform 0.3s, box-shadow 0.3s;
}
.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(102, 126, 234, 0.35);
}
.stat-card__shine {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 85% 15%, rgba(255,255,255,0.18) 0%, transparent 55%);
  pointer-events: none;
}
.stat-card__body {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
}
.stat-card__icon {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.stat-card__num {
  font-size: 30px;
  font-weight: 700;
  line-height: 1;
}
.stat-card__label {
  font-size: 13px;
  opacity: 0.85;
  margin-top: 4px;
}

/* ---- 工具栏 ---- */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;
}
.toolbar__search { max-width: 320px; }
.toolbar__search :deep(.el-input__wrapper) {
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

/* 主按钮（统一渐变 + 白色文字） */
.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2) !important;
  border: none !important;
  border-radius: 10px !important;
  color: #fff !important;
  font-weight: 500;
  transition: opacity 0.2s, transform 0.2s;
}
.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* ---- 表格 ---- */
.table-wrap {
  background: #fff;
  border-radius: 16px;
  padding: 4px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

:deep(.el-table) {
  --el-table-border-color: #f0f0f0;
  --el-table-header-bg-color: transparent;
  border-radius: 12px;
}
:deep(.el-table th.el-table__cell) {
  background: transparent !important;
  font-weight: 600;
  color: #888;
  font-size: 13px;
}
:deep(.el-table td.el-table__cell) {
  border-bottom: 1px solid #f5f5f5;
}
:deep(.el-table .el-table__row:hover > td) {
  background: #f8f9ff !important;
}

/* 教师单元格 */
.teacher-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}
.teacher-avatar {
  min-width: 40px;
  height: 40px;
  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0 10px;
  box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3);
}
.teacher-cell__info { display: flex; flex-direction: column; }
.teacher-cell__name { font-weight: 600; font-size: 14px; color: #1a1a2e; }
.teacher-cell__sub  { font-size: 12px; color: #aaa; }

/* 口令 */
.key-cell { display: flex; align-items: center; gap: 6px; }
.key-code {
  background: #f5f7fa;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 13px;
  color: #667eea;
  font-family: 'SF Mono', Consolas, monospace;
}
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #bbb;
  cursor: pointer;
  transition: all 0.2s;
}
.icon-btn:hover {
  background: #f0f2ff;
  color: #667eea;
}

/* 角色徽章（统一色系） */
.role-badge {
  display: inline-block;
  padding: 3px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color: #fff;
}
.role-badge--admin   { background: #764ba2; }
.role-badge--teacher { background: #667eea; }

.cell-date { font-size: 13px; color: #999; }

/* 操作按钮 */
.action-group { display: flex; align-items: center; justify-content: center; gap: 4px; }
.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 5px 12px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  background: transparent;
  transition: all 0.2s;
}
.action-btn--edit { color: #667eea; }
.action-btn--edit:hover { background: #f0f2ff; }
.action-btn--del  { color: #e74c3c; }
.action-btn--del:hover  { background: #fdf0ef; }

/* ============ Teacher 个人资料（满宽） ============ */
.profile-card {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
}

/* 顶部区域 */
.profile-top {
  position: relative;
}

/* 横幅 */
.profile-banner {
  position: relative;
  height: 140px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  overflow: hidden;
}
.profile-orb {
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
}
.profile-orb--1 { width: 220px; height: 220px; top: -90px; right: -50px; animation: orb-float 6s ease-in-out infinite; }
.profile-orb--2 { width: 140px; height: 140px; bottom: -60px; left: 40px; animation: orb-float 8s ease-in-out infinite reverse; }
.profile-orb--3 { width: 70px;  height: 70px;  top: 25px; right: 140px; animation: orb-float 5s ease-in-out infinite 1s; }

@keyframes orb-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-12px); }
}

/* 头像 */
.profile-avatar-area {
  display: flex;
  justify-content: center;
  margin-top: -44px;
  position: relative;
  z-index: 1;
}
.profile-avatar {
  min-width: 88px;
  height: 88px;
  border-radius: 22px;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  border: 4px solid #fff;
  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.3);
}

/* 姓名 */
.profile-head {
  text-align: center;
  padding: 14px 24px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.profile-name {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #1a1a2e;
}

/* 主体区域 */
.profile-body {
  padding: 24px 28px 28px;
}

/* 信息网格（2列） */
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-bottom: 28px;
}
.info-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  background: #f8f9ff;
  border-radius: 12px;
  transition: background 0.2s;
}
.info-item:hover { background: #f0f2ff; }
.info-item__icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}
.info-item__label { font-size: 12px; color: #999; margin-bottom: 2px; }
.info-item__value {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
  gap: 6px;
}

.profile-foot {
  display: flex;
  justify-content: center;
}

/* 汉堡菜单按钮（仅移动端） */
.mobile-menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #666;
  cursor: pointer;
  transition: background 0.2s;
}
.mobile-menu-btn:hover { background: #f0f2f5; }

/* 侧边栏遮罩 */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 99;
}

/* ============ 弹窗内部表单 ============ */
:deep(.el-dialog__body .el-input__wrapper) {
  border-radius: 10px;
}
:deep(.el-dialog__body .el-select .el-input__wrapper) {
  border-radius: 10px;
}

/* ============ 响应式 ============ */
@media (max-width: 768px) {
  /* 侧边栏抽屉 */
  .sidebar {
    position: fixed;
    top: 0;
    left: -220px;
    bottom: 0;
    z-index: 100;
    transition: left 0.3s ease;
  }
  .sidebar--open { left: 0; width: 220px !important; }

  /* 移动端始终展开菜单，隐藏折叠按钮 */
  .sidebar-footer { display: none; }
  .sidebar--collapsed .sidebar-logo { padding: 20px 16px; justify-content: flex-start; }
  .sidebar--collapsed .sidebar-logo__svg { width: 36px; height: 36px; }
  .sidebar--collapsed .sidebar-title { opacity: 1; }
  .sidebar--collapsed .sidebar-menu .el-menu-item { padding-left: inherit !important; padding-right: inherit !important; justify-content: flex-start; }
  .sidebar--collapsed .sidebar-menu .el-menu-item span { opacity: 1; width: auto; display: inline; }

  /* 顶栏 */
  .mobile-menu-btn { display: inline-flex; }
  .header { padding: 0 12px; }
  .header-left { gap: 8px; }
  .user-name { display: none; }

  /* 内容区 */
  .main-content { padding: 16px; }

  /* 统计卡片 */
  .stats-row { grid-template-columns: 1fr; gap: 12px; }
  .stat-card { padding: 16px 18px; }
  .stat-card__num { font-size: 24px; }
  .stat-card__icon { width: 42px; height: 42px; border-radius: 12px; }

  /* 工具栏 */
  .toolbar { flex-direction: column; }
  .toolbar__search { max-width: 100%; width: 100%; }

  /* 表格横向滚动 */
  .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }

  /* 个人资料 */
  .profile-banner { height: 100px; }
  .profile-avatar { min-width: 64px; height: 64px; font-size: 18px; border-radius: 16px; }
  .profile-name { font-size: 18px; }
  .profile-body { padding: 16px; }
  .info-grid { grid-template-columns: 1fr; gap: 10px; }
  .info-item { padding: 12px 14px; }
  .info-item__icon { width: 36px; height: 36px; font-size: 16px; }
}

@media (max-width: 1024px) and (min-width: 769px) {
  .stats-row { gap: 12px; }
  .stat-card { padding: 18px 20px; }
}
</style>

<style>
/* 弹窗外壳（teleported，需非 scoped） */
.teacher-dialog.el-dialog {
  border-radius: 16px !important;
  overflow: hidden;
}
.teacher-dialog .el-dialog__header {
  margin-right: 0;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #f0f0f0;
  background: #fafbff;
}
.teacher-dialog .el-dialog__title {
  font-weight: 600;
  color: #1a1a2e;
}
.teacher-dialog .el-dialog__body {
  padding: 24px;
}
.teacher-dialog .el-dialog__footer {
  padding: 12px 24px 20px;
}
@media (max-width: 768px) {
  .teacher-dialog.el-dialog {
    width: 92% !important;
    margin: 0 auto;
  }
  .teacher-dialog .el-dialog__header {
    padding: 16px 18px 12px;
  }
  .teacher-dialog .el-dialog__body {
    padding: 18px;
  }
}
</style>
