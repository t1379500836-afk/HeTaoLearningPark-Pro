/**
 * YCL 考级专区数据入口
 *
 * 统一导出所有 YCL 相关数据
 */

// 配置文件
export { examInfo, questionTypeEnums, getQuestionTypeScore, getDurationText } from './config/exam-info.js'
export { yclKnowledgePoints, levelInfo, getKnowledgePointsByLevel, getKnowledgePointById, getAccessibleLevels, canAccessLevel, getRequiredPointsByLevel, getStudyTipsByLevel } from './config/knowledge-points.js'
export { yclTheory, getTheory, getTheoryByKnowledgePoint, getAllTheoryByLevel } from './config/theory.js'

// 四级数据
export { level4Analysis, getRequiredPoints as getLevel4RequiredPoints, getPointsByImportance as getLevel4PointsByImportance } from './level4/exam-analysis.js'

// 五级数据
export { level5Analysis, getHighPriorityPoints as getLevel5HighPriorityPoints, getPointsByImportance as getLevel5PointsByImportance } from './level5/exam-analysis.js'

// 六级数据
export { level6Analysis, getCorePoints as getLevel6CorePoints, getPointsByImportance as getLevel6PointsByImportance } from './level6/exam-analysis.js'

// 练习套卷（按需加载）
// 四级套卷
export const level4Sets = {
  'basic-1': () => import('./level4/sets/basic-1.js'),
  'basic-2': () => import('./level4/sets/basic-2.js'),
  'basic-3': () => import('./level4/sets/basic-3.js'),
  'advanced': () => import('./level4/sets/advanced.js'),
  'expert': () => import('./level4/sets/expert.js')
}

// 五级套卷
export const level5Sets = {
  'basic-1': () => import('./level5/sets/basic-1.js'),
  'basic-2': () => import('./level5/sets/basic-2.js'),
  'basic-3': () => import('./level5/sets/basic-3.js'),
  'advanced': () => import('./level5/sets/advanced.js'),
  'expert': () => import('./level5/sets/expert.js')
}

// 六级套卷
export const level6Sets = {
  'basic-1': () => import('./level6/sets/basic-1.js'),
  'basic-2': () => import('./level6/sets/basic-2.js'),
  'basic-3': () => import('./level6/sets/basic-3.js'),
  'advanced': () => import('./level6/sets/advanced.js'),
  'expert': () => import('./level6/sets/expert.js')
}

/**
 * 获取练习套卷
 * @param {string} level - 等级：'level4' | 'level5' | 'level6'
 * @param {string} setId - 套卷ID：'basic-1' | 'basic-2' | 'basic-3' | 'advanced' | 'expert'
 * @returns {Promise} 套卷数据
 */
export async function getPracticeSet(level, setId) {
  const setsMap = {
    level4: level4Sets,
    level5: level5Sets,
    level6: level6Sets
  }

  const sets = setsMap[level]
  if (!sets) {
    throw new Error(`Unknown level: ${level}`)
  }

  const loader = sets[setId]
  if (!loader) {
    throw new Error(`Unknown set ID: ${setId}`)
  }

  const module = await loader()
  return module.default || module.practiceSetTemplate
}

/**
 * 获取某等级的所有套卷列表
 * @param {string} level - 等级
 * @returns {Array} 套卷列表
 */
export function getSetListByLevel(level) {
  const setDefinitions = {
    level4: [
      { id: 'basic-1', name: '四级基础练习（一）', difficulty: 'basic', status: 'available' },
      { id: 'basic-2', name: '四级基础练习（二）', difficulty: 'basic', status: 'available' },
      { id: 'basic-3', name: '四级基础练习（三）', difficulty: 'basic', status: 'available' },
      { id: 'advanced', name: '四级进阶练习', difficulty: 'advanced', status: 'available' },
      { id: 'expert', name: '四级提升练习', difficulty: 'expert', status: 'available' }
    ],
    level5: [
      { id: 'basic-1', name: '五级基础练习（一）', difficulty: 'basic', status: 'available' },
      { id: 'basic-2', name: '五级基础练习（二）', difficulty: 'basic', status: 'available' },
      { id: 'basic-3', name: '五级基础练习（三）', difficulty: 'basic', status: 'available' },
      { id: 'advanced', name: '五级进阶练习', difficulty: 'advanced', status: 'available' },
      { id: 'expert', name: '五级提升练习', difficulty: 'expert', status: 'available' }
    ],
    level6: [
      { id: 'basic-1', name: '六级基础练习（一）', difficulty: 'basic', status: 'available' },
      { id: 'basic-2', name: '六级基础练习（二）', difficulty: 'basic', status: 'available' },
      { id: 'basic-3', name: '六级基础练习（三）', difficulty: 'basic', status: 'available' },
      { id: 'advanced', name: '六级进阶练习', difficulty: 'advanced', status: 'available' },
      { id: 'expert', name: '六级提升练习', difficulty: 'expert', status: 'available' }
    ]
  }

  return setDefinitions[level] || []
}
