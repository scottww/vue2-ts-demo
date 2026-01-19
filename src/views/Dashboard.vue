<template>
  <div class="dashboard">
    <HeaderLayout v-if="!isFull" />
    <LeftRightLayout v-if="!isFull" />
    <router-view v-if="!isFull" />

    <!-- 全屏页面直接占满 -->
    <div class="full-page" v-if="isFull">
      <router-view />
    </div>
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
  },
  computed: {
    isFull() {
      return this.$route.meta.isFull === true;
    },
    showHeader() {
      return this.$route.meta.showHeader === true;
    }
  }
};
</script>

<style scoped>
.dashboard {
  height: 100%;
  overflow: hidden;
}

.full-page {
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>
