<template>
  <div class="test-demo">
    <el-radio-group
      v-model="tab"
      @tab-click="tabClick"
      style="margin-bottom: 30px"
    >
      <el-radio-button label="RiskHazardComponentVue">测试1</el-radio-button>
      <el-radio-button label="Risk2">测试2</el-radio-button>
      <el-radio-button label="Risk3">测试3</el-radio-button>
      <el-radio-button label="GateRealTime">测试4</el-radio-button>
      <el-radio-button label="GateRealTime2">测试5</el-radio-button>
      <el-radio-button label="EquipmentDetail">测试6</el-radio-button>
      <el-radio-button label="Pie3D">测试7</el-radio-button>
      <el-radio-button label="Chart4">雨量</el-radio-button>
      <el-radio-button label="WaterLevelChart">水位Chart</el-radio-button>
      <el-radio-button label="TableDemo">表格</el-radio-button>
      <el-radio-button label="AlarmTotal">报警总数</el-radio-button>
      <el-radio-button label="IconTable">IconTable</el-radio-button>
      <el-radio-button label="MonitoringIndicators"
        >MonitoringIndicators</el-radio-button
      >
      <el-radio-button label="MonitoringIndicators2"
        >MonitoringIndicators2</el-radio-button
      >
      <el-radio-button label="CssDemo">CssDemo</el-radio-button>
      <!-- <el-radio-button label="ForceGraph">ForceGraph</el-radio-button> -->

      <el-radio-button label="DispatchStatistics"
        >DispatchStatistics</el-radio-button
      >

      <el-radio-button label="WeatherChart">WeatherChart</el-radio-button>
      <el-radio-button label="HourlyWeatherChart"
        >HourlyWeatherChart带箭头</el-radio-button
      >

      <el-radio-button label="ForceGraphChart">ForceGraphChart</el-radio-button>
      <el-radio-button label="PieChart">PieChart</el-radio-button>
      <el-radio-button label="RainChart">RainChart</el-radio-button>
      <el-radio-button label="HourlyRainChart"
        >HourlyRainChart带箭头</el-radio-button
      >

      <el-radio-button label="KnowledgeGraphChart">知识图谱</el-radio-button>
    </el-radio-group>
    <div class="main-content" :class="tab">
      <component :is="tab"></component>
    </div>
  </div>
</template>

<script>
import RiskHazardComponentVue from "./RiskHazardComponent.vue";
import Risk2 from "./Risk2.vue";
import Risk3 from "./Risk3.vue";
import GateRealTime from "./GateRealTime.vue";
import GateRealTime2 from "./GateRealTime2.vue";
import EquipmentDetail from "./EquipmentDetail.vue";
import Pie3D from "./Pie3D.vue";
import Chart4 from "./Chart4.vue";
import WaterLevelChart from "./WaterLevelChart.vue";
import TableDemo from "./TableDemo.vue";
import AlarmTotal from "./AlarmTotal.vue";
import IconTable from "./IconTable.vue";
import MonitoringIndicators from "./MonitoringIndicators.vue";
import MonitoringIndicators2 from "./MonitoringIndicators2.vue";
import CssDemo from "./CssDemo.vue";
import DispatchStatistics from "./DispatchStatistics.vue";
import WeatherChart from "./WeatherChart.vue";
import HourlyWeatherChart from "./HourlyWeatherChart.vue";
// echarts
import ForceGraphChart from "./ForceGraphChart.vue";
import PieChart from "./PieChart.vue";
import RainChart from "./RainChart.vue";
import HourlyRainChart from "./HourlyRainChart.vue";
import KnowledgeGraphChart from "./KnowledgeGraphChart.vue";
export default {
  components: {
    RiskHazardComponentVue,
    Risk2,
    Risk3,
    GateRealTime,
    GateRealTime2,
    EquipmentDetail,
    Pie3D,
    Chart4,
    WaterLevelChart,
    TableDemo,
    AlarmTotal,
    IconTable,
    MonitoringIndicators,
    MonitoringIndicators2,
    CssDemo,
    DispatchStatistics,
    WeatherChart,
    HourlyWeatherChart,
    ForceGraphChart,
    PieChart,
    RainChart,
    HourlyRainChart,
    KnowledgeGraphChart
  },
  data() {
    return {
      tab: "RiskHazardComponentVue"
    };
  },
  methods: {
    tabClick(tab) {
      console.log(tab);
    }
  }
};
</script>

<style scoped>
.el-radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
  justify-content: center;
}

.el-radio-button {
  --btn-bg: rgba(20, 50, 90, 0.6);
  --btn-border: rgba(0, 200, 255, 0.5);
  --btn-active-bg: linear-gradient(135deg, #00c6ff, #0072ff);
  --btn-active-shadow: 0 0 12px rgba(0, 200, 255, 0.7);

  border-radius: 8px !important;
  background: var(--btn-bg) !important;
  border: 1px solid var(--btn-border) !important;
  color: #9cd2ff !important;
  transition: all 0.3s;
}

.el-radio-button:hover {
  box-shadow: 0 0 8px rgba(0, 200, 255, 0.6);
}

.el-radio-button.is-active {
  background: var(--btn-active-bg) !important;
  color: #fff !important;
  box-shadow: var(--btn-active-shadow);
}

/* 内容区：统一风格 */
.main-content0 {
  position: relative;
  padding: 16px;
  border-radius: 16px;
  background: rgba(10, 30, 60, 0.85);
  box-shadow: inset 0 0 30px rgba(0, 180, 255, 0.3), 0 0 20px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  transition: all 0.4s ease;
  animation: fadeInScale 0.4s ease;
}

.main-content {
  position: absolute;
  width: 670px;
  /* height: 940px; */
  background-color: #0a1e3c;
  background-image: radial-gradient(circle at center, #143a7c, #0a1e3c);
  padding: 16px;
  border-radius: 16px;
  /* background: rgba(10, 30, 60, 0.85); */
  box-shadow: inset 0 0 30px rgba(0, 180, 255, 0.3), 0 0 20px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  transition: all 0.4s ease;
  /* animation: fadeInScale 0.4s ease; */
}

/* 切换动效 */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.main-content.Pie3D {
  position: absolute;
  width: 670px;
  background-color: transparent;
  background-image: none;
}

.main-content.AlarmTotal {
  width: auto;
}

.main-content.IconTable {
  width: auto;
}

.main-content.MonitoringIndicators {
  /* width: auto; */
}

.main-content.MonitoringIndicators2 {
  /* width: auto; */
  width: 800px;
}

.main-content.CssDemo {
  width: auto;
}

.main-content.DispatchStatistics {
  height: 240px;
}

.main-content.WeatherChart {
  /* width: 800px; */
}

.main-content.HourlyWeatherChart {
  /* width: 1280px; */
  height: 500px;
  background: none;
}

.main-content.PieChart {
  width: 400px;
  height: 400px;
}

.main-content.ForceGraphChart {
  width: 1280px;
  height: 800px;
  background: none;
}
</style>
