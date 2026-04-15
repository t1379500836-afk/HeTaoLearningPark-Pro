/**
 * PY1 课程 L6-4: 随机模块
 *
 * 核心知识点:
 * 1. import - 导入模块
 * 2. random.choice() - 从列表中随机选择
 * 3. random.randint() - 生成随机整数
 */

// 单词卡数据
export const vocabData = [
  {
    word: 'import',
    pronunciation: '[im\'po:t]',
    partOfSpeech: 'v.',
    meaning: '进口；导入',
    level: 'medium',
    example: 'Import random module.',
    exampleTranslation: '导入随机模块。',
    note: ''
  },
  {
    word: 'random',
    pronunciation: '[\'raendem]',
    partOfSpeech: 'adj.',
    meaning: '任意的，随机的',
    level: 'easy',
    example: 'Pick a random number.',
    exampleTranslation: '选一个随机数。',
    note: 'random numbers 随机数'
  },
  {
    word: 'choice',
    pronunciation: '[tJois]',
    partOfSpeech: 'n.',
    meaning: '选择；选择权',
    level: 'easy',
    example: 'Make your choice.',
    exampleTranslation: '做出你的选择。',
    note: ''
  },
  {
    word: 'module',
    pronunciation: '[\'mod3u:l]',
    partOfSpeech: 'n.',
    meaning: '模块；组件',
    level: 'medium',
    example: 'Import a module.',
    exampleTranslation: '导入一个模块。',
    note: ''
  },
  {
    word: 'lucky',
    pronunciation: '[\'l^ki]',
    partOfSpeech: 'adj.',
    meaning: '幸运的',
    level: 'easy',
    example: 'Good luck!',
    exampleTranslation: '祝你好运！',
    note: ''
  },
  {
    word: 'range',
    pronunciation: '[reind3]',
    partOfSpeech: 'n.',
    meaning: '范围；区间',
    level: 'medium',
    example: 'Choose a number in range.',
    exampleTranslation: '在这个范围内选一个数。',
    note: ''
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '工具箱 - import 导入模块',
    emoji: '🧰',
    gradeLevel: '1-2',
    summary: '导入Python的工具模块',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个超级工具箱，里面有各种神奇工具。想用什么工具，只要把它拿出来就行了！import 就是把工具从箱子里拿出来的命令！',
      concept: 'Python 有很多内置的工具叫做"模块"。使用 import 命令可以把这些工具导入到你的程序中使用。格式是：import 模块名',
      syntax: 'import 模块名',
      example: {
        title: '导入随机模块',
        code: 'import random\nprint("模块导入成功！")',
        output: '模块导入成功！',
        explanation: 'import random 导入了 Python 的随机模块。导入后就可以使用这个模块里的各种功能了。'
      },
      practice: [
        {
          question: 'import 命令有什么作用？',
          answer: '导入Python模块，让程序可以使用模块里的功能'
        },
        {
          question: 'import random 导入的是什么？',
          answer: 'Python的随机模块，可以生成随机数'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的工具箱更大了！有计算工具、随机工具、时间工具等各种专业模块。想用哪个就导入哪个，就像从工具箱选工具一样简单！',
      concept: 'Python 有丰富的标准库模块：random（随机）、math（数学）、time（时间）等。导入模块后，用"模块名.功能名"的方式使用。也可以只导入特定功能：from 模块 import 功能',
      syntax: '# 导入整个模块\nimport random\nimport math\n\n# 导入特定功能\nfrom random import choice',
      example: {
        title: '导入不同模块',
        code: '# 导入随机模块\nimport random\n\n# 导入数学模块\nimport math\nprint(math.pi)\n\n# 只导入choice功能\nfrom random import choice',
        output: '3.14159...',
        explanation: 'import random 导入随机模块。import math 导入数学模块，可以用 math.pi 获取圆周率。from random import choice 只导入 choice 功能。'
      },
      practice: [
        {
          question: '导入模块后如何使用模块的功能？',
          answer: '用"模块名.功能名"的方式，如 random.choice()'
        },
        {
          question: 'import random 和 from random import choice 有什么区别？',
          answer: '前者导入整个模块用random.choice()，后者只导入choice直接用choice()'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '模块大师模式！你可以导入各种专业模块，扩展 Python 的功能。理解模块系统是成为 Python 高手的必经之路！',
      concept: '模块是 Python 代码组织的核心方式。标准库模块（如 random、math）内置在 Python 中。第三方模块需要先用 pip 安装。导入时会执行模块代码，创建模块对象。模块名存入 sys.modules 缓存，重复导入不会重复执行。',
      syntax: '# 常见标准库模块\nimport random   # 随机数\nimport math     # 数学函数\nimport time     # 时间相关\nimport json     # JSON处理\nimport os       # 操作系统接口',
      example: {
        title: '使用多个模块',
        code: '# 综合使用多个模块\nimport random\nimport math\nimport time\n\n# 生成随机角度\nangle = random.randint(0, 360)\nprint("角度: " + str(angle) + "度")\n\n# 计算正弦值\nsin_value = math.sin(math.radians(angle))\nprint("正弦: " + str(sin_value))',
        output: '角度: 247度\n正弦: -0.9205...',
        explanation: '导入三个模块，用 random 生成随机角度，用 math 计算正弦值。不同模块配合可以实现复杂功能。'
      },
      practice: [
        {
          question: '重复导入同一个模块会怎样？',
          answer: 'Python会缓存模块，不会重复执行，直接使用缓存的版本'
        },
        {
          question: '如何查看模块中有哪些功能？',
          answer: '用 dir(模块名) 可以查看模块的所有属性和方法'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '随机选择 - random.choice()',
    emoji: '🎲',
    gradeLevel: '1-2',
    summary: '从列表中随机选择一个元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一顶神奇的魔法帽，里面有很多纸条。摇一摇帽子，它会随机吐出一张纸条！random.choice() 就是这样的魔法！',
      concept: 'random.choice(列表) 会从列表中随机选择一个元素。每次选择的结果可能是列表中的任意一个元素，完全随机！',
      syntax: 'import random\nrandom.choice(列表)',
      example: {
        title: '随机选择水果',
        code: 'import random\nfruits = ["苹果", "香蕉", "橙子", "葡萄"]\nresult = random.choice(fruits)\nprint("选中:", result)',
        output: '选中: 香蕉',
        explanation: 'random.choice(fruits) 从水果列表中随机选择一个。每次运行可能得到不同的结果。'
      },
      practice: [
        {
          question: 'random.choice() 会选择几个元素？',
          answer: '一个元素'
        },
        {
          question: '每次运行结果会一样吗？',
          answer: '不一定，是随机的'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的魔法帽更强大了！可以放入任意多的东西，每次都能公平随机地选出一样。用来做抽奖、决定游戏顺序都很棒！',
      concept: 'random.choice() 从非空序列中随机返回一个元素。序列可以是列表、字符串、元组等。对于空序列会报 IndexError。每次调用独立随机，可能选择相同元素。',
      syntax: 'import random\n\n# 从列表选择\nitem = random.choice(list)\n\n# 从字符串选择\nchar = random.choice("hello")',
      example: {
        title: '多种随机选择',
        code: 'import random\n\n# 抽奖活动\nprizes = ["一等奖", "二等奖", "三等奖", "谢谢参与"]\nmy_prize = random.choice(prizes)\nprint("恭喜获得: " + my_prize)\n\n# 随机动作\nactions = ["跳", "跑", "爬", "走"]\naction = random.choice(actions)\nprint("请你" + action + "！")',
        output: '恭喜获得: 二等奖\n请你跑！',
        explanation: '第一个例子从奖品列表随机选择一个。第二个从动作列表随机选择一个。每次运行结果可能不同。'
      },
      practice: [
        {
          question: 'random.choice() 可以用于哪些类型？',
          answer: '列表、字符串、元组等序列类型'
        },
        {
          question: '如果列表是空的会怎样？',
          answer: '会报 IndexError 错误'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '随机算法大师！random.choice() 实现了等概率随机选择。理解随机数生成原理、概率分布，是编写游戏、模拟、抽样程序的基础！',
      concept: 'random.choice() 使用 Mersenne Twister 算法生成伪随机数，每个元素被选中的概率相等（均匀分布）。对于真随机场景（如抽奖），需用 secrets 模块。random.choice(seq) 等价于 seq[random.randint(0, len(seq)-1)]',
      syntax: '# random.choice() 内部原理类似这样：\nimport random\nindex = random.randint(0, len(seq) - 1)\nresult = seq[index]\n\n# 如果要选多个不重复的元素，可以用循环实现\nselected = []\nfor i in range(k):\n    item = random.choice(列表)\n    while item in selected:\n        item = random.choice(列表)\n    selected.append(item)',
      example: {
        title: '随机选择应用',
        code: 'import random\n\n# 模拟掷骰子1000次，统计频率\ncounts = [0, 0, 0, 0, 0, 0]  # 用列表存储每个面出现的次数\nfor _ in range(1000):\n    result = random.choice([1, 2, 3, 4, 5, 6])\n    counts[result-1] += 1  # result-1是因为列表索引从0开始\n\nprint("掷骰子结果分布:")\nfor i in range(6):\n    face = i + 1\n    count = counts[i]\n    print(str(face) + "点: " + str(count) + "次 (" + str(count/10) + "%)")',
        output: '掷骰子结果分布:\n1点: 167次 (16.7%)\n2点: 158次 (15.8%)\n3点: 175次 (17.5%)\n4点: 161次 (16.1%)\n5点: 170次 (17.0%)\n6点: 169次 (16.9%)',
        explanation: '掷骰子1000次，每个数字出现的频率都在16.7%左右，验证了随机选择的均匀性。次数越多，分布越均匀。'
      },
      practice: [
        {
          question: 'random.choice() 每个元素被选中的概率一样吗？',
          answer: '一样，是均匀分布'
        },
        {
          question: 'random.choice() 和 random.randint() 有什么区别？',
          answer: 'random.choice() 从列表中选，random.randint() 从数字范围中选'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '随机整数 - random.randint()',
    emoji: '🔢',
    gradeLevel: '1-2',
    summary: '生成指定范围的随机整数',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个数字抽奖机，可以设置范围。比如设置1到10，它就会随机吐出1到10之间的某个数字！',
      concept: 'random.randint(a, b) 会生成 a 到 b 之间的随机整数（包括 a 和 b）。每次运行可能得到不同的结果。',
      syntax: 'import random\nrandom.randint(起始数, 结束数)',
      example: {
        title: '生成随机数字',
        code: 'import random\n\n# 生成1到10的随机数\nnumber = random.randint(1, 10)\nprint("幸运数字:", number)',
        output: '幸运数字: 7',
        explanation: 'random.randint(1, 10) 生成1到10之间的随机整数。可能是1、2、3...直到10中的任何一个。'
      },
      practice: [
        {
          question: 'random.randint(1, 10) 能生成哪些数字？',
          answer: '1到10之间的任意整数，包括1和10'
        },
        {
          question: '每次运行结果一样吗？',
          answer: '不一定，是随机的'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的数字抽奖机更灵活了！可以设置任意范围，比如骰子的1-6，月份的1-12，年龄的1-100等等！',
      concept: 'random.randint(a, b) 返回 [a, b] 范围内的随机整数，两端都包含。注意 a 必须 <= b，否则会报错。常用于模拟掷骰子、随机年龄、随机年份等场景。',
      syntax: 'import random\n\n# 掷骰子\ndice = random.randint(1, 6)\n\n# 随机月份\nmonth = random.randint(1, 12)\n\n# 随机年份\nyear = random.randint(2000, 2024)',
      example: {
        title: '各种随机数生成',
        code: 'import random\n\n# 模拟掷骰子\nprint("掷骰子:", random.randint(1, 6))\n\n# 模拟抛硬币（1=正面, 2=反面）\ncoin = random.randint(1, 2)\nif coin == 1:\n    print("抛硬币: 正面")\nelse:\n    print("抛硬币: 反面")\n\n# 随机幸运数（1-100）\nlucky = random.randint(1, 100)\nprint("幸运数: " + str(lucky))',
        output: '掷骰子: 4\n抛硬币: 反面\n幸运数: 73',
        explanation: '第一个模拟骰子（1-6）。第二个模拟硬币（1-2，1是正面，2是反面）。第三个生成1-100的幸运数。'
      },
      practice: [
        {
          question: 'random.randint(1, 6) 能生成6吗？',
          answer: '能，两端都包含'
        },
        {
          question: 'random.randint(5, 5) 会返回什么？',
          answer: '总是返回5，因为范围只有一个数字'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '随机数大师！理解随机数生成的原理和应用场景，可以实现游戏、模拟实验、数据采样等各种有趣功能！',
      concept: 'random.randint(a, b) 底层调用 random.randrange(a, b+1)。生成的随机数是伪随机，由种子（seed）决定。random.seed(n) 可以设置种子，使随机序列可重现。真随机应用需用 secrets 模块。',
      syntax: '# 设置种子（可重现）\nimport random\nrandom.seed(42)\nn1 = random.randint(1, 10)\n\n# 随机浮点数\nf = random.random()  # [0.0, 1.0)\n\n# 随机范围浮点数\nrf = random.uniform(1.0, 10.0)',
      example: {
        title: '随机数种子和应用',
        code: 'import random\n\n# 设置种子，使结果可重现\nrandom.seed(100)\nprint("固定序列:")\nfor i in range(5):\n    print(random.randint(1, 100))\n\n# 不设置种子，每次不同\nprint("\\n随机序列:")\nfor i in range(5):\n    print(random.randint(1, 100))',
        output: '固定序列:\n5\n23\n44\n75\n19\n\n随机序列:\n(每次运行会变化)',
        explanation: '设置种子后，随机数序列是固定的，这在调试和测试时很有用。不设置种子时，每次运行结果不同。'
      },
      practice: [
        {
          question: '为什么要设置随机数种子？',
          answer: '使随机结果可重现，方便调试和测试'
        },
        {
          question: 'random.randint() 和 random.randrange() 有什么区别？',
          answer: 'randint两端都包含，randrange右端不包含'
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
    mathConcept: '范围问题',
    question: 'random.randint(1, 6) 不能生成哪个数字？\n\nA. 1\nB. 3\nC. 6\nD. 7',
    options: [
      'A. 1',
      'B. 3',
      'C. 6',
      'D. 7'
    ],
    answer: 3, // D
    explanation: '这是一个范围问题！\n\nrandom.randint(1, 6) 生成 1 到 6 之间的随机整数。\n\n范围：[1, 2, 3, 4, 5, 6]\n\n可以生成：1, 2, 3, 4, 5, 6\n不能生成：7\n\n数学知识：randint(a, b) 的范围是从 a 到 b（包括两端）。',
    hint: '1到6之间不包括7'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '计数问题',
    question: '列表 ["红", "黄", "蓝"] 中，random.choice() 可能选择几个不同的结果？\n\nA. 1种\nB. 2种\nC. 3种\nD. 无数种',
    options: [
      'A. 1种',
      'B. 2种',
      'C. 3种',
      'D. 无数种'
    ],
    answer: 2, // C
    explanation: '这是一个计数问题！\n\n列表 ["红", "黄", "蓝"] 有3个元素。\n\nrandom.choice() 会从3个元素中随机选择1个。\n\n可能的结果：\n- "红"\n- "黄"  \n- "蓝"\n\n一共有3种可能的选择结果。\n\n数学知识：选择结果的数量等于列表元素的数量。',
    hint: '列表有几个元素，就有几种可能的选择'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '概率问题',
    question: '列表 [1, 2, 3, 4, 5] 中，random.choice() 选择到偶数的概率是多少？\n\nA. 1/5\nB. 2/5\nC. 1/2\nD. 3/5',
    options: [
      'A. 1/5',
      'B. 2/5',
      'C. 1/2',
      'D. 3/5'
    ],
    answer: 1, // B
    explanation: '这是一个概率问题！\n\n列表 [1, 2, 3, 4, 5] 中：\n- 偶数有：2, 4（2个）\n- 总共有5个数\n\n每个数被选中的概率相等。\n\nP(选择偶数) = 偶数个数 / 总数 = 2/5\n\n数学知识：概率 = 有利结果数 / 所有可能结果数。',
    hint: '数一数偶数有几个'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '范围问题',
    question: 'random.randint(10, 20) 能生成的最小和最大数字是什么？\n\nA. 最小10，最大19\nB. 最小11，最大20\nC. 最小10，最大20\nD. 最小0，最大20',
    options: [
      'A. 最小10，最大19',
      'B. 最小11，最大20',
      'C. 最小10，最大20',
      'D. 最小0，最大20'
    ],
    answer: 2, // C
    explanation: '这是一个范围问题！\n\nrandom.randint(10, 20) 生成 10 到 20 之间的随机整数。\n\nrandint(a, b) 两端都包含：\n- 最小值：10\n- 最大值：20\n\n可能生成：10, 11, 12, ..., 19, 20\n\n数学知识：randint 的两个参数都包含在范围内。',
    hint: 'randint的两个参数都包含在内'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '概率计算',
    question: '执行下面的代码，结果能被3整除的概率是多少？\n\n```python\nimport random\nnumber = random.randint(1, 9)\n```\n\nA. 1/9\nB. 1/3\nC. 3/9\nD. 1/2',
    options: [
      'A. 1/9',
      'B. 1/3',
      'C. 3/9',
      'D. 1/2'
    ],
    answer: 1, // B
    explanation: '这是一个概率计算问题！\n\nrandint(1, 9) 生成 [1, 2, 3, 4, 5, 6, 7, 8, 9]，共9个数。\n\n能被3整除的数：3, 6, 9（3个）\n\nP(能被3整除) = 3/9 = 1/3\n\n数学知识：先找出范围内满足条件的数，再计算概率。',
    hint: '1到9中能被3整除的有3、6、9'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '范围计算',
    question: 'random.randint(0, 100) 生成大于50的数字的概率最接近多少？\n\nA. 49%\nB. 50%\nC. 51%\nD. 99%',
    options: [
      'A. 49%',
      'B. 50%',
      'C. 51%',
      'D. 99%'
    ],
    answer: 0, // A
    explanation: '这是一个概率计算问题！\n\nrandint(0, 100) 生成 [0, 1, 2, ..., 100]，共101个数。\n\n大于50的数：51, 52, ..., 100\n个数 = 100 - 51 + 1 = 50个\n\nP(大于50) = 50/101 ≈ 49.5%\n\n最接近 49%\n\n数学知识：注意0也被计入，总数是101个，大于50的有50个。',
    hint: '注意是从0开始，不是从1开始'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L6-4',
  title: '随机模块',
  subtitle: '学会使用随机模块',
  difficulty: '进阶',
  estimatedTime: '35-45分钟',
  learningGoals: [
    '学会使用 import 导入模块',
    '掌握 random.choice() 随机选择',
    '掌握 random.randint() 生成随机整数',
    '了解随机数在编程中的应用'
  ],
  prerequisites: [
    '掌握列表的基本操作',
    '理解函数调用的概念',
    '了解模块的基本概念'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['lucky', 'dice', 'pick', 'select'],
  medium: ['import', 'random', 'choice', 'range'],
  hard: ['module', 'probability', 'generate']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'import random',
    'number = random.randint(1, 10)',
    'print(number)',
    'fruits = ["苹果", "香蕉"]',
    'x = random.choice(fruits)',
    'print(x)'
  ],
  medium: [
    'import random\nfruits = ["苹果", "香蕉", "橙子"]\nresult = random.choice(fruits)',
    'import random\ndice = random.randint(1, 6)\nprint("骰子: " + str(dice))',
    'import random\nlucky = random.randint(1, 100)\nprint("幸运数: " + str(lucky))',
    'import random\nprizes = ["一等奖", "谢谢参与"]\nprint(random.choice(prizes))',
    'import random\ncoin = random.randint(1, 2)\nif coin == 1:\n    print("正面")\nelse:\n    print("反面")'
  ],
  hard: [
    'import random\nrandom.seed(42)\nfor i in range(5):\n    print(random.randint(1, 100))',
    'import random\nnumbers = [1, 2, 3, 4, 5]\nfor _ in range(10):\n    print(random.choice(numbers))',
    'import random\nfor _ in range(3):\n    dice = random.randint(1, 6)\n    print("掷骰子: " + str(dice))',
    'import random\nactions = ["跳", "跑", "爬"]\nprint("请你" + random.choice(actions) + "！")',
    'import random\nnumber = random.randint(0, 100)\nprint("随机数: " + str(number))\nif number > 50:\n    print("大于50: True")\nelse:\n    print("大于50: False")'
  ]
}

// 导出所有数据
export const L6_4_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L6_4_data
