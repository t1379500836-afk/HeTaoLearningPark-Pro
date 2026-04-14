# HeroSection.vue - Hero横幅组件

## 功能特性

- **渐变背景**：135度线性渐变（核桃橙 → 红色）
- **圆角底部**：CSS border-radius 实现弧形底部
- **悬浮动画**：CTA按钮 hover 时向上平移
- **响应式排版**：不同屏幕尺寸调整字号和间距

---

## Props API

无 Props。

---

## Events

无自定义事件。

---

## 内容结构

| 元素 | 内容 |
|------|------|
| 标题 (h1) | 开启孩子的编程探索之旅 |
| 副标题 (p) | 课前预习 · 课后复习 · 趣味打字 · 在线编程 · YCL考级冲刺 |
| CTA按钮 | 开始学习（锚点链接到 #typing） |

---

## 使用示例

```vue
<template>
  <HeroSection />
</template>

<script setup>
import HeroSection from '@/components/shared/HeroSection.vue'
</script>
```

---

## 代码位置

- [HeroSection.vue:14-20](src/components/shared/HeroSection.vue#L14-L20) - 渐变背景和圆角底部
- [HeroSection.vue:34-48](src/components/shared/HeroSection.vue#L34-L48) - CTA按钮样式

---

## 响应式设计

| 断点 | h1字号 | p字号 | 按钮尺寸 |
|------|--------|-------|----------|
| > 1024px | 2.5rem | 1.2rem | 12px 30px |
| ≤ 1024px | 2rem | 1.2rem | 12px 30px |
| ≤ 768px | 1.8rem | 1rem | 12px 30px |
| ≤ 480px | 1.5rem | 0.9rem | 10px 20px |

---

## CSS 变量使用

```css
background: linear-gradient(135deg, var(--primary-color) 0%, #ff6b6b 100%);
```

---

## 已知问题 & 待办

无。
