<template>
  <div class="image-previewer-wrapper">
    <h2>图片预览</h2>

    <div class="file-input-section">
      <input
        type="file"
        ref="fileInput"
        @change="handleFileChange"
        accept="image/*"
        multiple
        style="display: none;"
      />
      <button @click="triggerFileInput" class="select-button">选择图片</button>
      <span v-if="selectedFilesCount > 0" class="selected-count">
        已选择 {{ selectedFilesCount }} 张图片
      </span>
      <span v-else class="selected-count">
        未选择图片
      </span>
    </div>

    <div v-if="images.length > 0" class="image-grid-container">
      <div v-for="(image, index) in images" :key="image.id" class="image-item">
        <img :src="image.url" :alt="image.name" class="preview-image" />
        <div class="image-details">
          <span class="image-name" :title="image.name">{{ image.name }}</span>
          <button @click="removeImage(index)" class="remove-button" title="删除图片">X</button>
        </div>
      </div>
    </div>
    <div v-else class="empty-state">
      <p>点击 "选择图片" 按钮来添加图片。</p>
      <p>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImagePreviewer', // 组件名称
  data() {
    return {
      images: [], // 存储预览图片的信息 { id, name, url, file }
      nextImageId: 0, // 用于为每张图片生成唯一的 ID，帮助 v-for 优化
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

    // 处理文件选择事件
    handleFileChange(event) {
      const files = event.target.files;
      if (!files.length) {
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // 验证文件类型是否为图片
        if (!file.type.startsWith('image/')) {
          console.warn(`文件 "${file.name}" 不是图片，已跳过。`);
          continue;
        }

        // 创建 FileReader 读取文件内容
        const reader = new FileReader();
        reader.onload = (e) => {
          this.images.push({
            id: this.nextImageId++, // 分配一个唯一ID
            name: file.name,
            url: e.target.result, // Data URL (Base64)
            file: file, // 原始文件对象，如果将来需要上传
          });
        };
        reader.readAsDataURL(file); // 读取文件为 Data URL
      }

      // 清空文件输入框的值，允许用户重新选择相同的文件时也能触发change事件
      event.target.value = '';
    },

    // 从预览列表中删除图片
    removeImage(index) {
      this.images.splice(index, 1);
    },
  },
};
</script>

<style scoped>
/* 组件根容器 */
.image-previewer-wrapper {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  padding: 25px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #fcfcfc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 900px;
  margin: 30px auto; /* 居中显示 */
  text-align: center;
}

h2 {
  color: #2c3e50;
  margin-bottom: 25px;
  font-size: 1.8em;
  font-weight: 600;
}

/* 文件选择区域 */
.file-input-section {
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.select-button {
  background-color: #4CAF50; /* 绿色 */
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.select-button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

.selected-count {
  font-size: 1.1em;
  color: #555;
  padding: 8px 15px;
  background-color: #e8f5e9; /* 淡绿色背景 */
  border-radius: 5px;
}

/* 图片预览网格容器 */
.image-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); /* 响应式网格 */
  gap: 20px;
  padding: 15px;
  border: 1px dashed #cccccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  min-height: 150px; /* 至少保证一定高度 */
  max-height: 500px;
  overflow-y: auto;
}

/* 单个图片项 */
.image-item {
  position: relative;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.image-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.preview-image {
  width: 100%;
  height: 120px; /* 固定预览图高度 */
  object-fit: cover; /* 裁剪图片以填充区域 */
  display: block;
}

.image-details {
  padding: 10px;
  background-color: #f2f2f2;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1; /* 占据剩余空间 */
}

.image-name {
  font-size: 0.9em;
  color: #444;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 文件名过长时显示省略号 */
  flex-grow: 1;
  text-align: left;
  margin-right: 10px;
}

.remove-button {
  background-color: #e74c3c; /* 红色 */
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: bold;
  transition: background-color 0.2s ease;
  flex-shrink: 0; /* 防止按钮被压缩 */
}

.remove-button:hover {
  background-color: #c0392b;
  transform: scale(1.05);
}

/* 空状态提示 */
.empty-state {
  margin-top: 30px;
  padding: 30px;
  border: 2px dashed #b0c4de; /* 蓝色虚线 */
  border-radius: 10px;
  color: #778899;
  background-color: #f0f8ff; /* 淡蓝色背景 */
}

.empty-state p {
  margin-bottom: 10px;
  font-size: 1.1em;
}
</style>