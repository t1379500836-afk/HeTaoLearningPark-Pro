/**
 * PY2 课程 L8-3: 奇怪的面试者
 *
 * 核心知识点:
 * 1. getLineSensor() 获取循线传感器数据
 * 2. setPower() 控制智能车速度
 * 3. waitButton() 等待按钮按下
 * 4. isAllBlack() 检查是否全部检测到黑线
 * 5. 循线控制原理
 *
 * ⚠️ 硬件专项：本课内容需要核桃编程智能车硬件才能运行
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'line',
    pronunciation: '[lain]',
    partOfSpeech: 'n./v.',
    meaning: '线；分界线；路线；排队',
    level: 'easy',
    example: 'Follow the white line.',
    exampleTranslation: '沿着白线走。',
    source: 'ocr'
  },
  {
    word: 'sensor',
    pronunciation: "['sensə(r)]",
    partOfSpeech: 'n.',
    meaning: '传感器；探测设备',
    level: 'medium',
    example: 'The sensor detects light.',
    exampleTranslation: '传感器检测光线。',
    source: 'ocr'
  },
  {
    word: 'wait',
    pronunciation: '[weit]',
    partOfSpeech: 'n./v.',
    meaning: '等待；等候；盼望',
    level: 'easy',
    example: 'Please wait a moment.',
    exampleTranslation: '请稍等一下。',
    source: 'ocr'
  },
  {
    word: 'time',
    pronunciation: '[taim]',
    partOfSpeech: 'n./v.',
    meaning: '时间；时刻；次；计时',
    level: 'medium',
    example: 'What time is it now?',
    exampleTranslation: '现在几点了？',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'power',
    pronunciation: "['pauə(r)]",
    partOfSpeech: 'n.',
    meaning: '功率；动力；能量',
    level: 'easy',
    example: 'Set the power to 80.',
    exampleTranslation: '把功率设为80。',
    source: 'extended'
  },
  {
    word: 'infrared',
    pronunciation: "['infrə'red]",
    partOfSpeech: 'n.',
    meaning: '红外线；红外线的',
    level: 'hard',
    example: 'The sensor uses infrared light.',
    exampleTranslation: '传感器使用红外线。',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '火眼金睛 - 循线传感器',
    emoji: '👁️',
    gradeLevel: '1-2',
    summary: '智能车的"眼睛"，能看到黑线',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象智能车有一双特别的"眼睛"，叫做循线传感器。这双眼睛能发射看不见的红外线，当遇到白色地面时会被反射回来，遇到黑线时会被吸收。这样智能车就能"看见"黑线了！',
      concept: '循线传感器通过发射和接收红外线来识别黑线。检测到黑线时返回1，没检测到时返回0。',
      syntax: 'n = getLineSensor()  # 获取传感器数据',
      example: {
        title: '查看传感器数据',
        code: '# 获取循线传感器数据\nn = getLineSensor()\nprint(n)',
        output: '[0, 0, 1, 0, 0]',
        explanation: 'getLineSensor() 返回一个列表，有5个元素（对应5个传感器）。1表示检测到黑线，0表示没检测到。这个例子中中间传感器（索引2）检测到了黑线。'
      },
      practice: [
        {
          question: '传感器检测到黑线时返回几？',
          answer: '返回 1'
        },
        {
          question: '传感器没检测到黑线时返回几？',
          answer: '返回 0'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的智能车有5个传感器，排成一排。当黑线在不同位置时，不同的传感器会检测到它。通过分析哪个传感器是1，我们就能知道黑线在哪里，从而调整智能车的方向！',
      concept: '5个传感器从左到右索引是0到4。根据返回的列表中哪些位置是1，可以判断黑线的位置和智能车应该怎么调整方向。',
      syntax: '# 传感器索引：0 1 2 3 4\nn = getLineSensor()\n\n# n[0]=1 表示最左边检测到黑线\n# n[2]=1 表示中间检测到黑线\n# n[4]=1 表示最右边检测到黑线',
      example: {
        title: '判断黑线位置',
        code: '# 获取传感器数据\nn = getLineSensor()\n\nif n[0] == 1:\n    print("黑线在最左边")\nelif n[2] == 1:\n    print("黑线在中间")\nelif n[4] == 1:\n    print("黑线在最右边")',
        output: '黑线在中间',
        explanation: '通过判断列表中哪个位置是1，就知道黑线在哪里，从而控制智能车左转、直行或右转。'
      },
      practice: [
        {
          question: '5个传感器的索引范围是？',
          answer: '0 到 4'
        },
        {
          question: 'n[2] 是哪个传感器？',
          answer: '中间的传感器'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '红外线大师！你知道为什么传感器能区分黑白吗？因为黑色吸光，白色反光。传感器发射红外线，白色反射回来能接收到，黑色被吸收接收不到，这样就能区分了！',
      concept: '循线传感器利用红外线的反射特性工作：白色表面反射红外线，黑色表面吸收红外线。这是光电检测的基本原理。',
      syntax: '# 红外线反射原理\n# 白色：反射 → 接收到 → 返回0\n# 黑色：吸收 → 接收不到 → 返回1',
      example: {
        title: '完整的循线检测',
        code: '# 完整的循线检测逻辑\nwhile True:\n    n = getLineSensor()\n    \n    if n[2] == 1:  # 中间检测到\n        setPower(80, 80)  # 直行\n    elif n[0] == 1:  # 最左边检测到\n        setPower(0, 80)   # 大幅左转\n    elif n[4] == 1:  # 最右边检测到\n        setPower(80, 0)   # 大幅右转',
        output: '智能车沿着黑线行驶',
        explanation: '这是完整的循线控制逻辑：中间检测到就直行，左边检测到就左转，右边检测到就右转。'
      },
      practice: [
        {
          question: '为什么白色返回0，黑色返回1？',
          answer: '白色反射红外线，黑色吸收红外线'
        },
        {
          question: '如果所有传感器都是1说明什么？',
          answer: '智能车到达了十字交叉线'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '速度控制器 - setPower()',
    emoji: '🎮',
    gradeLevel: '1-2',
    summary: '控制智能车两个轮子的速度',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '智能车有两个轮子，左边一个右边一个。setPower() 可以控制每个轮子的转得有多快。两个轮子速度一样就直走，不一样就会转弯！',
      concept: 'setPower(左轮速度, 右轮速度) 可以控制两个轮子的速度。速度范围是0-100，0表示停止，100表示最快。',
      syntax: 'setPower(左轮速度, 右轮速度)',
      example: {
        title: '控制智能车运动',
        code: '# 两个轮子速度相同，直行\nsetPower(80, 80)\n\n# 左轮快右轮慢，左转\nsetPower(80, 40)',
        output: '智能车按照设定的速度运动',
        explanation: 'setPower(80, 80) 让两个轮子速度相同，智能车直行。setPower(80, 40) 让左轮比右轮快，智能车向左转。'
      },
      practice: [
        {
          question: 'setPower(0, 0) 会让车怎样？',
          answer: '停止'
        },
        {
          question: 'setPower(80, 80) 会让车怎样？',
          answer: '直行'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '速度控制大师！通过调整两个轮子的速度差，你可以控制转弯的角度：速度差越大，转弯越急。小幅转弯用小速度差，大幅转弯用大速度差。',
      concept: '转向通过左右轮速度差实现：差值越大转弯角度越大。左轮快是左转，右轮快是右转。',
      syntax: '# 大幅左转（左边速度高）\nsetPower(80, 0)\n\n# 小幅左转\nsetPower(80, 40)\n\n# 小幅右转\nsetPower(40, 80)\n\n# 大幅右转\nsetPower(0, 80)',
      example: {
        title: '精确控制转向',
        code: 'n = getLineSensor()\n\nif n[0] == 1:  # 最左边，大幅左转\n    setPower(0, 80)\nelif n[1] == 1:  # 左边一点，小幅左转\n    setPower(40, 80)\nelif n[2] == 1:  # 中间，直行\n    setPower(80, 80)',
        output: '根据黑线位置精确转向',
        explanation: '根据传感器检测到的黑线位置，用不同的速度差来控制转向角度，实现精确的循线。'
      },
      practice: [
        {
          question: 'setPower(80, 40) 是往哪转？',
          answer: '小幅左转（左轮比右轮快）'
        },
        {
          question: '速度差越大转弯越？',
          answer: '越急（角度越大）'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '速度控制专家！你可以用负值让轮子反转，实现原地旋转。你还可以用变量动态调整速度，实现平滑的加减速和转向。',
      concept: 'setPower() 可以接受负值，让轮子反向旋转。通过精确的速度控制可以实现各种复杂的运动模式。',
      syntax: '# 原地右旋（左轮正转，右轮反转）\nsetPower(50, -50)\n\n# 原地左旋\nsetPower(-50, 50)\n\n# 动态调整速度\nspeed = 80 * n[2]  # 根据传感器调整',
      example: {
        title: '高级运动控制',
        code: '# 根据传感器位置动态调整速度\nn = getLineSensor()\n\n# 计算转向强度（-2到2）\nstrength = (n[4] + n[3] * 0.5) - (n[0] + n[1] * 0.5)\n\n# 根据强度调整速度\nleft_speed = 80 - strength * 40\nright_speed = 80 + strength * 40\n\nsetPower(left_speed, right_speed)',
        output: '平滑的循线控制',
        explanation: '这是一种更智能的控制方法，根据传感器的加权计算来平滑地调整速度，避免急转。'
      },
      practice: [
        {
          question: 'setPower(50, -50) 会怎样？',
          answer: '原地右旋（左轮正转右轮反转）'
        },
        {
          question: '如何实现平滑转向？',
          answer: '根据传感器位置动态调整速度差'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '安全启动 - waitButton()',
    emoji: '🔴',
    gradeLevel: '1-2',
    summary: '等待按钮按下后再启动程序',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象智能车像赛车一样，需要等待发令信号才能启动。waitButton() 就是等待你按下智慧核心上的按钮，按下后程序才会继续运行，这样更安全！',
      concept: 'waitButton() 会暂停程序，直到任意按钮被按下。这可以防止智能车一启动就乱跑，给你准备时间。',
      syntax: 'waitButton()',
      example: {
        title: '安全启动',
        code: '# 等待按钮按下\nwaitButton()\n\n# 按下后才开始运动\nsetPower(80, 80)',
        output: '按下按钮后智能车开始运动',
        explanation: '程序运行到 waitButton() 会暂停，等你按下按钮后才继续执行后面的代码。'
      },
      practice: [
        {
          question: 'waitButton() 的作用是什么？',
          answer: '等待按钮按下后继续运行程序'
        },
        {
          question: '为什么要用 waitButton()？',
          answer: '防止智能车一启动就乱跑，更安全'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'waitButton() 是编程中的"阻塞"函数，意思是程序会停在这里不动，直到条件满足（按钮被按下）才继续。这是一种事件触发机制。',
      concept: 'waitButton() 实现了人机交互的基本模式：等待用户操作 → 响应操作。这是很多程序的基础。',
      syntax: 'print("准备就绪")\nwaitButton()  # 等待用户按下按钮\nprint("开始运行！")',
      example: {
        title: '完整的启动流程',
        code: '# 智能循线车启动流程\nprint("智能车准备就绪！")\nprint("请放置智能车，然后按下按钮启动")\n\nwaitButton()  # 等待启动\n\nprint("开始循线！")\nwhile True:\n    n = getLineSensor()\n    # 循线控制逻辑...',
        output: '智能车准备就绪！\n请放置智能车，然后按下按钮启动\n[按下按钮]\n开始循线！',
        explanation: 'waitButton() 给用户时间准备（比如把智能车放在起点），准备好后再按下按钮启动，非常实用。'
      },
      practice: [
        {
          question: 'waitButton() 会一直等待吗？',
          answer: '是的，直到按钮被按下'
        },
        {
          question: '可以按任意按钮吗？',
          answer: '是的，智慧核心上的任意按钮都可以'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '阻塞与事件！waitButton() 是一种"阻塞式"等待，程序完全停在这里。还有一种"非阻塞式"检测，用 isButtonPressed() 可以在循环中检测按钮状态。',
      concept: '理解阻塞与非阻塞的区别。阻塞式等待（waitButton）暂停程序，非阻塞检测（isButtonPressed）可以边检测边做其他事。',
      syntax: '# 阻塞式等待\nwaitButton()\n\n# 非阻塞检测\nwhile True:\n    if isButtonPressed():\n        # 处理按钮事件\n    # 继续做其他事',
      example: {
        title: '非阻塞按钮检测',
        code: '# 非阻塞式的按钮检测\nimport time\n\npressed = False\nstart_time = time.time()\n\nwhile not pressed:\n    # 边等待边显示时间\n    elapsed = time.time() - start_time\n    print(f"等待中... {elapsed:.1f}秒")\n    \n    # 检测按钮\n    if isButtonPressed():\n        pressed = True\n    \n    time.sleep(0.1)\n\nprint("按钮被按下！")',
        output: '等待中... 0.1秒\n等待中... 0.2秒\n...\n按钮被按下！',
        explanation: '这种非阻塞方式可以在等待的同时做其他事情（比如显示时间），比 waitButton() 更灵活。'
      },
      practice: [
        {
          question: 'waitButton() 是阻塞还是非阻塞？',
          answer: '阻塞式（程序暂停）'
        },
        {
          question: '非阻塞检测用什么函数？',
          answer: 'isButtonPressed()'
        }
      ]
    }
  },

  {
    id: 'kp-4',
    title: '十字路口检测 - isAllBlack()',
    emoji: '⚫',
    gradeLevel: '3-4',
    summary: '检测所有传感器是否都检测到黑线',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '当智能车来到十字路口或终点时，所有5个传感器都会检测到黑线！isAllBlack() 就是用来检查这种情况的，返回 True 或 False。',
      concept: 'isAllBlack() 检查是否所有传感器都检测到黑线（十字路口、终点等特殊位置）。',
      syntax: 'isAllBlack()',
      example: {
        title: '检查十字路口',
        code: '# 检查是否所有传感器都检测到黑线\nif isAllBlack():\n    print("到达十字路口或终点！")\nelse:\n    print("正常循线中...")',
        output: '正常循线中...',
        explanation: 'isAllBlack() 返回 True 表示所有传感器都检测到黑线（十字路口），返回 False 表示正常循线。'
      },
      practice: [
        {
          question: 'isAllBlack() 什么情况返回 True？',
          answer: '所有传感器都检测到黑线时'
        },
        {
          question: '十字路口时传感器会怎样？',
          answer: '全部检测到黑线'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '智能循线车需要识别特殊位置。当所有传感器都是1时，说明智能车到达了十字路口、T字路口或终点。isAllBlack() 可以快速检测这种情况。',
      concept: 'isAllBlack() 是 getLineSensor() 返回 [1, 1, 1, 1, 1] 的快捷检测方法，用于判断特殊路径位置。',
      syntax: '# 方法1：用 isAllBlack()\nif isAllBlack():\n    # 处理十字路口\n\n# 方法2：手动判断\nn = getLineSensor()\nif sum(n) == 5:  # 所有都是1\n    # 处理十字路口',
      example: {
        title: '十字路口处理',
        code: '# 循线时处理十字路口\nwhile True:\n    # 检查十字路口\n    if isAllBlack():\n        print("到达十字路口！")\n        setPower(0, 0)  # 停止\n        break\n    \n    # 正常循线\n    n = getLineSensor()\n    if n[2] == 1:\n        setPower(80, 80)',
        output: '智能车在十字路口停止',
        explanation: '用 isAllBlack() 检测十字路口，到达后停止程序。'
      },
      practice: [
        {
          question: 'isAllBlack() 相当于检查什么？',
          answer: '检查 getLineSensor() 是否全是 1'
        },
        {
          question: '为什么需要检测十字路口？',
          answer: '十字路口需要特殊处理（停止、转弯等）'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '高级循线算法！你可以用计数器记录经过的十字路口数量，实现分段任务：第一个十字路口左转，第二个直行，第三个停止等等。',
      concept: '结合计数器和 isAllBlack()，可以实现复杂的多段路径控制，完成复杂的循线任务。',
      syntax: 'crossings = 0\n\nif isAllBlack():\n    crossings += 1\n    if crossings == 1:\n        # 第一个十字路口\n    elif crossings == 2:\n        # 第二个十字路口',
      example: {
        title: '多段路径控制',
        code: '# 经过3个十字路口后停止\ncrossings = 0\n\nwhile True:\n    if isAllBlack():\n        crossings += 1\n        print(f"第{crossings}个十字路口")\n        \n        if crossings >= 3:\n            print("到达终点！")\n            setPower(0, 0)\n            break\n    \n    # 正常循线...\n    n = getLineSensor()',
        output: '第1个十字路口\n第2个十字路口\n第3个十字路口\n到达终点！',
        explanation: '用计数器记录经过的十字路口，到达指定数量后停止，实现多段路径控制。'
      },
      practice: [
        {
          question: '如何记录经过的十字路口数量？',
          answer: '用计数器变量，每次 isAllBlack() 为 True 时加1'
        },
        {
          question: '如何实现分段任务？',
          answer: '根据计数器的值执行不同的操作'
        }
      ]
    }
  },

  {
    id: 'kp-5',
    title: '完整循线 - 综合应用',
    emoji: '🚗',
    gradeLevel: '3-4',
    summary: '综合运用所有知识实现完整循线',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '让我们把学到的知识组合起来！用 waitButton() 安全启动，用 getLineSensor() 读取传感器，用 setPower() 控制运动，就能让智能车沿着黑线跑了！',
      concept: '综合应用：等待启动 → 循环读取传感器 → 根据传感器控制方向 → 循线行驶。',
      syntax: 'waitButton()\nwhile True:\n    n = getLineSensor()\n    if n[位置] == 1:\n        setPower(左, 右)',
      example: {
        title: '基础循线',
        code: '# 完整的循线程序\nwaitButton()  # 等待启动\n\nwhile True:\n    n = getLineSensor()\n    \n    if n[2] == 1:  # 中间，直行\n        setPower(80, 80)',
        output: '智能车沿着黑线行驶',
        explanation: '这是最基本的循线程序：等待按钮，然后循环检测中间传感器，检测到就直行。'
      },
      practice: [
        {
          question: '循线需要哪三个步骤？',
          answer: '读取传感器、判断位置、控制运动'
        },
        {
          question: '为什么要用 while True？',
          answer: '持续检测传感器，实现连续循线'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '进阶循线！根据不同传感器检测到黑线，控制智能车做不同转向：左边检测到就左转，右边检测到就右转，中间检测到就直行。',
      concept: '完整的循线算法：根据5个传感器的状态，智能调整左右轮速度，实现精确的路径跟踪。',
      syntax: 'while True:\n    n = getLineSensor()\n    \n    if n[2] == 1:  # 中间\n        setPower(80, 80)  # 直行\n    elif n[0] == 1:  # 最左\n        setPower(0, 80)   # 大幅左转\n    elif n[4] == 1:  # 最右\n        setPower(80, 0)   # 大幅右转',
      example: {
        title: '完整循线程序',
        code: '# 完整的智能循线程序\nwaitButton()\n\nwhile True:\n    n = getLineSensor()\n    \n    if n[2] == 1:  # 中间\n        setPower(80, 80)\n    elif n[0] == 1:  # 最左\n        setPower(0, 80)\n    elif n[4] == 1:  # 最右\n        setPower(80, 0)\n    elif n[1] == 1:  # 偏左\n        setPower(40, 80)\n    elif n[3] == 1:  # 偏右\n        setPower(80, 40)',
        output: '智能车精确地沿着黑线行驶',
        explanation: '这是完整的循线算法，根据黑线在传感器的不同位置，用不同的转向策略，实现精确的路径跟踪。'
      },
      practice: [
        {
          question: 'n[0]==1 是什么情况？',
          answer: '黑线在最左边，需要大幅左转'
        },
        {
          question: '为什么最外边的传感器用 0 和 80？',
          answer: '大幅转向，速度差最大'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '循线大师！你可以加入十字路口检测、计数器、任务分段等高级功能，完成复杂的循线任务，比如送货、巡逻、竞速等。',
      concept: '高级循线算法包含：传感器平滑处理、速度动态调整、特殊位置检测、任务状态管理等。',
      syntax: '# 高级循线框架\nstate = "循线"\ncounter = 0\n\nwhile True:\n    n = getLineSensor()\n    \n    if isAllBlack():\n        # 处理十字路口\n    else:\n        # 正常循线逻辑\n        if n[2] == 1:\n            setPower(80, 80)',
      example: {
        title: '高级循线系统',
        code: '# 带十字路口处理的循线系统\ncrossings = 0\n\nwaitButton()\n\nwhile crossings < 3:\n    # 检查十字路口\n    if isAllBlack():\n        crossings += 1\n        print(f"第{crossings}个路口")\n        # 通过路口\n        setPower(50, 50)\n    else:\n        # 正常循线\n        n = getLineSensor()\n        if n[2] == 1:\n            setPower(80, 80)\n        elif n[0] == 1:\n            setPower(0, 80)\n        elif n[4] == 1:\n            setPower(80, 0)\n\nsetPower(0, 0)  # 停止\nprint("任务完成！")',
        output: '第1个路口\n第2个路口\n第3个路口\n任务完成！',
        explanation: '这是完整的循线系统，包含安全启动、路径跟踪、路口检测、计数控制、任务完成停止等全套功能。'
      },
      practice: [
        {
          question: '如何通过十字路口？',
          answer: '检测到后低速直行，直到传感器恢复正常'
        },
        {
          question: '如何实现多任务循线？',
          answer: '用状态变量记录当前任务，根据路口数量切换任务'
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
    mathConcept: '位置与索引',
    question: '智能车的5个传感器，从左到右的索引是什么？',
    options: [
      '1, 2, 3, 4, 5',
      '0, 1, 2, 3, 4',
      '2, 1, 0, 1, 2',
      'a, b, c, d, e'
    ],
    answer: 1, // B
    explanation: '在 Python 中，索引从 0 开始数。\n\n5个传感器的索引是：0, 1, 2, 3, 4\n\n- 0 是最左边\n- 2 是中间\n- 4 是最右边\n\n数学知识：这是"从0开始计数"的编程规则。',
    hint: 'Python 的索引从几开始？'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '速度与方向',
    question: '想让智能车小幅右转，应该用哪个代码？\n\n```python\nA. setPower(80, 0)\nB. setPower(0, 80)\nC. setPower(80, 40)\nD. setPower(40, 80)\n```',
    options: [
      'A',
      'B',
      'C',
      'D'
    ],
    answer: 2, // C
    explanation: 'setPower(左轮速度, 右轮速度)\n\n小幅右转需要：左轮快，右轮慢\n\n正确答案：C. setPower(80, 40)\n\n- A. (80, 0) 大幅右转\n- B. (0, 80) 大幅左转\n- C. (80, 40) 小幅右转 ✓\n- D. (40, 80) 小幅左转',
    hint: '右转需要左边快还是右边快？'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '索引与编号',
    question: '智能车的4号传感器检测到黑线，应该用什么判断？\n\n```python\nA. if n[3] == 0:\nB. if n[3] == 1:\nC. if n[4] == 0:\nD. if n[4] == 1:\n```',
    options: [
      'A',
      'B',
      'C',
      'D'
    ],
    answer: 1, // B
    explanation: '传感器编号从1开始，但索引从0开始：\n\n- 1号传感器 → 索引0\n- 2号传感器 → 索引1\n- 3号传感器 → 索引2\n- 4号传感器 → 索引3\n- 5号传感器 → 索引4\n\n4号传感器对应索引3，检测到黑线返回1。\n\n正确答案：B. if n[3] == 1:',
    hint: '4号传感器对应的索引是几？'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '函数功能',
    question: '下面哪个函数可以检查是否所有传感器都检测到黑线？',
    options: [
      'getLineSensor()',
      'isAllBlack()',
      'setPower()',
      'waitButton()'
    ],
    answer: 1, // B
    explanation: '- getLineSensor(): 获取传感器数据\n- isAllBlack(): 检查是否全部检测到黑线 ✓\n- setPower(): 控制轮子速度\n- waitButton(): 等待按钮按下\n\n正确答案：B. isAllBlack()',
    hint: '函数名里有"All"'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '算法逻辑',
    question: '下面的代码会怎样运行？\n\n```python\nwhile True:\n    if n[0] == 1:\n        setPower(0, 80)\n    elif n[2] == 1:\n        setPower(80, 80)\n    elif n[4] == 1:\n        setPower(80, 0)\n```',
    options: [
      '智能车会正常循线',
      '智能车会一直左转',
      '代码有错误，n 没有定义',
      '智能车会一直右转'
    ],
    answer: 2, // C
    explanation: '正确答案：C. 代码有错误\n\n问题在于：变量 n 没有被赋值！应该先用 getLineSensor() 获取传感器数据：\n\n```python\nwhile True:\n    n = getLineSensor()  # 获取传感器数据！\n    if n[0] == 1:\n        setPower(0, 80)\n    ...\n```\n\n编程知识：使用变量前必须先赋值，否则会报 NameError。',
    hint: '变量 n 是从哪里来的？'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '计数器',
    question: '智能车经过3个十字路口后停止，应该用什么代码？\n\n```python\ncrossings = 0\nwhile True:\n    if isAllBlack():\n        crossings ___ 1\n        if crossings ___ 3:\n            setPower(0, 0)\n            break\n```\n\n空白处应该填什么？',
    options: [
      '=, >',
      '+=, ==',
      '+=, >=',
      '=, >='
    ],
    answer: 2, // C
    explanation: '正确答案：C. +=, >=\n\n- crossings += 1：计数器加1\n- crossings >= 3：大于或等于3时停止\n\n```python\ncrossings = 0\nwhile True:\n    if isAllBlack():\n        crossings += 1  # 计数器加1\n        if crossings >= 3:  # 达到3个时停止\n            setPower(0, 0)\n            break\n```\n\n为什么用 >= 而不是 ==？用 >= 更安全，万一计数器跳过了3（比如从2直接变4），程序仍然能正确停止。',
    hint: '+= 是什么操作？'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L8-3',
  title: '奇怪的面试者',
  subtitle: '学会使用传感器和控制智能车运动',
  difficulty: '进阶',
  estimatedTime: '40-50分钟',
  learningGoals: [
    '理解循线传感器的工作原理（红外线反射）',
    '掌握 getLineSensor() 获取传感器数据',
    '学会用 setPower() 控制智能车速度和转向',
    '掌握 waitButton() 安全启动机制',
    '学会 isAllBlack() 检测十字路口',
    '能实现完整的循线程序'
  ],
  prerequisites: [
    'Python 基础语法',
    'while 循环',
    'if 条件判断',
    '列表索引操作'
  ],
  hardwareWarning: '⚠️ 本课程需要核桃编程智能车硬件才能运行'
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['line', 'sensor', 'wait', 'time'],
  medium: ['power', 'infrared', 'button', 'crossing'],
  hard: ['getLineSensor', 'setPower', 'waitButton', 'isAllBlack']
}

// 代码模板练习（按难度分组）
// 缩进使用4个空格（Python PEP 8标准）
export const typingTemplates = {
  easy: [
    // 简单单行代码 - while循环和传感器
    'while True:',
    'if n[2] == 1:',
    'n = getLineSensor()',
    'setPower(80, 80)',
    'waitButton()',
    'break'
  ],
  medium: [
    // 包含缩进的多行代码
    'while True:\n    n = getLineSensor()',
    'if n[0] == 1:\n    setPower(0, 80)',
    'elif n[2] == 1:\n    setPower(80, 80)',
    'setPower(left, right)',
    'counter += 1',
    'for i in range(4):'
  ],
  hard: [
    // 复杂的多行代码
    'while crossings < 3:\n    if isAllBlack():\n        crossings += 1',
    'if n[2] == 1:\n    setPower(80, 80)\n    elif n[0] == 1:\n        setPower(0, 80)',
    'while True:\n    n = getLineSensor()\n    if n[2] == 1:\n        break',
    'if crossings >= 3:\n    setPower(0, 0)\n    break'
  ]
}

// 导出所有数据
export const L8_3_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L8_3_data
