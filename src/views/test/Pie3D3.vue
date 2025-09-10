<template>
  <div ref="chart" :style="{ width: width, height: height }"></div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";

export default {
  name: "Pie3DChart",
  props: {
    dataList: {
      type: Array,
      required: true,
      default: () => [
        {
          name: "公务用车运行维护费",
          val: 1230,
          itemStyle: {
            color: "rgba(0, 81, 180, 0.5)"
          }
        },

        {
          name: "办公费",
          val: 800,
          itemStyle: {
            color: "rgba(255, 196, 0, 0.5)"
          }
        },
        {
          name: "差旅费",
          val: 500,
          itemStyle: {
            color: "rgba(95, 144, 110, 0.5)"
          }
        }
      ]
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "400px"
    },
    heightProportion: {
      type: Number,
      default: 0.2
    },
    internalDiameterRatio: {
      type: Number,
      default: 0.8
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
    window.removeEventListener("resize", this.resizeChart);
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  },
  methods: {
    resizeChart() {
      this.chartInstance && this.chartInstance.resize();
    },

    initChart() {
      this.chartInstance = echarts.init(this.$refs.chart);
      this.updateChart();
    },

    updateChart() {
      const total = this.dataList.reduce((acc, cur) => acc + cur.val, 0);

      const series = this.getPie3D(
        this.dataList.map((item) => {
          return {
            ...item,
            value: Number(((item.val / total) * 100).toFixed(2))
          };
        }),
        this.internalDiameterRatio
      );

      const option = {
        legend: {
          tooltip: { show: true },
          data: this.dataList.map((item) => item.name),
          top: "5%",
          left: "5%",
          icon: "circle",
          textStyle: { color: "#fff", fontSize: 14 }
        },
        animation: true,
        title: [
          {
            x: "center",
            top: "40%",
            text: total,
            textStyle: { color: "#fff", fontSize: 32, fontWeight: "bold" }
          },
          {
            x: "center",
            top: "49%",
            text: "总额",
            textStyle: { color: "#fff", fontSize: 24, fontWeight: 400 }
          }
        ],
        backgroundColor: "#333",
        labelLine: { show: true, lineStyle: { color: "#7BC0CB" } },
        label: { show: false },
        xAxis3D: { min: -1.5, max: 1.5 },
        yAxis3D: { min: -1.5, max: 1.5 },
        zAxis3D: { min: -1, max: 1 },
        grid3D: {
          show: false,
          boxHeight: 4,
          bottom: "50%",
          viewControl: { distance: 180, alpha: 25, beta: 60, autoRotate: true }
        },
        series
      };

      this.chartInstance.setOption(option);
    },

    getParametricEquation(
      startRatio,
      endRatio,
      isSelected,
      isHovered,
      k,
      height
    ) {
      let midRatio = (startRatio + endRatio) / 3;
      let startRadian = startRatio * Math.PI * 2;
      let endRadian = endRatio * Math.PI * 2;
      let midRadian = midRatio * Math.PI * 2;

      if (startRatio === 0 && endRatio === 1) isSelected = false;
      k = typeof k !== "undefined" ? k : 1 / 3;

      let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
      let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
      let hoverRate = isHovered ? 1.1 : 1;

      return {
        u: { min: -Math.PI, max: Math.PI * 3, step: Math.PI / 32 },
        v: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
        x: function (u, v) {
          if (u < startRadian)
            return (
              offsetX +
              Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          if (u > endRadian)
            return (
              offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        y: function (u, v) {
          if (u < startRadian)
            return (
              offsetY +
              Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          if (u > endRadian)
            return (
              offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        z: (u, v) => (Math.sin(v) > 0 ? this.heightProportion * height : -1)
      };
    },

    getPie3D(pieData, internalDiameterRatio) {
      let series = [];
      let sumValue = 0;
      let startValue = 0;
      let endValue = 0;
      let linesSeries = [];
      let k =
        typeof internalDiameterRatio !== "undefined"
          ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
          : 1 / 3;

      pieData.forEach((item, i) => (sumValue += item.value));

      pieData.forEach((item, i) => {
        const seriesItem = {
          name: item.name || `series${i}`,
          type: "surface",
          parametric: true,
          wireframe: { show: false },
          pieData: item,
          pieStatus: { selected: false, hovered: false, k }
        };

        if (item.itemStyle) {
          seriesItem.itemStyle = {
            color: item.itemStyle.color,
            opacity: item.itemStyle.opacity
          };
        }

        series.push(seriesItem);
      });

      series.forEach((s, i) => {
        endValue = startValue + s.pieData.value;
        s.pieData.startRatio = startValue / sumValue;
        s.pieData.endRatio = endValue / sumValue;
        s.parametricEquation = this.getParametricEquation(
          s.pieData.startRatio,
          s.pieData.endRatio,
          false,
          false,
          k,
          s.pieData.value
        );
        startValue = endValue;

        const midRadian = (s.pieData.endRatio + s.pieData.startRatio) * Math.PI;
        const posX = Math.cos(midRadian) * (1 + Math.cos(Math.PI / 2));
        const posY = Math.sin(midRadian) * (1 + Math.cos(Math.PI / 2));
        const posZ = Math.log(Math.abs(s.pieData.value + 1)) * 0.1;
        const flag =
          (midRadian >= 0 && midRadian <= Math.PI / 2) ||
          (midRadian >= (3 * Math.PI) / 2 && midRadian <= Math.PI * 2)
            ? 1
            : -1;
        const color = pieData[i].itemStyle.color;
        const turningPosArr = [
          posX * 1.8 + i * 0.1 * flag + (flag < 0 ? -0.5 : 0),
          posY * 1.8 + i * 0.1 * flag + (flag < 0 ? -0.5 : 0),
          posZ * 2
        ];
        const endPosArr = [
          posX * 1.9 + i * 0.1 * flag + (flag < 0 ? -0.5 : 0),
          posY * 1.9 + i * 0.1 * flag + (flag < 0 ? -0.5 : 0),
          posZ * 6
        ];

        linesSeries.push(
          {
            type: "line3D",
            lineStyle: { color },
            data: [[posX, posY, posZ], turningPosArr, endPosArr]
          },
          {
            type: "scatter3D",
            label: {
              show: true,
              distance: 0,
              position: "center",
              textStyle: {
                color: "#fff",
                backgroundColor: color,
                borderWidth: 2,
                fontSize: 14,
                padding: 10,
                borderRadius: 4
              },
              formatter: "{b}"
            },
            symbolSize: 0,
            data: [{ name: s.name + "\n" + s.pieData.val, value: endPosArr }]
          }
        );
      });

      series = series.concat(linesSeries);

      // 最底下圆盘
      series.push({
        name: "mouseoutSeries",
        type: "surface",
        parametric: true,
        wireframe: { show: false },
        itemStyle: { opacity: 1, color: "rgba(25, 93, 176, 1)" },
        parametricEquation: {
          u: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
          v: { min: 0, max: Math.PI, step: Math.PI / 20 },
          x: (u, v) =>
            ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2.2,
          y: (u, v) =>
            ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2.2,
          z: (u, v) => (Math.cos(v) > 0 ? -0 : -1.5)
        }
      });

      return series;
    }
  }
};
</script>

<style scoped>
/* 可根据需要调整容器样式 */
</style>
