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
      <div class="section">
        <div class="top">
          <ImageLabelValue
            v-for="(item, index) in dataList"
            :key="index"
            :img-src="item.icon"
            :period="item.period"
            :value="item.value"
            :unit="item.unit"
            :width="item.width"
            :height="item.height"
          />
        </div>
        <div class="chart">
          <water-level-chart></water-level-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subTitleImg from "@/assets/bigScreen/pumpOperation/subTitle_bg.png";
import waterImg from "@/assets/bigScreen/pumpOperation/water.png";
import ImageLabelValue from "../ImageLabelValue.vue";
import CustomSelect from "../CustomSelect.vue";
import SevenDayRainfallOperationTrendChart from "./SevenDayRainfallOperationTrendChart.vue";
import WaterLevelChart from './WaterLevelChart.vue';
export default {
  name: "SevenDayRainfallOperationTrend",
  components: {
    ImageLabelValue,
    CustomSelect,
    SevenDayRainfallOperationTrendChart,
    WaterLevelChart
  },
  props: {
    title: { type: String, default: "雨情七日运行趋势" },
    headerExtra: { type: Object, default: null }
  },
  data() {
    return {
      subTitleImg,
      waterImg,
      dataList: [
        {
          period: "实时水位",
          value: "7.75",
          unit: "m",
          icon: waterImg,
          width: 91,
          height: 63
        },
        {
          period: "警戒水位",
          value: "9.00",
          unit: "m",
          icon: waterImg,
          width: 91,
          height: 63
        },
        {
          period: "保证水位",
          value: "10.00",
          unit: "m",
          icon: waterImg,
          width: 91,
          height: 63
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

.section {
  flex: 1; /* 平均分配高度 */
  display: flex;
  flex-direction: column;
}

.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
  margin-top: 20px;
  padding: 0 10px;
  height: 64px
  /* height: 64px;
  padding: 0;
  display: flex;
  justify-content: space-around;
  align-items: center; */
}

.chart {
  flex: 1; /* 占据剩余高度 */
  margin-top: 10px;
  height: calc(100% - 64px);
}
</style>
