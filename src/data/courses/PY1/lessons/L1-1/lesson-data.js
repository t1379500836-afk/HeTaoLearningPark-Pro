/**
 * PY1 课程 L1-1: 编程启程
 *
 * 核心知识点:
 * 1. print() 命令 - 在输出区显示内容
 * 2. 变量 - 存储数据的盒子
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'print',
    pronunciation: '[print]',
    partOfSpeech: 'v./n.',
    meaning: '打印；印刷；出版',
    level: 'easy',
    example: 'Please print your name.',
    exampleTranslation: '请打印你的名字。',
    note: 'out of print 绝版的；已售完'
  },
  {
    word: 'weight',
    pronunciation: '[weit]',
    partOfSpeech: 'n.',
    meaning: '重量；分量；重物',
    level: 'easy',
    example: 'What is your weight?',
    exampleTranslation: '你的体重是多少？',
    note: 'lose weight 减肥'
  },
  {
    word: 'height',
    pronunciation: '[hait]',
    partOfSpeech: 'n.',
    meaning: '高度；高处；高地',
    level: 'easy',
    example: 'What is your height?',
    exampleTranslation: '你的身高是多少？',
    note: ''
  },
  // 拓展单词
  {
    word: 'variable',
    pronunciation: "['veəriəbl]",
    partOfSpeech: 'n./adj.',
    meaning: '变量；可变的；易变的',
    level: 'medium',
    example: 'Create a variable to store the value.',
    exampleTranslation: '创建一个变量来存储这个值。',
    note: 'variable 变量'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '魔法打印机 - print()命令',
    emoji: '🖨️',
    gradeLevel: '1-2',
    summary: '在输出区显示文字和计算结果',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一台魔法打印机，只要告诉它要打印什么，它就会在屏幕上显示出来！',
      concept: 'print() 命令可以把括号中的内容显示在输出区，就像魔法打印机一样。',
      syntax: "print('要打印的内容')",
      example: {
        title: '打印问候语',
        code: "print('你好，世界!')",
        output: '你好，世界!',
        explanation: 'print() 命令会把单引号中的文字原样打印在输出区。'
      },
      practice: [
        {
          question: '如何打印 "你好"？',
          answer: "print('你好')"
        },
        {
          question: 'print() 命令中，文字需要加什么符号？',
          answer: '单引号'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的魔法打印机升级了！不仅能打印文字，还能帮你做数学题，直接算出结果！',
      concept: 'print() 命令非常智能，如果括号中是数学算式，它会自动计算并显示结果。',
      syntax: "print('文字')  # 打印文字\nprint(算式)  # 计算并打印结果",
      example: {
        title: '计算数学题',
        code: 'print(2 * 3)',
        output: '6',
        explanation: 'print() 会自动计算 2 * 3 的结果，然后输出 6。'
      },
      practice: [
        {
          question: 'print(5 + 3) 会输出什么？',
          answer: '8'
        },
        {
          question: 'print("10 + 20") 会输出什么？',
          answer: '10 + 20（不会计算，因为加了引号）'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '打印机大师模式！你可以用 print() 显示各种信息：文字、数字、计算结果，甚至是变量的值！',
      concept: 'print() 是编程中最基础的输出命令，配合变量可以实现更复杂的功能。打印变量时不需要加引号。',
      syntax: "print('文字')    # 打印字符串\nprint(数字)    # 打印数字\nprint(变量)    # 打印变量值（不加引号！）",
      example: {
        title: '打印计算结果',
        code: 'number = 7\nprint(number * 5)',
        output: '35',
        explanation: '先创建变量 number = 7，然后打印 number * 5 的结果，输出 35。'
      },
      practice: [
        {
          question: '打印变量时需要加引号吗？',
          answer: '不需要，加引号会打印变量名而不是值'
        },
        {
          question: 'print("2*3") 和 print(2*3) 有什么区别？',
          answer: '前者输出 "2*3"，后者输出 "6"'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '神奇储物盒 - 变量',
    emoji: '📦',
    gradeLevel: '1-2',
    summary: '存储数据，随时取用',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有很多神奇的盒子，每个盒子上都贴着标签。你可以在盒子里放东西，以后要用的时候，只要找到盒子就能拿到里面的东西！',
      concept: '变量就像一个有标签的盒子，可以存储各种数据，比如数字、文字等。以后想用这个数据时，只要说出变量名就可以了。',
      syntax: '变量名 = 变量的值',
      example: {
        title: '创建数字变量',
        code: 'number = 7\nprint(number)',
        output: '7',
        explanation: 'number = 7 表示把数字7存入变量number中，print(number)会打印出变量中的值7。'
      },
      practice: [
        {
          question: '如何把数字10存入变量age？',
          answer: 'age = 10'
        },
        {
          question: '变量可以存储什么？',
          answer: '数字、文字等各种数据'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的储物盒升级了！不仅可以存数字，还可以存文字，甚至可以用存好的数据进行计算！',
      concept: '变量可以存储不同类型的数据：整数、小数、字符串等。存储后可以反复使用，还可以参与运算。',
      syntax: '# 存储数字\nnumber = 7\n\n# 存储文字\nfruit = "apple"\n\n# 使用变量计算\nprint(number * 5)',
      example: {
        title: '存储文字并打印',
        code: 'fruit = "apple"\nprint(fruit)',
        output: 'apple',
        explanation: '把文字 "apple" 存入变量 fruit，打印时输出存储的文字。注意文字需要加引号。'
      },
      practice: [
        {
          question: '如何存储名字 "小明" 到变量 name？',
          answer: 'name = "小明"'
        },
        {
          question: '变量名可以随意取名吗？',
          answer: '基本可以，但最好用有意义的名字，不能用数字开头'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '储物大师模式！你可以创建多个变量，让它们之间互相配合，完成复杂的计算任务！',
      concept: '变量是编程的基础，可以创建多个变量，并且可以用一个变量的值来计算另一个变量。变量名应该有意义，方便阅读代码。',
      syntax: '# 创建多个变量\na = 10\nb = 20\n\n# 变量参与运算\nprint(a + b)\n\n# 变量赋值给变量\nc = a',
      example: {
        title: '多个变量配合计算',
        code: 'number = 7\nresult = number * 5\nprint(result)',
        output: '35',
        explanation: '先创建变量 number = 7，然后用 number 的值计算 result = 35，最后打印 result。'
      },
      practice: [
        {
          question: 'number = 10 后，number = number + 5 的值是多少？',
          answer: '15（number 变成了 15）'
        },
        {
          question: '变量名最好用什么风格？',
          answer: '小写字母，多个词用下划线连接，如 student_name'
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
    mathConcept: '符号识别',
    question: '下面哪段代码能正确打印出 "乌拉乎"？\n\nA. print(乌拉乎)\nB. print 乌拉乎\nC. print(\'乌拉乎\')\nD. print \'乌拉乎\'',
    options: [
      'A. print(乌拉乎)',
      'B. print 乌拉乎',
      'C. print(\'乌拉乎\')',
      'D. print \'乌拉乎\''
    ],
    answer: 2, // C
    explanation: 'print() 命令的正确格式是：print 后面跟括号，打印文字时文字两侧要加单引号。C选项完全符合要求。',
    hint: 'print() 命令需要括号，文字需要加引号'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '变量理解',
    question: '执行下面的代码，打印结果是什么？\n\n```python\nn = 12\nprint(n)\n```\n\nA. n\nB. 12\nC. \'12\'\nD. n=12',
    options: [
      'A. n',
      'B. 12',
      'C. \'12\'',
      'D. n=12'
    ],
    answer: 1, // B
    explanation: 'n = 12 表示将数字12存入变量n中，print(n)会打印出变量n中存储的值，即12。注意打印变量时不加引号，所以不会输出\'12\'这种带引号的形式。',
    hint: 'print(n) 打印的是变量 n 中存储的值'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '算式计算',
    question: '下面哪段代码能打印出 30？\n\nA. print(7 + 6)\nB. print(n + 20)\nC. print("n + 20")\nD. print(7 + 6)',
    options: [
      'A. print(7 + 6)',
      'B. print(n + 20)',
      'C. print("n + 20")',
      'D. print(7 + 6)'
    ],
    answer: 1, // B
    explanation: '这是一个陷阱题！需要仔细计算每个选项：\n- A选项：7 + 6 = 13，输出13\n- B选项：假设n=10，10 + 20 = 30，输出30 ✓\n- C选项：加了引号，输出字符串 "n + 20"\n- D选项：7 + 6 = 13，输出13\n\n注意：如果括号中填写的是数学算式，会直接打印出计算结果。',
    hint: '计算每个选项的算式结果，注意有引号和无引号的区别'
  },

  // 🟡 进阶题
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '算式计算',
    question: "下面哪段代码能打印出 30？\n\n```python\nn = 10\n```\n\nA. print(7 + 6)\nB. print(n + 20)\nC. print(\"n + 20\")\nD. print(7 + 6)",
    options: [
      'A. print(7 + 6)',
      'B. print(n + 20)',
      'C. print("n + 20")',
      'D. print(7 + 6)'
    ],
    answer: 1, // B
    explanation: '需要仔细计算每个选项：\n- A选项：7 + 6 = 13，输出13\n- B选项：n=10，10 + 20 = 30，输出30 ✓\n- C选项：加了引号，输出字符串 "n + 20"\n- D选项：7 + 6 = 13，输出13\n\n注意：如果括号中填写的是数学算式，会直接打印出计算结果。',
    hint: '计算每个选项的算式结果，注意有引号和无引号的区别'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '变量计算',
    question: "执行下面的代码，会输出什么？\n\n```python\nn = 10\nprint(n * 2 + 5)\n```\n\nA. 20\nB. 25\nC. 30\nD. n * 2 + 5",
    options: [
      'A. 20',
      'B. 25',
      'C. 30',
      'D. n * 2 + 5'
    ],
    answer: 1, // B
    explanation: '这是一个数学计算题！需要遵循运算优先级：\n\n1. 先计算 n * 2 = 10 * 2 = 20\n2. 再计算 20 + 5 = 25\n\n所以输出结果是 25。\n\n数学知识：乘法优先于加法，这与数学中的运算顺序一致。',
    hint: '先算乘法，再算加法：10 × 2 + 5 = ?'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '累加计算',
    question: "执行下面的代码，变量 n 的值会变成多少？\n\n```python\nn = 5\nn = n + 3\nprint(n)\n```\n\nA. 5\nB. 8\nC. 3\nD. n + 3",
    options: [
      'A. 5',
      'B. 8',
      'C. 3',
      'D. n + 3'
    ],
    answer: 1, // B
    explanation: '这是一个累加计算！\n\n1. 第一行：n = 5，把5存入变量n\n2. 第二行：n = n + 3，先算右边 n + 3 = 5 + 3 = 8，再把8存入变量n\n3. 第三行：print(n)，输出8\n\n数学知识：这是基础的累加运算，n = n + 3 表示让 n 增加3。',
    hint: 'n = n + 3 表示让原来的 n 加上 3'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L1-1',
  title: '编程启程',
  subtitle: '学会 print() 命令和变量',
  difficulty: '入门',
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

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['print', 'code', 'name', 'text'],
  medium: ['weight', 'height', 'number'],
  hard: ['variable', 'keyboard', 'symbol']
}

// 代码模板练习（按难度分组）
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
