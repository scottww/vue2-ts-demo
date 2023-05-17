<template>
  <div class="flex-box">
    <div class="flex-box__item" v-for="(item, index) in data" :key="index">
      <div class="item-text">
        <p>{{ item.name }}</p>
        <p>{{ item.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class FlexBox extends Vue {
  @Prop({
    type: Array,
    default: () => []
  })
  private data!: any[];
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
