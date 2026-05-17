/**
 * PY1 课程 L6-3: 列表切片
 *
 * 核心知识点:
 * 1. 列表切片 - list[起始:结束]
 * 2. insert() - 插入元素到指定位置
 * 3. pop() - 移除指定索引的元素
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'insert',
    pronunciation: '[ɪnˈsɜːt]',
    partOfSpeech: 'v.',
    meaning: '插入',
    level: 'medium',
    example: 'Insert the key.',
    exampleTranslation: '插入钥匙。',
    source: 'ocr'
  },
  {
    word: 'pop',
    pronunciation: '[pɒp]',
    partOfSpeech: 'v.',
    meaning: '突然出现；弹出',
    level: 'medium',
    example: 'Pop up.',
    exampleTranslation: '弹出来。',
    source: 'ocr'
  },
  {
    word: 'task',
    pronunciation: '[tɑːsk]',
    partOfSpeech: 'n.',
    meaning: '任务',
    level: 'easy',
    example: 'Complete the task.',
    exampleTranslation: '完成任务。',
    source: 'ocr'
  },
  {
    word: 'fruit',
    pronunciation: '[fruːt]',
    partOfSpeech: 'n.',
    meaning: '水果',
    level: 'easy',
    example: 'Eat more fruit.',
    exampleTranslation: '多吃水果。',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'slice',
    pronunciation: '[slaɪs]',
    partOfSpeech: 'n.',
    meaning: '切片；片段',
    level: 'medium',
    example: 'A slice of cake.',
    exampleTranslation: '一片蛋糕。',
    source: 'extended'
  },
  {
    word: 'extract',
    pronunciation: '[ɪkˈstrækt]',
    partOfSpeech: 'v.',
    meaning: '提取；取出',
    level: 'hard',
    example: 'Extract the element.',
    exampleTranslation: '取出元素。',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '列表切片',
    emoji: '🔪',
    gradeLevel: '3-4',
    summary: '提取列表中的部分元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '列表切片就像切蛋糕，从列表中切下一片。list[2:5] 表示从索引 2 切到索引 5（不包含 5）。',
      concept: 'list[起始:结束] 提取从起始索引到结束索引前的元素，结果是一个新列表。',
      syntax: `fruits = ['a', 'b', 'c', 'd', 'e']
fruits[1:3]  # ['b', 'c']`,
      example: {
        title: '列表切片',
        code: `fruits = ['香蕉', '苹果', '菠萝', '哈密瓜', '芒果']
print(fruits[1:3])  # 索引1和2
print(fruits[:3])   # 从头到索引2
print(fruits[2:])   # 从索引2到末尾`,
        output: "['苹果', '菠萝']\n['香蕉', '苹果', '菠萝']\n['菠萝', '哈密瓜', '芒果']",
        explanation: 'fruits[1:3] 得到索引1、2的元素；[:3] 从头开始；[2:] 到末尾。'
      },
      practice: [
        {
          question: 'fruits = ["a", "b", "c", "d"]，fruits[1:3] 是什么？',
          answer: '["b", "c"]'
        },
        {
          question: 'fruits[:2] 包含哪些元素？',
          answer: '索引0和1的元素'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '切片包含起始不包含结束，这是 Python 的设计规则。',
      concept: '切片范围 [起始, 结束)，包含起始索引的元素，不包含结束索引。',
      syntax: `# 01234
fruits = ['a', 'b', 'c', 'd', 'e']
fruits[0:2]  # ['a', 'b'] - 索引0,1
fruits[1:4]  # ['b', 'c', 'd'] - 索引1,2,3`,
      example: {
        title: '切片规则',
        code: `fruits = ['香蕉', '苹果', '菠萝', '哈密瓜', '芒果']
print('前两个:', fruits[:2])
print('中间3个:', fruits[1:4])
print('后两个:', fruits[-2:])`,
        output: "前两个: ['香蕉', '苹果']\n中间3个: ['苹果', '菠萝', '哈密瓜']\n后两个: ['哈密瓜', '芒果']",
        explanation: 'fruits[:2] 是前两个，fruits[1:4] 是中间三个，fruits[-2:] 是最后两个。'
      },
      practice: [
        {
          question: '切片 fruits[0:3] 包含哪些索引？',
          answer: '0, 1, 2'
        },
        {
          question: 'fruits[-3:] 是什么意思？',
          answer: '最后三个元素'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '切片可以嵌套，或者在切片后继续操作。',
      concept: '切片结果仍是列表，可以继续使用索引或再次切片。',
      syntax: `nested = [[1,2], [3,4], [5,6]]
nested[0:2]  # [[1,2], [3,4]]`,
      example: {
        title: '切片嵌套',
        code: `nums = [[1, 2], [3, 4], [5, 6]]
print('前两个:', nums[:2])
print('第0个的第一个元素:', nums[0][0])`,
        output: '前两个: [[1, 2], [3, 4]]\n第0个的第一个元素: 1',
        explanation: 'nums[0] 是 [1,2]，再取 [0] 得到 1。'
      },
      practice: [
        {
          question: '如何获取列表的前一半？',
          answer: 'list[:len(list)//2]'
        },
        {
          question: 'list[1:3] 和 list[1:-1] 有什么区别？',
          answer: '前者切到索引3，后者切到倒数第1个之前'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '插入元素 - insert()',
    emoji: '📥',
    gradeLevel: '3-4',
    summary: '在指定位置插入新元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'insert 就像"插队"，把新元素插入到指定位置，原位置的元素往后移。',
      concept: 'list.insert(索引, 元素) 在指定位置插入新元素。',
      syntax: `fruits.insert(1, '草莓')  # 在索引1位置插入`,
      example: {
        title: '插入元素',
        code: `fruits = ['早餐', '晚餐']
print('插入前:', fruits)
fruits.insert(1, '午餐')
print('插入后:', fruits)`,
        output: "插入前: ['早餐', '晚餐']\n插入后: ['早餐', '午餐', '晚餐']",
        explanation: 'insert(1, "午餐") 在索引1位置插入，原来的元素都往后移动。'
      },
      practice: [
        {
          question: 'insert(0, x) 会插在哪里？',
          answer: '列表开头'
        },
        {
          question: 'insert 后列表长度怎么变？',
          answer: '增加1'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'insert 可以用负数索引，负数从末尾开始算。',
      concept: 'insert 可以用负数索引，-1 表示最后一个元素之前。',
      syntax: `fruits.insert(-1, '甜点')  # 插入到倒数第1个之前`,
      example: {
        title: '负数索引插入',
        code: `fruits = ['苹果', '香蕉', '橙子']
print('原列表:', fruits)
fruits.insert(-1, '草莓')
print('插入后:', fruits)`,
        output: "原列表: ['苹果', '香蕉', '橙子']\n插入后: ['苹果', '香蕉', '草莓', '橙子']",
        explanation: 'insert(-1, "草莓") 插入到倒数第1个元素之前，也就是在"橙子"前面。'
      },
      practice: [
        {
          question: 'insert(-2, x) 会插在哪里？',
          answer: '倒数第2个位置'
        },
        {
          question: '如何在列表末尾插入元素？',
          answer: 'append() 或 insert(len(list), x)'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'insert 后列表长度增加，可以用 len() 获取新的长度。',
      concept: 'insert 后可以用 len() 查看新长度，或者多次插入构建列表。',
      syntax: `fruits.insert(0, '第一')
len(fruits)  # 长度增加了`,
      example: {
        title: '插入后查看',
        code: `fruits = ['苹果', '香蕉']
print('长度:', len(fruits))
fruits.insert(1, '橙子')
print('插入后长度:', len(fruits))
print('列表:', fruits)`,
        output: "长度: 2\n插入后长度: 3\n列表: ['苹果', '橙子', '香蕉']",
        explanation: '每次 insert 后列表长度加 1。'
      },
      practice: [
        {
          question: '连续 insert 多次会怎样？',
          answer: '每次都在指定位置插入'
        },
        {
          question: 'insert(5, x) 和 append(x) 有什么区别？',
          answer: 'insert 在指定位置，append 在末尾'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '移除元素 - pop()',
    emoji: '📤',
    gradeLevel: '3-4',
    summary: '移除指定索引的元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'pop 就是"弹出"，把指定位置的元素取出来删除。',
      concept: 'list.pop(索引) 移除并返回指定索引的元素，默认移除最后一个。',
      syntax: `fruits.pop()  # 移除最后一个
fruits.pop(0)  # 移除第一个`,
      example: {
        title: 'pop 移除',
        code: `fruits = ['苹果', '香蕉', '橙子']
print('原列表:', fruits)
removed = fruits.pop(1)
print('被移除的:', removed)
print('移除后:', fruits)`,
        output: "原列表: ['苹果', '香蕉', '橙子']\n被移除的: 香蕉\n移除后: ['苹果', '橙子']",
        explanation: 'pop(1) 移除索引1的元素"香蕉"，并返回这个值。'
      },
      practice: [
        {
          question: 'pop() 默认移除哪个元素？',
          answer: '最后一个'
        },
        {
          question: 'pop 后列表长度怎么变？',
          answer: '减少1'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'pop 可以接收返回值，方便记录被移除的元素。',
      concept: 'pop 返回被移除的元素，可以保存起来使用。',
      syntax: `removed = fruits.pop(0)  # 移除并保存`,
      example: {
        title: '保存移除元素',
        code: `fruits = ['苹果', '香蕉', '橙子']
removed = fruits.pop()
print('被移除:', removed)
print('列表:', fruits)
print('新的末尾:', fruits.pop())`,
        output: "被移除: 橙子\n列表: ['苹果', '香蕉']\n新的末尾: 香蕉",
        explanation: 'pop() 默认移除最后一个，并返回这个值。'
      },
      practice: [
        {
          question: 'pop() 返回值是什么？',
          answer: '被移除的元素'
        },
        {
          question: 'pop(0) 移除后列表第一个变成什么？',
          answer: '原来是索引1的元素'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'pop 移除索引越界会报错，需要注意索引范围。',
      concept: 'pop 的索引必须在有效范围内（0 到 len-1），否则报错。',
      syntax: `if len(fruits) > 0:
    fruits.pop(0)  # 安全移除`,
      example: {
        title: '安全 pop',
        code: `fruits = ['苹果']
if len(fruits) > 0:
    print('可以移除:', fruits.pop())
else:
    print('列表为空')

# 空列表 pop 会报错
empty = []
# empty.pop()  # 这会报错`,
        output: '可以移除: 苹果',
        explanation: '移除前检查列表是否为空，避免报错。'
      },
      practice: [
        {
          question: 'pop 索引超出范围会怎样？',
          answer: '报错'
        },
        {
          question: '如何安全地 pop 空列表？',
          answer: '先检查 len(list) > 0'
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
    mathConcept: '切片理解',
    question: `fruits = ['香蕉', '苹果', '菠萝', '哈密瓜', '芒果']，fruits[1:3] 是什么？`,
    options: [
      "['香蕉', '苹果']",
      "['苹果', '菠萝']",
      "['菠萝', '哈密瓜']",
      "['哈密瓜', '芒果']"
    ],
    answer: 1,
    explanation: 'fruits[1:3] 从索引1切到3（不包含3），得到索引1和2：["苹果", "菠萝"]。答案是 B。',
    hint: '包含起始不包含结束'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: 'insert使用',
    question: `执行以下代码后，fruits 是什么？\n\n\`\`\`python\nfruits = ['苹果', '香蕉']\nfruits.insert(1, '橙子')\nprint(fruits)\n\`\`\``,
    options: [
      "['苹果', '香蕉', '橙子']",
      "['橙子', '苹果', '香蕉']",
      "['苹果', '橙子', '香蕉']",
      "['苹果', '香蕉']"
    ],
    answer: 2,
    explanation: 'insert(1, "橙子") 在索引1插入，原来的索引1往后移，所以是 ["苹果", "橙子", "香蕉"]。答案是 C。',
    hint: 'insert 在索引位置插入'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: 'pop使用',
    question: `执行以下代码后，fruits 是什么？\n\n\`\`\`python\nfruits = ['苹果', '香蕉', '橙子']\nfruits.pop(1)\nprint(fruits)\n\`\`\``,
    options: [
      "['苹果', '橙子']",
      "['香蕉', '橙子']",
      "['苹果', '香蕉']",
      "['苹果', '香蕉', '橙子']"
    ],
    answer: 0,
    explanation: 'pop(1) 移除索引1的元素"香蕉"，剩余 ["苹果", "橙子"]。答案是 A。',
    hint: 'pop 移除指定索引的元素'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '切片省略',
    question: `fruits = ['a', 'b', 'c', 'd', 'e']，fruits[:3] 是什么？`,
    options: [
      "['a', 'b', 'c']",
      "['b', 'c', 'd']",
      "['c', 'd', 'e']",
      "['d', 'e']"
    ],
    answer: 0,
    explanation: '[:3] 从头开始切到索引3（不包含3），得到索引0、1、2：["a", "b", "c"]。答案是 A。',
    hint: '省略起始表示从头开始'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合操作',
    question: `执行以下代码后，fruits 是什么？\n\n\`\`\`python\nfruits = ['苹果', '香蕉', '菠萝']\nfruits.insert(2, '草莓')\nfruits.pop(1)\nprint(fruits)\n\`\`\``,
    options: [
      "['苹果', '菠萝', '草莓']",
      "['草莓', '菠萝']",
      "['苹果', '草莓', '菠萝']",
      "['苹果', '菠萝']"
    ],
    answer: 0,
    explanation: 'insert(2, "草莓") 后变成 ["苹果", "香蕉", "草莓", "菠萝"]，pop(1) 移除"香蕉"，最后是 ["苹果", "菠萝", "草莓"]。答案是 A。',
    hint: '先 insert 再 pop'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '负数索引',
    question: `fruits = ['苹果', '香蕉', '橙子', '葡萄']，fruits[-2] 是什么？`,
    options: [
      '苹果',
      '香蕉',
      '橙子',
      '葡萄'
    ],
    answer: 2,
    explanation: '-1 是倒数第一个"葡萄"，-2 是倒数第二个"橙子"。答案是 C。',
    hint: '负数从-1开始倒数'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L6-3',
  title: '列表切片',
  subtitle: '提取、插入、移除列表元素',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握列表切片的语法',
    '掌握 insert() 插入元素',
    '掌握 pop() 移除元素',
    '能综合使用切片操作列表'
  ],
  prerequisites: [
    '理解列表索引',
    '理解列表遍历'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['insert', 'pop', 'task', 'fruit'],
  medium: ['slice', 'insert', 'remove', 'position'],
  hard: ['extract', 'traverse', 'modify', 'sequence']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'fruits[1:3]',
    'fruits[:3]',
    'fruits[2:]',
    "fruits.insert(1, '新元素')"
  ],
  medium: [
    'fruits.pop(1)',
    'fruits.pop()',
    "fruits.insert(-1, '元素')",
    'fruits[-2:]'
  ],
  hard: [
    "fruits = ['a', 'b', 'c']\nfruits.insert(1, 'x')\nfruits.pop(0)",
    'fruits[1:-1]',
    'for i in range(len(fruits)):\n    fruits[i] = fruits[i] * 2',
    'fruits = fruits[1:3]'
  ]
}

// 导出所有数据
export const L6_3_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L6_3_data