<template>
  <el-container class="dashboard">
    <!-- 侧边栏 -->
    <el-aside width="220px" class="sidebar">
      <div class="sidebar-logo">
        <svg viewBox="0 0 36 36" fill="none" width="32" height="32"><rect width="36" height="36" rx="8" fill="rgba(255,255,255,0.15)"/><path d="M11 13h14v2H11zm0 5h10v2H11zm0 5h12v2H11z" fill="#fff"/></svg>
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
        <!-- 后续在此添加更多菜单项 -->
      </el-menu>
    </el-aside>

    <!-- 右侧主体 -->
    <el-container>
      <!-- 顶栏 -->
      <el-header class="header">
        <h4 class="page-title">{{ pageTitle }}</h4>
        <div class="header-right">
          <el-icon><UserFilled /></el-icon>
          <span class="user-name">{{ user.displayName }}</span>
          <el-tag :type="user.role === 'admin' ? 'danger' : ''" size="small" effect="dark" round>
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
        <!-- ========== 教师管理页 ========== -->
        <template v-if="activeMenu === 'teachers'">
          <!-- admin：全部教师表格 -->
          <template v-if="user.role === 'admin'">
            <div class="content-toolbar">
              <el-button type="primary" @click="openAdd">
                <el-icon><Plus /></el-icon> 新增教师
              </el-button>
            </div>

            <el-table :data="teachers" stripe style="width:100%" row-class-name="table-row">
              <el-table-column prop="id" label="ID" width="60" align="center" />
              <el-table-column prop="username" label="登录账号" width="130" />
              <el-table-column prop="display_name" label="花名" width="120" />
              <el-table-column prop="key" label="口令" min-width="180" show-overflow-tooltip />
              <el-table-column prop="role" label="角色" width="90" align="center">
                <template #default="{ row }">
                  <el-tag :type="row.role === 'admin' ? 'danger' : 'info'" size="small" effect="plain" round>
                    {{ row.role === 'admin' ? '管理员' : '教师' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150" align="center">
                <template #default="{ row }">
                  <el-button link type="primary" size="small" @click="openEdit(row)">编辑</el-button>
                  <el-popconfirm title="确认删除该教师？" @confirm="handleDelete(row.id)">
                    <template #reference>
                      <el-button link type="danger" size="small">删除</el-button>
                    </template>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </template>

          <!-- teacher：个人信息卡片 -->
          <template v-else>
            <div class="profile-card">
              <el-descriptions :column="1" border>
                <el-descriptions-item label="登录账号">{{ me.username }}</el-descriptions-item>
                <el-descriptions-item label="花名">{{ me.display_name || me.displayName }}</el-descriptions-item>
                <el-descriptions-item label="口令">{{ me.key }}</el-descriptions-item>
                <el-descriptions-item label="角色">
                  <el-tag type="info" size="small" effect="plain" round>教师</el-tag>
                </el-descriptions-item>
              </el-descriptions>
              <el-button type="primary" style="margin-top:20px" @click="openEditSelf">
                <el-icon><Edit /></el-icon> 编辑信息
              </el-button>
            </div>
          </template>
        </template>
      </el-main>
    </el-container>

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑教师' : '新增教师'" width="480px" destroy-on-close>
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
            <el-input v-model="editForm.namePrefix" placeholder="如：吉祥" style="flex:1" />
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
        <el-button type="primary" :loading="saving" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </el-container>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import api from '../api.js'

const props = defineProps({ user: Object })
defineEmits(['logout'])

const activeMenu = ref('teachers')
const pageTitle = ref('教师管理')
const teachers = ref([])
const me = ref({})
const dialogVisible = ref(false)
const isEdit = ref(false)
const isSelfEdit = ref(false)
const saving = ref(false)
const editForm = reactive({
  id: null,
  username: '',
  password: '',
  namePrefix: '',
  nameSuffix: '老师',
  key: '',
  role: 'teacher',
})

onMounted(() => {
  if (props.user.role === 'admin') loadTeachers()
  else loadMe()
})

function onMenuSelect(index) {
  activeMenu.value = index
  // 后续新增菜单时在此扩展 pageTitle 映射
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

/** 解析花名：如果以"老师"结尾则拆分，否则后缀为空 */
function parseDisplayName(full) {
  if (!full) return { prefix: '', suffix: '老师' }
  if (full.endsWith('老师')) {
    return { prefix: full.slice(0, -2), suffix: '老师' }
  }
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
.dashboard {
  height: 100vh;
}

/* ---- 侧边栏 ---- */
.sidebar {
  background: #1a1a2e;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.sidebar-title {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
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
}
.sidebar-menu .el-menu-item.is-active {
  background: linear-gradient(135deg, #667eea, #764ba2) !important;
  color: #fff !important;
}

/* ---- 顶栏 ---- */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 24px;
  height: 56px;
}
.page-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
}
.user-name {
  font-weight: 500;
  color: #333;
}

/* ---- 内容区 ---- */
.main-content {
  background: #f5f7fa;
  padding: 24px;
  overflow-y: auto;
}
.content-toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}
.profile-card {
  max-width: 560px;
  background: #fff;
  padding: 32px;
  border-radius: 12px;
}

/* ---- 表格微调 ---- */
:deep(.el-table) {
  border-radius: 8px;
  overflow: hidden;
}
:deep(.el-table th) {
  background: #fafafa !important;
  font-weight: 600;
}
</style>
