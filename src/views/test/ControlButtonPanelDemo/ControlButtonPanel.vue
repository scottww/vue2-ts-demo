<template>
  <div v-if="!isClose" class="button-group-container">
    <div class="button-scroll-area">
      <div
        v-for="(btn, index) in buttons"
        :key="btn.id || index"
        class="group-button"
        :class="{ disabled: btn.disabled }"
        @click.stop="handleButtonClick(btn)"
      >
        <span class="button-text">{{ btn.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ControlButtonPanel",
  props: {
    // 是否点击按钮后自动关闭面板
    autoClose: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 业务状态字段，控制面板显示隐藏
      isClose: false,

      // 业务相关按钮数据
      buttons: [
        {
          label: "开始灌溉",
          tag: "startIrrigation",
          type: "action",
          disabled: false
        },
        {
          label: "停止灌溉",
          tag: "stopIrrigation",
          type: "action",
          disabled: true
        },
        { label: "开启闸门", tag: "openGate", type: "action" },
        { label: "关闭闸门", tag: "closeGate", type: "action" },
        { label: "调节流量", tag: "adjustFlow", type: "action" },
        {
          label: "监控水位",
          tag: "monitorLevel",
          type: "action",
          disabled: true
        },
        { label: "监控温度", tag: "monitorTemp", type: "action" },
        { label: "系统复位", tag: "systemReset", type: "action" }
      ]
    };
  },

  created() {
    // 给每个按钮生成唯一id
    this.buttons = this.buttons.map((btn) => ({
      ...btn,
      id: this.randomUUID()
    }));
  },

  computed: {},

  methods: {
    randomUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (char) {
          const random = (Math.random() * 16) | 0;
          const value = char === "x" ? random : (random & 0x3) | 0x8;
          return value.toString(16);
        }
      );
    },

    handleButtonClick(btn) {
      if (btn.disabled) return;
      console.log("点击按钮:", btn);

      // 根据 prop 决定是否关闭面板
      if (this.autoClose) {
        this.isClose = true;
      }

      this.$emit("buttonClick", btn);
    }
  }
};
</script>

<style scoped>
.button-group-container {
  position: relative;
  width: 180px;
  height: 280px;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid rgba(73, 156, 255, 0.2);

  /* 高级科技感背景 */
  background: linear-gradient(
    180deg,
    rgba(11, 36, 68, 0.96) 0%,
    rgba(8, 21, 42, 0.98) 100%
  );
  box-shadow: inset 0 1px 0 rgba(210, 240, 255, 0.12),
    inset 0 0 26px rgba(0, 136, 255, 0.08), 0 10px 24px rgba(0, 0, 0, 0.35);
}

.button-group-container::before,
.button-group-container::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
}

.button-group-container::before {
  background: radial-gradient(
      circle at top left,
      rgba(87, 187, 255, 0.2) 0,
      transparent 42%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(0, 109, 204, 0.12) 0,
      transparent 38%
    );
}

.button-group-container::after {
  inset: 1px;
  border-radius: 11px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.08),
    transparent 28%
  );
  opacity: 0.7;
}

.button-scroll-area {
  position: relative;
  z-index: 1;
  width: calc(100% + 10px);
  height: 100%;
  margin-right: -10px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 2px;
  padding-left: 4px;
  padding-right: 10px;
  padding-bottom: 2px;
  scrollbar-gutter: stable;
}

.button-scroll-area::-webkit-scrollbar {
  width: 5px;
}

.button-scroll-area::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(116, 183, 255, 0.28);
}

.button-scroll-area::-webkit-scrollbar-track {
  background: transparent;
}

.group-button {
  width: 100%;
  min-height: 32px;
  padding: 0 10px;
  border-radius: 8px;
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  background: linear-gradient(
    180deg,
    rgba(24, 92, 160, 0.34) 0%,
    rgba(12, 54, 100, 0.34) 100%
  );
  border: 1px solid rgba(84, 183, 255, 0.42);
  box-shadow: inset 0 1px 0 rgba(205, 239, 255, 0.08),
    0 4px 10px rgba(5, 20, 42, 0.28);
  flex-shrink: 0;
}

.group-button.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  box-shadow: none;
  border-color: rgba(255, 255, 255, 0.1);
}

.group-button:hover:not(.disabled) {
  background: linear-gradient(
    180deg,
    rgba(36, 124, 211, 0.48) 0%,
    rgba(15, 73, 136, 0.48) 100%
  );
  border-color: rgba(116, 206, 255, 0.72);
  box-shadow: inset 0 1px 0 rgba(220, 246, 255, 0.14),
    0 0 14px rgba(39, 157, 255, 0.28);
}

.button-text {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.5px;
  white-space: nowrap;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.35);
}

@media (max-width: 768px) {
  .group-button {
    min-height: 28px;
  }
}
</style>
