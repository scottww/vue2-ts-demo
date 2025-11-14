<template>
  <div class="SafeHtml__container">
    转换前
    <p>{{ value }}</p>
    渲染效果
    <div v-html="cleanHtml"></div>
    转换后
    <p>{{ cleanHtml }}</p>
  </div>
</template>

<script>
import DOMPurify from "dompurify";

// DOMPurify 白名单配置
DOMPurify.setConfig({
  ALLOWED_TAGS: ["b", "i", "u", "strong", "a", "p", "br", "ul", "li"],
  ALLOWED_ATTR: ["href", "title", "target"],
  FORBID_TAGS: ["script", "iframe", "object", "embed"],
  FORBID_ATTR: ["style", "onerror", "onclick"],
});

export default {
  name: "SafeHtml",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  computed: {
    cleanHtml() {
      return DOMPurify.sanitize(this.value);
    }
  }
};
</script>
