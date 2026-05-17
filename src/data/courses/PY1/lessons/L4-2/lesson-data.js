/**
 * PY1 课程 L4-2: 布尔值与while循环
 *
 * 核心知识点:
 * 1. 布尔值 - True 和 False
 * 2. while 循环 - 条件循环
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'while',
    pronunciation: '[waɪl]',
    partOfSpeech: 'conj.',
    meaning: '当...的时候；一段时间',
    level: 'medium',
    example: 'While I was sleeping, it rained.',
    exampleTranslation: '我睡觉的时候下雨了。',
    source: 'ocr'
  },
  {
    word: 'true',
    pronunciation: '[truː]',
    partOfSpeech: 'adj.',
    meaning: '真实的；正确的',
    level: 'easy',
    example: 'This is a true story.',
    exampleTranslation: '这是一个真实的故事。',
    source: 'ocr'
  },
  {
    word: 'false',
    pronunciation: '[fɔːls]',
    partOfSpeech: 'adj.',
    meaning: '假的；错误的',
    level: 'easy',
    example: 'This answer is false.',
    exampleTranslation: '这个答案是错误的。',
    source: 'ocr'
  },
  {
    word: 'food',
    pronunciation: '[fuːd]',
    partOfSpeech: 'n.',
    meaning: '食物',
    level: 'easy',
    example: 'I like Chinese food.',
    exampleTranslation: '我喜欢中国食物。',
    source: 'ocr'
  },
  {
    word: 'click',
    pronunciation: '[klɪk]',
    partOfSpeech: 'v.',
    meaning: '点击',
    level: 'easy',
    example: 'Click the button.',
    exampleTranslation: '点击按钮。',
    source: 'ocr'
  },
  {
    word: 'put',
    pronunciation: '[pʊt]',
    partOfSpeech: 'v.',
    meaning: '放；安置',
    level: 'easy',
    example: 'Put it on the table.',
    exampleTranslation: '把它放在桌上。',
    source: 'ocr'
  },
  ]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '布尔值',
    emoji: '⚡',
    gradeLevel: '3-4',
    summary: '条件成立与否的结果',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '布尔值就像开关，只有两种状态：开（True）或关（False）。条件成立就是 True，不成立就是 False。',
      concept: '布尔值表示条件是否成立：成立为 True，不成立为 False。注意首字母必须大写。',
      syntax: `True  → 条件成立
False → 条件不成立`,
      example: {
        title: '布尔值判断',
        code: `print(3 > 2)   # True
print(2 > 3)   # False
print(5 == 5)   # True`,
        output: 'True\nFalse\nTrue',
        explanation: '3>2 成立所以 True，2>3 不成立所以 False，5==5 成立所以 True。'
      },
      practice: [
        {
          question: 'print(5 > 10) 会输出什么？',
          answer: 'False'
        },
        {
          question: '布尔值有几种？',
          answer: '两种：True 和 False'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '布尔值可以用 and、or 连接，组成复杂的条件判断。',
      concept: 'and 和 or 连接的条件判断结果也是布尔值。',
      syntax: `True and False → False
True or False → True
not True → False`,
      example: {
        title: '复合布尔值',
        code: `print(True and True)    # True
print(True and False)   # False
print(True or False)    # True
print(not True)         # False`,
        output: 'True\nFalse\nTrue\nFalse',
        explanation: 'and 要求两边都 True，or 要求任意一边 True，not 取反。'
      },
      practice: [
        {
          question: 'True and True 结果是什么？',
          answer: 'True'
        },
        {
          question: 'not False 结果是什么？',
          answer: 'True'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '布尔值是计算机科学的基础，所有条件判断最终都会变成布尔值。',
      concept: '理解布尔代数：and、or、not 是三个基本运算，满足特定规律。',
      syntax: `# 布尔代数基本规律
True and True = True
True or False = True
not False = True`,
      example: {
        title: '布尔代数',
        code: `# 德摩根定律
not (True and False) = not True or not False
not (True or False) = not True and not False`,
        output: '',
        explanation: '布尔代数有严格的数学规律，理解这些有助于深入理解计算机逻辑。'
      },
      practice: [
        {
          question: '(5 > 3) and (2 < 4) 结果是什么？',
          answer: 'True'
        },
        {
          question: 'not (3 > 5) 结果是什么？',
          answer: 'True'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: 'while 循环',
    emoji: '🔄',
    gradeLevel: '3-4',
    summary: '当条件成立时重复执行',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'while 循环就像"只要...就..."：只要条件成立，就一直重复执行。就像红灯停、绿灯行，但 while True 是永远重复（无限循环）。',
      concept: 'while 循环当条件成立时重复执行循环体内的代码，条件不成立时结束循环。',
      syntax: `while 条件:
    循环的代码`,
      example: {
        title: 'while 循环',
        code: `i = 0
while i < 3:
    print(i)
    i = i + 1`,
        output: '0\n1\n2',
        explanation: 'i=0，条件 i<3 成立时进入循环，打印 i，然后 i+1。重复直到 i=3 时 i<3 不成立，退出循环。'
      },
      practice: [
        {
          question: 'while 循环什么时候结束？',
          answer: '条件不成立时'
        },
        {
          question: 'while True 表示什么？',
          answer: '无限循环，永远不会自动结束'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'while 循环需要注意设置退出条件，否则会变成无限循环。',
      concept: 'while 循环需要确保条件最终会变为 False，否则程序会一直运行（死循环）。',
      syntax: `# 需要有改变条件的代码
i = 0
while i < 5:
    print(i)
    i = i + 1  # 让 i 最终变大，退出循环`,
      example: {
        title: '正确的 while',
        code: `count = 0
while count < 5:
    print(count)
    count = count + 1`,
        output: '0\n1\n2\n3\n4',
        explanation: 'count 从 0 开始，每次加 1，直到 count=5 时 5<5 不成立，退出循环。'
      },
      practice: [
        {
          question: '如何让 while 循环最终退出？',
          answer: '让循环条件最终变为 False'
        },
        {
          question: 'while 循环和 for 循环有什么区别？',
          answer: 'while 不知道循环次数，for 知道'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'while True 是无限循环，常与 if 和 break 一起使用来控制循环。',
      concept: 'while True 表示条件永远成立，常用 break 语句来退出循环。',
      syntax: `while True:
    if 条件:
        break  # 退出循环
    执行代码`,
      example: {
        title: 'while True + break',
        code: `while True:
    n = int(input())
    if n == 0:
        break
    print(n)`,
        output: '（输入1 2 3 0）\n1\n2\n3',
        explanation: 'while True 无限循环，输入 0 时 break 退出。输入其他数字时打印。'
      },
      practice: [
        {
          question: 'while True 是无限循环，怎么退出？',
          answer: '使用 break 语句'
        },
        {
          question: 'break 语句的作用是什么？',
          answer: '立即结束循环'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: 'while 循环应用',
    emoji: '🎮',
    gradeLevel: '3-4',
    summary: '用 while 实现重复操作',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'while 循环可以用来做重复的事情，比如数数、累加等。',
      concept: 'while 循环适合用于不知道具体循环次数，但知道结束条件的场景。',
      syntax: `累加：n = 0
while n < 10:
    n = n + 1`,
      example: {
        title: '数到10',
        code: `n = 1
while n <= 5:
    print(n)
    n = n + 1`,
        output: '1\n2\n3\n4\n5',
        explanation: 'n 从 1 开始，<=5 时重复，直到 n=6 时退出。打印 1 到 5。'
      },
      practice: [
        {
          question: '如何用 while 循环打印 1 到 10？',
          answer: 'n=1; while n<=10: print(n); n=n+1'
        },
        {
          question: 'while 循环适合什么样的场景？',
          answer: '不知道具体次数，但知道结束条件'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'while 循环可以用于实现游戏逻辑，比如等待某个条件满足。',
      concept: 'while 循环与条件判断结合，可以实现复杂的逻辑控制。',
      syntax: `while True:
    检测条件
    if 满足条件:
        执行
    if 需要退出:
        break`,
      example: {
        title: '等待触发',
        code: `while True:
    if isTouched():
        print('触摸')
        break
    print('等待中')`,
        output: '',
        explanation: '持续检测是否触摸，一旦触摸就打印并退出。'
      },
      practice: [
        {
          question: 'while True 通常配合什么使用来控制退出？',
          answer: 'break 语句'
        },
        {
          question: 'while 循环和 if 判断有什么区别？',
          answer: 'while 重复执行，if 只执行一次'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'while 循环可以实现复杂的条件控制，是编程中的重要工具。',
      concept: '熟练掌握 while 循环和 break、continue 的使用，可以实现各种复杂的程序逻辑。',
      syntax: `while 条件:
    if 跳过条件:
        continue  # 跳到下次循环
    if 退出条件:
        break  # 退出循环
    执行代码`,
      example: {
        title: 'continue 和 break',
        code: `n = 0
while n < 5:
    n = n + 1
    if n == 3:
        continue  # 跳过 3
    print(n)`,
        output: '1\n2\n4\n5',
        explanation: 'n=3 时 continue 跳过后面的 print，直接进入下次循环。所以不打印 3。'
      },
      practice: [
        {
          question: 'continue 和 break 有什么区别？',
          answer: 'continue 跳到下次循环，break 退出循环'
        },
        {
          question: '什么情况下使用 while True 最合适？',
          answer: '需要持续检测直到某个条件满足，然后退出'
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
    mathConcept: '布尔值识别',
    question: '下列单词中不能表示布尔值的是？',
    options: [
      'False',
      'True',
      'And',
      'and'
    ],
    answer: 2,
    explanation: '布尔值只有 True 和 False 两种，且首字母必须大写。And 不是布尔值，and 是关键字但不是布尔值本身。答案是 C。',
    hint: '布尔值只有两种形式'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '布尔值理解',
    question: `print(3 > 2) 会输出什么？`,
    options: [
      'True',
      'False',
      '3 > 2',
      '报错'
    ],
    answer: 0,
    explanation: '3 > 2 成立（True），所以输出 True。',
    hint: '比较运算的结果是布尔值'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: 'and布尔运算',
    question: '条件 6 > 3 and 8 < 5 成立吗？',
    options: [
      '成立',
      '不成立',
      '取决于变量',
      '语法错误'
    ],
    answer: 1,
    explanation: '6 > 3 成立（True），8 < 5 不成立（False）。and 要求两边都成立，所以整体不成立。答案是 B。',
    hint: 'and 两边都必须成立'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: 'while循环理解',
    question: `以下代码会输出什么？\n\n\`\`\`python\ni = 0\nwhile i < 3:\n    i = i + 1\nprint(i)\n\`\`\``,
    options: [
      '0',
      '1',
      '2',
      '3'
    ],
    answer: 3,
    explanation: 'i 从 0 开始，循环 3 次后 i=3，此时 i<3 不成立，退出循环，打印 i=3。答案是 D。',
    hint: '循环结束后 i 的值是多少？'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '无限循环',
    question: `以下代码会打印几次 "hello"？\n\n\`\`\`python\nn = 0\nwhile n < 3:\n    print('hello')\n\`\`\``,
    options: [
      '0次',
      '1次',
      '3次',
      '无限次'
    ],
    answer: 3,
    explanation: 'n=0 初始，但 n 永远是 0，条件 n<3 永远成立，会无限循环打印"hello"。答案是 D。',
    hint: 'n 的值改变了吗？'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: 'break退出',
    question: `以下代码的输出是？\n\n\`\`\`python\nn = 0\nwhile True:\n    if n >= 3:\n        break\n    n = n + 1\nprint(n)\n\`\`\``,
    options: [
      '0',
      '1',
      '2',
      '3'
    ],
    answer: 3,
    explanation: 'while True 无限循环，但当 n>=3 时 break 退出。n 从 0 开始加到 3 时退出，打印 n=3。答案是 D。',
    hint: 'break 在什么时候执行？'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L4-2',
  title: '布尔值与while循环',
  subtitle: '认识True和False',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解布尔值的概念',
    '掌握 True 和 False 的用法',
    '掌握 while 循环的语法',
    '能用 while 循环解决实际问题'
  ],
  prerequisites: [
    '理解 if 语句',
    '知道什么是循环'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['true', 'false', 'while', 'loop'],
  medium: ['while', 'loop', 'break', 'continue'],
  hard: ['boolean', 'infinite', 'condition', 'iterate']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'while True:',
    'while i < 3:',
    'print(True)',
    'print(False)'
  ],
  medium: [
    'i = 0\nwhile i < 5:\n    i = i + 1',
    'while n < 10:\n    n = n + 1',
    'while True:\n    if condition:\n        break',
    'while i < 3:\n    i = i + 1\n    print(i)'
  ],
  hard: [
    'while True:\n    n = input()\n    if n == "quit":\n        break',
    'i = 0\nwhile i < 10:\n    i = i + 1\n    if i == 5:\n        continue\n    print(i)',
    'count = 0\nwhile count < 5:\n    count = count + 1\n    if count % 2 == 0:\n        continue\n    print(count)',
    'while True:\n    if isTouched():\n        break'
  ]
}

// 导出所有数据
export const L4_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L4_2_data