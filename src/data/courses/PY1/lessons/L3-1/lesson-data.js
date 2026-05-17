/**
 * PY1 课程 L3-1: for 循环
 *
 * 核心知识点:
 * 1. for 循环 - 简化重复代码
 * 2. for i in range() - 循环格式
 * 3. for 循环应用
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'for',
    pronunciation: '[fɔː(r)]',
    partOfSpeech: 'prep./conj.',
    meaning: '为了；因为',
    level: 'easy',
    example: 'This is for you.',
    exampleTranslation: '这是给你的。',
    source: 'ocr'
  },
  {
    word: 'in',
    pronunciation: '[ɪn]',
    partOfSpeech: 'prep.',
    meaning: '在...里面；进入',
    level: 'easy',
    example: 'The cat is in the box.',
    exampleTranslation: '猫在盒子里。',
    source: 'ocr'
  },
  {
    word: 'range',
    pronunciation: '[reɪndʒ]',
    partOfSpeech: 'n.',
    meaning: '区间；范围',
    level: 'medium',
    example: 'The age range is 5 to 10.',
    exampleTranslation: '年龄范围是5到10岁。',
    source: 'ocr'
  },
  {
    word: 'shoot',
    pronunciation: '[ʃuːt]',
    partOfSpeech: 'v.',
    meaning: '射击；拍摄',
    level: 'medium',
    example: 'Shoot the ball.',
    exampleTranslation: '射门。',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'loop',
    pronunciation: '[luːp]',
    partOfSpeech: 'n.',
    meaning: '循环',
    level: 'medium',
    example: 'The loop runs three times.',
    exampleTranslation: '循环运行三次。',
    source: 'extended'
  },
  {
    word: 'repeat',
    pronunciation: '[rɪˈpiːt]',
    partOfSpeech: 'v.',
    meaning: '重复',
    level: 'medium',
    example: 'Repeat the word.',
    exampleTranslation: '重复这个单词。',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: 'for 循环',
    emoji: '🔄',
    gradeLevel: '3-4',
    summary: '用 for 简化重复的代码',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你要打印5次"你好"，如果没有for循环，你需要写5行print。如果用for循环，只需要写一行就能让电脑帮你重复5次！',
      concept: 'for 循环可以简化重复的代码，让程序按照指定次数重复执行某段代码。',
      syntax: `for i in range(重复次数):
    下级代码（重复执行的内容）`,
      example: {
        title: '重复打印',
        code: `for i in range(3):
    print('你好')`,
        output: '你好\n你好\n你好',
        explanation: 'for i in range(3) 表示重复执行3次。print("你好") 是下级代码，被重复执行了3次。'
      },
      practice: [
        {
          question: 'for i in range(5) 会重复执行多少次？',
          answer: '5次'
        },
        {
          question: 'for 循环的下级代码有什么特点？',
          answer: '会被重复执行'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'for 循环的标准格式是 for i in range(数字)，数字决定循环次数。i 是一个变量，每次循环会取不同的值（虽然我们一般不用）。',
      concept: 'for i in range(n) 中，i 是循环变量，range(n) 产生0到n-1的数字，循环执行n次。',
      syntax: `for i in range(3):
    # 第1次：i=0
    # 第2次：i=1
    # 第3次：i=2`,
      example: {
        title: 'range的原理',
        code: `for i in range(3):
    print(i)`,
        output: '0\n1\n2',
        explanation: 'range(3) 产生 0, 1, 2 三个数字，i 依次等于 0, 1, 2，所以打印出 0, 1, 2。'
      },
      practice: [
        {
          question: 'range(3) 产生的数字有哪些？',
          answer: '0, 1, 2'
        },
        {
          question: 'for i in range(4) 循环几次？',
          answer: '4次'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'for 循环的下级代码（缩进的代码）会重复执行，不缩进的代码只在循环结束后执行一次。',
      concept: '缩进决定代码是否在循环内：在循环内的会重复执行，不在循环内的只在最后执行一次。',
      syntax: `# 有缩进：循环内，重复执行
# 无缩进：循环外，执行一次`,
      example: {
        title: '缩进的作用',
        code: `for i in range(3):
    print('*')  # 缩进，重复3次
print('完成')   # 无缩进，执行1次`,
        output: '*\n*\n*\n完成',
        explanation: 'print("*") 有缩进所以重复3次；print("完成") 无缩进在循环外，只在最后执行1次。'
      },
      practice: [
        {
          question: '循环内的代码和循环外的代码有什么区别？',
          answer: '循环内的重复执行，循环外的只执行一次'
        },
        {
          question: 'print 在 for 循环外面和里面有什么区别？',
          answer: '里面重复执行，外面只执行一次'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: 'for 循环与无人机',
    emoji: '🚁',
    gradeLevel: '3-4',
    summary: '用 for 控制无人机移动',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '用 for 循环可以控制无人机移动。比如让无人机连续向右移动3格，只需要把"向右"的命令放在 for 循环里。',
      concept: '在 for 循环内使用 print 输出指令，无人机就会按指令移动相应的次数。',
      syntax: `for i in range(次数):
    print('r')  # 向右移动`,
      example: {
        title: '控制无人机',
        code: `# 连续向右移动3格
for i in range(3):
    print('r')`,
        output: 'r\nr\nr',
        explanation: '循环3次，每次输出一个"r"，表示向右移动一格。'
      },
      practice: [
        {
          question: '如何让无人机连续向上移动5格？',
          answer: 'for i in range(5): print("u")'
        },
        {
          question: 'for i in range(3): print("d") 会输出什么？',
          answer: 'd\nd\nd'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '可以让无人机先执行一段循环到达一个位置，然后执行另一个动作到达终点。理解哪些在循环内、哪些在循环外很重要。',
      concept: '循环内的代码重复执行，循环外的代码在所有循环结束后执行一次。',
      syntax: `for i in range(3):
    print('r')  # 重复3次右移
print('d')         # 最后下移1次`,
      example: {
        title: '完整路线',
        code: `# 先右移3格，再下移1格
for i in range(3):
    print('r')
print('d')`,
        output: 'r\nr\nr\nd',
        explanation: 'for 循环输出3次"r"，然后 print("d") 输出"d"。无人机先右移3格，再下移1格。'
      },
      practice: [
        {
          question: '右移4格、下移1格、左移2格的代码怎么写？',
          answer: 'for i in range(4): print("r"), for i in range(1): print("d"), for i in range(2): print("l")'
        },
        {
          question: 'print("d") 在循环外和循环内有什么区别？',
          answer: '循环内重复执行，循环外只执行一次'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '理解无人机路线时，要注意每个print对应一次移动。循环内的print会被重复执行，循环外的只执行一次。',
      concept: '分析无人机路线时，需要区分循环内外的代码，正确计算总移动次数。',
      syntax: `for i in range(3):
    print('r')  # 右移3次
print('d')       # 下移1次（只1次）
print('u')       # 上移1次（只1次）`,
      example: {
        title: '分析路线',
        code: `# 路线：右3→下1→右4
for i in range(3):
    print('r')
print('d')
for i in range(4):
    print('r')`,
        output: 'r\nr\nr\nd\nr\nr\nr\nr',
        explanation: '第一个for循环3次"r"，下移1次"d"，第二个for循环4次"r"。无人机最终位置：右7下1。'
      },
      practice: [
        {
          question: 'for i in range(2): print("r") 后再 print("u")，总共移动几次？',
          answer: '右移2次，上移1次'
        },
        {
          question: '无人机路线分析的关键是什么？',
          answer: '区分哪些在循环内（重复）哪些在循环外（一次）'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '计算机大脑 CPU',
    emoji: '🧠',
    gradeLevel: '3-4',
    summary: '了解计算机的中央处理器',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'CPU 就像计算机的大脑，它负责计算和控制。CPU 越强大，计算机运行程序就越快。',
      concept: 'CPU 是中央处理器的简称，是计算机最核心的部件，负责执行指令。',
      syntax: `CPU = Central Processing Unit
中央处理器`,
      example: {
        title: 'CPU 的作用',
        code: `# CPU 负责：
# 1. 计算数据
# 2. 执行指令
# 3. 控制其他部件`,
        output: '',
        explanation: 'CPU 是计算机的大脑，所有程序都要靠 CPU 来执行。'
      },
      practice: [
        {
          question: 'CPU 是什么意思？',
          answer: '中央处理器'
        },
        {
          question: 'CPU 在计算机中起什么作用？',
          answer: '计算和控制'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'CPU 广泛应用于各种设备：手机、电视、电脑、汽车、卫星甚至火箭都需要 CPU。',
      concept: 'CPU 是通用处理器，可以执行各种程序，应用于各个领域。',
      syntax: `手机 CPU → 运行APP
电脑 CPU → 运行程序
卫星 CPU → 控制飞行`,
      example: {
        title: 'CPU 的应用',
        code: `# 不同设备的 CPU：
手机：运行APP和游戏
电脑：运行Windows或Mac系统
电视：控制画面显示
汽车：控制引擎和导航`,
        output: '',
        explanation: '虽然设备不同，但它们的核心都是 CPU，执行计算和控制功能。'
      },
      practice: [
        {
          question: 'CPU 只存在于电脑中吗？',
          answer: '不，手机、电视、汽车等很多设备都有CPU'
        },
        {
          question: 'CPU 和程序是什么关系？',
          answer: 'CPU 负责执行程序中的指令'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'CPU 的速度用 GHz 来衡量，GHz 越高，CPU 越快。for 循环让 CPU 可以高效地重复执行任务。',
      concept: 'CPU 速度越来越快，现代 CPU 可以每秒执行数十亿次操作，for 循环在眨眼间就能完成海量重复。',
      syntax: `1 GHz = 10 亿次/秒
现代 CPU 约 3-5 GHz`,
      example: {
        title: 'CPU 速度',
        code: `# 3 GHz CPU：
# 每秒可以执行 30 亿次操作
# for i in range(1000000) 这样的循环
# 在现代 CPU 上瞬间完成`,
        output: '',
        explanation: 'CPU 速度极快，我们写的 for 循环在它看来只是很小的工作。'
      },
      practice: [
        {
          question: 'GHz 越高意味着什么？',
          answer: 'CPU 速度越快'
        },
        {
          question: '现代 CPU 有多快？',
          answer: '每秒可以执行数十亿次操作'
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
    mathConcept: '循环次数',
    question: `在横线处填写什么，可以让无人机连续向右移动三格？\n\n\`\`\`python\n____\n    print('r')\n\`\`\``,
    options: [
      'for i in range(3)',
      'for i in range(4)',
      'for i in range(2)',
      'for i in range(1)'
    ],
    answer: 0,
    explanation: '连续向右移动三格，意味着要重复执行 print("r") 三次，所以用 for i in range(3)。',
    hint: '需要重复执行3次'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '循环理解',
    question: `下方代码，print('d') 会执行几次？\n\n\`\`\`python\nfor i in range(3):\n    print('r')\nprint('d')\n\`\`\``,
    options: [
      '0次',
      '1次',
      '2次',
      '3次'
    ],
    answer: 1,
    explanation: 'print("d") 没有缩进，不在 for 循环内，所以只在循环结束后执行1次。答案是 B。',
    hint: '没有缩进的代码不在循环内'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: 'range理解',
    question: `for i in range(4) 会循环几次？`,
    options: [
      '3次',
      '4次',
      '5次',
      '无数次'
    ],
    answer: 1,
    explanation: 'range(4) 产生 0, 1, 2, 3 四个数字，所以循环执行4次。',
    hint: 'range(n) 循环n次'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '缩进作用',
    question: `以下代码的输出是什么？\n\n\`\`\`python\nfor i in range(2):\n    print('a')\nprint('b')\n\`\`\``,
    options: [
      'aa',
      'aab',
      'ab',
      'b'
    ],
    answer: 1,
    explanation: 'print("a") 缩进在循环内，执行2次；print("b") 无缩进，执行1次。所以输出 a a b。',
    hint: '循环内执行2次，循环外执行1次'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合分析',
    question: `以下代码的输出是什么？\n\n\`\`\`python\nfor i in range(3):\n    print('r')\nprint('d')\nfor i in range(2):\n    print('u')\n\`\`\``,
    options: [
      'rrddduu',
      'rrdduu',
      'rrrdd',
      'rrrduu'
    ],
    answer: 3,
    explanation: '第一个for循环3次"r"，然后 print("d") 输出"d"，第二个for循环2次"u"。最终输出 rrrduu。',
    hint: '按顺序分析每个部分'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '循环设计',
    question: `要让无人机执行：右移3格 → 下移1格 → 右移4格，代码正确的是？`,
    options: [
      'print("r")*3; print("d"); print("r")*4',
      'for i in range(3): print("r"); print("d"); for i in range(4): print("r")',
      'for i in range(3): print("r")\nprint("d")\nfor i in range(4): print("r")',
      'for i in range(3,4,1): print("r")'
    ],
    answer: 2,
    explanation: '右移3格用 for i in range(3)，下移1格用 print("d")，右移4格用 for i in range(4)。',
    hint: '循环用于重复动作，单次print用于单个动作'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L3-1',
  title: 'for循环',
  subtitle: '用循环简化重复代码',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解 for 循环的作用',
    '掌握 for i in range() 的格式',
    '能区分循环内外的代码',
    '能用 for 循环控制无人机移动'
  ],
  prerequisites: [
    '理解 if 语句',
    '知道什么是缩进'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['for', 'in', 'range', 'loop'],
  medium: ['repeat', 'execute', 'iterate', 'colon'],
  hard: ['iteration', 'indent', 'nested', 'sequence']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'for i in range(3):',
    "print('r')",
    'for i in range(5):',
    "print('*')"
  ],
  medium: [
    'for i in range(3):\n    print("r")',
    'for i in range(4):\n    print("d")',
    'for i in range(2):\n    print("u")\nprint("d")',
    'for i in range(5):\n    print("*")'
  ],
  hard: [
    'for i in range(3):\n    print("r")\nprint("d")\nfor i in range(4):\n    print("r")',
    'for i in range(5):\n    print("u")\nfor i in range(3):\n    print("d")',
    'for i in range(2):\n    print("l")\nprint("u")\nfor i in range(3):\n    print("r")',
    'for i in range(1):\n    print("u")\nfor i in range(5):\n    print("r")\nfor i in range(1):\n    print("d")'
  ]
}

// 导出所有数据
export const L3_1_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L3_1_data