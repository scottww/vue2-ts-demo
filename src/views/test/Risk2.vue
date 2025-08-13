<template>
  <div class="risk-hazard-container">
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

    <!-- 中心统计数据 -->
    <div class="center-statistics">
      <div class="total-hazard">
        <div class="total-label">隐患总数</div>
        <div class="total-value">{{ totalHazards }}</div>
      </div>
    </div>

    <!-- 分类统计选项 -->
    <div class="category-options">
      <div v-for="(category, index) in categories" :key="index" class="category-item">
        <div class="category-icon" :style="{ backgroundColor: category.color }"></div>
        <div class="category-name">{{ category.name }}</div>
        <div class="category-value">{{ category.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Risk2',
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
        { name: '设备设施', value: 17, color: '#FFB74D' },
        { name: '消防安全', value: 6, color: '#4DD0E1' },
        { name: '安全防护', value: 2, color: '#4DB6AC' },
        { name: '工程实体', value: 5, color: '#BA68C8' },
        { name: '巡查信息', value: 29, color: '#64B5F6' },
        { name: '其他类型', value: 6, color: '#90CAF9' }
      ]
    };
  },
  mounted() {
    // 初始化加载数据
    this.loadHazardData();
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectYear(year) {
      this.currentYear = year;
      this.isDropdownOpen = false;
      // 切换年份时重新加载数据
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
/* 基础样式 */
.risk-hazard-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 500px;
  padding: 20px;
  box-sizing: border-box;
  /* 背景图样式 - 使用相同的背景图用于容器和选项 */
  background-image: radial-gradient(circle at center, rgba(64, 201, 255, 0.1) 0%, rgba(10, 25, 41, 0.8) 100%),
                    linear-gradient(to bottom, rgba(10, 25, 41, 0.9), rgba(10, 25, 41, 0.7));
  background-color: #0a1929;
  border-radius: 8px;
  overflow: hidden;
  color: #fff;
  font-family: 'Microsoft YaHei', sans-serif;
}

/* 工具栏样式 */
.toolbar {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px 20px;
  z-index: 20;
}

.dropdown {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: rgba(16, 55, 102, 0.7);
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #1e6bb8;
  /* 应用相同的背景图 */
  background-image: linear-gradient(to right, rgba(16, 55, 102, 0.9), rgba(16, 55, 102, 0.7));
}

.dropdown-text {
  margin-right: 8px;
  font-size: 14px;
}

.dropdown-arrow {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #fff;
  transition: transform 0.3s ease;
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
  z-index: 20;
  /* 应用相同的背景图 */
  background-image: linear-gradient(to bottom, rgba(16, 55, 102, 0.9), rgba(16, 55, 102, 0.7));
}

.dropdown-item {
  padding: 8px 12px;
  font-size: 14px;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: rgba(30, 107, 184, 0.5);
}

/* 中心统计数据样式 */
.center-statistics {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  width: 200px;
  height: 200px;
  /* 应用相同的背景图 */
  background-image: radial-gradient(circle at center, rgba(64, 201, 255, 0.2) 0%, rgba(16, 55, 102, 0.5) 100%);
  border-radius: 50%;
  border: 1px solid rgba(64, 201, 255, 0.3);
}

.total-hazard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.total-label {
  font-size: 18px;
  color: #8cb8e0;
  margin-bottom: 10px;
}

.total-value {
  font-size: 48px;
  font-weight: bold;
  color: #40c9ff;
  text-shadow: 0 0 10px rgba(64, 201, 255, 0.7);
}

/* 分类选项样式 */
.category-options {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 200px;
  box-sizing: border-box;
  z-index: 5;
}

.category-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  margin: 15px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 8px;
  /* 应用相同的背景图 */
  background-image: radial-gradient(circle at center, rgba(64, 201, 255, 0.1) 0%, rgba(16, 55, 102, 0.5) 100%);
  border: 1px solid rgba(64, 201, 255, 0.2);
  transition: all 0.3s ease;
}

.category-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(64, 201, 255, 0.2);
  border-color: rgba(64, 201, 255, 0.5);
}

.category-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-bottom: 10px;
  opacity: 0.8;
}

.category-name {
  font-size: 14px;
  color: #8cb8e0;
  margin-bottom: 5px;
  text-align: center;
}

.category-value {
  font-size: 24px;
  font-weight: bold;
  color: #40c9ff;
}
</style>