# DifficultyBadge.vue - 难度徽章组件

## 功能特性

- **3个难度级别**：easy(基础)、medium(进阶)、hard(挑战)
- **视觉区分**：不同颜色和emoji标识
- **Props验证**：自动验证level参数合法性

---

## Props API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `level` | String | `'easy'` | 难度级别：'easy' \| 'medium' \| 'hard' |

---

## Events

无自定义事件。

---

## 难度配置

| 级别 | Emoji | 标签 | 背景色 | 文字色 |
|------|-------|------|--------|--------|
| easy | 🟢 | 基础 | #e8f5e9 | #2e7d32 |
| medium | 🟡 | 进阶 | #fff8e1 | #f57f17 |
| hard | 🔴 | 挑战 | #ffebee | #c62828 |

---

## 使用示例

```vue
<template>
  <DifficultyBadge level="easy" />
  <DifficultyBadge level="medium" />
  <DifficultyBadge level="hard" />
</template>

<script setup>
import DifficultyBadge from '@/components/course/DifficultyBadge.vue'
</script>
```

---

## 代码位置

- [DifficultyBadge.vue:10-16](src/components/course/DifficultyBadge.vue#L10-L16) - Props定义和验证
- [DifficultyBadge.vue:18-27](src/components/course/DifficultyBadge.vue#L18-L27) - 配置和computed
- [DifficultyBadge.vue:30-54](src/components/course/DifficultyBadge.vue#L30-L54) - 样式定义

---

## Props验证

```javascript
validator: (value) => ['easy', 'medium', 'hard'].includes(value)
```

非法值会在开发模式下触发Vue警告。

---

## 样式规范

```css
padding: 4px 10px;
border-radius: 12px;
font-size: 0.85rem;
font-weight: 500;
```

---

## 已知问题 & 待办

无。
