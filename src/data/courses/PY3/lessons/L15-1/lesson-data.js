/**
 * PY3 课程 L15-1: 神奇的数列
 *
 * 核心知识点:
 * 1. 递推的概念
 * 2. 递推式与斐波那契数列
 * 3. 列表的负数索引
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'food',
    pronunciation: '[fu:d]',
    partOfSpeech: 'n.',
    meaning: '食物；食品',
    level: 'easy',
    example: 'Feed the pet some food.',
    exampleTranslation: '给宠物喂一些食物。',
    note: '喂宠记游戏中的食物',
    source: 'ocr'
  },
  {
    word: 'number',
    pronunciation: "['nΛmbər]",
    partOfSpeech: 'n./v.',
    meaning: '数字；数量；编号',
    level: 'easy',
    example: 'Find the next number in the sequence.',
    exampleTranslation: '找出数列中的下一个数字。',
    note: '数列中的数字',
    source: 'ocr'
  },
  {
    word: 'card',
    pronunciation: '[ka:rd]',
    partOfSpeech: 'n.',
    meaning: '卡片；纸牌；贺卡',
    level: 'medium',
    example: 'Draw a card from the deck.',
    exampleTranslation: '从牌堆中抽一张牌。',
    note: '',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'sequence',
    pronunciation: "['si:kwans]",
    partOfSpeech: 'n.',
    meaning: '数列；序列；顺序',
    level: 'medium',
    example: 'A number sequence.',
    exampleTranslation: '一个数字数列。',
    note: '递推数列',
    source: 'extended'
  },
  {
    word: 'fibonacci',
    pronunciation: "[,fiba'na:tfi]",
    partOfSpeech: 'n.',
    meaning: '斐波那契（数列）',
    level: 'hard',
    example: 'The Fibonacci sequence is famous.',
    exampleTranslation: '斐波那契数列很著名。',
    note: '兔子数列',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '递推的概念',
    emoji: '🔢',
    gradeLevel: '3-4',
    summary: '根据规律从前一项推出后一项',

    easy: {
      story: '想象一排积木，每块积木的高度是前一块的2倍。知道第一块的高度，就能推算出后面所有积木的高度！这就是递推！',
      concept: '递推是一种计算方法，根据已知的项和变化规律，一步一步推算出后面的项。就像多米诺骨牌，一个接一个地传递下去。',
      syntax: "# 递推的思想\n# 前一项 -> 后一项\n# a[0] -> a[1] -> a[2] -> ...\n\n# 例如：每次乘2\na = 1\nfor i in range(5):\n    print(a)\n    a = a * 2  # 递推式",
      example: {
        title: '倍增数列',
        code: "# 1, 2, 4, 8, 16, ...\nnums = [1]\nfor i in range(5):\n    next_num = nums[-1] * 2\n    nums.append(next_num)\nprint(nums)\n# 输出: [1, 2, 4, 8, 16, 32]",
        output: '1 2 4 8 16 32',
        explanation: '每个数都是前一个数的2倍，这就是递推关系。'
      },
      practice: [
        {
          question: '递推是什么意思？',
          answer: '根据规律从前一项推算后一项'
        },
        {
          question: '如果每个数是前一个数+3，第一个数是1，第二个数是多少？',
          answer: '4 (1+3)'
        }
      ]
    },

    medium: {
      story: '数列有很多种规律！可以每次加同一个数（等差），可以每次乘同一个数（等比），也可以有更复杂的规律！',
      concept: '常见的递推规律：等差数列（每次加固定值）、等比数列（每次乘固定值）、斐波那契数列（前两项之和）等。',
      syntax: "# 等差数列：每次加d\n# a[n] = a[n-1] + d\n\n# 等比数列：每次乘q\n# a[n] = a[n-1] * q\n\n# 斐波那契：前两项之和\n# a[n] = a[n-1] + a[n-2]",
      example: {
        title: '等差数列',
        code: "# 1, 4, 7, 10, 13, ... (每次+3)\nnums = [1]\nfor i in range(5):\n    next_num = nums[-1] + 3\n    nums.append(next_num)\nprint(nums)\n# 输出: [1, 4, 7, 10, 13, 16]",
        output: '1 4 7 10 13 16',
        explanation: '每个数比前一个数多3，是等差数列。'
      },
      practice: [
        {
          question: '等差数列的特点是什么？',
          answer: '相邻两项的差相等'
        },
        {
          question: '等比数列的特点是什么？',
          answer: '相邻两项的比值相等'
        }
      ]
    },

    hard: {
      story: '递推可以解决复杂问题！比如计算兔子繁殖数量、计算路径数、计算组合数等。递推是算法的基础！',
      concept: '递推是一种重要的算法思想，用循环实现。关键是找到递推式（变化规律），然后用代码表示这个规律。',
      syntax: "# 递推三步骤：\n# 1. 确定初始值\n# 2. 找到递推式\n# 3. 循环计算\n\n# 模板\nresult = [初始值]\nfor i in range(n):\n    next_val = 递推公式(result)\n    result.append(next_val)",
      example: {
        title: '平方数列',
        code: "# 1, 4, 9, 16, 25, ... (完全平方数)\n# 规律: 第n项是n的平方\nnums = []\nfor i in range(1, 6):\n    nums.append(i * i)\nprint(nums)\n# 输出: [1, 4, 9, 16, 25]",
        output: '1 4 9 16 25',
        explanation: '第n项 = n^2，用递推思想生成平方数列。'
      },
      practice: [
        {
          question: '递推的三个步骤是什么？',
          answer: '确定初始值、找到递推式、循环计算'
        },
        {
          question: '第n项 = n^2是什么类型的递推？',
          answer: '公式型递推（直接用n计算）'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '斐波那契数列',
    emoji: '🐰',
    gradeLevel: '3-4',
    summary: '每个数是前两个数之和的经典数列',

    easy: {
      story: '斐波那契数列又叫"兔子数列"！假设一对兔子每个月生一对小兔子，小兔子两个月后成熟，问n个月后有多少对兔子？',
      concept: '斐波那契数列：1, 1, 2, 3, 5, 8, 13, 21, 34... 规律是每个数等于前两个数之和：第n项 = 第(n-1)项 + 第(n-2)项。',
      syntax: "# 斐波那契数列\n# 1, 1, 2, 3, 5, 8, 13, 21, 34...\n# 递推式: a[n] = a[n-1] + a[n-2]\n\nfib = [1, 1]\nfor i in range(5):\n    next_fib = fib[-1] + fib[-2]\n    fib.append(next_fib)\nprint(fib)",
      example: {
        title: '生成斐波那契数列',
        code: "fib = [1, 1]  # 前两项是1, 1\n\nfor i in range(6):\n    # 下一项 = 最后两项之和\n    next_fib = fib[-1] + fib[-2]\n    fib.append(next_fib)\n\nprint(fib)\n# 输出: [1, 1, 2, 3, 5, 8, 13, 21]",
        output: '1 1 2 3 5 8 13 21',
        explanation: 'fib[-1]是最后一项，fib[-2]是倒数第二项，它们的和就是新的一项。'
      },
      practice: [
        {
          question: '斐波那契数列的递推式是什么？',
          answer: '第n项 = 第(n-1)项 + 第(n-2)项'
        },
        {
          question: '斐波那契数列的前两项是什么？',
          answer: '1, 1'
        }
      ]
    },

    medium: {
      story: '用负数索引可以方便地获取列表末尾的元素！fib[-1]就是最后一个元素，fib[-2]是倒数第二个！',
      concept: '列表负数索引从-1开始，-1是最后一个元素，-2是倒数第二个，依此类推。在计算斐波那契时非常方便。',
      syntax: "# 负数索引\nnums = [1, 2, 3, 4, 5]\n\nnums[-1]  # 5 (最后一个)\nnums[-2]  # 4 (倒数第二个)\nnums[-3]  # 3 (倒数第三个)\n\n# 计算斐波那契\nnext_fib = fib[-1] + fib[-2]",
      example: {
        title: '负数索引',
        code: "nums = [10, 20, 30, 40, 50]\n\nprint(nums[-1])  # 50\nprint(nums[-2])  # 40\nprint(nums[-1] + nums[-2])  # 90\n\n# 斐波那契应用\nfib = [1, 1]\nfor i in range(5):\n    fib.append(fib[-1] + fib[-2])\nprint(fib)  # [1, 1, 2, 3, 5, 8, 13]",
        output: '50 40 90 [1, 1, 2, 3, 5, 8, 13]',
        explanation: '负数索引让代码更简洁，不需要计算len(nums)-1。'
      },
      practice: [
        {
          question: 'nums[-1]是什么？',
          answer: '列表最后一个元素'
        },
        {
          question: 'nums[-3]是什么？',
          answer: '列表倒数第三个元素'
        }
      ]
    },

    hard: {
      story: '斐波那契数列在自然界中无处不在！向日葵的种子排列、贝壳的螺旋、树枝的分叉都遵循斐波那契规律！',
      concept: '斐波那契数列有很多有趣的性质：相邻两项的比值趋近黄金分割比(1.618...)，在自然界和艺术中广泛存在。',
      syntax: "# 斐波那契的数学性质\n# F[n] / F[n-1] -> 黄金分割比 1.618...\n\nfib = [1, 1]\nfor i in range(20):\n    fib.append(fib[-1] + fib[-2])\n\n# 计算比值\nratio = fib[-1] / fib[-2]\nprint(f'比值: {ratio:.6f}')  # 约等于 1.618",
      example: {
        title: '黄金分割比',
        code: "fib = [1, 1]\nfor i in range(15):\n    fib.append(fib[-1] + fib[-2])\n\nprint('斐波那契数列:', fib)\n\n# 计算相邻项比值\nfor i in range(2, len(fib)):\n    ratio = fib[i] / fib[i-1]\n    print(f'{fib[i]}/{fib[i-1]} = {ratio:.4f}')",
        output: '比值逐渐趋近1.618（黄金分割比）',
        explanation: '斐波那契数列相邻项的比值趋近黄金分割比φ≈1.618。'
      },
      practice: [
        {
          question: '斐波那契数列相邻项的比值趋近什么？',
          answer: '黄金分割比 (约1.618)'
        },
        {
          question: '为什么斐波那契数列又叫"兔子数列"？',
          answer: '因为它模拟了兔子繁殖的数量变化'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '列表负数索引',
    emoji: '🔄',
    gradeLevel: '3-4',
    summary: '用负数从列表末尾访问元素',

    easy: {
      story: '正常索引从0开始（0, 1, 2...），负数索引从-1开始（-1, -2, -3...），-1就是最后一个！',
      concept: '负数索引是从列表末尾开始计数的方式。-1表示最后一个元素，-2表示倒数第二个，-3表示倒数第三个，依此类推。',
      syntax: "# 正数索引：从前往后\n# nums[0]  第1个\n# nums[1]  第2个\n# nums[2]  第3个\n\n# 负数索引：从后往前\n# nums[-1] 最后一个\n# nums[-2] 倒数第2个\n# nums[-3] 倒数第3个",
      example: {
        title: '正负索引对比',
        code: "fruits = ['apple', 'banana', 'cherry', 'date']\n\n# 正数索引\nprint(fruits[0])   # apple\nprint(fruits[3])   # date\n\n# 负数索引\nprint(fruits[-1])  # date (最后一个)\nprint(fruits[-4])  # apple (倒数第4个=第1个)",
        output: 'apple date date apple',
        explanation: 'fruits[-1]等同于fruits[len(fruits)-1]。'
      },
      practice: [
        {
          question: '列表[1,2,3]的-1索引是什么？',
          answer: '3（最后一个元素）'
        },
        {
          question: '负数索引从几开始？',
          answer: '-1'
        }
      ]
    },

    medium: {
      story: '负数索引在不知道列表长度时特别有用！获取最后一个元素用nums[-1]，比用nums[len(nums)-1]简洁多了！',
      concept: '负数索引常用于：获取最后一个元素、获取最后N个元素、实现循环队列等场景。让代码更简洁易读。',
      syntax: "# 获取最后一个元素\nlast = nums[-1]\n\n# 获取最后两个元素\nlast_two = nums[-2:]\n\n# 获取最后三个元素\nlast_three = nums[-3:]\n\n# 列表切片结合负数\nnums[-3:-1]  # 倒数第3到倒数第2（不含最后）",
      example: {
        title: '获取末尾元素',
        code: "scores = [85, 90, 78, 92, 88]\n\n# 获取最后一个分数\nlast = scores[-1]\nprint(f'最新分数: {last}')\n\n# 获取最近3次分数\nrecent = scores[-3:]\nprint(f'最近3次: {recent}')\n\n# 比较最后两次\nif scores[-1] > scores[-2]:\n    print('进步了！')",
        output: '显示最新分数和最近3次，比较进步情况',
        explanation: '负数索引和切片结合，轻松获取末尾数据。'
      },
      practice: [
        {
          question: '如何获取列表最后3个元素？',
          answer: 'nums[-3:]'
        },
        {
          question: 'nums[-1]和nums[len(nums)-1]效果一样吗？',
          answer: '一样，但nums[-1]更简洁'
        }
      ]
    },

    hard: {
      story: '负数索引可以用于切片！nums[-3:-1]获取倒数第3到倒数第2个元素（不含最后一个）。这在数据处理中很常用！',
      concept: '负数索引可以用于切片，格式是nums[开始:结束]。负数切片规则和正数一样：包含开始，不包含结束。',
      syntax: "# 负数切片\nnums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\n\nnums[-3:]    # [7, 8, 9] 最后3个\nnums[:-3]    # [0,1,2,3,4,5,6] 除最后3个\nnums[-5:-2]  # [5, 6, 7] 倒数第5到倒数第3\nnums[-3:-1]  # [7, 8] 倒数第3到倒数第2",
      example: {
        title: '负数切片应用',
        code: "logs = ['log1', 'log2', 'log3', 'log4', 'log5', 'log6']\n\n# 获取最近的日志\nrecent = logs[-3:]\nprint(f'最近3条: {recent}')\n\n# 获取中间的日志（去掉首尾各2条）\nmiddle = logs[2:-2]\nprint(f'中间部分: {middle}')\n\n# 获取除最后一条外的所有\nall_but_last = logs[:-1]\nprint(f'除最后: {all_but_last}')",
        output: '最近3条: [log4, log5, log6] 中间部分: [log3, log4] 除最后: [log1, log2, log3, log4, log5]',
        explanation: '负数切片让代码更直观，不需要计算长度。'
      },
      practice: [
        {
          question: 'nums[-3:-1]包含最后几个元素？',
          answer: '不包含最后1个，包含倒数第3和第2'
        },
        {
          question: 'nums[:-1]和nums[0:-1]一样吗？',
          answer: '一样，都是除最后一个外的所有元素'
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
    mathConcept: '递推概念',
    question: '递推是什么？',
    options: [
      '从后往前计算',
      '根据规律从前一项推算后一项',
      '随机生成数字',
      '按大小排序'
    ],
    answer: 1,
    explanation: '递推是一种计算方法，根据已知的项和变化规律，一步一步推算出后面的项。',
    hint: '递推是"推导"'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '负数索引',
    question: '列表nums = [1,2,3,4,5]，nums[-1]是什么？',
    options: [
      '1',
      '3',
      '5',
      '-1'
    ],
    answer: 2,
    explanation: '负数索引-1表示最后一个元素，nums[-1]就是5。',
    hint: '-1是最后一个'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '斐波那契',
    question: '斐波那契数列1,1,2,3,5,8,...，下一项是多少？',
    options: [
      '10',
      '11',
      '13',
      '15'
    ],
    answer: 2,
    explanation: '斐波那契数列每个数是前两个数之和，5+8=13。',
    hint: '下一项 = 最后两项之和'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '负数索引',
    question: '列表nums = [10,20,30,40,50]，nums[-2] + nums[-1]是多少？',
    options: [
      '30',
      '60',
      '90',
      '80'
    ],
    answer: 2,
    explanation: 'nums[-2]=40，nums[-1]=50，40+50=90。',
    hint: '-2是倒数第二个，-1是最后一个'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '递推计算',
    question: '数列：2, 4, 8, 16, ...（每项是前一项的2倍），第6项是多少？',
    options: [
      '32',
      '48',
      '64',
      '128'
    ],
    answer: 2,
    explanation: '第1项2，第2项4，第3项8，第4项16，第5项32，第6项64。',
    hint: '2, 4, 8, 16, 32, 64'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '切片理解',
    question: '列表nums = [1,2,3,4,5,6]，nums[-4:-1]的结果是什么？',
    options: [
      '[3, 4, 5]',
      '[3, 4, 5, 6]',
      '[4, 5]',
      '[2, 3, 4]'
    ],
    answer: 0,
    explanation: '-4是倒数第4个(3)，-1是倒数第1个(6)，切片[开始:结束)不包含结束，所以是[3,4,5]。',
    hint: '切片不包含结束位置'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L15-1',
  title: '神奇的数列',
  subtitle: '学会递推思想和斐波那契数列',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解递推的概念和方法',
    '掌握斐波那契数列的规律',
    '学会列表的负数索引',
    '能用代码生成递推数列'
  ],
  prerequisites: [
    'Python列表基础',
    'for循环',
    '基本的数学运算'
  ]
}

// 打字练习单词（按难度分组，纯英文）
export const typingWords = {
  easy: ['food', 'card', 'next', 'feed'],
  medium: ['number', 'sequence', 'index', 'start'],
  hard: ['fibonacci', 'negative', 'recursion', 'pattern']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'nums[-1]',
    'nums[-2]',
    'fib = [1, 1]',
    'next_num = nums[-1] * 2'
  ],
  medium: [
    'fib.append(fib[-1] + fib[-2])',
    'for i in range(5):\n    next_val = nums[-1] * 2\n    nums.append(next_val)',
    'last_three = nums[-3:]',
    'if nums[-1] > nums[-2]:\n    print("increasing")'
  ],
  hard: [
    'def fibonacci(n):\n    fib = [1, 1]\n    for i in range(n-2):\n        fib.append(fib[-1] + fib[-2])\n    return fib',
    'nums[-4:-1]  # 倒数第4到倒数第2',
    'ratio = fib[-1] / fib[-2]'
  ]
}

// 导出所有数据
export const L15_1_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L15_1_data
