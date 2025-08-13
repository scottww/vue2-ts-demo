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

    <div class="panel-body flex-h-v">
      <div class="main">
        <div class="main__container">
          <div class="content">
            <div class="top">
              <div class="item flex-v-h">
                <div class="item-label">其他类型</div>
                <div class="item-value">06</div>
              </div>
              <div class="item flex-v-h">
                <div class="item-label">设施设备</div>
                <div class="item-value">17</div>
              </div>
            </div>

            <div class="middle">
              <div class="item">
                <div class="item-label">巡查隐患</div>
                <div class="item-value">29</div>
              </div>
              <div class="item">
                <div class="item-label">消防安全</div>
                <div class="item-value">06</div>
              </div>
            </div>
            <div class="down">
              <div class="item">
                <div class="item-label">工程实体</div>
                <div class="item-value">05</div>
              </div>
              <div class="item">
                <div class="item-label">安全防护</div>
                <div class="item-value">02</div>
              </div>
              <!-- total 绝对定位在两个 item 上方 -->
              <div class="total">
                <div class="flex-h-v">
                  <div class="total-label">隐患总数</div>
                  <div class="total-value">65</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TIMELINE_DATA } from "./ProjectSituationData.js";
import ThreeColumnLayout from "./ThreeColumnLayout.vue";
import waterRain from "@/assets/bigScreen/waterRain.png";
import CustomSelect from "./CustomSelect.vue";
export default {
  name: "RiskHazard",
  components: { ThreeColumnLayout, CustomSelect },
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
  background-image: url("../../../assets/bigScreen/title_bg2.png");
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
}

.flex-h-v {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main {
  height: calc(100% - 64px);
}

.main {
  position: relative;
  width: 100%;
  height: 100%; /* 占满父容器宽度 */
  max-height: 100%; /* 不超过父容器高度 */
  aspect-ratio: 476 / 444; /* 原始比例 */
  background-image: url("../../../assets/bigScreen/risk_bg2.png");
  /* background-size: contain; */
  background-repeat: no-repeat;
  background-position: center;
  /* box-shadow: inset 0 0 0 1000px rgba(16, 55, 102, 0.6);
  border: 1px solid rgba(64, 201, 255, 0.3); */
}

.main__container0 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}
.main__container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

.item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("../../../assets/bigScreen/risk_item2.png");
  background-size: cover;
  background-position: center;
  padding: 10px 0;
}

.item-label {
  color: #f3f8fd;
  font-size: 14.8px;
}
.item-value {
  color: #33ccff;
  font-size: 20.35px;
}

.top,
.middle,
.down {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
.top {
  padding: 0 40px;
}
.down {
  padding: 0 30px;
}

.down {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
}

.total {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 8px;
  z-index: 10;
}

.total .flex-h-v {
  flex-direction: column;
}

.total-label {
  color: #fff;
  font-size: 19.63px;
}

.total-value {
  color: #33ccff;
  font-size: 32px;
}
</style>
