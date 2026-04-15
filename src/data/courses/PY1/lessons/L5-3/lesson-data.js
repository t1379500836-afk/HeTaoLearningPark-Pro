/**
 * PY1 课程 L5-3: 字符串切片
 *
 * 核心知识点:
 * 1. 字符串切片 - 使用 [起始索引:结束索引] 截取字符串
 * 2. 切片规则 - 包含起始索引，不包含结束索引
 * 3. 省略切片 - 使用 [:n] 或 [n:] 简化切片操作
 */

// 单词卡数据 - OCR 提取 + 拓展
export const vocabData = [
  // OCR 提取的单词（必须包含）
  {
    word: 'address',
    pronunciation: '[əˈdres]',
    partOfSpeech: 'n.',
    meaning: '地址',
    level: 'easy',
    example: 'What is your home address?',
    exampleTranslation: '你的家庭地址是什么？',
    note: '常用的个人信息词汇'
  },
  {
    word: 'age',
    pronunciation: '[eɪdʒ]',
    partOfSpeech: 'n.',
    meaning: '年龄',
    level: 'easy',
    example: 'What is your age?',
    exampleTranslation: '你多大了？',
    note: '最基础的自我介绍词汇'
  },
  {
    word: 'gender',
    pronunciation: '[ˈdʒendə(r)]',
    partOfSpeech: 'n.',
    meaning: '性别',
    level: 'medium',
    example: 'Please select your gender.',
    exampleTranslation: '请选择你的性别。',
    note: '常用表单词汇'
  },
  // 拓展单词 - 更适合小朋友的常用词
  {
    word: 'slice',
    pronunciation: '[slaɪs]',
    partOfSpeech: 'n./v.',
    meaning: '切片；一片',
    level: 'easy',
    example: 'Would you like a slice of pizza?',
    exampleTranslation: '你想要一片披萨吗？',
    note: 'slice 就像切披萨一样简单，孩子们很熟悉'
  },
  {
    word: 'part',
    pronunciation: '[pɑːt]',
    partOfSpeech: 'n.',
    meaning: '部分',
    level: 'easy',
    example: 'This is part of the story.',
    exampleTranslation: '这是故事的一部分。',
    note: '最基础的词汇之一'
  }
]

// 知识点数据 - 基于 OCR 提取
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '字符串切片 - 切面包游戏',
    emoji: '🔪',
    gradeLevel: '3-4',
    summary: '使用切片截取字符串中的一部分字符',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象字符串像是一块长面包，你想吃中间的一段，怎么办？用刀切一下就可以了！字符串切片就是在字符串上"切一刀"！',
      concept: '字符串切片可以截取字符串中的一部分。格式是 字符串[起始索引:结束索引]，结果包含起始索引的字符，不包含结束索引的字符。',
      syntax: "字符串[起始索引:结束索引]",
      example: {
        title: '基本切片',
        code: "s = '我 爱 唱 跳 打 篮 球'\nprint(s[2:4])",
        output: '唱跳',
        explanation: 's[2:4] 切片结果是索引 2 和 3 的字符（不包含索引 4），即"唱跳"。'
      },
      practice: [
        {
          question: 's[1:3] 会获取哪些索引的字符？',
          answer: '索引 1 和 2'
        },
        {
          question: '切片结果包含结束索引的字符吗？',
          answer: '不包含'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '字符串厨师！你可以从字符串中"切"出任何你想要的部分，就像厨师切菜一样精准！',
      concept: '切片时，冒号前的数字是起始位置（包含），冒号后的数字是结束位置（不包含）。可以理解为"从哪里切到哪里（但不包括哪里）"。',
      syntax: "s[:n]    # 从开头切到 n（不包含 n）\ns[n:]    # 从 n 切到结尾\ns[a:b]   # 从 a 切到 b（不包含 b）",
      example: {
        title: '省略切片',
        code: "s = '我 爱 核 桃 编 程'\nprint(s[:2])\nprint(s[2:])\nprint(s[2:4])",
        output: '我 爱\n核 桃 编 程\n核 桃',
        explanation: 's[:2] 获取前两个字符，s[2:] 获取从索引 2 到结尾的所有字符，s[2:4] 获取索引 2 和 3 的字符。'
      },
      practice: [
        {
          question: '如何获取字符串的前 3 个字符？',
          answer: 's[:3]'
        },
        {
          question: '如何获取从索引 3 到结尾的字符？',
          answer: 's[3:]'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '字符串切片大师！掌握切片的各种技巧，可以灵活处理任何字符串，提取需要的信息！',
      concept: '切片是 Python 中处理字符串的强大工具。结合负索引、步长等高级用法，可以实现更复杂的切片操作。',
      syntax: "s[a:b:c]  # 从 a 到 b，步长为 c\ns[::-1]  # 反转字符串\ns[-n:]   # 获取最后 n 个字符",
      example: {
        title: '高级切片',
        code: "s = '我爱核桃编程'\nprint(s[::-1])\nprint(s[-2:])\nprint(s[::2])",
        output: '程序编桃爱我\n编程\n我核编',
        explanation: 's[::-1] 反转字符串，s[-2:] 获取最后 2 个字符，s[::2] 每隔一个字符取一个。'
      },
      practice: [
        {
          question: '如何反转字符串？',
          answer: 's[::-1]'
        },
        {
          question: 's[::2] 是什么意思？',
          answer: '从开头到结尾，每隔一个字符取一个（步长为 2）'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '身份证信息提取 - 切片应用',
    emoji: '📋',
    gradeLevel: '4-5',
    summary: '使用字符串切片从身份证号中提取信息',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '身份证号码里藏着很多秘密！通过切片，我们可以"读出"一个人的出生地、出生年月日和性别！',
      concept: '身份证号码是有规律的，每一部分都有特定含义。使用切片可以提取这些信息。',
      syntax: "id[6:14]    # 提取出生年月日\nid[-2]     # 提取性别码（倒数第二位）",
      example: {
        title: '提取出生年月日',
        code: "id = '510603200012301234'\nbirth = id[6:14]\nprint(birth)",
        output: '20001230',
        explanation: '身份证第 7-14 位是出生年月日，使用 id[6:14] 切片提取（索引从 0 开始）。'
      },
      practice: [
        {
          question: '身份证号第几位开始是出生年月日？',
          answer: '第 7 位（索引 6）'
        },
        {
          question: '如何提取出生年份？',
          answer: 'id[6:10]'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '数据分析师！从身份证号码中提取出生地、出生日期和性别信息，理解数据编码的原理！',
      concept: '身份证号结构：前 6 位是出生地代码，7-14 位是出生年月日，15-17 位是顺序码（奇数男、偶数女），18 位是校验码。',
      syntax: "id[:6]      # 出生地代码\nid[6:14]    # 出生年月日\nid[14:17]   # 顺序码（判断性别）\nid[-1]      # 校验码",
      example: {
        title: '提取性别',
        code: "id = '510603200012302234'\ngender_code = id[16]\nif int(gender_code) % 2 == 0:\n    print('女')\nelse:\n    print('男')",
        output: '女',
        explanation: '第 17 位（索引 16）是性别码，偶数表示女性，奇数表示男性。'
      },
      practice: [
        {
          question: '性别码是奇数表示什么性别？',
          answer: '男'
        },
        {
          question: '如何判断身份证号码的最后一位是奇数还是偶数？',
          answer: 'int(id[-1]) % 2 == 0'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '信息安全专家！深入理解身份证号码的编码规则，验证信息的合法性！',
      concept: '身份证号码不仅是信息的集合，还包含校验机制。可以通过切片和计算验证身份证号的合法性。',
      syntax: "# 校验码计算（简化版）\nweights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]\nchecksum = sum(int(id[i]) * weights[i] for i in range(17)) % 11",
      example: {
        title: '完整身份证信息提取',
        code: "id = '510603200012301234'\n\n# 提取各部分信息\nregion = id[:6]\nbirth = id[6:14]\ngender_code = int(id[16])\n\n# 判断性别\nif gender_code % 2 == 1:\n    gender = '男'\nelse:\n    gender = '女'\n\n# 输出结果\nprint('地区：' + region)\nprint('生日：' + birth)\nprint('性别：' + gender)",
        output: '地区：510603\n生日：20001230\n性别：男',
        explanation: '使用切片提取各个部分信息。用if-else判断性别：性别码为奇数是男，偶数是女。最后用字符串拼接输出结果。'
      },
      practice: [
        {
          question: '如何提取出生月份？',
          answer: 'id[10:12]'
        },
        {
          question: '如何计算年龄？',
          answer: '当前年份 - int(id[6:10])'
        }
      ]
    }
  }
]

// 习题数据 - 6 道（2 基础 + 2 进阶 + 2 挑战）
export const exercises = [
  // 🟢 基础题（2道）
  {
    id: 'ex-1',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '位置与索引',
    question: '字符串 "Hello" 使用 s[1:4] 切片，结果是（）',
    options: ['ello', 'ell', 'Hel', 'ello'],
    answer: 0,
    explanation: 's[1:4] 从索引 1 开始到索引 4（不包含）。H=0, e=1, l=2, l=3, o=4。所以结果是 e, l, l 即 "ello"。',
    hint: '记得包含起始索引，不包含结束索引'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '计数',
    question: '字符串 s = "Python"，s[:3] 的结果是（）',
    options: ['yth', 'Pyt', 'ytho', 'Pyth'],
    answer: 1,
    explanation: 's[:3] 表示从开头到索引 3（不包含），即索引 0, 1, 2 的字符：P, y, t，结果是 "Pyt"。',
    hint: ':3 表示切到索引 3 的位置'
  },

  // 🟡 进阶题（2道）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '位置与切片',
    question: '字符串的切片结果是 \'向前冲\' 的选项是（）\n\n```python\ns = \'小创客向前冲\'\n```',
    options: ['s[3:]', 's[:3]', 's[4:]', 's[:4]'],
    answer: 0,
    explanation: '要获取"向前冲"，需要从索引 3 开始到结尾。0=小, 1=创, 2=客, 3=向, 4=前, 5=冲。因此 s[3:] 可以获取"向前冲"。',
    hint: '"向"字的索引是多少？'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '切片与索引',
    question: '执行下方代码，程序会打印出（）\n\n```python\ns = \'低头思故乡\'\nprint(s[:2])\n```',
    options: ['低', '低头', '低头思', '思故乡'],
    answer: 1,
    explanation: 's[:2] 表示从索引 0 开始到索引 2（不包含），所以是索引 0 和 1 的字符，即"低头"。',
    hint: ':2 表示切到索引 2（不包含）'
  },

  // 🔴 挑战题（2道）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '索引与切片计算',
    question: '运行下方代码，输出结果是？（       ）\n\n```python\ns = 5\ne = s + 3\na = \'苍穹之下，未来可期\'\nprint(a[s:e])\n```',
    options: ['苍穹，未来', '未来', '，未来', '未来可'],
    answer: 2,
    explanation: '首先 s = 5，e = s + 3 = 8。然后对字符串 a 进行切片操作 a[5:8]。索引 5 对应"未"，索引 8 对应"期"，切片结果包含起始索引不包含结束索引，结果是"，未来"。',
    hint: '先计算 s 和 e 的值，再进行切片'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '切片位置计算',
    question: '将代码和其对应的切片结果进行连线：\n\n```python\ns = \'多吃蔬菜可以补充维生素\'\n```',
    options: [
      's[2:4] → 多吃蔬菜',
      's[8:] → 蔬菜',
      's[:4] → 维生素',
      '以上都不对'
    ],
    answer: 3,
    explanation: 's[2:4] 是"蔬菜"（索引 2 和 3），s[8:] 是"维生素"（从索引 8 到结尾），s[:4] 是"多吃蔬菜"（索引 0-3）。以上连线都不正确。',
    hint: '仔细计算每个字符的索引位置'
  }
]

export const lessonMeta = {
  id: 'L5-3',
  title: '字符串切片',
  subtitle: '学会字符串切片操作提取字符',
  difficulty: '进阶',
  estimatedTime: '35-45分钟',
  learningGoals: [
    '理解字符串切片的概念和语法',
    '掌握使用切片截取字符串的方法',
    '学会使用省略切片简化代码',
    '了解字符串切片在实际应用中的场景'
  ],
  prerequisites: [
    'Python 基础语法',
    '字符串索引',
    'L5-1 字符串索引与拼接'
  ]
}

// 打字练习单词
export const typingWords = {
  easy: ['slice', 'cut', 'part', 'piece', 'address', 'age'],
  medium: ['extract', 'portion', 'segment', 'substring', 'gender'],
  hard: ['information', 'extraction', 'processing', 'identifier']
}

// 代码模板
export const typingTemplates = {
  easy: [
    {
      title: '基本切片',
      template: "s = 'Hello World'\nprint(s[_:5])",
      hint: '输入 0 获取前 5 个字符'
    },
    {
      title: '获取前几个字符',
      template: "s = 'Python'\nprint(s[:_])",
      hint: '输入 3 获取前 3 个字符'
    },
    {
      title: '获取后几个字符',
      template: "s = 'Programming'\nprint(s[_])",
      hint: '输入 -3 获取最后 3 个字符'
    },
    {
      title: '中间切片',
      template: "s = 'ABCDEFGHIJ'\nprint(s[2:_])",
      hint: '输入 6 获取索引 2-5 的字符'
    }
  ],
  medium: [
    {
      title: '从某处开始',
      template: "s = 'Hello World'\nprint(s[_])",
      hint: '输入 6: 获取从索引 6 到结尾'
    },
    {
      title: '提取信息',
      template: "id = '510603200012301234'\nbirth = id[_:14]",
      hint: '输入 6 提取出生年月日'
    },
    {
      title: '判断性别',
      template: "gender_code = id[_]",
      hint: '输入 16 获取性别码位置'
    },
    {
      title: '范围切片',
      template: "s = '学习编程很有趣'\nprint(s[2:_])",
      hint: '输入 6 获取"编程很"'
    }
  ],
  hard: [
    {
      title: '反转字符串',
      template: "s = 'Hello'\nprint(s[_])",
      hint: '输入 ::1 反转字符串'
    },
    {
      title: '步长切片',
      template: "s = 'ABCDEFGHIJ'\nprint(s[::_])",
      hint: '输入 2 每隔一个字符取一个'
    },
    {
      title: '复杂提取',
      template: "data = '姓名:张三,年龄:18'\nname = data[3:_]",
      hint: '输入 5 提取"张三"'
    },
    {
      title: '嵌套切片',
      template: "s = 'PythonProgramming'\nprint(s[:6][_])",
      hint: '输入 -1 获取"Python"的最后一个字符'
    }
  ]
}

// 导出所有数据
export const L5_3_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L5_3_data
