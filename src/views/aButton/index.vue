<template>
  <div class="a-button-demo">
    <a-button><span>click me</span></a-button>
    <br />
    <an-button size="" @click="onClick"><span>click me</span></an-button>
  </div>
</template>

<script>
// import { Button } from 'ant-design-vue';
import AnButton from "@/components/re-antdv/AButton.vue";

export default {
  name: "AButtonDemo",
  components: { AnButton },
  data() {
    return {};
  },

  mounted() {},

  methods: {
    onClick(evt) {
      console.log("a-button-demo", evt);
    }
  }
};
</script>

<style lang="scss" scoped></style>
