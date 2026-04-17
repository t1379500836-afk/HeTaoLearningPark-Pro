/**
 * PY2 课程 L8-1: 猫咪和小鱼
 *
 * 核心知识点:
 * 1. 字典结构
 * 2. 查字典
 * 3. 修改、新增键值对
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'power',
    pronunciation: "['pauə(r)]",
    partOfSpeech: 'n.',
    meaning: '力量；能量；权力',
    level: 'easy',
    example: 'He has great power.',
    exampleTranslation: '他有强大的力量。',
    source: 'ocr'
  },
  {
    word: 'note',
    pronunciation: '[nəut]',
    partOfSpeech: 'n.',
    meaning: '笔记；便条；记录',
    level: 'easy',
    example: 'I took notes carefully in the class.',
    exampleTranslation: '我上课认真地做了笔记。',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'dictionary',
    pronunciation: "['dikʃəneri]",
    partOfSpeech: 'n.',
    meaning: '字典；词典',
    level: 'medium',
    example: 'Look up the word in the dictionary.',
    exampleTranslation: '在字典里查这个单词。',
    source: 'extended'
  },
  {
    word: 'key',
    pronunciation: '[kiː]',
    partOfSpeech: 'n.',
    meaning: '键；关键；钥匙',
    level: 'easy',
    example: 'The key opens the door.',
    exampleTranslation: '钥匙打开了门。',
    source: 'extended'
  },
  {
    word: 'value',
    pronunciation: "['væljuː]",
    partOfSpeech: 'n.',
    meaning: '值；数值；价值',
    level: 'medium',
    example: 'The value of x is 5.',
    exampleTranslation: 'x 的值是 5。',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '神奇宝箱 - 字典结构',
    emoji: '📦',
    gradeLevel: '1-2',
    summary: '用大括号{}把成对的数据装起来，键和值用冒号连接',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个神奇宝箱，里面有很多小格子，每个格子上都贴着标签。比如"苹果"的格子里写着"5元"，"香蕉"的格子里写着"3元"。这就是字典！',
      concept: '字典用来存储成对的数据，左边是"键"（标签），右边是"值"（内容）。用大括号{}把整个字典括起来。',
      syntax: '字典名 = {键: 值, 键: 值}',
      example: {
        title: '水果价格表',
        code: '# 创建一个水果价格字典\nprices = {"苹果": 5, "香蕉": 3}\nprint(prices)',
        output: "{'苹果': 5, '香蕉': 3}",
        explanation: '字典用大括号{}括起来，键和值中间用冒号:隔开，键值对之间用逗号,分开。'
      },
      practice: [
        {
          question: '字典用什么括起来？',
          answer: '大括号 {}'
        },
        {
          question: '键和值中间用什么符号连接？',
          answer: '冒号 :'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '你的宝箱升级了！现在可以存储更多类型的信息：姓名和年龄、商品和价格、学生和成绩等等。字典是处理"成对数据"的最佳工具！',
      concept: '字典的键必须是唯一的（不能重复），值可以是任意类型。字符串键需要用引号括起来。',
      syntax: '# 创建字典\ninfo = {"name": "小明", "age": 10}\n# 键是字符串，用引号\n# 值可以是数字、字符串等',
      example: {
        title: '学生信息卡',
        code: '# 存储学生的信息\nstudent = {"name": "小红", "grade": 5, "score": 95}\nprint("姓名:", student["name"])\nprint("成绩:", student["score"])',
        output: '姓名: 小红\n成绩: 95',
        explanation: '字典可以同时存储多种类型的数据，通过键来快速访问对应的值。'
      },
      practice: [
        {
          question: '字典的键可以重复吗？',
          answer: '不能，键必须唯一'
        },
        {
          question: '值的类型可以不同吗？',
          answer: '可以，值可以是任意类型'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '大师级宝箱管理员！字典不仅存储数据，还能实现快速查找、统计分组、配置管理等高级功能。',
      concept: '字典是哈希表结构，查找速度快，时间复杂度是O(1)。常用于计数器、分组统计、配置管理等场景。',
      syntax: '# 计数器应用\nfor item in items:\n    if item in counts:\n        counts[item] += 1\n    else:\n        counts[item] = 1',
      example: {
        title: '统计字符出现次数',
        code: '# 统计字符串中每个字符出现的次数\ntext = "hello banana"\ncounts = {}\nfor char in text:\n    if char in counts:\n        counts[char] += 1\n    else:\n        counts[char] = 1\nprint(counts)',
        output: "{'h': 1, 'e': 1, 'l': 2, 'o': 2, ' ': 1, 'b': 1, 'a': 3, 'n': 2}",
        explanation: '用字典统计每个字符出现的次数。先用 in 判断键是否存在，存在就加1，不存在就设为1。'
      },
      practice: [
        {
          question: '字典查找的时间复杂度是多少？',
          answer: 'O(1)，非常快'
        },
        {
          question: '如何判断一个键是否在字典中？',
          answer: '用 "键 in 字典名" 判断'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '寻宝钥匙 - 查字典',
    emoji: '🔑',
    gradeLevel: '1-2',
    summary: '用键来获取对应的值，就像用钥匙开宝箱',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '现在我们要从宝箱里拿东西啦！如果你想知道"苹果"多少钱，就用"苹果"这把钥匙去开对应的格子，就能看到里面的价格了！',
      concept: '通过键来获取字典中的值，就像查字典一样，知道要查的字（键），就能找到对应的解释（值）。',
      syntax: '字典名[键]',
      example: {
        title: '查水果价格',
        code: '# 查询"苹果"的价格\nprices = {"苹果": 5, "香蕉": 3}\nprint(prices["苹果"])',
        output: '5',
        explanation: '用方括号[]和键来获取对应的值，prices["苹果"]就得到了5。'
      },
      practice: [
        {
          question: '如何获取字典中某个键的值？',
          answer: '用 字典名[键]'
        },
        {
          question: 'prices["香蕉"] 能得到什么？',
          answer: '香蕉对应的值（价格）'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '进阶寻宝！如果宝箱里没有这个格子会怎样？会报错！所以我们可以用 get() 方法，找不到就返回默认值，更安全。',
      concept: '直接用方括号访问时，如果键不存在会报错。用 get() 方法可以在键不存在时返回默认值，避免程序崩溃。',
      syntax: '# 直接访问（键不存在会报错）\n值 = 字典名[键]\n\n# 安全访问（键不存在返回默认值）\n值 = 字典名.get(键, 默认值)',
      example: {
        title: '安全的查询方式',
        code: '# 使用 get() 方法安全查询\nscores = {"小明": 95, "小红": 88}\n\n# 查询存在的学生\nprint("小明的成绩:", scores.get("小明", "未找到"))\n\n# 查询不存在的学生\nprint("小刚的成绩:", scores.get("小刚", "未找到"))',
        output: '小明的成绩: 95\n小刚的成绩: 未找到',
        explanation: 'get() 方法的第二个参数是默认值，当键不存在时返回这个值，而不是报错。'
      },
      practice: [
        {
          question: '键不存在时，直接访问会怎样？',
          answer: '会报错（KeyError）'
        },
        {
          question: 'get() 方法的好处是什么？',
          answer: '键不存在时返回默认值，不会报错'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '寻宝大师！你可以用 in 关键字先检查键是否存在，或者用 get() 设置默认值，还可以遍历字典的所有键值对。',
      concept: '掌握多种字典操作技巧：检查键存在、遍历字典、获取所有键或值，是处理复杂数据的基础。',
      syntax: '# 检查键是否存在\nif 键 in 字典名:\n    # 处理逻辑\n\n# 遍历字典\nfor k, v in 字典名.items():\n    print(k, v)',
      example: {
        title: '完整的字典操作',
        code: '# 字典的多种操作\nscores = {"小明": 95, "小红": 88}\n\n# 检查键是否存在\nif "小明" in scores:\n    print("找到了小明")\n\n# 遍历所有键值对\nfor name, score in scores.items():\n    print(f"{name}: {score}分")\n\n# 获取所有键\nprint("所有学生:", list(scores.keys()))',
        output: '找到了小明\n小明: 95分\n小红: 88分\n所有学生: ["小明", "小红"]',
        explanation: 'in 关键字检查键是否存在，items() 遍历键值对，keys() 获取所有键，values() 获取所有值。'
      },
      practice: [
        {
          question: '如何检查键是否在字典中？',
          answer: '用 "键 in 字典名"'
        },
        {
          question: 'items() 方法返回什么？',
          answer: '返回所有键值对的迭代器'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '宝箱升级 - 修改和新增',
    emoji: '⬆️',
    gradeLevel: '1-2',
    summary: '用赋值语句修改值或新增键值对',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '宝箱里的内容可以随时变化！如果你想修改"苹果"的价格，就直接往那个格子里放新价格。如果你想添加新水果，就开一个新格子！',
      concept: '用方括号和赋值号=来修改或新增。如果键已经存在，就修改值；如果键不存在，就新增这个键值对。',
      syntax: '字典名[键] = 新值',
      example: {
        title: '修改价格',
        code: '# 修改苹果的价格\nprices = {"苹果": 5, "香蕉": 3}\nprices["苹果"] = 8  # 修改\nprint(prices)',
        output: "{'苹果': 8, '香蕉': 3}",
        explanation: '"苹果"这个键已经存在，所以把它的值从5改成了8。'
      },
      practice: [
        {
          question: '修改字典值的格式是什么？',
          answer: '字典名[键] = 新值'
        },
        {
          question: '如果键不存在会怎样？',
          answer: '会新增这个键值对'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '宝箱完全升级！你可以随时修改任何格子，添加新格子。同一个键可以多次修改，最终以最后一次赋值为准。',
      concept: '字典的"有改无增"原则：键存在就修改，键不存在就新增。这是字典最常用的操作之一。',
      syntax: '# 修改现有值\n字典名["已存在的键"] = 新值\n\n# 添加新值\n字典名["新键"] = 新值',
      example: {
        title: '修改和新增',
        code: '# 修改现有水果价格，添加新水果\nprices = {"苹果": 5, "香蕉": 3}\n\n# 修改苹果价格\nprices["苹果"] = 8\n\n# 添加新水果\nprices["猕猴桃"] = 6\n\nprint(prices)',
        output: "{'苹果': 8, '香蕉': 3, '猕猴桃': 6}",
        explanation: '苹果的价格被修改了，猕猴桃是新添加的，香蕉保持不变。'
      },
      practice: [
        {
          question: '"有改无增"是什么意思？',
          answer: '键存在就修改，键不存在就新增'
        },
        {
          question: '如何删除字典中的键值对？',
          answer: '用 del 字典名[键]'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '宝箱大师！你不仅可以修改和新增，还可以删除、合并、更新字典，实现复杂的数据管理功能。',
      concept: '掌握字典的高级操作：删除键值对、合并字典、批量更新等，是处理复杂数据结构的必备技能。',
      syntax: '# 删除键值对\ndel 字典名[键]\n\n# 批量更新\n字典名.update({键: 值, 键: 值})\n\n# 合并字典\n新字典 = {**字典1, **字典2}',
      example: {
        title: '完整的字典管理',
        code: '# 字典的完整操作\nscores = {"小明": 95, "小红": 88}\n\n# 修改分数\nscores["小明"] = 98\n\n# 添加学生\nscores["小刚"] = 92\n\n# 删除学生\ndel scores["小红"]\n\n# 批量更新\nscores.update({"小明": 100, "小丽": 85})\n\nprint(scores)',
        output: "{'小明': 100, '小刚': 92, '小丽': 85}",
        explanation: '展示了修改、添加、删除、批量更新等所有常用操作。update() 可以一次性修改多个键值对。'
      },
      practice: [
        {
          question: '如何删除字典中的键值对？',
          answer: '用 del 字典名[键]'
        },
        {
          question: 'update() 方法的作用是什么？',
          answer: '批量更新多个键值对'
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
    mathConcept: '模式识别',
    question: '下面哪个是正确的字典格式？\n\n```python\nA. {"苹果": 5, "香蕉": 3}\nB. ["苹果": 5, "香蕉": 3]\nC. ("苹果": 5, "香蕉": 3)\nD. <"苹果": 5, "香蕉": 3>\n```',
    options: [
      'A',
      'B',
      'C',
      'D'
    ],
    answer: 0, // A
    explanation: '字典用大括号{}括起来，键和值之间用冒号:连接。\n\n正确答案：A\n\n格式：{键: 值, 键: 值}\n记忆方法：{}像宝箱，:像钥匙开锁',
    hint: '想想字典用什么括号？'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '一一对应',
    question: '有一个水果价格字典：\n\n```python\nprices = {"苹果": 5, "香蕉": 3}\n```\n\n执行下面的代码，会输出什么？\n\n```python\nprint(prices["苹果"])\n```',
    options: [
      '5',
      '3',
      '苹果',
      '报错'
    ],
    answer: 0, // A
    explanation: 'prices["苹果"] 是用键"苹果"去查询对应的值，结果是5。\n\n数学知识：这就是"一一对应"关系，每个键对应一个唯一的值。',
    hint: '用"苹果"这个键去查字典'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '替换与更新',
    question: '请看下面的代码：\n\n```python\nfruit = {"苹果": 5.9, "香蕉": 3}\n```\n\n如果要完成以下两个操作，应该用什么代码？\n1. 将"苹果"的值改为8\n2. 新增"猕猴桃": 6\n\n```python\nA. fruit["苹果"] = 8; fruit["猕猴桃"] = 6\nB. fruit[苹果] = 8; fruit[猕猴桃] = 6\nC. fruit["苹果"] == 8; fruit["猕猴桃"] == 6\nD. fruit.苹果 = 8; fruit.猕猴桃 = 6\n```',
    options: [
      'A',
      'B',
      'C',
      'D'
    ],
    answer: 0, // A
    explanation: '字典修改的格式是 字典名[键] = 值，键是字符串需要用引号括起来。\n\n正确答案：A\n\nB选项没有引号，C选项用了==（比较），D选项用了错误的点语法。',
    hint: '键是字符串，需要用引号'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '查找问题',
    question: '有一个学生成绩字典：\n\n```python\nscores = {"小明": 95, "小红": 88, "小刚": 92}\n```\n\n如何安全地查询"小丽"的成绩，如果不存在就返回"未找到"？\n\n```python\nA. scores["小丽"] or "未找到"\nB. scores.get("小丽", "未找到")\nC. scores["小丽"] if "小丽" in scores else "未找到"\nD. 以上都可以\n```',
    options: [
      'A',
      'B',
      'C',
      'D'
    ],
    answer: 1, // B (get()方法是正确做法)
    explanation: '这三种方法都可以实现安全查询：\n\nA. 短路或运算（但会先报错）\nB. get()方法（推荐，最简洁）\nC. 条件表达式（正确但较复杂）\n\n注意：A实际上会先报错，所以正确答案是B和C。但作为选择题，D是合理的。',
    correction: 'A选项实际上会先报KeyError，所以正确做法是B或C。推荐使用B的get()方法，最简洁安全。',
    hint: 'get() 方法可以设置默认值'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '逻辑推理',
    question: '经典的逻辑推理题！\n\n张老师把红、白、蓝各一个气球分给小春、小宇、小华三位小朋友。根据下面三句话，猜猜他们各分到什么颜色的气球？\n\n1. 小春说："我分到的不是蓝气球。"\n2. 小宇说："我分到的不是白气球。"\n3. 小华说："我看见蓝气球和红气球分给上面两位了。"\n\n小春分到的是什么颜色的气球？',
    options: [
      '红色',
      '蓝色',
      '白色'
    ],
    answer: 0, // A
    explanation: '这是一道逻辑推理题！\n\n**推理过程：**\n1. 根据小华的话：小华分到的是白色气球\n2. 小春不是蓝色，小华是白色，所以小春是红色\n3. 剩下的蓝色气球分给小宇\n\n**答案：** 小春分到红色气球，小宇分到蓝色气球，小华分到白色气球。\n\n**用字典表示：**\n```python\n分配 = {"小春": "红色", "小宇": "蓝色", "小华": "白色"}\n```',
    hint: '从小华的话入手，她看到的是什么？'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '统计与计数',
    question: '编程与数学结合！\n\n统计一句话中每个字母出现的次数，下面哪个代码是正确的？\n\n```python\ntext = "hello banana"\ncounts = {}\nfor letter in text:\n    _________\n\nprint(counts)\n# 期望输出: {"h": 1, "e": 1, "l": 2, "o": 2, ...}\n```\n\n应该填入什么代码？',
    options: [
      'counts[letter] += 1',
      'if letter in counts: counts[letter] += 1 else: counts[letter] = 1',
      'counts.add(letter)',
      'counts.append(letter)'
    ],
    answer: 1, // B
    explanation: '正确答案：B\n\n**解释：**\n- A选项：如果字母不存在会报错（KeyError）\n- B选项：先用 in 判断键是否存在，存在就加1，不存在就设为1\n- C选项：add是集合的方法，字典没有\n- D选项：append是列表的方法，字典没有\n\n**数学知识：** 这就是"计数"问题，用字典可以统计任意元素的出现次数。',
    hint: '第一次遇到某个字母时，字典里还没有这个键'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L8-1',
  title: '猫咪和小鱼',
  subtitle: '学会字典的创建、查询和修改',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解字典的概念和用途',
    '掌握字典的创建格式（大括号、冒号、逗号）',
    '学会通过键查询值',
    '掌握修改和新增键值对的方法',
    '能用字典解决实际编程问题'
  ],
  prerequisites: [
    'Python 基础语法',
    '变量和数据类型',
    '列表基础操作'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['dict', 'key', 'value', 'get'],
  medium: ['power', 'note', 'update', 'items'],
  hard: ['dictionary', 'keys', 'values', 'bracket']
}

// 代码模板练习（按难度分组）
// 缩进使用4个空格（Python PEP 8标准）
export const typingTemplates = {
  easy: [
    // 简单单行代码 - 字典操作
    '{"name": "Tom"}',
    'dict["key"]',
    'dict.get("key")',
    'dict.get("key", 0)',
    'len(dict)',
    '"key" in dict'
  ],
  medium: [
    // 包含缩进的多行代码
    'student = {"name": "Tom", "age": 10}',
    'score = student["score"]',
    'name = dict.get("name", "未知")',
    'prices["苹果"] = 8',
    'for key in dict:',
    'if "key" in dict:\n    value = dict["key"]'
  ],
  hard: [
    // 复杂的多行代码
    'for key, value in dict.items():',
    'if "key" in dict:\n    value = dict["key"]',
    'if char in counts:\n    counts[char] += 1\nelse:\n    counts[char] = 1',
    'dict.update({"key1": "value1", "key2": "value2"})',
    'for key in sorted(dict.keys()):'
  ]
}

// 导出所有数据
export const L8_1_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L8_1_data
