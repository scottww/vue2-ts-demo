<!-- <template>
  <div>
    <button class="an-button" @click="handleClick"></button>
  </div>
</template> -->

<script>
export default {
  name: "AButton",
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: "default"
    },
    size: String,
    icon: {
      type: String,
      default: ""
    },
    nativeType: {
      type: String,
      default: "button"
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean
  },
  data() {
    return {};
  },
  computed: {
    buttonSize() {
      return "";
    },
    buttonDisabled() {
      return "";
    },
    classes() {
      const {
        // prefixCls: customizePrefixCls,
        type,
        shape,
        size,
        hasTwoCNChar,
        sLoading,
        ghost,
        block,
        icon,
        $slots
      } = this;
      // large => lg
      // small => sm
      let sizeCls = "";
      switch (size) {
        case "large":
          sizeCls = "lg";
          break;
        case "small":
          sizeCls = "sm";
          break;
        default:
          break;
      }
      return {
        "an-btn": true,
        [`an-btn-${sizeCls}`]: sizeCls
      };
    }
  },
  mounted() {},
  methods: {
    handleClick(evt) {
      console.log("handleClick111");
      this.$emit("click", evt);
    }
  },
  render(h) {
    const {
      type,
      htmlType,
      classes,
      disabled,
      handleClick,
      sLoading,
      $slots,
      $attrs,
      $listeners
    } = this;
    console.log(this);
    return h(
      "button",
      {
        //   class: { "an-button": true },
        class: classes,
        style: {},
        attrs: {
          ...$attrs,
          disabled
        },
        on: {
          // click: (evt) => {
          //   console.log("handleClick222", evt);
          //   this.$emit("click", evt);
          // }
          // ...getListeners(this),
          ...$listeners,
          click: handleClick
        },
        domProps: {
          //   innerHTML: "我是render的按钮"
        }
      },
      [...$slots.default]
    );
  }
};
</script>

<style lang="scss" scoped>
.an-btn {
  line-height: 1.499;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  border: 1px solid #d9d9d9;
}
.an-btn > .anticon {
  line-height: 1;
}

.an-btn,
.an-btn:active,
.an-btn:focus {
  outline: 0;
}

.an-btn:not([disabled]):hover {
  text-decoration: none;
}

.an-btn:not([disabled]):active {
  outline: 0;
  box-shadow: none;
}

.an-btn.disabled,
.an-btn[disabled] {
  cursor: not-allowed;
}

.an-btn.disabled > *,
.an-btn[disabled] > * {
  pointer-events: none;
}
.an-btn-lg {
  height: 40px;
  padding: 0 15px;
  font-size: 16px;
  border-radius: 4px;
}

.an-btn-sm {
  height: 24px;
  padding: 0 7px;
  font-size: 14px;
  border-radius: 4px;
}
.an-btn:focus,
.an-btn:hover {
  color: #40a9ff;
  background-color: #fff;
  border-color: #40a9ff;
}
.an-btn.active,
.an-btn:active,
.an-btn:focus,
.an-btn:hover {
  text-decoration: none;
  background: #fff;
}

.an-btn > i,
.an-btn > span {
  display: inline-block;
  transition: margin-left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  pointer-events: none;
}

.an-btn-primary {
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
</style>
