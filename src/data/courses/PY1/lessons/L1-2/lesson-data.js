/**
 * PY1 课程 L1-2: input()命令
 *
 * 核心知识点:
 * 1. input() 命令 - 接收用户输入
 * 2. input() 应用 - 多次输入
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'input',
    pronunciation: '[ˈɪnˌpʊt]',
    partOfSpeech: 'v.',
    meaning: '输入；把...输入计算机',
    level: 'easy',
    example: 'Please input your password.',
    exampleTranslation: '请输入您的密码。',
    source: 'ocr'
  },
  {
    word: 'theme',
    pronunciation: '[θiːm]',
    partOfSpeech: 'n.',
    meaning: '主题；主旋律',
    level: 'medium',
    example: 'The theme of this party is summer.',
    exampleTranslation: '这个派对的主题是夏天。',
    source: 'ocr'
  },
  {
    word: 'name',
    pronunciation: '[neɪm]',
    partOfSpeech: 'n.',
    meaning: '名字；名称',
    level: 'easy',
    example: 'What is your name?',
    exampleTranslation: '你叫什么名字？',
    source: 'ocr'
  },
  {
    word: 'box',
    pronunciation: '[bɒks]',
    partOfSpeech: 'n.',
    meaning: '盒子；箱子',
    level: 'easy',
    example: 'The gift is in the box.',
    exampleTranslation: '礼物在盒子里。',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'output',
    pronunciation: '[ˈaʊtpʊt]',
    partOfSpeech: 'n.',
    meaning: '输出',
    level: 'medium',
    example: 'The output shows the result.',
    exampleTranslation: '输出显示结果。',
    source: 'extended'
  },
  {
    word: 'password',
    pronunciation: '[ˈpæsˌwɜːd]',
    partOfSpeech: 'n.',
    meaning: '密码；口令',
    level: 'medium',
    example: 'Please enter your password.',
    exampleTranslation: '请输入您的密码。',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '输入命令 - input()',
    emoji: '⌨️',
    gradeLevel: '1-2',
    summary: '接收用户的输入',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'input() 就像一个接收器，当程序运行到它时，会停下等待你输入内容。就像老师提问后等待同学回答一样！',
      concept: 'input() 命令可以接收用户输入的内容，并存储到变量中。',
      syntax: '变量 = input()',
      example: {
        title: '接收用户输入',
        code: 'name = input()',
        output: '（等待用户输入...）',
        explanation: '执行这行代码时，程序会停下等待输入。输入内容后按下回车，输入的内容就存储到变量 name 中了。'
      },
      practice: [
        {
          question: 'input() 命令执行后会发生什么？',
          answer: '程序会等待用户输入内容'
        },
        {
          question: '用户输入完成后要按什么键？',
          answer: '回车键'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'input() 后面可以加提示文字，这样用户就知道要输入什么了！就像有提示的填空题。',
      concept: '可以在 input() 的括号里写提示文字，让用户知道要输入什么。',
      syntax: "变量 = input('提示文字')",
      example: {
        title: '带提示的输入',
        code: "name = input('请输入你的名字：')\nprint(name)",
        output: '请输入你的名字：小明\n小明',
        explanation: 'input() 括号里的提示文字会先显示出来，然后等待用户输入。用户输入"小明"后按回车，程序打印出"小明"。'
      },
      practice: [
        {
          question: "input('请输入年龄：') 中的'请输入年龄：'会显示在哪里？",
          answer: '输出区'
        },
        {
          question: '用户输入的内容存储在哪里？',
          answer: '变量中'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '多个 input() 可以按顺序接收多次输入，每个 input() 会接收各自对应的输入内容。',
      concept: '多个 input() 命令按顺序执行，每个接收一次输入。',
      syntax: 'a1 = input()\na2 = input()',
      example: {
        title: '多次输入',
        code: "print('你最喜欢的水果？')\nfruit = input()\nprint('你今年几岁？')\nage = input()\nprint('你喜欢', fruit, '，今年', age, '岁')",
        output: '你最喜欢的水果？\n苹果\n你今年几岁？\n8\n你喜欢 苹果 ，今年 8 岁',
        explanation: '第一个 input() 接收对"水果"问题的回答，第二个 input() 接收对"年龄"问题的回答。程序按顺序执行，每个 input() 都会等待一次输入。'
      },
      practice: [
        {
          question: '如果有3个 input() 命令，会等待用户输入几次？',
          answer: '3次'
        },
        {
          question: '第2个 input() 接收的是第几次输入？',
          answer: '第2次'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '输入与输出设备',
    emoji: '💻',
    gradeLevel: '3-4',
    summary: '计算机的交互方式',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '计算机就像一个需要和人交流的机器人。input() 是它"听"的方式，print() 是它"说"的方式。',
      concept: 'input() 是输入设备（如键盘）给计算机传送信息的方式，print() 是计算机显示信息的方式。',
      syntax: '输入：input()\n输出：print()',
      example: {
        title: '对话程序',
        code: "print('你好！我叫小核桃。')\nname = input('你叫什么名字？')\nprint('你好，', name, '！')",
        output: '你好！我叫小核桃。\n你叫什么名字？小明\n你好， 小明 ！',
        explanation: '程序先打印问候语，然后等待输入名字，最后用输入的名字进行回复。这就是人机对话！'
      },
      practice: [
        {
          question: 'print() 和 input() 哪个是"说"，哪个是"听"？',
          answer: 'print()是说，input()是听'
        },
        {
          question: '键盘属于什么设备？',
          answer: '输入设备'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '计算机有很多输入输出设备。键盘、鼠标、触摸屏是输入，显示器、打印机、音响是输出。',
      concept: '输入设备把信息传给计算机，输出设备把信息从计算机传出来。',
      syntax: '输入设备：键盘、鼠标、触摸屏\n输出设备：显示器、打印机、音响',
      example: {
        title: '分类设备',
        code: '# 输入设备\n键盘、鼠标、触摸屏、麦克风、摄像头\n# 输出设备\n显示器、打印机、音响、投影仪',
        output: '',
        explanation: 'input() 命令相当于键盘的"嘴巴"，帮计算机接收信息。了解输入输出设备能帮助我们理解程序怎么和用户交流。'
      },
      practice: [
        {
          question: '摄像头是输入设备还是输出设备？',
          answer: '输入设备'
        },
        {
          question: '耳机是输入设备还是输出设备？',
          answer: '输出设备'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '有些设备同时是输入和输出，比如触摸屏！它既可以接收你的触摸（输入），又能显示内容（输出）。',
      concept: '一些设备同时具备输入和输出功能，如触摸屏、手机屏幕等。',
      syntax: '输入输出设备：触摸屏、手机',
      example: {
        title: '智能设备',
        code: '# 触摸屏手机\n触摸屏幕 → 输入（手指滑动、点击）\n屏幕显示 → 输出（看视频、图片）\n# 智慧核心\n按键输入 → input()\n屏幕显示 → print()',
        output: '',
        explanation: '理解输入输出的概念后，你会发现身边的智能设备都是按照这个原理工作的。程序通过 input() 获取信息，通过 print() 展示结果。'
      },
      practice: [
        {
          question: '触摸屏属于什么类型的设备？',
          answer: '输入和输出设备'
        },
        {
          question: '在智慧核心上，input() 对应什么操作？',
          answer: '用户通过按键或触摸输入'
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
    mathConcept: '概念理解',
    question: '关于 input() 命令，下列说法正确的是？',
    options: [
      'input() 命令是 Python 中的输出命令',
      'input() 命令的运行效果是在输出区弹出一个光标',
      '使用 input() 命令时，可以使用变量存储用户输入的文字',
      'input() 命令可以直接打印出文字'
    ],
    answer: 2,
    explanation: 'input() 是输入命令，用于接收用户输入；执行时输出区会出现闪烁光标等待输入；输入的内容可以存储到变量中。',
    hint: 'input 是"输入"的意思'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '操作流程',
    question: '执行 input() 命令时，用户要在哪里输入内容？输入完成后要按下什么键？',
    options: [
      '舞台区；空格',
      '代码区；回车',
      '输出区；空格',
      '输出区；回车'
    ],
    answer: 3,
    explanation: '执行 input() 时，程序会在输出区出现闪烁光标，用户在输出区输入内容，输入完成后按回车键，程序就能接收到输入的内容。',
    hint: '输出区会有光标闪烁'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '顺序理解',
    question: '下面代码的执行顺序是？\n\n```python\na = input()\nb = input()\nc = input()\n```',
    options: [
      '依次等待3次输入，每次输入都存入对应变量',
      '同时等待3次输入',
      '只等待1次输入，然后结束',
      '不需要等待输入'
    ],
    answer: 0,
    explanation: '三个 input() 命令按顺序执行。第一个 a = input() 等待第一次输入，第二个 b = input() 等待第二次输入，第三个 c = input() 等待第三次输入。',
    hint: '每个 input() 都会等待一次输入'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '设备分类',
    question: '下列哪个是输入设备？',
    options: [
      '显示器',
      '打印机',
      '键盘',
      '音响'
    ],
    answer: 2,
    explanation: '键盘是用来向计算机输入信息的设备，属于输入设备。显示器和打印机是输出设备，音响也是输出设备。',
    hint: '键盘是向计算机输入信息的'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合应用',
    question: `运行代码，按顺序输入：甜味、7天、24。最终输出的顺序是？\n\n\`\`\`python\nprint('你最喜欢什么口味？')\na = input()\nprint('一周有几天？')\nb = input()\nprint('一天有几个小时？')\nc = input()\nprint(a, b, c)\n\`\`\``,
    options: [
      '甜味、7天、24',
      '24、甜味、7天',
      '7天、24、甜味',
      '7天、甜味、24'
    ],
    answer: 0,
    explanation: '按题目要求顺序输入"甜味"、"7天"、"24"，分别存储到变量 a、b、c 中。最后 print(a, b, c) 按变量顺序输出：甜味 7天 24。',
    hint: '按输入顺序存储到变量，最后按变量顺序输出'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '逻辑推理',
    question: '触摸屏手机属于什么设备？',
    options: [
      '只有输入设备',
      '只有输出设备',
      '既是输入设备又是输出设备',
      '既不是输入设备也不是输出设备'
    ],
    answer: 2,
    explanation: '触摸屏手机可以接收触摸输入（手指滑动、点击等输入操作），同时也能显示画面和内容（输出），所以同时具备输入和输出功能。',
    hint: '触摸屏既可以"感受"触摸，又能显示内容'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L1-2',
  title: 'input输入',
  subtitle: '学会接收用户输入的信息',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握 input() 命令的基本用法',
    '能在 input() 中使用提示文字',
    '理解多次 input() 的执行顺序',
    '了解计算机的输入输出设备'
  ],
  prerequisites: [
    '认识数字和基本运算符号',
    '会用键盘输入内容'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['input', 'name', 'box', 'key'],
  medium: ['theme', 'output', 'password', 'enter'],
  hard: ['variable', 'device', 'keyboard', 'monitor']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'n = input()',
    "name = input('请输入：')",
    'print(n)',
    "print('你输入的是', n)"
  ],
  medium: [
    "a = input('第一个：')",
    "b = input('第二个：')",
    "print('结果是', a, b)",
    'n1 = input()\nn2 = input()'
  ],
  hard: [
    "print('问题1：')\na = input()\nprint('问题2：')\nb = input()\nprint(a, b)",
    "name = input('名字：')\nage = input('年龄：')\nprint('你好，', name)",
    'x = input()\ny = input()\nz = input()\nprint(x, y, z)'
  ]
}

// 导出所有数据
export const L1_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L1_2_data