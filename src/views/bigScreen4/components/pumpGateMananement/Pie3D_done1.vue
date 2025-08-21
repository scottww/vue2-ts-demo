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
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    console.log("echarts-gl loaded:", echarts);
    // this.initChart();
    this.initTest();
    window.addEventListener("resize", this.resizeChart);
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
    window.removeEventListener("resize", this.resizeChart);
  },
  methods: {
    // 显示球形
    initTest() {
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.chart);
      }
      //显示球型
      // this.chart.setOption({
      //   xAxis3D: {},
      //   yAxis3D: {},
      //   zAxis3D: {},
      //   grid3D: {},
      //   series: [
      //     {
      //       type: "surface",
      //       parametric: true,
      //       shading: "realistic",
      //       parametricEquation: {
      //         u: { min: -Math.PI, max: Math.PI, step: Math.PI / 20 },
      //         v: { min: -Math.PI, max: Math.PI, step: Math.PI / 20 },
      //         x: (u, v) => Math.sin(u) * Math.cos(v),
      //         y: (u, v) => Math.sin(u) * Math.sin(v),
      //         z: (u, v) => Math.cos(u)
      //       }
      //     }
      //   ]
      // });
      this.chart.setOption(
        this.getPie3D(
          [
            {
              name: "A",
              value: 40,
              number: "40个",
              itemStyle: { color: "#f00" }
            },
            {
              name: "B",
              value: 60,
              number: "60个",
              itemStyle: { color: "#0f0" }
            }
          ],
          0.7
        )
      );
    },
    initChart() {
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.chart);
      }
      const option = this.getPie3D(this.chartData, 0.71);
      this.chart.setOption(option);
    },
    resizeChart() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
      let midRatio = (startRatio + endRatio) / 2;
      let startRadian = startRatio * Math.PI * 2;
      let endRadian = endRatio * Math.PI * 2;
      let midRadian = midRatio * Math.PI * 2;

      if (startRatio === 0 && endRatio === 1) {
        isSelected = false;
      }
      k = typeof k !== "undefined" ? k : 1 / 3;

      let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
      let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
      let hoverRate = isHovered ? 1.05 : 1;

      return {
        u: { min: -Math.PI, max: Math.PI * 3, step: Math.PI / 32 },
        v: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
        x: (u, v) => {
          if (u < startRadian) {
            return (
              offsetX +
              Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          if (u > endRadian) {
            return (
              offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        y: (u, v) => {
          if (u < startRadian) {
            return (
              offsetY +
              Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          if (u > endRadian) {
            return (
              offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        // z: (u, v) => {
        //   if (u < -Math.PI * 0.5) return Math.sin(u);
        //   if (u > Math.PI * 2.5) return Math.sin(u) * h * 0.1;
        //   return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
        // }
        z: (u, v) => {
          if (u < -Math.PI * 0.5) return Math.sin(u);
          if (u > Math.PI * 2.5) return Math.sin(u) * h * 0.1;
          return Math.sin(v) > 0 ? h * 0.2 : -h * 0.2;
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

      for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value;
        let seriesItem = {
          name: pieData[i].name || `series${i}`,
          value: pieData[i].value || 0,
          type: "surface",
          parametric: true,
          wireframe: { show: false },
          pieData: pieData[i],
          pieStatus: { selected: false, hovered: false, k }
        };

        if (pieData[i].itemStyle) {
          seriesItem.itemStyle = {
            color: pieData[i].itemStyle.color,
            opacity: pieData[i].itemStyle.opacity
          };
        }
        series.push(seriesItem);
      }

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

      let option = {
        legend: {
          icon: "circle",
          data: legendData,
          top: 50,
          right: 40,
          itemGap: 20,
          formatter: (value) => {
            let res = "";
            for (let i = 0; i < pieData.length; i++) {
              if (pieData[i].name === value) {
                res = pieData[i].name + " " + pieData[i].number;
              }
            }
            return res || value;
          },
          textStyle: { color: "#fff", fontSize: 16 }
        },
        tooltip: {
          formatter: (params) => {
            if (params.seriesName !== "mouseoutSeries") {
              return `${params.seriesName}<br/>
              <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background:${
                params.color
              };"></span>
              ${option.series[params.seriesIndex].pieData.number}`;
            }
          }
        },
        xAxis3D: { min: -1, max: 1 },
        yAxis3D: { min: -1, max: 1 },
        zAxis3D: { min: -1, max: 1 },
        grid3D: {
          show: false,
          boxHeight: 5,
          // viewControl: {
          //   alpha: 40,
          //   rotateSensitivity: 0,
          //   zoomSensitivity: 0,
          //   panSensitivity: 0
          // },
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
      return option;
    }
  }
};
</script>

<style scoped>
.pie-3d-container {
  width: 100%;
  height: 500px;
  /* background: #222; */
}
</style>
