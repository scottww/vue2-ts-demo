<template>
  <div
    class="multi-bar-chart"
    ref="chart"
    :style="{ width: width, height: height }"
  ></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Multi3DBarChart",
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "400px"
    },
    title: {
      type: String,
      default: "多色立体圆柱"
    },
    barColor: {
      type: String,
      default: "#02c3f1" // 顶部颜色
    },
    barGradientColor: {
      type: String,
      default: "rgba(2,195,241,0.1)" // 底部渐变色
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
        this.renderChart();
      },
      deep: true
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart);
    this.renderChart();

    // 点击柱子事件
    this.chart.on("click", (params) => {
      if (params.seriesType === "bar" || params.seriesType === "pictorialBar") {
        this.$emit("barClick", this.data[params.dataIndex], params.dataIndex);
      }
    });

    window.addEventListener("resize", this.resizeChart);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeChart);
    if (this.chart) this.chart.dispose();
  },
  methods: {
    resizeChart() {
      if (this.chart) this.chart.resize();
    },
    renderChart() {
      if (!this.data || !this.data.length) return;

      const xAxisData = [];
      const seriesData1 = [];
      let sum = 0;

      this.data.forEach((item) => {
        xAxisData.push(item.name);
        seriesData1.push(item.value);
        sum += item.value;
      });

      const option = {
        backgroundColor: "#061326",
        title: {
          text: this.title,
          top: 20,
          left: "center",
          textStyle: { color: "#fff", fontSize: 20 }
        },
        grid: { top: "25%", bottom: "15%" },
        xAxis: {
          data: xAxisData,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            show: true,
            margin: 25,
            align: "center",
            formatter: (params, index) => {
              return (
                "{a|" +
                ((seriesData1[index] / sum) * 100).toFixed(2) +
                "%}" +
                "\n" +
                "{b|" +
                params +
                "}"
              );
            },
            rich: {
              a: { fontSize: 12, color: "#ffffff" },
              b: { height: 20, fontSize: 14, color: "#ffffff" }
            }
          },
          interval: 0
        },
        yAxis: {
          splitLine: { show: false },
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { show: false }
        },
        series: [
          {
            name: "柱顶部",
            type: "pictorialBar",
            symbolSize: [26, 10],
            symbolOffset: [0, -5],
            z: 12,
            itemStyle: { color: this.barColor },
            symbolPosition: "end",
            data: seriesData1
          },
          {
            name: "柱底部",
            type: "pictorialBar",
            symbolSize: [26, 10],
            symbolOffset: [0, 5],
            z: 12,
            itemStyle: { color: this.barColor },
            data: seriesData1
          },
          {
            name: "第一圈",
            type: "pictorialBar",
            symbolSize: [47, 16],
            symbolOffset: [0, 11],
            z: 11,
            itemStyle: {
              color: "transparent",
              borderColor: this.barColor,
              borderWidth: 2
            },
            data: seriesData1
          },
          {
            name: "第二圈",
            type: "pictorialBar",
            symbolSize: [62, 22],
            symbolOffset: [0, 17],
            z: 10,
            itemStyle: {
              color: "transparent",
              borderColor: this.barColor,
              borderWidth: 2
            },
            data: seriesData1
          },
          {
            type: "bar",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: this.barColor },
                { offset: 0, color: this.barGradientColor }
              ]),
              opacity: 0.8
            },
            z: 16,
            silent: true,
            barWidth: 26,
            barGap: "-100%",
            data: seriesData1
          }
        ]
      };

      this.chart.setOption(option, true);
    }
  }
};
</script>

<style scoped>
.multi-bar-chart {
  position: relative;
}
</style>
