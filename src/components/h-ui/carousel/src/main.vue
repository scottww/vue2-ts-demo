<template>
  <div class="carousel">
    <div
      class="slide"
      v-for="(image, index) in images"
      :key="index"
      :class="{ active: currentIndex === index }"
    >
      <!-- <img :src="image" alt="Slide" /> -->
      <div class="content">
        {{ image }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
//使用 vue-property-decorator 的写法
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "HCarousel"
})
export default class HCarousel extends Vue {
  @Prop({
    type: Array,
    default: []
  })
  public data!: Array<number> | Array<string>;
  @Prop({
    type: Boolean,
    default: false
  })
  readonly autoplay!: string;
  public speed!: string;
  private currentIndex = 0;
  private images: Array<number> | Array<string> = this.data;
  private timer = 0;

  mounted() {
    console.log("mounted");
    this.startCarousel();
  }

  startCarousel() {
    this.timer = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000); // 每隔3秒自动切换
  }

  beforeDestory() {
    if (this.timer !== 0) clearInterval(this.timer);
  }
}
</script>

<style lang="scss" scoped>
.carousel {
  position: relative;
  width: 100%;
  height: 300px; /* 根据需要调整轮播图的高度 */
  overflow: hidden;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.slide.active {
  opacity: 1;
}

.content {
  width: 100%;
  height: 100%;
  background-color: #d1d2d4;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
