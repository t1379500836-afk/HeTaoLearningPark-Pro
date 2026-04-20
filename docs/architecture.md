# 架构概览

## 目录结构

```
/www/wwwroot/hetao/
├── user/                        # 学生端前端（Vue 3 + Vite）
│   ├── src/
│   │   ├── main.js             # 应用入口，挂载路由
│   │   ├── App.vue             # 根组件：导航栏 + 页面内容 + 底部栏
│   │   ├── router/index.js     # 路由定义，含多前缀生成逻辑
│   │   ├── config/             # 配置文件（课程、阶段、教师、消息）
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

```
管理后台操作（增/删/改教师）
  → Express 写 MySQL（立即生效）
  → 立即重新生成 user/src/config/teachers.config.js（由 server/build.js 生成）
  → 标记 needsBuild = true
  → 每 10 分钟定时器检查：
      有标记 → cd user && npm run build → 新 user/dist/ → Nginx 提供新文件
      无标记 → 跳过
```

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

| Composable | 作用 | 存储位置 |
|------------|------|----------|
| useAuth | 教师身份验证 | sessionStorage |
| useLessonData | 课程数据加载 | 动态 import |
| useRoutePrefix | URL前缀与阶段权限 | 路由参数 |
| useDauTracker | DAU 心跳上报 | sessionStorage |
| useMessages | 教师寄语加载、悄悄话提交 | API + 静态配置 |

**管理后台**通过 provide/inject 跨组件共享登录状态（user、logout），各页面独立管理自身数据。

## 消息系统数据流

```
管理后台操作（新增/编辑/删除寄语）
  → Express 写 MySQL
  → 立即重新生成 user/src/config/messages.config.js（由 server/build.js 生成）
  → 标记 needsBuild = true
  → 每 10 分钟定时器检查：
      有标记 → cd user && npm run build → 新 user/dist/ → Nginx 提供新文件
      无标记 → 跳过
```

```
学生端访问 /messages
 → loadStatic() 从 messages.config.js 即时渲染（零 loading）
 → fetchFresh() 异步从 API 拉取最新数据覆盖
 → 提交悄悄话 → POST /api/messages/whisper（实时写入，无需构建）
```

## 数据库

| 表名 | 关键字段 | 说明 |
|------|----------|------|
| teachers | id, username, password_hash, role, display_name, key, status | status 为 active/disabled，删除为软删除 |
| daily_active_users | user_uuid, teacher_id, date | 唯一约束 (user_uuid, teacher_id, date) |
| teacher_messages | teacher_key, title, content, created_at, updated_at | 教师寄语，用 teacher_key 关联 |
| whispers | teacher_key, content, created_at | 匿名悄悄话，用 teacher_key 关联 |

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
