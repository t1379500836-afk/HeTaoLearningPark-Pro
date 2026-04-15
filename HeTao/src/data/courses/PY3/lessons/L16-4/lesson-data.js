/**
 * PY3 课程 L16-4: 颜色识别物流车
 *
 * 核心知识点:
 * 1. 智能车循线行驶
 * 2. 颜色识别功能
 * 3. 物流分拣逻辑
 */

// 单词卡数据 - 拓展词汇（无OCR单词）
export const vocabData = [
  {
    word: 'color',
    pronunciation: "['kalar]",
    partOfSpeech: 'n./v.',
    meaning: '颜色；给...着色',
    level: 'easy',
    example: 'Detect the color.',
    exampleTranslation: '检测颜色。',
    note: 'detectColor()识别颜色'
  },
  {
    word: 'line',
    pronunciation: '[lain]',
    partOfSpeech: 'n./v.',
    meaning: '线；线条；沿...排列',
    level: 'easy',
    example: 'Follow the line.',
    exampleTranslation: '沿着线走。',
    note: 'followLine()循线'
  },
  {
    word: 'move',
    pronunciation: '[mu:v]',
    partOfSpeech: 'v./n.',
    meaning: '移动；搬家',
    level: 'medium',
    example: 'Move forward.',
    exampleTranslation: '向前移动。',
    note: 'move()移动一段距离'
  },
  {
    word: 'turn',
    pronunciation: '[ta:rn]',
    partOfSpeech: 'v./n.',
    meaning: '转；转动；转向',
    level: 'medium',
    example: 'Turn left.',
    exampleTranslation: '左转。',
    note: 'turnLeft() turnRight()'
  },
  {
    word: 'delivery',
    pronunciation: "[di'livari]",
    partOfSpeech: 'n.',
    meaning: '配送；递送',
    level: 'hard',
    example: 'Complete the delivery.',
    exampleTranslation: '完成配送。',
    note: '物流配送'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '智能车循线行驶',
    emoji: '🛤️',
    gradeLevel: '3-4',
    summary: '让智能车沿黑线自动行驶',

    easy: {
      story: 'followLine()让智能车沿黑线行驶！就像火车沿轨道跑一样，智能车会自动跟踪地面的黑线！',
      concept: 'followLine()是智能车的循线功能。智能车会检测地面黑线位置，自动调整方向保持在线上。',
      syntax: "# 循线行驶\nfollowLine()\n\n# 通常在循环中持续调用\ndef update():\n    followLine()",
      example: {
        title: '基本循线',
        code: "def update():\n    # 让智能车沿黑线行驶\n    followLine()",
        output: '智能车沿黑线行驶',
        explanation: 'followLine()让智能车自动循线。'
      },
      practice: [
        {
          question: 'followLine()的作用是什么？',
          answer: '让智能车沿黑线行驶'
        },
        {
          question: '循线需要什么条件？',
          answer: '地面要有清晰的黑线'
        }
      ]
    },

    medium: {
      story: '智能车可以控制移动距离！move(距离)让智能车移动指定距离，可以精确控制位置！',
      concept: 'move()让智能车移动。可以指定距离参数，如move(100)移动100个单位。用于精确定位。',
      syntax: "# 移动控制\nmove()      # 默认距离\nmove(50)    # 移动50\nmove(100)   # 移动100\n\n# 配合循线\nfollowLine()  # 循线\nmove(50)      # 再前进50",
      example: {
        title: '移动控制',
        code: "def go_to_station():\n    followLine()  # 循线到站点\n    move(30)      # 再前进30对齐",
        output: '循线后精确对齐',
        explanation: 'move可以微调位置。'
      },
      practice: [
        {
          question: 'move(100)表示什么？',
          answer: '向前移动100个单位'
        },
        {
          question: '循线和移动如何配合？',
          answer: '循线到位置，再用move微调'
        }
      ]
    },

    hard: {
      story: 'turnLeft()和turnRight()可以控制转向！配合循线可以实现复杂的路径导航！',
      concept: 'turnLeft()左转，turnRight()右转。可以指定角度参数。在交叉口需要选择方向时使用。',
      syntax: "# 转向控制\nturnLeft()      # 左转90度\nturnRight()     # 右转90度\nturnLeft(45)    # 左转45度\nturnRight(180)  # 右转180度（掉头）",
      example: {
        title: '路径导航',
        code: "def navigate():\n    followLine()  # 循线行驶\n    \n    if at_intersection:\n        if target == 'left':\n            turnLeft()\n        else:\n            turnRight()\n        \n        followLine()  # 继续循线",
        output: '在交叉口选择方向',
        explanation: '循线+转向实现路径导航。'
      },
      practice: [
        {
          question: '如何让智能车掉头？',
          answer: 'turnLeft(180)或turnRight(180)'
        },
        {
          question: '转向后应该做什么？',
          answer: '继续循线行驶'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '颜色识别功能',
    emoji: '🎨',
    gradeLevel: '3-4',
    summary: '记录和识别颜色，实现颜色检测',

    easy: {
      story: '智能车可以识别颜色！先记录颜色，之后遇到相同颜色就能认出来！',
      concept: 'recordColor()记录颜色。detectColor()检测颜色。setColorMode()设置颜色识别模式。',
      syntax: "# 颜色识别流程\nsetColorMode()   # 设置颜色模式\nrecordColor()    # 记录当前颜色\n\nif detectColor():\n    print('检测到颜色')",
      example: {
        title: '颜色识别',
        code: "# 初始化\nsetColorMode()\nrecordColor('red')  # 记录红色\n\n# 检测\ndef update():\n    if detectColor('red'):\n        print('检测到红色！')",
        output: '检测到红色时提示',
        explanation: '先记录颜色，再检测。'
      },
      practice: [
        {
          question: 'recordColor()的作用是什么？',
          answer: '记录颜色信息'
        },
        {
          question: 'detectColor()返回什么？',
          answer: '布尔值（是否检测到）'
        }
      ]
    },

    medium: {
      story: '智能车可以检测地图上的颜色！getColor()获取当前检测到的颜色，用于判断位置！',
      concept: 'getColor()获取当前位置的颜色。结合地图颜色分布，可以判断智能车在哪个区域。',
      syntax: "# 获取颜色\ncolor = getColor()\n\nif color == 'red':\n    print('在红色区域')\nelif color == 'blue':\n    print('在蓝色区域')",
      example: {
        title: '区域判断',
        code: "def check_area():\n    color = getColor()\n    \n    if color == 'red':\n        print('仓库A')\n    elif color == 'blue':\n        print('仓库B')\n    else:\n        print('通道')",
        output: '根据颜色判断区域',
        explanation: '地图颜色标记不同区域。'
      },
      practice: [
        {
          question: 'getColor()的作用是什么？',
          answer: '获取当前检测到的颜色'
        },
        {
          question: '如何用颜色标记区域？',
          answer: '不同区域用不同颜色'
        }
      ]
    },

    hard: {
      story: '完整的颜色系统：记录多种颜色、区分颜色类型、执行对应操作！',
      concept: '颜色识别可以用于：1.区域定位 2.物品分类 3.路径标记 4.状态指示。多种颜色组合可以实现复杂功能。',
      syntax: "# 多颜色系统\nregistered_colors = []\n\ndef setup():\n    setColorMode()\n    for color in ['red', 'blue', 'green']:\n        recordColor(color)\n        registered_colors.append(color)\n\ndef handle_color():\n    detected = getColor()\n    if detected in registered_colors:\n        return detected\n    return None",
      example: {
        title: '颜色导航',
        code: "def navigate_by_color():\n    color = getColor()\n    \n    if color == 'red':\n        # 红色区域左转\n        turnLeft()\n    elif color == 'green':\n        # 绿色区域右转\n        turnRight()\n    elif color == 'yellow':\n        # 黄色区域停车\n        stop()\n    else:\n        # 其他区域循线\n        followLine()",
        output: '根据颜色执行不同导航',
        explanation: '颜色作为导航信号。'
      },
      practice: [
        {
          question: '颜色识别有哪些应用？',
          answer: '区域定位、物品分类、路径标记、状态指示'
        },
        {
          question: '如何用颜色实现导航？',
          answer: '不同颜色对应不同动作'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '物流分拣逻辑',
    emoji: '📦',
    gradeLevel: '3-4',
    summary: '根据颜色分类，实现物流分拣',

    easy: {
      story: '物流车需要把货物送到不同地方！红色货物去左边，蓝色货物去右边，用颜色区分目的地！',
      concept: '物流分拣就是根据货物特征（颜色）送到不同位置。用颜色判断目的地，然后导航到对应位置。',
      syntax: "# 简单分拣\nif color == 'red':\n    go_left()\nelif color == 'blue':\n    go_right()",
      example: {
        title: '颜色分拣',
        code: "def sort_package():\n    color = getColor()\n    \n    if color == 'red':\n        print('送往A区')\n        go_to_area('A')\n    elif color == 'blue':\n        print('送往B区')\n        go_to_area('B')",
        output: '根据颜色分拣货物',
        explanation: '颜色对应目的地。'
      },
      practice: [
        {
          question: '物流分拣根据什么判断？',
          answer: '货物特征（如颜色）'
        },
        {
          question: '不同颜色代表什么？',
          answer: '不同的目的地'
        }
      ]
    },

    medium: {
      story: '完整的物流流程：循线到起点 -> 检测颜色 -> 判断目的地 -> 循线到目的地 -> 放下货物 -> 返回起点！',
      concept: '物流流程是一个循环：取货、判断、送货、返回。用状态变量控制当前阶段。',
      syntax: "# 物流流程\nstate = 'pickup'\n\ndef update():\n    global state\n    \n    if state == 'pickup':\n        followLine()\n        if at_pickup:\n            state = 'detect'\n    \n    elif state == 'detect':\n        color = getColor()\n        state = 'deliver_' + color\n    \n    elif state == 'deliver_red':\n        go_to_red_area()",
      example: {
        title: '状态流程',
        code: "state = 'to_pickup'\n\ndef update():\n    global state\n    \n    if state == 'to_pickup':\n        followLine()\n        if at_pickup():\n            state = 'picking'\n    \n    elif state == 'picking':\n        color = getColor()\n        destination = get_destination(color)\n        state = 'to_' + destination\n    \n    elif state == 'to_A':\n        followLine()\n        if at_area('A'):\n            state = 'dropping'\n    \n    elif state == 'dropping':\n        drop_package()\n        state = 'returning'\n    \n    elif state == 'returning':\n        return_to_start()",
        output: '完整的物流分拣流程',
        explanation: '用状态机控制流程。'
      },
      practice: [
        {
          question: '物流流程有哪些阶段？',
          answer: '取货、检测、送货、返回'
        },
        {
          question: '为什么要用状态变量？',
          answer: '控制流程的当前阶段'
        }
      ]
    },

    hard: {
      story: '智能物流系统！多货物处理、优先级排序、路径优化、异常处理！',
      concept: '高级物流系统包括：1.任务队列 2.优先级排序 3.路径规划 4.异常处理 5.状态报告。',
      syntax: "# 高级物流系统\ntasks = []\ncurrent_task = None\n\ndef add_task(color, priority):\n    tasks.append({'color': color, 'priority': priority})\n    tasks.sort(key=lambda x: x['priority'])\n\ndef process_task():\n    global current_task\n    \n    if tasks:\n        current_task = tasks.pop(0)\n        destination = get_destination(current_task['color'])\n        navigate_to(destination)",
      example: {
        title: '任务队列',
        code: "tasks = []\n\ndef update():\n    if not tasks:\n        # 没有任务，返回待命\n        return_to_base()\n    else:\n        # 处理当前任务\n        task = tasks[0]\n        if complete_task(task):\n            tasks.pop(0)  # 完成后移除\n\ndef complete_task(task):\n    # 执行任务的逻辑\n    color = task['color']\n    destination = get_dest(color)\n    # ... 导航和卸货\n    return True  # 完成返回True",
        output: '多任务物流处理',
        explanation: '任务队列管理多个送货任务。'
      },
      practice: [
        {
          question: '任务队列的作用是什么？',
          answer: '管理多个待处理的送货任务'
        },
        {
          question: '优先级排序有什么用？',
          answer: '让紧急任务优先处理'
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
    mathConcept: '循线功能',
    question: 'followLine()的作用是什么？',
    options: [
      '画一条线',
      '沿黑线行驶',
      '跟随前车',
      '直线行驶'
    ],
    answer: 1,
    explanation: 'followLine()让智能车自动沿着地面的黑线行驶。',
    hint: 'follow line = 沿线行驶'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '颜色识别',
    question: 'recordColor()的作用是什么？',
    options: [
      '删除颜色',
      '记录颜色信息',
      '改变颜色',
      '显示颜色'
    ],
    answer: 1,
    explanation: 'recordColor()记录当前颜色，用于后续识别。',
    hint: 'record是"记录"的意思'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '转向控制',
    question: 'turnLeft(180)的作用是什么？',
    answer: 1,
    options: [
      '左转90度',
      '掉头（转180度）',
      '右转180度',
      '停止'
    ],
    explanation: 'turnLeft(180)让智能车向左转180度，相当于掉头。',
    hint: '180度是掉头'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '颜色检测',
    question: 'getColor()返回什么？',
    options: [
      '数字',
      '布尔值',
      '颜色名称',
      '位置坐标'
    ],
    answer: 2,
    explanation: 'getColor()返回当前检测到的颜色名称，如"red"、"blue"等。',
    hint: '返回检测到的颜色'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '流程设计',
    question: '物流分拣的第一步应该是什么？',
    options: [
      '送货到目的地',
      '检测货物颜色',
      '返回起点',
      '放下货物'
    ],
    answer: 1,
    explanation: '物流分拣的顺序：先检测货物颜色（判断目的地），然后送货，最后返回。',
    hint: '先知道送哪里才能送'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '状态机',
    question: '用状态机控制物流流程的好处是什么？',
    options: [
      '代码更短',
      '运行更快',
      '流程清晰，易于控制',
      '不需要变量'
    ],
    answer: 2,
    explanation: '状态机让流程的每个阶段清晰明确，便于控制和调试。',
    hint: '状态机让流程有条理'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L16-4',
  title: '颜色识别物流车',
  subtitle: '学会循线、颜色识别和物流分拣',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握智能车循线行驶',
    '学会颜色识别功能',
    '能实现简单的物流分拣',
    '理解状态机控制流程'
  ],
  prerequisites: [
    'L16-2 智能车控制',
    'L16-3 字符串处理',
    '条件判断和循环'
  ]
}

// 打字练习单词（按难度分组，纯英文）
export const typingWords = {
  easy: ['line', 'move', 'turn', 'color'],
  medium: ['follow', 'detect', 'record', 'deliver'],
  hard: ['navigation', 'priority', 'destination', 'sorting']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'followLine()',
    'move(100)',
    'turnLeft()',
    'turnRight()'
  ],
  medium: [
    'if detectColor("red"):',
    'color = getColor()',
    'setColorMode()\nrecordColor("blue")',
    'if at_intersection:\n    turnLeft()'
  ],
  hard: [
    'state = "to_pickup"\ndef update():\n    if state == "to_pickup":\n        followLine()',
    'tasks.append({"color": color, "priority": 1})\ntasks.sort(key=lambda x: x["priority"])',
    'if complete_task(task):\n    tasks.pop(0)'
  ]
}

// 导出所有数据
export const L16_4_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L16_4_data
