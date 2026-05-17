/**
 * PY1 课程 L6-4: 今天吃什么
 *
 * 核心知识点:
 * 1. random.choice() - 随机选择列表元素
 * 2. import random - 导入随机工具箱
 * 3. not in - 判断元素不在列表中
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'import',
    pronunciation: '[ɪmˈpɔːt]',
    partOfSpeech: 'v.',
    meaning: '导入；输入',
    level: 'medium',
    example: 'Import the file.',
    exampleTranslation: '导入文件。',
    source: 'ocr'
  },
  {
    word: 'menu',
    pronunciation: '[ˈmenjuː]',
    partOfSpeech: 'n.',
    meaning: '菜单',
    level: 'easy',
    example: 'Restaurant menu.',
    exampleTranslation: '餐厅菜单。',
    source: 'ocr'
  },
  {
    word: 'choice',
    pronunciation: '[tʃɔɪs]',
    partOfSpeech: 'n.',
    meaning: '选择',
    level: 'easy',
    example: 'Make a choice.',
    exampleTranslation: '做出选择。',
    source: 'ocr'
  },
  {
    word: 'vegetable',
    pronunciation: '[ˈvedʒtəbl]',
    partOfSpeech: 'n.',
    meaning: '蔬菜',
    level: 'easy',
    example: 'Fresh vegetables.',
    exampleTranslation: '新鲜蔬菜。',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'random',
    pronunciation: '[ˈrændəm]',
    partOfSpeech: 'adj.',
    meaning: '随机的',
    level: 'medium',
    example: 'Random number.',
    exampleTranslation: '随机数。',
    source: 'extended'
  },
  {
    word: 'shuffle',
    pronunciation: '[ˈʃʌfl]',
    partOfSpeech: 'v.',
    meaning: '洗牌；打乱顺序',
    level: 'hard',
    example: 'Shuffle the cards.',
    exampleTranslation: '洗牌。',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '随机选择 - random.choice()',
    emoji: '🎲',
    gradeLevel: '3-4',
    summary: '从列表中随机选择一个元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'random.choice() 就像抓阄，从列表中随便选一个。就像决定今天吃什么一样，随机选一道菜。',
      concept: 'random.choice(列表) 从列表中随机选择一个元素。',
      syntax: `import random
random.choice(['苹果', '香蕉', '橙子'])`,
      example: {
        title: '随机选水果',
        code: `import random
fruits = ['苹果', '香蕉', '橙子']
choice = random.choice(fruits)
print('今天吃:', choice)`,
        output: '今天吃: 苹果\n（每次运行结果可能不同）',
        explanation: 'random.choice() 从列表中随机挑选一个元素。'
      },
      practice: [
        {
          question: '如何从列表中随机选一个？',
          answer: 'random.choice(列表)'
        },
        {
          question: '使用 random.choice 需要什么？',
          answer: 'import random'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'random.choice 每次只选一个，连续选择可以得到多个随机结果。',
      concept: '可以多次调用 random.choice 来选择多个元素。',
      syntax: `for i in range(3):
    print(random.choice(items))`,
      example: {
        title: '多次选择',
        code: `import random
fruits = ['苹果', '香蕉', '橙子', '葡萄']
for i in range(3):
    print('随机选:', random.choice(fruits))`,
        output: '随机选: 橙子\n随机选: 苹果\n随机选: 香蕉',
        explanation: '循环 3 次，每次随机选一个水果。'
      },
      practice: [
        {
          question: '如何随机选两个水果？',
          answer: '连续调用 random.choice() 两次'
        },
        {
          question: 'random.choice 每次选择后列表会变吗？',
          answer: '不会，列表保持不变'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '可以选择后从列表中移除，避免重复选择。',
      concept: '选择后用 remove() 移除，或者用 random.shuffle() 打乱顺序。',
      syntax: `import random
items = [1, 2, 3, 4, 5]
random.shuffle(items)  # 打乱顺序
print(items)`,
      example: {
        title: '打乱顺序',
        code: `import random
nums = [1, 2, 3, 4, 5]
random.shuffle(nums)
print('打乱后:', nums)`,
        output: '打乱后: [3, 1, 5, 2, 4]',
        explanation: 'shuffle() 直接打乱原列表，不返回新列表。'
      },
      practice: [
        {
          question: 'shuffle 和 choice 有什么区别？',
          answer: 'shuffle 打乱整个列表，choice 只选一个'
        },
        {
          question: '如何避免 random.choice 选到重复的？',
          answer: '选择后用 remove() 移除'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: 'not in 判断',
    emoji: '❌',
    gradeLevel: '3-4',
    summary: '判断元素是否不在列表中',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'not in 就是"不在里面"，用来检查某个东西是不是不在列表中。',
      concept: '元素 not in 列表 返回 True（不在）或 False（在）。',
      syntax: `'苹果' not in ['香蕉', '橙子']  # True
'苹果' not in ['苹果', '香蕉']  # False`,
      example: {
        title: 'not in 判断',
        code: `fruits = ['苹果', '香蕉', '橙子']
print('苹果在吗?', '苹果' in fruits)
print('葡萄在吗?', '葡萄' in fruits)
print('苹果不在?', '苹果' not in fruits)
print('葡萄不在?', '葡萄' not in fruits)`,
        output: '苹果在吗? True\n葡萄在吗? False\n苹果不在? False\n葡萄不在? True',
        explanation: 'in 检查存在，not in 检查不存在。'
      },
      practice: [
        {
          question: '"香蕉" not in ["苹果", "香蕉"] 结果是？',
          answer: 'False'
        },
        {
          question: '"葡萄" not in ["苹果", "香蕉"] 结果是？',
          answer: 'True'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '可以用 not in 来避免选择重复的元素。',
      concept: '选择前检查是否已经选过，如果选过就换一个。',
      syntax: `if item not in selected:
    selected.append(item)`,
      example: {
        title: '避免重复选择',
        code: `import random
fruits = ['苹果', '香蕉', '橙子']
selected = []
for i in range(2):
    while True:
        f = random.choice(fruits)
        if f not in selected:
            selected.append(f)
            break
print('已选:', selected)`,
        output: '已选: [\'苹果\', \'橙子\']',
        explanation: '选之前检查是否已经选过，如果选过就重新选。'
      },
      practice: [
        {
          question: '为什么需要 not in 来避免重复？',
          answer: 'random.choice 可能选中之前已经选过的元素'
        },
        {
          question: '如何实现不重复的选择？',
          answer: '用列表记录已选择的，检查 not in'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '结合输入和 not in，可以实现用户定制选择。',
      concept: '用户输入想要的数量，从列表中随机选择对应数量。',
      syntax: `n = int(input())
for i in range(n):
    f = random.choice(fruits)
    if f not in selected:
        selected.append(f)`,
      example: {
        title: '用户定制数量',
        code: `import random
fruits = ['苹果', '香蕉', '橙子', '葡萄', '草莓']
selected = []
n = 3
for i in range(n):
    while True:
        f = random.choice(fruits)
        if f not in selected:
            selected.append(f)
            break
print('选择的', n, '个水果:', selected)`,
        output: '选择的 3 个水果: [\'橙子\', \'草莓\', \'香蕉\']',
        explanation: '用户输入数量，循环选择不重复的水果。'
      },
      practice: [
        {
          question: '如何实现从列表中随机选 2 个不重复的？',
          answer: '循环2次，用 not in 检查避免重复'
        },
        {
          question: '为什么要用 while True 循环？',
          answer: '因为可能选到重复的，需要重新选'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '项目实践 - 今天吃什么',
    emoji: '🍽️',
    gradeLevel: '3-4',
    summary: '综合应用随机选择实现点菜程序',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '今天吃什么？可以用 random.choice 来随机决定！',
      concept: '创建一个菜单列表，用 random.choice 随机选一个。',
      syntax: `menu = ['宫保鸡丁', '鱼香肉丝', '番茄炒蛋']
print(random.choice(menu))`,
      example: {
        title: '随机点菜',
        code: `import random
menu = ['宫保鸡丁', '鱼香肉丝', '番茄炒蛋']
print('今天吃:', random.choice(menu))`,
        output: '今天吃: 鱼香肉丝',
        explanation: '简单的随机点菜程序。'
      },
      practice: [
        {
          question: 'random.choice 需要什么导入？',
          answer: 'import random'
        },
        {
          question: '如何增加更多菜品到菜单？',
          answer: '往列表里添加更多字符串'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '可以把菜单分成荤菜和素菜，荤素搭配选择。',
      concept: '用两个列表分别存荤菜和素菜，分别选择。',
      syntax: `meat = ['糖醋排骨', '红烧肉']
veg = ['清炒时蔬', '凉拌黄瓜']
print('荤菜:', random.choice(meat))
print('素菜:', random.choice(veg))`,
      example: {
        title: '荤素搭配',
        code: `import random
meat = ['糖醋排骨', '红烧肉', '宫保鸡丁']
veg = ['清炒时蔬', '凉拌黄瓜', '番茄炒蛋']
print('今日推荐:')
print('荤菜:', random.choice(meat))
print('素菜:', random.choice(veg))`,
        output: '今日推荐:\n荤菜: 红烧肉\n素菜: 番茄炒蛋',
        explanation: '荤素搭配，一荤一素营养好。'
      },
      practice: [
        {
          question: '荤素搭配用什么分开存储？',
          answer: '两个列表'
        },
        {
          question: '如何从荤菜和素菜各选一个？',
          answer: 'random.choice(meat) 和 random.choice(veg)'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '可以让用户输入想选几个菜，然后随机选择不重复的菜品。',
      concept: '用户输入数量，去重选择，然后打印菜单。',
      syntax: `n = int(input())
while len(selected) < n:
    c = random.choice(menu)
    if c not in selected:
        selected.append(c)`,
      example: {
        title: '完整点菜程序',
        code: `import random
menu = ['糖醋排骨', '红烧肉', '宫保鸡丁', '清炒时蔬', '凉拌黄瓜', '番茄炒蛋']
selected = []
n = int(input('想选几个菜?:'))
while len(selected) < n:
    c = random.choice(menu)
    if c not in selected:
        selected.append(c)
print('今日菜单:', selected)`,
        output: '想选几个菜?: 3\n今日菜单: [\'宫保鸡丁\', \'凉拌黄瓜\', \'糖醋排骨\']',
        explanation: '用户输入数量，程序随机选出不重复的菜品。'
      },
      practice: [
        {
          question: '用户输入后如何确保选出不重复的？',
          answer: '用 not in 检查，已选过就重新选'
        },
        {
          question: 'while len(selected) < n 是什么循环？',
          answer: '当已选数量不足时继续选'
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
    mathConcept: '随机选择',
    question: '如何从 fruits 列表中随机选一个水果？',
    options: [
      'random.choice(fruits)',
      'choice.random(fruits)',
      'fruits.random()',
      'random(fruits)'
    ],
    answer: 0,
    explanation: '正确格式是 random.choice(列表)，需要先 import random。答案是 A。',
    hint: 'random.choice 是正确格式'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: 'in 判断',
    question: `"葡萄" in ['苹果', '香蕉'] 的结果是？`,
    options: [
      'True',
      'False',
      '葡萄苹果',
      '报错'
    ],
    answer: 1,
    explanation: '"葡萄" 不在列表中，所以返回 False。答案是 B。',
    hint: 'in 检查是否在列表中'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: 'not in 判断',
    question: `"苹果" not in ['苹果', '香蕉'] 的结果是？`,
    options: [
      'True',
      'False',
      '苹果',
      '香蕉'
    ],
    answer: 1,
    explanation: '"苹果" 在列表中，所以 not in 返回 False。答案是 B。',
    hint: 'not in 检查是否不在列表中'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '避免重复',
    question: '如何避免 random.choice 选到重复的？',
    options: [
      '直接多次调用 random.choice',
      '用列表记录已选过的，检查 not in',
      '选完一个就从列表删除',
      '用 for 循环代替 while 循环'
    ],
    answer: 1,
    explanation: '用列表记录已选择的，每次选之前检查是否已选过。答案是 B。',
    hint: '记录已选择的，用 not in 检查'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合应用',
    question: `执行以下代码，输入 3，输出是？\n\n\`\`\`python\nfruits = ['苹果', '香蕉', '橙子', '葡萄']\nfor i in range(3):\n    c = random.choice(fruits)\n    print(c)\n# （假设随机选到：苹果、香蕉、橙子）\n\`\`\``,
    options: [
      '苹果 香蕉 橙子 葡萄',
      '苹果 香蕉 橙子',
      '苹果 苹果 苹果',
      '3'
    ],
    answer: 1,
    explanation: '循环 3 次，每次随机选一个并打印。如果正好选到苹果、香蕉、橙子，就打印这三个。答案是 B。',
    hint: '循环3次选3个'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '去重选择',
    question: `如何从 5 个水果中选 3 个不重复的？
fruits = ['苹果', '香蕉', '橙子', '葡萄', '草莓']`,
    options: [
      '直接用 random.choice 选 3 次',
      '选一个就从列表中删除',
      '用 not in 检查已选过的，避免重复',
      '用 for 循环选 3 个'
    ],
    answer: 2,
    explanation: '关键是避免重复，可以用 not in 检查是否已经选过。答案是 C。',
    hint: '需要去重机制'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L6-4',
  title: '今天吃什么',
  subtitle: '随机选择与项目实践',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握 random.choice() 随机选择',
    '理解 import random 的用法',
    '掌握 not in 判断',
    '能综合应用实现点菜程序'
  ],
  prerequisites: [
    '理解列表创建',
    '理解列表遍历',
    '理解 while 循环'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['import', 'menu', 'choice', 'random'],
  medium: ['vegetable', 'shuffle', 'select', 'option'],
  hard: ['random', 'shuffle', 'choice', 'select']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'import random',
    "random.choice(['a', 'b', 'c'])",
    "menu = ['宫保鸡丁', '鱼香肉丝']",
    "print(random.choice(menu))"
  ],
  medium: [
    "'苹果' not in selected",
    "selected = []\nselected.append('苹果')",
    "while len(selected) < 3:",
    "if f not in selected:\n    selected.append(f)"
  ],
  hard: [
    "import random\nfruits = ['a', 'b', 'c']\nrandom.shuffle(fruits)",
    "n = int(input())\nfor i in range(n):",
    "while len(selected) < n:\n    c = random.choice(menu)\n    if c not in selected:\n        selected.append(c)",
    "meat = ['红烧肉']\nveg = ['炒青菜']\nprint(random.choice(meat))"
  ]
}

// 导出所有数据
export const L6_4_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L6_4_data