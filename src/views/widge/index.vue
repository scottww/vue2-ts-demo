<template>
  <div class="h-widge-demo">
    <h-widge title="常用网站" :data="dataList"></h-widge>
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
      url: "https://kian-404.github.io/vue-class-component-zh/",
      label: "Vue Class Component"
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

  // mounted() {
  //   window.scrollTo(0, 0);
  // }
}
</script>

<style scoped></style>
