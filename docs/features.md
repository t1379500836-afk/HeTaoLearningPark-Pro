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

## 后端服务

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | /api/auth/login | 教师登录 | 无 |
| GET | /api/teachers | 获取教师列表 | JWT |
| POST | /api/teachers | 新增教师 | JWT |
| PUT | /api/teachers/:id | 修改教师 | JWT |
| DELETE | /api/teachers/:id | 删除教师 | JWT |

数据库表：teachers（id, username, password_hash, role, display_name, key, created_at）。教师增删改后立即重新生成前端配置文件，每 10 分钟定时检查并构建前端。

## 通用组件

| 组件 | 用途 |
|------|------|
| Navigation | 顶部导航栏，移动端汉堡菜单 |
| Footer | 底部信息栏 |
| AuthModal | 全屏身份验证弹窗 |
| LoadingOverlay | 全局加载遮罩 |
| CelebrationEffect | 认证成功撒花动画 |
| FlashcardDisplay | 词汇翻转卡片 |
| KnowledgeCard | 知识点展示（三级难度切换） |
| ExerciseCard | 练习题卡片（选择、判对错、解析） |
| DifficultyBadge | 难度标签 |
