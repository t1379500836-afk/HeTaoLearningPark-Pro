import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { initDatabase } from './db.js'
import authRoutes from './routes/auth.js'
import teacherRoutes from './routes/teachers.js'

const app = express()
const PORT = process.env.PORT || 3000

// 中间件
app.use(cors())
app.use(express.json())

// 路由
app.use('/api/auth', authRoutes)
app.use('/api/teachers', teacherRoutes)

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
