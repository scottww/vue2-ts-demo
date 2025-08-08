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
  name: "FloodControlDispatch",
  props: {
    title: { type: String, default: "防汛调度" },
    year: { type: Number, default: new Date().getFullYear() }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chart = echarts.init(this.$refs.chart);
      chart.setOption({
        series: [
          {
            type: "gauge",
            detail: { formatter: "{value}" },
            data: [{ value: 56, name: "调度次数" }],
            axisLine: {
              lineStyle: { width: 10, color: [[0.3, "#33ccff"], [1, "#3399ff"]] }
            }
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