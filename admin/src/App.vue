<template>
  <Login v-if="!user" @login="onLogin" />
  <router-view v-else />
</template>

<script setup>
import { ref, provide } from 'vue'
import { useRouter } from 'vue-router'
import Login from './views/Login.vue'

const router = useRouter()
const user = ref(null)

const stored = localStorage.getItem('admin_user')
if (stored) {
  try { user.value = JSON.parse(stored) } catch {}
}

provide('user', user)

function onLogin(data) {
  localStorage.setItem('admin_token', data.token)
  localStorage.setItem('admin_user', JSON.stringify(data.teacher))
  user.value = data.teacher
  router.push('/stats')
}

function handleLogout() {
  localStorage.removeItem('admin_token')
  localStorage.removeItem('admin_user')
  user.value = null
}

provide('logout', handleLogout)
</script>
