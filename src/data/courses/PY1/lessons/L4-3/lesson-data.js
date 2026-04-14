/**
 * PY1 课程 L4-3: break语句与while循环条件
 *
 * 核心知识点:
 * 1. break语句 - 结束循环
 * 2. while循环条件 - 条件成立执行，不成立结束
 * 3. 条件控制循环 - 灵活控制循环执行
 */

// 单词卡数据
export const vocabData = [
  {
    word: 'break',
    pronunciation: '[breɪk]',
    partOfSpeech: 'v./n.',
    meaning: '中断；弄坏；打破（记录）；暂停；休息；骨折',
    level: 'easy',
    example: 'Press break to stop.',
    exampleTranslation: '按break键停止。',
    note: 'coffee break 休息时间'
  },
  {
    word: 'tomato',
    pronunciation: "[təˈmɑːtəʊ]",
    partOfSpeech: 'n.',
    meaning: '番茄，西红柿',
    level: 'easy',
    example: 'I like tomatoes.',
    exampleTranslation: '我喜欢西红柿。',
    note: '复数形式是tomatoes'
  },
  {
    word: 'state',
    pronunciation: '[steɪt]',
    partOfSpeech: 'n./v./adj.',
    meaning: '状态；国家；州；陈述；公布；国家的',
    level: 'medium',
    example: 'What state is it in?',
    exampleTranslation: '它处于什么状态？',
    note: 'United States 美国'
  },
  {
    word: 'exit',
    pronunciation: "['eksit]",
    partOfSpeech: 'v./n.',
    meaning: '退出；出口；离开',
    level: 'medium',
    example: 'Press exit to quit.',
    exampleTranslation: '按exit键退出。',
    note: 'exit sign 出口标志'
  },
  {
    word: 'condition',
    pronunciation: "[kən'dɪʃn]",
    partOfSpeech: 'n.',
    meaning: '条件；状况；状态',
    level: 'medium',
    example: 'Check the condition.',
    exampleTranslation: '检查条件。',
    note: 'conditional 条件的'
  },
  {
    word: 'control',
    pronunciation: "[kən'trəʊl]",
    partOfSpeech: 'v./n.',
    meaning: '控制；支配；管理；控制',
    level: 'hard',
    example: 'Control the loop.',
    exampleTranslation: '控制循环。',
    note: 'remote control 遥控器'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '循环停止器 - break语句',
    emoji: '🛑',
    gradeLevel: '1-2',
    summary: '在循环中使用break语句立即结束循环',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你在跑步机上跑步，你想停下来时只要按一下停止按钮！break语句就是这个停止按钮，你在循环中写上break，循环就会立刻停止！',
      concept: 'break语句用于在循环中提前结束循环。当程序执行到break时，会立即跳出循环，不再执行循环中break后面的代码，也不再进行下一次循环。',
      syntax: 'while True:\n    if 某个条件:\n        break  # 退出循环',
      example: {
        title: '用break退出循环',
        code: 'count = 0\nwhile True:\n    print("计数:", count)\n    count = count + 1\n    if count >= 3:\n        break\nprint("结束!")',
        output: '计数: 0\n计数: 1\n计数: 2\n结束!',
        explanation: '当count达到3时，break语句执行，循环立刻退出，打印"结束!"。'
      },
      practice: [
        {
          question: 'break语句的作用是什么？',
          answer: '立即结束循环'
        },
        {
          question: 'break执行后还会继续循环吗？',
          answer: '不会，break会立即跳出循环'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'break进阶！你可以让用户决定何时停止：输入"停止"就退出，按q键就退出，或者达到某个目标就退出！break给了你灵活控制循环的能力！',
      concept: 'break语句是控制程序流程的重要工具。常见应用：①用户触发退出（输入特定字符）②达到目标状态（找到答案）③错误处理（遇到异常）④超时控制（运行太久）。break只能用在循环中。',
      syntax: '# 用户输入退出\nwhile True:\n    answer = input("输入(输入q退出):")\n    if answer == "q":\n        break\n\n# 达到目标退出\nwhile True:\n    result = 计算()\n    if result == 目标:\n        break',
      example: {
        title: '猜数字游戏',
        code: 'while True:\n    print("欢迎来到猜数字游戏!")\n    answer = input("输入\'停止\'退出:")\n    if answer == "停止":\n        break\n    print("继续游戏...")\nprint("游戏结束!")',
        output: '欢迎来到猜数字游戏!\n输入\'停止\'退出:玩\n继续游戏...\n欢迎来到猜数字游戏!\n输入\'停止\'退出:停止\n游戏结束!',
        explanation: '用户输入"停止"时，break执行，循环退出。输入其他内容时，游戏继续。'
      },
      practice: [
        {
          question: 'break可以用在什么地方？',
          answer: '只能用在循环（while或for）中'
        },
        {
          question: 'break和循环条件变成False有什么区别？',
          answer: 'break立即退出，条件变False是正常循环结束'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'break大师模式！你可以在嵌套循环中使用break（只退出内层循环），或者在循环后执行else代码块（循环正常结束才执行）！',
      concept: 'break的高级用法：①嵌套循环中的break（只退出当前层循环）②while-else结构（正常结束执行else，break退出不执行）③配合标志变量（控制多层循环）。break是控制复杂循环逻辑的关键。',
      syntax: '# 嵌套循环\nfor i in range(3):\n    for j in range(3):\n        if 条件:\n            break  # 只退出内层\n    # 继续外层循环\n\n# while-else\nwhile 条件:\n    if 找到:\n        break\nelse:\n    # 没break才执行',
      example: {
        title: '查找数据',
        code: 'data = ["苹果", "香蕉", "橙子", "西瓜"]\ntarget = "橙子"\n\nfor i in range(len(data)):\n    if data[i] == target:\n        print("找到了!索引:" + str(i))\n        break\nelse:\n    print("没找到!")\n\nprint("搜索结束")',
        output: '找到了!索引:2\n搜索结束',
        structure: 'data = ["苹果", "香蕉", "橙子", "西瓜"]\ntarget = "橙子"\n\nfor i in range(len(data)):\n    if data[i] == target:\n        print("找到了!索引:" + str(i))\n        break\nelse:\n    print("没找到!")\n\nprint("搜索结束")',
        explanation: '在列表中查找"橙子"，用range(len())遍历获取索引。找到后打印索引并break退出。因为break了，所以else块不执行。'
      },
      practice: [
        {
          question: '嵌套循环中的break退出哪层循环？',
          answer: '只退出包含它的那一层（内层）循环'
        },
        {
          question: 'while-else中else什么时候执行？',
          answer: '循环正常结束（没有break）时才执行else'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '循环判断器 - while循环条件',
    emoji: '🔄',
    gradeLevel: '1-2',
    summary: 'while后面的条件决定循环是否继续',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象老师对你说："只要没下课，就继续写作业！"这句话是一个条件：没下课=继续写，下课了=停止。while循环就是这样：条件为True就继续，为False就停止！',
      concept: 'while循环每次循环开始时，都会先判断条件是否为True。如果条件为True，执行循环体；如果条件为False，结束循环。条件可以是布尔变量、比较表达式等。',
      syntax: 'while 条件:\n    循环体代码',
      example: {
        title: '条件控制循环',
        code: 'count = 0\nwhile count < 3:\n    print("count:", count)\n    count = count + 1\nprint("循环结束!")',
        output: 'count: 0\ncount: 1\ncount: 2\n循环结束!',
        explanation: 'count从0开始，count<3为True时执行循环。当count变为3时，count<3为False，循环结束。'
      },
      practice: [
        {
          question: 'while循环什么时候结束？',
          answer: '条件为False时结束'
        },
        {
          question: 'while循环每次开始时做什么？',
          answer: '先判断条件是否为True'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '条件进阶！你可以用各种复杂的条件来控制循环：多个条件用and/or组合、检查变量的状态、判断用户输入等等！',
      concept: 'while循环的条件可以是任何布尔表达式：①比较运算（>、<、==）②逻辑运算（and、or、not）③布尔变量④函数返回值。关键是要确保条件最终会变为False，否则会无限循环。',
      syntax: '# 复合条件\nwhile count < 10 and 没有错误:\n    执行代码\n\n# 布尔变量\nrunning = True\nwhile running:\n    if 想退出:\n        running = False\n\n# 或条件\nwhile 有数据 or 还有任务:\n    处理',
      example: {
        title: '多条件控制',
        code: 'count = 0\nerrors = 0\n\nwhile count < 5 and errors < 2:\n    print("count=" + str(count) + ", errors=" + str(errors))\n    count = count + 1\n    if count == 3:\n        errors = errors + 1\n\nprint("循环结束!")',
        output: 'count=0, errors=0\ncount=1, errors=0\ncount=2, errors=0\ncount=3, errors=1\ncount=4, errors=1\n循环结束!',
        explanation: '循环条件是count<5且errors<2。count到4或errors到2时，任一条件不满足就结束。'
      },
      practice: [
        {
          question: 'while条件为True时循环怎样？',
          answer: '继续执行循环体'
        },
        {
          question: 'and和or在条件中有什么作用？',
          answer: 'and需要都为True，or有一个为True即可'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '条件大师模式！你可以用条件实现各种算法：二分查找（找到目标）、欧几里得算法（求最大公约数）、牛顿迭代法（求平方根）等等！',
      concept: 'while循环条件的本质是"不变式"（Invariant）：每次循环前后都保持为真的性质。算法设计的关键是找到正确的不变式和终止条件。典型模式：①收敛型（逐渐接近目标）②消耗型（逐渐用完数据）③状态型（状态变化触发结束）。',
      syntax: '# 二分查找\nwhile left <= right:\n    mid = (left + right) // 2\n    if list[mid] == target:\n        print("找到了，索引:", mid)\n        break\n    elif list[mid] < target:\n        left = mid + 1\n    else:\n        right = mid - 1\n\n# 欧几里得算法\nwhile b != 0:\n    a, b = b, a % b',
      example: {
        title: '求最大公约数',
        code: '# 欧几里得算法求GCD\na = 48\nb = 18\n\nwhile b != 0:\n    a, b = b, a % b\n    print("a=" + str(a) + ", b=" + str(b))\n\nprint("最大公约数: " + str(a))',
        output: 'a=18, b=12\na=12, b=6\na=6, b=0\n最大公约数: 6',
        explanation: '每次循环用b和a%b替换a和b。当b变为0时，a就是最大公约数。这是经典的算法。'
      },
      practice: [
        {
          question: '什么是算法中的"不变式"？',
          answer: '每次循环前后都保持为真的性质，用于证明算法正确性'
        },
        {
          question: 'while b != 0: 什么情况下结束？',
          answer: 'b等于0时结束'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '灵活控制 - 条件与break配合',
    emoji: '🎮',
    gradeLevel: '1-2',
    summary: '结合while条件和break实现灵活的循环控制',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个智能门：它可以用密码打开（条件满足），也可以用钥匙打开（触发break）！这就是while条件加break的配合使用，让程序更灵活！',
      concept: 'while条件用于正常循环控制，break用于特殊退出。配合使用可以实现：正常情况按条件循环，特殊情况提前退出。这是最常用的循环控制模式。',
      syntax: '# 条件+break模式\nwhile 正常条件:\n    if 特殊情况:\n        break\n    正常处理',
      example: {
        title: '计数器',
        code: 'count = 0\nmax_count = 10\n\nwhile count < max_count:\n    print("count:", count)\n    count = count + 1\n    \n    if count == 5:\n        print("提前停止!")\n        break\n\nprint("结束!")',
        output: 'count: 0\ncount: 1\ncount: 2\ncount: 3\ncount: 4\n提前停止!\n结束!',
        explanation: '正常条件是count<10，循环10次。但当count==5时，break执行，提前退出。'
      },
      practice: [
        {
          question: 'while条件和break配合有什么好处？',
          answer: '可以正常循环，也可以特殊情况提前退出'
        },
        {
          question: '哪个先执行：条件判断还是break检查？',
          answer: '先判断条件，条件满足才进入循环体检查break'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '配合进阶！你可以实现各种用户交互：循环处理直到用户满意、提供退出选项、处理错误输入等等！让程序既灵活又友好！',
      concept: '条件+break是交互式程序的标准模式：①while True提供无限循环②用户输入命令③break命令退出④其他命令继续处理。这种模式在菜单、游戏、工具程序中广泛使用。',
      syntax: '# 菜单循环\nwhile True:\n    显示菜单\n    choice = input("选择:")\n    if choice == "退出":\n        break\n    执行选择\n\n# 重试循环\nattempts = 0\nwhile attempts < 3:\n    答案 = input("问题:")\n    if 答案正确:\n        break\n    attempts = attempts + 1',
      example: {
        title: '简单计算器',
        code: 'while True:\n    print("\\n1.加法 2.减法 3.退出")\n    choice = input("选择:")\n    \n    if choice == "3":\n        print("再见!")\n        break\n    elif choice == "1":\n        print("执行加法...")\n    elif choice == "2":\n        print("执行减法...")\n    else:\n        print("无效选择!")',
        output: '1.加法 2.减法 3.退出\n选择:1\n执行加法...\n\n1.加法 2.减法 3.退出\n选择:3\n再见!',
        explanation: '程序持续显示菜单，用户选择3时break退出。选择1或2执行对应操作。'
      },
      practice: [
        {
          question: '菜单程序为什么用while True？',
          answer: '因为需要持续显示菜单，直到用户选择退出'
        },
        {
          question: '如何限制用户尝试次数？',
          answer: '用计数器，while attempts < 最大次数，超过就break或循环自然结束'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '配合大师模式！你可以实现复杂的程序逻辑：游戏主循环（条件是游戏运行中，break是游戏结束）、事件处理（条件是有事件）、状态机（根据状态转换）等等！',
      concept: '条件+break是状态机和事件驱动系统的基础。高级应用：①游戏循环（running标志+quit事件）②状态机（当前状态+事件触发转换）③超时控制（时间条件+完成标志）④资源管理（有资源+错误处理）。',
      syntax: '# 游戏主循环\nrunning = True\nwhile running:\n    处理事件()\n    更新游戏()\n    绘制画面()\n    if 游戏结束:\n        running = False\n\n# 状态机\ncurrent_state = "菜单"\nwhile current_state != "退出":\n    if current_state == "菜单":\n        current_state = 处理菜单()\n    elif current_state == "游戏":\n        current_state = 处理游戏()\n    elif current_state == "结束":\n        current_state = 处理结束()',
      example: {
        title: '猜数字游戏',
        code: 'import random\n\ntarget = random.randint(1, 100)\nattempts = 0\nmax_attempts = 10\n\nprint("猜1-100的数字!")\n\nwhile attempts < max_attempts:\n    guess = int(input("猜:"))\n    attempts = attempts + 1\n    \n    if guess == target:\n        print("猜对了!用了" + str(attempts) + "次")\n        break\n    elif guess < target:\n        print("太小了!")\n    else:\n        print("太大了!")\nelse:\n    print("次数用完!答案是" + str(target))',
        output: '猜1-100的数字!\n猜:50\n太大了!\n猜:25\n太小了!\n猜:37\n猜对了!用了3次',
        explanation: '循环条件是次数<10，猜对时break退出。次数用完还没猜对，循环正常结束，显示答案。'
      },
      practice: [
        {
          question: '游戏主循环的典型结构是什么？',
          answer: '处理输入→更新状态→绘制画面→检查退出条件'
        },
        {
          question: 'while-else和break有什么关系？',
          answer: 'break退出不执行else，正常结束才执行else'
        }
      ]
    }
  }
]

// 习题数据
export const exercises = [
  // 🟢 基础题（1-2年级）
  {
    id: 'ex-1',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: 'break语句',
    question: 'break语句的作用是什么？\n\nA. 暂停程序\nB. 结束循环\nC. 跳过本次循环\nD. 重新开始循环',
    options: [
      'A. 暂停程序',
      'B. 结束循环',
      'C. 跳过本次循环',
      'D. 重新开始循环'
    ],
    answer: 1,
    explanation: 'break语句的作用是立即结束循环，跳出循环体。',
    hint: 'break是打破、中断的意思'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: 'while循环条件',
    question: 'while循环什么时候结束？\n\nA. 条件为True时\nB. 条件为False时\nC. 永远不结束\nD. 执行5次后',
    options: [
      'A. 条件为True时',
      'B. 条件为False时',
      'C. 永远不结束',
      'D. 执行5次后'
    ],
    answer: 1,
    explanation: 'while循环在条件为False时结束，条件为True时继续执行。',
    hint: 'False表示假，不成立'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '循环执行次数',
    question: '执行下面的代码，循环会执行几次？\n\n```python\ncount = 0\nwhile count < 5:\n    print(count)\n    if count == 3:\n        break\n    count = count + 1\n```\n\nA. 3次\nB. 4次\nC. 5次\nD. 无限次',
    options: [
      'A. 3次',
      'B. 4次',
      'C. 5次',
      'D. 无限次'
    ],
    answer: 1,
    explanation: 'count=0,1,2,3时执行。count=3时break退出，所以是4次（0、1、2、3）。\n\n数学知识：数数0,1,2,3共4个数。',
    hint: 'count从0开始，到3结束'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '逻辑运算',
    question: 'while count < 10 and errors < 3: 什么时候循环继续？\n\nA. count<10或errors<3\nB. count<10且errors<3\nC. count>=10或errors>=3\nD. count>=10且errors>=3',
    options: [
      'A. count<10或errors<3',
      'B. count<10且errors<3',
      'C. count>=10或errors>=3',
      'D. count>=10且errors>=3'
    ],
    answer: 1,
    explanation: 'and运算要求两个条件都为True。所以count<10且errors<3时循环继续。\n\n数学知识：逻辑与运算A∧B表示A和B同时成立。',
    hint: 'and表示"并且"'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '算法逻辑',
    question: '执行下面的代码，最后a的值是多少？\n\n```python\na = 48\nb = 18\nwhile b != 0:\n    a, b = b, a % b\n```\n\nA. 0\nB. 6\nC. 12\nD. 18',
    options: [
      'A. 0',
      'B. 6',
      'C. 12',
      'D. 18'
    ],
    answer: 1,
    explanation: '这是欧几里得算法求最大公约数。48和18的最大公约数是6。\n\n数学知识：GCD(48,18)=6，48÷6=8，18÷6=3，8和3互质。',
    hint: '这是求最大公约数的算法'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '循环嵌套',
    question: '下面关于嵌套循环中的break，哪个说法正确？\n\nA. break退出所有循环\nB. break只退出内层循环\nC. break不能用在嵌套循环中\nD. break跳过本次循环',
    options: [
      'A. break退出所有循环',
      'B. break只退出内层循环',
      'C. break不能用在嵌套循环中',
      'D. break跳过本次循环'
    ],
    answer: 1,
    explanation: 'break只退出包含它的那一层循环。嵌套循环中的内层break只退出内层，外层继续执行。',
    hint: 'break只影响直接包含它的循环'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L4-3',
  title: 'break语句与while循环条件',
  subtitle: '学会用break和条件灵活控制循环',
  difficulty: '入门',
  estimatedTime: '30-40分钟',
  learningGoals: [
    '掌握break语句结束循环',
    '理解while循环条件的判断机制',
    '学会条件与break配合控制循环',
    '能实现交互式菜单和用户控制'
  ],
  prerequisites: [
    'Python 基础语法',
    'while循环基础',
    'if条件判断',
    '布尔值和比较运算'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['break', 'loop', 'while', 'state'],
  medium: ['condition', 'control', 'tomato', 'exit'],
  hard: ['invariant', 'algorithm', 'terminate', 'execution']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'while True:',
    'if count >= 3:',
    'break',
    'count = count + 1',
    'while count < 10:',
    'if answer == "quit":'
  ],
  medium: [
    'while True:\n    answer = input("输入q退出:")\n    if answer == "q":\n        break',
    'while count < 5 and errors < 2:\n    count = count + 1',
    'while attempts < 3:\n    答案 = input("问题:")\n    if 答案正确:\n        break',
    'while count < max_count:\n    if count == 5:\n        break\n    count = count + 1',
    'while running:\n    if 想退出:\n        running = False',
    'while b != 0:\n    a, b = b, a % b'
  ],
  hard: [
    'while True:\n    显示菜单()\n    choice = input("选择:")\n    if choice == "退出":\n        break\n    执行选择()',
    'while attempts < max_attempts:\n    guess = int(input("猜:"))\n    if guess == target:\n        break\n    attempts = attempts + 1',
    'while left <= right:\n    mid = (left + right) // 2\n    if list[mid] == target:\n        break\n    elif list[mid] < target:\n        left = mid + 1\n    else:\n        right = mid - 1',
    'while running:\n    处理事件()\n    更新游戏()\n    if 游戏结束:\n        running = False',
    'for i in range(len(data)):\n    if data[i] == target:\n        print("找到!索引:" + str(i))\n        break\nelse:\n    print("没找到!")',
    'current_state = "菜单"\nwhile current_state != "退出":\n    if current_state == "菜单":\n        current_state = 处理菜单()'
  ]
}

// 导出所有数据
export const L4_3_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L4_3_data
