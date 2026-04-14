# Views 目录

页面级组件，对应路由中的各个页面。

## 文件列表

| 文件 | 路由 | 说明 |
|------|------|------|
| HomeView.vue | `/` | 首页 |
| CourseLevelsView.vue | `/levels` | 阶段选择（PY1/PY2/PY3） |
| StageView.vue | `/levels/:stage` | 单元选择（L1-L18） |
| UnitView.vue | `/levels/:stage/:unit` | 课时选择 |
| LessonView.vue | `/lesson/:stage/:unit/:lesson` | 课时主页面 |
| PracticeView.vue | `/practice` | 课后练习 |
| TypingView.vue | `/typing` | 独立打字练习 |
| PythonIDEView.vue | `/python` | 独立Python编辑器 |
| YCLZoneView.vue | `/ycl` | YCL专区 |

## 数据加载

课程数据通过 `useLessonData` composable 动态加载：
- 阶段/单元配置：`src/config/courses.config.js`
- 课次数据：`src/data/courses/{PY1/PY2/PY3}/lessons/{课次}/lesson-data.js`
