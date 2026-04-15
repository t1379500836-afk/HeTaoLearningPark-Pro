# HeTaoLearningPark-Pro 项目准则

## 项目简介

Python 少儿编程学习平台（Vue 3 + Vite），面向核桃编程学员。纯前端项目，课程数据以静态 JS 文件存储。

## 行为约束

- 删除文件/分支、重置、覆盖未提交更改等破坏性操作，必须先向用户确认
- 修改核心配置（router、构建配置）前说明影响范围
- 不主动 push 代码到远程仓库，除非用户明确要求

## 架构原则

- 组件按功能分目录：views（页面）/ components/shared（通用组件）/ components/course（课程组件）/ composables（逻辑复用）/ config（配置）/ data（数据）
- 数据与展示分离：课程数据放 data/ 目录，不混入组件
- 新增功能先检查现有组件/composable 是否可复用
- 公共逻辑提取为 composable，UI 片段提取为 shared 组件

## 前端规范

- 美观简洁，留白适当，配色与现有 CSS 变量体系一致
- 动画仅限轻量微交互：hover 效果、CSS 过渡、淡入淡出
- 不引入额外 UI 框架
- 移动端适配，最小触控目标 44px

### 页面加载状态规范

新页面必须按以下规则处理加载状态，禁止使用全局 loading 遮罩：

- **纯静态页面**（数据来自配置文件或无异步操作）：不需要任何 loading 状态，直接渲染
- **有异步数据的页面**：使用页面级 inline loading，模式如下：

```html
<template>
  <div v-if="isLoading" class="loading-state">
    <div class="spinner"></div>
    <p>正在加载...</p>
  </div>
  <template v-else>
    <!-- 正式内容 -->
  </template>
</template>
```

```css
.loading-state { text-align: center; padding: 60px 20px; }
.spinner {
  width: 50px; height: 50px;
  border: 4px solid #f3f3f3; border-top: 4px solid var(--primary-color);
  border-radius: 50%; animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}
@keyframes spin { to { transform: rotate(360deg); } }
```

## 编码风格

- 代码尽量简洁，避免过度封装
- 一个函数/组件只做一件事
- 不写用不到的参数、注释、类型声明

## 领域约束（Python 教学）

- 题目和学习内容不得超出当前阶段（PY1/PY2/PY3）的知识范围
- 题目答案必须正确，代码示例必须可运行
- 知识点顺序与 courses.config.js 中的单元定义一致
- 面向少儿，语言通俗易懂

## 文档体系

项目文档在 `docs/` 目录，对话 clear 后按需读取：

- `docs/architecture.md` — 目录结构、数据流、状态管理、路由机制。改架构前读这个。
- `docs/features.md` — 功能模块清单和路由。加功能前读这个。
- `docs/changelog.md` — 变更记录。了解近期改动时读这个。

接到开发任务时，先读对应的文档了解现状，再动手。
