/**
 * YCL 知识点配置
 *
 * 聚合四级、五级、六级的所有知识点配置
 */

import { level4Analysis } from '../level4/exam-analysis.js'
import { level5Analysis } from '../level5/exam-analysis.js'
import { level6Analysis } from '../level6/exam-analysis.js'

// 所有等级的知识点配置
export const yclKnowledgePoints = {
  level4: level4Analysis,
  level5: level5Analysis,
  level6: level6Analysis
}

// 等级信息
// 访问权限说明：
// - p1 前缀：只能访问 PY1 阶段 → 可访问 YCL四级
// - py2 前缀：可访问 PY1、PY2 阶段 → 可访问 YCL四级、五级
// - python3 前缀：可访问 PY1、PY2、PY3 阶段 → 可访问 YCL四级、五级、六级
// - 无前缀（管理员）：可访问所有等级
export const levelInfo = {
  level4: {
    id: 'level4',
    name: '四级',
    fullName: 'YCL四级',
    targetStage: 'PY1',
    description: 'Python基础语法、变量、条件判断、循环',
    permission: ['p1', 'py2', 'python3']  // p1/py2/python3 均可访问
  },
  level5: {
    id: 'level5',
    name: '五级',
    fullName: 'YCL五级',
    targetStage: 'PY2',
    description: '列表、字典、函数、字符串处理、随机数模块',
    permission: ['py2', 'python3']  // 仅 py2/python3 可访问
  },
  level6: {
    id: 'level6',
    name: '六级',
    fullName: 'YCL六级',
    targetStage: 'PY3',
    description: '算法、数据结构、Pygame游戏开发、综合应用',
    permission: ['python3']  // 仅 python3 可访问
  }
}

// 根据等级获取知识点列表
export function getKnowledgePointsByLevel(level) {
  const analysis = yclKnowledgePoints[level]
  return analysis ? analysis.knowledgePoints : []
}

// 根据知识点ID获取知识点详情
export function getKnowledgePointById(kpId) {
  for (const level of ['level4', 'level5', 'level6']) {
    const kp = yclKnowledgePoints[level].knowledgePoints.find(k => k.id === kpId)
    if (kp) {
      return { ...kp, level }
    }
  }
  return null
}

// 根据路由前缀获取可访问的等级
export function getAccessibleLevels(routePrefix) {
  const prefix = routePrefix.toLowerCase().replace('/', '')
  return Object.entries(levelInfo)
    .filter(([_, info]) => info.permission.includes(prefix))
    .map(([levelId, info]) => ({
      id: levelId,
      ...info
    }))
}

// 检查是否有权限访问某等级
export function canAccessLevel(level, routePrefix) {
  const info = levelInfo[level]
  if (!info) return false
  // 无前缀时默认可访问所有等级（基础路由访问）
  if (!routePrefix) return true
  const prefix = routePrefix.toLowerCase().replace('/', '')
  return info.permission.includes(prefix)
}

// 获取必考知识点（适配新的 examStatus 结构）
export function getRequiredPointsByLevel(level) {
  const analysis = yclKnowledgePoints[level]
  if (!analysis) return []

  return analysis.knowledgePoints.filter(kp => {
    // 新数据结构：examStatus 是对象 { objective, coding }
    if (typeof kp.examStatus === 'object') {
      return kp.examStatus.objective === '必考' || kp.examStatus.coding === '必考' || kp.importance >= 4
    }
    // 兼容旧数据结构：examStatus 是字符串
    return kp.examStatus === '必考' || kp.importance >= 4
  })
}

// 获取复习建议
export function getStudyTipsByLevel(level) {
  const analysis = yclKnowledgePoints[level]
  return analysis ? analysis.studyTips : []
}

export default yclKnowledgePoints
