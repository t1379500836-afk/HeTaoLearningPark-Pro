import { ref } from 'vue'
import { useAuth } from './useAuth.js'
import { getMessages } from '@/config/messages.config.js'

export function useMessages() {
  const { teacherId } = useAuth()

  const teacherMessages = ref([])
  const publicWhispers = ref([])
  const isLoading = ref(false)
  const submitStatus = ref(null)

  // 历史悄悄话（弹窗内分页加载）
  const historyWhispers = ref([])
  const historyLoading = ref(false)
  const historyPage = ref(1)
  const historyPageSize = 10
  const historyTotal = ref(0)
  const historyRange = ref('all')
  const historyStartDate = ref(null)
  const historyEndDate = ref(null)

  // 从静态文件加载（即时渲染）
  function loadStatic() {
    if (!teacherId.value) return
    const data = getMessages(teacherId.value)
    teacherMessages.value = data.teacherMessages || []
  }

  // 从 API 获取最新数据
  async function fetchFresh() {
    if (!teacherId.value) return
    isLoading.value = true
    try {
      const res = await fetch(`/api/messages/teacher-messages?teacherId=${teacherId.value}`)
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

  // 获取历史悄悄话日期范围
  function getHistoryDateRange() {
    const d = new Date()
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    if (historyRange.value === 'custom' && historyStartDate.value && historyEndDate.value) {
      return { start: historyStartDate.value, end: historyEndDate.value }
    }
    if (historyRange.value === 'today') return { start: today, end: today }
    if (historyRange.value === '7d') {
      const ds = new Date(Date.now() - 6 * 86400000)
      const start = `${ds.getFullYear()}-${String(ds.getMonth() + 1).padStart(2, '0')}-${String(ds.getDate()).padStart(2, '0')}`
      return { start, end: today }
    }
    if (historyRange.value === '30d') {
      const ds = new Date(Date.now() - 29 * 86400000)
      const start = `${ds.getFullYear()}-${String(ds.getMonth() + 1).padStart(2, '0')}-${String(ds.getDate()).padStart(2, '0')}`
      return { start, end: today }
    }
    return { start: null, end: null }
  }

  // 分页获取历史悄悄话
  async function fetchHistoryWhispers(page = 1) {
    if (!teacherId.value) return
    historyPage.value = page
    historyLoading.value = true
    try {
      const { start, end } = getHistoryDateRange()
      const params = new URLSearchParams({
        teacherId: teacherId.value,
        page: page,
        pageSize: historyPageSize,
        ...(start && { startDate: start }),
        ...(end && { endDate: end })
      })
      const res = await fetch(`/api/messages/whispers/public?${params}`)
      if (res.ok) {
        const data = await res.json()
        historyWhispers.value = data.data || []
        historyTotal.value = data.total || 0
        const maxPage = Math.max(1, Math.ceil(historyTotal.value / historyPageSize))
        if (historyPage.value > maxPage) historyPage.value = maxPage
      }
    } catch (err) {
      console.error('获取历史悄悄话失败:', err)
    } finally {
      historyLoading.value = false
    }
  }

  // 获取公开的悄悄话（含回复）
  async function fetchPublicWhispers() {
    if (!teacherId.value) return
    try {
      const res = await fetch(`/api/messages/whispers/public?teacherId=${teacherId.value}`)
      if (res.ok) {
        const data = await res.json()
        publicWhispers.value = data.data || []
      }
    } catch (err) {
      console.error('获取公开悄悄话失败:', err)
    }
  }

  // 提交匿名悄悄话
  async function submitWhisper(content) {
    if (!teacherId.value || !content.trim()) return false
    submitStatus.value = 'submitting'
    try {
      const res = await fetch('/api/messages/whisper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacherId: teacherId.value, content: content.trim() })
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

  // 回复悄悄话（回复老师的回复）
  async function submitReply(whisperId, content) {
    if (!teacherId.value || !content.trim()) return false
    try {
      const res = await fetch(`/api/messages/whisper/${whisperId}/reply?teacherId=${teacherId.value}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content.trim() })
      })
      const data = await res.json()
      if (res.ok) {
        // 刷新历史记录
        await fetchHistoryWhispers(historyPage.value)
        return true
      } else {
        return { error: data.error }
      }
    } catch {
      return { error: '网络错误，请稍后重试' }
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
    publicWhispers,
    isLoading,
    submitStatus,
    loadStatic,
    fetchFresh,
    fetchPublicWhispers,
    submitWhisper,
    submitReply,
    formatTime,
    // 历史悄悄话（弹窗）
    historyWhispers,
    historyLoading,
    historyPage,
    historyPageSize,
    historyTotal,
    historyRange,
    historyStartDate,
    historyEndDate,
    fetchHistoryWhispers,
    getHistoryDateRange
  }
}
