<template>
  <div class="map-viewer">
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script>
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import { Tile as TileSource } from "ol/source";
import { fromLonLat } from "ol/proj";

import ImageLayer from "ol/layer/Image";
import ImageStatic from "ol/source/ImageStatic";
import { Extent } from "ol/extent";

import { createMapService } from "@/utils/map";

export default {
  name: "CloudMap",
  data() {
    return {
      type: "2D",
      center: [120.153576, 30.287459],
      zoom: 11,
      map: null,
      wmsLayer: null,
      vectorSource: null,
      vectorLayer: null,
      mapTileLayer: null
    };
  },
  mounted() {
    this.initMap();
  },
  beforeDestroy() {},
  methods: {
    initMap() {
      // this.wmsLayer = new TileLayer({
      //   source: new TileWMS({
      //     url: "https://www.nsmc.org.cn/NSMC_WMS/WMSServer",
      //     params: {
      //       LAYERS: "FY4A_AGRI_DISK_1339E_L1C_ASIA_CHANNEL1", // 可见光通道
      //       FORMAT: "image/png",
      //       TRANSPARENT: true
      //     },
      //     crossOrigin: "anonymous"
      //   })
      // });
      console.log("initMap");
      const mapService = createMapService(this.type, this.$refs.mapContainer, {
        zoom: this.zoom
      });

      // 切换中心
      mapService.setCenter(this.center);
      // this.vectorSource = new VectorSource();
      // this.vectorLayer = new VectorLayer({
      //   source: this.vectorSource,
      // });
      this.map = mapService.getMapInsatance();

      // 这张卫星图的地理范围（左下和右上经纬度），如下：
      const extent = [95, -2, 160, 43];
      const url = "/satellite/cloud1.png";
      const satelliteLayer = new ImageLayer({
        source: new ImageStatic({
          // url: "https://example.com/satellite-image.png", // 你的云图URL
          url: url,
          imageExtent: extent,
          projection: "EPSG:4326" // 根据地图设置
        }),
        zIndex: 10
      });

      this.map.addLayer(satelliteLayer);
    }
  }
};
</script>
<style lang="scss" scoped>
.map-viewer {
  width: 100%;
  height: 600px;
}
.controls {
  margin: 10px;
}
.map-container {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
}
</style>
