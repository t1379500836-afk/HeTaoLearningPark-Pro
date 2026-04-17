/**
 * PY3 课程 L17-1: 声音魔法师
 *
 * 核心知识点:
 * 1. 获取环境音量
 * 2. 音量范围与应用
 * 3. 声音控制游戏
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  {
    word: 'volume',
    pronunciation: "['va:lju:m]",
    partOfSpeech: 'n./v.',
    meaning: '音量；响度；体积',
    level: 'easy',
    example: 'Turn up the volume.',
    exampleTranslation: '调高音量。',
    note: 'getVolume()获取音量',
    source: 'ocr'
  },
  {
    word: 'block',
    pronunciation: '[blok]',
    partOfSpeech: 'n./v.',
    meaning: '块；街区；阻塞',
    level: 'easy',
    example: 'Move the block.',
    exampleTranslation: '移动方块。',
    note: '',
    source: 'ocr'
  },
  {
    word: 'hide',
    pronunciation: '[haid]',
    partOfSpeech: 'v./n.',
    meaning: '躲藏；隐藏',
    level: 'medium',
    example: 'Hide the object.',
    exampleTranslation: '隐藏物体。',
    note: '',
    source: 'ocr'
  },
  {
    word: 'sound',
    pronunciation: '[saund]',
    partOfSpeech: 'n./v.',
    meaning: '声音；听起来',
    level: 'medium',
    example: 'Make a sound.',
    exampleTranslation: '发出声音。',
    note: '',
    source: 'extended'
  },
  {
    word: 'microphone',
    pronunciation: "['maikrafoun]",
    partOfSpeech: 'n.',
    meaning: '麦克风；话筒',
    level: 'hard',
    example: 'Speak into the microphone.',
    exampleTranslation: '对着麦克风说话。',
    note: '',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '获取环境音量',
    emoji: '🎤',
    gradeLevel: '3-4',
    summary: '用getVolume()获取周围声音大小',

    easy: {
      story: '想用声音控制游戏吗？getVolume()就像一个小耳朵，能听到你说话声音有多大！',
      concept: 'getVolume()函数获取当前环境的音量大小。大声说话音量高，小声说话音量低。音量范围是0-100。',
      syntax: "# 获取音量\nvolume = getVolume()\nprint(f'当前音量: {volume}')\n\n# 音量范围: 0-100\n# 0 = 非常安静\n# 50 = 正常说话\n# 100 = 非常大声",
      example: {
        title: '获取音量',
        code: "def update():\n    volume = getVolume()\n    print(f'音量: {volume}')",
        output: '实时显示当前音量值',
        explanation: 'getVolume()返回0-100的音量值。'
      },
      practice: [
        {
          question: 'getVolume()返回什么范围？',
          answer: '0-100'
        },
        {
          question: '音量0表示什么？',
          answer: '非常安静'
        }
      ]
    },

    medium: {
      story: '音量可以触发游戏事件！大声喊叫让角色跳跃，小声说话让角色潜行！',
      concept: '用音量值判断触发不同事件。音量大时执行动作A，音量小时执行动作B。',
      syntax: "# 音量触发事件\nvolume = getVolume()\n\nif volume > 70:\n    print('太吵了！')\nelif volume > 30:\n    print('正常')\nelse:\n    print('很安静')",
      example: {
        title: '音量控制',
        code: "def update():\n    volume = getVolume()\n    \n    if volume > 80:\n        player.jump()  # 大声时跳跃\n    elif volume < 20:\n        player.hide()  # 安静时隐藏",
        output: '大声跳跃，小声隐藏',
        explanation: '根据音量执行不同动作。'
      },
      practice: [
        {
          question: '如何判断音量很大？',
          answer: 'if getVolume() > 70'
        },
        {
          question: '音量30算大还是小？',
          answer: '中等（0-100范围内偏小）'
        }
      ]
    },

    hard: {
      story: '音量控制游戏难度！声音越大，游戏越难！挑战你的嗓门和游戏技术！',
      concept: '音量可以作为游戏参数：控制速度、难度、力量等。音量越大效果越强。',
      syntax: "# 音量控制参数\nvolume = getVolume()\n\n# 音量影响速度\nspeed = volume / 10  # 0-10\n\n# 音量影响大小\nsize = volume * 2  # 0-200\n\n# 音量影响力量\npower = volume / 100  # 0-1",
      example: {
        title: '音量控制游戏',
        code: "def update():\n    volume = getVolume()\n    \n    # 音量控制跳跃高度\n    jump_height = volume / 10\n    \n    # 音量控制速度\n    speed = volume / 20 + 1\n    \n    player.move(speed)",
        output: '声音越大跳跃越高、移动越快',
        explanation: '音量可以控制多种游戏参数。'
      },
      practice: [
        {
          question: '如何用音量控制速度？',
          answer: 'speed = getVolume() / 10'
        },
        {
          question: '音量控制游戏的好处是什么？',
          answer: '增加互动性和趣味性'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '音量范围与应用',
    emoji: '📊',
    gradeLevel: '3-4',
    summary: '理解音量0-100的范围并灵活应用',

    easy: {
      story: '音量范围是0到100！0是最安静，100是最吵。就像从完全静音到最大音量！',
      concept: '音量范围0-100是固定的。0-30安静，30-70正常，70-100吵闹。',
      syntax: "# 音量等级\n# 0-30: 安静\n# 30-70: 正常\n# 70-100: 吵闹\n\nvolume = getVolume()\n\nif volume < 30:\n    level = '安静'\nelif volume < 70:\n    level = '正常'\nelse:\n    level = '吵闹'",
      example: {
        title: '音量等级',
        code: "def update():\n    v = getVolume()\n    \n    if v < 30:\n        print('安静')\n    elif v < 70:\n        print('正常')\n    else:\n        print('吵闹')",
        output: '根据音量显示等级',
        explanation: '将音量分成不同等级。'
      },
      practice: [
        {
          question: '音量50属于什么范围？',
          answer: '正常（30-70）'
        },
        {
          question: '音量范围是怎么划分的？',
          answer: '0-100，0最安静，100最吵'
        }
      ]
    },

    medium: {
      story: '音量可以触发不同的游戏效果！安静时游戏进入潜行模式，大声时进入战斗模式！',
      concept: '音量范围可以映射到不同的游戏状态或效果。用数学计算将0-100映射到需要的范围。',
      syntax: "# 音量映射\nvolume = getVolume()\n\n# 映射到0-10\nlevel = volume / 10\n\n# 映射到1-5\nstars = volume / 20 + 1\n\n# 映射到颜色RGB\nred = volume * 2.55  # 0-255",
      example: {
        title: '音量映射',
        code: "def update():\n    volume = getVolume()\n    \n    # 映射到游戏难度1-5\n    difficulty = volume // 20 + 1\n    \n    # 映射到角色大小\n    size = volume * 2 + 50  # 50-250",
        output: '音量影响游戏参数',
        explanation: '用数学计算转换音量范围。'
      },
      practice: [
        {
          question: '如何将音量映射到1-10？',
          answer: 'level = volume / 10 + 1'
        },
        {
          question: '为什么要映射音量？',
          answer: '适配游戏需要的数值范围'
        }
      ]
    },

    hard: {
      story: '音量平滑处理！原始音量可能抖动，用平均值让控制更稳定！',
      concept: '音量检测可能有抖动。用列表存储最近几次的值，计算平均值，让控制更平滑。',
      syntax: "# 音量平滑\nvolumes = []\n\ndef get_smooth_volume():\n    v = getVolume()\n    volumes.append(v)\n    \n    # 只保留最近10个\n    if len(volumes) > 10:\n        volumes.pop(0)\n    \n    # 返回平均值\n    return sum(volumes) / len(volumes)",
      example: {
        title: '平滑音量',
        code: "volumes = []\n\ndef update():\n    v = getVolume()\n    volumes.append(v)\n    \n    if len(volumes) > 5:\n        volumes.pop(0)\n    \n    smooth = sum(volumes) / len(volumes)\n    print(f'原始: {v}, 平滑: {smooth:.1f}')",
        output: '显示平滑后的音量',
        explanation: '平均值减少抖动。'
      },
      practice: [
        {
          question: '为什么要平滑音量？',
          answer: '减少抖动，控制更稳定'
        },
        {
          question: '平均值如何计算？',
          answer: 'sum(列表) / len(列表)'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '声音控制游戏',
    emoji: '🎮',
    gradeLevel: '3-4',
    summary: '用声音控制游戏角色和事件',

    easy: {
      story: '用声音玩游戏！大声喊让角色跳，小声让角色走，太酷了！',
      concept: '声音控制游戏就是用音量代替按键。大声=按键，小声=不按。',
      syntax: "# 声音控制\nvolume = getVolume()\n\nif volume > 50:  # 相当于按键\n    player.jump()\nelse:\n    player.idle()",
      example: {
        title: '声音跳跃',
        code: "def update():\n    if getVolume() > 60:\n        player.jump()\n        print('跳！')",
        output: '声音大时角色跳跃',
        explanation: '用音量代替空格键。'
      },
      practice: [
        {
          question: '声音控制游戏用什么函数？',
          answer: 'getVolume()'
        },
        {
          question: '声音控制和按键控制有什么区别？',
          answer: '声音更直观，但需要麦克风'
        }
      ]
    },

    medium: {
      story: '声音控制方向！左边有声音角色向左，右边有声音角色向右！',
      concept: '可以用多个麦克风或连续音量判断方向。简单版：音量变化趋势判断左右。',
      syntax: "# 简单方向控制\nprev_volume = 0\n\ndef update():\n    global prev_volume\n    volume = getVolume()\n    \n    if volume > prev_volume:  # 音量上升\n        player.x += 5\n    else:  # 音量下降\n        player.x -= 5\n    \n    prev_volume = volume",
      example: {
        title: '音量方向',
        code: "prev = 0\n\ndef update():\n    global prev\n    v = getVolume()\n    \n    if v > prev + 5:\n        player.right()\n    elif v < prev - 5:\n        player.left()\n    \n    prev = v",
        output: '音量变化控制方向',
        explanation: '音量变化判断移动方向。'
      },
      practice: [
        {
          question: '如何判断音量上升？',
          answer: '当前音量 > 之前的音量'
        },
        {
          question: '为什么要记录之前的音量？',
          answer: '比较变化趋势'
        }
      ]
    },

    hard: {
      story: '完整的声音游戏！音量控制跳跃、连续声音控制移动、突然大声触发技能！',
      concept: '组合多种音量检测：阈值触发、变化检测、持续时间检测等，实现丰富的声音交互。',
      syntax: "# 完整声音控制\njump_threshold = 70\nmove_threshold = 40\n\nprev_volume = 0\nloud_frames = 0\n\ndef update():\n    global prev_volume, loud_frames\n    v = getVolume()\n    \n    # 突然大声 = 跳跃\n    if v > jump_threshold and prev_volume < jump_threshold:\n        player.jump()\n    \n    # 持续大声 = 移动\n    if v > move_threshold:\n        loud_frames += 1\n        if loud_frames > 5:\n            player.move()\n    else:\n        loud_frames = 0\n    \n    prev_volume = v",
      example: {
        title: '复杂声音控制',
        code: "prev = 0\nloud_count = 0\n\ndef update():\n    global prev, loud_count\n    v = getVolume()\n    \n    # 突然大声跳跃\n    if v - prev > 30:\n        player.jump()\n    \n    # 持续大声移动\n    if v > 50:\n        loud_count += 1\n        if loud_count > 10:\n            player.run()\n    else:\n        loud_count = 0\n    \n    prev = v",
        output: '不同声音模式触发不同动作',
        explanation: '组合多种检测方式。'
      },
      practice: [
        {
          question: '如何检测突然大声？',
          answer: '当前音量 - 之前音量 > 阈值'
        },
        {
          question: '如何检测持续大声？',
          answer: '连续多帧音量都高'
        }
      ]
    }
  }
]

// 习题数据
export const exercises = [
  {
    id: 'ex-1',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '音量范围',
    question: 'getVolume()返回的音量范围是多少？',
    options: ['0-10', '0-50', '0-100', '0-1000'],
    answer: 2,
    explanation: '音量范围固定是0-100，0最安静，100最吵。',
    hint: '0到100'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '音量判断',
    question: '如何判断音量很大（>70）？',
    options: ['if getVolume() > 70:', 'if getVolume() < 70:', 'if getVolume() == 70:', 'if getVolume() != 70:'],
    answer: 0,
    explanation: '用>判断音量是否大于70。',
    hint: '大于70表示很吵'
  },
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '音量映射',
    question: '音量50映射到难度1-5，应该是什么？',
    options: ['1', '2', '3', '4'],
    answer: 2,
    explanation: '50 / 20 + 1 = 2.5 + 1 = 3.5，取整为3。',
    hint: '50/20+1'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '声音控制',
    question: '用声音控制角色跳跃，应该怎么写？',
    options: ['if volume(): player.jump()', 'if getVolume() > 60: player.jump()', 'player.jump(getVolume())', 'volume.jump()'],
    answer: 1,
    explanation: '获取音量并判断是否超过阈值，超过则跳跃。',
    hint: 'getVolume()获取音量，判断阈值'
  },
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '平滑处理',
    question: '为什么要对音量进行平滑处理？',
    options: ['让数值更大', '减少抖动，控制更稳定', '让代码更短', '提高音量'],
    answer: 1,
    explanation: '原始音量可能抖动，平滑处理（平均值）让控制更稳定。',
    hint: '音量检测有抖动'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '持续检测',
    question: '如何检测持续大声（连续10帧音量>50）？',
    options: ['if getVolume() > 50:', '用计数器，每帧>50就+1，>10时触发', '用sleep等待', '只检测一次'],
    answer: 1,
    explanation: '用计数器记录连续高分贝帧数，超过阈值触发。',
    hint: '需要计数器'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L17-1',
  title: '声音魔法师',
  subtitle: '学会用音量控制游戏',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: ['掌握getVolume()获取音量', '理解音量0-100的范围', '能用音量控制游戏事件'],
  prerequisites: ['Python条件判断', 'Pygame Zero基础']
}

export const typingWords = {
  easy: ['volume', 'sound', 'loud', 'quiet', 'block'],
  medium: ['microphone', 'control', 'trigger', 'level', 'hide'],
  hard: ['threshold', 'average', 'smooth', 'detect']
}

export const typingTemplates = {
  easy: ['getVolume()', 'if volume > 50:', 'volume = getVolume()', 'print(volume)'],
  medium: ['if getVolume() > 70:\n    player.jump()', 'level = volume / 10', 'if v < 30:\n    level = "quiet"'],
  hard: ['smooth = sum(volumes) / len(volumes)', 'if volume - prev > 30:\n    jump()', 'loud_count += 1\nif loud_count > 10:']
}

export const L17_1_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L17_1_data
