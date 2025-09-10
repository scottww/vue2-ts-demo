<template>
  <div class="test-demo">
    <!-- 左侧菜单导航 -->
    <div class="sidebar">
      <el-menu
        :default-active="tab"
        class="nav-menu"
        background-color="#102a54"
        text-color="#fff"
        active-text-color="#4fc3f7"
        @select="handleMenuSelect"
      >
        <el-menu-item index="RiskHazardComponentVue">
          <i class="el-icon-warning-outline"></i>
          <span>测试1</span>
        </el-menu-item>
        <el-menu-item index="Risk2">
          <i class="el-icon-document"></i>
          <span>测试2</span>
        </el-menu-item>
        <el-menu-item index="Risk3">
          <i class="el-icon-s-operation"></i>
          <span>测试3</span>
        </el-menu-item>
        <el-menu-item index="GateRealTime">
          <i class="el-icon-timer"></i>
          <span>测试4</span>
        </el-menu-item>
        <el-menu-item index="GateRealTime2">
          <i class="el-icon-date"></i>
          <span>测试5</span>
        </el-menu-item>
        <el-menu-item index="EquipmentDetail">
          <i class="el-icon-cpu"></i>
          <span>测试6</span>
        </el-menu-item>
        <el-menu-item index="Pie3D">
          <i class="el-icon-pie-chart"></i>
          <span>测试7</span>
        </el-menu-item>
        <el-menu-item index="Chart4">
          <i class="el-icon-cloudy"></i>
          <span>雨量</span>
        </el-menu-item>
        <el-menu-item index="WaterLevelChart">
          <i class="el-icon-water-cup"></i>
          <span>水位Chart</span>
        </el-menu-item>
        <el-menu-item index="TableDemo">
          <i class="el-icon-menu"></i>
          <span>表格</span>
        </el-menu-item>
        <el-menu-item index="AlarmTotal">
          <i class="el-icon-bell"></i>
          <span>报警总数</span>
        </el-menu-item>
        <el-menu-item index="IconTable">
          <i class="el-icon-star-on"></i>
          <span>IconTable</span>
        </el-menu-item>
        <el-menu-item index="MonitoringIndicators">
          <i class="el-icon-data-line"></i>
          <span>MonitoringIndicators</span>
        </el-menu-item>
        <el-menu-item index="MonitoringIndicators2">
          <i class="el-icon-data-analysis"></i>
          <span>MonitoringIndicators2</span>
        </el-menu-item>
        <el-menu-item index="CssDemo">
          <i class="el-icon-brush"></i>
          <span>CssDemo</span>
        </el-menu-item>
        <el-menu-item index="DispatchStatistics">
          <i class="el-icon-s-data"></i>
          <span>DispatchStatistics</span>
        </el-menu-item>
        <el-menu-item index="WeatherChart">
          <i class="el-icon-sunny"></i>
          <span>WeatherChart</span>
        </el-menu-item>
        <el-menu-item index="HourlyWeatherChart">
          <i class="el-icon-sunrise"></i>
          <span>HourlyWeatherChart</span>
        </el-menu-item>
        <el-menu-item index="ForceGraphChart">
          <i class="el-icon-share"></i>
          <span>ForceGraphChart</span>
        </el-menu-item>
        <el-menu-item index="PieChart">
          <i class="el-icon-s-marketing"></i>
          <span>PieChart</span>
        </el-menu-item>
        <el-menu-item index="RainChart">
          <i class="el-icon-umbrella"></i>
          <span>RainChart</span>
        </el-menu-item>
        <el-menu-item index="HourlyRainChart">
          <i class="el-icon-light-rain"></i>
          <span>HourlyRainChart</span>
        </el-menu-item>
        <el-menu-item index="KnowledgeGraphChart">
          <i class="el-icon-collection"></i>
          <span>知识图谱</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 右侧内容区 -->
    <div class="main-content" :class="tab">
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
      tab: "RiskHazardComponentVue"
    };
  },
  methods: {
    handleMenuSelect(key) {
      this.tab = key;
    }
  }
};
</script>

<style scoped>
.test-demo {
  display: flex;
  height: 100%;
  background: #0a1e3c;
  color: #fff;
}

/* 左侧菜单 */
.sidebar {
  width: 220px;
  background: #102a54;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
}

.nav-menu {
  border-right: none;
}

/* 右侧内容区 */
.main-content {
  flex: 1;
  margin: 16px;
  padding: 16px;
  border-radius: 12px;
  background: rgba(20, 58, 124, 0.85);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
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
