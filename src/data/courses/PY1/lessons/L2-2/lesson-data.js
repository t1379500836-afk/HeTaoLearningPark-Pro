/**
 * PY1 课程 L2-2: 字符串分割
 *
 * 核心知识点:
 * 1. split() 命令 - 分割字符串
 * 2. 分隔符 - 指定分割规则
 * 3. 列表 - 存储分割后的数据
 */

// 单词卡数据 - OCR 提取
export const vocabData = [
  {
    word: 'for',
    pronunciation: '[fɔːr]',
    partOfSpeech: 'prep./conj.',
    meaning: '对；因为；由于',
    level: 'easy',
    example: 'for the people 为人民服务',
    exampleTranslation: '为人民服务',
    note: 'for 循环关键字',
    source: 'ocr'
  },
  {
    word: 'in',
    pronunciation: '[in]',
    partOfSpeech: 'prep./adv.',
    meaning: '参与；参加；进入；在内',
    level: 'easy',
    example: 'for i in range(5):',
    exampleTranslation: '循环5次',
    note: 'in 在...里面',
    source: 'ocr'
  },
  {
    word: 'range',
    pronunciation: '[reindʒ]',
    partOfSpeech: 'n./v.',
    meaning: '区间；射程；靶场；徘徊；变动',
    level: 'medium',
    example: 'The range is from 1 to 10.',
    exampleTranslation: '范围是1到10。',
    note: 'range() 生成数字范围',
    source: 'ocr'
  },
  {
    word: 'shoot',
    pronunciation: '[ʃuːt]',
    partOfSpeech: 'v./n.',
    meaning: '射击；幼苗；嫩芽；新枝',
    level: 'medium',
    example: 'Shoot the target!',
    exampleTranslation: '射击目标！',
    note: 'shoot 射击',
    source: 'ocr'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '魔法剪刀 - split()命令',
    emoji: '✂️',
    gradeLevel: '1-2',
    summary: '把字符串按照规则切分成多段',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一把魔法剪刀，可以把一长串文字按照你指定的位置剪成一段一段的！',
      concept: 'split() 命令可以把一个字符串按照指定的分隔符切成多个部分，结果是一个列表。',
      syntax: '字符串.split(分隔符)',
      example: {
        title: '按空格分割',
        code: 'words = "hello world python"\nresult = words.split(" ")\nprint(result)',
        output: "['hello', 'world', 'python']",
        explanation: '用空格" "作为分隔符，把字符串"hello world python"分割成三部分，结果是包含三个单词的列表。'
      },
      practice: [
        {
          question: 'split() 命令有什么作用？',
          answer: '把字符串按照指定的分隔符切成多个部分'
        },
        {
          question: 'split() 后面括号里要填什么？',
          answer: '分隔符，比如空格" "或逗号","'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的魔法剪刀升级了！你可以用任何字符作为分隔符：空格、逗号、甚至是一个字母！',
      concept: 'split() 的分隔符可以是任何字符或字符串。灵活使用分隔符可以处理各种格式的数据。',
      syntax: 'words.split(" ")  # 按空格分割\nwords.split(",") # 按逗号分割\nwords.split("a")  # 按字母a分割',
      example: {
        title: '按逗号分割',
        code: 'data = "苹果,香蕉,橙子,葡萄"\nfruits = data.split(",")\nprint(fruits)',
        output: "['苹果', '香蕉', '橙子', '葡萄']",
        explanation: '用逗号","作为分隔符，把水果名称字符串分割成一个列表，每个水果成为列表中的一个元素。'
      },
      practice: [
        {
          question: '如果字符串中没有指定的分隔符会怎样？',
          answer: '整个字符串会变成一个元素的列表，不会分割'
        },
        {
          question: 'split(",") 和 split(" ") 有什么区别？',
          answer: '前者按逗号分割，后者按空格分割，分隔符不同'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '分割大师模式！你可以处理复杂的数据格式，提取关键信息，甚至组合使用split和索引！',
      concept: 'split()常用于处理结构化数据（如CSV格式）。可以配合索引访问特定位置的数据。',
      syntax: 'parts = text.split(分隔符)\ndata = parts[索引]  # 获取特定位置',
      example: {
        title: '提取特定数据',
        code: 'info = "张三,10,北京"\nparts = info.split(",")\nname = parts[0]\nage = parts[1]\nprint("姓名:" + name + ", 年龄:" + age)',
        output: '姓名:张三, 年龄:10',
        explanation: '先按逗号分割成["张三","10","北京"]，然后用索引获取：parts[0]是姓名，parts[1]是年龄。'
      },
      practice: [
        {
          question: 'parts[0] 表示什么？',
          answer: '表示分割后列表中的第一个元素（索引从0开始）'
        },
        {
          question: '如何提取分割后的第二个元素？',
          answer: '使用 parts[1]，因为索引从0开始，第二个元素的索引是1'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '分隔符的选择',
    emoji: '🔑',
    gradeLevel: '1-2',
    summary: '选择合适的分隔符很重要',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '切蛋糕时，你可以选择不同的切法：横着切、竖着切、斜着切。分隔符就像你的切法！',
      concept: '分隔符是split()命令的切割规则，必须和字符串中实际使用的分隔符一致才能正确分割。',
      syntax: '字符串.split(分隔符)',
      example: {
        title: '不同的分隔符',
        code: '# 按空格分割\na = "cat dog pig"\nprint(a.split(" "))\n\n# 按逗号分割\nb = "cat,dog,pig"\nprint(b.split(","))',
        output: "['cat', 'dog', 'pig']\n['cat', 'dog', 'pig']",
        explanation: '第一段代码用空格分割，第二段代码用逗号分割。选择正确的分隔符很重要！'
      },
      practice: [
        {
          question: '如果用逗号分割一个没有逗号的字符串会怎样？',
          answer: '整个字符串会变成一个元素的列表'
        },
        {
          question: '空格作为分隔符应该怎么写？',
          answer: 'split(" ")，引号中间要有一个空格'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的切法更丰富了！你可以用多个字符作为分隔符，甚至用整个单词作为分隔符！',
      concept: '分隔符可以是单个字符，也可以是多个字符。选择时要根据数据的具体格式来决定。',
      syntax: 'text.split("单个字符")\ntext.split("多个字符")',
      example: {
        title: '使用多字符分隔符',
        code: 'sentence = "苹果AND香蕉AND橙子"\nfruits = sentence.split("AND")\nprint(fruits)',
        output: "['苹果', '香蕉', '橙子']",
        explanation: '使用"AND"（三个字符）作为分隔符，成功把字符串分割成三个水果名称。'
      },
      practice: [
        {
          question: '分隔符可以包含多个字符吗？',
          answer: '可以，split()的分隔符可以是任意长度的字符串'
        },
        {
          question: 'split("AND") 和 split("and") 有什么区别？',
          answer: '大小写不同，必须和字符串中的分隔符完全匹配'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '分隔符专家模式！你可以分析数据格式，选择最合适的分隔策略，处理各种复杂情况！',
      concept: '处理实际数据时，需要观察数据格式选择合适的分隔符。常见分隔符包括空格、逗号、制表符、管道符等。',
      syntax: '# CSV格式：逗号分隔\ndata.split(",")\n# 空格分隔：\ndata.split(" ")',
      example: {
        title: '处理CSV格式数据',
        code: 'csv_data = "姓名,年龄,城市\\n张三,10,北京\\n李四,12,上海"\nlines = csv_data.split("\\n")\nfor line in lines:\n    print(line.split(","))',
        output: "['姓名', '年龄', '城市']\n['张三', '10', '北京']\n['李四', '12', '上海']",
        explanation: '先用\\n（换行符）按行分割，然后每行再用逗号分割。这是处理CSV格式数据的标准方法。'
      },
      practice: [
        {
          question: '\\n 表示什么？',
          answer: '表示换行符，用于分割多行文本'
        },
        {
          question: '处理多行CSV数据通常需要几次split？',
          answer: '通常需要两次：先用\\n按行分割，再用逗号分割每行的数据'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '分割结果 - 列表',
    emoji: '📋',
    gradeLevel: '1-2',
    summary: 'split()的结果是列表',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '用魔法剪刀剪完后，所有片段都会整齐地排成一排，就像一串糖葫芦！这串糖葫芦就是列表。',
      concept: 'split() 的结果是一个列表，里面包含了分割后的所有部分。列表用方括号[]表示。',
      syntax: 'result = 字符串.split(分隔符)\nprint(result)',
      example: {
        title: '查看分割结果',
        code: 'text = "one two three"\nwords = text.split(" ")\nprint(words)\nprint(words[0])',
        output: "['one', 'two', 'three']\none",
        explanation: 'words是包含三个单词的列表。words[0]可以获取列表的第一个元素"one"。'
      },
      practice: [
        {
          question: '列表用什么符号表示？',
          answer: '用方括号 [] 表示'
        },
        {
          question: '列表的第一个元素索引是多少？',
          answer: '是0，不是1'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的列表升级了！你可以随意访问列表中任何一个位置的元素，甚至可以知道列表有多少个元素！',
      concept: '列表中的每个元素都有索引，从0开始。可以用len()获取列表长度，用索引访问特定元素。',
      syntax: 'words = text.split(分隔符)\nwords[0]  # 第一个元素\nwords[1]  # 第二个元素\nlen(words)  # 列表长度',
      example: {
        title: '访问列表元素',
        code: 'sentence = "我 爱 编 程"\nwords = sentence.split(" ")\nprint("第一个词:", words[0])\nprint("第二个词:", words[1])\nprint("共", len(words), "个词")',
        output: '第一个词: 我\n第二个词: 爱\n共 4 个 词',
        explanation: '分割后得到["我","爱","编","程"]四个元素的列表。用words[0]、words[1]可以访问特定位置的词。'
      },
      practice: [
        {
          question: 'len(words) 返回什么？',
          answer: '返回列表中元素的个数'
        },
        {
          question: '如何访问列表的最后一个元素？',
          answer: '用 words[len(words)-1] 或 words[-1]'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '列表大师模式！你可以遍历列表的每个元素，对它们进行处理，实现强大的数据处理功能！',
      concept: '可以用for循环遍历列表的所有元素，或者用切片获取列表的一部分。熟练操作列表是Python的重要技能。',
      syntax: 'for word in words:\n    处理每个word\nwords[0:2]  # 获取前两个元素',
      example: {
        title: '遍历分割结果',
        code: 'text = "apple,banana,cherry"\nfruits = text.split(",")\nfor fruit in fruits:\n    print("水果:", fruit)',
        output: '水果: apple\n水果: banana\n水果: cherry',
        explanation: '用for循环遍历fruits列表的每个元素，逐个打印出来。这是处理分割结果的常用方法。'
      },
      practice: [
        {
          question: 'for fruit in fruits 会执行几次？',
          answer: '取决于fruits列表的长度，每个元素执行一次'
        },
        {
          question: 'words[0:2] 会返回什么？',
          answer: '返回索引0到1的元素（不包括2），即前两个元素'
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
    question: '执行下面的代码，会得到几个元素？\n\n```python\ntext = "cat dog pig"\nwords = text.split(" ")\nprint(len(words))\n```\n\nA. 2个\nB. 3个\nC. 4个\nD. 5个',
    options: [
      'A. 2个',
      'B. 3个',
      'C. 4个',
      'D. 5个'
    ],
    answer: 1, // B
    explanation: '用空格分割"cat dog pig"得到三个单词：\n- cat\n- dog\n- pig\n\n列表包含3个元素，所以len(words)输出3。\n\n数学知识：数数看有多少个单词被空格分开。',
    hint: '数数空格把字符串分成了几部分'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '位置索引',
    question: '执行下面的代码，会打印什么？\n\n```python\nwords = ["苹果", "香蕉", "橙子"]\nprint(words[1])\n```\n\nA. 苹果\nB. 香蕉\nC. 橙子\nD. 出错',
    options: [
      'A. 苹果',
      'B. 香蕉',
      'C. 橙子',
      'D. 出错'
    ],
    answer: 1, // B
    explanation: '列表的索引从0开始：\n- words[0] = "苹果"\n- words[1] = "香蕉"\n- words[2] = "橙子"\n\n所以words[1]输出"香蕉"。\n\n数学知识：这是位置索引问题，第1号位置是第二个元素。',
    hint: '索引从0开始，0是第一个，1是第二个'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '分组问题',
    question: '执行下面的代码，会打印什么？\n\n```python\ndata = "5,10,15,20"\nnumbers = data.split(",")\ntotal = 0\nfor n in numbers:\n    total = total + int(n)\nprint(total)\n```\n\nA. "5,10,15,20"\nB. 50\nC. 4\nD. 15',
    options: [
      'A. "5,10,15,20"',
      'B. 50',
      'C. 4',
      'D. 15'
    ],
    answer: 1, // B
    explanation: '首先按逗号分割得到["5","10","15","20"]，然后累加：\n- total = 0 + 5 = 5\n- total = 5 + 10 = 15\n- total = 15 + 15 = 30\n- total = 30 + 20 = 50\n\n最后输出50。\n\n数学知识：这是分组后求和的问题：5+10+15+20=50。',
    hint: '先用逗号分割，再把每个数字转成整数相加'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '算式计算',
    question: '执行下面的代码，会输出什么？\n\n```python\ntext = "a b c d e"\nwords = text.split(" ")\nprint(words[2] + words[3])\n```\n\nA. "ab"\nB. "cd"\nC. "bc"\nD. "de"',
    options: [
      'A. "ab"',
      'B. "cd"',
      'C. "bc"',
      'D. "de"'
    ],
    answer: 1, // B
    explanation: '按空格分割后得到：\n- words[0] = "a"\n- words[1] = "b"\n- words[2] = "c"\n- words[3] = "d"\n- words[4] = "e"\n\nwords[2] + words[3] = "c" + "d" = "cd"\n\n数学知识：这是位置索引计算问题。',
    hint: '找出索引2和3对应的元素，然后拼接'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '分组问题',
    question: '执行下面的代码，count的值是多少？\n\n```python\ntext = "1,2,3,2,1,2,3,2,1"\nnumbers = text.split(",")\ncount = 0\nfor n in numbers:\n    if n == "2":\n        count = count + 1\nprint(count)\n```\n\nA. 2\nB. 3\nC. 4\nD. 9',
    options: [
      'A. 2',
      'B. 3',
      'C. 4',
      'D. 9'
    ],
    answer: 2, // C
    explanation: '分割后得到["1","2","3","2","1","2","3","2","1"]，统计等于"2"的个数：\n- 索引0: "1" ≠ "2"，跳过\n- 索引1: "2" = "2"，count=1\n- 索引2: "3" ≠ "2"，跳过\n- 索引3: "2" = "2"，count=2\n- 索引4: "1" ≠ "2"，跳过\n- 索引5: "2" = "2"，count=3\n- 索引6: "3" ≠ "2"，跳过\n- 索引7: "2" = "2"，count=4\n- 索引8: "1" ≠ "2"，跳过\n\n共4个"2"。\n\n数学知识：这是统计计数问题。',
    hint: '数数列表中有几个"2"'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '累加计算',
    question: '执行下面的代码，会打印什么？\n\n```python\ntext = "3,6,9,12"\nnums = text.split(",")\nresult = 0\nfor n in nums:\n    result = result + int(n)\nprint(result / len(nums))\n```\n\nA. 12\nB. 30\nC. 7.5\nD. 4',
    options: [
      'A. 12',
      'B. 30',
      'C. 7.5',
      'D. 4'
    ],
    answer: 2, // C
    explanation: '分割后得到["3","6","9","12"]：\n- result = 0 + 3 = 3\n- result = 3 + 6 = 9\n- result = 9 + 9 = 18\n- result = 18 + 12 = 30\n\nlen(nums) = 4\nresult / len(nums) = 30 / 4 = 7.5\n\n数学知识：这是计算平均数的问题：(3+6+9+12)÷4=7.5',
    hint: '先算总和：3+6+9+12，再除以个数4'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L2-2',
  title: '字符串分割',
  subtitle: '学会用 split() 分割字符串',
  difficulty: '进阶',
  estimatedTime: '30-40分钟',
  learningGoals: [
    '掌握 split() 命令的基本用法',
    '学会选择合适的分隔符',
    '理解列表的概念和索引',
    '学会处理分割后的结果'
  ],
  prerequisites: [
    '掌握 print() 命令',
    '理解字符串的基本概念',
    '会使用变量',
    '了解 for 循环'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['split', 'list', 'index', 'comma', 'for', 'in'],
  medium: ['separator', 'divide', 'piece', 'result', 'range', 'shoot'],
  hard: ['delimiter', 'partition', 'aggregate', 'iterate']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'text = "hello world"',
    'words = text.split(" ")',
    'print(words)',
    'data.split(",")'
  ],
  medium: [
    'text = "apple,banana,cherry"\nfruits = text.split(",")',
    'words = "one two three"\nfor word in words.split(" "):\nprint(word)',
    'data = "1,2,3,4"\nnums = data.split(",")',
    'print(len(words))'
  ],
  hard: [
    'csv = "name,age,city"\nparts = csv.split(",")\nprint(parts[0])',
    'text = "a-b-c-d"\nitems = text.split("-")\nfor i in range(len(items)):\nprint(items[i])',
    'data = "10,20,30,40"\nnums = data.split(",")\ntotal = 0\nfor n in nums:\ntotal = total + int(n)\nprint(total)',
    'text = "key=value:key2=value2"\nparts = text.split(":")\nfor part in parts:\nk, v = part.split("=")'
  ]
}

// 导出所有数据
export const L2_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L2_2_data
