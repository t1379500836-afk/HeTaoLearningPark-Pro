<template>
  <div>
    <!-- 日期筛选 -->
    <div class="stats-toolbar">
      <el-radio-group v-model="statsRange" @change="onStatsRangeChange">
        <el-radio-button value="today">今天</el-radio-button>
        <el-radio-button value="7d">近 7 天</el-radio-button>
        <el-radio-button value="30d">近 30 天</el-radio-button>
        <el-radio-button value="custom">自定义</el-radio-button>
      </el-radio-group>
      <div v-if="statsRange === 'custom'" class="stats-toolbar__dates">
        <el-date-picker
          v-model="customStartDate"
          type="date"
          placeholder="开始日期"
          :disabled-date="d => d > new Date()"
          value-format="YYYY-MM-DD"
          @change="onCustomDateChange"
        />
        <span class="stats-toolbar__sep">至</span>
        <el-date-picker
          v-model="customEndDate"
          type="date"
          placeholder="结束日期"
          :disabled-date="d => customStartDate ? d < new Date(customStartDate) : d > new Date()"
          value-format="YYYY-MM-DD"
          @change="onCustomDateChange"
        />
      </div>
    </div>

    <!-- 概览卡片 + 排行榜 -->
    <div class="stats-middle">
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-card__shine"></div>
          <div class="stat-card__body">
            <div class="stat-card__icon">
              <el-icon :size="26"><UserFilled /></el-icon>
            </div>
            <div>
              <div class="stat-card__num">{{ dauSummary.todayTotal }}</div>
              <div class="stat-card__label">今日日活</div>
            </div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card__shine"></div>
          <div class="stat-card__body">
            <div class="stat-card__icon">
              <el-icon :size="26"><TrendCharts /></el-icon>
            </div>
            <div>
              <div class="stat-card__num">{{ dauSummary.sevenDayAvg }}</div>
              <div class="stat-card__label">7 日均值</div>
            </div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card__shine"></div>
          <div class="stat-card__body">
            <div class="stat-card__icon">
              <el-icon :size="26"><Calendar /></el-icon>
            </div>
            <div>
              <div class="stat-card__num">{{ dauSummary.thirtyDayTotal }}</div>
              <div class="stat-card__label">30 日总活</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 活跃排行榜 -->
      <div v-if="leaderboardData.length" class="leaderboard">
      <h3 class="leaderboard__title">活跃排行榜</h3>
      <div class="leaderboard__list">
        <div
          class="lb-item"
          :class="{ 'lb-item--selected': !selectedTeacherName }"
          @click="selectedTeacherName = null"
        >
          <div class="lb-item__rank" style="background: linear-gradient(135deg, #667eea, #764ba2); color: #fff; font-size: 11px;">
            ALL
          </div>
          <div class="lb-item__main">
            <div class="lb-item__name">全部老师</div>
            <div class="lb-item__bar">
              <div class="lb-item__fill" style="width: 100%; background: linear-gradient(90deg, #667eea, #764ba2);"></div>
            </div>
          </div>
          <div class="lb-item__count">{{ totalAllDau }}<small> 人次</small></div>
        </div>
        <div
          v-for="(item, idx) in pagedLeaderboard"
          :key="item.teacherName"
          class="lb-item"
          :class="{ 'lb-item--selected': selectedTeacherName === item.teacherName }"
          @click="selectTeacher(item.teacherName)"
        >
          <div
            class="lb-item__rank"
            :style="(lbPage - 1) * 5 + idx < 3 ? { background: RANK_STYLES[(lbPage - 1) * 5 + idx].bg, color: RANK_STYLES[(lbPage - 1) * 5 + idx].color } : {}"
          >{{ (lbPage - 1) * 5 + idx + 1 }}</div>
          <div class="lb-item__main">
            <div class="lb-item__name">{{ item.teacherName }}</div>
            <div class="lb-item__bar">
              <div
                class="lb-item__fill"
                :style="{ width: (item.totalDau / maxLeaderboardDau * 100) + '%' }"
              ></div>
            </div>
          </div>
          <div class="lb-item__count">{{ item.totalDau }}<small> 人次</small></div>
        </div>
      </div>
      <div v-if="lbTotalPages > 1" class="leaderboard__pager">
        <button class="lb-pager__btn" :disabled="lbPage <= 1" @click="lbPage--">&lt;</button>
        <span class="lb-pager__info">{{ lbPage }} / {{ lbTotalPages }}</span>
        <button class="lb-pager__btn" :disabled="lbPage >= lbTotalPages" @click="lbPage++">&gt;</button>
      </div>
      </div>
    </div>

    <!-- 趋势折线图 -->
    <div class="chart-card">
      <h3 class="chart-card__title">
        日活趋势
        <span v-if="selectedTeacherName" class="chart-card__filter">
          — {{ selectedTeacherName }}
          <button class="filter-clear" @click="selectedTeacherName = null">&times;</button>
        </span>
        <button
          v-if="user.role === 'teacher'"
          class="my-data-btn"
          :class="{ 'my-data-btn--active': selectedTeacherName === user.displayName }"
          @click="selectTeacher(user.displayName)"
        >我的数据</button>
      </h3>
      <DauChart :option="trendChartOption" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, inject } from 'vue'
import api from '../api.js'
import DauChart from '../components/DauChart.vue'

const user = inject('user')

const statsRange = ref('today')
const customStartDate = ref(null)
const customEndDate = ref(null)
const dauSummary = ref({ todayTotal: 0, sevenDayAvg: 0, thirtyDayTotal: 0, breakdown: [] })
const dauDaily = ref([])
const dauTotals = ref([])
const dauHourly = ref([])
const leaderboardData = ref([])
const lbPage = ref(1)
const LB_PAGE_SIZE = 5
const selectedTeacherName = ref(user.value.role === 'teacher' ? user.value.displayName : null)

const lbTotalPages = computed(() => Math.max(1, Math.ceil(leaderboardData.value.length / LB_PAGE_SIZE)))
const pagedLeaderboard = computed(() => {
  const start = (lbPage.value - 1) * LB_PAGE_SIZE
  return leaderboardData.value.slice(start, start + LB_PAGE_SIZE)
})

watch(statsRange, () => {
  lbPage.value = 1
  selectedTeacherName.value = user.value.role === 'teacher' ? user.value.displayName : null
})

function selectTeacher(name) {
  selectedTeacherName.value = selectedTeacherName.value === name ? null : name
}

const totalAllDau = computed(() => leaderboardData.value.reduce((sum, t) => sum + t.totalDau, 0))

function onStatsRangeChange() {
  if (statsRange.value === 'custom' && (!customStartDate.value || !customEndDate.value)) return
  selectedTeacherName.value = user.value.role === 'teacher' ? user.value.displayName : null
  loadStats()
}

function onCustomDateChange() {
  if (customStartDate.value && customEndDate.value) loadStats()
}

function getStatsDateRange() {
  if (statsRange.value === 'custom' && customStartDate.value && customEndDate.value) {
    return { start: customStartDate.value, end: customEndDate.value }
  }
  const d = new Date()
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  if (statsRange.value === 'today') return { start: today, end: today }
  const days = statsRange.value === '7d' ? 6 : 29
  const ds = new Date(Date.now() - days * 86400000)
  const start = `${ds.getFullYear()}-${String(ds.getMonth() + 1).padStart(2, '0')}-${String(ds.getDate()).padStart(2, '0')}`
  return { start, end: today }
}

async function loadStats() {
  const { start, end } = getStatsDateRange()
  const [summaryRes, dauRes] = await Promise.all([
    api.get('/stats/dau/summary', { params: { startDate: start, endDate: end } }),
    api.get('/stats/dau', { params: { startDate: start, endDate: end } })
  ])
  dauSummary.value = summaryRes.data
  dauDaily.value = dauRes.data.dailyStats
  dauTotals.value = dauRes.data.totalsByDate
  dauHourly.value = dauRes.data.hourlyStats

  try {
    const lbRes = await api.get('/stats/dau/leaderboard', { params: { startDate: start, endDate: end } })
    leaderboardData.value = lbRes.data
  } catch {
    leaderboardData.value = []
  }
}

const maxLeaderboardDau = computed(() => {
  if (!leaderboardData.value.length) return 1
  return Math.max(...leaderboardData.value.map(t => t.totalDau), 1)
})

const RANK_STYLES = [
  { bg: 'linear-gradient(135deg, #FFD700, #FFA500)', color: '#fff' },
  { bg: 'linear-gradient(135deg, #C0C0C0, #9E9E9E)', color: '#fff' },
  { bg: 'linear-gradient(135deg, #CD7F32, #A0522D)', color: '#fff' }
]

const trendChartOption = computed(() => {
  const { start, end } = getStatsDateRange()
  const isSingleDay = start === end
  const teacher = selectedTeacherName.value

  if (isSingleDay) {
    const hourMap = {}
    for (let h = 0; h < 24; h++) hourMap[h] = 0
    for (const r of dauHourly.value) hourMap[r.hour] = r.count
    const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`)
    const values = Array.from({ length: 24 }, (_, i) => hourMap[i])
    const opts = {
      tooltip: { trigger: 'axis', formatter: (p) => `${p[0].axisValue}<br/>活跃人数：<b>${p[0].value}</b>` },
      grid: { left: 50, right: 20, top: 20, bottom: 30 },
      xAxis: { type: 'category', data: hours },
      yAxis: { type: 'value', minInterval: 1 },
      series: [{
        type: 'line', data: values, smooth: true,
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(102,126,234,0.3)' }, { offset: 1, color: 'rgba(102,126,234,0.02)' }] } },
        lineStyle: { color: '#667eea', width: 2.5 },
        itemStyle: { color: '#667eea' }
      }]
    }
    if (teacher) {
      opts.title = { text: `${teacher} - 按小时（汇总）`, textStyle: { fontSize: 13, color: '#999' }, left: 'center', top: 0 }
      opts.grid.top = 36
    }
    return opts
  }

  if (teacher) {
    const filtered = dauDaily.value
      .filter(r => r.teacherName === teacher)
      .sort((a, b) => a.date.localeCompare(b.date))
    return {
      tooltip: { trigger: 'axis', formatter: (p) => `${p[0].axisValue}<br/>日活：<b>${p[0].value}</b>` },
      grid: { left: 50, right: 20, top: 20, bottom: 30 },
      xAxis: { type: 'category', data: filtered.map(r => r.date.slice(5)), boundaryGap: false },
      yAxis: { type: 'value', minInterval: 1 },
      series: [{
        type: 'line', data: filtered.map(r => r.dauCount), smooth: true,
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(102,126,234,0.3)' }, { offset: 1, color: 'rgba(102,126,234,0.02)' }] } },
        lineStyle: { color: '#667eea', width: 2.5 },
        itemStyle: { color: '#667eea' }
      }]
    }
  }

  const sorted = [...dauTotals.value].sort((a, b) => a.date.localeCompare(b.date))
  return {
    tooltip: { trigger: 'axis', formatter: (p) => `${p[0].axisValue}<br/>日活：<b>${p[0].value}</b>` },
    grid: { left: 50, right: 20, top: 20, bottom: 30 },
    xAxis: { type: 'category', data: sorted.map(r => r.date.slice(5)), boundaryGap: false },
    yAxis: { type: 'value', minInterval: 1 },
    series: [{
      type: 'line', data: sorted.map(r => r.totalDau), smooth: true,
      areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(102,126,234,0.3)' }, { offset: 1, color: 'rgba(102,126,234,0.02)' }] } },
      lineStyle: { color: '#667eea', width: 2.5 },
      itemStyle: { color: '#667eea' }
    }]
  }
})

onMounted(() => loadStats())
</script>

<style scoped>
/* 概览卡片 + 排行榜并排布局 */
.stats-middle { display: flex; gap: 20px; margin-bottom: 20px; align-items: flex-start; }
.stats-middle .stats-row { display: flex; flex-direction: column; gap: 14px; margin-bottom: 0; width: 260px; flex-shrink: 0; }
.stats-middle .stat-card { padding: 16px 18px; }
.stats-middle .stat-card__num { font-size: 24px; }
.stats-middle .stat-card__icon { width: 42px; height: 42px; border-radius: 12px; }
.stats-middle .leaderboard { flex: 1; min-width: 0; margin-bottom: 0; }

/* 统计工具栏 */
.stats-toolbar { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; flex-wrap: wrap; }
.stats-toolbar__dates { display: flex; align-items: center; gap: 8px; }
.stats-toolbar__sep { color: #999; font-size: 14px; }

/* 图表卡片 */
.chart-card { background: #fff; border-radius: 16px; padding: 20px 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); margin-bottom: 20px; }
.chart-card__title { margin: 0 0 16px; font-size: 16px; font-weight: 600; color: #1a1a2e; display: flex; align-items: center; }
.chart-card__filter { font-size: 14px; font-weight: 400; color: #667eea; margin-left: 6px; }
.filter-clear { background: rgba(102,126,234,0.15); border: none; border-radius: 50%; width: 20px; height: 20px; font-size: 14px; color: #667eea; cursor: pointer; margin-left: 4px; display: inline-flex; align-items: center; justify-content: center; transition: background 0.2s; }
.filter-clear:hover { background: rgba(102,126,234,0.3); }
.my-data-btn { margin-left: auto; padding: 4px 14px; font-size: 13px; font-weight: 500; color: #667eea; background: rgba(102,126,234,0.08); border: 1px solid rgba(102,126,234,0.25); border-radius: 16px; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
.my-data-btn:hover { background: rgba(102,126,234,0.15); }
.my-data-btn--active { color: #fff; background: #667eea; border-color: #667eea; }

/* 排行榜 */
.leaderboard { background: #fff; border-radius: 16px; padding: 20px 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); margin-bottom: 20px; }
.leaderboard__title { margin: 0 0 18px; font-size: 16px; font-weight: 600; color: #1a1a2e; }
.leaderboard__list { display: flex; flex-direction: column; }
.lb-item { display: flex; align-items: center; gap: 14px; padding: 12px 0; border-bottom: 1px solid #f5f5f5; cursor: pointer; transition: background 0.2s; }
.lb-item:hover { background: #f8f9ff; }
.lb-item--selected { background: linear-gradient(90deg, #f0f2ff, #fff); border-left: 3px solid #667eea; padding-left: 8px; }
.lb-item--selected .lb-item__name { color: #667eea; font-weight: 700; }
.lb-item:last-child { border-bottom: none; }
.lb-item__rank { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; color: #999; background: #f0f0f0; flex-shrink: 0; }
.lb-item__main { flex: 1; min-width: 0; }
.lb-item__name { font-size: 14px; font-weight: 500; color: #1a1a2e; margin-bottom: 6px; }
.lb-item__bar { height: 6px; background: #f0f0f0; border-radius: 3px; overflow: hidden; }
.lb-item__fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, #667eea, #764ba2); transition: width .5s ease; }
.lb-item:nth-child(2) .lb-item__fill { background: linear-gradient(90deg, #FFD700, #FFA500); }
.lb-item:nth-child(3) .lb-item__fill { background: linear-gradient(90deg, #B0BEC5, #78909C); }
.lb-item:nth-child(4) .lb-item__fill { background: linear-gradient(90deg, #CD7F32, #A0522D); }
.leaderboard__pager { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 12px; padding-top: 12px; border-top: 1px solid #f0f0f0; }
.lb-pager__btn { width: 30px; height: 30px; border-radius: 8px; border: 1px solid #e0e0e0; background: #fff; color: #667eea; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s; }
.lb-pager__btn:hover:not(:disabled) { background: #667eea; color: #fff; border-color: #667eea; }
.lb-pager__btn:disabled { opacity: .35; cursor: default; }
.lb-pager__info { font-size: 13px; color: #999; }
.lb-item__count { font-size: 18px; font-weight: 700; color: #667eea; flex-shrink: 0; text-align: right; min-width: 70px; }
.lb-item__count small { font-size: 12px; font-weight: 400; color: #999; }

/* 响应式 */
@media (max-width: 580px) {
  .stats-middle { flex-direction: column; align-items: stretch; }
  .stats-middle .stats-row { width: 100%; flex-direction: column; }
  .stats-toolbar { gap: 10px; }
  .stats-toolbar__dates { width: 100%; }
  .stats-toolbar__dates :deep(.el-date-editor) { flex: 1; }
  .stats-toolbar :deep(.el-radio-button__inner) { padding: 6px 10px; font-size: 13px; }
  .leaderboard { padding: 16px; }
  .lb-item { gap: 10px; padding: 10px 0; }
  .lb-item__rank { width: 26px; height: 26px; font-size: 12px; }
  .lb-item__name { font-size: 13px; }
  .lb-item__count { font-size: 16px; min-width: 60px; }
}
</style>
