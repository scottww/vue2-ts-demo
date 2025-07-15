<template>
  <div class="smart-search-panel">
    <!-- 顶部栏 -->
    <div class="search-bar">
      <select v-model="searchType" class="select-box">
        <option v-for="item in searchTypes" :key="item" :value="item">{{ item }}</option>
      </select>
      <div class="input-box">
        <input
          type="text"
          v-model="keyword"
          placeholder="请输入关键字"
          @input="onInput"
        />
        <span class="arrow">&#9662;</span>
      </div>
      <button class="search-btn" @click="onSearch">🔍</button>
    </div>

    <div class="panel-body">
      <!-- 左侧菜单 -->
      <div class="left-menu">
        <div
          v-for="(item, index) in menus"
          :key="index"
          :class="['menu-item', { active: selectedMenu === item }]"
          @click="selectedMenu = item"
        >
          {{ item }}
        </div>
      </div>

      <!-- 右侧结果区域 -->
      <div class="result-grid" v-if="showDropdown">
        <div
          v-for="(item, index) in filteredResults"
          :key="index"
          class="result-item"
          :class="{ active: selectedResult === item }"
          @mouseenter="hoverIndex = index"
          @mouseleave="hoverIndex = null"
          @click="selectResult(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SmartSearchPanel",
  data() {
    return {
      searchType: "灌片定位",
      searchTypes: ["灌片定位", "模糊搜索"],
      keyword: "",
      selectedMenu: "灌片定位",
      menus: ["模糊搜索", "灌片定位"],
      selectedResult: "",
      hoverIndex: null,
      showDropdown: true,
      results: [
        "***干渠",
        "**干渠",
        "***支渠",
        "**支渠",
        "**灌片",
        "***灌片",
        "**潜片",
        "***潜片",
        "**潜片",
        "***潜片",
        "**支渠",
        "***干渠"
      ]
    };
  },
  computed: {
    filteredResults() {
      if (!this.keyword) return this.results;
      return this.results.filter((item) => item.includes(this.keyword));
    }
  },
  methods: {
    onSearch() {
      this.showDropdown = true;
    },
    onInput() {
      this.showDropdown = true;
    },
    selectResult(item) {
      this.selectedResult = item;
      this.keyword = item;
      this.showDropdown = false;
      this.$emit("select", item);
    }
  }
};
</script>

<style scoped>
.smart-search-panel {
  width: 500px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  font-family: "Microsoft YaHei", sans-serif;
}

/* 顶部栏 */
.search-bar {
  display: flex;
  align-items: center;
  padding: 8px;
}

.select-box {
  height: 30px;
  border: 1px solid #ccc;
  background-color: #f2f2f2;
  border-radius: 4px;
  padding: 0 8px;
}

.input-box {
  position: relative;
  flex: 1;
  margin: 0 8px;
}

.input-box input {
  width: 100%;
  height: 30px;
  padding: 0 28px 0 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-box .arrow {
  position: absolute;
  right: 8px;
  top: 7px;
  font-size: 10px;
  color: #888;
}

.search-btn {
  height: 30px;
  width: 40px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* 主体部分 */
.panel-body {
  display: flex;
  border-top: 1px solid #eee;
}

/* 左侧菜单 */
.left-menu {
  width: 100px;
  border-right: 1px solid #ccc;
  background-color: #fafafa;
}

.menu-item {
  padding: 10px;
  text-align: center;
  cursor: pointer;
}

.menu-item.active {
  background-color: #1890ff;
  color: white;
  font-weight: bold;
}

/* 右侧结果区域 */
.result-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding: 10px;
  background-color: white;
  max-height: 240px;
  overflow-y: auto;
}

.result-item {
  padding: 6px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
  color: #333;
}

.result-item:hover,
.result-item.active {
  background-color: #1890ff;
  color: white;
  font-weight: 500;
}
</style>
