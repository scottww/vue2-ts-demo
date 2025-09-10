<template>
  <div
    class="pie3d-container"
    ref="chart"
    style="width: 100%; height: 400px"
  ></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Pie3DChart",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: "总量"
    },
    total: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      chartInstance: null
    };
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.initChart();
      }
    },
    title() {
      this.initChart();
    },
    total() {
      this.initChart();
    }
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.resizeChart);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeChart);
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  },
  methods: {
    resizeChart() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    },
    initChart() {
      if (!this.$refs.chart) return;
      this.chartInstance = echarts.init(this.$refs.chart);

      const normaldata = this.data.length
        ? this.data
        : [
            {
              zbPercentValue: 0.0,
              zbTitle: "指标值",
              name: "数量",
              value: 0,
              itemStyle: { normal: { color: "rgba(6, 194, 255, 1)" } },
              label: { color: "rgba(0,207,255,1.00)" }
            },
            {
              zbPercentValue: 0.51,
              zbTitle: "指标值",
              name: "原值",
              value: 51,
              itemStyle: { normal: { color: "rgba(235, 42, 55, 1)" } },
              label: { color: "rgba(255,89,89,1.00)" },
              selected: true
            },
            {
              zbPercentValue: 0.49,
              zbTitle: "指标值",
              name: "净值",
              value: 49,
              itemStyle: { normal: { color: "rgba(255, 205, 41, 1)" } },
              label: { color: "rgba(24,145,254,1.00)" }
            }
          ];

      let sum = normaldata.reduce((acc, item) => acc + Number(item.value), 0);

      let valdata = [];
      normaldata.forEach((item) => {
        valdata.push({ value: item.value, name: item.name });
        valdata.push({
          name: "",
          value: sum / 100,
          itemStyle: { color: "transparent" }
        });
      });

      const colorList = [
        "rgba(6, 194, 255, 1)",
        "rgba(235, 42, 55, 1)",
        "rgba(255, 205, 41, 1)",
        "rgba(41, 242, 255, 1)"
      ];

      const colorList1 = [];
      const colorList2 = [];
      colorList.forEach((item) => {
        colorList1.push(item);
        colorList1.push("");
        colorList2.push(item.replace(/,\s*\d+(\.\d+)?\)/, ", 0.3)"));
        colorList2.push("");
      });

      const option = {
        backgroundColor: "#243c54",
        title: [
          {
            text: `{name|${this.title}}\n{val|${this.total}}`,
            top: "center",
            left: "center",
            textStyle: {
              lineHeight: 36,
              rich: {
                name: {
                  fontSize: 14,
                  fontWeight: "normal",
                  color: "rgba(162, 177, 188, 1)"
                },
                val: {
                  fontSize: 22,
                  fontWeight: "bolder",
                  color: "rgba(255, 255, 255, 1)"
                }
              }
            }
          }
        ],
        legend: {
          orient: "horizontal",
          left: "center",
          bottom: 30,
          icon: "none",
          itemWidth: 6,
          itemHeight: 6,
          formatter: (name) => {
            const arr = [`{iconName|}{name|${name}}`];
            return arr.join("");
          },
          textStyle: {
            color: "#FFF",
            fontSize: 12,
            rich: {
              name: {
                color: "rgba(144, 178, 210, 1)",
                fontSize: 12,
                width: 100,
                padding: [0, 0, 0, 10]
              }
            }
          },
          data: normaldata.map((dItem, dIndex) => ({
            ...dItem,
            textStyle: {
              rich: {
                iconName: {
                  width: 8,
                  height: 8,
                  borderRadius: 7,
                  backgroundColor: colorList[dIndex]
                },
                percent: { color: colorList[dIndex] }
              }
            }
          }))
        },
        series: [
          {
            type: "pie",
            zlevel: 3,
            radius: ["25%", "38%"],
            itemStyle: { color: (params) => colorList2[params.dataIndex] },
            label: { show: false },
            data: valdata
          },
          {
            type: "pie",
            zlevel: 1,
            silent: true,
            radius: ["38%", "40%"],
            itemStyle: { color: (params) => colorList1[params.dataIndex] },
            label: {
              padding: [0, -55],
              alignTo: "labelLine",
              formatter: (params) =>
                params.name
                  ? `{c|${params.value}万元}\n\n{d|${params.percent}%}`
                  : "",
              rich: {
                c: { color: "#fff", lineHeight: 10 },
                d: { color: "#fff" },
                dot: {
                  backgroundColor: "auto",
                  width: 0,
                  height: 0,
                  borderRadius: 3,
                  fontSize: 16,
                  padding: [3, -3, 3, -3]
                }
              }
            },
            labelLine: { length: 40, length2: 80 },
            data: valdata
          },
          {
            type: "pie",
            radius: ["44%", "44.3%"],
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
              shadowBlur: 1,
              shadowColor: "rgba(15, 79, 150,0.61)",
              color: "rgba(23,138,173,1)"
            },
            label: { show: false },
            data: [0]
          },
          {
            type: "pie",
            radius: ["44%", "44.6%"],
            hoverAnimation: false,
            clockWise: false,
            color: ["#55c2e200", "rgba(23,138,173,1)", "#ff5a6100", "ff5a6100"],
            label: { show: false },
            data: [40, 20, 240, 30]
          },
          {
            type: "pie",
            radius: ["44%", "44.6%"],
            hoverAnimation: false,
            clockWise: false,
            color: ["#55c2e200", "rgba(23,138,173,1)", "#ff5a6100", "ff5a6100"],
            label: { show: false },
            data: [140, 30, 240, 30]
          },
          {
            type: "pie",
            radius: ["44%", "44.6%"],
            hoverAnimation: false,
            clockWise: false,
            color: ["#55c2e200", "rgba(23,138,173,1)", "#ff5a6100", "ff5a6100"],
            label: { show: false },
            data: [280, 30, 130, 30]
          },
          {
            type: "pie",
            radius: ["44%", "44.6%"],
            hoverAnimation: false,
            clockWise: false,
            color: ["#55c2e200", "rgba(23,138,173,1)", "#ff5a6100", "ff5a6100"],
            label: { show: false },
            data: [940, 60, 130, 30]
          }
        ]
      };

      this.chartInstance.setOption(option, true);
    }
  }
};
</script>

<style scoped>
.pie3d-container {
  width: 100%;
  height: 400px;
}
</style>
