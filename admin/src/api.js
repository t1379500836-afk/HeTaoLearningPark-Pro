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
    if (err.response?.status === 401) {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
      window.location.reload()
    } else {
      ElMessage.error(msg)
    }
    return Promise.reject(err)
  }
)

export default api
