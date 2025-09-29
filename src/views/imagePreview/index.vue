<template>
  <div class="image-preview-container">
    <button @click="showImagePreview = true">打开图片预览</button>

    <ImagePreview
      :show-preview="showImagePreview"
      :images="imageList"
      :initial-index="0"
      watermark-text="scottww"
      @back="showImagePreview = false"
    />
  </div>
</template>

<script>
import ImagePreview from "./ImagePreview.vue";

export default {
  components: { ImagePreview },
  data() {
    return {
      showImagePreview: false,
      imageList: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
        // 添加更多图片URL
      ]
    };
  }
};
</script>
<style scoped>
.image-preview-container {
  width: 100%;
  height: 100%;
}
</style>