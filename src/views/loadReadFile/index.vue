<template>
  <div class="load-read-file-container">
    <!-- <button @click="loadTemplate">加载模版</button> -->
    <button @click="loadFile">加载文件</button>
    <span class="tips">加载一个txt文本</span>
    <!-- <div>
      {{ fileContent }}
    </div> -->
    <!-- <pre v-html="fileContent"></pre> -->
    <div>
      <VueJsonPretty :data="fileContent"></VueJsonPretty>
    </div>
  </div>
</template>

<script>
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
export default {
  name: "ReadFileContainer",
  components: {
    VueJsonPretty
  },
  data() {
    return {
      fileContent: "json string ...",
      jsonData: { foo: "bar", baz: [1, 2, 3] }
    };
  },
  mounted() {},
  methods: {
    loadTemplate(filePath) {
      console.log("loadTemplate ...");
      //读取本地json_tpl.txt
    },
    strToJson(str) {
      const json = eval("(" + str + ")");
      return json;
    },
    loadFile() {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "text/plain";

      fileInput.onchange = (event) => {
        const file = event.target.files[0];

        

        const reader = new FileReader();
        console.log('reader', reader);
        reader.onload = () => {
          this.fileContent = { ...this.strToJson(reader.result) };
          console.log(this.fileContent);
        };

        reader.readAsText(file);
      };

      fileInput.click();
    }
  }
};
</script>

<style scoped>
.load-read-file-container {
  text-align: left;
}

.tips {
  display: inline-block;
  color: #666;
  margin-left: 10px;
}
</style>
