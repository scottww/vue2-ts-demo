<!-- vue2 vue3通用 -->
<template>
  <div class="multi-checkbox">
    <label
      v-for="item in options"
      :key="item.value"
      class="checkbox-item"
    >
      <input
        type="checkbox"
        :value="item.value"
        :checked="checkedValues.includes(item.value)"
        @change="onCheckChange($event, item.value)"
      />
      <span>{{ item.label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'MultiCheckbox',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      required: true
    },
    minSelected: {
      type: Number,
      default: 1
    }
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      checkedValues: [...this.modelValue]
    };
  },
  watch: {
    modelValue(val) {
      this.checkedValues = [...val];
    }
  },
  methods: {
    onCheckChange(event, val) {
      const isChecked = event.target.checked;
      const next = [...this.checkedValues];

      if (!isChecked) {
        // 尝试取消
        if (next.length <= this.minSelected) {
          this.$message.warning(`至少选择 ${this.minSelected} 项`) ||
            alert(`至少选择 ${this.minSelected} 项`);
          // 强制复原：不要改变 next
          // 恢复为勾选（UI 会自动更新）
          this.$nextTick(() => {
            event.target.checked = true;
          });
          return;
        }
        const idx = next.indexOf(val);
        if (idx !== -1) next.splice(idx, 1);
      } else {
        // 勾选新值
        if (!next.includes(val)) next.push(val);
      }

      this.checkedValues = next;
      this.$emit('update:modelValue', next);
      this.$emit('change', next);
    }
  }
};
</script>

<style scoped>
.checkbox-item {
  margin-right: 16px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}
.checkbox-item input {
  margin-right: 4px;
}
</style>
