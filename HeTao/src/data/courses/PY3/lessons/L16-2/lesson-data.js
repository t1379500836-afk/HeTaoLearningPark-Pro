/**
 * PY3 课程 L16-2: 视觉智能车
 *
 * 核心知识点:
 * 1. 路牌识别基础
 * 2. 播放动画与控制
 * 3. 智能车运动控制
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'sign',
    pronunciation: '[sain]',
    partOfSpeech: 'n./v.',
    meaning: '标志；记号；签名',
    level: 'easy',
    example: 'Follow the traffic sign.',
    exampleTranslation: '遵守交通标志。',
    note: 'isSign()识别路牌'
  },
  {
    word: 'follow',
    pronunciation: "['falou]",
    partOfSpeech: 'v./n.',
    meaning: '跟随；追随；理解',
    level: 'easy',
    example: 'Follow the line.',
    exampleTranslation: '沿着线走。',
    note: 'followLine()循线'
  },
  {
    word: 'play',
    pronunciation: '[plei]',
    partOfSpeech: 'v./n.',
    meaning: '播放；玩；游戏',
    level: 'medium',
    example: 'Play the animation.',
    exampleTranslation: '播放动画。',
    note: 'playAnim()播放动画'
  },
  {
    word: 'animation',
    pronunciation: "[,aeni'meijan]",
    partOfSpeech: 'n.',
    meaning: '动画；活力',
    level: 'medium',
    example: 'Watch the animation.',
    exampleTranslation: '观看动画。',
    note: ''
  },
  // 拓展单词
  {
    word: 'control',
    pronunciation: "[kan'troul]",
    partOfSpeech: 'v./n.',
    meaning: '控制；管理',
    level: 'hard',
    example: 'Control the car.',
    exampleTranslation: '控制小车。',
    note: ''
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '路牌识别基础',
    emoji: '🚸',
    gradeLevel: '3-4',
    summary: '记录和识别路牌信息',

    easy: {
      story: '智能车需要"看懂"路牌！先记录路牌的样子，然后遇到相同路牌就能认出来了！',
      concept: 'recordSign()记录当前看到的路牌。isSign()检测画面中是否有已记录的路牌。结合使用实现路牌识别。',
      syntax: "# 记录路牌\nrecordSign()  # 记录当前路牌\n\n# 识别路牌\nif isSign():\n    print('检测到路牌！')",
      example: {
        title: '路牌识别',
        code: "# 先记录路牌\ndef setup():\n    recordSign()  # 记录左转路牌\n\n# 循环检测\ndef update():\n    if isSign():\n        print('检测到路牌')",
        output: '检测到已记录的路牌时提示',
        explanation: 'recordSign记录，isSign识别。'
      },
      practice: [
        {
          question: 'recordSign()的作用是什么？',
          answer: '记录当前看到的路牌'
        },
        {
          question: 'isSign()返回什么类型？',
          answer: '布尔值（True/False）'
        }
      ]
    },

    medium: {
      story: '智能车可以根据路牌做不同动作！看到左转牌左转，看到右转牌右转，看到红灯停止！',
      concept: '可以记录多种路牌，识别后执行对应的动作。用条件判断区分不同路牌并执行不同操作。',
      syntax: "# 多路牌识别与响应\nif isSign('left'):  # 左转牌\n    turnLeft()\nelif isSign('right'):  # 右转牌\n    turnRight()\nelif isSign('stop'):  # 停止牌\n    stop()",
      example: {
        title: '路牌响应',
        code: "def update():\n    if isSign():\n        # 检测到路牌，执行对应动作\n        playAnim('turn')  # 播放转向动画\n        print('看到路牌！')",
        output: '检测到路牌时播放动画',
        explanation: '识别路牌后可以执行各种操作。'
      },
      practice: [
        {
          question: '如何让智能车看到路牌后左转？',
          answer: 'if isSign(): turnLeft()'
        },
        {
          question: '路牌识别需要先记录吗？',
          answer: '是的，需要先recordSign记录'
        }
      ]
    },

    hard: {
      story: '完整的路牌系统包括：记录多种路牌、区分路牌类型、执行对应动作、处理未识别情况！',
      concept: '实际应用中需要：1.提前记录所有路牌 2.循环检测并判断类型 3.执行相应动作 4.处理异常情况。',
      syntax: "# 完整路牌系统\nregistered_signs = []\n\ndef register_signs():\n    # 记录所有需要的路牌\n    for sign_type in ['left', 'right', 'stop']:\n        recordSign(sign_type)\n        registered_signs.append(sign_type)\n\ndef handle_sign():\n    for sign_type in registered_signs:\n        if isSign(sign_type):\n            return sign_type\n    return None",
      example: {
        title: '多路牌管理',
        code: "def update():\n    detected = check_all_signs()\n    \n    if detected == 'left':\n        turnLeft()\n    elif detected == 'right':\n        turnRight()\n    elif detected == 'stop':\n        stop()\n    else:\n        followLine()  # 没看到路牌就循线",
        output: '根据不同路牌执行不同动作',
        explanation: '用函数封装路牌检测和处理逻辑。'
      },
      practice: [
        {
          question: '为什么要提前记录所有路牌？',
          answer: '这样识别时才能对比判断'
        },
        {
          question: '没识别到路牌应该怎么办？',
          answer: '继续循线或执行默认行为'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '播放动画与控制',
    emoji: '🎬',
    gradeLevel: '3-4',
    summary: '用playAnim播放动画，提供视觉反馈',

    easy: {
      story: '智能车做出动作时可以播放动画！左转时播放左转动画，右转时播放右转动画！',
      concept: 'playAnim()播放指定的动画效果。动画可以提供视觉反馈，让用户看到智能车的动作。',
      syntax: "# 播放动画\nplayAnim('turn_left')   # 播放左转动画\nplayAnim('turn_right')  # 播放右转动画\nplayAnim('stop')        # 播放停止动画",
      example: {
        title: '动作配动画',
        code: "def turn_left():\n    turnLeft()         # 执行左转\n    playAnim('left')   # 播放动画\n\ndef turn_right():\n    turnRight()        # 执行右转\n    playAnim('right')  # 播放动画",
        output: '动作和动画配合',
        explanation: '动画增强用户体验。'
      },
      practice: [
        {
          question: 'playAnim()的作用是什么？',
          answer: '播放指定的动画'
        },
        {
          question: '动画应该在什么时候播放？',
          answer: '执行动作时播放，提供视觉反馈'
        }
      ]
    },

    medium: {
      story: '动画可以表示智能车的状态！正常行驶、识别到路牌、正在转向、遇到红灯等，用不同动画表示！',
      concept: '动画是用户界面的一部分，帮助用户理解系统状态。好的动画设计让程序更易用。',
      syntax: "# 状态与动画\nstate = 'normal'\n\ndef update():\n    global state\n    \n    if isSign():\n        state = 'detected'\n        playAnim('alert')\n    else:\n        state = 'normal'\n        playAnim('running')",
      example: {
        title: '状态动画',
        code: "def update():\n    if isSign():\n        # 检测到路牌\n        playAnim('found_sign')\n        # 处理路牌...\n    elif need_stop:\n        # 需要停止\n        playAnim('braking')\n    else:\n        # 正常行驶\n        playAnim('driving')",
        output: '根据状态播放不同动画',
        explanation: '动画反映当前状态。'
      },
      practice: [
        {
          question: '动画的作用是什么？',
          answer: '提供视觉反馈，表示状态'
        },
        {
          question: '如何让动画更有意义？',
          answer: '与程序状态和动作配合'
        }
      ]
    },

    hard: {
      story: '高级动画控制！可以控制动画速度、循环次数、动画序列等，创造更丰富的效果！',
      concept: '动画可以与声音、图片等结合，创建多媒体反馈。动画也可以是序列，按顺序播放多个动画。',
      syntax: "# 动画序列\nanimations = ['alert', 'turn', 'go']\n\nfor anim in animations:\n    playAnim(anim)\n    wait(1)  # 等待1秒\n\n# 或者在不同状态播放\nif state == 'start':\n    playAnim('intro')\nelif state == 'playing':\n    playAnim('loop')\nelif state == 'end':\n    playAnim('outro')",
      example: {
        title: '动画序列',
        code: "def handle_intersection():\n    # 播放检测动画\n    playAnim('detected')\n    \n    # 判断方向\n    if direction == 'left':\n        playAnim('turning_left')\n        turnLeft()\n    else:\n        playAnim('turning_right')\n        turnRight()\n    \n    # 播放完成动画\n    playAnim('continue')",
        output: '按顺序播放多个动画',
        explanation: '动画序列提供完整的视觉体验。'
      },
      practice: [
        {
          question: '为什么需要动画序列？',
          answer: '完整展示一个过程的不同阶段'
        },
        {
          question: '动画可以和什么结合？',
          answer: '声音、图片、动作等'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '智能车运动控制',
    emoji: '🚗',
    gradeLevel: '3-4',
    summary: '控制智能车前进、转向、停止',

    easy: {
      story: '智能车可以前进、后退、左转、右转！用简单的函数就能控制它的运动！',
      concept: 'move()让智能车向前移动一段距离。turnLeft()左转，turnRight()右转。这些是基本的运动控制。',
      syntax: "# 基本运动\nmove()       # 前进\nmove(100)    # 前进100距离\n\nturnLeft()   # 左转\nturnRight()  # 右转",
      example: {
        title: '简单运动',
        code: "def go_forward():\n    move()  # 前进\n\ndef turn_around():\n    turnLeft()   # 左转\n    turnLeft()   # 再左转 = 掉头",
        output: '智能车执行前进和转向',
        explanation: '基本运动函数控制智能车。'
      },
      practice: [
        {
          question: 'move()的作用是什么？',
          answer: '让智能车前进'
        },
        {
          question: '如何让智能车左转？',
          answer: '调用turnLeft()'
        }
      ]
    },

    medium: {
      story: '智能车可以循线行驶！followLine()让智能车自动沿着黑线走，就像有轨道一样！',
      concept: 'followLine()让智能车循着地面的黑线行驶。这是智能车最常用的功能，适合沿轨道运行的场景。',
      syntax: "# 循线行驶\nfollowLine()  # 沿黑线行驶\n\n# 通常在循环中调用\ndef update():\n    if not isSign():  # 没有路牌\n        followLine()   # 就循线行驶",
      example: {
        title: '循线运动',
        code: "def update():\n    if isSign():\n        # 看到路牌就处理\n        handle_sign()\n    else:\n        # 没有路牌就循线\n        followLine()",
        output: '智能车沿黑线行驶',
        explanation: '循线是智能车的基本功能。'
      },
      practice: [
        {
          question: 'followLine()的作用是什么？',
          answer: '让智能车沿黑线行驶'
        },
        {
          question: '循线时需要注意什么？',
          answer: '地面要有清晰的黑线'
        }
      ]
    },

    hard: {
      story: 'setPower()可以调整智能车的速度！功率大跑得快，功率小跑得慢，可以根据需要调整！',
      concept: 'setPower(功率值)设置智能车的动力大小。功率影响速度，功率越大速度越快。可以用于控制节奏。',
      syntax: "# 设置功率\nsetPower(50)   # 中等功率\nsetPower(100)  # 全速\nsetPower(30)   # 慢速\n\n# 根据情况调整\nif on_straight:\n    setPower(100)  # 直道快\nelse:\n    setPower(50)   # 弯道慢",
      example: {
        title: '动态速度控制',
        code: "def update():\n    if isSign():\n        setPower(30)  # 看到路牌减速\n        handle_sign()\n    elif is_curve():\n        setPower(50)  # 弯道中速\n    else:\n        setPower(80)  # 直道快速\n    \n    followLine()",
        output: '根据情况动态调整速度',
        explanation: '功率控制让运动更灵活。'
      },
      practice: [
        {
          question: 'setPower()的作用是什么？',
          answer: '设置智能车的动力/速度'
        },
        {
          question: '功率值越大速度越怎样？',
          answer: '功率越大速度越快'
        }
      ]
    }
  }
]

// 习题数据
export const exercises = [
  // 🟢 基础题
  {
    id: 'ex-1',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '路牌识别',
    question: 'recordSign()的作用是什么？',
    options: [
      '删除路牌',
      '记录路牌信息',
      '播放动画',
      '控制运动'
    ],
    answer: 1,
    explanation: 'recordSign()记录当前看到的路牌，用于后续识别。',
    hint: 'record是"记录"的意思'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '运动控制',
    question: '让智能车左转用什么函数？',
    options: [
      'move()',
      'turnLeft()',
      'left()',
      'goLeft()'
    ],
    answer: 1,
    explanation: 'turnLeft()让智能车向左转向。',
    hint: 'turn + left'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '循线功能',
    question: 'followLine()的作用是什么？',
    options: [
      '跟随前车',
      '沿黑线行驶',
      '画一条线',
      '跟随路牌'
    ],
    answer: 1,
    explanation: 'followLine()让智能车自动沿着地面的黑线行驶。',
    hint: 'follow line = 跟随线条'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '动画功能',
    question: 'playAnim()的作用是什么？',
    options: [
      '播放音乐',
      '播放动画',
      '播放视频',
      '显示图片'
    ],
    answer: 1,
    explanation: 'playAnim()播放指定的动画效果，提供视觉反馈。',
    hint: 'anim是animation的缩写'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '功率控制',
    question: 'setPower(80)和setPower(30)哪个速度更快？',
    options: [
      'setPower(30)更快',
      'setPower(80)更快',
      '一样快',
      '不能比较'
    ],
    answer: 1,
    explanation: 'setPower设置动力大小，数值越大动力越强，速度越快。',
    hint: '功率值越大速度越快'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合应用',
    question: '智能车在弯道应该怎样设置功率？',
    options: [
      '设最大值',
      '设最小值',
      '设中等值，降低速度',
      '不改变功率'
    ],
    answer: 2,
    explanation: '弯道需要降低速度以保证稳定和安全，所以应该设置中等功率。',
    hint: '弯道要减速'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L16-2',
  title: '视觉智能车',
  subtitle: '学会路牌识别和智能车控制',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握路牌的记录和识别',
    '学会使用playAnim播放动画',
    '能控制智能车运动',
    '能实现循线行驶'
  ],
  prerequisites: [
    '条件判断语句',
    '函数调用基础',
    'L16-1逻辑运算'
  ]
}

// 打字练习单词（按难度分组，纯英文）
export const typingWords = {
  easy: ['sign', 'play', 'move', 'turn'],
  medium: ['follow', 'animation', 'control', 'power'],
  hard: ['detect', 'register', 'execute', 'response']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'recordSign()',
    'isSign()',
    'playAnim("turn")',
    'turnLeft()'
  ],
  medium: [
    'if isSign():\n    turnLeft()',
    'followLine()  # 循线行驶',
    'move(100)  # 前进100',
    'playAnim("left")\nturnLeft()'
  ],
  hard: [
    'def update():\n    if isSign():\n        handle_sign()\n    else:\n        followLine()',
    'if is_curve():\n    setPower(50)\nelse:\n    setPower(100)'
  ]
}

// 导出所有数据
export const L16_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L16_2_data
