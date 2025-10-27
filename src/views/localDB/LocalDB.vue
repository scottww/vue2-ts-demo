<template>
  <div class="db-demo">
    <h2>SQLite 本地数据库管理（增强版 + 统计）</h2>

    <!-- 操作按钮 -->
    <div class="actions">
      <button @click="initDB">初始化数据库</button>
      <button @click="addUser">添加用户</button>
      <button @click="exportDB">导出数据库</button>
      <input type="file" @change="importDB" accept=".sqlite" />
      <button @click="deleteSelected" :disabled="!selectedIds.length">批量删除</button>
    </div>

    <!-- 搜索和排序 -->
    <div class="filter">
      <input v-model="searchText" placeholder="搜索姓名" />
      <select v-model="sortKey">
        <option value="id">按 ID</option>
        <option value="age">按年龄</option>
      </select>
      <select v-model="sortOrder">
        <option value="asc">升序</option>
        <option value="desc">降序</option>
      </select>
      <button @click="applyFilter">应用</button>
      <button @click="clearFilter">清空</button>
    </div>

    <!-- 统计面板 -->
    <div class="stats" v-if="users.length">
      <p>总用户数: {{ totalUsers }}</p>
      <p>平均年龄: {{ averageAge }}</p>
      <p>最大年龄: {{ maxAge }}</p>
      <p>最小年龄: {{ minAge }}</p>
    </div>

    <!-- 用户表格 -->
    <div v-if="users.length" class="table-container">
      <table border="1" cellspacing="0">
        <thead>
          <tr>
            <th><input type="checkbox" @change="toggleSelectAll" :checked="allSelected"/></th>
            <th>ID</th>
            <th>姓名</th>
            <th>年龄</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in pagedUsers" :key="user[0]">
            <td><input type="checkbox" v-model="selectedIds" :value="user[0]" /></td>
            <td>{{ user[0] }}</td>
            <td><input v-model="editCache[user[0]].name" /></td>
            <td><input type="number" v-model.number="editCache[user[0]].age" /></td>
            <td>
              <button @click="updateUser(user[0])">更新</button>
              <button @click="deleteUser(user[0])">删除</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 分页 -->
      <div class="pagination">
        <button :disabled="currentPage === 1" @click="currentPage--">上一页</button>
        <span>第 {{ currentPage }} 页 / {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="currentPage++">下一页</button>
      </div>
    </div>

    <div v-else>
      <p>暂无用户数据</p>
    </div>
  </div>
</template>

<script>
import initSqlJs from "sql.js";

const LOCAL_STORAGE_KEY = "vue_sqlite_db_stats";

export default {
  name: "LocalDBStats",
  data() {
    return {
      SQL: null,
      db: null,
      users: [],
      nextId: 1,
      editCache: {},
      currentPage: 1,
      pageSize: 5,
      searchText: "",
      sortKey: "id",
      sortOrder: "asc",
      selectedIds: [],
    };
  },
  computed: {
    totalPages() {
      return Math.max(Math.ceil(this.users.length / this.pageSize), 1);
    },
    pagedUsers() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.users.slice(start, start + this.pageSize);
    },
    allSelected() {
      return this.pagedUsers.length && this.pagedUsers.every(u => this.selectedIds.includes(u[0]));
    },
    totalUsers() {
      return this.users.length;
    },
    averageAge() {
      if (!this.users.length) return 0;
      const sum = this.users.reduce((acc, u) => acc + u[2], 0);
      return (sum / this.users.length).toFixed(1);
    },
    maxAge() {
      if (!this.users.length) return 0;
      return Math.max(...this.users.map(u => u[2]));
    },
    minAge() {
      if (!this.users.length) return 0;
      return Math.min(...this.users.map(u => u[2]));
    }
  },
  mounted() {
    this.initDB(true);
  },
  methods: {
    async initDB(autoLoad = false) {
      this.SQL = await initSqlJs({
        // locateFile: file => `https://sql.js.org/dist/${file}`, //官网CDN wasm 文件
        locateFile: file => `/sql-wasm.wasm`, //本地 wasm 文件
      });

      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData && autoLoad) {
        const buffer = Uint8Array.from(atob(savedData), c => c.charCodeAt(0));
        this.db = new this.SQL.Database(buffer);
      } else {
        this.db = new this.SQL.Database();
        this.db.run(`
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT,
            age INTEGER
          );
        `);
      }
      this.refreshUsers();
    },

    addUser() {
      if (!this.db) return alert("请先初始化数据库");
      const name = "User_" + this.nextId;
      const age = Math.floor(Math.random() * 50) + 20;
      this.db.run("INSERT INTO users (name, age) VALUES (?, ?)", [name, age]);
      this.nextId++;
      this.saveToLocalStorage();
      this.refreshUsers();
    },

    refreshUsers() {
      if (!this.db) return;
      const res = this.db.exec("SELECT * FROM users ORDER BY id ASC");
      this.users = res[0]?.values || [];
      this.users.forEach(u => {
        this.editCache[u[0]] = { name: u[1], age: u[2] };
      });
      if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
    },

    updateUser(id) {
      if (!this.db) return;
      const data = this.editCache[id];
      this.db.run("UPDATE users SET name=?, age=? WHERE id=?", [data.name, data.age, id]);
      this.saveToLocalStorage();
      this.refreshUsers();
    },

    deleteUser(id) {
      if (!this.db) return;
      if (!confirm(`确定删除用户 ${id} 吗？`)) return;
      this.db.run("DELETE FROM users WHERE id=?", [id]);
      this.saveToLocalStorage();
      this.refreshUsers();
    },

    deleteSelected() {
      if (!this.db) return;
      if (!confirm(`确定删除选中用户 ${this.selectedIds.join(", ")} 吗？`)) return;
      this.selectedIds.forEach(id => this.db.run("DELETE FROM users WHERE id=?", [id]));
      this.selectedIds = [];
      this.saveToLocalStorage();
      this.refreshUsers();
    },

    exportDB() {
      if (!this.db) return;
      const data = this.db.export();
      const blob = new Blob([data], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mydb.sqlite";
      a.click();
      URL.revokeObjectURL(url);
    },

    async importDB(e) {
      const file = e.target.files[0];
      if (!file) return;
      const buffer = await file.arrayBuffer();
      if (!this.SQL) {
        this.SQL = await initSqlJs({
          locateFile: file => `https://sql.js.org/dist/${file}`,
        });
      }
      this.db = new this.SQL.Database(new Uint8Array(buffer));
      this.saveToLocalStorage();
      this.refreshUsers();
    },

    saveToLocalStorage() {
      if (!this.db) return;
      const data = this.db.export();
      const b64 = btoa(String.fromCharCode(...data));
      localStorage.setItem(LOCAL_STORAGE_KEY, b64);
    },

    applyFilter() {
      let filtered = this.users;
      if (this.searchText) {
        const text = this.searchText.toLowerCase();
        filtered = filtered.filter(u => u[1].toLowerCase().includes(text));
      }
      filtered.sort((a, b) => {
        const valA = this.sortKey === "id" ? a[0] : a[2];
        const valB = this.sortKey === "id" ? b[0] : b[2];
        return this.sortOrder === "asc" ? valA - valB : valB - valA;
      });
      this.users = filtered;
      this.currentPage = 1;
    },

    clearFilter() {
      this.searchText = "";
      this.sortKey = "id";
      this.sortOrder = "asc";
      this.refreshUsers();
    },

    toggleSelectAll(e) {
      if (e.target.checked) {
        this.selectedIds = this.pagedUsers.map(u => u[0]);
      } else {
        this.selectedIds = [];
      }
    },
  },
};
</script>

<style scoped>
@import url("./index.css");
</style>
