<template>
  <div class="h-avatar-container">
    <span :class="avatarClass" :style="sizeStyle">
      <slot></slot>
    </span>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component({
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
  }
})
export default class HAvatar extends Vue {
  get avatarClass() {
    const { size, shape } = this;
    let classList = ["h-avatar"];

    if (size && typeof size === "string") {
      classList.push(`h-avatar--${size}`);
    }

    if (shape) {
      classList.push(`h-avatar--${shape}`);
    }

    return classList.join(" ");
  }
  get sizeStyle() {
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
