<template>
  <div class="equipment-manage-container">
    <div class="main-content">
      <!-- 左侧背景图片和文字 -->
      <div class="left-section">
        <div class="background-rect">
          <div class="text-primary">感知监测</div>
        </div>
      </div>

      <!-- 右侧统计数据 -->
      <div class="right-section">
        <div class="stat-card online">
          <div class="stat-title">在线设备</div>
          <div class="stat-value">109</div>
          <div class="stat-percentage">75.6%</div>
        </div>
        <div class="stat-card offline">
          <div class="stat-title">离线设备</div>
          <div class="stat-value">23</div>
          <div class="stat-percentage">16.9%</div>
        </div>
        <div class="stat-card fault">
          <div class="stat-title">故障设备</div>
          <div class="stat-value">8</div>
          <div class="stat-percentage">7.5%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EquipmentDetail',
};
</script>

<style scoped>
.equipment-manage-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #0f2c59, #1c4587);
  padding: 20px;
  box-sizing: border-box;
  color: #fff;
}

.main-content {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}

.left-section {
  flex: 0 0 230px; /* 固定宽度 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.background-rect {
  width: 230px;
  height: 187px;
  background: rgba(54, 207, 201, 0.1);
  border: 2px solid rgba(54, 207, 201, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 10px;
}

.text-primary {
  font-size: 24px;
  font-weight: bold;
  color: #36CFC9;
  text-shadow: 0 0 5px rgba(54, 207, 201, 0.5);
}

.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 50px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 20px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.stat-title {
  font-size: 16px;
  opacity: 0.8;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.stat-title::before {
  content: '';
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
}

.stat-card.online .stat-title::before {
  background-color: #36CFC9;
}

.stat-card.offline .stat-title::before {
  background-color: #FF7D00;
}

.stat-card.fault .stat-title::before {
  background-color: #F53F3F;
}

.stat-value {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-card.online .stat-value {
  color: #36CFC9;
}

.stat-card.offline .stat-value {
  color: #FF7D00;
}

.stat-card.fault .stat-value {
  color: #F53F3F;
}

.stat-percentage {
  font-size: 14px;
  opacity: 0.7;
}
</style>
