<template>
  <div class="metric-scroll-container" ref="scrollContainer">
    <div class="metric-cards-container" ref="scrollContent">
      <div
        v-for="metric in metrics"
        :key="metric.key || metric.label"
        class="metric-card"
        :class="{ 'metric-card--active': metric.active }"
        @click="handleMetricClick(metric)"
      >
        <div class="metric-card__label">{{ metric.label }}</div>
        <div class="metric-card__value">
          <div class="metric-card__number">{{ formatValue(metric.value) }}</div>
          <div class="metric-card__unit">{{ metric.unit || "个" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MetricCardAutoScroll",
  props: {
    customMetrics: { type: Array, default: [] },
    scrollSpeed: { type: Number, default: 0.5 } // 每帧滚动速度(px)
  },
  computed: {
    metrics() {
      return this.customMetrics.length
        ? this.customMetrics
        : Array.from({ length: 500 }).map((_, i) => ({
            label: `指标 ${i + 1}`,
            key: i,
            value: Math.round(Math.random() * 1000),
            unit: "个"
          }));
    }
  },
  mounted() {
    this.startScroll();
  },
  beforeDestroy() {
    cancelAnimationFrame(this.raf);
  },
  methods: {
    handleMetricClick(metric) {
      this.$emit("metric-click", metric);
    },
    formatValue(val, placeholder = "--") {
      return val === null || val === undefined || val === ""
        ? placeholder
        : val;
    },
    startScroll() {
      const container = this.$refs.scrollContainer;
      const content = this.$refs.scrollContent;

      const clone = content.cloneNode(true);
      container.appendChild(clone);

      const loop = () => {
        if (container.scrollTop >= content.scrollHeight) {
          container.scrollTop = 0;
        }
        container.scrollTop += this.scrollSpeed;
        this.raf = requestAnimationFrame(loop);
      };
      this.raf = requestAnimationFrame(loop);
    }
  }
};
</script>

<style scoped>
.metric-scroll-container {
  height: 400px;
  overflow: hidden;
  position: relative;
}
.metric-cards-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.metric-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 10px;
  border-radius: 8px;
  color: #fff;
}
.metric-card__label {
  font-size: 14px;
  margin-bottom: 3px;
}

.metric-card__value {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #fff;
}

.metric-card__number {
  color: #3dbdff;
  font-weight: 600;
}
</style>
