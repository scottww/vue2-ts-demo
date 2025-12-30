<template>
  <div class="roller-blind-container" :style="containerStyle">
    <div class="roller-blind-background" :style="backgroundStyle"></div>
    
    <!-- 左边文案 -->
    <div class="roller-blind-label">
      <slot name="label">
        {{ label || '滑块' }}
      </slot>
    </div>
    
    <!-- 右边滑块区域 -->
    <div class="roller-blind-slider-container" 
         @mousedown="handleSliderClick"
         @touchstart="handleSliderClick">
      <!-- 蓝色进度条 -->
      <div class="slider-progress" :style="progressStyle"></div>
      
      <!-- 滑块 -->
      <div class="roller-blind-slider" 
           :style="sliderStyle"
           @mousedown="startDrag"
           @touchstart="startDrag">
        <div class="slider-handle" :style="handleStyle"></div>
      </div>
    </div>
    
    <!-- 内容插槽 -->
    <div class="roller-blind-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 导入默认背景图片
import defaultBackgroundImage from '@/assets/images/YearPicker/背景长条.png';

export default {
  name: 'RollerBlind',
  props: {
    // 背景图片
    backgroundImage: {
      type: String,
      default: defaultBackgroundImage
    },
    // 初始滑块位置（百分比）
    initialPosition: {
      type: Number,
      default: 50
    },
    // 容器宽度
    width: {
      type: [String, Number],
      default: 300
    },
    // 容器高度
    height: {
      type: [String, Number],
      default: 50
    },
    // 左边文案
    label: {
      type: String,
      default: ''
    },
    // 滑块手柄颜色
    handleColor: {
      type: String,
      default: '#ffffff'
    },
    // 滑块手柄边框颜色
    handleBorderColor: {
      type: String,
      default: '#007aff'
    },
    // 滑块手柄尺寸
    handleSize: {
      type: Object,
      default: () => ({ width: 16, height: 16 })
    },
    // 进度条颜色
    progressColor: {
      type: String,
      default: '#007aff'
    }
  },
  data() {
    return {
      sliderPosition: this.initialPosition,
      isDragging: false,
      startX: 0,
      startPosition: 0
    };
  },
  computed: {
    // 容器样式
    containerStyle() {
      return {
        width: typeof this.width === 'number' ? this.width + 'px' : this.width,
        height: typeof this.height === 'number' ? this.height + 'px' : this.height
      };
    },
    // 背景样式
    backgroundStyle() {
      return {
        background: `url(${this.backgroundImage}) center/100% 100% no-repeat`
      };
    },
    // 滑块样式
    sliderStyle() {
      return {
        left: this.sliderPosition + '%'
      };
    },
    // 滑块手柄样式
    handleStyle() {
      return {
        backgroundColor: this.handleColor,
        borderColor: this.handleBorderColor,
        width: this.handleSize.width + 'px',
        height: this.handleSize.height + 'px'
      };
    },
    // 进度条样式
    progressStyle() {
      return {
        width: this.sliderPosition + '%',
        backgroundColor: this.progressColor
      };
    }
  },
  mounted() {
    // 添加全局鼠标/触摸事件监听
    document.addEventListener('mousemove', this.drag);
    document.addEventListener('mouseup', this.stopDrag);
    document.addEventListener('touchmove', this.drag);
    document.addEventListener('touchend', this.stopDrag);
  },
  beforeDestroy() {
    // 移除全局事件监听
    document.removeEventListener('mousemove', this.drag);
    document.removeEventListener('mouseup', this.stopDrag);
    document.removeEventListener('touchmove', this.drag);
    document.removeEventListener('touchend', this.stopDrag);
  },
  methods: {
    startDrag(e) {
      this.isDragging = true;
      this.startX = e.clientX || e.touches[0].clientX;
      this.startPosition = this.sliderPosition;
      e.preventDefault();
    },
    drag(e) {
      if (!this.isDragging) return;
      
      const currentX = e.clientX || e.touches[0].clientX;
      const container = this.$el.querySelector('.roller-blind-slider-container');
      
      // 添加空值检查，避免offsetWidth错误
      if (!container) return;
      
      const containerWidth = container.offsetWidth;
      const deltaX = currentX - this.startX;
      const deltaPosition = (deltaX / containerWidth) * 100;
      
      // 限制滑块位置在0-100%之间
      this.sliderPosition = Math.max(0, Math.min(100, this.startPosition + deltaPosition));
      
      // 触发位置变化事件，使用kebab-case规范
      this.$emit('position-change', this.sliderPosition);
    },
    // 点击滑块区域直接移动滑块
    handleSliderClick(e) {
      // 如果已经在拖动，不处理
      if (this.isDragging) return;
      
      const sliderContainer = e.currentTarget;
      const rect = sliderContainer.getBoundingClientRect();
      const clickX = e.clientX || e.touches[0].clientX;
      const offsetX = clickX - rect.left;
      
      // 计算点击位置对应的百分比
      let newPosition = (offsetX / rect.width) * 100;
      
      // 限制在0-100%之间
      newPosition = Math.max(0, Math.min(100, newPosition));
      
      // 设置新位置
      this.sliderPosition = newPosition;
      
      // 触发位置变化事件
      this.$emit('position-change', this.sliderPosition);
      
      e.preventDefault();
    },
    
    stopDrag() {
      this.isDragging = false;
    }
  }
};
</script>

<style scoped>
.roller-blind-container {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  margin: 0 auto;
  user-select: none;
  /* 响应式设计 */
  max-width: 100%;
  /* 左边文案右边滑块的布局 */
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
}

.roller-blind-background {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  /* 确保背景图完全覆盖容器，不拉伸变形 */
  background-size: 100% 100% !important;
}

/* 左边文案样式 */
.roller-blind-label {
  position: relative;
  z-index: 3;
  color: white;
  font-size: 14px;
  font-weight: 500;
  margin-right: 15px;
  white-space: nowrap;
}

/* 右边滑块容器 */
.roller-blind-slider-container {
  position: relative;
  z-index: 3;
  flex: 1;
  height: 20px;
  display: flex;
  align-items: center;
}

/* 进度条背景轨道（预览长度） */
.roller-blind-slider-container::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.3); /* 半透明白色背景 */
  z-index: 1;
  border-radius: 2px;
}

/* 蓝色进度条 */
.slider-progress {
  position: absolute;
  top: 50%;
  left: 0;
  height: 4px;
  transform: translateY(-50%);
  background-color: #007aff;
  z-index: 2;
  transition: width 0.1s ease;
  border-radius: 2px;
}

/* 滑块样式 */
.roller-blind-slider {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  transition: left 0.1s ease;
  cursor: pointer;
}

/* 滑块手柄 - 白色圆形 */
.slider-handle {
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  cursor: grab;
  border: 2px solid;
  /* 添加滑块的视觉层次感 */
  transition: all 0.2s ease;
}

.slider-handle:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
  transform: scale(1.1);
}

.slider-handle:active {
  cursor: grabbing;
  transform: scale(0.95);
}

.roller-blind-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  color: #fff;
  font-size: 14px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}
</style>