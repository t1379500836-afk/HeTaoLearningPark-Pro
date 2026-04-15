/**
 * PY2 课程 L7-2: 查找思想智取核桃山
 *
 * 核心知识点:
 * 1. max命令 & min命令（求最大值和最小值）
 * 2. 列表生成式
 * 3. index命令（查找元素索引）
 * 4. float命令（数据类型转换）
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'weather',
    pronunciation: "['weðər]",
    partOfSpeech: 'n.',
    meaning: '天气；气象；气象预报',
    level: 'easy',
    example: 'The weather forecast says it is going to be sunny.',
    exampleTranslation: '天气预报说会出太阳。'
  },
  {
    word: 'float',
    pronunciation: '[flout]',
    partOfSpeech: 'v.',
    meaning: '漂浮；浮动；浮板',
    level: 'medium',
    example: 'They will neither sink nor float.',
    exampleTranslation: '他们既不会下沉也不会浮上来。'
  },
  // 拓展单词
  {
    word: 'maximum',
    pronunciation: "['mæksɪməm]",
    partOfSpeech: 'adj.',
    meaning: '最大量；最大的',
    level: 'medium',
    example: 'The maximum speed of this car is 200 km/h.',
    exampleTranslation: '这辆车的最高时速是200公里/小时。'
  },
  {
    word: 'minimum',
    pronunciation: "['mɪnɪməm]",
    partOfSpeech: 'adj.',
    meaning: '最小量；最小的',
    level: 'medium',
    example: 'The minimum age for this job is 18.',
    exampleTranslation: '这份工作的最低年龄要求是18岁。'
  },
  {
    word: 'index',
    pronunciation: "['ɪndeks]",
    partOfSpeech: 'n.',
    meaning: '索引；指数；指标',
    level: 'hard',
    example: 'The index of this list starts from 0.',
    exampleTranslation: '这个列表的索引从0开始。'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '寻找最大最小值 - max/min命令',
    emoji: '🔍',
    gradeLevel: '1-2',
    summary: '找出列表中的最大值和最小值',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象一下，老师让大家排队，谁最高？谁最矮？在编程中，我们也可以用 max 和 min 命令快速找到列表中"最高"和"最矮"的数字！',
      concept: 'max 命令可以找出列表中的最大值，min 命令可以找出列表中的最小值。',
      syntax: 'max(列表名)\nmin(列表名)',
      example: {
        title: '找出最高分和最低分',
        code: '# 成绩列表\nscores = [85, 92, 78, 95, 88]\n\n# 找出最高分\nhighest = max(scores)\nprint("最高分:", highest)\n\n# 找出最低分\nlowest = min(scores)\nprint("最低分:", lowest)',
        output: '最高分: 95\n最低分: 78',
        explanation: 'max(scores) 返回 95，是列表中最大的数字。min(scores) 返回 78，是列表中最小的数字。'
      },
      practice: [
        {
          question: 'max([3, 7, 2, 9]) 的结果是？',
          answer: '9'
        },
        {
          question: 'min([10, 5, 8, 3]) 的结果是？',
          answer: '3'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '现在我们升级了！不仅能找最值，还能处理各种数据类型。但要注意：max 和 min 只能处理数字或字符串，不能混合使用哦！',
      concept: 'max 和 min 命令是编程中常用的查找命令。对于数字列表，找数值最大最小；对于字符串列表，按字母顺序找最大最小。',
      syntax: '数字列表: max([1, 5, 3]) → 5\n字符串列表: max(["apple", "banana"]) → "banana"\n\n混合类型会报错!',
      example: {
        title: '字符串也能比大小',
        code: '# 字符串列表（按字母顺序）\nwords = ["apple", "banana", "cherry"]\nprint("最大:", max(words))\nprint("最小:", min(words))',
        output: '最大: cherry\n最小: apple',
        explanation: '对字符串来说，"大小"是按字母顺序来的。cherry 的 c 在字母表中靠后，所以是"最大"的。'
      },
      practice: [
        {
          question: 'max(["cat", "dog", "ant"]) 的结果是？',
          answer: '"dog"（d在字母表中最靠后）'
        },
        {
          question: '如果列表中有负数，如 [-5, 3, -1]，min 的结果是？',
          answer: '-5（负数比正数小）'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '高手模式！除了直接用 max/min，你还可以用循环自己实现查找算法。这能帮你理解计算机是怎么"思考"的！',
      concept: '手动实现查找算法的思想：初始化一个变量，遍历列表，逐个比较，更新最值。这是编程中经典的"查找思想"。',
      syntax: '# 手动查找最大值\nresult = list[0]\nfor i in list:\n    if i > result:\n        result = i\nprint(result)',
      example: {
        title: '手动实现 max 命令',
        code: '# 不用 max，自己找最大值\nnums = [14, 2, 17, 4, 11]\nresult = nums[0]  # 假设第一个是最大的\n\nfor i in nums:\n    if i > result:\n        result = i  # 发现更大的，更新\n\nprint("最大值是:", result)',
        output: '最大值是: 17',
        explanation: '这个算法模拟了 max 命令的工作原理：先假设第一个元素最大，然后依次比较，发现更大的就更新。'
      },
      practice: [
        {
          question: '如何修改上面的代码来查找最小值？',
          answer: '把 if i > result 改成 if i < result'
        },
        {
          question: '如果列表是空的，这个程序会怎样？',
          answer: '会报错，因为 nums[0] 不存在'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '魔法列表工厂 - 列表生成式',
    emoji: '🏭',
    gradeLevel: '3-4',
    summary: '用一行代码创建新列表',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个装满数字字符串的盒子，想把它们都变成真正的数字。列表生成式就像一个魔法机器，能快速处理整个列表！',
      concept: '列表生成式可以遍历旧列表，对每个元素做同样的操作，快速生成一个新列表。',
      syntax: '[表达式 for 变量 in 列表]',
      example: {
        title: '字符串变数字',
        code: '# 原列表：字符串数字\nold_list = ["23", "5", "42", "111"]\n\n# 用列表生成式变成真正的数字\nnew_list = [int(i) for i in old_list]\n\nprint("原列表:", old_list)\nprint("新列表:", new_list)',
        output: '原列表: ["23", "5", "42", "111"]\n新列表: [23, 5, 42, 111]',
        explanation: 'int(i) 把每个字符串变成整数，for i in old_list 遍历每个元素，结果是一个新的数字列表。'
      },
      practice: [
        {
          question: '如何把 ["1", "2", "3"] 变成 [1, 2, 3]？',
          answer: '[int(i) for i in ["1", "2", "3"]]'
        },
        {
          question: '列表生成式会改变原列表吗？',
          answer: '不会，它创建一个新列表'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的魔法工厂升级了！不仅能转换类型，还能做各种运算：乘方、字符串处理、条件筛选等等。',
      concept: '列表生成式的表达式部分可以是任何有效的Python表达式，让我们能灵活地转换数据。',
      syntax: '# 算术运算\n[x * 2 for x in list]\n\n# 字符串操作\n[s.upper() for s in strings]\n\n# 修改原列表\nlist = [处理 for x in list]',
      example: {
        title: '给所有数字翻倍',
        code: '# 原列表\nnumbers = [1, 2, 3, 4, 5]\n\n# 创建一个新列表，每个数字都乘以2\ndoubled = [x * 2 for x in numbers]\n\nprint("原列表:", numbers)\nprint("翻倍后:", doubled)',
        output: '原列表: [1, 2, 3, 4, 5]\n翻倍后: [2, 4, 6, 8, 10]',
        explanation: 'x * 2 是表达式，for x in numbers 遍历原列表，结果是每个元素都翻倍的新列表。'
      },
      practice: [
        {
          question: '如何让列表中每个数字都加1？',
          answer: '[x + 1 for x in list]'
        },
        {
          question: '如何让所有字符串变大写？',
          answer: '[s.upper() for s in strings]'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '魔法大师模式！你可以用列表生成式做复杂的数据处理：筛选、转换、组合。这是Python中最强大的特性之一！',
      concept: '列表生成式可以结合条件判断，实现筛选功能。高级语法：[表达式 for 变量 in 列表 if 条件]',
      syntax: '# 带条件的列表生成式\n[x for x in list if x > 0]\n\n# 嵌套处理\n[x + y for x in list1 for y in list2]',
      example: {
        title: '只保留正数',
        code: '# 混合正负数的列表\nnumbers = [3, -1, 4, -5, 2, -3]\n\n# 只保留正数\npositives = [x for x in numbers if x > 0]\n\nprint("原列表:", numbers)\nprint("正数:", positives)',
        output: '原列表: [3, -1, 4, -5, 2, -3]\n正数: [3, 4, 2]',
        explanation: 'if x > 0 是条件判断，只有满足条件的元素才会被加入新列表。这叫"列表过滤"。'
      },
      practice: [
        {
          question: '如何只保留偶数？',
          answer: '[x for x in list if x % 2 == 0]'
        },
        {
          question: '如何同时满足两个条件（大于0且小于10）？',
          answer: '[x for x in list if 0 < x < 10]'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '位置探测器 - index命令',
    emoji: '📍',
    gradeLevel: '1-2',
    summary: '找到元素在列表中的位置',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你在玩捉迷藏，知道某个小朋友的名字，想知道他藏在第几个位置。index 命令就是这样的"位置探测器"！',
      concept: 'index 命令可以找到某个元素在列表中第一次出现的位置（索引）。',
      syntax: '列表名.index(要查找的元素)',
      example: {
        title: '找到"雨"的位置',
        code: '# 天气列表\nweather = ["晴", "雨", "阴", "多云"]\n\n# 找到"雨"的位置\nposition = weather.index("雨")\n\nprint("雨在索引:", position)',
        output: '雨在索引: 1',
        explanation: '"雨" 在列表中的索引是 1（索引从 0 开始数）。'
      },
      practice: [
        {
          question: '["a", "b", "c"] 中，"c" 的索引是？',
          answer: '2'
        },
        {
          question: '如果元素不在列表中会怎样？',
          answer: '会报错（ValueError）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '现在我们知道索引从0开始了！而且如果列表中有重复元素，index 只会找到第一个出现的位置。',
      concept: 'index 返回元素第一次出现的索引。如果元素重复出现，只返回第一次的位置。如果要找所有位置，需要用循环。',
      syntax: '# 单个元素\nlist.index(element)\n\n# 有重复元素时\n# 只返回第一个的位置',
      example: {
        title: '重复元素的处理',
        code: '# 有重复数字的列表\nnumbers = [1, 0, 5, 2, 5, 12]\n\n# 找数字 5 的位置\npos = numbers.index(5)\n\nprint("第一个 5 在索引:", pos)',
        output: '第一个 5 在索引: 2',
        explanation: '虽然 5 出现了两次（索引 2 和 4），但 index 只返回第一次出现的位置 2。'
      },
      practice: [
        {
          question: '如何找所有出现的位置？',
          answer: '用循环遍历列表，用 if 判断元素是否匹配'
        },
        {
          question: 'index 和 in 有什么区别？',
          answer: 'in 只判断元素是否存在，index 返回具体位置'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '高级探测器！你可以用 index + 循环找到所有出现的位置，或者处理复杂的查找逻辑。',
      concept: '手动实现查找所有位置的算法：遍历列表，用 range(len()) 获取索引，收集所有匹配的位置。',
      syntax: '# 找所有位置\npositions = [i for i in range(len(list)) if list[i] == target]',
      example: {
        title: '找出所有 5 的位置',
        code: '# 有重复元素的列表\nnumbers = [1, 0, 5, 2, 5, 12]\ntarget = 5\n\n# 找到所有 5 的位置\npositions = []\nfor i in range(len(numbers)):\n    if numbers[i] == target:\n        positions.append(i)\n\nprint("5 出现在索引:", positions)',
        output: '5 出现在索引: [2, 4]',
        explanation: 'range(len(numbers)) 获取索引范围，我们遍历每个索引，把所有匹配的位置收集起来。'
      },
      practice: [
        {
          question: '如何用列表生成式实现同样的功能？',
          answer: '[i for i in range(len(list)) if list[i] == target]'
        },
        {
          question: '如果要从后往前找，用什么命令？',
          answer: 'list.rindex() 或用 reverse() + index()'
        }
      ]
    }
  },

  {
    id: 'kp-4',
    title: '数字变身术 - float命令',
    emoji: '🔄',
    gradeLevel: '3-4',
    summary: '把数字变成浮点数（小数）',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '你知道吗？数字有不同的"样子"！整数是完整的数，浮点数是带小数点的数。float 命令可以把数字变成带小数点的形式！',
      concept: 'float 命令可以把其他类型的数据转换成浮点数（带小数点的数字）。',
      syntax: 'float(要转换的值)',
      example: {
        title: '整数变浮点数',
        code: '# 整数转浮点数\na = float(12)\nprint("float(12):", a)\n\n# 字符串数字转浮点数\nb = float("3.14")\nprint("float(\\"3.14\\"):", b)',
        output: 'float(12): 12.0\nfloat("3.14"): 3.14',
        explanation: '整数 12 变成 12.0，字符串 "3.14" 变成数字 3.14。注意浮点数后面都有小数点。'
      },
      practice: [
        {
          question: 'float(5) 的结果是？',
          answer: '5.0'
        },
        {
          question: 'float("10") 的结果是？',
          answer: '10.0'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '现在我们学会了两种转换：int 变整数，float 变浮点数。它们有什么不同呢？什么时候用哪个？',
      concept: 'int 保留整数部分（向下取整），float 保留小数部分。选择哪个取决于你的需求。',
      syntax: '# int: 向下取整\nint(3.9) → 3\n\n# float: 保留小数\nfloat("3.9") → 3.9\n\n# 注意！int 不能转带小数的字符串\nint("3.9") → 报错！',
      example: {
        title: 'int 和 float 的区别',
        code: '# float 可以转小数字符串\nprint(float("2.5"))  # 输出: 2.5\n\n# int 不能转小数字符串\ntry:\n    print(int("2.5"))\nexcept:\n    print("int(\\"2.5\\") 会报错！")\n\n# int 对浮点数会向下取整\nprint(int(2.9))  # 输出: 2',
        output: '2.5\nint("2.5") 会报错！\n2',
        explanation: 'float 可以处理带小数点的字符串，int 不行。int(2.9) 会丢掉小数部分，只保留 2。'
      },
      practice: [
        {
          question: '如何把字符串 "3.14" 变成整数 3？',
          answer: 'int(float("3.14")) 或 int("3.14") 会报错，需要先转float再转int'
        },
        {
          question: 'float("abc") 会怎样？',
          answer: '会报错，因为 "abc" 不是数字'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '数据转换大师！在实际编程中，合理使用数据类型转换非常重要，特别是在处理用户输入或文件数据时。',
      concept: '浮点数在计算机中是近似存储的，这可能导致精度问题。例如 0.1 + 0.2 不等于 0.3。这是编程中需要注意的陷阱。',
      syntax: '# 精度问题\n0.1 + 0.2 == 0.3  # False!\n\n# 正确的比较方法\nabs((0.1 + 0.2) - 0.3) < 0.0001',
      example: {
        title: '浮点数精度陷阱',
        code: '# 注意浮点数的精度问题\nresult = 0.1 + 0.2\nprint("0.1 + 0.2 =", result)\nprint("等于 0.3?", result == 0.3)\n\n# 正确的比较方法\nprint("接近 0.3?", abs(result - 0.3) < 0.0001)',
        output: '0.1 + 0.2 = 0.30000000000000004\n等于 0.3? False\n接近 0.3? True',
        explanation: '由于浮点数在计算机中的存储方式，0.1 + 0.2 不精确等于 0.3。比较浮点数时应该用"差值足够小"来判断。'
      },
      practice: [
        {
          question: '如何正确比较两个浮点数是否相等？',
          answer: '用 abs(a - b) < 一个很小的数（如 0.0001）'
        },
        {
          question: '浮点数适合用来存储钱吗？',
          answer: '不适合，应该用整数（分为单位）或专门的 decimal 类型'
        }
      ]
    }
  }
]

// 习题数据（编程 × 数学融合）
export const exercises = [
  // 🟢 基础题（1-2年级）
  {
    id: 'ex-1',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '找最值',
    question: '下面的代码输出结果是多少？\n\n```python\nnumbers = [26, 19, 78, 49, 57]\nprint(max(numbers))\n```',
    options: [
      '19',
      '26',
      '57',
      '78'
    ],
    answer: 3,
    explanation: 'max() 命令可以找出列表中的最大值。在列表 [26, 19, 78, 49, 57] 中，最大的数字是 78。\n\n数学知识：这就是"找最大值"问题，在一组数中找出最大的那个。',
    hint: '找出列表中最大的数字'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '数据类型',
    question: '执行下面的代码，输出结果是什么？\n\n```python\nprint(float(12))\n```',
    options: [
      '12',
      '12.0',
      '"12.0"',
      '"12"'
    ],
    answer: 1,
    explanation: 'float(12) 把整数 12 转换成浮点数 12.0。浮点数的特点是带有小数点。\n\n编程知识：float 是"浮点数"的缩写，意思是带小数点的数字。',
    hint: 'float 会给数字加上小数点'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '索引与位置',
    question: '有一个列表：\n\n```python\nanimals = ["猫", "狗", "兔子", "鸟"]\n```\n\n执行下面的代码，输出结果是？\n\n```python\nprint(animals.index("兔子"))\n```',
    options: [
      '2',
      '3',
      '"兔子"',
      '报错'
    ],
    answer: 0,
    explanation: 'index() 命令返回元素在列表中第一次出现的位置（索引）。"兔子" 在列表中的索引是 2（从 0 开始数：猫=0, 狗=1, 兔子=2, 鸟=3）。\n\n数学知识：索引从 0 开始是编程中的重要概念，和生活中从 1 开始数数不同。',
    hint: '索引是从 0 开始数的，第一个元素索引是 0'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '数据转换',
    question: '列表生成式 `[int(x) for x in ["2", "5", "10"]]` 的结果是？',
    options: [
      '["2", "5", "10"]',
      '[2, 5, 10]',
      '[2.0, 5.0, 10.0]',
      '报错'
    ],
    answer: 1,
    explanation: '列表生成式遍历 ["2", "5", "10"]，对每个字符串执行 int(x)，转换成整数，结果是 [2, 5, 10]。\n\n编程知识：列表生成式是 Python 中快速处理列表的强大工具，语法简洁优雅。',
    hint: 'int() 把字符串数字变成整数'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '排队问题',
    question: '猴赛雷等人排成一队报数。正着报数，猴赛雷报 4；倒着报数，猴赛雷报 6。队伍中一共有多少人？\n\n```\n猴大力 猴赛雷 猴头菇 ...\n```\n\n这是经典的"排队问题"。',
    options: [
      '10人',
      '11人',
      '9人',
      '8人'
    ],
    answer: 2,
    explanation: '排队问题解法：正着报数报 4，说明前面有 3 人；倒着报数报 6，说明后面有 5 人。总人数 = 前面人数 + 后面人数 + 自己 = 3 + 5 + 1 = 9 人。\n\nPython 实现：\n```python\nforward = 4  # 正着报数\nbackward = 6  # 倒着报数\ntotal = (forward - 1) + (backward - 1) + 1\nprint(total)  # 输出: 9\n```\n\n数学知识：这是一个经典的"排队问题"，关键是要理解位置和人数的关系，注意不要重复计算自己。',
    hint: '正着报数减 1 等于前面人数，倒着报数减 1 等于后面人数'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '查找算法',
    question: '不用 min() 命令，用循环查找列表 `[14, 2, 17, 4, 11]` 的最小值。正确的代码是？\n\n```python\nnums = [14, 2, 17, 4, 11]\nresult = nums[0]\nfor i in nums:\n    # 这里应该填什么？\nprint(result)\n```',
    options: [
      'if i < result: result = i',
      'if i > result: result = i',
      'if i != result: result = i',
      'if i == result: result = i'
    ],
    answer: 0,
    explanation: '查找最小值的算法：\n1. 假设第一个元素是最小的\n2. 遍历列表，用 if i < result 判断\n3. 如果发现更小的，就更新 result\n\n完整代码：\n```python\nnums = [14, 2, 17, 4, 11]\nresult = nums[0]\nfor i in nums:\n    if i < result:\n        result = i\nprint(result)  # 输出: 2\n```\n\n编程知识：这是"查找思想"的基础实现，min() 命令内部就是用类似的算法工作的。',
    hint: '要找最小值，应该用小于号 < 比较'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L7-2',
  title: '智取核桃山',
  subtitle: '学会查找最大最小值和列表推导式',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解 max/min 命令的使用',
    '掌握列表生成式的语法',
    '学会 index 命令查找元素位置',
    '了解 float 命令进行数据类型转换'
  ],
  prerequisites: [
    'Python 基础语法',
    '列表基础操作',
    'for 循环'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['max', 'min', 'list', 'index', 'float'],
  medium: ['weather', 'maximum', 'minimum', 'result', 'number'],
  hard: ['iteration', 'conversion', 'algorithm', 'position', 'search']
}

// 代码模板练习（按难度分组）
// 缩进使用4个空格（Python PEP 8标准）
export const typingTemplates = {
  easy: [
    // 简单单行代码 - max/min/float
    'max(scores)',
    'min(numbers)',
    'float("3.14")',
    'list.index("item")',
    'max([1, 2, 3])',
    'len(numbers)'
  ],
  medium: [
    // 包含缩进的多行代码
    'result = max(numbers)',
    'minimum = min(scores)',
    'value = float(text)',
    'position = list.index(key)',
    'for i in numbers:\n    print(i)',
    'nums = [float(x) for x in list]'
  ],
  hard: [
    // 复杂的多行代码
    'result = max([1, 2, 3, 4, 5])',
    'numbers = [float(x) for x in ["1", "2", "3"]]',
    'for i in range(len(numbers)):',
    'if value in list:\n    index = list.index(value)',
    'maximum = max([max(x) for x in matrix])'
  ]
}

// 导出所有数据
export const L7_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L7_2_data
