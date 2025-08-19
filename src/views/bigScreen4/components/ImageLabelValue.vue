<template>
  <div class="image-label-value-layout">
    <img
      class="left-image"
      :src="imgSrc"
      alt="左边图片"
      :style="{ width: width + 'px', height: height + 'px' }"
    />
    <div class="right-content">
      <div class="top-text">{{ period }}</div>
      <div class="bottom-text">
        <span class="value">{{ value }}</span>
        <span class="unit">{{ unit }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageLabelValue",
  props: {
    imgSrc: {
      type: String,
      required: true
    },
    period: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    unit: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: 91
    },
    height: {
      type: Number,
      default: 63
    }
  }
};
</script>

<style scoped>
.image-label-value-layout {
  display: flex;
  align-items: center;
  gap: 12px;
}

.left-image {
  object-fit: cover;
  flex-shrink: 0;
  border-radius: 4px;
}

.right-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.top-text {
  font-size: 14px;
  font-weight: 600;
  color: #eeeeff;
}

.bottom-text {
  margin-top: 4px;
}
.value {
  margin-right: 4px;
  font-size: 22px;
  font-weight: 500;
  color: #3dbdff;
}

.unit {
  font-size: 14px;
  color: #3dbdff;
}
</style>
