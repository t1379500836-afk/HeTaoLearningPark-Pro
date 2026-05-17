/**
 * PY1 课程 L5-4: 字符串切片
 *
 * 核心知识点:
 * 1. 字符串切片 - s[起始:结束] 提取部分字符串
 * 2. 切片规则 - 包含起始，不包含结束
 * 3. 切片应用 - 提取子串
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'address',
    pronunciation: '[əˈdres]',
    partOfSpeech: 'n.',
    meaning: '地址',
    level: 'easy',
    example: 'This is my home address.',
    exampleTranslation: '这是我的家庭地址。',
    source: 'ocr'
  },
  {
    word: 'age',
    pronunciation: '[eɪdʒ]',
    partOfSpeech: 'n.',
    meaning: '年龄',
    level: 'easy',
    example: 'What is your age?',
    exampleTranslation: '你多大了？',
    source: 'ocr'
  },
  {
    word: 'year',
    pronunciation: '[jɪə]',
    partOfSpeech: 'n.',
    meaning: '年',
    level: 'easy',
    example: 'Happy New Year!',
    exampleTranslation: '新年快乐！',
    source: 'ocr'
  },
  {
    word: 'gender',
    pronunciation: '[ˈdʒendə]',
    partOfSpeech: 'n.',
    meaning: '性别',
    level: 'medium',
    example: 'Gender equality.',
    exampleTranslation: '性别平等。',
    source: 'ocr'
  },
  {
    word: 'location',
    pronunciation: '[ləʊˈkeɪʃən]',
    partOfSpeech: 'n.',
    meaning: '位置；地点',
    level: 'medium',
    example: 'The location of the store.',
    exampleTranslation: '商店的位置。',
    source: 'ocr'
  },
  {
    word: 'month',
    pronunciation: '[mʌnθ]',
    partOfSpeech: 'n.',
    meaning: '月份',
    level: 'easy',
    example: 'This month has 31 days.',
    exampleTranslation: '这个月有31天。',
    source: 'ocr'
  },
  {
    word: 'day',
    pronunciation: '[deɪ]',
    partOfSpeech: 'n.',
    meaning: '一天；白天',
    level: 'easy',
    example: 'What day is today?',
    exampleTranslation: '今天是星期几？',
    source: 'ocr'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '字符串切片基础',
    emoji: '🔪',
    gradeLevel: '3-4',
    summary: '用起始和结束索引提取部分字符串',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '字符串切片就像切蛋糕，从面包上切下一片。s[2:4] 表示从第 2 个切到第 4 个（不包含第 4 个）。',
      concept: 's[起始:结束] 提取从起始索引到结束索引前一个字符的子串。',
      syntax: `s = '我爱核桃编程'
s[2:4]  # 提取索引2和3 → '核桃'`,
      example: {
        title: '切一片面包',
        code: `s = '我爱核桃编程'
print(s[2:4])`,
        output: '核桃',
        explanation: 's[2:4] 从索引2切到4（不包含4），所以得到索引2和3的字符："核桃"。'
      },
      practice: [
        {
          question: 's = "hello"，s[1:3] 是什么？',
          answer: '"el"'
        },
        {
          question: '切片包含起始索引吗？',
          answer: '包含'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '切片结果包含起始索引的字符，不包含结束索引的字符。可以理解为"从 X 切到 Y（不含 Y）"。',
      concept: '切片范围 [起始, 结束)，即包含起始，不包含结束。',
      syntax: `# 01234
s = 'hello'
s[1:4]  → 'ell'（索引1,2,3）`,
      example: {
        title: '理解切片范围',
        code: `s = 'hello'
print(s[0:2])  # hel - 索引0和1
print(s[1:4])  # ell - 索引1,2,3
print(s[2:5])  # llo - 索引2,3,4`,
        output: 'he\nell\nllo',
        explanation: 's[0:2] 包含索引0、1；s[1:4] 包含索引1、2、3；s[2:5] 包含索引2、3、4。'
      },
      practice: [
        {
          question: 's = "python"，s[0:3] 是什么？',
          answer: '"pyt"'
        },
        {
          question: '切片为什么不包含结束索引？',
          answer: '这是 Python 的设计规则，方便计算长度'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '理解切片规则后，可以灵活应用。省略起始表示从头开始，省略结束表示到末尾。',
      concept: 's[:n] 等于 s[0:n]，s[n:] 等于 s[n:len(s)]。',
      syntax: `s = 'hello'
s[:3]   # 'hel' - 从头到索引2
s[2:]   # 'llo' - 从索引2到末尾
s[:]    # 'hello' - 整个字符串`,
      example: {
        title: '省略写法',
        code: `s = 'hello'
print(s[:3])   # hel
print(s[2:])    # llo
print(s[:-1])   # hell（去掉最后一个）`,
        output: 'hel\nllo\nhell',
        explanation: 's[:3] 从开始切到索引3（不含），s[2:] 从索引2切到末尾，s[:-1] 去掉最后一个字符。'
      },
      practice: [
        {
          question: 's = "python"，s[:2] 是什么？',
          answer: '"py"'
        },
        {
          question: 's = "hello"，s[1:] 是什么？',
          answer: '"ello"'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '获取两端字符',
    emoji: '✂️',
    gradeLevel: '3-4',
    summary: '用切片获取字符串的开头和结尾',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '获取字符串的前几个字符用 s[:n]，获取后几个字符用 s[-n:]。',
      concept: 's[:n] 获取前 n 个字符，s[-n:] 获取后 n 个字符。',
      syntax: `s = 'hello'
s[:2]   # 'he' 前2个
s[-2:]  # 'lo' 后2个`,
      example: {
        title: '头和尾',
        code: `s = 'hello'
print(s[:2])   # 前2个
print(s[-2:])   # 后2个`,
        output: 'he\nlo',
        explanation: 's[:2] 取前2个字符 he，s[-2:] 取后2个字符 lo。'
      },
      practice: [
        {
          question: 's = "world"，s[:3] 是什么？',
          answer: '"wor"'
        },
        {
          question: 's = "python"，s[-3:] 是什么？',
          answer: '"hon"'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '可以用切片去掉字符串的两端，得到中间部分。',
      concept: 's[n:-m] 去掉前 n 个和后 m 个字符。',
      syntax: `s = 'hello'
s[1:-1]  # 'ell' - 去掉首尾`,
      example: {
        title: '去掉首尾',
        code: `s = 'hello'
print(s[1:-1])  # 去掉第一个和最后一个`,
        output: 'ell',
        explanation: 's[1:-1] 从索引1开始，到最后一个之前（不包含最后一个），所以得到中间部分。'
      },
      practice: [
        {
          question: 's = "python"，s[2:-2] 是什么？',
          answer: '"thon"'
        },
        {
          question: '如何获取字符串中间所有字符？',
          answer: 's[1:-1]'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '切片可以组合使用，或者结合 len() 来动态计算索引。',
      concept: '切片结果仍然是字符串，可以继续操作。',
      syntax: `s = 'hello world'
first = s[:5]    # 'hello'
last = s[-5:]    # 'world'
print(first + last)`,
      example: {
        title: '切片组合',
        code: `s = '二月春风似剪刀'
first = s[:2]
last = s[-3:]
print('前两个:', first)
print('后三个:', last)`,
        output: '前两个: 二月\n后三个: 似剪刀',
        explanation: 's[:2] 取前2个字符"二月"，s[-3:] 取后3个字符"似剪刀"。'
      },
      practice: [
        {
          question: 's = "abcdef"，s[1:5] 是什么？',
          answer: '"bcde"'
        },
        {
          question: '如何获取一个字符串的前一半？',
          answer: 's[:len(s)//2]'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '切片应用',
    emoji: '🎯',
    gradeLevel: '3-4',
    summary: '用切片解决实际问题',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '切片可以用来提取需要的信息，比如从字符串中提取特定部分。',
      concept: '根据需要的字符位置，用切片提取。',
      syntax: `# 从文件名中提取扩展名
filename = 'photo.jpg'
ext = filename[-4:]
print(ext)  # '.jpg'`,
      example: {
        title: '提取扩展名',
        code: `filename = 'photo.jpg'
print('文件名前4位:', filename[:4])
print('文件名后4位:', filename[-4:])`,
        output: '文件名前4位: phot\n文件名后4位: .jpg',
        explanation: '前4位是 "phot"，后4位是 ".jpg"。'
      },
      practice: [
        {
          question: '从 "report.pdf" 中提取 ".pdf" 用什么？',
          answer: 's[-4:]'
        },
        {
          question: '如何提取 "hello" 的后3个字符？',
          answer: 's[-3:]'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '可以用切片提取手机号、身份证号等字符串中的特定位置。',
      concept: '根据位置提取数字串中的部分内容。',
      syntax: `# 手机号：13812345678
phone = '13812345678'
print(phone[:3])   # '138' 前3位
print(phone[7:])    # '678' 后3位`,
      example: {
        title: '提取号码段',
        code: `phone = '13812345678'
mid = phone[3:7]
print('中间4位:', mid)`,
        output: '中间4位: 1234',
        explanation: 'phone[3:7] 提取索引3到6的字符，得到"1234"。'
      },
      practice: [
        {
          question: '如何提取手机号的前3位？',
          answer: 's[:3]'
        },
        {
          question: '如何提取手机号的中间4位？',
          answer: 's[3:7]'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '身份证号中隐藏了很多信息，通过切片可以提取出生日期等内容。',
      concept: '利用身份证号的固定格式，通过切片提取年月日和性别信息。',
      syntax: `id = '510603200012301234'
birthday = id[6:14]
gender = id[-2]
print('生日:', birthday)
print('性别:', '男' if int(gender) % 2 == 1 else '女')`,
      example: {
        title: '解析身份证',
        code: `id = '510603200012301234'
year = id[6:10]
month = id[10:12]
day = id[12:14]
print('出生日期:', year + '-' + month + '-' + day)`,
        output: '出生日期: 2000-12-30',
        explanation: '身份证从索引6开始是年月日，按位置切片提取即可。'
      },
      practice: [
        {
          question: '身份证号 510603200012301234 的出生年是什么？',
          answer: 'id[6:10] → "2000"'
        },
        {
          question: '如何从身份证号判断性别？',
          answer: '看倒数第二位奇数是男，偶数是女'
        }
      ]
    }
  }
]

// 习题数据
export const exercises = [
  // 🟢 基础题（1-2年级）
  {
    id: 'ex-1',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '切片基础',
    question: "s = 'hello'，s[1:3] 是什么？",
    options: [
      'hel',
      'el',
      'ell',
      'lo'
    ],
    answer: 1,
    explanation: "s[1:3] 从索引1切到3（不包含3），得到索引1和2的字符：'el'。答案是 B。",
    hint: '切片包含起始不包含结束'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '获取前N个字符',
    question: "s = 'python'，s[:3] 是什么？",
    options: [
      'pyt',
      'pyth',
      'thon',
      'ytho'
    ],
    answer: 0,
    explanation: "s[:3] 从头开始切到索引3（不包含3），得到索引0、1、2：'pyt'。答案是 A。",
    hint: '省略起始就是从头开始'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '获取后N个字符',
    question: "s = 'hello'，s[-3:] 是什么？",
    options: [
      'hel',
      'ell',
      'llo',
      'lo'
    ],
    answer: 1,
    explanation: "s[-3:] 从倒数第3个开始切到最后，得到索引2、3、4：'ell'。答案是 B。",
    hint: '负数索引从-1开始倒数'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '去掉首尾',
    question: "s = 'hello'，s[1:-1] 是什么？",
    options: [
      'ello',
      'ell',
      'hel',
      'll'
    ],
    answer: 1,
    explanation: "s[1:-1] 从索引1开始，到倒数第1个之前（不包含最后一个），得到索引1、2、3：'ell'。答案是 B。",
    hint: '-1表示最后一个'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合应用',
    question: "s = '二月春风似剪刀'，s[2:4] 是什么？",
    options: [
      '二月',
      '春风',
      '春',
      '春风似'
    ],
    answer: 1,
    explanation: "s[2:4] 从索引2切到4（不包含4），索引2和3是'春风'。答案是 B。",
    hint: '数一数字符串的索引'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '身份证解析',
    question: "身份证号 '510603200012301234' 的出生年是什么？",
    options: [
      '510603',
      '2000',
      '1230',
      '123'
    ],
    answer: 1,
    explanation: "身份证号从索引6开始是8位年月日，s[6:10] 得到 '2000'。答案是 B。",
    hint: '出生年月日从第7位开始'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L5-4',
  title: '字符串切片',
  subtitle: '提取字符串中的片段',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解字符串切片的概念',
    '掌握 s[起始:结束] 的语法',
    '能用切片提取子串',
    '能解决实际的字符串提取问题'
  ],
  prerequisites: [
    '理解字符串索引',
    '知道 len() 的用法'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['address', 'age', 'year', 'day'],
  medium: ['gender', 'location', 'slice', 'range'],
  hard: ['substring', 'extract', 'index', 'boundary']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    "s = 'hello'\ns[1:3]",
    "s = 'python'\ns[:3]",
    "s = 'hello'\ns[-3:]",
    "s = 'world'\ns[:]"
  ],
  medium: [
    "s = 'hello'\ns[1:-1]",
    "s = 'python'\ns[2:5]",
    "s = 'abcdef'\ns[:3]",
    "s = '123456'\ns[2:-2]"
  ],
  hard: [
    "s = '二月春风似剪刀'\ns[:2]",
    "s = 'abcdefgh'\ns[2:-2]",
    "phone = '13812345678'\nphone[3:7]",
    "id = '510603200012301234'\nid[6:14]"
  ]
}

// 导出所有数据
export const L5_4_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L5_4_data