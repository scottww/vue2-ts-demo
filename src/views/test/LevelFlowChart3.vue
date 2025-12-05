<template>
  <div class="level-flow-chart-container">
    <!-- 小图表 -->
    <div class="chart-container" ref="chartRef"></div>

    <!-- 放大按钮 -->
    <div class="zoom-btn" @click="handleBtnClick">🔍 放大</div>

    <!-- 弹窗组件 -->
    <!-- <BaseDialog v-model="showDialog" /> -->
    <BigChartDialog
      ref="bigChartDialogRef"
      :chart-option="chartOption"
      v-model="showDialog"
    />
  </div>
</template>

<script>
import * as echarts from "echarts";
import TimeSeriesGenerator from "@/utils/timeSeriesGenerator.js";
import BigChartDialog from "./BigChartDialog.vue";
import BaseDialog from "./BaseDialog.vue";

export default {
  name: "LevelFlowChart",
  components: { BigChartDialog, BaseDialog },
  props: {
    chartData: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      chart: null,
      showDialog: false,
      chartOption: {}
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    if (this.chart) this.chart.dispose();
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chartRef);
      const generator = new TimeSeriesGenerator({
        pastHours: 3,
        futureHours: 12
      });
      const defaultData = generator.generate();
      const data = { ...defaultData, ...this.chartData };
      this.chartOption = this.getChartOption(data);
      this.chart.setOption(this.chartOption);
    },
    getChartOption(data) {
      return {
        backgroundColor: "#003366",
        legend: {
          data: ["实时水位", "预报水位", "实时流量", "预报流量", "警戒水位"],
          top: "5%",
          textStyle: { color: "#fff" }
        },
        tooltip: { trigger: "axis" },
        grid: {
          left: "5%",
          right: "5%",
          top: "25%",
          bottom: "5%",
          containLabel: true
        },
        xAxis: { type: "category", data: data.timeData },
        yAxis: [
          { type: "value", name: "水位(m)" },
          { type: "value", name: "流量(m³/s)", position: "right" }
        ],
        series: [
          { name: "实时水位", type: "line", data: data.actualLevel },
          { name: "预报水位", type: "line", data: data.forecastLevel },
          {
            name: "实时流量",
            type: "line",
            yAxisIndex: 1,
            data: data.actualFlow,
            smooth: true
          },
          {
            name: "预报流量",
            type: "line",
            yAxisIndex: 1,
            data: data.forecastFlow,
            smooth: true
          },
          {
            name: "警戒水位",
            type: "line",
            data: data.timeData.map(() => data.warningLevel),
            smooth: true
          },
          {
            name: "当前时间",
            type: "line",
            data: [],
            markLine: {
              data: [
                {
                  xAxis: data.timeData[data.currentTimeIndex],
                  name: "当前时间"
                }
              ],
              silent: true
            }
          }
        ]
      };
    },
    handleResize() {
      if (this.chart) this.chart.resize();
    },
    handleBtnClick() {
      this.showDialog = true;
      // 弹窗已经挂载了，直接调用方法
      this.$nextTick(() => {
        // this.$refs.bigChartDialogRef.initChart();
      });
    }
  }
};
</script>

<style scoped>
.level-flow-chart-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.chart-container {
  width: 100%;
  height: 100%;
}

.zoom-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
