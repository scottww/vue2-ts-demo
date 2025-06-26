<template>
  <div :class="['txt-reader', isDark ? 'dark' : 'light']">
    <div class="header">
      <h2>📄 TXT 阅读器</h2>
      <label class="theme-toggle">
        <input type="checkbox" v-model="isDark" />
        <span>🌙 黑暗模式</span>
      </label>
    </div>

    <input type="file" @change="handleFileChange" accept=".txt" class="file-input" />

    <div v-if="paragraphs.length" class="tools">
      <input
        type="text"
        v-model="searchKeyword"
        placeholder="🔍 多关键词用空格分隔"
        class="search-input"
      />
      <button @click="scrollToNext" :disabled="!matchIndexes.length">下一个匹配</button>
      <button @click="downloadAsHtml">⬇ HTML</button>
      <button @click="downloadAsPdf">⬇ PDF</button>
    </div>

    <div v-if="highlightedParagraphs.length" class="output" ref="printArea">
      <p
        v-for="(html, index) in highlightedParagraphs"
        :key="index"
        :ref="el => paraRefs[index] = el"
        v-html="html"
        :class="{ active: matchIndexes.includes(index) && index === currentMatchIndex }"
      ></p>
    </div>
  </div>
</template>

<script>
import html2pdf from 'html2pdf.js';

export default {
  name: 'EnhancedTxtReader',
  data() {
    return {
      rawText: '',
      paragraphs: [],
      searchKeyword: '',
      paraRefs: [],
      matchIndexes: [],
      currentMatchIndex: -1,
      isDark: false
    };
  },
  watch: {
    searchKeyword() {
      this.updateMatchIndexes();
    }
  },
  computed: {
    highlightedParagraphs() {
      const keywords = this.searchKeyword
        .trim()
        .split(/\s+/)
        .filter(Boolean);
      return this.paragraphs.map((para) => {
        let html = this.escapeHtml(para);
        keywords.forEach((kw) => {
          const reg = new RegExp(`(${this.escapeRegExp(kw)})`, 'gi');
          html = html.replace(reg, '<span class="highlight">$1</span>');
        });
        return html.replace(/\n/g, '<br/>');
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
        this.$nextTick(() => this.updateMatchIndexes());
      };
      reader.readAsText(file, 'utf-8');
    },
    processText(text) {
      const lines = text.split(/\r?\n/);
      const paragraphs = [];
      let current = '';
      lines.forEach((line) => {
        if (line.trim() === '') {
          if (current.trim()) paragraphs.push(current.trim());
          current = '';
        } else {
          current += line + '\n';
        }
      });
      if (current.trim()) paragraphs.push(current.trim());
      this.paragraphs = paragraphs;
    },
    escapeHtml(text) {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    },
    escapeRegExp(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },
    updateMatchIndexes() {
      this.matchIndexes = [];
      this.currentMatchIndex = -1;
      const keywords = this.searchKeyword.trim().split(/\s+/).filter(Boolean);
      this.paragraphs.forEach((p, idx) => {
        if (keywords.some((kw) => new RegExp(kw, 'i').test(p))) {
          this.matchIndexes.push(idx);
        }
      });
    },
    scrollToNext() {
      if (!this.matchIndexes.length) return;
      this.currentMatchIndex = (this.currentMatchIndex + 1) % this.matchIndexes.length;
      const el = this.paraRefs[this.matchIndexes[this.currentMatchIndex]];
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },
    downloadAsHtml() {
      const html = this.highlightedParagraphs
        .map((p) => `<p>${p}</p>`) 
        .join('\n');
      const blob = new Blob([
        `<html><body style="font-family:Arial;">${html}</body></html>`
      ], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'formatted.html';
      a.click();
      URL.revokeObjectURL(url);
    },
    downloadAsPdf() {
      const element = this.$refs.printArea;
      const opt = {
        margin: 0.5,
        filename: 'formatted.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().from(element).set(opt).save();
    }
  }
};
</script>

<style>
body {
  margin: 0;
  background: #f9f9f9;
  font-family: "Segoe UI", sans-serif;
}
.txt-reader {
  padding: 20px;
  max-width: 960px;
  margin: auto;
  transition: background 0.3s, color 0.3s;
}
.dark {
  background: #1e1e1e;
  color: #eee;
}
.light {
  background: #ffffff;
  color: #333;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.theme-toggle {
  font-size: 14px;
}
.file-input {
  margin-top: 10px;
}
.tools {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 15px 0;
}
.search-input {
  flex: 1;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
button {
  padding: 6px 12px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #999;
  cursor: not-allowed;
}
.output {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-height: 500px;
  overflow-y: auto;
  background: inherit;
}
.output p {
  margin-bottom: 1em;
  line-height: 1.6;
  transition: background 0.2s;
  white-space: pre-wrap;
}
.highlight {
  background-color: yellow;
  color: red;
  font-weight: bold;
}
.active {
  background: #e6f7ff;
}
</style>