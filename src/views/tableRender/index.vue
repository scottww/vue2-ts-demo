<template>
  <div class="table-render-view-container">
    <div>
      <TableRender />
    </div>
  </div>
</template>

<script>
import { TableRender } from "./table-render.js";
export default {
  name: "TableRenderView",
  components: { TableRender },
  data() {
    return {};
  }
};
</script>

<style scoped></style>
