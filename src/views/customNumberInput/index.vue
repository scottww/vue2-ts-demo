<template>
  <div class="NumberInput-demo">
    <number-input
      v-model="formData.area"
      placeholder="请输入面积"
      maxlength="30"
    >
      <template #append>㎡</template>
    </number-input>
  </div>
</template>

<script>
import NumberInput from "./NumberInput.vue";

export default {
  components: {
    NumberInput
  },
  data() {
    return {
      formData: {
        area: ""
      }
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.NumberInput-demo {
  padding: 20px;
}
</style>
