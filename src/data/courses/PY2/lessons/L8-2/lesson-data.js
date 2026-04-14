/**
 * PY2 课程 L8-2: 龙王传说
 *
 * 核心知识点:
 * 1. 数据类型转换（int/str/float）
 * 2. 集合（set）
 * 3. set()、add() 命令
 * 4. in 判断
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'set',
    pronunciation: '[set]',
    partOfSpeech: 'n.',
    meaning: '集合；设置',
    level: 'easy',
    example: 'I have a set of cards.',
    exampleTranslation: '我有一套卡片。'
  },
  {
    word: 'add',
    pronunciation: '[æd]',
    partOfSpeech: 'v.',
    meaning: '添加；增加',
    level: 'easy',
    example: 'Please add some sugar.',
    exampleTranslation: '请加一些糖。'
  },
  // 拓展单词
  {
    word: 'type',
    pronunciation: '[taip]',
    partOfSpeech: 'n.',
    meaning: '类型；打字',
    level: 'easy',
    example: 'What type of data is it?',
    exampleTranslation: '这是什么类型的数据？'
  },
  {
    word: 'convert',
    pronunciation: "[kən'vɜːt]",
    partOfSpeech: 'v.',
    meaning: '转换；变换',
    level: 'medium',
    example: 'Can you convert this to text?',
    exampleTranslation: '你能把这个转换成文本吗？'
  },
  {
    word: 'unique',
    pronunciation: "[juː'niːk]",
    partOfSpeech: 'adj.',
    meaning: '唯一的；独特的',
    level: 'hard',
    example: 'Each person has a unique fingerprint.',
    exampleTranslation: '每个人都有独特的指纹。'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '变身魔法 - 数据类型转换',
    emoji: '🎭',
    gradeLevel: '1-2',
    summary: '把数据从一种类型变成另一种类型',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '你知道吗？数据就像会变身的魔法师！数字可以变成文字，文字可以变成数字，小数可以变成整数！让我们来学习这些变身魔法吧！',
      concept: 'Python中有三种常用的数据类型：整数(int)、小数(float)、字符串(str)。我们可以用函数让它们互相转换。',
      syntax: 'int(数据)  # 转换成整数\nstr(数据)  # 转换成字符串\nfloat(数据) # 转换成小数',
      example: {
        title: '数字变文字',
        code: '# 把数字变成字符串\nage = 12\nage_text = str(age)\nprint("我今年" + age_text + "岁")',
        output: '我今年12岁',
        explanation: 'str(12) 把数字12变成字符串"12"，这样就能和文字拼接在一起了。'
      },
      practice: [
        {
          question: '把数字123变成字符串用什么？',
          answer: 'str(123)'
        },
        {
          question: '把字符串"45"变成数字用什么？',
          answer: 'int("45")'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '变身魔法升级！你可以在不同类型之间自由转换：整数变小数、数字变字符串、字符串变数字。但是要注意，不是所有转换都能成功哦！',
      concept: '类型转换有规则：int()会向下取整（小数变整数），float()保留小数部分，str()把数据变成文字形式。',
      syntax: '# 整数转小数\nfloat(5) → 5.0\n\n# 小数转整数（取整数部分）\nint(3.9) → 3\n\n# 数字字符串转整数\nint("100") → 100',
      example: {
        title: '各种类型转换',
        code: '# 整数变小数\nprint(float(10))  # 输出: 10.0\n\n# 小数变整数\nprint(int(3.9))   # 输出: 3（不四舍五入）\n\n# 字符串变整数\nprint(int("25"))  # 输出: 25\n\n# 整数变字符串\nprint(str(100))   # 输出: "100"',
        output: '10.0\n3\n25\n100',
        explanation: 'float() 给整数加上小数点，int() 直接舍去小数部分（不四舍五入），str() 把数字变成可以打印的文字。'
      },
      practice: [
        {
          question: 'int(3.9) 的结果是什么？',
          answer: '3（直接舍去小数，不四舍五入）'
        },
        {
          question: 'float("5.5") 会成功吗？',
          answer: '会，结果是 5.5'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '变身魔法大师！你需要知道哪些转换可以成功，哪些会失败。比如 int("abc") 会报错，但 int("3.14") 也会报错（需要先用 float()）。',
      concept: '类型转换的注意事项：字符串必须是有效的数字格式才能转换，int() 不能直接转换带小数点的字符串。',
      syntax: '# 错误示例\nint("3.14")  # 报错！\nint("abc")   # 报错！\n\n# 正确做法\nint(float("3.14"))  # 先转小数再转整数',
      example: {
        title: '安全的类型转换',
        code: '# 验证转换是否安全\ndef safe_int_convert(s):\n    try:\n        return int(s)\n    except ValueError:\n        return "无法转换"\n\nprint(safe_int_convert("123"))   # 123\nprint(safe_int_convert("3.14"))  # 无法转换\nprint(safe_int_convert("abc"))   # 无法转换',
        output: '123\n无法转换\n无法转换',
        explanation: '用 try-except 可以安全地处理转换失败的情况，避免程序崩溃。'
      },
      practice: [
        {
          question: 'int("3.14") 为什么会报错？',
          answer: 'int() 不能直接转换带小数点的字符串'
        },
        {
          question: '如何把 "3.14" 变成整数 3？',
          answer: 'int(float("3.14"))'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '神奇收集袋 - 集合',
    emoji: '🎒',
    gradeLevel: '1-2',
    summary: '一个不重复、无顺序的数据袋子',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个神奇的收集袋，里面可以放很多卡片。这个袋子有个特殊规则：相同的卡片只能放一张！而且卡片在里面没有顺序，想拿哪张全凭运气。',
      concept: '集合(set)是一个存储数据的容器，里面的元素是唯一的（不重复），而且没有顺序。',
      syntax: '集合名 = {元素1, 元素2, 元素3}',
      example: {
        title: '创建水果集合',
        code: '# 创建一个水果集合\nfruits = {"苹果", "香蕉", "橙子"}\nprint(fruits)',
        output: "{'橙子', '苹果', '香蕉'}",
        explanation: '集合用大括号{}创建，注意输出的顺序可能和输入不一样，因为集合是无序的。'
      },
      practice: [
        {
          question: '集合中的元素可以重复吗？',
          answer: '不可以，集合自动去重'
        },
        {
          question: '集合是有序的吗？',
          answer: '不是，集合是无序的'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的收集袋升级了！它不仅自动去重，还能快速检查某个元素是否在里面。用 in 关键字就能瞬间知道有没有这个元素！',
      concept: '集合的特点：元素唯一、无序、查找速度快。常用于去重和成员检查。',
      syntax: '# 创建集合\ns = {1, 2, 3, 2, 1}  # 自动去重\n\n# 检查元素是否存在\nif 元素 in 集合:\n    # 存在',
      example: {
        title: '集合自动去重',
        code: '# 集合自动去除重复元素\nnumbers = [1, 2, 3, 2, 1, 4, 3, 5]\nunique_numbers = set(numbers)\nprint("原列表:", numbers)\nprint("去重后:", list(unique_numbers))',
        output: '原列表: [1, 2, 3, 2, 1, 4, 3, 5]\n去重后: [1, 2, 3, 4, 5]',
        explanation: 'set() 函数把列表转换成集合，自动去除了重复的元素，再用 list() 转回列表。'
      },
      practice: [
        {
          question: '如何快速检查元素是否在集合中？',
          answer: '用 "元素 in 集合"'
        },
        {
          question: '空集合用 {} 创建可以吗？',
          answer: '不可以，{} 创建的是空字典，空集合要用 set()'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '收集袋大师！集合不仅去重快，查找也快（O(1)时间复杂度）。还可以进行集合运算：并集、交集、差集等。',
      concept: '集合是哈希表结构，支持高效的数学集合运算：交集(&)、并集(|)、差集(-)、对称差集(^)。',
      syntax: '# 交集（共同元素）\nA & B\n\n# 并集（所有元素）\nA | B\n\n# 差集（A有B没有）\nA - B',
      example: {
        title: '集合运算',
        code: '# 两个班级的课程\nclass_a = {"数学", "语文", "英语", "音乐"}\nclass_b = {"数学", "语文", "美术", "体育"}\n\n# 共同课程（交集）\nboth = class_a & class_b\nprint("共同课程:", both)\n\n# 所有课程（并集）\nall_courses = class_a | class_b\nprint("所有课程:", all_courses)',
        output: "共同课程: {'数学', '语文'}\n所有课程: {'数学', '语文', '英语', '音乐', '美术', '体育'}",
        explanation: '& 找出两个集合的共同元素，| 合并两个集合的所有元素（自动去重）。'
      },
      practice: [
        {
          question: '& 运算符得到什么？',
          answer: '交集（两个集合的共同元素）'
        },
        {
          question: '| 运算符得到什么？',
          answer: '并集（两个集合的所有元素）'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '袋子操作 - set() 和 add()',
    emoji: '🛠️',
    gradeLevel: '3-4',
    summary: '创建集合和向集合添加元素',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '让我们来学习如何使用这个神奇收集袋！用 set() 可以创建一个空袋子或者把列表变成袋子，用 add() 可以往袋子里放新卡片！',
      concept: 'set() 函数可以创建空集合或把其他类型转换成集合。add() 方法可以向集合中添加一个新元素。',
      syntax: '# 创建空集合\ns = set()\n\n# 添加元素\ns.add(元素)',
      example: {
        title: '创建和使用集合',
        code: '# 创建一个空集合\nmy_set = set()\n\n# 添加元素\nmy_set.add("苹果")\nmy_set.add("香蕉")\nmy_set.add("苹果")  # 重复不添加\n\nprint(my_set)',
        output: "{'苹果', '香蕉'}",
        explanation: 'set() 创建空集合，add() 添加元素。尝试添加重复元素"苹果"时，集合不会改变。'
      },
      practice: [
        {
          question: '如何创建空集合？',
          answer: '用 set()'
        },
        {
          question: 'add() 可以添加几个元素？',
          answer: '一次只能添加一个元素'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '进阶操作！你可以用 set() 把列表转换成集合（自动去重），也可以用 add() 添加元素。注意 add() 只能添加一个元素，如果要添加多个需要用 update()。',
      concept: 'set() 可以从列表、字符串等创建集合。add() 添加单个元素，如果已存在则忽略。update() 可以添加多个元素。',
      syntax: '# 从列表创建集合\ns = set([1, 2, 3])\n\n# 添加单个元素\ns.add(4)\n\n# 添加多个元素\ns.update([5, 6])',
      example: {
        title: '列表转集合去重',
        code: '# 把有重复的列表转成集合\nnumbers = [1, 2, 3, 2, 1, 4]\n\n# 转换成集合（自动去重）\nunique = set(numbers)\nprint("去重后:", unique)\n\n# 添加新元素\nunique.add(5)\nprint("添加后:", unique)',
        output: '去重后: {1, 2, 3, 4}\n添加后: {1, 2, 3, 4, 5}',
        explanation: 'set() 自动去除了重复元素，add() 添加了新元素5。'
      },
      practice: [
        {
          question: 'set([1, 2, 2, 3]) 的结果是什么？',
          answer: '{1, 2, 3}'
        },
        {
          question: '添加已存在的元素会怎样？',
          answer: '什么也不会发生，集合保持不变'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '袋子操作大师！除了 add() 和 update()，还有 remove() 删除元素、clear() 清空集合、copy() 复制集合等方法。',
      concept: '集合的完整操作方法：添加(add/update)、删除(remove/discard)、清空(clear)、复制(copy)、计算长度(len)等。',
      syntax: '# 删除元素（不存在会报错）\ns.remove(元素)\n\n# 安全删除（不存在不报错）\ns.discard(元素)\n\n# 清空集合\ns.clear()',
      example: {
        title: '完整的集合操作',
        code: '# 集合的完整操作\nfruits = {"苹果", "香蕉", "橙子"}\n\n# 删除元素\nfruits.remove("香蕉")\nprint("删除后:", fruits)\n\n# 安全删除\nfruits.discard("葡萄")  # 不存在也不报错\n\n# 添加多个\nfruits.update(["猕猴桃", "草莓"])\nprint("添加后:", fruits)\n\n# 集合大小\nprint("水果种类:", len(fruits))',
        output: '删除后: {"橙子", "苹果"}\n添加后: {"橙子", "苹果", "猕猴桃", "草莓"}\n水果种类: 4',
        explanation: 'remove() 删除指定元素，discard() 安全删除，update() 批量添加，len() 获取元素个数。'
      },
      practice: [
        {
          question: 'remove() 和 discard() 有什么区别？',
          answer: 'remove() 元素不存在会报错，discard() 不会'
        },
        {
          question: '如何清空整个集合？',
          answer: '用 clear() 方法'
        }
      ]
    }
  },

  {
    id: 'kp-4',
    title: '快速检查 - in 判断',
    emoji: '🔍',
    gradeLevel: '1-2',
    summary: '检查元素是否在集合中',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '你想知道袋子里有没有某张卡片？不用翻遍整个袋子，用 in 就能瞬间知道！就像魔法一样！',
      concept: 'in 关键字可以检查某个元素是否在集合中，返回 True（在）或 False（不在）。',
      syntax: '元素 in 集合',
      example: {
        title: '检查水果是否存在',
        code: '# 创建水果集合\nfruits = {"苹果", "香蕉", "橙子"}\n\n# 检查水果是否存在\nprint("苹果" in fruits)\nprint("葡萄" in fruits)',
        output: 'True\nFalse',
        explanation: '"苹果"在集合中，所以返回 True；"葡萄"不在集合中，所以返回 False。'
      },
      practice: [
        {
          question: 'in 返回什么值？',
          answer: 'True 或 False'
        },
        {
          question: '"苹果" in {"苹果", "香蕉"} 是什么？',
          answer: 'True'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: 'in 不仅可以用在集合上，还可以用在列表、字符串、字典上。在字典上用 in 时，检查的是键而不是值哦！',
      concept: 'in 是成员检查运算符，可以用于各种容器类型。在字典中检查键，在字符串中检查子串。',
      syntax: '# 在集合中\n元素 in 集合\n\n# 在列表中\n元素 in 列表\n\n# 在字典中检查键\n键 in 字典\n\n# 在字符串中\n子串 in 字符串',
      example: {
        title: '各种容器的 in 检查',
        code: '# 集合检查\nprint(2 in {1, 2, 3})  # True\n\n# 列表检查\nprint(2 in [1, 2, 3])  # True\n\n# 字典检查键\nprint("name" in {"name": "Tom"})  # True\n\n# 字符串检查\nprint("py" in "python")  # True',
        output: 'True\nTrue\nTrue\nTrue',
        explanation: 'in 可以用在各种容器中，检查元素/键/子串是否存在。'
      },
      practice: [
        {
          question: '在字典中 in 检查什么？',
          answer: '检查键，不是值'
        },
        {
          question: '"th" in "python" 是什么？',
          answer: 'True'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: 'in 检查大师！结合 not in 可以检查元素是否不存在。in 的查找效率在集合中是 O(1)，非常快，但在列表中是 O(n)，比较慢。',
      concept: '理解不同容器中 in 的效率差异：集合和字典是 O(1)（哈希表），列表和字符串是 O(n)（逐个查找）。',
      syntax: '# 检查不存在\n元素 not in 容器\n\n# 效率对比\n# 集合: O(1) - 非常快\n# 列表: O(n) - 较慢',
      example: {
        title: '高效的成员检查',
        code: '# 大数据量时的效率对比\n\n# 用集合（快）\nfast_set = set(range(100000))\nprint(99999 in fast_set)  # 瞬间完成\n\n# 用列表（慢）\nslow_list = list(range(100000))\nprint(99999 in slow_list)  # 需要逐个查找',
        output: 'True\nTrue',
        explanation: '两个结果都是 True，但集合的查找速度快得多（O(1) vs O(n)）。数据量大时差异明显。'
      },
      practice: [
        {
          question: '集合中的 in 是什么时间复杂度？',
          answer: 'O(1)，非常快'
        },
        {
          question: '列表中的 in 是什么时间复杂度？',
          answer: 'O(n)，需要逐个查找'
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
    mathConcept: '数字与文字',
    question: '下面哪个代码能把数字 123 变成字符串 "123"？\n\n```python\nA. str(123)\nB. int(123)\nC. float(123)\nD. string(123)\n```',
    options: [
      'A',
      'B',
      'C',
      'D'
    ],
    answer: 0, // A
    explanation: 'str() 函数可以把数据转换成字符串。\n\n正确答案：A\n\n- str(123) → "123"（正确）\n- int(123) → 123（还是整数）\n- float(123) → 123.0（变成小数）\n- string() 不是 Python 函数',
    hint: 'str 是 string（字符串）的缩写'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '去重计数',
    question: '有一个列表有重复元素：\n\n```python\nnumbers = [1, 2, 3, 2, 1]\n```\n\n如果要去除重复，应该用什么？',
    options: [
      'list(numbers)',
      'set(numbers)',
      'str(numbers)',
      'tuple(numbers)'
    ],
    answer: 1, // B
    explanation: 'set() 函数可以把列表转换成集合，自动去除重复元素。\n\n结果：{1, 2, 3}\n\n数学知识：这就是"集合"的概念，集合中的元素是唯一的。',
    hint: '集合的特点是元素唯一'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '取整问题',
    question: '执行下面的代码，会输出什么？\n\n```python\nprint(int(3.9))\n```',
    options: [
      '3',
      '4',
      '3.9',
      '报错'
    ],
    answer: 0, // A
    explanation: 'int() 函数把小数转换成整数时，直接舍去小数部分，不进行四舍五入。\n\nint(3.9) → 3（不是4！）\n\n数学知识：这是"向下取整"（floor）的概念。',
    hint: 'int() 不会四舍五入，而是直接舍去小数'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '集合运算',
    question: '有两个集合：\n\n```python\nA = {1, 2, 3}\nB = {2, 3, 4}\n```\n\n使用 A | B 会得到什么？',
    options: [
      '{2, 3}',
      '{1, 2, 3, 4}',
      '{1, 4}',
      '{1, 2, 3, 2, 3, 4}'
    ],
    answer: 1, // B
    explanation: '| 是集合的"并集"运算，把两个集合的所有元素合并（自动去重）。\n\nA | B = {1, 2, 3, 4}\n\n数学知识：并集是集合论中的基本运算，表示"两个集合的所有元素"。',
    hint: '| 是合并的意思'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '容斥原理',
    question: '经典的容斥原理问题！\n\n核桃部落举办晚会：\n- 演出唱歌节目的有 5 人\n- 演出跳舞节目的有 7 人  \n- 两类节目都参加的有 2 人\n\n一共有多少人参加演出？（用集合思想）',
    options: [
      '10人',
      '12人',
      '7人',
      '14人'
    ],
    answer: 0, // A
    explanation: '这是数学中的容斥原理问题！\n\n**思路：** 如果直接把 5 + 7，中间重叠的 2 人被加了两次，所以要减去重复的。\n\n**公式：** 总人数 = 唱歌人数 + 跳舞人数 - 都参加的人数\n**计算：** 5 + 7 - 2 = 10（人）\n\n**编程实现：**\n```python\nsing = {"A", "B", "C", "D", "E"}\ndance = {"D", "E", "F", "G", "H", "I", "J"}\nall_people = sing | dance\nprint(len(all_people))  # 10\n```',
    hint: '想想重叠部分被加了几次？'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '类型判断',
    question: '编程与类型判断！\n\n下面的代码会输出什么？\n\n```python\ns = "3.14"\nresult = int(float(s))\nprint(result)\n```',
    options: [
      '3',
      '3.14',
      '报错',
      '"3.14"'
    ],
    answer: 0, // A
    explanation: '这是一个链式类型转换：\n\n1. s = "3.14"（字符串）\n2. float(s) → 3.14（字符串转小数）\n3. int(3.14) → 3（小数转整数，舍去小数部分）\n\n最终结果：3\n\n**为什么要这样？** 因为 int("3.14") 会报错（int 不能直接转带小数点的字符串），所以需要先转成 float，再转成 int。',
    hint: '分步分析：先 float(s)，再 int(...)'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L8-2',
  title: '龙王传说',
  subtitle: '学会数据类型转换和集合操作',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握 int()、str()、float() 类型转换函数',
    '理解集合的概念和特点（唯一、无序）',
    '学会使用 set() 和 add() 操作集合',
    '掌握 in 关键字进行成员检查',
    '能用集合解决去重和查找问题'
  ],
  prerequisites: [
    'Python 基础语法',
    '列表基础操作',
    '数据类型概念'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['set', 'add', 'int', 'str'],
  medium: ['float', 'type', 'convert', 'unique'],
  hard: ['intersection', 'union', 'duplicate', 'bracket']
}

// 代码模板练习（按难度分组）
// 缩进使用4个空格（Python PEP 8标准）
export const typingTemplates = {
  easy: [
    // 简单单行代码 - 类型转换和集合
    'int("123")',
    'float("3.14")',
    'str(123)',
    'set([1, 2, 3])',
    '"key" in set',
    'len(set)'
  ],
  medium: [
    // 包含缩进的多行代码
    'nums = set([1, 2, 2, 3])',
    'set.add("new_item")',
    'value = int(float("3.9"))',
    'if item in set:',
    'unique = set(list_with_duplicates)',
    'for item in my_set:\n    print(item)'
  ],
  hard: [
    // 复杂的多行代码
    'unique_set = set([1, 2, 2, 3, 3, 3])',
    'result = set_a | set_b',
    'if value in set_a:\n    set_a.add(value)',
    'intersection = set_a & set_b',
    'for i in range(len(list)):\n    unique.add(list[i])'
  ]
}

// 导出所有数据
export const L8_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L8_2_data
