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
        <div class="top with-data">
          <img :src="subTitleImg" alt="png" class="subtitle-bg" />
          <div class="data-box">
            <div class="item total">
              <div class="label">设备总数</div>
              <div class="value">140</div>
            </div>
            <div class="item online">
              <div class="label">在线数</div>
              <div class="value">138</div>
            </div>
            <div class="item offline">
              <div class="label">离线数</div>
              <div class="value">2</div>
            </div>
            <div class="item fault">
              <div class="label">故障数</div>
              <div class="value">0</div>
            </div>
          </div>
        </div>

        <div class="chart">
          <!-- <EquipmentChart></EquipmentChart> -->
          <pie-3-d
            :chartData="[
              {
                name: '危运',
                value: 40,
                number: 120,
                itemStyle: { color: 'rgba(32,159,237,1)' }
              },
              {
                name: '包车',
                value: 30,
                number: 80,
                itemStyle: { color: 'rgba(255,159,32,1)' }
              },
              {
                name: '班车',
                value: 20,
                number: 60,
                itemStyle: { color: 'rgba(159,255,237,1)' }
              },
              {
                name: '重货',
                value: 10,
                number: 10,
                itemStyle: { color: 'rgba(159,255,32,1)' }
              }
            ]"
          ></pie-3-d>
        </div>
      </div>
      <div class="section">
        <div class="top subtitle">
          <img :src="subTitleImg2" alt="png" class="subtitle-bg" />
          <span class="img-text">设备详情</span>
        </div>
        <div class="chart">
          <EquipmentDetail></EquipmentDetail>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subTitleImg from "@/assets/bigScreen/pumpOperation/equipment_title_bg.png";
import subTitleImg2 from "@/assets/bigScreen/pumpOperation/subTitle_bg.png";
import gateImg from "@/assets/bigScreen/pumpOperation/gate.png";
import pumpImg from "@/assets/bigScreen/pumpOperation/pump.png";
import ImageLabelValue from "../ImageLabelValue.vue";
import CustomSelect from "../CustomSelect.vue";
import EquipmentChart from "./EquipmentManageChart.vue";
import EquipmentDetail from "./EquipmentDetail.vue";
import Pie3D from "./Pie3D.vue";
export default {
  name: "PumpRunHistory",
  components: {
    ImageLabelValue,
    CustomSelect,
    EquipmentChart,
    EquipmentDetail,
    Pie3D
  },
  props: {
    title: { type: String, default: "设备统计管理" },
    headerExtra: { type: Object, default: null }
  },
  data() {
    return {
      subTitleImg,
      subTitleImg2,
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
  gap: 4px;
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

.top.with-data {
  position: relative;
  height: 45px; /* 与背景图高度一致 */
}

.data-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between; /* 均分剩余空间 */
  align-items: center;
  font-size: 14px;
  color: #fff;
  padding-left: 60px; /* 左边留 40px */
  padding-right: 20px; /* 可选：右边也留一点，不会紧贴 */
  box-sizing: border-box;
}

.data-box .item {
  flex: 1; /* 每个块均分宽度 */
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
}

.data-box .value {
  font-size: 14px;
  font-weight: bold;
  margin-right: 8px;
}

.data-box .total .value {
  color: #4fc3f7;
}
.data-box .online .value {
  color: #4caf50;
}
.data-box .offline .value {
  color: #ffae3a;
}
.data-box .fault .value {
  color: #ff5722;
}

.middle {
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
  height: calc(100% - 60px);
  margin-top: 10px;
}

/* 子标题 */
.top.subtitle {
  position: relative; /* 容器设相对定位 */
  height: 60px; /* 和图片高度一致 */
  line-height: 18px;
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
