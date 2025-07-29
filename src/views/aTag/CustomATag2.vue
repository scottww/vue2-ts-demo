<template>
  <a-tooltip v-if="tooltip" :title="tooltip">
    <a-tag
      :style="computedStyle"
      :closable="closable"
      @close="handleClose"
      :class="['custom-tag', customClass, { hoverable: hoverEffect }]"
    >
      <a-icon v-if="icon" :type="icon" style="margin-right: 4px" />
      <slot>{{ label }}</slot>
    </a-tag>
  </a-tooltip>
  <a-tag
    v-else
    :style="computedStyle"
    :closable="closable"
    @close="handleClose"
    :class="['custom-tag', customClass, { hoverable: hoverEffect }]"
  >
    <a-icon v-if="icon" :type="icon" style="margin-right: 4px" />
    <slot>{{ label }}</slot>
  </a-tag>
</template>

<script>
export default {
  name: "CustomTag",
  props: {
    label: {
      type: String,
      default: "标签"
    },
    value: {
      type: [String, Number],
      required: true
    },
    type: {
      type: String,
      default: "level"
    },
    closable: {
      type: Boolean,
      default: false
    },
    tooltip: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    customStyle: {
      type: Object,
      default: () => ({})
    },
    customClass: {
      type: String,
      default: ""
    },
    hoverEffect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      styles: {
        level: {
          1: {
            color: "#E55A5A",
            background: "#E55A5A1A",
            borderColor: "#E55A5A5A"
          },
          2: {
            color: "#FF5500",
            background: "#FF55001A",
            borderColor: "#FF55005A"
          },
          3: {
            color: "#FFAB00",
            background: "#FFAB001A",
            borderColor: "#FFAB005A"
          },
          4: {
            color: "#4C84FF",
            background: "#4C84FF1A",
            borderColor: "#4C84FF5A"
          }
        },
        event: {
          0: {
            color: "#FF5500",
            background: "#FF55001A",
            borderColor: "#FF55005A"
          },
          1: {
            color: "#FFAB00",
            background: "#FFAB001A",
            borderColor: "#FFAB005A"
          },
          2: {
            color: "#D9C269",
            background: "#D9C2691A",
            borderColor: "#D9C2695A"
          },
          3: {
            color: "#4C84FF",
            background: "#4C84FF1A",
            borderColor: "#4C84FF5A"
          },
          4: {
            color: "#00A870",
            background: "#00A8701A",
            borderColor: "#00A8705A"
          },
          5: {
            color: "#E55A5A",
            background: "#E55A5A1A",
            borderColor: "#E55A5A5A"
          }
        }
      }
    };
  },
  computed: {
    computedStyle() {
      const styleSet =
        this.type === "event" ? this.styles.event : this.styles.level;
      const defaultStyle = {
        color: "#999",
        background: "#f5f5f5",
        borderColor: "#d9d9d9"
      };
      return Object.assign(
        {},
        styleSet[this.value] || defaultStyle,
        this.customStyle
      );
    }
  },
  methods: {
    handleClose() {
      this.$emit("close", this.value);
    }
  }
};
</script>

<style scoped lang="scss">
.custom-tag {
  display: inline-flex;
  align-items: center;
  transition: all 0.3s;
}
.hoverable:hover {
  opacity: 0.85;
  border-color: #1890ff !important;
  cursor: pointer;
}

.custom-tag__level1 {
  color: #e55a5a;
  background: #e55a5a1a;
  border-color: #e55a5a5a;
}
.custom-tag__level2 {
  color: #ff5500;
  background: #ff55001a;
  border-color: #ff55005a;
}
.custom-tag__level3 {
  color: #ffab00;
  background: #ffab001a;
  border-color: #ffab005a;
}
.custom-tag__level4 {
  color: #4c84ff;
  background: #4c84ff1a;
  border-color: #4c84ff5a;
}
// event 狀態
.custom-tag__event0 {
  color: #ff5500;
  background: #ff55001a;
  border-color: #ff55005a;
}
.custom-tag__event1 {
  color: #ffab00;
  background: #ffab001a;
  border-color: #ffab005a;
}
.custom-tag__event2 {
  color: #d9c269;
  background: #d9c2691a;
  border-color: #d9c2695a;
}
.custom-tag__event3 {
  color: #4c84ff;
  background: #4c84ff1a;
  border-color: #4c84ff5a;
}
.custom-tag__event4 {
  color: #00a870;
  background: #00a8701a;
  border-color: #00a8705a;
}
.custom-tag__event5 {
  color: #e55a5a;
  background: #e55a5a1a;
  border-color: #e55a5a5a;
}
</style>
