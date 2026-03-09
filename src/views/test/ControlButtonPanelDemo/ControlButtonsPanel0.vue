<template>
  <div
    v-if="!isClose"
    class="button-group-container"
    :style="{ backgroundImage: 'url(' + backgroundImg + ')' }"
  >
    <div class="button-scroll-area">
      <div
        v-for="(btn, index) in buttons"
        :key="btn.tag || index"
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
import backgroundImg from "@/assets/normalScreen/splitView/split_view_bg_new.png";

export default {
  name: "ControlButtonsPanel",
  props: {
    // 是否点击按钮后自动关闭面板
    autoClose: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      backgroundImg,
      isClose: false,

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
        { label: "监控水位", tag: "monitorLevel", type: "action", disabled: true },
        { label: "监控温度", tag: "monitorTemp", type: "action" },
        { label: "系统复位", tag: "systemReset", type: "action" }
      ]
    };
  },

  created() {
    this.initButtons();
  },

  methods: {
    randomUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },

    initButtons() {
      this.buttons = this.buttons.map((btn) => ({
        ...btn,
        id: this.randomUUID()
      }));
    },

    handleButtonClick(btn) {
      if (btn.disabled) return;
      console.log("点击按钮：", btn);
      // 根据 prop 决定是否关闭面板
      if (this.autoClose) {
        this.isClose = true;
      }
      this.$emit(btn.type, btn);
    }
  }
};
</script>

<style scoped>
.button-group-container {
  width: 160px;
  height: 271px;
  padding: 14px 2px 16px 10px;
  overflow: hidden;
  box-sizing: border-box;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

.button-scroll-area {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: stretch;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-right: 0;
  padding-top: 2px;
  padding-bottom: 8px;
}

.group-button {
  width: 100%;
  min-width: 0;
  min-height: 28px;
  padding: 0 8px;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-sizing: border-box;
  flex-shrink: 0;
}

.group-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.group-button:hover:not(.disabled) {
  background-color: rgba(15, 126, 198, 1);
}

.button-text {
  font-size: 14px;
  white-space: nowrap;
  line-height: 1.2;
}

@media (max-width: 768px) {
  .group-button {
    min-height: 24px;
  }
}
</style>
