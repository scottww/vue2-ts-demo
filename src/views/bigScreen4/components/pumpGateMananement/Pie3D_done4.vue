<template>
  <div class="chart-container">
    <!-- 左边：3D 饼图 -->
    <div ref="chart" class="chart"></div>

    <!-- 右边：自定义 legend -->
    <div class="legend">
      <div v-for="(item, index) in dataList" :key="index" class="legend-item">
        <span
          class="legend-color"
          :style="{ backgroundColor: item.itemStyle.color }"
        ></span>
        <!-- <span class="legend-text">{{ item.name }}: {{ item.val }}</span> -->
        <span class="legend-text">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";

export default {
  name: "Pie3DWithLegend",
  data() {
    return {
      chart: null,
      dataList0: [
        {
          name: "类型一",
          val: 1230,
          itemStyle: { color: "rgba(0, 81, 180, 0.5)" }
        },
        {
          name: "类型二",
          val: 800,
          itemStyle: { color: "rgba(255, 196, 0, 0.5)" }
        },
        {
          name: "类型三",
          val: 500,
          itemStyle: { color: "rgba(95, 144, 110, 0.5)" }
        }
      ],
      dataList: [
        {
          name: "运行维护费",
          val: 1230,
          itemStyle: { color: "rgba(32, 159, 237, 0.7)" }
        },
        {
          name: "办公费",
          val: 800,
          itemStyle: { color: "rgba(255, 159, 32, 0.7)" }
        },
        {
          name: "差旅费",
          val: 500,
          itemStyle: { color: "rgba(159, 255, 237, 0.7)" }
        },
        {
          name: "其他类型",
          val: 220,
          itemStyle: { color: "rgba(159, 255, 32, 0.7)" }
        }
      ],
      heightProportion: 0.2,
      option: {}
    };
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart);
    this.initOption();
    this.chart.setOption(this.option);
  },
  methods: {
    // === 保留你第二份代码里的 3D 饼图核心方法 ===
    getParametricEquation(
      startRatio,
      endRatio,
      isSelected,
      isHovered,
      k,
      height
    ) {
      var midRatio = (startRatio + endRatio) / 3;
      var startRadian = startRatio * Math.PI * 2;
      var endRadian = endRatio * Math.PI * 2;
      var midRadian = midRatio * Math.PI * 2;

      if (startRatio === 0 && endRatio === 1) isSelected = false;
      k = typeof k !== "undefined" ? k : 1 / 3;
      var offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
      var offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
      var hoverRate = isHovered ? 1.1 : 1;

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
          if (u > Math.PI * 2.5) return Math.sin(u);
          return Math.sin(v) > 0 ? this.heightProportion * height : -1;
        }.bind(this)
      };
    },
    getPie3D0(pieData, internalDiameterRatio) {
      var series = [];
      var sumValue = 0;
      var startValue = 0;
      var endValue = 0;
      var linesSeries = [];
      var k =
        typeof internalDiameterRatio !== "undefined"
          ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
          : 1 / 3;

      for (var i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value;
        var seriesItem = {
          name: pieData[i].name || "series" + i,
          type: "surface",
          parametric: true,
          wireframe: { show: false },
          pieData: pieData[i],
          pieStatus: { selected: false, hovered: false, k: k }
        };
        if (pieData[i].itemStyle) {
          var itemStyle = {};
          if (pieData[i].itemStyle.color)
            itemStyle.color = pieData[i].itemStyle.color;
          if (pieData[i].itemStyle.opacity)
            itemStyle.opacity = pieData[i].itemStyle.opacity;
          seriesItem.itemStyle = itemStyle;
        }
        series.push(seriesItem);
      }

      for (var i = 0; i < series.length; i++) {
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
      }

      return series;
    },
    getPie3D(pieData, internalDiameterRatio) {
      let series = [];
      let sumValue = 0;
      let startValue = 0;
      let endValue = 0;
      let legendData = [];
      let linesSeries = []; // line3D模拟label指示线
      let k =
        typeof internalDiameterRatio !== "undefined"
          ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
          : 1 / 3;

      // 生成扇形
      for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value;

        let seriesItem = {
          name: pieData[i].name || `series${i}`,
          type: "surface",
          parametric: true,
          wireframe: { show: false },
          pieData: pieData[i],
          pieStatus: { selected: false, hovered: false, k: k }
        };

        if (pieData[i].itemStyle) {
          seriesItem.itemStyle = {
            color: pieData[i].itemStyle.color,
            opacity: pieData[i].itemStyle.opacity
          };
        }

        series.push(seriesItem);
      }

      // 设置 parametricEquation
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
      }

      // 底座圆盘
      series.unshift({
        name: "底座",
        type: "surface",
        parametric: true,
        wireframe: { show: false },
        itemStyle: {
          color: "rgba(25, 93, 176, 1)",
          opacity: 1
        },
        parametricEquation: {
          u: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
          v: { min: 0, max: Math.PI, step: Math.PI / 20 },
          x: function (u, v) {
            return Math.cos(u) * (1 + (Math.cos(v) * 1) / 3); // 扁平圆盘
          },
          y: function (u, v) {
            return Math.sin(u) * (1 + (Math.cos(v) * 1) / 3);
          },
          z: function (u, v) {
            return -0.1; // 底座厚度
          }
        }
      });

      return series;
    },
    initOption0() {
      var total = 0;
      for (var i = 0; i < this.dataList.length; i++)
        total += this.dataList[i].val;
      var series = this.getPie3D(
        this.dataList.map((item) => {
          item.value = Number(((item.val / total) * 100).toFixed(2));
          return item;
        }),
        0.8
      );

      this.option = {
        tooltip: {
          formatter: (params) => {
            if (params.seriesName !== "mouseoutSeries") {
              return `${
                params.seriesName
              }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
                params.color
              };"></span>${series[params.seriesIndex].pieData.val}`;
            }
          }
        },
        animation: true,
        // backgroundColor: "#333",
        xAxis3D: { min: -1.5, max: 1.5 },
        yAxis3D: { min: -1.5, max: 1.5 },
        zAxis3D: { min: -1, max: 1 },
        grid3D: {
          show: false,
          boxHeight: 5, // 高度
          bottom: "50%",
          viewControl: {
            distance: 100, //相机距离
            alpha: 25,
            beta: 60,
            rotateSensitivity: 0,
            zoomSensitivity: 0,
            panSensitivity: 0,
            autoRotate: false
          }
        },
        series: series
      };
    },
    initOption() {
      var total = 0;
      for (var i = 0; i < this.dataList.length; i++)
        total += this.dataList[i].val;

      var series = this.getPie3D(
        this.dataList.map((item) => {
          item.value = Number(((item.val / total) * 100).toFixed(2));
          return item;
        }),
        0.8
      );

      this.option = {
        tooltip: {
          formatter: (params) => {
            if (params.seriesName !== "mouseoutSeries") {
              return `${
                params.seriesName
              }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
                params.color
              };"></span>${series[params.seriesIndex].pieData.val}`;
            }
          }
        },
        animation: true,
        // 中间总数
        title: [
          {
            text: total,
            x: "center",
            y: "center",
            top: "20%",
            textStyle: {
              color: "#fff",
              fontSize: 22,
              fontWeight: "bold"
            }
          },
          {
            text: "设备总数",
            x: "center",
            y: "center",
            top: "40%",
            textStyle: {
              color: "#fff",
              fontSize: 14,
              fontWeight: 400
            }
          }
        ],
        xAxis3D: { min: -1.5, max: 1.5 },
        yAxis3D: { min: -1.5, max: 1.5 },
        zAxis3D: { min: -1, max: 1 },
        grid3D: {
          show: false,
          boxHeight: 5, // 高度
          bottom: "50%",
          viewControl: {
            distance: 100, //相机距离
            alpha: 25,
            beta: 60,
            rotateSensitivity: 0,
            zoomSensitivity: 0,
            panSensitivity: 0,
            autoRotate: false
          }
        },
        series: series
      };
    }
  }
};
</script>

<style scoped>
.chart-container {
  display: flex;
  height: 100%;
  width: 100%;
}

/* 左边饼图 */
.chart {
  flex: 2; /* 左边占 2/3 */
  display: flex; /* 内部 flex 居中饼图 */
  justify-content: center;
  align-items: center;
  height: 100%;
}

/* 右边 legend */
.legend {
  flex: 1; /* 右边占 1/3 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  overflow: hidden;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.legend-color {
  width: 13px;
  height: 13px;
  /* border-radius: 50%; */
  margin-right: 8px;
}

.legend-text {
  font-size: 13px;
}
</style>
