<template>
  <div class="panel">
    <!-- 标题带背景图 -->
    <div class="panel-header flex-h-v">
      <span>{{ title }}</span>
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
      <div class="top">
        <DataItem
          v-for="(item, index) in dataList"
          :key="index"
          :img="item.icon"
          :img-text="item.text"
          img-text-position="center"
          :top="{ label: '水位', value: item.waterLevel, unit: 'm' }"
          :bottom="{ label: '流量', value: item.flow, unit: 'm³/s' }"
          :top-bg="item.topBg"
          :bottom-bg="item.bottomBg"
        />
      </div>
      <div class="main">
        <ImageLabelValue
          v-for="(item, index) in dataList2"
          :key="index"
          :img-src="item.icon"
          :period="item.period"
          :value="item.value"
          :unit="item.unit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import itemBg1 from "@/assets/bigScreen/pumpOperation/item_bg1_1.png";
import itemBg2 from "@/assets/bigScreen/pumpOperation/item_bg2.png";
import dataRowBg from "@/assets/bigScreen/pumpOperation/data_row_bg.png";
import CustomSelect from "../CustomSelect.vue";
import ImageLabelValue from "../ImageLabelValue.vue";
import DataItem from "./DataItem.vue";

export default {
  name: "GateRealTimeMonitor",
  components: { CustomSelect, ImageLabelValue, DataItem },
  props: {
    title: { type: String, default: "闸门实时监测" },
    headerExtra: { type: Object, default: null }
  },
  data() {
    return {
      itemBg1,
      itemBg2,
      dataRowBg,
      dataList: [
        {
          icon: itemBg1,
          text: "闸前",
          waterLevel: "1.62",
          flow: "13.26",
          topBg: dataRowBg,
          bottomBg: dataRowBg
        },
        {
          icon: itemBg1,
          text: "闸后",
          waterLevel: "1.82",
          flow: "15.20",
          topBg: dataRowBg,
          bottomBg: dataRowBg
        }
      ],
      dataList2: [
        {
          period: "闸门开度",
          value: "1.25",
          unit: "m",
          icon: itemBg2,
          width: "92",
          height: "63"
        },
        {
          period: "限制高度",
          value: "4.0",
          unit: "m",
          icon: itemBg2,
          width: "92",
          height: "63"
        }
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
  background-image: url("~@/assets/bigScreen/title_bg2.png");
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
  left: 0px;
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
  margin-bottom: 20px;
  margin-top: 20px;
  padding: 0 10px;
  /* height: 64px; */
  flex: 1;
  align-items: center;
}

.main0 {
  height: calc(100% - 64px);
}

.main {
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
