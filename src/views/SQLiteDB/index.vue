<template>
  <div>
    <h2>SQLite DB 浏览器</h2>

    <!-- 上传文件 -->
    <input type="file" @change="onFileChange" accept=".db" />

    <!-- 表名下拉选择 -->
    <div v-if="tableNames.length" style="margin: 10px 0;">
      <label>选择表：</label>
      <select v-model="selectedTable" @change="onTableChange">
        <option v-for="name in tableNames" :key="name" :value="name">{{ name }}</option>
      </select>
    </div>

    <!-- 表格容器，可滚动 -->
    <div v-if="tableData.length" class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th v-for="col in columns" :key="col">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td v-for="col in columns" :key="col">{{ row[col] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="!tableData.length && uploaded">DB 文件已上传，但没有数据或表名错误</p>
  </div>
</template>

<script>
import initSqlJs from 'sql.js';

export default {
  data() {
    return {
      db: null,          // SQL.js 数据库实例
      tableNames: [],    // 数据库表名列表
      selectedTable: '', // 当前选中表
      tableData: [],
      columns: [],
      uploaded: false
    };
  },
  methods: {
    async onFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      this.uploaded = true;

      const buffer = await file.arrayBuffer();

      const SQL = await initSqlJs({
        locateFile: file => `/sql-wasm.wasm`
      });

      this.db = new SQL.Database(new Uint8Array(buffer));

      // 获取表名
      const tables = this.db.exec("SELECT name FROM sqlite_master WHERE type='table';");
      if (!tables.length) {
        this.tableNames = [];
        this.tableData = [];
        this.columns = [];
        return;
      }

      this.tableNames = tables[0].values.map(v => v[0]);
      console.log('数据库表名：', this.tableNames);

      // 默认选中第一张表
      this.selectedTable = this.tableNames[0];
      this.loadTableData(this.selectedTable);
    },

    // 表切换
    onTableChange() {
      if (this.selectedTable) {
        this.loadTableData(this.selectedTable);
      }
    },

    loadTableData(tableName) {
      if (!this.db) return;

      const res = this.db.exec(`SELECT * FROM ${tableName};`);
      if (!res.length) {
        this.tableData = [];
        this.columns = [];
        return;
      }

      this.columns = res[0].columns;
      this.tableData = res[0].values.map(row => {
        const obj = {};
        row.forEach((val, i) => obj[this.columns[i]] = val);
        return obj;
      });
    }
  }
};
</script>

<style>
/* 表格滚动容器 */
.table-wrapper {
  max-height: 400px;      /* 高度超出显示滚动条，可根据需要调整 */
  overflow: auto;
  border: 1px solid #ccc;
}

/* 表格基础样式 */
table {
  border-collapse: collapse;
  width: 100%;
  min-width: 600px;       /* 宽度超出容器显示横向滚动条 */
}

th, td {
  border: 1px solid #ccc;
  padding: 5px 10px;
  white-space: nowrap;    /* 防止内容换行 */
}
</style>
