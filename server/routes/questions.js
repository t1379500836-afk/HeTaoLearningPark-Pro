import { Router } from 'express'
import { writeFile } from 'fs/promises'
import { resolve } from 'path'
import pool from '../db.js'
import { authMiddleware } from '../middleware/auth.js'
import { scheduleBuild, PROJECT_ROOT } from '../build.js'

const router = Router()

// 禁用缓存
router.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  next()
})

// 获取配置路径
async function getConfigPaths() {
  const { existsSync } = await import('fs')
  const userSrcPath = resolve(PROJECT_ROOT, 'user/src')
  const srcPath = resolve(PROJECT_ROOT, 'src')
  const basePath = existsSync(userSrcPath) ? userSrcPath : srcPath
  return {
    questionsConfigPath: resolve(basePath, 'config/questions.config.js'),
    userSrcPath: basePath
  }
}

// ==================== 静态配置生成 ====================

export async function regenerateQuestionsConfig() {
  const { existsSync } = await import('fs')
  const { userSrcPath } = await getConfigPaths()
  if (!existsSync(userSrcPath)) {
    console.log('未检测到项目源码，跳过题库配置生成')
    return
  }

  const [questions] = await pool.execute(
    'SELECT id, title, content, type, difficulty, tags, choices, test_cases FROM questions ORDER BY id'
  )

  const escape = (s) => String(s || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')

  function safeParse(val) {
    if (val == null) return []
    if (typeof val === 'string') return JSON.parse(val)
    return val
  }

  const questionsContent = questions.map(q => {
    const tags = safeParse(q.tags)
    const choices = safeParse(q.choices)
    const testCases = safeParse(q.test_cases)

    return `    {
      id: ${q.id},
      title: '${escape(q.title)}',
      type: '${q.type}',
      difficulty: '${q.difficulty || 'medium'}',
      tags: [${tags.map(t => `'${t}'`).join(', ')}],
      content: '${escape(q.content)}',
      ${q.type === 'choice'
        ? `choices: [${choices.map(c => `{ content: '${escape(c.content)}', isCorrect: ${c.isCorrect} }`).join(', ')}]`
        : `testCases: [${testCases.map(tc => `{ input: '${escape(tc.input)}', expectedOutput: '${escape(tc.expectedOutput)}', score: ${tc.score || 0} }`).join(', ')}]`
      }
    }`
  }).join(',\n')

  const content = `/**
 * 题库配置文件
 * 由后端服务自动生成，请勿手动编辑
 */

import { tagsConfig } from './tags.config.js'

export const questionsConfig = {
  tags: tagsConfig,
  questions: [
${questionsContent}
  ]
}

export default questionsConfig
`

  const { questionsConfigPath } = await getConfigPaths()
  await writeFile(questionsConfigPath, content, 'utf-8')
  console.log('已重新生成 questions.config.js')
}

// ==================== 题目管理 API ====================

// 获取题目列表
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const size = parseInt(req.query.size) || 10
    const offset = (page - 1) * size
    const { type, difficulty, search, tags } = req.query

    let where = '1=1'
    const params = []

    if (type) {
      where += ' AND type = ?'
      params.push(type)
    }
    if (difficulty) {
      where += ' AND difficulty = ?'
      params.push(difficulty)
    }
    if (search) {
      const searchTrim = search.trim()
      const searchLower = searchTrim.toLowerCase()
      // 支持编号搜索：T123 模糊匹配编号，或纯数字模糊匹配编号/标题
      if (searchLower.startsWith('t')) {
        const idPart = searchTrim.slice(1)
        if (/^\d+$/.test(idPart)) {
          // T1 匹配 id 包含 1 的题目（1, 10-19, 21, 31...）
          where += ' AND CAST(id AS CHAR) LIKE ?'
          params.push(`%${idPart}%`)
        } else {
          where += ' AND title LIKE ?'
          params.push(`%${searchTrim}%`)
        }
      } else if (/^\d+$/.test(searchTrim)) {
        // 纯数字：模糊匹配 id 或标题
        where += ' AND (CAST(id AS CHAR) LIKE ? OR title LIKE ?)'
        params.push(`%${searchTrim}%`, `%${searchTrim}%`)
      } else {
        where += ' AND title LIKE ?'
        params.push(`%${searchTrim}%`)
      }
    }

    // 获取所有符合条件的题目（用于标签筛选）
    let questionsQuery = `SELECT id, title, content, type, difficulty, tags, choices, test_cases, created_at FROM questions WHERE ${where} ORDER BY id DESC`

    // 处理标签筛选（在内存中进行，因为标签是 JSON 数组）
    let [questions] = await pool.execute(questionsQuery, params)

    if (tags) {
      const tagIds = tags.split(',').map(id => id.trim()).filter(Boolean)
      if (tagIds.length > 0) {
        questions = questions.filter(q => {
          const qTags = typeof q.tags === 'string' ? JSON.parse(q.tags || '[]') : (q.tags || [])
          return tagIds.some(tagId => qTags.includes(tagId) || qTags.includes(parseInt(tagId)))
        })
      }
    }

    const total = questions.length
    const paginatedQuestions = questions.slice(offset, offset + size)

    res.json({ data: paginatedQuestions, total, page, size })
  } catch (err) {
    console.error('查询题目失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 获取题目详情
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, title, content, type, difficulty, tags, choices, test_cases, created_at FROM questions WHERE id = ?',
      [req.params.id]
    )
    if (rows.length === 0) return res.status(404).json({ error: '题目不存在' })
    res.json({ data: rows[0] })
  } catch (err) {
    console.error('查询题目失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 新增题目
router.post('/', authMiddleware, async (req, res) => {
  const { title, content, type, difficulty, tags, choices, test_cases } = req.body

  if (!title || !content || !type) {
    return res.status(400).json({ error: '标题、内容、类型不能为空' })
  }
  if (!['choice', 'program'].includes(type)) {
    return res.status(400).json({ error: '类型必须是 choice 或 program' })
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO questions (title, content, type, difficulty, tags, choices, test_cases) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        title.trim().slice(0, 200),
        content.trim(),
        type,
        difficulty || 'medium',
        JSON.stringify(tags || []),
        type === 'choice' ? JSON.stringify(choices || []) : null,
        type === 'program' ? JSON.stringify(test_cases || []) : null
      ]
    )
    res.status(201).json({ ok: true, id: result.insertId })
    regenerateQuestionsConfig().catch(e => console.error('题库配置更新失败:', e.message))
    import('./tags.js').then(m => m.regenerateTagsConfig()).catch(e => console.error('标签配置更新失败:', e.message))
    scheduleBuild()
  } catch (err) {
    console.error('新增题目失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 编辑题目
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params
  const { title, content, type, difficulty, tags, choices, test_cases } = req.body

  if (!title || !content || !type) {
    return res.status(400).json({ error: '标题、内容、类型不能为空' })
  }

  try {
    const [result] = await pool.execute(
      'UPDATE questions SET title = ?, content = ?, type = ?, difficulty = ?, tags = ?, choices = ?, test_cases = ? WHERE id = ?',
      [
        title.trim().slice(0, 200),
        content.trim(),
        type,
        difficulty || 'medium',
        JSON.stringify(tags || []),
        type === 'choice' ? JSON.stringify(choices || []) : null,
        type === 'program' ? JSON.stringify(test_cases || []) : null,
        id
      ]
    )
    if (result.affectedRows === 0) return res.status(404).json({ error: '题目不存在' })
    res.json({ ok: true })
    regenerateQuestionsConfig().catch(e => console.error('题库配置更新失败:', e.message))
    import('./tags.js').then(m => m.regenerateTagsConfig()).catch(e => console.error('标签配置更新失败:', e.message))
    scheduleBuild()
  } catch (err) {
    console.error('编辑题目失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 删除题目
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params
  try {
    const [result] = await pool.execute('DELETE FROM questions WHERE id = ?', [id])
    if (result.affectedRows === 0) return res.status(404).json({ error: '题目不存在' })
    res.json({ ok: true })
    regenerateQuestionsConfig().catch(e => console.error('题库配置更新失败:', e.message))
    import('./tags.js').then(m => m.regenerateTagsConfig()).catch(e => console.error('标签配置更新失败:', e.message))
    scheduleBuild()
  } catch (err) {
    console.error('删除题目失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

export default router
