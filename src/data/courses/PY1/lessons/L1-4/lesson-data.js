/**
 * PY1 课程 L1-4: 智能门铃与语音留言
 *
 * 核心知识点:
 * 1. 智能门铃 - 按键检测与声音播放
 * 2. 语音留言 - 录音与播放
 * 3. 显示图片 - showPic()命令
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'print',
    pronunciation: '[prɪnt]',
    partOfSpeech: 'v.',
    meaning: '打印；输出',
    level: 'easy',
    example: 'Press the button to print the document.',
    exampleTranslation: '按下按钮来打印文件。',
    source: 'ocr'
  },
  {
    word: 'picture',
    pronunciation: '[ˈpɪktʃə]',
    partOfSpeech: 'n.',
    meaning: '图片；图像',
    level: 'easy',
    example: 'This is a beautiful picture.',
    exampleTranslation: '这是一张美丽的图片。',
    source: 'ocr'
  },
  {
    word: 'sound',
    pronunciation: '[saʊnd]',
    partOfSpeech: 'n.',
    meaning: '声音',
    level: 'easy',
    example: 'The sound of the bell is nice.',
    exampleTranslation: '铃铛的声音很好听。',
    source: 'ocr'
  },
  {
    word: 'play',
    pronunciation: '[pleɪ]',
    partOfSpeech: 'v.',
    meaning: '播放；游戏',
    level: 'easy',
    example: 'Play the video.',
    exampleTranslation: '播放视频。',
    source: 'ocr'
  },
  {
    word: 'press',
    pronunciation: '[pres]',
    partOfSpeech: 'v.',
    meaning: '按；压',
    level: 'easy',
    example: 'Press the button.',
    exampleTranslation: '按下按钮。',
    source: 'ocr'
  },
  {
    word: 'record',
    pronunciation: '[ˈrekɔːd]',
    partOfSpeech: 'v.',
    meaning: '记录；录制',
    level: 'medium',
    example: 'Record a meeting.',
    exampleTranslation: '记录会议内容。',
    source: 'ocr'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '智能门铃 - 按键与声音',
    emoji: '🔔',
    gradeLevel: '1-2',
    summary: '按下按键播放声音',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '智能门铃就像一个守门机器人，它会一直观察有没有人按下按键，当有人按下时就播放铃声。',
      concept: '使用 isPressed() 检测按键是否被按下，使用 playSound() 播放声音。',
      syntax: "isPressed('按键名称')\nplaySound('声音名称')",
      example: {
        title: '实现门铃',
        code: "if isPressed('A'):\n    playSound('ring')",
        output: '（按下A键时播放铃声）',
        explanation: 'isPressed("A") 检测 A 键是否被按下。当按下时，条件成立，执行 playSound("ring") 播放铃声。'
      },
      practice: [
        {
          question: "isPressed('A') 检测的是什么？",
          answer: 'A键是否被按下'
        },
        {
          question: "playSound('ring') 的作用是什么？",
          answer: '播放名称为ring的声音'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'print() 可以在屏幕上打印文字，printPos() 可以在指定位置打印文字，让显示更美观。',
      concept: 'print() 在左上角打印，printPos() 在指定位置打印。',
      syntax: "print('内容')\nprintPos('内容', '位置')",
      example: {
        title: '在屏幕中间显示文字',
        code: "printPos('欢迎来到我家', '中间')",
        output: '（屏幕中间显示"欢迎来到我家"）',
        explanation: 'printPos() 有两个参数：第一个是打印的内容，第二个是打印的位置。"中间"表示在屏幕中间显示。'
      },
      practice: [
        {
          question: "print('你好') 和 printPos('你好', '中间') 有什么区别？",
          answer: 'print在左上角显示，printPos可以指定位置'
        },
        {
          question: 'printPos() 的第一个参数是什么？',
          answer: '要打印的内容'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'isTouched() 可以检测触摸传感器是否被触碰，常用于访客按门铃的场景。',
      concept: 'isTouched() 检测触摸传感器是否被按下，常用于实现触摸交互功能。',
      syntax: 'isTouched()',
      example: {
        title: '触摸门铃',
        code: "if isTouched():\n    playSound('ring')",
        output: '（触摸传感器被触碰时播放铃声）',
        explanation: 'isTouched() 检测触摸传感器是否被按下。当访客触摸传感器时，条件成立，播放铃声提醒主人有访客。'
      },
      practice: [
        {
          question: 'isTouched() 和 isPressed() 有什么区别？',
          answer: 'isTouched检测触摸传感器，isPressed检测按键'
        },
        {
          question: '什么时候适合用 isTouched()？',
          answer: '需要检测触摸操作时'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '语音留言 - 录音与播放',
    emoji: '🎤',
    gradeLevel: '1-2',
    summary: '录制声音和播放录音',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '访客留言功能就像一个录音电话，按下录音键可以录下访客说的话，播放键可以回放录音。',
      concept: '使用 record() 录制声音，使用 playRecord() 播放录制的音频。',
      syntax: 'record()\nplayRecord()',
      example: {
        title: '访客留言',
        code: "if isPressed('A'):\n    record()\nif isPressed('B'):\n    playRecord()",
        output: '（按下A键录音，按下B键播放）',
        explanation: '按下 A 键时执行 record() 开始录音，按下 B 键时执行 playRecord() 播放录制的音频。'
      },
      practice: [
        {
          question: 'record() 命令的作用是什么？',
          answer: '录制声音'
        },
        {
          question: 'playRecord() 命令的作用是什么？',
          answer: '播放录制的声音'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '访客按下门铃后，主人可以远程查看是谁来了。通过 showPic() 可以在屏幕上显示图片。',
      concept: '使用 showPic() 显示图片，括号内填入图片名称。',
      syntax: "showPic('图片名称')",
      example: {
        title: '显示欢迎图片',
        code: "showPic('欢迎1')",
        output: '（屏幕显示"欢迎1"图片）',
        explanation: 'showPic() 可以显示指定的图片，图片名称要写成字符串形式放在引号里。'
      },
      practice: [
        {
          question: "showPic('dog') 会显示什么？",
          answer: '显示名为dog的图片'
        },
        {
          question: 'showPic() 的参数是什么类型？',
          answer: '字符串类型'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '可以把多个功能组合在一起：访客按下触摸传感器，屏幕显示欢迎图片，同时播放铃声。这样就实现了一个完整的智能门禁系统！',
      concept: '多个功能可以组合使用，实现复杂的交互场景。',
      syntax: 'if isTouched():\n    showPic(...)\n    playSound(...)',
      example: {
        title: '完整门禁系统',
        code: "if isPressed('A'):\n    record()\nif isPressed('B'):\n    playRecord()\nif isTouched():\n    showPic('欢迎1')\n    playSound('ring')",
        output: '（综合：按A录音，按B播放，触摸显示图片并响铃）',
        explanation: '完整的智能门禁系统：按下 A 键录音，按下 B 键播放录音，触摸传感器被触碰时显示欢迎图片并播放铃声。多个功能组合在一起，提供完整的访客体验。'
      },
      practice: [
        {
          question: '如何实现按下触摸传感器后同时显示图片和播放声音？',
          answer: '在同一个if语句中同时调用showPic()和playSound()'
        },
        {
          question: 'record() 和 playRecord() 有什么区别？',
          answer: 'record()是录音，playRecord()是播放录音'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '智慧核心',
    emoji: '🧠',
    gradeLevel: '3-4',
    summary: '控制其他设备的小型计算机',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '智慧核心就像机器人的大脑，可以控制其他设备。我们给它写入代码，它就会按照代码的指令去控制灯光、声音等设备。',
      concept: '智慧核心是一个小型计算机，可以控制其他设备，按照代码的指令行动。',
      syntax: '连接电脑 → 写入代码 → 控制设备',
      example: {
        title: '智慧核心工作流程',
        code: '# 1. 将智慧核心连接到电脑\n# 2. 在电脑上编写代码\n# 3. 将代码写入智慧核心\n# 4. 智慧核心按指令控制设备',
        output: '',
        explanation: '智慧核心本身不能直接编程，需要通过电脑编写代码，然后下载到智慧核心中，智慧核心再按照代码控制其他设备工作。'
      },
      practice: [
        {
          question: '智慧核心是什么？',
          answer: '一个可以控制其他设备的小型计算机'
        },
        {
          question: '智慧核心的代码是从哪里来的？',
          answer: '从大电脑编写后写入'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '智慧核心可以控制很多设备：舵机（旋转）、声音（播放音效）、屏幕（显示文字）等。不同的命令控制不同的设备。',
      concept: '不同的命令控制不同的设备：按键检测、声音播放、文字显示、舵机控制等。',
      syntax: 'isPressed() - 按键\nplaySound() - 声音\nprint() - 文字\nrecord() - 录音',
      example: {
        title: '智慧核心命令分类',
        code: '# 按键检测\nisPressed("A")\n# 声音播放\nplaySound("ring")\n# 文字显示\nprint("你好")\n# 录音\nrecord()',
        output: '',
        explanation: '智慧核心有不同的命令来控制不同功能：isPressed() 检测按键、playSound() 播放声音、print() 显示文字、record() 录制声音。'
      },
      practice: [
        {
          question: 'isPressed() 是检测什么的命令？',
          answer: '按键是否被按下'
        },
        {
          question: 'playSound() 是控制什么的命令？',
          answer: '播放声音'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '通过组合不同的命令，可以实现智能家居、机器人控制等各种应用。智慧核心是硬件编程的基础。',
      concept: '通过代码组合，智慧核心可以实现各种智能应用。',
      syntax: '# 智能门禁\nif isTouched():\n    playSound("ring")\n    showPic("welcome")\n# 语音助手\nif isPressed("A"):\n    record()\nif isPressed("B"):\n    playRecord()',
      example: {
        title: '智能门禁系统',
        code: "if isTouched():\n    printPos('有访客', '中间')\n    playSound('ring')\n\nif isPressed('A'):\n    record()\n\nif isPressed('B'):\n    playRecord()",
        output: '',
        explanation: '组合使用多个命令可以实现完整的智能门禁系统：触摸传感器触发时显示"有访客"并响铃；按下 A 键录音，按下 B 键播放录音。'
      },
      practice: [
        {
          question: '智慧核心可以同时执行多个任务吗？',
          answer: '可以，通过组合不同的if语句'
        },
        {
          question: '智能门禁系统需要哪些命令组合？',
          answer: 'isTouched()、printPos()、playSound()、record()、playRecord()'
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
    mathConcept: '命令理解',
    question: '下列哪段代码可以在智慧核心的屏幕中间打印出文字"欢迎"？',
    options: [
      "print('欢迎')",
      "printPos('欢迎')",
      "printPos('欢迎', '中间')",
      "printPos('中间', '欢迎')"
    ],
    answer: 2,
    explanation: 'print() 只能在左上角打印文字。printPos() 可以在指定位置打印，第一个参数是内容，第二个参数是位置。所以 printPos("欢迎", "中间") 是正确的。',
    hint: 'printPos需要两个参数'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '功能区分',
    question: '下列哪个语句可以播放录音？',
    options: [
      'playSound()',
      'playRecord()',
      'record()',
      'isPressed()'
    ],
    answer: 1,
    explanation: 'playSound() 用于播放预设的声音（如铃声）；playRecord() 用于播放录制的音频；record() 用于录制声音；isPressed() 用于检测按键。',
    hint: '播放录音是play开头的'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '条件判断',
    question: '要实现访客按下触摸传感器后响起铃声的效果，应该补充什么条件？\n\nif :\n    playSound("ring")',
    options: [
      "isPressed('A')",
      'isPressed()',
      "isPressed('B')",
      'isTouched()'
    ],
    answer: 3,
    explanation: 'isPressed() 用于检测按键是否按下；isTouched() 用于检测触摸传感器是否被触碰。要实现触摸传感器触发，应该使用 isTouched()。',
    hint: '触摸传感器应该用哪个命令？'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '功能理解',
    question: 'showPic() 命令的作用是什么？',
    options: [
      '播放声音',
      '显示图片',
      '打印文字',
      '检测按键'
    ],
    answer: 1,
    explanation: 'showPic() 用于在屏幕上显示图片，参数是图片名称。playSound() 播放声音，print() 打印文字，isPressed() 检测按键。',
    hint: 'showPic 中的 Pic 是什么意思？'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合应用',
    question: '实现以下功能的正确代码是？\n- 按下 A 键录音\n- 按下 B 键播放录音',
    options: [
      "if isPressed('A'): playRecord()\nif isPressed('B'): record()",
      "if isPressed('A'): record()\nif isPressed('B'): playRecord()",
      "if isTouched('A'): record()\nif isTouched('B'): playRecord()",
      "if isPressed('A'): playSound('ring')"
    ],
    answer: 1,
    explanation: '录音用 record()，播放录音用 playRecord()。所以按下 A 键应该执行 record()，按下 B 键应该执行 playRecord()。选项 B 正确。',
    hint: '录音是record，播放是playRecord'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '系统设计',
    question: '智慧核心的工作流程是？',
    options: [
      '直接编程 → 执行任务',
      '连接电脑 → 写入代码 → 控制设备',
      '语音控制 → 执行任务',
      '自动检测 → 无需代码'
    ],
    answer: 1,
    explanation: '智慧核心是一个小型计算机，需要通过大电脑编写代码，然后将代码下载到智慧核心中，智慧核心再按照代码的指令控制其他设备工作。',
    hint: '智慧核心不能直接编程，需要通过电脑写入代码'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L1-4',
  title: '智能门铃',
  subtitle: '学会使用按键、声音和屏幕',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握 isPressed() 检测按键的方法',
    '掌握 playSound() 播放声音的方法',
    '掌握 printPos() 在指定位置显示文字',
    '理解智慧核心的工作原理'
  ],
  prerequisites: [
    '理解 if 语句的基本用法',
    '知道什么是字符串'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['print', 'play', 'press', 'sound', 'record'],
  medium: ['picture', 'button', 'touch', 'ring'],
  hard: ['isPressed', 'isTouched', 'showPic', 'playRecord']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    "isPressed('A')",
    "playSound('ring')",
    "print('你好')",
    'record()'
  ],
  medium: [
    "printPos('欢迎', '中间')",
    "showPic('welcome')",
    "if isPressed('A'):\n    playSound('ring')",
    "if isTouched():\n    print('按下')"
  ],
  hard: [
    "if isPressed('A'):\n    record()\nif isPressed('B'):\n    playRecord()",
    "if isTouched():\n    showPic('欢迎1')\n    playSound('ring')",
    "if isPressed('A'):\n    printPos('你好', '中间')\n    playSound('ding')",
    "printPos('有访客', '中间')\nplaySound('ring')"
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