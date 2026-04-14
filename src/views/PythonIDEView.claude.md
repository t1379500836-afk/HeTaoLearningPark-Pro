# PythonIDEView.vue - 独立Python编辑器视图

## 路由信息

| 属性 | 值 |
|------|-----|
| 路径 | `/python` |
| 名称 | `python` |

---

## 页面功能

- **Python编辑器**：完整的在线Python代码编辑器
- **5个模板**：Hello World、输入输出、变量计算、条件判断、循环
- **代码运行**：基于Skulpt的纯浏览器Python环境

---

## 包含组件

| 组件 | 说明 |
|------|------|
| [CodeEditor.vue](src/components/course/CodeEditor.vue) | Python在线编辑器 |

---

## 使用示例

路由配置：
```javascript
{
  path: '/python',
  name: 'python',
  component: () => import('@/views/PythonIDEView.vue')
}
```

---

## 代码位置

- [PythonIDEView.vue:8](src/views/PythonIDEView.vue#L8) - CodeEditor组件使用

---

## 响应式设计

| 断点 | 变化 |
|------|------|
| ≤ 768px | 标题字号减小至2rem |

---

## 已知问题 & 待办

无。
