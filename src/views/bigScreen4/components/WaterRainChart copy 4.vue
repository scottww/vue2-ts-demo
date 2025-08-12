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
        color: ['#3BC8D4', '#3D92FF', '#54F9B4'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['雨量', '累计雨量', '水位'],
          textStyle: { color: '#fff' },
          top: 10
        },
        grid: [
          { // 上半部分左侧：雨量柱状图
            left: '5%',
            top: '10%',
            width: '40%',
            height: '35%',
            containLabel: true
          },
          { // 上半部分右侧：累计雨量折线
            left: '50%',
            top: '10%',
            width: '45%',
            height: '35%',
            containLabel: true
          },
          { // 下半部分：水位折线图
            left: '5%',
            top: '55%',
            width: '90%',
            height: '35%',
            containLabel: true
          }
        ],
        xAxis: [
          { // 上半左柱状图X轴（雨量）
            gridIndex: 0,
            type: 'category',
            inverse: true,  // x轴倒序，使柱子从上往下画
            data: ['08时', '21时', '00时', '03时', '06时', '09时', '12时', '15时'],
            axisLine: { lineStyle: { color: '#9dc5e8' } },
            axisTick: { alignWithLabel: true },
            axisLabel: { color: '#fff' }
          },
          { // 上半右折线图X轴（累计雨量）
            gridIndex: 1,
            type: 'category',
            data: ['03日', '03日', '04日', '04日', '04日', '04日', '04日', '04日'],
            axisLine: { lineStyle: { color: '#9dc5e8' } },
            axisTick: { alignWithLabel: true },
            axisLabel: { color: '#fff' }
          },
          { // 下半部分水位X轴 - 主轴（显示日期，放第一行）
            gridIndex: 2,
            type: 'category',
            data: ['03日', '03日', '04日', '04日', '04日', '04日', '04日', '04日'],
            axisLine: { lineStyle: { color: '#9dc5e8' } },
            axisTick: { alignWithLabel: true },
            axisLabel: { color: '#fff', interval: 0 }
          },
          { // 下半部分水位X轴 - 次轴（显示时间，放第二行）
            gridIndex: 2,
            type: 'category',
            data: ['08时', '21时', '00时', '03时', '06时', '09时', '12时', '15时'],
            position: 'bottom',
            offset: 20, // 距离下边距20px，形成第二行
            axisLine: { show: false },
            axisTick: { alignWithLabel: true },
            axisLabel: { color: '#fff', interval: 0 }
          }
        ],
        yAxis: [
          { // 上半左柱状图Y轴
            gridIndex: 0,
            type: 'value',
            min: 0,
            max: 10,
            name: '雨量(mm)',
            position: 'left',
            axisLine: { lineStyle: { color: '#fff' } },
            axisLabel: { color: '#fff' },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
          },
          { // 上半右折线图Y轴
            gridIndex: 1,
            type: 'value',
            min: 0,
            max: 40,
            name: '累计雨量(mm)',
            position: 'left',
            axisLine: { lineStyle: { color: '#fff' } },
            axisLabel: { color: '#fff' },
            splitLine: { show: false }
          },
          { // 下半部分水位Y轴
            gridIndex: 2,
            type: 'value',
            min: 0,
            max: 4,
            name: '水位(m)',
            position: 'left',
            axisLine: { lineStyle: { color: '#fff' } },
            axisLabel: { color: '#fff' },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
          }
        ],
        series: [
          { // 上半左柱状图 - 雨量
            name: '雨量',
            type: 'bar',
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: [0.1, 3.7, 6.3, 7.8, 8.4, 3.2, 3.2, 3.2],
            barWidth: '60%',
            itemStyle: { color: '#3BC8D4' }
          },
          { // 上半右折线 - 累计雨量
            name: '累计雨量',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: [0, 3.7, 10, 17.8, 26.2, 29.4, 32.6, 35.8],
            smooth: true,
            lineStyle: { color: '#3D92FF', width: 2 },
            symbol: 'circle',
            symbolSize: 6
          },
          { // 下半折线 - 水位
            name: '水位',
            type: 'line',
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: [1.3, 1.3, 1.5, 2.3, 2.8, 3.0, 3.2, 3.3],
            smooth: true,
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
/* 容器全尺寸 */
div[ref="chart"] {
  width: 100%;
  height: 100%;
}
</style>
