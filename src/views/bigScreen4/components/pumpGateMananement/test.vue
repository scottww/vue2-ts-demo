<template>
  <div class="gate-realtime-container">
    <div class="water-gate-monitor">
      <!-- 闸前信息 -->
      <div class="gate-section">
        <div class="gate-icon-container">
          <div class="gate-icon">
            <div class="gate-name">闸前</div>
            <div class="gate-circle"></div>
          </div>
        </div>
        <div class="gate-data">
          <div class="data-item">
            <span class="data-label">水位</span>
            <span class="data-value">1.62</span>
            <span class="data-unit">m</span>
          </div>
          <div class="data-item">
            <span class="data-label">流量</span>
            <span class="data-value">13.26</span>
            <span class="data-unit">m³/s</span>
          </div>
        </div>
      </div>

      <!-- 闸后信息 -->
      <div class="gate-section">
        <div class="gate-icon-container">
          <div class="gate-icon">
            <div class="gate-name">闸后</div>
            <div class="gate-circle"></div>
          </div>
        </div>
        <div class="gate-data">
          <div class="data-item">
            <span class="data-label">水位</span>
            <span class="data-value">1.62</span>
            <span class="data-unit">m</span>
          </div>
          <div class="data-item">
            <span class="data-label">流量</span>
            <span class="data-value">13.26</span>
            <span class="data-unit">m³/s</span>
          </div>
        </div>
      </div>
    </div>

    <div class="gate-controls">
      <!-- 闸门开度 -->
      <div class="control-section">
        <div class="control-icon-container">
          <div class="control-icon">
            <div class="gate-image"></div>
          </div>
        </div>
        <div class="control-data">
          <span class="control-label">闸门开度</span>
          <div class="control-value-container">
            <span class="control-value">1.25</span>
            <span class="control-unit">m</span>
          </div>
        </div>
      </div>

      <!-- 限制高度 -->
      <div class="control-section">
        <div class="control-icon-container">
          <div class="control-icon">
            <div class="gate-image"></div>
          </div>
        </div>
        <div class="control-data">
          <span class="control-label">限制高度</span>
          <div class="control-value-container">
            <span class="control-value">4.0</span>
            <span class="control-unit">m</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 连接线 -->
    <div class="connection-lines">
      <svg width="100%" height="100%" viewBox="0 0 1000 200" preserveAspectRatio="none">
        <path d="M250,100 C350,150 650,150 750,100" stroke="rgba(100, 200, 255, 0.3)" stroke-width="2" fill="none" />
        <path d="M250,150 C350,200 650,200 750,150" stroke="rgba(100, 200, 255, 0.3)" stroke-width="2" fill="none" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "GateRealtime",
  data() {
    return {
      // 可以在这里添加动态数据
    };
  },
  mounted() {
    // 可以添加初始化逻辑
  },
  methods: {
    // 可以添加方法
  }
};
</script>

<style scoped>
.gate-realtime-container {
  width: 100%;
  height: 100%;
  background-color: #0a1e3c;
  background-image: radial-gradient(circle at center, #143a7c, #0a1e3c);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* 水闸监控部分 */
.water-gate-monitor {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
}

.gate-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gate-icon-container {
  position: relative;
  margin-bottom: 15px;
}

.gate-icon {
  width: 120px;
  height: 120px;
  background: rgba(10, 60, 120, 0.5);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid rgba(100, 200, 255, 0.3);
  box-shadow: 0 0 20px rgba(100, 200, 255, 0.2);
}

.gate-icon::before {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(100, 200, 255, 0.3), transparent);
  z-index: -1;
}

.gate-name {
  font-size: 18px;
  color: #4da6ff;
  margin-bottom: 10px;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(100, 200, 255, 0.5);
}

.gate-circle {
  width: 60px;
  height: 60px;
  border: 2px solid rgba(100, 200, 255, 0.5);
  border-radius: 50%;
  position: relative;
}

.gate-circle::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  background: rgba(10, 60, 120, 0.7);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(100, 200, 255, 0.3);
}

.gate-data {
  background: rgba(10, 30, 60, 0.7);
  border-radius: 8px;
  padding: 10px 20px;
  border: 1px solid rgba(100, 200, 255, 0.3);
  box-shadow: 0 0 10px rgba(100, 200, 255, 0.1);
}

.data-item {
  display: flex;
  align-items: center;
  margin: 8px 0;
}

.data-label {
  color: #a0c4ff;
  margin-right: 10px;
  width: 60px;
}

.data-value {
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(100, 200, 255, 0.5);
}

.data-unit {
  color: #a0c4ff;
  margin-left: 5px;
}

/* 闸门控制部分 */
.gate-controls {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  z-index: 1;
}

.control-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.control-icon-container {
  position: relative;
  margin-bottom: 15px;
}

.control-icon {
  width: 100px;
  height: 100px;
  background: rgba(10, 60, 120, 0.5);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(100, 200, 255, 0.3);
  box-shadow: 0 0 20px rgba(100, 200, 255, 0.2);
}

.gate-image {
  width: 60px;
  height: 60px;
  background: rgba(100, 200, 255, 0.2);
  border-radius: 5px;
  position: relative;
}

.gate-image::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background: rgba(10, 60, 120, 0.7);
  border: 1px solid rgba(100, 200, 255, 0.3);
}

.control-data {
  background: rgba(10, 30, 60, 0.7);
  border-radius: 8px;
  padding: 10px 20px;
  border: 1px solid rgba(100, 200, 255, 0.3);
  box-shadow: 0 0 10px rgba(100, 200, 255, 0.1);
  text-align: center;
}

.control-label {
  color: #a0c4ff;
  display: block;
  margin-bottom: 5px;
}

.control-value-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.control-value {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(100, 200, 255, 0.5);
}

.control-unit {
  color: #a0c4ff;
  margin-left: 5px;
}

/* 连接线 */
.connection-lines {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 50%;
  z-index: 0;
  pointer-events: none;
}

/* 背景效果 */
.gate-realtime-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%231e3a8a' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.3;
  z-index: 0;
}
</style>