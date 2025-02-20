<template>
  <div class="tools-box">
    <div class="tools-box_item">
      <!-- <img class="img-box" :src="require('@/assets/images/mapToolBar/add.png')" alt="" /> -->
      <img class="img-box" src="@/assets/mapToolBar/add.png" alt="" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "HMapToolBar",
  props: {
    imgPath: {
      type: String
    }
  }
})
export default class HMapToolBar extends Vue {}
</script>

<style>
</style>