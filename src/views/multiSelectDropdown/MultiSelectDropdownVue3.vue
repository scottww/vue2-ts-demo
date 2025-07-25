<template>
  <div class="multi-select" @click.stop="toggleDropdown">
    <div class="selected-tags">
      <span
        v-for="item in visibleSelected"
        :key="item.value"
        class="tag"
      >
        <span>{{ item.label }}</span>
        <span class="remove" @click.stop="removeItem(item.value)">×</span>
      </span>
      <span v-if="hiddenCount > 0" class="tag more-tag">+{{ hiddenCount }}...</span>
      <span v-if="!selected.length" class="placeholder">请选择</span>
    </div>

    <div class="dropdown" v-show="dropdownVisible">
      <div
        class="option"
        v-for="option in options"
        :key="option.value"
        @click.stop="toggleSelect(option.value)"
      >
        <input
          type="checkbox"
          :checked="selected.includes(option.value)"
          readonly
        />
        <span>{{ option.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiSelectDropdown",
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      required: true
    },
    maxVisible: {
      type: Number,
      default: 3
    }
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      dropdownVisible: false
    };
  },
  computed: {
    selected() {
      return this.modelValue || [];
    },
    selectedOptions() {
      return this.options.filter(opt => this.selected.includes(opt.value));
    },
    visibleSelected() {
      return this.selectedOptions.slice(0, this.maxVisible);
    },
    hiddenCount() {
      return this.selectedOptions.length - this.visibleSelected.length;
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    toggleSelect(val) {
      const newSelected = [...this.selected];
      const index = newSelected.indexOf(val);
      if (index > -1) {
        newSelected.splice(index, 1);
      } else {
        newSelected.push(val);
      }
      this.$emit('update:modelValue', newSelected);
      this.$emit('change', newSelected);
    },
    removeItem(val) {
      const newSelected = this.selected.filter(v => v !== val);
      this.$emit('update:modelValue', newSelected);
      this.$emit('change', newSelected);
    },
    handleClickOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.dropdownVisible = false;
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  unmounted() {
    document.removeEventListener("click", this.handleClickOutside);
  }
};
</script>

<style scoped>
.multi-select {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  height: 32px;
  width: 100%;
  cursor: pointer;
  position: relative;
  background-color: #fff;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  padding: 0 8px;
  box-sizing: border-box;
}
.multi-select:hover {
  border-color: #40a9ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.selected-tags {
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
}

.placeholder {
  color: #bfbfbf;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tag {
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(5, 5, 5, 0.06);
  padding: 0 8px;
  font-size: 12px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  margin-right: 4px;
  flex-shrink: 0;
  line-height: 22px;
}

.more-tag {
  background: #f0f0f0;
  border: 1px solid #d9d9d9;
  color: #595959;
  flex-shrink: 0;
}

.remove {
  margin-left: 6px;
  font-size: 12px;
  color: #999;
  cursor: pointer;
}
.remove:hover {
  color: #ff4d4f;
}

.dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  border: 1px solid #d9d9d9;
  background: #fff;
  border-radius: 4px;
  z-index: 1000;
  max-height: 240px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: dropdown-fade 0.2s ease;
}

@keyframes dropdown-fade {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.option {
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
}
.option:hover {
  background: #f5f5f5;
}
.option input {
  cursor: pointer;
}
</style>
