/**
 * YCL四级提升练习
 *
 * 本套卷包含：单选题15题（每题2分，共30分）
 *             多选题5题（每题3分，共15分）
 *             编程题4题（共55分）
 * 总分：100分  时长：90分钟
 */

export const practiceSet = {
  meta: {
    id: 'level4-expert',
    level: 'level4',
    difficulty: 'expert',
    name: '四级提升练习',
    description: '四级提升练习套卷，挑战高难度',
    duration: 90,
    totalScore: 100,
    createdAt: '2026-03-31',
    version: '1.0'
  },

  questions: [
    // ==================== 单选题（15题，每题2分，共30分）====================
    {
      id: 'q-4-exp-single-1',
      type: 'single-choice',
      knowledgePoint: 'kp-4-4',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `a = 3 ** 2
b = 2 ** 3
print(a + b)`,
      options: [
        '10',
        '17',
        '12',
        '13'
      ],
      answer: 1,
      explanation: '3²=9，2³=8，9+8=17。'
    },
    {
      id: 'q-4-exp-single-2',
      type: 'single-choice',
      knowledgePoint: 'kp-4-8',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `x = 100
x = x // 3
x = x % 7
print(x)`,
      options: [
        '33',
        '5',
        '6',
        '2'
      ],
      answer: 1,
      explanation: '100//3=33，33%7=5（33÷7=4余5）。'
    },
    {
      id: 'q-4-exp-single-3',
      type: 'single-choice',
      knowledgePoint: 'kp-4-7',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `s = ''
for i in range(4):
    s = s + str(i)
print(s)`,
      options: [
        '0123',
        '6',
        '0 1 2 3',
        '123'
      ],
      answer: 0,
      explanation: "循环将0,1,2,3转为字符串拼接，''+'0'+'1'+'2'+'3'='0123'。"
    },
    {
      id: 'q-4-exp-single-4',
      type: 'single-choice',
      knowledgePoint: 'kp-4-6',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输入"75"，输出结果是？',
      code: `score = input()
score = int(score)
if score >= 90:
    result = 'A'
elif score >= 80:
    result = 'B'
elif score >= 60:
    result = 'C'
else:
    result = 'D'
print(result)`,
      options: [
        'A',
        'B',
        'C',
        'D'
      ],
      answer: 2,
      explanation: '75>=90不成立，75>=80不成立，75>=60成立，result="C"。'
    },
    {
      id: 'q-4-exp-single-5',
      type: 'single-choice',
      knowledgePoint: 'kp-4-7',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `count = 0
for i in range(10):
    if i % 3 == 0:
        count = count + 1
print(count)`,
      options: [
        '3',
        '4',
        '5',
        '10'
      ],
      answer: 1,
      explanation: 'range(10)是0-9，其中3的倍数有0,3,6,9共4个。'
    },
    {
      id: 'q-4-exp-single-6',
      type: 'single-choice',
      knowledgePoint: 'kp-4-5',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `a = 'Python'
b = '编程'
print(a + b + a)`,
      options: [
        'Python编程',
        'Python编程Python',
        'Python编程Python编程',
        'a + b + a'
      ],
      answer: 1,
      explanation: "'Python'+'编程'='Python编程'，再+'Python'='Python编程Python'。"
    },
    {
      id: 'q-4-exp-single-7',
      type: 'single-choice',
      knowledgePoint: 'kp-4-11',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `a = 5
b = 3
c = a > b
d = a == b
print(c, d)`,
      options: [
        'True True',
        'False False',
        'True False',
        '5 3'
      ],
      answer: 2,
      explanation: '5>3为True赋给c，5==3为False赋给d，输出"True False"。'
    },
    {
      id: 'q-4-exp-single-8',
      type: 'single-choice',
      knowledgePoint: 'kp-4-8',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `total = 0
for i in range(1, 6):
    if i % 2 == 1:
        total = total + i
print(total)`,
      options: [
        '15',
        '9',
        '6',
        '10'
      ],
      answer: 1,
      explanation: '1-5中奇数是1,3,5，累加得1+3+5=9。'
    },
    {
      id: 'q-4-exp-single-9',
      type: 'single-choice',
      knowledgePoint: 'kp-4-12',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `x = 15
if x > 20:
    y = 1
elif x > 10:
    y = 2
else:
    y = 3
print(y)`,
      options: [
        '1',
        '2',
        '3',
        '15'
      ],
      answer: 1,
      explanation: '15>20不成立，15>10成立，y=2。'
    },
    {
      id: 'q-4-exp-single-10',
      type: 'single-choice',
      knowledgePoint: 'kp-4-7',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `result = 1
for i in range(1, 5):
    result = result * i
print(result)`,
      options: [
        '10',
        '24',
        '120',
        '16'
      ],
      answer: 1,
      explanation: '1*1*2*3*4=24，这是计算4的阶乘(4!)。'
    },
    {
      id: 'q-4-exp-single-11',
      type: 'single-choice',
      knowledgePoint: 'kp-4-4',
      score: 2,
      difficulty: 'hard',
      question: '小华今年12岁，爸爸的年龄是小华的3倍多2岁。下列哪个代码可以正确计算爸爸的年龄？',
      code: null,
      options: [
        'print(12 * 3 + 2)',
        'print(12 + 3 * 2)',
        'print(12 * 3 - 2)',
        'print((12 + 3) * 2)'
      ],
      answer: 0,
      explanation: '12的3倍是36，多2岁是36+2=38，即12*3+2=38。'
    },
    {
      id: 'q-4-exp-single-12',
      type: 'single-choice',
      knowledgePoint: 'kp-4-5',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `a = '123'
b = '456'
print(a + b + '789')`,
      options: [
        '123456',
        '123456789',
        '123 + 456 + 789',
        '程序报错'
      ],
      answer: 1,
      explanation: "'123'+'456'='123456'，'123456'+'789'='123456789'。"
    },
    {
      id: 'q-4-exp-single-13',
      type: 'single-choice',
      knowledgePoint: 'kp-4-6',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `a = 7
b = 3
if a % b == 0:
    print('整除')
else:
    print('有余数')`,
      options: [
        '整除',
        '有余数',
        'True',
        '程序报错'
      ],
      answer: 1,
      explanation: '7%3=1（7÷3=2余1），1!=0，条件不成立，输出"有余数"。'
    },
    {
      id: 'q-4-exp-single-14',
      type: 'single-choice',
      knowledgePoint: 'kp-4-3',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `a = int('12')
b = int(3.9)
c = a + b
print(c)`,
      options: [
        '15',
        '123.9',
        '16',
        '程序报错'
      ],
      answer: 0,
      explanation: "int('12')=12，int(3.9)=3（截断），12+3=15。"
    },
    {
      id: 'q-4-exp-single-15',
      type: 'single-choice',
      knowledgePoint: 'kp-4-7',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `n = 0
for i in range(5):
    n = n + i
    n = n * 2
print(n)`,
      options: [
        '10',
        '20',
        '26',
        '52'
      ],
      answer: 3,
      explanation: 'i=0: n=0+0=0, n=0*2=0; i=1: n=0+1=1, n=1*2=2; i=2: n=2+2=4, n=4*2=8; i=3: n=8+3=11, n=11*2=22; i=4: n=22+4=26, n=26*2=52。'
    },

    // ==================== 多选题（5题，每题3分，共15分）====================
    {
      id: 'q-4-exp-multi-1',
      type: 'multiple-choice',
      knowledgePoint: 'kp-4-4',
      score: 3,
      difficulty: 'hard',
      question: '【多选】下列哪些表达式的结果等于1？',
      code: null,
      options: [
        '5 // 4',
        '5 % 4',
        '2 ** 0',
        '3 % 2'
      ],
      answer: [0, 1, 2, 3],
      partialAnswer: [1],
      explanation: '5//4=1，5%4=1，2⁰=1，3%2=1。全部正确。'
    },
    {
      id: 'q-4-exp-multi-2',
      type: 'multiple-choice',
      knowledgePoint: 'kp-4-6',
      score: 3,
      difficulty: 'hard',
      question: '【多选】运行下列代码后，变量x的值为正数的有？',
      code: null,
      options: [
        `x = -5
if x > 0:
    x = x * 2
else:
    x = x * -1`,
        `x = 0
if x > 0:
    x = 1
else:
    x = -1`,
        `x = 10
if x > 5:
    x = x - 20
else:
    x = x + 20`,
        `x = -3
if x < 0:
    x = 0 - x
else:
    x = x - 1`
      ],
      answer: [0, 3],
      partialAnswer: [0],
      explanation: 'A: -5不大于0，x=-5*(-1)=5（正数）；B: x=0不大于0，x=-1（负数）；C: 10>5，x=10-20=-10（负数）；D: -3<0，x=0-(-3)=3（正数）。'
    },
    {
      id: 'q-4-exp-multi-3',
      type: 'multiple-choice',
      knowledgePoint: 'kp-4-7',
      score: 3,
      difficulty: 'hard',
      question: '【多选】下列代码中，循环执行完毕后变量s的值是10的有哪些？',
      code: null,
      options: [
        `s = 0
for i in range(5):
    s = s + 2`,
        `s = 0
for i in range(1, 5):
    s = s + i`,
        `s = 1
for i in range(4):
    s = s + 2`,
        `s = 0
for i in range(3):
    s = s + 3
s = s + 1`
      ],
      answer: [0, 1, 3],
      partialAnswer: [0],
      explanation: 'A: 0+2*5=10；B: 0+1+2+3+4=10；C: 1+2*4=9；D: 0+3*3=9，9+1=10。'
    },
    {
      id: 'q-4-exp-multi-4',
      type: 'multiple-choice',
      knowledgePoint: 'kp-4-11',
      score: 3,
      difficulty: 'hard',
      question: '【多选】下列哪些表达式的结果是True？',
      code: null,
      options: [
        '5 > 3',
        '3 != 5',
        '5 >= 5',
        '10 // 3 == 3'
      ],
      answer: [0, 1, 2, 3],
      partialAnswer: [0],
      explanation: '5>3是True；3!=5是True；5>=5是True；10//3=3，3==3是True。全部正确。'
    },
    {
      id: 'q-4-exp-multi-5',
      type: 'multiple-choice',
      knowledgePoint: 'kp-4-12',
      score: 3,
      difficulty: 'hard',
      question: '【多选】运行下列代码后，输出结果包含"优秀"的有？',
      code: null,
      options: [
        `n = 95
if n >= 90:
    print('优秀')`,
        `n = 90
if n > 90:
    print('优秀')
elif n >= 85:
    print('良好')`,
        `n = 100
if n >= 90:
    print('优秀')`,
        `n = 89
if n >= 90:
    print('优秀')
else:
    print('加油')`
      ],
      answer: [0, 2],
      partialAnswer: [0],
      explanation: 'A: 95>=90成立输出优秀；B: 90>90不成立，90>=85成立输出良好；C: 100>=90成立输出优秀；D: 89>=90不成立输出加油。'
    },

    // ==================== 编程题（4题，共55分）====================
    {
      id: 'q-4-exp-coding-1',
      type: 'coding',
      knowledgePoint: 'kp-4-4',
      score: 10,
      difficulty: 'hard',
      question: '小明去书店买书，一本书15元，如果他买n本，总价可以打9折。请编写程序，输入购买数量n，输出实际需要支付的金额（整数）。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '2', expectedOutput: '27' },
        { input: '5', expectedOutput: '67' },
        { input: '10', expectedOutput: '135' }
      ],
      scoringRules: {
        fullScore: 10,
        partialScores: [
          { condition: '能获取输入并转换', score: 2 },
          { condition: '能正确计算总价', score: 4 },
          { condition: '能正确应用折扣', score: 4 },
          { condition: '完全正确', score: 10 }
        ]
      },
      referenceAnswer: `n = input()
n = int(n)
total = n * 15 * 0.9
print(int(total))`,
      explanation: '每本15元，买n本总价为n*15，打9折后为n*15*0.9。2本书：2*15*0.9=27元。'
    },
    {
      id: 'q-4-exp-coding-2',
      type: 'coding',
      knowledgePoint: 'kp-4-5',
      score: 10,
      difficulty: 'hard',
      question: '请编写程序，输入学生的姓名和成绩，输出"___同学的成绩是___分"（用字符串拼接完成）。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '小明\n95', expectedOutput: '小明同学的成绩是95分' },
        { input: '小红\n88', expectedOutput: '小红同学的成绩是88分' }
      ],
      scoringRules: {
        fullScore: 10,
        partialScores: [
          { condition: '能获取输入', score: 3 },
          { condition: '能将数字转为字符串', score: 3 },
          { condition: '能正确拼接输出', score: 4 },
          { condition: '完全正确', score: 10 }
        ]
      },
      referenceAnswer: `name = input()
score = input()
print(name + '同学的成绩是' + score + '分')`,
      explanation: '使用字符串拼接，将姓名、"同学的成绩是"、成绩、"分"拼接成完整句子。'
    },
    {
      id: 'q-4-exp-coding-3',
      type: 'coding',
      knowledgePoint: 'kp-4-6',
      score: 15,
      difficulty: 'hard',
      question: '出租车计费规则：3公里以内（包含3公里）收费13元，超过3公里的部分每公里收费2.5元。请编写程序，输入行驶公里数n（整数），输出需要支付的金额（整数，四舍五入）。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '3', expectedOutput: '13' },
        { input: '5', expectedOutput: '18' },
        { input: '10', expectedOutput: '31' }
      ],
      scoringRules: {
        fullScore: 15,
        partialScores: [
          { condition: '能获取输入并转换', score: 3 },
          { condition: '能判断公里数范围', score: 5 },
          { condition: '能正确计算', score: 7 },
          { condition: '完全正确', score: 15 }
        ]
      },
      referenceAnswer: `n = input()
n = int(n)
if n <= 3:
    print(13)
else:
    price = 13 + (n - 3) * 2.5
    print(int(price + 0.5))`,
      explanation: '3公里内13元，超过3公里部分2.5元/公里。5公里：13+(5-3)*2.5=18元；10公里：13+(10-3)*2.5=30.5≈31元。'
    },
    {
      id: 'q-4-exp-coding-4',
      type: 'coding',
      knowledgePoint: 'kp-4-7',
      score: 20,
      difficulty: 'hard',
      question: '请编写程序，使用for循环计算1到n的所有奇数的和。输入正整数n，输出1到n（包含n）的所有奇数的和。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '10', expectedOutput: '25' },
        { input: '7', expectedOutput: '16' },
        { input: '1', expectedOutput: '1' }
      ],
      scoringRules: {
        fullScore: 20,
        partialScores: [
          { condition: '能获取输入', score: 3 },
          { condition: '能使用for循环', score: 7 },
          { condition: '能判断奇数', score: 5 },
          { condition: '完全正确', score: 20 }
        ]
      },
      referenceAnswer: `n = input()
n = int(n)
total = 0
for i in range(1, n + 1):
    if i % 2 == 1:
        total = total + i
print(total)`,
      explanation: '循环1到n，用i%2==1判断奇数，累加求和。1+3+5+7+9=25。'
    }
  ],

  distribution: {
    byType: {
      'single-choice': { count: 15, totalScore: 30 },
      'multiple-choice': { count: 5, totalScore: 15 },
      'coding': { count: 4, totalScore: 55 }
    },
    byKnowledgePoint: {
      'kp-4-1': { count: 0, totalScore: 0 },
      'kp-4-2': { count: 0, totalScore: 0 },
      'kp-4-3': { count: 1, totalScore: 2 },
      'kp-4-4': { count: 4, totalScore: 17 },
      'kp-4-5': { count: 3, totalScore: 14 },
      'kp-4-6': { count: 4, totalScore: 22 },
      'kp-4-7': { count: 6, totalScore: 31 },
      'kp-4-8': { count: 2, totalScore: 4 },
      'kp-4-9': { count: 0, totalScore: 0 },
      'kp-4-10': { count: 0, totalScore: 0 },
      'kp-4-11': { count: 2, totalScore: 5 },
      'kp-4-12': { count: 2, totalScore: 5 }
    },
    byDifficulty: {
      'easy': 0,
      'medium': 0,
      'hard': 24
    }
  }
}

export default practiceSet
