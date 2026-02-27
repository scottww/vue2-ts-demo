<template>
  <div class="map-container">
    <div ref="map" class="map"></div>

    <div class="panel">
      <div>当前缩放级别：{{ zoom }}</div>
      <div>0–6：区域</div>
      <div>6–10：子区域</div>
      <div>10+：站点</div>
    </div>
  </div>
</template>

<script>
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import { fromLonLat } from 'ol/proj'
import { Point, Polygon } from 'ol/geom'
import Feature from 'ol/Feature'
import { Fill, Stroke, Style, Circle as CircleStyle, Text } from 'ol/style'

export default {
  name: 'LayerLevelDemo',

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

      // ============================
      // 一级：区域图层
      // ============================
      const regionSource = new VectorSource()

      const regions = [
        { name: '区域A', extent: [100, 30, 110, 40] },
        { name: '区域B', extent: [110, 30, 120, 40] }
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
          fill: new Fill({ color: 'rgba(0, 102, 255, 0.25)' }),
          stroke: new Stroke({ color: '#0066ff', width: 2 }),
          text: new Text({
            text: feature.get('name'),
            fill: new Fill({ color: '#003366' }),
            font: '16px sans-serif'
          })
        })
      })

      // ============================
      // 二级：子区域
      // ============================
      const subSource = new VectorSource()

      const subs = [
        { name: '子区A1', center: [104, 35] },
        { name: '子区B1', center: [114, 35] }
      ]

      subs.forEach(s => {
        subSource.addFeature(
          new Feature({
            name: s.name,
            geometry: new Point(fromLonLat(s.center))
          })
        )
      })

      const subLayer = new VectorLayer({
        source: subSource,
        minZoom: 6,
        maxZoom: 10,
        style: feature => new Style({
          image: new CircleStyle({
            radius: 10,
            fill: new Fill({ color: '#00cc66' })
          }),
          text: new Text({
            text: feature.get('name'),
            offsetY: -18,
            font: '14px sans-serif',
            fill: new Fill({ color: '#004d26' })
          })
        })
      })

      // ============================
      // 三级：站点
      // ============================
      const stationSource = new VectorSource()

      const stations = [
        { name: '站点1', coord: [103, 34] },
        { name: '站点2', coord: [106, 36] },
        { name: '站点3', coord: [112, 33] },
        { name: '站点4', coord: [115, 36] }
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
            radius: 6,
            fill: new Fill({ color: '#ff3333' }),
            stroke: new Stroke({ color: '#fff', width: 2 })
          }),
          text: new Text({
            text: feature.get('name'),
            offsetY: -15,
            font: '12px sans-serif',
            fill: new Fill({ color: '#990000' })
          })
        })
      })

      // ============================
      // 初始化地图
      // ============================
      this.map = new Map({
        target: this.$refs.map,
        layers: [
          new TileLayer({
            source: new OSM()
          }),
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
  position: relative;
}

.map {
  width: 100%;
  height: 100%;
}

.panel {
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(255,255,255,0.95);
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
</style>