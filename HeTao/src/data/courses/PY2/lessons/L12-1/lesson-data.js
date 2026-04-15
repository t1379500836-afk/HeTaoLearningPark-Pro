/**
 * PY2 课程 L12-1: 智闯银科山
 *
 * 核心知识点:
 * 1. Pygame Zero 入门 (import pgzrun)
 * 2. draw() 函数绘制窗口
 * 3. WIDTH 和 HEIGHT 设置窗口大小
 * 4. Actor() 创建角色
 * 5. 角色坐标 x 和 y
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'width',
    pronunciation: '[widθ]',
    partOfSpeech: 'n.',
    meaning: '宽度；广度',
    level: 'easy',
    example: 'The width of the window is 800 pixels.',
    exampleTranslation: '窗口的宽度是800像素。'
  },
  {
    word: 'image',
    pronunciation: "['imidʒ]",
    partOfSpeech: 'n.',
    meaning: '图像；画像',
    level: 'easy',
    example: 'This image shows a beautiful sunset.',
    exampleTranslation: '这张图片展示了一个美丽的日落。'
  },
  {
    word: 'update',
    pronunciation: "[ʌp'deit]",
    partOfSpeech: 'v.',
    meaning: '更新；升级',
    level: 'medium',
    example: 'Please update your software to the latest version.',
    exampleTranslation: '请将你的软件更新到最新版本。'
  },
  {
    word: 'actor',
    pronunciation: "['æktə]",
    partOfSpeech: 'n.',
    meaning: '演员；参与者；执行者',
    level: 'medium',
    example: 'The actor performed very well in the movie.',
    exampleTranslation: '这位演员在电影中表现得非常好。'
  },
  // 拓展单词
  {
    word: 'height',
    pronunciation: '[hait]',
    partOfSpeech: 'n.',
    meaning: '高度；身高',
    level: 'easy',
    example: 'The height of the window is 600 pixels.',
    exampleTranslation: '窗口的高度是600像素。'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '神奇的魔法盒 - Pygame Zero 入门',
    emoji: '🎮',
    gradeLevel: '1-2',
    summary: 'Pygame Zero 是一个强大的 Python 游戏开发工具箱',

    // 基础版（1-2年级）
    easy: {
      story: '想象你有一个神奇的魔法盒，可以创建属于自己的游戏世界！Pygame Zero 就是这样一个工具箱，让你用 Python 代码创造好玩的游戏。',
      concept: 'Pygame Zero 是一个 Python 工具箱，可以用来编写游戏或应用程序。使用时需要先导入 pgzrun。',
      syntax: 'import pgzrun\n\n# 代码最后一行启动游戏\npgzrun.go()',
      example: {
        title: '启动游戏窗口',
        code: '# 导入游戏工具箱\nimport pgzrun\n\n# 你的游戏代码\n\n# 启动游戏！\npgzrun.go()',
        output: '游戏窗口启动',
        explanation: 'import pgzrun 导入工具箱，pgzrun.go() 启动整个游戏程序。'
      },
      practice: [
        { question: '启动 Pygame Zero 游戏需要什么命令？', answer: 'pgzrun.go()' },
        { question: '导入 pgzrun 用什么命令？', answer: 'import pgzrun' }
      ]
    },

    // 进阶版（3-4年级）
    medium: {
      story: '现在你学会了启动魔法盒！Pygame Zero 可以创建各种类型的游戏：鼠标控制、键盘控制、拼图游戏等等。',
      concept: 'Pygame Zero 是专门为初学者设计的游戏库，它简化了游戏开发的流程，让编程变得更有趣。',
      syntax: 'import pgzrun\n\nWIDTH = 800\nHEIGHT = 600\n\ndef draw():\n    screen.clear()\n    # 绘制代码\n\npgzrun.go()',
      example: {
        title: '创建游戏窗口',
        code: 'import pgzrun\n\n# 设置窗口大小\nWIDTH = 800\nHEIGHT = 600\n\ndef draw():\n    screen.clear()\n    # 清空窗口\n\npgzrun.go()',
        output: '创建一个800x600的游戏窗口',
        explanation: 'WIDTH 和 HEIGHT 是约定好的变量，必须全部大写，用来设置窗口大小。'
      },
      practice: [
        { question: 'WIDTH 和 HEIGHT 变量名为什么要大写？', answer: '这是 Pygame Zero 的约定规则' },
        { question: 'draw() 函数是做什么的？', answer: '自动调用，用于绘制窗口内容' }
      ]
    },

    // 挑战版（5-6年级）
    hard: {
      story: '游戏大师模式！你可以创建完整的游戏，包括多个角色、动画效果、背景音乐等等。',
      concept: 'Pygame Zero 使用"约定优于配置"的设计理念，通过预定义的函数和变量简化游戏开发。',
      syntax: 'import pgzrun\n\nWIDTH = 800\nHEIGHT = 600\n\n# 约定函数\ndef draw():\n    """每帧绘制一次"""\n    pass\n\ndef update():\n    """每秒60次调用"""\n    pass\n\npgzrun.go()',
      example: {
        title: '游戏框架结构',
        code: 'import pgzrun\n\nWIDTH = 800\nHEIGHT = 600\n\ndef draw():\n    """绘制所有图形"""\n    screen.clear()\n    # 绘制背景、角色等\n\ndef update():\n    """更新游戏状态"""\n    # 移动角色、检测碰撞等\n\npgzrun.go()',
        output: '完整的游戏框架',
        explanation: 'draw() 每帧调用一次绘制画面，update() 每秒调用60次更新游戏逻辑。'
      },
      practice: [
        { question: 'update() 函数每秒调用多少次？', answer: '60次' },
        { question: 'draw() 和 update() 有什么区别？', answer: 'draw()负责绘制画面，update()负责更新逻辑' }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '舞台搭建 - 窗口与绘制',
    emoji: '🖼️',
    gradeLevel: '1-2',
    summary: '设置游戏窗口大小，用 draw() 函数绘制内容',

    // 基础版（1-2年级）
    easy: {
      story: '游戏需要一个大舞台！WIDTH 和 HEIGHT 就像是舞台的宽度和高度，决定游戏窗口有多大。',
      concept: 'WIDTH 和 HEIGHT 是 Pygame Zero 约定好的变量，用来设置窗口的宽度和高度，字母必须全部大写。',
      syntax: 'WIDTH = 数字\nHEIGHT = 数字',
      example: {
        title: '设置游戏窗口',
        code: '# 设置窗口大小\nWIDTH = 800\nHEIGHT = 600\n\n# 宽度是800像素\n# 高度是600像素',
        output: '创建 800x600 的窗口',
        explanation: 'WIDTH 设置窗口宽度，HEIGHT 设置窗口高度，单位是像素。'
      },
      practice: [
        { question: 'WIDTH 设置的是什么？', answer: '窗口的宽度' },
        { question: '变量名可以写成 width 吗？', answer: '不行，必须全部大写 WIDTH' }
      ]
    },

    // 进阶版（3-4年级）
    medium: {
      story: '舞台搭好了，现在要学习如何绘制！draw() 函数就像一个画家，每帧都会在画布上绘制所有内容。',
      concept: 'draw() 是 Pygame Zero 约定好的函数，程序运行后会被自动调用，负责将图像绘制在窗口中。',
      syntax: 'def draw():\n    screen.clear()\n    # 绘制内容',
      example: {
        title: '绘制背景',
        code: 'import pgzrun\n\nWIDTH = 800\nHEIGHT = 600\n\ndef draw():\n    screen.clear()\n    screen.blit("背景图片", [0, 0])\n\npgzrun.go()',
        output: '窗口显示背景图片',
        explanation: 'screen.clear() 清空窗口，screen.blit() 绘制图片，[0,0] 是坐标。'
      },
      practice: [
        { question: 'draw() 函数需要手动调用吗？', answer: '不需要，会自动调用' },
        { question: 'screen.clear() 是做什么的？', answer: '清空窗口内容' }
      ]
    },

    // 挑战版（5-6年级）
    hard: {
      story: '舞台大师模式！你可以绘制多层背景、动画效果、UI 元素等等。',
      concept: 'draw() 函数每帧调用一次，通常每秒60帧。可以在其中绘制多个角色和背景。',
      syntax: 'def draw():\n    screen.clear()\n    screen.blit("背景", [0, 0])\n    actor.draw()\n    # 更多绘制',
      example: {
        title: '绘制多个元素',
        code: 'def draw():\n    screen.clear()\n    # 绘制背景\n    screen.blit("森林", [0, 0])\n    # 绘制角色\n    player.draw()\n    enemy.draw()\n    # 绘制UI\n    screen.draw.text("得分: 100", (10, 10))',
        output: '绘制背景、角色和得分',
        explanation: '按照绘制顺序，后面的内容会覆盖前面的。通常先画背景，再画角色，最后画UI。'
      },
      practice: [
        { question: '每秒 draw() 调用多少次？', answer: '60次（60帧/秒）' },
        { question: '绘制顺序有什么影响？', answer: '后面的会覆盖前面的' }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '角色登场 - Actor 创建与坐标',
    emoji: '🎭',
    gradeLevel: '1-2',
    summary: '用 Actor() 创建角色，用 x 和 y 设置角色位置',

    // 基础版（1-2年级）
    easy: {
      story: '游戏中的主角、敌人、道具都是角色！Actor() 可以创建角色，就像给游戏世界添加了鲜活的演员。',
      concept: 'Actor() 命令可以创建游戏角色。注意首字母 A 要大写。',
      syntax: '角色名 = Actor("图片名称")',
      example: {
        title: '创建一个角色',
        code: '# 创建一个叫 rock 的角色\nrock = Actor("石头")\n\n# 角色出现在窗口中',
        output: '创建石头角色',
        explanation: 'Actor("图片名") 创建角色，图片名不需要写后缀。'
      },
      practice: [
        { question: 'Actor 首字母要大写吗？', answer: '要，必须大写 A' },
        { question: '图片名需要写 .png 后缀吗？', answer: '不需要，可以省略' }
      ]
    },

    // 进阶版（3-4年级）
    medium: {
      story: '角色登场了！但它在哪里呢？用 x 和 y 坐标可以确定角色在窗口中的位置。',
      concept: '每个角色都有 x 和 y 两个坐标值，表示角色在窗口中的位置。窗口左上角是 (0,0)。',
      syntax: '# 创建角色\n角色 = Actor("图片名")\n\n# 设置位置\n角色.x = x坐标\n角色.y = y坐标\n\n# 绘制角色\n角色.draw()',
      example: {
        title: '设置角色位置',
        code: '# 创建角色\nrock = Actor("石头")\n\n# 设置位置\nrock.x = 100\nrock.y = 100\n\ndef draw():\n    rock.draw()',
        output: '角色在(100, 100)位置显示',
        explanation: 'rock.x 和 rock.y 设置角色坐标，rock.draw() 在窗口中绘制角色。'
      },
      practice: [
        { question: '窗口左上角的坐标是？', answer: '(0, 0)' },
        { question: 'x 坐标向哪个方向增大？', answer: '向右' }
      ]
    },

    // 挑战版（5-6年级）
    hard: {
      story: '坐标大师模式！你可以精确定位角色，实现移动、碰撞检测等高级功能。',
      concept: 'Pygame Zero 使用屏幕坐标系：原点在左上角，x 轴向右为正，y 轴向下为正。角色的坐标指的是角色中心点的位置。',
      syntax: '角色.x += 数字  # 向右移动\n角色.x -= 数字  # 向左移动\n角色.y += 数字  # 向下移动\n角色.y -= 数字  # 向上移动',
      example: {
        title: '移动角色',
        code: '# 创建角色\nplayer = Actor("玩家")\nplayer.x = 400\nplayer.y = 300\n\ndef update():\n    # 持续向右移动\n    player.x += 2\n\ndef draw():\n    screen.clear()\n    player.draw()',
        output: '角色自动向右移动',
        explanation: 'update() 每秒调用60次，每次 player.x 增加2，实现平滑移动效果。'
      },
      practice: [
        { question: 'y 坐标向下是增大还是减小？', answer: '增大' },
        { question: '要让角色向左移动应该怎么做？', answer: '角色.x -= 数字' }
      ]
    }
  }
]

// 习题数据（编程 × 数学融合）
export const exercises = [
  // 基础题（1-2年级）
  {
    id: 'ex-1',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '命令记忆',
    question: '要启动 Pygame Zero 游戏窗口，我们需要在代码的最后一行添加什么命令？',
    options: [
      'pgzrun.run()',
      'pgzrun.go()',
      'pgzrun.start()',
      'pgzrun.begin()'
    ],
    answer: 1, // B
    explanation: 'pgzrun.go() 是启动 Pygame Zero 游戏的标准命令。这个命令会告诉 Pygame 开始运行游戏代码，启动游戏窗口。',
    hint: 'go 是"开始"的意思'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '大小写规则',
    question: '在 Pygame Zero 中，设置窗口宽度的变量名应该怎么写？',
    options: [
      'width',
      'Width',
      'WIDTH',
      'width_'
    ],
    answer: 2, // C
    explanation: 'WIDTH 和 HEIGHT 是 Pygame Zero 约定好的变量名，必须全部大写。这是框架的命名规范。',
    hint: '约定好的变量名要全部大写'
  },

  // 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '坐标系统',
    question: '在 Pygame Zero 窗口中，坐标 (0, 0) 表示什么位置？',
    options: [
      '窗口中心',
      '窗口左上角',
      '窗口右下角',
      '窗口左下角'
    ],
    answer: 1, // B
    explanation: 'Pygame Zero 使用屏幕坐标系，原点 (0, 0) 在窗口的左上角。x 轴向右增大，y 轴向下增大。\n\n数学知识：这是计算机图形学中常用的坐标系，与数学中的笛卡尔坐标系不同。',
    hint: '想象窗口是一个画布，从哪里开始数？'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '坐标变化',
    question: '一个角色的初始坐标是 (100, 100)。如果执行 `角色.x = 角色.x + 50`，角色的新坐标是多少？',
    options: [
      '(100, 150)',
      '(150, 100)',
      '(150, 150)',
      '(50, 100)'
    ],
    answer: 1, // B
    explanation: '角色.x = 角色.x + 50 让 x 坐标增加 50，从 100 变成 150。y 坐标不变，还是 100。\n\n数学知识：这是坐标的平移，x 坐标加 50 表示向右平移 50 个单位。',
    hint: 'x 坐标变化是什么方向？'
  },

  // 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '行程问题',
    question: '猴赛雷在 x = 0 的位置，帽子在 x = 6 的位置。猴赛雷每走一步可以前进 2 格，想要拿回帽子，需要向右走几步？',
    options: [
      '1步',
      '2步',
      '3步',
      '4步'
    ],
    answer: 2, // C
    explanation: '这是一道经典的行程问题！\n\n总距离 = 6 - 0 = 6 格\n每步距离 = 2 格\n需要步数 = 6 ÷ 2 = 3 步\n\n在 Pygame Zero 中，可以用 `角色.x += 2` 在 update() 函数中实现，每次调用增加 2，经过 3 次后就能到达目标位置。',
    hint: '总距离除以每步距离等于步数'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '函数调用频率',
    question: 'Pygame Zero 中，update() 函数每秒调用多少次？如果每次角色移动 2 个像素，每秒能移动多少像素？',
    options: [
      '30次，60像素',
      '60次，120像素',
      '60次，60像素',
      '120次，240像素'
    ],
    answer: 1, // B
    explanation: 'update() 函数每秒调用 60 次（60帧/秒）。\n\n每次移动 2 像素，每秒移动距离 = 60 × 2 = 120 像素。\n\n数学知识：这是乘法的应用，频率 × 单次变化量 = 总变化量。这就是游戏动画流畅的原理！',
    hint: '60帧/秒是游戏的标准帧率'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L12-1',
  title: '智闯银科山',
  subtitle: '学会 Pygame Zero 入门和角色创建',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '了解 Pygame Zero 游戏开发框架',
    '掌握设置窗口大小的方法',
    '学会创建和绘制角色',
    '理解角色坐标系统'
  ],
  prerequisites: [
    'Python 基础语法',
    '函数基础概念',
    '坐标系统基础'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['width', 'image', 'actor', 'draw'],
  medium: ['update', 'import', 'screen', 'clear'],
  hard: ['pgzrun', 'colliderect', 'coordinate', 'animation']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'import pgzrun',
    'WIDTH = 800',
    'HEIGHT = 600',
    'pgzrun.go()',
    'rock = Actor("石头")',
    'rock.draw()'
  ],
  medium: [
    'def draw():\n    screen.clear()',
    'rock.x = 100\nrock.y = 100',
    'def update():\n    pass',
    'screen.blit("背景", [0, 0])',
    'player = Actor("玩家")\nplayer.draw()',
    'WIDTH = 800\nHEIGHT = 600'
  ],
  hard: [
    'def draw():\n    screen.clear()\n    player.draw()',
    'def update():\n    player.x += 2',
    'rock = Actor("石头")\nrock.x = 100\nrock.y = 100',
    'import pgzrun\nWIDTH = 800\nHEIGHT = 600\ndef draw():\n    pass\npgzrun.go()'
  ]
}

// 导出所有数据
export const L12_1_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L12_1_data
