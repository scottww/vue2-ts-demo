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
import GeoJSON from "ol/format/GeoJSON";
import Overlay from "ol/Overlay";

export default {
  data() {
    return {
      map: null,
      zoom: 12,
      rippleLayers: [],
      maxRadius: 70,
      numRipples: 4,
      rippleSpeed: 0.8,
      rotateAngle: 0,
      stats: {
        normal: 0,
        warning: 0,
        danger: 0
      }
    };
  },

  mounted() {
    this.initMap();
    this.startAnimation();
    // this.startFlyAnimation();
    this.startStatsAnimation();
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

      for (let i = 0; i < 60; i++) {
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
        distance: 20,
        source: rawSource
      });

      // 初始化告警波纹
      rawSource.getFeatures().forEach((f) => {
        this.stats[f.get("status")]++;
        if (f.get("status") === "danger") {
          const radii = [];
          for (let i = 0; i < this.numRipples; i++) {
            radii.push((this.maxRadius / this.numRipples) * i);
          }
          this.rippleLayers.push({ feature: f, radii });
        }
      });

      const stationLayer = new VectorLayer({
        source: clusterSource,
        style: (feature) => {
          const features = feature.get("features");

          if (features.length > 1) {
            return new Style({
              image: new CircleStyle({
                radius: 14,
                fill: new Fill({ color: "#00cfff" }),
                stroke: new Stroke({ color: "#ffffff", width: 2 })
              }),
              text: new Text({
                text: features.length.toString(),
                fill: new Fill({ color: "#fff" })
              })
            });
          }

          const status = features[0].get("status");

          const baseColor = {
            normal: "#00ff99",
            warning: "#ffcc00",
            danger: "#ff3333"
          }[status];

          const styles = [];

          // 中心发光底圈
          styles.push(
            new Style({
              image: new CircleStyle({
                radius: 14,
                fill: new Fill({ color: "rgba(255,51,51,0.15)" })
              })
            })
          );

          // 中心主点
          styles.push(
            new Style({
              image: new CircleStyle({
                radius: 8,
                fill: new Fill({ color: baseColor }),
                stroke: new Stroke({ color: "#fff", width: 2 })
              })
            })
          );

          // 旋转光环（只对告警）
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
                  rotation: this.rotateAngle
                })
              })
            );

            // 雷达波
            const rippleData = this.rippleLayers.find(
              (r) => r.feature === features[0]
            );
            rippleData.radii.forEach((r) => {
              const percent = r / this.maxRadius;
              const alpha = Math.pow(1 - percent, 2);

              styles.push(
                new Style({
                  image: new CircleStyle({
                    radius: r,
                    stroke: new Stroke({
                      color: `rgba(255,51,51,${0.8 * alpha})`,
                      width: 2
                    }),
                    fill: new Fill({
                      color: `rgba(255,51,51,${0.25 * alpha})`
                    })
                  })
                })
              );
            });
          }

          return styles;
        }
      });

      // 杭州行政区边界
      const boundaryLayer = new VectorLayer({
        source: new VectorSource({
          url: "/data/hangzhou.json",
          format: new GeoJSON()
        }),
        style: new Style({
          stroke: new Stroke({
            color: "#00eaff",
            width: 2
          }),
          fill: new Fill({
            color: "rgba(0,200,255,0.05)"
          })
        })
      });

      this.map = new Map({
        target: this.$refs.map,
        layers: [darkLayer, boundaryLayer, stationLayer],
        view: new View({
          center: fromLonLat([120.15, 30.25]),
          zoom: this.zoom
        })
      });

      const popup = document.createElement("div");
      popup.className = "popup";
      const overlay = new Overlay({
        element: popup,
        positioning: "bottom-center",
        stopEvent: false
      });
      this.map.addOverlay(overlay);

      this.map.on("click", (evt) => {
        const feature = this.map.forEachFeatureAtPixel(evt.pixel, (f) => f);

        if (!feature) return;

        const features = feature.get("features");
        if (features.length === 1) {
          const status = features[0].get("status");
          popup.innerHTML = `
      <div class="popup-box">
        状态：${status}<br/>
        时间：${new Date().toLocaleTimeString()}
      </div>
    `;
          overlay.setPosition(evt.coordinate);
        }
      });

      this.map.getView().on("change:resolution", () => {
        this.zoom = this.map.getView().getZoom().toFixed(2);
      });
    },

    startAnimation() {
      // 根据图层顺序查找
      // const stationLayer = this.map.getLayers().getArray()[2]; // 站点层是第三层
      // 根据类型查找
      const stationLayer = this.map
        .getLayers()
        .getArray()
        .find(
          (layer) =>
            layer instanceof VectorLayer && layer.getSource() instanceof Cluster
        );

      const animate = () => {
        this.rotateAngle += 0.05;

        this.rippleLayers.forEach((r) => {
          for (let i = 0; i < r.radii.length; i++) {
            r.radii[i] += this.rippleSpeed;
            if (r.radii[i] > this.maxRadius) r.radii[i] = 0;
          }
        });

        stationLayer.changed();
        requestAnimationFrame(animate);
      };

      animate();
    },

    startFlyAnimation() {
      const view = this.map.getView();

      const points = [
        fromLonLat([120.15, 30.25]),
        fromLonLat([120.3, 30.2]),
        fromLonLat([120.05, 30.35])
      ];

      let index = 0;

      setInterval(() => {
        view.animate({
          center: points[index],
          zoom: 13,
          duration: 2000
        });
        index = (index + 1) % points.length;
      }, 5000);
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
  background: radial-gradient(circle at center, #0b1d33 0%, #081525 100%);
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

.popup-box {
  background: rgba(0, 20, 40, 0.95);
  padding: 10px 14px;
  color: #00ffff; /* 亮一些 */
  border-radius: 6px;
  font-size: 14px;
  box-shadow: 0 0 12px #00eaff;
  border: 1px solid rgba(0, 255, 255, 0.3); /* 提升可见度 */
  pointer-events: none;
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
