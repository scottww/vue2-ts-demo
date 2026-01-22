<template>
  <div class="panel-header">
    <span>{{ title }}</span>
    <button class="collapse-btn" @click="$emit('toggle')">
      {{ collapsed ? '展开' : '收起' }}
    </button>
  </div>
</template>

<script>
export default {
  name: "PanelHeader",
  props: {
    title: String,
    collapsed: Boolean
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/custom.scss";
.panel-header {
  width: 100%;
  height: 50px;
  background-color: #1890ff;
  box-shadow: 4px 0px 8px 0px #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;

  span {
    font-weight: bold;
    padding: 0 4px;
    @include custom-panel-title($size: 20px, $style: italic, $start: #7ae3ff);
  }

  .collapse-btn {
    all: unset;
    color: #fff;
    font-family: SourceHanSansCN;
    font-size: 16px;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
