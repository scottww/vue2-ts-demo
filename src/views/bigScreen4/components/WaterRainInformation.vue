<template>
  <div class="panel">
    <!-- 标题带背景图 -->
    <div class="panel-header">
      <span>{{ title }}</span>
      <slot name="header-extra"></slot>
    </div>

    <div class="panel-body">
      <!-- 上部：图片 + 描述 -->
      <div class="top">
        <ThreeColumnLayout
          v-for="(item, index) in dataList"
          :key="index"
          :img-src="item.icon"
          :period="item.period"
          :value="item.value"
          :unit="item.unit"
        />
      </div>

      <!-- 中部统计 -->
      <div class="main">
        <WaterRainChart></WaterRainChart>
      </div>
    </div>
  </div>
</template>

<script>
import { TIMELINE_DATA } from "./ProjectSituationData.js";
import ThreeColumnLayout from "./ThreeColumnLayout.vue";
import waterRain from "@/assets/bigScreen/waterRain.png";
import WaterRainChart from './WaterRainChart.vue';
export default {
  name: "ProjectSituation",
  components: { ThreeColumnLayout, WaterRainChart },
  props: {
    title: { type: String, default: "工程情况" },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    topStats: { type: Array, default: () => [] }, // ["闸门5孔", "泵组6台"]
    downStats: { type: Array, default: () => [] }, // [{label:"机组累计运行总台时", value:"71703 h"}]
    timeline: { type: Array, default: () => [] }
  },
  data() {
    return {
      TIMELINE_DATA,
      waterRain,
      dataList: [
        { period: "近一小时", value: "10.0", unit: "mm", icon: waterRain },
        { period: "近三小时", value: "28.3", unit: "mm", icon: waterRain },
        { period: "近六小时", value: "43.5", unit: "mm", icon: waterRain }
      ]
    };
  }
};
</script>

<style scoped>
.panel {
  background: rgba(0, 76, 153, 0.2);
  border: 1px solid rgba(0, 153, 255, 0.3);
  border-radius: 6px;
  padding: 12px;
  color: #fff;
}

.panel-header {
  position: relative;
  font-weight: bold;
  font-size: 16px;
  height: 99px;
  background-image: url("../../../assets/bigScreen/title_bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
}

.panel-header span {
  position: absolute;
  left: 50px;
  top: 14px;
}

.panel-body {
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  margin-top: -46px;
  padding: 0 10px;
}

.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 20px;
  padding: 0 10px;
  height: 64px;
}
.main {
  height: calc(100% - 64px);
}
</style>
