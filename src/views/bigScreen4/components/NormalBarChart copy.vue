<template>
  <div ref="chart" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "NormalBarChart",
  data() {
    return {
      chart: null,
      chartData: {
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        counts: [12, 15, 10, 20, 18, 25, 22, 19, 14, 17, 21, 23]
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
        color: ['#3398DB'],
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
        xAxis: [
          {
            type: 'category',
            data: this.chartData.months,
            axisTick: { alignWithLabel: true }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '次',
            min: 0
          }
        ],
        series: [
          {
            name: '次',
            type: 'bar',
            barWidth: '60%',
            data: this.chartData.counts
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
/* 让图表撑满容器 */
div {
  width: 100%;
  height: 100%;
}
</style>
