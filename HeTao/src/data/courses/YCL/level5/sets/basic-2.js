/**
 * YCL五级基础练习（二）
 *
 * 本套卷包含：单选题15题（每题2分，共30分）
 *             多选题5题（每题3分，共15分）
 *             编程题4题（共55分）
 * 总分：100分  时长：90分钟
 *
 * 编程题覆盖：kp-5-1(索引), kp-5-2(统计), kp-5-3(while), kp-5-4(split),
 *             kp-5-6(for嵌套), kp-5-7(break), kp-5-8(类型转换), kp-5-9(枚举法)
 */

export const practiceSet = {
  meta: {
    id: 'level5-basic-2',
    level: 'level5',
    difficulty: 'basic',
    name: '五级基础练习（二）',
    description: '字典、集合与循环控制',
    duration: 90,
    totalScore: 100,
    createdAt: '2026-04-05',
    version: '2.0'
  },

  questions: [
    // ==================== 单选题（15题，每题2分，共30分）====================
    // 模块2：字典、集合与循环控制（8题）
    {
      id: 'q-5-2-single-1',
      type: 'single-choice',
      knowledgePoint: 'kp-5-3',
      score: 2,
      difficulty: 'easy',
      question: '运行下列代码，输出结果是？',
      code: `n = 1
while n <= 3:
    print(n)
    n = n + 1`,
      options: [
        '1 2 3',
        '0 1 2',
        '1 2 3 4',
        '无限循环'
      ],
      answer: 0,
      explanation: 'n从1开始，每次加1，当n<=3时输出n。输出1、2、3后n变为4，循环结束。'
    },
    {
      id: 'q-5-2-single-2',
      type: 'single-choice',
      knowledgePoint: 'kp-5-7',
      score: 2,
      difficulty: 'easy',
      question: '运行下列代码，输出结果是？',
      code: `for i in range(5):
    if i == 3:
        continue
    print(i)`,
      options: [
        '0 1 2 3 4',
        '0 1 2 4',
        '0 1 2',
        '3'
      ],
      answer: 1,
      explanation: '当i=3时执行continue跳过本次循环，不输出3。最终输出0,1,2,4。'
    },
    {
      id: 'q-5-2-single-3',
      type: 'single-choice',
      knowledgePoint: 'kp-5-15',
      score: 2,
      difficulty: 'easy',
      question: "运行下列代码，输出结果是？",
      code: `d = {'name': '小明', 'age': 10}
print(d['age'])`,
      options: [
        'name',
        'age',
        '10',
        "{'name': '小明', 'age': 10}"
      ],
      answer: 2,
      explanation: "d['age']访问字典中键'age'对应的值，即10。"
    },
    {
      id: 'q-5-2-single-4',
      type: 'single-choice',
      knowledgePoint: 'kp-5-14',
      score: 2,
      difficulty: 'easy',
      question: '运行下列代码，输出结果是？',
      code: `s = {1, 2, 2, 3, 3, 3}
print(len(s))`,
      options: [
        '6',
        '3',
        '1',
        '程序报错'
      ],
      answer: 1,
      explanation: '集合中的元素是唯一的，{1, 2, 2, 3, 3, 3}去重后为{1, 2, 3}，共3个元素。'
    },
    {
      id: 'q-5-2-single-5',
      type: 'single-choice',
      knowledgePoint: 'kp-5-3',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，输出结果是？',
      code: `total = 0
n = 1
while n <= 5:
    total = total + n
    n = n + 1
print(total)`,
      options: [
        '10',
        '15',
        '5',
        '无限循环'
      ],
      answer: 1,
      explanation: '循环累加1到5，1+2+3+4+5=15。'
    },
    {
      id: 'q-5-2-single-6',
      type: 'single-choice',
      knowledgePoint: 'kp-5-7',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，输出结果是？',
      code: `h = ['苹果', '香蕉', '橙子', '葡萄', '西瓜']
for j in h:
    if j == '橙子':
        print('找到水果')
        break`,
      options: [
        '橙子',
        '找到水果',
        'break',
        '没有输出'
      ],
      answer: 1,
      explanation: "代码遍历列表h，当j等于'橙子'时，执行print('找到水果')并break。"
    },
    {
      id: 'q-5-2-single-7',
      type: 'single-choice',
      knowledgePoint: 'kp-5-15',
      score: 2,
      difficulty: 'medium',
      question: '厨师制作蛋糕，把所需材料及用量记录在字典d中。以下代码运行结果是？',
      code: `d = {'糖': 100, '鸡蛋': 3}
d['糖'] = 80
print(d)`,
      options: [
        "{'糖': 100, '鸡蛋': 3}",
        "{'糖': 80, '鸡蛋': 3}",
        "{80, '鸡蛋': 3}",
        "{80, 3}"
      ],
      answer: 1,
      explanation: "字典d初始为{'糖': 100, '鸡蛋': 3}，然后通过d['糖'] = 80修改了键'糖'对应的值为80。"
    },
    {
      id: 'q-5-2-single-8',
      type: 'single-choice',
      knowledgePoint: 'kp-5-3',
      score: 2,
      difficulty: 'medium',
      question: '下列代码的运行结果是？',
      code: `i = 0
while i < 6:
    print('rabbit')`,
      options: [
        '没有输出',
        '输出6个"rabbit"',
        '输出1 2 3 4 5 6',
        '一直输出"rabbit"'
      ],
      answer: 3,
      explanation: 'while循环的条件是i < 6，初始i=0，但循环体中没有改变i值的语句，i始终小于6，循环会无限执行。'
    },

    // 模块1：字符串和列表的综合应用（4题）
    {
      id: 'q-5-2-single-9',
      type: 'single-choice',
      knowledgePoint: 'kp-5-1',
      score: 2,
      difficulty: 'medium',
      question: "已知 s = 'PYTHON'，下列哪个索引能取到字母'O'？",
      code: null,
      options: [
        's[4]',
        's[5]',
        's[-1]',
        's[3]'
      ],
      answer: 0,
      explanation: "'PYTHON'中O的索引是4（正索引）和-2（负索引）。s[5]是'N'，s[3]是'H'。"
    },
    {
      id: 'q-5-2-single-10',
      type: 'single-choice',
      knowledgePoint: 'kp-5-4',
      score: 2,
      difficulty: 'medium',
      question: "运行下列代码，输出结果是？",
      code: `s = 'A-B-C-D'
result = s.split('-')
print(result)`,
      options: [
        "['ABCD']",
        "['A', 'B', 'C', 'D']",
        "'ABCD'",
        "['A-B-C-D']"
      ],
      answer: 1,
      explanation: "split('-')按横线分割字符串，返回列表['A', 'B', 'C', 'D']。"
    },
    {
      id: 'q-5-2-single-11',
      type: 'single-choice',
      knowledgePoint: 'kp-5-2',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，输出结果是？',
      code: `a = [3, 1, 4, 1, 5]
print(len(a))`,
      options: [
        '3',
        '5',
        '14',
        '4'
      ],
      answer: 1,
      explanation: 'len()返回列表中元素的个数，列表a有5个元素。'
    },
    {
      id: 'q-5-2-single-12',
      type: 'single-choice',
      knowledgePoint: 'kp-5-5',
      score: 2,
      difficulty: 'medium',
      question: "运行下列代码，输出结果是？",
      code: `fruits = ['苹果', '香蕉']
fruits.append('橙子')
print(fruits)`,
      options: [
        "['苹果', '香蕉']",
        "['苹果', '香蕉', '橙子']",
        "['橙子', '苹果', '香蕉']",
        "程序报错"
      ],
      answer: 1,
      explanation: "append()方法在列表末尾添加元素，添加'橙子'后列表变为['苹果', '香蕉', '橙子']。"
    },

    // 模块3：列表操作与循环嵌套（3题）
    {
      id: 'q-5-2-single-13',
      type: 'single-choice',
      knowledgePoint: 'kp-5-6',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，输出结果是？',
      code: `for i in range(2):
    for j in range(2):
        print(i, j)`,
      options: [
        '0 0\n0 1\n1 0\n1 1',
        '0 0\n1 1',
        '0 1\n0 1',
        '2 2'
      ],
      answer: 0,
      explanation: '外层循环i取0,1，内层循环j取0,1。输出(0,0)(0,1)(1,0)(1,1)。'
    },
    {
      id: 'q-5-2-single-14',
      type: 'single-choice',
      knowledgePoint: 'kp-5-8',
      score: 2,
      difficulty: 'medium',
      question: "运行下列代码，输出结果是？",
      code: `a = 123
b = str(a)
print(b + '456')`,
      options: [
        '579',
        '123456',
        "'123456'",
        '程序报错'
      ],
      answer: 1,
      explanation: "str(123)将整数转为字符串'123'，'123'+'456'='123456'。"
    },
    {
      id: 'q-5-2-single-15',
      type: 'single-choice',
      knowledgePoint: 'kp-5-9',
      score: 2,
      difficulty: 'hard',
      question: '使用枚举法找出满足 a × b = 6 的正整数组合（a和b都从1到6），共有多少组？',
      code: null,
      options: [
        '2组',
        '3组',
        '4组',
        '6组'
      ],
      answer: 2,
      explanation: '满足条件的组合有：(1,6), (2,3), (3,2), (6,1)，共4组。'
    },

    // ==================== 多选题（5题，每题3分，共15分）====================
    {
      id: 'q-5-2-multi-1',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-7',
      score: 3,
      difficulty: 'easy',
      question: '【多选】下列关于break和continue的说法，正确的有哪些？',
      code: null,
      options: [
        'break会立即结束整个循环',
        'continue会跳过本次循环，继续下一次',
        'break和continue可以在循环外使用',
        'break可以用在for循环和while循环中'
      ],
      answer: [0, 1, 3],
      partialAnswer: [0],
      explanation: 'break结束整个循环、continue跳过本次、两者都可用于for和while。但只能在循环内使用。'
    },
    {
      id: 'q-5-2-multi-2',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-1',
      score: 3,
      difficulty: 'easy',
      question: "【多选】已知 s = 'PYTHON'，下列哪些索引能取到字母'O'？",
      code: null,
      options: [
        's[4]',
        's[-2]',
        's[5]',
        's[3]'
      ],
      answer: [0, 1],
      partialAnswer: [0],
      explanation: "'PYTHON'中O的索引是4（正索引）和-2（负索引）。s[5]是'N'，s[3]是'H'。"
    },
    {
      id: 'q-5-2-multi-3',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-3',
      score: 3,
      difficulty: 'medium',
      question: '【多选】下列哪些while循环会执行循环体？',
      code: null,
      options: [
        'x = 5\nwhile x > 0:\n    print(x)\n    x -= 1',
        'x = 0\nwhile x > 0:\n    print(x)',
        'while True:\n    print("hello")\n    break',
        'x = 5\nwhile x:\n    print(x)\n    x -= 1'
      ],
      answer: [0, 2, 3],
      partialAnswer: [0],
      explanation: 'A: x=5>0执行；B: x=0不>0不执行；C: True为真执行；D: x=5非0为真执行。'
    },
    {
      id: 'q-5-2-multi-4',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-2',
      score: 3,
      difficulty: 'medium',
      question: "【多选】已知 s = 'banana'，下列哪些表达式的值是正确的？",
      code: null,
      options: [
        "s.count('a') 的值是 3",
        "len(s) 的值是 6",
        "s.count('b') 的值是 2",
        "s.count('n') 的值是 2"
      ],
      answer: [0, 1, 3],
      partialAnswer: [0],
      explanation: "'banana'中：a出现3次，长度为6，b出现1次不是2次，n出现2次。"
    },
    {
      id: 'q-5-2-multi-5',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-14',
      score: 3,
      difficulty: 'medium',
      question: '【多选】下列关于集合的说法，正确的有哪些？',
      code: null,
      options: [
        '集合中的元素是唯一的，会自动去重',
        '集合使用花括号{}创建',
        '集合中的元素是有序的',
        '空集合可以用{}或set()创建'
      ],
      answer: [0, 1],
      partialAnswer: [0],
      explanation: '集合元素唯一、用{}创建、元素无序、空集合只能用set()创建（{}是空字典）。'
    },

    // ==================== 编程题（4题，共55分）====================
    // Q1: kp-5-5(列表修改) + kp-5-1(索引) + kp-5-4(split)
    {
      id: 'q-5-2-coding-1',
      type: 'coding',
      knowledgePoint: 'kp-5-5',
      score: 10,
      difficulty: 'easy',
      question: '已知一个列表存储了5名学生的成绩，格式为"85,92,78,90,88"（用逗号分隔）。请编写程序，输入这串成绩和要修改的位置（从1开始），将该位置的成绩改为100，最后输出修改后的列表。',
      codeTemplate: `# 请在下方编写代码
`,
      testCases: [
        { input: '85,92,78,90,88\n2', expectedOutput: "['85', '100', '78', '90', '88']" },
        { input: '60,70,80,90,100\n5', expectedOutput: "['60', '70', '80', '90', '100']" }
      ],
      scoringRules: {
        fullScore: 10,
        partialScores: [
          { condition: '能获取输入并分割', score: 3 },
          { condition: '能通过索引修改列表元素', score: 4 },
          { condition: '完全正确', score: 10 }
        ]
      },
      referenceAnswer: `s = input()
pos = int(input())
scores = s.split(',')
scores[pos - 1] = '100'
print(scores)`,
      explanation: '用split分割字符串得到列表，通过索引scores[pos-1]修改指定位置的元素。本题融合了列表修改、索引和字符串分割三个知识点。'
    },
    // Q2: kp-5-2(统计) + kp-5-8(类型转换)
    {
      id: 'q-5-2-coding-2',
      type: 'coding',
      knowledgePoint: 'kp-5-2',
      score: 10,
      difficulty: 'easy',
      question: '输入一行用逗号分隔的数字字符串（如"10,20,30,40,50"），请编写程序计算这些数字的平均值。',
      codeTemplate: `# 请在下方编写代码
`,
      testCases: [
        { input: '10,20,30,40,50', expectedOutput: '30.0' },
        { input: '1,2,3,4', expectedOutput: '2.5' }
      ],
      scoringRules: {
        fullScore: 10,
        partialScores: [
          { condition: '能获取输入并分割', score: 2 },
          { condition: '能使用int()转换类型', score: 4 },
          { condition: '能正确计算平均值', score: 4 },
          { condition: '完全正确', score: 10 }
        ]
      },
      referenceAnswer: `s = input()
nums = s.split(',')
total = 0
for n in nums:
    total = total + int(n)
print(total / len(nums))`,
      explanation: '用split分割字符串，遍历列表用int()转为整数并求和，最后除以元素个数得到平均值。本题融合了统计命令和类型转换两个知识点。'
    },
    // Q3: kp-5-7(break/continue) + kp-5-3(while)
    {
      id: 'q-5-2-coding-3',
      type: 'coding',
      knowledgePoint: 'kp-5-7',
      score: 15,
      difficulty: 'medium',
      question: '小明在收集卡片，每次输入一个正整数代表卡片上的数字（字符串类型需转换为整数），当输入0时停止收集。请编写程序，使用while循环获取输入，当输入为0时用break跳出循环，最后输出收集到的卡片数字之和。',
      codeTemplate: `# 请在下方编写代码
`,
      testCases: [
        { input: '5\n3\n2\n0', expectedOutput: '10' },
        { input: '10\n20\n0', expectedOutput: '30' }
      ],
      scoringRules: {
        fullScore: 15,
        partialScores: [
          { condition: '能使用int()转换类型', score: 3 },
          { condition: '能使用while循环', score: 5 },
          { condition: '能使用break跳出循环', score: 4 },
          { condition: '完全正确', score: 15 }
        ]
      },
      referenceAnswer: `total = 0
while True:
    n = int(input())
    if n == 0:
        break
    total = total + n
print(total)`,
      explanation: '使用int()将字符串转为整数，while True循环获取输入，当输入为0时用break跳出循环。本题融合了while循环、break和类型转换三个知识点。'
    },
    // Q4: kp-5-9(枚举法) + kp-5-6(for循环嵌套)
    {
      id: 'q-5-2-coding-4',
      type: 'coding',
      knowledgePoint: 'kp-5-9',
      score: 20,
      difficulty: 'medium',
      question: '请编写程序，输入一个整数n，使用枚举法找出所有满足 a × b = n 的正整数组合数（a从1到n，b从1到n）。',
      codeTemplate: `# 请在下方编写代码
`,
      testCases: [
        { input: '6', expectedOutput: '4' },
        { input: '12', expectedOutput: '6' }
      ],
      scoringRules: {
        fullScore: 20,
        partialScores: [
          { condition: '能获取输入', score: 4 },
          { condition: '能使用双重循环枚举', score: 8 },
          { condition: '完全正确', score: 20 }
        ]
      },
      referenceAnswer: `n = int(input())
count = 0
for a in range(1, n + 1):
    for b in range(1, n + 1):
        if a * b == n:
            count = count + 1
print(count)`,
      explanation: '用双重循环枚举a和b，判断a*b是否等于n，统计满足条件的组合数。本题融合了枚举法和for循环嵌套。'
    }
  ],

  distribution: {
    byType: {
      'single-choice': { count: 15, totalScore: 30 },
      'multiple-choice': { count: 5, totalScore: 15 },
      'coding': { count: 4, totalScore: 55 }
    },
    byKnowledgePoint: {
      // 编程题：Q1(kp-5-5,10分), Q2(kp-5-2,10分), Q3(kp-5-7,15分), Q4(kp-5-9,20分)
      'kp-5-1': { count: 1, totalScore: 3 },    // single-9, multi-2
      'kp-5-2': { count: 3, totalScore: 15 },   // single-11, multi-4, coding-Q2
      'kp-5-3': { count: 5, totalScore: 25 },   // single-1,5,8, multi-3, coding-Q3
      'kp-5-4': { count: 2, totalScore: 4 },    // single-10
      'kp-5-5': { count: 2, totalScore: 12 },   // single-12, coding-Q1
      'kp-5-6': { count: 1, totalScore: 2 },    // single-13
      'kp-5-7': { count: 3, totalScore: 20 },   // single-2,6, multi-1, coding-Q3
      'kp-5-8': { count: 2, totalScore: 12 },   // single-14, coding-Q3
      'kp-5-9': { count: 2, totalScore: 22 },   // single-15, coding-Q4
      'kp-5-14': { count: 2, totalScore: 5 },   // single-4, multi-5
      'kp-5-15': { count: 2, totalScore: 6 }    // single-3,7
    },
    byDifficulty: {
      'easy': 8,
      'medium': 12,
      'hard': 4
    }
  }
}

export default practiceSet
