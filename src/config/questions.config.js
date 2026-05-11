/**
 * 题库配置文件
 * 由后端服务自动生成，请勿手动编辑
 */

import { tagsConfig } from './tags.config.js'

export const questionsConfig = {
  tags: tagsConfig,
  questions: [
    {
      id: 3,
      title: '输入输出练习',
      type: 'program',
      difficulty: 'easy',
      tags: [6, 7, 8],
      content: '输入名字，然后打印',
      testCases: [{ input: 'a', expectedOutput: 'a', score: 10 }, { input: 'b', expectedOutput: 'b', score: 20 }, { input: 'c', expectedOutput: 'c', score: 30 }]
    },
    {
      id: 4,
      title: '选择测试',
      type: 'choice',
      difficulty: 'medium',
      tags: [8],
      content: '11',
      choices: [{ content: 'dasdasd', isCorrect: true }, { content: 'asdasda', isCorrect: false }, { content: 'a\'d\'sa\'d', isCorrect: false }, { content: 'dasda', isCorrect: false }]
    },
    {
      id: 5,
      title: '编程题测试',
      type: 'program',
      difficulty: 'easy',
      tags: [6, 8],
      content: '编程题测试',
      testCases: [{ input: '1 2', expectedOutput: '1 2', score: 10 }, { input: '1', expectedOutput: '1', score: 10 }]
    },
    {
      id: 6,
      title: '1',
      type: 'choice',
      difficulty: 'easy',
      tags: [],
      content: '1',
      choices: [{ content: '1111111111111111111111111111111111111111111111111111111111111111111111111111111111\n    2222\n333', isCorrect: true }, { content: '2', isCorrect: false }]
    }
  ]
}

export default questionsConfig
