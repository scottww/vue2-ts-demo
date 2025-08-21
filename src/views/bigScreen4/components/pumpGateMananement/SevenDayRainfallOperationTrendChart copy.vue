<template>
  <div class="chart-container">
    <div ref="chartRef" class="echarts-chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'Chart4',
  data() {
    return {
      chartInstance: null,
      rainData: [
        { date: '07-10', value: 15 },
        { date: '07-11', value: 5 },
        { date: '07-12', value: 15 },
        { date: '07-13', value: 8 },
        { date: '07-14', value: 22 },
        { date: '07-15', value: 22 },
        { date: '07-16', value: 20 }
      ]
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    initChart() {
      this.chartInstance = echarts.init(this.$refs.chartRef);

      const option = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b}: {c} mm',
          textStyle: { color: '#fff' }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.rainData.map(item => item.date),
            axisLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            },
            axisLabel: {
              color: 'rgba(255, 255, 255, 0.7)'
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '雨量(mm)',
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.7)'
            },
            min: 0,
            max: 25,
            interval: 5,
            axisLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            },
            axisLabel: {
              color: 'rgba(255, 255, 255, 0.7)',
              formatter: '{value}'
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.1)',
                type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            name: '降雨量',
            type: 'bar',
            barWidth: '60%',
            data: this.rainData.map(item => item.value),
            itemStyle: {
              // 渐变色
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#4096FF' },
                { offset: 1, color: '#36CFC9' }
              ]),
              borderRadius: [4, 4, 0, 0]
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#6AA1FF' },
                  { offset: 1, color: '#52D9D2' }
                ])
              }
            },
            // 柱状图上方显示数值
            label: {
              show: true,
              position: 'top',
              color: 'rgba(255, 255, 255, 0.8)',
              formatter: '{c} mm'
            }
          }
        ]
      };

      this.chartInstance.setOption(option);
    },
    handleResize() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    }
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #0f2c59, #1c4587);
  position: relative;
  overflow: hidden;
}

/* 波浪背景效果 */
.chart-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='wave' width='100' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0,10 Q25,20 50,10 T100,10' fill='none' stroke='rgba(54, 207, 201, 0.1)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23wave)'/%3E%3C/svg%3E"); */
  opacity: 0.5;
  z-index: 0;
}

.echarts-chart {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}
</style>