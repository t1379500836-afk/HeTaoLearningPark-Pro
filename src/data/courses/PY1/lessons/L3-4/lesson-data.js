/**
 * PY1 课程 L3-4: 组合条件
 *
 * 核心知识点:
 * 1. and - 两个条件同时满足
 * 2. or - 至少一个条件满足
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'and',
    pronunciation: '[ænd]',
    partOfSpeech: 'conj.',
    meaning: '和；与；而且',
    level: 'easy',
    example: 'You and I are friends.',
    exampleTranslation: '你和我是朋友。',
    note: 'and表示"并且"'
  },
  {
    word: 'or',
    pronunciation: '[ɔː(r)]',
    partOfSpeech: 'conj.',
    meaning: '或者；或',
    level: 'easy',
    example: 'Yes or No?',
    exampleTranslation: '是或否？',
    note: 'or表示"或者"'
  },
  {
    word: 'weather',
    pronunciation: "['weðə(r)]",
    partOfSpeech: 'n.',
    meaning: '天气；气象',
    level: 'medium',
    example: 'The weather is nice today.',
    exampleTranslation: '今天天气很好。',
    note: ''
  },
  {
    word: 'age',
    pronunciation: '[eɪdʒ]',
    partOfSpeech: 'n./v.',
    meaning: '年龄；时代；变老；老化',
    level: 'medium',
    example: 'What is your age?',
    exampleTranslation: '你几岁？',
    note: ''
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: 'and - 并且',
    emoji: '🔗',
    gradeLevel: '1-2',
    summary: '两个条件同时满足才成立',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有两扇门，必须两扇门都打开才能通过！这就是and的作用，两个条件都要满足！',
      concept: 'and表示"并且"，用来连接两个条件。只有两个条件都成立时，整个条件才成立。有任何一个不成立，整个就不成立。',
      syntax: '条件1 and 条件2',
      example: {
        title: 'and的使用',
        code: "a = 5\nb = 3\nif a > 3 and b > 0:\n    print('Yes')",
        output: 'Yes',
        explanation: 'a>3成立，b>0也成立，两个都满足，所以打印"Yes"。'
      },
      practice: [
        {
          question: 'and需要几个条件都满足？',
          answer: '两个条件都要满足'
        },
        {
          question: 'a=5, b=2时，a>3 and b>3成立吗？',
          answer: '不成立，因为b>3不满足'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'and升级！就像两个守卫，只有两个都说"可以"你才能通过。这比单独一个守卫更严格！',
      concept: 'and连接的两个条件必须同时成立。如果第一个条件不成立，第二个条件根本不会被检查（短路效应）。常见应用：检查范围（x>=0 and x<=10）、检查多个状态等。',
      syntax: '# 范围检查\nif x >= 0 and x <= 10:\n    # x在0到10之间\n\n# 多条件检查\nif 条件1 and 条件2:',
      example: {
        title: '范围检查',
        code: "age = 12\nif age >= 6 and age <= 18:\n    print('学生')",
        output: '学生',
        explanation: 'age=12同时满足>=6和<=18，所以在6到18岁范围内，打印"学生"。'
      },
      practice: [
        {
          question: 'x=5时，x>0 and x<10成立吗？',
          answer: '成立，5同时满足>0和<10'
        },
        {
          question: '如果x=15，x>0 and x<10成立吗？',
          answer: '不成立，虽然>0，但不满足<10'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'and大师模式！你可以连接多个条件：条件1 and 条件2 and 条件3...所有条件都要满足！这在需要严格检查时非常有用！',
      concept: 'and可以连接多个条件，所有条件必须同时成立。应用场景：①范围检查（0 <= x <= 100）②多状态验证（已登录 and 有权限）③组合条件判断。注意and的优先级高于or，必要时用括号。',
      syntax: '# 多个and\nif 条件1 and 条件2 and 条件3:\n    # 三个都要满足\n\n# 与or混合使用\nif (a > 0 and b > 0) or c > 0:',
      example: {
        title: '多条件and',
        code: "x = 5\ny = 10\nz = 15\nif x > 0 and y > 0 and z > 0:\n    print('All positive')",
        output: 'All positive',
        explanation: 'x、y、z都大于0，三个条件都满足，所以打印"All positive"。'
      },
      practice: [
        {
          question: 'and和or哪个优先级更高？',
          answer: 'and的优先级高于or'
        },
        {
          question: '如何表示0 <= x <= 10？',
          answer: 'x >= 0 and x <= 10'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: 'or - 或者',
    emoji: '🔀',
    gradeLevel: '1-2',
    summary: '至少一个条件满足就成立',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有两条路可以走，只要有一条路通了就能通过！这就是or的作用，有一个满足就行！',
      concept: 'or表示"或者"，用来连接两个条件。只要任意一个条件成立，整个条件就成立。只有两个都不成立时，整体才不成立。',
      syntax: '条件1 or 条件2',
      example: {
        title: 'or的使用',
        code: "a = 1\nb = 10\nif a > 5 or b > 5:\n    print('Yes')",
        output: 'Yes',
        explanation: 'a>5不成立，但b>5成立，有一个满足，所以打印"Yes"。'
      },
      practice: [
        {
          question: 'or需要几个条件满足？',
          answer: '至少一个满足就行'
        },
        {
          question: 'a=1, b=2时，a>5 or b>5成立吗？',
          answer: '不成立，两个都不满足'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'or升级！就像你有两个选项，选哪个都行！比and更宽松，只要有一个满足就能通过！',
      concept: 'or连接的两个条件，任意一个成立即可。如果第一个条件成立，第二个条件不会被检查（短路效应）。常见应用：提供多种选择方式、检查备选方案、设置默认值等。',
      syntax: '# 多选一\nif 选项1 or 选项2:\n    # 至少一个满足\n\n# 备选方案\nif 方式1 or 方式2 or 方式3:',
      example: {
        title: '多选项',
        code: "day = 'Sunday'\nif day == 'Saturday' or day == 'Sunday':\n    print('休息')",
        output: '休息',
        explanation: 'day是"Sunday"，不等于"Saturday"但等于"Sunday"，满足or条件，打印"休息"。'
      },
      practice: [
        {
          question: 'x=5时，x<0 or x>10成立吗？',
          answer: '不成立，两个都不满足'
        },
        {
          question: 'x=15时，x<0 or x>10成立吗？',
          answer: '成立，x>10满足'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'or大师模式！你可以连接多个条件：条件1 or 条件2 or 条件3...只要有一个满足就行！这在提供多种可能性时非常有用！',
      concept: 'or可以连接多个条件，任意一个成立即可。应用场景：①多种选择（A or B or C）②备选方案③容错处理。注意and和or的优先级：and高于or，复杂条件用括号明确优先级。',
      syntax: '# 多个or\nif 条件1 or 条件2 or 条件3:\n    # 任意一个满足\n\n# 与and混合\nif (a and b) or (c and d):',
      example: {
        title: '多条件or',
        code: "role = 'guest'\nif role == 'admin' or role == 'moderator' or role == 'guest':\n    print('Welcome')",
        output: 'Welcome',
        explanation: 'role是"guest"，不等于"admin"和"moderator"，但等于"guest"，满足or条件，打印"Welcome"。'
      },
      practice: [
        {
          question: '如何表示x是正数或负数（非零）？',
          answer: 'x > 0 or x < 0'
        },
        {
          question: 'and和or有什么区别？',
          answer: 'and需要全部满足，or只需要一个满足'
        }
      ]
    }
  }
]

// 习题数据（根据源文件知识点创作6道拓展题）
export const exercises = [
  // 🟢 基础题（1-2年级）
  {
    id: 'ex-1',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: 'and的基本使用',
    question: '执行下面的代码，会输出什么？' + '\n\n' +
              'a = 5' + '\n' +
              'b = 3' + '\n' +
              'if a > 3 and b > 0:' + '\n' +
              '    print(1)' + '\n' +
              'else:' + '\n' +
              '    print(2)' + '\n\n' +
              'A. 1  B. 2  C. 程序报错',
    options: [
      'A. 1',
      'B. 2',
      'C. 程序报错'
    ],
    answer: 0,
    explanation: 'a=5满足a>3，b=3满足b>0，两个条件都成立，所以打印1。',
    hint: 'and需要两个条件都满足'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: 'or的基本使用',
    question: '执行下面的代码，会输出什么？' + '\n\n' +
              'x = 1' + '\n' +
              'y = 10' + '\n' +
              'if x > 5 or y > 5:' + '\n' +
              '    print(1)' + '\n' +
              'else:' + '\n' +
              '    print(2)' + '\n\n' +
              'A. 1  B. 2  C. 程序报错',
    options: [
      'A. 1',
      'B. 2',
      'C. 程序报错'
    ],
    answer: 0,
    explanation: 'x=1不满足x>5，但y=10满足y>5。or只需要一个满足，所以打印1。',
    hint: 'or只需要一个条件满足'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: 'and的逻辑',
    question: '如果a=5, b=7，哪个条件成立？' + '\n\n' +
              'A. a > b' + '\n' +
              'B. a == 5 and a > b' + '\n' +
              'C. b > a or b == 7' + '\n' +
              'D. a == b',
    options: [
      'A. a > b',
      'B. a == 5 and a > b',
      'C. b > a or b == 7',
      'D. a == b'
    ],
    answer: 2,
    explanation: '分析各选项：\n- A: a>b不成立（5<7）\n- B: a==5成立但a>b不成立，and整体不成立\n- C: b>a成立，or整体成立✓\n- D: a==b不成立',
    hint: 'or只需要一个满足，and需要全部满足'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '范围检查',
    question: 'x=8时，下面哪个条件成立？' + '\n\n' +
              'A. x < 5 or x > 10' + '\n' +
              'B. x >= 5 and x <= 10' + '\n' +
              'C. x < 0 and x > 100' + '\n' +
              'D. x > 10',
    options: [
      'A. x < 5 or x > 10',
      'B. x >= 5 and x <= 10',
      'C. x < 0 and x > 100',
      'D. x > 10'
    ],
    answer: 1,
    explanation: 'x=8的分析：\n- A: 8<5不成立，8>10不成立，or不成立\n- B: 8>=5成立，8<=10成立，and成立✓\n- C: 两个都不成立\n- D: 8>10不成立\n\n数学知识：8在5到10之间（包含两端）。',
    hint: '8在5到10之间'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '组合条件',
    question: '执行下面的代码，会输出什么？' + '\n\n' +
              "a = 'yes'" + '\n' +
              "b = 'no'" + '\n' +
              "c = 'no'" + '\n' +
              "if a == 'yes' and b == 'no':" + '\n' +
              '    print(1)' + '\n' +
              "elif a == 'no' or c == 'no':" + '\n' +
              '    print(2)' + '\n' +
              'else:' + '\n' +
              '    print(3)',
    options: [
      'A. 1',
      'B. 2',
      'C. 3',
      'D. 程序报错'
    ],
    answer: 0,
    explanation: '分析条件：\n- 第一个if: a=="yes"成立，b=="no"成立，and成立，打印1\n- 不检查elif（if已执行）\n\n所以输出1。',
    hint: 'and两个都满足，先检查if'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '逻辑推理',
    question: 'score=56时，会输出什么？' + '\n\n' +
              'if score >= 90:' + '\n' +
              "    print('优秀')" + '\n' +
              'elif score >= 80:' + '\n' +
              "    print('良好')" + '\n' +
              'elif score >= 60:' + '\n' +
              "    print('及格')" + '\n' +
              'else:' + '\n' +
              "    print('不及格')",
    options: [
      'A. 优秀',
      'B. 良好',
      'C. 及格',
      'D. 不及格'
    ],
    answer: 3,
    explanation: 'score=56的分析：\n- 56>=90不成立\n- 56>=80不成立\n- 56>=60不成立\n- 执行else，打印"不及格"\n\n数学知识：56小于60，所以不及格。',
    hint: '56小于60，所有if条件都不满足'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L3-4',
  title: '组合条件',
  subtitle: '学会使用and和or连接条件',
  difficulty: '入门',
  estimatedTime: '30-40分钟',
  learningGoals: [
    '掌握and的用法（两个条件同时满足）',
    '掌握or的用法（至少一个条件满足）',
    '理解and和or的区别和应用场景',
    '学会组合使用and和or'
  ],
  prerequisites: [
    'Python 基础语法',
    'if-else 条件判断',
    '比较运算符（>, <, >=, <=, ==, !=）',
    '逻辑运算基础'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['and', 'or', 'yes', 'no'],
  medium: ['weather', 'score', 'age', 'both'],
  hard: ['condition', 'combine', 'operator', 'logic']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    "if a > 0 and b > 0:",
    'if x > 5 or y > 5:',
    'if age >= 6 and age <= 18:',
    "if day == 'Sat' or day == 'Sun':"
  ],
  medium: [
    "a = 5\nb = 10\nif a > 0 and b > 0:\n    print('Positive')",
    "x = 8\nif x >= 5 and x <= 10:\n    print('In range')",
    "day = 'Friday'\nif day == 'Sat' or day == 'Sun':\n    print('Weekend')",
    'if score >= 90 and score <= 100:\n    print("A")'
  ],
  hard: [
    "x = 5\ny = 10\nz = 15\nif x > 0 and y > 0 and z > 0:\n    print('All positive')",
    "if x < 0 or x > 100:\n    print('Out of range')",
    "if (x >= 0 and x <= 10) or (x >= 90 and x <= 100):\n    print('Valid')",
    "role = 'admin'\nif role == 'admin' or role == 'moderator':\n    print('Access granted')"
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
