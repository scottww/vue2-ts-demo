<template>
  <!-- <div class="status-table-wrapper virtual">
    <virtual-list
      :size="50"
      :remain="10"
      :data-key="'id'"
      :data-sources="items"
      :data-component="ListItem"
    >
    </virtual-list>
  </div> -->
  <div style="height: 400px; border: 1px solid #ccc">
    <virtual-list
      style="height: 100%; overflow-y: auto"
      :size="50"
      :remain="10"
      :data-key="'id'"
      :data-sources="tableData"
      :data-component="RowComponent"
      :extra-props="{ columns}"
    />
  </div>
</template>

<script>
import VirtualList from "vue-virtual-scroll-list";
import RowComponent from "./RowComponent.vue";

export default {
  name: "VirtualStatusTable",
  components: {
    VirtualList,
    // RowComponent,
  },
  props: {
    tableData: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    rowHeight: {
      type: Number,
      default: 38
    },
    visibleCount: {
      type: Number,
      default: 15
    }
  },
  data() {
    return {
      items: Array.from({ length: 1000 }).map((_, i) => ({
        id: i + 1,
        text: "Item #" + (i + 1)
      })),
      RowComponent
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
