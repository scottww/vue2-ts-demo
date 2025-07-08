<template>
  <div class="virtual-table-wrapper" ref="wrapper">
    <!-- 表头 -->
    <div class="table-header" ref="header">
      <div
        v-for="(col, i) in columns"
        :key="col.prop || i"
        :style="getHeaderCellStyle(i, col)"
      >
        {{ col.label }}
      </div>
    </div>

    <!-- 内容区 -->
    <div class="table-body-scroll" ref="scrollContainer" @scroll="handleScroll">
      <virtual-list
        class="virtual-list"
        :size="rowHeight"
        :remain="visibleCount"
        :data-key="'id'"
        :data-sources="tableData"
        :data-component="VirtualRow"
        :extra-props="{ columns, columnWidths, rowHeight }"
        ref="virtualList"
      />
    </div>

    <div v-if="tableData.length === 0" class="empty-placeholder">暂无数据</div>
  </div>
</template>

<script>
import VirtualList from "vue-virtual-scroll-list";
import VirtualRow from "./VirtualRow.vue";

export default {
  name: "AutoFitVirtualTable",
  components: { VirtualList },
  props: {
    tableData: { type: Array, required: true },
    columns: { type: Array, required: true },
    rowHeight: { type: Number, default: 38 },
    visibleCount: { type: Number, default: 15 },
    fit: { type: Boolean, default: true } // 是否自动撑满容器宽度
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
      const wrapperWidth = this.$refs.wrapper?.clientWidth || 0;
      let fixedWidths = [];
      let autoCols = [];

      this.columnWidths = this.columns.map((col, i) => {
        if (col.width) {
          fixedWidths.push(col.width);
          return col.width;
        } else if (col.minWidth) {
          fixedWidths.push(col.minWidth);
          return col.minWidth;
        } else {
          autoCols.push(i);
          return 0; // 先填 0
        }
      });

      if (this.fit && wrapperWidth > 0) {
        const used = fixedWidths.reduce((a, b) => a + b, 0);
        const remaining = wrapperWidth - used;
        const share = Math.floor(remaining / autoCols.length);
        autoCols.forEach((i) => {
          this.columnWidths[i] = share > 50 ? share : 50;
        });
      } else {
        autoCols.forEach((i) => {
          this.columnWidths[i] = 50;
        });
      }
    },
    handleScroll(e) {
      const scrollLeft = e.target.scrollLeft;
      if (this.$refs.header) {
        this.$refs.header.scrollLeft = scrollLeft;
      }
    },
    getHeaderCellStyle(i, col) {
      const width = this.columnWidths[i] || 50;
      return {
        width: width + "px",
        minWidth: width + "px",
        maxWidth: width + "px",
        padding: "0 6px",
        textAlign: col.align || "center",
        lineHeight: this.rowHeight + "px",
        borderBottom: "1px solid #0b83f5"
      };
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
.virtual-table-wrapper {
  border: 1px solid #012b52;
  font-family: Helvetica, Arial, sans-serif;
  width: 100%;
  position: relative;
}
.table-header {
  display: flex;
  background: #012b52;
  color: white;
  font-weight: bold;
  user-select: none;
  overflow: hidden;
}
.table-body-scroll {
  height: 600px;
  overflow: auto;
  padding: 0;
  margin: 0;
  scrollbar-width: thin;
  scrollbar-color: rgba(1, 43, 82, 0.3) transparent;
}
.virtual-list {
  min-width: 100%;
  box-sizing: border-box;
}
.empty-placeholder {
  position: absolute;
  top: 38px;
  left: 0;
  right: 0;
  height: calc(100% - 38px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  background: #001f3f;
  font-size: 14px;
  pointer-events: none;
}
::v-deep(.table-body-scroll::-webkit-scrollbar) {
  height: 4px;
  width: 4px;
}
::v-deep(.table-body-scroll::-webkit-scrollbar-thumb) {
  background-color: rgba(1, 43, 82, 0.3);
  border-radius: 2px;
}
::v-deep(.table-body-scroll::-webkit-scrollbar-track) {
  background-color: transparent;
}
</style>