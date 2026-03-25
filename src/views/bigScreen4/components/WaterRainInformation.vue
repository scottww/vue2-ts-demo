<template>
  <div class="panel">
    <!-- 标题带背景图 -->
    <div class="panel-header flex-h-v">
      <span>{{ title }}</span>
      <!-- <slot name="header-extra"></slot> -->
      <div class="header-extra" v-if="headerExtra">
        <CustomSelect
          v-if="headerExtra.type === 'customSelect'"
          v-model="headerExtra.modelValue"
          :options="headerExtra.options"
          :placeholder="headerExtra.placeholder"
          @input="handleSelectChange"
        />
        <!-- 其它headerExtra类型... -->
      </div>
    </div>

    <div class="panel-body">
      <!-- 上部：图片 + 描述 -->
      <div class="top">
        <ImageLabelValue
          v-for="(item, index) in dataListTest"
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
import ImageLabelValue from "./ImageLabelValue.vue";
import waterRain from "@/assets/bigScreen/waterRain.png";
import WaterRainChart from "./WaterRainChart.vue";
import CustomSelect from "./CustomSelectVue2Vue3.vue";
export default {
  name: "WaterRainInformation",
  components: { ImageLabelValue, WaterRainChart, CustomSelect },
  props: {
    title: { type: String, default: "工程情况" },
    headerExtra: { type: Object, default: null },
    dataList: { type: Array, default: () => [] }
  },
  data() {
    return {
      TIMELINE_DATA,
      waterRain,
      dataListTest: [
        { period: "近一小时", value: "10.0", unit: "mm", icon: waterRain },
        { period: "近三小时", value: "28.3", unit: "mm", icon: waterRain },
        { period: "近六小时", value: "43.5", unit: "mm", icon: waterRain }
      ]
    };
  },
  methods: {
    handleSelectChange(val) {
      // 先调用配置里的 onChange 函数（如果有）
      if (this.headerExtra && typeof this.headerExtra.onChange === "function") {
        this.headerExtra.onChange(val);
      }
      // 再发事件给上层，方便事件冒泡传递
      this.$emit("site-change", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.panel {
  background: rgba(0, 76, 153, 0.2);
  border: 1px solid rgba(0, 153, 255, 0.3);
  border-radius: 6px;
  padding: 12px;
  color: #fff;
}

.panel-header {
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
  left: 0px;
}

.header-extra {
  /* 右侧容器 */
  display: flex;
  align-items: center;
  position: relative;
  right: 12px;
  top: 3px;
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
  height: 64px;
}
.main {
  height: calc(100% - 64px);
}

// 定制化样式：针对 header-extra 内的 CustomSelect 进行定制
.header-extra :deep(.selected__value) {
  padding: 0;
}

.header-extra :deep(.diamond) {
  min-height: VH(34px);
  padding: 0 VW(14px);
  background: linear-gradient(180deg, #2f99ff 0%, #1b6fd9 100%);
  border: 1px solid rgba(89, 200, 255, 0.7);
  box-shadow:
    inset 0 0 0 1px rgba(120, 228, 255, 0.18),
    0 0 VH(10px) rgba(35, 145, 255, 0.2);
  transform: skewX(-12deg);
}

.header-extra :deep(.diamond__label),
.header-extra :deep(.diamond__arrow),
.header-extra :deep(.diamond__clear-btn) {
  transform: skewX(12deg);
}

.header-extra :deep(.diamond__label) {
  font-family: PangMenZhengDao, PMZD, sans-serif;
  font-size: rem(16px);
  color: #ffffff;
}

.header-extra :deep(.diamond__arrow) {
  color: rgba(255, 255, 255, 0.9);
}
</style>
