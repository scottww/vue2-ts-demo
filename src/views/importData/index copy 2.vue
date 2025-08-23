<template>
  <div>
    <!-- 模拟触发导入完成 -->
    <el-button type="primary" @click="handleImport">导入完成</el-button>

    <!-- 错误列表弹窗 -->
    <el-dialog
      :title="`导入错误列表（共 ${errorList.length} 条）`"
      :visible.sync="errorDialogVisible"
      width="800px"
    >
      <el-table
        v-if="errorList.length"
        :data="errorList"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="startKnowName"
          label="头实体"
          align="center"
        />
        <el-table-column
          prop="endKnowName"
          label="尾实体"
          align="center"
        />
        <el-table-column
          prop="relationName"
          label="关系"
          align="center"
        />
        <el-table-column
          prop="attributeOne"
          label="属性一"
          align="center"
        />
        <el-table-column
          prop="attributeTwo"
          label="属性二"
          align="center"
        />
        <el-table-column
          prop="failureReason"
          label="失败原因"
          align="center"
        />
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="errorDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorDialogVisible: false,
      errorList: []
    };
  },
  methods: {
    // 模拟导入后的请求
    handleImport() {
      // 假设这是后端返回的数据
      const res = {
        msg: "错误数据如下",
        code: 200,
        data: [
          {
            startKnowName: "头实体",
            endKnowName: "尾实体",
            relationName: "汇入",
            attributeOne: "测试属性1",
            attributeTwo: "测试属性2",
            failureReason: "关系已存在"
          },
          {
            startKnowName: "头实体2",
            endKnowName: "尾实体2",
            relationName: "包含",
            attributeOne: "属性A",
            attributeTwo: "属性B",
            failureReason: "属性缺失"
          }
        ]
      };

      if (res.data && res.data.length) {
        this.errorList = res.data;
        this.errorDialogVisible = true;
      } else {
        this.$message.success("导入成功，没有错误！");
      }
    }
  }
};
</script>
