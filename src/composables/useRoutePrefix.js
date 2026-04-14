// 路由前缀管理
// 根据不同入口控制可访问的课程阶段

// 路由前缀配置
export const routePrefixConfig = {
  'p1': {
    name: 'PY1入口',
    maxStage: 'PY1',
    allowedStages: ['PY1']
  },
  'py2': {
    name: 'PY2入口',
    maxStage: 'PY2',
    allowedStages: ['PY1', 'PY2']
  },
  'python3': {
    name: 'PY3入口',
    maxStage: 'PY3',
    allowedStages: ['PY1', 'PY2', 'PY3']
  }
}

// 获取当前路由前缀
export function getCurrentPrefix(route) {
  const path = route.path
  for (const prefix of Object.keys(routePrefixConfig)) {
    if (path.startsWith(`/${prefix}`)) {
      return prefix
    }
  }
  return null // 无前缀，表示完整访问
}

// 检查阶段是否可访问
export function isStageAccessible(stageId, prefix) {
  if (!prefix) return true // 无前缀时全部可访问
  const config = routePrefixConfig[prefix]
  return config ? config.allowedStages.includes(stageId) : false
}

// 获取允许访问的阶段列表
export function getAllowedStages(prefix) {
  if (!prefix) return ['PY1', 'PY2', 'PY3']
  const config = routePrefixConfig[prefix]
  return config ? config.allowedStages : []
}

// 构建带前缀的路由路径
export function prefixedPath(prefix, path) {
  if (!prefix) return path
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `/${prefix}${normalizedPath}`
}
