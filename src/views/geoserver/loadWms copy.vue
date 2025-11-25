<template>
  <div class="map-container" ref="mapContainer"></div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import proj4 from "proj4";
// import { register, transformExtent } from "ol/proj";
// import { register } from "ol/proj/proj4.js";
// import { transformExtent } from "ol/proj.js";

import { createMapService } from "@/utils/map";
import { createTileLayerManager } from "@/utils/map/tileLayerManager";

const pointMarkerIcon = require("@/assets/mapIcon/marker.png");

const mapConfig = {
  type: "2D",
  currentMaptype: "vec",
  center: [120.153576, 30.287459],
  zoom: 11
};

// 注册 EPSG:4549
// proj4.defs(
//   "EPSG:4549",
//   "+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=500000 +y_0=0 +ellps=CGCS2000 +units=m +no_defs"
// );
// register(proj4);
export default {
  name: "GeoServerMap",

  data() {
    return {
      mapService: null,
      map: null,
      wmsLayer: null
    };
  },
  mounted() {
    this.initBaseMap();
    this.loadWms();
  },
  methods: {
    initBaseMap() {
      console.log("init");
      const mapService = createMapService(
        mapConfig.type,
        this.$refs.mapContainer,
        {
          zoom: mapConfig.zoom,
          center: mapConfig.center
        }
      );

      // 切换中心
      // mapService.setCenter(this.center);

      // 注册点击事件
      mapService.on("singleclick", this.handleMapClick);

      // 注册地图加载完成事件
      // mapService.on("load", () => {
      //   console.log("地图加载完成");
      //   mapService.addMarkerByLngLat(this.center, pointMarker);
      // });

      mapService.addMarkerByLngLat(mapConfig.center, pointMarkerIcon);

      this.mapService = mapService;
      this.map = mapService.getMapInstance();

      // 只控制底图图层，不影响其他业务图层
      this.tileLayerManager = createTileLayerManager(this.map);
      this.tileLayerManager.switchTo("TDT_vec");

      // 初始化图层用于显示图标
      this.markerLayer = new VectorLayer({
        source: new VectorSource(),
        zIndex: 10
      });
      this.map.addLayer(this.markerLayer);
    },
    // 其他方法
    loadWms0() {
      const wmsUrl = "http://localhost:8888/geoserver/wms";
      const layerName = "beilun:丁家山";

      const wmsLayer = new TileLayer({
        source: new TileWMS({
          url: wmsUrl,
          params: {
            LAYERS: layerName,
            TILED: true,
            VERSION: "1.1.0",
            SRS: "EPSG:4326"
          },
          serverType: "geoserver",
          crossOrigin: "anonymous"
        }),
        zIndex: 5 // 让它在底图上
      });

      // 添加到现有 map
      this.map.addLayer(wmsLayer);

      // 保存引用，方便后面移除、控制透明度等
      this.wmsLayer = wmsLayer;

      // 🌟 自动获取图层范围（GetCapabilities）
      fetch(`${wmsUrl}?service=WMS&version=1.1.0&request=GetCapabilities`)
        .then((r) => r.text())
        .then((text) => {
          const parser = new DOMParser();
          const xml = parser.parseFromString(text, "text/xml");

          const layerName2 = "丁家山";
          const layer = xml.querySelector(
            `Layer > Name:contains("${layerName2}")`
          );
          if (!layer) return;

          const bboxNode = xml.querySelector("LatLonBoundingBox");

          const minx = parseFloat(bboxNode.getAttribute("minx"));
          const miny = parseFloat(bboxNode.getAttribute("miny"));
          const maxx = parseFloat(bboxNode.getAttribute("maxx"));
          const maxy = parseFloat(bboxNode.getAttribute("maxy"));

          this.map.getView().fit([minx, miny, maxx, maxy], {
            padding: [50, 50, 50, 50],
            duration: 800
          });
        });
    },
    loadWms() {
      const wmsUrl = "http://localhost:8888/geoserver/wms";
      const layerName = "beilun:丁家山"; // 重要：GeoServer 返回的是完整名称

      // 创建 WMS 图层
      const wmsLayer = new TileLayer({
        source: new TileWMS({
          url: wmsUrl,
          params: {
            LAYERS: layerName,
            TILED: true,
            VERSION: "1.1.0",
            SRS: "EPSG:4326" // 输出 4326
          },
          serverType: "geoserver",
          crossOrigin: "anonymous"
        }),
        zIndex: 5
      });

      this.map.addLayer(wmsLayer);
      this.wmsLayer = wmsLayer;
      // this.mapTobbox();
      // return

      // 🌟 获取图层范围（GetCapabilities）
      fetch(`${wmsUrl}?service=WMS&version=1.1.0&request=GetCapabilities`)
        .then((r) => r.text())
        .then((text) => {
          const parser = new DOMParser();
          const xml = parser.parseFromString(text, "application/xml");

          // 1. 找到所有 Layer 节点
          const layers = xml.getElementsByTagName("Layer");

          let targetLayer = null;

          // 2. 遍历查找 <Name>节点内容与 layerName 完全一致的 Layer
          for (let i = 0; i < layers.length; i++) {
            const nameNode = layers[i].getElementsByTagName("Name")[0];
            if (nameNode && nameNode.textContent === layerName) {
              targetLayer = layers[i];
              break;
            }
          }

          if (!targetLayer) {
            console.warn("没有找到指定 Layer:", layerName);
            return;
          }

          // 3. 找 BBOX（GeoServer 1.1.0 用 LatLonBoundingBox || BoundingBox）
          // LatLonBoundingBox = 投影带的地理坐标范围（理论值） BoundingBox(SRS=投影) = 数据真实范围（实际值）

          // const bboxNode = targetLayer.getElementsByTagName("LatLonBoundingBox")[0];  //这个是 4326 坐标，但是不太准确
          const bboxNode = targetLayer.getElementsByTagName("BoundingBox")[0];  //取BoundingBox，但是这个是跟随服务的投影的坐标，需要做转换，使用这个转换准确

          if (!bboxNode) {
            console.warn("没有找到 BBOX 节点");
            return;
          }

          const minx = parseFloat(bboxNode.getAttribute("minx"));
          const miny = parseFloat(bboxNode.getAttribute("miny"));
          const maxx = parseFloat(bboxNode.getAttribute("maxx"));
          const maxy = parseFloat(bboxNode.getAttribute("maxy"));

          const rawExtent = [minx, miny, maxx, maxy];
          const extent4326 = this.transformBbox(rawExtent);

          this.mapService.addMarkerByLngLat([extent4326[0], extent4326[1]], pointMarkerIcon);
          this.mapService.addMarkerByLngLat([extent4326[2], extent4326[1]], pointMarkerIcon);
          this.mapService.addMarkerByLngLat([extent4326[0], extent4326[3]], pointMarkerIcon);
          this.mapService.addMarkerByLngLat([extent4326[2], extent4326[3]], pointMarkerIcon);

          console.log("bbox raw...4326: ", rawExtent, extent4326);

          // 4. 自动缩放到范围
          this.map.getView().fit(extent4326, {
            padding: [40, 40, 40, 40],
            duration: 900
          });
        })
        .catch((err) => console.error("解析 capabilities 报错：", err));
    },
    // 将 bbox 转换为 4326
    transformBbox(bbox) {
      proj4.defs(
        "EPSG:4549",
        "+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=500000 +y_0=0 +ellps=CGCS2000 +units=m +no_defs"
      );
      const [minX, minY, maxX, maxY] = bbox;
      const [minLon, minLat] = proj4("EPSG:4549", "EPSG:4326", [minX, minY]);
      const [maxLon, maxLat] = proj4("EPSG:4549", "EPSG:4326", [maxX, maxY]);
      return [minLon, minLat, maxLon, maxLat];
    },
    mapTobbox() {
      // 注册 EPSG:4549
      proj4.defs(
        "EPSG:4549",
        "+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=500000 +y_0=0 +ellps=CGCS2000 +units=m +no_defs"
      );

      // 使用
      // 服务能力xml中获取到的信息
      /*
      <LatLonBoundingBox minx="117.71711960290652" miny="24.422565961098492" maxx="122.28288039709352" maxy="53.3394285854264"/>
      <BoundingBox
        SRS="EPSG:4549"
        minx="663059.8247549133"
        miny="3305455.7920608446"
        maxx="665303.8112526108"
        maxy="3307934.2882075273"
      />;
      */
      const extent4326 = this.transformBbox([
        663059.8247549133, 3305455.7920608446, 665303.8112526108,
        3307934.2882075273
      ]);
      this.map
        .getView()
        .fit(extent4326, { padding: [40, 40, 40, 40], duration: 900 });
    },
    handleMapClick(event) {
      console.log("地图点击事件:", event);
      const coordinate = event.coordinate;
      const center = this.map.getView().getCenter();
      const zoom = this.map.getView().getZoom();
      console.log("地图点击经纬度:", coordinate);
      console.log("地图当前zoom:", zoom);
      console.log("地图当前center", center);
      this.mapService.addMarkerByLngLat(center, pointMarkerIcon);
    }
  }
};
</script>

<style>
.map-container {
  width: 100%;
  height: 100vh;
}
</style>
