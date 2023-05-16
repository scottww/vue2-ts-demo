<template>
  <div class="categorys-demo">
    <h-categorys :data="SUB_MENU_LIST" />
  </div>
</template>

<script>
import { HCategorys } from "@/components/h-ui";
import { SUB_MENU_LIST } from "./data";
export default {
  name: "CategorysDemo",
  components: {
    HCategorys
  },
  data() {
    return {
      SUB_MENU_LIST
    };
  }
};
</script>

<style scoped></style>
