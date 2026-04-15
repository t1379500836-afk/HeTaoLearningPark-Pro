/**
 * PY1 课程 L4-1: 布尔值和while循环
 *
 * 核心知识点:
 * 1. 布尔值 - True和False
 * 2. while循环 - 重复执行代码
 * 3. while True - 无限循环
 */

// 单词卡数据
export const vocabData = [
  {
    word: 'true',
    pronunciation: '[truː]',
    partOfSpeech: 'adj.',
    meaning: '真实的；正确的',
    level: 'easy',
    example: 'The answer is true.',
    exampleTranslation: '答案是正确的。',
    note: 'Python中写作True（首字母大写）'
  },
  {
    word: 'false',
    pronunciation: '[fɔːls]',
    partOfSpeech: 'adj.',
    meaning: '错误的；假的',
    level: 'easy',
    example: 'The statement is false.',
    exampleTranslation: '这个陈述是错误的。',
    note: 'Python中写作False（首字母大写）'
  },
  {
    word: 'boolean',
    pronunciation: "['buːliən]",
    partOfSpeech: 'n./adj.',
    meaning: '布尔；布尔值的',
    level: 'medium',
    example: 'This is a boolean value.',
    exampleTranslation: '这是一个布尔值。',
    note: '以数学家George Boole命名'
  },
  {
    word: 'condition',
    pronunciation: "[kən'dɪʃn]",
    partOfSpeech: 'n.',
    meaning: '条件；状况',
    level: 'medium',
    example: 'Check the condition first.',
    exampleTranslation: '先检查条件。',
    note: 'while循环需要条件'
  },
  {
    word: 'loop',
    pronunciation: '[luːp]',
    partOfSpeech: 'n./v.',
    meaning: '循环；环状；循环',
    level: 'medium',
    example: 'The while loop repeats the code.',
    exampleTranslation: 'while循环重复执行代码。',
    note: 'for loop是for循环，while loop是while循环'
  },
  {
    word: 'infinite',
    pronunciation: "['ɪnfɪnət]",
    partOfSpeech: 'adj.',
    meaning: '无限的；无穷的',
    level: 'hard',
    example: 'while True creates an infinite loop.',
    exampleTranslation: 'while True创建一个无限循环。',
    note: 'in-表示"不"，fin表示"结束"'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '真假判断 - 布尔值',
    emoji: '🎯',
    gradeLevel: '1-2',
    summary: '只有两个值的数据类型：True（真）和False（假）',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你在玩一个真假游戏！老师说一句话，你要判断是对还是错。"1+1=2"是对的，"1+1=3"是错的。在Python中，我们用True表示"对/真"，用False表示"错/假"。',
      concept: '布尔值（Boolean）是一种只有两个值的数据类型：True（表示条件成立、真）和False（表示条件不成立、假）。注意：Python中True和False的首字母必须大写！',
      syntax: '# 布尔值\nTrue   # 真/对\nFalse  # 假/错',
      example: {
        title: '布尔值示例',
        code: 'print(True)\nprint(False)',
        output: 'True\nFalse',
        explanation: '直接打印True和False，显示的就是True和False。它们是Python中的关键字，表示"真"和"假"。'
      },
      practice: [
        {
          question: 'Python中"真"用什么表示？',
          answer: 'True（首字母大写）'
        },
        {
          question: '布尔值有哪两个值？',
          answer: 'True和False'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '真假判断升级！你可以用比较运算符来判断真假，比如5>3是True，5>10是False。你甚至可以把布尔值存在变量里！',
      concept: '布尔值常用于条件判断。比较运算符（>、<、==、!=、>=、<=）的结果都是布尔值。布尔值可以赋值给变量，参与逻辑运算（and、or、not）。',
      syntax: '# 比较运算产生布尔值\n5 > 3      # True\n5 > 10     # False\n10 == 10   # True\n\n# 布尔变量\nis_student = True\nis_teacher = False',
      example: {
        title: '比较运算和布尔变量',
        code: 'age = 10\nprint(age > 5)\nprint(age < 5)\n\nis_child = age < 18\nprint(is_child)',
        output: 'True\nFalse\nTrue',
        explanation: 'age=10，age>5是True，age<5是False。is_child存储了age<18的结果True。'
      },
      practice: [
        {
          question: '7 > 5的结果是什么？',
          answer: 'True'
        },
        {
          question: '10 == 10的结果是什么？',
          answer: 'True（相等比较用==）'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '布尔值大师模式！你可以用逻辑运算符组合多个条件，用在if语句和while循环中。布尔值是编程中控制程序流程的核心！',
      concept: '布尔值是编程中控制流程的基础：①if条件判断②while循环条件③逻辑运算（and/or/not）。and运算：两个都为True才为True；or运算：有一个为True就为True；not运算：取反。',
      syntax: "# 逻辑运算\nTrue and True   # True\nTrue and False  # False\nTrue or False   # True\nnot True        # False\n\n# 在if中使用\nif age >= 6 and age <= 12:\n    print('小学生')",
      example: {
        title: '逻辑运算',
        code: 'age = 10\nhas_ticket = True\n\n# 两个条件都满足\nprint(age >= 6 and has_ticket)\n\n# 至少一个满足\nprint(age < 6 or age > 60)',
        output: 'True\nFalse',
        explanation: 'age=10>=6且has_ticket=True，所以and结果是True。age=10不<6也不>60，所以or结果是False。'
      },
      practice: [
        {
          question: 'True and False的结果是什么？',
          answer: 'False（and需要两个都为True）'
        },
        {
          question: 'not True的结果是什么？',
          answer: 'False（not取反）'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '重复执行 - while循环',
    emoji: '🔁',
    gradeLevel: '1-2',
    summary: '当条件满足时，重复执行代码块',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象老师说："只要下课铃没响，就继续写作业！"这句话会让你一直写作业，直到下课铃响。while循环就是这样：只要条件为True，就重复执行代码！',
      concept: 'while循环是Python中的循环结构，格式是"while 条件:"，冒号后面写要重复的代码（注意缩进）。只要条件为True，就会一直重复执行；当条件变为False时，循环结束。',
      syntax: 'while 条件:\n    重复执行的代码',
      example: {
        title: '基本的while循环',
        code: 'count = 0\nwhile count < 3:\n    print("计数:", count)\n    count = count + 1\nprint("结束!")',
        output: '计数: 0\n计数: 1\n计数: 2\n结束!',
        explanation: 'count从0开始，count<3为True时打印并增加count。当count变为3时，count<3为False，循环结束。'
      },
      practice: [
        {
          question: 'while循环什么时候结束？',
          answer: '当条件变为False时结束'
        },
        {
          question: 'while后面的代码需要什么？',
          answer: '需要缩进（通常4个空格）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'while循环进阶！你可以用while循环来累加数字、统计次数、或者等待某个事件发生。关键是：一定要在循环内修改条件，否则会永远循环下去！',
      concept: 'while循环的核心要素：①循环条件（Boolean表达式）②循环体（重复执行的代码）③条件更新（在循环内修改条件变量）。常见应用：计数器、累加器、等待用户输入。',
      syntax: '# 计数器模式\ncount = 0\nwhile count < 次数:\n    代码\n    count = count + 1\n\n# 累加器模式\ntotal = 0\nwhile 有数据:\n    total = total + 新数据',
      example: {
        title: '累加求和',
        code: '# 计算1到5的和\ntotal = 0\nnum = 1\nwhile num <= 5:\n    total = total + num\n    num = num + 1\nprint("总和:", total)',
        output: '总和: 15',
        explanation: '每次循环把num加到total，然后num增加1。num从1到5，所以total=1+2+3+4+5=15。'
      },
      practice: [
        {
          question: '如何防止while循环永远不结束？',
          answer: '在循环体内修改条件变量，使条件最终变为False'
        },
        {
          question: 'while循环的循环体需要什么？',
          answer: '缩进（通常是4个空格）'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'while循环大师模式！你可以用while循环实现复杂的算法，如二分查找、欧几里得算法、游戏主循环等。理解while循环是成为编程高手的关键！',
      concept: 'while循环 vs for循环：while适合不确定次数的循环（条件控制），for适合确定次数的循环（遍历序列）。while循环的常见模式：①计数循环②哨兵循环③输入验证④无限循环+break。',
      syntax: '# 输入验证\nwhile True:\n    n = input("输入正数:")\n    if n > 0:\n        break\n\n# 哨兵循环\ntotal = 0\nwhile True:\n    n = input("输入数字(0结束):")\n    if n == 0:\n        break\n    total += n',
      example: {
        title: '输入验证',
        code: 'while True:\n    n = int(input("输入1-10的数字:"))\n    if 1 <= n <= 10:\n        print("正确:", n)\n        break\n    else:\n        print("错误，重试!")',
        output: '输入1-10的数字:15\n错误，重试!\n输入1-10的数字:5\n正确: 5',
        explanation: '用while True创建无限循环，当用户输入有效数字时用break退出。这是输入验证的标准模式。'
      },
      practice: [
        {
          question: 'while True有什么用？',
          answer: '创建无限循环，通常配合break在满足条件时退出'
        },
        {
          question: 'while循环和for循环的区别是什么？',
          answer: 'while用条件控制（不确定次数），for用遍历序列（确定次数）'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '永不停止 - while True无限循环',
    emoji: '♾️',
    gradeLevel: '1-2',
    summary: '条件永远为True的while循环',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象有一个永远停不下来的跑步机！只要你站上去，它就一直转，直到你主动跳下来。while True就是这样：因为True永远是真的，所以循环会一直运行下去！',
      concept: 'while True是一种特殊的while循环，条件永远是True，所以循环永远不会自动结束。要让循环停止，需要在循环内使用break语句或Ctrl+C强制停止。',
      syntax: 'while True:\n    无限重复的代码\n    if 某个条件:\n        break  # 退出循环',
      example: {
        title: 'while True示例',
        code: 'while True:\n    print("运行中...")\n    answer = input("停止吗?(y/n):")\n    if answer == "y":\n        break\nprint("已停止!")',
        output: '运行中...\n停止吗?(y/n):n\n运行中...\n停止吗?(y/n):y\n已停止!',
        explanation: 'while True让循环无限运行。当用户输入y时，break语句执行，循环退出。'
      },
      practice: [
        {
          question: 'while True会自动停止吗？',
          answer: '不会，需要用break或强制停止'
        },
        {
          question: '如何退出while True循环？',
          answer: '用break语句'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '无限循环进阶！while True常用于需要一直运行的程序：游戏主循环、服务器监听、实时监控等。配合if-break模式，可以在需要时优雅地退出。',
      concept: 'while True + if-break是最常见的循环模式之一。程序一直在循环中等待，当满足特定条件时退出。这种模式在游戏开发（主循环）、网络编程（监听连接）、GUI（事件循环）中广泛使用。',
      syntax: '# 游戏主循环模式\nwhile True:\n    处理输入\n    更新游戏状态\n    绘制画面\n    if 游戏结束:\n        break\n\n# 菜单循环模式\nwhile True:\n    显示菜单\n    choice = input("选择:")\n    if choice == "退出":\n        break\n    执行选择',
      example: {
        title: '简单菜单',
        code: 'while True:\n    print("1.玩游戏 2.退出")\n    choice = input("选择:")\n    if choice == "1":\n        print("开始游戏!")\n    elif choice == "2":\n        print("再见!")\n        break',
        output: '1.玩游戏 2.退出\n选择:1\n开始游戏!\n1.玩游戏 2.退出\n选择:2\n再见!',
        explanation: '这是一个菜单循环，用户可以选择1玩游戏或2退出。选择2时break退出循环。'
      },
      practice: [
        {
          question: 'while True常用于什么场景？',
          answer: '游戏主循环、菜单循环、服务器监听等需要持续运行的程序'
        },
        {
          question: 'while True配合什么使用可以退出？',
          answer: 'break语句'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '无限循环大师模式！while True是编程中最强大的工具之一。从操作系统的事件循环到游戏的渲染循环，从Web服务器到实时数据处理，无数核心程序都在用while True！',
      concept: 'while True的本质是"事件驱动"编程：程序进入循环，等待事件发生，处理事件，继续等待。break语句是唯一的退出路径。高级应用：①游戏引擎的主循环②事件驱动架构③ REPL（Read-Eval-Print Loop）④生产者-消费者模式。',
      syntax: '# REPL模式（交互式解释器）\nwhile True:\n    code = input(">>>")\n    if code == "quit":\n        break\n    result = eval(code)\n    print(result)\n\n# 事件处理模式\nwhile True:\n    event = wait_for_event()\n    if event.type == "QUIT":\n        break\n    handle_event(event)',
      example: {
        title: '简单计算器',
        code: 'while True:\n    expr = input("输入算式(或q退出):")\n    if expr == "q":\n        break\n    try:\n        result = eval(expr)\n        print("=", result)\n    except:\n        print("错误!")\nprint("计算器关闭")',
        output: '输入算式(或q退出):2+3\n= 5\n输入算式(或q退出):10*5\n= 50\n输入算式(或q退出):q\n计算器关闭',
        explanation: '这是一个REPL风格的计算器。while True持续等待输入，eval()计算表达式，输入q时退出。'
      },
      practice: [
        {
          question: 'REPL是什么的缩写？',
          answer: 'Read-Eval-Print Loop（读取-求值-打印循环）'
        },
        {
          question: 'while True在游戏开发中的作用是什么？',
          answer: '作为游戏主循环，持续处理输入、更新状态、渲染画面'
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
    mathConcept: '布尔值基础',
    question: '下面哪个是Python中正确的"真"的写法？\n\nA. true\nB. True\nC. TRUE\nD. "true"',
    options: [
      'A. true',
      'B. True',
      'C. TRUE',
      'D. "true"'
    ],
    answer: 1,
    explanation: 'Python中布尔值是True和False，首字母必须大写。true是JavaScript的写法，"true"是字符串。',
    hint: '注意首字母大写'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '比较运算',
    question: '5 > 3 的结果是什么？\n\nA. True\nB. False\nC. 5\nD. 3',
    options: [
      'A. True',
      'B. False',
      'C. 5',
      'D. 3'
    ],
    answer: 0,
    explanation: '5确实大于3，所以比较结果是True（真）。\n\n数学知识：比较5和3的大小，5>3成立。',
    hint: '5确实大于3'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: 'while循环逻辑',
    question: '执行下面的代码，会打印几次"你好"？\n\n```python\ncount = 0\nwhile count < 3:\n    print("你好")\n    count = count + 1\n```\n\nA. 2次\nB. 3次\nC. 4次\nD. 无限次',
    options: [
      'A. 2次',
      'B. 3次',
      'C. 4次',
      'D. 无限次'
    ],
    answer: 1,
    explanation: 'count从0开始，每次循环后加1。count=0,1,2时条件成立，count=3时条件不成立。所以循环3次。\n\n数学知识：0,1,2共3个数字。',
    hint: 'count从0到2，共3次'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '逻辑运算',
    question: 'True and False 的结果是什么？\n\nA. True\nB. False\nC. 0\nD. 1',
    options: [
      'A. True',
      'B. False',
      'C. 0',
      'D. 1'
    ],
    answer: 1,
    explanation: 'and运算要求两个都为True才返回True。True and False = False。\n\n数学知识：类似集合的交集，两个条件都满足才为真。',
    hint: 'and需要两个都为True'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '循环累加',
    question: '执行下面的代码，最后total是多少？\n\n```python\ntotal = 0\ncount = 1\nwhile count <= 4:\n    total = total + count\n    count = count + 1\nprint(total)\n```\n\nA. 6\nB. 10\nC. 4\nD. 5',
    options: [
      'A. 6',
      'B. 10',
      'C. 4',
      'D. 5'
    ],
    answer: 1,
    explanation: 'total累加了1+2+3+4=10。\n\n数学知识：等差数列求和1+2+3+4 = 4×(1+4)÷2 = 10。',
    hint: 'total = 1 + 2 + 3 + 4'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '布尔表达式',
    question: '假设 age = 10，下面哪个表达式的结果是 False？\n\nA. age > 5\nB. age < 20\nC. age == 10\nD. age > 15',
    options: [
      'A. age > 5',
      'B. age < 20',
      'C. age == 10',
      'D. age > 15'
    ],
    answer: 3,
    explanation: 'age=10，10>15是False，其他都是True。\n\n数学知识：10不在大于15的范围内。',
    hint: '10大于15是错误的'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L4-1',
  title: '布尔值和while循环',
  subtitle: '学会True/False判断和while循环',
  difficulty: '入门',
  estimatedTime: '30-40分钟',
  learningGoals: [
    '理解布尔值的概念（True和False）',
    '学会使用比较运算符产生布尔值',
    '掌握while循环的基本语法',
    '了解while True无限循环和break语句'
  ],
  prerequisites: [
    'Python 基础语法',
    '变量基础概念',
    'print() 和 input() 命令',
    '缩进规则'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['true', 'false', 'while', 'loop'],
  medium: ['boolean', 'condition', 'break', 'print'],
  hard: ['infinite', 'compare', 'evaluate', 'execute']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'print(True)',
    'print(False)',
    'while count < 3:',
    'count = count + 1',
    'if answer == "y":',
    'break'
  ],
  medium: [
    'while True:\n    print("Hello")\n    break',
    'age = 10\nprint(age > 5)',
    'count = 0\nwhile count < 5:\n    count = count + 1',
    'if 1 <= n <= 10:\n    break',
    'is_student = True\nprint(is_student)',
    'total = 0\nwhile num <= 10:\n    total = total + num'
  ],
  hard: [
    'while True:\n    answer = input("继续?(y/n):")\n    if answer == "n":\n        break',
    'while True:\n    n = int(input("输入数字:"))\n    if 1 <= n <= 100:\n        break',
    'total = 0\ncount = 1\nwhile count <= 100:\n    total = total + count\n    count = count + 1',
    'print(True and False)\nprint(True or False)\nprint(not True)',
    'while age >= 0 and age <= 18:\n    print("未成年")\n    age = age + 1',
    'while True:\n    code = input(">>>")\n    if code == "quit":\n        break\n    print(eval(code))'
  ]
}

// 导出所有数据
export const L4_1_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L4_1_data
