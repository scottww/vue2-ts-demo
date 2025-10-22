<template>
  <div class="icon-button-group">
    <div
      v-for="(item, index) in normalizedItems"
      :key="index"
      class="icon-button-wrapper"
    >
      <div
        class="icon-button"
        :class="{
          active: !item.noActive && isActive(index),
          disabled: disabled
        }"
        :style="{
          backgroundImage: `url(${
            !item.noActive && isActive(index) ? btnBgActive : btnBg
          })`
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
      </div>
    </div>
  </div>
</template>

<script>
import btnBg from "@/assets/iconButtonGroup/btn_bg.png";
import btnBgActive from "@/assets/iconButtonGroup/btn_active.png";
export default {
  name: "IconButtonGroup",
  props: {
    value: { type: [Number, String], default: -1 }, // v-model
    items: { type: [Array, Object], default: () => [] },
    disabled: { type: Boolean, default: false },
    useId: { type: Boolean, default: false }
  },
  data() {
    return {
      internalActiveIndex: -1,
      btnBg: btnBg,
      btnBgActive: btnBgActive
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
  width: 52px;
  height: 48px;
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
  inset: -2px; /* 上下左右各扩大2px */
}

.icon-button-wrapper:hover .icon-button {
  transform: translateX(-1px);
}

.icon-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.icon-container {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.default-icon-img {
  width: 100%;
  height: 100%;
}
</style>
