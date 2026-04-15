/**
 * YCL六级提升练习
 *
 * 本套卷包含：单选题15题（每题2分，共30分）
 *             多选题5题（每题3分，共15分）
 *             编程题4题（共55分）
 * 总分：100分  时长：90分钟
 * 难度：提升（较高难度，多知识点综合，接近考试上限）
 *
 * 编程题必考知识点覆盖：
 * - kp-6-4: 简单递推问题 (Q1)
 * - kp-6-6: 循环模拟 (Q2)
 * - kp-6-5: 顺序模拟 (Q3)
 * - kp-6-7: 带列表的模拟 (Q4)
 */

export const practiceSet = {
  meta: {
    id: 'level6-expert',
    level: 'level6',
    difficulty: 'expert',
    name: '六级提升练习',
    description: '六级提升练习，多知识点综合，接近考试上限',
    duration: 90,
    totalScore: 100,
    createdAt: '2026-03-31',
    version: '2.0'
  },

  questions: [
    // ==================== 单选题（15题，每题2分，共30分）====================
    {
      id: 'q-6-exp-single-1',
      type: 'single-choice',
      knowledgePoint: 'kp-6-1',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'def process(a, b):\n    while b != 0:\n        r = a % b\n        a = b\n        b = r\n    return a\n\nprint(process(48, 18))',
      options: [
        '0',
        '6',
        '18',
        '48'
      ],
      answer: 1,
      explanation: '这是用循环实现的欧几里得算法求最大公约数，gcd(48,18)=6。'
    },
    {
      id: 'q-6-exp-single-2',
      type: 'single-choice',
      knowledgePoint: 'kp-6-1',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'def func(n):\n    total = 0\n    for i in range(1, n + 1):\n        total = total + i\n    return total\n\nprint(func(10))',
      options: [
        '10',
        '45',
        '55',
        '3628800'
      ],
      answer: 2,
      explanation: '用循环计算1+2+3+...+10=55。'
    },
    {
      id: 'q-6-exp-single-3',
      type: 'single-choice',
      knowledgePoint: 'kp-6-2',
      score: 2,
      difficulty: 'hard',
      question: '在PygameZero中，想要让角色在窗口内随机出现，下列代码正确的是？',
      code: null,
      options: [
        'player.pos = (random.randint(0, WIDTH), random.randint(0, HEIGHT))',
        'player.x = random.randint(0, WIDTH)\nplayer.y = random.randint(0, HEIGHT)',
        'player.position = random(0, WIDTH, 0, HEIGHT)',
        'player = random Actor(WIDTH, HEIGHT)'
      ],
      answer: 1,
      explanation: '需要分别设置x和y坐标为随机值，使用random.randint。'
    },
    {
      id: 'q-6-exp-single-4',
      type: 'single-choice',
      knowledgePoint: 'kp-6-3',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，当按住右箭头键时，角色会如何移动？',
      code: 'def update():\n    if keyboard.right and player.x < WIDTH - 20:\n        player.x = player.x + 5',
      options: [
        '一直向右移动直到窗口边界',
        '只移动一次',
        '不会移动',
        '移动后立即停止'
      ],
      answer: 0,
      explanation: 'update()每帧调用，按住右键时x持续增加，直到距右边界20像素处停止。'
    },
    {
      id: 'q-6-exp-single-5',
      type: 'single-choice',
      knowledgePoint: 'kp-6-4',
      score: 2,
      difficulty: 'hard',
      question: '已知数列满足a_1=2, a_n = 3*a_{n-1} - 1（n>1），则a_5的值是？',
      code: null,
      options: [
        '40',
        '41',
        '42',
        '43'
      ],
      answer: 1,
      explanation: 'a_1=2, a_2=5, a_3=14, a_4=41, a_5=122... 计算得a_4=41。'
    },
    {
      id: 'q-6-exp-single-6',
      type: 'single-choice',
      knowledgePoint: 'kp-6-4',
      score: 2,
      difficulty: 'hard',
      question: '已知递推公式：移动n个圆盘所需次数为 2^n - 1。则移动5个圆盘需要多少次？',
      code: null,
      options: [
        '15',
        '31',
        '63',
        '127'
      ],
      answer: 1,
      explanation: '根据递推公式，移动5个圆盘需要 2^5 - 1 = 32 - 1 = 31 次。'
    },
    {
      id: 'q-6-exp-single-7',
      type: 'single-choice',
      knowledgePoint: 'kp-6-5',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'expr = "3+4*2"\nresult = 0\nnum = 0\ni = 0\nwhile i < len(expr):\n    if expr[i].isdigit():\n        num = int(expr[i])\n    elif expr[i] == "*":\n        i = i + 1\n        num = num * int(expr[i])\n    elif expr[i] == "+":\n        result = result + num\n    i = i + 1\nresult = result + num\nprint(result)',
      options: [
        '11',
        '14',
        '10',
        '7'
      ],
      answer: 0,
      explanation: '模拟表达式计算：先算4*2=8，然后3+8=11。'
    },
    {
      id: 'q-6-exp-single-8',
      type: 'single-choice',
      knowledgePoint: 'kp-6-5',
      score: 2,
      difficulty: 'hard',
      question: '计算表达式 (3 + 5) * 2 - 4 的值，正确的计算顺序是？',
      code: null,
      options: [
        '先算3+5=8，再算8*2=16，最后16-4=12',
        '先算5*2=10，再算3+10=13，最后13-4=9',
        '先算2-4=-2，再算3+5=8，最后8*(-2)=-16',
        '从左到右依次计算3+5=8，8*2=16，16-4=12'
      ],
      answer: 0,
      explanation: '按运算优先级：括号内3+5=8，然后8*2=16，最后16-4=12。'
    },
    {
      id: 'q-6-exp-single-9',
      type: 'single-choice',
      knowledgePoint: 'kp-6-6',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'nums = [3, 7, 2, 9, 1]\nresult = []\nfor x in nums:\n    if x % 2 == 1:\n        result.append(x)\nprint(result)',
      options: [
        '[3, 7, 2, 9, 1]',
        '[3, 7, 9, 1]',
        '[2]',
        '[7, 9]'
      ],
      answer: 1,
      explanation: '遍历列表，筛选出所有奇数：3, 7, 9, 1。'
    },
    {
      id: 'q-6-exp-single-10',
      type: 'single-choice',
      knowledgePoint: 'kp-6-6',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'nums = [1, 2, 3, 4, 5]\nresult = []\nfor i in range(len(nums)):\n    if i % 2 == 0:\n        result.append(nums[i])\nprint(result)',
      options: [
        '[1, 3, 5]',
        '[2, 4]',
        '[1, 2, 3]',
        '[3, 4, 5]'
      ],
      answer: 0,
      explanation: '遍历列表，取出索引为偶数的元素（0,2,4对应值1,3,5）。'
    },
    {
      id: 'q-6-exp-single-11',
      type: 'single-choice',
      knowledgePoint: 'kp-6-7',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'data = [1, 2, 3, 4, 5]\nresult = []\nfor i in range(len(data)):\n    result.insert(0, data[i])\nprint(result)',
      options: [
        '[1, 2, 3, 4, 5]',
        '[5, 4, 3, 2, 1]',
        '[1, 3, 5, 2, 4]',
        '[5, 1, 2, 3, 4]'
      ],
      answer: 1,
      explanation: '每次在位置0插入，相当于逆序，结果为[5,4,3,2,1]。'
    },
    {
      id: 'q-6-exp-single-12',
      type: 'single-choice',
      knowledgePoint: 'kp-6-7',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'data = [10, 20, 30, 40, 50]\nresult = 0\nfor i in range(len(data)):\n    result = result + data[i]\navg = result // len(data)\nprint(avg)',
      options: [
        '25',
        '30',
        '150',
        '28'
      ],
      answer: 1,
      explanation: '计算列表平均值：(10+20+30+40+50)/5 = 150/5 = 30。'
    },
    {
      id: 'q-6-exp-single-13',
      type: 'single-choice',
      knowledgePoint: 'kp-6-8',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'def fib(n):\n    if n <= 2:\n        return 1\n    a = 1\n    b = 1\n    for i in range(n - 2):\n        c = a + b\n        a = b\n        b = c\n    return b\n\nprint(fib(10))',
      options: [
        '34',
        '55',
        '89',
        '144'
      ],
      answer: 1,
      explanation: '第10个斐波那契数是55。'
    },
    {
      id: 'q-6-exp-single-14',
      type: 'single-choice',
      knowledgePoint: 'kp-6-4',
      score: 2,
      difficulty: 'hard',
      question: '已知递推关系 f(n) = f(n-1) + f(n-2) + f(n-3)，且 f(1)=f(2)=f(3)=1，则 f(6) = ?',
      code: null,
      options: [
        '5',
        '7',
        '9',
        '11'
      ],
      answer: 2,
      explanation: 'f(1)=1, f(2)=1, f(3)=1, f(4)=1+1+1=3, f(5)=1+1+3=5, f(6)=1+3+5=9。'
    },
    {
      id: 'q-6-exp-single-15',
      type: 'single-choice',
      knowledgePoint: 'kp-6-6',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'nums = [1, 3, 5, 7, 9, 11, 13]\ntarget = 7\nfound = False\nindex = -1\nfor i in range(len(nums)):\n    if nums[i] == target:\n        found = True\n        index = i\n        break\nprint(index)',
      options: [
        '2',
        '3',
        '4',
        '-1'
      ],
      answer: 1,
      explanation: '用线性查找找到7在列表中的索引位置是3。'
    },

    // ==================== 多选题（5题，每题3分，共15分）====================
    {
      id: 'q-6-exp-multi-1',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-1',
      score: 3,
      difficulty: 'hard',
      question: '【多选题】关于Python函数，以下说法正确的有？',
      code: null,
      options: [
        '函数可以有多个参数',
        '函数可以返回多个值',
        '函数内部可以调用其他函数',
        '函数必须要有return语句'
      ],
      answer: [0, 1, 2],
      partialAnswer: [0],
      explanation: '函数可以有多个参数、返回多个值、调用其他函数。但函数不必须有return语句。'
    },
    {
      id: 'q-6-exp-multi-2',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-4',
      score: 3,
      difficulty: 'hard',
      question: '【多选题】可以用递推求解的问题有？',
      code: null,
      options: [
        '斐波那契数列',
        '等差数列求和',
        '阶乘计算',
        '素数判断'
      ],
      answer: [0, 1, 2],
      partialAnswer: [0],
      explanation: '斐波那契、等差数列、阶乘都可以递推。素数判断需要逐个检验，不是典型的递推问题。'
    },
    {
      id: 'q-6-exp-multi-3',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-5',
      score: 3,
      difficulty: 'hard',
      question: '【多选题】关于表达式求值，以下说法正确的有？',
      code: null,
      options: [
        '乘法的优先级高于加法',
        '括号内的运算优先执行',
        '除法和乘法优先级相同',
        '表达式从左到右依次计算'
      ],
      answer: [0, 1, 2],
      partialAnswer: [0, 1],
      explanation: '乘法优先级高于加法、括号优先、乘除同级。但同级运算从左到右，不同级要按优先级。'
    },
    {
      id: 'q-6-exp-multi-4',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-6',
      score: 3,
      difficulty: 'hard',
      question: '【多选题】以下哪些是模拟循环的常见应用场景？',
      code: null,
      options: [
        '计算累加和',
        '统计满足条件的元素个数',
        '模拟多轮游戏过程',
        '逐字符处理字符串'
      ],
      answer: [0, 1, 2, 3],
      partialAnswer: [0, 1],
      explanation: '这四个都是模拟循环的常见应用场景。'
    },
    {
      id: 'q-6-exp-multi-5',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-7',
      score: 3,
      difficulty: 'hard',
      question: '【多选题】关于列表模拟，以下哪些操作是正确的？',
      code: null,
      options: [
        'append()在列表末尾添加元素',
        'pop(0)移除并返回第一个元素',
        'insert(i, x)在位置i插入元素x',
        'remove(x)移除值为x的第一个元素'
      ],
      answer: [0, 1, 2, 3],
      partialAnswer: [0, 1],
      explanation: '这四个都是正确的列表操作方法。'
    },

    // ==================== 编程题（4题，共55分）====================
    {
      id: 'q-6-exp-coding-1',
      type: 'coding',
      knowledgePoint: 'kp-6-4',
      score: 10,
      difficulty: 'medium',
      question: '使用递推计算组合数C(n,2)。输入正整数n（2<=n<=100），输出从n个不同元素中取2个的组合数。公式：C(n,2) = n*(n-1)/2',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '5', expectedOutput: '10' },
        { input: '10', expectedOutput: '45' }
      ],
      scoringRules: {
        fullScore: 10,
        partialScores: [
          { condition: '能正确获取输入', score: 3 },
          { condition: '能正确计算', score: 5 },
          { condition: '完全正确', score: 10 }
        ]
      },
      referenceAnswer: 'n = int(input())\nresult = n * (n - 1) // 2\nprint(result)',
      explanation: '组合数公式C(n,2)=n*(n-1)/2，使用整除确保结果是整数。'
    },
    {
      id: 'q-6-exp-coding-2',
      type: 'coding',
      knowledgePoint: 'kp-6-6',
      score: 10,
      difficulty: 'medium',
      question: '使用模拟实现简单的银行排队系统。输入一个正整数n和n个操作（每个操作是"存钱 X"或"取钱 X"），初始余额为1000元，输出最终余额。输入格式：每行一个操作，如"存钱 100"或"取钱 50"。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '2\n存钱 100\n取钱 50', expectedOutput: '1050' },
        { input: '3\n存钱 500\n取钱 200\n取钱 100', expectedOutput: '1200' }
      ],
      scoringRules: {
        fullScore: 10,
        partialScores: [
          { condition: '能正确获取输入', score: 3 },
          { condition: '能正确解析操作', score: 5 },
          { condition: '完全正确', score: 10 }
        ]
      },
      referenceAnswer: 'n = int(input())\nbalance = 1000\nfor i in range(n):\n    op = input()\n    parts = op.split()\n    if parts[0] == "存钱":\n        balance = balance + int(parts[1])\n    else:\n        balance = balance - int(parts[1])\nprint(balance)',
      explanation: '解析操作类型和金额，更新余额。'
    },
    {
      id: 'q-6-exp-coding-3',
      type: 'coding',
      knowledgePoint: 'kp-6-5',
      score: 15,
      difficulty: 'hard',
      question: '模拟简单的加减乘除计算。输入两个正整数a和b，以及一个运算符op（+、-、*、/），输出a op b的计算结果。除法使用整除。例如：输入"3 + 5"，输出8。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '3 + 5', expectedOutput: '8' },
        { input: '10 * 2', expectedOutput: '20' },
        { input: '10 / 3', expectedOutput: '3' }
      ],
      scoringRules: {
        fullScore: 15,
        partialScores: [
          { condition: '能正确获取输入', score: 4 },
          { condition: '能处理部分运算', score: 8 },
          { condition: '完全正确', score: 15 }
        ]
      },
      referenceAnswer: 'parts = input().split()\na = int(parts[0])\nop = parts[1]\nb = int(parts[2])\n\nif op == "+":\n    print(a + b)\nelif op == "-":\n    print(a - b)\nelif op == "*":\n    print(a * b)\nelif op == "/":\n    print(a // b)',
      explanation: '根据运算符执行对应的加减乘除运算。'
    },
    {
      id: 'q-6-exp-coding-4',
      type: 'coding',
      knowledgePoint: 'kp-6-7',
      score: 20,
      difficulty: 'hard',
      question: '模拟简单的队列操作。初始队列为空，输入一个正整数n和n个操作，每个操作是以下之一："PUSH X"表示将数字X加入队尾，"POP"表示移除队首元素。输出最终队列中的所有元素（从队首到队尾，用空格分隔）。如果队列为空，输出"空"。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '3\nPUSH 1\nPUSH 2\nPUSH 3', expectedOutput: '1 2 3' },
        { input: '4\nPUSH 5\nPOP\nPUSH 10\nPUSH 20', expectedOutput: '10 20' },
        { input: '2\nPUSH 1\nPOP', expectedOutput: '空' }
      ],
      scoringRules: {
        fullScore: 20,
        partialScores: [
          { condition: '能正确获取输入', score: 5 },
          { condition: '能实现部分操作', score: 10 },
          { condition: '完全正确', score: 20 }
        ]
      },
      referenceAnswer: 'n = int(input())\nqueue = []\nfor i in range(n):\n    cmd = input()\n    parts = cmd.split()\n    if parts[0] == "PUSH":\n        queue.append(int(parts[1]))\n    elif parts[0] == "POP":\n        if len(queue) > 0:\n            queue.pop(0)\n\nif len(queue) == 0:\n    print("空")\nelse:\n    for i in range(len(queue)):\n        if i > 0:\n            print(" ", end="")\n        print(queue[i], end="")\n    print()',
      explanation: '使用列表模拟队列，append()在队尾添加，pop(0)移除队首元素。这是带列表的模拟问题。'
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
      'kp-6-2': { count: 1, totalScore: 2 },
      'kp-6-3': { count: 1, totalScore: 2 },
      'kp-6-4': { count: 4, totalScore: 17 },
      'kp-6-5': { count: 4, totalScore: 21 },
      'kp-6-6': { count: 4, totalScore: 20 },
      'kp-6-7': { count: 4, totalScore: 22 },
      'kp-6-8': { count: 2, totalScore: 5 }
    },
    byDifficulty: {
      'hard': 24
    }
  }
}

export default practiceSet
