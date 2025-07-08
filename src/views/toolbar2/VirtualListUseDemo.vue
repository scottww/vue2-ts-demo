<template>
  <div style="height: 400px; border: 1px solid #ccc">
    <virtual-list
      style="height: 100%; overflow-y: auto"
      :size="50"
      :remain="10"
      :data-key="'id'"
      :data-sources="items"
      :data-component="ListItem"
    />
  </div>
</template>

<script>
import VirtualList from "vue-virtual-scroll-list";
import ListItem from "./VirtualListItem.vue";

export default {
  name: "VirtualListUseDemo",
  components: {
    VirtualList
  },
  data() {
    return {
      items: Array.from({ length: 1000 }).map((_, i) => ({
        id: i + 1,
        text: "Item #" + (i + 1)
      })),
      ListItem
    };
  }
};
</script>

<style scoped>
.status-table-wrapper.virtual {
  max-height: 100%;
  overflow: auto;
}
.virtual-list {
  width: 100%;
}
</style>
