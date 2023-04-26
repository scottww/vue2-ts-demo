<template>
  <div class="decorator-demo">
    <h3 ref="log" class="log"></h3>
    <div>{{ message }}</div>
    <h2>input</h2>
    <input
      type="text"
      :value="inputValue"
      @input="handleInput"
      @mouseover="handleHover"
    />
    <div>{{ inputValue }}</div>
    <div ref="tip">
      <div v-for="(i, index) in tips" :key="`tip-${index}`">{{ i }}</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import { log } from "@/utils/Log";
import { debounce, throttle } from "@/utils/decorator";

@Component
export default class Decorator extends Vue {
  // Declared as component data
  message = "decorator: log";
  inputValue = "";
  hoverTip = "";
  tips = [];

  @log()
  init() {
    console.log("start init");
    const logEl = this.$refs.log;
    logEl.innerText = "<!-- log -->";
  }

  @debounce(2000)
  handleInput(e) {
    this.inputValue = e.target.value;
  }

  @throttle(5000)
  handleHover() {
    console.log("鼠标移入了input框");
    // this.$refs.tip.appendChild("<div>鼠标移入了input框</div>");
    // this.tip += "鼠标移入了input框";
    this.tips.push("鼠标移入了input框");
  }

  mounted() {
    this.init();
  }
}
</script>

<style scoped>
.decorator-demo {
  text-align: left;
}
</style>
