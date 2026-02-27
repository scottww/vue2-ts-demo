<template>
  <div class="map-container">
    <div ref="map" class="map"></div>

    <div class="panel">
      <div class="title">智慧灌区 · 分级演示</div>
      <div>当前缩放级别：{{ zoom }}</div>
      <div class="tip">0–6 区域</div>
      <div class="tip">6–10 子区域</div>
      <div class="tip">10+ 站点</div>
    </div>
  </div>
</template>

<script>
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import XYZ from 'ol/source/XYZ'
import VectorSource from 'ol/source/Vector'
import { fromLonLat } from 'ol/proj'
import { Point, Polygon } from 'ol/geom'
import Feature from 'ol/Feature'
import { Fill, Stroke, Style, Circle as CircleStyle, Text } from 'ol/style'

export default {
  name: 'ScreenLevelDemo',

  data() {
    return {
      map: null,
      zoom: 5
    }
  },

  mounted() {
    this.initMap()
  },

  methods: {
    initMap() {

      // =============================
      // 深色底图（暗色风格）
      // =============================
      const darkLayer = new TileLayer({
        source: new XYZ({
          url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png'
        })
      })

      // =============================
      // 一级：区域（发光蓝）
      // =============================
      const regionSource = new VectorSource()

      const regions = [
        { name: '东部灌区', extent: [100, 30, 110, 40] },
        { name: '西部灌区', extent: [110, 30, 120, 40] }
      ]

      regions.forEach(r => {
        regionSource.addFeature(
          new Feature({
            name: r.name,
            geometry: new Polygon([[
              fromLonLat([r.extent[0], r.extent[1]]),
              fromLonLat([r.extent[2], r.extent[1]]),
              fromLonLat([r.extent[2], r.extent[3]]),
              fromLonLat([r.extent[0], r.extent[3]]),
              fromLonLat([r.extent[0], r.extent[1]])
            ]])
          })
        )
      })

      const regionLayer = new VectorLayer({
        source: regionSource,
        minZoom: 0,
        maxZoom: 6,
        style: feature => new Style({
          fill: new Fill({ color: 'rgba(0, 180, 255, 0.15)' }),
          stroke: new Stroke({ color: '#00ccff', width: 3 }),
          text: new Text({
            text: feature.get('name'),
            font: '18px sans-serif',
            fill: new Fill({ color: '#00eaff' })
          })
        })
      })

      // =============================
      // 二级：子区域（青色发光点）
      // =============================
      const subSource = new VectorSource()

      const subs = [
        { name: '分区A1', coord: [104, 35] },
        { name: '分区B1', coord: [114, 35] }
      ]

      subs.forEach(s => {
        subSource.addFeature(
          new Feature({
            name: s.name,
            geometry: new Point(fromLonLat(s.coord))
          })
        )
      })

      const subLayer = new VectorLayer({
        source: subSource,
        minZoom: 6,
        maxZoom: 10,
        style: feature => new Style({
          image: new CircleStyle({
            radius: 12,
            fill: new Fill({ color: 'rgba(0,255,200,0.8)' }),
            stroke: new Stroke({ color: '#00ffe1', width: 2 })
          }),
          text: new Text({
            text: feature.get('name'),
            offsetY: -20,
            font: '14px sans-serif',
            fill: new Fill({ color: '#00ffd5' })
          })
        })
      })

      // =============================
      // 三级：站点（红色告警风格）
      // =============================
      const stationSource = new VectorSource()

      const stations = [
        { name: '泵站01', coord: [103, 34] },
        { name: '泵站02', coord: [106, 36] },
        { name: '水闸01', coord: [112, 33] },
        { name: '水闸02', coord: [115, 36] }
      ]

      stations.forEach(s => {
        stationSource.addFeature(
          new Feature({
            name: s.name,
            geometry: new Point(fromLonLat(s.coord))
          })
        )
      })

      const stationLayer = new VectorLayer({
        source: stationSource,
        minZoom: 10,
        style: feature => new Style({
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({ color: '#ff3333' }),
            stroke: new Stroke({ color: '#ffffff', width: 2 })
          }),
          text: new Text({
            text: feature.get('name'),
            offsetY: -18,
            font: '12px sans-serif',
            fill: new Fill({ color: '#ffaaaa' })
          })
        })
      })

      // =============================
      // 初始化地图
      // =============================
      this.map = new Map({
        target: this.$refs.map,
        layers: [
          darkLayer,
          regionLayer,
          subLayer,
          stationLayer
        ],
        view: new View({
          center: fromLonLat([110, 35]),
          zoom: this.zoom
        })
      })

      this.map.getView().on('change:resolution', () => {
        this.zoom = this.map.getView().getZoom().toFixed(2)
      })
    }
  }
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
  background: #0a1a2a;
  position: relative;
}

.map {
  width: 100%;
  height: 100%;
}

.panel {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(10, 25, 45, 0.85);
  padding: 16px 20px;
  border-radius: 8px;
  color: #00eaff;
  font-size: 14px;
  box-shadow: 0 0 15px rgba(0, 200, 255, 0.5);
}

.title {
  font-size: 16px;
  margin-bottom: 8px;
  color: #00ffff;
}

.tip {
  opacity: 0.8;
}
</style>