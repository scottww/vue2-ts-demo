<template>
  <div class="panel">
    <!-- 标题带背景图 -->
    <div class="panel-header">
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
        <ThreeColumnLayout
          v-for="(item, index) in dataListTest"
          :key="index"
          :img-src="item.icon"
          :period="item.period"
          :value="item.value"
          :unit="item.unit"
          :width="54"
          :height="54"
        />
      </div>

      <!-- 中部统计 -->
      <div class="main">
        <NormalBarChart></NormalBarChart>
      </div>
    </div>
  </div>
</template>

<script>
import { TIMELINE_DATA } from "./ProjectSituationData.js";
import ThreeColumnLayout from "./ThreeColumnLayout.vue";
import person from "@/assets/bigScreen/person.png";
import NormalBarChart from "./NormalBarChart.vue";
import CustomSelect from "./CustomSelect.vue";
export default {
  name: "EmergencySupport",
  components: { ThreeColumnLayout, NormalBarChart, CustomSelect },
  props: {
    title: { type: String, default: "工程情况" },
    headerExtra: { type: Object, default: null },
    dataList: { type: Array, default: () => [] }
  },
  data() {
    return {
      TIMELINE_DATA,
      person,
      dataListTest: [
        { period: "当年统计", value: "26", unit: "次", icon: person },
        { period: "去年统计", value: "37", unit: "次", icon: person },
        { period: "前年统计", value: "39", unit: "次", icon: person }
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

<style scoped>
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

  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 0 50px; */
  padding: 0 0 0 50px;
}

.panel-header span {
  position: relative;
  left: 0px;
  /* top: -20px; */
}

.header-extra {
  /* 右侧容器 */
  display: flex;
  align-items: center;
  position: relative;
  left: 0px;
  /* top: -20px; */
}

.panel-body {
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  margin-top: 0;
  padding: 0 10px;
}

.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 20px;
  padding: 0 10px;
  height: 64px;
}
.main {
  height: calc(100% - 64px);
}
</style>
