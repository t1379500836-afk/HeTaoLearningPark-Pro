/**
 * YCL五级基础练习（一）
 *
 * 本套卷包含：单选题15题（每题2分，共30分）
 *             多选题5题（每题3分，共15分）
 *             编程题4题（共55分）
 * 总分：100分  时长：90分钟
 *
 * 编程题覆盖：kp-5-1(索引), kp-5-2(统计), kp-5-3(while), kp-5-4(split),
 *             kp-5-5(列表修改), kp-5-7(break), kp-5-9(枚举法)
 */

export const practiceSet = {
  meta: {
    id: 'level5-basic-1',
    level: 'level5',
    difficulty: 'basic',
    name: '五级基础练习（一）',
    description: '字符串和列表的综合应用',
    duration: 90,
    totalScore: 100,
    createdAt: '2026-04-05',
    version: '2.0'
  },

  questions: [
    // ==================== 单选题（15题，每题2分，共30分）====================
    // 模块1：字符串和列表的综合应用（8题）
    {
      id: 'q-5-1-single-1',
      type: 'single-choice',
      knowledgePoint: 'kp-5-1',
      score: 2,
      difficulty: 'easy',
      question: "已知 st = 'APPLE'，下列哪个选项的值是字符 'P'？",
      code: null,
      options: [
        'st[0]',
        'st[1]',
        'st(0)',
        'st(1)'
      ],
      answer: 1,
      explanation: "在Python中，字符串的索引使用方括号[]，索引从0开始。st = 'APPLE'中，索引1对应的字符是'P'。"
    },
    {
      id: 'q-5-1-single-2',
      type: 'single-choice',
      knowledgePoint: 'kp-5-4',
      score: 2,
      difficulty: 'easy',
      question: '执行下列程序，输出是什么？',
      code: `str1 = '红,黄,蓝,绿'
str1 = str1.split(',')
print(str1)`,
      options: [
        '"红 黄 蓝 绿"',
        "['红 黄 蓝 绿']",
        '"红","黄","蓝","绿"',
        "['红', '黄', '蓝', '绿']"
      ],
      answer: 3,
      explanation: "split(',')方法按逗号分割字符串，返回一个列表['红', '黄', '蓝', '绿']。"
    },
    {
      id: 'q-5-1-single-3',
      type: 'single-choice',
      knowledgePoint: 'kp-5-1',
      score: 2,
      difficulty: 'easy',
      question: "已知 s = 'Python'，s[-1]的值是什么？",
      code: null,
      options: [
        "'P'",
        "'n'",
        "'o'",
        "程序报错"
      ],
      answer: 1,
      explanation: "负索引从末尾开始，-1表示最后一个字符，'Python'的最后一个字符是'n'。"
    },
    {
      id: 'q-5-1-single-4',
      type: 'single-choice',
      knowledgePoint: 'kp-5-5',
      score: 2,
      difficulty: 'easy',
      question: "已知水果列表 fruits = ['苹果', '香蕉', '橙子']，想要把其中的'香蕉'改为'葡萄'，应该怎样书写程序？",
      code: null,
      options: [
        "fruits[1] = '葡萄'",
        "fruits[2] = '葡萄'",
        "葡萄 = fruits[1]",
        "葡萄 = fruits[2]"
      ],
      answer: 0,
      explanation: "在列表中，元素的索引从0开始。'香蕉'的索引是1，所以修改用fruits[1] = '葡萄'。"
    },
    {
      id: 'q-5-1-single-5',
      type: 'single-choice',
      knowledgePoint: 'kp-5-2',
      score: 2,
      difficulty: 'easy',
      question: '小Q统计了他五天内每天的跑步距离（单位：公里），存储在列表 s = [3, 5, 2, 4, 6] 中，下列哪个选项可以表示这五天内他的总跑步距离？',
      code: null,
      options: [
        'max(s)',
        'min(s)',
        'len(s)',
        'sum(s)'
      ],
      answer: 3,
      explanation: 'sum(s)用于计算列表中所有元素的总和，即五天跑步距离的总和。'
    },
    {
      id: 'q-5-1-single-6',
      type: 'single-choice',
      knowledgePoint: 'kp-5-2',
      score: 2,
      difficulty: 'easy',
      question: '已知 nums = [10, 20, 30, 40, 50]，下列哪个选项的值是30？',
      code: null,
      options: [
        'nums[1]',
        'nums[2]',
        'nums[3]',
        'nums[30]'
      ],
      answer: 1,
      explanation: '列表索引从0开始，nums[0]=10, nums[1]=20, nums[2]=30。'
    },
    {
      id: 'q-5-1-single-7',
      type: 'single-choice',
      knowledgePoint: 'kp-5-10',
      score: 2,
      difficulty: 'medium',
      question: "运行下列代码，输出结果是？",
      code: `colors = ['红', '绿', '蓝']
for c in colors:
    print(c)`,
      options: [
        '0 1 2',
        '红 绿 蓝',
        "['红', '绿', '蓝']",
        '红\n绿\n蓝'
      ],
      answer: 3,
      explanation: 'for循环遍历列表，每次print输出一个元素并换行，分3行输出。'
    },
    {
      id: 'q-5-1-single-8',
      type: 'single-choice',
      knowledgePoint: 'kp-5-1',
      score: 2,
      difficulty: 'medium',
      question: "运行下列代码，输出结果是什么？",
      code: `s = 'dog'
for j in range(3):
    print(j, s[j])`,
      options: [
        '1 d\n2 o\n3 g',
        'd 1\no 2\ng 3',
        '0 d\n1 o\n2 g',
        'd 0\no 1\ng 2'
      ],
      answer: 2,
      explanation: "range(3)生成0、1、2，循环中j依次取这三个值，s[j]分别是'd'、'o'、'g'，所以输出0 d、1 o、2 g。"
    },

    // 模块2：字典、集合与循环控制（4题）
    {
      id: 'q-5-1-single-9',
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
    {
      id: 'q-5-1-single-10',
      type: 'single-choice',
      knowledgePoint: 'kp-5-7',
      score: 2,
      difficulty: 'medium',
      question: '某餐厅推出了猜菜品价格的游戏，参与者输入一个价格进行猜测，若猜中了餐厅设定的神秘价格168元，会输出"恭喜猜对了！"并结束游戏。请选择正确代码填入横线处。',
      code: `while True:
    price = int(input())
    if price == 168:
        print('恭喜猜对了！')
        ___________
    else:
        print('差一点哦！')`,
      options: [
        'while',
        'continue',
        'break',
        'True'
      ],
      answer: 2,
      explanation: '程序需要在猜对价格时结束循环。break语句的作用是立即终止当前所在的循环。'
    },
    {
      id: 'q-5-1-single-11',
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
      id: 'q-5-1-single-12',
      type: 'single-choice',
      knowledgePoint: 'kp-5-14',
      score: 2,
      difficulty: 'medium',
      question: '下列代码的运行结果是？',
      code: `fruits = {'草莓', '橙子', '草莓', '西瓜'}
print(len(fruits))`,
      options: [
        '3',
        '4',
        '6',
        '8'
      ],
      answer: 0,
      explanation: "Python中集合（set）的元素具有唯一性，会自动去除重复值。去重后为{'草莓', '橙子', '西瓜'}，共3个元素。"
    },

    // 模块3：列表操作与循环嵌套（3题）
    {
      id: 'q-5-1-single-13',
      type: 'single-choice',
      knowledgePoint: 'kp-5-6',
      score: 2,
      difficulty: 'medium',
      question: "运行下列代码，输出是什么？",
      code: `for a in range(2):
    for b in range(3):
        print('r', end='')
    print()`,
      options: [
        'rrrrrr',
        'rr\nrr',
        'rrr\nrrr',
        'rrr\nrrr\nrrr'
      ],
      answer: 2,
      explanation: '外层循环2次，每次内层循环3次输出3个r，然后换行。所以输出两行，每行3个r。'
    },
    {
      id: 'q-5-1-single-14',
      type: 'single-choice',
      knowledgePoint: 'kp-5-8',
      score: 2,
      difficulty: 'medium',
      question: "变量 t 的值是 '105'，以下哪个操作能将 t 转换为整数 105？",
      code: null,
      options: [
        't = str(t)',
        't = int(t)',
        'str(t)',
        'int(t)'
      ],
      answer: 1,
      explanation: "int()函数的作用是将其他类型的数据转换为整数类型，t = int(t)可以将字符串'105'转换为整数105并赋值给t。"
    },
    {
      id: 'q-5-1-single-15',
      type: 'single-choice',
      knowledgePoint: 'kp-5-9',
      score: 2,
      difficulty: 'hard',
      question: '使用枚举法找出满足 a + b = 5 的正整数组合（a和b都从1到4），共有多少组？',
      code: null,
      options: [
        '3组',
        '4组',
        '5组',
        '6组'
      ],
      answer: 1,
      explanation: '满足条件的组合有：(1,4), (2,3), (3,2), (4,1)，共4组。'
    },

    // ==================== 多选题（5题，每题3分，共15分）====================
    {
      id: 'q-5-1-multi-1',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-1',
      score: 3,
      difficulty: 'easy',
      question: "【多选题】字符串 s 的值是 'English'，其中最后一个字符 'h' 对应的索引可以表示为？",
      code: null,
      options: [
        '7',
        '6',
        'len(s)',
        'len(s) - 1'
      ],
      answer: [1, 3],
      partialAnswer: [1],
      explanation: "字符串'English'包含7个字符，索引从0开始，最后一个字符'h'的索引是6。len(s)计算得7，len(s)-1即6。"
    },
    {
      id: 'q-5-1-multi-2',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-2',
      score: 3,
      difficulty: 'easy',
      question: '【多选】已知 nums = [3, 5, 2, 8, 1]，下列哪些表达式的值是正确的？',
      code: null,
      options: [
        'len(nums) 的值是 5',
        'sum(nums) 的值是 19',
        'max(nums) 的值是 8',
        'min(nums) 的值是 3'
      ],
      answer: [0, 1, 2],
      partialAnswer: [0],
      explanation: 'len(nums)=5正确；sum(nums)=3+5+2+8+1=19正确；max(nums)=8正确；min(nums)=1，不是3。'
    },
    {
      id: 'q-5-1-multi-3',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-3',
      score: 3,
      difficulty: 'medium',
      question: '【多选题】下列哪段代码会一直输出"YCL必胜"？',
      code: null,
      options: [
        'x = 5\nwhile x > 0:\n    print("YCL必胜")',
        'x = 5\nwhile x == 0:\n    print("YCL必胜")',
        'while True:\n    break\n    print("YCL必胜")',
        'x = 5\nwhile x > 0:\n    print("YCL必胜")\n    x = x + 1'
      ],
      answer: [0, 3],
      partialAnswer: [0],
      explanation: 'A选项：x初始为5且满足x>0，循环内未改变x的值，条件始终成立。D选项：x的值不断增大，永远满足循环条件x>0。'
    },
    {
      id: 'q-5-1-multi-4',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-7',
      score: 3,
      difficulty: 'medium',
      question: '【多选题】下列描述中正确的有？',
      code: null,
      options: [
        'break可以结束循环',
        'for i in range(10)不会造成无限循环',
        'continue语句可以跳出循环',
        'break只能用于跳过while循环'
      ],
      answer: [0, 1],
      partialAnswer: [0],
      explanation: 'A选项：break语句的作用是立即结束当前所在的循环，正确。B选项：range(10)生成0到9的序列，for循环会遍历这些值后结束，正确。'
    },
    {
      id: 'q-5-1-multi-5',
      type: 'multiple-choice',
      knowledgePoint: 'kp-5-5',
      score: 3,
      difficulty: 'medium',
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

    // ==================== 编程题（4题，共55分）====================
    // Q1: kp-5-4(字符串分割) + kp-5-1(索引)
    {
      id: 'q-5-1-coding-1',
      type: 'coding',
      knowledgePoint: 'kp-5-4',
      score: 10,
      difficulty: 'easy',
      question: '输入一个包含5个数字的列表（格式如"10,20,30,40,50"），请使用split方法分割字符串，然后输出列表中第3个数字（索引为2的元素）。',
      codeTemplate: `# 请在下方编写代码
`,
      testCases: [
        { input: '10,20,30,40,50', expectedOutput: '30' },
        { input: '5,15,25,35,45', expectedOutput: '25' }
      ],
      scoringRules: {
        fullScore: 10,
        partialScores: [
          { condition: '能使用split分割字符串', score: 4 },
          { condition: '能使用索引访问元素', score: 4 },
          { condition: '完全正确', score: 10 }
        ]
      },
      referenceAnswer: `s = input()
nums = s.split(',')
print(nums[2])`,
      explanation: '使用split分割字符串得到列表，通过索引[2]访问第3个元素。本题融合了字符串分割和索引两个知识点。'
    },
    // Q2: kp-5-5(列表修改) + kp-5-2(统计命令)
    {
      id: 'q-5-1-coding-2',
      type: 'coding',
      knowledgePoint: 'kp-5-5',
      score: 10,
      difficulty: 'easy',
      question: '输入5个成绩（格式如"85,92,78,90,88"），请找出最高分并将其位置改为-1标记。输出修改后的列表。',
      codeTemplate: `# 请在下方编写代码
`,
      testCases: [
        { input: '85,92,78,90,88', expectedOutput: "['85', '-1', '78', '90', '88']" },
        { input: '60,70,80,90,100', expectedOutput: "['60', '70', '80', '90', '-1']" }
      ],
      scoringRules: {
        fullScore: 10,
        partialScores: [
          { condition: '能获取输入并分割', score: 3 },
          { condition: '能使用统计函数找出最值位置', score: 3 },
          { condition: '能通过索引修改列表元素', score: 4 }
        ]
      },
      referenceAnswer: `s = input()
scores = s.split(',')
max_score = max(int(x) for x in scores)
idx = scores.index(str(max_score))
scores[idx] = '-1'
print(scores)`,
      explanation: '使用max()找出最高分，index()找到其位置，然后通过索引修改该位置为-1。本题融合了统计命令和列表修改两个知识点。'
    },
    // Q3: kp-5-3(while循环) + kp-5-7(break) + kp-5-8(类型转换)
    {
      id: 'q-5-1-coding-3',
      type: 'coding',
      knowledgePoint: 'kp-5-3',
      score: 15,
      difficulty: 'medium',
      question: '小明在收集卡片，每次输入一个正整数代表卡片上的数字（字符串类型需转换为整数），当输入0时停止收集。请编写程序，输出收集到的卡片数字之和。',
      codeTemplate: `# 请在下方编写代码
`,
      testCases: [
        { input: '5\n3\n2\n0', expectedOutput: '10' },
        { input: '10\n20\n0', expectedOutput: '30' }
      ],
      scoringRules: {
        fullScore: 15,
        partialScores: [
          { condition: '能使用int()转换类型', score: 4 },
          { condition: '能使用while循环', score: 5 },
          { condition: '能使用break跳出循环', score: 3 },
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
      id: 'q-5-1-coding-4',
      type: 'coding',
      knowledgePoint: 'kp-5-9',
      score: 20,
      difficulty: 'medium',
      question: '请编写程序，输入一个整数n，使用枚举法（双重循环）找出所有满足 a + b = n（a从1到n-1，b从1到n-1）的组合数。',
      codeTemplate: `# 请在下方编写代码
`,
      testCases: [
        { input: '5', expectedOutput: '4' },
        { input: '3', expectedOutput: '2' },
        { input: '10', expectedOutput: '9' }
      ],
      scoringRules: {
        fullScore: 20,
        partialScores: [
          { condition: '能获取输入', score: 3 },
          { condition: '能使用双重循环枚举', score: 7 },
          { condition: '完全正确', score: 20 }
        ]
      },
      referenceAnswer: `n = int(input())
count = 0
for a in range(1, n):
    for b in range(1, n):
        if a + b == n:
            count = count + 1
print(count)`,
      explanation: '用双重循环枚举a和b的所有组合，判断a+b是否等于n，统计满足条件的数量。本题融合了枚举法和for循环嵌套两个知识点。'
    }
  ],

  distribution: {
    byType: {
      'single-choice': { count: 15, totalScore: 30 },
      'multiple-choice': { count: 5, totalScore: 15 },
      'coding': { count: 4, totalScore: 55 }
    },
    byKnowledgePoint: {
      // 编程题：Q1(kp-5-4,10分), Q2(kp-5-5,10分), Q3(kp-5-3,15分), Q4(kp-5-9,20分)
      'kp-5-1': { count: 4, totalScore: 10 },   // single-1,3,6,8, multi-1
      'kp-5-2': { count: 2, totalScore: 5 },    // single-5, multi-2
      'kp-5-3': { count: 2, totalScore: 18 },   // single-9, multi-3, coding-Q3
      'kp-5-4': { count: 2, totalScore: 12 },   // single-2, coding-Q1
      'kp-5-5': { count: 2, totalScore: 13 },   // single-4, multi-5, coding-Q2
      'kp-5-6': { count: 1, totalScore: 2 },    // single-13
      'kp-5-7': { count: 2, totalScore: 5 },    // single-10, multi-4
      'kp-5-8': { count: 1, totalScore: 2 },    // single-14
      'kp-5-9': { count: 2, totalScore: 22 },   // single-15, coding-Q4
      'kp-5-10': { count: 1, totalScore: 2 },   // single-7
      'kp-5-14': { count: 1, totalScore: 2 },   // single-12
      'kp-5-15': { count: 1, totalScore: 2 }    // single-11
    },
    byDifficulty: {
      'easy': 9,
      'medium': 11,
      'hard': 4
    }
  }
}

export default practiceSet
