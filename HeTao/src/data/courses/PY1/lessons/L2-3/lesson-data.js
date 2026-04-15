/**
 * PY1 课程 L2-3: 列表索引
 *
 * 核心知识点:
 * 1. 列表索引 - 访问列表中的元素
 * 2. 索引规则 - 从0开始计数
 * 3. 负索引 - 从末尾访问元素
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'color',
    pronunciation: "['kʌlər]",
    partOfSpeech: 'n./v.',
    meaning: '颜色；着色；色素；染；歪曲',
    level: 'easy',
    example: 'What color do you like?',
    exampleTranslation: '你喜欢什么颜色？',
    note: 'color 颜色'
  },
  {
    word: 'red',
    pronunciation: '[red]',
    partOfSpeech: 'n./adj.',
    meaning: '红色；红葡萄酒；红的；红色的',
    level: 'easy',
    example: 'red wine 红酒',
    exampleTranslation: '红酒',
    note: 'red 红色'
  },
  {
    word: 'blue',
    pronunciation: '[bluː]',
    partOfSpeech: 'adj./n.',
    meaning: '蓝色的；忧郁的；蓝色；天蓝色',
    level: 'easy',
    example: 'blue sky 蓝天',
    exampleTranslation: '蓝天',
    note: 'blue 蓝色'
  },
  // 拓展单词
  {
    word: 'index',
    pronunciation: "['ɪndeks]",
    partOfSpeech: 'n./v.',
    meaning: '索引；指数；指标；做索引',
    level: 'medium',
    example: 'Use index to get the element.',
    exampleTranslation: '用索引获取元素。',
    note: '列表索引从0开始'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '魔法编号 - 列表索引',
    emoji: '🔢',
    gradeLevel: '1-2',
    summary: '用索引访问列表中的元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象每个人都有自己的学号，老师只要叫学号，就能找到对应的人！列表中的每个元素也有这样的"学号"，叫做索引。',
      concept: '列表中的每个元素都有一个索引，从0开始。用方括号[]加索引可以访问对应的元素。',
      syntax: '列表名[索引]',
      example: {
        title: '访问列表元素',
        code: 'fruits = ["苹果", "香蕉", "橙子"]\nprint(fruits[0])\nprint(fruits[1])\nprint(fruits[2])',
        output: '苹果\n香蕉\n橙子',
        explanation: 'fruits[0]是第一个元素"苹果"，fruits[1]是第二个元素"香蕉"，fruits[2]是第三个元素"橙子"。'
      },
      practice: [
        {
          question: '列表的索引从几开始？',
          answer: '从0开始'
        },
        {
          question: 'fruits[0] 表示第几个元素？',
          answer: '第1个元素'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的编号系统升级了！你可以快速找到任何位置的学生，甚至可以修改任何位置的信息！',
      concept: '索引是访问列表元素的关键。可以读取元素值，也可以修改元素值。索引必须是一个整数。',
      syntax: '# 读取元素\nvalue = list[index]\n# 修改元素\nlist[index] = new_value',
      example: {
        title: '修改列表元素',
        code: 'scores = [80, 90, 85]\nprint("修改前:", scores)\nscores[1] = 95\nprint("修改后:", scores)',
        output: '修改前: [80, 90, 85]\n修改后: [80, 95, 85]',
        explanation: 'scores[1]原本是90，用scores[1]=95把它改成95。索引1表示第二个元素。'
      },
      practice: [
        {
          question: '索引可以是小数吗？',
          answer: '不可以，索引必须是整数'
        },
        {
          question: '如何修改列表的第3个元素？',
          answer: '使用 list[2] = 新值（因为索引从0开始，第3个元素的索引是2）'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '索引大师模式！你可以用变量作为索引，甚至用表达式计算索引，实现灵活的元素访问！',
      concept: '索引可以是任何结果为整数的表达式。这允许你用循环遍历列表，或根据条件动态访问元素。',
      syntax: 'list[i]  # i是变量\nlist[i+1]  # 使用表达式\nlist[int(x)]  # 类型转换',
      example: {
        title: '动态索引访问',
        code: 'colors = ["红", "黄", "蓝", "绿"]\ni = 2\nprint(colors[i])\nprint(colors[i+1])',
        output: '蓝\n绿',
        explanation: 'i=2，所以colors[i]即colors[2]是"蓝"。colors[i+1]即colors[3]是"绿"。'
      },
      practice: [
        {
          question: 'colors[i+1] 和 colors[i] + 1 有什么区别？',
          answer: '前者访问索引为i+1的元素，后者是colors[i]的值加1（如果是数字的话）'
        },
        {
          question: '如何用循环遍历列表的所有索引？',
          answer: '用 for i in range(len(list)) 或 for item in list'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '从零开始 - 索引规则',
    emoji: '🚩',
    gradeLevel: '1-2',
    summary: '理解索引从0开始的规则',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象一排楼梯，第1级台阶的编号是0，第2级是1，第3级是2...这就是Python的索引规则！',
      concept: 'Python中索引从0开始，不是从1开始。第1个元素的索引是0，第2个是1，依此类推。',
      syntax: '第1个元素: list[0]\n第2个元素: list[1]\n第3个元素: list[2]',
      example: {
        title: '索引与位置对应',
        code: 'animals = ["猫", "狗", "兔", "鸟"]\nprint("索引0:", animals[0])\nprint("索引1:", animals[1])\nprint("索引2:", animals[2])',
        output: '索引0: 猫\n索引1: 狗\n索引2: 兔',
        explanation: '索引0对应第1个元素，索引1对应第2个元素，索引2对应第3个元素。'
      },
      practice: [
        {
          question: '第5个元素的索引是多少？',
          answer: '是4，因为索引从0开始'
        },
        {
          question: '为什么索引要从0开始？',
          answer: '这是计算机科学的设计传统，从0开始计数在很多编程语言中都是标准'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你已经熟悉了索引规则！现在你可以快速计算任何位置的索引，甚至解决实际的问题！',
      concept: '索引 = 位置 - 1。如果有n个元素，有效索引范围是0到n-1。访问超出范围的索引会报错。',
      syntax: '索引范围: 0 到 len(list)-1\nlist[len(list)-1]  # 最后一个元素',
      example: {
        title: '访问最后一个元素',
        code: 'nums = [10, 20, 30, 40, 50]\nlast_index = len(nums) - 1\nprint("最后一个:", nums[last_index])',
        output: '最后一个: 50',
        explanation: '列表有5个元素，len(nums)=5，最后一个元素的索引是5-1=4，所以nums[4]是50。'
      },
      practice: [
        {
          question: '10个元素的列表，最后一个元素的索引是多少？',
          answer: '是9（10-1=9）'
        },
        {
          question: '访问索引100会发生什么？',
          answer: '会报错，因为索引超出范围'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '索引专家模式！你可以精确计算索引范围，避免越界错误，并用索引实现复杂的数据操作！',
      concept: '理解索引边界是编程的重要技能。可以用条件检查索引是否有效，或使用异常处理避免程序崩溃。',
      syntax: 'if 0 <= index < len(list):\n    安全访问\ntry:\n    list[index]\nexcept:\n    处理错误',
      example: {
        title: '安全的索引访问',
        code: 'fruits = ["苹果", "香蕉", "橙子"]\nindex = 5\nif index < len(fruits):\n    print(fruits[index])\nelse:\n    print("索引超出范围")',
        output: '索引超出范围',
        explanation: 'index=5超出了列表范围（有效索引是0、1、2），所以条件判断后打印提示信息而不是报错。'
      },
      practice: [
        {
          question: 'len(list) 返回什么？',
          answer: '返回列表中元素的个数'
        },
        {
          question: '如何检查索引是否有效？',
          answer: '用 if index >= 0 and index < len(list) 检查'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '倒着数 - 负索引',
    emoji: '🔙',
    gradeLevel: '1-2',
    summary: '用负数从列表末尾访问元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '有时候你想从队伍的最后开始数，Python允许你用负数索引来实现！-1表示最后一个，-2表示倒数第二个...',
      concept: '负索引从列表末尾开始计数。-1是最后一个元素，-2是倒数第二个，依此类推。',
      syntax: 'list[-1]  # 最后一个\nlist[-2]  # 倒数第二个\nlist[-3]  # 倒数第三个',
      example: {
        title: '使用负索引',
        code: 'colors = ["红", "黄", "蓝", "绿"]\nprint(colors[-1])\nprint(colors[-2])',
        output: '绿\n蓝',
        explanation: 'colors[-1]是最后一个元素"绿"，colors[-2]是倒数第二个元素"蓝"。'
      },
      practice: [
        {
          question: '-1 表示哪个元素？',
          answer: '最后一个元素'
        },
        {
          question: '如何用负索引访问倒数第3个元素？',
          answer: '用 list[-3]'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的倒数技巧升级了！你可以用正索引和负索引灵活地访问同一个元素，选择更方便的方式！',
      concept: '正索引和负索引可以访问同一个元素。对于长度为n的列表，索引i和索引i-n是同一个元素。',
      syntax: '# 等价关系\nlist[-1] == list[n-1]\nlist[-2] == list[n-2]',
      example: {
        title: '正索引和负索引',
        code: 'nums = [10, 20, 30, 40, 50]\nprint("正索引[4]:", nums[4])\nprint("负索引[-1]:", nums[-1])\nprint("正索引[3]:", nums[3])\nprint("负索引[-2]:", nums[-2])',
        output: '正索引[4]: 50\n负索引[-1]: 50\n正索引[3]: 40\n负索引[-2]: 40',
        explanation: 'nums[4]和nums[-1]都是最后一个元素50，nums[3]和nums[-2]都是倒数第二个元素40。'
      },
      practice: [
        {
          question: '有7个元素的列表，索引-3等于正索引多少？',
          answer: '等于正索引4（7-3=4）'
        },
        {
          question: '什么时候用负索引更方便？',
          answer: '想访问最后几个元素时，不用计算列表长度'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '负索引大师模式！你可以灵活切换正负索引，处理各种列表操作场景！',
      concept: '熟练使用正负索引可以简化代码。负索引特别适合获取列表末尾的元素，避免计算len(list)。',
      syntax: '# 常用模式\nlast = list[-1]\nsecond_last = list[-2]\nfirst = list[0]',
      example: {
        title: '灵活运用索引',
        code: 'data = [5, 10, 15, 20, 25]\nfirst = data[0]\nlast = data[-1]\nsecond_last = data[-2]\nprint("首:" + str(first) + ", 尾:" + str(last) + ", 次尾:" + str(second_last))',
        output: '首:5, 尾:25, 次尾:20',
        explanation: '用data[0]获取第一个元素，用data[-1]获取最后一个，用data[-2]获取倒数第二个，非常方便。'
      },
      practice: [
        {
          question: '如何获取列表的最后3个元素？',
          answer: '用 list[-3:] 切片，或 list[-3], list[-2], list[-1]'
        },
        {
          question: 'data[-0] 和 data[0] 有区别吗？',
          answer: '没有区别，-0等于0，都表示第一个元素'
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
    question: '执行下面的代码，会打印什么？\n\n```python\nfruits = ["苹果", "香蕉", "橙子", "葡萄"]\nprint(fruits[2])\n```\n\nA. 苹果\nB. 香蕉\nC. 橙子\nD. 葡萄',
    options: [
      'A. 苹果',
      'B. 香蕉',
      'C. 橙子',
      'D. 葡萄'
    ],
    answer: 2, // C
    explanation: '索引从0开始：\n- fruits[0] = "苹果"\n- fruits[1] = "香蕉"\n- fruits[2] = "橙子"\n- fruits[3] = "葡萄"\n\n所以fruits[2]输出"橙子"。\n\n数学知识：这是位置索引问题，索引2对应第3个元素。',
    hint: '索引0是第1个，索引1是第2个，索引2是第3个'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '位置索引',
    question: '下面哪个代码能打印列表的最后一个元素？\n\n```python\nnums = [5, 10, 15, 20, 25]\n```\n\nA. print(nums[5])\nB. print(nums[4])\nC. print(nums[-1])\nD. B和C都对',
    options: [
      'A. print(nums[5])',
      'B. print(nums[4])',
      'C. print(nums[-1])',
      'D. B和C都对'
    ],
    answer: 3, // D
    explanation: '列表有5个元素：\n- nums[4]是第5个元素（索引0-4）\n- nums[-1]是最后一个元素（负索引）\n\n两者都能打印最后一个元素25。\n\nnums[5]会报错，因为没有索引5。\n\n数学知识：5个元素的索引是0、1、2、3、4，或者用-1表示最后。',
    hint: '最后一个元素可以用正索引4或负索引-1'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '算式计算',
    question: '执行下面的代码，会打印什么？\n\n```python\nnums = [3, 6, 9, 12, 15]\ni = 2\nprint(nums[i] + nums[i+1])\n```\n\nA. 11\nB. 21\nC. 18\nD. 15',
    options: [
      'A. 11',
      'B. 21',
      'C. 18',
      'D. 15'
    ],
    answer: 1, // B
    explanation: 'i=2，所以：\n- nums[i] = nums[2] = 9\n- nums[i+1] = nums[3] = 12\n- 9 + 12 = 21\n\n输出21。\n\n数学知识：这是索引计算问题，需要先计算索引值再相加。',
    hint: '先算出 nums[2] 和 nums[3] 分别是多少'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '算式计算',
    question: '执行下面的代码，会输出什么？\n\n```python\nscores = [80, 90, 85, 95, 88]\nprint(scores[1] + scores[-2])\n```\n\nA. 170\nB. 175\nC. 180\nD. 185',
    options: [
      'A. 170',
      'B. 175',
      'C. 180',
      'D. 185'
    ],
    answer: 3, // D
    explanation: '- scores[1] = 90（第2个元素）\n- scores[-2] = 95（倒数第2个元素）\n- 90 + 95 = 185\n\n输出185。\n\n数学知识：这是正负索引计算问题，需要先确定两个索引对应的元素再相加。',
    hint: '找出正索引1和负索引-2对应的元素'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '变量计算',
    question: '执行下面的代码，最后i的值是多少？\n\n```python\nnums = [10, 20, 30, 40]\ni = 0\nwhile i < len(nums):\n    i = i + 1\nprint(i)\n```\n\nA. 3\nB. 4\nC. 5\nD. 出错',
    options: [
      'A. 3',
      'B. 4',
      'C. 5',
      'D. 出错'
    ],
    answer: 1, // B
    explanation: 'len(nums)=4，循环过程：\n- i=0: 0<4成立, i=0+1=1\n- i=1: 1<4成立, i=1+1=2\n- i=2: 2<4成立, i=2+1=3\n- i=3: 3<4成立, i=3+1=4\n- i=4: 4<4不成立，退出\n\n最后i=4。\n\n数学知识：这是计数循环问题，i从0累加到4，共循环4次。',
    hint: 'len(nums) 是 4，i 从 0 开始每次加 1，什么时候不满足 <4？'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '累加计算',
    question: '执行下面的代码，会打印什么？\n\n```python\nnums = [5, 3, 8, 2, 7]\ntotal = 0\nfor i in range(len(nums)):\n    if nums[i] > 5:\n        total = total + nums[i]\nprint(total)\n```\n\nA. 15\nB. 20\nC. 25\nD. 18',
    options: [
      'A. 15',
      'B. 20',
      'C. 25',
      'D. 18'
    ],
    answer: 0, // A
    explanation: '遍历索引0到4，累加大于5的元素：\n- i=0: nums[0]=5, 5>5不成立，跳过\n- i=1: nums[1]=3, 3>5不成立，跳过\n- i=2: nums[2]=8, 8>5成立, total=0+8=8\n- i=3: nums[3]=2, 2>5不成立，跳过\n- i=4: nums[4]=7, 7>5成立, total=8+7=15\n\n最后total=15。\n\n数学知识：这是条件求和问题，只累加符合条件的元素：8+7=15。',
    hint: '找出列表中大于5的元素并累加'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L2-3',
  title: '列表索引',
  subtitle: '学会用索引访问列表元素',
  difficulty: '进阶',
  estimatedTime: '30-40分钟',
  learningGoals: [
    '理解列表索引的基本概念',
    '掌握索引从0开始的规则',
    '学会使用负索引访问元素',
    '避免索引越界错误'
  ],
  prerequisites: [
    '掌握 print() 命令',
    '理解列表的基本概念',
    '会使用变量',
    '了解 while 和 for 循环'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['index', 'list', 'first', 'last'],
  medium: ['element', 'access', 'position', 'range'],
  hard: ['negative', 'boundary', 'iteration', 'subscript']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'fruits = ["苹果", "香蕉"]',
    'print(fruits[0])',
    'print(fruits[-1])',
    'colors = ["红", "黄", "蓝"]'
  ],
  medium: [
    'nums = [10, 20, 30, 40]\nprint(nums[2])',
    'items = ["a", "b", "c", "d"]\nprint(items[-1])',
    'scores = [80, 90, 85]\nscores[1] = 95',
    'print(len(items))'
  ],
  hard: [
    'nums = [5, 10, 15, 20, 25]\nfor i in range(len(nums)):\nprint(nums[i])',
    'data = [1, 2, 3, 4, 5]\nprint(data[0], data[-1])',
    'items = ["a", "b", "c", "d", "e"]\nfor i in range(len(items)):\nif items[i] == "c":\nprint(i)',
    'nums = [10, 20, 30, 40]\ni = 1\nprint(nums[i] + nums[i+1])'
  ]
}

// 导出所有数据
export const L2_3_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L2_3_data
