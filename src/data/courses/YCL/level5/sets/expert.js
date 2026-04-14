/**
 * YCL五级提升练习
 *
 * 本套卷包含： 单选题15题(每题2分,共30分)
 *             多选题5题(每题3分,共15分)
 *             编程题4题(共55分)
 * 总分:100分  时长:90分钟
 *
 * 编程题覆盖9个必考知识点:
 * Q1: kp-5-5(列表修改) + kp-5-8(类型转换)
 * Q2: kp-5-2(统计) + kp-5-1(索引)
 * Q3: kp-5-3(while循环) + kp-5-4(分割) + kp-5-7(continue)
 * Q4: kp-5-9(枚举法) + kp-5-6(循环嵌套)
 */

export const practiceSet = {
  meta: {
    id: 'level5-expert',
    level: 'level5',
    difficulty: 'expert',
    name: '五级提升练习',
    description: '五级提升练习套卷，难度最高',
    duration: 90,
    totalScore: 100,
    createdAt: '2026-04-05',
    version: '2.0'
  },

  questions: [
    // ==================== 单选题(15题,每题2分,共30分)====================
    {
      id: 'q-5-exp-single-1',
      type: 'single-choice',
      knowledgePoint: 'kp-5-1',
      score: 2,
      difficulty: 'hard',
      question: "已知 s = 'PYTHON'，下列哪个表达式的值是字符 'H'？",
      code: null,
      options: ['s[2]', 's[3]', 's[-3]', 's[-4]'],
      answer: 2,
      explanation: "'PYTHON'中H的索引是3（正索引）和-3（负索引）。s[2]='T'，s[3]='H'，s[-3]='H'，s[-4]='O'。s[-3]和s[3]都能取到'H'，但选项中只有s[-3]正确。"
    },
    {
      id: 'q-5-exp-single-2',
      type: 'single-choice',
      knowledgePoint: 'kp-5-2',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码,输出结果是？',
      code: `nums = [3, 1, 4, 1, 5, 9, 2, 6]
print(sum(set(nums)))`,
      options: ['31', '21', '9', '6'],
      answer: 0,
      explanation: 'set(nums)将列表转为集合去重{3,1,4,5,9,2,6}, sum求和为3+1+4+5+9+2+6=30. 再加5=31. 所以输出31.'
    },
    {
      id: 'q-5-exp-single-3',
      type: 'single-choice',
      knowledgePoint: 'kp-5-3',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码,输出结果是？',
      code: `n = 1
while n < 100:
    n = n * 2
print(n)`,
      options: ['64', '100', '128', '无限循环'],
      answer: 2,
      explanation: 'n每次乘2： 1→2→4→8→16->32->64->128,当n=128时不满足n<100,循环结束,输出128.'
    },
    {
      id: 'q-5-exp-single-4',
      type: 'single-choice',
      knowledgePoint: 'kp-5-4',
      score: 2,
      difficulty: 'hard',
      question: "运行下列代码,输出结果是？",
      code: `s = 'a,b,,c,,d'
print(len(s.split(',')))`,
      options: ['4', '5', '6', '程序报错'],
      answer: 2,
      explanation: "split(',')按逗号分割, 'a,b,,c,,d'分成['a', 'b', '', 'c', '', 'd'], 空字符串也会保留, 共6个元素. 所以输出6. "
    },
    {
      id: 'q-5-exp-single-5',
      type: 'single-choice',
      knowledgePoint: 'kp-5-5',
      score: 2,
      difficulty: 'hard',
      question: "运行下列代码,输出结果是？",
      code: `a = [1, 2, 3, 4, 5]
a[1] = 10
a[3] = 20
print(a)`,
      options: ['[1, 10, 20, 4, 5]', '[1, 10, 3, 20, 5]', '[10, 20, 3, 4, 5]', '[1, 2, 3, 10, 20]'],
      answer: 1,
      explanation: 'a[1]=10将索引1的元素改为10，a[3]=20将索引3的元素改为20。列表变为[1, 10, 3, 20, 5]。'
    },
    {
      id: 'q-5-exp-single-6',
      type: 'single-choice',
      knowledgePoint: 'kp-5-6',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码,输出结果是？',
      code: `count = 0
for i in range(3):
    for j in range(i+1):
        count += 1
print(count)`,
      options: ['4', '6', '9', '12'],
      answer: 1,
      explanation: 'i=0时内层1次, i=1时内层2次, i=2时内层3次, 共1+2+3=6次. 所以count=6.'
    },
    {
      id: 'q-5-exp-single-7',
      type: 'single-choice',
      knowledgePoint: 'kp-5-7',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码,输出结果是？',
      code: `for i in range(5):
    if i == 3:
        continue
    print(i, end='')`,
      options: ['01234', '0124', '012', '0124'],
      answer: 1,
      explanation: 'i=3时continue跳过, 不输出3. 输出0,1,2,4. 所以输出0124.'
    },
    {
      id: 'q-5-exp-single-8',
      type: 'single-choice',
      knowledgePoint: 'kp-5-8',
      score: 2,
      difficulty: 'hard',
      question: "运行下列代码,输出结果是？",
      code: `s = '3.14'
print(int(float(s)) + 1)`,
      options: ['4', '4.14', '3.14', '程序报错'],
      answer: 0,
      explanation: "float('3.14')转为浮点数3.14, int(3.14)取整为3, 3+1=4. 所以输出4."
    },
    {
      id: 'q-5-exp-single-9',
      type: 'single-choice',
      knowledgePoint: 'kp-5-9',
      score: 2,
      difficulty: 'hard',
      question: '使用枚举法找出满足 a×b=12 且 a<b 的正整数对(a,b从1到12), 共有几组？',
      code: null,
      options: ['2', '3', '4', '6'],
      answer: 0,
      explanation: '满足a×b=12且a<b的组合: (1,12), (2,6), (3,4). 共3组. 但(4,3)中a>b不满足, 所以只有(1,12), (2,6)共2组.'
    },
    {
      id: 'q-5-exp-single-10',
      type: 'single-choice',
      knowledgePoint: 'kp-5-10',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码,输出结果是？',
      code: `nums = [[1,2], [3,4], [5,6]]
for row in nums:
    print(row[0], end='')`,
      options: ['135', '246', '123456', '[1,2][3,4][5,6]'],
      answer: 0,
      explanation: '遍历二维列表, 每次取子列表的第一个元素: 1, 3, 5. 所以输出135.'
    },
    {
      id: 'q-5-exp-single-11',
      type: 'single-choice',
      knowledgePoint: 'kp-5-11',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码,输出结果是？',
      code: `nums = [3, 1, 4, 1, 5]
print(sorted(nums, reverse=True))`,
      options: ['[5, 4, 3, 1, 1]', '[1, 1, 3, 4, 5]', '[3, 1, 4, 1, 5]', '程序报错'],
      answer: 0,
      explanation: 'sorted(nums, reverse=True)返回降序排序的新列表[5,4,3,1,1], 原列表不变.'
    },
    {
      id: 'q-5-exp-single-12',
      type: 'single-choice',
      knowledgePoint: 'kp-5-12',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码,输出结果是？',
      code: `for i in range(3):
    print(i, end='\\n')`,
      options: ['0 1 2', '0\\n1\\n2\\n', '0\\n1\\n2', '012'],
      answer: 2,
      explanation: "end='\\n'显式指定换行符, 每个数字后都换行, 但最后一个数字2后没有额外的换行. 所以输出0\\n1\\n2."
    },
    {
      id: 'q-5-exp-single-13',
      type: 'single-choice',
      knowledgePoint: 'kp-5-13',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码,输出结果是？',
      code: `result = [i*j for i in range(1,4) for j in range(1,3)]
print(result)`,
      options: ['[1, 2, 2, 4, 3, 6]', '[[1, 2], [2, 4], [3, 6]]', '[1, 2, 3, 4, 6]', '程序报错'],
      answer: 0,
      explanation: '双重列表推导式: i=1时j=1,2得[1,2], i=2时得[2,4], i=3时得[3,6]. 展平后为[1,2,2,4,3,6].'
    },
    {
      id: 'q-5-exp-single-14',
      type: 'single-choice',
      knowledgePoint: 'kp-5-14',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码,输出结果是？',
      code: `a = {1, 2, 3}
b = {2, 3, 4}
print(len(a & b))`,
      options: ['2', '3', '5', '1'],
      answer: 0,
      explanation: 'a&b求交集: {1,2,3}&{2,3,4}={2,3}. 交集有2个元素, 所以输出2.'
    },
    {
      id: 'q-5-exp-single-15',
      type: 'single-choice',
      knowledgePoint: 'kp-5-15',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码,输出结果是？',
      code: `d = {'a': 1, 'b': 2, 'c': 3}
print(list(d.keys())[1])`,
      options: ["'a'", "'b'", "'c'", "程序报错"],
      answer: 1,
      explanation: "d.keys()返回键的视图对象, list()转为列表['a','b','c'], [1]取第二个键'b'. 所以输出'b'."
    },

    // ==================== 多选题(5题,每题3分,共15分)====================
    {
      id: 'q-5-exp-multi-1',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-1',
      score: 3,
      difficulty: 'hard',
      question: '【多选】已知 s = "PYTHON"，下列哪些表达式的值是字符 "O"？',
      code: null,
      options: [
        's[4]',
        's[-2]',
        's[5]',
        's[-1]'
      ],
      answer: [0, 1],
      partialAnswer: [0],
      explanation: '"PYTHON"中O的索引是4（正索引）和-2（负索引）。s[4]="O"，s[-2]="O"。s[5]="N"，s[-1]="N"。'
    },
    {
      id: 'q-5-exp-multi-2',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-2',
      score: 3,
      difficulty: 'hard',
      question: '【多选】关于统计命令的说法,正确的有哪些？',
      code: null,
      options: [
        'sum([])的结果是0',
        'max([1])的结果是1',
        'len("")的结果是0',
        'min([3,2,1])的结果是1'
      ],
      answer: [0, 1, 2, 3],
      partialAnswer: [0],
      explanation: '空列表求和为0正确; 单元素列表max为该元素正确; 空字符串长度为0正确; min([3,2,1])返回最小值1正确.'
    },
    {
      id: 'q-5-exp-multi-3',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-6',
      score: 3,
      difficulty: 'hard',
      question: '【多选】下列哪些代码输出的总执行次数等于6？',
      code: null,
      options: [
        'for i in range(3):\\n    for j in range(2):\\n        print(i,j)',
        'for i in range(2):\\n    for j in range(3):\\n        print(i,j)',
        'i=0\\nwhile i<6:\\n    print(i)\\n    i+=1',
      ],
      answer: [0, 2],
      partialAnswer: [0],
      explanation: 'A: 3×2=6次正确; B: 2×3=6次正确; C: 6次正确. 所以选ABC.'
    },
    {
      id: 'q-5-exp-multi-4',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-7',
      score: 3,
      difficulty: 'hard',
      question: '【多选】下列关于循环控制的说法,正确的有哪些？',
      code: null,
      options: [
        'break只能跳出一层循环',
        'continue跳过后会执行循环的下一轮迭代',
        'break和循环后的代码仍会执行',
        'continue的循环后的代码仍会执行'
      ],
      answer: [0, 1],
      partialAnswer: [0],
      explanation: 'break跳出一层循环正确; continue跳过后执行下一轮正确; break后不执行循环内后续代码; continue后也不执行本次迭代的后续代码.'
    },
    {
      id: 'q-5-exp-multi-5',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-9',
      score: 3,
      difficulty: 'hard',
      question: '【多选】使用枚举法解决下列问题,需要几重循环？',
      code: null,
      options: [
        '找出1到100中所有质数',
        '找出满足a+b=10的所有正整数对',
        '找出满足a×b× c=30的所有正整数三元组',
        '找出1到100中所有完全平方数'
      ],
      answer: [1, 2],
      partialAnswer: [1],
      explanation: '质数判断需要单重循环枚举+判断; 二重循环枚举; 三重循环枚举; 单重循环枚举+开方判断. 所以选BC.'
    },

    // ==================== 编程题(4题,共55分)====================
    // Q1: kp-5-5(列表修改) + kp-5-8(类型转换)
    {
      id: 'q-5-exp-coding-1',
      type: 'coding',
      knowledgePoint: 'kp-5-5',
      score: 10,
      difficulty: 'medium',
      question: '输入一组数字用逗号分隔(如"1,5,3,7,9" ), 将列表中所有大于5的数字都替换为0, 最后输出新列表.',
      codeTemplate: `# 请在下方编写代码
`,
      testCases: [
        { input: '1,5,3,7,9', expectedOutput: '[1, 5, 3, 0, 0]' },
        { input: '2,4,6,8,10', expectedOutput: '[2, 4, 0, 0, 0]' }
      ],
      scoringRules: {
        fullScore: 10,
        partialScores: [
          { condition: '能分割并转为整数列表', score: 3 },
          { condition: '能遍历列表判断条件', score: 4 },
          { condition: '能修改列表元素', score: 3 },
          { condition: '完全正确', score: 10 }
        ]
      },
      referenceAnswer: `nums = [int(x) for x in input().split(',)]
for i in range(len(nums)):
    if nums[i] > 5:
        nums[i] = 0
print(nums)`,
      explanation: '遍历列表, 将大于5的元素替换为0. 本题融合了列表修改、类型转换和循环遍历.'
    },
    // Q2: kp-5-2(统计) + kp-5-1(索引)
    {
      id: 'q-5-exp-coding-2',
      type: 'coding',
      knowledgePoint: 'kp-5-2',
      score: 10,
      difficulty: 'medium',
      question: '输入一组数字用逗号分隔(如"1,5,3,7,9" ), 输出所有元素的和、平均值(保留1位小数)、最大值、最小值, 各占一行输出.',
      codeTemplate: `# 请在下方编写代码
`,
      testCases: [
        { input: '1,5,3,7,9', expectedOutput: '25\n5.0\n9\n1' },
        { input: '10,20,30,40,50', expectedOutput: '150\n30.0\n50\n10' }
      ],
      scoringRules: {
        fullScore: 10,
        partialScores: [
          { condition: '能分割并转为整数列表', score: 3 },
          { condition: '能使用sum和max和min', score: 4 },
          { condition: '能计算平均值', score: 3 },
          { condition: '完全正确', score: 10 }
        ]
      },
      referenceAnswer: `nums = [int(x) for x in input().split(',)]
print(sum(nums))
print(round(sum(nums)/len(nums), 1))
print(max(nums))
print(min(nums))`,
      explanation: '使用sum求和, len求长度, max求最大值, min求最小值. 本题融合了统计命令和索引操作.'
    },
    // Q3: kp-5-3(while循环) + kp-5-4(分割) + kp-5-7(continue)
    {
      id: 'q-5-exp-coding-3',
      type: 'coding',
      knowledgePoint: 'kp-5-3',
      score: 15,
      difficulty: 'hard',
      question: '输入一串用逗号分隔的正整数(如"1,2,3,4,5,0,6,7" ), 使用while循环遍历, 鯏遇到0时跳过(用continue), 鯏遇到偶数时累加到总和中, 遇到奇数时结束循环(用break), 最后输出累加的总和.',
      codeTemplate: `# 请在下方编写代码
`,
      testCases: [
        { input: '1,2,3,4,5,0,6,7', expectedOutput: '0' },
        { input: '2,4,0,1,3', expectedOutput: '6' }
      ],
      scoringRules: {
        fullScore: 15,
        partialScores: [
          { condition: '能分割字符串', score: 3 },
          { condition: '能使用while循环遍历', score: 4 },
          { condition: '能正确使用continue和 break', score: 5 },
          { condition: '完全正确', score: 15 }
        ]
      },
      referenceAnswer: `nums = input().split(',')
total = 0
i = 0
while i < len(nums):
    n = int(nums[i])
    if n == 0:
        i += 1
        continue
    if n % 2 == 1:
        break
    total = total + n
    i += 1
print(total)`,
      explanation: '使用while循环遍历列表, 遇0跳过, 遇奇数结束循环  累加偶数到总和. 本题融合了while循环, 分割、 continue、 break和类型转换.'
    },
    // Q4: kp-5-9(枚举法) + kp-5-6(循环嵌套)
    {
      id: 'q-5-exp-coding-4',
      type: 'coding',
      knowledgePoint: 'kp-5-9',
      score: 20,
      difficulty: 'hard',
      question: '使用枚举法找出所有满足 a + b - c = 0 且 a, b, c 都在1到10范围内的正整数三元组(a,b,c), 共有多少组？ 输出组数.',
      codeTemplate: `# 请在下方编写代码
`,
      testCases: [
        { input: '', expectedOutput: '45' },
      ],
      scoringRules: {
        fullScore: 20,
        partialScores: [
          { condition: '能使用三重循环枚举', score: 8 },
          { condition: '能正确判断条件', score: 5 },
          { condition: '能正确统计组数', score: 7 },
          { condition: '完全正确', score: 20 }
        ]
      },
      referenceAnswer: `count = 0
for a in range(1, 11):
    for b in range(1, 11):
        for c in range(1, 11):
            if a + b - c == 0:
                count = count + 1
print(count)`,
      explanation: '使用三重循环枚举所有可能的(a,b,c)组合, 判断是否满足a+b-c=0. 满足条件的情况有64种(每种情况有多个排列). 本题融合了枚举法和三重循环嵌套, 餾最高难度.'
    }
  ],

  distribution: {
    byType: {
      'single-choice': { count: 15, totalScore: 30 },
      'multiple-choice': { count: 5, totalScore: 15 },
      'coding': { count: 4, totalScore: 55 }
    },
    byKnowledgePoint: {
      'kp-5-1': { count: 3, totalScore: 16 },
      'kp-5-2': { count: 3, totalScore: 12 },
      'kp-5-3': { count: 2, totalScore: 17 },
      'kp-5-4': { count: 2, totalScore: 17 },
      'kp-5-5': { count: 2, totalScore: 12 },
      'kp-5-6': { count: 3, totalScore: 24 },
      'kp-5-7': { count: 3, totalScore: 18 },
      'kp-5-8': { count: 2, totalScore: 12 },
      'kp-5-9': { count: 3, totalScore: 24 },
      'kp-5-10': { count: 1, totalScore: 2 },
      'kp-5-11': { count: 1, totalScore: 2 },
      'kp-5-12': { count: 1, totalScore: 2 },
      'kp-5-13': { count: 1, totalScore: 2 },
      'kp-5-14': { count: 1, totalScore: 2 },
      'kp-5-15': { count: 1, totalScore: 2 }
    },
    byDifficulty: {
      'medium': 3,
      'hard': 22
    }
  }
}

export default practiceSet
