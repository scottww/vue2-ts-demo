<template>
  <div class="custom-select" @click="toggleDropdown" ref="selectRef">
    <div class="selected-value">
      <span class="diamond">
        <span>{{ selectedLabel || placeholder }}</span>
        <span class="arrow" :class="{ open: isOpen }">▼</span>
      </span>
    </div>
    <ul v-if="isOpen" class="dropdown-menu">
      <li 
        v-for="option in options" 
        :key="option.value" 
        @click.stop="selectOption(option)"
        :class="{ active: option.value === selectedValue }"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CustomSelect",
  props: {
    options: { type: Array, required: true },
    placeholder: { type: String, default: "请选择" },
    modelValue: [String, Number]
  },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    selectedValue() {
      return this.modelValue;
    },
    selectedLabel() {
      const selected = this.options.find(opt => opt.value === this.modelValue);
      return selected ? selected.label : "";
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.$emit("update:modelValue", option.value);
      this.isOpen = false;
    },
    handleClickOutside(e) {
      if (!this.$refs.selectRef.contains(e.target)) {
        this.isOpen = false;
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }
};
</script>

<style scoped>
.custom-select {
  position: relative;
  /* width: 180px; */
  /* border: 1px solid #1890ff; */
  border-radius: 4px;
  /* background: #082658; */
  cursor: pointer;
  user-select: none;
  color: #ffffff;
}

.selected-value {
  padding: 6px 10px;
  /* 取消 flex 布局，由 diamond 内部控制 */
}

/* 选中值的菱形背景 */
.diamond {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  background: #1890ff;
  transform: skewX(-20deg);
  color: #ffffff;
  user-select: none;
}

/* 文字反斜回来，让文字不倾斜 */
.diamond > span:first-child {
  transform: skewX(20deg);
  display: inline-block;
  margin-right: 6px; /* 文字和箭头间距 */
}

/* 箭头也反斜，保证形状 */
.arrow {
  transition: transform 0.2s ease;
  font-size: 12px;
  transform: skewX(20deg);
}

.arrow.open {
  transform: skewX(20deg) rotate(180deg);
}

/* 下拉菜单 */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #082658;
  border: 1px solid #1890ff;
  border-top: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  color: #ffffff;
}

.dropdown-menu li {
  padding: 6px 10px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background: #1890ff;
}

.dropdown-menu li.active {
  background: #1890ff;
}
</style>
