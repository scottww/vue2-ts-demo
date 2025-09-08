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
        { label: "昨天", value: "0.0", unit: "mm" },
        { label: "今天", value: "0.0", unit: "mm" },
        { label: "明天", value: "0.0", unit: "mm" },
        { label: "周三", value: "0.0", unit: "mm" },
        { label: "周四", value: "10.5", unit: "mm" },
        { label: "周五", value: "13.5", unit: "mm" },
        { label: "周六", value: "10.5", unit: "mm" },
        { label: "周日", value: "0.0", unit: "mm" }
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
    setOption0() {
      if (!this.chart) return;

      const maxTime = Math.max(...this.data.map((item) => item.time));
      const maxArray = new Array(this.data.length).fill(maxTime);
      const points = this.data.map((item) => ({
        name: "top-line",
        xAxis: item.city,
        yAxis: item.time,
        symbol: "rect",
        symbolSize: [28, 3],
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
          splitLine: { show: false, lineStyle: { color: "#173055" } },
          axisLabel: { color: "rgba(162, 217, 255, 1)", fontSize: 12 }
        },
        series: [
          {
            type: "bar",
            barWidth: 27,
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
                  { offset: 0, color: "#0092FF" }, // 顶部颜色
                  { offset: 1, color: "#007BF3" } // 底部颜色
                ],
                global: false
              }
            },
            markPoint: { symbol: "none", silent: true, data: points }
          }
          // {
          //   name: "",
          //   barGap: "-135%",
          //   type: "bar",
          //   z: 0,
          //   data: maxArray,
          //   barWidth: 27,
          //   itemStyle: { normal: { color: "rgba(11, 36, 89, 0.8)" } },
          //   tooltip: { show: false }
          // }
        ]
      };

      this.chart.setOption(option);
    },
    setOption() {
      if (!this.chart) return;

      const maxTime = Math.max(...this.data.map((item) => item.value));
      const points = this.data.map((item) => ({
        name: "top-line",
        xAxis: item.label,
        yAxis: item.value,
        symbol: "rect",
        symbolSize: [28, 3],
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
          textStyle: { color: "#fff" },
          formatter: (params) => {
            console.log(params);
            let str = params.name + "<br/>";
            return (str += `${params.seriesName}: ${params.value}mm<br/>`);
          }
        },
        backgroundColor: "rgba(8, 30, 80, 1)",
        grid: {
          top: "5%", // 上移留出空间给 x 轴标签
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: this.data.map((item) => item.label),
          axisTick: { show: false },
          axisLabel: {
            color: "rgba(162, 217, 255, 1)",
            fontSize: 12,
            margin: 30,
            verticalAlign: "bottom" // 保证标签在柱子上方
          },
          axisLine: { lineStyle: { color: "rgba(19, 44, 95, 1)", width: 1 } },
          position: "top" // 关键：x轴显示在上方
        },
        yAxis: {
          type: "value",
          // name: "人数",
          nameTextStyle: { color: "rgba(162, 217, 255, 1)", fontSize: 12 },
          axisLine: { lineStyle: { color: "#3C6579" } },
          axisTick: { show: false },
          splitLine: { show: false, lineStyle: { color: "#173055" } },
          axisLabel: {
            show: false,
            color: "rgba(162, 217, 255, 1)",
            fontSize: 12
          }
        },
        series: [
          {
            type: "bar",
            barWidth: 27,
            name: "雨量",
            data: this.data.map((item) => item.value),
            itemStyle: {
              borderRadius: [0, 0, 0, 0],
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "#0092FF" },
                  { offset: 1, color: "#007BF3" }
                ],
                global: false
              }
            },
            markPoint: { symbol: "none", silent: true, data: points },
            label: {
              show: true,
              position: "top",
              formatter: "{c}mm",
              color: "#fff",
              fontSize: 12
            }
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
