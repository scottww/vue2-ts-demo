<template>
  <div class="collapse-panel">
    <div class="panel-header" @click="toggle">
      <span>{{ title }}</span>
      <i :class="['el-icon-arrow-down', { collapsed }]" />
    </div>
    <transition name="smooth-collapse">
      <div v-show="!collapsed" class="panel-body">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "CollapsePanel",
  props: {
    title: String,
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
.collapse-panel {
  background: rgba(10, 32, 61, 0.85);
  border-radius: 6px;
  color: #fff;
  width: 200px;
  overflow: hidden;
}
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
  transition: transform 0.3s ease;
}
.el-icon-arrow-down.collapsed {
  transform: rotate(-90deg);
}

/* 动画部分 */
.smooth-collapse-enter-active,
.smooth-collapse-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}
.smooth-collapse-enter,
.smooth-collapse-leave-to {
  transform: scaleY(0.95);
  opacity: 0;
  transform-origin: top;
}
.panel-body {
  padding: 0 10px 10px;
}
</style>
