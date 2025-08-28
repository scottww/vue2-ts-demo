<template>
  <div class="page-layout">
    <!-- Left Panel -->
    <div class="left-panel">
      <component-layout
        :layout="layoutModes.left"
        :panels="leftPanelList"
        :getComponent="getPanelComponent"
        @site-change="handleSiteChange"
      />
    </div>

    <!-- Right Panel -->
    <div class="right-panel">
      <component-layout
        :layout="layoutModes.right"
        :panels="rightPanelList"
        :getComponent="getPanelComponent"
        @site-change="handleSiteChange"
      />
    </div>
  </div>
</template>

<script>
import PanelA from "../../components/temp.vue";
import PanelB from "../../components/temp.vue";
import PanelC from "../../components/temp.vue";
import EmergencySupport from "../../components/EmergencySupport.vue";
import FloodForecast from "../../components/FloodForecast.vue";
import FloodControlDispatch from "../../components/FloodControlDispatch.vue";
import RiskHazard from "../../components/RiskHazard.vue";
import ProjectSituation from "../../components/ProjectSituation.vue";
import WaterRainInformation from "../../components/WaterRainInformation.vue";
import WeatherForecast from "../../components/WeatherForecast.vue";

import IntelligentDispatchPanel from "../../components/DispatchManagement/IntelligentDispatchPanel.vue";
import OperationPlanPanel from "../../components/DispatchManagement/OperationPlanPanel.vue";
import SchedulingManagementPanel2 from "../../components/DispatchManagement/ScheduleManagementPanel.vue";
import AlarmFaultManagementPanel from "../../components/DispatchManagement/AlarmFaultManagementPanel.vue";
import EmergencyCommandDispatchPanel from "../../components/DispatchManagement/EmergencyCommandDispatchPanel.vue";
import RemoteMonitoringControlSimulationPanel from "../../components/DispatchManagement/RemoteMonitoringControlSimulationPanel.vue";

// ✅ 子组件封装布局渲染逻辑
import ComponentLayout from "./ComponentLayout.vue";

export default {
  components: {
    PanelA,
    PanelB,
    PanelC,
    ComponentLayout,
    EmergencySupport,
    FloodForecast,
    FloodControlDispatch,
    RiskHazard,
    ProjectSituation,
    WaterRainInformation,
    WeatherForecast,
    IntelligentDispatchPanel,
    OperationPlanPanel,
    SchedulingManagementPanel2,
    AlarmFaultManagementPanel,
    EmergencyCommandDispatchPanel,
    RemoteMonitoringControlSimulationPanel
  },
  data() {
    return {
      layoutModes: {
        left: "1big-2small",
        right: "2small-1big"
      },
      panels: [
        {
          col: "left",
          type: "IntelligentDispatchPanel",
          title: "智能调度",
          api: "/api/project/situation", // 后端接口
          height: 940,
          headerExtra: {
            type: "customSelect",
            placeholder: "请选择年份",
            modelValue: "2025-08", // 默认值
            options: [
              { label: "2025-08", value: "2025-08" },
              { label: "2025-07", value: "2024-07" }
            ],
            onChange: (val) => console.log("下拉选择", val)
          }
        },
        {
          col: "left",
          type: "OperationPlanPanel",
          title: "运行计划",
          height: 431.1,
          headerExtra: {
            type: "customSelect",
            placeholder: "请选择年份",
            modelValue: "2025", // 默认值
            options: [
              { label: "2025年", value: "2025" },
              { label: "2024年", value: "2024" },
              { label: "2023年", value: "2023" }
            ],
            onChange: (val) => console.log("下拉选择", val)
          }
        },
        {
          col: "left",
          type: "SchedulingManagementPanel2",
          title: "排程管理",
          height: 431.1,
          headerExtra: {
            type: "customSelect",
            placeholder: "请选择",
            modelValue: "2025-08-22", // 默认值
            options: [
              { label: "2025-08-22", value: "2025-08-22" },
              { label: "2025-08-21", value: "2025-08-21" }
            ],
            onChange: (val) => console.log("下拉选择", val)
          }
        },

        {
          col: "right",
          type: "AlarmFaultManagementPanel",
          title: "报警与故障管理",
          height: 431.1,
          headerExtra: {
            type: "customSelect",
            placeholder: "请选择",
            modelValue: "2025-08", // 默认值
            options: [
              { label: "2025-08", value: "2025-08" },
              { label: "2025-07", value: "2025-07" }
            ],
            onChange: (val) => console.log("下拉选择", val)
          }
        },
        {
          col: "right",
          type: "EmergencyCommandDispatchPanel",
          title: "应急指挥调度",
          height: 431.1
        },
        {
          col: "right",
          type: "RemoteMonitoringControlSimulationPanel",
          title: "远程监控及控制模拟",
          height: 940
        }
      ]
    };
  },
  computed: {
    leftPanelList() {
      return this.panels.filter((p) => p.col === "left");
    },
    rightPanelList() {
      return this.panels.filter((p) => p.col === "right");
    }
  },
  methods: {
    // getComponent(type) {
    //   const map = {
    //     a: "PanelA",
    //     b: "PanelB",
    //     c: "PanelC"
    //   };
    //   return map[type] || "PanelA";
    // },
    getPanelComponent(type) {
      const map = {
        a: PanelA,
        b: PanelB,
        c: PanelC,
        EmergencySupport: EmergencySupport,
        FloodForecast: FloodForecast,
        FloodControlDispatch: FloodControlDispatch,
        RiskHazard: RiskHazard,
        ProjectSituation: ProjectSituation,
        WaterRainInformation: WaterRainInformation,
        WeatherForecast: WeatherForecast,
        IntelligentDispatchPanel,
        OperationPlanPanel,
        SchedulingManagementPanel2,
        AlarmFaultManagementPanel,
        EmergencyCommandDispatchPanel,
        RemoteMonitoringControlSimulationPanel
      };
      return map[type] || PanelA;
    },
    handleSiteChange(newSite) {
      console.log("父组件收到选中站点：", newSite);
    }
  }
};
</script>
<style scoped>
.page-layout {
  position: absolute;
  top: 120px;
  left: 0;
  width: 100%;
  height: calc(100% - 120px);
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  z-index: 9;
}

.left-panel,
.right-panel {
  /* width: 651px; */
  width: 1320px;
  /* width: 1920px; */
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>