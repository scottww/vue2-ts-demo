<template>
  <div class="switch-tabs-wrap">
    <div class="switch-tabs">
      <el-button
        v-for="item in options"
        :key="item.value"
        class="switch-tab-btn"
        :class="{ active: currentValue === item.value }"
        @click="handleClick(item.value)"
      >
        {{ item.label }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SwitchTabs",

  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    options: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    currentValue() {
      return this.value;
    }
  },

  methods: {
    handleClick(val) {
      if (val === this.currentValue) return;

      this.$emit("input", val); // v-model
      this.$emit("change", val); // 额外事件
    }
  }
};
</script>

<style lang="scss" scoped>
.switch-tabs-wrap {
  margin-bottom: 8px;
}

.switch-tabs {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 6px;
}

.switch-tabs .el-button + .el-button {
  margin-left: 0;
}

.switch-tab-btn {
  margin: 0 !important;
  border: 1px solid #d7dfe8 !important;
  border-radius: 2px !important;
  box-shadow: none !important;
  padding: 0 12px;
  min-height: 22px;
  height: 22px;
  line-height: 22px;
  font-size: 12px;
  color: #666d75;
  background: #f5f7fa;
}

.switch-tab-btn.active {
  color: #fff;
  background: #1890ff;
  border-color: #1890ff !important;
}

.switch-tab-btn:hover,
.switch-tab-btn:focus {
  color: #4d5660;
  border-color: #c9d4e3 !important;
  background: #f5f7fa;
}

.switch-tab-btn.active:hover,
.switch-tab-btn.active:focus {
  color: #fff;
  background: #1890ff;
  border-color: #1890ff !important;
}
</style>
