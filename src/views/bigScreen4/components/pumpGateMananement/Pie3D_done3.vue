<template>
  <div class="pie-3d-wrapper">
    <!-- 左侧饼图 -->
    <div ref="chart" class="pie-3d-container"></div>
    <!-- 右侧图例 -->
    <div class="legend-container">
      <ul>
        <li v-for="(item, index) in data" :key="index">
          <span
            class="legend-color"
            :style="{ backgroundColor: item.itemStyle.color }"
          ></span>
          {{ item.name }}：{{ item.number }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";

export default {
  name: "Pie3DSurface",
  props: {
    data: {
      type: Array,
      default: () => [
        {
          name: "危运",
          value: 40,
          number: 120,
          itemStyle: { opacity: 0.7, color: "rgba(32,159,237,1)" }
        },
        {
          name: "包车",
          value: 30,
          number: 80,
          itemStyle: { opacity: 0.7, color: "rgba(255,159,32,1)" }
        },
        {
          name: "班车",
          value: 20,
          number: 60,
          itemStyle: { opacity: 0.7, color: "rgba(159,255,237,1)" }
        },
        {
          name: "重货",
          value: 10,
          number: 10,
          itemStyle: { opacity: 0.7, color: "rgba(159,255,32,1)" }
        }
      ]
    },
    internalDiameterRatio: { type: Number, default: 0.71 }
    // internalDiameterRatio: { type: Number, default: 0.8 }
  },
  data() {
    return { chart: null };
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
      this.chart = echarts.init(this.$refs.chart);
      this.chart.setOption(
        this.getPie3D(this.data, this.internalDiameterRatio)
      );
    },
    resizeChart() {
      if (this.chart) this.chart.resize();
    },
    getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
      let midRatio = (startRatio + endRatio) / 2;
      let startRadian = startRatio * Math.PI * 2;
      let endRadian = endRatio * Math.PI * 2;
      let midRadian = midRatio * Math.PI * 2;
      if (startRatio === 0 && endRatio === 1) isSelected = false;
      // k = typeof k !== "undefined" ? k : 1 / 3;
      k = typeof k !== "undefined" ? k : 1;
      // let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
      // let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
      // let hoverRate = isHovered ? 1.05 : 1;
      let offsetX = 0;
      let offsetY = 0;
      let hoverRate = 1;

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
        z: (u, v) => {
          if (u < -Math.PI * 0.5) return Math.sin(u);
          if (u > Math.PI * 2.5) return Math.sin(u) * h * 0.1;
          return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
        }
      };
    },
    getPie3D(pieData, internalDiameterRatio) {
      let series = [],
        sumValue = 0,
        startValue = 0,
        endValue = 0,
        legendData = [];
      let k =
        typeof internalDiameterRatio !== "undefined"
          ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
          : 1 / 3;

      pieData.forEach((item, i) => {
        sumValue += item.value;
        let seriesItem = {
          name: item.name,
          value: item.value,
          type: "surface",
          parametric: true,
          wireframe: { show: false },
          pieData: item,
          pieStatus: { selected: false, hovered: false, k: k }
        };
        if (item.itemStyle) seriesItem.itemStyle = { ...item.itemStyle };
        seriesItem.label = { show: false };
        series.push(seriesItem);
      });

      for (let i = 0; i < series.length; i++) {
        endValue = startValue + series[i].pieData.value;
        series[i].pieData.startRatio = startValue / sumValue;
        series[i].pieData.endRatio = endValue / sumValue;
        series[i].parametricEquation = this.getParametricEquation(
          series[i].pieData.startRatio,
          series[i].pieData.endRatio,
          false,
          false,
          k,
          series[i].pieData.value
        );
        startValue = endValue;
        legendData.push(series[i].name);
      }

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
        tooltip: {
          formatter: (params) => {
            if (params.seriesName !== "mouseoutSeries") {
              return `${
                params.seriesName
              }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
                params.color
              };"></span>${series[params.seriesIndex].pieData.number}`;
            }
          }
        },
        xAxis3D: { min: -1, max: 1 },
        yAxis3D: { min: -1, max: 1 },
        zAxis3D: { min: -5, max: 5 },
        grid3D: {
          show: false,
          left: "center", // 水平居中
          top: "center", // 垂直居中
          boxHeight: 100,
          viewControl: {
            alpha: 45,
            beta: 0,
            rotateSensitivity: 0,
            zoomSensitivity: 0,
            panSensitivity: 0,
            autoRotate: false
          },
          postEffect: {
            enable: true,
            bloom: { enable: true, bloomIntensity: 0 },
            SSAO: { enable: false }
          }
        },
        series
      };
    }
  }
};
</script>

<style scoped>
.pie-3d-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.pie-3d-container {
  flex: 3;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}

.legend-container {
  flex: 1;
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.legend-container ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.legend-container li {
  margin-bottom: 10px;
  font-size: 16px;
  color: #fff;
  display: flex;
  align-items: center;
}

.legend-color {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border-radius: 50%;
}
</style>
