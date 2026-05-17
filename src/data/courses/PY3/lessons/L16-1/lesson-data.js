/**
 * PY3 课程 L16-1: 雪丰冰城（枚举法组合数）
 *
 * 核心知识点:
 * 1. for循环嵌套枚举组合数
 * 2. 组合成两位数
 * 3. 筛选符合条件的数
 * 4. 字符串组合
 */

// 单词卡数据 - OCR 提取
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'and',
    pronunciation: '[aend]',
    partOfSpeech: 'conj.',
    meaning: '和，与；加；接着',
    level: 'easy',
    example: 'Leng Xuefeng and Hou Sailei are both confused.',
    exampleTranslation: '冷雪丰和猴赛雷都很疑惑。',
    note: 'Python中的逻辑与运算符',
    source: 'ocr'
  },
  {
    word: 'or',
    pronunciation: '[o:r]',
    partOfSpeech: 'conj.',
    meaning: '或；否则；要不然',
    level: 'easy',
    example: 'Yes or no?',
    exampleTranslation: '是或否？',
    note: 'Python中的逻辑或运算符',
    source: 'ocr'
  },
  {
    word: 'ice',
    pronunciation: '[ais]',
    partOfSpeech: 'n./v.',
    meaning: '冰；冰冻',
    level: 'medium',
    example: 'The ice is cold.',
    exampleTranslation: '冰是冷的。',
    note: '冰',
    source: 'ocr'
  },
  {
    word: 'candy',
    pronunciation: "['kaendi]",
    partOfSpeech: 'n./v.',
    meaning: '糖果；用糖煮',
    level: 'medium',
    example: 'I love candy.',
    exampleTranslation: '我喜欢糖果。',
    note: '糖果',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'enumerate',
    pronunciation: "[i'nju:mareit]",
    partOfSpeech: 'v.',
    meaning: '枚举；列举',
    level: 'hard',
    example: 'Enumerate all possibilities.',
    exampleTranslation: '枚举所有可能性。',
    note: '枚举',
    source: 'extended'
  },
  {
    word: 'digit',
    pronunciation: "['did3it]",
    partOfSpeech: 'n.',
    meaning: '数字；位数',
    level: 'medium',
    example: 'This is a two-digit number.',
    exampleTranslation: '这是一个两位数。',
    note: '数字',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '枚举组合数 - for循环嵌套',
    emoji: '🔢',
    gradeLevel: '3-4',
    summary: '用for循环嵌套枚举所有组合',

    easy: {
      story: '想象你要找出用数字1、2、3能组成哪些两位数？就需要用两个for循环，一个看十位，一个看个位！',
      concept: '用for循环嵌套可以枚举多个数字的组合。外层循环取十位，内层循环取个位。',
      syntax: 'nums = [1, 2, 3]\nfor n1 in nums:      # 十位\n    for n2 in nums:    # 个位\n        n = n1 * 10 + n2  # 组合成两位数',
      example: {
        title: '组合两位数',
        code: 'nums = [1, 2, 3]\nfor n1 in nums:\n    for n2 in nums:\n        n = n1 * 10 + n2\n        print(n)',
        output: '11\n12\n13\n21\n22\n23\n31\n32\n33',
        explanation: '用for循环嵌套，组合出所有两位数。11是1*10+1，12是1*10+2...'
      },
      practice: [
        {
          question: 'for循环嵌套用来做什么？',
          answer: '枚举多个数字的组合'
        },
        {
          question: '外层循环取的是哪一位？',
          answer: '十位'
        }
      ]
    },

    medium: {
      story: '组合完数字后，还需要筛选出符合条件的数！比如：找出所有偶数！',
      concept: '在for循环嵌套后，用if语句筛选符合条件的数。',
      syntax: '# 筛选偶数\nfor n1 in nums:\n    for n2 in nums:\n        n = n1 * 10 + n2\n        if n % 2 == 0:  # 偶数判断\n            print(n)',
      example: {
        title: '筛选偶数',
        code: 'nums = [1, 2, 3]\ncount = 0\nfor n1 in nums:\n    for n2 in nums:\n        n = n1 * 10 + n2\n        if n % 2 == 0:\n            count = count + 1\n            print(n)\nprint("偶数个数:", count)',
        output: '12\n32\n偶数个数: 2',
        explanation: '找出用1、2、3组成的偶数：12和32，共2个。\n\n数学知识：能被2整除的数是偶数。'
      },
      practice: [
        {
          question: '如何判断一个数是偶数？',
          answer: 'n % 2 == 0'
        },
        {
          question: '如何在组合后筛选？',
          answer: '在循环中添加if判断'
        }
      ]
    },

    hard: {
      story: '组合三位数需要三层for循环！百位、十位、个位各用一个循环！',
      concept: '组合三位数需要三层for循环嵌套：百位×100 + 十位×10 + 个位。',
      syntax: 'nums = [1, 2, 3]\nfor n1 in nums:      # 百位\n    for n2 in nums:    # 十位\n        for n3 in nums:  # 个位\n            n = n1*100 + n2*10 + n3',
      example: {
        title: '组合三位数',
        code: 'nums = [1, 2]\nfor n1 in nums:\n    for n2 in nums:\n        for n3 in nums:\n            n = n1*100 + n2*10 + n3\n            print(n)',
        output: '111\n112\n121\n122\n211\n212\n221\n222',
        explanation: '用三层for循环嵌套，组合出所有三位数。\n\n数学知识：这是排列组合，2×2×2=8种'
      },
      practice: [
        {
          question: '组合三位数需要几层循环？',
          answer: '三层'
        },
        {
          question: '三位数的计算公式是什么？',
          answer: '百位×100 + 十位×10 + 个位'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '字符串组合 - 双重循环',
    emoji: '🔗',
    gradeLevel: '3-4',
    summary: '用双重for循环遍历多个列表进行组合',

    easy: {
      story: '就像点餐一样！可以选择主食AND饮料！用两个列表的组合来表示！',
      concept: '用双层for循环分别遍历两个列表，可以找出所有的搭配组合。',
      syntax: 'ice = ["冰淇淋", "冰沙"]\ncandy = ["糖果", "巧克力"]\nfor i in ice:\n    for c in candy:\n        print(i, c)',
      example: {
        title: '早餐组合',
        code: 'drinks = ["果汁", "酸奶"]\nfood = ["饭团", "三明治"]\nfor d in drinks:\n    for f in food:\n        print(d, f)',
        output: '果汁 饭团\n果汁 三明治\n酸奶 饭团\n酸奶 三明治',
        explanation: '用双重循环遍历两个列表，找出所有搭配组合。\n\n数学知识：2×2=4种组合'
      },
      practice: [
        {
          question: '双重for循环遍历两个列表有多少种组合？',
          answer: '列表1长度 × 列表2长度'
        },
        {
          question: '字符串组合用什么符号连接？',
          answer: '用逗号或+号'
        }
      ]
    },

    medium: {
      story: '点餐时如果不想吃某种组合怎么办？用if判断排除它！',
      concept: '在循环中添加if语句，可以筛选出符合条件的组合，排除不符合的。',
      syntax: '# 排除某个组合\nfor i in ice:\n    for c in candy:\n        if i != "某个":\n            print(i, c)',
      example: {
        title: '筛选组合',
        code: 'ice = ["冰淇淋", "冰沙"]\ncandy = ["糖果", "巧克力"]\nfor i in ice:\n    for c in candy:\n        if i != "冰沙":  # 排除冰沙\n            print(i, c)',
        output: '冰淇淋 糖果\n冰淇淋 巧克力',
        explanation: '用if语句排除"冰沙"相关的组合。\n\n数学知识：排除法'
      },
      practice: [
        {
          question: '如何排除某个组合？',
          answer: '用if判断排除'
        },
        {
          question: '排除和筛选有什么区别？',
          answer: '排除是不满足条件的不要，筛选是只取满足条件的'
        }
      ]
    },

    hard: {
      story: '字符串组合也可以筛选！比如：排除含有"芒果"的组合！',
      concept: '字符串的 in 运算符可以检查字符串是否包含某个子串。配合if可以筛选复杂条件。',
      syntax: '# 用in检查是否包含\nif "芒果" in combo:\n    continue  # 跳过',
      example: {
        title: '排除���含��物的组合',
        code: 'ice = ["芒果冰淇淋", "草莓冰淇淋"]\ncandy = ["巧克力", "软糖"]\nfor i in ice:\n    for c in candy:\n        if "芒果" not in i:  # 排除芒果\n            print(i, c)',
        output: '草莓冰淇淋 巧克力\n草莓冰淇淋 软糖',
        explanation: '用"芒果" not in i 排除含有芒果的组合。'
      },
      practice: [
        {
          question: '如何检查字符串包含某个字符？',
          answer: '用 in 运算符'
        },
        {
          question: '"芒果" in i 是什么意思？',
          answer: '检查i中是否包含"芒果"'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '组合数公式 - 数学应用',
    emoji: '🧮',
    gradeLevel: '3-4',
    summary: '用数学公式组合数，解决实际问题',

    easy: {
      story: '组成两位数的公式：十位数字×10 + 个位数字！这就是数学在编程中的应用！',
      concept: '两位数的组成公式：十位×10 + 个位。n1是十位数字，n2是个位数字。',
      syntax: '# 两位数 = 十位 × 10 + 个位\n# 例如：3和7 → 3×10 + 7 = 37',
      example: {
        title: '两位数计算',
        code: 'def make_two_digit(a, b):\n    return a * 10 + b\n\nprint(make_two_digit(1, 2))  # 12\nprint(make_two_digit(3, 7))  # 37',
        output: '12\n37',
        explanation: '用公式快速组合两位数。\n\n数学知识：十进制数的组成'
      },
      practice: [
        {
          question: '两位数的计算公式是什么？',
          answer: '十位×10 + 个位'
        },
        {
          question: '数字7和9能组成什么？',
          answer: '79'
        }
      ]
    },

    medium: {
      story: '组合完后还需要验证！比如：验证一个数是否是3的倍数！',
      concept: '用模运算（取余）可以验证整除关系。n % 3 == 0 表示能被3整除。',
      syntax: '# 验证3的倍数\nif n % 3 == 0:\n    print("是3的倍数")',
      example: {
        title: '筛选3的倍数',
        code: 'nums = [1, 2, 3, 4, 5, 6]\nfor n in nums:\n    if n % 3 == 0:\n        print(n, "是3的倍数")',
        output: '3 是3的倍数\n6 是3的倍数',
        explanation: '用 n % 3 == 0 判断是否是3的倍数。\n\n数学知识：能被3整除的数'
      },
      practice: [
        {
          question: '如何判断n是5的倍数？',
          answer: 'n % 5 == 0'
        },
        {
          question: '% 运算是什么？',
          answer: '取余数/模运算'
        }
      ]
    },

    hard: {
      story: '三位数的组成公式：百位×100 + 十位×10 + 个位！',
      concept: '三位数的组成公式：百位×100 + 十位×10 + 个位。这是十进制的本质！',
      syntax: '# 三位数 = 百位×100 + 十位×10 + 个位\n# 例如：1,2,3 → 1×100 + 2×10 + 3 = 123',
      example: {
        title: '三位数公式',
        code: 'def make_three_digit(a, b, c):\n    return a*100 + b*10 + c\n\nprint(make_three_digit(1, 2, 3))  # 123\nprint(make_three_digit(4, 5, 6))  # 456',
        output: '123\n456',
        explanation: '用公式组合三位数。\n\n数学知识：十进制的位值原理'
      },
      practice: [
        {
          question: '三位数的公式是什么？',
          answer: '百位×100 + 十位×10 + 个位'
        },
        {
          question: '数字2、0、2组成什么？',
          answer: '202'
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
    mathConcept: '两位数组合',
    question: '用数字1、2、3组合成所有两位数，n应该等于什么？\n\n```python\nnums = [1, 2, 3]\nfor n1 in nums:\n    for n2 in nums:\n        n = ?\n        print(n)\n```',
    options: [
      'A. n1 + n2',
      'B. n1 * n2',
      'C. n1 * 10 + n2'
    ],
    answer: 2, // C
    explanation: '两位数的组成：十位×10 + 个位。例如：3和7组成37 = 3×10 + 7。',
    hint: '两位数的十位需要乘10'
  },

  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '偶数判断',
    question: '想从数字1、2、3中找出所有偶数，判断条件正确的是？',
    options: [
      'A. n % 2 == 0',
      'B. n % 2 != 0',
      'C. n / 2 == 0'
    ],
    answer: 0, // A
    explanation: '偶数就是能被2整除的数，余数为0。n % 2 == 0 表示n是偶数。',
    hint: '偶数能被2整除'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '字符串组合',
    question: '两个列表 ["冰淇淋", "冰沙"] 和 ["糖果", "巧克力"]，一共有多少种组合？',
    options: [
      'A. 2种',
      'B. 3种',
      'C. 4种',
      'D. 5种'
    ],
    answer: 2, // C
    explanation: '2×2=4种组合。数学知识：列表1长度 × 列表2长度。',
    hint: '2 × 2 = ?'
  },

  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '排除法',
    question: '下面的代码会输出什么？\n\n```python\nnums = [1, 2, 3]\nfor n in nums:\n    if n != 2:\n        print(n)\n```',
    options: [
      'A. 1 2',
      'B. 1 3',
      'C. 2 3',
      'D. 1 2 3'
    ],
    answer: 1, // B
    explanation: 'n != 2 排除数字2，所以输出1和3。',
    hint: '不等于2的数'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '三位数组合',
    question: '用数字1、2能组成几个三位数？',
    options: [
      'A. 4种',
      'B. 6种',
      'C. 8种',
      'D. 9种'
    ],
    answer: 2, // C
    explanation: '三位数需要3个位置：百位、十位、个位各2种选择。2×2×2=8种。\n\n数学知识：2的3次方=8',
    hint: '2 × 2 × 2 = ?'
  },

  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '筛选条件',
    question: '用数字1、2、3组成两位数，且十位和个位不同的有几种？\n\n```python\nnums = [1, 2, 3]\ncount = 0\nfor n1 in nums:\n    for n2 in nums:\n        if n1 != n2:\n            count = count + 1\nprint(count)\n```',
    options: [
      'A. 4种',
      'B. 5种',
      'C. 6种',
      'D. 7种'
    ],
    answer: 2, // C
    explanation: '总共9种(3×3)，排除2种(11,22,33)，剩下6种。\n或用排列公式：3×2=6种。\n\n数学知识：排列组合',
    hint: '3×3 - 3 = ? 或 3×2 = ?'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L16-1',
  title: '雪丰冰城',
  subtitle: '用枚举法解决组合数问题',
  difficulty: '进阶',
  estimatedTime: '30-40分钟',
  learningGoals: [
    '掌握for循环嵌套枚举组合数',
    '学会组合成两位数和三位数',
    '能够用if语句筛选符合条件的数',
    '能够进行字符串组合'
  ],
  prerequisites: [
    '掌握for循环基础',
    '了解列表的使用',
    '理解if条件判断'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['enumerate', 'combination', 'digit', 'tens'],
  medium: ['multiple', 'filter', 'exclude', 'pair'],
  hard: ['hundreds', 'tens', 'ones', 'permutation']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'nums = [1, 2, 3]\nfor n1 in nums:\n    for n2 in nums:\n        n = n1*10 + n2',
    'for i in range(3):\n    for j in range(3):\n        print(i, j)',
    'nums = [1, 2]\nfor n in nums:\n    print(n)'
  ],
  medium: [
    'nums = [1, 2, 3]\nfor n in nums:\n    if n % 2 == 0:\n        print(n)',
    'drinks = ["果汁", "酸奶"]\nfood = ["饭团", "汉堡"]\nfor d in drinks:\n    for f in food:\n        print(d, f)',
    'for i in range(3):\n    for j in range(3):\n        if i != j:\n            print(i, j)'
  ],
  hard: [
    'nums = [1, 2]\nfor n1 in nums:\n    for n2 in nums:\n        for n3 in nums:\n            n = n1*100 + n2*10 + n3',
    'def make_two_digit(a, b):\n    return a*10 + b\nprint(make_two_digit(3, 7))',
    'ice = ["冰淇淋", "冰沙"]\nfor i in ice:\n    if "芒果" not in i:\n        print(i)'
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