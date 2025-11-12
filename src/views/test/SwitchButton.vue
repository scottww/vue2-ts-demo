<template>
  <div class="switch-button">
    <button
      v-for="option in options"
      :key="option.value"
      class="switch-button__btn"
      :class="{ 'switch-button__btn--active': currentValue === option.value }"
      @click="handleSwitch(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'SwitchButton',
  props: {
    value: {
      type: [String, Number],
      default: 'option1',
    },
    options: {
      type: Array,
      default: () => [
        { label: '选项1', value: 'option1' },
        { label: '选项2', value: 'option2' },
      ],
    },
  },
  data() {
    return {
      currentValue: this.value,
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
  },
  methods: {
    handleSwitch(val) {
      this.currentValue = val
      this.$emit('input', val) // v-model 支持
      this.$emit('change', val)
    },
  },
}
</script>

<style scoped>
.switch-button {
  display: flex;
  gap: 6px;
}

.switch-button__btn {
  border: 1px solid transparent;
  outline: none;
  padding: 2px 18px;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  border-radius: 24px;
  transition: all 0.3s ease;
}

.switch-button__btn--active {
  border: 1px solid #0078d4;
  background-color: #1890ff;
  color: #fff;
}

.switch-button__btn:hover:not(.switch-button__btn--active) {
  background-color: rgba(0, 120, 212, 0.4);
}
</style>
