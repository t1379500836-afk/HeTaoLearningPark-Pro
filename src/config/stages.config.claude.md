# stages.config.js - 阶段解锁配置

## 概述

控制不同课程阶段（PY1/PY2/PY3）对学生可见性的配置文件。老师部署时修改此文件即可控制哪些阶段对学生可见。

---

## 配置项

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `stagesConfig.PY1.unlocked` | Boolean | `true` | PY1阶段是否解锁 |
| `stagesConfig.PY2.unlocked` | Boolean | `true` | PY2阶段是否解锁 |
| `stagesConfig.PY3.unlocked` | Boolean | `true` | PY3阶段是否解锁 |
| `stagesConfig.{stage}.unlockCode` | String \| null | `null` | 预留：访问码功能（可扩展） |

---

## 导出函数

| 函数 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `getAllStages()` | - | `Array<{id, unlocked, unlockCode}>` | 获取所有阶段的配置信息 |
| `isStageUnlocked(stageId)` | `stageId`: String | `Boolean` | 检查指定阶段是否解锁 |
| `getUnlockedStages()` | - | `Array<String>` | 获取已解锁的阶段ID列表 |

---

## 使用示例

```javascript
import { isStageUnlocked, getUnlockedStages } from '@/config/stages.config.js'

// 检查PY2是否解锁
if (isStageUnlocked('PY2')) {
  // 显示PY2课程内容
}

// 获取所有已解锁的阶段
const unlockedStages = getUnlockedStages() // ['PY1', 'PY2', 'PY3']
```

---

## 代码位置

- [stages.config.js:4-17](src/config/stages.config.js#L4-L17) - 配置定义
- [stages.config.js:20-25](src/config/stages.config.js#L20-L25) - getAllStages函数
- [stages.config.js:28-30](src/config/stages.config.js#L28-L30) - isStageUnlocked函数
- [stages.config.js:33-37](src/config/stages.config.js#L33-L37) - getUnlockedStages函数

---

## 相关文件

- [src/views/CourseLevelsView.vue](src/views/CourseLevelsView.vue) - 阶段选择页面使用此配置
- [src/views/StageView.vue](src/views/StageView.vue) - Level选择页面使用此配置

---

## 已知问题 & 待办

- [ ] unlockCode 访问码功能尚未实现
- [ ] 可扩展支持基于用户角色的解锁逻辑
