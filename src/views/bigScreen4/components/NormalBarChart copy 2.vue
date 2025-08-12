<template>
  <div ref="chart" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "WaterRainChart",
  data() {
    return {
      chart: null,
      chartData: {
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        currentYear: [12, 15, 10, 20, 18, 25, 22, 19, 14, 17, 21, 23], // 蓝色柱
        lastYear: [8, 13, 7, 15, 12, 18, 20, 15, 12, 14, 16, 18]     // 灰色柱
      }
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener('resize', this.resizeChart);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart);
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart);

      const option = {
        color: ['#3398DB', '#CCCCCC'], // 蓝色，灰色
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.chartData.months,
          axisTick: { alignWithLabel: true },
          splitLine: { show: false },  // 去掉横线
          axisLine: {
            lineStyle: {
              color: '#aaa'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '次数',
          min: 0,
          splitLine: { show: true }  // 保留y轴网格线
        },
        series: [
          {
            name: '本年次数',
            type: 'bar',
            barWidth: '30%',
            data: this.chartData.currentYear
          },
          {
            name: '去年次数',
            type: 'bar',
            barWidth: '30%',
            data: this.chartData.lastYear
          }
        ]
      };

      this.chart.setOption(option);
    },
    resizeChart() {
      if (this.chart) {
        this.chart.resize();
      }
    }
  }
};
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
