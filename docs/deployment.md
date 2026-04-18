# 完整部署指南

从零开始，在一台全新服务器上完成全部部署，最终通过 CDN 加速访问。

---

## 部署架构

```
用户浏览器
  ↓ CDN（阿里云，缓存静态资源）
  ↓ 回源到服务器 IP:8080
  ↓ Nginx（端口 8080）
  ├── /           → 学生端 dist/（静态文件）
  ├── /admin/     → 管理后台 admin/dist/（静态文件）
  └── /api/       → 反向代理到 localhost:3000
      ↓
  Node.js 服务（Express，端口 3000，PM2 管理）
      ├── API 路由
      ├── MySQL 数据库（宝塔自带）
      └── 数据变更 → 生成配置 → 定时构建（10 分钟检查一次）
```

服务器目录结构：

```
/www/wwwroot/hetao/
├── src/                         # 前端源码（构建必需）
├── public/                      # 静态资源
├── index.html                   # Vite 入口
├── package.json                 # 前端依赖
├── vite.config.js               # 构建配置
├── dist/                        # 学生端构建产物
├── admin/
│   └── dist/                    # 管理后台构建产物
├── server/                      # 后端服务
│   ├── index.js
│   ├── db.js
│   ├── package.json
│   ├── .env
│   ├── middleware/auth.js
│   └── routes/
├── ecosystem.config.cjs         # PM2 配置
└── docs/                        # 项目文档
```

---

## 一、安装宝塔面板

```bash
# CentOS
yum install -y wget && wget -O install.sh https://download.bt.cn/install/install_6.0.sh && sh install.sh ed8484bec

# Ubuntu / Debian
wget -O install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh ed8484bec
```

安装完成后终端会显示面板地址、用户名和密码。登录后按提示安装 **Nginx** 和 **MySQL 5.7+**。

---

## 二、安装 Node.js

宝塔终端执行：

```bash
source /www/server/nvm/nvm.sh
nvm install 18 && nvm use 18 && nvm alias default 18
node -v   # 确认 v18.x.x
```

---

## 三、创建数据库

宝塔面板 → **数据库** → **添加数据库**：

| 字段 | 填写 |
|------|------|
| 数据库名 | `hetao_learning` |
| 用户名 | `hetao_learning` |
| 密码 | 自己设置 |

---

## 四、上传项目文件

通过宝塔文件管理器或 scp 上传到 `/www/wwwroot/hetao/`。

**必须上传**的目录和文件：
- `src/`、`public/`、`index.html`、`package.json`、`vite.config.js`（前端构建必需）
- `server/` 整个目录（后端服务）
- `ecosystem.config.cjs`（PM2 配置）
- `admin/dist/`（管理后台构建产物，在本地构建后上传）

**不要上传** `node_modules/`，在服务器上安装。

服务器安装依赖并构建：

```bash
# 前端构建依赖
cd /www/wwwroot/hetao
npm config set registry https://registry.npmmirror.com/
npm install

# 构建学生端
npm run build

# 后端运行依赖
cd /www/wwwroot/hetao/server
npm install --omit=dev
```

---

## 五、配置后端环境变量

创建 `/www/wwwroot/hetao/server/.env`：

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=hetao_learning
DB_PASSWORD=你设置的数据库密码
DB_NAME=hetao_learning

JWT_SECRET=hetao_learning_jwt_secret_2026
```

---

## 六、启动后端服务

```bash
cd /www/wwwroot/hetao
npm install -g pm2
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup    # 设置开机自启，按提示执行输出的命令
```

验证：

```bash
pm2 logs hetao-api --lines 10 --nostream
```

应看到 `数据库初始化完成` 和 `后端服务已启动: http://localhost:3000`。

---

## 七、配置 Nginx

### 7.1 添加站点

宝塔面板 → **网站** → **添加站点**：
- 域名：填写服务器 IP
- 根目录：`/www/wwwroot/hetao`
- PHP：纯静态

### 7.2 替换配置文件

站点 → 设置 → 配置文件，全部替换为：

```nginx
server {
    listen 8080;
    server_name _;

    # 学生端
    location / {
        root /www/wwwroot/hetao/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # 管理后台
    location /admin {
        alias /www/wwwroot/hetao/admin/dist;
        index index.html;
        try_files $uri $uri/ /admin/index.html;
    }

    # API 反向代理
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

保存后 Nginx 自动重载。

---

## 八、放行端口

两个地方都要放行 8080：

1. **宝塔防火墙**：面板 → 安全 → 放行 `8080`
2. **云服务商安全组**：控制台 → 安全组 → 入站规则 → TCP 8080，源 `0.0.0.0/0`

---

## 九、验证

| 地址 | 页面 | 说明 |
|------|------|------|
| `http://IP:8080/` | 学生端 | 学员访问 |
| `http://IP:8080/admin` | 管理后台 | 默认账号 `admin` / `admin123` |

---

## 十、配置阿里云 CDN

将静态资源通过 CDN 加速，降低服务器带宽压力，提升全国访问速度。

### 10.1 添加域名

1. 登录 [阿里云 CDN 控制台](https://cdn.console.aliyun.com/)
2. **添加域名**，填写：
   - 加速域名：如 `hetao.example.com`（需提前在域名解析中添加 CNAME）
   - 业务类型：**网站/小文件加速**
   - 源站信息：**IP**，填写服务器公网 IP，端口 `8080`
   - 端口：**80**（CDN 回源用 HTTP）

### 10.2 配置 CNAME 解析

到域名 DNS 管理处添加 CNAME 记录：

| 记录类型 | 主机记录 | 记录值 |
|----------|----------|--------|
| CNAME | hetao | CDN 控制台给出的 CNAME 地址 |

等待 DNS 生效（通常几分钟）。

### 10.3 缓存策略

CDN 控制台 → 域名管理 → 缓存配置 → 自定义缓存策略：

| 路径 | 缓存时间 | 说明 |
|------|----------|------|
| `/assets/*` | 30 天 | JS/CSS 等带 hash 的静态资源，长期缓存 |
| `*.html` | 不缓存 | HTML 入口文件，始终回源 |
| `/api/*` | 不缓存 | API 接口，始终回源 |

> `/assets/` 下的文件名包含内容 hash（Vite 默认），更新后文件名变化会自动绕过缓存，可以放心设置长缓存时间。

### 10.4 回源配置

CDN 控制台 → 域名管理 → 回源配置：

- **回源 Host**：设置为加速域名（如 `hetao.example.com`）
- 如需 HTTPS，在 **SSL 证书** 页面上传证书并开启强制 HTTPS

### 10.5 验证 CDN

```bash
curl -I https://hetao.example.com/
# 检查响应头中包含 X-Cache: HIT 表示 CDN 缓存命中
```

---

## 数据更新流程

管理后台增删改教师时，后端自动处理：

1. 立即写入 MySQL 并重新生成 `src/config/teachers.config.js`
2. 标记 `needsBuild = true`
3. 每 10 分钟定时器检查，有变更才执行 `npm run build`
4. 构建完成后 Nginx 自动提供新文件

最多等待 10 分钟前端生效，无需手动操作。

---

## 常用运维命令

```bash
pm2 status                                  # 后端状态
pm2 restart hetao-api                       # 重启后端
pm2 logs hetao-api --lines 20 --nostream    # 查看日志
nginx -t                                    # 检查 Nginx 配置
nginx -s reload                             # 重载 Nginx
```

### 更新前端课程内容

```bash
# 上传新 src/ 到服务器（覆盖），然后：
cd /www/wwwroot/hetao && npm run build
```

### 更新后端代码

```bash
# 上传新 server/ 到服务器（覆盖），然后：
cd /www/wwwroot/hetao/server && npm install --omit=dev
pm2 restart hetao-api
```

### 更新管理后台

```bash
# 本地构建后上传 admin/dist/（覆盖），无需重启
cd admin && npm install && npm run build
```

---

## 技术选型

| 技术 | 用途 |
|------|------|
| Node.js 18 + Express | 后端 API |
| MySQL (mysql2) | 数据库（宝塔自带） |
| JWT + bcryptjs | 认证 |
| Vue 3 + Vite | 前端框架 + 构建 |
| PM2 | Node 进程管理 |
| Nginx | 静态文件 + 反向代理 |
| 阿里云 CDN | 静态资源加速 |
