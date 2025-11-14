<template>
  <div>
    <h3>原始 HTML（不安全）</h3>
    <!-- <div v-html="rawHtml"></div> -->
    <p>{{ rawHtml }}</p>

    <h3>安全 HTML（DOMPurify 处理后）</h3>
    <p>{{ safeHtml }}</p>
    <div v-html="safeHtml"></div>
  </div>
</template>

<script>
import DOMPurify from "dompurify";
import { rawHtml } from "./htmlTestData.js";

export default {
  data() {
    return {
      rawHtml
    };
  },
  mounted: {},
  computed: {
    safeHtml() {
      // DOMPurify 会清理掉 script 和 onerror
      return DOMPurify.sanitize(this.rawHtml);
    }
  }
};
</script>
