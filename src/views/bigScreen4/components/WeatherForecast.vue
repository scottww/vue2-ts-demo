<template>
  <div class="panel">
    <!-- 标题带背景图 -->
    <div class="panel-header flex-h-v">
      <span>{{ title }}</span>
      <slot name="header-extra"></slot>
    </div>

    <div class="panel-body">
      <!-- 上部：图片 + 描述 -->
      <div class="top">
        <ImageLabelValue
          v-for="(item, index) in dataList"
          :key="index"
          :img-src="item.icon"
          :period="item.period"
          :value="item.value"
          :unit="item.unit"
        />
      </div>

      <!-- 中部统计 -->
      <div class="center">
        <div class="top">
          <div class="left" v-for="(item, idx) in topStats" :key="idx">
            {{ item }}
          </div>
        </div>
        <div class="down">
          <div
            class="item"
            :class="idx % 2 === 0 ? 'even' : 'odd'"
            v-for="(stat, idx) in downStats"
            :key="idx"
          >
            <span class="item-label">{{ stat.label }}</span>
            <span class="item-value">{{ stat.value }}</span>
            <span class="item-unit">{{ stat.unit }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TIMELINE_DATA } from "./ProjectSituationData.js";
import ImageLabelValue from "./ImageLabelValue.vue";
import waterRain from "@/assets/bigScreen/waterRain.png";
export default {
  name: "WeatherForecast",
  components: { ImageLabelValue },
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
  height: 62px;
  background-image: url("../../../assets/bigScreen/title_bg2.png");
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
}

.panel-header span {
  position: relative;
  left: 0;
}

.panel-body {
  height: calc(100% - 62px);
  display: flex;
  flex-direction: column;
  margin-top: 0;
  padding: 0 10px;
}

.flex-h-v {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 50px;
}

.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 20px;
  padding: 0 10px;
}

.left {
  flex: 3;
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.right {
  flex: 7;
  display: flex;
  /* align-items: center; */
}

.panel-img {
  max-width: 100%;
  max-height: 100px;
  object-fit: cover;
  width: 100%;
  border-radius: 8px;
}

.center .top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.item {
  display: flex;
  /* justify-content: space-between; */
  margin: 20px 0;
  /* padding: 0 80px; */
  padding: 0 20px 0 40px;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
  height: 46px;
  line-height: 46px;
}

.item.odd {
  background-image: url("../../../assets/bigScreen/info_bg1.png");
  /* background-size: cover; */
  /* background-position: center;
  background-repeat: no-repeat; */

  background-size: cover;
  background-repeat: no-repeat; /* 不重复 */
  background-position: center; /* 居中显示 */
}

.item.even {
  background-image: url("../../../assets/bigScreen/info_bg0.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.item-label {
  font-size: 18px;
}

.item-value {
  font-weight: bold;
  font-size: 26px;
  color: #33ccff;
  font-style: italic;
  margin-left: auto;
}

.item-unit {
  min-width: 32px;
  margin-left: 12px;
}

p.description {
  margin-bottom: 0;
  text-indent: 2em;
}
::v-deep .el-card {
  background: linear-gradient(90deg, #09527f 0%);
  border: 1px solid;
  border-image: linear-gradient(0deg, #0f7ec6) 10 10;
}
::v-deep .el-card__body {
  padding: 10px;
}
</style>
