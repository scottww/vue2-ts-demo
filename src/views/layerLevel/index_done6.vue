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
  data() {
    return {
      map: null,
      zoom: 12,
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

      const lonMin = 119.95, lonMax = 120.35;
      const latMin = 29.95, latMax = 30.4;

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
      rawSource.getFeatures().forEach(f => {
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
            const rippleData = this.rippleLayers.find(r => r.feature === features[0]);
            rippleData.radii.forEach(r => {
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

    startAnimation() {
      const stationLayer = this.map.getLayers().getArray()[1];

      const animate = () => {
        this.rotateAngle += 0.05;

        this.rippleLayers.forEach(r => {
          for (let i = 0; i < r.radii.length; i++) {
            r.radii[i] += this.rippleSpeed;
            if (r.radii[i] > this.maxRadius) r.radii[i] = 0;
          }
        });

        stationLayer.changed();
        requestAnimationFrame(animate);
      };

      animate();
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
.map { width: 100%; height: 100%; }
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
.title { font-size: 20px; margin-bottom: 12px; }
.legend { margin-top: 12px; }
.dot { display:inline-block;width:12px;height:12px;border-radius:50%;margin-right:6px;}
.normal { background:#00ff99;}
.warning { background:#ffcc00;}
.danger { background:#ff3333;}
</style>