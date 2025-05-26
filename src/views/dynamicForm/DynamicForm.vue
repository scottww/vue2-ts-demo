<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="formRef"
    :label-width="labelWidth"
    :inline="inline"
  >
    <el-form-item
      v-for="item in visibleConfig"
      :key="item.prop"
      :label="item.label"
      :prop="item.prop"
      :rules="item.rules"
    >
      <component
        :is="getComponent(item.type)"
        v-model="formData[item.prop]"
        v-bind="item.attrs"
        v-on="item.events"
        :type="item.type === 'textarea' ? 'textarea' : undefined"
      >
        <template v-if="item.type === 'select'">
          <el-option
            v-for="opt in item.options"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          ></el-option>
        </template>
      </component>
      <slot v-if="item.slot" :name="item.slot" :form="formData" />
    </el-form-item>

    <!-- 按钮区域，label-width设为0让按钮和表单对齐 -->
    <el-form-item :label-width="0">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "DynamicForm",
  props: {
    config: { type: Array, required: true },
    value: { type: Object, required: true },
    rules: { type: Object, default: () => ({}) },
    labelWidth: { type: String, default: "100px" },
    inline: { type: Boolean, default: false }
  },
  computed: {
    formData: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    visibleConfig() {
      return this.config.filter((item) => !item.hidden);
    }
  },
  methods: {
    getComponent(type) {
      const map = {
        input: "el-input",
        select: "el-select",
        date: "el-date-picker",
        checkbox: "el-checkbox",
        radio: "el-radio-group",
        switch: "el-switch",
        textarea: "el-input" // with type: 'textarea'
      };
      return map[type] || "el-input";
    },
    validate() {
      return this.$refs.formRef.validate();
    },
    submit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$emit("submit", this.formData);
        }
      });
    },
    reset() {
      this.$refs.formRef.resetFields();
    }
  }
};
</script>
