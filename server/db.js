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

    console.log('数据库初始化完成')
  } finally {
    conn.release()
  }
}

export default pool
