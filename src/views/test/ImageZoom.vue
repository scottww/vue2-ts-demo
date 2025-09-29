<template>
  <div class="image-container">
    <!-- 控制按钮 -->
    <div class="toolbar">
      <!-- <button @click="zoomIn">放大</button>
      <button @click="zoomOut">缩小</button>
      <button @click="reset">重置</button> -->
      <FontButton @click="zoomIn" color="#1F77B4"> 放大</FontButton>
      <FontButton @click="zoomOut" color="#1F77B4"> 缩小</FontButton>
      <FontButton @click="reset" color="#1F77B4"> 重置</FontButton>
    </div>

    <!-- 图片容器 -->
    <div class="image-wrapper">
      <img
        :src="imageUrl"
        alt="demo"
        class="zoom-image"
        :style="{ transform: 'scale(' + scale + ')' }"
      />
    </div>
  </div>
</template>

<script>
import FontButton from "./FontButton.vue";
export default {
  name: "ImageZoom",
  components: { FontButton },
  data() {
    return {
      imageUrl: "https://picsum.photos/600/400", // 示例图片
      scale: 1, // 缩放比例
      step: 0.1 // 每次缩放的步长
    };
  },
  methods: {
    zoomIn() {
      this.scale += this.step;
    },
    zoomOut() {
      if (this.scale > this.step) {
        this.scale -= this.step;
      }
    },
    reset() {
      this.scale = 1;
    }
  }
};
</script>

<style scoped>
.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
}

.toolbar {
  display: flex;
  margin-bottom: 10px;
}

.image-wrapper {
  width: 80%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* 防止放大后溢出 */
  border: 1px solid #ccc;
  background: #f8f8f8;
}

.zoom-image {
  max-width: 100%;
  max-height: 100%;
  transition: transform 0.2s ease-in-out;
}
</style>
