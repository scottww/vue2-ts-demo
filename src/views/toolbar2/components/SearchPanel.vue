<!-- 含有虚拟滚动 -->
<template>
  <div class="combined-search">
    <!-- 左侧自定义下拉选择类型 -->
    <div class="left-selector" @click.stop>
      <div class="selector-display" @click="toggleTypeDropdown">
        <span class="label">{{ currentLabel }}</span>
        <span class="arrow">{{ showTypeDropdown ? "▴" : "▾" }}</span>
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
        <span class="dropdown-icon">{{ showDropdown ? "▴" : "▾" }}</span>
      </div>

      <!-- 搜索下拉面板 -->
      <!-- <div v-show="showDropdown" class="dropdown-panel">
        <div
          v-for="item in filteredResults"
          :key="item.id"
          class="dropdown-item"
          :class="{ active: item.name === searchQuery }"
          @click="selectItem(item)"
        >
          {{ item.name }}
        </div>
        <div v-if="filteredResults.length === 0" class="no-results">
          无匹配结果
        </div>
      </div> -->

      <!-- 搜索下拉面板（虚拟滚动） -->
      <div v-show="showDropdown" class="dropdown-panel">
        <virtual-list
          ref="virtualList"
          :size="36"
          :keeps="30"
          :data-key="'id'"
          :data-sources="filteredResults"
          :data-component="DropdownItem"
          :extra-props="{ selectedItemId, selectItem }"
          class="virtual-list"
          @select="selectItem"
        >
          <!-- 无需 slot 渲染 -->
          <!-- <template v-slot="{ item }">
            <div
              class="dropdown-item"
              :class="{ active: item.name === searchQuery }"
              @click="selectItem(item)"
            >
              {{ item.name }}
            </div>
          </template> -->
        </virtual-list>

        <div v-if="filteredResults.length === 0" class="no-results">
          无匹配结果
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VirtualList from "vue-virtual-scroll-list";
import DropdownItem from "./DropdownItem.vue";
import { generateData } from "@/utils/generateDataHelper";
export default {
  name: "CombinedSearch",
  components: { VirtualList },
  data() {
    return {
      DropdownItem,
      selectedItemId: null,
      searchType: "location",
      searchQuery: "",
      showDropdown: false,
      showTypeDropdown: false,
      hoverIndex: null,
      typeOptions: [
        { value: "location", label: "点位" },
        { value: "channel", label: "测站" },
        { value: "other", label: "其他" }
      ],
      searchData: {
        location: generateData("点位定位", 10000, 1),
        channel: generateData("测站", 5000, 1),
        other: generateData("其他", 1000, 1)
      }
    };
  },
  computed: {
    placeholderText() {
      const map = {
        location: "搜索点位...",
        channel: "搜索测站...",
        other: "搜索其他..."
      };
      return map[this.searchType];
    },
    currentData() {
      return this.searchData[this.searchType] || [];
    },
    filteredResults() {
      // if (!this.searchQuery) return this.currentData;
      // return this.currentData.filter((item) =>
      //   item.name.includes(this.searchQuery)
      // );
      if (!this.searchQuery) return this.currentData;

      const exactMatch = this.currentData.find(
        (item) => item.name === this.searchQuery
      );
      if (exactMatch) {
        return this.currentData; // 选中项文字刚好完整匹配时，显示全部
      }

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
      this.$nextTick(() => {
        if (this.$refs.virtualList) {
          this.$refs.virtualList.scrollToIndex(0); // 滚动到顶部，触发渲染
          // 或者用 this.$refs.virtualList.forceRender(); 视你用的版本而定
        }
      });
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    toggleTypeDropdown() {
      this.showTypeDropdown = !this.showTypeDropdown;
    },
    selectItem(item) {
      console.log("selectItem", item);
      this.searchQuery = item.name;
      this.selectedItemId = item.id;
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
  height: 38px;
  line-height: 38px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  position: relative;
  overflow: visible; /* 不裁剪溢出内容 */
}

/* 左侧选择类型 */
.left-selector {
  position: relative;
  width: 100px;
  height: 36px;
  border-right: 1px solid #dcdfe6;
  background-color: #f9f9f9;
}

.selector-display {
  padding: 0 12px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
}

.arrow {
  font-size: 12px;
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
  padding: 6px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s;
  height: 36px;
  line-height: 36px;
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
  height: 36px;
  background: #fff;
}

.search-input-container {
  height: 36px;
  display: flex;
  align-items: center;
}

.search-input-container input {
  height: 28px;
  line-height: 28px;
  padding: 0 8px;
  border: none;
  outline: none;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.dropdown-icon {
  padding: 0 10px;
  color: #999;
  cursor: pointer;
  line-height: 36px;
}

.dropdown-panel {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  /* max-height: 200px;
  overflow-y: auto; */
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 10;
}

/* 滚动条美化（和图例一致） */
.dropdown-panel1::-webkit-scrollbar {
  width: 8px;
}
.dropdown-panel1::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 5px;
  border: 2px solid transparent;
  background-clip: content-box;
}
.dropdown-panel1::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
}

.dropdown-item {
  padding: 4px 8px;
  cursor: pointer;
  height: 36px;
  line-height: 36px;
  align-items: center;
  display: flex;
}

.dropdown-item.active {
  background-color: #e6f7ff;
  color: #1890ff;
  font-weight: bold;
}

.dropdown-item:hover {
  background-color: #f5f7fa;
}

.no-results {
  padding: 10px;
  color: #909399;
  text-align: center;
}

/* 加入虚拟滚动 */
.virtual-list {
  max-height: 200px;
  overflow-y: auto;
}
/* 滚动条美化（和图例一致） */
.virtual-list::-webkit-scrollbar {
  width: 8px;
}
.virtual-list::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 5px;
  border: 2px solid transparent;
  background-clip: content-box;
}
.virtual-list::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
}
</style>
