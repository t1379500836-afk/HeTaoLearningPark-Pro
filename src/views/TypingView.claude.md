# TypingView.vue - 独立打字练习视图

## 路由信息

| 属性 | 值 |
|------|-----|
| 路径 | `/typing` |
| 名称 | `typing` |

---

## 页面功能

- **双模式练习**：单词模式 / 代码模式
- **难度选择**：代码模式支持难度筛选（全部/基础/进阶/挑战）
- **随机关卡**：单词模式从课程题库随机选择关卡
- **排行榜**：成绩历史持久化

---

## 包含组件

| 组件 | 说明 |
|------|------|
| [TypingPractice.vue](src/components/course/TypingPractice.vue) | 打字练习组件 |

---

## 数据来源

- 本地配置：`wordLevels` 数组（PY2 L7-L8单元共8个关卡）
- [typing-templates-pool.js](src/data/courses/PY2/typing-templates-pool.js) - 代码模板池

---

## 使用示例

路由配置：
```javascript
{
  path: '/typing',
  name: 'typing',
  component: () => import('@/views/TypingView.vue')
}
```

---

## 代码位置

- [TypingView.vue:61-73](src/views/TypingView.vue#L61-L73) - 课程单词关卡配置
- [TypingView.vue:98-125](src/views/TypingView.vue#L98-L125) - Fisher-Yates洗牌算法和随机关卡选择
- [TypingView.vue:128-153](src/views/TypingView.vue#L128-L153) - 模式切换和难度设置

---

## 单词关卡列表

| 关卡ID | 标题 | 单词示例 |
|--------|------|----------|
| L7-1 | split, encode, decode, print | split, encode, decode... |
| L7-2 | weather, float, max, index | weather, float, maximum... |
| L7-3 | sum, sort, player, record | sum, sort, player... |
| L7-4 | initial, power, claw, detect | initial, power, claw... |
| L8-1 | power, note, dict, get | power, note, dict... |
| L8-2 | set, add, in, score | set, add, insert... |
| L8-3 | line, sensor, wait, time | line, sensor, wait... |
| L8-4 | reverse, count, sorted, slice | reverse, count, sorted... |

---

## 响应式设计

| 断点 | 最大宽度 |
|------|----------|
| - | 1200px |

---

## 已知问题 & 待办

- [ ] 可扩展到PY1/PY3单元的单词关卡
- [ ] 可添加关卡选择功能（当前完全随机）
