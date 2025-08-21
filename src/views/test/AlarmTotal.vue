<template>
  <div class="alarm-summary-container">
    <div class="alarm-count">
      <div class="count-circle">
        <span class="count-number">{{ totalAlarms }}</span>
      </div>
      <span class="count-label">报警总数</span>
    </div>
    <div class="alarm-status">
      <div class="status-item resolved">
        <span class="status-dot resolved-dot"></span>
        <span class="status-text">已解除</span>
        <span class="status-count">{{ resolvedAlarms }}</span>
        <span class="status-unit">个</span>
      </div>
      <div class="status-item unresolved">
        <span class="status-dot unresolved-dot"></span>
        <span class="status-text">未解除</span>
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
  background-color: #1e3a8a; /* 蓝色背景 */
  background-image: linear-gradient(135deg, #1e40af, #1e3a8a); /* 渐变背景 */
  border-radius: 8px; /* 圆角边框 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

/* 添加装饰元素 */
.alarm-summary-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></svg>'); */
  opacity: 0.3;
  z-index: 0;
}

/* 报警总数样式 */
.alarm-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.count-circle {
  width: 60px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

.count-number {
  font-size: 28px;
  font-weight: bold;
  color: #ffffff;
  font-family: 'Arial', sans-serif;
}

.count-label {
  margin-top: 5px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

/* 报警状态样式 */
.alarm-status {
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 10px;
  height: 10px;
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
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  width: 60px;
}

.status-count {
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
}

.status-unit {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}
</style>