<template>
  <div>
    <input
      class="a-input"
      :class="[
        inputSize ? 'a-input-' + size : '',
        {
          'a-input-disabled': inputDisabled
        }
      ]"
      :value="value"
      :disabled="inputDisabled"
      @input="$emit('input', $event.target.value)"
      @focus="handleFocus"
      @blur="handleBlur"
      :placeholder="placeholder"
    />
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
  props: {
    value: [String, Number],
    size: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: String
  },
  data() {
    return {};
  },
  computed: {
    inputSize({ size }) {
      console.log(["sm", "lg"].includes(size));
      return ["sm", "lg"].includes(size);
    },
    inputDisabled() {
      console.log("inputDisabled", this.disabled);
      return this.disabled;
    }
  },
  mounted() {
    console.log(this.$attrs, this.$listeners);
  },
  methods: {
    handleFocus() {
      // 处理输入框获取焦点的逻辑
    },
    handleBlur() {
      // 处理输入框失去焦点的逻辑
    }
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

.a-input:-ms-input-placeholder {
  color: #bfbfbf;
}

.a-input::-webkit-input-placeholder {
  color: #bfbfbf;
}

.a-input:-moz-placeholder-shown {
  text-overflow: ellipsis;
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

.a-input-lg {
  height: 40px;
  padding: 6px 11px;
  font-size: 16px;
}

.a-input-sm {
  height: 24px;
  padding: 1px 7px;
}
</style>
