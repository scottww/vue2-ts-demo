<template>
  <div class="background-clip">
    <h1>Genshin Impact Eula</h1>
    <h2>Genshin Impact Eula</h2>
  </div>
</template>

<script>
export default {
  name: "BackgroundClip",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: fa-Coustard; //自定义字体名称
  src: url(../../assets/coustard/Coustard-Black.ttf);
  //IE
  // src: url(../../assets/coustard/Coustard-Black.otf);
  // src: url(../../assets/coustard/Coustard-Regular.ttf);
}
.background-clip {
  height: 100%;
  font-family: fa-Coustard, sans-serif;
  // display: flex;
  // justify-content: center;
  font-size: 1.2vmin;
  h1 {
    font-size: 10em;
    // max-width: 19ch; //1ch等于一个0的宽度，与高度无关
    background-image: url("../../assets/eula.png");
    background-size: contain;
    color: transparent;
    background-clip: text;
    filter: drop-shadow(0px -3px 1px rgba(0, 0, 0, 1));
    animation: stripes 5s infinite alternate;
  }
  @keyframes stripes {
    100% {
      background-position: 100px 0, 100px 0, 100px 0;
    }
  }
  h2{
    font-size: 4rem;
  }
}
</style>
