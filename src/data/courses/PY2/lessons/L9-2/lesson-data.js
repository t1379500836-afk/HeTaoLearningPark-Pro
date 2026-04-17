/**
 * PY2 课程 L9-2: 循环嵌套
 *
 * 核心知识点:
 * 1. for循环嵌套（外循环与内循环）
 * 2. print()命令进阶（end参数）
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'side',
    pronunciation: '[said]',
    partOfSpeech: 'n.',
    meaning: '边；侧面；边缘',
    level: 'easy',
    example: 'Sit side by side.',
    exampleTranslation: '并排坐。',
    source: 'ocr'
  },
  {
    word: 'draw',
    pronunciation: '[dro:]',
    partOfSpeech: 'v.',
    meaning: '画；绘画；拖动',
    level: 'medium',
    example: 'I can draw a cat.',
    exampleTranslation: '我会画一只猫。',
    source: 'ocr'
  },
  {
    word: 'end',
    pronunciation: '[end]',
    partOfSpeech: 'n.',
    meaning: '结束；结局；结尾',
    level: 'medium',
    example: 'Good luck and happy end.',
    exampleTranslation: '祝好运，结局美满。',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'loop',
    pronunciation: '[lu:p]',
    partOfSpeech: 'n.',
    meaning: '循环；环；圈',
    level: 'hard',
    example: 'Use a loop to repeat.',
    exampleTranslation: '用循环来重复执行。',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '爬楼梯 - for循环嵌套',
    emoji: '🏃',
    gradeLevel: '1-2',
    summary: '一个循环里面还有另一个循环',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你在爬楼梯！每一层楼你要走很多级台阶，爬完一层的所有台阶，才能去爬下一层。循环嵌套就像这样：外循环是楼层，内循环是台阶！',
      concept: 'for循环嵌套就是一个for循环里面还有另一个for循环。外循环每执行一次，内循环就会完整运行一遍。',
      syntax: 'for i in range(外循环次数):\n    for j in range(内循环次数):\n        # 要执行的代码',
      example: {
        title: '打印简单的图形',
        code: '# 外循环2次，内循环2次\nfor i in range(2):\n    print("外循环")\n    for j in range(2):\n        print("  内循环")',
        output: '外循环\n  内循环\n  内循环\n外循环\n  内循环\n  内循环',
        explanation: '外循环执行2次，每次外循环时，内循环都完整执行2次。所以"内循环"打印了4次（2×2=4）。'
      },
      practice: [
        {
          question: '外循环3次，内循环2次，内循环的代码会执行几次？',
          answer: '6次（3×2=6）'
        },
        {
          question: '哪个循环是"外面的楼层"？',
          answer: '外循环'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '现在你是一位建筑师！设计大楼时，每层楼都有多个房间。外循环决定有几层楼，内循环决定每层有几个房间，嵌套循环帮你轻松处理多层结构！',
      concept: '循环嵌套可以处理二维结构（如图形、表格）。外循环控制行，内循环控制列，内循环的代码执行次数等于外循环次数乘以内循环次数。',
      syntax: '# 打印矩形\nfor 行 in range(行数):\n    for 列 in range(列数):\n        print("*", end=" ")',
      example: {
        title: '打印3x3的星号方块',
        code: '# 打印3行3列的星号\nfor i in range(3):\n    for j in range(3):\n        print("*", end=" ")\n    print()  # 换行',
        output: '* * * \n* * * \n* * * ',
        explanation: '外循环控制3行，内循环控制每行3个星号，end=" "让星号在同一行。每行内循环结束后用print()换行。'
      },
      practice: [
        {
          question: '如果要打印5行10列的星号，内外循环应该怎么设置？',
          answer: '外循环range(5)，内循环range(10)'
        },
        {
          question: '内循环的代码一共执行了多少次？',
          answer: '外循环次数 × 内循环次数'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '矩阵大师模式！循环嵌套是处理二维数组、矩阵运算、图形渲染的基础。你可以用嵌套循环实现乘法表、九九乘法表、复杂图形打印等。',
      concept: '嵌套循环的时间复杂度是O(n×m)，处理n×m的二维数据结构时非常高效。理解嵌套循环的执行流程是算法设计的基础。',
      syntax: '# 二维数据处理\nfor i in range(行数):\n    for j in range(列数):\n        data[i][j] = i * j',
      example: {
        title: '打印九九乘法表',
        code: '# 打印九九乘法表\nfor i in range(1, 10):\n    for j in range(1, i + 1):\n        print(f"{j}x{i}={i*j}", end=" ")\n    print()',
        output: '1x1=1 \n1x2=2 2x2=4 \n1x3=3 2x3=6 3x3=9 \n1x4=4 2x4=8 3x4=12 4x4=16 \n...',
        explanation: '外循环i从1到9，内循环j从1到i。每行打印i个乘法式子，形成下三角的乘法表结构。'
      },
      practice: [
        {
          question: '如果外循环10次，内循环也是10次，最内层代码执行几次？',
          answer: '100次（10×10=100）'
        },
        {
          question: '三层嵌套循环的执行次数是多少？',
          answer: '外×中×内，三次循环次数相乘'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '神奇的尾巴 - print()进阶',
    emoji: '🎨',
    gradeLevel: '3-4',
    summary: '用end参数控制打印后的结尾',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '你知道print()每次都会自动换行吗？就像你说话说完一句就会停顿一下。但有时候你想让好几句话连在一起说，这时就可以用end参数！',
      concept: 'print()默认会在打印完后自动换行。用end参数可以改变这个行为，让打印内容连在一起不换行。',
      syntax: 'print(内容, end="结尾内容")',
      example: {
        title: '让打印不换行',
        code: '# 不换行打印\nprint("Hello", end=" ")\nprint("World")\nprint("!", end="")',
        output: 'Hello World!',
        explanation: '第一个print用end=" "（空格）作为结尾，第二个print接在空格后面，第三个用end=""（空字符串）作为结尾。'
      },
      practice: [
        {
          question: 'print()默认的end是什么？',
          answer: '默认是换行符（\\n）'
        },
        {
          question: 'end=""是什么意思？',
          answer: '结尾是空字符串，什么也不加'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '创意打印模式！你可以用end参数创建各种有趣的输出效果：横线连接、进度条、表格等等。让输出更美观、更有创意！',
      concept: 'end参数让print()的输出格式更灵活，可以自定义每行打印内容的结尾字符，实现横向拼接、进度显示等效果。',
      syntax: '# 横向打印\nfor i in range(5):\n    print(i, end="-")\n\n# 竖向打印（默认）\nfor i in range(5):\n    print(i)',
      example: {
        title: '用横线连接数字',
        code: '# 用横线连接1到5\nfor i in range(1, 6):\n    print(i, end="-")\nprint("结束")',
        output: '1-2-3-4-5-结束',
        explanation: '每个数字后面都加上"-"，形成1-2-3-4-5-的连接效果，最后的"结束"接在5后面。'
      },
      practice: [
        {
          question: 'end="\\n"和默认行为一样吗？',
          answer: '是的，\\n就是换行符'
        },
        {
          question: '如何让所有打印内容紧挨着？',
          answer: '用end=""'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '高级格式化输出！结合end参数和嵌套循环，你可以创建各种复杂的输出格式：表格、矩阵、进度条、数据可视化等等。',
      concept: 'end参数是格式化输出的重要工具，结合循环嵌套可以实现二维图形的文本渲染，是命令行界面设计的基础技能。',
      syntax: '# 表格打印\nfor row in data:\n    for item in row:\n        print(item, end="\\t")  # 制表符\n    print()  # 换行',
      example: {
        title: '打印进度条',
        code: '# 动态进度条\nprogress = 0\ntotal = 10\nprint("下载中: ", end="")\nfor i in range(total + 1):\n    print("█", end="")\n    progress = i * 100 // total\nprint(f"\\n进度: {progress}%")',
        output: '下载中: ██████████\n进度: 100%',
        explanation: '用end=""让所有进度条字符连在一起，用\\n换行后显示百分比，实现美观的进度显示效果。'
      },
      practice: [
        {
          question: 'end="\\t"有什么作用？',
          answer: '用制表符（Tab）分隔，常用于打印表格'
        },
        {
          question: '如何用end参数实现倒计时效果？',
          answer: 'end="\\r"让光标回到行首，覆盖之前的输出'
        }
      ]
    }
  }
]

// 习题数据（编程 × 数学融合）
export const exercises = [
  // 🟢 基础题（1-2年级）
  {
    id: 'ex-1',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '数数',
    question: '执行下面的代码，"核桃"会打印几次？\n\n```python\nfor i in range(2):\n    print("核桃")\n    for j in range(2):\n        print("编程")\n```',
    options: [
      '2次',
      '4次',
      '3次'
    ],
    answer: 0, // A
    explanation: '外循环range(2)执行2次，每次外循环打印1次"核桃"，所以"核桃"打印2次。\n\n数学知识：外循环次数就是外层代码执行的次数。',
    hint: 'print("核桃")在外循环里，外循环几次就打印几次'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '找规律',
    question: '下面的代码会输出什么？\n\n```python\nfor i in range(2):\n    print("A", end="")\n    for j in range(2):\n        print("B", end="")\n```',
    options: [
      'ABABABAB',
      'ABBABB',
      'ABAB'
    ],
    answer: 1, // B
    explanation: '外循环2次，每次先打印"A"（end=""不换行），然后内循环2次打印"B"（end=""不换行）。\n\n结果：第1次外循环ABB，第2次外循环ABB，合并是ABBABB。\n\n数学知识：这是模式识别，找出重复的规律。',
    hint: 'end=""表示打印后不换行'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '位置与方向',
    question: '执行下方代码，输出结果是？\n\n```python\nfor i in range(1, 10):\n    if i > 5:\n        continue\n    print(i, end="")\n```',
    options: [
      '12345',
      '123456789',
      '6789'
    ],
    answer: 0, // A
    explanation: 'i从1到9，当i>5（即6,7,8,9）时执行continue跳过，只打印1,2,3,4,5。end=""让数字连在一起。\n\n输出：12345\n\n数学知识：这是数轴上的区间概念，i≤5的区间是[1,5]。',
    hint: 'continue会跳过大于5的数字'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '假设法',
    question: '猴赛雷买了2元和5元的糖葫芦一共7串，用去23元。请问他各买了多少串？\n\n如果用枚举法（嵌套循环）解决，满足条件的组合是？\n\n```python\nfor x in range(8):  # 2元的数量\n    for y in range(8):  # 5元的数量\n        if x + y == 7 and 2*x + 5*y == 23:\n            print(x, y)\n```',
    options: [
      '2元4串，5元3串',
      '2元3串，5元4串',
      '2元2串，5元5串'
    ],
    answer: 0, // A
    explanation: '2元4串 = 8元，5元3串 = 15元，总共4+3=7串，8+15=23元，符合条件！\n\n数学知识：这是"假设法"或"枚举法"，尝试所有可能的组合直到找到答案。',
    hint: '检查每个选项的串数和钱数是否都符合'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '乘法原理',
    question: '一本书的封面有5种颜色，封底有3种颜色。一共可以组合出多少种不同的封面方案？\n\n如果用代码枚举所有组合，会输出几对？\n\n```python\ncount = 0\nfor cover in range(5):\n    for back in range(3):\n        count += 1\nprint(count)\n```',
    options: [
      '8',
      '15',
      '5'
    ],
    answer: 1, // B
    explanation: '外循环5次，内循环3次，count每次增加1，总共5×3=15次。\n\n数学知识：这是"乘法原理"，如果一件事有m种选择，另一件有n种选择，那么总共有m×n种组合方式。',
    hint: '5种封面颜色 × 3种封底颜色 = ？'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合应用',
    question: '下面的代码会打印几行？\n\n```python\nfor i in range(3):\n    for j in range(3):\n        if j == 2:\n            continue\n        print(j, end="")\n    print()\n```',
    options: [
      '6行',
      '3行',
      '9行'
    ],
    answer: 1, // B
    explanation: '外循环3次，每次外循环结束后都有一个print()换行，所以总共3行。内循环中continue跳过j=2的打印，每行打印01。\n\n输出：01\\n01\\n01\\n\n数学知识：换行次数由外循环次数决定。',
    hint: 'print()在外循环里，外循环几次就换行几次'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L9-2',
  title: '世界遗忘我',
  subtitle: '掌握for循环嵌套和print()进阶',
  difficulty: '进阶',
  estimatedTime: '35-50分钟',
  learningGoals: [
    '理解for循环嵌套的执行流程',
    '掌握外循环与内循环的关系',
    '学会使用end参数控制输出格式',
    '能用嵌套循环解决二维问题'
  ],
  prerequisites: [
    'Python基础语法',
    'for循环',
    'print()基础用法',
    '列表基础操作'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['loop', 'nest', 'print', 'range', 'side'],
  medium: ['nested', 'double', 'end', 'format', 'draw'],
  hard: ['iteration', 'rectangle', 'parameter', 'execute']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'for i in range(3):',
    'for j in range(2):',
    'print(end="")',
    'print(i, end=" ")'
  ],
  medium: [
    'for i in range(3):\n    print(i)',
    'for i in range(2):\n    for j in range(2):',
    'print("*", end=" ")',
    'print(item, end="-")'
  ],
  hard: [
    'for i in range(5):\n    for j in range(5):\n        print(i*j)',
    'for row in matrix:\n    for item in row:',
    'print(f"{i}x{j}={i*j}", end=" ")',
    'for i in range(1, 10):\n    for j in range(1, i+1):'
  ]
}

// 导出所有数据
export const L9_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L9_2_data
