<template>
  <div class="txt-reader">
    <h2>📄 TXT 阅读器</h2>
    <input type="file" @change="handleFileChange" accept=".txt" />

    <!-- 搜索和下载功能 -->
    <div v-if="paragraphs.length" class="tools">
      <input type="text" v-model="searchKeyword" placeholder="🔍 搜索关键词" />
      <button @click="downloadAsHtml">⬇ 下载 HTML</button>
      <button @click="downloadAsPdf">⬇ 下载 PDF</button>
    </div>

    <!-- 渲染格式化内容 -->
    <div v-if="highlightedParagraphs.length" class="output" ref="printArea">
      <p
        v-for="(html, index) in highlightedParagraphs"
        :key="index"
        v-html="html"
      ></p>
    </div>
  </div>
</template>

<script>
// 安装依赖：npm install html2pdf.js
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
      return this.paragraphs.map((para) => {
        let html = this.escapeHtml(para);
        if (keyword) {
          const escaped = this.escapeRegExp(keyword);
          const regex = new RegExp(`(${escaped})`, "gi");
          html = html.replace(regex, '<span class="highlight">$1</span>');
        }
        return html;
      });
    }
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (!file || file.type !== "text/plain") {
        alert("请选择 .txt 文件");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.rawText = e.target.result;
        this.processText(this.rawText);
      };
      reader.readAsText(file, "utf-8");
    },
    processText(text) {
      this.paragraphs = text
        .split(/\r?\n\s*\r?\n/)
        .map((p) => p.trim())
        .filter((p) => p.length);
    },
    _highlightText(text) {
      const keyword = this.searchKeyword.trim();
      let html = this.escapeHtml(text);

      if (keyword) {
        const escaped = this.escapeRegExp(keyword);
        const regex = new RegExp(`(${escaped})`, "gi");
        html = html.replace(regex, '<span class="highlight">$1</span>');
      }

      return html;
    },
    escapeHtml(text) {
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\r?\n/g, "<br/>");
    },
    escapeRegExp(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    },
    downloadAsHtml0() {
      const html = this.paragraphs
        .map((p) => `<p>${this._highlightText(p)}</p>`)
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

<style scoped>
.txt-reader {
  padding: 20px;
  font-family: "Segoe UI", sans-serif;
  max-width: 800px;
  margin: auto;
}
input[type="file"] {
  margin-top: 10px;
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
  background-color: #ffd54f;
  color: #000;
  font-weight: bold;
  padding: 0 3px;
  border-radius: 2px;
}
</style>
