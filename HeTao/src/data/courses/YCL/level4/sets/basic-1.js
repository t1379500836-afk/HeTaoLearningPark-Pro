/**
 * YCL四级基础练习（一）
 *
 * 本套卷包含：单选题15题（每题2分，共30分）
 *             多选题5题（每题3分，共15分）
 *             编程题4题（共55分）
 * 总分：100分  时长：90分钟
 */

export const practiceSet = {
  meta: {
    id: 'level4-basic-1',
    level: 'level4',
    difficulty: 'basic',
    name: '四级基础练习（一）',
    description: '涵盖四级必考知识点的基础练习',
    duration: 90,
    totalScore: 100,
    createdAt: '2026-03-28',
    version: '1.0'
  },

  questions: [
    // ==================== 单选题（15题，每题2分，共30分）====================
    {
      id: 'q-4-1-single-1',
      type: 'single-choice',
      knowledgePoint: 'kp-4-4',
      score: 2,
      difficulty: 'easy',
      question: '运行下列程序，输出结果是？',
      code: `a = 50
b = 30
print(a + b)`,
      options: [
        'a + b',
        '5030',
        '80',
        'ab'
      ],
      answer: 2,
      explanation: 'print()输出表达式a + b的值，a=50，b=30，相加结果为80。'
    },
    {
      id: 'q-4-1-single-2',
      type: 'single-choice',
      knowledgePoint: 'kp-4-8',
      score: 2,
      difficulty: 'easy',
      question: '妈妈买了50个气球，小红和小伙伴们一起玩的时候弄破了20个，后来又飞走了5个。下列代码的功能是输出最后的气球数量，b表示气球的数量，横线处填写下列哪个选项，可以表示飞走了5个气球这一情况？',
      code: `b = 50
b = b - 20  # 弄破了20个气球
_________   # 飞走了5个气球
print(b)`,
      options: [
        'b = 5',
        'b - 5',
        'b = b - 20',
        'b = b - 5'
      ],
      answer: 3,
      explanation: '飞走了5个气球，需要将b减少5，即b = b - 5。'
    },
    {
      id: 'q-4-1-single-3',
      type: 'single-choice',
      knowledgePoint: 'kp-4-4',
      score: 2,
      difficulty: 'easy',
      question: '小兔子有m个胡萝卜，第一天吃了其中的一半，第二天又吃了2个，还剩下3个胡萝卜，请问小兔子最初有几个胡萝卜？',
      code: null,
      options: [
        '10',
        '12',
        '14',
        '16'
      ],
      answer: 0,
      explanation: '第二天没吃之前有3+2=5个，第一天吃了一半后剩5个，所以最初有5×2=10个。'
    },
    {
      id: 'q-4-1-single-4',
      type: 'single-choice',
      knowledgePoint: 'kp-4-3',
      score: 2,
      difficulty: 'easy',
      question: '运行下列代码输出结果是什么？',
      code: `b = '88'
result = int(b) + 2
print(result)`,
      options: [
        '88',
        '882',
        '90',
        '程序报错'
      ],
      answer: 2,
      explanation: "int('88')将字符串'88'转为整数88，然后88+2=90。"
    },
    {
      id: 'q-4-1-single-5',
      type: 'single-choice',
      knowledgePoint: 'kp-4-2',
      score: 2,
      difficulty: 'easy',
      question: '运行下列代码，输入"5"，输出结果是什么？',
      code: `data = input()
print(data + 5)`,
      options: [
        '5',
        '10',
        '55',
        '程序报错'
      ],
      answer: 3,
      explanation: 'input()返回的是字符串类型，字符串不能直接和整数相加，会报错。'
    },
    {
      id: 'q-4-1-single-6',
      type: 'single-choice',
      knowledgePoint: 'kp-4-3',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，输入"14"，输出结果是什么？',
      code: `data = input()
print(int(data) * 2)`,
      options: [
        '28',
        '1414',
        '14',
        '程序报错'
      ],
      answer: 0,
      explanation: 'int(data)将输入的字符串"14"转为整数14，然后14*2=28。'
    },
    {
      id: 'q-4-1-single-7',
      type: 'single-choice',
      knowledgePoint: 'kp-4-1',
      score: 2,
      difficulty: 'medium',
      question: '下列哪个选项的代码可以输出"大熊猫"？',
      code: null,
      options: [
        'print()',
        'print(大熊猫)',
        "print('大熊猫')",
        "'大熊猫'"
      ],
      answer: 2,
      explanation: "print()命令用于输出，字符串需要加引号，正确写法是print('大熊猫')。"
    },
    {
      id: 'q-4-1-single-8',
      type: 'single-choice',
      knowledgePoint: 'kp-4-5',
      score: 2,
      difficulty: 'medium',
      question: '运行代码 print("欢迎"+"光临")，输出结果是？',
      code: null,
      options: [
        '欢迎',
        '光临',
        '欢迎+光临',
        '欢迎光临'
      ],
      answer: 3,
      explanation: '"+"用于拼接字符串，"欢迎"+"光临"结果为"欢迎光临"。'
    },
    {
      id: 'q-4-1-single-9',
      type: 'single-choice',
      knowledgePoint: 'kp-4-5',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，输入"企鹅"，输出结果是？',
      code: `a = input()
print(a + a)`,
      options: [
        '企鹅企鹅',
        '企鹅+企鹅',
        'aa',
        'a+a'
      ],
      answer: 0,
      explanation: '输入"企鹅"，变量a的值为字符串"企鹅"，a+a等价于"企鹅"+"企鹅"，结果为"企鹅企鹅"。'
    },
    {
      id: 'q-4-1-single-10',
      type: 'single-choice',
      knowledgePoint: 'kp-4-7',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，可以输出几行"团团圆圆"？',
      code: `for i in range(5):
    print('团团圆圆')`,
      options: [
        '3行',
        '4行',
        '5行',
        '6行'
      ],
      answer: 2,
      explanation: 'range(5)循环5次，每次输出1行"团团圆圆"，共5行。'
    },
    {
      id: 'q-4-1-single-11',
      type: 'single-choice',
      knowledgePoint: 'kp-4-7',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，可以输出几行"土拨鼠"？',
      code: `for i in range(3):
    print('土拨鼠')
    print('土拨鼠')
print('土拨鼠')`,
      options: [
        '3行',
        '4行',
        '6行',
        '7行'
      ],
      answer: 3,
      explanation: '循环3次，每次输出2行，共6行；循环结束后再输出1行，总共7行。'
    },
    {
      id: 'q-4-1-single-12',
      type: 'single-choice',
      knowledgePoint: 'kp-4-5',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `h = 's'
h = h + 'o'
h = h + 'o'
print(h)`,
      options: [
        's',
        'o',
        'soo',
        'so'
      ],
      answer: 2,
      explanation: "初始h='s'，第一次拼接后h='so'，第二次拼接后h='soo'。"
    },
    {
      id: 'q-4-1-single-13',
      type: 'single-choice',
      knowledgePoint: 'kp-4-8',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `f = 'h'
for i in range(5):
    f = f + 'a'
print(f)`,
      options: [
        'h',
        'a',
        'ha',
        'haaaaa'
      ],
      answer: 3,
      explanation: "初始f='h'，循环5次，每次在f后面拼接一个'a'，最终f='haaaaa'。"
    },
    {
      id: 'q-4-1-single-14',
      type: 'single-choice',
      knowledgePoint: 'kp-4-10',
      score: 2,
      difficulty: 'hard',
      question: '下列程序的功能是：如果输入的是"下雪"，就会输出"穿棉袄"。程序中的横线处应该填写？',
      code: `c = input()
if ________:
    print('穿棉袄')`,
      options: [
        'c',
        "'下雪'",
        'c = "下雪"',
        'c == "下雪"'
      ],
      answer: 3,
      explanation: '要判断输入是否为"下雪"，需要用==比较，即c == "下雪"。'
    },
    {
      id: 'q-4-1-single-15',
      type: 'single-choice',
      knowledgePoint: 'kp-4-6',
      score: 2,
      difficulty: 'hard',
      question: '某学校礼仪队正在招募志愿者，要求志愿者的身高必须达到160厘米（包含160）。运行下列程序，输入160，输出结果是？',
      code: `h = input()
h = int(h)
if h >= 160:
    print('符合')
else:
    print('不符合')`,
      options: [
        '符合',
        '不符合',
        '160',
        'h'
      ],
      answer: 0,
      explanation: '输入160，条件160>=160成立，执行if的下级代码，输出"符合"。'
    },

    // ==================== 多选题（5题，每题3分，共15分）====================
    {
      id: 'q-4-1-multi-1',
      type: 'multiple-choice',
      knowledgePoint: 'kp-4-2',
      score: 3,
      difficulty: 'easy',
      question: '【多选】运行程序 a = input()，下列说法中正确的有哪些？',
      code: null,
      options: [
        "输入100，则a的值是'100'",
        '输入100，则a的值是100',
        "输入hello，则a的值是'hello'",
        '无论输入什么，a的值都是字符串类型'
      ],
      answer: [0, 2, 3],
      partialAnswer: [0],
      explanation: 'input()获取的输入始终是字符串类型。'
    },
    {
      id: 'q-4-1-multi-2',
      type: 'multiple-choice',
      knowledgePoint: 'kp-4-4',
      score: 3,
      difficulty: 'easy',
      question: '【多选】执行下列代码，输出结果是30的选项有哪些？',
      code: null,
      options: [
        'print(3 * 10)',
        'print(5 * 8 - 10)',
        'print(25 + 5)',
        'print(6 * 5)'
      ],
      answer: [0, 1, 2, 3],
      partialAnswer: [0, 2],
      explanation: '四个选项的计算结果都是30：3*10=30，5*8-10=30，25+5=30，6*5=30。'
    },
    {
      id: 'q-4-1-multi-3',
      type: 'multiple-choice',
      knowledgePoint: 'kp-4-9',
      score: 3,
      difficulty: 'medium',
      question: '【多选】下列哪些选项是字符串？',
      code: null,
      options: [
        '2 + 3',
        "'2 + 3'",
        '"辞旧迎新"',
        '辞旧迎新'
      ],
      answer: [1, 2],
      partialAnswer: [1],
      explanation: "字符串是由一对英文单引号或双引号引起来的文本信息。'2 + 3'和\"辞旧迎新\"是字符串。"
    },
    {
      id: 'q-4-1-multi-4',
      type: 'multiple-choice',
      knowledgePoint: 'kp-4-1',
      score: 3,
      difficulty: 'medium',
      question: '【多选】下列哪些选项的代码可以打印出"new"？',
      code: null,
      options: [
        'print(new)',
        "print('new')",
        "print('N' + 'E' + 'W')",
        "print('n' + 'e' + 'w')"
      ],
      answer: [1, 3],
      partialAnswer: [1],
      explanation: "print('new')直接输出new，print('n'+'e'+'w')拼接后也是new。注意'N'+'E'+'W'结果是NEW（大写）。"
    },
    {
      id: 'q-4-1-multi-5',
      type: 'multiple-choice',
      knowledgePoint: 'kp-4-7',
      score: 3,
      difficulty: 'medium',
      question: '【多选】下面哪些代码可以输出4个"Good Luck"？',
      code: null,
      options: [
        `print('Good Luck')
for i in range(3):
    print('Good Luck')`,
        `for i in range(3):
    print('Good Luck')
print('Good Luck')`,
        `for i in range(4):
    print('Good Luck')`,
        `for i in range(3):
    print('Good Luck')`
      ],
      answer: [0, 1, 2],
      partialAnswer: [2],
      explanation: 'A选项：1+3=4个；B选项：3+1=4个；C选项：循环4次输出4个；D选项：循环3次输出3个。'
    },

    // ==================== 编程题（4题，共55分）====================
    {
      id: 'q-4-1-coding-1',
      type: 'coding',
      knowledgePoint: 'kp-4-4',
      score: 10,
      difficulty: 'easy',
      question: '小明原本有10颗糖果，妈妈又给了他n颗糖果，现在请你编程，输入妈妈给的糖果数量，输出小明现在一共有多少颗糖果。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '2', expectedOutput: '12' },
        { input: '4', expectedOutput: '14' }
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
print(10 + n)`,
      explanation: '获取输入后转为整数，然后加10输出结果。'
    },
    {
      id: 'q-4-1-coding-2',
      type: 'coding',
      knowledgePoint: 'kp-4-5',
      score: 10,
      difficulty: 'easy',
      question: '小明在学校参加了兴趣班，请你编写程序，输入兴趣班的名称，输出"小明参加了___兴趣班"（用字符串拼接完成）。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '美术', expectedOutput: '小明参加了美术兴趣班' },
        { input: '足球', expectedOutput: '小明参加了足球兴趣班' }
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
print('小明参加了' + name + '兴趣班')`,
      explanation: '使用字符串拼接，将前缀、输入内容和后缀拼接输出。'
    },
    {
      id: 'q-4-1-coding-3',
      type: 'coding',
      knowledgePoint: 'kp-4-6',
      score: 15,
      difficulty: 'medium',
      question: '游乐园的过山车项目要求身高达到120厘米（包含120）才能乘坐。请编写程序，输入身高h（整数），判断是否能乘坐。如果可以乘坐输出"可以乘坐"，否则输出"身高不足"。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '130', expectedOutput: '可以乘坐' },
        { input: '110', expectedOutput: '身高不足' },
        { input: '120', expectedOutput: '可以乘坐' }
      ],
      scoringRules: {
        fullScore: 15,
        partialScores: [
          { condition: '能获取输入并转整数', score: 4 },
          { condition: '能使用if-else判断', score: 6 },
          { condition: '完全正确', score: 15 }
        ]
      },
      referenceAnswer: `h = input()
h = int(h)
if h >= 120:
    print('可以乘坐')
else:
    print('身高不足')`,
      explanation: '获取身高后转为整数，使用if-else判断是否达到120厘米，输出对应结果。'
    },
    {
      id: 'q-4-1-coding-4',
      type: 'coding',
      knowledgePoint: 'kp-4-7',
      score: 20,
      difficulty: 'medium',
      question: '小L是一名园丁，他每周都会给花园里的植物浇水5次。请你编写程序，使用循环重复5次输出"浇水"。',
      codeTemplate: '# 请在下方编写代码\n',
      testCases: [
        { input: '', expectedOutput: '浇水\n浇水\n浇水\n浇水\n浇水' }
      ],
      scoringRules: {
        fullScore: 20,
        partialScores: [
          { condition: '能使用for循环', score: 10 },
          { condition: '完全正确', score: 20 }
        ]
      },
      referenceAnswer: `for i in range(5):
    print('浇水')`,
      explanation: '使用for循环和range(5)重复5次输出"浇水"。'
    }
  ],

  distribution: {
    byType: {
      'single-choice': { count: 15, totalScore: 30 },
      'multiple-choice': { count: 5, totalScore: 15 },
      'coding': { count: 4, totalScore: 55 }
    },
    byKnowledgePoint: {
      'kp-4-1': { count: 2, totalScore: 5 },
      'kp-4-2': { count: 2, totalScore: 5 },
      'kp-4-3': { count: 2, totalScore: 4 },
      'kp-4-4': { count: 4, totalScore: 17 },
      'kp-4-5': { count: 4, totalScore: 16 },
      'kp-4-6': { count: 2, totalScore: 17 },
      'kp-4-7': { count: 4, totalScore: 27 },
      'kp-4-8': { count: 2, totalScore: 4 },
      'kp-4-9': { count: 1, totalScore: 3 },
      'kp-4-10': { count: 1, totalScore: 2 }
    },
    byDifficulty: {
      'easy': 9,
      'medium': 10,
      'hard': 5
    }
  }
}

export default practiceSet
