/**
 * PY1 课程 L4-4: 智能感应灯与氛围灯
 *
 * 核心知识点:
 * 1. initLight() - 初始化灯板
 * 2. lightOn() / lightOff() - 开关灯
 * 3. getLight() - 获取光线强度
 * 4. getVolume() - 获取音量
 * 5. playMusic() - 播放音乐
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'light',
    pronunciation: '[laɪt]',
    partOfSpeech: 'n.',
    meaning: '光；灯',
    level: 'easy',
    example: 'Turn on the light.',
    exampleTranslation: '开灯。',
    source: 'ocr'
  },
  {
    word: 'on',
    pronunciation: '[ɒn]',
    partOfSpeech: 'adv.',
    meaning: '开启；打开',
    level: 'easy',
    example: 'Switch on the device.',
    exampleTranslation: '开启设备。',
    source: 'ocr'
  },
  {
    word: 'off',
    pronunciation: '[ɒf]',
    partOfSpeech: 'adv.',
    meaning: '关闭',
    level: 'easy',
    example: 'Turn off the TV.',
    exampleTranslation: '关掉电视。',
    source: 'ocr'
  },
  {
    word: 'sleep',
    pronunciation: '[sliːp]',
    partOfSpeech: 'v.',
    meaning: '睡觉',
    level: 'medium',
    example: 'Go to sleep.',
    exampleTranslation: '去睡觉。',
    source: 'ocr'
  },
  {
    word: 'clear',
    pronunciation: '[klɪə]',
    partOfSpeech: 'v.',
    meaning: '清除',
    level: 'medium',
    example: 'Clear the cache.',
    exampleTranslation: '清除缓存。',
    source: 'ocr'
  },
  {
    word: 'music',
    pronunciation: '[ˈmjuːzɪk]',
    partOfSpeech: 'n.',
    meaning: '音乐',
    level: 'easy',
    example: 'Play some music.',
    exampleTranslation: '播放一些音乐。',
    source: 'ocr'
  },
  {
    word: 'volume',
    pronunciation: '[ˈvɒljuːm]',
    partOfSpeech: 'n.',
    meaning: '音量',
    level: 'medium',
    example: 'Turn up the volume.',
    exampleTranslation: '调高音量。',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'sensor',
    pronunciation: '[ˈsensə]',
    partOfSpeech: 'n.',
    meaning: '传感器',
    level: 'hard',
    example: 'Light sensor detects brightness.',
    exampleTranslation: '光传感器检测亮度。',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '点亮灯板',
    emoji: '💡',
    gradeLevel: '3-4',
    summary: '初始化并控制灯板',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '灯板就像一排小灯泡，我们可以用 initLight() 告诉电脑灯板有几个灯泡，然后用 lightOn() 开灯，lightOff() 关灯。',
      concept: 'initLight(n) 初始化 n 个灯珠的灯板；lightOn() 开灯；lightOff() 关灯。',
      syntax: `initLight(灯珠数量)
lightOn()     # 开所有灯
lightOff()   # 关所有灯`,
      example: {
        title: '基础开关联',
        code: `initLight(10)  # 初始化10个灯珠
lightOn()     # 开灯
time.sleep(3) # 等待3秒
lightOff()    # 关灯`,
        output: '',
        explanation: '初始化 10 个灯珠，开灯，等待 3 秒，关灯。'
      },
      practice: [
        {
          question: 'initLight(10) 表示什么？',
          answer: '初始化10个灯珠'
        },
        {
          question: 'lightOn() 和 lightOff() 有什么区别？',
          answer: '开灯和关灯'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '灯板可以控制指定的灯珠亮起不同的颜色。用 lightOn("颜色", 开始, 结束) 可以让指定范围的灯珠亮起。',
      concept: 'lightOn(颜色, 开始灯号, 结束灯号) 控制指定灯珠亮起；lightOff(开始, 结束) 控制指定灯珠熄灭。',
      syntax: `lightOn('蓝', 1, 5)  # 1-5号灯珠亮蓝色
lightOff(2, 5)   # 2-5号灯珠熄灭`,
      example: {
        title: '控制指定灯珠',
        code: `initLight(10)
lightOn('蓝', 1, 5)   # 1-5号灯珠亮蓝色
time.sleep(2)
lightOff(2, 5)      # 2-5号灯珠熄灭`,
        output: '',
        explanation: '先让 1-5 号灯珠亮蓝色，然后熄灭 2-5 号灯珠。'
      },
      practice: [
        {
          question: 'lightOn("红", 3, 7) 会让哪些灯珠亮起来？',
          answer: '3到7号灯珠'
        },
        {
          question: '如何让所有灯珠熄灭？',
          answer: 'lightOff() 无参数'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '灯板可以显示各种颜色，不同数字代表不同颜色，理解颜色代码可以实现彩色显示。',
      concept: '灯板支持多种颜色，通过字符串指定颜色名称来设置灯珠颜色。',
      syntax: `颜色：'红' '绿' '蓝' '黄' '白'`,
      example: {
        title: '多彩显示',
        code: `initLight(10)
lightOn('红', 1, 3)    # 1-3号红色
lightOn('绿', 4, 6)    # 4-6号绿色
lightOn('蓝', 7, 10)   # 7-10号蓝色`,
        output: '',
        explanation: '不同范围的灯珠可以设置不同颜色，实现彩色显示效果。'
      },
      practice: [
        {
          question: '如何让 1-5 号灯珠显示红色？',
          answer: "lightOn('红', 1, 5)"
        },
        {
          question: '一个灯板可以同时显示不同颜色吗？',
          answer: '可以，不同灯珠可以设置不同颜色'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '智能节能灯',
    emoji: '🔆',
    gradeLevel: '3-4',
    summary: '根据光线自动开关灯',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '智能灯可以检测环境光线：光线暗的时候自动开灯，光线亮的时候自动关灯。这样就不需要手动开关了！',
      concept: 'getLight() 获取环境光线强度，根据数值判断是亮还是暗。',
      syntax: `getLight() → 光线强度数字
光线 < 150 → 环境暗
光线 >= 150 → 环境亮`,
      example: {
        title: '自动开关灯',
        code: `while True:
    light = getLight()
    if light < 150:
        lightOn()
    else:
        lightOff()`,
        output: '',
        explanation: '不断检测光线，暗时开灯，亮时关灯。'
      },
      practice: [
        {
          question: 'getLight() 返回什么类型的值？',
          answer: '数字（光线强度）'
        },
        {
          question: '光线暗的时候 getLight() 返回值是大还是小？',
          answer: '小（暗的环境数值小）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '光线传感器的数值可以用来做更精确的判断，比如设置不同的阈值。',
      concept: '可以根据不同的光线阈值做不同的处理，实现更智能的控制。',
      syntax: `光线强度：0-1023 左右
< 150 非常暗
150-300 较暗
300-700 适中
> 700 明亮`,
      example: {
        title: '多级判断',
        code: `while True:
    light = getLight()
    if light < 150:
        print('很暗，开灯')
        lightOn()
    elif light < 300:
        print('较暗，半开')
        lightOn('黄', 1, 5)  # 半亮
    else:
        print('足够亮，关灯')
        lightOff()`,
        output: '',
        explanation: '根据光线强度分为三级：很暗全亮、较暗半亮、够亮关灯。'
      },
      practice: [
        {
          question: '光线强度数值越大意味着什么？',
          answer: '环境越亮'
        },
        {
          question: '如何根据光线调节灯光亮度？',
          answer: '用不同的阈值设置不同的灯珠亮起数量'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '结合传感器和控制逻辑，可以实现各种智能家居场景。',
      concept: '智能家居的核心是感知-决策-执行：用传感器获取环境信息，根据条件判断，决定如何执行动作。',
      syntax: `感知 → getLight() 获取光线
决策 → if light < 阈值
执行 → lightOn() / lightOff()`,
      example: {
        title: '智能家居逻辑',
        code: `# 智能路灯
while True:
    light = getLight()
    if light < 100:  # 很暗
        lightOn('黄', 1, 10)  # 全亮
    elif light < 200:  # 较暗
        lightOn('黄', 1, 5)   # 半亮
    else:  # 足够亮
        lightOff()  # 关灯`,
        output: '',
        explanation: '根据环境亮度自动调节路灯亮度，实现节能效果。'
      },
      practice: [
        {
          question: '智能家居的核心是什么？',
          answer: '感知-决策-执行'
        },
        {
          question: '为什么要设置不同的亮度级别？',
          answer: '更精确地根据环境调节，达到节能和舒适的效果'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '声控氛围灯',
    emoji: '🔊',
    gradeLevel: '3-4',
    summary: '根据音量控制灯光',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '氛围灯可以根据音量大小来控制灯亮起来的数量：声音越大，灯亮得越多；声音越小，灯亮得越少。',
      concept: 'getVolume() 获取环境音量（1-10），音量越大数字越大。',
      syntax: `getVolume() → 音量数字（1-10）
1-3 小声
4-6 中等
7-10 大声`,
      example: {
        title: '音量控制灯',
        code: `while True:
    v = getVolume()
    lightOn('蓝', 1, v)
    lightOff(v+1, 10)`,
        output: '',
        explanation: '获取音量，用音量值控制亮灯范围。v=5 时 1-5 号亮，6-10 号灭。'
      },
      practice: [
        {
          question: 'getVolume() 返回的值范围是多少？',
          answer: '1到10'
        },
        {
          question: '如何让声音越大灯越亮？',
          answer: '用音量值控制亮灯的灯珠数量'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '可以结合多种效果，比如根据音量控制灯光，同时播放音乐。',
      concept: '氛围灯结合音乐播放，可以创造更好的氛围效果。',
      syntax: `# 声控灯 + 音乐
while True:
    v = getVolume()
    lightOn('蓝', 1, v)
    lightOff(v+1, 10)
    if isPressed('A'):
        playMusic()`,
      example: {
        title: '完整氛围灯',
        code: `while True:
    v = getVolume()
    lightOn('蓝', 1, v)
    lightOff(v+1, 10)
    time.sleep(0.1)
    clear()
    if isPressed('A'):
        playMusic()
    if isPressed('B'):
        break`,
        output: '',
        explanation: '循环检测音量并更新灯光，按 A 播放音乐，按 B 退出。'
      },
      practice: [
        {
          question: 'clear() 函数的作用是什么？',
          answer: '清除显示内容'
        },
        {
          question: '如何让音量大小实时影响灯光？',
          answer: '在循环中不断获取音量并更新灯光'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '理解传感器和控制逻辑后，可以组合实现更复杂的智能场景。',
      concept: '多种传感器和控制方式可以组合使用，实现丰富的智能场景。',
      syntax: `灯光效果控制：
- 音量控制灯数量
- 光线控制亮度
- 播放音乐控制气氛`,
      example: {
        title: '综合智能场景',
        code: `# 根据光线和音量综合控制
while True:
    light = getLight()
    v = getVolume()
    if light < 150:  # 光线暗时
        lightOn('蓝', 1, v)
        if v > 7:
            playMusic()
    else:
        lightOff()
    time.sleep(0.1)`,
        output: '',
        explanation: '光线暗时启用氛围灯，音量很大时播放音乐。综合多种条件实现智能场景。'
      },
      practice: [
        {
          question: '如何让灯光在安静时变暗、吵闹时变亮？',
          answer: '用 getVolume() 获取音量，用音量控制亮灯数量'
        },
        {
          question: '为什么需要 time.sleep()？',
          answer: '避免检测过快，让程序有时间响应'
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
    mathConcept: '灯板控制',
    question: '下列哪段代码可以点亮 2 到 5 号灯珠？',
    options: [
      "lightOn('蓝', 5, 2)",
      "lightOn('蓝', 2, 5)",
      'lightOff(2, 5)',
      'lightOff(5, 2)'
    ],
    answer: 1,
    explanation: "lightOn() 的参数格式是 lightOn('颜色', 开始, 结束)，所以是 lightOn('蓝', 2, 5)。答案是 B。",
    hint: '参数顺序是颜色、开始、结束'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '传感器理解',
    question: '如果要检测光线强度，应该使用哪个命令？',
    options: [
      'getLight()',
      'getVolume()',
      'getIRKey()',
      'lightOn()'
    ],
    answer: 0,
    explanation: 'getLight() 用于获取光线强度，getVolume() 获取音量，getIRKey() 获取遥控按键。答案是 A。',
    hint: 'getLight 是光相关的'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '逻辑理解',
    question: '如果需要制作音量大于5时才会亮起的声控灯，应该用什么命令获取音量？',
    options: [
      'getVolume()',
      'getLight()',
      'getIRKey()',
      'input()'
    ],
    answer: 0,
    explanation: 'getVolume() 用于获取环境音量。答案是 A。',
    hint: 'volume 是音量'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '条件判断',
    question: `以下代码，如果光线小于300开灯，光线大于400关灯，横线处应该填什么？\n\n\`\`\`python\nwhile True:\n    light = ___\n    if light < 300:\n        lightOn()\n    if light > 400:\n        lightOff()\n\`\`\``,
    options: [
      'getLight()',
      'getIRKey()',
      'getVolume()',
      'lightOn()'
    ],
    answer: 0,
    explanation: '需要用 getLight() 获取光线强度。答案是 A。',
    hint: '获取光线的命令是什么？'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合应用',
    question: `以下代码的运行结果是什么？\n\n\`\`\`python\nv = 5\nlightOn('蓝', 1, v)\nlightOff(v+1, 10)\n\`\`\``,
    options: [
      '1-5号灯珠亮蓝色，6-10号熄灭',
      '1-6号灯珠亮蓝色，7-10号熄灭',
      '1-5号灯珠亮蓝色，5-10号熄灭',
      '所有灯珠亮蓝色'
    ],
    answer: 0,
    explanation: 'v=5，lightOn("蓝", 1, 5) 让 1-5 号亮蓝色，lightOff(6, 10) 让 6-10 号熄灭。答案是 A。',
    hint: 'lightOff的参数是开始和结束'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '智能场景',
    question: '智能节能灯的核心逻辑是什么？',
    options: [
      '一直亮灯',
      '根据光线强度自动开关灯',
      '根据时间开关灯',
      '手动控制开关'
    ],
    answer: 1,
    explanation: '智能节能灯通过检测光线强度，当光线暗时自动开灯，光线亮时自动关灯。答案是 B。',
    hint: '智能是根据环境自动反应'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L4-4',
  title: '智能感应灯',
  subtitle: '用传感器控制灯光',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握 initLight() 初始化灯板',
    '掌握 lightOn() 和 lightOff() 控制灯光',
    '理解 getLight() 获取光线强度',
    '理解 getVolume() 获取音量',
    '能实现智能感应灯和氛围灯'
  ],
  prerequisites: [
    '理解 while 循环',
    '理解 if 语句',
    '理解 break 语句'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['light', 'on', 'off', 'music'],
  medium: ['volume', 'sleep', 'clear', 'sensor'],
  hard: ['initLight', 'lightOn', 'lightOff', 'getLight', 'getVolume']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'initLight(10)',
    'lightOn()',
    'lightOff()',
    "lightOn('蓝', 1, 5)"
  ],
  medium: [
    'light = getLight()',
    'v = getVolume()',
    'if light < 150:\n    lightOn()',
    "lightOn('红', 1, 3)\nlightOff(4, 10)"
  ],
  hard: [
    'while True:\n    light = getLight()\n    if light < 150:\n        lightOn()\n    else:\n        lightOff()',
    'while True:\n    v = getVolume()\n    lightOn("蓝", 1, v)\n    lightOff(v+1, 10)',
    'while True:\n    if isPressed("A"):\n        playMusic()\n    if isPressed("B"):\n        break',
    'while True:\n    light = getLight()\n    v = getVolume()\n    if light < 150:\n        lightOn("蓝", 1, v)'
  ]
}

// 导出所有数据
export const L4_4_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L4_4_data