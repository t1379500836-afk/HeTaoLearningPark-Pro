import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'hetao_learning',
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

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

    console.log('数据库初始化完成')
  } finally {
    conn.release()
  }
}

export default pool
