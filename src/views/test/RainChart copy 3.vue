<template>
  <div :style="{ height: height }" ref="chart" class="chart-container"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "TopLineBarChart",
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [
        { city: "石家庄市", time: 3 },
        { city: "张家口市", time: 6 },
        { city: "秦皇岛市", time: 4 },
        { city: "邢台市", time: 5 },
        { city: "邯郸市", time: 8 }
      ]
    },
    height: {
      type: String,
      default: "400px"
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    data: {
      handler() {
        this.setOption();
      },
      deep: true
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart);
    this.setOption();
    window.addEventListener("resize", this.resizeChart);
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
    window.removeEventListener("resize", this.resizeChart);
  },
  methods: {
    resizeChart() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    setOption() {
      if (!this.chart) return;

      const maxTime = Math.max(...this.data.map((item) => item.time));
      const maxArray = new Array(this.data.length).fill(maxTime);
      const points = this.data.map((item) => ({
        name: "top-line",
        xAxis: item.city,
        yAxis: item.time,
        symbol: "rect",
        symbolSize: [17, 3],
        itemStyle: {
          color: "rgba(255, 255, 255, 1)",
          shadowColor: "rgba(255, 255, 255, 1)",
          shadowBlur: 10,
          shadowOffsetY: -3
        }
      }));

      const option = {
        tooltip: {
          show: true,
          trigger: "item",
          backgroundColor: "rgba(21, 154, 255, 0.32)",
          textStyle: { color: "#fff" }
        },
        backgroundColor: "rgba(8, 30, 80, 1)",
        grid: {
          top: "8%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: this.data.map((item) => item.city),
          axisTick: { show: false },
          axisLabel: {
            color: "rgba(162, 217, 255, 1)",
            fontSize: 12,
            margin: 20
          },
          axisLine: { lineStyle: { color: "rgba(19, 44, 95, 1)", width: 1 } }
        },
        yAxis: {
          type: "value",
          name: "人数",
          nameTextStyle: { color: "rgba(162, 217, 255, 1)", fontSize: 12 },
          axisLine: { lineStyle: { color: "#3C6579" } },
          axisTick: { show: false },
          splitLine: { lineStyle: { color: "#173055" } },
          axisLabel: { color: "rgba(162, 217, 255, 1)", fontSize: 12 }
        },
        series: [
          {
            type: "bar",
            barWidth: 16,
            name: "人数",
            data: this.data.map((item) => item.time),
            itemStyle: {
              borderRadius: [0, 0, 0, 0],
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "rgba(86, 176, 254, 1)" },
                  { offset: 0.1, color: "rgba(68, 163, 255, 1)" },
                  { offset: 1, color: "rgba(46, 140, 255, 1)" }
                ],
                global: false
              }
            },
            markPoint: { symbol: "none", silent: true, data: points }
          },
          {
            name: "",
            barGap: "-135%",
            type: "bar",
            z: 0,
            data: maxArray,
            barWidth: 27,
            itemStyle: { normal: { color: "rgba(11, 36, 89, 0.8)" } },
            tooltip: { show: false }
          }
        ]
      };

      this.chart.setOption(option);
    }
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
}
</style>
