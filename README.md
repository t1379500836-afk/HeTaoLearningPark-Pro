# 核桃编程学习平台

> 为核桃编程学生提供的课后学习巩固网站，包含打字练习、Python在线编辑器等功能。

**技术栈**: Vue 3 + Vite + Vue Router + Skulpt（浏览器内Python运行时）

---

## 快速开始

```bash
# 安装依赖
npm install

# 运行开发服务器
npm run dev

# 构建生产版本
npm run build
```

访问 http://localhost:5173

---

## 文档导航

| 文档 | 说明 |
|------|------|
| [文档中心](./docs/INDEX.md) | 📚 完整文档索引 |
| [项目结构](./docs/01-PROJECT-STRUCTURE.md) | 目录结构、路由表、组件关系 |
| [功能需求](./docs/02-FUNCTIONALITY.md) | 技术选型、功能清单、已知限制 |
| [前端布局](./docs/03-FRONTEND-LAYOUT.md) | CSS变量、响应式、页面跳转 |
| [打字练习](./docs/04-TYPING-PRACTICE.md) | 打字练习实现详解 |
| [课程资料](./docs/05-COURSE-MATERIALS.md) | ⭐ 课程资料开发指南（核心） |

---

## 核心功能

- **Python在线编辑器**：集成 CodeMirror，支持 Python 语法高亮，通过 Skulpt 本地执行
- **打字练习模块**：单词模式 + 代码模式，虚拟键盘反馈，排行榜
- **课程体系**：3个阶段（PY1/PY2/PY3），18个单元，72次课
  - 阶段卡片采用差异化配色（橙色/蓝色/玫粉色）
  - 课程详情页设有悬浮返回按钮，方便层级导航

---

## 项目结构

```
hetao-learning-park/
├── docs/                    # 文档目录
├── src/
│   ├── config/              # 配置文件
│   ├── router/              # 路由配置
│   ├── views/               # 页面视图
│   ├── components/          # 组件
│   ├── composables/         # 可复用逻辑
│   └── data/                # 课程数据
└── package.json
```

详细结构见：[01-项目结构](./docs/01-PROJECT-STRUCTURE.md)

---

## 开发规范

### CSS使用规范
- 优先使用 CSS 变量（`var(--primary-color)`）
- 响应式断点：1024px, 768px, 480px
- 组件样式使用 `<style scoped>`

### 响应式设计
- 支持设备：电脑、平板、手机、学习机
- 移动端触控区域最小 44×44px
- 避免固定像素，使用 rem/em 相对单位

---

## 已知限制

### Python编辑器 (Skulpt)
- 支持标准库：print、input、math、random、json、turtle 等
- **不支持**第三方库：numpy、pandas 等
- 在 `while True` 等无限循环中使用 input() 可能导致无法停止

---

## 相关链接

- [文档中心](./docs/INDEX.md)
- [Claude 开发指南](./claude.md) - AI助手专用
