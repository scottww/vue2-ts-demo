<template>
  <div class="panel" :class="{ 'no-panel-bg': !panelBg }">
    <div class="panel-header flex-h-v" :class="{ 'no-header-bg': !headerBg }">
      <span class="header-title">{{ title }}</span>

      <div class="header-extra" v-if="$slots.headerExtra">
        <slot name="headerExtra"></slot>
      </div>
    </div>

    <div class="panel-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "UIPanel",
  props: {
    title: { type: String, default: "" },
    headerBg: { type: Boolean, default: true }, // 是否使用头部背景
    panelBg: { type: Boolean, default: true } // 是否使用面板背景
  }
};
</script>

<style lang="scss" scoped>
@import "./panel.scss";

/* ---- 通用面板外壳样式 ---- */
.panel {
  height: 100%;
  background: rgba(0, 76, 153, 0.2);
  border: 1px solid rgba(0, 153, 255, 0.3);
  border-radius: 6px;
  padding: 12px;
  color: #fff;
  display: flex;
  flex-direction: column;

  &.no-panel-bg {
    background: none;
    border: none;
    padding: 0;
  }
}

/* ---- 标题头部 ---- */
.panel-header {
  font-weight: bold;
  font-size: 16px;
  height: 58px;
  background-image: url("~@/assets/bigScreen/panel_title_bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 0 0 0 50px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &.no-header-bg {
    background: none !important;
    padding-left: 0;
    height: auto;
  }
}

/* ---- 标题 ---- */
.panel-header .header-title {
  position: relative;
  padding: 0 4px;
  left: 0;
  @include custom-panel-title();
}

/* ---- 右侧额外操作 ---- */
.header-extra {
  display: flex;
  align-items: center;
  position: relative;
  left: 0;
}

/* ---- 面板主体 ---- */
.panel-body {
  // flex: 1;
  // overflow: hidden;

  height: calc(100% - 58px);
  display: flex;
  flex-direction: column;
  margin-top: 0;
}

.flex-h-v {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
