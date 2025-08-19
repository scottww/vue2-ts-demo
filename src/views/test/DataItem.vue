<template>
  <div class="data-item">
    <!-- 左侧图片 + 可叠加文字 -->
    <div class="data-img-wrapper">
      <img :src="img" alt="" />
      <span v-if="imgText" class="img-text" :class="imgTextPositionClass">{{
        imgText
      }}</span>
    </div>

    <!-- 右侧数据块 -->
    <div class="data-content">
      <!-- 上部分 -->
      <div class="data-top" :style="{ backgroundImage: `url(${topBg})` }">
        <div class="data-bottom-left">
          <span class="data-label">{{ bottom.label }}</span>
          <span class="data-value">{{ bottom.value }}</span>
        </div>
        <span class="data-unit">{{ bottom.unit }}</span>
      </div>
      <!-- 下部分，单位靠右 -->
      <div class="data-bottom" :style="{ backgroundImage: `url(${bottomBg})` }">
        <div class="data-bottom-left">
          <span class="data-label">{{ bottom.label }}</span>
          <span class="data-value">{{ bottom.value }}</span>
        </div>
        <span class="data-unit">{{ bottom.unit }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataItem",
  props: {
    img: { type: String, required: true }, // 左图
    imgText: { type: String, default: "" }, // 左图上文字
    imgTextPosition: { type: String, default: "bottom" }, // top/center/bottom
    top: {
      type: Object,
      required: true,
      default: () => ({ label: "", value: "", unit: "" })
    },
    bottom: {
      type: Object,
      required: true,
      default: () => ({ label: "", value: "", unit: "" })
    },
    topBg: {
      type: String,
      default: require("@/assets/bigScreen/pumpOperation/data_row_bg.png")
    }, // 上行背景图
    bottomBg: {
      type: String,
      default: require("@/assets/bigScreen/pumpOperation/data_row_bg.png")
    } // 下行背景图
  },
  computed: {
    imgTextPositionClass() {
      return `pos-${this.imgTextPosition}`;
    }
  }
};
</script>

<style scoped>
.data-item {
  display: flex;
  align-items: center;
  height: 116px;
  margin-bottom: 10px;
}

/* 左图容器 */
.data-img-wrapper {
  position: relative;
  width: 116px;
  height: 116px;
  flex-shrink: 0;
}

.data-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.img-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
}

.pos-top {
  top: 6px;
}
.pos-center {
  top: 50%;
  transform: translate(-50%, -50%);
}
.pos-bottom {
  bottom: 6px;
}

/* 右侧数据容器 */
.data-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
  /* height: 116px; */
}

/* 上下块背景图 */
.data-top,
.data-bottom {
  width: 158px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin: 4px 0;
  padding: 0 6px;
  box-sizing: border-box;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

/* data-bottom 左右布局 */
.data-top,
.data-bottom {
  justify-content: space-between;
}

.data-bottom-left {
  display: flex;
  align-items: center;
}

/* 字体样式 */
.data-label {
  font-size: 12px;
  margin-right: 4px;
}
.data-value {
  font-size: 18px;
  font-weight: bold;
  margin-right: 4px;
}
.data-unit {
  font-size: 12px;
}
</style>
