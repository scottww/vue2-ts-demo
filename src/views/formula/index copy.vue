<template>
  <div class="app-container">
    <h1>公式管理</h1>

    <!-- 切换按钮 -->
    <div class="btn-group">
      <button
        :class="{ active: currentLevel === 'elementary' }"
        @click="currentLevel = 'elementary'"
      >
        小学
      </button>
      <button
        :class="{ active: currentLevel === 'middle' }"
        @click="currentLevel = 'middle'"
      >
        初中
      </button>
      <button
        :class="{ active: currentLevel === 'high' }"
        @click="currentLevel = 'high'"
      >
        高中
      </button>
    </div>

    <!-- 根据 currentLevel 显示对应组件 -->
    <div class="formula-container">
      <ElementarySchoolFormulaTableVue v-if="currentLevel === 'elementary'" />
      <MiddleSchoolFormulaTableVue v-if="currentLevel === 'middle'" />
      <HighSchoolFormulaTableVue v-if="currentLevel === 'high'" />
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
      currentLevel: 'elementary' // 默认显示小学公式
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.btn-group {
  margin: 20px 0;
}

.btn-group button {
  padding: 8px 16px;
  margin-right: 10px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-group button.active {
  background-color: #2c3e50;
  color: #fff;
  border-color: #2c3e50;
}

.btn-group button:hover {
  background-color: #ddd;
}

.formula-container {
  margin-top: 20px;
}
</style>
