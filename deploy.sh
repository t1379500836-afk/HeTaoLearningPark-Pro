#!/bin/bash
set -e

NODE_PATH="/www/server/nvm/versions/node/v22.22.2/bin"
export PATH=$NODE_PATH:$PATH

echo "=== 核桃学习平台部署 ==="

# 构建学生端
echo "[1/4] 构建学生端..."
cd /www/wwwroot/hetao/user
npm config set registry https://registry.npmmirror.com/
npm install
npm run build

# 清理超过1天的旧构建产物
echo "[2/4] 清理旧构建产物..."
find /www/wwwroot/hetao/user/dist/assets -type f -mtime +1 -delete

# 安装后端依赖
echo "[3/4] 安装后端依赖..."
cd /www/wwwroot/hetao/server
npm install --omit=dev

# 启动服务
echo "[4/4] 启动后端服务..."
cd /www/wwwroot/hetao
pm2 start ecosystem.config.cjs 2>/dev/null || pm2 restart ecosystem.config.cjs
pm2 save

echo "=== 部署完成 ==="
echo "学生端: http://45.125.33.124:8080"
echo "管理端: http://45.125.33.124:8080/admin"