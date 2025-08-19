<template>
  <div class="data-item">
    <!-- 左侧图片 + 覆盖文字 -->
    <div class="data-img-wrapper">
      <img :src="img" alt="" />
      <span class="img-text" :class="imgTextPositionClass">{{ imgText }}</span>
    </div>

    <!-- 右侧数据块 -->
    <div class="data-content">
      <div class="data-top">
        <div class="data-top-left">
          <span class="data-label">{{ bottom.label }}</span>
          <span class="data-value">{{ bottom.value }}</span>
        </div>
        <span class="data-unit">{{ bottom.unit }}</span>
      </div>
      <div class="data-bottom">
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
    img: { type: String, required: true },
    imgText: { type: String, default: "" },
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
    }
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
}

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

/* 文字位置 */
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

/* 右侧数据块 */
.data-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
  /* height: 116px; */
}

.data-top,
.data-bottom {
  width: 158px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: url("~@/assets/bigScreen/pumpOperation/data_row_bg.png") no-repeat
    center/cover;
  color: #fff;
  margin: 4px 0;
  padding: 0 6px;
}

/* 左侧 label + value */
.data-top-left, .data-bottom-left {
  display: flex;
  align-items: center;
}

.data-label {
  font-size: 12px;
  margin-right: 4px;
}

.data-value {
  font-size: 18px;
  font-weight: bold;
}
.data-unit {
  font-size: 12px;
}
</style>
