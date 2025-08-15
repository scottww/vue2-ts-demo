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
        :class="{ active: option.value == selectedValue }"
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
    value: [String, Number], // Vue 2
    modelValue: [String, Number] // Vue 3
  },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    selectedValue() {
      // 优先使用 Vue 3 的 modelValue，再用 Vue 2 的 value
      return this.modelValue !== undefined ? this.modelValue : this.value;
    },
    selectedLabel() {
      const selected = this.options.find(
        (opt) => opt.value == this.selectedValue
      );
      return selected ? selected.label : "";
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      // 双兼容触发
      this.$emit("input", option.value); // Vue 2
      this.$emit("update:modelValue", option.value); // Vue 3
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
  beforeDestroy() {
    // Vue 2
    document.removeEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    // Vue 3
    document.removeEventListener("click", this.handleClickOutside);
  }
};
</script>

<style scoped>
.custom-select {
  position: relative;
  cursor: pointer;
  user-select: none;
  color: #ffffff;
}

.selected-value {
  padding: 6px 10px;
}

.diamond {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  background: #1890ff;
  transform: skewX(-20deg);
  color: #ffffff;
  user-select: none;
  font-style: italic;
}

.diamond > span:first-child {
  transform: skewX(20deg);
  display: inline-block;
  margin-right: 6px;
}

.arrow {
  transition: transform 0.2s ease;
  font-size: 12px;
  transform: skewX(20deg);
}

.arrow.open {
  transform: skewX(20deg) rotate(180deg);
}

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

.dropdown-menu li:hover,
.dropdown-menu li.active {
  background: #1890ff;
}
</style>
