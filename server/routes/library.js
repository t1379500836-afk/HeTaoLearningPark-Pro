import { Router } from 'express'
import pool from '../db.js'

const router = Router()

// 禁用缓存
router.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  next()
})

// 提交答案（仅记录全局统计，不关联用户）
router.post('/submit', async (req, res) => {
  const { questionId, selectedIndex, code, status, score, earnedScore, totalScore } = req.body

  if (!questionId) {
    return res.status(400).json({ error: '参数不完整' })
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO submissions (question_id, code, status, score, earned_score, total_score) VALUES (?, ?, ?, ?, ?, ?)',
      [questionId, code || null, status || 'passed', score || 0, earnedScore || 0, totalScore || 0]
    )

    res.json({ ok: true, submissionId: result.insertId })
  } catch (err) {
    console.error('提交答案失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 获取全站题目统计（通过/尝试）
router.get('/stats', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT
        question_id,
        COUNT(*) AS attempts,
        SUM(CASE WHEN status = 'passed' THEN 1 ELSE 0 END) AS passed
      FROM submissions
      GROUP BY question_id
    `)
    res.json({ data: rows })
  } catch (err) {
    console.error('查询统计失败:', err)
    res.status(500).json({ error: '服务器错误' })
  }
})

export default router
