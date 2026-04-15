/**
 * PY2 课程 L10-2: 谁动了我的正品
 *
 * 核心知识点:
 * 1. 循环嵌套遍历二维列表
 * 2. 用索引遍历二维列表
 * 3. 获取二维列表的行和列
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'good',
    pronunciation: '[gud]',
    partOfSpeech: 'adj.',
    meaning: '好的；擅长的；愉快的；合适的',
    level: 'easy',
    example: 'She is very good at math.',
    exampleTranslation: '她很擅长数学。'
  },
  {
    word: 'shop',
    pronunciation: '[op]',
    partOfSpeech: 'n.',
    meaning: '商店；工厂，车间；购物',
    level: 'easy',
    example: 'I go to the shop every day.',
    exampleTranslation: '我每天都去商店。'
  },
  {
    word: 'medicine',
    pronunciation: '[me-di-sin]',
    partOfSpeech: 'n.',
    meaning: '医药；药，(尤指)药剂',
    level: 'medium',
    example: 'Take this medicine twice a day.',
    exampleTranslation: '这药每天吃两次。'
  },
  {
    word: 'logo',
    pronunciation: '[lou-gou]',
    partOfSpeech: 'n.',
    meaning: '标志，标识，徽标',
    level: 'hard',
    example: 'The company has a new logo.',
    exampleTranslation: '公司有了一个新标志。'
  },
  // 拓展单词
  {
    word: 'matrix',
    pronunciation: '[mei-triks]',
    partOfSpeech: 'n.',
    meaning: '矩阵；母体',
    level: 'hard',
    example: 'The matrix has many rows and columns.',
    exampleTranslation: '矩阵有很多行和列。'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '双重循环 - 遍历二维列表',
    emoji: '🔁',
    gradeLevel: '1-2',
    summary: '用两层循环把二维列表的每个元素都看一遍',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你在整理书包。首先要打开每个文件夹（外层循环），然后查看文件夹里的每一张纸（内层循环）。双重循环就像这样！',
      concept: '遍历二维列表需要两层循环：外层循环遍历每个子列表，内层循环遍历子列表中的每个元素。',
      syntax: 'for 子列表 in 二维列表:\n    for 元素 in 子列表:\n        print(元素)',
      example: {
        title: '打印所有早餐',
        code: '# breakfast = [["包子", "豆浆"], ["面包", "牛奶"], ["油条", "粥"]]\nbreakfast = [["包子", "豆浆"], ["面包", "牛奶"], ["油条", "粥"]]\n# 遍历所有早餐\nfor meal in breakfast:\n    for food in meal:\n        print(food)',
        output: '包子\n豆浆\n面包\n牛奶\n油条\n粥',
        explanation: '外层循环遍历3个meal（子列表），内层循环遍历每个meal中的food，最终打印出所有6个元素。'
      },
      practice: [
        {
          question: '遍历二维列表需要几层循环？',
          answer: '需要两层循环'
        },
        {
          question: '外层循环遍历的是什么？',
          answer: '遍历的是子列表'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '在游戏中，你可能需要检查所有道具栏的所有道具。双重循环就像这样——先检查每个道具栏，再检查栏里的每个道具！',
      concept: '嵌套循环是处理多维数据的标准模式。外层控制"行"的遍历，内层控制"列"的遍历，组合起来可以访问二维结构的所有元素。',
      syntax: '# 双层遍历模式\nfor row in 二维列表:\n    for item in row:\n        处理item',
      example: {
        title: '花店库存',
        code: '# flowers = [["玫瑰", "郁金香"], ["百合", "向日葵"], ["牡丹", "风信子"]]\nflowers = [["玫瑰", "郁金香"], ["百合", "向日葵"], ["牡丹", "风信子"]]\n# 统计花的数量\ncount = 0\nfor row in flowers:\n    for flower in row:\n        count += 1\nprint(f"共有{count}种花")',
        output: '共有6种花',
        explanation: '用嵌套循环遍历所有花朵，每次count加1，最后统计出共有6种花。'
      },
      practice: [
        {
          question: '外层循环次数和子列表个数有什么关系？',
          answer: '外层循环次数等于子列表的个数'
        },
        {
          question: '内层循环次数和子列表长度有什么关系？',
          answer: '内层循环次数等于子列表的长度'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '算法设计的基础模式！嵌套循环是处理矩阵运算、图像处理、数据分析等复杂任务的核心工具。',
      concept: '双重循环的时间复杂度是O(m×n)，其中m是行数，n是列数。理解嵌套循环的执行顺序和效率，是优化算法性能的关键。',
      syntax: '# 带索引的嵌套遍历\nfor i in range(len(列表)):\n    for j in range(len(列表[i])):\n        元素 = 列表[i][j]',
      example: {
        title: '矩阵元素查找',
        code: '# 在矩阵中查找目标值\nmatrix = [\n    [1, 5, 9],\n    [2, 6, 10],\n    [3, 7, 11]\n]\n\ntarget = 7\nfound = False\nfor i in range(len(matrix)):\n    for j in range(len(matrix[i])):\n        if matrix[i][j] == target:\n            print(f"找到{target}在位置({i}, {j})")\n            found = True\n            break\n    if found:\n        break',
        output: '找到7在位置(2, 1)',
        explanation: '用嵌套循环遍历矩阵，找到目标值后用break退出内层和外层循环。这是基础搜索算法的实现。'
      },
      practice: [
        {
          question: '3x4矩阵用嵌套循环要执行多少次内层循环体？',
          answer: '12次（3行×4列）'
        },
        {
          question: '如何优化嵌套循环的效率？',
          answer: '减少不必要的循环、提前退出、使用更高效的算法等'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '索引遍历 - 用range()访问',
    emoji: '🔢',
    gradeLevel: '1-2',
    summary: '用索引i和j来访问二维列表的元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你在电影院找座位。座位号是第几排第几号，用数字表示。索引遍历就像用座位号来找位置！',
      concept: '除了直接遍历元素，也可以用for i in range()的方式遍历。这样可以同时获得元素的索引，方便进行位置相关的操作。',
      syntax: 'for i in range(行数):\n    for j in range(列数):\n        元素 = 列表[i][j]',
      example: {
        title: '按索引打印',
        code: '# shop = [["水果店", "便利店"], ["早餐店", "干货店"]]\nshop = [["水果店", "便利店"], ["早餐店", "干货店"]]\n# 用索引遍历\nfor i in range(2):\n    for j in range(2):\n        print(f"位置{i}-{j}: {shop[i][j]}")',
        output: '位置0-0: 水果店\n位置0-1: 便利店\n位置1-0: 早餐店\n位置1-1: 干货店',
        explanation: '外循环i的值是0,1，内循环j的值是0,1。用shop[i][j]可以精确访问每个位置，还能知道元素的坐标。'
      },
      practice: [
        {
          question: 'range(2)会产生哪些数字？',
          answer: '会产生0和1'
        },
        {
          question: '用索引遍历有什么好处？',
          answer: '可以同时知道元素的位置（索引）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '在游戏中，你可能在特定位置放置道具、修改地图。索引遍历能让你精确控制每个位置的元素！',
      concept: '索引遍历比元素遍历更灵活，可以精确访问任意位置，还可以进行需要位置信息的操作。这是实现矩阵运算、地图编辑等功能的必要方法。',
      syntax: '# 动态获取行列数\nfor i in range(len(列表)):\n    for j in range(len(列表[i])):\n        元素 = 列表[i][j]',
      example: {
        title: '地图标记',
        code: '# 3x3的地图，0表示空地\nmap = [\n    [0, 0, 0],\n    [0, 0, 0],\n    [0, 0, 0]\n]\n# 在对角线位置放置宝藏（用1表示）\nfor i in range(3):\n    for j in range(3):\n        if i == j:\n            map[i][j] = 1\n\nfor row in map:\n    print(row)',
        output: '[1, 0, 0]\n[0, 1, 0]\n[0, 0, 1]',
        explanation: '用索引遍历所有位置，当行列索引相等（i==j）时，说明在对角线上，将该位置设为1。'
      },
      practice: [
        {
          question: 'len(列表)和len(列表[i])分别表示什么？',
          answer: 'len(列表)是行数，len(列表[i])是第i行的列数'
        },
        {
          question: '什么时候必须用索引遍历？',
          answer: '需要修改元素或需要知道元素位置时'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '高级数据处理的基础！索引遍历是实现矩阵运算、数据转换、算法优化等高级功能的核心技术。',
      concept: '索引遍历提供了对二维结构的完全控制权，不仅能访问元素，还能修改元素、进行位置相关的计算。这是理解更复杂算法和数据结构的基础。',
      syntax: '# 矩阵转置\nfor i in range(行数):\n    for j in range(列数):\n        新矩阵[j][i] = 旧矩阵[i][j]',
      example: {
        title: '矩阵旋转90度',
        code: '# 将2x3矩阵旋转为3x2\nmatrix = [\n    [1, 2, 3],\n    [4, 5, 6]\n]\n\n# 创建新的3x2矩阵\nrows, cols = len(matrix), len(matrix[0])\nrotated = [[0] * rows for _ in range(cols)]\n\n# 旋转（行列互换）\nfor i in range(rows):\n    for j in range(cols):\n        rotated[j][i] = matrix[i][j]\n\nfor row in rotated:\n    print(row)',
        output: '[1, 4]\n[2, 5]\n[3, 6]',
        explanation: '这是矩阵转置的经典实现。通过行列索引的互换，将2×3矩阵转换为3×2矩阵。'
      },
      practice: [
        {
          question: '矩阵转置后，新矩阵的行数和列数怎么算？',
          answer: '新行数=旧列数，新列数=旧行数'
        },
        {
          question: '如何在不创建新矩阵的情况下原地转置方阵？',
          answer: '只遍历上三角或下三角，交换matrix[i][j]和matrix[j][i]'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '行与列 - 获取特定行列的元素',
    emoji: '📊',
    gradeLevel: '1-2',
    summary: '可以获取一整行的元素，也可以获取一整列的元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你在超市买东西。可以买一整排的货架（一行），也可以从每排货架上拿同一种商品（一列）！',
      concept: '二维列表像表格，可以按行查看，也可以按列查看。获取行是固定第一个索引，获取列是固定第二个索引。',
      syntax: '# 获取一整行\n行 = 列表名[行索引]\n\n# 获取一整列（需要循环）\nfor i in range(行数):\n    元素 = 列表名[i][列索引]',
      example: {
        title: '菜单行和列',
        code: '# food = [["牛角包", "吐司"], ["香蕉", "哈密瓜"], ["玉米", "米饭"]]\nfood = [["牛角包", "吐司"], ["香蕉", "哈密瓜"], ["玉米", "米饭"]]\n# 获取第一行\nprint("第一行:", food[0])\n# 获取第二列\nprint("第二列:")\nfor i in range(3):\n    print(food[i][1])',
        output: '第一行: ["牛角包", "吐司"]\n第二列:\n吐司\n哈密瓜\n米饭',
        explanation: 'food[0]直接获取第一整行。获取第二列需要用循环，固定第二个索引为1，遍历所有行。'
      },
      practice: [
        {
          question: '获取一行用什么方式？',
          answer: '用一个索引：列表名[行索引]'
        },
        {
          question: '获取一列需要用什么？',
          answer: '需要用循环，遍历所有行，固定列索引'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '在游戏中，你可能查看某一关卡的道具（一行），或者查看所有关卡的某个统计信息（一列）！',
      concept: '按行和按列访问是数据处理的基本操作。行访问是单一操作，列访问需要遍历所有行。理解这种差异是高效处理表格数据的关键。',
      syntax: '# 获取列的通用方法\ncol_data = [行[列索引] for 行 in 列表]',
      example: {
        title: '成绩表分析',
        code: '# scores = [["小明", 90, 85], ["小红", 88, 92], ["小刚", 95, 89]]\nscores = [\n    ["小明", 90, 85],\n    ["小红", 88, 92],\n    ["小刚", 95, 89]\n]\n# 获取第二列（第一次成绩）\nprint("第一科成绩:")\nfor row in scores:\n    print(row[1])\n\n# 计算平均分\navg = sum([row[1] for row in scores]) / len(scores)\nprint(f"平均分: {avg}")',
        output: '第一科成绩:\n90\n88\n95\n平均分: 91.0',
        explanation: '用列表推导式[row[1] for row in scores]可以优雅地提取某一列的数据，然后进行统计计算。'
      },
      practice: [
        {
          question: '获取列数据为什么需要遍历？',
          answer: '因为二维列表是按行存储的，列数据分散在各个行中'
        },
        {
          question: '列表推导式提取列数据有什么优势？',
          answer: '代码简洁，可读性好，一次遍历完成提取'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '数据分析的核心技能！在实际的数据处理中，按行和按列访问是最常见的操作之一。',
      concept: '行列访问是数据库操作、数据分析、科学计算的基础。Python中的pandas、numpy等库都提供了更高效的行列操作方法，但其核心思想与此相同。',
      syntax: '# 使用zip函数转置并提取列\n列数据 = list(zip(*列表))\n指定列 = 列数据[列索引]',
      example: {
        title: '数据透视分析',
        code: '# 销售数据：[产品名, 1月, 2月, 3月]\nsales = [\n    ["苹果", 100, 120, 110],\n    ["香蕉", 80, 90, 85],\n    ["橙子", 90, 95, 100]\n]\n\n# 计算每月总销售额\nmonths = len(sales[0]) - 1  # 减去产品名列\nfor m in range(1, months + 1):\n    month_total = sum([row[m] for row in sales])\n    print(f"{m}月总销售: {month_total}")',
        output: '1月总销售: 270\n2月总销售: 305\n3月总销售: 295',
        explanation: '这是数据透视分析的基础操作：按列（月份）统计所有产品的销售总和。实际业务中这类分析非常常见。'
      },
      practice: [
        {
          question: 'zip(*列表)是如何工作的？',
          answer: '它把二维列表转置，行变成列，列变成行'
        },
        {
          question: '如何高效地处理大型表格数据？',
          answer: '使用pandas等专门库，或使用生成器避免一次性加载全部数据'
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
    question: '横线上分别填写什么数字，才能输出二维列表每一个子列表的元素？\n\n```python\nitems = [[1, 2], [3, 4], [5, 6]]\nfor i in range(__):  # 第一个空\n    for j in range(__):  # 第二个空\n        print(items[i][j])\n```',
    options: [
      '2, 3',
      '2, 2',
      '3, 2',
      '3, 3'
    ],
    answer: 2, // C
    explanation: 'items有3个子列表，所以外循环range(3)产生0,1,2。每个子列表有2个元素，所以内循环range(2)产生0,1。\n\n数学知识：3×2=6，会打印6个元素。',
    hint: '外循环次数=子列表个数，内循环次数=子列表元素个数'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '找规律',
    question: '下面的代码会输出什么？\n\n```python\ncolors = [["红", "橙"], ["粉", "黄"]]\nfor i in range(2):\n    print(colors[i][1])\n```',
    options: [
      '红\\n粉',
      '橙\\n黄',
      '橙\\n粉',
      '红\\n橙'
    ],
    answer: 1, // B
    explanation: 'i=0时，colors[0][1]是第一行第二列"橙"；i=1时，colors[1][1]是第二行第二列"黄"。\n\n数学知识：固定第二个索引为1，表示取每一行的第二列元素。',
    hint: '第二个索引是1，表示取每行的第二个元素'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '逻辑推理',
    question: '执行下方代码，输出结果是？\n\n```python\ngrid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nfor i in range(3):\n    print(grid[i][i])\n```',
    options: [
      '1\\n2\\n3',
      '1\\n5\\n9',
      '3\\n5\\n7',
      '1\\n4\\n7'
    ],
    answer: 1, // B
    explanation: 'i=0时grid[0][0]=1，i=1时grid[1][1]=5，i=2时grid[2][2]=9。这是矩阵的主对角线。\n\n数学知识：行列索引相同的位置(i,i)构成主对角线。',
    hint: 'grid[i][i]表示行列索引相同的元素'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '求和',
    question: '计算二维列表第一列的和：\n\n```python\nmatrix = [[1, 2], [3, 4], [5, 6]]\nsum = 0\nfor i in range(3):\n    sum += matrix[i][0]\nprint(sum)\n```',
    options: [
      '6',
      '9',
      '12',
      '15'
    ],
    answer: 1, // B
    explanation: 'matrix[0][0]=1，matrix[1][0]=3，matrix[2][0]=5。sum = 1+3+5 = 9。\n\n数学知识：等差数列求和，1,3,5是连续奇数，和为9。',
    hint: 'matrix[i][0]取每行的第一个元素'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '方阵问题',
    question: '核桃商业街举行开业仪式，猴赛雷等人排成一个实心方阵准备表演，已知最外层每边有7个人，那么一共有多少人表演节目？\n\n```python\n# 用Python计算方阵人数\nn = 7  # 每边人数\ntotal = 0\nfor i in range(n):\n    for j in range(n):\n        total += 1\nprint(total)\n```',
    options: [
      '49',
      '36',
      '25',
      '14'
    ],
    answer: 0, // A
    explanation: '方阵是正方形，7×7=49人。双层循环执行了7×7=49次，每次total加1。\n\n数学知识：方阵总人数 = 每边人数 × 每边人数。这是"方阵问题"的基本公式。',
    hint: '7×7=49'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '最值问题',
    question: '找出二维列表中的最大值：\n\n```python\nmatrix = [[3, 5, 1], [9, 2, 8], [4, 7, 6]]\nmax_val = matrix[0][0]\nfor i in range(3):\n    for j in range(3):\n        if matrix[i][j] > max_val:\n            max_val = matrix[i][j]\nprint(max_val)\n```',
    options: [
      '9',
      '8',
      '7',
      '6'
    ],
    answer: 0, // A
    explanation: '用嵌套循环遍历所有元素，不断更新max_val。9是最大的值。\n\n数学知识：在一组数中找最大值是基础算法，需要遍历所有元素进行比较。',
    hint: '遍历所有元素，找出最大值'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L10-2',
  title: '谁动了我的正品',
  subtitle: '掌握二维列表的遍历方法',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '学会用嵌套循环遍历二维列表',
    '掌握索引遍历的方法（for i in range）',
    '理解如何获取一整行或一整列的元素',
    '能用编程解决表格数据处理问题'
  ],
  prerequisites: [
    'Python基础语法',
    'for循环',
    '二维列表基础',
    'range()函数'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['loop', 'range', 'row', 'col', 'good', 'shop'],
  medium: ['nested', 'traverse', 'matrix', 'column', 'medicine'],
  hard: ['iteration', 'coordinate', 'transpose', 'optimize', 'logo']
}

// 代码模板（打字练习用）
export const typingTemplates = {
  easy: [
    'for i in range(3):',
    'for item in row:',
    'print(matrix[i][j])'
  ],
  medium: [
    'for i in range(len(list)):\n    for j in range(len(list[i])):',
    'print(list[i][j])',
    'for row in matrix:\n    print(row)'
  ],
  hard: [
    'for i in range(len(matrix)):\n    for j in range(len(matrix[i])):\n        print(matrix[i][j])',
    'col = [row[i] for row in matrix]',
    'matrix[i][j] = matrix[j][i]'
  ]
}

// 导出所有数据
export const L10_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L10_2_data
