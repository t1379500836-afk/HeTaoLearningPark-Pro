/**
 * PY1 课程 L2-1: 循环初体验
 *
 * 核心知识点:
 * 1. while 循环 - 重复执行代码
 * 2. while True - 无限循环
 * 3. 循环控制 - 条件判断
 */

// 单词卡数据 - OCR 提取
export const vocabData = [
  {
    word: 'hit',
    pronunciation: '[hit]',
    partOfSpeech: 'v./n.',
    meaning: '打；打击；击中；命中',
    level: 'easy',
    example: 'hit song 畅销歌曲',
    exampleTranslation: '畅销歌曲',
    note: 'hit 击打'
  },
  {
    word: 'else',
    pronunciation: '[els]',
    partOfSpeech: 'adv./adj.',
    meaning: '别的；其他的',
    level: 'easy',
    example: 'If you are ready, go. Else wait.',
    exampleTranslation: '如果你准备好了就走，否则等待。',
    note: 'else 否则（if-else语句）'
  },
  {
    word: 'link',
    pronunciation: '[liŋk]',
    partOfSpeech: 'n./v.',
    meaning: '链接；连接；联系',
    level: 'medium',
    example: 'Click the link to open the page.',
    exampleTranslation: '点击链接打开页面。',
    note: 'link 链接'
  },
  {
    word: 'replace',
    pronunciation: "[ri'pleis]",
    partOfSpeech: 'v.',
    meaning: '取代；代替',
    level: 'medium',
    example: 'Replace the old with the new.',
    exampleTranslation: '用新的取代旧的。',
    note: 'replace 替换'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '魔法转盘 - while循环',
    emoji: '🔄',
    gradeLevel: '1-2',
    summary: '让代码重复执行',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个魔法转盘，只要条件满足，它就会一直转动，不断重复做同样的事情！',
      concept: 'while 循环可以让代码重复执行，只要条件满足，循环就会继续。',
      syntax: 'while 条件:\n    要重复的代码',
      example: {
        title: '简单的while循环',
        code: 'n = 1\nwhile n <= 3:\n    print(n)\n    n = n + 1',
        output: '1\n2\n3',
        explanation: 'while n <= 3 表示当n小于等于3时重复执行，每次打印n后让n增加1，所以打印1、2、3后结束。'
      },
      practice: [
        {
          question: 'while循环什么时候会停止？',
          answer: '当条件不满足时停止'
        },
        {
          question: 'while后面的代码需要缩进吗？',
          answer: '需要，缩进的代码会被重复执行'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的魔法转盘升级了！你可以设置更复杂的条件，让它按照你的需求精确地重复执行！',
      concept: 'while 循环在条件为 True 时持续执行。要注意更新循环变量，否则可能陷入无限循环。',
      syntax: 'while 条件:\n    代码块\n    更新变量的代码',
      example: {
        title: '计数器循环',
        code: 'count = 0\nwhile count < 5:\n    print("你好")\n    count = count + 1\nprint("结束")',
        output: '你好\n你好\n你好\n你好\n你好\n结束',
        explanation: 'count从0开始，每次循环打印"你好"后count加1，当count达到5时条件不满足，循环结束。'
      },
      practice: [
        {
          question: '如果忘记写 count = count + 1 会发生什么？',
          answer: '会变成无限循环，永远不停止'
        },
        {
          question: 'while循环至少会执行一次吗？',
          answer: '不一定，如果开始时条件就不满足，一次都不会执行'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '循环大师模式！你可以用while循环实现复杂的重复逻辑，比如累加计算、寻找规律等！',
      concept: 'while循环是编程中最灵活的循环结构。配合break可以在满足特定条件时提前退出循环。',
      syntax: 'while True:\n    if 条件:\n        break\n    其他代码',
      example: {
        title: '带退出条件的循环',
        code: 'total = 0\nn = 1\nwhile True:\n    total = total + n\n    if total >= 20:\n        break\n    n = n + 1\nprint(total)',
        output: '21',
        explanation: '这是一个累加求和的程序。不断将n加到total中，当total达到或超过20时用break退出循环。'
      },
      practice: [
        {
          question: 'break 命令有什么作用？',
          answer: '立即退出当前循环'
        },
        {
          question: 'while True 和带条件的while有什么区别？',
          answer: 'while True 会无限循环，需要用 break 手动退出；带条件的while在条件不满足时自动退出'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '无限动力 - while True',
    emoji: '♾️',
    gradeLevel: '1-2',
    summary: '创造无限循环的程序',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一台永远不会停的机器，只要打开开关，它就会一直工作下去！',
      concept: 'while True 表示条件永远为真，所以代码会一直重复执行，直到你主动停止程序。',
      syntax: 'while True:\n    想要重复的代码',
      example: {
        title: '无限打印',
        code: 'while True:\n    print("你好")',
        output: '你好\n你好\n你好\n...（一直继续）',
        explanation: 'while True 表示条件永远满足，所以"你好"会被一直打印。需要手动点击停止按钮来结束程序。'
      },
      practice: [
        {
          question: 'while True 会自动停止吗？',
          answer: '不会，需要手动停止程序'
        },
        {
          question: 'True 的首字母是大写还是小写？',
          answer: '大写，Python中True必须大写'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的无限机器升级了！虽然它一直在运行，但你可以设置特殊条件让它聪明地停下来！',
      concept: 'while True 创建无限循环，通常配合 if 语句和 break 来在特定条件下退出。',
      syntax: 'while True:\n    if 退出条件:\n        break\n    正常执行的代码',
      example: {
        title: '有退出的无限循环',
        code: 'while True:\n    answer = input("继续吗？")\n    if answer == "不":\n        break\n    print("继续运行！")',
        output: '继续运行！\n继续运行！\n...（输入"不"后停止）',
        explanation: '虽然用while True创建了无限循环，但当用户输入"不"时，break会让循环退出。'
      },
      practice: [
        {
          question: '如何让 while True 循环停下来？',
          answer: '使用 if 条件判断配合 break 命令'
        },
        {
          question: 'break 命令放在哪里？',
          answer: '放在 if 语句中，当满足退出条件时执行'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '无限循环专家模式！你可以用while True创造持续运行的游戏、监控程序等应用！',
      concept: 'while True常用于游戏主循环、实时监控等场景。配合try-except可以优雅地处理程序退出。',
      syntax: 'while True:\n    try:\n        主要逻辑\n    except:\n        break',
      example: {
        title: '游戏循环结构',
        code: 'score = 0\nwhile True:\n    # 游戏主逻辑\n    print("分数: " + str(score))\n    # 检查游戏是否结束\n    if score >= 100:\n        print("胜利！")\n        break\n    score = score + 10',
        output: '分数: 0\n分数: 10\n分数: 20\n...（直到分数达到100）',
        explanation: '这是典型的游戏循环结构。while True保持游戏运行，当达到胜利条件时用break退出。'
      },
      practice: [
        {
          question: '游戏程序为什么常用 while True？',
          answer: '因为游戏需要持续运行，直到玩家选择退出或达到特定条件'
        },
        {
          question: 'while True 和普通 while 循环各适用于什么场景？',
          answer: 'while True适用于不确定循环次数的场景（如游戏、交互程序）；普通while适用于已知循环次数或条件的场景'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '循环条件 - 何时停止',
    emoji: '🚦',
    gradeLevel: '1-2',
    summary: '理解循环的判断条件',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象红绿灯，绿灯亮时可以继续走，红灯亮时就要停下来！while循环就像这样，根据条件决定是否继续。',
      concept: 'while循环每次执行前都会检查条件，条件满足就继续，不满足就停止。',
      syntax: 'while 条件:\n    代码',
      example: {
        title: '简单的条件循环',
        code: 'n = 1\nwhile n < 5:\n    print(n)\n    n = n + 1',
        output: '1\n2\n3\n4',
        explanation: '当n小于5时继续执行，所以打印1、2、3、4。当n变成5时，5<5不成立，循环停止。'
      },
      practice: [
        {
          question: '条件 n < 5 在 n=5 时成立吗？',
          answer: '不成立，5不小于5'
        },
        {
          question: '< 是什么符号？表示什么？',
          answer: '小于号，表示左边比右边小'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的条件判断升级了！你可以用各种比较运算符来控制循环：大于、小于、等于、不等于等等！',
      concept: 'while循环的条件可以是各种比较运算：>（大于）、<（小于）、>=（大于等于）、<=（小于等于）、==（等于）、!=（不等于）',
      syntax: 'while x > 0:  # 大于\nwhile x >= 5:  # 大于等于\nwhile x == 10:  # 等于\nwhile x != 0:  # 不等于',
      example: {
        title: '倒计时程序',
        code: 'count = 10\nwhile count >= 1:\n    print(count)\n    count = count - 1\nprint("发射！")',
        output: '10\n9\n8\n...（一直到1）\n发射！',
        explanation: 'count从10开始，每次减1，只要count大于等于1就继续打印。当count变成0时，0>=1不成立，循环结束。'
      },
      practice: [
        {
          question: '>= 和 > 有什么区别？',
          answer: '>= 表示大于或等于，> 只表示大于'
        },
        {
          question: '为什么条件用 >= 1 而不是 > 1？',
          answer: '使用 >= 1 会包含1，使用 > 1 会在2时就停止，不会打印1'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '条件大师模式！你可以组合多个条件，创造复杂的循环控制逻辑！',
      concept: '可以用 and（和）、or（或）组合多个条件。只有当组合条件的结果为True时循环才继续。',
      syntax: 'while 条件1 and 条件2:  # 两个都满足\nwhile 条件1 or 条件2:   # 至少一个满足',
      example: {
        title: '范围控制循环',
        code: 'n = 5\nwhile n > 0 and n < 10:\n    print(n)\n    n = n + 1\nprint("超出范围")',
        output: '5\n6\n7\n8\n9\n超出范围',
        explanation: '循环条件是 n>0 且 n<10，所以n在5到9之间时继续。当n变成10时，10<10不成立，循环结束。'
      },
      practice: [
        {
          question: 'and 和 or 有什么区别？',
          answer: 'and 需要两个条件都满足，or 只需要至少一个条件满足'
        },
        {
          question: 'while n > 0 and n < 10 会在 n=5 时执行吗？',
          answer: '会，因为5>0且5<10，两个条件都满足'
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
    mathConcept: '数数',
    question: '执行下面的代码，会打印几次"你好"？\n\n```python\nn = 1\nwhile n <= 3:\n    print("你好")\n    n = n + 1\n```\n\nA. 2次\nB. 3次\nC. 4次\nD. 5次',
    options: [
      'A. 2次',
      'B. 3次',
      'C. 4次',
      'D. 5次'
    ],
    answer: 1, // B
    explanation: 'n从1开始，每次加1：\n- 第1次：n=1，1<=3成立，打印"你好"\n- 第2次：n=2，2<=3成立，打印"你好"\n- 第3次：n=3，3<=3成立，打印"你好"\n- 第4次：n=4，4<=3不成立，停止\n\n共打印3次。',
    hint: '数数看n会变成1、2、3、4，哪些时候满足条件？'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '符号识别',
    question: '下面哪个符号表示"小于等于"？\n\nA. <=\nB. >=\nC. <\nD. >',
    options: [
      'A. < =',
      'B. > =',
      'C. <',
      'D. >'
    ],
    answer: 0, // A
    explanation: '<= 表示"小于等于"，例如 3 <= 5 是正确的，5 <= 5 也是正确的。\n\n- >= 表示"大于等于"\n- < 表示"小于"\n- > 表示"大于"',
    hint: '< 是小于，= 是等于，合起来是小于等于'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '算式计算',
    question: '执行下面的代码，最后打印的数字是什么？\n\n```python\ntotal = 0\nn = 1\nwhile n <= 4:\n    total = total + n\n    n = n + 1\nprint(total)\n```\n\nA. 6\nB. 10\nC. 4\nD. 5',
    options: [
      'A. 6',
      'B. 10',
      'C. 4',
      'D. 5'
    ],
    answer: 1, // B
    explanation: '这是一个累加计算！\n- n=1: total = 0 + 1 = 1\n- n=2: total = 1 + 2 = 3\n- n=3: total = 3 + 3 = 6\n- n=4: total = 6 + 4 = 10\n- n=5: 5 <= 4 不成立，停止\n\n最后total = 10。\n\n数学知识：这是计算1+2+3+4的和。',
    hint: '计算每次循环后 total 的值：0→1→3→6→10'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '算式计算',
    question: '执行下面的代码，会输出什么？\n\n```python\nn = 10\nwhile n > 0:\n    print(n)\n    n = n - 2\n```\n\nA. 10 8 6 4 2\nB. 10 8 6 4 2 0\nC. 10 9 8 7 6 5 4 3 2 1\nD. 10 8 6 4',
    options: [
      'A. 10 8 6 4 2',
      'B. 10 8 6 4 2 0',
      'C. 10 9 8 7 6 5 4 3 2 1',
      'D. 10 8 6 4'
    ],
    answer: 0, // A
    explanation: 'n从10开始，每次减2：\n- n=10: 10>0成立，打印10\n- n=8: 8>0成立，打印8\n- n=6: 6>0成立，打印6\n- n=4: 4>0成立，打印4\n- n=2: 2>0成立，打印2\n- n=0: 0>0不成立，停止\n\n输出：10 8 6 4 2\n\n数学知识：这是偶数递减序列。',
    hint: '每次 n 减 2：10→8→6→4→2→0，什么时候不满足 >0？'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '周期问题',
    question: '执行下面的代码，变量 n 的值会变成多少？\n\n```python\nn = 1\nwhile n < 100:\n    n = n * 2\nprint(n)\n```\n\nA. 64\nB. 100\nC. 128\nD. 256',
    options: [
      'A. 64',
      'B. 100',
      'C. 128',
      'D. 256'
    ],
    answer: 2, // C
    explanation: 'n每次乘2：\n- n=1: 1<100, n=1×2=2\n- n=2: 2<100, n=2×2=4\n- n=4: 4<100, n=4×2=8\n- n=8: 8<100, n=8×2=16\n- n=16: 16<100, n=16×2=32\n- n=32: 32<100, n=32×2=64\n- n=64: 64<100, n=64×2=128\n- n=128: 128<100不成立，停止\n\n最后n=128。\n\n数学知识：这是2的幂次增长：1,2,4,8,16,32,64,128...',
    hint: '记录每次 n 的值：1→2→4→8→16→32→64→？'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '累加计算',
    question: '执行下面的代码，会打印出什么？\n\n```python\ntotal = 0\nn = 1\nwhile n <= 5:\n    if n % 2 == 1:\n        total = total + n\n    n = n + 1\nprint(total)\n```\n\nA. 9\nB. 10\nC. 15\nD. 3',
    options: [
      'A. 9',
      'B. 10',
      'C. 15',
      'D. 3'
    ],
    answer: 0, // A
    explanation: '% 是取余数运算。n % 2 == 1 表示n是奇数。\n- n=1: 1是奇数, total=0+1=1\n- n=2: 2是偶数, total不变\n- n=3: 3是奇数, total=1+3=4\n- n=4: 4是偶数, total不变\n- n=5: 5是奇数, total=4+5=9\n\n最后total=9。\n\n数学知识：这是计算1到5中所有奇数的和：1+3+5=9。',
    hint: 'n % 2 == 1 表示奇数，只有奇数才加到 total 中'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L2-1',
  title: '循环初体验',
  subtitle: '学会 while 循环重复执行代码',
  difficulty: '进阶',
  estimatedTime: '30-40分钟',
  learningGoals: [
    '理解 while 循环的基本概念',
    '学会使用条件控制循环',
    '掌握 while True 无限循环',
    '了解 break 命令退出循环'
  ],
  prerequisites: [
    '掌握 print() 命令',
    '理解变量的概念',
    '会使用比较运算符',
    '了解 if 条件判断'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['while', 'loop', 'true', 'break', 'hit', 'else'],
  medium: ['repeat', 'condition', 'forever', 'count', 'link', 'replace'],
  hard: ['infinite', 'continue', 'statement', 'execution']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'n = 1',
    'while n <= 3:',
    'print(n)',
    'n = n + 1'
  ],
  medium: [
    'count = 0\nwhile count < 5:',
    'print(count)\ncount = count + 1',
    'while True:\nprint("hello")',
    'n = 10\nwhile n > 0:\nn = n - 1'
  ],
  hard: [
    'total = 0\nn = 1\nwhile n <= 10:\ntotal = total + n\nn = n + 1',
    'while True:\nanswer = input()\nif answer == "q":\nbreak',
    'count = 0\nwhile count < 100:\nif count % 2 == 0:\nprint(count)\ncount = count + 1',
    'n = 1\nwhile n < 100:\nn = n * 2\nprint(n)'
  ]
}

// 导出所有数据
export const L2_1_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L2_1_data
