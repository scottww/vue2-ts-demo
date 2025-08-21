<!-- 这个仅支持图标类 -->
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
            :title="row[col.prop]"
          >
            <!-- 插槽：支持自定义渲染 -->
            <slot :name="col.prop" :row="row" :value="row[col.prop]">
              {{ row[col.prop] }}
            </slot>
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
    columns: {
      type: Array,
      required: true // [{ prop, label, width }]
    },
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatWidth(width) {
      if (!width) return "auto";
      if (typeof width === "number") return width + "px";
      return width; // 100 或 '100px' 或 '20%'
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
  border-spacing: 0 10px; /* 每行之间间隔 */
  table-layout: fixed; /* 关键：省略号生效 */
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
  /* background: #02305b; */
  background: rgba(2, 48, 91, 0.8); /* 用 rgba 代替 opacity */
  box-shadow: inset 3px 0px 7px 0px #009cff;
  border-radius: 2px;
  /* opacity: 0.8; */
  height: 45px;
}

.alarm-type {
  display: flex;
  align-items: center;
}

.warning-icon {
  width: 16px;
  height: 16px;
  background-color: #f5222d;
  border-radius: 50%;
  margin-right: 8px;
  position: relative;
}
.warning-icon::after {
  content: "!";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 10px;
  font-weight: bold;
}

.info-icon {
  width: 16px;
  height: 16px;
  background-color: #1890ff;
  border-radius: 50%;
  margin-right: 8px;
  position: relative;
}
.info-icon::after {
  content: "i";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 10px;
  font-weight: bold;
}

/* .action-buttons {
  display: flex;
  gap: 10px;
}

.detail-btn,
.delete-btn {
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  font-size: 16px;
  text-decoration: underline;
  transition: color 0.3s;
}

.detail-btn:hover,
.delete-btn:hover {
  color: #40a9ff;
} */

.action-buttons {
  display: flex;
  gap: 10px;
}

.table-btn {
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  font-size: 16px;
  transition: color 0.3s;
  padding: 2px 0;
  border-bottom: 1px solid #1890ff;
}

.table-btn:hover {
  color: #40a9ff;
}
</style>
