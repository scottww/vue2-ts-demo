<template>
  <div class="combined-search">
    <!-- 左侧下拉选择器 -->
    <div class="left-selector">
      <select v-model="searchType" class="type-selector">
        <option value="location">灌片定位</option>
        <option value="channel">干渠</option>
        <option value="other">其他</option>
      </select>
    </div>
    
    <!-- 右侧搜索输入+下拉 -->
    <div class="right-search">
      <div class="search-input-container" @click="toggleDropdown">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="placeholderText"
          @input="handleSearch"
          @focus="showDropdown = true"
        />
        <span class="dropdown-icon">▼</span>
      </div>
      
      <!-- 下拉结果面板 -->
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
  name: 'CombinedSearch',
  data() {
    return {
      searchType: 'location', // 当前搜索类型
      searchQuery: '',        // 搜索关键词
      showDropdown: false,   // 是否显示下拉面板
      searchData: {
        location: [
          { id: 1, name: '灌片定位A' },
          { id: 2, name: '灌片定位B' },
          { id: 3, name: '灌片定位C' }
        ],
        channel: [
          { id: 1, name: '干渠1' },
          { id: 2, name: '干渠2' },
          { id: 3, name: '干渠3' }
        ],
        other: [
          { id: 1, name: '其他选项1' },
          { id: 2, name: '其他选项2' }
        ]
      }
    }
  },
  computed: {
    // 当前类型的placeholder文本
    placeholderText() {
      const map = {
        location: '搜索灌片定位...',
        channel: '搜索干渠...',
        other: '搜索其他...'
      }
      return map[this.searchType]
    },
    // 当前类型的数据
    currentData() {
      return this.searchData[this.searchType] || []
    },
    // 过滤后的结果
    filteredResults() {
      if (!this.searchQuery) return this.currentData
      return this.currentData.filter(item =>
        item.name.includes(this.searchQuery)
      )
    }
  },
  methods: {
    // 处理搜索输入
    handleSearch() {
      if (this.searchQuery) {
        this.showDropdown = true
      }
    },
    // 切换下拉面板显示
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    // 选择结果项
    selectItem(item) {
      this.searchQuery = item.name
      this.showDropdown = false
      this.$emit('select', {
        type: this.searchType,
        item: item
      })
    },
    // 点击外部关闭下拉
    handleClickOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.showDropdown = false
      }
    }
  },
  watch: {
    // 切换搜索类型时重置搜索
    searchType() {
      this.searchQuery = ''
      this.showDropdown = false
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>

<style scoped>
.combined-search {
  display: flex;
  width: 400px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
}

.left-selector {
  flex: 0 0 100px;
}

.type-selector {
  width: 100%;
  height: 100%;
  padding: 10px;
  border: none;
  outline: none;
  border-right: 1px solid #dcdfe6;
  appearance: none;
  background: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e") no-repeat;
  background-position: right 10px center;
  background-size: 1em;
  cursor: pointer;
}

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
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
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
</style>