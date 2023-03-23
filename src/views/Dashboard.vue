<template>
  <div class="dashboard">
    <Header />
    <LeftRightLayout />
  </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import LeftRightLayout from "@/components/LeftRightLayout.vue";
export default {
  name: "Dashboard",
  components: {
    Header,
    LeftRightLayout,
  },
};
</script>

<style scoped>
.dashboard {
  height: 100%;
  overflow: hidden;
}
</style>
