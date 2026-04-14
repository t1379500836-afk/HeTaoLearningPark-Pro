# 课程数据目录

本目录存储核桃编程 Python 课程的所有学习资料，按阶段（PY1/PY2/PY3）组织。

---

## 📚 文档导航

| 文档 | 说明 |
|------|------|
| [YCL 试卷开发规范](./YCL/README.md) | YCL 青少年人工智能编程水平测试试卷开发流程和质量标准 |

---

# 🚀 新课次开发完整流程

> **重要**：开发新课次前，请务必先提交当前代码到git仓库，防止意外丢失工作成果。

## 流程概览

```
源文件 (源文件/levelN/) → 文件整理 → OCR提取 → 生成lesson-data.js → 验证
```

## 第一步：文件整理和重命名

从源文件目录复制到课程目录，并按标准命名重命名：

```bash
# 源文件位置
源文件/level1/L1-1/
├── L1-1单词卡.png
├── 知识总结.png
├── L1-1讲义.pdf
├── L1-1课后习题.pdf
└── L1-1课后习题解析.pdf

# 目标位置 (标准命名)
src/data/courses/PY1/L1/L1-1/
├── flashcard.png      # 单词卡
├── knowledge.png      # 知识点图
├── lecture.pdf        # 讲义
├── exercise.pdf       # 课后习题
└── solution.pdf       # 习题解析
```

**文件命名规则**：
| 标准名称 | 源文件模式 |
|----------|-----------|
| `flashcard.png` | `L*-1单词卡(新logo版).png` 或 `L*-1单词卡.png` |
| `knowledge.png` | `知识总结.png` / `知识点总结.png` / `知识点图.png` |
| `lecture.pdf` | `L*-1讲义(新logo版).pdf` 或 `L*-1讲义.pdf` |
| `exercise.pdf` | `L*-1课后习题(新logo版).pdf` 或 `L*-1课后习题.pdf` |
| `solution.pdf` | `L*-1课后习题解析(新logo版).pdf` 或 `L*-1课后习题解析.pdf` |

**优先使用新logo版**，如果没有则使用普通版本。

## 第二步：OCR内容提取

```bash
# 运行OCR脚本
python scripts/extract_content.py PY1

# 输出文件：
# - src/data/courses/PY1/content.json
# - src/data/courses/PY1/README.md
```

## 第三步：生成 lesson-data.js

1. **创建lessons目录**：
   ```bash
   mkdir -p src/data/courses/PY1/lessons/L1-1
   ```

2. **参考模板文件**：`src/data/courses/PY1/lessons/L1-1/lesson-data.js`

3. **基于OCR结果编写数据**：
   - 读取 `content.json` 和 `README.md` 中的OCR结果
   - 提取单词卡、知识点、习题等结构化数据
   - 编写符合格式规范的 `lesson-data.js`

4. **关键命名规范**：
   ```javascript
   // ✅ 正确
   export const vocabData = [...]      // 不是 vocab
   export const lessonMeta = {...}     // 不是 meta
   export const L1_1_data = {...}      // 用下划线，不是 L1-1-data
   export const typingWords = {        // 字符串数组
     easy: ['print', 'code']
   }
   ```

## 第四步：验证

```bash
# 验证文件导入正确
node -e "
const data = require('./src/data/courses/PY1/lessons/L1-1/lesson-data.js').default;
console.log('标题:', data.meta.title);
console.log('知识点数:', data.knowledgePoints.length);
console.log('习题数:', data.exercises.length);
"
```

访问页面验证：`http://localhost:5173/lesson/PY1/L1/L1-1`

---

## 📑 文档导航

| 章节 | 内容 |
|------|------|
| [🚀 快速开始](#-快速开始---新课次开发流程) | 新课次开发完整流程 |
| [📁 目录结构](#-目录结构) | 项目目录组织 |
| [📋 数据格式规范](#️-关键命名规范必读) | lesson-data.js 格式要求 |
| [🔄 源文件映射](#-源文件到课程文件的映射) | 文件整理和命名规则 |
| [✅ 开发规范](#-开发规范与内容审查标准) | 代码和内容审查标准 |
| [📊 文件状态](#-文件状态) | 各课次完成情况 |

---

## 🚀 快速开始 - 新课次开发流程

开发新课次（如 PY3/L13）的完整流程：

### 第一步：准备源文件

1. **源文件位置**：`src/源文件/level{N}/` (如 `level13/`)
2. **文件结构**：
   ```
   level13/
   ├── L13-1/
   │   ├── L13-1讲义(新logo版).pdf
   │   ├── L13-1课后习题(新logo版).pdf
   │   └── L13-1课后习题解析(新logo版).pdf
   ├── L13-2/
   └── ...
   ```

### 第二步：提取内容

**方式A：使用 AI Agent（推荐）**

```bash
# 在项目根目录运行
# 让 Claude 读取 PDF 并提取结构化数据
```

**方式B：使用 Python 脚本**

```bash
# 安装依赖
pip install -r scripts/requirements.txt

# 运行提取脚本（针对 PY2/PY3）
python scripts/extract_content.py "src/源文件/level13" L13
```

**提取结果保存到**：
- `e:\AIIDE\WorkSpace\HeTaoLearningPark\L13-lesson-data.json`（临时）

### 第三步：创建 lesson-data.js 文件

1. **读取参考文件**：`src/data/courses/PY1/lessons/L1-1/lesson-data.js`
2. **读取提取数据**：`L13-lesson-data.json`
3. **创建目录**：
   ```bash
   mkdir -p src/data/courses/PY3/lessons/L13-1
   ```
4. **编写 lesson-data.js**（遵循格式规范，见下文）

### 第四步：验证

```bash
# 验证文件导入正确
node -e "
const L13_1 = require('./src/data/courses/PY3/lessons/L13-1/lesson-data.js').default;
console.log('L13-1:', L13_1.meta.title);
console.log('知识点数:', L13_1.knowledgePoints.length);
"
```

---

## 目录结构

```
courses/
├── PY1/           # Python 入门基础（L1-L6）
├── PY2/           # Python 进阶编程（L7-L12）
└── PY3/           # Python 高级应用（L13-L18）
```

---

## 阶段划分

| 阶段 | 单元范围 | 课次数量 | 内容描述 |
|------|---------|---------|---------|
| **PY1** | L1 ~ L6 | 24 课 | Python 入门基础 |
| **PY2** | L7 ~ L12 | 24 课 | Python 进阶编程 |
| **PY3** | L13 ~ L18 | 24 课 | Python 高级应用 |

---

## 单课次文件结构

每个课次（如 L7-1）包含以下学习资源：

```
L7-1/
├── flashcard.png    # 单词卡：英语单词 + 中文释义
├── knowledge.png    # 知识点图：编程语法图解
├── lecture.pdf      # 讲义：课程内容详解
├── exercise.pdf     # 课后习题：练习题
└── solution.pdf     # 习题解析：答案和讲解
```

---

## 配置和数据文件

### lessons.config.js
前端组件读取的课程配置文件，包含：
- 课次 ID 和标题
- 资源文件路径
- 课次状态（complete/partial/missing）

**使用方式**：
```javascript
import { py2LessonsConfig, getLessonResources } from './data/courses/PY2/lessons.config.js'

// 获取 L7-1 的资源
const resources = getLessonResources('L7', 'L7-1')
console.log(resources.flashcard)  // '/data/courses/PY2/L7/L7-1/flashcard.png'
```

### content.json
从 PDF 和图片中提取的结构化内容数据，由 Python 脚本自动生成。

**用途**：
- 前端组件直接读取显示
- 避免重复进行 OCR 处理

**数据结构**：
```json
{
  "id": "L7-1",
  "unit": "L7",
  "resources": {
    "flashcard": {
      "file": "src/data/courses/PY2/L7/L7-1/flashcard.png",
      "content": "提取的文字内容..."
    },
    "knowledge": { ... },
    "lecture": { ... },
    "exercise": { ... },
    "solution": { ... }
  }
}
```

### README.md
提取内容的 Markdown 格式版本，用于人工校对和内容优化。

---

## 内容提取脚本

### ⚠️ 重要：源文件保护（防止误删）

**源文件目录**：`源文件/` (项目根目录下)

> **历史教训**：2026年3月曾发生PY1课程数据被误删事件（未提交到仓库），导致需要从源文件重新恢复。
> **请务必遵守以下规则**：
> 1. 🚫 **永远不要删除** `源文件/` 目录中的原始PDF文件
> 2. ✅ **开发前先提交**：开始新课次开发前，先提交当前代码到git仓库
> 3. 📋 **使用前检查**：确保源文件完整

### 源文件位置

原始课程资料位于项目根目录的 `源文件/` 目录：

```
源文件/                  # ⚠️ 原始资料，请勿删除！
├── level1/             # PY1阶段 L1单元 (需恢复)
│   ├── L1-1/
│   │   ├── L1-1单词卡.png
│   │   ├── L1-1讲义.pdf
│   │   ├── L1-1课后习题.pdf
│   │   └── L1-1课后习题解析.pdf
│   ├── L1-2/
│   │   ├── L1-2单词卡(新logo版).png ⭐ 优先使用新logo版
│   │   ├── L1-2讲义(新logo版).pdf
│   │   ├── L1-2课后习题(新logo版).pdf
│   │   └── L1-2课后习题解析(新logo版).pdf
│   ├── L1-3/ ~ L1-4/
├── level2/             # PY1阶段 L2单元 (需恢复)
│   ├── L2-1/ ~ L2-4/
├── level3/             # PY1阶段 L3单元 (需恢复)
│   ├── L3-1/ ~ L3-4/
├── level4/             # PY1阶段 L4单元 (需恢复)
│   ├── L4-1/ ~ L4-4/
├── level5/             # PY1阶段 L5单元 (需恢复)
│   ├── L5-1/ ~ L5-4/
├── level6/             # PY1阶段 L6单元 (需恢复)
│   ├── L6-1/ ~ L6-4/
└── ...                 # level13+ 为 PY3 阶段
```

### 源文件到课程目录映射

| 源文件目录 | 课程目录 | 课次范围 | 状态 | 核心文件 |
|-----------|---------|---------|------|----------|
| `源文件/level1/` | `src/data/courses/PY1/lessons/` | L1-1 ~ L1-4 | 需恢复 | L1-1讲义.pdf, L1-1课后习题.pdf, L1-1课后习题解析.pdf |
| `源文件/level2/` | `src/data/courses/PY1/lessons/` | L2-1 ~ L2-4 | 需恢复 | L2-1讲义(新logo版).pdf, L2-1课后习题(新logo版).pdf |
| `源文件/level3/` | `src/data/courses/PY1/lessons/` | L3-1 ~ L3-4 | 需恢复 | L3-1讲义(新logo版).pdf, L3-1课后习题(新logo版).pdf |
| `源文件/level4/` | `src/data/courses/PY1/lessons/` | L4-1 ~ L4-4 | 需恢复 | 含智能家居版 |
| `源文件/level5/` | `src/data/courses/PY1/lessons/` | L5-1 ~ L5-4 | 需恢复 | 含智能家居版 |
| `源文件/level6/` | `src/data/courses/PY1/lessons/` | L6-1 ~ L6-4 | 需恢复 | L6-1讲义(新logo版).pdf, L6-1课后习题(新logo版).pdf |

### 各课次源文件清单

**Level 1 (L1单元)**
```
L1-1/
├── L1-1单词卡.png
├── L1-1讲义.pdf
├── L1-1课后习题.pdf
├── L1-1课后习题解析.pdf
└── 知识总结.png

L1-2/
├── L1-2单词卡(新logo版).png ⭐
├── L1-2讲义(新logo版).pdf ⭐
├── L1-2课后习题(新logo版).pdf ⭐
├── L1-2课后习题解析(新logo版).pdf ⭐
└── L1-2知识总结.png

L1-3/、L1-4（硬件前置版）/ ... 类似结构
```

**Level 6 (L6单元) - 示例**
```
L6-1/
├── L6-1单词卡(新logo版).png ⭐
├── L6-1讲义(新logo版).pdf ⭐
├── L6-1课后习题(新logo版).pdf ⭐
├── L6-1课后习题解析(新logo版).pdf ⭐
└── 知识点总结.png

L6-2/ ~ L6-4/ ... 类似结构
```

### 文件选择规则

开发时按以下优先级选择源文件：
1. **优先使用**：带 `(新logo版)` 后缀的 PDF 文件
2. **次选**：带最新日期备注的版本
3. **忽略**：标记为 `*(废用老版)*` 或 `*(旧)*` 的文件
4. **特殊处理**：`(智能家居版)` 需要确认是否使用

### 提取方式

#### 方式 A：使用 AI Agent（推荐）

对于 PY1 的 L5/L6 等新课次，使用 Claude 的 Task agent 直接读取 PDF 并提取结构化数据：

```javascript
// 在 Claude 中调用 Task tool
Task({
  subagent_type: "general-purpose",
  prompt: `读取以下 PDF 文件并提取课程数据：
  - 讲义：src/源文件/level13/L13-1/L13-1讲义(新logo版).pdf
  - 习题：src/源文件/level13/L13-1/L13-1课后习题(新logo版).pdf
  - 解析：src/源文件/level13/L13-1/L13-1课后习题解析(新logo版).pdf

  提取内容并保存到 JSON 文件。`
})
```

#### 方式 B：使用 Python 脚本

**脚本位置**：`scripts/extract_content.py`

**技术方案**：
- 图片 OCR：PaddleOCR 2.10.0（中英文识别）
- PDF 文字提取：PyPDF2

**使用方法**：
```bash
# 安装依赖
pip install -r scripts/requirements.txt

# 提取 PY2 内容（脚本硬编码为 PY2）
python scripts/extract_content.py

# 输出位置：
# - E:\AIIDE\WorkSpace\HeTaoLearningPark\src\data\courses\PY2\content.json
# - E:\AIIDE\WorkSpace\HeTaoLearningPark\src\data\courses\PY2\README.md
```

**注意**：当前脚本配置为处理 PY2 内容（L7-L12），处理其他阶段需要修改脚本配置。

---

## 源文件到课程文件的映射

### 文件整理和重命名规则

从 `src/源文件/` 整理到课程数据目录：

| 源文件位置 | 课程文件位置 | 说明 |
|-----------|-------------|------|
| `src/源文件/levelN/LN-X/` | `src/data/courses/PY{阶段}/lessons/LN-X/` | 源 PDF → lesson-data.js |
| `src/源文件/levelN/LN-X单词卡/` | 不再使用 | 单词内容已整合到 lesson-data.js |
| `src/源文件/levelN/LN-X知识点图/` | 不再使用 | 知识点已整合到 lesson-data.js |

### 文件命名对照

**源文件命名** → **课程文件命名**：

| 源文件 | 课程文件 | 导出名 |
|-------|---------|--------|
| `L6-1讲义(新logo版).pdf` | `L6-1/lesson-data.js` | `L6_1_data` |
| `L6-1课后习题(新logo版).pdf` | 同上 | - |
| `L6-1课后习题解析(新logo版).pdf` | 同上 | - |

### 完整开发工作流

```
1. 源文件（src/源文件/level6/）
   ├── L6-1讲义(新logo版).pdf
   ├── L6-1课后习题(新logo版).pdf
   └── L6-1课后习题解析(新logo版).pdf
           ↓
   2. 提取内容（AI Agent 或脚本）
   └── L6-lesson-data.json（临时文件，含所有课次）
           ↓
   3. 创建课程文件
   └── src/data/courses/PY1/lessons/L6-1/lesson-data.js
           ↓
   4. 验证
   └── node -e "require('./.../L6-1/lesson-data.js')"
```

---

## 内容筛选规则

**重要**：从原始资料提取到 Web 显示时，需要筛选内容。

### 保留的内容
- ✅ 编程语法、函数、命令
- ✅ 英语单词（编程相关）
- ✅ 代码示例
- ✅ 编程练习题

### 舍去的内容
- ❌ 剧情动画描述
- ❌ 游戏角色/场景
- ❌ 核桃部落故事
- ❌ 项目日志/进度

### 视情况保留
- ⚠️ 科学探索知识（与编程相关则保留）

---

## 文件状态

### PY2 阶段
| Level | 课次 | 状态 |
|-------|------|------|
| L7 | L7-1 ~ L7-4 | ✅ 完整 |
| L8 | L8-1 ~ L8-4 | ✅ 完整 |
| L9 | L9-1 ~ L9-4 | ✅ 完整 |
| L10 | L10-1 ~ L10-3 | ⚠️ L10-4 缺失 |
| L11 | L11-1, L11-2, L11-4 | ⚠️ L11-3 缺失，L11-2 缺 solution |
| L12 | L12-1 ~ L12-4 | ✅ 完整 |

### PY1 阶段
| Level | 课次 | 状态 | 备注 |
|-------|------|------|------|
| L1 | L1-1 ~ L1-4 | 🔴 需恢复 | 2026-03误删，源文件在`源文件/level1/` |
| L2 | L2-1 ~ L2-4 | 🔴 需恢复 | 源文件在`源文件/level2/` |
| L3 | L3-1 ~ L3-4 | 🔴 需恢复 | 源文件在`源文件/level3/` |
| L4 | L4-1 ~ L4-4 | 🔴 需恢复 | 源文件在`源文件/level4/` |
| L5 | L5-1 ~ L5-4 | 🔴 需恢复 | 源文件在`源文件/level5/` |
| L6 | L6-1 ~ L6-4 | 🔴 需恢复 | 源文件在`源文件/level6/` |

---

## 结构化课程数据格式规范

### ⚠️ 关键命名规范（必读）

从 L4-L6 开发过程中总结的常见错误，**必须遵守**：

| 导出名称 | 正确 ❌ | 错误 ✗ | 说明 |
|---------|--------|--------|------|
| 单词数据 | `vocabData` | `vocab` | 必须 vocabData |
| 课次元数据 | `lessonMeta` | `meta` | 必须 lessonMeta |
| 综合导出 | `L1_1_data` | `L1-1_data` | 用下划线，不能用连字符 |
| typingWords | 字符串数组 | 对象数组 | 见下方详细说明 |

### lessons 目录
各阶段的结构化课程数据，供前端动态加载使用。

**目录结构**：
```
PY1/lessons/
├── L1-1/
│   └── lesson-data.js     # L1-1 完整课程数据
└── ...

PY2/lessons/
├── L7-1/
│   └── lesson-data.js     # L7-1 完整课程数据
└── ...

PY3/lessons/
├── L13-1/
│   └── lesson-data.js
└── ...
```

**完整数据结构**：
```javascript
// 1. 单词卡数据（5-8个单词）
export const vocabData = [
  {
    word: 'print',
    pronunciation: '[print]',
    partOfSpeech: 'v./n.',
    meaning: '打印；印刷；出版',
    level: 'easy',           // easy/medium/hard
    example: 'Print your name.',
    exampleTranslation: '打印你的名字。',
    note: 'out of print 绝版的'
  },
  // ... 更多单词
]

// 2. 知识点数据（3-6个知识点，每个分3个难度）
export const knowledgePoints = [
  {
    id: 'kp-1',              // 必须唯一
    title: '魔法打印机 - print()命令',
    emoji: '🖨️',
    gradeLevel: '1-2',       // 适用年级
    summary: '在输出区显示文字和计算结果',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一台魔法打印机...',
      concept: 'print() 命令可以把括号中的内容显示在输出区...',
      syntax: 'print(\'要打印的内容\')',
      example: {
        title: '打印问候语',
        code: 'print(\'你好，世界!\')',
        output: '你好，世界!',
        explanation: 'print() 命令会把单引号中的文字原样打印。'
      },
      practice: [
        { question: '如何打印 "你好"？', answer: 'print(\'你好\')' },
        { question: 'print() 命令中，文字需要加什么符号？', answer: '单引号' }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '...',
      concept: '...',
      syntax: '...',
      example: { title, code, output, explanation },
      practice: [...]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '...',
      concept: '...',
      syntax: '...',
      example: { title, code, output, explanation },
      practice: [...]
    }
  },
  // ... 更多知识点
]

// 3. 习题数据（4-6题，分难度）
export const exercises = [
  {
    id: 'ex-1',             // 必须唯一
    level: 'easy',          // easy/medium/hard
    levelLabel: '基础',      // 对应level的中文
    levelEmoji: '🟢',       // 对应level的表情
    type: 'multiple-choice', // multiple-choice 或 coding
    mathConcept: '符号识别',
    question: '下面哪段代码能正确打印出 "乌拉乎"？\n\nA. print(乌拉乎)\nB. print 乌拉乎\nC. print(\'乌拉乎\')\nD. print \'乌拉乎\'',
    options: [
      'A. print(乌拉乎)',
      'B. print 乌拉乎',
      'C. print(\'乌拉乎\')',
      'D. print \'乌拉乎\''
    ],
    answer: 2,              // 正确答案的索引（从0开始）⚠️ 注意验证
    explanation: 'print() 命令的正确格式是：print 后面跟括号...',
    hint: 'print() 命令需要括号，文字需要加引号'
  },
  // ... 更多习题
]

// 4. 课次元数据
export const lessonMeta = {
  id: 'L1-1',
  title: '编程启程',
  subtitle: '学会 print() 命令和变量',
  difficulty: '入门',       // 入门/基础/进阶/挑战/综合练习
  estimatedTime: '30-40分钟',
  learningGoals: [
    '掌握 print() 命令的基本用法',
    '理解变量的概念和用途',
    '学会创建和使用变量',
    '了解键盘符号输入方法'
  ],
  prerequisites: [
    '无需编程基础',
    '认识英文字母和数字',
    '会使用键盘输入'
  ]
}

// 5. 打字练习单词（⚠️ 必须是字符串数组）
export const typingWords = {
  easy: ['print', 'number', 'text', 'code'],     // ✅ 正确：字符串数组
  medium: ['weight', 'height'],
  hard: ['variable', 'element', 'modify']
}
// ❌ 错误示例：
// {
//   easy: [{word: 'print', hint: '打印'}]  // ✗ 这是对象数组，错误！

// 6. 代码模板练习
export const typingTemplates = {
  easy: [
    "print('Hello')",
    'print(123)',
    'name = "Tom"',
    'age = 10',
    'print(name)',
    'print(2 + 3)'
  ],
  medium: [
    'number = 7\nprint(number)',
    'fruit = "apple"\nprint(fruit)',
    'age = 10\nprint(age * 2)',
    'x = 5\ny = x + 3',
    'score = 100\nprint(score)'
  ],
  hard: [
    'a = 10\nb = a + 5\nprint(b)',
    'n = 1\nn = n + 2\nprint(n)',
    'x = 5\ny = x * 2\nprint(x + y)',
    'name = "Py"\nprint(name + "thon")',
    'a = 10\nb = 20\nprint(a + b)'
  ]
}

// 7. 综合导出（⚠️ 用下划线，不用连字符）
export const L1_1_data = {
  meta: lessonMeta,        // ⚠️ 用 lessonMeta，不是 meta
  vocab: vocabData,        // ⚠️ 用 vocabData，不是 vocab
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L1_1_data
```

### ⚠️ typingWords 格式规范

**正确格式**（字符串数组）：
```javascript
export const typingWords = {
  easy: ['print', 'number', 'text', 'code'],
  medium: ['weight', 'height', 'age'],
  hard: ['variable', 'element', 'modify']
}
```

**错误格式**（对象数组，不要用）：
```javascript
// ❌ 错误！这不是我们使用的格式
export const typingWords = {
  easy: [
    { word: 'print', hint: '打印' },
    { word: 'number', hint: '数字' }
  ]
}
```

### 习题 answer 字段验证

**关键**：`answer` 是正确答案在 `options` 数组中的索引（从 0 开始）。

```javascript
// ✅ 正确示例
{
  question: '2 + 3 = ?',
  options: ['4', '5', '6'],  // 索引 0='4', 1='5', 2='6'
  answer: 1,                 // 正确！'5' 在索引 1
  explanation: '2 + 3 = 5'
}

// ❌ 错误示例
{
  question: '2 + 3 = ?',
  options: ['4', '5', '6'],
  answer: 2,                 // 错误！指向 '6'，但解释说答案是 '5'
  explanation: '2 + 3 = 5'   // 与 answer 不一致
}
```

**验证方法**：
```javascript
// 验证公式
const correctAnswer = options[answer];
// correctAnswer 应该等于 explanation 中的答案
```

### 全局资源池
各阶段的单词池和代码模板池，供打字练习使用。

**文件**：
- `PY1/typing-words-pool.js` - PY1 阶段单词池
- `PY1/typing-templates-pool.js` - PY1 阶段代码模板池

---

## 资源路径格式

在 `lessons.config.js` 中，资源路径使用绝对路径格式（从项目根目录开始）：

```javascript
{
  flashcard: '/data/courses/PY2/L7/L7-1/flashcard.png',
  knowledge: '/data/courses/PY2/L7/L7-1/knowledge.png',
  lecture: '/data/courses/PY2/L7/L7-1/lecture.pdf',
  exercise: '/data/courses/PY2/L7/L7-1/exercise.pdf',
  solution: '/data/courses/PY2/L7/L7-1/solution.pdf'
}
```

前端组件使用时，通过 Vite 的静态资源服务直接访问。

---

## 开发规范与内容审查标准

### 📋 课次文件规范

每个课次目录必须包含且仅包含以下5个文件：

```
LX-X/
├── flashcard.png    # 单词卡（命名统一，不使用课次编号前缀）
├── knowledge.png    # 知识点图
├── lecture.pdf      # 讲义
├── exercise.pdf     # 课后习题
└── solution.pdf     # 习题解析
```

**文件命名规则**：
- ✅ 使用统一命名：`flashcard.png`、`knowledge.png`、`lecture.pdf`、`exercise.pdf`、`solution.pdf`
- ❌ 不使用带编号的命名：如 `L1-1单词卡.png`、`知识总结.png`
- ❌ 不保留额外文件：如 `.url` 快捷方式、重复的 `.jpg` 文件等

### 🔍 lesson-data.js 审查标准

#### 1. 习题答案验证（必查）

**答案索引检查**：
- `answer` 字段必须正确指向 `options` 数组中正确答案的索引（从0开始）
- **验证公式**：`正确答案 = options[answer]`
- **常见错误**：
  - ❌ `answer: 0` 但正确答案是 `options[1]`
  - ❌ 解释文本中说明的答案与 `answer` 索引不一致

**检查方法**：
```javascript
// ❌ 错误示例
{
  question: '2 + 3 = ?',
  options: ['4', '5', '6'],
  answer: 2,  // 错误！应该是1
  explanation: '2 + 3 = 5'  // 解释说5，但answer指向6
}

// ✅ 正确示例
{
  question: '2 + 3 = ?',
  options: ['4', '5', '6'],
  answer: 1,  // 正确！指向'5'
  explanation: '2 + 3 = 5'
}
```

#### 2. 选项逻辑一致性检查

**多选题陷阱**：
- 如果选项是"以上都对"、"A和B都对"等，必须确保所有相关选项确实正确
- **验证步骤**：
  1. 计算每个选项的真实值
  2. 只有所有相关选项都正确时，"以上都对"类选项才正确

**示例检查**：
```javascript
// ❌ 错误示例
{
  question: 'age=10，哪些表达式是True？',
  options: [
    'A. age > 15',     // False
    'B. age == 10',    // True
    'C. age < 20',     // True
    'D. 以上都对'      // 错误！A是False
  ],
  answer: 3  // 逻辑错误
}

// ✅ 正确示例
{
  question: 'age=10，哪些表达式是True？',
  options: [
    'A. age > 15',     // False
    'B. age == 10',    // True
    'C. age < 20',     // True
    'D. B和C都对'      // 正确
  ],
  answer: 3
}
```

#### 3. Python 运算优先级验证

**乘方运算（右结合）**：
```python
2 ** 3 ** 2  # = 2 ** (3 ** 2) = 2 ** 9 = 512
# 不是 (2 ** 3) ** 2 = 64
```

**逻辑运算优先级**：
```python
True and False or True
# = (True and False) or True
# = False or True
# = True
```

#### 4. 浮点数精度问题

**不直接用 == 比较浮点数**：
```python
0.1 + 0.2 == 0.3  # False！
# 正确做法：abs((0.1 + 0.2) - 0.3) < 0.0001
```

### 📝 内容一致性检查

#### 课程资料与 lesson-data.js 对照

| 项目 | 检查点 |
|------|--------|
| 单词卡 | vocabData 中的单词是否与 flashcard.png 一致 |
| 知识点 | knowledgePoints 标题是否与 knowledge.png 匹配 |
| 习题 | exercises 中的题目是否与 exercise.pdf 对应 |
| 解析 | explanation 文本是否与 solution.pdf 解析一致 |

### ✅ 开发完成检查清单

在提交新的 lesson-data.js 之前，请确认：

- [ ] 所有习题的 `answer` 索引与 `explanation` 中的答案一致
- [ ] 多选题的"以上都对"类选项已逐一验证
- [ ] Python 运算结果已实际验证（可在 Python REPL 中测试）
- [ ] 浮点数相关题目已考虑精度问题
- [ ] 代码示例语法正确，可直接运行
- [ ] 文件命名符合统一规范（flashcard.png 等）
- [ ] 无多余的临时文件或快捷方式

### 🧪 测试方法

```bash
# 使用 Python REPL 验证运算结果
python

# 验证示例
>>> 2 ** 3 ** 2
512
>>> 10 // 3
3
>>> 0.1 + 0.2 == 0.3
False
>>> True and False or True
True
```

### 📚 参考资源

- [Python 运算符优先级](https://docs.python.org/3/reference/expressions.html#operator-precedence)
- [Python 浮点数运算](https://docs.python.org/3/tutorial/floatingpoint.html)

---

## 🐛 常见错误和解决方案

从 L4-L6 开发过程中总结的常见问题：

### 1. 数据结构命名错误

| 错误 | 正确 | 解决方案 |
|------|------|----------|
| `export const vocab = [...]` | `export const vocabData = [...]` | 必须用 vocabData |
| `export const meta = {...}` | `export const lessonMeta = {...}` | 必须用 lessonMeta |
| `export const L1-1_data = {...}` | `export const L1_1_data = {...}` | 用下划线不用连字符 |

**验证方法**：
```bash
node -e "
const data = require('./src/data/courses/PY1/lessons/L1-1/lesson-data.js').default;
console.log('meta:', data.meta);      // ✅ 应该有值
console.log('vocab:', data.vocab);    // ✅ 应该有值
"
```

### 2. typingWords 格式错误

**错误格式**（对象数组）：
```javascript
// ❌ 错误！
export const typingWords = {
  easy: [
    { word: 'print', hint: '打印' },  // 这是对象数组
    { word: 'list', hint: '列表' }
  ]
}
```

**正确格式**（字符串数组）：
```javascript
// ✅ 正确！
export const typingWords = {
  easy: ['print', 'list', 'for', 'range'],  // 字符串数组
  medium: ['append', 'len', 'element']
}
```

### 3. 习题 answer 索引错误

```javascript
// ❌ 错误：answer 索引与解释不一致
{
  options: ['A. 选项1', 'B. 选项2', 'C. 选项3'],
  answer: 2,           // 指向 'C. 选项3'
  explanation: '答案是选项2'  // 但解释说是选项2（索引1）
}

// ✅ 正确
{
  options: ['A. 选项1', 'B. 选项2', 'C. 选项3'],
  answer: 1,           // 指向 'B. 选项2'
  explanation: '答案是选项2'  // 一致
}
```

### 4. 代码语法错误（单引号冲突）

```javascript
// ❌ 错误：外层单引号，内层也有单引号
syntax: '# 字符串拼接\ns = 'Count: ' + str(10)'

// ✅ 正确：内层改用双引号
syntax: '# 字符串拼接\ns = "Count: " + str(10)'
```

### 5. 知识点结构不完整

```javascript
// ❌ 错误：缺少 easy/medium/hard 某个级别
{
  id: 'kp-1',
  title: '知识点标题',
  easy: { story: '...', concept: '...' },
  hard: { story: '...', concept: '...' }
  // 缺少 medium！
}

// ✅ 正确：三个级别都要有
{
  id: 'kp-1',
  title: '知识点标题',
  easy: { story, concept, syntax, example, practice },
  medium: { story, concept, syntax, example, practice },
  hard: { story, concept, syntax, example, practice }
}
```

---

## 🖥️ 代码格式规范

### 代码示例显示规范

在 lesson-data.js 中，代码示例应根据使用场景选择合适的格式：

#### 1. 习题中的代码示例

**格式**：使用 ```python 代码块包裹，确保语法高亮和缩进可见

```javascript
// ✅ 正确示例
{
  question: '下面代码会输出什么？\n\n```python\nif x > 0:\n    if x > 10:\n        print("大正数")\n    else:\n        print("小正数")\nelse:\n    print("非正数")\n```',
  options: [...],
  answer: 0
}
```

**注意事项**：
- ✅ 代码块必须完整且可运行
- ✅ 缩进必须清晰可见（每个缩进级别用4个空格）
- ✅ 嵌套结构必须完整展示
- ❌ 不允许使用不完整的代码片段

#### 2. knowledgePoints 中的代码示例

**格式**：使用字符串存储，用 `\n` 表示换行，`\n    ` 表示缩进

```javascript
// ✅ 正确示例
example: {
  title: 'if-else 基础',
  code: 'age = 10\nif age >= 6:\n    print("上学")\nelse:\n    print("在家")',
  output: '上学',
  explanation: 'age=10 满足 >=6，所以执行 if 后的代码。'
}
```

**注意事项**：
- ✅ 代码必须是完整的、可运行的
- ✅ 每个缩进级别用 `\n    `（换行+4个空格）
- ✅ 确保代码语法正确，能直接复制到 Python 中运行

#### 3. typingTemplates 中的代码模板

**格式**：必须是完整的、可直接运行的代码片段

```javascript
// ✅ 正确示例 - 完整可运行
typingTemplates: {
  easy: [
    'age = 10\nif age >= 18:\n    print("成人")',
    'for i in range(5):\n    print(i)'
  ]
}

// ❌ 错误示例 - 不完整代码片段
typingTemplates: {
  easy: [
    'if age >= 18:',      // 不完整，没有缩进代码块
    'for i in range(5):' // 不完整，没有缩进代码块
  ]
}
```

### 代码完整性检查清单

#### 控制结构完整性

**if 语句**：
```python
# ✅ 正确 - 有缩进的代码块
if x > 0:
    print("正数")

# ❌ 错误 - 没有代码块
if x > 0:

# ❌ 错误 - 没有缩进
if x > 0:
print("正数")  # 缺少缩进
```

**for/while 循环**：
```python
# ✅ 正确 - 有缩进的代码块
for i in range(5):
    print(i)

# ❌ 错误 - 没有代码块
for i in range(5):

# ❌ 错误 - 没有缩进
for i in range(5):
print(i)  # 缺少缩进
```

**嵌套结构**：
```python
# ✅ 正确 - 完整的嵌套结构
if x > 0:
    if x > 10:
        print("大正数")
    else:
        print("小正数")
else:
    print("非正数")

# ❌ 错误 - 外层 if 没有代码块
if x > 0:
if x > 10:
    print("大正数")
```

#### 常见代码格式错误

| 错误类型 | 错误示例 | 正确示例 |
|----------|----------|------------|
| 缺少代码块 | `if x > 0:` 后直接结束 | `if x > 0:\n    print("x>0")` |
| 缺少缩进 | `if x > 0:\nprint("x")` | `if x > 0:\n    print("x")` |
| 不完整语句 | `for i in range(5):` | `for i in range(5):\n    print(i)` |
| 冒号后无内容 | `for ch in text:` | `for ch in text:\n    print(ch)` |

### 代码示例验证方法

在提交代码前，请按以下步骤验证：

1. **语法检查**：代码能否在 Python REPL 中直接运行
2. **缩进检查**：每个 `:` 后是否有正确的缩进代码块
3. **完整性检查**：所有控制结构（if/for/while）都有对应的代码块
4. **可运行性**：代码复制后能立即执行并产生正确结果

```bash
# 验证示例
python

# 复制粘贴代码测试
>>> if x > 0:
...     print("正数")
...
正数
```

---

## 📌 快速参考 - lesson-data.js 模板

复制以下模板开始新课次开发：

```javascript
/**
 * PY1 课程 LX-X: 课次标题
 *
 * 核心知识点:
 * 1. 知识点1
 * 2. 知识点2
 * 3. 知识点3
 */

// 单词卡数据（5-8个）
export const vocabData = [
  {
    word: 'example',
    pronunciation: '[ɪɡˈzæmpl]',
    partOfSpeech: 'n.',
    meaning: '示例；榜样',
    level: 'easy',
    example: 'This is an example.',
    exampleTranslation: '这是一个例子。',
    note: '备注'
  }
  // ... 更多单词
]

// 知识点数据（3-6个，每个分3个难度）
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '知识点标题',
    emoji: '📝',
    gradeLevel: '1-2',
    summary: '知识点简介',

    easy: {
      story: '故事背景...',
      concept: '概念解释...',
      syntax: '语法示例...',
      example: {
        title: '示例标题',
        code: 'print("Hello")',
        output: 'Hello',
        explanation: '解释说明...'
      },
      practice: [
        { question: '问题？', answer: '答案' }
      ]
    },
    medium: { /* 同上结构 */ },
    hard: { /* 同上结构 */ }
  }
  // ... 更多知识点
]

// 习题数据（4-6题）
export const exercises = [
  {
    id: 'ex-1',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '数学概念',
    question: '题目内容...',
    options: ['A. 选项1', 'B. 选项2', 'C. 选项3', 'D. 选项4'],
    answer: 0,  // ⚠️ 正确答案的索引（0开始）
    explanation: '解释说明...',
    hint: '提示内容...'
  }
  // ... 更多习题
]

// 课次元数据
export const lessonMeta = {
  id: 'LX-X',
  title: '课次标题',
  subtitle: '副标题',
  difficulty: '入门',
  estimatedTime: '30-40分钟',
  learningGoals: ['目标1', '目标2'],
  prerequisites: ['前置条件1', '前置条件2']
}

// ⚠️ 打字练习单词（必须是字符串数组！）
export const typingWords = {
  easy: ['word1', 'word2', 'word3'],
  medium: ['word4', 'word5', 'word6'],
  hard: ['word7', 'word8', 'word9']
}

// 代码模板练习
export const typingTemplates = {
  easy: ['code1', 'code2', 'code3'],
  medium: ['code4', 'code5', 'code6'],
  hard: ['code7', 'code8', 'code9']
}

// ⚠️ 综合导出（用下划线，不用连字符）
export const LX_X_data = {
  meta: lessonMeta,     // ⚠️ lessonMeta 不是 meta
  vocab: vocabData,     // ⚠️ vocabData 不是 vocab
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default LX_X_data
```

### 验证命令

```bash
# 验证文件导入正确
node -e "
const data = require('./src/data/courses/PY1/lessons/LX-X/lesson-data.js').default;
console.log('标题:', data.meta.title);
console.log('知识点数:', data.knowledgePoints.length);
console.log('习题数:', data.exercises.length);
console.log('✅ 导入成功!');
"
```

### 关键检查清单

开发新课次时，确认：

- [ ] 使用 `vocabData` 不是 `vocab`
- [ ] 使用 `lessonMeta` 不是 `meta`
- [ ] 使用 `LX_X_data` 不是 `LX-X-data`
- [ ] `typingWords` 是字符串数组，不是对象数组
- [ ] 每个知识点都有 `easy`、`medium`、`hard` 三个级别
- [ ] 习题 `answer` 索引与 `explanation` 中的答案一致
- [ ] 代码示例完整可运行，每个 `:` 后有缩进代码块
- [ ] 文件已通过验证命令测试

