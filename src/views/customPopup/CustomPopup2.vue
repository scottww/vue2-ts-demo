<template>
  <div class="custom-popup">
    <!-- 遮罩层 -->
    <div class="mask" v-if="visible" @click="handleMaskClick"></div>
    
    <!-- 弹窗内容 -->
    <transition name="popup">
      <div class="popup-content" v-if="visible">
        <!-- 弹窗头部 -->
        <div class="popup-header">
          <h3>{{ title }}</h3>
          <span class="close-btn" @click="handleClose">×</span>
        </div>
        
        <!-- 弹窗主体 -->
        <div class="popup-body">
          <slot></slot>
        </div>
        
        <!-- 弹窗底部 -->
        <div class="popup-footer" v-if="showFooter">
          <button class="cancel-btn" @click="handleCancel">{{ cancelText }}</button>
          <button class="confirm-btn" @click="handleConfirm">{{ confirmText }}</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CustomPopup',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    closeOnClickMask: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    handleCancel() {
      this.handleClose();
      this.$emit('cancel');
    },
    handleConfirm() {
      this.handleClose();
      this.$emit('confirm');
    },
    handleMaskClick() {
      if (this.closeOnClickMask) {
        this.handleClose();
      }
    }
  }
}
</script>

<!-- <style lang="scss" scoped>
.custom-popup {
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  .popup-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 4px;
    min-width: 400px;
    z-index: 1000;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .popup-header {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin: 0;
      font-size: 18px;
      color: #333;
    }

    .close-btn {
      font-size: 24px;
      color: #999;
      cursor: pointer;
      &:hover {
        color: #666;
      }
    }
  }

  .popup-body {
    padding: 20px;
    min-height: 100px;
  }

  .popup-footer {
    padding: 20px;
    border-top: 1px solid #eee;
    text-align: right;

    button {
      padding: 8px 20px;
      margin-left: 10px;
      border-radius: 4px;
      cursor: pointer;
      border: none;
      outline: none;
    }

    .cancel-btn {
      background-color: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      &:hover {
        color: #409eff;
        border-color: #c6e2ff;
        background-color: #ecf5ff;
      }
    }

    .confirm-btn {
      background-color: #409eff;
      color: #fff;
      &:hover {
        background-color: #66b1ff;
      }
    }
  }
}

// 弹窗动画
.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s;
}

.popup-enter,
.popup-leave-to {
  transform: translate(-50%, -50%) scale(0.8);
  opacity: 0;
}
</style> -->
<!-- 样式二 -->
<style lang="scss" scoped>
.custom-popup {
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.45);
  }

  .popup-content {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 1000;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 10px;
    min-width: 420px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    animation: fadeInUp 0.3s ease-out;

    @keyframes fadeInUp {
      from {
        transform: translate(-50%, -40%);
        opacity: 0;
      }
      to {
        transform: translate(-50%, -50%);
        opacity: 1;
      }
    }
  }

  .popup-header {
    padding: 16px 24px;
    background: #f7f9fb;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin: 0;
      font-size: 18px;
      color: #1f2d3d;
      font-weight: 600;
    }

    .close-btn {
      font-size: 22px;
      color: #999;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        color: #333;
        transform: scale(1.1);
      }
    }
  }

  .popup-body {
    padding: 20px 24px;
    font-size: 14px;
    color: #4a4a4a;
    line-height: 1.6;
  }

  .popup-footer {
    padding: 14px 24px;
    background: #fafafa;
    border-top: 1px solid #f0f0f0;
    text-align: right;

    button {
      font-size: 14px;
      padding: 6px 18px;
      margin-left: 10px;
      border-radius: 6px;
      border: none;
      outline: none;
      transition: all 0.2s ease;
    }

    .cancel-btn {
      background: #f5f5f5;
      color: #606266;
      border: 1px solid #dcdfe6;
      &:hover {
        background: #e6f7ff;
        color: #409eff;
        border-color: #91d5ff;
      }
    }

    .confirm-btn {
      background: #409eff;
      color: #fff;
      &:hover {
        background: #66b1ff;
      }
    }
  }
}

// 弹窗动画
.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s ease;
}

.popup-enter,
.popup-leave-to {
  transform: translate(-50%, -50%) scale(0.9);
  opacity: 0;
}
</style>