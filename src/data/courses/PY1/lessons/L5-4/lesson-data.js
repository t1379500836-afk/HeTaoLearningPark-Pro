/**
 * PY1 课程 L5-4: 升级门铃与智慧小屋
 *
 * 核心知识点:
 * 1. 模式切换 - 在不同模式间切换功能
 * 2. 雨滴传感器 - getRain() 检测是否下雨
 * 3. 留言功能 - record() 和 playRecord()
 * 4. 密码开门 - 输入密码验证身份
 */

// 单词卡数据 - OCR 提取 + 拓展
export const vocabData = [
  // OCR 提取的单词（必须包含）
  {
    word: 'rain',
    pronunciation: '[reɪn]',
    partOfSpeech: 'n.',
    meaning: '雨',
    level: 'easy',
    example: 'It is raining outside.',
    exampleTranslation: '外面正在下雨。',
    note: '最基本的天气词汇'
  },
  {
    word: 'show',
    pronunciation: '[ʃəʊ]',
    partOfSpeech: 'v.',
    meaning: '展示；给...看',
    level: 'easy',
    example: 'Show me your drawing.',
    exampleTranslation: '给我看看你的画。',
    note: '常用动词词汇'
  },
  {
    word: 'lock',
    pronunciation: '[lɒk]',
    partOfSpeech: 'v./n.',
    meaning: '锁；锁上',
    level: 'easy',
    example: 'Please lock the door.',
    exampleTranslation: '请锁好门。',
    note: '家庭安全常用词'
  },
  {
    word: 'mode',
    pronunciation: '[məʊd]',
    partOfSpeech: 'n.',
    meaning: '模式',
    level: 'medium',
    example: 'Game mode is fun.',
    exampleTranslation: '游戏模式很好玩。',
    note: '电子设备常用词'
  },
  // 拓展单词 - 与智慧小屋相关的常用词
  {
    word: 'message',
    pronunciation: '[ˈmesɪdʒ]',
    partOfSpeech: 'n.',
    meaning: '消息；留言',
    level: 'easy',
    example: 'I left a message for you.',
    exampleTranslation: '我给你留了一条消息。',
    note: '日常生活中很常用'
  },
  {
    word: 'home',
    pronunciation: '[həʊm]',
    partOfSpeech: 'n.',
    meaning: '家',
    level: 'easy',
    example: 'I am going home.',
    exampleTranslation: '我要回家了。',
    note: '最基础的词汇之一'
  }
]

// 知识点数据 - 基于 OCR 提取
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '模式切换 - 智能小屋的核心',
    emoji: '🏠',
    gradeLevel: '3-4',
    summary: '使用变量和条件判断实现不同模式的功能切换',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你的房子有两种"模式"：在家模式时门铃会响，不在家模式时会自动录音。就像手机的不同模式一样！',
      concept: '使用变量存储当前模式，通过按键切换模式，在不同模式下执行不同的功能。',
      syntax: "mode = ''  # 存储当前模式\nif key == '*':\n    mode = '在家'\nif key == '#':\n    mode = '不在家'",
      example: {
        title: '基本模式切换',
        code: "mode = ''\nwhile True:\n    key = getIRKey()\n    if key == '*':\n        mode = '在家'\n    if key == '#':\n        mode = '不在家'\n    print(mode)",
        output: '按 * 显示"在家"，按 # 显示"不在家"',
        explanation: '使用 mode 变量存储当前模式，通过红外遥控器的 * 键和 # 键切换模式。'
      },
      practice: [
        {
          question: '用什么变量存储当前模式？',
          answer: 'mode'
        },
        {
          question: '按 * 键会切换到什么模式？',
          answer: '在家模式'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '智能家居设计师！为小屋设计多种模式，在不同模式下实现不同的功能组合！',
      concept: '使用 mode 变量配合 if 语句，在不同模式下执行不同代码块。在家模式有门铃和遥控开门，不在家模式有留言和密码开门。',
      syntax: "if mode == '在家':\n    # 在家模式功能\nif mode == '不在家':\n    # 不在家模式功能",
      example: {
        title: '模式功能区分',
        code: "if mode == '在家':\n    if isTouched():\n        playSound('ring')\nif mode == '不在家':\n    if isPressed('A'):\n        record()",
        output: '在家模式按触摸传感器响铃，不在家模式按A键录音',
        explanation: '根据 mode 的值执行不同代码块，实现模式功能区分。'
      },
      practice: [
        {
          question: '如何判断当前是在家模式？',
          answer: "if mode == '在家'"
        },
        {
          question: '在家模式和不在家模式有什么不同功能？',
          answer: '在家模式：门铃、遥控开门；不在家模式：留言、密码开门'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '智慧小屋架构师！设计完整的智能家居系统，支持多种模式切换和功能联动！',
      concept: '可以扩展多种模式（如睡眠模式、派对模式、节能模式等），每种模式有不同的功能组合和参数配置。',
      syntax: "modes = ['在家', '不在家', '睡眠', '节能']\nmode_index = 0\nif key == 'OK':\n    mode_index = (mode_index + 1) % len(modes)",
      example: {
        title: '多模式切换',
        code: "modes = ['在家', '不在家', '睡眠', '节能']\nmode = modes[0]\nwhile True:\n    key = getIRKey()\n    if key == 'OK':\n        current = modes.index(mode)\n        mode = modes[(current + 1) % len(modes)]",
        output: '按 OK 键循环切换模式',
        explanation: '使用列表存储多种模式，通过索引循环切换，实现多模式系统。'
      },
      practice: [
        {
          question: '如何添加新的模式？',
          answer: '在 modes 列表中添加新模式名称'
        },
        {
          question: '(current + 1) % len(modes) 是什么意思？',
          answer: '切换到下一个模式，到达末尾后回到开头'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '雨滴传感器 - 天气感知',
    emoji: '🌧️',
    gradeLevel: '3-4',
    summary: '使用雨滴传感器检测是否下雨，并根据天气状态控制设备',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象有一个能感知下雨的小助手！外面下雨时它会提醒你收衣服，没下雨时告诉你可以出去玩！',
      concept: '雨滴传感器上有许多金属导线，有水时导线连通。getRain() 返回的数值：下雨时约 700，没雨时约 0。',
      syntax: "getRain()  # 获取雨滴传感器数值",
      example: {
        title: '检测是否下雨',
        code: "while True:\n    r = getRain()\n    printPos(r, '中间')\n    time.sleep(0.1)\n    clear()",
        output: '屏幕显示雨滴传感器数值',
        explanation: '持续检测并显示雨滴数值，可以通过数值判断是否下雨。'
      },
      practice: [
        {
          question: '下雨时 getRain() 返回大约多少？',
          answer: '700 左右'
        },
        {
          question: '没有雨时 getRain() 返回大约多少？',
          answer: '0 左右'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '天气预报员！根据雨滴传感器的读数，自动显示天气图片或执行相应操作！',
      concept: '根据 getRain() 的返回值判断天气状态，通常大于 300 表示下雨，小于 300 表示没雨。',
      syntax: "r = getRain()\nif r > 300:\n    # 下雨时的操作\nelse:\n    # 没雨时的操作",
      example: {
        title: '天气图片显示',
        code: "while True:\n    r = getRain()\n    if r > 300:\n        showPic('雨天')\n    else:\n        showPic('晴天')",
        output: '下雨显示雨天图片，否则显示晴天图片',
        explanation: '根据雨滴数值判断天气状态，显示对应的图片。'
      },
      practice: [
        {
          question: '如何判断是否在下雨？',
          answer: 'if getRain() > 300'
        },
        {
          question: '下雨时应该执行什么操作？',
          answer: '收衣服提醒、关窗户、显示雨天图片等'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '智能气象站工程师！设计一个完整的天气监测系统，记录降雨数据并提供智能建议！',
      concept: '可以记录降雨历史数据，计算降雨持续时间，甚至预测降雨趋势。结合其他传感器实现综合气象监测。',
      syntax: "rain_history = []\nwhile True:\n    r = getRain()\n    rain_history.append(r)\n    # 分析降雨趋势",
      example: {
        title: '降雨记录',
        code: "rain_data = []\nwhile True:\n    r = getRain()\n    rain_data.append(r)\n    if len(rain_data) > 100:\n        rain_data.pop(0)\n    avg = sum(rain_data) / len(rain_data)",
        output: '计算最近一段时间内的平均降雨量',
        explanation: '使用列表存储历史数据，保持固定长度，计算平均值分析降雨趋势。'
      },
      practice: [
        {
          question: '如何记录降雨历史？',
          answer: '使用列表存储每次 getRain() 的值'
        },
        {
          question: '如何计算降雨持续时间？',
          answer: '统计连续大于阈值的次数'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '留言功能 - 智能门禁',
    emoji: '🔊',
    gradeLevel: '3-4',
    summary: '使用 record() 和 playRecord() 实现留言录制和播放',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你不在家时，访客可以给你留言，你回家后可以听留言！就像手机语音信箱一样！',
      concept: 'record() 可以录制声音，playRecord() 可以播放录制好的声音。在不在家模式下，访客可以留言。',
      syntax: "record()        # 录制声音\nplayRecord()    # 播放录音",
      example: {
        title: '基本留言功能',
        code: "if mode == '不在家':\n    if isPressed('A'):\n        record()\n    if isPressed('B'):\n        playRecord()",
        output: '按 A 键录音，按 B 键播放',
        explanation: '在不在家模式下，A 键用于访客录制留言，B 键用于主人播放留言。'
      },
      practice: [
        {
          question: '哪个命令用于录制声音？',
          answer: 'record()'
        },
        {
          question: '哪个命令用于播放录音？',
          answer: 'playRecord()'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '智能门禁设计师！设计一个完整的访客留言系统，区分主人和访客的功能！',
      concept: '在家模式下，主人可以播放访客留言；不在家模式下，访客可以录制留言。使用触摸传感器触发门铃。',
      syntax: "# 在家模式\nif isPressed('A'):\n    playRecord()  # 播放访客留言\n\n# 不在家模式\nif isTouched():\n    playSound('ring')  # 门铃\nif isPressed('A'):\n    record()  # 访客录音\nif isPressed('B'):\n    playRecord()  # 访客试听",
      example: {
        title: '模式化留言系统',
        code: "if mode == '在家':\n    if isPressed('A'):\n        playRecord()\nif mode == '不在家':\n    if isTouched():\n        playSound('ring')\n    if isPressed('A'):\n        record()\n    if isPressed('B'):\n        playRecord()",
        output: '根据模式提供不同的留言功能',
        explanation: '在家模式主人播放留言，不在家模式访客录音和试听，触摸传感器作为门铃。'
      },
      practice: [
        {
          question: '在家模式下按 A 键会做什么？',
          answer: '播放访客留言'
        },
        {
          question: '不在家模式下触摸传感器会做什么？',
          answer: '播放门铃声'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '语音系统工程师！设计支持多条留言的智能留言系统，带时间戳和留言管理！',
      concept: '可以扩展为多条留言系统，记录每条留言的时间，支持留言编号、删除等高级功能。',
      syntax: "messages = []  # 存储留言信息\ndef record_message():\n    messages.append({'time': now(), 'duration': record()})\ndef play_message(index):\n    playRecord(messages[index])",
      example: {
        title: '多条留言管理',
        code: "messages = []\nif isPressed('A'):\n    record()\n    messages.append(len(messages))\nif isPressed('B'):\n    for i in messages:\n        print('留言 ' + str(i+1))",
        output: '记录和显示多条留言',
        explanation: '使用列表存储留言记录，支持多条留言的记录和管理。'
      },
      practice: [
        {
          question: '如何存储多条留言？',
          answer: '使用列表存储每条留言的信息'
        },
        {
          question: '如何播放指定编号的留言？',
          answer: '使用索引访问列表中的留言记录'
        }
      ]
    }
  }
]

// 习题数据 - 6 道（2 基础 + 2 进阶 + 2 挑战）
export const exercises = [
  // 🟢 基础题（2道）
  {
    id: 'ex-1',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '数数',
    question: '下列哪个命令用于录制声音？（ ）',
    options: ['playRecord()', 'record()', 'playSound()', 'playMusic()'],
    answer: 1,
    explanation: 'record() 用于录制声音，playRecord() 用于播放录音，playSound() 用于播放指定声音，playMusic() 用于播放音乐。',
    hint: 're- 开头的单词通常表示"记录"'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '数值判断',
    question: '下雨时，getRain() 返回的数值大约是？（ ）',
    options: ['0', '100', '300', '700'],
    answer: 3,
    explanation: 'getRain() 检测雨滴传感器数值，下雨时约 700，没雨时约 0。通常以 300 为界限判断是否下雨。',
    hint: '下雨时水连通了导线，数值会变大'
  },

  // 🟡 进阶题（2道）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '索引与切片计算',
    question: '运行下图代码，输出结果是？（       ）\n\n```python\ns = 5\ne = s + 3\na = \'苍穹之下，未来可期\'\nprint(a[s:e])\n```',
    options: ['苍穹，未来', '未来', '，未来', '未来可'],
    answer: 2,
    explanation: '首先 s = 5，e = s + 3 = 8。然后对字符串 a 进行切片操作 a[5:8]。索引 5 对应"未"，索引 8 对应"期"，切片结果包含起始索引不包含结束索引，结果是"，未来"。',
    hint: '先计算 s 和 e 的值，再进行切片'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '传感器应用',
    question: "若要实现下雨时显示 '雨天' 图片，不下雨时显示 '晴天' 图片，横线处应填什么？（      ）\n\n```python\nr = ________\nif r > 300:\n    showPic('雨天')\nelse:\n    showPic('晴天')\n```",
    options: ['getVolume()', 'getRain()', 'isPressed()', 'playRecord()'],
    answer: 1,
    explanation: 'getVolume() 获取音量，isPressed() 检测按键，playRecord() 播放录音。要检测下雨需要使用 getRain() 获取雨滴传感器数据。',
    hint: '哪个命令用于获取雨滴传感器数据？'
  },

  // 🔴 挑战题（2道）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '录音播放',
    question: "如果要实现按下 A 按钮录制录音，按下 B 按钮播放录音，横线处应该添加什么代码？（   ）\n\n```python\nwhile True:\n    if isPressed('A'):\n        record()\n    if isPressed('B'):\n        ________\n```",
    options: ['record()', 'playRecord()', 'playSound()', 'playMusic()'],
    answer: 1,
    explanation: 'record() 用于录制录音，playSound() 用于播放指定声音，playMusic() 用于播放音乐。要播放录制好的录音需要使用 playRecord()。',
    hint: '哪个命令用于播放录制好的录音？'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '模式切换',
    question: "执行下方代码，当用户依次按红外遥控器的 * 键、# 键、* 键后，mode 的值是？（   ）\n\n```python\nmode = ''\nwhile True:\n    key = getIRKey()\n    if key == '*':\n        mode = '在家'\n    if key == '#':\n        mode = '不在家'\n```",
    options: ['\'在家\'', '\'不在家\'', '\'\'', 'None'],
    answer: 0,
    explanation: '* 键设置 mode = \'在家\'，# 键设置 mode = \'不在家\'。按键顺序：* → 在家，# → 不在家，* → 在家。最终结果是 \'在家\'。',
    hint: '后面的按键会覆盖前面的设置'
  }
]

export const lessonMeta = {
  id: 'L5-4',
  title: '升级门铃与智慧小屋',
  subtitle: '学会模式切换、雨滴传感器和留言功能',
  difficulty: '进阶',
  estimatedTime: '45-55分钟',
  learningGoals: [
    '理解模式切换的概念和实现方法',
    '学会使用雨滴传感器检测天气状态',
    '掌握录音和播放功能的实现',
    '了解智慧小屋的系统架构和功能组合'
  ],
  prerequisites: [
    'Python 基础语法',
    '条件判断',
    '传感器基础',
    'L5-2, L5-3'
  ]
}

// 打字练习单词
export const typingWords = {
  easy: ['rain', 'mode', 'lock', 'home'],
  medium: ['sensor', 'record', 'switch', 'message'],
  hard: ['intelligent', 'automation', 'threshold', 'interaction']
}

// 代码模板
export const typingTemplates = {
  easy: [
    {
      title: '模式变量',
      template: "_ = ''",
      hint: '输入 mode'
    },
    {
      title: '切换到在家模式',
      template: "if key == '*':\n    mode = _",
      hint: '输入 \'在家\''
    },
    {
      title: '检测雨滴',
      template: "r = _()",
      hint: '输入 getRain'
    },
    {
      title: '录制声音',
      template: "_()",
      hint: '输入 record'
    }
  ],
  medium: [
    {
      title: '模式判断',
      template: "if _ == '在家':",
      hint: '输入 mode'
    },
    {
      title: '雨滴判断',
      template: "if r > 300:\n    showPic('雨天')\n_:\n    showPic('晴天')",
      hint: '输入 else'
    },
    {
      title: '在家模式功能',
      template: "if mode == '在家':\n    if isTouched():\n        _",
      hint: '输入 playSound(\'ring\')'
    },
    {
      title: '不在家模式功能',
      template: "if isPressed('A'):\n    _\nif isPressed('B'):\n    playRecord()",
      hint: '输入 record()'
    }
  ],
  hard: [
    {
      title: '完整模式切换',
      template: "while True:\n    key = getIRKey()\n    if key == '*':\n        mode = _\n    if key == '#':\n        mode = '不在家'",
      hint: '输入 \'在家\''
    },
    {
      title: '天气感知系统',
      template: "while True:\n    r = getRain()\n    if r > _:\n        # 下雨操作\n    else:\n        # 没雨操作",
      hint: '输入 300'
    },
    {
      title: '留言系统',
      template: "if mode == '不在家':\n    if isTouched():\n        playSound('ring')\n    if isPressed('A'):\n        _\n    if isPressed('B'):\n        playRecord()",
      hint: '输入 record()'
    },
    {
      title: '综合控制',
      template: "while True:\n    if mode == '在家':\n        # 在家功能\n    _ mode == '不在家':\n        # 不在家功能",
      hint: '输入 elif 或 if'
    }
  ]
}

// 导出所有数据
export const L5_4_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L5_4_data
