/**
 * PY2 课程 L7-4: 智能遥控车重建百兽洞
 *
 * 核心知识点:
 * 1. initCar()语句（初始化智能车）
 * 2. move()语句（控制移动）
 * 3. turnLeft()/turnRight()语句（控制转向）
 * 4. setPower()语句（控制动力）
 * 5. setClaw()语句（控制夹爪）
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'initial',
    pronunciation: "[ɪ'nɪʃl]",
    partOfSpeech: 'adj.',
    meaning: '最初的；开始的；首字母',
    level: 'medium',
    example: 'The initial step is to turn on the device.',
    exampleTranslation: '第一步是打开设备。'
  },
  // 拓展单词
  {
    word: 'power',
    pronunciation: "['paʊər]",
    partOfSpeech: 'n.',
    meaning: '力量；能量；电力；动力',
    level: 'easy',
    example: 'The car has a powerful engine.',
    exampleTranslation: '这辆车有一个强大的引擎。'
  },
  {
    word: 'claw',
    pronunciation: '[klɔː]',
    partOfSpeech: 'n.',
    meaning: '爪；螯；钳',
    level: 'easy',
    example: 'The crab has big claws.',
    exampleTranslation: '螃蟹有大钳子。'
  },
  {
    word: 'detect',
    pronunciation: "[dɪ'tekt]",
    partOfSpeech: 'v.',
    meaning: '检测；识别；发现；察觉',
    level: 'medium',
    example: 'Sensors can detect obstacles.',
    exampleTranslation: '传感器可以检测障碍物。'
  },
  {
    word: 'initialize',
    pronunciation: "[ɪ'nɪʃəlaɪz]",
    partOfSpeech: 'v.',
    meaning: '初始化；设定初始值',
    level: 'hard',
    example: 'Please initialize the system before use.',
    exampleTranslation: '使用前请初始化系统。'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '智能车启动 - initCar()语句',
    emoji: '🚗',
    gradeLevel: '1-2',
    summary: '初始化智能车，准备控制',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一辆智能遥控车，在开车前需要先"启动"它！initCar() 就像按下遥控车的电源开关，让它准备好听从你的指挥！',
      concept: 'initCar() 语句可以初始化智能车，让智能车做好运动准备。在编写控制程序前，必须先调用 initCar()。',
      syntax: 'initCar()',
      example: {
        title: '启动智能车',
        code: '# 初始化智能车\ninitCar()\n\n# 现在可以控制它移动了\nmove(10)',
        output: '智能车启动成功，向前移动 10 厘米',
        explanation: 'initCar() 让智能车进入准备状态，之后才能用其他命令控制它。'
      },
      practice: [
        {
          question: '在控制智能车移动前，首先要做什么？',
          answer: '调用 initCar() 初始化'
        },
        {
          question: 'initCar 后面的小括号里需要填内容吗？',
          answer: '不需要，initCar() 括号里是空的'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '现在你知道了 initCar() 是一个"初始化函数"。在编程中，初始化是非常重要的概念，它设定了设备和程序的初始状态。',
      concept: '初始化是编程的基础概念。initCar() 会设置智能车的初始参数，比如电机归零、传感器校准等。每个控制程序开始时都应该先初始化。',
      syntax: '# 标准的智能车程序结构\ninitCar()  # 先初始化\n# 然后写控制代码\nmove(10)\nturnLeft(90)',
      example: {
        title: '完整的控制程序',
        code: '# 智能车控制程序\n# 第一步：初始化\ninitCar()\n\n# 第二步：控制移动\nmove(15)        # 前进 15cm\nturnLeft(90)    # 左转 90度\nmove(10)        # 再前进 10cm',
        output: '智能车前进 15cm，左转 90 度，再前进 10cm',
        explanation: '这是一个标准的智能车控制程序结构：先初始化，再写控制命令。'
      },
      practice: [
        {
          question: '如果把 initCar() 放在 move() 后面会怎样？',
          answer: '会报错或无法正常工作，必须先初始化'
        },
        {
          question: '为什么需要初始化？',
          answer: '设置初始状态，让设备准备好接收命令'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '编程专家模式！初始化是硬件编程中最基础也最重要的概念。不同设备有不同的初始化方式，但目的都是设置设备的初始状态。',
      concept: '在硬件编程中，初始化通常包括：设置引脚模式、配置通信接口、校准传感器、清空缓冲区等。initCar() 封装了这些复杂操作。',
      syntax: '# 初始化通常做的事\n# 设置电机引脚\n# 配置传感器\n# 清空缓冲区\n# 设置初始状态\n\n# 对其他设备\npygame.init()  # Pygame游戏\nserial.init() # 串口通信',
      example: {
        title: '多种初始化对比',
        code: '# 不同库的初始化\n\n# 智能车\ninitCar()\n\n# Pygame 游戏\nimport pygame\npygame.init()\n\n# 它们的作用都是：\n# 设置初始状态，准备使用',
        output: '不同的库有不同的初始化函数',
        explanation: '初始化是硬件和游戏编程中的通用模式，确保设备或库处于正确的初始状态。'
      },
      practice: [
        {
          question: '如果忘记初始化会怎样？',
          answer: '设备可能不会响应，或行为不符合预期'
        },
        {
          question: '一个程序可以多次调用 initCar() 吗？',
          answer: '通常不需要，但有些情况下可以用来"重置"设备'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '前进后退 - move()语句',
    emoji: '↔️',
    gradeLevel: '1-2',
    summary: '控制智能车前进或后退',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '按下遥控器的前进按钮，小车就往前跑！move() 语句就像遥控器的方向键，可以控制小车前进或后退！',
      concept: 'move() 语句可以让智能车前进或后退。括号里的数字表示移动的距离（厘米）。正数前进，负数后退。',
      syntax: 'move(距离)  # 单位是厘米\n\nmove(10)   # 前进 10cm\nmove(-10)  # 后退 10cm',
      example: {
        title: '让小车前进和后退',
        code: '# 初始化\ninitCar()\n\n# 前进 10 厘米\nmove(10)\n\n# 后退 5 厘米\nmove(-5)',
        output: '智能车前进 10cm，然后后退 5cm',
        explanation: 'move(10) 让小车前进 10 厘米，move(-5) 让小车后退 5 厘米。'
      },
      practice: [
        {
          question: 'move(15) 让小车做什么？',
          answer: '前进 15 厘米'
        },
        {
          question: 'move(-20) 让小车做什么？',
          answer: '后退 20 厘米'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '现在你可以组合多个 move() 命令，让小车走出各种形状的轨迹！比如正方形、圆形等等。',
      concept: '通过组合多个 move() 和 turnLeft/Right() 命令，可以让小车走出各种形状。关键是计算好每条边的长度和每个角度。',
      syntax: '# 画正方形\nfor i in range(4):\n    move(10)      # 边长 10cm\n    turnLeft(90)  # 转 90 度\n\n# 画圆形（用很多小段近似）\nfor i in range(36):\n    move(1)\n    turnLeft(10)',
      example: {
        title: '画一个正方形',
        code: '# 初始化\ninitCar()\n\n# 画正方形\nfor i in range(4):\n    move(15)      # 每条边 15cm\n    turnLeft(90)  # 每次转 90 度',
        output: '小车走出一个边长 15cm 的正方形',
        explanation: '正方形有 4 条边，每条边长度相等，每个角是 90 度。用循环重复 4 次。'
      },
      practice: [
        {
          question: '如何让小车走一个三角形？',
          answer: '循环 3 次，每次 move(边长) + turnLeft(120)'
        },
        {
          question: 'move() 的单位是什么？',
          answer: '厘米（cm）'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '轨迹大师！你可以用编程让小车画出复杂的几何图形，甚至书写文字！关键是要理解几何和编程的结合。',
      concept: '使用极坐标思想：用 move() 和 turn() 可以近似各种曲线。圆周 = 360度，小角度的多次转向可以画出平滑曲线。',
      syntax: '# 画圆形\nfor i in range(360):\n    move(1)\n    turnLeft(1)\n\n# 画螺旋\nfor r in range(1, 50):\n    move(5)\n    turnLeft(90)\n    move(r)',
      example: {
        title: '画一个五角星',
        code: '# 初始化\ninitCar()\n\n# 画五角星\nfor i in range(5):\n    move(20)\n    turnRight(144)  # 144度 = 180 - 36',
        output: '小车画出一个五角星',
        explanation: '五角星每个角是 36 度，转弯时需要转 180 - 36 = 144 度。重复 5 次完成五角星。'
      },
      practice: [
        {
          question: '如何画一个六边形？',
          answer: '循环 6 次，每次 move(边长) + turnLeft(60)'
        },
        {
          question: '如果要画圆形，应该转多少度？',
          answer: '360 度（一个完整的圆周）'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '左右转弯 - turnLeft()/turnRight()',
    emoji: '🔄',
    gradeLevel: '1-2',
    summary: '控制智能车转向',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '小车走到路口要转弯！turnLeft() 和 turnRight() 就像方向盘，可以控制小车向左转或向右转！',
      concept: 'turnLeft() 让小车向左旋转，turnRight() 让小车向右旋转。括号里的数字表示旋转的角度（度）。',
      syntax: 'turnLeft(角度)  # 左转\nturnRight(角度) # 右转\n\n# 常用角度\nturnLeft(90)   # 左转直角\nturnRight(90)  # 右转直角\nturnLeft(180)  # 掉头',
      example: {
        title: '转向练习',
        code: '# 初始化\ninitCar()\n\n# 前进\nmove(10)\n\n# 左转 90 度\nturnLeft(90)\n\n# 再前进\nmove(10)',
        output: '小车前进 10cm，左转 90 度，再前进 10cm（走一个 L 形）',
        explanation: 'turnLeft(90) 让小车原地向左旋转 90 度，就像走到路口左转一样。'
      },
      practice: [
        {
          question: 'turnRight(90) 让小车做什么？',
          answer: '向右转 90 度'
        },
        {
          question: 'turnLeft(180) 会怎样？',
          answer: '掉头（转 180 度，面向相反方向）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你学会了让小车走正方形！现在可以尝试更复杂的路径：走"8"字形、走迷宫、甚至按指定路线送货！',
      concept: '通过组合 move() 和 turn 命令，可以创建任意路径。关键是理解每一步的方向和位置变化。',
      syntax: '# 走 "8" 字形\n# 前半圆\nfor i in range(18):\n    move(2)\n    turnLeft(20)\n\n# 后半圆\nfor i in range(18):\n    move(2)\n    turnRight(20)',
      example: {
        title: '走一个 Z 字形',
        code: '# 初始化\ninitCar()\n\n# 第一笔\nmove(20)\nturnRight(135)\nmove(14)\nturnLeft(135)\nmove(20)',
        output: '小车走出一个 Z 字形',
        explanation: 'Z 字形由三条线组成，中间是斜线，需要计算好角度。135 度是对角线的角度。'
      },
      practice: [
        {
          question: '如何让小车原地转一圈？',
          answer: 'turnLeft(360) 或 turnRight(360)'
        },
        {
          question: '走一个矩形需要转几次？',
          answer: '4 次，每次 90 度'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '路径规划专家！你可以让小车按复杂的路线行驶，甚至可以设计自动避障算法！这需要理解角度、距离和坐标的关系。',
      concept: '结合传感器检测和转向逻辑，可以实现自动避障。检测到障碍物时，转向一定角度，然后继续前进。',
      syntax: '# 简单避障逻辑\nwhile True:\n    if detect_obstacle():\n        turnLeft(90)\n        move(10)\n    else:\n        move(5)',
      example: {
        title: '沿墙走算法',
        code: '# 沿着右墙走\ninitCar()\n\nfor i in range(50):\n    if not detect_wall_right():\n        turnLeft(90)\n        move(5)\n        turnRight(90)\n    move(3)',
        output: '小车沿着右侧墙壁前进',
        explanation: '这是一个简化的沿墙走算法：检测右边是否有墙，没有就转弯填补。机器人常用类似算法导航。'
      },
      practice: [
        {
          question: '如果要让小车走一个圆形，需要什么参数？',
          answer: '360 度的转向，配合连续的小段移动'
        },
        {
          question: '如何让小车走回到起点？',
          answer: '记录路径，然后按相反顺序和角度执行'
        }
      ]
    }
  },

  {
    id: 'kp-4',
    title: '动力控制 - setPower()语句',
    emoji: '⚡',
    gradeLevel: '3-4',
    summary: '控制智能车的速度和方向',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '你的小车可以开快也可以开慢！setPower() 就像油门和方向盘的组合，可以控制两边轮子的动力！',
      concept: 'setPower() 设置左右两个电机的动力值，范围是 -100 到 100。正数前进，负数后退，数值越大速度越快。',
      syntax: 'setPower(左电机, 右电机)\n\n# 范围: -100 到 100\n\nsetPower(80, 80)   # 全速前进\nsetPower(-80, -80) # 全速后退\nsetPower(0, 0)     # 停车',
      example: {
        title: '控制速度',
        code: '# 初始化\ninitCar()\n\n# 慢速前进\nsetPower(30, 30)\n\n# 等待一下\nimport time\ntime.sleep(2)\n\n# 停车\nsetPower(0, 0)',
        output: '小车以低速前进 2 秒，然后停车',
        explanation: 'setPower(30, 30) 设置两边的动力都是 30，所以小车直行，但速度较慢。'
      },
      practice: [
        {
          question: 'setPower(100, 100) 会怎样？',
          answer: '全速前进'
        },
        {
          question: '如何让小车停车？',
          answer: 'setPower(0, 0)'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '通过设置不同的左右动力，你可以让小车转弯、原地旋转，甚至走弧线！这比 turnLeft/Right 更灵活！',
      concept: '当左右动力不同时，小车会转向。动力小的那边转得慢，小车就向那边转。一边正一边负可以原地旋转。',
      syntax: '# 左转（左边动力小）\nsetPower(0, 80)\n\n# 右转（右边动力小）\nsetPower(80, 0)\n\n# 原地左转（一边前进一边后退）\nsetPower(80, -80)',
      example: {
        title: '用动力差转向',
        code: '# 初始化\ninitCar()\n\n# 向右转弧线\nsetPower(50, 100)\nimport time\ntime.sleep(2)\n\n# 停车\nsetPower(0, 0)',
        output: '小车向右画一个弧线',
        explanation: '左边动力 50，右边动力 100，右边更快，所以小车向右转，走出弧线轨迹。'
      },
      practice: [
        {
          question: 'setPower(0, 80) 会让小车向哪边转？',
          answer: '向左转（左边不动）'
        },
        {
          question: 'setPower(50, -50) 会怎样？',
          answer: '原地旋转（一边前进一边后退）'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '控制大师！通过精确控制左右电机的动力差，你可以实现精确的转向角度，这是很多机器人和汽车的转向原理！',
      concept: '差速转向是机器人和汽车的常见转向方式。通过调整左右轮的速度差来控制转向角度和半径。',
      syntax: '# 计算转向角度\n# 简化公式：角度差 ≈ 动力差 × 时间\n\n# 走精确角度\nturn_time = 角度 / 动力差\nsetPower(50, -50)\ntime.sleep(turn_time)',
      example: {
        title: '精确转向 45 度',
        code: '# 用动力差精确转向\nimport time\n\n# 动力差为 100（50 - (-50)）\n# 假设 100 动力差每秒转 90 度\n# 要转 45 度，需要 0.5 秒\nsetPower(50, -50)\ntime.sleep(0.5)\nsetPower(0, 0)',
        output: '小车精确左转 45 度',
        explanation: '通过控制转向时间，可以实现比 turnLeft/Right 更精确的角度控制。这需要根据实际设备调试参数。'
      },
      practice: [
        {
          question: '动力差越大，转向速度？',
          answer: '越快（角度变化越快）'
        },
        {
          question: 'setPower() 和 turnLeft/Right 有什么区别？',
          answer: 'turn 是转固定角度，setPower 可以持续控制转向过程'
        }
      ]
    }
  },

  {
    id: 'kp-5',
    title: '机械爪控制 - setClaw()语句',
    emoji: '🦾',
    gradeLevel: '1-2',
    summary: '控制智能车的夹爪',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '智能车有一个夹爪，可以夹东西！setClaw() 就是控制夹爪打开和关闭的开关！',
      concept: 'setClaw() 控制智能车的夹爪。填 1 是关闭（夹住），填 0 是打开（松开）。',
      syntax: 'setClaw(1)  # 关闭夹爪（夹住）\nsetClaw(0)  # 打开夹爪（松开）',
      example: {
        title: '抓取物体',
        code: '# 初始化\ninitCar()\n\n# 打开夹爪\nsetClaw(0)\n\n# 前进到物体位置\nmove(10)\n\n# 关闭夹爪\nsetClaw(1)',
        output: '夹爪打开，小车前进，夹住物体',
        explanation: '先用 setClaw(0) 打开夹爪，移动到物体位置后，用 setClaw(1) 关闭夹爪夹住物体。'
      },
      practice: [
        {
          question: 'setClaw(1) 是打开还是关闭？',
          answer: '关闭夹爪（夹住）'
        },
        {
          question: 'setClaw(0) 是打开还是关闭？',
          answer: '打开夹爪（松开）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '现在你可以用夹爪完成搬运任务！走到物体旁，夹住，搬运到目的地，松开！这是机器人的基本操作。',
      concept: '夹爪控制通常和移动配合使用。一个完整的搬运任务包括：移动→夹取→移动→松开。',
      syntax: '# 完整的搬运任务\nsetClaw(0)      # 1. 打开夹爪\nmove(10)        # 2. 移动到物体\nsetClaw(1)      # 3. 夹住\nmove(-10)       # 4. 搬运回来\nsetClaw(0)      # 5. 松开',
      example: {
        title: '搬运物体',
        code: '# 搬运任务\ninitCar()\n\n# 去抓物体\nsetClaw(0)\nmove(15)\nsetClaw(1)\n\n# 搬回来\nturnRight(180)\nmove(15)\n\n# 放下\nsetClaw(0)',
        output: '小车去抓取物体，搬运回来，放下',
        explanation: '这是一个完整的搬运任务：打开夹爪→移动→夹住→掉头→移回→松开。'
      },
      practice: [
        {
          question: '搬运动作的顺序是什么？',
          answer: '打开→移动→夹住→移动→松开'
        },
        {
          question: '为什么要在移动前打开夹爪？',
          answer: '这样夹爪才能套住物体，然后关闭夹住'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '机器人工程师模式！你可以设计复杂的自动化任务：分拣物品、堆叠积木、甚至自动寻迹搬运！',
      concept: '自动化任务需要将传感器检测、移动控制、夹爪操作组合起来。通过编程可以实现复杂的机器人行为。',
      syntax: '# 自动分拣逻辑\nwhile has_items():\n    item = detect_item_type()\n    if item == "A":\n        goto_zone_A()\n    else:\n        goto_zone_B()\n    drop_item()',
      example: {
        title: '自动搬运多个物体',
        code: '# 搬运 3 个物体\ninitCar()\n\nfor i in range(3):\n    # 去抓物体\n    setClaw(0)\n    move(10)\n    setClaw(1)\n    \n    # 搬到目的地\n    turnRight(90)\n    move(20)\n    \n    # 放下\n    setClaw(0)\n    \n    # 回来继续下一个\n    move(-20)\n    turnRight(270)',
        output: '自动搬运 3 个物体到指定位置',
        explanation: '用循环重复搬运任务。每次抓取→搬运→放下→返回，实现自动化搬运。'
      },
      practice: [
        {
          question: '如果要搬运不同颜色的物体到不同位置，需要什么？',
          answer: '颜色传感器或摄像头来识别物体'
        },
        {
          question: '如何避免物体掉落？',
          answer: '移动时速度不要太快，夹爪要夹紧'
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
    mathConcept: '方向与角度',
    question: '执行下面的代码，智能车会怎么移动？\n\n```python\ninitCar()\nmove(10)\nturnLeft(90)\nmove(10)\n```',
    options: [
      '前进 10cm，右转，前进 10cm',
      '前进 10cm，左转，前进 10cm',
      '后退 10cm，左转，前进 10cm',
      '前进 10cm，掉头，前进 10cm'
    ],
    answer: 1,
    explanation: 'move(10) 前进 10cm，turnLeft(90) 左转 90 度，再 move(10) 前进 10cm。轨迹是一个 L 形。\n\n数学知识：90 度是直角，左转 90 度相当于向左转弯。',
    hint: 'turnLeft(90) 是左转 90 度'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '正反方向',
    question: '下面哪个命令会让智能车后退？',
    options: [
      'move(10)',
      'move(-10)',
      'setPower(10, 10)',
      'turnLeft(90)'
    ],
    answer: 1,
    explanation: 'move(10) 是前进，move(-10) 是后退。负数表示相反方向。\n\n数学知识：正数和负数表示相反的方向，+ 和 - 互为相反数。',
    hint: 'move() 中的负数表示后退'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '动力控制',
    question: '想要让智能车一直向右转弯，应该用哪个命令？',
    options: [
      'setPower(80, 0)',
      'setPower(0, 80)',
      'setPower(-80, 0)',
      'setPower(80, 80)'
    ],
    answer: 0,
    explanation: 'setPower(左电机, 右电机)，右边动力为 0，左边动力为 80，小车会向右转。\n\n编程知识：当左右动力不同时，小车会向动力小的那边转弯。',
    hint: '右边动力小就向右转'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '夹爪控制',
    question: '下面哪个命令可以控制智能车的夹爪？',
    options: [
      'setPower()',
      'move()',
      'setClaw()',
      'turnLeft()'
    ],
    answer: 2,
    explanation: 'setClaw() 专门用来控制夹爪。setPower() 控制动力，move() 控制移动，turnLeft/Right() 控制转向。\n\n编程知识：每个函数都有专门的功能，要用正确的函数做正确的事。',
    hint: 'Claw 是"爪"的意思'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '几何图形',
    question: '要让智能车走一个正方形，需要执行什么操作？',
    options: [
      'move() 执行 3 次',
      'move() 和 turnLeft() 交替执行 4 次',
      'move() 执行 4 次',
      'turnLeft() 执行 4 次'
    ],
    answer: 1,
    explanation: '正方形有 4 条相等的边，每个角 90 度。代码：\n```python\nfor i in range(4):\n    move(10)      # 边长\n    turnLeft(90)  # 转角\n```\n\n数学知识：正方形的性质：4 条边相等，4 个角都是 90 度（直角）。',
    hint: '正方形有 4 条边，4 个直角'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合应用',
    question: '执行下面的代码，智能车会怎么移动？\n\n```python\ninitCar()\nmove(-10)\nturnRight(90)\n```',
    options: [
      '前进然后右转',
      '后退然后右转',
      '前进然后左转',
      '后退然后左转'
    ],
    answer: 1,
    explanation: 'move(-10) 后退 10cm，turnRight(90) 右转 90 度。\n\n编程知识：move() 的参数是负数时表示后退。正数前进，负数后退。',
    hint: 'move(-10) 是后退'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L7-4',
  title: '重建百兽洞',
  subtitle: '学会控制智能硬件设备',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握 initCar() 初始化智能车',
    '学会 move() 控制移动',
    '掌握 turnLeft/Right() 控制转向',
    '了解 setPower() 控制动力',
    '学会 setClaw() 控制夹爪'
  ],
  prerequisites: [
    'Python 基础语法',
    'for 循环',
    '正负数概念',
    '角度基础（90度、180度等）'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['car', 'move', 'turn', 'left', 'right'],
  medium: ['power', 'claw', 'init', 'motor', 'sensor'],
  hard: ['initialize', 'direction', 'rotation', 'automated', 'obstacle']
}

// 代码模板练习（按难度分组）
// 缩进使用4个空格（Python PEP 8标准）
export const typingTemplates = {
  easy: [
    // 简单单行代码 - 智能车控制
    'initCar()',
    'move(10)',
    'turnLeft(90)',
    'turnRight(90)',
    'move(-10)',
    'setPower(80, 80)'
  ],
  medium: [
    // 包含缩进的多行代码
    'initCar()\nmove(20)',
    'for i in range(4):\n    move(10)',
    'turnLeft(90)\nmove(15)',
    'setPower(60, 80)',
    'setClaw(True)',
    'for i in range(3):\n    turnLeft(90)'
  ],
  hard: [
    // 复杂的多行代码
    'for i in range(4):\n    move(10)\n    turnLeft(90)',
    'initCar()\nsetPower(70, 70)\nmove(25)',
    'for i in range(360):\n    setPower(50, -50)',
    'if sensor.detect():\n    setClaw(True)\n    move(10)',
    'for _ in range(8):\n    move(5)\n    turnLeft(45)'
  ]
}

// 导出所有数据
export const L7_4_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L7_4_data
