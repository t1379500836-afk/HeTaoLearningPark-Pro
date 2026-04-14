# StageView.vue - Level选择视图

## 路由信息

| 属性 | 值 |
|------|-----|
| 路径 | `/levels/:stage` |
| 参数 | `stage`: PY1/PY2/PY3 |
| 名称 | `stage` |

---

## 页面功能

- **解锁检查**：检查当前阶段是否解锁
- **锁定提示**：未解锁时显示锁定消息
- **Level卡片展示**：显示6个单元（L1-L6 或 L7-L12 或 L13-L18）

---

## 数据来源

- [stages.config.js](src/config/stages.config.js) - 解锁状态
- 本地配置：`stageData` 对象定义阶段和Level信息

---

## 使用示例

路由配置：
```javascript
{
  path: '/levels/:stage',
  name: 'stage',
  component: () => import('@/views/StageView.vue')
}
```

访问示例：
- `/levels/PY1` - 显示PY1的6个Level
- `/levels/PY2` - 显示PY2的6个Level

---

## 代码位置

- [StageView.vue:54-91](src/views/StageView.vue#L54-L91) - 阶段数据配置
- [StageView.vue:93-96](src/views/StageView.vue#L93-L96) - 解锁状态检查
- [StageView.vue:99-101](src/views/StageView.vue#L99-L101) - 返回课程体系

---

## 响应式设计

| 断点 | 网格列数 |
|------|----------|
| > 1024px | 3列 |
| ≤ 1024px | 2列 |
| ≤ 768px | 1列 |

---

## Level卡片数据结构

```javascript
{
  id: 'L7',           // Level ID
  name: 'Level 7',    // 显示名称
  icon: '7️⃣',        // Emoji图标
  description: '字符串与列表操作',  // 描述
  lessons: ['L7-1', 'L7-2', 'L7-3', 'L7-4']  // 包含的课次
}
```

---

## 已知问题 & 待办

无。
