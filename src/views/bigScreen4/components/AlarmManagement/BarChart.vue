<template>
  <div
    class="bar-chart-container"
    ref="chart"
    style="width: 100%; height: 100%"
  ></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "BarChart",
  data() {
    return {
      chart: null,
      chartData: {
        months: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ],
        baseData: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20], // 底座灰色柱高度固定20次
        currentYear: [12, 15, 10, 8, 18, 11, 15, 19, 14, 17, 16, 2] // 蓝色柱
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      window.addEventListener("resize", this.resizeChart);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeChart);
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart);

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" }
        },
        xAxis: {
          type: "category",
          data: this.chartData.months,
          axisTick: { alignWithLabel: true },
          axisTick: { show: false }, // 不显示刻度线
          splitLine: { show: false }, // 不显示网格线
          axisLine: {
            lineStyle: {
              color: "#E0E2E3"
            }
          },
          axisLabel: { color: "#fff" }
        },
        yAxis: {
          type: "value",
          name: "(次)",
          min: 0,
          splitLine: { show: false },
          axisLabel: { color: "#fff", opacity: 0.6 },
          nameTextStyle: {
            color: "#fff",
            opacity: 0.6,
            fontSize: 14
          }
        },
        series: [
          {
            name: "去年统计",
            type: "bar",
            data: this.chartData.baseData,

            itemStyle: {
              color: "#ccc",
              opacity: 0.6
            },
            barWidth: "40%",
            z: 1
          },
          {
            name: "本年统计",
            type: "bar",
            data: this.chartData.currentYear,
            itemStyle: {
              color: "#2980E0"
            },
            barWidth: "40%",
            barGap: "-100%", // 重叠显示
            z: 2
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
.bar-chart-container {
  width: 100%;
  height: 100%;
  /* height: 250px; */
}
</style>
