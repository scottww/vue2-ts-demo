<template>
  <div ref="wrapper" class="status-table-wrapper">
    <!-- 横向滚动容器 -->
    <div class="scroll-container" ref="scrollContainer" @scroll="handleScroll">
      <!-- 表头 -->
      <div
        class="table-header"
        ref="header"
        :style="{ width: totalWidth + 'px' }"
      >
        <div
          v-for="(col, i) in columns"
          :key="col.prop || i"
          class="table-header-cell"
          :style="{
            width: columnWidths[i] + 'px',
            textAlign: col.align || 'center'
          }"
        >
          <div class="header-label">{{ col.label }}</div>
          <div class="header-unit" v-if="col.unit">{{ col.unit }}</div>
        </div>
      </div>

      <!-- 内容区 -->
      <div
        class="virtual-list-wrapper"
        :style="{
          width: totalWidth + 'px',
          height: contentHeight + 'px',
          overflowY: 'auto',
          overflowX: 'hidden'
        }"
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
          style="width: 100%"
        />
      </div>
    </div>

    <div v-if="tableData.length === 0" class="empty-placeholder">暂无数据</div>
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

        const flexibleWidth =
          flexibleCount > 0 ? Math.floor(remainingWidth / flexibleCount) : 50;

        // 先算出原始 columnWidths
        let columnWidths = this.columns.map((col) =>
          col.width ? Number(col.width) : flexibleWidth
        );

        // 如果总宽度小于容器宽，自动撑满：给最后一列补宽度
        const currentTotalWidth = columnWidths.reduce((sum, w) => sum + w, 0);
        if (currentTotalWidth < containerWidth) {
          columnWidths[columnWidths.length - 1] +=
            containerWidth - currentTotalWidth;
        }

        this.columnWidths = columnWidths;
      });
    },

    handleScroll(e) {
      const scrollLeft = e.target.scrollLeft;
      if (this.$refs.header) this.$refs.header.scrollLeft = scrollLeft;
      if (this.$refs.virtualWrapper)
        this.$refs.virtualWrapper.scrollLeft = scrollLeft;
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
  height: 100%; /* 由外部父组件控制高度 */
  display: flex;
  flex-direction: column;
  background-color: #083b6c;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
  box-sizing: border-box;
}

.scroll-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  overflow-y: hidden;
}

/* 表头 */
.table-header {
  display: flex;
  white-space: nowrap;
  border-bottom: 1px solid #0b83f5;
  user-select: none;
  height: 38px; /* 表头高度固定 */
  flex-shrink: 0;
}

.table-header-cell {
  /* font-weight: bold;
  background: #012b52;
  color: #fff;
  line-height: 38px;
  flex-shrink: 0;
  box-sizing: border-box; */

  font-weight: bold;
  background: #012b52;
  color: #fff;
  flex-shrink: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.2;
  padding: 4px 2px;
  height: 38px; /* 总高度固定为38 */
}

.header-label {
  font-size: 13px;
  font-weight: bold;
}

.header-unit {
  font-size: 12px;
  color: #b0c4de;
  line-height: 1.2;
}

/* 内容区外层 */
.virtual-list-wrapper {
  flex: 1; /* 高度自适应填满剩余 */
  overflow-y: auto;
  overflow-x: hidden;
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
