<template>
  <div class="NumberInput-demo">
    <el-input
      v-model="formData.area"
      @input="handleInput"
      maxlength="30"
      placeholder="请输入面积"
    >
      <template slot="append">㎡</template>
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        area: ""
      }
    };
  },
  methods: {
    //限制输入框只能输入数字
    handleInput(val) {
      // 只允许数字和小数点
      let filtered = val.replace(/[^\d.]/g, "");

      // 只保留第一个小数点
      const parts = filtered.split(".");
      filtered =
        parts[0] +
        (parts[1] !== undefined ? "." + parts.slice(1).join("") : "");

      // 去除整数部分前导0（但保留 '0' 和 '0.xxx'）
      const [integerPart, decimalPart] = filtered.split(".");
      let normalizedInt = integerPart.replace(/^0+(?=\d)/, "") || "0";

      // 拼接小数部分
      filtered =
        decimalPart !== undefined
          ? normalizedInt + "." + decimalPart
          : normalizedInt;

      this.formData.area = filtered;
    }
  }
};
</script>
<style lang="scss" scoped>
.NumberInput-demo {
  padding: 20px;
}
</style>
