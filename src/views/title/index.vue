<template>
  <div class="title-demo">
    <div class="title">
      <h2 class="title__name">It's no laughing matter</h2>
    </div>
    <div class="title">
      <h2 class="title__name">这 是 标 题</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "TitleDemo",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.title-demo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  .title {
    display: inline-block;
    white-space: nowrap;
  }
  .title__name {
    position: relative;
    font-size: 32px;
    // display: inline-block;
    // white-space: nowrap;
    // padding: 0 10px;
    z-index: 1;
    &::before {
      content: "";
      position: absolute;
      left: 15%;
      bottom: 3px;
      width: 90%;
      height: 12px;
      transform: skew(-12deg) translateX(-2%);
      background: var(--theme-color);
      opacity: 0.5;
      z-index: -1;
    }
  }
}
</style>
