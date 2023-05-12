<template>
  <div class="color-demo">
    <div class="color-demo__section">
      <color showLabel :data="colors" />
    </div>

    <div class="color-demo__section">
      <!-- 动态组件写法 -->
      <!-- <component :is="'HGrid'" :data="colors" /> -->
      <h-grid :data="colors" span="4" />
    </div>
  </div>
</template>

<script>
import Color from "@/components/color";
import HGrid from "@/components/h-ui/grid";
import { COLORS } from "./data";
export default {
  name: "ColorDemo",
  components: {
    Color,
    HGrid
  },
  data() {
    return {
      colors: COLORS
    };
  }
};
</script>

<style scoped>
.color-demo {
  width: 100%;
  height: 100%;
}

.color-demo .color-demo__section{
  height: 200px;
}
.color-demo:after {
  content: "";
  display: table;
}
</style>
