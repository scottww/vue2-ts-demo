<template>
  <div>
    <h1>轮播卡片</h1>
    <div class="container">
      <div class="item">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
      <div class="item">4</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.item {
  padding: 10px 0 0 13px;
  width: 213px;
  height: 225px;
  background: linear-gradient(
    175deg,
    rgba(90, 146, 255, 0.25) 0%,
    rgba(0, 43, 128, 0) 100%
  );
  border-radius: 3px;
  border: 1px solid;
  border-image: linear-gradient(
      357deg,
      rgba(178, 215, 255, 0),
      rgba(178, 215, 255, 0.8)
    )
    1 1;
}
</style>