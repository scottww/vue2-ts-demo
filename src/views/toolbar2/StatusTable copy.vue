<template>
  <div class="status-table-wrapper">
    <el-table
      :data="[]"
      style="width: 100%"
      :header-cell-style="headerStyle"
      border
      show-header
      :row-style="() => ({})"
      :cell-style="() => ({})"
      class="custom-table no-border no-hover"
      :fit="true"
      table-layout="fixed"
      ref="elTable"
    >
      <el-table-column
        v-for="(col, index) in columns"
        :key="col.prop || index"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :min-width="col.minWidth || 50"
        :align="col.align || 'center'"
        cell-class-name="custom-cell"
      />
    </el-table>

    <!-- 虚拟滚动表体 -->
    <div
      class="virtual-body-wrapper"
      :style="{ height: tableHeight + 'px', overflow: 'auto' }"
      ref="scrollWrapper"
      @scroll="onScroll"
    >
      <div
        class="virtual-spacer"
        :style="{ height: totalHeight + 'px', position: 'relative' }"
      >
        <virtual-list
          :size="rowHeight"
          :remain="visibleCount"
          :keeps="visibleCount"
          :data-key="'id'"
          :data-sources="visibleData"
          :data-component="VirtualRow"
          :extra-props="{ columns }"
          :style="{
            position: 'absolute',
            top: startOffset + 'px',
            left: 0,
            right: 0
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VirtualList from "vue-virtual-scroll-list";
import VirtualRow from "./VirtualRow.vue";

export default {
  name: "StatusTable",
  components: {
    VirtualList,
    // VirtualRow //这个要放在data中
  },
  props: {
    tableData: { type: Array, required: true },
    columns: { type: Array, required: true },
    rowHeight: { type: Number, default: 38 },
    visibleCount: { type: Number, default: 15 },
    tableHeight: { type: Number, default: 600 }
  },
  data() {
    return {
      scrollTop: 0,
      VirtualRow
    };
  },
  computed: {
    totalHeight() {
      return this.tableData.length * this.rowHeight;
    },
    startIndex() {
      return Math.floor(this.scrollTop / this.rowHeight);
    },
    endIndex() {
      return Math.min(
        this.startIndex + this.visibleCount + 5,
        this.tableData.length
      );
    },
    visibleData() {
      return this.tableData.slice(this.startIndex, this.endIndex);
    },
    startOffset() {
      return this.startIndex * this.rowHeight;
    }
  },
  methods: {
    headerStyle() {
      return {
        background: "#012b52",
        color: "#fff",
        fontWeight: "bold"
      };
    },
    onScroll(event) {
      const scrollWrapper = this.$refs.scrollWrapper;
      this.scrollTop = scrollWrapper.scrollTop;

      // 水平滚动同步表头
      const elTable = this.$refs.elTable;
      if (elTable && elTable.$el) {
        const headerWrapper = elTable.$el.querySelector(
          ".el-table__header-wrapper"
        );
        if (headerWrapper) {
          headerWrapper.scrollLeft = scrollWrapper.scrollLeft;
        }
      }
    }
  }
};
</script>

<style scoped>
.status-table-wrapper {
  width: 100%;
  max-width: 440px;
  font-size: 12px;
  color: white;
}

.virtual-body-wrapper {
  /* border-top: 1px solid #012b52; */
}

.custom-table.no-border.el-table .cell {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

/* 保持你原来的样式 */
.custom-table.no-hover >>> .el-table__body tr:hover > td {
  background-color: transparent !important;
}

.custom-table.no-border >>> .el-table::before,
.custom-table.no-border >>> .el-table__header-wrapper::after,
.custom-table.no-border >>> .el-table__body-wrapper::after {
  display: none;
}

.custom-table.no-border >>> .el-table__row td {
  border-bottom: none !important;
}

/* 可以继续放你原来 .col-index, .col-time, .status-dot 等样式 */
</style>
