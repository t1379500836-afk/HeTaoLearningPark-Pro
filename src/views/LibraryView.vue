<template>
  <div class="library-view">
    <div class="library-container">
      <!-- 页面标题 -->
      <section class="page-header">
        <h1>题库练习</h1>
        <p>挑战编程题目，提升你的编程能力</p>
      </section>

      <!-- 筛选栏 -->
      <section class="filter-bar">
        <div class="filter-row">
          <div class="filter-item">
            <span class="filter-label">难度</span>
            <select v-model="selectedDifficulty" class="filter-select">
              <option value="all">全部难度</option>
              <option value="easy">简单</option>
              <option value="medium">中等</option>
              <option value="hard">困难</option>
            </select>
          </div>

          <div class="filter-item">
            <span class="filter-label">标签</span>
            <button class="tag-trigger-btn" @click="openTagModal">
              <span v-if="selectedTagIds.length === 0">选择标签</span>
              <span v-else class="tag-trigger-selected">
                已选 {{ selectedTagIds.length }} 个
              </span>
              <span class="trigger-arrow">▾</span>
            </button>
          </div>

          <div class="filter-item">
            <span class="filter-label">类型</span>
            <select v-model="selectedType" class="filter-select">
              <option value="all">全部类型</option>
              <option value="choice">选择题</option>
              <option value="program">编程题</option>
            </select>
          </div>

          <button class="reset-btn" @click="resetFilters">
            <span class="reset-icon">↺</span>
            重置筛选
          </button>

          <div class="filter-item search-item">
            <input
              v-model="searchKeyword"
              type="text"
              class="search-input"
              placeholder="输入题目、编号"
            />
            <span class="search-icon">🔍</span>
          </div>
        </div>

        <!-- 已选标签展示 -->
        <div v-if="selectedTags.length > 0" class="selected-tags-bar">
          <span
            v-for="tag in selectedTags"
            :key="tag.id"
            class="selected-tag-pill"
            :style="{ background: tag.color + '20', color: tag.color, borderColor: tag.color + '40' }"
            @click="toggleTag(tag.id)"
          >
            {{ tag.name }}
            <span class="remove-icon">×</span>
          </span>
        </div>
      </section>

      <!-- 桌面端：表格 -->
      <section v-if="!isMobile" class="table-section">
        <table class="questions-table">
          <thead>
            <tr>
              <th class="col-id">编号</th>
              <th class="col-title">题目名称</th>
              <th class="col-tags">标签</th>
              <th class="col-difficulty">难度</th>
              <th class="col-rate">通过/尝试</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="q in filteredQuestions"
              :key="q.id"
              class="question-row"
              @click="goQuestion(q.id)"
            >
              <td class="col-id">T{{ q.id }}</td>
              <td class="col-title">
                <span class="title-link">{{ q.title }}</span>
              </td>
              <td class="col-tags">
                <div class="tag-card">
                  <span
                    v-for="tagId in (q.tags || []).slice(0, 3)"
                    :key="tagId"
                    class="tag-pill"
                    :style="{ background: tagMap[tagId]?.color || '#ccc' }"
                  >
                    {{ tagMap[tagId]?.name || '' }}
                  </span>
                  <span v-if="(q.tags || []).length > 3" class="tag-more">...</span>
                </div>
              </td>
              <td class="col-difficulty">
                <span class="difficulty-badge" :class="q.difficulty">
                  {{ difficultyLabel(q.difficulty) }}
                </span>
              </td>
              <td class="col-rate">
                <div class="rate-bar">
                  <div
                    class="rate-fill"
                    :class="{ 'low': getQuestionStats(q.id).rate < 30, 'mid': getQuestionStats(q.id).rate >= 30 && getQuestionStats(q.id).rate < 70, 'high': getQuestionStats(q.id).rate >= 70 }"
                    :style="{ width: getQuestionStats(q.id).rate + '%' }"
                  ></div>
                </div>
                <span class="rate-text">{{ getQuestionStats(q.id).passed }}/{{ getQuestionStats(q.id).attempts }}</span>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="filteredQuestions.length === 0" class="table-empty">
          <p>暂无符合条件的题目</p>
        </div>
      </section>

      <!-- 移动端：卡片 -->
      <section v-else class="cards-section">
        <div v-if="filteredQuestions.length === 0" class="empty-state">
          <div class="empty-icon">📭</div>
          <p>暂无符合条件的题目</p>
        </div>

        <div
          v-for="q in filteredQuestions"
          :key="q.id"
          class="question-card"
          @click="goQuestion(q.id)"
        >
          <div class="card-top">
            <span class="card-id">T{{ q.id }}</span>
            <span class="difficulty-badge" :class="q.difficulty">
              {{ difficultyLabel(q.difficulty) }}
            </span>
          </div>
          <h3 class="card-title">{{ q.title }}</h3>
          <div class="tag-card">
            <span
              v-for="tagId in (q.tags || []).slice(0, 3)"
              :key="tagId"
              class="tag-pill"
              :style="{ background: (tagMap[tagId]?.color || '#999') + '18', color: tagMap[tagId]?.color || '#999' }"
            >
              {{ tagMap[tagId]?.name || '' }}
            </span>
          </div>
          <div class="card-stats">
            <div class="card-rate-bar">
              <div
                class="card-rate-fill"
                :class="{ 'low': getQuestionStats(q.id).rate < 30, 'mid': getQuestionStats(q.id).rate >= 30 && getQuestionStats(q.id).rate < 70, 'high': getQuestionStats(q.id).rate >= 70 }"
                :style="{ width: getQuestionStats(q.id).rate + '%' }"
              ></div>
            </div>
            <span class="card-rate-text">{{ getQuestionStats(q.id).passed }}/{{ getQuestionStats(q.id).attempts }}</span>
          </div>
        </div>
      </section>
    </div>

    <!-- 标签选择弹窗 -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="tagModalVisible" class="tag-modal-overlay" @click.self="closeTagModal">
          <div class="tag-modal">
            <div class="tag-modal-header">
              <h3>选择标签</h3>
              <button class="modal-close" @click="closeTagModal">✕</button>
            </div>

            <div class="tag-modal-search">
              <input
                v-model="tagSearchKeyword"
                type="text"
                class="tag-search-input"
                placeholder="搜索标签..."
                ref="tagSearchInput"
              />
              <span class="tag-search-icon">🔍</span>
            </div>

            <div class="tag-modal-body">
              <TagTree
                :nodes="filteredTagTree"
                :selected-ids="selectedTagIds"
                @toggle="toggleTag"
              />
              <div v-if="filteredTagTree.length === 0" class="tag-empty">
                未找到匹配的标签
              </div>
            </div>

            <div class="tag-modal-footer">
              <span class="tag-selected-count">
                已选 {{ selectedTagIds.length }} 个标签
              </span>
              <div class="tag-modal-actions">
                <button class="btn-clear" @click="clearSelectedTags">清空</button>
                <button class="btn-confirm" @click="closeTagModal">确定</button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- 浮动返回 -->
    <button class="floating-back" @click="goBack">←</button>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLibrary } from '@/composables/useLibrary.js'
import { getCurrentPrefix, prefixedPath as buildPrefixedPath } from '@/composables/useRoutePrefix.js'
import TagTree from '@/components/library/TagTree.vue'

const route = useRoute()
const router = useRouter()
const prefix = computed(() => getCurrentPrefix(route))

const {
  tags,
  tagMap,
  tagSearchKeyword,
  filteredTagTree,
  selectedTags,
  selectedTagIds,
  selectedDifficulty,
  selectedType,
  searchKeyword,
  filteredQuestions,
  questionStats,
  reload
} = useLibrary()

function getQuestionStats(qid) {
  const s = questionStats.value[qid]
  if (!s) return { attempts: 0, passed: 0, rate: 0 }
  const rate = s.attempts > 0 ? Math.round((s.passed / s.attempts) * 100) : 0
  return { attempts: s.attempts, passed: s.passed, rate }
}

onMounted(() => {
  reload()
})

// 移动端检测
const isMobile = computed(() => {
  if (typeof window === 'undefined') return false
  return window.innerWidth <= 768
})

// 弹窗状态
const tagModalVisible = ref(false)
const tagSearchInput = ref(null)

function openTagModal() {
  tagModalVisible.value = true
  nextTick(() => {
    tagSearchInput.value?.focus()
  })
}

function closeTagModal() {
  tagModalVisible.value = false
  tagSearchKeyword.value = ''
}

function toggleTag(tagId) {
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

function difficultyLabel(diff) {
  const map = { easy: '简单', medium: '中等', hard: '困难' }
  return map[diff] || diff
}

function resetFilters() {
  selectedTagIds.value = []
  selectedDifficulty.value = 'all'
  selectedType.value = 'all'
  searchKeyword.value = ''
}

function goQuestion(id) {
  router.push(prefixedPath(`/library/${id}`))
}

function goBack() {
  router.push(prefixedPath('/'))
}

function prefixedPath(path) {
  return buildPrefixedPath(prefix.value, path)
}
</script>

<style scoped>
.library-view {
  min-height: 100vh;
  padding: 30px 20px 80px;
  background: #f5f6f7;
}

.library-container {
  max-width: 1400px;
  margin: 0 auto;
}

/* 页面标题 */
.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 6px;
}

.page-header p {
  font-size: 0.9rem;
  color: #999;
}

/* 筛选栏 */
.filter-bar {
  background: #fff;
  border-radius: 8px;
  padding: 16px 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-label {
  font-size: 0.85rem;
  color: #666;
  white-space: nowrap;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #333;
  background: #fff;
  min-width: 120px;
  cursor: pointer;
  outline: none;
}

.filter-select:focus {
  border-color: var(--primary-color);
}

/* 标签触发按钮 */
.tag-trigger-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: #fff;
  color: #333;
  font-size: 0.85rem;
  cursor: pointer;
  min-width: 120px;
  transition: all 0.2s;
}

.tag-trigger-btn:hover {
  border-color: var(--primary-color);
}

.tag-trigger-selected {
  color: var(--primary-color);
  font-weight: 500;
}

.trigger-arrow {
  margin-left: auto;
  color: #999;
  font-size: 0.7rem;
}

.reset-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 14px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: #fff;
  color: #666;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.reset-icon {
  font-size: 0.9rem;
}

.search-item {
  position: relative;
  margin-left: auto;
}

.search-input {
  padding: 8px 32px 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.85rem;
  width: 220px;
  outline: none;
}

.search-input:focus {
  border-color: var(--primary-color);
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.8rem;
  color: #bbb;
  pointer-events: none;
}

/* 已选标签栏 */
.selected-tags-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
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
  transition: all 0.2s;
}

.selected-tag-pill:hover {
  opacity: 0.8;
}

.remove-icon {
  font-size: 0.9rem;
  line-height: 1;
}

/* 表格 */
.table-section {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.questions-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.questions-table thead {
  background: #fafafa;
}

.questions-table th {
  padding: 14px 16px;
  text-align: left;
  font-weight: 600;
  color: #666;
  font-size: 0.85rem;
  border-bottom: 1px solid #f0f0f0;
}

.questions-table td {
  padding: 14px 16px;
  border-bottom: 1px solid #f5f5f5;
  color: #444;
}

.question-row {
  cursor: pointer;
  transition: background 0.15s;
}

.question-row:hover {
  background: #fafafa;
}

.question-row:hover .title-link {
  color: var(--primary-color);
}

.col-id {
  width: 80px;
  color: #999;
  font-family: monospace;
  font-size: 0.85rem;
  text-align: center;
}

.col-title {
  min-width: 200px;
}

.title-link {
  color: #333;
  font-weight: 500;
  transition: color 0.15s;
}

.col-tags {
  min-width: 150px;
}

.tag-card {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag-pill {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  color: #fff;
}

.tag-more {
  color: #bbb;
  font-size: 0.75rem;
  padding: 3px 0;
}

.col-difficulty {
  width: 80px;
}

.difficulty-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.difficulty-badge.easy {
  background: #e8f5e9;
  color: #2e7d32;
}

.difficulty-badge.medium {
  background: #fff8e1;
  color: #f9a825;
}

.difficulty-badge.hard {
  background: #ffebee;
  color: #c62828;
}

.col-rate {
  width: 140px;
}

.rate-bar {
  width: 80px;
  height: 6px;
  background: #eee;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 4px;
}

.rate-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s;
}

.rate-fill.low {
  background: linear-gradient(90deg, #ef5350, #c62828);
}

.rate-fill.mid {
  background: linear-gradient(90deg, #ffca28, #ff8f00);
}

.rate-fill.high {
  background: linear-gradient(90deg, #66bb6a, #2e7d32);
}

.rate-text {
  font-size: 0.75rem;
  color: #bbb;
}

.table-empty {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 0.9rem;
}

/* 移动端卡片 */
.cards-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.question-card {
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.question-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.card-id {
  font-size: 0.8rem;
  color: #bbb;
  font-family: monospace;
}

.card-title {
  font-size: 1rem;
  color: #333;
  margin-bottom: 10px;
  line-height: 1.4;
}

.card-stats {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.card-rate-bar {
  flex: 1;
  height: 6px;
  background: #eee;
  border-radius: 3px;
  overflow: hidden;
}

.card-rate-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s;
}

.card-rate-fill.low {
  background: linear-gradient(90deg, #ef5350, #c62828);
}

.card-rate-fill.mid {
  background: linear-gradient(90deg, #ffca28, #ff8f00);
}

.card-rate-fill.high {
  background: linear-gradient(90deg, #66bb6a, #2e7d32);
}

.card-rate-text {
  font-size: 0.75rem;
  color: #bbb;
  white-space: nowrap;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 12px;
}

/* 标签选择弹窗 */
.tag-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.tag-modal {
  background: #fff;
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.tag-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.tag-modal-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #999;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #f5f5f5;
  color: #333;
}

.tag-modal-search {
  position: relative;
  padding: 12px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.tag-search-input {
  width: 100%;
  padding: 10px 36px 10px 14px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  box-sizing: border-box;
}

.tag-search-input:focus {
  border-color: var(--primary-color);
}

.tag-search-icon {
  position: absolute;
  right: 32px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.85rem;
  color: #bbb;
  pointer-events: none;
}

.tag-modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 12px 20px;
  min-height: 200px;
}

.tag-empty {
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 0.9rem;
}

.tag-modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-top: 1px solid #f0f0f0;
}

.tag-selected-count {
  font-size: 0.85rem;
  color: #666;
}

.tag-modal-actions {
  display: flex;
  gap: 10px;
}

.btn-clear {
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: #fff;
  color: #666;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-clear:hover {
  border-color: #999;
  color: #333;
}

.btn-confirm {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  background: var(--primary-color);
  color: #fff;
  font-size: 0.85rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-confirm:hover {
  opacity: 0.9;
}

/* 浮动返回 */
.floating-back {
  position: fixed;
  bottom: 24px;
  left: 24px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--primary-color);
  color: #fff;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-back:hover {
  transform: scale(1.05);
}

/* 弹窗动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式 */
@media (max-width: 1024px) {
  .filter-row {
    gap: 12px;
  }

  .search-item {
    width: 100%;
    margin-left: 0;
  }

  .search-input {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .library-view {
    padding: 16px 12px 80px;
  }

  .page-header h1 {
    font-size: 1.5rem;
  }

  .filter-bar {
    padding: 12px;
  }

  .filter-item {
    flex: 1;
    min-width: 120px;
  }

  .filter-select,
  .tag-trigger-btn {
    width: 100%;
  }

  .tag-modal {
    max-height: 90vh;
    border-radius: 12px 12px 0 0;
  }

  .tag-modal-overlay {
    align-items: flex-end;
    padding: 0;
  }
}

@media (max-width: 480px) {
  .tag-modal-footer {
    flex-direction: column;
    gap: 10px;
  }

  .tag-modal-actions {
    width: 100%;
  }

  .tag-modal-actions button {
    flex: 1;
  }
}
</style>
