<template>
  <div class="advanced-image-previewer-wrapper">
    <h2 class="previewer-title">增强型图片预览工具</h2>

    <div
      class="drop-area"
      :class="{ 'is-dragover': isDragOver }"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input
        type="file"
        ref="fileInput"
        @change="handleFileChange"
        accept="image/*"
        multiple
        style="display: none;"
      />
      <p v-if="!isDragOver">拖拽图片到此处，或点击选择文件</p>
      <p v-else class="drag-text">释放文件进行上传...</p>
      <p class="select-hint">已选择 **{{ selectedFilesCount }}** 张图片</p>
    </div>

    <div v-if="images.length > 0" class="image-grid-container">
      <div v-for="(image, index) in images" :key="image.id" class="image-item">
        <div class="image-thumbnail-wrapper">
          <img v-if="image.url" :src="image.url" :alt="image.name" class="preview-image" />
          <div v-else class="loading-placeholder">
            <div class="spinner"></div>
            <span>加载中...</span>
          </div>
          <button @click="removeImage(index)" class="remove-button" title="删除图片">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="image-info-panel">
          <span class="image-name" :title="image.name">{{ image.name }}</span>
          <div class="image-details-row">
            <span class="image-size">{{ formatBytes(image.size) }}</span>
            <span v-if="image.dimensions" class="image-dimensions">{{ image.dimensions }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty-state">
      <p>还没有图片哦！请拖拽文件或点击上方区域选择。</p>
      <p>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImagePreviewer',
  data() {
    return {
      images: [], // 存储预览图片的信息 { id, name, url, file, size, dimensions }
      nextImageId: 0, // 用于为每张图片生成唯一的 ID
      isDragOver: false, // 拖拽区域是否被文件悬停
    };
  },
  computed: {
    selectedFilesCount() {
      return this.images.length;
    }
  },
  methods: {
    // 触发隐藏的文件输入框点击事件
    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    // 处理文件选择事件 (通过点击或拖放)
    handleFileChange(event) {
      // 通过点击选择文件
      let files = event.target ? event.target.files : event; // event可以是Filelist或者DataTransfer.files

      if (!files || files.length === 0) {
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!file.type.startsWith('image/')) {
          console.error(`文件 "${file.name}" 不是图片，已跳过。`);
          alert(`文件 "${file.name}" 不是图片，请选择图片文件。`);
          continue;
        }

        const newImage = {
          id: this.nextImageId++,
          name: file.name,
          url: null, // 先设为null，等待FileReader读取
          file: file,
          size: file.size,
          dimensions: null,
          isProcessing: true, // 标记为正在处理
        };
        this.images.push(newImage);

        const reader = new FileReader();
        reader.onload = (e) => {
          newImage.url = e.target.result;

          // 获取图片尺寸
          const img = new Image();
          img.onload = () => {
            newImage.dimensions = `${img.width}x${img.height}`;
            newImage.isProcessing = false; // 完成处理
          };
          img.onerror = () => {
             console.error(`无法获取图片尺寸: ${file.name}`);
             newImage.isProcessing = false;
          };
          img.src = newImage.url;
        };
        reader.onerror = () => {
          console.error(`读取文件失败: ${file.name}`);
          alert(`读取文件 "${file.name}" 失败，请重试。`);
          // 移除失败的图片
          const index = this.images.findIndex(img => img.id === newImage.id);
          if (index !== -1) {
            this.images.splice(index, 1);
          }
        };
        reader.readAsDataURL(file);
      }

      // 清空文件输入框的值，允许用户重新选择相同的文件时也能触发change事件
      if (event.target) {
        event.target.value = '';
      }
    },

    // 拖拽相关方法
    handleDragOver(e) {
      e.stopPropagation();
      this.isDragOver = true;
    },
    handleDragLeave(e) {
      e.stopPropagation();
      this.isDragOver = false;
    },
    handleDrop(e) {
      e.stopPropagation();
      this.isDragOver = false;
      const files = e.dataTransfer.files;
      this.handleFileChange(files); // 调用文件处理方法
    },

    // 从预览列表中删除图片
    removeImage(index) {
      // 可以在这里添加一个简单的确认框
      // if (confirm('确定删除这张图片吗？')) {
      //   this.images.splice(index, 1);
      // }
      this.images.splice(index, 1);
    },

    // 格式化文件大小
    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },
  },
};
</script>

<style scoped>
/* 整个组件的容器 */
.advanced-image-previewer-wrapper {
  font-family: 'Segoe UI', Arial, sans-serif;
  color: #333;
  padding: 30px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  max-width: 960px;
  margin: 40px auto;
  text-align: center;
  transition: all 0.3s ease;
}

.previewer-title {
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2.2em;
  font-weight: 700;
  letter-spacing: -0.5px;
}

/* 拖拽区域 */
.drop-area {
  border: 3px dashed #a0c4ff; /* 蓝色虚线 */
  border-radius: 10px;
  padding: 40px 20px;
  margin-bottom: 30px;
  background-color: #eaf3ff; /* 淡蓝色背景 */
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.drop-area:hover {
  border-color: #6a9aff; /* 深蓝色虚线 */
  background-color: #dbeaff; /* 稍深蓝色背景 */
}

.drop-area.is-dragover {
  border-color: #007bff; /* 拖拽时更鲜艳的蓝色 */
  background-color: #cce0ff;
  transform: scale(1.02);
  box-shadow: 0 0 15px rgba(0, 123, 255, 0.3);
}

.drop-area p {
  margin: 0;
  font-size: 1.1em;
  color: #555;
  line-height: 1.6;
}

.drop-area .drag-text {
  font-size: 1.3em;
  font-weight: 600;
  color: #007bff;
}

.drop-area .select-hint {
  font-size: 0.95em;
  color: #666;
  margin-top: 10px;
  padding: 5px 15px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.drop-area .select-hint strong {
    color: #007bff;
}

/* 图片预览网格 */
.image-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); /* 响应式网格 */
  gap: 25px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #f8f8f8;
  min-height: 180px;
  max-height: 600px;
  overflow-y: auto;
  box-shadow: inset 0 1px 5px rgba(0, 0, 0, 0.05);
}

/* 单个图片项 */
.image-item {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background-color: #fff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.image-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.image-thumbnail-wrapper {
  position: relative;
  width: 100%;
  height: 140px; /* 统一高度 */
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 裁剪以填充 */
  display: block;
  transition: transform 0.3s ease;
}

.image-item:hover .preview-image {
  transform: scale(1.05);
}

/* 加载指示器 */
.loading-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #777;
  font-size: 0.9em;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 删除按钮 */
.remove-button {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(231, 76, 60, 0.85); /* 半透明红色 */
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: bold;
  opacity: 0; /* 默认隐藏 */
  transform: scale(0.8);
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.image-item:hover .remove-button {
  opacity: 1; /* 鼠标悬停时显示 */
  transform: scale(1);
}

.remove-button:hover {
  background-color: #c0392b; /* 深红色 */
}

/* 图片信息面板 */
.image-info-panel {
  padding: 12px;
  background-color: #fcfcfc;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex-grow: 1;
  text-align: left;
}

.image-name {
  font-size: 0.95em;
  color: #444;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
}

.image-details-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85em;
  color: #777;
}

.image-size, .image-dimensions {
  background-color: #e8f5e9; /* 淡绿色 */
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 500;
  color: #388e3c;
}

.image-dimensions {
  background-color: #e3f2fd; /* 淡蓝色 */
  color: #1976d2;
}

/* 空状态提示 */
.empty-state {
  margin-top: 30px;
  padding: 40px;
  border: 2px dashed #b0c4de;
  border-radius: 12px;
  color: #778899;
  background-color: #f5fbff;
  font-size: 1.1em;
  line-height: 1.8;
}
</style>