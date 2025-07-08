<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :header-cell-style="headerStyle"
    :row-style="rowStyle"
    class="custom-table no-border"
    highlight-current-row
  >
    <el-table-column
      v-for="(col, index) in columns"
      :key="col.prop || index"
      :prop="col.prop"
      :label="col.label"
      :width="col.width"
      :align="col.align || 'center'"
    >
      <template slot-scope="scope">
        <!-- 👇 自定义列渲染逻辑 -->
        <div v-if="col.prop === 'index'" class="cell-wrapper col-index">
          <div class="index-bar"></div>
          <div class="index-text">0{{ scope.row.index }}</div>
        </div>

        <div v-else-if="col.prop === 'time'" class="cell-wrapper col-time">
          <span class="arrow-icon">▶</span>
          <span class="time-text">{{ scope.row.time }}</span>
        </div>

        <div v-else-if="col.prop === 'status'">
          <span
            class="status-dot"
            :class="{ online: scope.row.status === 'online' }"
          ></span>
        </div>

        <div v-else>
          {{ scope.row[col.prop] }}
          <span v-if="col.prop === 'name'" style="margin-left: 4px">
            x{{ scope.row.count }}
          </span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "StatusTable",
  props: {
    tableData: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true,
      default: () => []
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
    rowStyle() {
      return {
        background: "#083b6c",
        color: "#fff"
      };
    }
  }
};
</script>

<style scoped>
.custom-table.no-border >>> .el-table::before,
.custom-table.no-border >>> .el-table__header-wrapper::after,
.custom-table.no-border >>> .el-table__body-wrapper::after {
  display: none;
}
.custom-table.no-border >>> .el-table__row td {
  border-bottom: none !important;
}

/* 通用单元格布局 */
.cell-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 4px 8px;
  border-radius: 4px;
}

/* 序号列 */
.col-index {
  background-color: #003366;
  justify-content: center;
}
.index-bar {
  width: 4px;
  height: 18px;
  background-color: #00ccff;
  margin-right: 6px;
  border-radius: 2px;
}
.index-text {
  color: #fff;
  font-weight: bold;
}

/* 时间列 */
.col-time {
  background-color: #084b7c;
}
.arrow-icon {
  color: #00ccff;
  font-size: 14px;
  margin-right: 6px;
}
.time-text {
  color: #fff;
}

/* 状态圆点 */
.status-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #999;
  border-radius: 50%;
}
.status-dot.online {
  background-color: #00ff00;
}
</style>
