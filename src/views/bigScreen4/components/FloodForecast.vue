<template>
  <div class="panel">
    <div class="panel-header">
      <span>{{ title }}</span>
      <span class="panel-year">{{ year }}年</span>
    </div>
    <div class="panel-body">
      <div ref="chart" style="width:100%;height:200px;"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "HongShuiYuBao",
  props: {
    title: { type: String, default: "洪水预报" },
    year: { type: Number, default: new Date().getFullYear() }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chart = echarts.init(this.$refs.chart);
      chart.setOption({
        tooltip: { trigger: "axis" },
        legend: {
          data: ["降雨量", "流量"],
          textStyle: { color: "#fff" }
        },
        xAxis: {
          type: "category",
          data: ["12:00", "13:00", "14:00", "15:00", "16:00"],
          axisLine: { lineStyle: { color: "#66ccff" } }
        },
        yAxis: [
          {
            type: "value",
            name: "降雨量(mm)",
            axisLine: { lineStyle: { color: "#66ccff" } }
          },
          {
            type: "value",
            name: "流量(m³/s)",
            axisLine: { lineStyle: { color: "#66ccff" } }
          }
        ],
        series: [
          {
            name: "降雨量",
            type: "bar",
            data: [0.8, 0.6, 1.2, 1.5, 0.7],
            yAxisIndex: 0,
            itemStyle: { color: "#33ccff" }
          },
          {
            name: "流量",
            type: "line",
            data: [1.2, 1.5, 2.0, 1.8, 1.4],
            yAxisIndex: 1,
            itemStyle: { color: "#ffcc00" }
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