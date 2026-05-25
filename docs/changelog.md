# 变更记录

## 2026-05-26

- **fix: 管理员后台 YCL 点击试卷无法查询成绩**
  - 问题：教师点击成绩列表中的套卷卡片的，查询不到数据
  - 原因：`groupedScores` 使用复合 key `"level__setId"`，但 `goToSetDetail` 函数未正确解析，直接将整个 key 当作 setId 传给详情页
  - 修复：`goToSetDetail` 函数增加解析逻辑，从复合 key 中提取真正的 setId

- **fix: 管理员点击套卷显示 [object Object]**
  - 问题：管理员（admin）视角点击 teacherSets 中的套卷时，传入 setId 为 `[object Object]`
  - 原因：未区分对象类型和字符串类型的参数
  - 修复：分别处理三种情况：groupedScores key（字符串）、studentSubmissions 对象、teacherSets 对象

- **fix: 管理员查看 YCL 成绩详情页数据串门**
  - 问题：管理员选择老师后点击套卷，看到的是其他老师学生的成绩
  - 原因：YCLSetDetailView 未传递 teacherId 参数给 API，导致查到所有人的数据
  - 修复：从 route.query 读取 teacherId 并传递给 API

## 2026-05-17

- **feat: 悄悄话回复功能**
  - 学生端：查看公开悄悄话列表（含老师回复）、历史悄悄话弹窗（分页+日期筛选）、回复老师回复
  - 管理端：回复悄悄话、编辑回复、删除回复、公开/隐藏切换、批量操作
  - 新增 `whisper_replies` 数据表（id, whisper_id, reply_content, teacher_id, created_at）
  - `whispers` 表新增 `is_public` 字段控制是否对学生可见
  - 新增 6 个 API：学生端获取公开悄悄话/回复；管理端回复/编辑回复/删除回复/设置公开状态

- **fix: 悄悄话公开状态 API PATCH 改为 POST**
  - 问题：服务器上请求返回 400 Bad Request，`x-swift-error: request parse msg error`
  - 原因：阿里云 CDN 不支持 PATCH 方法带请求体
  - 修复：将接口从 `PATCH /manage/whisper/:id/public` 改为 `POST /manage/whisper/:id/public`
  - 涉及文件：`server/routes/messages.js`、`admin/src/views/MessagesView.vue`

## 2026-05-14

- **fix: 题库标签筛选类型不匹配**
  - 问题：用户端题库页面选择标签筛选后无结果，后台管理正常
  - 原因：`questions.config.js` 中 `tags` 是字符串数组 `['2']`，而 `tags.config.js` 中 `id` 是数字 `2`，`includes` 比较时 `2 !== '2'`
  - 修复：`useLibrary.js` 筛选逻辑统一转为字符串比较

## 2026-05-13

- **feat: 管理后台题目管理后端分页与搜索**
  - 后端 questions API 支持 `page/size/type/difficulty/search` 参数
  - 后端 tags API `/tree` 支持 `page/size/search` 参数
  - 前端 QuestionsView 和 TagsView 改为后端分页，筛选/搜索条件变化时自动重置页码
  - 支持选择每页条数（10/20/50/100）

- **feat: 编程题添加停止按钮及练习场优化**
  - YCLExamView 和 QuestionView 添加停止运行按钮，修复停止后无法再次运行的 bug
  - 优化 worker 管理和状态重置逻辑
  - server 新增 `ycl-scores` 路由和数据库配置（成绩管理）
  - 管理后台新增 YCLScoresView 成绩管理页面
  - YCLScoresView 支持管理员查看各老师学生成绩、套卷汇总列表
  - YCLZoneView 优化活跃排行榜 UI

- **fix: 编程题评测结果优化**
  - 移除结果页编程题评测详情展示（用户看不到每个用例情况）
  - 编程题评分逻辑：全部用例通过才给分，否则不得分
  - 复习模式编程题判定：使用保存的判题结果，状态为 passed 则正确
  - 练习套卷页：编程题显示真实分数，总得分改为液态玻璃苹果风进度条

- **feat: 测试用例UI优化**
  - YCLExamView 测试用例展示改为现代化卡片样式（渐变背景、图标、分组编号）
  - 每组测试用例可独立折叠

- **feat: 题目详情页多项优化**
  - 左右双栏布局：左侧题目信息+测试结果，右侧编辑器
  - 编程题运行/提交分离：运行用 skulpt.worker.js 执行显示输出，提交用 skulpt-oj.worker.js 判题
  - input() 终端输入支持：等待输入时显示输入框，回车提交继续执行
  - 提交后进度条实时更新（调用 reload() 刷新统计数据）
  - "运行测试"按钮改为"提交"，判题中显示"提交中..."

- **fix: OJ判题postMessage序列化 + timeout状态映射 + 多行显示**
  - Worker postMessage 前深拷贝 testCases 解决 DataCloneError
  - timeout 状态映射为 error 以匹配数据库 ENUM
  - result-detail code 添加 `display: inline` 支持多行换行

- **feat: 题目详情页编辑器优化**
  - CodeMirror 行号显示，Python 语法高亮，Monokai 主题
  - 输入/输出区固定高度（280px/200px），超出内容滚动
  - 输出区滚动条样式与背景色统一

- **feat: 题目详情页测试用例优化 + 列表页进度条颜色**
  - 测试用例改为每组独立可折叠
  - 测试用例移动到左侧容器（题目描述下方）
  - 输入/期望输出改为左右排列
  - 提交后测试结果移到输出下方
  - 列表页和详情页进度条根据正确率显示不同颜色（<30% 红，30-70% 黄，>70% 绿）

- **feat: 重构题目详情页为左右双栏布局**
  - 左侧：编号 T+标题、难度+标签、运行通过进度条、题目描述
  - 右侧：答题区（编程题编辑器+结果 / 选择题选项+结果）
  - 编程题只显示第一条测试用例
  - 进度条从 `/api/library/stats` 读取历史数据

- **feat: 管理后台题目编辑支持多行输入 + 用户端换行显示**
  - 管理后台：选择题选项、编程题测试用例改为 textarea autosize
  - 用户端：选项/测试用例 CSS 添加 `white-space: pre-wrap` 支持换行

## 2026-05-12

- **修复：YCL六级试卷题目/参考答案错误**
  - expert.js：
    - q-6-exp-single-5：题目从"求 a_5"改为"求 a_4"（选项中无 a_5 正确值 122），解析修正
    - q-6-exp-coding-4：参考答案从 `list.pop(0)` 改为 `collections.deque` + `popleft()`（O(1) 出队）
    - q-6-exp-coding-1：评分规则增加"能正确使用整除运算符 // 得 2分"，强调数据类型重要性
  - basic-3.js：q-6-3-multi-1 D 选项"调用函数时必须传入所有参数"改为"调用函数时必须传入所有非默认参数"，解析补充默认值说明
  - basic-1.js：q-6-1-multi-1 解析中提到 D 选项"import pgzrun"，但选项列表无 D，修正为直接说明三个正确选项

- **修复：YCL五级五套试卷题目答案/解析错误**
  - expert.js：
    - q-5-exp-single-2：`sum(set(nums))` 答案31→30
    - q-5-exp-single-7：消除选项重复（'012'→'01235'）
    - q-5-exp-multi-3：答案 [0,2]→[0,1,2]（A/B/C执行次数均为6）
    - q-5-exp-single-12：代码 `end='\\n'` 解析修正，答案→3
  - advanced.js：
    - q-5-adv-single-2：解析"2个22"→"2个2"
    - q-5-adv-single-11：标点格式统一
    - q-5-adv-multi-4：答案 [0,1,3]→[0,1]，解析补充 break/continue 不能在循环外使用
  - basic-2.js：q-5-2-single-9 选项 s[-1]→s[-2]（-1 是 'N' 不是 'O'）
  - basic-1.js：q-5-1-single-9、q-5-1-multi-4 解析补充说明
  - basic-3.js：q-5-3-single-5 选项A改为有效Python表达式 `list(int(x) for x in fruits)`

## 2026-04-27

- **修复：CDN 刷新不完整导致 CSS/JS 加载失败**
  - 问题：构建后 CDN 仅刷新 HTML，未刷新 assets 目录，导致用户偶发 CSS/JS 加载失败或点击无反应
  - 原因：新 HTML 引用新 CSS hash，但 CDN 边缘节点尚未同步新资源，出现短暂窗口期
  - 修复：`server/build.js` 刷新 CDN 时同时刷新 `index.html`、`admin/index.html` 和 `assets/` 目录
  - 涉及文件：`server/build.js`（CDN objectType 从 File 改为 Directory，刷新范围扩大）

- **修复：更新教师口令后首页寄语消失**
  - 问题：修改教师口令后，`messages.config.js` 未同步刷新，导致首页按新口令查不到寄语
  - 修复：教师增/改/删操作同时调用 `regenerateMessagesConfig()`，确保 `messages.config.js` 与 `teachers.config.js` 保持同步
  - 涉及文件：`server/routes/teachers.js`、`server/routes/messages.js`（导出 `regenerateMessagesConfig`）

- **数据库字段重构：teacher_key → teacher_id**
  - `whispers` 和 `teacher_messages` 表的 `teacher_key` 列改为 `teacher_id`（INT）
  - 业务逻辑调整：通过 `teacher_id`（数字 ID）匹配，而非 `teacher_key`（口令字符串）
  - JWT token 中的 `id` 直接作为 `teacher_id` 使用，无需额外查询
  - 新增 `getTeacherIdByKey()` 函数桥接 teacherKey → teacher_id
  - 保留 `teacherKey` 作为前端/API 层的查询参数（学生端无法持有 JWT）
  - 修正 db.js 注释，简化 `getTeacherIdById` 为同步函数

## 2026-04-21

- **DAU 统计系统调整**
  - 心跳间隔：1秒 → 1分钟（`src/composables/useDauTracker.js`）
  - 取消 IP 频率限制功能（`server/routes/stats.js`）
  - UUID 存储方案确认：使用 `sessionStorage`，关闭浏览器即清除，刷新页面保留
  - 统计口径统一：所有接口使用 `COUNT(*)` 不去重，显示总访问次数

- **数据库修复与自动迁移增强**
  - 修复 `teacher_key` 编码不一致问题：`whispers` 和 `teacher_messages` 表统一使用 `utf8mb4_general_ci` 排序规则
  - `server/db.js` 启动时自动检测并修复字符集，避免查询报错
  - 自动迁移机制：建表、补列、字符集统一、默认数据插入，服务器启动时自动完成

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
