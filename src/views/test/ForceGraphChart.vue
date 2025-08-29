<template>
  <div class="water-level-chart-container">
    <div ref="chartRef" class="chart-box"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { forceGraphOption, forceGraphOption2 } from "./forceGraphOptions";
export default {
  name: "WaterLevelChart",
  data() {
    return {
      chartInstance: null,
      // 模拟水位数据
      waterLevelData: [
        { date: "07-10", realTime: 1.2, warning: 7.0, guarantee: 10.0 },
        { date: "07-11", realTime: 1.8, warning: 7.0, guarantee: 10.0 },
        { date: "07-12", realTime: 2.5, warning: 7.0, guarantee: 10.0 },
        { date: "07-13", realTime: 3.2, warning: 7.0, guarantee: 10.0 },
        { date: "07-14", realTime: 3.8, warning: 7.0, guarantee: 10.0 },
        { date: "07-15", realTime: 4.2, warning: 7.0, guarantee: 10.0 },
        { date: "07-16", realTime: 4.5, warning: 7.0, guarantee: 10.0 }
      ]
    };
  },
  computed: {
    // 提取X轴日期
    dates() {
      return this.waterLevelData.map((item) => item.date);
    }
  },
  methods: {
    // 初始化图表
    initChart() {
      if (this.$refs.chartRef && !this.chartInstance) {
        this.chartInstance = echarts.init(this.$refs.chartRef);

        // const option = { ...forceGraphOption };
        const option = { ...forceGraphOption2 };

        this.chartInstance.setOption(option);
      }
    },
    // 调整图表大小
    resizeChart() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
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
      this.chartInstance = null;
    }
  }
};
</script>

<style scoped>
.water-level-chart-container {
  width: 100%;
  height: 100%;
  /* height: 400px; */
  min-height: 400px;
  position: relative;
  overflow: hidden;
}

.chart-box {
  width: 100%;
  height: 100%;
}

/* 波浪背景效果 */
.water-level-chart-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    rgba(54, 207, 201, 0.1) 1px,
    transparent 1px
  );
  background-size: 20px 20px;
  z-index: -1;
  opacity: 0.5;
}
</style>