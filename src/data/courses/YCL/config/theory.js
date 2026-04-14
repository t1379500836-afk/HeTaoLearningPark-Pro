/**
 * YCL 理论讲解配置
 *
 * 为每个知识点提供基础理论讲解，用于做题后的知识点诊断
 * 讲解风格：儿童友好、简洁易懂、配合示例
 */

export const yclTheory = {
  // ==================== 四级理论讲解 ====================
  level4: {
    // 输出命令
    'theory-4-1': {
      id: 'theory-4-1',
      knowledgePointId: 'kp-4-1',
      title: '输出命令 print()',
      emoji: '📢',
      summary: `print() 函数用于在屏幕上显示内容`,
      content: `
## 什么是输出？

输出就是把程序的结果"说"出来，显示在屏幕上让我们看到。在 Python 中，我们用 **print()** 函数来实现输出。

## 基本用法

\`\`\`python
print("你好，世界！")
print(123)
print(3 + 5)
\`\`\`

## 输出多个内容

\`\`\`python
print("我今年", 10, "岁")
# 输出：我今年 10 岁
\`\`\`

## 小技巧

- 字符串需要用引号（单引号或双引号）包起来
- 数字不需要引号
- print() 会自动在末尾换行
`,
      practice: [
        { q: '如何输出"Hello"？', a: 'print("Hello")' },
        { q: 'print(3 + 5) 会输出什么？', a: '8' }
      ]
    },

    // 输入命令
    'theory-4-2': {
      id: 'theory-4-2',
      knowledgePointId: 'kp-4-2',
      title: '输入命令 input()',
      emoji: '👂',
      summary: `input() 函数用于获取用户输入的内容`,
      content: `
## 什么是输入？

输入就是让程序"听"我们说话，获取我们输入的内容。在 Python 中，我们用 **input()** 函数来实现输入。

## 基本用法

\`\`\`python
name = input("请输入你的名字：")
print("你好，" + name)
\`\`\`

## 重要提示

- input() 获取的内容**永远是字符串类型**！
- 如果需要数字，必须用 int() 转换

\`\`\`python
age = input("请输入年龄：")
age = int(age)  # 转换成整数
\`\`\`

## 小技巧

- input() 括号里可以放提示文字
- 用户输入后按回车键确认
`,
      practice: [
        { q: 'input() 返回的是什么类型？', a: '字符串（str）' },
        { q: '如何获取用户输入的数字？', a: 'int(input("请输入数字："))' }
      ]
    },

    // 转整命令
    'theory-4-3': {
      id: 'theory-4-3',
      knowledgePointId: 'kp-4-3',
      title: '转整命令 int()',
      emoji: '🔢',
      summary: `int() 函数用于将字符串或小数转换为整数`,
      content: `
## 什么是类型转换？

有时候我们需要把一种数据类型变成另一种类型。**int()** 可以把其他类型转换成整数。

## 常见用法

\`\`\`python
# 字符串转整数
a = int("123")    # 结果：123

# 小数转整数（直接去掉小数部分）
b = int(3.7)      # 结果：3
c = int(3.2)      # 结果：3

# 配合 input 使用
age = int(input("请输入年龄："))
\`\`\`

## 注意事项

- int("3.14") 会报错！需要先转 float 再转 int
- int("abc") 会报错！字符串必须是数字

## 小技巧

- int() 转换小数时是"截断"，不是四舍五入
- 记住：3.9 变成 int 是 3，不是 4
`,
      practice: [
        { q: 'int("5") 的结果是什么？', a: '5（整数）' },
        { q: 'int(4.9) 的结果是什么？', a: '4' }
      ]
    },

    // 简单数学运算
    'theory-4-4': {
      id: 'theory-4-4',
      knowledgePointId: 'kp-4-4',
      title: '简单数学运算',
      emoji: '➕',
      summary: `Python 支持加、减、乘、除、整除、取余、幂运算`,
      content: `
## Python 的运算符

| 运算符 | 名称 | 示例 | 结果 |
|--------|------|------|------|
| + | 加法 | 3 + 2 | 5 |
| - | 减法 | 5 - 2 | 3 |
| * | 乘法 | 3 * 2 | 6 |
| / | 除法 | 7 / 2 | 3.5 |
| // | 整除 | 7 // 2 | 3 |
| % | 取余 | 7 % 2 | 1 |
| ** | 幂运算 | 2 ** 3 | 8 |

## 特别说明

- 整除 //：除完只保留整数部分
- 取余 %：得到除法的余数
- 幂运算 **：计算乘方，如 2**3 = 2×2×2 = 8

## 示例代码

\`\`\`python
print(10 // 3)   # 输出：3
print(10 % 3)    # 输出：1
print(2 ** 4)    # 输出：16
\`\`\`
`,
      practice: [
        { q: '17 // 5 的结果是什么？', a: '3' },
        { q: '17 % 5 的结果是什么？', a: '2' }
      ]
    },

    // 字符串拼接
    'theory-4-5': {
      id: 'theory-4-5',
      knowledgePointId: 'kp-4-5',
      title: '字符串拼接',
      emoji: '🔗',
      summary: `使用 + 号可以将多个字符串连接成一个`,
      content: `
## 什么是字符串拼接？

字符串拼接就是把多个字符串"粘"在一起，变成一个更长的字符串。我们用 **+** 号来拼接。

## 基本用法

\`\`\`python
first = "Hello"
last = "World"
full = first + " " + last
print(full)  # 输出：Hello World
\`\`\`

## 重要提示

- 只有字符串才能和字符串拼接
- 数字需要先转换成字符串

\`\`\`python
age = 10
# 错误：print("我今年" + age + "岁")
# 正确：print("我今年" + str(age) + "岁")
\`\`\`

## 小技巧

- str() 可以把数字转换成字符串
- 可以用逗号代替 +，print 会自动添加空格
`,
      practice: [
        { q: '"a" + "b" 的结果是什么？', a: '"ab"' },
        { q: '如何把数字 5 和 "个苹果" 拼接？', a: 'str(5) + "个苹果"' }
      ]
    },

    // if-else
    'theory-4-6': {
      id: 'theory-4-6',
      knowledgePointId: 'kp-4-6',
      title: 'if-else 条件判断',
      emoji: '🔀',
      summary: `if-else 用于根据条件选择执行不同的代码`,
      content: `
## 什么是条件判断？

条件判断就像"如果...就...，否则..."。程序会根据条件是否成立，选择执行不同的代码。

## 基本语法

\`\`\`python
if 条件:
    # 条件成立时执行
else:
    # 条件不成立时执行
\`\`\`

## 示例代码

\`\`\`python
age = 12

if age >= 18:
    print("你是成年人")
else:
    print("你是未成年人")
\`\`\`

## 比较运算符

| 运算符 | 含义 | 示例 |
|--------|------|------|
| == | 等于 | x == 5 |
| != | 不等于 | x != 5 |
| > | 大于 | x > 5 |
| < | 小于 | x < 5 |
| >= | 大于等于 | x >= 5 |
| <= | 小于等于 | x <= 5 |

## 注意事项

- if 和 else 后面要有**冒号**
- 缩进很重要！通常是 4 个空格
`,
      practice: [
        { q: '判断 x 是否等于 10，条件怎么写？', a: 'x == 10' },
        { q: 'if 后面忘记写冒号会怎样？', a: '会报语法错误' }
      ]
    },

    // for循环基础
    'theory-4-7': {
      id: 'theory-4-7',
      knowledgePointId: 'kp-4-7',
      title: 'for 循环基础',
      emoji: '🔄',
      summary: `for 循环用于重复执行一段代码指定次数`,
      content: `
## 什么是循环？

循环就是让程序重复做同一件事。for 循环适合用在"知道要重复多少次"的情况。

## range() 函数

\`\`\`python
range(5)      # 生成 0, 1, 2, 3, 4
range(1, 5)   # 生成 1, 2, 3, 4
range(1, 10, 2)  # 生成 1, 3, 5, 7, 9（步长为2）
\`\`\`

## 基本语法

\`\`\`python
for 变量 in range(次数):
    # 重复执行的代码
\`\`\`

## 示例代码

\`\`\`python
# 打印 1 到 5
for i in range(1, 6):
    print(i)

# 打印 5 次"你好"
for i in range(5):
    print("你好")
\`\`\`

## 注意事项

- for 后面要有**冒号**
- 循环体内的代码要**缩进**
- range(n) 生成的数字从 0 开始，到 n-1 结束
`,
      practice: [
        { q: 'range(3) 生成哪些数字？', a: '0, 1, 2' },
        { q: '如何让循环执行 10 次？', a: 'for i in range(10):' }
      ]
    },

    // 变量的修改
    'theory-4-8': {
      id: 'theory-4-8',
      knowledgePointId: 'kp-4-8',
      title: '变量的修改',
      emoji: '📝',
      summary: `变量可以在程序运行过程中被重新赋值`,
      content: `
## 什么是变量修改？

变量的值不是固定的，可以在程序运行过程中改变。

## 基本用法

\`\`\`python
score = 0           # 初始值
score = 10          # 重新赋值
score = score + 5   # 在原值基础上增加
print(score)        # 输出：15
\`\`\`

## 常见修改方式

| 操作 | 简写形式 | 等价于 |
|------|---------|--------|
| 加法 | score += 5 | score = score + 5 |
| 减法 | score -= 3 | score = score - 3 |
| 乘法 | score *= 2 | score = score * 2 |
| 除法 | score /= 2 | score = score / 2 |

## 示例代码

\`\`\`python
# 计数器
count = 0
for i in range(5):
    count = count + 1
print(count)  # 输出：5

# 累加求和
total = 0
for i in range(1, 6):
    total = total + i
print(total)  # 输出：15
\`\`\`

## 小技巧

- 变量修改后，原来的值会被覆盖
- 使用 += 这样的简写更方便
`,
      practice: [
        { q: 'x = 5 后执行 x += 3，x 的值是？', a: '8' },
        { q: '如何让变量 n 的值变成原来的 2 倍？', a: 'n = n * 2 或 n *= 2' }
      ]
    },

    // 字符串基础
    'theory-4-9': {
      id: 'theory-4-9',
      knowledgePointId: 'kp-4-9',
      title: '字符串基础',
      emoji: '📖',
      summary: '字符串是用引号包裹的文本内容',
      content: `
## 什么是字符串？

字符串就是一串字符（文本），用引号包裹起来。

## 创建字符串

\`\`\`python
name = "小明"        # 双引号
msg = '你好'         # 单引号
\`\`\`

## 引号规则

- **单引号** 和 **双引号** 都可以创建字符串
- 引号必须成对出现（前后的引号要一样）
- 字符串里面可以包含另一种引号

\`\`\`python
print('我说："你好"')   # 字符串里有双引号
print("It's ok")        # 字符串里有单引号
\`\`\`

## 注意事项

- 引号必须成对使用，不能一单一双
- 数字加引号就变成字符串了，如 "123"
`,
      practice: [
        { q: '创建字符串可以用什么引号？', a: '单引号或双引号' },
        { q: '"123" 和 123 有什么区别？', a: '"123"是字符串，123是整数' }
      ]
    },

    // if语句
    'theory-4-10': {
      id: 'theory-4-10',
      knowledgePointId: 'kp-4-10',
      title: 'if 语句',
      emoji: '❓',
      summary: `if 语句用于判断条件是否成立`,
      content: `
## 什么是 if 语句？

if 语句用于判断某个条件是否成立，成立才执行对应的代码。

## 基本语法

\`\`\`python
if 条件:
    # 条件成立时执行
\`\`\`

## 示例代码

\`\`\`python
age = 18

if age >= 18:
    print("你是成年人")

score = 85
if score >= 60:
    print("及格了！")
\`\`\`

## 比较运算符

| 运算符 | 含义 | 示例 |
|--------|------|------|
| == | 等于 | x == 5 |
| != | 不等于 | x != 5 |
| > | 大于 | x > 5 |
| < | 小于 | x < 5 |
| >= | 大于等于 | x >= 5 |
| <= | 小于等于 | x <= 5 |

## 注意事项

- if 后面要有**冒号**（:）
- 条件后面的代码要**缩进**
- 条件的结果是布尔值（True/False）
`,
      practice: [
        { q: 'if x > 5: 中，x=6 时条件成立吗？', a: '成立（True）' },
        { q: '判断 x 是否等于 10 怎么写？', a: 'if x == 10:' }
      ]
    },

    // 比较数大小
    'theory-4-11': {
      id: 'theory-4-11',
      knowledgePointId: 'kp-4-11',
      title: '比较数大小',
      emoji: '⚖️',
      summary: `使用比较运算符比较两个数的大小`,
      content: `
## 什么是比较？

比较就是判断两个数的大小关系，结果是 True（成立）或 False（不成立）。

## 比较运算符

\`\`\`python
3 > 2    # True，3大于2
3 < 2    # False，3不小于2
3 == 3   # True，3等于3
3 != 4   # True，3不等于4
3 >= 3   # True，3大于等于3
3 <= 4   # True，3小于等于4
\`\`\`

## 比较运算符表格

| 运算符 | 名称 | 示例 | 结果 |
|--------|------|------|------|
| > | 大于 | 5 > 3 | True |
| < | 小于 | 3 < 5 | True |
| >= | 大于等于 | 5 >= 5 | True |
| <= | 小于等于 | 3 <= 5 | True |
| == | 等于 | 5 == 5 | True |
| != | 不等于 | 5 != 3 | True |

## 使用场景

\`\`\`python
score = 85

# 判断是否及格
if score >= 60:
    print("及格")

# 判断是否满分
if score == 100:
    print("满分！")
\`\`\`

## 注意事项

- 不要混淆 =（赋值）和 ==（比较）
- 比较的结果是布尔值
`,
      practice: [
        { q: '5 >= 5 的结果是？', a: 'True' },
        { q: '== 和 = 有什么区别？', a: '== 是比较是否相等，= 是赋值' }
      ]
    },

    // 分支应用
    'theory-4-12': {
      id: 'theory-4-12',
      knowledgePointId: 'kp-4-12',
      title: '分支应用',
      emoji: '🌿',
      summary: `使用 if-elif-else 处理多种情况`,
      content: `
## 什么是分支应用？

当有多个条件需要判断时，可以使用 if-elif-else 结构。

## 基本语法

\`\`\`python
if 条件1:
    # 条件1成立
elif 条件2:
    # 条件2成立
elif 条件3:
    # 条件3成立
else:
    # 以上都不成立
\`\`\`

## 示例代码

\`\`\`python
score = 85

if score >= 90:
    print("优秀")
elif score >= 80:
    print("良好")
elif score >= 60:
    print("及格")
else:
    print("不及格")
# 输出：良好
\`\`\`

## 常见应用场景

| 场景 | 示例 |
|------|------|
| 成绩等级 | 优秀/良好/及格/不及格 |
| 年龄段 | 儿童/青少年/成年/老年 |
| 星期几 | 根据数字输出星期 |
| 菜单选择 | 根据输入执行不同操作 |

## 注意事项

- 条件是从上往下判断的
- 满足第一个条件后，后面的不再判断
- else 放在最后，处理所有其他情况
`,
      practice: [
        { q: 'if-elif-else 中，条件1成立还会判断条件2吗？', a: '不会' },
        { q: 'else 后面需要写条件吗？', a: '不需要，else 处理所有其他情况' }
      ]
    }
  },

  // ==================== 五级理论讲解 ====================
  level5: {
    // kp-5-1 索引
    'theory-5-1': {
      id: 'theory-5-1',
      knowledgePointId: 'kp-5-1',
      title: '索引',
      emoji: '📍',
      summary: `通过索引可以访问列表或字符串中的元素`,
      content: `
## 什么是索引？

索引就是"位置编号"，用来找到列表或字符串中的某个元素。

## 索引规则

- **从 0 开始**：第一个元素的索引是 0
- **正索引**：从左往右数，0, 1, 2, ...
- **负索引**：从右往左数，-1, -2, -3, ...

## 示例

\`\`\`python
fruits = ["苹果", "香蕉", "橙子", "葡萄"]

print(fruits[0])   # 输出：苹果（第1个）
print(fruits[2])   # 输出：橙子（第3个）
print(fruits[-1])  # 输出：葡萄（最后1个）

# 字符串也支持索引
s = "Hello"
print(s[0])  # 输出：H
print(s[-1]) # 输出：o
\`\`\`

## 索引越界

如果索引超出了范围，会报错！

\`\`\`python
fruits = ["苹果", "香蕉"]
print(fruits[5])  # 报错！列表只有2个元素
\`\`\`

## 索引赋值

列表可以通过索引修改元素的值：

\`\`\`python
fruits = ["苹果", "香蕉", "橙子"]
fruits[1] = "西瓜"
print(fruits)  # 输出：['苹果', '西瓜', '橙子']
\`\`\`

注意：字符串不支持索引赋值！
`,
      practice: [
        { q: '列表 [1,2,3] 中，元素 2 的索引是？', a: '1' },
        { q: '列表最后一个元素的负索引是？', a: '-1' }
      ]
    },

    // kp-5-2 统计命令
    'theory-5-2': {
      id: 'theory-5-2',
      knowledgePointId: 'kp-5-2',
      title: '统计命令',
      emoji: '📊',
      summary: '使用 max、min、len、sum 等函数统计数据',
      content: `
## 什么是统计命令？

统计命令用来对数据进行统计分析，如求最大值、最小值、长度、总和等操作。

## max() - 获取最大值

\`\`\`python
# 列表中的最大值
scores = [85, 92, 78, 95, 88]
print(max(scores))  # 输出：95

# 字符串中的最大字符（按ASCII码）
print(max("Hello"))  # 输出：y
\`\`\`

## min() - 获取最小值

\`\`\`python
# 列表中的最小值
scores = [85, 92, 78, 95, 88]
print(min(scores))  # 输出：78

# 字符串中的最小字符
print(min("Hello"))  # 输出：H
\`\`\`

## len() - 获取长度

\`\`\`python
# 列表长度
fruits = ["苹果", "香蕉", "橙子"]
print(len(fruits))  # 输出：3

# 字符串长度
name = "Hello"
print(len(name))  # 输出：5
\`\`\`

## sum() - 求和

\`\`\`python
# 对列表中的数字求和
scores = [85, 90, 78, 92]
print(sum(scores))  # 输出：345

# 配合 range 使用
print(sum(range(1, 6)))  # 输出：15（1+2+3+4+5）
\`\`\`

## 对比

| 函数 | 作用 | 示例 |
|------|------|------|
| max() | 获取最大值 | max([3,1,4]) → 4 |
| min() | 获取最小值 | min([3,1,4]) → 1 |
| len() | 获取长度/个数 | len([1,2,3]) → 3 |
| sum() | 求和 | sum([1,2,3]) → 6 |
`,
      practice: [
        { q: 'max([3, 7, 2, 9]) 的结果是？', a: '9' },
        { q: 'min([85, 92, 78]) 的结果是？', a: '78' },
        { q: 'len("Python") 的结果是？', a: '6' }
      ]
    },

    // kp-5-3 while循环
    'theory-5-3': {
      id: 'theory-5-3',
      knowledgePointId: 'kp-5-3',
      title: 'while 循环',
      emoji: '🔁',
      summary: `while 循环在条件为真时一直重复执行`,
      content: `
## 什么是 while 循环？

while 循环会一直重复执行，**直到条件变为假**。适合用在"不知道要重复多少次"的情况。

## 基本语法

\`\`\`python
while 条件:
    # 条件为真时重复执行
\`\`\`

## 示例代码

\`\`\`python
# 从1数到5
i = 1
while i <= 5:
    print(i)
    i = i + 1

# 累加到超过100
total = 0
n = 1
while total <= 100:
    total = total + n
    n = n + 1
print(total)  # 输出：105
\`\`\`

## 重要提示

- 一定要有让条件变假的代码，否则会**无限循环**！
- while 后面要有**冒号**
- 循环体要**缩进**

## while vs for

| for 循环 | while 循环 |
|----------|------------|
| 知道重复次数 | 不知道重复次数 |
| 遍历序列 | 根据条件判断 |
`,
      practice: [
        { q: 'while 循环什么时候停止？', a: '条件变为假时' },
        { q: '如何写一个无限循环？', a: 'while True:' }
      ]
    },

    // kp-5-4 字符串分割
    'theory-5-4': {
      id: 'theory-5-4',
      knowledgePointId: 'kp-5-4',
      title: '字符串分割 split()',
      emoji: '✂️',
      summary: '使用 split() 方法将字符串按指定分隔符切分',
      content: `
## 什么是字符串分割？

split() 可以把一个字符串按照指定的分隔符，切分成多个部分，返回一个**列表**。

## 基本用法

\`\`\`python
# 按空格分割
sentence = "我 爱 Python"
parts = sentence.split()
print(parts)  # 输出：['我', '爱', 'Python']

# 按逗号分割
info = "苹果,香蕉,橙子"
fruits = info.split(",")
print(fruits)  # 输出：['苹果', '香蕉', '橙子']
\`\`\`

## 指定分割次数

\`\`\`python
s = "a-b-c-d"
print(s.split("-"))       # 输出：['a', 'b', 'c', 'd']
print(s.split("-", 2))    # 输出：['a', 'b', 'c-d']（只分割2次）
\`\`\`

## 常见用法

\`\`\`python
# 处理用户输入
numbers = input("输入数字，用空格隔开：")
nums = numbers.split()      # 按空格分割
print(nums)                  # 输出：列表形式的字符串

# 转换为数字列表
nums = [int(x) for x in numbers.split()]
\`\`\`

## 注意事项

- 不写参数时，默认按**空白字符**（空格、换行）分割
- 分割结果是**列表**
- 原字符串不会被改变
`,
      practice: [
        { q: '"a-b-c".split("-") 的结果是？', a: "['a', 'b', 'c']" },
        { q: 'split() 不写参数时按什么分割？', a: '空白字符（空格、换行等）' }
      ]
    },

    // kp-5-5 列表修改
    'theory-5-5': {
      id: 'theory-5-5',
      knowledgePointId: 'kp-5-5',
      title: '列表修改',
      emoji: '📝',
      summary: '通过索引修改列表中的元素',
      content: `
## 什么是列表修改？

列表是**可变**的，可以通过索引来修改列表中的元素。

## 通过索引修改元素

使用 \`列表[索引] = 新值\` 的格式来修改元素：

\`\`\`python
# 修改单个元素
fruits = ["苹果", "香蕉", "橙子"]
fruits[1] = "西瓜"
print(fruits)  # 输出：['苹果', '西瓜', '橙子']

# 修改数字列表
nums = [1, 2, 3, 4]
nums[0] = 10
print(nums)  # 输出：[10, 2, 3, 4]
\`\`\`

## 负索引修改

\`\`\`python
nums = [1, 2, 3, 4, 5]
nums[-1] = 50  # 修改最后一个元素
print(nums)  # 输出：[1, 2, 3, 4, 50]
\`\`\`

## 注意事项

- 索引必须在有效范围内，否则会报错
- 字符串**不支持**索引赋值，只有列表可以

\`\`\`python
# 错误示例
s = "Hello"
s[0] = "h"  # 报错！字符串不能修改
\`\`\`

## 常见应用场景

| 场景 | 示例 |
|------|------|
| 修正数据 | scores[2] = 90 |
| 更新状态 | status[0] = "完成" |
| 替换元素 | fruits[1] = "新水果" |
`,
      practice: [
        { q: '如何把列表 [1,2,3] 的第一个元素改为 10？', a: 'lst[0] = 10' },
        { q: '如何修改列表最后一个元素？', a: 'lst[-1] = 新值' }
      ]
    },

    // kp-5-6 for循环嵌套
    'theory-5-6': {
      id: 'theory-5-6',
      knowledgePointId: 'kp-5-6',
      title: 'for 循环嵌套',
      emoji: '🔄',
      summary: 'for 循环内部再嵌套一个 for 循环',
      content: `
## 什么是循环嵌套？

循环嵌套就是在一个循环里面再放一个循环。外层循环每执行一次，内层循环会完整地执行一遍。

## 基本语法

\`\`\`python
for i in range(外层次数):
    for j in range(内层次数):
        # 内层循环体
\`\`\`

## 示例：九九乘法表

\`\`\`python
for i in range(1, 4):
    for j in range(1, i + 1):
        print(f"{j}x{i}={j*i}", end=" ")
    print()  # 换行
# 输出：
# 1x1=1
# 1x2=2 2x2=4
# 1x3=3 2x3=6 3x3=9
\`\`\`

## 示例：遍历二维列表

\`\`\`python
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
for row in grid:
    for num in row:
        print(num, end=" ")
    print()
# 输出：
# 1 2 3
# 4 5 6
# 7 8 9
\`\`\`

## 注意事项

- 内层循环完整执行一遍后，外层才进入下一次
- 注意**缩进**，内层循环体要比外层多缩进一级
`,
      practice: [
        { q: '外层循环3次，内层循环2次，内层循环体一共执行多少次？', a: '6次（3×2）' },
        { q: '嵌套循环的关键是什么？', a: '注意缩进层级' }
      ]
    },

    // kp-5-7 break、continue
    'theory-5-7': {
      id: 'theory-5-7',
      knowledgePointId: 'kp-5-7',
      title: 'break 和 continue',
      emoji: '⏹️',
      summary: `break 跳出循环，continue 跳过本次循环`,
      content: `
## break - 跳出循环

break 用来**立即结束整个循环**。

\`\`\`python
for i in range(10):
    if i == 5:
        break  # 当 i=5 时，跳出循环
    print(i)
# 输出：0 1 2 3 4
\`\`\`

## continue - 跳过本次

continue 用来**跳过本次循环**，继续下一次。

\`\`\`python
for i in range(5):
    if i == 2:
        continue  # 当 i=2 时，跳过本次
    print(i)
# 输出：0 1 3 4（没有2）
\`\`\`

## 对比

| break | continue |
|-------|----------|
| 结束整个循环 | 只跳过这一次 |
| 循环完全停止 | 继续下一次循环 |

## 实际应用

\`\`\`python
# 找到第一个能被7整除的数
for i in range(1, 100):
    if i % 7 == 0:
        print(i)  # 输出：7
        break     # 找到就停止

# 跳过所有偶数，只打印奇数
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)  # 输出：1 3 5 7 9
\`\`\`

## 注意事项

- 只能在循环（for/while）中使用
- 通常配合 if 语句使用
`,
      practice: [
        { q: 'break 会做什么？', a: '立即结束整个循环' },
        { q: 'continue 会做什么？', a: '跳过本次循环，继续下一次' }
      ]
    },

    // kp-5-8 数据类型转换命令
    'theory-5-8': {
      id: 'theory-5-8',
      knowledgePointId: 'kp-5-8',
      title: '数据类型转换命令',
      emoji: '🔀',
      summary: '使用 int()、str()、list() 等函数进行类型转换',
      content: `
## 什么是类型转换？

把一种数据类型变成另一种数据类型，比如把字符串变成数字，或把数字变成字符串。

## 常用转换函数

\`\`\`python
# int() - 转为整数
a = int("123")    # 字符串 → 整数 123
b = int(3.7)      # 小数 → 整数 3（截断，非四舍五入）

# str() - 转为字符串
s = str(123)       # 整数 → 字符串 "123"
s2 = str(3.14)     # 小数 → 字符串 "3.14"

# float() - 转为小数
f = float("3.14")  # 字符串 → 小数 3.14
f2 = float(5)      # 整数 → 小数 5.0

# list() - 转为列表
lst = list("abc")  # 字符串 → 列表 ['a', 'b', 'c']
lst2 = list(range(5))  # range → 列表 [0, 1, 2, 3, 4]
\`\`\`

## 常见用法

\`\`\`python
# 输入数字并计算
age = int(input("请输入年龄："))
print("明年你" + str(age + 1) + "岁")

# 字符串转列表
chars = list("Hello")
print(chars)  # 输出：['H', 'e', 'l', 'l', 'o']
\`\`\`

## 注意事项

- int("3.14") 会报错！需要先 float 再 int
- int("abc") 会报错！字符串必须是数字
`,
      practice: [
        { q: 'int("5") 的结果是什么类型？', a: '整数（int）' },
        { q: '如何把数字 123 转成字符串？', a: 'str(123)' }
      ]
    },

    // kp-5-9 枚举法
    'theory-5-9': {
      id: 'theory-5-9',
      knowledgePointId: 'kp-5-9',
      title: '枚举法',
      emoji: '🔎',
      summary: '通过列举所有可能的情况来解决问题',
      content: `
## 什么是枚举法？

枚举法就是把所有可能的情况**一个一个列出来**，找到符合条件的答案。

## 基本思路

1. 确定范围（从哪里到哪里）
2. 逐个检查每个情况
3. 找到满足条件的答案

## 示例：找满足条件的数

\`\`\`python
# 找出 1-100 中既能被3整除又能被5整除的数
for i in range(1, 101):
    if i % 3 == 0 and i % 5 == 0:
        print(i)
# 输出：15 30 45 60 75 90
\`\`\`

## 示例：鸡兔同笼

\`\`\`python
# 鸡和兔共35只，脚共94只，各多少？
for chicken in range(0, 36):
    rabbit = 35 - chicken
    if chicken * 2 + rabbit * 4 == 94:
        print(f"鸡{chicken}只，兔{rabbit}只")
# 输出：鸡23只，兔12只
\`\`\`

## 示例：拆分数字

\`\`\`python
# 找出所有两位数，各位数字之和等于10
for n in range(10, 100):
    tens = n // 10
    ones = n % 10
    if tens + ones == 10:
        print(n)
# 输出：19 28 37 46 55 64 73 82 91
\`\`\`

## 注意事项

- 枚举法的关键是确定正确的**范围**
- 范围太大时效率较低，但思路简单直接
`,
      practice: [
        { q: '枚举法的核心思路是什么？', a: '列出所有可能，逐个检查' },
        { q: '枚举法最重要的是确定什么？', a: '范围（从哪里到哪里）' }
      ]
    },

    // kp-5-10 遍历
    'theory-5-10': {
      id: 'theory-5-10',
      knowledgePointId: 'kp-5-10',
      title: '遍历',
      emoji: '🔍',
      summary: '逐个访问列表、字符串等序列中的每个元素',
      content: `
## 什么是遍历？

遍历就是**逐个访问**序列中的每一个元素。

## 遍历列表

\`\`\`python
fruits = ["苹果", "香蕉", "橙子"]

# 方式1：直接遍历
for fruit in fruits:
    print(fruit)

# 方式2：用索引遍历
for i in range(len(fruits)):
    print(fruits[i])

# 方式3：同时获取索引和值
for i, fruit in enumerate(fruits):
    print(f"第{i}个是{fruit}")
\`\`\`

## 遍历字符串

\`\`\`python
s = "Hello"
for ch in s:
    print(ch)
# 输出：H e l l o（每个字符一行）

# 统计字符出现次数
count = 0
for ch in "banana":
    if ch == "a":
        count += 1
print(count)  # 输出：3
\`\`\`

## 遍历字典

\`\`\`python
info = {"name": "小明", "age": 10}

# 遍历键
for key in info:
    print(key, info[key])

# 遍历键值对
for key, value in info.items():
    print(f"{key}: {value}")
\`\`\`

## 注意事项

- for...in 是最常用的遍历方式
- 需要索引时用 range(len()) 或 enumerate()
`,
      practice: [
        { q: '遍历列表用什么语句？', a: 'for 元素 in 列表:' },
        { q: '如何同时获取索引和值？', a: 'for i, val in enumerate(列表):' }
      ]
    },

    // kp-5-11 排序命令
    'theory-5-11': {
      id: 'theory-5-11',
      knowledgePointId: 'kp-5-11',
      title: '排序命令',
      emoji: '📐',
      summary: '使用 sorted() 对列表进行升序排序',
      content: `
## 什么是排序？

排序就是把数据按照从小到大（升序）或从大到小（降序）重新排列。

## sorted() - 返回新列表

sorted() **不修改原列表**，返回一个排好序的新列表。

\`\`\`python
nums = [3, 1, 4, 1, 5, 9, 2, 6]
new_nums = sorted(nums)

print(nums)      # 输出：[3, 1, 4, 1, 5, 9, 2, 6]（原列表不变）
print(new_nums)  # 输出：[1, 1, 2, 3, 4, 5, 6, 9]（新列表已排序）
\`\`\`

## 常见用法

\`\`\`python
# 对数字列表排序
scores = [85, 92, 78, 95, 88]
sorted_scores = sorted(scores)
print(sorted_scores)  # 输出：[78, 85, 88, 92, 95]

# 对字符串列表排序（按字母顺序）
words = ["banana", "apple", "cherry"]
sorted_words = sorted(words)
print(sorted_words)  # 输出：['apple', 'banana', 'cherry']
\`\`\`

## 更新原列表

如果想让原列表变成排序后的结果，可以重新赋值：

\`\`\`python
nums = [3, 1, 4, 1, 5]
nums = sorted(nums)  # 将排序结果赋值给原变量
print(nums)  # 输出：[1, 1, 3, 4, 5]
\`\`\`

## 注意事项

- sorted() 返回的是**新列表**，原列表不变
- 默认是**升序**（从小到大）
- 可以用于列表、字符串等可迭代对象
`,
      practice: [
        { q: 'sorted([3, 1, 4]) 的结果是？', a: '[1, 3, 4]' },
        { q: 'sorted() 会修改原列表吗？', a: '不会，它返回新列表' }
      ]
    },

    // kp-5-12 print()进阶用法
    'theory-5-12': {
      id: 'theory-5-12',
      knowledgePointId: 'kp-5-12',
      title: 'print() 进阶用法',
      emoji: '🖨️',
      summary: 'print 函数的 sep、end 参数控制输出格式',
      content: `
## print() 的参数

print() 不只是简单地输出内容，还可以控制输出的格式。

## end 参数 - 控制结尾

默认情况下，print() 输出后会**换行**。用 end 可以改变结尾字符。

\`\`\`python
# 默认行为（换行）
print("Hello")
print("World")
# 输出：
# Hello
# World

# 不换行，用空格结尾
print("Hello", end=" ")
print("World")
# 输出：Hello World

# 不换行，无间隔
print("Hello", end="")
print("World")
# 输出：HelloWorld
\`\`\`

## sep 参数 - 控制分隔符

当输出多个内容时，默认用**空格**分隔。用 sep 可以改变分隔符。

\`\`\`python
# 默认用空格分隔
print("A", "B", "C")
# 输出：A B C

# 用逗号分隔
print("A", "B", "C", sep=",")
# 输出：A,B,C

# 用换行分隔
print("A", "B", "C", sep="\\n")
# 输出：
# A
# B
# C
\`\`\`

## 组合使用

\`\`\`python
# 一行输出1到5，用逗号分隔
for i in range(1, 6):
    print(i, end=", ")
# 输出：1, 2, 3, 4, 5,
\`\`\`
`,
      practice: [
        { q: '如何让 print 输出后不换行？', a: 'print(内容, end="")' },
        { q: 'print("A","B",sep="-") 输出什么？', a: 'A-B' }
      ]
    },

    // kp-5-13 列表生成式
    'theory-5-13': {
      id: 'theory-5-13',
      knowledgePointId: 'kp-5-13',
      title: '列表生成式',
      emoji: '⚡',
      summary: '用一行代码快速生成列表',
      content: `
## 什么是列表生成式？

列表生成式（也叫列表推导式）是一种**简洁的写法**，用一行代码就能创建列表。

## 基本语法

\`\`\`python
[表达式 for 变量 in 可迭代对象]
\`\`\`

## 示例

\`\`\`python
# 生成 0-9 的平方列表
squares = [i ** 2 for i in range(10)]
print(squares)  # 输出：[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 将字符串列表转为大写
words = ["hello", "world"]
upper = [w.upper() for w in words]
print(upper)  # 输出：['HELLO', 'WORLD']
\`\`\`

## 带条件判断

\`\`\`python
# 只保留偶数
nums = [1, 2, 3, 4, 5, 6, 7, 8]
evens = [n for n in nums if n % 2 == 0]
print(evens)  # 输出：[2, 4, 6, 8]

# 1-20中能被3整除的数
threes = [i for i in range(1, 21) if i % 3 == 0]
print(threes)  # 输出：[3, 6, 9, 12, 15, 18]
\`\`\`

## 等价的普通写法

\`\`\`python
# 列表生成式
squares = [i ** 2 for i in range(5)]

# 等价的普通写法
squares = []
for i in range(5):
    squares.append(i ** 2)
# 两种写法结果一样：[0, 1, 4, 9, 16]
\`\`\`
`,
      practice: [
        { q: '如何用列表生成式生成 [2,4,6,8,10]？', a: '[i*2 for i in range(1,6)]' },
        { q: '列表生成式比普通循环有什么优点？', a: '更简洁，一行代码完成' }
      ]
    },

    // kp-5-14 集合
    'theory-5-14': {
      id: 'theory-5-14',
      knowledgePointId: 'kp-5-14',
      title: '集合',
      emoji: '📦',
      summary: '集合是无序且不重复的数据容器',
      content: `
## 什么是集合？

集合（set）是一个**无序**且**不重复**的数据容器，用花括号 {} 创建。

## 创建集合

\`\`\`python
# 直接创建
s = {1, 2, 3}
print(s)  # 输出：{1, 2, 3}

# 从列表创建（自动去重）
nums = [1, 2, 2, 3, 3, 3]
s = set(nums)
print(s)  # 输出：{1, 2, 3}
\`\`\`

## 常用操作

\`\`\`python
s = {1, 2, 3}

# 添加元素
s.add(4)
print(s)  # 输出：{1, 2, 3, 4}

# 删除元素
s.remove(1)
print(s)  # 输出：{2, 3, 4}

# 判断元素是否在集合中
print(2 in s)   # 输出：True
print(5 in s)   # 输出：False
\`\`\`

## 集合运算

\`\`\`python
a = {1, 2, 3}
b = {3, 4, 5}

print(a & b)  # 交集：{3}
print(a | b)  # 并集：{1, 2, 3, 4, 5}
print(a - b)  # 差集：{1, 2}
\`\`\`

## 集合 vs 列表

| 特点 | 集合 set | 列表 list |
|------|---------|----------|
| 有序 | 无序 | 有序 |
| 重复 | 不允许 | 允许 |
| 索引 | 不支持 | 支持 |
`,
      practice: [
        { q: '集合的特点是什么？', a: '无序、不重复' },
        { q: '如何去除列表中的重复元素？', a: '用 set(列表) 转为集合去重' }
      ]
    },

    // kp-5-15 字典
    'theory-5-15': {
      id: 'theory-5-15',
      knowledgePointId: 'kp-5-15',
      title: '字典',
      emoji: '📖',
      summary: '字典用键值对存储数据，通过键快速查找值',
      content: `
## 什么是字典？

字典（dict）用**键值对**存储数据，就像查字典一样——通过"键"找到对应的"值"。

## 创建字典

\`\`\`python
# 用花括号创建
student = {
    "name": "小明",
    "age": 10,
    "score": 95
}
\`\`\`

## 访问值

\`\`\`python
student = {"name": "小明", "age": 10}

# 用键访问值
print(student["name"])  # 输出：小明
print(student["age"])   # 输出：10

# 用 get() 访问（键不存在时不报错）
print(student.get("score", 0))  # 输出：0（默认值）
\`\`\`

## 修改和添加

\`\`\`python
student = {"name": "小明", "age": 10}

# 修改值
student["age"] = 11

# 添加新键值对
student["grade"] = "五年级"
print(student)
# 输出：{'name': '小明', 'age': 11, 'grade': '五年级'}
\`\`\`

## 常用操作

\`\`\`python
student = {"name": "小明", "age": 10}

# 获取所有键
print(student.keys())    # dict_keys(['name', 'age'])

# 获取所有值
print(student.values())  # dict_values(['小明', 10])

# 删除键值对
del student["age"]
\`\`\`

## 字典 vs 列表

| 特点 | 字典 dict | 列表 list |
|------|----------|----------|
| 访问方式 | 通过键 | 通过索引 |
| 有序 | 有序（Python 3.7+） | 有序 |
| 适用场景 | 有对应关系的数据 | 按顺序排列的数据 |
`,
      practice: [
        { q: '字典用什么存储数据？', a: '键值对（key: value）' },
        { q: '如何访问字典中的值？', a: '字典["键"] 或 字典.get("键")' }
      ]
    }
  },

  // ==================== 六级理论讲解 ====================
  level6: {
    // 函数的定义和使用
    'theory-6-1': {
      id: 'theory-6-1',
      knowledgePointId: 'kp-6-1',
      title: '函数的创建和调用',
      emoji: '📦',
      summary: '函数是一段可以重复使用的代码块',
      content: `
## 什么是函数？

函数是把一段代码**打包**起来，给它起个名字，以后可以重复使用。

## 定义函数

使用 **def** 关键字定义函数：

\`\`\`python
def 函数名(参数):
    # 函数体（要执行的代码）
    return 返回值
\`\`\`

## 示例

\`\`\`python
# 定义一个打招呼的函数
def greet(name):
    print('你好，' + name)

# 调用函数
greet('小明')  # 输出：你好，小明

# 定义一个计算函数
def add(a, b):
    return a + b

result = add(3, 5)
print(result)  # 输出：8
\`\`\`

## 参数和返回值

| 概念 | 说明 | 示例 |
|------|------|------|
| **参数** | 传给函数的数据 | def add(a, b) |
| **返回值** | 函数执行后返回的结果 | return a + b |

## 注意事项

- 函数名要有意义，能看出函数做什么
- 参数可以有多个，用逗号分隔
- return 返回结果，没有return则返回None
`,
      practice: [
        { q: '定义函数用什么关键字？', a: 'def' },
        { q: '函数如何返回结果？', a: '使用 return 语句' }
      ]
    },

    // Pygame基础
    'theory-6-2': {
      id: 'theory-6-2',
      knowledgePointId: 'kp-6-2',
      title: 'Pygame基础',
      emoji: '🎮',
      summary: 'PygameZero是一个简单易懂的游戏开发库',
      content: `
## 什么是PygameZero？

PygameZero是一个专为初学者设计的游戏开发库，让我们可以轻松创建游戏。

## 基本设置

\`\`\`python
import pgzrun

# 设置窗口大小
WIDTH = 800   # 窗口宽度
HEIGHT = 600  # 窗口高度

# 创建角色
player = Actor('角色图片')  # 图片在images文件夹中

# 绘制函数
def draw():
    screen.clear()  # 清屏
    player.draw()   # 绘制角色

pgzrun.go()  # 运行游戏
\`\`\`

## 角色属性

| 属性 | 说明 | 示例 |
|------|------|------|
| x | 水平位置 | player.x = 100 |
| y | 垂直位置 | player.y = 200 |
| image | 造型图片 | player.image = '新造型' |

## 坐标系统

- 左上角是 (0, 0)
- 向右x增大，向下y增大
- WIDTH是窗口宽度，HEIGHT是窗口高度
`,
      practice: [
        { q: '设置窗口宽度用什么变量？', a: 'WIDTH' },
        { q: '如何创建角色？', a: 'Actor("图片名称")' }
      ]
    },

    // pygame事件监听
    'theory-6-3': {
      id: 'theory-6-3',
      knowledgePointId: 'kp-6-3',
      title: 'Pygame事件监听',
      emoji: '🎯',
      summary: '事件监听让游戏能够响应键盘和鼠标操作',
      content: `
## 什么是事件监听？

事件监听让游戏能够"感知"玩家的操作，比如按键、点击鼠标等。

## 键盘事件

\`\`\`python
# 键盘按下时调用
def on_key_down(key):
    if key == keys.LEFT:
        player.x = player.x - 10
    if key == keys.RIGHT:
        player.x = player.x + 10
    if key == keys.SPACE:
        player.image = '跳跃'

# 键盘松开时调用
def on_key_up(key):
    if key == keys.SPACE:
        player.image = '站立'
\`\`\`

## 鼠标事件

\`\`\`python
# 鼠标按下时调用
def on_mouse_down(pos):
    print('点击位置:', pos)
    if player.collidepoint(pos):
        print('点到了角色！')

# 鼠标移动时调用
def on_mouse_move(pos):
    player.pos = pos  # 角色跟随鼠标
\`\`\`

## 常用按键常量

| 按键 | 常量 | 按键 | 常量 |
|------|------|------|------|
| 左 | keys.LEFT | 空格 | keys.SPACE |
| 右 | keys.RIGHT | 回车 | keys.RETURN |
| 上 | keys.UP | W | keys.W |
| 下 | keys.DOWN | A | keys.A |
`,
      practice: [
        { q: '键盘按下事件函数名是？', a: 'on_key_down()' },
        { q: '如何检测是否按了空格键？', a: 'key == keys.SPACE' }
      ]
    },

    // 简单递推问题
    'theory-6-4': {
      id: 'theory-6-4',
      knowledgePointId: 'kp-6-4',
      title: '简单递推问题',
      emoji: '🔄',
      summary: `递推是通过已知条件，逐步推导出结果的方法`,
      content: `
## 什么是递推？

递推就是从已知的**初始条件**开始，按照**递推公式**，一步步计算出结果。

## 递推三要素

1. **初始条件**：从哪里开始
2. **递推公式**：如何从上一个值计算下一个值
3. **终止条件**：算到什么时候结束

## 示例：等差数列

数列：2, 5, 8, 11, 14...

- 初始条件：a₁ = 2
- 递推公式：aₙ = aₙ₋₁ + 3

\`\`\`python
# 计算第n项
n = 5
a = 2  # 初始值
for i in range(1, n):
    a = a + 3  # 递推公式
print(a)  # 输出：14
\`\`\`

## 示例：阶乘

5! = 5 × 4 × 3 × 2 × 1 = 120

\`\`\`python
n = 5
result = 1
for i in range(1, n + 1):
    result = result * i
print(result)  # 输出：120
\`\`\`

## 注意事项

- 一定要有正确的初始条件
- 递推次数要准确
- 循环变量从几开始很重要
`,
      practice: [
        { q: '递推需要哪三个要素？', a: '初始条件、递推公式、终止条件' },
        { q: '如何计算5!？', a: '1×2×3×4×5=120' }
      ]
    },

    // 顺序模拟
    'theory-6-5': {
      id: 'theory-6-5',
      knowledgePointId: 'kp-6-5',
      title: '顺序模拟',
      emoji: '🔢',
      summary: `按顺序模拟表达式的计算过程，理解运算符优先级`,
      content: `
## 什么是表达式？

表达式是由**数字**和**运算符**组成的式子，如：3 + 5 * 2

## 运算符优先级

| 优先级 | 运算符 | 说明 |
|--------|--------|------|
| 高 | () | 括号 |
| 中 | * / // % | 乘、除、整除、取余 |
| 低 | + - | 加、减 |

## 模拟计算过程

计算 3 + 5 * 2：

1. 先算 5 * 2 = 10（乘法优先）
2. 再算 3 + 10 = 13
3. 结果是 13

\`\`\`python
# 用程序模拟
a, b, c = 3, 5, 2
step1 = b * c  # 5 * 2 = 10
result = a + step1  # 3 + 10 = 13
print(result)  # 输出：13
\`\`\`

## 带括号的表达式

计算 (3 + 5) * 2：

1. 先算括号内 3 + 5 = 8
2. 再算 8 * 2 = 16
3. 结果是 16

\`\`\`python
a, b, c = 3, 5, 2
step1 = a + b  # 3 + 5 = 8
result = step1 * c  # 8 * 2 = 16
print(result)  # 输出：16
\`\`\`
`,
      practice: [
        { q: '3 + 5 * 2 的结果是？', a: '13（先乘后加）' },
        { q: '(3 + 5) * 2 的结果是？', a: '16（括号优先）' }
      ]
    },

    // 循环模拟
    'theory-6-6': {
      id: 'theory-6-6',
      knowledgePointId: 'kp-6-6',
      title: '循环模拟',
      emoji: '🔁',
      summary: `用循环模拟重复执行的过程`,
      content: `
## 什么是循环模拟？

很多问题需要重复执行某个操作，我们可以用循环来模拟这个过程。

## 示例：模拟倒计时

\`\`\`python
n = 5
while n >= 0:
    print(n)
    n = n - 1
# 输出：5 4 3 2 1 0
\`\`\`

## 示例：模拟累加

计算 1 + 2 + 3 + ... + 10

\`\`\`python
total = 0
for i in range(1, 11):
    total = total + i
print(total)  # 输出：55
\`\`\`

## 示例：模拟计数

统计1到100中有多少个3的倍数

\`\`\`python
count = 0
for i in range(1, 101):
    if i % 3 == 0:
        count = count + 1
print(count)  # 输出：33
\`\`\`

## 循环模拟的步骤

1. 确定循环变量和初始值
2. 确定循环条件
3. 确定每次循环要做什么
4. 更新循环变量
`,
      practice: [
        { q: '如何用循环输出1到10？', a: 'for i in range(1, 11): print(i)' },
        { q: '如何统计1到50中的偶数个数？', a: '循环判断 i % 2 == 0，计数' }
      ]
    },

    // 带列表的模拟
    'theory-6-7': {
      id: 'theory-6-7',
      knowledgePointId: 'kp-6-7',
      title: '带列表的模拟',
      emoji: '📋',
      summary: '结合列表进行复杂问题的模拟',
      content: `
## 什么是带列表的模拟？

很多问题需要处理一组数据，我们可以用列表存储数据，然后遍历列表进行模拟。

## 示例：列表遍历

\`\`\`python
fruits = ['苹果', '香蕉', '橙子']
for fruit in fruits:
    print(fruit)
# 输出：苹果 香蕉 橙子
\`\`\`

## 示例：列表筛选

找出列表中所有的偶数

\`\`\`python
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = []
for n in nums:
    if n % 2 == 0:
        evens.append(n)
print(evens)  # 输出：[2, 4, 6, 8, 10]
\`\`\`

## 示例：列表统计

计算列表中元素的总和

\`\`\`python
scores = [85, 92, 78, 90, 88]
total = 0
for score in scores:
    total = total + score
print(total)  # 输出：433
print(total / len(scores))  # 平均分：86.6
\`\`\`

## 示例：列表查找

找出列表中的最大值

\`\`\`python
nums = [5, 2, 8, 1, 9]
max_val = nums[0]
for n in nums:
    if n > max_val:
        max_val = n
print(max_val)  # 输出：9
\`\`\`
`,
      practice: [
        { q: '如何遍历列表？', a: 'for 元素 in 列表:' },
        { q: '如何找列表最大值？', a: '逐个比较，记录最大的' }
      ]
    },

    // 斐波那契数列
    'theory-6-8': {
      id: 'theory-6-8',
      knowledgePointId: 'kp-6-8',
      title: '斐波那契数列',
      emoji: '🐚',
      summary: `斐波那契数列：每项等于前两项之和`,
      content: `
## 什么是斐波那契数列？

斐波那契数列是一个经典的数列：**1, 1, 2, 3, 5, 8, 13, 21, 34, 55...**

规律：从第3项开始，每项等于前两项之和。

## 递推公式

- F(1) = 1
- F(2) = 1
- F(n) = F(n-1) + F(n-2) （n > 2）

## 用递推计算

\`\`\`python
# 计算第n项
n = 10
if n <= 2:
    print(1)
else:
    a, b = 1, 1  # 前两项
    for i in range(3, n + 1):
        a, b = b, a + b  # 更新前两项
    print(b)  # 输出第n项
\`\`\`

## 输出前n项

\`\`\`python
n = 10
fib = [1, 1]
for i in range(2, n):
    fib.append(fib[i-1] + fib[i-2])
print(fib)
# 输出：[1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
\`\`\`

## 注意事项

- 初始两项都是1
- 递推时需要保存前两项的值
- 可以用列表存储所有项，也可以只用变量保存前两项
`,
      practice: [
        { q: '斐波那契数列的第5项是？', a: '5（1,1,2,3,5）' },
        { q: '斐波那契数列的递推公式是？', a: 'F(n) = F(n-1) + F(n-2)' }
      ]
    }
  }
}

// 根据等级和理论ID获取理论内容
export function getTheory(level, theoryId) {
  return yclTheory[level]?.[theoryId] || null
}

// 根据知识点ID获取理论内容
export function getTheoryByKnowledgePoint(level, kpId) {
  const levelTheory = yclTheory[level]
  if (!levelTheory) return null

  for (const theory of Object.values(levelTheory)) {
    if (theory.knowledgePointId === kpId) {
      return theory
    }
  }
  return null
}

// 获取某等级的所有理论
export function getAllTheoryByLevel(level) {
  return yclTheory[level] || {}
}

export default yclTheory
