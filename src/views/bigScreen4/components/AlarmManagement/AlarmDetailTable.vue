<template>
  <div class="alarm-table-container">
    <!-- 表头固定 -->
    <div class="table-header-wrapper">
      <table class="alarm-table">
        <thead>
          <tr class="table-header">
            <th
              v-for="(col, hIndex) in columns"
              :key="hIndex"
              :style="{ width: formatWidth(col.width) }"
              :title="col.label"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
      </table>
    </div>

    <!-- 表体可滚动 -->
    <div class="table-body-wrapper" :style="{ maxHeight: bodyHeight + 'px' }">
      <table class="alarm-table">
        <tbody>
          <tr
            v-for="(row, rIndex) in data"
            :key="rIndex"
            :class="rIndex % 2 === 0 ? 'even-row' : 'odd-row'"
          >
            <td
              v-for="(col, cIndex) in columns"
              :key="cIndex"
              :style="{ width: formatWidth(col.width) }"
              :title="getCellTitle(row, col)"
            >
              <!-- 自定义列 -->
              <template v-if="$scopedSlots[col.prop]">
                <slot :name="col.prop" :row="row" :value="row[col.prop]"></slot>
              </template>

              <!-- 普通列 -->
              <template v-else>
                {{ formatCell(row, col) }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlarmDetailTable",
  props: {
    columns: { type: Array, required: true },
    data: { type: Array, required: true },
    bodyHeight: { type: [String, Number], default: 300 } // 可配置滚动高度
  },
  methods: {
    formatWidth(width) {
      if (!width) return "auto";
      return typeof width === "number" ? width + "px" : width;
    },
    formatCell(row, col) {
      if (col.formatter && typeof col.formatter === "function") {
        return col.formatter(row[col.prop], row);
      }
      return row[col.prop] !== null &&
        row[col.prop] !== undefined &&
        row[col.prop] !== ""
        ? row[col.prop]
        : "--";
    },
    getCellTitle(row, col) {
      const value = this.formatCell(row, col);
      return value !== undefined && value !== null ? String(value) : "";
    }
  }
};
</script>

<style scoped>
.alarm-table-container {
  width: 100%;
  /* background: linear-gradient(to bottom, #0f2c59, #1c4587); */
  padding: 10px;
  border-radius: 4px;
}

/* 表头固定 */
.table-header-wrapper {
  overflow: hidden;
}

/* 表体滚动 */
.table-body-wrapper {
  overflow-y: auto;
  overflow-x: auto; /* 横向自适应 */
}

/* 自定义滚动条样式 */
.table-body-wrapper::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.table-body-wrapper::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.table-body-wrapper::-webkit-scrollbar-thumb {
  background: rgba(0, 156, 255, 0.6);
  border-radius: 4px;
}

.table-body-wrapper::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 156, 255, 0.9);
}

.alarm-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 6px;
  table-layout: fixed;
  font-size: 14px;
  text-align: left;
}

.alarm-table th,
.alarm-table td {
  height: 45px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 10px;
  color: #fff;
}

.table-header th {
  font-weight: bold;
  font-size: 16px;
  /* padding: 12px 15px; */
  padding: 10px 10px;
}

.even-row,
.odd-row {
  background: rgba(2, 48, 91, 0.8);
  box-shadow: inset 3px 0px 7px 0px #009cff;
  border-radius: 2px;
  height: 45px;
}

/* 图标与文字对齐 */
.cell-icon {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.custom-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  display: inline-block;
  vertical-align: middle;
}

/* 按钮样式 */
.action-buttons {
  display: flex;
  gap: 10px;
}

.table-btn {
  background: none;
  border: none;
  color: #33ccff;
  cursor: pointer;
  font-size: 14px;
  transition: color 0.3s;
  padding: 2px 0;
  border-bottom: 1px solid rgb(51, 204, 255);
}

.table-btn:hover {
  color: rgba(51, 204, 255, 0.7);
}
</style>
