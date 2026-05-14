# 题库管理系统设计文档

## 一、题库建设要求

### 题目难度规则

| 难度 | 核心语法要求 | 说明 |
|------|-------------|------|
| easy | 1 个核心知识点 | 简单题目，考查单一基础语法，允许少量其他语法陪衬 |
| medium | 2 个核心知识点 | 中等题目，考查两个核心语法的结合 |
| hard | 多个核心知识点 | 困难题目，考察实际问题场景的算法应用 |

### 核心知识点标签（标签 ID 对照）

| ID | 标签名 | 说明 |
|----|--------|------|
| 2 | print命令 | 输出语句 |
| 3 | input输入 | 输入语句 |
| 4 | 变量与赋值 | 变量定义和赋值操作 |
| 5 | 布尔值 | True/False 布尔类型 |
| 6 | 比较运算符 | >、<、==、!= 等 |
| 7 | 逻辑运算 | and、or、not |
| 8 | 条件判断 | if、elif、else |
| 9 | for循环 | for 循环遍历 |
| 10 | while循环 | while 循环 |
| 11 | 循环嵌套 | 多层循环嵌套 |
| 12 | break | 跳出循环 |
| 13 | continue | 跳过本次循环 |
| 14 | 字符串基础 | 字符串定义和操作 |
| 15 | 字符串切片 | 字符串切片操作 |
| 16 | 列表基础 | 列表创建和基本操作 |
| 17 | 列表遍历 | 列表循环遍历 |
| 18 | 列表操作 | append、remove 等方法 |
| 19 | 二维列表 | 嵌套列表 |
| 20 | 字典 | 字典创建和访问 |
| 21 | 集合 | 集合操作 |
| 22 | 数据类型转换 | int()、str() 等转换 |
| 23 | 函数基础 | 函数定义和调用 |
| 24 | 列表推导式 | 列表推导式语法 |
| 25 | 随机模块 | random 模块使用 |

### 题目内容要求

1. **easy 简单题**
   - 核心考查单一知识点
   - 题目描述简洁明了
   - 允许少量基础语法陪衬（如 print 搭配简单变量操作）
   - 示例：Hello World、变量交换、奇偶数判断

2. **medium 中等题**
   - 核心考查两个语法点的结合
   - 题目复杂度略有提升
   - 示例：循环嵌套打印矩形、break/while 结合找平方数

3. **hard 困难题**
   - 考查实际问题场景的算法思维
   - 需要综合运用多个语法点
   - 示例：需要用到查找算法的题目、需要优化性能的题目

---

## 二、数据库表结构

### question_tags 标签表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT | 主键，自增 |
| name | VARCHAR(50) | 标签名称，唯一 |
| color | VARCHAR(20) | 标签颜色，如 `rgb(105, 155, 195)` |
| parent_id | INT | 父标签ID，最顶层为 NULL |

### questions 题目表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT | 主键，自增 |
| title | VARCHAR(200) | 题目标题 |
| content | TEXT | 题目内容描述 |
| type | ENUM | 类型：`choice`(选择题) 或 `program`(编程题) |
| difficulty | ENUM | 难度：`easy`、`medium`、`hard` |
| tags | JSON | 标签ID数组，如 `[2]` 或 `[3, 22]` |
| choices | JSON | 选择题选项，编程题设为 NULL |
| test_cases | JSON | 编程题测试用例，选择题为 NULL |
| created_at | TIMESTAMP | 创建时间 |

### submissions 提交记录表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT | 主键，自增 |
| question_id | INT | 关联题目ID |
| code | TEXT | 学生提交代码 |
| status | ENUM | 状态：`pending`、`running`、`passed`、`failed`、`error` |
| result | JSON | 评测结果详情 |
| score | INT | 总分 |
| earned_score | INT | 实际得分 |
| total_score | INT | 题目总分 |
| submitted_at | TIMESTAMP | 提交时间 |

---

## 三、题目数据格式规范

### 1. 标签存储格式（重要）

**数据库中存储数字 ID，前端配置文件中转为字符串。**

数据库存储（数字）：
```json
[2]           // 单标签
[3, 22]       // 多标签
```

前端 `questions.config.js` 生成结果（字符串）：
```js
tags: ['2']           // 单标签
tags: ['3', '22']     // 多标签
```

> **注意**：前端筛选时需统一类型比较，因为 `tags.config.js` 中 `id` 是数字，而题目 `tags` 是字符串数组。

错误示例（数据库中不可用标签名）：
```json
["print命令"]   // ❌ 错误
```

### 2. tags JSON 格式
```json
[2]                          // 单标签
[3, 22]                       // 多标签（逗号后有空格）
```

### 3. test_cases JSON 格式

**必须使用直接 JSON 字符串，不可用 `JSON_ARRAY()` 函数！**

MySQL `JSON_ARRAY()` 会将对象存储为字符串而非 JSON 对象，导致前端解析失败。

正确格式：
```json
[{"input": "", "expectedOutput": "Hello World", "score": 34}, {"input": "", "expectedOutput": "Hello World", "score": 33}, {"input": "", "expectedOutput": "Hello World", "score": 33}]
```

错误格式（JSON_ARRAY 问题示例）：
```sql
-- JSON_ARRAY() 存储的是字符串，不是 JSON 对象
JSON_ARRAY('{"input": "1", "score": 10, "expectedOutput": "1"}')
-- 实际存储：['{"input": "1", "score": 10, "expectedOutput": "1"}']  ❌
```

### 4. test_cases 字段说明
| 字段 | 类型 | 说明 |
|------|------|------|
| input | string | 输入内容，空字符串表示无需输入 |
| expectedOutput | string | 期望输出 |
| score | int | 该测试点分值，建议总和为 100 |

### 5. choices JSON 格式（选择题）
```json
[
  {"content": "选项内容", "isCorrect": true},
  {"content": "选项内容", "isCorrect": false}
]
```

---

## 四、SQL 插入题目标范

```sql
-- 使用直接 JSON 字符串格式
INSERT INTO questions (title, content, type, difficulty, tags, test_cases) VALUES
('Hello World', '编写程序，输出"Hello World"。', 'program', 'easy', '[2]', '[{"input": "", "expectedOutput": "Hello World", "score": 34}, {"input": "", "expectedOutput": "Hello World", "score": 33}, {"input": "", "expectedOutput": "Hello World", "score": 33}]'),
('读取用户输入', '读取一个整数并输出它。', 'program', 'easy', '[3, 22]', '[{"input": "10", "expectedOutput": "10", "score": 34}, {"input": "0", "expectedOutput": "0", "score": 33}, {"input": "-5", "expectedOutput": "-5", "score": 33}]');
```

---

## 五、questions.config.js 生成规则

后端 `regenerateQuestionsConfig()` 从数据库读取题目并生成前端配置文件。

### 标签处理
```js
tags: [${tags.map(t => `'${t}'`).join(', ')}]
```
生成结果：
```js
tags: ['print命令', 'input输入']
```

### 转义处理
```js
const escape = (s) => String(s || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')
```

### testCases 处理
```js
testCases: [{ input: '${escape(tc.input)}', expectedOutput: '${escape(tc.expectedOutput)}', score: ${tc.score || 0} }]
```

---

## 六、常见错误汇总

### 1. tags 存储为标签名而非 ID
- 现象：管理端标签显示 "Tag 2" 等错误名称，无颜色
- 原因：使用了 `["print命令"]` 而非 `[2]`
- 解决：修改 SQL，使用标签 ID

### 2. test_cases 使用 JSON_ARRAY()
- 现象：管理端测试用例显示为空
- 原因：`JSON_ARRAY('{"input": "1"...}')` 存储的是 JSON 字符串而非 JSON 对象
- 解决：使用直接 JSON 字符串格式 `'[{"input": "1", ...}]'`

### 3. questions.config.js 中 tags 未加引号
- 现象：前端读取 config 后 tags 为 undefined
- 原因：生成代码时 `tags: [print命令]` 而非 `tags: ['print命令']`
- 解决：后端生成时对每个标签加单引号

### 4. 换行符未转义
- 现象：expectedOutput 包含多行但只显示第一行
- 原因：JSON 字符串中换行符未正确转义
- 解决：使用单个反斜杠 `\n`，如 `"5\n4\n3\n2\n1"`