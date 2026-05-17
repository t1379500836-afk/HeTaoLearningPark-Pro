/**
 * PY1 课程 L4-3: break语句与while循环条件
 *
 * 核心知识点:
 * 1. break 语句 - 结束循环
 * 2. while 循环条件 - 条件控制循环
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'tomato',
    pronunciation: '[təˈmeɪtəʊ]',
    partOfSpeech: 'n.',
    meaning: '西红柿；番茄',
    level: 'easy',
    example: 'Tomato is red.',
    exampleTranslation: '西红柿是红色的。',
    source: 'ocr'
  },
  {
    word: 'carrot',
    pronunciation: '[ˈkærət]',
    partOfSpeech: 'n.',
    meaning: '胡萝卜',
    level: 'easy',
    example: 'Rabbits love carrots.',
    exampleTranslation: '兔子爱吃胡萝卜。',
    source: 'ocr'
  },
  {
    word: 'wood',
    pronunciation: '[wʊd]',
    partOfSpeech: 'n.',
    meaning: '木头；木材',
    level: 'easy',
    example: 'The table is made of wood.',
    exampleTranslation: '桌子是木头做的。',
    source: 'ocr'
  },
  {
    word: 'glue',
    pronunciation: '[ɡluː]',
    partOfSpeech: 'n.',
    meaning: '胶水',
    level: 'medium',
    example: 'This glue is strong.',
    exampleTranslation: '这个胶水很牢固。',
    source: 'ocr'
  },
  {
    word: 'mood',
    pronunciation: '[muːd]',
    partOfSpeech: 'n.',
    meaning: '情绪；心情',
    level: 'medium',
    example: 'Good mood today.',
    exampleTranslation: '今天心情好。',
    source: 'ocr'
  },
  {
    word: 'vine',
    pronunciation: '[vaɪn]',
    partOfSpeech: 'n.',
    meaning: '藤本植物；葡萄藤',
    level: 'medium',
    example: 'The vine climbs up.',
    exampleTranslation: '藤蔓向上攀爬。',
    source: 'ocr'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: 'break 语句',
    emoji: '🛑',
    gradeLevel: '3-4',
    summary: '立即结束整个循环',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'break 就像"停止"按钮，按下就立即结束循环，不再继续执行后面的代码。',
      concept: 'break 语句用于循环中，当执行到 break 时，立即结束整个循环。',
      syntax: `while True:
    if 条件:
        break  # 退出循环
print('break执行后')  # 不会执行`,
      example: {
        title: 'break 的作用',
        code: `while True:
    n = int(input())
    if n == 0:
        break
    print(n)
print('结束')`,
        output: '（输入1 2 3 0）\n1\n2\n3\n结束',
        explanation: '输入 0 时 if n==0 成立，执行 break 退出循环。break 后的 print("结束") 开始执行。'
      },
      practice: [
        {
          question: 'break 语句的作用是什么？',
          answer: '立即结束循环'
        },
        {
          question: 'break 可以用在哪里？',
          answer: '循环内部（for 或 while）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'break 经常和 while True 一起使用，实现"直到...才停止"的逻辑。',
      concept: 'while True + break 是常见的组合，用 break 作为循环的退出条件。',
      syntax: `while True:
    反复执行
    if 退出条件:
        break`,
      example: {
        title: '猜数字游戏',
        code: `secret = 7
while True:
    guess = int(input())
    if guess == secret:
        print('对了！')
        break
    print('错了，再试一次')`,
        output: '（输入3 5 7）\n错了，再试一次\n错了，再试一次\n对了！',
        explanation: '循环猜数字，直到猜对（guess==secret）时 break 退出循环。'
      },
      practice: [
        {
          question: 'while True 和 break 组合适合什么场景？',
          answer: '不知道循环次数，需要根据条件退出'
        },
        {
          question: 'break 后面还会执行循环内的代码吗？',
          answer: '不会'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'break 只能结束包含它的那个循环（内层循环），外层循环不受影响。',
      concept: '在嵌套循环中，break 只结束最内层包含它的循环。',
      syntax: `for i in range(3):
    for j in range(3):
        if j == 1:
            break  # 只结束 j 的循环
    print(i)  # 会执行`,
      example: {
        title: '嵌套循环中的 break',
        code: `for i in range(3):
    for j in range(3):
        if j == 1:
            break
        print(j)
    print('i=', i)`,
        output: '0\ni= 0\n0\ni= 1\n0\ni= 2',
        explanation: '当 j==1 时 break 退出内层 j 循环，但外层 i 循环继续。所以 i=0 时打印 0 后 break；i=1 时同样；i=2 时同样。'
      },
      practice: [
        {
          question: '在嵌套循环中，break 结束哪个循环？',
          answer: '只结束包含它的最内层循环'
        },
        {
          question: '如何结束多层嵌套循环？',
          answer: '需要在每一层都使用 break'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: 'while 循环条件',
    emoji: '🔄',
    gradeLevel: '3-4',
    summary: '用条件控制循环是否执行',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'while 后面的条件就像守门员，只有条件成立时才让循环执行，不成立就直接结束。',
      concept: 'while 在每次循环前检查条件：成立则执行，不成立则结束循环。',
      syntax: `while 条件:
    执行代码`,
      example: {
        title: '条件循环',
        code: `count = 0
while count < 3:
    print(count)
    count = count + 1`,
        output: '0\n1\n2',
        explanation: 'count=0 时条件成立执行，打印后 count+1=1。count=1、2 时条件成立。count=3 时条件不成立，退出循环。'
      },
      practice: [
        {
          question: 'while 循环的条件在什么时候检查？',
          answer: '每次循环开始前'
        },
        {
          question: '条件不成立时会发生什么？',
          answer: '循环结束，执行后面的代码'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'while 循环和 if 判断的区别：if 只执行一次，while 会重复执行直到条件不成立。',
      concept: 'while 是"条件成立时重复执行"，if 是"条件成立时执行一次"。',
      syntax: `# if: 只执行一次
if 条件:
    代码

# while: 重复执行
while 条件:
    代码`,
      example: {
        title: 'if vs while',
        code: `# if: 只检查一次
n = 5
if n > 3:
    print('yes')

# while: 反复检查
n = 5
while n > 3:
    print('yes')
    n = n - 1`,
        output: 'yes\nyes\nyes\nyes\nyes',
        explanation: 'if 只打印一次"yes"（因为只检查一次），while 会一直打印直到 n<=3。'
      },
      practice: [
        {
          question: 'while 和 if 都能加条件，有什么区别？',
          answer: 'if 只执行一次，while 重复执行'
        },
        {
          question: 'while 循环会不会变成死循环？',
          answer: '可能，如果条件永远是 True'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'while 循环可以有两种退出方式：1. 条件变 False；2. 执行 break。使用哪种取决于场景。',
      concept: '循环控制方式：用条件控制（while 条件）还是用 break 控制（while True + break）。',
      syntax: `# 方式1：用条件控制
while 条件:
    代码

# 方式2：用 break 控制
while True:
    代码
    if 退出条件:
        break`,
      example: {
        title: '两种退出方式',
        code: `# 方式1：条件控制
n = 5
while n > 0:
    print(n)
    n = n - 1

# 方式2：break控制
while True:
    n = int(input())
    if n == 0:
        break
    print(n)`,
        output: '5\n4\n3\n2\n1',
        explanation: '方式1：条件 n>0 逐步变 False 退出。方式2：输入 0 时 break 退出。'
      },
      practice: [
        {
          question: '什么时候用 while 条件控制更方便？',
          answer: '知道循环会执行多少次时'
        },
        {
          question: '什么时候用 while True + break 更方便？',
          answer: '不知道循环次数，只知道退出条件时'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '循环应用',
    emoji: '🎮',
    gradeLevel: '3-4',
    summary: '用循环解决实际问题',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '循环可以用来做重复的事情，比如打印数字、计算累加等。',
      concept: '利用循环的重复执行特性，可以简化重复代码。',
      syntax: `# 打印数字
n = 1
while n <= 5:
    print(n)
    n = n + 1`,
      example: {
        title: '打印1到5',
        code: `n = 1
while n <= 5:
    print(n)
    n = n + 1`,
        output: '1\n2\n3\n4\n5',
        explanation: 'n 从 1 开始，每次打印后 +1，直到 n=6 时退出。'
      },
      practice: [
        {
          question: '如何打印 1 到 10 的数字？',
          answer: 'n=1; while n<=10: print(n); n=n+1'
        },
        {
          question: '循环需要什么才能最终退出？',
          answer: '条件变为 False 或执行 break'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '循环结合条件判断，可以实现更复杂的逻辑。',
      concept: '在循环中加入 if 判断，可以根据不同情况执行不同操作。',
      syntax: `while 条件:
    if 情况1:
        处理1
    elif 情况2:
        处理2
    else:
        处理3`,
      example: {
        title: '分类处理',
        code: `n = 0
while n < 5:
    if n % 2 == 0:
        print(n, '是偶数')
    else:
        print(n, '是奇数')
    n = n + 1`,
        output: '0 是偶数\n1 是奇数\n2 是偶数\n3 是奇数\n4 是偶数',
        explanation: 'n 从 0 到 4，每次判断奇偶性并打印。'
      },
      practice: [
        {
          question: '如何判断 1 到 10 中哪些是偶数？',
          answer: '循环并用 if n % 2 == 0 判断'
        },
        {
          question: '循环和 if 组合可以实现什么？',
          answer: '根据条件进行不同处理'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '综合使用循环和条件，可以解决各种编程问题。',
      concept: '熟练掌握循环和条件判断的组合，可以解决复杂的编程问题。',
      syntax: `累加求和：
total = 0
n = 1
while n <= 10:
    total = total + n
    n = n + 1`,
      example: {
        title: '累加计算',
        code: `total = 0
n = 1
while n <= 10:
    total = total + n
    n = n + 1
print(total)`,
        output: '55',
        explanation: '1+2+3+...+10 = 55。循环累加每次的值，最终得到总和。'
      },
      practice: [
        {
          question: '如何计算 1 到 100 的和？',
          answer: 'total=0; n=1; while n<=100: total=total+n; n=n+1'
        },
        {
          question: '循环计数和循环累加有什么区别？',
          answer: '计数用 count=count+1，累加用 total=total+n'
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
    mathConcept: 'break作用',
    question: `以下代码会打印几次 "hello"？\n\n\`\`\`python\na = 1\nwhile a < 2:\n    print('hello')\n\`\`\``,
    options: [
      '0次',
      '1次',
      '2次',
      '无限次'
    ],
    answer: 1,
    explanation: 'a=1，条件 a<2 成立，但循环内没有改变 a 的值，所以 a 永远是 1，条件永远成立。等等，这是无限循环！答案是 D。',
    hint: 'a 的值改变了吗？'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '循环理解',
    question: `以下代码的运行结果，s 的值是？\n\n\`\`\`python\ns = 0\ni = 0\nwhile i < 4:\n    s = s + i\n    i = i + 1\nprint(s)\n\`\`\``,
    options: [
      '0',
      '4',
      '6',
      '10'
    ],
    answer: 2,
    explanation: 'i=0, s=0 → i=1, s=0 → i=2, s=1 → i=3, s=3 → i=4 退出循环。s=0+1+2+3=6。答案是 C。',
    hint: '累加 0+1+2+3'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: 'break退出',
    question: `要打印出 5 次变量 n 的值，横线处应该填写什么？\n\n\`\`\`python\nn = 0\nwhile n < 5:\n    print(n)\n    ____\n\`\`\``,
    options: [
      'break',
      'n = n + 1',
      'continue',
      'exit'
    ],
    answer: 1,
    explanation: '要打印 5 次 n 的值，需要让 n 每次循环后增加 1，这样才能从 0 到 4 共 5 次。答案是 B。',
    hint: 'n 需要变化才能控制循环次数'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '条件循环',
    question: `以下代码的运行结果是？\n\n\`\`\`python\nn = 5\nwhile n > 0:\n    n = n - 1\n    print(n)\n\`\`\``,
    options: [
      '5 4 3 2 1',
      '4 3 2 1 0',
      '5 4 3 2',
      '4 3 2 1'
    ],
    answer: 1,
    explanation: 'n=5 → n=4（打印4）→ n=3（打印3）→ n=2（打印2）→ n=1（打印1）→ n=0（打印0）→ n=0 时退出。输出 4 3 2 1 0。',
    hint: '先减后打印'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '循环嵌套',
    question: `以下代码的运行结果是？\n\n\`\`\`python\nfor i in range(2):\n    for j in range(3):\n        if j == 1:\n            break\n        print(j)\n    print(i)\n\`\`\``,
    options: [
      '0\n0\n0\n1',
      '0\n1\n0\n1',
      '0\n0\n1',
      '0\n1\n0'
    ],
    answer: 0,
    explanation: 'i=0 时内层 j：j=0 打印0，j=1 时 break 退出内层，打印0；i=1 时同样。输出：0 换行 0 换行 1 换行 0 换行 0。答案是 A。',
    hint: 'break 只结束内层循环'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '累加理解',
    question: `以下代码运行后 total 的值是？\n\n\`\`\`python\ntotal = 0\nfor i in range(1, 5):\n    total = total + i\nprint(total)\n\`\`\``,
    options: [
      '10',
      '15',
      '20',
      '6'
    ],
    answer: 0,
    explanation: 'range(1,5) 是 1,2,3,4。1+2+3+4=10。答案是 A。',
    hint: 'range(1,5) 不包含 5'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L4-3',
  title: 'break与循环条件',
  subtitle: '学会控制循环的退出',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解 break 语句的作用',
    '掌握用条件控制 while 循环',
    '能用 break 退出循环',
    '能结合循环和条件解决问题'
  ],
  prerequisites: [
    '理解 while 循环',
    '理解 if 语句'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['break', 'while', 'loop', 'continue'],
  medium: ['break', 'while', 'condition', 'iterate'],
  hard: ['continue', 'nested', 'accumulate', 'iteration']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'while True:\n    break',
    'while n < 5:\n    n = n + 1',
    'for i in range(3):\n    break',
    'while True:\n    if condition:\n        break'
  ],
  medium: [
    'n = 0\nwhile n < 5:\n    print(n)\n    n = n + 1',
    'while True:\n    n = input()\n    if n == "quit":\n        break',
    'for i in range(3):\n    for j in range(3):\n        if j == 1:\n            break',
    'while n > 0:\n    n = n - 1\n    print(n)'
  ],
  hard: [
    'total = 0\nfor i in range(10):\n    total = total + i',
    'while True:\n    n = int(input())\n    if n < 0:\n        break\n    total = total + n',
    'count = 0\nwhile count < 100:\n    count = count + 1\n    if count % 10 == 0:\n        print(count)',
    'for i in range(5):\n    for j in range(5):\n        if i == j:\n            break\n        print(i, j)'
  ]
}

// 导出所有数据
export const L4_3_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L4_3_data