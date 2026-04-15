/**
 * YCL四级考情分析
 *
 * 数据来源：YCL四级考情分析.png
 * 更新时间：2025.06
 */

export const level4Analysis = {
  level: 'level4',
  levelName: '四级',
  targetStage: 'PY1',
  description: 'Python基础语法、变量、条件判断、循环',

  // 知识点考情分析
  knowledgePoints: [
    // ===== 核心知识点（客观题+编程题都必考） =====
    {
      id: 'kp-4-1',
      name: '输出命令',
      alias: ['print', '打印'],
      reviewLocation: 'L1-1',
      examStatus: {
        objective: '必考',    // 客观题（选择题）
        coding: '必考'        // 编程题
      },
      scoreRange: [8, 10],
      trend: 'up',           // ↑ 上升
      trendLabel: '上升',
      importance: 5,
      description: '使用print()函数输出内容到控制台',
      theoryRef: 'theory-4-1'
    },
    {
      id: 'kp-4-2',
      name: '输入命令',
      alias: ['input', '获取输入'],
      reviewLocation: 'L1-2',
      examStatus: {
        objective: '必考',
        coding: '必考'
      },
      scoreRange: [6, 8],
      trend: 'stable',       // — 稳定
      trendLabel: '稳定',
      importance: 5,
      description: '使用input()函数获取用户输入',
      theoryRef: 'theory-4-2'
    },
    {
      id: 'kp-4-3',
      name: '转整命令',
      alias: ['int', '类型转换'],
      reviewLocation: 'L1-2',
      examStatus: {
        objective: '必考',
        coding: '必考'
      },
      scoreRange: [8, 12],
      trend: 'up',
      trendLabel: '上升',
      importance: 5,
      description: '使用int()将字符串或小数转换为整数',
      theoryRef: 'theory-4-3'
    },
    {
      id: 'kp-4-4',
      name: '简单数学运算',
      alias: ['算术运算', '加减乘除'],
      reviewLocation: 'L1-1',
      examStatus: {
        objective: '必考',
        coding: '必考'
      },
      scoreRange: [12, 15],
      trend: 'stable',
      trendLabel: '稳定',
      importance: 5,
      description: '加(+)、减(-)、乘(*)、除(/)、整除(//)、取余(%)、幂(**)运算',
      theoryRef: 'theory-4-4'
    },
    {
      id: 'kp-4-5',
      name: '字符串拼接',
      alias: ['字符串连接', '+拼接'],
      reviewLocation: 'L4-4',
      examStatus: {
        objective: '必考',
        coding: '必考'
      },
      scoreRange: [12, 14],
      trend: 'stable',
      trendLabel: '稳定',
      importance: 5,
      description: '使用+号连接多个字符串',
      theoryRef: 'theory-4-5'
    },
    {
      id: 'kp-4-6',
      name: 'if-else',
      alias: ['条件判断', '双分支'],
      reviewLocation: 'L1-3',
      examStatus: {
        objective: '必考',
        coding: '必考'
      },
      scoreRange: [12, 14],
      trend: 'up',
      trendLabel: '上升',
      importance: 5,
      description: 'if-else双分支条件判断结构',
      theoryRef: 'theory-4-6'
    },
    {
      id: 'kp-4-7',
      name: 'for循环基础',
      alias: ['for循环', '遍历循环'],
      reviewLocation: 'L2-2',
      examStatus: {
        objective: '必考',
        coding: '必考'
      },
      scoreRange: [12, 16],
      trend: 'stable',
      trendLabel: '稳定',
      importance: 5,
      description: 'for循环的基本使用，range()函数',
      theoryRef: 'theory-4-7'
    },

    // ===== 客观题必考，编程题有概率 =====
    {
      id: 'kp-4-8',
      name: '变量的修改',
      alias: ['变量赋值', '变量更新'],
      reviewLocation: 'L3-1',
      examStatus: {
        objective: '必考',
        coding: '有概率'
      },
      scoreRange: [2, 5],
      trend: 'up',
      trendLabel: '上升',
      importance: 3,
      description: '在程序中修改变量的值',
      theoryRef: 'theory-4-8'
    },
    {
      id: 'kp-4-9',
      name: '字符串基础',
      alias: ['str', '字符串类型'],
      reviewLocation: 'L1-1',
      examStatus: {
        objective: '必考',
        coding: '有概率'
      },
      scoreRange: [2, 4],
      trend: 'down',         // ↓ 下降
      trendLabel: '下降',
      importance: 2,
      description: '字符串的基本概念和操作',
      theoryRef: 'theory-4-9'
    },
    {
      id: 'kp-4-10',
      name: 'if语句',
      alias: ['单分支', '简单判断'],
      reviewLocation: 'L1-3',
      examStatus: {
        objective: '必考',
        coding: '有概率'
      },
      scoreRange: [2, 3],
      trend: 'stable',
      trendLabel: '稳定',
      importance: 2,
      description: 'if单分支条件判断',
      theoryRef: 'theory-4-10'
    },
    {
      id: 'kp-4-11',
      name: '比较数大小',
      alias: ['比较运算', '大于小于'],
      reviewLocation: 'L1-3',
      examStatus: {
        objective: '必考',
        coding: '常考'
      },
      scoreRange: [2, 4],
      trend: 'down',
      trendLabel: '下降',
      importance: 3,
      description: '使用比较运算符比较数值大小',
      theoryRef: 'theory-4-11'
    },

    // ===== 有概率出现 =====
    {
      id: 'kp-4-12',
      name: '分支应用',
      alias: ['条件嵌套', 'elif'],
      reviewLocation: 'L3-3',
      examStatus: {
        objective: '有概率',
        coding: '有概率'
      },
      scoreRange: [3, 15],
      trend: 'down',
      trendLabel: '下降',
      importance: 3,
      description: '多分支条件判断和嵌套应用',
      theoryRef: 'theory-4-12'
    }
  ],

  // 知识点分组（按重要程度）
  groupedPoints: {
    required: ['kp-4-1', 'kp-4-2', 'kp-4-3', 'kp-4-4', 'kp-4-5', 'kp-4-6', 'kp-4-7'],
    common: ['kp-4-11'],
    optional: ['kp-4-8', 'kp-4-9', 'kp-4-10', 'kp-4-12']
  },

  // 复习建议
  studyTips: [
    {
      priority: 1,
      title: '重点掌握',
      points: ['输出命令', '简单数学运算', '字符串拼接', 'if-else', 'for循环基础'],
      reason: '这些是必考内容，分值占比高'
    },
    {
      priority: 2,
      title: '熟练应用',
      points: ['输入命令', '转整命令'],
      reason: '必考内容，常与其他知识点结合考查'
    },
    {
      priority: 3,
      title: '了解即可',
      points: ['变量的修改', '字符串基础', '分支应用'],
      reason: '有概率出现，分值较低'
    }
  ]
}

// 获取必考知识点
export function getRequiredPoints() {
  return level4Analysis.knowledgePoints.filter(
    kp => kp.examStatus === '必考'
  )
}

// 获取按重要性排序的知识点
export function getPointsByImportance() {
  return [...level4Analysis.knowledgePoints].sort((a, b) => b.importance - a.importance)
}

// 根据复习位置获取知识点
export function getPointsByLocation(location) {
  return level4Analysis.knowledgePoints.filter(
    kp => kp.reviewLocation.includes(location)
  )
}

export default level4Analysis
