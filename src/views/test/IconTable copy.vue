<template>
  <div class="icon-table-container">
    <el-table 
      :data="tableData" 
      :show-header="true"
      border 
      style="width: 100%; "
      max-height="400"
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
        width="120"
      >
        <template slot-scope="scope">
          <div class="pump-cell">
            <i 
              :class="[ 
                'el-icon-circle-check', 
                scope.row[pump.id] === 'red' ? 'red-icon' : 'green-icon' 
              ]"
            ></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'IconTable',
  data() {
    return {
      pumps: [
        { id: 'pump5', label: '5#泵' },
        { id: 'pump6', label: '6#泵' },
        { id: 'pump7', label: '7#泵' },
        { id: 'pump8', label: '8#泵' },
        { id: 'pump9', label: '9#泵' },
        { id: 'pump10', label: '10#泵' }
      ],
      tableData: []
    }
  },
  mounted() {
    this.generateTableData()
  },
  methods: {
    generateTableData() {
      // 生成00:00到09:00的时间数据
      const times = []
      for (let hour = 0; hour <= 9; hour++) {
        const hourStr = hour.toString().padStart(2, '0')
        times.push(`${hourStr}:00`)
      }

      // 根据截图中的模式生成表格数据
      // 红色表示异常，绿色表示正常
      const data = times.map((time, index) => {
        const row = { time }
        
        // 根据截图中的模式设置各泵的状态
        // 5#泵：从截图看是持续红色
        row.pump5 = 'red'
        
        // 6#泵：前几行是绿色，后面变成红色
        row.pump6 = index < 4 ? 'green' : 'red'
        
        // 7#泵：大部分是绿色，中间有一个红色
        row.pump7 = index === 8 ? 'red' : 'green'
        
        // 8#泵：大部分是绿色，中间有一个红色
        row.pump8 = index === 5 ? 'red' : 'green'
        
        // 9#泵：从截图看是持续绿色
        row.pump9 = 'green'
        
        // 10#泵：从截图看是持续绿色
        row.pump10 = 'green'
        
        return row
      })
      
      this.tableData = data
    }
  }
}
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
  /* background-color: transparent !important; */
}

.el-table th,
.el-table td {
  background-color: transparent !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
}

.el-table th {
  background-color: rgba(0, 0, 0, 0.1) !important;
}

.time-cell {
  /* text-align: center; */
  font-weight: bold;
}

.pump-cell {
  /* text-align: center; */
}

.red-icon {
  color: #ff4949;
  font-size: 20px;
}

.green-icon {
  color: #52c41a;
  font-size: 20px;
}

/* 鼠标悬停效果 */
.el-table--enable-row-hover .el-table__body tr:hover > td {
  /* background-color: rgba(255, 255, 255, 0.05) !important; */
}
</style>