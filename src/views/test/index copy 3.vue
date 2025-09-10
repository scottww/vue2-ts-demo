<template>
  <div class="test-demo">
    <!-- 左侧导航 -->
    <div class="sidebar">
      <ul class="nav-list">
        <li
          v-for="item in menu"
          :key="item.key"
          :class="{ active: tab === item.key }"
          @click="tab = item.key"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </li>
      </ul>
    </div>

    <!-- 右侧内容区 -->
    <div class="main-content">
      <transition name="fade" mode="out-in">
        <component :is="tab" />
      </transition>
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
      tab: "RiskHazardComponentVue",
      menu: [
        {
          key: "RiskHazardComponentVue",
          label: "测试1",
          icon: "el-icon-warning-outline"
        },
        { key: "Risk2", label: "测试2", icon: "el-icon-document" },
        { key: "Risk3", label: "测试3", icon: "el-icon-s-operation" },
        { key: "GateRealTime", label: "测试4", icon: "el-icon-timer" },
        { key: "GateRealTime2", label: "测试5", icon: "el-icon-date" },
        { key: "EquipmentDetail", label: "测试6", icon: "el-icon-cpu" },
        { key: "Pie3D", label: "测试7", icon: "el-icon-pie-chart" },
        { key: "Chart4", label: "雨量", icon: "el-icon-cloudy" },
        { key: "WaterLevelChart", label: "水位", icon: "el-icon-water-cup" },
        { key: "TableDemo", label: "表格", icon: "el-icon-menu" },
        { key: "AlarmTotal", label: "报警", icon: "el-icon-bell" },
        { key: "IconTable", label: "图标表", icon: "el-icon-star-on" },
        {
          key: "MonitoringIndicators",
          label: "指标1",
          icon: "el-icon-data-line"
        },
        {
          key: "MonitoringIndicators2",
          label: "指标2",
          icon: "el-icon-data-analysis"
        },
        { key: "CssDemo", label: "样式", icon: "el-icon-brush" },
        { key: "DispatchStatistics", label: "调度", icon: "el-icon-s-data" },
        { key: "WeatherChart", label: "天气", icon: "el-icon-sunny" },
        { key: "HourlyWeatherChart", label: "逐时天", icon: "el-icon-sunrise" },
        { key: "ForceGraphChart", label: "关系图", icon: "el-icon-share" },
        { key: "PieChart", label: "饼图", icon: "el-icon-s-marketing" },
        { key: "RainChart", label: "降雨", icon: "el-icon-umbrella" },
        { key: "HourlyRainChart", label: "逐时雨", icon: "el-icon-light-rain" },
        {
          key: "KnowledgeGraphChart",
          label: "知识图谱",
          icon: "el-icon-collection"
        }
      ]
    };
  }
};
</script>

<style scoped>
.test-demo {
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #0a1e3c, #143a7c);
  color: #fff;
  overflow: hidden;
}

/* 左侧导航 */
.sidebar {
  width: 80px;
  background: rgba(16, 42, 84, 0.7);
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.5);
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.nav-list li {
  cursor: pointer;
  text-align: center;
  padding: 16px 0;
  transition: all 0.3s ease;
  color: #aaa;
  font-size: 12px;
}

.nav-list li i {
  font-size: 20px;
  display: block;
  margin-bottom: 6px;
}

.nav-list li:hover,
.nav-list li.active {
  color: #4fc3f7;
  background: rgba(79, 195, 247, 0.15);
  box-shadow: inset 4px 0 0 #4fc3f7;
}

/* 右侧内容 */
.main-content {
  flex: 1;
  margin: 20px;
  padding: 20px;
  border-radius: 16px;
  background: rgba(20, 58, 124, 0.8);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  overflow: auto;
  transition: all 0.3s ease;
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
