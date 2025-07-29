<template>
  <div class="relation-checkbox">
    <label v-for="item in options" :key="item.value" class="checkbox-item">
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
  name: "RelationCheckbox",
  props: {
    value: {
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
  data() {
    return {
      checkedValues: [...this.value]
    };
  },
  watch: {
    value(newVal) {
      this.checkedValues = [...newVal];
    }
  },
  methods: {
    onCheckChange(event, val) {
      const isChecked = event.target.checked;

      const current = [...this.checkedValues];

      if (!isChecked) {
        // 用户取消勾选时
        if (current.length <= this.minSelected) {
          // 不允许取消，强行恢复勾选状态
          event.target.checked = true;

          this.$message?.warning?.(`至少选择 ${this.minSelected} 个选项`) ||
            alert(`至少选择 ${this.minSelected} 个选项`);
          return;
        } else {
          const idx = current.indexOf(val);
          if (idx !== -1) current.splice(idx, 1);
        }
      } else {
        // 用户勾选新项
        if (!current.includes(val)) current.push(val);
      }

      this.checkedValues = current;
      this.$emit("input", current);
      this.$emit("change", current);
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
