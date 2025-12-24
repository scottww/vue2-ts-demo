<template>
  <div class="map-container">
    <!-- 地图容器 -->
    <div ref="mapContainer" class="ol-map"></div>

    <!-- 控制面板 -->
    <div class="control-panel">
      <button @click="toggleTable" class="control-btn">
        {{ showTable ? "隐藏站点列表" : "显示站点列表" }}
      </button>
      <button @click="addRandomStation" class="control-btn">
        添加随机站点
      </button>
      <button @click="clearAllStations" class="control-btn">
        清空所有站点
      </button>
    </div>

    <!-- 站点表格 -->
    <transition name="fade">
      <div v-if="showTable" class="station-table">
        <div class="table-header">
          <h3>站点列表</h3>
          <span class="close-btn" @click="showTable = false">×</span>
        </div>
        <div class="table-content">
          <table>
            <thead>
              <tr>
                <th>站点名称</th>
                <th>距离</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(station, index) in stations" :key="index">
                <td>{{ station.name }}</td>
                <td>{{ station.distance }}</td>
                <td>
                  <button
                    @click="centerOnStation(station.coordinates)"
                    class="table-btn"
                  >
                    定位
                  </button>
                  <button
                    @click="removeStation(index)"
                    class="table-btn delete"
                  >
                    删除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Icon, Style, Fill, Stroke, Circle, Text } from "ol/style";
import Overlay from "ol/Overlay";

export default {
  name: "StationMarker",
  data() {
    return {
      map: null,
      vectorSource: null,
      stations: [
        {
          name: "站点名称名称",
          distance: "1.2m",
          coordinates: [120.155, 30.274]
        },
        {
          name: "站点名称名称",
          distance: "1.2m",
          coordinates: [120.165, 30.284]
        },
        {
          name: "站点名称名称",
          distance: "12mm",
          coordinates: [120.145, 30.264]
        }
      ],
      showTable: true,
      overlay: null
    };
  },
  mounted() {
    this.initMap();
    this.addStations();
  },
  methods: {
    initMap() {
      // 创建地图
      this.map = new Map({
        target: this.$refs.mapContainer,
        layers: [
          // new TileLayer({
          //   source: new OSM()
          // })
        ],
        view: new View({
          center: fromLonLat([120.155, 30.274]),
          zoom: 12
        })
      });

      // 初始化矢量源
      this.vectorSource = new VectorSource();

      // 创建矢量图层
      const vectorLayer = new VectorLayer({
        source: this.vectorSource,
        style: this.getStationStyle
      });

      this.map.addLayer(vectorLayer);

      // 初始化信息覆盖层
      this.overlay = new Overlay({
        element: this.createPopupElement(),
        autoPan: true,
        offset: [10, 0] // map.popup.scss
        // offset: [0, -25] // map.popup.scss

      });
      this.map.addOverlay(this.overlay);

      // 添加点击事件
      this.map.on("click", (event) => {
        const feature = this.map.forEachFeatureAtPixel(
          event.pixel,
          (feature) => {
            return feature;
          }
        );

        if (feature) {
          const coordinates = feature.getGeometry().getCoordinates();
          const properties = feature.getProperties();
          this.showPopup(coordinates, properties);
        } else {
          this.overlay.setPosition(undefined);
        }
      });
    },

    createPopupElement() {
      const popup = document.createElement("div");
      popup.className = "station-popup";
      popup.innerHTML = `
        <div class="popup-content">
          <div class="popup-header">
            <h4>站点信息</h4>
            <span class="popup-close">×</span>
          </div>
          <div class="popup-body">
            <div class="info-row">
              <span class="label">名称：</span>
              <span class="value" id="popup-name"></span>
            </div>
            <div class="info-row">
              <span class="label">距离：</span>
              <span class="value" id="popup-distance"></span>
            </div>
            <div class="info-row">
              <span class="label">坐标：</span>
              <span class="value" id="popup-coords"></span>
            </div>
          </div>
        </div>
      `;

      // 添加关闭按钮事件
      const closeBtn = popup.querySelector(".popup-close");
      closeBtn.addEventListener("click", () => {
        this.overlay.setPosition(undefined);
      });

      return popup;
    },

    showPopup(coordinates, properties) {
      const popup = this.overlay.getElement();
      popup.querySelector("#popup-name").textContent =
        properties.name || "未知";
      popup.querySelector("#popup-distance").textContent =
        properties.distance || "未知";
      popup.querySelector("#popup-coords").textContent = coordinates
        .map((c) => c.toFixed(6))
        .join(", ");

      this.overlay.setPosition(coordinates);
    },

    getStationStyle(feature) {
      const properties = feature.getProperties();
      const distance = properties.distance || "";

      // 根据距离值设置不同的颜色
      let color = "#667eea"; // 默认蓝色
      if (distance.includes("mm")) {
        color = "#48bb78"; // 绿色
      } else if (distance.includes("cm")) {
        color = "#ed8936"; // 橙色
      }

      return new Style({
        image: new Circle({
          radius: 8,
          fill: new Fill({
            color: color + "cc" // 添加透明度
          }),
          stroke: new Stroke({
            color: "#ffffff",
            width: 2
          })
        }),
        text: new Text({
          text: distance,
          font: "bold 12px Arial",
          fill: new Fill({
            color: "#ffffff"
          }),
          stroke: new Stroke({
            color: "#000000",
            width: 2
          }),
          offsetY: -15
        })
      });
    },

    addStations() {
      // 清除现有要素
      this.vectorSource.clear();

      // 添加站点要素
      this.stations.forEach((station) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat(station.coordinates)),
          name: station.name,
          distance: station.distance,
          coordinates: station.coordinates
        });

        this.vectorSource.addFeature(feature);
      });
    },

    addRandomStation() {
      const newStation = {
        name: `站点${this.stations.length + 1}`,
        distance: `${(Math.random() * 10).toFixed(1)}${
          Math.random() > 0.5 ? "m" : "mm"
        }`,
        coordinates: [
          120.14 + Math.random() * 0.05, // 杭州附近随机坐标
          30.25 + Math.random() * 0.05
        ]
      };

      this.stations.push(newStation);
      this.addStations();
    },

    removeStation(index) {
      this.stations.splice(index, 1);
      this.addStations();
    },

    clearAllStations() {
      this.stations = [];
      this.vectorSource.clear();
    },

    centerOnStation(coordinates) {
      this.map.getView().animate({
        center: fromLonLat(coordinates),
        zoom: 15,
        duration: 1000
      });
    },

    toggleTable() {
      this.showTable = !this.showTable;
    }
  },
  watch: {
    stations: {
      handler() {
        this.addStations();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.ol-map {
  width: 100%;
  height: 100%;
}

.control-panel {
  position: absolute;
  top: 20px;
  left: 50px;
  z-index: 1000;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.control-btn {
  padding: 8px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.control-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.station-table {
  position: absolute;
  top: 80px;
  left: 50px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 300px;
  max-height: 400px;
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.table-header h3 {
  margin: 0;
  font-size: 16px;
}

.close-btn {
  font-size: 20px;
  cursor: pointer;
  padding: 0 8px;
}

.close-btn:hover {
  color: #ff6b6b;
}

.table-content {
  max-height: 350px;
  overflow-y: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #f8f9fa;
}

th,
td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

th {
  font-weight: 600;
  color: #495057;
}

tbody tr:hover {
  background-color: #f8f9fa;
}

.table-btn {
  padding: 4px 8px;
  margin-right: 5px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}

.table-btn:hover {
  background-color: #5a67d8;
}

.table-btn.delete {
  background-color: #f56565;
}

.table-btn.delete:hover {
  background-color: #e53e3e;
}

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

@import "./map-popup.scss";
</style>