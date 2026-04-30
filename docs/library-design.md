# 题库系统设计方案

## 上下文

当前项目是一个面向核桃编程学员的 Python 少儿编程学习平台，包含学生端（Vue 3）和管理后台（Vue 3 + Element Plus），后端使用 Node.js + Express + MySQL。

需要设计一个题库系统，支持：
1. 教师在管理后台 CRUD 题目
2. 题目带标签（多个标签如：列表、函数）
3. 学生端按标签筛选题库
4. 题目类型：选择题 + 编程题（OJ 判题）

## 方案概述

参考现有消息系统的模式：**管理后台 CRUD → MySQL 存储 → 静态配置生成 → Vite 构建 → CDN 缓存**

题库数据通过静态配置文件获取，变更后触发构建，10 分钟内生效。

---

## 一、数据库设计

```sql
-- 标签表
CREATE TABLE question_tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  color VARCHAR(20) DEFAULT '#4facfe',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

-- 题目表（所有老师共用，不做隔离）
CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  type ENUM('choice', 'program') NOT NULL,
  difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_type (type),
  INDEX idx_difficulty (difficulty)
)

-- 提交记录表（实时写入，不走构建）
CREATE TABLE submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT NOT NULL,
  user_uuid VARCHAR(36) NOT NULL,
  code TEXT,
  status ENUM('pending', 'running', 'passed', 'failed', 'error') DEFAULT 'pending',
  result JSON,
  score INT DEFAULT 0,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_question_user (question_id, user_uuid),
  INDEX idx_submitted_at (submitted_at)
)
```

**choices 字段结构（选择题）**:
```json
[
  { "content": "选项A", "isCorrect": true },
  { "content": "选项B", "isCorrect": false }
]
```

**test_cases 字段结构（编程题）**:
```json
[
  { "input": "1 2", "expectedOutput": "3", "score": 100 },
  { "input": "5 7", "expectedOutput": "12", "score": 100 }
]
```

---

## 二、后端 API 设计

### 题目管理（需 JWT）

| 方法 | 路径 | 说明 | 构建触发 |
|------|------|------|---------|
| GET | /api/questions | 获取题目列表 | - |
| GET | /api/questions/:id | 获取题目详情 | - |
| POST | /api/questions | 新增题目 | ✅ |
| PUT | /api/questions/:id | 编辑题目 | ✅ |
| DELETE | /api/questions/:id | 删除题目 | ✅ |

### 标签管理（需 JWT）

| 方法 | 路径 | 说明 | 构建触发 |
|------|------|------|---------|
| GET | /api/questions/tags | 获取所有标签 | - |
| POST | /api/questions/tags | 新增标签 | ✅ |
| PUT | /api/questions/tags/:id | 编辑标签 | ✅ |
| DELETE | /api/questions/tags/:id | 删除标签 | ✅ |

### 学生端

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/library/submit | 提交答案（编程题触发 OJ） |
| GET | /api/library/submissions | 获取用户提交记录 |

> 题库数据从静态配置文件获取，不走 API。

### 构建触发流程

```
教师 CRUD 题目/标签
  → 写 MySQL
  → 重新生成 src/config/questions.config.js
  → 重新生成 src/config/tags.config.js
  → scheduleBuild() 设置脏标记
  → 下个 10 分钟定时器触发构建
  → purgeCDN() 刷新学生端入口
```

---

## 三、静态配置文件

**src/config/tags.config.js**:
```javascript
export const tagsConfig = [
  { id: 1, name: '列表', color: '#4facfe' },
  { id: 2, name: '函数', color: '#ff9f00' },
  { id: 3, name: '循环', color: '#2ecc71' }
]
```

**src/config/questions.config.js**:
```javascript
export const questionsConfig = {
  tags: [...],  // 标签列表
  questions: [
    {
      id: 1,
      title: '列表基础练习',
      type: 'choice',
      difficulty: 'easy',
      tags: [1, 2],
      content: '下列哪个方法可以向列表末尾添加元素？',
      choices: [
        { content: 'A. append()', isCorrect: true },
        { content: 'B. insert()', isCorrect: false }
      ]
    },
    {
      id: 2,
      title: '函数编写练习',
      type: 'program',
      difficulty: 'medium',
      tags: [2],
      content: '编写一个函数，求两个数的和',
      testCases: [
        { input: '1 2', expectedOutput: '3', score: 50 },
        { input: '5 7', expectedOutput: '12', score: 50 }
      ]
    }
  ]
}
```

---

## 四、OJ 判题设计

### 安全控制

1. **超时控制**：Python 代码执行超时 5 秒强制终止
2. **危险函数检测**：黑名单过滤 `os`, `subprocess`, `eval`, `exec`, `open`, `file`
3. **资源限制**：子进程内存限制

### 判题流程

```
学生提交代码
      │
      ▼
┌─────────────┐
│ 安全过滤    │ → 检测危险函数，reject 则返回 error
└──────┬──────┘
       │ 通过
       ▼
┌─────────────┐
│ 代码执行    │ → child_process spawn python
│ 超时控制    │ → 5秒超时 kill
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ 判题比对    │ → 遍历 test_cases，比对输出
└──────┬──────┘
       │
       ▼
   计算总分 → 更新 submissions 表 → 返回结果
```

### 实现方式

使用 `child_process.spawn` 执行 Python 代码：
```javascript
const proc = spawn('python3', ['-c', code], {
  timeout: 5000,
  cwd: '/tmp'
})
```

---

## 五、学生端页面设计

### 页面：题库 /library

```
┌─────────────────────────────────────────────┐
│ 题库                        [返回]           │
├─────────────────────────────────────────────┤
│ 标签筛选：                                 │
│ [全部] [列表] [函数] [循环] [条件]          │
├─────────────────────────────────────────────┤
│ 难度：[不限▼]  排序：[最新▼]  搜索：[____] │
├─────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐ │
│ │ 1. Python 列表操作练习                   │ │
│ │ 难度：中等  标签：[列表] [函数]          │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

编程题页面使用类似 PythonIDEView 的 CodeEditor 组件。

---

## 六、管理后台设计

### 页面：题库管理 /admin/questions

- 题目列表（表格：标题、类型、难度、标签、操作）
- 新增/编辑弹窗

**选择题表单**：
- 标题、内容、难度、标签（多选）
- 选项列表（可添加/删除/标记正确答案）

**编程题表单**：
- 标题、内容、难度、标签
- 测试用例列表（输入、期望输出、分值）

### 页面：标签管理 /admin/questions/tags

- 简单的表格：标签名、颜色、操作

---

## 七、开发周期评估

| 模块 | 内容 | 难度 | 周期 |
|------|------|------|------|
| 数据库 | 建表 + 迁移脚本 | 低 | 0.5天 |
| 后端 API | 题目 CRUD + 标签 CRUD + 配置生成 | 低 | 1-2天 |
| OJ 判题 | Python 执行 + 判题逻辑 | 中高 | 2-3天 |
| 管理后台 | 题库管理页面 + 标签管理 | 中 | 1-2天 |
| 学生端 | 题库浏览 + 做题页面 | 中 | 2-3天 |
| **总计** | | | **6-10天** |

---

## 八、关键文件

### 新增文件

**后端**:
- `server/routes/questions.js` — 题目 API + 配置生成
- `server/routes/tags.js` — 标签 API + 配置生成
- `server/routes/library.js` — 学生端提交 API（OJ 判题）
- `server/judge.js` — OJ 判题核心

**学生端**:
- `src/config/tags.config.js` — 标签静态配置（自动生成）
- `src/config/questions.config.js` — 题库静态配置（自动生成）
- `src/views/LibraryView.vue` — 题库页面
- `src/views/PracticeView.vue` — 做题页面
- `src/composables/useLibrary.js` — 题库逻辑

**管理后台**:
- `admin/src/views/QuestionsView.vue` — 题库管理
- `admin/src/views/TagsView.vue` — 标签管理

### 修改文件

- `server/index.js` — 注册新路由
- `server/db.js` — 新增建表 SQL
- `server/build.js` — 构建触发逻辑（已存在复用）
- `src/router/index.js` — 新增路由
- `admin/src/router/index.js` — 新增路由

---

## 九、与现有系统的整合

1. **复用 build 机制** — scheduleBuild + 10分钟定时器复用
2. **复用 regenerate 模式** — 类似 teachers.js、messages.js 的配置再生
3. **复用 auth 体系** — JWT 认证复用现有教师身份
4. **复用样式系统** — CSS 变量保持一致

---

## 十、可简化方案（先做选择题）

如果初期只需要选择题（不做 OJ）：

| 模块 | 周期 |
|------|------|
| 数据库 + API + 配置生成 | 1天 |
| 管理后台 | 1天 |
| 学生端 | 1天 |
| **总计** | **3天** |

OJ 编程题作为二期功能独立开发。

---

## 验证方式

1. 启动后端 `npm run dev`
2. 启动管理后台 `cd admin && npm run dev`
3. 创建标签和题目，验证 CRUD
4. 等待构建完成（最多10分钟）
5. 启动学生端 `npm run dev`
6. 访问题库页面，验证标签筛选
7. 完成选择题，验证判分逻辑
8. （二期）测试编程题 OJ 判题