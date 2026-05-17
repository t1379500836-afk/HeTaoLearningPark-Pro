/**
 * PY1 课程 L2-2: 数据类型
 *
 * 核心知识点:
 * 1. 数据类型 - 字符串和数字
 * 2. 字符串 - 引号包裹的内容
 * 3. int() 命令 - 把字符串转成数字
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'number',
    pronunciation: '[ˈnʌmbə]',
    partOfSpeech: 'n.',
    meaning: '数字；编号；数量',
    level: 'easy',
    example: 'Please enter your phone number.',
    exampleTranslation: '请输入您的电话号码。',
    source: 'ocr'
  },
  {
    word: 'integer',
    pronunciation: '[ˈɪntɪdʒə]',
    partOfSpeech: 'n.',
    meaning: '整数',
    level: 'medium',
    example: 'Five is an integer.',
    exampleTranslation: '5是一个整数。',
    source: 'ocr'
  },
  {
    word: 'check',
    pronunciation: '[tʃek]',
    partOfSpeech: 'v.',
    meaning: '检查；核对',
    level: 'medium',
    example: 'Check your homework before submitting.',
    exampleTranslation: '提交前检查一下作业。',
    source: 'ocr'
  },
  {
    word: 'food',
    pronunciation: '[fuːd]',
    partOfSpeech: 'n.',
    meaning: '食物；食品',
    level: 'easy',
    example: 'I like Chinese food.',
    exampleTranslation: '我喜欢中国食物。',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'string',
    pronunciation: '[strɪŋ]',
    partOfSpeech: 'n.',
    meaning: '字符串',
    level: 'medium',
    example: 'This is a string of characters.',
    exampleTranslation: '这是一串字符。',
    source: 'extended'
  },
  {
    word: 'calculate',
    pronunciation: '[ˈkælkjʊleɪt]',
    partOfSpeech: 'v.',
    meaning: '计算',
    level: 'medium',
    example: 'Calculate the result.',
    exampleTranslation: '计算结果。',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '数据类型',
    emoji: '📊',
    gradeLevel: '1-2',
    summary: '数据有不同的类型，字符串和数字是两种基本类型',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '数据就像不同的食材，有不同的种类。字符串就像一串文字，数字就是用来计算的。',
      concept: 'Python 中数据有两种基本类型：字符串（用引号包裹的文字）和数字（用来计算）。',
      syntax: `字符串：用引号包裹
'你好' 'apple' '123'

数字：直接写
1 78 101 1259`,
      example: {
        title: '两种数据类型',
        code: `# 字符串
print('apple')
# 数字
print(123)`,
        output: 'apple\n123',
        explanation: '"apple" 是字符串所以打印出 apple；123 是数字直接打印出 123。'
      },
      practice: [
        {
          question: "'123' 是字符串还是数字？",
          answer: '字符串（因为有引号）'
        },
        {
          question: '123 是什么类型？',
          answer: '数字'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '字符串可以包含各种内容：汉字、字母、数字、符号、空格都可以。不同数据类型无法直接比较或计算。',
      concept: '字符串用引号包裹，可以包含汉字、字母、数字、符号。字符串和数字是不同类型，不能直接比较。',
      syntax: `'汉字' 'ABC' '123!' ' '`,
      example: {
        title: '各种字符串',
        code: `print('你好')
print('Hello')
print('123')
print('!@#')`,
        output: '你好\nHello\n123\n!@#',
        explanation: '字符串可以包含各种字符，包括汉字、英文、数字、符号。'
      },
      practice: [
        {
          question: '"apple" 和 123 能直接比较吗？',
          answer: '不能，数据类型不同'
        },
        {
          question: '字符串用什么包裹？',
          answer: '引号'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '理解数据类型是编程的基础。不同数据类型有不同的操作方式，混用会导致错误。',
      concept: '数据类型决定了可以进行的操作。字符串可以进行拼接，数字可以进行数学运算。',
      syntax: `字符串操作：拼接
数字操作：+ - * /`,
      example: {
        title: '数据类型决定操作',
        code: `# 字符串拼接
print('你好' + '小核桃')
# 数字运算
print(3 + 5)`,
        output: '你好小核桃\n8',
        explanation: '"你好" + "小核桃" 是字符串拼接；3 + 5 是数字加法。'
      },
      practice: [
        {
          question: '"3" + "5" 会得到什么？',
          answer: '"35"（字符串拼接）'
        },
        {
          question: '3 + 5 会得到什么？',
          answer: '8（数字加法）'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '字符串',
    emoji: '🔤',
    gradeLevel: '1-2',
    summary: '用引号包裹的文字，可以拼接',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '字符串就像一串珠子，用引号串在一起。可以用加号把两个字符串拼接成一个更长的字符串。',
      concept: '字符串是用引号包裹的文字，可以用加号拼接。',
      syntax: `'文字1' + '文字2'`,
      example: {
        title: '字符串拼接',
        code: `print('今天吃' + '番茄')
print('你好' + '小核桃')`,
        output: '今天吃番茄\n你好小核桃',
        explanation: '加号可以把两个字符串连接成一个。'
      },
      practice: [
        {
          question: "'苹果' + '香蕉' 会得到什么？",
          answer: '"苹果香蕉"'
        },
        {
          question: '字符串用什么符号拼接？',
          answer: '加号 +'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'input() 获取的用户输入是字符串类型。如果需要当作数字使用，需要转换。',
      concept: 'input() 接收的内容以字符串形式保存，需要用 int() 转换才能当数字用。',
      syntax: `a = input()      # 字符串
n = int(input()) # 数字`,
      example: {
        title: 'input() 获取的是字符串',
        code: `a = input()
print(a + a)
print(int(a) + int(a))`,
        output: '（假设输入 5）\n55\n10',
        explanation: 'input() 返回的是字符串，所以 a+a 得到"55"（拼接）。需要 int() 转换后才能相加。'
      },
      practice: [
        {
          question: 'input() 返回的数据是什么类型？',
          answer: '字符串'
        },
        {
          question: '如何把字符串"5"变成数字5？',
          answer: 'int("5")'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '字符串可以包含空格，空格也是字符。理解字符串的组成对处理文本很重要。',
      concept: '字符串由字符组成，包括汉字、字母、数字、符号、空格等。',
      syntax: `'你好' → 你 好
'abc' → a b c
'1 2 3' → 1 空格 2 空格 3`,
      example: {
        title: '字符串的组成',
        code: `s = 'Hi'
print(s[0])
print(s[1])`,
        output: 'H\ni',
        explanation: '字符串 "Hi" 由两个字符组成，s[0] 是第一个字符 "H"，s[1] 是第二个字符 "i"。'
      },
      practice: [
        {
          question: '字符串 "abc" 有几个字符？',
          answer: '3个'
        },
        {
          question: 's[0] 表示什么？',
          answer: '第一个字符'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: 'int() 命令',
    emoji: '🔄',
    gradeLevel: '3-4',
    summary: '把字符串转换成整数',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'int() 就像一个翻译器，它能把字符串"变成"数字，这样就可以进行数学计算了。',
      concept: 'int() 可以把数字字符串转换成整数，这样就能进行加减乘除运算了。',
      syntax: `int('数字') → 数字
int(变量)`,
      example: {
        title: '字符串转数字',
        code: `a = int('6')
print(a + 2)`,
        output: '8',
        explanation: 'int("6") 把字符串 "6" 转换成数字 6，然后 6+2=8。'
      },
      practice: [
        {
          question: 'int("123") 会得到什么？',
          answer: '123（数字）'
        },
        {
          question: 'int() 有什么用？',
          answer: '把字符串转换成数字'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'int() 只能转换纯数字的字符串。如果字符串里包含文字，int() 会报错。',
      concept: 'int() 要求字符串必须是纯数字，否则会出错。',
      syntax: `int('123') → 123
int('abc') → 报错！`,
      example: {
        title: 'int() 的限制',
        code: `# 正确的转换
n = '123'
print(int(n) + 1)

# 字符串转数字后再运算
a = int('5')
b = int('3')
print(a + b)`,
        output: '124\n8',
        explanation: 'int() 把纯数字字符串转换成整数，然后就可以进行数学运算了。'
      },
      practice: [
        {
          question: 'int("123abc") 会怎样？',
          answer: '会报错'
        },
        {
          question: '什么情况下 int() 会成功？',
          answer: '字符串是纯数字时'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '使用 int() 时要小心，它不会改变原变量的类型，只是得到一个转换后的结果。',
      concept: 'int() 命令得到一个新值，不会修改变量原来的值。',
      syntax: `n = '123'    # n 是字符串
int(n)      # 得到 123，不改变 n
n = int(n)  # 重新赋值给 n，n 变成数字`,
      example: {
        title: 'int() 不改变原变量',
        code: `n = '6'
print(int(n) + 2)
print(n)`,
        output: '8\n6',
        explanation: 'int(n) 得到 8，但打印 n 时还是 "6"，因为 int(n) 没有改变 n 的值。只有 n = int(n) 才会改变 n。'
      },
      practice: [
        {
          question: 'int(n) 会改变 n 的值吗？',
          answer: '不会，除非重新赋值'
        },
        {
          question: 'n = int(n) 做了什么？',
          answer: '把 int(n) 的结果重新赋值给 n'
        }
      ]
    }
  },

  {
    id: 'kp-4',
    title: '数学运算',
    emoji: '➕',
    gradeLevel: '3-4',
    summary: '数字可以加减乘除，注意运算顺序',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'Python 中的数字和数学一样，可以做加减乘除。乘法用 *，除法用 /。',
      concept: '数学运算：加法 +，减法 -，乘法 *，除法 /。',
      syntax: `加法：+
减法：-
乘法：* （shift+8）
除法：/ （斜杠）`,
      example: {
        title: '基本运算',
        code: `print(3 + 5)
print(10 - 3)
print(4 * 2)
print(8 / 2)`,
        output: '8\n7\n8\n4.0',
        explanation: '加法、减法、乘法、除法都可以直接使用。注意除法结果可能有小数。'
      },
      practice: [
        {
          question: 'print(2 * 6) 输出什么？',
          answer: '12'
        },
        {
          question: 'print(10 / 3) 输出什么？',
          answer: '3.333...'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '数学运算有顺序：先乘除后加减，有括号先算括号里面的。',
      concept: '运算优先级：先算乘除，后算加减，有括号先算括号里的。',
      syntax: `先算：* /
后算：+ -
有括号：先算括号里的`,
      example: {
        title: '运算顺序',
        code: `print(2 + 3 * 4)
print((2 + 3) * 4)
print(10 - 4 / 2)`,
        output: '14\n20\n8.0',
        explanation: '2+3*4=2+12=14；(2+3)*4=5*4=20；10-4/2=10-2=8。'
      },
      practice: [
        {
          question: 'print(5 + 2 * 3) 输出什么？',
          answer: '11'
        },
        {
          question: 'print((5 + 2) * 3) 输出什么？',
          answer: '21'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '可以把变量和数学运算结合使用，实现复杂的计算。',
      concept: '变量可以参与数学运算，结果可以重新赋值给变量。',
      syntax: `a = 5
b = 4
result = a + a * b
print(result)`,
      example: {
        title: '变量运算',
        code: `a = 5
b = 4
result = a + a * b
print(result)`,
        output: '25',
        explanation: 'a=5, b=4。a + a * b = 5 + 5 * 4 = 5 + 20 = 25。先算乘法再算加法。'
      },
      practice: [
        {
          question: 'a=3, b=2, a + a * b = ?',
          answer: '9'
        },
        {
          question: 'a + a * b 和 (a + a) * b 有什么区别？',
          answer: '后者先算加法'
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
    mathConcept: '数据类型识别',
    question: '下列哪个选项不是字符串？',
    options: [
      "'我不是字符串'",
      "'this is a string...!&'",
      '我不是字符串',
      "'一、二、三、四、五，大家数一数'"
    ],
    answer: 2,
    explanation: 'Python 中使用一对引号（\' 或 "）引起来的内容叫做字符串。C 选项没有引号，不是字符串。',
    hint: '没有引号就不是字符串'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '字符串拼接',
    question: "'今天吃' + '番茄' + '炒' + '鸡蛋' 会输出什么？",
    options: [
      '今天吃番茄鸡蛋',
      '今天吃 + 番茄 + 炒 + 鸡蛋',
      '番茄炒鸡蛋',
      '鸡蛋番茄'
    ],
    answer: 0,
    explanation: '字符串拼接用加号，把"今天吃"、"番茄"、"炒"、"鸡蛋"连接起来，得到"今天吃番茄炒鸡蛋"。',
    hint: '加号连接字符串'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: 'int()转换',
    question: '下列选项中，正确的是？',
    options: [
      "int('12') == 12",
      "int('12') == '12'",
      "int('12') < 12",
      "'12' == 12"
    ],
    answer: 0,
    explanation: 'int("12") 得到数字 12，12 == 12 成立。A 正确。B int()结果是数字，"12"是字符串，不相等。C 12 < 12 不成立。D 字符串和数字不能比较。',
    hint: 'int() 转换后是数字类型'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '运算顺序',
    question: 'print(5 + 5 * 4) 会输出什么？',
    options: [
      '40',
      '25',
      '20',
      '45'
    ],
    answer: 1,
    explanation: '先算乘法 5*4=20，再算加法 5+20=25。',
    hint: '先乘除，后加减'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合运算',
    question: '执行以下代码，a 和 b 分别是 5 和 4，打印结果是什么？\n\n```python\na = 5\nb = 4\nprint(a + a * b)\n```',
    options: [
      '25',
      '20',
      '36',
      '45'
    ],
    answer: 0,
    explanation: 'a=5, b=4。a + a * b = 5 + 5 * 4 = 5 + 20 = 25。先算乘法 a*b=20，再算加法。',
    hint: '先算 a * b，再算 a + (a*b)'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '数据类型转换',
    question: `以下代码会输出什么？\n\n\`\`\`python\nn = '123'\nprint(int(n) + 1)\n\`\`\``,
    options: [
      '1231',
      '124',
      '123',
      '报错'
    ],
    answer: 1,
    explanation: 'n="123"，int(n) 把字符串 "123" 转换成数字 123，然后 123 + 1 = 124。',
    hint: 'int() 把字符串变成数字'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L2-2',
  title: '数据类型',
  subtitle: '认识字符串和数字',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解字符串和数字两种数据类型',
    '掌握字符串拼接的方法',
    '掌握 int() 命令的使用',
    '能进行基本的数学运算'
  ],
  prerequisites: [
    '认识数字和基本运算符号',
    '知道什么是变量'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['number', 'food', 'apple', 'hello'],
  medium: ['integer', 'check', 'string', 'convert'],
  hard: ['calculate', 'operation', 'expression', 'parentheses']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    "print('apple')",
    "print('你好')",
    "print(123)",
    "'abc' + '123'"
  ],
  medium: [
    "a = int('5')",
    "print(int('3') + 2)",
    "n = input()\nprint(int(n) + 1)",
    "print(3 + 5 * 2)"
  ],
  hard: [
    "a = 5\nb = 4\nprint(a + a * b)",
    "n = '123'\nprint(int(n) + 1)",
    "print((2 + 3) * 4)",
    "x = int(input())\ny = int(input())\nprint(x + y)"
  ]
}

// 导出所有数据
export const L2_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L2_2_data