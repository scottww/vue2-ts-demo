<template>
  <div class="custom-select" ref="selectRef">
    <!-- 选中值 -->
    <div class="selected-value" @click="toggleDropdown" ref="selectedValueRef">
      <span class="diamond">
        <span class="text">{{ selectedLabel || placeholder }}</span>
        <span class="arrow" :class="{ open: isOpen }">▼</span>
      </span>
    </div>

    <!-- 下拉菜单 -->
    <ul v-if="isOpen" class="dropdown-menu" ref="dropdownMenu">
      <li
        v-for="option in options"
        :key="option.value"
        @click.stop="selectOption(option)"
        :class="{ active: option.value == selectedValue }"
        :title="option.label"
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
    value: [String, Number], // Vue2
    modelValue: [String, Number], // Vue3
    maxDropdownWidth: { type: Number, default: 300 }, 
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    // 兼容 Vue2 的 v-model 和 Vue3 的 v-model
    selectedValue() {
      return this.modelValue !== undefined ? this.modelValue : this.value;
    },
    selectedLabel() {
      const selected = this.options.find(opt => opt.value == this.selectedValue);
      return selected ? selected.label : "";
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      this.$nextTick(() => {
        if (this.isOpen) this.adjustDropdownWidth();
      });
    },
    selectOption(option) {
      // 兼容 Vue2 / Vue3
      this.$emit("input", option.value);       // Vue2
      this.$emit("update:modelValue", option.value); // Vue3
      this.isOpen = false;
    },
    handleClickOutside(e) {
      if (!this.$refs.selectRef.contains(e.target)) {
        this.isOpen = false;
      }
    },
    adjustDropdownWidth() {
      const selectedWidth = this.$refs.selectedValueRef.offsetWidth;
      const menu = this.$refs.dropdownMenu;
      const width = Math.min(selectedWidth, this.maxDropdownWidth);
      menu.style.width = width + "px";
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  // Vue3 兼容
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.custom-select {
  display: inline-block;
  max-width: 100%;
  position: relative;
  cursor: pointer;
  user-select: none;
  color: #ffffff;
}
.selected-value {
  display: inline-block;
  max-width: 100%;
}
.diamond {
  display: inline-block;
  background: #1890ff;
  padding: 4px 10px;
  transform: skewX(-20deg);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-style: italic;
  color: #fff;
}
.diamond .text {
  display: inline-block;
  transform: skewX(20deg);
  max-width: 100%;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 4px;
}
.arrow {
  display: inline-block;
  transform: skewX(20deg);
  margin-left: 6px;
  font-size: 12px;
  transition: transform 0.2s ease;
}
.arrow.open {
  transform: skewX(20deg) rotate(180deg);
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 100%;
  max-width: 300px;
  background: #082658;
  border: 1px solid #1890ff;
  border-top: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  color: #ffffff;
  white-space: nowrap;
}
.dropdown-menu li {
  padding: 6px 10px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dropdown-menu li:hover,
.dropdown-menu li.active {
  background: #1890ff;
}
</style>
