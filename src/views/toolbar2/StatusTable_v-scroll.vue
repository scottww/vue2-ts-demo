<template>
  <div class="status-table-wrapper">
    <el-table
      v-scroll
      :data="tableData"
      height="600"
      :row-height="38"
      :header-cell-style="headerStyle"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      class="custom-table no-border no-hover"
      :fit="true"
      table-layout="fixed"
    >
      <el-table-column
        v-for="(col, index) in columns"
        :key="col.prop || index"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :min-width="col.minWidth || '50'"
        :align="col.align || 'center'"
        cell-class-name="custom-cell"
      >
        <template slot-scope="scope">
          <!-- 自定义列渲染逻辑 -->
          <div
            v-if="col.prop === 'index'"
            class="col-index custom-cell"
            :title="scope.row[col.prop]"
          >
            <!-- <div class="index-text">0{{ scope.row.index }}</div> -->
            <div class="index-text">{{ scope.row.index }}</div>
          </div>

          <div
            v-else-if="col.prop === 'time'"
            class="col-time custom-cell"
            :title="scope.row[col.prop]"
          >
            <i class="el-icon-caret-right"></i>
            <span class="time-text">{{ scope.row.time }}</span>
          </div>

          <div
            v-else-if="col.prop === 'status'"
            class="col-others custom-cell"
            :title="scope.row[col.prop]"
          >
            <span
              class="status-dot"
              :class="{ online: scope.row.status === 'online' }"
            ></span>
          </div>

          <div
            v-else
            class="col-others custom-cell"
            :title="scope.row[col.prop]"
          >
            {{ scope.row[col.prop] }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
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
    },
    cellStyle() {
      return {};
    }
  }
};
</script>

<style>
.custom-table.no-border.el-table .cell {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
</style>

<style scoped>
.status-table-wrapper {
  width: 100%;
  max-width: 440px;
}

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

.col-index {
  background-color: #0a4183;
  margin-left: 4px;
  margin-right: 4px;
}
.index-text {
  color: #fff;
  font-weight: bold;
  position: relative;
  padding-left: 4px;
}
.index-text::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 18px;
  background-color: #0b83f5;
  border-radius: 2px;
}

.col-time {
  background-color: #0a4183;
}
.col-time i {
  color: #0b83f5;
  padding-right: 2px;
}
.time-text {
  color: #fff;
}

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

.col-others {
  background-color: #0a4183;
}
.col-others,
.col-time,
.col-index {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 6px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 1.2;
}
.custom-cell {
  display: block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: inherit;
  line-height: inherit;
  pointer-events: none;
}
.col-index.custom-cell {
  width: auto;
}
.custom-table .el-table__body-wrapper {
  overflow: auto !important;
}
.custom-table .el-table__header-wrapper {
  overflow: hidden !important;
}
</style>
