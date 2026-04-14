# LessonView.vue - 课时主页面视图

## 路由信息

| 属性 | 值 |
|------|-----|
| 路径 | `/lesson/:stage/:unit/:lesson` |
| 参数 | `stage`, `unit`, `lesson` |
| 名称 | `lesson` |

---

## 页面功能

- **数据加载**：使用 `useLessonData` composable 加载课次数据
- **加载状态**：显示加载动画
- **错误处理**：显示错误信息和重试按钮
- **面包屑导航**：4级导航路径
- **学习目标展示**：清单式学习目标
- **单词卡展示**：FlashcardDisplay组件
- **知识点讲解**：KnowledgeCard组件（支持难度切换）
- **打字练习**：TypingPractice组件（单词/代码双模式）
- **课后习题**：ExerciseCard组件（支持难度筛选）
- **课程导航**：上一课/下一课按钮

---

## 包含组件

| 组件 | 说明 |
|------|------|
| [FlashcardDisplay.vue](src/components/course/FlashcardDisplay.vue) | 单词卡展示 |
| [KnowledgeCard.vue](src/components/course/KnowledgeCard.vue) | 知识点卡片 |
| [TypingPractice.vue](src/components/course/TypingPractice.vue) | 打字练习 |
| [ExerciseCard.vue](src/components/course/ExerciseCard.vue) | 习题卡片 |

---

## 数据来源

- [useLessonData.js](src/composables/useLessonData.js) - 数据加载composable
- `lesson-data.js` - 课次数据文件

---

## 使用示例

路由配置：
```javascript
{
  path: '/lesson/:stage/:unit/:lesson',
  name: 'lesson',
  component: () => import('@/views/LessonView.vue')
}
```

---

## 代码位置

- [LessonView.vue:154-184](src/views/LessonView.vue#L154-L184) - 数据加载和状态管理
- [LessonView.vue:186-211](src/views/LessonView.vue#L186-L211) - 难度筛选和习题统计
- [LessonView.vue:227-252](src/views/LessonView.vue#L227-L252) - Fisher-Yates洗牌算法和代码模板随机抽取
- [LessonView.vue:263-289](src/views/LessonView.vue#L263-L289) - 课程导航（上一课/下一课）

---

## 页面结构

```
LessonView
├── 加载/错误状态
├── 页面头部
│   ├── 面包屑导航
│   ├── 标题和副标题
│   └── 元信息（时间、难度）
├── 学习目标
├── 单词卡 (FlashcardDisplay)
├── 知识讲解 (KnowledgeCard × N)
├── 打字练习
│   ├── 模式切换（单词/代码）
│   └── TypingPractice组件
├── 课后习题
│   ├── 难度筛选
│   └── ExerciseCard × N
└── 课程导航（上一课/下一课）
```

---

## 响应式设计

| 断点 | 最大宽度 |
|------|----------|
| > 1024px | 1200px |
| ≤ 1024px | 900px |
| ≤ 768px | 100%，导航按钮纵向排列 |

---

## 已知问题 & 待办

- [ ] 单元内课次列表目前硬编码L7单元
- [ ] 可添加学习进度保存
- [ ] 可添加完成标记
