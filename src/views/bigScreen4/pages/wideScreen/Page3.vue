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
import DataMonitoringPanel from "../../components/ProjectOperationManagement/DataMonitoringPanel.vue";
import InspectionMaintenancePanel from "../../components/ProjectOperationManagement/InspectionMaintenancePanel.vue";
import SafetyMonitoringPanel from "../../components/ProjectOperationManagement/SafetyMonitoringPanel.vue";
import SchedulingManagementPanel from "../../components/ProjectOperationManagement/SchedulingManagementPanel.vue";

// ✅ 子组件封装布局渲染逻辑
import ComponentLayout from "./ComponentLayout.vue";
export default {
  components: {
    PanelA,
    PanelB,
    PanelC,
    ComponentLayout,
    DataMonitoringPanel,
    InspectionMaintenancePanel,
    SafetyMonitoringPanel,
    SchedulingManagementPanel
  },
  data() {
    return {
      layoutModes: {
        left: "1x1",
        right: "1x1"
      },
      panels: [
        {
          col: "left",
          type: "DataMonitoringPanel",
          height: 940,
          title: "数据监测"
        },
        {
          col: "left",
          type: "InspectionMaintenancePanel",
          height: 940,
          title: "巡查养护情况"
        },
        {
          col: "right",
          type: "SafetyMonitoringPanel",
          height: 940,
          title: "安全监测"
        },
        {
          col: "right",
          type: "SchedulingManagementPanel",
          height: 940,
          title: "调度管理",
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
        DataMonitoringPanel: DataMonitoringPanel,
        InspectionMaintenancePanel: InspectionMaintenancePanel,
        SafetyMonitoringPanel: SafetyMonitoringPanel,
        SchedulingManagementPanel: SchedulingManagementPanel
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