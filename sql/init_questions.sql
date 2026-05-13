/**
 * 题库初始数据 SQL
 * 100道编程题，考查Python基础语法核心知识点
 */

-- ========================================
-- 清空相关表（按外键顺序）
-- ========================================
TRUNCATE TABLE submissions;
TRUNCATE TABLE questions;
TRUNCATE TABLE question_tags;

-- ========================================
-- 插入标签
-- ========================================
INSERT INTO question_tags (name, color, parent_id) VALUES
('Python基础语法', 'rgb(100, 150, 180)', NULL);

INSERT INTO question_tags (name, color, parent_id) VALUES
('print命令', 'rgb(105, 155, 195)', 1),
('input输入', 'rgb(95, 145, 185)', 1),
('变量与赋值', 'rgb(85, 135, 175)', 1),
('布尔值', 'rgb(160, 160, 165)', 1),
('比较运算符', 'rgb(150, 150, 155)', 1),
('逻辑运算', 'rgb(140, 140, 145)', 1),
('条件判断', 'rgb(155, 155, 160)', 1),
('for循环', 'rgb(110, 160, 135)', 1),
('while循环', 'rgb(100, 150, 125)', 1),
('循环嵌套', 'rgb(90, 140, 115)', 1),
('break', 'rgb(80, 130, 105)', 1),
('continue', 'rgb(70, 120, 95)', 1),
('字符串基础', 'rgb(195, 175, 115)', 1),
('字符串切片', 'rgb(185, 165, 105)', 1),
('列表基础', 'rgb(195, 145, 105)', 1),
('列表遍历', 'rgb(185, 135, 95)', 1),
('列表操作', 'rgb(175, 125, 85)', 1),
('二维列表', 'rgb(165, 115, 75)', 1),
('字典', 'rgb(155, 135, 185)', 1),
('集合', 'rgb(145, 125, 175)', 1),
('数据类型转换', 'rgb(165, 150, 135)', 1),
('函数基础', 'rgb(155, 140, 125)', 1),
('列表推导式', 'rgb(145, 130, 115)', 1),
('随机模块', 'rgb(185, 140, 150)', 1);

-- ========================================
-- 插入20道编程题（第一批）
-- test_cases 使用 JSON 字符串
-- ========================================

INSERT INTO questions (title, content, type, difficulty, tags, test_cases) VALUES
('Hello World', '编写程序，输出"Hello World"。', 'program', 'easy', '[2]', '[{"input": "", "expectedOutput": "Hello World", "score": 34}, {"input": "", "expectedOutput": "Hello World", "score": 33}, {"input": "", "expectedOutput": "Hello World", "score": 33}]'),
('读取用户输入', '读取一个整数并输出它。', 'program', 'easy', '[3, 22]', '[{"input": "10", "expectedOutput": "10", "score": 34}, {"input": "0", "expectedOutput": "0", "score": 33}, {"input": "-5", "expectedOutput": "-5", "score": 33}]'),
('变量交换', '读取两个整数，分别存入变量a和b，然后交换它们的值，输出a和b（中间用空格分隔）。', 'program', 'easy', '[4]', '[{"input": "3 5", "expectedOutput": "5 3", "score": 34}, {"input": "1 2", "expectedOutput": "2 1", "score": 33}, {"input": "10 20", "expectedOutput": "20 10", "score": 33}]'),
('判断最大值', '读取两个整数，输出较大的那个数。', 'program', 'easy', '[6]', '[{"input": "3 7", "expectedOutput": "7", "score": 34}, {"input": "10 2", "expectedOutput": "10", "score": 33}, {"input": "5 5", "expectedOutput": "5", "score": 33}]'),
('布尔值转换', '读取一个整数，如果大于0输出True，否则输出False。', 'program', 'easy', '[5, 8]', '[{"input": "5", "expectedOutput": "True", "score": 34}, {"input": "-3", "expectedOutput": "False", "score": 33}, {"input": "0", "expectedOutput": "False", "score": 33}]'),
('奇偶数判断', '读取一个整数，如果是偶数输出"even"，如果是奇数输出"odd"。', 'program', 'easy', '[8, 6]', '[{"input": "4", "expectedOutput": "even", "score": 34}, {"input": "7", "expectedOutput": "odd", "score": 33}, {"input": "1", "expectedOutput": "odd", "score": 33}]'),
('累加求和', '读取一个整数n，计算1+2+...+n的值并输出。', 'program', 'easy', '[9, 4]', '[{"input": "10", "expectedOutput": "55", "score": 34}, {"input": "100", "expectedOutput": "5050", "score": 33}, {"input": "1", "expectedOutput": "1", "score": 33}]'),
('数字倒数', '读取一个整数n，倒序输出1到n，每个数字占一行。', 'program', 'easy', '[10]', '[{"input": "5", "expectedOutput": "5\\n4\\n3\\n2\\n1", "score": 34}, {"input": "3", "expectedOutput": "3\\n2\\n1", "score": 33}, {"input": "1", "expectedOutput": "1", "score": 33}]'),
('打印矩形', '读取两个整数rows和cols，输出rows行stars，每行cols个*（无空格）。', 'program', 'medium', '[11, 9]', '[{"input": "3 4", "expectedOutput": "****\\n****\\n****", "score": 34}, {"input": "2 3", "expectedOutput": "***\\n***", "score": 33}, {"input": "1 5", "expectedOutput": "*****", "score": 33}]'),
('查找第一个平方数', '读取一个整数n，找到第一个大于等于n的完全平方数并输出（如n=10则输出16）。', 'program', 'easy', '[12, 10]', '[{"input": "10", "expectedOutput": "16", "score": 34}, {"input": "99", "expectedOutput": "100", "score": 33}, {"input": "1", "expectedOutput": "1", "score": 33}]'),
('跳过奇数', '读取一个整数n，输出1到n之间所有不能被2整除的数，每个数字占一行。', 'program', 'easy', '[13, 9]', '[{"input": "7", "expectedOutput": "1\\n3\\n5\\n7", "score": 34}, {"input": "5", "expectedOutput": "1\\n3\\n5", "score": 33}, {"input": "3", "expectedOutput": "1\\n3", "score": 33}]'),
('字符串连接', '读取两个字符串，用空格连接后输出。', 'program', 'easy', '[14]', '[{"input": "hello world", "expectedOutput": "hello world", "score": 34}, {"input": "a b", "expectedOutput": "a b", "score": 33}, {"input": "123 456", "expectedOutput": "123 456", "score": 33}]'),
('提取子串', '读取一个字符串，输出索引1到3的字符（s[1:4]）。', 'program', 'easy', '[15]', '[{"input": "abcdefg", "expectedOutput": "bcd", "score": 34}, {"input": "python", "expectedOutput": "yth", "score": 33}, {"input": "abc", "expectedOutput": "bc", "score": 33}]'),
('创建数字列表', '读取一个整数n，创建一个包含1到n所有整数的列表并输出。', 'program', 'easy', '[16]', '[{"input": "5", "expectedOutput": "[1, 2, 3, 4, 5]", "score": 34}, {"input": "3", "expectedOutput": "[1, 2, 3]", "score": 33}, {"input": "1", "expectedOutput": "[1]", "score": 33}]'),
('列表元素求和', '读取一行用空格分隔的5个整数，计算所有元素的和并输出。', 'program', 'easy', '[17, 16]', '[{"input": "1 2 3 4 5", "expectedOutput": "15", "score": 34}, {"input": "10 20 30 40 50", "expectedOutput": "150", "score": 33}, {"input": "1 1 1 1 1", "expectedOutput": "5", "score": 33}]'),
('添加列表元素', '读取一个整数n，向列表[1, 2, 3]末尾添加n，然后输出新列表。', 'program', 'easy', '[18]', '[{"input": "4", "expectedOutput": "[1, 2, 3, 4]", "score": 34}, {"input": "5", "expectedOutput": "[1, 2, 3, 5]", "score": 33}, {"input": "10", "expectedOutput": "[1, 2, 3, 10]", "score": 33}]'),
('二维数组元素访问', '创建一个3x3的二维列表[[1,2,3],[4,5,6],[7,8,9]]，输出第2行第2列的元素（即第1索引行第1索引列的值5）。', 'program', 'easy', '[19, 16]', '[{"input": "", "expectedOutput": "5", "score": 34}, {"input": "", "expectedOutput": "9", "score": 33}, {"input": "", "expectedOutput": "1", "score": 33}]'),
('字典查找', '读取一个字符串作为key，从字典{"apple":"苹果","banana":"香蕉","orange":"橙子"}中查找对应的值并输出。', 'program', 'easy', '[20]', '[{"input": "apple", "expectedOutput": "苹果", "score": 34}, {"input": "orange", "expectedOutput": "橙子", "score": 33}, {"input": "banana", "expectedOutput": "香蕉", "score": 33}]'),
('字符串转整数', '读取一个字符串形式的整数，转换为整数加1后输出。', 'program', 'easy', '[22]', '[{"input": "99", "expectedOutput": "100", "score": 34}, {"input": "0", "expectedOutput": "1", "score": 33}, {"input": "-5", "expectedOutput": "-4", "score": 33}]'),
('定义求和函数', '定义一个函数sum(a, b)返回a+b的值，读取两个整数，调用该函数并输出结果。', 'program', 'easy', '[23]', '[{"input": "3 5", "expectedOutput": "8", "score": 34}, {"input": "10 20", "expectedOutput": "30", "score": 33}, {"input": "0 0", "expectedOutput": "0", "score": 33}]'),

-- ========================================
-- 追加40道简单难度编程题（第二批）
-- 均匀覆盖所有标签，循环和判断题目较多
-- ========================================

('判断与运算', '读取两个整数，如果两个数都大于0则输出True，否则输出False。', 'program', 'easy', '[7, 8]', '[{"input": "3 5", "expectedOutput": "True", "score": 34}, {"input": "3 -1", "expectedOutput": "False", "score": 33}, {"input": "-1 -2", "expectedOutput": "False", "score": 33}]'),
('判断或运算', '读取两个整数，如果任意一个大于0则输出True，否则输出False。', 'program', 'easy', '[7, 8]', '[{"input": "3 -1", "expectedOutput": "True", "score": 34}, {"input": "-1 5", "expectedOutput": "True", "score": 33}, {"input": "-1 -2", "expectedOutput": "False", "score": 33}]'),
('判断非运算', '读取一个整数，如果等于0则输出True，否则输出False。', 'program', 'easy', '[7, 8]', '[{"input": "0", "expectedOutput": "True", "score": 34}, {"input": "1", "expectedOutput": "False", "score": 33}, {"input": "5", "expectedOutput": "False", "score": 33}]'),
('三分法', '读取一个整数，如果是正数输出"positive"，负数输出"negative"，零输出"zero"。', 'program', 'easy', '[8, 6]', '[{"input": "5", "expectedOutput": "positive", "score": 34}, {"input": "-3", "expectedOutput": "negative", "score": 33}, {"input": "0", "expectedOutput": "zero", "score": 33}]'),
('绝对值', '读取一个整数，输出它的绝对值。', 'program', 'easy', '[8, 6]', '[{"input": "-5", "expectedOutput": "5", "score": 34}, {"input": "10", "expectedOutput": "10", "score": 33}, {"input": "0", "expectedOutput": "0", "score": 33}]'),
('成绩评级', '读取一个0-100的整数成绩，大于等于90输出"A"，大于等于80输出"B"，大于等于60输出"C"，否则输出"D"。', 'program', 'easy', '[8, 6]', '[{"input": "85", "expectedOutput": "B", "score": 34}, {"input": "45", "expectedOutput": "D", "score": 33}, {"input": "92", "expectedOutput": "A", "score": 33}]'),
('三个数最大值', '读取三个整数，输出最大的那个数。', 'program', 'easy', '[8, 6]', '[{"input": "3 5 2", "expectedOutput": "5", "score": 34}, {"input": "10 3 7", "expectedOutput": "10", "score": 33}, {"input": "5 5 3", "expectedOutput": "5", "score": 33}]'),
('打印数字', '读取一个整数n，输出1到n，每个数字占一行。', 'program', 'easy', '[9]', '[{"input": "5", "expectedOutput": "1\\n2\\n3\\n4\\n5", "score": 34}, {"input": "3", "expectedOutput": "1\\n2\\n3", "score": 33}, {"input": "1", "expectedOutput": "1", "score": 33}]'),
('打印偶数', '读取一个整数n，输出1到n之间所有能被2整除的数，每个数字占一行。', 'program', 'easy', '[9, 6]', '[{"input": "8", "expectedOutput": "2\\n4\\n6\\n8", "score": 34}, {"input": "6", "expectedOutput": "2\\n4\\n6", "score": 33}, {"input": "2", "expectedOutput": "2", "score": 33}]'),
('累乘求积', '读取一个整数n，计算1×2×...×n的值并输出。', 'program', 'easy', '[9, 4]', '[{"input": "5", "expectedOutput": "120", "score": 34}, {"input": "3", "expectedOutput": "6", "score": 33}, {"input": "0", "expectedOutput": "1", "score": 33}]'),
('奇数之和', '读取一个整数n，计算1到n之间所有奇数的和并输出。', 'program', 'easy', '[9, 6]', '[{"input": "9", "expectedOutput": "25", "score": 34}, {"input": "10", "expectedOutput": "25", "score": 33}, {"input": "1", "expectedOutput": "1", "score": 33}]'),
('while计数器', '读取一个整数n，使用while循环输出1到n，每个数字占一行。', 'program', 'easy', '[10, 4]', '[{"input": "4", "expectedOutput": "1\\n2\\n3\\n4", "score": 34}, {"input": "2", "expectedOutput": "1\\n2", "score": 33}, {"input": "1", "expectedOutput": "1", "score": 33}]'),
('while求和', '读取一个整数n，使用while循环计算1+2+...+n的值并输出。', 'program', 'easy', '[10, 4]', '[{"input": "10", "expectedOutput": "55", "score": 34}, {"input": "5", "expectedOutput": "15", "score": 33}, {"input": "1", "expectedOutput": "1", "score": 33}]'),
('数字位数', '读取一个正整数，输出它的位数。', 'program', 'easy', '[10, 6]', '[{"input": "12345", "expectedOutput": "5", "score": 34}, {"input": "7", "expectedOutput": "1", "score": 33}, {"input": "1000", "expectedOutput": "4", "score": 33}]'),
('打印三角形', '读取一个整数n，输出n行的直角三角形，第i行有i个*（无空格）。', 'program', 'medium', '[11, 9]', '[{"input": "4", "expectedOutput": "*\\n**\\n***\\n****", "score": 34}, {"input": "3", "expectedOutput": "*\\n**\\n***", "score": 33}, {"input": "1", "expectedOutput": "*", "score": 33}]'),
('九九乘法表', '输出九九乘法表，每行格式"1*1=1"，行与行之间用换行分隔。', 'program', 'medium', '[11, 9]', '[{"input": "", "expectedOutput": "1*1=1\\n1*2=2 2*2=4\\n1*3=3 2*3=6 3*3=9\\n1*4=4 2*4=8 3*4=12 4*4=16\\n1*5=5 2*5=10 3*5=15 4*5=20 5*5=25\\n1*6=6 2*6=12 3*6=18 4*6=24 5*6=30 6*6=36\\n1*7=7 2*7=14 3*7=21 4*7=28 5*7=35 6*7=42 7*7=49\\n1*8=8 2*8=16 3*8=24 4*8=32 5*8=40 6*8=48 7*8=56 8*8=64\\n1*9=9 2*9=18 3*9=27 4*9=36 5*9=45 6*9=54 7*9=63 8*9=72 9*9=81", "score": 100}]'),
('倒三角形', '读取一个整数n，输出n行的倒直角三角形，第i行有n-i+1个*（无空格）。', 'program', 'medium', '[11, 9]', '[{"input": "4", "expectedOutput": "****\\n***\\n**\\n*", "score": 34}, {"input": "3", "expectedOutput": "***\\n**\\n*", "score": 33}, {"input": "1", "expectedOutput": "*", "score": 33}]'),
('找到第一个偶数', '读取5个整数，找到第一个偶数并输出，如果没找到则输出"not found"。', 'program', 'easy', '[12, 9]', '[{"input": "1 3 5 6 7", "expectedOutput": "6", "score": 34}, {"input": "1 3 5 7 9", "expectedOutput": "not found", "score": 33}, {"input": "2 4 6 8 10", "expectedOutput": "2", "score": 33}]'),
('遇到5停止', '循环读取整数（输入以0结束，不包含0），遇到5时停止，输出遇到5之前所有数的和。', 'program', 'easy', '[12, 10]', '[{"input": "1 2 3 5", "expectedOutput": "6", "score": 34}, {"input": "10 20 0", "expectedOutput": "30", "score": 33}, {"input": "5 1 2", "expectedOutput": "0", "score": 33}]'),
('跳过3的倍数', '读取一个整数n，输出1到n之间所有不能被3整除的数，每个数字占一行。', 'program', 'easy', '[13, 9]', '[{"input": "7", "expectedOutput": "1\\n2\\n4\\n5\\n7", "score": 34}, {"input": "5", "expectedOutput": "1\\n2\\n4\\n5", "score": 33}, {"input": "3", "expectedOutput": "1\\n2", "score": 33}]'),
('跳过负数', '读取5个整数，跳过所有负数，输出剩余正数的和。', 'program', 'easy', '[13, 9]', '[{"input": "1 -2 3 -4 5", "expectedOutput": "9", "score": 34}, {"input": "-1 -2 -3 4 5", "expectedOutput": "9", "score": 33}, {"input": "1 2 3 4 5", "expectedOutput": "15", "score": 33}]'),
('字符串长度', '读取一个字符串，输出它的长度。', 'program', 'easy', '[14]', '[{"input": "hello", "expectedOutput": "5", "score": 34}, {"input": "python", "expectedOutput": "6", "score": 33}, {"input": "a", "expectedOutput": "1", "score": 33}]'),
('重复输出', '读取一个字符串和一个整数n，输出字符串重复n次的结果。', 'program', 'easy', '[14, 22]', '[{"input": "ha 3", "expectedOutput": "hahaha", "score": 34}, {"input": "ab 2", "expectedOutput": "abab", "score": 33}, {"input": "x 5", "expectedOutput": "xxxxx", "score": 33}]'),
('首尾字符', '读取一个字符串，输出它的第一个和最后一个字符（无空格）。', 'program', 'easy', '[15, 14]', '[{"input": "hello", "expectedOutput": "ho", "score": 34}, {"input": "python", "expectedOutput": "pn", "score": 33}, {"input": "ab", "expectedOutput": "ab", "score": 33}]'),
('翻转字符串', '读取一个字符串，输出它的反转字符串。', 'program', 'easy', '[15, 14]', '[{"input": "abcd", "expectedOutput": "dcba", "score": 34}, {"input": "hello", "expectedOutput": "olleh", "score": 33}, {"input": "a", "expectedOutput": "a", "score": 33}]'),
('创建重复列表', '读取一个整数n，创建一个包含n个"hello"的列表并输出。', 'program', 'easy', '[16, 14]', '[{"input": "3", "expectedOutput": "[\\"hello\\", \\"hello\\", \\"hello\\"]", "score": 34}, {"input": "1", "expectedOutput": "[\\"hello\\"]", "score": 33}, {"input": "5", "expectedOutput": "[\\"hello\\", \\"hello\\", \\"hello\\", \\"hello\\", \\"hello\\"]", "score": 33}]'),
('列表长度', '读取一行用空格分隔的若干整数，输出列表的长度。', 'program', 'easy', '[16]', '[{"input": "1 2 3 4 5", "expectedOutput": "5", "score": 34}, {"input": "10 20", "expectedOutput": "2", "score": 33}, {"input": "42", "expectedOutput": "1", "score": 33}]'),
('列表最大值', '读取一行用空格分隔的5个整数，输出最大的那个数。', 'program', 'easy', '[17]', '[{"input": "3 8 2 9 5", "expectedOutput": "9", "score": 34}, {"input": "1 2 3 4 5", "expectedOutput": "5", "score": 33}, {"input": "5 4 3 2 1", "expectedOutput": "5", "score": 33}]'),
('列表最小值', '读取一行用空格分隔的5个整数，输出最小的那个数。', 'program', 'easy', '[17]', '[{"input": "3 8 2 9 5", "expectedOutput": "2", "score": 34}, {"input": "1 2 3 4 5", "expectedOutput": "1", "score": 33}, {"input": "5 4 3 2 1", "expectedOutput": "1", "score": 33}]'),
('移除列表元素', '创建一个列表[1, 2, 3, 4, 3, 5]，移除第一个3，输出新列表。', 'program', 'easy', '[18]', '[{"input": "", "expectedOutput": "[1, 2, 4, 3, 5]", "score": 34}, {"input": "", "expectedOutput": "[1, 2, 4, 3, 5]", "score": 33}, {"input": "", "expectedOutput": "[1, 2, 4, 3, 5]", "score": 33}]'),
('列表排序', '读取一行用空格分隔的5个整数，排序后输出（从小到大）。', 'program', 'easy', '[18, 16]', '[{"input": "5 3 1 4 2", "expectedOutput": "[1, 2, 3, 4, 5]", "score": 34}, {"input": "3 3 3 2 1", "expectedOutput": "[1, 2, 3, 3, 3]", "score": 33}, {"input": "1 2 3 4 5", "expectedOutput": "[1, 2, 3, 4, 5]", "score": 33}]'),
('访问二维列表', '创建一个2x2列表[[10,20],[30,40]]，输出第1行（索引0）第2列（索引1）的元素。', 'program', 'easy', '[19, 16]', '[{"input": "", "expectedOutput": "20", "score": 34}, {"input": "", "expectedOutput": "20", "score": 33}, {"input": "", "expectedOutput": "20", "score": 33}]'),
('二维列表行和', '读取四个整数a b c d，创建一个2x2列表[[a,b],[c,d]]，输出第一行元素的和。', 'program', 'easy', '[19, 16, 9]', '[{"input": "1 2 3 4", "expectedOutput": "3", "score": 34}, {"input": "5 6 7 8", "expectedOutput": "11", "score": 33}, {"input": "0 0 1 1", "expectedOutput": "0", "score": 33}]'),
('统计字符', '读取一个只包含小写字母的字符串，统计每个字符出现的次数，输出字典。', 'program', 'easy', '[20, 14]', '[{"input": "abca", "expectedOutput": "{\\"a\\": 2, \\"b\\": 1, \\"c\\": 1}", "score": 34}, {"input": "aaa", "expectedOutput": "{\\"a\\": 3}", "score": 33}, {"input": "abc", "expectedOutput": "{\\"a\\": 1, \\"b\\": 1, \\"c\\": 1}", "score": 33}]'),
('合并字典', '读取两个字符串，用空格分隔，输出两个字符串长度组成的字典{"first":长度1,"second":长度2}。', 'program', 'easy', '[20, 14]', '[{"input": "hello world", "expectedOutput": "{\\"first\\": 5, \\"second\\": 5}", "score": 34}, {"input": "ab cd", "expectedOutput": "{\\"first\\": 2, \\"second\\": 2}", "score": 33}, {"input": "python java", "expectedOutput": "{\\"first\\": 6, \\"second\\": 4}", "score": 33}]'),
('集合合并', '读取两行字符串，输出它们字符集合的并集（去重后按字母顺序）。', 'program', 'easy', '[21, 14]', '[{"input": "abc\\ndef", "expectedOutput": "[\\"a\\", \\"b\\", \\"c\\", \\"d\\", \\"e\\", \\"f\\"]", "score": 34}, {"input": "aa\\nbb", "expectedOutput": "[\\"a\\", \\"b\\"]", "score": 33}, {"input": "xyz\\nxyz", "expectedOutput": "[\\"x\\", \\"y\\", \\"z\\"]", "score": 33}]'),
('集合交集', '读取两行字符串，输出它们字符集合的交集（去重后按字母顺序）。', 'program', 'easy', '[21, 14]', '[{"input": "abc\\nbcd", "expectedOutput": "[\\"b\\", \\"c\\"]", "score": 34}, {"input": "aaa\\nabc", "expectedOutput": "[\\"a\\"]", "score": 33}, {"input": "xyz\\nabc", "expectedOutput": "[]", "score": 33}]'),
('整数转字符串', '读取一个整数，转换为字符串后与"+"连接并输出。', 'program', 'easy', '[22, 14]', '[{"input": "123", "expectedOutput": "123+", "score": 34}, {"input": "0", "expectedOutput": "0+", "score": 33}, {"input": "99", "expectedOutput": "99+", "score": 33}]'),
('字符串转列表', '读取一个字符串，转换为字符列表并输出。', 'program', 'easy', '[22, 16]', '[{"input": "hello", "expectedOutput": "[\\"h\\", \\"e\\", \\"l\\", \\"l\\", \\"o\\"]", "score": 34}, {"input": "ab", "expectedOutput": "[\\"a\\", \\"b\\"]", "score": 33}, {"input": "a", "expectedOutput": "[\\"a\\"]", "score": 33}]'),
('定义乘法函数', '定义一个函数mul(a, b)返回a*b的值，读取两个整数，调用该函数并输出结果。', 'program', 'easy', '[23]', '[{"input": "3 4", "expectedOutput": "12", "score": 34}, {"input": "5 6", "expectedOutput": "30", "score": 33}, {"input": "0 100", "expectedOutput": "0", "score": 33}]'),
('定义绝对值函数', '定义一个函数my_abs(n)返回n的绝对值，读取一个整数，调用该函数并输出结果。', 'program', 'easy', '[23, 8]', '[{"input": "-5", "expectedOutput": "5", "score": 34}, {"input": "10", "expectedOutput": "10", "score": 33}, {"input": "0", "expectedOutput": "0", "score": 33}]'),
('偶数列表', '读取一个整数n，使用列表推导式创建1到n所有偶数的列表并输出。', 'program', 'easy', '[24, 9]', '[{"input": "8", "expectedOutput": "[2, 4, 6, 8]", "score": 34}, {"input": "5", "expectedOutput": "[2, 4]", "score": 33}, {"input": "2", "expectedOutput": "[2]", "score": 33}]'),
('平方列表', '读取一个整数n，使用列表推导式创建[1的平方, 2的平方, ..., n的平方]并输出。', 'program', 'easy', '[24, 9]', '[{"input": "5", "expectedOutput": "[1, 4, 9, 16, 25]", "score": 34}, {"input": "3", "expectedOutput": "[1, 4, 9]", "score": 33}, {"input": "1", "expectedOutput": "[1]", "score": 33}]'),
('筛选大于平均', '读取一行用空格分隔的5个整数，创建只包含大于平均值的列表并输出。', 'program', 'easy', '[24, 17]', '[{"input": "1 2 3 4 10", "expectedOutput": "[4, 10]", "score": 34}, {"input": "1 2 3 4 5", "expectedOutput": "[4, 5]", "score": 33}, {"input": "5 5 5 5 5", "expectedOutput": "[]", "score": 33}]'),
('随机整数', '使用random.randint(1, 10)生成一个随机整数并输出。', 'program', 'easy', '[25]', '[{"input": "", "expectedOutput": "__RANDOM_INT__1-10__", "score": 100}]'),
('随机列表元素', '创建一个列表[10, 20, 30, 40, 50]，使用random.choice()随机选择一个元素并输出。', 'program', 'easy', '[25, 18]', '[{"input": "", "expectedOutput": "__RANDOM_CHOICE__[10,20,30,40,50]__", "score": 100}]'),
('随机抽牌', '创建一个列表["红桃A","黑桃A","方块A","梅花A"]，使用random.choice()随机选一张牌并输出。', 'program', 'easy', '[25, 18]', '[{"input": "", "expectedOutput": "__RANDOM_CHOICE__[\\"红桃A\\",\\"黑桃A\\",\\"方块A\\",\\"梅花A\\"]__", "score": 100}]'),

-- ========================================
-- 追加20道中等难度编程题（第三批）
-- 考查两个核心知识点的结合
-- ========================================

('判断质数', '读取一个整数n，判断它是否是质数（只能被1和自身整除），是输出"prime"，否则输出"not prime"。', 'program', 'medium', '[8, 9]', '[{"input": "7", "expectedOutput": "prime", "score": 34}, {"input": "10", "expectedOutput": "not prime", "score": 33}, {"input": "2", "expectedOutput": "prime", "score": 33}]'),
('判断闰年', '读取一个年份，判断它是否是闰年（能被4整除但不能被100整除，或者能被400整除），是输出"yes"，否则输出"no"。', 'program', 'medium', '[8, 6]', '[{"input": "2024", "expectedOutput": "yes", "score": 34}, {"input": "1900", "expectedOutput": "no", "score": 33}, {"input": "2000", "expectedOutput": "yes", "score": 33}]'),
('提取数字', '读取一个只包含字母和数字的字符串，将其中的所有数字组成一个新字符串并输出。', 'program', 'medium', '[14, 9]', '[{"input": "a1b2c3", "expectedOutput": "123", "score": 34}, {"input": "abc", "expectedOutput": "", "score": 33}, {"input": "1a2b3c4", "expectedOutput": "1234", "score": 33}]'),
('列表去重', '读取一行用空格分隔的若干整数，输出去重后的列表（保留首次出现的顺序）。', 'program', 'medium', '[18, 16]', '[{"input": "1 2 2 3 1 4", "expectedOutput": "[1, 2, 3, 4]", "score": 34}, {"input": "1 1 1 1", "expectedOutput": "[1]", "score": 33}, {"input": "3 2 1", "expectedOutput": "[3, 2, 1]", "score": 33}]'),
('斐波那契数列', '读取一个整数n，输出斐波那契数列的前n项（每项是前两项之和，前两项为1,1）。', 'program', 'medium', '[9, 16]', '[{"input": "6", "expectedOutput": "[1, 1, 2, 3, 5, 8]", "score": 34}, {"input": "3", "expectedOutput": "[1, 1, 2]", "score": 33}, {"input": "1", "expectedOutput": "[1]", "score": 33}]'),
('统计出现次数', '读取一行字符串，统计每个字符出现的次数，输出字典。', 'program', 'medium', '[20, 9]', '[{"input": "abracadabra", "expectedOutput": "{\\"a\\": 5, \\"b\\": 2, \\"r\\": 2, \\"c\\": 1, \\"d\\": 1}", "score": 34}, {"input": "aaa", "expectedOutput": "{\\"a\\": 3}", "score": 33}, {"input": "abc", "expectedOutput": "{\\"a\\": 1, \\"b\\": 1, \\"c\\": 1}", "score": 33}]'),
('定义阶乘函数', '定义一个函数fact(n)返回n的阶乘，读取一个非负整数，调用该函数并输出结果。', 'program', 'medium', '[23, 9]', '[{"input": "5", "expectedOutput": "120", "score": 34}, {"input": "0", "expectedOutput": "1", "score": 33}, {"input": "3", "expectedOutput": "6", "score": 33}]'),
('列表转字典', '读取一行用空格分隔的字符串作为keys，创建一个字典{每个key: 其索引}并输出。', 'program', 'medium', '[20, 16]', '[{"input": "a b c", "expectedOutput": "{\\"a\\": 0, \\"b\\": 1, \\"c\\": 2}", "score": 34}, {"input": "x", "expectedOutput": "{\\"x\\": 0}", "score": 33}, {"input": "one two", "expectedOutput": "{\\"one\\": 0, \\"two\\": 1}", "score": 33}]'),
('周期字符串', '读取一个字符串s和一个整数n，输出s重复n次的结果。', 'program', 'medium', '[14, 22]', '[{"input": "abc 3", "expectedOutput": "abcabcabc", "score": 34}, {"input": "x 5", "expectedOutput": "xxxxx", "score": 33}, {"input": "ab 2", "expectedOutput": "abab", "score": 33}]'),
('回文数判断', '读取一个整数，判断它是否是回文数（正读和反读相同），是输出"yes"，否则输出"no"。', 'program', 'medium', '[15, 8]', '[{"input": "121", "expectedOutput": "yes", "score": 34}, {"input": "123", "expectedOutput": "no", "score": 33}, {"input": "1", "expectedOutput": "yes", "score": 33}]'),
('找出完数', '读取一个整数n，找出1到n之间所有的完数（等于因子之和的数，如6=1+2+3），输出列表。', 'program', 'medium', '[9, 8]', '[{"input": "30", "expectedOutput": "[6, 28]", "score": 34}, {"input": "10", "expectedOutput": "[6]", "score": 33}, {"input": "5", "expectedOutput": "[]", "score": 33}]'),
('条件列表推导', '读取一行用空格分隔的5个整数，使用列表推导式筛选出大于平均值的数并输出。', 'program', 'medium', '[24, 17]', '[{"input": "1 2 3 4 10", "expectedOutput": "[4, 10]", "score": 34}, {"input": "1 2 3 4 5", "expectedOutput": "[4, 5]", "score": 33}, {"input": "1 2 3 4 20", "expectedOutput": "[4, 20]", "score": 33}]'),
('返回多个值', '定义一个函数swap(a, b)返回(b, a)，读取两个整数，调用该函数并输出两个返回值（用空格分隔）。', 'program', 'medium', '[23, 8]', '[{"input": "3 5", "expectedOutput": "5 3", "score": 34}, {"input": "1 2", "expectedOutput": "2 1", "score": 33}, {"input": "10 10", "expectedOutput": "10 10", "score": 33}]'),
('共同元素', '读取两行字符串，输出它们字符集合的交集（去重后按字母顺序）。', 'program', 'medium', '[21, 14]', '[{"input": "abc\\nbcd", "expectedOutput": "[\\"b\\", \\"c\\"]", "score": 34}, {"input": "aaa\\nabc", "expectedOutput": "[\\"a\\"]", "score": 33}, {"input": "xyz\\nabc", "expectedOutput": "[]", "score": 33}]'),
('字符ASCII码', '读取一个字符，输出它的ASCII码值。', 'program', 'medium', '[14, 22]', '[{"input": "A", "expectedOutput": "65", "score": 34}, {"input": "a", "expectedOutput": "97", "score": 33}, {"input": "0", "expectedOutput": "48", "score": 33}]'),
('跳过5的倍数', '读取一个整数n，输出1到n之间所有不能被5整除的数（每个数字占一行），遇到10停止。', 'program', 'medium', '[13, 9, 12]', '[{"input": "15", "expectedOutput": "1\\n2\\n3\\n4\\n6\\n7\\n8\\n9", "score": 34}, {"input": "5", "expectedOutput": "1\\n2\\n3\\n4", "score": 33}, {"input": "3", "expectedOutput": "1\\n2\\n3", "score": 33}]'),
('矩阵转置', '创建一个2x3列表[[1,2,3],[4,5,6]]，输出它的转置矩阵（3x2列表）。', 'program', 'medium', '[19, 16, 9]', '[{"input": "", "expectedOutput": "[[1, 4], [2, 5], [3, 6]]", "score": 34}, {"input": "", "expectedOutput": "[[1, 4], [2, 5], [3, 6]]", "score": 33}, {"input": "", "expectedOutput": "[[1, 4], [2, 5], [3, 6]]", "score": 33}]'),
('字典值求和', '读取三个整数，创建一个字典{"a":第一个,"b":第二个,"c":第三个}，输出所有值的和。', 'program', 'medium', '[20, 9]', '[{"input": "1 2 3", "expectedOutput": "6", "score": 34}, {"input": "10 20 30", "expectedOutput": "60", "score": 33}, {"input": "5 5 5", "expectedOutput": "15", "score": 33}]'),
('函数返回列表', '定义一个函数range_list(n)返回[1,2,...,n]，读取一个整数，调用该函数并输出结果。', 'program', 'medium', '[23, 16]', '[{"input": "5", "expectedOutput": "[1, 2, 3, 4, 5]", "score": 34}, {"input": "3", "expectedOutput": "[1, 2, 3]", "score": 33}, {"input": "1", "expectedOutput": "[1]", "score": 33}]'),
('随机数累加', '使用random.randint(1, 100)生成5个随机整数，输出它们的和。', 'program', 'medium', '[25, 9]', '[{"input": "", "expectedOutput": "__RANDOM_SUM__5-500__", "score": 100}]'),

-- ========================================
-- 追加20道困难编程题（第四批）
-- 结合实际场景，涉及基础算法
-- ========================================

('冒泡排序', '读取一行用空格分隔的5个整数，使用冒泡排序算法将其从小到大排序后输出。', 'program', 'hard', '[9, 16, 18]', '[{"input": "5 3 8 1 2", "expectedOutput": "[1, 2, 3, 5, 8]", "score": 34}, {"input": "9 8 7 6 5", "expectedOutput": "[5, 6, 7, 8, 9]", "score": 33}, {"input": "1 2 3 4 5", "expectedOutput": "[1, 2, 3, 4, 5]", "score": 33}]'),
('选择排序', '读取一行用空格分隔的5个整数，使用选择排序算法将其从小到大排序后输出。', 'program', 'hard', '[9, 16, 18]', '[{"input": "64 25 12 22 11", "expectedOutput": "[11, 12, 22, 25, 64]", "score": 34}, {"input": "5 4 3 2 1", "expectedOutput": "[1, 2, 3, 4, 5]", "score": 33}, {"input": "3 1 4 1 5", "expectedOutput": "[1, 1, 3, 4, 5]", "score": 33}]'),
('二分查找', '读取一行用空格分隔的5个升序整数和一个目标值，输出目标值的索引（从0开始），找不到输出-1。', 'program', 'hard', '[9, 6, 8]', '[{"input": "1 3 5 7 9 5", "expectedOutput": "2", "score": 34}, {"input": "1 3 5 7 9 6", "expectedOutput": "-1", "score": 33}, {"input": "2 4 6 8 10 2", "expectedOutput": "0", "score": 33}]'),
('变位词判断', '读取两个字符串，判断它们是否是变位词（包含相同字符但顺序不同），是输出"yes"，否则输出"no"。', 'program', 'hard', '[20, 14, 9]', '[{"input": "listen silent", "expectedOutput": "yes", "score": 34}, {"input": "hello world", "expectedOutput": "no", "score": 33}, {"input": "aab baa", "expectedOutput": "yes", "score": 33}]'),
('最大公约数', '读取两个正整数，使用辗转相除法（欧几里得算法）计算并输出它们的最大公约数。', 'program', 'hard', '[9, 10, 8]', '[{"input": "48 18", "expectedOutput": "6", "score": 34}, {"input": "100 25", "expectedOutput": "25", "score": 33}, {"input": "17 13", "expectedOutput": "1", "score": 33}]'),
('最小公倍数', '读取两个正整数，计算并输出它们的最小公倍数。', 'program', 'hard', '[9, 8, 22]', '[{"input": "4 6", "expectedOutput": "12", "score": 34}, {"input": "5 7", "expectedOutput": "35", "score": 33}, {"input": "3 9", "expectedOutput": "9", "score": 33}]'),
('统计单词', '读取一行由空格分隔的单词，统计每个单词出现的次数，输出字典（按单词首字母顺序）。', 'program', 'hard', '[20, 9, 14]', '[{"input": "apple banana apple orange banana apple", "expectedOutput": "{\\"apple\\": 3, \\"banana\\": 2, \\"orange\\": 1}", "score": 34}, {"input": "one one one", "expectedOutput": "{\\"one\\": 3}", "score": 33}, {"input": "a b c a b", "expectedOutput": "{\\"a\\": 2, \\"b\\": 2, \\"c\\": 1}", "score": 33}]'),
('购物找零', '模拟收银找零。读取两个整数price和money，分别表示商品价格和顾客支付的金额，输出需要找零的金额。如果钱不够输出"not enough"。', 'program', 'hard', '[8, 6, 22]', '[{"input": "23 50", "expectedOutput": "27", "score": 34}, {"input": "50 50", "expectedOutput": "0", "score": 33}, {"input": "100 50", "expectedOutput": "not enough", "score": 33}]'),
('质数判断升级', '读取一个整数n，判断它是否是质数，是输出"prime"，否则输出"not prime"（需要遍历到sqrt(n)）。', 'program', 'hard', '[9, 8, 10]', '[{"input": "17", "expectedOutput": "prime", "score": 34}, {"input": "100", "expectedOutput": "not prime", "score": 33}, {"input": "1", "expectedOutput": "not prime", "score": 33}]'),
('杨辉三角', '读取一个整数n，输出杨辉三角的前n行，每行用一个列表表示。', 'program', 'hard', '[19, 16, 9]', '[{"input": "5", "expectedOutput": "[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]", "score": 34}, {"input": "3", "expectedOutput": "[[1], [1, 1], [1, 2, 1]]", "score": 33}, {"input": "1", "expectedOutput": "[[1]]", "score": 33}]'),
('密码强度', '读取一个密码字符串，判断其强度：长度不足8输出"weak"，长度>=8但不含数字输出"medium"，长度>=8且含数字和字母输出"strong"。', 'program', 'hard', '[14, 9, 8]', '[{"input": "password", "expectedOutput": "medium", "score": 34}, {"input": "abcdefgh", "expectedOutput": "medium", "score": 33}, {"input": "abcdefg", "expectedOutput": "weak", "score": 33}]'),
('验证码生成', '使用random.sample()从字符串"ABCDEFGHJKLMNPQRSTUVWXYZ23456789"中随机选取4个字符组成验证码并输出。', 'program', 'hard', '[25, 14, 18]', '[{"input": "", "expectedOutput": "__RANDOM_SAMPLE__ABCDEFGHJKLMNPQRSTUVWXYZ23456789__4__", "score": 100}]'),
('成绩统计', '读取一行用空格分隔的5个0-100的整数成绩，输出平均分（保留1位小数）和最高分，用空格分隔。', 'program', 'hard', '[9, 17, 22]', '[{"input": "85 92 78 96 89", "expectedOutput": "88.0 96", "score": 34}, {"input": "100 100 100 100 100", "expectedOutput": "100.0 100", "score": 33}, {"input": "60 70 80 90 100", "expectedOutput": "80.0 100", "score": 33}]'),
('凯撒密码', '读取一个只包含小写字母的字符串和一个整数n，将每个字符向后移动n位（z之后回到a），输出加密后的字符串。', 'program', 'hard', '[14, 9, 22]', '[{"input": "abc 2", "expectedOutput": "cde", "score": 34}, {"input": "xyz 3", "expectedOutput": "abc", "score": 33}, {"input": "a 1", "expectedOutput": "b", "score": 33}]'),
('斐波那契求和', '读取一个整数n，计算斐波那契数列前n项的和并输出（每项是前两项之和，前两项为1,1）。', 'program', 'hard', '[9, 10, 4]', '[{"input": "6", "expectedOutput": "20", "score": 34}, {"input": "3", "expectedOutput": "4", "score": 33}, {"input": "10", "expectedOutput": "143", "score": 33}]'),
('数字提取计算', '读取一行包含数字和字母的字符串，提取所有连续数字组成一个整数，相加后输出结果。', 'program', 'hard', '[14, 9, 22]', '[{"input": "a123b456c", "expectedOutput": "579", "score": 34}, {"input": "abc123", "expectedOutput": "123", "score": 33}, {"input": "12abc34def56", "expectedOutput": "102", "score": 33}]'),
('掷骰子模拟', '使用random.randint(1, 6)模拟掷两个骰子，输出它们的和。', 'program', 'hard', '[25, 9]', '[{"input": "", "expectedOutput": "__RANDOM_SUM__2-12__", "score": 100}]'),
('三角形判断', '读取三个整数作为三角形的三边长度，判断能否构成三角形（任意两边之和大于第三边），能输出"yes"，否则输出"no"。', 'program', 'hard', '[8, 6, 9]', '[{"input": "3 4 5", "expectedOutput": "yes", "score": 34}, {"input": "1 2 3", "expectedOutput": "no", "score": 33}, {"input": "5 5 5", "expectedOutput": "yes", "score": 33}]'),
('数列规律', '读取一个整数n，推算并输出数列的第n项：1, 2, 4, 7, 11, 16...（相邻两项之差依次增加1）。', 'program', 'hard', '[9, 10, 4]', '[{"input": "6", "expectedOutput": "16", "score": 34}, {"input": "1", "expectedOutput": "1", "score": 33}, {"input": "10", "expectedOutput": "46", "score": 33}]'),
('进制转换', '读取一个二进制字符串（只含0和1），将其转换为十进制整数并输出。', 'program', 'hard', '[14, 9, 22]', '[{"input": "1010", "expectedOutput": "10", "score": 34}, {"input": "1111", "expectedOutput": "15", "score": 33}, {"input": "100", "expectedOutput": "4", "score": 33}]');

-- ========================================
-- 追加30道简单难度选择题（第五批）
-- 均匀覆盖所有知识点
-- ========================================

INSERT INTO questions (title, content, type, difficulty, tags, choices) VALUES
('print输出', '下面哪个代码可以正确输出Hello Python？', 'choice', 'easy', '[2]', '[{"content": "print(Hello Python)", "isCorrect": false}, {"content": "print Hello Python", "isCorrect": false}, {"content": "print函数加括号包裹字符串", "isCorrect": true}, {"content": "echo Hello Python", "isCorrect": false}]'),
('input输入', '读取用户输入的整数并保存到变量n，正确的代码是？', 'choice', 'easy', '[3]', '[{"content": "n = input()", "isCorrect": false}, {"content": "n = int(input())", "isCorrect": true}, {"content": "input(n)", "isCorrect": false}, {"content": "n = input", "isCorrect": false}]'),
('变量赋值', '执行 a = 5 后，再执行 a = a + 3，a的最终值是多少？', 'choice', 'easy', '[4]', '[{"content": "5", "isCorrect": false}, {"content": "8", "isCorrect": true}, {"content": "3", "isCorrect": false}, {"content": "a + 3", "isCorrect": false}]'),
('布尔值', '下面哪个是Python中表示真的布尔值？', 'choice', 'easy', '[5]', '[{"content": "true", "isCorrect": false}, {"content": "True", "isCorrect": true}, {"content": "FALSE", "isCorrect": false}, {"content": "真", "isCorrect": false}]'),
('比较运算', '表达式 10 > 5 的结果是？', 'choice', 'easy', '[6]', '[{"content": "True", "isCorrect": true}, {"content": "False", "isCorrect": false}, {"content": "1", "isCorrect": false}, {"content": "0", "isCorrect": false}]'),
('等于判断', '判断两个值是否相等，应该使用哪个运算符？', 'choice', 'easy', '[6]', '[{"content": "=", "isCorrect": false}, {"content": "==", "isCorrect": true}, {"content": "===", "isCorrect": false}, {"content": "!=", "isCorrect": false}]'),
('and运算', '表达式 True and False 的结果是？', 'choice', 'easy', '[7]', '[{"content": "True", "isCorrect": false}, {"content": "False", "isCorrect": true}, {"content": "and", "isCorrect": false}, {"content": "0", "isCorrect": false}]'),
('or运算', '表达式 False or True 的结果是？', 'choice', 'easy', '[7]', '[{"content": "False", "isCorrect": false}, {"content": "True", "isCorrect": true}, {"content": "or", "isCorrect": false}, {"content": "1", "isCorrect": false}]'),
('not运算', '表达式 not True 的结果是？', 'choice', 'easy', '[7]', '[{"content": "True", "isCorrect": false}, {"content": "False", "isCorrect": true}, {"content": "None", "isCorrect": false}, {"content": "not", "isCorrect": false}]'),
('if单分支', '以下哪个是正确的if语句语法？', 'choice', 'easy', '[8]', '[{"content": "if x > 0: print(x)", "isCorrect": false}, {"content": "if x > 0换行缩进print(x)", "isCorrect": true}, {"content": "if x > 0 then print(x)", "isCorrect": false}, {"content": "if (x > 0) print(x)", "isCorrect": false}]'),
('if多分支', '要判断x分别等于1、2、其他三种情况，应该使用？', 'choice', 'easy', '[8]', '[{"content": "if elif else", "isCorrect": true}, {"content": "if if else", "isCorrect": false}, {"content": "switch case", "isCorrect": false}, {"content": "if else if", "isCorrect": false}]'),
('for循环', '要输出1到5，正确的方法是？', 'choice', 'easy', '[9]', '[{"content": "for i in range(1, 5)", "isCorrect": false}, {"content": "for i in range(1, 6)", "isCorrect": true}, {"content": "for i in range(5)", "isCorrect": false}, {"content": "for 1 to 5", "isCorrect": false}]'),
('range函数', 'range(1, 10, 2)会生成什么序列？', 'choice', 'easy', '[9]', '[{"content": "1到9的整数", "isCorrect": false}, {"content": "1, 3, 5, 7, 9", "isCorrect": true}, {"content": "2, 4, 6, 8, 10", "isCorrect": false}, {"content": "1到10的整数", "isCorrect": false}]'),
('while循环', '以下哪个是while循环的正确格式？', 'choice', 'easy', '[10]', '[{"content": "while i < 10换行缩进执行代码", "isCorrect": true}, {"content": "while i < 10", "isCorrect": false}, {"content": "while (i < 10) { }", "isCorrect": false}, {"content": "loop while i < 10", "isCorrect": false}]'),
('while计数', '以下代码会输出什么？\n```python\ni = 0\nwhile i < 3:\n    print(i)\n    i += 1\n```', 'choice', 'easy', '[10]', '[{"content": "1 2 3", "isCorrect": false}, {"content": "0 1 2", "isCorrect": true}, {"content": "0 1 2 3", "isCorrect": false}, {"content": "1 2", "isCorrect": false}]'),
('break语句', '在循环中，break语句的作用是什么？', 'choice', 'easy', '[12]', '[{"content": "跳过本次循环，继续下一次", "isCorrect": false}, {"content": "结束整个循环", "isCorrect": true}, {"content": "暂停程序", "isCorrect": false}, {"content": "退出程序", "isCorrect": false}]'),
('continue语句', '在循环中，continue语句的作用是什么？', 'choice', 'easy', '[13]', '[{"content": "结束整个循环", "isCorrect": false}, {"content": "跳过本次循环，继续下一次", "isCorrect": true}, {"content": "暂停循环", "isCorrect": false}, {"content": "重新开始循环", "isCorrect": false}]'),
('字符串定义', '下面哪个是正确的字符串定义方式？', 'choice', 'easy', '[14]', '[{"content": "双引号或单引号包裹", "isCorrect": true}, {"content": "直接写Hello", "isCorrect": false}, {"content": "方括号包裹", "isCorrect": false}, {"content": "圆括号包裹", "isCorrect": false}]'),
('字符串连接', '在Python中，两个字符串s1和s2怎么连接？', 'choice', 'easy', '[14]', '[{"content": "s1 + s2", "isCorrect": true}, {"content": "s1 & s2", "isCorrect": false}, {"content": "s1 . s2", "isCorrect": false}, {"content": "s1 , s2", "isCorrect": false}]'),
('字符串切片', 's = Python，s[1:4]的结果是？', 'choice', 'easy', '[15]', '[{"content": "Pyt", "isCorrect": false}, {"content": "yth", "isCorrect": true}, {"content": "ytho", "isCorrect": false}, {"content": "thon", "isCorrect": false}]'),
('列表创建', '创建一个包含数字1, 2, 3的列表，正确的方法是？', 'choice', 'easy', '[16]', '[{"content": "[1, 2, 3]", "isCorrect": true}, {"content": "{1, 2, 3}", "isCorrect": false}, {"content": "(1, 2, 3)", "isCorrect": false}, {"content": "<1, 2, 3>", "isCorrect": false}]'),
('列表索引', 'nums = [10, 20, 30]，nums[0]的值是？', 'choice', 'easy', '[16]', '[{"content": "10", "isCorrect": true}, {"content": "20", "isCorrect": false}, {"content": "30", "isCorrect": false}, {"content": "1", "isCorrect": false}]'),
('列表遍历', '用for循环遍历列表names，正确的写法是？', 'choice', 'easy', '[17]', '[{"content": "for name in names", "isCorrect": true}, {"content": "for name of names", "isCorrect": false}, {"content": "foreach name in names", "isCorrect": false}, {"content": "for names", "isCorrect": false}]'),
('append方法', 'lst = [1, 2]，执行lst.append(3)后，lst变成？', 'choice', 'easy', '[18]', '[{"content": "[1, 2, 3]", "isCorrect": true}, {"content": "[3, 1, 2]", "isCorrect": false}, {"content": "[1, 2]", "isCorrect": false}, {"content": "1, 2, 3", "isCorrect": false}]'),
('二维列表访问', 'matrix = [[1,2],[3,4]]，matrix[1][0]的值是？', 'choice', 'easy', '[19]', '[{"content": "1", "isCorrect": false}, {"content": "2", "isCorrect": false}, {"content": "3", "isCorrect": true}, {"content": "4", "isCorrect": false}]'),
('字典创建', '创建一个字典存储name和age，正确的方法是？', 'choice', 'easy', '[20]', '[{"content": "花括号包裹键值对", "isCorrect": true}, {"content": "方括号包裹", "isCorrect": false}, {"content": "圆括号包裹", "isCorrect": false}, {"content": "尖括号包裹", "isCorrect": false}]'),
('字典访问', 'd = {a: 1, b: 2}，d[a]的值是？', 'choice', 'easy', '[20]', '[{"content": "a", "isCorrect": false}, {"content": "1", "isCorrect": true}, {"content": "2", "isCorrect": false}, {"content": "b", "isCorrect": false}]'),
('集合特点', '集合（set）的特点是什么？', 'choice', 'easy', '[21]', '[{"content": "有序且可重复", "isCorrect": false}, {"content": "无序且不重复", "isCorrect": true}, {"content": "有序且不重复", "isCorrect": false}, {"content": "无序且可重复", "isCorrect": false}]'),
('类型转换', '将字符串123转换为整数，正确的方法是？', 'choice', 'easy', '[22]', '[{"content": "int函数", "isCorrect": true}, {"content": "integer函数", "isCorrect": false}, {"content": "str函数", "isCorrect": false}, {"content": "float函数", "isCorrect": false}]'),
('函数定义', '定义一个名为add的函数，参数为a和b，正确的方法是？', 'choice', 'easy', '[23]', '[{"content": "def add(a, b):", "isCorrect": true}, {"content": "function add(a, b):", "isCorrect": false}, {"content": "func add(a, b)", "isCorrect": false}, {"content": "define add(a, b):", "isCorrect": false}]'),
('列表推导式', '以下哪个是列表推导式的正确写法？', 'choice', 'easy', '[24]', '[{"content": "[x for x in range(5)]", "isCorrect": true}, {"content": "(x for x in range(5))", "isCorrect": false}, {"content": "{x for x in range(5)}", "isCorrect": false}, {"content": "x for x in range(5)", "isCorrect": false}]'),
('random模块', '使用random模块生成1到10的随机整数，正确的是？', 'choice', 'easy', '[25]', '[{"content": "random.randint(1, 10)", "isCorrect": true}, {"content": "random.random(1, 10)", "isCorrect": false}, {"content": "random.choice(1, 10)", "isCorrect": false}, {"content": "random.number(1, 10)", "isCorrect": false}]');

-- ========================================
-- 追加20道中等难度选择题（第六批）
-- 综合题型，每题多个标签
-- ========================================

INSERT INTO questions (title, content, type, difficulty, tags, choices) VALUES
('print综合', '执行代码：x = 5; print(x + 3)会输出什么？', 'choice', 'medium', '[2, 4, 22]', '[{"content": "x + 3", "isCorrect": false}, {"content": "8", "isCorrect": true}, {"content": "53", "isCorrect": false}, {"content": "报错", "isCorrect": false}]'),
('input综合', '执行n = input()后输入123，如何得到整数123？', 'choice', 'medium', '[3, 22, 4]', '[{"content": "直接打印n", "isCorrect": false}, {"content": "使用int(n)转换", "isCorrect": true}, {"content": "使用str(n)", "isCorrect": false}, {"content": "无法转换", "isCorrect": false}]'),
('变量比较', '执行a = 10; b = 20后，a > b的结果是什么？', 'choice', 'medium', '[4, 6, 5]', '[{"content": "True", "isCorrect": false}, {"content": "False", "isCorrect": true}, {"content": "10", "isCorrect": false}, {"content": "20", "isCorrect": false}]'),
('布尔逻辑', '表达式5 > 3 and 2 > 4的结果是什么？', 'choice', 'medium', '[5, 7, 6]', '[{"content": "True", "isCorrect": false}, {"content": "False", "isCorrect": true}, {"content": "and", "isCorrect": false}, {"content": "None", "isCorrect": false}]'),
('比较运算综合', '判断x是否在1到10之间，正确的写法是？', 'choice', 'medium', '[6, 7, 8]', '[{"content": "x >= 1 and x <= 10", "isCorrect": true}, {"content": "x >= 1 or x <= 10", "isCorrect": false}, {"content": "1 <= x <= 10", "isCorrect": true}, {"content": "x > 1 and x < 10", "isCorrect": false}]'),
('逻辑综合', 'not (x > 5 and x < 10)等价于什么？', 'choice', 'medium', '[7, 6, 8]', '[{"content": "x <= 5 or x >= 10", "isCorrect": true}, {"content": "x < 5 or x > 10", "isCorrect": false}, {"content": "x <= 5 and x >= 10", "isCorrect": false}, {"content": "not x > 5 and not x < 10", "isCorrect": false}]'),
('if循环综合', '以下代码输出什么？\n```python\nfor i in range(3):\n    if i == 1:\n        print(i)\n```', 'choice', 'medium', '[8, 9, 2]', '[{"content": "0 1 2", "isCorrect": false}, {"content": "1", "isCorrect": true}, {"content": "0 2", "isCorrect": false}, {"content": "什么都不输出", "isCorrect": false}]'),
('range综合', 'range(2, 8, 2)会生成哪些数字？', 'choice', 'medium', '[9, 16, 4]', '[{"content": "2, 4, 6, 8", "isCorrect": false}, {"content": "2, 4, 6", "isCorrect": true}, {"content": "2, 4, 6, 8, 10", "isCorrect": false}, {"content": "2, 3, 4, 5, 6, 7, 8", "isCorrect": false}]'),
('while综合', '以下代码会执行几次 print？\n```python\ni = 0\nwhile i < 3:\n    print(i)\n    i += 1\n```', 'choice', 'medium', '[10, 4, 2]', '[{"content": "2次", "isCorrect": false}, {"content": "3次", "isCorrect": true}, {"content": "4次", "isCorrect": false}, {"content": "无限次", "isCorrect": false}]'),
('循环嵌套输出', '以下代码会输出几行？\n```python\nfor i in range(2):\n    for j in range(2):\n        print(i, j)\n```', 'choice', 'medium', '[11, 9, 2]', '[{"content": "2行", "isCorrect": false}, {"content": "4行", "isCorrect": true}, {"content": "3行", "isCorrect": false}, {"content": "1行", "isCorrect": false}]'),
('break综合', '以下代码会输出什么？\n```python\nfor i in range(5):\n    if i == 3:\n        break\n    print(i)\n```', 'choice', 'medium', '[12, 9, 8]', '[{"content": "0 1 2 3 4", "isCorrect": false}, {"content": "0 1 2", "isCorrect": true}, {"content": "3", "isCorrect": false}, {"content": "什么都不输出", "isCorrect": false}]'),
('continue综合', '以下代码会输出什么？\n```python\nfor i in range(4):\n    if i == 2:\n        continue\n    print(i)\n```', 'choice', 'medium', '[13, 9, 8]', '[{"content": "0 1 2 3", "isCorrect": false}, {"content": "0 1 3", "isCorrect": true}, {"content": "0 1 2", "isCorrect": false}, {"content": "2", "isCorrect": false}]'),
('字符串切片综合', 's = Python, s[1:4]和s[0:3]哪个更长？', 'choice', 'medium', '[15, 14, 6]', '[{"content": "s[1:4]更长", "isCorrect": false}, {"content": "s[0:3]更长", "isCorrect": false}, {"content": "一样长", "isCorrect": true}, {"content": "无法比较", "isCorrect": false}]'),
('列表遍历综合', '以下代码会输出什么？\n```python\nlst = [1, 2, 3]\nfor i in lst:\n    print(i * 2)\n```', 'choice', 'medium', '[17, 16, 9]', '[{"content": "1 2 3", "isCorrect": false}, {"content": "2 4 6", "isCorrect": true}, {"content": "[2, 4, 6]", "isCorrect": false}, {"content": "报错", "isCorrect": false}]'),
('列表操作综合', '以下代码输出什么？\n```python\nlst = [1, 2, 3]\nlst.append(4)\nprint(len(lst))\n```', 'choice', 'medium', '[18, 16, 2]', '[{"content": "3", "isCorrect": false}, {"content": "4", "isCorrect": true}, {"content": "[1, 2, 3, 4]", "isCorrect": false}, {"content": "报错", "isCorrect": false}]'),
('二维列表综合', '以下代码输出什么？\n```python\nm = [[1, 2], [3, 4]]\nprint(m[0][1] + m[1][0])\n```', 'choice', 'medium', '[19, 16, 4]', '[{"content": "5", "isCorrect": false}, {"content": "6", "isCorrect": true}, {"content": "7", "isCorrect": false}, {"content": "报错", "isCorrect": false}]'),
('字典综合', '以下代码输出什么？\n```python\nd = {\"a\": 1, \"b\": 2}\nprint(d.get(\"c\", 0))\n```', 'choice', 'medium', '[20, 8, 2]', '[{"content": "报错", "isCorrect": false}, {"content": "0", "isCorrect": true}, {"content": "None", "isCorrect": false}, {"content": "c", "isCorrect": false}]'),
('集合综合', 'set([1,2,2,3,3,3])的结果是什么？', 'choice', 'medium', '[21, 16, 22]', '[{"content": "[1, 2, 3]", "isCorrect": false}, {"content": "{1, 2, 3}", "isCorrect": true}, {"content": "(1, 2, 3)", "isCorrect": false}, {"content": "报错", "isCorrect": false}]'),
('类型转换综合', 'str(123) + str(456)的结果是什么？', 'choice', 'medium', '[22, 14, 4]', '[{"content": "579", "isCorrect": false}, {"content": "123456", "isCorrect": true}, {"content": "[123, 456]", "isCorrect": false}, {"content": "报错", "isCorrect": false}]'),
('函数综合', '以下代码输出什么？\n```python\ndef f(x):\n    return x * 2\n\nprint(f(3) + f(4))\n```', 'choice', 'medium', '[23, 4, 2]', '[{"content": "14", "isCorrect": true}, {"content": "24", "isCorrect": false}, {"content": "6 8", "isCorrect": false}, {"content": "报错", "isCorrect": false}]');

-- ========================================
-- 追加10道困难难度选择题（第七批）
-- 综合题型，涉及算法思维
-- ========================================

INSERT INTO questions (title, content, type, difficulty, tags, choices) VALUES
('冒泡排序理解', '冒泡排序中，每次遍历都会把最大的元素放到哪里？', 'choice', 'hard', '[9, 16, 18, 8]', '[{"content": "放到开头位置", "isCorrect": false}, {"content": "放到末尾位置", "isCorrect": true}, {"content": "放到中间位置", "isCorrect": false}, {"content": "位置不变", "isCorrect": false}]'),
('二分查找理解', '二分查找要求数据必须满足什么条件？', 'choice', 'hard', '[9, 6, 8, 10]', '[{"content": "数据可以是任意顺序", "isCorrect": false}, {"content": "数据必须有序排列", "isCorrect": true}, {"content": "数据必须全是奇数", "isCorrect": false}, {"content": "数据长度必须是偶数", "isCorrect": false}]'),
('递归思想', '递归函数必须具备的两个要素是什么？', 'choice', 'hard', '[23, 8, 9]', '[{"content": "循环和判断", "isCorrect": false}, {"content": "终止条件和递归调用", "isCorrect": true}, {"content": "输入和输出", "isCorrect": false}, {"content": "变量和函数", "isCorrect": false}]'),
('字典查找优化', '在大量数据中查找某个元素，哪种数据结构效率最高？', 'choice', 'hard', '[20, 16, 17]', '[{"content": "列表，因为简单", "isCorrect": false}, {"content": "字典，因为查找速度快", "isCorrect": true}, {"content": "字符串，因为占空间小", "isCorrect": false}, {"content": "都一样快", "isCorrect": false}]'),
('字符串算法', '判断一个字符串是否是回文串，最高效的方法是？', 'choice', 'hard', '[14, 9, 8]', '[{"content": "从头到尾遍历", "isCorrect": false}, {"content": "首尾双指针向中间逼近", "isCorrect": true}, {"content": "反转字符串再比较", "isCorrect": false}, {"content": "转换为列表再比较", "isCorrect": false}]'),
('二维列表遍历', '遍历一个n行m列的二维列表，时间复杂度是？', 'choice', 'hard', '[19, 11, 9, 16]', '[{"content": "O(n)", "isCorrect": false}, {"content": "O(m)", "isCorrect": false}, {"content": "O(n*m)", "isCorrect": true}, {"content": "O(n+m)", "isCorrect": false}]'),
('列表推导式优化', '列表推导式相比普通for循环创建列表的优势是？', 'choice', 'hard', '[24, 9, 8, 6]', '[{"content": "可以处理更复杂逻辑", "isCorrect": false}, {"content": "代码更简洁且效率更高", "isCorrect": true}, {"content": "可以使用break和continue", "isCorrect": false}, {"content": "可以处理无限循环", "isCorrect": false}]'),
('随机算法', '从列表中随机抽取不重复的n个元素，应该使用？', 'choice', 'hard', '[25, 9, 16]', '[{"content": "多次调用random.choice", "isCorrect": false}, {"content": "random.sample函数", "isCorrect": true}, {"content": "random.randint函数", "isCorrect": false}, {"content": "random.shuffle后切片", "isCorrect": false}]'),
('质数判断优化', '判断一个数n是否为质数，最优化只需遍历到？', 'choice', 'hard', '[8, 9, 6, 10]', '[{"content": "n/2", "isCorrect": false}, {"content": "n的平方根", "isCorrect": true}, {"content": "n-1", "isCorrect": false}, {"content": "n", "isCorrect": false}]'),
('斐波那契优化', '计算斐波那契数列第n项，使用递归会重复计算，更好的方法是？', 'choice', 'hard', '[9, 16, 10, 4]', '[{"content": "每次重新计算", "isCorrect": false}, {"content": "使用循环或记忆化存储", "isCorrect": true}, {"content": "使用更多递归调用", "isCorrect": false}, {"content": "使用字符串存储", "isCorrect": false}]');
