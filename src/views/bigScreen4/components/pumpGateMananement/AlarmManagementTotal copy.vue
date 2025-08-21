<template>
  <div class="alarm-summary-container">
    <div class="alarm-count">
      <div class="count-number">{{ totalAlarms }}</div>
      <div class="count-label">报警总数</div>
    </div>
    <div class="alarm-status">
      <div class="status-item resolved">
        <span class="status-dot resolved-dot"></span>
        <span class="status-text">已解除</span>
        <span class="status-separator">--</span>
        <span class="status-count">{{ resolvedAlarms }}</span>
        <span class="status-unit">个</span>
      </div>
      <div class="status-item unresolved">
        <span class="status-dot unresolved-dot"></span>
        <span class="status-text">未解除</span>
        <span class="status-separator">--</span>
        <span class="status-count">{{ unresolvedAlarms }}</span>
        <span class="status-unit">个</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'AlarmSummaryPanel',
  data() {
    return {
      totalAlarms: 31, // 报警总数
      resolvedAlarms: 15, // 已解除报警数
      unresolvedAlarms: 16, // 未解除报警数
    };
  },
  methods: {
    // 可用于从父组件更新报警数据
    updateAlarmData(data) {
      this.totalAlarms = data.total || 0;
      this.resolvedAlarms = data.resolved || 0;
      this.unresolvedAlarms = data.unresolved || 0;
    },
  },
};
</script>

<style scoped>
/* 容器样式 */
.alarm-summary-container {
  width: 543px; /* 背景图宽度 */
  height: 105px; /* 背景图高度 */
  background-image: url('~@/assets/bigScreen/pumpOperation/alarm_total_bg.png'); /* 替换为实际背景图片路径 */
  background-size: cover; /* 确保背景图覆盖整个容器 */
  background-position: center; /* 背景图居中显示 */
  border-radius: 8px; /* 圆角边框 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  box-sizing: border-box;
  position: relative;
}

/* 报警总数样式 */
.alarm-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.count-number {
  font-size: 48px; /* 增大数字大小 */
  font-weight: bold;
  color: #ffffff;
  font-family: 'Arial', sans-serif;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.count-label {
  font-size: 16px;
  color: #ffffff;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  margin-top: -5px; /* 调整与数字的间距 */
}

/* 报警状态样式 */
.alarm-status {
  display: flex;
  flex-direction: column;
  gap: 15px;
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

.resolved-dot {
  background-color: #4ade80; /* 绿色 */
  box-shadow: 0 0 10px #4ade80;
}

.unresolved-dot {
  background-color: #f87171; /* 红色 */
  box-shadow: 0 0 10px #f87171;
}

.status-text {
  font-size: 16px;
  color: #ffffff;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  width: 70px;
}

.status-separator {
  font-size: 16px;
  color: #ffffff;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.status-count {
  font-size: 18px;
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