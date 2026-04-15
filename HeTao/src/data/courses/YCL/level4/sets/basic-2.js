/**
 * YCL四级基础练习（二）
 *
 * 本套卷包含：单选题15题（每题2分，共30分）
 *             多选题5题（每题3分，共15分）
 *             编程题4题（共55分）
 * 总分：100分  时长：90分钟
 */

export const practiceSet = {
  meta: {
    id: 'level4-basic-2',
    level: 'level4',
    difficulty: 'basic',
    name: '四级基础练习（二）',
    description: '涵盖四级必考知识点的基础练习',
    duration: 90,
    totalScore: 100,
    createdAt: '2026-03-31',
    version: '1.0'
  },

  questions: [
    // ==================== 单选题（15题，每题2分，共30分）====================
    {
      id: 'q-4-2-single-1',
      type: 'single-choice',
      knowledgePoint: 'kp-4-1',
      score: 2,
      difficulty: 'easy',
      question: '下列哪个选项可以正确输出数字100？',
      code: null,
      options: [
        'print(100)',
        'print 100',
        'Print(100)',
        'print(100'
      ],
      answer: 0,
      explanation: 'print()函数用于输出，括号内放数字100即可，注意函数名小写、括号成对。'
    },
    {
      id: 'q-4-2-single-2',
      type: 'single-choice',
      knowledgePoint: 'kp-4-4',
      score: 2,
      difficulty: 'easy',
      question: '运行下列程序，输出结果是？',
      code: `a = 100
b = 35
print(a - b)`,
      options: [
        'a - b',
        '135',
        '65',
        '10035'
      ],
      answer: 2,
      explanation: 'a=100，b=35，a-b=65。'
    },
    {
      id: 'q-4-2-single-3',
      type: 'single-choice',
      knowledgePoint: 'kp-4-4',
      score: 2,
      difficulty: 'easy',
      question: '运行下列代码，输出结果是？',
      code: 'print(3 * 7)',
      options: [
        '3 * 7',
        '37',
        '21',
        '10'
      ],
      answer: 2,
      explanation: '3*7=21，乘法运算。'
    },
    {
      id: 'q-4-2-single-4',
      type: 'single-choice',
      knowledgePoint: 'kp-4-3',
      score: 2,
      difficulty: 'easy',
      question: '运行下列代码，输出结果是？',
      code: `a = '12'
b = int(a) + 3
print(b)`,
      options: [
        '123',
        '12',
        '15',
        '程序报错'
      ],
      answer: 2,
      explanation: "int('12')将字符串'12'转为整数12，12+3=15。"
    },
    {
      id: 'q-4-2-single-5',
      type: 'single-choice',
      knowledgePoint: 'kp-4-2',
      score: 2,
      difficulty: 'easy',
      question: '运行下列代码，输入"8"，输出结果是？',
      code: `a = input()
b = int(a)
print(b * 2)`,
      options: [
        '88',
        '16',
        'a * 2',
        '程序报错'
      ],
      answer: 1,
      explanation: '输入"8"，int("8")转为整数8，8*2=16。'
    },
    {
      id: 'q-4-2-single-6',
      type: 'single-choice',
      knowledgePoint: 'kp-4-4',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，输出结果是？',
      code: 'print(15 // 4)',
      options: [
        '3',
        '3.75',
        '4',
        '3.5'
      ],
      answer: 0,
      explanation: '//是整除运算，15//4=3（只保留整数部分）。'
    },
    {
      id: 'q-4-2-single-7',
      type: 'single-choice',
      knowledgePoint: 'kp-4-4',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，输出结果是？',
      code: 'print(17 % 5)',
      options: [
        '3',
        '2',
        '3.4',
        '5'
      ],
      answer: 1,
      explanation: '%是取余运算，17÷5=3余2，所以17%5=2。'
    },
    {
      id: 'q-4-2-single-8',
      type: 'single-choice',
      knowledgePoint: 'kp-4-5',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，输出结果是？',
      code: `name = '小明'
age = '10'
print(name + '今年' + age + '岁')`,
      options: [
        '小明今年10岁',
        '小明+今年+10+岁',
        '程序报错',
        'name今年age岁'
      ],
      answer: 0,
      explanation: '所有变量都是字符串类型，使用+拼接后输出"小明今年10岁"。'
    },
    {
      id: 'q-4-2-single-9',
      type: 'single-choice',
      knowledgePoint: 'kp-4-9',
      score: 2,
      difficulty: 'medium',
      question: '下列哪个选项的值是字符串类型？',
      code: null,
      options: [
        '123',
        '12 + 3',
        "'123'",
        'int(123)'
      ],
      answer: 2,
      explanation: "有引号包裹的是字符串，'123'是字符串类型。"
    },
    {
      id: 'q-4-2-single-10',
      type: 'single-choice',
      knowledgePoint: 'kp-4-7',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，输出结果是？',
      code: `for i in range(1, 4):
    print(i)`,
      options: [
        '0 1 2',
        '1 2 3',
        '1 2 3 4',
        '0 1 2 3'
      ],
      answer: 1,
      explanation: 'range(1, 4)生成1、2、3，循环依次输出。'
    },
    {
      id: 'q-4-2-single-11',
      type: 'single-choice',
      knowledgePoint: 'kp-4-6',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输入"60"，输出结果是？',
      code: `score = input()
score = int(score)
if score >= 60:
    print('及格')
else:
    print('不及格')`,
      options: [
        '及格',
        '不及格',
        '60',
        '程序报错'
      ],
      answer: 0,
      explanation: '输入60，条件60>=60成立，执行if分支输出"及格"。'
    },
    {
      id: 'q-4-2-single-12',
      type: 'single-choice',
      knowledgePoint: 'kp-4-7',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `s = 0
for i in range(4):
    s = s + 2
print(s)`,
      options: [
        '6',
        '8',
        '4',
        '2'
      ],
      answer: 1,
      explanation: '循环4次，每次s加2，0+2+2+2+2=8。'
    },
    {
      id: 'q-4-2-single-13',
      type: 'single-choice',
      knowledgePoint: 'kp-4-11',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `a = 5
b = 8
print(a > b)`,
      options: [
        'True',
        'False',
        '5 > 8',
        '程序报错'
      ],
      answer: 1,
      explanation: '5>8不成立，比较结果为False。'
    },
    {
      id: 'q-4-2-single-14',
      type: 'single-choice',
      knowledgePoint: 'kp-4-8',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `x = 10
x = x + 5
x = x * 2
print(x)`,
      options: [
        '20',
        '30',
        '25',
        '15'
      ],
      answer: 1,
      explanation: 'x初始为10，加5后x=15，乘2后x=30。'
    },
    {
      id: 'q-4-2-single-15',
      type: 'single-choice',
      knowledgePoint: 'kp-4-12',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `n = 75
if n >= 90:
    print('优秀')
elif n >= 60:
    print('良好')
else:
    print('不及格')`,
      options: [
        '优秀',
        '良好',
        '不及格',
        '75'
      ],
      answer: 1,
      explanation: '75>=90不成立，75>=60成立，执行elif分支输出"良好"。'
    },

    // ==================== 多选题（5题，每题3分，共15分）====================
    {
      id: 'q-4-2-multi-1',
      type: 'multiple-choice',
      knowledgePoint: 'kp-4-4',
      score: 3,
      difficulty: 'easy',
      question: '【多选】下列哪些表达式的计算结果是20？',
      code: null,
      options: [
        '4 * 5',
        '25 - 5',
        '10 + 10',
        '100 // 6'
      ],
      answer: [0, 1, 2],
      partialAnswer: [0, 1],
      explanation: '4*5=20，25-5=20，10+10=20。100//6=16（整除），不是20。'
    },
    {
      id: 'q-4-2-multi-2',
      type: 'multiple-choice',
      knowledgePoint: 'kp-4-2',
      score: 3,
      difficulty: 'easy',
      question: '【多选】下列关于input()的说法，正确的是哪些？',
      code: null,
      options: [
        'input()可以获取用户从键盘输入的内容',
        "input()返回的结果是字符串类型",
        'input()的结果可以直接做数学运算',
        'input()的括号里可以写提示文字'
      ],
      answer: [0, 1, 3],
      partialAnswer: [0],
      explanation: 'input()获取键盘输入、返回字符串、括号内可写提示。但返回的是字符串，不能直接做数学运算。'
    },
    {
      id: 'q-4-2-multi-3',
      type: 'multiple-choice',
      knowledgePoint: 'kp-4-5',
      score: 3,
      difficulty: 'medium',
      question: '【多选】运行下列哪些代码可以输出"HelloWorld"？',
      code: null,
      options: [
        "print('Hello' + 'World')",
        "print('Hello' + ' World')",
        "print('Hello'+'World')",
        "print('HelloWorld')"
      ],
      answer: [0, 2, 3],
      partialAnswer: [0],
      explanation: "A: 'Hello'+'World'='HelloWorld'；B中间多了空格；C与A相同；D直接输出。"
    },
    {
      id: 'q-4-2-multi-4',
      type: 'multiple-choice',
      knowledgePoint: 'kp-4-6',
      score: 3,
      difficulty: 'medium',
      question: '【多选】下列关于if-else的说法，正确的有哪些？',
      code: null,
      options: [
        'if后面要写条件',
        'if和else后面都要加冒号',
        'else后面也需要写条件',
        'if下级的代码要缩进'
      ],
      answer: [0, 1, 3],
      partialAnswer: [0],
      explanation: 'if后写条件、都要冒号、下级代码要缩进。else后面不需要写条件。'
    },
    {
      id: 'q-4-2-multi-5',
      type: 'multiple-choice',
      knowledgePoint: 'kp-4-7',
      score: 3,
      difficulty: 'medium',
      question: '【多选】下列哪些代码可以输出5个"加油"？',
      code: null,
      options: [
        `for i in range(5):
    print('加油')`,
        `for i in range(1, 6):
    print('加油')`,
        `for i in range(6):
    print('加油')`,
        `for i in range(2, 7):
    print('加油')`
      ],
      answer: [0, 1, 3],
      partialAnswer: [0],
      explanation: 'A: range(5)循环5次；B: range(1,6)循环5次；C: range(6)循环6次；D: range(2,7)循环5次。'
    },

    // ==================== 编程题（4题，共55分）====================
    {
      id: 'q-4-2-coding-1',
      type: 'coding',
      knowledgePoint: 'kp-4-4',
      score: 10,
      difficulty: 'easy',
      question: '小华的存钱罐里有25元，妈妈给了他n元零花钱。请编写程序，输入n，输出小华现在一共有多少钱。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '10', expectedOutput: '35' },
        { input: '30', expectedOutput: '55' }
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
print(25 + n)`,
      explanation: '获取输入转为整数，加25输出结果。'
    },
    {
      id: 'q-4-2-coding-2',
      type: 'coding',
      knowledgePoint: 'kp-4-5',
      score: 10,
      difficulty: 'easy',
      question: '小芳在学校参加了兴趣班，请你编写程序，输入兴趣班的名称，输出"小芳参加了___兴趣班"（用字符串拼接完成）。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '美术', expectedOutput: '小芳参加了美术兴趣班' },
        { input: '舞蹈', expectedOutput: '小芳参加了舞蹈兴趣班' }
      ],
      scoringRules: {
        fullScore: 10,
        partialScores: [
          { condition: '能获取输入', score: 3 },
          { condition: '能正确拼接输出', score: 7 },
          { condition: '完全正确', score: 10 }
        ]
      },
      referenceAnswer: `name = input()
print('小芳参加了' + name + '兴趣班')`,
      explanation: '使用字符串拼接，将前缀、输入内容和后缀拼接输出。'
    },
    {
      id: 'q-4-2-coding-3',
      type: 'coding',
      knowledgePoint: 'kp-4-6',
      score: 15,
      difficulty: 'medium',
      question: '学校考试满分100分，60分（包含60）及以上为及格。请编写程序，输入成绩score（整数），判断是否及格。如果及格输出"及格"，否则输出"不及格"。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '85', expectedOutput: '及格' },
        { input: '55', expectedOutput: '不及格' },
        { input: '60', expectedOutput: '及格' }
      ],
      scoringRules: {
        fullScore: 15,
        partialScores: [
          { condition: '能获取输入并转整数', score: 4 },
          { condition: '能使用if-else判断', score: 6 },
          { condition: '完全正确', score: 15 }
        ]
      },
      referenceAnswer: `score = input()
score = int(score)
if score >= 60:
    print('及格')
else:
    print('不及格')`,
      explanation: '获取成绩后转为整数，使用if-else判断是否达到60分，输出对应结果。'
    },
    {
      id: 'q-4-2-coding-4',
      type: 'coding',
      knowledgePoint: 'kp-4-7',
      score: 20,
      difficulty: 'medium',
      question: '小芳每天都要练习跳绳，她每分钟跳3下。请你编写程序，使用for循环输出5行"跳绳"。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '', expectedOutput: '跳绳\n跳绳\n跳绳\n跳绳\n跳绳' }
      ],
      scoringRules: {
        fullScore: 20,
        partialScores: [
          { condition: '能使用for循环', score: 10 },
          { condition: '完全正确', score: 20 }
        ]
      },
      referenceAnswer: `for i in range(5):
    print('跳绳')`,
      explanation: '使用for循环和range(5)重复5次输出"跳绳"。'
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
      'kp-4-2': { count: 2, totalScore: 5 },
      'kp-4-3': { count: 1, totalScore: 2 },
      'kp-4-4': { count: 6, totalScore: 21 },
      'kp-4-5': { count: 3, totalScore: 15 },
      'kp-4-6': { count: 3, totalScore: 20 },
      'kp-4-7': { count: 4, totalScore: 27 },
      'kp-4-8': { count: 1, totalScore: 2 },
      'kp-4-9': { count: 1, totalScore: 2 },
      'kp-4-10': { count: 0, totalScore: 0 },
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
