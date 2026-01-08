<template>
  <div
    class="dropdown-item"
    :class="{ active: source.id == selectedItemId }"
    @click="handleClick"
  >
    {{ source.name }}
  </div>
</template>

<script>
export default {
  name: "DropdownItem",
  props: {
    source: {
      type: Object,
      required: true
    },
    selectedItemId: { type: [String, Number], default: null },
    selectItem: {
      type: Function
    }
  },
  methods: {
    handleClick() {
      this.selectItem(this.source);
    }
  }
};
</script>

<style scoped>
.dropdown-item {
  padding: 4px 8px;
  cursor: pointer;
  height: 36px;
  line-height: 36px;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.dropdown-item.active {
  background-color: #e6f7ff;
  color: #1890ff;
  font-weight: bold;
}
.dropdown-item:hover {
  background-color: #f5f7fa;
}
</style>
