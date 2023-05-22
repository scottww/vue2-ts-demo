<template>
  <div class="radio-demo">
    <h-radio v-model="radio" label="1" @input="handleInput" @change="handleChange">选项1</h-radio>
    <h-radio v-model="radio" label="2" @input="handleInput" @change="handleChange">选项2</h-radio>
    <h-radio v-model="radio" label="3" @input="handleInput" @change="handleChange"></h-radio>
  </div>
</template>

<script>
import { HRadio } from "@/components/h-ui";
export default {
  name: "RadioDemo",
  components: {
    HRadio
  },
  data() {
    return {
      radio: "1"
    };
  },
  methods: {
    handleInput(v){
      console.log('handleInput', v, this.radio);
    },
    handleChange(v) {
      console.log('handleChange', v, this.radio);
    }
  }
};
</script>

<style lang="scss" scoped>
.radio-demo {
}
</style>
