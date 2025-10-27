<template>
  <div class="db-demo">
    <h2>SQLite 本地数据库示例</h2>

    <div class="actions">
      <button @click="initDB">初始化数据库</button>
      <button @click="addUser">添加用户</button>
      <button @click="queryUsers">查询用户</button>
      <button @click="exportDB">导出数据库</button>
      <input type="file" @change="importDB" accept=".sqlite" />
    </div>

    <div v-if="users.length" class="result">
      <h3>用户列表：</h3>
      <ul>
        <li v-for="(u, i) in users" :key="i">
          {{ u[0] }}. {{ u[1] }} - {{ u[2] }}岁
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import initSqlJs from "sql.js";

export default {
  name: "LocalDB",
  data() {
    return {
      SQL: null, // sql.js 模块
      db: null,  // 数据库实例
      users: [], // 查询结果
      nextId: 1, // 模拟自增ID
    };
  },
  methods: {
    async initDB() {
      // 加载 SQL.js 模块（必须指定 locateFile，否则找不到 wasm 文件）
      this.SQL = await initSqlJs({
        locateFile: file => `https://sql.js.org/dist/${file}`
      });

      // 初始化内存数据库
      this.db = new this.SQL.Database();

      // 创建表
      this.db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY,
          name TEXT,
          age INTEGER
        );
      `);

      this.$message && this.$message.success
        ? this.$message.success("数据库已初始化！")
        : alert("数据库已初始化！");
    },

    addUser() {
      if (!this.db) return alert("请先初始化数据库");
      const name = "User_" + this.nextId;
      const age = Math.floor(Math.random() * 50) + 20;

      this.db.run("INSERT INTO users (name, age) VALUES (?, ?)", [name, age]);
      this.nextId++;
      alert(`已添加：${name}, ${age}岁`);
    },

    queryUsers() {
      if (!this.db) return alert("请先初始化数据库");
      const res = this.db.exec("SELECT * FROM users");
      this.users = res[0]?.values || [];
    },

    exportDB() {
      if (!this.db) return alert("请先初始化数据库");
      const data = this.db.export();
      const blob = new Blob([data], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mydb.sqlite";
      a.click();
      URL.revokeObjectURL(url);
      alert("数据库已导出为 mydb.sqlite");
    },

    async importDB(e) {
      const file = e.target.files[0];
      if (!file) return;
      const buffer = await file.arrayBuffer();

      // 加载 SQL.js 模块（防止未初始化）
      if (!this.SQL) {
        this.SQL = await initSqlJs({
          locateFile: file => `https://sql.js.org/dist/${file}`
        });
      }

      // 从文件导入数据库
      this.db = new this.SQL.Database(new Uint8Array(buffer));
      alert("数据库已导入成功！");
      this.queryUsers();
    },
  },
};
</script>

<style scoped>
.db-demo {
  max-width: 480px;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}
.actions button {
  padding: 6px 12px;
}
.result ul {
  padding-left: 20px;
}
</style>
