<template>
  <div class="bar-chart-container">
    <div
      ref="chartRef"
      class="chart"
      :style="{ width: width, height: height }"
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "BarChart",
  props: {
    width: { type: String, default: "100%" },
    height: { type: String, default: "400px" },
    data: { type: Array, default: () => [7, 8, 12, 12, 12, 6, 6, 14, 14, 6] },
    xAxisLabels: { type: Array, default: () => Array(10).fill("名称") },
    yAxisUnit: { type: String, default: "(千亩)" },
    yAxisMax: { type: Number, default: 25 },
    barColor: { type: String, default: "#33ccff" },
    barGradientColor: { type: String, default: "rgba(51,204,255,0.1)" }
  },
  data() {
    return { chart: null };
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    if (this.chart) this.chart.dispose();
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
      if (this.chart) {
        this.chart.dispose();
      }
      this.chart = echarts.init(this.$refs.chartRef);
      this.updateChart();
    },
    updateChart() {
      const barWidth = 16; // 主柱宽度
      const bottomCap = 6; // 顶部/底部圆头高度
      const ringSize = [24, 8]; // 底座圈

      const option = {
        grid: { bottom: "5%", left: "5%", right: "5%", containLabel: true },
        xAxis: {
          type: "category",
          data: this.xAxisLabels,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { color: "#fff", fontSize: 12, interval: 0 }
        },
        yAxis: {
          type: "value",
          max: this.yAxisMax,
          axisTick: { show: false },
          axisLine: { show: false },
          splitLine: { lineStyle: { color: "#1a4c7e" } },
          axisLabel: { color: "#fff", fontSize: 12, formatter: "{value}" },
          name: this.yAxisUnit,
          nameLocation: "end",
          nameTextStyle: { color: "#fff", fontSize: 12, padding: [0, 25, 0, 0] }
        },
        series: [
          // 顶部圆柱
          {
            name: "top",
            type: "pictorialBar",
            symbolSize: [barWidth, bottomCap],
            symbolOffset: [0, -bottomCap / 2],
            z: 12,
            itemStyle: { color: this.barColor },
            symbolPosition: "end",
            data: this.data
          },
          // 底部圆柱
          {
            name: "bottom",
            type: "pictorialBar",
            symbolSize: [barWidth, bottomCap],
            symbolOffset: [0, bottomCap / 2],
            z: 12,
            itemStyle: { color: this.barColor },
            data: this.data
          },
          // 底座圈
          {
            name: "ring",
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: ringSize,
            symbolOffset: [0, bottomCap / 2 + ringSize[1] / 2],
            z: 11,
            itemStyle: {
              color: "transparent",
              borderColor: this.barColor,
              borderWidth: 10,
              opacity: 1
            },
            data: this.data
          },
          // 渐变柱体
          {
            type: "bar",
            barWidth,
            barGap: "-100%",
            z: 16,
            silent: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: this.barColor },
                { offset: 0, color: this.barGradientColor }
              ]),
              opacity: 0.8,
              borderRadius: [4, 4, 0, 0]
            },
            data: this.data
          }
        ]
      };

      this.chart.setOption(option, true);
    },
    handleResize() {
      if (this.chart) this.chart.resize();
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
