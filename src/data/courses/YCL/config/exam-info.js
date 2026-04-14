/**
 * YCL 考试信息配置
 *
 * 考试信息适用于四级、五级、六级
 * 数据来源：YCL考试信息.png
 */

export const examInfo = {
  // 考试基本信息
  basic: {
    duration: 90,        // 考试时长（分钟）
    totalScore: 100,     // 满分
    passingScore: 60,    // 及格分
    examTypes: ['单选题', '多选题', '编程题']
  },

  // 题型分布
  questionTypes: [
    {
      id: 'single-choice',
      name: '单选题',
      count: 15,
      scorePerQuestion: 2,
      totalScore: 30,
      description: '四选一，只有一个正确答案'
    },
    {
      id: 'multiple-choice',
      name: '多选题',
      count: 5,
      scorePerQuestion: 3,
      totalScore: 15,
      description: '多个正确答案',
      scoringRule: {
        allCorrect: 3,     // 全部选对得3分
        partialCorrect: 1, // 部分选对得1分
        wrong: 0           // 选错不得分
      }
    },
    {
      id: 'coding',
      name: '编程题',
      count: 4,
      scores: [10, 10, 15, 20],
      totalScore: 55,
      description: '代码编写题'
    }
  ],

  // 时间分配建议
  timeAllocation: {
    objective: 35,      // 客观题建议用时（分钟）
    coding: 50,         // 编程题建议用时（分钟）
    review: 5           // 查漏补缺时间（分钟）
  },

  // 考前准备
  preparation: {
    devices: [
      {
        type: '电脑（必须）',
        purpose: '考试答题设备',
        requirement: '必须使用电脑，需安装谷歌浏览器（Chrome），不支持手机/平板答题'
      },
      {
        type: '手机（监考用）',
        purpose: '双机位监考',
        requirement: '需下载微信，用于考试过程中的视频监考'
      }
    ],
    documents: [
      {
        type: '身份证明证件',
        options: ['身份证', '户口本', '护照'],
        note: '任选其一'
      },
      {
        type: '考试准考证',
        note: '考前打印或电子版'
      }
    ],
    tips: [
      '查看准考证上的考试时间',
      '提前定好闹钟，避免错过考试',
      '确保网络稳定',
      '提前30分钟进入考试系统'
    ]
  },

  // 多选题得分规则说明
  multipleChoiceRule: {
    title: '多选题得分规则',
    rules: [
      { condition: '全部选对', score: 3, color: 'success' },
      { condition: '部分选对', score: 1, color: 'warning' },
      { condition: '选错或漏选', score: 0, color: 'error' }
    ]
  }
}

// 题目类型枚举
export const questionTypeEnums = {
  SINGLE_CHOICE: 'single-choice',
  MULTIPLE_CHOICE: 'multiple-choice',
  CODING: 'coding'
}

// 获取题型总分
export function getQuestionTypeScore(typeId) {
  const type = examInfo.questionTypes.find(t => t.id === typeId)
  return type ? type.totalScore : 0
}

// 获取考试时长显示文本
export function getDurationText() {
  return `${examInfo.basic.duration}分钟`
}

export default examInfo
