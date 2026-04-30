import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/variables.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// CodeMirror JS (全局引入，用于Python编辑器)
import 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.js'
import 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/python/python.min.js'
import 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/addon/selection/active-line.min.js'
import 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/addon/edit/closebrackets.min.js'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
