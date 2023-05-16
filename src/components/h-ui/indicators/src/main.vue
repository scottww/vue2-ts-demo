<template>
  <div class="h-indicators">
    <div
      class="h-indicators__item"
      v-for="(item, index) in data"
      :key="index"
      :style="{ '--h': height + 'px' }"
    >
      <div class="h-indicators__item-inner"></div>
    </div>
  </div>
</template>

<script>
import Vue, { onMounted } from "vue";
import Component from "vue-class-component";

@Component({
  name: "HIndicators",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    // 每个进度条时间
    delay: {
      type: [String, Number],
      default: 3000
    },
    height: {
      type: [String, Number],
      default: 8
    }
  }
})
export default class HIndicators extends Vue {
  indicatorList = [];
  activeIndex = 0;
  timer = null; //定时器

  mounted() {
    const indicatorList = document.getElementsByClassName("h-indicators__item");
    this.indicatorList = indicatorList;
    this.timer = setInterval(() => {
      this.addClass(this.activeIndex);
    }, 3000); //3秒
    this.addClass(0); //首次加载页执行一次
  }

  addClass(idx) {
    console.log("addClass");

    console.log(idx);
    const { indicatorList, activeIndex } = this;
    const len = this.indicatorList.length;
    for (let i = 0; i < len; i++) {
      if (i === idx) {
        indicatorList[i].className = "h-indicators__item active";
      } else {
        indicatorList[i].className = "h-indicators__item";
      }
    }
    activeIndex === len - 1 ? (this.activeIndex = 0) : this.activeIndex++;
  }
  beforeDestroy() {
    //清除定时器
    if (this.timer) clearInterval(this.timer);
  }
}
</script>

<style lang="scss" scoped>
$main-color: #6bc3e6;
// .h-indicators__container {
//   position: absolute;
//   left: 18.75%;
//   bottom: 26.66%;
//   z-index: 2;
// }
.h-indicators {
  display: flex;
}
.h-indicators__item {
  width: 40px;
  height: var(--h);
  background: #d8d8d8;
  border-radius: 9999px;
  margin-right: 10px;
  padding: 0;
}
.h-indicators__item.active {
  width: 90px;
}
.active > .h-indicators__item-inner {
  border-radius: 9999px;
  background-color: $main-color;
  height: var(--h);
  animation: move 3s ease-out;
  -moz-animation: move 3s ease-out;
  -webkit-animation: move 3s ease-out;
}
@keyframes move {
  from {
    width: 0px;
  }
  to {
    width: 90px;
  }
}
</style>
