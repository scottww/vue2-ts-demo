<template>
  <div class="load-read-file-container">
    <div class="select-file">
      <button @click="btnClick">选择文件</button>
      <input
        type="file"
        @change="loadTextFile"
        id="input"
        style="display: none"
      />
    </div>
    <code>
      {{ result }}
    </code>
  </div>
</template>

<script>
import { TableRender } from "./table-render.js";
// const fs = require("fs");
// const path = require("path");
export default {
  name: "ReadFileContainer",
  components: { TableRender },
  data() {
    return {
      result: ""
    };
  },
  mounted() {},
  methods: {
    strToJson(str) {
      const json = eval("(" + str + ")");
      return json;
    },
    btnClick() {
      document.getElementById("input").click();
    },
    loadTextFile(e) {
      const file = e.target.files[0];
      let name = file.name.split(".").splice(-1).toString();
      if (name !== "txt") {
        this.$message.success("文件类型错误,请重新选择文件");
        return;
      }
      const reader = new FileReader();
      if (typeof FileReader === "undefined") {
        alert("您的浏览器不支持FileReader接口");
      }
      reader.onload = (e) =>
        this.$emit("load", this.handleResult(e.target.result));
      reader.readAsText(file, "utf-8");
    },
    handleResult(item) {
      this.result = this.strToJson(item);
      console.log(item);
    }
  }
};
</script>

<style scoped>
.load-read-file-container {
}
</style>
