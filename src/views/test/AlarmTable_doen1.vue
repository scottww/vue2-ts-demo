<!-- 支持icon类、自定义image，但是不支持动态图标 -->
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
            <!-- 支持自定义渲染 -->
            <slot :name="col.prop" :row="row" :value="row[col.prop]">
              <!-- 如果列定义了 icon 或 image 属性，就渲染图片 -->
              <span v-if="col.icon || col.image" class="cell-icon">
                <img
                  v-if="col.image"
                  :src="row[col.prop + 'Image'] || col.image"
                  class="custom-icon"
                />
                <i v-else-if="col.icon" :class="row[col.prop + 'Icon'] || col.icon"></i>
              </span>
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
      required: true
      // [{ prop, label, width, icon?, image? }]
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
      return width; // '100px' 或 '20%'
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

.cell-icon {
  display: inline-flex;
  align-items: center;
  margin-right: 5px;
}

.custom-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

/* 按钮样式 */
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
