/**
 * PY1 课程 L2-2: for 循环
 *
 * 核心知识点:
 * 1. for 循环基本格式
 * 2. range() 函数
 * 3. for 循环应用
 */

// 单词卡数据 - OCR 提取
export const vocabData = [
  {
    word: 'for',
    pronunciation: '[fo:r]',
    partOfSpeech: 'prep./conj.',
    meaning: '为了；对；因为',
    level: 'easy',
    example: 'For the people',
    exampleTranslation: '为了人民',
    note: 'for 为了'
  },
  {
    word: 'in',
    pronunciation: '[in]',
    partOfSpeech: 'prep./adv.',
    meaning: '在...里面；参与',
    level: 'easy',
    example: 'In the box',
    exampleTranslation: '在盒子里面',
    note: 'in 在...里面'
  },
  {
    word: 'range',
    pronunciation: '[reindʒ]',
    partOfSpeech: 'n./v.',
    meaning: '区间；范围；徘徊',
    level: 'medium',
    example: 'range of motion',
    exampleTranslation: '活动范围',
    note: 'range 区间'
  },
  {
    word: 'shoot',
    pronunciation: '[ʃu:t]',
    partOfSpeech: 'v./n.',
    meaning: '射击；发芽',
    level: 'medium',
    example: 'shoot a ball',
    exampleTranslation: '投篮',
    note: 'shoot 射击'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '重复执行 - for循环',
    emoji: '🔁',
    gradeLevel: '1-2',
    summary: '让代码重复执行',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一台复印机，可以让你想复制的图案重复打印多次！for循环就是这样的复印机，让代码重复执行！',
      concept: 'for循环可以让代码重复执行指定的次数。',
      syntax: 'for i in range(次数):\n    要重复的代码',
      example: {
        title: '简单的for循环',
        code: 'for i in range(3):\n    print("你好")',
        output: '你好\n你好\n你好',
        explanation: 'range(3)表示重复3次，所以打印3次"你好"。'
      },
      practice: [
        {
          question: 'for循环后面要加什么符号？',
          answer: '要加冒号 :'
        },
        {
          question: 'range(3)表示重复几次？',
          answer: '重复3次'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的复印机升级了！现在你可以精确控制重复的次数，就像数数一样简单！',
      concept: 'for i in range(n) 表示重复n次，i会从0数到n-1。',
      syntax: 'for i in range(n):\n    重复的代码\n# i会依次是0,1,2,...,n-1',
      example: {
        title: '使用循环变量',
        code: 'for i in range(4):\n    print(i)',
        output: '0\n1\n2\n3',
        explanation: 'range(4)表示4次，i依次是0,1,2,3。每次循环打印i的值。'
      },
      practice: [
        {
          question: 'range(4)中i的值依次是什么？',
          answer: '0, 1, 2, 3'
        },
        {
          question: 'for循环中的i叫什么？',
          answer: '叫循环变量'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '循环大师！你现在可以用for循环做各种复杂的事情！',
      concept: 'for循环可以和变量、运算结合，实现复杂的重复逻辑。',
      syntax: 'for 变量 in range(开始,结束,步长):\n    代码',
      example: {
        title: '指定范围和步长',
        code: 'for i in range(1, 10, 2):\n    print(i)',
        output: '1\n3\n5\n7\n9',
        explanation: 'range(1,10,2)表示从1到9，步长2，所以打印1,3,5,7,9。\n\n数学知识：等差数列，公差为2。',
        hint: '从1开始，每次加2，直到小于10'
      },
      practice: [
        {
          question: 'range(1,10,2)中第三个参数是什么？',
          answer: '是步长'
        },
        {
          question: '如何只取偶数？',
          answer: 'range(0, 10, 2)'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '计数工具 - range函数',
    emoji: '📊',
    gradeLevel: '1-2',
    summary: '控制循环次数',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'range就像一个会自动数数的计数器，帮你数到指定的数字！',
      concept: 'range(n) 会生成从0到n-1的数列，共n个数字。',
      syntax: 'range(n)  # 生成0到n-1\n例如：range(5) = 0,1,2,3,4',
      example: {
        title: 'range基本用法',
        code: 'for i in range(5):\n    print(i)',
        output: '0\n1\n2\n3\n4',
        explanation: 'range(5)生成0,1,2,3,4，共5个数字，循环5次。'
      },
      practice: [
        {
          question: 'range(5)有几个数字？',
          answer: '5个：0,1,2,3,4'
        },
        {
          question: 'range(3)会循环几次？',
          answer: '3次'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的计数器更高级了！现在你可以设置开始的数字！',
      concept: 'range(开始, 结束) 表示从开始到结束（不含结束）的数列。',
      syntax: 'range(开始, 结束)  # 含开始，不含结束\n例如：range(2, 6) = 2,3,4,5',
      example: {
        title: 'range指定开始',
        code: 'for i in range(2, 7):\n    print(i)',
        output: '2\n3\n4\n5\n6',
        explanation: 'range(2,7)生成2,3,4,5,6，共5个数字。\n\n数学知识：这是等差数列，首项2，公差1。'
      },
      practice: [
        {
          question: 'range(2, 7)包含7吗？',
          answer: '不包含'
        },
        {
          question: 'range(1, 5)有几个数字？',
          answer: '4个：1,2,3,4'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '计数器专家！你现在完全掌握range的用法了！',
      concept: 'range(开始, 结束, 步长) 可以设置步长，可以控制递增或递减。',
      syntax: 'range(开始, 结束, 步长)  # 含开始，不含结束，按步长变化\nrange(5, 0, -1) = 5,4,3,2,1',
      example: {
        title: '倒序循环',
        code: 'for i in range(5, 0, -1):\n    print(i)',
        output: '5\n4\n3\n2\n1',
        explanation: 'range(5,0,-1)从5倒到1，步长-1。\n\n数学知识：这是等差数列，公差-1。'
      },
      practice: [
        {
          question: 'range(5, 0, -1)最后打印什么？',
          answer: '1'
        },
        {
          question: '正序和倒序的区别是什么？',
          answer: '步长为正数是递增，为负数是递减'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '缩进与作用域',
    emoji: '📏',
    gradeLevel: '1-2',
    summary: '理解循环中的缩进',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '在for循环中，缩进的代码会被重复执行，不缩进的代码只执行一次！',
      concept: '缩进一次（4个空格）的代码是for循环的下级代码，会被重复执行。',
      syntax: 'for i in range(3):\n    print("重复")  # 这行会重复执行\nprint("执行一次")  # 这行只执行一次',
      example: {
        title: '缩进的区别',
        code: 'for i in range(3):\n    print("a")\nprint("b")',
        output: 'a\na\na\nb',
        explanation: 'print("a")有缩进，循环3次；print("b")没有缩进，只执行1次在循环结束后。'
      },
      practice: [
        {
          question: '缩进的代码在哪里执行？',
          answer: '在循环内部执行'
        },
        {
          question: '不缩进的代码执行几次？',
          answer: '只执行1次'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你现在理解缩进了！可以用这个特性来做计数器！',
      concept: '利用缩进可以实现：循环内累加、循环外输出结果。',
      syntax: '循环开始前设置变量\n在循环中修改变量\n循环结束后使用变量',
      example: {
        title: '累加计算',
        code: 'total = 0\nfor i in range(5):\n    total = total + 1\nprint(total)',
        output: '5',
        explanation: '循环5次，每次total加1，最后total=5。\n\n数学知识：这是计算1+1+1+1+1=5。'
      },
      practice: [
        {
          question: '循环外能使用循环变量i吗？',
          answer: '不能，i在循环结束后会消失'
        },
        {
          question: '如何保存循环的结果？',
          answer: '用变量在循环中累加'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '缩进专家！你现在完全理解了！',
      concept: '复杂的嵌套缩进可以实现复杂的逻辑。',
      syntax: '外层循环\n    外层代码\n    内层循环\n        内层代码',
      example: {
        title: '双重循环',
        code: 'for i in range(2):\n    for j in range(3):\n        print(i, j)',
        output: '0 0\n0 1\n0 2\n1 0\n1 1\n1 2',
        explanation: '外层循环2次，内层循环3次，共6次。\n\n数学知识：2×3=6，排列组合。'
      },
      practice: [
        {
          question: '双重循环执行多少次？',
          answer: '外层次数×内层次数'
        },
        {
          question: '内层循环和外层循环有什么关系？',
          answer: '内层循环在外层循环的每次中都会执行'
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
    question: '执行下面的代码，会打印几次"你好"？\n\n```python\nfor i in range(3):\n    print("你好")\n```',
    options: [
      'A. 2次',
      'B. 3次',
      'C. 4次',
      'D. 5次'
    ],
    answer: 1, // B
    explanation: 'range(3)表示重复3次，所以打印3次"你好"。',
    hint: 'range(3) 是几？'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '符号识别',
    question: '下面哪个是for循环的正确格式？',
    options: [
      'A. A选项',
      'B. B选项',
      'C. C选项',
      'D. D选项'
    ],
    answer: 1, // B
    explanation: '正确的for循环格式：for i in range(n):后面要有冒号，循环体要缩进。选项B符合。',
    hint: '注意冒号和缩进'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '算式计算',
    question: '执行下面的代码，变量total的值是多少？\n\n```python\ntotal = 0\nfor i in range(4):\n    total = total + 1\nprint(total)\n```',
    options: [
      'A. 3',
      'B. 4',
      'C. 5',
      'D. 6'
    ],
    answer: 1, // B
    explanation: 'total初始为0，循环4次，每次加1。\n\n0→1→2→3→4，所以最后total=4。\n\n数学知识：这是计算1+1+1+1=4。',
    hint: 'total 每次加1，加4次'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '循环变量',
    question: '执行下面的代码，会输出什么？\n\n```python\nfor i in range(2, 6):\n    print(i)\n```',
    options: [
      'A. 2 3 4 5',
      'B. 2 3 4 5 6',
      'C. 1 2 3 4 5',
      'D. 3 4 5 6'
    ],
    answer: 0, // A
    explanation: 'range(2,6)生成2,3,4,5（不含6）。\n\n数学知识：这是等差数列，首项2，公差1。',
    hint: 'range(2,6) 不包含6'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '循环计算',
    question: '执行下面的代码，总和是多少？\n\n```python\ntotal = 0\nfor i in range(1, 6, 2):\n    total = total + i\nprint(total)\n```',
    options: [
      'A. 5',
      'B. 6',
      'C. 9',
      'D. 12'
    ],
    answer: 2, // C
    explanation: 'range(1,6,2)生成1,3,5。\n\ntotal = 0 + 1 + 3 + 5 = 9。\n\n数学知识：1+3+5=9，这是奇数求和。',
    hint: '1 + 3 + 5 = ?'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '双重循环',
    question: '执行下面的代码，会输出几个数字？\n\n```python\nfor i in range(2):\n    for j in range(3):\n        print(i, j)\n```',
    options: [
      'A. 4个',
      'B. 5个',
      'C. 6个',
      'D. 9个'
    ],
    answer: 2, // C
    explanation: '外层循环2次，内层循环3次，共2×3=6次。\n\n每次都打印一个数字对(i, j)，共6个输出。\n\n数学知识：2×3=6，排列组合。',
    hint: '外层次数 × 内层次数'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L2-2',
  title: 'for 循环',
  subtitle: '学会用 for 循环重复执行代码',
  difficulty: '进阶',
  estimatedTime: '30-40分钟',
  learningGoals: [
    '理解 for 循环的基本概念',
    '掌握 range() 函数的用法',
    '能够使用 for 循环解决实际问题',
    '了解嵌套循环'
  ],
  prerequisites: [
    '掌握 print() 命令',
    '理解变量的概念',
    '了解基本的数学运算'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['for', 'loop', 'range', 'repeat'],
  medium: ['iteration', 'variable', 'counter', 'index'],
  hard: ['nested', 'iteration', 'sequence', 'step']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'for i in range(3):\nprint(i)',
    'for i in range(5):\nprint("hello")',
    'for i in range(4):\nprint(i)',
    'for i in range(2):\nprint("a")'
  ],
  medium: [
    'for i in range(1, 5):\nprint(i)',
    'for i in range(2, 8, 2):\nprint(i)',
    'total = 0\nfor i in range(4):\ntotal = total + 1',
    'for i in range(3):\nprint(i * 2)'
  ],
  hard: [
    'for i in range(5, 0, -1):\nprint(i)',
    'for i in range(3):\nfor j in range(2):\nprint(i, j)',
    'total = 0\nfor i in range(1, 6, 2):\ntotal = total + i',
    'for i in range(4):\n    if i % 2 == 0:\n        print(i)'
  ]
}

// 导出所有数据
export const L2_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L2_2_data