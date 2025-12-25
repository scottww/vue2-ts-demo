<template>
  <div class="nav-button-container" @click="handleClick">
    <div class="nav-button" :style="buttonStyle">
      <div class="nav-button-icon" :style="{ width: iconWidth, height: iconHeight }">
        <slot name="icon">
          <div class="default-icon">{{ defaultIcon }}</div>
        </slot>
      </div>
      <div class="nav-button-text">
        <slot>
          {{ text }}
        </slot>
      </div>
      <div class="nav-button-arrow">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 2L11 8L5 14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavButton',
  props: {
    // 按钮文字
    text: {
      type: String,
      default: ''
    },
    // 默认图标
    defaultIcon: {
      type: String,
      default: '📄'
    },
    // 按钮背景色，支持渐变
    backgroundColor: {
      type: String,
      default: 'linear-gradient(135deg, #1E88E5 0%, #1976D2 100%)'
    },
    // 选中时的背景色
    selectedBackgroundColor: {
      type: String,
      default: ''
    },
    // 按钮高度
    height: {
      type: String,
      default: '48px'
    },
    // 选中时的按钮高度
    selectedHeight: {
      type: String,
      default: ''
    },
    // 按钮宽度
    width: {
      type: String,
      default: '200px'
    },
    // 选中时的按钮宽度
    selectedWidth: {
      type: String,
      default: ''
    },
    // 图标宽度
    iconWidth: {
      type: String,
      default: '32px'
    },
    // 图标高度
    iconHeight: {
      type: String,
      default: '32px'
    },
    // 是否选中
    selected: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 按钮样式
    buttonStyle() {
      return {
        background: this.selected && this.selectedBackgroundColor ? this.selectedBackgroundColor : this.backgroundColor,
        height: this.selected && this.selectedHeight ? this.selectedHeight : this.height,
        width: this.selected && this.selectedWidth ? this.selectedWidth : this.width,
        cursor: this.disabled ? 'not-allowed' : 'pointer',
        opacity: this.disabled ? 0.7 : 1
      };
    }
  },
  methods: {
    // 点击事件处理
    handleClick() {
      if (!this.disabled) {
        this.$emit('click');
      }
    }
  }
};
</script>

<style scoped>
.nav-button-container {
  position: relative;
  margin: 10px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  overflow: hidden;
}

.nav-button {
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(255, 255, 255, 0.5);
}

.nav-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.nav-button:active {
  transform: translateY(0);
}

.nav-button-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.default-icon {
  color: white;
}

.nav-button-text {
  flex: 1;
  color: white;
  font-size: 16px;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.nav-button-arrow {
  margin-left: 12px;
  color: white;
  opacity: 0.8;
}
</style>