<template>
  <div class="collapse-panel">
    <div class="panel-header" @click="toggle">
      <span>{{ title }}</span>
      <i :class="['el-icon-arrow-down', { collapsed: collapsed }]"></i>
    </div>
    <div
      class="panel-body-wrapper"
      ref="body"
      :style="{ maxHeight: collapsed ? '0px' : bodyHeight + 'px' }"
    >
      <div ref="bodyContent" class="panel-body">
        <slot />
      </div>
    </div>
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
      bodyHeight: 0,
    };
  },
  mounted() {
    this.updateHeight();
  },
  methods: {
    toggle() {
      this.collapsed = !this.collapsed;
      this.$nextTick(this.updateHeight);
    },
    updateHeight() {
      this.$nextTick(() => {
        if (!this.collapsed) {
          const el = this.$refs.bodyContent;
          this.bodyHeight = el.scrollHeight;
        }
      });
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
}
.panel-body-wrapper {
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.panel-body {
  padding: 0 10px 10px;
}
.el-icon-arrow-down {
  transition: transform 0.3s ease;
}
.el-icon-arrow-down.collapsed {
  transform: rotate(-90deg);
}
</style>
