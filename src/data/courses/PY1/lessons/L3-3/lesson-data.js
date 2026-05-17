/**
 * PY1 课程 L3-3: 变量修改与计数
 *
 * 核心知识点:
 * 1. 变量修改 - 在循环中修改变量
 * 2. 变量计数 - 用变量进行统计
 * 3. 数字运算与字符串拼接
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'moon',
    pronunciation: '[muːn]',
    partOfSpeech: 'n.',
    meaning: '月亮；月球',
    level: 'easy',
    example: 'The moon is bright tonight.',
    exampleTranslation: '今晚的月亮很亮。',
    source: 'ocr'
  },
  {
    word: 'cat',
    pronunciation: '[kæt]',
    partOfSpeech: 'n.',
    meaning: '猫',
    level: 'easy',
    example: 'The cat is sleeping.',
    exampleTranslation: '猫在睡觉。',
    source: 'ocr'
  },
  {
    word: 'dog',
    pronunciation: '[dɒɡ]',
    partOfSpeech: 'n.',
    meaning: '狗',
    level: 'easy',
    example: 'The dog is running.',
    exampleTranslation: '狗在跑。',
    source: 'ocr'
  },
  {
    word: 'snake',
    pronunciation: '[sneɪk]',
    partOfSpeech: 'n.',
    meaning: '蛇',
    level: 'medium',
    example: 'The snake is crawling.',
    exampleTranslation: '蛇在爬行。',
    source: 'ocr'
  },
  {
    word: 'sun',
    pronunciation: '[sʌn]',
    partOfSpeech: 'n.',
    meaning: '太阳',
    level: 'easy',
    example: 'The sun is shining.',
    exampleTranslation: '阳光照耀。',
    source: 'ocr'
  },
  {
    word: 'total',
    pronunciation: '[ˈtəʊtəl]',
    partOfSpeech: 'n.',
    meaning: '总计；总数',
    level: 'medium',
    example: 'What is the total?',
    exampleTranslation: '总数是多少？',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'count',
    pronunciation: '[kaʊnt]',
    partOfSpeech: 'v.',
    meaning: '计数；计算',
    level: 'medium',
    example: 'Count from one to ten.',
    exampleTranslation: '从一数到十。',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '变量修改',
    emoji: '✏️',
    gradeLevel: '3-4',
    summary: '变量的值可以被重新修改',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '变量就像一个盒子，里面可以放东西。如果你想换成别的东西，只需要把新东西放进去就行了。',
      concept: '变量的值可以通过赋值语句进行修改，新的值会覆盖旧的值。',
      syntax: `n = 1      # n 是 1
n = 2      # n 变成 2
n = 'hi'   # n 变成字符串 'hi'`,
      example: {
        title: '变量赋值',
        code: `n = 1
print(n)
n = 2
print(n)
n = 'hi'
print(n)`,
        output: '1\n2\nhi',
        explanation: '变量可以多次赋值，每次赋值都会用新值覆盖旧值。n 先是 1，然后变成 2，最后变成 "hi"。'
      },
      practice: [
        {
          question: 'n = 5 然后 n = 10，n 的最终值是多少？',
          answer: '10'
        },
        {
          question: '变量可以修改几次？',
          answer: '无数次'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '在 for 循环中修改变量，可以让变量随着循环不断变化。',
      concept: 'n = n + 1 表示把 n 的值加 1，然后再赋值给 n。',
      syntax: `n = n + 1
# 相当于：
# 1. 读取 n 的值（假设是 1）
# 2. 计算 1 + 1 = 2
# 3. 把 2 赋值给 n`,
      example: {
        title: '循环中修改变量',
        code: `n = 1
for i in range(4):
    n = n + 1
print(n)`,
        output: '5',
        explanation: 'n 初始值 1。循环4次：第1次 n=1+1=2；第2次 n=2+1=3；第3次 n=3+1=4；第4次 n=4+1=5。最终 n=5。'
      },
      practice: [
        {
          question: 'n = 0，循环3次 n = n + 2，最终 n 是多少？',
          answer: '6'
        },
        {
          question: 'n = n + 1 的含义是什么？',
          answer: 'n 的值增加 1'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '区分数字运算和字符串拼接：n = n + 1 是数字加法，n = n + "1" 是字符串拼接。',
      concept: '根据变量的类型不同，+ 号的意义不同。数字是加法，字符串是拼接。',
      syntax: `# 数字运算
n = 5
n = n + 1  # n = 6

# 字符串拼接
n = '5'
n = n + '1'  # n = '51'`,
      example: {
        title: '区分运算类型',
        code: `# 数字运算
n = 1
n = n + 1
print(n)  # 输出 2

# 字符串拼接
s = '1'
s = s + '1'
print(s)  # 输出 11`,
        output: '2\n11',
        explanation: 'n = n + 1 是数字加法，1+1=2。s = s + "1" 是字符串拼接，"1"+"1"="11"。'
      },
      practice: [
        {
          question: "n = 'a'，n = n + 'b'，n 是多少？",
          answer: '"ab"'
        },
        {
          question: "n = 5，n = n + 3，n 是多少？",
          answer: '8'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '变量计数',
    emoji: '🔢',
    gradeLevel: '3-4',
    summary: '用变量统计数量',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '计数就像数东西，先找一个盒子（变量）来装数字，每遇到一个就往里面加一个。',
      concept: '变量计数需要三步：1. 设置初始值 2. 在循环中修改 3. 循环结束得到结果。',
      syntax: `count = 0        # 1. 设置初始值
for i in range(3):
    count = count + 1  # 2. 循环中修改
print(count)           # 3. 得到结果`,
      example: {
        title: '数一数',
        code: `count = 0
for i in range(4):
    count = count + 1
print(count)`,
        output: '4',
        explanation: 'count 初始值 0，循环4次每次加1：0→1→2→3→4，最终 count=4。'
      },
      practice: [
        {
          question: 'count = 0，循环5次 count = count + 1，最终 count 是多少？',
          answer: '5'
        },
        {
          question: '变量计数需要哪三步？',
          answer: '设置初始值、循环中修改、得到结果'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '可以数任意东西！比如数有多少个偶数，多少个正数，或者统计输入的"猫"出现了几次。',
      concept: '在 if 判断成立后进行计数，可以统计符合条件的数据个数。',
      syntax: `count = 0
for i in range(5):
    m = input()
    if m == '猫':
        count = count + 1`,
      example: {
        title: '数猫',
        code: `# 统计输入中出现几次"猫"
count = 0
for i in range(4):
    m = input()
    if m == '猫':
        count = count + 1
print(count)`,
        output: '（输入：狗 猫 猫 鸟）\n2',
        explanation: '输入"狗"、"猫"、"猫"、"鸟"。只有第2、3次是"猫"，count 加了2次，最终 count=2。'
      },
      practice: [
        {
          question: '统计"苹果"出现几次，count 应该在什么时候加1？',
          answer: '当输入等于"苹果"时'
        },
        {
          question: 'count = 0 和 count = 1 有什么区别？',
          answer: '初始值不同，最终结果会差1'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '变量计数可以用于各种统计：统计总分、统计个数、求平均值等。',
      concept: '变量不仅可以计数，还可以累加求和。',
      syntax: `total = 0
for i in range(3):
    n = int(input())
    total = total + n
print(total)`,
      example: {
        title: '求和',
        code: `# 计算3个数的和
total = 0
for i in range(3):
    n = int(input())
    total = total + n
print(total)`,
        output: '（输入：3 4 5）\n12',
        explanation: 'total 初始值0。输入3，total=0+3=3；输入4，total=3+4=7；输入5，total=7+5=12。'
      },
      practice: [
        {
          question: '如何计算10个数的总和？',
          answer: '循环10次，每次 total = total + n'
        },
        {
          question: 'total 和 count 有什么区别？',
          answer: 'total 累加数值，count 累加次数'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '综合应用',
    emoji: '🎯',
    gradeLevel: '3-4',
    summary: '结合循环和条件进行数据处理',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '综合使用 for 循环和 if 判断，可以解决很多实际问题。',
      concept: '循环处理多次输入，if 判断条件，变量存储结果。',
      syntax: `结果变量 = 0
for i in range(n):
    数据 = input()
    if 条件:
        结果变量 = 结果变量 + 1`,
      example: {
        title: '完整流程',
        code: `# 统计及格人数
count = 0
for i in range(5):
    score = int(input())
    if score >= 60:
        count = count + 1
print(count)`,
        output: '（输入：70 50 80 90 40）\n3',
        explanation: '输入5个成绩：70≥60 count=1，50<60 不计，80≥60 count=2，90≥60 count=3，40<60 不计。最终 count=3。'
      },
      practice: [
        {
          question: '如何统计不及格人数？',
          answer: 'if score < 60: count = count + 1'
        },
        {
          question: 'count 初始值一般设为什么？',
          answer: '0'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '字符串和数字的处理要注意区分类型。数字可以加减，字符串只能拼接。',
      concept: '用 int() 将字符串转数字后再进行数学运算。',
      syntax: `n = '123'    # 字符串
n = int(n)   # 转数字
n = n + 1    # 加1，变成124`,
      example: {
        title: '类型转换',
        code: `# 字符串转数字后计算
n = '5'
result = int(n) + 3
print(result)  # 8`,
        output: '8',
        explanation: '"5" 是字符串，直接 +3 会变成 "53"（拼接）。用 int("5") 转成数字 5 后，5+3=8。'
      },
      practice: [
        {
          question: "'3' + 4 应该怎么写才能得到7？",
          answer: 'int("3") + 4'
        },
        {
          question: '什么情况下需要类型转换？',
          answer: '字符串需要当数字用时'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '实际问题往往需要多种技能组合：循环输入、判断条件、修改变量、类型转换等。',
      concept: '综合应用多种技能解决复杂问题。',
      syntax: `count = 0
total = 0
for i in range(5):
    score = int(input())
    if score >= 60:
        count = count + 1
        total = total + score`,
      example: {
        title: '综合统计',
        code: `# 统计及格人数和总分
count = 0
total = 0
for i in range(5):
    score = int(input())
    if score >= 60:
        count = count + 1
        total = total + score
print(count)
print(total)`,
        output: '（输入：70 50 80 90 40）\n3\n240',
        explanation: '70、80、90 三个及格，count=3，total=70+80+90=240。'
      },
      practice: [
        {
          question: '如何同时统计及格人数和平均分？',
          answer: 'count 统计人数，total 累加总分，最后 total/count'
        },
        {
          question: '综合应用的步骤是什么？',
          answer: '循环输入→条件判断→修改变量→输出结果'
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
    mathConcept: '字符串拼接',
    question: `执行下方代码，程序会打印出什么？\n\n\`\`\`python\nn = 'home'\nn = n + 'work'\nprint(n)\n\`\`\``,
    options: [
      'home',
      'work',
      'homework',
      'home work'
    ],
    answer: 2,
    explanation: 'n = "home"，n = n + "work" 是字符串拼接，结果是 "homework"。',
    hint: '字符串用加号拼接'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '变量修改',
    question: `执行下方代码，程序会打印出什么？\n\n\`\`\`python\nn = 1\nfor i in range(3):\n    n = n + 1\nprint(n)\n\`\`\``,
    options: [
      '3',
      '4',
      '1',
      '程序报错'
    ],
    answer: 1,
    explanation: 'n 初始值 1，循环3次：1→2→3→4，最终 n=4。',
    hint: '每次循环 n 加 1'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '变量计数',
    question: `执行下方代码，程序会打印出什么？\n\n\`\`\`python\ncount = 0\nfor i in range(4):\n    count = count + 1\nprint(count)\n\`\`\``,
    options: [
      '3',
      '4',
      '5',
      '0'
    ],
    answer: 1,
    explanation: 'count 初始值 0，循环4次每次加1，最终 count=4。',
    hint: '循环4次就加4次'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '类型区分',
    question: `'3' + '5' 和 3 + 5 有什么区别？`,
    options: [
      "'3' + '5' = '35', 3 + 5 = 8",
      "'3' + '5' = 8, 3 + 5 = '35'",
      '两者相等',
      '两者都报错'
    ],
    answer: 0,
    explanation: `"'3' + '5' 是字符串拼接，结果是 '35'。3 + 5 是数字加法，结果是 8。`,
    hint: '加号对字符串是拼接，对数字是加法'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合运算',
    question: `执行以下代码，输入 1 2 3，输出是什么？\n\n\`\`\`python\ntotal = 0\nfor i in range(3):\n    n = int(input())\n    total = total + n\nprint(total)\n\`\`\``,
    options: [
      '1',
      '2',
      '3',
      '6'
    ],
    answer: 3,
    explanation: 'total 初始值0。输入1，total=1；输入2，total=3；输入3，total=6。最终输出6。',
    hint: '累加三个数'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '条件统计',
    question: `执行以下代码，输入 5 10 15 20 25，输出是什么？\n\n\`\`\`python\ncount = 0\nfor i in range(5):\n    n = int(input())\n    if n > 10:\n        count = count + 1\nprint(count)\n\`\`\``,
    options: [
      '1',
      '2',
      '3',
      '4'
    ],
    answer: 2,
    explanation: '输入5个数：5不>10不计，10不>10不计，15>10 count=1，20>10 count=2，25>10 count=3。最终 count=3。',
    hint: '数一数哪些大于10'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L3-3',
  title: '变量修改与计数',
  subtitle: '学会在循环中修改变量和统计',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解变量的可修改性',
    '掌握 n = n + 1 的含义',
    '能用变量进行计数和累加',
    '能结合循环和条件判断进行统计'
  ],
  prerequisites: [
    '理解 for 循环',
    '理解 if 语句',
    '知道什么是变量'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['moon', 'cat', 'dog', 'sun', 'run'],
  medium: ['total', 'count', 'number', 'value'],
  hard: ['increment', 'accumulate', 'statistics', 'variable']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'n = 1',
    'n = n + 1',
    'count = 0',
    'count = count + 1'
  ],
  medium: [
    'n = 1\nfor i in range(3):\n    n = n + 1',
    'count = 0\nfor i in range(5):\n    count = count + 1',
    's = "home"\ns = s + "work"',
    'n = int(input())\ntotal = total + n'
  ],
  hard: [
    'count = 0\nfor i in range(5):\n    n = int(input())\n    if n > 10:\n        count = count + 1',
    'total = 0\nfor i in range(4):\n    n = int(input())\n    total = total + n\nprint(total)',
    'n = 1\nfor i in range(3):\n    n = n + 2\nprint(n)',
    'count = 0\nfor i in range(3):\n    m = input()\n    if m == "cat":\n        count = count + 1'
  ]
}

// 导出所有数据
export const L3_3_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L3_3_data