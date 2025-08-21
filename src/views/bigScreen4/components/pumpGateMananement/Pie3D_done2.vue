<template>
  <div class="pie-3d-container" ref="chart"></div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";

export default {
  name: "Pie3D",
  props: {
    chartData: {
      type: Array,
      default: () => []
    },
    internalDiameterRatio: {
      type: Number,
      default: 0.7 // 内径比例
    }
  },
  data() {
    return {
      chart: null,
      selectedIndex: -1 // 当前选中扇形索引
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.resizeChart);
  },
  beforeDestroy() {
    if (this.chart) this.chart.dispose();
    window.removeEventListener("resize", this.resizeChart);
  },
  methods: {
    initChart() {
      if (!this.chart) this.chart = echarts.init(this.$refs.chart);

      this.chart.setOption(
        this.getPie3D(this.chartData, this.internalDiameterRatio)
      );

      // 点击选中
      this.chart.on("click", (params) => {
        if (params.seriesName === "mouseoutSeries") return;
        this.selectedIndex = params.seriesIndex;
        this.chart.setOption(
          this.getPie3D(
            this.chartData,
            this.internalDiameterRatio,
            this.selectedIndex
          )
        );
      });

      // 鼠标移入高亮
      this.chart.on("highlight", (params) => {});
    },
    resizeChart() {
      if (this.chart) this.chart.resize();
    },
    getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
      let midRatio = (startRatio + endRatio) / 2;
      let startRadian = startRatio * Math.PI * 2;
      let endRadian = endRatio * Math.PI * 2;
      let midRadian = midRatio * Math.PI * 2;

      k = typeof k !== "undefined" ? k : 1 / 3;
      let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
      let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
      let hoverRate = isHovered ? 1.05 : 1;

      return {
        u: { min: -Math.PI, max: Math.PI * 3, step: Math.PI / 32 },
        v: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
        x: (u, v) => {
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
        y: (u, v) => {
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
        z: function (u, v) {
          if (u < -Math.PI * 0.5) {
            return Math.sin(u);
          }
          if (u > Math.PI * 2.5) {
            return Math.sin(u) * h * 0.1;
          }
          return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
        }
      };
    },
    getPie3D(pieData, internalDiameterRatio, selectedIndex = -1) {
      let series = [];
      let sumValue = pieData.reduce((sum, d) => sum + d.value, 0);
      let startValue = 0;
      let k =
        typeof internalDiameterRatio !== "undefined"
          ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
          : 1 / 3;
      let legendData = [];

      pieData.forEach((item, i) => {
        let endValue = startValue + item.value;
        let startRatio = startValue / sumValue;
        let endRatio = endValue / sumValue;

        series.push({
          name: item.name,
          type: "surface",
          parametric: true,
          wireframe: { show: false },
          itemStyle: item.itemStyle || {},
          pieData: item,
          parametricEquation: this.getParametricEquation(
            startRatio,
            endRatio,
            selectedIndex === i,
            false,
            k,
            item.value
          )
        });

        startValue = endValue;
        legendData.push(item.name);
      });

      // 透明支撑环
      series.push({
        name: "mouseoutSeries",
        type: "surface",
        parametric: true,
        wireframe: { show: false },
        itemStyle: { opacity: 0 },
        parametricEquation: {
          u: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
          v: { min: 0, max: Math.PI, step: Math.PI / 20 },
          x: (u, v) => Math.sin(v) * Math.sin(u) + Math.sin(u),
          y: (u, v) => Math.sin(v) * Math.cos(u) + Math.cos(u),
          z: (u, v) => (Math.cos(v) > 0 ? 0.1 : -0.1)
        }
      });

      return {
        legend: {
          data: legendData,
          textStyle: { color: "#fff", fontSize: 16 }
        },
        tooltip: {
          formatter: (params) => {
            if (params.seriesName !== "mouseoutSeries") {
              return `${params.seriesName}<br/>
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background:${
                  params.color
                };"></span>
                ${series[params.seriesIndex].pieData.number}`;
            }
          }
        },
        xAxis3D: { min: -1, max: 1 },
        yAxis3D: { min: -1, max: 1 },
        zAxis3D: { min: -1, max: 1 },
        grid3D: {
          show: false,
          boxHeight: 5,
          viewControl: {
            alpha: 40,
            rotateSensitivity: 1,
            zoomSensitivity: 1,
            panSensitivity: 1
          },
          postEffect: {
            enable: true,
            bloom: { enable: true, bloomIntensity: 0 }
          }
        },
        series
      };
    }
  }
};
</script>

<style scoped>
.pie-3d-container {
  width: 100%;
  height: 500px;
}
</style>
