<template>
  <div class="SwitchButton-demo">
    <SwitchButton0 />
    <SwitchButton />
  </div>
</template>

<script>
import SwitchButton0 from "./SwitchButton0.vue";
import SwitchButton from "./SwitchButton.vue";
export default {
  components: {
    SwitchButton0,
    SwitchButton
  }
};
</script>

<style scoped>
.SwitchButton-demo {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 8px;
}
</style>