<template>
  <div class="dispatch-statistics-container">
    <!-- 背景装饰 -->
    <!-- <div class="background-decor"></div> -->

    <!-- 中央环形进度指示器 -->
    <div class="center-circle">
      <!-- <div class="circle-decoration"></div> -->
      <div class="circle-text">调度统计</div>
    </div>

    <!-- 四个角落的数据展示 -->
    <div class="data-items">
      <div class="data-item top-left">
        <div class="data-value">128</div>
        <div class="data-title">今日总数</div>
      </div>

      <div class="data-item top-right">
        <div class="data-value">96</div>
        <div class="data-title">已完成数</div>
      </div>

      <div class="data-item bottom-left">
        <div class="data-value">32</div>
        <div class="data-title">未完成数</div>
      </div>

      <div class="data-item bottom-right">
        <div class="data-value">3652</div>
        <div class="data-title">历史总数</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DispatchStatistics',
  props: {
    // 允许传入自定义数据
    customData: {
      type: Object,
      default: () => ({
        todayTotal: 128,
        completed: 96,
        pending: 32,
        historyTotal: 3652,
      }),
    },
  },
  data() {
    return {
      // 动画状态
      animationActive: false,
    }
  },
  mounted() {
    // 组件挂载后激活动画
    this.animationActive = true
  },
}
</script>

<style scoped>
/* 容器样式 */
.dispatch-statistics-container {
  width: 100%;
  height: 100%;
  /* background: linear-gradient(135deg, #0a2463 0%, #0f3460 50%, #16213e 100%); */
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 背景装饰 */
.background-decor {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-image: radial-gradient(rgba(30, 64, 175, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px);
  background-size: 50px 50px, 50px 50px, 50px 50px; */
  z-index: 1;
}

/* 中央环形进度指示器 */
.center-circle {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('~@/assets/bigScreen/ProjectOperationManagement/stat_bg2.png') no-repeat center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

/* 环形装饰 */
.circle-decoration1 {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;

  /* background: url('@/assets/bigScreen/ProjectOperationManagement/stat_bg.png') no-repeat center; */
  /* background: conic-gradient(
    #3b82f6 0deg,
    #3b82f6 270deg,
    rgba(59, 130, 246, 0.1) 270deg,
    rgba(59, 130, 246, 0.1) 360deg
  );
  mask: radial-gradient(circle at center, transparent 60%, black 60%);
  -webkit-mask: radial-gradient(circle at center, transparent 60%, black 60%); */
  /* box-shadow: 0 0 30px rgba(59, 130, 246, 0.5); */
  /* animation: rotate 10s linear infinite; */
}

/* 环形内文字 */
.circle-text {
  color: white;
  font-size: 20px;
  font-weight: bold;
  z-index: 1;
  text-align: center;
  text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

/* 四个数据项容器 */
.data-items {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

/* 单个数据项 */
.data-item {
  position: absolute;
  padding: 15px 20px;
  border-radius: 6px;
  /* background: rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease; */
  width: 165px;
  min-width: 165px;
  background: url('~@/assets/bigScreen/ProjectOperationManagement/item_bg.png') no-repeat center;
}

/* 数据项位置 */
.data-item.top-left {
  top: 20px;
  left: 20px;
  margin-left: 16px;
}

.data-item.top-right {
  top: 20px;
  right: 20px;
  /* text-align: right; */
}

.data-item.bottom-left {
  bottom: 20px;
  left: 20px;
  margin-left: 16px;
}

.data-item.bottom-right {
  bottom: 20px;
  right: 20px;
  /* text-align: right; */
}

/* 数据标题 */
.data-title {
  color: #fff;
  font-size: 16px;
  opacity: 0.9;
  padding: 9px 0;
}

.data-value {
  display: inline-block;
  min-width: 80px; /* 保证最短数字也够宽 */
  text-align: center;
  /* padding: 0 8px; */
  color: white;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
  transform: skewX(-20deg);
  background: linear-gradient(to right, #1890ff, #1ee7e7);
  border-radius: 2px;
}

/* 数据项悬停效果 */
.data-item:hover {
  background: rgba(59, 130, 246, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

/* 旋转动画 */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .center-circle {
    width: 150px;
    height: 150px;
  }

  .circle-text {
    font-size: 16px;
  }

  .data-item {
    padding: 10px 15px;
    min-width: 100px;
  }

  .data-value {
    font-size: 20px;
  }

  .data-title {
    font-size: 12px;
  }
}
</style>