# 核桃编程学习平台 (HeTaoLearningPark-Pro)

## 项目简介

面向核桃编程学员的 Python 学习网站。提供课程学习、打字练习、在线编程、YCL 等级考试等功能。

- 技术栈：Vue 3 + Vite + Vue Router
- 纯前端项目，无后端服务
- 数据存储在 sessionStorage / localStorage

## 文档索引

| 文档 | 内容 |
|------|------|
| [architecture.md](architecture.md) | 目录结构、技术栈、数据流 |
| [features.md](features.md) | 功能模块说明 |
| [changelog.md](changelog.md) | 变更记录 |

## 快速启动

```bash
npm install
npm run dev    # 启动开发服务器，端口 5173
npm run build  # 构建生产版本
```

## 核心概念

- **阶段(Stage)**：PY1 入门 / PY2 进阶 / PY3 高级，共 18 个单元
- **单元(Unit)**：每阶段 6 个单元，每单元 4 节课（如 L5-1 ~ L5-4）
- **三级难度**：easy(1-2年级) / medium(3-4年级) / hard(5-6年级)
- **URL前缀**：通过 `/p1`、`/py2`、`/python3` 前缀控制不同班级可访问的阶段
- **教师口令**：访问前需输入教师口令验证身份，口令通过 Base64 编码存储
