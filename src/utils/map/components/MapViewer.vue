<template>
  <div :id="containerId" class="map-container"></div>
</template>

<script>
import { createMapService } from '../index';

export default {
  name: 'MapViewer',
  props: {
    type: {
      type: String,
      default: '2D', // 支持 2D 和 3D
    },
    center: {
      type: Array,
      default: () => [116.391, 39.906, 5000], // 默认
    },
    zoom: {
      type: Number,
      default: 11,
    },
    viewerOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      mapService: null,
      containerId: `map-${Math.random().toString(36).substring(2, 9)}`, // 每个实例唯一的容器 ID
    };
  },
  watch: {
    // 如果地图类型或配置变更，重新初始化地图
    type() {
      this.initializeMap();
    },
    center() {
      if (this.mapService) {
        this.mapService.setCenter(this.center, this.zoom);
      }
    },
  },
  mounted() {
    this.initializeMap();
  },
  beforeDestroy() {
    if (this.mapService) {
      this.mapService.destroy();
    }
  },
  methods: {
    initializeMap() {
      if (this.mapService) {
        this.mapService.destroy(); // 清理旧地图实例
      }

      this.mapService = createMapService(this.type, this.containerId, {
        center: this.center,
        zoom: this.zoom,
        viewerOptions: this.viewerOptions,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
