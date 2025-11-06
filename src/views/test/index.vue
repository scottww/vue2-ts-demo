<template>
  <div class="test-demo">
    <div class="tab-group">
      <div
        v-for="item in tabs"
        :key="item.label"
        :class="['tab-btn', { active: tab === item.label }]"
        @click="tab = item.label"
      >
        {{ item.name }}
      </div>
    </div>

    <div class="main-content" :class="tab">
      <template v-if="tab === 'Selector'">
        <Selector
          v-model="forecastTime"
          :options="timeOptions"
          label="预报时间："
          @save="handleSave"
        >
          <template #extra>
            <button class="save-button" @click="handleSave(forecastTime)">
              保存方案
            </button>
          </template>
        </Selector>
      </template>
      <template v-else>
        <component :is="tab"></component>
      </template>
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
import Pie3D2 from "./Pie3D2.vue";
import Pie3D3 from "./Pie3D3.vue";
import Chart4 from "./Chart4.vue";
import WaterLevelChart from "./WaterLevelChart.vue";
import WaterRainChart from "./WaterRainChart.vue";
import TableDemo from "./TableDemo.vue";
import AlarmTotal from "./AlarmTotal.vue";
import IconTable from "./IconTable.vue";
import MonitoringIndicators from "./MonitoringIndicators.vue";
import MonitoringIndicators2 from "./MonitoringIndicators2.vue";
import MonitoringIndicators3 from "./MonitoringIndicators3.vue";
import MonitoringIndicators4 from "./MonitoringIndicators4.vue";
import CssDemo from "./CssDemo.vue";
import DispatchStatistics from "./DispatchStatistics.vue";
import WeatherChart from "./WeatherChart.vue";
import HourlyWeatherChart from "./HourlyWeatherChart.vue";
// echarts
import ForceGraphChart from "./ForceGraphChart.vue";
import PieChart from "./PieChart.vue";
import PieChart2 from "./PieChart2.vue";
import RainChart from "./RainChart.vue";
import HourlyRainChart from "./HourlyRainChart.vue";
import KnowledgeGraphChart from "./KnowledgeGraphChart.vue";
import ImagePreviewer from "./ImagePreviewer.vue";
import ScheduleTable from "./ScheduleTable.vue";
import MultiplicationTable from "./MultiplicationTable.vue";
import MathFormulaTable from "./MathFormulaTable.vue";
import Selector from "./Selector.vue";
import MyButton from "./MyButton.vue";
import ImageZoom from "./ImageZoom.vue";
import IconButtonGroupDemo from './IconButtonGroupDemo.vue';
import InspectionTotal from './InspectionTotal.vue';

import CustomTable from "./CustomTable.vue";

export default {
  components: {
    RiskHazardComponentVue,
    Risk2,
    Risk3,
    GateRealTime,
    GateRealTime2,
    EquipmentDetail,
    Pie3D,
    Pie3D2,
    Pie3D3,
    Chart4,
    WaterLevelChart,
    WaterRainChart,
    TableDemo,
    AlarmTotal,
    IconTable,
    MonitoringIndicators,
    MonitoringIndicators2,
    MonitoringIndicators3,
    MonitoringIndicators4,
    CssDemo,
    DispatchStatistics,
    WeatherChart,
    HourlyWeatherChart,
    ForceGraphChart,
    PieChart,
    PieChart2,
    RainChart,
    HourlyRainChart,
    KnowledgeGraphChart,
    CustomTable,
    ImagePreviewer,
    ScheduleTable,
    MultiplicationTable,
    MathFormulaTable,
    Selector,
    MyButton,
    ImageZoom,
    IconButtonGroupDemo,
    InspectionTotal
  },
  data() {
    return {
      tab: "RiskHazardComponentVue",
      tabs: [
        { label: "RiskHazardComponentVue", name: "测试1" },
        { label: "Risk2", name: "测试2" },
        { label: "Risk3", name: "测试3" },
        { label: "GateRealTime", name: "测试4" },
        { label: "GateRealTime2", name: "panel2" },
        { label: "EquipmentDetail", name: "设备详情" },
        { label: "Pie3D", name: "3D饼图" },
        { label: "Pie3D2", name: "3D饼图2" },
        { label: "Pie3D3", name: "3D饼图3" },
        { label: "Chart4", name: "雨量" },
        { label: "WaterLevelChart", name: "水位Chart" },
        { label: "WaterRainChart", name: "水位雨量Chart" },
        { label: "TableDemo", name: "表格" },
        { label: "AlarmTotal", name: "报警总数" },
        { label: "IconTable", name: "IconTable" },
        { label: "MonitoringIndicators", name: "MonitoringIndicators" },
        { label: "MonitoringIndicators2", name: "MonitoringIndicators2" },
        { label: "MonitoringIndicators3", name: "MonitoringIndicators3" },
        { label: "MonitoringIndicators4", name: "MonitoringIndicators4 虚拟滚动" },
        { label: "CssDemo", name: "CssDemo" },
        { label: "DispatchStatistics", name: "DispatchStatistics" },
        { label: "WeatherChart", name: "WeatherChart" },
        { label: "HourlyWeatherChart", name: "HourlyWeatherChart带箭头" },
        { label: "ForceGraphChart", name: "ForceGraphChart" },
        { label: "KnowledgeGraphChart", name: "知识图谱" },
        { label: "PieChart", name: "PieChart" },
        { label: "PieChart2", name: "PieChart2" },
        { label: "RainChart", name: "RainChart" },
        { label: "HourlyRainChart", name: "HourlyRainChart带箭头" },
        { label: "CustomTable", name: "CustomTable" },
        { label: "ImagePreviewer", name: "ImagePreviewer" },
        { label: "ScheduleTable", name: "ScheduleTable" },
        { label: "MultiplicationTable", name: "MultiplicationTable" },
        { label: "MathFormulaTable", name: "MathFormulaTable" },
        { label: "Selector", name: "Selector", custom: true },
        {label: "MyButton", name: "MyButton" },
        {label: "ImageZoom", name: "ImageZoom" },
        {label: "IconButtonGroupDemo", name: "IconButtonGroupDemo" },
        {label: "InspectionTotal", name: "InspectionTotal" },
      ],
      forecastTime: "12h",
      timeOptions: [
        { value: "6h", text: "未来6小时" },
        { value: "12h", text: "未来12小时" },
        { value: "24h", text: "未来24小时" },
        { value: "36h", text: "未来36小时" }
      ]
    };
  },
  methods: {
    tabClick(tab) {
      console.log(tab);
    },
    handleSave(val) {
      console.log("保存方案：", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.main-content {
  position: absolute;
  width: 670px;
  /* height: 940px; */
  background-color: #0a1e3c;
  background-image: radial-gradient(circle at center, #143a7c, #0a1e3c);
}

.tab-group {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 20px;
}

.tab-btn {
  padding: 6px 18px;
  border-radius: 4px;
  border: 1px solid #3a4a6a;
  background: #0a1e3c;
  color: #cdd6f4;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  text-align: center;

  &:hover {
    background: #1a2b4a;
    color: #fff;
    border-color: #4e91ff;
    box-shadow: 0 2px 6px rgba(64, 158, 255, 0.3);
  }

  &.active {
    background: linear-gradient(135deg, #4e91ff, #6bb8ff);
    color: #fff;
    border: 1px solid #4e91ff;
    box-shadow: 0 2px 6px rgba(64, 158, 255, 0.5);
  }
}

.main-content.Pie3D {
  position: absolute;
  width: 670px;
  background-color: transparent;
  background-image: none;
}

.main-content.Pie3D3 {
  position: absolute;
  width: 800px;
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

.main-content.MonitoringIndicators4 {
  width: auto;
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

.main-content.PieChart {
  width: 400px;
  height: 400px;
}

.main-content.ForceGraphChart {
  width: 1280px;
  height: 800px;
  background: none;
}

.main-content.CustomTable {
  width: auto;
  background: none;
}

.main-content.ImagePreviewer {
  width: 800px;
  height: 800px;
  background: none;
}

.main-content.ScheduleTable {
  width: auto;
  height: 800px;
  background: none;
  position: relative;
}

.main-content.MultiplicationTable {
  // width: auto;
  // height: 800px;
  // background: none;
  // position: relative;
}

.main-content.MathFormulaTable {
  width: 600px;
  height: 800px;
  background: none;
  position: relative;
}

.main-content.Selector {
  background: none;
  padding: 20px;
}

.main-content.IconButtonGroupDemo {
  background: none;
  height: 800px;
  padding: 20px;
}
</style>
