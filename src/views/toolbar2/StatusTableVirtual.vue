<template>
  <div ref="wrapper" class="status-table-wrapper">
    <!-- 表头 -->
    <div
      class="table-header"
      ref="header"
      :style="{
        display: 'flex',
        userSelect: 'none',
        overflowX: 'auto'
      }"
    >
      <div
        v-for="(col, i) in columns"
        :key="col.prop || i"
        :style="{
          width: columnWidths[i] + 'px',
          minWidth: columnWidths[i] + 'px',
          maxWidth: columnWidths[i] + 'px',
          padding: '0 8px',
          textAlign: col.align || 'center',
          lineHeight: rowHeight + 'px',
          borderBottom: '1px solid #0b83f5',
          backgroundColor: '#012b52',
          color: '#fff',
          fontWeight: 'bold',
          boxSizing: 'border-box'
        }"
      >
        {{ col.label }}
      </div>
    </div>

    <!-- 空数据提示 -->
    <div v-if="tableData.length === 0" class="empty-placeholder">
      暂无数据
    </div>

    <!-- 虚拟滚动列表 -->
    <virtual-list
      class="virtual-list"
      :size="rowHeight"
      :remain="visibleCount"
      :data-key="'id'"
      :data-sources="tableData"
      :data-component="VirtualRow"
      :extra-props="{ columns, columnWidths, rowHeight }"
      style="height: 400px; overflow-y: auto; overflow-x: auto"
      @scroll="handleScroll"
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
      VirtualRow
    };
  },
  mounted() {
    this.calcColumnWidths();
    window.addEventListener("resize", this.calcColumnWidths);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.calcColumnWidths);
  },
  methods: {
    calcColumnWidths() {
      this.$nextTick(() => {
        if (!this.columns || !this.columns.length) {
          this.columnWidths = [];
          return;
        }
        const containerWidth = this.$refs.wrapper
          ? this.$refs.wrapper.clientWidth
          : 440;

        let fixedTotal = 0;
        let flexibleCount = 0;

        this.columns.forEach((col) => {
          if (col.width) fixedTotal += Number(col.width);
          else flexibleCount++;
        });

        let remainingWidth = containerWidth - fixedTotal;
        if (remainingWidth < 0) remainingWidth = 0;

        const flexibleWidth = flexibleCount > 0
          ? Math.floor(remainingWidth / flexibleCount)
          : 0;

        this.columnWidths = this.columns.map((col) => {
          if (col.width) return Number(col.width);
          if (col.minWidth) return Math.max(flexibleWidth, Number(col.minWidth));
          return flexibleWidth || 50;
        });
      });
    },
    handleScroll(e) {
      this.$refs.header.scrollLeft = e.target.scrollLeft;
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
  width: 100%;
  background-color: #083b6c;
  color: #fff;
}
.table-header {
  overflow-x: auto;
  white-space: nowrap;
}

/* 空数据提示 */
.empty-placeholder {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  background: #001f3f;
  font-size: 14px;
}
.virtual-list {
  overflow-x: auto !important;
  overflow-y: auto !important;
  height: 400px; /* 固定高度可根据需求调整 */
}
</style>
