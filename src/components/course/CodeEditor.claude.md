# CodeEditor.vue - Python在线编辑器

## 功能特性

- **Skulpt解释器**：基于 Skulpt 1.2.0 的纯浏览器 Python 运行环境
- **CodeMirror编辑器**：Monokai深色主题，语法高亮
- **代码模板**：5个内置模板（Hello World、输入输出、变量计算、条件判断、循环）
- **input()支持**：使用浏览器原生 prompt 处理用户输入
- **实时输出**：支持标准输出和错误显示
- **CDN加载**：Skulpt 和 CodeMirror 均通过 CDN 动态加载

---

## Props API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `id` | String | - | 编辑器唯一标识符 |

---

## Events

无自定义事件。

---

## 代码模板

| 模板名 | 内容说明 |
|--------|----------|
| Hello World | 第一个Python程序 |
| 输入输出 | input() 和 print() 练习 |
| 变量与计算 | 变量和数学运算 |
| 条件判断 | if 条件判断练习 |
| 循环 | for 循环练习 |

---

## 使用示例

```vue
<template>
  <CodeEditor id="python-ide" />
</template>

<script setup>
import CodeEditor from '@/components/course/CodeEditor.vue'
</script>
```

---

## 代码位置

- [CodeEditor.vue:94-130](src/components/course/CodeEditor.vue#L94-L130) - Skulpt加载逻辑
- [CodeEditor.vue:133-152](src/components/course/CodeEditor.vue#L133-L152) - CodeMirror初始化
- [CodeEditor.vue:171-223](src/components/course/CodeEditor.vue#L171-L223) - 代码运行逻辑（input处理）

---

## input() 函数处理

使用浏览器原生 `prompt()` 实现同步输入：

```javascript
inputfun: (prompt) => {
  const result = window.prompt(prompt || '> ')
  return result !== null ? result : ''
},
inputfunTakesPrompt: true,
```

---

## 响应式设计

| 断点 | 布局变化 |
|------|----------|
| > 1024px | 编辑器和输出区域横向排列 |
| ≤ 1024px | 编辑器和输出区域纵向排列，输出高度300px |
| ≤ 768px | 侧边栏转为横向滚动，编辑器高度400px，输出高度250px |
| ≤ 480px | 按钮触控优化（44×44px最小点击区） |

---

## 支持的Python库

Skulpt 标准库包括：print, input, math, random, json, turtle 等核心模块。

**不支持**：numpy、pandas 等第三方库。

---

## 已知问题 & 待办

- [ ] Skulpt 加载较慢（约5秒），可考虑预加载
- [ ] 可扩展代码模板列表
- [ ] 代码自动保存到 localStorage
