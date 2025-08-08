<template>
  <div class="txt-reader">
    <h2>📄 TXT 文本阅读器</h2>
    <input type="file" @change="handleFileChange" accept=".txt" />

    <div v-if="paragraphs.length" class="output">
      <h3>📑 格式化结果：</h3>
      <div class="text-content">
        <p
          v-for="(para, index) in paragraphs"
          :key="index"
          v-html="highlightKeywords(para)"
        ></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TxtReader',
  data() {
    return {
      rawText: '', // 原始文本
      paragraphs: []
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (!file || file.type !== 'text/plain') {
        alert('请选择一个 .txt 文本文件');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.rawText = e.target.result;
        this.processText(this.rawText);
      };

      reader.readAsText(file, 'utf-8');
    },
    processText(text) {
      // 分段逻辑：按两个以上换行符分段
      this.paragraphs = text
        .split(/\r?\n\s*\r?\n/)
        .map(p => p.trim())
        .filter(p => p.length > 0);
    },
    highlightKeywords(text) {
      const keywords = ['错误', '失败', '成功', '警告'];
      let highlighted = text;
      keywords.forEach(word => {
        const regex = new RegExp(`(${word})`, 'gi');
        highlighted = highlighted.replace(
          regex,
          `<span class="highlight">$1</span>`
        );
      });
      return highlighted.replace(/\r?\n/g, '<br/>');
    }
  }
};
</script>

<style scoped>
.txt-reader {
  padding: 20px;
  font-family: "Segoe UI", Roboto, sans-serif;
}

input[type="file"] {
  margin-top: 10px;
}

.output {
  margin-top: 20px;
  background: #fdfdfd;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-height: 400px;
  overflow-y: auto;
}

.text-content p {
  margin-bottom: 1em;
  line-height: 1.6;
  text-align: justify;
  white-space: pre-wrap;
}

.highlight {
  background-color: #fff3cd;
  color: #856404;
  font-weight: bold;
  padding: 0 4px;
  border-radius: 3px;
}
</style>
