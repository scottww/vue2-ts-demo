<template>
  <div class="virtual-list-container">
    <HVirtualList />
  </div>
</template>

<script>
import HVirtualList from "@/components/HVirtualList.vue";
export default {
  name: "VirtualList",
  components: { HVirtualList }
};
</script>
<style scoped>
.virtual-list-container {
}
</style>
