/**
 * PY1 课程 L1-4: 智能门铃和语音留言
 *
 * 硬件课程 - 核心知识点:
 * 1. playSound() - 播放声音
 * 2. isPressed() / isTouched() - 检测按钮或触摸
 * 3. print() / printPos() - 打印内容
 * 4. record() / playRecord() - 录制和播放声音
 */

// 单词卡数据
export const vocabData = [
  {
    word: 'show',
    pronunciation: '[ʃəʊ]',
    partOfSpeech: 'v.',
    meaning: '展示；演出；给……看',
    level: 'easy',
    example: 'Please show me your ticket.',
    exampleTranslation: '请把你的票给我看看。',
    note: 'show 的过去式是 showed'
  },
  {
    word: 'sound',
    pronunciation: '[saʊnd]',
    partOfSpeech: 'n./v.',
    meaning: '声音；听起来',
    level: 'easy',
    example: 'The sound of the music is very nice.',
    exampleTranslation: '音乐的声音很好听。',
    note: '可以作名词或动词使用'
  },
  {
    word: 'play',
    pronunciation: '[pleɪ]',
    partOfSpeech: 'v./n.',
    meaning: '玩；比赛；播放',
    level: 'easy',
    example: "Let's play a game.",
    exampleTranslation: '我们来玩个游戏吧。',
    note: 'playSound() 用于播放音效'
  },
  {
    word: 'record',
    pronunciation: '[rɪˈkɔːd]',
    partOfSpeech: 'v./n.',
    meaning: '记录；录音；唱片；录制',
    level: 'medium',
    example: 'I like to record my voice.',
    exampleTranslation: '我喜欢录制我的声音。',
    note: 'record() 用于录制声音'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '播放声音 - playSound()',
    emoji: '🔊',
    gradeLevel: '1-2',
    summary: '播放硬件设备上的音效',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个智能音箱，你可以让它播放各种有趣的声音！比如门铃声、欢呼声、掌声等等！',
      concept: 'playSound() 命令可以让硬件设备播放预设的音效。括号中填入音效的名称，就可以播放对应的声音。',
      syntax: "playSound('音效名称')",
      example: {
        title: '播放门铃声',
        code: "playSound('doorbell')",
        output: '播放门铃音效',
        explanation: '这行代码会让设备播放名为 "doorbell" 的门铃音效。'
      },
      practice: [
        {
          question: 'playSound() 命令是做什么的？',
          answer: '播放硬件设备上的音效'
        },
        {
          question: '括号中应该填入什么？',
          answer: '音效的名称'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '声音魔法升级！现在你可以根据不同情况播放不同音效：按下按钮播放欢迎声，检测到触摸播放提示音等等！',
      concept: 'playSound() 可以与条件判断结合使用，根据不同情况播放不同音效，让程序更加生动有趣。',
      syntax: "if 条件:\n    playSound('音效1')\nelse:\n    playSound('音效2')",
      example: {
        title: '智能门铃',
        code: "if isPressed('A'):\n    playSound('welcome')\nelse:\n    playSound('doorbell')",
        output: '根据按钮状态播放不同音效',
        explanation: '按下按钮A播放欢迎声，否则播放普通门铃声。'
      },
      practice: [
        {
          question: '如何让程序在不同情况下播放不同音效？',
          answer: '用 if 语句判断条件，然后调用不同的 playSound()'
        },
        {
          question: 'playSound("hello") 会播放什么？',
          answer: '播放名为 "hello" 的音效'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '声音大师模式！音效是硬件交互的重要反馈方式，合理使用音效可以让用户体验更加直观和有趣！',
      concept: 'playSound() 是硬件编程中常用的反馈命令。通过音效提示，用户可以知道程序正在执行什么操作。',
      syntax: "# 常用音效名称\nplaySound('beep')       # 哔声\nplaySound('doorbell')   # 门铃\nplaySound('welcome')    # 欢迎\nplaySound('alert')      # 警报",
      example: {
        title: '多功能门铃',
        code: "while True:\n    if isPressed('A'):\n        playSound('welcome')\n        print('欢迎光临!')\n    elif isPressed('B'):\n        playSound('alert')\n        print('注意!')",
        output: '根据不同按钮播放不同音效并显示文字',
        explanation: '这是一个循环检测的智能门铃程序，根据不同按钮播放不同音效。'
      },
      practice: [
        {
          question: 'playSound() 为什么在硬件编程中很重要？',
          answer: '提供声音反馈，让用户知道程序正在执行什么操作'
        },
        {
          question: '如何创建一个循环播放音效的程序？',
          answer: '用 while True 循环，在循环中调用 playSound()'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '检测按钮或触摸 - isPressed() / isTouched()',
    emoji: '👆',
    gradeLevel: '1-2',
    summary: '检测硬件按钮或触摸传感器是否被触发',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个神奇的按钮，只要你按下它，程序就会知道！就像门铃一样，按下就会响应！',
      concept: 'isPressed() 用来检测按钮是否被按下。如果按钮被按下了，返回 True；如果没有按下，返回 False。',
      syntax: "isPressed('按钮名称')",
      example: {
        title: '检测按钮A',
        code: "if isPressed('A'):\n    print('按下了A')",
        output: '当按钮A被按下时显示"按下了A"',
        explanation: 'isPressed("A") 会检测按钮A是否被按下，如果按下就执行后面的代码。'
      },
      practice: [
        {
          question: 'isPressed() 是做什么的？',
          answer: '检测按钮是否被按下'
        },
        {
          question: 'isPressed() 返回什么？',
          answer: 'True（按下了）或 False（没按下）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '检测升级！现在你可以同时检测多个按钮，或者检测触摸传感器！让程序响应用户的各种操作！',
      concept: 'isPressed() 检测按钮，isTouched() 检测触摸传感器。它们都可以配合 if 语句使用，实现交互功能。',
      syntax: "# 检测按钮\nif isPressed('A'):\n    \n# 检测触摸\nif isTouched(0):\n    ",
      example: {
        title: '多按钮检测',
        code: "if isPressed('A'):\n    playSound('hello')\nelif isPressed('B'):\n    playSound('goodbye')",
        output: '根据不同按钮播放不同声音',
        explanation: '按下A播放hello音效，按下B播放goodbye音效。'
      },
      practice: [
        {
          question: 'isPressed() 和 isTouched() 有什么区别？',
          answer: 'isPressed() 检测按钮，isTouched() 检测触摸传感器'
        },
        {
          question: '如何同时检测多个按钮？',
          answer: '用 if-elif-else 语句分别检测每个按钮'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '交互大师模式！检测用户输入是硬件编程的核心，配合循环可以实现实时响应的交互系统！',
      concept: 'isPressed() 和 isTouched() 是硬件编程的输入检测命令。在 while True 循环中使用可以持续检测用户输入，实现实时交互。',
      syntax: "# 循环检测模式\nwhile True:\n    if isPressed('A'):\n        # 处理A按钮\n    if isPressed('B'):\n        # 处理B按钮",
      example: {
        title: '实时响应系统',
        code: "while True:\n    if isPressed('A'):\n        printPos(0, 0)\n        print('A pressed!')\n    if isTouched(0):\n        printPos(0, 1)\n        print('Touched!')",
        output: '实时显示按钮和触摸状态',
        explanation: '这个程序会一直检测按钮和触摸传感器，一旦检测到就立即响应。'
      },
      practice: [
        {
          question: '为什么需要用 while True 循环？',
          answer: '因为需要持续检测用户输入，实现实时响应'
        },
        {
          question: 'isPressed() 在循环中检测时需要注意什么？',
          answer: '避免重复响应，可以添加延时或状态标记'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '打印内容 - print() / printPos()',
    emoji: '📺',
    gradeLevel: '1-2',
    summary: '在硬件屏幕上显示文字信息',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '硬件设备上有一个小屏幕，你可以让文字显示在屏幕上！就像给用户发送消息一样！',
      concept: 'print() 命令在屏幕左上角打印文字。printPos() 可以改变打印的位置，让文字显示在指定位置。',
      syntax: "print('文字内容')\nprintPos(x, y)",
      example: {
        title: '显示欢迎语',
        code: "print('欢迎光临!')",
        output: '在屏幕左上角显示"欢迎光临!"',
        explanation: 'print() 会把文字显示在屏幕的左上角位置。'
      },
      practice: [
        {
          question: 'print() 命令在哪里显示文字？',
          answer: '在硬件屏幕的左上角'
        },
        {
          question: '如何改变文字的显示位置？',
          answer: '使用 printPos() 命令'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '显示升级！现在你可以在屏幕的不同位置显示不同的文字，创建一个完整的信息显示界面！',
      concept: 'printPos() 可以设置光标位置，之后调用 print() 就会从新位置开始显示文字。格式是 printPos(列, 行)。',
      syntax: "# 设置位置后打印\nprintPos(3, 5)\nprint('hello')\n\n# 在(3,5)位置显示hello",
      example: {
        title: '居中显示文字',
        code: "printPos(5, 2)\nprint('欢迎')\nprintPos(3, 4)\nprint('请按门铃')",
        output: '在不同位置显示多行文字',
        explanation: '先用 printPos() 设置位置，再用 print() 显示文字。'
      },
      practice: [
        {
          question: 'printPos(3, 5) 是什么意思？',
          answer: '把光标移动到第3列、第5行的位置'
        },
        {
          question: '如何在屏幕上显示多行文字？',
          answer: '用多个 printPos() 和 print() 组合，每次设置不同位置'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '显示大师模式！屏幕显示是硬件输出的重要方式，合理布局文字信息可以让用户更清楚地了解程序状态！',
      concept: 'printPos() 的坐标系统从 (0,0) 开始，第一个参数是列（x坐标），第二个参数是行（y坐标）。可以用来创建格式化的显示界面。',
      syntax: "# 坐标系统\n# (0,0) (1,0) (2,0) ...\n# (0,1) (1,1) (2,1) ...\n# (0,2) (1,2) (2,2) ...\n\nprintPos(x列, y行)",
      example: {
        title: '状态显示面板',
        code: "printPos(0, 0)\nprint('门铃状态:')\nprintPos(0, 1)\nprint('按钮:')\nprintPos(4, 1)\nprint(str(isPressed('A')))",
        output: '显示格式化的状态信息',
        explanation: '通过精确控制每个文字的位置，创建一个整齐的显示面板。'
      },
      practice: [
        {
          question: '屏幕坐标从哪里开始？',
          answer: '从 (0,0) 开始，即左上角'
        },
        {
          question: 'printPos(列, 行) 和 printPos(x, y) 哪个描述更准确？',
          answer: 'printPos(列, 行) 更准确，第一个是列（x），第二个是行（y）'
        }
      ]
    }
  },

  {
    id: 'kp-4',
    title: '录制和播放声音 - record() / playRecord()',
    emoji: '🎙️',
    gradeLevel: '3-4',
    summary: '录制用户的声音并播放',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你的智能门铃不仅能播放预设声音，还能录制和播放你的留言！就像录音机一样！',
      concept: 'record() 命令开始录制声音，playRecord() 命令播放刚才录制的声音。',
      syntax: "# 录制声音\nrecord()\n\n# 播放录制好的声音\nplayRecord()",
      example: {
        title: '录制留言',
        code: "record()\nprint('正在录制...')\nprint('录制完成!')",
        output: '开始录制声音',
        explanation: '调用 record() 后，设备会开始录制声音，直到达到录制时间限制。'
      },
      practice: [
        {
          question: 'record() 命令是做什么的？',
          answer: '录制声音'
        },
        {
          question: '如何播放录制的声音？',
          answer: '使用 playRecord() 命令'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '录音升级！现在你可以创建一个语音留言门铃：客人按下按钮后录制留言，你回家后可以播放收听！',
      concept: 'record() 和 playRecord() 可以创建语音留言功能。配合按钮检测，可以实现交互式的录音系统。',
      syntax: "if isPressed('A'):\n    record()\n    print('留言已录制')\nif isPressed('B'):\n    playRecord()\n    print('播放留言')",
      example: {
        title: '语音留言门铃',
        code: "if isPressed('A'):\n    record()\n    print('正在录制...')\nelif isPressed('B'):\n    playRecord()",
        output: '按下A录制，按下B播放',
        explanation: '按下按钮A开始录制留言，按下按钮B播放刚才录制的留言。'
      },
      practice: [
        {
          question: '如何创建一个录音按钮？',
          answer: '用 if isPressed() 检测按钮，然后调用 record()'
        },
        {
          question: 'playRecord() 播放的是哪里录制的声音？',
          answer: '播放的是最近一次 record() 录制的声音'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '录音大师模式！语音交互是智能设备的重要功能，通过录音和播放可以实现语音留言、语音备忘录等应用！',
      concept: 'record() 和 playRecord() 是硬件编程中的音频处理命令。需要注意录制时长限制和存储空间。可以设计更复杂的语音交互系统。',
      syntax: "# 完整录音流程\nif isPressed('A'):\n    record()        # 开始录制\n    # 等待录制完成\n    print('Done!')\nif isPressed('B'):\n    playRecord()    # 播放录音",
      example: {
        title: '智能语音留言系统',
        code: "print('1:录制 2:播放')\nwhile True:\n    if isPressed('A'):\n        record()\n        print('录制完成')\n    elif isPressed('B'):\n        playRecord()\n        print('播放完毕')",
        output: '完整的录音播放系统',
        explanation: '这是一个完整的语音留言系统，可以选择录制或播放。'
      },
      practice: [
        {
          question: '使用 record() 时需要注意什么？',
          answer: '录制时长限制和存储空间'
        },
        {
          question: '如何设计一个完整的语音留言系统？',
          answer: '用菜单提示用户操作，用按钮选择录制或播放功能'
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
    mathConcept: '命令格式',
    question: '想要检测按钮A是否被按下，应该使用以下哪个命令？\n\nA. isPressed("A")\nB. isPressed(A)\nC. isPressed "A"\nD. isPressed A',
    options: [
      'A. isPressed("A")',
      'B. isPressed(A)',
      'C. isPressed "A"',
      'D. isPressed A'
    ],
    answer: 0,
    explanation: 'isPressed() 需要用字符串表示按钮名称，所以要用引号。\n\n- A选项：正确！用字符串"A"\n- B选项：变量A不是字符串\n- C选项：缺少括号\n- D选项：缺少括号和引号',
    hint: '按钮名称需要用引号括起来'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '坐标概念',
    question: '想要在屏幕上位置(3,5)打印"hello"，应该使用以下哪个命令？\n\nA. printPos(3, 5, "hello")\nB. printPos(3, 5); print("hello")\nC. printPos("hello", 3, 5)\nD. print("hello", 3, 5)',
    options: [
      'A. printPos(3, 5, "hello")',
      'B. printPos(3, 5); print("hello")',
      'C. printPos("hello", 3, 5)',
      'D. print("hello", 3, 5)'
    ],
    answer: 1,
    explanation: '先使用 printPos() 设置位置，再用 print() 打印内容。\n\n- A选项：printPos() 不包含打印内容\n- B选项：正确！先设置位置，再打印\n- C选项：参数顺序错误\n- D选项：print() 不支持位置参数',
    hint: 'printPos() 设置位置，print() 打印内容'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '命令功能',
    question: '以下哪个命令可以播放录制好的声音？\n\nA. playSound()\nB. playRecord()\nC. record()\nD. sound()',
    options: [
      'A. playSound()',
      'B. playRecord()',
      'C. record()',
      'D. sound()'
    ],
    answer: 1,
    explanation: '各命令功能不同：\n\n- A选项：playSound() 播放预设音效\n- B选项：正确！playRecord() 播放录制的声音\n- C选项：record() 是录制声音\n- D选项：sound() 不是有效命令',
    hint: '注意区分播放音效和播放录音'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '命令组合',
    question: '想要在按下按钮A时播放欢迎音效，应该使用以下哪段代码？\n\nA. isPressed("A") = playSound("welcome")\nB. if isPressed("A"): playSound("welcome")\nC. playSound("welcome") if isPressed("A")\nD. isPressed("A") and playSound("welcome")',
    options: [
      'A. isPressed("A") = playSound("welcome")',
      'B. if isPressed("A"): playSound("welcome")',
      'C. playSound("welcome") if isPressed("A")',
      'D. isPressed("A") and playSound("welcome")'
    ],
    answer: 1,
    explanation: '需要用 if 语句判断条件，然后执行命令。\n\n- A选项：赋值语法错误\n- B选项：正确！if 语句判断并执行\n- C选项：Python不支持这种语法\n- D选项：这是逻辑运算，不是条件执行',
    hint: '用 if 语句判断条件'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '逻辑推理',
    question: '下面代码的功能是什么？\n\n```python\nwhile True:\n    if isPressed("A"):\n        record()\n        print("Recording...")\n    if isPressed("B"):\n        playRecord()\n```',
    options: [
      'A. 只能录音',
      'B. 只能播放录音',
      'C. 可以录音和播放录音',
      'D. 既不能录音也不能播放'
    ],
    answer: 2,
    explanation: '代码分析：\n\n- 按下按钮A：执行 record() 录制声音\n- 按下按钮B：执行 playRecord() 播放录音\n- 两个功能都有，所以是C选项',
    hint: '分别分析两个 if 语句的功能'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '坐标系统',
    question: 'printPos(5, 3) 把光标移动到什么位置？\n\nA. 第5行第3列\nB. 第3行第5列\nC. 第5行第5列\nD. 第3行第3列',
    options: [
      'A. 第5行第3列',
      'B. 第3行第5列',
      'C. 第5行第5列',
      'D. 第3行第3列'
    ],
    answer: 1,
    explanation: 'printPos() 的参数顺序是 (列, 行)：\n\n- printPos(5, 3) 表示第5列、第3行\n- 第一个参数是列（x坐标）\n- 第二个参数是行（y坐标）\n\n数学知识：坐标系统 (x, y) 中，x是横坐标（列），y是纵坐标（行）。',
    hint: 'printPos(列, 行)，第一个是列'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L1-4',
  title: '智能门铃和语音留言',
  subtitle: '硬件编程：声音、按钮检测、屏幕显示',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '学会使用 playSound() 播放音效',
    '掌握 isPressed() 和 isTouched() 检测输入',
    '理解 print() 和 printPos() 显示文字',
    '学会使用 record() 和 playRecord() 录音播放'
  ],
  prerequisites: [
    'Python 基础语法',
    'if 条件判断',
    'while 循环',
    '需要硬件设备支持'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['show', 'sound', 'play', 'press'],
  medium: ['record', 'button', 'screen', 'touch'],
  hard: ['position', 'hardware', 'welcome', 'doorbell']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    "playSound('doorbell')",
    "if isPressed('A'):\n    print('hello')",
    "printPos(0, 0)\nprint('welcome')",
    "record()\nprint('done')",
    "playRecord()"
  ],
  medium: [
    "if isPressed('A'):\n    playSound('welcome')",
    "if isTouched(0):\n    print('touched!')",
    "printPos(3, 5)\nprint('hello world')",
    "if isPressed('A'):\n    record()\nelif isPressed('B'):\n    playRecord()",
    "while True:\n    if isPressed('A'):\n        break"
  ],
  hard: [
    "while True:\n    if isPressed('A'):\n        playSound('hello')\n    if isPressed('B'):\n        playSound('bye')",
    "printPos(0, 0)\nprint('Status:')\nprintPos(0, 1)\nprint(str(isPressed('A')))",
    "if isPressed('A'):\n    record()\n    print('Recorded!')\nif isPressed('B'):\n    playRecord()",
    "if isPressed('A') and isTouched(0):\n    print('both triggered')",
    "while True:\n    if isPressed('A'):\n        printPos(0, 0)\n        print('A pressed!')"
  ]
}

// 导出所有数据
export const L1_4_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L1_4_data
