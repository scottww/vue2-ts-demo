<template>
  <div class="h-radio">
    <span class="h-radio__input">
      <input
        type="radio"
        ref="radio"
        v-model="model"
        :value="label"
        @change="handleChange"
      />
    </span>

    <span class="h-radio__label" @keydown.stop>
      <slot></slot>
      <!-- 父组件未插入DOM节点，取传递的label值 -->
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </div>
</template>

<script>
export default {
  name: "HRadio",
  props: {
    label: {},
    value: {}
  },
  data() {
    return {};
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
        this.$refs.radio &&
          (this.$refs.radio.checked = this.model === this.label);
      }
    }
  },
  mounted(){
    console.log('radio $slots', this.$slots);
  },
  methods: {
    handleChange() {
      this.$emit("change", this.model);
    }
  }
};
</script>

<style lang="scss" scoped>
.h-radio {
  color: #606266;
  font-weight: 500;
  line-height: 1;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: none;
  font-size: 14px;
  margin-right: 30px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.h-radio__input {
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  display: inline-block;
  line-height: 1;
  position: relative;
  vertical-align: middle;
}
.h-radio__label {
  font-size: 14px;
  padding-left: 10px;
}
</style>
