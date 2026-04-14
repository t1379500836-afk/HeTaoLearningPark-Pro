import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/variables.css'
import { showLoading, waitForPageReady } from './composables/useLoading.js'

// CodeMirror JS (全局引入，用于Python编辑器)
import 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.js'
import 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/python/python.min.js'
import 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/addon/selection/active-line.min.js'
import 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/addon/edit/closebrackets.min.js'

// 路由切换时显示 loading
router.beforeEach((to, from, next) => {
  // 首次加载时不显示全局 loading（让页面自然加载）
  // 只在路由之间切换时显示
  if (from.matched.length > 0 && to.path !== from.path) {
    showLoading('加载中...')
  }
  next()
})

// 路由切换完成后等待页面就绪
router.afterEach(() => {
  waitForPageReady()
})

const app = createApp(App)
app.use(router)
app.mount('#app')
