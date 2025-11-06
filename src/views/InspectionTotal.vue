<template>
  <div class="monitor-panel">
    <!-- 背景条 -->
    <div class="background-bar">
      <!-- 巡查养护标题 -->
      <div class="inspection-title">巡查养护</div>

      <!-- 2*2 文字布局 -->
      <div class="text-grid">
        <div class="text-item">
          <span class="number">{{ formatterValue(inspectionsTotal) }}</span>
          <span class="unit">次</span>
          <span class="label">巡检总数</span>
        </div>
        <div class="text-item">
          <span class="label">养护总数</span>
          <span class="number">{{ formatterValue(maintenanceTotal) }}</span>
          <span class="unit">次</span>
        </div>
        <div class="text-item">
          <span class="number">{{ formatterValue(todayInspection) }}</span>
          <span class="unit">次</span>
          <span class="label">今日巡检数</span>
        </div>
        <div class="text-item">
          <span class="label">今日养护数</span>
          <span class="number">{{ formatterValue(todayMaintenance) }}</span>
          <span class="unit">次</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InspectionTotal',
  props: {
    // 可以自定义数据
    inspectionsTotal: {
      type: [Number, String],
      default: null,
    },
    maintenanceTotal: {
      type: [Number, String],
      default: null,
    },
    todayInspection: {
      type: [Number, String],
      default: null,
    },
    todayMaintenance: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      // 组件内部数据
    }
  },
  methods: {
    formatterValue(val, placeholder = '--') {
      return val === null || val === undefined || val === '' ? placeholder : val
    },
  },
}
</script>

<style scoped>
.monitor-panel {
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-bar {
  /* background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); */
  background: url('@/assets/normalScreen/ProjectOperationManagement/total_bg.png') no-repeat center
    center;
  background-size: cover;
  border-radius: 8px;
  /* padding: 15px; */
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); */
  width: 100%;
  height: 154px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* 巡查养护标题样式 */
.inspection-title {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translate(-50%, -50%);
  font-size: 16px;
  /* font-weight: bold; */
  color: #ffffff;
  /* background: rgba(0, 0, 0, 0.5); */
  padding: 5px 15px;
  border-radius: 20px;
  z-index: 10;
}

.text-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 5px 120px;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 100%;
  z-index: 5;
}

.text-item {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
  border-radius: 6px;
  /* width: 100%; */
  transition: all 0.3s ease;
}

.text-item:hover {
  /* background: rgba(255, 255, 255, 0.15); */
  /* transform: translateY(-2px); */
}

.number {
  font-size: 24px;
  font-weight: bold;
  color: #01f0f5;
  line-height: 1.2;
  display: inline-block;
  vertical-align: bottom;
}

.label {
  font-size: 16px;
  color: #fff;
  display: inline-block;
  vertical-align: bottom;
}

.unit {
  font-size: 12px;
  color: #01f0f5;
  display: inline-block;
  vertical-align: bottom;
  margin-bottom: -7px;
}
</style>