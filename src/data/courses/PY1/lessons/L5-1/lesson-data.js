/**
 * PY1 课程 L5-1: 循环变量
 *
 * 核心知识点:
 * 1. 循环变量 - for i in range() 中的 i
 * 2. 循环变量应用 - 输出有规律的数字
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'next',
    pronunciation: '[nekst]',
    partOfSpeech: 'adj.',
    meaning: '下一个的；接下来的',
    level: 'easy',
    example: 'The next number is 5.',
    exampleTranslation: '下一个数字是5。',
    source: 'ocr'
  },
  {
    word: 'down',
    pronunciation: '[daʊn]',
    partOfSpeech: 'adv.',
    meaning: '向下；朝下',
    level: 'easy',
    example: 'Sit down please.',
    exampleTranslation: '请坐下。',
    source: 'ocr'
  },
  {
    word: 'time',
    pronunciation: '[taɪm]',
    partOfSpeech: 'n.',
    meaning: '时间；时刻',
    level: 'easy',
    example: 'What time is it?',
    exampleTranslation: '现在几点了？',
    source: 'ocr'
  },
  {
    word: 'sleep',
    pronunciation: '[sliːp]',
    partOfSpeech: 'v.',
    meaning: '睡觉',
    level: 'medium',
    example: 'I need to sleep now.',
    exampleTranslation: '我现在需要睡觉。',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'range',
    pronunciation: '[reɪndʒ]',
    partOfSpeech: 'n.',
    meaning: '范围；区间',
    level: 'medium',
    example: 'Numbers from 0 to 9.',
    exampleTranslation: '0到9的数字范围。',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '认识循环变量',
    emoji: '🔄',
    gradeLevel: '3-4',
    summary: '理解 for i in range() 中 i 的作用',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '循环变量就像一个计数器，在循环中记录当前是第几次。for i in range(4) 表示让 i 从 0 开始数，数 4 次。',
      concept: 'for i in range(n) 中，i 是循环变量，它的值从 0 开始，每次加 1，直到 n-1。',
      syntax: `for i in range(4):
    print(i)  # 输出 0 1 2 3`,
      example: {
        title: '数数游戏',
        code: `for i in range(4):
    print(i)`,
        output: '0\n1\n2\n3',
        explanation: 'range(4) 让循环执行 4 次，i 的值从 0 变到 3。每次循环打印 i 的值。'
      },
      practice: [
        {
          question: 'for i in range(3) 中，i 的值变化是？',
          answer: '0 → 1 → 2'
        },
        {
          question: 'range(5) 让循环执行几次？',
          answer: '5次'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '循环变量可以取不同的名字，不一定要用 i。可以根据意思取有意义的名字。',
      concept: '循环变量的名字可以改变，但使用时要前后一致。常见的有 i、n、count 等。',
      syntax: `# 循环变量名称可以更改
for n in range(5):
    print(n)

for count in range(3):
    print(count)`,
      example: {
        title: '不同的循环变量名',
        code: `for n in range(5):
    print('第', n, '次')`,
        output: '第 0 次\n第 1 次\n第 2 次\n第 3 次\n第 4 次',
        explanation: '循环变量 n 从 0 到 4，每次打印当前是第几次。'
      },
      practice: [
        {
          question: '循环变量可以取哪些名字？',
          answer: '任意名字，如 i、n、count、x 等'
        },
        {
          question: 'for x in range(4) 循环多少次？',
          answer: '4次'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '循环变量的值会随着循环变化，理解它的变化规律是解决问题的关键。',
      concept: '循环变量在每次循环开始时自动增加 1，从 0 开始到 n-1 结束。',
      syntax: `循环次数和循环变量的值：
第1次循环：i = 0
第2次循环：i = 1
第3次循环：i = 2
...
第n次循环：i = n-1`,
      example: {
        title: '理解循环变量变化',
        code: `for i in range(5):
    print('第', i+1, '次循环，i=', i)`,
        output: '第 1 次循环，i= 0\n第 2 次循环，i= 1\n第 3 次循环，i= 2\n第 4 次循环，i= 3\n第 5 次循环，i= 4',
        explanation: 'i+1 可以得到"第几次"，i 本身从 0 开始。'
      },
      practice: [
        {
          question: 'for i in range(6) 结束后，i 的值是多少？',
          answer: '5'
        },
        {
          question: '如何让循环变量从 1 开始？',
          answer: 'i+1 或者用其他方式'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '循环变量应用 - 连续增加',
    emoji: '📈',
    gradeLevel: '3-4',
    summary: '用循环变量输出连续变化的数字',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '循环变量配合运算，可以输出有规律的数字。比如 i+3，就是从 3 开始的连续数字。',
      concept: '在循环中，使用 i+数字，可以输出连续增加的数字序列。',
      syntax: `for i in range(5):
    print(i + 3)  # 输出 3 4 5 6 7`,
      example: {
        title: '连续增加的数字',
        code: `for i in range(5):
    print(i + 3)`,
        output: '3\n4\n5\n6\n7',
        explanation: 'i 的值是 0、1、2、3、4，i+3 就是 3、4、5、6、7。'
      },
      practice: [
        {
          question: 'for i in range(4): print(i+5) 输出什么？',
          answer: '5 6 7 8'
        },
        {
          question: '如何输出 1 到 5？',
          answer: 'for i in range(5): print(i+1)'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '循环变量可以参与各种运算，不只是加法，减法、乘法都可以。',
      concept: 'i*2 可以得到 2 倍的序列，i*3 可以得到 3 倍的序列。',
      syntax: `for i in range(5):
    print(i * 2)  # 输出 0 2 4 6 8`,
      example: {
        title: '倍数关系',
        code: `for i in range(5):
    print(i * 2)`,
        output: '0\n2\n4\n6\n8',
        explanation: 'i 的值是 0、1、2、3、4，乘以 2 后变成 0、2、4、6、8。'
      },
      practice: [
        {
          question: 'for i in range(4): print(i*3) 输出什么？',
          answer: '0 3 6 9'
        },
        {
          question: '如何输出 2、4、6、8？',
          answer: 'for i in range(4): print((i+1)*2)'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '灵活运用循环变量，可以解决各种数字规律问题。',
      concept: '根据题目要求，构造适当的表达式来生成需要的数字序列。',
      syntax: `# 输出 5、10、15、20
for i in range(4):
    print((i+1) * 5)`,
      example: {
        title: '找规律输出',
        code: `# 输出前5个偶数：2、4、6、8、10
for i in range(5):
    print((i + 1) * 2)`,
        output: '2\n4\n6\n8\n10',
        explanation: '第 n 个偶数 = n * 2，所以用 (i+1)*2 来计算。'
      },
      practice: [
        {
          question: '如何输出前 5 个奇数（1、3、5、7、9）？',
          answer: 'for i in range(5): print(i*2+1)'
        },
        {
          question: '如何输出 5、10、15、20、25？',
          answer: 'for i in range(5): print((i+1)*5)'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '循环变量应用 - 连续减少',
    emoji: '📉',
    gradeLevel: '3-4',
    summary: '用循环变量输出递减的数字',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '用"结束数字 - i"可以得到递减的序列。比如 5-i，就是 5、4、3、2、1。',
      concept: '用总数减去循环变量，可以得到递减的数字序列。',
      syntax: `for i in range(5):
    print(5 - i)  # 输出 5 4 3 2 1`,
      example: {
        title: '倒数倒数',
        code: `for i in range(5):
    print(5 - i)`,
        output: '5\n4\n3\n2\n1',
        explanation: 'i=0 时 5-0=5，i=1 时 5-1=4...这样就倒着数下来了。'
      },
      practice: [
        {
          question: 'for i in range(5): print(7-i) 输出什么？',
          answer: '7 6 5 4 3'
        },
        {
          question: '如何输出 10、9、8、7、6、5？',
          answer: 'for i in range(6): print(10-i)'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '连续减少的规律在很多场景都有用，比如倒计时、排队报数等。',
      concept: '利用"起始值 - i"的规律，可以实现各种倒序输出。',
      syntax: `# 倒计时：10 9 8 ... 1
for i in range(10):
    print(10 - i)`,
      example: {
        title: '倒计时',
        code: `# 倒计时从5开始
for i in range(5):
    print(5 - i)
print('发射！')`,
        output: '5\n4\n3\n2\n1\n发射！',
        explanation: '先倒数，循环结束后打印"发射！"表示倒计时结束。'
      },
      practice: [
        {
          question: '如何实现 10 秒倒计时？',
          answer: 'for i in range(10): print(10-i)'
        },
        {
          question: '倒数最后会数到哪个数？',
          answer: '1（不是0）'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '结合增减规律，可以解决更复杂的数字序列问题。',
      concept: '理解循环变量的变化规律，灵活构造表达式解决实际问题。',
      syntax: `# 变化规律总结：
连续增加：i + start
连续减少：end - i
倍数关系：i * n`,
      example: {
        title: '综合应用',
        code: `# 打印 7-i 的值，观察规律
for i in range(7):
    print(7 - i)`,
        output: '7\n6\n5\n4\n3\n2\n1',
        explanation: '7-i 当 i 从 0 到 6 时，结果从 7 降到 1。'
      },
      practice: [
        {
          question: 'for i in range(6): print(8-i) 输出什么？',
          answer: '8 7 6 5 4 3'
        },
        {
          question: '如何输出 1、2、3、4、5 然后输出 5、4、3、2、1？',
          answer: '用两次循环，第一次 print(i+1)，第二次 print(5-i)'
        }
      ]
    }
  }
]

// 习题数据
export const exercises = [
  // 🟢 基础题（1-2年级）
  {
    id: 'ex-1',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '循环变量理解',
    question: 'for i in range(4) 中，循环变量 i 的值变化是？',
    options: [
      '1 → 2 → 3 → 4',
      '0 → 1 → 2 → 3',
      '0 → 1 → 2 → 3 → 4',
      '1 → 2 → 3'
    ],
    answer: 1,
    explanation: 'for i in range(n) 中，i 从 0 开始，到 n-1 结束。所以 range(4) 时 i 的值是 0、1、2、3。答案是 B。',
    hint: 'range(n) 从 0 开始到 n-1'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '输出规律',
    question: '以下代码的输出结果是？\n\n```python\nfor i in range(3):\n    print(i + 5)\n```',
    options: [
      '5 6 7',
      '5 6 7 8',
      '6 7 8',
      '0 1 2'
    ],
    answer: 0,
    explanation: 'i 的值是 0、1、2，i+5 就是 5、6、7。答案是 A。',
    hint: 'i+5 会让每个数都加5'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '递减规律',
    question: '以下代码的输出结果是？\n\n```python\nfor i in range(5):\n    print(8 - i)\n```',
    options: [
      '8 7 6 5 4',
      '8 7 6 5 4 3',
      '7 6 5 4 3',
      '8 7 6 5'
    ],
    answer: 0,
    explanation: 'i 从 0 到 4，8-i 就是 8、7、6、5、4。答案是 A。',
    hint: '8-0=8, 8-1=7, ...'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '倍数关系',
    question: 'for i in range(4): print((i+1)*3) 输出什么？',
    options: [
      '0 3 6 9',
      '3 6 9 12',
      '1 2 3 4',
      '3 6 9'
    ],
    answer: 1,
    explanation: 'i+1 是 1、2、3、4，乘以 3 就是 3、6、9、12。答案是 B。',
    hint: '(i+1)*3 相当于 1*3, 2*3, 3*3, 4*3'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合应用',
    question: '以下代码的输出结果是？\n\n```python\nfor i in range(6):\n    print(i * 2 + 1)\n```',
    options: [
      '1 3 5 7 9',
      '1 3 5 7 9 11',
      '2 4 6 8 10',
      '0 2 4 6 8 10'
    ],
    answer: 1,
    explanation: 'i 从 0 到 5，i*2+1 就是 1、3、5、7、9、11。答案是 B。',
    hint: '0*2+1=1, 1*2+1=3, ...'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '规律应用',
    question: '想要输出 10、20、30、40，下划线处应该填什么？\n\n```python\nfor i in range(4):\n    print(___)\n```',
    options: [
      'i + 10',
      '(i + 1) * 10',
      'i * 10',
      '(i + 10)'
    ],
    answer: 1,
    explanation: '要输出 10、20、30、40，需要 (i+1)*10：当 i=0 时输出 10，i=1 时输出 20，以此类推。答案是 B。',
    hint: '第几个数就乘以几'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L5-1',
  title: '循环变量',
  subtitle: '认识 for 循环中的计数器',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解循环变量的概念',
    '掌握 for i in range() 的用法',
    '能用循环变量输出有规律的数字',
    '能解决简单的数字序列问题'
  ],
  prerequisites: [
    '理解 for 循环的基本语法',
    '知道什么是变量'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['next', 'down', 'time', 'sleep'],
  medium: ['range', 'loop', 'variable', 'count'],
  hard: ['iterate', 'sequence', 'increment', 'index']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'for i in range(3):',
    'for i in range(5):\n    print(i)',
    'for n in range(4):\n    print(n + 1)',
    'print(i + 3)'
  ],
  medium: [
    'for i in range(5):\n    print(10 - i)',
    'for n in range(4):\n    print((n+1) * 2)',
    'for i in range(3):\n    print(i * 5)',
    'for x in range(6):\n    print(x + 5)'
  ],
  hard: [
    'for i in range(5):\n    print((i+1) * 5)',
    'for i in range(8):\n    print(8 - i)',
    'for i in range(7):\n    print(i * 3 + 2)',
    'for n in range(4):\n    print((n+1) * (n+1))'
  ]
}

// 导出所有数据
export const L5_1_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L5_1_data