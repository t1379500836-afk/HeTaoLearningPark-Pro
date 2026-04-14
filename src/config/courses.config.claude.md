# courses.config.js - 课程统一配置

## 概述

包含所有课程阶段（PY1/PY2/PY3）、单元（L1-L18）、课次的元数据配置。提供课程结构信息和辅助查询函数。

---

## 配置项

### 阶段配置 (stageConfig)

| 阶段 | ID | 名称 | 描述 | 单元列表 |
|------|----|----|------|----------|
| Python 入门基础 | `PY1` | 'Python 入门基础' | '学习Python基础知识，掌握编程入门技能' | L1-L6 |
| Python 进阶编程 | `PY2` | 'Python 进阶编程' | '深入学习Python进阶概念，提升编程能力' | L7-L12 |
| Python 高级应用 | `PY3` | 'Python 高级应用' | '掌握Python高级特性，进行实战项目开发' | L13-L18 |

### 单元配置 (unitConfig)

| 单元ID | 名称 | 描述 |
|--------|------|------|
| L1 | Level 1 | 基础语法入门 |
| L2 | Level 2 | 变量与数据类型 |
| L3 | Level 3 | 条件判断 |
| L4 | Level 4 | 循环结构 |
| L5 | Level 5 | 列表与字符串 |
| L6 | Level 6 | 综合练习 |
| L7 | Level 7 | 字符串与列表操作 |
| L8 | Level 8 | 函数进阶 |
| L9 | Level 9 | 字典与集合 |
| L10 | Level 10 | 文件操作 |
| L11 | Level 11 | 异常处理 |
| L12 | Level 12 | 模块与包 |
| L13 | Level 13 | 面向对象编程 |
| L14 | Level 14 | 类与对象进阶 |
| L15 | Level 15 | 常用算法 |
| L16 | Level 16 | 数据结构 |
| L17 | Level 17 | 项目实战（上） |
| L18 | Level 18 | 项目实战（下） |

---

## 导出函数

| 函数 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `getStageName(stageId)` | `stageId`: String | `String` | 获取阶段显示名称 |
| `getUnitInfo(unitId)` | `unitId`: String | `{id, name, description}` | 获取单元信息 |
| `getUnitLessons(unitId)` | `unitId`: String | `Array<String>` | 获取单元内的课次列表（如 ['L7-1', 'L7-2', ...]） |

---

## 使用示例

```javascript
import { getStageName, getUnitInfo, getUnitLessons } from '@/config/courses.config.js'

// 获取阶段名称
const stageName = getStageName('PY2') // 'Python 进阶编程'

// 获取单元信息
const unitInfo = getUnitInfo('L7')
// { id: 'L7', name: 'Level 7', description: '字符串与列表操作' }

// 获取单元课次列表
const lessons = getUnitLessons('L7') // ['L7-1', 'L7-2', 'L7-3', 'L7-4']
```

---

## 代码位置

- [courses.config.js:7-26](src/config/courses.config.js#L7-L26) - 阶段配置定义
- [courses.config.js:29-53](src/config/courses.config.js#L29-L53) - 单元配置定义
- [courses.config.js:56-68](src/config/courses.config.js#L56-L68) - 辅助函数

---

## 相关文件

- [src/views/CourseLevelsView.vue](src/views/CourseLevelsView.vue) - 显示阶段卡片
- [src/views/StageView.vue](src/views/StageView.vue) - 显示单元列表
- [src/views/UnitView.vue](src/views/UnitView.vue) - 显示课次列表
- [src/composables/useLessonData.js](src/composables/useLessonData.js) - 配合加载课次数据

---

## 课程结构

```
PY1 (Python 入门基础)
├── L1 ~ L6 (6个单元)
│   └── 每单元4课次 (L1-1 ~ L1-4)

PY2 (Python 进阶编程)
├── L7 ~ L12 (6个单元)
│   └── 每单元4课次 (L7-1 ~ L7-4)

PY3 (Python 高级应用)
├── L13 ~ L18 (6个单元)
│   └── 每单元4课次 (L13-1 ~ L13-4)

总计：3阶段 × 6单元 × 4课次 = 72课次
```

---

## 已知问题 & 待办

- [ ] 课次元数据（如难度、预计时间）可扩展到配置文件中
