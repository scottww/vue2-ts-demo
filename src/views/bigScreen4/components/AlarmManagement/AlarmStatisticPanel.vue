<template>
  <div class="panel">
    <!-- 标题带背景图 -->
    <div class="panel-header flex-h-v">
      <span>{{ title }}</span>
      <div class="header-extra" v-if="headerExtra"></div>
    </div>

    <div class="panel-body flex-h-v">
      <div class="section type">
        <div class="top subtitle">
          <img :src="subTitleImg" alt="png" class="subtitle-bg" />
          <span class="img-text">类型统计</span>
        </div>
        <div class="main-box">
          <MainContainer
            :top-items="topItems"
            :middle-items="middleItems"
            :down-items="downItems"
            :total="totalData"
          />
        </div>
      </div>
      <div class="section chart-section">
        <div class="top subtitle">
          <img :src="subTitleImg" alt="png" class="subtitle-bg" />
          <span class="img-text">按时间统计</span>
        </div>
        <div class="chart">
          <bar-chart></bar-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subTitleImg from "@/assets/bigScreen/pumpOperation/subTitle_bg.png";
import waterRain from "@/assets/bigScreen/waterRain.png";
import MainContainer from "./MainContainer.vue";
import BarChart from "./BarChart.vue";
export default {
  name: "AlarmStatisticPanel",
  components: { MainContainer, BarChart },
  props: {
    title: { type: String, default: "风险隐患" },
    headerExtra: { type: Object, default: null }
  },
  data() {
    return {
      subTitleImg,
      waterRain,
      topItems: [
        { label: "其他类型", value: "06" },
        { label: "设施设备", value: "17" }
      ],
      middleItems: [
        { label: "巡查隐患", value: "29" },
        { label: "消防安全", value: "06" }
      ],
      downItems: [
        { label: "工程实体", value: "05" },
        { label: "安全防护", value: "02" }
      ],
      totalData: { label: "隐患总数", value: "65" }
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
  padding: 0 0 0 50px;
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
  width: 100%; /* 确保panel-body填满宽度 */
  box-sizing: border-box; /* 确保padding不影响宽度计算 */
}

.flex-h-v {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section {
  width: 100%;
  box-sizing: border-box;
}

.section.type {
  height: 530px;
}

.section.chart-section {
  height: calc(100% - 530px);
}

.top {
  height: 64px;
}

.chart {
  width: 100%;

  height: calc(100% - 64px);
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
  left: 13%;
  top: 23%;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  pointer-events: none; /* 不影响鼠标事件 */
}

.main-box {
  position: relative;
  width: 100%;
  height: calc(100% - 102px);
  /* aspect-ratio: 476 / 444; */
  background-image: url("~@/assets/bigScreen/risk_bg2.png");
  /* background-size: contain; */
  background-repeat: no-repeat;
  background-position: center;
  /* box-shadow: inset 0 0 0 1000px rgba(16, 55, 102, 0.6);
  border: 1px solid rgba(64, 201, 255, 0.3); */
}
</style>
