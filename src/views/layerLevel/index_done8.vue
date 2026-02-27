<template>
  <div class="screen-container">
    <div ref="map" class="map"></div>

    <div class="panel">
      <div class="title">运行监测</div>
      <div>缩放级别：{{ zoom }}</div>
      <div class="legend">
        <div><span class="dot normal"></span> 正常</div>
        <div><span class="dot warning"></span> 预警</div>
        <div><span class="dot danger"></span> 告警</div>
      </div>
    </div>

    <div class="right-panel">
      <div class="panel-title">实时状态统计</div>
      <div class="stat-item">
        <span class="dot normal"></span> 正常：{{ stats.normal }}
      </div>
      <div class="stat-item">
        <span class="dot warning"></span> 预警：{{ stats.warning }}
      </div>
      <div class="stat-item">
        <span class="dot danger"></span> 告警：{{ stats.danger }}
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
import Overlay from "ol/Overlay";

export default {
  data() {
    return {
      map: null,
      zoom: 12,
      stats: { normal: 0, warning: 0, danger: 0 },
      rippleLayers: [],
      maxRadius: 70,
      numRipples: 4,
      rippleSpeed: 0.8,
      rotateAngle: 0
    };
  },
  mounted() {
    this.initMap();
    this.startAnimation();
    this.startStatsAnimation();
  },
  methods: {
    initMap() {
      const darkLayer = new TileLayer({
        source: new XYZ({
          url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png"
        })
      });

      // 随机点
      const rawSource = new VectorSource();
      const statusList = ["normal", "warning", "danger"];
      const lonMin = 119.95,
        lonMax = 120.35,
        latMin = 29.95,
        latMax = 30.4;

      for (let i = 0; i < 60; i++) {
        const status = statusList[Math.floor(Math.random() * 3)];
        const f = new Feature({
          status,
          geometry: new Point(
            fromLonLat([
              lonMin + Math.random() * (lonMax - lonMin),
              latMin + Math.random() * (latMax - latMin)
            ])
          )
        });
        rawSource.addFeature(f);
        this.stats[status]++;
        if (status === "danger") {
          const radii = [];
          for (let j = 0; j < this.numRipples; j++)
            radii.push((this.maxRadius / this.numRipples) * j);
          this.rippleLayers.push({ feature: f, radii });
        }
      }

      const clusterSource = new Cluster({ distance: 20, source: rawSource });

      const statusColors = {
        normal: "#00ff99",
        warning: "#ffcc00",
        danger: "#ff3333"
      };

      // 注意这里不要用 this，直接用外部变量
      const rippleLayers = this.rippleLayers;
      let rotateAngle = 0;

      const stationLayer = new VectorLayer({
        source: clusterSource,
        style: function (feature) {
          const features = feature.get("features");
          if (features.length > 1) {
            return new Style({
              image: new CircleStyle({
                radius: 14,
                fill: new Fill({ color: "#00cfff" }),
                stroke: new Stroke({ color: "#fff", width: 2 })
              }),
              text: new Text({
                text: features.length.toString(),
                fill: new Fill({ color: "#fff" })
              })
            });
          }

          const f0 = features[0];
          const status = f0.get("status");
          const baseColor = statusColors[status];

          const styles = [];

          // 中心点
          styles.push(
            new Style({
              image: new CircleStyle({
                radius: 8,
                fill: new Fill({ color: baseColor }),
                stroke: new Stroke({ color: "#fff", width: 2 })
              })
            })
          );

          // 告警波纹动画
          if (status === "danger") {
            styles.push(
              new Style({
                image: new CircleStyle({
                  radius: 18,
                  stroke: new Stroke({
                    color: "rgba(255,80,80,0.6)",
                    width: 2,
                    lineDash: [6, 6]
                  }),
                  rotation: rotateAngle
                })
              })
            );
            const rData = rippleLayers.find((r) => r.feature === f0);
            rData.radii.forEach((r) => {
              const alpha = Math.pow(1 - r / 70, 2);
              styles.push(
                new Style({
                  image: new CircleStyle({
                    radius: r,
                    stroke: new Stroke({
                      color: `rgba(255,51,51,${0.8 * alpha})`,
                      width: 2
                    }),
                    fill: new Fill({ color: `rgba(255,51,51,${0.25 * alpha})` })
                  })
                })
              );
            });
          }
          return styles;
        }
      });

      this.map = new Map({
        target: this.$refs.map,
        layers: [darkLayer, stationLayer],
        view: new View({ center: fromLonLat([120.15, 30.25]), zoom: this.zoom })
      });

      // 弹窗
      const popup = document.createElement("div");
      popup.className = "popup";
      const overlay = new Overlay({
        element: popup,
        positioning: "bottom-center",
        offset: [0, -12], // 往上偏移
        stopEvent: false
      });
      this.map.addOverlay(overlay);

      this.map.on("click", (evt) => {
        const feature = this.map.forEachFeatureAtPixel(evt.pixel, (f) => f);
        if (!feature) return;
        const features = feature.get("features");
        if (features.length === 1) {
          const status = features[0].get("status");
          popup.innerHTML = `<div class="popup-box">状态：${status}<br/>时间：${new Date().toLocaleTimeString()}</div>`;
          overlay.setPosition(evt.coordinate);
        }
      });

      this.map.getView().on("change:resolution", () => {
        this.zoom = this.map.getView().getZoom().toFixed(2);
      });

      // 用闭包控制旋转动画
      this.stationLayer = stationLayer;
      this.animate = function () {
        rotateAngle += 0.05;
        rippleLayers.forEach((r) =>
          r.radii.forEach((_, i) => {
            r.radii[i] += 0.8;
            if (r.radii[i] > 70) r.radii[i] = 0;
          })
        );
        stationLayer.changed();
        requestAnimationFrame(this.animate);
      }.bind(this);
    },

    startAnimation() {
      this.animate();
    },

    startStatsAnimation() {
      setInterval(() => {
        Object.keys(this.stats).forEach((k) => {
          this.stats[k] += Math.floor(Math.random() * 2);
        });
      }, 3000);
    }
  }
};
</script>

<style scoped>
.screen-container {
  width: 100%;
  height: 100vh;
  position: relative;
  background: radial-gradient(circle at center, #0b1d33 0%, #081525 100%);
}
.map {
  width: 100%;
  height: 100%;
}
.panel {
  position: absolute;
  top: 20px;
  left: 50px;
  background: rgba(5, 20, 40, 0.85);
  padding: 20px 26px;
  border-radius: 12px;
  color: #00eaff;
  box-shadow: 0 0 25px rgba(0, 200, 255, 0.5);
}
.title {
  font-size: 20px;
  margin-bottom: 12px;
}
.legend {
  margin-top: 12px;
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
.right-panel {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(5, 20, 40, 0.9);
  padding: 18px 22px;
  border-radius: 10px;
  color: #00eaff;
  box-shadow: 0 0 20px rgba(0, 200, 255, 0.4);
}
.panel-title {
  font-size: 18px;
  margin-bottom: 10px;
}
.stat-item {
  margin-bottom: 6px;
}
</style>
<style>
.popup {
  position: absolute;
  z-index: 9999;
  pointer-events: none;
}
.popup-box {
  background: rgba(0, 0, 0, 0.85);
  color: #00ffff;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  border: 1px solid rgba(0, 255, 255, 0.5);
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.5);
  white-space: nowrap;
}
</style>
