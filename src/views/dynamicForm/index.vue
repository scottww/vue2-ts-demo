<template>
  <div class="dynamic-form-demo">
    <dynamic-form
      :config="formConfig"
      v-model="formModel"
      :rules="formRules"
      label-width="120px"
      ref="dynamicForm"
      @submit="onSubmit"
    />

    <!-- <el-button type="primary" @click="submit">提交</el-button>
    <el-button @click="reset">重置</el-button> -->
  </div>
</template>

<script>
import DynamicForm from "./DynamicForm.vue";

export default {
  components: { DynamicForm },
  data() {
    return {
      formModel: {
        name: "",
        age: "",
        gender: ""
      },
      formConfig: [
        {
          label: "姓名",
          prop: "name",
          type: "input",
          attrs: { placeholder: "请输入姓名", clearable: true }
        },
        {
          label: "年龄",
          prop: "age",
          type: "number",
          attrs: { min: 0 }
        },
        {
          label: "性别",
          prop: "gender",
          type: "select",
          options: [
            { label: "男", value: "male" },
            { label: "女", value: "female" }
          ],
          attrs: { placeholder: "请选择性别" }
        }
      ],
      formRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }]
      }
    };
  },
  methods: {
    onSubmit(data) {
      console.log("提交的数据", data);
    },
    submit(data) {
      this.$refs.dynamicForm
        .validate()
        .then(() => {
          this.$message.success("校验通过，提交成功");
          console.log(this.formModel);
        })
        .catch(() => {
          this.$message.error("表单校验未通过");
        });
    },
    reset() {
      this.$refs.dynamicForm.resetFields();
    }
  }
};
</script>
