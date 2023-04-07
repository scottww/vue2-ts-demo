<template>
  <div class="load-read-file-container">
    <button @click="loadFile">加载文件</button>
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
      fileContent: "",
      jsonData: { foo: "bar", baz: [1, 2, 3] }
    };
  },
  mounted() {},
  methods: {
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
</style>
