<template>
  <div class="user-container">
    <h2>用户列表</h2>

    <!-- 加载中提示 -->
    <div v-if="loading" class="info">正在加载用户...</div>

    <!-- 错误提示 -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- 用户列表 -->
    <ul v-else class="user-list">
      <li v-for="user in users" :key="user.id" class="user-item">
        <span>{{ user.name }}</span>
        <button class="btn delete-btn" @click="deleteUser(user.id)">删除</button>
      </li>
      <li v-if="users.length === 0" class="info">暂无用户</li>
    </ul>

    <!-- 添加用户 -->
    <div class="add-user">
      <input
        v-model.trim="newName"
        placeholder="输入用户名"
        @keyup.enter="addUser"
        class="input-field"
      />
      <button 
        class="btn add-btn" 
        @click="addUser" 
        :disabled="!newName"
      >添加用户</button>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      users: [],
      newName: "",
      loading: false,
      error: null
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      try {
        const res = await request.get("/api/users");
        this.users = res.data.users || [];
      } catch (err) {
        this.error = "获取用户列表失败";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async addUser() {
      if (!this.newName) return;
      try {
        const res = await request.post("/api/users", { name: this.newName });
        this.users.push(res.data);
        this.newName = "";
      } catch (err) {
        this.error = "添加用户失败";
        console.error(err);
      }
    },
    async deleteUser(id) {
      try {
        await request.delete(`/api/users`, { data: id });
        this.users = this.users.filter((u) => u.id !== id);
      } catch (err) {
        this.error = "删除用户失败";
        console.error(err);
      }
    }
  }
};
</script>

<style scoped>
.user-container {
  max-width: 400px;
  margin: 20px auto;
  font-family: "Arial", sans-serif;
}

.user-list {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  border-bottom: 1px solid #eee;
}

.input-field {
  padding: 6px 10px;
  font-size: 14px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;
}

.input-field:focus {
  border-color: #40a9ff;
}

.add-user {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.add-btn {
  background-color: #1890ff;
  color: white;
}

.add-btn:hover {
  background-color: #40a9ff;
}

.add-btn:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}

.delete-btn {
  background-color: #ff4d4f;
  color: white;
}

.delete-btn:hover {
  background-color: #ff7875;
}

.error {
  color: red;
  margin: 8px 0;
}

.info {
  color: #888;
  margin: 8px 0;
}
</style>
