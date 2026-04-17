/**
 * PY3 课程 L13-2: 飞机大战
 *
 * 核心知识点:
 * 1. 列表存储多角色
 * 2. 角色绘制与移动
 * 3. 碰撞检测与按键控制
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'ship',
    pronunciation: '[jip]',
    partOfSpeech: 'n.',
    meaning: '船；舰；飞船',
    level: 'easy',
    example: 'The ship is flying.',
    exampleTranslation: '飞船正在飞行。',
    note: 'A terrible storm forced the ship to put back. 可怕的风暴迫使这条船返航了。',
    source: 'ocr'
  },
  {
    word: 'weapon',
    pronunciation: "['wepan]",
    partOfSpeech: 'n.',
    meaning: '武器；兵器；工具',
    level: 'easy',
    example: 'Use your weapon wisely.',
    exampleTranslation: '明智地使用你的武器。',
    note: 'nuclear weapon 核武器',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'bullet',
    pronunciation: "['bulit]",
    partOfSpeech: 'n.',
    meaning: '子弹； bullet',
    level: 'medium',
    example: 'Fire the bullet!',
    exampleTranslation: '发射子弹！',
    note: '',
    source: 'extended'
  },
  {
    word: 'enemy',
    pronunciation: "['enami]",
    partOfSpeech: 'n.',
    meaning: '敌人；敌军',
    level: 'medium',
    example: 'The enemy is coming.',
    exampleTranslation: '敌人来了。',
    note: '',
    source: 'extended'
  },
  {
    word: 'list',
    pronunciation: '[list]',
    partOfSpeech: 'n.',
    meaning: '列表；清单',
    level: 'hard',
    example: 'Create a list of items.',
    exampleTranslation: '创建一个物品列表。',
    note: 'Python中的重要数据结构',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '列表存储多角色',
    emoji: '📋',
    gradeLevel: '3-4',
    summary: '用列表管理多个游戏角色',

    easy: {
      story: '想象你有很多玩具飞机，把它们都放进一个大盒子里，想用时从盒子里拿出来。列表就像这个盒子，可以存放很多东西！',
      concept: '列表是Python中存储多个数据的方式。用方括号[]创建列表，可以存放多个角色对象，方便统一管理。',
      syntax: '# 创建空列表\nenemies = []\n\n# 创建有内容的列表\nenemies = [enemy1, enemy2, enemy3]\n\n# 添加元素\nenemies.append(enemy4)',
      example: {
        title: '创建敌机列表',
        code: "# 创建空列表存放敌机\nenemies = []\n\n# 创建3架敌机并添加到列表\nfor i in range(3):\n    enemy = Actor('enemy')\n    enemies.append(enemy)",
        output: '列表中有3架敌机',
        explanation: '用for循环创建3架敌机，每次创建后用append()添加到列表中。'
      },
      practice: [
        {
          question: '创建空列表用什么符号？',
          answer: '方括号 []'
        },
        {
          question: '向列表添加元素用什么方法？',
          answer: 'append()'
        }
      ]
    },

    medium: {
      story: '你的敌机小队已经准备好了！现在学习如何遍历列表，让每架敌机都动起来，形成敌机编队！',
      concept: '遍历列表就是依次访问列表中的每个元素。用for循环可以遍历列表，对每个角色执行相同的操作。',
      syntax: '# 遍历列表\nfor enemy in enemies:\n    enemy.draw()  # 绘制每架敌机\n    enemy.y += 1  # 每架敌机向下移动',
      example: {
        title: '绘制所有敌机',
        code: "enemies = []\nfor i in range(5):\n    enemy = Actor('enemy')\n    enemy.pos = (100 + i * 100, 50)\n    enemies.append(enemy)\n\ndef draw():\n    for enemy in enemies:\n        enemy.draw()",
        output: '屏幕上显示5架敌机',
        explanation: 'for enemy in enemies 会依次取出每架敌机并绘制。'
      },
      practice: [
        {
          question: 'for enemy in enemies 的作用是什么？',
          answer: '依次访问列表中的每个敌机'
        },
        {
          question: '如何让每架敌机都向下移动？',
          answer: '在for循环中执行 enemy.y += 1'
        }
      ]
    },

    hard: {
      story: '高级技巧！学习列表的高级用法：动态添加和删除角色，让敌机不断生成、被消灭，打造刺激的射击游戏！',
      concept: '列表可以动态修改：append()添加元素，remove()删除元素，len()获取长度。配合碰撞检测可以实现敌机的生成和销毁。',
      syntax: "# 添加元素\nenemies.append(enemy)\n\n# 删除元素\nenemies.remove(enemy)\n\n# 获取长度\nnum = len(enemies)\n\n# 检查元素是否存在\nif enemy in enemies:\n    print('存在')",
      example: {
        title: '敌机被击中后删除',
        code: "def update():\n    for bullet in bullets:\n        for enemy in enemies:\n            if bullet.colliderect(enemy):\n                enemies.remove(enemy)  # 删除敌机\n                bullets.remove(bullet)  # 删除子弹\n                break",
        output: '子弹击中敌机时两者都消失',
        explanation: 'colliderect检测碰撞，remove()从列表中删除元素。'
      },
      practice: [
        {
          question: '如何获取列表中元素的数量？',
          answer: 'len(列表名)'
        },
        {
          question: '删除列表中的元素用什么方法？',
          answer: 'remove()'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '角色绘制与移动',
    emoji: '🚀',
    gradeLevel: '3-4',
    summary: '让角色在屏幕上移动起来',

    easy: {
      story: '飞机大战中，你的飞机可以上下左右移动，敌机从上方不断飞来。学习如何控制角色的位置！',
      concept: '角色的位置由pos属性控制，包含x和y坐标。改变x让角色左右移动，改变y让角色上下移动。',
      syntax: '# 设置角色位置\nplayer.pos = (400, 500)  # (x, y)\n\n# 移动角色\nplayer.x += 5  # 向右移动5像素\nplayer.y -= 5  # 向上移动5像素',
      example: {
        title: '键盘控制飞机',
        code: "def update():\n    if keyboard.left:\n        player.x -= 5\n    if keyboard.right:\n        player.x += 5",
        output: '用左右方向键控制飞机移动',
        explanation: 'keyboard检测按键，改变player.x实现移动。'
      },
      practice: [
        {
          question: '让角色向上移动应该改变什么？',
          answer: 'y坐标（减少y值）'
        },
        {
          question: 'player.pos = (100, 200) 中100代表什么？',
          answer: 'x坐标'
        }
      ]
    },

    medium: {
      story: '敌机应该从屏幕上方不断出现并向下移动。学习如何让多个角色同时移动，创建动态的游戏场景！',
      concept: '在update函数中遍历敌机列表，让每架敌机都向下移动。当敌机超出屏幕下方时，可以重置到屏幕上方。',
      syntax: 'def update():\n    for enemy in enemies:\n        enemy.y += 2  # 每架敌机向下移动\n        \n        # 超出屏幕则重置\n        if enemy.y > HEIGHT:\n            enemy.y = 0\n            enemy.x = random.randint(0, WIDTH)',
      example: {
        title: '敌机不断下落',
        code: "import random\n\ndef update():\n    for enemy in enemies:\n        enemy.y += 2\n        if enemy.y > HEIGHT:\n            enemy.y = -50\n            enemy.x = random.randint(50, WIDTH - 50)",
        output: '敌机不断从上方下落',
        explanation: 'random.randint()生成随机x坐标，让敌机出现位置不固定。'
      },
      practice: [
        {
          question: 'enemy.y += 2 的效果是什么？',
          answer: '敌机向下移动2像素'
        },
        {
          question: '如何让敌机出现在随机位置？',
          answer: '使用 random.randint() 生成随机坐标'
        }
      ]
    },

    hard: {
      story: '高级移动技巧！学习角色重复利用、不同速度移动、边界检测等技巧，让游戏更加丰富！',
      concept: '角色重复利用是指敌机飞出屏幕后不删除，而是重置位置重新出现。这比不断创建删除更高效。还可以给不同敌机设置不同速度。',
      syntax: "# 角色重复利用\nif enemy.y > HEIGHT:\n    enemy.y = -50  # 重置到屏幕上方\n    enemy.x = random.randint(50, WIDTH-50)\n    enemy.speed = random.randint(1, 5)  # 随机速度\n\n# 在update中使用角色的速度\nenemy.y += enemy.speed",
      example: {
        title: '带速度属性的敌机',
        code: "# 创建敌机时设置速度\nfor i in range(5):\n    enemy = Actor('enemy')\n    enemy.pos = (random.randint(50, 750), -50)\n    enemy.speed = random.randint(1, 4)\n    enemies.append(enemy)\n\ndef update():\n    for enemy in enemies:\n        enemy.y += enemy.speed  # 使用各自的速度",
        output: '每架敌机以不同速度下落',
        explanation: '给每个角色添加speed属性，实现差异化移动。'
      },
      practice: [
        {
          question: '角色重复利用的好处是什么？',
          answer: '不需要频繁创建和删除，更高效'
        },
        {
          question: '如何给角色添加自定义属性？',
          answer: '直接赋值，如 enemy.speed = 3'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '碰撞检测与按键射击',
    emoji: '💥',
    gradeLevel: '3-4',
    summary: '检测子弹是否击中目标',

    easy: {
      story: '子弹击中敌机时会发生爆炸！碰撞检测就是判断两个角色是否碰到一起，这是游戏的核心功能！',
      concept: '碰撞检测用于判断两个角色是否重叠。Pygame Zero提供了colliderect()方法，检测两个角色的矩形区域是否相交。',
      syntax: "# 检测两个角色是否碰撞\nif bullet.colliderect(enemy):\n    print('击中了')\n\n# colliderect返回True或False\nhit = player.colliderect(enemy)",
      example: {
        title: '检测子弹击中敌机',
        code: "def update():\n    for bullet in bullets:\n        for enemy in enemies:\n            if bullet.colliderect(enemy):\n                print('击中！')",
        output: '子弹碰到敌机时显示"击中！"',
        explanation: 'colliderect检测两个角色的矩形边界框是否相交。'
      },
      practice: [
        {
          question: 'colliderect()返回什么类型的值？',
          answer: '布尔值（True或False）'
        },
        {
          question: '如何判断玩家被敌机撞到？',
          answer: 'if player.colliderect(enemy)'
        }
      ]
    },

    medium: {
      story: '你已经会检测碰撞了，现在学习按键射击！按空格键发射子弹，让子弹向上飞行击落敌机！',
      concept: '按空格键创建子弹角色，设置子弹位置在玩家位置，然后让子弹向上移动。子弹也需要用列表管理。',
      syntax: "# 按空格发射子弹\ndef on_key_down(key):\n    if key == keys.SPACE:\n        bullet = Actor('bullet')\n        bullet.pos = player.pos  # 从玩家位置发射\n        bullets.append(bullet)\n\n# 子弹向上移动\ndef update():\n    for bullet in bullets:\n        bullet.y -= 10  # 子弹向上飞",
      example: {
        title: '完整的射击功能',
        code: "bullets = []\n\ndef on_key_down(key):\n    if key == keys.SPACE:\n        bullet = Actor('bullet')\n        bullet.midbottom = player.midtop  # 从飞机顶部发射\n        bullets.append(bullet)\n\ndef update():\n    for bullet in bullets:\n        bullet.y -= 8  # 子弹速度",
        output: '按空格键发射子弹，子弹向上飞',
        explanation: 'bullet.midbottom = player.midtop 让子弹从飞机顶部发射。'
      },
      practice: [
        {
          question: '子弹应该朝哪个方向移动？',
          answer: '向上（减少y坐标）'
        },
        {
          question: '如何让子弹从玩家位置发射？',
          answer: 'bullet.pos = player.pos'
        }
      ]
    },

    hard: {
      story: '射击游戏进阶！学习子弹和敌机的完整交互：碰撞后两者都消失，添加爆炸效果，计算得分！',
      concept: '完整的射击系统包括：创建子弹、子弹移动、碰撞检测、删除碰撞的双方、更新分数。需要注意遍历列表时的删除操作。',
      syntax: "score = 0\n\ndef update():\n    global score\n    \n    # 子弹移动\n    for bullet in bullets:\n        bullet.y -= 10\n    \n    # 碰撞检测\n    for bullet in bullets[:]:  # 使用切片创建副本遍历\n        for enemy in enemies[:]:\n            if bullet.colliderect(enemy):\n                bullets.remove(bullet)\n                enemies.remove(enemy)\n                score += 10\n                break",
      example: {
        title: '完整碰撞处理',
        code: "def update():\n    global score\n    \n    # 遍历副本，安全删除\n    for bullet in bullets[:]:\n        bullet.y -= 10\n        for enemy in enemies[:]:\n            if bullet.colliderect(enemy):\n                # 创建爆炸效果（如果有）\n                explosions.append(Explosion(enemy.pos))\n                bullets.remove(bullet)\n                enemies.remove(enemy)\n                score += 10\n                break",
        output: '子弹击中敌机后两者消失，分数增加',
        explanation: '使用bullets[:]切片创建副本遍历，避免在遍历时删除元素导致错误。'
      },
      practice: [
        {
          question: '为什么用 bullets[:] 而不是 bullets 遍历？',
          answer: '创建副本遍历，避免遍历时删除元素出错'
        },
        {
          question: '击中敌机后应该做什么？',
          answer: '删除子弹和敌机，增加分数'
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
    mathConcept: '列表基础',
    question: '创建一个空列表应该用什么代码？',
    options: [
      'list = ()',
      'list = []',
      'list = {}',
      'list = ""'
    ],
    answer: 1,
    explanation: 'Python中用方括号[]创建列表，圆括号()创建元组，花括号{}创建字典。',
    hint: '列表用方括号'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '方向判断',
    question: '让飞机向上移动应该怎么写？',
    options: [
      'player.x += 5',
      'player.x -= 5',
      'player.y += 5',
      'player.y -= 5'
    ],
    answer: 3,
    explanation: '屏幕坐标系中，y轴向下是正方向，所以减少y值（player.y -= 5）让飞机向上移动。',
    hint: '向上是减少y值'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '循环遍历',
    question: 'for enemy in enemies: 这行代码的作用是什么？',
    options: [
      '创建一个enemy',
      '删除enemies中的元素',
      '依次访问enemies中的每个元素',
      '清空enemies列表'
    ],
    answer: 2,
    explanation: 'for...in循环会依次取出列表中的每个元素，赋值给循环变量enemy，然后执行循环体内的代码。',
    hint: 'for循环用于遍历列表'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '碰撞检测',
    question: 'bullet.colliderect(enemy) 返回什么？',
    options: [
      '两个角色的距离',
      '两个角色的位置',
      'True或False',
      '碰撞的坐标'
    ],
    answer: 2,
    explanation: 'colliderect()方法检测两个角色是否碰撞，返回布尔值：碰撞返回True，不碰撞返回False。',
    hint: '这是一个判断方法'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '坐标计算',
    question: '屏幕高度600，敌机y坐标是-50，每帧向下移动5像素，多少帧后敌机刚好出现在屏幕上（y=0）？',
    options: [
      '10帧',
      '12帧',
      '50帧',
      '60帧'
    ],
    answer: 0,
    explanation: '敌机从y=-50移动到y=0，需要移动50像素。每帧移动5像素，所以需要 50 ÷ 5 = 10帧。',
    hint: '移动距离 ÷ 每帧移动距离 = 帧数'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '逻辑推理',
    question: '遍历列表时删除元素为什么要用 bullets[:] 创建副本？',
    options: [
      '删除更快',
      '节省内存',
      '避免遍历时修改列表导致错误',
      '让代码更简洁'
    ],
    answer: 2,
    explanation: '在遍历列表时直接删除元素会导致索引错乱或遗漏元素。使用切片bullets[:]创建副本遍历，原列表可以安全修改。',
    hint: '遍历和删除同时进行会有问题'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L13-2',
  title: '飞机大战',
  subtitle: '学会列表存储多角色和碰撞检测',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握列表的创建和遍历',
    '学会管理多个游戏角色',
    '理解碰撞检测的原理',
    '实现按键射击功能'
  ],
  prerequisites: [
    'L13-1 Pygame Zero基础',
    'Python for循环',
    '基本的坐标系统'
  ]
}

// 打字练习单词（按难度分组，纯英文）
export const typingWords = {
  easy: ['ship', 'game', 'list', 'fire'],
  medium: ['weapon', 'bullet', 'enemy', 'score'],
  hard: ['append', 'remove', 'colliderect', 'update']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'enemies = []',
    'enemies.append(enemy)',
    'enemy.y += 2',
    'for enemy in enemies:',
    'player.pos = (400, 500)'
  ],
  medium: [
    'for enemy in enemies:\n    enemy.draw()',
    'if bullet.colliderect(enemy):\n    print("hit!")',
    'def on_key_down(key):\n    if key == keys.SPACE:',
    'bullet = Actor("bullet")'
  ],
  hard: [
    'for bullet in bullets[:]:\n    if bullet.colliderect(enemy):\n        bullets.remove(bullet)',
    'enemy.speed = random.randint(1, 4)\nenemy.y += enemy.speed',
    'if enemy.y > HEIGHT:\n    enemy.y = -50\n    enemy.x = random.randint(0, WIDTH)'
  ]
}

// 导出所有数据
export const L13_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L13_2_data
