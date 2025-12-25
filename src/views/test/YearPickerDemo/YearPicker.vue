<template>
  <div class="year-picker-container">
    <div class="year-picker-wrapper">
      <!-- 左箭头 -->
      <div class="year-picker-arrow left" @click="handlePrev">&lt;</div>
      
      <!-- 年份列表 -->
      <div class="year-picker-list">
        <div 
          v-for="year in years" 
          :key="year"
          class="year-item"
          :class="{ 'active': year === selectedYear }"
          @click="selectYear(year)"
        >
          <div class="year-number">{{ year }}</div>
          <div class="year-dot"></div>
        </div>
      </div>
      
      <!-- 右箭头 -->
      <div class="year-picker-arrow right" @click="handleNext">&gt;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YearPicker',
  props: {
    // 默认选中的年份，不传则使用当前年份
    value: {
      type: Number,
      default: null
    },
    // 起始年份
    startYear: {
      type: Number,
      default: 2014
    },
    // 结束年份
    endYear: {
      type: Number,
      default: new Date().getFullYear()
    },
    // 可见年份数量
    visibleCount: {
      type: Number,
      default: 11
    }
  },
  data() {
    return {
      selectedYear: this.value || new Date().getFullYear(),
      currentStartIndex: 0
    };
  },
  computed: {
    // 生成年份数组
    years() {
      const allYears = [];
      for (let i = this.startYear; i <= this.endYear; i++) {
        allYears.push(i);
      }
      
      // 根据当前起始索引截取可见年份
      const start = this.currentStartIndex;
      const end = this.currentStartIndex + this.visibleCount;
      return allYears.slice(start, end);
    },
    // 是否可以向左滚动
    canPrev() {
      return this.currentStartIndex > 0;
    },
    // 是否可以向右滚动
    canNext() {
      const allYearsCount = this.endYear - this.startYear + 1;
      return this.currentStartIndex + this.visibleCount < allYearsCount;
    }
  },
  watch: {
    // 监听外部value变化
    value(newVal) {
      if (newVal && newVal !== this.selectedYear) {
        this.selectedYear = newVal;
        this.scrollToSelected();
      }
    },
    // 监听选中年份变化
    selectedYear(newVal) {
      this.$emit('input', newVal);
      this.$emit('change', newVal);
    }
  },
  mounted() {
    // 初始化时滚动到选中年份
    this.scrollToSelected();
  },
  methods: {
    // 选择年份
    selectYear(year) {
      this.selectedYear = year;
    },
    // 上一页
    handlePrev() {
      if (this.canPrev) {
        this.currentStartIndex--;
      }
    },
    // 下一页
    handleNext() {
      if (this.canNext) {
        this.currentStartIndex++;
      }
    },
    // 滚动到选中年份
    scrollToSelected() {
      const allYears = [];
      for (let i = this.startYear; i <= this.endYear; i++) {
        allYears.push(i);
      }
      
      const selectedIndex = allYears.indexOf(this.selectedYear);
      if (selectedIndex !== -1) {
        // 如果选中年份不在可见范围内，调整起始索引
        if (selectedIndex < this.currentStartIndex) {
          this.currentStartIndex = selectedIndex;
        } else if (selectedIndex >= this.currentStartIndex + this.visibleCount) {
          this.currentStartIndex = selectedIndex - this.visibleCount + 1;
        }
      }
    }
  }
};
</script>

<style scoped>
.year-picker-container {
  position: relative;
  z-index: 100;
}

.year-picker-wrapper {
  display: flex;
  align-items: center;
  background: linear-gradient(to right, rgba(54, 123, 245, 0.1), rgba(54, 123, 245, 0.3));
  border-radius: 8px;
  padding: 12px 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.year-picker-arrow {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2196F3;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin: 0 4px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.year-picker-arrow:hover {
  background-color: rgba(33, 150, 243, 0.2);
  color: #1976D2;
}

.year-picker-list {
  display: flex;
  align-items: center;
  overflow: hidden;
}

.year-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.year-number {
  font-size: 16px;
  font-weight: 500;
  color: #FFFFFF;
  margin-bottom: 4px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
}

.year-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #FFFFFF;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.year-item.active .year-number {
  color: #FFEB3B;
  font-weight: bold;
  font-size: 18px;
}

.year-item.active .year-dot {
  background-color: #FFEB3B;
  opacity: 1;
  transform: scale(1.2);
  box-shadow: 0 0 8px rgba(255, 235, 59, 0.8);
}

.year-item:hover .year-number {
  color: #FFEB3B;
}

.year-item:hover .year-dot {
  background-color: #FFEB3B;
  opacity: 0.8;
}
</style>