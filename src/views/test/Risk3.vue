<template>
  <div class="risk-hazard-container">
    <!-- 顶部工具栏 -->
    <div class="toolbar">
      <div class="dropdown" @click="toggleDropdown">
        <span class="dropdown-text">{{ currentYear }}年</span>
        <div class="dropdown-arrow"></div>
        <div class="dropdown-menu" v-if="isDropdownOpen">
          <div
            v-for="year in years"
            :key="year"
            class="dropdown-item"
            @click="selectYear(year)"
          >
            {{ year }}年
          </div>
        </div>
      </div>
    </div>

    <div class="main">
      <div class="main__container">
        <div class="top">
          <div class="item flex-v-h">
            <div class="item-label">其他类型</div>
            <div class="item-value">06</div>
          </div>
          <div class="item flex-v-h">
            <div class="item-label">设施设备</div>
            <div class="item-value">17</div>
          </div>
        </div>

        <div class="middle">
          <div class="item flex-v-h">
            <div class="item-label">巡查隐患</div>
            <div class="item-value">29</div>
          </div>
          <div class="item flex-v-h">
            <div class="item-label">消防安全</div>
            <div class="item-value">06</div>
          </div>
        </div>
        <div class="down">
          <div class="item flex-v-h">
            <div class="item-label">工程实体</div>
            <div class="item-value">05</div>
          </div>
          <div class="item flex-v-h">
            <div class="item-label">安全防护</div>
            <div class="item-value">02</div>
          </div>
          <!-- total 绝对定位在两个 item 上方 -->
          <div class="total">
            <div class="flex-v-h">
              <div class="total-label">隐患总数</div>
              <div class="total-value">65</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Risk3",
  data() {
    return {
      years: [2023, 2024, 2025, 2026, 2027],
      currentYear: 2025,
      isDropdownOpen: false,
      totalHazards: 65,
      hazardData: {
        2023: 45,
        2024: 53,
        2025: 65,
        2026: 0,
        2027: 0
      },
      categories: [
        { name: "设备设施", value: 17 },
        { name: "消防安全", value: 6 },
        { name: "安全防护", value: 2 },
        { name: "工程实体", value: 5 },
        { name: "巡查信息", value: 29 },
        { name: "其他类型", value: 6 }
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
  background-image: url("../../assets/bigScreen/risk_bg.png");
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

.main {
  position: absolute;
  top: 0;
  left: 0;
  width: 476px;
  height: 481px;
  background-image: url("../../assets/bigScreen/risk_bg.png");
  background-size: cover;
  background-position: center;
  /* 添加半透明遮罩和边框 */
  box-shadow: inset 0 0 0 1000px rgba(16, 55, 102, 0.6);
  border: 1px solid rgba(64, 201, 255, 0.3);
  /* z-index: 1; */
}

.main__container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 20px;
}

.item0 {
  border: 1px solid red;
  position: absolute;
  top: 0;
  left: 0;
  width: 259px;
  height: 107px;
  background-image: url("../../assets/bigScreen/risk_item.png");
  background-size: cover;
  background-position: center;
}
.item {
  /* border: 1px solid red; */
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%; /* 高度撑满父行 */
  background-image: url("../../assets/bigScreen/risk_item.png");
  background-size: cover;
  background-position: center;
  padding: 10px 0;
}

.flex-v-h {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.item-label {
  color: #f3f8fd;
  font-size: 14.8px;
}
.item-value {
  color: #33ccff;
  font-size: 20.35px;
}

.top,
.middle,
.down {
  display: flex;
  justify-content: space-between;
  flex: 1;
  gap: 20px;
}
.top {
  padding: 0 40px;
}
.down {
  padding: 0 30px;
}

.down {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
}

.total {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 8px;
  z-index: 10;
}

.total-label {
  color: #fff;
  font-size: 19.63px;
}

.total-value {
  color: #33ccff;
  font-size: 32px;
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
</style>