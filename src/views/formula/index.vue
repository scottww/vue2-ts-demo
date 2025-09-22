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
  name: 'FormulaLookup',
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

h1 {
  text-align: center;
  font-size: 22px;
  margin-bottom: 15px;
  color: #2c3e50;
}

/* Tab 样式 */
.tabs {
  display: flex;
  border-bottom: 2px solid #ccc;
  margin-bottom: 15px;
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
  white-space: nowrap;
  flex-shrink: 0;
}

.tab.active {
  background-color: #2c3e50;
  color: #fff;
  font-weight: bold;
}

.tab:hover {
  background-color: #ddd;
}

/* 内容区域 */
.formula-container {
  max-height: 70vh; /* 高度自适应 */
  overflow-y: auto;
  overflow-x: auto; /* 横向滚动 */
  padding-right: 5px;
}

/* 表格优化 */
.formula-container table {
  width: 100%;
  min-width: 600px; /* 防止第一列换行 */
  border-collapse: collapse;
}

.formula-container th,
.formula-container td {
  border: 1px solid #ccc;
  padding: 8px 12px;
  text-align: left;
}

.formula-container th:first-child,
.formula-container td:first-child {
  white-space: nowrap; /* 第一列不换行 */
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 手机端适配 */
@media (max-width: 600px) {
  h1 {
    font-size: 18px;
  }

  .formula-container table {
    font-size: 12px;
  }

  .formula-container th,
  .formula-container td {
    padding: 6px 8px;
  }

  .tab {
    padding: 8px 12px;
  }
}
</style>
