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
├── user/                         # 学生端源码
│   ├── src/                      # 源码（包含 teachers.config.js 模板）
│   ├── public/                   # 静态资源
│   ├── index.html                # Vite 入口
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── admin/                        # 管理后台源码
│   ├── src/                      # 源码
│   ├── index.html                # Vite 入口
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── server/                       # 后端服务
│   ├── index.js
│   ├── db.js
│   ├── build.js                  # 构建脚本（生成 teachers.config.js）
│   ├── package.json
│   ├── package-lock.json
│   ├── .env                      # 环境变量（上传后创建）
│   ├── middleware/auth.js
│   └── routes/
├── dist/                         # 学生端构建产物（npm run build 生成）
├── admin/dist/                   # 管理后台构建产物（npm run build 生成）
└── ecosystem.config.cjs          # PM2 配置
```

---

## 一、安装宝塔面板

### 1.1 安装命令

```bash
# CentOS
yum install -y wget && wget -O install.sh https://download.bt.cn/install/install_6.0.sh && sh install.sh ed8484bec

# Ubuntu / Debian
wget -O install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh ed8484bec
```

安装完成后终端会显示面板地址、用户名和密码，请妥善保存。

### 1.2 登录后安装环境

登录宝塔面板后，在 **软件商店** 中搜索并安装以下软件：

| 软件 | 版本 | 说明 |
|------|------|------|
| **Nginx** | 1.24+ | Web 服务器，负责静态文件服务和反向代理 |
| **MySQL** | 5.7+ | 数据库，存储用户、教师、课程等数据 |
| **phpMyAdmin** | 最新版 | 数据库可视化管理工具（可选） |

#### 安装 Nginx（图形化）

1. **软件商店** → 搜索 **Nginx** → 点击 **安装**
2. 建议使用 **OpenResty** 或 **Nginx 1.24** 版本
3. 安装完成后在 **设置 → 配置修改** 中可调整并发参数

#### 安装 MySQL（图形化）

1. **软件商店** → 搜索 **MySQL** → 点击 **安装**
2. 建议使用 **MySQL 5.7** 或 **MySQL 8.0**
3. 安装完成后点击 **设置** → **root 密码** → 设置密码（或点击 **重置密码**）



> **Node.js 和 PM2**：二选一安装，详见下方两种方案。

---

### 方案一：Node.js 版本管理器 + PM2 命令行（推荐）

#### 第一步：安装 Node.js 版本管理器（图形化）

1. **软件商店** → 搜索 **Node.js版本管理器** → 点击 **安装**
2. 安装完成后点击 **设置** → **安装 Node.js** → 选择 **Node.js 18**
3. 安装完成后 **切换版本** → 选择 18.x → **设为默认**
4. 验证安装：**终端** 中执行：
   ```bash
   node -v   # 应显示 v18.x.x
   npm -v    # 应显示 9.x.x 或 10.x.x
   ```

#### 第二步：安装 PM2（命令行）

在终端中执行：

```bash
npm install -g pm2
pm2 -v    # 验证安装，应显示版本号
```

---

### 方案二：PM2 管理器（图形化）

#### 第一步：先安装 Node.js 版本管理器

PM2 管理器依赖 Node.js，必须先安装：

1. **软件商店** → 搜索 **Node.js版本管理器** → 点击 **安装**
2. **设置** → **安装 Node.js** → 选择 **Node.js 18**
3. **切换版本** → 选择 18.x → **设为默认**

#### 第二步：安装 PM2 管理器

1. **软件商店** → 搜索 **PM2** → 点击 **安装**
2. 安装完成后点击 **设置**，会提示 **安装插件扩展和依赖环境**
3. 点击 **安装**，等待完成
4. 验证：在 **设置** → **版本切换** 中确认 Node.js 版本为 18
5. 在 **设置** 中可查看 PM2 操作说明

---

### 1.3 宝塔环境安装检查清单

登录宝塔面板，在 **软件商店** 中确认以下服务状态：

```
✅ Nginx        - 状态：已启动，版本 ≥ 1.24
✅ MySQL        - 状态：已启动，版本 ≥ 5.7
✅ Node.js 18   - 终端执行 node -v 确认
✅ PM2          - 终端执行 pm2 -v 确认（方案一）
                - PM2 管理器中查看（方案二）
```
```

---

## 二、确认 Node.js 路径

宝塔终端里提示 `npm: command not found`，通常是因为 Node.js 不在系统 PATH 中。

### 查找实际路径

Node.js 通过宝塔 **Node.js版本管理器** 安装，路径在 `/www/server/nvm/versions/node/` 下：

```bash
ls /www/server/nvm/versions/node/
```

### 临时加载（每次终端会话有效）

```bash
export PATH=/www/server/nvm/versions/node/v22.22.2/bin:$PATH
npm -v    # 验证
```

### 永久生效（推荐）

```bash
# 将路径写入系统配置（需 root 权限）
echo 'export PATH=/www/server/nvm/versions/node/v22.22.2/bin:$PATH' >> /etc/profile
source /etc/profile

# 验证
npm -v
pm2 -v
```

---

## 三、创建数据库（图形化）

宝塔面板 → **数据库** → **添加数据库**，图形化填写：

| 字段 | 填写 |
|------|------|
| 数据库名 | `hetao_learning` |
| 用户名 | `hetao_learning` |
| 密码 | 自己设置（记住） |

---

## 三、上传项目文件

本地整理好的上传文件夹结构如下，上传到服务器 `/www/wwwroot/hetao/`：

```
HeTao/
├── user/                        # 学生端源码（上传整个目录）
├── admin/                       # 管理后台源码（上传整个目录）
├── server/                      # 后端服务（上传整个目录）
└── ecosystem.config.cjs         # PM2 配置（上传）
```

上传方式：
- **宝塔文件管理器**：在 `/www/wwwroot/hetao/` 上传压缩包并解压
- **scp 命令**：
  ```bash
  # 上传整个文件夹
  scp -r "E:/AIIDE/WorkSpace/服务器上传/HeTao/" root@服务器IP:/www/wwwroot/hetao/
  ```

**不要上传** `node_modules/`、`user/dist/`、`admin/dist/`，在服务器上安装和构建。

---

## 四、安装依赖并构建（终端操作）

在宝塔面板点击 **终端**，或使用 SSH 连接服务器执行：

### 4.1 安装学生端依赖并构建

```bash
# 加载 Node.js 环境
export PATH=/www/server/nvm/versions/node/v22.22.2/bin:$PATH

cd /www/wwwroot/hetao/user

# 切换 npm 镜像源
npm config set registry https://registry.npmmirror.com/

# 安装依赖
npm install

# 构建学生端
npm run build
```

### 4.2 安装管理后台依赖并构建

```bash
export PATH=/www/server/nvm/versions/node/v22.22.2/bin:$PATH

cd /www/wwwroot/hetao/admin

# 安装依赖
npm install

# 构建管理后台
npm run build
```

### 4.3 安装后端依赖

```bash
export PATH=/www/server/nvm/versions/node/v22.22.2/bin:$PATH

cd /www/wwwroot/hetao/server
npm install --omit=dev
```

---

## 五、配置后端环境变量

服务器上已有 `server/.env` 文件（上传包中包含），如果需要修改：

宝塔 **文件管理器** → `/www/wwwroot/hetao/server/` → 编辑 `.env`：

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

### 方案一（使用 Node.js 版本管理器）

```bash
export PATH=/www/server/nvm/versions/node/v22.22.2/bin:$PATH

cd /www/wwwroot/hetao
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup    # 设置开机自启，按提示执行输出的命令
```

### 方案二（使用 PM2 管理器）

1. 宝塔面板 → **软件商店** → **PM2** → **设置** → **弹窗操作**
2. **启动项目** → 配置文件路径填写：
   ```
   /www/wwwroot/hetao/ecosystem.config.cjs
   ```
3. 勾选 **开机自启**

验证服务状态：
- 在 PM2 管理器中查看进程状态，应显示 `hetao-api` 运行中
- 或在终端执行：`pm2 logs hetao-api --lines 10 --nostream`
- 应看到 `数据库初始化完成` 和 `后端服务已启动: http://localhost:3000`

---

## 七、配置 Nginx（图形化）

### 7.1 添加站点

宝塔面板 → **网站** → **添加站点**，图形化填写：

| 字段 | 填写 |
|------|------|
| 域名 | 填写服务器 IP（如 `1.2.3.4`） |
| 根目录 | `/www/wwwroot/hetao` |
| PHP版本 | 纯静态（选择"否"） |

### 7.2 配置反向代理和静态文件

站点创建完成后，点击站点 → **设置** → **配置文件**，用下方配置**完全替换**现有内容：

```nginx
server {
    listen 8080;
    server_name _;

    # 学生端
    location / {
        root /www/wwwroot/hetao/user/dist;
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

> **注意**：学生端构建产物在 `user/dist/`，管理后台构建产物在 `admin/dist/`。

保存后 Nginx 自动重载。

> **提示**：如果添加站点时设置的端口不是 8080，需要在配置中修改 `listen 8080` 为实际端口。

---

## 八、放行端口（图形化）

两个地方都要放行 8080：

### 宝塔防火墙

宝塔面板 → **安全** → **防火墙** → **放行端口** → 填写 `8080` → 确认

### 云服务商安全组

登录云服务商控制台（阿里云/腾讯云等）→ **安全组** → **入站规则** → **添加规则**：

| 字段 | 填写 |
|------|------|
| 类型 | 自定义 |
| 协议 | TCP |
| 端口范围 | `8080/8080` |
| 来源 | `0.0.0.0/0` |

---

## 九、验证部署

访问以下地址确认部署成功：

| 地址 | 页面 | 说明 |
|------|------|------|
| `http://IP:8080/` | 学生端 | 学员访问地址 |
| `http://IP:8080/admin` | 管理后台 | 默认账号 `admin` / `admin123` |
| `http://IP:8080/api/stats/dau/today` | API | 应返回 JSON 数据 |

---

## 十、配置阿里云 CDN（图形化）

将静态资源通过 CDN 加速，降低服务器带宽压力，提升全国访问速度。

### 10.1 添加域名

1. 登录 [阿里云 CDN 控制台](https://cdn.console.aliyun.com/)
2. **添加域名**，图形化填写：
   - **加速域名**：如 `hetao.example.com`（需提前在域名解析中添加 CNAME）
   - **业务类型**：**网站/小文件加速**
   - **源站信息**：**IP**，填写服务器公网 IP，端口 `8080`
   - **端口**：**80**（CDN 回源用 HTTP）

### 10.2 配置 CNAME 解析

到域名 DNS 管理处（阿里云 DNS / 腾讯云 DNSPod 等）添加 CNAME 记录：

| 记录类型 | 主机记录 | 记录值 |
|----------|----------|--------|
| CNAME | hetao | CDN 控制台给出的 CNAME 地址 |

等待 DNS 生效（通常几分钟）。

### 10.3 缓存策略（图形化）

CDN 控制台 → **域名管理** → **缓存配置** → **缓存过期时间** → **添加规则**：

| 路径 | 缓存时间 | 说明 |
|------|----------|------|
| `/assets/*` | 30 天 | JS/CSS 等带 hash 的静态资源，长期缓存 |
| `/*.html` | 不缓存 | HTML 入口文件，始终回源 |
| `/api/*` | 不缓存 | API 接口，始终回源 |

> `/assets/` 下的文件名包含内容 hash（Vite 默认），更新后文件名变化会自动绕过缓存，可以放心设置长缓存时间。

### 10.4 HTTPS 配置（如需）

CDN 控制台 → **域名管理** → **HTTPS配置** → **免费证书** 或 **上传证书**

### 10.5 验证 CDN

访问 `https://你的加速域名/`，确认页面正常加载。

---

## 数据更新流程

管理后台增删改教师时，后端自动处理：

1. 立即写入 MySQL 并在 `server/` 目录生成 `src/config/teachers.config.js`（由 `build.js` 生成）
2. 标记 `needsBuild = true`
3. 每 10 分钟定时器检查，有变更则重新构建 `user/dist/` 和 `admin/dist/`
4. 构建完成后 Nginx 自动提供新文件

最多等待 10 分钟前端生效，无需手动操作。

如果需要立即生效，可手动执行：

```bash
# 手动构建学生端
cd /www/wwwroot/hetao/user && npm run build
```

---

## 常用运维操作

### PM2 管理（图形化）

宝塔面板 → **软件商店** → **PM2** → **设置**：
- 查看进程列表和状态
- 重启 / 停止 / 启动服务
- 查看日志

### PM2 管理（命令行）

```bash
pm2 status                                  # 查看状态
pm2 restart hetao-api                       # 重启后端
pm2 logs hetao-api --lines 20 --nostream    # 查看日志
```

### Nginx 管理（图形化）

宝塔面板 → **网站** → 点击站点 → **设置**：
- **配置** → 修改 Nginx 配置
- **重载配置** → 无需重启生效

### 更新学生端课程内容

```bash
cd /www/wwwroot/hetao/user && npm run build
```

### 更新后端代码

```bash
cd /www/wwwroot/hetao/server
npm install --omit=dev
pm2 restart hetao-api
```

### 更新管理后台

```bash
cd /www/wwwroot/hetao/admin && npm run build
# 将新的 dist/ 内容上传覆盖
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
