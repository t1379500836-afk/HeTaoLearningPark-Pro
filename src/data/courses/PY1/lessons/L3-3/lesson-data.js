/**
 * PY1 课程 L3-3: 多条件判断
 *
 * 核心知识点:
 * 1. if-elif-else - 处理三种或更多情况的条件判断
 * 2. 分支应用 - 多条件分支的实际应用
 */

// 单词卡数据（源文件 + 拓展词汇）
export const vocabData = [
  // 源文件单词
  {
    word: 'show',
    pronunciation: '[ʃəu]',
    partOfSpeech: 'v./n.',
    meaning: '显示；展示；节目',
    level: 'easy',
    example: 'Please show me your homework.',
    exampleTranslation: '请给我看看你的作业。',
    note: 'show off 炫耀',
    source: 'ocr'
  },
  // 拓展编程词汇（条件判断相关）
  {
    word: 'elif',
    pronunciation: '[ilaif]',
    partOfSpeech: 'conj.',
    meaning: '否则如果（else if的缩写）',
    level: 'medium',
    example: 'Use elif for another condition.',
    exampleTranslation: '用elif检查另一个条件。',
    note: 'elif = else if',
    source: 'extended'
  },
  {
    word: 'branch',
    pronunciation: '[bra:ntʃ]',
    partOfSpeech: 'n./v.',
    meaning: '分支；分支机构',
    level: 'medium',
    example: 'The program has three branches.',
    exampleTranslation: '这个程序有三个分支。',
    note: 'if-elif-else 分支结构',
    source: 'extended'
  },
  {
    word: 'condition',
    pronunciation: "[kən'diʃən]",
    partOfSpeech: 'n.',
    meaning: '条件；状况',
    level: 'hard',
    example: 'Check the condition first.',
    exampleTranslation: '先检查条件。',
    note: 'if condition 条件判断',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: 'if-elif-else多条件判断',
    emoji: '🔀',
    gradeLevel: '1-2',
    summary: '处理三种或更多情况的条件判断',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有三条路可以走：if检查第一条路，elif检查第二条路，else处理剩下的第三种情况。这样就能处理三种不同的选择！',
      concept: 'if-elif-else用于处理三种或更多情况。if检查第一种情况，elif（否则如果）检查第二种情况，else处理前面都不满足的情况。它们是一个整体，左侧要对齐，都以冒号结尾。',
      syntax: 'if 条件1:\n    情况1的代码\nelif 条件2:\n    情况2的代码\nelse:\n    其他情况的代码',
      example: {
        title: '三种情况判断',
        code: "score = 85\nif score >= 90:\n    print('优秀')\nelif score >= 60:\n    print('及格')\nelse:\n    print('不及格')",
        output: '及格',
        explanation: 'score=85不满足>=90，但满足>=60，所以打印"及格"。'
      },
      practice: [
        {
          question: 'elif是什么的缩写？',
          answer: 'else if（否则如果）'
        },
        {
          question: 'if-elif-else的左侧需要对齐吗？',
          answer: '需要，它们是一个整体'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '多条件判断升级！现在你可以检查很多种情况，就像电梯有很多层一样，程序会一层层检查，找到满足条件的那一层就停下来！',
      concept: 'if-elif-else的执行顺序是：从上到下依次判断。一旦某个条件成立，就执行对应的代码，然后结束整个判断。后面的条件不会再检查。可以有多个elif来处理更多情况。',
      syntax: 'if 条件1:\n    代码1\nelif 条件2:\n    代码2\nelif 条件3:\n    代码3\nelse:\n    其他代码',
      example: {
        title: '多个elif',
        code: "age = 12\nif age < 6:\n    print('幼儿')\nelif age < 12:\n    print('儿童')\nelif age < 18:\n    print('少年')\nelse:\n    print('成人')",
        output: '少年',
        explanation: 'age=12不满足<6和<12，但满足<18，所以打印"少年"。'
      },
      practice: [
        {
          question: 'if条件成立后，还会检查elif吗？',
          answer: '不会，直接结束判断'
        },
        {
          question: '可以有多个elif吗？',
          answer: '可以，根据需要添加多个elif'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '条件判断大师模式！你可以设计复杂的条件逻辑，处理各种可能的情况。关键是理解条件的顺序和互斥关系！',
      concept: 'if-elif-else的核心是条件的优先级和互斥性。条件从上到下依次检查，先满足的条件优先执行。设计时要注意：①更严格的条件放前面②条件之间不要有重叠③else处理所有"漏网之鱼"。',
      syntax: '# 条件设计原则\n# 1. 具体条件在前\n# 2. 一般条件在后\n# 3. else兜底\nif 最严格条件:\n    ...\nelif 次严格条件:\n    ...\nelse:\n    ...',
      example: {
        title: '成绩等级',
        code: "score = 95\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelif score >= 60:\n    print('C')\nelse:\n    print('D')",
        output: 'A',
        explanation: 'score=95满足>=90，直接打印"A"，后面的>=80和>=60都不会检查。注意>=90必须在>=80前面！'
      },
      practice: [
        {
          question: '为什么if score >= 90要写在elif score >= 80前面？',
          answer: '因为>=90的情况也满足>=80，如果反了会永远不执行>=90的分支'
        },
        {
          question: 'else可以省略吗？',
          answer: '可以，但如果所有条件都不满足，程序不会执行任何操作'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '分支应用',
    emoji: '🌳',
    gradeLevel: '1-2',
    summary: '多条件分支的实际应用',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你在做一个红绿灯程序：红灯停、绿灯行、黄灯等待。三种情况需要三个分支来处理！',
      concept: '分支应用就是把if-elif-else用在真实场景中。比如根据分数评级、根据年龄分类、根据温度选择衣服等。每个分支处理一种特定情况。',
      syntax: 'if 情况1:\n    处理情况1\nelif 情况2:\n    处理情况2\nelse:\n    处理其他情况',
      example: {
        title: '天气选择',
        code: "weather = 'rain'\nif weather == 'sun':\n    print('去公园')\nelif weather == 'rain':\n    print('在家看书')\nelse:\n    print('去 shopping')",
        output: '在家看书',
        explanation: 'weather是"rain"，匹配elif分支，打印"在家看书"。'
      },
      practice: [
        {
          question: '根据天气做决定需要几个分支？',
          answer: '至少3个（晴、雨、其他）'
        },
        {
          question: 'if-elif-else和三个独立的if有什么区别？',
          answer: 'if-elif-else只会执行一个分支，三个if可能执行多个'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '分支应用进阶！现在你可以处理更复杂的情况：比如成绩评级（优秀/良好/及格/不及格）、年龄分段（幼儿/儿童/少年/成人）等。',
      concept: '分支应用的关键是合理设计条件区间。常用技巧：①用范围条件（>=和<=）②确保区间没有遗漏③用else处理边界情况。例如成绩评级：>=90优秀，>=80良好，>=60及格，其他不及格。',
      syntax: '# 成绩分级模式\nif score >= 90:\n    优秀\nelif score >= 80:\n    良好\nelif score >= 60:\n    及格\nelse:\n    不及格',
      example: {
        title: '成绩分级',
        code: "score = 75\nif score >= 90:\n    print('优秀')\nelif score >= 80:\n    print('良好')\nelif score >= 60:\n    print('及格')\nelse:\n    print('不及格')",
        output: '及格',
        explanation: 'score=75，不满足>=90和>=80，但满足>=60，所以是"及格"。'
      },
      practice: [
        {
          question: 'score=58会输出什么？',
          answer: '不及格（因为不满足>=60）'
        },
        {
          question: '如何设计4个年龄分段？',
          answer: '用if-elif-else加3个elif，判断条件如<6、<12、<18、其他'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '分支应用大师模式！你可以设计复杂的决策系统：游戏难度选择、菜单导航、状态机...只要条件设计得当，可以处理任何逻辑！',
      concept: '复杂的分支应用往往涉及多个条件的组合。可以使用and/or来组合条件，或者嵌套if语句。关键是要理清逻辑关系，避免条件冲突或遗漏。常见应用：菜单选择、状态判断、错误处理等。',
      syntax: '# 组合条件模式\nif 条件1 and 条件2:\n    ...\nelif 条件3 or 条件4:\n    ...\nelse:\n    ...\n\n# 嵌套模式\nif 外层条件:\n    if 内层条件:\n        ...',
      example: {
        title: '游戏状态',
        code: "health = 30\nhas_armor = True\nif health <= 0:\n    print('游戏结束')\nelif health < 30 and has_armor:\n    print('危险，有护甲保护')\nelif health < 30:\n    print('危险！')\nelse:\n    print('安全')",
        output: '危险，有护甲保护',
        explanation: 'health=30不满足<=0，但满足<30且有护甲，所以打印"危险，有护甲保护"。'
      },
      practice: [
        {
          question: 'and和or在条件中有什么作用？',
          answer: 'and需要同时满足两个条件，or只需要满足其中一个'
        },
        {
          question: '如果health=20且没有护甲，会输出什么？',
          answer: '危险！（不满足has_armor，跳到elif health<30分支）'
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
    mathConcept: '条件判断顺序',
    question: '执行下面的代码，会输出什么？' + '\n\n' +
              'score = 75' + '\n' +
              'if score >= 90:' + '\n' +
              '    print("A")' + '\n' +
              'elif score >= 60:' + '\n' +
              '    print("B")' + '\n' +
              'else:' + '\n' +
              '    print("C")' + '\n\n' +
              'A. A  B. B  C. C  D. 程序报错',
    options: [
      'A. A',
      'B. B',
      'C. C',
      'D. 程序报错'
    ],
    answer: 1,
    explanation: 'score=75不满足>=90，但满足>=60，所以执行elif分支，打印"B"。',
    hint: '从上到下检查条件，75满足>=60'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: 'else的作用',
    question: '如果所有if和elif条件都不满足，会执行什么？' + '\n\n' +
              'age = 5' + '\n' +
              'if age >= 18:' + '\n' +
              '    print("成人")' + '\n' +
              'elif age >= 12:' + '\n' +
              '    print("少年")' + '\n' +
              'else:' + '\n' +
              '    print("儿童")' + '\n\n' +
              'A. 成人  B. 少年  C. 儿童  D. 不输出',
    options: [
      'A. 成人',
      'B. 少年',
      'C. 儿童',
      'D. 不输出'
    ],
    answer: 2,
    explanation: 'age=5不满足>=18和>=12，所以执行else分支，打印"儿童"。',
    hint: 'else处理前面条件都不满足的情况'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '条件优先级',
    question: '执行下面的代码，会输出什么？' + '\n\n' +
              'score = 95' + '\n' +
              'if score >= 80:' + '\n' +
              '    print("B")' + '\n' +
              'elif score >= 90:' + '\n' +
              '    print("A")' + '\n' +
              'else:' + '\n' +
              '    print("C")' + '\n\n' +
              'A. A  B. B  C. C  D. 程序报错',
    options: [
      'A. A',
      'B. B',
      'C. C',
      'D. 程序报错'
    ],
    answer: 1,
    explanation: 'score=95满足>=80，直接执行if分支，打印"B"。虽然也满足>=90，但不会执行elif分支。注意：条件顺序很重要，>=90应该写在>=80前面！',
    hint: '从上到下检查，>=80先被满足'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '范围判断',
    question: 'age=15时，下面代码会输出什么？' + '\n\n' +
              'if age < 6:' + '\n' +
              '    print("幼儿")' + '\n' +
              'elif age < 12:' + '\n' +
              '    print("儿童")' + '\n' +
              'elif age < 18:' + '\n' +
              '    print("少年")' + '\n' +
              'else:' + '\n' +
              '    print("成人")' + '\n\n' +
              'A. 幼儿  B. 儿童  C. 少年  D. 成人',
    options: [
      'A. 幼儿',
      'B. 儿童',
      'C. 少年',
      'D. 成人'
    ],
    answer: 2,
    explanation: 'age=15，不满足<6和<12，但满足<18，所以打印"少年"。',
    hint: '15在12到18之间'
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
              'a = 5' + '\n' +
              'b = 10' + '\n' +
              'if a > 3 and b < 10:' + '\n' +
              '    print(1)' + '\n' +
              'elif a > 3 or b < 10:' + '\n' +
              '    print(2)' + '\n' +
              'else:' + '\n' +
              '    print(3)' + '\n\n' +
              'A. 1  B. 2  C. 3  D. 程序报错',
    options: [
      'A. 1',
      'B. 2',
      'C. 3',
      'D. 程序报错'
    ],
    answer: 1,
    explanation: '分析条件：a=5满足a>3，但b=10不满足b<10，所以"and"整体不成立，不打印1。检查elif：a>3成立，"or"整体成立，打印2。注意：and需要两个都满足，or只需要一个满足。',
    hint: 'and需要两个都满足，or只需要一个'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '逻辑推理',
    question: '要实现90分及以上A，80-89分B，60-79分C，60分以下D，应该怎么写？' + '\n\n' +
              'A. >=90, >=80, >=60, 其他' + '\n' +
              'B. >=90, >=80且<90, >=60且<80, 其他' + '\n' +
              'C. >=90, >=80, >=60, <60' + '\n' +
              'D. >=90, 80-89, 60-79, <60',
    options: [
      'A. >=90, >=80, >=60, 其他',
      'B. >=90, >=80且<90, >=60且<80, 其他',
      'C. >=90, >=80, >=60, <60',
      'D. >=90, 80-89, 60-79, <60'
    ],
    answer: 0,
    explanation: '选项A正确！利用从上到下检查的特性：- >=90会把90-100归为A- >=80会把80-89归为B（90+已经被A处理）- >=60会把60-79归为C（80+已经被处理）- else处理60以下选项B的"且<90"是多余的，因为>=90已经在前面处理了。',
    hint: '利用顺序检查，后一个条件不需要排除前面已处理的范围'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L3-3',
  title: '多条件判断',
  subtitle: '学会使用if-elif-else处理多种情况',
  difficulty: '入门',
  estimatedTime: '30-40分钟',
  learningGoals: [
    '掌握if-elif-else的语法格式',
    '理解多条件判断的执行顺序',
    '学会设计合理的条件区间',
    '了解and/or在条件中的应用'
  ],
  prerequisites: [
    'Python 基础语法',
    'if-else 条件判断',
    '比较运算符（>, <, >=, <=, ==, !=）'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['show', 'if', 'elif', 'else'],
  medium: ['score', 'grade', 'level', 'check'],
  hard: ['condition', 'branch', 'priority', 'evaluate']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    "if score >= 90:\n    print('A')",
    "elif score >= 80:\n    print('B')",
    "else:\n    print('C')",
    'if age < 6:\n    print("child")',
    'elif age < 18:\n    print("teen")',
    'else:\n    print("adult")'
  ],
  medium: [
    "score = 85\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelif score >= 60:\n    print('C')\nelse:\n    print('D')",
    "age = 12\nif age < 6:\n    print('幼儿')\nelif age < 12:\n    print('儿童')\nelif age < 18:\n    print('少年')\nelse:\n    print('成人')",
    'if a > 0 and b > 0:\n    print("正数")',
    'if a > 0 or b > 0:\n    print("至少一个正")'
  ],
  hard: [
    "score = 75\nif score >= 90:\n    print('优秀')\nelif score >= 80:\n    print('良好')\nelif score >= 60:\n    print('及格')\nelse:\n    print('不及格')",
    'health = 30\nhas_armor = True\nif health <= 0:\n    print("结束")\nelif health < 30 and has_armor:\n    print("危险有护甲")\nelif health < 30:\n    print("危险")\nelse:\n    print("安全")',
    "if a > 10 and b > 10:\n    print('都大于10')\nelif a > 10 or b > 10:\n    print('至少一个大于10')\nelse:\n    print('都不大于10')",
    'if x >= 0 and y >= 0:\n    print("第一象限")\nelif x >= 0 or y >= 0:\n    print("轴上")\nelse:\n    print("其他")'
  ]
}

// 导出所有数据
export const L3_3_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L3_3_data
