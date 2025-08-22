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
import PanelA from "../../components/PanelA.vue";
import PanelB from "../../components/PanelB.vue";
import PanelC from "../../components/PanelC.vue";
import AlarmStatisticPanel from "../../components/AlarmManagement/AlarmStatisticPanel.vue";
import AlarmDetailPanel from "../../components/AlarmManagement/AlarmDetailPanel.vue";
import AlarmVideoLinkPanel from "../../components/AlarmManagement/AlarmVideoLinkPanel.vue";

// ✅ 子组件封装布局渲染逻辑
import ComponentLayout from "./ComponentLayout.vue";
export default {
  components: {
    PanelA,
    PanelB,
    PanelC,
    ComponentLayout,
    AlarmStatisticPanel,
    AlarmDetailPanel,
    AlarmVideoLinkPanel
  },
  data() {
    return {
      layoutModes: {
        left: "1x1",
        right: "1"
      },
      panels: [
        {
          col: "left",
          type: "AlarmStatisticPanel",
          props: {
            title: "报警统计"
          },
          height: 940
        },
        {
          col: "left",
          type: "AlarmDetailPanel",
          title: "报警详情",
          height: 940
        },
        {
          col: "right",
          type: "AlarmVideoLinkPanel",
          title: "视频联动报警",
          height: 940,
          headerExtra: {
            type: "customSelect",
            placeholder: "请选择",
            modelValue: "2025-08", // 默认值
            options: [
              { label: "2025-08", value: "2025-08" },
              { label: "2025-07", value: "2025-07" },
              { label: "2025-06", value: "2025-06" },
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
        EmergencySupport: EmergencySupport,
        FloodForecast: FloodForecast,
        FloodControlDispatch: FloodControlDispatch
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