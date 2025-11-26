<template>
  <div class="h-widge-demo">
    <h-widge title="常用网站" :data="dataList"></h-widge>
    <h-widge title="AI" :data="aiList"></h-widge>
    <h-widge title="Music" :data="musicList"></h-widge>
    <h-widge title="GIS" :data="gisList"></h-widge>
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
  message = "This is a demo of HWidge.";

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
    },
    {
      url: "https://tinypng.com/",
      label: "图像压缩"
    },
    {
      url: "https://www.toolhelper.cn/",
      label: "锤子在线工具"
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
    },
    {
      label: "Google AI",
      url: "https://aistudio.google.com/"
    },
    {
      label: "ModelScope",
      url: "https://modelscope.cn/studios/"
    }
  ];

  musicList = [
    { label: "Ultimate Guitar", url: "https://www.ultimate-guitar.com/" },
    { label: "Songsterr", url: "https://www.songsterr.com/" },
    { label: "GTP 中文网", url: "http://gtp.cn/" },
    { label: "虫虫吉他", url: "https://www.ccguitar.cn/" },
    { label: "精品吉他谱", url: "https://www.jptab.com/" },
    { label: "吉他派", url: "https://www.jitapai.com//" },
    { label: "有谱么", url: "https://yopu.co/" },
    { label: "Chordify", url: "https://chordify.net/" },
    { label: "Flat 音乐制谱", url: "https://flat.io/" },
    { label: "BandLab 在线编曲", url: "https://www.bandlab.com/" },
    { label: "Guitar Tricks", url: "https://www.guitartricks.com/" },
    { label: "Guitar Pro", url: "https://www.guitar-pro.com/" },
    { label: "Guitar Tuna", url: "https://www.guitartuna.com/" },
    { label: "Power Drum Kit", url: "https://www.powerdrumkit.com/" }
  ];

  gisList = [
    {
      label: "Awesome-Openlayers 汇总库",
      url: "https://github.com/webgeodatavore/awesome-openlayers"
    }
  ];

  // mounted() {
  //   window.scrollTo(0, 0);
  // }
}
</script>

<style scoped>
.h-widge-demo {
  max-height: 100vh; /* 或者具体高度 */
  overflow-y: auto; /* 超出高度出现竖向滚动条 */
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
