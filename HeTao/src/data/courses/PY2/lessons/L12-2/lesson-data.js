/**
 * PY2 课程 L12-2: 探秘银科山
 *
 * 核心知识点:
 * 1. 鼠标事件 (on_mouse_down, on_mouse_up)
 * 2. 碰撞检测 (colliderect)
 * 3. 角色造型切换
 * 4. 音乐播放 (music.play_once)
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'mouse',
    pronunciation: '[maus]',
    partOfSpeech: 'n.',
    meaning: '老鼠；鼠标',
    level: 'easy',
    example: 'Click the mouse button to start.',
    exampleTranslation: '点击鼠标按钮开始。'
  },
  {
    word: 'down',
    pronunciation: '[daun]',
    partOfSpeech: 'adv./prep.',
    meaning: '向下；下降',
    level: 'easy',
    example: 'The mouse went down.',
    exampleTranslation: '鼠标按下了。'
  },
  {
    word: 'up',
    pronunciation: '[ʌp]',
    partOfSpeech: 'adv./prep.',
    meaning: '向上；升高',
    level: 'easy',
    example: 'The mouse went up.',
    exampleTranslation: '鼠标松开了。'
  },
  // 拓展单词
  {
    word: 'collision',
    pronunciation: "[kə'liʒn]",
    partOfSpeech: 'n.',
    meaning: '碰撞；冲突',
    level: 'hard',
    example: 'Check if two objects have a collision.',
    exampleTranslation: '检查两个物体是否碰撞。'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '点击魔法 - 鼠标事件',
    emoji: '🖱️',
    gradeLevel: '1-2',
    summary: '用鼠标控制游戏，按下和松开触发不同事件',

    // 基础版（1-2年级）
    easy: {
      story: '想象你有一个魔法按钮，按下时发生一件事，松开时又发生另一件事！这就是鼠标事件。',
      concept: 'on_mouse_down() 在鼠标按下时执行，on_mouse_up() 在鼠标松开时执行。',
      syntax: 'def on_mouse_down():\n    # 按下时执行的代码\n\ndef on_mouse_up():\n    # 松开时执行的代码',
      example: {
        title: '钥匙按下去',
        code: 'key = Actor("正常")\nkey.y = 80\n\ndef draw():\n    key.draw()\n\ndef on_mouse_down():\n    key.y = 100  # 钥匙下移\n\ndef on_mouse_up():\n    key.y = 80   # 钥匙回原位',
        output: '按下鼠标钥匙下移，松开钥匙回位',
        explanation: '鼠标按下时 key.y 变成 100（向下），松开时回到 80（原位）。'
      },
      practice: [
        { question: '鼠标按下执行哪个函数？', answer: 'on_mouse_down()' },
        { question: '鼠标松开执行哪个函数？', answer: 'on_mouse_up()' }
      ]
    },

    // 进阶版（3-4年级）
    medium: {
      story: '现在你可以用鼠标控制各种游戏元素：按钮、开关、道具等等。',
      concept: '鼠标事件函数是 Pygame Zero 预定义的函数，不需要手动调用，鼠标操作时会自动触发。',
      syntax: 'def on_mouse_down():\n    角色名.y = 新位置\n\ndef on_mouse_up():\n    角色名.y = 原位置',
      example: {
        title: '按压按钮效果',
        code: 'button = Actor("按钮")\nbutton.x = 400\nbutton.y = 300\n\ndef on_mouse_down():\n    button.y = 310  # 按钮下沉\n\ndef on_mouse_up():\n    button.y = 300  # 按钮弹回\n\ndef draw():\n    screen.clear()\n    button.draw()',
        output: '按钮有按下的视觉效果',
        explanation: '通过改变 y 坐标模拟按钮按下的效果，给用户真实的反馈。'
      },
      practice: [
        { question: 'on_mouse_down() 需要手动调用吗？', answer: '不需要，自动触发' },
        { question: '如何实现按钮按下的效果？', answer: '改变 y 坐标让按钮下沉' }
      ]
    },

    // 挑战版（5-6年级）
    hard: {
      story: '鼠标大师模式！你可以检测鼠标位置、点击次数、拖拽效果等等。',
      concept: '高级鼠标操作包括获取鼠标坐标、检测点击位置、实现拖拽功能等。',
      syntax: 'def on_mouse_down(pos):\n    x, y = pos\n    # pos 是鼠标坐标\n\ndef on_mouse_up(pos):\n    x, y = pos',
      example: {
        title: '获取鼠标点击位置',
        code: 'def on_mouse_down(pos):\n    x, y = pos\n    print(f"点击位置: {x}, {y}")\n    if x < 400:\n        print("点击了左边")\n    else:\n        print("点击了右边")',
        output: '显示点击的坐标和区域',
        explanation: 'pos 参数包含鼠标点击的坐标，可以用它判断点击了哪个区域。'
      },
      practice: [
        { question: 'pos 参数是什么？', answer: '鼠标点击的坐标 (x, y)' },
        { question: '如何判断点击了窗口的哪一半？', answer: '比较 x 坐标和窗口宽度的一半' }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '碰撞检测 - colliderect',
    emoji: '💥',
    gradeLevel: '1-2',
    summary: '检测两个角色是否碰到一起',

    // 基础版（1-2年级）
    easy: {
      story: '想象两个角色在玩游戏，当它们碰到一起时会发生什么？colliderect() 可以告诉它们是否碰到了！',
      concept: 'colliderect() 函数可以判断两个角色是否碰撞（重叠），返回 True 或 False。',
      syntax: '角色1.colliderect(角色2)',
      example: {
        title: '检测碰撞',
        code: 'key = Actor("钥匙")\negg = Actor("能量蛋")\n\ndef on_mouse_down():\n    if key.colliderect(egg):\n        print("碰到了！")',
        output: '当钥匙碰到蛋时打印信息',
        explanation: 'key.colliderect(egg) 检测两个角色是否碰撞，碰撞返回 True。'
      },
      practice: [
        { question: 'colliderect() 返回什么？', answer: 'True 或 False' },
        { question: '角色A.colliderect(角色B) 和 角色B.colliderect(角色A) 一样吗？', answer: '一样，结果相同' }
      ]
    },

    // 进阶版（3-4年级）
    medium: {
      story: '碰撞检测是游戏的核心！可以用来检测吃到道具、碰到敌人、捡起物品等等。',
      concept: 'colliderect() 基于角色的矩形边界进行检测。当两个角色的矩形区域重叠时，就认为发生了碰撞。',
      syntax: 'if 角色A.colliderect(角色B):\n    # 碰撞后执行的代码\n    角色A.image = "新图片"\n    角色B.image = "新图片"',
      example: {
        title: '碰撞后切换造型',
        code: 'key = Actor("正常")\negg = Actor("有能量")\n\ndef on_mouse_down():\n    if key.colliderect(egg):\n        key.image = "充能"\n        egg.image = "无能量"\n\ndef draw():\n    screen.clear()\n    key.draw()\n    egg.draw()',
        output: '碰撞后钥匙和蛋的造型改变',
        explanation: '检测到碰撞后，用 角色名.image = 新图片 来切换角色造型。'
      },
      practice: [
        { question: '如何切换角色造型？', answer: '角色名.image = "新图片名"' },
        { question: '碰撞检测可以用在什么游戏场景？', answer: '吃道具、撞敌人、捡物品等' }
      ]
    },

    // 挑战版（5-6年级）
    hard: {
      story: '碰撞大师模式！你可以实现复杂的游戏逻辑：物品收集、伤害判定、区域检测等等。',
      concept: '碰撞检测的本质是矩形相交判断。Pygame Zero 使用 AABB（轴对齐边界框）算法，高效且准确。',
      syntax: '# 检测多个碰撞\nfor item in items:\n    if player.colliderect(item):\n        items.remove(item)\n        score += 10',
      example: {
        title: '收集多个物品',
        code: 'player = Actor("玩家")\ncoins = [Actor("金币") for _ in range(5)]\nscore = 0\n\ndef update():\n    global score\n    for coin in coins[:]:\n        if player.colliderect(coin):\n            coins.remove(coin)\n            score += 10',
        output: '玩家碰到金币就收集并得分',
        explanation: '遍历金币列表，检测每个金币是否与玩家碰撞，碰撞则移除金币并加分。'
      },
      practice: [
        { question: 'coins[:] 是什么意思？', answer: '创建列表副本，避免迭代时修改原列表' },
        { question: 'AABB 碰撞检测的优缺点？', answer: '优点是快速，缺点是不精确（对于不规则形状）' }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '声音魔法 - 播放音乐',
    emoji: '🔊',
    gradeLevel: '3-4',
    summary: '用 music.play_once() 播放音效和背景音乐',

    // 基础版（1-2年级）
    easy: {
      story: '游戏有了声音会更加生动！点击时播放声音，胜利时播放音乐，让游戏更有趣！',
      concept: 'music.play_once() 可以播放一次音乐或音效。',
      syntax: 'music.play_once("文件名")',
      example: {
        title: '播放点击音效',
        code: 'def on_mouse_down():\n    music.play_once("点击声.mp3")',
        output: '鼠标按下时播放音效',
        explanation: '当鼠标按下时，播放"点击声.mp3"文件一次。'
      },
      practice: [
        { question: 'play_once 播放几次？', answer: '一次' },
        { question: '需要写文件扩展名吗？', answer: '可以写 .mp3 也可以省略' }
      ]
    },

    // 进阶版（3-4年级）
    medium: {
      story: '声音可以让游戏更有沉浸感！不同事件播放不同声音：背景音乐、音效、胜利音乐等。',
      concept: '音乐文件通常放在 images 文件夹同级目录。可以结合碰撞检测播放声音。',
      syntax: 'music.play_once("文件名.mp3")\n# 或者\nmusic.play_once("文件名")',
      example: {
        title: '碰撞时播放声音',
        code: 'def on_mouse_down():\n    if key.colliderect(egg):\n        key.image = "充能"\n        egg.image = "无能量"\n        music.play_once("能量收集.mp3")',
        output: '碰撞并播放收集音效',
        explanation: '检测到碰撞后，先切换造型，再播放音效，给玩家完整的反馈。'
      },
      practice: [
        { question: '音乐文件应该放在哪里？', answer: '游戏项目文件夹中' },
        { question: '如何实现点击不同按钮播放不同声音？', answer: '在不同按钮的点击事件中调用不同的音乐' }
      ]
    },

    // 挑战版（5-6年级）
    hard: {
      story: '声音大师模式！你可以实现完整的音效系统：背景音乐循环、音量控制、多种音效组合等。',
      concept: '高级音频功能包括背景音乐循环、音量控制、音效优先级等。play_once 只播放一次，需要循环可以用其他方法。',
      syntax: '# 音效系统\nsound_effects = {\n    "jump": "跳跃.mp3",\n    "coin": "金币.mp3",\n    "win": "胜利.mp3"\n}\n\nmusic.play_once(sound_effects["jump"])',
      example: {
        title: '音效系统',
        code: '# 定义音效字典\neffects = {\n    "collect": "收集.mp3",\n    "win": "胜利.mp3",\n    "lose": "失败.mp3"\n}\n\ndef play_effect(name):\n    music.play_once(effects[name])\n\n# 使用\nif score >= 100:\n    play_effect("win")',
        output: '使用音效系统播放不同声音',
        explanation: '用字典管理音效，通过函数统一调用，代码更清晰易维护。'
      },
      practice: [
        { question: '为什么用字典管理音效？', answer: '代码更清晰，易于维护和扩展' },
        { question: '如何实现音效优先级？', answer: '可以在播放前检查是否已有音效在播放' }
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
    mathConcept: '函数识别',
    question: '鼠标按下时执行哪个函数？',
    options: [
      'on_mouse_up()',
      'on_mouse_down()',
      'on_key_down()',
      'draw()'
    ],
    answer: 1, // B
    explanation: 'on_mouse_down() 在鼠标按下时执行，on_mouse_up() 在鼠标松开时执行。on_key_down() 是键盘事件，draw() 是绘制函数。',
    hint: 'down 是"向下、按下"的意思'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '概念理解',
    question: 'colliderect() 函数返回什么类型的结果？',
    options: [
      '数字',
      '字符串',
      'True 或 False',
      '列表'
    ],
    answer: 2, // C
    explanation: 'colliderect() 返回布尔值 True 或 False。True 表示碰撞（重叠），False 表示没有碰撞。',
    hint: '判断类函数通常返回 True/False'
  },

  // 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '代码理解',
    question: '下列能够正确判断角色 key 和角色 egg 是否发生碰撞的选项是？',
    options: [
      'key.collide(egg)',
      'key.colliderect(egg)',
      'collision(key, egg)',
      'key.check_collision(egg)'
    ],
    answer: 1, // B
    explanation: 'colliderect() 是 Pygame Zero 的碰撞检测函数，格式为：角色1.colliderect(角色2)。\n\n两个角色的位置可以互换，结果相同。',
    hint: '函数名包含 rect（矩形）和 collide（碰撞）'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '坐标变化',
    question: '角色初始 y 坐标是 80。按下鼠标时 y = 100，松开时 y = 80。这个效果模拟了什么？',
    options: [
      '角色消失',
      '角色移动',
      '按钮按下',
      '角色放大'
    ],
    answer: 2, // C
    explanation: 'y 坐标从 80 变成 100（向下），再回到 80（向上），模拟了按钮被按下的视觉效果。\n\n数学知识：y 坐标增加表示向下移动，y 坐标减小表示向上移动。在屏幕坐标系中，y 轴向下为正。',
    hint: 'y 坐标变化是什么方向？'
  },

  // 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '相遇问题',
    question: '冷雪丰和夏小满分别从 A、B 两点开始跑步。冷雪丰每分钟跑 200 米，夏小满每分钟跑 150 米。A、B 之间距离 3500 米。5 分钟后两人会相遇吗？',
    options: [
      '会相遇',
      '不会相遇',
      '刚好在终点相遇',
      '无法计算'
    ],
    answer: 1, // B
    explanation: '这是一道经典的相遇问题！\n\n冷雪丰跑的距离：5 × 200 = 1000 米\n夏小满跑的距离：5 × 150 = 750 米\n两人总共跑了：1000 + 750 = 1750 米\n\nA、B 距离是 3500 米，1750 < 3500，所以不会相遇。\n\n在 Pygame 中，可以把两人当作两个角色，用 colliderect() 检测是否相遇（碰撞）。',
    hint: '算算两人跑的总距离是多少？'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '函数组合',
    question: '想要实现"点击鼠标时播放音乐并切换角色造型"，应该在哪个函数中编写代码？',
    options: [
      '只在 draw() 函数中',
      '只在 update() 函数中',
      '只在 on_mouse_down() 函数中',
      '在 on_mouse_down() 和 music.play_once() 中'
    ],
    answer: 2, // C
    explanation: 'on_mouse_down() 在鼠标按下时自动执行，是处理鼠标点击事件的地方。\n\n正确的代码结构：\n```python\ndef on_mouse_down():\n    if 角色1.colliderect(角色2):\n        角色1.image = "新造型"\n        music.play_once("音效.mp3")\n```\n\n所有点击相关的操作都应该在 on_mouse_down() 中完成。',
    hint: '什么时候需要播放音乐和切换造型？'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L12-2',
  title: '探秘银科山',
  subtitle: '学会鼠标控制和碰撞检测',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握鼠标事件处理',
    '理解碰撞检测原理',
    '学会角色造型切换',
    '了解音效播放方法'
  ],
  prerequisites: [
    'L12-1 Pygame Zero 入门',
    '角色和坐标基础',
    '条件判断语句'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['mouse', 'down', 'up', 'click'],
  medium: ['colliderect', 'music', 'play', 'image'],
  hard: ['collision', 'detection', 'rectangle', 'intersect']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'def on_mouse_down():',
    'def on_mouse_up():',
    'music.play_once("音效")',
    'key.colliderect(egg)',
    'key.image = "新造型"'
  ],
  medium: [
    'def on_mouse_down():\n    key.y = 100',
    'if key.colliderect(egg):\n    pass',
    'music.play_once("收集.mp3")',
    'key = Actor("钥匙")\negg = Actor("蛋")',
    'def draw():\n    key.draw()\n    egg.draw()'
  ],
  hard: [
    'def on_mouse_down():\n    if key.colliderect(egg):\n        key.image = "充能"\n        music.play_once("音效.mp3")',
    'if player.colliderect(coin):\n    coins.remove(coin)\n    score += 10',
    'def on_mouse_down(pos):\n    x, y = pos\n    print(f"{x}, {y}")'
  ]
}

// 导出所有数据
export const L12_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L12_2_data
