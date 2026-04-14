# Navigation.vue - 导航栏组件

## 功能特性

- **响应式设计**：桌面端横向导航栏，移动端汉堡菜单
- **自动激活状态**：当前路由对应链接高亮显示
- **路由跳转**：使用 Vue Router 进行页面导航
- **触控优化**：移动端链接满足最小 44×44px 点击区域

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
| `isMenuOpen` | `Ref<Boolean>` | 汉堡菜单展开状态 |

---

## 导航链接配置

| 路径 | 文本 | 说明 |
|------|------|------|
| `/` | 首页 | 网站首页 |
| `/levels` | 课程体系 | 阶段选择页 |
| `/practice` | 课后练习 | 练习题库（开发中） |
| `/typing` | 打字练习 | 打字练习页面 |
| `/python` | Python IDE | 在线编辑器 |
| `/ycl` | YCL专区 | 考级专区（开发中） |

---

## 使用示例

```vue
<template>
  <Navigation />
</template>

<script setup>
import Navigation from '@/components/shared/Navigation.vue'
</script>
```

---

## 代码位置

- [Navigation.vue:41-48](src/components/shared/Navigation.vue#L41-L48) - 导航链接配置
- [Navigation.vue:64-67](src/components/shared/Navigation.vue#L64-L67) - 路由激活判断逻辑
- [Navigation.vue:128-162](src/components/shared/Navigation.vue#L128-L162) - 汉堡菜单动画

---

## 响应式设计

| 断点 | 布局 |
|------|------|
| > 768px | 横向导航栏，logo 在左，链接在右 |
| ≤ 768px | 汉堡菜单，链接在右侧滑出面板（70%宽度） |
| ≤ 480px | Logo 缩小至 32px，菜单宽度 80% |

---

## 已知问题 & 待办

- [ ] 移动端菜单遮罩层（点击外部关闭）
- [ ] 导航链接配置可提取到配置文件
