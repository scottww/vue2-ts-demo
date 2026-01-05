<template>
  <div style="padding: 20px; background: #061326; min-height: 100vh">
    <h2 style="color: #fff; margin-bottom: 20px">多色立体圆柱图 Demo</h2>

    <Multi3DBarChart
      :width="'100%'"
      :height="'200px'"
      :data="[7, 8, 12, 12, 12, 6, 6, 14, 14, 6]"
      :xAxisLabels="[
        '名称',
        '名称',
        '名称',
        '名称',
        '名称',
        '名称',
        '名称',
        '名称',
        '名称',
        '名称'
      ]"
      yAxisUnit="(千亩)"
      :yAxisMax="25"
      barColor="#33ccff"
      barGradientColor="rgba(51,204,255,0.1)"
      @barClick="handleBarClick"
    />

    <div style="margin-top: 20px; color: #fff">
      <p>选中柱子: {{ selectedLabel }}</p>
    </div>
  </div>
</template>

<script>
import Multi3DBarChart from "./Multi3DBarChart.vue";

export default {
  name: "Multi3DBarChartDemo",
  components: { Multi3DBarChart },
  data() {
    return {
      chartData: [
        { name: "常规", value: 175.17 },
        { name: "紧急", value: 148.35 },
        { name: "疑难", value: 95.36 }
      ],
      selectedLabel: ""
    };
  },
  methods: {
    // 点击柱子触发事件
    handleBarClick(data, index) {
      this.selectedLabel = data.name;
      console.log("点击柱子:", data, "索引:", index);
    }
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
