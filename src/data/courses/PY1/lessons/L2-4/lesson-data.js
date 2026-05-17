/**
 * PY1 课程 L2-4: OJ训练营
 *
 * 核心知识点:
 * 1. 认识OJ - 线上测评系统
 * 2. OJ实战 - 变量、字符串拼接、if-else
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'print',
    pronunciation: '[prɪnt]',
    partOfSpeech: 'v.',
    meaning: '打印；印刷',
    level: 'easy',
    example: 'Print the document.',
    exampleTranslation: '打印文件。',
    source: 'ocr'
  },
  {
    word: 'input',
    pronunciation: '[ˈɪnpʊt]',
    partOfSpeech: 'v.',
    meaning: '输入',
    level: 'easy',
    example: 'Please input your answer.',
    exampleTranslation: '请输入您的答案。',
    source: 'ocr'
  },
  {
    word: 'int',
    pronunciation: '[ɪnt]',
    partOfSpeech: 'abbr.',
    meaning: '整数',
    level: 'medium',
    example: 'Enter an integer.',
    exampleTranslation: '输入一个整数。',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'online',
    pronunciation: '[ˈɒnlaɪn]',
    partOfSpeech: 'adj.',
    meaning: '在线的',
    level: 'medium',
    example: 'Study online.',
    exampleTranslation: '在线学习。',
    source: 'extended'
  },
  {
    word: 'judge',
    pronunciation: '[dʒʌdʒ]',
    partOfSpeech: 'v.',
    meaning: '评判；判断',
    level: 'medium',
    example: 'The judge will decide the winner.',
    exampleTranslation: '评委将决定获胜者。',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '认识OJ',
    emoji: '🏆',
    gradeLevel: '3-4',
    summary: '线上测评系统，自动判断对错',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'OJ就像一个智能老师，它可以自动检查我们的答案对不对，不需要人来批改。',
      concept: 'OJ（Online Judge）是线上测评系统，系统会用多组测试数据检验代码，自動评分。',
      syntax: `OJ = Online Judge = 线上测评
自动评分，不需要人批改`,
      example: {
        title: 'OJ工作原理',
        code: `# 提交代码到OJ系统
# OJ会用多组测试数据测试
# 系统对比输出结果和正确答案
# 自动显示得分`,
        output: '',
        explanation: 'OJ系统预先准备了测试数据，提交代码后会自动运行并评分，非常高效。'
      },
      practice: [
        {
          question: 'OJ是什么意思？',
          answer: '线上测评（Online Judge）'
        },
        {
          question: 'OJ题需要人来批改吗？',
          answer: '不需要，系统自动评分'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'OJ题的答题流程是：读题 → 编写代码 → 测试样例 → 提交代码。每个步骤都很重要。',
      concept: 'OJ答题流程：读题（找输入输出）→ 编写代码 → 测试样例 → 提交代码。',
      syntax: `答题流程：
1. 读题：理解题意，找输入输出
2. 编写代码：获取输入，处理数据，输出结果
3. 测试样例：用样例测试
4. 提交代码：正式提交`,
      example: {
        title: 'OJ答题四步骤',
        code: `# 1. 读题：输入长颈鹿数量，输出猴子数量
# 2. 编写代码：
n = int(input())
print(n * 7)
# 3. 测试样例
# 4. 提交代码`,
        output: '',
        explanation: '按照流程答题，先理解题目要求，再编写代码，最后测试通过再提交。'
      },
      practice: [
        {
          question: 'OJ答题的第一步是什么？',
          answer: '读题'
        },
        {
          question: '提交代码前应该做什么？',
          answer: '测试样例'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'OJ题有输入描述和输出描述，样例有输入样例和输出样例。理解题目结构很重要。',
      concept: 'OJ题目结构：题目描述、输入描述、输出描述、输入样例、输出样例。',
      syntax: `题目描述：讲清楚要做什么
输入描述：需要输入什么
输出描述：需要输出什么
样例：输入和对应的正确输出`,
      example: {
        title: '看懂OJ题目',
        code: `# 例题：
# 题目：计算两数之和
# 输入描述：两个整数
# 输出描述：两个整数之和
# 输入样例：3 5
# 输出样例：8`,
        output: '',
        explanation: '做OJ题要先读懂题目结构，知道要输入什么、输出什么，再编写代码。'
      },
      practice: [
        {
          question: 'OJ题目中"输入描述"告诉了我们什么？',
          answer: '需要输入什么数据'
        },
        {
          question: '为什么要先测试样例？',
          answer: '确保代码正确再提交'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: 'OJ实战 - 变量',
    emoji: '📝',
    gradeLevel: '3-4',
    summary: '用变量和运算解决实际问题',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '做OJ题时，需要先读取输入的数据，存储到变量中，然后计算，最后输出结果。',
      concept: 'OJ中变量使用流程：input() 读取 → 变量存储 → 计算 → print() 输出。',
      syntax: `n = int(input())  # 读取整数
print(n * 7)      # 计算并输出`,
      example: {
        title: '猴子与长颈鹿',
        code: `# 题目：猴子数量是长颈鹿的7倍
# 输入长颈鹿数量，输出猴子数量
n = int(input())
print(n * 7)`,
        output: '（输入5）\n35',
        explanation: '读取长颈鹿数量 5，乘以 7 得到猴子数量 35，输出 35。'
      },
      practice: [
        {
          question: 'OJ题中用什么读取输入？',
          answer: 'input()'
        },
        {
          question: '为什么需要 int(input())？',
          answer: '把字符串转成数字才能计算'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'OJ题的计算和之前学的数学运算一样，先乘除后加减，有括号先算括号。',
      concept: 'OJ中的计算和 Python 运算规则相同，注意运算优先级。',
      syntax: `运算顺序：
先算 * / %
后算 + -
有括号先算括号里`,
      example: {
        title: '综合计算',
        code: `# 计算 (a + b) * c
a = int(input())
b = int(input())
c = int(input())
print((a + b) * c)`,
        output: '（输入1 2 3）\n9',
        explanation: 'a=1, b=2, c=3。(1+2)*3 = 3*3 = 9。注意括号内的先算。'
      },
      practice: [
        {
          question: 'print((2+3)*4) 输出什么？',
          answer: '20'
        },
        {
          question: 'OJ题中如何处理多个输入？',
          answer: '多次调用 input()'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '有些OJ题需要根据不同情况输出不同结果，这时候需要用到条件判断。',
      concept: '根据题目要求，可能需要结合 if-else 语句。',
      syntax: `if 条件:
    print('合格')
else:
    print('不合格')`,
      example: {
        title: '判断是否合格',
        code: `# 题目：成绩>=60为合格
score = int(input())
if score >= 60:
    print('合格')
else:
    print('不合格')`,
        output: '（输入75）\n合格',
        explanation: '输入 75，75>=60 成立，打印"合格"。如果输入 50，则打印"不合格"。'
      },
      practice: [
        {
          question: '什么情况下需要用 if-else？',
          answer: '需要根据条件输出不同结果时'
        },
        {
          question: '判断合格需要什么符号？',
          answer: '>= 表示大于等于'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: 'OJ实战 - 字符串拼接',
    emoji: '🔗',
    gradeLevel: '3-4',
    summary: '用字符串拼接生成输出',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '有些OJ题需要输出包含输入内容的句子，比如打招呼"Hello xxx"。',
      concept: '字符串拼接可以把输入的内容和固定文字组合在一起输出。',
      syntax: `name = input()
print('Hello ' + name)`,
      example: {
        title: '打招呼程序',
        code: `# 题目：输入名字，输出欢迎语
name = input()
print('Welcome ' + name)`,
        output: '（输入Tom）\nWelcome Tom',
        explanation: '读取名字 "Tom"，拼接 "Welcome " 和 "Tom"，输出 "Welcome Tom"。'
      },
      practice: [
        {
          question: "'Hello ' + 'Tom' 输出什么？",
          answer: '"Hello Tom"'
        },
        {
          question: '字符串拼接用什么符号？',
          answer: '加号 +'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '字符串拼接可以多次使用，把多个部分组合成完整的句子。',
      concept: '可以多次使用 + 号拼接多个字符串。',
      syntax: `'今天吃' + 菜 + '炒' + 肉`,
      example: {
        title: '组合句子',
        code: `# 题目：输入食材，输出"今天吃XXX炒鸡蛋"
a = input()
b = input()
print('今天吃' + b + '炒' + a)`,
        output: '（输入鸡蛋，番茄）\n今天吃番茄炒鸡蛋',
        explanation: 'a="鸡蛋"，b="番茄"。拼接结果："今天吃"+"番茄"+"炒"+"鸡蛋"="今天吃番茄炒鸡蛋"。'
      },
      practice: [
        {
          question: 'print("A" + "B" + "C") 输出什么？',
          answer: '"ABC"'
        },
        {
          question: '为什么需要多次拼接？',
          answer: '因为输出包含多个部分'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '有些OJ题需要把数字和文字混在一起输出，比如计算"3+5=8"。',
      concept: '数字和字符串可以一起输出，用加号拼接。',
      syntax: `a = 3
b = 5
print(str(a) + '+' + str(b) + '=' + str(a+b))`,
      example: {
        title: '混合输出',
        code: `# 输出格式：3+5=8
a = int(input())
b = int(input())
print(str(a) + '+' + str(b) + '=' + str(a+b))`,
        output: '（输入3 5）\n3+5=8',
        explanation: '先把数字转成字符串，再用加号拼接，得到 "3+5=8"。'
      },
      practice: [
        {
          question: 'str(3) + "+" 得到什么？',
          answer: '"3+"'
        },
        {
          question: '为什么需要 str()？',
          answer: '把数字转成字符串才能拼接'
        }
      ]
    }
  },

  {
    id: 'kp-4',
    title: 'OJ实战 - if-else',
    emoji: '⚖️',
    gradeLevel: '3-4',
    summary: '根据条件输出不同结果',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '有些OJ题需要根据条件选择输出，比如判断及格不及格。',
      concept: '根据条件是否成立，选择输出不同的内容。',
      syntax: `if 条件:
    print('结果1')
else:
    print('结果2')`,
      example: {
        title: '判断及格',
        code: `# 题目：成绩>=60为合格，否则不合格
score = int(input())
if score >= 60:
    print('合格')
else:
    print('不合格')`,
        output: '（输入85）\n合格',
        explanation: 'score=85，85>=60 成立，输出"合格"。'
      },
      practice: [
        {
          question: 'if-else 可以输出几种结果？',
          answer: '两种'
        },
        {
          question: '什么情况下输出"不合格"？',
          answer: 'score < 60 时'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'OJ题的 if-else 需要严格匹配题目要求，包括输出的文字内容。',
      concept: 'OJ题要求精确匹配输出，内容或格式不对会扣分。',
      syntax: `# 严格按照题目要求输出
if 条件:
    print('合格')
else:
    print('不合格')`,
      example: {
        title: '严格匹配',
        code: `# 题目：载重<=20为合格，否则超重
weight = int(input())
if weight <= 20:
    print('合格')
else:
    print('超重')`,
        output: '（输入20）\n合格',
        explanation: 'weight=20，20<=20 成立，输出"合格"。如果 weight=25，输出"超重"。'
      },
      practice: [
        {
          question: '输出"合格"和输出"合格 "有什么区别？',
          answer: '多了空格可能导致不匹配'
        },
        {
          question: 'OJ题需要注意什么？',
          answer: '输出内容要完全匹配题目要求'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '有时题目需要多组测试样例都通过才能得满分，所以要确保代码对各种情况都正确。',
      concept: 'OJ会用多组测试数据测试代码，确保覆盖所有情况。',
      syntax: `# 多组样例测试
输入: 20 → 输出: 合格
输入: 25 → 输出: 超重
输入: 15 → 输出: 合格`,
      example: {
        title: '完整解答',
        code: `# 题目：判断是否超重（标准20吨）
weight = int(input())
if weight <= 20:
    print('合格')
else:
    print('超重')`,
        output: '',
        explanation: '这个代码对所有情况都正确：<=20 合格，>20 超重。多组测试样例都能通过。'
      },
      practice: [
        {
          question: '为什么需要多组测试样例？',
          answer: '确保代码对各种情况都正确'
        },
        {
          question: 'submit 之前应该做什么？',
          answer: '用多组样例测试代码'
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
    mathConcept: '流程记忆',
    question: '下列选项中，哪个是正确的OJ题答题顺序？',
    options: [
      '编写代码——提交代码——测试样例',
      '读题——编写代码——测试样例——提交代码',
      '读题——编写代码——提交代码——测试样例',
      '读题——测试样例——编写代码——提交代码'
    ],
    answer: 1,
    explanation: 'OJ题的答题流程是：读题——编写代码——测试样例——提交代码。选项B正确。',
    hint: '按顺序记住四步'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '字符串拼接',
    question: `执行下方代码，先后输入鸡蛋、番茄，程序会打印什么？\n\n\`\`\`python\na = input()\nb = input()\nprint('今天吃' + b + '炒' + a)\n\`\`\``,
    options: [
      '今天吃番茄炒鸡蛋',
      '今天吃 + 番茄 + 炒 + 鸡蛋',
      '鸡蛋炒番茄',
      '今天吃鸡蛋炒番茄'
    ],
    answer: 0,
    explanation: 'a="鸡蛋"，b="番茄"。拼接"今天吃"+"番茄"+"炒"+"鸡蛋"="今天吃番茄炒鸡蛋"。',
    hint: '按顺序替换变量'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '输入理解',
    question: 'OJ题目"输入货车载重，判断是否超重"中，输入描述是什么？',
    options: [
      '货车编号',
      '货车载重',
      '超重标准',
      '是否合格'
    ],
    answer: 1,
    explanation: '题目要求输入货车载重，然后判断是否超重，所以输入描述是货车载重。',
    hint: '输入的是需要判断的数据'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '条件判断',
    question: '编写判断超重的代码（标准20吨），需要使用什么语句？',
    options: [
      'input()',
      'print()',
      'if-else',
      'for循环'
    ],
    answer: 2,
    explanation: '判断是否超重需要根据条件输出不同结果，需要使用 if-else 语句。',
    hint: '需要根据条件选择输出'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合判断',
    question: `以下代码的输出是什么？\n\n\`\`\`python\nweight = 20\nif weight <= 20:\n    print('合格')\nelse:\n    print('超重')\n\`\`\``,
    options: [
      '合格',
      '超重',
      '合格 超重',
      '没有输出'
    ],
    answer: 0,
    explanation: 'weight=20，20<=20 成立，执行 if 分支打印"合格"。',
    hint: '20 是否小于等于 20？'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '完整理解',
    question: '关于OJ题答题，下列说法正确的是？',
    options: [
      '只需要测试一组样例通过就可以提交',
      '编写代码前不需要读题',
      '输入输出描述要仔细看',
      '输出多了空格没关系'
    ],
    answer: 2,
    explanation: 'OJ题需要仔细看输入输出描述，确保代码正确匹配题目要求。输出多了空格会导致不匹配。',
    hint: '题目要求必须严格遵守'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L2-4',
  title: 'OJ训练营',
  subtitle: '学会线上测评系统的答题方法',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解OJ线上测评系统的原理',
    '掌握OJ题的答题流程',
    '能编写变量、字符串、if-else的OJ题代码',
    '理解多组测试样例的重要性'
  ],
  prerequisites: [
    '理解变量和input()的使用',
    '知道字符串拼接方法',
    '掌握if-else语句'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['print', 'input', 'online', 'judge'],
  medium: ['submit', 'output', 'sample', 'test'],
  hard: ['integer', 'string', 'condition', 'result']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'n = int(input())',
    "print('Hello ' + name)",
    'a = int(input())\nb = int(input())\nprint(a + b)',
    "print('合格')"
  ],
  medium: [
    'n = int(input())\nprint(n * 7)',
    "name = input()\nprint('Welcome ' + name)",
    'score = int(input())\nif score >= 60:\n    print(\'合格\')',
    "print('今天吃' + b + '炒' + a)"
  ],
  hard: [
    'weight = int(input())\nif weight <= 20:\n    print(\'合格\')\nelse:\n    print(\'超重\')',
    'a = int(input())\nb = int(input())\nprint(str(a) + "+" + str(b) + "=" + str(a+b))',
    'n = int(input())\nif n % 2 == 0:\n    print(\'偶数\')\nelse:\n    print(\'奇数\')',
    'score = int(input())\nif score >= 90:\n    print(\'优秀\')\nelif score >= 80:\n    print(\'良好\')\nelif score >= 70:\n    print(\'中等\')\nelif score >= 60:\n    print(\'及格\')\nelse:\n    print(\'不及格\')'
  ]
}

// 导出所有数据
export const L2_4_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L2_4_data