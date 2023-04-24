<template>
  <div class="h-card-wrapper">
    <div class="h-card shadow">
      <div class="h-card__header">
        <strong>{{ title }}</strong>
      </div>
      <div class="h-card__content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HCard",
  props: {
    title: {
      type: String,
      default: "标题"
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
