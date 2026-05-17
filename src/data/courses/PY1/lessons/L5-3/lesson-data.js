/**
 * PY1 课程 L5-3: 智慧小屋
 *
 * 核心知识点:
 * 1. 模式切换 - 在家/不在家模式
 * 2. 门铃功能 - 触摸传感器
 * 3. 雨滴传感器 - getRain()
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'rain',
    pronunciation: '[reɪn]',
    partOfSpeech: 'n.',
    meaning: '雨',
    level: 'easy',
    example: 'It is raining outside.',
    exampleTranslation: '外面正在下雨。',
    source: 'ocr'
  },
  {
    word: 'mode',
    pronunciation: '[məʊd]',
    partOfSpeech: 'n.',
    meaning: '模式；状态',
    level: 'medium',
    example: 'Switch to night mode.',
    exampleTranslation: '切换到夜间模式。',
    source: 'ocr'
  },
  {
    word: 'state',
    pronunciation: '[steɪt]',
    partOfSpeech: 'n.',
    meaning: '状态',
    level: 'medium',
    example: 'Current state of the system.',
    exampleTranslation: '系统的当前状态。',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'lock',
    pronunciation: '[lɒk]',
    partOfSpeech: 'v.',
    meaning: '锁；锁住',
    level: 'easy',
    example: 'Lock the door.',
    exampleTranslation: '锁上门。',
    source: 'extended'
  },
  {
    word: 'ring',
    pronunciation: '[rɪŋ]',
    partOfSpeech: 'v.',
    meaning: '响；按门铃',
    level: 'easy',
    example: 'Ring the doorbell.',
    exampleTranslation: '按门铃。',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '模式切换',
    emoji: '🔀',
    gradeLevel: '3-4',
    summary: '用变量记录当前模式状态',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '智慧小屋有两种模式：在家和不在家。用一个变量来记录当前是哪种模式。',
      concept: '用变量 mode 记录模式，按下不同按键切换不同模式。',
      syntax: `mode = ''
while True:
    key = getIRKey()
    if key == '*':
        mode = '在家'
    if key == '#':
        mode = '不在家'`,
      example: {
        title: '模式切换',
        code: `mode = ''
while True:
    key = getIRKey()
    if key == '*':
        mode = '在家'
        print('切换到在家模式')
    if key == '#':
        mode = '不在家'
        print('切换到不在家模式')`,
        output: '（按*）切换到在家模式\n（按#）切换到不在家模式',
        explanation: '用变量 mode 存储当前模式，按 * 键切换到在家，按 # 键切换到不在家。'
      },
      practice: [
        {
          question: '如何记录当前模式？',
          answer: '用变量 mode 存储模式名称'
        },
        {
          question: '按哪个键切换到不在家模式？',
          answer: '# 键'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '不同模式下，小屋的功能不一样。在家模式可以播放门铃，不在家模式可以录制留言。',
      concept: '根据 mode 变量的值，执行不同的操作。',
      syntax: `if mode == '在家':
    # 在家模式的操作
    if isPressed('A'):
        playSound('ring')
elif mode == '不在家':
    # 不在家模式的操作
    if isPressed('A'):
        record()`,
      example: {
        title: '按模式执行',
        code: `mode = '不在家'
if mode == '在家':
    print('显示门铃界面')
else:
    print('显示留言界面')`,
        output: '显示留言界面',
        explanation: 'mode 是"不在家"，所以执行 else 分支，显示留言界面。'
      },
      practice: [
        {
          question: 'mode == "在家" 时执行什么分支？',
          answer: 'if 分支'
        },
        {
          question: '如何根据模式做不同的事情？',
          answer: '用 if mode == 判断'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '模式切换是一个持续的过程，需要不断检测按键并更新模式。',
      concept: '用 while True 不断循环检测，根据按键改变模式变量。',
      syntax: `mode = ''
while True:
    key = getIRKey()
    if key == '*':
        mode = '在家'
    if key == '#':
        mode = '不在家'
    if mode == '在家':
        # 在家模式功能
    if mode == '不在家':
        # 不在家模式功能`,
      example: {
        title: '完整的模式系统',
        code: `mode = '不在家'
while True:
    key = getIRKey()
    if key == '*':
        mode = '在家'
        print('切换到在家模式')
    if key == '#':
        mode = '不在家'
        print('切换到不在家模式')`,
        output: '（按*）切换到在家模式\n（按#）切换到不在家模式',
        explanation: '循环不断检测按键，按 * 切换在家，按 # 切换不在家。'
      },
      practice: [
        {
          question: '模式切换需要用什么结构持续检测？',
          answer: 'while True 循环'
        },
        {
          question: '如何让程序在两种模式间切换？',
          answer: '通过改变 mode 变量的值'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '门铃功能',
    emoji: '🔔',
    gradeLevel: '3-4',
    summary: '触摸传感器触发门铃',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '门铃功能：访客按下触摸传感器，小屋主人就能听到门铃声。',
      concept: 'isTouched() 检测是否触摸，触摸时播放门铃声音。',
      syntax: `if isTouched():
    playSound('ring')`,
      example: {
        title: '门铃响',
        code: `while True:
    if isTouched():
        playSound('ring')`,
        output: '（触摸传感器）→ 播放门铃声',
        explanation: '不断检测触摸状态，触摸到就播放门铃。'
      },
      practice: [
        {
          question: '门铃用哪个函数检测触摸？',
          answer: 'isTouched()'
        },
        {
          question: '门铃声音用什么播放？',
          answer: 'playSound("ring")'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '不在家模式时，访客可以录音留言；在家模式时，主人可以播放访客的留言。',
      concept: 'record() 录制声音，playRecord() 播放录制的留言。',
      syntax: `# 不在家模式：录制留言
if isPressed('A'):
    record()

# 在家模式：播放留言
if isPressed('B'):
    playRecord()`,
      example: {
        title: '留言功能',
        code: `mode = '不在家'
if mode == '不在家':
    if isPressed('A'):
        print('开始录音')
        record()
if mode == '在家':
    if isPressed('B'):
        print('播放留言')
        playRecord()`,
        output: '（按下A键在不在家模式）→ 开始录音',
        explanation: '不在家模式下按下 A 键开始录音，主人回家后按 B 键播放留言。'
      },
      practice: [
        {
          question: '录制留言用什么函数？',
          answer: 'record()'
        },
        {
          question: '播放留言用什么函数？',
          answer: 'playRecord()'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '综合门铃和留言功能，根据当前模式决定执行什么操作。',
      concept: '模式判断和按键检测结合，实现完整的智能门铃系统。',
      syntax: `while True:
    if mode == '在家':
        if isTouched():
            playSound('ring')
        if isPressed('A'):
            playRecord()
    if mode == '不在家':
        if isPressed('A'):
            record()
        if isPressed('B'):
            playRecord()`,
      example: {
        title: '完整的门铃系统',
        code: `mode = '不在家'
while True:
    if mode == '在家':
        if isTouched():
            playSound('ring')
            print('门铃响了')
    if mode == '不在家':
        if isPressed('A'):
            record()
            print('开始录音')`,
        output: '（触摸→在家模式）门铃响了\n（按A→不在家模式）开始录音',
        explanation: '根据模式决定操作：在家模式下触摸响门铃，不在家模式下按A录音。'
      },
      practice: [
        {
          question: '在家模式下触摸传感器会怎样？',
          answer: '播放门铃声音'
        },
        {
          question: '不在家模式下按A键会怎样？',
          answer: '开始录制留言'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '雨滴传感器',
    emoji: '🌧️',
    gradeLevel: '3-4',
    summary: '检测是否下雨',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '雨滴传感器可以检测是否下雨。下雨时传感器数据会变大。',
      concept: 'getRain() 获取雨滴传感器的数据，数据大表示下雨。',
      syntax: `getRain()  # 返回雨滴数据
# 数值大表示下雨，小表示没下雨`,
      example: {
        title: '检测雨滴',
        code: `while True:
    r = getRain()
    print(r)
    time.sleep(0.1)
    clear()`,
        output: '（下雨时）数值700左右\n（没雨时）数值0左右',
        explanation: 'getRain() 返回雨滴数据，下雨时数值在 700 左右，没雨时接近 0。'
      },
      practice: [
        {
          question: '用什么命令检测雨？',
          answer: 'getRain()'
        },
        {
          question: '下雨时 getRain() 的值是大还是小？',
          answer: '大（约700）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '可以根据雨滴数据判断天气，在屏幕上显示不同的信息。',
      concept: '用 if 判断雨滴数据大小，显示不同的提示信息。',
      syntax: `r = getRain()
if r > 300:
    print('下雨了')
else:
    print('没下雨')`,
      example: {
        title: '判断天气',
        code: `while True:
    r = getRain()
    if r > 300:
        print('下雨了')
        showPic('rain')
    else:
        print('天气晴朗')
        showPic('sun')
    time.sleep(0.1)
    clear()`,
        output: '下雨了 → 显示雨图片\n天气晴朗 → 显示太阳图片',
        explanation: '根据雨滴数据大小判断天气，显示对应的图片。'
      },
      practice: [
        {
          question: '如何判断是否下雨？',
          answer: 'if getRain() > 阈值'
        },
        {
          question: '下雨时在屏幕显示什么？',
          answer: 'showPic("rain") 等下雨相关图片'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '雨滴传感器可以和其他功能结合，实现智能家居的更多场景。',
      concept: '结合模式切换和雨滴检测，在不同天气下做不同的事情。',
      syntax: `while True:
    r = getRain()
    if r > 300:
        print('雨天模式')
        if mode == '不在家':
            lock()
    else:
        print('晴天模式')`,
      example: {
        title: '智能雨控',
        code: `mode = '不在家'
while True:
    r = getRain()
    if r > 300:
        print('下雨了，锁门')
        lock()
    else:
        if isPressed('*'):
            mode = '在家'
            print('主人回家了')`,
        output: '（下雨时自动锁门）',
        explanation: '下雨时自动锁门保护屋子，主人可以通过按键切换模式。'
      },
      practice: [
        {
          question: '雨滴传感器的数据大于多少表示下雨？',
          answer: '约300以上'
        },
        {
          question: '如何结合天气和模式做智能控制？',
          answer: '用 if 判断天气，用 mode 判断模式'
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
    mathConcept: '模式切换',
    question: '按哪个键可以切换到"在家"模式？',
    options: [
      '* 键',
      '# 键',
      'A 键',
      'B 键'
    ],
    answer: 0,
    explanation: '按 * 键切换到在家模式，按 # 键切换到不在家模式。答案是 A。',
    hint: '* 表示回家的意思'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '门铃检测',
    question: '检测触摸应该用哪个命令？',
    options: [
      'isPressed()',
      'isTouched()',
      'getRain()',
      'playSound()'
    ],
    answer: 1,
    explanation: 'isTouched() 用于检测触摸传感器是否被触摸。答案是 B。',
    hint: 'touch 是触摸的意思'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '雨滴检测',
    question: 'getRain() 返回什么类型的值？',
    options: [
      '字符串',
      '布尔值',
      '数字',
      '列表'
    ],
    answer: 2,
    explanation: 'getRain() 返回雨滴传感器的数值，是一个数字。下雨时约700，没雨时接近0。答案是 C。',
    hint: 'Rain 是雨，返回的是数据'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '录音功能',
    question: '录制访客留言应该用什么命令？',
    options: [
      'playSound()',
      'playRecord()',
      'record()',
      'showPic()'
    ],
    answer: 2,
    explanation: 'record() 用于录制声音。playRecord() 用于播放录音，record() 用于录制。答案是 C。',
    hint: 'record 是录制'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合判断',
    question: `以下代码的输出是？\n\n\`\`\`python\nmode = '不在家'\nif mode == '在家':\n    print('显示门铃')\nelse:\n    print('显示留言')\n\`\`\``,
    options: [
      '显示门铃',
      '显示留言',
      '什么都不显示',
      '报错'
    ],
    answer: 1,
    explanation: 'mode 是"不在家"，不等于"在家"，所以执行 else 分支，打印"显示留言"。答案是 B。',
    hint: '不在家模式显示留言功能'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '模式理解',
    question: '智慧小屋中"不在家模式"的主要功能是什么？',
    options: [
      '播放门铃',
      '录制和播放留言',
      '显示图片',
      '检测光线'
    ],
    answer: 1,
    explanation: '不在家模式主要用于录制访客留言和播放留言；在家模式用于播放门铃。答案是 B。',
    hint: '不在家时访客无法找到主人，需要留言'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L5-3',
  title: '智慧小屋',
  subtitle: '模式切换与智能控制',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解模式切换的概念',
    '掌握在家/不在家模式的切换',
    '掌握门铃和留言功能',
    '了解雨滴传感器的使用'
  ],
  prerequisites: [
    '理解 if 语句',
    '知道什么是变量'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['rain', 'ring', 'lock', 'mode'],
  medium: ['state', 'touch', 'record', 'press'],
  hard: ['sensor', 'detect', 'trigger', 'activate']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    "mode = '在家'",
    'if isTouched():',
    'playSound("ring")',
    'getRain()'
  ],
  medium: [
    "if mode == '在家':",
    "if mode == '不在家':",
    'record()',
    'playRecord()'
  ],
  hard: [
    "if getRain() > 300:\n    print('下雨')",
    "mode = '不在家'\nwhile True:\n    key = getIRKey()",
    "if isPressed('A'):\n    record()",
    "if isTouched():\n    playSound('ring')"
  ]
}

// 导出所有数据
export const L5_3_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L5_3_data