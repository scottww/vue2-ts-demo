<template>
  <div class="switch-button">
    <button
      v-for="option in options"
      :key="option.value"
      class="switch-btn"
      :class="{ active: currentValue === option.value }"
      @click="handleSwitch(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'SwitchButton0',
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
    switchMode(val) {
      this.currentValue = val
      this.$emit('input', val)       // v-model
      this.$emit('change', val)      // 普通事件
    },
  },
}
</script>

<style scoped>
.switch-button {
  display: flex;
}

.switch-btn {
  padding: 6px 18px;
  border: 1px solid #0078d4;
  background-color: rgba(0, 120, 212, 0.2);
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.switch-btn:first-child {
  border-radius: 4px 0 0 4px;
}

.switch-btn:last-child {
  border-radius: 0 4px 4px 0;
}

.switch-btn.active {
  background-color: #0078d4;
  color: #fff;
}

.switch-btn:hover:not(.active) {
  background-color: rgba(0, 120, 212, 0.4);
}
</style>
