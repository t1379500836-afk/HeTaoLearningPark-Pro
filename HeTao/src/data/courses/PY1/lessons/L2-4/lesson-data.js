/**
 * PY1 课程 L2-4: 海龟绘图
 *
 * 核心知识点:
 * 1. 海龟移动命令 - forward, backward
 * 2. 转向命令 - left, right
 * 3. 重复画图 - 用循环简化代码
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'online',
    pronunciation: "[ˌɒn'laɪn]",
    partOfSpeech: 'adj./adv.',
    meaning: '联机的；在线的；在网上地',
    level: 'easy',
    example: 'This game has many online users.',
    exampleTranslation: '这个游戏有很多在线用户。',
    note: 'online user 在线用户'
  },
  {
    word: 'judge',
    pronunciation: '[dʒʌdʒ]',
    partOfSpeech: 'n./v.',
    meaning: '法官；裁判；内行；判断；评判',
    level: 'medium',
    example: 'My judge for you is 100 points.',
    exampleTranslation: '我给你的评价是100分。',
    note: 'online judge 线上测评（OJ）'
  },
  // 拓展单词 - OJ 相关
  {
    word: 'submit',
    pronunciation: '[səb-mit]',
    partOfSpeech: 'v.',
    meaning: '提交；呈交',
    level: 'medium',
    example: 'Submit your code to the OJ system.',
    exampleTranslation: '把你的代码提交到OJ系统。',
    note: 'submit code 提交代码'
  },
  {
    word: 'turtle',
    pronunciation: "['tɜːtl]",
    partOfSpeech: 'n.',
    meaning: '海龟；乌龟',
    level: 'easy',
    example: 'The turtle can draw shapes.',
    exampleTranslation: '海龟能画出各种形状。',
    note: 'turtle 海龟绘图模块'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '魔法画笔 - 海龟移动',
    emoji: '🐢',
    gradeLevel: '1-2',
    summary: '控制海龟前进和后退',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一只听话的小海龟，你可以让它往前走、往后退，它走过的路会画出线条！',
      concept: 'forward() 让海龟前进，backward() 让海龟后退。括号里的数字是移动的距离（像素）。',
      syntax: 'forward(距离)  # 前进\nbackward(距离) # 后退',
      example: {
        title: '画一条直线',
        code: 'forward(100)\nbackward(50)',
        output: '海龟先前进100步，再后退50步，画一条50步长的线。',
        explanation: 'forward(100)让海龟向前移动100像素，backward(50)让海龟向后移动50像素。'
      },
      practice: [
        {
          question: 'forward() 让海龟往哪个方向移动？',
          answer: '向前（当前朝向的前方）'
        },
        {
          question: '括号里的数字表示什么？',
          answer: '表示移动的距离（像素）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的海龟升级了！你可以精确控制它移动的距离，画出各种长度的线段！',
      concept: '移动距离的单位是像素。可以用变量表示距离，实现动态调整。负数值可以实现反向移动。',
      syntax: 'forward(100)  # 向前100像素\nforward(-50)  # 等同于backward(50)\nbackward(80) # 向后80像素',
      example: {
        title: '用变量控制距离',
        code: 'step = 50\nforward(step)\nforward(step * 2)\nbackward(step)',
        output: '先前进50，再前进100，最后后退50，总共前进100像素。',
        explanation: '用变量step控制距离，step*2表示两倍距离。这样代码更灵活，修改step就能改变所有移动。'
      },
      practice: [
        {
          question: 'forward(-50) 和 backward(50) 有区别吗？',
          answer: '效果相同，都是向后移动50像素'
        },
        {
          question: '如何让海龟移动200像素？',
          answer: '用 forward(200)'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '移动大师模式！你可以用循环重复移动，用变量计算距离，实现复杂的绘图算法！',
      concept: '结合循环和变量，可以绘制各种几何图形。移动命令是绘图的基础，配合转向可以画出任意形状。',
      syntax: 'for i in range(次数):\n    forward(距离)\n    left/right(角度)',
      example: {
        title: '画正方形',
        code: 'for i in range(4):\n    forward(100)\n    left(90)',
        output: '画一个边长为100的正方形。',
        explanation: '重复4次：前进100像素，然后左转90度。4次后正好转360度回到起点，形成正方形。'
      },
      practice: [
        {
          question: '画正方形要转几次90度？',
          answer: '4次，因为正方形有4条边和4个角'
        },
        {
          question: '如果要画正六边形，每次转多少度？',
          answer: '60度（360度÷6=60度）'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '改变方向 - 转向命令',
    emoji: '🧭',
    gradeLevel: '1-2',
    summary: '控制海龟左转和右转',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '你的小海龟可以原地转圈！告诉它向左转或向右转，它就会改变方向准备画出新的线条！',
      concept: 'left() 让海龟左转，right() 让海龟右转。括号里的数字是转的角度（度数）。',
      syntax: 'left(角度)   # 左转\nright(角度)  # 右转',
      example: {
        title: '画直角弯',
        code: 'forward(100)\nright(90)\nforward(100)',
        output: '先前进100像素，然后右转90度，再前进100像素，形成直角形状。',
        explanation: 'forward(100)画一条线，right(90)让海龟右转90度（垂直方向），forward(100)再画一条线。'
      },
      practice: [
        {
          question: 'right(90) 让海龟转多少度？',
          answer: '右转90度（垂直方向）'
        },
        {
          question: '如何让海龟左转180度？',
          answer: '用 left(180)'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的转向技巧升级了！你可以精确控制角度，画出各种多边形和几何图形！',
      concept: '角度的单位是度。完整的一圈是360度。常见角度：90度（直角）、180度（掉头）、360度（一圈）。',
      syntax: 'right(90)   # 右转90度（直角）\nleft(180)   # 左转180度（掉头）\nright(360)  # 右转360度（转一圈）',
      example: {
        title: '画三角形',
        code: 'for i in range(3):\n    forward(100)\n    right(120)',
        output: '画一个边长为100的等边三角形。',
        explanation: '三角形内角和是180度，每个外角是60度。但这里用外角画法：每次转120度（180-60=120），画3次形成三角形。'
      },
      practice: [
        {
          question: '转360度后海龟朝向哪里？',
          answer: '和原来一样，因为转了一圈'
        },
        {
          question: '画正五边形每次转多少度？',
          answer: '72度（360度÷5=72度）'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '转向大师模式！你可以用数学计算角度，画出任意正多边形，甚至美丽的星形图案！',
      concept: '正n边形的外角是360/n度。用这个公式可以画出任意边数的正多边形。星形图案使用不同的角度计算。',
      syntax: '# 正n边形通用公式\nangle = 360 / n\nfor i in range(n):\n    forward(边长)\n    left(angle)',
      example: {
        title: '画正八边形',
        code: 'sides = 8\nangle = 360 // sides\nfor i in range(sides):\n    forward(50)\n    left(angle)',
        output: '画一个边长为50的正八边形。',
        explanation: '360除以8等于45度，每次左转45度，重复8次，形成正八边形。'
      },
      practice: [
        {
          question: '画正十边形每次转多少度？',
          answer: '36度（360度÷10=36度）'
        },
        {
          question: '如何画一个五角星？',
          answer: '每次转144度（180度-36度），重复5次'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '重复画图 - 循环绘图',
    emoji: '🔁',
    gradeLevel: '1-2',
    summary: '用循环简化重复的绘图命令',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '画正方形需要写很多重复的代码吗？不需要！用循环命令，一行代码就能让海龟重复做同样的事情！',
      concept: '用for循环可以让海龟重复执行绘图命令。这样代码更简洁，修改也更方便。',
      syntax: 'for i in range(次数):\n    要重复的命令',
      example: {
        title: '用循环画正方形',
        code: 'for i in range(4):\n    forward(100)\n    right(90)',
        output: '画一个边长为100的正方形。',
        explanation: 'range(4)表示重复4次。每次都执行forward(100)和right(90)，4次后画完正方形。'
      },
      practice: [
        {
          question: 'range(4) 表示重复几次？',
          answer: '重复4次'
        },
        {
          question: '画正方形需要转多少次？',
          answer: '4次'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的循环升级了！你可以用变量控制重复次数和距离，画出各种大小不同的图形！',
      concept: '用range()控制循环次数，用变量控制边长。这样一套代码可以画出各种大小的图形。',
      syntax: 'sides = 6\nsize = 80\nfor i in range(sides):\n    forward(size)\n    right(360/sides)',
      example: {
        title: '画可调节大小的图形',
        code: 'size = 60\nfor i in range(6):\n    forward(size)\n    right(60)',
        output: '画一个边长为60的正六边形。',
        explanation: '修改size的值就能改变六边形的大小，修改range(6)能改变边数。非常灵活！'
      },
      practice: [
        {
          question: '如何画出更大的六边形？',
          answer: '增加size的值，比如改成size=100'
        },
        {
          question: 'range(6) 改成 range(8) 会画出什么？',
          answer: '会画出正八边形'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '循环大师模式！你可以用嵌套循环画出复杂的图案，比如彩色螺旋、花朵等美丽图形！',
      concept: '嵌套循环是一个循环里包含另一个循环。可以画出螺旋、同心圆、花朵等复杂图案。',
      syntax: '# 嵌套循环\nfor i in range(外层次数):\n    for j in range(内层次数):\n        绘图命令',
      example: {
        title: '画螺旋图案',
        code: 'for i in range(36):\n    for j in range(4):\n        forward(50 + i*2)\n        right(90)\n    right(10)',
        output: '画一个逐渐扩大的螺旋方形图案。',
        explanation: '外层循环36次，每次内层画一个正方形。边长逐渐增加（50+i*2），每次整体转10度，形成螺旋效果。'
      },
      practice: [
        {
          question: '嵌套循环有几个循环？',
          answer: '有两个循环，一个外层一个内层'
        },
        {
          question: 'i*2 在循环中会怎么变化？',
          answer: 'i从0增加到35，所以i*2从0增加到70，边长逐渐变大'
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
    question: '执行下面的代码，海龟会画几条线？\n\n```python\nfor i in range(5):\n    forward(100)\n    right(72)\n```\n\nA. 4条\nB. 5条\nC. 6条\nD. 10条',
    options: [
      'A. 4条',
      'B. 5条',
      'C. 6条',
      'D. 10条'
    ],
    answer: 1, // B
    explanation: 'range(5)表示重复5次，每次画一条线（forward），所以共画5条线。\n\n数学知识：这是计数问题，range(5)执行5次。',
    hint: 'range(5) 表示重复 5 次'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '角度计算',
    question: '要画一个正方形，每次应该转多少度？\n\nA. 45度\nB. 60度\nC. 90度\nD. 120度',
    options: [
      'A. 45度',
      'B. 60度',
      'C. 90度',
      'D. 120度'
    ],
    answer: 2, // C
    explanation: '正方形有4条边，转一圈是360度，每次转360÷4=90度。\n\n数学知识：这是角度计算问题，360度除以边数得到每次转的角度。',
    hint: '一圈是 360 度，正方形有 4 条边'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '角度计算',
    question: '执行下面的代码，会画出什么图形？\n\n```python\nfor i in range(6):\n    forward(80)\n    right(60)\n```\n\nA. 正方形\nB. 正五边形\nC. 正六边形\nD. 正八边形',
    options: [
      'A. 正方形',
      'B. 正五边形',
      'C. 正六边形',
      'D. 正八边形'
    ],
    answer: 2, // C
    explanation: 'range(6)表示重复6次，每次转60度。\n\n6 × 60度 = 360度，正好一圈。\n\n6条边，每个角60度，这是正六边形。\n\n数学知识：360度÷6=60度，6条边就是正六边形。',
    hint: '6 次，每次 60 度，6 × 60 = 360 度'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '算式计算',
    question: '执行下面的代码，海龟一共移动了多少像素？\n\n```python\nfor i in range(4):\n    forward(50)\n    forward(30)\n```\n\nA. 80像素\nB. 200像素\nC. 320像素\nD. 400像素',
    options: [
      'A. 80像素',
      'B. 200像素',
      'C. 320像素',
      'D. 400像素'
    ],
    answer: 2, // C
    explanation: 'range(4)表示重复4次，每次执行：\n- forward(50)：移动50像素\n- forward(30)：移动30像素\n\n每次循环移动50+30=80像素\n4次循环共移动：4 × 80 = 320像素\n\n数学知识：这是累加计算问题，(50+30) × 4 = 320。',
    hint: '每次循环移动 50+30=80 像素，重复 4 次'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '变量计算',
    question: '执行下面的代码，会画多大的正方形？\n\n```python\nsize = 40\nsize = size + 20\nfor i in range(4):\n    forward(size)\n    right(90)\n```\n\nA. 边长40\nB. 边长60\nC. 边长80\nD. 边长100',
    options: [
      'A. 边长40',
      'B. 边长60',
      'C. 边长80',
      'D. 边长100'
    ],
    answer: 1, // B
    explanation: 'size的值变化：\n- size = 40\n- size = 40 + 20 = 60\n\n循环中使用的是更新后的size=60，所以画的是边长为60的正方形。\n\n数学知识：这是变量计算问题，size先赋值40，再增加20变成60。',
    hint: '先计算 size 的值：40 + 20 = ？'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '累加计算',
    question: '执行下面的代码，总共转了多少度？\n\n```python\nfor i in range(10):\n    forward(50)\n    right(36)\n```\n\nA. 180度\nB. 360度\nC. 540度\nD. 3600度',
    options: [
      'A. 180度',
      'B. 360度',
      'C. 540度',
      'D. 3600度'
    ],
    answer: 1, // B
    explanation: 'range(10)表示重复10次，每次转36度。\n\n总共转了：10 × 36度 = 360度\n\n正好转了一圈，回到原方向。\n\n数学知识：这是累乘计算问题，10 × 36 = 360度。',
    hint: '每次 36 度，重复 10 次：10 × 36 = ？'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L2-4',
  title: '海龟绘图',
  subtitle: '学会用海龟画各种图形',
  difficulty: '进阶',
  estimatedTime: '30-40分钟',
  learningGoals: [
    '掌握海龟移动命令（forward, backward）',
    '掌握转向命令（left, right）',
    '学会用循环简化绘图代码',
    '能够绘制正多边形等几何图形'
  ],
  prerequisites: [
    '掌握 print() 命令',
    '理解 for 循环的概念',
    '会使用变量',
    '了解基本的几何图形'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['turtle', 'move', 'turn', 'draw'],
  medium: ['forward', 'backward', 'direction', 'corner'],
  hard: ['polygon', 'triangle', 'rectangle', 'geometry']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'forward(100)',
    'backward(50)',
    'left(90)',
    'right(45)'
  ],
  medium: [
    'for i in range(4):\nforward(100)\nright(90)',
    'forward(80)\nright(90)\nforward(80)',
    'left(180)\nforward(50)',
    'for i in range(6):\nforward(50)\nleft(60)'
  ],
  hard: [
    'size = 80\nfor i in range(4):\nforward(size)\nright(90)',
    'sides = 6\nangle = 360 // sides\nfor i in range(sides):\nforward(50)\nright(angle)',
    'for i in range(36):\nfor j in range(4):\nforward(50)\nright(90)\nright(10)',
    'for i in range(5):\nforward(100)\nright(144)'
  ]
}

// 导出所有数据
export const L2_4_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L2_4_data
