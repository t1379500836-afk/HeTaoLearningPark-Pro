/**
 * PY1 课程 L3-2: 循环变量和应用
 *
 * 核心知识点:
 * 1. 循环变量 - for循环中的变量i
 * 2. 循环变量应用 - 利用循环变量生成有规律的数字
 */

// 单词卡数据（源文件 + 拓展词汇）
export const vocabData = [
  // 源文件单词
  {
    word: 'time',
    pronunciation: '[taim]',
    partOfSpeech: 'n./v.',
    meaning: '时间；为...安排时间',
    level: 'easy',
    example: 'What time is it?',
    exampleTranslation: '现在几点了？',
    note: 'on time 准时',
    source: 'ocr'
  },
  {
    word: 'sleep',
    pronunciation: '[sli:p]',
    partOfSpeech: 'v./n.',
    meaning: '睡觉；睡眠',
    level: 'easy',
    example: 'I sleep at 9 PM.',
    exampleTranslation: '我晚上9点睡觉。',
    note: 'go to sleep 去睡觉',
    source: 'ocr'
  },
  // 拓展编程词汇（循环变量相关）
  {
    word: 'loop',
    pronunciation: '[lu:p]',
    partOfSpeech: 'n./v.',
    meaning: '循环；圈；环',
    level: 'easy',
    example: 'The program runs in a loop.',
    exampleTranslation: '程序循环运行。',
    note: 'for loop for循环',
    source: 'extended'
  },
  {
    word: 'range',
    pronunciation: '[reindʒ]',
    partOfSpeech: 'n./v.',
    meaning: '范围；范围',
    level: 'medium',
    example: 'for i in range(5):',
    exampleTranslation: '循环5次',
    note: 'range() 生成数字序列',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '循环变量',
    emoji: '🔄',
    gradeLevel: '1-2',
    summary: 'for循环中的变量i叫做循环变量',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个神奇的数字计数器，它会自动从0开始数数：0、1、2、3...这个计数器就是循环变量！',
      concept: '在 for i in range() 中，变量 i 叫做循环变量。循环变量会从0开始，每次增加1，直到达到循环次数。循环变量的名字可以改成a、n等，但前后要保持一致。',
      syntax: 'for i in range(次数):\n    # 使用循环变量i',
      example: {
        title: '打印循环变量',
        code: 'for i in range(4):\n    print(i)',
        output: '0\n1\n2\n3',
        explanation: '循环4次，i的值依次是0、1、2、3。'
      },
      practice: [
        {
          question: 'for i in range(3)中，i的值依次是什么？',
          answer: '0、1、2'
        },
        {
          question: '循环变量的名字可以改成什么？',
          answer: '可以改成a、n等任意变量名'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的计数器升级了！现在你不仅知道循环变量的值，还可以用它来计算！比如i+3会让每个数字都变大！',
      concept: '循环变量可以在循环中使用和计算。在每次循环中，i都有不同的值，可以用于生成新的数字。例如 print(i + 3) 会打印3、4、5、6...',
      syntax: 'for i in range(次数):\n    print(i + 数字)',
      example: {
        title: '循环变量计算',
        code: 'for i in range(5):\n    print(i + 3)',
        output: '3\n4\n5\n6\n7',
        explanation: 'i依次是0、1、2、3、4，加3后输出3、4、5、6、7。'
      },
      practice: [
        {
          question: 'i的值是2时，i + 5等于多少？',
          answer: '7'
        },
        {
          question: '如何让循环输出5、6、7、8？',
          answer: 'for i in range(4):\n    print(i + 5)'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '循环变量大师模式！你可以利用循环变量生成各种有规律的数字序列：递增、递减、倍数...只要改变计算方式就能实现！',
      concept: '循环变量的本质是一个自动递增的数字序列。通过不同的计算表达式，可以生成各种规律序列：i+常数（平移）、i*常数（倍数）、常数-i（递减）。这是编程中生成规律序列的基础方法。',
      syntax: '# 递增序列\nfor i in range(n):\n    print(i + a)\n\n# 递减序列\nfor i in range(n):\n    print(n - 1 - i)',
      example: {
        title: '递减序列',
        code: 'for i in range(5):\n    print(4 - i)',
        output: '4\n3\n2\n1\n0',
        explanation: 'i依次是0、1、2、3、4，4-i的结果依次是4、3、2、1、0，生成递减序列。'
      },
      practice: [
        {
          question: '如何生成10、20、30、40、50？',
          answer: 'for i in range(5):\n    print((i + 1) * 10)'
        },
        {
          question: '循环变量i从0开始，如何让它从1开始计数？',
          answer: '使用i + 1，如print(i + 1)'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '循环变量应用',
    emoji: '📊',
    gradeLevel: '1-2',
    summary: '利用循环变量生成有规律的数字',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你需要一串连续的数字标签：1、2、3、4...用循环变量就可以自动生成这些数字！',
      concept: '循环变量应用就是利用i的值生成需要的数字。最常用的是print(i + 1)来生成从1开始的编号。',
      syntax: 'for i in range(次数):\n    print(i + 1)',
      example: {
        title: '生成编号',
        code: 'for i in range(3):\n    print(i + 1)',
        output: '1\n2\n3',
        explanation: 'i是0、1、2，加1后输出1、2、3，就像编号一样。'
      },
      practice: [
        {
          question: '如何生成1到5的数字？',
          answer: 'for i in range(5):\n    print(i + 1)'
        },
        {
          question: 'i + 1的作用是什么？',
          answer: '让循环从1开始计数，而不是从0'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '数字序列进阶！你不仅可以生成递增序列，还可以生成递减序列：5、4、3、2、1！这需要用减法来实现。',
      concept: '要生成递减序列，可以用"总数 - i"的方式。例如循环5次时，用 4 - i 可以得到4、3、2、1、0的递减序列。',
      syntax: '# 递增序列\nprint(i + 1)\n\n# 递减序列\nprint(总次数 - 1 - i)',
      example: {
        title: '倒计时',
        code: 'for i in range(5):\n    print(4 - i)',
        output: '4\n3\n2\n1\n0',
        explanation: 'i是0→4时，4-i是4→0，生成递减序列。'
      },
      practice: [
        {
          question: '循环5次时，如何输出3、2、1、0、-1？',
          answer: 'for i in range(5):\n    print(3 - i)'
        },
        {
          question: '递增和递减序列有什么区别？',
          answer: '递增用加法（i + 数字），递减用减法（数字 - i）'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '序列大师模式！你可以生成各种复杂的数字序列：等差数列、倍数序列、交替序列...只要掌握循环变量的运算规律！',
      concept: '循环变量序列的本质是函数映射：output = f(i)。常见模式有：等差序列(i*d+a)、倍数序列(i*m)、递减序列(n-1-i)。可以组合使用生成更复杂的序列。',
      syntax: '# 等差序列（公差d）\nprint(i * d + a)\n\n# 倍数序列\nprint(i * m)\n\n# 递减序列\nprint(n - 1 - i)',
      example: {
        title: '等差数列',
        code: 'for i in range(5):\n    print(i * 2 + 1)',
        output: '1\n3\n5\n7\n9',
        explanation: 'i乘以2加1，生成奇数序列1、3、5、7、9。这是首项为1、公差为2的等差数列。'
      },
      practice: [
        {
          question: '如何生成偶数序列2、4、6、8、10？',
          answer: 'for i in range(5):\n    print((i + 1) * 2)'
        },
        {
          question: 'i * 3 + 1会生成什么序列？',
          answer: '1、4、7、10、13...（首项1，公差3的等差数列）'
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
    mathConcept: '循环变量值',
    question: 'for i in range(3)循环中，i的值依次是什么？\n\nA. 1、2、3\nB. 0、1、2\nC. 0、1、2、3\nD. 1、2',
    options: [
      'A. 1、2、3',
      'B. 0、1、2',
      'C. 0、1、2、3',
      'D. 1、2'
    ],
    answer: 1,
    explanation: 'range(3)表示循环3次，i从0开始，依次是0、1、2，不包含3。',
    hint: 'range(3)循环3次，从0开始'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '循环变量加法',
    question: '执行下面的代码，会输出什么？\n\n```python\nfor i in range(3):\n    print(i + 1)\n```\n\nA. 0、1、2\nB. 1、2、3\nC. 1、2、3、4\nD. 0、1、2、3',
    options: [
      'A. 0、1、2',
      'B. 1、2、3',
      'C. 1、2、3、4',
      'D. 0、1、2、3'
    ],
    answer: 1,
    explanation: 'i依次是0、1、2，i+1的结果是1、2、3。所以输出1、2、3。',
    hint: 'i是0、1、2，分别加1'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '循环变量乘法',
    question: '执行下面的代码，会输出什么？\n\n```python\nfor i in range(4):\n    print(i * 2)\n```\n\nA. 0、2、4、6\nB. 2、4、6、8\nC. 0、1、2、3\nD. 1、2、3、4',
    options: [
      'A. 0、2、4、6',
      'B. 2、4、6、8',
      'C. 0、1、2、3',
      'D. 1、2、3、4'
    ],
    answer: 0,
    explanation: 'i依次是0、1、2、3，i*2的结果是0、2、4、6。\n\n数学知识：这是乘法运算，0×2=0，1×2=2，2×2=4，3×2=6。',
    hint: '计算0×2、1×2、2×2、3×2'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '循环变量减法',
    question: '执行下面的代码，会输出什么？\n\n```python\nfor i in range(5):\n    print(4 - i)\n```\n\nA. 4、3、2、1、0\nB. 5、4、3、2、1\nC. 0、1、2、3、4\nD. 1、2、3、4、5',
    options: [
      'A. 4、3、2、1、0',
      'B. 5、4、3、2、1',
      'C. 0、1、2、3、4',
      'D. 1、2、3、4、5'
    ],
    answer: 0,
    explanation: 'i依次是0、1、2、3、4，4-i的结果是4、3、2、1、0。\n\n数学知识：这是递减序列，每次减1。',
    hint: '计算4-0、4-1、4-2、4-3、4-4'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '等差数列',
    question: '执行下面的代码，会输出什么？\n\n```python\nfor i in range(5):\n    print(i * 3 + 1)\n```\n\nA. 1、4、7、10、13\nB. 3、6、9、12、15\nC. 0、3、6、9、12\nD. 1、3、5、7、9',
    options: [
      'A. 1、4、7、10、13',
      'B. 3、6、9、12、15',
      'C. 0、3、6、9、12',
      'D. 1、3、5、7、9'
    ],
    answer: 0,
    explanation: 'i依次是0、1、2、3、4，i*3+1的结果是1、4、7、10、13。\n\n数学知识：这是首项为1、公差为3的等差数列，通项公式an = 3n + 1（n从0开始）。',
    hint: '计算0×3+1、1×3+1、2×3+1、3×3+1、4×3+1'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '序列规律',
    question: '要输出偶数序列2、4、6、8、10，应该使用哪个代码？\n\nA. for i in range(5): print(i * 2)\nB. for i in range(5): print((i + 1) * 2)\nC. for i in range(5): print(i + 2)\nD. for i in range(5): print(i * 2 + 2)',
    options: [
      'A. for i in range(5): print(i * 2)',
      'B. for i in range(5): print((i + 1) * 2)',
      'C. for i in range(5): print(i + 2)',
      'D. for i in range(5): print(i * 2 + 2)'
    ],
    answer: 1,
    explanation: '分析各选项：\n- A：i*2输出0、2、4、6、8（从0开始）\n- B：(i+1)*2输出2、4、6、8、10（正确！）\n- C：i+2输出2、3、4、5、6\\n- D：i*2+2输出2、4、6、8、10（也可以，但B更直观）\n\n数学知识：正偶数序列通项公式an = 2n（n从1开始），对应(i+1)*2。',
    hint: 'i是0、1、2、3、4，要让输出是2、4、6、8、10'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L3-2',
  title: '循环变量和应用',
  subtitle: '学会使用循环变量生成有规律的数字',
  difficulty: '入门',
  estimatedTime: '30-40分钟',
  learningGoals: [
    '理解循环变量i的含义和变化规律',
    '学会使用循环变量进行计算',
    '掌握生成递增和递减序列的方法',
    '了解等差数列的生成方式'
  ],
  prerequisites: [
    'Python 基础语法',
    'for 循环基础',
    '变量基础概念',
    '基础算术运算'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['time', 'loop', 'count', 'print'],
  medium: ['sleep', 'range', 'cycle', 'number'],
  hard: ['variable', 'sequence', 'increase', 'decrease']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'for i in range(3):',
    'print(i)',
    'print(i + 1)',
    'for n in range(4):',
    'print(n)',
    'for a in range(5):'
  ],
  medium: [
    'for i in range(4):\n    print(i + 1)',
    'for i in range(5):\n    print(i * 2)',
    'for i in range(3):\n    print(i + 5)',
    'for n in range(4):\n    print(3 - n)'
  ],
  hard: [
    'for i in range(5):\n    print(i * 3 + 1)',
    'for i in range(5):\n    print((i + 1) * 2)',
    'for i in range(5):\n    print(4 - i)',
    'for i in range(6):\n    print(i * 2 + 1)'
  ]
}

// 导出所有数据
export const L3_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L3_2_data
