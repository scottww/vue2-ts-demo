<template>
  <div class="stat-icon-card">
    <!-- 左侧图标 -->
    <div class="icon-wrapper" :style="iconStyle">
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
    iconSize: {
      type: [Number, Array, String],
      default: null
    }
  },
  computed: {
    iconStyle() {
      if (!this.iconSize) return {};
      if (typeof this.iconSize === "number") {
        return { width: this.iconSize + "px", height: this.iconSize + "px" };
      }
      if (Array.isArray(this.iconSize)) {
        return {
          width: this.iconSize[0] + "px",
          height: this.iconSize[1] + "px"
        };
      }
      if (typeof this.iconSize === "string") {
        return { width: this.iconSize, height: this.iconSize };
      }
      return {};
    }
  }
};
</script>

<style scoped>
/* =========================
   主题变量（默认值）
   ========================= */
.stat-icon-card {
  --stat-bg-color: rgba(13, 42, 67, 0.35);
  --stat-border-color: rgba(64, 158, 255, 0.35);
  --stat-title-color: #bcdcff;
  --stat-value-color: #ffd666;
  --stat-unit-color: rgba(255, 214, 102, 0.75);

  display: flex;
  align-items: center;
  padding: 12px 16px;
  box-sizing: border-box;
  background: var(--stat-bg-color);
  border: 1px solid var(--stat-border-color);
}

/* 图标容器 */
.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
}

.icon-wrapper img {
  max-width: 100%;
  max-height: 100%;
}

/* 右侧内容 */
.content {
  display: flex;
  flex-direction: column;
}

/* 标题 */
.title {
  font-size: 14px;
  color: var(--stat-title-color);
  margin-bottom: 6px;
  white-space: nowrap;
}

/* 数值 */
.value-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.value {
  font-size: 26px;
  font-weight: 600;
  color: var(--stat-value-color);
}

.unit {
  font-size: 12px;
  color: var(--stat-unit-color);
}
</style>
