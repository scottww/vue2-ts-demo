<template>
  <div class="status-table-wrapper">
    <el-table
      :data="tableData"
      style="width: 100%"
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
          <!-- 👇 自定义列渲染逻辑 -->
          <div
            v-if="col.prop === 'index'"
            class="col-index custom-cell"
            :title="scope.row[col.prop]"
          >
            <!-- <div class="index-bar"></div> -->
            <div class="index-text">0{{ scope.row.index }}</div>
          </div>

          <div
            v-else-if="col.prop === 'time'"
            class="col-time custom-cell"
            :title="scope.row[col.prop]"
          >
            <!-- <span class="arrow-icon">▶</span> -->
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
            <!-- <div class="custom-cell" :title="scope.row[col.prop]">
            {{ scope.row[col.prop] }}
          </div> -->
            {{ scope.row[col.prop] }}
          </div>
          <!-- <div v-else>
          {{ scope.row[col.prop] }}
          <span v-if="col.prop === 'name'" style="margin-left: 4px">
            x{{ scope.row.count }}
          </span>
        </div> -->
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
      return {
        // padding: "4px 4px",
        // borderRadius: "4px"
      };
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

/* no-hover */
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

/* 序号列 */
.col-index {
  background-color: #0a4183;
  /* justify-content: center; */
  margin-left: 4px;
  margin-right: 4px;
}

.index-bar {
  width: 2px;
  height: 18px;
  background-color: #0b83f5;
  margin-right: 6px;
  border-radius: 2px;
}
.index-text {
  color: #fff;
  font-weight: bold;

  position: relative;
  padding-left: 4px; /* 给伪元素腾出空间 */
}

/* 👇 用 ::before 实现左边蓝色竖条 */
.index-text::before {
  /* content: "";
  display: inline-block;
  width: 4px;
  height: 18px;
  background-color: #00ccff;
  margin-right: 6px;
  border-radius: 2px; */
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

/* 时间列 */
.col-time {
  background-color: #0a4183;
  /* font-size: 12px; */
}
.col-time i {
  color: #0b83f5;
  padding-right: 2px;
}
.arrow-icon {
  color: #0b83f5;
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
  /* height: 100%; */
}
.status-dot.online {
  background-color: #00ff00;
}

.col-others {
  background-color: #0a4183;
}
/* 省略号 */
.col-others,
.col-time,
.col-index {
  /* width: 100%; */
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 6px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 1.2;
}
.custom-cell {
  /* display: inline-block;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; */

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

/* 限制表格最大宽度 */
/* .custom-table .el-table__body-wrapper {
  overflow-x: auto !important;
} */

/* 禁止 header 横向滚动 */
/* .custom-table .el-table__header-wrapper {
  overflow-x: hidden !important;
} */

/* 让表体可横向 + 纵向滚动 */
.custom-table .el-table__body-wrapper {
  overflow: auto !important;
}

/* 表头固定不动 */
.custom-table .el-table__header-wrapper {
  overflow: hidden !important;
}
</style>
