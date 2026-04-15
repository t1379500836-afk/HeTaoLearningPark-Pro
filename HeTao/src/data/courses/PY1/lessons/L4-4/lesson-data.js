/**
 * PY1 课程 L4-4: 智能门和密码锁
 *
 * 核心知识点:
 * 1. rotateTo() - 控制舵机
 * 2. while True + getKey() - 红外遥控
 * 3. 字符串拼接 - 连接字符串
 * 4. isdigit() - 判断是否为数字
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'rotate',
    pronunciation: "[rəʊˈteɪt]",
    partOfSpeech: 'v.',
    meaning: '旋转；转动；循环；轮值',
    level: 'easy',
    example: 'Rotate the motor.',
    exampleTranslation: '转动电机。',
    note: 'rotation 旋转'
  },
  {
    word: 'get',
    pronunciation: '[get]',
    partOfSpeech: 'v.',
    meaning: '获得；得到；到达；成为；变得',
    level: 'easy',
    example: 'Get the key value.',
    exampleTranslation: '获取按键值。',
    note: 'get up 起床'
  },
  {
    word: 'key',
    pronunciation: '[kiː]',
    partOfSpeech: 'n./adj.',
    meaning: '钥匙；关键；答案；键；主要的；关键的',
    level: 'easy',
    example: 'Press the key.',
    exampleTranslation: '按按键。',
    note: 'keyboard 键盘'
  },
  {
    word: 'result',
    pronunciation: "[rɪˈzʌlt]",
    partOfSpeech: 'n.',
    meaning: '结果；成果；成绩',
    level: 'medium',
    example: 'Check the result.',
    exampleTranslation: '检查结果。',
    note: 'as a result 结果'
  },
  // 拓展单词
  {
    word: 'password',
    pronunciation: "['pɑːswɜːd]",
    partOfSpeech: 'n.',
    meaning: '密码；口令',
    level: 'hard',
    example: 'Enter your password.',
    exampleTranslation: '输入你的密码。',
    note: 'pass word 通过的文字'
  },
  {
    word: 'remote',
    pronunciation: "[rɪ'məʊt]",
    partOfSpeech: 'adj./n.',
    meaning: '遥远的；遥控的；遥控器',
    level: 'medium',
    example: 'Use the remote control.',
    exampleTranslation: '使用遥控器。',
    note: 'remote control 遥控器'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '旋转控制 - rotateTo()',
    emoji: '🔧',
    gradeLevel: '1-2',
    summary: '控制舵机旋转到指定角度',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个智能门，门上装了一个可以旋转的舵机！你告诉它转到90度，它就转到90度，就像机械手一样！rotateTo()就是控制旋转的命令！',
      concept: 'rotateTo()是一个控制舵机（servo motor）旋转的函数。括号中填写角度（0-180度），舵机就会转到指定位置。这常用于控制门锁、机械臂、指针等。',
      syntax: 'rotateTo(角度)  # 角度范围0-180度',
      example: {
        title: '控制舵机旋转',
        code: 'rotateTo(0)    # 转到0度\nrotateTo(90)   # 转到90度\nrotateTo(180)  # 转到180度',
        output: '（舵机依次转到0度、90度、180度位置）',
        explanation: 'rotateTo(0)转到初始位置，rotateTo(90)转到中间，rotateTo(180)转到最大角度。'
      },
      practice: [
        {
          question: 'rotateTo()括号里填什么？',
          answer: '角度（0-180之间的数字）'
        },
        {
          question: 'rotateTo(90)会让舵机转到什么位置？',
          answer: '转到90度，也就是中间位置'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '旋转进阶！你可以让舵机慢慢转到目标位置，或者在特定角度做一些动作！比如智能门锁：转到0度开锁，转到90度上锁！',
      concept: 'rotateTo()可以配合时间延迟实现平滑转动，也可以根据条件转到不同角度。常见应用：①门锁控制（0度开锁，90度上锁）②指针仪表（显示数值）③云台控制（摄像头转动）④机械臂（抓取动作）。',
      syntax: '# 平滑转动\nrotateTo(0)\nsleep(1)\nrotateTo(90)\n\n# 条件控制\nif 门锁状态 == "开":\n    rotateTo(0)\nelse:\n    rotateTo(90)',
      example: {
        title: '智能门锁',
        code: 'while True:\n    if 检测到人脸:\n        print("开锁!")\n        rotateTo(0)  # 开锁位置\n        sleep(3)\n        rotateTo(90) # 上锁位置',
        output: '（检测到人脸时）\n开锁!\n（舵机转到0度开锁，3秒后转到90度上锁）',
        explanation: '检测到人脸时，舵机转到0度（开锁），等待3秒后转到90度（上锁）。'
      },
      practice: [
        {
          question: '如何让舵机平滑转动？',
          answer: '用sleep()函数在每次rotateTo()之间添加延迟'
        },
        {
          question: 'rotateTo(0)和rotateTo(180)分别是什么位置？',
          answer: '0度是最小位置，180度是最大位置'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '旋转大师模式！你可以用多个舵机制作机械臂、机器人、云台系统...通过精确控制每个舵机的角度，实现复杂的机械运动！',
      concept: '舵机的本质是位置控制系统，内部有反馈回路确保到达指定角度。高级应用：①多舵机协调（机械臂多关节）②速度控制（分步转动）③角度映射（数值转角度）④路径规划（经过一系列中间点）。',
      syntax: '# 速度控制\ncurrent = 0\ntarget = 180\nstep = 5\nwhile current < target:\n    current += step\n    rotateTo(current)\n    sleep(0.1)\n\n# 角度映射\nangle = map(数值, 最小值, 最大值, 0, 180)\nrotateTo(angle)\n\n# 多舵机\nrotateTo(0, channel=1)  # 舵机1\nrotateTo(90, channel=2) # 舵机2',
      example: {
        title: '平滑门锁',
        code: '# 平滑开锁：从90度慢慢转到0度\nfor angle in range(90, -1, -5):\n    rotateTo(angle)\n    sleep(0.05)\n\nsleep(3)  # 等待3秒\n\n# 平滑上锁：从0度慢慢转到90度\nfor angle in range(0, 91, 5):\n    rotateTo(angle)\n    sleep(0.05)',
        output: '（舵机从90度慢慢转到0度开锁，然后从0度慢慢转到90度上锁）',
        explanation: '用for循环分步转动，每次转5度，配合sleep实现平滑效果。range(90, -1, -5)从90递减到0。'
      },
      practice: [
        {
          question: 'range(90, -1, -5)生成什么序列？',
          answer: '从90到0，每次减5：90, 85, 80, ..., 0'
        },
        {
          question: '如何实现多个舵机协调？',
          answer: '用channel参数指定不同的舵机，如rotateTo(angle, channel=1)'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '遥控接收 - while True + getKey()',
    emoji: '🎮',
    gradeLevel: '1-2',
    summary: '使用红外遥控器控制程序',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个电视遥控器！按不同的按钮，电视会做不同的事。while True + getKey()就像这样：程序一直等待你按遥控器，按了就响应！',
      concept: 'while True创建无限循环，持续检测遥控器。getKey()函数获取当前按下的按键。当按键时，程序可以执行对应的操作。',
      syntax: 'while True:\n    key = getKey()\n    if key == "某个按钮":\n        执行操作',
      example: {
        title: '遥控器控制',
        code: 'while True:\n    key = getKey()\n    if key == "up":\n        print("向上!")\n    elif key == "down":\n        print("向下!")',
        output: '（按up键时）\n向上!\n（按down键时）\n向下!',
        explanation: '程序持续等待按键，按up打印"向上!"，按down打印"向下!"。'
      },
      practice: [
        {
          question: 'getKey()返回什么？',
          answer: '当前按下的按键名称'
        },
        {
          question: '为什么要用while True？',
          answer: '因为需要持续检测按键，无限循环'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '遥控进阶！你可以用一个遥控器控制多个功能：上下左右移动、开关设备、调整参数...就像玩游戏一样！',
      concept: '红外遥控是常见的控制方式。while True持续监听，getKey()获取按键，if-elif判断不同按键执行不同功能。这是事件驱动编程的基础。',
      syntax: '# 多功能遥控\nwhile True:\n    key = getKey()\n    if key == "up":\n        前进()\n    elif key == "down":\n        后退()\n    elif key == "left":\n        左转()\n    elif key == "right":\n        右转()\n    elif key == "ok":\n        确认()',
      example: {
        title: '遥控小车',
        code: 'while True:\n    key = getKey()\n    \n    if key == "up":\n        print("前进")\n        rotateTo(180)\n    elif key == "down":\n        print("后退")\n        rotateTo(0)\n    elif key == "stop":\n        print("停止")\n        break',
        output: '（按up键）\n前进\n（舵机转到180度）\n（按stop键）\n停止\n（退出循环）',
        explanation: 'up键前进（舵机转到180度），down键后退（舵机转到0度），stop键停止并退出。'
      },
      practice: [
        {
          question: '如何实现多个按键控制？',
          answer: '用if-elif-else结构判断不同按键'
        },
        {
          question: '按键"ok"怎么判断？',
          answer: 'if key == "ok":'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '遥控大师模式！你可以实现长按检测、组合按键、多键并发等高级功能！甚至可以用遥控器玩你制作的游戏！',
      concept: '高级遥控技术：①长按检测（记录按键时间）②组合按键（同时按多个键）③按键去抖（防止重复触发）④状态机（根据按键序列转换状态）。这是游戏开发和嵌入式系统的核心技能。',
      syntax: '# 长按检测\npress_time = 0\nwhile key == "up":\n    press_time += 1\n    if press_time > 长按阈值:\n        长按触发()\n\n# 组合按键\nif key == "A" and last_key == "B":\n    组合触发()\n\n# 按键状态机\ncurrent_state = "待机"\nif current_state == "待机" and key == "start":\n    current_state = "运行"',
      example: {
        title: '长按加速',
        code: 'speed = 1\npress_count = 0\nlast_key = ""\n\nwhile True:\n    key = getKey()\n    \n    if key == last_key:\n        press_count += 1\n    else:\n        press_count = 0\n    \n    if press_count > 10:\n        speed = 3  # 长按加速\n    elif press_count > 5:\n        speed = 2  # 中按中速\n    else:\n        speed = 1  # 短按常速\n    \n    print("速度: " + str(speed))\n    last_key = key',
        output: '（短按）\n速度: 1\n（中按）\n速度: 2\n（长按）\n速度: 3',
        explanation: '统计同一按键连续按下的次数，超过5次中速，超过10次加速。用字符串拼接显示速度。'
      },
      practice: [
        {
          question: '如何检测长按？',
          answer: '记录同一按键连续按下的次数或时间'
        },
        {
          question: '如何实现组合按键？',
          answer: '记录上一个按键，判断当前按键和上一个按键的组合'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '文字连接 - 字符串拼接',
    emoji: '🔗',
    gradeLevel: '1-2',
    summary: '使用+号连接两个字符串',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有两块拼图，想拼在一起！字符串拼接就像拼图，用+号可以把两个文字连成一个新的文字！',
      concept: '使用+号可以连接两个字符串，形成一个新的字符串。比如"hello" + "world"会变成"helloworld"。',
      syntax: '字符串1 + 字符串2',
      example: {
        title: '字符串拼接',
        code: 'part1 = "12"\npart2 = "ab"\nresult = part1 + part2\nprint(result)',
        output: '12ab',
        explanation: '"12" + "ab" = "12ab"，两个字符串首尾相连。'
      },
      practice: [
        {
          question: '用什么符号连接字符串？',
          answer: '用+号'
        },
        {
          question: '"hello" + "world"等于什么？',
          answer: '"helloworld"'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '拼接进阶！你可以拼接很多个字符串，也可以拼接字符串和数字（需要先转成字符串）！比如拼接密码、拼接文件路径、拼接消息等等！',
      concept: '字符串拼接可以连续使用多个+号。拼接数字时需要用str()函数把数字转成字符串。拼接是构建复杂字符串的基础。',
      syntax: '# 多个拼接\nresult = s1 + s2 + s3\n\n# 拼接数字\nage = 10\nmessage = "我" + str(age) + "岁"\n\n# 拼接密码\npassword = part1 + part2 + part3',
      example: {
        title: '拼接密码',
        code: '# 输入密码的各个部分\npart1 = "12"\npart2 = "34"\npart3 = "56"\n\n# 拼接成完整密码\npassword = part1 + part2 + part3\nprint("密码:", password)',
        output: '密码: 123456',
        explanation: '"12" + "34" + "56" = "123456"，三部分拼接成完整密码。'
      },
      practice: [
        {
          question: '如何拼接数字和字符串？',
          answer: '用str()把数字转成字符串："数字是" + str(10)'
        },
        {
          question: '"a" + "b" + "c"等于什么？',
          answer: '"abc"'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '拼接大师模式！你可以用循环拼接大量字符串、用格式化字符串(f-string)更优雅地拼接、或者用join()方法高效拼接列表中的所有字符串！',
      concept: '高级拼接技巧：①f-string格式化（最推荐）②join()方法（高效）③循环拼接（灵活）④模板字符串（复用）。f-string是Python 3.6+的特性，最简洁易读。',
      syntax: '# 字符串拼接\nname = "Tom"\nage = 10\nmessage = "我叫" + name + "，今年" + str(age) + "岁"\n\n# join方法\nresult = "-".join(["a", "b", "c"])  # "a-b-c"\n\n# 循环拼接\nresult = ""\nfor s in list:\n    result += s',
      example: {
        title: '动态密码生成',
        code: 'import random\n\n# 生成6位随机密码\npassword = ""\nfor i in range(6):\n    digit = random.randint(0, 9)\n    password = password + str(digit)\n\nprint("新密码: " + password)\n\n# 生成8位随机密码\npassword2 = ""\nfor i in range(8):\n    digit = random.randint(0, 9)\n    password2 = password2 + str(digit)\n\nprint("新密码: " + password2)',
        output: '新密码: 723849\n新密码: 12345678',
        explanation: '用循环拼接6个或8个随机数字，生成随机密码。每次生成的密码都不同。用字符串拼接显示结果。'
      },
      practice: [
        {
          question: '如何用字符串拼接显示"速度: 3"？',
          answer: 'print("速度: " + str(speed))'
        },
        {
          question: 'join()方法有什么用？',
          answer: '用指定字符连接列表中的所有字符串'
        }
      ]
    }
  },

  {
    id: 'kp-4',
    title: '数字判断 - isdigit()',
    emoji: '🔢',
    gradeLevel: '1-2',
    summary: '判断字符串是否全是数字',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你要检查输入的密码是不是都是数字！isdigit()就像一个检查器，它告诉你"全是数字"（True）或"不全是数字"（False）！',
      concept: 'isdigit()是字符串的方法，用于判断字符串是否全是数字。如果是返回True，否则返回False。常用于验证输入。',
      syntax: '字符串.isdigit()  # 返回True或False',
      example: {
        title: '判断是否为数字',
        code: 'print("123".isdigit())\nprint("abc".isdigit())\nprint("12a".isdigit())',
        output: 'True\nFalse\nFalse',
        explanation: '"123"全是数字→True，"abc"没有数字→False，"12a"包含字母→False。'
      },
      practice: [
        {
          question: '"456".isdigit()返回什么？',
          answer: 'True'
        },
        {
          question: '"hello".isdigit()返回什么？',
          answer: 'False'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '判断进阶！你可以用isdigit()验证密码、验证年龄、验证分数...确保用户输入的是有效的数字！',
      concept: 'isdigit()常用于输入验证：①密码检查（是否全是数字）②年龄验证（输入的是否是数字）③数据清洗（过滤非数字）。配合if语句可以实现友好的错误提示。',
      syntax: '# 验证密码\nif password.isdigit():\n    密码有效\nelse:\n    提示需要全数字\n\n# 验证年龄\nage = input("年龄:")\nif age.isdigit():\n    age = int(age)',
      example: {
        title: '密码验证',
        code: 'while True:\n    password = input("输入4位数字密码:")\n    \n    if len(password) != 4:\n        print("密码必须是4位!")\n    elif not password.isdigit():\n        print("密码必须全是数字!")\n    else:\n        print("密码正确!")\n        break',
        output: '输入4位数字密码:abcd\n密码必须全是数字!\n输入4位数字密码:12ab\n密码必须全是数字!\n输入4位数字密码:1234\n密码正确!',
        explanation: '检查密码长度和是否全是数字，不满足则提示错误并重新输入。'
      },
      practice: [
        {
          question: '"12".isdigit()是True还是False？',
          answer: 'True'
        },
        {
          question: '"12.5".isdigit()是True还是False？',
          answer: 'False（小数点不是数字）'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '判断大师模式！你可以组合多个验证条件、用循环验证每个字符、或者结合正则表达式实现更复杂的验证规则！',
      concept: '高级验证技巧：①多重条件（长度+类型+特殊字符）②逐字检查（循环验证每个字符）③组合方法（isalpha、isalnum、isspace）④正则表达式（最强大但复杂）。',
      syntax: '# 多重条件\nif len(s) >= 6 and s.isdigit():\n    通过验证\n\n# 逐字检查\nall_digits = True\nfor ch in s:\n    if not ch.isdigit():\n        all_digits = False\n        break\n\n# 组合验证\nif s.isalnum():  # 字母或数字\nif s.isalpha():  # 全是字母\nif s.isspace():  # 全是空格',
      example: {
        title: '强密码验证',
        code: '# 检查密码是否包含数字\npassword = "abcd1234"\n\n# 检查长度\nif len(password) < 8:\n    print("密码至少8位!")\nelse:\n    # 检查是否有数字\n    has_digit = False\n    for ch in password:\n        if ch.isdigit():\n            has_digit = True\n            break\n    \n    # 检查是否有字母\n    has_alpha = False\n    for ch in password:\n        if ch.isalpha():\n            has_alpha = True\n            break\n    \n    if has_digit and has_alpha:\n        print("密码强度: 高")\n    else:\n        print("密码需要包含数字和字母!")',
        output: '密码强度: 高',
        explanation: '检查密码长度、是否包含数字、是否包含字母。用循环检查每个字符，同时满足数字和字母才是高强度的。'
      },
      practice: [
        {
          question: '如何检查字符串中是否有数字？',
          answer: '用循环遍历每个字符，用isdigit()判断'
        },
        {
          question: 'isalpha()判断什么？',
          answer: '判断字符是否是字母'
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
    mathConcept: 'rotateTo函数',
    question: 'rotateTo(90)会让舵机转到什么位置？\n\nA. 0度\nB. 90度\nC. 180度\nD. 360度',
    options: [
      'A. 0度',
      'B. 90度',
      'C. 180度',
      'D. 360度'
    ],
    answer: 1,
    explanation: 'rotateTo(90)会让舵机转到90度位置，也就是中间位置。',
    hint: '括号里的数字就是角度'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '字符串拼接',
    question: '"12" + "ab" 等于什么？\n\nA. "12ab"\nB. "ab12"\nC. "14"\nD. 报错',
    options: [
      'A. "12ab"',
      'B. "ab12"',
      'C. "14"',
      'D. 报错'
    ],
    answer: 0,
    explanation: '"12" + "ab" = "12ab"，字符串拼接是首尾相连。',
    hint: '用+号连接两个字符串'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: 'isdigit判断',
    question: '"12a3".isdigit() 的结果是什么？\n\nA. True\nB. False\nC. "12a3"\nD. 报错',
    options: [
      'A. True',
      'B. False',
      'C. "12a3"',
      'D. 报错'
    ],
    answer: 1,
    explanation: 'isdigit()要求字符串全是数字。"12a3"包含字母a，所以返回False。',
    hint: '包含字母就不是全是数字'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '遥控器逻辑',
    question: '执行下面的代码，按down键会怎样？\n\n```python\nwhile True:\n    key = getKey()\n    if key == "up":\n        print("向上")\n    elif key == "down":\n        print("向下")\n    elif key == "stop":\n        break\n```\n\nA. 打印"向上"\nB. 打印"向下"\nC. 退出循环\nD. 什么都不做',
    options: [
      'A. 打印"向上"',
      'B. 打印"向下"',
      'C. 退出循环',
      'D. 什么都不做'
    ],
    answer: 1,
    explanation: '按down键时，key == "down"为True，执行print("向下")。',
    hint: 'elif判断key是否等于"down"'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合逻辑',
    question: '下面哪个密码能通过下面的验证？\n\n```python\nif len(password) == 4 and password.isdigit():\n    print("正确!")\n```\n\nA. "123"\nB. "1234"\nC. "abcd"\nD. "12ab"',
    options: [
      'A. "123"',
      'B. "1234"',
      'C. "abcd"',
      'D. "12ab"'
    ],
    answer: 1,
    explanation: '需要同时满足：长度是4且全是数字。"1234"长度4且全是数字，符合条件。\n\n数学知识：逻辑与运算A∧B，两个条件都满足才为真。',
    hint: '需要长度4且全是数字'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '循环计数',
    question: '执行下面的代码，result的值是什么？\n\n```python\nresult = ""\nfor i in range(3):\n    result = result + str(i)\n```\n\nA. "012"\nB. "0123"\nC. "3"\nD. ""',
    options: [
      'A. "012"',
      'B. "0123"',
      'C. "3"',
      'D. 空字符串""'
    ],
    answer: 0,
    explanation: 'range(3)生成0、1、2。str(0)="0", str(1)="1", str(2)="2"。拼接结果是"012"。',
    hint: 'range(3)生成0、1、2'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L4-4',
  title: '智能门和密码锁',
  subtitle: '学会舵机控制、红外遥控和密码验证',
  difficulty: '入门',
  estimatedTime: '30-40分钟',
  learningGoals: [
    '掌握rotateTo()控制舵机旋转',
    '学会while True + getKey()实现红外遥控',
    '掌握字符串拼接和isdigit()验证',
    '能实现密码锁和遥控控制'
  ],
  prerequisites: [
    'Python 基础语法',
    'while循环基础',
    'if条件判断',
    '字符串基础'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['rotate', 'motor', 'key', 'get'],
  medium: ['remote', 'result', 'combine', 'string'],
  hard: ['password', 'servo', 'control', 'validate']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'rotateTo(90)',
    'key = getKey()',
    'while True:',
    'if key == "up":',
    'password.isdigit()',
    'result = "12" + "ab"'
  ],
  medium: [
    'while True:\n    key = getKey()\n    if key == "up":\n        print("向上!")',
    'rotateTo(0)\nsleep(1)\nrotateTo(90)',
    'if password.isdigit():\n    print("有效!")',
    'part1 = "12"\npart2 = "34"\nresult = part1 + part2',
    'if key == "stop":\n    break',
    'print("密码: " + password)'
  ],
  hard: [
    'while True:\n    if 检测到人脸:\n        rotateTo(0)\n        sleep(3)\n        rotateTo(90)',
    'while True:\n    key = getKey()\n    if key == "up":\n        前进()\n    elif key == "down":\n        后退()\n    elif key == "stop":\n        break',
    'if len(password) == 4 and password.isdigit():\n    print("密码正确!")',
    'for i in range(10):\n    key = getKey()\n    if key == last_key:\n        count += 1\n    else:\n        count = 0',
    'password = ""\nfor i in range(6):\n    digit = random.randint(0, 9)\n    password += str(digit)',
    'has_digit = False\nfor ch in password:\n    if ch.isdigit():\n        has_digit = True\n        break\nif has_digit:\n    print("包含数字!")'
  ]
}

// 导出所有数据
export const L4_4_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L4_4_data
