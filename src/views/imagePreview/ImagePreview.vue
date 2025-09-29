<template>
  <div class="image-preview-container" v-if="showPreview">
    <!-- 返回按钮 -->
    <div class="back-button" @click="handleBack">
      <i class="icon-arrow-left"></i>
      <span>返回</span>
    </div>
    
    <!-- 主预览区域 -->
    <div class="main-preview">
      <!-- 左箭头 -->
      <div class="arrow left-arrow" @click="goToPrevious" v-show="images.length > 1">
        <i class="icon-angle-left"></i>
      </div>
      
      <!-- 图片显示区域 -->
      <div class="image-container">
        <img :src="currentImage" :alt="`图片 ${currentIndex + 1}`" class="preview-image" :key="currentImage" />
        <!-- 图片水印 -->
        <div class="watermark" v-if="watermarkText">{{ watermarkText }}</div>
      </div>
      
      <!-- 右箭头 -->
      <div class="arrow right-arrow" @click="goToNext" v-show="images.length > 1">
        <i class="icon-angle-right"></i>
      </div>
    </div>
    
    <!-- 缩略图区域 -->
    <div class="thumbnail-container" v-show="images.length > 1">
      <div class="thumbnail-scroll">
        <div 
          v-for="(image, index) in images" 
          :key="index"
          class="thumbnail-item"
          :class="{ active: index === currentIndex }"
          @click="setCurrentImage(index)"
        >
          <img :src="image" :alt="`缩略图 ${index + 1}`" class="thumbnail" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImagePreview',
  props: {
    showPreview: {
      type: Boolean,
      default: true
    },
    images: {
      type: Array,
      required: true,
      default: () => []
    },
    initialIndex: {
      type: Number,
      default: 0
    },
    watermarkText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentIndex: this.initialIndex
    }
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex] || '';
    }
  },
  watch: {
    initialIndex(newIndex) {
      this.currentIndex = newIndex;
    },
    images(newImages) {
      // 确保当前索引在有效范围内
      if (this.currentIndex >= newImages.length) {
        this.currentIndex = 0;
      }
    }
  },
  methods: {
    goToPrevious() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    
    goToNext() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    
    setCurrentImage(index) {
      this.currentIndex = index;
    },
    
    handleBack() {
      this.$emit('back');
    },
    
    // 键盘导航支持
    handleKeydown(e) {
      if (!this.showPreview) return;
      
      if (e.key === 'ArrowLeft') {
        this.goToPrevious();
      } else if (e.key === 'ArrowRight') {
        this.goToNext();
      } else if (e.key === 'Escape') {
        this.handleBack();
      }
    }
  },
  mounted() {
    // 添加键盘事件监听
    document.addEventListener('keydown', this.handleKeydown);
  },
  beforeDestroy() {
    // 移除键盘事件监听
    document.removeEventListener('keydown', this.handleKeydown);
  }
}
</script>

<style scoped>
.image-preview-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* 返回按钮 */
.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.back-button .icon-arrow-left {
  margin-right: 5px;
}

/* 主预览区域 */
.main-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 100px); /* 减去缩略图区域高度 */
  position: relative;
}

/* 箭头样式 */
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  transition: all 0.3s ease;
}

.arrow:hover {
  background-color: rgba(0, 0, 0, 0.8);
  transform: translateY(-50%) scale(1.1);
}

.left-arrow {
  left: 20px;
}

.right-arrow {
  right: 20px;
}

.icon-angle-left,
.icon-angle-right {
  font-size: 20px;
}

/* 图片容器 */
.image-container {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
  transition: opacity 0.3s ease;
}

/* 水印 */
.watermark {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  font-size: 12px;
}

/* 缩略图区域 */
.thumbnail-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 10px;
}

.thumbnail-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  height: 100%;
  align-items: center;
  padding-bottom: 5px;
}

/* 自定义滚动条 */
.thumbnail-scroll::-webkit-scrollbar {
  height: 6px;
}

.thumbnail-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.thumbnail-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 3px;
}

.thumbnail-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.7);
}

.thumbnail-item {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  border-radius: 4px;
  overflow: hidden;
}

.thumbnail-item:hover {
  border-color: rgba(255, 255, 255, 0.6);
}

.thumbnail-item.active {
  border-color: #1890ff; /* 蓝色边框表示当前选中 */
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.3);
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-preview {
    height: calc(100% - 80px);
  }
  
  .thumbnail-container {
    height: 80px;
  }
  
  .thumbnail-item {
    width: 60px;
    height: 60px;
  }
  
  .arrow {
    width: 30px;
    height: 30px;
  }
  
  .icon-angle-left,
  .icon-angle-right {
    font-size: 16px;
  }
}
</style>