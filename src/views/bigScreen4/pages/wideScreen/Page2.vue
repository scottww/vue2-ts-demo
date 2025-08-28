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

import EquipmentStatisticsManagement from "../../components/pumpGateMananement/EquipmentStatisticsManagement.vue";
import PumpRunHistory from "../../components/pumpGateMananement/PumpRunHistory.vue";
import GateRealTimeMonitor from "../../components/pumpGateMananement/GateRealTimeMonitor.vue";
import SevenDayRainfallOperationTrend from "../../components/pumpGateMananement/SevenDayRainfallOperationTrend.vue";
import SevenDayWaterOperationTrend from "../../components/pumpGateMananement/SevenDayWaterOperationTrend.vue";
import AlarmManagement from "../../components/pumpGateMananement/AlarmManagement.vue";
import VideoMonitor from "../../components/pumpGateMananement/VideoMonitor.vue";

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
    EquipmentStatisticsManagement,
    PumpRunHistory,
    GateRealTimeMonitor,
    SevenDayRainfallOperationTrend,
    SevenDayWaterOperationTrend,
    AlarmManagement,
    VideoMonitor
  },
  data() {
    return {
      layoutModes: {
        left: "2small-1big",
        right: "2x2"
      },
      panels: [
        {
          col: "left",
          type: "EquipmentStatisticsManagement",
          props: {
            title: "设备统计管理",
            image: require("@/assets/bigScreen/thumbnail.png"),
            description:
              "这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述。",
            // topStats: ["闸门5孔", "泵组6台"],
            topStats: [
              {
                type: "闸门",
                unit: "孔",
                value: "5",
                icon: require("@/assets/bigScreen/gate.png")
              },
              {
                type: "泵组",
                unit: "台",
                value: "6",
                icon: require("@/assets/bigScreen/pump.png")
              }
            ],
            downStats: [
              { label: "机组累计运行总台时", value: "71703", unit: "h" },
              { label: "机组累计总抽水量", value: "46.46 ", unit: "亿m³" },
              { label: "节制闸累计总泄洪量", value: "243.38", unit: "亿m³" }
            ],
            timeline: ["2025-08-01 工程启动", "2025-08-02 闸门检修"]
          },
          api: "/api/project/situation", // 后端接口
          height: 590
        },
        {
          col: "left",
          type: "GateRealTimeMonitor",
          title: "闸门实时监测",
          height: 350
        },
        {
          col: "left",
          type: "PumpRunHistory",
          title: "泵组历史运行统计",
          height: 940,
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
        // { col: "left", type: "c", title: "统计分析1", height: 940 },
        // { col: "left", type: "a", title: "天气情况1", height: 431.1 },
        // { col: "left", type: "b", title: "摄像监控1", height: 431.1 },

        {
          col: "right",
          type: "SevenDayRainfallOperationTrend",
          title: "雨情七日运行趋势",
          height: 430.12,
          headerExtra: {
            type: "customSelect",
            placeholder: "请选择站点",
            modelValue: "site1", // 默认值
            options: [
              { label: "站点名称1", value: "site1" },
              { label: "站点名称2", value: "site2" },
              { label: "站点名称3", value: "site3" }
            ],
            onChange: (val) => console.log("下拉选择", val)
          }
        },
        {
          col: "right",
          type: "SevenDayWaterOperationTrend",
          title: "水情七日运行趋势",
          height: 430.12,
          headerExtra: {
            type: "customSelect",
            placeholder: "请选择站点",
            modelValue: "site1", // 默认值
            options: [
              { label: "站点名称1", value: "site1" },
              { label: "站点名称2", value: "site2" },
              { label: "站点名称3", value: "site3" }
            ],
            onChange: (val) => console.log("下拉选择", val)
          }
        },
        {
          col: "right",
          type: "VideoMonitor",
          title: "视频监控",
          height: 482
        },
        {
          col: "right",
          type: "AlarmManagement",
          title: "报警管理",
          height: 482,
          headerExtra: {
            type: "customSelect",
            placeholder: "请选择",
            modelValue: "202508", // 默认值
            options: [{ label: "2025-08", value: "202508" }],
            onChange: (val) => console.log("下拉选择", val)
          }
        }
        // { col: "right", type: "c", title: "告警信息1", height: 434 },
        // { col: "right", type: "a", title: "任务信息1", height: 483 }
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
        EquipmentStatisticsManagement: EquipmentStatisticsManagement,
        WeatherForecast: WeatherForecast,
        GateRealTimeMonitor: GateRealTimeMonitor,
        SevenDayRainfallOperationTrend: SevenDayRainfallOperationTrend,
        SevenDayWaterOperationTrend: SevenDayWaterOperationTrend,
        AlarmManagement: AlarmManagement,
        VideoMonitor: VideoMonitor
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