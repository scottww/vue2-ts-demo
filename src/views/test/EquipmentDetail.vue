<template>
  <div class="equipment-manage-container">
    <div class="main-content">
      <!-- 左侧背景图片 + 文字 -->
      <div class="left-section">
        <img :src="bg" alt="左侧背景" class="left-bg" />
        <div class="left-overlay">
          <div class="count">140</div>
          <div class="label">感知监测</div>
        </div>
      </div>

      <!-- 右侧统计数据 -->
      <div class="right-section">
        <div class="stat-card online">
          <div class="stat-title">在线设备</div>
          <div class="stat-value">109 <span>个</span></div>
          <div class="stat-percentage">75.6%</div>
        </div>
        <div class="stat-card offline">
          <div class="stat-title">离线设备</div>
          <div class="stat-value">23 <span>个</span></div>
          <div class="stat-percentage">16.9%</div>
        </div>
        <div class="stat-card fault">
          <div class="stat-title">故障设备</div>
          <div class="stat-value">8 <span>个</span></div>
          <div class="stat-percentage">7.5%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bg from "@/assets/bigScreen/pumpOperation/equipment_detail_bg.png";
export default {
  name: "EquipmentDetail",
  data() {
    return {
      bg
    };
  }
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
  justify-content: center;
  align-items: center;
  gap: 20px;
}

/* 左侧 */
.left-section {
  width: 230px;
  height: 187px;
  position: relative;
  flex-shrink: 0;
}

.left-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 5px;
}

/* 左侧文字覆盖层 */
.left-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* color: #36CFC9; */
  color: #fff;
  text-align: center;
  pointer-events: none; /* 不影响点击 */
}

.left-overlay .count {
  /* font-size: 36px; */
  font-size: 24px;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(54, 207, 201, 0.5);
}

.left-overlay .label {
  /* font-size: 18px; */
  font-size: 16px;
  margin-top: 5px;
  opacity: 0.8;
}

/* 右侧 */
.right-section {
  display: flex;
  flex-direction: column;
  gap: 15px; /* 卡片上下间距 */
}

/* 每个统计卡片 */
.stat-card {
  width: 288px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  box-sizing: border-box;
}

/* 不同类型背景图 */
.stat-card.online {
  background-image: url("~@/assets/bigScreen/pumpOperation/equipment_online.png");
}

.stat-card.offline {
  background-image: url("~@/assets/bigScreen/pumpOperation/equipment_offline.png");
}

.stat-card.fault {
  background-image: url("~@/assets/bigScreen/pumpOperation/equipment_fault.png");
}

.stat-title {
  font-weight: bold;
}

.stat-value {
  font-weight: bold;
}

.stat-percentage {
  opacity: 0.8;
}
</style>
