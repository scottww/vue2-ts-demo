<template>
  <div>
    <!-- 可点击文件名 -->
    <a href="javascript:void(0);" @click="dialogVisible = true" title="预览 PDF">
      {{ fileName }}
    </a>

    <!-- PDF 预览弹窗 -->
    <el-dialog
      title="PDF 预览"
      :visible.sync="dialogVisible"
      width="90%"
      @opened="renderPdf"
      :destroy-on-close="true"
    >
      <!-- 工具栏 -->
      <div style="margin-bottom: 10px;">
        <el-button size="mini" @click="prevPage" :disabled="pageNum <= 1">上一页</el-button>
        <el-button size="mini" @click="nextPage" :disabled="pageNum >= totalPages">下一页</el-button>
        <el-button size="mini" @click="zoomOut">缩小</el-button>
        <el-button size="mini" @click="zoomIn">放大</el-button>
        <el-button size="mini" type="primary" @click="downloadPdf">下载</el-button>
        <span style="margin-left: 10px;">第 {{ pageNum }} / {{ totalPages }} 页</span>
      </div>

      <!-- 渲染画布 -->
      <canvas ref="pdfCanvas" style="border: 1px solid #ccc; width: 100%;"></canvas>
    </el-dialog>
  </div>
</template>

<script>
import * as pdfjsLib from "pdfjs-dist/build/pdf";
pdfjsLib.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry.js');
//使用静态cdn
// pdfjsLib.GlobalWorkerOptions.workerSrc = '/cdn/pdf.worker.min.js';

export default {
  name: "PdfViewerDialog",
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
      pageNum: 1,
      totalPages: 0,
      currentScale: this.scale
    };
  },
  computed: {
    fileName() {
      const parts = this.pdfUrl.split('/');
      return decodeURIComponent(parts[parts.length - 1]);
    }
  },
  methods: {
    async renderPdf() {
      const loadingTask = pdfjsLib.getDocument(this.pdfUrl);
      this.pdfDoc = await loadingTask.promise;
      this.totalPages = this.pdfDoc.numPages;
      this.pageNum = 1;
      this.renderPage();
    },
    renderPage() {
      const canvas = this.$refs.pdfCanvas;
      const ctx = canvas.getContext("2d");

      this.pdfDoc.getPage(this.pageNum).then(page => {
        const viewport = page.getViewport({ scale: this.currentScale });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        page.render(renderContext);
      });
    },
    prevPage() {
      if (this.pageNum > 1) {
        this.pageNum--;
        this.renderPage();
      }
    },
    nextPage() {
      if (this.pageNum < this.totalPages) {
        this.pageNum++;
        this.renderPage();
      }
    },
    zoomIn() {
      this.currentScale += 0.2;
      this.renderPage();
    },
    zoomOut() {
      if (this.currentScale > 0.4) {
        this.currentScale -= 0.2;
        this.renderPage();
      }
    },
    downloadPdf() {
      const link = document.createElement('a');
      link.href = this.pdfUrl;
      link.download = this.fileName;
      link.click();
    }
  }
};
</script>
