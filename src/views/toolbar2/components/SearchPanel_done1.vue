<template>
  <div class="combined-search">
    <!-- 左侧自定义下拉选择类型 -->
    <div class="left-selector" @click.stop>
      <div class="selector-display" @click="toggleTypeDropdown">
        <span class="label">{{ currentLabel }}</span>
        <span class="arrow">{{ showTypeDropdown ? '▴' : '▾' }}</span>
      </div>

      <!-- 类型下拉列表 -->
      <div v-show="showTypeDropdown" class="type-dropdown">
        <div
          v-for="(item, index) in typeOptions"
          :key="item.value"
          class="layer-item"
          :class="{ active: item.value === searchType }"
          @click="selectType(item.value)"
          @mouseenter="hoverIndex = index"
          @mouseleave="hoverIndex = null"
        >
          <span class="label">{{ item.label }}</span>
        </div>
      </div>
    </div>

    <!-- 右侧搜索框 -->
    <div class="right-search">
      <div class="search-input-container">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="placeholderText"
          @input="handleSearch"
          @focus="showDropdown = true"
        />
        <span class="dropdown-icon">▾</span>
      </div>

      <!-- 搜索下拉面板 -->
      <div v-show="showDropdown" class="dropdown-panel">
        <div
          v-for="item in filteredResults"
          :key="item.id"
          class="dropdown-item"
          @click="selectItem(item)"
        >
          {{ item.name }}
        </div>
        <div v-if="filteredResults.length === 0" class="no-results">
          无匹配结果
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CombinedSearch",
  data() {
    return {
      searchType: "location",
      searchQuery: "",
      showDropdown: false,
      showTypeDropdown: false,
      hoverIndex: null,
      typeOptions: [
        { value: "location", label: "灌片定位" },
        { value: "channel", label: "干渠" },
        { value: "other", label: "其他" }
      ],
      searchData: {
        location: [
          { id: 1, name: "灌片定位A" },
          { id: 2, name: "灌片定位B" },
          { id: 3, name: "灌片定位C" }
        ],
        channel: [
          { id: 1, name: "干渠1" },
          { id: 2, name: "干渠2" },
          { id: 3, name: "干渠3" }
        ],
        other: [
          { id: 1, name: "其他选项1" },
          { id: 2, name: "其他选项2" }
        ]
      }
    };
  },
  computed: {
    placeholderText() {
      const map = {
        location: "搜索灌片定位...",
        channel: "搜索干渠...",
        other: "搜索其他..."
      };
      return map[this.searchType];
    },
    currentData() {
      return this.searchData[this.searchType] || [];
    },
    filteredResults() {
      if (!this.searchQuery) return this.currentData;
      return this.currentData.filter((item) =>
        item.name.includes(this.searchQuery)
      );
    },
    currentLabel() {
      const item = this.typeOptions.find((i) => i.value === this.searchType);
      return item ? item.label : "";
    }
  },
  methods: {
    handleSearch() {
      if (this.searchQuery) {
        this.showDropdown = true;
      }
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    toggleTypeDropdown() {
      this.showTypeDropdown = !this.showTypeDropdown;
    },
    selectItem(item) {
      this.searchQuery = item.name;
      this.showDropdown = false;
      this.$emit("select", {
        type: this.searchType,
        item: item
      });
    },
    selectType(value) {
      this.searchType = value;
      this.searchQuery = "";
      this.showDropdown = false;
      this.showTypeDropdown = false;
    },
    handleClickOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.showDropdown = false;
        this.showTypeDropdown = false;
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  }
};
</script>

<style scoped>
.combined-search {
  display: flex;
  width: 400px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  /* overflow: hidden; */
  position: relative; /* ✅ 加上这一句 */
}

/* 左侧选择类型 */
.left-selector {
  position: relative;
  width: 100px;
  border-right: 1px solid #dcdfe6;
  background-color: #f9f9f9;
}

.selector-display {
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}

.arrow {
  /* margin-left: 4px;
  transition: transform 0.2s; */
  color: #999;
}

.type-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #dcdfe6;
  border-top: none;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.layer-item {
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s;
}
.layer-item:hover {
  background-color: #f5f5f5;
  color: #1890ff;
}
.layer-item.active {
  background-color: #e6f7ff;
  color: #1890ff;
  font-weight: bold;
}

.label {
  font-size: 14px;
}

/* 右侧搜索框 */
.right-search {
  flex: 1;
  position: relative;
}

.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input-container input {
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
}

.dropdown-icon {
  padding: 0 10px;
  color: #c0c4cc;
  cursor: pointer;
}

.dropdown-panel {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f5f7fa;
}

.no-results {
  padding: 10px;
  color: #909399;
  text-align: center;
}

.type-dropdown1,
.dropdown-panel1 {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  /* ✅ 下面是关键，确保脱离结构流 */
  display: block;
}
</style>
