<template>
  <div>
    <div class="controls">
      <input v-model="wmsUrl" placeholder="输入 GeoServer WMS 地址" />
      <input v-model="layerName" placeholder="输入图层名称 (如 beilun:丁家山)" />
      <button @click="loadWmsDynamic">加载图层</button>
    </div>
    <div class="map-container" ref="mapContainer"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import proj4 from "proj4";

import { createMapService } from "@/utils/map";
import { createTileLayerManager } from "@/utils/map/tileLayerManager";

const pointMarkerIcon = require("@/assets/mapIcon/marker.png");

const mapConfig = {
  type: "2D",
  center: [120.153576, 30.287459],
  zoom: 11
};

export default {
  name: "GeoServerMap",
  data() {
    return {
      mapService: null,
      map: null,
      tileLayerManager: null,
      markerLayer: null,
      wmsLayer: null,
      // 动态输入
      wmsUrl: "http://localhost:8888/geoserver/wms",
      layerName: "beilun:丁家山"
    };
  },
  mounted() {
    this.initBaseMap();
  },
  methods: {
    initBaseMap() {
      const mapService = createMapService(mapConfig.type, this.$refs.mapContainer, {
        zoom: mapConfig.zoom,
        center: mapConfig.center
      });

      mapService.addMarkerByLngLat(mapConfig.center, pointMarkerIcon);

      this.mapService = mapService;
      this.map = mapService.getMapInstance();

      this.tileLayerManager = createTileLayerManager(this.map);
      this.tileLayerManager.switchTo("TDT_vec");

      this.markerLayer = new VectorLayer({
        source: new VectorSource(),
        zIndex: 10
      });
      this.map.addLayer(this.markerLayer);
    },

    loadWmsDynamic() {
      if (!this.wmsUrl || !this.layerName) {
        alert("请输入 WMS 地址和图层名称");
        return;
      }

      // 移除之前的图层
      if (this.wmsLayer) this.map.removeLayer(this.wmsLayer);

      const wmsLayer = new TileLayer({
        source: new TileWMS({
          url: this.wmsUrl,
          params: {
            LAYERS: this.layerName,
            TILED: true,
            VERSION: "1.1.0",
            SRS: "EPSG:4326"
          },
          serverType: "geoserver",
          crossOrigin: "anonymous"
        }),
        zIndex: 5
      });

      this.map.addLayer(wmsLayer);
      this.wmsLayer = wmsLayer;

      // 获取图层范围并缩放
      fetch(`${this.wmsUrl}?service=WMS&version=1.1.0&request=GetCapabilities`)
        .then(r => r.text())
        .then(text => {
          const parser = new DOMParser();
          const xml = parser.parseFromString(text, "application/xml");

          const layers = xml.getElementsByTagName("Layer");
          let targetLayer = null;

          for (let i = 0; i < layers.length; i++) {
            const nameNode = layers[i].getElementsByTagName("Name")[0];
            if (nameNode && nameNode.textContent === this.layerName) {
              targetLayer = layers[i];
              break;
            }
          }

          if (!targetLayer) {
            console.warn("没有找到指定 Layer:", this.layerName);
            return;
          }

          const bboxNode = targetLayer.getElementsByTagName("BoundingBox")[0];
          if (!bboxNode) return;

          const minx = parseFloat(bboxNode.getAttribute("minx"));
          const miny = parseFloat(bboxNode.getAttribute("miny"));
          const maxx = parseFloat(bboxNode.getAttribute("maxx"));
          const maxy = parseFloat(bboxNode.getAttribute("maxy"));

          const extent4326 = this.transformBbox([minx, miny, maxx, maxy]);
          // 添加角点标记
          this.mapService.addMarkerByLngLat([extent4326[0], extent4326[1]], pointMarkerIcon);
          this.mapService.addMarkerByLngLat([extent4326[2], extent4326[1]], pointMarkerIcon);
          this.mapService.addMarkerByLngLat([extent4326[0], extent4326[3]], pointMarkerIcon);
          this.mapService.addMarkerByLngLat([extent4326[2], extent4326[3]], pointMarkerIcon);

          // 缩放到图层范围
          this.map.getView().fit(extent4326, { padding: [40, 40, 40, 40], duration: 900 });
        })
        .catch(err => console.error("解析 capabilities 报错：", err));
    },

    transformBbox(bbox) {
      proj4.defs(
        "EPSG:4549",
        "+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=500000 +y_0=0 +ellps=CGCS2000 +units=m +no_defs"
      );
      const [minX, minY, maxX, maxY] = bbox;
      const [minLon, minLat] = proj4("EPSG:4549", "EPSG:4326", [minX, minY]);
      const [maxLon, maxLat] = proj4("EPSG:4549", "EPSG:4326", [maxX, maxY]);
      return [minLon, minLat, maxLon, maxLat];
    }
  }
};
</script>

<style>
.map-container {
  width: 100%;
  height: 80vh;
}
.controls {
  margin-bottom: 10px;
}
.controls input {
  width: 300px;
  margin-right: 5px;
  padding: 4px 6px;
}
.controls button {
  padding: 4px 12px;
}
</style>
