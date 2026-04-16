import axios from 'axios'
import { ElMessage } from 'element-plus'

const api = axios.create({
  baseURL: '/api',
})

// 请求拦截：自动带 token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截：统一错误处理
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.error || '请求失败'
    const status = err.response?.status
    const isLoginReq = err.config?.url?.includes('/auth/login')
    if (status === 401 && !isLoginReq) {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
      window.location.reload()
    }
    // 登录请求的错误由 Login 组件自己处理，不在此弹消息
    if (!isLoginReq) {
      ElMessage.error(msg)
    }
    return Promise.reject(err)
  }
)

export default api
