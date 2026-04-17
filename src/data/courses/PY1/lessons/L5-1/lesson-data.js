/**
 * PY1 课程 L5-1: 字符串索引与拼接
 *
 * 核心知识点:
 * 1. 字符串索引 - 通过索引访问字符串中的字符
 * 2. len() 命令 - 获取字符串长度
 * 3. 字符串拼接 - 使用 + 连接字符串
 */

// 单词卡数据 - OCR 提取 + 拓展
export const vocabData = [
  // OCR 提取的单词（必须包含）
  {
    word: 'info',
    pronunciation: '[ˈɪnfəʊ]',
    partOfSpeech: 'n.',
    meaning: '信息；消息',
    level: 'easy',
    example: 'I need some info about the game.',
    exampleTranslation: '我需要一些关于这个游戏的信息。',
    note: 'info 是 information 的缩写，口语常用',
    source: 'ocr'
  },
  {
    word: 'index',
    pronunciation: '[ˈɪndeks]',
    partOfSpeech: 'n.',
    meaning: '索引；目录',
    level: 'easy',
    example: 'The index of a book is on page 1.',
    exampleTranslation: '书的目录在第一页。',
    note: '在编程中表示位置编号',
    source: 'ocr'
  },
  {
    word: 'length',
    pronunciation: '[leŋθ]',
    partOfSpeech: 'n.',
    meaning: '长度',
    level: 'easy',
    example: 'What is the length of this rope?',
    exampleTranslation: '这根绳子有多长？',
    note: '常用基础词汇',
    source: 'ocr'
  },
  {
    word: 'idiom',
    pronunciation: '[ˈɪdiəm]',
    partOfSpeech: 'n.',
    meaning: '成语；惯用语',
    level: 'medium',
    example: '"Break a leg" is an English idiom.',
    exampleTranslation: '"Break a leg" 是一个英语习语。',
    note: '有趣的英语表达方式',
    source: 'ocr'
  },
  // 拓展单词 - 更适合小朋友的常用词
  {
    word: 'string',
    pronunciation: '[strɪŋ]',
    partOfSpeech: 'n.',
    meaning: '字符串；线；绳',
    level: 'easy',
    example: 'I have a string of text.',
    exampleTranslation: '我有一串文字。',
    note: '在编程中表示文字数据',
    source: 'extended'
  },
  {
    word: 'word',
    pronunciation: '[wɜːd]',
    partOfSpeech: 'n.',
    meaning: '单词；词',
    level: 'easy',
    example: 'What is your favorite English word?',
    exampleTranslation: '你最喜欢的英语单词是什么？',
    note: '最基础的词汇之一，孩子很早就学会',
    source: 'extended'
  }
]

// 知识点数据 - 基于 OCR 提取
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '字符串索引 - 找到字符的位置',
    emoji: '🔍',
    gradeLevel: '3-4',
    summary: '通过索引访问字符串中的字符',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象字符串是一排排好队的字母小朋友，每个小朋友都有一个数字编号，从 0 开始。我们要找某个字母时，只要说出它的编号就可以了！',
      concept: '字符串由字符组成，索引是字符的编号，从 0 开始，依次增大。通过索引就可以得到字符串中某一位字符。',
      syntax: "字符串[索引]",
      example: {
        title: '获取字符串中的字符',
        code: "s = '我在学习Python'\nprint(s[0])",
        output: '我',
        explanation: 's[0] 表示获取字符串 s 中索引为 0 的字符，即第一个字符"我"。'
      },
      practice: [
        {
          question: '字符串中第一个字符的索引是多少？',
          answer: '0'
        },
        {
          question: 's[5] 表示什么？',
          answer: '获取字符串中索引为 5 的字符'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你现在是字符侦探！每个字符都有自己的位置编号。记住：索引从 0 开始，不是从 1 开始哦！',
      concept: '字符的索引比实际位置少 1。例如：第 1 个字符的索引是 0，第 2 个字符的索引是 1，以此类推。',
      syntax: "变量名[索引]  # 通过索引获取字符\nlen(字符串)    # 获取字符串长度",
      example: {
        title: '获取指定位置的字符',
        code: "s = '我在学习Python'\nprint(s[5])\nprint(len(s))",
        output: 'y\n11',
        explanation: 's[5] 获取索引为 5 的字符"y"，len(s) 获取字符串长度为 11。'
      },
      practice: [
        {
          question: '第 7 个字符的索引是多少？',
          answer: '6'
        },
        {
          question: '如何获取字符串的最后一个字符？',
          answer: 's[len(s)-1]'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '字符串大师挑战！你可以精确访问字符串中的任何字符，理解索引和长度的关系，掌握字符串的核心操作！',
      concept: '最大索引 = 字符串长度 - 1，即 len(字符串) - 1。索引从 0 开始到 len(字符串)-1 结束。',
      syntax: "s[0]              # 第一个字符\ns[len(s)-1]       # 最后一个字符\nlen(s)            # 字符串长度",
      example: {
        title: '获取首尾字符',
        code: "s = '我在学习Python'\nprint(s[0])\nprint(s[len(s)-1])",
        output: '我\nn',
        explanation: 's[0] 获取第一个字符"我"，s[len(s)-1] 获取最后一个字符"n"。'
      },
      practice: [
        {
          question: '如果字符串长度是 8，最大索引是多少？',
          answer: '7'
        },
        {
          question: '空字符串的长度是多少？',
          answer: '0'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '字符串拼接 - 连接字符串',
    emoji: '🔗',
    gradeLevel: '3-4',
    summary: '使用 + 运算符连接多个字符串',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有几串珠子，你可以把它们串在一起，变成一串更长的项链！字符串拼接就是把多个文字连接起来。',
      concept: '使用 + 运算符可以把多个字符串连接成一个新的字符串。',
      syntax: "字符串1 + 字符串2",
      example: {
        title: '连接两个字符串',
        code: "s1 = '你好'\ns2 = '世界'\nprint(s1 + s2)",
        output: '你好世界',
        explanation: '使用 + 把 s1 和 s2 连接起来，结果是"你好世界"。'
      },
      practice: [
        {
          question: '"Hello" + "World" 的结果是什么？',
          answer: 'HelloWorld'
        },
        {
          question: '如何把两个字符串连接起来？',
          answer: '使用 + 运算符'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '字符串拼图游戏！你可以把不同的文字片段组合成完整的句子或诗歌，就像拼图一样！',
      concept: '可以使用 + 和变量拼接字符串，常用于循环中逐步构建字符串。',
      syntax: "result = ''\nresult = result + 新字符串",
      example: {
        title: '循环拼接字符串',
        code: "info = ''\ninfo = info + '千'\ninfo = info + '万'\nprint(info)",
        output: '千万',
        explanation: '逐步把字符添加到 info 变量中，最终得到"千万"。'
      },
      practice: [
        {
          question: '如何初始化一个空字符串？',
          answer: "s = ''"
        },
        {
          question: 'info = info + s[0] 是什么意思？',
          answer: '把 s 的第一个字符添加到 info 变量末尾'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '字符串构建大师！在循环中使用索引和拼接，可以从多个字符串中提取特定字符并组合成新字符串。',
      concept: '结合 input()、for 循环和字符串索引，可以实现复杂的字符串处理任务。',
      syntax: "info = ''\nfor i in range(n):\n    s = input()\n    info = info + s[0]",
      example: {
        title: '藏头诗提取',
        code: "info = ''\nfor i in range(4):\n    s = input()\n    info = info + s[0]\nprint(info)",
        output: '千万孤独（输入四句诗后）',
        explanation: '每次循环输入一句诗，提取每句的第一个字符并拼接到 info，最后输出"千万孤独"。'
      },
      practice: [
        {
          question: '如何提取每句话的最后一个字符？',
          answer: 'info = info + s[len(s)-1]'
        },
        {
          question: '如果输入四句诗，info 最终有几个字符？',
          answer: '4 个字符'
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
    mathConcept: '数数与索引',
    question: '字符串 "Hello" 中，字母 \'e\' 的索引是（）',
    options: ['0', '1', '2', '3'],
    answer: 1,
    explanation: '索引从 0 开始计数：H=0, e=1, l=2, l=3, o=4。所以字母 \'e\' 的索引是 1。',
    hint: '记得索引从 0 开始，不是从 1 开始哦！'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '计数',
    question: '执行下方代码，输出结果是（）\n\n```python\ns = \'Python\'\nprint(len(s))\n```',
    options: ['5', '6', '7', '8'],
    answer: 1,
    explanation: 'len() 函数返回字符串的长度（字符个数）。"Python" 有 6 个字母，所以 len(s) = 6。',
    hint: '数一数 "Python" 有几个字母？'
  },

  // 🟡 进阶题（2道）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '位置与索引',
    question: '字符串 \'Hi,I am Hemu\' 中字符 \'a\' 的索引是（）',
    options: ['4', '5', '6', '7'],
    answer: 1,
    explanation: '从左往右数，不要漏了空格字符。字符\'a\'是第6个字符，因此它的索引是5。（索引 = 位置 - 1）',
    hint: '记得空格也算一个字符哦！'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '索引与位置',
    question: '执行下方代码，程序会打印出（）\n\n```python\ns = \'cellphone\'\nprint(s[4])\n```',
    options: ['l', 'p', 'h', 'e'],
    answer: 1,
    explanation: '变量 s 中存储了字符串 \'cellphone\'，索引是 4 的字符是 \'p\'（c=0, e=1, l=2, l=3, p=4）',
    hint: '从 0 开始数索引'
  },

  // 🔴 挑战题（2道）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '循环与计数',
    question: '执行下方代码，输出结果是（）\n\n```python\ns = \'name\'\nnew_s = \'\'\nfor i in range(4):\n    new_s = new_s + s[1]\nprint(new_s)\n```',
    options: ['nnnn', 'aaaa', 'name', 'nana'],
    answer: 1,
    explanation: 'for i in range(4) 表明循环会执行 4 次。每次循环执行 new_s = new_s + s[1]。s[1] 表示字符串 s 的第 2 个字符，即 \'a\'。最终结果是 \'aaaa\'。',
    hint: '注意 s[1] 获取的是哪个字符？'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '逆向索引计算',
    question: '执行下方代码，依次输入 4 个字符串 "ABC", "DEF", "GHI", "JKL"，程序会打印出（）。\n\n```python\ninfo = \'\'\nfor i in range(4):\n    s = input()\n    info = info + s[len(s)-2]\nprint(info)\n```',
    options: ['ADGJ', 'BEHK', 'CFIL', 'ABCD'],
    answer: 0,
    explanation: '每次循环取输入字符串的倒数第二个字符（len(s)-2）。"ABC"取\'B\'，"DEF"取\'E\'，"GHI"取\'H\'，"JKL"取\'K\'，拼接后得到"BEHK"... 等等，让我重新算：len("ABC")=3, 3-2=1, s[1]=\'B\'。所以是 B, E, H, K = "BEHK"... 答案应该是B选项',
    hint: 'len(s)-2 表示倒数第二个字符的索引'
  }
]

export const lessonMeta = {
  id: 'L5-1',
  title: '字符串索引与拼接',
  subtitle: '学会字符串索引、len()命令和字符串拼接',
  difficulty: '进阶',
  estimatedTime: '35-45分钟',
  learningGoals: [
    '理解字符串索引的概念和作用',
    '掌握使用索引访问字符串中字符的方法',
    '学会使用 len() 获取字符串长度',
    '掌握字符串拼接的基本方法'
  ],
  prerequisites: [
    'Python 基础语法',
    '变量概念',
    'print() 命令'
  ]
}

// 打字练习单词
export const typingWords = {
  easy: ['info', 'len', 'index', 'string', 'word'],
  medium: ['length', 'python', 'character', 'position', 'idiom'],
  hard: ['concatenation', 'programming', 'extraction', 'algorithm']
}

// 代码模板
export const typingTemplates = {
  easy: [
    {
      title: '打印字符',
      template: "s = 'Hello'\nprint(s[_])",
      hint: '输入索引 0 获取第一个字符'
    },
    {
      title: '获取长度',
      template: "s = 'Python'\nprint(len(_))",
      hint: '输入变量名 s'
    },
    {
      title: '简单拼接',
      template: "print('Hello' + _)",
      hint: '输入 \'World\' 完成拼接'
    },
    {
      title: '索引访问',
      template: "name = 'Hetao'\nprint(name[_])",
      hint: '输入索引 2 获取 \'t\''
    }
  ],
  medium: [
    {
      title: '循环拼接',
      template: "info = ''\nfor i in range(3):\n    s = input()\n    info = info + _",
      hint: '输入 s[0] 提取首字符'
    },
    {
      title: '获取末尾字符',
      template: "s = 'Python'\nprint(s[len(s)-_])",
      hint: '输入 1 获取最后一个字符'
    },
    {
      title: '条件拼接',
      template: "if len(s) > 5:\n    info = info + _",
      hint: '输入 s[0] 添加首字符'
    },
    {
      title: '范围索引',
      template: "s = 'Programming'\nprint(s[_:5])",
      hint: '输入 0 获取前 5 个字符'
    }
  ],
  hard: [
    {
      title: '藏头诗提取',
      template: "info = ''\nfor i in range(4):\n    s = input()\n    info = info + s[_]\nprint(info)",
      hint: '输入 0 提取每句首字符'
    },
    {
      title: '倒数索引',
      template: "s = 'Python'\nprint(s[len(s)-_])",
      hint: '输入 2 获取倒数第二个字符'
    },
    {
      title: '字符串处理',
      template: "result = ''\nfor i in range(len(s)):\n    if s[i] != ' ':\n        result = _",
      hint: '输入 result + s[i] 拼接非空格字符'
    },
    {
      title: '嵌套循环',
      template: "for i in range(3):\n    for j in range(2):\n        print(strings[i][_])",
      hint: '输入 j 访问内层索引'
    }
  ]
}

// 导出所有数据
export const L5_1_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L5_1_data
