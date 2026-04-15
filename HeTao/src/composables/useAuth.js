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
const showAuthModal = ref(false)
const authError = ref('')

// 初始化：从 sessionStorage 读取
const storedName = sessionStorage.getItem('auth_teacher_name')
if (storedName) {
  teacherName.value = storedName
}

export function useAuth() {
  // 是否已验证
  const isAuthenticated = computed(() => !!teacherName.value)

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
      sessionStorage.setItem('auth_teacher_name', result.teacherName)
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
    sessionStorage.removeItem('auth_teacher_name')
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
  showAuthModal,
  isAuthenticated: computed(() => !!teacherName.value)
})
