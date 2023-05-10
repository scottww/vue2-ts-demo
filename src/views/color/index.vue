<template>
  <div class="color-demo">
    <color showLabel :data="colors" />
  </div>
</template>

<script>
import Color from "@/components/color";
import { COLORS } from "./data";
export default {
  name: "ColorDemo",
  components: {
    Color
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
.color-demo:after {
  content: "";
  display: table;
}
</style>
