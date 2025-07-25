<template>
  <div class="relation-box">
    <div class="relation-label">{{ label }}</div>
    <label class="checkbox-item" v-for="(item, index) in options" :key="item.value">
      <input
        type="checkbox"
        :value="item.value"
        :checked="internalValue.includes(item.value)"
        @change="onCheckChange($event, item.value)"
      />
      <span>{{ item.label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "RelationTypeCheckbox",
  props: {
    value: { // 支持v-model绑定
      type: Array,
      default: () => [],
    },
    options: { // 传入选项
      type: Array,
      default: () => [
        { label: "空间关系", value: "space" },
        { label: "管理关系", value: "manage" },
        { label: "事件关系", value: "event" },
      ],
    },
    label: { // 标题文字，可定制
      type: String,
      default: "关系类型",
    },
  },
  data() {
    return {
      internalValue: [...this.value], // 维护内部选中
    };
  },
  watch: {
    value(newVal) {
      this.internalValue = [...newVal];
    },
    internalValue(newVal) {
      this.$emit("input", newVal); // 触发v-model更新
      this.$emit("change", newVal); // 额外触发change事件
    },
  },
  methods: {
    onCheckChange(event, val) {
      const checked = event.target.checked;
      if (checked) {
        if (!this.internalValue.includes(val)) {
          this.internalValue.push(val);
        }
      } else {
        this.internalValue = this.internalValue.filter(v => v !== val);
      }
    },
  },
};
</script>

<style scoped>
.relation-box {
  width: 150px;
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 4px;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  background: #fff;
}

.relation-label {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
}

.checkbox-item input[type="checkbox"] {
  margin-right: 6px;
  cursor: pointer;
}
</style>
