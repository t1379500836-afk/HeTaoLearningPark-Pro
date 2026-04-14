/**
 * YCL五级进阶练习
 *
 * 本套卷包含： 单选题15题（每题2分，共30分)
 *             多选题5题(每题3分,共15分)
 *             编程题4题(共55分)
 * 总分：100分  时长:90分钟
 *
 * 编程题覆盖9个必考知识点:
 * Q1: kp-5-1(索引) + kp-5-4(split) + kp-5-2(统计)
 * Q2: kp-5-5(列表修改) + kp-5-6(循环嵌套)
 * Q3: kp-5-3(while循环) + kp-5-7(break) + kp-5-8(类型转换)
 * Q4: kp-5-9(枚举法) + kp-5-6(循环嵌套)
 */

export const practiceSet = {
  meta: {
    id: 'level5-advanced',
    level: 'level5',
    difficulty: 'advanced',
    name: '五级进阶练习',
    description: '五级进阶练习套卷，难度较高',
    duration: 90,
    totalScore: 100,
    createdAt: '2026-04-05',
    version: '2.0'
  },

  questions: [
    // ==================== 单选题（15题,每题2分,共30分)====================
    {
      id: 'q-5-adv-single-1',
      type: 'single-choice',
      knowledgePoint: 'kp-5-1',
      score: 2,
      difficulty: 'medium',
      question: "运行下列代码，输出结果是？",
      code: `s = 'ABCDEF'
print(s[-3])`,
      options: ['C', 'D', 'E', '程序报错'],
      answer: 1,
      explanation: "'ABCDEF'长度为6，s[-3]即s[6-3]=s[3]='D'。负索引-3表示倒数第3个字符。"
    },
    {
      id: 'q-5-adv-single-2',
      type: 'single-choice',
      knowledgePoint: 'kp-5-2',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码，输出结果是？',
      code: `nums = [1, 2, 3, 2, 1]
print(nums.count(2))`,
      options: ['1', '2', '3', '5'],
      answer: 1,
      explanation: 'count(2)统计列表中2出现的次数，列表中有2个22'
    },
    {
      id: 'q-5-adv-single-3',
      type: 'single-choice',
      knowledgePoint: 'kp-5-3',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码,输出结果是？',
      code: `n = 100
count = 0
while n > 1:
    n = n // 2
    count = count + 1
print(count)`,
      options: ['5', '6', '7', '50'],
      answer: 1,
      explanation: '100→50→25→12→6→3→1，共6次整除2操作。'
    },
    {
      id: 'q-5-adv-single-4',
      type: 'single-choice',
      knowledgePoint: 'kp-5-5',
      score: 2,
      difficulty: 'medium',
      question: "运行下列代码,输出结果是？",
      code: `a = [1, 2, 3, 2, 1]
a.remove(2)
print(a)`,
      options: ['[1, 3, 2, 1]', '[1, 3, 1]', '[1, 2, 3, 1]', '[3, 2, 1]'],
      answer: 0,
      explanation: 'remove(2)只移除第一个出现的2,列表变为[1, 3, 2, 1]。'
    },
    {
      id: 'q-5-adv-single-5',
      type: 'single-choice',
      knowledgePoint: 'kp-5-6',
      score: 2,
      difficulty: 'medium',
      question: '运行下列代码,输出结果是？',
      code: `for i in range(1, 4):
    for j in range(1, i + 1):
        print(j, end='')
    print()`,
      options: ['1\n12\n123', '1\n22\n333', '12\n123\n1234', '123\n123\n1234'],
      answer: 0,
      explanation: 'i=1时内层range(1,2)输出1；i=2时内层range(1,3)输出12；i=3时内层range(1,4)输出123。每行输出后自动换行。'
    },
    {
      id: 'q-5-adv-single-6',
      type: 'single-choice',
      knowledgePoint: 'kp-5-7',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码,输出结果是？',
      code: `total = 0
for i in range(1, 11):
    if i % 3 == 0:
        continue
    total = total + i
print(total)`,
      options: ['55', '37', '45', '27'],
      answer: 1,
      explanation: '跳过3的倍数(3,6,9),累加其余1+2+4+5+7+8+10=37。'
    },
    {
      id: 'q-5-adv-single-7',
      type: 'single-choice',
      knowledgePoint: 'kp-5-8',
      score: 2,
      difficulty: 'hard',
      question: "运行下列代码,输出结果是？",
      code: `a = 123
b = str(a)
print(b + '456')`,
      options: ['579', '123456', "'123456'", '程序报错'],
      answer: 1,
      explanation: "str(123)将整数转为字符串'123'，'123'+'456'进行字符串拼接，结果为'123456'。"
    },
    {
      id: 'q-5-adv-single-8',
      type: 'single-choice',
      knowledgePoint: 'kp-5-11',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码,输出结果是？',
      code: `nums = [5, 2, 8, 1]
nums.sort(reverse=True)
print(nums)`,
      options: ['[1, 2, 5, 8]', '[8, 5, 2, 1]', '[5, 2, 8, 1]', '程序报错'],
      answer: 1,
      explanation: 'sort(reverse=True)对列表进行降序排序,结果为[8, 5, 2, 1]。'
    },
    {
      id: 'q-5-adv-single-9',
      type: 'single-choice',
      knowledgePoint: 'kp-5-12',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码,输出结果是？',
      code: `print('2026', '03', '31', sep='/')`,
      options: ['2026 03 31', '2026/03/31', '20260331', '2026-03-31'],
      answer: 1,
      explanation: "sep='/'指定分隔符为斜线，输出2026/03/31。"
    },
    {
      id: 'q-5-adv-single-10',
      type: 'single-choice',
      knowledgePoint: 'kp-5-14',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码,输出结果是？',
      code: `a = {1, 2, 2, 3, 3, 3}
print(len(a))`,
      options: ['6', '3', '1', '程序报错'],
      answer: 1,
      explanation: '集合中的元素是唯一的，{1, 2, 2, 3, 3, 3}去重后为{1, 2, 3}，共3个元素。'
    },
    {
      id: 'q-5-adv-single-11',
      type: 'single-choice',
      knowledgePoint: 'kp-5-15',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码,输出结果是？',
      code: `d = {'x': 10, 'y': 20}
d['z'] = 30
print(len(d))`,
      options: ['2', '3', '4', '程序报错'],
      answer: 1,
      explanation: "字典初始有2个键值对， d['z']=30新增一个,共3个键值对. "
    },
    {
      id: 'q-5-adv-single-12',
      type: 'single-choice',
      knowledgePoint: 'kp-5-13',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码,输出结果是？',
      code: `result = [x * x for x in range(1, 5)]
print(result)`,
      options: ['[1, 2, 3, 4]', '[1, 4, 9, 16]', '[0, 1, 4, 9]', '[2, 4, 6, 8]'],
      answer: 1,
      explanation: 'range(1,5)生成1,2,3,4,每个元素平方得到[1, 4, 9, 16]。'
    },
    {
      id: 'q-5-adv-single-13',
      type: 'single-choice',
      knowledgePoint: 'kp-5-4',
      score: 2,
      difficulty: 'medium',
      question: "运行下列代码,输出结果是？",
      code: `s = '猫-狗-兔-鸟'
parts = s.split('-')
print(len(parts))`,
      options: ['2', '3', '4', '5'],
      answer: 2,
      explanation: "split('-')按横线分割,得到列表['猫', '狗', '兔', '鸟'],共4个元素。"
    },
    {
      id: 'q-5-adv-single-14',
      type: 'single-choice',
      knowledgePoint: 'kp-5-9',
      score: 2,
      difficulty: 'hard',
      question: '使用枚举法找出1到100中所有既能被3整除又能被5整除的数,共有几个？',
      code: null,
      options: ['5', '6', '7', '10'],
      answer: 1,
      explanation: '既能被3又能被5整除即能被15整除：15,30,45,60,75,90,共6个。'
    },
    {
      id: 'q-5-adv-single-15',
      type: 'single-choice',
      knowledgePoint: 'kp-5-10',
      score: 2,
      difficulty: 'hard',
      question: '运行下列代码,输出结果是？',
      code: `nums = [10, 20, 30, 40, 50]
total = 0
for n in nums:
    if n > 25:
        total = total + n
print(total)`,
      options: ['60', '90', '120', '150'],
      answer: 2,
      explanation: '遍历列表,大于25的元素是30,40,50,总和为30+40+50=120。'
    },

    // ==================== 多选题（5题,每题3分,共15分)====================
    {
      id: 'q-5-adv-multi-1',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-1',
      score: 3,
      difficulty: 'medium',
      question: '【多选】关于索引的说法，正确的有哪些？ (可能多个答案)',
      code: null,
      options: [
        's[-1]可以获取列表最后一个元素',
        '正索引从0开始,负索引从-1开始',
        '列表的索引可以是浮点数',
        '索引越界会报错'
      ],
      answer: [0, 1],
      partialAnswer: [0],
      explanation: 's[-1]获取最后一个元素正确;正索引从0开始,负索引从-1开始正确。索引只能是整数,浮点数会报错;索引越界确实会报错。'
    },
    {
      id: 'q-5-adv-multi-2',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-5',
      score: 3,
      difficulty: 'medium',
      question: '【多选】已知 a = [10, 20, 30, 40, 50]，下列哪些操作后列表长度不变? (可能多个答案)',
      code: null,
      options: [
        'a.append(60)',
        'a.pop()',
        'len(a)',
        'a[2] = 100'
      ],
      answer: [1, 2],
      partialAnswer: [1],
      explanation: 'append(60)后列表变为6个元素;长度改变; pop()移除最后一个元素后变为5个元素;长度改变。 len(a)返回5,长度不变; a[2]=100只是索引修改,长度不变. '
    },
    {
      id: 'q-5-adv-multi-3',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-6',
      score: 3,
      difficulty: 'hard',
      question: '【多选】下列哪些代码的输出行数为3行？(可能多个答案)',
      code: null,
      options: [
        'for i in range(3):\\n    print(i)',
        'for i in range(1, 4):\\n    print(i)',
        'for i in range(3):\\n    for j in range(2):\\n        print(i)',
        'for i in range(2):\\n    for j in range(2):\\n        print(i, j)'
      ],
      answer: [0, 1],
      partialAnswer: [0],
      explanation: 'A输出3行；B输出3行；C输出6行(3×2)；D输出4行(2×2)。所以选A和B'
    },
    {
      id: 'q-5-adv-multi-4',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-7',
      score: 3,
      difficulty: 'hard',
      question: '【多选】关于break和continue的说法，正确的有哪些？(可能多个答案)',
      code: null,
      options: [
        'break可以结束整个循环',
        'continue可以跳过本次循环',
        'break和continue可以在循环外使用',
        'break只能用于for循环，不能用于while循环'
      ],
      answer: [0, 1, 3],
      partialAnswer: [0],
      explanation: 'break结束整个循环; continue跳过本次循环. 两者都可用于for和while循环. 但只能在循环内使用.'
    },
    {
      id: 'q-5-adv-multi-5',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-9',
      score: 3,
      difficulty: 'hard',
      question: '【多选】使用枚举法解决下列问题，正确的有哪些？(可能多个答案)',
      code: null,
      options: [
        '枚举法需要遍历所有可能的情况',
        '枚举法通常使用循环结构实现',
        '枚举法可以找出所有满足条件的情况',
        '枚举法的时间复杂度一定比其他方法低'
      ],
      answer: [0, 1, 2],
      partialAnswer: [0],
      explanation: '枚举法需要遍历所有可能情况, 使用循环结构实现, 可以找出所有满足条件的情况. 时间复杂度较高但能有效解决问题.'
    },

    // ==================== 编程题(4题,共55分)====================
    // Q1: kp-5-1(索引) + kp-5-4(split) + kp-5-2(统计)
    {
      id: 'q-5-adv-coding-1',
      type: 'coding',
      knowledgePoint: 'kp-5-1',
      score: 10,
      difficulty: 'easy',
      question: '输入一个包含5个数字的列表(格式如"10,20,30,40,50"),使用split分割后,将每个元素转为整数,然后输出所有元素中的最大值。',
      codeTemplate: `# 请在下方编写代码
`,
      testCases: [
        { input: '10,20,30,40,50', expectedOutput: '50' },
        { input: '5,3,8,1,5', expectedOutput: '8' }
      ],
      scoringRules: {
        fullScore: 10,
        partialScores: [
          { condition: '能使用split分割字符串', score: 3 },
          { condition: '能将元素转为整数', score: 4 },
          { condition: '能使用max求最大值', score: 3 },
          { condition: '完全正确', score: 10 }
        ]
      },
      referenceAnswer: `s = input()
nums = [int(x) for x in s.split(',')]
print(max(nums))`,
      explanation: '使用split分割字符串， 列表推导式转换为整数列表, 用max()函数求最大值. 本题融合了索引、分割、类型转换和统计命令.4个知识点。'
    },
    // Q2: kp-5-5(列表修改) + kp-5-6(循环嵌套)
    {
      id: 'q-5-adv-coding-2',
      type: 'coding',
      knowledgePoint: 'kp-5-5',
      score: 10,
      difficulty: 'medium',
      question: '输入一组数字用逗号分隔(如"1,5,3,7,9"),找出其中的最小值,将其从列表中移除后,在剩余的数字中每个都加10,最后输出新列表。',
      codeTemplate: `# 请在下方编写代码
`,
      testCases: [
        { input: '1,5,3,7,9', expectedOutput: '[15, 13, 17, 19]' },
        { input: '5,2,8,1,6', expectedOutput: '[15, 12, 18, 16]' }
      ],
      scoringRules: {
        fullScore: 10,
        partialScores: [
          { condition: '能分割并找出最小值', score: 3 },
          { condition: '能正确移除元素', score: 4 },
          { condition: '能修改剩余元素', score: 3 },
          { condition: '完全正确', score: 10 }
        ]
      },
      referenceAnswer: `nums = [int(x) for x in input().split(',)]
nums.remove(min(nums))
for i in range(len(nums)):
    nums[i] += 10
print(nums)`,
      explanation: '找出最小值及其索引, 移除该元素, 遍历剩余元素加10. 本题融合了列表修改、循环嵌套+统计命令3个知识点。'
    },
    // Q3: kp-5-3(while循环) + kp-5-7(break) + kp-5-8(类型转换)
    {
      id: 'q-5-adv-coding-3',
      type: 'coding',
      knowledgePoint: 'kp-5-3',
      score: 15,
      difficulty: 'medium',
      question: '小明想存钱买玩具,初始有100元,他每次输入一个正整数表示购买的玩具价格(需转为整数),当输入0时表示购买结束。如果钱花完了输出"钱花完了"，否则继续购买. 请编写程序,计算小明一共花了多少钱?',
      codeTemplate: `# 请在下方编写代码
`,
      testCases: [
        { input: '20\n30\n0', expectedOutput: '50' },
        { input: '15\n0', expectedOutput: '15' }
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
      explanation: '使用while True循环,当输入0时用break退出循环. 本题融合了while循环、break和类型转换3个知识点.'
    },
    // Q4: kp-5-9(枚举法) + kp-5-6(循环嵌套)
    {
      id: 'q-5-adv-coding-4',
      type: 'coding',
      knowledgePoint: 'kp-5-9',
      score: 20,
      difficulty: 'hard',
      question: '使用枚举法找出所有满足 a + b + c = 15 的正整数组合(其中a、 b, c都从1到14), 共有多少组?',
      codeTemplate: `# 请在下方编写代码
`,
      testCases: [
        { input: '15', expectedOutput: '91' },
        { input: '12', expectedOutput: '55' }
      ],
      scoringRules: {
        fullScore: 20,
        partialScores: [
          { condition: '能使用三重循环枚举', score: 8 },
          { condition: '能正确判断条件', score: 5 },
          { condition: '完全正确', score: 20 }
        ]
      },
      referenceAnswer: `n = int(input())
count = 0
for a in range(1, 15):
    for b in range(1, 15):
        for c in range(1, 15):
            if a + b + c == n:
                count = count + 1
print(count)`,
      explanation: '使用三重循环枚举所有可能的组合,判断是否满足条件. 本题融合了枚举法和多重循环嵌套, 嶾较高难度.'
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
      'kp-5-2': { count: 2, totalScore: 7 },
      'kp-5-3': { count: 2, totalScore: 17 },
      'kp-5-4': { count: 2, totalScore: 5 },
      'kp-5-5': { count: 2, totalScore: 12 },
      'kp-5-6': { count: 2, totalScore: 22 },
      'kp-5-7': { count: 2, totalScore: 17 },
      'kp-5-8': { count: 2, totalScore: 12 },
      'kp-5-9': { count: 2, totalScore: 22 },
      'kp-5-10': { count: 1, totalScore: 2 },
      'kp-5-11': { count: 1, totalScore: 2 },
      'kp-5-12': { count: 1, totalScore: 2 },
      'kp-5-13': { count: 1, totalScore: 2 },
      'kp-5-14': { count: 1, totalScore: 2 },
      'kp-5-15': { count: 1, totalScore: 2 }
    },
    byDifficulty: {
      'medium': 7,
      'hard': 13
    }
  }
}

export default practiceSet
