# PracticeView.vue - 课后练习视图

## 路由信息

| 属性 | 值 |
|------|-----|
| 路径 | `/practice` |
| 名称 | `practice` |
| 状态 | 🚧 开发中 |

---

## 页面功能

- **占位页面**：显示"课后练习模块开发中..."提示
- **快捷跳转**：提供"去课程体系"按钮

---

## 使用示例

路由配置：
```javascript
{
  path: '/practice',
  name: 'practice',
  component: () => import('@/views/PracticeView.vue')
}
```

---

## 代码位置

- [PracticeView.vue:2-14](src/views/PracticeView.vue#L2-L14) - 页面模板

---

## 开发计划

**待实现功能**：
- 每日一练题目
- 智能推荐练习
- 错题本
- 学习统计

---

## 已知问题 & 待办

- [ ] 实现课后练习功能
- [ ] 设计练习题目数据结构
