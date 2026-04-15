# 架构概览

## 目录结构

```
server/                     # 后端服务（Node.js + Express）
├── index.js                # Express 入口
├── db.js                   # MySQL 连接池 + 建表
├── middleware/auth.js       # JWT 验证中间件
└── routes/
    ├── auth.js             # 教师登录接口
    └── teachers.js         # 教师 CRUD + 静态文件再生

src/
├── main.js                 # 应用入口，挂载路由和全局样式
├── App.vue                 # 根组件：导航栏 + 页面内容 + 底部栏
├── router/index.js         # 路由定义，含多前缀生成逻辑
├── config/                 # 配置文件（课程、阶段、教师）
├── composables/            # Vue 组合式函数（状态管理）
├── components/
│   ├── shared/             # 通用组件（导航、底部、弹窗等）
│   └── course/             # 课程相关组件（编辑器、练习卡片等）
├── views/                  # 页面组件（每个路由对应一个）
├── data/                   # 静态课程数据
│   ├── courses/PY1/        # PY1 的 24 课数据
│   ├── courses/PY2/        # PY2 的 24 课数据
│   ├── courses/PY3/        # PY3 的课程数据（部分）
│   ├── courses/YCL/        # YCL 考试数据和题库
│   └── chinese-typing-pool.js
└── assets/
    ├── styles/variables.css # CSS 变量（主题色、间距、断点）
    └── images/
```

## 数据流

```
管理后台操作（增/删/改教师）
  → Express 写 MySQL（立即生效）
  → 立即重新生成 src/config/teachers.config.js
  → 标记 needsBuild = true
  → 每 10 分钟定时器检查：
      有标记 → npm run build → 新 dist/ → Nginx 提供新文件
      无标记 → 跳过
```

```
URL（含前缀）
 → Router（验证前缀，解析页面组件）
  → View（读取路由参数，调用 composable）
   → Composable（useLessonData 动态 import 课程数据）
    → 数据文件（lesson-data.js）
     → 组件（通过 props 渲染）
```

## 状态管理

没有使用 Pinia/Vuex，通过 composable 的模块级变量实现单例状态：

| Composable | 作用 | 存储位置 |
|------------|------|----------|
| useAuth | 教师身份验证 | sessionStorage |
| useLoading | 全局加载状态 | 内存 |
| useLessonData | 课程数据加载 | 动态 import |
| useRoutePrefix | URL前缀与阶段权限 | 路由参数 |

## 多租户机制

三个 URL 前缀控制不同班级的阶段访问权限：

| 前缀 | 可访问阶段 |
|------|-----------|
| 无前缀 | PY1, PY2, PY3 |
| /p1 | 仅 PY1 |
| /py2 | PY1, PY2 |
| /python3 | PY1, PY2, PY3 |

同一套组件，根据前缀动态决定显示哪些内容。路由系统自动为每个前缀生成完整的路由副本。

## 课程数据结构

每节课的数据文件 (`lesson-data.js`) 导出统一结构：

```
meta          # 课程元信息（标题、难度、学习目标）
vocab         # 词汇表
knowledgePoints  # 知识点（每个含 easy/medium/hard 三级内容）
exercises     # 练习题（选择题，含答案和解析）
typingWords   # 打字练习词汇（按难度分组）
typingTemplates # 打字练习代码模板
```

## CSS 体系

所有设计令牌定义在 `variables.css` 中：
- 主题色：橙色(#ff9f00)、蓝色(#4facfe)、青色(#00f2fe)
- 间距：xs(5px) ~ xl(60px)
- 响应断点：480px / 768px / 1024px / 1280px
- 最大宽度：1200px
