<template>
  <div>
    <input class="a-input" v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
export default {
  name: "AnInput",
  inheritAttrs: false,
  // model: {
  //     prop: "value",
  //     event: 'change.value'
  // },
  // props: {
  //     value: ''
  // },
  data() {
    return {};
  },
  mounted() {
    console.log(this.$attrs, this.$listeners);
  }
};
</script>
<style scoped>
.a-input {
  box-sizing: border-box;
  height: 32px;
  padding: 4px 11px;
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
}

.a-input:focus,
.a-input:hover {
  border-color: #40a9ff;
  border-right-width: 1px !important;
}

.a-input:focus {
  outline: 0;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.a-input-disabled {
  color: rgba(0, 0, 0, 0.25);
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 1;
}

.a-input-disabled:hover {
  border-color: #d9d9d9;
  border-right-width: 1px !important;
}
</style>
