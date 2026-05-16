import { Router } from 'express'
import { writeFile } from 'fs/promises'
import { resolve } from 'path'
import pool from '../db.js'
import { authMiddleware } from '../middleware/auth.js'
import { scheduleBuild, PROJECT_ROOT } from '../build.js'

const router = Router()

// 禁用缓存，避免数据被 CDN/代理层缓存
router.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  next()
})

// 获取配置路径：优先 user/src（服务器），否则 src（本地）
async function getConfigPaths() {
  const { existsSync } = await import('fs')
  const userSrcPath = resolve(PROJECT_ROOT, 'user/src')
  const srcPath = resolve(PROJECT_ROOT, 'src')
  const basePath = existsSync(userSrcPath) ? userSrcPath : srcPath
  return {
    messagesConfigPath: resolve(basePath, 'config/messages.config.js'),
    userSrcPath: basePath
  }
}

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

function toLocalISO(d) {
  if (!d) return null
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}T${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`
}

function sanitizeContent(content) {
  return String(content).replace(/<[^>]*>/g, '').trim()
}

// 通过 teacherId 验证教师
async function validateTeacherById(teacherId) {
  if (!teacherId) return null
  const [rows] = await pool.execute(
    'SELECT id FROM teachers WHERE id = ? AND status = ?',
    [teacherId, 'active']
  )
  return rows.length > 0 ? rows[0].id : null
}

// 通过 teacherKey 获取教师 ID（管理端使用）
async function getTeacherIdByKey(teacherKey) {
  if (!teacherKey) return null
  const [rows] = await pool.execute(
    'SELECT id FROM teachers WHERE `key` = ? AND status = ?',
    [teacherKey, 'active']
  )
  return rows.length > 0 ? rows[0].id : null
}

// 从 JWT 中的 teacher id 获取 teacher_id
function getTeacherIdById(teacherId) {
  return teacherId
}

// ==================== 静态配置生成 ====================

export async function regenerateMessagesConfig() {
  const { existsSync } = await import('fs')
  const { userSrcPath } = await getConfigPaths()
  if (!existsSync(userSrcPath)) {
    console.log('未检测到项目源码，跳过配置生成')
    return
  }

  const [teachers] = await pool.execute(
    'SELECT id, `key`, display_name FROM teachers WHERE status = ? ORDER BY id',
    ['active']
  )

  const escape = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')
  const entries = []

  for (const teacher of teachers) {
    const [msgs] = await pool.execute(
      'SELECT id, title, content, created_at FROM teacher_messages WHERE teacher_id = ? ORDER BY created_at DESC LIMIT 50',
      [teacher.id]
    )

    const msgEntries = msgs.map(m => {
      const t = m.created_at
      const localISO = `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}T${String(t.getHours()).padStart(2,'0')}:${String(t.getMinutes()).padStart(2,'0')}:${String(t.getSeconds()).padStart(2,'0')}`
      return `        { id: ${m.id}, title: '${escape(m.title)}', content: '${escape(m.content)}', createdAt: '${localISO}' }`
    })

    entries.push(`    ${teacher.id}: {
      teacherKey: '${escape(teacher.key)}',
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

export const getMessages = (teacherId) => messagesData[teacherId] || { teacherMessages: [] }

export const getTeacherInfo = (teacherId) => {
  const data = messagesData[teacherId]
  return data ? { teacherName: data.teacherName || '', teacherKey: data.teacherKey || '' } : { teacherName: '', teacherKey: '' }
}

export const getLatestTeacherMessage = (teacherId) => {
  const data = messagesData[teacherId]
  return data?.teacherMessages?.[0] || null
}

export default { getMessages, getLatestTeacherMessage }
`

  const { messagesConfigPath } = await getConfigPaths()
  await writeFile(messagesConfigPath, content, 'utf-8')
  console.log('已重新生成 messages.config.js')
}

// ==================== 学生端 API（teacherId 校验） ====================

// 学生查看寄语
router.get('/teacher-messages', async (req, res) => {
  const { teacherId } = req.query
  const validId = await validateTeacherById(teacherId)
  if (!validId) return res.status(400).json({ error: '无效的教师信息' })

  try {
    const [rows] = await pool.execute(
      'SELECT id, title, content, created_at FROM teacher_messages WHERE teacher_id = ? ORDER BY created_at DESC LIMIT 100',
      [validId]
    )
    res.json({ data: rows.map(r => ({
      id: r.id,
      title: r.title,
      content: r.content,
      createdAt: toLocalISO(r.created_at)
    })) })
  } catch (err) {
    console.error('查询寄语失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 学生端：获取公开的悄悄话（含回复，支持分页和日期筛选）
router.get('/whispers/public', async (req, res) => {
  const { teacherId, page, pageSize, startDate, endDate } = req.query
  const validId = await validateTeacherById(teacherId)
  if (!validId) return res.status(400).json({ error: '无效的教师信息' })

  const pageNum = Math.max(1, parseInt(page) || 1)
  const size = Math.min(10, Math.max(1, parseInt(pageSize) || 10))
  const offset = (pageNum - 1) * size

  try {
    // 构建 WHERE 条件
    const conditions = ['w.teacher_id = ?', 'w.is_public = 1']
    const bindParams = [validId]

    if (startDate) {
      conditions.push('w.created_at >= ?')
      bindParams.push(startDate)
    }
    if (endDate) {
      conditions.push('w.created_at < DATE_ADD(?, INTERVAL 1 DAY)')
      bindParams.push(endDate)
    }

    const whereClause = conditions.join(' AND ')

    // 查询总数
    const [countResult] = await pool.execute(
      `SELECT COUNT(*) AS total FROM whispers w WHERE ${whereClause}`,
      bindParams
    )
    const total = countResult[0].total

    // 查询数据（分页）- LIMIT/OFFSET 不能用参数绑定，直接拼接整数
    const [rows] = await pool.execute(`
      SELECT w.id, w.content, w.created_at,
             r.id AS reply_id, r.reply_content, r.teacher_id AS reply_teacher_id, r.created_at AS reply_created_at
      FROM whispers w
      LEFT JOIN whisper_replies r ON r.whisper_id = w.id
      WHERE ${whereClause}
      ORDER BY w.created_at DESC, r.created_at ASC
      LIMIT ${size} OFFSET ${offset}
    `, bindParams)

    // 按悄悄话分组
    const whisperMap = new Map()
    for (const row of rows) {
      if (!whisperMap.has(row.id)) {
        whisperMap.set(row.id, {
          id: row.id,
          content: row.content,
          createdAt: toLocalISO(row.created_at),
          replies: []
        })
      }
      if (row.reply_id) {
        whisperMap.get(row.id).replies.push({
          id: row.reply_id,
          content: row.reply_content,
          isStudent: !row.reply_teacher_id || row.reply_teacher_id === 0,
          createdAt: toLocalISO(row.reply_created_at)
        })
      }
    }

    res.json({ data: Array.from(whisperMap.values()), total })
  } catch (err) {
    console.error('查询公开悄悄话失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 学生提交匿名悄悄话
router.post('/whisper', async (req, res) => {
  const { teacherId, content } = req.body

  const validId = await validateTeacherById(teacherId)
  if (!validId) return res.status(400).json({ error: '无效的教师信息' })

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
      'INSERT INTO whispers (teacher_id, content) VALUES (?, ?)',
      [validId, cleanContent]
    )
    res.status(201).json({ ok: true, id: result.insertId })
  } catch (err) {
    console.error('提交悄悄话失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 学生端：回复悄悄话（回复老师的回复）
router.post('/whisper/:id/reply', async (req, res) => {
  const { id } = req.params
  const { content } = req.body
  const cleanContent = sanitizeContent(content)

  if (!cleanContent || cleanContent.length > 500) {
    return res.status(400).json({ error: '回复内容不能为空且不超过500字' })
  }

  try {
    const { teacherId } = req.query
    const validId = await validateTeacherById(teacherId)
    if (!validId) return res.status(400).json({ error: '无效的教师信息' })

    // 验证悄悄话存在
    const [whisper] = await pool.execute(
      'SELECT id FROM whispers WHERE id = ? AND teacher_id = ?',
      [id, validId]
    )
    if (whisper.length === 0) return res.status(404).json({ error: '悄悄话不存在' })

    // 学生回复存入 0 表示学生身份
    const [result] = await pool.execute(
      'INSERT INTO whisper_replies (whisper_id, reply_content, teacher_id) VALUES (?, ?, ?)',
      [id, cleanContent, 0]
    )
    res.status(201).json({ ok: true, id: result.insertId })
  } catch (err) {
    console.error('回复悄悄话失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// ==================== 管理端 API（JWT 校验） ====================

router.use(authMiddleware)

// 管理端：查看寄语列表
router.get('/manage/messages', async (req, res) => {
  try {
    let teacherId
    if (req.teacher.role === 'admin') {
      // admin 可通过 query 参数筛选指定教师，不传则不返回数据
      const teacherKey = req.query.teacherKey
      if (teacherKey) {
        teacherId = await getTeacherIdByKey(teacherKey)
      }
    } else {
      teacherId = getTeacherIdById(req.teacher.id)
    }

    if (!teacherId) {
      return res.json({ data: [] })
    }

    const [rows] = await pool.execute(
      'SELECT m.id, m.title, m.content, m.created_at, m.updated_at, t.display_name FROM teacher_messages m JOIN teachers t ON m.teacher_id = t.id WHERE m.teacher_id = ? ORDER BY m.created_at DESC LIMIT 200',
      [teacherId]
    )

    res.json({ data: rows.map(r => ({
      id: r.id,
      title: r.title,
      content: r.content,
      teacherName: r.display_name,
      createdAt: toLocalISO(r.created_at),
      updatedAt: r.updated_at ? toLocalISO(r.updated_at) : null
    })) })
  } catch (err) {
    console.error('查询寄语失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 管理端：新增寄语
router.post('/manage/message', async (req, res) => {
  const { title, content, teacherKey } = req.body
  const cleanTitle = sanitizeContent(title) || '无标题'
  const cleanContent = sanitizeContent(content)
  if (!cleanContent || cleanContent.length > 500) {
    return res.status(400).json({ error: '内容不能为空且不超过500字' })
  }

  try {
    let targetTeacherId
    if (req.teacher.role === 'admin' && teacherKey) {
      // admin 可以指定为某个教师添加寄语
      targetTeacherId = await getTeacherIdByKey(teacherKey)
      if (!targetTeacherId) return res.status(400).json({ error: '无效的教师口令' })
    } else {
      targetTeacherId = getTeacherIdById(req.teacher.id)
    }
    if (!targetTeacherId) return res.status(400).json({ error: '教师信息异常' })

    const [result] = await pool.execute(
      'INSERT INTO teacher_messages (teacher_id, title, content) VALUES (?, ?, ?)',
      [targetTeacherId, cleanTitle.slice(0, 100), cleanContent]
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
    const teacherId = getTeacherIdById(req.teacher.id)
    const [result] = req.teacher.role === 'admin'
      ? await pool.execute('UPDATE teacher_messages SET title = ?, content = ? WHERE id = ?', [cleanTitle.slice(0, 100), cleanContent, id])
      : await pool.execute('UPDATE teacher_messages SET title = ?, content = ? WHERE id = ? AND teacher_id = ?', [cleanTitle.slice(0, 100), cleanContent, id, teacherId])

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
    const teacherId = getTeacherIdById(req.teacher.id)
    const [result] = req.teacher.role === 'admin'
      ? await pool.execute('DELETE FROM teacher_messages WHERE id = ?', [id])
      : await pool.execute('DELETE FROM teacher_messages WHERE id = ? AND teacher_id = ?', [id, teacherId])

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
    let teacherId
    if (req.teacher.role === 'admin') {
      const teacherKey = req.query.teacherKey
      if (teacherKey) {
        teacherId = await getTeacherIdByKey(teacherKey)
      }
    } else {
      teacherId = getTeacherIdById(req.teacher.id)
    }

    if (!teacherId) {
      return res.json({ data: [], total: 0 })
    }

    const page = Math.max(1, parseInt(req.query.page) || 1)
    const pageSize = Math.min(100, Math.max(1, parseInt(req.query.pageSize) || 10))
    const offset = (page - 1) * pageSize

    let countSql = 'SELECT COUNT(*) as total FROM whispers WHERE teacher_id = ?'
    let dataSql = `SELECT w.id, w.content, w.is_public, w.created_at, t.display_name FROM whispers w JOIN teachers t ON w.teacher_id = t.id WHERE w.teacher_id = ?`
    const bindParams = [teacherId]

    if (req.query.startDate) {
      countSql += ' AND created_at >= ?'
      dataSql += ' AND w.created_at >= ?'
      bindParams.push(req.query.startDate)
    }
    if (req.query.endDate) {
      countSql += ' AND created_at < DATE_ADD(?, INTERVAL 1 DAY)'
      dataSql += ' AND w.created_at < DATE_ADD(?, INTERVAL 1 DAY)'
      bindParams.push(req.query.endDate)
    }

    dataSql += ' ORDER BY w.created_at DESC LIMIT ' + pageSize + ' OFFSET ' + offset

    const [countResult] = await pool.execute(countSql, bindParams)
    const total = countResult[0].total

    const [rows] = await pool.execute(dataSql, bindParams)

    // 查询每条悄悄话的回复
    const whisperIds = rows.map(r => r.id)
    const repliesMap = new Map()
    if (whisperIds.length > 0) {
      const [replies] = await pool.execute(
        `SELECT id, whisper_id, reply_content, teacher_id, created_at FROM whisper_replies WHERE whisper_id IN (${whisperIds.join(',')}) ORDER BY created_at ASC`
      )
      for (const r of replies) {
        if (!repliesMap.has(r.whisper_id)) repliesMap.set(r.whisper_id, [])
        repliesMap.get(r.whisper_id).push({
          id: r.id,
          content: r.reply_content,
          teacherId: r.teacher_id,
          isStudent: !r.teacher_id || r.teacher_id === 0,
          createdAt: toLocalISO(r.created_at)
        })
      }
    }

    res.json({
      data: rows.map(r => ({
        id: r.id,
        content: r.content,
        isPublic: !!r.is_public,
        teacherName: r.display_name,
        createdAt: toLocalISO(r.created_at),
        replies: repliesMap.get(r.id) || []
      })),
      total
    })
  } catch (err) {
    console.error('查询悄悄话失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 管理端：删除悄悄话
router.delete('/manage/whisper/:id', async (req, res) => {
  const { id } = req.params
  try {
    const teacherId = getTeacherIdById(req.teacher.id)
    const [result] = req.teacher.role === 'admin'
      ? await pool.execute('DELETE FROM whispers WHERE id = ?', [id])
      : await pool.execute('DELETE FROM whispers WHERE id = ? AND teacher_id = ?', [id, teacherId])

    if (result.affectedRows === 0) return res.status(404).json({ error: '悄悄话不存在' })
    // 同时删除相关回复
    await pool.execute('DELETE FROM whisper_replies WHERE whisper_id = ?', [id])
    res.json({ ok: true })
  } catch (err) {
    console.error('删除悄悄话失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 管理端：回复悄悄话
router.post('/manage/whisper/:id/reply', async (req, res) => {
  const { id } = req.params
  const { replyContent } = req.body
  const cleanContent = sanitizeContent(replyContent)

  if (!cleanContent || cleanContent.length > 500) {
    return res.status(400).json({ error: '回复内容不能为空且不超过500字' })
  }

  try {
    const teacherId = getTeacherIdById(req.teacher.id)

    // 验证悄悄话存在
    const [whisper] = await pool.execute(
      req.teacher.role === 'admin'
        ? 'SELECT id FROM whispers WHERE id = ?'
        : 'SELECT id FROM whispers WHERE id = ? AND teacher_id = ?',
      req.teacher.role === 'admin' ? [id] : [id, teacherId]
    )
    if (whisper.length === 0) return res.status(404).json({ error: '悄悄话不存在' })

    const [result] = await pool.execute(
      'INSERT INTO whisper_replies (whisper_id, reply_content, teacher_id) VALUES (?, ?, ?)',
      [id, cleanContent, teacherId]
    )
    res.status(201).json({ ok: true, id: result.insertId })
  } catch (err) {
    console.error('回复悄悄话失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 管理端：设置悄悄话公开状态
router.patch('/manage/whisper/:id/public', async (req, res) => {
  const { id } = req.params
  const { isPublic } = req.body

  try {
    const teacherId = getTeacherIdById(req.teacher.id)
    const [result] = req.teacher.role === 'admin'
      ? await pool.execute('UPDATE whispers SET is_public = ? WHERE id = ?', [isPublic ? 1 : 0, id])
      : await pool.execute('UPDATE whispers SET is_public = ? WHERE id = ? AND teacher_id = ?', [isPublic ? 1 : 0, id, teacherId])

    if (result.affectedRows === 0) return res.status(404).json({ error: '悄悄话不存在' })
    res.json({ ok: true })
  } catch (err) {
    console.error('设置公开状态失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 管理端：编辑回复
router.put('/manage/reply/:id', async (req, res) => {
  const { id } = req.params
  const { replyContent } = req.body
  const cleanContent = sanitizeContent(replyContent)

  if (!cleanContent || cleanContent.length > 500) {
    return res.status(400).json({ error: '回复内容不能为空且不超过500字' })
  }

  try {
    const teacherId = getTeacherIdById(req.teacher.id)

    // 验证回复存在且属于该教师的悄悄话
    const [reply] = await pool.execute(
      req.teacher.role === 'admin'
        ? 'SELECT id FROM whisper_replies WHERE id = ?'
        : `SELECT r.id FROM whisper_replies r JOIN whispers w ON r.whisper_id = w.id WHERE r.id = ? AND w.teacher_id = ?`,
      req.teacher.role === 'admin' ? [id] : [id, teacherId]
    )
    if (reply.length === 0) return res.status(404).json({ error: '回复不存在' })

    const [result] = await pool.execute(
      'UPDATE whisper_replies SET reply_content = ? WHERE id = ?',
      [cleanContent, id]
    )
    res.json({ ok: true })
  } catch (err) {
    console.error('编辑回复失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 管理端：删除回复
router.delete('/manage/reply/:id', async (req, res) => {
  const { id } = req.params
  try {
    const teacherId = getTeacherIdById(req.teacher.id)

    // 验证回复存在且属于该教师的悄悄话
    const [reply] = await pool.execute(
      req.teacher.role === 'admin'
        ? 'SELECT id FROM whisper_replies WHERE id = ?'
        : `SELECT r.id FROM whisper_replies r JOIN whispers w ON r.whisper_id = w.id WHERE r.id = ? AND w.teacher_id = ?`,
      req.teacher.role === 'admin' ? [id] : [id, teacherId]
    )
    if (reply.length === 0) return res.status(404).json({ error: '回复不存在' })

    await pool.execute('DELETE FROM whisper_replies WHERE id = ?', [id])
    res.json({ ok: true })
  } catch (err) {
    console.error('删除回复失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

export default router
