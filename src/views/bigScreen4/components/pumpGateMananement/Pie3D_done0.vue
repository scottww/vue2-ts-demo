<template>
  <div ref="chart" class="pie-3d-container"></div>
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
    internalDiameterRatio: {
      type: Number,
      default: 0.71
    }
  },
  data() {
    return {
      chart: null
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
      k = typeof k !== "undefined" ? k : 1 / 3;
      let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
      let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
      let hoverRate = isHovered ? 1.05 : 1;

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
        z: function (u, v) {
          if (u < -Math.PI * 0.5) return Math.sin(u);
          if (u > Math.PI * 2.5) return Math.sin(u) * h * 0.1;
          return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
        }
      };
    },
    getPie3D(pieData, internalDiameterRatio) {
      let series = [];
      let sumValue = 0;
      let startValue = 0;
      let endValue = 0;
      let legendData = [];
      let k =
        typeof internalDiameterRatio !== "undefined"
          ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
          : 1 / 3;

      pieData.forEach((item, i) => {
        sumValue += item.value;
        let seriesItem = {
          name: item.name || `series${i}`,
          value: item.value || `series${i}`,
          type: "surface",
          parametric: true,
          wireframe: { show: false },
          pieData: item,
          pieStatus: { selected: false, hovered: false, k: k }
        };

        if (item.itemStyle) {
          seriesItem.itemStyle = {};
          if (item.itemStyle.color)
            seriesItem.itemStyle.color = item.itemStyle.color;
          if (item.itemStyle.opacity)
            seriesItem.itemStyle.opacity = item.itemStyle.opacity;
        }

        seriesItem.label = {
          formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
          backgroundColor: "#eee",
          borderColor: "#aaa",
          borderWidth: 1,
          borderRadius: 4,
          rich: {
            a: { color: "#999", lineHeight: 22, align: "center" },
            hr: {
              borderColor: "#aaa",
              width: "100%",
              borderWidth: 0.5,
              height: 0
            },
            b: { fontSize: 16, lineHeight: 33 },
            per: {
              color: "#eee",
              backgroundColor: "#334455",
              padding: [2, 4],
              borderRadius: 2
            }
          }
        };
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

      // 补充透明圆环
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
          icon: "circle",
          data: legendData,
          top: 50,
          width: 50,
          itemGap: 20,
          right: 40,
          formatter: (value) => {
            let res = "";
            for (let i = 0; i < this.data.length; i++) {
              if (this.data[i].name === value)
                res = this.data[i].name + this.data[i].number;
            }
            return res || value;
          },
          textStyle: { color: "#fff", fontSize: 16 }
        },
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
        zAxis3D: { min: -1, max: 1 },
        grid3D: {
          left: "-10%",
          top: 20,
          show: false,
          boxHeight: 5,
          viewControl: {
            alpha: 25, // 默认视角仰角
            beta: 0, // 默认视角水平角
            rotateSensitivity: 0, // 禁止旋转
            zoomSensitivity: 0, // 禁止缩放
            panSensitivity: 0, // 禁止平移
            autoRotate: false // 禁止自动旋转
          },
          postEffect: {
            enable: true,
            bloom: { enable: true, bloomIntensity: 0 },
            SSAO: { enable: false, quality: "medium", radius: 2 }
          }
        },
        series: series
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
