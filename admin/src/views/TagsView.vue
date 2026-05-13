<template>
  <div class="tags-view">
    <div class="view-header">
      <h3>标签管理</h3>
      <el-button type="primary" @click="openAddDialog" class="add-btn">
        <el-icon><Plus /></el-icon> 新增标签
      </el-button>
    </div>

    <div class="table-card">
      <div class="search-bar">
        <el-input v-model="searchKeyword" placeholder="搜索标签名称..." clearable prefix-icon="Search" />
      </div>
      <el-table :data="tagTree" stripe v-loading="loading" empty-text="暂无标签" row-key="id" :tree-props="{ children: 'children' }">
        <el-table-column label="标签名" min-width="160">
          <template #default="{ row }">
            <el-tag :style="{ background: row.color, borderColor: row.color, color: '#fff' }">
              {{ row.name }}
            </el-tag>
            <span v-if="row.parent_id" class="parent-label">
              父: {{ tagMap[row.parent_id]?.name || row.parent_id }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="color" label="颜色" width="200">
          <template #default="{ row }">
            <div class="color-preview" :style="{ background: row.color }"></div>
            <span class="color-text">{{ row.color }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="openEditDialog(row)">编辑</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="dialogVisible" width="min(420px, 92vw)" destroy-on-close class="tag-dialog">
      <template #header>
        <div class="dialog-header">
          <span class="dialog-icon">{{ isEditing ? '✏️' : '🏷️' }}</span>
          <span class="dialog-title">{{ isEditing ? '编辑标签' : '新增标签' }}</span>
        </div>
      </template>
      <el-form label-position="top" class="dialog-form">
        <el-form-item label="标签名称">
          <el-input v-model="dialogName" maxlength="50" show-word-limit placeholder="输入标签名称..." />
        </el-form-item>
        <el-form-item label="父标签">
          <div class="tag-selector">
            <div v-if="dialogParentId" class="selected-tags-bar">
              <span
                class="selected-tag-pill"
                :style="{ background: tagMap[dialogParentId]?.color || '#999', borderColor: tagMap[dialogParentId]?.color || '#999', color: '#fff' }"
                @click="dialogParentId = null"
              >
                {{ tagMap[dialogParentId]?.name || '' }}
                <span class="remove-icon">×</span>
              </span>
            </div>
            <el-input
              v-model="parentSearchKeyword"
              placeholder="搜索标签..."
              clearable
              class="tag-search-input"
            />
            <div class="tag-tree-wrapper">
              <TagTree
                :nodes="filteredParentTree"
                :selected-ids="dialogParentId ? [dialogParentId] : []"
                @toggle="toggleParentTag"
              />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="颜色">
          <div class="color-picker-row">
            <el-color-picker v-model="dialogColor" show-alpha />
            <el-input v-model="dialogColor" style="flex: 1" placeholder="rgb(79, 172, 254)" />
          </div>
        </el-form-item>
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
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import api from '../api.js'
import TagTree from '../components/TagTree.vue'

const loading = ref(false)
const dialogVisible = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const dialogName = ref('')
const dialogColor = ref('rgb(79, 172, 254)')
const dialogParentId = ref(null)
const parentSearchKeyword = ref('')
const submitting = ref(false)
const searchKeyword = ref('')
const allTags = ref([])

async function loadTags() {
  loading.value = true
  try {
    const { data } = await api.get('/questions/tags')
    allTags.value = data.data || []
  } finally {
    loading.value = false
  }
}

// 构建标签树（考虑搜索过滤）
const tagTree = computed(() => {
  const kw = searchKeyword.value.trim().toLowerCase()
  let filtered = allTags.value

  if (kw) {
    // 搜索时，找出匹配的标签及其所有父标签
    const matchedIds = new Set()
    const tagMap = {}
    allTags.value.forEach(t => { tagMap[t.id] = t })

    allTags.value.forEach(t => {
      if (t.name.toLowerCase().includes(kw)) {
        matchedIds.add(t.id)
        // 添加所有父标签
        let parentId = t.parent_id
        while (parentId && tagMap[parentId]) {
          matchedIds.add(parentId)
          parentId = tagMap[parentId].parent_id
        }
      }
    })

    filtered = allTags.value.filter(t => matchedIds.has(t.id))
  }

  // 构建树
  const map = new Map()
  filtered.forEach(t => map.set(t.id, { ...t, children: [] }))
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

onMounted(() => {
  loadTags()
})

// 标签映射表（基于所有标签，确保能解析父标签名称）
const tagMap = computed(() => {
  const map = {}
  allTags.value.forEach(t => { map[t.id] = t })
  return map
})

// 可作为父标签的候选（排除自身，基于所有标签）
const parentCandidates = computed(() => {
  return allTags.value.filter(t => t.id !== editingId.value)
})

// 父标签候选树
const parentTagTree = computed(() => {
  const map = new Map()
  parentCandidates.value.forEach(t => map.set(t.id, { ...t, children: [] }))
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

// 父标签搜索过滤
const filteredParentTree = computed(() => {
  const kw = parentSearchKeyword.value.trim().toLowerCase()
  if (!kw) return parentTagTree.value

  function flatten(nodes, result = []) {
    nodes.forEach(n => {
      result.push(n)
      if (n.children && n.children.length > 0) flatten(n.children, result)
    })
    return result
  }

  const flat = flatten(parentTagTree.value)
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

  return filterTree(parentTagTree.value)
})

function toggleParentTag(tagId) {
  if (dialogParentId.value === tagId) {
    dialogParentId.value = null
  } else {
    dialogParentId.value = tagId
  }
}

function openAddDialog() {
  isEditing.value = false
  editingId.value = null
  dialogName.value = ''
  dialogColor.value = 'rgb(79, 172, 254)'
  dialogParentId.value = null
  dialogVisible.value = true
}

function openEditDialog(row) {
  isEditing.value = true
  editingId.value = row.id
  dialogName.value = row.name
  dialogColor.value = row.color
  dialogParentId.value = row.parent_id || null
  dialogVisible.value = true
}

async function handleSave() {
  if (!dialogName.value.trim()) {
    return ElMessage.warning('请输入标签名称')
  }
  submitting.value = true
  try {
    const payload = {
      name: dialogName.value.trim(),
      color: dialogColor.value,
      parent_id: dialogParentId.value || null
    }
    if (isEditing.value) {
      await api.put(`/questions/tags/${editingId.value}`, payload)
      ElMessage.success('标签已更新')
    } else {
      await api.post('/questions/tags', payload)
      ElMessage.success('标签已创建')
    }
    dialogVisible.value = false
    loadTags()
  } finally {
    submitting.value = false
  }
}

async function handleDelete(id) {
  await ElMessageBox.confirm('确定删除这个标签吗？子标签将变为顶级标签。', '删除确认', { type: 'warning' })
  await api.delete(`/questions/tags/${id}`)
  ElMessage.success('已删除')
  loadTags()
}
</script>

<style scoped>
.tags-view {
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

.table-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.search-bar {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-bar :deep(.el-input__wrapper) {
  border-radius: 20px;
  padding: 0 16px;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
  border: 1px solid #e8e8f0;
  transition: all 0.3s ease;
}

.search-bar :deep(.el-input__wrapper:hover),
.search-bar :deep(.el-input__wrapper:focus-within) {
  border-color: #667eea;
  box-shadow: 0 2px 12px rgba(102, 126, 234, 0.2);
}

.search-bar :deep(.el-input__inner) {
  font-size: 14px;
}

.search-bar :deep(.el-input__inner::placeholder) {
  color: #a0a0b8;
}

.search-bar :deep(.el-icon) {
  color: #a0a0b8;
}

.parent-label {
  margin-left: 8px;
  font-size: 12px;
  color: #999;
}

.color-preview {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  vertical-align: middle;
  margin-right: 6px;
}

.color-text {
  font-size: 13px;
  color: #666;
  font-family: monospace;
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

.color-picker-row {
  display: flex;
  align-items: center;
  gap: 12px;
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

:deep(.el-dialog) {
  border-radius: 16px !important;
}

@media (max-width: 768px) {
  .view-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .table-card {
    padding: 14px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
