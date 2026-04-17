/**
 * PY2 课程 L9-4: 鸡兔同笼
 *
 * 核心知识点:
 * 1. 统计配方数量（计数变量）
 * 2. 鸡兔同笼问题（枚举法解决经典数学问题）
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'head',
    pronunciation: '[hed]',
    partOfSpeech: 'n.',
    meaning: '头；头脑；负责人',
    level: 'easy',
    example: 'Shake your head.',
    exampleTranslation: '摇摇头。',
    source: 'ocr'
  },
  {
    word: 'foot',
    pronunciation: '[fut]',
    partOfSpeech: 'n.',
    meaning: '脚；足；底部；英尺',
    level: 'easy',
    example: 'I have two feet.',
    exampleTranslation: '我有两只脚。',
    source: 'ocr'
  },
  {
    word: 'bee',
    pronunciation: '[bi]',
    partOfSpeech: 'n.',
    meaning: '蜜蜂；（比赛或活动的）聚会',
    level: 'medium',
    example: 'The bee makes honey.',
    exampleTranslation: '蜜蜂酿蜜。',
    source: 'ocr'
  },
  {
    word: 'honey',
    pronunciation: '[h<ni]',
    partOfSpeech: 'n.',
    meaning: '蜂蜜；亲爱的；宝贝',
    level: 'hard',
    example: 'Honey is sweet.',
    exampleTranslation: '蜂蜜是甜的。',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'cage',
    pronunciation: '[keij]',
    partOfSpeech: 'n.',
    meaning: '笼子；牢笼',
    level: 'medium',
    example: 'The bird is in the cage.',
    exampleTranslation: '鸟在笼子里。',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '小会计 - 统计配方数量',
    emoji: '🔢',
    gradeLevel: '3-4',
    summary: '用计数变量统计符合条件的组合数量',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你是一位小会计，在数有多少张彩票中奖了。你一边检查彩票，一边在纸上画记号。每有一张中奖的，就加1。最后你数数画了多少个记号，就知道有多少张中奖了！',
      concept: '计数变量就像一个计数器，初始值设为0，每找到一个符合条件的就加1。循环结束后，计数变量里存的数字就是符合条件的数量。',
      syntax: 'count = 0  # 设置计数器初始值\nfor 变量 in 范围:\n    if 符合条件:\n        count += 1  # 计数器加1\nprint(count)  # 输出总数',
      example: {
        title: '统计1-10中的偶数数量',
        code: '# 统计1到10中有几个偶数\ncount = 0\nfor i in range(1, 11):\n    if i % 2 == 0:\n        count += 1\nprint(f"偶数有{count}个")',
        output: '偶数有5个',
        explanation: 'count初始为0，遍历1到10，每找到一个偶数(2,4,6,8,10)就count+=1，最后count等于5。'
      },
      practice: [
        {
          question: '计数变量的初始值应该设为多少？',
          answer: '0'
        },
        {
          question: '每找到一个符合条件的，应该对计数变量做什么？',
          answer: '加1（count += 1）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '高级会计模式！在配方实验中，你想知道有多少种配方满足酸度要求。用枚举法尝试所有配方组合，用计数器统计符合条件的配方数量。',
      concept: '计数变量是枚举法中的重要工具，配合嵌套循环可以统计多维数据中满足特定条件的组合数量。这是数据统计分析的基础方法。',
      syntax: '# 嵌套循环 + 计数器\ncount = 0\nfor 变量1 in 范围1:\n    for 变量2 in 范围2:\n        if 满足条件:\n            count += 1\nprint(count)',
      example: {
        title: '统计满足条件的配方数量',
        code: '# 柠檬汁1-5份，山楂汁1-4份，统计和>6的配方\ncount = 0\nfor lemon in range(1, 6):\n    for hawthorn in range(1, 5):\n        if lemon + hawthorn > 6:\n            count += 1\nprint(f"满足条件的配方有{count}种")',
        output: '满足条件的配方有6种',
        explanation: '枚举所有20种组合(5×4=20)，筛选和>6的配方：(4,3)=7,(4,4)=8,(5,2)=7,(5,3)=8,(5,4)=9，共6种。'
      },
      practice: [
        {
          question: '如果要同时输出符合条件的配方内容，应该怎么做？',
          answer: '在count += 1之前加print语句输出配方'
        },
        {
          question: '如果没有任何符合条件的配方，count的值是多少？',
          answer: '仍然是初始值0'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '数据分析大师！计数变量是统计分析的基础，你可以用它统计满足各种复杂条件的数据：频数统计、直方图、数据过滤等。',
      concept: '计数变量配合枚举法可以实现O(n)或O(n²)的统计算法。理解计数器的初始化、递增和输出时机，是实现各种统计算法的关键。',
      syntax: '# 多条件统计\ncount = 0\nfor item in dataset:\n    if 条件1 and 条件2:\n        count += 1\n# 比例统计\nratio = count / total',
      example: {
        title: '统计优秀率',
        code: '# 统计班级成绩的优秀率（>=90分）\nscores = [85, 92, 78, 95, 88, 90, 96, 82]\ncount = 0\nfor s in scores:\n    if s >= 90:\n        count += 1\nprint(f"优秀人数: {count}")\nprint(f"优秀率: {count/len(scores)*100:.1f}%")',
        output: '优秀人数: 4\n优秀率: 50.0%',
        explanation: '用计数器统计>=90分的成绩，计算优秀人数4人，优秀率4/8=50%。'
      },
      practice: [
        {
          question: '如果要统计多个区间（如优秀、良好、及格）怎么办？',
          answer: '使用多个计数变量，如count_A、count_B、count_C'
        },
        {
          question: '计数器可以用+=1以外的方式吗？',
          answer: '可以，比如count += 2、count *= 2等，但+=1最常见'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '经典难题 - 鸡兔同笼',
    emoji: '🐔',
    gradeLevel: '3-4',
    summary: '用枚举法解决古代数学经典问题',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '这是一个古代的数学趣题！笼子里有鸡和兔子，从上面数有5个头，从下面数有14只脚。鸡有2只脚，兔有4只脚，请问鸡和兔各有多少只？',
      concept: '鸡兔同笼问题可以用枚举法解决：假设鸡有0~5只，兔有0~5只（因为有5个头），找出满足"脚=14"的组合。',
      syntax: '# 鸡兔同笼枚举法\nfor 鸡 in range(头数+1):\n    for 兔 in range(头数+1):\n        if 鸡+兔 == 头数 and 鸡*2+兔*4 == 脚数:\n            print(鸡, 兔)',
      example: {
        title: '解决鸡兔同笼',
        code: '# 笼子有5个头14只脚\nfor ji in range(6):  # 鸡0-5只\n    for tu in range(6):  # 兔0-5只\n        if ji + tu == 5 and ji*2 + tu*4 == 14:\n            print(f"鸡: {ji}只, 兔: {tu}只")',
        output: '鸡: 3只, 兔: 2只',
        explanation: '枚举所有36种组合(6×6=36)，筛选满足"头=5、脚=14"的唯一解：3只鸡(6脚)+2只兔(8脚)=14脚。'
      },
      practice: [
        {
          question: '为什么range()里是6而不是5？',
          answer: 'range(n)生成0到n-1，所以range(6)是0-5'
        },
        {
          question: '鸡兔同笼问题需要满足哪两个条件？',
          answer: '头的总数和脚的总数都符合'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '鸡兔同笼问题出自中国古代数学名著《孙子算经》，至今已有1500多年历史！它教会我们用系统的方法尝试所有可能性，直到找到答案。',
      concept: '鸡兔同笼是典型的"不定方程"问题，可以用枚举法、假设法、方程法等多种方法求解。枚举法最直观，虽然不够高效，但保证能找到解。',
      syntax: '# 优化：只用一层循环\nfor 鸡 in range(头数+1):\n    兔 = 头数 - 鸡\n    if 鸡*2 + 兔*4 == 脚数:\n        print(鸡, 兔)',
      example: {
        title: '停车场问题',
        code: '# 停车场有汽车(4轮)和摩托(2轮)，共6辆20轮\nfor car in range(7):  # 汽车0-6辆\n    moto = 6 - car  # 摩托车数量\n    if car * 4 + moto * 2 == 20:\n        print(f"汽车: {car}辆, 摩托: {moto}辆")',
        output: '汽车: 4辆, 摩托: 2辆',
        explanation: '用优化枚举法，只需要一层循环。假设汽车数量，摩托车数量=6-汽车数，筛选满足轮数=20的组合。'
      },
      practice: [
        {
          question: '优化方法为什么只需要一层循环？',
          answer: '因为知道了总数，可以用"总数-甲=乙"计算另一个变量'
        },
        {
          question: '哪种方法效率更高？',
          answer: '优化的单层循环方法更快'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '数学大师！鸡兔同笼是"二元一次方程组"的几何形式。理解枚举法求解的过程，有助于理解代数方程的解法，以及计算机算法的搜索策略。',
      concept: '鸡兔同笼问题可以推广为：已知总数A和属性值总和B，求两类数量。这是线性方程组的整数解问题，枚举法能保证找到所有整数解。',
      syntax: '# 通用鸡兔同笼求解器\ndef solve(heads, feet, legs1=2, legs2=4):\n    for a in range(heads + 1):\n        b = heads - a\n        if a * legs1 + b * legs2 == feet:\n            return a, b\n    return None',
      example: {
        title: '推广：蜘蛛和蜻蜓',
        code: '# 蜘蛛8腿，蜻蜓6腿，共10头68腿\ndef solve_bug(heads, legs, legs1, legs2, name1, name2):\n    for bug1 in range(heads + 1):\n        bug2 = heads - bug1\n        if bug1 * legs1 + bug2 * legs2 == legs:\n            return bug1, bug2\n    return None\n\nresult = solve_bug(10, 68, 8, 6, "蜘蛛", "蜻蜓")\nif result:\n    print(f"蜘蛛: {result[0]}只, 蜻蜓: {result[1]}只")\nelse:\n    print("无解")',
        output: '蜘蛛: 4只, 蜻蜓: 6只',
        explanation: '推广的鸡兔同笼求解器，可以解决任意两类生物的腿数问题。4×8+6×6=32+36=68腿，验证正确。'
      },
      practice: [
        {
          question: '如果问题无解，函数返回什么？',
          answer: '返回None，表示没有找到符合条件的解'
        },
        {
          question: '如何把鸡兔同笼推广到三类动物？',
          answer: '需要两层嵌套循环或用三层循环枚举'
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
    mathConcept: '范围与索引',
    question: '要在循环中打印0、1、2、3这几个数字，range()括号中应该填写什么？\n\n```python\nfor i in range(____):\n    print(i)\n```',
    options: [
      '3',
      '4',
      '5'
    ],
    answer: 1, // B
    explanation: 'range(n)生成从0到n-1的整数，要生成0,1,2,3，需要range(4)。\n\n数学知识：range()遵循"左闭右开"原则，包含左端不包含右端。',
    hint: 'range(4)生成0,1,2,3，不包含4'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '计数原理',
    question: '执行下面的代码，count的值是多少？\n\n```python\ncount = 0\nfor i in range(1, 6):\n    if i > 3:\n        count += 1\nprint(count)\n```',
    options: [
      '1',
      '2',
      '3'
    ],
    answer: 1, // B
    explanation: 'i的值是1,2,3,4,5，满足i>3的有4和5，所以count+=1执行2次，count=2。\n\n数学知识：这是计数问题，在给定范围内满足条件的元素有多少个。',
    hint: 'i>3的数有4和5，共2个'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '等量关系',
    question: '停车场内停了汽车(4轮)和摩托(2轮)，共6辆车20个轮子。下面哪个条件是正确的？\n\n```python\nfor car in range(7):\n    moto = 6 - car\n    if _______:\n        print(car, moto)\n```',
    options: [
      'car + moto == 20',
      'car * 4 + moto * 2 == 20',
      'car * 2 + moto * 4 == 20'
    ],
    answer: 1, // B
    explanation: '汽车4个轮子(car*4)，摩托2个轮子(moto*2)，总轮数20，所以条件是car*4 + moto*2 == 20。\n\n数学知识：这是"等量关系"或"方程"思想，用数学式子表示现实问题的约束条件。',
    hint: '汽车4轮，摩托2轮，加起来是20'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '逻辑推理',
    question: '笼子里有鸡和兔共8只，鸡有2只脚，兔有4只脚。如果笼子里共有26只脚，那么鸡和兔各有多少只？\n\n用枚举法代码：\n```python\nfor ji in range(9):\n    tu = 8 - ji\n    if ji*2 + tu*4 == 26:\n        print(ji, tu)\n```',
    options: [
      '鸡3只，兔5只',
      '鸡4只，兔4只',
      '鸡5只，兔3只'
    ],
    answer: 0, // A
    explanation: '验证各选项：\nA. 鸡3只(6脚) + 兔5只(20脚) = 26脚 ✓\nB. 鸡4只(8脚) + 兔4只(16脚) = 24脚 ×\nC. 鸡5只(10脚) + 兔3只(12脚) = 22脚 ×\n\n正确答案是A：鸡3只，兔5只。',
    hint: '鸡2脚，兔4脚，验证哪个组合的脚数是26'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '组合问题',
    question: '夏小满有3件上衣和4件下装，请问有多少种不同的搭配方式？\n\n用枚举统计：\n```python\ncount = 0\nfor shirt in range(3):\n    for pants in range(4):\n        count += 1\nprint(count)\n```',
    options: [
      '7种',
      '12种',
      '3种'
    ],
    answer: 1, // B
    explanation: '外循环3次（3件上衣），内循环4次（4件下装），3×4=12种搭配。\n\n数学知识：这是"乘法原理"，完成搭配需要两步，选上衣有3种方法，选下装有4种方法，共3×4=12种方法。',
    hint: '3件上衣 × 4件下装 = ？'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '优化问题',
    question: '有10枚硬币，其中有一些是1元，有一些是5角，总价值是7元。下面哪个程序能正确找出1元和5角的硬币数量？\n\n```python\nfor one in range(11):\n    five = 10 - one\n    if one * 1 + five * 0.5 == 7:\n        print(one, five)\n```',
    options: [
      '这个程序错误，应该用两层循环',
      '这个程序正确',
      '这个程序错误，range应该是10'
    ],
    answer: 1, // B
    explanation: '这个程序是正确的！用优化枚举法，只需要一层循环。\n\none是一元硬币数量(0-10)，five=10-one是五角硬币数量。\n\n验证：如果one=4,five=6，则4×1+6×0.5=4+3=7元，符合条件！\n\n数学知识：这是优化思维的体现，利用"总数=甲+乙"的关系减少一层循环。',
    hint: '10枚硬币总数，知道1元数量就能算出5角数量'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L9-4',
  title: '美食大作战',
  subtitle: '用枚举法解决经典数学问题',
  difficulty: '进阶',
  estimatedTime: '35-50分钟',
  learningGoals: [
    '理解计数变量的使用方法',
    '掌握鸡兔同笼问题的枚举解法',
    '学会用枚举法解决实际问题',
    '理解优化枚举（减少循环层次）的思路'
  ],
  prerequisites: [
    'Python基础语法',
    'for循环',
    'if条件判断',
    '基本的数学等量关系'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['count', 'range', 'total', 'solve', 'head', 'foot'],
  medium: ['chicken', 'rabbit', 'puzzle', 'answer', 'bee', 'cage'],
  hard: ['enumeration', 'equation', 'algorithm', 'optimize', 'honey']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'for i in range(10):',
    'count = 0',
    'count += 1',
    'if i + j == 10:'
  ],
  medium: [
    'for ji in range(6):\n    for tu in range(6):',
    'if ji + tu == 5:',
    'print(ji, tu)',
    'moto = 6 - car'
  ],
  hard: [
    'for i in range(n):\n    j = total - i\n    if condition:',
    'if car * 4 + moto * 2 == 20:',
    'count = 0\nfor item in items:\n    if item > threshold:\n        count += 1',
    'def solve_puzzle(heads, feet):'
  ]
}

// 导出所有数据
export const L9_4_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L9_4_data
