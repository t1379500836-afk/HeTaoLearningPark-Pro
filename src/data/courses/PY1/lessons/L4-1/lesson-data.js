/**
 * PY1 课程 L4-1: and 与 or
 *
 * 核心知识点:
 * 1. and - 并且，同时满足
 * 2. or - 或者，满足其一
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'weather',
    pronunciation: '[ˈweðə]',
    partOfSpeech: 'n.',
    meaning: '天气',
    level: 'easy',
    example: 'The weather is nice today.',
    exampleTranslation: '今天天气很好。',
    source: 'ocr'
  },
  {
    word: 'test',
    pronunciation: '[test]',
    partOfSpeech: 'n.',
    meaning: '测试；测验',
    level: 'medium',
    example: 'Pass the test.',
    exampleTranslation: '通过测试。',
    source: 'ocr'
  },
  {
    word: 'season',
    pronunciation: '[ˈsiːzən]',
    partOfSpeech: 'n.',
    meaning: '季节',
    level: 'easy',
    example: 'Four seasons in a year.',
    exampleTranslation: '一年有四季。',
    source: 'ocr'
  },
  {
    word: 'water',
    pronunciation: '[ˈwɔːtə]',
    partOfSpeech: 'n.',
    meaning: '水',
    level: 'easy',
    example: 'Drink more water.',
    exampleTranslation: '多喝水。',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'and',
    pronunciation: '[ænd]',
    partOfSpeech: 'conj.',
    meaning: '和；并且',
    level: 'easy',
    example: 'You and me.',
    exampleTranslation: '你和我。',
    source: 'extended'
  },
  {
    word: 'or',
    pronunciation: '[ɔː]',
    partOfSpeech: 'conj.',
    meaning: '或者；否则',
    level: 'easy',
    example: 'Coffee or tea?',
    exampleTranslation: '咖啡还是茶？',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: 'and - 并且',
    emoji: '➕',
    gradeLevel: '3-4',
    summary: '两个条件都要满足',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'and 就像"既要...又要..."，两个条件都要满足才行。比如"既是学生又是三好学生"，两个条件都要成立才行。',
      concept: '使用 and 连接两个条件，只有两个条件都成立时，整体才成立。',
      syntax: `条件A and 条件B
两边都成立 → 成立
有一边不成立 → 不成立`,
      example: {
        title: 'and 的作用',
        code: `age = 10
if age >= 6 and age <= 12:
    print('是小学生')`,
        output: '是小学生',
        explanation: 'age=10，10>=6 成立，10<=12 成立，两个条件都用 and 连接，所以整体成立。'
      },
      practice: [
        {
          question: '5 > 3 and 2 < 4 成立吗？',
          answer: '成立（两个都成立）'
        },
        {
          question: '5 > 3 and 5 > 10 成立吗？',
          answer: '不成立（5>10不成立）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'and 可以把两个比较组合在一起，比如判断是否在某个范围内。',
      concept: '用 and 可以判断是否同时满足多个条件，比如在某个数值范围内。',
      syntax: `n >= 下限 and n <= 上限
# 等价于
下限 <= n <= 上限`,
      example: {
        title: '判断范围',
        code: `score = 85
if score >= 60 and score <= 100:
    print('及格')`,
        output: '及格',
        explanation: 'score=85，60<=85<=100，两个条件都成立，所以打印"及格"。'
      },
      practice: [
        {
          question: 'a=5, a>3 and a<10 成立吗？',
          answer: '成立'
        },
        {
          question: '如何判断 n 是否在 1 到 100 之间？',
          answer: 'n >= 1 and n <= 100'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'and 的两边都必须是完整的条件，不能省略任何一边。',
      concept: 'and 连接的是完整的条件判断，每个条件都要能独立成立。',
      syntax: `正确：a > 5 and b > 3
错误：a, b > 5  # 这不是有效的条件`,
      example: {
        title: '完整条件',
        code: `a = 5
b = 7
if a == 5 and b == 7:
    print('两个都满足')`,
        output: '两个都满足',
        explanation: 'a==5 成立，b==7 成立，两个条件用 and 连接，整体成立。'
      },
      practice: [
        {
          question: 'a==5 and a>3 中两个条件都针对 a，可以吗？',
          answer: '可以，只要两边都完整'
        },
        {
          question: 'and 两边的条件需要都成立吗？',
          answer: '是的，必须都成立'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: 'or - 或者',
    emoji: '🔀',
    gradeLevel: '3-4',
    summary: '满足其中一个就行',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'or 就像"或者"，只要满足其中一个条件就行。比如"有水果或者有零食"，有一样就行。',
      concept: '使用 or 连接两个条件，只要有任意一个成立，整体就成立。',
      syntax: `条件A or 条件B
有任意一边成立 → 成立
两边都不成立 → 不成立`,
      example: {
        title: 'or 的作用',
        code: `fruit = '苹果'
if fruit == '苹果' or fruit == '香蕉':
    print('买到了水果')`,
        output: '买到了水果',
        explanation: "fruit='苹果'，第一个条件成立，所以整体成立。即使第二个条件不成立也没关系。"
      },
      practice: [
        {
          question: '5 > 3 or 2 > 4 成立吗？',
          answer: '成立（5>3成立）'
        },
        {
          question: '3 > 5 or 2 > 4 成立吗？',
          answer: '不成立（两个都不成立）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'or 可以用来简化多个 if 语句，或者表示"任选其一"的情况。',
      concept: 'or 表示"或者"的关系，满足任意一个条件即可。常用于简化多个 if 判断。',
      syntax: `# 多个 if 简化
if a == 1: print('A')
if a == 2: print('B')
# 用 or 简化
if a == 1 or a == 2: print('AB')`,
      example: {
        title: '简化判断',
        code: `day = '周六'
if day == '周六' or day == '周日':
    print('休息日')`,
        output: '休息日',
        explanation: "day='周六'，day=='周六' 成立，所以整体成立，打印'休息日'。"
      },
      practice: [
        {
          question: 'a=5, a==5 or a==10 成立吗？',
          answer: '成立（a==5成立）'
        },
        {
          question: '什么时候用 or 比多个 if 更方便？',
          answer: '当判断的是同一个变量的不同值时'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'and 和 or 可以组合使用，但要注意运算顺序：and 的优先级高于 or。',
      concept: 'and 和 or 混合时，用括号明确优先级：先算括号内，再算 and，最后算 or。',
      syntax: `# 运算顺序
(a and b) or c  # 先算 a and b，再 or c
a and (b or c)  # 先算 b or c，再 and a`,
      example: {
        title: '混合使用',
        code: `age = 15
if age >= 10 and age <= 20:
    print('青少年')`,
        output: '青少年',
        explanation: 'age=15，15>=10 成立，15<=20 成立，and 连接两个条件都成立，所以打印"青少年"。'
      },
      practice: [
        {
          question: 'a=5, b=3, a>3 or b>5 成立吗？',
          answer: '成立（a>3成立）'
        },
        {
          question: 'and 和 or 混合时谁先算？',
          answer: 'and 先于 or，但括号可以改变顺序'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: 'and 与 or 对比',
    emoji: '⚖️',
    gradeLevel: '3-4',
    summary: '理解两者的区别',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'and 就像"都要"，or 就像"任选一个"。and 更严格，两个都要；or 更宽容，有一个就行。',
      concept: 'and 和 or 的核心区别：and 要求所有条件都成立；or 只要求任意一个成立。',
      syntax: `and: 严格，必须同时成立
or: 宽容，有一个就行`,
      example: {
        title: '对比',
        code: `# and: 两个都要
print(True and True)   # True
print(True and False)  # False

# or: 有一个就行
print(True or False)   # True
print(False or False) # False`,
        output: 'True\nFalse\nTrue\nFalse',
        explanation: 'and 要求两边都是 True 才是 True；or 只要有一个是 True 就是 True。'
      },
      practice: [
        {
          question: 'and 和 or 哪个更严格？',
          answer: 'and'
        },
        {
          question: '1 and 1 等于？',
          answer: '1（两个都成立）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '用生活例子理解：and 是"既有...又有..."，or 是"或者...或者..."。',
      concept: '实际应用中根据需求选择 and 或 or：需要同时满足用 and，只需要满足其一用 or。',
      syntax: `# 需要同时满足 → and
# 只需要满足其一 → or`,
      example: {
        title: '实际应用',
        code: `# 判断能否进游乐园
age = 8
height = 120
if age >= 6 and height >= 120:
    print('可以玩')

# 判断是否是水果或零食
food = '苹果'
if food == '苹果' or food == '香蕉' or food == '葡萄':
    print('是水果')`,
        output: '可以玩\n是水果',
        explanation: '第一个用 and：年龄和身高都要达标。第二个用 or：只要是其中一种水果就行。'
      },
      practice: [
        {
          question: '判断年满18岁且身高超过160，应该用 and 还是 or？',
          answer: 'and'
        },
        {
          question: '判断是周一到周五或者节假日，应该用 and 还是 or？',
          answer: 'or'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '理解 and 和 or 在布尔代数中的位置，为后续学习逻辑运算打下基础。',
      concept: 'and 对应逻辑"与"，or 对应逻辑"或"，是计算机科学的基础概念。',
      syntax: `and = 逻辑乘法（都为1才为1）
or = 逻辑加法（有1就为1）`,
      example: {
        title: '逻辑运算',
        code: `# 真值表
# A and B
T and T = T
T and F = F
F and F = F

# A or B
T or F = T
F or F = F`,
        output: '',
        explanation: 'and 和 or 是基础逻辑运算，理解它们有助于理解计算机的工作原理。'
      },
      practice: [
        {
          question: '在 and 运算中，什么情况下结果是 True？',
          answer: '两边都是 True'
        },
        {
          question: '在 or 运算中，什么情况下结果是 False？',
          answer: '两边都是 False'
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
    mathConcept: 'and理解',
    question: `如果 a = 5, b = 7，下列哪个条件成立？`,
    options: [
      'a > b',
      'a == 5 and a > b',
      'b > a or b == 7',
      'a == b'
    ],
    answer: 2,
    explanation: 'A: a>b 不成立；B: a==5 成立但 a>b 不成立，整体不成立；C: b>a 成立，所以整体成立；D: a==b 不成立。答案是 C。',
    hint: 'or 只需要一个条件成立'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: 'or理解',
    question: `5 > 3 or 10 < 5 的结果是？`,
    options: [
      'True',
      'False',
      '报错',
      '不确定'
    ],
    answer: 0,
    explanation: '5 > 3 成立（True），10 < 5 不成立（False）。or 只需要一个成立，所以整体是 True。',
    hint: 'or 有任意一个成立就行'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '综合判断',
    question: `判断：6 > 3 and 8 < 5 是否成立？`,
    options: [
      '成立',
      '不成立',
      '取决于变量值',
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
    mathConcept: '范围判断',
    question: `判断 age=15, score=85，以下代码会打印什么？\n\n\`\`\`python\nage = 15\nscore = 85\nif score >= 60 and score <= 100:\n    print('及格')\nelse:\n    print('不及格')\n\`\`\``,
    options: [
      '及格',
      '不及格',
      '什么都不打印',
      '报错'
    ],
    answer: 0,
    explanation: 'score=85，85>=60 成立，85<=100 成立，两个条件用 and 连接都成立，所以打印"及格"。',
    hint: 'and 两边都成立'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '混合逻辑',
    question: `以下代码的运行结果是？\n\n\`\`\`python\na = 5\nb = 3\nc = 7\nif a > b and c > b:\n    print('1')\nif a > b or c > b:\n    print('2')\n\`\`\``,
    options: [
      '1',
      '2',
      '1 2',
      '什么都不打印'
    ],
    answer: 2,
    explanation: 'a>b 成立（5>3），c>b 成立（7>3），第一个 if 成立打印"1"。a>b 成立，第二个 if 也成立打印"2"。所以输出"1 2"。',
    hint: '两个 if 都会执行'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '优先级理解',
    question: `以下代码的运行结果是？\n\n\`\`\`python\na = 5\nif a == 5 or a > 10 and a < 3:\n    print('yes')\nelse:\n    print('no')\n\`\`\``,
    options: [
      'yes',
      'no',
      'yes no',
      '什么都不打印'
    ],
    answer: 0,
    explanation: 'and 优先级高于 or，所以先算 a>10 and a<3 = False and False = False。再算 a==5 or False = True or False = True。打印"yes"。',
    hint: 'and 先于 or 计算'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L4-1',
  title: 'and与or',
  subtitle: '学会组合多个条件',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解 and 的含义和用法',
    '理解 or 的含义和用法',
    '能用 and 和 or 组合多个条件',
    '理解两者的区别和应用场景'
  ],
  prerequisites: [
    '理解 if 语句',
    '知道比较运算符'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['and', 'or', 'weather', 'test'],
  medium: ['season', 'water', 'state', 'true'],
  hard: ['false', 'condition', 'logic', 'boolean']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'a > 3 and b > 5',
    'a == 5 or b == 5',
    'True and False',
    'True or False'
  ],
  medium: [
    'if a > 5 and a < 10:',
    'if score >= 60 and score <= 100:',
    'if day == "周六" or day == "周日":',
    'if age >= 18 and height >= 160:'
  ],
  hard: [
    'if a > b and c > b:\n    print("1")',
    'if a == 5 or b == 10:\n    print("yes")',
    'if (a > 5 and a < 10) or a == 20:',
    'result = x > 0 and y > 0 and z > 0'
  ]
}

// 导出所有数据
export const L4_1_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L4_1_data