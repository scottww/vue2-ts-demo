<template>
  <div class="status-table-wrapper virtual">
    <virtual-list
      class="virtual-list"
      :size="rowHeight"
      :remain="visibleCount"
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
    RowComponent
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
      default: 38 // 每行高度，单位 px
    },
    visibleCount: {
      type: Number,
      default: 15 // 屏幕上最多可见行数
    }
  },
  data() {
    return {
      // RowComponent
    };
  },
  created() {
    console.log("RowComponent data:", this.tableData, this.columns);
  },
  computed: {
    RowComponent() {
      return this.$options.components.RowComponent;
    }
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
