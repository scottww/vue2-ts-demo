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
        <div class="top subtitle">
          <img :src="subTitleImg" alt="png" class="subtitle-bg" />
          <span class="img-text">闸泵开关次数统计</span>
        </div>
        <div class="middle">
          <ImageLabelValue
            v-for="(item, index) in dataList"
            :key="index"
            :img-src="item.icon"
            :period="item.period"
            :value="item.value"
            :unit="item.unit"
          />
        </div>
        <div class="chart">
          <GatePumpCountChart></GatePumpCountChart>
        </div>
      </div>
      <div class="section">
        <div class="top subtitle">
          <img :src="subTitleImg" alt="png" class="subtitle-bg" />
          <span class="img-text">排水量统计</span>
        </div>
        <div class="chart">
          <DrainageChart></DrainageChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subTitleImg from "@/assets/bigScreen/pumpOperation/subTitle_bg.png";
import gateImg from "@/assets/bigScreen/pumpOperation/gate.png";
import pumpImg from "@/assets/bigScreen/pumpOperation/pump.png";
import ImageLabelValue from "../ImageLabelValue.vue";
import CustomSelect from "../CustomSelect.vue";
import GatePumpCountChart from "./GatePumpCountChart.vue";
import DrainageChart from "./DrainageChart.vue";
export default {
  name: "PumpRunHistory",
  components: {
    ImageLabelValue,
    CustomSelect,
    GatePumpCountChart,
    DrainageChart
  },
  props: {
    title: { type: String, default: "泵组历史运行统计" },
    headerExtra: { type: Object, default: null }
  },
  data() {
    return {
      subTitleImg,
      gateImg,
      pumpImg,
      dataList: [
        { period: "开闸次数", value: "12", unit: "", icon: gateImg },
        { period: "开泵次数", value: "16", unit: "", icon: pumpImg }
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
  /* display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 0;
  padding: 0 10px; */
  height: 64px;
}

.middle {
  /* display: flex;
  justify-content: space-between;
  flex: 1;
  padding: 0 40px;
  height: 64px; */

  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  /* 不需要固定高度，让 flex 自适应 */
}

.chart {
  flex: 1; /* 占据剩余高度 */
  margin-top: 10px;
}

.chart.second {
  height: calc(100% - 64px);
  margin-top: 10px;
}

/* 子标题 */
.top.subtitle {
  position: relative; /* 容器设相对定位 */
  height: 64px; /* 和图片高度一致 */
}

.subtitle-bg {
  width: 100%;
  height: 100%;
  display: block;
}

.img-text {
  position: absolute; /* 绝对定位到图片上 */
  left: 8%;
  top: 23%;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  pointer-events: none; /* 不影响鼠标事件 */
}

/* 组件样式个性化 */

::v-deep .image-label-value-layout .top-text {
  font-weight: 500;
  font-size: 14px;
  color: #eeeeff;
}

::v-deep .image-label-value-layout .bottom-text .value {
  font-size: 20px;
  color: #ffae3a;
}
</style>
