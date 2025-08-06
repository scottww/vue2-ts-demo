<template>
  <div class="dashboard">
    <HeaderLayout />
    <LeftRightLayout />
  </div>
</template>

<script>
import HeaderLayout from "@/components/Header.vue";
import LeftRightLayout from "@/components/LeftRightLayout";
export default {
  name: "Dashboard",
  components: {
    HeaderLayout,
    LeftRightLayout
  }
};
</script>

<style scoped>
.dashboard {
  height: 100%;
  overflow: hidden;
}
</style>
