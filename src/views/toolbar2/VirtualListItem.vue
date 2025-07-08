<template>
  <div
    style="
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #eee;
      padding-left: 10px;
    "
  >
    {{ source.id }} - {{ source.text }}
  </div>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    // index of current item
    index: {
      type: Number
    },
    source: {
      type: Object,
      default() {
        return {};
      }
    },
    // address: {
    //   type: Object,
    //   default() {
    //     return {};
    //   }
    // },
    // basisInfo: {
    //   type: Array,
    //   default() {
    //     return [];
    //   }
    // }
  },
  mounted() {
    console.log(this.index, this.source);
  }
};
</script>

<style>
</style>