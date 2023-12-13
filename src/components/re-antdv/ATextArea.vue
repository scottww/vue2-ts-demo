<template>
  <div>
    <label :for="id">{{ label }}</label>
    <textarea
      :id="id"
      v-model="inputValue"
      :placeholder="placeholder"
      @input="handleInput"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "ATextArea",
  props: {
    id: String,
    label: String,
    value: String,
    placeholder: String
  },
  data() {
    return {
      inputValue: ""
    };
  },
  methods: {
    handleInput(event) {
      this.$emit("input", event.target.value);
    }
  },
  watch: {
    value(v) {
      this.inputValue = v;
    }
  }
};
</script>

<style scoped>
/* 可以在这里添加样式 */
div {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
}

textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>
