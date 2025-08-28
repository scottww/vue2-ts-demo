<template>
  <div class="metric-cards-container">
    <div
      v-for="(metric, index) in metrics"
      :key="index"
      class="metric-card"
      :class="{ 'metric-card--active': metric.active }"
      @click="handleMetricClick(metric)"
    >
      <div class="metric-card__label">{{ metric.label }}</div>

      <!-- 可选图标 -->
      <!--
      <div class="metric-card__icon">
        <div class="metric-card__dashes">
          <span class="metric-card__dash"></span>
          <span class="metric-card__dash"></span>
        </div>
        <i class="metric-card__arrow-up"></i>
      </div>
      -->

      <div class="metric-card__value">
        <div class="metric-card__number">{{ formatValue(metric.value) }}</div>
        <div class="metric-card__unit">个</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MetricCard",
  props: {
    customMetrics: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      defaultMetrics: [
        { label: "水平位移", key: "displacement", value: "500", unit: "个" },
        { label: "沉降", key: "settlement", value: "1000000", unit: "个" },
        { label: "渗压", key: "seepage", value: "5", unit: "个" }
      ]
    };
  },
  computed: {
    metrics() {
      return this.customMetrics.length > 0
        ? this.customMetrics
        : this.defaultMetrics;
    }
  },
  methods: {
    handleMetricClick(metric) {
      this.$emit("metric-click", metric);
    },
    formatValue(val, placeholder = "--") {
      return val === null || val === undefined || val === ""
        ? placeholder
        : val;
    }
  }
};
</script>

<style scoped>
.metric-cards-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 15px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;
}

.metric-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 2;
  cursor: pointer;
  padding: 10px 30px;
  transition: all 0.3s ease;
  background-image: url("~@/assets/bigScreen/ProjectOperationManagement/item_bg2.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

/* 选中状态 */
.metric-card--active {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url("~@/assets/bigScreen/ProjectOperationManagement/item_bg2.png");
}

.metric-card__label {
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
}

.metric-card__icon {
  display: flex;
  align-items: center;
  gap: 8px;
}

.metric-card__value1 {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
}

.metric-card__number1,
.metric-card__unit1 {
  display: flex;
  align-items: center;
}

.metric-card__number1 {
  color: #3dbdff;
}

.metric-card__value {
  display: flex;
  align-items: center;
  gap: 4px; /* 数字和单位间距 */
  color: #fff;
}

.metric-card__number {
  min-width: 40px; /* 根据需要设定最小宽度 */
  max-width: 80px; /* 可以防止太长撑破布局，可选 */
  /* text-align: right; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 超长数字显示省略号 */
  font-weight: 600;
  font-size: 18px;
  color: #3dbdff;
}

.metric-card__unit {
  width: 20px; /* 固定宽度 */
  text-align: left;
  font-size: 14px;
  color: #fff;
}

/* 波浪背景效果 */
.metric-cards-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      rgba(255, 255, 255, 0.05) 25%,
      rgba(255, 255, 255, 0.05) 26%,
      transparent 27%,
      transparent 74%,
      rgba(255, 255, 255, 0.05) 75%,
      rgba(255, 255, 255, 0.05) 76%,
      transparent 77%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      rgba(255, 255, 255, 0.05) 25%,
      rgba(255, 255, 255, 0.05) 26%,
      transparent 27%,
      transparent 74%,
      rgba(255, 255, 255, 0.05) 75%,
      rgba(255, 255, 255, 0.05) 76%,
      transparent 77%,
      transparent
    );
  background-size: 50px 50px;
  opacity: 0.1;
  pointer-events: none;
  z-index: 1;
}

/* 响应式 */
@media (max-width: 768px) {
  .metric-cards-container {
    flex-direction: column;
    padding: 10px;
  }

  .metric-card {
    padding: 8px 20px;
    width: 100%;
  }

  .metric-card__label {
    font-size: 14px;
  }
}
</style>
