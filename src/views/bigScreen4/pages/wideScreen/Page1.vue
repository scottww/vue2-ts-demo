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
import EmergencySupport from "../../components/EmergencySupport.vue";
import FloodForecast from "../../components/FloodForecast.vue";
import FloodControlDispatch from "../../components/FloodControlDispatch.vue";
import RiskHazard from "../../components/RiskHazard.vue";
import ProjectSituation from "../../components/ProjectSituation.vue";
import WaterRainInformation from "../../components/WaterRainInformation.vue";
import WeatherForecast from "../../components/WeatherForecast.vue";

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
    WeatherForecast
  },
  data() {
    return {
      layoutModes: {
        // left: "2small-1big", // 支持多个组合类型
        left: "1big-2small",
        right: "2x2"
      },
      panels: [
        {
          col: "left",
          type: "ProjectSituation",
          props: {
            title: "工程情况",
            image: require("@/assets/bigScreen/thumbnail.png"),
            description:
              "这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述这是一个工程描述。",
            // topStats: ["闸门5孔", "泵组6台"],
            topStats: [
              {
                type: '闸门',
                unit: "孔",
                value: "5",
                icon: require("@/assets/bigScreen/gate.png")
              },
              {
                type: '泵组',
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
          height: 940
        },
        {
          col: "left",
          type: "WaterRainInformation",
          title: "水雨情信息",
          height: 431.1,
          headerExtra: {
            type: "customSelect",
            placeholder: "请选择站点",
            modelValue: "site1", // 默认值
            options: [
              { label: "站点名称站点名称1", value: "site1" },
              { label: "站点名称2", value: "site2" },
              { label: "站点名称3", value: "site3" }
            ],
            onChange: (val) => console.log("下拉选择", val)
          }
        },
        {
          col: "left",
          type: "WeatherForecast",
          title: "天气预报",
          height: 431.1
        },
        // { col: "left", type: "c", title: "统计分析1", height: 940 },
        // { col: "left", type: "a", title: "天气情况1", height: 431.1 },
        // { col: "left", type: "b", title: "摄像监控1", height: 431.1 },

        {
          col: "right",
          type: "EmergencySupport",
          title: "抢险支持",
          height: 430.12,
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
          col: "right",
          type: "FloodForecast",
          title: "洪水预报",
          height: 430.12,
          headerExtra: {
            type: "customSelect",
            placeholder: "请选择站点",
            modelValue: "12", // 默认值
            options: [
              { label: "未来12h", value: "12" },
              { label: "未来24h", value: "24" },
              { label: "未来36h", value: "36" },
              { label: "未来72h", value: "72" },
              { label: "历史记录", value: "history" }
            ],
            onChange: (val) => console.log("下拉选择", val)
          }
        },
        {
          col: "right",
          type: "FloodControlDispatch",
          title: "防洪调度",
          height: 482,
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
          col: "right",
          type: "RiskHazard",
          title: "风险隐患",
          height: 482,
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
        WeatherForecast: WeatherForecast
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