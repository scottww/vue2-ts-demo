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

      const option = {
        color: ["#3BC8D4", "#3D92FF", "#54F9B4"],
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["雨量", "累计雨量", "水位"],
          textStyle: { color: "#fff" },
          top: 10
        },
        grid: [
          {
            // 上半部分整体grid
            left: "5%",
            top: "15%",
            right: "5%",
            height: "35%",
            containLabel: true
          },
          {
            // 下半部分水位grid
            left: "5%",
            top: "65%",
            right: "5%",
            height: "35%",
            containLabel: true
          }
        ],
        xAxis: [
          {
            // 上半部分和下半部分共用的x轴，时间轴
            gridIndex: 0,
            type: "category",
            data: [
              "08时",
              "21时",
              "00时",
              "03时",
              "06时",
              "09时",
              "12时",
              "15时"
            ],
            axisLine: { lineStyle: { color: "#9dc5e8" } },
            axisTick: { alignWithLabel: true },
            // axisLabel: { color: "#fff" },
            axisLabel: { show: false }, // 不显示横轴时间
            boundaryGap: true
          },
          {
            // 下半部分水位x轴，双行时间 - 上行日
            gridIndex: 1,
            type: "category",
            data: [
              "03日",
              "03日",
              "04日",
              "04日",
              "04日",
              "04日",
              "04日",
              "04日"
            ],
            axisLine: { lineStyle: { color: "#9dc5e8" } },
            axisTick: { alignWithLabel: true },
            axisLabel: { color: "#fff", interval: 0 }
          },
          {
            // 下半部分水位x轴，双行时间 - 下行时
            gridIndex: 1,
            type: "category",
            data: [
              "08时",
              "21时",
              "00时",
              "03时",
              "06时",
              "09时",
              "12时",
              "15时"
            ],
            position: "bottom",
            offset: 20,
            axisLine: { show: false },
            axisTick: { alignWithLabel: true },
            axisLabel: { color: "#fff", interval: 0 }
          }
        ],
        yAxis: [
          {
            // 上半部分左侧y轴：雨量，倒着显示
            gridIndex: 0,
            type: "value",
            min: 0,
            max: 10,
            // name: '雨量(mm)',
            position: "left",
            inverse: true, // 让柱状图从上往下
            axisLine: { lineStyle: { color: "#fff" } },
            axisLabel: { color: "#fff" },
            splitLine: { lineStyle: { color: "rgba(255,255,255,0.1)" } }
          },
          {
            // 上半部分右侧y轴：累计雨量
            gridIndex: 0,
            type: "value",
            min: 0,
            max: 40,
            // name: "累计雨量(mm)",
            position: "right",
            inverse: true,
            axisLine: { lineStyle: { color: "#fff" } },
            axisLabel: { color: "#fff" },
            splitLine: { show: false }
          },
          {
            // 下半部分水位y轴
            gridIndex: 1,
            type: "value",
            min: 0,
            max: 4,
            name: "水位(m)",
            position: "left",
            axisLine: { lineStyle: { color: "#fff" } },
            axisLabel: { color: "#fff" },
            splitLine: { lineStyle: { color: "rgba(255,255,255,0.1)" } }
          }
        ],
        series: [
          {
            // 雨量柱状图，左y轴，倒着显示
            name: "雨量",
            type: "bar",
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: [0.1, 3.7, 6.3, 7.8, 8.4, 3.2, 3.2, 3.2],
            barWidth: "20%",
            itemStyle: { color: "#3BC8D4" },
            label: {
              show: true,
              position: "bottom",
              color: "#3BC8D4",
              fontWeight: "bold"
            }
          },
          {
            // 累计雨量折线，右y轴
            name: "累计雨量",
            type: "line",
            xAxisIndex: 0,
            yAxisIndex: 1,
            data: [0, 3.7, 10, 17.8, 26.2, 29.4, 32.6, 35.8],
            smooth: true,
            lineStyle: { color: "#3D92FF", width: 2 },
            // symbol: "circle",
            symbolSize: 6,
            symbol: "none"
          },
          {
            // 水位折线图，单独下半部分grid
            name: "水位",
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 2,
            data: [1.3, 1.3, 1.5, 2.3, 2.8, 3.0, 3.2, 3.3],
            smooth: true,
            lineStyle: { color: "#54F9B4", width: 2 },
            areaStyle: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(84, 249, 180, 0.5)" },
              { offset: 1, color: "rgba(84, 249, 180, 0.1)" }
            ]),
            symbol: "circle",
            symbolSize: 6,
            symbol: "none"
          }
        ],
        graphic: [
          {
            type: "text",
            left: "5%", // 左上角靠左点
            top: "5%",
            style: {
              text: "v",
              fill: "#fff",
              fontSize: 12,
              opacity: 0.6
              // fontWeight: "bold"
            }
          },
          {
            type: "text",
            right: "0%", // 右上角靠右点
            top: "5%",
            style: {
              text: "累计雨量(mm)",
              fill: "#fff",
              fontSize: 12,
              opacity: 0.6,
              // fontWeight: "bold",
              align: "right"
            }
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
/* 让图表容器撑满 */
div[ref="chart"] {
  width: 100%;
  height: 100%;
}
</style>
