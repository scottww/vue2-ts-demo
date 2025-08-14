<template>
  <div class="dispatch-stats-container">
    <!-- 背景波浪效果 -->
    <div class="wave-background"></div>
    <div class="wave-background wave-2"></div>
    <div class="wave-background wave-3"></div>

    <!-- 统计内容 -->
    <div class="stats-content">
      <!-- 上月调度次数 -->
      <div class="stat-item left-item">
        <div class="stat-label">上月调度次数</div>
        <div class="stat-value">13</div>
        <div class="stat-unit">次</div>
        <div class="stat-change">+16.3%</div>
      </div>

      <!-- 中心今年总调度次数 -->
      <div class="center-circle">
        <div class="center-value">56</div>
        <div class="center-label">今年</div>
        <div class="center-sub-label">调度次数</div>
      </div>

      <!-- 本月调度次数 -->
      <div class="stat-item right-item">
        <div class="stat-label">本月调度次数</div>
        <div class="stat-value">16</div>
        <div class="stat-unit">次</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 可以在这里添加数据属性，用于动态更新
      lastMonth: 13,
      thisMonth: 16,
      currentYear: 56,
      changeRate: 16.3
    };
  },
  mounted() {
    // 添加数字增长动画效果
    this.animateValue();
  },
  methods: {
    animateValue() {
      // 可以在这里实现数字增长动画
      // 实际项目中可以根据需要添加
    }
  }
};
</script>

<style scoped>
/* 主容器样式 */
.dispatch-stats-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 10px;
  margin: 10px 0;
}

/* 波浪背景样式 */
.wave-background {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(10, 50, 100, 0.6)" fill-opacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
  background-size: cover;
  background-position: bottom;
  z-index: 1;
}

.wave-2 {
  opacity: 0.6;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(10, 50, 100, 0.4)" fill-opacity="1" d="M0,192L48,181.3C96,171,192,149,288,149.3C384,149,480,171,576,181.3C672,192,768,192,864,181.3C960,171,1056,149,1152,144C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
  animation: wave-move 15s linear infinite;
}

.wave-3 {
  opacity: 0.4;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(10, 50, 100, 0.3)" fill-opacity="1" d="M0,256L48,245.3C96,235,192,213,288,213.3C384,213,480,235,576,240C672,245,768,235,864,213.3C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
  animation: wave-move 20s linear reverse infinite;
}

/* 内容容器样式 */
.stats-content {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding: 0 50px;
  z-index: 2;
}

/* 统计项样式 */
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

/* 左侧统计项 */
.left-item::after {
  content: '';
  position: absolute;
  right: -30px;
  top: 20%;
  height: 60%;
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.3), transparent);
}

/* 统计标签 */
.stat-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 10px;
}

/* 统计数值 */
.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 10px rgba(100, 200, 255, 0.8);
}

/* 统计单位 */
.stat-unit {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: -5px;
}

/* 变化百分比 */
.stat-change {
  background-color: rgba(255, 69, 0, 0.2);
  color: #ff4500;
  border: 1px solid rgba(255, 69, 0, 0.5);
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 12px;
  margin-top: 8px;
}

/* 中心圆形样式 */
.center-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(50, 150, 255, 0.5), rgba(10, 80, 150, 0.3));
  border: 2px solid rgba(100, 200, 255, 0.7);
  box-shadow: 0 0 20px rgba(50, 150, 255, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 3;
}

/* 中心数值 */
.center-value {
  font-size: 42px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 15px rgba(100, 200, 255, 0.8);
}

/* 中心标签 */
.center-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  margin-top: -5px;
}

/* 中心子标签 */
.center-sub-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

/* 波浪动画 */
@keyframes wave-move {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 1440px;
  }
}
</style>