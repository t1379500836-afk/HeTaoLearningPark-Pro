/**
 * PY1 课程 L6-1: 列表
 *
 * 核心知识点:
 * 1. 列表创建 - 同时存储多个数据
 * 2. append() - 添加元素
 * 3. remove() - 删除元素
 * 4. 遍历列表 - for x in list
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'giraffe',
    pronunciation: '[dʒɪˈrɑːf]',
    partOfSpeech: 'n.',
    meaning: '长颈鹿',
    level: 'easy',
    example: 'The giraffe has a long neck.',
    exampleTranslation: '长颈鹿有长长的脖子。',
    source: 'ocr'
  },
  {
    word: 'append',
    pronunciation: '[əˈpend]',
    partOfSpeech: 'v.',
    meaning: '附加；追加',
    level: 'medium',
    example: 'Append more data.',
    exampleTranslation: '添加更多数据。',
    source: 'ocr'
  },
  {
    word: 'remove',
    pronunciation: '[rɪˈmuːv]',
    partOfSpeech: 'v.',
    meaning: '移除；删除',
    level: 'medium',
    example: 'Remove the file.',
    exampleTranslation: '删除文件。',
    source: 'ocr'
  },
  {
    word: 'parrot',
    pronunciation: '[ˈpærət]',
    partOfSpeech: 'n.',
    meaning: '鹦鹉',
    level: 'easy',
    example: 'The parrot can talk.',
    exampleTranslation: '这只鹦鹉会说话。',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'list',
    pronunciation: '[lɪst]',
    partOfSpeech: 'n.',
    meaning: '列表；清单',
    level: 'easy',
    example: 'Make a shopping list.',
    exampleTranslation: '列一个购物清单。',
    source: 'extended'
  },
  {
    word: 'element',
    pronunciation: '[ˈelɪmənt]',
    partOfSpeech: 'n.',
    meaning: '元素',
    level: 'medium',
    example: 'Each element is important.',
    exampleTranslation: '每个元素都很重要。',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '列表创建',
    emoji: '📦',
    gradeLevel: '3-4',
    summary: '用方括号创建列表存储多个数据',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '列表就像一个多层的书架，可以同时放下很多本书。每本书就是一个元素。',
      concept: '列表用方括号 [] 创建，元素之间用逗号分隔。',
      syntax: `fruits = ['苹果', '香蕉', '橙子']
numbers = [1, 2, 3, 4, 5]`,
      example: {
        title: '创建列表',
        code: `fruits = ['苹果', '香蕉', '橙子']
print(fruits)
animals = ['老虎', '奶牛', '狮子']
print(animals)`,
        output: "['苹果', '香蕉', '橙子']\n['老虎', '奶牛', '狮子']",
        explanation: '用方括号创建列表，元素之间用逗号分隔。列表可以存储任意类型的数据。'
      },
      practice: [
        {
          question: '创建列表的正确格式是什么？',
          answer: '用方括号，元素用逗号分隔'
        },
        {
          question: 'fruits = ["苹果", "香蕉"] 有几个元素？',
          answer: '2个'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '列表可以存储不同类型的数据，数字和字符串可以混在一起。',
      concept: '列表中的元素可以是不同类型：数字、字符串、甚至另一个列表。',
      syntax: `mixed = [1, 'abc', 2, 'def']
nested = [[1, 2], [3, 4]]`,
      example: {
        title: '混合列表',
        code: `mixed = [1, 'apple', 3, 'banana']
print(mixed)
print(len(mixed))`,
        output: "[1, 'apple', 3, 'banana']\n4",
        explanation: '列表可以存储不同类型的数据，用 len() 可以获取列表的长度（元素个数）。'
      },
      practice: [
        {
          question: 'len([1, 2, 3]) 返回多少？',
          answer: '3'
        },
        {
          question: '列表可以同时包含数字和字符串吗？',
          answer: '可以'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '空列表长度是 0，可以先创建空列表，然后动态添加元素。',
      concept: 'empty_list = [] 创建一个空列表，然后用 append() 慢慢添加元素。',
      syntax: `empty_list = []
len(empty_list)  # 0`,
      example: {
        title: '空列表',
        code: `empty = []
print(len(empty))
empty.append('第一个')
print(empty)`,
        output: "0\n['第一个']",
        explanation: '空列表长度为 0，用 append() 可以添加第一个元素。'
      },
      practice: [
        {
          question: '空列表的长度是多少？',
          answer: '0'
        },
        {
          question: '如何创建一个空列表？',
          answer: 'empty_list = []'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '添加元素 - append()',
    emoji: '➕',
    gradeLevel: '3-4',
    summary: '在列表末尾添加新元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'append 就像"追加"，把新元素放到列表的最后面。',
      concept: '列表名.append(元素) 在列表末尾添加一个新元素。',
      syntax: `fruits.append('草莓')`,
      example: {
        title: '追加元素',
        code: `fruits = ['苹果', '香蕉']
fruits.append('橙子')
print(fruits)
fruits.append('草莓')
print(fruits)`,
        output: "['苹果', '香蕉', '橙子']\n['苹果', '香蕉', '橙子', '草莓']",
        explanation: 'append() 在列表末尾添加新元素，每次添加一个。'
      },
      practice: [
        {
          question: 'append() 添加的元素放在哪个位置？',
          answer: '末尾'
        },
        {
          question: 'fruits.append("葡萄") 后，葡萄在哪个位置？',
          answer: '最后一个'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'append() 每次只能添加一个元素，添加多个需要多次调用。',
      concept: '可以连续使用 append() 添加多个元素。',
      syntax: `fruits.append('草莓')
fruits.append('葡萄')`,
      example: {
        title: '连续添加',
        code: `fruits = []
fruits.append('苹果')
fruits.append('香蕉')
fruits.append('橙子')
print(fruits)
print(len(fruits))`,
        output: "['苹果', '香蕉', '橙子']\n3",
        explanation: '可以从空列表开始，用 append() 依次添加元素。'
      },
      practice: [
        {
          question: '如何把 "a", "b", "c" 变成 ["a", "b", "c"]？',
          answer: "fruits = []; fruits.append('a'); fruits.append('b'); fruits.append('c')"
        },
        {
          question: 'append() 一次能添加多个元素吗？',
          answer: '不能，只能添加一个'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '可以在循环中使用 append() 来构建列表。',
      concept: '根据条件动态添加元素到列表中。',
      syntax: `for i in range(3):
    fruits.append(str(i))`,
      example: {
        title: '循环中添加',
        code: `fruits = []
for i in range(3):
    fruits.append(i + 1)
print(fruits)`,
        output: '[1, 2, 3]',
        explanation: '循环 3 次，每次添加 i+1，最终得到 [1, 2, 3]。'
      },
      practice: [
        {
          question: '循环中 append 可以用在哪里？',
          answer: '根据条件或规律动态生成列表'
        },
        {
          question: '如何生成 [1, 3, 5, 7]？',
          answer: 'nums = []; for i in range(4): nums.append(i*2+1)'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '删除元素 - remove()',
    emoji: '➖',
    gradeLevel: '3-4',
    summary: '从列表中删除指定元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'remove 就是"移除"，把列表中指定的元素删掉。',
      concept: '列表名.remove(元素) 删除列表中第一个匹配的元素。',
      syntax: `fruits.remove('苹果')`,
      example: {
        title: '删除元素',
        code: `fruits = ['苹果', '香蕉', '橙子']
print(fruits)
fruits.remove('香蕉')
print(fruits)`,
        output: "['苹果', '香蕉', '橙子']\n['苹果', '橙子']",
        explanation: 'remove("香蕉") 删除列表中的"香蕉"，删除后列表变短。'
      },
      practice: [
        {
          question: 'remove() 的作用是什么？',
          answer: '删除列表中的指定元素'
        },
        {
          question: "fruits = ['a', 'b', 'c']，remove('b') 后列表是？",
          answer: "['a', 'c']"
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '如果删除不存在的元素会报错，所以删除前最好先检查。',
      concept: 'remove() 只删除第一个匹配的元素，如果元素不存在会报错。',
      syntax: `# 删除存在元素
fruits.remove('苹果')  # 正常

# 删除不存在元素会报错
fruits.remove('葡萄')  # 报错！`,
      example: {
        title: '删除注意',
        code: `fruits = ['苹果', '香蕉', '苹果']
print(fruits)
fruits.remove('苹果')  # 只删第一个
print(fruits)`,
        output: "['苹果', '香蕉', '苹果']\n['香蕉', '苹果']",
        explanation: 'remove() 只删除第一个匹配的元素。如果有多个相同的元素，只删除第一个。'
      },
      practice: [
        {
          question: '删除列表中不存在的元素会怎样？',
          answer: '报错'
        },
        {
          question: "列表有多个 'a'，remove('a') 会删除哪个？",
          answer: '第一个'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '可以用 in 判断元素是否在列表中，再决定是否删除。',
      concept: '用 if 元素 in 列表 来检查是否存在，然后再删除。',
      syntax: `if '苹果' in fruits:
    fruits.remove('苹果')`,
      example: {
        title: '安全删除',
        code: `fruits = ['苹果', '香蕉']
if '苹果' in fruits:
    fruits.remove('苹果')
    print('已删除')
else:
    print('元素不存在')
print(fruits)`,
        output: "已删除\n['香蕉']",
        explanation: '先用 in 检查元素是否存在，存在才删除，避免报错。'
      },
      practice: [
        {
          question: '如何安全删除列表中的元素？',
          answer: '先用 in 检查是否存在'
        },
        {
          question: 'if element not in list: 应该配合什么操作？',
          answer: 'remove()'
        }
      ]
    }
  },

  {
    id: 'kp-4',
    title: '遍历列表',
    emoji: '🔄',
    gradeLevel: '3-4',
    summary: '依次取出列表中每个元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '遍历就像"逛超市"，把货架上的东西一个一个拿出来看。',
      concept: 'for x in list 依次取出列表中的每个元素。',
      syntax: `for fruit in fruits:
    print(fruit)`,
      example: {
        title: '遍历打印',
        code: `fruits = ['苹果', '香蕉', '橙子']
for f in fruits:
    print(f)`,
        output: '苹果\n香蕉\n橙子',
        explanation: 'for f in fruits 依次取出每个元素赋值给 f，然后打印。'
      },
      practice: [
        {
          question: 'for x in list 的遍历顺序是什么？',
          answer: '从头到尾依次'
        },
        {
          question: '遍历时，循环变量代表什么？',
          answer: '当前元素的值'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '遍历时可以对每个元素进行操作，比如计数或修改。',
      concept: '在遍历循环中可以对每个元素进行处理。',
      syntax: `count = 0
for f in fruits:
    if '苹果' in f:
        count = count + 1`,
      example: {
        title: '遍历计数',
        code: `fruits = ['苹果', '香蕉', '苹果', '橙子']
count = 0
for f in fruits:
    if f == '苹果':
        count = count + 1
print('苹果出现了', count, '次')`,
        output: '苹果出现了 2 次',
        explanation: '遍历列表，对每个元素检查是否是"苹果"，是则计数加1。'
      },
      practice: [
        {
          question: '如何统计列表中有多少个"香蕉"？',
          answer: '遍历列表，检查是否等于"香蕉"，计数'
        },
        {
          question: '遍历可以修改列表元素吗？',
          answer: '直接遍历不能，需要用索引'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '可以用 in 检查元素是否在列表中，这是一个布尔判断。',
      concept: '元素 in 列表 返回 True 或 False，用来判断元素是否存在。',
      syntax: `if '苹果' in fruits:
    print('有苹果')`,
      example: {
        title: 'in 的用法',
        code: `fruits = ['苹果', '香蕉', '橙子']
if '苹果' in fruits:
    print('有苹果')
else:
    print('没有苹果')

if '葡萄' in fruits:
    print('有葡萄')
else:
    print('没有葡萄')`,
        output: '有苹果\n没有葡萄',
        explanation: '"苹果" 在列表中返回 True，"葡萄" 不在返回 False。'
      },
      practice: [
        {
          question: '"香蕉" in ["苹果", "香蕉"] 结果是什么？',
          answer: 'True'
        },
        {
          question: '"葡萄" in ["苹果", "香蕉"] 结果是什么？',
          answer: 'False'
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
    mathConcept: '列表创建',
    question: '下列哪个是正确创建列表的方式？',
    options: [
      'fruits = (1, 2, 3)',
      'fruits = [1, 2, 3]',
      'fruits = {1, 2, 3}',
      'fruits = 1, 2, 3'
    ],
    answer: 1,
    explanation: '列表用方括号 [] 创建，所以 [1, 2, 3] 是正确的。圆括号 () 是元组，大括号 {} 是集合。答案是 B。',
    hint: '列表用方括号'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: 'append添加',
    question: `执行以下代码后，fruits 是什么？\n\n\`\`\`python\nfruits = ['苹果', '香蕉']\nfruits.append('橙子')\nprint(fruits)\n\`\`\``,
    options: [
      "['苹果', '香蕉']",
      "['橙子', '苹果', '香蕉']",
      "['苹果', '香蕉', '橙子']",
      "['苹果', '香蕉', '橙子', '橙子']"
    ],
    answer: 2,
    explanation: 'append() 在列表末尾添加元素，所以变成 ["苹果", "香蕉", "橙子"]。答案是 C。',
    hint: 'append 在末尾添加'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: 'remove删除',
    question: `执行以下代码后，fruits 是什么？\n\n\`\`\`python\nfruits = ['苹果', '香蕉', '橙子']\nfruits.remove('香蕉')\nprint(fruits)\n\`\`\``,
    options: [
      "['苹果', '橙子']",
      "['苹果', '香蕉']",
      "['香蕉', '橙子']",
      "['苹果', '香蕉', '橙子']"
    ],
    answer: 0,
    explanation: 'remove("香蕉") 删除列表中的"香蕉"，剩余 ["苹果", "橙子"]。答案是 A。',
    hint: 'remove 删除指定元素'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '遍历列表',
    question: `以下代码的输出是？\n\n\`\`\`python\nfruits = ['苹果', '香蕉', '橙子']\nfor f in fruits:\n    print(f)\n\`\`\``,
    options: [
      '苹果 香蕉 橙子',
      '苹果\n香蕉\n橙子',
      'f',
      '1 2 3'
    ],
    answer: 1,
    explanation: 'for f in fruits 遍历列表，每次打印当前元素，所以输出三个元素，每个占一行。答案是 B。',
    hint: '遍历依次取出每个元素'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: 'in 判断',
    question: `"葡萄" in ['苹果', '香蕉'] 的结果是？`,
    options: [
      'True',
      'False',
      '报错',
      '不确定'
    ],
    answer: 1,
    explanation: '"葡萄" 不在列表中，所以返回 False。答案是 B。',
    hint: 'in 检查元素是否在列表中'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '遍历计数',
    question: `以下代码的输出是？\n\n\`\`\`python\ncount = 0\nfruits = ['苹果', '香蕉', '苹果', '橙子']\nfor f in fruits:\n    if f == '苹果':\n        count = count + 1\nprint(count)\n\`\`\``,
    options: [
      '1',
      '2',
      '3',
      '4'
    ],
    answer: 1,
    explanation: '遍历列表，"苹果" 出现了两次，所以 count 最终是 2。答案是 B。',
    hint: '数一数有几个"苹果"'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L6-1',
  title: '列表',
  subtitle: '存储多个数据的方式',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解列表的概念和用途',
    '掌握列表的创建方法',
    '掌握 append() 添加元素',
    '掌握 remove() 删除元素',
    '能用 for 遍历列表'
  ],
  prerequisites: [
    '理解变量概念',
    '知道 for 循环'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['giraffe', 'parrot', 'list', 'append'],
  medium: ['remove', 'element', 'item', 'index'],
  hard: ['traverse', 'iteration', 'container', 'sequence']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    "fruits = ['苹果', '香蕉']",
    'fruits.append("橙子")',
    'fruits.remove("苹果")',
    'for f in fruits:\n    print(f)'
  ],
  medium: [
    'fruits = []\nfruits.append("苹果")',
    'if "苹果" in fruits:\n    print("有苹果")',
    'for f in fruits:\n    if f == "苹果":\n        print(f)',
    'len(fruits)'
  ],
  hard: [
    'fruits = []\nfor i in range(3):\n    fruits.append(i + 1)',
    'count = 0\nfor f in fruits:\n    if "苹果" in f:\n        count = count + 1',
    'fruits.remove("苹果")\nif "苹果" in fruits:\n    print("还有")',
    'for i in range(len(fruits)):\n    print(fruits[i])'
  ]
}

// 导出所有数据
export const L6_1_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L6_1_data