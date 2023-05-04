<template>
  <div class="h-input">
    <input
      :value="value"
      @input="$emit('input', $event.target.value)"
      placeholder="请输入"
    />
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "HInput",
  props: {
    value: {
      type: String,
      default: ""
    }
  }
})
export default class HInput extends Vue {}
</script>

<style lang="scss" scoped>
$font-color: var(--theme-color);
.h-input {
  width: 100%;
  height: 100%;
  input {
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    padding: 2px 8px;
    box-sizing: border-box;
    font-size: 14px;
    font-family: sans-serif;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
    &:focus {
      outline: 0;
      border-color: $font-color;
    }
  }
}
</style>
