# 功能模块

## 课程系统

| 页面 | 路由 | 功能 |
|------|------|------|
| 首页 | `/` | 入口页面，4个快捷入口卡片 |
| 课程选择 | `/levels` | 展示 Scratch/Python/C++ 轨道，仅 Python 可用 |
| 阶段详情 | `/levels/:stage` | 展示该阶段所有单元（如 PY1 的 L1-L6） |
| 单元详情 | `/levels/:stage/:unit` | 展示该单元的 4 节课 |
| 课程页 | `/lesson/:stage/:unit/:lesson` | 完整课程：学习目标、词汇卡片、知识点(三级)、打字练习、练习题 |

## 打字练习

独立页面 `/typing`，4种模式：
- 英文单词：Python 关键词打字
- 代码模板：Python 代码片段打字
- 中文打字：古诗和成语输入
- 快捷键：键盘快捷键记忆

正课页（LessonView）内嵌打字练习，优先展示本课单词卡词汇，再随机补充其他单词。

## 单词卡（Flashcard）

### 数据规范

每节课的 `lesson-data.js` 中 `vocabData` 数组存放单词卡数据，遵循以下规则：

1. **必须包含** content.json flashcard OCR 提取的所有单词（标记为 `source: 'ocr'`）
2. 在 OCR 单词基础上可做拓展（标记为 `source: 'extended'`），每课最多 **6 个**单词
3. 难度尽量保持 easy/medium/hard 平衡

### 数据结构

```javascript
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'example',           // 英文单词
    pronunciation: '[ɪɡzæmpəl]', // 音标
    partOfSpeech: 'n.',        // 词性
    meaning: '例子；榜样',      // 中文释义
    level: 'easy',             // 难度: easy / medium / hard
    example: 'This is an example.',  // 英文例句
    exampleTranslation: '这是一个例子。', // 例句翻译
    note: '',                  // 备注（可选，不显示在 UI）
    source: 'ocr'              // 来源: 'ocr' 或 'extended'
  },
  // 拓展单词
  {
    word: 'extra',
    // ...
    source: 'extended'
  }
]
```

### UI 展示

- `source: 'ocr'` 的单词卡显示标签：**本节课新单词，必须掌握**
- `source: 'extended'` 的单词卡显示标签：**拓展了解**
- 无 `source` 字段的单词卡不显示来源标签（向后兼容）


## 在线编程

页面 `/python`，基于 CodeMirror 的 Python 编辑器，支持代码执行。

## YCL 等级考试

| 页面 | 路由 | 功能 |
|------|------|------|
| 考试大厅 | `/ycl` | 等级介绍、时间分配、备考建议 |
| 知识点复习 | `/ycl/practice/:level` | 按知识点逐个复习，进度存 localStorage |
| 模拟考试 | `/ycl/exam/:level/:setId` | 计时考试、自动判分、答题回顾 |

支持等级：4级、5级、6级，每级 5 套练习题（基础x3 + 进阶 + 挑战）。

## 身份验证

- 全局弹窗，必须输入教师口令才能访问
- 口令明文存储在 `teachers.config.js`（由后端自动生成，构建时嵌入前端）
- 验证后个性化显示教师名称
- 认证状态保存在 sessionStorage（关标签页失效）

## 消息系统（教师寄语 + 匿名悄悄话）

### 学生端

页面 `/messages`，两个板块：

- **教师寄语**：左侧标题列表 + 右侧内容区，选择标题查看详情。数据先从静态配置即时渲染，再异步拉取 API 刷新。
- **匿名悄悄话**：输入框 + EmojiPicker + 发送按钮。IP 限流 30 秒/次，内容限 500 字符，HTML 标签自动过滤。提交友好提示引导文明发言。
- 首页 HeroSection 下方横幅显示最新寄语标题，点击跳转寄语页。

### 管理后台

| 页面 | 路由 | 说明 |
|------|------|------|
| 消息管理 | `/admin/messages` | Admin：教师选择卡片网格(4列, 20/页) + 寄语/悄悄话管理；Teacher：直接管理自己的 |

- **Admin 模式**：教师选择面板（4列卡片网格、搜索、分页），选中后进入该教师的寄语/悄悄话管理
- **Teacher 模式**：直接管理自己的数据，双标签页切换
- **寄语标签页**：el-table 列表（标题、内容预览、时间、操作），新增/编辑弹窗含标题+内容+EmojiPicker
- **悄悄话标签页**：卡片列表，仅支持删除
- 横向滚动适配移动端，弹窗 `min(500px, 92vw)` 自适应

### API

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | /api/messages/whisper | 提交匿名悄悄话 | 无（IP限流30s） |
| GET | /api/messages/teacher-messages | 获取教师寄语列表 | 无 |
| GET | /api/messages/manage/messages | 管理端获取寄语 | JWT |
| POST | /api/messages/manage/message | 新增寄语 | JWT |
| PUT | /api/messages/manage/message/:id | 编辑寄语 | JWT |
| DELETE | /api/messages/manage/message/:id | 删除寄语 | JWT |
| GET | /api/messages/manage/whispers | 管理端获取悄悄话 | JWT |
| DELETE | /api/messages/manage/whisper/:id | 删除悄悄话 | JWT |

数据库表：
- `teacher_messages`（id, teacher_key, title, content, created_at, updated_at）。用 teacher_key(VARCHAR) 关联教师。
- `whispers`（id, teacher_key, content, created_at）。匿名，无发送者信息。

管理端 CUD 操作后触发 `regenerateMessagesConfig()` + `scheduleBuild()`，静态文件每10分钟构建刷新。学生提交悄悄话实时写入，无需构建。

### 关键文件

| 文件 | 作用 |
|------|------|
| server/routes/messages.js | 后端 API（8个端点 + IP限流 + HTML过滤 + 配置再生） |
| server/build.js | 共享构建调度（scheduleBuild + 10分钟定时器） |
| src/config/messages.config.js | 静态寄语数据（后端自动生成，含 getMessages/getLatestTeacherMessage） |
| src/composables/useMessages.js | 数据层（loadStatic 即时 + fetchFresh 异步 + submitWhisper） |
| src/components/shared/EmojiPicker.vue | 轻量表情选择器（56个emoji，7分类，响应式网格） |
| src/views/MessagesView.vue | 学生端消息页面 |
| admin/src/views/MessagesView.vue | 管理后台消息页面 |

## 后端服务

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | /api/auth/login | 教师登录 | 无 |
| GET | /api/teachers | 获取教师列表 | JWT |
| POST | /api/teachers | 新增教师 | JWT |
| PUT | /api/teachers/:id | 修改教师 | JWT |
| DELETE | /api/teachers/:id | 删除教师 | JWT |
| POST | /api/stats/heartbeat | 学生端 DAU 心跳上报 | 无 |
| GET | /api/stats/dau | 日活详细数据（按日/老师/小时分组） | JWT |
| GET | /api/stats/dau/summary | 日活概览（今日/7日均值/30日总活） | JWT |
| GET | /api/stats/dau/leaderboard | 活跃排行榜（所有角色可见全部老师） | JWT |

数据库表：
- `teachers`（id, username, password_hash, role, display_name, key, status, created_at, updated_at）。status 为 active/disabled，删除为软删除。
- `daily_active_users`（id, user_uuid, teacher_id, date, created_at）。唯一约束 (user_uuid, teacher_id, date)，同一用户每天对同一老师只计一次。

学生端通过 `useDauTracker.js` 每次访问时发送匿名心跳（UUID + teacherKey），服务端 INSERT IGNORE 去重。管理后台所有角色均能查看全部老师的 DAU 数据。

## 管理后台（admin/）

独立 Vue 3 + Element Plus 应用，使用 vue-router 分路由，与主项目分离部署。

| 页面 | 路由 | 说明 |
|------|------|------|
| Login | `/admin/`（未登录时） | 登录页，渐变背景，移动端适配 |
| 数据统计 | `/admin/stats` | DAU 趋势图、活跃排行榜、概览卡片（默认首页） |
| 教师管理 | `/admin/teachers` | Admin：教师表格；Teacher：个人资料卡片 |
| 消息管理 | `/admin/messages` | Admin：教师选择+寄语/悄悄话管理；Teacher：自己数据管理 |

### 数据统计功能

- **概览卡片**：今日日活、7日均值、30日总活（所有角色看全量数据）
- **日期筛选**：今天 / 近7天 / 近30天 / 自定义范围
- **活跃排行榜**：显示全部老师，点击老师名切换趋势图数据，支持分页
  - "全部老师"行：显示汇总数据，点击恢复总览
  - 教师端有"我的数据"按钮，一键切换到自己的数据
  - 教师端默认选中自己，管理端默认显示全部
- **趋势图**：单天显示 24 小时折线图，多天显示按日折线图
  - 选中老师后，多天视图切换为该老师的独立数据
  - 单天视图因服务端无按老师分小时数据，始终显示汇总

### 教师管理功能

- Admin 视图：统计卡片（账号总数/管理员/课导老师）、搜索过滤、教师表格（头像、口令复制、角色标签）、新增/编辑/软删除
- Teacher 视图：个人资料卡片（渐变横幅、头像、2x2 信息网格）
- 响应式：768px 以下侧边栏抽屉化 + 汉堡按钮，表格横向滚动，弹窗自适应宽度

## 通用组件

| 组件 | 用途 |
|------|------|
| Navigation | 顶部导航栏，移动端汉堡菜单 |
| Footer | 底部信息栏 |
| AuthModal | 全屏身份验证弹窗 |
| CelebrationEffect | 认证成功撒花动画 |
| FlashcardDisplay | 词汇翻转卡片（3列网格布局，区分 OCR/拓展标签） |
| EmojiPicker | 轻量表情选择器（56个emoji，响应式网格，点击外部关闭） |
| KnowledgeCard | 知识点展示（三级难度切换） |
| ExerciseCard | 练习题卡片（选择、判对错、解析） |
| DifficultyBadge | 难度标签 |
