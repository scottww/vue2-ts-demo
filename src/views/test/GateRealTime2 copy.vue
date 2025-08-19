<template>
  <div class="panel">
    <!-- 标题带背景图 -->
    <div class="panel-header flex-h-v">
      <span>{{ title }}</span>
    </div>

    <div class="panel-body">
      <div class="top">
        <div class="data-item">
          <!-- 背景尺寸116*116, 图片跟两个label左右布局，两个label是上下布局， label内部是横向布局，背景图片上还有文字闸前-->
          <img src="@/assets/bigScreen/pumpOperation/item_bg1.png" alt="png" />
          <div class="data-top">
            <span class="data-label">水位</span>
            <span class="data-value">1.62</span>
            <span class="data-unit">m</span>
          </div>
          <div class="data-bottom">
            <span class="data-label">流量</span>
            <span class="data-value">13.26</span>
            <span class="data-unit">m³/s</span>
          </div>
        </div>
        <div class="data-item">
          <!-- 背景尺寸116*116, 图片跟两个label左右布局，两个label是上下布局， label内部是横向布局，背景图片上还有文字闸后-->
          <img src="@/assets/bigScreen/pumpOperation/item_bg1.png" alt="png" />
          <div class="data-top">
            <span class="data-label">水位</span>
            <span class="data-value">1.62</span>
            <span class="data-unit">m</span>
          </div>
          <div class="data-bottom">
            <span class="data-label">流量</span>
            <span class="data-value">13.26</span>
            <span class="data-unit">m³/s</span>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="data2-item">
          <!-- 背景尺寸92*63, 图片跟data左右布局，data内部是上下布局， 背景图片上没有字 -->
          <img src="@/assets/bigScreen/pumpOperation/item_bg2.png" alt="png" />
          <div class="data">
            <span class="data-label">闸门开度</span>
            <span class="data-value">1.25</span>
            <span class="data-unit">m</span>
          </div>
        </div>
        <div class="data2-item">
          <!-- 背景尺寸92*63, 图片跟data左右布局，data内部是上下布局， 背景图片上没有字 -->
          <img src="@/assets/bigScreen/pumpOperation/item_bg2.png" alt="png" />
          <div class="data">
            <span class="data-label">限制高度</span>
            <span class="data-value">4.0</span>
            <span class="data-unit">m</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import waterRain from "@/assets/bigScreen/waterRain.png";
export default {
  name: "RiskHazard",
  components: {},
  props: {
    title: { type: String, default: "风险隐患" },
    headerExtra: { type: Object, default: null }
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
  height: 64px;
}

.main {
  height: calc(100% - 64px);
}

/* ---------- top 区域 ---------- */
.top {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  height: 116px;
}

.data-item {
  width: 240px; /* 左图116 + 右侧数据区域 */
  height: 116px;
  display: flex;
  align-items: center;
}

.data-item img {
  width: 116px;
  height: 116px;
  object-fit: contain;
  flex-shrink: 0;
}

.data-item .data-top,
.data-item .data-bottom {
  display: flex;
  align-items: baseline;
  margin: 4px 0;
  color: #fff;
}

.data-item .data-top {
  margin-top: 0;
}

.data-item .data-bottom {
  margin-bottom: 0;
}

.data-item .data-label {
  font-size: 12px;
  margin-right: 4px;
}

.data-item .data-value {
  font-size: 18px;
  font-weight: bold;
  margin-right: 4px;
}

.data-item .data-unit {
  font-size: 12px;
}

/* ---------- main 区域 ---------- */
.main {
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}

.data2-item {
  width: 180px; /* 左图92 + 右侧数据区域 */
  height: 63px;
  display: flex;
  align-items: center;
}

.data2-item img {
  width: 92px;
  height: 63px;
  object-fit: contain;
  flex-shrink: 0;
}

.data2-item .data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 8px;
  line-height: 1.2;
  color: #fff;
}

.data2-item .data-label {
  font-size: 12px;
}

.data2-item .data-value {
  font-size: 16px;
  font-weight: bold;
  margin-right: 4px;
}

.data2-item .data-unit {
  font-size: 12px;
}
</style>
