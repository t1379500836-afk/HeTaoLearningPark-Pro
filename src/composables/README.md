# Composables 目录

Vue 3 Composition API 可复用逻辑（Composables）。

## 文件列表

| 文件 | 说明 | 状态 |
|------|------|------|
| useLessonData.js | 课程数据加载逻辑 | ✅ 已实现 |
| useProgress.js | 用户进度跟踪逻辑 | 待创建 |

## useLessonData.js

动态加载指定课次的课程数据。

**文件路径**: `src/composables/useLessonData.js`

### 使用方式

```javascript
import { useLessonData } from '@/composables/useLessonData.js'

// 在 LessonView.vue 中使用
const stage = computed(() => route.params.stage)    // 'PY2'
const unit = computed(() => route.params.unit)      // 'L7'
const lesson = computed(() => route.params.lesson)  // '1' 或 'L7-1'

const {
  lessonData,      // 完整的课次数据对象
  isLoading,       // 加载状态
  error,           // 错误信息
  lessonId,        // 课次ID (如 'L7-1')
  meta,            // 课次元数据
  vocab,           // 单词卡数据
  knowledgePoints, // 知识点数据
  exercises,       // 习题数据
  typingWords,     // 打字练习单词
  getExercisesByLevel, // 按难度筛选习题
  reload           // 重新加载数据
} = useLessonData(stage, unit, lesson)
```

### 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| `lessonData` | Ref\<Object\> | 完整的课次数据对象 |
| `isLoading` | Ref\<Boolean\> | 数据加载状态 |
| `error` | Ref\<String\> | 错误信息（如有） |
| `lessonId` | Ref\<String\> | 课次ID (如 'L7-1') |
| `meta` | Ref\<Object\> | 课次元数据（标题、难度等） |
| `vocab` | Ref\<Array\> | 单词卡数据 |
| `knowledgePoints` | Ref\<Array\> | 知识点数据 |
| `exercises` | Ref\<Array\> | 习题数据 |
| `typingWords` | Ref\<Object\> | 打字练习单词 |
| `getExercisesByLevel` | Function | 按难度筛选习题 |
| `reload` | Function | 重新加载数据 |

### getExercisesByLevel(level)

按难度筛选习题。

```javascript
const easyExercises = getExercisesByLevel('easy')    // 🟢 基础题
const mediumExercises = getExercisesByLevel('medium') // 🟡 进阶题
const hardExercises = getExercisesByLevel('hard')     // 🔴 挑战题
```

### 数据文件路径

Composable 会动态导入以下路径的数据文件：

```
src/data/courses/{stage}/lessons/{lessonId}/lesson-data.js
```

示例：
- `src/data/courses/PY2/lessons/L7-1/lesson-data.js`
- `src/data/courses/PY2/lessons/L7-2/lesson-data.js`

### 数据文件格式

参考 [LESSON_DEVELOPMENT_GUIDE.md](../data/courses/LESSON_DEVELOPMENT_GUIDE.md)

---

## useProgress.js (待实现)

用户学习进度跟踪（localStorage）：

```javascript
import { ref } from 'vue'

const STORAGE_KEY = 'hetao_progress'

export function useProgress() {
  const completedLessons = ref(new Set())

  function markLessonComplete(lessonId) {
    completedLessons.value.add(lessonId)
    // 保存到 localStorage
  }

  return { completedLessons, markLessonComplete }
}
```
