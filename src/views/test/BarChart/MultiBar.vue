<template>
  <div class="multi-bar-chart-container">
    <div ref="chartRef" class="chart" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'MultiBarChart',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    // 多系列数据格式: [{name: '2020', data: [10, 8, 15, ...]}]
    seriesData: {
      type: Array,
      default: () => [
        { name: '2020', data: [14, 15, 16, 17, 18, 19] },
        { name: '2021', data: [12, 13, 14, 15, 16, 17] },
        { name: '2022', data: [10, 11, 12, 13, 14, 15] }
      ]
    },
    xAxisLabels: {
      type: Array,
      default: () => ['名称名称', '名称名称', '名称名称', '名称名称', '名称名称', '名称名称']
    },
    yAxisUnit: {
      type: String,
      default: '千亩'
    },
    yAxisMax: {
      type: Number,
      default: 25
    },
    // 自定义系列颜色
    colors: {
      type: Array,
      default: () => ['#4c78ff', '#5bccff', '#ff7d5f']
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
    seriesData: {
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
        legend: {
          data: this.seriesData.map(item => item.name),
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          top: 10,
          right: 20,
          itemWidth: 10,
          itemHeight: 10
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%',
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
              fontSize: 12,
              interval: 0
            },
            axisTick: {
              show: false
            },
            axisPointer: {
              type: 'shadow'
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
              padding: [0, 0, 0, 50]
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: this.seriesData.map((item, index) => ({
          name: item.name,
          type: 'bar',
          data: item.data,
          barWidth: '20%',
          itemStyle: {
            color: this.getGradientColor(index),
            borderRadius: [4, 4, 0, 0]
          },
          emphasis: {
            itemStyle: {
              color: this.getGradientColor(index, true)
            }
          }
        }))
      };
      
      this.chart.setOption(option);
    },
    getGradientColor(index, isEmphasis = false) {
      const baseColor = this.colors[index % this.colors.length];
      const lightenColor = this.lightenColor(baseColor, isEmphasis ? 30 : 10);
      
      return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: lightenColor
        },
        {
          offset: 1,
          color: baseColor
        }
      ]);
    },
    lightenColor(color, percent) {
      // 简单的颜色提亮函数
      let r = parseInt(color.slice(1, 3), 16);
      let g = parseInt(color.slice(3, 5), 16);
      let b = parseInt(color.slice(5, 7), 16);
      
      r = Math.min(255, Math.floor(r + (255 - r) * percent / 100));
      g = Math.min(255, Math.floor(g + (255 - g) * percent / 100));
      b = Math.min(255, Math.floor(b + (255 - b) * percent / 100));
      
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
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
.multi-bar-chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>