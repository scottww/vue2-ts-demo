<template>
  <div class="alarm-summary-container">
    <!-- 报警总数 -->
    <div class="alarm-count">
      <div class="count-number">{{ computedTotal }}</div>
      <div class="count-label">{{ totalLabel }}</div>
    </div>

    <!-- 动态报警状态 -->
    <div class="alarm-status">
      <div
        v-for="(status, index) in statuses"
        :key="index"
        class="status-item"
      >
        <span
          class="status-dot"
          :style="{ backgroundColor: status.color, boxShadow: `0 0 10px ${status.color}` }"
        ></span>
        <span class="status-text">{{ status.label }}</span>
        <span class="status-count">{{ status.count }}</span>
        <span class="status-unit">{{ unit }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlarmSummaryPanel",
  props: {
    statuses: {
      type: Array,
      default: () => [
        { label: "已处理", count: 0, color: "#4ade80" },
        { label: "未处理", count: 0, color: "#f87171" },
      ],
    },
    total: { type: Number, default: null },
    totalLabel: { type: String, default: "报警总数" },
    unit: { type: String, default: "个" },
  },
  computed: {
    // 如果 total 没传，自动根据状态数组计算总数
    computedTotal() {
      if (this.total !== null) return this.total;
      return this.statuses.reduce((sum, s) => sum + (s.count || 0), 0);
    },
  },
};
</script>

<style scoped>
.alarm-summary-container {
  width: 543px;
  height: 105px;
  background-image: url("~@/assets/bigScreen/pumpOperation/alarm_total_bg.png");
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  position: relative;
}

.alarm-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  width: 85px;
  height: 85px;
}

.count-number {
  font-weight: bold;
  font-size: 26px;
  color: #ffffff;
  text-shadow: 2px 19px 1px #1971d1;
  text-align: center;
}

.count-label {
  font-size: 16px;
  color: #ffffff;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  margin-top: -5px;
}

.alarm-status {
  flex: 1;
  display: flex;
  justify-content: space-around;
  gap: 0px;
  padding: 0 30px;
  z-index: 1;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.status-text {
  font-size: 16px;
  color: #ffffff;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  width: 70px;
}

.status-count {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.status-unit {
  font-size: 16px;
  color: #ffffff;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
</style>
