<template>
  <div class="class-components-demo">
    <h3>vue-class-component类组件的使用</h3>
    <Counter />
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import Counter from "@/components/Counter";

@Component({
  name: "ClassComponents",
  components: {
    Counter
  }
})
export default class ClassComponents extends Vue {}
</script>

<style scoped>
.class-components-demo {
  text-align: left;
}
</style>
