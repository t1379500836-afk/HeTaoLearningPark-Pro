<template>
  <Login v-if="!user" @login="onLogin" />
  <Dashboard v-else :user="user" @logout="onLogout" />
</template>

<script setup>
import { ref } from 'vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'

const user = ref(null)

// 初始化：从 localStorage 恢复登录状态
const stored = localStorage.getItem('admin_user')
if (stored) {
  try { user.value = JSON.parse(stored) } catch {}
}

function onLogin(data) {
  localStorage.setItem('admin_token', data.token)
  localStorage.setItem('admin_user', JSON.stringify(data.teacher))
  user.value = data.teacher
}

function onLogout() {
  localStorage.removeItem('admin_token')
  localStorage.removeItem('admin_user')
  user.value = null
}
</script>
