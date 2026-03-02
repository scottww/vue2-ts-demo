<template>
  <div class="expandable-select" :class="{ disabled: isDisabled }">
    <div class="select-wrapper">
      <!-- 全选项 -->
      <div
        class="select-option"
        :class="{
          selected: isAllSelected,  // 全选选项的选中状态
          disabled: isOptionDisabled('all')
        }"
        @click="isOptionDisabled('all') ? null : toggleSelection('all')"
        :style="{
          cursor: isOptionDisabled('all') ? 'not-allowed' : 'pointer',
          opacity: isOptionDisabled('all') ? 0.5 : 1
        }"
      >
        <span>全部</span>
      </div>

      <!-- 显示其他选项 -->
      <div
        v-for="(option, index) in visibleOptions"
        :key="index"
        class="select-option"
        :class="{
          selected: selectedOptions.includes(option.value),
          disabled: isOptionDisabled(option.value)
        }"
        @click="isOptionDisabled(option.value) ? null : toggleSelection(option.value)"
        :style="{
          cursor: isOptionDisabled(option.value) ? 'not-allowed' : 'pointer',
          opacity: isOptionDisabled(option.value) ? 0.5 : 1
        }"
      >
        <span>{{ option.label }}</span>
      </div>
    </div>

    <!-- 展开更多按钮 -->
    <el-button
      v-if="!isExpanded && hiddenOptions.length > 0"
      @click="expandOptions"
      type="text"
      icon="el-icon-arrow-down"
      class="expand-btn"
    >
      展开更多
    </el-button>

    <!-- 收起按钮 -->
    <el-button
      v-if="isExpanded"
      @click="collapseOptions"
      type="text"
      icon="el-icon-arrow-up"
      class="expand-btn"
    >
      收起
    </el-button>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      default: () => [],
    },
    visibleCount: {
      type: Number,
      default: 5, // 默认可见的选项数量 ('全部'选项 是一个控制状态的特殊选项，不计入显示数量中)
    },
    single: {
      type: Boolean,
      default: false, // 默认为多选模式，单选模式通过设置 single 为 true
    },
    disabled: {
      type: Boolean,
      default: false, // 整个组件是否禁用
    },
  },
  data() {
    return {
      selectedOptions: [], // 初始选中的选项
      isExpanded: false, // 是否展开
    };
  },
  created() {
    this.selectedOptions = this.normalizeSelected(this.value);
  },
  computed: {
    isAllSelected() {
      return this.selectedOptions.length === 0 || this.selectedOptions.includes('all');
    },
    isSingleSelect() {
      return this.single; // 判断是否为单选模式
    },
    isDisabled() {
      return this.disabled; // 判断是否禁用
    },
    visibleOptions() {
      return this.options.slice(0, this.isExpanded ? this.options.length : this.visibleCount); // 展示的选项
    },
    hiddenOptions() {
      return this.options.slice(this.visibleCount); // 隐藏的选项
    },
  },
  methods: {
    normalizeSelected(value = []) {
      // 兼容 [] 和 ['all'] 两种“全部”表达，统一成 []
      if (!Array.isArray(value)) return [];
      return value.includes('all') ? [] : [...value];
    },
    toggleSelection(value) {
      if (this.isDisabled) return;
      if (value === 'all') {
        // 点击“全选”选项
        if (this.selectedOptions.length === 0) {
          /**
           * 如果选中“全部”, 这里特殊处理, 如果已经选中了all, 其他选项清空选中状态，只选中 '全部'选项 即可;
           * 页面中使用时，只需判断返回选中数组的长度是否为0，未0则，接口入参为[];
           * 另外接口查询时，可做优化判断，如果选中项的长度跟options的长度一致，查询字段可传值为[]或undefined不传值，查询所有即可（这种方式，需接口支持不传值时查询所有，无反选的场景）。
           */
          // this.selectedOptions = this.options.map(option => option.value);
          this.selectedOptions = [];
        } else {
          // 否则清空所有选项
          this.selectedOptions = [];
        }
      } else {
        // 处理其他选项
        const index = this.selectedOptions.indexOf(value);
        if (this.single) {
          // 单选：允许从当前项切换到其他项
          this.selectedOptions = [value];
        } else {
          if (index === -1) {
            this.selectedOptions.push(value);
          } else {
            this.selectedOptions.splice(index, 1);
          }
          // 多选：如果选项都取消了，恢复“全部”状态（空数组）
          if (this.selectedOptions.length === 0) {
            this.selectedOptions = [];
          }
        }
      }
      this.selectedOptions = this.normalizeSelected(this.selectedOptions);
      this.$emit('update:modelValue', this.selectedOptions); // 更新父组件的值
    },
    expandOptions() {
      this.isExpanded = true;
      this.$emit('toggle-expand-collapse');
    },
    collapseOptions() {
      this.isExpanded = false;
      this.$emit('toggle-expand-collapse');
    },
    isOptionDisabled(value) {
      return this.isDisabled; // 判断某个选项是否禁用
    },
  },
  watch: {
    value(newValue = [], oldValue) {
      this.selectedOptions = this.normalizeSelected(newValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.expandable-select {
  display: flex;
  align-items: flex-start;
}

.select-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.select-option {
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  padding: 0 10px;
  border: 1px solid transparent;
  transition: opacity 0.3s ease, cursor 0.3s ease;
}

.select-option.selected {
  color: #1890ff;
  border: 1px solid #1890ff;
}

.select-option.disabled {
  opacity: 0.5;
  cursor: not-allowed !important;
}

/* 展开按钮样式，定位到右上角 */
.expand-btn {
  margin-left: 10px;
  flex-shrink: 0;
  align-self: flex-start;
  height: 30px;
  line-height: 30px;
  padding: 0;
  span {
    margin-left: 0;
    line-height: 30px;
  }
}

.expandable-select.disabled {
  //pointer-events: none; /* 禁止整个组件的点击 */
}
</style>
