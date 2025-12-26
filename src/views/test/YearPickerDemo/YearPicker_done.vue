<template>
  <div
    class="year-picker-container"
    :style="{
      background: `url(${images.containerBg}) center/contain no-repeat`
    }"
  >
    <div
      class="year-picker-wrapper"
      :style="{
        background: `url(${images.yearBackground}) center/100% auto no-repeat`
      }"
    >
      <!-- 左箭头 -->
      <div
        class="year-picker-arrow left"
        :class="{ disabled: !canPrev }"
        @click="handlePrev"
        :style="{
          background: `url(${images.leftArrow}) center/contain no-repeat`
        }"
      />

      <!-- 年份时间轴 -->
      <div class="year-picker-list">
        <div
          v-for="year in years"
          :key="year"
          class="year-item"
          :class="{ active: year === selectedYear }"
          @click="selectYear(year)"
        >
          <div
            v-if="year === selectedYear"
            class="selected-year-bg"
            :style="{
              background: `url(${images.selectedYear}) center/contain no-repeat`
            }"
          />
          <div class="year-number">{{ year }}</div>
          <div
            class="year-dot"
            :style="{
              background: `url(${images.yearDot}) center/contain no-repeat`
            }"
          />
        </div>
      </div>

      <!-- 右箭头（复用左箭头旋转） -->
      <div
        class="year-picker-arrow right rotate"
        :class="{ disabled: !canNext }"
        @click="handleNext"
        :style="{
          background: `url(${images.leftArrow}) center/contain no-repeat`
        }"
      />
    </div>
  </div>
</template>

<script>
import leftArrow from "@/assets/images/YearPicker/左边箭头.png";
import rightArrow from "@/assets/images/YearPicker/右边箭头.png";
import yearBackground from "@/assets/images/YearPicker/背景长条2.png";
import selectedYear from "@/assets/images/YearPicker/选中年.png";
import yearDot from "@/assets/images/YearPicker/年下面标签.png";
import containerBg from "@/assets/images/YearPicker/背景图.png";

export default {
  name: "YearPicker",
  props: {
    value: {
      type: Number,
      default: null
    },
    startYear: {
      type: Number,
      default: 2015
    },
    endYear: {
      type: Number,
      default: new Date().getFullYear()
    },
    visibleCount: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      selectedYear: this.value || new Date().getFullYear(),
      images: {
        leftArrow,
        rightArrow,
        yearBackground,
        selectedYear,
        yearDot,
        containerBg
      }
    };
  },
  computed: {
    /** 年份时间轴（始终以选中年为中心） */
    years() {
      const allYears = [];
      for (let i = this.startYear; i <= this.endYear; i++) {
        allYears.push(i);
      }

      const half = Math.floor(this.visibleCount / 2);
      const selectedIndex = allYears.indexOf(this.selectedYear);

      let start = selectedIndex - half;
      let end = selectedIndex + half + 1;

      if (start < 0) {
        start = 0;
        end = this.visibleCount;
      }

      if (end > allYears.length) {
        end = allYears.length;
        start = end - this.visibleCount;
      }

      return allYears.slice(start, end);
    },
    canPrev() {
      return this.selectedYear > this.startYear;
    },
    canNext() {
      return this.selectedYear < this.endYear;
    }
  },
  watch: {
    value(val) {
      if (val && val !== this.selectedYear) {
        this.selectedYear = val;
      }
    },
    selectedYear(val) {
      this.$emit("input", val);
      this.$emit("change", val);
    }
  },
  methods: {
    selectYear(year) {
      this.selectedYear = year;
    },
    handlePrev() {
      if (this.canPrev) this.selectedYear--;
    },
    handleNext() {
      if (this.canNext) this.selectedYear++;
    }
  }
};
</script>

<style scoped>
/* ================== 容器背景 ================== */
.year-picker-container {
  width: 1225px;
  /* width: 100%; */
  height: 82px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 100;
}

/* ================== 时间轴主体 ================== */
.year-picker-wrapper {
  position: relative;
  width: 100%;
  /* width: 1200px; */
  height: 26px;
  display: flex;
  align-items: center;
  /* padding: 0 20px; */
  margin: 0 20px;
}

/* 左右渐隐遮罩（高级感） */
.year-picker-wrapper::before,
.year-picker-wrapper::after {
  content: "";
  position: absolute;
  top: 0;
  width: 60px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.year-picker-wrapper::before {
  left: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.45), transparent);
}

.year-picker-wrapper::after {
  right: 0;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.45), transparent);
}

/* ================== 箭头 ================== */
.year-picker-arrow {
  flex-shrink: 0;
  width: 20px;
  height: 24px;
  margin: 0 10px;
  cursor: pointer;
  transition: opacity 0.3s;
  transform-origin: center;
}

.year-picker-arrow.left {
  margin-left: 10px; /* 距离左边长条 */
}

.year-picker-arrow.right {
  margin-right: 10px; /* 距离右边长条 */
}

.year-picker-arrow.rotate {
  /* transform: rotate(180deg); */
  transform: scaleX(-1);
}

.year-picker-arrow.disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

/* ================== 年份列表 ================== */
.year-picker-list {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 0 20px; */
  margin: 0 30px; /* 给左右箭头留出空间 */
  overflow: hidden;
}

/* ================== 单个年份 ================== */
.year-item {
  flex: 1;
  max-width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: transform 0.25s ease;
}

.year-item:hover {
  transform: translateY(-2px) scale(1.05);
}

/* 选中背景 */
.selected-year-bg {
  position: absolute;
  width: 71px;
  height: 44px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  margin-top: 13px;
  pointer-events: none;
}

/* 年份文字 */
.year-number {
  font-size: 16px;
  color: #fff;
  transition: all 0.3s;
}

.year-item.active .year-number {
  font-size: 18px;
  font-weight: bold;
}

/* 下方点 */
.year-dot {
  width: 22px;
  height: 22px;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.year-item.active .year-dot {
  opacity: 1;
}

.year-item:hover .year-number {
  color: #ffeb3b;
}
</style>
