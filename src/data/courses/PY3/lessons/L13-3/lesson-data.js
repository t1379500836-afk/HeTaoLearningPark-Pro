/**
 * PY3 课程 L13-3: 疯狂躲猫猫
 *
 * 核心知识点:
 * 1. collidepoint() 点碰撞检测
 * 2. colliderect() 矩形碰撞检测
 * 3. 全局变量与游戏状态
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'begin',
    pronunciation: "[bi'gin]",
    partOfSpeech: 'v.',
    meaning: '开始；着手',
    level: 'easy',
    example: 'Let us begin the game.',
    exampleTranslation: '让我们开始游戏吧。',
    note: '',
    source: 'ocr'
  },
  {
    word: 'point',
    pronunciation: '[point]',
    partOfSpeech: 'n./v.',
    meaning: '点；要点；指向',
    level: 'easy',
    example: 'Point to the target.',
    exampleTranslation: '指向目标。',
    note: '',
    source: 'ocr'
  },
  {
    word: 'state',
    pronunciation: '[steit]',
    partOfSpeech: 'n./v.',
    meaning: '状态；国家；陈述',
    level: 'medium',
    example: 'The game state is running.',
    exampleTranslation: '游戏状态是运行中。',
    note: '',
    source: 'ocr'
  },
  {
    word: 'global',
    pronunciation: "['gloubl]",
    partOfSpeech: 'adj.',
    meaning: '全球的；全面的',
    level: 'medium',
    example: 'This is a global variable.',
    exampleTranslation: '这是一个全局变量。',
    note: '',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'detect',
    pronunciation: "[di'tekt]",
    partOfSpeech: 'v.',
    meaning: '检测；发现',
    level: 'hard',
    example: 'Detect the collision.',
    exampleTranslation: '检测碰撞。',
    note: '',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: 'collidepoint() 点碰撞检测',
    emoji: '👆',
    gradeLevel: '3-4',
    summary: '检测一个点是否在角色范围内',

    easy: {
      story: '玩捉迷藏时，你用手指指向一个地方，判断手指是否指到了藏身的位置。collidepoint就是检测一个点是否"指到"了角色！',
      concept: 'collidepoint(pos)检测一个坐标点是否在角色的图片范围内。pos是一个(x, y)坐标元组，通常用于检测鼠标点击位置。',
      syntax: '# 检测鼠标点击是否在角色上\nif actor.collidepoint(pos):\n    print("点击到了！")\n\n# 在鼠标点击事件中使用\ndef on_mouse_down(pos):\n    if button.collidepoint(pos):\n        开始游戏()',
      example: {
        title: '点击开始按钮',
        code: "def on_mouse_down(pos):\n    if start_button.collidepoint(pos):\n        print('游戏开始！')\n        # 切换到游戏运行状态",
        output: '点击开始按钮时显示"游戏开始！"',
        explanation: 'pos是鼠标点击的位置，collidepoint检测这个点是否在按钮角色上。'
      },
      practice: [
        {
          question: 'collidepoint的参数pos是什么？',
          answer: '一个坐标点(x, y)'
        },
        {
          question: 'collidepoint通常用于检测什么？',
          answer: '鼠标点击位置是否在角色上'
        }
      ]
    },

    medium: {
      story: '在躲猫猫游戏中，鼠标位置代表你的手指，只有当鼠标精确地指到角色时才算"找到"了它！',
      concept: 'collidepoint适合精确点击检测，比如点击按钮、点击小物体。与colliderect不同，它只检测一个点，更加精准。',
      syntax: '# 遍历多个角色，检测点击了哪个\ndef on_mouse_down(pos):\n    for cat in cats:\n        if cat.collidepoint(pos):\n            print("找到一只猫！")\n            score += 1',
      example: {
        title: '躲猫猫点击检测',
        code: "cats = []  # 猫咪列表\nfound = []   # 已找到的猫\n\ndef on_mouse_down(pos):\n    for cat in cats:\n        if cat.collidepoint(pos) and cat not in found:\n            found.append(cat)\n            sounds.meow.play()  # 播放猫叫",
        output: '点击猫咪时播放猫叫声音',
        explanation: '遍历所有猫咪，检测点击位置是否在猫咪上，避免重复点击。'
      },
      practice: [
        {
          question: 'collidepoint和colliderect有什么区别？',
          answer: 'collidepoint检测点，colliderect检测矩形区域'
        },
        {
          question: '为什么躲猫猫用collidepoint更合适？',
          answer: '鼠标是一个点，需要精确点击检测'
        }
      ]
    },

    hard: {
      story: '高级应用！在木琴游戏中，木槌头跟随鼠标，需要精确检测槌头是否"敲到"了琴键，collidepoint是最佳选择！',
      concept: 'collidepoint可以用于任何需要精确点击的场景。配合状态变量，可以实现复杂的交互逻辑，如点击选择、点击消除等。',
      syntax: "# 精确检测鼠标位置\nhammer.pos = mouse.pos  # 木槌跟随鼠标\n\ndef on_mouse_down(pos):\n    for key in keys:\n        if key.collidepoint(pos):\n            # 只检测槌头位置，不是整个木槌\n            sounds[key.note].play()\n            break",
      example: {
        title: '木琴敲击检测',
        code: "def on_mouse_down(pos):\n    # 检测鼠标点击位置的琴键\n    for qin_key in qin_keys:\n        if qin_key.collidepoint(pos):\n            # 播放对应音符\n            sounds[qin_key.note].play()\n            break  # 只触发一个琴键",
        output: '点击琴键播放对应音符',
        explanation: 'collidepoint精确检测鼠标点，确保只触发被点击的琴键。'
      },
      practice: [
        {
          question: '如何让角色跟随鼠标？',
          answer: 'actor.pos = mouse.pos'
        },
        {
          question: '为什么要用break跳出循环？',
          answer: '确保只触发一个琴键，不继续检测'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: 'colliderect() 矩形碰撞检测',
    emoji: '📦',
    gradeLevel: '3-4',
    summary: '检测两个角色是否相撞',

    easy: {
      story: '两个纸箱碰到一起会怎样？colliderect就是检测两个"方盒子"角色是否碰到了对方！',
      concept: 'colliderect()检测两个角色的矩形边界框是否相交。每个角色都有一个看不见的矩形框，正好包围它的图片。',
      syntax: '# 检测玩家和敌人是否碰撞\nif player.colliderect(enemy):\n    print("撞到了！")\n    game_over = True',
      example: {
        title: '碰撞结束游戏',
        code: "def update():\n    if player.colliderect(enemy):\n        print('游戏结束！')",
        output: '玩家碰到敌人时显示"游戏结束！"',
        explanation: 'colliderect检测两个角色的矩形区域是否重叠，任何部分重叠都返回True。'
      },
      practice: [
        {
          question: 'colliderect检测的是什么形状？',
          answer: '矩形边界框'
        },
        {
          question: '两个角色只要有一点接触就返回True吗？',
          answer: '是的，任何重叠都返回True'
        }
      ]
    },

    medium: {
      story: '在飞机大战中，子弹和敌机都是矩形区域，用colliderect检测它们是否相撞，实现击中效果！',
      concept: 'colliderect适合检测两个移动物体之间的碰撞，如子弹击中敌人、玩家撞到障碍物等。返回True表示发生碰撞。',
      syntax: '# 检测子弹和敌机的碰撞\nfor bullet in bullets:\n    for enemy in enemies:\n        if bullet.colliderect(enemy):\n            bullets.remove(bullet)\n            enemies.remove(enemy)\n            score += 10',
      example: {
        title: '子弹击中敌机',
        code: "def update():\n    for bullet in bullets:\n        for enemy in enemies:\n            if bullet.colliderect(enemy):\n                # 碰撞！删除双方\n                bullets.remove(bullet)\n                enemies.remove(enemy)\n                score += 10\n                break",
        output: '子弹击中敌机时双方消失，分数增加',
        explanation: '双层循环检测每颗子弹和每架敌机，碰撞后删除双方。'
      },
      practice: [
        {
          question: 'colliderect返回什么类型的值？',
          answer: '布尔值（True或False）'
        },
        {
          question: '检测碰撞后通常要做什么？',
          answer: '删除碰撞的对象，更新分数等'
        }
      ]
    },

    hard: {
      story: '理解colliderect的局限性！当木槌的柄碰到琴键也会触发碰撞，这可能不是你想要的效果。这时候应该用collidepoint！',
      concept: 'colliderect检测的是整个矩形区域，可能不够精准。对于需要精确点击的场景，collidepoint更合适。要根据实际需求选择。',
      syntax: "# colliderect - 两个矩形区域\nif hammer.colliderect(key):  # 槌柄也可能触发\n    play_sound()\n\n# collidepoint - 精确的点\nif key.collidepoint(mouse.pos):  # 只有槌头点在琴键上才触发\n    play_sound()",
      example: {
        title: '选择合适的检测方法',
        code: "# 木槌敲琴键应该用collidepoint\n# 因为木槌是长条形，槌柄碰到不应触发\n\ndef on_mouse_down(pos):\n    for qin_key in qin_keys:\n        # 使用collidepoint只检测鼠标点\n        if qin_key.collidepoint(pos):\n            sounds[qin_key.note].play()\n            break",
        output: '只有槌头（鼠标）点在琴键上才发声',
        explanation: '木槌的槌柄如果碰到相邻琴键，用colliderect会误触发，collidepoint更精准。'
      },
      practice: [
        {
          question: '什么时候应该用collidepoint而不是colliderect？',
          answer: '需要精确点击检测，或者一个角色是长条形时'
        },
        {
          question: 'colliderect的缺点是什么？',
          answer: '不够精准，可能检测到不希望的区域'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '全局变量与游戏状态',
    emoji: '🌐',
    gradeLevel: '3-4',
    summary: '用全局变量控制游戏的不同状态',

    easy: {
      story: '游戏有不同的阶段：开始界面、游戏中、游戏结束。用全局变量state记录当前处于哪个阶段！',
      concept: '全局变量是在所有函数外部定义的变量，整个程序都可以访问。在Python函数中修改全局变量需要用global关键字声明。',
      syntax: '# 定义全局变量\nstate = "开始"  # 游戏状态\nscore = 0      # 分数\n\n# 在函数中读取全局变量\ndef draw():\n    if state == "开始":\n        draw_start_screen()',
      example: {
        title: '游戏状态变量',
        code: '# 游戏状态\nstate = "开始界面"\n\ndef draw():\n    if state == "开始界面":\n        draw_start()\n    elif state == "游戏中":\n        draw_game()\n    elif state == "结束":\n        draw_over()',
        output: '根据state显示不同界面',
        explanation: 'state变量控制游戏显示哪个界面。'
      },
      practice: [
        {
          question: '全局变量定义在哪里？',
          answer: '函数外部'
        },
        {
          question: 'state变量用来做什么？',
          answer: '记录游戏的当前状态'
        }
      ]
    },

    medium: {
      story: '在函数里改变全局变量的值，必须用global声明！这就像告诉Python："我要用外面的那个变量，不是创建新的"。',
      concept: '在函数内读取全局变量可以直接用，但要修改全局变量的值，必须先用global关键字声明，否则Python会创建一个同名局部变量。',
      syntax: '# 定义全局变量\nstate = "开始"\n\n# 修改全局变量需要global\ndef on_mouse_down(pos):\n    global state  # 声明使用全局变量\n    \n    if start_button.collidepoint(pos):\n        state = "游戏中"  # 修改全局变量',
      example: {
        title: '点击开始切换状态',
        code: "state = '开始'\n\ndef on_mouse_down(pos):\n    global state  # 必须加global！\n    \n    if begin_button.collidepoint(pos):\n        state = '运行'\n        print('游戏开始！')",
        output: '点击按钮后state变为"运行"',
        explanation: '没有global声明，Python会把state当作新的局部变量，不会改变全局的state。'
      },
      practice: [
        {
          question: '修改全局变量必须加什么关键字？',
          answer: 'global'
        },
        {
          question: '如果不加global会怎样？',
          answer: 'Python会创建一个同名局部变量，全局变量不变'
        }
      ]
    },

    hard: {
      story: '完整的游戏状态管理！用全局变量控制游戏的开始、运行、结束三种状态，实现完整的游戏流程！',
      concept: '游戏通常有多个状态：开始界面、游戏运行、暂停、结束等。用全局state变量配合if-elif判断，可以轻松管理复杂的游戏流程。',
      syntax: "state = '初始状态'  # 初始/运行/结束\n\ndef on_mouse_down(pos):\n    global state\n    if state == '初始状态':\n        if begin.collidepoint(pos):\n            state = '运行状态'\n    elif state == '结束状态':\n        if restart.collidepoint(pos):\n            state = '初始状态'\n            reset_game()\n\ndef update():\n    if state == '运行状态':\n        # 只有运行时才更新游戏\n        move_player()\n        check_collision()",
      example: {
        title: '完整游戏状态管理',
        code: "state = '初始状态'\n\ndef draw():\n    if state == '初始状态':\n        draw_start_screen()\n    elif state == '运行状态':\n        draw_game()\n    elif state == '结束状态':\n        draw_game_over()\n\ndef update():\n    if state == '运行状态':\n        update_game()\n\ndef on_mouse_down(pos):\n    global state\n    if state == '初始状态':\n        if start_btn.collidepoint(pos):\n            state = '运行状态'",
        output: '游戏可以在开始、运行、结束状态间切换',
        explanation: '三个函数配合state变量实现完整游戏流程控制。'
      },
      practice: [
        {
          question: '游戏通常有哪几种状态？',
          answer: '开始、运行、暂停、结束等'
        },
        {
          question: '为什么update里要判断state？',
          answer: '只在运行状态时更新游戏逻辑'
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
    mathConcept: '点坐标',
    question: 'collidepoint(pos)中的pos参数是什么？',
    options: [
      '一个角色',
      '一个数字',
      '一个坐标点(x, y)',
      '一个字符串'
    ],
    answer: 2,
    explanation: 'pos是一个坐标点，包含x和y两个值，通常表示鼠标点击的位置。',
    hint: 'pos是position（位置）的缩写'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '状态理解',
    question: '全局变量应该定义在哪里？',
    options: [
      '函数内部',
      '函数外部',
      'import语句中',
      'class定义中'
    ],
    answer: 1,
    explanation: '全局变量定义在函数外部，整个程序都可以访问。',
    hint: '全局变量的作用范围是整个程序'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '碰撞检测',
    question: 'colliderect和collidepoint的主要区别是什么？',
    options: [
      '没有区别',
      'colliderect检测矩形区域，collidepoint检测一个点',
      'colliderect检测点，collidepoint检测矩形',
      'colliderect更精准'
    ],
    answer: 1,
    explanation: 'colliderect检测两个角色的矩形边界框是否重叠，collidepoint检测一个坐标点是否在角色内。',
    hint: 'rect是矩形(rectangle)，point是点'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '全局变量',
    question: '在函数内修改全局变量必须加什么关键字？',
    options: [
      'local',
      'variable',
      'global',
      'change'
    ],
    answer: 2,
    explanation: 'global关键字告诉Python我们要使用函数外部的全局变量，而不是创建新的局部变量。',
    hint: 'global意思是"全局的"'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '逻辑判断',
    question: '在躲猫猫游戏中，以下哪种情况应该用collidepoint而不是colliderect？',
    options: [
      '两个玩家相撞',
      '鼠标点击找猫咪',
      '子弹击中敌人',
      '玩家撞到墙壁'
    ],
    answer: 1,
    explanation: '鼠标点击是一个点，需要精确检测这个点是否在猫咪角色上，所以用collidepoint。其他选项是两个角色碰撞，用colliderect。',
    hint: '鼠标是一个点还是一个矩形？'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '代码执行',
    question: '执行以下代码后state的值是什么？\n\nstate = "开始"\n\ndef on_mouse_down(pos):\n    global state\n    state = "运行"\n\n# 没有点击鼠标',
    options: [
      '"开始"',
      '"运行"',
      'None',
      '报错'
    ],
    answer: 0,
    explanation: '因为没有点击鼠标，on_mouse_down函数没有被调用，所以state的值保持为"开始"。',
    hint: '函数只有被调用才会执行'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L13-3',
  title: '疯狂躲猫猫',
  subtitle: '学会碰撞检测和全局变量',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握collidepoint点碰撞检测',
    '理解colliderect矩形碰撞检测',
    '学会使用全局变量',
    '能用状态变量控制游戏流程'
  ],
  prerequisites: [
    'L13-1 Pygame Zero基础',
    'L13-2 列表和多角色',
    'Python函数基础'
  ]
}

// 打字练习单词（按难度分组，纯英文）
export const typingWords = {
  easy: ['begin', 'point', 'game', 'click'],
  medium: ['state', 'global', 'detect', 'mouse'],
  hard: ['collidepoint', 'colliderect', 'screen', 'button']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'state = "start"',
    'global state',
    'if actor.collidepoint(pos):',
    'def on_mouse_down(pos):',
    'state = "playing"'
  ],
  medium: [
    'def on_mouse_down(pos):\n    global state\n    if button.collidepoint(pos):\n        state = "game"',
    'if player.colliderect(enemy):\n    game_over = True',
    'if state == "playing":\n    update_game()'
  ],
  hard: [
    'for cat in cats:\n    if cat.collidepoint(pos):\n        found.append(cat)\n        break',
    'def update():\n    if state == "running":\n        move_player()\n        check_collision()',
    'if bullet.colliderect(enemy):\n    bullets.remove(bullet)\n    enemies.remove(enemy)\n    score += 10'
  ]
}

// 导出所有数据
export const L13_3_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L13_3_data
