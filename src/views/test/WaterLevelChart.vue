<template>
  <div class="water-level-chart-container">
    <div ref="chartRef" class="chart-box"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'WaterLevelChart',
  data() {
    return {
      chartInstance: null,
      // 模拟水位数据
      waterLevelData: [
        { date: '07-10', realTime: 1.2, warning: 7.0, guarantee: 10.0 },
        { date: '07-11', realTime: 1.8, warning: 7.0, guarantee: 10.0 },
        { date: '07-12', realTime: 2.5, warning: 7.0, guarantee: 10.0 },
        { date: '07-13', realTime: 3.2, warning: 7.0, guarantee: 10.0 },
        { date: '07-14', realTime: 3.8, warning: 7.0, guarantee: 10.0 },
        { date: '07-15', realTime: 4.2, warning: 7.0, guarantee: 10.0 },
        { date: '07-16', realTime: 4.5, warning: 7.0, guarantee: 10.0 },
      ]
    };
  },
  computed: {
    // 提取X轴日期
    dates() {
      return this.waterLevelData.map(item => item.date);
    },
    // 提取实时水位数据
    realTimeData() {
      return this.waterLevelData.map(item => item.realTime);
    },
    // 提取警戒水位数据（常量）
    warningData() {
      return this.waterLevelData.map(() => 7.0);
    },
    // 提取保证水位数据（常量）
    guaranteeData() {
      return this.waterLevelData.map(() => 10.0);
    }
  },
  methods: {
    // 初始化图表
    initChart() {
      if (this.$refs.chartRef && !this.chartInstance) {
        this.chartInstance = echarts.init(this.$refs.chartRef);

        const option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            },
            formatter: function(params) {
              let result = `${params[0].name}<br/>`;
              params.forEach(param => {
                result += `${param.marker} ${param.seriesName}: ${param.value} m<br/>`;
              });
              return result;
            }
          },
          legend: {
            data: ['实时水位', '警戒水位', '保证水位'],
            textStyle: {
              color: '#fff'
            },
            top: 10
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
              boundaryGap: false,
              data: this.dates,
              axisLine: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              },
              axisLabel: {
                color: 'rgba(255, 255, 255, 0.7)'
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.1)'
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '水位: m',
              nameTextStyle: {
                color: 'rgba(255, 255, 255, 0.7)'
              },
              min: 0,
              max: 10,
              interval: 2,
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
                  color: 'rgba(255, 255, 255, 0.1)'
                }
              }
            }
          ],
          series: [
            {
              name: '实时水位',
              type: 'line',
              data: this.realTimeData,
              symbol: 'circle',
              symbolSize: 6,
              itemStyle: {
                color: '#36CFC9'
              },
              lineStyle: {
                width: 3,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#36CFC9' },
                  { offset: 1, color: '#1890FF' }
                ])
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(54, 207, 201, 0.3)' },
                  { offset: 1, color: 'rgba(24, 144, 255, 0.1)' }
                ])
              },
              emphasis: {
                focus: 'series'
              }
            },
            {
              name: '警戒水位',
              type: 'line',
              data: this.warningData,
              symbol: 'none',
              lineStyle: {
                width: 2,
                type: 'solid',
                color: '#FF7A45'
              },
              emphasis: {
                focus: 'series'
              }
            },
            {
              name: '保证水位',
              type: 'line',
              data: this.guaranteeData,
              symbol: 'none',
              lineStyle: {
                width: 2,
                type: 'dashed',
                color: '#F5222D'
              },
              emphasis: {
                focus: 'series'
              }
            }
          ],
          // 背景设置
          backgroundColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(10, 32, 60, 0.9)' },
              { offset: 1, color: 'rgba(10, 18, 30, 0.9)' }
            ]
          }
        };

        this.chartInstance.setOption(option);
      }
    },
    // 调整图表大小
    resizeChart() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    }
  },
  mounted() {
    this.initChart();
    window.addEventListener('resize', this.resizeChart);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart);
    if (this.chartInstance) {
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
  }
};
</script>

<style scoped>
.water-level-chart-container {
  width: 100%;
  height: 400px;
  min-height: 400px;
  position: relative;
  overflow: hidden;
}

.chart-box {
  width: 100%;
  height: 100%;
}

/* 波浪背景效果 */
.water-level-chart-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(54, 207, 201, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: -1;
  opacity: 0.5;
}
</style>