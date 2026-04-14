/**
 * PY2 课程 L11-1: 明星养成记
 *
 * 核心知识点:
 * 1. 认识函数 - 函数的概念和结构
 * 2. 调用函数 - 先定义后调用的原则
 * 3. 多参函数 - 多个参数的使用
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'define',
    pronunciation: '[di-fain]',
    partOfSpeech: 'v.',
    meaning: '定义；解释；界定',
    level: 'easy',
    example: 'We need to define the rules first.',
    exampleTranslation: '我们需要先定义规则。'
  },
  {
    word: 'return',
    pronunciation: '[ri-t3:rn]',
    partOfSpeech: 'v.',
    meaning: '返回；归还；回报',
    level: 'easy',
    example: 'Please return the book to the library.',
    exampleTranslation: '请把书还给图书馆。'
  },
  {
    word: 'attack',
    pronunciation: '[a-taek]',
    partOfSpeech: 'v./n.',
    meaning: '攻击；进攻',
    level: 'medium',
    example: 'The player decided to attack the monster.',
    exampleTranslation: '玩家决定攻击怪物。'
  },
  {
    word: 'pay',
    pronunciation: '[pei]',
    partOfSpeech: 'v.',
    meaning: '支付；偿还',
    level: 'medium',
    example: 'How much should I pay for this?',
    exampleTranslation: '这个我该付多少钱？'
  },
  // 拓展单词
  {
    word: 'function',
    pronunciation: '[fank-shan]',
    partOfSpeech: 'n.',
    meaning: '函数；功能；作用',
    level: 'medium',
    example: 'This function calculates the sum.',
    exampleTranslation: '这个函数计算总和。'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '认识函数 - 编程的小帮手',
    emoji: '🎯',
    gradeLevel: '1-2',
    summary: '函数是事先写好的、具有一定功能的代码段',

    easy: {
      story: '想象你有一个魔法盒子，往里面放东西，它就会按照固定的规则变出新东西！在Python中，函数就是这样神奇的魔法盒子。',
      concept: '函数是一段写好的代码，用def开头，有一个名字，可以完成特定的任务。就像一个工具，需要的时候就可以拿出来用。',
      syntax: `def 函数名(参数):
    # 函数体代码
    return 返回值`,
      example: {
        title: '判断平闰年',
        code: `# 定义一个判断平闰年的函数
def year(y):
    if y % 400 == 0:
        r = "闰年"
    elif y % 4 == 0 and y % 100 != 0:
        r = "闰年"
    else:
        r = "平年"
    return r

# 调用函数
result = year(2024)
print(result)`,
        output: '闰年',
        explanation: '我们定义了一个year函数，输入年份，就会返回"平年"或"闰年"。2024能被4整除且不能被100整除，所以是闰年。'
      },
      practice: [
        { question: '函数用什么关键字开头定义？', answer: '用def开头' },
        { question: '函数必须先定义还是先调用？', answer: '必须先定义，后调用' }
      ]
    },

    medium: {
      story: '在编程世界中，函数就像是一个个专业工具。你有计算器、转换器、判断器等各种工具，需要用哪个就拿哪个！',
      concept: '函数是一段可重复使用的代码块，它把复杂的操作封装起来，让代码更简洁、更易维护。Python中有很多自带函数如int()、max()、sum()。',
      syntax: `# 自定义函数格式
def 函数名(参数1, 参数2, ...):
    # 函数体代码
    return 返回值

# 调用函数
结果 = 函数名(参数值1, 参数值2, ...)`,
      example: {
        title: '甜品价格计算器',
        code: `# 定义计算价格的函数
def total(tp, yp):
    price = tp * 10 + yp * 6
    if price >= 50:
        price = price * 0.8
    elif price >= 30:
        price = price * 0.9
    return price

# 调用函数
print("3个甜品+2个饮品:", total(3, 2))
print("0个甜品+5个饮品:", total(0, 5))`,
        output: '3个甜品+2个饮品: 38.4\n0个甜品+5个饮品: 27.0',
        explanation: 'total函数有两个参数：tp(甜品数)和yp(饮品数)。价格超过50打8折，超过30打9折。第一个订单42元打9折是37.8元，第二个30元打9折是27元。'
      },
      practice: [
        { question: '函数名和变量名有什么相同的地方？', answer: '都要先定义后使用' },
        { question: 'return语句有什么作用？', answer: '返回函数的计算结果' }
      ]
    },

    hard: {
      story: '高级编程模式！函数是模块化编程的核心，它让代码具有清晰的层次结构，便于调试、维护和扩展。',
      concept: '函数是程序的基本组成单元，它实现了"分而治之"的编程思想。通过函数，我们可以将复杂问题分解为若干小问题，每个函数解决一个小问题。',
      syntax: `# 函数设计原则
# 1. 单一职责：一个函数只做一件事
# 2. 参数清晰：参数名要有意义
# 3. 返回明确：return要返回清晰的结果

def 函数名(有意义的参数名):
    """函数文档字符串"""
    # 函数体
    return 结果`,
      example: {
        title: '闰年判断器（优化版）',
        code: `def is_leap_year(year):
    """判断给定年份是否为闰年

    Args:
        year: 要判断的年份

    Returns:
        bool: True表示闰年，False表示平年
    """
    if year % 400 == 0:
        return True
    if year % 100 == 0:
        return False
    if year % 4 == 0:
        return True
    return False

# 测试
test_years = [2000, 1900, 2024, 2023]
for y in test_years:
    result = "闰年" if is_leap_year(y) else "平年"
    print(f"{y}年是{result}")`,
        output: '2000年是闰年\n1900年是平年\n2024年是闰年\n2023年是平年',
        explanation: '这是更专业的写法：用布尔值返回、添加文档字符串、使用有意义的函数名。2000能被400整除是闰年，1900能被100整除不能被400整除是平年。'
      },
      practice: [
        { question: '为什么建议函数只做一件事？', answer: '这样代码更清晰，更容易维护和测试' },
        { question: '函数文档字符串有什么用？', answer: '说明函数的功能、参数和返回值，方便自己和他人理解代码' }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '调用函数 - 先定义后调用',
    emoji: '📞',
    gradeLevel: '1-2',
    summary: '调用函数时要使用正确的函数名和参数',

    easy: {
      story: '想象你有一个遥控器，按钮的名字就是函数名，按下按钮就会执行对应的操作！但遥控器必须先设置好（定义），才能使用（调用）。',
      concept: '调用函数就是使用已经定义好的函数。调用时要写对函数名，并在括号里填入参数。注意：定义函数的代码要写在调用之前。',
      syntax: `# 定义函数
def 函数名(参数):
    函数体
    return 返回值

# 调用函数（写在定义后面）
变量 = 函数名(参数值)`,
      example: {
        title: '加倍器',
        code: `# 定义一个把数字加倍的函数
def get(x):
    y = x * 2
    return y

# 调用函数
a = get(20)
print(a)`,
        output: '40',
        explanation: '定义get函数时，参数是x。调用get(20)时，x会被赋值为20，y变成40，返回40给变量a。'
      },
      practice: [
        { question: '调用函数时要写什么？', answer: '要写函数名和参数' },
        { question: '调用函数可以写在定义函数前面吗？', answer: '不可以，必须先定义后调用' }
      ]
    },

    medium: {
      story: '在游戏中，你需要先制作工具（定义），然后才能使用工具（调用）。如果工具还没做好就想用，肯定会出错！',
      concept: '函数调用要遵循"先定义后使用"的原则。调用时的参数数量和顺序要和定义时一致，就像把正确的物品放进对应的槽位。',
      syntax: `# 正确的顺序
def 函数名(参数1, 参数2):
    # 1. 先定义
    return 结果

# 2. 后调用
result = 函数名(值1, 值2)
print(result)`,
      example: {
        title: '年龄判断器',
        code: `# 定义判断年龄的函数
def age(x):
    if x < 0:
        print("输入数据无效！")
    elif x < 18:
        print("少年")
    else:
        print("成年")

# 调用函数
n = age(22)
print("函数执行完毕")`,
        output: '成年\n函数执行完毕',
        explanation: '调用age(22)时，参数x被赋值为22。22不小于0，也不小于18，所以打印"成年"。'
      },
      practice: [
        { question: '调用函数时参数顺序可以调换吗？', answer: '不可以，必须和定义时的顺序一致' },
        { question: '如果函数没有参数，括号还要写吗？', answer: '要写，函数名后面必须加括号' }
      ]
    },

    hard: {
      story: '专业开发中的函数调用模式！参数传递有位置参数和关键字参数两种方式，让函数调用更加灵活和安全。',
      concept: '函数调用本质上是将实参（实际值）传递给形参（形式参数）的过程。Python支持位置传参和关键字传参，理解参数传递机制是掌握函数的关键。',
      syntax: `# 位置传参（按顺序）
result = func(值1, 值2)

# 关键字传参（指定参数名）
result = func(参数1=值1, 参数2=值2)

# 混合使用（关键字参数必须在后面）
result = func(值1, 参数2=值2)`,
      example: {
        title: '灵活的参数传递',
        code: `def calculate(price, discount, tax):
    """计算最终价格

    price: 原价
    discount: 折扣（如0.8表示8折）
    tax: 税费
    """
    after_discount = price * discount
    final = after_discount + tax
    return final

# 位置传参
print(calculate(100, 0.8, 5))

# 关键字传参（更清晰）
print(calculate(price=100, discount=0.8, tax=5))

# 混合使用
print(calculate(100, tax=5, discount=0.8))`,
        output: '85.0\n85.0\n85.0',
        explanation: '三种传参方式结果相同。关键字传参让代码更易读，不必记住参数顺序。100元打8折是80元，加5元税是85元。'
      },
      practice: [
        { question: '关键字传参有什么优势？', answer: '代码更清晰，不必记住参数顺序，减少错误' },
        { question: '混合使用位置参数和关键字参数时要注意什么？', answer: '关键字参数必须放在位置参数后面' }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '多参函数 - 处理多个输入',
    emoji: '🔢',
    gradeLevel: '1-2',
    summary: '函数可以有多个参数，用逗号分隔',

    easy: {
      story: '想象一个搅拌机，你可以同时放入多种材料！函数也可以接受多个输入，比如计算总价格时需要商品数量和单价。',
      concept: '函数的参数可以有多个，不同参数之间用逗号隔开。调用时，参数的数量和顺序要和定义时一致。',
      syntax: `def 函数名(参数1, 参数2):
    函数体
    return 返回值

# 调用时填入对应数量的值
result = 函数名(值1, 值2)`,
      example: {
        title: '价格计算器',
        code: `# 定义有两个参数的函数
def total(tp, yp):
    price = tp * 10 + yp * 6
    return price

# 调用函数
print("3甜品+2饮品:", total(3, 2))
print("0甜品+5饮品:", total(0, 5))`,
        output: '3甜品+2饮品: 42\n0甜品+5饮品: 30',
        explanation: 'total函数有两个参数：tp(甜品数)和yp(饮品数)。甜品10元，饮品6元。调用total(3,2)时，tp=3，yp=2，价格是3×10+2×6=42元。'
      },
      practice: [
        { question: '多个参数之间用什么符号分隔？', answer: '用逗号分隔' },
        { question: '调用多参函数时参数数量可以不一样吗？', answer: '不可以，数量必须一致' }
      ]
    },

    medium: {
      story: '在游戏中，角色的属性有生命值、攻击力、防御力等多个参数。函数就像这样，可以同时处理多个相关的数据！',
      concept: '多参函数让函数更加灵活和实用。设计多参函数时，要注意参数的顺序，通常把重要的、必填的参数放在前面。',
      syntax: `# 设计多参函数的要点
# 1. 参数名要有意义
# 2. 合理安排参数顺序
# 3. 考虑参数的默认值

def func(重要参数, 次要参数, 可选参数=默认值):
    return 结果`,
      example: {
        title: '方向判断器',
        code: `def move(r, c):
    """根据行列位置判断移动方向"""
    if r < 4:
        return "down"
    if r > 4:
        return "up"
    if c < 2:
        return "right"
    if c > 2:
        return "left"
    return "stay"

# 测试
print("位置(3,5):", move(3, 5))  # r=3 < 4
print("位置(5,1):", move(5, 1))  # r=5 > 4`,
        output: '位置(3,5): down\n位置(5,1): up',
        explanation: 'move函数有两个参数：r(行)和c(列)。move(3,5)时r=3<4，返回"down"；move(5,1)时r=5>4，返回"up"。'
      },
      practice: [
        { question: '如何让多参函数的调用更清晰？', answer: '使用有意义的参数名，必要时使用关键字传参' },
        { question: 'return语句执行后还会继续运行函数吗？', answer: '不会，return会结束函数运行' }
      ]
    },

    hard: {
      story: '高级函数设计！多参函数结合默认参数、可变参数等特性，可以创建非常强大和灵活的函数接口。',
      concept: '多参函数的设计需要考虑参数的可读性和易用性。合理的参数设计可以让函数既强大又易于使用。Python还支持*args和**kwargs等高级参数特性。',
      syntax: `# 带默认值的参数
def func(必填参数, 可选参数=默认值):
    return 结果

# 可变参数（接受任意数量参数）
def func(固定参数, *args, **kwargs):
    # args: 位置参数元组
    # kwargs: 关键字参数字典
    pass`,
      example: {
        title: '高级价格计算器',
        code: `def calculate_total(base_price, quantity=1, discount=1.0, tax=0):
    """计算总价

    Args:
        base_price: 单价
        quantity: 数量（默认1）
        discount: 折扣（默认1.0，不打折）
        tax: 税费（默认0）
    """
    subtotal = base_price * quantity * discount
    total = subtotal + tax
    return total

# 不同调用方式
print(calculate_total(100))  # 只买1个
print(calculate_total(100, 3))  # 买3个
print(calculate_total(100, 3, discount=0.8, tax=10))  # 打折加税`,
        output: '100\n300\n250',
        explanation: '这个函数展示了默认参数的威力。第一次只传单价，数量默认1；第二次传数量；第三次用关键字指定折扣和税费。100×3×0.8=240元，加10元税是250元。'
      },
      practice: [
        { question: '默认参数有什么好处？', answer: '让函数更灵活，常用情况下调用更简单' },
        { question: '有默认值的参数应该放在前面还是后面？', answer: '必须放在没有默认值的参数后面' }
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
    mathConcept: '数值代入',
    question: '运行到最后一行代码时，参数x会被赋值为多少？\n\n```python\ndef age(x):\n    if x < 18:\n        print("少年")\n    else:\n        print("成年")\nn = age(22)\n```',
    options: [
      'x',
      '22',
      'age',
      '"成年"'
    ],
    answer: 1, // B
    explanation: '调用age(22)时，括号中的22会传递给参数x，所以x被赋值为22。\n\n数学知识：这就像代数中的代入，把22代入到x的位置。',
    hint: '看函数调用时括号里的数字'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '',
    type: 'multiple-choice',
    mathConcept: '乘法计算',
    question: '执行下面的代码，会输出什么？\n\n```python\ndef total(tp, yp):\n    return tp * 10 + yp * 6\nprint(total(2, 3))\n```',
    options: [
      '26',
      '38',
      '60'
    ],
    answer: 1, // B
    explanation: 'tp=2，yp=3，所以结果是 2×10 + 3×6 = 20 + 18 = 38。\n\n数学知识：乘法分配律：2×10+3×6 = 20+18 = 38。',
    hint: '注意参数的顺序：第一个是甜品数，第二个是饮品数'
  },

  // 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '',
    type: 'multiple-choice',
    mathConcept: '条件判断',
    question: '执行下方代码，输出结果是？\n\n```python\ndef get(x):\n    y = x * 2\n    return y\n\na = get(20)\nprint(a)\n```',
    options: [
      '20',
      '40',
      'y'
    ],
    answer: 1, // B
    explanation: 'get(20)被调用时，x=20，y=20×2=40，return 40返回给变量a，所以打印40。\n\n数学知识：这是一个简单的倍数关系，输出是输入的2倍。',
    hint: 'return后面的值会返回给调用者'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '',
    type: 'multiple-choice',
    mathConcept: '逻辑推理',
    question: '执行下方代码，会输出什么？\n\n```python\ndef move(r, c):\n    if r < 4:\n        return "down"\n    if r > 4:\n        return "up"\n    if c < 2:\n        return "right"\n    return "left"\n\nprint(move(5, 1))\n```',
    options: [
      '"down"',
      '"up"',
      '"right"'
    ],
    answer: 1, // B
    explanation: 'move(5, 1)时，r=5。第一个判断r<4不成立，第二个判断r>4成立，返回"up"。\n\n数学知识：这是数的大小比较，5大于4，满足条件。',
    hint: 'return会结束函数，后面的代码不会执行'
  },

  // 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '',
    type: 'multiple-choice',
    mathConcept: '综合计算',
    question: '下面代码的输出结果是？\n\n```python\ndef calculate(price, discount=1.0):\n    return price * discount\n\nprint(calculate(100, 0.8))\nprint(calculate(50))\n```',
    options: [
      '80\n50',
      '100\n50',
      '80\n0'
    ],
    answer: 0, // A
    explanation: '第一次调用calculate(100, 0.8)，100×0.8=80。第二次调用calculate(50)，只传一个参数，discount使用默认值1.0，50×1.0=50。\n\n数学知识：默认参数让函数调用更灵活。',
    hint: '第二个参数有默认值，不传时使用默认值'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '',
    type: 'multiple-choice',
    mathConcept: '函数嵌套',
    question: '执行下方代码，最终输出什么？\n\n```python\ndef add(a, b):\n    return a + b\n\ndef multiply(x, y):\n    return x * y\n\nresult = multiply(add(2, 3), 4)\nprint(result)\n```',
    options: [
      '20',
      '14',
      '9'
    ],
    answer: 0, // A
    explanation: 'add(2, 3)先执行，返回2+3=5。然后multiply(5, 4)执行，返回5×4=20。\n\n数学知识：这是嵌套计算，先算括号里的加法，再算乘法。(2+3)×4=20。',
    hint: '函数可以作为另一个函数的参数'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L11-1',
  title: '明星养成记',
  subtitle: '学会认识函数、调用函数和多参函数',
  difficulty: '入门',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '理解函数的概念和作用',
    '掌握函数的定义和调用',
    '学会使用多参函数',
    '理解"先定义后调用"的原则'
  ],
  prerequisites: [
    'Python基础语法',
    '变量和数据类型',
    'if条件判断',
    '基本运算符'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['def', 'return', 'func', 'call'],
  medium: ['define', 'python', 'syntax', 'value'],
  hard: ['parameter', 'function', 'argument', 'variable']
}

// 打字练习代码模板（按难度分组）
export const typingTemplates = {
  easy: [
    // 函数定义基础
    'def func():',
    'def test():',
    'def hello():',

    // 函数调用基础
    'func()',
    'test()',
    'call(x)',

    // return基础
    'return x',
    'return 0',
    'return result',

    // 单参数函数
    'def func(x):',
    'def get(n):',
    'def calc(a):'
  ],
  medium: [
    // 函数定义进阶
    'def func(x, y):',
    'def total(a, b):',
    'def calculate(x, y):',

    // 函数调用进阶
    'func(1, 2)',
    'total(x, y)',
    'calculate(a, b)',

    // 多行函数定义
    'def func(x):\n    return x',
    'def get(n):\n    return n * 2',

    // 带默认值的函数
    'def func(x=1):',
    'def calc(a, b=0):'
  ],
  hard: [
    // 复杂函数定义
    'def func(x, y, z=0):',
    'def calculate(a, b, c=1):',
    'def process(data, key=None):',

    // 带文档字符串的函数
    'def func(x):\n    """计算"""\n    return x',
    'def test(n):\n    """测试函数"""\n    return n',

    // 多行函数体
    'def func(x):\n    if x > 0:\n        return x',
    'def calc(a, b):\n    result = a + b\n    return result',

    // 判断函数
    'def is_valid(n):\n    return n > 0',
    'def is_even(x):\n    return x % 2 == 0'
  ]
}

// 导出所有数据
export const L11_1_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L11_1_data
