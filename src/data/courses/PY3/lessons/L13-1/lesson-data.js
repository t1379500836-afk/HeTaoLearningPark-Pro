/**
 * PY3 课程 L13-1: 猴赛雷的新衣
 *
 * 核心知识点:
 * 1. Pygame Zero框架基础
 * 2. 键盘监听与控制
 * 3. on_key_down事件
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'clothes',
    pronunciation: '[klouoz]',
    partOfSpeech: 'n.',
    meaning: '衣服；服装',
    level: 'easy',
    example: 'Put on your clothes.',
    exampleTranslation: '穿上你的衣服。',
    note: 'put on clothes 穿衣服'
  },
  {
    word: 'update',
    pronunciation: "[^p'dert]",
    partOfSpeech: 'v./n.',
    meaning: '更新；升级；最新消息',
    level: 'easy',
    example: 'Please update the game.',
    exampleTranslation: '请更新游戏。',
    note: ''
  },
  {
    word: 'keyboard',
    pronunciation: "['ki:bo:rd]",
    partOfSpeech: 'n.',
    meaning: '键盘；琴键',
    level: 'medium',
    example: 'Press the keyboard.',
    exampleTranslation: '按下键盘。',
    note: ''
  },
  {
    word: 'collide',
    pronunciation: "[ka'laid]",
    partOfSpeech: 'v.',
    meaning: '碰撞；互撞；冲突',
    level: 'medium',
    example: 'The two balls collide.',
    exampleTranslation: '两个球碰撞了。',
    note: ''
  },
  // 拓展单词
  {
    word: 'actor',
    pronunciation: "['aektar]",
    partOfSpeech: 'n.',
    meaning: '角色；演员',
    level: 'hard',
    example: 'Create a new actor.',
    exampleTranslation: '创建一个新角色。',
    note: 'Pygame Zero中的角色对象'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: 'Pygame Zero框架',
    emoji: '🎮',
    gradeLevel: '3-4',
    summary: 'Python游戏开发框架，让编程变得简单有趣',

    easy: {
      story: '想象你有一个神奇的游戏工厂，只要写几行代码，就能创造出属于自己的游戏世界！Pygame Zero就是这样的魔法工具。',
      concept: 'Pygame Zero（简称pgzrun）是一个专门为初学者设计的Python游戏开发框架，它让创建游戏变得非常简单。',
      syntax: '# 导入Pygame Zero\nimport pgzrun\n\n# 游戏窗口大小\nWIDTH = 800\nHEIGHT = 600',
      example: {
        title: '创建游戏窗口',
        code: "import pgzrun\n\nWIDTH = 800\nHEIGHT = 600\n\npgzrun.go()",
        output: '显示一个800x600的游戏窗口',
        explanation: '这三行代码就能创建一个游戏窗口！WIDTH和HEIGHT设置窗口大小，pgzrun.go()启动游戏。'
      },
      practice: [
        {
          question: 'Pygame Zero的导入命令是什么？',
          answer: 'import pgzrun'
        },
        {
          question: '设置游戏窗口宽度用什么变量？',
          answer: 'WIDTH'
        }
      ]
    },

    medium: {
      story: '你已经会创建游戏窗口了，现在来学习Pygame Zero的核心函数：draw()和update()，它们是游戏的"心脏"和"大脑"。',
      concept: 'Pygame Zero有两个核心函数：draw()负责绘制画面，update()负责更新游戏逻辑。游戏运行时会自动反复调用这两个函数。',
      syntax: '# 绘制函数 - 负责画画\ndef draw():\n    screen.fill((0, 0, 0))  # 填充背景色\n\n# 更新函数 - 负责逻辑\ndef update():\n    pass  # 游戏逻辑代码',
      example: {
        title: '绘制蓝色背景',
        code: "import pgzrun\n\nWIDTH = 800\nHEIGHT = 600\n\ndef draw():\n    screen.fill((100, 150, 255))  # 蓝色背景\n\npgzrun.go()",
        output: '显示蓝色背景的游戏窗口',
        explanation: 'screen.fill()用RGB颜色值填充整个屏幕。(100, 150, 255)是浅蓝色。'
      },
      practice: [
        {
          question: 'draw()函数的作用是什么？',
          answer: '负责绘制游戏画面'
        },
        {
          question: 'RGB颜色(255, 0, 0)是什么颜色？',
          answer: '红色'
        }
      ]
    },

    hard: {
      story: '成为游戏开发高手！学会使用Actor角色对象，让你的游戏角色能够移动、碰撞、交互，创建真正的游戏！',
      concept: 'Actor是Pygame Zero中的角色对象，可以加载图片、设置位置、检测碰撞。配合draw()和update()函数，可以实现完整的游戏逻辑。',
      syntax: "# 创建角色\nplayer = Actor('player')  # 加载images/player.png\nplayer.pos = (400, 300)  # 设置位置\n\ndef draw():\n    player.draw()  # 绘制角色\n\ndef update():\n    player.x += 1  # 角色向右移动",
      example: {
        title: '创建并移动角色',
        code: "import pgzrun\n\nplayer = Actor('alien')\nplayer.pos = (100, 300)\n\ndef draw():\n    screen.clear()\n    player.draw()\n\ndef update():\n    player.x += 2  # 每帧向右移动2像素\n\npgzrun.go()",
        output: '角色从左向右移动',
        explanation: 'Actor对象自动加载images文件夹中的图片。update()每秒执行60次，所以角色会持续移动。'
      },
      practice: [
        {
          question: '如何让角色向下移动？',
          answer: 'player.y += 数字'
        },
        {
          question: 'Actor会自动加载哪个文件夹的图片？',
          answer: 'images文件夹'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '键盘监听',
    emoji: '⌨️',
    gradeLevel: '3-4',
    summary: '用键盘控制游戏角色，实现交互',

    easy: {
      story: '想用键盘控制游戏角色吗？就像玩游戏时按方向键让角色移动一样，我们来学习如何让程序"听到"你的按键！',
      concept: '键盘监听就是让程序知道你按下了哪个键。Pygame Zero提供了keyboard对象，可以检测键盘上任意按键的状态。',
      syntax: '# 检测按键是否被按住\nif keyboard.left:\n    角色向左移动\n\nif keyboard.right:\n    角色向右移动',
      example: {
        title: '用方向键控制角色',
        code: "def update():\n    if keyboard.left:\n        player.x -= 3\n    if keyboard.right:\n        player.x += 3",
        output: '按左键角色向左移动，按右键向右移动',
        explanation: 'keyboard.left检测左方向键是否被按住。按住不放时，角色会持续移动。'
      },
      practice: [
        {
          question: '检测上方向键用什么代码？',
          answer: 'keyboard.up'
        },
        {
          question: 'keyboard.right检测的是什么？',
          answer: '右方向键是否被按住'
        }
      ]
    },

    medium: {
      story: '你已经会用方向键了，现在学习更多按键！空格键、字母键都可以用来控制游戏，让你的游戏更丰富！',
      concept: 'Pygame Zero支持检测所有键盘按键：方向键(keys.LEFT/RIGHT/UP/DOWN)、空格键(keys.SPACE)、字母键(keys.A-Z)等。',
      syntax: '# 常用按键检测\nif keyboard.space:    # 空格键\nif keyboard.up:       # 上方向键\nif keyboard.down:     # 下方向键\nif keyboard.a:        # A键',
      example: {
        title: '四方向移动',
        code: "def update():\n    if keyboard.left:\n        player.x -= 3\n    if keyboard.right:\n        player.x += 3\n    if keyboard.up:\n        player.y -= 3\n    if keyboard.down:\n        player.y += 3",
        output: '角色可以上下左右移动',
        explanation: '同时检测四个方向键，可以实现角色在屏幕上的自由移动。'
      },
      practice: [
        {
          question: '如何检测空格键？',
          answer: 'keyboard.space'
        },
        {
          question: '让角色向上移动应该改变y还是x？',
          answer: 'y（减少y值角色向上）'
        }
      ]
    },

    hard: {
      story: '高级键盘技巧！学习键盘对象的完整用法，检测组合按键，创建更复杂的游戏控制方式！',
      concept: 'keyboard对象可以检测任意按键，使用keys模块可以访问所有按键常量。可以组合多个按键实现斜向移动等高级功能。',
      syntax: "# 导入按键常量（可选）\nfrom pygame import keys\n\n# 检测任意按键\nif keyboard[key]:  # key可以是字母或keys常量\n\n# 组合按键\nif keyboard.left and keyboard.up:\n    # 斜向左上移动",
      example: {
        title: '斜向移动',
        code: "import math\n\ndef update():\n    speed = 3\n    # 斜向移动（同时按两个键）\n    if keyboard.left and keyboard.up:\n        player.x -= speed\n        player.y -= speed\n    elif keyboard.left and keyboard.down:\n        player.x -= speed\n        player.y += speed\n    # ... 其他方向组合",
        output: '角色可以斜向移动',
        explanation: '同时检测两个按键可以实现8方向移动，让游戏控制更流畅。'
      },
      practice: [
        {
          question: '如何检测W键是否按下？',
          answer: 'keyboard.w'
        },
        {
          question: '同时按左和上键，角色应该怎么移动？',
          answer: '斜向左上移动'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: 'on_key_down事件',
    emoji: '🔔',
    gradeLevel: '3-4',
    summary: '按键按下的瞬间触发，适合单次操作',

    easy: {
      story: '想象门铃，只有按下那一刻才会响！on_key_down就像门铃，只在按键被按下的那一瞬间触发一次。',
      concept: 'on_key_down是一个特殊函数，当任意按键被按下时会自动执行一次。适合处理"按一次执行一次"的操作，比如跳跃、发射子弹。',
      syntax: 'def on_key_down(key):\n    if key == keys.SPACE:\n        # 按下空格时执行',
      example: {
        title: '按空格播放声音',
        code: "def on_key_down(key):\n    if key == keys.SPACE:\n        sounds.jump.play()  # 播放跳跃声音",
        output: '每按一次空格键播放一次声音',
        explanation: 'on_key_down只在按键按下时触发一次，不会因为按住不放而重复触发。'
      },
      practice: [
        {
          question: 'on_key_down什么时候触发？',
          answer: '按键被按下的那一瞬间'
        },
        {
          question: '按住不放会重复触发on_key_down吗？',
          answer: '不会，只触发一次'
        }
      ]
    },

    medium: {
      story: 'on_key_down和keyboard有什么区别？keyboard适合持续检测，on_key_down适合单次触发，就像连发和单发的区别！',
      concept: 'keyboard检测的是"按键状态"（是否被按住），on_key_down检测的是"按键事件"（按下瞬间）。理解这个区别很重要！',
      syntax: '# keyboard - 持续检测（在update中用）\ndef update():\n    if keyboard.space:  # 按住不放会持续触发\n        player.y -= 1\n\n# on_key_down - 单次触发\ndef on_key_down(key):\n    if key == keys.SPACE:  # 按下只触发一次\n        player.jump()',
      example: {
        title: '跳跃功能',
        code: "def on_key_down(key):\n    if key == keys.SPACE:\n        # 只有在地面上才能跳跃\n        if player.y >= 500:  # 地面位置\n            player.y -= 100  # 跳起",
        output: '按空格键角色跳跃一次',
        explanation: '使用on_key_down确保每次按键只跳跃一次，按住不放也不会连续跳跃。'
      },
      practice: [
        {
          question: '想让角色持续移动应该用什么？',
          answer: 'keyboard（在update中检测）'
        },
        {
          question: '想让角色按一次跳一次应该用什么？',
          answer: 'on_key_down'
        }
      ]
    },

    hard: {
      story: '成为按键处理专家！学会处理多种按键组合，检测特殊按键，让你的游戏控制更加灵活！',
      concept: 'on_key_down可以接收key参数判断具体按键，还可以检测修饰键（Shift、Ctrl等）。配合状态变量可以实现复杂的按键逻辑。',
      syntax: "def on_key_down(key, mod):\n    # key是按下的键\n    # mod是修饰键状态（Shift、Ctrl等）\n    \n    if key == keys.SPACE:\n        # 空格键处理\n    elif key == keys.ESCAPE:\n        # ESC键处理\n    \n    # 检测组合键\n    if mod & keymods.SHIFT:\n        # 同时按下了Shift",
      example: {
        title: '多种按键处理',
        code: "def on_key_down(key):\n    if key == keys.SPACE:\n        sounds.jump.play()\n    elif key == keys.R:\n        reset_game()  # 按R重置游戏\n    elif key == keys.ESCAPE:\n        exit_game()   # 按ESC退出",
        output: '不同按键触发不同功能',
        explanation: '使用if-elif判断不同的按键，为每个按键分配不同的功能。'
      },
      practice: [
        {
          question: '如何检测ESC键？',
          answer: 'key == keys.ESCAPE'
        },
        {
          question: 'on_key_down的参数key是什么？',
          answer: '被按下的按键的标识'
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
    mathConcept: '坐标系统',
    question: '在Pygame Zero中，让角色向右移动应该怎么写？',
    options: [
      'player.x -= 1',
      'player.x += 1',
      'player.y += 1',
      'player.y -= 1'
    ],
    answer: 1,
    explanation: '在坐标系统中，x轴向右是正方向，所以 player.x += 1 让角色向右移动1像素。',
    hint: '想一想坐标轴的方向'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '方向判断',
    question: '检测键盘左方向键是否被按下，应该用什么代码？',
    options: [
      'keyboard.right',
      'keyboard.up',
      'keyboard.left',
      'keyboard.down'
    ],
    answer: 2,
    explanation: 'keyboard.left 用于检测左方向键是否被按住，返回True或False。',
    hint: 'left就是左边的意思'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '位置计算',
    question: '角色当前位置是(100, 200)，执行 player.x += 50 后，角色新位置是？',
    options: [
      '(150, 200)',
      '(100, 250)',
      '(50, 200)',
      '(100, 150)'
    ],
    answer: 0,
    explanation: 'player.x += 50 让x坐标增加50，所以 100 + 50 = 150，y坐标不变。新位置是(150, 200)。',
    hint: '只有x坐标变化'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '逻辑判断',
    question: 'on_key_down和keyboard的主要区别是什么？',
    options: [
      '没有区别',
      'on_key_down只触发一次，keyboard持续触发',
      'keyboard只触发一次，on_key_down持续触发',
      'on_key_down只能检测方向键'
    ],
    answer: 1,
    explanation: 'on_key_down在按键按下时只触发一次，适合单次操作如跳跃；keyboard在update中持续检测，适合持续移动。',
    hint: '想一想"按一次"和"按住不放"的区别'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '坐标边界',
    question: '游戏窗口宽度是800，角色宽度是50，要让角色不超出右边界，x坐标最大应该是多少？',
    options: [
      '800',
      '750',
      '775',
      '850'
    ],
    answer: 2,
    explanation: '角色中心点在x坐标位置，角色宽度50意味着左右各25像素。所以右边界 = 800 - 25 = 775。',
    hint: '角色中心点在中间，要留出角色的一半宽度'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '速度计算',
    question: 'update函数每秒执行60次，如果每帧让角色移动3像素，5秒后角色移动了多少像素？',
    options: [
      '180像素',
      '300像素',
      '900像素',
      '15像素'
    ],
    answer: 2,
    explanation: '每秒执行60次 × 每次移动3像素 × 5秒 = 60 × 3 × 5 = 900像素。',
    hint: '总移动距离 = 次数 × 每次移动距离'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L13-1',
  title: '猴赛雷的新衣',
  subtitle: '学会Pygame Zero框架和键盘控制',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握Pygame Zero框架的基本结构',
    '学会使用键盘监听控制角色',
    '理解on_key_down事件的使用场景',
    '能创建简单的键盘控制游戏'
  ],
  prerequisites: [
    'Python基础语法',
    '变量和函数的概念',
    '基本的坐标系统知识'
  ]
}

// 打字练习单词（按难度分组，纯英文）
export const typingWords = {
  easy: ['clothes', 'update', 'game', 'draw'],
  medium: ['keyboard', 'collide', 'screen', 'actor'],
  hard: ['import', 'function', 'window', 'player']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'import pgzrun',
    'WIDTH = 800',
    'HEIGHT = 600',
    'pgzrun.go()',
    'screen.fill((0,0,0))'
  ],
  medium: [
    'def draw():\n    player.draw()',
    'def update():\n    if keyboard.left:\n        player.x -= 3',
    'if keyboard.right:\n    player.x += 3',
    'player = Actor("alien")'
  ],
  hard: [
    'def on_key_down(key):\n    if key == keys.SPACE:\n        sounds.jump.play()',
    'if keyboard.left and keyboard.up:\n    player.x -= speed\n    player.y -= speed',
    'def update():\n    if player.x > WIDTH:\n        player.x = 0'
  ]
}

// 导出所有数据
export const L13_1_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L13_1_data
