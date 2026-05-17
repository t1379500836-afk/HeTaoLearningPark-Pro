/**
 * PY1 课程 L6-2: 列表索引
 *
 * 核心知识点:
 * 1. 列表索引 - 从0开始
 * 2. 通过索引访问元素 - list[i]
 * 3. 通过索引修改元素 - list[i] = value
 * 4. 遍历列表 - for i in range(len(list))
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'defend',
    pronunciation: '[dɪˈfend]',
    partOfSpeech: 'v.',
    meaning: '防御；防守',
    level: 'medium',
    example: 'Defend the country.',
    exampleTranslation: '保卫国家。',
    source: 'ocr'
  },
  {
    word: 'height',
    pronunciation: '[haɪt]',
    partOfSpeech: 'n.',
    meaning: '高度；身高',
    level: 'medium',
    example: 'Measure the height.',
    exampleTranslation: '测量高度。',
    source: 'ocr'
  },
  {
    word: 'random',
    pronunciation: '[ˈrændəm]',
    partOfSpeech: 'adj.',
    meaning: '随机的',
    level: 'medium',
    example: 'Random number.',
    exampleTranslation: '随机数。',
    source: 'ocr'
  },
  {
    word: 'family',
    pronunciation: '[ˈfæməlɪ]',
    partOfSpeech: 'n.',
    meaning: '家庭',
    level: 'easy',
    example: 'Family reunion.',
    exampleTranslation: '家庭聚会。',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'index',
    pronunciation: '[ˈɪndeks]',
    partOfSpeech: 'n.',
    meaning: '索引',
    level: 'medium',
    example: 'Index of the list.',
    exampleTranslation: '列表的索引。',
    source: 'extended'
  },
  {
    word: 'modify',
    pronunciation: '[ˈmɒdɪfaɪ]',
    partOfSpeech: 'v.',
    meaning: '修改',
    level: 'medium',
    example: 'Modify the data.',
    exampleTranslation: '修改数据。',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '列表索引',
    emoji: '🔢',
    gradeLevel: '3-4',
    summary: '索引是元素在列表中的位置编号',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '列表索引就像电影院座位号，从 0 开始数。第一个人坐的位子是 0 号，不是 1 号。',
      concept: '列表索引从 0 开始，第一个元素的索引是 0，第二个是 1，以此类推。',
      syntax: `fruits = ['苹果', '香蕉', '橙子']
fruits[0]  # '苹果'
fruits[1]  # '香蕉'
fruits[2]  # '橙子'`,
      example: {
        title: '索引访问',
        code: `fruits = ['苹果', '香蕉', '橙子']
print(fruits[0])
print(fruits[1])
print(fruits[2])`,
        output: '苹果\n香蕉\n橙子',
        explanation: 'fruits[0] 是第一个元素 "苹果"，fruits[1] 是第二个，"香蕉"，fruits[2] 是第三个，"橙子"。'
      },
      practice: [
        {
          question: 'fruits = ["a", "b", "c"]，fruits[1] 是什么？',
          answer: '"b"'
        },
        {
          question: '列表索引从哪里开始？',
          answer: '0'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '可以用 len() 得到列表长度，最大索引是长度减 1。',
      concept: 'len(list) 返回列表长度，最大索引是 len(list) - 1。',
      syntax: `fruits = ['苹果', '香蕉', '橙子']
len(fruits)      # 3
fruits[len(fruits)-1]  # '橙子' 最后一个`,
      example: {
        title: '索引范围',
        code: `fruits = ['苹果', '香蕉', '橙子']
print('长度:', len(fruits))
print('最大索引:', len(fruits)-1)
print('最后一个:', fruits[len(fruits)-1])`,
        output: '长度: 3\n最大索引: 2\n最后一个: 橙子',
        explanation: '长度是 3，最大索引是 2（因为从 0 开始）。获取最后一个元素用 fruits[len(fruits)-1]。'
      },
      practice: [
        {
          question: 'len(["a", "b", "c"]) 返回多少？',
          answer: '3'
        },
        {
          question: '如何获取列表的最后一个元素？',
          answer: 'list[len(list)-1] 或 list[-1]'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '索引越界会报错，要确保索引在有效范围内（0 到 len-1）。',
      concept: '访问超出范围的索引会报错。可以用条件检查防止越界。',
      syntax: `# 越界会报错
fruits = ['苹果', '香蕉']
print(fruits[2])  # 报错！`,
      example: {
        title: '越界错误',
        code: `fruits = ['苹果', '香蕉']
if len(fruits) > 2:
    print(fruits[2])
else:
    print('索引超出范围')`,
        output: '索引超出范围',
        explanation: '列表只有 2 个元素，最大索引是 1。访问索引 2 会越界，所以先检查长度。'
      },
      practice: [
        {
          question: '列表有 3 个元素，最大索引是多少？',
          answer: '2'
        },
        {
          question: '访问超出范围的索引会怎样？',
          answer: '报错'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '修改列表元素',
    emoji: '✏️',
    gradeLevel: '3-4',
    summary: '通过索引修改指定位置的元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '修改列表元素就像换货架上的商品，通过位置编号找到它，然后换成新的。',
      concept: '列表[索引] = 新值 可以修改指定位置的元素。',
      syntax: `fruits[0] = '草莓'`,
      example: {
        title: '修改元素',
        code: `fruits = ['苹果', '香蕉', '橙子']
print('修改前:', fruits)
fruits[1] = '草莓'
print('修改后:', fruits)`,
        output: "修改前: ['苹果', '香蕉', '橙子']\n修改后: ['苹果', '草莓', '橙子']",
        explanation: 'fruits[1] = "草莓" 把索引为 1 的元素从"香蕉"改成"草莓"。'
      },
      practice: [
        {
          question: '如何把列表第二个元素改成 "葡萄"？',
          answer: 'list[1] = "葡萄"'
        },
        {
          question: '修改元素会改变列表的长度吗？',
          answer: '不会'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '可以在遍历时修改列表元素，但要小心索引范围。',
      concept: '用 for i in range(len(list)) 遍历，然后用 list[i] 修改。',
      syntax: `for i in range(len(fruits)):
    fruits[i] = '新值'`,
      example: {
        title: '遍历修改',
        code: `fruits = ['苹果', '香蕉', '橙子']
for i in range(len(fruits)):
    fruits[i] = '水果' + str(i)
print(fruits)`,
        output: "['水果0', '水果1', '水果2']",
        explanation: '遍历 3 次，每次把列表元素改成"水果"加上索引。'
      },
      practice: [
        {
          question: '遍历修改用什么循环？',
          answer: 'for i in range(len(list))'
        },
        {
          question: '如何把列表所有元素都改成 "苹果"？',
          answer: 'for i in range(len(list)): list[i] = "苹果"'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '可以根据条件修改特定元素，比如把所有 "苹果" 改成 "草莓"。',
      concept: '遍历检查每个元素，符合条件才修改。',
      syntax: `for i in range(len(fruits)):
    if fruits[i] == '苹果':
        fruits[i] = '草莓'`,
      example: {
        title: '条件修改',
        code: `fruits = ['苹果', '香蕉', '苹果', '橙子']
for i in range(len(fruits)):
    if fruits[i] == '苹果':
        fruits[i] = '草莓'
print(fruits)`,
        output: "['草莓', '香蕉', '草莓', '橙子']",
        explanation: '遍历列表，把所有"苹果"改成"草莓"。'
      },
      practice: [
        {
          question: '如何把所有 "香蕉" 改成 "葡萄"？',
          answer: '遍历检查 if list[i] == "香蕉": list[i] = "葡萄"'
        },
        {
          question: '条件修改的好处是什么？',
          answer: '可以精确修改符合条件的数据'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '列表遍历方式',
    emoji: '🔄',
    gradeLevel: '3-4',
    summary: '两种遍历列表的方式对比',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '遍历列表有两种方式：一种是直接取元素 for x in list，另一种是用索引 for i in range(len())。',
      concept: 'for x in list 直接取元素，for i in range(len(list)) 用索引取元素。',
      syntax: `# 方式1：直接取元素
for fruit in fruits:
    print(fruit)

# 方式2：用索引
for i in range(len(fruits)):
    print(fruits[i])`,
      example: {
        title: '两种遍历',
        code: `fruits = ['苹果', '香蕉', '橙子']
print('方式1：')
for f in fruits:
    print(f)
print('方式2：')
for i in range(len(fruits)):
    print(fruits[i])`,
        output: '方式1：\n苹果\n香蕉\n橙子\n方式2：\n苹果\n香蕉\n橙子',
        explanation: '两种方式都能遍历列表，第一种更简洁，第二种可以访问索引。'
      },
      practice: [
        {
          question: '两种遍历方式哪种更简洁？',
          answer: 'for x in list'
        },
        {
          question: '哪种遍历方式可以修改元素？',
          answer: 'for i in range(len(list))'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '方式1简单但不能修改元素，方式2可以用索引修改。',
      concept: '需要修改列表元素时，必须用索引方式遍历。',
      syntax: `# 不能修改元素
for f in fruits:
    f = '新值'  # 不影响列表

# 可以修改元素
for i in range(len(fruits)):
    fruits[i] = '新值'  # 影响了列表`,
      example: {
        title: '修改对比',
        code: `fruits = ['苹果', '香蕉', '橙子']
print('尝试方式1修改：')
for f in fruits:
    f = '草莓'
print(fruits)

print('方式2修改：')
for i in range(len(fruits)):
    fruits[i] = '草莓'
print(fruits)`,
        output: "尝试方式1修改：['苹果', '香蕉', '橙子']\n方式2修改：['草莓', '草莓', '草莓']",
        explanation: '方式1修改变量 f，不影响列表。方式2用索引直接修改列表元素。'
      },
      practice: [
        {
          question: '为什么方式1不能修改列表？',
          answer: '因为修改的是循环变量副本，不是原列表'
        },
        {
          question: '什么情况下必须用索引遍历？',
          answer: '需要修改列表元素时'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '根据场景选择遍历方式：只需要读取用方式1，需要修改用方式2。',
      concept: '理解两种方式的区别和适用场景。',
      syntax: `# 只需要读取输出
for item in items:
    print(item)

# 需要修改元素
for i in range(len(items)):
    items[i] = new_value`,
      example: {
        title: '选择合适的遍历',
        code: `# 打印所有元素（只用读取）
fruits = ['苹果', '香蕉', '橙子']
for f in fruits:
    print(f)

# 把所有元素改成大写（需要修改）
nums = ['a', 'b', 'c']
for i in range(len(nums)):
    nums[i] = nums[i].upper()
print(nums)`,
        output: '苹果\n香蕉\n橙子\nA\nB\nC',
        explanation: '打印用方式1简洁，修改用方式2方便。'
      },
      practice: [
        {
          question: '什么情况用 for x in list？',
          answer: '只需要读取数据时'
        },
        {
          question: '什么情况用 for i in range(len(list))？',
          answer: '需要修改列表元素时'
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
    mathConcept: '索引理解',
    question: `fruits = ['红', '黄', '蓝', '绿']，要取出 '绿' 应该用？`,
    options: [
      'fruits[4]',
      'fruits[3]',
      'fruits[2]',
      'fruits[1]'
    ],
    answer: 1,
    explanation: '列表索引从 0 开始，所以 "红"=0，"黄"=1，"蓝"=2，"绿"=3。fruits[3] 才是"绿"。答案是 B。',
    hint: '索引从0开始，绿是第4个'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '元素修改',
    question: `执行以下代码后，fruits 是什么？\n\n\`\`\`python\nfruits = ['苹果', '香蕉']\nfruits[0] = '草莓'\nprint(fruits)\n\`\`\``,
    options: [
      "['草莓', '香蕉']",
      "['苹果', '草莓']",
      "['苹果', '香蕉']",
      "['草莓', '苹果']"
    ],
    answer: 0,
    explanation: 'fruits[0] = "草莓" 把第一个元素从"苹果"改成"草莓"，所以结果是 ["草莓", "香蕉"]。答案是 A。',
    hint: '修改索引0的元素'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '获取元素',
    question: `fruits = ['苹果', '香蕉', '橙子']，如何获取最后一个元素？`,
    options: [
      'fruits[3]',
      'fruits[2]',
      'fruits[len(fruits)]',
      'fruits[-1]'
    ],
    answer: 3,
    explanation: 'fruits[-1] 是倒数第一个元素，也就是最后一个。"橙子"。fruits[3] 会越界。答案是 D。',
    hint: '负数索引从-1开始'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '遍历方式',
    question: `以下哪个可以修改列表元素？`,
    options: [
      'for x in list: x = 5',
      'for x in list: print(x)',
      'for i in range(len(list)): list[i] = 5',
      'for x in list: list.append(x)'
    ],
    answer: 2,
    explanation: '只有用索引方式 for i in range(len(list)): list[i] = 5 才能修改列表元素。方式1修改变量副本不影响列表。答案是 C。',
    hint: '修改需要用索引'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '遍历修改',
    question: `执行以下代码后，nums 是什么？\n\n\`\`\`python\nnums = [1, 2, 3, 4]\nfor i in range(len(nums)):\n    nums[i] = nums[i] * 2\nprint(nums)\n\`\`\``,
    options: [
      '[1, 2, 3, 4]',
      '[2, 4, 6, 8]',
      '[1, 4, 9, 16]',
      '报错'
    ],
    answer: 1,
    explanation: '遍历列表，每个元素乘以 2。1*2=2，2*2=4，3*2=6，4*2=8，结果是 [2, 4, 6, 8]。答案是 B。',
    hint: '每个元素乘以2'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '条件修改',
    question: `执行以下代码后，fruits 是什么？\n\n\`\`\`python\nfruits = ['苹果', '香蕉', '苹果']\nfor i in range(len(fruits)):\n    if fruits[i] == '苹果':\n        fruits[i] = '草莓'\nprint(fruits)\n\`\`\``,
    options: [
      "['草莓', '香蕉', '苹果']",
      "['苹果', '香蕉', '草莓']",
      "['草莓', '香蕉', '草莓']",
      "['苹果', '香蕉', '苹果']"
    ],
    answer: 2,
    explanation: '遍历列表，第一个是"苹果"改成"草莓"，第二个"香蕉"不变，第三个"苹果"改成"草莓"。答案是 C。',
    hint: '两个"苹果"都会被改成"草莓"'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L6-2',
  title: '列表索引',
  subtitle: '用索引访问和修改列表',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解列表索引从0开始',
    '能用索引访问列表元素',
    '能用索引修改列表元素',
    '掌握两种遍历列表的方式'
  ],
  prerequisites: [
    '理解列表创建',
    '知道 for 循环',
    '知道 len() 函数'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['defend', 'height', 'random', 'family'],
  medium: ['index', 'modify', 'change', 'update'],
  hard: ['traverse', 'iteration', 'subscript', 'element']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    "fruits[0]",
    "fruits[1]",
    "fruits[-1]",
    'len(fruits)'
  ],
  medium: [
    "fruits[len(fruits)-1]",
    "fruits[0] = '新值'",
    "for i in range(len(fruits)):\n    print(fruits[i])",
    "fruits[i] = '草莓'"
  ],
  hard: [
    "for i in range(len(fruits)):\n    fruits[i] = '新值'",
    "for i in range(len(fruits)):\n    if fruits[i] == '苹果':\n        fruits[i] = '草莓'",
    "for i in range(len(nums)):\n    nums[i] = nums[i] * 2",
    "for i in range(len(items)):\n    if items[i] > 10:\n        items[i] = 10"
  ]
}

// 导出所有数据
export const L6_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L6_2_data