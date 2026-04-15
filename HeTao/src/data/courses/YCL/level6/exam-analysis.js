/**
 * YCL六级考情分析
 *
 * 数据来源：YCL六级考情分析.png
 * 更新时间：2025.09
 */

export const level6Analysis = {
  level: 'level6',
  levelName: '六级',
  targetStage: 'PY3',
  description: '算法、数据结构、Pygame游戏开发、综合应用',

  // 知识点考情分析
  knowledgePoints: [
    // ===== 核心知识点（客观题+编程题都必考） =====
    {
      id: 'kp-6-1',
      name: '函数的创建和调用',
      alias: ['函数', 'function', 'def'],
      reviewLocation: 'L11-1',
      examStatus: {
        objective: '必考',
        coding: '-'
      },
      scoreRange: [4, 8],
      trend: 'up',
      trendLabel: '上升',
      importance: 4,
      description: '函数的定义、参数、返回值',
      theoryRef: 'theory-6-1'
    },
    {
      id: 'kp-6-2',
      name: 'Pygame基础',
      alias: ['pgzrun', 'PygameZero', '游戏基础'],
      reviewLocation: 'L12-1',
      examStatus: {
        objective: '必考',
        coding: '-'
      },
      scoreRange: [10, 15],
      trend: 'stable',
      trendLabel: '稳定',
      importance: 4,
      description: 'Pygame框架的基本使用，窗口创建、角色绘制',
      theoryRef: 'theory-6-2'
    },
    {
      id: 'kp-6-3',
      name: 'Pygame事件监听',
      alias: ['事件处理', 'on_key_down', 'on_mouse_down'],
      reviewLocation: 'L12-2',
      examStatus: {
        objective: '必考',
        coding: '-'
      },
      scoreRange: [10, 15],
      trend: 'stable',
      trendLabel: '稳定',
      importance: 4,
      description: '使用on_key_down、on_mouse_down等函数处理键盘和鼠标事件',
      theoryRef: 'theory-6-3'
    },
    {
      id: 'kp-6-4',
      name: '简单递推问题',
      alias: ['递推', '递推公式'],
      reviewLocation: 'L15-1',
      examStatus: {
        objective: '必考',
        coding: '必考'
      },
      scoreRange: [10, 20],
      trend: 'stable',
      trendLabel: '稳定',
      importance: 5,
      description: '使用递推方法解决问题',
      theoryRef: 'theory-6-4'
    },
    {
      id: 'kp-6-5',
      name: '顺序模拟',
      alias: ['表达式模拟', '计算模拟'],
      reviewLocation: '暂无',
      examStatus: {
        objective: '必考',
        coding: '必考'
      },
      scoreRange: [12, 14],
      trend: 'stable',
      trendLabel: '稳定',
      importance: 5,
      description: '按顺序模拟表达式的计算过程',
      theoryRef: 'theory-6-5'
    },
    {
      id: 'kp-6-6',
      name: '循环模拟',
      alias: ['循环模拟', '迭代模拟'],
      reviewLocation: '暂无',
      examStatus: {
        objective: '必考',
        coding: '必考'
      },
      scoreRange: [8, 12],
      trend: 'up',
      trendLabel: '上升',
      importance: 5,
      description: '使用循环模拟问题求解过程',
      theoryRef: 'theory-6-6'
    },
    {
      id: 'kp-6-7',
      name: '带列表的模拟',
      alias: ['列表模拟', '数据模拟'],
      reviewLocation: '暂无',
      examStatus: {
        objective: '常考',
        coding: '必考'
      },
      scoreRange: [20, 25],
      trend: 'up',
      trendLabel: '上升',
      importance: 5,
      description: '结合列表进行复杂问题的模拟',
      theoryRef: 'theory-6-7'
    },

    // ===== 客观题必考，编程题有概率 =====
    {
      id: 'kp-6-8',
      name: '斐波那契数列',
      alias: ['斐波那契', 'Fibonacci'],
      reviewLocation: 'L15-1',
      examStatus: {
        objective: '必考',
        coding: '有概率'
      },
      scoreRange: [15, 25],
      trend: 'up',
      trendLabel: '上升',
      importance: 4,
      description: '斐波那契数列的理解和实现',
      theoryRef: 'theory-6-8'
    }
  ],

  // 知识点分组（按重要程度）
  groupedPoints: {
    core: ['kp-6-4', 'kp-6-5', 'kp-6-6', 'kp-6-7'],              // 核心考点（编程必考）
    important: ['kp-6-1', 'kp-6-2', 'kp-6-3', 'kp-6-8'],
    advanced: []
  },

  // 复习建议
  studyTips: [
    {
      priority: 1,
      title: '重中之重',
      points: ['简单递推问题', '模拟表达式', '循环模拟', '带列表的模拟'],
      reason: '编程题必考，分值占比最高（合计50-75分）'
    },
    {
      priority: 2,
      title: '重点掌握',
      points: ['Pygame基础', 'pygame事件监听', '斐波那契数列'],
      reason: '分值较高，客观题必考'
    },
    {
      priority: 3,
      title: '熟练应用',
      points: ['函数的定义和使用'],
      reason: '基础内容，需要扎实掌握'
    }
  ],

  // 算法专题
  algorithmTopics: {
    simulation: {
      name: '模拟算法专题',
      points: ['表达式模拟', '循环模拟', '列表模拟'],
      description: '能够将实际问题转化为程序模拟'
    },
    recursion: {
      name: '递推算法专题',
      points: ['递推概念', '递推公式', '递推应用'],
      description: '理解递推思想，能够编写递推代码'
    }
  }
}

// 获取核心考点
export function getCorePoints() {
  return level6Analysis.knowledgePoints.filter(
    kp => kp.importance >= 4
  )
}

// 获取按重要性排序的知识点
export function getPointsByImportance() {
  return [...level6Analysis.knowledgePoints].sort((a, b) => b.importance - a.importance)
}

// 根据复习位置获取知识点
export function getPointsByLocation(location) {
  return level6Analysis.knowledgePoints.filter(
    kp => kp.reviewLocation.includes(location)
  )
}

export default level6Analysis
