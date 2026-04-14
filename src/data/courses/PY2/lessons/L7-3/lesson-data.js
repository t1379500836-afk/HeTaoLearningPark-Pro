/**
 * PY2 课程 L7-3: 列表排序忍无可忍
 *
 * 核心知识点:
 * 1. sorted()命令（列表排序）
 * 2. sum()命令（列表求和）
 * 3. 排序算法思想（选择排序）
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'sum',
    pronunciation: '[sʌm]',
    partOfSpeech: 'n.',
    meaning: '总和；全部；求和',
    level: 'easy',
    example: 'The sum of 5 and 3 is 8.',
    exampleTranslation: '5 和 3 的和是 8。'
  },
  // 拓展单词
  {
    word: 'sort',
    pronunciation: '[sɔːrt]',
    partOfSpeech: 'v.',
    meaning: '分类；排序；整理',
    level: 'easy',
    example: 'Please sort these cards by number.',
    exampleTranslation: '请按数字整理这些卡片。'
  },
  {
    word: 'player',
    pronunciation: "['pleɪər]",
    partOfSpeech: 'n.',
    meaning: '运动员；玩家；播放器',
    level: 'medium',
    example: 'He is the best player on the team.',
    exampleTranslation: '他是队里最好的选手。'
  },
  {
    word: 'record',
    pronunciation: "['rekərd]",
    partOfSpeech: 'n.',
    meaning: '记录；唱片；记载',
    level: 'medium',
    example: 'She holds the world record.',
    exampleTranslation: '她保持着世界纪录。'
  },
  {
    word: 'algorithm',
    pronunciation: "['ælɡərɪðəm]",
    partOfSpeech: 'n.',
    meaning: '算法；运算法则',
    level: 'hard',
    example: 'Sorting is a common algorithm in programming.',
    exampleTranslation: '排序是编程中常见的算法。'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '从小到大排排队 - sorted()命令',
    emoji: '📊',
    gradeLevel: '1-2',
    summary: '把列表中的元素按顺序排列',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象一下，原始人按照身高从矮到高排队，这样队伍就整齐了！sorted() 命令就像一个神奇的整理器，能把杂乱的数字排好队！',
      concept: 'sorted() 命令可以把列表中的元素按从小到大的顺序排列，生成一个新的列表。',
      syntax: 'sorted(列表名)',
      example: {
        title: '数字排队',
        code: '# 杂乱的数字列表\nnumbers = [3, 9, 1, 0, 7]\n\n# 排序\nsorted_numbers = sorted(numbers)\n\nprint("原列表:", numbers)\nprint("排序后:", sorted_numbers)',
        output: '原列表: [3, 9, 1, 0, 7]\n排序后: [0, 1, 3, 7, 9]',
        explanation: 'sorted() 返回一个新列表，原列表不会被改变。新列表是按从小到大顺序排列的。'
      },
      practice: [
        {
          question: 'sorted([5, 2, 8, 1]) 的结果是？',
          answer: '[1, 2, 5, 8]'
        },
        {
          question: 'sorted() 会改变原列表吗？',
          answer: '不会，它返回一个新的列表'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '现在我们不仅能排数字，还能排字符串！字符串按字母顺序排列，而且我们还可以从大到小排！',
      concept: 'sorted() 默认从小到大排序。用 reverse=True 参数可以从大到小排序。字符串按字母顺序（ASCII码）排序。',
      syntax: '# 从小到大\nsorted(list)\n\n# 从大到小\nsorted(list, reverse=True)\n\n# 字符串按字母排序\nsorted(["cat", "ant", "bird"])',
      example: {
        title: '从大到小排序',
        code: '# 数字列表\nnums = [1, 13, 5, 12, 7]\n\n# 从小到大\nasc = sorted(nums)\nprint("升序:", asc)\n\n# 从大到小\ndesc = sorted(nums, reverse=True)\nprint("降序:", desc)',
        output: '升序: [1, 5, 7, 12, 13]\n降序: [13, 12, 7, 5, 1]',
        explanation: 'reverse=True 参数让排序方向反转，从大到小排列。'
      },
      practice: [
        {
          question: 'sorted([3, 1, 2], reverse=True) 的结果是？',
          answer: '[3, 2, 1]'
        },
        {
          question: 'sorted(["banana", "apple", "cherry"]) 的结果是？',
          answer: '["apple", "banana", "cherry"]（按字母顺序）'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '排序大师！sorted() 底层使用的是"TimSort"算法，时间复杂度是 O(n log n)。你也可以自己实现排序算法来理解它的工作原理！',
      concept: '选择排序算法：每次找出最小（大）的元素，放到新列表末尾。重复 n 次完成排序。这是理解排序思想的基础。',
      syntax: '# 手动实现选择排序\nnew_list = []\nfor i in range(len(old_list)):\n    smallest = min(old_list)\n    new_list.append(smallest)\n    old_list.remove(smallest)',
      example: {
        title: '手动实现排序',
        code: '# 选择排序算法\nnumbers = [3, 9, 1, 0, 7]\nsorted_list = []\n\nfor i in range(len(numbers)):\n    # 找最小值\n    smallest = min(numbers)\n    # 添加到新列表\n    sorted_list.append(smallest)\n    # 从原列表删除\n    numbers.remove(smallest)\n\nprint("排序结果:", sorted_list)',
        output: '排序结果: [0, 1, 3, 7, 9]',
        explanation: '这个算法模拟了排序的基本思想：每次找最小的，拿走，重复这个过程。虽然效率不如内置的 sorted()，但帮助我们理解排序原理。'
      },
      practice: [
        {
          question: '如何修改代码实现从大到小排序？',
          answer: '把 min(numbers) 改成 max(numbers)'
        },
        {
          question: '这个算法有什么问题？',
          answer: '会修改原列表，效率较低（remove 操作）'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '加法计算器 - sum()命令',
    emoji: '➕',
    gradeLevel: '1-2',
    summary: '计算列表中所有数字的总和',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '你有好多硬币，想一共有多少钱？sum() 命令就像一个超级计算器，能快速算出列表中所有数字加起来的总和！',
      concept: 'sum() 命令可以计算列表中所有数字的和。',
      syntax: 'sum(列表名)',
      example: {
        title: '计算总分',
        code: '# 各科成绩\nscores = [85, 92, 78, 95]\n\n# 计算总分\ntotal = sum(scores)\n\nprint("总分:", total)',
        output: '总分: 350',
        explanation: '85 + 92 + 78 + 95 = 350，sum() 命令帮我们快速计算列表中所有数字的和。'
      },
      practice: [
        {
          question: 'sum([1, 2, 3, 4]) 的结果是？',
          answer: '10'
        },
        {
          question: 'sum([]) 空列表的结果是？',
          answer: '0'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的计算器升级了！不仅可以求和，还可以设定初始值。而且 sum() 只能用于数字列表，不能用于字符串哦！',
      concept: 'sum() 可以设置起始值（默认是 0）。语法：sum(列表, 起始值)。这在某些计算场景中很有用。',
      syntax: '# 默认起始值是 0\nsum([1, 2, 3]) → 6\n\n# 自定义起始值\nsum([1, 2, 3], 10) → 16\n\n# 字符串列表需要用其他方法\n"".join(string_list)',
      example: {
        title: '带起始值的求和',
        code: '# 购物清单价格\nprices = [25, 30, 15]\n\n# 假设已经有 10 元运费\ntotal = sum(prices, 10)\n\nprint("商品总价:", sum(prices))\nprint"含运费:", total)',
        output: '商品总价: 70\n含运费: 80',
        explanation: 'sum(prices, 10) 表示从 10 开始累加，相当于 10 + 25 + 30 + 15 = 80。'
      },
      practice: [
        {
          question: 'sum([1, 2, 3], 5) 的结果是？',
          answer: '11（5 + 1 + 2 + 3）'
        },
        {
          question: 'sum() 能求字符串列表的"和"吗？',
          answer: '不能，会报错。字符串连接用 join() 方法'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '数学大师！sum() 底层就是一个简单的循环累加算法。你可以自己实现它，还能用它解决更复杂的数学问题！',
      concept: '手动实现 sum()：初始化一个计数器，遍历列表，累加每个元素。这是理解累加思想的基础。',
      syntax: '# 手动实现 sum()\ndef my_sum(numbers):\n    total = 0\n    for n in numbers:\n        total += n\n    return total',
      example: {
        title: '手写求和函数',
        code: '# 不用 sum()，自己实现求和\ndef my_sum(numbers):\n    total = 0\n    for n in numbers:\n        total = total + n\n    return total\n\n# 测试\nnums = [12, 6, 2]\nprint("my_sum:", my_sum(nums))\nprint("sum:", sum(nums))',
        output: 'my_sum: 20\nsum: 20',
        explanation: '这个函数展示了 sum() 的基本原理：从 0 开始，遍历列表，把每个数字加到总数上。'
      },
      practice: [
        {
          question: '如何修改代码求列表中所有偶数的和？',
          answer: '在循环中加入 if n % 2 == 0 的判断'
        },
        {
          question: 'sum() 的时间复杂度是？',
          answer: 'O(n)，需要遍历整个列表一次'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '排序的秘密 - 选择排序算法',
    emoji: '🔐',
    gradeLevel: '3-4',
    summary: '理解排序算法的工作原理',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你在整理卡片，每次找出最小的那张，放到最前面。重复这个过程，最后所有卡片就排好顺序了！这就是"选择排序"！',
      concept: '选择排序的基本思想：每次找出最小值，放到新位置，重复直到排完。',
      syntax: '# 选择排序思想\n1. 找最小值\n2. 移到新位置\n3. 重复 n 次',
      example: {
        title: '排队游戏',
        code: '# 模拟排队过程\nheight = [170, 160, 175, 165]\nheight2 = []  # 新队伍\n\n# 重复 4 次（4个人）\nfor i in range(4):\n    # 找最矮的\n    h = min(height)\n    # 从原队伍删除\n    height.remove(h)\n    # 加入新队伍\n    height2.append(h)\n\nprint("从矮到高:", height2)',
        output: '从矮到高: [160, 165, 170, 175]',
        explanation: '每次找出最矮的人（min），让他排到新队伍的最后面（append），重复直到所有人都排好。'
      },
      practice: [
        {
          question: '如果有 5 个人，循环需要执行几次？',
          answer: '5 次'
        },
        {
          question: '如何改成从高到矮排？',
          answer: '把 min(height) 改成 max(height)'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '现在我们学会了完整的排序算法流程！这是一种叫做"选择排序"的算法，虽然不是最快的，但最容易理解。',
      concept: '选择排序算法的完整实现：对于 n 个元素，进行 n 轮选择，每轮找出当前最小的元素，放到正确的位置。',
      syntax: '# 完整选择排序\nfor i in range(len(list)):\n    min_idx = i\n    for j in range(i+1, len(list)):\n        if list[j] < list[min_idx]:\n            min_idx = j\n    list[i], list[min_idx] = list[min_idx], list[i]',
      example: {
        title: '原地排序版本',
        code: '# 不创建新列表，直接在原列表上排序\ndef selection_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        # 假设当前位置是最小的\n        min_idx = i\n        # 在剩余元素中找更小的\n        for j in range(i+1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        # 交换位置\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n\nnums = [3, 9, 1, 0, 7]\nselection_sort(nums)\nprint("排序后:", nums)',
        output: '排序后: [0, 1, 3, 7, 9]',
        explanation: '这个版本不创建新列表，而是通过交换元素位置来实现排序，空间复杂度更低。'
      },
      practice: [
        {
          question: '选择排序的时间复杂度是？',
          answer: 'O(n²)，因为有两层嵌套循环'
        },
        {
          question: '为什么内层循环从 i+1 开始？',
          answer: '因为前面的元素已经排好序了，不需要再比较'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '算法大师！选择排序是最基础的排序算法之一。虽然效率不高，但它简单易懂，是学习排序思想的起点。',
      concept: '不同排序算法的效率对比：选择排序 O(n²)、冒泡排序 O(n²)、插入排序 O(n²)、快速排序 O(n log n)。实际使用中，Python 的 sorted() 使用 TimSort 算法。',
      syntax: '# 排序算法比较\n选择排序: O(n²)\n快速排序: O(n log n)\n\n# Python 内置 sorted()\n# 使用 TimSort 算法',
      example: {
        title: '比较不同排序',
        code: '# 测试排序效率\nimport time\n\n# 生成大量数据\nbig_list = list(range(10000, 0, -1))\n\n# 测试 sorted()\nstart = time.time()\nresult = sorted(big_list)\nprint("sorted() 用时:", time.time() - start)',
        output: 'sorted() 用时: 约 0.001-0.003 秒',
        explanation: '内置的 sorted() 使用高效的 TimSort 算法，比手写的选择排序快得多。这就是为什么实际编程中应该使用内置函数。'
      },
      practice: [
        {
          question: '什么时候应该手写排序算法？',
          answer: '学习算法原理时，实际项目应该用内置 sorted()'
        },
        {
          question: 'TimSort 是什么排序算法的组合？',
          answer: '插入排序和归并排序的组合'
        }
      ]
    }
  },

  {
    id: 'kp-4',
    title: '统计小助手 - 综合应用',
    emoji: '📈',
    gradeLevel: '3-4',
    summary: 'sum、max、min、sorted 的综合应用',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '现在你拥有了强大的数据分析工具！用 sum 求和，max/min 找最值，sorted 排序。你可以轻松分析各种数据！',
      concept: '综合使用列表命令进行数据分析：求平均值、找极值、排序等。',
      syntax: '# 数据分析常用命令\ntotal = sum(list)\naverage = sum(list) / len(list)\nmaximum = max(list)\nminimum = min(list)\nsorted_list = sorted(list)',
      example: {
        title: '分析成绩数据',
        code: '# 学生成绩\nscores = [85, 92, 78, 95, 88]\n\n# 计算统计信息\nprint("人数:", len(scores))\nprint("总分:", sum(scores))\nprint("平均分:", sum(scores) / len(scores))\nprint("最高分:", max(scores))\nprint("最低分:", min(scores))\nprint("排序:", sorted(scores))',
        output: '人数: 5\n总分: 438\n平均分: 87.6\n最高分: 95\n最低分: 78\n排序: [78, 85, 88, 92, 95]',
        explanation: '综合运用列表命令，我们可以快速了解数据的整体情况。'
      },
      practice: [
        {
          question: '如何计算平均分？',
          answer: 'sum(scores) / len(scores)'
        },
        {
          question: '如何找出第二高的分数？',
          answer: 'sorted(scores)[-2]'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '数据分析师模式！你可以处理更复杂的数据：计算方差、找中位数、分组统计等等。',
      concept: '中位数是排序后中间位置的数。如果元素个数是偶数，取中间两个数的平均值。',
      syntax: '# 计算中位数\nsorted_list = sorted(list)\nn = len(sorted_list)\nif n % 2 == 1:\n    median = sorted_list[n//2]\nelse:\n    median = (sorted_list[n//2-1] + sorted_list[n//2]) / 2',
      example: {
        title: '计算中位数',
        code: '# 计算中位数函数\ndef median(nums):\n    sorted_nums = sorted(nums)\n    n = len(sorted_nums)\n    if n % 2 == 1:\n        return sorted_nums[n//2]\n    else:\n        return (sorted_nums[n//2-1] + sorted_nums[n//2]) / 2\n\nprint("奇数个:", median([1, 3, 5, 7, 9]))  # 5\nprint("偶数个:", median([1, 3, 5, 7]))    # 4',
        output: '奇数个: 5\n偶数个: 4.0',
        explanation: '奇数个元素时，中位数就是中间那个；偶数个时，是中间两个的平均值。'
      },
      practice: [
        {
          question: '[1, 2, 3, 4] 的中位数是？',
          answer: '2.5（(2+3)/2）'
        },
        {
          question: '[10, 20, 30, 40, 50] 的中位数是？',
          answer: '30（中间位置的数）'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '统计大师！你现在可以处理真实世界的数据分析任务：销售数据、学生成绩、科学实验数据等等。',
      concept: '方差衡量数据的离散程度。计算公式：每个数与平均值的差的平方的平均值。',
      syntax: '# 计算方差\navg = sum(data) / len(data)\nvariance = sum((x - avg) ** 2 for x in data) / len(data)',
      example: {
        title: '计算方差',
        code: '# 计算方差和标准差\ndef analyze_data(data):\n    n = len(data)\n    avg = sum(data) / n\n    variance = sum((x - avg) ** 2 for x in data) / n\n    std = variance ** 0.5\n    return {\n        "平均值": avg,\n        "方差": variance,\n        "标准差": std\n    }\n\nresult = analyze_data([85, 92, 78, 95, 88])\nfor k, v in result.items():\n    print(f"{k}: {v:.2f}")',
        output: '平均值: 87.60\n方差: 35.04\n标准差: 5.92',
        explanation: '方差和标准差是统计学中重要的概念，用于衡量数据的波动程度。标准差是方差的平方根。'
      },
      practice: [
        {
          question: '如果所有数据都相同，方差是？',
          answer: '0（没有波动）'
        },
        {
          question: '标准差和方差的关系是？',
          answer: '标准差是方差的平方根'
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
    mathConcept: '列表求和',
    question: '执行下面的代码，输出结果是？\n\n```python\nnums = [2, 3, 1, 4]\nprint(sum(nums))\n```',
    options: [
      '20',
      '10',
      '4',
      '9'
    ],
    answer: 1,
    explanation: 'sum() 命令计算列表中所有数字的和：2 + 3 + 1 + 4 = 10。\n\n数学知识：这就是"连加"运算，把多个数加在一起。',
    hint: '2 + 3 + 1 + 4 = ?'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '排序',
    question: '执行下面的代码，输出结果是？\n\n```python\nnumbers = [4, 35, 23, 15, 8]\nprint(sorted(numbers))\n```',
    options: [
      '[4, 35, 23, 15, 8]',
      '[35, 23, 15, 8, 4]',
      '[4, 8, 15, 23, 35]',
      '[8, 15, 23, 35, 4]'
    ],
    answer: 2,
    explanation: 'sorted() 命令把列表按从小到大排序：4 < 8 < 15 < 23 < 35。\n\n数学知识：排序是把一组数按大小顺序排列，从小到大叫"升序排列"。',
    hint: 'sorted() 按从小到大排列'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '排序应用',
    question: '四个人的身高分别是：176cm、159cm、168cm、179cm。按从低到高排列，正确的是？',
    options: [
      '[159, 168, 176, 179]',
      '[179, 176, 168, 159]',
      '[176, 159, 168, 179]',
      '[179, 168, 159, 176]'
    ],
    answer: 0,
    explanation: '按从低到高（从小到大）排列：159 < 168 < 176 < 179。\n\nPython 代码：\n```python\nheights = [176, 159, 168, 179]\nsorted_heights = sorted(heights)\nprint(sorted_heights)  # [159, 168, 176, 179]\n```\n\n数学知识：排序问题在日常生活中很常见，如按身高排队、按成绩排名等。',
    hint: '找出最小的，然后依次找更大的'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '统计应用',
    question: '有 5 个数字：[12, 18, 15, 20, 10]。它们的平均值是？\n\n```python\nnums = [12, 18, 15, 20, 10]\naverage = sum(nums) / len(nums)\n```',
    options: [
      '12',
      '14',
      '15',
      '16'
    ],
    answer: 2,
    explanation: '平均值的计算方法：总和 ÷ 个数 = (12 + 18 + 15 + 20 + 10) ÷ 5 = 75 ÷ 5 = 15。\n\nPython 代码：\n```python\nnums = [12, 18, 15, 20, 10]\naverage = sum(nums) / len(nums)\nprint(average)  # 15.0\n```\n\n数学知识：平均值（平均数）是统计学中最基础的概念，用于表示一组数据的"中心位置"。',
    hint: '先算总和，再除以个数'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '排序算法',
    question: '使用选择排序对 [3, 1, 4, 2] 进行排序，第一轮（找到最小值并放到第一位）后，列表变成？',
    options: [
      '[1, 3, 4, 2]',
      '[2, 1, 4, 3]',
      '[1, 2, 3, 4]',
      '[3, 1, 4, 2]'
    ],
    answer: 0,
    explanation: '选择排序第一轮：\n1. 找最小值：min([3, 1, 4, 2]) = 1\n2. 把最小值 1 和第一个元素 3 交换位置\n3. 结果：[1, 3, 4, 2]\n\n完整排序过程：\n```\n初始: [3, 1, 4, 2]\n第1轮: [1, 3, 4, 2]  # 1 和 3 交换\n第2轮: [1, 2, 4, 3]  # 2 和 3 交换\n第3轮: [1, 2, 3, 4]  # 3 和 4 交换\n完成!\n```\n\n编程知识：选择排序每次找一个最小值放到正确的位置，需要 n-1 轮才能完成排序。',
    hint: '第一轮只找最小的，放到第一个位置'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '中位数',
    question: '列表 [5, 2, 8, 1, 9, 3] 的中位数是？\n\n（中位数是排序后中间位置的数）',
    options: [
      '3',
      '4',
      '5',
      '5.5'
    ],
    answer: 1,
    explanation: '计算中位数步骤：\n1. 排序：[1, 2, 3, 5, 8, 9]\n2. 有 6 个数（偶数个），取中间两个：3 和 5\n3. 中位数 = (3 + 5) ÷ 2 = 4\n\nPython 代码：\n```python\ndef median(nums):\n    sorted_nums = sorted(nums)\n    n = len(sorted_nums)\n    if n % 2 == 1:\n        return sorted_nums[n//2]\n    else:\n        return (sorted_nums[n//2-1] + sorted_nums[n//2]) / 2\n\nprint(median([5, 2, 8, 1, 9, 3]))  # 4.0\n```\n\n数学知识：中位数是统计学中另一个重要的"中心位置"指标，相比平均值，中位数不易受极端值影响。',
    hint: '先排序，偶数个时取中间两个的平均'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L7-3',
  title: '忍无可忍',
  subtitle: '学会列表排序和求和',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握 sorted() 命令进行列表排序',
    '学会 sum() 命令计算列表总和',
    '理解选择排序算法的基本思想',
    '能运用列表命令进行数据统计'
  ],
  prerequisites: [
    'Python 基础语法',
    '列表基础操作',
    'for 循环',
    'max/min 命令'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['sum', 'sort', 'list', 'min', 'max'],
  medium: ['player', 'record', 'sorted', 'result', 'average'],
  hard: ['algorithm', 'variance', 'selection', 'statistics', 'iteration']
}

// 代码模板练习（按难度分组）
// 缩进使用4个空格（Python PEP 8标准）
export const typingTemplates = {
  easy: [
    // 简单单行代码 - sum/sorted
    'sum(numbers)',
    'sorted(scores)',
    'sorted(list)',
    'len(numbers)',
    'sum([1, 2, 3])',
    'sorted([3, 1, 2])'
  ],
  medium: [
    // 包含缩进的多行代码
    'total = sum(scores)',
    'ranking = sorted(list)',
    'average = sum(nums) / len(nums)',
    'for num in sorted(numbers):',
    'scores = sorted(player_scores)',
    'result = sum([int(x) for x in list])'
  ],
  hard: [
    // 复杂的多行代码
    'sorted_nums = sorted(numbers, reverse=True)',
    'total = sum([score for score in scores if score > 60])',
    'for i, num in enumerate(sorted(numbers)):',
    'if num in sorted_list:\n    index = sorted_list.index(num)',
    'ranking = sorted(players, key=lambda x: x.score)'
  ]
}

// 导出所有数据
export const L7_3_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L7_3_data
