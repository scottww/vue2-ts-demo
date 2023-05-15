<template>
  <div class="carousel-demo">
    <h-card-carousel autoplay :data="images" :speed="speed" />
    <div class="section-container">
      <!-- <h2>与指示器的结合使用 #</h2> -->
      <h-carousel autoplay :data="[1, 2, 3]" speed="1000" />
      <div class="bottom">
        <h-indicators :data="[1, 2, 3]" delay="1000" height="3" />
      </div>
    </div>
  </div>
</template>

<script>
import { HCardCarousel, HCarousel, HIndicators } from "@/components/h-ui";
export default {
  name: "CarouselDemo",
  components: {
    HCardCarousel,
    HCarousel,
    HIndicators
  },
  data() {
    return {
      images: [1, 2, 3, 4, 5],
      speed: 1000
    };
  }
};
</script>

<style lang="scss" scoped>
.carousel-demo {
  width: 100%;
  height: 100%;
}
.carousel-demo:after {
  content: "";
  display: table;
}

.section-container {
  position: relative;
  .bottom {
    position: absolute;
    left: 10px;
    bottom: 10px;
    ::v-deep(.h-indicators > .h-indicators__item) {
      background-color: #fff;
    }
  }
}
</style>
