<template>
  <div class="echarts-wrapper" ref="chartRef"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "CustomPieChart",
  props: {
    chartData: {
      type: Array,
      default: () => [
        { name: "目标 1", value: 0.5, total: 0.5 },
        { name: "目标 2", value: 0.2, total: 0.2 },
        { name: "目标 3", value: 0.2, total: 0.2 }
      ]
    },
    backgroundColor: {
      type: String,
      default: "#243c54"
    }
  },
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
    }
    window.removeEventListener("resize", this.resizeChart);
  },
  methods: {
    initChart() {
      if (!this.$refs.chartRef) return;
      this.chartInstance = echarts.init(this.$refs.chartRef);

      this.setOptions();
    },
    resizeChart() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    },
    setOptions() {
      const colorList1 = [
        "#018CFF",
        "",
        "#FCAF03",
        "",
        "#1DBB67",
        "",
        "#FF586C",
        ""
      ];
      const colorList2 = [
        "rgba(1,140,255, 0.4)",
        "",
        "rgba(252,175,3, 0.4)",
        "",
        "rgba(29,187,103, 0.4)",
        "",
        "rgba(255,88,108, 0.4)",
        ""
      ];

      let sum = 0;
      let optionData = [];
      this.chartData.forEach((item) => {
        sum += Number(item.total);
      });
      this.chartData.forEach((item) => {
        optionData.push({ value: item.value, name: item.name });
        optionData.push({
          name: "",
          value: sum / 100,
          itemStyle: { color: "transparent" }
        });
      });

      const option = {
        backgroundColor: this.backgroundColor,
        tooltip: { trigger: "item" },
        title: {
          text: `{b|事件总数}\n{a|${sum.toFixed(2)}}`,
          left: "50%",
          top: "50%",
          textStyle: {
            rich: {
              b: { color: "#fff", fontSize: 14, padding: 10 },
              a: { color: "#fff", fontSize: 32, fontWeight: 700 }
            }
          },
          textAlign: "center",
          textVerticalAlign: "middle"
        },
        legend: { show: false },
        series: [
          {
            type: "pie",
            zlevel: 3,
            radius: ["25%", "35%"],
            center: ["50%", "50%"],
            itemStyle: {
              normal: {
                color: (params) => colorList2[params.dataIndex]
              }
            },
            label: { show: false },
            data: optionData
          },
          {
            type: "pie",
            zlevel: 1,
            silent: true,
            radius: ["38%", "40%"],
            center: ["50%", "50%"],
            itemStyle: {
              normal: {
                color: (params) => colorList1[params.dataIndex]
              }
            },
            label: { show: false },
            data: optionData
          },
          {
            type: "pie",
            radius: ["44%", "44.2%"],
            center: ["50%", "50%"],
            hoverAnimation: false,
            itemStyle: {
              normal: {
                shadowBlur: 1,
                shadowColor: "rgba(15, 79, 150,0.61)",
                color: "rgba(23,138,173,1)"
              }
            },
            label: { show: false },
            data: [0]
          },
          {
            type: "pie",
            radius: ["44%", "44.5%"],
            center: ["50%", "50%"],
            hoverAnimation: false,
            color: [
              "rgba(255, 255, 255, 0.5)",
              "rgba(255, 255, 255, 0.5)",
              "rgba(255, 255, 255, 0.5)",
              "rgba(255, 255, 255, 0.5)"
            ],
            label: { show: false },
            data: [140, 60, 240, 130]
          }
        ]
      };

      this.chartInstance.setOption(option);
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        if (this.chartInstance) {
          this.setOptions();
        }
      }
    }
  }
};
</script>

<style scoped>
.echarts-wrapper {
  width: 100%;
  height: 100%;
}
</style>
