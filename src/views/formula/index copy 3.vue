<template>
  <div class="app-container">
    <h1>数学公式速查</h1>

    <!-- Tab 切换 -->
    <div class="tabs">
      <div
        class="tab"
        :class="{ active: currentLevel === 'elementary' }"
        @click="switchTab('elementary')"
      >
        小学
      </div>
      <div
        class="tab"
        :class="{ active: currentLevel === 'middle' }"
        @click="switchTab('middle')"
      >
        初中
      </div>
      <div
        class="tab"
        :class="{ active: currentLevel === 'high' }"
        @click="switchTab('high')"
      >
        高中
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="formula-container" ref="formulaContainer">
      <ElementarySchoolFormulaTableVue
        v-show="currentLevel === 'elementary'"
      />
      <MiddleSchoolFormulaTableVue
        v-show="currentLevel === 'middle'"
      />
      <HighSchoolFormulaTableVue
        v-show="currentLevel === 'high'"
      />
    </div>
  </div>
</template>

<script>
import ElementarySchoolFormulaTableVue from './ElementarySchoolFormulaTable.vue'
import MiddleSchoolFormulaTableVue from './MiddleSchoolFormulaTable.vue'
import HighSchoolFormulaTableVue from './HighSchoolFormulaTable.vue'

export default {
  name: 'FormulaManager',
  components: {
    ElementarySchoolFormulaTableVue,
    MiddleSchoolFormulaTableVue,
    HighSchoolFormulaTableVue
  },
  data() {
    return {
      currentLevel: 'elementary', // 默认显示小学公式
      scrollPositions: {
        elementary: 0,
        middle: 0,
        high: 0
      }
    }
  },
  methods: {
    switchTab(level) {
      // 保存当前滚动位置
      this.scrollPositions[this.currentLevel] =
        this.$refs.formulaContainer.scrollTop

      // 切换标签
      this.currentLevel = level

      // 恢复切换后组件的滚动位置
      this.$nextTick(() => {
        this.$refs.formulaContainer.scrollTop =
          this.scrollPositions[level] || 0
      })
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 10px;
  font-family: Arial, sans-serif;
}

.tabs {
  display: flex;
  border-bottom: 2px solid #ccc;
  margin-bottom: 10px;
  overflow-x: auto; /* 手机横向滑动 */
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin-right: 5px;
  background-color: #f0f0f0;
  transition: all 0.2s;
  white-space: nowrap; /* 防止换行 */
  flex-shrink: 0; /* 保持宽度 */
}

.tab.active {
  background-color: #2c3e50;
  color: #fff;
  font-weight: bold;
}

.tab:hover {
  background-color: #ddd;
}

.formula-container {
  max-height: 70vh; /* 手机屏幕自适应高度 */
  overflow-y: auto;
  padding-right: 5px; /* 避免滚动条覆盖内容 */
}

/* 手机端表格自适应 */
@media (max-width: 600px) {
  .formula-container table {
    width: 100%;
    font-size: 12px;
  }

  .formula-container th,
  .formula-container td {
    padding: 6px 8px;
  }

  h1 {
    font-size: 18px;
  }

  .tab {
    padding: 8px 12px;
  }
}
</style>
