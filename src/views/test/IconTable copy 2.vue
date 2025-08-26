<template>
  <div class="icon-table-container">
    <el-table
      :data="tableData"
      :show-header="true"
      style="width: 100%; background-color: transparent"
    >
      <el-table-column prop="time" label="时间" width="80" fixed>
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
    // 允许从父组件传入图片路径配置
    imagePaths: {
      type: Object,
      default: () => ({
        red: pumpOnImg, // 红色状态图片路径
        green: pumpOffImg // 绿色状态图片路径
      })
    }
  },
  data() {
    return {
      pumpOnImg,
      pumpOffImg,
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
      for (let hour = 0; hour <= 9; hour++) {
        const hourStr = hour.toString().padStart(2, "0");
        times.push(`${hourStr}:00`);
      }

      // 根据截图中的模式生成表格数据
      // red表示异常，green表示正常
      const data = times.map((time, index) => {
        const row = { time };

        // 根据截图中的模式设置各泵的状态
        // 5#泵：从截图看是持续异常
        row.pump5 = "red";

        // 6#泵：前几行是正常，后面变成异常
        row.pump6 = index < 4 ? "green" : "red";

        // 7#泵：大部分是正常，中间有一个异常
        row.pump7 = index === 8 ? "red" : "green";

        // 8#泵：大部分是正常，中间有一个异常
        row.pump8 = index === 5 ? "red" : "green";

        // 9#泵：从截图看是持续正常
        row.pump9 = "green";

        // 10#泵：从截图看是持续正常
        row.pump10 = "green";

        return row;
      });

      this.tableData = data;
    },

    // 获取状态对应的图片路径
    getImagePath(status) {
      // 如果传入了自定义图片路径，则使用传入的路径
      if (this.imagePaths && this.imagePaths[status]) {
        return this.imagePaths[status];
      }

      // 否则返回默认路径
      return status === "red" ? pumpOnImg : pumpOffImg;
    }
  }
};
</script>

<style scoped>
.icon-table-container {
  background-color: #1e58b6; /* 蓝色背景 */
  padding: 10px;
  border-radius: 4px;
  height: 100%;
  overflow: hidden;
}

.el-table {
  background-color: transparent !important;
}

.el-table th,
.el-table td {
  background-color: transparent !important;
  /* border-color: rgba(255, 255, 255, 0.2) !important; */
  color: white !important;
}

.el-table th {
  background-color: rgba(0, 0, 0, 0.1) !important;
}

.time-cell {
  text-align: center;
  font-weight: bold;
}

.pump-cell {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.status-image {
  width: 24px; /* 可以根据需要调整图片大小 */
  height: 24px;
  object-fit: contain;
}

/* 鼠标悬停效果 */
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(255, 255, 255, 0.05) !important;
}
</style>