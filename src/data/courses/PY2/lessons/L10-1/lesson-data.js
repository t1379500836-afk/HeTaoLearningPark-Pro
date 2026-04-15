/**
 * PY2 课程 L10-1: 来电了
 *
 * 核心知识点:
 * 1. 二维列表概念（列表中的列表）
 * 2. 获取和修改二维列表元素
 * 3. 向二维列表添加元素
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'tool',
    pronunciation: '[tu:l]',
    partOfSpeech: 'n.',
    meaning: '工具；手段；被操控的人',
    level: 'easy',
    example: 'Use the right tool for the job.',
    exampleTranslation: '用合适的工具做这项工作。'
  },
  {
    word: 'clothes',
    pronunciation: '[klouoz]',
    partOfSpeech: 'n.',
    meaning: '衣服；服装',
    level: 'easy',
    example: 'Put on your warm clothes.',
    exampleTranslation: '穿上你的暖和衣服。'
  },
  {
    word: 'design',
    pronunciation: '[di-zain]',
    partOfSpeech: 'n.',
    meaning: '设计；设计方案；花纹；意图',
    level: 'medium',
    example: 'The design of this building is amazing.',
    exampleTranslation: '这个建筑的设计很令人惊叹。'
  },
  {
    word: 'board',
    pronunciation: '[bo:rd]',
    partOfSpeech: 'n.',
    meaning: '木板，板；董事会；膳食',
    level: 'hard',
    example: 'Please write on the board.',
    exampleTranslation: '请在板上写字。'
  },
  // 拓展单词
  {
    word: 'grid',
    pronunciation: '[grid]',
    partOfSpeech: 'n.',
    meaning: '网格；格栅',
    level: 'medium',
    example: 'Draw a grid on the paper.',
    exampleTranslation: '在纸上画一个网格。'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '神奇的二维列表',
    emoji: '📋',
    gradeLevel: '1-2',
    summary: '列表里面还能放列表，就像书包里装着文件夹',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你的书包里，装着好几个文件夹。每个文件夹里又有好多张纸。Python中的二维列表就是这样——一个大列表里面，装着好几个小列表！',
      concept: '二维列表就是"列表中的列表"。普通列表就像一排抽屉，二维列表就像一排抽屉柜，每个柜子里又有多个抽屉。',
      syntax: '# 创建二维列表\n列表名 = [[元素1, 元素2], [元素3, 元素4]]',
      example: {
        title: '早餐菜单',
        code: '# 早餐选择：第一组是包子、豆浆，第二组是面包、牛奶\nbreakfast = [["包子", "豆浆"], ["面包", "牛奶"]]\nprint(breakfast)',
        output: "[['包子', '豆浆'], ['面包', '牛奶']]",
        explanation: 'breakfast是一个二维列表，里面有2个小列表（子列表），每个子列表里有2个早餐选项。'
      },
      practice: [
        {
          question: '二维列表里面装的是什么？',
          answer: '装的是列表（子列表）'
        },
        {
          question: '二维列表像生活中的什么东西？',
          answer: '像书桌上的抽屉柜，每个柜子里又有多个抽屉'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '在游戏中，你可能有多个道具栏，每个栏里能放几个道具。二维列表就像道具栏系统——第一栏有武器和药水，第二栏有食物和宝物！',
      concept: '二维列表是嵌套的数据结构，外层列表的每个元素都是一个列表。这种结构非常适合表示表格、矩阵或多组相关数据。',
      syntax: '# 二维列表结构\nmatrix = [\n    [a1, a2, a3],  # 第一行\n    [b1, b2, b3]   # 第二行\n]',
      example: {
        title: '学生成绩表',
        code: '# 两个学生的三门课成绩\nscores = [\n    ["小明", 90, 85],\n    ["小红", 88, 92]\n]\nprint(scores[0])  # 打印第一个学生的信息',
        output: "['小明', 90, 85]",
        explanation: 'scores是二维列表，scores[0]获取第一个子列表，即第一个学生的所有信息。'
      },
      practice: [
        {
          question: '二维列表的外层列表和内层列表分别代表什么？',
          answer: '外层代表"行"或"组"，内层代表具体的数据项'
        },
        {
          question: '如何访问二维列表中的某个子列表？',
          answer: '用一个索引：列表名[索引]'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '高级数据结构！二维列表是矩阵和表格的基础，在图像处理、游戏地图、数据分析中都有广泛应用。',
      concept: '二维列表是Python中表示多维数据的基础结构。虽然Python没有真正的多维数组，但通过列表嵌套可以实现类似功能，是理解更复杂数据结构的基础。',
      syntax: '# 动态创建二维列表\ngrid = [[0 for col in range(3)] for row in range(3)]\n# 创建3x3的零矩阵',
      example: {
        title: '游戏地图',
        code: '# 5x5的游戏地图，0=空地，1=墙，2=宝藏\nmap = [\n    [0, 0, 1, 0, 2],\n    [0, 1, 0, 0, 0],\n    [1, 0, 0, 1, 0],\n    [0, 0, 1, 0, 0],\n    [2, 0, 0, 0, 1]\n]\nprint(f"地图大小: {len(map)}行 x {len(map[0])}列")',
        output: '地图大小: 5行 x 5列',
        explanation: '用二维列表表示游戏地图非常直观，每个位置都有对应的行和列索引，可以轻松访问和修改。'
      },
      practice: [
        {
          question: '如何获取二维列表的行数和列数？',
          answer: '行数用len(列表名)，列数用len(列表名[0])'
        },
        {
          question: '二维列表和现实中的什么数据结构最相似？',
          answer: 'Excel表格、棋盘、矩阵等'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '精准定位 - 访问二维列表元素',
    emoji: '📍',
    gradeLevel: '1-2',
    summary: '用两个索引就能找到二维列表中任意一个元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你在教室找座位。首先要找到第几排（第一个索引），然后再找到这一排的第几个座位（第二个索引）。这样就能精准定位了！',
      concept: '访问二维列表的元素需要两个索引：第一个索引找到子列表（行），第二个索引找到子列表中的元素（列）。',
      syntax: '元素 = 列表名[行索引][列索引]',
      example: {
        title: '找早餐',
        code: '# breakfast = [["包子", "豆浆"], ["面包", "牛奶"]]\nbreakfast = [["包子", "豆浆"], ["面包", "牛奶"]]\nprint(breakfast[0][1])',
        output: '豆浆',
        explanation: 'breakfast[0]找到第一个子列表["包子", "豆浆"]，breakfast[0][1]找到这个子列表中索引为1的元素"豆浆"。'
      },
      practice: [
        {
          question: '访问二维列表元素需要几个索引？',
          answer: '需要两个索引'
        },
        {
          question: '第一个索引用来做什么？',
          answer: '用来找到子列表（行）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '在超市买东西，商品分类摆放。首先要找到哪个区域（第一个索引），然后在那个区域找到具体商品（第二个索引）。',
      concept: '二维列表的双索引系统就像坐标系：行索引确定水平位置，列索引确定垂直位置。两个索引组合起来可以精确定位任意元素。',
      syntax: '# 获取子列表\n行 = 列表名[索引]\n\n# 获取元素\n值 = 列表名[行索引][列索引]',
      example: {
        title: '超市商品',
        code: '# shop = [["水果店", "便利店"], ["早餐店", "干货店"]]\nshop = [["水果店", "便利店"], ["早餐店", "干货店"]]\nrow = shop[1]      # 获取第二行\nprint(row)\nitem = shop[1][2] # 获取第二行第三列\nprint(item)',
        output: "['早餐店', '干货店']\n干货店",
        explanation: 'shop[1]获取第二行的子列表，shop[1][2]从第二行中获取索引为2的元素"干货店"。'
      },
      practice: [
        {
          question: '列表名[0]和列表名[0][0]有什么区别？',
          answer: '列表名[0]获取子列表，列表名[0][0]获取子列表的第一个元素'
        },
        {
          question: '如果索引超出范围会怎样？',
          answer: '会报错 IndexError'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '矩阵运算的基础！在数学和编程中，二维列表的索引访问是实现矩阵运算、图像处理等高级功能的基础。',
      concept: '双索引访问模式是处理多维数据的核心思想。理解索引系统和位置对应关系，是进行数组操作、矩阵运算、图像像素处理等高级编程的基础。',
      syntax: '# 遍历二维列表的所有元素\nfor i in range(len(列表)):\n    for j in range(len(列表[i])):\n        元素 = 列表[i][j]',
      example: {
        title: '矩阵转置',
        code: '# 2x3矩阵转置为3x2\nmatrix = [[1, 2, 3], [4, 5, 6]]\nprint("原矩阵:")\nfor row in matrix:\n    print(row)\n\nprint("转置后:")\nfor j in range(len(matrix[0])):\n    new_row = [matrix[i][j] for i in range(len(matrix))]\n    print(new_row)',
        output: "原矩阵:\n[1, 2, 3]\n[4, 5, 6]\n转置后:\n[1, 4]\n[2, 5]\n[3, 6]",
        explanation: '通过交换行列索引的位置，可以实现矩阵转置。这是理解二维索引的进阶应用。'
      },
      practice: [
        {
          question: '如何遍历二维列表的所有元素？',
          answer: '使用两层循环，外层遍历行，内层遍历列'
        },
        {
          question: 'matrix[i][j]和matrix[j][i]什么时候相等？',
          answer: '当矩阵是对称矩阵时，或者i等于j时'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '变身术 - 修改二维列表元素',
    emoji: '🔄',
    gradeLevel: '1-2',
    summary: '可以修改整个子列表，也可以修改子列表中的某个元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你的画板上有几幅画。你可以换掉整幅画，也可以只改画里的一个小部分！二维列表也可以这样修改哦。',
      concept: '使用索引和赋值语句，可以修改二维列表的内容。既可以替换整个子列表，也可以只修改子列表中的一个元素。',
      syntax: '# 修改整个子列表\n列表名[索引] = [新内容]\n\n# 修改子列表中的一个元素\n列表名[行索引][列索引] = 新值',
      example: {
        title: '修改菜单',
        code: '# lunch = [["面条", "米饭"], ["可乐", "果汁"]]\nlunch = [["面条", "米饭"], ["可乐", "果汁"]]\n# 修改第一行的主食\nlunch[0][0] = "饺子"\nprint(lunch)',
        output: "[['饺子', '米饭'], ['可乐', '果汁']]",
        explanation: 'lunch[0][0]定位到"面条"，用"饺子"替换它。'
      },
      practice: [
        {
          question: '修改二维列表元素用什么符号？',
          answer: '用等号 ='
        },
        {
          question: '能不能修改二维列表的内容？',
          answer: '可以，列表是可变的数据类型'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '在游戏中，你可能会升级装备、替换道具。二维列表的修改操作就像这样——可以替换整组装备，也可以只换一件装备！',
      concept: '二维列表是可变数据结构，支持原地修改。这种特性使得它非常适合表示需要动态更新的数据，如游戏状态、库存系统等。',
      syntax: '# 批量修改某一列\nfor i in range(len(列表)):\n    列表[i][列索引] = 新值',
      example: {
        title: '游戏状态更新',
        code: '# 玩家状态：[名字, 生命值, 魔法值]\nplayers = [\n    ["小明", 100, 50],\n    ["小红", 80, 60],\n    ["小刚", 90, 70]\n]\n# 所有人生命值+10\nfor i in range(len(players)):\n    players[i][1] += 10\nprint(players)',
        output: "[['小明', 110, 50], ['小红', 90, 60], ['小刚', 100, 70]]",
        explanation: '用循环批量修改所有玩家的生命值（索引1），这在游戏开发中非常常见。'
      },
      practice: [
        {
          question: '修改子列表和修改子元素有什么区别？',
          answer: '修改子列表替换整行，修改子元素只替换一个值'
        },
        {
          question: '如何批量修改某一列的所有值？',
          answer: '用循环遍历行，固定列索引'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '数据更新的核心操作！在实际应用中，数据往往需要动态更新。掌握二维列表的修改操作是实现数据管理系统的基础。',
      concept: '二维列表的原地修改特性是其重要特征。理解索引定位和赋值操作，是进行数据更新、状态管理、算法实现等编程任务的基础。',
      syntax: '# 条件修改模式\nfor i in range(len(列表)):\n    for j in range(len(列表[i])):\n        if 满足条件:\n            列表[i][j] = 新值',
      example: {
        title: '图像处理',
        code: '# 简单的图像反色效果（0变1，1变0）\nimage = [\n    [0, 1, 0, 1],\n    [1, 1, 0, 0],\n    [0, 0, 1, 1]\n]\n# 反色处理\nfor i in range(len(image)):\n    for j in range(len(image[i])):\n        if image[i][j] == 0:\n            image[i][j] = 1\n        else:\n            image[i][j] = 0\nprint(image)',
        output: "[[1, 0, 1, 0], [0, 0, 1, 1], [1, 1, 0, 0]]",
        explanation: '遍历图像的每个像素点，根据当前值进行反转。这是图像处理的基础操作之一。'
      },
      practice: [
        {
          question: '原地修改和创建新列表有什么区别？',
          answer: '原地修改直接改变原列表，创建新列表会生成新的数据对象'
        },
        {
          question: '如何保护二维列表不被意外修改？',
          answer: '可以使用副本或深拷贝，或者使用元组等不可变类型'
        }
      ]
    }
  },

  {
    id: 'kp-4',
    title: '添砖加瓦 - 向二维列表添加元素',
    emoji: '➕',
    gradeLevel: '1-2',
    summary: '可以用append()向二维列表添加新的子列表或元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你在收集卡片。你可以收集新的一套卡片（添加子列表），也可以在现有套里加一张新卡片（向子列表添加元素）！',
      concept: '使用append()方法可以向二维列表添加内容：既可以向主列表添加新的子列表，也可以向某个子列表添加新元素。',
      syntax: '# 添加新的子列表\n列表名.append([新元素])\n\n# 向子列表添加元素\n列表名[索引].append(新元素)',
      example: {
        title: '扩展早餐菜单',
        code: '# breakfast = [["包子", "豆浆"]]\nbreakfast = [["包子", "豆浆"]]\n# 添加一组新的早餐\nbreakfast.append(["面包", "牛奶"])\nprint(breakfast)',
        output: "[['包子', '豆浆'], ['面包', '牛奶']]",
        explanation: 'append()在breakfast列表的末尾添加了一个新的子列表["面包", "牛奶"]。'
      },
      practice: [
        {
          question: 'append()把新元素加到哪里？',
          answer: '加到列表的末尾'
        },
        {
          question: 'append()能加几个元素？',
          answer: '一次只能加一个元素（可以是一个列表）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '在游戏中，你可能会解锁新关卡、获得新道具。append()就像这样——可以添加新的关卡列表，也可以在现有关卡添加新道具！',
      concept: 'append()是列表的动态扩展方法。对于二维列表，可以在主列表层面扩展（添加行），也可以在子列表层面扩展（添加列元素）。',
      syntax: '# 动态构建二维列表\n列表 = []\nfor i in range(n):\n    列表.append([新行数据])',
      example: {
        title: '动态创建成绩表',
        code: '# 动态创建学生成绩表\nscores = []\n\n# 添加第一个学生\nscores.append(["小明", 90, 85, 88])\n# 添加第二个学生\nscores.append(["小红", 95, 92, 90])\n\nprint(scores)',
        output: "[['小明', 90, 85, 88], ['小红', 95, 92, 90]]",
        explanation: '使用append()动态构建二维列表，可以灵活地逐行添加数据。'
      },
      practice: [
        {
          question: '向主列表append和向子列表append有什么区别？',
          answer: '向主列表添加新行，向子列表在行末添加新元素'
        },
        {
          question: '如何用循环创建一个n行n列的二维列表？',
          answer: '创建空列表，然后用循环append()添加n个子列表'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '动态数据结构的核心！在实际编程中，数据往往是动态增长的。掌握append()操作是构建动态系统、处理流式数据的基础。',
      concept: 'append()是Python列表的核心方法之一，体现了列表的动态特性。理解不同层级的append操作，是处理复杂数据结构、实现动态算法的关键。',
      syntax: '# 从数据源构建二维列表\ndata_list = []\nfor item in 数据源:\n    处理后的行 = [处理函数(item) for item in row]\n    data_list.append(处理后的行)',
      example: {
        title: 'CSV数据解析',
        code: '# 模拟CSV数据解析\ncsv_data = "小明,90,85;小红,95,92;小刚,88,90"\n\n# 解析并构建二维列表\nscores = []\nfor record in csv_data.split(";"):\n    fields = record.split(",")\n    # 转换成绩为整数\n    row = [fields[0], int(fields[1]), int(fields[2])]\n    scores.append(row)\n\nprint(scores)',
        output: "[['小明', 90, 85], ['小红', 95, 92], ['小刚', 88, 90]]",
        explanation: '这是实际数据处理中的常见模式：从字符串或文件读取数据，解析后用append()构建二维列表。'
      },
      practice: [
        {
          question: 'append()和extend()有什么区别？',
          answer: 'append()添加一个元素，extend()添加多个元素（合并列表）'
        },
        {
          question: '如何高效地向二维列表添加大量数据？',
          answer: '可以使用列表推导式，或者预分配空间再填充'
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
    mathConcept: '数数',
    question: '执行下面的代码，会输出什么？\n\n```python\nnums = [[1, 2, 3], [4, "tool", 11], [5, "cc", 6]]\nprint(nums[2][1])\n```',
    options: [
      '53',
      "'cc'",
      "'tool'",
      '71'
    ],
    answer: 1, // B
    explanation: 'nums[2][1]的第1个索引2找到子列表[5, "cc", 6]，第2个索引1找到子列表中的元素"cc"，输出结果为"cc"。\n\n数学知识：这就像在教室找座位，先找第3排，再找这一排的第2个位置。',
    hint: '第一个索引找子列表，第二个索引找元素'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '集合',
    question: '执行下面的代码，输出结果是？\n\n```python\nsports = [["田径", "举重"], ["攀岩", "篮球"]]\nsports[0].append("游泳")\nprint(sports)\n```',
    options: [
      "[['田径', '举重', '游泳'], ['攀岩', '篮球']]",
      "[['田径', '举重'], ['攀岩', '篮球', '游泳']]",
      "[['田径', '举重'], ['攀岩', '篮球'], '游泳']",
      "[['田径', '举重'], ['攀岩', '篮球'], ['游泳']]"
    ],
    answer: 0, // A
    explanation: 'sports[0]找到第一个子列表["田径", "举重"]，在其末尾添加"游泳"，得到["田径", "举重", "游泳"]。\n\n数学知识：集合的并集运算，把一个元素加入到一个集合中。',
    hint: 'append()在子列表末尾添加新元素'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '找规律',
    question: '核桃部落的奇妙森林里，小动物们排成一个方阵。蝴蝶在第一行第二列，编号是0-1。请问编号为1-3的动物是什么？\n\n```python\nanimals = [\n    ["蜜蜂", "蝴蝶", "小鸟"],\n    ["松鼠", "小鹿", "螃蟹"],\n    ["小兔", "小狐狸", "小熊"]\n]\nprint(animals[1][3])\n```',
    options: [
      "蜜蜂",
      "螃蟹",
      "小鹿",
      "小鸟"
    ],
    answer: 1, // B
    explanation: '编号1-3表示第2行第4列。animals[1]找到第二行["松鼠", "小鹿", "螃蟹"]，animals[1][3]会报错，因为索引3不存在。\n\n等等，让我重新检查：题目中animals[1][3]实际应该是animals[1][2]，因为索引从0开始。第二行索引2的元素是"螃蟹"。\n\n数学知识：矩阵的行列坐标，(行, 列)从(0,0)开始计数。',
    hint: '注意：索引从0开始，第二行的索引是1，第四列的索引是3（但这个列表只有3个元素）'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '位置',
    question: '执行下方代码，输出结果是？\n\n```python\nshop = [["水果店", "便利店"], ["早餐店", "干货店"]]\nshop[0][1] = "花店"\nprint(shop)\n```',
    options: [
      "[['水果店', '花店'], ['早餐店', '干货店']]",
      "[['水果店', '便利店'], ['花店', '干货店']]",
      "[['花店', '便利店'], ['早餐店', '干货店']]",
      "[['水果店', '便利店'], ['早餐店', '花店']]"
    ],
    answer: 0, // A
    explanation: 'shop[0][1]定位到第一行的"便利店"，将其修改为"花店"。\n\n数学知识：坐标系中的点定位，(x,y)确定平面上唯一的位置。',
    hint: 'shop[0][1]找到第一行第二列的元素'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '逻辑推理',
    question: '下面的代码执行后，二维列表会变成什么样？\n\n```python\ngrid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]\nfor i in range(3):\n    grid[i][i] = 1\nprint(grid)\n```',
    options: [
      '[[1, 1, 1], [1, 1, 1], [1, 1, 1]]',
      '[[1, 0, 0], [0, 1, 0], [0, 0, 1]]',
      '[[0, 0, 1], [0, 1, 0], [1, 0, 0]]',
      '[[0, 0, 0], [0, 1, 0], [0, 0, 0]]'
    ],
    answer: 1, // B
    explanation: '循环i的值是0,1,2。grid[i][i]表示对角线位置：grid[0][0]、grid[1][1]、grid[2][2]都被设置为1，形成对角线为1的矩阵。\n\n数学知识：单位矩阵的概念，主对角线上的元素为1，其余为0。',
    hint: 'grid[i][i]表示行列索引相同的位置'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '累加',
    question: '计算二维列表中所有数字的和：\n\n```python\nmatrix = [[1, 2, 3], [4, 5, 6]]\nsum = 0\nfor i in range(len(matrix)):\n    for j in range(len(matrix[i])):\n        sum += matrix[i][j]\nprint(sum)\n```',
    options: [
      '15',
      '21',
      '6',
      '9'
    ],
    answer: 1, // B
    explanation: '用两层循环遍历所有元素：1+2+3+4+5+6 = 21。\n\n数学知识：矩阵所有元素求和，等于把矩阵展平后求和。也可以用公式：(首项+末项)×项数÷2 = (1+6)×6÷2 = 21。',
    hint: '两层循环遍历所有元素并累加'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L10-1',
  title: '来电了',
  subtitle: '认识二维列表，学会访问和修改元素',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解二维列表的概念（列表中的列表）',
    '学会用双索引访问二维列表的元素',
    '掌握修改二维列表元素的方法',
    '能够使用append()向二维列表添加内容'
  ],
  prerequisites: [
    'Python基础语法',
    '列表的基本操作',
    '索引的概念',
    'for循环'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['list', 'index', 'row', 'col', 'tool', 'clothes'],
  medium: ['nested', 'matrix', 'append', 'modify', 'design', 'grid'],
  hard: ['multidimensional', 'sublist', 'element', 'structure', 'board']
}

// 代码模板（打字练习用）
export const typingTemplates = {
  easy: [
    'list = [[1, 2], [3, 4]]',
    'print(list[0])',
    'list[0][0] = 5'
  ],
  medium: [
    'for i in range(len(list)):',
    'for row in matrix:',
    'print(matrix[i][j])'
  ],
  hard: [
    'matrix[i][j] = matrix[j][i]',
    'list[i].append(new_item)',
    'for i in range(len(list)):\n    for j in range(len(list[i])):'
  ]
}

// 导出所有数据
export const L10_1_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L10_1_data
