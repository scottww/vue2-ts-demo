<template>
  <div>
    <a @click="openPreview" href="javascript:void(0)">{{ fileName }}</a>

    <!-- 内嵌预览方式 -->
    <div v-if="showPreview" class="pdf-preview">
      <iframe :src="pdfUrl" frameborder="0"></iframe>
      <button @click="closePreview">关闭</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pdfUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showPreview: false
    };
  },
  computed: {
    fileName() {
      try {
        return decodeURIComponent(this.pdfUrl.split('/').pop());
      } catch {
        return '未知文件.pdf';
      }
    }
  },
  methods: {
    openPreview() {
      // 方式一：内嵌 iframe（页面预览）
      this.showPreview = true;

      // 方式二：新窗口预览
      // window.open(this.pdfUrl, '_blank');
    },
    closePreview() {
      this.showPreview = false;
    }
  }
};
</script>

<style scoped>
.pdf-preview {
  margin-top: 10px;
  border: 1px solid #ccc;
  height: 600px;
}
.pdf-preview iframe {
  width: 100%;
  height: 100%;
}
</style>
