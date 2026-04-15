/**
 * PY3 课程 L16-1: 逻辑判断大师
 *
 * 核心知识点:
 * 1. and逻辑与运算
 * 2. or逻辑或运算
 * 3. 复合条件判断
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'and',
    pronunciation: '[aend]',
    partOfSpeech: 'conj.',
    meaning: '和，与；加；接着',
    level: 'easy',
    example: 'You and I are friends.',
    exampleTranslation: '你和我是朋友。',
    note: 'Python中的逻辑与运算符'
  },
  {
    word: 'or',
    pronunciation: '[o:r]',
    partOfSpeech: 'conj.',
    meaning: '或；或者；否则',
    level: 'easy',
    example: 'Yes or no?',
    exampleTranslation: '是或否？',
    note: 'Python中的逻辑或运算符'
  },
  {
    word: 'ice',
    pronunciation: '[ais]',
    partOfSpeech: 'n./v.',
    meaning: '冰；冰冻',
    level: 'medium',
    example: 'The ice is cold.',
    exampleTranslation: '冰是冷的。',
    note: ''
  },
  {
    word: 'candy',
    pronunciation: "['kaendi]",
    partOfSpeech: 'n./v.',
    meaning: '糖果；用糖煮',
    level: 'medium',
    example: 'I love candy.',
    exampleTranslation: '我喜欢糖果。',
    note: ''
  },
  // 拓展单词
  {
    word: 'condition',
    pronunciation: "[kan'dijan]",
    partOfSpeech: 'n.',
    meaning: '条件；情况',
    level: 'hard',
    example: 'Check the condition.',
    exampleTranslation: '检查条件。',
    note: ''
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: 'and逻辑与运算',
    emoji: '🔗',
    gradeLevel: '3-4',
    summary: '两个条件都为真时结果才为真',

    easy: {
      story: 'and就像"同时"！比如：有糖果AND有冰激凌，才能开心！两个都要有才行！',
      concept: 'and是逻辑与运算符。只有当and两边的条件都为True时，整个表达式才为True。只要有一个False，结果就是False。',
      syntax: "# and 运算\n# 条件1 and 条件2\n# 两个都为True，结果才为True\n\nif has_candy and has_ice:\n    print('开心！')\nelse:\n    print('有点遗憾...')",
      example: {
        title: '双条件判断',
        code: "score = 85\nhomework_done = True\n\n# 必须分数高且作业完成\nif score > 80 and homework_done:\n    print('可以玩游戏！')\nelse:\n    print('继续努力')",
        output: '分数>80且作业完成才能玩游戏',
        explanation: 'and要求两个条件同时满足。'
      },
      practice: [
        {
          question: 'and两边都为True时，结果是什么？',
          answer: 'True'
        },
        {
          question: 'and有一边为False时，结果是什么？',
          answer: 'False'
        }
      ]
    },

    medium: {
      story: '在游戏中，and经常用来判断复杂条件！比如：玩家在安全区AND生命值大于0，才能继续游戏！',
      concept: 'and常用于需要多个条件同时满足的场景：游戏状态判断、权限验证、输入验证等。',
      syntax: "# 常见应用场景\n\n# 1. 游戏状态\nif is_alive and in_safe_zone:\n    rest()\n\n# 2. 权限验证\nif is_admin and has_password:\n    grant_access()\n\n# 3. 范围判断\nif age >= 18 and age <= 65:\n    print('成年人')",
      example: {
        title: '范围判断',
        code: "score = 75\n\n# 判断分数是否在60-100之间\nif score >= 60 and score <= 100:\n    print('及格！')\nelse:\n    print('分数无效或不及格')",
        output: '判断分数是否在有效范围内',
        explanation: '用and判断数值是否在某个区间。'
      },
      practice: [
        {
          question: '如何判断x是否在1-10之间？',
          answer: 'if x >= 1 and x <= 10'
        },
        {
          question: 'and可以连接多个条件吗？',
          answer: '可以，如 a and b and c'
        }
      ]
    },

    hard: {
      story: 'and的短路特性！如果第一个条件是False，Python不会检查第二个条件，直接返回False！',
      concept: 'and的短路求值：从左到右判断，遇到False就停止，不再判断后面的条件。这在某些情况下可以提高效率。',
      syntax: "# and 短路求值\n# 如果左边是False，右边不执行\n\n# 例子：避免除以0\nif divisor != 0 and num / divisor > 1:\n    print('结果大于1')\n\n# 如果divisor=0，不会执行除法",
      example: {
        title: '短路求值',
        code: "# 安全除法\ndef safe_divide(a, b):\n    if b != 0 and a / b > 1:\n        return a / b\n    return 0\n\n# 如果b=0，第一个条件为False，不会执行除法\nresult = safe_divide(10, 0)\nprint(result)  # 0，没有报错",
        output: '安全地进行条件除法',
        explanation: '利用短路特性避免错误。'
      },
      practice: [
        {
          question: 'and的短路是什么意思？',
          answer: '第一个False就停止，不检查后面'
        },
        {
          question: '为什么利用短路可以避免除以0？',
          answer: '先检查除数不为0，通过才做除法'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: 'or逻辑或运算',
    emoji: '🔀',
    gradeLevel: '3-4',
    summary: '只要有一个条件为真，结果就为真',

    easy: {
      story: 'or就像"或者"！比如：有糖果OR有冰激凌，就能开心！只要有一样就行！',
      concept: 'or是逻辑或运算符。只要or两边的条件有一个为True，整个表达式就为True。只有两个都为False，结果才是False。',
      syntax: "# or 运算\n# 条件1 or 条件2\n# 只要有一个True，结果就是True\n\nif has_candy or has_ice:\n    print('开心！')\nelse:\n    print('都没有...')",
      example: {
        title: '或条件判断',
        code: "day = 'Saturday'\n\n# 周六或周日可以休息\nif day == 'Saturday' or day == 'Sunday':\n    print('周末快乐！')\nelse:\n    print('工作日')",
        output: '周六或周日显示周末快乐',
        explanation: 'or只需要一个条件满足即可。'
      },
      practice: [
        {
          question: 'or有一边为True时，结果是什么？',
          answer: 'True'
        },
        {
          question: 'or两边都为False时，结果是什么？',
          answer: 'False'
        }
      ]
    },

    medium: {
      story: 'or经常用于多个选项判断！比如：选择红色OR蓝色OR绿色，只要选了一个颜色就可以！',
      concept: 'or常用于多选一的场景：颜色选择、难度选择、角色选择等。可以用多个or连接多个条件。',
      syntax: "# 多个or连接\nif color == 'red' or color == 'blue' or color == 'green':\n    print('选择了有效颜色')\n\n# 游戏中的应用\nif level == 'easy' or level == 'medium' or level == 'hard':\n    start_game()",
      example: {
        title: '多选项判断',
        code: "choice = input('输入选择(A/B/C): ')\n\nif choice == 'A' or choice == 'B' or choice == 'C':\n    print('有效选择！')\nelse:\n    print('无效选择，请重新输入')",
        output: '判断输入是否是有效选项',
        explanation: '用or判断多个有效选项。'
      },
      practice: [
        {
          question: '如何判断字母是否是元音(a,e,i,o,u)？',
          answer: 'if letter=="a" or letter=="e" or ...'
        },
        {
          question: 'or可以连接很多个条件吗？',
          answer: '可以'
        }
      ]
    },

    hard: {
      story: 'or也有短路特性！如果第一个条件是True，Python不会检查后面的条件，直接返回True！',
      concept: 'or的短路求值：从左到右判断，遇到True就停止，不再判断后面的条件。可以用于提供默认值。',
      syntax: "# or 短路求值\n# 如果左边是True，右边不执行\n\n# 提供默认值\nname = user_input or 'Guest'\n# 如果user_input为空，使用'Guest'\n\n# 快速判断\nif is_vip or check_permission():\n    grant_access()",
      example: {
        title: '默认值设置',
        code: "# 用户输入或默认值\nuser_name = ''  # 用户没输入\n\n# 如果user_name为空，使用默认值\nname = user_name or 'Player1'\nprint(name)  # 输出: Player1\n\n# 等价于：\nif user_name:\n    name = user_name\nelse:\n    name = 'Player1'",
        output: '空值时使用默认值',
        explanation: '利用or的短路特性设置默认值。'
      },
      practice: [
        {
          question: 'or的短路是什么意思？',
          answer: '第一个True就停止，不检查后面'
        },
        {
          question: 'a or b 如何设置默认值？',
          answer: '如果a为空/False，使用b作为默认值'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '复合条件判断',
    emoji: '🧩',
    gradeLevel: '3-4',
    summary: '组合and和or实现复杂逻辑',

    easy: {
      story: '有时候需要组合and和or！比如：(周六或周日) AND 天气好，才能出去玩！',
      concept: '复合条件就是把and和or组合在一起。用括号可以明确优先级：括号里的先计算。',
      syntax: "# 复合条件\n# (周六或周日) 且 天气好\nif (day == 'Saturday' or day == 'Sunday') and weather == 'sunny':\n    print('出去玩！')\n\n# 注意括号的作用！",
      example: {
        title: '括号的重要性',
        code: "# 没有括号 - and优先级高于or\nif True or False and False:\n    print('A')  # 会打印A\n\n# 有括号 - 括号优先\nif (True or False) and False:\n    print('B')  # 不会打印",
        output: '展示括号对优先级的影响',
        explanation: 'and优先级高于or，括号可以改变计算顺序。'
      },
      practice: [
        {
          question: 'and和or哪个优先级更高？',
          answer: 'and优先级更高'
        },
        {
          question: '如何改变运算顺序？',
          answer: '用括号()'
        }
      ]
    },

    medium: {
      story: '在游戏中，复合条件非常常见！比如：(有钥匙或会开锁) AND 门没锁，才能进入！',
      concept: '复合条件可以表达复杂的游戏规则、业务逻辑。关键是用括号明确表达意图。',
      syntax: "# 游戏中的复合条件\n\n# 进入条件\nif (has_key or can_picklock) and not door_locked:\n    enter_room()\n\n# 攻击条件\nif is_alive and (has_sword or has_magic):\n    attack()\n\n# 得分条件\nif (score > 100 or time_bonus) and not cheated:\n    add_bonus()",
      example: {
        title: '游戏规则',
        code: "has_key = True\ncan_swim = False\nbridge_broken = True\n\n# 有钥匙 且 (会游泳或桥没断)\nif has_key and (can_swim or not bridge_broken):\n    print('可以过河')\nelse:\n    print('需要找其他方法')",
        output: '根据复合条件判断是否可以过河',
        explanation: '括号确保逻辑正确。'
      },
      practice: [
        {
          question: '如何表达"A且(B或C)"？',
          answer: 'if A and (B or C)'
        },
        {
          question: '为什么要用括号？',
          answer: '明确优先级，避免逻辑错误'
        }
      ]
    },

    hard: {
      story: '复杂逻辑可能需要多层嵌套！但要注意可读性，太复杂时可以拆分成多个判断！',
      concept: '复杂的复合条件可以：1.使用括号分组 2.拆分成多个if 3.使用变量存储中间结果。保持代码清晰。',
      syntax: "# 方式1：括号分组\nif (a and b) or (c and d):\n    pass\n\n# 方式2：拆分判断\ncondition1 = a and b\ncondition2 = c and d\nif condition1 or condition2:\n    pass\n\n# 方式3：嵌套if\nif a:\n    if b:\n        pass\n    elif c:\n        if d:\n            pass",
      example: {
        title: '清晰的条件判断',
        code: "# 不好：一行太长\nif (score > 80 and attendance > 90) or (score > 90 and attendance > 80) or is_vip:\n    print('优秀学生')\n\n# 好：拆分成变量\nhigh_score = score > 80\ngood_attendance = attendance > 90\nexcellent = score > 90 and attendance > 80\n\nif (high_score and good_attendance) or excellent or is_vip:\n    print('优秀学生')",
        output: '用变量让条件更清晰',
        explanation: '用变量存储条件，提高可读性。'
      },
      practice: [
        {
          question: '条件太长时应该怎么办？',
          answer: '用变量存储中间条件'
        },
        {
          question: '为什么要保持代码清晰？',
          answer: '方便理解和维护'
        }
      ]
    }
  }
]

// 习题数据
export const exercises = [
  // 🟢 基础题
  {
    id: 'ex-1',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: 'and运算',
    question: 'True and False 的结果是什么？',
    options: [
      'True',
      'False',
      'None',
      'Error'
    ],
    answer: 1,
    explanation: 'and要求两边都为True才返回True。有一个False，结果就是False。',
    hint: 'and要两个都True'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: 'or运算',
    question: 'True or False 的结果是什么？',
    options: [
      'True',
      'False',
      'None',
      'Error'
    ],
    answer: 0,
    explanation: 'or只要有一个True就返回True。左边是True，所以结果是True。',
    hint: 'or有一个True就行'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '复合条件',
    question: 'True or False and False 的结果是什么？（and优先级更高）',
    options: [
      'True',
      'False',
      'None',
      'Error'
    ],
    answer: 0,
    explanation: 'and先算：False and False = False。然后：True or False = True。',
    hint: 'and比or优先级高'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '括号影响',
    question: '(True or False) and False 的结果是什么？',
    options: [
      'True',
      'False',
      'None',
      'Error'
    ],
    answer: 1,
    explanation: '括号先算：True or False = True。然后：True and False = False。',
    hint: '括号改变优先级'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合判断',
    question: 'score=75, age=15，判断 score >= 60 and score <= 100 and age >= 18 的结果？',
    options: [
      'True',
      'False',
      'None',
      'Error'
    ],
    answer: 1,
    explanation: 'score>=60(✓) and score<=100(✓) and age>=18(✗)。最后一个条件不满足，结果是False。',
    hint: '年龄条件不满足'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '短路求值',
    question: '执行 a = 0 or 5 后，a的值是什么？',
    options: [
      '0',
      '5',
      'True',
      'False'
    ],
    answer: 1,
    explanation: 'or返回第一个为真的值。0为假，继续判断5，5为真，返回5。',
    hint: 'or返回第一个真值'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L16-1',
  title: '逻辑判断大师',
  subtitle: '学会and和or逻辑运算',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握and逻辑与运算',
    '掌握or逻辑或运算',
    '理解短路求值特性',
    '能组合使用and和or'
  ],
  prerequisites: [
    'Python条件判断',
    '布尔值True/False',
    '比较运算符'
  ]
}

// 打字练习单词（按难度分组，纯英文）
export const typingWords = {
  easy: ['and', 'or', 'true', 'false'],
  medium: ['candy', 'logic', 'check', 'valid', 'ice'],
  hard: ['condition', 'operator', 'boolean', 'priority']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'if a and b:',
    'if a or b:',
    'if x > 0 and y > 0:',
    'if color == "red" or color == "blue":'
  ],
  medium: [
    'if score >= 60 and score <= 100:\n    print("pass")',
    'if day == "Sat" or day == "Sun":\n    print("weekend")',
    'if (a or b) and c:\n    pass'
  ],
  hard: [
    'if (score > 80 and attendance > 90) or is_vip:\n    print("excellent")',
    'cond1 = a and b\ncond2 = c or d\nif cond1 and cond2:\n    pass'
  ]
}

// 导出所有数据
export const L16_1_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L16_1_data
