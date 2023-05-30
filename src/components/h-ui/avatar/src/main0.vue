<template>
  <div class="h-avatar-container">
    <span :class="avatarClass" :style="sizeStyle">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "HAvatar",
  props: {
    size: {
      type: [Number, String],
      validator(val) {
        if (typeof val === "string") {
          return ["large", "medium", "small"].includes(val);
        }
        return typeof val === "number";
      }
    },
    shape: {
      type: String,
      default: "circle",
      validator(val) {
        return ["circle", "square"].includes(val);
      }
    }
  },
  computed: {
    avatarClass() {
      const { size, shape } = this;
      let classList = ["h-avatar"];

      if (size && typeof size === "string") {
        classList.push(`h-avatar--${size}`);
      }

      if (shape) {
        classList.push(`h-avatar--${shape}`);
      }

      return classList.join(" ");
    },
    sizeStyle() {
      const { size } = this;
      const sizeStyle1 =
        typeof size === "number"
          ? {
              height: `${size}px`,
              width: `${size}px`,
              lineHeight: `${size}px`
            }
          : {};
      return sizeStyle1;
    }
  }
  // methods: {
  // renderAvatar() {
  //   return this.$slots.default;
  // }
  // }
  // render() {
  //   const { avatarClass, size } = this;

  //   const sizeStyle =
  //     typeof size === "number"
  //       ? {
  //           height: `${size}px`,
  //           width: `${size}px`,
  //           lineHeight: `${size}px`
  //         }
  //       : {};

  //   return (
  //     <span class={avatarClass} style={sizeStyle}>
  //       {this.renderAvatar()}
  //     </span>
  //   );
  // }
};
</script>

<style lang="scss" scoped>
.h-avatar {
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;
  color: #fff;
  background: #c0c4cc;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  &--large {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
  &--medium {
    width: 36px;
    height: 36px;
    line-height: 36px;
  }
  &--small {
    width: 28px;
    height: 28px;
    line-height: 28px;
  }
  &--circle {
    border-radius: 50%;
  }
  &--square {
    border-radius: 4px;
  }
}
</style>
