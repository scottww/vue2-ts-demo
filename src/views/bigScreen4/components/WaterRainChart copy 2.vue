<template>
  <div ref="chart" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'RainWaterChart',
  data() {
    return {
      chartInstance: null
    }
  },
  mounted() {
    this.initChart()
    window.addEventListener('resize', this.resizeChart)
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose()
      this.chartInstance = null
    }
    window.removeEventListener('resize', this.resizeChart)
  },
  methods: {
    initChart() {
      this.chartInstance = echarts.init(this.$refs.chart)

      const option = {
        // backgroundColor: 'rgba(0, 66, 101, 0.7)',
        color: ['#16C8C5', '#3D92FF', '#54F9B4'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['雨量', '累计雨量', '水位'],
          textStyle: {
            color: '#fff'
          },
          top: 10
        },
        grid: {
          left: '3%',
          right: '7%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [
            '03日08时', '03日21时', '04日00时', '04日03时',
            '04日06时', '04日09时', '04日12时', '04日15时'
          ],
          axisLine: {
            lineStyle: { color: '#9dc5e8' }
          },
          axisTick: { alignWithLabel: true },
          axisLabel: { color: '#fff' }
        },
        yAxis: [
          {
            type: 'value',
            name: '水位(m)',
            min: 0,
            max: 4,
            interval: 1,
            position: 'left',
            axisLine: { lineStyle: { color: '#fff' } },
            axisLabel: { color: '#fff' },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
          },
          {
            type: 'value',
            name: '累计雨量(mm)',
            min: 0,
            max: 100,
            interval: 20,
            position: 'right',
            axisLine: { lineStyle: { color: '#fff' } },
            axisLabel: { color: '#fff' },
            splitLine: { show: false }
          }
        ],
        series: [
          {
            name: '雨量',
            type: 'bar',
            data: [0.1, 3.7, 6.3, 7.8, 8.4, 3.2, 3.2, 3.2],
            barWidth: '20%',
            itemStyle: { color: '#3BC8D4' },
            yAxisIndex: 1
          },
          {
            name: '累计雨量',
            type: 'line',
            data: [0, 3.7, 10, 17.8, 26.2, 29.4, 32.6, 35.8],
            smooth: true,
            lineStyle: { color: '#3D92FF', width: 2 },
            symbol: 'circle',
            symbolSize: 6,
            yAxisIndex: 1
          },
          {
            name: '水位',
            type: 'line',
            data: [1.3, 1.3, 1.5, 2.3, 2.8, 3.0, 3.2, 3.3],
            smooth: true,
            yAxisIndex: 0,
            lineStyle: { color: '#54F9B4', width: 2 },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(84, 249, 180, 0.5)' },
                { offset: 1, color: 'rgba(84, 249, 180, 0.1)' }
              ])
            },
            symbol: 'circle',
            symbolSize: 6
          }
        ]
      }

      this.chartInstance.setOption(option)
    },
    resizeChart() {
      if (this.chartInstance) {
        this.chartInstance.resize()
      }
    }
  }
}
</script>

<style scoped>
/* 你可以根据需求调整容器样式 */
</style>
