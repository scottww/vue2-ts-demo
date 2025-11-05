<template>
  <div class="home-container">
    <div class="map-container" ref="mapRef"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import * as olProj from "ol/proj";

export default {
  name: "HomeMap",
  data() {
    return {
      map: null,
      tk: "a76b9ea6e49fb0eecdb1ed34d1e75930", // 天地图密钥
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // 天地图矢量底图
      const vecLayer = new TileLayer({
        source: new XYZ({
          url: `https://t{0-7}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${this.tk}`,
          // subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
        }),
      });

      // 天地图标注
      const cvaLayer = new TileLayer({
        source: new XYZ({
          url: `https://t{0-7}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${this.tk}`,
          // subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
        }),
      });

      // 中心点经纬度（杭州）
      const centerLonLat = [120.1, 30.2];
      // const center3857 = olProj.fromLonLat(centerLonLat);

      this.map = new Map({
        target: this.$refs.mapRef,
        layers: [vecLayer, cvaLayer],
        view: new View({
          center: centerLonLat,
          zoom: 11,
          projection: "EPSG:4326"
        }),
      });
    },
  },
};
</script>

<style scoped>
.home-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.map-container {
  flex: 1;
  position: relative;
}
</style>
