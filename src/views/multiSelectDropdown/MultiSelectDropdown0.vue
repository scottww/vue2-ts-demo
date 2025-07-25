<template>
  <div class="multi-select" @click.stop="toggleDropdown">
    <div class="selected-tags">
      <span
        v-for="(item, index) in visibleSelected"
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
          @change.stop=""
        />
        <span>{{ option.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiSelect",
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    },
    maxVisible: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      dropdownVisible: false
    };
  },
  computed: {
    selected() {
      return this.value || [];
    },
    selectedOptions() {
      return this.options.filter((opt) => this.selected.includes(opt.value));
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
      this.$emit("input", newSelected);
    },
    removeItem(val) {
      const newSelected = this.selected.filter((v) => v !== val);
      this.$emit("input", newSelected);
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
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
      this.$emit("input", newSelected);
    },
    removeItem(val) {
      const newSelected = this.selected.filter((v) => v !== val);
      this.$emit("input", newSelected);
    },
    handleClickOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.dropdownVisible = false;
      }
    }
  }
};
</script>

<style scoped>
.multi-select {
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  padding: 6px 8px;
  width: 100%;
  cursor: pointer;
  position: relative;
  background-color: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.multi-select:hover {
  border-color: #409eff;
  box-shadow: 0 0 3px rgba(64, 158, 255, 0.4);
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  min-height: 34px;
  align-items: center;
}

.placeholder {
  color: #c0c4cc;
  font-size: 14px;
}

.tag {
  /* background: #ecf5ff; */
  /* border: 1px solid #b3d8ff; */
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(5, 5, 5, 0.06);
  /* color: #409eff; */
  /* border-radius: 16px; */
  
  padding: 3px 10px;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  line-height: 20px;
  transition: all 0.2s ease;
}
.tag:hover {
  /* background: #d9ecff;
  border-color: #a0cfff; */
}

.remove {
  margin-left: 6px;
  color: #909399;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
  transition: color 0.2s;
}
.remove:hover {
  color: #f56c6c;
}

.dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  z-index: 1000;
  max-height: 220px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  animation: dropdownFade 0.2s ease-out;
}

@keyframes dropdownFade {
  0% {
    opacity: 0;
    transform: translateY(-6px);
  }
  100% {
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
  color: #606266;
  cursor: pointer;
  transition: background 0.2s;
}
.option:hover {
  background: #f5f7fa;
}
.option input {
  cursor: pointer;
}
</style>

