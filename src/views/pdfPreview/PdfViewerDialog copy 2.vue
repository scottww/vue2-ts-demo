<template>
  <div>
    <a href="javascript:void(0);" @click="dialogVisible = true">
      {{ fileName }}
    </a>

    <el-dialog
      title="PDF 预览"
      :visible.sync="dialogVisible"
      :fullscreen="isFullScreen"
      top="5vh"
      width="90%"
      :destroy-on-close="true"
      @opened="renderAllPages"
    >
      <!-- 工具栏 -->
      <div style="margin-bottom: 10px">
        <el-button size="mini" @click="zoomOut">缩小</el-button>
        <el-button size="mini" @click="zoomIn">放大</el-button>
        <el-button size="mini" @click="toggleFullScreen">
          {{ isFullScreen ? "退出全屏" : "全屏" }}
        </el-button>
        <el-button size="mini" type="primary" @click="downloadPdf"
          >下载</el-button
        >
        <span style="margin-left: 10px"
          >缩放: {{ currentScale.toFixed(1) }}x</span
        >
      </div>

      <!-- 渲染容器 -->
      <div ref="pdfContainer" class="pdf-scroll-container">
        <div
          v-for="(pageNum, idx) in totalPages"
          :key="idx"
          class="pdf-page-container fade-in"
        >
          <canvas :ref="'canvas_' + pageNum" class="pdf-canvas"></canvas>
          <div class="pdf-page-footer">
            第 {{ pageNum }} 页 / 共 {{ totalPages }} 页
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as pdfjsLib from "pdfjs-dist/build/pdf";
pdfjsLib.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.entry.js");

export default {
  name: "WpsStylePdfViewer",
  props: {
    pdfUrl: {
      type: String,
      required: true
    },
    scale: {
      type: Number,
      default: 1.5
    }
  },
  data() {
    return {
      dialogVisible: false,
      pdfDoc: null,
      totalPages: 0,
      currentScale: this.scale,
      isFullScreen: false
    };
  },
  computed: {
    fileName() {
      const parts = this.pdfUrl.split("/");
      return decodeURIComponent(parts[parts.length - 1]);
    }
  },
  methods: {
    async renderAllPages() {
      const loadingTask = pdfjsLib.getDocument(this.pdfUrl);
      this.pdfDoc = await loadingTask.promise;
      this.totalPages = this.pdfDoc.numPages;

      for (let pageNum = 1; pageNum <= this.totalPages; pageNum++) {
        const page = await this.pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: this.currentScale });
        const canvas = this.$refs["canvas_" + pageNum][0];
        const ctx = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };

        await page.render(renderContext).promise;
      }
    },
    zoomIn() {
      this.currentScale += 0.2;
      this.renderAllPages();
    },
    zoomOut() {
      if (this.currentScale > 0.4) {
        this.currentScale -= 0.2;
        this.renderAllPages();
      }
    },
    toggleFullScreen() {
      this.isFullScreen = !this.isFullScreen;
    },
    downloadPdf() {
      const link = document.createElement("a");
      link.href = this.pdfUrl;
      link.download = this.fileName;
      link.click();
    }
  }
};
</script>
<style scoped>
.pdf-scroll-container {
  height: 70vh;
  overflow-y: auto;
  background: #eaeaea;
  padding: 20px;

  /* 美化滚动条 */
  scrollbar-width: thin;
  scrollbar-color: #aaa #f1f1f1;
}

.pdf-scroll-container::-webkit-scrollbar {
  width: 8px;
}
.pdf-scroll-container::-webkit-scrollbar-thumb {
  background-color: #aaa;
  border-radius: 4px;
}
.pdf-scroll-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.pdf-page-container {
  background: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  margin: 20px auto;
  padding: 10px;
  width: fit-content;
  position: relative;
  text-align: center;
  border-radius: 4px;
  animation: fadeIn 0.5s ease;
}

.pdf-canvas {
  display: block;
  margin: 0 auto;
}

.pdf-page-footer {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}

/* 动画样式 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
