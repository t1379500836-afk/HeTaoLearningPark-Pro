import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { resolve } from 'path'
import { initDatabase } from './db.js'
import authRoutes from './routes/auth.js'
import teacherRoutes from './routes/teachers.js'
import statsRoutes from './routes/stats.js'
import messageRoutes from './routes/messages.js'
import tagRoutes from './routes/tags.js'
import questionRoutes from './routes/questions.js'
import libraryRoutes from './routes/library.js'
import yclScoreRoutes from './routes/ycl-scores.js'

const app = express()
const PORT = process.env.PORT || 3000

// 中间件
app.use(cors())
app.use(express.json())

// 配置文件静态服务
const { existsSync } = await import('fs')
const PROJECT_ROOT = resolve(process.cwd())
const userSrcPath = resolve(PROJECT_ROOT, 'user/src')
const srcPath = resolve(PROJECT_ROOT, 'src')
const configPath = existsSync(userSrcPath) ? userSrcPath : srcPath

app.use('/src/config', express.static(resolve(configPath, 'config')))

// 路由
app.use('/api/auth', authRoutes)
app.use('/api/teachers', teacherRoutes)
app.use('/api/stats', statsRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/questions/tags', tagRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/library', libraryRoutes)
app.use('/api/ycl', yclScoreRoutes)

// 启动
async function start() {
  await initDatabase()
  app.listen(PORT, () => {
    console.log(`后端服务已启动: http://localhost:${PORT}`)
  })
}

start().catch(err => {
  console.error('启动失败:', err)
  process.exit(1)
})
