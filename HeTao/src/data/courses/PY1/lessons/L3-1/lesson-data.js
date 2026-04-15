/**
 * PY1 课程 L3-1: 变量修改和计数
 *
 * 核心知识点:
 * 1. 变量修改 - 使用赋值语句修改变量的值
 * 2. 变量计数 - 在循环中对变量进行连续修改
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'move',
    pronunciation: '[mu:v]',
    partOfSpeech: 'v./n.',
    meaning: '移动；搬家；调动；使感动',
    level: 'easy',
    example: 'The cat moves slowly.',
    exampleTranslation: '猫慢慢移动。',
    note: 'on the move 在活动中'
  },
  {
    word: 'cat',
    pronunciation: '[kæt]',
    partOfSpeech: 'n.',
    meaning: '猫；猫科动物',
    level: 'easy',
    example: 'The cat is sleeping.',
    exampleTranslation: '猫在睡觉。',
    note: ''
  },
  {
    word: 'dog',
    pronunciation: '[dɒɡ]',
    partOfSpeech: 'n./v.',
    meaning: '狗；公狗；困扰；纠缠；跟踪',
    level: 'easy',
    example: 'The dog is running.',
    exampleTranslation: '狗在跑。',
    note: ''
  },
  {
    word: 'total',
    pronunciation: "['təʊt(ə)l]",
    partOfSpeech: 'adj./n./v.',
    meaning: '总的；彻底的；总数；计算...的总和',
    level: 'medium',
    example: 'The total is 100.',
    exampleTranslation: '总数是100。',
    note: 'in total 总共'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '变量修改',
    emoji: '🔄',
    gradeLevel: '1-2',
    summary: '使用赋值语句修改变量的值',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个神奇的盒子，你可以随时把里面的东西换成别的！变量就像这个盒子，可以改变它存储的内容。',
      concept: '变量的值可以使用赋值语句 "=" 进行修改。等号右边的结果会赋值给左边的变量，替换掉原来的值。',
      syntax: '变量名 = 新值',
      example: {
        title: '修改变量值',
        code: "n = 'home'\nn = 'homework'\nprint(n)",
        output: 'homework',
        explanation: '第一次n存储"home"，第二次n被重新赋值为"homework"，所以最终打印"homework"。'
      },
      practice: [
        {
          question: '如何把变量n的值改成10？',
          answer: 'n = 10'
        },
        {
          question: '变量n原来存储5，执行n = 8后，n的值是多少？',
          answer: '8（新值替换了旧值）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的魔法盒升级了！不仅可以直接替换内容，还可以基于原来的值进行计算修改！比如让数字增加，让文字变长！',
      concept: '修改变量时，新值可以基于旧值计算得出。例如 n = n + 1 表示让n的值在原来的基础上增加1。需要注意字符串拼接和数字计算的区别。',
      syntax: "# 字符串拼接\nn = n + 'word'\n\n# 数字计算\nn = n + 1",
      example: {
        title: '累加修改变量',
        code: 'n = 5\nn = n + 3\nprint(n)',
        output: '8',
        explanation: 'n初始值是5，执行 n = n + 3 时，先计算右边 5 + 3 = 8，然后把8赋值给n，所以n变成8。'
      },
      practice: [
        {
          question: 'n = 10，执行 n = n + 5 后，n的值是多少？',
          answer: '15'
        },
        {
          question: 's = "hello"，执行 s = s + " world" 后，s的值是多少？',
          answer: '"hello world"（字符串拼接）'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '变量大师模式！你可以在循环中不断修改变量，让变量值按规律变化！这是编程中非常重要的累加思想。',
      concept: '在循环中使用 n = n + 1 可以实现变量值的连续变化。每次循环都会让n增加1，经过多次循环后，n会从初始值逐渐变大。这种模式叫做"累加"。',
      syntax: "# 循环累加\nn = 初始值\nfor i in range(次数):\n    n = n + 1\nprint(n)",
      example: {
        title: '循环累加',
        code: 'n = 1\nfor i in range(4):\n    n = n + 1\nprint(n)',
        output: '5',
        explanation: 'n从1开始，循环4次，每次增加1：1→2→3→4→5。最终n的值是5。'
      },
      practice: [
        {
          question: 'n = 0，循环3次执行 n = n + 2，最终n是多少？',
          answer: '6（每次增加2，共3次：0+2+2+2=6）'
        },
        {
          question: '如何用循环让变量n从1变到10？',
          answer: 'n = 1\nfor i in range(9):\n    n = n + 1'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '变量计数',
    emoji: '🔢',
    gradeLevel: '1-2',
    summary: '使用变量在循环中统计数量',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你在数操场上有多少只猫。你可以用一个数字来记录，每看到一只猫，就让这个数字加1！这就是变量计数。',
      concept: '变量计数就是用一个变量来记录数量。开始时把变量设为0，然后在循环中每次加1，最后变量中存储的就是总数。',
      syntax: '# 设置初始值\nn = 0\n\n# 循环中计数\nfor 每一次:\n    n = n + 1',
      example: {
        title: '统计猫的数量',
        code: "cat = 0\nfor i in range(3):\n    cat = cat + 1\nprint(cat)",
        output: '3',
        explanation: 'cat从0开始，循环3次，每次加1：0→1→2→3。最终cat的值是3，表示有3只猫。'
      },
      practice: [
        {
          question: '计数变量通常从什么数字开始？',
          answer: '从0开始'
        },
        {
          question: '每次计数时，变量应该怎么变化？',
          answer: '每次加1（n = n + 1）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '计数升级！现在你不仅数猫，还能数任何东西！只要设置好初始值，然后在循环中根据条件来增加计数器！',
      concept: '变量计数需要三个步骤：①设置初始值（通常是0）②在循环中根据条件修改变量③循环结束后得到统计结果。可以用if语句来判断是否需要计数。',
      syntax: "# 计数模式\nn = 0\nfor i in range(次数):\n    if 满足条件:\n        n = n + 1\nprint(n)",
      example: {
        title: '条件计数',
        code: "cat = 0\nfor i in range(4):\n    if i > 1:\n        cat = cat + 1\nprint(cat)",
        output: '2',
        explanation: 'i的值是0,1,2,3。只有i=2和i=3时满足i>1，所以cat增加2次，最终值是2。'
      },
      practice: [
        {
          question: '如何统计1到5中有多少个偶数？',
          answer: '用循环加if判断，当i能被2整除时计数'
        },
        {
          question: '计数结束后，变量的值代表什么？',
          answer: '代表满足条件的数量总数'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '计数大师模式！你可以用变量进行复杂的统计：计数、求和、找最大值...只要改变循环中的处理方式，就能实现各种统计功能！',
      concept: '变量计数的本质是累加思想。不仅可以用 n = n + 1 来计数，还可以用 n = n + 数字 来求和，或者用比较来记录最大值。这些都是基于"在循环中更新变量"的核心思想。',
      syntax: "# 计数累加模式\nn = 初始值\nfor i in range(次数):\n    n = n + 步长\nprint(n)",
      example: {
        title: '累加求和',
        code: 'total = 0\nfor i in range(5):\n    total = total + i\nprint(total)',
        output: '10',
        explanation: 'i依次是0,1,2,3,4，total累加：0+0+1+2+3+4=10。这是求和的基本模式。'
      },
      practice: [
        {
          question: '如何计算1到10的和？',
          answer: 'total = 0\nfor i in range(1, 11):\n    total = total + i'
        },
        {
          question: '计数(n=n+1)和求和(n=n+i)有什么区别？',
          answer: '计数每次加1，统计个数；求和每次加i，累加数值'
        }
      ]
    }
  }
]

// 习题数据（根据源文件知识点创作6道拓展题）
export const exercises = [
  // 🟢 基础题（1-2年级）
  {
    id: 'ex-1',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '变量替换',
    question: '执行下面的代码，程序会打印出什么？\n\n```python\nn = "home"\nn = "homework"\nprint(n)\n```\n\nA. home\nB. homework\nC. n\nD. 程序报错',
    options: [
      'A. home',
      'B. homework',
      'C. n',
      'D. 程序报错'
    ],
    answer: 1,
    explanation: '第1行n存储"home"，第2行n被重新赋值为"homework"，旧值被替换，所以打印"homework"。',
    hint: '新值会替换旧值'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '计数起始值',
    question: '要做变量计数，应该把变量初始化为什么值？\n\nA. 1\nB. 0\nC. -1\nD. 任意值',
    options: [
      'A. 1',
      'B. 0',
      'C. -1',
      'D. 任意值'
    ],
    answer: 1,
    explanation: '计数器通常从0开始，这样每次加1后的结果就是实际数量。如果从1开始，数量会多1。',
    hint: '计数从0开始，和真实数量一致'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '累加计算',
    question: '执行下面的代码，程序会打印出什么？\n\n```python\nn = 1\nfor i in range(4):\n    n = n + 1\nprint(n)\n```\n\nA. 3\nB. 4\nC. 5\nD. 1111',
    options: [
      'A. 3',
      'B. 4',
      'C. 5',
      'D. 1111'
    ],
    answer: 2,
    explanation: 'n从1开始，循环4次，每次加1：1→2→3→4→5。循环次数是4次，但最终值是5。\n\n数学知识：初始值1 + 循环次数4 = 5',
    hint: 'n从1开始，循环4次每次加1'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '字符串拼接',
    question: '执行下面的代码，程序会打印出什么？\n\n```python\nn = "3"\nn = n + "1"\nprint(n)\n```\n\nA. 4\nB. 31\nC. "31"\nD. 程序报错',
    options: [
      'A. 4',
      'B. 31',
      'C. "31"',
      'D. 程序报错'
    ],
    answer: 1,
    explanation: 'n存储的是字符串"3"，字符串拼接的结果是"31"，不是数字4。字符串拼接和数字计算不同。',
    hint: '注意是字符串拼接还是数字计算'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '条件计数',
    question: '执行下面的代码，程序会打印出什么？\n\n```python\ncat = 0\nfor i in range(5):\n    if i > 2:\n        cat = cat + 1\nprint(cat)\n```\n\nA. 2\nB. 3\nC. 4\nD. 5',
    options: [
      'A. 2',
      'B. 3',
      'C. 4',
      'D. 5'
    ],
    answer: 0,
    explanation: 'i的值依次是0,1,2,3,4。满足i>2的只有3和4，共2个值，所以cat增加2次，最终值是2。\n\n数学知识：在0到4中，大于2的数有2个（3和4）。',
    hint: 'i的值是0,1,2,3,4，哪些满足大于2？'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '累加求和',
    question: '执行下面的代码，程序会打印出什么？\n\n```python\ntotal = 0\nfor i in range(4):\n    total = total + i\nprint(total)\n```\n\nA. 6\nB. 7\nC. 10\nD. 0+1+2+3',
    options: [
      'A. 6',
      'B. 7',
      'C. 10',
      'D. 0+1+2+3'
    ],
    answer: 0,
    explanation: 'i的值依次是0,1,2,3，total累加：0+0=0，0+1=1，1+2=3，3+3=6。最终total是6。\n\n数学知识：0+1+2+3 = 6，这是等差数列求和。',
    hint: '计算0+1+2+3的和'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L3-1',
  title: '变量修改和计数',
  subtitle: '学会修改变量值和在循环中计数',
  difficulty: '入门',
  estimatedTime: '30-40分钟',
  learningGoals: [
    '掌握使用赋值语句修改变量的值',
    '理解累加模式 n = n + 1 的含义',
    '学会使用变量在循环中计数',
    '区分字符串拼接和数字计算'
  ],
  prerequisites: [
    'Python 基础语法',
    'for 循环基础',
    'if 条件判断',
    '变量基础概念'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['move', 'cat', 'stop', 'count'],
  medium: ['total', 'change', 'number', 'value'],
  hard: ['variable', 'modify', 'increase', 'counter']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    "n = 5",
    "n = n + 1",
    "cat = 0",
    "print(n)",
    'for i in range(3):',
    'cat = cat + 1'
  ],
  medium: [
    'n = 1\nfor i in range(4):\n    n = n + 1',
    "s = 'home'\ns = s + 'work'\nprint(s)",
    'cat = 0\nfor i in range(3):\n    cat = cat + 1\nprint(cat)',
    'total = 0\nfor i in range(5):\n    total = total + i'
  ],
  hard: [
    'n = 1\nfor i in range(4):\n    n = n + 1\nprint(n)',
    "s = 'hello'\nfor i in range(3):\n    s = s + '!'\nprint(s)",
    'count = 0\nfor i in range(10):\n    if i > 5:\n        count = count + 1',
    'total = 0\nfor i in range(1, 6):\n    total = total + i\nprint(total)'
  ]
}

// 导出所有数据
export const L3_1_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L3_1_data
