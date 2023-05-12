<template>
  <div class="h-card-carousel">
    <div
      class="h-card-carousel__nav--left"
      @click="moveCarousel(-1)"
      :disabled="atHeadOfList"
    ></div>
    <div class="h-card-carousel__body">
      <div class="h-card-carousel__body-container">
        <div
          class="h-card-carousel__list"
          :style="{
            transform: 'translateX' + '(' + currentOffset + 'px' + ')'
          }"
        >
          <div
            class="h-card-carousel__list-item"
            v-for="(item, index) in items"
            :key="index"
          >
            <div class="h-card-carousel__list-item--body">{{ item }}</div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="h-card-carousel__nav--right"
      @click="moveCarousel(1)"
      :disabled="atEndOfList"
    ></div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "HCardCarousel",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    // 是否自动切换
    autoplay: {
      type: Boolean,
      default: false
    },
    // 自动切换时间间隔，毫秒
    speed: {
      type: [String, Number],
      default: 2000
    },
    width: {
      type: [String, Number],
      default: 240
    }
  }
})
export default class HCardCarousel extends Vue {
  currentOffset = 0;
  displayNum = 3; //视窗显示item个数
  itemWidth = this.width; //每一项的宽度width + marin值
  items = this.data;
  timer = null; //定时器

  get atEndOfList() {
    return (
      this.currentOffset <=
      this.itemWidth * -1 * (this.items.length - this.displayNum)
    );
  }
  get atHeadOfList() {
    return this.currentOffset === 0;
  }

  mounted() {
    if (this.autoplay) {
      this.startCarousel();
    }
  }
  //开启自动切换，启用定时函数
  startCarousel() {
    this.timer = setInterval(() => {
      if (!this.atEndOfList) {
        this.currentOffset -= this.itemWidth;
      } else {
        this.currentOffset = 0;
      }
    }, Number(this.speed));
  }

  moveCarousel(direction) {
    if (direction === 1 && !this.atEndOfList) {
      this.currentOffset -= this.itemWidth;
    } else if (direction === -1 && !this.atHeadOfList) {
      this.currentOffset += this.itemWidth;
    }
  }

  beforeDestroy() {
    //清除定时器
    if (this.timer) clearInterval(this.timer);
  }
}
</script>

<style lang="scss" scoped>
.h-card-carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 40px;
  color: #666a73;
}
.h-card-carousel .h-card-carousel__nav--left,
.h-card-carousel .h-card-carousel__nav--right {
  display: inline-block;
  width: 15px;
  height: 15px;
  padding: 10px;
  box-sizing: border-box;
  border-top: 3px solid var(--theme-color); //#42b883;
  border-right: 3px solid var(--theme-color);
  cursor: pointer;
  margin: 0 20px;
  transition: transform 150ms linear;
  &[disabled] {
    opacity: 0.3;
    border-color: #000;
  }
}
.h-card-carousel__nav--left {
  transform: rotate(-135deg);
}
.h-card-carousel__nav--left:active {
  transform: rotate(-135deg) scale(0.8);
}
.h-card-carousel__nav--right {
  transform: rotate(45deg);
}
.h-carousel__nav--right:active {
  transform: rotate(45deg) scale(0.8);
}
.h-card-carousel__body {
  display: flex;
  justify-content: center;
  width: 700px; //item的width + marin值
}
.h-card-carousel__body-container {
  overflow: hidden;
}
.h-card-carousel__list {
  display: flex;
  transition: transform 150ms ease-out;
  transform: translatex(0px);
}
.h-card-carousel__list-item {
  // border: 1px solid red;
  margin: 0 10px;
  cursor: pointer;
  box-shadow: 0 4px 15px 0 rgba(40, 44, 53, 0.06),
    0 2px 2px 0 rgba(40, 44, 53, 0.08);
  background-color: #fff; //#d1d2d4;
  z-index: 3;
  // margin-bottom: 2px;
  &:hover {
    opacity: 0.6;
  }
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
}
.h-card-carousel__list-item--body {
  background-color: var(--theme-color); //#d1d2d4;
  width: 220px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #fff;
}
</style>
