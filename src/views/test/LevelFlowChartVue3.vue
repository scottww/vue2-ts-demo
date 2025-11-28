<template>
  <div ref="chartRef" style="width: 100%; height: 100%"></div>
</template>

<script>
import * as echarts from 'echarts'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

export default {
  name: 'WaterRainChart',
  props: {
    data: {
      type: Array,
      default: () => [
        {
          time: '2025-09-16 08:00',
          rainfall: 0.1,
          cumulativeRainfall: 0,
          upWaterLevel: 1.7,
          downWaterLevel: 1.2,
        },
        {
          time: '2025-09-16 21:00',
          rainfall: 3.7,
          cumulativeRainfall: 3.7,
          upWaterLevel: 1.8,
          downWaterLevel: 1.3,
        },
        {
          time: '2025-09-17 00:00',
          rainfall: 6.3,
          cumulativeRainfall: 10,
          upWaterLevel: 2.0,
          downWaterLevel: 1.5,
        },
        {
          time: '2025-09-17 03:00',
          rainfall: 7.8,
          cumulativeRainfall: 17.8,
          // waterLevel: 2.3,
          upWaterLevel: 2.9,
          downWaterLevel: 2.3,
        },
        {
          time: '2025-09-17 06:00',
          rainfall: 8.4,
          cumulativeRainfall: 26.2,
          // waterLevel: 2.8,
          upWaterLevel: 3.8,
          downWaterLevel: 3.3,
        },
        {
          time: '2025-09-17 09:00',
          rainfall: 3.0,
          cumulativeRainfall: 29.4,
          upWaterLevel: 4.2,
          downWaterLevel: 3.0,
        },
        {
          time: '2025-09-17 12:00',
          rainfall: 3.2,
          cumulativeRainfall: 32.6,
          upWaterLevel: 4.2,
          downWaterLevel: 3.2,
        },
        {
          time: '2025-09-17 15:00',
          rainfall: 3.3,
          cumulativeRainfall: 35.8,
          upWaterLevel: 3.7,
          downWaterLevel: 3.2,
        },
      ],
    },
  },
  setup(props) {
    const chartRef = ref(null)
    let chartInstance = null

    const initChart = () => {
      if (!chartRef.value) return
      chartInstance = echarts.init(chartRef.value)
      setChartOptions()
    }

    const setChartOptions = () => {
      if (!chartInstance) return

      const timeData = props.data.map((i) => i.time)
      const rainfall = props.data.map((i) => i.rainfall)
      const cumulativeRainfall = props.data.map((i) => i.cumulativeRainfall)
      const upWaterLevel = props.data.map((i) => i.upWaterLevel)
      const downWaterLevel = props.data.map((i) => i.downWaterLevel)

      const option = {
        color: ['#3BC8D4', '#3D92FF', '#54F9B4'],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.7)',
          borderColor: '#3BC8D4',
          borderWidth: 1,
          textStyle: { color: '#fff', fontSize: 14 },
        },
        legend: {
          data: ['雨量', '累计雨量', '闸上水位', '闸下水位'],
          textStyle: { color: '#fff' },
          top: 5,
        },
        grid: [
          { left: '5%', top: '20%', right: '5%', height: '30%', containLabel: true },
          { left: '5%', top: '65%', right: '5%', height: '35%', containLabel: true },
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: timeData,
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.6)' } },
            axisTick: { show: false, alignWithLabel: true },
            boundaryGap: true,
            axisLabel: { show: false },
          },
          {
            gridIndex: 1,
            type: 'category',
            data: timeData,
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.6)' } },
            axisTick: { show: false, alignWithLabel: true },
            axisLabel: {
              color: '#fff',
              interval: 0,
              formatter: function (value) {
                const d = new Date(value)
                const day = String(d.getDate()).padStart(2, '0') + '日'
                const hour = String(d.getHours()).padStart(2, '0') + '时'
                return `${day}\n${hour}`
              },
            },
          },
        ],
        yAxis: [
          {
            gridIndex: 0,
            type: 'value',
            min: 0,
            // max: 10,
            position: 'left',
            inverse: true,
            axisLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.6)' } },
            axisLabel: { color: '#fff' },
            splitLine: { show: false },
          },
          {
            gridIndex: 0,
            type: 'value',
            min: 0,
            // max: 40,
            position: 'right',
            inverse: true,
            axisLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.6)' } },
            axisLabel: { color: '#fff' },
            splitLine: { show: false },
          },
          {
            gridIndex: 1,
            type: 'value',
            min: 0,
            // max: 4,
            position: 'center',
            axisLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.6)' } },
            axisLabel: { color: '#fff' },
            splitLine: { show: false },
          },
        ],
        series: [
          {
            name: '雨量',
            type: 'bar',
            gridIndex: 0,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: rainfall,
            barWidth: '20%',
            itemStyle: { color: '#3BC8D4' },
            label: { show: true, position: 'bottom', color: '#fff' },
          },
          {
            name: '累计雨量',
            type: 'line',
            gridIndex: 0,
            xAxisIndex: 0,
            yAxisIndex: 1,
            data: cumulativeRainfall,
            smooth: true,
            lineStyle: { color: '#2196f3', width: 2 },
            itemStyle: { color: '#2196f3', borderColor: '#fff', borderWidth: 1 },
            symbol: 'none',
          },
          {
            name: '闸上水位',
            type: 'line',
            gridIndex: 1,
            xAxisIndex: 1,
            yAxisIndex: 2,
            data: upWaterLevel,
            smooth: true,
            lineStyle: { color: '#3DFF86' },
            itemStyle: { color: '#3DFF86', borderColor: '#fff', borderWidth: 1 },
            // areaStyle: {
            //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //     { offset: 0, color: 'rgba(25, 255, 244, 0.3)' },
            //     { offset: 0.5, color: 'rgba(61, 255, 134, 0.3)' },
            //     { offset: 1, color: 'rgba(7, 25, 59, 0.3)' },
            //   ]),
            // },
            symbol: 'none',
          },
          {
            name: '闸下水位',
            type: 'line',
            gridIndex: 1,
            xAxisIndex: 1,
            yAxisIndex: 2,
            data: downWaterLevel,
            smooth: true,
            lineStyle: { color: '#FEE247' },
            itemStyle: { color: '#FEE247', borderColor: '#fff', borderWidth: 1 },
            // areaStyle: {
            //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //     { offset: 0, color: 'rgba(25, 255, 244, 0.3)' },
            //     { offset: 0.5, color: 'rgba(61, 255, 134, 0.3)' },
            //     { offset: 1, color: 'rgba(7, 25, 59, 0.3)' },
            //   ]),
            // },
            symbol: 'none',
          },
        ],
        graphic: [
          {
            type: 'text',
            left: '5%',
            top: '10%',
            style: { text: '雨量(mm)', fill: '#fff', fontSize: 12 },
          },
          {
            type: 'text',
            right: '5%',
            top: '10%',
            style: { text: '累计雨量(mm)', fill: '#fff', fontSize: 12, align: 'right' },
          },
          {
            type: 'text',
            left: '5%',
            top: '54%',
            style: { text: '水位(m)', fill: '#fff', fontSize: 12 },
          },
        ],
      }

      chartInstance.setOption(option, true)
    }

    const resizeChart = () => {
      if (chartInstance) chartInstance.resize()
    }

    onMounted(() => {
      initChart()
      window.addEventListener('resize', resizeChart)
    })

    onBeforeUnmount(() => {
      if (chartInstance) {
        chartInstance.dispose()
        chartInstance = null
      }
      window.removeEventListener('resize', resizeChart)
    })

    // watch 数据变化，自动更新图表
    watch(
      () => props.data,
      () => {
        setChartOptions()
      },
      { deep: true }
    )

    return { chartRef }
  },
}
</script>

<style scoped>
div[ref='chartRef'] {
  width: 100%;
  height: 100%;
}
</style>
