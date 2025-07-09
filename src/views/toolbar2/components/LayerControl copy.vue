<template>
  <collapse-panel title="图层">
    <el-checkbox-group v-model="checkedLayers">
      <el-checkbox v-for="layer in layerList" :key="layer.value" :label="layer.value">
        <i :class="layer.icon" class="icon" /> {{ layer.label }}
      </el-checkbox>
    </el-checkbox-group>
  </collapse-panel>
</template>

<script>
import CollapsePanel from "./CollapsePanel.vue";

export default {
  name: "LayerControl",
  components: { CollapsePanel },
  data() {
    return {
      checkedLayers: ["water", "rain", "work", "flow", "quality", "safety", "land", "video"],
      layerList: [
        { label: "水情监测", value: "water", icon: "el-icon-water-cup" },
        { label: "雨情监测", value: "rain", icon: "el-icon-cloudy" },
        { label: "工情监测", value: "work", icon: "el-icon-suitcase" },
        { label: "流量监测", value: "flow", icon: "el-icon-tickets" },
        { label: "水质监测", value: "quality", icon: "el-icon-reading" },
        { label: "安全监测", value: "safety", icon: "el-icon-warning-outline" },
        { label: "土地塌陷", value: "land", icon: "el-icon-location" },
        { label: "视频监控", value: "video", icon: "el-icon-video-camera-solid" },
        { label: "干渠", value: "dry", icon: "el-icon-minus" },
        { label: "支渠", value: "branch", icon: "el-icon-minus" },
        { label: "灌片", value: "zone", icon: "el-icon-minus" },
      ],
    };
  },
  watch: {
    checkedLayers(val) {
      this.$emit("update-layers", val);
    },
  },
};
</script>

<style scoped>
.icon {
  margin-right: 4px;
}
</style>
