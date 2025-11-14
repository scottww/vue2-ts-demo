<template>
  <el-input
    v-bind="$attrs"
    v-model="localValue"
    :maxlength="maxlength"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="handleInput"
  />
</template>

<script>
export default {
  name: 'LnglatInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    maxlength: {
      type: Number,
      default: 20
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    decimal: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      localValue: this.value,
    };
  },
  methods: {
    handleInput(value) {
      // ✅ 允许清空：当输入为空时直接返回 undefined
      if (value.trim() === '') {
        this.localValue = '';
        this.$emit('input', undefined);
        return;
      }

      // 1. 过滤非法字符
      value = value.replace(/[^\d.]/g, '');

      // 2. 防止多个小数点
      if (value.split('.').length > 2) {
        value = value.slice(0, value.lastIndexOf('.'));
      }

      // 3. 限制小数位数
      const decimal_places = this.decimal;
      if (value.indexOf('.') !== -1) {
        const regex = new RegExp(`(\\.\\d{${decimal_places}})\\d+$`);
        value = value.replace(regex, '$1');
      }

      // 4. 去前导0
      if (value.indexOf('.') === -1 && value.length > 1) {
        value = value.replace(/^0+/, '');
        value = value === '' ? '0' : value;
      }

      this.localValue = value;
      this.$emit('input', value);
    }
  },
  watch: {
    value(newValue) {
      this.localValue = newValue === undefined ? '' : newValue;
    },
  },
};
</script>
