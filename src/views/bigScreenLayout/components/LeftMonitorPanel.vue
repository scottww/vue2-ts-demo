<template>
  <div class="left-monitor-panel">
    <!-- 背景图预留层 -->
    <div class="bg-placeholder"></div>

    <!-- 闸门乐清监控指标 -->
    <div class="module-card">
      <h3>闸门乐清监控指标</h3>
      <div class="gauge-group">
        <div class="gauge">
          <div class="value">160</div>
          <div class="label">设备总数</div>
        </div>
        <ul class="status-list">
          <li><span class="label">在线设备</span><span class="value green">121</span><span class="rate">75%</span></li>
          <li><span class="label">离线设备</span><span class="value orange">27</span><span class="rate">16.9%</span></li>
          <li><span class="label">故障设备</span><span class="value red">12</span><span class="rate">7.5%</span></li>
        </ul>
      </div>
    </div>

    <!-- 智慧监测监测终端 -->
    <div class="module-card">
      <h3>智慧监测监测终端</h3>
      <div class="gauge-group">
        <div class="gauge">
          <div class="value">160</div>
          <div class="label">设备总数</div>
        </div>
        <ul class="status-list">
          <li><span class="label">在线设备</span><span class="value green">121</span><span class="rate">75%</span></li>
          <li><span class="label">离线设备</span><span class="value orange">27</span><span class="rate">16.9%</span></li>
          <li><span class="label">故障设备</span><span class="value red">12</span><span class="rate">7.5%</span></li>
        </ul>
      </div>
    </div>

    <!-- 闸门实时监测 -->
    <div class="module-card">
      <h3>闸门实时监测</h3>
      <div class="status-boxes">
        <div class="box">
          <div class="title">开度</div>
          <div class="value">1.62</div>
          <div class="unit">米</div>
        </div>
        <div class="box">
          <div class="title">流速</div>
          <div class="value">13.26</div>
          <div class="unit">米/秒</div>
        </div>
        <div class="box">
          <div class="title">流量</div>
          <div class="value">13.26</div>
          <div class="unit">立方米</div>
        </div>
        <div class="box">
          <div class="title">闸门数</div>
          <div class="value">10</div>
          <div class="unit">个</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftMonitorPanel'
}
</script>

<style scoped>
.left-monitor-panel {
  position: relative;
  color: #ffffff;
  font-family: 'Microsoft YaHei', sans-serif;
}

/* 背景图预留 */
.bg-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/your-later-bg.png'); /* 预留 */
  background-size: cover;
  background-position: center;
  opacity: 0.15;
  z-index: 0;
}

/* 卡片容器 */
.module-card {
  position: relative;
  z-index: 1;
  background: rgba(0, 102, 204, 0.15);
  border: 1px solid rgba(0, 136, 255, 0.3);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
}

.module-card h3 {
  font-size: 18px;
  margin-bottom: 10px;
  border-left: 4px solid #00ccff;
  padding-left: 10px;
}

/* 仪表组 */
.gauge-group {
  display: flex;
  align-items: center;
  gap: 20px;
}

.gauge .value {
  font-size: 36px;
  color: #00ccff;
  font-weight: bold;
}

.gauge .label {
  text-align: center;
  font-size: 14px;
  color: #ccc;
}

.status-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.status-list li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 14px;
}

.status-list .label {
  color: #aaa;
}

.status-list .value {
  font-weight: bold;
  margin-right: 8px;
}

.status-list .rate {
  color: #999;
}

.green {
  color: #00ff99;
}

.orange {
  color: #ffaa00;
}

.red {
  color: #ff4444;
}

/* 实时状态方块 */
.status-boxes {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.box {
  background: rgba(0, 60, 120, 0.4);
  border: 1px solid rgba(0, 170, 255, 0.4);
  border-radius: 6px;
  flex: 1 1 45%;
  padding: 10px;
  text-align: center;
}

.box .title {
  font-size: 14px;
  margin-bottom: 6px;
  color: #ccc;
}

.box .value {
  font-size: 20px;
  font-weight: bold;
  color: #00ccff;
}

.box .unit {
  font-size: 12px;
  color: #aaa;
}
</style>
