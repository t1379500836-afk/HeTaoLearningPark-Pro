import { watch } from 'vue'
import { getAuthState } from './useAuth.js'

const STORAGE_KEY = 'hetao_user_uuid'
const HEARTBEAT_SENT_KEY = 'hetao_heartbeat_sent'
const THREE_MINUTES = 1 * 1000 // 测试：1秒，正式改为 3 * 60 * 1000

function getOrCreateUUID() {
  // 测试：用 sessionStorage，关闭浏览器即清除。正式改回 localStorage
  let uuid = sessionStorage.getItem(STORAGE_KEY)
  if (!uuid) {
    uuid = crypto.randomUUID()
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
