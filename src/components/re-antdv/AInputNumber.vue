<template>
  <div>
    <label>{{ label }}</label>
    <div class="my-input-number">
      <div class="my-input-number-handler-wrap">
        <span
          class="my-input-number-handler my-input-number-handler-up"
          @click="upStep(inputValue)"
          ><i class="my-input-number-handler-up-inner">&lt;</i></span
        >
        <span
          class="my-input-number-handler my-input-number-handler-down"
          @click="downStep(inputValue)"
          ><i class="my-input-number-handler-down-inner">&gt;</i></span
        >
      </div>
      <div class="my-input-number-input-wrap">
        <input
          class="my-input-number-input"
          ref="inputRef"
          :value="inputDisplayValue"
          :min="min"
          :max="max"
          :step="step"
          :placeholder="placeholder"
          @input="onChange"
          @blur="onBlur"
        />
      </div>
    </div>
  </div>
</template>

<script>
// const defaultParser = (value) => value.replace(/[^\w\.-]+/g, "");
const isEqual = (oldValue, newValue) =>
  newValue === oldValue ||
  (typeof newValue === "number" &&
    typeof oldValue === "number" &&
    isNaN(newValue) &&
    isNaN(oldValue));

export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    // id: String,
    label: String,
    value: [Number, String],
    min: Number,
    max: Number,
    step: {
      type: Number,
      default: 1
    },
    precision: Number,
    parser: Function,
    formatter: Function,
    placeholder: String
  },
  data() {
    // const inputDisplayValue = this.getInputDisplayValue();
    const validValue = this.getValidValue(this.toNumber(this.value));
    return {
      inputDisplayValue: this.getInputDisplayValue(),
      inputValue: this.toPrecisionAsStep(validValue),
      sValue: validValue
    };
  },
  mounted() {
    const { inputDisplayValue, inputValue, sValue } = this;
    console.log("mounted ...", inputDisplayValue, inputValue, sValue);
  },
  computed: {},
  methods: {
    isValidProps(value) {
      return value !== undefined && value !== null;
    },
    getPrecision(value) {
      if (this.isValidProps(this.precision)) {
        return this.precision;
      }
      const valueString = value.toString();
      if (valueString.indexOf("e-") >= 0) {
        return parseInt(valueString.slice(valueString.indexOf("e-") + 2), 10);
      }
      let precision = 0;
      if (valueString.indexOf(".") >= 0) {
        precision = valueString.length - valueString.indexOf(".") - 1;
      }
      return precision;
    },
    getMaxPrecision(currentValue, ratio = 1) {
      if (this.isValidProps(this.precision)) {
        return this.precision;
      }
      const { step } = this;
      const ratioPrecision = this.getPrecision(ratio);
      const stepPrecision = this.getPrecision(step);
      const currentValuePrecision = this.getPrecision(currentValue);
      if (!currentValue) {
        return ratioPrecision + stepPrecision;
      }
      return Math.max(currentValuePrecision, ratioPrecision + stepPrecision);
    },
    getPrecisionFactor(currentValue, ratio = 1) {
      const precision = this.getMaxPrecision(currentValue, ratio);
      return Math.pow(10, precision);
    },
    getInputDisplayValue() {
      const { focused, inputValue, sValue } = this;
      let inputDisplayValue;
      if (focused) {
        inputDisplayValue = inputValue;
      } else {
        inputDisplayValue = this.toPrecisionAsStep(sValue);
      }

      if (inputDisplayValue === undefined || inputDisplayValue === null) {
        inputDisplayValue = "";
      }

      let inputDisplayValueFormat = this.formatWrapper(inputDisplayValue);
      if (this.isValidProps(this.$props.decimalSeparator)) {
        inputDisplayValueFormat = inputDisplayValueFormat
          .toString()
          .replace(".", this.$props.decimalSeparator);
      }

      // this.inputDisplayValue = inputDisplayValueFormat;

      return inputDisplayValueFormat;
    },
    formatWrapper(num) {
      // http://2ality.com/2012/03/signedzero.html
      // https://github.com/ant-design/ant-design/issues/9439
      if (this.formatter) {
        return this.formatter(num);
      }
      return num;
    },
    toPrecisionAsStep(num) {
      if (this.isNotCompleteNumber(num) || num === "") {
        return num;
      }
      const precision = Math.abs(this.getMaxPrecision(num));
      if (!isNaN(precision)) {
        return Number(num).toFixed(precision);
      }
      return num.toString();
    },
    upStep(val, rat = 1) {
      console.log("+ step");
      const { step } = this;
      const precisionFactor = this.getPrecisionFactor(val, rat);
      const precision = Math.abs(this.getMaxPrecision(val, rat));
      const result = (
        (precisionFactor * val + precisionFactor * step * rat) /
        precisionFactor
      ).toFixed(precision);
      const v = this.toNumber(result);
      console.log("+ step", v);
      this.inputDisplayValue = this.getInputDisplayValue();

      this.inputValue = v;

      console.log("+ step", v, this.getInputDisplayValue());
      // const v = this.toNumber(result);
      // this.inputValue = v;
      this.$emit("change", v);
      return this.toNumber(result);
    },
    downStep(val, rat = 1) {
      console.log("- step");
      const { step } = this;
      const precisionFactor = this.getPrecisionFactor(val, rat);
      const precision = Math.abs(this.getMaxPrecision(val, rat));
      const result = (
        (precisionFactor * val - precisionFactor * step * rat) /
        precisionFactor
      ).toFixed(precision);
      const v = this.toNumber(result);
      this.inputDisplayValue = this.getInputDisplayValue();
      this.inputValue = v;

      // this.inputValue = v;
      this.$emit("change", v);
      return this.toNumber(result);
    },
    isNotCompleteNumber(num) {
      return (
        isNaN(num) ||
        num === "" ||
        num === null ||
        (num && num.toString().indexOf(".") === num.toString().length - 1)
      );
    },
    toNumber(num) {
      const { precision, autoFocus } = this;
      const { focused = autoFocus } = this;
      // num.length > 16 => This is to prevent input of large numbers
      const numberIsTooLarge = num && num.length > 16 && focused;
      if (this.isNotCompleteNumber(num) || numberIsTooLarge) {
        return num;
      }
      if (this.isValidProps(precision)) {
        return (
          Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)
        );
      }
      return Number(num);
    },
    getValueFromEvent(e) {
      // optimize for chinese input expierence
      // https://github.com/ant-design/ant-design/issues/8196
      let value = e.target.value.trim().replace(/。/g, ".");

      if (this.isValidProps(this.decimalSeparator)) {
        value = value.replace(this.decimalSeparator, ".");
      }

      return value;
    },
    getValidValue(value, min = this.min, max = this.max) {
      let val = parseFloat(value, 10);
      // https://github.com/ant-design/ant-design/issues/7358
      if (isNaN(val)) {
        return value;
      }
      if (val < min) {
        val = min;
      }
      if (val > max) {
        val = max;
      }
      return val;
    },
    onChange(e) {
      console.log("onChange", e);
      if (this.focused) {
        this.inputting = true;
      }
      this.rawInput = this.parser(this.getValueFromEvent(e));
      //TODO:
      console.log("onChange", this.rawInput);
      this.inputValue = this.rawInput;
      this.$emit("change", this.toNumber(this.rawInput)); // valid number or invalid string
    },
    onBlur(...args) {
      console.log("onBlur", this, this.$listeners);
      this.inputting = false;
      this.focused = false;
      const value = this.getCurrentValidValue(this.inputValue);
      const newValue = this.setValue(value);
      if (this.$listeners.blur) {
        const originValue = this.$refs.inputRef.value;
        const inputValue = this.getInputDisplayValue({
          focused: false,
          sValue: newValue
        });
        this.$refs.inputRef.value = inputValue;
        this.$emit("blur", ...args);
        this.$refs.inputRef.value = originValue;
      }
    },
    getCurrentValidValue(value) {
      let val = value;
      if (val === "") {
        val = "";
      } else if (!this.isNotCompleteNumber(parseFloat(val, 10))) {
        val = this.getValidValue(val);
      } else {
        val = this.sValue;
      }
      return this.toNumber(val);
    },
    setValue(v, callback) {
      // trigger onChange
      const { precision } = this.$props;
      const newValue = this.isNotCompleteNumber(parseFloat(v, 10))
        ? null
        : parseFloat(v, 10);
      const { sValue: value = null, inputValue = null } = this.$data;
      // https://github.com/ant-design/ant-design/issues/7363
      // https://github.com/ant-design/ant-design/issues/16622
      const newValueInString =
        typeof newValue === "number"
          ? newValue.toFixed(precision)
          : `${newValue}`;
      const changed =
        newValue !== value || newValueInString !== `${inputValue}`;
      if (this.value) {
        this.sValue = newValue;
        this.inputValue = this.toPrecisionAsStep(v);
      } else {
        // always set input value same as value
        this.inputValue = this.toPrecisionAsStep(this.sValue);
      }
      if (changed) {
        this.$emit("change", newValue);
      }
      return newValue;
    },
    getValue() {
      console.log("get ...", this.format);
      return this.format ? this.format(this.value) : this.value;
    }
    // setValue(newValue) {
    //   console.log("set ...", newValue);
    //   // 处理输入事件，确保输入值在min和max的范围内，并应用precision
    //   let parsedValue = parseFloat(newValue);
    //   console.log("parsedValue...", parsedValue);
    //   if (!isNaN(parsedValue)) {
    //     parsedValue = Math.min(this.max, Math.max(this.min, parsedValue));
    //     if (!isNaN(this.precision)) {
    //       parsedValue = parseFloat(parsedValue.toFixed(this.precision));
    //     }
    //   }
    //   this.innerValue = parsedValue;
    // },
    // handleInput(event) {
    //   console.log("handleInput", event, event.target.value);
    //   // 将输入值传递给formattedValue，由computed属性处理
    //   const v = this.setValue(event.target.value);
    //   console.log(v);
    // }
  },
  updated() {
    console.log("aaaaa");

    const { value, max, min } = this.$props;
    const { focused } = this.$data;
    const { prevProps } = this;
    const props = this.$props;
    // Don't trigger in componentDidMount
    if (prevProps) {
      if (
        !isEqual(prevProps.value, value) ||
        !isEqual(prevProps.max, max) ||
        !isEqual(prevProps.min, min)
      ) {
        const validValue = focused ? value : this.getValidValue(value);
        let nextInputValue;
        if (this.pressingUpOrDown) {
          nextInputValue = validValue;
        } else if (this.inputting) {
          nextInputValue = this.rawInput;
        } else {
          nextInputValue = this.toPrecisionAsStep(validValue);
        }
        // eslint-disable-line
        this.sValue = validValue;
        this.inputValue = nextInputValue;
      }

      // Trigger onChange when max or min change
      // https://github.com/ant-design/ant-design/issues/11574
      const nextValue = "value" in props ? value : this.sValue;
      // ref: null < 20 === true
      // https://github.com/ant-design/ant-design/issues/14277
      if (
        "max" in props &&
        prevProps.max !== max &&
        typeof nextValue === "number" &&
        nextValue > max
      ) {
        this.$emit("change", max);
      }
      if (
        "min" in props &&
        prevProps.min !== min &&
        typeof nextValue === "number" &&
        nextValue < min
      ) {
        this.$emit("change", min);
      }
    }
    this.prevProps = { ...props };
    this.$nextTick(() => {
      // this.updatedFunc();
    });
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        console.log("watch ...", v);
        const validValue = this.getValidValue(this.toNumber(v));
        this.sValue = validValue;
        this.inputValue = this.toPrecisionAsStep(validValue);
        this.inputDisplayValue = this.getInputDisplayValue();
        //
        console.log(
          "watch ...",
          this.inputDisplayValue,
          this.inputValue,
          this.sValue
        );
        this.$emit("change", validValue);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.my-input-number {
  box-sizing: border-box;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  width: 100%;
  height: 32px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5;
  background-color: #fff;
  background-image: none;
  transition: all 0.3s;
  display: inline-block;
  width: 90px;
  margin: 0;
  padding: 0;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}
.my-input-number:hover {
  border-color: #40a9ff;
  border-right-width: 1px !important;
}
.my-input-number-handler-wrap {
  position: absolute;
  top: 0;
  right: 0;
  width: 22px;
  height: 100%;
  background: #fff;
  border-left: 1px solid #d9d9d9;
  border-radius: 0 4px 4px 0;
  /* opacity: 0; */
  /* transition: opacity 0.24s linear 0.1s; */
}
.my-input-number-handler {
  position: relative;
  display: block;
  width: 100%;
  height: 50%;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.45);
  font-weight: 700;
  line-height: 0;
  text-align: center;
  transition: all 0.1s linear;
}
.my-input-number-input-wrap {
}
.my-input-number-handler-up {
  border-top-right-radius: 4px;
  cursor: pointer;
}
.my-input-number-handler-down {
  top: 0;
  border-top: 1px solid #d9d9d9;
  border-bottom-right-radius: 4px;
  cursor: pointer;
}
.my-input-number-handler-up-inner {
  top: 50%;
  margin-top: -5px;
  text-align: center;
  transform: rotate(90deg);
  &:hover {
    color: #40a9ff;
  }
}

.my-input-number-handler-down-inner {
  top: 50%;
  margin-top: -6px;
  text-align: center;
  transform: rotate(90deg);
  &:hover {
    color: #40a9ff;
  }
}

i {
  font-size: 12px;
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 1;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  right: 4px;
  width: 12px;
  height: 12px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 12px;
  transition: all 0.1s linear;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.my-input-number-input {
  width: 100%;
  height: 30px;
  padding: 0 11px;
  text-align: left;
  background-color: transparent;
  border: 0;
  border-radius: 4px;
  outline: 0;
  transition: all 0.3s linear;
  -moz-appearance: textfield !important;
}

label {
  display: block;
  margin-bottom: 8px;
}

/* input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100px;
  height: 32px;
} */
</style>
