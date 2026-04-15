/**
 * PY3 课程 L14-2: 自动发球机
 *
 * 核心知识点:
 * 1. clock.schedule_interval()间隔定时
 * 2. schedule与schedule_interval对比
 * 3. 定时器的停止与控制
 */

// 单词卡数据 - 复用L14-1 + 拓展词汇
export const vocabData = [
  // 复用L14-1单词
  {
    word: 'schedule',
    pronunciation: "['sked3u:l]",
    partOfSpeech: 'v./n.',
    meaning: '安排；预定；时间表',
    level: 'easy',
    example: 'Schedule the task.',
    exampleTranslation: '安排任务。',
    note: 'clock.schedule() 单次定时'
  },
  {
    word: 'interval',
    pronunciation: "['intarval]",
    partOfSpeech: 'n.',
    meaning: '间隔；间距；幕间休息',
    level: 'easy',
    example: 'Set an interval of 2 seconds.',
    exampleTranslation: '设置2秒的间隔。',
    note: 'schedule_interval() 间隔定时'
  },
  {
    word: 'repeat',
    pronunciation: "[ri'pi:t]",
    partOfSpeech: 'v./n.',
    meaning: '重复；复述；重复',
    level: 'medium',
    example: 'Repeat the action every second.',
    exampleTranslation: '每秒重复一次动作。',
    note: ''
  },
  // 拓展单词
  {
    word: 'period',
    pronunciation: "['piriad]",
    partOfSpeech: 'n.',
    meaning: '时期；周期；课时',
    level: 'medium',
    example: 'A period of 5 seconds.',
    exampleTranslation: '5秒的周期。',
    note: ''
  },
  {
    word: 'continuous',
    pronunciation: "[kan'tinjuas]",
    partOfSpeech: 'adj.',
    meaning: '连续的；持续的',
    level: 'hard',
    example: 'Continuous spawning of enemies.',
    exampleTranslation: '持续生成敌人。',
    note: ''
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: 'schedule_interval间隔定时',
    emoji: '🔄',
    gradeLevel: '3-4',
    summary: '让函数每隔一段时间重复执行',

    easy: {
      story: 'schedule只执行一次，但如果你想让闹钟每隔1分钟响一次呢？schedule_interval就是"重复响铃"的闹钟！',
      concept: 'clock.schedule_interval(函数名, 间隔秒数)让函数每隔指定时间执行一次，会一直重复执行，直到被取消。',
      syntax: "# 基本格式\nclock.schedule_interval(函数名, 间隔秒数)\n\n# 例如：每1秒执行一次update_score\nclock.schedule_interval(update_score, 1)\n\n# 会一直重复执行！",
      example: {
        title: '每秒打印一次',
        code: "def tick():\n    print('滴答~')\n\n# 每1秒打印一次\nclock.schedule_interval(tick, 1)",
        output: '每隔1秒屏幕显示"滴答~"',
        explanation: 'schedule_interval会持续执行，不像schedule只执行一次。'
      },
      practice: [
        {
          question: 'schedule_interval和schedule的区别是什么？',
          answer: 'schedule执行一次，schedule_interval重复执行'
        },
        {
          question: 'clock.schedule_interval(tick, 2)的间隔是多久？',
          answer: '2秒'
        }
      ]
    },

    medium: {
      story: '在游戏中，schedule_interval非常实用！可以让敌人每2秒出现一个，让分数每秒增加，让背景音乐循环播放等等！',
      concept: 'schedule_interval适合需要持续执行的任务。第一个参数是函数名，第二个参数是间隔秒数（可以是小数，如0.5表示半秒）。',
      syntax: "# 常见应用\n\n# 每2秒生成一个敌人\nclock.schedule_interval(spawn_enemy, 2)\n\n# 每0.5秒更新一次动画\nclock.schedule_interval(animate, 0.5)\n\n# 每秒增加分数\nclock.schedule_interval(add_score, 1)",
      example: {
        title: '自动生成敌人',
        code: "enemies = []\n\ndef spawn_enemy():\n    enemy = Actor('enemy')\n    enemy.pos = (random.randint(50, 750), 0)\n    enemies.append(enemy)\n\n# 每2秒自动生成一个敌人\nclock.schedule_interval(spawn_enemy, 2)",
        output: '游戏运行后每2秒出现一个新敌人',
        explanation: '设置一次，敌人就会持续生成，不需要反复调用。'
      },
      practice: [
        {
          question: '如何让函数每0.5秒执行一次？',
          answer: 'clock.schedule_interval(函数名, 0.5)'
        },
        {
          question: 'schedule_interval设置后需要重复调用吗？',
          answer: '不需要，它会自动重复执行'
        }
      ]
    },

    hard: {
      story: '高级技巧！间隔定时器可以配合取消功能，实现"生成10个敌人后停止"这样的控制效果！',
      concept: 'schedule_interval返回一个定时器ID，用clock.unschedule()可以取消它。结合计数器可以实现有限次数的重复执行。',
      syntax: "# 保存定时器ID\nspawn_timer = clock.schedule_interval(spawn, 1)\n\n# 取消定时器\nclock.unschedule(spawn_timer)\n\n# 带计数器的有限次数执行\ncount = 0\ndef spawn_limited():\n    global count\n    count += 1\n    if count >= 10:\n        clock.unschedule(spawn_timer)\n    spawn_enemy()",
      example: {
        title: '只生成10个敌人',
        code: "count = 0\nspawn_timer = None\n\ndef spawn_limited():\n    global count, spawn_timer\n    enemy = Actor('enemy')\n    enemy.pos = (random.randint(50, 750), -50)\n    enemies.append(enemy)\n    count += 1\n    if count >= 10:\n        clock.unschedule(spawn_timer)\n        print('已生成10个敌人，停止！')\n\n# 开始生成\nspawn_timer = clock.schedule_interval(spawn_limited, 1)",
        output: '每秒生成一个敌人，10个后自动停止',
        explanation: '用计数器追踪生成数量，达到目标后取消定时器。'
      },
      practice: [
        {
          question: '如何取消interval定时器？',
          answer: '保存返回的ID，用clock.unschedule(ID)取消'
        },
        {
          question: '定时器ID什么时候获取？',
          answer: '设置定时器时立即获取返回值'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: 'schedule与schedule_interval对比',
    emoji: '⚖️',
    gradeLevel: '3-4',
    summary: '理解两种定时器的区别和适用场景',

    easy: {
      story: 'schedule像一次性闹钟，响了就停；schedule_interval像循环闹钟，每隔一段时间就响一次！',
      concept: 'schedule是单次定时，执行一次就结束；schedule_interval是间隔定时，会持续重复执行。根据需要选择使用哪个。',
      syntax: "# schedule - 执行一次\nclock.schedule(func, 3)  # 3秒后执行一次\n\n# schedule_interval - 重复执行\nclock.schedule_interval(func, 3)  # 每3秒执行一次\n\n# 口诀：\n# schedule = 单次\n# interval = 重复",
      example: {
        title: '对比两种定时器',
        code: "# 单次定时 - 3秒后游戏开始\nclock.schedule(start_game, 3)\n\n# 间隔定时 - 每秒增加分数\nclock.schedule_interval(add_score, 1)",
        output: '单次定时执行一次，间隔定时持续执行',
        explanation: '游戏开始只需要一次，分数增加需要持续进行。'
      },
      practice: [
        {
          question: '想让敌人持续出现应该用哪个？',
          answer: 'schedule_interval'
        },
        {
          question: '想让游戏3秒后开始应该用哪个？',
          answer: 'schedule'
        }
      ]
    },

    medium: {
      story: '选择正确的定时器很重要！用错了可能导致游戏无法正常运行，比如敌人只出现一次就再也不出现了！',
      concept: '单次操作用schedule，重复操作用schedule_interval。常见单次操作：游戏开始、切换场景、播放一次音效；重复操作：生成敌人、更新分数、移动障碍物。',
      syntax: "# 单次操作场景\nschedule: 游戏开始、结束、切换场景\nschedule: 播放一次音效、显示提示\n\n# 重复操作场景\nschedule_interval: 持续生成敌人\nschedule_interval: 持续更新分数\nschedule_interval: 持续移动障碍物",
      example: {
        title: '正确选择定时器',
        code: "# 游戏开始倒计时 - 单次\ndef countdown_3():\n    print('3...')\n    clock.schedule(countdown_2, 1)\n\ndef start():\n    print('游戏开始！')\n    # 开始后每秒生成敌人 - 间隔\n    clock.schedule_interval(spawn_enemy, 2)\n\nclock.schedule(countdown_3, 1)",
        output: '倒计时3-2-1后开始游戏，之后每2秒生成敌人',
        explanation: '倒计时用链式schedule，生成敌人用schedule_interval。'
      },
      practice: [
        {
          question: '每2秒更新一次分数用什么？',
          answer: 'schedule_interval'
        },
        {
          question: '5秒后播放游戏结束音效用什么？',
          answer: 'schedule'
        }
      ]
    },

    hard: {
      story: '高级应用！两个定时器可以配合使用，实现"先等待3秒，然后开始每秒生成敌人"这样的复杂逻辑！',
      concept: 'schedule可以触发schedule_interval，实现"延迟开始重复任务"的效果。这种组合在游戏开发中非常常见。',
      syntax: "# 延迟开始重复任务\ndef start_spawning():\n    # 开始持续生成\n    clock.schedule_interval(spawn_enemy, 1)\n\n# 3秒后开始生成\nclock.schedule(start_spawning, 3)\n\n# 这样就实现了：等3秒，然后每1秒生成",
      example: {
        title: '延迟后持续生成',
        code: "def start_enemy_waves():\n    print('敌人开始来袭！')\n    clock.schedule_interval(spawn_enemy, 2)\n\ndef on_mouse_down(pos):\n    print('准备开始，3秒后敌人来袭...')\n    clock.schedule(start_enemy_waves, 3)",
        output: '点击3秒后开始每2秒生成敌人',
        explanation: 'schedule触发第一个，schedule_interval负责持续执行。'
      },
      practice: [
        {
          question: '如何实现"3秒后每1秒打印一次"？',
          answer: 'schedule触发一个函数，函数内设置schedule_interval'
        },
        {
          question: '两种定时器可以同时使用吗？',
          answer: '可以，它们互不影响'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '定时器的停止与控制',
    emoji: '🛑',
    gradeLevel: '3-4',
    summary: '学会取消和暂停定时器',

    easy: {
      story: '定时器开始后，有时候需要停止它。比如游戏结束时，就不应该再生成敌人了！',
      concept: 'clock.unschedule(定时器ID)可以取消一个定时器。取消后该定时器不会再执行，需要保存定时器的返回值作为ID。',
      syntax: "# 保存定时器ID\nmy_timer = clock.schedule_interval(func, 1)\n\n# 取消定时器\nclock.unschedule(my_timer)\n\n# 取消后定时器停止执行",
      example: {
        title: '游戏结束时停止生成',
        code: "spawn_timer = None\n\ndef start_game():\n    global spawn_timer\n    spawn_timer = clock.schedule_interval(spawn_enemy, 2)\n\ndef game_over():\n    global spawn_timer\n    if spawn_timer:\n        clock.unschedule(spawn_timer)\n        spawn_timer = None\n        print('敌人生成已停止')",
        output: '游戏结束时停止生成敌人',
        explanation: '保存定时器ID，游戏结束时用unschedule取消。'
      },
      practice: [
        {
          question: '取消定时器用什么函数？',
          answer: 'clock.unschedule(定时器ID)'
        },
        {
          question: '为什么需要保存定时器返回值？',
          answer: '取消时需要用ID来指定取消哪个定时器'
        }
      ]
    },

    medium: {
      story: '更复杂的控制！可以用变量控制定时器是否生效，实现"暂停-继续"的功能！',
      concept: '结合全局变量可以实现定时器的暂停和继续。设置一个标志变量，在定时函数内检查这个变量决定是否执行。',
      syntax: "# 用变量控制定时器\npaused = False\n\ndef controlled_task():\n    if not paused:\n        # 只有未暂停时才执行\n        do_something()\n\ndef toggle_pause():\n    global paused\n    paused = not paused",
      example: {
        title: '暂停和继续',
        code: "paused = False\n\ndef spawn_if_not_paused():\n    if not paused:\n        enemy = Actor('enemy')\n        enemy.pos = (random.randint(50, 750), -50)\n        enemies.append(enemy)\n\ndef on_key_down(key):\n    global paused\n    if key == keys.P:\n        paused = not paused\n        print('暂停' if paused else '继续')\n\n# 持续生成，但可以被暂停\nclock.schedule_interval(spawn_if_not_paused, 2)",
        output: '按P键切换暂停/继续状态',
        explanation: '定时器仍在运行，但通过变量控制是否实际执行。'
      },
      practice: [
        {
          question: '如何实现暂停功能？',
          answer: '用变量控制定时函数是否执行'
        },
        {
          question: 'unschedule和变量控制有什么区别？',
          answer: 'unschedule完全取消，变量控制是暂时跳过'
        }
      ]
    },

    hard: {
      story: '高级控制！多个定时器可以分别管理，实现复杂的游戏节奏控制！',
      concept: '游戏可以有多个定时器同时运行：敌人生成器、分数更新器、难度提升器等。每个定时器可以独立控制。',
      syntax: "# 多定时器管理\nspawn_timer = None\nscore_timer = None\ndifficulty_timer = None\n\ndef start_all_timers():\n    global spawn_timer, score_timer, difficulty_timer\n    spawn_timer = clock.schedule_interval(spawn_enemy, 2)\n    score_timer = clock.schedule_interval(add_score, 1)\n    difficulty_timer = clock.schedule_interval(increase_difficulty, 30)\n\ndef stop_all_timers():\n    clock.unschedule(spawn_timer)\n    clock.unschedule(score_timer)\n    clock.unschedule(difficulty_timer)",
      example: {
        title: '多定时器管理',
        code: "timers = {}  # 用字典存储多个定时器\n\ndef start_game():\n    timers['spawn'] = clock.schedule_interval(spawn_enemy, 2)\n    timers['score'] = clock.schedule_interval(add_score, 1)\n    timers['difficulty'] = clock.schedule_interval(harder, 30)\n\ndef game_over():\n    # 停止所有定时器\n    for timer in timers.values():\n        clock.unschedule(timer)\n    timers.clear()",
        output: '游戏运行多个定时器，结束时全部停止',
        explanation: '用字典管理多个定时器，方便批量操作。'
      },
      practice: [
        {
          question: '如何管理多个定时器？',
          answer: '用字典或多个变量存储各个定时器ID'
        },
        {
          question: '游戏结束时应该做什么？',
          answer: '停止所有运行中的定时器'
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
    mathConcept: '定时器区别',
    question: 'schedule_interval和schedule的主要区别是什么？',
    options: [
      '没有区别',
      'schedule执行一次，schedule_interval重复执行',
      'schedule更快',
      'schedule_interval只能执行一次'
    ],
    answer: 1,
    explanation: 'schedule是单次定时器，执行一次就结束；schedule_interval是间隔定时器，会按设定的间隔持续重复执行。',
    hint: 'interval意思是"间隔"'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '语法使用',
    question: 'clock.schedule_interval(tick, 0.5) 表示什么？',
    options: [
      '0.5秒后执行一次tick',
      '每隔0.5秒执行一次tick',
      '执行tick 0.5次',
      'tick执行0.5秒'
    ],
    answer: 1,
    explanation: 'schedule_interval的第二个参数是间隔秒数，0.5表示半秒，所以是每隔0.5秒执行一次tick函数。',
    hint: 'schedule_interval是重复执行'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '场景选择',
    question: '以下哪个场景应该用schedule而不是schedule_interval？',
    options: [
      '每2秒生成一个敌人',
      '每秒更新一次分数',
      '3秒后播放游戏开始音效',
      '每0.5秒移动一次障碍物'
    ],
    answer: 2,
    explanation: '播放游戏开始音效只需要执行一次，应该用schedule。其他选项都需要重复执行，用schedule_interval。',
    hint: '只需执行一次的用schedule'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '定时器取消',
    question: '如何取消一个间隔定时器？',
    options: [
      'clock.stop(timer)',
      'clock.unschedule(timer)',
      'clock.cancel(timer)',
      'timer.stop()'
    ],
    answer: 1,
    explanation: '使用clock.unschedule(定时器ID)来取消定时器。需要先保存schedule_interval的返回值作为ID。',
    hint: 'unschedule是"取消计划"的意思'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '组合使用',
    question: '如何实现"3秒后开始每1秒生成一个敌人"？',
    options: [
      'clock.schedule_interval(spawn, 3)',
      'clock.schedule(spawn, 3)\nclock.schedule_interval(spawn, 1)',
      '先schedule触发，函数内设置schedule_interval',
      'clock.schedule_interval(spawn, 1, delay=3)'
    ],
    answer: 2,
    explanation: '先用schedule设置3秒后执行的函数，在该函数内部再设置schedule_interval来持续生成敌人。这样实现了延迟开始重复任务。',
    hint: '两个定时器可以配合使用'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '时序分析',
    question: '执行以下代码后，第5秒时共生成多少个敌人？\n\ntimer = clock.schedule_interval(spawn, 2)\nclock.schedule(lambda: clock.unschedule(timer), 6)',
    options: [
      '2个',
      '3个',
      '4个',
      '5个'
    ],
    answer: 1,
    explanation: '定时器从0秒开始，每2秒执行一次：第0秒、第2秒、第4秒各生成一个。第6秒时定时器被取消，但第5秒时还没有取消。所以第5秒时有3个敌人（0秒、2秒、4秒生成的）。',
    hint: '计算0到5秒之间执行了几次'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L14-2',
  title: '自动发球机',
  subtitle: '学会schedule_interval间隔定时器',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握schedule_interval的用法',
    '理解schedule和schedule_interval的区别',
    '学会取消和控制定时器',
    '能用定时器实现持续生成效果'
  ],
  prerequisites: [
    'L14-1 clock定时器基础',
    'Python函数和全局变量',
    'Lambda表达式基础'
  ]
}

// 打字练习单词（按难度分组，纯英文）
export const typingWords = {
  easy: ['interval', 'repeat', 'loop', 'stop'],
  medium: ['schedule', 'timer', 'paused', 'spawn', 'period'],
  hard: ['unschedule', 'continuous', 'control', 'trigger']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'clock.schedule_interval(tick, 1)',
    'clock.unschedule(timer)',
    'my_timer = clock.schedule_interval(func, 2)',
    'if not paused:'
  ],
  medium: [
    'spawn_timer = clock.schedule_interval(spawn_enemy, 2)',
    'def game_over():\n    clock.unschedule(spawn_timer)',
    'def start_spawning():\n    clock.schedule_interval(spawn, 1)',
    'paused = not paused'
  ],
  hard: [
    'def start_game():\n    timers["spawn"] = clock.schedule_interval(spawn, 2)\n    timers["score"] = clock.schedule_interval(add_score, 1)',
    'clock.schedule(start_spawning, 3)\n# 3秒后开始持续执行',
    'for timer in timers.values():\n    clock.unschedule(timer)'
  ]
}

// 导出所有数据
export const L14_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L14_2_data
