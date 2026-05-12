import { Router } from 'express'
import pool from '../db.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

/** 判断当前用户是否为管理员 */
function isAdmin(req) {
  return req.teacher.role === 'admin'
}

/**
 * POST /api/ycl/scores
 * 学生提交成绩（无需鉴权，teacherId 从 body 获取）
 */
router.post('/scores', async (req, res) => {
  const {
    studentName,
    teacherId,
    level,
    setId,
    setName,
    score,
    totalScore,
    correctCount,
    totalQuestions,
    duration,
    objectiveScore,
    objectiveTotal,
    codingScore,
    codingTotal,
    questions
  } = req.body

  if (!studentName || !teacherId || !level || !setId || score === undefined) {
    return res.status(400).json({ error: '缺少必填字段' })
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO ycl_scores
       (student_name, teacher_id, level, set_id, set_name, score, total_score,
        correct_count, total_questions, duration, objective_score, objective_total,
        coding_score, coding_total, questions)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        studentName,
        teacherId,
        level,
        setId,
        setName || '',
        score,
        totalScore || 0,
        correctCount || 0,
        totalQuestions || 0,
        duration || 0,
        objectiveScore || 0,
        objectiveTotal || 0,
        codingScore || 0,
        codingTotal || 0,
        questions ? JSON.stringify(questions) : null
      ]
    )

    res.status(201).json({
      id: result.insertId,
      message: '成绩提交成功'
    })
  } catch (err) {
    console.error('提交成绩失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

/**
 * GET /api/ycl/scores
 * 获取成绩列表
 * - admin: 可查看所有老师的成绩，支持 teacherId 筛选
 * - teacher: 仅可查看自己的成绩
 */
router.get('/scores', authMiddleware, async (req, res) => {
  try {
    const {
      teacherId,
      level,
      setId,
      studentName,
      startDate,
      endDate,
      page = 1,
      pageSize = 20
    } = req.query

    const conditions = []
    const params = []

    // 权限筛选：老师只能看自己的
    if (!isAdmin(req)) {
      conditions.push('teacher_id = ?')
      params.push(req.teacher.id)
    } else if (teacherId) {
      conditions.push('teacher_id = ?')
      params.push(teacherId)
    }

    if (level) {
      conditions.push('level = ?')
      params.push(level)
    }

    if (setId) {
      conditions.push('set_id = ?')
      params.push(setId)
    }

    if (studentName) {
      conditions.push('student_name LIKE ?')
      params.push(`%${studentName}%`)
    }

    if (startDate) {
      conditions.push('submitted_at >= ?')
      params.push(startDate)
    }

    if (endDate) {
      conditions.push('submitted_at <= ?')
      params.push(endDate)
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

    // 获取总数
    const [countResult] = await pool.execute(
      `SELECT COUNT(*) as total FROM ycl_scores ${whereClause}`,
      params
    )
    const total = countResult[0].total

    // 分页
    const offset = (Number(page) - 1) * Number(pageSize)
    const [rows] = await pool.execute(
      `SELECT * FROM ycl_scores ${whereClause}
       ORDER BY submitted_at DESC
       LIMIT ${Number(pageSize)} OFFSET ${offset}`,
      params
    )

    // 解析 questions JSON（可能是字符串或已解析的对象）
    const data = rows.map(row => ({
      ...row,
      questions: row.questions ? (typeof row.questions === 'string' ? JSON.parse(row.questions) : row.questions) : null
    }))

    res.json({
      data,
      total,
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages: Math.ceil(total / Number(pageSize))
    })
  } catch (err) {
    console.error('查询成绩失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

/**
 * GET /api/ycl/scores/:id
 * 获取单条成绩详情
 */
router.get('/scores/:id', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM ycl_scores WHERE id = ?',
      [req.params.id]
    )

    if (rows.length === 0) {
      return res.status(404).json({ error: '成绩记录不存在' })
    }

    const row = rows[0]

    // 非 admin 只能看自己的学生成绩
    if (!isAdmin(req) && row.teacher_id !== req.teacher.id) {
      return res.status(403).json({ error: '无权查看' })
    }

    res.json({
      ...row,
      questions: row.questions ? (typeof row.questions === 'string' ? JSON.parse(row.questions) : row.questions) : null
    })
  } catch (err) {
    console.error('查询成绩详情失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

/**
 * GET /api/ycl/levels
 * 获取所有等级和套卷信息（供管理后台筛选使用）
 */
router.get('/levels', authMiddleware, async (req, res) => {
  try {
    // 从 ycl_scores 表中获取已出现的 level 和 set 组合
    const [rows] = await pool.execute(
      'SELECT DISTINCT level, set_id, set_name FROM ycl_scores ORDER BY level, set_id'
    )

    // 按 level 分组
    const levels = {}
    for (const row of rows) {
      if (!levels[row.level]) {
        levels[row.level] = {
          level: row.level,
          sets: []
        }
      }
      levels[row.level].sets.push({
        setId: row.set_id,
        setName: row.set_name
      })
    }

    res.json(Object.values(levels))
  } catch (err) {
    console.error('查询等级信息失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

export default router