import { Router } from 'express'
import { writeFile } from 'fs/promises'
import { resolve } from 'path'
import pool from '../db.js'
import { authMiddleware } from '../middleware/auth.js'
import { scheduleBuild, PROJECT_ROOT } from '../build.js'

const router = Router()

const MESSAGES_CONFIG_PATH = resolve(PROJECT_ROOT, 'src/config/messages.config.js')

// ==================== 工具函数 ====================

// 悄悄话提交限流：同一 IP 30 秒内只能发一条
const whisperLimiter = new Map()
const WHISPER_RATE_MS = 30_000

function checkWhisperRate(ip) {
  const now = Date.now()
  const lastTime = whisperLimiter.get(ip)
  if (lastTime && now - lastTime < WHISPER_RATE_MS) return false
  whisperLimiter.set(ip, now)
  return true
}

// 清理过期限流记录（每5分钟）
setInterval(() => {
  const now = Date.now()
  for (const [ip, time] of whisperLimiter) {
    if (now - time > WHISPER_RATE_MS) whisperLimiter.delete(ip)
  }
}, 5 * 60 * 1000)

function sanitizeContent(content) {
  return String(content).replace(/<[^>]*>/g, '').trim()
}

async function validateTeacherKey(teacherKey) {
  if (!teacherKey) return null
  const [rows] = await pool.execute(
    'SELECT `key` FROM teachers WHERE `key` = ? AND status = ?',
    [teacherKey, 'active']
  )
  return rows.length > 0 ? rows[0].key : null
}

// 从 JWT 中的 teacher id 获取 teacher_key
async function getTeacherKeyById(teacherId) {
  const [rows] = await pool.execute(
    'SELECT `key` FROM teachers WHERE id = ? AND status = ?',
    [teacherId, 'active']
  )
  return rows[0]?.key || null
}

// ==================== 静态配置生成 ====================

async function regenerateMessagesConfig() {
  const { existsSync } = await import('fs')
  if (!existsSync(resolve(PROJECT_ROOT, 'src'))) return

  const [teachers] = await pool.execute(
    'SELECT `key`, display_name FROM teachers WHERE status = ? ORDER BY id',
    ['active']
  )

  const escape = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')
  const entries = []

  for (const teacher of teachers) {
    const key = teacher.key
    const [msgs] = await pool.execute(
      'SELECT id, title, content, created_at FROM teacher_messages WHERE teacher_key = ? ORDER BY created_at DESC LIMIT 50',
      [key]
    )

    const msgEntries = msgs.map(m =>
      `        { id: ${m.id}, title: '${escape(m.title)}', content: '${escape(m.content)}', createdAt: '${m.created_at.toISOString()}' }`
    )

    entries.push(`    '${escape(key)}': {
      teacherName: '${escape(teacher.display_name)}',
      teacherMessages: [
${msgEntries.join(',\n')}
      ]
    }`)
  }

  const content = `/**
 * 消息数据配置文件
 * 由后端服务自动生成，请勿手动编辑
 */

const messagesData = {
${entries.join(',\n')}
}

export const getMessages = (teacherKey) => messagesData[teacherKey] || { teacherMessages: [] }

export const getTeacherInfo = (teacherKey) => {
  const data = messagesData[teacherKey]
  return data ? { teacherName: data.teacherName || '' } : { teacherName: '' }
}

export const getLatestTeacherMessage = (teacherKey) => {
  const data = messagesData[teacherKey]
  return data?.teacherMessages?.[0] || null
}

export default { getMessages, getLatestTeacherMessage }
`

  await writeFile(MESSAGES_CONFIG_PATH, content, 'utf-8')
  console.log('已重新生成 messages.config.js')
}

// ==================== 学生端 API（teacherKey 校验） ====================

// 学生查看寄语
router.get('/teacher-messages', async (req, res) => {
  const { teacherKey } = req.query
  const validKey = await validateTeacherKey(teacherKey)
  if (!validKey) return res.status(400).json({ error: '无效的教师口令' })

  try {
    const [rows] = await pool.execute(
      'SELECT id, title, content, created_at FROM teacher_messages WHERE teacher_key = ? ORDER BY created_at DESC LIMIT 100',
      [validKey]
    )
    res.json({ data: rows.map(r => ({
      id: r.id,
      title: r.title,
      content: r.content,
      createdAt: r.created_at.toISOString()
    })) })
  } catch (err) {
    console.error('查询寄语失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 学生提交匿名悄悄话
router.post('/whisper', async (req, res) => {
  const { teacherKey, content } = req.body

  const validKey = await validateTeacherKey(teacherKey)
  if (!validKey) return res.status(400).json({ error: '无效的教师口令' })

  const cleanContent = sanitizeContent(content)
  if (!cleanContent || cleanContent.length > 500) {
    return res.status(400).json({ error: '内容不能为空且不超过500字' })
  }

  const ip = req.ip || req.connection.remoteAddress
  if (!checkWhisperRate(ip)) {
    return res.status(429).json({ error: '发送太频繁了，稍后再试' })
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO whispers (teacher_key, content) VALUES (?, ?)',
      [validKey, cleanContent]
    )
    res.status(201).json({ ok: true, id: result.insertId })
    regenerateMessagesConfig().catch(e => console.error('配置更新失败:', e.message))
    scheduleBuild()
  } catch (err) {
    console.error('提交悄悄话失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// ==================== 管理端 API（JWT 校验） ====================

router.use(authMiddleware)

// 管理端：查看寄语列表
router.get('/manage/messages', async (req, res) => {
  try {
    let teacherKey
    if (req.teacher.role === 'admin') {
      // admin 可通过 query 参数筛选指定教师，不传则不返回数据
      teacherKey = req.query.teacherKey || null
    } else {
      teacherKey = await getTeacherKeyById(req.teacher.id)
    }

    if (!teacherKey) {
      return res.json({ data: [] })
    }

    const [rows] = await pool.execute(
      'SELECT m.id, m.title, m.content, m.created_at, m.updated_at, t.display_name FROM teacher_messages m JOIN teachers t ON m.teacher_key = t.`key` WHERE m.teacher_key = ? ORDER BY m.created_at DESC LIMIT 200',
      [teacherKey]
    )

    res.json({ data: rows.map(r => ({
      id: r.id,
      title: r.title,
      content: r.content,
      teacherName: r.display_name,
      createdAt: r.created_at.toISOString(),
      updatedAt: r.updated_at ? r.updated_at.toISOString() : null
    })) })
  } catch (err) {
    console.error('查询寄语失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 管理端：新增寄语
router.post('/manage/message', async (req, res) => {
  const { title, content } = req.body
  const cleanTitle = sanitizeContent(title) || '无标题'
  const cleanContent = sanitizeContent(content)
  if (!cleanContent || cleanContent.length > 500) {
    return res.status(400).json({ error: '内容不能为空且不超过500字' })
  }

  try {
    const teacherKey = await getTeacherKeyById(req.teacher.id)
    if (!teacherKey) return res.status(400).json({ error: '教师信息异常' })

    const [result] = await pool.execute(
      'INSERT INTO teacher_messages (teacher_key, title, content) VALUES (?, ?, ?)',
      [teacherKey, cleanTitle.slice(0, 100), cleanContent]
    )
    res.status(201).json({ ok: true, id: result.insertId })
    regenerateMessagesConfig().catch(e => console.error('配置更新失败:', e.message))
    scheduleBuild()
  } catch (err) {
    console.error('新增寄语失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 管理端：编辑寄语
router.put('/manage/message/:id', async (req, res) => {
  const { title, content } = req.body
  const { id } = req.params
  const cleanTitle = sanitizeContent(title) || '无标题'
  const cleanContent = sanitizeContent(content)
  if (!cleanContent || cleanContent.length > 500) {
    return res.status(400).json({ error: '内容不能为空且不超过500字' })
  }

  try {
    const teacherKey = await getTeacherKeyById(req.teacher.id)
    const [result] = req.teacher.role === 'admin'
      ? await pool.execute('UPDATE teacher_messages SET title = ?, content = ? WHERE id = ?', [cleanTitle.slice(0, 100), cleanContent, id])
      : await pool.execute('UPDATE teacher_messages SET title = ?, content = ? WHERE id = ? AND teacher_key = ?', [cleanTitle.slice(0, 100), cleanContent, id, teacherKey])

    if (result.affectedRows === 0) return res.status(404).json({ error: '寄语不存在' })
    res.json({ ok: true })
    regenerateMessagesConfig().catch(e => console.error('配置更新失败:', e.message))
    scheduleBuild()
  } catch (err) {
    console.error('编辑寄语失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 管理端：删除寄语
router.delete('/manage/message/:id', async (req, res) => {
  const { id } = req.params
  try {
    const teacherKey = await getTeacherKeyById(req.teacher.id)
    const [result] = req.teacher.role === 'admin'
      ? await pool.execute('DELETE FROM teacher_messages WHERE id = ?', [id])
      : await pool.execute('DELETE FROM teacher_messages WHERE id = ? AND teacher_key = ?', [id, teacherKey])

    if (result.affectedRows === 0) return res.status(404).json({ error: '寄语不存在' })
    res.json({ ok: true })
    regenerateMessagesConfig().catch(e => console.error('配置更新失败:', e.message))
    scheduleBuild()
  } catch (err) {
    console.error('删除寄语失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 管理端：查看悄悄话
router.get('/manage/whispers', async (req, res) => {
  try {
    let teacherKey
    if (req.teacher.role === 'admin') {
      teacherKey = req.query.teacherKey || null
    } else {
      teacherKey = await getTeacherKeyById(req.teacher.id)
    }

    if (!teacherKey) {
      return res.json({ data: [] })
    }

    const [rows] = await pool.execute(
      'SELECT w.id, w.content, w.created_at, t.display_name FROM whispers w JOIN teachers t ON w.teacher_key = t.`key` WHERE w.teacher_key = ? ORDER BY w.created_at DESC LIMIT 200',
      [teacherKey]
    )

    res.json({ data: rows.map(r => ({
      id: r.id,
      content: r.content,
      teacherName: r.display_name,
      createdAt: r.created_at.toISOString()
    })) })
  } catch (err) {
    console.error('查询悄悄话失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 管理端：删除悄悄话
router.delete('/manage/whisper/:id', async (req, res) => {
  const { id } = req.params
  try {
    const teacherKey = await getTeacherKeyById(req.teacher.id)
    const [result] = req.teacher.role === 'admin'
      ? await pool.execute('DELETE FROM whispers WHERE id = ?', [id])
      : await pool.execute('DELETE FROM whispers WHERE id = ? AND teacher_key = ?', [id, teacherKey])

    if (result.affectedRows === 0) return res.status(404).json({ error: '悄悄话不存在' })
    res.json({ ok: true })
    regenerateMessagesConfig().catch(e => console.error('配置更新失败:', e.message))
    scheduleBuild()
  } catch (err) {
    console.error('删除悄悄话失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

export default router
