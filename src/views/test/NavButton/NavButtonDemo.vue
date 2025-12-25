<template>
  <div class="NavButtonDemo" style="padding: 10px">
    <NavButton text="按钮文字1" @click="handleClick('按钮文字1')" />
    <NavButton text="按钮文字2" @click="handleClick('按钮文字2')" />
    <NavButton text="按钮文字3" @click="handleClick('按钮文字3')" />
  </div>
</template>

<script>
import NavButton from "./NavButton.vue";

export default {
  components: { NavButton },
  data() {
    return {};
  },methods: {
    handleClick(text) {
      console.log('点击了按钮 ...', text);
    },
  }
};
</script>
