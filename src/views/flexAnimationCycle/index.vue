<template>
  <!--参考StackBlitz首页看到的效果 -->
  <div class="flex-animation-cycle-demo">
    <div
      ref="left"
      class="flex-animation-cycle__item left"
      :class="aniName[aniIndex]"
    >
      left
    </div>
    <div class="flex-animation-cycle__item middle" :class="aniName[aniIndex]">
      <div class="middle-inner">middle-inner</div>
    </div>
    <div class="flex-animation-cycle__item right">right</div>
  </div>
</template>

<script>
export default {
  name: "FlexAnimationCycleDemo",
  data() {
    return {
      aniName: ["", "aniOne", "aniTwo", "aniThree"],
      aniIndex: 0,
    };
  },
  mounted() {
    this.aniLeftRun();
  },
  methods: {
    aniLeftRun() {
      const left = this.$refs.left;
      setInterval(() => {
        this.aniIndex++;
        if (this.aniIndex === 4) {
          this.aniIndex = 0;
        }
      }, 3000);
    }
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
.flex-animation-cycle-demo {
  width: 100%;
  height: 400px;
  display: flex;
}
.flex-animation-cycle__item {
  font-family: fa-Coustard, sans-serif;
  font-size: 20px;
  color: #fff;
  border-right: 1px solid #fff;
  background-color: #1c1f25;
  height: 100%;
  &.left {
    width: 200px;
    transition: width 1.2s ease;
  }
  &.middle {
    flex: 1.1;
    height: 100%;
    transition: flex 1.2s ease, height 1.2s ease;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    // align-items: center;
    position: relative;
  }
  &.right {
    flex: 1; //1.1
    transition: flex 1.2s ease;
  }
  &:last-child {
    border-right: none;
  }
}
.flex-animation-cycle__item.aniOne.left {
  width: 100px;
}
.flex-animation-cycle__item.aniTwo.left {
  width: 0;
}
.flex-animation-cycle__item.aniOne.middle > .middle-inner {
  height: 20%;
}
.flex-animation-cycle__item.aniThree.middle > .middle-inner {
  height: 32%;
}
.middle-inner{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50%;
  border-top: 1px solid #fff;
  transition: height 1.2s ease;
}
</style>
