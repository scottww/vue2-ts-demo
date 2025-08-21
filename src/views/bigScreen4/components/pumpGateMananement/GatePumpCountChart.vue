<!-- id不固定，适应同页面多个echart情况 -->
<template>
  <div class="chart-container"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "GatePumpCountChart",
  data() {
    return {
      chartInstance: null,
      chartData: {
        months: [
          "01月",
          "02月",
          "03月",
          "04月",
          "05月",
          "06月",
          "07月",
          "08月",
          "09月",
          "10月",
          "11月",
          "12月"
        ],
        series: [
          {
            name: "开闸次数",
            data: [7, 4, 5, 2, 3, 1, 3, 2, 4, 4, 4, 2],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#3b82f6" },
                { offset: 1, color: "#1e40af" }
              ])
            }
          },
          {
            name: "开泵次数",
            data: [3, 3, 2, 7, 4, 4, 1, 3, 2, 2, 2, 2],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#06b6d4" },
                { offset: 1, color: "#0e7490" }
              ])
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    if (this.chartInstance) this.chartInstance.dispose();
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    initChart() {
      // 直接用根元素，不用 id
      this.chartInstance = echarts.init(this.$el);

      const option = {
        tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
        legend: {
          data: ["开闸次数", "开泵次数"],
          top: "4%",
          textStyle: { color: "#a0c4ff" }
        },
        grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
        xAxis: [
          {
            type: "category",
            data: this.chartData.months,
            axisLine: { lineStyle: { color: "rgba(100,200,255,0.3)" } },
            axisLabel: { color: "#a0c4ff" }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "单位: 次",
            nameGap: 30, // 默认是 15，可以调大
            nameTextStyle: { color: "#a0c4ff" },
            axisLine: { lineStyle: { color: "rgba(100,200,255,0.3)" } },
            axisLabel: { color: "#a0c4ff" },
            splitLine: { show: false }
          }
        ],
        series: this.chartData.series.map((item) => ({
          name: item.name,
          type: "bar",
          barWidth: "30%",
          data: item.data,
          itemStyle: item.itemStyle,
          label: { show: true, position: "top", color: "#fff", fontSize: 14 }
        }))
      };

      this.chartInstance.setOption(option);
    },
    handleResize() {
      if (this.chartInstance) this.chartInstance.resize();
    }
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
