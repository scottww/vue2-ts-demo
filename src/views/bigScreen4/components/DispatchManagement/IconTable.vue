<template>
  <div class="icon-table-container">
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      :cell-style="{ border: 'none', padding: '5px 0' }"
      :header-cell-style="{
        border: 'none',
        padding: '5px 0'
      }"
      max-height="400"
    >
      <el-table-column prop="time" label="时间" width="80" align="center">
        <template slot-scope="scope">
          <div class="time-cell">{{ scope.row.time }}</div>
        </template>
      </el-table-column>

      <el-table-column
        v-for="pump in pumps"
        :key="pump.id"
        :prop="pump.id"
        :label="pump.label"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <div class="pump-cell">
            <img
              :src="getImagePath(scope.row[pump.id])"
              :alt="scope.row[pump.id] === 'red' ? '异常' : '正常'"
              class="status-image"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import pumpOnImg from "@/assets/bigScreen/DispatchManagement/pump_on.png";
import pumpOffImg from "@/assets/bigScreen/DispatchManagement/pump_off.png";
export default {
  name: "IconTable",
  props: {
    imagePaths: {
      type: Object,
      default: () => ({
        red: pumpOnImg,
        green: pumpOffImg
      })
    }
  },
  data() {
    return {
      pumpOnImg,
      pumpOffImg,
      loading: false,
      pumps: [
        { id: "pump5", label: "5#泵" },
        { id: "pump6", label: "6#泵" },
        { id: "pump7", label: "7#泵" },
        { id: "pump8", label: "8#泵" },
        { id: "pump9", label: "9#泵" },
        { id: "pump10", label: "10#泵" }
      ],
      tableData: []
    };
  },
  mounted() {
    this.generateTableData();
  },
  methods: {
    generateTableData() {
      // 生成00:00到09:00的时间数据
      const times = [];
      for (let hour = 0; hour <= 8; hour++) {
        const hourStr = hour.toString().padStart(2, "0");
        times.push(`${hourStr}:00`);
      }

      // 根据截图中的模式生成表格数据
      const data = times.map((time, index) => {
        const row = { time };

        // 设置各泵的状态
        row.pump5 = "red"; // 5#泵：持续异常
        row.pump6 = index < 4 ? "green" : "red"; // 6#泵：前几行正常，后面异常
        row.pump7 = index === 8 ? "red" : "green"; // 7#泵：大部分正常，中间一个异常
        row.pump8 = index === 5 ? "red" : "green"; // 8#泵：大部分正常，中间一个异常
        row.pump9 = "green"; // 9#泵：持续正常
        row.pump10 = "green"; // 10#泵：持续正常

        return row;
      });

      this.tableData = data;
    },

    getImagePath(status) {
      if (this.imagePaths && this.imagePaths[status]) {
        return this.imagePaths[status];
      }
      return status === "red" ? pumpOnImg : pumpOffImg;
    }
  }
};
</script>

<style scoped>
/* 主容器样式 */
.icon-table-container {
  /* background-color: #1e58b6; */
  /* padding: 10px; */
  border-radius: 4px;
  height: 100%;
  overflow: hidden;
}

/* 全局表格无边框样式 - 使用更强大的选择器确保覆盖 */
.icon-table-container >>> .el-table {
  background-color: transparent !important;
  border: none !important;
}

/* 移除表头和单元格的所有边框 */
.icon-table-container >>> .el-table th,
.icon-table-container >>> .el-table td {
  background-color: transparent !important;
  border: none !important;
  color: white !important;
}

.icon-table-container >>> .el-table tr {
  background-color: transparent;
}

/* 移除表格边框 */
.icon-table-container >>> .el-table--border,
.icon-table-container >>> .el-table--group {
  border: none !important;
}

/* 移除单元格之间的边框 */
.icon-table-container >>> .el-table--border td,
.icon-table-container >>> .el-table--border th,
.icon-table-container >>> .el-table--group td,
.icon-table-container >>> .el-table--group th {
  border-right: none !important;
  border-bottom: none !important;
}

/* 移除表头的下划线 */
.icon-table-container >>> .el-table th.is-leaf {
  border-bottom: none !important;
  font-style: italic;
}

/* 移除表格行的分隔线 */
.icon-table-container >>> .el-table__body tr {
  border-bottom: none !important;
}

/* 移除表格最外层边框 */
.icon-table-container >>> .el-table__header-wrapper,
.icon-table-container >>> .el-table__body-wrapper {
  border: none !important;
}

/* 移除表格内部的所有边框 */
.icon-table-container >>> .el-table__cell,
.icon-table-container >>> .el-table th.el-table__cell.is-leaf {
  border-bottom: none !important;
  border-right: none !important;
}

/* 单元格内容样式 */
.time-cell {
  text-align: center;
  font-weight: bold;
  /* color: white; */
  font-style: italic;
}

.pump-cell {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 25px;
}

.status-image {
  width: 25px;
  height: 26px;
  object-fit: contain;
}

/* 鼠标悬停效果 */
.icon-table-container
  >>> .el-table--enable-row-hover
  .el-table__body
  tr:hover
  > td {
  background-color: rgba(255, 255, 255, 0.05) !important;
}

/* 确保表格容器没有边框 */
.icon-table-container >>> .el-table__inner-wrapper {
  border: none !important;
}

/* 确保表格没有滚动条样式影响 */
.icon-table-container >>> .el-table__body-wrapper::-webkit-scrollbar-track {
  background: transparent !important;
}
</style>