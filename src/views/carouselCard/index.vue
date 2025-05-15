<template>
  <div>
    <h1>轮播卡片</h1>
    <div class="slider">
      <div class="track">
        <div class="item">1</div>
        <div class="item">2</div>
        <div class="item">3</div>
        <div class="item">4</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.slider {
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  // margin-top: 20px;

  width: 100%;
  overflow: hidden;
  margin-top: 20px;
  position: relative;
}
.track {
  display: flex;
  width: calc(213px * 8); // 4原始 + 4复制卡片
  animation: scroll 10s linear infinite;
}
.item {
  // padding: 10px 0 0 13px;
  // width: 213px;
  // height: 225px;
  // background: linear-gradient(
  //   175deg,
  //   rgba(90, 146, 255, 0.25) 0%,
  //   rgba(0, 43, 128, 0) 100%
  // );
  // border-radius: 3px;
  // border: 1px solid;
  // border-image: linear-gradient(
  //     357deg,
  //     rgba(178, 215, 255, 0),
  //     rgba(178, 215, 255, 0.8)
  //   )
  //   1 1;

  flex-shrink: 0;
  width: 213px;
  height: 225px;
  margin-right: 20px;
  padding: 10px 0 0 13px;
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

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-932px); // 213*4 + 20*3
  }
}
</style>