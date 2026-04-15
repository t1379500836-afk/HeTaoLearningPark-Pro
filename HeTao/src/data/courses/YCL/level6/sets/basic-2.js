/**
 * YCL六级基础练习（二）
 *
 * 本套卷包含：单选题15题（每题2分，共30分）
 *             多选题5题（每题3分，共15分）
 *             编程题4题（共55分）
 * 总分：100分  时长：90分钟
 *
 * 编程题必考知识点覆盖：
 * - kp-6-4: 简单递推问题 (Q1)
 * - kp-6-5: 顺序模拟 (Q2)
 * - kp-6-6: 循环模拟 (Q3)
 * - kp-6-7: 带列表的模拟 (Q4)
 */

export const practiceSet = {
  meta: {
    id: 'level6-basic-2',
    level: 'level6',
    difficulty: 'basic',
    name: '六级基础练习（二）',
    description: '涵盖六级必考知识点的基础练习',
    duration: 90,
    totalScore: 100,
    createdAt: '2026-03-31',
    version: '2.0'
  },

  questions: [
    // ==================== 单选题（15题，每题2分，共30分）====================
    {
      id: 'q-6-2-single-1',
      type: 'single-choice',
      knowledgePoint: 'kp-6-1',
      score: 2,
      difficulty: 'easy',
      question: '下列哪个关键字用于定义函数？',
      code: null,
      options: [
        'function',
        'def',
        'func',
        'define'
      ],
      answer: 1,
      explanation: 'Python中使用def关键字来定义函数。'
    },
    {
      id: 'q-6-2-single-2',
      type: 'single-choice',
      knowledgePoint: 'kp-6-1',
      score: 2,
      difficulty: 'easy',
      question: '运行下列代码，输出结果是？',
      code: 'def greet():\n    print("你好")\n\ngreet()\ngreet()',
      options: [
        '你好',
        '你好\n你好',
        'greet\ngreet',
        '没有输出'
      ],
      answer: 1,
      explanation: '函数greet()被调用了两次，每次调用都会输出"你好"，共输出两行。'
    },
    {
      id: 'q-6-2-single-3',
      type: 'single-choice',
      knowledgePoint: 'kp-6-1',
      score: 2,
      difficulty: 'easy',
      question: '运行下列代码，输出结果是？',
      code: 'def add(a, b):\n    return a + b\n\nresult = add(3, 5)\nprint(result)',
      options: [
        'a + b',
        '35',
        '8',
        'None'
      ],
      answer: 2,
      explanation: '函数add(3, 5)返回3+5=8，赋值给result后输出8。'
    },
    {
      id: 'q-6-2-single-4',
      type: 'single-choice',
      knowledgePoint: 'kp-6-2',
      score: 2,
      difficulty: 'easy',
      question: '在PygameZero中，下列哪个变量用于设置窗口的宽度？',
      code: null,
      options: [
        'HEIGHT',
        'WIDTH',
        'SIZE',
        'WINDOW'
      ],
      answer: 1,
      explanation: 'WIDTH变量用于设置游戏窗口的宽度，HEIGHT变量用于设置高度。'
    },
    {
      id: 'q-6-2-single-5',
      type: 'single-choice',
      knowledgePoint: 'kp-6-2',
      score: 2,
      difficulty: 'easy',
      question: '运行下列代码，输出结果是？',
      code: 'HEIGHT = 600\nWIDTH = 800\nprint(WIDTH - HEIGHT)',
      options: [
        '200',
        '1400',
        '-200',
        '600'
      ],
      answer: 0,
      explanation: 'WIDTH=800，HEIGHT=600，WIDTH-HEIGHT=800-600=200。'
    },
    {
      id: 'q-6-2-single-6',
      type: 'single-choice',
      knowledgePoint: 'kp-6-3',
      score: 2,
      difficulty: 'medium',
      question: '在PygameZero中，下列哪个函数用于处理键盘按下事件？',
      code: null,
      options: [
        'on_mouse_down()',
        'on_key_down()',
        'on_key_press()',
        'keyboard_down()'
      ],
      answer: 1,
      explanation: 'on_key_down()函数在键盘按键被按下时自动调用。'
    },
    {
      id: 'q-6-2-single-7',
      type: 'single-choice',
      knowledgePoint: 'kp-6-3',
      score: 2,
      difficulty: 'medium',
      question: '想要在按下空格键时让角色跳跃，横线处应填写？',
      code: "def on_key_down(key):\n    if ______:\n        jump()",
      options: [
        "key == keys.SPACE",
        "key = keys.SPACE",
        "key == 'SPACE'",
        "key == space"
      ],
      answer: 0,
      explanation: "在PygameZero中，判断是否按下空格键使用key == keys.SPACE，keys是PygameZero提供的按键常量模块。"
    },
    {
      id: 'q-6-2-single-8',
      type: 'single-choice',
      knowledgePoint: 'kp-6-4',
      score: 2,
      difficulty: 'medium',
      question: '已知递推公式：f(n) = f(n-1) + 2，且f(1) = 1，则f(5)的值是？',
      code: null,
      options: [
        '7',
        '9',
        '11',
        '13'
      ],
      answer: 1,
      explanation: 'f(1)=1, f(2)=1+2=3, f(3)=3+2=5, f(4)=5+2=7, f(5)=7+2=9。'
    },
    {
      id: 'q-6-2-single-9',
      type: 'single-choice',
      knowledgePoint: 'kp-6-4',
      score: 2,
      difficulty: 'medium',
      question: '已知递推公式：f(n) = 2 * f(n-1)，且f(1) = 3，则f(4)的值是？',
      code: null,
      options: [
        '12',
        '24',
        '48',
        '9'
      ],
      answer: 1,
      explanation: 'f(1)=3, f(2)=2*3=6, f(3)=2*6=12, f(4)=2*12=24。'
    },
    {
      id: 'q-6-2-single-10',
      type: 'single-choice',
      knowledgePoint: 'kp-6-5',
      score: 2,
      difficulty: 'medium',
      question: '模拟算法的核心思想是？',
      code: null,
      options: [
        '使用数学公式直接求解',
        '按照问题描述逐步模拟过程得到结果',
        '使用递归函数求解',
        '使用二分法查找答案'
      ],
      answer: 1,
      explanation: '模拟算法的核心思想是按照问题描述，逐步模拟整个过程，最终得到结果。'
    },
    {
      id: 'q-6-2-single-11',
      type: 'single-choice',
      knowledgePoint: 'kp-6-5',
      score: 2,
      difficulty: 'hard',
      question: '模拟表达式 3 + 5 * 2 的计算过程，正确的结果是？',
      code: null,
      options: [
        '16',
        '13',
        '10',
        '11'
      ],
      answer: 1,
      explanation: '根据运算优先级，先算5*2=10，再算3+10=13。'
    },
    {
      id: 'q-6-2-single-12',
      type: 'single-choice',
      knowledgePoint: 'kp-6-6',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'n = 5\nresult = 1\nfor i in range(1, n + 1):\n    result = result * i\nprint(result)',
      options: [
        '15',
        '120',
        '60',
        '24'
      ],
      answer: 1,
      explanation: '这是计算5的阶乘：1*2*3*4*5=120。'
    },
    {
      id: 'q-6-2-single-13',
      type: 'single-choice',
      knowledgePoint: 'kp-6-7',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'nums = [1, 2, 3, 4, 5]\ntotal = 0\nfor n in nums:\n    if n % 2 == 0:\n        total = total + n\nprint(total)',
      options: [
        '15',
        '6',
        '9',
        '10'
      ],
      answer: 1,
      explanation: '列表中偶数是2和4，2+4=6。'
    },
    {
      id: 'q-6-2-single-14',
      type: 'single-choice',
      knowledgePoint: 'kp-6-8',
      score: 2,
      difficulty: 'hard',
      question: '斐波那契数列的前两项都是1，从第3项开始每项等于前两项之和。求第9项的值？',
      code: null,
      options: [
        '21',
        '34',
        '55',
        '89'
      ],
      answer: 1,
      explanation: '斐波那契数列：1,1,2,3,5,8,13,21,34，第9项是34。'
    },
    {
      id: 'q-6-2-single-15',
      type: 'single-choice',
      knowledgePoint: 'kp-6-6',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'count = 0\nfor i in range(10):\n    if i % 3 == 0:\n        count = count + 1\nprint(count)',
      options: [
        '3',
        '4',
        '5',
        '6'
      ],
      answer: 1,
      explanation: '在0-9中，能被3整除的数是0,3,6,9，共4个。'
    },

    // ==================== 多选题（5题，每题3分，共15分）====================
    {
      id: 'q-6-2-multi-1',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-1',
      score: 3,
      difficulty: 'easy',
      question: '【多选题】关于Python函数的定义，以下说法正确的有？',
      code: null,
      options: [
        '函数使用def关键字定义',
        '函数名后面必须有括号',
        '函数体需要缩进',
        '函数必须有return语句'
      ],
      answer: [0, 1, 2],
      partialAnswer: [0],
      explanation: '函数用def定义、函数名后有括号、函数体要缩进。函数不一定需要return语句。'
    },
    {
      id: 'q-6-2-multi-2',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-2',
      score: 3,
      difficulty: 'easy',
      question: '【多选题】在PygameZero中，以下关于Actor的描述正确的有？',
      code: null,
      options: [
        'Actor()用于创建游戏角色',
        '角色的x属性表示水平位置',
        '角色的y属性表示垂直位置',
        "角色.image可以修改角色的造型"
      ],
      answer: [0, 1, 2, 3],
      partialAnswer: [0, 1],
      explanation: 'Actor()创建角色，x是水平位置，y是垂直位置，image属性可以修改角色造型。'
    },
    {
      id: 'q-6-2-multi-3',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-3',
      score: 3,
      difficulty: 'medium',
      question: '【多选题】在PygameZero中，以下哪些是正确的事件处理函数？',
      code: null,
      options: [
        'on_mouse_down()',
        'on_key_down()',
        'on_mouse_move()',
        'on_key_up()'
      ],
      answer: [0, 1, 2, 3],
      partialAnswer: [0],
      explanation: '这四个都是PygameZero中正确的事件处理函数，分别处理鼠标按下、键盘按下、鼠标移动、键盘松开事件。'
    },
    {
      id: 'q-6-2-multi-4',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-4',
      score: 3,
      difficulty: 'medium',
      question: '【多选题】关于递推算法，以下说法正确的有？',
      code: null,
      options: [
        '递推需要有初始条件',
        '递推是从小到大依次计算',
        '斐波那契数列可以用递推求解',
        '递推就是递归'
      ],
      answer: [0, 1, 2],
      partialAnswer: [0],
      explanation: '递推需要初始条件、从小到大计算、斐波那契可用递推。但递推和递归是不同的概念。'
    },
    {
      id: 'q-6-2-multi-5',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-7',
      score: 3,
      difficulty: 'medium',
      question: '【多选题】下列哪些问题适合用模拟算法解决？',
      code: null,
      options: [
        '模拟银行排队叫号过程',
        '模拟电梯运行逻辑',
        '模拟游戏中的碰撞检测',
        '计算圆的面积'
      ],
      answer: [0, 1, 2],
      partialAnswer: [0],
      explanation: '模拟算法适合模拟过程类问题。排队叫号、电梯运行、碰撞检测都可以模拟。计算圆面积用数学公式更直接。'
    },

    // ==================== 编程题（4题，共55分）====================
    // Q1: 简单递推问题 (kp-6-4)
    {
      id: 'q-6-2-coding-1',
      type: 'coding',
      knowledgePoint: 'kp-6-4',
      score: 10,
      difficulty: 'easy',
      question: '使用递推计算阶乘。输入一个正整数n（1<=n<=10），输出n的阶乘。例如：输入5，输出120（因为5!=5×4×3×2×1=120）。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '5', expectedOutput: '120' },
        { input: '4', expectedOutput: '24' },
        { input: '1', expectedOutput: '1' }
      ],
      scoringRules: {
        fullScore: 10,
        partialScores: [
          { condition: '能正确获取输入', score: 3 },
          { condition: '能正确使用递推', score: 5 },
          { condition: '完全正确', score: 10 }
        ]
      },
      referenceAnswer: 'n = int(input())\nresult = 1\nfor i in range(1, n + 1):\n    result = result * i\nprint(result)',
      explanation: '使用循环递推计算阶乘，从1乘到n。这是简单递推问题。'
    },
    // Q2: 顺序模拟 (kp-6-5)
    {
      id: 'q-6-2-coding-2',
      type: 'coding',
      knowledgePoint: 'kp-6-5',
      score: 15,
      difficulty: 'medium',
      question: '模拟简单的计算器。输入两个整数a和b以及一个运算符op（+、-、*、/），根据运算符输出计算结果。如果是除法，输出整数部分（整除）。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '10\n+\n5', expectedOutput: '15' },
        { input: '10\n-\n3', expectedOutput: '7' },
        { input: '10\n*\n2', expectedOutput: '20' },
        { input: '10\n/\n3', expectedOutput: '3' }
      ],
      scoringRules: {
        fullScore: 15,
        partialScores: [
          { condition: '能正确获取输入', score: 4 },
          { condition: '能正确判断运算符', score: 5 },
          { condition: '完全正确', score: 15 }
        ]
      },
      referenceAnswer: 'a = int(input())\nop = input()\nb = int(input())\n\nif op == "+":\n    print(a + b)\nelif op == "-":\n    print(a - b)\nelif op == "*":\n    print(a * b)\nelif op == "/":\n    print(a // b)',
      explanation: '根据输入的运算符执行相应的运算，除法使用整除。这是顺序模拟，按步骤处理不同运算。'
    },
    // Q3: 循环模拟 (kp-6-6)
    {
      id: 'q-6-2-coding-3',
      type: 'coding',
      knowledgePoint: 'kp-6-6',
      score: 15,
      difficulty: 'medium',
      question: '模拟数字递减过程。输入一个正整数n，每次减半（取整），直到变为0。输出每次减半后的结果，每行一个数。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '10', expectedOutput: '5\n2\n1\n0' },
        { input: '8', expectedOutput: '4\n2\n1\n0' }
      ],
      scoringRules: {
        fullScore: 15,
        partialScores: [
          { condition: '能正确获取输入', score: 4 },
          { condition: '能正确使用循环模拟', score: 8 },
          { condition: '完全正确', score: 15 }
        ]
      },
      referenceAnswer: 'n = int(input())\nwhile n > 0:\n    n = n // 2\n    print(n)',
      explanation: '使用while循环模拟每次减半的过程，直到变为0。这是循环模拟问题。'
    },
    // Q4: 带列表的模拟 (kp-6-7)
    {
      id: 'q-6-2-coding-4',
      type: 'coding',
      knowledgePoint: 'kp-6-7',
      score: 15,
      difficulty: 'medium',
      question: '模拟列表操作。输入一个正整数n和n个整数存入列表，然后输入一个整数k，统计列表中有多少个元素大于k。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '5\n1 5 3 8 2\n3', expectedOutput: '2' },
        { input: '4\n10 20 5 15\n10', expectedOutput: '2' }
      ],
      scoringRules: {
        fullScore: 15,
        partialScores: [
          { condition: '能正确获取输入和创建列表', score: 5 },
          { condition: '能正确遍历和统计', score: 5 },
          { condition: '完全正确', score: 15 }
        ]
      },
      referenceAnswer: 'n = int(input())\nnums = list(map(int, input().split()))\nk = int(input())\n\ncount = 0\nfor num in nums:\n    if num > k:\n        count = count + 1\nprint(count)',
      explanation: '创建列表存储输入的数字，然后遍历列表统计大于k的元素个数。这是带列表的模拟。'
    }
  ],

  distribution: {
    byType: {
      'single-choice': { count: 15, totalScore: 30 },
      'multiple-choice': { count: 5, totalScore: 15 },
      'coding': { count: 4, totalScore: 55 }
    },
    byKnowledgePoint: {
      'kp-6-1': { count: 4, totalScore: 10 },
      'kp-6-2': { count: 3, totalScore: 8 },
      'kp-6-3': { count: 3, totalScore: 8 },
      'kp-6-4': { count: 4, totalScore: 18 },
      'kp-6-5': { count: 3, totalScore: 20 },
      'kp-6-6': { count: 4, totalScore: 20 },
      'kp-6-7': { count: 3, totalScore: 18 },
      'kp-6-8': { count: 1, totalScore: 2 }
    },
    byDifficulty: {
      'easy': 6,
      'medium': 9,
      'hard': 9
    }
  }
}

export default practiceSet
