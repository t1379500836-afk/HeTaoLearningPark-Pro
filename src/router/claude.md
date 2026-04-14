# Vue Router 配置文档

## 概述

应用使用 Vue Router 4 实现单页面应用（SPA）的多页面导航，支持完整的课程体系学习流程。

---

## 路由配置

### 有效路由前缀

系统支持三种路由前缀，用于隔离不同教师口令的访问权限：

| 前缀 | 可访问阶段 | 说明 |
|------|-----------|------|
| `p1` | PY1 | 只能访问 PY1 内容 |
| `py2` | PY1, PY2 | 可访问 PY1 和 PY2 内容 |
| `python3` | PY1, PY2, PY3 | 可访问全部 Python 内容 |

### 路由列表

| 路由模式 | 组件 | 说明 | Props |
|---------|------|------|-------|
| `/` | HomeView | 首页，快速入口卡片 | - |
| `/levels` | CourseLevelsView | 阶段选择（PY1/PY2/PY3） | - |
| `/levels/:stage` | StageView | 单元选择（L1-L6） | stage |
| `/levels/:stage/:unit` | UnitView | 课时选择（4课时/单元） | stage, unit |
| `/lesson/:stage/:unit/:lesson` | LessonView | 课时主页面 | stage, unit, lesson |
| `/practice` | PracticeView | 课后练习（每日一练） | - |
| `/typing` | TypingView | 独立打字练习 | - |
| `/python` | PythonIDEView | 独立Python编辑器 | - |
| `/ycl` | YCLZoneView | YCL专区 | - |
| `/:pathMatch(.*)*` | NotFoundView | 404 页面（无导航） | - |

### 路由参数说明

- `stage`: 阶段代码（PY1、PY2、PY3）
- `unit`: 单元代码（L1 ~ L18）
- `lesson`: 课时代码（如 L1-1、L1-2 等）

---

## 404 处理与无效前缀拦截

### 设计目的

防止用户通过猜测 URL 访问未授权内容。只有知道正确前缀（如 `/python3`）的用户才能访问相应内容。

### 实现机制

1. **路由守卫** (`beforeEach`)：
   - 检查路径的第一段是否为有效前缀或基础路由
   - 无效前缀（如 `/py3`、`/abc`）重定向到 404 页面

2. **404 页面特性**：
   - 不显示页头（Navigation）和页脚（Footer）
   - 不提供任何导航按钮
   - 用户被"锁死"在 404 页面，只能通过修改地址栏离开

### 有效路径判断逻辑

```javascript
// 有效前缀
const validPrefixes = ['p1', 'py2', 'python3']

// 基础路由路径（不带前缀）
const baseRoutePaths = ['levels', 'lesson', 'practice', 'typing', 'python', 'ycl', 'locked', 'contact']

// 路由守卫逻辑
if (to.name === 'not-found') return next()                // 已是 404 路由，放行
if (validPrefixes.includes(firstSegment)) return next()   // 有效前缀，放行
if (baseRoutePaths.includes(firstSegment)) return next()  // 基础路由，放行
return next({ name: 'not-found', replace: true })         // 其他情况，404

// App.vue 中的 404 检测逻辑
const is404Page = computed(() => route.name === 'not-found' || route.meta?.is404 === true)
```

### 访问示例

| 访问路径 | 结果 |
|---------|------|
| `/` | ✅ 正常显示首页 |
| `/python3` | ✅ 正常显示首页（带 python3 前缀限制） |
| `/p1/levels` | ✅ 只显示 PY1 阶段 |
| `/py2/levels` | ✅ 显示 PY1 和 PY2 阶段 |
| `/py3` | ❌ 404 页面（无页头页脚） |
| `/abc` | ❌ 404 页面（无页头页脚） |
| `/python3/xyz` | ❌ 404 页面（无效子路径） |

### 相关文件

| 文件 | 说明 |
|------|------|
| [router/index.js](./index.js) | 路由配置、路由守卫 |
| [views/NotFoundView.vue](../views/NotFoundView.vue) | 404 页面组件 |
| [App.vue](../App.vue) | 404 页面隐藏页头页脚逻辑 |
| [composables/useRoutePrefix.js](../composables/useRoutePrefix.js) | 前缀解析与权限控制 |

---

## 代码结构

### router/index.js

```javascript
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  // ... 其他路由配置
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }  // 路由切换时滚动到顶部
  }
})

export default router
```

### main.js 集成

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

---

## 导航实现

### Navigation.vue

使用 `<router-link>` 实现路由跳转：

```vue
<template>
  <nav>
    <router-link to="/">首页</router-link>
    <router-link to="/levels">课程体系</router-link>
    <!-- ... -->
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// 判断路由是否激活
const isActive = (to) => {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}
</script>
```

### 编程式导航

```javascript
import { useRouter } from 'vue-router'

const router = useRouter()

// 跳转到课程页面
router.push('/levels')

// 跳转到课时页面（带参数）
router.push(`/lesson/${stage}/${unit}/${lesson}`)
```

---

## 滚动行为

路由切换时自动滚动到页面顶部：

```javascript
scrollBehavior(to, from, savedPosition) {
  if (savedPosition) return savedPosition  // 恢复滚动位置
  return { top: 0 }  // 滚动到顶部
}
```

---

## 懒加载

所有页面组件使用动态导入实现代码分割：

```javascript
component: () => import('@/views/HomeView.vue')
```

这样可以：
- 减少初始加载时间
- 按需加载页面组件
- 优化用户体验

---

## 路径别名

配置文件 `vite.config.js` 中定义了 `@` 别名指向 `src` 目录：

```javascript
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url))
  }
}
```

使用示例：
```javascript
import HomeView from '@/views/HomeView.vue'
import Navigation from '@/components/shared/Navigation.vue'
```
