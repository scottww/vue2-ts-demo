<template>
  <div class="h-grid">
    <div class="h-grid__container" :style="{ '--span': colNum }">
      <div
        class="h-grid__item"
        v-for="(item, index) in data"
        :key="`item-${index}`"
        :style="{ '--bgcolor': item.desc }"
      >{{ item.name }}{{ item.desc }}</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "HGrid",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    // 共24格，每行占多少格
    span: {
      type: [String, Number],
      default: 12
    }
  }
})
export default class HGrid extends Vue {
  get colNum() {
    return 24 / Number(this.span);
  }
}
</script>

<style lang="scss" scoped>
.h-grid {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  &__container {
    display: grid;
    grid-template-columns: repeat(var(--span), 1fr); /* 每行四列，宽度平分 */
    grid-gap: 10px; /* 列之间的间距 */
  }
  &__item {
    height: 60px;
    line-height: 44px;
    padding: 8px;
    // border: 1px solid black;
    box-sizing: border-box;
    background-color: var(--bgcolor);
  }
  &:after,
  &:before {
    content: "";
    display: table;
  }
}
</style>
