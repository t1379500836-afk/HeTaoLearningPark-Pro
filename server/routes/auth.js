import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../db.js'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'

/**
 * POST /api/auth/login
 * 教师登录，返回 JWT
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: '请输入用户名和密码' })
  }

  try {
    const [rows] = await pool.execute(
      'SELECT id, username, password_hash, role, display_name, `key`, status FROM teachers WHERE username = ?',
      [username]
    )

    const teacher = rows[0]
    if (!teacher || teacher.status === 'disabled') {
      return res.status(401).json({ error: '账号不存在' })
    }

    const valid = await bcrypt.compare(password, teacher.password_hash)
    if (!valid) {
      return res.status(401).json({ error: '用户名或密码错误' })
    }

    const token = jwt.sign(
      { id: teacher.id, username: teacher.username, role: teacher.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // 更新登录时间
    pool.execute('UPDATE teachers SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [teacher.id]).catch(() => {})

    res.json({
      token,
      teacher: {
        id: teacher.id,
        username: teacher.username,
        role: teacher.role,
        displayName: teacher.display_name,
        key: teacher.key,
      },
    })
  } catch (err) {
    console.error('登录失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

/**
 * GET /api/auth/me
 * 获取当前登录用户信息
 */
router.get('/me', async (req, res) => {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: '未登录' })
  }

  try {
    const token = header.slice(7)
    const decoded = jwt.verify(token, JWT_SECRET)

    const [rows] = await pool.execute(
      'SELECT id, username, role, display_name, `key`, updated_at FROM teachers WHERE id = ? AND status = ?',
      [decoded.id, 'active']
    )

    const teacher = rows[0]
    if (!teacher) {
      return res.status(401).json({ error: '账号已被禁用' })
    }

    res.json({
      id: teacher.id,
      username: teacher.username,
      role: teacher.role,
      displayName: teacher.display_name,
      key: teacher.key,
      updated_at: teacher.updated_at,
    })
  } catch {
    res.status(401).json({ error: '登录已过期' })
  }
})

export default router
