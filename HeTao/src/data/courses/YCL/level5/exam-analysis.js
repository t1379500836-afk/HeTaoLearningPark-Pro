/**
 * YCL五级考情分析
 *
 * 数据来源：YCL五级考情分析.png
 * 更新时间：2025.08
 */

export const level5Analysis = {
  level: 'level5',
  levelName: '五级',
  targetStage: 'PY2',
  description: '列表、字典、函数、字符串处理、随机数模块',

  // 知识点考情分析
  knowledgePoints: [
    // ===== 核心知识点（客观题+编程题都必考） =====
    {
      id: 'kp-5-1',
      name: '索引',
      alias: ['列表索引', '下标访问'],
      reviewLocation: 'L6-2',
      examStatus: {
        objective: '必考',
        coding: '必考'
      },
      scoreRange: [10, 20],
      trend: 'up',
      trendLabel: '上升',
      importance: 5,
      description: '通过索引访问列表或字符串中的元素',
      theoryRef: 'theory-5-1'
    },
    {
      id: 'kp-5-2',
      name: '统计命令',
      alias: ['max', 'min', 'len', 'sum'],
      reviewLocation: 'L7-2',
      examStatus: {
        objective: '必考',
        coding: '必考'
      },
      scoreRange: [5, 15],
      trend: 'up',
      trendLabel: '上升',
      importance: 5,
      description: '使用max、min、len、sum等统计函数获取列表的最大值、最小值、长度和总和',
      theoryRef: 'theory-5-2'
    },
    {
      id: 'kp-5-3',
      name: 'while循环',
      alias: ['while', '条件循环'],
      reviewLocation: 'L2-1',
      examStatus: {
        objective: '必考',
        coding: '必考'
      },
      scoreRange: [10, 15],
      trend: 'up',
      trendLabel: '上升',
      importance: 5,
      description: 'while循环的使用和条件控制',
      theoryRef: 'theory-5-3'
    },
    {
      id: 'kp-5-4',
      name: '字符串分割',
      alias: ['split', '字符串切分'],
      reviewLocation: 'L2-2',
      examStatus: {
        objective: '必考',
        coding: '必考'
      },
      scoreRange: [5, 8],
      trend: 'stable',
      trendLabel: '稳定',
      importance: 4,
      description: '使用split()方法分割字符串',
      theoryRef: 'theory-5-4'
    },
    {
      id: 'kp-5-5',
      name: '列表修改',
      alias: ['list修改', '索引赋值'],
      reviewLocation: 'L6-2',
      examStatus: {
        objective: '必考',
        coding: '必考'
      },
      scoreRange: [5, 10],
      trend: 'up',
      trendLabel: '上升',
      importance: 5,
      description: '通过索引修改列表元素（如 list[索引] = 新值）',
      theoryRef: 'theory-5-5'
    },
    {
      id: 'kp-5-6',
      name: 'for循环嵌套',
      alias: ['嵌套循环', '双重循环'],
      reviewLocation: 'L9-2',
      examStatus: {
        objective: '必考',
        coding: '必考'
      },
      scoreRange: [6, 8],
      trend: 'stable',
      trendLabel: '稳定',
      importance: 4,
      description: 'for循环的嵌套使用',
      theoryRef: 'theory-5-6'
    },
    {
      id: 'kp-5-7',
      name: 'break、continue',
      alias: ['循环控制', '跳出循环'],
      reviewLocation: 'L4-3',
      examStatus: {
        objective: '必考',
        coding: '必考'
      },
      scoreRange: [6, 8],
      trend: 'up',
      trendLabel: '上升',
      importance: 4,
      description: '使用break跳出循环，使用continue跳过本次循环',
      theoryRef: 'theory-5-7'
    },
    {
      id: 'kp-5-8',
      name: '数据类型转换命令',
      alias: ['int', 'str', 'list转换'],
      reviewLocation: 'L8-2',
      examStatus: {
        objective: '常考',
        coding: '必考'
      },
      scoreRange: [6, 8],
      trend: 'up',
      trendLabel: '上升',
      importance: 4,
      description: 'int()、str()、list()等类型转换',
      theoryRef: 'theory-5-8'
    },
    {
      id: 'kp-5-9',
      name: '枚举法',
      alias: ['enumerate', '枚举遍历'],
      reviewLocation: 'L9-3',
      examStatus: {
        objective: '-',
        coding: '必考'
      },
      scoreRange: [10, 15],
      trend: 'up',
      trendLabel: '上升',
      importance: 5,
      description: '使用枚举法解决问题',
      theoryRef: 'theory-5-9'
    },

    // ===== 客观题必考，编程题有概率 =====
    {
      id: 'kp-5-10',
      name: '遍历',
      alias: ['for遍历', '迭代'],
      reviewLocation: 'L6-2',
      examStatus: {
        objective: '必考',
        coding: '有概率'
      },
      scoreRange: [6, 8],
      trend: 'stable',
      trendLabel: '稳定',
      importance: 3,
      description: '遍历列表、字符串等序列',
      theoryRef: 'theory-5-10'
    },
    {
      id: 'kp-5-11',
      name: '排序命令',
      alias: ['sorted'],
      reviewLocation: 'L7-3',
      examStatus: {
        objective: '必考',
        coding: '有概率'
      },
      scoreRange: [5, 10],
      trend: 'up',
      trendLabel: '上升',
      importance: 3,
      description: '使用sorted()函数对列表进行升序排序',
      theoryRef: 'theory-5-11'
    },
    {
      id: 'kp-5-12',
      name: 'print()进阶用法',
      alias: ['print进阶', '格式化输出'],
      reviewLocation: 'L9-2',
      examStatus: {
        objective: '必考',
        coding: '-'
      },
      scoreRange: [4, 6],
      trend: 'up',
      trendLabel: '上升',
      importance: 3,
      description: 'print函数的sep、end参数',
      theoryRef: 'theory-5-12'
    },
    {
      id: 'kp-5-13',
      name: '列表生成式',
      alias: ['列表推导式', 'list comprehension'],
      reviewLocation: 'L7-2',
      examStatus: {
        objective: '必考',
        coding: '有概率'
      },
      scoreRange: [2, 3],
      trend: 'stable',
      trendLabel: '稳定',
      importance: 2,
      description: '使用列表生成式创建列表',
      theoryRef: 'theory-5-13'
    },

    // ===== 常考/了解即可 =====
    {
      id: 'kp-5-14',
      name: '集合',
      alias: ['set', '集合操作'],
      reviewLocation: 'L8-2',
      examStatus: {
        objective: '常考',
        coding: '-'
      },
      scoreRange: [2, 3],
      trend: 'stable',
      trendLabel: '稳定',
      importance: 2,
      description: '集合的创建和基本操作',
      theoryRef: 'theory-5-14'
    },
    {
      id: 'kp-5-15',
      name: '字典',
      alias: ['dict', '键值对'],
      reviewLocation: 'L8-1',
      examStatus: {
        objective: '常考',
        coding: '-'
      },
      scoreRange: [2, 3],
      trend: 'stable',
      trendLabel: '稳定',
      importance: 2,
      description: '字典的创建、访问、增删改操作',
      theoryRef: 'theory-5-15'
    }
  ],

  // 知识点分组（按重要程度）
  groupedPoints: {
    highPriority: ['kp-5-1', 'kp-5-2', 'kp-5-3', 'kp-5-5', 'kp-5-9'],      // 高分值+上升趋势
    mediumPriority: ['kp-5-4', 'kp-5-6', 'kp-5-7', 'kp-5-8', 'kp-5-10', 'kp-5-11'],
    lowPriority: ['kp-5-12', 'kp-5-13', 'kp-5-14', 'kp-5-15']
  },

  // 复习建议
  studyTips: [
    {
      priority: 1,
      title: '重点掌握',
      points: ['索引', 'while循环', '列表修改', '枚举法'],
      reason: '分值占比高且考查趋势上升，需重点复习'
    },
    {
      priority: 2,
      title: '熟练应用',
      points: ['for循环嵌套', 'break/continue', '数据类型转换'],
      reason: '常与其他知识点结合考查'
    },
    {
      priority: 3,
      title: '了解即可',
      points: ['集合', '字典', '列表生成式'],
      reason: '分值占比低，考查趋势稳定'
    }
  ]
}

// 获取高分值知识点
export function getHighPriorityPoints() {
  return level5Analysis.knowledgePoints.filter(
    kp => kp.importance >= 4
  )
}

// 获取按重要性排序的知识点
export function getPointsByImportance() {
  return [...level5Analysis.knowledgePoints].sort((a, b) => b.importance - a.importance)
}

// 根据复习位置获取知识点
export function getPointsByLocation(location) {
  return level5Analysis.knowledgePoints.filter(
    kp => kp.reviewLocation.includes(location)
  )
}

export default level5Analysis
