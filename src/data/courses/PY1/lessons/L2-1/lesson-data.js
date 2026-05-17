/**
 * PY1 课程 L2-1: if-else 分支判断
 *
 * 核心知识点:
 * 1. if-else 语句格式
 * 2. if-else 执行逻辑
 * 3. if-else 应用场景
 */

// 单词卡数据 - OCR 提取
export const vocabData = [
  {
    word: 'hit',
    pronunciation: '[hit]',
    partOfSpeech: 'v./n.',
    meaning: '打；打击；击中；命中',
    level: 'easy',
    example: 'hit song 畅销歌曲',
    exampleTranslation: '畅销歌曲',
    note: 'hit 击打'
  },
  {
    word: 'else',
    pronunciation: '[els]',
    partOfSpeech: 'adv./adj.',
    meaning: '别的；其他的',
    level: 'easy',
    example: 'If you are ready, go. Else wait.',
    exampleTranslation: '如果你准备好了就走，否则等待。',
    note: 'else 否则（if-else语句）'
  },
  {
    word: 'link',
    pronunciation: '[liŋk]',
    partOfSpeech: 'n./v.',
    meaning: '链接；连接；联系',
    level: 'medium',
    example: 'Click the link to open the page.',
    exampleTranslation: '点击链接打开页面。',
    note: 'link 链接'
  },
  {
    word: 'replace',
    pronunciation: "[ri'pleis]",
    partOfSpeech: 'v.',
    meaning: '取代；代替',
    level: 'medium',
    example: 'Replace the old with the new.',
    exampleTranslation: '用新的取代旧的。',
    note: 'replace 替换'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '条件分支 - if-else语句',
    emoji: '🔀',
    gradeLevel: '1-2',
    summary: '根据条件选择执行不同的代码',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个魔法门，门前有一个开关。当你按下按钮时，门会打开；不按的话，门就关闭。if-else就像这样，根据条件决定做什么！',
      concept: 'if-else语句：条件成立时，执行if的下级代码；否则，执行else的下级代码。',
      syntax: 'if 条件:\n    要执行的代码\nelse:\n    否则执行的代码',
      example: {
        title: '简单的if-else',
        code: 'age = 10\nif age >= 6:\n    print("可以上学")\nelse:\n    print("再等等")',
        output: '可以上学',
        explanation: 'age是10，10>=6条件成立，所以执行print("可以上学")。'
      },
      practice: [
        {
          question: 'if-else语句中，else是什么意思？',
          answer: '否则，表示条件不成立时执行'
        },
        {
          question: 'if和else的下级代码需要缩进吗？',
          answer: '需要，都要缩进一次'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的判断能力升级了！现在可以根据不同的条件做不同的事情，就像有多个答案的问答机器！',
      concept: 'if-else语句可以判断两种情况：条件成立或不成立。根据条件选择执行不同的代码。',
      syntax: 'if 条件:\n    条件成立时执行的代码\nelse:\n    条件不成立时执行的代码',
      example: {
        title: '判断成绩是否合格',
        code: 'score = 75\nif score >= 60:\n    print("合格")\nelse:\n    print("需要努力")',
        output: '合格',
        explanation: 'score是75，75>=60条件成立，所以打印"合格"。'
      },
      practice: [
        {
          question: 'if和else哪个先执行？',
          answer: '先执行if，条件不成立才执行else'
        },
        {
          question: 'if和else需要同级对齐吗？',
          answer: '需要，if和else要在同一个缩进级别'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '判断大师模式！你可以用复杂的条件来判断不同的情况！',
      concept: 'if-else可以嵌套使用，也可以和变量、运算结合使用来实现复杂的判断逻辑。',
      syntax: 'if 条件1:\n    代码1\nelse:\n    if 条件2:\n        代码2\n    else:\n        代码3',
      example: {
        title: '分段判断成绩',
        code: 'score = 85\nif score >= 90:\n    print("优秀")\nelse:\n    if score >= 80:\n        print("良好")\n    else:\n        print("继续努力")',
        output: '良好',
        explanation: '85>=90不成立，进入else。85>=80成立，打印"良好"。'
      },
      practice: [
        {
          question: 'if-else可以嵌套使用吗？',
          answer: '可以，else中还可以放if-else'
        },
        {
          question: '多个if-else嵌套时要注意什么？',
          answer: '注意缩进层次不要混乱'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '判断规则 - 执行顺序',
    emoji: '📋',
    gradeLevel: '1-2',
    summary: '理解if-else的执行顺序',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你在做选择题，题目只有一个条件。满足就选A，不满足就选B。这就是if-else的原理！',
      concept: 'if-else的执行顺序：从上到下，先判断if的条件，条件成立执行if的代码并结束，否则执行else的代码。',
      syntax: '从上到下判断：\n1. if条件 -> 成立就执行\n2. 否则 -> 执行else',
      example: {
        title: '判断大小',
        code: 'a = 5\nb = 3\nif a > b:\n    print("a更大")\nelse:\n    print("b更大")',
        output: 'a更大',
        explanation: 'a=5，b=3，5>3条件成立，执行if的代码打印"a更大"。'
      },
      practice: [
        {
          question: 'if的条件成立时，会执行else的代码吗？',
          answer: '不会，执行完if就结束整个if-else'
        },
        {
          question: 'if-else从上到下执行的顺序是怎样的？',
          answer: '先判断if，if不成立才判断else'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的判断逻辑更清晰了！现在你能理解程序的执行顺序，就像看懂老师的指令一样！',
      concept: '执行顺序：①从上到下逐行执行 ②if条件成立执行if下级代码 ③if条件不成立执行else下级代码。',
      syntax: '执行规则：\n① 先判断if的条件\n② 成立 -> 执行if代码并结束\n③ 不成立 -> 执行else代码',
      example: {
        title: '判断是否及格',
        code: 'score = 58\nif score >= 60:\n    print("及格")\nelse:\n    print("不及格")\nprint("程序结束")',
        output: '不及格\n程序结束',
        explanation: '58>=60不成立，执行else，打印"不及格"，然后继续执行后面的print("程序结束")。'
      },
      practice: [
        {
          question: 'if-else执行完后，程序会继续往下执行吗？',
          answer: '会，继续执行if-else后面的代码'
        },
        {
          question: 'else后面的代码什么时候执行？',
          answer: '当if条件不成立时执行'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '执行顺序专家！你现在完全理解程序的运行规则了！',
      concept: '复杂的执行顺序：多个if-else嵌套时，从最外层开始判断，逐层深入，找到第一个满足的条件就执行并结束。',
      syntax: '多层嵌套执行顺序：\n从外到内逐层判断\n找到满足条件就执行\n不再继续判断后面的else',
      example: {
        title: '找最大数',
        code: 'a = 10\nb = 20\nc = 15\nif a > b:\n    if a > c:\n        print("a最大")\n    else:\n        print("c最大")\nelse:\n    if b > c:\n        print("b最大")\n    else:\n        print("c最大")',
        output: 'b最大',
        explanation: '10>20不成立，进入第一个else。20>15成立，进入第二个if，打印"b最大"。'
      },
      practice: [
        {
          question: '嵌套的if-else如何执行？',
          answer: '从外到内逐层判断'
        },
        {
          question: '找到一个满足条件后还会继续判断吗？',
          answer: '不会，执行完就结束'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '实际应用 - 判断问题',
    emoji: '🎯',
    gradeLevel: '1-2',
    summary: '用if-else解决实际问题',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个机器人，你可以让它根据不同的情况做不同的事情！比如：如果下雨了，就撑伞；否则，就不带伞。',
      concept: 'if-else可以用于根据不同的情况执行不同的操作。',
      syntax: 'if 情况:\n    这样做\nelse:\n    那样做',
      example: {
        title: '判断天气',
        code: 'weather = "下雨"\nif weather == "下雨":\n    print("带伞")\nelse:\n    print("不带伞")',
        output: '带伞',
        explanation: 'weather是"下雨"，weather=="下雨"成立，执行print("带伞")。'
      },
      practice: [
        {
          question: 'if-else可以用于判断什么？',
          answer: '可以判断各种情况，如天气、成绩、年龄等'
        },
        {
          question: '判断相等用什么符号？',
          answer: '用两个等于号 =='
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的应用能力更强了！现在可以用if-else来解决实际的编程问题！',
      concept: '用if-else解决实际问题的步骤：①分析需要判断什么条件 ②根据条件写对应的代码。',
      syntax: '实际问题解决步骤：\n1. 确定判断条件\n2. 写if-else结构\n3. 填充具体代码',
      example: {
        title: '判断身高',
        code: 'height = 125\nif height >= 120:\n    print("可以玩过山车")\nelse:\n    print("不能玩过山车")',
        output: '可以玩过山车',
        explanation: 'height是125，125>=120条件成立，所以可以玩过山车。'
      },
      practice: [
        {
          question: '解决实际问题前首先要做什么？',
          answer: '先分析需要判断什么条件'
        },
        {
          question: 'if-else适合判断几种情况？',
          answer: '两种情况：成立或不成立'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '应用大师！你可以用if-else解决各种复杂的实际问题！',
      concept: '复杂的实际问题需要结合多个条件来判断，可以用嵌套的if-else来实现。',
      syntax: '复杂问题解决：\n分析多个条件\n使用嵌套if-else\n逐层判断',
      example: {
        title: '判断成绩等级',
        code: 'score = 87\nif score >= 90:\n    grade = "A"\nelse:\n    if score >= 80:\n        grade = "B"\n    else:\n        if score >= 70:\n            grade = "C"\n        else:\n            grade = "D"\nprint("等级是" + grade)',
        output: '等级是B',
        explanation: '87>=90不成立，87>=80成立，所以等级是B。'
      },
      practice: [
        {
          question: '复杂问题如何用if-else解决？',
          answer: '通过嵌套多个if-else'
        },
        {
          question: 'if-else嵌套要注意什么？',
          answer: '注意缩进和对应关系'
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
    mathConcept: '条件判断',
    question: '运行下面的代码，程序会打印什么？\n\n```python\na = 10\nb = 5\nif a > b:\n    print("A")\nelse:\n    print("B")\n```',
    options: [
      'A. A',
      'B. B',
      'C. A B',
      'D. 程序报错'
    ],
    answer: 0, // A
    explanation: 'a=10，b=5，10>5条件成立，执行if的下级代码print("A")，所以打印A。',
    hint: '10 > 5 是否成立？'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '符号识别',
    question: '下面哪个符号表示"等于"？',
    options: [
      'A. = (单个等号)',
      'B. == (两个等号)',
      'C. >= (大于等于)',
      'D. <= (小于等于)'
    ],
    answer: 1, // B
    explanation: '在Python中，判断相等要用两个等号==。单个等号=是赋值，两个等号==是判断相等。',
    hint: '判断相等用两个等号'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '条件判断',
    question: '运行下面的代码，输入6，会打印什么？\n\n```python\na = input()\nif a > "5":\n    print("大于5")\nelse:\n    print("不大于5")\n```',
    options: [
      'A. 大于5',
      'B. 不大于5',
      'C. 程序报错',
      'D. 没有输出'
    ],
    answer: 1, // B
    explanation: 'input()返回的是字符串"6"，字符串"6"和字符串"5"比较，"6">"5"不成立（按字典序），所以执行else，打印"不大于5"。\n\n注意：input()返回的是字符串，需要转换为数字。',
    hint: 'input()返回的是字符串类型'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '执行顺序',
    question: '下面哪个if-else格式是正确的？',
    options: [
      'A. 正确格式（A选项）',
      'B. B选项',
      'C. C选项',
      'D. D选项'
    ],
    answer: 0, // A
    explanation: '正确的if-else格式：if条件后面要有冒号，if和else要对齐，它们下面的代码要缩进。选项A符合所有要求。',
    hint: '注意冒号和缩进'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '嵌套判断',
    question: '运行下面的代码，会打印什么？\n\n```python\na = 15\nif a > 10:\n    if a > 20:\n        print("A")\n    else:\n        print("B")\nelse:\n    print("C")\n```',
    options: [
      'A. A',
      'B. B',
      'C. C',
      'D. A B'
    ],
    answer: 1, // B
    explanation: '15>10成立，进入第一个if。15>20不成立，进入else，打印"B"。所以输出是B。',
    hint: '先判断第一个条件，满足后再判断第二个'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合应用',
    question: '编写程序判断年份是否为闰年（年份能被4整除且不能被100整除，或者能被400整除）。输入2024判断是否闰年？',
    options: [
      'A. 闰年',
      'B. 平年',
      'C. 程序报错',
      'D. 闰年 平年'
    ],
    answer: 0, // A
    explanation: '2024%4=0且2024%100!=0，条件成立，打印"闰年"。\n\n数学知识：闰年判断规则（能被4整除且不能被100整除）或能被400整除。',
    hint: '2024能否被4整除？'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L2-1',
  title: 'if-else 分支判断',
  subtitle: '学会 if-else 分支判断',
  difficulty: '进阶',
  estimatedTime: '30-40分钟',
  learningGoals: [
    '理解 if-else 语句的基本格式',
    '掌握 if-else 的执行逻辑',
    '能够使用 if-else 解决实际问题',
    '了解 if-else 的嵌套使用'
  ],
  prerequisites: [
    '掌握 print() 命令',
    '理解变量的概念',
    '会使用比较运算符',
    '了解 if 条件判断'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['if', 'else', 'condition', 'branch'],
  medium: ['execute', 'logic', 'indent', 'colon'],
  hard: ['nested', 'structure', 'comparison', 'decision']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'if a > 5:\nprint(1)',
    'if age >= 6:\nprint("可以")',
    'if name == "Tom":\nprint(1)',
    'if a > b:\nprint("大")\nelse:\nprint("小")'
  ],
  medium: [
    'if score >= 60:\nprint("及格")\nelse:\nprint("不及格")',
    'if a > b:\n    print("a更大")\nelse:\n    print("b更大")',
    'num = input()\nif int(num) > 10:\n    print("大于10")',
    'if a == b:\n    print("相等")\nelse:\n    print("不相等")'
  ],
  hard: [
    'if a > 10:\n    if a > 20:\n        print("A")\n    else:\n        print("B")\nelse:\n    print("C")',
    'if score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelse:\n    grade = "C"',
    'if a > b and a > c:\n    print("a最大")\nelse:\n    if b > c:\n        print("b最大")\n    else:\n        print("c最大")'
  ]
}

// 导出所有数据
export const L2_1_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L2_1_data