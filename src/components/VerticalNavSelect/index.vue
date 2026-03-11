<template>
  <div class="vertical-nav-select" :style="panelStyle">
    <div v-if="title" class="vertical-nav-select__title">{{ title }}</div>

    <div class="vertical-nav-select__list" :style="listStyle">
      <div class="vertical-nav-select__line"></div>

      <button
        v-for="item in normalizedOptions"
        :key="item.value"
        type="button"
        class="vertical-nav-select__item"
        :class="{
          'is-active': isActive(item.value),
          'is-disabled': item.disabled
        }"
        :disabled="item.disabled"
        @click="handleSelect(item)"
      >
        <span class="vertical-nav-select__dot"></span>
        <span class="vertical-nav-select__label" :title="item.label">
          {{ item.label }}
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "VerticalNavSelect",
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number],
      default: ""
    },
    options: {
      type: Array,
      default: () => []
    },
    height: {
      type: [String, Number],
      default: 620
    },
    width: {
      type: [String, Number],
      default: 312
    }
  },
  computed: {
    normalizedOptions() {
      return this.options.map((item, index) => {
        if (typeof item === "string") {
          return {
            label: item,
            value: item,
            disabled: false,
            index
          };
        }

        return {
          label: item.label,
          value: item.value,
          disabled: Boolean(item.disabled),
          index
        };
      });
    },
    panelStyle() {
      return {
        width: this.formatSize(this.width)
      };
    },
    listStyle() {
      return {
        maxHeight: this.formatSize(this.height)
      };
    }
  },
  methods: {
    formatSize(value) {
      return typeof value === "number" ? `${value}px` : value;
    },
    isActive(value) {
      return this.value === value;
    },
    handleSelect(item) {
      if (item.disabled || this.value === item.value) {
        return;
      }

      this.$emit("input", item.value);
      this.$emit("update:modelValue", item.value);
      this.$emit("change", item.value, item);
    }
  }
};
</script>

<style scoped>
.vertical-nav-select {
  padding: 6px 0;
  background: #fff;
}

.vertical-nav-select__title {
  margin-bottom: 28px;
  padding-left: 20px;
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  color: #222;
}

.vertical-nav-select__list {
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 2px 10px 2px 20px;
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: #d8d8d8 transparent;
}

.vertical-nav-select__line {
  position: absolute;
  left: 25px;
  top: 10px;
  bottom: 10px;
  width: 1px;
  background: #d9d9d9;
}

.vertical-nav-select__item {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 32px;
  padding: 10px 0;
  border: 0;
  background: transparent;
  appearance: none;
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.vertical-nav-select__item.is-disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.vertical-nav-select__dot {
  flex: 0 0 auto;
  width: 9px;
  height: 9px;
  margin-right: 16px;
  border: 1px solid #202020;
  border-radius: 50%;
  background: #fff;
  box-sizing: border-box;
}

.vertical-nav-select__label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 15px;
  line-height: 22px;
  color: #666;
  transition: color 0.2s ease, font-weight 0.2s ease;
}

.vertical-nav-select__item:hover:not(.is-disabled) .vertical-nav-select__label {
  color: #222;
}

.vertical-nav-select__item.is-active .vertical-nav-select__dot {
  background: #202020;
}

.vertical-nav-select__item.is-active .vertical-nav-select__label {
  color: #222;
  font-weight: 600;
}

.vertical-nav-select__list::-webkit-scrollbar {
  width: 6px;
}

.vertical-nav-select__list::-webkit-scrollbar-track {
  background: transparent;
}

.vertical-nav-select__list::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: #d8d8d8;
}
</style>
