<template>
  <div class="dispatch-stats-container">
    <div class="wave-background"></div>

    <!-- 统计内容 -->
    <div class="stats-content">
      <!-- 上月调度次数 -->
      <div class="stat-item left-item">
        <div class="stat-label">上月调度次数</div>
        <div class="stat-value-box">
          <span class="stat-value">13</span>
          <span class="stat-unit">次</span>
        </div>
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
        <div class="stat-value-box">
          <span class="stat-value">16</span>
          <span class="stat-unit">次</span>
        </div>
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
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
}

/* 波浪背景样式 */
.wave-background {
  position: absolute;
  width: 100%;
  height: 170px;
  background: url("../../../assets/bigScreen/floodDispatch_bg.png");
  /* background-position: bottom; */
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
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
  content: "";
  position: absolute;
  right: -30px;
  top: 20%;
  height: 60%;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
}

/* 统计标签 */
.stat-label {
  /* font-size: 14px; */
  /* color: rgba(255, 255, 255, 0.8); */
  margin-bottom: 10px;
  font-size: 18px;
  color: #ffffff;
  line-height: 20px;
}

.stat-value-box {
  width: 100%;
  display: flex;
  justify-content: center;
}

/* 统计数值 */
.stat-value {
  /* font-size: 32px;
  font-weight: bold; */
  /* color: #fff; */
  text-shadow: 0 0 10px rgba(100, 200, 255, 0.8);

  font-size: 24px;
  color: #33ccff;
  /* line-height: 20px; */
  flex: 1;
}

/* 统计单位 */
.stat-unit {
  font-size: 14px;
  /* color: rgba(255, 255, 255, 0.6); */
  margin-top: 10px;

  color: #ffffff;
  /* line-height: 20px; */
  flex: 1;
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
  /* background: radial-gradient(circle at center, rgba(50, 150, 255, 0.5), rgba(10, 80, 150, 0.3));
  border: 2px solid rgba(100, 200, 255, 0.7);
  box-shadow: 0 0 20px rgba(50, 150, 255, 0.5); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  left: -5px;
  z-index: 3;
}

/* 中心数值 */
.center-value {
  /* font-size: 42px; */
  /* font-weight: bold; */
  /* color: #fff; */
  text-shadow: 0 0 15px rgba(100, 200, 255, 0.8);

  font-weight: bold;
  font-size: 34px;
  color: #33ccff;
  line-height: 30px;
}

/* 中心标签 */
.center-label {
  /* font-size: 14px; */
  /* color: rgba(255, 255, 255, 0.9); */
  margin-top: 6px;

  font-size: 16px;
  color: #ffffff;
  line-height: 20px;
}

/* 中心子标签 */
.center-sub-label {
  /* font-size: 12px; */
  /* color: rgba(255, 255, 255, 0.7); */

  font-size: 16px;
  color: #ffffff;
  line-height: 20px;
}
</style>