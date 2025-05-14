<template>
  <div class="map-viewer">
    <div class="controls new-group">
      <span>经纬度 (格式: 经度,纬度):</span>
      <input v-model="coordinates" placeholder="输入经度,纬度" />
      <button @click="locatePoint">定位至</button>
    </div>
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script>
import { createMapService } from "@/utils/map";
const pointMarker = require("@/assets/mapIcon/marker.png");

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";

export default {
  components: {},
  data() {
    return {
      type: "2D",
      center: [120.153576, 30.287459],
      zoom: 11,
      pointMarker,
      coordinates: "120.153576,30.287459",
      mapService: null,
      map: null,
      markerLayer: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      console.log("init");
      const mapService = createMapService(this.type, this.$refs.mapContainer, {
        zoom: this.zoom
      });

      // 切换中心
      mapService.setCenter(this.center);

      // 注册点击事件
      mapService.on("singleclick", this.handleMapClick);

      // 注册地图加载完成事件
      // mapService.on("load", () => {
      //   console.log("地图加载完成");
      //   mapService.addMarkerByLngLat(this.center, pointMarker);
      // });

      mapService.addMarkerByLngLat(this.center, pointMarker);
      this.mapService = mapService;
      this.map = mapService.getMapInsatance();

      // 初始化图层用于显示图标
      this.markerLayer = new VectorLayer({
        source: new VectorSource()
      });
      this.map.addLayer(this.markerLayer);
    },
    handleMapClick(event) {
      console.log("地图点击事件:", event);
      const coordinate = event.coordinate;
      console.log("地图点击经纬度:", coordinate);
    },
    locatePoint() {
      const coords = this.coordinates.split(",");
      const lon = parseFloat(coords[0]);
      const lat = parseFloat(coords[1]);

      // 确保经纬度有效
      if (isNaN(lon) || isNaN(lat)) {
        alert("无效的经纬度格式");
        return;
      }

      // 清除旧图标，添加新图标
      this.markerLayer.getSource().clear();

      // const coord = fromLonLat([lon, lat]);
      const coord = [lon, lat];

      // 设置视图中心
      this.map.getView().animate({
        center: coord,
        duration: 1000,
        zoom: 15
      });

      // 创建图标 Feature
      const feature = new Feature({
        geometry: new Point(coord)
      });

      // 设置图标样式
      feature.setStyle(
        new Style({
          image: new Icon({
            src: require("@/assets/mapIcon/plus.png"), // 确保你有这个图标
            anchor: [0.5, 1],
            scale: 1
          })
        })
      );

      // 清除旧图标，添加新图标
      this.markerLayer.getSource().clear();
      this.markerLayer.getSource().addFeature(feature);
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

.input-group {
  display: flex;
  max-width: 800px;
  margin: 10px 0;

  input {
    flex: 1;
    padding: 10px 14px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-right: none;
    border-radius: 4px 0 0 4px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #409eff;
    }
  }

  button {
    padding: 10px 20px;
    font-size: 14px;
    background-color: #409eff;
    color: white;
    border: 1px solid #409eff;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #66b1ff;
    }
  }
}

.new-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0;
  width: 500px;

  span {
    font-size: 14px;
    white-space: nowrap;
  }

  input {
    flex: 1;
    min-width: 200px;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #409eff; // Element UI 蓝色
    }
  }

  button {
    padding: 8px 16px;
    background-color: #409eff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.3s;

    &:hover {
      background-color: #66b1ff;
    }

    &:active {
      background-color: #3a8ee6;
    }
  }
}
</style>
