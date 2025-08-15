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
      <!-- 上部：图片 + 描述 -->
      <div class="top">
        <div class="left">
          <img v-if="image" :src="image" alt="图片" class="panel-img" />
          <slot v-else name="image">暂无图片</slot>
        </div>
        <div class="right">
          <p class="description">{{ description }}</p>
        </div>
      </div>

      <!-- 中部统计 -->
      <div class="center">
        <div class="top">
          <div
            class="top-item"
            v-for="(item, idx) in topStats"
            :key="idx"
            :style="{ backgroundImage: `url(${item.icon})`, height: '51px' }"
          >
            <!-- <img
              v-if="item.icon"
              :src="item.icon"
              alt="图片"
              class="item-img"
            />
            <div>
              <div class="type">闸门</div>
              <div class="value">{{ item.value }}</div>
              <div class="unit">{{ item.unit }}</div>
            </div> -->
            <div class="top-item__text">
              <div class="type">{{ item.type }}</div>
              <div class="value">{{ item.value }}</div>
              <div class="unit">{{ item.unit }}</div>
            </div>
          </div>
        </div>
        <div class="down">
          <div
            class="item"
            :class="idx % 2 === 0 ? 'even' : 'odd'"
            v-for="(stat, idx) in downStats"
            :key="idx"
          >
            <span class="item-label">{{ stat.label }}</span>
            <span class="item-value">{{ stat.value }}</span>
            <span class="item-unit">{{ stat.unit }}</span>
          </div>
        </div>
      </div>

      <!-- 底部时间轴 -->
      <div class="down2">
        <slot name="timeline">
          <!-- 默认占位 -->
          <!-- <div v-for="(event, idx) in timeline" :key="idx" class="timeline-item">
            {{ event }}
          </div> -->
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in TIMELINE_DATA"
              :key="index"
              :timestamp="item.time"
              placement="top"
              class="custom-node"
            >
              <el-card>
                <p class="timeline-item">
                  <img src="@/assets/bigScreen/order.png" class="icon" />
                  {{ item.value }}
                </p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { TIMELINE_DATA } from "./ProjectSituationData.js";
import CustomSelect from "./CustomSelect.vue";
export default {
  name: "ProjectSituation",
  components: { CustomSelect },
  props: {
    title: { type: String, default: "工程情况" },
    headerExtra: { type: Object, default: null },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    topStats: { type: Array, default: () => [] }, // ["闸门5孔", "泵组6台"]
    downStats: { type: Array, default: () => [] }, // [{label:"机组累计运行总台时", value:"71703 h"}]
    timeline: { type: Array, default: () => [] }
  },
  data() {
    return {
      TIMELINE_DATA
    };
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
  margin-bottom: 20px;
  margin-top: 0px;
  padding: 0 10px;
}

.top-item {
  flex: 1;
  position: relative;
  background-size: cover;
  background-position: center;
  height: 100px; /* 高度按你的设计改 */
  display: flex;
  align-items: center;
}

.top-item__text {
  margin: 0 auto;
  padding-right: 15px;
  text-align: right;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100%;
}

.type {
  font-size: 18px;
  color: #ffffff;
}

.value {
  font-size: 26px;
  color: #33ccff;
}

.unit {
  font-size: 18px;
  color: #ffffff;
}

.left {
  flex: 3;
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.right {
  flex: 7;
  display: flex;
  /* align-items: center; */
}

.panel-img {
  max-width: 100%;
  max-height: 100px;
  object-fit: cover;
  width: 100%;
  border-radius: 8px;
}

.center .top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.item {
  display: flex;
  /* justify-content: space-between; */
  margin: 20px 0;
  /* padding: 0 80px; */
  padding: 0 20px 0 40px;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
  height: 46px;
  line-height: 46px;
}

.item.odd {
  background-image: url("../../../assets/bigScreen/info_bg1.png");
  /* background-size: cover; */
  /* background-position: center;
  background-repeat: no-repeat; */

  background-size: cover;
  background-repeat: no-repeat; /* 不重复 */
  background-position: center; /* 居中显示 */
}

.item.even {
  background-image: url("../../../assets/bigScreen/info_bg0.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.item-label {
  font-size: 18px;
}

.item-value {
  font-weight: bold;
  font-size: 26px;
  color: #33ccff;
  font-style: italic;
  margin-left: auto;
}

.item-unit {
  min-width: 32px;
  margin-left: 12px;
}

.down2 {
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
  font-size: 18px;
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
/* .timeline-item {
  display: flex;
  align-items: center;
}
.timeline-item .icon {
  width: 16px;
  height: 16px;
  margin-right: 4px;
} */
.timeline-item {
  display: flex; /* 左图右文字 */
  align-items: flex-start; /* 顶部对齐 */
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
</style>
