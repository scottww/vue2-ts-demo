<template>
  <div>
    <!-- 显示文件名 -->
    <a href="javascript:void(0)" @click="show = true">{{ fileName }}</a>

    <!-- 预览容器 -->
    <div v-if="show" class="pdf-wrapper">
      <iframe
        :src="pdfViewerUrl"
        width="100%"
        height="600px"
        frameborder="0"
      ></iframe>
      <div style="text-align: right; margin-top: 10px;">
        <button @click="show = false">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PdfLinkViewer",
  props: {
    pdfUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    fileName() {
      try {
        return decodeURIComponent(this.pdfUrl.split("/").pop());
      } catch {
        return "查看 PDF";
      }
    },
    pdfViewerUrl() {
      const encoded = encodeURIComponent(this.pdfUrl);
      return `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encoded}`;
    }
  }
};
</script>

<style scoped>
.pdf-wrapper {
  margin-top: 12px;
  border: 1px solid #ccc;
  padding: 8px;
  background: #f9f9f9;
  border-radius: 6px;
}
</style>
