<!-- 图片上不带文字 -->
<template>
  <div class="data-item">
    <!-- 左侧图片 -->
    <img :src="img" alt="" />

    <!-- 右侧数据块 -->
    <div class="data-content">
      <!-- 上部分 -->
      <div class="data-top">
        <span class="data-label">{{ top.label }}</span>
        <span class="data-value">{{ top.value }}</span>
        <span class="data-unit">{{ top.unit }}</span>
      </div>
      <!-- 下部分 -->
      <div class="data-bottom">
        <span class="data-label">{{ bottom.label }}</span>
        <span class="data-value">{{ bottom.value }}</span>
        <span class="data-unit">{{ bottom.unit }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataItem",
  props: {
    img: { type: String, required: true }, // 左边图片
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
  }
};
</script>

<style scoped>
.data-item {
  display: flex;
  align-items: center;
  height: 116px;
}

.data-item img {
  width: 116px;
  height: 116px;
  object-fit: contain;
  flex-shrink: 0;
}

/* 右边整体容器 */
.data-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
  height: 116px;
}

/* 上下块：有背景图 */
.data-top,
.data-bottom {
  width: 158px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("~@/assets/bigScreen/pumpOperation/data_row_bg.png") no-repeat center/cover; /* 替换为你的背景 */
  color: #fff;
}

/* 行内 label+value+unit 横排 */
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
