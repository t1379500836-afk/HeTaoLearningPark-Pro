<template>
  <div>
    <!-- 老师视图：学生成绩列表 -->
    <template v-if="user.role === 'teacher'">
      <!-- 筛选工具栏 -->
      <div class="toolbar">
        <el-input
          v-model="filters.studentName"
          placeholder="搜索学生姓名…"
          prefix-icon="Search"
          clearable
          class="toolbar__search"
          @input="loadScores"
        />
        <el-select v-model="filters.level" placeholder="选择等级" clearable @change="onLevelChange">
          <el-option value="level4" label="四级" />
          <el-option value="level5" label="五级" />
          <el-option value="level6" label="六级" />
        </el-select>
        <el-select v-model="filters.setId" placeholder="选择套卷" clearable :disabled="!filters.level" @change="loadScores">
          <el-option
            v-for="set in availableSets"
            :key="set.id"
            :value="set.id"
            :label="set.name"
          />
        </el-select>
        <el-date-picker
          v-model="filters.dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
          @change="loadScores"
          clearable
        />
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>加载中…</p>
      </div>

      <!-- 试卷卡片视图 -->
      <div v-else>
        <div v-if="scoresData.length === 0" class="empty-state">
          <p>暂无成绩记录</p>
        </div>
        <div v-else>
          <!-- 按套卷分组展示 -->
          <div v-for="(group, setId) in groupedScores" :key="setId" class="set-group">
            <div class="set-group__header" @click="toggleSet(setId)">
              <div class="set-group__info">
                <span class="set-group__name">{{ group.setName }}</span>
                <span class="set-group__level">{{ getLevelName(group.level) }}</span>
                <span class="set-group__count">{{ group.records.length }} 次提交</span>
              </div>
              <div class="set-group__expand">
                <span class="expand-icon" :class="{ expanded: expandedSets.has(setId) }">▼</span>
              </div>
            </div>
            <div v-show="expandedSets.has(setId)" class="set-group__body">
              <!-- 每次提交记录卡片 -->
              <div
                v-for="record in group.records"
                :key="record.id"
                class="score-card"
                @click="openScoreDetail(record)"
              >
                <div class="score-card__header">
                  <div class="score-card__student">
                    <div class="student-avatar">{{ getInitial(record.student_name) }}</div>
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
          </div>

          <!-- 分页 -->
          <div v-if="totalPages > 1" class="pagination-wrap">
            <el-pagination
              v-model:current-page="currentPage"
              :page-size="pageSize"
              :total="total"
              layout="prev, pager, next"
              background
              @current-change="loadScores"
            />
          </div>
        </div>
      </div>
    </template>

    <!-- Admin 视图 -->
    <template v-else>
      <!-- 老师搜索 + 筛选工具栏 -->
      <div class="toolbar">
        <el-input
          v-model="filters.teacherName"
          placeholder="搜索老师姓名…"
          prefix-icon="Search"
          clearable
          class="toolbar__search"
          @input="loadTeachers"
        />
        <el-input
          v-model="filters.studentName"
          placeholder="搜索学生姓名…"
          prefix-icon="Search"
          clearable
          class="toolbar__search"
          @input="loadScores"
        />
        <el-select v-model="filters.level" placeholder="选择等级" clearable @change="onLevelChange">
          <el-option value="level4" label="四级" />
          <el-option value="level5" label="五级" />
          <el-option value="level6" label="六级" />
        </el-select>
        <el-date-picker
          v-model="filters.dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
          @change="loadScores"
          clearable
        />
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>加载中…</p>
      </div>

      <div v-else>
        <!-- 老师列表（未选老师时显示） -->
        <div v-if="!selectedTeacher" class="teacher-list">
          <div
            v-for="teacher in teacherList"
            :key="teacher.id"
            class="teacher-card"
            @click="selectTeacher(teacher)"
          >
            <div class="teacher-avatar" :style="{ background: getGradient(teacher.display_name) }">
              {{ getInitial(teacher.display_name) }}
            </div>
            <div class="teacher-info">
              <div class="teacher-name">{{ teacher.display_name }}</div>
              <div class="teacher-key">口令: {{ teacher.key }}</div>
            </div>
            <div class="teacher-arrow">›</div>
          </div>
          <div v-if="teacherList.length === 0" class="empty-state">
            <p>暂无老师数据</p>
          </div>
        </div>

        <!-- 选中老师后的成绩列表 -->
        <div v-else>
          <div class="selected-teacher-bar">
            <button class="back-btn" @click="selectedTeacher = null">← 返回老师列表</button>
            <span class="selected-teacher-name">{{ selectedTeacher.display_name }} 的学生成绩</span>
          </div>

          <div v-if="scoresData.length === 0" class="empty-state">
            <p>该老师暂无学生成绩记录</p>
          </div>
          <div v-else>
            <!-- 按套卷分组展示 -->
            <div v-for="(group, setId) in groupedScores" :key="setId" class="set-group">
              <div class="set-group__header" @click="toggleSet(setId)">
                <div class="set-group__info">
                  <span class="set-group__name">{{ group.setName }}</span>
                  <span class="set-group__level">{{ getLevelName(group.level) }}</span>
                  <span class="set-group__count">{{ group.records.length }} 次提交</span>
                </div>
                <div class="set-group__expand">
                  <span class="expand-icon" :class="{ expanded: expandedSets.has(setId) }">▼</span>
                </div>
              </div>
              <div v-show="expandedSets.has(setId)" class="set-group__body">
                <div
                  v-for="record in group.records"
                  :key="record.id"
                  class="score-card"
                  @click="openScoreDetail(record)"
                >
                  <div class="score-card__header">
                    <div class="score-card__student">
                      <div class="student-avatar">{{ getInitial(record.student_name) }}</div>
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
            </div>

            <!-- 分页 -->
            <div v-if="totalPages > 1" class="pagination-wrap">
              <el-pagination
                v-model:current-page="currentPage"
                :page-size="pageSize"
                :total="total"
                layout="prev, pager, next"
                background
                @current-change="loadScores"
              />
            </div>
          </div>
        </div>
      </div>
    </template>

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

        <!-- 题目列表 -->
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

              <!-- 选择题选项 -->
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

              <!-- 编程题 -->
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

              <!-- 解析 -->
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
import { ref, computed, onMounted, inject } from 'vue'
import api from '../api.js'

const user = inject('user')
const loading = ref(false)
const scoresData = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(20)
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

// 筛选条件
const filters = ref({
  studentName: '',
  level: '',
  setId: '',
  dateRange: null,
  teacherName: ''
})

// 老师列表（admin用）
const teacherList = ref([])
const selectedTeacher = ref(null)

// 展开的套卷
const expandedSets = ref(new Set())

// 成绩详情
const showDetail = ref(false)
const currentRecord = ref(null)

// 等级名称
const levelNames = { level4: '四级', level5: '五级', level6: '六级' }
function getLevelName(level) {
  return levelNames[level] || level
}

// 题型名称
function getQuestionTypeText(type) {
  const map = { 'single-choice': '单选题', 'multiple-choice': '多选题', 'coding': '编程题' }
  return map[type] || type
}

// 可选的套卷列表
const availableSets = computed(() => {
  if (!filters.value.level) return []
  const levelData = scoresData.value.find(s => s.level === filters.value.level)
  if (!levelData) return []
  // 从已加载数据中提取该level下的所有set
  return []
})

// 按套卷分组（用 level + set_id 作为复合 key，避免不同等级的同名套卷混在一起）
const groupedScores = computed(() => {
  const groups = {}
  for (const record of scoresData.value) {
    const key = `${record.level}__${record.set_id}`
    if (!groups[key]) {
      groups[key] = {
        setName: record.set_name,
        level: record.level,
        records: []
      }
    }
    groups[key].records.push(record)
  }
  return groups
})

// 加载成绩数据
async function loadScores() {
  loading.value = true
  try {
    const params = {
      page: currentPage.value,
      pageSize: pageSize.value
    }
    if (filters.value.studentName) params.studentName = filters.value.studentName
    if (filters.value.level) params.level = filters.value.level
    if (filters.value.setId) params.setId = filters.value.setId
    if (filters.value.dateRange && filters.value.dateRange.length === 2) {
      params.startDate = filters.value.dateRange[0]
      params.endDate = filters.value.dateRange[1]
    }
    if (selectedTeacher.value) {
      params.teacherId = selectedTeacher.value.id
    }

    const res = await api.get('/ycl/scores', { params })
    scoresData.value = res.data?.data || []
    total.value = res.data?.total || 0
  } catch (err) {
    console.error('加载成绩失败:', err)
  } finally {
    loading.value = false
  }
}

// 加载老师列表（admin用）
async function loadTeachers() {
  if (user.value?.role !== 'admin') return
  try {
    const params = {}
    if (filters.value.teacherName) params.search = filters.value.teacherName
    const res = await api.get('/teachers', { params })
    teacherList.value = Array.isArray(res.data) ? res.data : []
  } catch (err) {
    console.error('加载老师列表失败:', err)
  }
}

// 选择老师
function selectTeacher(teacher) {
  selectedTeacher.value = teacher
  loadScores()
}

// 等级变化时重置套卷筛选
function onLevelChange() {
  filters.value.setId = ''
  loadScores()
}

// 展开/收起套卷
function toggleSet(setId) {
  if (expandedSets.value.has(setId)) {
    expandedSets.value.delete(setId)
  } else {
    expandedSets.value.add(setId)
  }
}

// 打开成绩详情
function openScoreDetail(record) {
  currentRecord.value = record
  showDetail.value = true
}

// 计算单选题正确数
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

// 工具函数
function getInitial(name) {
  return name ? name.charAt(0).toUpperCase() : '?'
}

const GRADIENTS = [
  'linear-gradient(135deg, #667eea, #764ba2)',
  'linear-gradient(135deg, #f093fb, #f5576c)',
  'linear-gradient(135deg, #4facfe, #00f2fe)',
  'linear-gradient(135deg, #43e97b, #38f9d7)',
  'linear-gradient(135deg, #fa709a, #fee140)',
  'linear-gradient(135deg, #a8edea, #fed6e3)',
  'linear-gradient(135deg, #d299c2, #fef9d7)',
  'linear-gradient(135deg, #89f7fe, #66a6ff)',
]
function getGradient(name) {
  const idx = (name || '').charCodeAt(0) % GRADIENTS.length
  return GRADIENTS[idx]
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

// 初始化
onMounted(() => {
  if (user.role === 'admin') {
    loadTeachers()
  } else {
    loadScores()
  }
})
</script>

<style scoped>
/* 工具栏 */
.toolbar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  align-items: center;
}
.toolbar__search { width: 200px; }

/* 加载状态 */
.loading-state {
  text-align: center;
  padding: 60px 20px;
}
.spinner {
  width: 40px; height: 40px;
  border: 4px solid #f3f3f3;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 15px;
}
@keyframes spin { to { transform: rotate(360deg); } }

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

/* 老师卡片（admin） */
.teacher-list { display: flex; flex-direction: column; gap: 12px; }
.teacher-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 16px 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: all 0.2s;
}
.teacher-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.12); transform: translateY(-1px); }
.teacher-avatar {
  width: 48px; height: 48px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 600; font-size: 1.1rem;
  flex-shrink: 0;
}
.teacher-info { flex: 1; }
.teacher-name { font-size: 1.05rem; font-weight: 500; color: #333; }
.teacher-key { font-size: 0.85rem; color: #888; margin-top: 4px; }
.teacher-arrow { font-size: 1.5rem; color: #ccc; }

/* 选中老师栏 */
.selected-teacher-bar {
  display: flex;
  align-items: center;
  gap: 15px;
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
.selected-teacher-name { font-size: 1.1rem; font-weight: 500; color: #333; }

/* 套卷分组 */
.set-group {
  margin-bottom: 16px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  overflow: hidden;
}
.set-group__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  background: #fafafa;
}
.set-group__header:hover { background: #f0f0f0; }
.set-group__info { display: flex; align-items: center; gap: 12px; }
.set-group__name { font-weight: 600; color: #333; font-size: 1rem; }
.set-group__level {
  background: #667eea; color: #fff;
  padding: 2px 10px; border-radius: 10px; font-size: 0.8rem;
}
.set-group__count { color: #888; font-size: 0.85rem; }
.expand-icon { color: #999; font-size: 0.8rem; transition: transform 0.2s; }
.expand-icon.expanded { transform: rotate(180deg); }

.set-group__body { padding: 12px 16px; display: flex; flex-direction: column; gap: 12px; }

/* 成绩卡片 */
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
.student-avatar {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff; font-weight: 600;
  display: flex; align-items: center; justify-content: center;
}
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

/* 分页 */
.pagination-wrap { display: flex; justify-content: center; margin-top: 24px; }

/* 详情弹窗 */
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

/* 题目列表 */
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

/* 选择题选项 */
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

/* 编程题 */
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

/* 响应式 */
@media (max-width: 768px) {
  .toolbar { flex-direction: column; align-items: stretch; }
  .toolbar__search { width: 100%; }
  .detail-header { flex-direction: column; }
  .score-card__breakdown { flex-wrap: wrap; gap: 10px; }
}
</style>