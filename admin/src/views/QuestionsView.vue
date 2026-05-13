<template>
  <div class="questions-view">
    <div class="view-header">
      <h3>题库管理</h3>
      <el-button type="primary" @click="openAddDialog" class="add-btn">
        <el-icon><Plus /></el-icon> 新增题目
      </el-button>
    </div>

    <div class="filter-bar">
      <el-select v-model="filterType" placeholder="题目类型" clearable style="width: 120px">
        <el-option label="全部" value="" />
        <el-option label="选择题" value="choice" />
        <el-option label="编程题" value="program" />
      </el-select>
      <el-select v-model="filterDifficulty" placeholder="难度" clearable style="width: 100px">
        <el-option label="全部" value="" />
        <el-option label="简单" value="easy" />
        <el-option label="中等" value="medium" />
        <el-option label="困难" value="hard" />
      </el-select>
      <el-button
        class="tag-filter-btn"
        :class="{ 'has-selection': selectedTagIds.length > 0 }"
        @click="openTagModal"
      >
        <span v-if="selectedTagIds.length === 0">选择标签</span>
        <span v-else>已选 {{ selectedTagIds.length }} 个标签</span>
        <el-icon class="arrow-icon"><ArrowDown /></el-icon>
      </el-button>
      <el-input v-model="searchText" placeholder="搜索编号或标题..." clearable style="max-width: 200px" />
    </div>

    <!-- 已选标签展示 -->
    <div v-if="selectedTags.length > 0" class="selected-tags-bar">
      <span
        v-for="tag in selectedTags"
        :key="tag.id"
        class="selected-tag-pill"
        :style="{ background: tag.color + '20', color: tag.color, borderColor: tag.color + '40' }"
        @click="toggleTagFilter(tag.id)"
      >
        {{ tag.name }}
        <span class="remove-icon">×</span>
      </span>
      <el-button link size="small" @click="clearSelectedTags" class="clear-btn">清空</el-button>
    </div>

    <div class="table-card">
      <el-table :data="questions" stripe v-loading="loading" empty-text="暂无题目">
        <el-table-column label="编号" width="90">
          <template #default="{ row }">
            <span class="question-id">T{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" min-width="180">
          <template #default="{ row }">
            <span class="question-title">{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="90">
          <template #default="{ row }">
            <el-tag :type="row.type === 'choice' ? 'success' : 'warning'" size="small">
              {{ row.type === 'choice' ? '选择题' : '编程题' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="难度" width="80">
          <template #default="{ row }">
            <el-tag :type="getDifficultyType(row.difficulty)" size="small">
              {{ getDifficultyText(row.difficulty) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="标签" min-width="120">
          <template #default="{ row }">
            <span v-if="!row.tags || row.tags.length === 0" class="no-tags">无</span>
            <el-tag
              v-for="tagId in (Array.isArray(row.tags) ? row.tags : JSON.parse(row.tags || '[]'))"
              :key="tagId"
              size="small"
              :style="{ background: getTagColor(tagId), borderColor: getTagColor(tagId), color: '#fff', marginRight: '4px' }"
            >
              {{ getTagName(tagId) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="openEditDialog(row)">编辑</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next"
          background
          size="small"
        />
      </div>
    </div>

    <!-- 新增/编辑题目对话框 -->
    <el-dialog v-model="dialogVisible" width="min(700px, 95vw)" destroy-on-close class="question-dialog">
      <template #header>
        <div class="dialog-header">
          <span class="dialog-icon">{{ isEditing ? '✏️' : '📝' }}</span>
          <span class="dialog-title">{{ isEditing ? '编辑题目' : '新增题目' }}</span>
        </div>
      </template>

      <el-form label-position="top" class="dialog-form">
        <div class="form-row">
          <el-form-item label="题目类型" style="flex: 1">
            <el-select v-model="form.type" style="width: 100%">
              <el-option label="选择题" value="choice" />
              <el-option label="编程题" value="program" />
            </el-select>
          </el-form-item>
          <el-form-item label="难度" style="flex: 1">
            <el-select v-model="form.difficulty" style="width: 100%">
              <el-option label="简单" value="easy" />
              <el-option label="中等" value="medium" />
              <el-option label="困难" value="hard" />
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="标题">
          <el-input v-model="form.title" maxlength="200" show-word-limit placeholder="输入题目标题..." />
        </el-form-item>

        <el-form-item label="题目描述（文字）">
          <el-input v-model="form.textContent" type="textarea" :rows="3" placeholder="输入题目描述文字..." />
        </el-form-item>

        <el-form-item label="代码区域（可选）">
          <el-input v-model="form.codeContent" type="textarea" :rows="6" placeholder="输入Python代码，会自动格式化显示..." />
          <div class="code-hint">如有代码，会显示为带缩进的代码块；没有则只显示文字</div>
        </el-form-item>

        <el-form-item label="标签">
          <div class="tag-selector">
            <div v-if="form.tags.length > 0" class="selected-tags-bar">
              <span
                v-for="tagId in form.tags"
                :key="tagId"
                class="selected-tag-pill"
                :style="{ background: getTagColor(tagId), borderColor: getTagColor(tagId), color: '#fff' }"
                @click="toggleTag(tagId)"
              >
                {{ getTagName(tagId) }}
                <span class="remove-icon">×</span>
              </span>
            </div>
            <el-input
              v-model="tagSearchKeyword"
              placeholder="搜索标签..."
              clearable
              class="tag-search-input"
            />
            <div class="tag-tree-wrapper">
              <TagTree
                :nodes="filteredTagTree"
                :selected-ids="form.tags"
                @toggle="toggleTag"
              />
            </div>
          </div>
        </el-form-item>

        <!-- 选择题选项 -->
        <template v-if="form.type === 'choice'">
          <el-form-item label="选项（选择正确答案）">
            <div class="choices-list">
              <div v-for="(choice, idx) in form.choices" :key="idx" class="choice-item">
                <el-radio v-model="choice.isCorrect" :value="true" @change="onCorrectChange(idx)">正确</el-radio>
                <el-input v-model="choice.content" type="textarea" :rows="1" placeholder="选项内容，支持多行..." autosize class="multi-line-input" />
                <el-button type="danger" link @click="removeChoice(idx)" :disabled="form.choices.length <= 2">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </div>
            </div>
            <el-button type="primary" link @click="addChoice" class="add-choice-btn">
              <el-icon><Plus /></el-icon> 添加选项
            </el-button>
          </el-form-item>
        </template>

        <!-- 编程题测试用例 -->
        <template v-if="form.type === 'program'">
          <el-form-item label="测试用例（输入/期望输出/分值）">
            <div class="testcases-list">
              <div v-for="(tc, idx) in form.test_cases" :key="idx" class="testcase-item">
                <el-input v-model="tc.input" type="textarea" :rows="1" placeholder="输入" autosize class="multi-line-input" />
                <el-input v-model="tc.expectedOutput" type="textarea" :rows="1" placeholder="期望输出" autosize class="multi-line-input" />
                <div class="score-stepper">
                  <button type="button" class="stepper-btn" @click="tc.score = Math.max(0, (Number(tc.score) || 0) - 1)">-</button>
                  <input
                    v-model.number="tc.score"
                    type="number"
                    min="0"
                    placeholder="分值"
                    class="stepper-input"
                  />
                  <button type="button" class="stepper-btn" @click="tc.score = (Number(tc.score) || 0) + 1">+</button>
                </div>
                <el-button type="danger" link @click="removeTestCase(idx)" :disabled="form.test_cases.length <= 1">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </div>
            </div>
            <!-- 随机数提示区域 -->
            <div class="random-hint-box">
              <div class="random-hint-title">
                <el-icon><InfoFilled /></el-icon>
                <span>支持随机数验证：使用 <code>__RANDOM_类型__最小值-最大值__</code> 格式</span>
              </div>
              <div class="random-hint-items">
                <el-tag
                  class="random-template-tag"
                  effect="plain"
                  @click="copyTemplate('__RANDOM_SUM__1-100__')"
                >
                  示例：__RANDOM_SUM__1-100__
                  <el-icon class="copy-icon"><CopyDocument /></el-icon>
                </el-tag>
              </div>
            </div>
            <el-button type="primary" link @click="addTestCase" class="add-choice-btn">
              <el-icon><Plus /></el-icon> 添加测试用例
            </el-button>
          </el-form-item>
        </template>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" :loading="submitting" @click="handleSave" class="save-btn">
            {{ isEditing ? '保存' : '创建' }}
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 标签筛选弹窗 -->
    <el-dialog v-model="tagModalVisible" title="选择标签" width="min(400px, 92vw)" destroy-on-close class="tag-filter-dialog">
      <div class="tag-filter-content">
        <el-input
          v-model="filterTagSearchKeyword"
          placeholder="搜索标签..."
          clearable
          class="tag-filter-search"
          prefix-icon="Search"
        />
        <div class="tag-filter-tree">
          <TagTree
            :nodes="filteredTagTreeForFilter"
            :selected-ids="selectedTagIds"
            @toggle="toggleTagFilter"
          />
          <div v-if="filteredTagTreeForFilter.length === 0" class="tag-filter-empty">
            未找到匹配的标签
          </div>
        </div>
      </div>
      <template #footer>
        <div class="tag-filter-footer">
          <span class="tag-selected-count">已选 {{ selectedTagIds.length }} 个标签</span>
          <div class="tag-filter-actions">
            <el-button @click="clearSelectedTags" link>清空</el-button>
            <el-button type="primary" @click="tagModalVisible = false">确定</el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import api from '../api.js'
import TagTree from '../components/TagTree.vue'

const questions = ref([])
const allTags = ref([])
const loading = ref(false)
const filterType = ref('')
const filterDifficulty = ref('')
const searchText = ref('')
const tagSearchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const dialogVisible = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const submitting = ref(false)

// 标签筛选相关
const tagModalVisible = ref(false)
const selectedTagIds = ref([])
const filterTagSearchKeyword = ref('')

// 已选标签对象数组（用于展示）
const selectedTags = computed(() => {
  return allTags.value.filter(t => selectedTagIds.value.includes(t.id))
})

// 标签筛选弹窗中的标签树
const filteredTagTreeForFilter = computed(() => {
  const kw = filterTagSearchKeyword.value.trim().toLowerCase()
  if (!kw) return tagTree.value

  function flatten(nodes, result = []) {
    nodes.forEach(n => {
      result.push(n)
      if (n.children && n.children.length > 0) flatten(n.children, result)
    })
    return result
  }

  const flat = flatten(tagTree.value)
  const matchedIds = new Set()

  flat.forEach(t => {
    if (t.name.toLowerCase().includes(kw)) {
      matchedIds.add(t.id)
      let parent = flat.find(p => p.children?.some(c => c.id === t.id))
      while (parent) {
        matchedIds.add(parent.id)
        parent = flat.find(p => p.children?.some(c => c.id === parent.id))
      }
    }
  })

  function filterTree(nodes) {
    return nodes.map(node => {
      const children = node.children ? filterTree(node.children) : []
      if (matchedIds.has(node.id) || children.length > 0) {
        return { ...node, children }
      }
      return null
    }).filter(Boolean)
  }

  return filterTree(tagTree.value)
})

function openTagModal() {
  tagModalVisible.value = true
  filterTagSearchKeyword.value = ''
}

function toggleTagFilter(tagId) {
  const idx = selectedTagIds.value.indexOf(tagId)
  if (idx >= 0) {
    selectedTagIds.value.splice(idx, 1)
  } else {
    selectedTagIds.value.push(tagId)
  }
}

function clearSelectedTags() {
  selectedTagIds.value = []
}

const defaultForm = () => ({
  title: '',
  content: '',
  textContent: '',
  codeContent: '',
  type: 'choice',
  difficulty: 'medium',
  tags: [],
  choices: [
    { content: '', isCorrect: true },
    { content: '', isCorrect: false }
  ],
  test_cases: [
    { input: '', expectedOutput: '', score: 10 }
  ]
})

// 复制模板到剪贴板
async function copyTemplate(value) {
  try {
    await navigator.clipboard.writeText(value)
    ElMessage.success(`已复制: ${value}`)
  } catch (err) {
    ElMessage.error('复制失败，请手动复制')
  }
}

const form = ref(defaultForm())

const tagTree = computed(() => {
  const map = new Map()
  allTags.value.forEach(t => map.set(t.id, { ...t, children: [] }))
  const roots = []
  map.forEach(tag => {
    if (tag.parent_id && map.has(tag.parent_id)) {
      map.get(tag.parent_id).children.push(tag)
    } else {
      roots.push(tag)
    }
  })
  return roots
})

// 标签搜索过滤（保留匹配节点及其祖先路径）
const filteredTagTree = computed(() => {
  const kw = tagSearchKeyword.value.trim().toLowerCase()
  if (!kw) return tagTree.value

  function flatten(nodes, result = []) {
    nodes.forEach(n => {
      result.push(n)
      if (n.children && n.children.length > 0) flatten(n.children, result)
    })
    return result
  }

  const flat = flatten(tagTree.value)
  const matchedIds = new Set()

  flat.forEach(t => {
    if (t.name.toLowerCase().includes(kw)) {
      matchedIds.add(t.id)
      let parent = flat.find(p => p.children?.some(c => c.id === t.id))
      while (parent) {
        matchedIds.add(parent.id)
        parent = flat.find(p => p.children?.some(c => c.id === parent.id))
      }
    }
  })

  function filterTree(nodes) {
    return nodes.map(node => {
      const children = node.children ? filterTree(node.children) : []
      if (matchedIds.has(node.id) || children.length > 0) {
        return { ...node, children }
      }
      return null
    }).filter(Boolean)
  }

  return filterTree(tagTree.value)
})

function toggleTag(tagId) {
  const idx = form.value.tags.indexOf(tagId)
  if (idx >= 0) {
    form.value.tags.splice(idx, 1)
  } else {
    form.value.tags.push(tagId)
  }
}

function getTagName(tagId) {
  const tag = allTags.value.find(t => t.id === tagId)
  return tag ? tag.name : `Tag ${tagId}`
}

function getTagColor(tagId) {
  const tag = allTags.value.find(t => t.id === tagId)
  return tag ? tag.color : 'rgb(79, 172, 254)'
}

function getDifficultyType(d) {
  return { easy: 'success', medium: 'warning', hard: 'danger' }[d] || 'info'
}

function getDifficultyText(d) {
  return { easy: '简单', medium: '中等', hard: '困难' }[d] || d
}

function onCorrectChange(idx) {
  form.value.choices.forEach((c, i) => {
    c.isCorrect = i === idx
  })
}

function addChoice() {
  form.value.choices.push({ content: '', isCorrect: false })
}

function removeChoice(idx) {
  const wasCorrect = form.value.choices[idx].isCorrect
  form.value.choices.splice(idx, 1)
  if (wasCorrect && form.value.choices.length > 0) {
    form.value.choices[0].isCorrect = true
  }
}

function addTestCase() {
  form.value.test_cases.push({ input: '', expectedOutput: '', score: 10 })
}

function removeTestCase(idx) {
  form.value.test_cases.splice(idx, 1)
}

async function loadQuestions() {
  loading.value = true
  try {
    const params = { page: currentPage.value, size: pageSize.value }
    if (filterType.value) params.type = filterType.value
    if (filterDifficulty.value) params.difficulty = filterDifficulty.value
    if (searchText.value) params.search = searchText.value
    if (selectedTagIds.value.length > 0) params.tags = selectedTagIds.value.join(',')
    const { data } = await api.get('/questions', { params })
    questions.value = data.data || []
    total.value = data.total || 0
  } finally {
    loading.value = false
  }
}

async function loadTags() {
  const { data } = await api.get('/questions/tags')
  allTags.value = data.data || []
}

onMounted(() => {
  loadQuestions()
  loadTags()
})

watch([currentPage, pageSize], () => loadQuestions())
watch([filterType, filterDifficulty, searchText], () => {
  currentPage.value = 1
  loadQuestions()
})
watch(selectedTagIds, () => {
  currentPage.value = 1
  loadQuestions()
}, { deep: true })

function openAddDialog() {
  isEditing.value = false
  editingId.value = null
  form.value = defaultForm()
  dialogVisible.value = true
}

function safeParse(val, fallback = []) {
  if (val == null) return fallback
  if (Array.isArray(val)) return val
  if (typeof val !== 'string') return fallback
  try {
    return JSON.parse(val)
  } catch {
    return fallback
  }
}

function openEditDialog(row) {
  isEditing.value = true
  editingId.value = row.id
  const tags = safeParse(row.tags)
  const choices = safeParse(row.choices)
  const test_cases = safeParse(row.test_cases)

  // 解析 content，分离文字和代码
  const content = row.content || ''
  const codeMatch = content.match(/```python\n([\s\S]*?)```/)
  let textContent = content
  let codeContent = ''
  if (codeMatch) {
    textContent = content.substring(0, codeMatch.index).trim()
    codeContent = codeMatch[1].trim()
  }

  form.value = {
    title: row.title,
    content: row.content,
    textContent,
    codeContent,
    type: row.type,
    difficulty: row.difficulty || 'medium',
    tags,
    choices: choices.length > 0 ? choices : [{ content: '', isCorrect: true }],
    test_cases: test_cases.length > 0
      ? test_cases.map(tc => ({ ...tc, score: Number(tc.score) || 0 }))
      : [{ input: '', expectedOutput: '', score: 10 }]
  }
  dialogVisible.value = true
}

async function handleSave() {
  if (!form.value.title.trim()) return ElMessage.warning('请输入题目标题')
  if (!form.value.textContent.trim() && !form.value.codeContent.trim()) {
    return ElMessage.warning('请输入题目描述或代码')
  }

  if (form.value.type === 'choice') {
    const validChoices = form.value.choices.filter(c => c.content.trim())
    if (validChoices.length < 2) return ElMessage.warning('选择题至少需要2个选项')
    if (!validChoices.some(c => c.isCorrect)) return ElMessage.warning('请选择一个正确答案')
    form.value.choices = validChoices
  }

  if (form.value.type === 'program') {
    const validCases = form.value.test_cases.filter(tc => tc.expectedOutput && tc.expectedOutput.trim())
    if (validCases.length < 1) return ElMessage.warning('编程题至少需要1个测试用例（输入可以为空）')
    form.value.test_cases = form.value.test_cases.filter(tc => tc.expectedOutput && tc.expectedOutput.trim())
  }

  submitting.value = true
  try {
    // 合并文字和代码为最终 content
    let finalContent = form.value.textContent.trim()
    if (form.value.codeContent.trim()) {
      finalContent += '\n```python\n' + form.value.codeContent.trim() + '\n```'
    }

    const payload = {
      title: form.value.title.trim(),
      content: finalContent,
      type: form.value.type,
      difficulty: form.value.difficulty,
      tags: form.value.tags,
      choices: form.value.type === 'choice' ? form.value.choices : undefined,
      test_cases: form.value.type === 'program'
        ? form.value.test_cases.map(tc => ({ ...tc, score: Number(tc.score) || 0 }))
        : undefined
    }

    if (isEditing.value) {
      await api.put(`/questions/${editingId.value}`, payload)
      ElMessage.success('题目已更新')
    } else {
      await api.post('/questions', payload)
      ElMessage.success('题目已创建')
    }
    dialogVisible.value = false
    loadQuestions()
  } finally {
    submitting.value = false
  }
}

async function handleDelete(id) {
  await ElMessageBox.confirm('确定删除这道题目吗？', '删除确认', { type: 'warning' })
  await api.delete(`/questions/${id}`)
  ElMessage.success('已删除')
  loadQuestions()
}
</script>

<style scoped>
.questions-view {
  max-width: 100%;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.view-header h3 {
  margin: 0;
  font-size: 16px;
  color: #1a1a2e;
}

.add-btn {
  background: linear-gradient(135deg, #667eea, #764ba2) !important;
  border: none !important;
  border-radius: 20px !important;
  font-weight: 500;
}

.add-btn:hover {
  opacity: 0.9;
}

.filter-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
  align-items: center;
}

/* 标签筛选按钮 */
.tag-filter-btn {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  color: #a8abb2;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

/* el-button 内部结构处理 */
.tag-filter-btn :deep(span) {
  flex: 1;
  text-align: left;
}

.tag-filter-btn:hover {
  border-color: #c0c4cc;
}

.tag-filter-btn span {
  color: #a8abb2;
}

.arrow-icon {
  font-size: 12px;
  color: #a8abb2;
  flex-shrink: 0;
  transition: transform 0.2s;
}

/* 有选中值时的样式 */
.tag-filter-btn.has-selection {
  color: #606266;
}

.tag-filter-btn.has-selection span {
  color: #606266;
}

/* 已选标签栏 */
.selected-tags-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 8px;
}

.selected-tag-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.85rem;
  border: 1px solid;
  cursor: pointer;
  transition: opacity 0.2s;
}

.selected-tag-pill:hover {
  opacity: 0.8;
}

.remove-icon {
  font-size: 0.9rem;
  line-height: 1;
}

.clear-btn {
  color: #909399;
}

.clear-btn:hover {
  color: #606266;
}

/* 标签筛选弹窗 */
.tag-filter-dialog :deep(.el-dialog__body) {
  padding: 16px 20px;
}

.tag-filter-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tag-filter-search {
  width: 100%;
}

.tag-filter-tree {
  max-height: 320px;
  overflow-y: auto;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 12px;
  background: #fafafa;
}

.tag-filter-empty {
  text-align: center;
  padding: 20px;
  color: #909399;
  font-size: 14px;
}

.tag-filter-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.tag-selected-count {
  font-size: 14px;
  color: #606266;
}

.tag-filter-actions {
  display: flex;
  gap: 8px;
}

.table-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.pagination-wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

.question-id {
  font-family: 'Consolas', 'Monaco', monospace;
  font-weight: 600;
  color: #667eea;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  padding: 2px 8px;
  border-radius: 4px;
}

.question-title {
  font-weight: 500;
  color: #333;
}

.no-tags {
  color: #aaa;
  font-size: 13px;
}

.dialog-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dialog-icon {
  font-size: 22px;
}

.dialog-title {
  font-size: 17px;
  font-weight: 700;
  color: #1a1a2e;
}

.form-row {
  display: flex;
  gap: 16px;
}

.choices-list,
.testcases-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.choice-item,
.testcase-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex-wrap: nowrap;
}

.choice-item .multi-line-input {
  flex: 1;
  min-width: 0;
}

.score-stepper {
  display: inline-flex;
  align-items: center;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
}

.stepper-btn {
  width: 44px;
  height: 44px;
  border: none;
  background: #f5f7fa;
  color: #606266;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.stepper-btn:active {
  background: #e4e7ed;
}

.multi-line-input {
  flex: 1;
  min-width: 120px;
}

.multi-line-input :deep(.el-textarea__inner) {
  resize: vertical;
  min-height: 32px !important;
  max-height: 200px;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.5;
}

.stepper-input {
  width: 60px;
  height: 44px;
  border: none;
  border-left: 1px solid #dcdfe6;
  border-right: 1px solid #dcdfe6;
  text-align: center;
  font-size: 14px;
  color: #606266;
  outline: none;
  -moz-appearance: textfield;
}

.stepper-input::-webkit-outer-spin-button,
.stepper-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.add-choice-btn {
  margin-top: 10px;
}

/* 随机数提示框 */
.random-hint-box {
  margin: 12px 0;
  padding: 12px;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
}

.random-hint-title {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
  font-size: 0.85rem;
  color: #0369a1;
  font-weight: 500;
}

.random-hint-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.random-template-tag {
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.random-template-tag:hover {
  background: #e0f2fe;
  border-color: #7dd3fc;
}

.copy-icon {
  margin-left: 4px;
  font-size: 12px;
}

.tag-selector {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 12px;
  background: #fff;
  width: 100%;
  box-sizing: border-box;
}

.selected-tags-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.selected-tag-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  border: 1px solid;
  cursor: pointer;
  transition: opacity 0.2s;
}

.selected-tag-pill:hover {
  opacity: 0.8;
}

.remove-icon {
  font-size: 0.9rem;
  line-height: 1;
}

.tag-search-input {
  margin-bottom: 8px;
}

.tag-tree-wrapper {
  max-height: 260px;
  overflow-y: auto;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  padding: 8px;
  background: #fafafa;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.save-btn {
  background: linear-gradient(135deg, #667eea, #764ba2) !important;
  border: none !important;
  border-radius: 20px !important;
  font-weight: 500;
}

/* 代码输入框样式 */
.code-hint {
  margin-top: 6px;
  font-size: 0.8rem;
  color: #666;
}

:deep(.el-dialog) {
  border-radius: 16px !important;
}

@media (max-width: 768px) {
  .view-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .filter-bar {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .filter-bar > * {
    width: 100%;
    min-width: 0;
  }

  .filter-bar .el-select,
  .filter-bar .tag-filter-btn,
  .filter-bar .el-input {
    width: 100% !important;
    max-width: none !important;
  }

  .filter-bar .el-input {
    grid-column: 1 / -1;
  }

  /* 已选标签栏移动端适配 */
  .selected-tags-bar {
    padding: 10px;
    gap: 6px;
  }

  .selected-tag-pill {
    font-size: 0.8rem;
    padding: 3px 8px;
  }

  .table-card {
    padding: 14px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }

  .table-card :deep(.el-table) {
    width: 100%;
    min-width: 600px;
  }

  .pagination-wrapper {
    flex-wrap: wrap;
    gap: 8px;
  }

  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .testcase-item {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .testcase-item:last-child {
    border-bottom: none;
  }

  .testcase-item .el-input {
    width: 100% !important;
  }

  .score-stepper {
    align-self: flex-start;
  }
}

@media (max-width: 480px) {
  .filter-bar {
    grid-template-columns: 1fr;
  }

  .filter-bar .el-input {
    grid-column: 1;
  }

  .tag-filter-footer {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .tag-filter-actions {
    justify-content: stretch;
  }

  .tag-filter-actions .el-button {
    flex: 1;
  }
}
</style>
