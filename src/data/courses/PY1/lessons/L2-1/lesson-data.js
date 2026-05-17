/**
 * PY1 课程 L2-1: if-else 语句
 *
 * 核心知识点:
 * 1. if-else 语句格式
 * 2. if-else 执行逻辑
 * 3. if-else 语句应用
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'else',
    pronunciation: '[els]',
    partOfSpeech: 'adv.',
    meaning: '其他的；不同的',
    level: 'easy',
    example: 'Do you have anything else?',
    exampleTranslation: '你还有其他东西吗？',
    source: 'ocr'
  },
  {
    word: 'hit',
    pronunciation: '[hɪt]',
    partOfSpeech: 'v.',
    meaning: '打；撞击',
    level: 'medium',
    example: 'Hit the ball hard.',
    exampleTranslation: '用力击球。',
    source: 'ocr'
  },
  {
    word: 'link',
    pronunciation: '[lɪŋk]',
    partOfSpeech: 'n.',
    meaning: '联系；纽带',
    level: 'medium',
    example: 'The link between two events is clear.',
    exampleTranslation: '两个事件之间的联系很清楚。',
    source: 'ocr'
  },
  {
    word: 'replace',
    pronunciation: '[rɪˈpleɪs]',
    partOfSpeech: 'v.',
    meaning: '替换；更新',
    level: 'hard',
    example: 'Replace the old battery with a new one.',
    exampleTranslation: '用新电池替换旧电池。',
    source: 'ocr'
  },
  {
    word: 'password',
    pronunciation: '[ˈpæswɜːd]',
    partOfSpeech: 'n.',
    meaning: '口令；密码',
    level: 'medium',
    example: 'Please enter your password.',
    exampleTranslation: '请输入您的密码。',
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
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: 'if-else 语句格式',
    emoji: '⚖️',
    gradeLevel: '1-2',
    summary: '条件成立执行if，否则执行else',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'if-else 就像一个双叉路口，if 负责检查条件，else 负责处理剩下的情况。当条件成立时走 if 分支，条件不成立时走 else 分支。',
      concept: 'if-else 语句：条件成立时执行 if 的下级代码，否则执行 else 的下级代码。',
      syntax: `if 条件:
    下级代码
else:
    下级代码`,
      example: {
        title: '如果...否则...',
        code: `a = 10
b = 5
if a > b:
    print('a')
else:
    print('b')`,
        output: 'a',
        explanation: 'a=10, b=5，条件 a > b 成立，执行 if 的下级代码 print("a")。'
      },
      practice: [
        {
          question: 'if-else 语句中，else 什么时候执行？',
          answer: 'if 条件不成立时'
        },
        {
          question: 'if 和 else 的下级代码有什么区别？',
          answer: '都会缩进，执行取决于条件'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'if 和 else 是同级代码，都要对齐，else 要写在和 if 同样的位置上。',
      concept: 'if-else 是一个整体，if 和 else 左侧对齐，都以冒号结尾。',
      syntax: `if 条件:
    代码块1
else:
    代码块2`,
      example: {
        title: '完整的 if-else',
        code: `height = 120
if height >= 120:
    print('可以玩')
else:
    print('不能玩')`,
        output: '可以玩',
        explanation: 'height=120，120>=120 成立，执行 if 分支打印"可以玩"。'
      },
      practice: [
        {
          question: 'else 要写在哪里？',
          answer: '与 if 同级的位置'
        },
        {
          question: 'if-else 语句以什么结尾？',
          answer: '都以冒号结尾'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'if-else 可以用于根据不同情况做出不同反应，比如根据身高决定能不能玩项目。',
      concept: 'if-else 让程序可以根据条件选择不同的执行路径，实现智能决策。',
      syntax: `if 条件A:
    执行A
else:
    执行B`,
      example: {
        title: '根据情况选择',
        code: `score = 85
if score >= 60:
    print('合格')
else:
    print('不合格')`,
        output: '合格',
        explanation: 'score=85，85>=60 成立，打印"合格"。如果 score=50，则会打印"不合格"。'
      },
      practice: [
        {
          question: 'if 条件和 else 条件是什么关系？',
          answer: '互补的，if 不成立时 else 就成立'
        },
        {
          question: 'if-else 能实现什么功能？',
          answer: '根据条件的真假选择不同的代码路径'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: 'if-else 执行逻辑',
    emoji: '🔄',
    gradeLevel: '3-4',
    summary: '从上到下判断，成立执行对应代码',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '程序执行 if-else 时，就像走路一样，先检查 if 的条件，如果成立就执行 if 的代码然后结束，否则执行 else 的代码。',
      concept: '执行规则：①从上到下逐行执行 ②if 条件成立执行 if 下级代码 ③条件不成立执行 else 下级代码',
      syntax: `执行顺序：
if成立 → 执行if代码 → 结束
if不成立 → 执行else代码 → 结束`,
      example: {
        title: '执行顺序演示',
        code: `a = 3
b = 7
if a > b:
    print('A')
else:
    print('B')`,
        output: 'B',
        explanation: 'a=3, b=7，a>b 不成立（3不大于7），所以跳过 if 执行 else 的代码，打印"B"。'
      },
      practice: [
        {
          question: 'if 条件成立时，else 的代码会执行吗？',
          answer: '不会'
        },
        {
          question: '执行完 if 或 else 后，程序会怎样？',
          answer: '继续执行后面的代码'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '理解执行顺序很重要：只会执行其中一个分支，不会两个都执行。',
      concept: 'if-else 是二选一，条件要么成立要么不成立，只会进入其中一个分支。',
      syntax: `if True:  → 执行if
else:     → 执行else（不会同时执行）`,
      example: {
        title: '二选一',
        code: `n = 15
if n > 10:
    print('大于10')
else:
    print('小于等于10')
print('结束')`,
        output: '大于10\n结束',
        explanation: 'n=15，n>10 成立，执行 if 分支打印"大于10"，然后继续执行打印"结束"。'
      },
      practice: [
        {
          question: 'if 和 else 会同时执行吗？',
          answer: '不会，只会执行其中一个'
        },
        {
          question: 'if-else 执行完后，程序会停止吗？',
          answer: '不会，会继续执行后面的代码'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'if-else 和多个 if 连用的区别：if-else 是二选一，多个 if 是每个都会判断。',
      concept: 'if-else 确保恰好有一个分支执行；多个 if 连用可能导致多个条件都成立。',
      syntax: `if-else: 互斥，只执行一个
if + if: 独立，可能都执行`,
      example: {
        title: '对比 if 和 if-else',
        code: `# 多个 if（可能都执行）
n = 15
if n > 10:
    print('大于10')
if n < 20:
    print('小于20')

# if-else（恰好一个）
n = 15
if n > 10:
    print('大于10')
else:
    print('其他')`,
        output: '大于10\n小于20\n大于10',
        explanation: '多个 if 时两个条件都成立所以都执行；if-else 只有一个执行。'
      },
      practice: [
        {
          question: '多个 if 连用和 if-else 有什么区别？',
          answer: 'if-else 互斥，多个 if 独立'
        },
        {
          question: '什么时候适合用 if-else？',
          answer: '只有两种互斥情况时'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '密码组合',
    emoji: '🔐',
    gradeLevel: '3-4',
    summary: '理解密码的组成和安全原则',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '密码就像一把钥匙，只有知道正确密码的人才能打开。密码可以由字母、数字、符号组成。',
      concept: '密码是由字母、数字、符号任意组合形成的，用于保护信息安全。',
      syntax: `密码组合示例：
字母：abc, XYZ
数字：123, 456
符号：@#$%`,
      example: {
        title: '简单密码',
        code: `password = 'abc123'
if password == 'abc123':
    print('正确')
else:
    print('错误')`,
        output: '正确',
        explanation: '输入的密码和预设密码相等，条件成立，打印"正确"。'
      },
      practice: [
        {
          question: '密码有什么作用？',
          answer: '保护信息安全'
        },
        {
          question: '密码只能由什么组成？',
          answer: '字母、数字、符号'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '密码越长，组合的可能性越多，就越安全。但太复杂的密码可能自己也记不住。',
      concept: '密码安全原则：长度越长越安全，但也要方便记忆。',
      syntax: `密码安全性：
4位 = 10^4 种可能
6位 = 10^6 种可能
8位 = 10^8 种可能`,
      example: {
        title: '密码长度与安全',
        code: `password = '1234'
if len(password) >= 6:
    print('安全')
else:
    print('太简单')`,
        output: '太简单',
        explanation: 'password="1234" 只有4位，长度小于6，判断为不安全。'
      },
      practice: [
        {
          question: '密码是不是越长越好？',
          answer: '越长越安全，但也要能记住'
        },
        {
          question: '什么样的密码比较安全？',
          answer: '长度足够，包含多种字符'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '设置密码时要平衡安全性和易记性，可以用熟悉的歌词或诗词来帮助记忆。',
      concept: '好的密码策略：既安全又方便记忆，可以用诗词、歌词等有规律的内容。',
      syntax: `易记密码策略：
诗词密码：锄禾日当午...
歌词密码：我爱北京天安门`,
      example: {
        title: '设置好记的密码',
        code: `password = 'chmsrd'
if password == 'chmsrd':
    print('登录成功')
else:
    print('密码错误')`,
        output: '登录成功',
        explanation: '密码"chmsrd"是"锄禾日当午"首字母，简单好记又安全。'
      },
      practice: [
        {
          question: '太复杂的密码有什么问题？',
          answer: '可能自己也记不住'
        },
        {
          question: '可以用什么方法设置易记又安全的密码？',
          answer: '使用诗词、歌词等有规律的内容'
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
    question: `运行这段代码，程序会在输出区打印出什么？\n\n\`\`\`python\na = 10
b = 5
if a > b:
    print('a')
else:
    print('b')
\`\`\``,
    options: [
      'a',
      'b',
      'a b',
      '没有输出'
    ],
    answer: 0,
    explanation: 'a=10, b=5，条件 a>b 成立（10>5），执行 if 的下级代码 print("a")。C 是易错项，程序打印的是字符串"a"，而不是变量 a。',
    hint: '条件 a>b 是否成立？'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '二选一',
    question: `如果 n=50，执行以下代码会打印什么？\n\n\`\`\`python\nif n > 5:
    print('大于5')
else:
    print('其他')
\`\`\``,
    options: [
      '大于5',
      '其他',
      '大于5 其他',
      '没有输出'
    ],
    answer: 0,
    explanation: 'n=50，50>5 成立，执行 if 分支打印"大于5"。',
    hint: '50 是否大于 5？'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '执行顺序',
    question: `关于 if-else 语句的执行顺序，下列说法正确的是？`,
    options: [
      'if 和 else 都会执行',
      '只会执行其中一个',
      '先执行 if 再执行 else',
      '先执行 else 再执行 if'
    ],
    answer: 1,
    explanation: 'if-else 是二选一的结构，条件成立时执行 if 分支，条件不成立时执行 else 分支，恰好只有一个会执行。',
    hint: 'if-else 是互斥的'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '格式规则',
    question: `下列关于 if-else 格式的说法，正确的是？`,
    options: [
      'else 要写在 if 的下级',
      'if 和 else 要左侧对齐',
      'if 后面不需要冒号',
      'else 的下级代码不需要缩进'
    ],
    answer: 1,
    explanation: 'if-else 是一个整体，if 和 else 左侧要对齐，都以冒号结尾，下级代码都要缩进。',
    hint: 'if 和 else 是什么关系？'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合应用',
    question: `运行以下代码，输入 120，输出是什么？\n\n\`\`\`python\nheight = int(input())
if height >= 120:
    print('可以玩')
else:
    print('不能玩')
\`\`\``,
    options: [
      '可以玩',
      '不能玩',
      '120',
      '没有输出'
    ],
    answer: 0,
    explanation: 'int(input()) 获取数字 120，120>=120 成立，执行 if 分支打印"可以玩"。',
    hint: '120 是否大于等于 120？'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '密码判断',
    question: `以下代码如果 password='abc' 会打印什么？\n\n\`\`\`python\npassword = 'abc'
if password == '123':
    print('正确')
else:
    print('错误')
\`\`\``,
    options: [
      '正确',
      '错误',
      'abc',
      '没有输出'
    ],
    answer: 1,
    explanation: 'password="abc"，判断 "abc"=="123"，条件不成立，执行 else 分支打印"错误"。',
    hint: '"abc" 等于 "123" 吗？'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L2-1',
  title: 'if-else判断',
  subtitle: '学会两种情况的判断',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握 if-else 语句的格式',
    '理解 if-else 的执行逻辑',
    '能用 if-else 解决实际问题',
    '了解密码组合的概念'
  ],
  prerequisites: [
    '理解 if 语句的基础',
    '知道什么是条件'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['else', 'hit', 'link', 'run'],
  medium: ['password', 'condition', 'replace', 'check'],
  hard: ['execute', 'statement', 'argument', 'branch']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    "if a > b:",
    "else:",
    "print('a')",
    "print('b')"
  ],
  medium: [
    "if height >= 120:\n    print('可以')",
    "else:\n    print('不可以')",
    "if password == '123':\n    print('正确')",
    "else:\n    print('错误')"
  ],
  hard: [
    "n = int(input())\nif n > 10:\n    print('大于10')\nelse:\n    print('其他')",
    "score = 85\nif score >= 60:\n    print('合格')\nelse:\n    print('不合格')",
    "if a == b:\n    print('相等')\nelse:\n    print('不相等')",
    "height = 120\nif height >= 120:\n    print('通过')\nelse:\n    print('不通过')"
  ]
}

// 导出所有数据
export const L2_1_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L2_1_data