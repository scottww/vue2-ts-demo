<template>
  <div class="carousel-demo">
    <!-- <div class="card-carousel-demo">
      <h-card-carousel autoplay :data="[1, 2, 3, 4, 5]" speed="1000" />
    </div> -->
    <h-card-carousel autoplay :data="[1, 2, 3, 4, 5]" speed="1000" />
    <h-carousel autoplay :data="[1, 2, 3, 4, 5]" speed="1000" />
  </div>
</template>

<script>
import { HCardCarousel } from "@/components/h-ui";
import { HCarousel } from "@/components/h-ui";
export default {
  name: "CarouselDemo",
  components: {
    HCardCarousel,
    HCarousel
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.carousel-demo {
  width: 100%;
  height: 100%;
}
.carousel-demo:after {
  content: "";
  display: table;
}
</style>
