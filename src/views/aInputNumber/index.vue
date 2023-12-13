<template>
  <div>
    <MyInputNumber
      label="My Input Number"
      v-model="inputNumberValue"
      :min="0"
      :max="5"
      :step="0.1"
      :precision="1"
      :formatter="(v) => `${v}米`"
      :parser="(v) => v.replace('米', '')"
      placeholder="Enter a number..."
      @change="change"
    />

    <p>Formatted Input Number Value: {{ inputNumberValue }}</p>
    <div role="math" aria-label="6除以4等于1.5">
      <math xmlns="http://www.w3.org/1998/Math/MathML">
        <mfrac>
          <mn>6</mn>
          <mn>4</mn>
        </mfrac>
        <mo>=</mo>
        <mn>1.5</mn>
      </math>
    </div>
  </div>
</template>

<script>
import MyInputNumber from "@/components/re-antdv/AInputNumber.vue";

export default {
  components: {
    MyInputNumber
  },
  data() {
    return {
      inputNumberValue: 0
    };
  },
  methods: {
    formatNumber(value) {
      // 格式化输入值，例如添加货币符号等
      return `$${value.toFixed(2)}`;
    },
    change(e) {
      console.log("change ...", e);
    }
  }
};
</script>
<style lang="scss" scoped>
p {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
