/**
 * YCL六级基础练习（一）
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
    id: 'level6-basic-1',
    level: 'level6',
    difficulty: 'basic',
    name: '六级基础练习（一）',
    description: '涵盖六级必考知识点的基础练习',
    duration: 90,
    totalScore: 100,
    createdAt: '2026-03-28',
    version: '2.0'
  },

  questions: [
    // ==================== 单选题（15题，每题2分，共30分）====================
    {
      id: 'q-6-1-single-1',
      type: 'single-choice',
      knowledgePoint: 'kp-6-1',
      score: 2,
      difficulty: 'easy',
      question: '想要定义一个函数，函数名为 hi，功能是打印字符串 "Good Morning"，下列程序正确的是？',
      code: null,
      options: [
        'hi():\n    print("Good Morning")',
        'hi():\n    print(Good Morning)',
        'def hi():\n    print(Good Morning)',
        'def hi():\n    print("Good Morning")'
      ],
      answer: 3,
      explanation: '在Python中定义函数需用def关键字开头，函数名后接括号和冒号，函数体缩进；打印字符串需用引号包裹内容。'
    },
    {
      id: 'q-6-1-single-2',
      type: 'single-choice',
      knowledgePoint: 'kp-6-1',
      score: 2,
      difficulty: 'easy',
      question: '函数 a1 和 a2 的定义如下，执行以下程序，正确的输出结果是？',
      code: 'def a1():\n    print("sunny")\n\ndef a2():\n    print("windy")\n\na1()\na2()',
      options: [
        'sunny\nwindy',
        'windy\nwindy',
        'sunny\nsunny',
        'windy\nsunny'
      ],
      answer: 0,
      explanation: "程序先定义函数a1（执行时打印'sunny'）和a2（执行时打印'windy'），随后依次调用a1()和a2()，因此先输出'sunny'，再输出'windy'。"
    },
    {
      id: 'q-6-1-single-3',
      type: 'single-choice',
      knowledgePoint: 'kp-6-1',
      score: 2,
      difficulty: 'easy',
      question: '运行下列代码，输出结果是？',
      code: 'def add(x, y):\n    print(x + y)\n\nadd(10, 20)',
      options: [
        'x + y',
        '10 + 20',
        '30',
        '1020'
      ],
      answer: 2,
      explanation: '函数add(10, 20)调用时执行print(x+y)，计算10+20得30并输出。'
    },
    {
      id: 'q-6-1-single-4',
      type: 'single-choice',
      knowledgePoint: 'kp-6-2',
      score: 2,
      difficulty: 'easy',
      question: '想要创建一个高为700宽为345的窗口，下列代码正确的是？',
      code: null,
      options: [
        'HEIGHT = 345\nWIDTH = 700',
        'HEIGHT = 700\nWIDTH = 345',
        'height = 345\nwidth = 700',
        'height = 700\nwidth = 345'
      ],
      answer: 1,
      explanation: '创建高700、宽345的窗口，需正确定义高度（HEIGHT）为700、宽度（WIDTH）为345。'
    },
    {
      id: 'q-6-1-single-5',
      type: 'single-choice',
      knowledgePoint: 'kp-6-2',
      score: 2,
      difficulty: 'easy',
      question: '在 PygameZero 中，关于下列代码说法正确的是？',
      code: 'HEIGHT = 100\nWIDTH = 70',
      options: [
        '为游戏窗口设置高度70，宽度100',
        '为游戏窗口设置高度100，宽度70',
        '为游戏角色设置高度70，宽度100',
        '为游戏角色设置高度100，宽度70'
      ],
      answer: 1,
      explanation: '在PygameZero中，HEIGHT变量用于设置游戏窗口的高度，WIDTH变量用于设置游戏窗口的宽度。'
    },
    {
      id: 'q-6-1-single-6',
      type: 'single-choice',
      knowledgePoint: 'kp-6-3',
      score: 2,
      difficulty: 'medium',
      question: "角色 animal 的初始造型是 '熊猫'，想要换成 '老鹰'，应该在横线处填写的代码是？",
      code: "animal = Actor('熊猫')\n________________",
      options: [
        'animal = 老鹰',
        "animal = '老鹰'",
        'animal.image = 老鹰',
        "animal.image = '老鹰'"
      ],
      answer: 3,
      explanation: "在使用Actor类创建角色时，角色的图像属性通过image来访问和修改。需要给animal的image属性赋值正确的图像名称字符串，即animal.image = '老鹰'。"
    },
    {
      id: 'q-6-1-single-7',
      type: 'single-choice',
      knowledgePoint: 'kp-6-4',
      score: 2,
      difficulty: 'medium',
      question: '斐波那契数列：1, 1, 2, 3, 5, 8, ?, 21...，请问第7个数是多少？',
      code: null,
      options: [
        '8',
        '13',
        '21',
        '34'
      ],
      answer: 1,
      explanation: '斐波那契数列的规律是：每个数等于前两个数之和。1, 1, 2, 3, 5, 8, 13, 21，第7个数是13。'
    },
    {
      id: 'q-6-1-single-8',
      type: 'single-choice',
      knowledgePoint: 'kp-6-4',
      score: 2,
      difficulty: 'medium',
      question: '已知递推公式：f(n) = f(n-1) + f(n-2)，且 f(1) = 1，f(2) = 1，则 f(6) 的值是？',
      code: null,
      options: [
        '5',
        '8',
        '13',
        '21'
      ],
      answer: 1,
      explanation: 'f(1)=1, f(2)=1, f(3)=2, f(4)=3, f(5)=5, f(6)=8。'
    },
    {
      id: 'q-6-1-single-9',
      type: 'single-choice',
      knowledgePoint: 'kp-6-5',
      score: 2,
      difficulty: 'medium',
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
      id: 'q-6-1-single-10',
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
      explanation: '这是计算5的阶乘：1*2*3*4*5=120。使用循环模拟阶乘计算。'
    },
    {
      id: 'q-6-1-single-11',
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
    {
      id: 'q-6-1-single-12',
      type: 'single-choice',
      knowledgePoint: 'kp-6-7',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'nums = [5, 2, 8, 1, 9]\nnew_nums = []\nfor n in nums:\n    if n > 3:\n        new_nums.append(n * 2)\nprint(sum(new_nums))',
      options: [
        '10',
        '24',
        '44',
        '25'
      ],
      answer: 2,
      explanation: '遍历nums，大于3的数是5,8,9，乘2后是10,16,18，sum=44。这是带列表的模拟。'
    },
    {
      id: 'q-6-1-single-13',
      type: 'single-choice',
      knowledgePoint: 'kp-6-7',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'nums = [3, 1, 4, 1, 5]\ncount = 0\nfor n in nums:\n    if n > 2:\n        count = count + 1\nprint(count)',
      options: [
        '2',
        '3',
        '4',
        '5'
      ],
      answer: 1,
      explanation: '遍历列表，大于2的数是3,4,5，共3个。这是列表模拟统计。'
    },
    {
      id: 'q-6-1-single-14',
      type: 'single-choice',
      knowledgePoint: 'kp-6-8',
      score: 2,
      difficulty: 'hard',
      question: '斐波那契数列的前两项都是1，从第3项开始每项等于前两项之和。求第10项的值？',
      code: null,
      options: [
        '34',
        '55',
        '89',
        '144'
      ],
      answer: 1,
      explanation: '斐波那契数列：1,1,2,3,5,8,13,21,34,55，第10项是55。'
    },
    {
      id: 'q-6-1-single-15',
      type: 'single-choice',
      knowledgePoint: 'kp-6-3',
      score: 2,
      difficulty: 'medium',
      question: '想要将角色 worker 的x坐标设为35，y坐标设为108，下列代码可以实现这一效果的是？',
      code: null,
      options: [
        'worker.x = 108\nworker.y = 35',
        'worker.x = 35\nworker.y = 108',
        'worker = (108, 35)',
        'worker = (35, 108)'
      ],
      answer: 1,
      explanation: '要将worker的x坐标设为35、y坐标设为108，需分别给worker的x、y属性赋值。'
    },

    // ==================== 多选题（5题，每题3分，共15分）====================
    {
      id: 'q-6-1-multi-1',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-2',
      score: 3,
      difficulty: 'easy',
      question: '【多选题】以下关于 PygameZero 的描述，正确的是？',
      code: null,
      options: [
        '变量WIDTH可以表示窗口的高度',
        '变量WIDTH可以表示窗口的宽度',
        'Actor()函数可以创建角色',
        '导入库的语句是import pgzrun'
      ],
      answer: [1, 2, 3],
      partialAnswer: [1],
      explanation: '在PygameZero中，变量WIDTH表示窗口宽度（B正确）；Actor()函数的功能是创建角色（C正确）；HEIGHT表示窗口高度（A错误）；导入库的语句是import pgzrun（D正确）。'
    },
    {
      id: 'q-6-1-multi-2',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-2',
      score: 3,
      difficulty: 'easy',
      question: '【多选题】在 PygameZero 中，下面哪些选项的代码，可以让角色 cup 向右移动20像素？',
      code: null,
      options: [
        'cup.x += 20',
        'cup.x += 10\ncup.x += 10',
        'cup.x -= 20',
        'cup.x -= 10\ncup.x -= 10'
      ],
      answer: [0, 1],
      partialAnswer: [0],
      explanation: '在PygameZero中，角色的x坐标控制水平位置，x值增加表示向右移动。cup.x += 20直接使x坐标增加20；cup.x += 10执行两次也能向右移动20像素。'
    },
    {
      id: 'q-6-1-multi-3',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-1',
      score: 3,
      difficulty: 'medium',
      question: '【多选题】关于Python函数的描述，正确的有？',
      code: null,
      options: [
        '函数使用def关键字定义',
        '函数可以有多个参数',
        '函数必须要有return语句',
        '函数名后面必须有括号'
      ],
      answer: [0, 1, 3],
      partialAnswer: [0],
      explanation: '函数使用def关键字定义（A正确）；函数可以有多个参数（B正确）；函数不一定需要return语句（C错误）；函数名后面必须有括号（D正确）。'
    },
    {
      id: 'q-6-1-multi-4',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-4',
      score: 3,
      difficulty: 'medium',
      question: '【多选题】关于递推算法的说法，正确的有？',
      code: null,
      options: [
        '递推需要有初始条件',
        '递推通常用循环实现',
        '斐波那契数列可以用递推求解',
        '递推是从大到小依次计算'
      ],
      answer: [0, 1, 2],
      partialAnswer: [0],
      explanation: '递推需要初始条件（A正确）；递推通常用for或while循环实现（B正确）；斐波那契数列是经典递推问题（C正确）；递推是从小到大依次计算（D错误）。'
    },
    {
      id: 'q-6-1-multi-5',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-5',
      score: 3,
      difficulty: 'medium',
      question: '【多选题】下列哪些情况适合使用模拟算法？',
      code: null,
      options: [
        '模拟游戏中的角色移动',
        '计算圆的面积',
        '模拟银行排队叫号',
        '模拟电梯运行'
      ],
      answer: [0, 2, 3],
      partialAnswer: [0],
      explanation: '模拟算法适合模拟现实生活中的过程，如游戏角色移动（A）、银行排队（C）、电梯运行（D）。计算圆的面积（B）应该使用数学公式。'
    },

    // ==================== 编程题（4题，共55分）====================
    // Q1: 简单递推问题 (kp-6-4)
    {
      id: 'q-6-1-coding-1',
      type: 'coding',
      knowledgePoint: 'kp-6-4',
      score: 10,
      difficulty: 'easy',
      question: '使用递推计算斐波那契数列的第n项。输入一个正整数n（1<=n<=20），输出斐波那契数列的第n项。斐波那契数列：1, 1, 2, 3, 5, 8, 13...',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '1', expectedOutput: '1' },
        { input: '5', expectedOutput: '5' },
        { input: '7', expectedOutput: '13' }
      ],
      scoringRules: {
        fullScore: 10,
        partialScores: [
          { condition: '能正确获取输入', score: 3 },
          { condition: '能正确使用递推', score: 5 },
          { condition: '完全正确', score: 10 }
        ]
      },
      referenceAnswer: 'n = int(input())\nif n <= 2:\n    print(1)\nelse:\n    a = 1\n    b = 1\n    for i in range(3, n + 1):\n        c = a + b\n        a = b\n        b = c\n    print(b)',
      explanation: '使用递推方式计算斐波那契数列，从第3项开始，每项等于前两项之和。这是简单递推问题。'
    },
    // Q2: 顺序模拟 (kp-6-5)
    {
      id: 'q-6-1-coding-2',
      type: 'coding',
      knowledgePoint: 'kp-6-5',
      score: 15,
      difficulty: 'medium',
      question: '班级采购文具，预算为P元。先买了20本笔记本，每本8元；又买了Q支笔，每支3元。请编写程序，输入P和Q，输出剩余的钱。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '200\n5', expectedOutput: '25' },
        { input: '300\n10', expectedOutput: '110' }
      ],
      scoringRules: {
        fullScore: 15,
        partialScores: [
          { condition: '能正确获取两个输入', score: 5 },
          { condition: '能正确模拟花费过程', score: 10 },
          { condition: '完全正确', score: 15 }
        ]
      },
      referenceAnswer: 'p = int(input())\nq = int(input())\np = p - 8 * 20\np = p - 3 * q\nprint(p)',
      explanation: '先算笔记本花费8*20=160元，再算笔的花费3*q元，从预算P中逐步减去。这是顺序模拟，按步骤模拟计算过程。'
    },
    // Q3: 循环模拟 (kp-6-6)
    {
      id: 'q-6-1-coding-3',
      type: 'coding',
      knowledgePoint: 'kp-6-6',
      score: 15,
      difficulty: 'medium',
      question: '模拟倒计时。输入一个正整数n（表示秒数），从n开始倒计时到1，每秒输出一个数字（不包含0）。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '5', expectedOutput: '5\n4\n3\n2\n1' },
        { input: '3', expectedOutput: '3\n2\n1' }
      ],
      scoringRules: {
        fullScore: 15,
        partialScores: [
          { condition: '能正确获取输入', score: 4 },
          { condition: '能正确使用循环倒计时', score: 8 },
          { condition: '完全正确', score: 15 }
        ]
      },
      referenceAnswer: 'n = int(input())\nwhile n >= 1:\n    print(n)\n    n = n - 1',
      explanation: '使用while循环从n倒数到1，每次输出后减1。这是循环模拟问题。'
    },
    // Q4: 带列表的模拟 (kp-6-7)
    {
      id: 'q-6-1-coding-4',
      type: 'coding',
      knowledgePoint: 'kp-6-7',
      score: 15,
      difficulty: 'medium',
      question: '模拟列表筛选。输入一个正整数n和n个整数存入列表，统计列表中有多少个偶数。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '5\n5 2 8 1 9', expectedOutput: '2' },
        { input: '4\n3 1 4 6', expectedOutput: '2' }
      ],
      scoringRules: {
        fullScore: 15,
        partialScores: [
          { condition: '能正确获取输入', score: 5 },
          { condition: '能正确遍历列表', score: 5 },
          { condition: '完全正确', score: 15 }
        ]
      },
      referenceAnswer: 'n = int(input())\nnums = list(map(int, input().split()))\ncount = 0\nfor num in nums:\n    if num % 2 == 0:\n        count = count + 1\nprint(count)',
      explanation: '遍历列表，用取余运算判断偶数，统计个数。这是带列表的模拟。'
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
      'kp-6-2': { count: 4, totalScore: 10 },
      'kp-6-3': { count: 2, totalScore: 4 },
      'kp-6-4': { count: 4, totalScore: 18 },
      'kp-6-5': { count: 3, totalScore: 20 },
      'kp-6-6': { count: 3, totalScore: 19 },
      'kp-6-7': { count: 3, totalScore: 19 },
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
