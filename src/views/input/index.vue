<template>
  <div class="h-input-demo">
    <h3>自定义input组件</h3>
    <h-input v-model="message"></h-input>
    <div class="info">{{ message }}</div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import HInput from "@/components/h-ui/input";

@Component({
  name: "HInputDemo",
  components: { HInput }
})
export default class HWidgeDemo extends Vue {
  message = "";
}
</script>

<style lang="scss" scoped>
.h-input-demo {
  width: 220px;
  height: 32px;
  h3{
    margin-bottom: 20px;
  }
  .info {
    margin-top: 10px;
    font-size: 14px;
  }
}
</style>
