<template>
  <div class="chart-container">
    <!-- 左边：3D 饼图 -->
    <div ref="chart" class="chart"></div>

    <!-- 右边：自定义 legend -->
    <div class="legend">
      <div
        v-for="(item, index) in dataList"
        :key="item.name"
        class="legend-item"
        :class="{ active: activeIndex === index }"
        @click="highlightPie(index)"
      >
        <span
          class="legend-color"
          :style="{ backgroundColor: item.itemStyle.color }"
        ></span>
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
      activeIndex: null,
      currentTotal: 0, // 用于动画
      dataList: [
        {
          name: "运行维护费",
          val: 1230,
          itemStyle: { color: "rgba(32,159,237,0.7)" }
        },
        {
          name: "办公费",
          val: 800,
          itemStyle: { color: "rgba(255,159,32,0.7)" }
        },
        {
          name: "差旅费",
          val: 500,
          itemStyle: { color: "rgba(159,255,237,0.7)" }
        },
        {
          name: "其他类型",
          val: 220,
          itemStyle: { color: "rgba(159,255,32,0.7)" }
        }
      ],
      heightProportion: 0.2,
      option: {}
    };
  },
  computed: {
    totalVal() {
      return this.dataList.reduce((sum, item) => sum + item.val, 0);
    },
    pieSeriesData() {
      return this.dataList.map((item) => ({
        ...item,
        value: Number(((item.val / this.totalVal) * 100).toFixed(2))
      }));
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart);
    this.initOption();
    this.chart.setOption(this.option);

    // 监听 legend 选中变化，保持 total 显示
    this.chart.on("legendselectchanged", () => {
      this.updateTotal();
    });

    this.animateTotal();
  },
  methods: {
    updateTotal() {
      this.chart.setOption({
        title: [
          {
            text: this.totalVal,
            left: "50%",
            top: "40%",
            textAlign: "center",
            textStyle: { color: "#fff", fontSize: 24, fontWeight: "bold" }
          },
          {
            text: "设备总数",
            left: "50%",
            top: "55%",
            textAlign: "center",
            textStyle: { color: "#fff", fontSize: 14 }
          }
        ]
      });
    },
    animateTotal() {
      let start = 0;
      const end = this.totalVal;
      const duration = 1000;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = end / steps;
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        this.chart.setOption({
          title: [
            {
              text: Math.floor(start),
              left: "50%",
              top: "30%",
              textAlign: "center",
              textStyle: { color: "#fff", fontSize: 24, fontWeight: "bold" }
            },
            {
              text: "设备总数",
              left: "50%",
              top: "45%",
              textAlign: "center",
              textStyle: { color: "#fff", fontSize: 15, fontWeight: "400" }
            }
          ]
        });
      }, stepTime);
    },
    // 点击 legend 高亮
    highlightPie(index) {
      this.activeIndex = index;
      this.initOption();
      this.chart.setOption(this.option, true);
      this.updateTotal(); // 保证 total 重新显示
    },
    getParametricEquation(
      startRatio,
      endRatio,
      isSelected,
      isHovered,
      k,
      height
    ) {
      const midRatio = (startRatio + endRatio) / 2;
      const startRadian = startRatio * Math.PI * 2;
      const endRadian = endRatio * Math.PI * 2;
      const midRadian = midRatio * Math.PI * 2;

      const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
      const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
      const hoverRate = isHovered ? 1.1 : 1;

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
        z: (u, v) => (Math.sin(v) > 0 ? this.heightProportion * height : -1)
      };
    },
    getPie3D(pieData, internalDiameterRatio = 0.8) {
      const series = [];
      const k = (1 - internalDiameterRatio) / (1 + internalDiameterRatio);

      let startValue = 0;
      for (let i = 0; i < pieData.length; i++) {
        const endValue = startValue + pieData[i].value;
        const isActive = this.activeIndex === i;
        const seriesItem = {
          name: pieData[i].name,
          type: "surface",
          parametric: true,
          wireframe: { show: false },
          pieData: pieData[i],
          pieStatus: { selected: isActive, hovered: false, k },
          itemStyle: { ...pieData[i].itemStyle },
          parametricEquation: this.getParametricEquation(
            startValue / 100,
            endValue / 100,
            isActive,
            false,
            k,
            pieData[i].value
          )
        };
        series.push(seriesItem);
        startValue = endValue;
      }

      // 底座
      series.unshift({
        name: "底座",
        type: "surface",
        parametric: true,
        wireframe: { show: false },
        itemStyle: { color: "rgba(25, 93, 176, 0.7)", opacity: 1 },
        parametricEquation: {
          u: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
          v: { min: 0, max: Math.PI, step: Math.PI / 20 },
          x: (u, v) => Math.cos(u) * (1 + (Math.cos(v) * 1) / 3),
          y: (u, v) => Math.sin(u) * (1 + (Math.cos(v) * 1) / 3),
          z: () => -0.1
        }
      });

      return series;
    },
    initOption() {
      const series = this.getPie3D(this.pieSeriesData);
      this.option = {
        tooltip: {
          formatter: (params) => {
            const data = this.dataList.find(
              (item) => item.name === params.seriesName
            );
            if (data && params.seriesName !== "底座") {
              return `${params.seriesName}<br/>
              <span style="display:inline-block;margin-right:5px;
              border-radius:50%;width:10px;height:10px;background-color:${params.color};"></span>
              ${data.val}`;
            }
            return "";
          }
        },
        animation: true,
        xAxis3D: { min: -1.5, max: 1.5 },
        yAxis3D: { min: -1.5, max: 1.5 },
        zAxis3D: { min: -1, max: 1 },
        grid3D: {
          show: false,
          boxHeight: 5,
          bottom: "50%",
          viewControl: {
            distance: 100,
            alpha: 25,
            beta: 60,
            rotateSensitivity: 0,
            zoomSensitivity: 0,
            panSensitivity: 0,
            autoRotate: false
          }
        },
        series
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
.chart {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.legend0 {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  overflow-y: auto;
}

.legend {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* padding-left: 10px; */
  padding: 10px;
  max-height: 100%;
  overflow-y: auto; /* 允许滚动但不会破坏布局 */
  scrollbar-width: thin; /* 火狐细滚动条 */
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #fff;
  cursor: pointer;
  transition: transform 0.2s;
}
.legend-item.active {
  transform: scale(1.05);
}
.legend-color {
  width: 13px;
  height: 13px;
  margin-right: 8px;
}
.legend-text {
  font-size: 13px;
}
</style>
