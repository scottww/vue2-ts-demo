<template>
  <div class="screen-container">
    <div ref="map" class="map"></div>

    <div class="panel">
      <div class="title">智慧灌区运行监测</div>
      <div>缩放级别：{{ zoom }}</div>
      <div class="legend">
        <div><span class="dot normal"></span> 正常</div>
        <div><span class="dot warning"></span> 预警</div>
        <div><span class="dot danger"></span> 告警</div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import XYZ from "ol/source/XYZ";
import VectorSource from "ol/source/Vector";
import Cluster from "ol/source/Cluster";
import { fromLonLat } from "ol/proj";
import { Point } from "ol/geom";
import Feature from "ol/Feature";
import { Fill, Stroke, Style, Circle as CircleStyle, Text } from "ol/style";

export default {
  name: "ScreenLevelPro",

  data() {
    return {
      map: null,
      zoom: 12,
      rippleRadius: 0 // 扩散圈半径
    };
  },

  mounted() {
    this.initMap();
    this.startRippleAnimation();
  },

  methods: {
    initMap() {
      const darkLayer = new TileLayer({
        source: new XYZ({
          url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png"
        })
      });

      const rawSource = new VectorSource();
      const statusList = ["normal", "warning", "danger"];

      const lonMin = 119.95,
        lonMax = 120.35;
      const latMin = 29.95,
        latMax = 30.4;

      for (let i = 0; i < 50; i++) {
        rawSource.addFeature(
          new Feature({
            status: statusList[Math.floor(Math.random() * 3)],
            geometry: new Point(
              fromLonLat([
                lonMin + Math.random() * (lonMax - lonMin),
                latMin + Math.random() * (latMax - latMin)
              ])
            )
          })
        );
      }

      const clusterSource = new Cluster({
        distance: 15,
        source: rawSource
      });

      const statusColorMap = {
        normal: "#00ff99",
        warning: "#ffcc00",
        danger: "#ff3333"
      };

      const stationLayer = new VectorLayer({
        source: clusterSource,
        minZoom: 8,
        style: (feature) => {
          const features = feature.get("features");

          if (features.length > 1) {
            return new Style({
              image: new CircleStyle({
                radius: 12,
                fill: new Fill({ color: "#3399ff" })
              }),
              text: new Text({
                text: features.length.toString(),
                fill: new Fill({ color: "#fff" })
              })
            });
          }

          const status = features[0].get("status");
          const baseColor = statusColorMap[status];

          const styles = [
            // 基础点
            new Style({
              image: new CircleStyle({
                radius: 10,
                fill: new Fill({ color: baseColor }),
                stroke: new Stroke({ color: "#fff", width: 2 })
              })
            })
          ];

          // 扩散圈动画
          if (status === "danger") {
            styles.push(
              new Style({
                image: new CircleStyle({
                  radius: this.rippleRadius,
                  fill: new Fill({ color: "rgba(255,51,51,0.2)" }),
                  stroke: new Stroke({ color: "rgba(255,51,51,0.6)", width: 2 })
                })
              })
            );
          }

          return styles;
        }
      });

      this.map = new Map({
        target: this.$refs.map,
        layers: [darkLayer, stationLayer],
        view: new View({
          center: fromLonLat([120.15, 30.25]),
          zoom: this.zoom
        })
      });

      this.map.getView().on("change:resolution", () => {
        this.zoom = this.map.getView().getZoom().toFixed(2);
      });
    },

    // 扩散圈动画
    startRippleAnimation() {
      const stationLayer = this.map.getLayers().getArray()[1];
      let growing = true;

      setInterval(() => {
        if (growing) {
          this.rippleRadius += 1;
          if (this.rippleRadius >= 30) growing = false;
        } else {
          this.rippleRadius -= 1;
          if (this.rippleRadius <= 10) growing = true;
        }
        stationLayer.changed();
      }, 50);
    }
  }
};
</script>

<style scoped>
.screen-container {
  width: 100%;
  height: 100vh;
  background: #081525;
  position: relative;
}

.map {
  width: 100%;
  height: 100%;
}

.panel {
  position: absolute;
  top: 20px;
  left: 50px;
  background: rgba(5, 20, 40, 0.9);
  padding: 18px 22px;
  border-radius: 10px;
  color: #00eaff;
  box-shadow: 0 0 20px rgba(0, 200, 255, 0.4);
}

.title {
  font-size: 18px;
  margin-bottom: 10px;
}

.legend {
  margin-top: 10px;
}

.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
}

.normal {
  background: #00ff99;
}
.warning {
  background: #ffcc00;
}
.danger {
  background: #ff3333;
}
</style>