<template>
  <div>
    <canvas ref="pdfCanvas" style="border:1px solid #000;"></canvas>
  </div>
</template>

<script>
import * as pdfjsLib from "pdfjs-dist/build/pdf";

// worker 脚本路径
// pdfjsLib.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry.js');

// import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs';
// window.pdfjsWorker = pdfjsWorker; // 在 vite4.x 及以上版本需要显示指定

pdfjsLib.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry.js');
//使用静态cdn
// pdfjsLib.GlobalWorkerOptions.workerSrc = '/cdn/pdf.worker.min.js';


export default {
  name: "PdfViewer",
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
  mounted() {
    this.renderPdf();
  },
  watch: {
    pdfUrl(newVal) {
      this.renderPdf();
    }
  },
  methods: {
    renderPdf() {
      const canvas = this.$refs.pdfCanvas;
      const ctx = canvas.getContext("2d");

      pdfjsLib
        .getDocument(this.pdfUrl)
        .promise.then(pdf => {
          // 只渲染第一页
          pdf.getPage(1).then(page => {
            const viewport = page.getViewport({ scale: this.scale });
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const renderContext = {
              canvasContext: ctx,
              viewport: viewport
            };
            page.render(renderContext);
          });
        })
        .catch(err => {
          console.error("PDF 加载失败:", err);
        });
    }
  }
};
</script>
