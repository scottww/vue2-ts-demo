<template>
  <div class="risk-hazard-container">
    <!-- 主背景图 -->
    <div class="background-image"></div>

    <!-- 顶部工具栏 -->
    <div class="toolbar">
      <div class="dropdown" @click="toggleDropdown">
        <span class="dropdown-text">{{ currentYear }}年</span>
        <div class="dropdown-arrow"></div>
        <div class="dropdown-menu" v-if="isDropdownOpen">
          <div v-for="year in years" :key="year"
               class="dropdown-item" @click="selectYear(year)">{{ year }}年</div>
        </div>
      </div>
    </div>

    <div class="main">
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'RiskHazardComponent',
  data() {
    return {
      years: [2023, 2024, 2025, 2026, 2027],
      currentYear: 2025,
      isDropdownOpen: false,
      totalHazards: 65,
      hazardData: {
        '2023': 45,
        '2024': 53,
        '2025': 65,
        '2026': 0,
        '2027': 0
      },
      categories: [
        { name: '设备设施', value: 17 },
        { name: '消防安全', value: 6 },
        { name: '安全防护', value: 2 },
        { name: '工程实体', value: 5 },
        { name: '巡查信息', value: 29 },
        { name: '其他类型', value: 6 }
      ]
    };
  },
  mounted() {
    this.loadHazardData();
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectYear(year) {
      this.currentYear = year;
      this.isDropdownOpen = false;
      this.loadHazardData();
    },
    loadHazardData() {
      // 模拟API调用
      setTimeout(() => {
        this.totalHazards = this.hazardData[this.currentYear] || 0;
      }, 500);
    }
  }
};
</script>

<style scoped>
/* 基础容器样式 */
.risk-hazard-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 500px;
  overflow: hidden;
  border-radius: 8px;
}

/* 主背景图 - 使用绝对定位覆盖整个容器 */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/bigScreen/risk_bg.png');
  background-size: cover;
  background-position: center;
  z-index: 0;
  /* 添加半透明遮罩，使文字更清晰 */
  box-shadow: inset 0 0 0 1000px rgba(10, 25, 41, 0.7);
}

/* 顶部工具栏 */
.toolbar {
  position: absolute;
  top: 0;
  right: 0;
  padding: 15px 20px;
  z-index: 20;
}

.dropdown {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: rgba(16, 55, 102, 0.8);
  padding: 8px 15px;
  border-radius: 4px;
  border: 1px solid #1e6bb8;
}

.dropdown-text {
  margin-right: 10px;
  font-size: 14px;
  color: #fff;
}

.dropdown-arrow {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #fff;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 5px;
  background-color: rgba(16, 55, 102, 0.9);
  border: 1px solid #1e6bb8;
  border-radius: 4px;
  width: 100px;
  z-index: 30;
}

.dropdown-item {
  padding: 8px 12px;
  font-size: 14px;
  color: #fff;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: rgba(30, 107, 184, 0.5);
}

/* 中心隐患总数 */
.center-total {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  text-align: center;
}

.total-label {
  font-size: 20px;
  color: #8cb8e0;
  margin-bottom: 10px;
}

.total-value {
  font-size: 56px;
  font-weight: bold;
  color: #40c9ff;
  text-shadow: 0 0 15px rgba(64, 201, 255, 0.7);
}

/* 统计选项网格 */
.stats-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  padding: 40px;
  box-sizing: border-box;
  z-index: 5;
}

/* 统计选项项 */
.stat-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 8px;
  overflow: hidden;
}

/* 统计选项背景图 - 与主背景图相同 */
.stat-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/bigScreen/risk_item.png');
  background-size: cover;
  background-position: center;
  /* 添加半透明遮罩和边框 */
  box-shadow: inset 0 0 0 1000px rgba(16, 55, 102, 0.6);
  border: 1px solid rgba(64, 201, 255, 0.3);
  z-index: 1;
}

/* 统计选项内容 */
.stat-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  text-align: center;
}

.stat-name {
  font-size: 16px;
  color: #8cb8e0;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #40c9ff;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  .total-value {
    font-size: 48px;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 1fr);
  }
}
</style>