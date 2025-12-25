<template>
  <div class="icon-button-group">
    <div
      v-for="(item, index) in normalizedItems"
      :key="index"
      class="icon-button-wrapper"
    >
      <div
        class="icon-button"
        :class="{ active: !item.noActive && isActive(index), disabled }"
        :style="{
          backgroundImage: `url(${
            !item.noActive && isActive(index) ? btnBgActive : btnBg
          })`,
          width: width,
          height: height
        }"
        @click="handleClick(index, item)"
        :title="item.name"
      >
        <div class="icon-container">
          <img
            v-if="item.icon"
            :src="item.icon"
            alt=""
            class="default-icon-img"
          />
        </div>
        <div v-if="item.name" class="icon-button-name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "IconButtonGroup",

  model: {
    prop: "value",
    event: "input"
  },

  props: {
    value: {
      type: [Number, String],
      default: -1
    },
    items: {
      type: [Array, Object],
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    useId: { //使用id作为唯一标识
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "42px"
    },
    height: {
      type: String,
      default: "40px"
    }
  },

  data() {
    return {
      internalActiveIndex: -1,
      btnBg: require("@/assets/IconButtonGroupNew/btn-bg.png"),
      btnBgActive: require("@/assets/IconButtonGroupNew/btn-active.png")
    };
  },

  computed: {
    normalizedItems() {
      return Array.isArray(this.items) ? this.items : [this.items];
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (this.useId) {
          const index = this.normalizedItems.findIndex((i) => i.id === val);
          this.internalActiveIndex = index;
        } else {
          this.internalActiveIndex = typeof val === "number" ? val : -1;
        }
      }
    }
  },

  methods: {
    isActive(index) {
      return this.internalActiveIndex === index;
    },

    handleClick(index, item) {
      if (this.disabled) return;

      if (item.noActive) {
        // 不高亮，只触发事件
        this.$emit("click", item);
        return;
      }

      // 再次点击，取消逻辑
      if (this.internalActiveIndex === index) {
        this.internalActiveIndex = -1;
        this.$emit("input", -1);
        this.$emit("click", null);
        return;
      }

      this.internalActiveIndex = index;
      this.$emit("input", this.useId ? item.id : index);
      this.$emit("click", item);
    }
  }
};
</script>
<style scoped lang="scss">
.icon-button-group {
  display: flex;
  flex-direction: column;
  padding: 8px;
  position: relative;
}

.icon-button-wrapper {
  position: relative;
  padding: 4px 0;
  pointer-events: none;
}

.icon-button {
  width: 42px;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.3s ease;
  pointer-events: auto;
}

.icon-button::before {
  content: "";
  position: absolute;
  inset: -2px;
}

.icon-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.icon-container {
  width: 17px;
  height: 17px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.default-icon-img {
  width: 100%;
  height: 100%;
}

.icon-button-name {
  font-size: 16px;
  font-weight: 700;
  color: #fffc;
}
</style>
