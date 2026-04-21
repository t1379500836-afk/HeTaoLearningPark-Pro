# 部署指南

---

## 快速部署（已有环境）

适用于服务器已安装好宝塔、Node.js、MySQL、Nginx，只需上传代码并启动。

### 1. 上传文件

将本地 `E:\AIIDE\WorkSpace\hetao` 目录上传到服务器 `/www/wwwroot/hetao/`：

```
hetao/
├── user/              # 学生端源码（含 package.json，需构建）
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── config/
│   │   ├── data/
│   │   ├── router/
│   │   ├── views/
│   │   ├── App.vue
│   │   └── main.js
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── admin/             # 管理后台（直接上传 dist，无需构建）
│   └── dist/          # 构建产物
├── server/            # 后端服务
│   ├── index.js
│   ├── db.js
│   ├── build.js
│   ├── package.json
│   ├── .env           # 上传后修改数据库密码
│   ├── middleware/
│   │   └── auth.js
│   └── routes/
│       ├── auth.js
│       ├── messages.js
│       ├── stats.js
│       └── teachers.js
└── ecosystem.config.cjs
```

> **注意**：不要上传 `node_modules/`，`user/dist/` 会在服务器生成。

### 2. 一键部署脚本

在服务器创建 `/www/wwwroot/hetao/deploy.sh`：

```bash
#!/bin/bash
set -e

NODE_PATH="/www/server/nvm/versions/node/v22.22.2/bin"
export PATH=$NODE_PATH:$PATH

echo "=== 核桃学习平台部署 ==="

# 构建学生端
echo "[1/3] 构建学生端..."
cd /www/wwwroot/hetao/user
npm config set registry https://registry.npmmirror.com/
npm install
npm run build

# 安装后端依赖
echo "[2/3] 安装后端依赖..."
cd /www/wwwroot/hetao/server
npm install --omit=dev

# 启动服务
echo "[3/3] 启动后端服务..."
cd /www/wwwroot/hetao
pm2 start ecosystem.config.cjs 2>/dev/null || pm2 restart ecosystem.config.cjs
pm2 save

echo "=== 部署完成 ==="
echo "学生端: http://45.125.33.124/:8080"
echo "管理端: http://45.125.33.124/:8080/admin"
```

执行：

```bash
chmod +x /www/wwwroot/hetao/deploy.sh
/www/wwwroot/hetao/deploy.sh
```

### 3. 常用命令

```bash
# 手动构建学生端
cd /www/wwwroot/hetao/user && npm run build

# 重启后端
pm2 restart hetao-api

# 查看日志
pm2 logs hetao-api --lines 20 --nostream
```

---

## 从零部署（全新服务器）

### 1. 安装宝塔面板

```bash
# Ubuntu / Debian
wget -O install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh ed8484bec
```

### 2. 安装环境（宝塔软件商店）

| 软件 | 版本 |
|------|------|
| Nginx | 1.24+ |
| MySQL | 5.7+ |
| Node.js版本管理器 | Node.js 18 |
| PM2 | 最新版 |

### 3. 确认 Node.js 路径

```bash
# 查找实际路径
ls /www/server/nvm/versions/node/

# 永久生效
echo 'export PATH=/www/server/nvm/versions/node/v22.22.2/bin:$PATH' >> /etc/profile
source /etc/profile
npm -v
pm2 -v
```

### 4. 创建数据库

宝塔面板 → **数据库** → **添加数据库**：

| 字段 | 值 |
|------|-----|
| 数据库名 | `hetao_learning` |
| 用户名 | `hetao_learning` |
| 密码 | 自行设置 |

### 5. 上传项目文件

将本地 `hetao/` 目录上传到 `/www/wwwroot/hetao/`。

### 6. 配置环境变量

编辑 `/www/wwwroot/hetao/server/.env`：

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=hetao_learning
DB_PASSWORD=你的数据库密码
DB_NAME=hetao_learning
JWT_SECRET=hetao_learning_jwt_secret_2026
```

### 7. 执行一键部署

```bash
chmod +x /www/wwwroot/hetao/deploy.sh
/www/wwwroot/hetao/deploy.sh
```

### 8. 配置 Nginx

宝塔 → **网站** → **添加站点**：

| 字段 | 值 |
|------|-----|
| 域名 | 服务器 IP |
| 根目录 | `/www/wwwroot/hetao` |
| PHP | 纯静态 |

站点设置 → **配置文件**，替换为：

```nginx
server {
    listen 8080;
    server_name _;

    location / {
        root /www/wwwroot/hetao/user/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # 学生端静态资源（带 hash，可长期缓存）
    location ~* \.(js|css|woff2?|png|jpg|jpeg|gif|svg|ico)$ {
        root /www/wwwroot/hetao/user/dist;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /admin {
        alias /www/wwwroot/hetao/admin/dist;
        index index.html;
        try_files $uri $uri/ /admin/index.html;
    }

    # 管理端静态资源（带 hash，可长期缓存）
    location ~* /admin/.*\.(js|css|woff2?|png|jpg|jpeg|gif|svg|ico)$ {
        alias /www/wwwroot/hetao/admin/dist;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    access_log /www/wwwlogs/hetao.log;
    error_log /www/wwwlogs/hetao.error.log;
}
```

### 9. 放行端口

- **宝塔防火墙**：放行 `8080`
- **云服务商安全组**：入站规则 TCP `8080/8080`，来源 `0.0.0.0/0`

### 10. 验证

| 地址 | 说明 |
|------|------|
| `http://IP:8080/` | 学生端 |
| `http://IP:8080/admin` | 管理后台（admin / admin123） |
| `http://IP:8080/api/stats/dau/today` | API 测试 |

