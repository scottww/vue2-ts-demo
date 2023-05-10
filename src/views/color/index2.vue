<template>
  <div class="grid-demo">
    <h-grid :data="colors" span="4" />
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import HGrid from "@/components/h-ui/grid";
import { COLORS } from "./data";

@Component({
  name: "GridDemo",
  components: {
    HGrid
  }
})
export default class GridDemo extends Vue {
  colors = COLORS;
}
</script>

<style scoped>
.grid-demo {
}
</style>
