/**
 * PY2 课程 L10-4: 事与愿违
 *
 * 核心知识点:
 * 1. 颜色传感器的初始化和使用
 * 2. getColor()获取颜色识别结果
 * 3. 车灯控制（carLightOn/carLightOff）
 * 4. 变量控制智能车动作
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'follow',
    pronunciation: '[fa-lou]',
    partOfSpeech: 'v.',
    meaning: '跟随；沿着；遵循',
    level: 'easy',
    example: 'The dog will follow you.',
    exampleTranslation: '这只狗会跟着你。'
  },
  {
    word: 'light',
    pronunciation: '[lait]',
    partOfSpeech: 'n.',
    meaning: '光；电灯',
    level: 'easy',
    example: 'Turn on the light, please.',
    exampleTranslation: '请把灯打开。'
  },
  {
    word: 'on',
    pronunciation: '[on]',
    partOfSpeech: 'prep.',
    meaning: '在...之上；打开',
    level: 'easy',
    example: 'The book is on the desk.',
    exampleTranslation: '书在桌子上。'
  },
  {
    word: 'off',
    pronunciation: '[of]',
    partOfSpeech: 'adv.',
    meaning: '离开；关闭',
    level: 'easy',
    example: 'Turn off the light.',
    exampleTranslation: '把灯关掉。'
  },
  // 拓展单词
  {
    word: 'sensor',
    pronunciation: '[sen-sor]',
    partOfSpeech: 'n.',
    meaning: '传感器；探测设备',
    level: 'medium',
    example: 'The sensor detects the color.',
    exampleTranslation: '传感器检测颜色。'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '颜色传感器初体验',
    emoji: '🎨',
    gradeLevel: '1-2',
    summary: '让智能车能"看见"颜色',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '智能车也有一双"眼睛"，它能看到红色、蓝色、白色和黑色！这双"眼睛"就是颜色传感器。',
      concept: '颜色传感器可以识别不同的颜色。使用前需要先初始化（准备工作），然后才能获取识别结果。',
      syntax: '# 初始化颜色传感器\ninitColorSensor()\n\n# 获取颜色结果\ncolor = getColor()',
      example: {
        title: '让智能车识别颜色',
        code: '# 第一步：初始化智能车\ninitCar()\n# 第二步：初始化颜色传感器\ninitColorSensor()\n# 第三步：获取颜色\ncolor = getColor()\nprint(color)',
        output: '红\n（或 蓝/白/黑/无）',
        explanation: 'getColor()会返回识别到的颜色名称，是一个字符串，比如"红"、"蓝"等。'
      },
      practice: [
        {
          question: '颜色传感器能识别哪些颜色？',
          answer: '红、蓝、白、黑'
        },
        {
          question: '使用颜色传感器前需要先做什么？',
          answer: '需要先初始化：initColorSensor()'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '在物流仓库里，智能车需要根据地面颜色来决定往哪个方向走。颜色传感器就像智能车的导航仪！',
      concept: '颜色传感器通过检测物体反射的光线来判断颜色。返回的结果是字符串类型，可以直接用于条件判断。',
      syntax: '# 完整的颜色检测流程\ninitCar()              # 初始化智能车\ninitColorSensor()      # 初始化颜色传感器\nwhile True:\n    color = getColor()  # 获取颜色\n    if color == "红":\n        # 红色时做什么\n    elif color == "蓝":\n        # 蓝色时做什么',
      example: {
        title: '根据颜色做不同动作',
        code: 'initCar()\ninitColorSensor()\nwhile True:\n    color = getColor()\n    if color == "红":\n        print("检测到红色，停车！")\n        setPower(0, 0)\n    else:\n        print("继续前进")',
        output: '检测到红色，停车！\n（当识别到红色时）',
        explanation: '用if语句判断颜色传感器的结果，不同颜色执行不同的动作。'
      },
      practice: [
        {
          question: 'getColor()返回的结果是什么类型？',
          answer: '字符串类型，比如"红"、"蓝"等'
        },
        {
          question: '如何让智能车在检测到蓝色时右转？',
          answer: 'if color == "蓝": turnRight(90)'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '在复杂的地图上，智能车需要记录经过不同颜色区域的次数，用来判断当前的位置和下一步动作。',
      concept: '结合变量和循环，可以实现基于颜色的复杂控制逻辑。使用变量记录颜色出现的次数，实现多阶段任务控制。',
      syntax: '# 用变量记录颜色出现次数\ncount = 0\nwhile True:\n    color = getColor()\n    if color == "红":\n        count += 1\n        if count == 1:\n            # 第一次遇到红色\n        elif count == 2:\n            # 第二次遇到红色\n            break',
      example: {
        title: '计数控制巡逻圈数',
        code: 'initCar()\ninitColorSensor()\ncircleNum = 0  # 记录圈数\nwhile True:\n    followLine()\n    color = getColor()\n    if color == "红":\n        circleNum += 1\n        print(f"第{circleNum}圈")\n    if circleNum == 2:\n        print("巡逻完成！")\n        break',
        output: '第1圈\n第2圈\n巡逻完成！',
        explanation: '用变量circleNum记录经过红色区域的次数，达到2次后停止循环。'
      },
      practice: [
        {
          question: '如何在检测到3次蓝色后停止？',
          answer: '用变量计数，当count == 3时break'
        },
        {
          question: '为什么要在循环外先初始化变量？',
          answer: '如果在循环内初始化，每次循环变量都会重置为0'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '智能车灯亮起来',
    emoji: '💡',
    gradeLevel: '1-2',
    summary: '用代码控制车灯的开关',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '智能车上有4颗漂亮的LED灯，可以发出红、绿、蓝、粉、黄、紫、白、灰、橙9种颜色的光！',
      concept: 'carLightOn()可以打开车灯，carLightOff()可以关闭车灯。车灯序号0表示全部灯，1-4表示单颗灯。',
      syntax: '# 打开全部车灯（红色）\ncarLightOn(0, "红")\n\n# 关闭全部车灯\ncarLightOff(0)',
      example: {
        title: '闪烁的车灯',
        code: '# 打开全部红色车灯\ncarLightOn(0, "红")\n# 等待2秒\ntime.sleep(2)\n# 关闭车灯\ncarLightOff(0)',
        output: '车灯亮起红色2秒后熄灭',
        explanation: 'carLightOn(0, "红")中，0表示全部灯，"红"是灯的颜色。'
      },
      practice: [
        {
          question: '0号车灯代表什么？',
          answer: '代表全部车灯'
        },
        {
          question: '车灯可以显示哪些颜色？',
          answer: '红、绿、蓝、粉、黄、紫、白、灰、橙'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '在夜间巡逻时，智能车用车灯来传递信号。遇到不同情况，亮起不同颜色的灯！',
      concept: '可以结合条件语句，根据检测到的颜色来控制车灯颜色，实现智能化的灯光反馈。',
      syntax: '# 根据条件控制车灯\nif 条件:\n    carLightOn(0, "颜色1")\nelse:\n    carLightOn(0, "颜色2")',
      example: {
        title: '颜色检测+车灯反馈',
        code: 'initCar()\ninitColorSensor()\nwhile True:\n    color = getColor()\n    if color == "红":\n        carLightOn(0, "红")   # 检测到红色，亮红灯\n    elif color == "蓝":\n        carLightOn(0, "蓝")   # 检测到蓝色，亮蓝灯\n    else:\n        carLightOff(0)        # 其他情况，关灯',
        output: '根据检测颜色亮对应颜色的灯',
        explanation: '把颜色检测和车灯控制结合，让智能车能"表达"它看到了什么。'
      },
      practice: [
        {
          question: '如何让智能车在检测到红色时亮绿灯？',
          answer: 'if color == "红": carLightOn(0, "绿")'
        },
        {
          question: '智能车有几颗车灯？',
          answer: '4颗，分别编号1-4'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '高级的灯光效果！通过控制单颗灯和时间延迟，可以实现跑马灯、呼吸灯等炫酷效果。',
      concept: '结合循环、时间控制和单灯操作，可以实现复杂的灯光效果。这需要理解异步执行和时间控制的概念。',
      syntax: '# 跑马灯效果\nlights = [1, 2, 3, 4]\nfor light in lights:\n    carLightOn(light, "红")\n    time.sleep(0.5)\n    carLightOff(light)',
      example: {
        title: '巡逻成功信号',
        code: '# 巡逻完成后闪烁3次\nfor i in range(3):\n    carLightOn(0, "绿")\n    time.sleep(0.3)\n    carLightOff(0)\n    time.sleep(0.3)\nprint("任务完成！")',
        output: '车灯闪烁3次后显示"任务完成！"',
        explanation: '用for循环控制闪烁次数，time.sleep()控制时间间隔。'
      },
      practice: [
        {
          question: '如何让1号和3号灯同时亮红色？',
          answer: 'carLightOn(1, "红")和carLightOn(3, "红")'
        },
        {
          question: '闪烁效果的关键是什么？',
          answer: '开灯→等待→关灯→等待，循环执行'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '智能巡逻车',
    emoji: '🚗',
    gradeLevel: '1-2',
    summary: '让智能车自动巡逻并完成任务',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '智能车像一个小卫士，沿着地图上的路线自动巡逻。它能看到颜色、亮灯、还能停下来！',
      concept: '把前面学的知识组合起来：初始化→循线→检测颜色→执行动作。就像搭积木一样把功能拼在一起。',
      syntax: '# 智能巡逻车基本结构\ninitCar()              # 1.初始化\ninitColorSensor()      # 2.初始化传感器\nwhile True:            # 3.循环巡逻\n    followLine()       #    循线前进\n    color = getColor() #    检测颜色\n    if color == "红":  #    判断\n        # 执行动作',
      example: {
        title: '简单巡逻程序',
        code: 'initCar()\ninitColorSensor()\nsetPower(80, 80)  # 设置速度\nwhile True:\n    followLine()        # 循线\n    color = getColor()  # 检测颜色\n    if color == "红":\n        print("发现红色！")\n        carLightOn(0, "红")',
        output: '智能车循线巡逻，遇到红色亮红灯',
        explanation: 'followLine()让智能车沿着黑线走，配合颜色检测实现智能巡逻。'
      },
      practice: [
        {
          question: '智能巡逻车的基本步骤是什么？',
          answer: '初始化→循线→检测→执行'
        },
        {
          question: 'followLine()的作用是什么？',
          answer: '让智能车沿着黑线自动前进'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '巡逻任务升级！智能车需要在巡逻小圈和大圈时执行不同的动作，用变量来记录当前状态。',
      concept: '使用变量记录经过特定颜色区域的次数，根据次数判断当前处于哪个阶段，执行对应的动作。',
      syntax: '# 用变量控制巡逻阶段\nnum = 0\nwhile True:\n    followLine()\n    color = getColor()\n    if color == "红":\n        num += 1\n        if num == 1:\n            # 第一阶段：巡逻小圈\n        elif num == 2:\n            # 第二阶段：停止',
      example: {
        title: '小圈大圈巡逻',
        code: 'initCar()\ninitColorSensor()\nsetPower(80, 80)\ncircleNum = 0\nwhile True:\n    followLine()\n    color = getColor()\n    if color == "蓝" and circleNum == 0:\n        # 第一次检测到蓝色\n        move(7)\n        turnLeft(90)  # 左转走小圈\n    if color == "蓝" and circleNum == 1:\n        # 第二次检测到蓝色\n        setPower(0, 0)  # 停止\n        break\n    if color == "红":\n        circleNum += 1',
        output: '智能车根据颜色完成小圈大圈巡逻',
        explanation: '用circleNum变量记录遇到红色的次数，控制巡逻的圈数。'
      },
      practice: [
        {
          question: '为什么要用变量记录次数？',
          answer: '用来判断智能车当前处于哪个阶段'
        },
        {
          question: 'and在条件中是什么意思？',
          answer: '表示两个条件都要满足'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '完整的巡逻回收系统！智能车需要巡逻、识别货物位置、抓取货物并返回。这是多任务协同的挑战！',
      concept: '将巡逻任务分解为多个状态阶段：巡逻中→发现目标→执行任务→返回。用状态变量来管理复杂的任务流程。',
      syntax: '# 状态机模式\nstate = "巡逻"\nwhile True:\n    if state == "巡逻":\n        # 巡逻逻辑\n        if 发现目标:\n            state = "取货"\n    elif state == "取货":\n        # 取货逻辑\n        if 取货完成:\n            state = "返回"\n    elif state == "返回":\n        # 返回逻辑',
      example: {
        title: '完整巡逻回收流程',
        code: 'initCar()\ninitColorSensor()\nnum = 0\nwhile True:\n    followLine()\n    color = getColor()\n    \n    if color == "红":\n        num += 1\n        if num == 1:\n            # 第一次红色：取货点\n            move(7)\n            turnRight(90)\n            move(15)  # 进入取货点\n            # 这里可以加取货动作\n        elif num == 2:\n            # 第二次红色：任务完成\n            setPower(0, 0)\n            carLightOn(0, "绿")  # 成功信号\n            break',
        output: '智能车完成巡逻取货任务，亮绿灯表示成功',
        explanation: '用变量num控制任务阶段，实现复杂的多步骤任务。'
      },
      practice: [
        {
          question: '什么是状态机？',
          answer: '用变量记录当前状态，根据条件在不同状态间切换'
        },
        {
          question: '如何让智能车完成任务后返回起点？',
          answer: '可以记录来时的方向，或者设置返回状态'
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
    mathConcept: '计数',
    question: '颜色传感器能识别几种颜色？',
    options: [
      '2种',
      '4种',
      '6种',
      '9种'
    ],
    answer: 1,
    explanation: '颜色传感器可以识别4种颜色：红、蓝、白、黑。如果识别不到颜色，会返回"无"。\n\n数学知识：数一数，共4种颜色。',
    hint: '想想老师讲的，有红、蓝、白、黑'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '对应关系',
    question: 'carLightOn(0, "红") 这行代码中，0表示什么？',
    options: [
      '1号灯',
      '全部灯',
      '关闭灯',
      '红灯'
    ],
    answer: 1,
    explanation: '车灯序号0表示全部灯。1、2、3、4分别表示4颗单独的灯。\n\n数学知识：0在这里表示"所有"，是一种特殊的表示方法。',
    hint: '0在车灯编号中有特殊含义'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '逻辑判断',
    question: '执行下面代码，当检测到蓝色时会亮什么颜色的灯？\n\n```python\nif color == "红":\n    carLightOn(0, "红")\nelif color == "蓝":\n    carLightOn(0, "蓝")\nelse:\n    carLightOff(0)\n```',
    options: [
      '红灯',
      '蓝灯',
      '绿灯',
      '灯关闭'
    ],
    answer: 1,
    explanation: '当color等于"蓝"时，执行elif分支，carLightOn(0, "蓝")会亮蓝灯。\n\n数学知识：逻辑判断就像数学中的分类讨论，不同条件执行不同结果。',
    hint: '看看elif color == "蓝"后面的代码'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '累加',
    question: '下面代码中，circleNum最终会变成几？\n\n```python\ncircleNum = 0\nfor i in range(3):\n    circleNum += 1\nprint(circleNum)\n```',
    options: [
      '0',
      '1',
      '3',
      '4'
    ],
    answer: 2,
    explanation: 'range(3)会循环3次，每次circleNum加1。0+1+1+1=3。\n\n数学知识：这是累加运算，初始值0，加3次1，结果为3。',
    hint: 'range(3)表示循环3次'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '逻辑推理',
    question: '智能车从起点出发，依次经过红、蓝、红、蓝。请问第4次检测到颜色时，num的值是多少？\n\n```python\nnum = 0\nwhile True:\n    color = getColor()\n    if color == "红":\n        num += 1\n```',
    options: [
      '1',
      '2',
      '3',
      '4'
    ],
    answer: 1,
    explanation: '只有检测到红色时num才会加1。颜色顺序是红、蓝、红、蓝，红色出现2次，所以num=2。\n\n数学知识：这是计数问题，只统计满足条件的次数。',
    hint: '注意只有红色时才计数'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '条件组合',
    question: '下面代码在什么情况下会打印"小圈巡逻"？\n\n```python\nif color == "蓝" and num == 1:\n    print("小圈巡逻")\n```',
    options: [
      '只要检测到蓝色',
      '只要num等于1',
      '检测到蓝色并且num等于1',
      '检测到蓝色或者num等于1'
    ],
    answer: 2,
    explanation: 'and表示"并且"，两个条件都要满足。必须同时满足color=="蓝"和num==1才会打印。\n\n数学知识：逻辑"与"运算，两个条件都为真时结果才为真。',
    hint: 'and表示两个条件都要满足'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L10-4',
  title: '事与愿违',
  subtitle: '学会使用颜色传感器和车灯控制',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握颜色传感器的初始化和使用',
    '学会用getColor()获取颜色识别结果',
    '能够控制车灯的开关和颜色',
    '理解变量控制智能车动作的原理'
  ],
  prerequisites: [
    'Python基础语法',
    '条件语句if/elif/else',
    'while循环',
    '变量概念'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['light', 'on', 'off', 'color'],
  medium: ['follow', 'sensor', 'detect', 'circle'],
  hard: ['carLightOn', 'carLightOff', 'getColor', 'initColorSensor']
}

// 代码模板（打字练习用）
export const typingTemplates = {
  easy: [
    'carLightOn(0, "红")',
    'carLightOff(0)',
    'color = getColor()'
  ],
  medium: [
    'initColorSensor()',
    'if color == "红":',
    'circleNum += 1'
  ],
  hard: [
    'if color == "蓝" and num == 1:',
    'while True:\n    followLine()',
    'initCar()\ninitColorSensor()'
  ]
}

// 导出所有数据
export const L10_4_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L10_4_data
