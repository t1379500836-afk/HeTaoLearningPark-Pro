/**
 * PY1 课程 L6-2: 列表操作
 *
 * 核心知识点:
 * 1. 列表索引 - 访问列表中的元素
 * 2. 元素修改 - 修改列表中的值
 * 3. 列表遍历 - 用for循环访问所有元素
 */

// 单词卡数据
export const vocabData = [
  {
    word: 'defend',
    pronunciation: '[di\'fend]',
    partOfSpeech: 'v.',
    meaning: '防御；防守',
    level: 'easy',
    example: 'We must defend our castle.',
    exampleTranslation: '我们必须保卫我们的城堡。',
    note: ''
  },
  {
    word: 'height',
    pronunciation: '[hait]',
    partOfSpeech: 'n.',
    meaning: '高度；身高；高处',
    level: 'easy',
    example: 'What is your height?',
    exampleTranslation: '你的身高是多少？',
    note: ''
  },
  {
    word: 'random',
    pronunciation: '[\'raendem]',
    partOfSpeech: 'adj.',
    meaning: '任意的，随机的',
    level: 'medium',
    example: 'It is a random number.',
    exampleTranslation: '这是一个随机数。',
    note: 'random numbers 随机数'
  },
  {
    word: 'family',
    pronunciation: '[\'faemali]',
    partOfSpeech: 'n.',
    meaning: '家庭；家属',
    level: 'easy',
    example: 'I love my family.',
    exampleTranslation: '我爱我的家人。',
    note: ''
  },
  {
    word: 'index',
    pronunciation: '[\'indeks]',
    partOfSpeech: 'n.',
    meaning: '索引；索引号',
    level: 'medium',
    example: 'The index of the first item is 0.',
    exampleTranslation: '第一个项目的索引是0。',
    note: ''
  },
  {
    word: 'loop',
    pronunciation: '[lu:p]',
    partOfSpeech: 'n.',
    meaning: '循环；圈',
    level: 'medium',
    example: 'Use a loop to repeat.',
    exampleTranslation: '使用循环来重复。',
    note: ''
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '位置编号 - 列表索引',
    emoji: '🔢',
    gradeLevel: '1-2',
    summary: '用编号访问列表中的元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一排带编号的储物柜，每个柜子都有一个号码。想要拿哪个柜子里的东西，只要说出它的号码就行了！',
      concept: '列表中的每个位置都有一个编号，叫做"索引"。索引从 0 开始数，不是从 1 开始！第一个元素的索引是 0，第二个是 1，以此类推。',
      syntax: '列表名[索引号]',
      example: {
        title: '访问列表元素',
        code: 'fruits = ["苹果", "香蕉", "橙子"]\nprint(fruits[0])\nprint(fruits[1])',
        output: '苹果\n香蕉',
        explanation: 'fruits[0] 访问第一个元素"苹果"，fruits[1] 访问第二个元素"香蕉"。记住：索引从0开始！'
      },
      practice: [
        {
          question: '列表的第一个元素索引是多少？',
          answer: '0'
        },
        {
          question: '如何访问第三个元素？',
          answer: '使用索引2，如 fruits[2]'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的储物柜系统升级了！不仅有正向编号，还有反向编号！最后一个元素的索引是 -1，倒数第二个是 -2，这样拿最后的东西更方便！',
      concept: 'Python 支持正索引和负索引。正索引从0开始（从左往右），负索引从-1开始（从右往左）。访问元素时，索引不能超出列表范围。',
      syntax: '# 正索引\nfruits[0]  # 第一个\nfruits[1]  # 第二个\n\n# 负索引\nfruits[-1]  # 最后一个\nfruits[-2]  # 倒数第二个',
      example: {
        title: '正索引和负索引',
        code: 'colors = ["红", "黄", "蓝", "绿"]\nprint(colors[0])    # 第一个\nprint(colors[-1])   # 最后一个\nprint(colors[2])    # 第三个',
        output: '红\n绿\n蓝',
        explanation: 'colors[0] 是"红"，colors[-1] 是"绿"（倒数第一个），colors[2] 是"蓝"（第三个）。'
      },
      practice: [
        {
          question: '负索引 -1 表示哪个元素？',
          answer: '最后一个元素'
        },
        {
          question: '有4个元素的列表，最大正索引是多少？',
          answer: '3（因为索引从0开始）'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '索引大师模式！你可以精确定位列表中的任意元素，理解索引越界错误，掌握索引与长度的关系：最大索引 = 长度 - 1',
      concept: '索引是列表的基础概念，范围是 [0, len-1] 或 [-len, -1]。访问越界索引会抛出 IndexError。理解索引本质是"距离起始位置的偏移量"，这有助于理解切片等高级操作。',
      syntax: '# 索引范围\nn = len(lst)\nvalid_range = [0, n-1]  # 正索引有效范围\n\n# 动态访问\ni = 2\nprint(lst[i])  # 打印第3个元素',
      example: {
        title: '安全的索引访问',
        code: 'scores = [95, 87, 92, 88]\nn = len(scores)\n\n# 访问最后一个元素\nlast_index = n - 1\nprint(scores[last_index])\n\n# 或用负索引\nprint(scores[-1])',
        output: '88\n88',
        explanation: '列表长度是4，所以最大索引是3（4-1）。两种方式都可以访问最后一个元素：scores[3] 或 scores[-1]。'
      },
      practice: [
        {
          question: '索引超出范围会报什么错误？',
          answer: 'IndexError（索引越界错误）'
        },
        {
          question: '最大索引和列表长度的关系？',
          answer: '最大索引 = 长度 - 1'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '更换物品 - 元素修改',
    emoji: '🔄',
    gradeLevel: '1-2',
    summary: '修改列表中指定位置的元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '你想把储物柜里的东西换成别的，只要说出柜子号码和新的东西，它就会自动更换！',
      concept: '可以通过索引修改列表中的元素。格式是：列表名[索引] = 新值。这会把指定位置的元素换成新值。',
      syntax: '列表名[索引] = 新值',
      example: {
        title: '修改列表元素',
        code: 'fruits = ["苹果", "香蕉", "橙子"]\nfruits[1] = "葡萄"\nprint(fruits)',
        output: "['苹果', '葡萄', '橙子']",
        explanation: 'fruits[1] 原来是"香蕉"，执行 fruits[1] = "葡萄" 后，把它换成了"葡萄"。'
      },
      practice: [
        {
          question: '修改元素需要用什么？',
          answer: '索引和赋值符号 ='
        },
        {
          question: ' fruits[0] = "西瓜" 会修改哪个元素？',
          answer: '第一个元素'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的储物柜更灵活了！可以随时更换任何位置的东西，甚至可以把数字换成文字，把文字换成数字！',
      concept: '列表是可变的数据结构，可以修改任意位置的元素。修改后，原位置的值会被新值替换。注意索引必须在有效范围内，否则会报错。',
      syntax: '# 修改不同类型的值\nnumbers = [1, 2, 3]\nnumbers[0] = 100\n\n# 修改为不同类型\nmixed = [1, "a", True]\nmixed[1] = "hello"',
      example: {
        title: '修改不同类型的元素',
        code: 'scores = [95, 87, 92]\nscores[0] = 98\nprint(scores)\n\nfruits = ["苹果", "香蕉"]\nfruits[0] = 100\nprint(fruits)',
        output: '[98, 87, 92]\n[100, "香蕉"]',
        explanation: '第一段代码把95改成98。第二段代码把文字"苹果"改成数字100，Python列表允许不同类型混用。'
      },
      practice: [
        {
          question: '修改元素后，原来的值还在吗？',
          answer: '不在了，被新值替换了'
        },
        {
          question: '可以用字符串修改数字类型的列表吗？',
          answer: '可以，Python列表允许混合类型'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '高级编辑模式！你可以通过计算动态确定修改位置，批量修改多个元素，实现数据更新、纠错、转换等复杂操作！',
      concept: '元素修改是原地操作（in-place），不改变列表的内存地址。可以通过表达式计算索引，如 lst[i+j] = val。批量修改常结合循环实现。注意区分修改元素和替换整个列表。',
      syntax: '# 动态索引修改\ni = 1\nlst[i*2] = val\n\n# 批量修改\nfor i in range(len(lst)):\n    lst[i] = lst[i] * 2',
      example: {
        title: '批量修改列表元素',
        code: '# 给所有分数加5分\nscores = [85, 90, 88]\nfor i in range(len(scores)):\n    scores[i] = scores[i] + 5\nprint(scores)',
        output: '[90, 95, 93]',
        explanation: '用for循环遍历所有索引，每个位置的分数都加5。i=0时scores[0]从85变成90，i=1时从90变成95，i=2时从88变成93。'
      },
      practice: [
        {
          question: '修改元素会改变列表的内存地址吗？',
          answer: '不会，是原地修改，列表地址不变'
        },
        {
          question: '如何把列表所有元素加倍？',
          answer: '用for循环遍历，每个元素乘以2'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '逐个检查 - 列表遍历',
    emoji: '🔍',
    gradeLevel: '1-2',
    summary: '用for循环访问所有元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有很多个储物柜要检查，用一个机器人按顺序打开每个柜子，看看里面是什么，这样就能一个不漏地检查完所有柜子！',
      concept: '列表遍历就是按顺序访问列表中的每一个元素。用 for 循环可以自动完成这个任务，不需要你一个一个去数。',
      syntax: 'for 变量 in 列表:\n    要执行的操作',
      example: {
        title: '遍历打印所有水果',
        code: 'fruits = ["苹果", "香蕉", "橙子"]\nfor fruit in fruits:\n    print(fruit)',
        output: '苹果\n香蕉\n橙子',
        explanation: 'for fruit in fruits 会依次取出列表中的每个元素，每次取一个，然后执行下面的 print(fruit)。'
      },
      practice: [
        {
          question: 'for循环遍历列表时，每次循环处理几个元素？',
          answer: '一个元素'
        },
        {
          question: '遍历后能确保访问到所有元素吗？',
          answer: '能，for循环会访问每个元素'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的机器人更聪明了！它不仅会检查每个柜子，还能告诉你柜子的编号，这样你就能知道每个东西在哪个位置！',
      concept: '遍历时可以用 range(len()) 获取索引，同时得到元素和它的位置。这在需要知道位置或修改元素时很有用。两种遍历方式：for item in list 和 for i in range(len(list))',
      syntax: '# 方式1：直接遍历元素\nfor item in list:\n    print(item)\n\n# 方式2：遍历索引\nfor i in range(len(list)):\n    print(list[i])',
      example: {
        title: '两种遍历方式',
        code: 'scores = [95, 87, 92]\n\n# 方式1：直接打印\nprint("方式1:")\nfor s in scores:\n    print(s)\n\n# 方式2：带索引\nprint("方式2:")\nfor i in range(len(scores)):\n    print("位置" + str(i) + ": " + str(scores[i]))',
        output: '方式1:\n95\n87\n92\n方式2:\n位置0: 95\n位置1: 87\n位置2: 92',
        explanation: '方式1直接获取每个元素值。方式2通过索引访问，可以显示位置信息，还可以修改元素。str()将数字转为字符串进行拼接。'
      },
      practice: [
        {
          question: '两种遍历方式有什么区别？',
          answer: '方式1直接获取元素，方式2获取索引可以访问位置或修改元素'
        },
        {
          question: '遍历过程中可以修改元素吗？',
          answer: '用方式2（索引遍历）可以修改，方式1不行'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '遍历大师模式！你可以在遍历中进行条件判断、数据统计、查找筛选，实现搜索、过滤、聚合等高级算法！',
      concept: '遍历是处理列表的核心操作。在遍历中可以实现：计数求和（sum/count）、查找最大最小（max/min）、条件过滤（filter）、数据转换（map）等。理解遍历模式是掌握算法的基础。',
      syntax: '# 统计遍历\ncount = 0\nfor item in list:\n    if condition:\n        count += 1\n\n# 查找遍历\nfor i in range(len(list)):\n    if condition:\n        print(i, list[i])',
      example: {
        title: '遍历统计和查找',
        code: 'scores = [85, 92, 78, 95, 88]\n\n# 统计90分以上的数量\ncount = 0\nfor s in scores:\n    if s >= 90:\n        count += 1\nprint("90分以上: " + str(count) + "人")\n\n# 找最高分\nmax_score = scores[0]\nfor s in scores:\n    if s > max_score:\n        max_score = s\nprint("最高分: " + str(max_score))',
        output: '90分以上: 2人\n最高分: 95',
        explanation: '第一个循环统计90分以上的人数。第二个循环用"打擂台"方式找最高分：遇到更大的就更新max_score。'
      },
      practice: [
        {
          question: '如何在遍历中统计满足条件的元素数量？',
          answer: '设一个计数器，每次满足条件就加1'
        },
        {
          question: '如何在遍历时同时获取索引和元素值？',
          answer: '用range(len())遍历，如 for i in range(len(list)): 然后用list[i]获取元素'
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
    mathConcept: '位置问题',
    question: '列表 ["红", "黄", "蓝", "绿"] 中，"蓝" 的索引是多少？\n\nA. 2\nB. 3\nC. 4\nD. 1',
    options: [
      'A. 2',
      'B. 3',
      'C. 4',
      'D. 1'
    ],
    answer: 0, // A
    explanation: '这是一个位置问题！\n\n索引从 0 开始计数：\n- 索引 0："红"\n- 索引 1："黄"\n- 索引 2："蓝" ✓\n- 索引 3："绿"\n\n所以"蓝"的索引是 2。\n\n数学知识：注意索引从0开始，不是从1开始！',
    hint: '索引从0开始数，第1个是0，第2个是1，第3个是2...'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '位置问题',
    question: '执行下面的代码，会打印什么？\n\n```python\nfruits = ["苹果", "香蕉", "橙子"]\nprint(fruits[-1])\n```\n\nA. 苹果\nB. 香蕉\nC. 橙子\nD. 报错',
    options: [
      'A. 苹果',
      'B. 香蕉',
      'C. 橙子',
      'D. 报错'
    ],
    answer: 2, // C
    explanation: '这是一个位置问题！\n\nfruits[-1] 使用负索引，-1 表示最后一个元素。\n\n列表：["苹果", "香蕉", "橙子"]\n       -3       -2      -1\n\n所以 fruits[-1] 是"橙子"。\n\n数学知识：负索引从-1开始，从右往左数，-1是最后一个。',
    hint: '负索引-1表示最后一个元素'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '变量计算',
    question: '执行下面的代码，列表会变成什么？\n\n```python\nnumbers = [10, 20, 30]\nnumbers[1] = numbers[0] + numbers[2]\nprint(numbers)\n```\n\nA. [10, 20, 30]\nB. [10, 40, 30]\nC. [40, 20, 30]\nD. [10, 50, 30]',
    options: [
      'A. [10, 20, 30]',
      'B. [10, 40, 30]',
      'C. [40, 20, 30]',
      'D. [10, 50, 30]'
    ],
    answer: 1, // B
    explanation: '这是一个变量计算题！\n\n1. numbers[0] = 10\n2. numbers[2] = 30\n3. numbers[0] + numbers[2] = 10 + 30 = 40\n4. numbers[1] = 40\n\n最终列表：[10, 40, 30]\n\n数学知识：先计算右边的表达式，再赋值给左边位置。',
    hint: 'numbers[0] + numbers[2] = 10 + 30 = ?'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '周期问题',
    question: '循环会执行几次？\n\n```python\nfruits = ["苹果", "香蕉", "橙子", "葡萄"]\nfor fruit in fruits:\n    print(fruit)\n```\n\nA. 3次\nB. 4次\nC. 5次\nD. 1次',
    options: [
      'A. 3次',
      'B. 4次',
      'C. 5次',
      'D. 1次'
    ],
    answer: 1, // B
    explanation: '这是一个计数问题！\n\nfor循环会遍历列表中的每个元素：\n- 第1次循环：fruit = "苹果"\n- 第2次循环：fruit = "香蕉"\n- 第3次循环：fruit = "橙子"\n- 第4次循环：fruit = "葡萄"\n\n列表有4个元素，所以循环执行4次。\n\n数学知识：遍历次数等于列表长度。',
    hint: '数一数列表中有几个元素'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '累加求和',
    question: '执行下面的代码，变量 total 的值是多少？\n\n```python\nnumbers = [1, 2, 3, 4]\ntotal = 0\nfor n in numbers:\n    total = total + n\nprint(total)\n```\n\nA. 4\nB. 10\nC. 1\nD. 9',
    options: [
      'A. 4',
      'B. 10',
      'C. 1',
      'D. 9'
    ],
    answer: 1, // B
    explanation: '这是一个累加求和问题！\n\n跟踪变量变化：\n- 初始：total = 0\n- 第1次：total = 0 + 1 = 1\n- 第2次：total = 1 + 2 = 3\n- 第3次：total = 3 + 3 = 6\n- 第4次：total = 6 + 4 = 10\n\n最终 total = 10\n\n数学知识：这是求和算法，total = 1 + 2 + 3 + 4 = 10',
    hint: '1 + 2 + 3 + 4 = ?'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '变量计算',
    question: '执行下面的代码，打印结果是什么？\n\n```python\nnumbers = [5, 10, 15]\nfor i in range(len(numbers)):\n    numbers[i] = numbers[i] + 5\nprint(numbers)\n```\n\nA. [5, 10, 15]\nB. [10, 15, 20]\nC. [0, 5, 10]\nD. [10, 10, 10]',
    options: [
      'A. [5, 10, 15]',
      'B. [10, 15, 20]',
      'C. [0, 5, 10]',
      'D. [10, 10, 10]'
    ],
    answer: 1, // B
    explanation: '这是一个遍历修改问题！\n\nlen(numbers) = 3，所以 range(3) 产生 0, 1, 2\n\n- i=0: numbers[0] = 5 + 5 = 10\n- i=1: numbers[1] = 10 + 5 = 15\n- i=2: numbers[2] = 15 + 5 = 20\n\n最终列表：[10, 15, 20]\n\n数学知识：每个元素都加5，相当于整体平移加5。',
    hint: '每个元素都加5，5+5=10, 10+5=15, 15+5=20'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L6-2',
  title: '列表操作',
  subtitle: '学会列表索引和遍历',
  difficulty: '进阶',
  estimatedTime: '35-45分钟',
  learningGoals: [
    '理解列表索引的概念',
    '学会用索引访问和修改元素',
    '掌握 for 循环遍历列表',
    '了解正索引和负索引的区别'
  ],
  prerequisites: [
    '掌握列表的基本创建',
    '了解 for 循环的基本用法',
    '理解变量和赋值'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['index', 'loop', 'for', 'in'],
  medium: ['defend', 'height', 'family'],
  hard: ['random', 'iterate', 'modify']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'fruits = ["苹果", "香蕉"]',
    'print(fruits[0])',
    'fruits[1] = "橙子"',
    'for f in fruits:',
    'print(f)',
    'print(len(fruits))'
  ],
  medium: [
    'scores = [95, 87, 92]\nprint(scores[0])',
    'scores[1] = 98\nprint(scores)',
    'for s in scores:\n    print(s)',
    'fruits = ["苹果", "香蕉"]\nprint(fruits[-1])',
    'colors = ["红", "黄", "蓝"]\nfor c in colors:'
  ],
  hard: [
    'numbers = [1, 2, 3]\nfor i in range(len(numbers)):\n    print(numbers[i])',
    'scores = [85, 90, 88]\nfor i in range(len(scores)):\n    scores[i] = scores[i] + 5',
    'fruits = ["苹果", "香蕉", "橙子"]\nfor fruit in fruits:\n    print(fruit)',
    'numbers = [1, 2, 3, 4]\ntotal = 0\nfor n in numbers:\n    total = total + n',
    'scores = [95, 87, 92]\nmax_score = scores[0]\nfor s in scores:'
  ]
}

// 导出所有数据
export const L6_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L6_2_data
