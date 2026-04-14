/**
 * PY3 课程 L14-3: 云端探险家
 *
 * 核心知识点:
 * 1. 角色边缘坐标属性
 * 2. left/right/top/bottom用法
 * 3. 精确碰撞与对齐
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'brick',
    pronunciation: '[brik]',
    partOfSpeech: 'n./v.',
    meaning: '砖块；积木；用砖砌',
    level: 'easy',
    example: 'The brick wall is strong.',
    exampleTranslation: '砖墙很坚固。',
    note: '游戏中常用作踏板或障碍物'
  },
  {
    word: 'top',
    pronunciation: '[top]',
    partOfSpeech: 'n./adj./v.',
    meaning: '顶部；最高的；达到顶端',
    level: 'easy',
    example: 'Jump to the top.',
    exampleTranslation: '跳到顶部。',
    note: '角色.top表示上边缘y坐标'
  },
  {
    word: 'bottom',
    pronunciation: "['batam]",
    partOfSpeech: 'n./adj./v.',
    meaning: '底部；底部的；触底',
    level: 'medium',
    example: 'Fall to the bottom.',
    exampleTranslation: '掉到底部。',
    note: '角色.bottom表示下边缘y坐标'
  },
  // 拓展单词
  {
    word: 'edge',
    pronunciation: '[ed3]',
    partOfSpeech: 'n.',
    meaning: '边缘；边界；优势',
    level: 'medium',
    example: 'Stay on the edge.',
    exampleTranslation: '保持在边缘。',
    note: ''
  },
  {
    word: 'align',
    pronunciation: "[a'lain]",
    partOfSpeech: 'v.',
    meaning: '对齐；排列；使一致',
    level: 'hard',
    example: 'Align the blocks.',
    exampleTranslation: '对齐方块。',
    note: ''
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '角色边缘坐标属性',
    emoji: '📏',
    gradeLevel: '3-4',
    summary: '获取角色四个边缘的精确坐标',

    easy: {
      story: '角色的pos是中心点，但有时候我们需要知道它的边缘在哪里！left、right、top、bottom就是角色四个边缘的坐标！',
      concept: '每个角色都有四个边缘属性：left（左边缘x）、right（右边缘x）、top（上边缘y）、bottom（下边缘y）。这些属性自动根据pos和图片大小计算。',
      syntax: "# 获取边缘坐标\nleft_x = player.left    # 左边缘x坐标\nright_x = player.right   # 右边缘x坐标\ntop_y = player.top       # 上边缘y坐标\nbottom_y = player.bottom # 下边缘y坐标",
      example: {
        title: '查看边缘坐标',
        code: "player = Actor('player')\nplayer.pos = (400, 300)\n\nprint(f'中心点: {player.pos}')\nprint(f'左边缘: {player.left}')\nprint(f'右边缘: {player.right}')\nprint(f'上边缘: {player.top}')\nprint(f'下边缘: {player.bottom}')",
        output: '显示角色的中心点和四个边缘坐标',
        explanation: '边缘坐标是只读的，根据中心点和图片大小自动计算。'
      },
      practice: [
        {
          question: 'player.left表示什么？',
          answer: '角色左边缘的x坐标'
        },
        {
          question: 'player.top表示什么？',
          answer: '角色上边缘的y坐标'
        }
      ]
    },

    medium: {
      story: '知道边缘坐标有什么用？可以检测角色是否超出屏幕、是否对齐、精确碰撞等等！',
      concept: '边缘坐标主要用于：1.边界检测 2.角色对齐 3.精确碰撞 4.相对定位。比用中心点pos计算更方便。',
      syntax: "# 边界检测\nif player.right > WIDTH:\n    player.x = WIDTH - player.width/2\n\n# 角色对齐\nbrick2.left = brick1.right  # 紧挨着放\n\n# 精确位置\nplayer.bottom = ground.top  # 站在地面上",
      example: {
        title: '站在平台上',
        code: "ground = Actor('ground')\nground.pos = (400, 550)\n\nplayer = Actor('player')\nplayer.bottom = ground.top  # 玩家站在地面上\nplayer.x = 400",
        output: '玩家正好站在地面上，不会陷进去或飘在空中',
        explanation: 'player.bottom = ground.top 让玩家下边缘对齐地面上边缘。'
      },
      practice: [
        {
          question: '如何让两个角色左右紧挨着？',
          answer: 'b.left = a.right'
        },
        {
          question: '如何检测角色是否超出右边界？',
          answer: 'if player.right > WIDTH'
        }
      ]
    },

    hard: {
      story: '高级技巧！边缘坐标可以设置，设置后会自动更新中心点pos，实现精确移动！',
      concept: '边缘属性是可读可写的。设置边缘坐标后，角色的中心点pos会自动更新。这在需要对齐的场景非常方便。',
      syntax: "# 设置边缘坐标（会自动更新pos）\nplayer.left = 0     # 左边缘对齐到0\nplayer.right = WIDTH  # 右边缘对齐到宽度\nplayer.top = 0      # 上边缘对齐到0\nplayer.bottom = HEIGHT  # 下边缘对齐到高度\n\n# 读取和设置都行\nx = player.left  # 读取\nplayer.left = 100  # 设置",
      example: {
        title: '精确边界控制',
        code: "def update():\n    # 键盘控制移动\n    if keyboard.left:\n        player.x -= 5\n    if keyboard.right:\n        player.x += 5\n    \n    # 边界限制：不让角色超出屏幕\n    if player.left < 0:\n        player.left = 0\n    if player.right > WIDTH:\n        player.right = WIDTH",
        output: '角色不会超出屏幕左右边界',
        explanation: '用left和right设置边界，比用x计算更直观。'
      },
      practice: [
        {
          question: '设置player.left = 100会发生什么？',
          answer: '角色左边缘移到x=100，pos自动更新'
        },
        {
          question: '边缘坐标和中心点坐标有什么关系？',
          answer: '设置边缘会自动更新中心点，它们是联动的'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: 'left和right左右边缘',
    emoji: '↔️',
    gradeLevel: '3-4',
    summary: '获取和设置角色的水平边缘坐标',

    easy: {
      story: 'left是角色最左边的x坐标，right是最右边的x坐标。就像你的左手和右手的位置！',
      concept: 'left和right分别表示角色左右边缘的x坐标。left < x < right，x是中心点。角色宽度 = right - left。',
      syntax: "# left和right的关系\n# left = x - 宽度/2\n# right = x + 宽度/2\n# right - left = 角色宽度\n\nprint(player.left)   # 左边缘x\nprint(player.right)  # 右边缘x\nprint(player.right - player.left)  # 宽度",
      example: {
        title: '查看左右边缘',
        code: "player = Actor('alien')\nplayer.pos = (400, 300)\n\nprint(f'左边缘: {player.left}')\nprint(f'中心x: {player.x}')\nprint(f'右边缘: {player.right}')\nprint(f'宽度: {player.right - player.left}')",
        output: '显示左边缘、中心、右边缘和宽度',
        explanation: '中心点在左右边缘的中间。'
      },
      practice: [
        {
          question: '如果角色宽度是60，中心x=100，left是多少？',
          answer: '70 (100-30)'
        },
        {
          question: 'right一定比left大吗？',
          answer: '是的，right - left = 宽度，宽度一定为正'
        }
      ]
    },

    medium: {
      story: '用left和right可以轻松实现角色左右对齐、紧挨着排放、边界检测等功能！',
      concept: 'left和right常用于：1.检测左右边界 2.让角色紧挨着排列 3.水平对齐 4.计算角色宽度。',
      syntax: "# 边界检测\nif player.left < 0:\n    player.left = 0  # 左边界\n\nif player.right > WIDTH:\n    player.right = WIDTH  # 右边界\n\n# 紧挨排列\nbrick2.left = brick1.right  # brick2在brick1右边\nbrick3.left = brick2.right  # brick3在brick2右边",
      example: {
        title: '角色不能超出屏幕',
        code: "def update():\n    if keyboard.left:\n        player.x -= 5\n    if keyboard.right:\n        player.x += 5\n    \n    # 限制在屏幕内\n    if player.left < 0:\n        player.left = 0\n    if player.right > WIDTH:\n        player.right = WIDTH",
        output: '角色移动不会超出左右边界',
        explanation: '用left和right设置边界比用x更直观。'
      },
      practice: [
        {
          question: '如何让brick2排在brick1的右边紧挨着？',
          answer: 'brick2.left = brick1.right'
        },
        {
          question: '检测角色是否碰到左边界用什么？',
          answer: 'if player.left <= 0'
        }
      ]
    },

    hard: {
      story: '高级技巧！用left和right可以实现"推进器"效果，角色被墙推动而不是穿过墙！',
      concept: '在平台游戏中，角色撞墙时应该停在墙边而不是穿过。用left和right可以精确控制角色位置，实现真实的碰撞效果。',
      syntax: "# 墙壁碰撞处理\nwall_left = 100\nwall_right = 200\n\n# 角色从左撞墙\nif player.right > wall_left and player.left < wall_left:\n    player.right = wall_left  # 停在墙左边\n\n# 角色从右撞墙\nif player.left < wall_right and player.right > wall_right:\n    player.left = wall_right  # 停在墙右边",
      example: {
        title: '墙壁碰撞',
        code: "wall = Actor('wall')\nwall.pos = (400, 300)\n\ndef update():\n    if keyboard.right:\n        player.x += 5\n    \n    # 从左边撞墙，停在墙左边缘\n    if player.right > wall.left and player.x < wall.x:\n        player.right = wall.left",
        output: '角色从左边撞墙时会停下，不会穿过',
        explanation: '检测碰撞后用right设置位置，让角色停在墙边。'
      },
      practice: [
        {
          question: '角色撞墙后应该怎么处理位置？',
          answer: '将角色的边缘设置为墙的边缘'
        },
        {
          question: '为什么要用left/right而不是x？',
          answer: '更直观，不需要计算半个宽度'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: 'top和bottom上下边缘',
    emoji: '↕️',
    gradeLevel: '3-4',
    summary: '获取和设置角色的垂直边缘坐标',

    easy: {
      story: 'top是角色最上面的y坐标，bottom是最下面的y坐标。想象角色的头顶和脚底的位置！',
      concept: 'top和bottom分别表示角色上下边缘的y坐标。在屏幕坐标系中，y向下为正，所以top < bottom。',
      syntax: "# top和bottom的关系\n# top = y - 高度/2\n# bottom = y + 高度/2\n# bottom - top = 角色高度\n\nprint(player.top)     # 上边缘y\nprint(player.bottom)  # 下边缘y\nprint(player.bottom - player.top)  # 高度",
      example: {
        title: '查看上下边缘',
        code: "player = Actor('alien')\nplayer.pos = (400, 300)\n\nprint(f'上边缘: {player.top}')\nprint(f'中心y: {player.y}')\nprint(f'下边缘: {player.bottom}')\nprint(f'高度: {player.bottom - player.top}')",
        output: '显示上边缘、中心、下边缘和高度',
        explanation: '中心点在上下边缘的中间。屏幕y向下为正。'
      },
      practice: [
        {
          question: 'top比bottom大还是小？',
          answer: 'top < bottom（y向下为正）'
        },
        {
          question: '如何获取角色高度？',
          answer: 'bottom - top'
        }
      ]
    },

    medium: {
      story: '在平台跳跃游戏中，top和bottom非常重要！用来检测踩在平台上、头顶撞天花板、掉出屏幕等！',
      concept: 'top和bottom常用于：1.检测是否站在平台上 2.检测头顶碰撞 3.检测是否掉出屏幕 4.垂直对齐。',
      syntax: "# 站在平台上\nif player.bottom >= platform.top:\n    if player.bottom <= platform.top + 10:  # 接近平台顶部\n        player.bottom = platform.top  # 站稳\n        on_ground = True\n\n# 检测掉出屏幕\nif player.top > HEIGHT:\n    game_over()\n\n# 检测头顶撞天花板\nif player.top <= 0:\n    player.top = 0",
      example: {
        title: '站在平台上',
        code: "platform = Actor('platform')\nplatform.pos = (400, 500)\n\nplayer = Actor('player')\nplayer.bottom = platform.top  # 玩家站在平台上\nplayer.x = 400",
        output: '玩家正好站在平台表面',
        explanation: 'player.bottom = platform.top让玩家下边缘对齐平台上边缘。'
      },
      practice: [
        {
          question: '如何让玩家站在平台上？',
          answer: 'player.bottom = platform.top'
        },
        {
          question: '如何检测玩家掉出屏幕底部？',
          answer: 'if player.top > HEIGHT'
        }
      ]
    },

    hard: {
      story: '高级技巧！用top和bottom可以实现完整的平台跳跃物理效果，包括重力、跳跃、落地检测！',
      concept: '结合速度变量和top/bottom属性，可以实现：重力下落、跳跃上升、落地检测、平台碰撞等完整的跳跃系统。',
      syntax: "velocity_y = 0\ngravity = 0.5\non_ground = False\n\ndef update():\n    global velocity_y, on_ground\n    \n    # 重力\n    velocity_y += gravity\n    player.y += velocity_y\n    \n    # 平台碰撞检测\n    for plat in platforms:\n        if player.bottom >= plat.top:\n            if player.bottom <= plat.top + velocity_y:\n                player.bottom = plat.top\n                velocity_y = 0\n                on_ground = True",
      example: {
        title: '完整的跳跃系统',
        code: "velocity_y = 0\n\ndef update():\n    global velocity_y\n    \n    # 重力下落\n    velocity_y += 0.5\n    player.y += velocity_y\n    \n    # 站在平台上\n    for plat in platforms:\n        if player.colliderect(plat):\n            if velocity_y > 0:  # 下落中\n                player.bottom = plat.top\n                velocity_y = 0\n    \n    # 跳跃\n    if keyboard.space and on_ground:\n        velocity_y = -12",
        output: '玩家可以跳跃并站在平台上',
        explanation: '用bottom对齐平台top，实现精确落地。'
      },
      practice: [
        {
          question: '跳跃时velocity_y应该是正还是负？',
          answer: '负值（y向上为负方向）'
        },
        {
          question: '检测落地时应该比较什么？',
          answer: 'player.bottom和platform.top'
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
    mathConcept: '边缘属性',
    question: 'player.left表示什么？',
    options: [
      '角色的宽度',
      '角色左边缘的x坐标',
      '角色中心点的x坐标',
      '角色距离左边的距离'
    ],
    answer: 1,
    explanation: 'left是角色左边缘的x坐标，是只读属性，自动根据中心点和图片宽度计算。',
    hint: 'left就是左边'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '边缘关系',
    question: '在屏幕坐标系中，top和bottom哪个值更大？',
    options: [
      'top更大',
      'bottom更大',
      '一样大',
      '取决于角色位置'
    ],
    answer: 1,
    explanation: '屏幕坐标系y轴向下为正，所以bottom（下边缘）的y值比top（上边缘）大。',
    hint: '想一想y轴的方向'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '对齐操作',
    question: '如何让player站在platform的表面上？',
    options: [
      'player.y = platform.y',
      'player.top = platform.bottom',
      'player.bottom = platform.top',
      'player.bottom = platform.bottom'
    ],
    answer: 2,
    explanation: 'player.bottom = platform.top让玩家的下边缘对齐平台的上边缘，正好站在平台上。',
    hint: '玩家的脚底对齐平台顶部'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '边界检测',
    question: '检测角色是否超出右边界应该用什么条件？',
    options: [
      'if player.x > WIDTH',
      'if player.right > WIDTH',
      'if player.left > WIDTH',
      'if player.right > 0'
    ],
    answer: 1,
    explanation: 'player.right是角色右边缘的x坐标，当它大于WIDTH时表示右边缘超出了屏幕右边界。',
    hint: '用右边缘检测右边界'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '坐标计算',
    question: '角色宽度是60像素，player.x = 400，player.left是多少？',
    options: [
      '400',
      '460',
      '370',
      '340'
    ],
    answer: 2,
    explanation: 'left = x - 宽度/2 = 400 - 60/2 = 400 - 30 = 370。',
    hint: '左边缘 = 中心 - 半个宽度'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '碰撞处理',
    question: '执行player.left = 100后，player.x会变成多少？（角色宽度60）',
    options: [
      '100',
      '130',
      '160',
      '不变'
    ],
    answer: 1,
    explanation: '设置left后会自动更新中心点。x = left + 宽度/2 = 100 + 30 = 130。',
    hint: '中心点会随着边缘自动更新'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L14-3',
  title: '云端探险家',
  subtitle: '学会角色边缘坐标属性',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解角色的left/right/top/bottom属性',
    '能用边缘坐标进行边界检测',
    '实现角色精确对齐和定位',
    '能用边缘坐标实现平台跳跃'
  ],
  prerequisites: [
    'L13 Pygame Zero基础',
    '坐标系统概念',
    '基本的碰撞检测'
  ]
}

// 打字练习单词（按难度分组，纯英文）
export const typingWords = {
  easy: ['top', 'left', 'brick', 'side'],
  medium: ['bottom', 'right', 'edge', 'ground'],
  hard: ['align', 'platform', 'collision', 'boundary']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'player.left',
    'player.right',
    'player.top',
    'player.bottom'
  ],
  medium: [
    'if player.right > WIDTH:',
    'player.bottom = platform.top',
    'brick2.left = brick1.right',
    'if player.top > HEIGHT:'
  ],
  hard: [
    'if player.left < 0:\n    player.left = 0',
    'if player.colliderect(plat):\n    if velocity_y > 0:\n        player.bottom = plat.top',
    'player.right = wall.left  # 从左撞墙停下'
  ]
}

// 导出所有数据
export const L14_3_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L14_3_data
