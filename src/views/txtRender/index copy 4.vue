<template>
  <div class="txt-reader">
    <h2>📄 TXT 阅读器</h2>
    <input type="file" @change="handleFileChange" accept=".txt" />

    <div v-if="paragraphs.length" class="tools">
      <input
        type="text"
        v-model="searchKeyword"
        placeholder="🔍 搜索关键词"
      />
      <button @click="downloadAsHtml">⬇ 下载 HTML</button>
      <button @click="downloadAsPdf">⬇ 下载 PDF</button>
    </div>

    <div v-if="paragraphs.length" class="output" ref="printArea">
      <p
        v-for="(html, index) in highlightedParagraphs"
        :key="index"
        v-html="html"
      ></p>
    </div>
  </div>
</template>

<script>
// 用 npm 安装：npm install html2pdf.js
import html2pdf from "html2pdf.js";

export default {
  name: "TxtReader",
  data() {
    return {
      rawText: "",
      paragraphs: [],
      searchKeyword: ""
    };
  },
  computed: {
    highlightedParagraphs() {
      const keyword = this.searchKeyword.trim();
      return this.paragraphs.map((p) => {
        let escaped = this.escapeHtml(p);
        if (keyword) {
          const reg = new RegExp(`(${this.escapeRegExp(keyword)})`, "gi");
          escaped = escaped.replace(
            reg,
            '<span class="highlight">$1</span>'
          );
        }
        return escaped;
      });
    }
  },
  methods: {
    handleFileChange(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.rawText = evt.target.result;
        this.processText(this.rawText);
      };
      reader.readAsText(file, "utf-8");
    },
    processText(text) {
      this.paragraphs = text
        .split(/\r?\n\s*\r?\n/)
        .map((p) => p.trim())
        .filter((p) => p);
    },
    escapeHtml(text) {
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    },
    escapeRegExp(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    },
    downloadAsHtml() {
      const html = this.highlightedParagraphs
        .map((p) => `<p>${p}</p>`)
        .join("\n");
      const blob = new Blob(
        [`<html><body style="font-family:Arial;">${html}</body></html>`],
        { type: "text/html;charset=utf-8" }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "formatted.html";
      a.click();
      URL.revokeObjectURL(url);
    },
    downloadAsPdf() {
      const element = this.$refs.printArea;
      const opt = {
        margin: 0.5,
        filename: "formatted.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
      };
      html2pdf().from(element).set(opt).save();
    }
  }
};
</script>

<style>
/* 改成不加 scoped，让高亮样式能作用到 innerHTML */
.txt-reader {
  padding: 20px;
  font-family: "Segoe UI", sans-serif;
  max-width: 800px;
  margin: auto;
}
.tools {
  display: flex;
  gap: 10px;
  margin: 15px 0;
}
.tools input {
  flex: 1;
  padding: 6px 10px;
}
.tools button {
  padding: 6px 12px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.output {
  padding: 15px;
  background: #fdfdfd;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-height: 500px;
  overflow-y: auto;
}
.output p {
  margin-bottom: 1em;
  line-height: 1.6;
}
.highlight {
  background-color: yellow;
  color: red;
  font-weight: bold;
  padding: 0 2px;
  border-radius: 2px;
}
</style>
