<template>
  <div class="relation-box">
    <div class="relation-label">{{ label }}</div>
    <label
      class="checkbox-item"
      v-for="(item, index) in options"
      :key="item.value"
    >
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
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => [
        { label: "空间关系", value: "space" },
        { label: "管理关系", value: "manage" },
        { label: "事件关系", value: "event" }
      ]
    },
    label: {
      type: String,
      default: "关系类型"
    }
  },
  data() {
    return {
      internalValue: [...this.value]
    };
  },
  watch: {
    value(newVal) {
      this.internalValue = [...newVal];
    },
    internalValue(newVal) {
      this.$emit("input", newVal);
      this.$emit("change", newVal);
    }
  },
  methods: {
    onCheckChange(event, val) {
      const checked = event.target.checked;
      if (checked) {
        if (!this.internalValue.includes(val)) {
          this.internalValue.push(val);
        }
      } else {
        this.internalValue = this.internalValue.filter((v) => v !== val);
      }
    }
  }
};
</script>

<style scoped>
.relation-box {
  width: 150px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  background: #fff;
  box-sizing: border-box;
}

.relation-label {
  position: relative;
  font-size: 13px;
  color: #666;
  margin: 0 0 8px 0;
  padding-bottom: 4px;
  user-select: none;
}

.relation-label::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: #ddd;
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
