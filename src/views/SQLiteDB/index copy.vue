<template>
  <div>
    <h2>SQLite DB 浏览器</h2>
    
    <!-- 上传文件 -->
    <input type="file" @change="onFileChange" accept=".db" />

    <!-- 显示表格 -->
    <table v-if="tableData.length">
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

    <p v-if="!tableData.length && uploaded">DB 文件已上传，但没有数据或表名错误</p>
  </div>
</template>

<script>
import initSqlJs from 'sql.js';

export default {
  data() {
    return {
      tableData: [],
      columns: [],
      uploaded: false
    }
  },
  methods: {
    async onFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      this.uploaded = true;

      // 读取文件
      const buffer = await file.arrayBuffer();

      // 初始化 SQL.js
      const SQL = await initSqlJs({
        // locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.wasm`
        locateFile: file => `/sql-wasm.wasm`, //本地 wasm 文件
      });

      // 创建数据库
      const db = new SQL.Database(new Uint8Array(buffer));

      // 获取数据库里的表名
      const tables = db.exec("SELECT name FROM sqlite_master WHERE type='table';");
      if (!tables.length) {
        this.tableData = [];
        this.columns = [];
        return;
      }

      // 这里默认读取GridCells
      const tableName = tables[0].values[20];
      console.log('读取表：', tableName);

      // 查询表内容
      const res = db.exec(`SELECT * FROM ${tableName};`);
      if (!res.length) {
        this.tableData = [];
        this.columns = [];
        return;
      }

      // 处理结果
      this.columns = res[0].columns;
      this.tableData = res[0].values.map(row => {
        const obj = {};
        row.forEach((val, i) => obj[this.columns[i]] = val);
        return obj;
      });
    }
  }
}
</script>

<style>
table {
  border-collapse: collapse;
  margin-top: 10px;
  width: 100%;
}
th, td {
  border: 1px solid #ccc;
  padding: 5px 10px;
}
</style>
