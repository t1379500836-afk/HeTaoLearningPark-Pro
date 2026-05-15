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
        <div class="level-tags">
          <span
            class="level-tag"
            :class="{ active: filters.level === '' }"
            @click="onLevelTagChange('')"
          >全部</span>
          <span
            class="level-tag"
            :class="{ active: filters.level === 'level4' }"
            @click="onLevelTagChange('level4')"
          >四级</span>
          <span
            class="level-tag"
            :class="{ active: filters.level === 'level5' }"
            @click="onLevelTagChange('level5')"
          >五级</span>
          <span
            class="level-tag"
            :class="{ active: filters.level === 'level6' }"
            @click="onLevelTagChange('level6')"
          >六级</span>
        </div>
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
          <div v-for="(group, setId) in groupedScores" :key="setId" class="set-group" @click="goToSetDetail(setId, group)">
            <div class="set-group__header">
              <div class="set-group__info">
                <span class="set-group__name">{{ group.setName }}</span>
                <span class="set-group__level">{{ getLevelName(group.level) }}</span>
                <span class="set-group__count">{{ group.records.length }} 次提交</span>
              </div>
              <div class="set-group__arrow">›</div>
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
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>加载中…</p>
      </div>

      <div v-else>
          <div v-if="!selectedTeacher" class="teacher-section">
            <div class="toolbar">
            <el-input
              v-model="filters.teacherName"
              placeholder="搜索教师姓名或口令…"
              prefix-icon="Search"
              clearable
              class="toolbar__search"
            />
          </div>
          <div class="teacher-list">
          <div
            v-for="teacher in paginatedTeachers"
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
          <div v-if="filteredTeachers.length === 0" class="empty-state">
            <p>暂无教师数据</p>
          </div>
          <div v-if="filteredTeachers.length > teacherPageSize" class="pagination-wrap">
            <el-pagination
              v-model:current-page="teacherPage"
              :page-size="teacherPageSize"
              :total="filteredTeachers.length"
              layout="prev, pager, next"
              background
            />
          </div>
          </div>
        </div>

        <!-- 选中老师后的套卷汇总列表 -->
        <div v-else>
          <div class="selected-teacher-bar">
            <button class="back-btn" @click="selectedTeacher = null">← 返回教师列表</button>
            <span class="selected-teacher-name">{{ selectedTeacher.display_name }} 的学生提交试卷列表</span>
          </div>

          <!-- 学生姓名搜索 -->
          <div class="student-search">
            <el-input
              v-model="studentSearchQuery"
              placeholder="搜索学生姓名…"
              prefix-icon="Search"
              clearable
              @input="onStudentSearch"
              @clear="clearStudentSearch"
              class="student-search__input"
            />
            <button v-if="isSearching" class="clear-search-btn" @click="clearStudentSearch">取消搜索</button>
          </div>

          <!-- 加载状态 -->
          <div v-if="loading" class="loading-state">
            <div class="spinner"></div>
            <p>加载中…</p>
          </div>

          <!-- 搜索结果列表 -->
          <div v-else-if="isSearching">
            <div v-if="studentSubmissions.length === 0" class="empty-state">
              <p>未找到该学生的提交记录</p>
            </div>
            <div v-else>
              <div v-for="item in studentSubmissions" :key="item.setId + item.studentName" class="set-group" @click="goToSetDetail(item)">
                <div class="set-group__header">
                  <div class="set-group__info">
                    <span class="set-group__name">{{ item.setName }}</span>
                    <span class="set-group__level">{{ getLevelName(item.level) }}</span>
                    <span class="set-group__time">{{ formatDateTime(item.submittedAt) }}</span>
                  </div>
                  <div class="set-group__arrow">›</div>
                </div>
              </div>

              <!-- 分页 -->
              <div v-if="studentSubmissionsPages > 1" class="pagination-wrap">
                <el-pagination
                  v-model:current-page="studentSearchPage"
                  :page-size="studentSearchPageSize"
                  :total="studentSubmissionsTotal"
                  layout="prev, pager, next"
                  background
                  @current-change="loadStudentSubmissions"
                />
              </div>
            </div>
          </div>

          <!-- 套卷汇总列表 -->
          <div v-else>
            <div v-if="teacherSets.length === 0" class="empty-state">
              <p>暂无套卷提交记录</p>
            </div>
            <div v-else>
              <div v-for="item in teacherSets" :key="item.setId" class="set-group" @click="goToSetDetail(item)">
                <div class="set-group__header">
                  <div class="set-group__info">
                    <span class="set-group__name">{{ item.setName }}</span>
                    <span class="set-group__level">{{ getLevelName(item.level) }}</span>
                    <span class="set-group__count">{{ item.submissionCount }} 次提交</span>
                  </div>
                  <div class="set-group__arrow">›</div>
                </div>
              </div>

              <!-- 分页 -->
              <div v-if="teacherSetsTotalPages > 1" class="pagination-wrap">
                <el-pagination
                  v-model:current-page="teacherSetsPage"
                  :page-size="teacherSetsPageSize"
                  :total="teacherSetsTotal"
                  layout="prev, pager, next"
                  background
                  @current-change="loadTeacherSets"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 成绩详情弹窗 -->
    <el-dialog
      v-model="showDetail"
      :title="currentRecord?.student_name + ' 的答题详情'"
      :fullscreen="isMobileDialog"
      class="score-detail-dialog"
      destroy-on-close
      :show-close="true"
    >
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
import { ref, computed, onMounted, inject, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '../api.js'

const router = useRouter()
const route = useRoute()

const user = inject('user')
const loading = ref(false)
const scoresData = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(20)
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

// 弹窗宽度（平板和移动端自适应）
const dialogWidth = computed(() => {
  if (typeof window !== 'undefined' && window.innerWidth <= 1024) {
    return window.innerWidth <= 768 ? '95vw' : '90vw'
  }
  return '800px'
})

const isMobileDialog = computed(() => {
  if (typeof window === 'undefined') return false
  return window.innerWidth <= 768
})

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
const teacherPage = ref(1)
const teacherPageSize = 10

// 管理员选择老师后查看的套卷汇总列表
const teacherSets = ref([])
const teacherSetsTotal = ref(0)
const teacherSetsTotalPages = computed(() => Math.ceil(teacherSetsTotal.value / teacherSetsPageSize.value))
const teacherSetsPage = ref(1)
const teacherSetsPageSize = ref(50)

// 学生搜索
const studentSearchQuery = ref('')
const studentSubmissions = ref([])
const studentSubmissionsTotal = ref(0)
const studentSearchPage = ref(1)
const studentSearchPageSize = ref(50)
const studentSubmissionsPages = computed(() => Math.ceil(studentSubmissionsTotal.value / studentSearchPageSize.value))
const isSearching = computed(() => studentSearchQuery.value.trim().length > 0)

// 老师分页数据
const paginatedTeachers = computed(() => {
  const start = (teacherPage.value - 1) * teacherPageSize
  return filteredTeachers.value.slice(start, start + teacherPageSize)
})
const teacherTotalPages = computed(() => Math.ceil(filteredTeachers.value.length / teacherPageSize))

watch(() => filters.value.teacherName, () => { teacherPage.value = 1 })

// 监听路由 query 变化恢复状态（从套卷详情页返回时）
watch(() => route.query.teacherId, (newId) => {
  if (newId && teacherList.value.length > 0) {
    const teacher = teacherList.value.find(t => String(t.id) === String(newId))
    if (teacher) {
      selectedTeacher.value = teacher
      loadTeacherSets()
    }
  }
})

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

// 跳转套卷详情页
function goToSetDetail(item) {
  router.push({
    path: `/ycl-scores/set/${item.setId}`,
    query: {
      setName: item.setName,
      level: item.level,
      teacherId: selectedTeacher.value?.id,
      from: '/ycl-scores'
    }
  })
}

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
    const res = await api.get('/teachers')
    teacherList.value = Array.isArray(res.data) ? res.data : []
    // 教师列表加载完成后检查是否需要恢复选中状态
    const teacherId = route.query.teacherId
    if (teacherId) {
      const teacher = teacherList.value.find(t => String(t.id) === String(teacherId))
      if (teacher) {
        selectedTeacher.value = teacher
        loadTeacherSets()
      }
    }
  } catch (err) {
    console.error('加载教师列表失败:', err)
  }
}

// 前端筛选老师
const filteredTeachers = computed(() => {
  if (!filters.value.teacherName) return teacherList.value
  const q = filters.value.teacherName.toLowerCase()
  return teacherList.value.filter(t =>
    t.display_name?.toLowerCase().includes(q) ||
    t.key?.toLowerCase().includes(q)
  )
})

// 选择老师
function selectTeacher(teacher) {
  selectedTeacher.value = teacher
  teacherSetsPage.value = 1
  loadTeacherSets()
}

// 加载老师的套卷汇总
async function loadTeacherSets() {
  loading.value = true
  try {
    const params = {
      page: teacherSetsPage.value,
      pageSize: teacherSetsPageSize.value,
      teacherId: selectedTeacher.value.id
    }
    const res = await api.get('/ycl/teacher-sets', { params })
    teacherSets.value = res.data?.data || []
    teacherSetsTotal.value = res.data?.total || 0
  } catch (err) {
    console.error('加载套卷汇总失败:', err)
  } finally {
    loading.value = false
  }
}

// 学生姓名搜索（防抖）
let studentSearchTimer = null
function onStudentSearch() {
  clearTimeout(studentSearchTimer)
  studentSearchTimer = setTimeout(() => {
    studentSearchPage.value = 1
    if (studentSearchQuery.value.trim()) {
      loadStudentSubmissions()
    } else {
      studentSubmissions.value = []
    }
  }, 300)
}

function clearStudentSearch() {
  studentSearchQuery.value = ''
  studentSubmissions.value = []
}

async function loadStudentSubmissions() {
  loading.value = true
  try {
    const params = {
      page: studentSearchPage.value,
      pageSize: studentSearchPageSize.value,
      teacherId: selectedTeacher.value.id,
      studentName: studentSearchQuery.value.trim()
    }
    const res = await api.get('/ycl/student-sets', { params })
    studentSubmissions.value = res.data?.data || []
    studentSubmissionsTotal.value = res.data?.total || 0
  } catch (err) {
    console.error('搜索学生提交失败:', err)
  } finally {
    loading.value = false
  }
}

// 等级变化时重置套卷筛选
function onLevelChange() {
  loadScores()
}

function onLevelTagChange(level) {
  filters.value.level = level
  onLevelChange()
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
  if (!name) return '?'
  const text = name.endsWith('老师') ? name.slice(0, -2) : name
  return text.length > 4 ? text.slice(0, 4) : text
}

function getGradient() {
  return 'linear-gradient(135deg, #667eea, #764ba2)'
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
  // 只有从套卷详情页返回（URL 有 teacherId）才恢复教师选中状态
  // 直接从侧边栏进入则显示教师列表
  const teacherId = route.query.teacherId
  if (teacherId) {
    if (teacherList.value.length > 0) {
      const teacher = teacherList.value.find(t => String(t.id) === String(teacherId))
      if (teacher) {
        selectedTeacher.value = teacher
        loadTeacherSets()
      }
    }
  } else {
    selectedTeacher.value = null
  }

  if (user.value?.role === 'admin') {
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

/* 等级标签 */
.level-tags { display: flex; gap: 8px; align-items: center; }
.level-tag {
  padding: 6px 16px;
  border-radius: 20px;
  background: #f0f0f0;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}
.level-tag:hover { background: #e0e0e0; }
.level-tag.active {
  background: #667eea;
  color: #fff;
  font-weight: 500;
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
.teacher-avatar { min-width: 40px; height: 40px; border-radius: 10px; color: #fff; font-weight: 700; font-size: 13px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 0 10px; box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3); }
.teacher-info { flex: 1; }
.teacher-name { font-size: 1.05rem; font-weight: 500; color: #333; }
.teacher-key { font-size: 0.85rem; color: #888; margin-top: 4px; }
.teacher-arrow { font-size: 1.5rem; color: #ccc; }

/* 分页 */
.pagination-wrap { display: flex; justify-content: center; margin-top: 20px; }
:deep(.el-pagination) { --el-pagination-button-bg-color: #fff; --el-pagination-hover-color: #667eea; }
:deep(.el-pagination .el-pager li.is-active) { background: #667eea !important; color: #fff; }

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

/* 学生搜索 */
.student-search {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  align-items: center;
}
.student-search__input { width: 240px; }
.clear-search-btn {
  padding: 8px 16px;
  background: #ff9f00;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.85rem;
  white-space: nowrap;
}

/* 套卷分组 */
.set-group {
  margin-bottom: 16px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}
.set-group:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.12); transform: translateY(-1px); }
.set-group__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
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
.set-group__time { color: #888; font-size: 0.8rem; }
.set-group__arrow { font-size: 1.5rem; color: #ccc; }

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
  .student-search { flex-direction: column; align-items: stretch; }
  .student-search__input { width: 100%; }
  .selected-teacher-bar { flex-direction: column; align-items: flex-start; gap: 10px; }
  .selected-teacher-name { font-size: 1rem; }
  .set-group__info { flex-wrap: wrap; gap: 8px; }
}

/* 移动端弹窗适配 */
@media (max-width: 768px) {
  .detail-content { max-height: 65vh; overflow-y: auto; }
  .detail-stats { flex-direction: column; gap: 12px; }
  .detail-score { flex-direction: row; gap: 12px; align-items: center; }
  .question-item__header { flex-wrap: wrap; gap: 6px; }
  .result-tag { margin-left: 0; }
}
</style>