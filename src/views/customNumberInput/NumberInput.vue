<template>
  <el-input
    ref="elInput"
    :value="innerValue"
    @input.native="onNativeInput"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-if="$slots.append" #append><slot name="append" /></template>
    <template v-if="$slots.prepend" #prepend><slot name="prepend" /></template>
  </el-input>
</template>

<script>
export default {
  name: "NumberInput",
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      innerValue: String(this.value || ""),
    };
  },
  watch: {
    value(val) {
      if (val !== this.innerValue) {
        this.innerValue = String(val);
      }
    },
  },
  methods: {
    onNativeInput(e) {
      const rawVal = e.target.value;

      // 只保留数字和小数点
      let filtered = rawVal.replace(/[^\d.]/g, "");

      // 只保留第一个小数点
      const parts = filtered.split(".");
      filtered =
        parts[0] +
        (parts[1] !== undefined ? "." + parts.slice(1).join("") : "");

      // 去除前导0（保留 0.xxx 或 0）
      const [intPart, decPart] = filtered.split(".");
      const normalizedInt = intPart.replace(/^0+(?=\d)/, "") || "0";

      filtered =
        decPart !== undefined
          ? normalizedInt + "." + decPart
          : normalizedInt;

      // 设置本地值并 emit 出去
      this.innerValue = filtered;
      this.$emit("input", filtered);

      // 强制设置 el-input DOM 的真实值
      this.$refs.elInput.$el.querySelector("input").value = filtered;
    },
  },
};
</script>
