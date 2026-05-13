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
