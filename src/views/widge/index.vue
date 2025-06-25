<template>
  <div class="h-widge-demo">
    <h-widge title="常用网站" :data="dataList"></h-widge>
    <h-widge title="AI" :data="aiList"></h-widge>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import HWidge from "@/components/h-ui/widge";

@Component({
  name: "HWidgeDemo",
  components: { HWidge }
})
export default class HWidgeDemo extends Vue {
  message = "This is an example for HWidgeDemo.";

  dataList = [
    {
      label: "Vue Class Component",
      url: "https://kian-404.github.io/vue-class-component-zh/"
    },
    {
      label: "在线工具 Fx",
      url: "https://tool.fiaox.com/timestamp/"
    },
    {
      label: "joshwcomeau",
      url: "https://www.joshwcomeau.com/"
    },
    {
      url: "https://cssgrid-generator.netlify.app/",
      label: "cssgrid-generator"
    }
  ];

  aiList = [
    {
      label: "AI 工具集官网",
      url: "https://ai-bot.cn/"
    },
    {
      label: "豆包",
      url: "https://www.doubao.com/chat/"
    },
    {
      label: "Kimi",
      url: "https://kimi.moonshot.cn/"
    },
    {
      label: "DeepSeek",
      url: "https://www.deepseek.com/"
    },
    {
      label: "纳米",
      url: "https://bot.n.cn/"
    },
    {
      label: "智谱清言",
      url: "https://chatglm.cn/"
    },
    {
      label: "Trae",
      url: "https://www.trae.ai/"
    }
  ];

  // mounted() {
  //   window.scrollTo(0, 0);
  // }
}
</script>

<style scoped></style>
