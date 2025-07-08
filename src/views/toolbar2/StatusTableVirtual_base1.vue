<template>
  <div class="status-table-wrapper" ref="wrapper">
    <!-- 表头 -->
    <div
      class="table-header"
      ref="header"
      style="
        display: flex;
        background: #012b52;
        color: white;
        font-weight: bold;
        user-select: none;
      "
    >
      <div
        v-for="(col, i) in columns"
        :key="col.prop || i"
        :style="{
          width: columnWidths[i] + 'px',
          minWidth: columnWidths[i] + 'px',
          maxWidth: columnWidths[i] + 'px',
          padding: '0 6px',
          textAlign: col.align || 'center',
          lineHeight: rowHeight + 'px',
          borderBottom: '1px solid #0b83f5'
        }"
      >
        {{ col.label }}
      </div>
    </div>

    <!-- 空数据提示 -->
    <div v-if="tableData.length === 0" class="empty-placeholder">暂无数据</div>

    <!-- 虚拟滚动列表 -->
    <virtual-list
      class="virtual-list"
      :size="rowHeight"
      :remain="visibleCount"
      :data-key="'id'"
      :data-sources="tableData"
      :data-component="VirtualRow"
      :extra-props="{ columns, columnWidths, rowHeight }"
      style="height: 600px; overflow-y: auto"
      @scroll="handleScroll"
      @row-click="rowClick"
      ref="virtualList"
    />
  </div>
</template>

<script>
import VirtualList from "vue-virtual-scroll-list";
import VirtualRow from "./VirtualRow.vue";

export default {
  name: "StatusTableVirtual",
  components: { VirtualList },
  props: {
    tableData: { type: Array, required: true },
    columns: { type: Array, required: true },
    rowHeight: { type: Number, default: 38 },
    visibleCount: { type: Number, default: 15 }
  },
  data() {
    return {
      columnWidths: [],
      VirtualRow //这个不能放在componnets中否则报错
    };
  },
  mounted() {
    this.calcColumnWidths();
  },
  methods: {
    calcColumnWidths() {
      if (!this.columns || !this.columns.length) {
        this.columnWidths = [];
        return;
      }
      // 根据 columns 的 width 或 minWidth 生成宽度数组，保持和表头对齐
      this.columnWidths = this.columns.map((col) => {
        if (col.width) return col.width;
        if (col.minWidth) return parseInt(col.minWidth);
        return 50; // 默认宽度
      });
    },
    handleScroll(e) {
      // 横向滚动时同步表头滚动
      this.$refs.header.scrollLeft = e.target.scrollLeft;
    },
    rowClick(row) {
      this.$emit("row-click", row);
    }
  },
  watch: {
    columns: {
      handler() {
        this.calcColumnWidths();
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped>
.status-table-wrapper {
  border: 1px solid #012b52;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  /* width: 440px; */
  width: 100%;
}
.table-header {
  overflow-x: auto;
}
.virtual-list {
  overflow-x: auto !important;
}
.empty-placeholder {
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  background: #001f3f;
  font-size: 14px;
}
</style>
