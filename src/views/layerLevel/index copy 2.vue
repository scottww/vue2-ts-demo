<template>
  <div class="map-container">
    <div ref="map" class="map"></div>
    <div class="zoom-info">
      当前缩放级别: {{ zoom }}
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
import { Fill, Stroke, Style, Circle as CircleStyle } from 'ol/style'

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

      // ===============================
      // 省级图层
      // ===============================
      const provinceSource = new VectorSource()

      const provinces = [
        [100, 30, 110, 40],
        [110, 30, 120, 40],
        [100, 20, 110, 30]
      ]

      provinces.forEach(p => {
        provinceSource.addFeature(
          new Feature({
            geometry: new Polygon([[
              fromLonLat([p[0], p[1]]),
              fromLonLat([p[2], p[1]]),
              fromLonLat([p[2], p[3]]),
              fromLonLat([p[0], p[3]]),
              fromLonLat([p[0], p[1]])
            ]])
          })
        )
      })

      const provinceLayer = new VectorLayer({
        source: provinceSource,
        minZoom: 0,
        maxZoom: 6,
        style: new Style({
          fill: new Fill({ color: 'rgba(0, 0, 255, 0.2)' }),
          stroke: new Stroke({ color: '#0033ff', width: 2 })
        })
      })

      // ===============================
      // 市级图层
      // ===============================
      const citySource = new VectorSource()

      const cities = [
        [102, 32, 106, 36],
        [108, 32, 112, 36],
        [112, 24, 116, 28]
      ]

      cities.forEach(c => {
        citySource.addFeature(
          new Feature({
            geometry: new Polygon([[
              fromLonLat([c[0], c[1]]),
              fromLonLat([c[2], c[1]]),
              fromLonLat([c[2], c[3]]),
              fromLonLat([c[0], c[3]]),
              fromLonLat([c[0], c[1]])
            ]])
          })
        )
      })

      const cityLayer = new VectorLayer({
        source: citySource,
        minZoom: 6,
        maxZoom: 10,
        style: new Style({
          fill: new Fill({ color: 'rgba(0, 255, 0, 0.2)' }),
          stroke: new Stroke({ color: '#00aa00', width: 2 })
        })
      })

      // ===============================
      // 站点图层
      // ===============================
      const stationSource = new VectorSource()

      const stations = [
        [104, 34],
        [109, 34],
        [114, 26],
        [111, 29]
      ]

      stations.forEach(s => {
        stationSource.addFeature(
          new Feature({
            geometry: new Point(fromLonLat(s))
          })
        )
      })

      const stationLayer = new VectorLayer({
        source: stationSource,
        minZoom: 10,
        style: new Style({
          image: new CircleStyle({
            radius: 6,
            fill: new Fill({ color: '#ff0000' }),
            stroke: new Stroke({ color: '#ffffff', width: 2 })
          })
        })
      })

      // ===============================
      // 初始化地图
      // ===============================
      this.map = new Map({
        target: this.$refs.map,
        layers: [
          new TileLayer({
            source: new OSM()
          }),
          provinceLayer,
          cityLayer,
          stationLayer
        ],
        view: new View({
          center: fromLonLat([110, 32]),
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

.zoom-info {
  position: absolute;
  top: 10px;
  left: 10px;
  background: white;
  padding: 6px 10px;
  border-radius: 4px;
}
</style>