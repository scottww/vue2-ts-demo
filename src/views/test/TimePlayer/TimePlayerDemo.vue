<template>
  <div class="TimePlayerDemo__container" style="padding: 10px">
    <div class="section">
      <TimePlayer0 />
    </div>
    <div class="section">
      <TimePlayer1 />
    </div>
    <div class="section">
      <TimePlayer />
    </div>
  </div>
</template>

<script>
import TimePlayer0 from "./TimePlayer0.vue";
import TimePlayer1 from "./TimePlayer1.vue";
import TimePlayer from "./TimePlayer.vue";

export default {
  components: { TimePlayer0, TimePlayer1, TimePlayer },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 
}
</style>
