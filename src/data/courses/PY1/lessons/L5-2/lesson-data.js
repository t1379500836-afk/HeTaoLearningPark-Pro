/**
 * PY1 课程 L5-2: 字符串索引
 *
 * 核心知识点:
 * 1. 字符串索引 - s[0] 获取第一个字符
 * 2. len() 命令 - 获取字符串长度
 * 3. 字符串拼接 - 连接字符串
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'info',
    pronunciation: '[ˈɪnfəʊ]',
    partOfSpeech: 'n.',
    meaning: '信息；消息',
    level: 'easy',
    example: 'Check the latest info.',
    exampleTranslation: '查看最新消息。',
    source: 'ocr'
  },
  {
    word: 'index',
    pronunciation: '[ˈɪndeks]',
    partOfSpeech: 'n.',
    meaning: '索引；指数',
    level: 'medium',
    example: 'The index of the book.',
    exampleTranslation: '这本书的索引。',
    source: 'ocr'
  },
  {
    word: 'length',
    pronunciation: '[leŋθ]',
    partOfSpeech: 'n.',
    meaning: '长度',
    level: 'medium',
    example: 'The length of the rope.',
    exampleTranslation: '绳子的长度。',
    source: 'ocr'
  },
  {
    word: 'idiom',
    pronunciation: '[ˈɪdɪəm]',
    partOfSpeech: 'n.',
    meaning: '习语；成语',
    level: 'hard',
    example: 'Learn Chinese idioms.',
    exampleTranslation: '学习中文成语。',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'string',
    pronunciation: '[strɪŋ]',
    partOfSpeech: 'n.',
    meaning: '字符串',
    level: 'easy',
    example: 'This is a string of characters.',
    exampleTranslation: '这是一串字符。',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '字符串索引',
    emoji: '🔢',
    gradeLevel: '3-4',
    summary: '通过索引获取字符串中的字符',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '字符串就像一排小格子，每个格子里放一个字符。索引就是格子的编号，从 0 开始数。',
      concept: '字符串的索引从 0 开始，第一个字符的索引是 0，第二个是 1，以此类推。',
      syntax: `s = 'hello'
s[0]  # 第一个字符 'h'
s[1]  # 第二个字符 'e'`,
      example: {
        title: '字符串索引',
        code: `s = 'hello'
print(s[0])
print(s[1])
print(s[2])`,
        output: 'h\ne\nl',
        explanation: 's[0] 是第一个字符 h，s[1] 是第二个字符 e，s[2] 是第三个字符 l。'
      },
      practice: [
        {
          question: '字符串 "cat" 中，c 的索引是多少？',
          answer: '0'
        },
        {
          question: 's = "Python"，s[0] 是什么？',
          answer: 'P'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '字符串有多长，最后一个字符的索引就是长度减 1。可以用 len() 来获取长度。',
      concept: 'len(字符串) 返回字符串的字符个数。最大索引是 len(s) - 1。',
      syntax: `s = 'hello'
len(s)      # 5
s[len(s)-1]  # 'o' 最后一个字符`,
      example: {
        title: '获取字符串长度',
        code: `s = 'hello'
print(len(s))
print(s[len(s)-1])`,
        output: '5\no',
        explanation: 'len(s) 返回 5，因为 hello 有 5 个字符。最后一个字符 o 的索引是 4，即 len(s)-1。'
      },
      practice: [
        {
          question: 'len("world") 返回多少？',
          answer: '5'
        },
        {
          question: '如何获取字符串的最后一个字符？',
          answer: 's[len(s)-1]'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '索引越界会报错，要小心。获取字符时要确保索引在有效范围内。',
      concept: '索引从 0 到 len(s)-1，超出这个范围会报错。空字符串长度是 0，没有字符。',
      syntax: `# 索引范围检查
s = 'hello'
if len(s) > 3:
    print(s[3])  # 安全访问`,
      example: {
        title: '安全使用索引',
        code: `s = 'hello'
print(s[0])   # 第一个
print(s[4])   # 最后一个
print(s[-1])  # 也可以用负数倒着数`,
        output: 'h\no\no',
        explanation: 's[-1] 是倒数第一个字符，也就是最后一个。负数索引从 -1 开始倒着数。'
      },
      practice: [
        {
          question: 's[-2] 表示什么？',
          answer: '倒数第二个字符'
        },
        {
          question: '如何获取字符串的倒数第一个字符？',
          answer: 's[-1] 或 s[len(s)-1]'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: 'len() 命令',
    emoji: '📏',
    gradeLevel: '3-4',
    summary: '获取字符串的字符个数',

    // 🟢 基础版（1-2年级）
    easy: {
      story: 'len() 就像一把尺子，可以量出字符串有几个字符。',
      concept: 'len(字符串) 返回字符串中字符的数量。',
      syntax: `len('hello')  # 5
len('cat')   # 3`,
      example: {
        title: '测量长度',
        code: `print(len('hello'))
print(len('cat'))
print(len('python'))`,
        output: '5\n3\n6',
        explanation: 'hello 有 5 个字符，cat 有 3 个，python 有 6 个。'
      },
      practice: [
        {
          question: 'len("apple") 返回多少？',
          answer: '5'
        },
        {
          question: '空字符串的长度是多少？',
          answer: '0'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'len() 可以和其他命令组合使用，比如获取最后一个字符 s[len(s)-1]。',
      concept: 'len() 的返回值是一个数字，可以参与各种运算。',
      syntax: `s = 'hello'
last_index = len(s) - 1  # 4
print(s[last_index])     # 'o'`,
      example: {
        title: '结合使用',
        code: `s = 'python'
n = len(s)
print('长度是', n)
print('最后一个是', s[n-1])`,
        output: '长度是 6\n最后一个是 n',
        explanation: '先获取长度 6，用 n-1 得到最大索引 5，然后获取最后一个字符 n。'
      },
      practice: [
        {
          question: 's = "world", len(s) - 1 是多少？',
          answer: '4'
        },
        {
          question: '如何获取字符串的倒数第二个字符？',
          answer: 's[len(s)-2]'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '字符串中空格也算一个字符，中文也是一个字符。',
      concept: 'len() 计算所有字符，空格、标点都算。',
      syntax: `len('hello world')  # 11（含空格）
len('你好')     # 2（中文每个字算一个）`,
      example: {
        title: '中英文长度',
        code: `s1 = 'hello world'
s2 = '你好'
print(len(s1))
print(len(s2))`,
        output: '11\n2',
        explanation: 'hello world 有 11 个字符（包括空格），你好是 2 个字符。'
      },
      practice: [
        {
          question: 'len("hi there") 返回多少？',
          answer: '8'
        },
        {
          question: '中文字符串长度怎么算？',
          answer: '每个中文汉字算一个字符'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '字符串拼接',
    emoji: '🔗',
    gradeLevel: '3-4',
    summary: '将多个字符串连接在一起',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '字符串拼接就像把珠子串在一起，把多个字符串连成一个。',
      concept: '用 + 号可以连接字符串，把它们拼接在一起。',
      syntax: `'hello' + 'world'  # 'helloworld'`,
      example: {
        title: '拼接字符串',
        code: `s1 = 'hello'
s2 = 'world'
print(s1 + s2)
print(s1 + ' ' + s2)`,
        output: 'helloworld\nhello world',
        explanation: 's1 + s2 得到 helloworld，中间加空格需要 + " "。'
      },
      practice: [
        {
          question: `"abc" + "def" 结果是什么？`,
          answer: '"abcdef"'
        },
        {
          question: '如何把 "hello" 和 "Python" 连在一起？',
          answer: '"hello" + "Python"'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '字符串和数字不能直接用 + 号拼接，需要先把数字转成字符串。',
      concept: 'str(数字) 可以把数字转换成字符串，然后再拼接。',
      syntax: `num = 5
print('数字是' + str(num))`,
      example: {
        title: '数字转字符串',
        code: `num = 123
s = '第' + str(num) + '次'
print(s)`,
        output: '第123次',
        explanation: '先用 str(num) 把数字 123 转成字符串 "123"，然后拼接成"第123次"。'
      },
      practice: [
        {
          question: 'str(456) 返回什么类型？',
          answer: '字符串'
        },
        {
          question: '如何把数字 99 和字符串 "元" 连接？',
          answer: 'str(99) + "元" 或 "99元"'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '综合使用索引和拼接，可以从字符串中提取部分内容并组合。',
      concept: '可以从字符串中提取特定位置的字符，组合成新的字符串。',
      syntax: `s = 'abcdef'
new_s = s[0] + s[2] + s[4]  # 'ace'`,
      example: {
        title: '提取并拼接',
        code: `s = 'abcdef'
result = s[0] + s[3]
print(result)`,
        output: 'ad',
        explanation: 's[0] 是 a，s[3] 是 d，拼接起来是 ad。'
      },
      practice: [
        {
          question: 's = "Python"，s[0]+s[5] 是什么？',
          answer: '"Pn"'
        },
        {
          question: '如何提取字符串的前两个和后两个字符？',
          answer: 's[0] + s[1] + s[len(s)-2] + s[len(s)-1]'
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
    mathConcept: '索引理解',
    question: 's = "hello"，s[1] 是什么？',
    options: [
      'h',
      'e',
      'l',
      'o'
    ],
    answer: 1,
    explanation: '字符串索引从 0 开始，所以 s[0]=h，s[1]=e，s[2]=l，s[3]=l，s[4]=o。答案是 B。',
    hint: '索引从 0 开始'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '长度理解',
    question: 'len("cat") 返回多少？',
    options: [
      '2',
      '3',
      '4',
      '5'
    ],
    answer: 1,
    explanation: 'cat 有 3 个字符，所以 len("cat") 返回 3。答案是 B。',
    hint: 'len() 返回字符个数'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '获取最后一个字符',
    question: 's = "python"，如何获取最后一个字符？',
    options: [
      's[6]',
      's[5]',
      's[0]',
      's[len(s)]'
    ],
    answer: 1,
    explanation: 'python 有 6 个字符，索引是 0-5，最后一个字符索引是 5（也是 len(s)-1）。s[6] 会越界。答案是 B。',
    hint: '最后一个索引是长度减1'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '字符串拼接',
    question: `"abc" + "def" 的结果是？`,
    options: [
      'abcdef',
      'abc def',
      'abc+def',
      '报错'
    ],
    answer: 0,
    explanation: '字符串用 + 号拼接，直接把两个字符串连在一起。答案是 A。',
    hint: '+ 号用于字符串拼接'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合应用',
    question: 's = "hello"，s[len(s)-1] 是什么？',
    options: [
      'h',
      'e',
      'l',
      'o'
    ],
    answer: 3,
    explanation: 'len(s)=5，所以 len(s)-1=4，s[4] 是最后一个字符 o。答案是 D。',
    hint: 'len(s)-1 是最大索引'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '负数索引',
    question: 's = "python"，s[-2] 是什么？',
    options: [
      'p',
      'y',
      'o',
      'n'
    ],
    answer: 1,
    explanation: 's[-1] 是最后一个字符 n，s[-2] 是倒数第二个字符 o。答案是 C。',
    hint: '负数索引从 -1 开始倒数'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L5-2',
  title: '字符串索引',
  subtitle: '通过编号获取字符',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解字符串索引的概念',
    '掌握用 [] 获取指定位置字符',
    '掌握 len() 获取字符串长度',
    '能用索引和拼接处理字符串'
  ],
  prerequisites: [
    '理解字符串的概念',
    '知道什么是变量'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['info', 'index', 'string', 'char'],
  medium: ['length', 'index', 'access', 'element'],
  hard: ['string', 'subscript', 'negative', 'concatenation']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    "s = 'hello'",
    "s[0]",
    "s[1]",
    'len(s)'
  ],
  medium: [
    "s[len(s)-1]",
    "s[-1]",
    "s[-2]",
    "s1 + s2"
  ],
  hard: [
    "s = 'python'\ns[len(s)-1]",
    "num = 123\nstr(num)",
    "s = 'hello'\ns[0] + s[4]",
    "len('你好')"
  ]
}

// 导出所有数据
export const L5_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L5_2_data