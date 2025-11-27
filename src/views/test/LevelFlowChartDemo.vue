<template>
  <div class="your-container">
    <LevelFlowChart 
      :chartData="customData" 
    />
  </div>
</template>

<script>
import LevelFlowChart from './LevelFlowChart.vue';

export default {
  components: { LevelFlowChart },
  data() {
    return {
      customData: {
        // 自定义以下数据
        timeData: [],
        actualLevel: [],
        forecastLevel: [],
        actualFlow: [],
        forecastFlow: [],
        warningLevel: 2.0,
        currentTimeIndex: 3
      }
    }
  }
}
</script>

<style>
.your-container {
  width: 100%;
  height: 400px;
}
</style>