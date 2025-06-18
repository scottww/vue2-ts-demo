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
      @opened="initPdf"
    >
      <!-- 工具栏 -->
      <div
        style="
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
        "
      >
        <el-button size="mini" @click="zoomOut">缩小</el-button>
        <el-button size="mini" @click="zoomIn">放大</el-button>
        <el-button size="mini" type="primary" @click="downloadPdf"
          >下载</el-button
        >
        <span>当前缩放：{{ currentScale.toFixed(1) }}x</span>

        <el-input-number
          v-model="gotoPage"
          :min="1"
          :max="totalPages"
          size="mini"
          style="margin-left: auto; width: 120px"
          placeholder="跳转页码"
        />
        <el-button size="mini" @click="scrollToPage(gotoPage)">跳转</el-button>
      </div>

      <!-- 目录导航 -->
      <div v-if="outline.length" style="margin-bottom: 10px">
        <span style="font-weight: bold">目录：</span>
        <el-button
          v-for="(item, index) in outline"
          :key="index"
          size="mini"
          type="text"
          @click="scrollToPage(item.pageNumber)"
        >
          {{ item.title }}
        </el-button>
      </div>

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
          v-for="pageNum in totalPages"
          :key="pageNum"
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
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.7.107/build/pdf.worker.min.js";

export default {
  name: "FullPdfViewer",
  props: {
    pdfUrl: {
      type: String,
      required: true
    },
    scale: {
      type: Number,
      default: 1.2
    }
  },
  data() {
    return {
      dialogVisible: false,
      pdfDoc: null,
      totalPages: 0,
      currentScale: this.scale,
      gotoPage: 1,
      outline: []
    };
  },
  computed: {
    fileName() {
      const parts = this.pdfUrl.split("/");
      return decodeURIComponent(parts[parts.length - 1]);
    }
  },
  methods: {
    async initPdf() {
      try {
        const loadingTask = pdfjsLib.getDocument(this.pdfUrl);
        this.pdfDoc = await loadingTask.promise;
        this.totalPages = this.pdfDoc.numPages;
        this.gotoPage = 1;

        await this.renderAllPages();
        await this.loadOutline();
      } catch (err) {
        console.error("PDF 加载失败：", err);
      }
    },
    async renderAllPages() {
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
    async loadOutline() {
      const outline = await this.pdfDoc.getOutline();
      console.log("outline", outline);
      // this.outline = [];
      this.outline = [
        { title: "第1页：前端简介", pageNumber: 1 },
        { title: "第2页：Vue 基础", pageNumber: 2 },
        { title: "第3页：组件通信", pageNumber: 3 }
      ];

      if (outline) {
        for (let item of outline) {
          const dest = await this.pdfDoc.getDestination(item.dest);
          const pageIndex = await this.pdfDoc.getPageIndex(dest[0]);
          this.outline.push({
            title: item.title,
            pageNumber: pageIndex + 1
          });
        }
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
    scrollToPage(pageNum) {
      this.$nextTick(() => {
        const target = this.$refs["canvas_" + pageNum]?.[0];
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
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
