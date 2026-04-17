/**
 * PY2 课程 L11-3: 神秘惊喜
 *
 * 核心知识点:
 * 1. 智能车循线 followLine()
 * 2. 智能车识别地图颜色获取货物
 * 3. 超声波避障 getSonar()
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'sonar',
    pronunciation: '[sou-na:r]',
    partOfSpeech: 'n.',
    meaning: '声呐；声波定位仪',
    level: 'medium',
    example: 'Sonar is like eyes in total darkness.',
    exampleTranslation: '声呐就像是黑暗中的眼睛。',
    source: 'ocr'
  },
  {
    word: 'goods',
    pronunciation: '[gudz]',
    partOfSpeech: 'n.',
    meaning: '商品；货物',
    level: 'easy',
    example: 'The railroads made transporting goods easier.',
    exampleTranslation: '铁路使货物运输更加容易。',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'follow',
    pronunciation: '[fa-lou]',
    partOfSpeech: 'v.',
    meaning: '跟随；沿着',
    level: 'easy',
    example: 'Follow the line to the end.',
    exampleTranslation: '沿着线走到尽头。',
    source: 'extended'
  },
  {
    word: 'avoid',
    pronunciation: '[e-v_oid]',
    partOfSpeech: 'v.',
    meaning: '避开；避免',
    level: 'medium',
    example: 'The car can avoid obstacles.',
    exampleTranslation: '智能车可以避开障碍物。',
    source: 'extended'
  },
  {
    word: 'distance',
    pronunciation: '[dis-tens]',
    partOfSpeech: 'n.',
    meaning: '距离；远处',
    level: 'hard',
    example: 'Check the distance to the wall.',
    exampleTranslation: '检查到墙壁的距离。',
    source: 'extended'
  },
  {
    word: 'detect',
    pronunciation: '[di-tekt]',
    partOfSpeech: 'v.',
    meaning: '检测；发现',
    level: 'hard',
    example: 'The sensor can detect colors.',
    exampleTranslation: '传感器可以检测颜色。',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '智能车循线',
    emoji: '🛤️',
    gradeLevel: '1-2',
    summary: '让智能车沿着黑线自动前进',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '智能车像火车一样，可以沿着轨道（黑线）自动前进。我们只需要告诉它"循线"，它就能自己走了！',
      concept: 'followLine()是一个神奇的函数，它会让智能车自动检测地上的黑线并沿着它前进。',
      syntax: '# 智能车循线\nwhile True:\n    followLine()',
      example: {
        title: '让智能车循线前进',
        code: 'initCar()           # 初始化智能车\nsetPower(80, 80)    # 设置速度\nwhile True:\n    followLine()    # 循线前进',
        output: '智能车沿着黑线不断前进',
        explanation: 'followLine()让智能车自动检测并沿着黑线走，放在while True循环里会一直循线。'
      },
      practice: [
        {
          question: 'followLine()的作用是什么？',
          answer: '让智能车沿着黑线自动前进'
        },
        {
          question: '循线需要什么前提条件？',
          answer: '需要先初始化智能车initCar()'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '在物流仓库里，智能车需要沿着固定路线送货。followLine()就是它的"导航系统"！',
      concept: '循线功能结合其他传感器，可以实现更复杂的任务。比如循线的同时检测颜色，在特定位置停下来。',
      syntax: '# 循线+颜色检测\nwhile True:\n    followLine()       # 循线\n    color = getColor() # 检测颜色\n    if color == "红":\n        # 到达目的地，执行动作',
      example: {
        title: '循线送货',
        code: 'initCar()\ninitColorSensor()\nsetPower(80, 80)\nwhile True:\n    followLine()\n    color = getColor()\n    if color == "红":\n        print("到达目的地！")\n        setPower(0, 0)  # 停下\n        break',
        output: '智能车循线前进，遇到红色停下',
        explanation: '在循线的同时检测颜色，到达红色区域就停下来。'
      },
      practice: [
        {
          question: '如何在循线时检测颜色？',
          answer: '在followLine()后面加上getColor()'
        },
        {
          question: '如何让智能车在红色区域停下？',
          answer: '检测到红色时用setPower(0,0)和break'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '高级循线任务！智能车需要在复杂地图上循线，同时完成取货、避障、返回等多个任务。',
      concept: '循线是智能车的基础功能，结合条件判断、变量计数、多传感器协作，可以实现复杂的自动化任务。',
      syntax: '# 多任务循线\nwhile True:\n    followLine()\n    \n    # 颜色检测\n    color = getColor()\n    if color == "红":\n        # 处理红色区域\n    \n    # 障碍物检测\n    dist = getSonar()\n    if dist < 10:\n        # 避障处理',
      example: {
        title: '综合循线任务',
        code: 'initCar()\ninitColorSensor()\nnum = 0\nwhile True:\n    followLine()\n    color = getColor()\n    \n    if color == "红":\n        num += 1\n        if num == 1:\n            # 第一次红色：取货\n            move(7)\n            turnRight(90)\n        elif num == 2:\n            # 第二次红色：完成\n            setPower(0, 0)\n            break',
        output: '智能车循线完成多阶段任务',
        explanation: '用变量记录状态，实现复杂的循线任务流程。'
      },
      practice: [
        {
          question: '如何实现多阶段的循线任务？',
          answer: '用变量记录经过特定位置的次数'
        },
        {
          question: 'followLine()可以和其他功能同时使用吗？',
          answer: '可以，在循环中依次调用多个功能'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '智能车获取货物',
    emoji: '📦',
    gradeLevel: '1-2',
    summary: '让智能车在指定位置获取货物',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '地图上有红色的货物点！当智能车看到红色时，就知道货物到了，需要停下来取货。',
      concept: '红色区域是货物点入口。第一次检测到红色时，智能车需要前进一小段，然后转弯进入取货点。',
      syntax: '# 检测红色取货\nif color == "红":\n    move(7)        # 前进\n    turnRight(90)  # 右转\n    move(15)       # 进入取货点',
      example: {
        title: '进入取货点',
        code: 'initCar()\ninitColorSensor()\nwhile True:\n    followLine()\n    color = getColor()\n    if color == "红":\n        move(7)         # 前进7厘米\n        turnRight(90)   # 右转90度\n        move(15)        # 前进入取货点\n        break',
        output: '智能车循线到红色区域，右转进入取货点',
        explanation: '检测到红色后，按顺序执行：前进→右转→前进，进入取货点。'
      },
      practice: [
        {
          question: '红色区域代表什么？',
          answer: '货物点入口'
        },
        {
          question: '进入取货点需要哪几步？',
          answer: '前进→右转→前进'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '智能车需要记住经过红色区域的次数，这样才能在正确的位置执行正确的动作！',
      concept: '用变量记录经过红色区域的次数。第一次遇到红色进入取货点，第二次可能做其他事情。',
      syntax: '# 用变量记录次数\nnum = 0\nwhile True:\n    followLine()\n    color = getColor()\n    if color == "红":\n        num += 1\n        if num == 1:\n            # 第一次：取货\n        elif num == 2:\n            # 第二次：其他动作',
      example: {
        title: '多次红色处理',
        code: 'initCar()\ninitColorSensor()\nnum = 0\nwhile True:\n    followLine()\n    color = getColor()\n    if color == "红":\n        num = num + 1\n        if num == 1:\n            print("第一次红色：准备取货")\n            move(7)\n            turnRight(90)\n        if num == 2:\n            print("第二次红色：任务完成")\n            break',
        output: '智能车在不同红色区域执行不同动作',
        explanation: 'num变量记录经过红色的次数，根据次数执行不同操作。'
      },
      practice: [
        {
          question: '为什么要用变量记录次数？',
          answer: '区分是第几次遇到红色，执行不同动作'
        },
        {
          question: 'num = num + 1是什么意思？',
          answer: '让num的值增加1'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '完整的物流系统！智能车需要循线、识别颜色、取货、避障、返回，所有动作要协调配合。',
      concept: '将复杂任务分解为多个状态，用状态变量管理。每个状态下执行不同的行为，状态之间可以切换。',
      syntax: '# 状态管理\ntask = "巡逻"\nwhile True:\n    if task == "巡逻":\n        followLine()\n        if 发现货物:\n            task = "取货"\n    elif task == "取货":\n        # 取货动作\n        task = "返回"\n    elif task == "返回":\n        # 返回动作',
      example: {
        title: '完整取货流程',
        code: 'initCar()\ninitColorSensor()\nnum = 0\nwhile True:\n    followLine()\n    color = getColor()\n    \n    if color == "红":\n        num += 1\n        if num == 1:\n            # 进入取货点\n            move(7)\n            turnRight(90)\n            move(15)\n            # 这里可以执行取货动作\n            print("取货成功！")\n        elif num == 2:\n            # 任务完成\n            setPower(0, 0)\n            carLightOn(0, "绿")\n            break',
        output: '智能车完成取货任务，亮绿灯表示成功',
        explanation: '完整的取货流程：循线→识别红色→进入取货点→完成任务。'
      },
      practice: [
        {
          question: '如何设计一个完整的任务流程？',
          answer: '把任务分解为多个步骤，用变量记录当前阶段'
        },
        {
          question: '取货完成后如何提示？',
          answer: '可以亮灯、打印消息或播放声音'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '超声波避障',
    emoji: '📡',
    gradeLevel: '1-2',
    summary: '用超声波传感器检测前方障碍物',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '智能车有一双"超能力眼睛"——超声波传感器！它能发出人耳听不见的声音，通过声音反弹回来检测前方有没有障碍物。',
      concept: 'getSonar()可以获取前方物体的距离，单位是厘米。距离小于某个值时，说明前面有障碍物。',
      syntax: '# 获取前方距离\ndist = getSonar()\nprint(dist)  # 打印距离（厘米）',
      example: {
        title: '检测前方距离',
        code: 'initCar()\nwhile True:\n    dist = getSonar()     # 获取距离\n    print(f"前方距离: {dist}厘米")',
        output: '前方距离: 15厘米\n前方距离: 8厘米\n...',
        explanation: 'getSonar()返回前方物体到智能车的距离，单位是厘米。'
      },
      practice: [
        {
          question: '超声波传感器的作用是什么？',
          answer: '检测前方物体的距离'
        },
        {
          question: 'getSonar()返回的单位是什么？',
          answer: '厘米'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '智能车在路上遇到了障碍物！它用超声波检测到前方太近了，就自动停下来绕开。',
      concept: '当检测到距离小于安全距离（比如10厘米）时，让智能车停下来或绕开障碍物。',
      syntax: '# 避障程序\nwhile True:\n    dist = getSonar()\n    if dist < 10:       # 距离小于10厘米\n        # 避障动作\n        setPower(0, 0)   # 停下',
      example: {
        title: '自动避障',
        code: 'initCar()\nsetPower(80, 80)\nwhile True:\n    dist = getSonar()\n    if dist < 10:\n        print("发现障碍物！")\n        setPower(0, 0)   # 停下\n        print("智能车绕开障碍物")\n    else:\n        followLine()     # 没障碍就继续走',
        output: '发现障碍物！\n智能车绕开障碍物',
        explanation: '距离小于10厘米时停下，否则继续循线前进。'
      },
      practice: [
        {
          question: '为什么用dist < 10作为条件？',
          answer: '10厘米是安全距离，太近就需要避障'
        },
        {
          question: '如何让智能车绕开障碍物？',
          answer: '可以后退、转向，然后继续前进'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '在复杂的环境中，智能车需要灵活避障：检测距离、判断方向、选择最佳路线绕过障碍物。',
      concept: '超声波避障可以结合循线、速度控制等功能，实现智能化的自主导航。',
      syntax: '# 完整避障逻辑\nwhile True:\n    dist = getSonar()\n    \n    if dist < 5:\n        # 太近了，紧急停止\n        setPower(0, 0)\n    elif dist < 15:\n        # 有障碍，减速绕行\n        setPower(40, 80)  # 左转\n    else:\n        # 安全，正常循线\n        followLine()',
      example: {
        title: '智能避障',
        code: 'initCar()\nwhile True:\n    dist = getSonar()\n    \n    if dist < 10:\n        # 发现障碍物\n        print("检测到障碍物！")\n        setPower(0, 0)    # 停下\n        time.sleep(1)\n        \n        # 绕行\n        turnRight(90)     # 右转\n        move(10)          # 前进\n        turnLeft(90)      # 左转\n        move(15)          # 绕过障碍\n        \n        setPower(80, 80)  # 继续前进\n    else:\n        followLine()',
        output: '智能车检测到障碍物后自动绕行',
        explanation: '检测到障碍物后，执行一套绕行动作，然后继续循线。'
      },
      practice: [
        {
          question: '为什么需要time.sleep(1)？',
          answer: '给智能车反应时间，避免动作太快出错'
        },
        {
          question: '如何让绕行动作更灵活？',
          answer: '可以根据障碍物距离动态调整绕行路线'
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
    mathConcept: '物理测量',
    question: '超声波传感器的作用是什么？',
    options: [
      '根据超声波发射和反弹的时间计算出与前方物体的距离',
      '通过人耳能听到的声音探测前方物体的距离',
      '用摄像头拍照检测前方物体',
      '用温度传感器检测环境温度'
    ],
    answer: 0,
    explanation: '超声波传感器通过发射超声波并接收其反射回来的声波，计算出与前方物体的距离。超声波频率超出人耳可听范围。\n\n科学知识：声波反射原理，蝙蝠也是用这种方法探测障碍物的。',
    hint: '超声波是人耳听不到的高频声音'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '函数功能',
    question: '下面哪个语句可以获取超声波传感器的结果？',
    options: [
      'getColor()',
      'setClaw()',
      'move()',
      'getSonar()'
    ],
    answer: 3,
    explanation: 'getColor()用于获取颜色传感器的检测结果，setClaw()用于控制智能车的夹爪，move()可以让智能车前进固定距离，getSonar()用于获取超声波传感器的测量结果。\n\n编程知识：不同的函数有不同的功能，要选择正确的函数。',
    hint: '超声波的英文是sonar'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '比较运算',
    question: '在智能车避障程序中，如何让智能车在检测到障碍物后停下来？',
    options: [
      '使用setPower(0, 0)语句',
      '使用setClaw(0)语句',
      '使用getSonar()语句',
      '使用followLine()语句'
    ],
    answer: 0,
    explanation: 'setPower(0, 0)可以停止智能车的所有电机，从而使智能车停下来。setClaw(0)可以打开夹爪，而getSonar()用于获取超声波传感器的检测结果。\n\n数学知识：0表示"没有"，setPower(0,0)表示左右电机都不转。',
    hint: '想想如何让电机停止转动'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '距离比较',
    question: '执行下面代码，当超声波检测到距离为8厘米时会发生什么？\n\n```python\nif dist < 10:\n    print("有障碍！")\nelse:\n    print("安全！")\n```',
    options: [
      '打印"有障碍！"',
      '打印"安全！"',
      '什么都不打印',
      '报错'
    ],
    answer: 0,
    explanation: '8 < 10 是对的，所以执行if分支，打印"有障碍！"。当距离小于10厘米时，条件成立。\n\n数学知识：8 < 10，8确实小于10，所以条件成立。',
    hint: '8厘米小于10厘米吗？'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '逻辑推理',
    question: '智能车循线时，依次检测到的距离是：15、12、8、5、3厘米。请问智能车会在第几次检测时执行避障（假设条件是dist < 10）？',
    options: [
      '第1次',
      '第2次',
      '第3次',
      '第5次'
    ],
    answer: 2,
    explanation: '条件是dist < 10。检测到的距离：15(不满足)、12(不满足)、8(满足！)。第3次检测到8厘米，8 < 10成立，开始避障。\n\n数学知识：比较运算，8、5、3都小于10，但第一次满足条件的是第3次检测。',
    hint: '找出第一个小于10的数'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合应用',
    question: '下面代码实现了什么功能？\n\n```python\nwhile True:\n    followLine()\n    color = getColor()\n    if color == "红":\n        move(7)\n        turnRight(90)\n        break\n```',
    options: [
      '智能车一直循线，不做其他动作',
      '智能车循线，遇到红色时前进并右转，然后结束循环',
      '智能车检测到红色就停止',
      '智能车一直右转'
    ],
    answer: 1,
    explanation: '程序逻辑：循线的同时检测颜色，当检测到红色时，先前进7厘米，再右转90度，然后break退出循环。\n\n编程知识：理解程序的执行流程，循环→条件判断→执行动作→退出。',
    hint: '仔细看if里面的动作和最后的break'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L11-3',
  title: '神秘惊喜',
  subtitle: '学会智能车循线、获取货物和超声波避障',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握followLine()循线功能',
    '学会在循线时检测颜色获取货物',
    '能够使用getSonar()检测障碍物距离',
    '理解智能车避障的基本原理'
  ],
  prerequisites: [
    'Python基础语法',
    '条件语句if/else',
    'while循环',
    '颜色传感器使用'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['sonar', 'goods', 'move', 'line'],
  medium: ['follow', 'detect', 'avoid', 'cargo'],
  hard: ['getSonar', 'followLine', 'turnRight', 'distance']
}

// 代码模板（打字练习用）
export const typingTemplates = {
  easy: [
    'dist = getSonar()',
    'followLine()',
    'move(7)'
  ],
  medium: [
    'if dist < 10:',
    'turnRight(90)',
    'if color == "红":'
  ],
  hard: [
    'while True:\n    followLine()',
    'if dist < 10:\n    setPower(0, 0)',
    'num = num + 1'
  ]
}

// 导出所有数据
export const L11_3_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L11_3_data
