import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/variables.css'

// CodeMirror JS (全局引入，用于Python编辑器)
import 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.js'
import 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/python/python.min.js'
import 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/addon/selection/active-line.min.js'
import 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/addon/edit/closebrackets.min.js'

const app = createApp(App)
app.use(router)
app.mount('#app')
