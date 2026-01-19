<template>
  <div class="stat-icon-card">
    <!-- 左侧图标 -->
    <div class="icon-wrapper">
      <img v-if="icon" :src="icon" alt="" />
      <slot name="icon" />
    </div>

    <!-- 右侧内容 -->
    <div class="content">
      <!-- 标题 -->
      <div class="title" :title="title">
        {{ title }}
      </div>

      <!-- 数值 + 单位 -->
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
    /** 标题文字 */
    title: {
      type: String,
      default: ""
    },
    /** 数值 */
    value: {
      type: [String, Number],
      default: 0
    },
    /** 单位 */
    unit: {
      type: String,
      default: ""
    },
    /** 图标地址 */
    icon: {
      type: String,
      default: ""
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
  color: #fff;
}

/* 左侧图标 */
.icon-wrapper {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-wrapper img {
  max-width: 100%;
  max-height: 100%;
}

/* 右侧内容 */
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 标题 */
.title {
  font-size: 14px;
  color: #cce6ff;
  line-height: 1.2;
  margin-bottom: 4px;
  white-space: nowrap;
}

/* 数值行 */
.value-row {
  display: flex;
  align-items: baseline;
  gap: 20px;
}

/* 数值 */
.value {
  font-size: 26px;
  font-weight: bold;
  color: #ffd666;
  line-height: 1;
}

/* 单位 */
.unit {
  font-size: 12px;
  margin-left: 4px;
  color: #ffd666;
}
</style>
