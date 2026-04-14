/**
 * PY3 课程 L14-1: 魔法闹钟
 *
 * 核心知识点:
 * 1. clock定时器基础
 * 2. clock.schedule()单次定时
 * 3. 定时执行函数
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'clock',
    pronunciation: '[klok]',
    partOfSpeech: 'n./v.',
    meaning: '钟表；计时器；计数',
    level: 'easy',
    example: 'The clock shows the time.',
    exampleTranslation: '时钟显示时间。',
    note: 'Pygame Zero中的定时器模块'
  },
  {
    word: 'schedule',
    pronunciation: "['sked3u:l]",
    partOfSpeech: 'v./n.',
    meaning: '安排；预定；时间表',
    level: 'easy',
    example: 'Schedule the task for later.',
    exampleTranslation: '把任务安排到稍后。',
    note: 'clock.schedule() 定时执行函数'
  },
  {
    word: 'ring',
    pronunciation: '[rin]',
    partOfSpeech: 'n./v.',
    meaning: '戒指；环；铃声；响起铃声',
    level: 'medium',
    example: 'The alarm will ring.',
    exampleTranslation: '闹钟会响。',
    note: ''
  },
  {
    word: 'sound',
    pronunciation: '[saund]',
    partOfSpeech: 'n./v./adj.',
    meaning: '声音；发声；完好的',
    level: 'medium',
    example: 'Play a sound effect.',
    exampleTranslation: '播放音效。',
    note: 'Pygame Zero中sounds对象播放声音'
  },
  // 拓展单词
  {
    word: 'timer',
    pronunciation: "['taimar]",
    partOfSpeech: 'n.',
    meaning: '计时器；定时器',
    level: 'hard',
    example: 'Set a timer for 5 seconds.',
    exampleTranslation: '设置一个5秒的计时器。',
    note: ''
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: 'clock定时器基础',
    emoji: '⏰',
    gradeLevel: '3-4',
    summary: '让程序在指定时间后自动执行函数',

    easy: {
      story: '想象你有一个魔法闹钟，可以设置在几秒后响铃。clock定时器就是这样的魔法工具，让程序在指定时间后自动做某件事！',
      concept: 'clock是Pygame Zero提供的定时器模块。它可以让我们设置一个延迟时间，时间到了就自动调用指定的函数。',
      syntax: "# 导入模块（Pygame Zero自动提供）\n# clock是内置对象，无需导入\n\n# 使用clock\nimport pgzrun\n\nclock  # clock对象自动可用",
      example: {
        title: '定时器的概念',
        code: "# clock就像一个闹钟\n# 可以设置：多少秒后做什么事\n\n# 3秒后响铃\nclock.schedule(ring_alarm, 3)",
        output: '3秒后自动调用ring_alarm函数',
        explanation: 'clock.schedule设置一个定时任务，3秒后自动执行ring_alarm函数。'
      },
      practice: [
        {
          question: 'clock是什么模块？',
          answer: 'Pygame Zero的定时器模块'
        },
        {
          question: 'clock可以做什么？',
          answer: '让程序在指定时间后自动执行函数'
        }
      ]
    },

    medium: {
      story: '定时器就像你的小助手！你告诉它："5秒后帮我叫醒玩家"，它就会准时执行，期间你可以继续做其他事情！',
      concept: 'clock定时器是非阻塞的，设置定时器后程序会继续执行其他代码，到时间了才执行定时函数。这让游戏可以同时处理多件事。',
      syntax: "# 设置定时器\nclock.schedule(函数名, 秒数)\n\n# 示例：2秒后执行jump函数\nclock.schedule(jump, 2)\n\n# 程序会继续运行，2秒后自动调用jump()",
      example: {
        title: '设置定时任务',
        code: "def ring():\n    print('闹钟响了！')\n\ndef on_mouse_down(pos):\n    # 点击后3秒响铃\n    clock.schedule(ring, 3)\n    print('闹钟已设置，3秒后响...')",
        output: '点击后立即显示"闹钟已设置"，3秒后显示"闹钟响了！"',
        explanation: '设置定时器后程序不会停住，而是继续运行。3秒后ring函数被自动调用。'
      },
      practice: [
        {
          question: '设置定时器后程序会停住等待吗？',
          answer: '不会，程序继续运行，到时间自动执行'
        },
        {
          question: 'clock.schedule的第一个参数是什么？',
          answer: '要执行的函数名（不带括号）'
        }
      ]
    },

    hard: {
      story: '高级定时技巧！定时器可以配合游戏状态、动画效果使用，创建丰富的游戏体验！',
      concept: '定时器可以设置多个，可以传递参数，也可以取消。高级用法包括链式定时（一个定时器结束后设置下一个）实现复杂动画。',
      syntax: "# 设置多个定时器\nclock.schedule(task1, 1)\nclock.schedule(task2, 3)\nclock.schedule(task3, 5)\n\n# 取消定时器（需要保存返回值）\ntimer_id = clock.schedule(task, 10)\nclock.unschedule(timer_id)",
      example: {
        title: '倒计时效果',
        code: "def countdown(n):\n    if n > 0:\n        print(n)\n        clock.schedule(lambda: countdown(n-1), 1)\n    else:\n        print('时间到！')\n\n# 开始5秒倒计时\ncountdown(5)",
        output: '每秒显示一个数字：5、4、3、2、1、时间到！',
        explanation: '递归调用定时器，每次1秒后显示下一个数字，实现倒计时效果。'
      },
      practice: [
        {
          question: '如何取消一个已设置的定时器？',
          answer: '用clock.unschedule(定时器ID)'
        },
        {
          question: '可以同时设置多个定时器吗？',
          answer: '可以，每个定时器独立运行'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: 'clock.schedule()单次定时',
    emoji: '📌',
    gradeLevel: '3-4',
    summary: '让函数在指定秒数后执行一次',

    easy: {
      story: 'clock.schedule就像设置一个提醒："3秒后提醒我吃药"。时间到了就提醒一次，不会反复提醒！',
      concept: 'clock.schedule(函数名, 秒数)让指定的函数在若干秒后执行一次，只执行一次，不会重复。',
      syntax: "# 基本格式\nclock.schedule(函数名, 秒数)\n\n# 例如：3秒后执行run函数\nclock.schedule(run, 3)\n\n# 注意：函数名不带括号！",
      example: {
        title: '3秒后开始游戏',
        code: "def start_game():\n    print('游戏开始！')\n\ndef on_mouse_down(pos):\n    print('倒计时3秒...')\n    clock.schedule(start_game, 3)",
        output: '点击后显示倒计时，3秒后显示"游戏开始！"',
        explanation: 'clock.schedule只执行一次，适合单次延迟操作。'
      },
      practice: [
        {
          question: 'clock.schedule(run, 3)中的3代表什么？',
          answer: '3秒后执行'
        },
        {
          question: '为什么函数名不加括号？',
          answer: '加括号会立即执行，我们只传递函数引用'
        }
      ]
    },

    medium: {
      story: '在游戏中，schedule可以做很多事情：延迟出现敌人、延迟播放音效、延迟切换场景等等！',
      concept: 'schedule适合需要延迟执行的场景，如：游戏开始倒计时、角色死亡后重生、点击按钮后延迟切换界面等。',
      syntax: "# 常见应用场景\n\n# 1. 延迟播放音效\nclock.schedule(play_sound, 0.5)\n\n# 2. 延迟生成敌人\nclock.schedule(spawn_enemy, 2)\n\n# 3. 延迟切换状态\nclock.schedule(game_over, 5)",
      example: {
        title: '延迟生成敌人',
        code: "enemies = []\n\ndef spawn_enemy():\n    enemy = Actor('enemy')\n    enemy.pos = (400, 0)\n    enemies.append(enemy)\n    print('敌人出现了！')\n\ndef on_mouse_down(pos):\n    # 点击后2秒生成敌人\n    clock.schedule(spawn_enemy, 2)",
        output: '点击2秒后敌人在屏幕顶部出现',
        explanation: '延迟生成让玩家有时间准备，增加游戏体验。'
      },
      practice: [
        {
          question: 'schedule适合什么场景？',
          answer: '需要延迟执行一次的操作'
        },
        {
          question: '能让敌人每2秒出现一次吗？',
          answer: '不能，schedule只执行一次，需要用schedule_interval'
        }
      ]
    },

    hard: {
      story: '掌握schedule的高级用法！结合匿名函数lambda、参数传递、取消定时等技巧，实现复杂游戏逻辑！',
      concept: '使用lambda可以传递参数给定时函数。保存schedule的返回值可以取消定时器。多个定时器可以组合使用。',
      syntax: "# 使用lambda传递参数\nclock.schedule(lambda: spawn_at(100, 200), 2)\n\n# 保存定时器ID以便取消\ntimer = clock.schedule(boss_appear, 10)\n\n# 取消定时\nclock.unschedule(timer)\n\n# 条件定时\nif score > 100:\n    clock.schedule(level_up, 3)",
      example: {
        title: '带参数的定时器',
        code: "def spawn_at(x, y):\n    enemy = Actor('enemy')\n    enemy.pos = (x, y)\n    enemies.append(enemy)\n    print(f'敌人在({x},{y})出现')\n\ndef on_mouse_down(pos):\n    # 2秒后在点击位置生成敌人\n    x, y = pos\n    clock.schedule(lambda: spawn_at(x, y), 2)",
        output: '点击2秒后在点击位置生成敌人',
        explanation: 'lambda可以捕获当前变量值，传递给定时执行的函数。'
      },
      practice: [
        {
          question: '如何给定时函数传递参数？',
          answer: '使用lambda表达式'
        },
        {
          question: '为什么需要取消定时器？',
          answer: '游戏结束时清理未执行的任务，避免错误'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '定时执行函数',
    emoji: '🔔',
    gradeLevel: '3-4',
    summary: '定义被定时器调用的函数',

    easy: {
      story: '定时器调用的函数就像一个"待命的小兵"，当定时器响铃时，这个小兵就会出来执行任务！',
      concept: '被定时器调用的函数就是普通函数，定义方式和一般函数相同。但要注意：定时器调用时不会传递参数。',
      syntax: "# 定义被定时调用的函数\ndef my_function():\n    print('时间到了！')\n\n# 设置定时器调用它\nclock.schedule(my_function, 3)",
      example: {
        title: '闹钟函数',
        code: "def ring_alarm():\n    print('叮铃铃！起床啦！')\n    sounds.alarm.play()  # 播放闹钟声音\n\ndef on_key_down(key):\n    if key == keys.SPACE:\n        print('闹钟已设置，5秒后响...')\n        clock.schedule(ring_alarm, 5)",
        output: '按空格5秒后播放闹钟声音',
        explanation: 'ring_alarm是普通函数，被定时器在5秒后自动调用。'
      },
      practice: [
        {
          question: '定时器调用的函数需要特殊定义吗？',
          answer: '不需要，就是普通函数'
        },
        {
          question: '定时器会自动给函数传递参数吗？',
          answer: '不会，需要用lambda传递'
        }
      ]
    },

    medium: {
      story: '定时器函数可以修改游戏状态、创建角色、播放音效等，就像普通函数一样能做任何事！',
      concept: '定时器函数内部可以修改全局变量、操作游戏对象、触发其他事件等。要在函数内修改全局变量，需要用global声明。',
      syntax: "# 定时器函数可以做的事\n\ndef spawn_enemy():\n    global score  # 如需修改全局变量\n    enemy = Actor('enemy')\n    enemies.append(enemy)\n    score += 1\n\ndef play_sound():\n    sounds.beep.play()\n\ndef change_state():\n    global state\n    state = 'playing'",
      example: {
        title: '定时生成敌人',
        code: "enemies = []\n\ndef spawn_enemy():\n    enemy = Actor('enemy')\n    enemy.pos = (random.randint(50, 750), 0)\n    enemies.append(enemy)\n    print('新敌人出现！')\n\ndef on_mouse_down(pos):\n    # 连续设置3个定时器\n    clock.schedule(spawn_enemy, 1)\n    clock.schedule(spawn_enemy, 2)\n    clock.schedule(spawn_enemy, 3)",
        output: '点击后1秒、2秒、3秒各出现一个敌人',
        explanation: '多个定时器可以调用同一个函数，实现连续生成效果。'
      },
      practice: [
        {
          question: '定时器函数内能修改全局变量吗？',
          answer: '能，需要用global声明'
        },
        {
          question: '多个定时器可以调用同一个函数吗？',
          answer: '可以'
        }
      ]
    },

    hard: {
      story: '高级技巧！定时器函数可以设置下一个定时器，形成定时链，实现复杂的时序控制！',
      concept: '在定时器函数内部再设置定时器，可以实现链式调用。这种方式常用于倒计时、连续动画、波次敌人等场景。',
      syntax: "# 链式定时\ndef wave1():\n    spawn_enemies(3)\n    clock.schedule(wave2, 5)  # 5秒后第二波\n\ndef wave2():\n    spawn_enemies(5)\n    clock.schedule(wave3, 5)  # 5秒后第三波\n\ndef wave3():\n    spawn_boss()  # 最后出BOSS\n\n# 开始第一波\nclock.schedule(wave1, 3)",
      example: {
        title: '敌人波次',
        code: "def spawn_wave(n):\n    if n > 0:\n        enemy = Actor('enemy')\n        enemy.pos = (random.randint(50, 750), -50)\n        enemies.append(enemy)\n        # 0.5秒后生成下一个\n        clock.schedule(lambda: spawn_wave(n-1), 0.5)\n    else:\n        print('本波敌人全部出现！')\n\n# 生成一波5个敌人\nspawn_wave(5)",
        output: '每0.5秒出现一个敌人，共5个',
        explanation: '递归调用定时器，实现连续生成效果。'
      },
      practice: [
        {
          question: '什么是链式定时？',
          answer: '在定时函数内设置下一个定时器'
        },
        {
          question: '链式定时适合什么场景？',
          answer: '倒计时、连续动画、波次敌人等'
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
    mathConcept: '定时器基础',
    question: 'clock.schedule(run, 3) 表示什么？',
    options: [
      '执行run函数3次',
      '每隔3秒执行一次run',
      '3秒后执行一次run',
      'run函数执行3秒'
    ],
    answer: 2,
    explanation: 'clock.schedule(函数名, 秒数)表示在指定秒数后执行一次该函数，只执行一次。',
    hint: 'schedule是单次定时'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '语法规则',
    question: 'clock.schedule(ring, 5)中的ring为什么要写成ring而不是ring()？',
    options: [
      'ring不是函数',
      'ring()会立即执行函数',
      '语法规定必须这样写',
      'ring()会报错'
    ],
    answer: 1,
    explanation: '加括号ring()会立即执行函数，而不加括号ring只是传递函数的引用，让定时器在指定时间后调用。',
    hint: '括号表示"立即执行"'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '定时器行为',
    question: '设置clock.schedule(test, 2)后，程序会怎样运行？',
    options: [
      '程序停住2秒等待',
      '程序继续运行，2秒后执行test',
      'test函数在后台运行2秒',
      '每2秒执行一次test'
    ],
    answer: 1,
    explanation: '定时器是非阻塞的，设置后程序会继续运行其他代码，2秒后自动执行test函数。',
    hint: '定时器不会让程序停住'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '参数传递',
    question: '如何让定时器调用带参数的函数 spawn(x, y)？',
    options: [
      'clock.schedule(spawn(100, 200), 3)',
      'clock.schedule(spawn, 3, 100, 200)',
      'clock.schedule(lambda: spawn(100, 200), 3)',
      'clock.schedule(spawn, 3, x=100, y=200)'
    ],
    answer: 2,
    explanation: '使用lambda表达式可以捕获参数值，在定时执行时传递给函数。其他写法会导致语法错误或立即执行。',
    hint: 'lambda可以创建匿名函数'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '时序计算',
    question: '以下代码执行后，输出顺序是什么？\n\nclock.schedule(lambda: print("A"), 2)\nclock.schedule(lambda: print("B"), 1)\nprint("C")',
    options: [
      'A B C',
      'C A B',
      'C B A',
      'B C A'
    ],
    answer: 2,
    explanation: '立即执行print("C")先输出C，1秒后输出B，2秒后输出A。定时器设置顺序不影响执行顺序，时间短的先执行。',
    hint: '定时器按时间顺序执行，不是按设置顺序'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '链式定时',
    question: '下列代码会产生什么效果？\n\ndef countdown(n):\n    if n > 0:\n        print(n)\n        clock.schedule(lambda: countdown(n-1), 1)\n\ncountdown(3)',
    options: [
      '输出3',
      '输出3, 2, 1（每秒一个）',
      '输出3, 2, 1, 0（每秒一个）',
      '无限循环输出'
    ],
    answer: 1,
    explanation: 'countdown(3)先输出3，1秒后调用countdown(2)输出2，再1秒后countdown(1)输出1，然后countdown(0)不输出。所以是3, 2, 1。',
    hint: 'n>0时才输出并继续'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L14-1',
  title: '魔法闹钟',
  subtitle: '学会clock定时器的基本使用',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解clock定时器的概念',
    '掌握clock.schedule()的用法',
    '能定义被定时器调用的函数',
    '实现简单的延迟执行效果'
  ],
  prerequisites: [
    'L13 Pygame Zero基础',
    'Python函数定义',
    '全局变量的使用'
  ]
}

// 打字练习单词（按难度分组，纯英文）
export const typingWords = {
  easy: ['clock', 'time', 'ring', 'wait'],
  medium: ['schedule', 'sound', 'timer', 'alarm'],
  hard: ['function', 'execute', 'delay', 'trigger']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'clock.schedule(run, 3)',
    'def ring():',
    'clock.schedule(jump, 1)',
    'print("time up!")'
  ],
  medium: [
    'def spawn_enemy():\n    enemy = Actor("enemy")',
    'clock.schedule(start_game, 5)',
    'def on_mouse_down(pos):\n    clock.schedule(ring, 2)',
    'sounds.alarm.play()'
  ],
  hard: [
    'clock.schedule(lambda: spawn_at(x, y), 2)',
    'def countdown(n):\n    if n > 0:\n        print(n)\n        clock.schedule(lambda: countdown(n-1), 1)',
    'timer = clock.schedule(boss_appear, 10)\nclock.unschedule(timer)'
  ]
}

// 导出所有数据
export const L14_1_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L14_1_data
