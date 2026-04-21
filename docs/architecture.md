# 架构概览

## 目录结构

```
/www/wwwroot/hetao/
├── user/                        # 学生端前端（Vue 3 + Vite）- 服务器部署结构
│   ├── src/
│   │   ├── main.js             # 应用入口，挂载路由
│   │   ├── App.vue             # 根组件：导航栏 + 页面内容 + 底部栏
│   │   ├── router/index.js     # 路由定义，含多前缀生成逻辑
│   │   ├── config/             # 配置文件（课程、阶段、教师、消息）
│   │   │   ├── teachers.config.js  # 教师口令配置（后端自动生成）
│   │   │   └── messages.config.js  # 教师寄语静态数据（后端自动生成）
│   │   ├── composables/        # Vue 组合式函数
│   │   ├── components/
│   │   │   ├── shared/         # 通用组件
│   │   │   └── course/        # 课程相关组件
│   │   └── views/              # 页面组件
│   ├── public/                 # 静态资源
│   ├── index.html              # Vite 入口
│   └── package.json
├── admin/                      # 管理后台（Vue 3 + Element Plus）
│   ├── src/
│   │   ├── main.js             # 应用入口，挂载 router + ElementPlus
│   │   ├── App.vue             # 根组件：登录/后台条件渲染 + provide/inject
│   │   ├── router/index.js     # 路由配置（/stats 默认、/teachers、/messages）
│   │   ├── views/
│   │   │   ├── Login.vue       # 登录页
│   │   │   ├── Dashboard.vue   # 布局壳（侧边栏 + 顶栏 + router-view）
│   │   │   ├── StatsView.vue   # 数据统计页（DAU 趋势、排行榜）
│   │   │   ├── TeachersView.vue# 教师管理页（表格/个人资料）
│   │   │   └── MessagesView.vue# 消息管理页（教师选择/寄语CRUD/悄悄话管理）
│   │   ├── components/
│   │   │   ├── DauChart.vue    # ECharts 图表封装
│   │   │   └── EmojiPicker.vue # 表情选择器
│   │   ├── styles/
│   │   │   ├── main.css        # 全局样式入口
│   │   │   └── shared.css      # 共用样式
│   │   └── api.js              # Axios 实例 + JWT 拦截器
│   └── package.json
├── server/                     # 后端服务（Node.js + Express）
│   ├── index.js                # Express 入口
│   ├── db.js                   # MySQL 连接池 + 建表
│   ├── build.js                # 共享构建调度（scheduleBuild + 10分钟定时器）
│   ├── package.json
│   ├── middleware/auth.js       # JWT 验证中间件
│   └── routes/
│       ├── auth.js             # 教师登录接口
│       ├── teachers.js         # 教师 CRUD + teachers.config.js 再生
│       ├── stats.js            # DAU 统计接口（日活、排行榜、趋势）
│       └── messages.js         # 教师寄语 + 匿名悄悄话 CRUD + messages.config.js 再生
├── user/dist/                  # 学生端构建产物（npm run build 生成）
├── admin/dist/                 # 管理后台构建产物（npm run build 生成）
└── ecosystem.config.cjs        # PM2 配置，cwd 指向 ./server
```

**本地开发目录结构**（与服务器略有不同）：

```
项目根目录/
├── src/                        # 学生端源码（本地开发时直接在根目录）
│   ├── config/                 # 配置文件
│   │   ├── teachers.config.js
│   │   └── messages.config.js
│   └── ...
├── admin/                      # 管理后台（与服务器相同）
├── server/                     # 后端服务（与服务器相同）
└── ...
```

> 后端代码通过检测 `user/src` 目录是否存在自动适配两种结构，详见 [deployment.md](deployment.md) 的"本地开发与服务器部署路径适配"章节。
├── data/                   # 静态课程数据
│   ├── courses/PY1/        # PY1 的 24 课数据
│   ├── courses/PY2/        # PY2 的 24 课数据
│   ├── courses/PY3/        # PY3 的课程数据
│   ├── courses/YCL/        # YCL 考试数据和题库
│   └── chinese-typing-pool.js
└── assets/
    ├── styles/variables.css # CSS 变量
    └── images/
```

## 数据流

### 教师管理后台 → 学生端更新流程

```
教师后台操作（增/删/改教师或寄语）
  → Express 写 MySQL（立即生效）
  → 立即重新生成配置文件：
      - user/src/config/teachers.config.js（教师口令映射）
      - user/src/config/messages.config.js（教师寄语数据）
  → scheduleBuild() 设置脏标记 needsBuild = true
  → 每 10 分钟定时器检查：
      有标记 → needsBuild = false → npm run build
      无标记 → 跳过
  → Vite 构建：
      - 配置文件打包进 assets/index-xxxxx.js（hash 变化）
      - 生成新的 user/dist/index.html（引用新 hash）
  → purgeCDN() 刷新阿里云 CDN：
      - 仅刷新 /index.html（学生端入口）
      - 静态资源（JS/CSS）因 hash 变化自动回源
  → 用户访问：
      - CDN 返回新 index.html
      - 新 JS 文件不在缓存 → 回源拉取
      - 学生端显示最新数据
```

### CDN 缓存策略

| 资源类型 | CDN 缓存 | 刷新机制 | 说明 |
|---------|---------|---------|------|
| `/index.html` | ✅ 缓存 | ✅ 自动刷新 | 学生端入口，构建后自动刷新 CDN |
| `/assets/*.js` | ✅ 长期缓存 | ❌ 无需刷新 | 文件名含 hash，变化自动回源 |
| `/admin/index.html` | ✅ 缓存 | ❌ 不刷新 | 教师后台入口，需手动刷新 CDN |
| `/api/*` | ❌ 不缓存 | - | Nginx 反向代理，实时请求 |

### 教师后台 CDN 注意事项

教师后台（`/admin/*`）的静态文件会被 CDN 缓存，但构建流程**不会自动刷新** `/admin/index.html`。

| 场景 | 影响 | 处理方式 |
|------|------|---------|
| 修改数据库数据（增删改教师/寄语） | ✅ 无影响 | API 实时获取，无需操作 |
| 修改教师后台前端代码 | ⚠️ 用户看到旧版本 | 需手动刷新 CDN 或等缓存过期 |

### 路由数据流

```
URL（含前缀）
 → Router（验证前缀，解析页面组件）
  → View（读取路由参数，调用 composable）
   → Composable（useLessonData 动态 import 课程数据）
    → 数据文件（lesson-data.js）
     → 组件（通过 props 渲染）
```

## 状态管理

**学生端**没有使用 Pinia/Vuex，通过 composable 的模块级变量实现单例状态：

| Composable | 作用 | 存储位置 | 说明 |
|------------|------|----------|------|
| useAuth | 教师身份验证 | sessionStorage | 关闭浏览器清除 |
| useLessonData | 课程数据加载 | 动态 import | - |
| useRoutePrefix | URL前缀与阶段权限 | 路由参数 | - |
| useDauTracker | DAU 心跳上报 | sessionStorage | 关闭浏览器重置UUID，刷新保留 |
| useMessages | 教师寄语加载、悄悄话提交 | API + 静态配置 | - |

**管理后台**通过 provide/inject 跨组件共享登录状态（user、logout），各页面独立管理自身数据。

## 消息系统数据流

### 教师寄语更新流程

```
管理后台操作（新增/编辑/删除寄语）
  → Express 写 MySQL
  → 立即重新生成 user/src/config/messages.config.js
  → scheduleBuild() 设置脏标记
  → 每 10 分钟定时器检查：
      有标记 → npm run build → purgeCDN() 刷新学生端入口
      无标记 → 跳过
```

### 学生端消息加载

```
学生端访问 /messages
 → loadStatic() 从 messages.config.js 即时渲染（零 loading）
 → fetchFresh() 异步从 API 拉取最新数据覆盖
 → 提交悄悄话 → POST /api/messages/whisper（实时写入，无需构建）
```

## 数据库

**自动迁移机制**：`server/db.js` 的 `initDatabase()` 在服务器启动时自动执行，完成以下操作：

1. **建表**：`CREATE TABLE IF NOT EXISTS` 自动创建新表
2. **补列**：`ALTER TABLE ... ADD COLUMN` 兼容已有表结构升级
3. **字符集统一**：`whispers` 和 `teacher_messages` 表的 `teacher_key` 字段统一使用 `utf8mb4_general_ci` 排序规则，避免编码不一致导致查询失败
4. **默认数据**：`teachers` 表为空时自动插入默认管理员账号

| 表名 | 关键字段 | 说明 |
|------|----------|------|
| teachers | id, username, password_hash, role, display_name, key, status | status 为 active/disabled，删除为软删除；key 为教师口令字符串 |
| daily_active_users | user_uuid, teacher_id, date | 唯一约束 (user_uuid, teacher_id, date) |
| teacher_messages | teacher_id, title, content, created_at, updated_at | 教师寄语，teacher_id(INT) 外键关联 teachers.id |
| whispers | teacher_id, content, created_at | 匿名悄悄话，teacher_id(INT) 外键关联 teachers.id |

## 多租户机制

三个 URL 前缀控制不同班级的阶段访问权限：

| 前缀 | 可访问阶段 |
|------|-----------|
| 无前缀 | PY1, PY2, PY3 |
| /p1 | 仅 PY1 |
| /py2 | PY1, PY2 |
| /python3 | PY1, PY2, PY3 |

同一套组件，根据前缀动态决定显示哪些内容。路由系统自动为每个前缀生成完整的路由副本。

## 课程数据结构

每节课的数据文件 (`lesson-data.js`) 导出统一结构：

```
meta          # 课程元信息（标题、难度、学习目标）
vocab         # 词汇表
knowledgePoints  # 知识点（每个含 easy/medium/hard 三级内容）
exercises     # 练习题（选择题，含答案和解析）
typingWords   # 打字练习词汇（按难度分组）
typingTemplates # 打字练习代码模板
```

## CSS 体系

所有设计令牌定义在 `variables.css` 中：
- 主题色：橙色(#ff9f00)、蓝色(#4facfe)、青色(#00f2fe)
- 间距：xs(5px) ~ xl(60px)
- 响应断点：480px / 768px / 1024px / 1280px
- 最大宽度：1200px

## 自动构建与 CDN 刷新关键文件

| 文件 | 作用 |
|------|------|
| `server/build.js` | 构建调度核心：脏标记机制 + 10分钟定时器 + CDN 刷新 |
| `server/routes/teachers.js` | 教师 CRUD 后触发 `regenerateConfig()` + `regenerateMessagesConfig()` + `scheduleBuild()` |
| `server/routes/messages.js` | 寄语 CRUD 后触发 `regenerateMessagesConfig()` + `scheduleBuild()` |
| `src/config/teachers.config.js` | 后端自动生成的教师口令映射 |
| `src/config/messages.config.js` | 后端自动生成的教师寄语静态数据 |

### 触发自动构建的操作

以下操作会设置脏标记，在下一个 10 分钟定时器检查时触发构建：

#### 教师管理（3 个操作）

| 操作 | API | 影响字段 | 说明 |
|------|-----|---------|------|
| 新增教师 | `POST /api/teachers` | key, display_name | 新口令加入配置 |
| 修改教师 | `PUT /api/teachers/:id` | key, display_name | 仅口令和花名变更触发 |
| 删除教师 | `DELETE /api/teachers/:id` | - | 软删除，从配置移除 |

> 修改 username、password、role 不会触发构建（不在静态配置中）

#### 教师寄语（3 个操作）

| 操作 | API | 说明 |
|------|-----|------|
| 新增寄语 | `POST /api/messages/manage/message` | 加入 messages.config.js |
| 编辑寄语 | `PUT /api/messages/manage/message/:id` | 更新 messages.config.js |
| 删除寄语 | `DELETE /api/messages/manage/message/:id` | 从 messages.config.js 移除 |

#### 不触发构建的操作

| 操作 | API | 原因 |
|------|-----|------|
| 学生提交悄悄话 | `POST /api/messages/whisper` | 数据通过 API 实时获取 |
| 管理端删除悄悄话 | `DELETE /api/messages/manage/whisper/:id` | 不在静态配置中 |

### 环境变量

CDN 刷新依赖以下环境变量（配置在 `server/.env`）：

```env
ALIBABA_CLOUD_ACCESS_KEY_ID=xxx
ALIBABA_CLOUD_ACCESS_KEY_SECRET=xxx
CDN_DOMAIN=https://your-domain.com
```

未配置时自动跳过 CDN 刷新，不影响构建流程。
