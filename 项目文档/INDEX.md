# 项目文档导航

> AI Agent 快速定位指南

## 项目简介

核桃编程学习平台 - 为核桃编程学生提供的课后学习巩固网站，包含打字练习、Python在线编辑器、课程体系、YCL考级专区等功能。

**技术栈**: Vue 3.4.0 + Vite 5.0.0 + Vue Router 4.6.4 + Skulpt 1.2.0（CDN加载）

---

## 我要做什么？

| 场景 | 去哪里 |
|------|--------|
| 开发新课次 | [工作流/课程开发全流程.md](工作流/课程开发全流程.md) |
| 查看内容标准 | [工作流/内容开发标准.md](工作流/内容开发标准.md) |
| 了解功能需求 | [需求文档/功能需求.md](需求文档/功能需求.md) |
| 后端服务方案 | [需求文档/后端服务方案.md](需求文档/后端服务方案.md) |
| 查看项目结构 | [技术文档/项目结构.md](技术文档/项目结构.md) |
| 了解CSS变量/响应式 | [技术文档/前端布局.md](技术文档/前端布局.md) |
| 查看数据结构模板 | [技术文档/课程数据结构.md](技术文档/课程数据结构.md) |
| 维护打字练习功能 | [技术文档/打字练习.md](技术文档/打字练习.md) |
| **YCL知识点核对** | [工作流/课程开发全流程.md](工作流/课程开发全流程.md#三ycl专区知识点核对流程) |
| **YCL试卷开发规范** | [../src/data/courses/YCL/README.md](../src/data/courses/YCL/README.md) |

---

## 核心文件快速定位

| 内容 | 文件位置 | 关键行号 |
|------|----------|----------|
| 课程数据加载 | src/composables/useLessonData.js | 全文件 |
| 路由配置 | src/router/index.js | 全文件 |
| 阶段解锁配置 | src/config/stages.config.js | 全文件 |
| 教师口令配置 | src/config/teachers.config.js | 全文件 |
| 课程统一配置 | src/config/courses.config.js | 全文件 |
| OCR提取脚本 | scripts/extract_content.py | 从PDF/图片提取课程内容 |
| PY3课程文件整理 | scripts/organize_py3.py | 重命名课程文件为标准格式 |
| PY3课程数据生成 | scripts/generate_py3_lessons.py | 从content.json生成lesson-data.js |
| 打字练习组件 | src/components/course/TypingPractice.vue | 全文件 |
| Python编辑器组件 | src/components/course/CodeEditor.vue | 全文件 |
| YCL专区主页 | src/views/YCLZoneView.vue | 全文件 |
| YCL练习选择页 | src/views/YCLPracticeView.vue | 全文件 |
| YCL考试界面 | src/views/YCLExamView.vue | 全文件 |
| YCL数据入口 | src/data/courses/YCL/index.js | 统一导出 |
| YCL考情分析(5级) | src/data/courses/YCL/level5/exam-analysis.js | 知识点定义 |
| YCL理论讲解 | src/data/courses/YCL/config/theory.js | 理论内容 |
| YCL原始题库 | src/data/courses/YCL/temp-extracted/ | 待核对题目 |

### 打字练习关键代码位置

| 功能 | 文件位置 | 行号 |
|------|----------|------|
| 键盘布局定义 | src/components/course/TypingPractice.vue | 443-450 |
| 按键反馈函数 | src/components/course/TypingPractice.vue | 663-676 |
| Tab键处理 | src/components/course/TypingPractice.vue | 773-808 |
| 统计计算 | src/components/course/TypingPractice.vue | 513-531 |
| 成绩对比 | src/components/course/TypingPractice.vue | 573-638 |

---

## 文档目录树

```
项目文档/
├── INDEX.md                          # 本文件（索引入口）
│
├── 需求文档/
│   └── 功能需求.md                    # 技术选型、核心功能、YCL专区精简版
│
├── 技术文档/
│   ├── 项目结构.md                    # 目录结构 + 每个文件作用
│   ├── 前端布局.md                    # CSS变量、响应式、页面布局
│   ├── 课程数据结构.md                # lesson-data.js模板、命名规范
│   └── 打字练习.md                    # 简洁描述 + 代码位置指引
│
└── 工作流/
    ├── 课程开发全流程.md              # 正课/YCL专区知识点核对/练习题库开发流程
    └── 内容开发标准.md                # 内容数量标准、难度分布、题目生成原则
```

---

## 原始文档位置

> 原 `docs/` 文件夹保留不动，如需查看详细实现可参考

| 原文档 | 内容 |
|--------|------|
| docs/INDEX.md | 课程开发流程、内容标准、检查清单 |
| docs/01-PROJECT-STRUCTURE.md | 目录结构、路由、组件关系 |
| docs/02-FUNCTIONALITY.md | 技术选型、核心功能、限制 |
| docs/03-FRONTEND-LAYOUT.md | CSS变量、响应式、页面布局 |
| docs/04-TYPING-PRACTICE.md | 打字练习详解 |
| docs/05-COURSE-MATERIALS.md | 数据结构模板、命名规范 |
| docs/06-YCL-ZONE.md | YCL专区完整需求（122KB） |
