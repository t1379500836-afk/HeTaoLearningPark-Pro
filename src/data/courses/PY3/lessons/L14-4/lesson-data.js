/**
 * PY3 课程 L14-4: 云端探险家进阶
 *
 * 核心知识点:
 * 1. 尖刺踏板与游戏结束
 * 2. 计分系统
 * 3. 移动踏板与难度升级
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'direction',
    pronunciation: "[da'rekJan]",
    partOfSpeech: 'n.',
    meaning: '方向；方位；说明',
    level: 'easy',
    example: 'There are two directions, left and right.',
    exampleTranslation: '有两个方向，左和右。',
    note: '游戏中的移动方向',
    source: 'ocr'
  },
  {
    word: 'speed',
    pronunciation: '[spi:d]',
    partOfSpeech: 'n./v.',
    meaning: '速度；加速',
    level: 'easy',
    example: 'You travel at the speed of light?',
    exampleTranslation: '你用光的速度旅行？',
    note: '游戏难度可通过速度控制',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'spike',
    pronunciation: '[spaik]',
    partOfSpeech: 'n.',
    meaning: '尖刺；钉子',
    level: 'medium',
    example: 'Watch out for the spikes!',
    exampleTranslation: '小心尖刺！',
    note: '尖刺踏板',
    source: 'extended'
  },
  {
    word: 'score',
    pronunciation: '[sko:r]',
    partOfSpeech: 'n./v.',
    meaning: '分数；得分',
    level: 'medium',
    example: 'What is your score?',
    exampleTranslation: '你的分数是多少？',
    note: '',
    source: 'extended'
  },
  {
    word: 'difficulty',
    pronunciation: "['difikalti]",
    partOfSpeech: 'n.',
    meaning: '困难；难度',
    level: 'hard',
    example: 'The difficulty increases over time.',
    exampleTranslation: '难度随时间增加。',
    note: '',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '尖刺踏板与游戏结束',
    emoji: '⚠️',
    gradeLevel: '3-4',
    summary: '实现危险的尖刺踏板和游戏结束逻辑',

    easy: {
      story: '在云端探险游戏中，不是所有踏板都是安全的！尖刺踏板碰到就会游戏结束，要小心避开！',
      concept: '尖刺踏板是一种特殊的障碍物，用不同图片表示。玩家碰到尖刺踏板时游戏结束，需要切换到结束状态。',
      syntax: "# 创建尖刺踏板\nspike = Actor('spike_platform')\n\n# 检测碰撞\nif player.colliderect(spike):\n    game_over = True\n    player.image = 'player_hurt'  # 换成受伤图片",
      example: {
        title: '尖刺踏板检测',
        code: "platforms = []\nspike_platforms = []\n\ndef update():\n    # 检测普通踏板\n    for plat in platforms:\n        if player.colliderect(plat):\n            player.bottom = plat.top\n    \n    # 检测尖刺踏板\n    for spike in spike_platforms:\n        if player.colliderect(spike):\n            state = 'game_over'",
        output: '碰到普通踏板站稳，碰到尖刺踏板游戏结束',
        explanation: '用不同的列表管理不同类型的踏板，分别处理碰撞逻辑。'
      },
      practice: [
        {
          question: '尖刺踏板和普通踏板有什么区别？',
          answer: '尖刺踏板碰到会游戏结束'
        },
        {
          question: '如何区分普通踏板和尖刺踏板？',
          answer: '用不同的图片或不同的列表管理'
        }
      ]
    },

    medium: {
      story: '随机出现尖刺踏板！让游戏更加刺激，玩家需要快速判断踏板类型并做出反应！',
      concept: '在生成踏板时，用random随机决定是普通踏板还是尖刺踏板。可以设置一定比例，比如30%概率是尖刺。',
      syntax: "import random\n\ndef spawn_platform():\n    # 随机决定类型\n    if random.random() < 0.3:  # 30%概率\n        plat = Actor('spike')\n        spike_platforms.append(plat)\n    else:\n        plat = Actor('platform')\n        platforms.append(plat)",
      example: {
        title: '随机生成尖刺',
        code: "import random\n\nplatforms = []\nspikes = []\n\ndef spawn_platform():\n    x = random.randint(50, 750)\n    y = random.randint(-100, -50)\n    \n    # 25%概率是尖刺\n    if random.random() < 0.25:\n        plat = Actor('spike')\n        spikes.append(plat)\n    else:\n        plat = Actor('platform')\n        platforms.append(plat)\n    \n    plat.pos = (x, y)",
        output: '生成踏板时25%概率是尖刺',
        explanation: 'random.random()返回0-1之间的随机数，小于0.25的概率是25%。'
      },
      practice: [
        {
          question: '如何让尖刺踏板30%概率出现？',
          answer: 'if random.random() < 0.3'
        },
        {
          question: '为什么要分开管理普通踏板和尖刺踏板？',
          answer: '碰撞处理逻辑不同'
        }
      ]
    },

    hard: {
      story: '完整的游戏结束流程！碰到尖刺后显示游戏结束画面，显示最终分数，可以重新开始！',
      concept: '游戏结束需要：1.切换状态 2.停止定时器 3.显示结束画面 4.保存分数 5.提供重新开始选项。',
      syntax: "state = 'playing'\nscore = 0\n\ndef game_over():\n    global state\n    state = 'game_over'\n    # 停止所有定时器\n    clock.unschedule(spawn_timer)\n    # 可以保存最高分\n    save_high_score(score)\n\ndef draw():\n    if state == 'playing':\n        draw_game()\n    elif state == 'game_over':\n        draw_game_over()",
      example: {
        title: '完整游戏结束',
        code: "state = 'playing'\nfinal_score = 0\n\ndef check_spike_collision():\n    global state, final_score\n    for spike in spikes:\n        if player.colliderect(spike):\n            state = 'game_over'\n            final_score = score\n            player.image = 'player_hurt'\n\ndef draw():\n    if state == 'playing':\n        draw_game()\n    elif state == 'game_over':\n        screen.draw.text('GAME OVER', (350, 250), fontsize=60)\n        screen.draw.text(f'Score: {final_score}', (370, 320))\n        screen.draw.text('Press R to restart', (330, 380))",
        output: '碰到尖刺显示游戏结束画面',
        explanation: '用state变量控制游戏状态，结束时不更新游戏但显示结束画面。'
      },
      practice: [
        {
          question: '游戏结束需要做什么？',
          answer: '切换状态、停止定时器、显示结束画面'
        },
        {
          question: '如何在游戏结束后重新开始？',
          answer: '按R键重置所有变量，state设为playing'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '计分系统',
    emoji: '🏆',
    gradeLevel: '3-4',
    summary: '实现游戏分数的计算和显示',

    easy: {
      story: '玩游戏要记分！坚持越久分数越高，每秒增加一定分数，挑战自己的最高纪录！',
      concept: '用全局变量score记录分数，用定时器每秒增加分数。屏幕上用screen.draw.text()显示当前分数。',
      syntax: "score = 0\n\ndef add_score():\n    global score\n    score += 10  # 每次加10分\n\n# 每秒增加分数\nclock.schedule_interval(add_score, 1)\n\n# 显示分数\nscreen.draw.text(f'Score: {score}', (10, 10))",
      example: {
        title: '简单的计分',
        code: "score = 0\n\ndef add_score():\n    global score\n    score += 1\n\ndef draw():\n    screen.draw.text(f'Score: {score}', (10, 10), color='white')\n\n# 每秒加1分\nclock.schedule_interval(add_score, 1)",
        output: '屏幕左上角显示分数，每秒增加1',
        explanation: '用定时器定期增加分数，draw函数显示当前值。'
      },
      practice: [
        {
          question: '分数应该用什么类型的变量？',
          answer: '全局变量（global）'
        },
        {
          question: '每秒加60分应该怎么设置定时器？',
          answer: '每秒调用函数，函数内score += 60'
        }
      ]
    },

    medium: {
      story: '云端探险家的规则：每坚持1秒，获得60分！还可以踩到金币获得额外分数！',
      concept: '计分规则可以多样化：时间分数、收集分数、击杀分数等。每秒60分意味着每帧(60fps)加1分更平滑。',
      syntax: "# 方法1：每秒加60分\ndef add_score():\n    global score\n    score += 60\n\nclock.schedule_interval(add_score, 1)\n\n# 方法2：每帧加1分（更平滑）\ndef update():\n    global score\n    if state == 'playing':\n        score += 1  # 60fps下每秒加60",
      example: {
        title: '每秒60分',
        code: "score = 0\n\ndef update():\n    global score\n    if state == 'playing':\n        score += 1  # 60帧/秒，每帧加1=每秒60分\n\ndef draw():\n    screen.draw.text(f'Score: {score}', (10, 10), fontsize=30, color='white')",
        output: '分数持续平滑增加，每秒约60分',
        explanation: '在update中每帧加1分，比定时器更平滑。'
      },
      practice: [
        {
          question: '为什么用update每帧加1分更好？',
          answer: '分数增加更平滑，不会突然跳变'
        },
        {
          question: '如何在游戏结束时停止计分？',
          answer: '判断state变量，只有playing时才加分'
        }
      ]
    },

    hard: {
      story: '高级计分系统！包括：实时分数、最高分记录、分数倍率、连击加成等高级功能！',
      concept: '完整的计分系统包括：当前分数、最高分（保存到文件）、分数显示（可能有动画效果）、分数倍率（难度加成）等。',
      syntax: "# 完整计分系统\nscore = 0\nhigh_score = 0\nmultiplier = 1\n\ndef add_score(points):\n    global score\n    score += points * multiplier\n\ndef load_high_score():\n    global high_score\n    # 从文件读取最高分\n    try:\n        with open('highscore.txt', 'r') as f:\n            high_score = int(f.read())\n    except:\n        high_score = 0\n\ndef save_high_score():\n    global high_score\n    if score > high_score:\n        high_score = score\n        with open('highscore.txt', 'w') as f:\n            f.write(str(high_score))",
      example: {
        title: '带最高分的计分',
        code: "score = 0\nhigh_score = 0\n\ndef draw():\n    screen.draw.text(f'Score: {score}', (10, 10), color='white')\n    screen.draw.text(f'Best: {high_score}', (10, 40), color='yellow')\n\ndef game_over():\n    global high_score\n    if score > high_score:\n        high_score = score\n        print('New high score!')",
        output: '显示当前分数和最高分，打破纪录时有提示',
        explanation: '游戏结束时比较并更新最高分。'
      },
      practice: [
        {
          question: '如何保存最高分到下次游戏？',
          answer: '写入文件保存，游戏开始时读取'
        },
        {
          question: '什么是分数倍率？',
          answer: '实际得分 = 基础分 × 倍率'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '移动踏板与难度升级',
    emoji: '📈',
    gradeLevel: '3-4',
    summary: '让踏板左右移动，游戏难度随时间增加',

    easy: {
      story: '有些踏板是活动的！它们会左右移动，玩家需要把握时机跳上去！',
      concept: '移动踏板有方向和速度属性。在update中更新它的x坐标，到达边界后反向移动。',
      syntax: "# 创建移动踏板\nplat = Actor('platform')\nplat.direction = 1  # 1向右，-1向左\nplat.speed = 2  # 移动速度\n\n# 更新位置\ndef update():\n    plat.x += plat.direction * plat.speed\n    \n    # 到边界反向\n    if plat.right > WIDTH or plat.left < 0:\n        plat.direction *= -1",
      example: {
        title: '简单的移动踏板',
        code: "moving_plat = Actor('platform')\nmoving_plat.pos = (400, 400)\nmoving_plat.direction = 1\nmoving_plat.speed = 3\n\ndef update():\n    moving_plat.x += moving_plat.direction * moving_plat.speed\n    \n    if moving_plat.right > WIDTH:\n        moving_plat.direction = -1\n    if moving_plat.left < 0:\n        moving_plat.direction = 1",
        output: '踏板在屏幕左右之间来回移动',
        explanation: 'direction控制方向，speed控制速度，到边界时反向。'
      },
      practice: [
        {
          question: '如何让踏板移动方向反转？',
          answer: 'direction *= -1'
        },
        {
          question: '如何检测踏板是否到达右边界？',
          answer: 'if plat.right > WIDTH'
        }
      ]
    },

    medium: {
      story: '有些踏板移动，有些不移动！用随机方式决定，让游戏更加多样有趣！',
      concept: '在生成踏板时随机决定是否可移动。用列表管理所有踏板，遍历时根据属性决定是否更新位置。',
      syntax: "platforms = []\n\ndef spawn_platform():\n    plat = Actor('platform')\n    plat.pos = (x, y)\n    \n    # 随机决定是否移动\n    if random.random() < 0.3:  # 30%概率移动\n        plat.moving = True\n        plat.direction = random.choice([-1, 1])\n        plat.speed = random.randint(1, 3)\n    else:\n        plat.moving = False\n    \n    platforms.append(plat)",
      example: {
        title: '随机移动踏板',
        code: "platforms = []\n\ndef spawn_platform():\n    plat = Actor('platform')\n    plat.pos = (random.randint(50, 750), -50)\n    \n    # 30%概率是移动踏板\n    plat.moving = random.random() < 0.3\n    if plat.moving:\n        plat.direction = random.choice([-1, 1])\n        plat.speed = random.randint(2, 4)\n    \n    platforms.append(plat)\n\ndef update():\n    for plat in platforms:\n        if plat.moving:\n            plat.x += plat.direction * plat.speed\n            if plat.right > WIDTH or plat.left < 0:\n                plat.direction *= -1",
        output: '生成踏板时30%概率会左右移动',
        explanation: '用moving属性标记是否移动，遍历时只更新移动的踏板。'
      },
      practice: [
        {
          question: '如何让移动踏板方向随机？',
          answer: 'random.choice([-1, 1])'
        },
        {
          question: '为什么用plat.moving标记？',
          answer: '方便区分哪些踏板需要移动更新'
        }
      ]
    },

    hard: {
      story: '难度升级！随着时间推移，踏板移动越来越快，游戏越来越难！挑战你的极限！',
      concept: '难度升级可以通过：增加移动速度、增加尖刺比例、减少踏板数量、增加下落速度等。用全局变量控制难度系数。',
      syntax: "difficulty = 1  # 难度系数\n\ndef increase_difficulty():\n    global difficulty\n    difficulty += 0.1  # 每次增加10%\n\ndef update():\n    for plat in platforms:\n        if plat.moving:\n            # 速度受难度影响\n            plat.x += plat.direction * plat.speed * difficulty",
      example: {
        title: '难度递增系统',
        code: "difficulty = 1.0\n\ndef increase_difficulty():\n    global difficulty\n    difficulty += 0.1\n    print(f'Difficulty: {difficulty:.1f}')\n\ndef spawn_platform():\n    plat = Actor('platform')\n    # 速度受难度影响\n    plat.speed = 2 * difficulty\n    # 尖刺概率随难度增加\n    spike_chance = 0.2 + difficulty * 0.05\n    if random.random() < spike_chance:\n        plat.type = 'spike'\n    platforms.append(plat)\n\n# 每30秒增加难度\nclock.schedule_interval(increase_difficulty, 30)",
        output: '每30秒难度增加，速度和尖刺概率提升',
        explanation: '用difficulty变量影响各种参数，实现整体难度提升。'
      },
      practice: [
        {
          question: '难度升级可以通过哪些方式实现？',
          answer: '增加速度、增加尖刺比例、减少踏板等'
        },
        {
          question: '如何让难度平滑增加？',
          answer: '用小数增加difficulty，如每次+0.1'
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
    mathConcept: '踏板类型',
    question: '尖刺踏板和普通踏板的主要区别是什么？',
    options: [
      '外观不同',
      '尖刺踏板会移动',
      '碰到尖刺踏板游戏结束',
      '尖刺踏板分数更高'
    ],
    answer: 2,
    explanation: '尖刺踏板是危险障碍物，玩家碰到后游戏结束。普通踏板是安全的，可以站立。',
    hint: '尖刺是危险的'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '计分基础',
    question: '在update函数中每帧加1分，60fps下每秒增加多少分？',
    options: [
      '1分',
      '30分',
      '60分',
      '100分'
    ],
    answer: 2,
    explanation: '60fps意味着每秒执行60次update，每次加1分，所以每秒加60分。',
    hint: 'fps是每秒帧数'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '随机生成',
    question: '如何让尖刺踏板25%概率出现？',
    options: [
      'if random.random() == 0.25',
      'if random.random() < 0.25',
      'if random.random() > 0.25',
      'if random.randint(1, 4) == 4'
    ],
    answer: 1,
    explanation: 'random.random()返回0-1之间的随机小数，小于0.25的概率是25%。',
    hint: '用小于号判断概率'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '移动逻辑',
    question: '如何让踏板到达右边界时向左移动？',
    options: [
      'if plat.right > WIDTH: plat.direction = -1',
      'if plat.right > WIDTH: plat.speed = -1',
      'if plat.x > WIDTH: plat.direction = -1',
      'if plat.right > WIDTH: plat.x = WIDTH'
    ],
    answer: 0,
    explanation: '当右边缘超出WIDTH时，将direction设为-1表示向左移动。用speed控制速度大小。',
    hint: '改变方向而不是速度'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '难度计算',
    question: '基础速度是2，难度系数从1.0增加到1.5，实际速度是多少？',
    options: [
      '2',
      '2.5',
      '3',
      '3.5'
    ],
    answer: 2,
    explanation: '实际速度 = 基础速度 × 难度系数 = 2 × 1.5 = 3。',
    hint: '实际速度 = 基础 × 系数'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合应用',
    question: '游戏结束时需要做什么？以下哪项不是必须的？',
    options: [
      '切换状态到game_over',
      '停止定时器',
      '显示结束画面',
      '关闭游戏窗口'
    ],
    answer: 3,
    explanation: '游戏结束时不应该关闭窗口，而是显示结束画面让玩家可以选择重玩。关闭窗口会直接退出程序。',
    hint: '玩家可能想再玩一次'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L14-4',
  title: '云端探险家进阶',
  subtitle: '完善游戏：尖刺、计分、移动踏板、难度升级',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '实现尖刺踏板和游戏结束逻辑',
    '掌握计分系统的实现方法',
    '学会让踏板左右移动',
    '能用难度系数控制游戏难度'
  ],
  prerequisites: [
    'L14-1 clock定时器',
    'L14-3 角色边缘坐标',
    'Pygame Zero基础'
  ]
}

// 打字练习单词（按难度分组，纯英文）
export const typingWords = {
  easy: ['speed', 'score', 'spike', 'move'],
  medium: ['direction', 'difficulty', 'random', 'chance'],
  hard: ['platform', 'collision', 'multiplier', 'increase']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'score += 1',
    'if player.colliderect(spike):',
    'plat.direction = -1',
    'state = "game_over"'
  ],
  medium: [
    'if random.random() < 0.3:\n    plat.type = "spike"',
    'plat.x += plat.direction * plat.speed',
    'if plat.right > WIDTH:\n    plat.direction = -1',
    'difficulty += 0.1'
  ],
  hard: [
    'if state == "playing":\n    score += 1\nelif state == "game_over":\n    draw_game_over()',
    'def increase_difficulty():\n    global difficulty\n    difficulty += 0.1\n    spike_chance = 0.2 + difficulty * 0.05',
    'if plat.moving:\n    plat.x += plat.direction * plat.speed * difficulty\n    if plat.right > WIDTH or plat.left < 0:\n        plat.direction *= -1'
  ]
}

// 导出所有数据
export const L14_4_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L14_4_data
