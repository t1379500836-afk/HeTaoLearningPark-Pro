/**
 * YCL六级基础练习（三）
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
    id: 'level6-basic-3',
    level: 'level6',
    difficulty: 'basic',
    name: '六级基础练习（三）',
    description: '涵盖六级必考知识点的基础练习',
    duration: 90,
    totalScore: 100,
    createdAt: '2026-03-31',
    version: '2.0'
  },

  questions: [
    // ==================== 单选题（15题，每题2分，共30分）====================
    {
      id: 'q-6-3-single-1',
      type: 'single-choice',
      knowledgePoint: 'kp-6-1',
      score: 2,
      difficulty: 'easy',
      question: '运行下列代码，输出结果是？',
      code: 'def say_hello(name):\n    print("你好," + name)\n\nsay_hello("小明")',
      options: [
        '你好,小明',
        '你好,name',
        'say_hello',
        '程序报错'
      ],
      answer: 0,
      explanation: "函数say_hello接收参数name，调用时传入'小明'，输出'你好,小明'。"
    },
    {
      id: 'q-6-3-single-2',
      type: 'single-choice',
      knowledgePoint: 'kp-6-1',
      score: 2,
      difficulty: 'easy',
      question: '下列代码的输出结果是？',
      code: 'def double(x):\n    return x * 2\n\nprint(double(5))',
      options: [
        'x * 2',
        '10',
        '25',
        '5'
      ],
      answer: 1,
      explanation: 'double(5)返回5*2=10，print输出10。'
    },
    {
      id: 'q-6-3-single-3',
      type: 'single-choice',
      knowledgePoint: 'kp-6-2',
      score: 2,
      difficulty: 'easy',
      question: '在PygameZero中，如何创建一个名为player的角色？',
      code: null,
      options: [
        "player = new Actor('角色图片')",
        "player = Actor('角色图片')",
        "create Actor('角色图片')",
        "Actor player = '角色图片'"
      ],
      answer: 1,
      explanation: "在PygameZero中使用Actor()函数创建角色，语法是变量名 = Actor('图片名称')。"
    },
    {
      id: 'q-6-3-single-4',
      type: 'single-choice',
      knowledgePoint: 'kp-6-2',
      score: 2,
      difficulty: 'easy',
      question: '运行下列代码，输出结果是？',
      code: 'WIDTH = 400\nHEIGHT = 300\nprint(WIDTH + HEIGHT)',
      options: [
        '400300',
        '700',
        '400 + 300',
        'WIDTH + HEIGHT'
      ],
      answer: 1,
      explanation: 'WIDTH=400，HEIGHT=300，400+300=700。'
    },
    {
      id: 'q-6-3-single-5',
      type: 'single-choice',
      knowledgePoint: 'kp-6-3',
      score: 2,
      difficulty: 'medium',
      question: '在PygameZero中，下列代码的功能是？',
      code: 'def on_mouse_down(pos):\n    print("鼠标点击位置:", pos)',
      options: [
        '在鼠标移动时打印位置',
        '在鼠标点击时打印位置',
        '在键盘按下时打印位置',
        '在鼠标释放时打印位置'
      ],
      answer: 1,
      explanation: 'on_mouse_down函数在鼠标按下时被调用，pos参数包含鼠标点击的坐标。'
    },
    {
      id: 'q-6-3-single-6',
      type: 'single-choice',
      knowledgePoint: 'kp-6-3',
      score: 2,
      difficulty: 'medium',
      question: '想要在按下向右箭头键时让角色向右移动，横线处应填写？',
      code: 'def on_key_down(key):\n    if ______:\n        player.x = player.x + 10',
      options: [
        'key == keys.RIGHT',
        "key == 'RIGHT'",
        "key == keys.LEFT",
        "key == 'right'"
      ],
      answer: 0,
      explanation: '在PygameZero中，keys.RIGHT表示向右箭头键，必须使用keys.前缀。'
    },
    {
      id: 'q-6-3-single-7',
      type: 'single-choice',
      knowledgePoint: 'kp-6-4',
      score: 2,
      difficulty: 'medium',
      question: '已知递推公式 f(n) = f(n-1) + 2，且 f(1) = 1，则 f(5) = ?',
      code: null,
      options: [
        '7',
        '9',
        '11',
        '13'
      ],
      answer: 1,
      explanation: 'f(1)=1, f(2)=3, f(3)=5, f(4)=7, f(5)=9。每项比前一项大2。'
    },
    {
      id: 'q-6-3-single-8',
      type: 'single-choice',
      knowledgePoint: 'kp-6-4',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，输出结果是？',
      code: 'a = 1\nb = 1\nfor i in range(3):\n    c = a + b\n    a = b\n    b = c\nprint(b)',
      options: [
        '3',
        '5',
        '8',
        '13'
      ],
      answer: 1,
      explanation: '模拟斐波那契递推3次：初始(1,1)，第1次(1,2)，第2次(2,3)，第3次(3,5)，b=5。'
    },
    {
      id: 'q-6-3-single-9',
      type: 'single-choice',
      knowledgePoint: 'kp-6-5',
      score: 2,
      difficulty: 'medium',
      question: '模拟表达式计算：3 + 5 * 2 的结果是？（先乘后加）',
      code: null,
      options: [
        '16',
        '13',
        '11',
        '10'
      ],
      answer: 1,
      explanation: '先算5*2=10，再算3+10=13。'
    },
    {
      id: 'q-6-3-single-10',
      type: 'single-choice',
      knowledgePoint: 'kp-6-6',
      score: 2,
      difficulty: 'hard',
      question: '运行下列模拟循环的代码，输出结果是？',
      code: 'x = 10\nfor i in range(3):\n    x = x // 2\nprint(x)',
      options: [
        '5',
        '2',
        '1',
        '0'
      ],
      answer: 2,
      explanation: '10//2=5, 5//2=2, 2//2=1。经过3次整除2的操作，结果是1。'
    },
    {
      id: 'q-6-3-single-11',
      type: 'single-choice',
      knowledgePoint: 'kp-6-7',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'nums = [3, 1, 4, 1, 5]\nnew_nums = []\nfor n in nums:\n    if n > 2:\n        new_nums.append(n * 2)\nprint(sum(new_nums))',
      options: [
        '28',
        '24',
        '14',
        '12'
      ],
      answer: 1,
      explanation: '大于2的数是3,4,5，乘2后是6,8,10，sum=24。'
    },
    {
      id: 'q-6-3-single-12',
      type: 'single-choice',
      knowledgePoint: 'kp-6-8',
      score: 2,
      difficulty: 'hard',
      question: '斐波那契数列的第8项是多少？',
      code: null,
      options: [
        '13',
        '21',
        '34',
        '55'
      ],
      answer: 1,
      explanation: '斐波那契数列：1,1,2,3,5,8,13,21，第8项是21。'
    },
    {
      id: 'q-6-3-single-13',
      type: 'single-choice',
      knowledgePoint: 'kp-6-5',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 's = "123"\ntotal = 0\nfor c in s:\n    total = total + int(c)\nprint(total)',
      options: [
        '123',
        '6',
        '"123"',
        '321'
      ],
      answer: 1,
      explanation: "遍历字符串'123'，将每个字符转为整数并累加：1+2+3=6。"
    },
    {
      id: 'q-6-3-single-14',
      type: 'single-choice',
      knowledgePoint: 'kp-6-6',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'n = 4\ncount = 0\nwhile n > 1:\n    n = n - 1\n    count = count + 1\nprint(count)',
      options: [
        '2',
        '3',
        '4',
        '1'
      ],
      answer: 1,
      explanation: 'n从4减到1需要3次循环（4→3→2→1），count=3。'
    },
    {
      id: 'q-6-3-single-15',
      type: 'single-choice',
      knowledgePoint: 'kp-6-7',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: 'arr = [5, 2, 8, 1, 9]\nmax_val = arr[0]\nfor num in arr:\n    if num > max_val:\n        max_val = num\nprint(max_val)',
      options: [
        '5',
        '1',
        '8',
        '9'
      ],
      answer: 3,
      explanation: '遍历列表找最大值，9是列表中最大的元素。'
    },

    // ==================== 多选题（5题，每题3分，共15分）====================
    {
      id: 'q-6-3-multi-1',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-1',
      score: 3,
      difficulty: 'easy',
      question: '【多选题】关于Python函数参数的说法，正确的有？',
      code: null,
      options: [
        '函数可以有多个参数',
        '函数可以没有参数',
        '参数之间用逗号分隔',
        '调用函数时必须传入所有参数'
      ],
      answer: [0, 1, 2, 3],
      partialAnswer: [0, 1],
      explanation: '函数可以有多个参数，也可以没有参数，参数用逗号分隔，调用时需传入所有定义的参数。'
    },
    {
      id: 'q-6-3-multi-2',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-2',
      score: 3,
      difficulty: 'easy',
      question: '【多选题】在PygameZero中，以下哪些说法是正确的？',
      code: null,
      options: [
        'WIDTH表示窗口宽度',
        'HEIGHT表示窗口高度',
        'Actor()用于创建角色',
        '角色有x和y属性表示位置'
      ],
      answer: [0, 1, 2, 3],
      partialAnswer: [0, 1],
      explanation: '这四个说法都正确，是PygameZero的基础知识。'
    },
    {
      id: 'q-6-3-multi-3',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-4',
      score: 3,
      difficulty: 'medium',
      question: '【多选题】关于递推算法，以下说法正确的有？',
      code: null,
      options: [
        '递推需要一个初始值',
        '递推通过循环实现',
        '递推公式描述了相邻项的关系',
        '斐波那契数列可以用递推求解'
      ],
      answer: [0, 1, 2, 3],
      partialAnswer: [0, 1],
      explanation: '递推需要初始值和递推公式，通常用循环实现，斐波那契数列是经典的递推问题。'
    },
    {
      id: 'q-6-3-multi-4',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-5',
      score: 3,
      difficulty: 'medium',
      question: '【多选题】模拟表达式 2 + 3 * 4 - 1 的计算过程，以下哪些步骤是正确的？',
      code: null,
      options: [
        '先计算 3 * 4 = 12',
        '然后计算 2 + 12 = 14',
        '最后计算 14 - 1 = 13',
        '结果是 15'
      ],
      answer: [0, 1, 2],
      partialAnswer: [0],
      explanation: '按优先级：3*4=12，2+12=14，14-1=13。结果是13不是15。'
    },
    {
      id: 'q-6-3-multi-5',
      type: 'multiple-choice',
      knowledgePoint: 'kp-6-8',
      score: 3,
      difficulty: 'medium',
      question: '【多选题】关于斐波那契数列，以下说法正确的有？',
      code: null,
      options: [
        '前两项都是1',
        '从第3项起，每项等于前两项之和',
        '第5项是5',
        '第6项是7'
      ],
      answer: [0, 1, 2],
      partialAnswer: [0],
      explanation: '斐波那契数列：1,1,2,3,5,8,13...。前两项是1，每项是前两项之和，第5项是5，第6项是8不是7。'
    },

    // ==================== 编程题（4题，共55分）====================
    // Q1: 简单递推问题 (kp-6-4)
    {
      id: 'q-6-3-coding-1',
      type: 'coding',
      knowledgePoint: 'kp-6-4',
      score: 10,
      difficulty: 'easy',
      question: '使用递推计算等差数列。已知首项a1=2，公差d=3，输入正整数n（1<=n<=20），输出第n项的值。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '1', expectedOutput: '2' },
        { input: '5', expectedOutput: '14' }
      ],
      scoringRules: {
        fullScore: 10,
        partialScores: [
          { condition: '能正确获取输入', score: 3 },
          { condition: '能正确使用递推', score: 5 },
          { condition: '完全正确', score: 10 }
        ]
      },
      referenceAnswer: 'n = int(input())\na = 2\nfor i in range(1, n):\n    a = a + 3\nprint(a)',
      explanation: '等差数列递推公式：a_n = a_{n-1} + d，从首项开始递推n-1次得到第n项。这是简单递推问题。'
    },
    // Q2: 顺序模拟 (kp-6-5)
    {
      id: 'q-6-3-coding-2',
      type: 'coding',
      knowledgePoint: 'kp-6-5',
      score: 15,
      difficulty: 'medium',
      question: '模拟超市购物结算。小明有预算P元，先买了3瓶牛奶，每瓶6元；又买了2盒饼干，每盒15元；最后买了1袋水果，花费F元。输入P和F，输出剩余的钱。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '100\n25', expectedOutput: '27' },
        { input: '200\n40', expectedOutput: '112' }
      ],
      scoringRules: {
        fullScore: 15,
        partialScores: [
          { condition: '能正确获取输入', score: 5 },
          { condition: '能正确模拟花费过程', score: 10 },
          { condition: '完全正确', score: 15 }
        ]
      },
      referenceAnswer: 'p = int(input())\nf = int(input())\np = p - 6 * 3\np = p - 15 * 2\np = p - f\nprint(p)',
      explanation: '先算牛奶花费6*3=18元，再算饼干花费15*2=30元，最后算水果花费F元，从预算P中逐步减去。这是顺序模拟。'
    },
    // Q3: 循环模拟 (kp-6-6)
    {
      id: 'q-6-3-coding-3',
      type: 'coding',
      knowledgePoint: 'kp-6-6',
      score: 15,
      difficulty: 'medium',
      question: '模拟数字递增过程。输入一个正整数n，输出从1加到n的和。例如：输入5，输出15（因为1+2+3+4+5=15）。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '5', expectedOutput: '15' },
        { input: '10', expectedOutput: '55' }
      ],
      scoringRules: {
        fullScore: 15,
        partialScores: [
          { condition: '能正确获取输入', score: 4 },
          { condition: '能正确使用循环模拟累加', score: 8 },
          { condition: '完全正确', score: 15 }
        ]
      },
      referenceAnswer: 'n = int(input())\ntotal = 0\nfor i in range(1, n + 1):\n    total = total + i\nprint(total)',
      explanation: '使用for循环从1累加到n。这是循环模拟问题。'
    },
    // Q4: 带列表的模拟 (kp-6-7)
    {
      id: 'q-6-3-coding-4',
      type: 'coding',
      knowledgePoint: 'kp-6-7',
      score: 15,
      difficulty: 'medium',
      question: '模拟列表数据筛选。输入一个正整数n和n个整数存入列表，然后输出列表中所有偶数（按原顺序输出，每行一个）。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '5\n1 2 3 4 5', expectedOutput: '2\n4' },
        { input: '6\n10 7 8 3 6 1', expectedOutput: '10\n8\n6' }
      ],
      scoringRules: {
        fullScore: 15,
        partialScores: [
          { condition: '能正确获取输入和创建列表', score: 5 },
          { condition: '能正确遍历并判断偶数', score: 5 },
          { condition: '完全正确', score: 15 }
        ]
      },
      referenceAnswer: 'n = int(input())\nnums = list(map(int, input().split()))\n\nfor num in nums:\n    if num % 2 == 0:\n        print(num)',
      explanation: '遍历列表，判断每个元素是否为偶数，是则输出。这是带列表的模拟。'
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
      'kp-6-4': { count: 4, totalScore: 18 },
      'kp-6-5': { count: 4, totalScore: 23 },
      'kp-6-6': { count: 4, totalScore: 20 },
      'kp-6-7': { count: 4, totalScore: 23 },
      'kp-6-8': { count: 2, totalScore: 5 }
    },
    byDifficulty: {
      'easy': 6,
      'medium': 9,
      'hard': 9
    }
  }
}

export default practiceSet
