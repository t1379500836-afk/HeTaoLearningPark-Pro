/**
 * PY3 课程 L15-2: 人脸识别入门
 *
 * 核心知识点:
 * 1. 视觉模块初始化
 * 2. 人脸检测基础
 * 3. 人脸框绘制与坐标获取
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'position',
    pronunciation: "[pa'zijan]",
    partOfSpeech: 'n./v.',
    meaning: '位置；方位；安置',
    level: 'easy',
    example: 'Get the position of the face.',
    exampleTranslation: '获取人脸的位置。',
    note: 'getFacePos()获取人脸坐标'
  },
  {
    word: 'frame',
    pronunciation: '[freim]',
    partOfSpeech: 'n./v.',
    meaning: '框架；边框；装框架',
    level: 'easy',
    example: 'Draw a frame around the face.',
    exampleTranslation: '在人脸周围画框。',
    note: 'drawFrame()绘制人脸框'
  },
  {
    word: 'face',
    pronunciation: '[feis]',
    partOfSpeech: 'n./v.',
    meaning: '脸；面对；面向',
    level: 'medium',
    example: 'Detect a face in the image.',
    exampleTranslation: '检测图像中的人脸。',
    note: 'isFace()检测人脸'
  },
  {
    word: 'draw',
    pronunciation: '[dro:]',
    partOfSpeech: 'v./n.',
    meaning: '绘画；拖动；吸引',
    level: 'medium',
    example: 'Draw the detection result.',
    exampleTranslation: '绘制检测结果。',
    note: ''
  },
  // 拓展单词
  {
    word: 'detect',
    pronunciation: "[di'tekt]",
    partOfSpeech: 'v.',
    meaning: '检测；发现',
    level: 'hard',
    example: 'The camera detects faces.',
    exampleTranslation: '摄像头检测人脸。',
    note: ''
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '视觉模块初始化',
    emoji: '📷',
    gradeLevel: '3-4',
    summary: '初始化AI视觉模块，准备使用摄像头',

    easy: {
      story: '想用人脸识别功能？首先需要初始化视觉模块！就像打开摄像头准备拍照一样。',
      concept: '核桃编程的AI视觉模块提供了人脸检测功能。使用前需要用initAIO()初始化，用setMode()设置模式。',
      syntax: "# 导入并初始化\nfrom ai import *\n\n# 初始化视觉模块\ninitAIO()\n\n# 设置为人脸检测模式\nsetMode(\"face\")",
      example: {
        title: '初始化视觉模块',
        code: "from ai import *\n\n# 初始化\ninitAIO()\n\n# 设置人脸检测模式\nsetMode('face')\n\nprint('视觉模块已准备好！')",
        output: '视觉模块初始化完成',
        explanation: 'initAIO()初始化AI模块，setMode("face")设置为人脸检测模式。'
      },
      practice: [
        {
          question: '初始化视觉模块用什么函数？',
          answer: 'initAIO()'
        },
        {
          question: '设置人脸检测模式用什么？',
          answer: 'setMode("face")'
        }
      ]
    },

    medium: {
      story: '视觉模块有不同模式：人脸检测、物体识别等。使用前要告诉程序你想用哪种模式！',
      concept: 'setMode()函数设置视觉模块的工作模式。常用模式有："face"（人脸检测）、"object"（物体识别）等。',
      syntax: "# 设置不同模式\nsetMode('face')    # 人脸检测模式\nsetMode('object')  # 物体识别模式\n\n# 通常在程序开始时设置一次\ninitAIO()\nsetMode('face')\n# 之后的代码使用人脸检测功能",
      example: {
        title: '完整的初始化流程',
        code: "from ai import *\nfrom pgzrun import *\n\n# 第一步：初始化AI模块\ninitAIO()\n\n# 第二步：设置模式\nsetMode('face')\n\n# 现在可以用人脸检测功能了\ndef update():\n    if isFace():\n        print('检测到人脸！')",
        output: '检测到人脸时打印提示',
        explanation: '初始化和设置模式后，才能使用isFace()等检测函数。'
      },
      practice: [
        {
          question: '为什么要设置模式？',
          answer: '告诉模块要使用哪种检测功能'
        },
        {
          question: 'setMode()应该在什么时候调用？',
          answer: '在initAIO()之后，使用检测功能之前'
        }
      ]
    },

    hard: {
      story: '视觉模块内部使用机器学习模型。初始化会加载这些模型，所以只需要在程序开始时执行一次！',
      concept: 'initAIO()会加载AI模型到内存，只需要调用一次。多次调用会浪费资源。setMode()也是，切换模式需要时间。',
      syntax: "# 正确的初始化位置\n# 在全局区域（函数外）初始化一次\n\nfrom ai import *\n\ninitAIO()\nsetMode('face')\n\n# 之后的代码\nwhile True:\n    # 不需要重复初始化\n    pass",
      example: {
        title: '避免重复初始化',
        code: "from ai import *\n\n# 只初始化一次\ninitAIO()\nsetMode('face')\n\ndef update():\n    # 不要在update里初始化！\n    # initAIO()  # 错误！\n    \n    # 正确：只调用检测函数\n    if isFace():\n        drawFrame()",
        output: '程序正常运行，不会重复加载模型',
        explanation: '初始化函数只需调用一次，放在程序开始处。'
      },
      practice: [
        {
          question: 'initAIO()应该调用几次？',
          answer: '一次（程序开始时）'
        },
        {
          question: '为什么不能在update()里初始化？',
          answer: '会重复加载模型，浪费资源，可能导致卡顿'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '人脸检测基础',
    emoji: '😊',
    gradeLevel: '3-4',
    summary: '检测画面中是否有人脸',

    easy: {
      story: 'isFace()就像一个问答题：画面里有人脸吗？有人返回True，没有人返回False！',
      concept: 'isFace()函数检测摄像头画面中是否有人脸。返回True表示检测到人脸，返回False表示没有检测到。',
      syntax: "# 检测人脸\nif isFace():\n    print('有人脸！')\nelse:\n    print('没有检测到人脸')",
      example: {
        title: '简单的人脸检测',
        code: "def update():\n    if isFace():\n        print('检测到人脸')\n    else:\n        print('请对着摄像头')",
        output: '检测到人脸时打印提示',
        explanation: 'isFace()每帧检测一次，有人脸返回True。'
      },
      practice: [
        {
          question: 'isFace()返回什么类型的值？',
          answer: '布尔值（True或False）'
        },
        {
          question: '检测到人脸时isFace()返回什么？',
          answer: 'True'
        }
      ]
    },

    medium: {
      story: '人脸检测可以用来触发事件！检测到人脸时播放欢迎音效、开门、拍照等等！',
      concept: 'isFace()通常在update()或循环中持续调用，实现实时检测。检测到后可以触发各种操作。',
      syntax: "# 实时检测人脸\ndef update():\n    if isFace():\n        # 检测到人脸后的操作\n        drawFrame()       # 画框\n        playSound('hi')   # 播放音效\n        # 或者开门、拍照等",
      example: {
        title: '人脸检测触发音效',
        code: "welcome_played = False\n\ndef update():\n    global welcome_played\n    \n    if isFace():\n        if not welcome_played:\n            playSound('welcome')\n            welcome_played = True\n    else:\n        welcome_played = False  # 人离开后重置",
        output: '检测到人脸时播放一次欢迎音效',
        explanation: '用变量控制只播放一次，人离开后再来才重新播放。'
      },
      practice: [
        {
          question: 'isFace()应该在哪个函数里调用？',
          answer: 'update()函数中（持续检测）'
        },
        {
          question: '如何让音效只播放一次？',
          answer: '用变量记录是否已播放'
        }
      ]
    },

    hard: {
      story: '人脸检测不是100%准确的！光线、角度、遮挡都可能影响检测。要考虑检测失败的情况！',
      concept: '人脸检测受多种因素影响：光线强弱、脸部角度、是否戴眼镜口罩等。实际应用中需要考虑容错处理。',
      syntax: "# 考虑检测不稳定的情况\nface_count = 0\n\ndef update():\n    global face_count\n    \n    if isFace():\n        face_count += 1\n        # 连续检测到3次才确认\n        if face_count >= 3:\n            print('确认有人')\n    else:\n        face_count = 0  # 重置计数",
      example: {
        title: '稳定的检测逻辑',
        code: "face_frames = 0\nno_face_frames = 0\nstate = 'waiting'\n\ndef update():\n    global face_frames, no_face_frames, state\n    \n    if isFace():\n        face_frames += 1\n        no_face_frames = 0\n        if face_frames >= 5:  # 连续5帧\n            state = 'detected'\n    else:\n        no_face_frames += 1\n        face_frames = 0\n        if no_face_frames >= 10:  # 连续10帧无人\n            state = 'waiting'",
        output: '更稳定的状态检测',
        explanation: '用计数器避免抖动，连续检测到才确认。'
      },
      practice: [
        {
          question: '为什么人脸检测可能不稳定？',
          answer: '光线、角度、遮挡等因素影响'
        },
        {
          question: '如何让检测更稳定？',
          answer: '用计数器，连续检测到多次才确认'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '人脸框绘制与坐标',
    emoji: '🔲',
    gradeLevel: '3-4',
    summary: '在人脸周围画框并获取位置坐标',

    easy: {
      story: '检测到人脸后，drawFrame()会在人脸周围画一个方框，让用户看到检测结果！',
      concept: 'drawFrame()函数在检测到的人脸周围绘制矩形框。这是一个可视化功能，让用户清楚看到人脸的位置。',
      syntax: "# 绘制人脸框\ndef update():\n    if isFace():\n        drawFrame()  # 在人脸周围画框",
      example: {
        title: '画人脸框',
        code: "from ai import *\n\ninitAIO()\nsetMode('face')\n\ndef update():\n    if isFace():\n        drawFrame()  # 自动在人脸周围画框",
        output: '人脸周围显示矩形框',
        explanation: 'drawFrame()会自动获取人脸位置并画框。'
      },
      practice: [
        {
          question: 'drawFrame()的作用是什么？',
          answer: '在人脸周围画矩形框'
        },
        {
          question: 'drawFrame()应该在什么时候调用？',
          answer: '在isFace()返回True时'
        }
      ]
    },

    medium: {
      story: 'getFacePos()可以获取人脸的具体位置坐标！知道位置后可以做更多事情：跟踪人脸、判断位置等。',
      concept: 'getFacePos()返回人脸的位置信息，通常是(x, y, width, height)格式。可以用来判断人脸在屏幕的哪个位置。',
      syntax: "# 获取人脸位置\npos = getFacePos()\n# pos可能是 (x, y, width, height)\n\nx, y, w, h = pos\nprint(f'人脸在: ({x}, {y})')\nprint(f'人脸大小: {w}x{h}')",
      example: {
        title: '获取人脸位置',
        code: "def update():\n    if isFace():\n        pos = getFacePos()\n        if pos:\n            x, y, w, h = pos\n            print(f'人脸中心: ({x + w//2}, {y + h//2})')",
        output: '打印人脸的中心坐标',
        explanation: 'getFacePos()返回人脸位置和大小信息。'
      },
      practice: [
        {
          question: 'getFacePos()返回什么？',
          answer: '人脸位置和大小信息 (x, y, width, height)'
        },
        {
          question: '如何计算人脸中心点？',
          answer: '(x + width/2, y + height/2)'
        }
      ]
    },

    hard: {
      story: '清除画框用clearDraw()！当不需要显示框时，用这个函数清除之前画的框。结合时间可以实现闪烁效果！',
      concept: 'clearDraw()清除之前绘制的内容。可以结合time.time()实现定时清除、闪烁提醒等效果。',
      syntax: "import time\n\n# 获取当前时间\nstart = time.time()\n\n# 计算经过的时间\nelapsed = time.time() - start\n\n# 清除绘制的框\nclearDraw()",
      example: {
        title: '人脸停留时间检测',
        code: "import time\n\nstart_time = None\n\ndef update():\n    global start_time\n    \n    if isFace():\n        drawFrame()\n        \n        if start_time is None:\n            start_time = time.time()\n        \n        # 计算停留时间\n        stay = time.time() - start_time\n        \n        if stay > 5:  # 停留超过5秒\n            playSound('alert')\n    else:\n        start_time = None\n        clearDraw()  # 清除框",
        output: '人脸停留超过5秒时发出警报',
        explanation: '用time.time()记录时间，计算停留时长。'
      },
      practice: [
        {
          question: '如何获取当前时间？',
          answer: 'time.time()'
        },
        {
          question: 'clearDraw()的作用是什么？',
          answer: '清除之前绘制的框'
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
    mathConcept: '初始化',
    question: '初始化AI视觉模块用什么函数？',
    options: [
      'start()',
      'initAIO()',
      'begin()',
      'init()'
    ],
    answer: 1,
    explanation: 'initAIO()是核桃编程AI模块的初始化函数，必须在使用其他功能前调用。',
    hint: 'AIO是AI Open的缩写'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '检测函数',
    question: 'isFace()返回True表示什么？',
    options: [
      '摄像头已打开',
      '检测到人脸',
      '没有检测到人脸',
      '程序运行正常'
    ],
    answer: 1,
    explanation: 'isFace()检测画面中是否有人脸，有则返回True，无则返回False。',
    hint: 'isFace = "是人脸吗？"'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '绘制函数',
    question: '在人脸周围画框用什么函数？',
    options: [
      'drawBox()',
      'drawRect()',
      'drawFrame()',
      'drawFace()'
    ],
    answer: 2,
    explanation: 'drawFrame()会在检测到的人脸周围自动绘制矩形框。',
    hint: 'Frame是框架、边框的意思'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '坐标获取',
    question: 'getFacePos()返回的信息不包括哪个？',
    options: [
      'x坐标',
      'y坐标',
      '人脸年龄',
      '人脸宽度'
    ],
    answer: 2,
    explanation: 'getFacePos()返回位置和大小信息(x, y, width, height)，不包括年龄、性别等属性。',
    hint: 'Pos是Position（位置）的缩写'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '时间计算',
    question: 'start = time.time() 后过了3秒，time.time() - start 等于多少？',
    options: [
      '0',
      '1',
      '3',
      '取决于具体时间'
    ],
    answer: 2,
    explanation: 'time.time()返回当前时间戳，两次调用相减就是经过的秒数。',
    hint: '经过的时间 = 结束时间 - 开始时间'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合应用',
    question: '以下哪个是正确的初始化顺序？',
    options: [
      'setMode() -> initAIO() -> isFace()',
      'initAIO() -> isFace() -> setMode()',
      'initAIO() -> setMode() -> isFace()',
      'isFace() -> initAIO() -> setMode()'
    ],
    answer: 2,
    explanation: '正确顺序：先initAIO()初始化，再setMode()设置模式，最后才能调用isFace()等检测函数。',
    hint: '先初始化，再设置，最后使用'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L15-2',
  title: '人脸识别入门',
  subtitle: '学会AI视觉模块的基本使用',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握视觉模块的初始化方法',
    '学会使用isFace()检测人脸',
    '能绘制人脸框并获取位置',
    '能用时间函数计算停留时间'
  ],
  prerequisites: [
    'Python函数调用基础',
    '条件判断语句',
    'Pygame Zero基础'
  ]
}

// 打字练习单词（按难度分组，纯英文）
export const typingWords = {
  easy: ['face', 'draw', 'mode', 'init'],
  medium: ['frame', 'detect', 'camera', 'check'],
  hard: ['position', 'clearDraw', 'isFace', 'setMode']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'initAIO()',
    'setMode("face")',
    'if isFace():',
    'drawFrame()'
  ],
  medium: [
    'pos = getFacePos()\nx, y, w, h = pos',
    'import time\nstart = time.time()',
    'if isFace():\n    drawFrame()\nelse:\n    clearDraw()',
    'elapsed = time.time() - start'
  ],
  hard: [
    'initAIO()\nsetMode("face")\n\ndef update():\n    if isFace():\n        drawFrame()',
    'if stay > 5:\n    playSound("alert")\nelse:\n    clearDraw()',
    'start_time = time.time()\nstay = time.time() - start_time'
  ]
}

// 导出所有数据
export const L15_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L15_2_data
