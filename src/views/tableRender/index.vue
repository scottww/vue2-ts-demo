<template>
  <div class="table-render-view-container">
    <div>
      <TableRender />
    </div>
  </div>
</template>

<script>
import { TableRender } from "./table-render.js";
import { ReadFile } from "@/utils/readFile.js";
export default {
  name: "TableRenderView",
  components: { TableRender },
  data() {
    return {
      result: null
    };
  },
  computed: {
    // tabs({ result }) {
    //   if (!result) return [];
    //   const { summary } = result;
    //   let tabs = [];
    //   let tableDatas = [];
    //   summary.forEach((su) => {
    //     const section = result[su];
    //     const formatSection = section.map((i) => {
    //       return { ...i, key: `${su}-${i.key}` };
    //     });
    //     tableDatas = [...tableDatas, ...formatSection];
    //     tabs = [
    //       ...tabs,
    //       ...section.map((sec) => ({
    //         key: `${su}-${sec.key}`,
    //         label: sec.label
    //       }))
    //     ];
    //   });
    //   if (tabs.length) {
    //     this.outputMenutabsActiveItem = tabs[0];
    //     this.outputTables = Object.freeze(tableDatas);
    //   }
    //   return tabs;
    // }
  },
  mounted() {
    // this.loadFile();
  },
  methods: {
    loadFile() {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "text/plain";

      fileInput.onchange = (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
          this.fileContent = reader.result;
        };

        reader.readAsText(file);
      };

      fileInput.click();
    }
  }
};
</script>

<style scoped></style>
