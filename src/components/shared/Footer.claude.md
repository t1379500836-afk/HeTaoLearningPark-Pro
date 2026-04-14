# Footer.vue - 页脚组件

## 功能特性

- **品牌展示**：SVG图标 + "核桃学习站" 文字
- **口号展示**：让每个孩子爱上编程，在快乐中成长
- **快速链接**：关于我们、课程介绍、练习题库、联系作者
- **版权信息**：动态显示当前年份
- **路由前缀支持**：所有链接支持课程阶段前缀（p1/py2/python3）

---

## Props API

无 Props。

---

## Events

无自定义事件。

---

## 内部状态

| 状态 | 类型 | 说明 |
|------|------|------|
| `currentYear` | `Computed<number>` | 当前年份（动态计算） |

---

## 内容结构

```
Footer
├── Logo (SVG图标 + 文字)
├── Slogan (口号)
├── Footer Links (快速链接)
│   ├── 关于我们
│   ├── 课程介绍 (#levels)
│   ├── 练习题库 (#practice)
│   └── 联系作者 (/contact)
└── Copyright (© {year} 核桃编程学习资料站)
```

---

## 使用示例

```vue
<template>
  <Footer />
</template>

<script setup>
import Footer from '@/components/shared/Footer.vue'
</script>
```

---

## 代码位置

- [Footer.vue:5-7](src/components/shared/Footer.vue#L5-L7) - SVG地球图标
- [Footer.vue:25](src/components/shared/Footer.vue#L25) - 动态年份计算

---

## 响应式设计

| 断点 | 变化 |
|------|------|
| ≤ 768px | 内边距减小，链接间距缩小，链接字号0.9rem |

---

## 样式规范

```css
background-color: #333;  /* 深灰背景 */
color: #fff;             /* 白色文字 */
margin-top: 60px;        /* 与内容区间距 */
```

---

## 已知问题 & 待办

- [ ] 链接地址部分为占位符（#），需要实现实际页面
