/**
 * PY1 课程 L5-2: 智能感应灯与氛围灯
 *
 * 核心知识点:
 * 1. 灯板控制 - initLight(), lightOn(), lightOff()
 * 2. 光线感应 - getLight() 检测环境光线
 * 3. 音量感应 - getVolume() 检测环境音量
 * 4. 音乐播放 - playMusic() 播放音乐
 */

// 单词卡数据 - OCR 提取 + 拓展
export const vocabData = [
  // OCR 提取的单词（必须包含）
  {
    word: 'light',
    pronunciation: '[laɪt]',
    partOfSpeech: 'n.',
    meaning: '灯；光',
    level: 'easy',
    example: 'Turn on the light, please.',
    exampleTranslation: '请把灯打开。',
    note: '最常用的生活词汇之一'
  },
  {
    word: 'music',
    pronunciation: '[ˈmjuːzɪk]',
    partOfSpeech: 'n.',
    meaning: '音乐',
    level: 'easy',
    example: 'I like listening to music.',
    exampleTranslation: '我喜欢听音乐。',
    note: '孩子们都喜欢的词汇'
  },
  {
    word: 'volume',
    pronunciation: '[ˈvɒljuːm]',
    partOfSpeech: 'n.',
    meaning: '音量',
    level: 'easy',
    example: 'Please turn down the volume.',
    exampleTranslation: '请把音量调小一点。',
    note: '控制声音大小的词汇'
  },
  // 拓展单词 - 与智能灯相关的常用词
  {
    word: 'lamp',
    pronunciation: '[læmp]',
    partOfSpeech: 'n.',
    meaning: '台灯；灯',
    level: 'easy',
    example: 'This lamp is very cute.',
    exampleTranslation: '这盏台灯很可爱。',
    note: '比 light 更具体，指灯具'
  },
  {
    word: 'bright',
    pronunciation: '[braɪt]',
    partOfSpeech: 'adj.',
    meaning: '明亮的',
    level: 'easy',
    example: 'The sun is very bright.',
    exampleTranslation: '太阳非常明亮。',
    note: '描述光线的常用形容词'
  },
  {
    word: 'dark',
    pronunciation: '[dɑːk]',
    partOfSpeech: 'adj.',
    meaning: '黑暗的',
    level: 'easy',
    example: 'It is too dark in the room.',
    exampleTranslation: '房间里太暗了。',
    note: '与 bright 相对的常用词'
  }
]

// 知识点数据 - 基于 OCR 提取
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '点亮灯板 - 灯光基础控制',
    emoji: '💡',
    gradeLevel: '3-4',
    summary: '学习如何初始化灯板并控制灯光的开关',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一排彩色的小灯，你可以让它们亮起来或熄灭！就像控制家里的台灯一样简单！',
      concept: '使用 initLight() 初始化灯板，告诉智慧核心我们接入了灯板。使用 lightOn() 点亮灯板，lightOff() 熄灭灯板。',
      syntax: "initLight(灯珠数量)\nlightOn()     # 点亮灯板\nlightOff()    # 熄灭灯板",
      example: {
        title: '点亮和熄灭灯板',
        code: "initLight(10)\nlightOn()\ntime.sleep(3)\nlightOff()",
        output: '灯板亮起 3 秒后熄灭',
        explanation: '首先初始化 10 个灯珠，然后点亮灯板，等待 3 秒后熄灭。'
      },
      practice: [
        {
          question: '哪个命令用于点亮灯板？',
          answer: 'lightOn()'
        },
        {
          question: 'initLight(10) 中的 10 表示什么？',
          answer: '灯珠数量'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '灯光设计师上线！你可以控制灯光的颜色和亮起的范围，创造炫酷的灯光效果！',
      concept: 'lightOn() 可以设置灯光颜色和亮起范围。参数依次是颜色字符串、起始索引、结束索引。',
      syntax: "lightOn(颜色, 起始索引, 结束索引)\nlightOff(起始索引, 结束索引)",
      example: {
        title: '控制指定范围灯珠',
        code: "initLight(10)\nlightOn('蓝', 1, 5)\nlightOff(2, 5)",
        output: '点亮 1-5 号灯珠为蓝色，然后熄灭 2-5 号',
        explanation: 'lightOn(\'蓝\', 1, 5) 点亮 1 到 5 号灯珠为蓝色，lightOff(2, 5) 熄灭 2 到 5 号灯珠，只剩 1 号灯亮。'
      },
      practice: [
        {
          question: '如何点亮 3 号到 8 号灯珠？',
          answer: "lightOn('颜色', 3, 8)"
        },
        {
          question: '如何熄灭所有灯珠？',
          answer: 'lightOff() 或 lightOff(1, 10)'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '灯光编程大师！掌握完整的灯光控制技能，可以创建复杂的灯光效果和模式！',
      concept: '结合循环和条件判断，可以实现呼吸灯、流水灯、彩虹灯等多种效果。',
      syntax: "while True:\n    lightOn(颜色, start, end)\n    time.sleep(延迟)\n    lightOff(start, end)",
      example: {
        title: '呼吸灯效果',
        code: "initLight(10)\nwhile True:\n    lightOn('蓝', 1, 10)\n    time.sleep(1)\n    lightOff(1, 10)\n    time.sleep(1)",
        output: '灯板交替亮灭，形成呼吸效果',
        explanation: '使用 while True 无限循环，交替点亮和熄灭灯板，创造呼吸灯效果。'
      },
      practice: [
        {
          question: '如何让灯光从左到右逐个亮起？',
          answer: '使用 for 循环，每次点亮一个灯珠'
        },
        {
          question: '如何创造彩虹灯效果？',
          answer: '循环切换不同颜色：红、橙、黄、绿、蓝、紫'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '光线感应 - 智能节能灯',
    emoji: '🌞',
    gradeLevel: '3-4',
    summary: '使用光线传感器检测环境光线并自动控制灯光',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象有一个聪明的灯，它知道什么时候天黑了，什么时候天亮了。天黑时它会自动开灯，天亮时自动关灯！',
      concept: 'getLight() 可以检测周围的光线强度，返回一个数字。光线越暗，数字越小；光线越亮，数字越大。',
      syntax: "getLight()  # 获取光线强度数值",
      example: {
        title: '检测光线',
        code: "while True:\n    light = getLight()\n    print(light)\n    time.sleep(0.5)",
        output: '持续打印光线强度数值',
        explanation: '不断检测并打印光线强度，可以观察到光线变化时的数值变化。'
      },
      practice: [
        {
          question: '哪个命令用于获取光线强度？',
          answer: 'getLight()'
        },
        {
          question: '光线数值小于 150 表示环境怎么样？',
          answer: '比较暗'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '智能节能灯设计师！根据光线自动开关灯，既省电又方便！',
      concept: '通常光线数值小于 150 表示环境暗，大于等于 150 表示环境亮。可以使用 if-else 语句控制灯光。',
      syntax: "light = getLight()\nif light < 150:\n    lightOn()\nelse:\n    lightOff()",
      example: {
        title: '自动开关灯',
        code: "while True:\n    light = getLight()\n    if light < 150:\n        lightOn()\n    else:\n        lightOff()",
        output: '暗时开灯，亮时关灯',
        explanation: '持续检测光线，光线暗（<150）时开灯，光线亮（>=150）时关灯。'
      },
      practice: [
        {
          question: '如何设置光线阈值改为 300？',
          answer: 'if light < 300'
        },
        {
          question: '如果光线小于 300 开灯，大于 400 关灯，应该怎么写？',
          answer: 'if light < 300: lightOn()  \\n  if light > 400: lightOff()'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '智能照明系统工程师！设计一个完整的自动照明系统，根据不同光线级别调整灯光效果！',
      concept: '可以设置多个光线阈值，根据光线强度实现不同的灯光效果（如全亮、半亮、氛围灯等）。',
      syntax: "if light < 100:\n    lightOn('白', 1, 10)\nelif light < 300:\n    lightOn('黄', 1, 5)\nelse:\n    lightOff()",
      example: {
        title: '多级亮度控制',
        code: "while True:\n    light = getLight()\n    if light < 100:\n        lightOn('白', 1, 10)\n    elif light < 300:\n        lightOn('黄', 1, 5)\n    else:\n        lightOff()",
        output: '根据光线强度调整灯板状态',
        explanation: '很暗时全部点亮，稍暗时点亮一半，明亮时全部熄灭。'
      },
      practice: [
        {
          question: '如何实现渐亮效果？',
          answer: '逐渐增加点亮的灯珠数量'
        },
        {
          question: '如何记录光线变化历史？',
          answer: '使用列表存储每次检测的光线数值'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '音量感应 - 声控氛围灯',
    emoji: '🔊',
    gradeLevel: '3-4',
    summary: '使用音量传感器检测环境音量并控制灯光效果',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象一盏会听声音的灯！声音大时它亮很多灯，声音小时它亮很少的灯，就像在跟着音乐跳舞！',
      concept: 'getVolume() 可以检测周围环境的音量，返回 1 到 10 的数字，数字越大表示音量越大。',
      syntax: "getVolume()  # 获取音量数值 (1-10)",
      example: {
        title: '检测音量',
        code: "while True:\n    v = getVolume()\n    print(v)\n    time.sleep(0.5)",
        output: '持续打印音量数值 (1-10)',
        explanation: '不断检测并打印音量大小，可以对着麦克风说话观察数值变化。'
      },
      practice: [
        {
          question: '音量数值的范围是多少？',
          answer: '1 到 10'
        },
        {
          question: 'getVolume() 返回的数字越大表示什么？',
          answer: '音量越大'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '声控氛围灯工程师！让灯板随着音量大小变化，创造炫酷的音乐灯光效果！',
      concept: '根据音量数值控制点亮的灯珠数量，音量越大，点亮的灯珠越多。',
      syntax: "v = getVolume()\nlightOn('颜色', 1, v)",
      example: {
        title: '声控灯',
        code: "initLight(10)\nwhile True:\n    v = getVolume()\n    lightOn('蓝', 1, v)\n    lightOff(v+1, 10)",
        output: '灯珠数量随音量变化',
        explanation: '根据音量 v 点亮 1 到 v 号灯珠，并熄灭其余灯珠，实现声控效果。'
      },
      practice: [
        {
          question: '如何实现音量大于 5 时才亮灯？',
          answer: 'if v > 5: lightOn(...)'
        },
        {
          question: '为什么需要 lightOff(v+1, 10)？',
          answer: '熄灭之前点亮的多余灯珠'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '音乐灯光秀设计师！结合音量感应和音乐播放，打造完整的视听体验！',
      concept: '结合 getVolume()、lightOn() 和 playMusic()，可以实现音乐播放时灯光随节奏跳动的效果。',
      syntax: "while True:\n    v = getVolume()\n    lightOn('颜色', 1, v)\n    lightOff(v+1, max)\n    if isPressed('A'):\n        playMusic()",
      example: {
        title: '音乐氛围灯',
        code: "initLight(10)\nwhile True:\n    v = getVolume()\n    lightOn('蓝', 1, v)\n    lightOff(v+1, 10)\n    if isPressed('A'):\n        playMusic()",
        output: '灯光随音量跳动，按A键播放音乐',
        explanation: '持续检测音量并控制灯珠数量，按下 A 键时播放音乐，创造完整氛围灯效果。'
      },
      practice: [
        {
          question: '如何让灯光颜色随音量变化？',
          answer: '根据 v 的大小选择不同颜色'
        },
        {
          question: '如何实现灯光延迟效果，让灯光有"拖尾"？',
          answer: '使用 time.sleep() 和列表存储历史音量值'
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
    question: '下列哪个命令用于点亮灯板？（ ）',
    options: ['initLight()', 'lightOn()', 'lightOff()', 'getLight()'],
    answer: 1,
    explanation: 'lightOn() 用于点亮灯板，initLight() 用于初始化，lightOff() 用于熄灭，getLight() 用于获取光线强度。',
    hint: '注意看命令名称中的英文单词'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '数值范围',
    question: 'getVolume() 命令返回的数值范围是？（ ）',
    options: ['0-9', '1-10', '1-100', '0-100'],
    answer: 1,
    explanation: 'getVolume() 检测周围环境音量，返回 1 到 10 的数字，数字越大表示音量越大。',
    hint: '就像给音量打分，最低1分，最高10分'
  },

  // 🟡 进阶题（2道）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '循环与索引',
    question: '下列代码输出结果是（   ）？\n\n```python\ns = \'name\'\nnew_s = \'\'\nfor i in range(4):\n    new_s = new_s + s[1]\nprint(new_s)\n```',
    options: ['nnnn', 'aaaa', 'name', 'nana'],
    answer: 1,
    explanation: 'for i in range(4) 表明循环会执行 4 次。每次循环执行 new_s = new_s + s[1]。s[1] 表示字符串 s 的第 2 个字符，即 \'a\'。最终结果是 \'aaaa\'。',
    hint: 's[1] 获取的是哪个字符？'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '条件判断',
    question: '如果要实现光线强度小于 300 开灯，光线强度大于 400 关灯的效果，横线处应该补充哪段代码呢？（   ）\n\n```python\nwhile True:\n    ________\n    if light < 300:\n        lightOn()\n    if light > 400:\n        lightOff()\n```',
    options: ['light = getLight()', 'light = getVolume()', 'light = getIRKey()', 'light = lightOn()'],
    answer: 0,
    explanation: 'getLight() 语句用于获取光线强度。getIRKey() 获取红外遥控器信息，getVolume() 获取音量，lightOn() 点亮灯板。要检测光线强度需要使用 getLight()。',
    hint: '哪个命令用于获取光线强度？'
  },

  // 🔴 挑战题（2道）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '条件判断',
    question: '星河想制作一个音量大于 5 时才会亮起的声控灯，但是代码少写了一部分，应该帮他补充哪个语句呢？（   ）\n\n```python\nwhile True:\n    v = ________\n    if v > 5:\n        lightOn()\n        time.sleep(5)\n        lightOff()\n```',
    options: ['getVolume()', 'getLight()', 'getIRKey()', 'input()'],
    answer: 0,
    explanation: '题目要求音量大于 5 时灯亮起，获取环境音量的语句是 getVolume()。getLight() 用于获取光线强度，getIRKey() 用于获取红外遥控信息，input() 用于获取输入。',
    hint: '哪个命令用于获取音量大小？'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '范围计数',
    question: '执行下方代码，最终 info 变量的值是？（   ）\n\n```python\ninfo = \'\'\nfor i in range(3):\n    info = info + \'灯\'\nprint(len(info))\n```',
    options: ['0', '1', '2', '3'],
    answer: 3,
    explanation: '循环执行 3 次，每次循环给 info 添加一个 \'灯\' 字。第一次 info=\'灯\'，第二次 info=\'灯灯\'，第三次 info=\'灯灯灯\'。所以 len(info) = 3。',
    hint: '循环执行了几次？每次添加什么？'
  }
]

export const lessonMeta = {
  id: 'L5-2',
  title: '智能感应灯与氛围灯',
  subtitle: '学会光线传感器、音量传感器和灯光控制',
  difficulty: '进阶',
  estimatedTime: '40-50分钟',
  learningGoals: [
    '掌握灯板的初始化和基本控制方法',
    '学会使用光线传感器检测环境光线',
    '学会使用音量传感器检测环境音量',
    '理解智能感应灯和声控氛围灯的原理'
  ],
  prerequisites: [
    'Python 基础语法',
    '变量和条件判断',
    'L5-1 字符串基础'
  ]
}

// 打字练习单词
export const typingWords = {
  easy: ['light', 'lamp', 'on', 'off', 'music', 'dark'],
  medium: ['volume', 'sensor', 'bright', 'detect'],
  hard: ['intelligent', 'automatic', 'atmosphere', 'threshold']
}

// 代码模板
export const typingTemplates = {
  easy: [
    {
      title: '初始化灯板',
      template: "initLight(_)",
      hint: '输入灯珠数量，如 10'
    },
    {
      title: '点亮灯板',
      template: "_()",
      hint: '输入 lightOn'
    },
    {
      title: '熄灭灯板',
      template: "_()",
      hint: '输入 lightOff'
    },
    {
      title: '检测光线',
      template: "light = _()",
      hint: '输入 getLight'
    }
  ],
  medium: [
    {
      title: '自动开关灯',
      template: "while True:\n    light = getLight()\n    if light < 150:\n        _\n    else:\n        lightOff()",
      hint: '输入 lightOn()'
    },
    {
      title: '控制指定灯珠',
      template: "lightOn('蓝', _, 5)",
      hint: '输入起始索引 1'
    },
    {
      title: '声控灯',
      template: "v = _()\nlightOn('蓝', 1, v)",
      hint: '输入 getVolume'
    },
    {
      title: '熄灭范围',
      template: "lightOff(2, _)",
      hint: '输入结束索引 10'
    }
  ],
  hard: [
    {
      title: '多级控制',
      template: "if light < 100:\n    lightOn('白', 1, 10)\nelif light < 300:\n    _\nelse:\n    lightOff()",
      hint: '输入 lightOn(\'黄\', 1, 5)'
    },
    {
      title: '音乐氛围灯',
      template: "while True:\n    v = getVolume()\n    lightOn('蓝', 1, v)\n    _",
      hint: '输入 lightOff(v+1, 10)'
    },
    {
      title: '智能模式',
      template: "while True:\n    light = getLight()\n    v = _()\n    # 综合光线和音量控制",
      hint: '输入 getVolume'
    },
    {
      title: '按需播放',
      template: "if isPressed('A'):\n    _",
      hint: '输入 playMusic()'
    }
  ]
}

// 导出所有数据
export const L5_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L5_2_data
