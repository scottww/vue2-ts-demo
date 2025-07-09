<template>
  <div class="collapse-panel">
    <div class="panel-header" @click="toggle">
      <span>{{ title }}</span>
      <i :class="['el-icon-arrow-down', { collapsed }]" />
    </div>
    <transition name="combo-fade">
      <div v-show="!collapsed" ref="body" class="panel-body">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "CollapsePanel",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    toggle() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

<style scoped>
/* 基础容器样式 */
.collapse-panel {
  background: rgba(10, 32, 61, 0.85);
  border-radius: 6px;
  color: #fff;
  width: 200px;
  overflow: hidden;
}

/* 头部箭头 */
.panel-header {
  font-weight: bold;
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}
.el-icon-arrow-down {
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}
.el-icon-arrow-down.collapsed {
  transform: rotate(-180deg);
}

/* Combo Combo 动画 */
.combo-fade-enter-active,
.combo-fade-leave-active {
  transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
}
.combo-fade-enter,
.combo-fade-leave-to {
  transform: scaleY(0.95) scaleX(0.98);
  opacity: 0;
  transform-origin: top center;
}

.panel-body {
  padding: 0 10px 10px;
}
</style>
