/**
 * PY2 课程 L7-1: 字符串的奇妙旅行
 *
 * 核心知识点:
 * 1. 字符串遍历 (for循环)
 * 2. split命令 (分割字符串)
 * 3. print进阶 (展开列表)
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'split',
    pronunciation: '[split]',
    partOfSpeech: 'v.',
    meaning: '分割；分裂',
    level: 'easy',
    example: 'The big apple was split in half.',
    exampleTranslation: '这个大苹果被切成两半。'
  },
  {
    word: 'encode',
    pronunciation: "[in'koud]",
    partOfSpeech: 'v.',
    meaning: '编码；译成密码',
    level: 'medium',
    example: 'I encoded my secret message.',
    exampleTranslation: '我对我的秘密信息进行了编码。'
  },
  // 拓展单词
  {
    word: 'decode',
    pronunciation: "[di:'koud]",
    partOfSpeech: 'v.',
    meaning: '解码；破译',
    level: 'medium',
    example: 'Can you decode this message?',
    exampleTranslation: '你能破译这条信息吗？'
  },
  {
    word: 'string',
    pronunciation: '[striŋ]',
    partOfSpeech: 'n.',
    meaning: '字符串；线',
    level: 'easy',
    example: 'This is a string.',
    exampleTranslation: '这是一个字符串。'
  },
  {
    word: 'traverse',
    pronunciation: '[trə-vɜːs]',
    partOfSpeech: 'v.',
    meaning: '遍历；横过',
    level: 'hard',
    example: 'We need to traverse the list.',
    exampleTranslation: '我们需要遍历这个列表。'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '字符串小火车 - 遍历',
    emoji: '🚂',
    gradeLevel: '1-2',
    summary: '把字符串当成一节节车厢，逐个访问每个字符',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象一下，字符串就像一列小火车，每个字符就是一节车厢。我们可以用 for 循环像检票员一样，从车头走到车尾，一节一节地检查每节车厢！',
      concept: '遍历就是从头到尾，一个一个地访问字符串中的每个字符。',
      syntax: 'for 变量 in 字符串:\n    # 要执行的代码',
      example: {
        title: '数一数有几个字母',
        code: '# 小明的名字有几个字母？\ns = "Ming"\nfor i in s:\n    print("*")',
        output: '*\n*\n*\n*',
        explanation: '字符串 "Ming" 有4个字母，所以循环执行4次，打印出4颗星。'
      },
      practice: [
        {
          question: '字符串 "Hi" 有几个字符？',
          answer: '2个'
        },
        {
          question: '遍历 "ABC" 会循环几次？',
          answer: '3次'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '现在我们的小火车升级啦！不仅能数车厢，还能对每节车厢做不同的事情，比如给每个字符打招呼，或者统计某个字符出现了几次。',
      concept: '在遍历时，循环变量会依次等于字符串中的每个字符，我们可以在循环中对每个字符进行操作。',
      syntax: 'for 字符变量 in 字符串:\n    print(字符变量)',
      example: {
        title: '逐个打印字符',
        code: '# 逐个打印 "投桃报李" 的每个字\ns = "投桃报李"\nfor i in s:\n    print(i)',
        output: '投\n桃\n报\n李',
        explanation: '循环变量 i 依次取值为 "投"、"桃"、"报"、"李"，所以会打印4行，每行一个字。'
      },
      practice: [
        {
          question: '如果要统计字符串中某个字符出现的次数，应该怎么做？',
          answer: '设置一个计数器，在循环中判断字符是否匹配'
        },
        {
          question: '遍历 "Hello" 会打印几行？',
          answer: '5行'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '高级火车长模式！你可以用遍历解决复杂问题：统计字符频率、反转字符串、筛选特定字符等等。',
      concept: '遍历是处理字符串的基础，结合条件判断和计数器，可以实现复杂的文本处理算法。',
      syntax: 'count = 0\nfor 字符变量 in 字符串:\n    if 条件:\n        count += 1',
      example: {
        title: '统计元音字母数量',
        code: '# 统计 "Python" 中有几个元音字母\ns = "Python"\ncount = 0\nfor i in s:\n    if i in "aeiouAEIOU":\n        count += 1\nprint(count)',
        output: '1',
        explanation: '只有 "o" 是元音字母，所以结果是 1。这个算法可以用来统计任意字符的出现次数。'
      },
      practice: [
        {
          question: '如何用遍历反转字符串？',
          answer: '创建一个空字符串，在循环中把每个字符加到前面'
        },
        {
          question: '如何用遍历删除字符串中的所有空格？',
          answer: '创建一个新字符串，只添加非空格字符'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '切蛋糕游戏 - split命令',
    emoji: '🍰',
    gradeLevel: '1-2',
    summary: '用"刀"（分隔符）把字符串切成多段',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个大蛋糕，想把它切成几块分享给朋友。split 命令就像一把神奇的刀，你可以告诉它按什么方式切，它就会帮你把字符串切开！',
      concept: 'split 命令可以按照指定的字符（分隔符）把字符串分割成多个部分，结果是一个列表。',
      syntax: '字符串.split(分隔符)',
      example: {
        title: '按表情符号切分',
        code: '# 用 🍎 把水果分开\nfruits = "苹果🍎香蕉🍎橙子"\nresult = fruits.split("🍎")\nprint(result)',
        output: "['苹果', '香蕉', '橙子']",
        explanation: 'split 命令用 🍎 作为分隔符，把字符串切成了3个部分。'
      },
      practice: [
        {
          question: '用 "-" 分割 "A-B-C"，结果是什么？',
          answer: "['A', 'B', 'C']"
        },
        {
          question: 'split(" ") 是按什么分割的？',
          answer: '空格'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '现在我们来到了美食广场！split 命令可以处理各种格式的数据：网址、文件路径、句子等等，是数据处理中最常用的工具之一。',
      concept: 'split 命令非常实用，常用于解析结构化数据，如 URL、CSV 格式、句子分词等。',
      syntax: '# URL 分割\nurl.split(".")\n\n# 获取网站名\nparts = url.split(".")\nname = parts[1]',
      example: {
        title: '解析网址',
        code: '# 分割网址，获取网站名\nurl = "www.hetao101.com"\nparts = url.split(".")\nprint("网站名:", parts[1])',
        output: '网站名: hetao101',
        explanation: '用 "." 分割网址后，得到3部分：["www", "hetao101", "com"]，索引1的位置就是网站名。'
      },
      practice: [
        {
          question: '文件路径 "/home/user/file.txt" 用 split("/") 可以得到什么？',
          answer: "['', 'home', 'user', 'file.txt']"
        },
        {
          question: '如何获取文件的扩展名（如 .txt）？',
          answer: '用 split(".") 分割，取最后一部分'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '大师级切蛋糕艺术！你可以处理复杂的数据格式，如 CSV 表格、日志文件、配置文件等。split 是数据解析的基础技能。',
      concept: '实际应用中，数据往往需要多级分割和处理，结合遍历可以实现完整的数据解析流程。',
      syntax: '# CSV 数据解析\nfor row in csv_data.split("\\n"):\n    fields = row.split(",")\n    # 处理每个字段',
      example: {
        title: '解析成绩单',
        code: '# 解析 CSV 格式的成绩\ngrades = "小明,95;小红,88;小刚,92"\nrecords = grades.split(";")\nfor record in records:\n    name, score = record.split(",")\n    print(f"{name}: {score}分")',
        output: '小明: 95分\n小红: 88分\n小刚: 92分',
        explanation: '先用 ";" 分割每条记录，再用 "," 分割姓名和分数，实现完整的数据解析。'
      },
      practice: [
        {
          question: '如果一行数据是 "姓名,年龄,成绩" 格式，如何解析？',
          answer: '先用 split(",") 分割成3部分'
        },
        {
          question: 'split() 不写参数会怎样？',
          answer: '按空白字符（空格、换行等）自动分割'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '魔法拼接术 - print进阶',
    emoji: '🪄',
    gradeLevel: '3-4',
    summary: '用 * 号展开列表，用 sep 自定义间隔',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '你知道吗？print 还有个魔法技能！用星号 * 可以把列表里的每个元素都"召唤"出来，一个一个打印出来！',
      concept: 'print(*列表) 会把列表中的每个元素单独打印出来，默认用空格隔开。',
      syntax: 'print(*列表)',
      example: {
        title: '展开打印水果',
        code: '# 把水果列表展开打印\nfruits = ["苹果", "香蕉", "橙子"]\nprint(*fruits)',
        output: '苹果 香蕉 橙子',
        explanation: '* 号把列表展开，相当于 print("苹果", "香蕉", "橙子")，每个元素之间自动加空格。'
      },
      practice: [
        {
          question: 'print(*[1, 2, 3]) 会输出什么？',
          answer: '1 2 3'
        },
        {
          question: '不用 * 号，print([1, 2, 3]) 会输出什么？',
          answer: '[1, 2, 3] （带方括号）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '进阶魔法！你还可以用 sep 参数自定义每个元素之间的间隔符号，让输出更漂亮、更有创意！',
      concept: 'sep 参数可以指定输出时每个元素之间的分隔符，让输出格式更灵活。',
      syntax: 'print(*列表, sep="分隔符")',
      example: {
        title: '用横线连接单词',
        code: '# 用横线连接每个单词\nwords = ["Nice", "to", "meet", "you"]\nprint(*words, sep="-")',
        output: 'Nice-to-meet-you',
        explanation: 'sep="-" 让每个单词之间用横线连接，而不是默认的空格。'
      },
      practice: [
        {
          question: 'sep="," 会用什么连接？',
          answer: '逗号'
        },
        {
          question: 'sep=""（空字符串）会怎样？',
          answer: '所有元素紧挨着，没有间隔'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '魔法大师！结合 * 和 sep，你可以创建各种输出格式：制作表格、生成代码、美化显示等等。',
      concept: '灵活使用 * 和 sep 可以实现各种创意输出，是格式化输出的重要技巧。',
      syntax: 'print(*列表, sep="自定义")\nprint(*列表, sep="\\n")  # 每个元素一行',
      example: {
        title: '创建进度条',
        code: '# 动态创建进度条\nprogress = ["█", "█", "█", "░", "░"]\nprint("下载中:", *progress, sep="")\nprint("进度:", 3, "/", 5, sep="")',
        output: '下载中: ███░░\n进度: 3/5',
        explanation: '用 sep="" 拼接进度条字符，用第二个 print 和 sep="" 显示进度，实现美观的进度显示。'
      },
      practice: [
        {
          question: '如何让列表的每个元素打印在单独一行？',
          answer: 'sep="\\n"'
        },
        {
          question: '如何同时展开两个列表？',
          answer: 'print(*list1, *list2)'
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
    question: '小明想用代码数一数自己的名字 "Ming" 有几个字母。请看下面的代码，会输出几颗星？\n\n```python\ns = "Ming"\nfor i in s:\n    print("*")\n```',
    options: [
      '3颗',
      '4颗',
      '5颗'
    ],
    answer: 1, // B
    explanation: '字符串 "Ming" 有4个字母（M、i、n、g），所以循环会执行4次，打印4颗星。\n\n数学知识：这就是"一一对应"的思想，每个字母对应一颗星，有多少个字母就有多少颗星。',
    hint: '想想 "Ming" 有几个字母？'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '找规律',
    question: '下面的代码会输出什么？\n\n```python\nfor i in "ABC":\n    print(i)\n```',
    options: [
      'ABC',
      'A\nB\nC',
      'C\nB\nA'
    ],
    answer: 1, // B
    explanation: '遍历 "ABC" 时，循环变量 i 依次取值为 "A"、"B"、"C"，每次都打印在新的一行。\n\n规律：for 循环是按照字符串中字符的顺序，从前往后逐个访问。',
    hint: 'print() 每次都会换行哦'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '分组问题',
    question: '老师把班级同学的名字用 "-" 连接在一起：\n\n```python\nnames = "小明-小红-小刚-小丽"\n```\n\n现在想把它们分开，应该用什么代码？',
    options: [
      'names.split("-")',
      'names.split(" ")',
      'names.split(",")'
    ],
    answer: 0, // A
    explanation: 'split("-") 会用 "-" 作为分隔符，把字符串切分成多个部分。\n\n结果：["小明", "小红", "小刚", "小丽"]\n\n数学知识：这就像"分组"问题，按照分隔符把整体分成多个小组。',
    hint: '名字之间是用什么符号连接的？'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '位置与索引',
    question: '有一个网址：\n\n```python\nurl = "www.hetao101.com"\n```\n\n执行下面的代码，会输出什么？\n\n```python\nparts = url.split(".")\nprint(parts[1])\n```',
    options: [
      'www',
      'hetao101',
      'com'
    ],
    answer: 1, // B
    explanation: 'split(".") 把网址分成 ["www", "hetao101", "com"]，索引0是www，索引1是hetao101，索引2是com。\n\n数学知识：索引从0开始数，这是编程中的重要概念。',
    hint: '索引是从 0 开始数的，所以 [1] 是第二个部分'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '植树问题',
    question: '经典的植树问题！\n\n一条10公里的公路，每隔1公里种一棵树。如果公路两端都种树，这条公路上会有几棵树？\n\n请想想：如果是编程解决，应该用什么公式？',
    options: [
      'distance // interval',
      'distance // interval + 1',
      '(distance + 1) // interval'
    ],
    answer: 1, // B
    explanation: '植树问题公式：两端都种时，树的数量 = 距离 ÷ 间隔 + 1\n\n代码：\n```python\ndistance = 10\ninterval = 1\ntrees = distance // interval + 1\nprint(trees)  # 输出: 11\n```\n\n解释：10公里 ÷ 1公里 = 10个间隔，但两端都有树，所以是 10 + 1 = 11棵树。\n\n数学知识：这是经典的"植树问题"，理解"间隔数"和"点数"的关系是关键。',
    hint: '想象一下，在纸上画10个格子，两端各有一条边，一共有几条边？'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '周期问题',
    question: '编程与周期问题！\n\n字符串 "ABCABCABC..." 不断重复，第15个字符是什么？\n\n```python\ns = "ABC" * 10  # 重复10次\nprint(s[14])  # 索引14是第15个字符（从0开始）\n```',
    options: [
      'A',
      'B',
      'C'
    ],
    answer: 2, // C
    explanation: '这是一个周期问题！"ABC" 的周期是3。\n\n数学方法：15 ÷ 3 = 5 余 0，余数是0说明是周期的第一个字符，也就是"A"。\n\n编程方法：索引14（从0开始）对应第15个字符。14 ÷ 3 = 4 余 2，索引2是"C"... 等等，让我重新算：\n\n索引0=A, 1=B, 2=C, 3=A, 4=B, 5=C, 6=A, 7=B, 8=C, 9=A, 10=B, 11=C, 12=A, 13=B, 14=C\n\n所以答案应该是 C！\n\n正确答案：C\n\n数学知识：周期问题用"余数"来确定位置，余数1=第1个，余数2=第2个，余数0=最后一个。',
    correction: '正确答案是 C。索引14对应第15个字符（从1开始数），15 ÷ 3 = 5余0，在周期问题中余数为0对应周期的最后一个，即C。',
    hint: '想想 15 除以 3 的余数是？'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L7-1',
  title: '疯狂原始人',
  subtitle: '学会遍历和分割字符串',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解字符串遍历的概念',
    '掌握 split 命令的使用方法',
    '学会 print 的进阶用法',
    '能用编程解决简单的数学问题'
  ],
  prerequisites: [
    'Python 基础语法',
    'for 循环',
    '列表基础操作'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['split', 'list', 'print', 'string'],
  medium: ['encode', 'decode', 'traverse', 'syntax'],
  hard: ['iteration', 'separator', 'delimiter', 'concatenate']
}

// 代码模板练习（按难度分组）
// 缩进使用4个空格（Python PEP 8标准）
export const typingTemplates = {
  easy: [
    // 简单单行代码 - 基础语法
    'for i in s:',
    's.split(" ")',
    'print(*list)',
    'text.split(",")',
    'words = s.split()',
    'print(*items)'
  ],
  medium: [
    // 包含缩进的多行代码
    'for char in s:\n    print(char)',
    'parts = text.split(",")',
    'print(*words, sep="-")',
    'for i in range(5):\n    print(i)',
    'items = text.split(" ")',
    'for word in words:\n    print(word)'
  ],
  hard: [
    // 复杂的多行代码
    'for i in range(len(s)):',
    'for line in lines:\n    print(line.strip())',
    'parts = s.split(",")\nfor p in parts:\n    print(p)',
    'for i in range(len(text)):\n    print(i, text[i])'
  ]
}

// 导出所有数据
export const L7_1_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L7_1_data
