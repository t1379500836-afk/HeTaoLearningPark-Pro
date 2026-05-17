/**
 * PY1 课程 L1-1: print()命令与变量
 *
 * 核心知识点:
 * 1. print() 命令 - 打印内容
 * 2. 变量 - 创建和使用
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'print',
    pronunciation: '[print]',
    partOfSpeech: 'v.',
    meaning: '打印；输出',
    level: 'easy',
    example: 'Press the print button to print the document.',
    exampleTranslation: '按下打印按钮来打印文件。',
    source: 'ocr'
  },
  {
    word: 'weight',
    pronunciation: '[weit]',
    partOfSpeech: 'n.',
    meaning: '重量；体重',
    level: 'medium',
    example: 'The weight of this box is 5 kilograms.',
    exampleTranslation: '这个盒子的重量是5公斤。',
    source: 'ocr'
  },
  {
    word: 'height',
    pronunciation: '[hait]',
    partOfSpeech: 'n.',
    meaning: '高度',
    level: 'medium',
    example: 'The height of this building is 100 meters.',
    exampleTranslation: '这栋楼的高度是100米。',
    source: 'ocr'
  },
  {
    word: 'right',
    pronunciation: '[rait]',
    partOfSpeech: 'n.',
    meaning: '右边；正确',
    level: 'easy',
    example: 'Turn right at the corner.',
    exampleTranslation: '在拐角处向右转。',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'variable',
    pronunciation: '[ˈveəriəbl]',
    partOfSpeech: 'n.',
    meaning: '变量',
    level: 'medium',
    example: 'A variable stores data that can change.',
    exampleTranslation: '变量存储可以改变的数据。',
    source: 'extended'
  },
  {
    word: 'output',
    pronunciation: '[ˈaʊtpʊt]',
    partOfSpeech: 'n.',
    meaning: '输出；输出结果',
    level: 'medium',
    example: 'The output shows the result of the program.',
    exampleTranslation: '输出显示程序的结果。',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '打印命令 - print()',
    emoji: '🖨️',
    gradeLevel: '1-2',
    summary: '把内容打印到输出区',

    // 🟢 基础版（1-2年级）
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

    // 🟡 进阶版（3-4年级）
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

    // 🔴 挑战版（5-6年级）
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
  },

  {
    id: 'kp-2',
    title: '神奇的变量盒子',
    emoji: '📦',
    gradeLevel: '1-2',
    summary: '存储数据，随时取用',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '变量就像一个盒子，你可以把东西放进去，需要的时候再拿出来用。每个盒子都有自己的名字。',
      concept: '变量就像一个存储数据的盒子，可以用变量名来访问里面的数据。',
      syntax: '变量名 = 数据',
      example: {
        title: '创建和使用变量',
        code: "fruit = 'apple'\nprint(fruit)",
        output: 'apple',
        explanation: 'fruit = "apple" 把字符串 "apple" 存储到变量 fruit 中。print(fruit) 会打印出 fruit 里的内容。'
      },
      practice: [
        {
          question: "n = 7, print(n) 会输出什么？",
          answer: '7'
        },
        {
          question: '变量名用什么符号赋值？',
          answer: '='
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '变量盒子可以存储各种类型的数据：数字、文字、还有算式计算的结果！',
      concept: '变量可以存储数字、字符串等多种数据类型，使用时不需要加引号。',
      syntax: '数字变量 = 数字\n字符串变量 = "文字"',
      example: {
        title: '存储数字并计算',
        code: 'number = 7\nprint(number * 5)',
        output: '35',
        explanation: 'number = 7 把数字 7 存入变量 number。print(number * 5) 会先取出 number 的值 7，乘以 5 得到 35，然后打印出来。'
      },
      practice: [
        {
          question: 'a = 3, b = 5, print(a + b) 会输出什么？',
          answer: '8'
        },
        {
          question: '打印变量时需要加引号吗？',
          answer: '不需要'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '变量可以重新赋值，而且可以用在其他地方。理解变量的本质很重要！',
      concept: '变量可以多次赋值，新的值会覆盖旧的值。变量就像一个盒子，里面的东西可以更换。',
      syntax: '变量 = 新值\n变量 = 变量 + 数字',
      example: {
        title: '变量赋值和更新',
        code: 'n = 12\nprint(n)\nn = 20\nprint(n)',
        output: '12\n20',
        explanation: '变量可以多次赋值。第一次 n = 12，print 输出 12；第二次 n = 20，原来的 12 被替换成 20，print 输出 20。'
      },
      practice: [
        {
          question: 'n = 5, n = 10, print(n) 会输出什么？',
          answer: '10'
        },
        {
          question: '变量存储的是什么？',
          answer: '数据的值'
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
    mathConcept: '文字对应',
    question: '下面哪段代码能打印出"乌拉乎"？',
    options: [
      "print(乌拉乎)",
      "print 乌拉乎",
      "print('乌拉乎')",
      "print '乌拉乎'"
    ],
    answer: 2,
    explanation: 'print() 命令打印文字时，文字两侧要加上单引号。所以 C 选项 print("乌拉乎") 是正确的。',
    hint: '文字两边要加什么符号？'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '变量取值',
    question: '这段代码的打印结果是？\n\n```python\nn = 12\nprint(n)\n```',
    options: [
      'n',
      '12',
      "'12'",
      'n=12'
    ],
    answer: 1,
    explanation: 'n = 12 表示将数字 12 存入变量 n 中，print(n) 打印出变量 n 的值，为 12。注意打印变量时不需要加引号。',
    hint: 'print(变量名) 会打印变量的值'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '数学运算',
    question: '下面哪段代码能打印出 30 ？',
    options: [
      'print(5 + 10)',
      'print(n + 20)',
      'print(5 + 5 * 5)',
      'print(3 * 4)'
    ],
    answer: 2,
    explanation: 'A 选项打印 13；B 选项打印 n+20（变量未定义）；C 选项 5 + 5*5 = 5 + 25 = 30，正确；D 选项打印 12。',
    hint: '先算乘除，后算加减'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '运算顺序',
    question: 'print(2 + 3 * 4) 会输出什么？',
    options: [
      '20',
      '24',
      '14',
      '11'
    ],
    answer: 2,
    explanation: '先算乘法 3*4=12，再算加法 2+12=14。注意 Python 和数学一样，先算乘除后算加减。',
    hint: '先算乘法还是加法？'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '变量计算',
    question: '如果 a = 5, b = 4，执行 print(a + a * b) 会输出什么？',
    options: [
      '25',
      '20',
      '36',
      '45'
    ],
    answer: 0,
    explanation: 'a = 5, b = 4。a + a * b = 5 + 5 * 4 = 5 + 20 = 25。先算乘法 a * b = 20，再算加法 5 + 20 = 25。',
    hint: '先算 a * b，再算 a + (a*b)'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '变量更新',
    question: '执行以下代码，第三次 print(n) 会输出什么？\n\n```python\nn = 5\nn = n + 3\nn = n * 2\nprint(n)\n```',
    options: [
      '8',
      '11',
      '16',
      '10'
    ],
    answer: 2,
    explanation: 'n = 5 → n = n + 3 = 8 → n = n * 2 = 16。所以 print(n) 输出 16。',
    hint: '每次赋值都会用新值覆盖原来的值'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L1-1',
  title: 'print与变量',
  subtitle: '学会输出和存储数据',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握 print() 命令的基本用法',
    '理解变量的概念和创建方法',
    '能使用变量存储和使用数据',
    '能进行简单的数学运算'
  ],
  prerequisites: [
    '认识数字和基本运算符号',
    '会用键盘输入内容'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['print', 'right', 'box'],
  medium: ['weight', 'height', 'variable', 'number'],
  hard: ['output', 'assign', 'calculate', 'expression']
}

// 代码模板练习（按难度分组）
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