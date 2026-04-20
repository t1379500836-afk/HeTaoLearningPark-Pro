# 变更记录

## 2026-04-20

- **修复：服务器部署路径适配问题**
  - 问题：新增教师口令在学生端无法匹配，因后端代码硬编码检查 `src/` 目录，而服务器部署结构为 `user/src/`
  - 修复文件：
    - `server/build.js`：添加 `getUserSrcPath()` 函数，优先检查 `user/src`，回退到 `src`
    - `server/routes/teachers.js`：添加 `getConfigPaths()` 异步函数，动态选择 `teachers.config.js` 路径
    - `server/routes/messages.js`：添加 `getConfigPaths()` 异步函数，动态选择 `messages.config.js` 路径
  - 适配逻辑：后端自动检测 `user/src` 是否存在，存在则使用服务器路径，否则使用本地开发路径
  - 文档更新：`docs/deployment.md` 新增"本地开发与服务器部署路径适配"章节，`docs/architecture.md` 补充两种目录结构对比

## 2026-04-19

- **消息系统（教师寄语 + 匿名悄悄话）**
  - 新增 `server/routes/messages.js`：8 个 API 端点（学生端 2 个无认证 + 管理端 6 个 JWT 认证）
  - 新增 `server/build.js`：从 teachers.js 提取共享构建调度（scheduleBuild + 10 分钟定时器）
  - 新增 `whispers` 和 `teacher_messages` 两张数据表（teacher_key VARCHAR 关联）
  - 管理端 CUD 操作后自动触发 `regenerateMessagesConfig()` + `scheduleBuild()`
  - IP 限流：悄悄话提交 30 秒/次，HTML 标签自动过滤
  - teacher_messages 表通过 ALTER TABLE 迁移补加 title 列
- **学生端前端**
  - 新增 `src/views/MessagesView.vue`：双板块页面（教师寄语 + 匿名悄悄话）
  - 新增 `src/composables/useMessages.js`：静态加载即时渲染 + API 异步刷新
  - 新增 `src/components/shared/EmojiPicker.vue`：56 个精选 emoji，7 分类，响应式网格
  - 新增 `src/config/messages.config.js`：后端自动生成的静态寄语数据
  - 路由注册 `/messages`（含所有前缀变体），导航栏添加「悄悄话」链接
  - 首页 HeroSection 下方新增最新寄语横幅（显示标题 + 点击查看详情）
  - 寄语内容区限高 500px 超出滚动，页面宽度 1100px，悄悄话提交友好提示
- **管理后台**
  - 新增 `admin/src/views/MessagesView.vue`：消息管理页
  - Admin 模式：教师选择卡片网格（4 列，20/页，搜索过滤），选中后管理该教师数据
  - Teacher 模式：直接管理自己的寄语（CRUD）和悄悄话（查看/删除）
  - 双标签页切换、新增/编辑弹窗含标题+内容+EmojiPicker
  - 横向滚动适配移动端，弹窗 `min(500px, 92vw)` 自适应
  - 全局圆角增至 14-16px，新增按钮渐变样式
- **文档更新**
  - `server/routes/messages.js` 路由注册于 `server/index.js`（`/api/messages`）
  - `server/routes/teachers.js` 改用共享 `build.js` 模块

## 2026-04-18

- **DAU 日活统计系统**
  - 新增 `server/routes/stats.js`：心跳上报、日活查询、概览、排行榜四个接口
  - 新增 `daily_active_users` 数据表（唯一约束防重复上报）
  - 学生端新增 `useDauTracker.js` composable，访问时自动匿名上报心跳
  - 管理后台新增 ECharts 图表组件 `DauChart.vue`
- **管理后台路由重构**
  - 引入 vue-router，添加分路由（`/admin/stats`、`/admin/teachers`）
  - Dashboard.vue 精简为布局壳（侧边栏 + 顶栏 + router-view）
  - 新建 `StatsView.vue`（数据统计页）和 `TeachersView.vue`（教师管理页）
  - 菜单顺序调整为：数据统计（默认首页）→ 教师管理
  - App.vue 使用 provide/inject 共享登录状态，替代 props 传递
  - 抽取共用样式到 `styles/shared.css`
- **数据统计交互**
  - 排行榜可点击选中老师，趋势图切换为该老师的日活数据
  - "全部老师"行恢复总览，教师端"我的数据"按钮快速切换
  - 教师端默认选中自己，管理端默认显示全部
  - 所有角色均可查看全部老师的统计数据（服务端去掉角色过滤）
- **修复日期时区 bug**
  - MySQL DATE 列被 mysql2 读为本地时区 Date 对象，`toISOString()` 在 UTC+8 下日期少一天
  - 改为 `getFullYear()/getMonth()/getDate()` 本地方法格式化
- **管理后台 API 扩展**
  - 新增 POST `/api/stats/heartbeat`、GET `/api/stats/dau`、GET `/api/stats/dau/summary`、GET `/api/stats/dau/leaderboard`
  - 所有统计接口取消角色过滤，admin 和 teacher 均返回全量数据

## 2026-04-17

- **管理后台 UI 重构与功能增强**
  - Admin 视图：统计卡片（账号总数/管理员/课导老师）、搜索过滤、头像列（显示花名去"老师"后缀，限4字）、口令一键复制、更新时间列
  - Teacher 视图：满宽卡片，渐变横幅 + 头像 + 2x2 信息网格（登录账号、学生口令、角色、最后登录时间）
  - 统一色彩风格：全页使用蓝紫渐变 #667eea → #764ba2
  - 侧边栏折叠：底部折叠按钮，64px 窄栏仅显示图标，点击 logo 可展开，CSS 过渡动画平滑
  - 移动端/平板适配：侧边栏抽屉化 + 汉堡按钮、统计卡片单列、表格横向滚动、弹窗宽度自适应、登录页响应式
  - 登录页更新：标题「核桃Python 学习平台 / 教师管理后台」，Python 渐变 logo
- **数据库增强**
  - teachers 表新增 `status` 字段（active/disabled），删除改为软删除，已禁用账号无法登录（提示"账号不存在"）
  - teachers 表新增 `updated_at` 字段，登录和修改时自动更新
  - 所有查询自动过滤 status = active，已有表启动时自动迁移补列
- **错误处理优化**
  - 登录请求错误由 Login 组件处理，api.js 拦截器不再重复弹消息
  - 登录失败不再触发页面刷新（区分登录接口 401 和会话过期 401）

## 2026-04-16

- 优化课程卡片加载体验：将 UnitView 从动态 import 改为静态配置读取，课程卡片即时渲染
- 补全 courses.config.js 中全部 72 个课次元数据（lessonConfig）
- 移除全局 LoadingOverlay（全屏遮罩），改为页面级 inline loading
  - 静态页面（StageView、UnitView）零 loading，瞬间渲染
  - 异步页面（LessonView、YCLExamView、YCLPracticeView）各自管理 inline 转圈
  - 删除 useLoading.js 和 LoadingOverlay.vue
- 修复生产环境 teachers 接口 ENOENT 报错：检测 src/ 目录是否存在，不存在则跳过配置生成和构建
- 改造构建调度：10 分钟轮询替代即时构建（脏标记机制），避免连续操作触发多次构建
- regenerateConfig 改为非阻塞调用，构建失败不影响 API 响应
- 更新部署方案：生产服务器需包含完整源码（src/、vite.config.js 等）以支持在线构建
- **打字练习单词卡优先机制**：正课打字练习中，单词卡词汇始终在最前面连续出现，打完后再随机抽取其他单词（TypingPractice 新增 vocabWords prop）
- **补全 33 个课次打字练习遗漏的单词卡词汇**：审计全部 72 个课次，修复 33 个课次的 typingWords 未包含 vocabData 单词的问题，共补齐 72 个遗漏单词
- **修复课程页单词卡布局**：修复 LessonView 在 flex 列容器中宽度未撑满 max-width 的问题，单词卡网格从 2 列恢复为 3 列

## 2026-04-15

- 搭建后端服务骨架：server/（Express + MySQL + JWT），教师登录和 CRUD 接口
- 简化教师口令配置，去掉 Base64 编码改为明文
- 初始化项目文档体系
