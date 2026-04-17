/**
 * PY3 课程 L16-3: 字符串探险家
 *
 * 核心知识点:
 * 1. 遍历字符串
 * 2. 字符计数与拼接
 * 3. 按位置访问字符
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'gold',
    pronunciation: '[gould]',
    partOfSpeech: 'n./adj.',
    meaning: '金；金子；金色的',
    level: 'easy',
    example: 'Find the gold.',
    exampleTranslation: '找到金子。',
    note: '',
    source: 'ocr'
  },
  {
    word: 'diamond',
    pronunciation: "['daiamand]",
    partOfSpeech: 'n./adj.',
    meaning: '钻石；金刚石',
    level: 'easy',
    example: 'A diamond ring.',
    exampleTranslation: '钻戒。',
    note: '',
    source: 'ocr'
  },
  {
    word: 'vine',
    pronunciation: '[vain]',
    partOfSpeech: 'n./v.',
    meaning: '藤；藤蔓',
    level: 'medium',
    example: 'The vine grows fast.',
    exampleTranslation: '藤蔓长得很快。',
    note: '',
    source: 'ocr'
  },
  {
    word: 'cloud',
    pronunciation: '[klaud]',
    partOfSpeech: 'n./v.',
    meaning: '云；云朵',
    level: 'medium',
    example: 'Look at the cloud.',
    exampleTranslation: '看那朵云。',
    note: '',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'character',
    pronunciation: "['kaeriktar]",
    partOfSpeech: 'n.',
    meaning: '字符；角色',
    level: 'hard',
    example: 'Each character in the string.',
    exampleTranslation: '字符串中的每个字符。',
    note: '',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '遍历字符串',
    emoji: '🔤',
    gradeLevel: '3-4',
    summary: '逐个访问字符串中的每个字符',

    easy: {
      story: '字符串就像一串珠子，每个字符是一颗珠子。遍历就是从第一个开始，一颗一颗地看！',
      concept: '遍历字符串就是依次访问每个字符。用for循环可以轻松实现：for c in s: 表示对s中的每个字符c执行操作。',
      syntax: "# 遍历字符串\ns = 'hello'\nfor c in s:\n    print(c)\n\n# 输出:\n# h\n# e\n# l\n# l\n# o",
      example: {
        title: '打印每个字符',
        code: "word = 'Python'\nfor char in word:\n    print(char)\n\n# 输出: P y t h o n（每行一个）",
        output: '每个字符单独打印',
        explanation: 'for循环会依次取出每个字符。'
      },
      practice: [
        {
          question: 'for c in "abc" 会循环几次？',
          answer: '3次（a、b、c各一次）'
        },
        {
          question: '遍历字符串时变量c是什么？',
          answer: '当前访问的字符'
        }
      ]
    },

    medium: {
      story: '遍历可以关注字符内容！比如统计有多少个"b"，或者找出所有"d"的位置！',
      concept: '遍历时可以用if判断字符内容，对不同字符做不同处理。比如计数、查找、替换等。',
      syntax: "# 遍历并判断\ns = 'bdbdbddbdbdb'\ncount = 0\n\nfor c in s:\n    if c == 'b':\n        count += 1\n\nprint(f'b出现了{count}次')",
      example: {
        title: '统计特定字符',
        code: "text = 'hello world'\ncount = 0\n\nfor char in text:\n    if char == 'l':\n        count += 1\n\nprint(f'l出现了{count}次')  # 输出: l出现了3次",
        output: '统计字符l出现的次数',
        explanation: '用计数器统计满足条件的字符数。'
      },
      practice: [
        {
          question: '如何统计字符串中有多少个空格？',
          answer: 'if char == " ": count += 1'
        },
        {
          question: '遍历时可以同时判断多个条件吗？',
          answer: '可以，用if-elif-else'
        }
      ]
    },

    hard: {
      story: '遍历时可以同时关注内容和位置！用range和len组合，既知道是什么字符，又知道在第几个位置！',
      concept: 'for i in range(len(s)): 遍历时i是索引，s[i]是字符。这样既能获取位置，又能获取内容。',
      syntax: "# 带位置的遍历\ns = 'hello'\n\nfor i in range(len(s)):\n    print(f'位置{i}: {s[i]}')\n\n# 输出:\n# 位置0: h\n# 位置1: e\n# 位置2: l\n# ...",
      example: {
        title: '带索引遍历',
        code: "s = 'bdbdbd'\n\nfor i in range(len(s)):\n    char = s[i]\n    if char == 'b':\n        print(f'位置{i}是b')",
        output: '打印所有b的位置',
        explanation: 'range(len(s))生成0到长度-1的索引。'
      },
      practice: [
        {
          question: 'range(len("abc"))生成什么？',
          answer: '0, 1, 2'
        },
        {
          question: '如何获取第i个位置的字符？',
          answer: 's[i]'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '字符计数与拼接',
    emoji: '🔢',
    gradeLevel: '3-4',
    summary: '统计字符数量，合并字符串',

    easy: {
      story: '计数就像投票！看到符合条件的字符就加一票（count += 1），最后看总共多少票！',
      concept: '计数器是一个变量，初始化为0，每次满足条件就+1。遍历结束后，计数器就是符合条件的总数。',
      syntax: "# 计数器模式\ncount = 0  # 初始化\n\nfor c in s:\n    if 条件:\n        count += 1  # 满足条件+1\n\nprint(count)  # 输出总数",
      example: {
        title: '多条件计数',
        code: "s = 'bdbdbddbdbdb'\nb_count = 0\nd_count = 0\n\nfor c in s:\n    if c == 'b':\n        b_count += 1\n    elif c == 'd':\n        d_count += 1\n\nprint(f'b: {b_count}, d: {d_count}')",
        output: '分别统计b和d的数量',
        explanation: '用多个计数器统计不同内容。'
      },
      practice: [
        {
          question: '计数器应该初始化为什么？',
          answer: '0'
        },
        {
          question: '如何统计小写字母数量？',
          answer: 'if "a" <= c <= "z": count += 1'
        }
      ]
    },

    medium: {
      story: '拼接就像串珠子！每找到一个符合条件的字符，就把它加到新字符串后面！',
      concept: '字符串拼接用+号。result += c 把字符c添加到result末尾。可以用来过滤或转换字符串。',
      syntax: "# 字符串拼接\nresult = ''  # 空字符串\n\nfor c in s:\n    if 条件:\n        result += c  # 添加到末尾\n\nprint(result)",
      example: {
        title: '过滤字符',
        code: "s = 'hello world'\nvowels = ''\n\nfor c in s:\n    if c in 'aeiou':  # 是元音\n        vowels += c\n\nprint(vowels)  # 输出: eoo",
        output: '提取所有元音字母',
        explanation: '用拼接收集符合条件的字符。'
      },
      practice: [
        {
          question: '如何用拼接复制字符串？',
          answer: 'result += c 每个字符都加进去'
        },
        {
          question: '空字符串用什么表示？',
          answer: "''（两个单引号）"
        }
      ]
    },

    hard: {
      story: '复杂的字符串处理！可以同时计数和拼接，或者根据条件做不同处理！',
      concept: '在同一个遍历中可以：计数、拼接、转换、记录位置等。根据实际需求组合不同的操作。',
      syntax: "# 综合处理\nresult = ''\ncount = 0\n\nfor c in s:\n    if c == 'b':\n        count += 1\n        result += 'B'  # 大写\n    elif c == 'd':\n        count += 1\n        result += 'D'\n    else:\n        result += c  # 保持原样\n\nprint(f'总数: {count}')\nprint(f'结果: {result}')",
      example: {
        title: '综合处理',
        code: "s = 'bdbdbd'\nnew_s = ''\npoints = 0\n\nfor c in s:\n    if c == 'b':\n        new_s += 'B'\n        points += 15\n    elif c == 'd':\n        new_s += 'D'\n        points += 20\n\nprint(f'转换后: {new_s}')\nprint(f'得分: {points}')",
        output: '转换字符并计算得分',
        explanation: '一个遍历完成多个任务。'
      },
      practice: [
        {
          question: '如何同时计数和拼接？',
          answer: '在遍历中用两个变量，分别+1和+='
        },
        {
          question: '为什么要学会综合处理？',
          answer: '一个遍历可以完成多个任务，效率高'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '按位置访问字符',
    emoji: '📍',
    gradeLevel: '3-4',
    summary: '用索引访问特定位置的字符',

    easy: {
      story: '字符串的每个字符都有编号！第一个是0号，第二个是1号，用s[编号]就能取到！',
      concept: '索引从0开始。s[0]是第一个字符，s[1]是第二个，s[-1]是最后一个。用索引可以直接访问任意位置的字符。',
      syntax: "# 索引访问\ns = 'hello'\n\ns[0]   # 'h' 第一个\ns[1]   # 'e' 第二个\ns[-1]  # 'o' 最后一个\ns[-2]  # 'l' 倒数第二个",
      example: {
        title: '访问字符',
        code: "word = 'Python'\n\nprint(word[0])   # P\nprint(word[3])   # h\nprint(word[-1])  # n",
        output: '打印指定位置的字符',
        explanation: '索引从0开始，-1是最后一个。'
      },
      practice: [
        {
          question: '"hello"的s[0]是什么？',
          answer: 'h'
        },
        {
          question: '"hello"的s[-1]是什么？',
          answer: 'o'
        }
      ]
    },

    medium: {
      story: '可以用索引遍历奇数位或偶数位！比如只处理位置0、2、4...的字符！',
      concept: 'range(开始, 结束, 步长)可以跳着遍历。range(0, len(s), 2)只访问偶数位置。',
      syntax: "# 跳着遍历\ns = 'abcdef'\n\n# 偶数位置 (0, 2, 4...)\nfor i in range(0, len(s), 2):\n    print(s[i])  # a c e\n\n# 奇数位置 (1, 3, 5...)\nfor i in range(1, len(s), 2):\n    print(s[i])  # b d f",
      example: {
        title: '隔位访问',
        code: "s = 'helloworld'\n\n# 提取偶数位置的字符\neven_chars = ''\nfor i in range(0, len(s), 2):\n    even_chars += s[i]\n\nprint(even_chars)  # hlool",
        output: '提取偶数位置字符',
        explanation: '步长为2表示每隔一个取一个。'
      },
      practice: [
        {
          question: 'range(0, 6, 2)生成什么？',
          answer: '0, 2, 4'
        },
        {
          question: '如何只访问奇数位置？',
          answer: 'range(1, len(s), 2)'
        }
      ]
    },

    hard: {
      story: '切片可以获取子字符串！s[开始:结束]获取中间一段，s[::步长]可以跳着取！',
      concept: '切片是提取子字符串的强大方法。s[1:4]取第1到第3个，s[::2]每隔一个取一个，s[::-1]反转字符串。',
      syntax: "# 切片\ns = 'hello'\n\ns[1:4]    # 'ell' 从1到3\ns[:3]     # 'hel' 前3个\ns[2:]     # 'llo' 从2到最后\ns[::2]    # 'hlo' 隔一个取\ns[::-1]   # 'olleh' 反转",
      example: {
        title: '切片操作',
        code: "s = 'Python'\n\nprint(s[0:3])   # Pyt\nprint(s[2:5])   # tho\nprint(s[::2])   # Pto\nprint(s[::-1])  # nohtyP",
        output: '展示各种切片效果',
        explanation: '切片是灵活的子字符串提取方式。'
      },
      practice: [
        {
          question: 's[:3]是什么意思？',
          answer: '取前3个字符'
        },
        {
          question: 's[::-1]的作用是什么？',
          answer: '反转字符串'
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
    mathConcept: '遍历概念',
    question: 'for c in "abc" 会循环几次？',
    options: [
      '1次',
      '2次',
      '3次',
      '0次'
    ],
    answer: 2,
    explanation: '字符串"abc"有3个字符，所以循环3次，每次处理一个字符。',
    hint: '字符串有几个字符就循环几次'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '索引访问',
    question: '"hello"[0]的结果是什么？',
    options: [
      'e',
      'h',
      'o',
      'hello'
    ],
    answer: 1,
    explanation: '索引从0开始，[0]是第一个字符，即h。',
    hint: '第一个字符是索引0'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '计数',
    question: '字符串"ababab"中a出现了几次？',
    options: [
      '1次',
      '2次',
      '3次',
      '6次'
    ],
    answer: 2,
    explanation: 'ababab中有3个a（位置0、2、4），所以是3次。',
    hint: '数一数有几个a'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '负数索引',
    question: '"python"[-1]的结果是什么？',
    options: [
      'p',
      'n',
      'o',
      'y'
    ],
    answer: 1,
    explanation: '-1是倒数第一个字符，即最后一个字符n。',
    hint: '-1是最后一个'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '切片',
    question: '"hello"[1:4]的结果是什么？',
    options: [
      'hel',
      'ell',
      'hell',
      'ello'
    ],
    answer: 1,
    explanation: '[1:4]取索引1到3（不包含4），即e、l、l，结果是"ell"。',
    hint: '切片不包含结束位置'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '切片反转',
    question: '"abc"[::-1]的结果是什么？',
    options: [
      'abc',
      'cba',
      'ab',
      'bc'
    ],
    answer: 1,
    explanation: '[::-1]表示反向切片，步长-1，所以结果是反转的"cba"。',
    hint: '步长-1表示反向'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L16-3',
  title: '字符串探险家',
  subtitle: '学会字符串遍历和处理',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握字符串的遍历方法',
    '学会字符计数和拼接',
    '能使用索引访问字符',
    '了解字符串切片操作'
  ],
  prerequisites: [
    'Python for循环',
    '字符串基础知识',
    '索引和切片概念'
  ]
}

// 打字练习单词（按难度分组，纯英文）
export const typingWords = {
  easy: ['gold', 'char', 'count', 'loop'],
  medium: ['diamond', 'index', 'slice', 'range', 'vine', 'cloud'],
  hard: ['character', 'iteration', 'concat', 'position']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'for c in s:',
    'count = 0',
    'result += c',
    's[0]'
  ],
  medium: [
    'for i in range(len(s)):\n    char = s[i]',
    'if c == "b":\n    count += 1',
    'for i in range(0, len(s), 2):\n    print(s[i])',
    's[-1]  # 最后一个字符'
  ],
  hard: [
    's[1:4]  # 切片',
    's[::2]  # 隔一个取一个',
    's[::-1]  # 反转字符串',
    'for c in s:\n    if c in "aeiou":\n        result += c'
  ]
}

// 导出所有数据
export const L16_3_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L16_3_data
