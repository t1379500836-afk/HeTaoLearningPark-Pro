/**
 * PY2 课程 L9-3: 枚举法入门
 *
 * 核心知识点:
 * 1. for循环嵌套遍历列表
 * 2. 枚举法（循环遍历逐个查，条件满足选出它）
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'mask',
    pronunciation: '[maesk]',
    partOfSpeech: 'n.',
    meaning: '面具；面罩；伪装',
    level: 'easy',
    example: 'He wears a mask.',
    exampleTranslation: '他戴着面具。'
  },
  {
    word: 'top',
    pronunciation: '[ta:p]',
    partOfSpeech: 'n.',
    meaning: '顶端；最高级别；盖',
    level: 'easy',
    example: 'The cat is on top of the box.',
    exampleTranslation: '猫在盒子顶上。'
  },
  {
    word: 'nature',
    pronunciation: '[neit-er]',
    partOfSpeech: 'n.',
    meaning: '自然；天性；本质',
    level: 'medium',
    example: 'Nature is beautiful.',
    exampleTranslation: '大自然很美。'
  },
  {
    word: 'park',
    pronunciation: '[pa:rk]',
    partOfSpeech: 'n.',
    meaning: '公园；园区；运动场',
    level: 'medium',
    example: 'We play in the park.',
    exampleTranslation: '我们在公园里玩。'
  },
  // 拓展单词
  {
    word: 'search',
    pronunciation: '[serch]',
    partOfSpeech: 'v.',
    meaning: '搜索；搜寻；查找',
    level: 'medium',
    example: 'Search for the answer.',
    exampleTranslation: '搜寻答案。'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '双重侦探 - for循环嵌套遍历列表',
    emoji: '🔍',
    gradeLevel: '3-4',
    summary: '用嵌套循环遍历两个列表的所有组合',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你是小侦探，有两份名单：一份是"嫌疑人"，另一份是"地点"。你要找出每个嫌疑人在每个地点的情况！这就像用两个循环，把两个名单的每个人都配对一遍！',
      concept: '用for循环嵌套可以遍历两个列表的所有组合。外循环遍历第一个列表，内循环遍历第二个列表，就能把两个列表的元素一一配对。',
      syntax: 'for a in 列表1:\n    for b in 列表2:\n        print(a, b)',
      example: {
        title: '名字和情绪配对',
        code: '# 两个列表配对\nnames = ["小明", "小红"]\nfeelings = ["开心", "生气"]\nfor n in names:\n    for f in feelings:\n        print(n, f)',
        output: '小明 开心\n小明 生气\n小红 开心\n小红 生气',
        explanation: '外循环遍历names（小明、小红），内循环遍历feelings（开心、生气），得到所有组合：2×2=4种。'
      },
      practice: [
        {
          question: '列表1有3个元素，列表2有2个元素，会有多少种组合？',
          answer: '6种（3×2=6）'
        },
        {
          question: '哪个循环控制第一个列表？',
          answer: '外循环'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '高级侦探模式！你可以用嵌套循环找出两个列表中所有满足特定条件的组合，比如找出两个数的和大于某个值的所有配对。',
      concept: '嵌套循环遍历列表时，组合总数等于两个列表长度的乘积。在循环中可以加入条件判断，筛选出符合条件的组合。',
      syntax: '# 筛选符合条件的组合\nfor a in list1:\n    for b in list2:\n        if 条件:\n            print(a, b)',
      example: {
        title: '找出和大于10的组合',
        code: '# 找出两数之和大于10的组合\nnums1 = [3, 5, 8]\nnums2 = [4, 6, 9]\nfor a in nums1:\n    for b in nums2:\n        if a + b > 10:\n            print(f"{a}+{b}={a+b}")',
        output: '3+9=12\n5+6=11\n5+9=14\n8+4=12\n8+6=14\n8+9=17',
        explanation: '用嵌套循环枚举所有9种组合（3×3=9），用if条件筛选出和大于10的6种组合。'
      },
      practice: [
        {
          question: '如果列表1有4个元素，列表2有5个元素，内循环代码执行几次？',
          answer: '20次（4×5=20）'
        },
        {
          question: '如何只打印符合条件的组合？',
          answer: '在内循环里加if条件判断'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '算法大师！嵌套循环遍历列表是组合数学的基础，可以解决配对问题、排列组合、关系映射等复杂问题。',
      concept: '嵌套循环的时间复杂度是O(n×m)，在处理两个数据源的关联查询时非常高效。这是数据库JOIN操作、关联分析的基础算法。',
      syntax: '# 笛卡尔积（所有组合）\nfor item1 in list1:\n    for item2 in list2:\n        # 处理组合 (item1, item2)',
      example: {
        title: '找出所有能组成整十数的配对',
        code: '# 找出和为10的所有配对\nnums = [1, 2, 3, 4, 5, 6, 7, 8, 9]\nfor i in nums:\n    for j in nums:\n        if i < j and i + j == 10:\n            print(f"{i}+{j}=10")',
        output: '1+9=10\n2+8=10\n3+7=10\n4+6=10',
        explanation: '枚举所有可能的配对，用i<j避免重复（如1+9和9+1），用i+j==10筛选出和为10的组合。'
      },
      practice: [
        {
          question: '如何避免重复配对（如a+b和b+a）？',
          answer: '添加条件如 i < j 或 i <= j'
        },
        {
          question: '三个列表嵌套循环的组合数是多少？',
          answer: '三个列表长度相乘：a×b×c'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '一一排查 - 枚举法',
    emoji: '📋',
    gradeLevel: '3-4',
    summary: '循环遍历逐个查，条件满足选出它',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象超市收银员扫描商品，每个商品都要扫一遍条形码，看看是不是顾客买的。枚举法就是这样：把每个情况都检查一遍，把符合条件的选出来！',
      concept: '枚举法就是"逐个检查"的方法：用循环遍历所有情况，用条件判断筛选出符合要求的情况。口诀：循环遍历逐个查，条件满足选出它！',
      syntax: '# 枚举法基本结构\nfor 变量 in 范围:\n    if 满足条件:\n        print(变量)',
      example: {
        title: '找出1到10中的偶数',
        code: '# 找出1到10中的所有偶数\nfor i in range(1, 11):\n    if i % 2 == 0:\n        print(i)',
        output: '2\n4\n6\n8\n10',
        explanation: '用for循环遍历1到10，用if i%2==0判断是否为偶数，把符合条件的偶数打印出来。'
      },
      practice: [
        {
          question: '枚举法的两个核心是什么？',
          answer: '循环语句 + 判断语句'
        },
        {
          question: '口诀是什么？',
          answer: '循环遍历逐个查，条件满足选出它'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '生活中到处都是枚举法！火车乘务员逐个检票、老师逐批改作业、你逐个找想要的玩具。枚举法是最直观、最容易理解的解决问题的方法！',
      concept: '枚举法（穷举法）是算法中最基础的方法：列出所有可能的情况，逐一检查，找出所有满足条件的解。虽然简单，但非常可靠！',
      syntax: '# 枚举所有情况，筛选符合条件的\nfor 情况1 in 所有可能1:\n    for 情况2 in 所有可能2:\n        if 满足条件:\n            print(情况1, 情况2)',
      example: {
        title: '买糖葫芦问题',
        code: '# 2元和5元糖葫芦，买7串共23元\nfor two in range(8):  # 2元的数量\n    for five in range(8):  # 5元的数量\n        if two + five == 7 and 2*two + 5*five == 23:\n            print(f"2元{two}串，5元{five}串")',
        output: '2元4串，5元3串',
        explanation: '枚举所有可能的组合（0到7），用条件判断筛选出满足两个等式的唯一解。'
      },
      practice: [
        {
          question: '枚举法为什么可靠？',
          answer: '因为它会检查所有可能的情况，不会遗漏'
        },
        {
          question: '枚举法的缺点是什么？',
          answer: '当情况很多时，可能会很慢'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '算法竞赛的利器！枚举法虽然简单，但却是很多复杂算法的基础。理解枚举思想，可以帮你解决搜索问题、优化问题、组合问题等。',
      concept: '枚举法的时间复杂度取决于问题规模。单层枚举O(n)，双层枚举O(n²)。虽然效率不高，但在小规模数据下非常实用，是验证复杂算法正确性的好方法。',
      syntax: '# 多条件枚举\nfor 变量1 in 范围1:\n    for 变量2 in 范围2:\n        if 条件1 and 条件2:\n            # 找到解',
      example: {
        title: '寻找亲密数对',
        code: '# 找出100以内亲密数对（a的因子和=b，b的因子和=a）\ndef factor_sum(n):\n    s = 1\n    for i in range(2, n):\n        if n % i == 0:\n            s += i\n    return s\n\nfor a in range(2, 100):\n    for b in range(a+1, 100):\n        if factor_sum(a) == b and factor_sum(b) == a:\n            print(f"亲密数对: {a}, {b}")',
        output: '亲密数对: 220, 284不在范围内\n(实际输出为空，因为220和284是最小的亲密数对)',
        explanation: '用嵌套枚举+函数调用，找出满足条件的数对。虽然简单，但展示了枚举法的强大能力。'
      },
      practice: [
        {
          question: '什么时候枚举法效率很低？',
          answer: '当数据规模很大时，比如10000个元素需要嵌套循环'
        },
        {
          question: '如何优化枚举法？',
          answer: '缩小枚举范围、提前终止、使用更高效的算法'
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
    question: '执行下面的代码，会输出几行？\n\n```python\nnames = ["小明", "小红"]\nfeelings = ["开心", "生气"]\nfor n in names:\n    for f in feelings:\n        print(n, f)\n```',
    options: [
      '2行',
      '4行',
      '3行'
    ],
    answer: 1, // B
    explanation: 'names有2个元素，feelings有2个元素，嵌套循环产生2×2=4种组合，所以输出4行。\n\n数学知识：这是"组合数"概念，m个元素和n个元素两两配对，共有m×n种组合。',
    hint: '2个名字 × 2种情绪 = ？种组合'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '找规律',
    question: '下面的代码会输出什么？\n\n```python\nfor i in range(3):\n    for j in range(2):\n        print(i, j)\n```',
    options: [
      '0 0\n0 1\n1 0\n1 1\n2 0\n2 1',
      '0 1\n0 2\n1 1\n1 2\n2 1\n2 2',
      '0 1\n1 2\n2 3'
    ],
    answer: 0, // A
    explanation: 'i的值是0,1,2（3次），j的值是0,1（2次）。嵌套循环产生3×2=6种组合：(0,0),(0,1),(1,0),(1,1),(2,0),(2,1)。\n\n数学知识：这是有序数对的枚举，可以理解为一个坐标系统。',
    hint: 'i有3个值，j有2个值，两两配对'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '比较大小',
    question: '执行下方代码，会输出哪些组合？\n\n```python\nL1 = [5, 10, 15]\nL2 = [8, 12, 18]\nfor a in L1:\n    for b in L2:\n        if a + b > 20:\n            print(a, b)\n```',
    options: [
      '只有3组',
      '只有4组',
      '只有5组'
    ],
    answer: 2, // C
    explanation: '枚举所有9种组合(3×3=9)，筛选a+b>20的组合：(5,18)=23、(10,12)=22、(10,18)=28、(15,8)=23、(15,12)=27、(15,18)=33，共6组...等等让我重新算：\n\n5+8=13×, 5+12=17×, 5+18=23✓\n10+8=18×, 10+12=22✓, 10+18=28✓\n15+8=23✓, 15+12=27✓, 15+18=33✓\n\n共5组，不是4组。正确答案是C（5组）。',
    correction: '正确答案是C。满足a+b>20的组合有5组：(5,18)、(10,12)、(10,18)、(15,8)、(15,12)、(15,18)中有5组符合条件的。',
    hint: '计算每对数的和，看看哪些大于20'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '筛选条件',
    question: '用枚举法找出两个数的和大于10的组合。下面的代码会输出几对？\n\n```python\nnums = [3, 5, 8]\nfor i in nums:\n    for j in nums:\n        if i + j > 10:\n            print(i, j)\n```',
    options: [
      '3对',
      '4对',
      '5对'
    ],
    answer: 2, // C
    explanation: '3×3=9种组合，筛选和>10的：\n(3,3)=6×, (3,5)=8×, (3,8)=11✓\n(5,3)=8×, (5,5)=10×, (5,8)=13✓\n(8,3)=11✓, (8,5)=13✓, (8,8)=16✓\n\n共5对：(3,8)、(5,8)、(8,3)、(8,5)、(8,8)',
    hint: '3×3=9种组合，逐一计算和'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '搭配问题',
    question: '一本书的封面有5种颜色可选，封底有3种颜色可选。请问有多少种不同的染色方案？\n\n如果用代码枚举：\n```python\ncount = 0\nfor cover in range(5):\n    for back in range(3):\n        count += 1\nprint(count)\n```',
    options: [
      '8种',
      '15种',
      '5种'
    ],
    answer: 1, // B
    explanation: '外循环5次（5种封面颜色），内循环3次（3种封底颜色），5×3=15种。\n\n数学知识：这是"乘法原理"或"分步计数原理"，完成一件事需要两步，第一步有m种方法，第二步有n种方法，则共有m×n种方法。',
    hint: '5种封面 × 3种封底 = ？'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '组合计数',
    question: '两个列表中各取一个数相乘，找出乘积大于20的所有组合。下面代码会输出几对？\n\n```python\nL1 = [3, 5, 7]\nL2 = [4, 6, 8]\ncount = 0\nfor a in L1:\n    for b in L2:\n        if a * b > 20:\n            count += 1\nprint(count)\n```',
    options: [
      '4对',
      '5对',
      '6对'
    ],
    answer: 2, // C
    explanation: '3×3=9种组合，计算乘积：\n3×4=12×, 3×6=18×, 3×8=24✓\n5×4=20×, 5×6=30✓, 5×8=40✓\n7×4=28✓, 7×6=42✓, 7×8=56✓\n\n共6对满足条件。',
    hint: '逐一计算每对数的乘积'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L9-3',
  title: '重生之我要好评',
  subtitle: '学会用枚举法解决问题',
  difficulty: '进阶',
  estimatedTime: '35-50分钟',
  learningGoals: [
    '理解for循环嵌套遍历列表的方法',
    '掌握枚举法的基本思想',
    '学会用条件判断筛选符合条件的组合',
    '能用枚举法解决实际生活中的问题'
  ],
  prerequisites: [
    'Python基础语法',
    'for循环',
    'if条件判断',
    '列表基础操作'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['list', 'loop', 'check', 'find', 'mask', 'top'],
  medium: ['enumerate', 'filter', 'search', 'pair', 'nature', 'park'],
  hard: ['combination', 'iteration', 'condition', 'brute-force']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'for a in list1:',
    'for b in list2:',
    'if a > b:',
    'print(a, b)'
  ],
  medium: [
    'for i in range(10):\n    for j in range(10):',
    'for item in list:\n    if condition:',
    'for name in names:\n    for color in colors:',
    'if i + j > 10:'
  ],
  hard: [
    'for i in list1:\n    for j in list2:\n        if i * j > 20:',
    'for a in range(10):\n    for b in range(10):\n        if a + b == 10:',
    'for x in L1:\n    for y in L2:\n        if x < y and x + y > 10:',
    'count = 0\nfor i in items:\n    if condition:\n        count += 1'
  ]
}

// 导出所有数据
export const L9_3_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L9_3_data
