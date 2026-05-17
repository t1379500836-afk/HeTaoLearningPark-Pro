/**
 * PY1 课程 L3-2: for-if 嵌套
 *
 * 核心知识点:
 * 1. for-if 嵌套语法
 * 2. for-if 执行过程
 * 3. for-if 应用场景
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'fly',
    pronunciation: '[flaɪ]',
    partOfSpeech: 'v.',
    meaning: '飞；飞行',
    level: 'easy',
    example: 'The bird can fly.',
    exampleTranslation: '鸟会飞。',
    source: 'ocr'
  },
  {
    word: 'blue',
    pronunciation: '[bluː]',
    partOfSpeech: 'adj.',
    meaning: '蓝色的',
    level: 'easy',
    example: 'The sky is blue.',
    exampleTranslation: '天空是蓝色的。',
    source: 'ocr'
  },
  {
    word: 'red',
    pronunciation: '[red]',
    partOfSpeech: 'adj.',
    meaning: '红色的',
    level: 'easy',
    example: 'The apple is red.',
    exampleTranslation: '苹果是红色的。',
    source: 'ocr'
  },
  {
    word: 'left',
    pronunciation: '[left]',
    partOfSpeech: 'n.',
    meaning: '左边；左转弯',
    level: 'easy',
    example: 'Turn left at the corner.',
    exampleTranslation: '在拐角处向左转。',
    source: 'ocr'
  },
  {
    word: 'right',
    pronunciation: '[raɪt]',
    partOfSpeech: 'n.',
    meaning: '右边',
    level: 'easy',
    example: 'Turn right at the corner.',
    exampleTranslation: '在拐角处向右转。',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'color',
    pronunciation: '[ˈkʌlə]',
    partOfSpeech: 'n.',
    meaning: '颜色',
    level: 'easy',
    example: 'What color is it?',
    exampleTranslation: '它是什么颜色？',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: 'for-if 代码格式',
    emoji: '🔢',
    gradeLevel: '3-4',
    summary: '在 for 循环里嵌套 if 判断',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象一个场景：老师让同学们排队，每个人都要检查是否戴了帽子。这里"让每个人排队"就是一个循环，"检查帽子"就是一个判断。',
      concept: 'for-if 嵌套是在循环里加入条件判断，每次循环都会检查条件，根据结果决定是否执行。',
      syntax: `for i in range(次数):
    if 条件:
        下级代码`,
      example: {
        title: '检查颜色',
        code: `for i in range(3):
    color = input()
    if color == '蓝色':
        print('2')`,
        output: '（假设输入：蓝 红 蓝）\n2\n2',
        explanation: '循环3次，每次获取颜色，如果等于"蓝色"就打印2。输入蓝、红、蓝，所以第1次和第3次打印2。'
      },
      practice: [
        {
          question: 'for-if 嵌套中，if 判断在什么里面进行？',
          answer: '每次循环中'
        },
        {
          question: 'for i in range(3) 里嵌套 if，每次循环都会判断吗？',
          answer: '是的'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'for 循环控制循环次数，if 在每次循环时进行条件判断。如果条件成立就执行下级代码，不成立就跳过。',
      concept: 'for 控制循环次数，if 判断条件，条件成立时执行 if 的下级代码。',
      syntax: `for i in range(3):        # 循环3次
    if 条件:             # 每次都判断
        执行代码          # 条件成立时执行`,
      example: {
        title: '逐个检查',
        code: `# 检查输入是否为 'w'
for i in range(4):
    a = input()
    if a == 'w':
        print('1')`,
        output: '（输入：w z w python）\n1\n1',
        explanation: '循环4次，每次输入一个值，如果是"w"就打印1。输入 w、z、w、python，所以打印两个1。'
      },
      practice: [
        {
          question: 'for i in range(4) 嵌套 if，会判断几次？',
          answer: '4次'
        },
        {
          question: '每次循环的 if 判断结果一定相同吗？',
          answer: '不一定，取决于输入'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'for-if 嵌套可以让程序根据每次循环的不同情况做出不同反应，实现更复杂的功能。',
      concept: '理解 for-if 的执行顺序：先执行 for 的初始化，再进入循环，每次循环先执行 if 判断，再决定是否执行。',
      syntax: `for i in range(n):
    # 1. 进入循环
    # 2. if 判断
    # 3. 条件成立执行 if 内代码
    # 4. 循环结束，回到步骤1`,
      example: {
        title: '完整执行流程',
        code: `# 统计输入中'z'的个数
count = 0
for i in range(3):
    a = input()
    if a == 'z':
        count = count + 1
print(count)`,
        output: '（输入：z w z）\n2',
        explanation: '循环3次，每次输入。如果是"z"，count 加1。最终 count=2。'
      },
      practice: [
        {
          question: 'for-if 嵌套中，if 的缩进应该是什么？',
          answer: '比 for 多一次缩进'
        },
        {
          question: 'for-if 可以实现什么功能？',
          answer: '在循环中根据条件进行不同处理'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: 'for-if 执行过程',
    emoji: '⚙️',
    gradeLevel: '3-4',
    summary: '每次循环都进行条件判断',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'for-if 就像一个自动检票机，for 是让人们排好队，if 是检查每张票是否有效。每次经过检票口，都要检查一次。',
      concept: 'for 控制循环次数，if 在每次循环中进行判断，根据条件决定是否执行。',
      syntax: `for → 循环
if → 判断
循环内每次都判断`,
      example: {
        title: '检票过程',
        code: `for i in range(3):
    ticket = input()
    if ticket == '有效':
        print('通过')`,
        output: '',
        explanation: '循环3次，每次获取票的状态，如果"有效"就打印"通过"。'
      },
      practice: [
        {
          question: 'for 循环内嵌套 if，每次循环会执行几次 if 判断？',
          answer: '1次'
        },
        {
          question: 'if 的条件成立时会发生什么？',
          answer: '执行 if 的下级代码'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '在 for 循环中，每次循环都会把能量板颜色存入变量 color，然后 if 判断 color 是否等于特定值。',
      concept: '每次循环都会获取新的数据，if 根据新数据做出判断。',
      syntax: `for i in range(3):
    color = input()  # 每次获取新颜色
    if color == '蓝色':
        print('2')`,
      example: {
        title: '处理颜色',
        code: `# 如果颜色是蓝色打印2，红色打印4
for i in range(3):
    color = input()
    if color == '蓝色':
        print('2')
    if color == '红色':
        print('4')`,
        output: '（输入：蓝 红 蓝）\n2\n4\n2',
        explanation: '第1次 color="蓝"，打印2；第2次 color="红"，打印4；第3次 color="蓝"，打印2。'
      },
      practice: [
        {
          question: '如果输入都是"红"，会打印几次4？',
          answer: '3次'
        },
        {
          question: '两个 if 的关系是什么？',
          answer: '各自独立判断'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '理解 for-if 的执行顺序：进入循环 → 获取数据 → if 判断 → 执行或不执行 → 下一轮循环。',
      concept: 'for-if 是顺序执行的，每次循环完整执行完 if 再进入下一次。',
      syntax: `第1次循环：获取数据1 → if判断 → 执行或不执行
第2次循环：获取数据2 → if判断 → 执行或不执行
第3次循环：获取数据3 → if判断 → 执行或不执行`,
      example: {
        title: '顺序执行',
        code: `# 输入 w z w z，统计打印1的次数
for i in range(4):
    a = input()
    if a == 'w':
        print('1')`,
        output: '（输入：w z w z）\n1\n1',
        explanation: '第1次 a="w" → 打印1；第2次 a="z" → 不打印；第3次 a="w" → 打印1；第4次 a="z" → 不打印。'
      },
      practice: [
        {
          question: '如果输入都是"w"，4次循环会打印几个1？',
          answer: '4个'
        },
        {
          question: 'for-if 的执行顺序是什么？',
          answer: '先循环，再判断，然后进入下一轮'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: 'for-if 应用场景',
    emoji: '📋',
    gradeLevel: '3-4',
    summary: '处理多次输入，每次数不同判断',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '比如给班级同学按性别分类，需要输入每个同学的性别，根据性别打印不同的数字。for 循环处理多次输入，if 判断性别。',
      concept: '当需要处理多组数据，每组数据需要根据条件做不同处理时，使用 for-if 嵌套。',
      syntax: `for i in range(n):
    data = input()
    if data == '男':
        print('1')
    if data == '女':
        print('2')`,
      example: {
        title: '性别分类',
        code: `# 输入3个同学的性别，打印对应数字
for i in range(3):
    gender = input()
    if gender == '男':
        print('1')
    if gender == '女':
        print('2')`,
        output: '（输入：男 女 男）\n1\n2\n1',
        explanation: '第1次"男"打印1，第2次"女"打印2，第3次"男"打印1。'
      },
      practice: [
        {
          question: 'for-if 适合什么场景？',
          answer: '多次输入，每次需要不同处理'
        },
        {
          question: '给30个同学分类需要循环几次？',
          answer: '30次'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'for-if 可以解决"筛选"问题：从一堆数据中找出符合条件的数据并处理。',
      concept: 'for 遍历所有数据，if 判断是否符合条件，符合则处理。',
      syntax: `结果 = []
for 数据 in 列表:
    if 条件:
        处理数据`,
      example: {
        title: '筛选数据',
        code: `# 找出所有偶数
for i in range(5):
    n = int(input())
    if n % 2 == 0:
        print(n)`,
        output: '（输入：1 4 3 6 5）\n4\n6',
        explanation: '输入5个数字，逐个判断如果是偶数（n%2==0）就打印。4和6是偶数，所以打印它们。'
      },
      practice: [
        {
          question: '如何找出所有大于10的数？',
          answer: 'if n > 10: print(n)'
        },
        {
          question: 'for-if 筛选数据的流程是什么？',
          answer: '遍历→判断→处理'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '在物理中，光的反射角度和入射角度关于法线对称。通过旋转平面可以改变反射角度。',
      concept: '理解光的反射原理：入射角等于反射角，旋转反射面会改变反射光的方向。',
      syntax: `入射角 = 反射角
旋转反射面 → 改变反射方向`,
      example: {
        title: '光反射',
        code: `# 光的反射
入射光角度 = 30度
反射光角度 = 30度（关于法线对称）
# 旋转反射面10度
新的入射角 = 40度
新的反射角 = 40度`,
        output: '',
        explanation: '反射定律：入射角等于反射角。如果旋转反射面，就相当于改变了入射角和反射角。'
      },
      practice: [
        {
          question: '光的反射定律是什么？',
          answer: '入射角等于反射角'
        },
        {
          question: '旋转反射面会怎样？',
          answer: '改变反射光的方向'
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
    mathConcept: '循环嵌套',
    question: `运行以下代码，input() 依次输入：hetao, python, python, code。最终输出区会打印几个 1？\n\n\`\`\`python\nfor i in range(4):\n    a = input()\n    if a == 'python':\n        print('1')\n\`\`\``,
    options: [
      '1个',
      '2个',
      '3个',
      '4个'
    ],
    answer: 1,
    explanation: '输入 hetao 时不打印，输入 python 时打印1，输入 python 时打印1，输入 code 时不打印。所以打印2个1。',
    hint: '只有等于"python"才打印'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '格式判断',
    question: '在 for 循环中嵌套使用 if 语句，下列哪个代码格式是正确的？',
    options: [
      'for i in range(3): if a == 5: print(5)',
      'for i in range(3): if a == 5\n        print(5)',
      'for i in range(3):\n    if a == 5:\n        print(5)',
      'for i in range(3)\n    if a == 5:\n        print(5)'
    ],
    answer: 2,
    explanation: 'for 循环需要冒号，if 也需要冒号，if 的下级代码需要缩进。选项 C 格式正确。',
    hint: '注意冒号和缩进'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '条件分析',
    question: `执行下方代码，输入 z w z，输出区打印的值是？\n\n\`\`\`python\nfor i in range(3):\n    a = input()\n    if a == 'w':\n        print('1')\n    if a == 'z':\n        print('2')\n\`\`\``,
    options: [
      '1 1 1',
      '2 1 2',
      '1 2 1',
      '2 1 2'
    ],
    answer: 1,
    explanation: '第1次 a="z" → 打印2；第2次 a="w" → 打印1；第3次 a="z" → 打印2。输出 2 1 2。',
    hint: 'w打印1，z打印2'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '缩进理解',
    question: `以下代码的输出是什么？\n\n\`\`\`python\nfor i in range(3):\n    a = input()\n    if a == 'a':\n        print('1')\n\`\`\``,
    options: [
      '输入3个a才打印',
      '每次输入a都打印1',
      '打印3次1',
      '什么都不打印'
    ],
    answer: 1,
    explanation: '每次循环都会获取输入并判断，如果是"a"就打印1。不是3个a才打印，也不是打印3次1。',
    hint: '每次循环独立判断'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合应用',
    question: `输入 w w w，以下代码的输出是什么？\n\n\`\`\`python\ncount = 0\nfor i in range(3):\n    a = input()\n    if a == 'w':\n        count = count + 1\nprint(count)\n\`\`\``,
    options: [
      '0',
      '1',
      '2',
      '3'
    ],
    answer: 3,
    explanation: 'count 初始化为0，每次输入"w"时 count 加1。3次输入都是"w"，所以 count=3。',
    hint: '每次w都让count加1'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '流程分析',
    question: `执行以下代码，第三次循环时 a 的值和输出是？\n\n\`\`\`python\nfor i in range(3):\n    a = input()\n    if a == 'z':\n        print('2')\n    else:\n        print('1')\n\`\`\``,
    options: [
      'z → 打印2',
      'z → 打印1',
      'w → 打印2',
      'w → 打印1'
    ],
    answer: 0,
    explanation: '第3次循环时 a 的值取决于第3次输入。if a == "z" 成立则打印2，else 打印1。',
    hint: '根据输入决定输出'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L3-2',
  title: 'for-if嵌套',
  subtitle: '循环里加入条件判断',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解 for-if 嵌套的语法格式',
    '掌握 for-if 的执行过程',
    '能用 for-if 处理多次输入',
    '能解决筛选问题'
  ],
  prerequisites: [
    '理解 for 循环',
    '理解 if 语句',
    '知道什么是缩进'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['fly', 'blue', 'red', 'left', 'right'],
  medium: ['color', 'check', 'equal', 'condition'],
  hard: ['nested', 'iterate', 'filter', 'process']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'for i in range(3):\n    a = input()',
    "if a == 'blue':\n    print('2')",
    'for i in range(3):\n    if a == "red":\n        print("4")',
    'for i in range(4):\n    a = input()\n    if a == "w":\n        print("1")'
  ],
  medium: [
    'for i in range(3):\n    color = input()\n    if color == "blue":\n        print("2")\n    if color == "red":\n        print("4")',
    'for i in range(4):\n    a = input()\n    if a == "w":\n        print("1")\n    if a == "z":\n        print("2")',
    'for i in range(3):\n    n = int(input())\n    if n > 10:\n        print("big")',
    'count = 0\nfor i in range(5):\n    a = input()\n    if a == "w":\n        count = count + 1'
  ],
  hard: [
    'count = 0\nfor i in range(3):\n    a = input()\n    if a == "z":\n        count = count + 1\nprint(count)',
    'for i in range(4):\n    n = int(input())\n    if n % 2 == 0:\n        print("even")\n    else:\n        print("odd")',
    'for i in range(5):\n    score = int(input())\n    if score >= 90:\n        print("A")\n    elif score >= 80:\n        print("B")\n    else:\n        print("C")',
    'total = 0\nfor i in range(4):\n    n = int(input())\n    if n > 0:\n        total = total + n\nprint(total)'
  ]
}

// 导出所有数据
export const L3_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L3_2_data