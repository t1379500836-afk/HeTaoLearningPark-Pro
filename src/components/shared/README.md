# Shared Components 目录

共享组件，可在多个页面中复用。

## 文件列表

| 组件 | 说明 |
|------|------|
| Navigation.vue | 顶部导航栏，使用 `<router-link>` 实现路由跳转 |
| HeroSection.vue | Hero横幅组件，用于首页展示 |
| Footer.vue | 页脚组件，显示版权和链接 |
| StageLocked.vue | 阶段锁定提示组件 |

## Navigation.vue

使用 `vue-router` 的 `<router-link>` 组件实现导航：

```vue
<router-link to="/">首页</router-link>
<router-link to="/levels">课程体系</router-link>
```

激活状态通过 `useRoute()` 检测当前路由判断。
