/**
 * 课程统一配置文件
 * 包含所有阶段、单元、课次的元数据
 */

// 阶段配置
export const stageConfig = {
  PY1: {
    id: 'PY1',
    name: 'Python 入门基础',
    description: '从零开始学习Python编程，掌握基础语法',
    units: ['L1', 'L2', 'L3', 'L4', 'L5', 'L6']
  },
  PY2: {
    id: 'PY2',
    name: 'Python 进阶编程',
    description: '深入学习Python进阶概念，提升编程能力',
    units: ['L7', 'L8', 'L9', 'L10', 'L11', 'L12']
  },
  PY3: {
    id: 'PY3',
    name: 'Python 高级应用',
    description: '掌握Python高级特性，进行实战项目开发',
    units: ['L13', 'L14', 'L15', 'L16', 'L17', 'L18']
  }
}

// 单元配置
export const unitConfig = {
  // PY1 单元
  L1: { id: 'L1', name: 'Level 1', description: 'print命令与变量' },
  L2: { id: 'L2', name: 'Level 2', description: 'input与if-else语句' },
  L3: { id: 'L3', name: 'Level 3', description: 'for循环与嵌套' },
  L4: { id: 'L4', name: 'Level 4', description: '硬件编程基础' },
  L5: { id: 'L5', name: 'Level 5', description: '字符串操作与智能家居' },
  L6: { id: 'L6', name: 'Level 6', description: '列表操作' },

  // PY2 单元
  L7: { id: 'L7', name: 'Level 7', description: '字符串与列表操作' },
  L8: { id: 'L8', name: 'Level 8', description: '字典、集合与文本处理' },
  L9: { id: 'L9', name: 'Level 9', description: '循环控制与枚举法' },
  L10: { id: 'L10', name: 'Level 10', description: '二维列表' },
  L11: { id: 'L11', name: 'Level 11', description: '函数基础' },
  L12: { id: 'L12', name: 'Level 12', description: 'Pygame 游戏开发' },

  // PY3 单元
  L13: { id: 'L13', name: 'Level 13', description: '面向对象编程' },
  L14: { id: 'L14', name: 'Level 14', description: '类与对象进阶' },
  L15: { id: 'L15', name: 'Level 15', description: '常用算法' },
  L16: { id: 'L16', name: 'Level 16', description: '数据结构' },
  L17: { id: 'L17', name: 'Level 17', description: '项目实战（上）' },
  L18: { id: 'L18', name: 'Level 18', description: '项目实战（下）' }
}

// 辅助函数：获取阶段名称
export function getStageName(stageId) {
  return stageConfig[stageId]?.name || stageId
}

// 辅助函数：获取单元信息
export function getUnitInfo(unitId) {
  return unitConfig[unitId] || { id: unitId, name: `Level ${unitId}`, description: '' }
}

// 课次配置
export const lessonConfig = {
  // PY1 L5 单元的课次
  'L5-1': { id: 'L5-1', title: '字符串索引与拼接', subtitle: 'String Index and Concatenation', description: '学习字符串索引、len()命令和字符串拼接' },
  'L5-2': { id: 'L5-2', title: '智能感应灯与氛围灯', subtitle: 'Smart Light and Ambient Light', description: '学习光线传感器、音量传感器和灯光控制' },
  'L5-3': { id: 'L5-3', title: '字符串切片', subtitle: 'String Slicing', description: '学习字符串切片操作及其实际应用' },
  'L5-4': { id: 'L5-4', title: '升级门铃与智慧小屋', subtitle: 'Smart Doorbell and House', description: '学习模式切换、雨滴传感器和留言功能' },

  // PY1 L6 单元的课次
  'L6-1': { id: 'L6-1', title: '动物园管理员', subtitle: 'List Basics', description: '学会列表的创建、append()添加和remove()删除' },
  'L6-2': { id: 'L6-2', title: '城堡防御战', subtitle: 'List Index and Loop', description: '学会列表索引访问和for循环遍历' },
  'L6-3': { id: 'L6-3', title: '任务管理器', subtitle: 'List Insert and Pop', description: '学会insert()插入和pop()删除元素' },
  'L6-4': { id: 'L6-4', title: '幸运大抽奖', subtitle: 'Random Module', description: '学会使用import导入random模块和随机选择' }
}

// 辅助函数：获取课次信息
export function getLessonInfo(lessonId) {
  return lessonConfig[lessonId] || { id: lessonId, title: lessonId, description: '' }
}

// 辅助函数：获取单元内的课次列表
export function getUnitLessons(unitId) {
  return ['1', '2', '3', '4'].map(num => `${unitId}-${num}`)
}

export default { stageConfig, unitConfig, lessonConfig, getStageName, getUnitInfo, getLessonInfo, getUnitLessons }
