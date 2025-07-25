<template>
  <div class="relation-box">
    <div class="relation-label">{{ label }}</div>
    <div class="relation-content">
      <label class="checkbox-item" v-for="item in options" :key="item.value">
        <input
          type="checkbox"
          :value="item.value"
          :checked="value.includes(item.value)"
          @change="onCheckChange($event, item.value)"
        />
        <span>{{ item.label }}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "RelationTypeCheckbox",
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => [
        { label: "label 1", value: "label 1" },
        { label: "label 2", value: "label 2" },
        { label: "label 3", value: "label 3" }
      ]
    },
    label: {
      type: String,
      default: "关系类型"
    }
  },
  methods: {
    onCheckChange(event, val) {
      const checked = event.target.checked;
      let newValue = [...this.value];
      if (checked) {
        if (!newValue.includes(val)) {
          newValue.push(val);
        }
      } else {
        newValue = newValue.filter((v) => v !== val);
      }
      this.$emit("input", newValue);
      this.$emit("change", newValue);
    }
  }
};
</script>

<style scoped>
.relation-box {
  width: 150px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  background: #fff;
  box-sizing: border-box;
}

.relation-label {
  font-size: 13px;
  color: #666;
  background: #f4f5f6;
  padding: 4px 8px;
  border-bottom: 1px solid #ddd;
  user-select: none;
}

.relation-content {
  padding: 8px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  padding: 6px 0;
  user-select: none;
  border-bottom: none;
}

.checkbox-item input[type="checkbox"] {
  margin-right: 6px;
  cursor: pointer;
}
</style>
