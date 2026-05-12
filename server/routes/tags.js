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
    tagsConfigPath: resolve(basePath, 'config/tags.config.js'),
    userSrcPath: basePath
  }
}

// ==================== 静态配置生成 ====================

export async function regenerateTagsConfig() {
  const { existsSync } = await import('fs')
  const { userSrcPath } = await getConfigPaths()
  if (!existsSync(userSrcPath)) {
    console.log('未检测到项目源码，跳过标签配置生成')
    return
  }

  const [tags] = await pool.execute(
    'SELECT id, name, color, parent_id FROM question_tags ORDER BY id'
  )

  const escape = (s) => String(s || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")

  // 构建树形结构
  const tagMap = new Map()
  tags.forEach(t => {
    tagMap.set(t.id, {
      id: t.id,
      name: t.name,
      color: t.color,
      parentId: t.parent_id,
      children: []
    })
  })

  const rootTags = []
  tagMap.forEach(tag => {
    if (tag.parentId && tagMap.has(tag.parentId)) {
      tagMap.get(tag.parentId).children.push(tag)
    } else {
      rootTags.push(tag)
    }
  })

  function serializeTag(tag, indent = 2) {
    const sp = ' '.repeat(indent)
    const childrenStr = tag.children.length > 0
      ? `,\n${sp}children: [\n${tag.children.map(c => serializeTag(c, indent + 2)).join(',\n')}\n${sp}]`
      : ''
    return `${sp}{ id: ${tag.id}, name: '${escape(tag.name)}', color: '${escape(tag.color)}'${childrenStr} }`
  }

  const entries = rootTags.map(t => serializeTag(t))

  const content = `/**
 * 题库标签配置文件
 * 由后端服务自动生成，请勿手动编辑
 */

export const tagsConfig = [
${entries.join(',\n')}
]

export default tagsConfig
`

  const { tagsConfigPath } = await getConfigPaths()
  await writeFile(tagsConfigPath, content, 'utf-8')
  console.log('已重新生成 tags.config.js')
}

// ==================== 标签管理 API ====================

// 获取所有标签（扁平列表，含 parent_id）
router.get('/', async (req, res) => {
  try {
    const [tags] = await pool.execute(
      'SELECT id, name, color, parent_id, created_at FROM question_tags ORDER BY id'
    )
    res.json({ data: tags })
  } catch (err) {
    console.error('查询标签失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 获取标签树
router.get('/tree', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const size = parseInt(req.query.size) || 10
    const search = req.query.search?.trim().toLowerCase()

    const [allTags] = await pool.execute(
      'SELECT id, name, color, parent_id FROM question_tags ORDER BY id'
    )

    let filteredTags = allTags
    if (search) {
      filteredTags = allTags.filter(t => t.name.toLowerCase().includes(search))
    }

    const total = filteredTags.length
    const offset = (page - 1) * size
    const paginatedTags = filteredTags.slice(offset, offset + size)

    const tagMap = new Map()
    paginatedTags.forEach(t => {
      tagMap.set(t.id, { ...t, children: [] })
    })

    const tree = []
    tagMap.forEach(tag => {
      if (tag.parent_id && tagMap.has(tag.parent_id)) {
        tagMap.get(tag.parent_id).children.push(tag)
      } else {
        tree.push(tag)
      }
    })

    res.json({ data: tree, total, page, size })
  } catch (err) {
    console.error('查询标签树失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 获取可作为父标签的候选列表（排除自身及后代，防止循环）
router.get('/parents', async (req, res) => {
  try {
    const excludeId = req.query.exclude ? parseInt(req.query.exclude) : null
    let query = 'SELECT id, name FROM question_tags'
    const params = []
    if (excludeId) {
      // 简单处理：只排除自身，前端或管理员负责避免深层循环
      query += ' WHERE id != ?'
      params.push(excludeId)
    }
    query += ' ORDER BY id'
    const [tags] = await pool.execute(query, params)
    res.json({ data: tags })
  } catch (err) {
    console.error('查询父标签候选失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 新增标签
router.post('/', authMiddleware, async (req, res) => {
  const { name, color, parent_id } = req.body
  if (!name || name.trim().length === 0) {
    return res.status(400).json({ error: '标签名称不能为空' })
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO question_tags (name, color, parent_id) VALUES (?, ?, ?)',
      [name.trim().slice(0, 50), color || '#4facfe', parent_id || null]
    )
    res.status(201).json({ ok: true, id: result.insertId })
    regenerateTagsConfig().catch(e => console.error('标签配置更新失败:', e.message))
    import('./questions.js').then(m => m.regenerateQuestionsConfig()).catch(e => console.error('题库配置更新失败:', e.message))
    scheduleBuild()
  } catch (err) {
    console.error('新增标签失败:', err)
    if (err.message.includes('Duplicate')) {
      return res.status(400).json({ error: '标签名称已存在' })
    }
    res.status(500).json({ error: '服务器错误' })
  }
})

// 编辑标签
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params
  const { name, color, parent_id } = req.body
  if (!name || name.trim().length === 0) {
    return res.status(400).json({ error: '标签名称不能为空' })
  }

  // 防止将自己设为父标签
  if (parent_id && parseInt(parent_id) === parseInt(id)) {
    return res.status(400).json({ error: '标签不能设为自己的父标签' })
  }

  try {
    const [result] = await pool.execute(
      'UPDATE question_tags SET name = ?, color = ?, parent_id = ? WHERE id = ?',
      [name.trim().slice(0, 50), color || '#4facfe', parent_id || null, id]
    )
    if (result.affectedRows === 0) return res.status(404).json({ error: '标签不存在' })
    res.json({ ok: true })
    regenerateTagsConfig().catch(e => console.error('标签配置更新失败:', e.message))
    import('./questions.js').then(m => m.regenerateQuestionsConfig()).catch(e => console.error('题库配置更新失败:', e.message))
    scheduleBuild()
  } catch (err) {
    console.error('编辑标签失败:', err)
    if (err.message.includes('Duplicate')) {
      return res.status(400).json({ error: '标签名称已存在' })
    }
    res.status(500).json({ error: '服务器错误' })
  }
})

// 删除标签
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params
  try {
    // 如果该标签是某些标签的父标签，先把子标签的 parent_id 置空
    await pool.execute(
      'UPDATE question_tags SET parent_id = NULL WHERE parent_id = ?',
      [id]
    )

    const [result] = await pool.execute(
      'DELETE FROM question_tags WHERE id = ?',
      [id]
    )
    if (result.affectedRows === 0) return res.status(404).json({ error: '标签不存在' })
    res.json({ ok: true })
    regenerateTagsConfig().catch(e => console.error('标签配置更新失败:', e.message))
    import('./questions.js').then(m => m.regenerateQuestionsConfig()).catch(e => console.error('题库配置更新失败:', e.message))
    scheduleBuild()
  } catch (err) {
    console.error('删除标签失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

export default router
