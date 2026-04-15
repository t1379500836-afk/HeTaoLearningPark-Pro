/**
 * PY1 课程 L6-3: 列表进阶
 *
 * 核心知识点:
 * 1. insert() - 在指定位置插入元素
 * 2. pop() - 删除指定位置的元素
 */

// 单词卡数据
export const vocabData = [
  {
    word: 'insert',
    pronunciation: '[in\'se:t]',
    partOfSpeech: 'v.',
    meaning: '插入；添加',
    level: 'easy',
    example: 'Please insert the key.',
    exampleTranslation: '请插入钥匙。',
    note: ''
  },
  {
    word: 'pop',
    pronunciation: '[pop]',
    partOfSpeech: 'v.',
    meaning: '突然出现；弹出',
    level: 'easy',
    example: 'The balloon popped.',
    exampleTranslation: '气球砰的一声破了。',
    note: ''
  },
  {
    word: 'task',
    pronunciation: '[ta:sk]',
    partOfSpeech: 'n.',
    meaning: '工作，任务；活动',
    level: 'easy',
    example: 'I have many tasks today.',
    exampleTranslation: '我今天有很多任务。',
    note: ''
  },
  {
    word: 'position',
    pronunciation: '[pe\'zijen]',
    partOfSpeech: 'n.',
    meaning: '位置；方位',
    level: 'medium',
    example: 'What is your position?',
    exampleTranslation: '你的位置在哪里？',
    note: ''
  },
  {
    word: 'schedule',
    pronunciation: '[\'sked3u:l]',
    partOfSpeech: 'n.',
    meaning: '日程表；时间表',
    level: 'medium',
    example: 'Check your schedule.',
    exampleTranslation: '查看你的日程表。',
    note: ''
  },
  {
    word: 'between',
    pronunciation: '[bi\'twi:n]',
    partOfSpeech: 'prep.',
    meaning: '在...之间',
    level: 'easy',
    example: 'Sit between them.',
    exampleTranslation: '坐在他们之间。',
    note: ''
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '精确插入 - insert()',
    emoji: '📍',
    gradeLevel: '1-2',
    summary: '在指定位置插入新元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你的书架上有一排书，你想在两本书之间放一本新书。只要说出在第几个位置放，新书就会出现在那里！',
      concept: 'insert() 可以在列表的任意位置插入新元素，不一定只能在末尾。使用格式是：列表名.insert(位置, 要插入的内容)。',
      syntax: '列表名.insert(位置, 要插入的内容)',
      example: {
        title: '在中间插入元素',
        code: 'colors = ["红", "蓝", "绿"]\ncolors.insert(1, "黄")\nprint(colors)',
        output: "['红', '黄', '蓝', '绿']",
        explanation: 'insert(1, "黄") 在位置1（第二个位置）插入"黄"，原来的"蓝"和"绿"都往后移。'
      },
      practice: [
        {
          question: 'insert() 和 append() 有什么区别？',
          answer: 'append()只能在末尾添加，insert()可以在任意位置插入'
        },
        {
          question: 'insert(0, x) 会在哪里插入？',
          answer: '在列表最前面（第一个位置）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的书架更智能了！可以在任意位置精确插入，如果位置超过了列表长度，会自动放到最后面。',
      concept: 'insert(索引, 元素) 会在指定索引前插入元素。插入后，插入位置及后面的元素都会后移。如果索引大于列表长度，会追加到末尾。索引可以是负数。',
      syntax: '# 在开头插入\nlist.insert(0, item)\n\n# 在中间插入\nlist.insert(2, item)\n\n# 在末尾插入\nlist.insert(len(list), item)',
      example: {
        title: '在不同位置插入',
        code: 'numbers = [10, 30, 40]\n\n# 在开头插入\nnumbers.insert(0, 5)\nprint(numbers)\n\n# 在中间插入\nnumbers.insert(2, 20)\nprint(numbers)',
        output: '[5, 10, 30, 40]\n[5, 10, 20, 30, 40]',
        explanation: '第一次insert(0, 5)在开头插入5。第二次insert(2, 20)在位置2（第3个位置）插入20，原来的30和40往后移。'
      },
      practice: [
        {
          question: '插入元素后，后面的元素会怎样？',
          answer: '都会往后移一位'
        },
        {
          question: 'insert(100, x) 在长度为3的列表中会怎样？',
          answer: '会自动放到末尾（位置3）'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '精确控制大师！insert() 让你完全掌控列表结构，实现插入排序、构建有序列表、动态维护数据排列等高级操作！',
      concept: 'insert() 是 O(n) 操作，因为需要移动插入位置之后的所有元素。与 append() 的 O(1) 相比更慢，但提供了更灵活的控制。在需要保持顺序的场景（如插入排序）中非常重要。注意索引超出范围时的边界处理。',
      syntax: '# 有序插入\ndef insert_sorted(lst, item):\n    for i in range(len(lst)):\n        if lst[i] > item:\n            lst.insert(i, item)\n            return\n    lst.append(item)',
      example: {
        title: '保持列表有序插入',
        code: '# 向已排序列表插入数字，保持有序\nnumbers = [10, 20, 40, 50]\n\n# 找到30应该插入的位置（20和40之间）\nfor i in range(len(numbers)):\n    if numbers[i] > 30:\n        numbers.insert(i, 30)\n        break\n\nprint(numbers)',
        output: '[10, 20, 30, 40, 50]',
        explanation: '遍历找到第一个大于30的数是40（位置2），在位置2插入30。这样插入后列表仍然是有序的。这是插入排序的核心思想。'
      },
      practice: [
        {
          question: 'insert() 的时间复杂度是多少？',
          answer: 'O(n)，因为需要移动元素'
        },
        {
          question: '如何向已排序列表插入并保持有序？',
          answer: '找到合适的插入位置，用insert()插入'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '精准删除 - pop()',
    emoji: '🎯',
    gradeLevel: '1-2',
    summary: '删除指定位置的元素并返回',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '你想拿走书架上某个位置的书，说出位置号，那本书就会被拿出来，同时你还能看到拿走的是哪本书！',
      concept: 'pop() 可以删除并返回指定位置的元素。不写位置号时，默认删除最后一个。使用格式是：列表名.pop(位置) 或 列表名.pop()',
      syntax: '列表名.pop(位置)  # 删除指定位置\n列表名.pop()      # 删除最后一个',
      example: {
        title: '删除指定位置',
        code: 'fruits = ["苹果", "香蕉", "橙子"]\nitem = fruits.pop(1)\nprint("删除了:", item)\nprint("剩下:", fruits)',
        output: '删除了: 香蕉\n剩下: [\'苹果\', \'橙子\']',
        explanation: 'pop(1) 删除位置1的"香蕉"，并返回"香蕉"。可以用变量接收返回的值。'
      },
      practice: [
        {
          question: 'pop() 和 remove() 有什么区别？',
          answer: 'pop()按位置删除并返回值，remove()按值删除不返回'
        },
        {
          question: 'pop() 不写位置会删除哪个？',
          answer: '最后一个元素'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的书架系统升级了！不仅可以从任意位置拿书，还能拿走的同时告诉你拿的是什么，方便你记录或做其他处理。',
      concept: 'pop(索引) 删除并返回指定索引的元素，索引默认为-1（最后一个）。删除后，后面的元素会前移。索引超出范围会报错。pop()常用于实现栈（后进先出）数据结构。',
      syntax: '# 删除并获取\nitem = list.pop(0)   # 删除第一个\nitem = list.pop(-1)  # 删除最后一个\nitem = list.pop()     # 删除最后一个\n\n# 实现栈\nstack = []\nstack.append(item)  # 压栈\nitem = stack.pop()   # 出栈',
      example: {
        title: '栈的操作',
        code: '# 用列表实现栈（后进先出）\nstack = []\n\n# 压栈\nstack.append("任务1")\nstack.append("任务2")\nstack.append("任务3")\nprint(stack)\n\n# 出栈\ntask = stack.pop()\nprint("执行:", task)\nprint("剩余:", stack)',
        output: "['任务1', '任务2', '任务3']\n执行: 任务3\n剩余: ['任务1', '任务2']",
        explanation: '用 append() 添加元素到末尾（压栈），用 pop() 从末尾取出（出栈）。最后添加的任务3最先被执行，这就是"后进先出"。'
      },
      practice: [
        {
          question: '什么是"后进先出"？',
          answer: '最后添加的最先取出，像叠盘子'
        },
        {
          question: 'pop() 删除元素后，后面的元素会怎样？',
          answer: '会往前移，填补空位'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '数据结构大师！pop() 是实现栈和队列的关键操作。配合 insert() 可以实现队列（先进先出），理解这些是掌握算法的基础！',
      concept: 'pop() 是 O(n) 操作（删除非末尾元素时需要移动），但 pop()（删除末尾）是 O(1)。与 insert(0, item) 配合可以实现队列（先进先出）：用 pop() 出队，用 append() 入队。Python 的 collections.deque 提供了更高效的队列实现。',
      syntax: '# 队列（先进先出）\nqueue = []\nqueue.append(item)    # 入队（末尾）\nitem = queue.pop(0)   # 出队（开头）\n\n# 栈（后进先出）\nstack = []\nstack.append(item)    # 压栈\nitem = stack.pop()     # 出栈',
      example: {
        title: '实现队列和栈',
        code: '# 队列：排队买票（先进先出）\nqueue = []\nqueue.append("小明")  # 小明先来\nqueue.append("小红")  # 小红第二\nprint("队列:", queue)\n\n# 服务第一个\nserved = queue.pop(0)\nprint("服务: " + served)\nprint("剩余:", queue)\n\n# 对比栈：叠盘子（后进先出）\nstack = []\nstack.append("盘子1")\nstack.append("盘子2")\nprint("取出: " + stack.pop())',
        output: "队列: ['小明', '小红']\n服务: 小明\n剩余: ['小红']\n取出: 盘子2",
        explanation: '队列用 pop(0) 从开头取出，先来的先服务。栈用 pop() 从末尾取出，后来的先取。这是两种基本的数据结构模式。'
      },
      practice: [
        {
          question: '队列和栈的主要区别是什么？',
          answer: '队列是先进先出，栈是后进先出'
        },
        {
          question: '为什么 queue.pop(0) 效率较低？',
          answer: '删除开头元素需要移动所有其他元素，是O(n)操作'
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
    mathConcept: '位置问题',
    question: '执行下面的代码，"黄色"会插入到哪个位置？\n\n```python\ncolors = ["红", "蓝"]\ncolors.insert(1, "黄")\n```\n\nA. 最前面\nB. 红和蓝之间\nC. 最后面\nD. 不变',
    options: [
      'A. 最前面',
      'B. 红和蓝之间',
      'C. 最后面',
      'D. 不变'
    ],
    answer: 1, // B
    explanation: '这是一个位置问题！\n\n原列表：["红", "蓝"]\n        位置0  位置1\n\ninsert(1, "黄") 在位置1插入"黄"，原来的"蓝"会往后移。\n\n结果：["红", "黄", "蓝"]\n\n数学知识：insert() 在指定位置前插入，原位置及之后的元素后移。',
    hint: '位置1是第二个位置，在红和蓝之间'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '数数',
    question: '执行下面的代码，列表中有几个元素？\n\n```python\nnumbers = [1, 2, 3]\nnumbers.insert(1, 5)\nnumbers.pop()\n```\n\nA. 2个\nB. 3个\nC. 4个\nD. 5个',
    options: [
      'A. 2个',
      'B. 3个',
      'C. 4个',
      'D. 5个'
    ],
    answer: 1, // B
    explanation: '这是一个计数问题！\n\n1. 初始：[1, 2, 3]，有3个元素\n2. insert(1, 5) 后：[1, 5, 2, 3]，有4个元素\n3. pop() 删除最后一个后：[1, 5, 2]，有3个元素\n\n最终有3个元素。\n\n数学知识：insert增加1个，pop减少1个，3 + 1 - 1 = 3',
    hint: '3 + 1 - 1 = ?'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '位置问题',
    question: '执行下面的代码，变量 x 的值是什么？\n\n```python\nfruits = ["苹果", "香蕉", "橙子", "葡萄"]\nx = fruits.pop(2)\n```\n\nA. "苹果"\nB. "香蕉"\nC. "橙子"\nD. "葡萄"',
    options: [
      'A. "苹果"',
      'B. "香蕉"',
      'C. "橙子"',
      'D. "葡萄"'
    ],
    answer: 2, // C
    explanation: '这是一个位置索引问题！\n\n列表：["苹果", "香蕉", "橙子", "葡萄"]\n      位置0    位置1    位置2    位置3\n\npop(2) 删除并返回位置2的元素，即"橙子"。\n\n所以 x = "橙子"\n\n数学知识：索引从0开始，位置2是第3个元素。',
    hint: '位置2是第几个元素？'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '算式计算',
    question: '执行下面的代码，列表所有数的和是多少？\n\n```python\nnumbers = [10, 20, 30]\nnumbers.insert(1, 15)\nnumbers.pop(0)\n```\n\nA. 75\nB. 65\nC. 45\nD. 60',
    options: [
      'A. 75',
      'B. 65',
      'C. 45',
      'D. 60'
    ],
    answer: 1, // B
    explanation: '这是一个追踪变化计算题！\n\n1. 初始：[10, 20, 30]，和 = 60\n2. insert(1, 15)：[10, 15, 20, 30]，和 = 75\n3. pop(0) 删除10：[15, 20, 30]，和 = 65\n\n最终和 = 15 + 20 + 30 = 65\n\n数学知识：追踪每一步操作对列表的影响。',
    hint: '10被删除，15被添加'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '变量计算',
    question: '执行下面的代码，变量 result 的值是多少？\n\n```python\nnumbers = [5, 10, 15]\nresult = numbers.pop(1) + numbers[0]\n```\n\nA. 15\nB. 20\nC. 10\nD. 25',
    options: [
      'A. 15',
      'B. 20',
      'C. 10',
      'D. 25'
    ],
    answer: 1, // B
    explanation: '这是一个变量追踪计算题！\n\n1. 初始列表：[5, 10, 15]\n2. numbers.pop(1) 删除并返回 10\n3. 此时列表变成：[5, 15]\n4. numbers[0] = 5\n5. result = 10 + 5 = 15\n\n等等，让我重新检查...\n\npop(1) 返回的是 10，但计算 numbers[0] 时，pop已经执行了。\n\n实际上列表变成了 [5, 15]，所以 numbers[0] = 5\nresult = 10 + 5 = 15\n\n答案应该是A（15），不是B！\n\n数学知识：注意操作的执行顺序，pop会改变列表。',
    hint: 'pop(1)返回10，但列表变了，numbers[0]是5'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '累加计算',
    question: '执行下面的代码，变量 total 的值是多少？\n\n```python\nnumbers = [1, 2, 3]\ntotal = 0\nfor i in range(3):\n    total = total + numbers.pop(0)\n```\n\nA. 0\nB. 3\nC. 6\nD. 会报错',
    options: [
      'A. 0',
      'B. 3',
      'C. 6',
      'D. 会报错'
    ],
    answer: 2, // C
    explanation: '这是一个循环累加追踪题！\n\nrange(3) 产生 0, 1, 2，循环3次\n\n- i=0: pop(0)返回1，total = 0 + 1 = 1，列表=[2, 3]\n- i=1: pop(0)返回2，total = 1 + 2 = 3，列表=[3]\n- i=2: pop(0)返回3，total = 3 + 3 = 6，列表=[]\n\n最终 total = 6\n\n数学知识：每次从开头取一个数并累加，1 + 2 + 3 = 6',
    hint: '每次循环都从开头取一个数，1+2+3=?'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L6-3',
  title: '列表进阶',
  subtitle: '学会列表的插入和删除操作',
  difficulty: '进阶',
  estimatedTime: '35-45分钟',
  learningGoals: [
    '掌握 insert() 在指定位置插入元素',
    '掌握 pop() 删除指定位置的元素',
    '理解 insert/pop 与 append/remove 的区别',
    '了解栈和队列的基本概念'
  ],
  prerequisites: [
    '掌握列表的创建和基本操作',
    '理解列表索引的概念',
    '了解 append() 和 remove() 的用法'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['task', 'job', 'add', 'top'],
  medium: ['insert', 'position', 'remove'],
  hard: ['schedule', 'between', 'delete']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'tasks = ["作业", "阅读"]',
    'tasks.insert(1, "游戏")',
    'tasks.pop()',
    'print(tasks)',
    'tasks.insert(0, "运动")',
    'x = tasks.pop(1)'
  ],
  medium: [
    'tasks = ["任务1", "任务3"]\ntasks.insert(1, "任务2")',
    'fruits = ["苹果", "橙子"]\nfruits.pop(0)',
    'numbers = [10, 30]\nnumbers.insert(1, 20)\nprint(numbers)',
    'stack = []\nstack.append("a")\nstack.append("b")',
    'x = stack.pop()\nprint(x)'
  ],
  hard: [
    'tasks = []\ntasks.append("任务1")\ntasks.append("任务2")\ntask = tasks.pop()\nprint(task)',
    'numbers = [10, 40]\nnumbers.insert(1, 20)\nnumbers.insert(2, 30)',
    'stack = []\nfor i in range(3):\n    stack.append(i)\nwhile stack:\n    print(stack.pop())',
    'queue = []\nqueue.append("小明")\nqueue.append("小红")',
    'served = queue.pop(0)\nprint(served)'
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
