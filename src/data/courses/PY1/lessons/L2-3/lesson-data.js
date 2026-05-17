/**
 * PY1 课程 L2-3: 智能门与密码锁
 *
 * 核心知识点:
 * 1. rotateTo() - 控制舵机旋转
 * 2. getIRKey() - 获取红外遥控按键
 * 3. 字符串拼接与 isdigit()
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'rotate',
    pronunciation: '[rəʊˈteɪt]',
    partOfSpeech: 'v.',
    meaning: '旋转；转动',
    level: 'easy',
    example: 'Rotate the image.',
    exampleTranslation: '旋转图像。',
    source: 'ocr'
  },
  {
    word: 'digit',
    pronunciation: '[ˈdɪdʒɪt]',
    partOfSpeech: 'n.',
    meaning: '数字；位数',
    level: 'easy',
    example: 'Enter a digit.',
    exampleTranslation: '输入一个数字。',
    source: 'ocr'
  },
  {
    word: 'key',
    pronunciation: '[kiː]',
    partOfSpeech: 'n.',
    meaning: '钥匙；按键',
    level: 'easy',
    example: 'Car key.',
    exampleTranslation: '汽车钥匙。',
    source: 'ocr'
  },
  {
    word: 'infrared',
    pronunciation: '[ɪnfrəˈred]',
    partOfSpeech: 'adj.',
    meaning: '红外的',
    level: 'hard',
    example: 'Infrared sensor.',
    exampleTranslation: '红外传感器。',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'password',
    pronunciation: '[ˈpæswɜːd]',
    partOfSpeech: 'n.',
    meaning: '密码；口令',
    level: 'medium',
    example: 'Please enter your password.',
    exampleTranslation: '请输入您的密码。',
    source: 'extended'
  },
  {
    word: 'result',
    pronunciation: '[rɪˈzʌlt]',
    partOfSpeech: 'n.',
    meaning: '结果',
    level: 'medium',
    example: 'The result is correct.',
    exampleTranslation: '结果是正确的。',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '控制舵机 - rotateTo()',
    emoji: '🔧',
    gradeLevel: '1-2',
    summary: '让舵机旋转到指定角度',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '舵机就像一个可以旋转的手臂，我们可以让它旋转到不同的角度来控制门的开关。',
      concept: 'rotateTo() 可以控制舵机旋转到指定角度，范围是 0 度到 180 度。',
      syntax: 'rotateTo(角度)',
      example: {
        title: '控制门开关',
        code: `if isPressed('A'):
    rotateTo(180)  # 开门
if isPressed('B'):
    rotateTo(90)   # 关门`,
        output: '',
        explanation: '按下 A 键舵机转到 180 度开门，按下 B 键舵机转到 90 度关门。'
      },
      practice: [
        {
          question: 'rotateTo(180) 会让舵机转到多少度？',
          answer: '180度'
        },
        {
          question: '舵机的转动范围是多少到多少？',
          answer: '0度到180度'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '舵机可以通过转动带着门旋转，实现门的开关。我们可以根据需要设置不同的角度。',
      concept: '舵机旋转到不同角度可以控制不同的设备，实现各种功能。',
      syntax: 'rotateTo(0)    # 最左边\nrotateTo(90)   # 中间\nrotateTo(180)  # 最右边',
      example: {
        title: '设置不同角度',
        code: `rotateTo(0)    # 转到最左边
rotateTo(90)   # 转到中间
rotateTo(180)  # 转到最右边`,
        output: '',
        explanation: '0度是最左边，90度是中间，180度是最右边。可以根据需要设置不同的角度。'
      },
      practice: [
        {
          question: 'rotateTo(90) 让舵机转到哪里？',
          answer: '中间位置'
        },
        {
          question: '想让舵机转到最右边应该用哪个角度？',
          answer: '180度'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '通过组合使用 rotateTo() 和条件判断，可以实现根据不同情况控制舵机转到不同角度。',
      concept: '结合条件判断，舵机可以根据不同情况转到不同角度。',
      syntax: `if 条件:
    rotateTo(角度1)
else:
    rotateTo(角度2)`,
      example: {
        title: '智能门控制',
        code: `password = '123'
key = getIRKey()
if key == 'ok':
    if result == password:
        rotateTo(180)  # 密码正确，开门
    else:
        rotateTo(90)   # 密码错误，关门`,
        output: '',
        explanation: '当按下 ok 键时，检查密码是否正确，正确则开门（180度），错误则关门（90度）。'
      },
      practice: [
        {
          question: 'rotateTo() 可以和什么语句结合使用？',
          answer: 'if 条件判断'
        },
        {
          question: '如何实现密码正确开门、错误关门？',
          answer: '用 if-else 判断密码，然后调用 rotateTo()'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '红外遥控 - getIRKey()',
    emoji: '📺',
    gradeLevel: '3-4',
    summary: '获取红外遥控器按下的按键',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '红外遥控就像一个无线按钮，按下遥控器上的键，智慧核心就能知道我们按的是哪个键。',
      concept: 'getIRKey() 可以获取红外遥控器按下的按键名称，返回的是字符串。',
      syntax: 'key = getIRKey()',
      example: {
        title: '获取遥控按键',
        code: `key = getIRKey()
if key == '左':
    rotateTo(180)
if key == '右':
    rotateTo(90)`,
        output: '',
        explanation: 'getIRKey() 获取按下的按键名称，然后根据按键名称执行不同的操作。'
      },
      practice: [
        {
          question: 'getIRKey() 返回什么类型？',
          answer: '字符串'
        },
        {
          question: "key == '左' 是什么意思？",
          answer: '判断按键是不是"左"键'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '红外遥控可以让我们远距离控制设备，非常方便。智慧核心接收到红外信号时，遥控器上的灯会亮。',
      concept: 'getIRKey() 获取按键时，智慧核心上的灯亮表示接收到信号。',
      syntax: `getIRKey() → 按键名称字符串
'左' '右' 'ok' '1' '2' '3' ...`,
      example: {
        title: '判断按键类型',
        code: `key = getIRKey()
if key == '左':
    print('向左')
if key == '右':
    print('向右')
if key == 'ok':
    print('确认')`,
        output: '',
        explanation: '根据不同的按键执行不同的操作。左键打印"向左"，右键打印"向右"，ok 键打印"确认"。'
      },
      practice: [
        {
          question: '红外遥控器的灯亮代表什么？',
          answer: '智慧核心接收到按键信号'
        },
        {
          question: 'getIRKey() 可以获取哪些按键？',
          answer: '左、右、ok、数字键等'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '红外遥控可以同时按下多个键来输入密码。通过 getIRKey() 逐个获取按键，可以实现密码输入功能。',
      concept: '通过循环和 getIRKey()，可以实现多位密码输入。',
      syntax: `result = ''
key = getIRKey()
if key.isdigit():
    result = result + key`,
      example: {
        title: '密码输入',
        code: `result = ''
key = getIRKey()
if key.isdigit():
    result = result + key
print(result)`,
        output: '',
        explanation: '每次获取一个按键，如果是数字就拼接起来，最终得到输入的密码。'
      },
      practice: [
        {
          question: '为什么要用 result = result + key？',
          answer: '把每次按下的数字累加在一起'
        },
        {
          question: 'getIRKey() 获取的内容是什么类型？',
          answer: '字符串'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '密码验证',
    emoji: '🔐',
    gradeLevel: '3-4',
    summary: '用字符串拼接和isdigit()实现密码锁',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '密码锁就像一个保险箱，我们需要输入正确的密码才能打开。',
      concept: '字符串拼接可以把多个字符连接在一起，形成密码。',
      syntax: `'12' + '3' → '123'`,
      example: {
        title: '拼接密码',
        code: `result = ''
result = result + '1'
result = result + '2'
result = result + '3'
print(result)`,
        output: '123',
        explanation: '通过不断拼接字符，最终得到完整的密码 "123"。'
      },
      practice: [
        {
          question: "'a' + 'b' + 'c' 会得到什么？",
          answer: '"abc"'
        },
        {
          question: '字符串拼接用什么符号？',
          answer: '加号 +'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'isdigit() 可以判断一个字符串是不是数字。如果按键是数字，就加入密码；如果不是（如 ok 键），就验证密码。',
      concept: 'key.isdigit() 判断字符串内容是否全是数字，全是数字返回 True，否则返回 False。',
      syntax: `'123'.isdigit() → True\n'abc'.isdigit() → False`,
      example: {
        title: '判断是否为数字',
        code: `print('123'.isdigit())
print('abc'.isdigit())
print('12ab'.isdigit())`,
        output: 'True\nFalse\nFalse',
        explanation: '"123"全是数字返回 True；"abc"不是数字返回 False；"12ab"包含字母返回 False。'
      },
      practice: [
        {
          question: "'abc'.isdigit() 返回什么？",
          answer: 'False'
        },
        {
          question: 'isdigit() 有什么用？',
          answer: '判断字符串是否全是数字'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '完整的密码锁需要：设置正确密码 → 获取按键 → 判断是否数字 → 拼接密码 → 验证密码。',
      concept: '综合使用字符串拼接、isdigit() 和条件判断，实现完整的密码验证系统。',
      syntax: `password = '123'
result = ''
key = getIRKey()
if key.isdigit():
    result = result + key
if key == 'ok':
    if result == password:
        开门
    else:
        提示错误`,
      example: {
        title: '完整密码锁',
        code: `password = '123'
result = ''
key = getIRKey()
if key.isdigit():
    result = result + key
if key == 'ok':
    if result == password:
        rotateTo(180)  # 开门
    else:
        printPos('密码错误', '中间')`,
        output: '',
        explanation: '输入数字时累加到 result，按 ok 时验证。密码正确开门，错误显示提示。'
      },
      practice: [
        {
          question: '按数字键时 result 会怎样变化？',
          answer: '把数字追加到 result 后面'
        },
        {
          question: '按 ok 键时程序做什么？',
          answer: '验证密码是否正确'
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
    mathConcept: '舵机控制',
    question: `观察这段代码，先按下A键，再按下B键，舵机最后会转到哪个角度？\n\n\`\`\`python\nif isPressed('A'):\n    rotateTo(180)\nif isPressed('B'):\n    rotateTo(90)\n\`\`\``,
    options: [
      '0度',
      '90度',
      '180度',
      '270度'
    ],
    answer: 1,
    explanation: 'rotateTo() 可以控制舵机转到对应角度。先按 A 键，舵机转到 180 度；再按 B 键，舵机转到 90 度。所以最后是 90 度。',
    hint: '每个 rotateTo() 都会执行'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '获取按键',
    question: `如果要实现按下红外遥控器的左键后，舵机转动到180度，应该补充哪段代码？\n\n\`\`\`python\nkey = ___\nif key == '左':\n    rotateTo(180)\n\`\`\``,
    options: [
      "key = '左'",
      "key = '右'",
      'key = getIRKey',
      'key = getIRKey()'
    ],
    answer: 3,
    explanation: 'getIRKey() 用于获取红外遥控器的按键名称，正确格式是 key = getIRKey()。直接 key = "左" 不管是否按左键都会执行。',
    hint: '获取按键要用 getIRKey()'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '判断数字',
    question: `判断遥控器按下的按键是不是数字，应该用什么代码？\n\n\`\`\`python\npassword = '123'\nkey = getIRKey()\nif key.___:\n    result = result + key\n\`\`\``,
    options: [
      'isdigit()',
      'isPressed()',
      'isTouched()',
      'getIRKey()'
    ],
    answer: 0,
    explanation: 'isdigit() 用于判断字符串里面的内容是不是数字。isPressed() 检测按键，isTouched() 检测触摸传感器。',
    hint: '判断是否为数字用 isdigit()'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '字符串拼接',
    question: `'123' + '456' 会得到什么？`,
    options: [
      '579',
      '123456',
      '123 + 456',
      '报错'
    ],
    answer: 1,
    explanation: '字符串用加号拼接，"123" + "456" = "123456"。不是数学加法，而是字符串连接。',
    hint: '加号用于字符串拼接'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '密码验证流程',
    question: `执行以下代码，输入密码"123"后按下ok键，会发生什么？\n\n\`\`\`python\npassword = '123'\nresult = ''\nkey = getIRKey()\nif key.isdigit():\n    result = result + key\nif key == 'ok':\n    if result == password:\n        rotateTo(180)\n    else:\n        print('错误')\n\`\`\``,
    options: [
      '开门（转到180度）',
      '打印"错误"',
      '没有任何反应',
      '舵机转到90度'
    ],
    answer: 0,
    explanation: '依次按下 1、2、3 时，result 变成 "123"。按下 ok 时，result=="123" 成立，rotateTo(180) 执行，开门。',
    hint: 'result 最终是"123"，和 password 相等'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合应用',
    question: `密码锁程序中，为什么要用 key.isdigit() 判断按键？`,
    options: [
      '为了排除 ok 键等非数字键',
      '为了加快程序速度',
      '因为红外遥控器只能发送数字',
      'isdigit() 可以获取按键'
    ],
    answer: 0,
    explanation: '密码输入只需要数字键，isdigit() 可以判断按键是否为数字，排除 ok 等功能键，确保密码只包含数字。',
    hint: '数字键之外的按键不应该加入密码'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L2-3',
  title: '智能门与密码锁',
  subtitle: '用红外遥控和舵机做门禁',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握 rotateTo() 控制舵机的方法',
    '掌握 getIRKey() 获取遥控按键',
    '理解字符串拼接在密码中的应用',
    '能实现简单的密码验证功能'
  ],
  prerequisites: [
    '理解 if 语句的条件判断',
    '知道什么是字符串'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['rotate', 'digit', 'key', 'turn'],
  medium: ['infrared', 'password', 'result', 'check'],
  hard: ['isdigit', 'getIRKey', 'rotateTo', 'concat']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'rotateTo(180)',
    'rotateTo(90)',
    "key = getIRKey()",
    "'123' + '456'"
  ],
  medium: [
    "if key == '左':\n    rotateTo(180)",
    "if key.isdigit():\n    result = result + key",
    "password = '123'",
    "'abc'.isdigit()"
  ],
  hard: [
    "key = getIRKey()\nif key.isdigit():\n    result = result + key",
    "if key == 'ok':\n    if result == password:\n        rotateTo(180)",
    "result = ''\nresult = result + '1'\nprint(result)",
    "rotateTo(180)\ntime.sleep(5)\nrotateTo(90)"
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