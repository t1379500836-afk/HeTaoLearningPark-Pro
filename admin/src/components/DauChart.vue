<template>
  <div ref="chartRef" class="dau-chart"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  option: { type: Object, required: true }
})

const chartRef = ref(null)
let chart = null

function initChart() {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)
  chart.setOption(props.option)
}

function handleResize() {
  chart?.resize()
}

watch(() => props.option, (val) => {
  if (chart) {
    chart.setOption(val, { notMerge: true })
  }
}, { deep: true })

onMounted(() => {
  nextTick(initChart)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chart?.dispose()
  chart = null
})
</script>

<style scoped>
.dau-chart {
  width: 100%;
  height: 360px;
}

@media (max-width: 768px) {
  .dau-chart {
    height: 280px;
  }
}
</style>
