<template>
  <div>
    <h2>用户列表</h2>

    <!-- 加载中提示 -->
    <div v-if="loading">正在加载用户...</div>

    <!-- 错误提示 -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- 用户列表 -->
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
        <button @click="deleteUser(user.id)">删除</button>
      </li>
      <li v-if="users.length === 0">暂无用户</li>
    </ul>

    <!-- 添加用户 -->
    <input
      v-model.trim="newName"
      placeholder="输入用户名"
      @keyup.enter="addUser"
    />
    <button @click="addUser" :disabled="!newName">添加用户</button>
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
        // await request.delete(`/api/users/${id}`)
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
.error {
  color: red;
  margin: 8px 0;
}
</style>
