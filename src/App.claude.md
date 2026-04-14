# App.vue - 根组件

## 组件功能说明

### 核心功能
- **应用入口**：Vue 应用的根组件
- **路由容器**：使用 `<RouterView>` 动态加载页面组件
- **布局结构**：导航栏 + 路由视图 + 页脚
- **Sticky Footer**：页脚始终在页面底部

---

## 实现技术细节

### 组件结构

**模板结构**：
```vue
<div id="app">
  <Navigation />       <!-- 顶部导航栏 -->
  <main class="main-content">
    <RouterView />     <!-- 路由视图，动态加载页面 -->
  </main>
  <Footer />          <!-- 页脚 -->
</div>
```

### Vue Router 集成

应用使用 Vue Router 4 实现多页面导航：
- 路由配置位于 `src/router/index.js`
- 使用 `<RouterView>` 动态渲染匹配的组件
- Navigation 组件使用 `<router-link>` 实现路由跳转

### Sticky Footer 实现

**Flex 布局**：
```css
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;  /* 占据剩余空间，将footer推到底部 */
}
```

---

## 路由结构

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | HomeView | 首页 |
| `/levels` | CourseLevelsView | 阶段选择 |
| `/levels/:stage` | StageView | 单元选择 |
| `/levels/:stage/:unit` | UnitView | 课时选择 |
| `/lesson/:stage/:unit/:lesson` | LessonView | 课时主页面 |
| `/practice` | PracticeView | 课后练习 |
| `/typing` | TypingView | 独立打字练习 |
| `/python` | PythonIDEView | 独立Python编辑器 |
| `/ycl` | YCLZoneView | YCL专区 |

---

## 已知问题 & 待办

### 待优化
- [ ] 添加页面加载动画
- [ ] 添加全局错误边界
- [ ] 添加进度条（路由切换时）

### 已完成
- [x] Vue Router 集成
- [x] 路由视图实现
- [x] 组件目录重组
