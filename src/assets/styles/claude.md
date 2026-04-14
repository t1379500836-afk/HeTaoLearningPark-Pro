# styles - CSS变量系统

## 功能说明

### 核心功能
- **CSS变量定义**：统一管理主题色、间距、圆角、阴影等
- **全局重置**：重置浏览器默认样式
- **响应式基础**：提供一致的设计系统

---

## 变量分类

### 主题色彩
```css
--primary-color: #ff9f00      /* 核桃橙 - 主色调 */
--secondary-color: #4facfe    /* 天空蓝 - 次要色 */
--accent-color: #00f2fe       /* 强调色 */
--text-color: #333            /* 文字颜色 */
--bg-color: #f9f9f9           /* 背景色 */
--card-bg: #ffffff            /* 卡片背景 */
```

### 状态色彩
```css
--success-color: #2ecc71      /* 成功绿 */
--warning-color: #f1c40f      /* 警告黄 */
--danger-color: #e74c3c       /* 危险红 */
```

### 编辑器色彩
```css
--editor-bg: #282c34          /* 编辑器背景 */
--editor-sidebar: #f1f1f1     /* 编辑器侧边栏 */
```

### 打字练习色彩
```css
--typing-bg: #2d3436          /* 打字练习背景 */
--typing-text: #fff           /* 打字练习文字 */
--typing-key: #555            /* 按键边框 */
--typing-key-active: #ff9f00  /* 激活按键 */
```

### YCL专区色彩
```css
--ycl-primary: #6c5ce7        /* YCL紫色 */
--ycl-secondary: #a29bfe      /* YCL浅紫 */
--ycl-badge: #fdcb6e          /* YCL徽章 */
```

### 字体
```css
--font-main: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
--font-code: 'Consolas', 'Courier New', monospace;
```

### 间距系统
```css
--spacing-xs: 5px
--spacing-sm: 10px
--spacing-md: 20px
--spacing-lg: 40px
--spacing-xl: 60px
```

### 圆角系统
```css
--radius-sm: 5px
--radius-md: 10px
--radius-lg: 15px
--radius-pill: 50px
```

### 阴影系统
```css
--shadow-sm: 0 2px 10px rgba(0,0,0,0.1)
--shadow-md: 0 5px 15px rgba(0,0,0,0.05)
--shadow-lg: 0 10px 25px rgba(0,0,0,0.1)
--shadow-editor: 0 10px 30px rgba(0,0,0,0.15)
```

---

## 使用方式

### 在组件中引用
```vue
<style scoped>
.my-button {
  background-color: var(--primary-color);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}
</style>
```

### 主题切换（待实现）
```javascript
// 可以通过修改 CSS 变量实现主题切换
document.documentElement.style.setProperty('--primary-color', '#新颜色')
```

---

## 已知问题 & 待办

### 待优化
- [ ] 添加深色模式变量
- [ ] 考虑使用 CSS 预处理器（Sass/Less）
- [ ] 添加更多动画相关变量

### 已修复的问题
- 无（系统目前运行稳定）
