# CourseLevelsView.vue - 阶段选择视图

## 路由信息

| 属性 | 值 |
|------|-----|
| 路径 | `/levels` |
| 名称 | `course-levels` |

---

## 页面功能

- **阶段卡片展示**：显示PY1/PY2/PY3三个阶段
- **解锁状态控制**：使用 `isStageUnlocked()` 检查阶段是否解锁
- **锁定提示**：点击锁定阶段跳转到 `/locked` 页面

---

## 数据来源

- [stages.config.js](src/config/stages.config.js) - 解锁状态判断
- 本地配置：`baseStages` 数组定义阶段信息

---

## 使用示例

路由配置：
```javascript
{
  path: '/levels',
  name: 'course-levels',
  component: () => import('@/views/CourseLevelsView.vue')
}
```

---

## 代码位置

- [CourseLevelsView.vue:57-79](src/views/CourseLevelsView.vue#L57-L79) - 阶段配置数组
- [CourseLevelsView.vue:82-85](src/views/CourseLevelsView.vue#L82-L85) - 解锁状态添加
- [CourseLevelsView.vue:88-90](src/views/CourseLevelsView.vue#L88-L90) - 锁定提示跳转

---

## 响应式设计

| 断点 | 网格列数 |
|------|----------|
| > 1024px | 3列 |
| ≤ 1024px | 2列 |
| ≤ 768px | 1列 |

---

## 阶段卡片结构

```
Stage Card
├── 顶部彩色边框 (--stage-color)
├── Header
│   ├── ID (PY1/PY2/PY3)
│   └── Badge (x 个 Level)
├── 标题
├── 描述
└── Level 标签列表
```

---

## 已知问题 & 待办

- [ ] 阶段描述文字为空，需要补充
