<!-- 支持动态图标后，支持formmater -->
<template>
  <div class="alarm-table-container">
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
</template>

<script>
export default {
  name: "AlarmTable",
  props: {
    columns: { type: Array, required: true }, // [{ prop, label, width, formatter }]
    data: { type: Array, required: true }
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
      // 空值显示 "--"
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
  overflow-x: auto;
  background: linear-gradient(to bottom, #0f2c59, #1c4587);
  padding: 10px;
  border-radius: 4px;
}

.alarm-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
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
  padding: 0 15px;
  color: #fff;
}

.table-header th {
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  padding: 12px 15px;
}

.even-row,
.odd-row {
  background: rgba(2, 48, 91, 0.8);
  box-shadow: inset 3px 0px 7px 0px #009cff;
  border-radius: 2px;
  height: 45px;
}

.cell-icon0 {
  display: inline-flex;
  align-items: center;
  margin-right: 5px;
}

.cell-icon {
  display: inline-flex; /* 保持水平排列 */
  align-items: center; /* 垂直居中 */
  gap: 5px; /* 图标和文字间距 */
  vertical-align: bottom;
}

.custom-icon0 {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.custom-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  display: inline-block; /* 避免 baseline 偏移 */
  vertical-align: middle; /* 进一步确保垂直居中 */
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.table-btn {
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  font-size: 14px;
  transition: color 0.3s;
  padding: 2px 0;
  border-bottom: 1px solid #1890ff;
}

.table-btn:hover {
  color: #40a9ff;
}
</style>
