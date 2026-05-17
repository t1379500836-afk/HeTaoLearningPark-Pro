/**
 * PY1 课程 L1-3: 条件判断
 *
 * 核心知识点:
 * 1. if 语句 - 条件判断
 * 2. if 执行过程 - 条件成立与否
 * 3. = 与 == 的区别
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'if',
    pronunciation: '[ɪf]',
    partOfSpeech: 'conj.',
    meaning: '如果；假如；当',
    level: 'easy',
    example: 'If it rains, I will stay home.',
    exampleTranslation: '如果下雨，我会待在家里。',
    source: 'ocr'
  },
  {
    word: 'turn',
    pronunciation: '[tɜːn]',
    partOfSpeech: 'v.',
    meaning: '旋转；转身；转弯',
    level: 'easy',
    example: 'Turn left at the corner.',
    exampleTranslation: '在拐角处向左转。',
    source: 'ocr'
  },
  {
    word: 'code',
    pronunciation: '[kəʊd]',
    partOfSpeech: 'n.',
    meaning: '代码；密码；法规',
    level: 'medium',
    example: 'Can you read this code?',
    exampleTranslation: '你能读懂这个代码吗？',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'condition',
    pronunciation: '[kənˈdɪʃən]',
    partOfSpeech: 'n.',
    meaning: '条件；情况',
    level: 'medium',
    example: 'The condition is true, so the code runs.',
    exampleTranslation: '条件为真，所以代码执行。',
    source: 'extended'
  },
  {
    word: 'equal',
    pronunciation: '[ˈiːkwəl]',
    partOfSpeech: 'adj.',
    meaning: '相等的；等于',
    level: 'medium',
    example: 'Five is equal to five.',
    exampleTranslation: '5等于5。',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '条件判断 - if 语句',
    emoji: '⚖️',
    gradeLevel: '1-2',
    summary: '根据条件是否成立，决定要不要执行代码',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'if 就像一个守门员，它会检查一个条件，如果条件成立（为真），就放行让后面的代码执行；如果条件不成立（为假），就跳过后面的代码。',
      concept: 'if 语句用于条件判断，当条件成立时执行下级代码，条件不成立时跳过下级代码。',
      syntax: 'if 条件:\n    下级代码',
      example: {
        title: '如果满足条件就打印',
        code: "light = '红色'\nif light == '红色':\n    print('停')",
        output: '停',
        explanation: '变量 light 是"红色"，条件 light == "红色" 成立，所以执行下级代码 print("停")。'
      },
      practice: [
        {
          question: "if light == '绿色': print('前进')，当 light 是'绿色'时会打印什么？",
          answer: '前进'
        },
        {
          question: 'if 语句后面要加什么符号？',
          answer: '冒号'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '多个 if 语句可以连在一起用，每个 if 都会检查自己的条件，按顺序依次判断。',
      concept: '多个 if 语句会各自独立判断，每个条件成立时都会执行对应的下级代码。',
      syntax: 'if 条件1:\n    代码1\nif 条件2:\n    代码2',
      example: {
        title: '多个 if 判断',
        code: "a = 16\nif a > 10:\n    print('大于10')\nif a < 20:\n    print('小于20')",
        output: '大于10\n小于20',
        explanation: '两个 if 各自判断。a=16，16>10 成立打印"大于10"；16<20 也成立打印"小于20"。两个 if 都执行了。',
      },
      practice: [
        {
          question: '两个 if 条件都成立时，会执行几次下级代码？',
          answer: '2次'
        },
        {
          question: 'if a > 10 和 if a < 20，如果 a=15，两个条件都成立吗？',
          answer: '都成立'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '理解 if 语句的执行顺序很重要：程序从上到下逐行执行，遇到 if 就判断，满足条件就执行下级代码，然后继续往下走。',
      concept: 'if 语句只是跳过当前分支，不会终止整个程序。理解执行顺序是编程的基础。',
      syntax: 'if 条件:\n    代码\n# 继续执行后面的代码',
      example: {
        title: '理解执行顺序',
        code: "score = 92\nif score > 90:\n    print('A')\nprint('优秀')\nprint('^o^')",
        output: 'A\n优秀\n^o^',
        explanation: '程序从上到下执行：① score=92 ② if 判断 92>90 成立，执行 print("A") ③ 继续执行，打印"优秀" ④ 继续执行，打印"^o^"。注意：print("优秀")和print("^o^")不在 if 的下级代码里，所以无论条件是否成立都会执行。',
      },
      practice: [
        {
          question: 'if 语句的下级代码执行完后，程序会怎样？',
          answer: '继续执行后面的代码'
        },
        {
          question: '不在 if 下级代码里的 print() 会执行吗？',
          answer: '会执行'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '赋值与判断 - = 与 ==',
    emoji: '🔍',
    gradeLevel: '3-4',
    summary: '一个等号是赋值，两个等号是判断相等',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '等号在编程中有两个不同的作用：一个等号 = 是"把右边的东西放进左边的盒子里"，两个等号 == 是"问问左边和右边是不是一样的"。',
      concept: '= 是赋值号，把右边的值存储到左边的变量中；== 是判断号，判断左右两边是否相等。',
      syntax: '赋值：变量 = 值\n判断：变量 == 值',
      example: {
        title: '赋值和判断的区别',
        code: "# 赋值：把'红色'放进变量a中\na = '红色'\n# 判断：检查a的值是不是'红色'\nif a == '红色':\n    print('停下来')",
        output: '停下来',
        explanation: 'a = "红色" 把字符串赋值给变量 a。a == "红色" 判断 a 的值是否等于"红色"，条件成立所以打印"停下来"。',
      },
      practice: [
        {
          question: 'a = 5 和 a == 5 有什么区别？',
          answer: 'a=5是赋值，a==5是判断是否等于5'
        },
        {
          question: 'if 条件中应该用 = 还是 ==？',
          answer: '=='
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '判断两个字符串是否相等时，必须一模一样才相等，包括大小写也要相同。',
      concept: '字符串比较时，内容、字符顺序、大小写都必须完全相同才相等。',
      syntax: "'abc' == 'abc'  # True\n'abc' == 'ABC'  # False",
      example: {
        title: '字符串比较',
        code: "name = '小核桃'\nif name == '小核桃':\n    print('欢迎')\nif name == '小桃':\n    print('找不到这个人')",
        output: '欢迎',
        explanation: 'name = "小核桃"，第一个判断 name == "小核桃" 成立，打印"欢迎"。第二个判断 name == "小桃" 不成立，跳过。',
      },
      practice: [
        {
          question: "'Apple' == 'apple' 成立吗？",
          answer: '不成立，大小写不同'
        },
        {
          question: '两个字符串相等意味着什么？',
          answer: '内容、顺序、大小写完全相同'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '混用 = 和 == 是常见的错误。记住：= 用于赋值语句（左边是变量），== 用于条件判断（用在 if 后面）。',
      concept: '赋值语句使用 =，条件判断使用 ==。混用会导致程序运行结果完全相反。',
      syntax: '正确：if a == 5:\n错误：if a = 5:',
      example: {
        title: '常见错误分析',
        code: "# 错误写法：if a = 5: 会把5赋值给a，而不是判断a是否等于5\n# 正确写法：\na = 10\nif a == 10:\n    print('a等于10')\nprint('程序结束')",
        output: 'a等于10\n程序结束',
        explanation: 'if a = 10 不是判断而是赋值，Python 会把 10 赋给 a，然后条件总为 True。正确写法是 if a == 10: 判断 a 是否等于 10。',
      },
      practice: [
        {
          question: 'if a = 5: 是什么意思？',
          answer: '把5赋值给a，然后条件为真'
        },
        {
          question: '为什么 if 条件中不能使用 =？',
          answer: '因为=是赋值不是判断，会改变变量的值'
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
    mathConcept: '条件判断',
    question: '以下哪段代码会在 light 的值是"绿色"时，打印出"前进"？',
    options: [
      "if light = '绿色': print('前进')",
      "if '绿色' == light: print('前进')",
      "if light == '绿色': print('前进')",
      "light == '绿色': print('前进')"
    ],
    answer: 2,
    explanation: 'if 条件判断要使用 == 而不是 =。A 选项使用 = 会变成赋值；D 选项缺少 if 关键字。正确答案 C：if light == "绿色": 表示判断 light 的值是否等于"绿色"。',
    hint: '条件判断要用两个等号'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '执行顺序',
    question: `执行以下代码会打印什么？\n\n\`\`\`python\na = '红色'\nif a == '红色':\n    print('A')\nprint('B')\n\`\`\``,
    options: [
      'A',
      'B',
      'A B',
      'AB'
    ],
    answer: 2,
    explanation: 'a = "红色"，条件成立，执行 print("A")；然后继续执行 print("B")。两个 print 都会执行。',
    hint: '两个 print 都会执行吗？'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '多条件判断',
    question: `n 的值是以下哪个选项时，程序不会打印出任何内容？\n\n\`\`\`python\nif n > 10:\n    print('大于10')\nif n < 50:\n    print('小于50')\n\`\`\``,
    options: [
      '5',
      '16',
      '52',
      '123'
    ],
    answer: 1,
    explanation: '当 n=16 时，n>10 成立打印"大于10"，n<50 也成立打印"小于50"，两个都会打印。',
    hint: '两个条件都成立时会打印2次'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '字符串比较',
    question: "以下哪个条件判断结果是 True（成立）？",
    options: [
      "'apple' == 'APPLE'",
      "'banana' == 'banana '",
      "'Cherry' == 'cherry'",
      "'date' == 'date'"
    ],
    answer: 3,
    explanation: 'D 选项 "date" == "date" 完全相同，包括大小写和内容都一样，所以成立。其它选项：A 大小写不同，B 空格不同，C 大小写不同。',
    hint: '字符串比较要完全一致'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合分析',
    question: `执行以下代码，最终会打印什么？\n\n\`\`\`python\nscore = 92\nif score > 90:\n    print('A')\nprint('优秀')\nprint('^o^')\n\`\`\``,
    options: [
      'A',
      '优秀',
      'A 优秀',
      'A 优秀 ^o^'
    ],
    answer: 3,
    explanation: 'score = 92，条件 score > 90 成立，执行 print("A")。然后继续执行后面的 print("优秀") 和 print("^o^")。注意这两个 print 不在 if 的下级代码里（没有缩进），所以无论条件是否成立都会执行。',
    hint: '没有缩进的 print 也会执行'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '错误分析',
    question: '下面哪段代码是错误的？',
    options: [
      "if a == 5: print('对')",
      'a = 5',
      "if a = 5: print('对')",
      "print('结果', a)"
    ],
    answer: 2,
    explanation: 'C 选项 if a = 5: 是错误的。a = 5 是赋值语句，不能用在 if 条件判断中。应该使用 a == 5 来判断是否等于 5。',
    hint: 'if 条件判断不能使用赋值符号'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L1-3',
  title: '条件判断',
  subtitle: '学会用if做判断',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解条件判断的概念',
    '掌握 if 语句的基本格式',
    '区分 = 和 == 的作用',
    '能正确使用 if 语句进行判断'
  ],
  prerequisites: [
    '理解变量的概念',
    '知道什么是条件'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['if', 'turn', 'code', 'run'],
  medium: ['equal', 'condition', 'check', 'true'],
  hard: ['false', 'assign', 'statement', 'execute']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    "if a == 5:",
    "if light == '红色':",
    "print('前进')",
    "if n > 10:"
  ],
  medium: [
    "if a == 5:\n    print('对')",
    "if light == '绿色':\n    print('前进')",
    "if score > 90:\n    print('A')",
    "if n < 50:\n    print('小')"
  ],
  hard: [
    "if a == 5:\n    print('对')\nprint('继续')",
    "if score > 90:\n    print('A')\nprint('优秀')",
    "a = 10\nif a == 10:\n    print('yes')",
    "if n > 10:\n    print('大于10')\nif n < 50:\n    print('小于50')"
  ]
}

// 导出所有数据
export const L1_3_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L1_3_data