# PY1 正课 lesson-data.js 创建规范

## 一、文件概述

每个课程的 lesson-data.js 文件存放路径：
```
src/data/courses/PY1/lessons/L{X}-{N}/lesson-data.js
```

例如：`L1-1` 课程 → `src/data/courses/PY1/lessons/L1-1/lesson-data.js`

## 二、文件结构总览

每个 lesson-data.js 文件包含以下模块，按顺序排列：

```javascript
/**
 * PY1 课程 L{X}-{N}: 课程标题
 *
 * 核心知识点:
 * 1. 知识点1
 * 2. 知识点2
 * 3. 知识点3
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [...]

// 知识点数据
export const knowledgePoints = [...]

// 习题数据
export const exercises = [...]

// 课次元数据
export const lessonMeta = {...}

// 打字练习单词（按难度分组）
export const typingWords = {...}

// 代码模板练习（按难度分组）
export const typingTemplates = {...}

// 导出所有数据
export const L{X}_{N}_data = {...}
export default L{X}_{N}_data
```

---

## 三、各模块详解

### 3.1 头部注释

```javascript
/**
 * PY1 课程 L1-1: print()命令与变量
 *
 * 核心知识点:
 * 1. print() 命令 - 打印内容
 * 2. 变量 - 创建和使用
 */
```

- 第一行：课程编号和课程标题
- 核心知识点：列出本节课的主要知识点（1-3个）

---

### 3.2 单词卡数据 (vocabData)

#### 数据来源
1. **OCR 提取单词**：从 content.json 的 flashcard.content 中提取的主单词
2. **拓展词汇**：根据课程内容拓展的关联单词（0-2个）

#### OCR 单词提取规则
- 从原始内容中提取纯英文单词（不含空格）
- 每个单词后面紧跟音标行（以 `/` 或 `[` 开头）或中文解释行
- **不限制数量**：OCR 提取多少就记录多少，不做截断
- **不包含** 课程标题（如 "Python"）

#### 单词对象结构

```javascript
{
  word: 'print',              // 单词
  pronunciation: '[print]',   // 音标
  partOfSpeech: 'v.',         // 词性（n./v./adj./adv./conj.）
  meaning: '打印；输出',       // 中文含义
  level: 'easy',             // 难度：easy/medium/hard
  example: 'Press the print button.',        // 例句
  exampleTranslation: '按下打印按钮来打印文件。', // 例句翻译
  source: 'ocr'              // 来源：ocr/extended
}
```

#### 数量规则

**情况一：OCR 单词不足 6 个**
- 可添加拓展词汇
- 原始单词 + 拓展词汇 ≤ 6 个

**情况二：OCR 单词超过 6 个**
- 全部记录，不限制个数

| 场景 | 规则 |
|------|------|
| OCR < 6 | 补充拓展词，OCR + 拓展 ≤ 6 |
| OCR ≥ 6 | 全部记录，不做截断 |

#### 标记规则
- `source: 'ocr'` - 从原始课程内容提取的单词
- `source: 'extended'` - 自行拓展的关联单词

#### 词性说明
- `n.` - 名词
- `v.` - 动词
- `adj.` - 形容词
- `adv.` - 副词
- `conj.` - 连词

#### 示例

```javascript
// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'print',
    pronunciation: '[print]',
    partOfSpeech: 'v.',
    meaning: '打印；输出',
    level: 'easy',
    example: 'Press the print button.',
    exampleTranslation: '按下打印按钮来打印文件。',
    source: 'ocr'
  },
  {
    word: 'weight',
    pronunciation: '[weit]',
    partOfSpeech: 'n.',
    meaning: '重量；体重',
    level: 'medium',
    example: 'The weight is 5 kilograms.',
    exampleTranslation: '重量是5公斤。',
    source: 'ocr'
  },
  // 拓展单词（根据需要添加）
  {
    word: 'variable',
    pronunciation: '[ˈveəriəbl]',
    partOfSpeech: 'n.',
    meaning: '变量',
    level: 'medium',
    example: 'A variable stores data.',
    exampleTranslation: '变量存储数据。',
    source: 'extended'
  }
]
```

---

### 3.3 知识点数据 (knowledgePoints)

#### 结构
每个课程包含 2-3 个知识点，每个知识点包含三级难度内容（easy/medium/hard）

#### 知识点对象结构

```javascript
{
  id: 'kp-1',                    // 唯一标识（如 kp-1, kp-2）
  title: '打印命令 - print()',   // 知识点标题
  emoji: '🖨️',                  // 图标（ emoji）
  gradeLevel: '3-4',            // 适合年级
  summary: '把内容打印到输出区', // 一句话总结

  // 🟢 基础版（1-2年级）
  easy: {
    story: '...',   // 故事化讲解，用少儿的视角描述
    concept: '...', // 核心概念一句话说明
    syntax: '...',  // Python 语法格式
    example: {
      title: '...',      // 示例标题
      code: '...',       // Python 代码
      output: '...',     // 输出结果
      explanation: '...' // 代码解释
    },
    practice: [
      { question: '...', answer: '...' },
      { question: '...', answer: '...' }
    ]
  },

  // 🟡 进阶版（3-4年级）
  medium: { ... },

  // 🔴 挑战版（5-6年级）
  hard: { ... }
}
```

#### 各难度级别说明

| 级别 | 图标 | 年级 | 说明 |
|------|------|------|------|
| easy | 🟢 | 1-2年级 | 基础概念，适合入门 |
| medium | 🟡 | 3-4年级 | 进阶应用，稍复杂 |
| hard | 🔴 | 5-6年级 | 挑战拓展，深入理解 |

#### 编写要点

**story（故事）**
- 用故事/场景引入，适合少儿理解
- 用比喻的方式解释概念
- 控制在 2-3 句话

**concept（概念）**
- 核心概念一句话说明
- 清晰明了，不超过一句话

**syntax（语法）**
- Python 语法格式
- 缩进使用 4 个空格（PEP 8 标准）
- 示例要能直接运行

**example（示例）**
- 完整示例，包含代码、输出、解释
- 代码要简洁，能实际运行
- 输出要对应代码

**practice（练习）**
- 每个难度 2 道练习题
- 题目要结合知识点
- 答案要简洁明确

#### 示例

```javascript
{
  id: 'kp-1',
  title: '打印命令 - print()',
  emoji: '🖨️',
  gradeLevel: '1-2',
  summary: '把内容打印到输出区',

  easy: {
    story: '想象 print() 是一个神奇的打印机，你告诉它打印什么，它就会在输出区显示什么。就像用印章盖在纸上一样！',
    concept: 'print() 命令可以把括号里的内容打印到输出区显示出来。',
    syntax: "print('要打印的内容')",
    example: {
      title: '打印文字',
      code: "print('Hello')",
      output: 'Hello',
      explanation: 'print() 命令会直接把单引号里的内容打印出来。注意：文字要用单引号包裹起来。'
    },
    practice: [
      {
        question: "print('你好') 会输出什么？",
        answer: '你好'
      },
      {
        question: '打印文字时，文字两边要加什么？',
        answer: '单引号'
      }
    ]
  },

  medium: {
    story: 'print() 不仅能打印文字，还能打印数学算式的结果！就像一个计算器一样。',
    concept: '如果括号里写的是数学算式，print() 会先计算再显示结果。',
    syntax: 'print(算式)\nprint(数字)',
    example: {
      title: '打印数字和计算结果',
      code: 'print(2 * 3)\nprint(10 + 5)',
      output: '6\n15',
      explanation: 'print(2 * 3) 会先计算 2×3=6，然后打印出 6。print(10 + 5) 会先计算 10+5=15，然后打印出 15。'
    },
    practice: [
      {
        question: 'print(5 + 3) 会输出什么？',
        answer: '8'
      },
      {
        question: 'print(2 * 4) 会输出什么？',
        answer: '8'
      }
    ]
  },

  hard: {
    story: '高级打印技巧！你可以用 print() 同时打印多个内容，或者打印变量的值。',
    concept: 'print() 可以打印变量、表达式，甚至多个用逗号分隔的内容。',
    syntax: 'print(变量名)\nprint(内容1, 内容2)',
    example: {
      title: '打印变量和混合内容',
      code: `number = 7\nprint(number)\nprint('结果是', number * 2)`,
      output: '7\n结果是 14',
      explanation: '打印变量时不需要加引号，直接写变量名即可。print 还能同时打印多个内容，用逗号隔开。'
    },
    practice: [
      {
        question: 'n = 5, print(n) 会输出什么？',
        answer: '5'
      },
      {
        question: 'print(3, 5) 会输出什么？',
        answer: '3 5'
      }
    ]
  }
}
```

---

### 3.4 习题数据 (exercises)

#### 结构
每节课 6 道选择题，按难度分布：2道 easy + 2道 medium + 2道 hard

#### 习题对象结构

```javascript
{
  id: 'ex-1',
  level: 'easy',           // easy/medium/hard
  levelLabel: '基础',      // 显示标签
  levelEmoji: '🟢',       // 难度图标
  type: 'multiple-choice',
  mathConcept: '数数',    // 数学知识点
  question: '题目内容\n```python\n代码```',  // 题目（代码部分用```python包裹）
  options: ['A选项', 'B选项', 'C选项', 'D选项'],
  answer: 1,              // 答案索引（从0开始，0=A, 1=B, 2=C, 3=D）
  explanation: '解析内容', // 解析
  hint: '提示'           // 提示
}
```

#### 数量分布
| 难度 | 数量 |
|------|------|
| 🟢 easy | 2道 |
| 🟡 medium | 2道 |
| 🔴 hard | 2道 |

#### 题目编写规则

1. **题目内容**：简洁明确，考察核心知识点
2. **代码块**：Python 代码用 ```python``` 包裹
3. **选项**：4个选项，确保只有一个正确答案
4. **解析**：说明为什么选择该答案
5. **提示**：给出解题思路的暗示

#### 注意事项

- **代码块必须用 ```python``` 包裹**，不能用普通文本
- 选项中如果有代码或引号，需要用双引号包裹字符串
- 如果 question 中包含 Python 代码，必须使用模板字符串（`` ` ``）

#### 示例

```javascript
{
  id: 'ex-1',
  level: 'easy',
  levelLabel: '基础',
  levelEmoji: '🟢',
  type: 'multiple-choice',
  mathConcept: '打印命令',
  question: `以下代码的输出是？\n\n\`\`\`python\nprint('Hello')\n\`\`\``,
  options: [
    'Hello',
    "'Hello'",
    '报错',
    '什么都没有'
  ],
  answer: 0,
  explanation: "print('Hello') 会输出 Hello，注意打印时没有单引号。答案是 A。",
  hint: 'print 输出时不会显示引号'
}
```

---

### 3.5 课次元数据 (lessonMeta)

```javascript
export const lessonMeta = {
  id: 'L1-1',              // 课程ID
  title: 'print与变量',     // 标题（与 lesson-data.js 中一致）
  subtitle: '学会输出和存储数据',  // 副标题
  difficulty: '入门',       // 入门/进阶/挑战
  estimatedTime: '30-45分钟',  // 预计学习时间
  learningGoals: [          // 学习目标
    '掌握 print() 命令的基本用法',
    '理解变量的概念和创建方法',
    '能使用变量存储和使用数据'
  ],
  prerequisites: [          // 前置知识
    '认识数字和基本运算符号',
    '会用键盘输入内容'
  ]
}
```

---

### 3.6 打字练习单词 (typingWords)

#### 结构
```javascript
export const typingWords = {
  easy: ['print', 'right', 'box'],      // 简单单词
  medium: ['weight', 'height', 'variable'],  // 中等难度
  hard: ['output', 'assign', 'calculate']    // 较难单词
}
```

#### 规则
- **优先级一**：本节课单词卡中的单词（source: 'ocr' 的单词）
- **优先级二**：本节课相关的编程术语
- 按难度分 3 组，每组 3-4 个单词
- easy 组放单词卡中的简单词
- medium/hard 组放拓展词和相关术语

---

### 3.7 代码模板练习 (typingTemplates)

#### 结构
```javascript
export const typingTemplates = {
  easy: [
    "print('Hello')",
    'print(123)',
    'n = 5',
    'print(n)'
  ],
  medium: [
    "fruit = 'apple'",
    'print(fruit)',
    'print(3 + 5)',
    'number = 7\nprint(number)'
  ],
  hard: [
    "print('结果是', 3 + 5)",
    'n = 5\nn = n + 3',
    'a = 3\nb = 4\nprint(a + b)',
    'print(2 * 3 + 4)'
  ]
}
```

#### 规则
- Python 代码片段
- 缩进使用 4 个空格（PEP 8 标准）
- 按难度分 3 组，每组 4-6 个模板
- 包含本节课的核心语法

---

### 3.8 完整导出

```javascript
// 导出所有数据
export const L1_1_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L1_1_data
```

---

## 四、创建流程

### Step 1：分析原始内容
从 content.json 中提取：
- flashcard.content - 单词卡
- lecture.pdf - 正课内容
- exercise.pdf - 习题
- solution.pdf - 答案

### Step 2：提取 OCR 单词
1. 解析 flashcard.content
2. 提取纯英文单词（无空格，后面跟音标）
3. OCR 单词超过 6 个时：全部提取，不做截断
4. OCR 单词不足 6 个时：补充拓展词（原始 + 拓展 ≤ 6）

### Step 3：编写知识点
根据 lecture 内容，设计 2-3 个知识点
每个知识点包含 easy/medium/hard 三级

### Step 4：编写习题
从 exercise.pdf 改编选择题
每个难度 2 道，共 6 道

### Step 5：编写元信息
- 标题、副标题（从 lesson-data.js 的 lessonMeta 中获取）
- 学习目标
- 前置知识

### Step 6：生成打字练习和代码模板
根据课程内容生成相关单词和代码片段

---

## 五、注意事项

### 5.1 代码块中的引号
如果 question 中包含 Python 代码且代码中有单引号，必须使用模板字符串（`` ` ``）：

```javascript
// 正确
question: `以下代码的输出是？\n\n\`\`\`python\nprint('Hello')\n\`\`\``

// 错误 - 单引号会导致语法错误
question: '以下代码的输出是？\n\n```python\nprint('Hello')\n```'
```

### 5.2 单词数量说明
- OCR 单词超过 6 个：全部记录，不做截断
- OCR 单词不足 6 个：可补充拓展词，原始 + 拓展 ≤ 6 个

### 5.3 文件命名
- 文件名：`lesson-data.js`
- 导出的数据名：`L{X}_{N}_data`（如 `L1_1_data`）
- 默认导出：`export default L{X}_{N}_data`

---

## 六、课程配置同步

创建完 lesson-data.js 后，需要同步更新 `src/config/courses.config.js` 中的配置：

### lessonConfig 更新
```javascript
'L1-1': { id: 'L1-1', title: 'print与变量', subtitle: '学会输出和存储数据' }
```
- title 和 subtitle 必须与 lesson-data.js 中的 lessonMeta 完全一致

### unitConfig 更新（如需要）
```javascript
L1: { id: 'L1', name: 'Level 1', description: 'print与变量' }
```

---

## 七、完整示例

参考文件：
- `src/data/courses/PY1/lessons/L1-1/lesson-data.js` - L1-1 完整示例