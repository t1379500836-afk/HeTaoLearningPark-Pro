/**
 * YCL四级基础练习（三）
 *
 * 本套卷包含：单选题15题（每题2分，共30分）
 *             多选题5题（每题3分，共15分）
 *             编程题4题（共55分）
 * 总分：100分  时长：90分钟
 */

export const practiceSet = {
  meta: {
    id: 'level4-basic-3',
    level: 'level4',
    difficulty: 'basic',
    name: '四级基础练习（三）',
    description: '涵盖四级必考知识点的基础练习',
    duration: 90,
    totalScore: 100,
    createdAt: '2026-03-31',
    version: '1.0'
  },

  questions: [
    // ==================== 单选题（15题，每题2分，共30分）====================
    {
      id: 'q-4-3-single-1',
      type: 'single-choice',
      knowledgePoint: 'kp-4-1',
      score: 2,
      difficulty: 'easy',
      question: '下列哪个选项可以正确输出"你好世界"？',
      code: null,
      options: [
        "print('你好世界')",
        "print(你好世界)",
        "Print('你好世界')",
        "print('你好世界'"
      ],
      answer: 0,
      explanation: 'print()输出字符串，字符串需要加引号，函数名小写，括号成对。'
    },
    {
      id: 'q-4-3-single-2',
      type: 'single-choice',
      knowledgePoint: 'kp-4-3',
      score: 2,
      difficulty: 'easy',
      question: '运行下列代码，输出结果是？',
      code: `a = '7'
print(int(a) + int(a))`,
      options: [
        '77',
        '14',
        '7',
        '程序报错'
      ],
      answer: 1,
      explanation: "int('7')转为整数7，7+7=14。"
    },
    {
      id: 'q-4-3-single-3',
      type: 'single-choice',
      knowledgePoint: 'kp-4-4',
      score: 2,
      difficulty: 'easy',
      question: '小明有3盒铅笔，每盒有8支。运行下列代码，输出结果是？',
      code: 'print(3 * 8)',
      options: [
        '11',
        '38',
        '24',
        '程序报错'
      ],
      answer: 2,
      explanation: '3*8=24，乘法运算。'
    },
    {
      id: 'q-4-3-single-4',
      type: 'single-choice',
      knowledgePoint: 'kp-4-2',
      score: 2,
      difficulty: 'easy',
      question: '运行下列代码，输入"hello"，输出结果是？',
      code: `a = input()
print(a)`,
      options: [
        'a',
        'hello',
        'input()',
        '程序报错'
      ],
      answer: 1,
      explanation: 'input()获取输入"hello"，赋值给a，print(a)输出hello。'
    },
    {
      id: 'q-4-3-single-5',
      type: 'single-choice',
      knowledgePoint: 'kp-4-5',
      score: 2,
      difficulty: 'easy',
      question: '运行下列代码，输出结果是？',
      code: `a = '学习'
b = '编程'
print(a + b)`,
      options: [
        '学习 编程',
        '学习+编程',
        '学习编程',
        'ab'
      ],
      answer: 2,
      explanation: '字符串拼接，"学习"+"编程"="学习编程"。'
    },
    {
      id: 'q-4-3-single-6',
      type: 'single-choice',
      knowledgePoint: 'kp-4-4',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，输出结果是？',
      code: 'print(2 ** 3)',
      options: [
        '6',
        '8',
        '5',
        '23'
      ],
      answer: 1,
      explanation: '**是幂运算，2**3=2×2×2=8。'
    },
    {
      id: 'q-4-3-single-7',
      type: 'single-choice',
      knowledgePoint: 'kp-4-8',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，输出结果是？',
      code: `n = 20
n = n - 8
n = n + 3
print(n)`,
      options: [
        '20',
        '12',
        '15',
        '23'
      ],
      answer: 2,
      explanation: 'n初始20，减8后为12，加3后为15。'
    },
    {
      id: 'q-4-3-single-8',
      type: 'single-choice',
      knowledgePoint: 'kp-4-6',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，输出结果是？',
      code: `age = 15
if age >= 18:
    print('成年')
else:
    print('未成年')`,
      options: [
        '成年',
        '未成年',
        '15',
        '程序报错'
      ],
      answer: 1,
      explanation: 'age=15，15>=18不成立，执行else分支输出"未成年"。'
    },
    {
      id: 'q-4-3-single-9',
      type: 'single-choice',
      knowledgePoint: 'kp-4-7',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，一共输出几行"星星"？',
      code: `for i in range(2, 6):
    print('星星')`,
      options: [
        '2行',
        '3行',
        '4行',
        '6行'
      ],
      answer: 2,
      explanation: 'range(2, 6)生成2、3、4、5，循环4次，输出4行。'
    },
    {
      id: 'q-4-3-single-10',
      type: 'single-choice',
      knowledgePoint: 'kp-4-9',
      score: 2,
      difficulty: 'medium',
      question: '下列哪个选项的代码会报错？',
      code: null,
      options: [
        "print('你好')",
        'print(3 + 5)',
        "print(你好)",
        "print('3 + 5')"
      ],
      answer: 2,
      explanation: "print(你好)中你好没有加引号，Python会把它当作变量名，找不到该变量所以报错。"
    },
    {
      id: 'q-4-3-single-11',
      type: 'single-choice',
      knowledgePoint: 'kp-4-5',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `a = '我'
b = '爱'
c = '编程'
print(a + b + c)`,
      options: [
        '我 爱 编程',
        '我爱编程',
        'a + b + c',
        '我爱 编程'
      ],
      answer: 1,
      explanation: '三个字符串拼接，"我"+"爱"+"编程"="我爱编程"。'
    },
    {
      id: 'q-4-3-single-12',
      type: 'single-choice',
      knowledgePoint: 'kp-4-7',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `total = 0
for i in range(1, 4):
    total = total + i
print(total)`,
      options: [
        '3',
        '4',
        '6',
        '10'
      ],
      answer: 2,
      explanation: '循环i为1、2、3，total=0+1+2+3=6。'
    },
    {
      id: 'q-4-3-single-13',
      type: 'single-choice',
      knowledgePoint: 'kp-4-11',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `a = 10
b = 10
print(a == b)`,
      options: [
        '10',
        'True',
        'False',
        'a == b'
      ],
      answer: 1,
      explanation: '==是比较运算符，10==10成立，结果为True。'
    },
    {
      id: 'q-4-3-single-14',
      type: 'single-choice',
      knowledgePoint: 'kp-4-10',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `weather = '晴天'
if weather == '下雨':
    print('带伞')
if weather == '晴天':
    print('戴墨镜')`,
      options: [
        '带伞',
        '戴墨镜',
        '带伞\n戴墨镜',
        '什么都不输出'
      ],
      answer: 1,
      explanation: '两个独立的if语句。第一个条件不成立，第二个条件成立，输出"戴墨镜"。'
    },
    {
      id: 'q-4-3-single-15',
      type: 'single-choice',
      knowledgePoint: 'kp-4-12',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `t = 28
if t >= 30:
    print('热')
elif t >= 20:
    print('适宜')
elif t >= 10:
    print('凉爽')
else:
    print('冷')`,
      options: [
        '热',
        '适宜',
        '凉爽',
        '冷'
      ],
      answer: 1,
      explanation: '28>=30不成立，28>=20成立，执行elif输出"适宜"。'
    },

    // ==================== 多选题（5题，每题3分，共15分）====================
    {
      id: 'q-4-3-multi-1',
      type: 'multiple-choice',
      knowledgePoint: 'kp-4-3',
      score: 3,
      difficulty: 'easy',
      question: '【多选】下列关于int()的说法，正确的有哪些？',
      code: null,
      options: [
        "int('5')的结果是整数5",
        "int('3.14')可以正常执行",
        "int(4.9)的结果是4",
        'int()可以将字符串转为整数'
      ],
      answer: [0, 2, 3],
      partialAnswer: [0],
      explanation: "int('5')=5正确；int('3.14')会报错；int(4.9)=4（截断小数）；int()可以字符串转整数。"
    },
    {
      id: 'q-4-3-multi-2',
      type: 'multiple-choice',
      knowledgePoint: 'kp-4-5',
      score: 3,
      difficulty: 'easy',
      question: '【多选】下列哪些代码可以输出"我爱Python"？',
      code: null,
      options: [
        "print('我爱' + 'Python')",
        "print('我爱Python')",
        "print('我' + '爱' + 'Python')",
        "print('我爱' + 'python')"
      ],
      answer: [0, 1, 2],
      partialAnswer: [1],
      explanation: "A拼接'我爱'+'Python'='我爱Python'；B直接输出；C拼接三个字符串也正确；D输出'我爱python'（p小写）。"
    },
    {
      id: 'q-4-3-multi-3',
      type: 'multiple-choice',
      knowledgePoint: 'kp-4-4',
      score: 3,
      difficulty: 'medium',
      question: '【多选】下列哪些表达式的结果等于2？',
      code: null,
      options: [
        '10 % 4',
        '7 // 3',
        '15 % 13',
        '6 // 3'
      ],
      answer: [0, 1, 2, 3],
      partialAnswer: [0, 1],
      explanation: '10%4=2（余数），7//3=2（整除），15%13=2（余数），6//3=2（整除）。全部正确。'
    },
    {
      id: 'q-4-3-multi-4',
      type: 'multiple-choice',
      knowledgePoint: 'kp-4-6',
      score: 3,
      difficulty: 'medium',
      question: '【多选】下列代码中，哪些会输出"偶数"？',
      code: null,
      options: [
        `n = 4
if n % 2 == 0:
    print('偶数')`,
        `n = 3
if n % 2 == 0:
    print('偶数')`,
        `n = 6
if n % 2 == 0:
    print('偶数')`,
        `n = 7
if n % 2 == 0:
    print('偶数')`
      ],
      answer: [0, 2],
      partialAnswer: [0],
      explanation: 'n=4时4%2=0成立；n=3时3%2=1不成立；n=6时6%2=0成立；n=7时7%2=1不成立。'
    },
    {
      id: 'q-4-3-multi-5',
      type: 'multiple-choice',
      knowledgePoint: 'kp-4-7',
      score: 3,
      difficulty: 'medium',
      question: '【多选】下列哪些代码运行后会输出3行"你好"？',
      code: null,
      options: [
        `for i in range(3):
    print('你好')`,
        `for i in range(1, 4):
    print('你好')`,
        `for i in range(0, 3):
    print('你好')`,
        `for i in range(3, 6):
    print('你好')`
      ],
      answer: [0, 1, 2, 3],
      partialAnswer: [0],
      explanation: 'A: range(3)循环3次；B: range(1,4)循环3次；C: range(0,3)循环3次；D: range(3,6)循环3次。全部正确。'
    },

    // ==================== 编程题（4题，共55分）====================
    {
      id: 'q-4-3-coding-1',
      type: 'coding',
      knowledgePoint: 'kp-4-4',
      score: 10,
      difficulty: 'easy',
      question: '学校图书馆有200本图书，一年级借走了n本。请编写程序，输入n，输出图书馆还剩多少本图书。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '50', expectedOutput: '150' },
        { input: '120', expectedOutput: '80' }
      ],
      scoringRules: {
        fullScore: 10,
        partialScores: [
          { condition: '能获取输入', score: 3 },
          { condition: '能正确计算', score: 5 },
          { condition: '完全正确', score: 10 }
        ]
      },
      referenceAnswer: `n = input()
n = int(n)
print(200 - n)`,
      explanation: '获取输入转为整数，用200减去n输出剩余图书数量。'
    },
    {
      id: 'q-4-3-coding-2',
      type: 'coding',
      knowledgePoint: 'kp-4-5',
      score: 10,
      difficulty: 'easy',
      question: '小刚去书店买书，请你编写程序，输入书名，输出"小刚买了___这本书"（用字符串拼接完成）。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '西游记', expectedOutput: '小刚买了西游记这本书' },
        { input: '三国演义', expectedOutput: '小刚买了三国演义这本书' }
      ],
      scoringRules: {
        fullScore: 10,
        partialScores: [
          { condition: '能获取输入', score: 3 },
          { condition: '能正确拼接输出', score: 7 },
          { condition: '完全正确', score: 10 }
        ]
      },
      referenceAnswer: `book = input()
print('小刚买了' + book + '这本书')`,
      explanation: '使用字符串拼接，将前缀、输入的书名和后缀拼接输出。'
    },
    {
      id: 'q-4-3-coding-3',
      type: 'coding',
      knowledgePoint: 'kp-4-6',
      score: 15,
      difficulty: 'medium',
      question: '超市搞促销活动，消费满100元（包含100元）打八折，不满100元不打折。请编写程序，输入消费金额n，输出实际需要支付的金额（整数）。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '100', expectedOutput: '80' },
        { input: '50', expectedOutput: '50' }
      ],
      scoringRules: {
        fullScore: 15,
        partialScores: [
          { condition: '能获取输入并转换', score: 4 },
          { condition: '能使用if-else判断', score: 8 },
          { condition: '完全正确', score: 15 }
        ]
      },
      referenceAnswer: `n = input()
n = int(n)
if n >= 100:
    print(int(n * 0.8))
else:
    print(n)`,
      explanation: '判断消费金额是否满100，满足则打八折（乘0.8），否则原价输出。'
    },
    {
      id: 'q-4-3-coding-4',
      type: 'coding',
      knowledgePoint: 'kp-4-7',
      score: 20,
      difficulty: 'medium',
      question: '请你编写程序，使用for循环依次输出1到5这5个数字（每行一个数字）。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '', expectedOutput: '1\n2\n3\n4\n5' }
      ],
      scoringRules: {
        fullScore: 20,
        partialScores: [
          { condition: '能使用for循环', score: 10 },
          { condition: '完全正确', score: 20 }
        ]
      },
      referenceAnswer: `for i in range(1, 6):
    print(i)`,
      explanation: '使用range(1, 6)生成1到5，循环输出每个数字。'
    }
  ],

  distribution: {
    byType: {
      'single-choice': { count: 15, totalScore: 30 },
      'multiple-choice': { count: 5, totalScore: 15 },
      'coding': { count: 4, totalScore: 55 }
    },
    byKnowledgePoint: {
      'kp-4-1': { count: 1, totalScore: 2 },
      'kp-4-2': { count: 1, totalScore: 2 },
      'kp-4-3': { count: 2, totalScore: 5 },
      'kp-4-4': { count: 4, totalScore: 17 },
      'kp-4-5': { count: 4, totalScore: 17 },
      'kp-4-6': { count: 3, totalScore: 20 },
      'kp-4-7': { count: 4, totalScore: 27 },
      'kp-4-8': { count: 1, totalScore: 2 },
      'kp-4-9': { count: 1, totalScore: 2 },
      'kp-4-10': { count: 1, totalScore: 2 },
      'kp-4-11': { count: 1, totalScore: 2 },
      'kp-4-12': { count: 1, totalScore: 2 }
    },
    byDifficulty: {
      'easy': 9,
      'medium': 10,
      'hard': 5
    }
  }
}

export default practiceSet
