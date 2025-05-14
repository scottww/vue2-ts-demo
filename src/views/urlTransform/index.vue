<template>
  <div class="container">
    <h2>🔧 URL 编码/解码工具</h2>

    <textarea
      v-model="input"
      placeholder="请输入内容..."
      class="textarea"
    ></textarea>

    <div class="button-group">
      <button class="btn" @click="encode">编码</button>
      <button class="btn" @click="decode">解码</button>
    </div>

    <div class="result-box">
      <label><strong>结果：</strong></label>
      <div class="result" contenteditable @input="onEditResult" ref="resultBox">
        {{ result }}
      </div>
      <button class="copy-btn" @click="copyResult">复制结果</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      result: ''
    };
  },
  methods: {
    encode() {
      try {
        this.result = encodeURIComponent(this.input);
      } catch (e) {
        this.result = '编码失败：' + e.message;
      }
    },
    decode() {
      try {
        this.result = decodeURIComponent(this.input);
      } catch (e) {
        this.result = '解码失败：' + e.message;
      }
    },
    copyResult() {
      const el = this.$refs.resultBox;
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      document.execCommand('copy');
      alert('结果已复制到剪贴板！');
    },
    onEditResult(e) {
      this.result = e.target.innerText;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 600px;
  // margin: 40px auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}

h2 {
  /* text-align: center; */
  color: #333;
}

.textarea {
  width: 100%;
  height: 100px;
  padding: 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: vertical;
  box-sizing: border-box;
  margin-bottom: 15px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #45a049;
}

.result-box {
  background: #f9f9f9;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  position: relative;
}

.result {
  background: #f0f0f0;
  padding: 10px;
  min-height: 60px;
  border-radius: 4px;
  white-space: pre-wrap;
  overflow-x: auto;
  font-family: monospace;
  cursor: text;
  outline: none;
}

.copy-btn {
  margin-top: 10px;
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  background-color: #2196f3;
  color: white;
  cursor: pointer;
}

.copy-btn:hover {
  background-color: #0b7dda;
}
</style>
