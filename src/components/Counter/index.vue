<template>
  <div class="counter">
    <button v-on:click="decrement">-</button>
    {{ count }}
    <button v-on:click="increment">+</button>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

// Define the component in class-style
@Component({
  name: "Counter",
  components: {}
})
export default class Counter extends Vue {
  // Class properties will be component data
  count = 0;

  // Methods will be component methods
  decrement() {
    this.count--;
  }

  increment() {
    this.count++;
  }
}
</script>

<style lang="scss" scoped>
.counter {
  button {
    width: 60px;
    height: 30px;
  }
}
</style>
