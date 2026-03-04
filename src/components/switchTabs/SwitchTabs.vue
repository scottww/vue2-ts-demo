<template>
  <div class="switch-tabs-wrap">
    <div class="switch-tabs">
      <el-button
        v-for="item in options"
        :key="item.value"
        class="switch-tab-btn"
        :class="[
          sizeClass,
          themeClass,
          { active: currentValue === item.value }
        ]"
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
    },
    size: {
      type: String,
      default: "default", // mini / small / default / large
      validator: (val) => ["mini", "small", "default", "large"].includes(val)
    },
    theme: {
      type: String,
      default: "primary",
      validator: (val) =>
        ["primary", "success", "warning", "danger"].includes(val)
    }
  },

  computed: {
    currentValue() {
      return this.value;
    },
    sizeClass() {
      return `switch-tab-btn--${this.size}`;
    },
    themeClass() {
      return `switch-tab-theme--${this.theme}`;
    }
  },

  methods: {
    handleClick(val) {
      if (val === this.currentValue) return;

      this.$emit("input", val);
      this.$emit("change", val);
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
  font-size: 12px;
  color: #666d75;
  background: #f5f7fa;
}

/* ========== 尺寸控制 ========== */

.switch-tab-btn--mini {
  height: 20px;
  line-height: 20px;
  font-size: 11px;
}

.switch-tab-btn--small {
  height: 24px;
  line-height: 24px;
  font-size: 12px;
}

.switch-tab-btn--default {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}

.switch-tab-btn--large {
  height: 38px;
  line-height: 38px;
  font-size: 16px;
  padding: 0 22px;
  border-radius: 4px;
}

/* ========== 主题色 ========== */

.switch-tab-theme--primary.active {
  background: #1890ff;
  border-color: #1890ff !important;
  color: #fff;
}

.switch-tab-theme--success.active {
  background: #52c41a;
  border-color: #52c41a !important;
  color: #fff;
}

.switch-tab-theme--warning.active {
  background: #faad14;
  border-color: #faad14 !important;
  color: #fff;
}

.switch-tab-theme--danger.active {
  background: #f5222d;
  border-color: #f5222d !important;
  color: #fff;
}

/* ========== 激活状态 ========== */

.switch-tab-btn.active {
  color: #fff;
  // background: #1890ff;
  // border-color: #1890ff !important;
}

/* ========== hover 状态 ========== */

.switch-tab-btn:hover,
.switch-tab-btn:focus {
  color: #4d5660;
  // border-color: #c9d4e3 !important;
  // background: #f5f7fa;
}

.switch-tab-btn.active:hover,
.switch-tab-btn.active:focus {
  color: #fff;
  // background: #1890ff;
  // border-color: #1890ff !important;
}
</style>
