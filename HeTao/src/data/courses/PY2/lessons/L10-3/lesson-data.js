/**
 * PY2 课程 L10-3: 丛林迷踪
 *
 * 核心知识点:
 * 1. 修改二维列表的某一行或某一列
 * 2. 列表乘法（创建重复元素的列表）
 * 3. 二维列表的综合应用
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'animal',
    pronunciation: '[a-ni-mal]',
    partOfSpeech: 'n.',
    meaning: '动物；牲畜',
    level: 'easy',
    example: 'The elephant is a large animal.',
    exampleTranslation: '大象是一种大型动物。'
  },
  {
    word: 'import',
    pronunciation: '[im-port]',
    partOfSpeech: 'v.',
    meaning: '进口；导入',
    level: 'medium',
    example: 'We import tea from China.',
    exampleTranslation: '我们从中国进口茶叶。'
  },
  {
    word: 'random',
    pronunciation: '[ran-dom]',
    partOfSpeech: 'adj.',
    meaning: '随机的，随意的',
    level: 'medium',
    example: 'Pick a random number from 1 to 10.',
    exampleTranslation: '从1到10中随机选一个数字。'
  },
  {
    word: 'score',
    pronunciation: '[sko:r]',
    partOfSpeech: 'n.',
    meaning: '成绩；比分；总谱',
    level: 'hard',
    example: 'What was your score in the test?',
    exampleTranslation: '你考试得了多少分？'
  },
  // 拓展单词
  {
    word: 'maze',
    pronunciation: '[meiz]',
    partOfSpeech: 'n.',
    meaning: '迷宫；迷惑',
    level: 'medium',
    example: 'Find your way out of the maze.',
    exampleTranslation: '找到走出迷宫的路。'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '批量变身 - 修改某一列',
    emoji: '🔄',
    gradeLevel: '1-2',
    summary: '用循环可以把二维列表的某一列全部改掉',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你在给全班同学换新校服。可以一个一个换，但也可以一次性把所有同学的校服都换成新的！',
      concept: '修改某一列需要遍历所有行，固定列索引，对每一行的那个位置进行修改。',
      syntax: 'for i in range(行数):\n    列表[i][列索引] = 新值',
      example: {
        title: '换装游戏',
        code: '# 角色列表：[名字, 服装, 武器]\ncharacters = [\n    ["小明", "T恤", "剑"],\n    ["小红", "裙子", "杖"],\n    ["小刚", "T恤", "弓"]\n]\n# 把所有人的服装换成"铠甲"\nfor i in range(3):\n    characters[i][1] = "铠甲"\n\nfor char in characters:\n    print(char)',
        output: "['小明', '铠甲', '剑']\n['小红', '铠甲', '杖']\n['小刚', '铠甲', '弓']",
        explanation: '用循环遍历所有角色，固定索引1（服装列），把所有人的服装都改成"铠甲"。'
      },
      practice: [
        {
          question: '修改某一列时，哪个索引是固定的？',
          answer: '列索引是固定的'
        },
        {
          question: '哪个索引是变化的？',
          answer: '行索引是变化的（用循环变量i）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '在游戏中，你可能给所有敌人增加血量，或者给所有玩家添加buff。批量修改某一列就是这样的操作！',
      concept: '批量修改列是数据处理中的常见操作，如数据清洗、格式转换、统计调整等。理解列修改模式是高效处理表格数据的基础。',
      syntax: '# 批量修改列的通用模式\nfor i in range(len(列表)):\n    if 条件:\n        列表[i][列索引] = 新值',
      example: {
        title: '成绩调整',
        code: '# 成绩表：[名字, 语文, 数学]\nscores = [\n    ["小明", 85, 90],\n    ["小红", 92, 88],\n    ["小刚", 78, 95]\n]\n# 数学成绩每人加5分\nfor i in range(len(scores)):\n    scores[i][2] += 5\n\nprint("调整后的成绩:")\nfor s in scores:\n    print(f"{s[0]}: 语文{s[1]}, 数学{s[2]}")',
        output: "调整后的成绩:\n小明: 语文85, 数学95\n小红: 语文92, 数学93\n小刚: 语文78, 数学100",
        explanation: '用循环遍历所有学生，固定索引2（数学成绩），每人都加5分。这是批量调整数据的典型应用。'
      },
      practice: [
        {
          question: 'len(列表)在循环中起什么作用？',
          answer: '确定循环次数，等于行数'
        },
        {
          question: '如何只修改符合条件的行的某一列？',
          answer: '在循环中加入if判断'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '数据清洗的核心操作！在实际的数据处理中，经常需要对某一列进行批量修改、格式转换或数据清洗。',
      concept: '列操作是数据库和数据科学的基础。Python的pandas库提供了更强大的列操作能力，但其核心思想与这里的基础操作一致。',
      syntax: '# 高级列操作模式\nfor i in range(len(列表)):\n    列表[i][列索引] = 转换函数(列表[i][列索引])',
      example: {
        title: '数据清洗',
        code: '# 原始数据包含空值和错误格式\ndata = [\n    ["A", "100", "正常"],\n    ["B", "", "缺失"],\n    ["C", "N/A", "错误"],\n    ["D", "95", "正常"]\n]\n# 清洗第二列：空值设为0，非数字设为-1\nfor i in range(len(data)):\n    val = data[i][1]\n    if val == "":\n        data[i][1] = 0\n    elif val == "N/A":\n        data[i][1] = -1\n    else:\n        data[i][1] = int(val)\n\nfor row in data:\n    print(row)',
        output: "['A', 100, '正常']\n['B', 0, '缺失']\n['C', -1, '错误']\n['D', 95, '正常']",
        explanation: '这是实际数据清洗的简化版本：检测并处理各种异常值，将数据转换为正确的类型。'
      },
      practice: [
        {
          question: '数据清洗中常见的异常值有哪些？',
          answer: '空值、缺失值、格式错误、超出范围等'
        },
        {
          question: '为什么数据清洗很重要？',
          answer: '脏数据会导致分析错误、程序崩溃或结果不准确'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '复制魔法 - 列表乘法',
    emoji: '✖️',
    gradeLevel: '1-2',
    summary: '用列表乘数字可以快速创建重复元素的列表',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一张纸，用复印机复印5次，就能得到6张同样的纸。列表乘法就是这样——把一个列表复制多份！',
      concept: '列表乘以数字n，会把列表中的元素重复n次，生成一个新列表。这是快速创建重复元素列表的简便方法。',
      syntax: '新列表 = 旧列表 * 数字',
      example: {
        title: '创建相同元素',
        code: '# 创建一个包含5个0的列表\nzeros = [0] * 5\nprint(zeros)\n\n# 创建一个包含3个"你好"的列表\nhellos = ["你好"] * 3\nprint(hellos)',
        output: '[0, 0, 0, 0, 0]\n["你好", "你好", "你好"]',
        explanation: '[0]*5把0重复5次，得到5个0的列表。["你好"]*3把"你好"重复3次。'
      },
      practice: [
        {
          question: '[1] * 4会得到什么？',
          answer: '[1, 1, 1, 1]'
        },
        {
          question: '列表乘法会改变原列表吗？',
          answer: '不会，它创建一个新列表'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '在游戏中，你可能需要初始化一个游戏地图，所有格子初始都是空的。用列表乘法可以快速创建这样的地图！',
      concept: '列表乘法是初始化数据结构的常用方法。可以快速创建特定大小的零矩阵、空数组等，为后续操作准备数据容器。',
      syntax: '# 创建n行m列的二维列表\nmatrix = [[0] * m for _ in range(n)]',
      example: {
        title: '初始化游戏地图',
        code: '# 创建一个4x4的地图，0表示空地\nmap_size = 4\ngame_map = [[0] * map_size for _ in range(map_size)]\n\nprint("初始地图:")\nfor row in game_map:\n    print(row)\n\n# 在中心位置放置宝藏（用1表示）\ncenter = map_size // 2\ngame_map[center][center] = 1\n\nprint("\\n放置宝藏后:")\nfor row in game_map:\n    print(row)',
        output: "初始地图:\n[0, 0, 0, 0]\n[0, 0, 0, 0]\n[0, 0, 0, 0]\n[0, 0, 0, 0]\n\n放置宝藏后:\n[0, 0, 0, 0]\n[0, 0, 0, 0]\n[0, 0, 1, 0]\n[0, 0, 0, 0]",
        explanation: '用[[0] * 4 for _ in range(4)]创建4x4的全零矩阵。注意要用列表推导式，如果用[[0]*4]*4会有问题（共享引用）。'
      },
      practice: [
        {
          question: '如何创建5个5的二维列表？',
          answer: '[[0] * 5 for _ in range(5)]'
        },
        {
          question: '为什么不用[[0]*5]*5创建二维列表？',
          answer: '因为5个子列表会共享同一个引用，修改一个会影响全部'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '高效初始化的技巧！列表乘法和列表推导式结合，可以优雅地创建各种数据结构。',
      concept: '列表乘法是Python特有的简洁语法，体现了Python的优雅风格。理解其工作原理和注意事项（如共享引用问题），是编写高效代码的基础。',
      syntax: '# 安全创建二维列表\nmatrix = [值.copy() for _ in range(n)]\n\n# 或使用推导式\nmatrix = [[初始值 for _ in range(m)] for _ in range(n)]',
      example: {
        title: '高级初始化技巧',
        code: '# 创建不同模式的二维列表\n\n# 1. 全零矩阵3x4\nzeros = [[0] * 4 for _ in range(3)]\nprint("全零矩阵:")\nfor row in zeros:\n    print(row)\n\n# 2. 单位矩阵（对角线为1）\nsize = 3\nidentity = [[0] * size for _ in range(size)]\nfor i in range(size):\n    identity[i][i] = 1\nprint("\\n单位矩阵:")\nfor row in identity:\n    print(row)\n\n# 3. 上三角矩阵\nupper = [[0] * size for _ in range(size)]\nfor i in range(size):\n    for j in range(i, size):\n        upper[i][j] = 1\nprint("\\n上三角矩阵:")\nfor row in upper:\n    print(row)',
        output: "全零矩阵:\n[0, 0, 0, 0]\n[0, 0, 0, 0]\n[0, 0, 0, 0]\n\n单位矩阵:\n[1, 0, 0]\n[0, 1, 0]\n[0, 0, 1]\n\n上三角矩阵:\n[1, 1, 1]\n[0, 1, 1]\n[0, 0, 1]",
        explanation: '这些是矩阵初始化的经典模式。单位矩阵是线性代数的基础，上三角矩阵在算法中有广泛应用。'
      },
      practice: [
        {
          question: '单位矩阵有什么特点？',
          answer: '主对角线为1，其余为0，是矩阵乘法的单位元'
        },
        {
          question: '如何创建下三角矩阵？',
          answer: '内层循环从0到i（含），for j in range(i+1)'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '实战应用 - 二维列表游戏',
    emoji: '🎮',
    gradeLevel: '1-2',
    summary: '用二维列表做一个简单的小游戏',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '我们来做一个种菜游戏！用0表示空地，1表示有菜。可以在二维列表上种菜、收菜、计分！',
      concept: '二维列表非常适合表示游戏地图。每个位置可以存储不同的状态，通过修改这些状态来实现游戏逻辑。',
      syntax: '# 游戏状态表示\n0 = 空地\n1 = 有菜\n\n# 种菜\nmap[行][列] = 1',
      example: {
        title: '简单种菜游戏',
        code: '# 3x3的土地\nland = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]\n\nprint("初始土地:")\nfor row in land:\n    print(row)\n\n# 在(1,1)位置种菜\nland[1][1] = 1\nprint("\\n种菜后:")\nfor row in land:\n    print(row)\n\n# 数一数有几块地有菜\ncount = 0\nfor row in land:\n    for plot in row:\n        if plot == 1:\n            count += 1\nprint(f"\\n共有{count}块地有菜")',
        output: "初始土地:\n[0, 0, 0]\n[0, 0, 0]\n[0, 0, 0]\n\n种菜后:\n[0, 0, 0]\n[0, 1, 0]\n[0, 0, 0]\n\n共有1块地有菜",
        explanation: '用0和1表示土地状态，通过修改二维列表的值来实现游戏逻辑，用循环统计游戏状态。'
      },
      practice: [
        {
          question: '游戏中的0和1代表什么？',
          answer: '0表示空地，1表示有菜'
        },
        {
          question: '怎么统计有多少块地有菜？',
          answer: '用双层循环遍历，统计值为1的个数'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '扩展我们的种菜游戏！可以随机种菜、收菜得分、显示漂亮的地图。游戏会越来越好玩！',
      concept: '随着游戏逻辑的复杂化，二维列表的数据管理变得更加重要。需要合理设计数据结构，处理用户输入，实现游戏规则。',
      syntax: '# 随机种菜\nimport random\nrow = random.randint(0, 行数-1)\ncol = random.randint(0, 列数-1)\nmap[row][col] = 1',
      example: {
        title: '随机种菜游戏',
        code: 'import random\n\n# 4x4的土地\nland = [[0] * 4 for _ in range(4)]\n\n# 随机种5棵菜\nfor _ in range(5):\n    row = random.randint(0, 3)\n    col = random.randint(0, 3)\n    land[row][col] = 1\n\nprint("土地状态:")\nprint("  0 1 2 3")\nfor i in range(len(land)):\n    # 用emoji美化显示\n    display = ["🌱" if x == 1 else "⬜" for x in land[i]]\n    print(f"{i} " + " ".join(display))',
        output: '土地状态:\n  0 1 2 3\n0 ⬜ ⬜ 🌱 ⬜\n1 ⬜ 🌱 ⬜ ⬜\n2 ⬜ ⬜ ⬜ 🌱\n3 🌱 ⬜ ⬜ ⬜（每次运行结果不同）',
        explanation: '用random模块生成随机位置，用emoji美化显示，让游戏更加生动有趣。'
      },
      practice: [
        {
          question: 'random.randint(0, 3)会产生什么数字？',
          answer: '会产生0到3之间的随机整数（包括0和3）'
        },
        {
          question: 'range(len(land))有什么用？',
          answer: '生成0到列表长度-1的索引范围，方便访问每个元素'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '完整的游戏开发！使用二维列表、随机数、用户输入，可以开发出有趣的小游戏。这是游戏开发的入门！',
      concept: '游戏开发是综合性编程项目，需要运用数据结构、算法、用户交互、随机系统等多种技术。二维列表是2D游戏的基础数据结构。',
      syntax: '# 游戏主循环模式\nwhile 游戏进行中:\n    处理用户输入\n    更新游戏状态\n    显示游戏画面\n    检查游戏结束',
      example: {
        title: '记忆翻牌游戏框架',
        code: '# 简化的记忆翻牌游戏\nimport random\n\n# 4x4的牌面，用数字对表示\ncards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]\nrandom.shuffle(cards)\n\n# 分配到4x4网格\nboard = []\nfor i in range(0, 16, 4):\n    board.append(cards[i:i+4])\n\n# 显示牌面（隐藏状态）\nprint("记忆翻牌游戏 - 牌面分布:")\nfor row in board:\n    print(row)\n\nprint("\\n游戏规则: 输入行列坐标翻牌，找出相同的数字对")\n# 实际游戏需要实现翻牌、匹配、计分等逻辑',
        output: '记忆翻牌游戏 - 牌面分布:\n[3, 7, 2, 5]\n[1, 4, 8, 6]\n[5, 2, 3, 7]\n[8, 4, 6, 1]（每次运行结果不同）\n\n游戏规则: 输入行列坐标翻牌，找出相同的数字对',
        explanation: '这是记忆翻牌游戏的核心数据结构设计。用二维列表表示牌面，用随机数洗牌，通过索引访问进行游戏操作。'
      },
      practice: [
        {
          question: '游戏开发中需要哪些核心组件？',
          answer: '数据结构、游戏逻辑、用户界面、输入处理、状态管理等'
        },
        {
          question: '如何判断游戏是否结束？',
          answer: '检查是否所有牌都被匹配，或达到特定条件'
        }
      ]
    }
  }
]

// 习题数据（编程 × 数学融合）
export const exercises = [
  // 🟢 基础题（1-2年级）
  {
    id: 'ex-1',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '规律',
    question: '横线上填写什么，能把列表a中第二列的所有数字都变成11？\n\n```python\na = [[1, 5], [2, 5], [3, 5]]\nfor i in range(3):\n    a[i][1] = 11\nprint(a)\n```',
    options: [
      'a[i][1] = 11',
      'a[i][1] += 11',
      'a[1][i] = 11',
      'a[1][i] += 11'
    ],
    answer: 0, // A
    explanation: '同一列元素，第一个索引依次增大（用i），第二个索引相同（固定为1），所以用a[i][1] = 11。\n\n数学知识：这是批量修改数据，把所有行的某列统一改为同一个值。',
    hint: '第一个索引用循环变量i，第二个索引固定为1'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '乘法',
    question: '[2] * 5 可以得到列表？\n\n```python\nresult = [2] * 5\nprint(result)\n```',
    options: [
      '[2, 5]',
      '[5, 5]',
      '[2, 2, 2, 2, 2]',
      '[5, 5, 5, 5, 5]'
    ],
    answer: 2, // C
    explanation: '[2] * 5 把列表[2]重复5次，得到[2, 2, 2, 2, 2]。\n\n数学知识：这是重复的概念，就像写5个2。',
    hint: '列表乘法把列表中的元素重复n次'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '位置',
    question: '列表中0表示土地上没菜，1表示有菜。根据下面的列表，哪些位置会有菜？\n\n```python\nland = [\n    [0, 1, 0],\n    [0, 0, 1],\n    [1, 0, 0]\n]\nfor i in range(3):\n    for j in range(3):\n        if land[i][j] == 1:\n            print(f"位置({i},{j})有菜")\n```',
    options: [
      '位置(0,0), (1,1), (2,0)',
      '位置(0,1), (1,2), (2,0)',
      '位置(0,1), (1,0), (2,1)',
      '位置(1,1), (1,2), (2,0)'
    ],
    answer: 1, // B
    explanation: '检查值为1的位置：land[0][1]=1，land[1][2]=1，land[2][0]=1。\n\n数学知识：这是坐标定位，(行, 列)确定唯一位置。',
    hint: '值为1的位置就是有菜的位置'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '累加',
    question: '执行下方代码，输出结果是？\n\n```python\nmatrix = [[1, 2], [3, 4], [5, 6]]\nsum = 0\nfor i in range(3):\n    sum += matrix[i][0]\nprint(sum)\n```',
    options: [
      '6',
      '9',
      '12',
      '15'
    ],
    answer: 1, // B
    explanation: 'matrix[i][0]取每行的第一个元素：1+3+5=9。\n\n数学知识：等差数列求和，1,3,5是公差为2的等差数列。',
    hint: 'matrix[i][0]表示每行的第一个元素'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合应用',
    question: '用列表乘法创建一个3x3的全零矩阵，然后把对角线元素改成1。最终矩阵是什么？\n\n```python\nmatrix = [[0] * 3 for _ in range(3)]\nfor i in range(3):\n    matrix[i][i] = 1\nfor row in matrix:\n    print(row)\n```',
    options: [
      '[1, 0, 0], [0, 1, 0], [0, 0, 1]',
      '[0, 0, 0], [0, 0, 0], [0, 0, 0]',
      '[1, 1, 1], [1, 1, 1], [1, 1, 1]',
      '[0, 0, 1], [0, 1, 0], [1, 0, 0]'
    ],
    answer: 0, // A
    explanation: '先创建3x3全零矩阵，然后把(0,0), (1,1), (2,2)设为1，得到单位矩阵。\n\n数学知识：单位矩阵是线性代数的重要概念，主对角线为1，其余为0。',
    hint: 'matrix[i][i]表示主对角线上的元素'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '最值',
    question: '找出矩阵中第二列的最大值：\n\n```python\nmatrix = [\n    [5, 2, 8],\n    [3, 9, 1],\n    [7, 4, 6]\n]\nmax_val = matrix[0][1]\nfor i in range(3):\n    if matrix[i][1] > max_val:\n        max_val = matrix[i][1]\nprint(max_val)\n```',
    options: [
      '2',
      '4',
      '9',
      '6'
    ],
    answer: 2, // C
    explanation: '第二列的元素是2, 9, 4。最大值是9。\n\n数学知识：在一组数中找最大值需要遍历所有元素进行比较。',
    hint: 'matrix[i][1]表示第二列的元素'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L10-3',
  title: '丛林迷踪',
  subtitle: '修改二维列表元素与列表乘法',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '学会修改二维列表的某一行或某一列',
    '掌握列表乘法的使用方法',
    '理解二维列表在游戏中的应用',
    '能够用编程解决矩阵和表格相关问题'
  ],
  prerequisites: [
    'Python基础语法',
    'for循环',
    '二维列表基础',
    '列表操作'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['modify', 'change', 'multiply', 'game'],
  medium: ['element', 'position', 'matrix', 'random'],
  hard: ['initialize', 'transformation', 'coordinate', 'algorithm']
}

// 代码模板（打字练习用）
export const typingTemplates = {
  easy: [
    'list[i][1] = 11',
    'zeros = [0] * 5',
    'for row in matrix:\n    print(row)'
  ],
  medium: [
    'for i in range(len(matrix)):\n    matrix[i][1] = new_value',
    'matrix = [[0] * n for _ in range(n)]',
    'import random'
  ],
  hard: [
    'for i in range(len(matrix)):\n    for j in range(len(matrix[i])):\n        matrix[i][j] = value',
    'matrix = [[0] * cols for _ in range(rows)]',
    'if matrix[i][j] == target: found = True'
  ]
}

// 导出所有数据
export const L10_3_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L10_3_data
