/**
 * PY2 课程 L11-2: 谁是智慧王
 *
 * 核心知识点:
 * 1. 函数定义格式 - def关键字和函数结构
 * 2. 函数返回值 - return语句的使用
 * 3. 返回值的两种情况 - 有返回值和无返回值
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'action',
    pronunciation: '[aek-n]',
    partOfSpeech: 'n.',
    meaning: '行动；行为；措施',
    level: 'easy',
    example: 'We need to take action now.',
    exampleTranslation: '我们现在需要采取行动。'
  },
  {
    word: 'jump',
    pronunciation: '[dmp]',
    partOfSpeech: 'v.',
    meaning: '跳；跳跃',
    level: 'easy',
    example: 'The rabbit can jump very high.',
    exampleTranslation: '兔子能跳得很高。'
  },
  {
    word: 'push',
    pronunciation: '[pu]',
    partOfSpeech: 'v.',
    meaning: '推动；按；挤',
    level: 'medium',
    example: 'Push the button to start.',
    exampleTranslation: '按下按钮开始。'
  },
  // 拓展单词
  {
    word: 'format',
    pronunciation: '[fo-rmaet]',
    partOfSpeech: 'n.',
    meaning: '格式；格式化',
    level: 'hard',
    example: 'Please check the file format.',
    exampleTranslation: '请检查文件格式。'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '函数定义格式 - def的魔法',
    emoji: '📝',
    gradeLevel: '1-2',
    summary: '函数定义使用def关键字，包含函数名、参数和函数体',

    easy: {
      story: '想象你在制作一个魔法卷轴！开头要写"def"，然后给卷轴起个名字，再写下魔法内容。别人就可以用这个卷轴施展魔法了！',
      concept: '定义函数要用def开头，然后写函数名和参数，最后写函数体代码。函数定义后不会立即执行，需要调用才会运行。',
      syntax: `def 函数名(参数):
    # 缩进的代码是函数体
    return 返回值

# 调用函数
result = 函数名(参数值)`,
      example: {
        title: '颜色动作判断器',
        code: `# 定义一个根据颜色返回动作的函数
def action(c):
    if c == "blue":
        return "jump"
a = action("blue")
print(a)`,
        output: 'jump',
        explanation: '定义action函数，参数是c。如果c是"blue"，就返回"jump"。调用action("blue")时，返回"jump"给变量a。'
      },
      practice: [
        { question: '定义函数用什么关键字开头？', answer: '用def开头' },
        { question: '函数名在定义和调用时有什么要求？', answer: '要保持一致' }
      ]
    },

    medium: {
      story: '在编程世界里，定义函数就像编写一个可重复使用的脚本。脚本写好了之后，可以在任何需要的时候执行它！',
      concept: '函数定义是创建函数的过程，包括函数名、参数列表、函数体和返回值。函数名要符合变量命名规则，要能描述函数的功能。',
      syntax: `# 完整的函数定义格式
def 函数名(参数1, 参数2, ...):
    """可选的文档说明"""
    # 函数体代码（注意缩进）
    result = 一些计算
    return result

# 调用示例
value = 函数名(参数值1, 参数值2)`,
      example: {
        title: '完整的函数示例',
        code: `def get_price(category, original_price):
    """计算打折后的价格

    category: 商品类别
    original_price: 原价
    """
    if category == "水果":
        return original_price * 0.9
    elif category == "蔬菜":
        return original_price * 0.8
    else:
        return original_price

# 使用函数
fruit_price = get_price("水果", 20)
print(f"水果价格: {fruit_price}")`,
        output: '水果价格: 18.0',
        explanation: '定义get_price函数，有两个参数。类别是"水果"时打9折。20×0.9=18元。'
      },
      practice: [
        { question: '函数名可以以数字开头吗？', answer: '不可以，函数名要以字母或下划线开头' },
        { question: '函数体代码需要缩进吗？', answer: '需要，函数体要统一缩进（通常是4个空格）' }
      ]
    },

    hard: {
      story: '专业级的函数定义！一个好的函数定义应该有清晰的命名、合理的参数设计、完整的文档字符串，以及明确的返回值。',
      concept: '函数定义是Python编程的核心技能。优秀的函数定义遵循DRY原则（Don\'t Repeat Yourself），让代码可复用、可维护、可测试。',
      syntax: `# 专业函数定义模板
def descriptive_function_name(param1, param2):
    """简短描述函数功能

    Args:
        param1: 参数1的说明
        param2: 参数2的说明

    Returns:
        返回值的说明

    Raises:
        可能抛出的异常
    """
    # 函数实现
    result = process_logic(param1, param2)
    return result`,
      example: {
        title: '专业级函数定义',
        code: `def calculate_discounted_price(price, is_member=False, discount_rate=0.9):
    """计算会员折扣后的价格

    Args:
        price (float): 商品原价
        is_member (bool): 是否会员，默认非会员
        discount_rate (float): 折扣率，默认9折

    Returns:
        float: 折扣后的价格
    """
    if not is_member:
        return price
    final_price = price * discount_rate
    # 确保价格保留两位小数
    return round(final_price, 2)

# 使用示例
normal_price = calculate_discounted_price(100)
member_price = calculate_discounted_price(100, is_member=True)
print(f"非会员: {normal_price}, 会员: {member_price}")`,
        output: '非会员: 100, 会员: 90.0',
        explanation: '这个函数展示了专业的定义方式：有文档字符串、默认参数、类型注释提示。非会员原价100元，会员享受9折90元。'
      },
      practice: [
        { question: '为什么要写文档字符串？', answer: '方便理解函数的功能、参数和返回值，提高代码可维护性' },
        { question: '函数命名应该用动词还是名词？', answer: '通常用动词或动词短语，因为函数代表一个操作' }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '函数返回值 - return的威力',
    emoji: '↩️',
    gradeLevel: '1-2',
    summary: 'return语句将结果返回给调用者，并结束函数运行',

    easy: {
      story: 'return就像快递员！函数计算好结果后，用return把结果"快递"给调用者，然后函数就完成任务休息了。',
      concept: 'return语句有两个作用：① 把结果返回给调用者 ② 结束函数的运行。return后面的代码不会被执行。',
      syntax: `def 函数名(参数):
    # 计算结果
    return 要返回的值
    # 这下面的代码不会执行！`,
      example: {
        title: '有返回值的函数',
        code: `def action(c):
    if c == "blue":
        return "jump"
    else:
        return "run"

# 调用函数
result = action("blue")
print(result)

result2 = action("red")
print(result2)`,
        output: 'jump\nrun',
        explanation: 'action("blue")返回"jump"，action("red")返回"run"。return把结果返回给变量。'
      },
      practice: [
        { question: 'return后面的代码会执行吗？', answer: '不会，return会结束函数' },
        { question: '函数必须有return吗？', answer: '不是必须的，没有return的函数返回None' }
      ]
    },

    medium: {
      story: 'return就像函数的"出口"！遇到return，函数就会立即交出结果并退出。每个return都是函数的一个可能的出口。',
      concept: 'return是函数的关键语句，它将计算结果传递给调用者。函数可以有多个return语句，根据不同条件返回不同的值。执行到任何一个return时，函数都会立即结束。',
      syntax: `# 多个return的情况
def func(参数):
    if 条件1:
        return 结果1  # 满足条件1就返回
    if 条件2:
        return 结果2  # 满足条件2就返回
    return 默认结果  # 都不满足返回默认值

# 调用
result = func(参数值)`,
      example: {
        title: '移动方向判断',
        code: `def move(r, c):
    """根据位置返回移动方向"""
    if r < 4:
        return "down"
    if c < 2:
        return "right"
    return "stay"  # 在中心位置

# 测试不同位置
print("位置(3,5):", move(3, 5))  # r=3 < 4
print("位置(5,1):", move(5, 1))  # c=1 < 2
print("位置(4,2):", move(4, 2))  # 中心`,
        output: '位置(3,5): down\n位置(5,1): right\n位置(4,2): stay',
        explanation: 'move(3,5): r=3<4满足，返回"down"；move(5,1): r=5>=4不满足，c=1<2满足，返回"right"；move(4,2): 都不满足，返回"stay"。'
      },
      practice: [
        { question: '一个函数可以有多个return吗？', answer: '可以，不同条件下可以返回不同的值' },
        { question: '执行return后函数还会继续运行吗？', answer: '不会，return会立即结束函数运行' }
      ]
    },

    hard: {
      story: '高级return技巧！return不仅可以返回简单的值，还可以返回表达式、元组、列表等复杂对象，甚至可以在return中进行计算。',
      concept: 'return是函数与调用者之间的桥梁。理解return的执行时机和返回值类型，是掌握函数编程的关键。return后可以是任何有效的Python表达式。',
      syntax: `# return可以返回各种类型
# 1. 简单值
return 42

# 2. 表达式
return x * 2 + y

# 3. 条件表达式
return x if x > 0 else -x

# 4. 多个值（元组）
return value1, value2

# 5. 列表或字典
return [1, 2, 3]
return {"key": "value"}`,
      example: {
        title: '高级return用法',
        code: `def analyze_number(n):
    """分析数字并返回多种信息"""
    # 返回多个值（打包成元组）
    is_positive = n > 0
    is_even = n % 2 == 0
    absolute = abs(n)

    # return一个元组包含多个结果
    return is_positive, is_even, absolute

# 接收多个返回值
positive, even, abs_value = analyze_number(-5)
print(f"正数: {positive}, 偶数: {even}, 绝对值: {abs_value}")

# return表达式
def quick_math(x, y):
    return x * x + y * y  # 直接返回计算结果

print(f"平方和: {quick_math(3, 4)}")`,
        output: '正数: False, 偶数: False, 绝对值: 5\n平方和: 25',
        explanation: 'analyze_number返回三个值：-5不是正数(False)，不是偶数(False)，绝对值是5。quick_math(3,4)返回3²+4²=25。'
      },
      practice: [
        { question: 'return x, y 实际返回的是什么？', answer: '返回一个元组 (x, y)' },
        { question: '可以在return中进行复杂计算吗？', answer: '可以，return后面可以是任何有效的Python表达式' }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '有返回值 vs 无返回值',
    emoji: '📦',
    gradeLevel: '1-2',
    summary: '函数可以有返回值，也可以没有返回值',

    easy: {
      story: '有的函数像快递员，会把东西送给你（有返回值）；有的函数像广播员，只负责通知消息（无返回值）。',
      concept: '函数可以有return返回值，也可以没有return。没有return的函数会返回None。有返回值的函数可以将结果用于后续计算。',
      syntax: `# 有返回值的函数
def func_with_return():
    return 结果

# 无返回值的函数
def func_without_return():
    print("做一些事")
    # 没有return，返回None`,
      example: {
        title: '两种函数对比',
        code: `# 有返回值
def action_with_return(c):
    if c == "blue":
        return "jump"
    return "run"

# 无返回值
def action_without_return(c):
    print(c)
    print("run")

# 使用有返回值的函数
result = action_with_return("blue")
print(result)

# 使用无返回值的函数
action_without_return("blue")`,
        output: 'jump\nblue\nrun',
        explanation: '有返回值的函数可以把结果存到变量里。无返回值的函数直接执行操作，返回None（不显示）。'
      },
      practice: [
        { question: '没有return的函数返回什么？', answer: '返回None' },
        { question: '打印函数和无返回值函数有什么区别？', answer: '打印会显示内容，无返回值函数执行操作但不返回值' }
      ]
    },

    medium: {
      story: '在游戏中，有些技能会造成伤害并返回伤害数值（有返回值），有些技能直接产生效果不返回数值（无返回值）。根据需要选择！',
      concept: '有返回值的函数通常用于计算和查询，无返回值的函数通常用于执行操作、修改状态、打印输出等。选择哪种取决于函数的用途。',
      syntax: `# 计算类函数（有返回值）
def calculate(参数):
    result = 计算
    return result

# 操作类函数（无返回值）
def do_something(参数):
    # 执行操作
    print("处理中...")
    # 不需要return`,
      example: {
        title: '两种类型函数的应用',
        code: `# 有返回值：计算函数
def calculate_score(hit, miss):
    """计算得分"""
    score = hit * 10 - miss * 5
    return score

# 无返回值：显示函数
def show_result(score):
    """显示结果"""
    print(f"你的得分是: {score}")
    if score > 50:
        print("表现优秀！")
    # 没有return

# 配合使用
my_score = calculate_score(8, 2)  # 有返回值，可以存起来
show_result(my_score)  # 无返回值，直接执行

# 也可以直接用
total = calculate_score(5, 1) + calculate_score(6, 3)
print(f"总分: {total}")`,
        output: '你的得分是: 70\n表现优秀！\n总分: 90',
        explanation: 'calculate_score有返回值，可以参与计算。show_result无返回值，只负责显示。(5×10-1×5)+(6×10-3×5)=45+45=90分。'
      },
      practice: [
        { question: '计算类函数应该有返回值吗？', answer: '应该有，这样结果可以用于后续计算' },
        { question: '只用于打印的函数需要返回值吗？', answer: '不需要，打印本身就是操作' }
      ]
    },

    hard: {
      story: '高级编程中的函数设计！理解函数是否有返回值，是函数式编程的重要概念。纯函数总是有返回值且无副作用，命令式函数可能有副作用。',
      concept: '有返回值的函数是表达式，可以嵌入其他表达式中。无返回值的函数是语句，只能独立调用。设计函数时，要明确函数是否需要返回值，这影响函数的使用方式。',
      syntax: `# 纯函数（有返回值，无副作用）
def pure_func(x):
    return x * 2

# 副作用函数（无返回值，修改外部状态）
def side_effect_func(items):
    items.append("new")
    # 修改了列表，无返回值

# 混合型（既计算又有副作用）
def mixed_func(x):
    result = x * 2
    print(f"计算: {x} * 2 = {result}")
    return result  # 有副作用也有返回值`,
      example: {
        title: '函数类型对比',
        code: `# 纯函数：可预测，无副作用
def multiply(x, factor):
    """纯函数，相同输入总是相同输出"""
    return x * factor

# 副作用函数：修改外部状态
def add_item(cart, item):
    """修改购物车，无返回值"""
    cart.append(item)
    # 修改了cart，但不返回

# 可以链式调用的函数
def process_number(n):
    """返回处理后的数字，可链式调用"""
    return n * 2 + 10

# 测试
result = process_number(process_number(5))  # 链式调用
print(f"链式调用结果: {result}")

# 副作用函数用法
shopping_cart = ["苹果"]
add_item(shopping_cart, "香蕉")  # 直接调用，不接收返回值
add_item(shopping_cart, "橙子")
print(f"购物车: {shopping_cart}")`,
        output: '链式调用结果: 50\n购物车: ["苹果", "香蕉", "橙子"]',
        explanation: '纯函数process_number可以链式调用：5×2+10=20，再20×2+10=50。add_item直接修改列表，无返回值。'
      },
      practice: [
        { question: '纯函数有什么优点？', answer: '可预测、可测试、可缓存、易于理解' },
        { question: '什么情况下使用无返回值的函数？', answer: '当函数的目的是执行操作（如打印、修改状态）而不是返回计算结果时' }
      ]
    }
  }
]

// 习题数据（编程 × 数学融合）
export const exercises = [
  // 基础题（1-2年级）
  {
    id: 'ex-1',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '',
    type: 'multiple-choice',
    mathConcept: '条件判断',
    question: '下列选项中，正确定义函数的是？\n\nA. `function myFunc():`\nB. `def myFunc():`\nC. `define myFunc():`\nD. `func myFunc():`',
    options: [
      'A',
      'B',
      'C'
    ],
    answer: 1, // B
    explanation: 'Python中定义函数使用def关键字，格式是`def 函数名(参数):`。\n\n记忆技巧：def是define（定义）的缩写。',
    hint: 'Python用def来定义函数'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '',
    type: 'multiple-choice',
    mathConcept: '数值代入',
    question: '执行下列代码，输出结果是？\n\n```python\ndef age(x):\n    if x < 18:\n        print("未成年")\n    else:\n        print("成年")\n\nage(10)\n```',
    options: [
      '"未成年"',
      '"成年"',
      '10'
    ],
    answer: 0, // A
    explanation: '调用age(10)时，x=10。10<18满足条件，打印"未成年"。\n\n数学知识：10小于18，满足条件。',
    hint: '10和18比较大小'
  },

  // 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '',
    type: 'multiple-choice',
    mathConcept: '逻辑推理',
    question: '执行下方代码，会输出什么？\n\n```python\ndef move(r, c):\n    if r < 4:\n        return "down"\n    if c < 2:\n        return "right"\n    return "stay"\n\nprint(move(5, 1))\n```',
    options: [
      '"down"',
      '"right"',
      '"stay"'
    ],
    answer: 1, // B
    explanation: 'move(5, 1)时，r=5，第一个条件r<4不满足。c=1，第二个条件c<2满足，返回"right"。\n\n数学知识：5>4不满足，1<2满足。',
    hint: '从上到下检查每个条件'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '',
    type: 'multiple-choice',
    mathConcept: '参数匹配',
    question: 'cal()函数有两个参数：品类和价格。下面哪个可以计算售价20元水果的折扣价？\n\n```python\ndef cal(name, price):\n    if name == "水果":\n        return price * 0.9\n    return price\n```',
    options: [
      'cal(20, "水果")',
      'cal("水果", 20)',
      'cal(price=20, name="水果")'
    ],
    answer: 1, // B
    explanation: '函数定义时参数顺序是(name, price)。调用时"水果"对应name，20对应price。\n\n数学知识：参数传递要对应正确，20×0.9=18元。',
    hint: '参数顺序要和定义时一致'
  },

  // 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '',
    type: 'multiple-choice',
    mathConcept: '条件筛选',
    question: '根据参数表，哪个食物符合"热量<500KJ、口味甜、价格<5元、产地云南"？\n\n| 食物 | 热量 | 口味 | 价格 | 产地 |\n|------|------|------|------|----------|\n| 果冻 | 204 | 甜 | 6元 | 安徽 |\n| 辣条 | 408 | 辣 | 2元 | 湖南 |\n| 汉堡 | 659 | 咸 | 30元 | 云南 |\n| 香蕉 | 105 | 甜 | 2元 | 云南 |',
    options: [
      '果冻',
      '辣条',
      '香蕉'
    ],
    answer: 2, // C
    explanation: '香蕉：热量105<500✓、口味甜✓、价格2<5✓、产地云南✓。所有条件都满足！\n\n数学知识：这是多条件筛选问题，需要同时满足所有条件。',
    hint: '逐个条件检查每个食物'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '',
    type: 'multiple-choice',
    mathConcept: '函数返回值',
    question: '执行下方代码，最终输出什么？\n\n```python\ndef action(c):\n    if c == "blue":\n        return "jump"\n    if c == "red":\n        return "stop"\n    return "go"\n\nresult = action("green")\nprint(result)\n```',
    options: [
      '"jump"',
      '"stop"',
      '"go"'
    ],
    answer: 2, // C
    explanation: 'action("green")时，c="green"。不是"blue"也不是"red"，前两个if都不满足，执行最后的return "go"。\n\n这是默认值处理模式：当所有特定条件都不满足时，返回默认结果。',
    hint: 'green不等于blue也不等于red'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L11-2',
  title: '谁是智慧王',
  subtitle: '学会函数定义格式、return语句和返回值',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握函数定义的完整格式',
    '理解return语句的作用',
    '区分有返回值和无返回值的函数',
    '学会使用多个return处理不同条件'
  ],
  prerequisites: [
    'Python基础语法',
    '变量和数据类型',
    'if条件判断',
    'L11-1 函数概念'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['def', 'return', 'jump', 'push'],
  medium: ['action', 'format', 'syntax', 'python'],
  hard: ['parameter', 'condition', 'function', 'statement']
}

// 打字练习代码模板（按难度分组）
export const typingTemplates = {
  easy: [
    // 函数定义基础
    'def action():',
    'def move():',
    'def check():',

    // return语句
    'return "jump"',
    'return "stop"',
    'return "go"',

    // if-return组合
    'if c == "blue":\n    return',
    'if x > 0:\n    return x',

    // 无返回值函数
    'def print_result():',
    'def show_data():'
  ],
  medium: [
    // 带参数的函数
    'def action(c):',
    'def move(r, c):',
    'def check(x, y):',

    // 多个return
    'def func(x):\n    if x > 0:\n        return x\n    return 0',
    'def test(n):\n    if n % 2 == 0:\n        return True\n    return False',

    // 条件返回
    'if c == "blue":\n    return "jump"\nelse:\n    return "run"',

    // 函数调用
    'result = func(5)',
    'value = move(3, 4)'
  ],
  hard: [
    // 复杂函数定义
    'def move(r, c):\n    if r < 4:\n        return "down"\n    if c < 2:\n        return "right"\n    return "stay"',

    // 带文档字符串
    'def func(x):\n    """函数说明"""\n    return x * 2',

    // 多条件返回
    'def action(c):\n    if c == "blue":\n        return "jump"\n    elif c == "red":\n        return "stop"\n    return "go"',

    // 布尔返回函数
    'def is_even(n):\n    if n % 2 == 0:\n        return True\n    return False',

    // 有返回值和无返回值对比
    'def with_return():\n    return 5\n\ndef without_return():\n    print("done")'
  ]
}

// 导出所有数据
export const L11_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L11_2_data
