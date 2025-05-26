<template>
  <div class="map-viewer">
    <div class="controls new-group">
      <span>经纬度 (格式: 经度,纬度):</span>
      <input v-model="coordinates" placeholder="输入经度,纬度" />
      <button @click="locatePoint">定位至</button>
      <button @click="startDraw('Point')">绘制点</button>
      <button @click="startDraw('LineString')">绘制线</button>
      <button @click="startDraw('Polygon')">绘制面</button>
      <button @click="measure('LineString')">测量距离</button>
      <button @click="measure('Polygon')">测量面积</button>
    </div>
    <div ref="mapContainer" class="map-container"></div>
    <el-dialog title="保存绘制要素" :visible.sync="dialogVisible">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="formData.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="formData.type" disabled />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelSave">取消</el-button>
          <el-button type="primary" @click="saveFeature">保存</el-button>
        </span>
      </template>
    </el-dialog>
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
import { Icon, Style, Stroke, Fill } from "ol/style";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Draw from "ol/interaction/Draw";
import CircleStyle from "ol/style/Circle";
import Overlay from "ol/Overlay";
import { getLength, getArea } from "ol/sphere";
import { LineString, Polygon } from "ol/geom";

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
      markerLayer: null,
      // draw
      draw: null,
      overlay: null,
      drawType: null, // point / line / polygon
      drawSource: null,
      drawLayer: null,
      dialogVisible: false,
      formData: {
        name: "",
        type: ""
      },
      pendingFeature: null,
      nodeOverlays: [], // 存储红色圆圈和 x 按钮
      distanceOverlay: null // 显示距离的 overlay
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

      // 初始化绘图图层
      this.drawSource = new VectorSource();
      this.drawLayer = new VectorLayer({
        source: this.drawSource
      });
      this.map.addLayer(this.drawLayer);
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
    },
    startDraw0(type) {
      if (this.draw) {
        this.map.removeInteraction(this.draw);
      }

      this.draw = new Draw({
        source: this.drawSource,
        type
      });

      this.drawLayer.setStyle(
        new Style({
          stroke: new Stroke({
            color: "blue",
            width: 2
          }),
          fill: new Fill({
            color: "rgba(0, 0, 255, 0.1)"
          }),
          image: new CircleStyle({
            radius: 6,
            fill: new Fill({ color: "blue" })
          })
        })
      );

      this.draw.on("drawend", (event) => {
        const feature = event.feature;
        const geom = feature.getGeometry();

        this.formData.name = "";
        this.formData.type = geom.getType();
        this.pendingFeature = feature;
        this.dialogVisible = true;
      });

      this.map.addInteraction(this.draw);
    },
    startDraw(type) {
      // 清除之前图层和交互
      this.map.removeInteraction(this.draw);
      this.map.removeLayer(this.drawLayer);
      this.clearNodeOverlays();

      // 初始化 source 和 layer
      this.drawSource = new VectorSource();
      this.drawLayer = new VectorLayer({
        source: this.drawSource,
        style: new Style({
          fill: new Fill({ color: "rgba(255, 255, 255, 0.2)" }),
          stroke: new Stroke({ color: "#ffcc33", width: 2 }),
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({ color: "#ffcc33" })
          })
        })
      });
      this.map.addLayer(this.drawLayer);

      // 初始化绘制交互
      this.draw = new Draw({
        source: this.drawSource,
        type: type
      });
      this.map.addInteraction(this.draw);

      // 监听绘制开始
      this.draw.on("drawstart", (event) => {
        this.clearNodeOverlays(); // 清除之前的节点 overlay

        const geometry = event.feature.getGeometry();

        geometry.on("change", () => {
          this.clearNodeOverlays(); // 每次改变都清空旧 overlay

          const coords = geometry.getCoordinates();
          coords.forEach((coord, index) => {
            // 红色节点圆点
            const node = document.createElement("div");
            node.style.width = "8px";
            node.style.height = "8px";
            node.style.backgroundColor = "red";
            node.style.borderRadius = "50%";
            node.style.position = "absolute";
            node.style.transform = "translate(-50%, -50%)";

            const nodeOverlay = new Overlay({
              element: node,
              position: coord,
              positioning: "center-center",
              stopEvent: false
            });
            this.map.addOverlay(nodeOverlay);
            this.nodeOverlays.push(nodeOverlay);

            // 最后一个节点添加关闭按钮 ✕
            if (index === coords.length - 1) {
              const close = document.createElement("div");
              close.innerText = "✕";
              close.style.color = "#fff";
              close.style.background = "red";
              close.style.padding = "2px 4px";
              close.style.borderRadius = "4px";
              close.style.cursor = "pointer";
              close.style.fontSize = "12px";

              close.addEventListener("click", () => {
                // 点击后移除绘制和所有图层内容
                this.map.removeInteraction(this.draw);
                this.drawSource.removeFeature(event.feature);
                this.clearNodeOverlays();
                if (this.distanceOverlay) {
                  this.map.removeOverlay(this.distanceOverlay);
                  this.distanceOverlay = null;
                }
              });

              const closeOverlay = new Overlay({
                element: close,
                position: coord,
                offset: [10, -10],
                positioning: "bottom-left"
              });
              this.map.addOverlay(closeOverlay);
              this.nodeOverlays.push(closeOverlay);
            }
          });

          // 显示测量距离
          const length = getLength(geometry, { projection: "EPSG:4326" });
          const output =
            length > 1000
              ? (length / 1000).toFixed(2) + " km"
              : length.toFixed(2) + " m";

          // 创建或更新距离 overlay
          if (!this.distanceOverlay) {
            const label = document.createElement("div");
            label.className = "distance-label";
            label.style.background = "white";
            label.style.padding = "2px 6px";
            label.style.border = "1px solid #ccc";
            label.style.borderRadius = "4px";
            label.style.fontSize = "12px";
            this.distanceOverlay = new Overlay({
              element: label,
              offset: [0, -10],
              positioning: "bottom-center"
            });
            this.map.addOverlay(this.distanceOverlay);
          }

          this.distanceOverlay.setPosition(coords[coords.length - 1]);
          this.distanceOverlay.getElement().innerHTML = output;
        });
      });

      // 绘制完成后更新所有 features 数组
      this.draw.on("drawend", (event) => {
        const features = this.drawSource.getFeatures();
        this.lineData = features.map((f) => f.getGeometry().getCoordinates());
      });
    },

    clearNodeOverlays() {
      this.nodeOverlays.forEach((o) => this.map.removeOverlay(o));
      this.nodeOverlays = [];
    },
    measure(type) {
      if (this.draw) {
        this.map.removeInteraction(this.draw);
      }

      this.draw = new Draw({
        source: this.drawSource,
        type
      });

      this.draw.on("drawend", (event) => {
        const geom = event.feature.getGeometry();
        let output;

        if (type === "LineString") {
          const length = getLength(geom);
          output =
            length > 1000
              ? (length / 1000).toFixed(2) + " km"
              : length.toFixed(2) + " m";
        } else if (type === "Polygon") {
          const area = getArea(geom);
          output =
            area > 1000000
              ? (area / 1000000).toFixed(2) + " km²"
              : area.toFixed(2) + " m²";
        }

        this.$message.success(`测量结果：${output}`);
      });

      this.map.addInteraction(this.draw);
    },

    saveFeature() {
      if (this.formData.name.trim() === "") {
        this.$message.warning("请输入名称");
        return;
      }

      this.pendingFeature.setProperties({
        name: this.formData.name
      });

      console.log(
        "保存成功：",
        this.pendingFeature.getGeometry().getType(),
        this.formData.name
      );

      this.dialogVisible = false;
      this.pendingFeature = null;
    },

    cancelSave() {
      // 用户取消则移除该要素
      if (this.pendingFeature) {
        this.drawSource.removeFeature(this.pendingFeature);
        this.pendingFeature = null;
      }
      this.dialogVisible = false;
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
