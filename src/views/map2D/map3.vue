<template>
  <div class="map-viewer">
    <div ref="mapContainer" class="map-container">
      <div class="map-change-btns">
        <el-button-group>
          <el-button
            :type="currentMaptype === 'vec' ? 'primary' : ''"
            @click="mapChage('vec')"
            >矢量</el-button
          >
          <el-button
            :type="currentMaptype === 'img' ? 'primary' : ''"
            @click="mapChage('img')"
            >影像</el-button
          >
          <el-button
            :type="currentMaptype === 'ter' ? 'primary' : ''"
            @click="mapChage('ter')"
            >地形</el-button
          >
        </el-button-group>
      </div>
    </div>
  </div>
</template>

<script>
import { createMapService } from "@/utils/map";
import { createTileLayerManager } from "@/utils/map/tileLayerManager";
import { PolylineLayerManager } from "@/utils/map/mapUtils/features/PolylineLayerManager";
import { PopupManager } from "@/utils/map/mapUtils/features/PopupManager";
const pointMarker = require("@/assets/mapIcon/marker.png");

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style, Stroke, Fill, Text } from "ol/style";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Draw from "ol/interaction/Draw";
import CircleStyle from "ol/style/Circle";
import Overlay from "ol/Overlay";
import { getLength, getArea, getCenter } from "ol/sphere";
import { LineString, Polygon } from "ol/geom";
import { Select } from "ol/interaction";
import { pointerMove } from "ol/events/condition";
import GeoJSON from "ol/format/GeoJSON";

import { WKT_DATA, points, lines, polygons } from "./data3.js";
export default {
  components: {},
  data() {
    return {
      type: "2D",
      currentMaptype: "img",
      center: [120.153576, 30.287459],
      zoom: 11,
      mapService: null,
      map: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      console.log("init");

      // 1. 验证容器存在
      if (!this.$refs.mapContainer) {
        console.error("地图容器不存在");
        return;
      }

      const mapService = createMapService(this.type, this.$refs.mapContainer, {
        center: this.center,
        zoom: this.zoom
      });

      mapService.addMarkerByLngLat(this.center, pointMarker);

      // 3. 使用注册机制管理图层
      this.mapService = mapService;
      this.map = mapService.getMapInstance();

      // 只控制底图图层，不影响其他业务图层
      this.tileLayerManager = createTileLayerManager(this.map);
      // this.tileLayerManager.switchTo("TDT_vec");
      this.tileLayerManager.switchTo("TDT_vec");

      const popupManager = new PopupManager(this.map);

      const polylineLayerManager = new PolylineLayerManager(
        this.map,
        popupManager
      );
    },
    mapChage(mapType) {
      this.currentMaptype = mapType;
      if (mapType === "vec") {
        this.tileLayerManager.switchTo("TDT_vec"); // type 为 "TDT_vec" 或 "TDT_img" 或 "TDT_ter"
      } else if (mapType === "img") {
        this.tileLayerManager.switchTo("TDT_img");
      } else if (mapType === "ter") {
        this.tileLayerManager.switchTo("TDT_ter");
      }
    },
    handleMapClick(event) {
      console.log("地图点击事件:", event);
      const coordinate = event.coordinate;
      console.log("地图点击经纬度:", coordinate);
    }
  }
};
</script>
<style lang="scss" scoped>
.map-viewer {
  width: 100%;
  height: 600px;
}
.map-container {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  position: relative;
}
.map-change-btns {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.14);
  z-index: 98;
}
</style>
