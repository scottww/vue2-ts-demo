<template>
  <div class="stat-icon-card">
    <!-- 左侧图标 -->
    <div
      class="icon-wrapper"
      :style="iconStyle"
    >
      <img v-if="icon" :src="icon" alt="" />
      <slot name="icon" />
    </div>

    <!-- 右侧内容 -->
    <div class="content">
      <div class="title" :title="title">
        {{ title }}
      </div>

      <div class="value-row">
        <span class="value">{{ value }}</span>
        <span class="unit" v-if="unit">{{ unit }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatIconCard",
  props: {
    title: String,
    value: [String, Number],
    unit: String,
    icon: String,

    /**
     * 图标容器尺寸
     * 例：
     * 48
     * [48, 48]
     * '60px'
     */
    iconSize: {
      type: [Number, Array, String],
      default: null
    }
  },
  computed: {
    iconStyle() {
      if (!this.iconSize) return {};

      if (typeof this.iconSize === "number") {
        return {
          width: this.iconSize + "px",
          height: this.iconSize + "px"
        };
      }

      if (Array.isArray(this.iconSize)) {
        return {
          width: this.iconSize[0] + "px",
          height: this.iconSize[1] + "px"
        };
      }

      if (typeof this.iconSize === "string") {
        return {
          width: this.iconSize,
          height: this.iconSize
        };
      }

      return {};
    }
  }
};
</script>

<style scoped>
.stat-icon-card {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  box-sizing: border-box;
  border: 1px solid #4d4d4d;
}

/* 图标容器：不写死尺寸 */
.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
}

/* 关键点：图片永远等比 */
.icon-wrapper img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}

/* 右侧内容 */
.content {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 14px;
  /* color: #cce6ff; */
  margin-bottom: 4px;
  white-space: nowrap;
}

.value-row {
  display: flex;
  align-items: baseline;
  gap: 20px;
}

.value {
  font-size: 26px;
  font-weight: bold;
  color: #ffd666;
}

.unit {
  font-size: 12px;
  margin-left: 4px;
  color: #ffd666;
}
</style>
