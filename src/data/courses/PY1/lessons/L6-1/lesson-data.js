/**
 * PY1 课程 L6-1: 列表入门
 *
 * 核心知识点:
 * 1. 列表的创建 - 存储多个数据
 * 2. append() 添加元素
 * 3. remove() 删除元素
 */

// 单词卡数据
export const vocabData = [
  {
    word: 'append',
    pronunciation: '[a\'pend]',
    partOfSpeech: 'v.',
    meaning: '附加，增补',
    level: 'easy',
    example: 'Please append your signature.',
    exampleTranslation: '请签上你的名字。',
    note: 'append to 添加到',
    source: 'ocr'
  },
  {
    word: 'remove',
    pronunciation: '[ri\'mu:v]',
    partOfSpeech: 'v.',
    meaning: '去掉；废除；摘下',
    level: 'easy',
    example: 'Please remove your shoes.',
    exampleTranslation: '请脱掉你的鞋子。',
    note: '',
    source: 'ocr'
  },
  {
    word: 'giraffe',
    pronunciation: '[d3e\'raef]',
    partOfSpeech: 'n.',
    meaning: '长颈鹿',
    level: 'easy',
    example: 'The giraffe has a long neck.',
    exampleTranslation: '长颈鹿有长长的脖子。',
    note: '',
    source: 'ocr'
  },
  {
    word: 'animal',
    pronunciation: '[\'anim(e)l]',
    partOfSpeech: 'n.',
    meaning: '动物；兽类',
    level: 'easy',
    example: 'The lion is a wild animal.',
    exampleTranslation: '狮子是野生动物。',
    note: '',
    source: 'ocr'
  },
  {
    word: 'list',
    pronunciation: '[list]',
    partOfSpeech: 'n.',
    meaning: '列表；清单',
    level: 'medium',
    example: 'Make a list of animals.',
    exampleTranslation: '列一个动物清单。',
    note: '',
    source: 'extended'
  },
  {
    word: 'add',
    pronunciation: '[aed]',
    partOfSpeech: 'v.',
    meaning: '增加；添加',
    level: 'easy',
    example: 'Add sugar to the tea.',
    exampleTranslation: '给茶加糖。',
    note: '',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '神奇收纳箱 - 列表',
    emoji: '📦',
    gradeLevel: '1-2',
    summary: '存储多个数据的容器',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个神奇的收纳箱，里面可以放很多个玩具！你想放什么就放什么，随时都能拿出来玩！',
      concept: '列表（List）就像一个收纳箱，可以同时存储多个数据。列表用方括号 [] 表示，里面的数据用逗号分开。',
      syntax: '列表名 = [数据1, 数据2, 数据3]',
      example: {
        title: '创建动物列表',
        code: 'animals = ["小狗", "小猫", "兔子"]\nprint(animals)',
        output: "['小狗', '小猫', '兔子']",
        explanation: '创建了一个名为 animals 的列表，里面有三个动物。打印时会显示整个列表的内容。'
      },
      practice: [
        {
          question: '列表用什么符号表示？',
          answer: '方括号 []'
        },
        {
          question: '列表中的数据用什么符号分开？',
          answer: '逗号'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的收纳箱升级了！不仅可以放玩具，还可以放数字、文字等各种东西，而且想放多少就放多少！',
      concept: '列表可以存储各种类型的数据：数字、文字等。列表是有序的，每个元素都有对应的位置。创建列表后，可以随时查看、修改列表内容。',
      syntax: '# 创建空列表\nmy_list = []\n\n# 创建有数据的列表\nnumbers = [1, 2, 3, 4, 5]\nfruits = ["苹果", "香蕉", "橙子"]',
      example: {
        title: '创建数字和文字列表',
        code: '# 数字列表\nscores = [95, 87, 92]\nprint(scores)\n\n# 文字列表\nfruits = ["苹果", "香蕉"]\nprint(fruits)',
        output: '[95, 87, 92]\n["苹果", "香蕉"]',
        explanation: '可以创建不同类型的列表。数字列表存储数字，文字列表存储文字。'
      },
      practice: [
        {
          question: '如何创建一个空列表？',
          answer: '使用方括号: my_list = []'
        },
        {
          question: '列表可以存储什么类型的数据？',
          answer: '数字、文字等各种类型'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '收纳大师模式！你可以创建各种专业列表，管理班级信息、游戏分数、任务清单，像真正的程序员一样组织数据！',
      concept: '列表是Python中最常用的数据结构之一。列表是可变的（可以修改），可以存储任意类型的数据，甚至可以混合存储。列表是有序序列，保持元素的插入顺序。',
      syntax: '# 混合类型列表\nmixed = [1, "hello", 3.14, True]\n\n# 嵌套列表\nnested = [[1, 2], [3, 4], [5, 6]]',
      example: {
        title: '创建复杂列表',
        code: '# 学生信息列表\nstudent = ["小明", 12, 98.5]\nprint(student)\n\n# 游戏排行榜\nscores = [[1, "小明", 100], [2, "小红", 95]]\nprint(scores)',
        output: "['小明', 12, 98.5]\n[[1, '小明', 100], [2, '小红', 95]]",
        explanation: '第一个列表混合了名字、年龄、分数。第二个是嵌套列表，每个元素又是一个列表，表示排行榜。'
      },
      practice: [
        {
          question: '列表是可变的还是不可变的？',
          answer: '可变的，可以修改列表内容'
        },
        {
          question: '列表会保持元素的插入顺序吗？',
          answer: '是的，列表是有序序列'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '添加新成员 - append()',
    emoji: '➕',
    gradeLevel: '1-2',
    summary: '向列表末尾添加新元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '你想在收纳箱里放一个新玩具，直接把它放到最后面就行了！这就是 append() 的作用！',
      concept: 'append() 是列表的一个命令，可以把新元素添加到列表的最后面。使用格式是：列表名.append(要添加的内容)',
      syntax: '列表名.append(要添加的内容)',
      example: {
        title: '添加新动物',
        code: 'animals = ["小狗", "小猫"]\nanimals.append("兔子")\nprint(animals)',
        output: "['小狗', '小猫', '兔子']",
        explanation: '先用 append() 把 "兔子" 添加到列表末尾，再打印列表，就能看到三个动物了。'
      },
      practice: [
        {
          question: 'append() 把新元素添加到列表的哪里？',
          answer: '列表的末尾（最后面）'
        },
        {
          question: 'append() 前面需要加什么？',
          answer: '列表名和点号，如 animals.append()'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的收纳箱更智能了！每次添加新物品，它都会自动放到最后面，不会打乱原来的顺序。',
      concept: 'append() 方法会在列表末尾添加一个元素。这是最常用的添加方式，因为不需要考虑位置，系统自动放到最后。可以多次调用 append() 添加多个元素。',
      syntax: 'fruits = ["苹果"]\nfruits.append("香蕉")\nfruits.append("橙子")',
      example: {
        title: '添加多个水果',
        code: 'fruits = ["苹果"]\nfruits.append("香蕉")\nprint(fruits)\nfruits.append("橙子")\nprint(fruits)',
        output: "['苹果', '香蕉']\n['苹果', '香蕉', '橙子']",
        explanation: '每次调用 append() 都会在末尾添加一个新元素。第一次添加后有两个水果，第二次添加后有三个。'
      },
      practice: [
        {
          question: 'append() 一次可以添加几个元素？',
          answer: '一次只能添加一个元素'
        },
        {
          question: '如何添加多个元素？',
          answer: '多次调用 append()'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '专业收纳模式！append() 不仅支持添加简单数据，还能添加列表、字典等复杂对象，是构建动态数据结构的关键！',
      concept: 'append() 是列表的修改操作，会直接改变原列表（in-place操作）。追加的可以是任何对象：数字、字符串、甚至另一个列表。注意append()不返回值，直接修改列表。',
      syntax: '# 追加各种类型\nnumbers = [1, 2]\nnumbers.append(3)\n\n# 追加列表\nnested = [1]\nnested.append([2, 3])  # 结果: [1, [2, 3]]',
      example: {
        title: '动态构建列表',
        code: '# 记录游戏分数\nscores = []\nscores.append(100)\nscores.append(95)\nscores.append(88)\nprint("平均分:", sum(scores)/len(scores))',
        output: '平均分: 94.333...',
        explanation: '从空列表开始，用 append() 动态添加分数。最后用 sum() 和 len() 计算平均分。注意append()改变了原列表。'
      },
      practice: [
        {
          question: 'append() 会返回新列表吗？',
          answer: '不会，它直接修改原列表，没有返回值'
        },
        {
          question: 'append([1,2]) 会把1和2分别添加吗？',
          answer: '不会，它会把整个列表作为一个元素添加'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '移除物品 - remove()',
    emoji: '➖',
    gradeLevel: '1-2',
    summary: '从列表中删除指定元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '你想从收纳箱里拿走某个玩具，只需要说出它的名字，它就会自动消失！',
      concept: 'remove() 命令可以从列表中删除指定的元素。使用格式是：列表名.remove(要删除的内容)',
      syntax: '列表名.remove(要删除的内容)',
      example: {
        title: '删除一个动物',
        code: 'animals = ["小狗", "小猫", "兔子"]\nanimals.remove("小猫")\nprint(animals)',
        output: "['小狗', '兔子']",
        explanation: '使用 remove("小猫") 把小猫从列表中删除，打印时只剩下小狗和兔子了。'
      },
      practice: [
        {
          question: 'remove() 根据什么删除元素？',
          answer: '根据元素的值（内容）'
        },
        {
          question: '如果列表中没有这个元素会怎样？',
          answer: '会报错'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的收纳箱更聪明了！它会帮你找到指定的物品并移除，但如果列表中有多个相同的物品，它只会移除第一个。',
      concept: 'remove() 方法会删除第一个匹配的元素。如果列表中有多个相同的值，只会删除最前面的那个。如果要删除的值不存在，程序会报错。',
      syntax: 'numbers = [1, 2, 3, 2]\nnumbers.remove(2)  # 删除第一个2\n# 结果: [1, 3, 2]',
      example: {
        title: '删除重复元素',
        code: 'numbers = [1, 2, 3, 2, 4]\nnumbers.remove(2)\nprint(numbers)',
        output: '[1, 3, 2, 4]',
        explanation: '列表中有两个2，但 remove(2) 只删除了第一个2（索引位置1的那个），第二个2还在。'
      },
      practice: [
        {
          question: 'remove() 删除重复元素时怎么处理？',
          answer: '只删除第一个匹配的元素'
        },
        {
          question: '如何避免删除不存在的元素时报错？',
          answer: '先用 if 判断元素是否在列表中'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '专业清理模式！remove() 是按值删除，与按位置删除的 pop() 形成对比。掌握这两种删除方式，让你精准管理列表数据！',
      concept: 'remove() 按值删除第一个匹配元素，需要O(n)时间（需要查找）。如果元素不存在会抛出ValueError。配合in运算符或try-except可以安全删除。与pop(index)对比：pop按位置删除且返回删除的值。',
      syntax: '# 安全删除\nif item in list:\n    list.remove(item)\n\n# 或用try-except\ntry:\n    list.remove(item)\nexcept ValueError:\n    pass',
      example: {
        title: '安全的删除操作',
        code: '# 管理待办事项\ntodo = ["作业", "游戏", "阅读", "游戏"]\n\n# 删除一个"游戏"\nif "游戏" in todo:\n    todo.remove("游戏")\nprint(todo)',
        output: "['作业', '阅读', '游戏']",
        explanation: '先用 if 判断"游戏"是否在列表中，存在才删除。这样避免报错。删除后还剩一个"游戏"。'
      },
      practice: [
        {
          question: 'remove() 和 pop(index) 的主要区别是什么？',
          answer: 'remove()按值删除，pop()按索引位置删除'
        },
        {
          question: 'remove() 需要多少时间找到元素？',
          answer: 'O(n)，需要遍历列表查找'
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
    mathConcept: '数数',
    question: '执行下面的代码，列表中有几个元素？\n\n```python\nanimals = ["小狗", "小猫", "兔子"]\nanimals.append("小鸟")\n```\n\nA. 3个\nB. 4个\nC. 5个\nD. 2个',
    options: [
      'A. 3个',
      'B. 4个',
      'C. 5个',
      'D. 2个'
    ],
    answer: 1, // B
    explanation: '这是一个数数题！\n\n1. 创建列表时，有3个动物（小狗、小猫、兔子）\n2. 执行 append("小鸟") 后，在末尾添加了第4个动物\n3. 所以列表中一共有 4 个元素\n\n数学知识：基础计数，3 + 1 = 4',
    hint: '数一数，原来3个，又加了1个'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '找规律',
    question: '执行下面的代码，打印结果是什么？\n\n```python\nnumbers = [1, 2, 3]\nnumbers.remove(2)\nprint(numbers)\n```\n\nA. [1, 2, 3]\nB. [1, 3]\nC. [2, 3]\nD. [1, 2]',
    options: [
      'A. [1, 2, 3]',
      'B. [1, 3]',
      'C. [2, 3]',
      'D. [1, 2]'
    ],
    answer: 1, // B
    explanation: '这是一个找规律题！\n\n1. 原列表：[1, 2, 3]\n2. remove(2) 会删除值为 2 的元素（注意是删除值2，不是位置2）\n3. 删除后剩下：[1, 3]\n\n数学知识：注意区分"值"和"位置"，remove() 删除的是值。',
    hint: 'remove(2) 删除的是值为2的元素'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '分组问题',
    question: '列表中有几个数字大于5？\n\n```python\nnumbers = [3, 7, 2, 8, 5, 9]\nnumbers.append(6)\n```\n\nA. 2个\nB. 3个\nC. 4个\nD. 5个',
    options: [
      'A. 2个',
      'B. 3个',
      'C. 4个',
      'D. 5个'
    ],
    answer: 2, // C
    explanation: '这是一个分组计数问题！\n\n1. 原列表中大于5的数：7, 8, 9（3个）\n2. append(6) 添加的6不大于5\n3. 最终大于5的数：7, 8, 9（还是3个）\n\n等等！让我重新数：\n原列表 [3, 7, 2, 8, 5, 9] 中大于5的是：7, 8, 9\n添加6后是 [3, 7, 2, 8, 5, 9, 6]，大于5的：7, 8, 9, 6（4个！）\n\n数学知识：条件计数，需要逐一判断每个元素是否满足条件。',
    hint: '先找出原列表中大于5的数，再看添加的数是否大于5'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '算式计算',
    question: '执行下面的代码，列表中所有数的和是多少？\n\n```python\nnumbers = [10, 20, 30]\nnumbers.append(15)\nnumbers.remove(20)\n```\n\nA. 55\nB. 75\nC. 60\nD. 45',
    options: [
      'A. 55',
      'B. 75',
      'C. 60',
      'D. 45'
    ],
    answer: 0, // A
    explanation: '这是一个求和计算题！\n\n1. 初始列表：[10, 20, 30]，和 = 60\n2. append(15) 后：[10, 20, 30, 15]，和 = 75\n3. remove(20) 后：[10, 30, 15]，和 = 55\n\n最终和 = 10 + 30 + 15 = 55\n\n数学知识：加减法运算，添加一个数是加，删除一个数是减。',
    hint: '10 + 20 + 30 + 15 - 20 = ?'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '变量计算',
    question: '执行下面的代码，变量 n 的值是多少？\n\n```python\nnumbers = [5, 10, 15]\nn = len(numbers)\nnumbers.append(20)\nnumbers.remove(10)\nn = len(numbers)\n```\n\nA. 2\nB. 3\nC. 4\nD. 5',
    options: [
      'A. 2',
      'B. 3',
      'C. 4',
      'D. 5'
    ],
    answer: 1, // B
    explanation: '这是一个变量变化跟踪题！\n\n1. numbers = [5, 10, 15]，有3个元素\n2. n = len(numbers) → n = 3\n3. append(20) 后 → [5, 10, 15, 20]，有4个元素\n4. remove(10) 后 → [5, 15, 20]，有3个元素\n5. n = len(numbers) → n = 3\n\n最终 n = 3\n\n数学知识：跟踪变量值的变化，理解每一步操作对列表长度的影响。',
    hint: 'len() 返回列表中元素的个数'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '植树问题',
    question: '列表中有重复的数字，执行后剩下几个 2？\n\n```python\nnumbers = [1, 2, 2, 3, 2]\nnumbers.remove(2)\nnumbers.append(2)\n```\n\nA. 1个\nB. 2个\nC. 3个\nD. 4个',
    options: [
      'A. 1个',
      'B. 2个',
      'C. 3个',
      'D. 4个'
    ],
    answer: 2, // C
    explanation: '这是一个变化计数问题！\n\n1. 初始：[1, 2, 2, 3, 2]，有3个2\n2. remove(2) 删除第一个2：[1, 2, 3, 2]，剩2个2\n3. append(2) 添加一个2：[1, 2, 3, 2, 2]，有3个2\n\n最终有3个2\n\n数学知识：remove() 只删除第一个匹配元素，理解重复元素的处理方式。',
    hint: 'remove(2) 只删除第一个2，不是全部'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L6-1',
  title: '列表入门',
  subtitle: '学会列表的创建、添加和删除',
  difficulty: '入门',
  estimatedTime: '30-40分钟',
  learningGoals: [
    '理解列表的概念和用途',
    '学会创建列表',
    '掌握 append() 添加元素',
    '掌握 remove() 删除元素'
  ],
  prerequisites: [
    '了解变量的基本概念',
    '会用 print() 打印数据',
    '认识方括号和逗号'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['list', 'add', 'cat', 'dog'],
  medium: ['append', 'remove', 'animal'],
  hard: ['giraffe', 'element', 'bracket']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'animals = ["猫", "狗"]',
    'animals.append("兔子")',
    'animals.remove("猫")',
    'print(animals)',
    'fruits = ["苹果"]',
    'numbers = [1, 2, 3]'
  ],
  medium: [
    'animals = ["小狗", "小猫"]\nanimals.append("兔子")',
    'fruits = ["苹果", "香蕉"]\nfruits.remove("苹果")',
    'scores = [95, 87]\nscores.append(92)\nprint(scores)',
    'list = [1, 2, 3]\nlist.append(4)',
    'animals = ["猫", "狗"]\nprint(len(animals))'
  ],
  hard: [
    'animals = []\nanimals.append("猫")\nanimals.append("狗")\nprint(animals)',
    'numbers = [1, 2, 3]\nnumbers.append(4)\nnumbers.remove(2)\nprint(numbers)',
    'scores = [95, 87, 92]\nscores.append(88)\nscores.remove(87)',
    'todo = ["作业", "游戏"]\nif "游戏" in todo:\n    todo.remove("游戏")',
    'animals = ["猫", "狗", "猫"]\nanimals.remove("猫")\nprint(animals)'
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
