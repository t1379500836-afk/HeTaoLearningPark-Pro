# UnitView.vue - 课时选择视图

## 路由信息

| 属性 | 值 |
|------|-----|
| 路径 | `/levels/:stage/:unit` |
| 参数 | `stage`: PY1/PY2/PY3, `unit`: L1-L18 |
| 名称 | `unit` |

---

## 页面功能

- **动态加载课次**：动态import加载每个课次的 `lesson-data.js`
- **错误处理**：文件不存在时使用默认值
- **面包屑导航**：显示层级导航路径
- **课次卡片**：显示课次标题和描述

---

## 数据来源

- [courses.config.js](src/config/courses.config.js) - 阶段和单元信息
- `lesson-data.js` - 课次元数据（动态加载）

---

## 使用示例

路由配置：
```javascript
{
  path: '/levels/:stage/:unit',
  name: 'unit',
  component: () => import('@/views/UnitView.vue')
}
```

访问示例：
- `/levels/PY2/L7` - 显示PY2 L7单元的4个课次

---

## 代码位置

- [UnitView.vue:48-78](src/views/UnitView.vue#L48-L78) - 课次数据加载逻辑
- [UnitView.vue:57-59](src/views/UnitView.vue#L57-L59) - 动态import路径

---

## 响应式设计

| 断点 | 变化 |
|------|------|
| ≤ 768px | 单列布局，卡片内边距减小 |

---

## 课次卡片元数据标签

| 标签 | 说明 |
|------|------|
| 📖 知识点 | 包含知识讲解 |
| ⌨️ 打字练习 | 包含打字练习 |
| ✏️ 课后习题 | 包含课后习题 |

---

## 已知问题 & 待办

- [ ] 课次描述数据可能需要完善
- [ ] 可添加学习进度标记
