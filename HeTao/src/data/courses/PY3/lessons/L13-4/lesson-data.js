/**
 * PY3 课程 L13-4: 木琴敲敲敲
 *
 * 核心知识点:
 * 1. 多角色创建与for循环
 * 2. collidepoint精准碰撞
 * 3. 全局变量控制状态
 */

// 单词卡数据 - 根据课程内容 + 拓展词汇
export const vocabData = [
  // OCR提取的单词（讲义中提到）
  {
    word: 'guess',
    pronunciation: '[ges]',
    partOfSpeech: 'v./n.',
    meaning: '猜测；推测',
    level: 'easy',
    example: 'Can you guess the answer?',
    exampleTranslation: '你能猜出答案吗？',
    note: ''
  },
  {
    word: 'right',
    pronunciation: '[rait]',
    partOfSpeech: 'adj./adv./n.',
    meaning: '正确的；右边；权利',
    level: 'easy',
    example: 'Your answer is right!',
    exampleTranslation: '你的答案是正确的！',
    note: ''
  },
  {
    word: 'choose',
    pronunciation: '[tju:z]',
    partOfSpeech: 'v.',
    meaning: '选择；挑选',
    level: 'medium',
    example: 'Choose your favorite color.',
    exampleTranslation: '选择你最喜欢的颜色。',
    note: ''
  },
  {
    word: 'state',
    pronunciation: '[steit]',
    partOfSpeech: 'n./v.',
    meaning: '状态；情况；陈述',
    level: 'medium',
    example: 'The game state changed.',
    exampleTranslation: '游戏状态改变了。',
    note: ''
  },
  // 拓展单词
  {
    word: 'xylophone',
    pronunciation: "['zailafoun]",
    partOfSpeech: 'n.',
    meaning: '木琴',
    level: 'hard',
    example: 'Play the xylophone.',
    exampleTranslation: '弹奏木琴。',
    note: ''
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '多角色创建与for循环',
    emoji: '🎵',
    gradeLevel: '3-4',
    summary: '用for循环高效创建多个角色',

    easy: {
      story: '木琴有8个琴键，如果一个一个创建需要写8遍类似的代码。用for循环，只需要写一次就能创建8个琴键！',
      concept: '当需要创建多个类似的角色时，用for循环可以大大简化代码。循环变量i可以用来计算每个角色的位置和属性。',
      syntax: '# 创建空列表\nqin = []\n\n# 用for循环创建8个琴键\nfor i in range(8):\n    key = Actor(str(i + 1))  # 角色名: 1,2,3...8\n    qin.append(key)',
      example: {
        title: '创建8个琴键',
        code: "qin = []  # 琴键列表\n\nfor i in range(8):\n    key = Actor(str(i + 1))  # 加载1.png到8.png\n    key.pos = (100 + i * 80, 400)  # 每个间隔80像素\n    qin.append(key)",
        output: '创建8个琴键，均匀排列在屏幕上',
        explanation: 'i从0到7，i+1得到1到8对应图片名，100+i*80计算每个琴键的x位置。'
      },
      practice: [
        {
          question: 'range(8)会循环多少次？',
          answer: '8次（i从0到7）'
        },
        {
          question: 'str(i + 1)的作用是什么？',
          answer: '把数字转换成字符串，作为角色名'
        }
      ]
    },

    medium: {
      story: '琴键不仅要创建，还要设置正确的位置。用循环变量i计算每个琴键的x坐标，让它们整齐排列！',
      concept: '循环变量i可以作为位置计算的系数。i从0开始递增，所以 100 + i * 80 会得到 100, 180, 260, 340... 这样的等差数列。',
      syntax: '# 等差数列位置计算\nstart_x = 100  # 起始x坐标\nspacing = 80   # 间隔\n\nfor i in range(8):\n    key.pos = (start_x + i * spacing, 400)\n    # i=0: x=100, i=1: x=180, i=2: x=260...',
      example: {
        title: '计算琴键位置',
        code: "qin = []\nstart_x = 150\nspacing = 75\n\nfor i in range(8):\n    key = Actor(str(i + 1))\n    key.x = start_x + i * spacing  # 150, 225, 300...\n    key.y = 400\n    qin.append(key)\n\ndef draw():\n    for key in qin:\n        key.draw()",
        output: '8个琴键整齐排列',
        explanation: 'start_x是第一个琴键的位置，spacing是间隔，i*spacing计算偏移量。'
      },
      practice: [
        {
          question: '如果start_x=100, spacing=50, i=3，x坐标是多少？',
          answer: '100 + 3*50 = 250'
        },
        {
          question: '为什么用i*spacing而不是固定值？',
          answer: '因为每个琴键的偏移量不同，i越大偏移越大'
        }
      ]
    },

    hard: {
      story: '高级技巧！琴键可以有不同的属性，比如不同的音符名称。在循环中给每个琴键设置自定义属性，实现更复杂的功能！',
      concept: 'Actor对象可以添加自定义属性。在创建角色的循环中，可以给每个角色设置不同的属性值，如音符、颜色、分值等。',
      syntax: "# 创建带属性的琴键\nnotes = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si', 'do2']\n\nfor i in range(8):\n    key = Actor(str(i + 1))\n    key.note = notes[i]  # 自定义属性：音符名\n    key.number = i + 1   # 自定义属性：编号\n    qin.append(key)",
      example: {
        title: '带音符属性的琴键',
        code: "qin = []\nnotes = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si', 'do2']\n\nfor i in range(8):\n    key = Actor(str(i + 1))\n    key.x = 150 + i * 75\n    key.y = 400\n    key.note = notes[i]  # 添加音符属性\n    qin.append(key)\n\ndef on_mouse_down(pos):\n    for key in qin:\n        if key.collidepoint(pos):\n            sounds[key.note].play()  # 播放对应音符",
        output: '点击琴键播放对应的音符',
        explanation: 'key.note是自定义属性，存储音符名称，用于播放对应的声音。'
      },
      practice: [
        {
          question: '如何给角色添加自定义属性？',
          answer: '直接赋值，如 key.note = "do"'
        },
        {
          question: '为什么要用列表存储音符名？',
          answer: '方便在循环中按索引分配给每个琴键'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: 'collidepoint精准碰撞',
    emoji: '🎯',
    gradeLevel: '3-4',
    summary: '选择正确的碰撞检测方法',

    easy: {
      story: '木槌的槌头跟随鼠标，当敲击琴键时，我们只希望槌头位置的琴键响起。collidepoint()最适合这种精确检测！',
      concept: '木槌是长条形的，如果用colliderect()检测，槌柄碰到相邻琴键也会触发。collidepoint()只检测鼠标点这一个点，更加精准。',
      syntax: '# collidepoint适合精确点击\ndef on_mouse_down(pos):\n    for key in qin:\n        if key.collidepoint(pos):  # 只检测鼠标点\n            play_sound(key)\n            break  # 只触发一个琴键',
      example: {
        title: '精准敲击琴键',
        code: "def on_mouse_down(pos):\n    for key in qin:\n        if key.collidepoint(pos):\n            # 只有鼠标点在琴键上才触发\n            sounds[key.note].play()\n            break  # 确保只触发一个",
        output: '点击琴键播放对应音符',
        explanation: 'collidepoint(pos)检测鼠标点击位置是否在琴键上，不会因为槌柄碰到其他琴键而误触发。'
      },
      practice: [
        {
          question: '为什么木琴用collidepoint而不是colliderect？',
          answer: '木槌是长条形，colliderect会检测到槌柄碰到的琴键'
        },
        {
          question: 'break的作用是什么？',
          answer: '退出循环，确保只触发一个琴键'
        }
      ]
    },

    medium: {
      story: '理解两种碰撞检测的区别：colliderect检测两个矩形是否重叠（任何部分），collidepoint检测一个点是否在矩形内。',
      concept: '选择碰撞检测方法要看场景：检测两个物体碰撞用colliderect，检测鼠标点击用collidepoint。木琴场景中鼠标是一个点，所以用collidepoint。',
      syntax: "# colliderect - 两个角色碰撞\nif player.colliderect(enemy):\n    print('撞到了')\n\n# collidepoint - 点和角色碰撞\nif button.collidepoint(mouse.pos):\n    print('点到了')\n\n# 选择标准：\n# 检测角色间碰撞 -> colliderect\n# 检测鼠标点击 -> collidepoint",
      example: {
        title: '对比两种检测',
        code: "# 错误示范：用colliderect\nif hammer.colliderect(key):  # 槌柄也会触发！\n    play_sound()\n\n# 正确示范：用collidepoint\nif key.collidepoint(pos):  # 只有鼠标点在琴键上才触发\n    play_sound()",
        output: 'collidepoint更精准',
        explanation: '木槌的图片包含槌头和槌柄，colliderect会把槌柄也算进去。'
      },
      practice: [
        {
          question: '检测子弹击中敌人应该用什么？',
          answer: 'colliderect（两个角色碰撞）'
        },
        {
          question: '检测点击按钮应该用什么？',
          answer: 'collidepoint（鼠标是一个点）'
        }
      ]
    },

    hard: {
      story: '高级应用！当需要判断是否要触发多个相邻对象时，collidepoint的精准性尤其重要。比如猜歌名游戏中显示歌名！',
      concept: '在一些游戏中，多个角色可能靠得很近，此时精准的碰撞检测可以避免误触发。配合状态变量，可以实现"先敲击后显示"等复杂逻辑。',
      syntax: "# 精准检测 + 状态控制\ndef on_mouse_down(pos):\n    global state\n    \n    # 检测点击按钮\n    if show_button.collidepoint(pos):\n        if state == '隐藏歌名':\n            state = '显示歌名'\n        else:\n            state = '隐藏歌名'\n    \n    # 检测敲击琴键\n    for key in qin:\n        if key.collidepoint(pos):\n            sounds[key.note].play()\n            break",
      example: {
        title: '带状态控制的敲击',
        code: "state = '隐藏歌名'\n\ndef on_mouse_down(pos):\n    global state\n    \n    # 敲击琴键\n    for key in qin:\n        if key.collidepoint(pos):\n            sounds[key.note].play()\n            break\n    \n    # 切换显示状态\n    if button.collidepoint(pos):\n        if state == '隐藏歌名':\n            state = '显示歌名'\n        else:\n            state = '隐藏歌名'",
        output: '可以敲琴键，也可以切换歌名显示',
        explanation: '用collidepoint精准检测不同的点击区域，配合state变量控制显示。'
      },
      practice: [
        {
          question: '为什么相邻的琴键不会同时触发？',
          answer: '因为collidepoint只检测一个精确的点'
        },
        {
          question: '如何判断点击的是按钮还是琴键？',
          answer: '分别用collidepoint检测，谁返回True就是谁'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '全局变量控制状态',
    emoji: '🔄',
    gradeLevel: '3-4',
    summary: '用状态变量控制角色显示',

    easy: {
      story: '猜歌名游戏中，歌名一开始是隐藏的，点击按钮后才显示。用全局变量state记录当前是"隐藏"还是"显示"状态！',
      concept: 'state变量可以控制界面元素的显示与隐藏。在draw函数中根据state的值决定是否绘制某些内容。',
      syntax: "# 定义状态\nstate = '隐藏歌名'\n\ndef draw():\n    # 绘制琴键\n    for key in qin:\n        key.draw()\n    \n    # 根据状态决定是否显示歌名\n    if state == '显示歌名':\n        draw_song_name()",
      example: {
        title: '控制歌名显示',
        code: "state = '隐藏歌名'\n\ndef draw():\n    for key in qin:\n        key.draw()\n    \n    if state == '显示歌名':\n        screen.draw.text('小星星', (300, 100), fontsize=40)",
        output: '歌名根据state决定是否显示',
        explanation: '只有当state等于"显示歌名"时，才绘制歌名文字。'
      },
      practice: [
        {
          question: 'state变量的作用是什么？',
          answer: '控制界面的显示状态'
        },
        {
          question: 'if state == "显示歌名" 放在哪个函数里？',
          answer: 'draw函数'
        }
      ]
    },

    medium: {
      story: '点击按钮可以切换状态！从"隐藏歌名"变成"显示歌名"，再点一下又变回"隐藏歌名"，这就是状态切换！',
      concept: '在on_mouse_down函数中检测按钮点击，然后用global声明修改state的值，实现状态的切换。',
      syntax: "state = '隐藏歌名'\n\ndef on_mouse_down(pos):\n    global state  # 必须加global！\n    \n    if button.collidepoint(pos):\n        # 切换状态\n        if state == '隐藏歌名':\n            state = '显示歌名'\n        else:\n            state = '隐藏歌名'",
      example: {
        title: '点击切换状态',
        code: "state = '隐藏歌名'\n\ndef on_mouse_down(pos):\n    global state\n    \n    if button.collidepoint(pos):\n        if state == '隐藏歌名':\n            state = '显示歌名'\n        else:\n            state = '隐藏歌名'\n\ndef draw():\n    if state == '显示歌名':\n        screen.draw.text('小星星', center=(400, 50), fontsize=50)",
        output: '点击按钮切换歌名显示/隐藏',
        explanation: '用if-else判断当前状态，然后切换到另一个状态。'
      },
      practice: [
        {
          question: '修改state为什么必须加global？',
          answer: '因为state是全局变量'
        },
        {
          question: '如何在两种状态间切换？',
          answer: '判断当前状态，然后设为另一个状态'
        }
      ]
    },

    hard: {
      story: '完整的状态管理系统！用state控制游戏的多个阶段：初始界面、游戏运行、显示结果等，实现复杂的交互流程！',
      concept: '状态机是游戏开发的重要概念。定义清晰的状态，在特定条件下切换状态，在不同状态下执行不同的逻辑和绘制。',
      syntax: "# 多状态管理\nstate = '初始状态'  # 初始/运行/结果/显示歌名\n\ndef on_mouse_down(pos):\n    global state\n    \n    if state == '初始状态':\n        if start_btn.collidepoint(pos):\n            state = '运行状态'\n    \n    elif state == '运行状态':\n        # 敲击琴键\n        for key in qin:\n            if key.collidepoint(pos):\n                sounds[key.note].play()\n                break\n        \n        # 切换显示\n        if toggle_btn.collidepoint(pos):\n            state = '显示歌名' if state != '显示歌名' else '运行状态'",
      example: {
        title: '猜歌名游戏状态',
        code: "state = '隐藏歌名'\n\ndef on_mouse_down(pos):\n    global state\n    \n    # 敲击琴键\n    for key in qin:\n        if key.collidepoint(pos):\n            sounds[key.note].play()\n            break\n    \n    # 点击按钮切换状态\n    if button.collidepoint(pos):\n        if state == '隐藏歌名':\n            state = '显示歌名'\n        else:\n            state = '隐藏歌名'\n\ndef draw():\n    screen.clear()\n    for key in qin:\n        key.draw()\n    chui.draw()\n    \n    if state == '显示歌名':\n        screen.draw.text('小星星', center=(400, 50), fontsize=50)",
        output: '完整的敲琴键+显示歌名功能',
        explanation: '状态变量控制歌名的显示，collidepoint控制敲击检测，两者结合实现完整功能。'
      },
      practice: [
        {
          question: '这个游戏有几种状态？',
          answer: '两种：隐藏歌名、显示歌名'
        },
        {
          question: '状态切换的条件是什么？',
          answer: '点击按钮时切换'
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
    mathConcept: '循环变量',
    question: 'for i in range(3): print(i*3) 会输出什么？',
    options: [
      '0, 1, 2',
      '0, 3, 6',
      '3, 6, 9',
      '1, 2, 3'
    ],
    answer: 1,
    explanation: 'i依次是0,1,2，所以i*3的值是0*3=0, 1*3=3, 2*3=6，输出0, 3, 6。',
    hint: 'i从0开始，每次乘以3'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '碰撞检测',
    question: '木槌敲击琴键时，应该用什么方法检测碰撞？',
    options: [
      'colliderect()',
      'collidepoint()',
      'Actor()',
      'update()'
    ],
    answer: 1,
    explanation: '木槌是长条形，槌柄碰到琴键不应触发。collidepoint只检测鼠标点，更加精准。',
    hint: '需要精确检测鼠标点击位置'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '等差数列',
    question: '创建8个琴键，起始x=100，间隔80，第5个琴键的x坐标是多少？',
    options: [
      '400',
      '420',
      '380',
      '500'
    ],
    answer: 1,
    explanation: '第5个琴键的i值是4（从0开始），x = 100 + 4*80 = 100 + 320 = 420。',
    hint: '第5个的i值是4（0,1,2,3,4）'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '全局变量',
    question: '在函数内修改全局变量state需要什么？',
    options: [
      '不需要任何声明',
      '加global关键字',
      '加local关键字',
      '加change关键字'
    ],
    answer: 1,
    explanation: '修改全局变量必须先用global声明，否则Python会创建同名局部变量。',
    hint: '告诉Python这是一个全局变量'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '逻辑推理',
    question: '鸡蛋问题：周一吃掉一半，周二吃掉剩下的一半，周三只剩1颗。周一本来有几颗？',
    options: [
      '2颗',
      '4颗',
      '6颗',
      '8颗'
    ],
    answer: 1,
    explanation: '倒推法：周三1颗，周二是周三的2倍=2颗，周一是周二的2倍=4颗。',
    hint: '从周三倒推回去，每次乘2'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '状态逻辑',
    question: '以下代码执行后state是什么？\n\nstate = "隐藏"\nif button.collidepoint(pos):\n    state = "显示" if state == "隐藏" else "隐藏"\n# 点击了button',
    options: [
      '"隐藏"',
      '"显示"',
      'None',
      '报错'
    ],
    answer: 1,
    explanation: 'state初始是"隐藏"，条件为真，所以执行 state = "显示"。',
    hint: '三元表达式的结果是"显示"'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L13-4',
  title: '木琴敲敲敲',
  subtitle: '学会多角色创建和精准碰撞检测',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握用for循环创建多角色',
    '理解collidepoint的精准检测',
    '学会用状态变量控制显示',
    '完成木琴敲击游戏'
  ],
  prerequisites: [
    'L13-1 Pygame Zero基础',
    'L13-2 列表和多角色',
    'L13-3 碰撞检测和全局变量'
  ]
}

// 打字练习单词（按难度分组，纯英文）
export const typingWords = {
  easy: ['guess', 'right', 'game', 'song'],
  medium: ['choose', 'state', 'music', 'sound'],
  hard: ['xylophone', 'collidepoint', 'button', 'toggle']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'for i in range(8):',
    'key = Actor(str(i+1))',
    'qin.append(key)',
    'state = "hidden"',
    'key.x = 100 + i * 80'
  ],
  medium: [
    'for i in range(8):\n    key = Actor(str(i+1))\n    key.pos = (100+i*80, 400)\n    qin.append(key)',
    'def on_mouse_down(pos):\n    for key in qin:\n        if key.collidepoint(pos):\n            sounds[key.note].play()',
    'global state\nif state == "hidden":\n    state = "shown"'
  ],
  hard: [
    'notes = ["do","re","mi","fa","sol","la","si","do2"]\nfor i in range(8):\n    key.note = notes[i]',
    'if state == "显示歌名":\n    screen.draw.text(song_name, center=(400, 50))',
    'state = "显示" if state == "隐藏" else "隐藏"'
  ]
}

// 导出所有数据
export const L13_4_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L13_4_data
