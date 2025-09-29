<template>
  <div class="font-preview-page">
    <!-- 输入区 -->
    <div class="controls">
      <a-input
        v-model="text"
        placeholder="输入要展示的文字"
        class="input"
      />
      <a-select v-model="selectedFont" class="select" style="width: 200px">
        <a-select-option
          v-for="font in fonts"
          :key="font"
          :value="font"
        >
          {{ font }}
        </a-select-option>
      </a-select>
      <a-slider
        v-model="fontSize"
        :min="12"
        :max="80"
        style="width: 200px"
      />
    </div>

    <!-- 展示区 -->
    <div class="preview" :style="previewStyle">
      {{ text || '示例文字 AaBb123 中文测试' }}
    </div>
  </div>
</template>

<script>
export default {
  name: "FontPreview",
  data() {
    return {
      text: "",
      fontSize: 36,
      selectedFont: "Arial",
      fonts: [
        "Arial",
        "Times New Roman",
        "Courier New",
        "Georgia",
        "Verdana",
        "Tahoma",
        "Comic Sans MS",
        "Impact",
        "宋体",
        "微软雅黑",
        "仿宋",
        "楷体",
        "黑体",
        'ALMMSHT',
        'SYHT',
        'PMZD',
        'DIN',
      ]
    };
  },
  computed: {
    previewStyle() {
      return {
        fontFamily: this.selectedFont,
        fontSize: this.fontSize + "px",
      };
    }
  }
};
</script>

<style scoped>
.font-preview-page {
  padding: 20px;
}
.controls {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.input {
  margin-right: 10px;
}
.select {
  margin: 0 10px;
}
.preview {
  padding: 20px;
  border: 1px solid #ddd;
  min-height: 100px;
}
</style>
