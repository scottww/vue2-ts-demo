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
      zoom: 5,
      provinceLayer: null,
      cityLayer: null,
      stationLayer: null
    }
  },

  mounted() {
    this.initMap()
  },

  methods: {
    initMap() {
      // 省级图层（模拟面）
      const provinceSource = new VectorSource()
      provinceSource.addFeature(
        new Feature({
          geometry: new Polygon([[
            fromLonLat([100, 30]),
            fromLonLat([120, 30]),
            fromLonLat([120, 40]),
            fromLonLat([100, 40]),
            fromLonLat([100, 30])
          ]])
        })
      )

      this.provinceLayer = new VectorLayer({
        source: provinceSource,
        minZoom: 0,
        maxZoom: 7,
        style: new Style({
          fill: new Fill({ color: 'rgba(0,0,255,0.2)' }),
          stroke: new Stroke({ color: 'blue', width: 2 })
        })
      })

      // 市级图层
      const citySource = new VectorSource()
      citySource.addFeature(
        new Feature({
          geometry: new Polygon([[
            fromLonLat([105, 32]),
            fromLonLat([115, 32]),
            fromLonLat([115, 38]),
            fromLonLat([105, 38]),
            fromLonLat([105, 32])
          ]])
        })
      )

      this.cityLayer = new VectorLayer({
        source: citySource,
        minZoom: 7,
        maxZoom: 11,
        style: new Style({
          fill: new Fill({ color: 'rgba(0,255,0,0.2)' }),
          stroke: new Stroke({ color: 'green', width: 2 })
        })
      })

      // 站点图层
      const stationSource = new VectorSource()
      stationSource.addFeature(
        new Feature({
          geometry: new Point(fromLonLat([110, 35]))
        })
      )

      this.stationLayer = new VectorLayer({
        source: stationSource,
        minZoom: 11,
        style: new Style({
          image: new CircleStyle({
            radius: 6,
            fill: new Fill({ color: 'red' })
          })
        })
      })

      // 初始化地图
      this.map = new Map({
        target: this.$refs.map,
        layers: [
          new TileLayer({
            source: new OSM()
          }),
          this.provinceLayer,
          this.cityLayer,
          this.stationLayer
        ],
        view: new View({
          center: fromLonLat([110, 35]),
          zoom: this.zoom
        })
      })

      // 监听缩放变化
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