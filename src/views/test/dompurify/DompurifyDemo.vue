<template>
  <div>
    <h3>---- 原始 HTML（不安全）----</h3>
    <pre>{{ rawHtml }}</pre>

    <h3>---- 安全 HTML（v-safe-html 处理后）----</h3>
    <div v-safe-html="rawHtml"></div>

    <h3>---- 安全 HTML（安全组件处理后）----</h3>
    <SafeHtml :value="rawHtml" />
    <h3>---- XSS 测试 Payload ----</h3>
    <button @click="injectPayload(1)">SCRIPT 注入</button>
    <button @click="injectPayload(2)">IMG onerror</button>
    <button @click="injectPayload(3)">HREF javascript:</button>
    <button @click="injectPayload(4)">SVG XSS</button>

    <pre>{{ rawInput }}</pre>
    <a v-safe-attr="attackerInput"></a>
    <iframe v-safe-attr:src="attackerInput"></iframe>
    <link v-safe-attr:href="attackerInput" />
    <video v-safe-attr:poster="attackerInput"></video>
    <div v-safe-html="attackerInput"></div>
    <a v-safe-attr:href="attackerInput" @click="cleanHtml(attackerInput)"
      >测试链接1</a
    >|
    <a v-safe-attr="attackerInput" @click="cleanHtml(attackerInput)"
      >测试链接2</a
    >
  </div>
</template>

<script>
import DOMPurify from "dompurify";
import SafeHtml from "./SafeHtml.vue";
import { rawHtml } from "./htmlTestData.js";
import { xss_payloads } from "./xss-payloads.js";
export default {
  components: { SafeHtml },
  data() {
    return {
      rawHtml,
      rawInput: "",
      attackerInput: "",
      payloads: xss_payloads
    };
  },
  methods: {
    injectPayload(type) {
      this.rawInput = this.payloads[type];
      // this.attackerInput = this.payloads[type];
      this.attackerInput = this.cleanHtml(this.payloads[type]);
    },
    cleanHtml(value) {
      console.log("cleanHtml 处理前...", value);
      const result = DOMPurify.sanitize(value);
      // 如果是href属性，则只允许http和https协议
      // const result = DOMPurify.sanitize(value, {
      //   ALLOWED_URI_REGEXP: /^https?:\/\//i
      // });
      console.log("cleanHtml 处理后...", result);
      return result;
    }
  }
};
</script>   