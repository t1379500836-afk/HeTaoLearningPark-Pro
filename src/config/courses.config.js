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

// 课次配置（元数据，用于 UnitView 卡片即时渲染，无需动态 import）
export const lessonConfig = {
  // PY1 L1 单元
  'L1-1': { id: 'L1-1', title: '编程启程', subtitle: '学会 print() 命令和变量' },
  'L1-2': { id: 'L1-2', title: '互动魔法屋', subtitle: '学会 input()、int() 和 float() 命令' },
  'L1-3': { id: 'L1-3', title: '智能判断门', subtitle: '学会 if 条件判断、比较运算符和 else 分支' },
  'L1-4': { id: 'L1-4', title: '智能门铃和语音留言', subtitle: '硬件编程：声音、按钮检测、屏幕显示' },

  // PY1 L2 单元
  'L2-1': { id: 'L2-1', title: '循环初体验', subtitle: '学会 while 循环重复执行代码' },
  'L2-2': { id: 'L2-2', title: '字符串分割', subtitle: '学会用 split() 分割字符串' },
  'L2-3': { id: 'L2-3', title: '列表索引', subtitle: '学会用索引访问列表元素' },
  'L2-4': { id: 'L2-4', title: '海龟绘图', subtitle: '学会用海龟画各种图形' },

  // PY1 L3 单元
  'L3-1': { id: 'L3-1', title: '变量修改和计数', subtitle: '学会修改变量值和在循环中计数' },
  'L3-2': { id: 'L3-2', title: '循环变量和应用', subtitle: '学会使用循环变量生成有规律的数字' },
  'L3-3': { id: 'L3-3', title: '多条件判断', subtitle: '学会使用if-elif-else处理多种情况' },
  'L3-4': { id: 'L3-4', title: '组合条件', subtitle: '学会使用and和or连接条件' },

  // PY1 L4 单元
  'L4-1': { id: 'L4-1', title: '布尔值和while循环', subtitle: '学会True/False判断和while循环' },
  'L4-2': { id: 'L4-2', title: '智能门铃和语音留言', subtitle: '学会音效播放、输入检测和录音功能' },
  'L4-3': { id: 'L4-3', title: 'break语句与while循环条件', subtitle: '学会用break和条件灵活控制循环' },
  'L4-4': { id: 'L4-4', title: '智能门和密码锁', subtitle: '学会舵机控制、红外遥控和密码验证' },

  // PY1 L5 单元
  'L5-1': { id: 'L5-1', title: '字符串索引与拼接', subtitle: '学会字符串索引、len()命令和字符串拼接' },
  'L5-2': { id: 'L5-2', title: '智能感应灯与氛围灯', subtitle: '学会光线传感器、音量传感器和灯光控制' },
  'L5-3': { id: 'L5-3', title: '字符串切片', subtitle: '学会字符串切片操作提取字符' },
  'L5-4': { id: 'L5-4', title: '升级门铃与智慧小屋', subtitle: '学会模式切换、雨滴传感器和留言功能' },

  // PY1 L6 单元
  'L6-1': { id: 'L6-1', title: '列表入门', subtitle: '学会列表的创建、添加和删除' },
  'L6-2': { id: 'L6-2', title: '列表操作', subtitle: '学会列表索引和遍历' },
  'L6-3': { id: 'L6-3', title: '列表进阶', subtitle: '学会列表的插入和删除操作' },
  'L6-4': { id: 'L6-4', title: '随机模块', subtitle: '学会使用随机模块' },

  // PY2 L7 单元
  'L7-1': { id: 'L7-1', title: '疯狂原始人', subtitle: '学会遍历和分割字符串' },
  'L7-2': { id: 'L7-2', title: '智取核桃山', subtitle: '学会查找最大最小值和列表推导式' },
  'L7-3': { id: 'L7-3', title: '忍无可忍', subtitle: '学会列表排序和求和' },
  'L7-4': { id: 'L7-4', title: '重建百兽洞', subtitle: '学会控制智能硬件设备' },

  // PY2 L8 单元
  'L8-1': { id: 'L8-1', title: '猫咪和小鱼', subtitle: '学会字典的创建、查询和修改' },
  'L8-2': { id: 'L8-2', title: '龙王传说', subtitle: '学会数据类型转换和集合操作' },
  'L8-3': { id: 'L8-3', title: '奇怪的面试者', subtitle: '学会使用传感器和控制智能车运动' },
  'L8-4': { id: 'L8-4', title: '鸿门宴', subtitle: '复习列表生成式、排序、字符串操作' },

  // PY2 L9 单元
  'L9-1': { id: 'L9-1', title: '一念之间', subtitle: '学会continue和break控制循环' },
  'L9-2': { id: 'L9-2', title: '世界遗忘我', subtitle: '掌握for循环嵌套和print()进阶' },
  'L9-3': { id: 'L9-3', title: '重生之我要好评', subtitle: '学会用枚举法解决问题' },
  'L9-4': { id: 'L9-4', title: '美食大作战', subtitle: '用枚举法解决经典数学问题' },

  // PY2 L10 单元
  'L10-1': { id: 'L10-1', title: '来电了', subtitle: '认识二维列表，学会访问和修改元素' },
  'L10-2': { id: 'L10-2', title: '谁动了我的正品', subtitle: '掌握二维列表的遍历方法' },
  'L10-3': { id: 'L10-3', title: '丛林迷踪', subtitle: '修改二维列表元素与列表乘法' },
  'L10-4': { id: 'L10-4', title: '事与愿违', subtitle: '学会使用颜色传感器和车灯控制' },

  // PY2 L11 单元
  'L11-1': { id: 'L11-1', title: '明星养成记', subtitle: '学会认识函数、调用函数和多参函数' },
  'L11-2': { id: 'L11-2', title: '谁是智慧王', subtitle: '学会函数定义格式、return语句和返回值' },
  'L11-3': { id: 'L11-3', title: '神秘惊喜', subtitle: '学会智能车循线、获取货物和超声波避障' },
  'L11-4': { id: 'L11-4', title: '化敌为友', subtitle: '学会用返回值做运算和判断，以及random.choice()' },

  // PY2 L12 单元
  'L12-1': { id: 'L12-1', title: '智闯银科山', subtitle: '学会 Pygame Zero 入门和角色创建' },
  'L12-2': { id: 'L12-2', title: '探秘银科山', subtitle: '学会鼠标控制和碰撞检测' },
  'L12-3': { id: 'L12-3', title: '修复大师', subtitle: '学会键盘控制角色移动' },
  'L12-4': { id: 'L12-4', title: '重返地球', subtitle: '综合应用 Pygame Zero 游戏开发' },

  // PY3 L13 单元
  'L13-1': { id: 'L13-1', title: '猴赛雷的新衣', subtitle: '学会Pygame Zero框架和键盘控制' },
  'L13-2': { id: 'L13-2', title: '飞机大战', subtitle: '学会列表存储多角色和碰撞检测' },
  'L13-3': { id: 'L13-3', title: '疯狂躲猫猫', subtitle: '学会碰撞检测和全局变量' },
  'L13-4': { id: 'L13-4', title: '木琴敲敲敲', subtitle: '学会多角色创建和精准碰撞检测' },

  // PY3 L14 单元
  'L14-1': { id: 'L14-1', title: '魔法闹钟', subtitle: '学会clock定时器的基本使用' },
  'L14-2': { id: 'L14-2', title: '自动发球机', subtitle: '学会schedule_interval间隔定时器' },
  'L14-3': { id: 'L14-3', title: '云端探险家', subtitle: '学会角色边缘坐标属性' },
  'L14-4': { id: 'L14-4', title: '云端探险家进阶', subtitle: '完善游戏：尖刺、计分、移动踏板、难度升级' },

  // PY3 L15 单元
  'L15-1': { id: 'L15-1', title: '神奇的数列', subtitle: '学会递推思想和斐波那契数列' },
  'L15-2': { id: 'L15-2', title: '人脸识别入门', subtitle: '学会AI视觉模块的基本使用' },
  'L15-3': { id: 'L15-3', title: '智能门禁系统', subtitle: '学会门禁系统的完整逻辑' },
  'L15-4': { id: 'L15-4', title: '人脸识别进阶', subtitle: '学会人脸记录和权限判断' },

  // PY3 L16 单元
  'L16-1': { id: 'L16-1', title: '逻辑判断大师', subtitle: '学会and和or逻辑运算' },
  'L16-2': { id: 'L16-2', title: '视觉智能车', subtitle: '学会路牌识别和智能车控制' },
  'L16-3': { id: 'L16-3', title: '字符串探险家', subtitle: '学会字符串遍历和处理' },
  'L16-4': { id: 'L16-4', title: '颜色识别物流车', subtitle: '学会循线、颜色识别和物流分拣' },

  // PY3 L17 单元
  'L17-1': { id: 'L17-1', title: '声音魔法师', subtitle: '学会用音量控制游戏' },
  'L17-2': { id: 'L17-2', title: '学会用设备姿态控制游戏', subtitle: '学会用设备姿态控制游戏' },
  'L17-3': { id: 'L17-3', title: '学会平台跳跃和泡泡碰撞', subtitle: '学会平台跳跃和泡泡碰撞' },
  'L17-4': { id: 'L17-4', title: '学会背景滚动和完整游戏', subtitle: '学会背景滚动和完整游戏' },

  // PY3 L18 单元
  'L18-1': { id: 'L18-1', title: '学会关卡切换和串联', subtitle: '学会关卡切换和串联' },
  'L18-2': { id: 'L18-2', title: '学会双角色控制和合作', subtitle: '学会双角色控制和合作' },
  'L18-3': { id: 'L18-3', title: '学会射击和碰撞系统', subtitle: '学会射击和碰撞系统' },
  'L18-4': { id: 'L18-4', title: '掌握布尔类型和条件判断', subtitle: '掌握布尔类型和条件判断' }
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
