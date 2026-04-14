/**
 * useLessonData - 课程数据加载 Composable
 *
 * 动态加载指定课次的课程数据
 */

import { ref, computed, watchEffect } from 'vue'

/**
 * 加载课次数据
 * @param {string} stage - 阶段 (如: 'PY2')
 * @param {string} unit - 单元 (如: 'L7')
 * @param {string} lesson - 课次 (如: 'L7-1')
 * @returns {object} 课次数据和状态
 */
export function useLessonData(stage, unit, lesson) {
  // 状态
  const lessonData = ref(null)
  const isLoading = ref(true)
  const error = ref(null)

  // 合并课次ID (用于兼容不同格式)
  const lessonId = computed(() => {
    // 如果 lesson 已经包含单元信息 (如 'L7-1')
    if (lesson.value && lesson.value.includes('-')) {
      return lesson.value
    }
    // 否则组合单元和课次 (如 'L7' + '1' = 'L7-1')
    return `${unit.value}-${lesson.value}`
  })

  // 加载数据的函数
  const loadLesson = async () => {
    if (!stage.value || !lessonId.value) {
      return
    }

    isLoading.value = true
    error.value = null

    try {
      // 动态导入课次数据（使用相对路径）
      const module = await import(
        `../data/courses/${stage.value}/lessons/${lessonId.value}/lesson-data.js`
      )

      // 检查默认导出（所有lesson-data.js都有默认导出）
      lessonData.value = module.default || module
    } catch (err) {
      console.error('Failed to load lesson data:', err)
      error.value = `无法加载课次数据: ${lessonId.value}`
      // 使用空数据作为后备
      lessonData.value = createEmptyLesson(lessonId.value)
    } finally {
      isLoading.value = false
    }
  }

  // 创建空课次数据（用于错误情况）
  const createEmptyLesson = (id) => ({
    meta: {
      id,
      title: '课次未找到',
      subtitle: '数据加载中...',
    },
    vocab: [],
    knowledgePoints: [],
    exercises: [],
    typingWords: { easy: [], medium: [], hard: [] },
    typingTemplates: { easy: [], medium: [], hard: [] }
  })

  // 监听参数变化，自动重新加载数据
  watchEffect(() => {
    if (stage.value && lessonId.value) {
      loadLesson()
    }
  })

  // 计算属性
  const meta = computed(() => lessonData.value?.meta || {})
  const vocab = computed(() => lessonData.value?.vocab || [])
  const knowledgePoints = computed(() => lessonData.value?.knowledgePoints || [])
  const exercises = computed(() => lessonData.value?.exercises || [])
  const typingWords = computed(() => lessonData.value?.typingWords || {})
  const typingTemplates = computed(() => lessonData.value?.typingTemplates || {})

  // 按难度筛选习题
  const getExercisesByLevel = (level) => {
    return exercises.value.filter(ex => ex.level === level)
  }

  // 获取指定难度的知识点内容
  const getKnowledgeContent = (kpId, level = 'easy') => {
    const kp = knowledgePoints.value.find(k => k.id === kpId)
    return kp?.[level] || kp?.easy || null
  }

  return {
    // 状态
    lessonData,
    isLoading,
    error,
    lessonId,

    // 数据
    meta,
    vocab,
    knowledgePoints,
    exercises,
    typingWords,
    typingTemplates,

    // 方法
    getExercisesByLevel,
    getKnowledgeContent,
    reload: loadLesson
  }
}

export default useLessonData
