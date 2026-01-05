<template>
  <div style="padding: 20px; background: #061326; min-height: 100vh;">
    <h2 style="color:#fff; margin-bottom: 20px;">多色立体圆柱图 Demo</h2>

    <Multi3DBarChart
      :data="chartData"
      :width="'600px'"
      :height="'400px'"
      :title="'任务类型统计'"
      :barTopColor="['#02c3f1', '#53e568', '#a154e9']"
      :barBottomColor="['rgba(2,195,241,0.1)', 'rgba(83,229,104,0.1)', 'rgba(161,84,233,0.1)']"
      @barClick="handleBarClick"
    />

    <div style="margin-top:20px; color:#fff;">
      <p>选中柱子: {{ selectedLabel }}</p>
    </div>
  </div>
</template>

<script>
import Multi3DBarChart from './Multi3DBarChart.vue';

export default {
  name: 'Multi3DBarChartDemo',
  components: { Multi3DBarChart },
  data() {
    return {
      chartData: [
        { name: "常规", value: 175.17 },
        { name: "紧急", value: 148.35 },
        { name: "疑难", value: 95.36 }
      ],
      selectedLabel: ''
    };
  },
  methods: {
    // 点击柱子触发事件
    handleBarClick(data, index) {
      this.selectedLabel = data.name;
      console.log('点击柱子:', data, '索引:', index);
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
