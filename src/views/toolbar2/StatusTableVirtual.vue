<template>
  <div ref="wrapper" class="status-table-wrapper">
    <!-- 横向滚动容器 -->
    <div class="scroll-container" ref="scrollContainer" @scroll="handleScroll">
      <!-- 表头 -->
      <div class="table-header" ref="header" :style="{ width: totalWidth + 'px' }">
        <div
          v-for="(col, i) in columns"
          :key="col.prop || i"
          class="table-header-cell"
          :style="{ width: columnWidths[i] + 'px', textAlign: col.align || 'center' }"
        >
          {{ col.label }}
        </div>
      </div>

      <!-- 内容区 -->
      <div
        class="virtual-list-wrapper"
        :style="{ width: totalWidth + 'px', height: contentHeight + 'px', overflowY: 'auto', overflowX: 'hidden' }"
        ref="virtualWrapper"
      >
        <virtual-list
          ref="virtualList"
          class="virtual-list"
          :size="rowHeight"
          :remain="visibleCount"
          :data-key="'id'"
          :data-sources="tableData"
          :data-component="VirtualRow"
          :extra-props="{ columns, columnWidths, rowHeight, totalWidth }"
          style="width: 100%;"
        />
      </div>
    </div>

    <div v-if="tableData.length === 0" class="empty-placeholder">
      暂无数据
    </div>
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
    visibleCount: { type: Number, default: 15 },
    contentHeight: { type: Number, default: 400 }
  },
  data() {
    return {
      columnWidths: [],
      VirtualRow
    };
  },
  computed: {
    totalWidth() {
      return this.columnWidths.reduce((sum, w) => sum + w, 0);
    }
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
        if (!this.columns || this.columns.length === 0) {
          this.columnWidths = [];
          return;
        }

        const containerWidth = this.$refs.wrapper
          ? this.$refs.wrapper.clientWidth
          : 600;

        let fixedWidthSum = 0;
        let flexibleCount = 0;

        this.columns.forEach((col) => {
          if (col.width) fixedWidthSum += Number(col.width);
          else flexibleCount++;
        });

        let remainingWidth = containerWidth - fixedWidthSum;
        if (remainingWidth < 0) remainingWidth = 0;

        const flexibleWidth = flexibleCount > 0 ? Math.floor(remainingWidth / flexibleCount) : 50;

        this.columnWidths = this.columns.map((col) => {
          if (col.width) return Number(col.width);
          return flexibleWidth;
        });
      });
    },
    handleScroll(e) {
      const scrollLeft = e.target.scrollLeft;
      if (this.$refs.header) this.$refs.header.scrollLeft = scrollLeft;
      if (this.$refs.virtualWrapper) this.$refs.virtualWrapper.scrollLeft = scrollLeft;
    }
  },
  watch: {
    columns: {
      immediate: true,
      deep: true,
      handler() {
        this.calcColumnWidths();
      }
    }
  }
};
</script>

<style scoped>
.status-table-wrapper {
  width: 100%;
  border: 1px solid #012b52;
  background-color: #083b6c;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  box-sizing: border-box;
}

.scroll-container {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  box-sizing: border-box;
}

/* 表头 */
.table-header {
  display: flex;
  white-space: nowrap;
  border-bottom: 1px solid #0b83f5;
  user-select: none;
}

.table-header-cell {
  /* padding: 8px; */
  box-sizing: border-box;
  font-weight: bold;
  background: #012b52;
  color: #fff;
  /* border-right: 1px solid #0b83f5; */
  line-height: 38px;
  flex-shrink: 0;
}

/* 内容区外层 */
.virtual-list-wrapper {
  overflow-y: auto;
  overflow-x: hidden; /* 横向滚动交给scroll-container */
  box-sizing: border-box;
  white-space: nowrap;
}

/* 虚拟列表本体 */
.virtual-list {
  width: 100%;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  user-select: none;
}

.empty-placeholder {
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #aaa;
  background: #001f3f;
  font-size: 14px;
}
</style>
