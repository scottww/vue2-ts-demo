<template>
  <div>
    <a href="javascript:void(0);" @click="dialogVisible = true">{{
      fileName
    }}</a>

    <el-dialog
      title="PDF 预览"
      :visible.sync="dialogVisible"
      width="90%"
      top="5vh"
      :destroy-on-close="true"
      @opened="renderAllPages"
    >
      <!-- 工具栏 -->
      <!-- <div style="margin-bottom: 10px">
        <el-button size="mini" @click="zoomOut">缩小</el-button>
        <el-button size="mini" @click="zoomIn">放大</el-button>
        <el-button size="mini" type="primary" @click="downloadPdf"
          >下载</el-button
        >
        <span style="margin-left: 10px"
          >缩放: {{ currentScale.toFixed(1) }}x</span
        >
      </div> -->

      <!-- 渲染容器 -->
      <div
        ref="pdfContainer"
        style="
          height: 70vh;
          overflow-y: auto;
          background: #eaeaea;
          padding: 20px;
        "
      >
        <div
          v-for="(pageNum, idx) in totalPages"
          :key="idx"
          class="pdf-page-container"
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
pdfjsLib.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry.js');
//使用静态cdn
// pdfjsLib.GlobalWorkerOptions.workerSrc = '/cdn/pdf.worker.min.js';

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
      currentScale: this.scale
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
    downloadPdf() {
      const link = document.createElement("a");
      link.href = this.pdfUrl;
      link.download = this.fileName;
      link.click();
    },
    getDisplayFileName(url) {
      // 获取文件名
      const fileName = url.split("/").pop();

      if (!fileName) return "";
      const index = fileName.indexOf("简报");

      if (index !== -1) {
        return fileName.slice(0, index + 2) + ".pdf";
      } else {
        return fileName;
      }
    }
  }
};
</script>

<style scoped>
.pdf-page-container {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  margin: 20px auto;
  padding: 10px;
  width: fit-content;
  position: relative;
  text-align: center;
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
</style>
