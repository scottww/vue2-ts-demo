<template>
  <div class="bar-chart-container">
    <div ref="chartRef" class="chart" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'BarChart',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    data: {
      type: Array,
      default: () => [7, 8, 12, 12, 12, 6, 6, 14, 14, 6]
    },
    xAxisLabels: {
      type: Array,
      default: () => ['名称', '名称', '名称', '名称', '名称', '名称', '名称', '名称', '名称', '名称']
    },
    yAxisUnit: {
      type: String,
      default: '(千亩)'
    },
    yAxisMax: {
      type: Number,
      default: 25
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    if (this.chart) {
      this.chart.dispose();
    }
  },
  watch: {
    data: {
      handler() {
        this.updateChart();
      },
      deep: true
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chartRef);
      this.updateChart();
    },
    updateChart() {
      const option = {
        backgroundColor: '#0f375f',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.xAxisLabels,
            axisLine: {
              lineStyle: {
                color: '#347bb1'
              }
            },
            axisLabel: {
              color: '#fff',
              fontSize: 12
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            max: this.yAxisMax,
            splitLine: {
              lineStyle: {
                color: '#1a4c7e',
                type: 'solid'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#347bb1'
              }
            },
            axisLabel: {
              color: '#fff',
              fontSize: 12,
              formatter: '{value}'
            },
            name: this.yAxisUnit,
            nameLocation: 'end',
            nameTextStyle: {
              color: '#fff',
              fontSize: 12,
              padding: [0, 25, 0, 0]
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '数据',
            type: 'bar',
            data: this.data,
            barWidth: '30%',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#33ccff'
                },
                {
                  offset: 1,
                  color: '#0099cc'
                }
              ]),
              borderRadius: [4, 4, 0, 0]
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#66d9ff'
                  },
                  {
                    offset: 1,
                    color: '#33ccff'
                  }
                ])
              }
            },
            // 添加柱状图底部的圆形底座效果
            backgroundStyle: {
              color: 'rgba(51, 204, 255, 0.3)'
            }
          }
        ]
      };
      
      this.chart.setOption(option);
    },
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    }
  }
};
</script>

<style scoped>
.bar-chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>