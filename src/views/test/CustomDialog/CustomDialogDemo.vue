<template>
  <div class="custom-dialog-demo">
    <el-button @click="openDialog">打开</el-button>
    <el-button @click="closeDialog">关闭</el-button>
    <CustomDialog ref="dialogRef" v-if="dialogVisible"/>
  </div>
</template>

<script>
import CustomDialog from './index.vue'
export default {
  components: {
    CustomDialog
  },
  data(){
    return {
      dialogVisible: false
    }
  },
  methods:{
    openDialog(){
      this.dialogVisible = true;
      this.$nextTick(()=>{
        this.$refs.dialogRef.init('测试1')
      })
    },
    closeDialog(){
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-dialog-demo{
  width: 500px;
  height: 400px;
}
</style>