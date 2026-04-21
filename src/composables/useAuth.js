/**
 * 教师口令验证状态管理
 *
 * 使用 sessionStorage 存储：
 * - 同一会话内刷新页面不需要重新输入
 * - 关闭标签页/浏览器后需要重新输入
 */
import { ref, computed } from 'vue'
import { validateKey } from '@/config/teachers.config.js'

// 响应式状态
const teacherName = ref(null)
const teacherId = ref(null)
const teacherKey = ref(null)
const showAuthModal = ref(false)
const authError = ref('')

// 初始化：从 sessionStorage 读取
const storedName = sessionStorage.getItem('auth_teacher_name')
const storedId = sessionStorage.getItem('auth_teacher_id')
const storedKey = sessionStorage.getItem('auth_teacher_key')
if (storedName) {
  teacherName.value = storedName
}
if (storedId) {
  teacherId.value = Number(storedId)
}
if (storedKey) {
  teacherKey.value = storedKey
}

export function useAuth() {
  // 是否已验证
  const isAuthenticated = computed(() => !!teacherId.value)

  // 需要显示验证弹窗
  const needAuth = computed(() => !isAuthenticated.value)

  /**
   * 验证口令
   * @param {string} inputKey - 用户输入的口令
   * @returns {boolean} - 是否验证成功
   */
  const authenticate = (inputKey) => {
    const result = validateKey(inputKey.trim())

    if (result.valid) {
      teacherName.value = result.teacherName
      teacherId.value = result.teacherId
      teacherKey.value = inputKey.trim()
      sessionStorage.setItem('auth_teacher_name', result.teacherName)
      sessionStorage.setItem('auth_teacher_id', String(result.teacherId))
      sessionStorage.setItem('auth_teacher_key', inputKey.trim())
      showAuthModal.value = false
      authError.value = ''
      return true
    } else {
      authError.value = '暗号不对哦~'
      return false
    }
  }

  /**
   * 登出（清除验证状态）
   */
  const logout = () => {
    teacherName.value = null
    teacherId.value = null
    teacherKey.value = null
    sessionStorage.removeItem('auth_teacher_name')
    sessionStorage.removeItem('auth_teacher_id')
    sessionStorage.removeItem('auth_teacher_key')
    showAuthModal.value = true
  }

  /**
   * 显示验证弹窗
   */
  const openAuthModal = () => {
    showAuthModal.value = true
  }

  /**
   * 清除错误信息
   */
  const clearError = () => {
    authError.value = ''
  }

  return {
    teacherName,
    teacherId,
    teacherKey,
    showAuthModal,
    authError,
    isAuthenticated,
    needAuth,
    authenticate,
    logout,
    openAuthModal,
    clearError
  }
}

// 导出单例状态（供路由守卫使用）
export const getAuthState = () => ({
  teacherName,
  teacherId,
  teacherKey,
  showAuthModal,
  isAuthenticated: computed(() => !!teacherId.value)
})
