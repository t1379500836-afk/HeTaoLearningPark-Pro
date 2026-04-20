import { watch } from 'vue'
import { getAuthState } from './useAuth.js'

const STORAGE_KEY = 'hetao_user_uuid'
const HEARTBEAT_SENT_KEY = 'hetao_heartbeat_sent'
const THREE_MINUTES = 60 * 1000 // 1分钟

function getOrCreateUUID() {
  // 测试：用 sessionStorage，关闭浏览器即清除。正式改回 localStorage
  let uuid = sessionStorage.getItem(STORAGE_KEY)
  if (!uuid) {
    // 兼容非 HTTPS 环境（crypto.randomUUID 需要安全上下文）
    uuid = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0
          const v = c === 'x' ? r : (r & 0x3 | 0x8)
          return v.toString(16)
        })
    sessionStorage.setItem(STORAGE_KEY, uuid)
  }
  return uuid
}

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function useDauTracker() {
  const { isAuthenticated, teacherKey } = getAuthState()

  // 当天是否已发送过
  function hasSentToday() {
    const sent = sessionStorage.getItem(HEARTBEAT_SENT_KEY)
    return sent === todayKey()
  }

  function markSent() {
    sessionStorage.setItem(HEARTBEAT_SENT_KEY, todayKey())
  }

  let timer = null

  function startTracking() {
    console.log('[DAU] startTracking called, timer:', !!timer, 'hasSentToday:', hasSentToday(), 'teacherKey:', teacherKey.value)
    if (timer || hasSentToday()) return

    timer = setTimeout(async () => {
      timer = null
      const key = teacherKey.value
      if (!key) return

      try {
        console.log('[DAU] sending heartbeat:', { teacherKey: key, uuid: getOrCreateUUID() })
        const res = await fetch('/api/stats/heartbeat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ teacherKey: key, uuid: getOrCreateUUID() })
        })
        console.log('[DAU] response:', res.status, await res.text())
        markSent()
      } catch (e) {
        console.error('[DAU] heartbeat failed:', e)
      }
    }, THREE_MINUTES)
  }

  watch(isAuthenticated, (authed) => {
    if (authed) {
      startTracking()
    } else {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    }
  }, { immediate: true })
}
