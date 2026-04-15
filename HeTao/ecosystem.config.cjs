module.exports = {
  apps: [{
    name: 'hetao-api',
    script: 'index.js',
    cwd: './server',
    env: {
      NODE_ENV: 'production'
    },
    // 监听文件变化自动重启（可选）
    watch: false,
    // 内存超限自动重启
    max_memory_restart: '200M',
  }]
}
