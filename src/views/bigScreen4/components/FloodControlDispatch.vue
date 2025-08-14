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
        <FloodControlDispathTotal />
      </div>
      <div class="main">
        <div class="timeline-container" ref="timelineContainer">
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in [...TIMELINE_DATA, ...TIMELINE_DATA]"
              :key="index"
              :timestamp="item.time"
              placement="top"
              class="custom-node"
            >
              <el-card>
                <div class="timeline-item">
                  <div class="top-panel">
                    <img src="@/assets/bigScreen/order.png" class="icon" />
                    <span class="item-name">{{ item.name }}</span>
                  </div>
                  <div class="down-panel">
                    <div>
                      <span class="item-label"> 泵组断面: </span>
                      <span class="item-status">{{ item.status }}</span>
                    </div>
                    <div>
                      <!-- 枢纽下泄流量(m3/s): {{ item.value }} -->
                      <span class="item-label"> 枢纽下泄流量(m3/s): </span>
                      <span class="item-value">{{ item.value }}</span>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TIMELINE_DATA } from "./FloodControlDispatchData.js";
import ThreeColumnLayout from "./ThreeColumnLayout.vue";
import waterRain from "@/assets/bigScreen/waterRain.png";
import CustomSelect from "./CustomSelect.vue";
import FloodControlDispathTotal from './FloodControlDispathTotal.vue';
export default {
  name: "FloodControlDispatch",
  components: { ThreeColumnLayout, CustomSelect, FloodControlDispathTotal },
  props: {
    title: { type: String, default: "防洪调度" },
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
  mounted() {
    this.initScroll();
  },
  methods: {
    handleSelectChange(val) {
      // 先调用配置里的 onChange 函数（如果有）
      if (this.headerExtra && typeof this.headerExtra.onChange === "function") {
        this.headerExtra.onChange(val);
      }
      // 再发事件给上层，方便事件冒泡传递
      this.$emit("site-change", val);
    },
    initScroll() {
      const timeline = this.$refs.timelineContainer;
      setInterval(() => {
        timeline.scrollTop += 1; // 每次滚动 1px
        if (timeline.scrollTop >= timeline.scrollHeight / 2) {
          timeline.scrollTop = 0;
        }
      }, 30);
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
  /* margin-bottom: 20px; */
  /* margin-top: 10px; */
  /* padding: 0 10px; */
  height: 170px;
}

.main {
  height: calc(100% - 200px);
  margin-top: 10px;
}

/* 时间线定制 */
.timeline-item {
  font-size: 12px;
  color: #66ccff;
  margin-bottom: 4px;
}

p.description {
  margin-bottom: 0;
  text-indent: 2em;
}

::v-deep .el-timeline-item__tail {
  border-left: 4px solid #175092;
}
::v-deep .el-timeline-item__timestamp {
  color: #fff;
  font-size: 14px;
  line-height: 16px;
}
::v-deep .el-card {
  background: linear-gradient(90deg, #09527f 0%);
  border: 1px solid;
  border-image: linear-gradient(0deg, #0f7ec6) 10 10;
}
::v-deep .el-card__body {
  padding: 10px;
}
.timeline-item {
  color: #fff;
}
.timeline-item {
  display: flex; /* 左图右文字 */
  flex-direction: column;
}

.timeline-item .icon {
  width: 14px; /* 图标大小与文字一致 */
  height: 14px;
  margin-right: 6px;
  flex-shrink: 0; /* 防止压缩 */
}

.timeline-item .text {
  flex: 1;
  line-height: 1.5; /* 行高调一下，让图标与文字协调 */
}

/* 覆盖圆点样式为 png 图标 */
.custom-node ::v-deep .el-timeline-item__node {
  background: url("../../../assets/bigScreen/node.png") no-repeat center/contain;
  border: none;
  width: 20px;
  height: 20px;
  left: -5px;
  top: -6px;
}

.top-panel {
  display: flex;
  align-items: center;
  flex: 1;
}
.down-panel {
  flex: 1;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.item-label {
  font-size: 16px;
  color: #fff;
  line-height: 16px;
}
.item-name {
  font-size: 16px;
  color: #03f4fd;
  line-height: 16px;
  /* text-decoration-line: underline; */
}
.item-status {
  font-size: 16px;
  color: #03f4fd;
  line-height: 16px;
  margin-left: 11px;
}
.item-value {
  font-size: 16px;
  color: #03f4fd;
  line-height: 16px;
  margin-left: 11px;
}

/* 自动滚动 */
.timeline-container {
  height: 100%;
  overflow: hidden;
}
</style>
