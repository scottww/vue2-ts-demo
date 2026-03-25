<!-- 针对选择的项文字有长有短的情况，优化 -->
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
    value: [String, Number],
    maxDropdownWidth: { type: Number, default: 300 }, // 下拉菜单最大宽度
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    selectedValue() {
      return this.value;
    },
    selectedLabel() {
      const selected = this.options.find(opt => opt.value == this.value);
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
      this.$emit("input", option.value);
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

/* 选中值区域 */
.selected-value {
  display: inline-block;
  max-width: 100%;
}

/* 菱形背景 */
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

/* 文字反斜回来 */
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

/* 箭头 */
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

/* 下拉菜单 */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 100%; /* 默认宽度至少和选中值一样 */
  max-width: 300px; /* 最大宽度 */
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
