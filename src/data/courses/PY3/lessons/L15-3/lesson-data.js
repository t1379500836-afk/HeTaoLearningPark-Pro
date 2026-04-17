/**
 * PY3 课程 L15-3: 智能门禁系统
 *
 * 核心知识点:
 * 1. 显示图片与声音提示
 * 2. 人脸位置判断
 * 3. 门禁系统逻辑
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'battery',
    pronunciation: "['baetari]",
    partOfSpeech: 'n.',
    meaning: '电池；电池组',
    level: 'easy',
    example: 'Charge the battery.',
    exampleTranslation: '给电池充电。',
    note: '',
    source: 'ocr'
  },
  {
    word: 'charge',
    pronunciation: '[tfa:rd3]',
    partOfSpeech: 'v./n.',
    meaning: '充电；收费；费用',
    level: 'easy',
    example: 'Charge a phone.',
    exampleTranslation: '给手机充电。',
    note: '',
    source: 'ocr'
  },
  {
    word: 'height',
    pronunciation: '[hait]',
    partOfSpeech: 'n.',
    meaning: '高度；身高；高处',
    level: 'medium',
    example: 'What is your height?',
    exampleTranslation: '你的身高是多少？',
    note: '',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'access',
    pronunciation: "['aeskes]",
    partOfSpeech: 'n./v.',
    meaning: '进入；通道；访问',
    level: 'medium',
    example: 'Access denied.',
    exampleTranslation: '访问被拒绝。',
    note: '门禁系统',
    source: 'extended'
  },
  {
    word: 'security',
    pronunciation: "[si'kjuarati]",
    partOfSpeech: 'n.',
    meaning: '安全；安保；证券',
    level: 'hard',
    example: 'Security system is active.',
    exampleTranslation: '安全系统已激活。',
    note: '',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '显示图片与声音提示',
    emoji: '🖼️',
    gradeLevel: '3-4',
    summary: '用showPic显示图片，playSound播放声音',

    easy: {
      story: '门禁系统需要显示提示信息！有人时显示"欢迎"，无人时显示"请靠近"，用图片来表示！',
      concept: 'showPic()函数可以在屏幕上显示图片。playSound()函数可以播放声音效果。两者结合提供视听反馈。',
      syntax: "# 显示图片\nshowPic('welcome')  # 显示欢迎图片\n\n# 播放声音\nplaySound('ding')  # 播放提示音",
      example: {
        title: '显示欢迎图片',
        code: "def update():\n    if isFace():\n        showPic('welcome')  # 显示欢迎\n        playSound('ding')    # 播放音效\n    else:\n        showPic('please_wait')  # 显示等待",
        output: '检测到人脸显示欢迎图片和声音',
        explanation: 'showPic显示图片，playSound播放声音，提供用户反馈。'
      },
      practice: [
        {
          question: '显示图片用什么函数？',
          answer: 'showPic()'
        },
        {
          question: '播放声音用什么函数？',
          answer: 'playSound()'
        }
      ]
    },

    medium: {
      story: '门禁系统需要不同的状态提示：等待、检测中、欢迎、拒绝等。用不同的图片和声音表示！',
      concept: '根据不同状态显示不同图片和播放不同声音。这需要定义状态变量，在状态变化时更新显示。',
      syntax: "# 状态与显示\nstate = 'waiting'\n\ndef update():\n    global state\n    \n    if isFace():\n        state = 'detected'\n        showPic('welcome')\n        playSound('welcome')\n    else:\n        state = 'waiting'\n        showPic('please_wait')",
      example: {
        title: '多状态显示',
        code: "state = 'waiting'\n\ndef update():\n    global state\n    \n    if state == 'waiting':\n        showPic('scan')  # 扫描图片\n    elif state == 'welcome':\n        showPic('welcome')\n    elif state == 'denied':\n        showPic('denied')\n\n    if isFace():\n        state = 'welcome'\n        playSound('ding')",
        output: '根据状态显示不同图片',
        explanation: '用state变量控制显示内容，实现状态切换。'
      },
      practice: [
        {
          question: '如何根据状态显示不同图片？',
          answer: '用if-elif判断状态，调用showPic显示对应图片'
        },
        {
          question: '为什么需要状态变量？',
          answer: '记录当前状态，控制显示和行为'
        }
      ]
    },

    hard: {
      story: '高级门禁系统！组合多个功能：检测人脸 -> 显示提示 -> 播放声音 -> 记录时间 -> 控制开门！',
      concept: '完整的门禁系统结合多种功能：人脸检测、状态管理、视听反馈、时间记录、权限判断等。需要良好的代码结构。',
      syntax: "# 完整门禁逻辑\ndef update():\n    if isFace():\n        # 检测到人脸\n        drawFrame()\n        \n        # 判断权限\n        if checkPermission():\n            showPic('access_granted')\n            playSound('access_granted')\n            openDoor()\n        else:\n            showPic('access_denied')\n            playSound('access_denied')\n    else:\n        showPic('please_look')\n        clearDraw()",
      example: {
        title: '门禁完整流程',
        code: "def update():\n    if isFace():\n        drawFrame()\n        showPic('checking')\n        \n        # 停留时间检测\n        stay = time.time() - start_time\n        if stay > 2:\n            showPic('welcome')\n            playSound('door_open')\n    else:\n        showPic('scan_face')\n        clearDraw()",
        output: '检测人脸2秒后显示欢迎并开门',
        explanation: '组合检测、显示、声音、时间判断等功能。'
      },
      practice: [
        {
          question: '门禁系统需要哪些功能？',
          answer: '人脸检测、状态显示、声音提示、权限判断'
        },
        {
          question: '为什么用多个函数组合？',
          answer: '每个函数负责一个功能，代码更清晰'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '人脸位置判断',
    emoji: '📍',
    gradeLevel: '3-4',
    summary: '获取人脸坐标并判断位置',

    easy: {
      story: '知道人脸的位置很有用！可以判断人是站在左边还是右边，是在屏幕中央还是边缘！',
      concept: 'getFacePos()返回人脸的位置信息(x, y, width, height)。通过x坐标可以判断人脸在屏幕的左右位置。',
      syntax: "# 获取位置\npos = getFacePos()\nif pos:\n    x, y, w, h = pos\n    print(f'人脸在 x={x}')",
      example: {
        title: '获取人脸位置',
        code: "def update():\n    if isFace():\n        pos = getFacePos()\n        if pos:\n            x, y, w, h = pos\n            print(f'位置: ({x}, {y})')\n            print(f'大小: {w} x {h}')",
        output: '打印人脸位置和大小',
        explanation: 'getFacePos()返回包含位置和大小的元组。'
      },
      practice: [
        {
          question: 'getFacePos()返回几个值？',
          answer: '4个值 (x, y, width, height)'
        },
        {
          question: 'x坐标表示什么？',
          answer: '人脸左边缘的水平位置'
        }
      ]
    },

    medium: {
      story: '判断人脸在屏幕哪个位置！左边、中间还是右边？可以用来控制游戏角色或者显示不同提示！',
      concept: '通过比较x坐标和屏幕宽度，可以判断人脸在屏幕的哪个区域。通常是：左(0-1/3)、中(1/3-2/3)、右(2/3-1)。',
      syntax: "# 判断位置\nWIDTH = 800\n\npos = getFacePos()\nx, y, w, h = pos\ncenter_x = x + w / 2  # 人脸中心\n\nif center_x < WIDTH / 3:\n    print('左边')\nelif center_x > WIDTH * 2 / 3:\n    print('右边')\nelse:\n    print('中间')",
      example: {
        title: '判断左右位置',
        code: "WIDTH = 800\n\ndef update():\n    if isFace():\n        pos = getFacePos()\n        if pos:\n            x, y, w, h = pos\n            center = x + w // 2\n            \n            if center < WIDTH // 3:\n                showPic('arrow_left')\n            elif center > WIDTH * 2 // 3:\n                showPic('arrow_right')\n            else:\n                showPic('ok')",
        output: '根据人脸位置显示不同箭头',
        explanation: '计算人脸中心，与屏幕宽度比较判断位置。'
      },
      practice: [
        {
          question: '如何计算人脸中心的x坐标？',
          answer: 'x + width / 2'
        },
        {
          question: '屏幕宽度800，人脸中心x=700，在哪个区域？',
          answer: '右边（大于800*2/3≈533）'
        }
      ]
    },

    hard: {
      story: '人脸高度判断！可以判断人的高矮，或者判断人离摄像头的远近（脸越大越近）！',
      concept: '人脸的高度（height）可以判断人的身高或距离。脸大说明离摄像头近，脸小说明远。可以用于距离检测。',
      syntax: "# 判断距离\npos = getFacePos()\nx, y, w, h = pos\n\n# 人脸越大，距离越近\nif h > 200:\n    print('很近')\nelif h > 100:\n    print('适中')\nelse:\n    print('较远')",
      example: {
        title: '距离判断',
        code: "def update():\n    if isFace():\n        pos = getFacePos()\n        if pos:\n            x, y, w, h = pos\n            \n            # 根据高度判断距离\n            if h > 200:\n                showPic('too_close')\n            elif h > 80:\n                showPic('good_distance')\n            else:\n                showPic('come_closer')",
        output: '根据人脸大小提示距离是否合适',
        explanation: '用人脸高度判断与摄像头的距离。'
      },
      practice: [
        {
          question: '人脸高度越大说明什么？',
          answer: '离摄像头越近'
        },
        {
          question: '如何判断距离是否合适？',
          answer: '检查人脸高度是否在合适范围内'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '门禁系统逻辑',
    emoji: '🚪',
    gradeLevel: '3-4',
    summary: '实现完整的门禁控制逻辑',

    easy: {
      story: '门禁系统的基本逻辑：检测到人脸 -> 验证身份 -> 开门或拒绝。就像酒店刷脸入住！',
      concept: '门禁系统的核心是：1.检测人脸 2.判断权限 3.执行动作（开门/拒绝）。用if-else实现基本逻辑。',
      syntax: "# 门禁基本逻辑\nif isFace():\n    # 检测到人脸\n    if hasPermission():  # 有权限\n        openDoor()\n    else:\n        denyAccess()\nelse:\n    waitForFace()",
      example: {
        title: '简单门禁',
        code: "door_open = False\n\ndef update():\n    global door_open\n    \n    if isFace():\n        drawFrame()\n        showPic('welcome')\n        door_open = True\n    else:\n        clearDraw()\n        showPic('scan')\n        door_open = False",
        output: '检测到人脸时开门',
        explanation: '用door_open变量控制门的状态。'
      },
      practice: [
        {
          question: '门禁系统的三个步骤是什么？',
          answer: '检测人脸、判断权限、执行动作'
        },
        {
          question: 'door_open = True 表示什么？',
          answer: '门打开'
        }
      ]
    },

    medium: {
      story: '更智能的门禁！需要停留一定时间才能开门，防止路人误触发。还要有离开后自动关门的功能！',
      concept: '门禁需要考虑：防误触发（停留时间）、自动关门（离开检测）、状态显示（等待/检测/开门/关门）。',
      syntax: "# 智能门禁\nimport time\n\nstart_time = None\nDOOR_OPEN_TIME = 3  # 停留3秒开门\n\ndef update():\n    global start_time, door_open\n    \n    if isFace():\n        if start_time is None:\n            start_time = time.time()\n        \n        stay = time.time() - start_time\n        if stay > DOOR_OPEN_TIME:\n            door_open = True\n            showPic('door_open')\n    else:\n        start_time = None\n        door_open = False",
      example: {
        title: '智能门禁',
        code: "start_time = None\ndoor_open = False\n\ndef update():\n    global start_time, door_open\n    \n    if isFace():\n        if start_time is None:\n            start_time = time.time()\n        \n        stay = time.time() - start_time\n        \n        if stay < 2:\n            showPic('checking')\n        elif stay < 3:\n            showPic('please_wait')\n        else:\n            door_open = True\n            showPic('access_granted')\n            playSound('door_open')\n    else:\n        start_time = None\n        door_open = False\n        showPic('scan')",
        output: '停留3秒后开门，离开后自动关门',
        explanation: '用时间判断实现防误触发功能。'
      },
      practice: [
        {
          question: '为什么要设置停留时间？',
          answer: '防止路人误触发门禁'
        },
        {
          question: '离开后应该做什么？',
          answer: '重置时间、关门、显示等待'
        }
      ]
    },

    hard: {
      story: '完整的门禁系统！包括：人脸记录、权限管理、日志记录、多重验证等高级功能！',
      concept: '企业级门禁需要：人脸数据库、权限分级、访问日志、多因素验证等。用列表存储已注册人脸，记录访问日志。',
      syntax: "# 高级门禁\nregistered_faces = []  # 已注册人脸\naccess_log = []  # 访问日志\n\ndef checkPermission():\n    face_list = getFaceList()\n    for face in face_list:\n        if face in registered_faces:\n            return True\n    return False\n\ndef logAccess(name, granted):\n    log = {'name': name, 'time': time.time(), 'granted': granted}\n    access_log.append(log)",
      example: {
        title: '带权限的门禁',
        code: "allowed_users = ['Alice', 'Bob', 'Charlie']\n\ndef update():\n    if isFace():\n        face_list = getFaceList()\n        \n        if len(face_list) > 0:\n            # 检测到已知人脸\n            showPic('access_granted')\n            playSound('welcome')\n        else:\n            # 未知人脸\n            showPic('access_denied')\n            playSound('alert')",
        output: '根据人脸权限允许或拒绝访问',
        explanation: '用getFaceList()获取人脸信息，判断是否有权限。'
      },
      practice: [
        {
          question: '如何存储已注册的用户？',
          answer: '用列表或字典存储用户信息'
        },
        {
          question: '访问日志应该记录什么？',
          answer: '时间、用户、是否允许等信息'
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
    mathConcept: '显示函数',
    question: '显示图片用什么函数？',
    options: [
      'drawPic()',
      'showPic()',
      'displayPic()',
      'printPic()'
    ],
    answer: 1,
    explanation: 'showPic()函数用于在屏幕上显示指定的图片。',
    hint: 'show是"显示"的意思'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '声音函数',
    question: '播放声音用什么函数？',
    options: [
      'playSound()',
      'soundPlay()',
      'play()',
      'music()'
    ],
    answer: 0,
    explanation: 'playSound()函数用于播放指定的声音效果。',
    hint: 'play是"播放"的意思'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '位置判断',
    question: '人脸中心x坐标是200，屏幕宽度800，人脸在哪个区域？',
    options: [
      '左边',
      '中间',
      '右边',
      '无法判断'
    ],
    answer: 0,
    explanation: '200 < 800/3 ≈ 267，所以人脸在屏幕左边区域。',
    hint: '左1/3、中1/3、右1/3'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '距离判断',
    question: '人脸高度越大说明什么？',
    options: [
      '人越高',
      '离摄像头越近',
      '离摄像头越远',
      '人脸越大'
    ],
    answer: 1,
    explanation: '在画面中人脸越大，说明离摄像头越近。',
    hint: '近处的物体看起来更大'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '门禁逻辑',
    question: '为什么门禁需要设置停留时间？',
    options: [
      '让系统有反应时间',
      '防止路人误触发',
      '节省电力',
      '记录时间'
    ],
    answer: 1,
    explanation: '设置停留时间可以防止路人经过时误触发门禁，确保只有真正要进门的人才能打开。',
    hint: '想一想路过的人会怎样'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合应用',
    question: '门禁系统检测到人脸后应该按什么顺序执行？',
    options: [
      '开门 -> 检测 -> 验证',
      '验证 -> 检测 -> 开门',
      '检测 -> 验证 -> 开门',
      '检测 -> 开门 -> 验证'
    ],
    answer: 2,
    explanation: '正确顺序：先检测人脸，然后验证权限，最后根据验证结果决定是否开门。',
    hint: '先有人脸才能验证，验证通过才开门'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L15-3',
  title: '智能门禁系统',
  subtitle: '学会门禁系统的完整逻辑',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握showPic和playSound的使用',
    '能获取并判断人脸位置',
    '理解门禁系统的逻辑',
    '能实现基本的门禁控制'
  ],
  prerequisites: [
    'L15-2 人脸检测基础',
    '条件判断语句',
    '时间函数的使用'
  ]
}

// 打字练习单词（按难度分组，纯英文）
export const typingWords = {
  easy: ['door', 'open', 'show', 'play'],
  medium: ['access', 'charge', 'height', 'state'],
  hard: ['security', 'permission', 'battery', 'monitor']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'showPic("welcome")',
    'playSound("ding")',
    'if isFace():',
    'door_open = True'
  ],
  medium: [
    'pos = getFacePos()\nx, y, w, h = pos',
    'if x < WIDTH // 3:\n    print("left")',
    'stay = time.time() - start_time',
    'if stay > 3:\n    door_open = True'
  ],
  hard: [
    'def checkPermission():\n    face_list = getFaceList()\n    return len(face_list) > 0',
    'if start_time is None:\n    start_time = time.time()\nelse:\n    stay = time.time() - start_time'
  ]
}

// 导出所有数据
export const L15_3_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L15_3_data
