<template>
  <div>
    <a-switch v-model="checked" @change="toggle"></a-switch> 显示底图
  </div>
</template>

<script>
import MapApp from "@/utils/map3/map";

export default {
  data() {
    return { checked: true };
  },
  methods: {
    toggle() {
      MapApp.layers.toggleLayer("base");
    }
  }
};
</script>
