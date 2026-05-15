<template>
  <div>
    <!-- 顶部导航 -->
    <div class="detail-nav">
      <button class="back-btn" @click="goBack">← 返回提交试卷列表</button>
      <div class="nav-info">
        <span class="set-name">{{ route.query.setName }}</span>
        <span class="set-level">{{ getLevelName(route.query.level) }}</span>
      </div>
    </div>

    <!-- 筛选工具栏 -->
    <div class="toolbar">
      <el-input
        v-model="filters.studentName"
        placeholder="搜索学生姓名…"
        prefix-icon="Search"
        clearable
        class="toolbar__search"
        @input="onFilterChange"
        @clear="onFilterChange"
      />
      <div class="toolbar__dates">
        <el-date-picker
          v-model="filters.startDate"
          type="date"
          placeholder="开始日期"
          value-format="YYYY-MM-DD"
          @change="onFilterChange"
        />
        <span class="toolbar__sep">至</span>
        <el-date-picker
          v-model="filters.endDate"
          type="date"
          placeholder="结束日期"
          value-format="YYYY-MM-DD"
          @change="onFilterChange"
        />
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>加载中…</p>
    </div>

    <!-- 成绩列表 -->
    <div v-else>
      <div v-if="records.length === 0" class="empty-state">
        <p>暂无成绩记录</p>
      </div>
      <div v-else class="records-list">
        <div
          v-for="record in records"
          :key="record.id"
          class="score-card"
          @click="openScoreDetail(record)"
        >
          <div class="score-card__header">
            <div class="score-card__student">
              <div>
                <div class="student-name">{{ record.student_name }}</div>
                <div class="submit-time">{{ formatDateTime(record.submitted_at) }}</div>
              </div>
            </div>
            <div class="score-card__score" :class="{ pass: record.score >= record.total_score * 0.6 }">
              <span class="score-value">{{ record.score }}</span>
              <span class="score-total">/{{ record.total_score }}</span>
            </div>
          </div>
          <div class="score-card__breakdown">
            <span class="breakdown-item">
              <span class="breakdown-label">选择题</span>
              <span class="breakdown-value">{{ record.objective_score }}/{{ record.objective_total }}</span>
            </span>
            <span class="breakdown-item">
              <span class="breakdown-label">编程题</span>
              <span class="breakdown-value">{{ record.coding_score }}/{{ record.coding_total }}</span>
            </span>
            <span class="breakdown-item">
              <span class="breakdown-label">用时</span>
              <span class="breakdown-value">{{ formatDuration(record.duration) }}</span>
            </span>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <div v-if="totalPages > 1" class="pagination-wrap">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          layout="prev, pager, next"
          background
          @current-change="loadSetRecords"
        />
      </div>
    </div>

    <!-- 成绩详情弹窗 -->
    <el-dialog v-model="showDetail" :title="currentRecord?.student_name + ' 的答题详情'" width="800px" destroy-on-close>
      <div v-if="currentRecord" class="detail-content">
        <div class="detail-header">
          <div class="detail-score" :class="{ pass: currentRecord.score >= currentRecord.total_score * 0.6 }">
            <span class="score-num">{{ currentRecord.score }}</span>
            <span class="score-denom">/{{ currentRecord.total_score }}</span>
          </div>
          <div class="detail-meta">
            <span>{{ getLevelName(currentRecord.level) }} · {{ currentRecord.set_name }}</span>
            <span>提交时间: {{ formatDateTime(currentRecord.submitted_at) }}</span>
            <span>用时: {{ formatDuration(currentRecord.duration) }}</span>
          </div>
        </div>
        <div class="detail-stats">
          <div class="stat-item">
            <span class="stat-label">单选题</span>
            <span class="stat-val">{{ getSingleChoiceCorrect(currentRecord) }}/{{ getSingleChoiceTotal(currentRecord) }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">多选题</span>
            <span class="stat-val">{{ getMultiChoiceCorrect(currentRecord) }}/{{ getMultiChoiceTotal(currentRecord) }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">编程题</span>
            <span class="stat-val">{{ currentRecord.coding_score }}/{{ currentRecord.coding_total }}</span>
          </div>
        </div>
        <div class="question-list">
          <div
            v-for="(q, idx) in currentRecord.questions"
            :key="q.id"
            class="question-item"
            :class="{ correct: q.isCorrect, wrong: !q.isCorrect }"
          >
            <div class="question-item__header">
              <span class="question-num">{{ idx + 1 }}</span>
              <span class="question-type">{{ getQuestionTypeText(q.type) }}</span>
              <span class="question-score">{{ q.score }}分</span>
              <span class="result-tag" :class="q.isCorrect ? 'correct' : 'wrong'">
                {{ q.isCorrect ? '✓ 正确' : '✗ 错误' }}
              </span>
            </div>
            <div class="question-item__body">
              <p class="question-text">{{ q.question }}</p>
              <pre v-if="q.code" class="question-code"><code>{{ q.code }}</code></pre>
              <div v-if="q.type === 'single-choice' || q.type === 'multiple-choice'" class="options">
                <div
                  v-for="(opt, oi) in q.options"
                  :key="oi"
                  class="option"
                  :class="{
                    'correct-answer': Array.isArray(q.correctAnswer) ? q.correctAnswer.includes(oi) : q.correctAnswer === oi,
                    'user-answer': Array.isArray(q.userAnswer) ? q.userAnswer.includes(oi) : q.userAnswer === oi,
                    'wrong-answer': (Array.isArray(q.userAnswer) ? q.userAnswer.includes(oi) : q.userAnswer === oi) && (Array.isArray(q.correctAnswer) ? !q.correctAnswer.includes(oi) : q.correctAnswer !== oi)
                  }"
                >
                  <span class="option-label">{{ ['A','B','C','D'][oi] }}.</span>
                  <span class="option-text">{{ opt }}</span>
                  <span v-if="(Array.isArray(q.correctAnswer) ? q.correctAnswer.includes(oi) : q.correctAnswer === oi)" class="marker correct">✓</span>
                  <span v-if="(Array.isArray(q.userAnswer) ? q.userAnswer.includes(oi) : q.userAnswer === oi) && (Array.isArray(q.correctAnswer) ? !q.correctAnswer.includes(oi) : q.correctAnswer !== oi)" class="marker wrong">✗</span>
                </div>
              </div>
              <div v-else-if="q.type === 'coding'" class="coding-review">
                <div class="user-code">
                  <h5>学生答案</h5>
                  <pre><code>{{ q.userAnswer || '# 未作答' }}</code></pre>
                </div>
                <div v-if="q.referenceAnswer" class="ref-code">
                  <h5>参考答案</h5>
                  <pre><code>{{ q.referenceAnswer }}</code></pre>
                </div>
                <div v-if="q.codingResult" class="coding-result" :class="q.codingResult.status">
                  <span>运行结果: {{ q.codingResult.status === 'passed' ? '通过' : '未通过' }}</span>
                </div>
              </div>
              <div v-if="q.explanation" class="explanation">
                <strong>解析：</strong>{{ q.explanation }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api.js'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const records = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

const showDetail = ref(false)
const currentRecord = ref(null)

const filters = ref({
  studentName: '',
  startDate: '',
  endDate: ''
})

const levelNames = { level4: '四级', level5: '五级', level6: '六级' }
function getLevelName(level) {
  return levelNames[level] || level
}

function getQuestionTypeText(type) {
  const map = { 'single-choice': '单选题', 'multiple-choice': '多选题', 'coding': '编程题' }
  return map[type] || type
}

async function loadSetRecords() {
  loading.value = true
  try {
    const params = {
      page: currentPage.value,
      pageSize: pageSize.value,
      level: route.query.level,
      setId: route.params.setId
    }
    if (filters.value.studentName) params.studentName = filters.value.studentName
    if (filters.value.startDate) params.startDate = filters.value.startDate
    if (filters.value.endDate) params.endDate = filters.value.endDate
    const res = await api.get('/ycl/scores', { params })
    records.value = res.data?.data || []
    total.value = res.data?.total || 0
  } catch (err) {
    console.error('加载成绩失败:', err)
  } finally {
    loading.value = false
  }
}

function onFilterChange() {
  currentPage.value = 1
  loadSetRecords()
}

function openScoreDetail(record) {
  currentRecord.value = record
  showDetail.value = true
}

function goBack() {
  const from = route.query.from
  if (from) {
    const query = {}
    if (route.query.teacherId) {
      query.teacherId = route.query.teacherId
    }
    router.push({ path: from, query })
  } else {
    router.push({ name: 'ycl-scores' })
  }
}

function getSingleChoiceCorrect(record) {
  if (!record.questions) return 0
  return record.questions.filter(q => q.type === 'single-choice' && q.isCorrect).length
}
function getSingleChoiceTotal(record) {
  if (!record.questions) return 0
  return record.questions.filter(q => q.type === 'single-choice').length
}
function getMultiChoiceCorrect(record) {
  if (!record.questions) return 0
  return record.questions.filter(q => q.type === 'multiple-choice' && q.isCorrect).length
}
function getMultiChoiceTotal(record) {
  if (!record.questions) return 0
  return record.questions.filter(q => q.type === 'multiple-choice').length
}

function formatDateTime(iso) {
  if (!iso) return '-'
  const d = new Date(iso)
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
}

function formatDuration(seconds) {
  if (!seconds) return '0秒'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}分${s}秒` : `${s}秒`
}

onMounted(() => {
  currentPage.value = 1
  loadSetRecords()
})
</script>

<style scoped>
.detail-nav {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}
.back-btn {
  padding: 8px 16px;
  background: #f5f5f5;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #666;
}
.back-btn:hover { background: #e8e8e8; }
.nav-info { display: flex; align-items: center; gap: 12px; }
.set-name { font-size: 1.2rem; font-weight: 600; color: #333; }
.set-level {
  background: #667eea; color: #fff;
  padding: 2px 10px; border-radius: 10px; font-size: 0.8rem;
}

/* 工具栏 */
.toolbar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  align-items: center;
}
.toolbar__search { width: 200px; }
.toolbar__dates { display: flex; align-items: center; gap: 8px; }
.toolbar__sep { color: #999; font-size: 14px; }

.loading-state { text-align: center; padding: 60px 20px; }
.spinner {
  width: 40px; height: 40px;
  border: 4px solid #f3f3f3;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 15px;
}
@keyframes spin { to { transform: rotate(360deg); } }

.empty-state { text-align: center; padding: 60px 20px; color: #999; }

.records-list { display: flex; flex-direction: column; gap: 12px; }

.score-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
}
.score-card:hover { border-color: #667eea; box-shadow: 0 2px 12px rgba(102,126,234,0.15); }
.score-card__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.score-card__student { display: flex; align-items: center; gap: 12px; }
.student-name { font-weight: 500; color: #333; }
.submit-time { font-size: 0.8rem; color: #999; margin-top: 2px; }
.score-card__score { text-align: right; }
.score-value { font-size: 1.5rem; font-weight: 700; color: #333; }
.score-total { font-size: 0.9rem; color: #999; }
.score-card__score.pass .score-value { color: #4caf50; }
.score-card__breakdown { display: flex; gap: 20px; }
.breakdown-item { display: flex; gap: 6px; align-items: center; font-size: 0.9rem; }
.breakdown-label { color: #888; }
.breakdown-value { color: #555; font-weight: 500; }

.pagination-wrap { display: flex; justify-content: center; margin-top: 24px; }
:deep(.el-pagination) { --el-pagination-button-bg-color: #fff; --el-pagination-hover-color: #667eea; }
:deep(.el-pagination .el-pager li.is-active) { background: #667eea !important; color: #fff; }

/* 详情弹窗样式 */
.detail-content { max-height: 70vh; overflow-y: auto; }
.detail-header {
  display: flex; align-items: center; gap: 20px;
  padding-bottom: 16px; margin-bottom: 16px;
  border-bottom: 1px solid #eee;
}
.detail-score {
  padding: 12px 20px;
  background: #fff5f5;
  border-radius: 12px;
  text-align: center;
}
.detail-score.pass { background: #e8f5e9; }
.score-num { font-size: 2rem; font-weight: 700; color: #333; }
.score-denom { font-size: 1rem; color: #999; }
.detail-meta { display: flex; flex-direction: column; gap: 4px; color: #666; font-size: 0.9rem; }

.detail-stats {
  display: flex; gap: 24px;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 10px;
  margin-bottom: 20px;
}
.stat-item { display: flex; gap: 8px; align-items: center; }
.stat-label { color: #888; }
.stat-val { font-weight: 600; color: #333; }

.question-list { display: flex; flex-direction: column; gap: 16px; }
.question-item {
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
}
.question-item.correct { border-left: 4px solid #4caf50; }
.question-item.wrong { border-left: 4px solid #f44336; }

.question-item__header {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 16px;
  background: #fafafa;
  border-bottom: 1px solid #eee;
}
.question-num {
  width: 24px; height: 24px;
  background: #667eea; color: #fff;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; font-weight: 600;
}
.question-type { color: #666; font-size: 0.9rem; }
.question-score { color: #888; font-size: 0.85rem; }
.result-tag { margin-left: auto; padding: 2px 10px; border-radius: 10px; font-size: 0.8rem; }
.result-tag.correct { background: #e8f5e9; color: #4caf50; }
.result-tag.wrong { background: #ffebee; color: #f44336; }

.question-item__body { padding: 16px; }
.question-text { margin-bottom: 12px; color: #333; line-height: 1.6; }
.question-code {
  background: #2d2d2d; color: #f8f8f2;
  padding: 12px; border-radius: 8px;
  overflow-x: auto; font-size: 0.9rem;
  margin-bottom: 12px;
}

.options { display: flex; flex-direction: column; gap: 8px; }
.option {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 14px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid transparent;
}
.option.correct-answer { border-color: #4caf50; background: #e8f5e9; }
.option.user-answer.wrong-answer { border-color: #f44336; background: #ffebee; }
.option.user-answer:not(.wrong-answer) { border-color: #667eea; background: #e8f5f5; }
.option-label { font-weight: 600; color: #333; }
.option-text { flex: 1; color: #555; }
.marker { font-weight: bold; }
.marker.correct { color: #4caf50; }
.marker.wrong { color: #f44336; }

.coding-review { display: flex; flex-direction: column; gap: 12px; }
.user-code h5, .ref-code h5 { margin: 0 0 8px; color: #666; font-size: 0.9rem; }
.user-code pre, .ref-code pre {
  background: #2d2d2d; color: #f8f8f2;
  padding: 12px; border-radius: 8px;
  overflow-x: auto; font-size: 0.9rem;
}
.ref-code pre { background: #263238; }
.coding-result {
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
}
.coding-result.passed { background: #e8f5e9; color: #4caf50; }
.coding-result.failed { background: #ffebee; color: #f44336; }

.explanation {
  margin-top: 12px;
  padding: 10px 14px;
  background: #fff8e1;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #8c6e00;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .detail-nav { flex-direction: column; align-items: flex-start; }
  .score-card__breakdown { flex-wrap: wrap; gap: 10px; }
  .toolbar { flex-direction: column; align-items: stretch; }
  .toolbar__search { width: 100%; }
  .toolbar__dates { width: 100%; }
  .toolbar__dates :deep(.el-date-editor) { flex: 1; }
}
</style>
