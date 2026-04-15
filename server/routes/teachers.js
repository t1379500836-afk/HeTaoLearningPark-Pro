import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { execSync } from 'child_process'
import { writeFile } from 'fs/promises'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import pool from '../db.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()
router.use(authMiddleware)

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = resolve(__dirname, '../..')
const CONFIG_PATH = resolve(PROJECT_ROOT, 'src/config/teachers.config.js')

// ==================== 工具函数 ====================

// 每 10 分钟检查一次，有变更才构建
let needsBuild = false
setInterval(() => {
  if (!needsBuild) return
  needsBuild = false
  runBuild()
}, 10 * 60 * 1000)
function scheduleBuild() {
  needsBuild = true
}

async function regenerateConfig() {
  const { existsSync } = await import('fs')

  // 生产环境没有 src 目录，跳过配置生成
  if (!existsSync(resolve(PROJECT_ROOT, 'src'))) {
    return
  }

  const [rows] = await pool.execute(
    'SELECT display_name, `key` FROM teachers ORDER BY id'
  )

  const escape = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  const entries = rows.map(r =>
    `  { key: '${escape(r.key)}', name: '${escape(r.display_name)}' }`
  )

  const content = `/**
 * 教师口令配置文件
 * 由后端服务自动生成，请勿手动编辑
 */

const teachers = [
${entries.join(',\n')}
]

const teachersMap = {}
teachers.forEach(teacher => {
  teachersMap[teacher.key] = teacher.name
})

export const validateKey = (inputKey) => {
  const teacherName = teachersMap[inputKey]
  return teacherName
    ? { valid: true, teacherName }
    : { valid: false, teacherName: null }
}

export default { validateKey }
`

  await writeFile(CONFIG_PATH, content, 'utf-8')
  console.log('已重新生成 teachers.config.js')
}

async function runBuild() {
  try {
    // 生产环境如果没有完整源码就跳过构建
    const { existsSync } = await import('fs')
    if (!existsSync(resolve(PROJECT_ROOT, 'src'))) {
      console.log('未检测到项目源码，跳过前端构建')
      return
    }
    console.log('开始构建前端...')
    execSync('npm run build', { cwd: PROJECT_ROOT, stdio: 'inherit' })
    console.log('前端构建完成')
  } catch (err) {
    console.error('前端构建失败:', err.message)
  }
}

/** 判断当前用户是否为管理员 */
function isAdmin(req) {
  return req.teacher.role === 'admin'
}

// ==================== CRUD ====================

/**
 * GET /api/teachers
 * admin 看到所有人，teacher 只看到自己
 */
router.get('/', async (req, res) => {
  try {
    if (isAdmin(req)) {
      const [rows] = await pool.execute(
        'SELECT id, username, role, display_name, `key`, created_at FROM teachers ORDER BY id'
      )
      return res.json(rows)
    }

    // 普通教师只返回自己
    const [rows] = await pool.execute(
      'SELECT id, username, role, display_name, `key`, created_at FROM teachers WHERE id = ?',
      [req.teacher.id]
    )
    res.json(rows)
  } catch (err) {
    console.error('查询教师失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

/**
 * POST /api/teachers
 * 仅 admin 可新增教师
 */
router.post('/', async (req, res) => {
  if (!isAdmin(req)) {
    return res.status(403).json({ error: '无权操作' })
  }

  const { username, password, displayName, key, role } = req.body

  if (!username || !password || !displayName || !key) {
    return res.status(400).json({ error: '缺少必填字段' })
  }

  try {
    const hash = await bcrypt.hash(password, 10)
    const teacherRole = role === 'admin' ? 'admin' : 'teacher'
    const [result] = await pool.execute(
      'INSERT INTO teachers (username, password_hash, role, display_name, `key`) VALUES (?, ?, ?, ?, ?)',
      [username, hash, teacherRole, displayName, key]
    )

    res.status(201).json({
      id: result.insertId,
      username,
      role: teacherRole,
      displayName,
      key,
    })

    // 非关键：配置更新和构建失败不影响 API 响应
    regenerateConfig().catch(e => console.error('配置更新失败:', e.message))
    scheduleBuild()
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: '用户名已存在' })
    }
    console.error('新增教师失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

/**
 * PUT /api/teachers/:id
 * admin 可改任意教师，teacher 只能改自己（不可改 role）
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params

  // teacher 只能改自己
  if (!isAdmin(req) && Number(id) !== req.teacher.id) {
    return res.status(403).json({ error: '无权操作' })
  }

  const { username, password, displayName, key, role } = req.body

  try {
    const updates = []
    const params = []

    if (username) { updates.push('username = ?'); params.push(username) }
    if (displayName) { updates.push('display_name = ?'); params.push(displayName) }
    if (key) { updates.push('`key` = ?'); params.push(key) }
    if (password) {
      const hash = await bcrypt.hash(password, 10)
      updates.push('password_hash = ?'); params.push(hash)
    }
    // 只有 admin 可以改 role
    if (role && isAdmin(req)) {
      updates.push('role = ?'); params.push(role === 'admin' ? 'admin' : 'teacher')
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: '没有需要更新的字段' })
    }

    params.push(id)
    const [result] = await pool.execute(
      `UPDATE teachers SET ${updates.join(', ')} WHERE id = ?`,
      params
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '教师不存在' })
    }

    res.json({ message: '更新成功' })

    regenerateConfig().catch(e => console.error('配置更新失败:', e.message))
    scheduleBuild()
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: '用户名已存在' })
    }
    console.error('修改教师失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

/**
 * DELETE /api/teachers/:id
 * 仅 admin 可删除教师
 */
router.delete('/:id', async (req, res) => {
  if (!isAdmin(req)) {
    return res.status(403).json({ error: '无权操作' })
  }

  try {
    const [result] = await pool.execute('DELETE FROM teachers WHERE id = ?', [req.params.id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '教师不存在' })
    }

    res.json({ message: '删除成功' })

    regenerateConfig().catch(e => console.error('配置更新失败:', e.message))
    scheduleBuild()
  } catch (err) {
    console.error('删除教师失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

export default router
