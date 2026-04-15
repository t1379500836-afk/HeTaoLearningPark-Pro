/**
 * PY1 课程 L1-2: 互动魔法屋
 *
 * 核心知识点:
 * 1. input() 命令 - 获取用户输入
 * 2. int() 命令 - 转换为整数
 * 3. float() 命令 - 转换为小数
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'input',
    pronunciation: "['input]",
    partOfSpeech: 'n./v.',
    meaning: '输入量；输入端；把(数据)输入计算机',
    level: 'easy',
    example: 'Please input your name.',
    exampleTranslation: '请输入你的名字。',
    note: 'input() 输入命令'
  },
  {
    word: 'theme',
    pronunciation: '[θi:m]',
    partOfSpeech: 'n.',
    meaning: '主题；主旋律',
    level: 'medium',
    example: 'The theme of the party is music.',
    exampleTranslation: '派对的主题是音乐。',
    note: 'for the people 为人民服务'
  },
  {
    word: 'name',
    pronunciation: '[neim]',
    partOfSpeech: 'n./v.',
    meaning: '名称；名字；命名',
    level: 'easy',
    example: 'My name is Taozi.',
    exampleTranslation: '我的名字是桃子。',
    note: 'Hi, my name is... 你好，我叫...'
  },
  // 拓展单词
  {
    word: 'convert',
    pronunciation: '[kənˈvɜːt]',
    partOfSpeech: 'v.',
    meaning: '转换；转变；兑换',
    level: 'medium',
    example: 'Convert the string to a number.',
    exampleTranslation: '把字符串转换成数字。',
    note: 'int() 和 float() 用于类型转换'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '魔法收信箱 - input()命令',
    emoji: '📬',
    gradeLevel: '1-2',
    summary: '让用户输入内容，程序可以接收',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个魔法收信箱，别人可以在里面放纸条，你打开就能看到他们写的内容！',
      concept: 'input() 命令可以让用户在程序运行时输入内容，程序会把输入的内容接收下来。',
      syntax: "变量 = input('提示文字')",
      example: {
        title: '询问名字',
        code: "name = input('请输入你的名字：')\nprint('你好，' + name)",
        output: '请输入你的名字：小明\n你好，小明',
        explanation: 'input() 会显示提示文字，然后等待用户输入。用户输入的内容会被存入变量 name 中。'
      },
      practice: [
        {
          question: 'input() 命令的作用是什么？',
          answer: '让用户输入内容，程序接收'
        },
        {
          question: '用户输入的内容会被存到哪里？',
          answer: '存入变量中'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的魔法收信箱升级了！它不仅能接收文字，还能把收到的内容和程序中的其他内容组合在一起使用！',
      concept: 'input() 命令接收的内容默认是字符串类型（文字），可以和其他文字拼接使用。',
      syntax: "变量 = input('提示文字')\nprint(变量 + '其他文字')",
      example: {
        title: '个性化问候',
        code: "name = input('你叫什么名字？')\nprint(name + '，欢迎来到编程世界！')",
        output: '你叫什么名字？小红\n小红，欢迎来到编程世界！',
        explanation: 'input() 接收用户输入的名字，然后用 + 号把名字和其他文字连接起来。'
      },
      practice: [
        {
          question: 'input() 接收的内容是什么类型？',
          answer: '字符串类型（文字）'
        },
        {
          question: '如何把两个文字连接起来？',
          answer: '用 + 号'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '收信大师模式！input() 是程序与用户交互的核心，可以获取各种信息用于后续的计算和处理。',
      concept: 'input() 返回的是字符串，如果需要进行数学运算，必须先用 int() 或 float() 转换成数字类型。',
      syntax: "# 接收文字\nname = input('名字：')\n\n# 接收数字（需要转换）\nage = int(input('年龄：'))\n\n# 使用输入的数字计算\nprint('10年后你的年龄：' + str(age + 10))",
      example: {
        title: '年龄计算器',
        code: "age = int(input('你今年几岁？'))\nprint('10年后你' + str(age + 10) + '岁')",
        output: '你今年几岁？8\n10年后你18岁',
        explanation: 'input() 接收的是字符串"8"，用 int() 转换成数字8，然后计算 8+10=18，再用 str() 转回字符串输出。'
      },
      practice: [
        {
          question: '为什么 input() 接收的数字不能直接计算？',
          answer: '因为是字符串类型，需要转换成数字'
        },
        {
          question: 'int(input()) 是做什么的？',
          answer: '把用户输入的文字转换成整数'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '变身魔法棒 - int()命令',
    emoji: '🪄',
    gradeLevel: '1-2',
    summary: '把文字变成整数，可以进行计算',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一根魔法棒，它可以把写着数字的纸条，变成真正的数字，这样就可以用来做算术题了！',
      concept: 'int() 命令可以把"看起来像数字"的文字，变成真正的整数（没有小数点的数字）。',
      syntax: "int(要转换的内容)",
      example: {
        title: '文字变数字',
        code: "# 变成数字后可以计算\nn = int('10')\nprint(n + 5)",
        output: '15',
        explanation: "字符串'10'变成数字10，然后10+5=15。"
      },
      practice: [
        {
          question: 'int("7") 会变成什么？',
          answer: '数字7'
        },
        {
          question: '变成数字后可以做什么？',
          answer: '可以用来做算术计算'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '魔法棒升级！它不仅能把文字变成数字，还能处理用户输入的内容，让程序能对用户的数字做出反应！',
      concept: 'int() 常用于处理 input() 的结果，因为用户输入的永远是文字，如果需要计算就必须转换。',
      syntax: "数字 = int(input('请输入数字：'))",
      example: {
        title: '数字翻倍器',
        code: "n = int(input('输入一个数字：'))\nprint('这个数字的两倍是：' + str(n * 2))",
        output: '输入一个数字：6\n这个数字的两倍是：12',
        explanation: '用户输入的"6"是文字，int() 把它变成数字6，计算 6×2=12，再用 str() 转回文字输出。'
      },
      practice: [
        {
          question: '为什么需要 int(input())？',
          answer: '因为 input() 返回的是文字，计算需要数字'
        },
        {
          question: 'int("3.14") 会成功吗？',
          answer: '不会，int() 只能转换整数，不能转换小数'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '魔法大师模式！理解类型转换是编程的重要基础，不同类型的数据有不同的用途和操作方式。',
      concept: 'int() 只能转换"看起来像整数"的字符串。如果字符串包含小数点或非数字字符，会报错。',
      syntax: "# 正确转换\nn1 = int('123')  ✓\n\n# 错误示例\nn2 = int('3.14')  ✗ 包含小数点\nn3 = int('abc')   ✗ 不是数字",
      example: {
        title: '类型转换判断',
        code: "# 以下哪些可以成功转换？\nprint(int('100'))     # ✓ 成功\n# print(int('3.14')) # ✗ 失败！要用float()\n# print(int('hello')) # ✗ 失败！不是数字",
        output: '100',
        explanation: 'int() 只能转换纯整数字符串。带小数点的要用 float()，非数字字符会报错。'
      },
      practice: [
        {
          question: 'int("3.5") 会怎样？',
          answer: '报错，因为包含小数点，应该用 float()'
        },
        {
          question: '如何判断一个字符串能不能用 int() 转换？',
          answer: '必须是纯数字，不能有小数点或字母'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '精确变身术 - float()命令',
    emoji: '🎯',
    gradeLevel: '3-4',
    summary: '把文字变成小数，处理精确的数字',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '你知道吗？有些数字带着小尾巴，比如 3.14、1.5。float() 命令可以把这些带小数点的文字变成真正的数字！',
      concept: 'float() 命令可以把"看起来像数字"的文字变成小数（带小数点的数字）。',
      syntax: "float(要转换的内容)",
      example: {
        title: '小数转换',
        code: "n = float('3.14')\nprint(n)",
        output: '3.14',
        explanation: "float() 把文字'3.14'变成数字3.14。"
      },
      practice: [
        {
          question: 'float("5.5") 会变成什么？',
          answer: '数字5.5'
        },
        {
          question: 'float() 和 int() 有什么区别？',
          answer: 'float() 可以转换小数，int() 只能转换整数'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '精确变身术升级！现在你可以处理各种小数：身高、体重、成绩、价格等等，让程序能处理生活中的真实数据！',
      concept: 'float() 可以处理带小数点的数字，常用于处理身高、体重、成绩、价格等需要精确计算的场景。',
      syntax: "price = float(input('请输入价格：'))",
      example: {
        title: '计算总价',
        code: "price = float(input('苹果每斤多少钱：'))\nweight = float(input('你要买几斤：'))\nprint('总价：' + str(price * weight) + '元')",
        output: '苹果每斤多少钱：5.5\n你要买几斤：2.4\n总价：13.2元',
        explanation: '用 float() 转换价格和重量，计算 5.5×2.4=13.2，得到准确的总价。'
      },
      practice: [
        {
          question: 'float("10") 会变成 10.0 吗？',
          answer: '是的，整数用 float() 转换后会变成 10.0 的形式'
        },
        {
          question: '什么情况下应该用 float() 而不是 int()？',
          answer: '需要处理小数的时候，比如价格、身高、体重'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '精确计算大师！float() 让你能处理各种精确计算，理解整数和小数的区别是数学和编程的双重基础。',
      concept: 'float() 不仅可以转换小数字符串，还能转换整数字符串。int() 会舍弃小数部分，而 float() 会保留。',
      syntax: "# float() 可以转换整数和小数\nn1 = float('100')   # 变成 100.0\nn2 = float('3.14')  # 变成 3.14\n\n# int() 会舍弃小数\nn3 = int(3.99)     # 变成 3（不是4！）",
      example: {
        title: '类型转换对比',
        code: "print(int('3.14'))   # 报错！int()不能直接转小数字符串\nprint(float('3.14')) # 3.14 成功\nprint(int(3.99))     # 3（舍弃小数）\nprint(float(3.99))   # 3.99（保留小数）",
        output: '3.14\n3\n3.99',
        explanation: 'int() 对小数会直接舍弃（不是四舍五入），float() 会保留完整的小数值。'
      },
      practice: [
        {
          question: 'int(3.99) 的结果是？',
          answer: '3，int() 会舍弃小数部分，不是四舍五入'
        },
        {
          question: 'float("100") 和 int("100") 有什么区别？',
          answer: 'float("100") = 100.0，int("100") = 100，数据类型不同'
        }
      ]
    }
  }
]

// 习题数据（编程 × 数学融合）
export const exercises = [
  // 🟢 基础题（1-2年级）
  {
    id: 'ex-1',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '符号识别',
    question: '下面哪段代码能**正确接收**用户输入的年龄？\n\nA. age = input(请输入年龄：)\nB. age = input("请输入年龄：")\nC. input("请输入年龄：")\nD. age = input("请输入年龄："）',
    options: [
      'A. age = input(请输入年龄：)',
      'B. age = input("请输入年龄：")',
      'C. input("请输入年龄：")',
      'D. age = input("请输入年龄："）'
    ],
    answer: 1, // B
    explanation: 'input() 命令的正确格式是：input("提示文字")，并且要把结果存入变量。\n\n- A选项：提示文字没有加引号，会报错\n- B选项：正确！\n- C选项：没有把输入结果存入变量\n- D选项：使用了中文引号',
    hint: 'input() 的提示文字需要加引号，结果要存入变量'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '数字识别',
    question: '执行下面的代码，会输出什么？\n\n```python\nn = int("5")\nprint(n + 3)\n```\n\nA. "53"\nB. 8\nC. "5"\nD. 53',
    options: [
      'A. "53"',
      'B. 8',
      'C. "5"',
      'D. 53'
    ],
    answer: 1, // B
    explanation: 'int("5") 把文字"5"变成数字5，然后 5+3=8。\n\n数学知识：这是"文字变数字"的过程，转换后可以进行数学运算。',
    hint: 'int() 把文字变成数字后才能计算'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '小数计算',
    question: '小明的身高是 1.4 米，爸爸比他高 0.6 米。下面哪段代码能正确计算爸爸的身高？\n\n```python\nh = float(input("小明的身高："))\n```\n\nA. print(h + 0.6)\nB. print(h + "0.6")\nC. print("h + 0.6")\nD. print(h + 0.6米)',
    options: [
      'A. print(h + 0.6)',
      'B. print(h + "0.6")',
      'C. print("h + 0.6")',
      'D. print(h + 0.6米)'
    ],
    answer: 0, // A
    explanation: '需要用数字进行计算，不能和文字相加。\n\n- A选项：h是数字1.4，1.4+0.6=2.0\n- B选项：h是数字，不能和文字"0.6"相加\n- C选项：加了引号，原样输出"h + 0.6"\n- D选项：0.6米不是合法的Python数字\n\n数学知识：小数加法，1.4+0.6=2.0',
    hint: '数字和数字才能相加计算'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '算式计算',
    question: '用户输入数字 10，下面代码会输出什么？\n\n```python\nn = int(input("请输入一个数字："))\nprint(n * 2 + 5)\n```',
    options: [
      '20',
      '25',
      '15',
      '30'
    ],
    answer: 1, // B
    explanation: '输入10被转换成数字，然后计算：10×2+5=25。\n\n数学知识：运算顺序，先乘除后加减。\n\n计算过程：\n1. n = 10\n2. 10 × 2 = 20\n3. 20 + 5 = 25',
    hint: '先算乘法，再算加法'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '舍去问题',
    question: '关于 int() 和 float() 的转换，下面说法**正确**的是？\n\nA. int(3.9) 的结果是 4\nB. float("3.14") 会报错\nC. int("3.14") 会报错\nD. float(3) 会变成 3',
    options: [
      'A. int(3.9) 的结果是 4',
      'B. float("3.14") 会报错',
      'C. int("3.14") 会报错',
      'D. float(3) 会变成 3'
    ],
    answer: 2, // C
    explanation: '逐一分析：\n\n- A选项：错误。int(3.9)=3，直接舍弃小数（不是四舍五入）\n- B选项：错误。float("3.14")=3.14，可以成功\n- C选项：正确！int() 不能直接转小数字符串，会报错\n- D选项：错误。float(3)=3.0，会变成小数形式\n\n数学知识：int() 舍弃小数，float() 保留小数。',
    hint: 'int() 会舍弃小数部分，不能直接转小数字符串'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '总价计算',
    question: '苹果每斤 5.5 元，小明买了 2.4 斤。下面哪段代码能正确计算总价？\n\n```python\nprice = float(input("请输入单价："))\nweight = float(input("请输入斤数："))\n```\n\nA. print(price * weight)\nB. print(price + weight)\nC. print("price * weight")\nD. print(price × weight)',
    options: [
      'A. print(price * weight)',
      'B. print(price + weight)',
      'C. print("price * weight")',
      'D. print(price × weight)'
    ],
    answer: 0, // A
    explanation: '计算总价要用乘法。\n\n- A选项：5.5×2.4=13.2元\n- B选项：5.5+2.4=7.9，这是加法不是总价\n- C选项：加了引号，原样输出文字\n- D选项：×不是Python的乘法符号\n\n数学知识：总价 = 单价 × 数量\n\n计算：5.5×2.4=13.2元',
    hint: '计算总价是用单价乘以数量'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L1-2',
  title: '互动魔法屋',
  subtitle: '学会 input()、int() 和 float() 命令',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握 input() 命令获取用户输入',
    '理解 int() 和 float() 类型转换',
    '学会处理整数和小数数据',
    '能编写简单的交互程序'
  ],
  prerequisites: [
    'Python 基础语法',
    '变量概念',
    'print() 命令'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['input', 'string', 'type', 'name'],
  medium: ['int', 'float', 'number', 'value', 'theme'],
  hard: ['convert', 'integer', 'decimal', 'transform']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    "name = input('名字：')",
    'print(name)',
    "n = int('10')",
    'print(n + 5)',
    "x = float('3.14')",
    'age = int(input())'
  ],
  medium: [
    "name = input('请输入：')\nprint(name)",
    "n = int(input('数字：'))",
    "x = float(input('小数：'))",
    "age = int(input('年龄：'))\nprint(age)",
    "price = float(input('价格：'))"
  ],
  hard: [
    "n = int(input('数字：'))\nprint(n * 2)",
    "age = int(input())\nprint(age + 10)",
    "price = float(input())\nweight = float(input())",
    "x = float(input())\ny = float(input())\nprint(x + y)",
    "n = int(input())\nprint(str(n) + ' 是你输入的数字')"
  ]
}

// 导出所有数据
export const L1_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L1_2_data
