/**
 * PY1 课程 L2-4: Online Judge 入门
 *
 * 核心知识点:
 * 1. 认识 OJ 线上测评系统
 * 2. OJ 解题流程
 * 3. OJ 实战应用
 */

// 单词卡数据 - OCR 提取
export const vocabData = [
  {
    word: 'online',
    pronunciation: "[ˌɒn'laɪn]",
    partOfSpeech: 'adj./adv.',
    meaning: '联机的；在线的；在网上地',
    level: 'easy',
    example: 'This game has many online users.',
    exampleTranslation: '这个游戏有很多在线用户。',
    note: 'online 在线'
  },
  {
    word: 'judge',
    pronunciation: '[dʒʌdʒ]',
    partOfSpeech: 'n./v.',
    meaning: '法官；裁判；判断；评判',
    level: 'medium',
    example: 'The judge gave a fair verdict.',
    exampleTranslation: '法官给出了公平的判决。',
    note: 'judge 裁判'
  },
  {
    word: 'submit',
    pronunciation: '[səb-mɪt]',
    partOfSpeech: 'v.',
    meaning: '提交；呈交',
    level: 'medium',
    example: 'Please submit your homework.',
    exampleTranslation: '请提交你的作业。',
    note: 'submit 提交'
  },
  {
    word: 'input',
    pronunciation: '[ɪn-pʊt]',
    partOfSpeech: 'n./v.',
    meaning: '输入；投入',
    level: 'easy',
    example: 'Enter your input here.',
    exampleTranslation: '在这里输入。',
    note: 'input 输入'
  },
  {
    word: 'output',
    pronunciation: '[aʊt-pʊt]',
    partOfSpeech: 'n./v.',
    meaning: '输出；产出',
    level: 'easy',
    example: 'The output is incorrect.',
    exampleTranslation: '输出是不正确的。',
    note: 'output 输出'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '认识OJ - 线上测评系统',
    emoji: '💻',
    gradeLevel: '1-2',
    summary: '了解 Online Judge 是什么',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个会自动批改作业的老师！你把答案交给它，它就会告诉你对还是错。这就是OJ系统！',
      concept: 'OJ（Online Judge）是一个线上测评系统，它会自动批改你提交的代码。',
      syntax: 'OJ = Online Judge = 线上测评系统',
      example: {
        title: 'OJ工作原理',
        code: '把代码提交给OJ系统\nOJ用多组数据测试\n系统自动判断对错\n显示测评结果',
        output: 'AC / WA / TLE 等',
        explanation: 'AC表示答案正确，WA表示答案错误，TLE表示超时。'
      },
      practice: [
        {
          question: 'OJ的全称是什么？',
          answer: 'Online Judge（线上测评）'
        },
        {
          question: 'OJ可以自动做什么？',
          answer: '自动批改代码，判断对错'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的OJ知识更丰富了！现在你知道OJ不只是判断对错，还有很多功能！',
      concept: 'OJ系统的特点：自动评分、多组测试数据、系统评判。',
      syntax: 'OJ功能：\n1. 自动评分\n2. 多组测试\n3. 系统判断',
      example: {
        title: 'OJ测评结果',
        code: 'AC - Accepted 正确\nWA - Wrong Answer 错误\nTLE - Time Limit Exceeded 超时\nRE - Runtime Error 运行错误',
        output: '根据结果修改代码',
        explanation: '不同的错误提示帮助你找到问题所在。'
      },
      practice: [
        {
          question: 'AC表示什么意思？',
          answer: 'Accepted，答案正确'
        },
        {
          question: 'WA表示什么意思？',
          answer: 'Wrong Answer，答案错误'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'OJ专家！你完全理解OJ了！',
      concept: '深入理解OJ系统的评测原理和评分机制。',
      syntax: '评分机制：\n按通过比例评分\n有部分分值\n有多组测试数据',
      example: {
        title: 'OJ评分示例',
        code: '10组测试数据\n通过8组 = 80分\n部分得分为：\n通过5组满分数据 = 50分\n+ 通过3组部分分数据 = 30分\n= 80分',
        output: '80',
        explanation: 'OJ会根据通过的测试数据计算最终得分。'
      },
      practice: [
        {
          question: 'OJ如何计算得分？',
          answer: '根据通过的测试数据比例'
        },
        {
          question: '多组测试数据是什么？',
          answer: '不同的输入数据，用来测试各种情况'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: 'OJ流程 - 解题步骤',
    emoji: '📝',
    gradeLevel: '1-2',
    summary: '掌握OJ解题的正确流程',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你在参加一场考试！OJ解题也是有步骤的！先读题，再做题，最后交卷！',
      concept: 'OJ解题的四个步骤：读题、编码、测试、提交。',
      syntax: 'OJ流程：\n1. 读题 - 看清输入输出\n2. 编码 - 编写代码\n3. 测试 - 用样例测试\n4. 提交 - 提交代码',
      example: {
        title: 'OJ解题示例',
        code: '题目：输入数字，输出它的两倍\n\n1.读题：输入一个数，输出它的2倍\n2.编码：n = input()\nprint(int(n)*2)\n3.测试：用样例测试\n4.提交：提交代码',
        output: '根据代码输出',
        explanation: '按照这个流程解题就不会乱！'
      },
      practice: [
        {
          question: 'OJ解题第一步是什么？',
          answer: '读题'
        },
        {
          question: '测试样例通过后就能得满分吗？',
          answer: '不一定，还要看其他测试数据'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你现在完全掌握OJ流程了！每一步都很重要！',
      concept: '深入理解每个步骤：读题要仔细、编码要规范、测试要全面、提交要小心。',
      syntax: '详细流程：\n1. 读题：输入、输出、样例\n2. 编码：处理数据、输出结果\n3. 测试：自测+样例\n4. 提交：确认后提交',
      example: {
        title: '完整OJ示例',
        code: '题目：判断奇偶数\n输入：一个整数\n输出：odd/even\n\n1.读题：输入整数，判断奇偶\n2.编码：\nn = int(input())\nif n % 2 == 0:\n    print("even")\nelse:\n    print("odd")\n3.测试：输入7 → odd\n4.提交',
        output: '根据测试数据输出',
        explanation: '完整的OJ解题流程！'
      },
      practice: [
        {
          question: '读题时要关注什么？',
          answer: '输入描述、输出描述、样例'
        },
        {
          question: '提交前要做什么？',
          answer: '测试样例和自测'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      title: 'OJ流程专家！你现在可以应对复杂的OJ题目了！',
      concept: '复杂题目的处理：分析题意、设计算法、实现代码、优化性能。',
      syntax: '复杂题目流程：\n1. 分析题目要求\n2. 设计算法\n3. 编写代码\n4. 测试和优化',
      example: {
        title: '复杂题目示例',
        code: '题目：计算1+2+...+n\n输入：n（1≤n≤1000）\n输出：1+2+...+n的和\n\n算法：等差数列求和\nsum = n * (n + 1) // 2\n\n或者用循环求和\ntotal = 0\nfor i in range(1, n+1):\n    total = total + i\nprint(total)',
        output: '根据n的值输出',
        explanation: '两种方法：公式法和循环法。\n\n数学知识：等差数列求和公式。'
      },
      practice: [
        {
          question: '如何选择算法？',
          answer: '选择效率高的算法'
        },
        {
          question: '如何优化代码？',
          answer: '使用公式减少循环次数'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: 'OJ实战 - 基础题目',
    emoji: '⚔️',
    gradeLevel: '1-2',
    summary: '练习OJ基础题目',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '现在你可以开始做OJ题目了！从最简单的开始！',
      concept: '从简单的输入输出题目开始练习。',
      syntax: '基础题目类型：\n1. 直接输出\n2. 读取输入并输出\n3. 简单计算',
      example: {
        title: 'Hello World',
        code: '# 题目：输出 Hello World\nprint("Hello World")',
        output: 'Hello World',
        explanation: '最简单的OJ题目，直接输出答案。'
      },
      practice: [
        {
          question: '最简单的OJ题目是什么类型？',
          answer: '直接输出'
        },
        {
          question: '需要用input()吗？',
          answer: '看题目是否需要输入'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你现在可以做需要输入输出的题目了！',
      concept: '需要读取输入、处理、输出的题目。',
      syntax: '输入输出题：\n1. 读取input()\n2. 处理数据\n3. 输出结果',
      example: {
        title: '简单计算',
        code: '# 题目：输出两数之和\na = int(input())\nb = int(input())\nprint(a + b)',
        output: '根据输入输出',
        explanation: '读取两个输入，输出它们的和。'
      },
      practice: [
        {
          question: 'input()返回的是什么类型？',
          answer: '字符串，需要转换类型'
        },
        {
          question: '如何处理字符串数字？',
          answer: '用int()转换'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '统计专家！你现在可以做需要判断的题目了！',
      concept: '需要if判断的OJ题目。',
      syntax: '判断题：\n1. 读取输入\n2. 判断条件\n3. 输出结果',
      example: {
        title: '判断成绩',
        code: '# 题目：判断是否及格\n# 输入：成绩（0-100）\n# 输出：及格/不及格\n\nscore = int(input())\nif score >= 60:\n    print("及格")\nelse:\n    print("不及格")',
        output: '根据输入输出',
        explanation: '根据输入的成绩判断是否及格。'
      },
      practice: [
        {
          question: '判断题需要用到什么语句？',
          answer: 'if-else语句'
        },
        {
          question: '分数判断用>=还是>?',
          answer: '>=60表示及格'
        }
      ]
    }
  }
]

// 习题数据
export const exercises = [
  // 🟢 基础题
  {
    id: 'ex-1',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '概念',
    question: 'OJ的全称是什么？',
    options: [
      'A. Online Judge',
      'B. Only Judge',
      'C. Open Judge',
      'D. Output Judge'
    ],
    answer: 0, // A
    explanation: 'OJ = Online Judge，线上测评系统的意思。',
    hint: 'OJ是英文缩写'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '流程',
    question: 'OJ解题的第一步是什么？',
    options: [
      'A. 编写代码',
      'B. 提交代码',
      'C. 读题',
      'D. 测试'
    ],
    answer: 2, // C
    explanation: 'OJ解题的第一步是读题，要看清输入输出和样例。',
    hint: '先看清题目要求'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '类型',
    question: 'AC表示什么？',
    options: [
      'A. Answer Correct',
      'B. Accepted',
      'C. All Correct',
      'D. After Code'
    ],
    answer: 1, // B
    explanation: 'AC = Accepted，表示答案正确，通过了测试。',
    hint: '通过测试'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '编程',
    question: '编写程序：输入两个整数，输出它们的和。以下代码正确的是？',
    options: [
      'print(input() + input())',
      'print(int(input()) + int(input()))',
      'a = int(input())\nb = int(input())\nprint(a + b)',
      'print(input() + input())'
    ],
    answer: 2, // C
    explanation: '需要先把input()转换为int，然后求和。选项C正确。',
    hint: 'input()返回字符串'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '判断',
    question: '题目：判断一个数是正数还是负数（0输出zero）。输入3，输出什么？',
    options: [
      'A. positive',
      'B. negative',
      'C. zero',
      'D. 程序报错'
    ],
    answer: 0, // A
    explanation: '3 > 0，条件成立，输出positive。',
    hint: '3 > 0'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '算法',
    question: '计算1+2+3+...+10的和，用哪种方法最快？',
    options: [
      'A. 一个个加',
      'B. for循环',
      'C. 等差数列求和公式',
      'D. while循环'
    ],
    answer: 2, // C
    explanation: '等差数列求和公式：sum = n*(n+1)/2 = 10*11/2 = 55，最快！\n\n数学知识：1+2+3+...+n = n(n+1)/2',
    hint: '公式法，时间复杂度O(1)'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L2-4',
  title: 'Online Judge 入门',
  subtitle: '学会 Online Judge 线上测评',
  difficulty: '进阶',
  estimatedTime: '30-40分钟',
  learningGoals: [
    '认识 OJ 线上测评系统',
    '掌握 OJ 解题流程',
    '能够完成简单的 OJ 题目',
    '了解 OJ 评分机制'
  ],
  prerequisites: [
    '掌握 print() 命令',
    '掌握 input() 命令',
    '了解 if-else 语句',
    '了解 for 循环'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['online', 'judge', 'submit', 'input'],
  medium: ['output', 'accept', 'wrong', 'error'],
  hard: ['algorithm', 'testcase', 'score', 'complex']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'print("Hello World")',
    'a = input()\nprint(a)',
    'print(int(input()) * 2)',
    'x = int(input())\nprint(x)'
  ],
  medium: [
    'a = int(input())\nb = int(input())\nprint(a + b)',
    'x = int(input())\nif x % 2 == 0:\n    print("even")',
    'n1 = int(input())\nn2 = int(input())\nprint(n1 * n2)',
    'a = int(input())\nif a >= 60:\n    print("及格")\nelse:\n    print("不及格")'
  ],
  hard: [
    'n = int(input())\nprint(n * (n + 1) // 2)',
    'a = int(input())\nb = int(input())\nif a > b:\n    print(a)\nelse:\n    print(b)',
    'for i in range(int(input())):\n    print(i)',
    'for i in range(1, int(input())+1):\n    if i % 2 == 0:\n        print(i)'
  ]
}

// 导出所有数据
export const L2_4_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L2_4_data