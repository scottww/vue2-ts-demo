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
  name: "RiskHazard",
  props: {
    title: { type: String, default: "风险隐患" },
    year: { type: Number, default: new Date().getFullYear() }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chart = echarts.init(this.$refs.chart);
      chart.setOption({
        tooltip: {},
        radar: {
          indicator: [
            { name: "堤防缺陷", max: 30 },
            { name: "排涝设施", max: 30 },
            { name: "工程险情", max: 30 },
            { name: "堤防缺口", max: 30 },
            { name: "其他缺陷", max: 30 }
          ],
          axisName: { color: "#fff" }
        },
        series: [
          {
            type: "radar",
            data: [
              {
                value: [6, 17, 5, 6, 29],
                name: "隐患指数",
                areaStyle: { color: "rgba(51,153,255,0.4)" },
                lineStyle: { color: "#3399ff" }
              }
            ]
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