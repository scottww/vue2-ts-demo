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
    CssDemo
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
.main-content {
  position: absolute;
  width: 670px;
  /* height: 940px; */
  background-color: #0a1e3c;
  background-image: radial-gradient(circle at center, #143a7c, #0a1e3c);
}

.main-content.Pie3D {
  position: absolute;
  width: 670px;
  background-color: transparent;
  background-image: none;
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
</style>