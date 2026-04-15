/**
 * YCL五级基础练习（三）
 *
 * 本套卷包含：单选题15题（每题2分，共30分）
 *             多选题5题（每题3分，共15分）
 *             编程题4题（共55分）
 * 总分：100分  时长：90分钟
 *
 * 编程题覆盖：kp-5-4(split), kp-5-5(列表修改), kp-5-6(for嵌套),
 *             kp-5-8(类型转换), kp-5-9(枚举法)
 */

export const practiceSet = {
  meta: {
    id: 'level5-basic-3',
    level: 'level5',
    difficulty: 'basic',
    name: '五级基础练习（三）',
    description: '列表操作与循环嵌套',
    duration: 90,
    totalScore: 100,
    createdAt: '2026-04-05',
    version: '2.0'
  },

  questions: [
    // ==================== 单选题（15题，每题2分，共30分）====================
    // 模块3：列表操作与循环嵌套（8题）
    {
      id: 'q-5-3-single-1',
      type: 'single-choice',
      knowledgePoint: 'kp-5-6',
      score: 2,
      difficulty: 'easy',
      question: '运行下列代码，一共输出几个星号？',
      code: `count = 0
for i in range(3):
    for j in range(4):
        count = count + 1
print(count)`,
      options: [
        '7',
        '10',
        '12',
        '24'
      ],
      answer: 2,
      explanation: '外层循环3次，每次内层循环4次，共3×4=12次。'
    },
    {
      id: 'q-5-3-single-2',
      type: 'single-choice',
      knowledgePoint: 'kp-5-8',
      score: 2,
      difficulty: 'easy',
      question: "运行下列代码，输出结果是？",
      code: `a = '3.14'
b = float(a)
print(b + 1)`,
      options: [
        '3.141',
        '4.14',
        '4',
        '程序报错'
      ],
      answer: 1,
      explanation: "float('3.14')转为浮点数3.14，3.14+1=4.14。"
    },
    {
      id: 'q-5-3-single-3',
      type: 'single-choice',
      knowledgePoint: 'kp-5-11',
      score: 2,
      difficulty: 'easy',
      question: '已知 nums = [12, 8, 15, 4]，想要对 nums 中的元素从小到大排序，得到 [4, 8, 12, 15]，正确的选项是？',
      code: null,
      options: [
        'nums = sorted(nums)',
        'sorted(nums)',
        'nums = sorted',
        'sorted(nums) = nums'
      ],
      answer: 0,
      explanation: 'sorted()函数可对列表元素排序，默认从小到大。nums = sorted(nums)能实现将nums从小到大排序并赋值给nums。'
    },
    {
      id: 'q-5-3-single-4',
      type: 'single-choice',
      knowledgePoint: 'kp-5-12',
      score: 2,
      difficulty: 'easy',
      question: '运行下列代码，输出结果是？',
      code: `print('A', 'B', 'C', sep='-')`,
      options: [
        'A B C',
        'A-B-C',
        'ABC',
        'A B-C'
      ],
      answer: 1,
      explanation: "sep='-'指定分隔符为横线，多个参数之间用横线连接，输出A-B-C。"
    },
    {
      id: 'q-5-3-single-5',
      type: 'single-choice',
      knowledgePoint: 'kp-5-13',
      score: 2,
      difficulty: 'medium',
      question: "已知 fruits = ['5', '9', '12']，下列哪个选项的值是 [5, 9, 12]？",
      code: null,
      options: [
        'int(x) for x in fruits',
        '[int(x) for x in fruits]',
        '[x for x in fruits]',
        '[for int(x) in fruits]'
      ],
      answer: 1,
      explanation: '要将列表中的字符串元素转为整数并组成新列表，需要使用列表推导式[int(x) for x in fruits]。'
    },
    {
      id: 'q-5-3-single-6',
      type: 'single-choice',
      knowledgePoint: 'kp-5-12',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，输出结果是？',
      code: `for i in range(3):
    print(i, end=' ')`,
      options: [
        '0 1 2',
        '0 1 2 （末尾有空格）',
        '0\n1\n2',
        '012'
      ],
      answer: 1,
      explanation: "end=' '指定末尾用空格替代换行，输出'0 1 2 '（末尾有空格）。"
    },
    {
      id: 'q-5-3-single-7',
      type: 'single-choice',
      knowledgePoint: 'kp-5-11',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，输出结果是？',
      code: `a = [3, 1, 4, 1, 5]
b = sorted(a)
print(a)`,
      options: [
        '[1, 1, 3, 4, 5]',
        '[3, 1, 4, 1, 5]',
        '[5, 4, 3, 1, 1]',
        '程序报错'
      ],
      answer: 1,
      explanation: 'sorted()返回新列表，不修改原列表。原列表a不变，仍是[3, 1, 4, 1, 5]。'
    },
    {
      id: 'q-5-3-single-8',
      type: 'single-choice',
      knowledgePoint: 'kp-5-13',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，输出结果是？',
      code: `result = [i for i in range(5) if i % 2 == 1]
print(result)`,
      options: [
        '[0, 2, 4]',
        '[1, 3]',
        '[1, 3, 5]',
        '[0, 1, 2, 3, 4]'
      ],
      answer: 1,
      explanation: '列表推导式筛选奇数，range(5)中的奇数为1和3。'
    },

    // 模块1：字符串和列表的综合应用（4题）
    {
      id: 'q-5-3-single-9',
      type: 'single-choice',
      knowledgePoint: 'kp-5-1',
      score: 2,
      difficulty: 'medium',
      question: "运行下列代码，输出结果是？",
      code: `s = 'ABCDE'
print(s[1] + s[3])`,
      options: [
        'AD',
        'BD',
        'AC',
        'BE'
      ],
      answer: 1,
      explanation: "'ABCDE'中s[1]='B', s[3]='D', 'B'+'D'='BD'。"
    },
    {
      id: 'q-5-3-single-10',
      type: 'single-choice',
      knowledgePoint: 'kp-5-5',
      score: 2,
      difficulty: 'medium',
      question: "运行下列代码，输出结果是？",
      code: `a = [1, 2, 3]
a.pop()
print(a)`,
      options: [
        '[1, 2, 3]',
        '[1, 2]',
        '[2, 3]',
        '程序报错'
      ],
      answer: 1,
      explanation: 'pop()移除并返回列表的最后一个元素，移除3后列表变为[1, 2]。'
    },
    {
      id: 'q-5-3-single-11',
      type: 'single-choice',
      knowledgePoint: 'kp-5-5',
      score: 2,
      difficulty: 'medium',
      question: "运行下列代码，输出结果是？",
      code: `a = [10, 20, 30, 40]
a.remove(20)
print(a)`,
      options: [
        '[10, 20, 30, 40]',
        '[10, 30, 40]',
        '[20, 30, 40]',
        '[10, 20, 40]'
      ],
      answer: 1,
      explanation: 'remove(20)移除列表中第一个值为20的元素，列表变为[10, 30, 40]。'
    },
    {
      id: 'q-5-3-single-12',
      type: 'single-choice',
      knowledgePoint: 'kp-5-2',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，输出结果是？',
      code: `nums = [10, 20, 30]
print(sum(nums))`,
      options: [
        '3',
        '30',
        '60',
        '20'
      ],
      answer: 2,
      explanation: 'sum()计算列表中所有元素的总和，10+20+30=60。'
    },

    // 模块2：字典、集合与循环控制（3题）
    {
      id: 'q-5-3-single-13',
      type: 'single-choice',
      knowledgePoint: 'kp-5-9',
      score: 2,
      difficulty: 'hard',
      question: '使用枚举法找出满足 a + b + c = 6 的正整数组合（a、b、c都从1到5），共有多少组？',
      code: null,
      options: [
        '8组',
        '10组',
        '12组',
        '15组'
      ],
      answer: 1,
      explanation: '满足条件的组合有10组：(1,1,4), (1,2,3), (1,3,2), (1,4,1), (2,1,3), (2,2,2), (2,3,1), (3,1,2), (3,2,1), (4,1,1)。'
    },
    {
      id: 'q-5-3-single-14',
      type: 'single-choice',
      knowledgePoint: 'kp-5-7',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `for i in range(10):
    if i % 2 == 0:
        continue
    print(i)`,
      options: [
        '0 2 4 6 8',
        '1 3 5 7 9',
        '0 1 2 3 4 5 6 7 8 9',
        '没有输出'
      ],
      answer: 1,
      explanation: '偶数时continue跳过，只输出奇数，即1,3,5,7,9。'
    },
    {
      id: 'q-5-3-single-15',
      type: 'single-choice',
      knowledgePoint: 'kp-5-15',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码，输出结果是？',
      code: `d = {'a': 1, 'b': 2, 'c': 3}
print(d['b'])`,
      options: [
        'a',
        'b',
        '2',
        '程序报错'
      ],
      answer: 2,
      explanation: "d['b']访问字典中键'b'对应的值，即2。"
    },

    // ==================== 多选题（5题，每题3分，共15分）====================
    {
      id: 'q-5-3-multi-1',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-5',
      score: 3,
      difficulty: 'easy',
      question: "【多选】已知 a = [1, 2, 3]，下列哪些操作执行后 a 的值为 [1, 2, 3, 4]？",
      code: null,
      options: [
        'a.append(4)',
        'a.insert(3, 4)',
        'a = a + [4]',
        'a + 4'
      ],
      answer: [0, 1, 2],
      partialAnswer: [0],
      explanation: 'append末尾添加4；insert(3,4)在索引3处插入4；a+[4]创建新列表[1,2,3,4]。a+4会报错。'
    },
    {
      id: 'q-5-3-multi-2',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-4',
      score: 3,
      difficulty: 'medium',
      question: "【多选】下列哪些代码运行后会得到列表？",
      code: null,
      options: [
        "'1,2,3'.split(',')",
        "'hello world'.split()",
        "'ABC'.split(',')",
        "list('ABC')"
      ],
      answer: [0, 1, 2, 3],
      partialAnswer: [0],
      explanation: "split()总返回列表。A:['1','2','3']；B:['hello','world']；C:['ABC']；D:list('ABC')=['A','B','C']。全部正确。"
    },
    {
      id: 'q-5-3-multi-3',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-6',
      score: 3,
      difficulty: 'medium',
      question: '【多选】下列哪些代码的输出行数为3？',
      code: null,
      options: [
        'for i in range(3):\n    print(i)',
        'for i in range(1, 4):\n    print(i)',
        'for i in range(3):\n    for j in range(2):\n        print(i)',
        'for i in range(2):\n    for j in range(2):\n        print(i, j)'
      ],
      answer: [0, 1],
      partialAnswer: [0],
      explanation: 'A: 3行；B: 3行；C: 3×2=6行；D: 2×2=4行。'
    },
    {
      id: 'q-5-3-multi-4',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-11',
      score: 3,
      difficulty: 'medium',
      question: '【多选】下列关于排序的说法，正确的有哪些？',
      code: null,
      options: [
        'sort()会修改原列表',
        'sorted()会返回新列表',
        'sort()可以设置reverse=True进行降序',
        'sorted()只能排数字不能排字符串'
      ],
      answer: [0, 1, 2],
      partialAnswer: [0],
      explanation: 'sort()原地排序修改原列表；sorted()返回新列表；都可以用reverse=True降序；sorted()也能排字符串。'
    },
    {
      id: 'q-5-3-multi-5',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-12',
      score: 3,
      difficulty: 'medium',
      question: '【多选】下列哪些代码的输出结果包含换行？',
      code: null,
      options: [
        "print('A')",
        "print('A', end='')",
        "print('A', end='\\n')",
        "print('A', 'B', sep='\\n')"
      ],
      answer: [0, 2, 3],
      partialAnswer: [0],
      explanation: "A默认换行；B用end=''不换行；C用end='\\n'显式换行；D用sep='\\n'在A和B之间换行且末尾默认换行。"
    },

    // ==================== 编程题（4题，共55分）====================
    // Q1: kp-5-5(列表修改)
    {
      id: 'q-5-3-coding-1',
      type: 'coding',
      knowledgePoint: 'kp-5-5',
      score: 10,
      difficulty: 'easy',
      question: '输入一组数字用逗号分隔（如"1,2,3,4"），将列表中每个元素乘以2后，计算所有元素的和并输出。',
      codeTemplate: `# 请在下方编写代码
`,
      testCases: [
        { input: '1,2,3,4', expectedOutput: '20' },
        { input: '5,10,15', expectedOutput: '60' }
      ],
      scoringRules: {
        fullScore: 10,
        partialScores: [
          { condition: '能获取输入并分割', score: 3 },
          { condition: '能修改列表元素（乘以2）', score: 4 },
          { condition: '完全正确', score: 10 }
        ]
      },
      referenceAnswer: `s = input()
nums = [int(x) for x in s.split(',')]
nums = [x * 2 for x in nums]
print(sum(nums))`,
      explanation: '分割字符串转为整数列表，每个元素乘以2，用sum()求和。本题融合了列表修改、类型转换和统计命令。'
    },
    // Q2: kp-5-1(索引) + kp-5-4(split) + kp-5-8(类型转换)
    {
      id: 'q-5-3-coding-2',
      type: 'coding',
      knowledgePoint: 'kp-5-1',
      score: 10,
      difficulty: 'easy',
      question: '输入5个数字用逗号分隔（如"1,5,3,9,2"），请输出第3个数字（索引为2的元素）和最后一个数字（索引为-1的元素），两个数字用空格分隔。',
      codeTemplate: `# 请在下方编写代码
`,
      testCases: [
        { input: '1,5,3,9,2', expectedOutput: '3 2' },
        { input: '10,20,30,40,50', expectedOutput: '30 50' }
      ],
      scoringRules: {
        fullScore: 10,
        partialScores: [
          { condition: '能获取输入并分割', score: 3 },
          { condition: '能使用正索引访问元素', score: 3 },
          { condition: '能使用负索引访问元素', score: 4 },
          { condition: '完全正确', score: 10 }
        ]
      },
      referenceAnswer: `s = input()
nums = s.split(',')
print(nums[2], nums[-1])`,
      explanation: '用split分割字符串得到列表，nums[2]访问第3个元素，nums[-1]访问最后一个元素。本题融合了正索引、负索引和字符串分割三个知识点。'
    },
    // Q3: kp-5-3(while循环) + kp-5-7(break) + kp-5-6(for嵌套)
    {
      id: 'q-5-3-coding-3',
      type: 'coding',
      knowledgePoint: 'kp-5-3',
      score: 15,
      difficulty: 'medium',
      question: '请编写程序，使用嵌套循环输出一个n行4列的星号矩形（n由输入决定）。当n为0时，使用break跳出循环，不输出任何内容。',
      codeTemplate: `# 请在下方编写代码
`,
      testCases: [
        { input: '3', expectedOutput: '****\n****\n****' },
        { input: '2', expectedOutput: '****\n****' },
        { input: '0', expectedOutput: '' }
      ],
      scoringRules: {
        fullScore: 15,
        partialScores: [
          { condition: '能获取输入', score: 3 },
          { condition: '能使用嵌套循环', score: 5 },
          { condition: '能使用break跳出循环', score: 4 },
          { condition: '完全正确', score: 15 }
        ]
      },
      referenceAnswer: `n = int(input())
for i in range(n):
    if n == 0:
        break
    for j in range(4):
        print('*', end='')
    print()`,
      explanation: '获取行数n，使用嵌套循环输出星号矩形。当n=0时不输出。本题融合了while循环思想、break和for循环嵌套。'
    },
    // Q4: kp-5-9(枚举法) + kp-5-6(for嵌套)
    {
      id: 'q-5-3-coding-4',
      type: 'coding',
      knowledgePoint: 'kp-5-9',
      score: 20,
      difficulty: 'medium',
      question: '请编写程序，输入一个整数n，使用枚举法找出所有满足 a + b = n 且 a < b 的正整数组合数（a从1到n-1，b从1到n-1）。',
      codeTemplate: `# 请在下方编写代码
`,
      testCases: [
        { input: '10', expectedOutput: '4' },
        { input: '7', expectedOutput: '3' }
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
for a in range(1, n):
    for b in range(1, n):
        if a + b == n and a < b:
            count = count + 1
print(count)`,
      explanation: '用双重循环枚举a和b，判断a+b=n且a<b，统计满足条件的组合数。本题融合了枚举法和for循环嵌套。'
    }
  ],

  distribution: {
    byType: {
      'single-choice': { count: 15, totalScore: 30 },
      'multiple-choice': { count: 5, totalScore: 15 },
      'coding': { count: 4, totalScore: 55 }
    },
    byKnowledgePoint: {
      // 编程题：Q1(kp-5-5,10分), Q2(kp-5-1,10分), Q3(kp-5-3,15分), Q4(kp-5-9,20分)
      'kp-5-1': { count: 2, totalScore: 12 },   // single-9, coding-Q2
      'kp-5-2': { count: 2, totalScore: 4 },    // single-12
      'kp-5-3': { count: 2, totalScore: 17 },   // single-5, coding-Q3
      'kp-5-4': { count: 2, totalScore: 7 },    // single-4, multi-2, coding-Q2融合
      'kp-5-5': { count: 4, totalScore: 18 },   // single-10,11, multi-1, coding-Q1
      'kp-5-6': { count: 3, totalScore: 22 },   // single-1, multi-3, coding-Q3融合, coding-Q4
      'kp-5-7': { count: 2, totalScore: 17 },   // single-14, coding-Q3融合
      'kp-5-8': { count: 3, totalScore: 6 },    // single-2, coding-Q2融合
      'kp-5-9': { count: 2, totalScore: 22 },   // single-13, coding-Q4
      'kp-5-11': { count: 3, totalScore: 7 },   // single-3,7, multi-4
      'kp-5-12': { count: 3, totalScore: 8 },   // single-4,6, multi-5
      'kp-5-13': { count: 2, totalScore: 4 },   // single-5,8
      'kp-5-15': { count: 1, totalScore: 2 }    // single-15
    },
    byDifficulty: {
      'easy': 8,
      'medium': 11,
      'hard': 5
    }
  }
}

export default practiceSet
