<template>
  <div class="style-marker-container">
    <!-- 地图容器 -->
    <div ref="mapContainer" class="ol-map"></div>
    
    <!-- 控制面板 -->
    <div class="control-panel">
      <div class="control-group">
        <h3>标记样式选择</h3>
        <div class="style-buttons">
          <button 
            v-for="style in styleOptions" 
            :key="style.id"
            @click="changeStyle(style.id)"
            :class="['style-btn', { 'active': currentStyle === style.id }]"
            :style="{ background: style.color }"
          >
            {{ style.name }}
          </button>
        </div>
      </div>
      
      <div class="control-group">
        <h3>标记操作</h3>
        <div class="action-buttons">
          <button @click="addCustomMarker" class="action-btn add">
            <span class="icon">+</span> 添加新标记
          </button>
          <button @click="clearMarkers" class="action-btn clear">
            <span class="icon">×</span> 清空标记
          </button>
          <button @click="exportData" class="action-btn export">
            <span class="icon">↓</span> 导出数据
          </button>
        </div>
      </div>
    </div>
    
    <!-- 标记列表 -->
    <div class="marker-list">
      <div class="list-header">
        <h3>
          <span class="icon">📍</span>
          标记列表 ({{ markers.length }})
        </h3>
        <span class="toggle-btn" @click="toggleList">
          {{ showList ? '收起' : '展开' }}
        </span>
      </div>
      
      <div v-show="showList" class="list-content">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th width="60">序号</th>
                <th width="120">样式</th>
                <th>站点名称</th>
                <th width="120">距离</th>
                <th width="150">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(marker, index) in markers" 
                :key="index"
                :class="{ 'highlight': hoveredMarker === index }"
                @mouseenter="hoveredMarker = index"
                @mouseleave="hoveredMarker = null"
              >
                <td class="index">{{ index + 1 }}</td>
                <td>
                  <span 
                    class="style-indicator" 
                    :style="{ background: marker.style.color }"
                  ></span>
                  {{ marker.style.name }}
                </td>
                <td>
                  <input 
                    v-model="marker.name" 
                    class="name-input"
                    @change="updateMarker(index)"
                  />
                </td>
                <td>
                  <div class="distance-input">
                    <input 
                      v-model="marker.distance" 
                      class="distance-value"
                      @change="updateMarker(index)"
                    />
                    <select 
                      v-model="marker.unit" 
                      class="unit-select"
                      @change="updateMarker(index)"
                    >
                      <option value="mm">mm</option>
                      <option value="cm">cm</option>
                      <option value="m">m</option>
                      <option value="km">km</option>
                    </select>
                  </div>
                </td>
                <td class="actions">
                  <button @click="centerOnMarker(marker)" class="table-btn locate">
                    <span class="icon">📍</span> 定位
                  </button>
                  <button @click="removeMarker(index)" class="table-btn delete">
                    <span class="icon">🗑️</span> 删除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div v-if="markers.length === 0" class="empty-state">
            <div class="empty-icon">📍</div>
            <p>暂无标记，点击"添加新标记"创建第一个标记</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 信息弹窗 -->
    <div v-if="popupInfo" class="info-popup" :style="popupStyle">
      <div class="popup-content">
        <div class="popup-header">
          <div class="popup-title">
            <span class="popup-icon" :style="{ background: popupInfo.style.color }"></span>
            <h4>站点信息</h4>
          </div>
          <span class="popup-close" @click="closePopup">×</span>
        </div>
        <div class="popup-body">
          <div class="info-card">
            <div class="info-row">
              <span class="label">站点名称：</span>
              <span class="value">{{ popupInfo.name }}</span>
            </div>
            <div class="info-row">
              <span class="label">距离：</span>
              <span class="value distance-value">{{ popupInfo.distance }}{{ popupInfo.unit }}</span>
            </div>
            <div class="info-row">
              <span class="label">坐标：</span>
              <span class="value">{{ popupInfo.coordinates[0].toFixed(6) }}, {{ popupInfo.coordinates[1].toFixed(6) }}</span>
            </div>
            <div class="info-row">
              <span class="label">样式：</span>
              <span class="value">{{ popupInfo.style.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat, toLonLat } from 'ol/proj'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Style, Fill, Stroke, Circle, Text, RegularShape } from 'ol/style'

export default {
  name: 'StyleMarker',
  data() {
    return {
      map: null,
      vectorSource: null,
      currentStyle: 'default',
      markers: [
        {
          name: '站点名称名称',
          distance: '12',
          unit: 'mm',
          coordinates: [120.155, 30.274],
          style: { id: 'default', name: '默认', color: '#667eea' }
        },
        {
          name: '重要监测点',
          distance: '3.5',
          unit: 'm',
          coordinates: [120.165, 30.284],
          style: { id: 'important', name: '重要', color: '#f56565' }
        },
        {
          name: '维护站点',
          distance: '25',
          unit: 'cm',
          coordinates: [120.145, 30.264],
          style: { id: 'maintenance', name: '维护', color: '#48bb78' }
        },
        {
          name: '备用站点',
          distance: '8',
          unit: 'mm',
          coordinates: [120.175, 30.294],
          style: { id: 'backup', name: '备用', color: '#ed8936' }
        }
      ],
      styleOptions: [
        { id: 'default', name: '默认', color: '#667eea' },
        { id: 'important', name: '重要', color: '#f56565' },
        { id: 'warning', name: '警告', color: '#ed8936' },
        { id: 'success', name: '正常', color: '#48bb78' },
        { id: 'info', name: '信息', color: '#4299e1' },
        { id: 'special', name: '特殊', color: '#9f7aea' }
      ],
      showList: true,
      hoveredMarker: null,
      popupInfo: null,
      popupStyle: {}
    }
  },
  mounted() {
    this.initMap()
    this.addMarkers()
  },
  methods: {
    initMap() {
      // 创建地图
      this.map = new Map({
        target: this.$refs.mapContainer,
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: fromLonLat([120.155, 30.274]),
          zoom: 12
        })
      })

      // 初始化矢量源
      this.vectorSource = new VectorSource()
      
      // 创建矢量图层
      const vectorLayer = new VectorLayer({
        source: this.vectorSource,
        style: (feature) => this.getMarkerStyle(feature)
      })

      this.map.addLayer(vectorLayer)
      
      // 添加点击事件
      this.map.on('click', (event) => {
        const feature = this.map.forEachFeatureAtPixel(event.pixel, (feature) => {
          return feature
        })
        
        if (feature) {
          const properties = feature.getProperties()
          const coordinates = event.coordinate
          
          // 计算弹窗位置
          const pixel = this.map.getPixelFromCoordinate(coordinates)
          this.popupStyle = {
            left: `${pixel[0] + 10}px`,
            top: `${pixel[1] - 10}px`
          }
          
          this.popupInfo = {
            ...properties,
            coordinates: toLonLat(coordinates)
          }
        } else {
          this.closePopup()
        }
      })
      
      // 添加鼠标移动事件
      this.map.on('pointermove', (event) => {
        const pixel = this.map.getEventPixel(event.originalEvent)
        const hit = this.map.hasFeatureAtPixel(pixel)
        this.map.getTargetElement().style.cursor = hit ? 'pointer' : ''
      })
    },

    getMarkerStyle(feature) {
      const properties = feature.getProperties()
      const styleConfig = properties.style || this.styleOptions[0]
      const distance = properties.distance || ''
      const unit = properties.unit || ''
      
      return new Style({
        image: new RegularShape({
          points: 4, // 正方形
          radius: 10,
          angle: Math.PI / 4, // 旋转45度变成菱形
          fill: new Fill({
            color: styleConfig.color + 'cc'
          }),
          stroke: new Stroke({
            color: '#ffffff',
            width: 2
          })
        }),
        text: new Text({
          text: `${distance}${unit}`,
          font: 'bold 14px "Microsoft YaHei", Arial',
          fill: new Fill({
            color: '#ffffff'
          }),
          stroke: new Stroke({
            color: '#000000',
            width: 2
          }),
          offsetY: -25,
          backgroundFill: new Fill({
            color: 'rgba(0, 0, 0, 0.5)'
          }),
          padding: [2, 5],
          textAlign: 'center'
        })
      })
    },

    getAlternativeStyle(feature) {
      const properties = feature.getProperties()
      const styleConfig = properties.style || this.styleOptions[0]
      const distance = properties.distance || ''
      const unit = properties.unit || ''
      
      // 另一种样式：圆形带数字
      return new Style({
        image: new Circle({
          radius: 12,
          fill: new Fill({
            color: styleConfig.color
          }),
          stroke: new Stroke({
            color: '#ffffff',
            width: 3
          })
        }),
        text: new Text({
          text: distance,
          font: 'bold 12px Arial',
          fill: new Fill({
            color: '#ffffff'
          }),
          offsetY: 0
        })
      })
    },

    addMarkers() {
      // 清除现有要素
      this.vectorSource.clear()
      
      // 添加标记要素
      this.markers.forEach((marker, index) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat(marker.coordinates)),
          name: marker.name,
          distance: marker.distance,
          unit: marker.unit,
          style: marker.style,
          index: index
        })
        
        this.vectorSource.addFeature(feature)
      })
    },

    addCustomMarker() {
      const center = this.map.getView().getCenter()
      const coordinates = toLonLat(center)
      
      // 添加一些随机偏移，避免完全重叠
      const newCoordinates = [
        coordinates[0] + (Math.random() - 0.5) * 0.01,
        coordinates[1] + (Math.random() - 0.5) * 0.01
      ]
      
      const style = this.styleOptions.find(s => s.id === this.currentStyle) || this.styleOptions[0]
      
      const newMarker = {
        name: `新站点${this.markers.length + 1}`,
        distance: (Math.random() * 100).toFixed(1),
        unit: ['mm', 'cm', 'm'][Math.floor(Math.random() * 3)],
        coordinates: newCoordinates,
        style: { ...style }
      }
      
      this.markers.push(newMarker)
      this.addMarkers()
      
      // 自动滚动到新添加的标记
      setTimeout(() => {
        this.showList = true
      }, 100)
    },

    updateMarker(index) {
      this.addMarkers()
    },

    removeMarker(index) {
      this.markers.splice(index, 1)
      this.addMarkers()
    },

    clearMarkers() {
      if (confirm('确定要清空所有标记吗？')) {
        this.markers = []
        this.vectorSource.clear()
      }
    },

    centerOnMarker(marker) {
      this.map.getView().animate({
        center: fromLonLat(marker.coordinates),
        zoom: 15,
        duration: 1000
      })
    },

    changeStyle(styleId) {
      this.currentStyle = styleId
    },

    toggleList() {
      this.showList = !this.showList
    },

    closePopup() {
      this.popupInfo = null
    },

    exportData() {
      const data = {
        exportTime: new Date().toLocaleString(),
        markers: this.markers.map(marker => ({
          ...marker,
          coordinates: marker.coordinates.map(c => c.toFixed(6))
        }))
      }
      
      const dataStr = JSON.stringify(data, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      
      const link = document.createElement('a')
      link.href = URL.createObjectURL(dataBlob)
      link.download = `markers_${new Date().getTime()}.json`
      link.click()
    }
  },
  watch: {
    markers: {
      handler() {
        this.addMarkers()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.style-marker-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.ol-map {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.control-panel {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
  z-index: 1000;
  min-width: 300px;
  backdrop-filter: blur(10px);
}

.control-group {
  margin-bottom: 20px;
}

.control-group:last-child {
  margin-bottom: 0;
}

.control-group h3 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #4a5568;
  font-weight: 600;
}

.style-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.style-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.style-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.style-btn.active {
  box-shadow: 0 0 0 2px white, 0 0 0 4px currentColor;
  transform: translateY(-2px);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-btn {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.action-btn .icon {
  font-size: 16px;
}

.action-btn.add {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
}

.action-btn.clear {
  background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
}

.action-btn.export {
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
}

.marker-list {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  z-index: 1000;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
}

.list-header h3 {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
}

.list-header .icon {
  font-size: 20px;
}

.toggle-btn {
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.3s ease;
}

.toggle-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.list-content {
  max-height: 300px;
  overflow-y: auto;
}

.table-container {
  padding: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  position: sticky;
  top: 0;
  background: #f7fafc;
  z-index: 10;
}

th {
  padding: 16px 20px;
  text-align: left;
  color: #4a5568;
  font-weight: 600;
  font-size: 14px;
  border-bottom: 2px solid #e2e8f0;
}

tbody tr {
  transition: all 0.3s ease;
}

tbody tr:hover {
  background: #f7fafc;
}

tbody tr.highlight {
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
}

td {
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
  color: #2d3748;
}

td.index {
  font-weight: bold;
  color: #667eea;
}

.style-indicator {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: middle;
}

.name-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 14px;
  color: #2d3748;
  transition: border-color 0.3s ease;
}

.name-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.distance-input {
  display: flex;
  gap: 4px;
}

.distance-value {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 14px;
  color: #2d3748;
}

.unit-select {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 14px;
  color: #2d3748;
  background: white;
}

.actions {
  display: flex;
  gap: 8px;
}

.table-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.table-btn.locate {
  background: #4299e1;
  color: white;
}

.table-btn.delete {
  background: #f56565;
  color: white;
}

.table-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.empty-state {
  padding: 40px 20px;
  text-align: center;
  color: #a0aec0;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

.info-popup {
  position: absolute;
  z-index: 2000;
  min-width: 280px;
  animation: popupFadeIn 0.3s ease-out;
}

@keyframes popupFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.popup-content {
  background: rgba(255, 255, 255, 0.98);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.25);
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.popup-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.popup-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  box-shadow: 0 0 0 2px white;
}

.popup-header h4 {
  margin: 0;
  font-size: 16px;
}

.popup-close {
  font-size: 24px;
  cursor: pointer;
  padding: 0 8px;
  transition: color 0.3s ease;
}

.popup-close:hover {
  color: #f56565;
}

.popup-body {
  padding: 20px;
}

.info-card {
  background: #f7fafc;
  border-radius: 8px;
  padding: 16px;
}

.info-row {
  display: flex;
  margin-bottom: 12px;
  align-items: flex-start;
}

.info-row:last-child {
  margin-bottom: 0;
}

.label {
  font-weight: 600;
  color: #4a5568;
  min-width: 80px;
  font-size: 14px;
}

.value {
  color: #2d3748;
  font-size: 14px;
  flex: 1;
}

.value.distance-value {
  font-weight: bold;
  color: #667eea;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>