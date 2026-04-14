// 阶段解锁配置
// 结合路由前缀控制阶段访问权限

import { routePrefixConfig, getAllowedStages } from '@/composables/useRoutePrefix.js'

// 基础阶段配置
export const stagesConfig = {
  PY1: {
    unlocked: true,
    unlockCode: null
  },
  PY2: {
    unlocked: true,
    unlockCode: null
  },
  PY3: {
    unlocked: true,
    unlockCode: null
  }
}

// 获取所有阶段的配置信息
export function getAllStages() {
  return Object.entries(stagesConfig).map(([key, config]) => ({
    id: key,
    ...config
  }))
}

// 检查阶段是否解锁（基础检查）
export function isStageUnlocked(stageId) {
  return stagesConfig[stageId]?.unlocked || false
}

// 获取已解锁的阶段列表
export function getUnlockedStages() {
  return Object.entries(stagesConfig)
    .filter(([_, config]) => config.unlocked)
    .map(([key, _]) => key)
}

// 根据路由前缀检查阶段是否可访问
export function isStageAccessibleWithPrefix(stageId, prefix) {
  // 先检查基础解锁状态
  if (!isStageUnlocked(stageId)) return false
  // 再检查前缀权限
  const allowedStages = getAllowedStages(prefix)
  return allowedStages.includes(stageId)
}

// 获取路由前缀配置（供其他模块使用）
export { routePrefixConfig }
