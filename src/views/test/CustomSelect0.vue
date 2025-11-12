<template>
  <div class="custom-select" @click="toggleDropdown" ref="selectRef">
    <div class="selected-value">
      <span class="diamond">
        <span>{{ selectedLabel || placeholder }}</span>
        <span class="arrow" :class="{ open: isOpen }">▼</span>
      </span>
    </div>
    <transition name="fade">
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
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    options: { type: Array, required: true, default: () => [] },
    placeholder: { type: String, default: '请选择' },
    value: [String, Number], // Vue 2
    modelValue: [String, Number], // Vue 3
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    selectedValue() {
      // 优先使用 Vue 3 的 modelValue，再用 Vue 2 的 value
      return this.modelValue !== undefined ? this.modelValue : this.value
    },
    selectedLabel() {
      const selected = this.options.find((opt) => opt.value == this.selectedValue)
      return selected ? selected.label : ''
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        document.addEventListener('click', this.handleClickOutside)
      } else {
        document.removeEventListener('click', this.handleClickOutside)
      }
    },
    selectOption(option) {
      // 双兼容触发
      this.$emit('input', option.value) // Vue 2
      this.$emit('update:modelValue', option.value) // Vue 3
      this.isOpen = false
    },
    handleClickOutside(e) {
      if (!this.$refs.selectRef.contains(e.target)) {
        this.isOpen = false
        document.removeEventListener('click', this.handleClickOutside)
      }
    },
  },
  mounted() {
    // document.addEventListener('click', this.handleClickOutside)
  },
  beforeDestroy() {
    // Vue 2
    document.removeEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    // Vue 3
    document.removeEventListener('click', this.handleClickOutside)
  },
}
</script>

<style lang="scss" scoped>
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
  /* padding: 4px 10px; */
  padding: 0px 10px;
  background: #1890ff;
  transform: skewX(-10deg);
  color: #ffffff;
  user-select: none;
  font-style: italic;
  border-radius: 2px;
  font-size: 16px;
}

.diamond > span:first-child {
  /* transform: skewX(20deg); */
  display: inline-block;
  margin-right: 6px;
}

.arrow {
  transition: transform 0.2s ease;
  font-size: 12px;
  transform: skewX(10deg);
}

.arrow.open {
  transform: skewX(10deg) rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  /* background: #082658; */
  /* background: linear-gradient(to bottom, #3277a4 0%, #0f4678 100%); */
  background: linear-gradient(to bottom, #3277a4 0%, #0f4678 35%, #0f4678 65%, #173871 100%);
  border: 1px solid #3fa5fb;
  /* border-top: none; */
  border-radius: 4px;
  padding: 4px;
  max-height: 220px;
  overflow-y: auto;
  z-index: 100;
  color: #ffffff;

  // backdrop-filter: blur(4px);
  // background: rgba(15, 70, 120, 0.9);
}

.dropdown-menu li {
  margin-bottom: 4px;
  padding: 0px 8px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
}

.dropdown-menu li:hover,
.dropdown-menu li.active {
  background: #1890ff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
