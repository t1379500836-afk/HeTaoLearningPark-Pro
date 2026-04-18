import { ref } from 'vue'
import { useAuth } from './useAuth.js'
import { getMessages } from '@/config/messages.config.js'

export function useMessages() {
  const { teacherKey } = useAuth()

  const teacherMessages = ref([])
  const isLoading = ref(false)
  const submitStatus = ref(null)

  // 从静态文件加载（即时渲染）
  function loadStatic() {
    if (!teacherKey.value) return
    const data = getMessages(teacherKey.value)
    teacherMessages.value = data.teacherMessages || []
  }

  // 从 API 获取最新数据
  async function fetchFresh() {
    if (!teacherKey.value) return
    isLoading.value = true
    try {
      const res = await fetch(`/api/messages/teacher-messages?teacherKey=${encodeURIComponent(teacherKey.value)}`)
      if (res.ok) {
        const data = await res.json()
        teacherMessages.value = data.data || []
      }
    } catch (err) {
      console.error('获取寄语失败:', err)
    } finally {
      isLoading.value = false
    }
  }

  // 提交匿名悄悄话
  async function submitWhisper(content) {
    if (!teacherKey.value || !content.trim()) return false
    submitStatus.value = 'submitting'
    try {
      const res = await fetch('/api/messages/whisper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacherKey: teacherKey.value, content: content.trim() })
      })
      const data = await res.json()
      if (res.ok) {
        submitStatus.value = 'success'
        setTimeout(() => { submitStatus.value = null }, 2000)
        return true
      } else {
        submitStatus.value = { error: data.error }
        return false
      }
    } catch {
      submitStatus.value = { error: '网络错误，请稍后重试' }
      return false
    }
  }

  function formatTime(isoString) {
    if (!isoString) return ''
    const d = new Date(isoString)
    const month = d.getMonth() + 1
    const day = d.getDate()
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    return `${month}月${day}日 ${hours}:${minutes}`
  }

  return {
    teacherMessages,
    isLoading,
    submitStatus,
    loadStatic,
    fetchFresh,
    submitWhisper,
    formatTime
  }
}
