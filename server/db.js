import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'hetao_learning',
  charset: 'utf8mb4',
  collation: 'utf8mb4_general_ci',
  waitForConnections: true,
  connectionLimit: 10,
})

/**
 * 建表 + 插入默认数据
 */
export async function initDatabase() {
  const conn = await pool.getConnection()

  try {
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS teachers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('admin','teacher') NOT NULL DEFAULT 'teacher',
        display_name VARCHAR(50) NOT NULL,
        \`key\` VARCHAR(100) NOT NULL,
        status ENUM('active','disabled') NOT NULL DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // 兼容已有表：补加 status 列
    try {
      await conn.execute("ALTER TABLE teachers ADD COLUMN status ENUM('active','disabled') NOT NULL DEFAULT 'active'")
    } catch (e) {
      if (!e.message.includes('Duplicate column')) throw e
    }

    // 兼容已有表：补加 updated_at 列
    try {
      await conn.execute("ALTER TABLE teachers ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    } catch (e) {
      if (!e.message.includes('Duplicate column')) throw e
    }

    // 表为空时插入默认管理员
    const [rows] = await conn.execute('SELECT COUNT(*) AS count FROM teachers')
    if (rows[0].count === 0) {
      const hash = await bcrypt.hash('admin123', 10)
      await conn.execute(
        'INSERT INTO teachers (username, password_hash, role, display_name, `key`) VALUES (?, ?, ?, ?, ?)',
        ['admin', hash, 'admin', '管理员', 'admin']
      )
      console.log('已创建默认管理员账号: admin / admin123')
    }

    // 日活统计表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS daily_active_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_uuid VARCHAR(36) NOT NULL,
        teacher_id INT NOT NULL,
        date DATE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uk_user_date (user_uuid, teacher_id, date),
        INDEX idx_date (date),
        INDEX idx_teacher_date (teacher_id, date)
      )
    `)

    // 匿名悄悄话表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS whispers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        teacher_id INT NOT NULL,
        content VARCHAR(500) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_teacher_created (teacher_id, created_at DESC)
      )
    `)

    // 教师寄语表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS teacher_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        teacher_id INT NOT NULL,
        title VARCHAR(100) NOT NULL DEFAULT '',
        content VARCHAR(500) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_teacher_created (teacher_id, created_at DESC)
      )
    `)

    // 兼容旧表：添加 teacher_id 列（如果还没有）
    try {
      await conn.execute("ALTER TABLE whispers ADD COLUMN teacher_id INT NOT NULL DEFAULT 0")
    } catch (e) {
      if (!e.message.includes('Duplicate column')) throw e
    }

    try {
      await conn.execute("ALTER TABLE teacher_messages ADD COLUMN teacher_id INT NOT NULL DEFAULT 0")
    } catch (e) {
      if (!e.message.includes('Duplicate column')) throw e
    }

    // 删除旧表中的 teacher_key 列
    try {
      await conn.execute("ALTER TABLE whispers DROP COLUMN teacher_key")
    } catch (e) {
      if (!e.message.includes('check') && !e.message.includes('Unknown column')) console.log('whispers 表 teacher_key 删除:', e.message)
    }

    try {
      await conn.execute("ALTER TABLE teacher_messages DROP COLUMN teacher_key")
    } catch (e) {
      if (!e.message.includes('check') && !e.message.includes('Unknown column')) console.log('teacher_messages 表 teacher_key 删除:', e.message)
    }

    // 题库标签表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS question_tags (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        color VARCHAR(20) DEFAULT '#4facfe',
        parent_id INT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_parent (parent_id)
      )
    `)

    // 兼容已有表：补加 parent_id 列
    try {
      await conn.execute("ALTER TABLE question_tags ADD COLUMN parent_id INT DEFAULT NULL")
      await conn.execute("ALTER TABLE question_tags ADD INDEX idx_parent (parent_id)")
    } catch (e) {
      if (!e.message.includes('Duplicate column') && !e.message.includes('Duplicate key')) throw e
    }

    // 题库题目表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS questions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        content TEXT NOT NULL,
        type ENUM('choice', 'program') NOT NULL,
        difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
        tags JSON,
        choices JSON,
        test_cases JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_type (type),
        INDEX idx_difficulty (difficulty)
      )
    `)

    // 题库提交记录表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        question_id INT NOT NULL,
        code TEXT,
        status ENUM('pending', 'running', 'passed', 'failed', 'error') DEFAULT 'pending',
        result JSON,
        score INT DEFAULT 0,
        earned_score INT DEFAULT 0,
        total_score INT DEFAULT 0,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_question (question_id),
        INDEX idx_question_status (question_id, status),
        INDEX idx_submitted_at (submitted_at)
      )
    `)

    // 兼容旧表：补加 earned_score 和 total_score 列
    try {
      await conn.execute("ALTER TABLE submissions ADD COLUMN earned_score INT DEFAULT 0")
    } catch (e) {
      if (!e.message.includes('Duplicate column')) throw e
    }
    try {
      await conn.execute("ALTER TABLE submissions ADD COLUMN total_score INT DEFAULT 0")
    } catch (e) {
      if (!e.message.includes('Duplicate column')) throw e
    }

    // 兼容旧表：删除 user_uuid 列（如果存在）
    try {
      await conn.execute('ALTER TABLE submissions DROP COLUMN user_uuid')
    } catch (e) {
      if (!e.message.includes('check') && !e.message.includes('Unknown column')) throw e
    }

    // 兼容旧表：删除旧索引并添加新索引
    try {
      await conn.execute('ALTER TABLE submissions DROP INDEX idx_question_user')
    } catch (e) {
      if (!e.message.includes('check') && !e.message.includes('doesn\'t exist')) throw e
    }
    try {
      await conn.execute('ALTER TABLE submissions ADD INDEX idx_question (question_id)')
    } catch (e) {
      if (!e.message.includes('Duplicate key')) throw e
    }
    try {
      await conn.execute('ALTER TABLE submissions ADD INDEX idx_question_status (question_id, status)')
    } catch (e) {
      if (!e.message.includes('Duplicate key')) throw e
    }

    // YCL 成绩记录表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS ycl_scores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_name VARCHAR(50) NOT NULL,
        teacher_id INT NOT NULL,
        level VARCHAR(10) NOT NULL,
        set_id VARCHAR(50) NOT NULL,
        set_name VARCHAR(100) NOT NULL,
        score INT NOT NULL,
        total_score INT NOT NULL,
        correct_count INT NOT NULL,
        total_questions INT NOT NULL,
        duration INT NOT NULL,
        objective_score INT DEFAULT 0,
        objective_total INT DEFAULT 0,
        coding_score INT DEFAULT 0,
        coding_total INT DEFAULT 0,
        questions JSON,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_teacher (teacher_id),
        INDEX idx_teacher_level (teacher_id, level),
        INDEX idx_teacher_submitted (teacher_id, submitted_at),
        INDEX idx_set (set_id)
      )
    `)

    console.log('数据库初始化完成')
  } finally {
    conn.release()
  }
}

export default pool
