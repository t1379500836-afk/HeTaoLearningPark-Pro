<template>
  <div class="login-page">
    <!-- 背景装饰 -->
    <div class="bg-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>

    <div class="login-card">
      <div class="card-header">
        <div class="logo-icon">
          <svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="rgba(255,255,255,0.2)"/><path d="M16 18h16v2H16zm0 6h12v2H16zm0 6h14v2H16z" fill="#fff"/><circle cx="34" cy="28" r="6" fill="rgba(255,255,255,0.3)"/></svg>
        </div>
        <h1>核桃学习平台</h1>
        <p>管理后台</p>
      </div>

      <el-form :model="form" @submit.prevent="handleLogin" class="login-form">
        <el-form-item>
          <el-input v-model="form.username" placeholder="请输入用户名" size="large" prefix-icon="User" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" placeholder="请输入密码" size="large" prefix-icon="Lock" show-password />
        </el-form-item>
        <el-button type="primary" :loading="loading" native-type="submit" size="large" class="login-btn">
          登 录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import api from '../api.js'

const emit = defineEmits(['login'])

const form = reactive({ username: '', password: '' })
const loading = ref(false)

async function handleLogin() {
  if (!form.username || !form.password) {
    return ElMessage.warning('请输入用户名和密码')
  }
  loading.value = true
  try {
    const { data } = await api.post('/auth/login', form)
    ElMessage.success(`欢迎，${data.teacher.displayName}`)
    emit('login', data)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

/* 背景浮动圆 */
.bg-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.12;
  background: #fff;
}
.shape-1 { width: 300px; height: 300px; top: -80px; right: -60px; animation: float 8s ease-in-out infinite; }
.shape-2 { width: 200px; height: 200px; bottom: -40px; left: -40px; animation: float 6s ease-in-out infinite reverse; }
.shape-3 { width: 120px; height: 120px; top: 40%; left: 10%; animation: float 10s ease-in-out infinite; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* 登录卡片 */
.login-card {
  position: relative;
  z-index: 1;
  width: 420px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 48px 40px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.card-header {
  text-align: center;
  margin-bottom: 36px;
}
.logo-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
}
.logo-icon svg {
  width: 100%;
  height: 100%;
}
.card-header h1 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #1a1a2e;
}
.card-header p {
  margin: 6px 0 0;
  font-size: 14px;
  color: #888;
  letter-spacing: 4px;
}

.login-form :deep(.el-input__wrapper) {
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 4px 12px;
}

.login-btn {
  width: 100%;
  height: 44px;
  border-radius: 10px;
  font-size: 16px;
  margin-top: 8px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
}
.login-btn:hover {
  opacity: 0.92;
}
</style>
