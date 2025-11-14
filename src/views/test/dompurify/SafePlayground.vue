<template>
  <div>
    <h3>在线 XSS 安全测试面板</h3>

    <textarea v-model="input" rows="5"></textarea>

    <h4>原始渲染（不安全）</h4>
    <div v-html="input"></div>

    <h4>安全渲染（v-safe-html）</h4>
    <div v-safe-html="input"></div>

    <h4>作为 URL 属性</h4>
    <a v-safe-attr="input">打开 URL</a>
  </div>
</template>

<script>
export default {
  data() {
    return { input: "" };
  }
};
</script>
