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
        :default-active="$route.name"
        class="sidebar-menu"
        background-color="#1a1a2e"
        text-color="rgba(255,255,255,0.65)"
        active-text-color="#fff"
        router
      >
        <el-menu-item index="stats">
          <el-icon><DataAnalysis /></el-icon>
          <span>数据统计</span>
        </el-menu-item>
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
          <el-button text @click="handleLogout">
            <el-icon><SwitchButton /></el-icon> 退出
          </el-button>
        </div>
      </el-header>

      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed, inject, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const user = inject('user')
const logout = inject('logout')

const sidebarOpen = ref(false)
const sidebarCollapsed = ref(false)

const PAGE_TITLES = { stats: '数据统计', teachers: '教师管理' }
const pageTitle = computed(() => PAGE_TITLES[route.name] || '数据统计')

function handleLogout() {
  logout()
}

// 路由切换时关闭移动端侧边栏
watch(() => route.name, () => { sidebarOpen.value = false })
</script>

<style scoped>
.dashboard { height: 100vh; }

/* 侧边栏 */
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
.sidebar-logo__svg { width: 36px; height: 36px; flex-shrink: 0; transition: width 0.3s ease, height 0.3s ease; }
.sidebar--collapsed .sidebar-logo { padding: 20px 8px; justify-content: center; }
.sidebar--collapsed .sidebar-logo__svg { width: 40px; height: 40px; }
.sidebar-title { color: #fff; font-size: 16px; font-weight: 600; letter-spacing: 1px; overflow: hidden; transition: opacity 0.2s, width 0.3s, margin 0.3s; }
.sidebar--collapsed .sidebar-title { opacity: 0; width: 0; margin: 0; gap: 0; }
.sidebar-menu { border-right: none !important; flex: 1; padding-top: 8px; }
.sidebar-menu .el-menu-item { margin: 4px 8px; border-radius: 8px; height: 44px; line-height: 44px; overflow: hidden; white-space: nowrap; transition: padding 0.3s ease, justify-content 0s; }
.sidebar-menu .el-menu-item .el-icon { flex-shrink: 0; }
.sidebar-menu .el-menu-item span { overflow: hidden; transition: opacity 0.2s; }
.sidebar--collapsed .sidebar-menu .el-menu-item { padding-left: 0 !important; padding-right: 0 !important; justify-content: center; }
.sidebar--collapsed .sidebar-menu .el-menu-item span { opacity: 0; width: 0; display: none; }
.sidebar-menu .el-menu-item.is-active { background: linear-gradient(135deg, #667eea, #764ba2) !important; color: #fff !important; }

.sidebar-footer { padding: 12px; border-top: 1px solid rgba(255,255,255,0.06); }
.collapse-btn { width: 100%; height: 36px; border: none; border-radius: 8px; background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.65); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s, color 0.2s; }
.collapse-btn:hover { background: rgba(255,255,255,0.12); color: #fff; }

/* 顶栏 */
.header { display: flex; justify-content: space-between; align-items: center; background: #fff; border-bottom: 1px solid #f0f0f0; padding: 0 24px; height: 56px; }
.header-left { display: flex; align-items: center; gap: 12px; min-width: 0; }
.page-title { margin: 0; font-size: 16px; font-weight: 600; color: #1a1a2e; }
.header-right { display: flex; align-items: center; gap: 8px; color: #666; font-size: 14px; }
.user-name { font-weight: 500; color: #333; }

/* 内容区 */
.main-content { background: #f0f2f5; padding: 24px; overflow-y: auto; }

/* 移动端菜单按钮 */
.mobile-menu-btn { display: none; align-items: center; justify-content: center; width: 36px; height: 36px; border: none; border-radius: 8px; background: transparent; color: #666; cursor: pointer; transition: background 0.2s; }
.mobile-menu-btn:hover { background: #f0f2f5; }

/* 侧边栏遮罩 */
.sidebar-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 99; }

/* 响应式 */
@media (max-width: 768px) {
  .sidebar { position: fixed; top: 0; left: -220px; bottom: 0; z-index: 100; transition: left 0.3s ease; }
  .sidebar--open { left: 0; width: 220px !important; }
  .sidebar-footer { display: none; }
  .sidebar--collapsed .sidebar-logo { padding: 20px 16px; justify-content: flex-start; }
  .sidebar--collapsed .sidebar-logo__svg { width: 36px; height: 36px; }
  .sidebar--collapsed .sidebar-title { opacity: 1; }
  .sidebar--collapsed .sidebar-menu .el-menu-item { padding-left: inherit !important; padding-right: inherit !important; justify-content: flex-start; }
  .sidebar--collapsed .sidebar-menu .el-menu-item span { opacity: 1; width: auto; display: inline; }
  .mobile-menu-btn { display: inline-flex; }
  .header { padding: 0 12px; }
  .header-left { gap: 8px; }
  .user-name { display: none; }
  .main-content { padding: 16px; }
}
</style>
