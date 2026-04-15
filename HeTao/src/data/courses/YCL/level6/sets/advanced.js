/**
 * YCL六级进阶练习
 *
 * 本套卷包含：单选题15题（每题2分，共30分）
 *             多选题5题（每题3分，共15分）
 *             编程题4题（共55分）
 * 总分：100分  时长：90分钟
 * 难度：进阶（略微提升难度，增加综合题）
 *
 * 编程题必考知识点覆盖：
 * - kp-6-4: 简单递推问题 (Q1)
 * - kp-6-5: 顺序模拟 (Q2)
 * - kp-6-6: 循环模拟 (Q3)
 * - kp-6-7: 带列表的模拟 (Q4)
 */

export const practiceSet = {
  meta: {
    id: 'level6-advanced',
    level: 'level6',
    difficulty: 'advanced',
    name: '六级进阶练习',
    description: '六级进阶练习，增加综合题目',
    duration: 90,
    totalScore: 100,
    createdAt: '2026-03-31',
    version: '2.0'
  },

  questions: [
    // ==================== 单选题（15题，每题2分，共30分）====================
    {
      id: 'q-6-adv-single-1',
      type: 'single-choice',
      knowledgePoint: 'kp-6-1',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，输出结果是？',
      code: 'def calculate(x, y, z):\n    return x + y * z\n\nprint(calculate(2, 3, 4))',
      options: [
        '24',
        '14',
        '9',
        '20'
      ],
      answer: 1,
      explanation: 'calculate(2,3,4)返回2+3*4=2+12=14。'
    },
    {
      id: 'q-6-adv-single-2',
      type: 'single-choice',
      knowledgePoint: 'kp-6-1',
      score: 2,
      difficulty: 'medium',
      question: '下列代码的输出结果是？',
      code: 'def power(base, exp):\n    result = 1\n    for i in range(exp):\n        result = result * base\n    return result\n\nprint(power(2, 3))',
      options: [
        '6',
        '8',
        '9',
        '5'
      ],
      answer: 1,
      explanation: 'power(2,3)计算2的3次方，2*2*2=8。'
    },
    {
      id: 'q-6-adv-single-3',
      type: 'single-choice',
      knowledgePoint: 'kp-6-2',
      score: 2,
      difficulty: 'medium',
      question: '在PygameZero中，想要让角色每帧向左移动5像素，应该在哪个函数中编写移动代码？',
      code: null,
      options: [
        'on_key_down()',
        'update()',
        'draw()',
        'on_mouse_down()'
      ],
      answer: 1,
      explanation: 'update()函数每帧自动调用一次，适合放角色移动等持续更新的逻辑。'
    },
    {
      id: 'q-6-adv-single-4',
      type: 'single-choice',
      knowledgePoint: 'kp-6-3',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，当同时按下W和A键时，角色会？',
      code: 'def update():\n    if keyboard.w:\n        player.y = player.y - 5\n    if keyboard.a:\n        player.x = player.x - 5',
      options: [
        '只向上移动',
        '只向左移动',
        '向左上方移动',
        '不移动'
      ],
      answer: 2,
      explanation: '两个if条件独立判断，同时按W和A时，x和y都会改变，角色向左上方移动。'
    },
    {
      id: 'q-6-adv-single-5',
      type: 'single-choice',
      knowledgePoint: 'kp-6-4',
      score: 2,
      difficulty: 'medium',
      question: '已知递推公式 f(n) = 2 * f(n-1) + 1，且 f(1) = 1，则 f(4) = ?',
      code: null,
      options: [
        '7',
        '15',
        '31',
        '63'
      ],
      answer: 1,
      explanation: 'f(1)=1, f(2)=3, f(3)=7, f(4)=15。'
    },
    {
      id: 'q-6-adv-single-6',
      type: 'single-choice',
      knowledgePoint: 'kp-6-4',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'def fib(n):\n    if n <= 2:\n        return 1\n    a = 1\n    b = 1\n    for i in range(n - 2):\n        c = a + b\n        a = b\n        b = c\n    return b\n\nprint(fib(6))',
      options: [
        '5',
        '8',
        '13',
        '21'
      ],
      answer: 1,
      explanation: '这是用递推实现的斐波那契数列，fib(6)返回第6个斐波那契数：1,1,2,3,5,8，答案是8。'
    },
    {
      id: 'q-6-adv-single-7',
      type: 'single-choice',
      knowledgePoint: 'kp-6-5',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 's = "5321"\nresult = 0\nfor c in s:\n    result = result * 10 + int(c)\nprint(result)',
      options: [
        '"5321"',
        '5321',
        '11',
        '5'
      ],
      answer: 1,
      explanation: '模拟将字符串转为数字的过程：0*10+5=5, 5*10+3=53, 53*10+2=532, 532*10+1=5321。'
    },
    {
      id: 'q-6-adv-single-8',
      type: 'single-choice',
      knowledgePoint: 'kp-6-6',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'n = 100\ncount = 0\nwhile n > 0:\n    if n % 2 == 1:\n        count = count + 1\n    n = n // 2\nprint(count)',
      options: [
        '2',
        '3',
        '4',
        '50'
      ],
      answer: 1,
      explanation: '统计100二进制中1的个数：100=1100100（二进制），有3个1。'
    },
    {
      id: 'q-6-adv-single-9',
      type: 'single-choice',
      knowledgePoint: 'kp-6-7',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'data = [3, 1, 4, 1, 5, 9, 2, 6]\nfiltered = [x for x in data if x > 3]\nprint(len(filtered))',
      options: [
        '3',
        '4',
        '5',
        '6'
      ],
      answer: 1,
      explanation: 'data中大于3的数是4,5,9,6，共4个。'
    },
    {
      id: 'q-6-adv-single-10',
      type: 'single-choice',
      knowledgePoint: 'kp-6-8',
      score: 2,
      difficulty: 'hard',
      question: '斐波那契数列中，连续两项的比值（后项/前项）趋近于哪个常数？',
      code: null,
      options: [
        '1',
        '1.5',
        '1.618（黄金比例）',
        '2'
      ],
      answer: 2,
      explanation: '斐波那契数列相邻项比值趋近黄金比例φ≈1.618。'
    },
    {
      id: 'q-6-adv-single-11',
      type: 'single-choice',
      knowledgePoint: 'kp-6-5',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'result = 0\nfor i in range(5):\n    result = result + i * 2\nprint(result)',
      options: [
        '10',
        '15',
        '20',
        '8'
      ],
      answer: 2,
      explanation: 'i从0到4，i*2分别是0,2,4,6,8，sum=0+2+4+6+8=20。'
    },
    {
      id: 'q-6-adv-single-12',
      type: 'single-choice',
      knowledgePoint: 'kp-6-6',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'def simulate(n):\n    steps = 0\n    while n != 1:\n        if n % 2 == 0:\n            n = n // 2\n        else:\n            n = n * 3 + 1\n        steps = steps + 1\n    return steps\n\nprint(simulate(6))',
      options: [
        '6',
        '7',
        '8',
        '9'
      ],
      answer: 2,
      explanation: '科拉兹猜想模拟：6→3→10→5→16→8→4→2→1，共8步。'
    },
    {
      id: 'q-6-adv-single-13',
      type: 'single-choice',
      knowledgePoint: 'kp-6-7',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'data = [5, 3, 8, 6, 2]\nresult = []\nfor x in data:\n    if x > 4:\n        result.append(x * 2)\n    else:\n        result.append(x)\nprint(result)',
      options: [
        '[5, 3, 8, 6, 2]',
        '[10, 6, 16, 12, 4]',
        '[10, 3, 16, 12, 2]',
        '[5, 6, 8, 12, 2]'
      ],
      answer: 2,
      explanation: '遍历列表，大于4的元素乘2，否则保持原样：5*2=10, 3, 8*2=16, 6*2=12, 2。'
    },
    {
      id: 'q-6-adv-single-14',
      type: 'single-choice',
      knowledgePoint: 'kp-6-4',
      score: 2,
      difficulty: 'hard',
      question: '已知数列{a_n}满足a_1=1, a_n = a_{n-1} + n，则a_10的值是？',
      code: null,
      options: [
        '45',
        '55',
        '50',
        '36'
      ],
      answer: 1,
      explanation: 'a_n = 1+2+3+...+n = n(n+1)/2，a_10 = 10*11/2 = 55。'
    },
    {
      id: 'q-6-adv-single-15',
      type: 'single-choice',
      knowledgePoint: 'kp-6-8',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'def fib_sum(n):\n    a = 1\n    b = 1\n    total = 0\n    for i in range(n):\n        total = total + a\n        c = a + b\n        a = b\n        b = c\n    return total\n\nprint(fib_sum(5))',
      options: [
        '8',
        '12',
        '13',
        '7'
      ],
      answer: 1,
      explanation: '前5个斐波那契数是1,1,2,3,5，它们的和是12。'
    },

    // ==================== 多选题（5题，每题3分，共15分）====================
    {
      id: 'q-6-adv-multi-1',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-1',
      score: 3,
      difficulty: 'medium',
      question: '【多选题】关于Python函数，以下说法正确的有？',
      code: null,
      options: [
        '函数使用def关键字定义',
        '函数可以有多个参数',
        '函数内部可以使用print()输出内容',
        '函数定义后不会自动执行，需要调用才会运行'
      ],
      answer: [0, 1, 2, 3],
      partialAnswer: [0],
      explanation: '函数用def定义、可以有多个参数、内部可以print输出、定义后需调用才运行，四个说法都正确。'
    },
    {
      id: 'q-6-adv-multi-2',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-2',
      score: 3,
      difficulty: 'medium',
      question: '【多选题】在PygameZero中，以下哪些是正确的？',
      code: null,
      options: [
        'draw()函数用于绘制游戏画面',
        'update()函数用于更新游戏状态',
        '角色.colliderect()用于检测碰撞',
        '游戏窗口左上角坐标是(0,0)'
      ],
      answer: [0, 1, 2, 3],
      partialAnswer: [0, 1],
      explanation: '这四个说法都正确，是PygameZero的核心概念。'
    },
    {
      id: 'q-6-adv-multi-3',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-4',
      score: 3,
      difficulty: 'hard',
      question: '【多选题】关于递推算法，以下说法正确的有？',
      code: null,
      options: [
        '递推通过循环实现',
        '递推需要初始条件',
        '递推从已知条件逐步推导未知值',
        '斐波那契数列可以用递推求解'
      ],
      answer: [0, 1, 2, 3],
      partialAnswer: [0, 1],
      explanation: '递推用循环实现、需要初始条件、从已知推导未知，斐波那契数列是经典递推问题。'
    },
    {
      id: 'q-6-adv-multi-4',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-5',
      score: 3,
      difficulty: 'hard',
      question: '【多选题】模拟表达式 (2 + 3) * 4 - 6 / 2 的计算，以下哪些是正确的步骤？',
      code: null,
      options: [
        '先计算 2 + 3 = 5',
        '然后计算 5 * 4 = 20',
        '然后计算 6 / 2 = 3',
        '最后计算 20 - 3 = 17'
      ],
      answer: [0, 1, 2, 3],
      partialAnswer: [0],
      explanation: '按优先级：括号内2+3=5，然后5*4=20，同时6/2=3，最后20-3=17。'
    },
    {
      id: 'q-6-adv-multi-5',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-7',
      score: 3,
      difficulty: 'hard',
      question: '【多选题】以下哪些是对列表进行模拟的常见操作？',
      code: null,
      options: [
        '遍历列表中所有元素',
        '根据条件筛选元素',
        '对列表元素进行排序',
        '统计满足条件的元素个数'
      ],
      answer: [0, 1, 2, 3],
      partialAnswer: [0, 1],
      explanation: '这四个都是常见的列表模拟操作。'
    },

    // ==================== 编程题（4题，共55分）====================
    // Q1: 简单递推问题 (kp-6-4)
    {
      id: 'q-6-adv-coding-1',
      type: 'coding',
      knowledgePoint: 'kp-6-4',
      score: 10,
      difficulty: 'medium',
      question: '使用递推计算泰波那契数列的第n项。泰波那契数列定义：每项等于前三项之和，前三项都是1。输入正整数n（3<=n<=15），输出第n项的值。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '4', expectedOutput: '3' },
        { input: '5', expectedOutput: '5' },
        { input: '7', expectedOutput: '17' }
      ],
      scoringRules: {
        fullScore: 10,
        partialScores: [
          { condition: '能正确获取输入', score: 3 },
          { condition: '能正确使用递推', score: 5 },
          { condition: '完全正确', score: 10 }
        ]
      },
      referenceAnswer: 'n = int(input())\nif n <= 3:\n    print(1)\nelse:\n    a = 1\n    b = 1\n    c = 1\n    for i in range(4, n + 1):\n        d = a + b + c\n        a = b\n        b = c\n        c = d\n    print(c)',
      explanation: '泰波那契数列递推：每项等于前三项之和，前三项为1,1,1。这是简单递推问题。'
    },
    // Q2: 顺序模拟 (kp-6-5)
    {
      id: 'q-6-adv-coding-2',
      type: 'coding',
      knowledgePoint: 'kp-6-5',
      score: 15,
      difficulty: 'medium',
      question: '模拟商店收银系统。顾客购买了3种商品：第一种买了a件，每件x元；第二种买了b件，每件y元；第三种买了c件，每件z元。商店会员可享受9折优惠。输入a, x, b, y, c, z和是否会员（1表示是，0表示否），输出应付金额（取整）。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '2 10\n3 5\n1 20\n1', expectedOutput: '49' },
        { input: '1 100\n2 50\n1 30\n0', expectedOutput: '230' }
      ],
      scoringRules: {
        fullScore: 15,
        partialScores: [
          { condition: '能正确获取输入', score: 5 },
          { condition: '能正确计算商品总价', score: 5 },
          { condition: '完全正确', score: 15 }
        ]
      },
      referenceAnswer: 'a, x = map(int, input().split())\nb, y = map(int, input().split())\nc, z = map(int, input().split())\nis_member = int(input())\n\ntotal = a * x + b * y + c * z\nif is_member == 1:\n    total = int(total * 0.9)\nprint(total)',
      explanation: '按顺序计算每种商品花费，再判断是否打折。这是顺序模拟问题。'
    },
    // Q3: 循环模拟 (kp-6-6)
    {
      id: 'q-6-adv-coding-3',
      type: 'coding',
      knowledgePoint: 'kp-6-6',
      score: 15,
      difficulty: 'medium',
      question: '模拟简单的猜数字游戏。系统预设数字为42，玩家每次输入一个猜测，程序提示"大了"或"小了"直到猜对。输入若干个猜测数字（每行一个），直到猜中42为止。输出所有提示（每行一个），最后输出"恭喜猜对！"。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '50\n30\n42', expectedOutput: '大了\n小了\n恭喜猜对！' },
        { input: '42', expectedOutput: '恭喜猜对！' }
      ],
      scoringRules: {
        fullScore: 15,
        partialScores: [
          { condition: '能正确循环获取输入', score: 5 },
          { condition: '能正确比较和提示', score: 5 },
          { condition: '完全正确', score: 15 }
        ]
      },
      referenceAnswer: 'target = 42\nwhile True:\n    guess = int(input())\n    if guess > target:\n        print("大了")\n    elif guess < target:\n        print("小了")\n    else:\n        print("恭喜猜对！")\n        break',
      explanation: '循环获取猜测，与目标比较给出提示，猜对后退出。这是循环模拟问题。'
    },
    // Q4: 带列表的模拟 (kp-6-7)
    {
      id: 'q-6-adv-coding-4',
      type: 'coding',
      knowledgePoint: 'kp-6-7',
      score: 15,
      difficulty: 'hard',
      question: '模拟简单的成绩管理系统。输入一个正整数n和n个学生的成绩（0-100的整数），然后输入一个操作：1表示计算平均分，2表示找出最高分，3表示统计及格人数（>=60分）。根据操作输出对应结果。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '5\n85 90 72 58 95\n1', expectedOutput: '80' },
        { input: '5\n85 90 72 58 95\n2', expectedOutput: '95' },
        { input: '5\n85 90 72 58 95\n3', expectedOutput: '4' }
      ],
      scoringRules: {
        fullScore: 15,
        partialScores: [
          { condition: '能正确获取输入', score: 5 },
          { condition: '能正确实现一种操作', score: 5 },
          { condition: '完全正确', score: 15 }
        ]
      },
      referenceAnswer: 'n = int(input())\nscores = list(map(int, input().split()))\nop = int(input())\n\nif op == 1:\n    print(sum(scores) // n)\nelif op == 2:\n    print(max(scores))\nelif op == 3:\n    count = 0\n    for s in scores:\n        if s >= 60:\n            count = count + 1\n    print(count)',
      explanation: '根据操作类型执行不同的统计功能。这是带列表的模拟问题。'
    }
  ],

  distribution: {
    byType: {
      'single-choice': { count: 15, totalScore: 30 },
      'multiple-choice': { count: 5, totalScore: 15 },
      'coding': { count: 4, totalScore: 55 }
    },
    byKnowledgePoint: {
      'kp-6-1': { count: 3, totalScore: 8 },
      'kp-6-2': { count: 3, totalScore: 8 },
      'kp-6-3': { count: 2, totalScore: 4 },
      'kp-6-4': { count: 4, totalScore: 17 },
      'kp-6-5': { count: 4, totalScore: 21 },
      'kp-6-6': { count: 4, totalScore: 20 },
      'kp-6-7': { count: 4, totalScore: 20 },
      'kp-6-8': { count: 2, totalScore: 5 }
    },
    byDifficulty: {
      'medium': 10,
      'hard': 14
    }
  }
}

export default practiceSet
