<template>
  <div>
    <h3>图层控制</h3>
    <div style="margin-bottom: 8px;">
      <a-switch v-model="baseVisible" @change="toggle('base')" /> 底图
    </div>

    <div style="margin-bottom: 8px;">
      <a-switch v-model="pointsVisible" @change="toggle('points')" /> 点图层
    </div>

    <div style="margin-top: 12px;">
      <a-button type="primary" size="small" @click="clearPoints">清空点</a-button>
    </div>
  </div>
</template>

<script>
import MapApp from "@/utils/map3/map";

export default {
  data() {
    return {
      baseVisible: true,
      pointsVisible: true
    };
  },
  methods: {
    toggle(key) {
      MapApp.layers.toggleVisible(key);
    },
    clearPoints() {
      MapApp.features.clear("points");
    }
  }
};
</script>
