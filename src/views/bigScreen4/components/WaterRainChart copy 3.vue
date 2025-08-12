<template>
  <div ref="chart" style="width: 100%; height: 100%"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "RainWaterChart",
  data() {
    return {
      chartInstance: null
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.resizeChart);
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
    window.removeEventListener("resize", this.resizeChart);
  },
  methods: {
    initChart() {
      this.chartInstance = echarts.init(this.$refs.chart);

      const rawTimes = [
        "03日08时",
        "03日21时",
        "04日00时",
        "04日03时",
        "04日06时",
        "04日09时",
        "04日12时",
        "04日15时"
      ];

      const option0 = {
        // backgroundColor: '#0A2E5D', // 深色背景，可调整或去掉
        color: ["#3D92FF", "#16C8C5", "#54F9B4"],
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" }
        },
        legend: {
          data: ["雨量", "累计雨量", "水位"],
          textStyle: { color: "#fff" },
          top: 10
        },
        grid: {
          left: "8%",
          right: "8%",
          bottom: "15%",
          top: "25%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: rawTimes,
          axisLine: { lineStyle: { color: "#9dc5e8" } },
          axisTick: { alignWithLabel: true },
          axisLabel: {
            color: "#fff",
            lineHeight: 20,
            formatter: function (value) {
              // 两行显示，日和时分开换行
              const day = value.substring(0, 3);
              const hour = value.substring(3);
              return day + "\n" + hour;
            }
          }
        },
        yAxis: [
          {
            type: "value",
            name: "水位(m)",
            min: 0,
            max: 4,
            interval: 1,
            position: "left",
            axisLine: { lineStyle: { color: "#54F9B4" } },
            axisLabel: { color: "#54F9B4" },
            splitLine: { lineStyle: { color: "rgba(84, 249, 180, 0.3)" } }
          },
          {
            type: "value",
            name: "雨量(mm)",
            min: 0,
            max: 40,
            interval: 10,
            position: "right",
            axisLine: { lineStyle: { color: "#3D92FF" } },
            axisLabel: { color: "#3D92FF" },
            splitLine: { show: false }
          }
        ],
        series: [
          {
            name: "雨量",
            type: "bar",
            data: [0.1, 3.7, 6.3, 7.8, 8.4, 3.2, 3.2, 3.2],
            barWidth: "30%",
            yAxisIndex: 1,
            itemStyle: { color: "#3D92FF" }
          },
          {
            name: "累计雨量",
            type: "line",
            data: [0, 3.7, 10, 17.8, 26.2, 29.4, 32.6, 35.8],
            yAxisIndex: 1,
            lineStyle: { color: "#16C8C5", width: 2 },
            smooth: true,
            symbol: "circle",
            symbolSize: 6
          },
          {
            name: "水位",
            type: "line",
            data: [1.3, 1.3, 1.5, 2.3, 2.8, 3.0, 3.2, 3.3],
            yAxisIndex: 0,
            lineStyle: { color: "#54F9B4", width: 2 },
            smooth: true,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(84, 249, 180, 0.5)" },
                { offset: 1, color: "rgba(84, 249, 180, 0.1)" }
              ])
            },
            symbol: "circle",
            symbolSize: 6
          }
        ]
      };
      const option = {
        // backgroundColor: "#0e2e5c",
        color: ["#72c3fc", "#3b99f3", "#70efb7"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        legend: {
          data: ["雨量", "累计雨量", "水位"],
          textStyle: {
            color: "#a9c6ff"
          },
          top: 10
        },
        grid: [
          { left: "8%", right: "8%", height: "40%", top: "12%" }, // 上半部分grid
          { left: "8%", right: "8%", height: "40%", top: "60%" } // 下半部分grid
        ],
        xAxis: [
          {
            type: "category",
            data: [
              "03日08时",
              "03日21时",
              "04日00时",
              "04日03时",
              "04日06时",
              "04日09时",
              "04日12时",
              "04日15时"
            ],
            gridIndex: 0,
            axisLine: { lineStyle: { color: "#a9c6ff" } },
            axisTick: { alignWithLabel: true }
          },
          {
            type: "category",
            data: [
              "03日08时",
              "03日21时",
              "04日00时",
              "04日03时",
              "04日06时",
              "04日09时",
              "04日12时",
              "04日15时"
            ],
            gridIndex: 1,
            axisLine: { lineStyle: { color: "#a9c6ff" } },
            axisTick: { alignWithLabel: true }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "雨量 (mm)",
            position: "left",
            gridIndex: 0,
            axisLine: { lineStyle: { color: "#72c3fc" } },
            splitLine: { lineStyle: { type: "dashed", color: "#0e2e5c" } }
          },
          {
            type: "value",
            name: "累计雨量 (mm)",
            position: "right",
            gridIndex: 0,
            axisLine: { lineStyle: { color: "#3b99f3" } },
            splitLine: { show: false }
          },
          {
            type: "value",
            name: "水位 (m)",
            position: "left",
            gridIndex: 1,
            axisLine: { lineStyle: { color: "#70efb7" } },
            splitLine: { lineStyle: { type: "dashed", color: "#0e2e5c" } }
          }
        ],
        series: [
          {
            name: "雨量",
            type: "bar",
            data: [0.1, 3.7, 6.3, 7.8, 8.4, 0, 3.2, 3.2],
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: { color: "#72c3fc" }
          },
          {
            name: "累计雨量",
            type: "line",
            data: [0.1, 3.8, 10.1, 17.9, 26.3, 26.3, 29.5, 32.7],
            xAxisIndex: 0,
            yAxisIndex: 1,
            smooth: true,
            lineStyle: { width: 2 },
            symbol: "circle",
            symbolSize: 6,
            itemStyle: { color: "#3b99f3" }
          },
          {
            name: "水位",
            type: "line",
            data: [1.0, 1.3, 1.5, 2.0, 2.5, 3.0, 3.5, 3.7],
            xAxisIndex: 1,
            yAxisIndex: 2,
            smooth: true,
            lineStyle: { width: 2 },
            symbol: "circle",
            symbolSize: 6,
            itemStyle: { color: "#70efb7" }
          }
        ]
      };

      this.chartInstance.setOption(option);
    },
    resizeChart() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    }
  }
};
</script>

<style scoped>
/* 容器高度、背景色等可按需调整 */
</style>
