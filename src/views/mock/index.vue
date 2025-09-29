<template>
  <div>
    <h2>用户列表</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
        <button @click="deleteUser(user.id)">删除</button>
      </li>
    </ul>

    <input v-model="newName" placeholder="输入用户名"/>
    <button @click="addUser">添加用户</button>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      users: [],
      newName: ''
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers() {
      request.get('/api/users').then(res => {
        this.users = res.data.users
      })
    },
    addUser() {
      if (!this.newName) return
      request.post('/api/users', { name: this.newName }).then(res => {
        this.users.push(res.data)
        this.newName = ''
      })
    },
    deleteUser(id) {
      request.delete('/api/users', { data: { id } }).then(() => {
        this.users = this.users.filter(u => u.id !== id)
      })
    }
  }
}
</script>
