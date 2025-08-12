<template>
  <div class="panel">
    <div class="panel-header">
      <span>{{ title }}</span>
      <span class="panel-year">{{ year }}年</span>
    </div>
    <div class="panel-body">
      <div ref="chart" style="width: 100%; height: 200px"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "EmergencySupport",
  props: {
    title: { type: String, default: "抢险支撑" },
    year: { type: Number, default: new Date().getFullYear() },
    data: { type: Object, default: () => ({}) }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chart = echarts.init(this.$refs.chart);
      chart.setOption({
        tooltip: {},
        xAxis: {
          type: "category",
          data: ["1月", "2月", "3月", "4月", "5月"],
          axisLine: { lineStyle: { color: "#66ccff" } }
        },
        yAxis: {
          type: "value",
          axisLine: { lineStyle: { color: "#66ccff" } }
        },
        series: [
          {
            type: "bar",
            data: [5, 8, 6, 10, 7],
            itemStyle: { color: "#3399ff" }
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
.panel {
  background: rgba(0, 76, 153, 0.2);
  border: 1px solid rgba(0, 153, 255, 0.3);
  border-radius: 6px;
  padding: 12px;
  color: #fff;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
}

.panel-year {
  font-size: 14px;
  color: #66ccff;
}

.panel-body {
  height: calc(100% - 40px);

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>