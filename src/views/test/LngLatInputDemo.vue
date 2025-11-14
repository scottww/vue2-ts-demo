<template>
  <div class="LngLatInputDemo-demo">
    <label>输入经度：</label>
    <LngLatInput />
  </div>
</template>

<script>
import LngLatInput from "./LngLatInput.vue";
export default {
  components: {
    LngLatInput
  }
};
</script>

<style scoped>
.LngLatInput-demo {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 8px;
}
</style>