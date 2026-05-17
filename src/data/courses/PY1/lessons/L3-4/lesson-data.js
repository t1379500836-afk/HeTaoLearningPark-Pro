/**
 * PY1 课程 L3-4: if-elif-else 分支
 *
 * 核心知识点:
 * 1. if-elif-else 语法格式
 * 2. if-elif-else 执行顺序
 * 3. 多个 elif 的使用
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'color',
    pronunciation: '[ˈkʌlə]',
    partOfSpeech: 'n.',
    meaning: '颜色',
    level: 'easy',
    example: 'What color is it?',
    exampleTranslation: '它是什么颜色？',
    source: 'ocr'
  },
  {
    word: 'if',
    pronunciation: '[ɪf]',
    partOfSpeech: 'conj.',
    meaning: '如果；假如',
    level: 'easy',
    example: 'If it rains, we stay home.',
    exampleTranslation: '如果下雨，我们就待在家里。',
    source: 'ocr'
  },
  {
    word: 'else',
    pronunciation: '[els]',
    partOfSpeech: 'adv.',
    meaning: '其他的；另外的',
    level: 'easy',
    example: 'Do you have anything else?',
    exampleTranslation: '你还有其他事吗？',
    source: 'ocr'
  },
  {
    word: 'input',
    pronunciation: '[ˈɪnpʊt]',
    partOfSpeech: 'v.',
    meaning: '输入',
    level: 'easy',
    example: 'Please input your answer.',
    exampleTranslation: '请输入你的答案。',
    source: 'ocr'
  },
  {
    word: 'print',
    pronunciation: '[prɪnt]',
    partOfSpeech: 'v.',
    meaning: '打印',
    level: 'easy',
    example: 'Print the document.',
    exampleTranslation: '打印文件。',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'branch',
    pronunciation: '[brɑːntʃ]',
    partOfSpeech: 'n.',
    meaning: '分支',
    level: 'medium',
    example: 'This program has multiple branches.',
    exampleTranslation: '这个程序有多个分支。',
    source: 'extended'
  },
  ]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: 'if-elif-else 语法格式',
    emoji: '⚖️',
    gradeLevel: '3-4',
    summary: '处理三种及以上的情况',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'if-elif-else 就像一个多选一的游戏：先看 if 满不满足，不满足就看 elif，满不满足，不满足就看下一个 elif，都不满足就看 else。',
      concept: 'if-elif-else 用于判断多种情况：if 判断第一种，elif 判断其他情况，else 处理剩下的。',
      syntax: `if 条件1:
    代码1
elif 条件2:
    代码2
else:
    代码3`,
      example: {
        title: '三种情况',
        code: `direction = input()
if direction == '左':
    print('向左走')
elif direction == '中':
    print('直走')
else:
    print('向右走')`,
        output: '（输入"中"）\n直走',
        explanation: 'direction="中"，第一个条件不成立，elif 条件成立，执行对应代码打印"直走"。'
      },
      practice: [
        {
          question: 'if-elif-else 中，至少会执行几个分支？',
          answer: '恰好一个'
        },
        {
          question: 'else 什么时候执行？',
          answer: '所有 if 和 elif 条件都不成立时'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'if elif else 是一个整体，左侧要对齐，都以冒号结尾。程序从上到下判断，找到第一个成立的就不再继续判断了。',
      concept: 'if-elif-else 是整体结构：左侧对齐，都以冒号结尾；按顺序判断，第一个成立的执行后就结束。',
      syntax: `if 条件1:    ← 左侧对齐，冒号结尾
    代码1
elif 条件2:  ← 左侧对齐，冒号结尾
    代码2
else:        ← 左侧对齐，冒号结尾
    代码3`,
      example: {
        title: '格式规则',
        code: `score = 85
if score >= 90:
    print('A')
elif score >= 80:
    print('B')
elif score >= 70:
    print('C')
else:
    print('D')`,
        output: 'B',
        explanation: 'score=85。90>85 不成立，80≤85 成立，执行 print("B")，然后结束整个判断。'
      },
      practice: [
        {
          question: 'if、elif、else 有什么关系？',
          answer: '是一个整体，缺一不可'
        },
        {
          question: '找到第一个成立的条件后会怎样？',
          answer: '执行对应代码，然后结束'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'elif 可以有多个，用于处理多种情况。但要注意顺序，因为程序会从上到下判断。',
      concept: '多个 elif 按顺序判断，第一个成立的执行。elif 之间是"否则如果"的关系。',
      syntax: `if 条件1:
    处理情况1
elif 条件2:
    处理情况2
elif 条件3:
    处理情况3
else:
    处理其他情况`,
      example: {
        title: '多个elif',
        code: `fruit = input()
if fruit == '苹果':
    print('苹果')
elif fruit == '香蕉':
    print('香蕉')
elif fruit == '橙子':
    print('橙子')
else:
    print('其他水果')`,
        output: '（输入"香蕉"）\n香蕉',
        explanation: 'fruit="香蕉"，第一个条件不成立，第二个条件成立，打印"香蕉"。'
      },
      practice: [
        {
          question: '可以有多个 elif？',
          answer: '可以，任意多个'
        },
        {
          question: 'if-elif-else 和多个 if 连用有什么区别？',
          answer: 'if-elif-else 只执行一个，多个 if 可能都执行'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: 'if-elif-else 执行顺序',
    emoji: '➡️',
    gradeLevel: '3-4',
    summary: '从上到下判断，找到成立的就停止',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '执行顺序就像排队买票：先看第一个人（if）满不满足，满足就买，不满足就看第二个人（elif），都不满足就看其他人（else）。',
      concept: '执行顺序：从上到下依次判断，找到第一个成立的执行，然后结束。',
      syntax: `① if 条件成立？ → 执行 if 代码 → 结束
② if 不成立，elif 条件成立？ → 执行 elif 代码 → 结束
③ 都不成立？ → 执行 else 代码 → 结束`,
      example: {
        title: '买票流程',
        code: `age = 15
if age >= 18:
    print('成人票')
elif age >= 6:
    print('儿童票')
else:
    print('免费')`,
        output: '儿童票',
        explanation: 'age=15。18>15 不成立，6≤15 成立，执行 print("儿童票")。'
      },
      practice: [
        {
          question: '第一个 if 成立时，会执行 elif 吗？',
          answer: '不会，直接结束'
        },
        {
          question: '所有 elif 都不成立时会执行什么？',
          answer: 'else'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '因为执行后就停止，所以顺序很重要。比如判断成绩，不能先判断>=60，要先判断>=90、>=80...从高到低。',
      concept: '条件判断的顺序很重要，应该从具体到宽泛，从高到低。',
      syntax: `正确顺序（从高到低）：
if score >= 90:  A
elif score >= 80:  B
elif score >= 70:  C
elif score >= 60:  D
else:  E

错误顺序（可能出错）：
if score >= 60:  ← 先判断这个，后面的elif都会变成elif score >= 80变成elif score >= 80 and score < 60`,
      example: {
        title: '成绩判断',
        code: `score = 92
if score >= 90:
    print('A')
elif score >= 80:
    print('B')
elif score >= 70:
    print('C')
else:
    print('D')`,
        output: 'A',
        explanation: 'score=92，92≥90 成立，打印"A"。虽然也满足后面条件，但因为已经执行就结束了。'
      },
      practice: [
        {
          question: '判断成绩的 if 顺序应该怎样？',
          answer: '从高到低（90、80、70、60）'
        },
        {
          question: '为什么顺序重要？',
          answer: '第一个成立就停止，不会再看后面的'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'else 是"兜底"的，如果把所有 elif 都排除了，就执行 else。else 可以省略，但建议保留以处理意外情况。',
      concept: 'else 是处理"其他所有情况"，如果没有 else 且都不满足，程序什么都不执行。',
      syntax: `if 条件1:
    处理情况1
elif 条件2:
    处理情况2
# else 可省略，但建议保留`,
      example: {
        title: '有else和无else',
        code: `# 有 else
score = 55
if score >= 60:
    print('合格')
else:
    print('不合格')

# 无 else
score = 55
if score >= 60:
    print('合格')
# 55 不满足条件，什么都不打印`,
        output: '不合格',
        explanation: '有 else 时，不满足条件会打印"不合格"。无 else 时，不满足条件时程序什么都不做。'
      },
      practice: [
        {
          question: 'else 的作用是什么？',
          answer: '处理所有不满足条件的情况'
        },
        {
          question: '没有 else 的话，所有条件都不满足会怎样？',
          answer: '什么都不执行'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: 'if-elif-else 应用',
    emoji: '🎮',
    gradeLevel: '3-4',
    summary: '根据不同情况执行不同操作',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '小核桃遇到不同的怪兽需要做出不同的反应：遇到火龙喷火，遇到冰怪融化，遇到石头就攻击。',
      concept: '根据不同情况执行不同操作，使用 if-elif-else 来区分。',
      syntax: `if monster == '火龙':
    喷火
elif monster == '冰怪':
    融化
elif monster == '石头':
    攻击`,
      example: {
        title: '怪兽对战',
        code: `monster = input()
if monster == '火龙':
    print('用水攻击')
elif monster == '冰怪':
    print('用火融化')
elif monster == '石头':
    print('用拳头攻击')
else:
    print('逃跑')`,
        output: '（输入"火龙"）\n用水攻击',
        explanation: 'monster="火龙"，第一个条件成立，输出"用水攻击"。'
      },
      practice: [
        {
          question: '遇到石头怪兽会输出什么？',
          answer: '用拳头攻击'
        },
        {
          question: '遇到不认识怪兽会输出什么？',
          answer: '逃跑'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '可以把多种技能组合在 if-elif-else 中，每个分支执行不同的代码块。',
      concept: '每个分支可以执行多行代码，只要在缩进范围内都属于这个分支。',
      syntax: `if 条件:
    代码1
    代码2
    代码3
elif 条件:
    代码4
    代码5`,
      example: {
        title: '完整技能',
        code: `role = '法师'
if role == '法师':
    print('施放魔法')
    print('消耗蓝量')
elif role == '战士':
    print('近身攻击')
    print('消耗体力')
else:
    print('使用道具')`,
        output: '施放魔法\n消耗蓝量',
        explanation: 'role="法师"，执行法师分支的两行代码。'
      },
      practice: [
        {
          question: 'if 分支可以写多行代码吗？',
          answer: '可以，都执行'
        },
        {
          question: 'elif 分支里的代码什么时候执行？',
          answer: '对应 elif 条件成立时'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '碳14测年法是一种考古方法，利用碳14半衰5730年的特性来测定化石年龄。',
      concept: '科学应用：根据碳14减少的程度推算生物死亡的年代。',
      syntax: `碳14测年法：
生物存活时：摄入碳14
生物死亡后：碳14按固定速率衰减
测量剩余碳14：计算死亡时间`,
      example: {
        title: '考古年龄计算',
        code: `# 碳14测年法原理
# 每5730年碳14减半
# 测量剩余碳14含量
# 计算化石年龄
remaining = 0.25  # 25% 碳14剩余
times = 0
while remaining < 1:
    remaining = remaining * 2
    times = times + 1
age = times * 5730
print(age)  # 约11460年`,
        output: '约11460年',
        explanation: '碳14每5730年减半，25%剩余意味着经过了2个半衰期：5730×2=11460年。'
      },
      practice: [
        {
          question: '碳14测年法的原理是什么？',
          answer: '碳14每5730年减半，通过剩余量计算年龄'
        },
        {
          question: '碳14半衰期是多少年？',
          answer: '5730年'
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
    mathConcept: '格式判断',
    question: '下列代码中，格式正确的是？',
    options: [
      'if a > 5: print(5) elif a > 3: print(3)',
      'if a > 5:\n    print(5)\nelif a > 3:\n    print(3)',
      'if a > 5:\n    print(5)\n    elif a > 3:\n    print(3)',
      'if a > 5\n    print(5)\nelif a > 3\n    print(3)'
    ],
    answer: 1,
    explanation: '正确的格式：if/elif/else 都需要冒号结尾，elif 要和 if 对齐。选项 B 正确。',
    hint: '注意冒号和对齐'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '执行顺序',
    question: `以下代码的运行结果是？\n\n\`\`\`python\nscore = 75\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelif score >= 70:\n    print('C')\nelse:\n    print('D')\n\`\`\``,
    options: [
      'A',
      'B',
      'C',
      'D'
    ],
    answer: 2,
    explanation: 'score=75。90>75 不成立，80>75 不成立，70≤75 成立，执行 print("C")。答案是 C。',
    hint: '按顺序判断，找到第一个成立的'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '分支理解',
    question: `以下代码的运行结果是？\n\n\`\`\`python\nfruit = '苹果'\nif fruit == '香蕉':\n    print('1')\nelif fruit == '苹果':\n    print('2')\nelif fruit == '橙子':\n    print('3')\nelse:\n    print('4')\n\`\`\``,
    options: [
      '1',
      '2',
      '3',
      '4'
    ],
    answer: 1,
    explanation: 'fruit="苹果"。第一个条件不成立，第二个条件成立，打印"2"。答案是 B。',
    hint: '香蕉不匹配，苹果匹配'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '条件覆盖',
    question: '如果有 5 种情况需要判断，至少需要几个 elif？',
    options: [
      '3',
      '4',
      '5',
      '6'
    ],
    answer: 1,
    explanation: 'if 判断第一种情况，elif 判断其他 4 种情况，else 处理最后的"其他"。5 种情况需要 1 个 if + 4 个 elif + 1 个 else。',
    hint: '5种情况：1个if + 4个elif + 1个else'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合应用',
    question: `执行以下代码，输入"草莓"，会打印什么？\n\n\`\`\`python\nfruit = input()\nif fruit == '苹果':\n    print('1')\nelif fruit == '香蕉':\n    print('2')\nelif fruit == '草莓':\n    print('3')\nelse:\n    print('4')\n\`\`\``,
    options: [
      '1',
      '2',
      '3',
      '4'
    ],
    answer: 2,
    explanation: 'fruit="草莓"。前两个条件不成立，第三个条件成立，打印"3"。',
    hint: '草莓匹配第三个elif'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '顺序理解',
    question: `如果把条件判断顺序改成以下这样，输入90分，会打印什么？\n\n\`\`\`python\nscore = 90\nif score >= 60:\n    print('及格')\nelif score >= 70:\n    print('良好')\nelif score >= 80:\n    print('优秀')\nelif score >= 90:\n    print('卓越')\nelse:\n    print('不及格')\n\`\`\``,
    options: [
      '及格',
      '良好',
      '优秀',
      '卓越'
    ],
    answer: 0,
    explanation: 'score=90，90≥60 第一个条件就成立了，所以直接打印"及格"。这就是顺序错误导致的问题！',
    hint: '第一个条件 >=60 就成立了，后面的elif不会判断'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L3-4',
  title: 'if-elif-else分支',
  subtitle: '学会多种情况的判断',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握 if-elif-else 的语法格式',
    '理解 if-elif-else 的执行顺序',
    '能用多个 elif 处理多种情况',
    '能正确安排条件判断的顺序'
  ],
  prerequisites: [
    '理解 if 语句',
    '理解 elif 和 else 的作用',
    '知道什么是缩进'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['color', 'if', 'else', 'input', 'print'],
  medium: ['branch', 'condition', 'equal', 'compare'],
  hard: ['elif', 'sequence', 'evaluate', 'alternative']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    "if score >= 90:\n    print('A')",
    "elif score >= 80:\n    print('B')",
    "else:\n    print('C')",
    "if fruit == '苹果':\n    print('1')"
  ],
  medium: [
    "if score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelif score >= 70:\n    print('C')\nelse:\n    print('D')",
    "if color == '红':\n    print('1')\nelif color == '蓝':\n    print('2')\nelif color == '绿':\n    print('3')\nelse:\n    print('0')",
    "if role == '法师':\n    print('魔法')\nelif role == '战士':\n    print('攻击')",
    "n = int(input())\nif n > 0:\n    print('正数')\nelif n < 0:\n    print('负数')\nelse:\n    print('零')"
  ],
  hard: [
    "score = int(input())\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelif score >= 70:\n    print('C')\nelif score >= 60:\n    print('D')\nelse:\n    print('不及格')",
    "fruit = input()\nif fruit == '苹果':\n    print('1')\nelif fruit == '香蕉':\n    print('2')\nelif fruit == '草莓':\n    print('3')\nelif fruit == '橙子':\n    print('4')\nelse:\n    print('0')",
    "level = int(input())\nif level >= 100:\n    print('满级')\nelif level >= 90:\n    print('高阶')\nelif level >= 60:\n    print('中阶')\nelse:\n    print('初阶')"
  ]
}

// 导出所有数据
export const L3_4_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L3_4_data