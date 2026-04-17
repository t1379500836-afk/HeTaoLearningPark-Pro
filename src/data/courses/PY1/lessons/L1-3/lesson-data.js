/**
 * PY1 课程 L1-3: 智能判断门
 *
 * 核心知识点:
 * 1. if 条件判断 - 根据条件执行代码
 * 2. 比较运算符 - 比较大小和是否相等
 * 3. else 分支 - 条件不满足时执行
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'if',
    pronunciation: '[if]',
    partOfSpeech: 'conj.',
    meaning: '如果；倘若',
    level: 'easy',
    example: 'If you do not study hard, you will not get good grades.',
    exampleTranslation: '如果你不努力学习，你将不会获得好成绩。',
    note: '条件判断关键字',
    source: 'ocr'
  },
  {
    word: 'turn',
    pronunciation: '[tɜːrn]',
    partOfSpeech: 'v./n.',
    meaning: '转向；转弯；转变',
    level: 'easy',
    example: 'You need to turn left to avoid the stones.',
    exampleTranslation: '你需要左转避开石头。',
    note: 'turn left 向左转；turn right 向右转',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'else',
    pronunciation: '[els]',
    partOfSpeech: 'adv./adj.',
    meaning: '别的；其他的',
    level: 'easy',
    example: 'If you are ready, go. Else wait.',
    exampleTranslation: '如果你准备好了就走，否则等待。',
    note: 'else 否则（if-else语句）',
    source: 'extended'
  },
  {
    word: 'condition',
    pronunciation: '[kənˈdɪʃn]',
    partOfSpeech: 'n.',
    meaning: '条件；情况；状态',
    level: 'medium',
    example: 'Check the condition first.',
    exampleTranslation: '先检查条件。',
    note: 'if 后面跟的就是条件',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '智能判断门 - if条件判断',
    emoji: '🚪',
    gradeLevel: '1-2',
    summary: '根据条件决定是否执行某段代码',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象有一扇智能门，只有当你答对问题或满足条件时，它才会打开让你通过！',
      concept: 'if 条件判断可以让程序根据条件来决定是否执行某段代码。条件为真就执行，条件为假就不执行。',
      syntax: "if 条件:\n    要执行的代码",
      example: {
        title: '年龄检查',
        code: "age = 7\nif age >= 6:\n    print('你可以上学了！')",
        output: '你可以上学了！',
        explanation: 'age 是 7，7 >= 6 是真的，所以执行 print() 语句。'
      },
      practice: [
        {
          question: 'if 后面的条件满足时会发生什么？',
          answer: '执行 if 下面的代码'
        },
        {
          question: 'if 后面的条件不满足时会发生什么？',
          answer: '不执行 if 下面的代码，直接跳过'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '智能判断门升级了！它不仅能检查年龄，还能检查分数、身高、时间等各种条件，让程序更聪明！',
      concept: 'if 条件判断可以用于各种场景：检查分数是否及格、判断天气、验证密码等等。条件成立才执行相应的代码。',
      syntax: "if 分数 >= 60:\n    print('及格了！')",
      example: {
        title: '成绩判断',
        code: "score = 85\nif score >= 60:\n    print('恭喜你及格了！')\n    print('继续加油！')",
        output: '恭喜你及格了！\n继续加油！',
        explanation: 'score 是 85，85 >= 60 为真，所以执行两句 print()。注意缩进要对齐！'
      },
      practice: [
        {
          question: 'if 下面的代码为什么要缩进？',
          answer: '缩进的代码属于 if 块，只有条件满足才会执行'
        },
        {
          question: '如果 score = 50，上面的代码会输出什么？',
          answer: '什么都不会输出，因为条件不满足'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '判断大师模式！if 是编程中最基础也最重要的控制结构，理解条件判断是写出智能程序的关键！',
      concept: 'if 语句的判断结果只有两种：True（真）或 False（假）。这是布尔值，是编程中做出决策的基础。',
      syntax: "if True:\n    # 一定会执行\nif False:\n    # 一定不执行\n\n# 实际应用\nage = int(input('年龄：'))\nif age >= 18:\n    print('你已经成年了')",
      example: {
        title: '多条件判断',
        code: "age = 20\nif age >= 6 and age <= 12:\n    print('你是小学生')\nif age >= 13 and age <= 15:\n    print('你是初中生')\nif age >= 16:\n    print('你是高中生或成年人')",
        output: '你是高中生或成年人',
        explanation: '程序依次检查每个 if 条件，age=20 只满足最后一个条件，所以只输出最后一行。'
      },
      practice: [
        {
          question: 'if 条件判断的结果有几种可能？',
          answer: '两种：True（真）或 False（假）'
        },
        {
          question: '多个 if 语句会同时执行吗？',
          answer: '每个 if 都会独立判断，条件满足就执行，不满足就跳过'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '比比看谁更大 - 比较运算符',
    emoji: '⚖️',
    gradeLevel: '1-2',
    summary: '比较两个值的大小或是否相等',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个天平，可以比较两个东西哪个更重！编程中的比较运算符就像这个天平，可以比较数字的大小！',
      concept: '比较运算符用来比较两个值，结果是真或假。常用的有：大于(>)、小于(<)、等于(==)。',
      syntax: "# 大于\n5 > 3  ✓(真)\n\n# 小于\n2 < 4  ✓(真)\n\n# 等于\n5 == 5 ✓(真)",
      example: {
        title: '大小比较',
        code: "print(5 > 3)\nprint(2 < 1)\nprint(7 == 7)",
        output: 'True\nFalse\nTrue',
        explanation: '比较结果是真(True)或假(False)。5>3是真的，2<1是假的，7==7是真的。'
      },
      practice: [
        {
          question: '10 > 5 是真的还是假的？',
          answer: '真的(True)'
        },
        {
          question: '在 Python 中，等于用什么符号表示？',
          answer: '用两个等号 ==（一个等号=是赋值）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '天平升级了！现在你可以比较更多的情况：大于等于、小于等于、不等于，让比较更精确！',
      concept: 'Python 有 6 种比较运算符：大于(>)、小于(<)、等于(==)、不等于(!=)、大于等于(>=)、小于等于(<=)。',
      syntax: "a > b    # a 大于 b\na < b    # a 小于 b\na == b   # a 等于 b\na != b   # a 不等于 b\na >= b   # a 大于等于 b\na <= b   # a 小于等于 b",
      example: {
        title: '多种比较',
        code: "age = 10\nprint(age >= 6)   # 年龄大于等于6\nprint(age <= 12)  # 年龄小于等于12\nprint(age != 5)   # 年龄不等于5\nprint(age == 10)  # 年龄等于10",
        output: 'True\nTrue\nTrue\nTrue',
        explanation: 'age=10 满足所有这些条件，所以结果都是 True。'
      },
      practice: [
        {
          question: '>= 和 > 有什么区别？',
          answer: '>= 表示大于等于（包含等于），> 只表示大于（不包含等于）'
        },
        {
          question: '!= 表示什么意思？',
          answer: '不等于'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '比较大师模式！比较运算符不仅可以用在数字上，还可以比较文字、判断各种条件，是编程中必不可少的工具！',
      concept: '比较运算符不仅可以比较数字，还可以比较字符串（按字母顺序）。比较的结果永远是布尔值（True或False）。',
      syntax: "# 数字比较\n5 > 3\n\n# 字符串比较（按字母顺序）\n'apple' < 'banana'\n\n# 大小写敏感\n'Apple' != 'apple'",
      example: {
        title: '综合比较',
        code: "# 数字比较\nprint(10 > 5)\n\n# 字符串比较\nprint('a' < 'b')\n\n# 大小写不同\nprint('A' == 'a')\n\n# 负数比较\nprint(-5 > -10)",
        output: 'True\nTrue\nFalse\nTrue',
        explanation: '字符串按字母顺序比较，大小写字母不同（A的编码比a小），负数-5比-10大。'
      },
      practice: [
        {
          question: '"apple" > "banana" 的结果是？',
          answer: 'False，因为 a 在字母表中排在 b 前面'
        },
        {
          question: '为什么比较字符串时 "Apple" != "apple"？',
          answer: '因为大小写不同，在计算机中它们的编码值不同'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '备选通道 - else分支',
    emoji: '🔀',
    gradeLevel: '3-4',
    summary: '条件不满足时执行 else 中的代码',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '智能判断门有一个秘密通道！如果正门不开（条件不满足），你就可以走秘密通道（else）通过！',
      concept: 'else 分支是"否则"的意思。当 if 条件不满足时，就执行 else 下面的代码。',
      syntax: "if 条件:\n    条件满足时执行\nelse:\n    条件不满足时执行",
      example: {
        title: '及格判断',
        code: "score = 55\nif score >= 60:\n    print('及格了')\nelse:\n    print('需要努力')",
        output: '需要努力',
        explanation: 'score 是 55，55 >= 60 是假的，所以执行 else 下面的代码。'
      },
      practice: [
        {
          question: 'else 中的代码什么时候会执行？',
          answer: '当 if 条件不满足时执行'
        },
        {
          question: 'if 和 else 能同时执行吗？',
          answer: '不能，只能执行其中一个'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '秘密通道升级！现在你可以在两种选择之间做出判断：满足条件做一件事，不满足就做另一件事！',
      concept: 'if-else 结构提供了"二选一"的能力。无论条件是否满足，都会有相应的代码被执行。',
      syntax: "age = 5\nif age >= 6:\n    print('可以上学')\nelse:\n    print('再等等')",
      example: {
        title: '年龄判断',
        code: "age = 8\nif age >= 6:\n    print('你已经可以上学了！')\nelse:\n    print('还要再等等哦！')",
        output: '你已经可以上学了！',
        explanation: 'age 是 8，满足 age >= 6，所以执行 if 下面的代码，else 被跳过。'
      },
      practice: [
        {
          question: '如果 age = 4，上面的代码会输出什么？',
          answer: '还要再等等哦！'
        },
        {
          question: 'else 后面能加条件吗？',
          answer: '不能，else 后面不能加条件，无条件执行。要用条件应该用 elif'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '决策大师模式！if-else 是编程中"二选一"的核心结构，理解这种互斥关系是写出逻辑清晰程序的基础！',
      concept: 'if-else 是互斥的，只能执行其中一个。需要更多选项时，可以用 if-elif-else 结构。',
      syntax: "# 二选一\nif 条件:\n    代码A\nelse:\n    代码B\n\n# 三选一\nif 条件1:\n    代码A\nelif 条件2:\n    代码B\nelse:\n    代码C",
      example: {
        title: '成绩评级',
        code: "score = 85\nif score >= 90:\n    print('优秀')\nelif score >= 80:\n    print('良好')\nelif score >= 60:\n    print('及格')\nelse:\n    print('不及格')",
        output: '良好',
        explanation: 'score=85，不满足>=90，但满足>=80，所以输出"良好"。只执行第一个满足条件的分支。'
      },
      practice: [
        {
          question: 'elif 是什么意思？',
          answer: 'else if 的缩写，意思是"否则如果" '
        },
        {
          question: 'if-elif-else 结构中，会执行几个分支？',
          answer: '只会执行第一个满足条件的分支，执行后就结束'
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
    mathConcept: '大小比较',
    question: '下面哪段代码能正确判断数字 5 是否大于 3？\n\nA. if 5 > 3\nB. if 5 > 3:\nC. if (5 > 3)\nD. if 5 >= 3',
    options: [
      'A. if 5 > 3',
      'B. if 5 > 3:',
      'C. if (5 > 3)',
      'D. if 5 >= 3'
    ],
    answer: 1, // B
    explanation: 'if 条件判断的格式是：if 条件:\n\n- A选项：缺少冒号\n- B选项：正确！\n- C选项：Python不需要括号\n- D选项：>=是大于等于，不是大于',
    hint: 'if 语句后面需要加冒号'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '相等判断',
    question: '执行下面的代码，会输出什么？\n\n```python\nn = 5\nif n == 5:\n    print("等于五")\nelse:\n    print("不等于五")\n```\n\nA. "等于五"\nB. "不等于五"\nC. 5\nD. 什么都不会输出',
    options: [
      'A. "等于五"',
      'B. "不等于五"',
      'C. 5',
      'D. 什么都不会输出'
    ],
    answer: 0, // A
    explanation: 'n 是 5，条件 n == 5 是真的，所以执行 if 下面的代码，输出"等于五"。\n\n数学知识：== 是判断相等的符号。',
    hint: '== 是判断相等的符号'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '范围判断',
    question: '小明的年龄是 10 岁。下面哪段代码能正确判断他是不是小学生（6-12岁）？\n\nA. if age > 6 and age < 12\nB. if age >= 6 and age <= 12\nC. if age > 6 or age < 12\nD. if age >= 6 or age <= 12',
    options: [
      'A. if age > 6 and age < 12',
      'B. if age >= 6 and age <= 12',
      'C. if age > 6 or age < 12',
      'D. if age >= 6 or age <= 12'
    ],
    answer: 1, // B
    explanation: '需要包含 6 岁和 12 岁，所以要用 >= 和 <=。\n\n- A选项：不包含6岁和12岁\n- B选项：正确！6到12岁都包含\n- C选项：用or是错误的逻辑\n- D选项：用or是错误的逻辑\n\n数学知识：包含边界值用>=和<=。',
    hint: '包含边界值要用 >= 和 <='
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '奇偶判断',
    question: '如何判断一个数字 n 是偶数？\n\nA. if n % 2 == 0\nB. if n % 2 == 1\nC. if n / 2 == 0\nD. if n == 2',
    options: [
      'A. if n % 2 == 0',
      'B. if n % 2 == 1',
      'C. if n / 2 == 0',
      'D. if n == 2'
    ],
    answer: 0, // A
    explanation: '% 是取余数运算符。偶数除以 2 余数是 0，奇数除以 2 余数是 1。\n\n- A选项：正确！偶数余数为0\n- B选项：这是判断奇数\n- C选项：/ 是除法，不是取余\n- D选项：只能判断是否等于2\n\n数学知识：偶数能被2整除，余数为0。',
    hint: '偶数除以 2 的余数是 0'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '连续判断',
    question: '执行下面的代码，会输出什么？\n\n```python\nn = 15\nif n < 10:\n    print("A")\nelif n < 20:\n    print("B")\nelse:\n    print("C")\n```',
    options: [
      'A',
      'B',
      'C',
      'AB'
    ],
    answer: 1, // B
    explanation: 'n=15，依次判断条件：\n\n1. n < 10？15 < 10 是假，跳过\n2. n < 20？15 < 20 是真，执行 print("B")\n3. 执行完后就结束了，不会继续判断\n\n所以只输出"B"。\n\n数学知识：数值范围判断。',
    hint: '只执行第一个满足条件的分支'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '三数比较',
    question: '找出三个数中最大的一个，应该用？\n\n```python\na = 5\nb = 8\nc = 3\n```\n\nA. if a > b and a > c\nB. if b > a or b > c\nC. if a > b: print(b)\nD. if b >= a and b >= c',
    options: [
      'A. if a > b and a > c',
      'B. if b > a or b > c',
      'C. if a > b: print(b)',
      'D. if b >= a and b >= c'
    ],
    answer: 3, // D
    explanation: '要判断 b 是最大的，需要证明 b 大于等于 a 和 b 大于等于 c。\n\n- A选项：这是判断 a 是最大的\n- B选项：用 or 是错误的逻辑\n- C选项：逻辑混乱\n- D选项：正确！b>=a 且 b>=c，说明 b 最大\n\n数学知识：最大值的定义是大于等于其他所有值。',
    hint: '最大值要大于等于其他所有数'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L1-3',
  title: '智能判断门',
  subtitle: '学会 if 条件判断、比较运算符和 else 分支',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握 if 条件判断的基本语法',
    '理解比较运算符的使用',
    '学会使用 else 分支',
    '能编写简单的判断程序'
  ],
  prerequisites: [
    'Python 基础语法',
    '变量概念',
    'print() 命令',
    '基本数学运算'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['if', 'else', 'true', 'false', 'turn'],
  medium: ['equal', 'compare', 'greater', 'less'],
  hard: ['condition', 'operator', 'boolean', 'statement']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    "if a > b:\n    print('yes')",
    "if age >= 6:\n    print('ok')",
    "if n == 5:\n    print('five')",
    "if score < 60:\n    print('fail')",
    "if x != 0:\n    print(x)"
  ],
  medium: [
    "if age >= 18:\n    print('adult')\nelse:\n    print('child')",
    "if score >= 60:\n    print('pass')\nelse:\n    print('fail')",
    "if a > b:\n    print(a)\nelse:\n    print(b)",
    "if n % 2 == 0:\n    print('even')\nelse:\n    print('odd')",
    "if age >= 6 and age <= 12:\n    print('student')"
  ],
  hard: [
    "if score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelse:\n    print('C')",
    "if a > b and a > c:\n    print(a)\nelif b > a and b > c:\n    print(b)\nelse:\n    print(c)",
    "age = int(input())\nif age >= 18:\n    print('adult')\nelse:\n    print('minor')",
    "n = int(input())\nif n % 2 == 0:\n    print('even')\nelse:\n    print('odd')",
    "if x > 0:\n    print('positive')\nelif x < 0:\n    print('negative')\nelse:\n    print('zero')"
  ]
}

// 导出所有数据
export const L1_3_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L1_3_data
