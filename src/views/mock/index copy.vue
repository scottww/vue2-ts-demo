<template>
  <div class="user-page">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户管理</span>
        <el-button style="float: right;" type="primary" @click="openAddUser">添加用户</el-button>
      </div>

      <!-- 用户列表 -->
      <el-table :data="users" style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 上传文件 -->
      <el-upload
        class="upload-demo"
        drag
        action=""  <!-- 这里不写，因为我们用 request.post 上传 -->
        :http-request="customUpload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-card>

    <!-- 添加用户弹窗 -->
    <el-dialog title="添加用户" :visible.sync="addUserDialog">
      <el-form :model="newUser">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="newUser.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserDialog = false">取消</el-button>
        <el-button type="primary" @click="handleAddUser">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUsers, addUser, deleteUser, uploadFile } from '@/api/user'
import { Message } from 'element-ui'

export default {
  name: 'UserPage',
  data() {
    return {
      users: [],
      loading: false,
      addUserDialog: false,
      newUser: { name: '' },
      formLabelWidth: '80px',
    }
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    // 获取用户列表
    async fetchUsers() {
      this.loading = true
      try {
        const res = await getUsers()
        this.users = res.users || []
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    // 打开添加用户弹窗
    openAddUser() {
      this.newUser.name = ''
      this.addUserDialog = true
    },

    // 添加用户
    async handleAddUser() {
      if (!this.newUser.name) {
        Message.warning('请输入姓名')
        return
      }
      try {
        const res = await addUser(this.newUser)
        Message.success(res.msg)
        this.addUserDialog = false
        this.fetchUsers()
      } catch (err) {
        console.error(err)
      }
    },

    // 删除用户
    async handleDelete(id) {
      try {
        const res = await deleteUser(id)
        Message.success(res.msg)
        this.fetchUsers()
      } catch (err) {
        console.error(err)
      }
    },

    // 自定义上传文件
    async customUpload({ file, onSuccess, onError }) {
      try {
        const res = await uploadFile(file)
        Message.success(res.msg)
        onSuccess(res)
      } catch (err) {
        console.error(err)
        onError(err)
      }
    },
  },
}
</script>

<style scoped>
.user-page {
  padding: 20px;
}
.box-card {
  margin-bottom: 20px;
}
</style>
