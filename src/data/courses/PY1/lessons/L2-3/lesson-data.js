/**
 * PY1 课程 L2-3: for-if 嵌套
 *
 * 核心知识点:
 * 1. for-if嵌套格式
 * 2. for-if执行过程
 * 3. for-if应用场景
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'color',
    pronunciation: "['kʌlər]",
    partOfSpeech: 'n./v.',
    meaning: '颜色；着色；色素',
    level: 'easy',
    example: 'What color do you like?',
    exampleTranslation: '你喜欢什么颜色？',
    note: 'color 颜色',
    source: 'ocr'
  },
  {
    word: 'red',
    pronunciation: '[red]',
    partOfSpeech: 'n./adj.',
    meaning: '红色；红的',
    level: 'easy',
    example: 'red wine 红酒',
    exampleTranslation: '红酒',
    note: 'red 红色',
    source: 'ocr'
  },
  {
    word: 'blue',
    pronunciation: '[blu:]',
    partOfSpeech: 'n./adj.',
    meaning: '蓝色；蓝色的',
    level: 'easy',
    example: 'blue sky 蓝天',
    exampleTranslation: '蓝天',
    note: 'blue 蓝色',
    source: 'ocr'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '循环判断 - for-if嵌套',
    emoji: '🔄',
    gradeLevel: '1-2',
    summary: '在循环中进行条件判断',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你在做一个游戏，每次循环时要检查是否达到了目标！for-if嵌套就是在每次循环时做判断！',
      concept: 'for循环中可以嵌套if语句。每次循环时，都会判断条件是否成立。',
      syntax: 'for i in range(n):\n    if 条件:\n        执行的代码',
      example: {
        title: '基本for-if',
        code: 'for i in range(3):\n    if i == 1:\n        print("找到了")',
        output: '找到了',
        explanation: '循环3次，i分别是0,1,2。当i==1时打印"找到了"。'
      },
      practice: [
        {
          question: 'for-if嵌套中，if语句写在循环的哪里？',
          answer: '写在循环内部，缩进一次'
        },
        {
          question: '每次循环都会判断if条件吗？',
          answer: '是的，每次循环都会判断'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的判断能力更强了！现在可以在循环中根据不同情况做不同的事情！',
      concept: 'for循环中可以用if语句根据不同条件执行不同的代码。',
      syntax: 'for i in range(n):\n    if 条件1:\n        代码1\n    else:\n        代码2',
      example: {
        title: 'if-else在循环中',
        code: 'for i in range(4):\n    if i % 2 == 0:\n        print("偶数")\n    else:\n        print("奇数")',
        output: '偶数\n奇数\n偶数\n奇数',
        explanation: '0,1,2,3中，0和2是偶数，1和3是奇数。\n\n数学知识：能被2整除的是偶数。'
      },
      practice: [
        {
          question: 'i % 2 == 0 是什么意思？',
          answer: '判断i是否是偶数'
        },
        {
          question: 'for-if嵌套中缩进要注意什么？',
          answer: 'if语句要在for语句内部，需要两次缩进'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '嵌套专家！现在你可以处理复杂的循环判断！',
      concept: '复杂的for-if嵌套可以实现高级的筛选和统计功能。',
      syntax: 'for i in range(n):\n    if 条件1:\n        if 条件2:\n            代码\n        else:\n            代码\n    else:\n        代码',
      example: {
        title: '双重条件判断',
        code: 'count = 0\nfor i in range(10):\n    if i > 0:\n        if i % 2 == 0:\n            count = count + 1\nprint(count)',
        output: '4',
        explanation: 'i从0到9，大于0的有1-9，其中偶数有2,4,6,8共4个。\n\n数学知识：1-9中的偶数：2,4,6,8'
      },
      practice: [
        {
          question: '如何统计满足两个条件的数量？',
          answer: '用嵌套的if语句'
        },
        {
          question: '嵌套if要注意缩进吗？',
          answer: '要注意，每层都要正确缩进'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '执行规则 - 逐层判断',
    emoji: '📋',
    gradeLevel: '1-2',
    summary: '理解for-if的执行顺序',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你在过安检：先检查你是否带行李（for循环），再检查你是否携带危险品（if判断）！',
      concept: 'for语句控制循环次数，if语句在每次循环中进行判断。',
      syntax: '执行顺序：\n1. for循环启动\n2. 每次循环先执行for的代码\n3. 然后执行if的判断',
      example: {
        title: '执行顺序示例',
        code: 'for i in range(3):\n    print("循环", i)\n    if i == 1:\n        print("找到了1")',
        output: '循环 0\n循环 1\n找到了1\n循环 2',
        explanation: '先打印"循环 i"，然后判断i是否等于1。'
      },
      practice: [
        {
          question: 'for和if的执行顺序是怎样的？',
          answer: '先执行for的代码，再执行if的判断'
        },
        {
          question: '每次循环都会执行if判断吗？',
          answer: '是的，每次循环都会判断'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你现在完全理解执行顺序了！for先运行，然后if判断！',
      concept: '执行顺序：for循环控制总次数，if语句在每次循环中单独判断。',
      syntax: '外层for循环\n    内层if判断\n    每次循环都要经过if判断',
      example: {
        title: '条件统计',
        code: 'count = 0\nfor i in range(5):\n    if i > 2:\n        count = count + 1\nprint(count)',
        output: '2',
        explanation: 'i=0,1,2时不满足i>2，i=3,4时满足，所以count=2。\n\n数学知识：3和4大于2，共2个。'
      },
      practice: [
        {
          question: '循环变量i在每次循环时会变吗？',
          answer: '会，依次变成0,1,2,...'
        },
        {
          question: '如何只统计满足条件的次数？',
          answer: '在if语句内累加计数器'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '执行顺序专家！你完全理解了！',
      concept: '复杂的嵌套要理解逐层执行：外层for → 内层for → if判断。',
      syntax: '执行顺序：\n外层循环第1次→内层循环全部→外层循环第2次→...',
      example: {
        title: '复杂嵌套',
        code: 'result = []\nfor i in range(2):\n    for j in range(3):\n        if (i + j) % 2 == 0:\n            result.append((i, j))\nprint(result)',
        output: '[(0, 0), (0, 2), (1, 1)]',
        explanation: 'i+j为偶数的有：(0,0)、(0,2)、(1,1)。\n\n数学知识：(i+j)能被2整除的就是偶数。'
      },
      practice: [
        {
          question: '双重循环嵌套时，if在哪个循环里？',
          answer: '在内层循环里'
        },
        {
          question: '(i+j)%2是什么意思？',
          answer: '判断i+j是否是偶数'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '实际应用 - 分类统计',
    emoji: '📊',
    gradeLevel: '1-2',
    summary: '用for-if解决实际问题',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你在给同学们分组：男生一组，女生一组！for-if就可以帮你做这个！',
      concept: '可以用for-if来统计和分类。',
      syntax: 'for i in 列表:\n    if 条件:\n        分到A组\n    else:\n        分到B组',
      example: {
        title: '分类问题',
        code: 'colors = ["红", "蓝", "红", "绿"]\nfor c in colors:\n    if c == "红":\n        print("红色系")\n    else:\n        print("其他")',
        output: '红色系\n其他\n红色系\n其他',
        explanation: '逐一检查颜色，"红"打印"红色系"，其他打印"其他"。'
      },
      practice: [
        {
          question: 'for-if可以用于分类吗？',
          answer: '可以'
        },
        {
          question: '如何判断是否等于某个值？',
          answer: '用 == 符号'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你现在可以用for-if来做统计了！统计数量、分类汇总！',
      concept: '用for-if可以实现统计功能：累加器+条件判断。',
      syntax: '设置计数器\n循环中用if判断\n满足条件时计数器加1',
      example: {
        title: '统计个数',
        code: 'scores = [90, 80, 70, 60, 50]\ncount = 0\nfor s in scores:\n    if s >= 60:\n        count = count + 1\nprint("及格人数:", count)',
        output: '及格人数: 3',
        explanation: '90,80,70及格（3个），60,50不及格。\n\n数学知识：3个数字大于等于60。'
      },
      practice: [
        {
          question: '如何统计满足条件的数量？',
          answer: '用计数器在if内累加'
        },
        {
          question: 'for-in和range有什么区别？',
          answer: 'for-in遍历列表，for-range遍历数字'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '统计专家！你现在可以做复杂的统计和分析了！',
      concept: '复杂的统计需要多个计数器和多重条件判断。',
      syntax: '设置多个计数器\n分别统计不同类别\n最后输出各个类别的数量',
      example: {
        title: '多重统计',
        code: 'scores = [90, 85, 70, 65, 95, 55]\na = b = c = 0\nfor s in scores:\n    if s >= 90:\n        a = a + 1\n    elif s >= 80:\n        b = b + 1\n    else:\n        c = c + 1\nprint("A:", a, "B:", b, "C:", c)',
        output: 'A: 2 B: 1 C: 3',
        explanation: '90,95是A（2个），85是B（1个），70,65,55是C（3个）。\n\n数学知识：分段统计。',
        note: 'elif是else if的缩写'
      },
      practice: [
        {
          question: '如何统计多个类别？',
          answer: '用多个计数器'
        },
        {
          question: 'elif和if-else有什么区别？',
          answer: 'elif是else if的缩写，用于多个条件'
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
    mathConcept: '条件判断',
    question: '运行下面的代码，会打印几次"找"？\n\n```python\nfor i in range(4):\n    if i == 2:\n        print("找")\n```',
    options: [
      'A. 1次',
      'B. 2次',
      'C. 3次',
      'D. 4次'
    ],
    answer: 0, // A
    explanation: '循环4次，i分别是0,1,2,3。只有i==2时条件成立，打印1次"找"。',
    hint: 'i == 2 何时成立？'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '缩进',
    question: '下面哪个是for-if的正确格式？',
    options: [
      'A. for i in range(3)\n    if i > 0:\n        print(i)',
      'B. for i in range(3):\n    if i > 0:\n        print(i)',
      'C. for i in range(3):\n    if i > 0\n        print(i)',
      'D. for i in range(3)\n    if i > 0:\n        print(i)'
    ],
    answer: 1, // B
    explanation: '正确的格式：for和if都要有冒号，都要正确缩进。选项B符合。',
    hint: '注意冒号和缩进'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '统计',
    question: '运行下面的代码，count的值是多少？\n\n```python\ncount = 0\nfor i in range(5):\n    if i > 2:\n        count = count + 1\nprint(count)\n```',
    options: [
      'A. 2',
      'B. 3',
      'C. 4',
      'D. 5'
    ],
    answer: 0, // A
    explanation: 'i=0,1,2时不满足i>2，i=3,4时满足，共2个。',
    hint: 'i大于2的有几个？'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '分类',
    question: '运行下面的代码，最终输出什么？\n\n```python\nnumbers = [1, 2, 3, 4]\nfor n in numbers:\n    if n % 2 == 0:\n        print("偶")\n    else:\n        print("奇")\n```',
    options: [
      'A. 偶 偶 偶 偶',
      'B. 偶 奇 偶 奇',
      'C. 奇 偶 奇 偶',
      'D. 奇 偶 奇 偶'
    ],
    answer: 1, // B
    explanation: '1是奇数，2是偶数，3是奇数，4是偶数。\n\n数学知识：能被2整除的是偶数。',
    hint: '1是奇数，2是偶数...'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '多重统计',
    question: '运行下面的代码，会打印什么？\n\n```python\na = b = 0\nfor i in range(1, 6):\n    if i % 2 == 0:\n        a = a + 1\n    else:\n        b = b + 1\nprint(a, b)\n```',
    options: [
      'A. 2 3',
      'B. 3 2',
      'C. 2 2',
      'D. 3 3'
    ],
    answer: 0, // A
    explanation: '1-5中偶数有2,4（2个），奇数有1,3,5（3个）。\n\n数学知识：2和4是偶数，1,3,5是奇数。',
    hint: '偶数几个？奇数几个？'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '嵌套条件',
    question: '运行下面的代码，最终result是什么？\n\n```python\nresult = 0\nfor i in range(5):\n    if i > 0:\n        if i % 2 == 0:\n            result = result + i\nprint(result)\n```',
    options: [
      'A. 4',
      'B. 6',
      'C. 8',
      'D. 10'
    ],
    answer: 1, // B
    explanation: 'i>0的偶数有2,4。\n\n2+4=6。\n\n数学知识：2和4是偶数，求和为6。',
    hint: 'i=2和4满足条件'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L2-3',
  title: 'for-if 嵌套',
  subtitle: '学会 for-if 嵌套使用',
  difficulty: '进阶',
  estimatedTime: '30-40分钟',
  learningGoals: [
    '理解 for-if 嵌套格式',
    '掌握 for-if 执行顺序',
    '能够用 for-if 解决实际问题',
    '能够进行分类统计'
  ],
  prerequisites: [
    '掌握 for 循环',
    '掌握 if 条件判断',
    '理解变量的概念'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['for', 'if', 'loop', 'condition'],
  medium: ['nested', 'counter', '统计', 'classify'],
  hard: ['elif', 'multiple', 'condition', 'group']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'for i in range(3):\n    if i == 1:\n        print(1)',
    'for i in range(4):\n    if i > 2:\n        print(i)',
    'for i in range(3):\n    if i == 0:\n        print("0")',
    'for i in range(3):\n    if i != 1:\n        print(i)'
  ],
  medium: [
    'count = 0\nfor i in range(5):\n    if i > 2:\n        count = count + 1',
    'for i in range(4):\n    if i % 2 == 0:\n        print("偶")\n    else:\n        print("奇")',
    'total = 0\nfor i in range(1, 5):\n    if i % 2 != 0:\n        total = total + i',
    'for n in [1,2,3]:\n    if n > 1:\n        print(n)'
  ],
  hard: [
    'a = b = 0\nfor i in range(5):\n    if i % 2 == 0:\n        a = a + 1\n    else:\n        b = b + 1',
    'result = 0\nfor i in range(5):\n    if i > 0:\n        if i % 2 == 0:\n            result = result + i',
    'for i in range(3):\n    for j in range(2):\n        if i > j:\n            print(i, j)',
    'a = b = c = 0\nfor i in [90,80,70,60,50]:\n    if i >= 90:\n        a = a + 1\n    elif i >= 80:\n        b = b + 1\n    else:\n        c = c + 1'
  ]
}

// 导出所有数据
export const L2_3_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L2_3_data