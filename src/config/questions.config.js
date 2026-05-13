/**
 * 题库配置文件
 * 由后端服务自动生成，请勿手动编辑
 */

import { tagsConfig } from './tags.config.js'

export const questionsConfig = {
  tags: tagsConfig,
  questions: [
    {
      id: 1,
      title: 'Hello World',
      type: 'program',
      difficulty: 'easy',
      tags: ['2'],
      content: '编写程序，输出"Hello World"。',
      testCases: [{ input: '', expectedOutput: 'Hello World', score: 34 }, { input: '', expectedOutput: 'Hello World', score: 33 }, { input: '', expectedOutput: 'Hello World', score: 33 }]
    },
    {
      id: 2,
      title: '读取用户输入',
      type: 'program',
      difficulty: 'easy',
      tags: ['3', '22'],
      content: '读取一个整数并输出它。',
      testCases: [{ input: '10', expectedOutput: '10', score: 34 }, { input: '0', expectedOutput: '0', score: 33 }, { input: '-5', expectedOutput: '-5', score: 33 }]
    },
    {
      id: 3,
      title: '变量交换',
      type: 'program',
      difficulty: 'easy',
      tags: ['4'],
      content: '读取两个整数，分别存入变量a和b，然后交换它们的值，输出a和b（中间用空格分隔）。',
      testCases: [{ input: '3 5', expectedOutput: '5 3', score: 34 }, { input: '1 2', expectedOutput: '2 1', score: 33 }, { input: '10 20', expectedOutput: '20 10', score: 33 }]
    },
    {
      id: 4,
      title: '判断最大值',
      type: 'program',
      difficulty: 'easy',
      tags: ['6'],
      content: '读取两个整数，输出较大的那个数。',
      testCases: [{ input: '3 7', expectedOutput: '7', score: 34 }, { input: '10 2', expectedOutput: '10', score: 33 }, { input: '5 5', expectedOutput: '5', score: 33 }]
    },
    {
      id: 5,
      title: '布尔值转换',
      type: 'program',
      difficulty: 'easy',
      tags: ['5', '8'],
      content: '读取一个整数，如果大于0输出True，否则输出False。',
      testCases: [{ input: '5', expectedOutput: 'True', score: 34 }, { input: '-3', expectedOutput: 'False', score: 33 }, { input: '0', expectedOutput: 'False', score: 33 }]
    },
    {
      id: 6,
      title: '奇偶数判断',
      type: 'program',
      difficulty: 'easy',
      tags: ['8', '6'],
      content: '读取一个整数，如果是偶数输出"even"，如果是奇数输出"odd"。',
      testCases: [{ input: '4', expectedOutput: 'even', score: 34 }, { input: '7', expectedOutput: 'odd', score: 33 }, { input: '1', expectedOutput: 'odd', score: 33 }]
    },
    {
      id: 7,
      title: '累加求和',
      type: 'program',
      difficulty: 'easy',
      tags: ['9', '4'],
      content: '读取一个整数n，计算1+2+...+n的值并输出。',
      testCases: [{ input: '10', expectedOutput: '55', score: 34 }, { input: '100', expectedOutput: '5050', score: 33 }, { input: '1', expectedOutput: '1', score: 33 }]
    },
    {
      id: 8,
      title: '数字倒数',
      type: 'program',
      difficulty: 'easy',
      tags: ['10'],
      content: '读取一个整数n，倒序输出1到n，每个数字占一行。',
      testCases: [{ input: '5', expectedOutput: '5\n4\n3\n2\n1', score: 34 }, { input: '3', expectedOutput: '3\n2\n1', score: 33 }, { input: '1', expectedOutput: '1', score: 33 }]
    },
    {
      id: 9,
      title: '打印矩形',
      type: 'program',
      difficulty: 'medium',
      tags: ['11', '9'],
      content: '读取两个整数rows和cols，输出rows行stars，每行cols个*（无空格）。',
      testCases: [{ input: '3 4', expectedOutput: '****\n****\n****', score: 34 }, { input: '2 3', expectedOutput: '***\n***', score: 33 }, { input: '1 5', expectedOutput: '*****', score: 33 }]
    },
    {
      id: 10,
      title: '查找第一个平方数',
      type: 'program',
      difficulty: 'easy',
      tags: ['12', '10'],
      content: '读取一个整数n，找到第一个大于等于n的完全平方数并输出（如n=10则输出16）。',
      testCases: [{ input: '10', expectedOutput: '16', score: 34 }, { input: '99', expectedOutput: '100', score: 33 }, { input: '1', expectedOutput: '1', score: 33 }]
    },
    {
      id: 11,
      title: '跳过奇数',
      type: 'program',
      difficulty: 'easy',
      tags: ['13', '9'],
      content: '读取一个整数n，输出1到n之间所有不能被2整除的数，每个数字占一行。',
      testCases: [{ input: '7', expectedOutput: '1\n3\n5\n7', score: 34 }, { input: '5', expectedOutput: '1\n3\n5', score: 33 }, { input: '3', expectedOutput: '1\n3', score: 33 }]
    },
    {
      id: 12,
      title: '字符串连接',
      type: 'program',
      difficulty: 'easy',
      tags: ['14'],
      content: '读取两个字符串，用空格连接后输出。',
      testCases: [{ input: 'hello world', expectedOutput: 'hello world', score: 34 }, { input: 'a b', expectedOutput: 'a b', score: 33 }, { input: '123 456', expectedOutput: '123 456', score: 33 }]
    },
    {
      id: 13,
      title: '提取子串',
      type: 'program',
      difficulty: 'easy',
      tags: ['15'],
      content: '读取一个字符串，输出索引1到3的字符（s[1:4]）。',
      testCases: [{ input: 'abcdefg', expectedOutput: 'bcd', score: 34 }, { input: 'python', expectedOutput: 'yth', score: 33 }, { input: 'abc', expectedOutput: 'bc', score: 33 }]
    },
    {
      id: 14,
      title: '创建数字列表',
      type: 'program',
      difficulty: 'easy',
      tags: ['16'],
      content: '读取一个整数n，创建一个包含1到n所有整数的列表并输出。',
      testCases: [{ input: '5', expectedOutput: '[1, 2, 3, 4, 5]', score: 34 }, { input: '3', expectedOutput: '[1, 2, 3]', score: 33 }, { input: '1', expectedOutput: '[1]', score: 33 }]
    },
    {
      id: 15,
      title: '列表元素求和',
      type: 'program',
      difficulty: 'easy',
      tags: ['17', '16'],
      content: '读取一行用空格分隔的5个整数，计算所有元素的和并输出。',
      testCases: [{ input: '1 2 3 4 5', expectedOutput: '15', score: 34 }, { input: '10 20 30 40 50', expectedOutput: '150', score: 33 }, { input: '1 1 1 1 1', expectedOutput: '5', score: 33 }]
    },
    {
      id: 16,
      title: '添加列表元素',
      type: 'program',
      difficulty: 'easy',
      tags: ['18'],
      content: '读取一个整数n，向列表[1, 2, 3]末尾添加n，然后输出新列表。',
      testCases: [{ input: '4', expectedOutput: '[1, 2, 3, 4]', score: 34 }, { input: '5', expectedOutput: '[1, 2, 3, 5]', score: 33 }, { input: '10', expectedOutput: '[1, 2, 3, 10]', score: 33 }]
    },
    {
      id: 17,
      title: '二维数组元素访问',
      type: 'program',
      difficulty: 'easy',
      tags: ['19', '16'],
      content: '创建一个3x3的二维列表[[1,2,3],[4,5,6],[7,8,9]]，输出第2行第2列的元素（即第1索引行第1索引列的值5）。',
      testCases: [{ input: '', expectedOutput: '5', score: 34 }, { input: '', expectedOutput: '9', score: 33 }, { input: '', expectedOutput: '1', score: 33 }]
    },
    {
      id: 18,
      title: '字典查找',
      type: 'program',
      difficulty: 'easy',
      tags: ['20'],
      content: '读取一个字符串作为key，从字典{"apple":"苹果","banana":"香蕉","orange":"橙子"}中查找对应的值并输出。',
      testCases: [{ input: 'apple', expectedOutput: '苹果', score: 34 }, { input: 'orange', expectedOutput: '橙子', score: 33 }, { input: 'banana', expectedOutput: '香蕉', score: 33 }]
    },
    {
      id: 19,
      title: '字符串转整数',
      type: 'program',
      difficulty: 'easy',
      tags: ['22'],
      content: '读取一个字符串形式的整数，转换为整数加1后输出。',
      testCases: [{ input: '99', expectedOutput: '100', score: 34 }, { input: '0', expectedOutput: '1', score: 33 }, { input: '-5', expectedOutput: '-4', score: 33 }]
    },
    {
      id: 20,
      title: '定义求和函数',
      type: 'program',
      difficulty: 'easy',
      tags: ['23'],
      content: '定义一个函数sum(a, b)返回a+b的值，读取两个整数，调用该函数并输出结果。',
      testCases: [{ input: '3 5', expectedOutput: '8', score: 34 }, { input: '10 20', expectedOutput: '30', score: 33 }, { input: '0 0', expectedOutput: '0', score: 33 }]
    },
    {
      id: 21,
      title: '判断与运算',
      type: 'program',
      difficulty: 'easy',
      tags: ['7', '8'],
      content: '读取两个整数，如果两个数都大于0则输出True，否则输出False。',
      testCases: [{ input: '3 5', expectedOutput: 'True', score: 34 }, { input: '3 -1', expectedOutput: 'False', score: 33 }, { input: '-1 -2', expectedOutput: 'False', score: 33 }]
    },
    {
      id: 22,
      title: '判断或运算',
      type: 'program',
      difficulty: 'easy',
      tags: ['7', '8'],
      content: '读取两个整数，如果任意一个大于0则输出True，否则输出False。',
      testCases: [{ input: '3 -1', expectedOutput: 'True', score: 34 }, { input: '-1 5', expectedOutput: 'True', score: 33 }, { input: '-1 -2', expectedOutput: 'False', score: 33 }]
    },
    {
      id: 23,
      title: '判断非运算',
      type: 'program',
      difficulty: 'easy',
      tags: ['7', '8'],
      content: '读取一个整数，如果等于0则输出True，否则输出False。',
      testCases: [{ input: '0', expectedOutput: 'True', score: 34 }, { input: '1', expectedOutput: 'False', score: 33 }, { input: '5', expectedOutput: 'False', score: 33 }]
    },
    {
      id: 24,
      title: '三分法',
      type: 'program',
      difficulty: 'easy',
      tags: ['8', '6'],
      content: '读取一个整数，如果是正数输出"positive"，负数输出"negative"，零输出"zero"。',
      testCases: [{ input: '5', expectedOutput: 'positive', score: 34 }, { input: '-3', expectedOutput: 'negative', score: 33 }, { input: '0', expectedOutput: 'zero', score: 33 }]
    },
    {
      id: 25,
      title: '绝对值',
      type: 'program',
      difficulty: 'easy',
      tags: ['8', '6'],
      content: '读取一个整数，输出它的绝对值。',
      testCases: [{ input: '-5', expectedOutput: '5', score: 34 }, { input: '10', expectedOutput: '10', score: 33 }, { input: '0', expectedOutput: '0', score: 33 }]
    },
    {
      id: 26,
      title: '成绩评级',
      type: 'program',
      difficulty: 'easy',
      tags: ['8', '6'],
      content: '读取一个0-100的整数成绩，大于等于90输出"A"，大于等于80输出"B"，大于等于60输出"C"，否则输出"D"。',
      testCases: [{ input: '85', expectedOutput: 'B', score: 34 }, { input: '45', expectedOutput: 'D', score: 33 }, { input: '92', expectedOutput: 'A', score: 33 }]
    },
    {
      id: 27,
      title: '三个数最大值',
      type: 'program',
      difficulty: 'easy',
      tags: ['8', '6'],
      content: '读取三个整数，输出最大的那个数。',
      testCases: [{ input: '3 5 2', expectedOutput: '5', score: 34 }, { input: '10 3 7', expectedOutput: '10', score: 33 }, { input: '5 5 3', expectedOutput: '5', score: 33 }]
    },
    {
      id: 28,
      title: '打印数字',
      type: 'program',
      difficulty: 'easy',
      tags: ['9'],
      content: '读取一个整数n，输出1到n，每个数字占一行。',
      testCases: [{ input: '5', expectedOutput: '1\n2\n3\n4\n5', score: 34 }, { input: '3', expectedOutput: '1\n2\n3', score: 33 }, { input: '1', expectedOutput: '1', score: 33 }]
    },
    {
      id: 29,
      title: '打印偶数',
      type: 'program',
      difficulty: 'easy',
      tags: ['9', '6'],
      content: '读取一个整数n，输出1到n之间所有能被2整除的数，每个数字占一行。',
      testCases: [{ input: '8', expectedOutput: '2\n4\n6\n8', score: 34 }, { input: '6', expectedOutput: '2\n4\n6', score: 33 }, { input: '2', expectedOutput: '2', score: 33 }]
    },
    {
      id: 30,
      title: '累乘求积',
      type: 'program',
      difficulty: 'easy',
      tags: ['9', '4'],
      content: '读取一个整数n，计算1×2×...×n的值并输出。',
      testCases: [{ input: '5', expectedOutput: '120', score: 34 }, { input: '3', expectedOutput: '6', score: 33 }, { input: '0', expectedOutput: '1', score: 33 }]
    },
    {
      id: 31,
      title: '奇数之和',
      type: 'program',
      difficulty: 'easy',
      tags: ['9', '6'],
      content: '读取一个整数n，计算1到n之间所有奇数的和并输出。',
      testCases: [{ input: '9', expectedOutput: '25', score: 34 }, { input: '10', expectedOutput: '25', score: 33 }, { input: '1', expectedOutput: '1', score: 33 }]
    },
    {
      id: 32,
      title: 'while计数器',
      type: 'program',
      difficulty: 'easy',
      tags: ['10', '4'],
      content: '读取一个整数n，使用while循环输出1到n，每个数字占一行。',
      testCases: [{ input: '4', expectedOutput: '1\n2\n3\n4', score: 34 }, { input: '2', expectedOutput: '1\n2', score: 33 }, { input: '1', expectedOutput: '1', score: 33 }]
    },
    {
      id: 33,
      title: 'while求和',
      type: 'program',
      difficulty: 'easy',
      tags: ['10', '4'],
      content: '读取一个整数n，使用while循环计算1+2+...+n的值并输出。',
      testCases: [{ input: '10', expectedOutput: '55', score: 34 }, { input: '5', expectedOutput: '15', score: 33 }, { input: '1', expectedOutput: '1', score: 33 }]
    },
    {
      id: 34,
      title: '数字位数',
      type: 'program',
      difficulty: 'easy',
      tags: ['10', '6'],
      content: '读取一个正整数，输出它的位数。',
      testCases: [{ input: '12345', expectedOutput: '5', score: 34 }, { input: '7', expectedOutput: '1', score: 33 }, { input: '1000', expectedOutput: '4', score: 33 }]
    },
    {
      id: 35,
      title: '打印三角形',
      type: 'program',
      difficulty: 'medium',
      tags: ['11', '9'],
      content: '读取一个整数n，输出n行的直角三角形，第i行有i个*（无空格）。',
      testCases: [{ input: '4', expectedOutput: '*\n**\n***\n****', score: 34 }, { input: '3', expectedOutput: '*\n**\n***', score: 33 }, { input: '1', expectedOutput: '*', score: 33 }]
    },
    {
      id: 36,
      title: '九九乘法表',
      type: 'program',
      difficulty: 'medium',
      tags: ['11', '9'],
      content: '输出九九乘法表，每行格式"1*1=1"，行与行之间用换行分隔。',
      testCases: [{ input: '', expectedOutput: '1*1=1\n1*2=2 2*2=4\n1*3=3 2*3=6 3*3=9\n1*4=4 2*4=8 3*4=12 4*4=16\n1*5=5 2*5=10 3*5=15 4*5=20 5*5=25\n1*6=6 2*6=12 3*6=18 4*6=24 5*6=30 6*6=36\n1*7=7 2*7=14 3*7=21 4*7=28 5*7=35 6*7=42 7*7=49\n1*8=8 2*8=16 3*8=24 4*8=32 5*8=40 6*8=48 7*8=56 8*8=64\n1*9=9 2*9=18 3*9=27 4*9=36 5*9=45 6*9=54 7*9=63 8*9=72 9*9=81', score: 100 }]
    },
    {
      id: 37,
      title: '倒三角形',
      type: 'program',
      difficulty: 'medium',
      tags: ['11', '9'],
      content: '读取一个整数n，输出n行的倒直角三角形，第i行有n-i+1个*（无空格）。',
      testCases: [{ input: '4', expectedOutput: '****\n***\n**\n*', score: 34 }, { input: '3', expectedOutput: '***\n**\n*', score: 33 }, { input: '1', expectedOutput: '*', score: 33 }]
    },
    {
      id: 38,
      title: '找到第一个偶数',
      type: 'program',
      difficulty: 'easy',
      tags: ['12', '9'],
      content: '读取5个整数，找到第一个偶数并输出，如果没找到则输出"not found"。',
      testCases: [{ input: '1 3 5 6 7', expectedOutput: '6', score: 34 }, { input: '1 3 5 7 9', expectedOutput: 'not found', score: 33 }, { input: '2 4 6 8 10', expectedOutput: '2', score: 33 }]
    },
    {
      id: 39,
      title: '遇到5停止',
      type: 'program',
      difficulty: 'easy',
      tags: ['12', '10'],
      content: '循环读取整数（输入以0结束，不包含0），遇到5时停止，输出遇到5之前所有数的和。',
      testCases: [{ input: '1 2 3 5', expectedOutput: '6', score: 34 }, { input: '10 20 0', expectedOutput: '30', score: 33 }, { input: '5 1 2', expectedOutput: '0', score: 33 }]
    },
    {
      id: 40,
      title: '跳过3的倍数',
      type: 'program',
      difficulty: 'easy',
      tags: ['13', '9'],
      content: '读取一个整数n，输出1到n之间所有不能被3整除的数，每个数字占一行。',
      testCases: [{ input: '7', expectedOutput: '1\n2\n4\n5\n7', score: 34 }, { input: '5', expectedOutput: '1\n2\n4\n5', score: 33 }, { input: '3', expectedOutput: '1\n2', score: 33 }]
    },
    {
      id: 41,
      title: '跳过负数',
      type: 'program',
      difficulty: 'easy',
      tags: ['13', '9'],
      content: '读取5个整数，跳过所有负数，输出剩余正数的和。',
      testCases: [{ input: '1 -2 3 -4 5', expectedOutput: '9', score: 34 }, { input: '-1 -2 -3 4 5', expectedOutput: '9', score: 33 }, { input: '1 2 3 4 5', expectedOutput: '15', score: 33 }]
    },
    {
      id: 42,
      title: '字符串长度',
      type: 'program',
      difficulty: 'easy',
      tags: ['14'],
      content: '读取一个字符串，输出它的长度。',
      testCases: [{ input: 'hello', expectedOutput: '5', score: 34 }, { input: 'python', expectedOutput: '6', score: 33 }, { input: 'a', expectedOutput: '1', score: 33 }]
    },
    {
      id: 43,
      title: '重复输出',
      type: 'program',
      difficulty: 'easy',
      tags: ['14', '22'],
      content: '读取一个字符串和一个整数n，输出字符串重复n次的结果。',
      testCases: [{ input: 'ha 3', expectedOutput: 'hahaha', score: 34 }, { input: 'ab 2', expectedOutput: 'abab', score: 33 }, { input: 'x 5', expectedOutput: 'xxxxx', score: 33 }]
    },
    {
      id: 44,
      title: '首尾字符',
      type: 'program',
      difficulty: 'easy',
      tags: ['15', '14'],
      content: '读取一个字符串，输出它的第一个和最后一个字符（无空格）。',
      testCases: [{ input: 'hello', expectedOutput: 'ho', score: 34 }, { input: 'python', expectedOutput: 'pn', score: 33 }, { input: 'ab', expectedOutput: 'ab', score: 33 }]
    },
    {
      id: 45,
      title: '翻转字符串',
      type: 'program',
      difficulty: 'easy',
      tags: ['15', '14'],
      content: '读取一个字符串，输出它的反转字符串。',
      testCases: [{ input: 'abcd', expectedOutput: 'dcba', score: 34 }, { input: 'hello', expectedOutput: 'olleh', score: 33 }, { input: 'a', expectedOutput: 'a', score: 33 }]
    },
    {
      id: 46,
      title: '创建重复列表',
      type: 'program',
      difficulty: 'easy',
      tags: ['16', '14'],
      content: '读取一个整数n，创建一个包含n个"hello"的列表并输出。',
      testCases: [{ input: '3', expectedOutput: '["hello", "hello", "hello"]', score: 34 }, { input: '1', expectedOutput: '["hello"]', score: 33 }, { input: '5', expectedOutput: '["hello", "hello", "hello", "hello", "hello"]', score: 33 }]
    },
    {
      id: 47,
      title: '列表长度',
      type: 'program',
      difficulty: 'easy',
      tags: ['16'],
      content: '读取一行用空格分隔的若干整数，输出列表的长度。',
      testCases: [{ input: '1 2 3 4 5', expectedOutput: '5', score: 34 }, { input: '10 20', expectedOutput: '2', score: 33 }, { input: '42', expectedOutput: '1', score: 33 }]
    },
    {
      id: 48,
      title: '列表最大值',
      type: 'program',
      difficulty: 'easy',
      tags: ['17'],
      content: '读取一行用空格分隔的5个整数，输出最大的那个数。',
      testCases: [{ input: '3 8 2 9 5', expectedOutput: '9', score: 34 }, { input: '1 2 3 4 5', expectedOutput: '5', score: 33 }, { input: '5 4 3 2 1', expectedOutput: '5', score: 33 }]
    },
    {
      id: 49,
      title: '列表最小值',
      type: 'program',
      difficulty: 'easy',
      tags: ['17'],
      content: '读取一行用空格分隔的5个整数，输出最小的那个数。',
      testCases: [{ input: '3 8 2 9 5', expectedOutput: '2', score: 34 }, { input: '1 2 3 4 5', expectedOutput: '1', score: 33 }, { input: '5 4 3 2 1', expectedOutput: '1', score: 33 }]
    },
    {
      id: 50,
      title: '移除列表元素',
      type: 'program',
      difficulty: 'easy',
      tags: ['18'],
      content: '创建一个列表[1, 2, 3, 4, 3, 5]，移除第一个3，输出新列表。',
      testCases: [{ input: '', expectedOutput: '[1, 2, 4, 3, 5]', score: 34 }, { input: '', expectedOutput: '[1, 2, 4, 3, 5]', score: 33 }, { input: '', expectedOutput: '[1, 2, 4, 3, 5]', score: 33 }]
    },
    {
      id: 51,
      title: '列表排序',
      type: 'program',
      difficulty: 'easy',
      tags: ['18', '16'],
      content: '读取一行用空格分隔的5个整数，排序后输出（从小到大）。',
      testCases: [{ input: '5 3 1 4 2', expectedOutput: '[1, 2, 3, 4, 5]', score: 34 }, { input: '3 3 3 2 1', expectedOutput: '[1, 2, 3, 3, 3]', score: 33 }, { input: '1 2 3 4 5', expectedOutput: '[1, 2, 3, 4, 5]', score: 33 }]
    },
    {
      id: 52,
      title: '访问二维列表',
      type: 'program',
      difficulty: 'easy',
      tags: ['19', '16'],
      content: '创建一个2x2列表[[10,20],[30,40]]，输出第1行（索引0）第2列（索引1）的元素。',
      testCases: [{ input: '', expectedOutput: '20', score: 34 }, { input: '', expectedOutput: '20', score: 33 }, { input: '', expectedOutput: '20', score: 33 }]
    },
    {
      id: 53,
      title: '二维列表行和',
      type: 'program',
      difficulty: 'easy',
      tags: ['19', '16', '9'],
      content: '读取四个整数a b c d，创建一个2x2列表[[a,b],[c,d]]，输出第一行元素的和。',
      testCases: [{ input: '1 2 3 4', expectedOutput: '3', score: 34 }, { input: '5 6 7 8', expectedOutput: '11', score: 33 }, { input: '0 0 1 1', expectedOutput: '0', score: 33 }]
    },
    {
      id: 54,
      title: '统计字符',
      type: 'program',
      difficulty: 'easy',
      tags: ['20', '14'],
      content: '读取一个只包含小写字母的字符串，统计每个字符出现的次数，输出字典。',
      testCases: [{ input: 'abca', expectedOutput: '{"a": 2, "b": 1, "c": 1}', score: 34 }, { input: 'aaa', expectedOutput: '{"a": 3}', score: 33 }, { input: 'abc', expectedOutput: '{"a": 1, "b": 1, "c": 1}', score: 33 }]
    },
    {
      id: 55,
      title: '合并字典',
      type: 'program',
      difficulty: 'easy',
      tags: ['20', '14'],
      content: '读取两个字符串，用空格分隔，输出两个字符串长度组成的字典{"first":长度1,"second":长度2}。',
      testCases: [{ input: 'hello world', expectedOutput: '{"first": 5, "second": 5}', score: 34 }, { input: 'ab cd', expectedOutput: '{"first": 2, "second": 2}', score: 33 }, { input: 'python java', expectedOutput: '{"first": 6, "second": 4}', score: 33 }]
    },
    {
      id: 56,
      title: '集合合并',
      type: 'program',
      difficulty: 'easy',
      tags: ['21', '14'],
      content: '读取两行字符串，输出它们字符集合的并集（去重后按字母顺序）。',
      testCases: [{ input: 'abc\ndef', expectedOutput: '["a", "b", "c", "d", "e", "f"]', score: 34 }, { input: 'aa\nbb', expectedOutput: '["a", "b"]', score: 33 }, { input: 'xyz\nxyz', expectedOutput: '["x", "y", "z"]', score: 33 }]
    },
    {
      id: 57,
      title: '集合交集',
      type: 'program',
      difficulty: 'easy',
      tags: ['21', '14'],
      content: '读取两行字符串，输出它们字符集合的交集（去重后按字母顺序）。',
      testCases: [{ input: 'abc\nbcd', expectedOutput: '["b", "c"]', score: 34 }, { input: 'aaa\nabc', expectedOutput: '["a"]', score: 33 }, { input: 'xyz\nabc', expectedOutput: '[]', score: 33 }]
    },
    {
      id: 58,
      title: '整数转字符串',
      type: 'program',
      difficulty: 'easy',
      tags: ['22', '14'],
      content: '读取一个整数，转换为字符串后与"+"连接并输出。',
      testCases: [{ input: '123', expectedOutput: '123+', score: 34 }, { input: '0', expectedOutput: '0+', score: 33 }, { input: '99', expectedOutput: '99+', score: 33 }]
    },
    {
      id: 59,
      title: '字符串转列表',
      type: 'program',
      difficulty: 'easy',
      tags: ['22', '16'],
      content: '读取一个字符串，转换为字符列表并输出。',
      testCases: [{ input: 'hello', expectedOutput: '["h", "e", "l", "l", "o"]', score: 34 }, { input: 'ab', expectedOutput: '["a", "b"]', score: 33 }, { input: 'a', expectedOutput: '["a"]', score: 33 }]
    },
    {
      id: 60,
      title: '定义乘法函数',
      type: 'program',
      difficulty: 'easy',
      tags: ['23'],
      content: '定义一个函数mul(a, b)返回a*b的值，读取两个整数，调用该函数并输出结果。',
      testCases: [{ input: '3 4', expectedOutput: '12', score: 34 }, { input: '5 6', expectedOutput: '30', score: 33 }, { input: '0 100', expectedOutput: '0', score: 33 }]
    },
    {
      id: 61,
      title: '定义绝对值函数',
      type: 'program',
      difficulty: 'easy',
      tags: ['23', '8'],
      content: '定义一个函数my_abs(n)返回n的绝对值，读取一个整数，调用该函数并输出结果。',
      testCases: [{ input: '-5', expectedOutput: '5', score: 34 }, { input: '10', expectedOutput: '10', score: 33 }, { input: '0', expectedOutput: '0', score: 33 }]
    },
    {
      id: 62,
      title: '偶数列表',
      type: 'program',
      difficulty: 'easy',
      tags: ['24', '9'],
      content: '读取一个整数n，使用列表推导式创建1到n所有偶数的列表并输出。',
      testCases: [{ input: '8', expectedOutput: '[2, 4, 6, 8]', score: 34 }, { input: '5', expectedOutput: '[2, 4]', score: 33 }, { input: '2', expectedOutput: '[2]', score: 33 }]
    },
    {
      id: 63,
      title: '平方列表',
      type: 'program',
      difficulty: 'easy',
      tags: ['24', '9'],
      content: '读取一个整数n，使用列表推导式创建[1的平方, 2的平方, ..., n的平方]并输出。',
      testCases: [{ input: '5', expectedOutput: '[1, 4, 9, 16, 25]', score: 34 }, { input: '3', expectedOutput: '[1, 4, 9]', score: 33 }, { input: '1', expectedOutput: '[1]', score: 33 }]
    },
    {
      id: 64,
      title: '筛选大于平均',
      type: 'program',
      difficulty: 'easy',
      tags: ['24', '17'],
      content: '读取一行用空格分隔的5个整数，创建只包含大于平均值的列表并输出。',
      testCases: [{ input: '1 2 3 4 10', expectedOutput: '[4, 10]', score: 34 }, { input: '1 2 3 4 5', expectedOutput: '[4, 5]', score: 33 }, { input: '5 5 5 5 5', expectedOutput: '[]', score: 33 }]
    },
    {
      id: 65,
      title: '随机整数',
      type: 'program',
      difficulty: 'easy',
      tags: ['25'],
      content: '使用random.randint(1, 10)生成一个随机整数并输出。',
      testCases: [{ input: '', expectedOutput: '__RANDOM_INT__1-10__', score: 100 }]
    },
    {
      id: 66,
      title: '随机列表元素',
      type: 'program',
      difficulty: 'easy',
      tags: ['25', '18'],
      content: '创建一个列表[10, 20, 30, 40, 50]，使用random.choice()随机选择一个元素并输出。',
      testCases: [{ input: '', expectedOutput: '__RANDOM_CHOICE__[10,20,30,40,50]__', score: 100 }]
    },
    {
      id: 67,
      title: '随机抽牌',
      type: 'program',
      difficulty: 'easy',
      tags: ['25', '18'],
      content: '创建一个列表["红桃A","黑桃A","方块A","梅花A"]，使用random.choice()随机选一张牌并输出。',
      testCases: [{ input: '', expectedOutput: '__RANDOM_CHOICE__["红桃A","黑桃A","方块A","梅花A"]__', score: 100 }]
    },
    {
      id: 68,
      title: '判断质数',
      type: 'program',
      difficulty: 'medium',
      tags: ['8', '9'],
      content: '读取一个整数n，判断它是否是质数（只能被1和自身整除），是输出"prime"，否则输出"not prime"。',
      testCases: [{ input: '7', expectedOutput: 'prime', score: 34 }, { input: '10', expectedOutput: 'not prime', score: 33 }, { input: '2', expectedOutput: 'prime', score: 33 }]
    },
    {
      id: 69,
      title: '判断闰年',
      type: 'program',
      difficulty: 'medium',
      tags: ['8', '6'],
      content: '读取一个年份，判断它是否是闰年（能被4整除但不能被100整除，或者能被400整除），是输出"yes"，否则输出"no"。',
      testCases: [{ input: '2024', expectedOutput: 'yes', score: 34 }, { input: '1900', expectedOutput: 'no', score: 33 }, { input: '2000', expectedOutput: 'yes', score: 33 }]
    },
    {
      id: 70,
      title: '提取数字',
      type: 'program',
      difficulty: 'medium',
      tags: ['14', '9'],
      content: '读取一个只包含字母和数字的字符串，将其中的所有数字组成一个新字符串并输出。',
      testCases: [{ input: 'a1b2c3', expectedOutput: '123', score: 34 }, { input: 'abc', expectedOutput: '', score: 33 }, { input: '1a2b3c4', expectedOutput: '1234', score: 33 }]
    },
    {
      id: 71,
      title: '列表去重',
      type: 'program',
      difficulty: 'medium',
      tags: ['18', '16'],
      content: '读取一行用空格分隔的若干整数，输出去重后的列表（保留首次出现的顺序）。',
      testCases: [{ input: '1 2 2 3 1 4', expectedOutput: '[1, 2, 3, 4]', score: 34 }, { input: '1 1 1 1', expectedOutput: '[1]', score: 33 }, { input: '3 2 1', expectedOutput: '[3, 2, 1]', score: 33 }]
    },
    {
      id: 72,
      title: '斐波那契数列',
      type: 'program',
      difficulty: 'medium',
      tags: ['9', '16'],
      content: '读取一个整数n，输出斐波那契数列的前n项（每项是前两项之和，前两项为1,1）。',
      testCases: [{ input: '6', expectedOutput: '[1, 1, 2, 3, 5, 8]', score: 34 }, { input: '3', expectedOutput: '[1, 1, 2]', score: 33 }, { input: '1', expectedOutput: '[1]', score: 33 }]
    },
    {
      id: 73,
      title: '统计出现次数',
      type: 'program',
      difficulty: 'medium',
      tags: ['20', '9'],
      content: '读取一行字符串，统计每个字符出现的次数，输出字典。',
      testCases: [{ input: 'abracadabra', expectedOutput: '{"a": 5, "b": 2, "r": 2, "c": 1, "d": 1}', score: 34 }, { input: 'aaa', expectedOutput: '{"a": 3}', score: 33 }, { input: 'abc', expectedOutput: '{"a": 1, "b": 1, "c": 1}', score: 33 }]
    },
    {
      id: 74,
      title: '定义阶乘函数',
      type: 'program',
      difficulty: 'medium',
      tags: ['23', '9'],
      content: '定义一个函数fact(n)返回n的阶乘，读取一个非负整数，调用该函数并输出结果。',
      testCases: [{ input: '5', expectedOutput: '120', score: 34 }, { input: '0', expectedOutput: '1', score: 33 }, { input: '3', expectedOutput: '6', score: 33 }]
    },
    {
      id: 75,
      title: '列表转字典',
      type: 'program',
      difficulty: 'medium',
      tags: ['20', '16'],
      content: '读取一行用空格分隔的字符串作为keys，创建一个字典{每个key: 其索引}并输出。',
      testCases: [{ input: 'a b c', expectedOutput: '{"a": 0, "b": 1, "c": 2}', score: 34 }, { input: 'x', expectedOutput: '{"x": 0}', score: 33 }, { input: 'one two', expectedOutput: '{"one": 0, "two": 1}', score: 33 }]
    },
    {
      id: 76,
      title: '周期字符串',
      type: 'program',
      difficulty: 'medium',
      tags: ['14', '22'],
      content: '读取一个字符串s和一个整数n，输出s重复n次的结果。',
      testCases: [{ input: 'abc 3', expectedOutput: 'abcabcabc', score: 34 }, { input: 'x 5', expectedOutput: 'xxxxx', score: 33 }, { input: 'ab 2', expectedOutput: 'abab', score: 33 }]
    },
    {
      id: 77,
      title: '回文数判断',
      type: 'program',
      difficulty: 'medium',
      tags: ['15', '8'],
      content: '读取一个整数，判断它是否是回文数（正读和反读相同），是输出"yes"，否则输出"no"。',
      testCases: [{ input: '121', expectedOutput: 'yes', score: 34 }, { input: '123', expectedOutput: 'no', score: 33 }, { input: '1', expectedOutput: 'yes', score: 33 }]
    },
    {
      id: 78,
      title: '找出完数',
      type: 'program',
      difficulty: 'medium',
      tags: ['9', '8'],
      content: '读取一个整数n，找出1到n之间所有的完数（等于因子之和的数，如6=1+2+3），输出列表。',
      testCases: [{ input: '30', expectedOutput: '[6, 28]', score: 34 }, { input: '10', expectedOutput: '[6]', score: 33 }, { input: '5', expectedOutput: '[]', score: 33 }]
    },
    {
      id: 79,
      title: '条件列表推导',
      type: 'program',
      difficulty: 'medium',
      tags: ['24', '17'],
      content: '读取一行用空格分隔的5个整数，使用列表推导式筛选出大于平均值的数并输出。',
      testCases: [{ input: '1 2 3 4 10', expectedOutput: '[4, 10]', score: 34 }, { input: '1 2 3 4 5', expectedOutput: '[4, 5]', score: 33 }, { input: '1 2 3 4 20', expectedOutput: '[4, 20]', score: 33 }]
    },
    {
      id: 80,
      title: '返回多个值',
      type: 'program',
      difficulty: 'medium',
      tags: ['23', '8'],
      content: '定义一个函数swap(a, b)返回(b, a)，读取两个整数，调用该函数并输出两个返回值（用空格分隔）。',
      testCases: [{ input: '3 5', expectedOutput: '5 3', score: 34 }, { input: '1 2', expectedOutput: '2 1', score: 33 }, { input: '10 10', expectedOutput: '10 10', score: 33 }]
    },
    {
      id: 81,
      title: '共同元素',
      type: 'program',
      difficulty: 'medium',
      tags: ['21', '14'],
      content: '读取两行字符串，输出它们字符集合的交集（去重后按字母顺序）。',
      testCases: [{ input: 'abc\nbcd', expectedOutput: '["b", "c"]', score: 34 }, { input: 'aaa\nabc', expectedOutput: '["a"]', score: 33 }, { input: 'xyz\nabc', expectedOutput: '[]', score: 33 }]
    },
    {
      id: 82,
      title: '字符ASCII码',
      type: 'program',
      difficulty: 'medium',
      tags: ['14', '22'],
      content: '读取一个字符，输出它的ASCII码值。',
      testCases: [{ input: 'A', expectedOutput: '65', score: 34 }, { input: 'a', expectedOutput: '97', score: 33 }, { input: '0', expectedOutput: '48', score: 33 }]
    },
    {
      id: 83,
      title: '跳过5的倍数',
      type: 'program',
      difficulty: 'medium',
      tags: ['13', '9', '12'],
      content: '读取一个整数n，输出1到n之间所有不能被5整除的数（每个数字占一行），遇到10停止。',
      testCases: [{ input: '15', expectedOutput: '1\n2\n3\n4\n6\n7\n8\n9', score: 34 }, { input: '5', expectedOutput: '1\n2\n3\n4', score: 33 }, { input: '3', expectedOutput: '1\n2\n3', score: 33 }]
    },
    {
      id: 84,
      title: '矩阵转置',
      type: 'program',
      difficulty: 'medium',
      tags: ['19', '16', '9'],
      content: '创建一个2x3列表[[1,2,3],[4,5,6]]，输出它的转置矩阵（3x2列表）。',
      testCases: [{ input: '', expectedOutput: '[[1, 4], [2, 5], [3, 6]]', score: 34 }, { input: '', expectedOutput: '[[1, 4], [2, 5], [3, 6]]', score: 33 }, { input: '', expectedOutput: '[[1, 4], [2, 5], [3, 6]]', score: 33 }]
    },
    {
      id: 85,
      title: '字典值求和',
      type: 'program',
      difficulty: 'medium',
      tags: ['20', '9'],
      content: '读取三个整数，创建一个字典{"a":第一个,"b":第二个,"c":第三个}，输出所有值的和。',
      testCases: [{ input: '1 2 3', expectedOutput: '6', score: 34 }, { input: '10 20 30', expectedOutput: '60', score: 33 }, { input: '5 5 5', expectedOutput: '15', score: 33 }]
    },
    {
      id: 86,
      title: '函数返回列表',
      type: 'program',
      difficulty: 'medium',
      tags: ['23', '16'],
      content: '定义一个函数range_list(n)返回[1,2,...,n]，读取一个整数，调用该函数并输出结果。',
      testCases: [{ input: '5', expectedOutput: '[1, 2, 3, 4, 5]', score: 34 }, { input: '3', expectedOutput: '[1, 2, 3]', score: 33 }, { input: '1', expectedOutput: '[1]', score: 33 }]
    },
    {
      id: 87,
      title: '随机数累加',
      type: 'program',
      difficulty: 'medium',
      tags: ['25', '9'],
      content: '使用random.randint(1, 100)生成5个随机整数，输出它们的和。',
      testCases: [{ input: '', expectedOutput: '__RANDOM_SUM__5-500__', score: 100 }]
    },
    {
      id: 88,
      title: '冒泡排序',
      type: 'program',
      difficulty: 'hard',
      tags: ['9', '16', '18'],
      content: '读取一行用空格分隔的5个整数，使用冒泡排序算法将其从小到大排序后输出。',
      testCases: [{ input: '5 3 8 1 2', expectedOutput: '[1, 2, 3, 5, 8]', score: 34 }, { input: '9 8 7 6 5', expectedOutput: '[5, 6, 7, 8, 9]', score: 33 }, { input: '1 2 3 4 5', expectedOutput: '[1, 2, 3, 4, 5]', score: 33 }]
    },
    {
      id: 89,
      title: '选择排序',
      type: 'program',
      difficulty: 'hard',
      tags: ['9', '16', '18'],
      content: '读取一行用空格分隔的5个整数，使用选择排序算法将其从小到大排序后输出。',
      testCases: [{ input: '64 25 12 22 11', expectedOutput: '[11, 12, 22, 25, 64]', score: 34 }, { input: '5 4 3 2 1', expectedOutput: '[1, 2, 3, 4, 5]', score: 33 }, { input: '3 1 4 1 5', expectedOutput: '[1, 1, 3, 4, 5]', score: 33 }]
    },
    {
      id: 90,
      title: '二分查找',
      type: 'program',
      difficulty: 'hard',
      tags: ['9', '6', '8'],
      content: '读取一行用空格分隔的5个升序整数和一个目标值，输出目标值的索引（从0开始），找不到输出-1。',
      testCases: [{ input: '1 3 5 7 9 5', expectedOutput: '2', score: 34 }, { input: '1 3 5 7 9 6', expectedOutput: '-1', score: 33 }, { input: '2 4 6 8 10 2', expectedOutput: '0', score: 33 }]
    },
    {
      id: 91,
      title: '变位词判断',
      type: 'program',
      difficulty: 'hard',
      tags: ['20', '14', '9'],
      content: '读取两个字符串，判断它们是否是变位词（包含相同字符但顺序不同），是输出"yes"，否则输出"no"。',
      testCases: [{ input: 'listen silent', expectedOutput: 'yes', score: 34 }, { input: 'hello world', expectedOutput: 'no', score: 33 }, { input: 'aab baa', expectedOutput: 'yes', score: 33 }]
    },
    {
      id: 92,
      title: '最大公约数',
      type: 'program',
      difficulty: 'hard',
      tags: ['9', '10', '8'],
      content: '读取两个正整数，使用辗转相除法（欧几里得算法）计算并输出它们的最大公约数。',
      testCases: [{ input: '48 18', expectedOutput: '6', score: 34 }, { input: '100 25', expectedOutput: '25', score: 33 }, { input: '17 13', expectedOutput: '1', score: 33 }]
    },
    {
      id: 93,
      title: '最小公倍数',
      type: 'program',
      difficulty: 'hard',
      tags: ['9', '8', '22'],
      content: '读取两个正整数，计算并输出它们的最小公倍数。',
      testCases: [{ input: '4 6', expectedOutput: '12', score: 34 }, { input: '5 7', expectedOutput: '35', score: 33 }, { input: '3 9', expectedOutput: '9', score: 33 }]
    },
    {
      id: 94,
      title: '统计单词',
      type: 'program',
      difficulty: 'hard',
      tags: ['20', '9', '14'],
      content: '读取一行由空格分隔的单词，统计每个单词出现的次数，输出字典（按单词首字母顺序）。',
      testCases: [{ input: 'apple banana apple orange banana apple', expectedOutput: '{"apple": 3, "banana": 2, "orange": 1}', score: 34 }, { input: 'one one one', expectedOutput: '{"one": 3}', score: 33 }, { input: 'a b c a b', expectedOutput: '{"a": 2, "b": 2, "c": 1}', score: 33 }]
    },
    {
      id: 95,
      title: '购物找零',
      type: 'program',
      difficulty: 'hard',
      tags: ['8', '6', '22'],
      content: '模拟收银找零。读取两个整数price和money，分别表示商品价格和顾客支付的金额，输出需要找零的金额。如果钱不够输出"not enough"。',
      testCases: [{ input: '23 50', expectedOutput: '27', score: 34 }, { input: '50 50', expectedOutput: '0', score: 33 }, { input: '100 50', expectedOutput: 'not enough', score: 33 }]
    },
    {
      id: 96,
      title: '质数判断升级',
      type: 'program',
      difficulty: 'hard',
      tags: ['9', '8', '10'],
      content: '读取一个整数n，判断它是否是质数，是输出"prime"，否则输出"not prime"（需要遍历到sqrt(n)）。',
      testCases: [{ input: '17', expectedOutput: 'prime', score: 34 }, { input: '100', expectedOutput: 'not prime', score: 33 }, { input: '1', expectedOutput: 'not prime', score: 33 }]
    },
    {
      id: 97,
      title: '杨辉三角',
      type: 'program',
      difficulty: 'hard',
      tags: ['19', '16', '9'],
      content: '读取一个整数n，输出杨辉三角的前n行，每行用一个列表表示。',
      testCases: [{ input: '5', expectedOutput: '[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]', score: 34 }, { input: '3', expectedOutput: '[[1], [1, 1], [1, 2, 1]]', score: 33 }, { input: '1', expectedOutput: '[[1]]', score: 33 }]
    },
    {
      id: 98,
      title: '密码强度',
      type: 'program',
      difficulty: 'hard',
      tags: ['14', '9', '8'],
      content: '读取一个密码字符串，判断其强度：长度不足8输出"weak"，长度>=8但不含数字输出"medium"，长度>=8且含数字和字母输出"strong"。',
      testCases: [{ input: 'password', expectedOutput: 'medium', score: 34 }, { input: 'abcdefgh', expectedOutput: 'medium', score: 33 }, { input: 'abcdefg', expectedOutput: 'weak', score: 33 }]
    },
    {
      id: 99,
      title: '验证码生成',
      type: 'program',
      difficulty: 'hard',
      tags: ['25', '14', '18'],
      content: '使用random.sample()从字符串"ABCDEFGHJKLMNPQRSTUVWXYZ23456789"中随机选取4个字符组成验证码并输出。',
      testCases: [{ input: '', expectedOutput: '__RANDOM_SAMPLE__ABCDEFGHJKLMNPQRSTUVWXYZ23456789__4__', score: 100 }]
    },
    {
      id: 100,
      title: '成绩统计',
      type: 'program',
      difficulty: 'hard',
      tags: ['9', '17', '22'],
      content: '读取一行用空格分隔的5个0-100的整数成绩，输出平均分（保留1位小数）和最高分，用空格分隔。',
      testCases: [{ input: '85 92 78 96 89', expectedOutput: '88.0 96', score: 34 }, { input: '100 100 100 100 100', expectedOutput: '100.0 100', score: 33 }, { input: '60 70 80 90 100', expectedOutput: '80.0 100', score: 33 }]
    },
    {
      id: 101,
      title: '凯撒密码',
      type: 'program',
      difficulty: 'hard',
      tags: ['14', '9', '22'],
      content: '读取一个只包含小写字母的字符串和一个整数n，将每个字符向后移动n位（z之后回到a），输出加密后的字符串。',
      testCases: [{ input: 'abc 2', expectedOutput: 'cde', score: 34 }, { input: 'xyz 3', expectedOutput: 'abc', score: 33 }, { input: 'a 1', expectedOutput: 'b', score: 33 }]
    },
    {
      id: 102,
      title: '斐波那契求和',
      type: 'program',
      difficulty: 'hard',
      tags: ['9', '10', '4'],
      content: '读取一个整数n，计算斐波那契数列前n项的和并输出（每项是前两项之和，前两项为1,1）。',
      testCases: [{ input: '6', expectedOutput: '20', score: 34 }, { input: '3', expectedOutput: '4', score: 33 }, { input: '10', expectedOutput: '143', score: 33 }]
    },
    {
      id: 103,
      title: '数字提取计算',
      type: 'program',
      difficulty: 'hard',
      tags: ['14', '9', '22'],
      content: '读取一行包含数字和字母的字符串，提取所有连续数字组成一个整数，相加后输出结果。',
      testCases: [{ input: 'a123b456c', expectedOutput: '579', score: 34 }, { input: 'abc123', expectedOutput: '123', score: 33 }, { input: '12abc34def56', expectedOutput: '102', score: 33 }]
    },
    {
      id: 104,
      title: '掷骰子模拟',
      type: 'program',
      difficulty: 'hard',
      tags: ['25', '9'],
      content: '使用random.randint(1, 6)模拟掷两个骰子，输出它们的和。',
      testCases: [{ input: '', expectedOutput: '__RANDOM_SUM__2-12__', score: 100 }]
    },
    {
      id: 105,
      title: '三角形判断',
      type: 'program',
      difficulty: 'hard',
      tags: ['8', '6', '9'],
      content: '读取三个整数作为三角形的三边长度，判断能否构成三角形（任意两边之和大于第三边），能输出"yes"，否则输出"no"。',
      testCases: [{ input: '3 4 5', expectedOutput: 'yes', score: 34 }, { input: '1 2 3', expectedOutput: 'no', score: 33 }, { input: '5 5 5', expectedOutput: 'yes', score: 33 }]
    },
    {
      id: 106,
      title: '数列规律',
      type: 'program',
      difficulty: 'hard',
      tags: ['9', '10', '4'],
      content: '读取一个整数n，推算并输出数列的第n项：1, 2, 4, 7, 11, 16...（相邻两项之差依次增加1）。',
      testCases: [{ input: '6', expectedOutput: '16', score: 34 }, { input: '1', expectedOutput: '1', score: 33 }, { input: '10', expectedOutput: '46', score: 33 }]
    },
    {
      id: 107,
      title: '进制转换',
      type: 'program',
      difficulty: 'hard',
      tags: ['14', '9', '22'],
      content: '读取一个二进制字符串（只含0和1），将其转换为十进制整数并输出。',
      testCases: [{ input: '1010', expectedOutput: '10', score: 34 }, { input: '1111', expectedOutput: '15', score: 33 }, { input: '100', expectedOutput: '4', score: 33 }]
    },
    {
      id: 108,
      title: 'print输出',
      type: 'choice',
      difficulty: 'easy',
      tags: ['2'],
      content: '下面哪个代码可以正确输出Hello Python？',
      choices: [{ content: 'print(Hello Python)', isCorrect: false }, { content: 'print Hello Python', isCorrect: false }, { content: 'print函数加括号包裹字符串', isCorrect: true }, { content: 'echo Hello Python', isCorrect: false }]
    },
    {
      id: 109,
      title: 'input输入',
      type: 'choice',
      difficulty: 'easy',
      tags: ['3'],
      content: '读取用户输入的整数并保存到变量n，正确的代码是？',
      choices: [{ content: 'n = input()', isCorrect: false }, { content: 'n = int(input())', isCorrect: true }, { content: 'input(n)', isCorrect: false }, { content: 'n = input', isCorrect: false }]
    },
    {
      id: 110,
      title: '变量赋值',
      type: 'choice',
      difficulty: 'easy',
      tags: ['4'],
      content: '执行 a = 5 后，再执行 a = a + 3，a的最终值是多少？',
      choices: [{ content: '5', isCorrect: false }, { content: '8', isCorrect: true }, { content: '3', isCorrect: false }, { content: 'a + 3', isCorrect: false }]
    },
    {
      id: 111,
      title: '布尔值',
      type: 'choice',
      difficulty: 'easy',
      tags: ['5'],
      content: '下面哪个是Python中表示真的布尔值？',
      choices: [{ content: 'true', isCorrect: false }, { content: 'True', isCorrect: true }, { content: 'FALSE', isCorrect: false }, { content: '真', isCorrect: false }]
    },
    {
      id: 112,
      title: '比较运算',
      type: 'choice',
      difficulty: 'easy',
      tags: ['6'],
      content: '表达式 10 > 5 的结果是？',
      choices: [{ content: 'True', isCorrect: true }, { content: 'False', isCorrect: false }, { content: '1', isCorrect: false }, { content: '0', isCorrect: false }]
    },
    {
      id: 113,
      title: '等于判断',
      type: 'choice',
      difficulty: 'easy',
      tags: ['6'],
      content: '判断两个值是否相等，应该使用哪个运算符？',
      choices: [{ content: '=', isCorrect: false }, { content: '==', isCorrect: true }, { content: '===', isCorrect: false }, { content: '!=', isCorrect: false }]
    },
    {
      id: 114,
      title: 'and运算',
      type: 'choice',
      difficulty: 'easy',
      tags: ['7'],
      content: '表达式 True and False 的结果是？',
      choices: [{ content: 'True', isCorrect: false }, { content: 'False', isCorrect: true }, { content: 'and', isCorrect: false }, { content: '0', isCorrect: false }]
    },
    {
      id: 115,
      title: 'or运算',
      type: 'choice',
      difficulty: 'easy',
      tags: ['7'],
      content: '表达式 False or True 的结果是？',
      choices: [{ content: 'False', isCorrect: false }, { content: 'True', isCorrect: true }, { content: 'or', isCorrect: false }, { content: '1', isCorrect: false }]
    },
    {
      id: 116,
      title: 'not运算',
      type: 'choice',
      difficulty: 'easy',
      tags: ['7'],
      content: '表达式 not True 的结果是？',
      choices: [{ content: 'True', isCorrect: false }, { content: 'False', isCorrect: true }, { content: 'None', isCorrect: false }, { content: 'not', isCorrect: false }]
    },
    {
      id: 117,
      title: 'if单分支',
      type: 'choice',
      difficulty: 'easy',
      tags: ['8'],
      content: '以下哪个是正确的if语句语法？',
      choices: [{ content: 'if x > 0: print(x)', isCorrect: false }, { content: 'if x > 0换行缩进print(x)', isCorrect: true }, { content: 'if x > 0 then print(x)', isCorrect: false }, { content: 'if (x > 0) print(x)', isCorrect: false }]
    },
    {
      id: 118,
      title: 'if多分支',
      type: 'choice',
      difficulty: 'easy',
      tags: ['8'],
      content: '要判断x分别等于1、2、其他三种情况，应该使用？',
      choices: [{ content: 'if elif else', isCorrect: true }, { content: 'if if else', isCorrect: false }, { content: 'switch case', isCorrect: false }, { content: 'if else if', isCorrect: false }]
    },
    {
      id: 119,
      title: 'for循环',
      type: 'choice',
      difficulty: 'easy',
      tags: ['9'],
      content: '要输出1到5，正确的方法是？',
      choices: [{ content: 'for i in range(1, 5)', isCorrect: false }, { content: 'for i in range(1, 6)', isCorrect: true }, { content: 'for i in range(5)', isCorrect: false }, { content: 'for 1 to 5', isCorrect: false }]
    },
    {
      id: 120,
      title: 'range函数',
      type: 'choice',
      difficulty: 'easy',
      tags: ['9'],
      content: 'range(1, 10, 2)会生成什么序列？',
      choices: [{ content: '1到9的整数', isCorrect: false }, { content: '1, 3, 5, 7, 9', isCorrect: true }, { content: '2, 4, 6, 8, 10', isCorrect: false }, { content: '1到10的整数', isCorrect: false }]
    },
    {
      id: 121,
      title: 'while循环',
      type: 'choice',
      difficulty: 'easy',
      tags: ['10'],
      content: '以下哪个是while循环的正确格式？',
      choices: [{ content: 'while i < 10换行缩进执行代码', isCorrect: true }, { content: 'while i < 10', isCorrect: false }, { content: 'while (i < 10) { }', isCorrect: false }, { content: 'loop while i < 10', isCorrect: false }]
    },
    {
      id: 122,
      title: 'while计数',
      type: 'choice',
      difficulty: 'easy',
      tags: ['10'],
      content: '以下代码会输出什么？\n```python\ni = 0\nwhile i < 3:\n    print(i)\n    i += 1\n```',
      choices: [{ content: '1 2 3', isCorrect: false }, { content: '0 1 2', isCorrect: true }, { content: '0 1 2 3', isCorrect: false }, { content: '1 2', isCorrect: false }]
    },
    {
      id: 123,
      title: 'break语句',
      type: 'choice',
      difficulty: 'easy',
      tags: ['12'],
      content: '在循环中，break语句的作用是什么？',
      choices: [{ content: '跳过本次循环，继续下一次', isCorrect: false }, { content: '结束整个循环', isCorrect: true }, { content: '暂停程序', isCorrect: false }, { content: '退出程序', isCorrect: false }]
    },
    {
      id: 124,
      title: 'continue语句',
      type: 'choice',
      difficulty: 'easy',
      tags: ['13'],
      content: '在循环中，continue语句的作用是什么？',
      choices: [{ content: '结束整个循环', isCorrect: false }, { content: '跳过本次循环，继续下一次', isCorrect: true }, { content: '暂停循环', isCorrect: false }, { content: '重新开始循环', isCorrect: false }]
    },
    {
      id: 125,
      title: '字符串定义',
      type: 'choice',
      difficulty: 'easy',
      tags: ['14'],
      content: '下面哪个是正确的字符串定义方式？',
      choices: [{ content: '双引号或单引号包裹', isCorrect: true }, { content: '直接写Hello', isCorrect: false }, { content: '方括号包裹', isCorrect: false }, { content: '圆括号包裹', isCorrect: false }]
    },
    {
      id: 126,
      title: '字符串连接',
      type: 'choice',
      difficulty: 'easy',
      tags: ['14'],
      content: '在Python中，两个字符串s1和s2怎么连接？',
      choices: [{ content: 's1 + s2', isCorrect: true }, { content: 's1 & s2', isCorrect: false }, { content: 's1 . s2', isCorrect: false }, { content: 's1 , s2', isCorrect: false }]
    },
    {
      id: 127,
      title: '字符串切片',
      type: 'choice',
      difficulty: 'easy',
      tags: ['15'],
      content: 's = Python，s[1:4]的结果是？',
      choices: [{ content: 'Pyt', isCorrect: false }, { content: 'yth', isCorrect: true }, { content: 'ytho', isCorrect: false }, { content: 'thon', isCorrect: false }]
    },
    {
      id: 128,
      title: '列表创建',
      type: 'choice',
      difficulty: 'easy',
      tags: ['16'],
      content: '创建一个包含数字1, 2, 3的列表，正确的方法是？',
      choices: [{ content: '[1, 2, 3]', isCorrect: true }, { content: '{1, 2, 3}', isCorrect: false }, { content: '(1, 2, 3)', isCorrect: false }, { content: '<1, 2, 3>', isCorrect: false }]
    },
    {
      id: 129,
      title: '列表索引',
      type: 'choice',
      difficulty: 'easy',
      tags: ['16'],
      content: 'nums = [10, 20, 30]，nums[0]的值是？',
      choices: [{ content: '10', isCorrect: true }, { content: '20', isCorrect: false }, { content: '30', isCorrect: false }, { content: '1', isCorrect: false }]
    },
    {
      id: 130,
      title: '列表遍历',
      type: 'choice',
      difficulty: 'easy',
      tags: ['17'],
      content: '用for循环遍历列表names，正确的写法是？',
      choices: [{ content: 'for name in names', isCorrect: true }, { content: 'for name of names', isCorrect: false }, { content: 'foreach name in names', isCorrect: false }, { content: 'for names', isCorrect: false }]
    },
    {
      id: 131,
      title: 'append方法',
      type: 'choice',
      difficulty: 'easy',
      tags: ['18'],
      content: 'lst = [1, 2]，执行lst.append(3)后，lst变成？',
      choices: [{ content: '[1, 2, 3]', isCorrect: true }, { content: '[3, 1, 2]', isCorrect: false }, { content: '[1, 2]', isCorrect: false }, { content: '1, 2, 3', isCorrect: false }]
    },
    {
      id: 132,
      title: '二维列表访问',
      type: 'choice',
      difficulty: 'easy',
      tags: ['19'],
      content: 'matrix = [[1,2],[3,4]]，matrix[1][0]的值是？',
      choices: [{ content: '1', isCorrect: false }, { content: '2', isCorrect: false }, { content: '3', isCorrect: true }, { content: '4', isCorrect: false }]
    },
    {
      id: 133,
      title: '字典创建',
      type: 'choice',
      difficulty: 'easy',
      tags: ['20'],
      content: '创建一个字典存储name和age，正确的方法是？',
      choices: [{ content: '花括号包裹键值对', isCorrect: true }, { content: '方括号包裹', isCorrect: false }, { content: '圆括号包裹', isCorrect: false }, { content: '尖括号包裹', isCorrect: false }]
    },
    {
      id: 134,
      title: '字典访问',
      type: 'choice',
      difficulty: 'easy',
      tags: ['20'],
      content: 'd = {a: 1, b: 2}，d[a]的值是？',
      choices: [{ content: 'a', isCorrect: false }, { content: '1', isCorrect: true }, { content: '2', isCorrect: false }, { content: 'b', isCorrect: false }]
    },
    {
      id: 135,
      title: '集合特点',
      type: 'choice',
      difficulty: 'easy',
      tags: ['21'],
      content: '集合（set）的特点是什么？',
      choices: [{ content: '有序且可重复', isCorrect: false }, { content: '无序且不重复', isCorrect: true }, { content: '有序且不重复', isCorrect: false }, { content: '无序且可重复', isCorrect: false }]
    },
    {
      id: 136,
      title: '类型转换',
      type: 'choice',
      difficulty: 'easy',
      tags: ['22'],
      content: '将字符串123转换为整数，正确的方法是？',
      choices: [{ content: 'int函数', isCorrect: true }, { content: 'integer函数', isCorrect: false }, { content: 'str函数', isCorrect: false }, { content: 'float函数', isCorrect: false }]
    },
    {
      id: 137,
      title: '函数定义',
      type: 'choice',
      difficulty: 'easy',
      tags: ['23'],
      content: '定义一个名为add的函数，参数为a和b，正确的方法是？',
      choices: [{ content: 'def add(a, b):', isCorrect: true }, { content: 'function add(a, b):', isCorrect: false }, { content: 'func add(a, b)', isCorrect: false }, { content: 'define add(a, b):', isCorrect: false }]
    },
    {
      id: 138,
      title: '列表推导式',
      type: 'choice',
      difficulty: 'easy',
      tags: ['24'],
      content: '以下哪个是列表推导式的正确写法？',
      choices: [{ content: '[x for x in range(5)]', isCorrect: true }, { content: '(x for x in range(5))', isCorrect: false }, { content: '{x for x in range(5)}', isCorrect: false }, { content: 'x for x in range(5)', isCorrect: false }]
    },
    {
      id: 139,
      title: 'random模块',
      type: 'choice',
      difficulty: 'easy',
      tags: ['25'],
      content: '使用random模块生成1到10的随机整数，正确的是？',
      choices: [{ content: 'random.randint(1, 10)', isCorrect: true }, { content: 'random.random(1, 10)', isCorrect: false }, { content: 'random.choice(1, 10)', isCorrect: false }, { content: 'random.number(1, 10)', isCorrect: false }]
    },
    {
      id: 140,
      title: 'print综合',
      type: 'choice',
      difficulty: 'medium',
      tags: ['2', '4', '22'],
      content: '执行代码：x = 5; print(x + 3)会输出什么？',
      choices: [{ content: 'x + 3', isCorrect: false }, { content: '8', isCorrect: true }, { content: '53', isCorrect: false }, { content: '报错', isCorrect: false }]
    },
    {
      id: 141,
      title: 'input综合',
      type: 'choice',
      difficulty: 'medium',
      tags: ['3', '22', '4'],
      content: '执行n = input()后输入123，如何得到整数123？',
      choices: [{ content: '直接打印n', isCorrect: false }, { content: '使用int(n)转换', isCorrect: true }, { content: '使用str(n)', isCorrect: false }, { content: '无法转换', isCorrect: false }]
    },
    {
      id: 142,
      title: '变量比较',
      type: 'choice',
      difficulty: 'medium',
      tags: ['4', '6', '5'],
      content: '执行a = 10; b = 20后，a > b的结果是什么？',
      choices: [{ content: 'True', isCorrect: false }, { content: 'False', isCorrect: true }, { content: '10', isCorrect: false }, { content: '20', isCorrect: false }]
    },
    {
      id: 143,
      title: '布尔逻辑',
      type: 'choice',
      difficulty: 'medium',
      tags: ['5', '7', '6'],
      content: '表达式5 > 3 and 2 > 4的结果是什么？',
      choices: [{ content: 'True', isCorrect: false }, { content: 'False', isCorrect: true }, { content: 'and', isCorrect: false }, { content: 'None', isCorrect: false }]
    },
    {
      id: 144,
      title: '比较运算综合',
      type: 'choice',
      difficulty: 'medium',
      tags: ['6', '7', '8'],
      content: '判断x是否在1到10之间，正确的写法是？',
      choices: [{ content: 'x >= 1 and x <= 10', isCorrect: true }, { content: 'x >= 1 or x <= 10', isCorrect: false }, { content: '1 <= x <= 10', isCorrect: true }, { content: 'x > 1 and x < 10', isCorrect: false }]
    },
    {
      id: 145,
      title: '逻辑综合',
      type: 'choice',
      difficulty: 'medium',
      tags: ['7', '6', '8'],
      content: 'not (x > 5 and x < 10)等价于什么？',
      choices: [{ content: 'x <= 5 or x >= 10', isCorrect: true }, { content: 'x < 5 or x > 10', isCorrect: false }, { content: 'x <= 5 and x >= 10', isCorrect: false }, { content: 'not x > 5 and not x < 10', isCorrect: false }]
    },
    {
      id: 146,
      title: 'if循环综合',
      type: 'choice',
      difficulty: 'medium',
      tags: ['8', '9', '2'],
      content: '以下代码输出什么？\n```python\nfor i in range(3):\n    if i == 1:\n        print(i)\n```',
      choices: [{ content: '0 1 2', isCorrect: false }, { content: '1', isCorrect: true }, { content: '0 2', isCorrect: false }, { content: '什么都不输出', isCorrect: false }]
    },
    {
      id: 147,
      title: 'range综合',
      type: 'choice',
      difficulty: 'medium',
      tags: ['9', '16', '4'],
      content: 'range(2, 8, 2)会生成哪些数字？',
      choices: [{ content: '2, 4, 6, 8', isCorrect: false }, { content: '2, 4, 6', isCorrect: true }, { content: '2, 4, 6, 8, 10', isCorrect: false }, { content: '2, 3, 4, 5, 6, 7, 8', isCorrect: false }]
    },
    {
      id: 148,
      title: 'while综合',
      type: 'choice',
      difficulty: 'medium',
      tags: ['10', '4', '2'],
      content: '以下代码会执行几次 print？\n```python\ni = 0\nwhile i < 3:\n    print(i)\n    i += 1\n```',
      choices: [{ content: '2次', isCorrect: false }, { content: '3次', isCorrect: true }, { content: '4次', isCorrect: false }, { content: '无限次', isCorrect: false }]
    },
    {
      id: 149,
      title: '循环嵌套输出',
      type: 'choice',
      difficulty: 'medium',
      tags: ['11', '9', '2'],
      content: '以下代码会输出几行？\n```python\nfor i in range(2):\n    for j in range(2):\n        print(i, j)\n```',
      choices: [{ content: '2行', isCorrect: false }, { content: '4行', isCorrect: true }, { content: '3行', isCorrect: false }, { content: '1行', isCorrect: false }]
    },
    {
      id: 150,
      title: 'break综合',
      type: 'choice',
      difficulty: 'medium',
      tags: ['12', '9', '8'],
      content: '以下代码会输出什么？\n```python\nfor i in range(5):\n    if i == 3:\n        break\n    print(i)\n```',
      choices: [{ content: '0 1 2 3 4', isCorrect: false }, { content: '0 1 2', isCorrect: true }, { content: '3', isCorrect: false }, { content: '什么都不输出', isCorrect: false }]
    },
    {
      id: 151,
      title: 'continue综合',
      type: 'choice',
      difficulty: 'medium',
      tags: ['13', '9', '8'],
      content: '以下代码会输出什么？\n```python\nfor i in range(4):\n    if i == 2:\n        continue\n    print(i)\n```',
      choices: [{ content: '0 1 2 3', isCorrect: false }, { content: '0 1 3', isCorrect: true }, { content: '0 1 2', isCorrect: false }, { content: '2', isCorrect: false }]
    },
    {
      id: 152,
      title: '字符串切片综合',
      type: 'choice',
      difficulty: 'medium',
      tags: ['15', '14', '6'],
      content: 's = Python, s[1:4]和s[0:3]哪个更长？',
      choices: [{ content: 's[1:4]更长', isCorrect: false }, { content: 's[0:3]更长', isCorrect: false }, { content: '一样长', isCorrect: true }, { content: '无法比较', isCorrect: false }]
    },
    {
      id: 153,
      title: '列表遍历综合',
      type: 'choice',
      difficulty: 'medium',
      tags: ['17', '16', '9'],
      content: '以下代码会输出什么？\n```python\nlst = [1, 2, 3]\nfor i in lst:\n    print(i * 2)\n```',
      choices: [{ content: '1 2 3', isCorrect: false }, { content: '2 4 6', isCorrect: true }, { content: '[2, 4, 6]', isCorrect: false }, { content: '报错', isCorrect: false }]
    },
    {
      id: 154,
      title: '列表操作综合',
      type: 'choice',
      difficulty: 'medium',
      tags: ['18', '16', '2'],
      content: '以下代码输出什么？\n```python\nlst = [1, 2, 3]\nlst.append(4)\nprint(len(lst))\n```',
      choices: [{ content: '3', isCorrect: false }, { content: '4', isCorrect: true }, { content: '[1, 2, 3, 4]', isCorrect: false }, { content: '报错', isCorrect: false }]
    },
    {
      id: 155,
      title: '二维列表综合',
      type: 'choice',
      difficulty: 'medium',
      tags: ['19', '16', '4'],
      content: '以下代码输出什么？\n```python\nm = [[1, 2], [3, 4]]\nprint(m[0][1] + m[1][0])\n```',
      choices: [{ content: '5', isCorrect: false }, { content: '6', isCorrect: true }, { content: '7', isCorrect: false }, { content: '报错', isCorrect: false }]
    },
    {
      id: 156,
      title: '字典综合',
      type: 'choice',
      difficulty: 'medium',
      tags: ['20', '8', '2'],
      content: '以下代码输出什么？\n```python\nd = {"a": 1, "b": 2}\nprint(d.get("c", 0))\n```',
      choices: [{ content: '报错', isCorrect: false }, { content: '0', isCorrect: true }, { content: 'None', isCorrect: false }, { content: 'c', isCorrect: false }]
    },
    {
      id: 157,
      title: '集合综合',
      type: 'choice',
      difficulty: 'medium',
      tags: ['21', '16', '22'],
      content: 'set([1,2,2,3,3,3])的结果是什么？',
      choices: [{ content: '[1, 2, 3]', isCorrect: false }, { content: '{1, 2, 3}', isCorrect: true }, { content: '(1, 2, 3)', isCorrect: false }, { content: '报错', isCorrect: false }]
    },
    {
      id: 158,
      title: '类型转换综合',
      type: 'choice',
      difficulty: 'medium',
      tags: ['22', '14', '4'],
      content: 'str(123) + str(456)的结果是什么？',
      choices: [{ content: '579', isCorrect: false }, { content: '123456', isCorrect: true }, { content: '[123, 456]', isCorrect: false }, { content: '报错', isCorrect: false }]
    },
    {
      id: 159,
      title: '函数综合',
      type: 'choice',
      difficulty: 'medium',
      tags: ['23', '4', '2'],
      content: 'def f(x): return x * 2; print(f(3) + f(4))输出什么？',
      choices: [{ content: '14', isCorrect: true }, { content: '24', isCorrect: false }, { content: '6 8', isCorrect: false }, { content: '报错', isCorrect: false }]
    },
    {
      id: 160,
      title: '冒泡排序理解',
      type: 'choice',
      difficulty: 'hard',
      tags: ['9', '16', '18', '8'],
      content: '冒泡排序中，每次遍历都会把最大的元素放到哪里？',
      choices: [{ content: '放到开头位置', isCorrect: false }, { content: '放到末尾位置', isCorrect: true }, { content: '放到中间位置', isCorrect: false }, { content: '位置不变', isCorrect: false }]
    },
    {
      id: 161,
      title: '二分查找理解',
      type: 'choice',
      difficulty: 'hard',
      tags: ['9', '6', '8', '10'],
      content: '二分查找要求数据必须满足什么条件？',
      choices: [{ content: '数据可以是任意顺序', isCorrect: false }, { content: '数据必须有序排列', isCorrect: true }, { content: '数据必须全是奇数', isCorrect: false }, { content: '数据长度必须是偶数', isCorrect: false }]
    },
    {
      id: 162,
      title: '递归思想',
      type: 'choice',
      difficulty: 'hard',
      tags: ['23', '8', '9'],
      content: '递归函数必须具备的两个要素是什么？',
      choices: [{ content: '循环和判断', isCorrect: false }, { content: '终止条件和递归调用', isCorrect: true }, { content: '输入和输出', isCorrect: false }, { content: '变量和函数', isCorrect: false }]
    },
    {
      id: 163,
      title: '字典查找优化',
      type: 'choice',
      difficulty: 'hard',
      tags: ['20', '16', '17'],
      content: '在大量数据中查找某个元素，哪种数据结构效率最高？',
      choices: [{ content: '列表，因为简单', isCorrect: false }, { content: '字典，因为查找速度快', isCorrect: true }, { content: '字符串，因为占空间小', isCorrect: false }, { content: '都一样快', isCorrect: false }]
    },
    {
      id: 164,
      title: '字符串算法',
      type: 'choice',
      difficulty: 'hard',
      tags: ['14', '9', '8'],
      content: '判断一个字符串是否是回文串，最高效的方法是？',
      choices: [{ content: '从头到尾遍历', isCorrect: false }, { content: '首尾双指针向中间逼近', isCorrect: true }, { content: '反转字符串再比较', isCorrect: false }, { content: '转换为列表再比较', isCorrect: false }]
    },
    {
      id: 165,
      title: '二维列表遍历',
      type: 'choice',
      difficulty: 'hard',
      tags: ['19', '11', '9', '16'],
      content: '遍历一个n行m列的二维列表，时间复杂度是？',
      choices: [{ content: 'O(n)', isCorrect: false }, { content: 'O(m)', isCorrect: false }, { content: 'O(n*m)', isCorrect: true }, { content: 'O(n+m)', isCorrect: false }]
    },
    {
      id: 166,
      title: '列表推导式优化',
      type: 'choice',
      difficulty: 'hard',
      tags: ['24', '9', '8', '6'],
      content: '列表推导式相比普通for循环创建列表的优势是？',
      choices: [{ content: '可以处理更复杂逻辑', isCorrect: false }, { content: '代码更简洁且效率更高', isCorrect: true }, { content: '可以使用break和continue', isCorrect: false }, { content: '可以处理无限循环', isCorrect: false }]
    },
    {
      id: 167,
      title: '随机算法',
      type: 'choice',
      difficulty: 'hard',
      tags: ['25', '9', '16'],
      content: '从列表中随机抽取不重复的n个元素，应该使用？',
      choices: [{ content: '多次调用random.choice', isCorrect: false }, { content: 'random.sample函数', isCorrect: true }, { content: 'random.randint函数', isCorrect: false }, { content: 'random.shuffle后切片', isCorrect: false }]
    },
    {
      id: 168,
      title: '质数判断优化',
      type: 'choice',
      difficulty: 'hard',
      tags: ['8', '9', '6', '10'],
      content: '判断一个数n是否为质数，最优化只需遍历到？',
      choices: [{ content: 'n/2', isCorrect: false }, { content: 'n的平方根', isCorrect: true }, { content: 'n-1', isCorrect: false }, { content: 'n', isCorrect: false }]
    },
    {
      id: 169,
      title: '斐波那契优化',
      type: 'choice',
      difficulty: 'hard',
      tags: ['9', '16', '10', '4'],
      content: '计算斐波那契数列第n项，使用递归会重复计算，更好的方法是？',
      choices: [{ content: '每次重新计算', isCorrect: false }, { content: '使用循环或记忆化存储', isCorrect: true }, { content: '使用更多递归调用', isCorrect: false }, { content: '使用字符串存储', isCorrect: false }]
    }
  ]
}

export default questionsConfig
