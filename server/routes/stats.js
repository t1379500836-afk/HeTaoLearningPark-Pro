import { Router } from 'express'
import pool from '../db.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

// 禁用缓存，避免统计数据被浏览器 304
router.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

// MySQL DATE 列被 mysql2 读为本地时区 Date 对象，用本地方法格式化避免 toISOString() 的 UTC 偏移
function fmtDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// POST /api/stats/heartbeat — 学生端匿名上报
// POST /api/stats/heartbeat — 学生端匿名上报（已取消IP频率限制）
router.post('/heartbeat', async (req, res) => {
  try {
    const { teacherKey, uuid } = req.body || {}

    if (!teacherKey || !uuid || !UUID_RE.test(uuid)) {
      return res.json({ ok: true })
    }

    // 查找有效老师
    const [teachers] = await pool.execute(
      "SELECT id FROM teachers WHERE `key` = ? AND status = 'active'",
      [teacherKey]
    )
    if (teachers.length === 0) {
      return res.json({ ok: true })
    }

    const teacherId = teachers[0].id
    await pool.execute(
      'INSERT IGNORE INTO daily_active_users (user_uuid, teacher_id, date) VALUES (?, ?, CURDATE())',
      [uuid, teacherId]
    )

    res.json({ ok: true })
  } catch {
    res.json({ ok: true })
  }
})

// GET /api/stats/dau — 查询日活数据（所有角色返回全部老师数据）
router.get('/dau', authMiddleware, async (req, res) => {
  try {
    const { startDate, endDate } = req.query

    let start = startDate || new Date().toISOString().slice(0, 10)
    let end = endDate || start

    // 按日期 + 老师分组统计（不去重，统计所有心跳记录）
    const sql = `
      SELECT d.date, d.teacher_id, t.display_name AS teacherName, COUNT(*) AS dauCount
      FROM daily_active_users d
      JOIN teachers t ON t.id = d.teacher_id
      WHERE d.date BETWEEN ? AND ?
      GROUP BY d.date, d.teacher_id ORDER BY d.date DESC, d.teacher_id
    `
    const [dailyStats] = await pool.execute(sql, [start, end])

    // 每日汇总（不去重）
    const [totalsByDate] = await pool.execute(
      'SELECT date, COUNT(*) AS totalDau FROM daily_active_users WHERE date BETWEEN ? AND ? GROUP BY date ORDER BY date ASC',
      [start, end]
    )

    // 按小时分组（用于"今天"视图，不去重）
    const [hourlyStats] = await pool.execute(
      'SELECT HOUR(created_at) AS hour, COUNT(*) AS count FROM daily_active_users WHERE date BETWEEN ? AND ? GROUP BY HOUR(created_at) ORDER BY hour',
      [start, end]
    )

    // 序列化
    const daily = dailyStats.map(r => ({
      date: fmtDate(r.date),
      teacherId: r.teacher_id,
      teacherName: r.teacherName,
      dauCount: r.dauCount
    }))
    const totals = totalsByDate.map(r => ({
      date: fmtDate(r.date),
      totalDau: r.totalDau
    }))
    const hourly = hourlyStats.map(r => ({
      hour: r.hour,
      count: r.count
    }))

    res.json({ dailyStats: daily, totalsByDate: totals, hourlyStats: hourly })
  } catch (err) {
    console.error('DAU query error:', err)
    res.status(500).json({ error: '查询失败' })
  }
})

// GET /api/stats/dau/summary — 概览数据（所有角色返回全部汇总）
router.get('/dau/summary', authMiddleware, async (req, res) => {
  try {
    const d = new Date()
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    const d7 = new Date(Date.now() - 6 * 86400000)
    const sevenDaysAgo = `${d7.getFullYear()}-${String(d7.getMonth() + 1).padStart(2, '0')}-${String(d7.getDate()).padStart(2, '0')}`
    const d30 = new Date(Date.now() - 29 * 86400000)
    const thirtyDaysAgo = `${d30.getFullYear()}-${String(d30.getMonth() + 1).padStart(2, '0')}-${String(d30.getDate()).padStart(2, '0')}`

    // 今日总数（不去重，统计所有心跳记录）
    const [todayRows] = await pool.execute(
      'SELECT COUNT(*) AS cnt FROM daily_active_users WHERE date = ?',
      [today]
    )
    const todayTotal = todayRows[0]?.cnt || 0

    // 7 天数据（用于计算均值，不去重）
    const [sevenRows] = await pool.execute(
      'SELECT date, COUNT(*) AS cnt FROM daily_active_users WHERE date BETWEEN ? AND ? GROUP BY date',
      [sevenDaysAgo, today]
    )
    const sevenDayAvg = sevenRows.length > 0
      ? Number((sevenRows.reduce((s, r) => s + r.cnt, 0) / 7).toFixed(1))
      : 0

    // 30 天总数（不去重）
    const [thirtyRows] = await pool.execute(
      'SELECT COUNT(*) AS cnt FROM daily_active_users WHERE date BETWEEN ? AND ?',
      [thirtyDaysAgo, today]
    )
    const thirtyDayTotal = thirtyRows[0]?.cnt || 0

    // 按老师分栏（不去重）
    const [bdRows] = await pool.execute(`
      SELECT t.id AS teacherId, t.display_name AS teacherName,
             COUNT(CASE WHEN d.date = ? THEN d.id END) AS todayCount
      FROM teachers t
      LEFT JOIN daily_active_users d ON d.teacher_id = t.id AND d.date BETWEEN ? AND ?
      WHERE t.status = 'active'
      GROUP BY t.id, t.display_name
      ORDER BY t.id
    `, [today, sevenDaysAgo, today])
    const breakdown = bdRows.map(r => ({
      teacherId: r.teacherId,
      teacherName: r.teacherName,
      todayCount: r.todayCount
    }))

    res.json({ todayTotal, sevenDayAvg, thirtyDayTotal, breakdown })
  } catch (err) {
    console.error('DAU summary error:', err)
    res.status(500).json({ error: '查询失败' })
  }
})

// GET /api/stats/dau/leaderboard — 活跃排行榜（所有角色可见全部老师）
router.get('/dau/leaderboard', authMiddleware, async (req, res) => {
  try {
    const d = new Date()
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    const startDate = req.query.startDate || today
    const endDate = req.query.endDate || today

    const [rows] = await pool.execute(`
      SELECT t.display_name AS teacherName,
             COUNT(d.id) AS totalDau
      FROM teachers t
      LEFT JOIN daily_active_users d ON d.teacher_id = t.id
        AND d.date BETWEEN ? AND ?
      WHERE t.role = 'teacher' AND t.status = 'active'
      GROUP BY t.id, t.display_name
      ORDER BY totalDau DESC
    `, [startDate, endDate])

    res.json(rows.map(r => ({ teacherName: r.teacherName, totalDau: Number(r.totalDau) })))
  } catch (err) {
    console.error('Leaderboard error:', err)
    res.status(500).json({ error: '查询失败' })
  }
})

export default router
