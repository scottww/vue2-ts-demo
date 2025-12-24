<template>
  <div class="image-style-marker-container">
    <!-- 地图容器 -->
    <div ref="mapContainer" class="ol-map"></div>
    
    <!-- 控制面板 -->
    <div class="control-panel">
      <div class="panel-header">
        <h3>📌 点位标记系统</h3>
        <p>点击地图添加点位，支持自定义文本</p>
      </div>
      
      <div class="panel-body">
        <div class="input-group">
          <label>标记文本：</label>
          <input 
            v-model="markerText" 
            placeholder="例如：12mm"
            class="text-input"
          />
        </div>
        
        <div class="input-group">
          <label>标记颜色：</label>
          <div class="color-picker">
            <button
              v-for="color in colorOptions"
              :key="color"
              :class="['color-btn', { 'active': selectedColor === color }]"
              :style="{ backgroundColor: color }"
              @click="selectedColor = color"
            ></button>
          </div>
        </div>
        
        <div class="input-group">
          <label>标记大小：</label>
          <input
            type="range"
            v-model="markerSize"
            min="20"
            max="60"
            class="size-slider"
          />
          <span class="size-value">{{ markerSize }}px</span>
        </div>
        
        <div class="button-group">
          <button @click="addMarkerAtCenter" class="btn primary">
            <span class="icon">+</span> 在当前视图中心添加
          </button>
          <button @click="clearAllMarkers" class="btn danger">
            <span class="icon">×</span> 清空所有标记
          </button>
          <button @click="toggleGrid" class="btn secondary">
            <span class="icon">⌗</span> {{ showGrid ? '隐藏' : '显示' }}网格
          </button>
        </div>
      </div>
    </div>
    
    <!-- 标记列表面板 -->
    <div class="marker-panel" :class="{ 'collapsed': !showPanel }">
      <div class="panel-toggle" @click="togglePanel">
        <span class="icon">{{ showPanel ? '◀' : '▶' }}</span>
        标记列表 ({{ markers.length }})
      </div>
      
      <div v-if="showPanel" class="panel-content">
        <div class="table-wrapper">
          <table class="marker-table">
            <thead>
              <tr>
                <th width="50">#</th>
                <th>标记预览</th>
                <th>文本内容</th>
                <th width="120">坐标</th>
                <th width="100">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(marker, index) in markers" 
                :key="index"
                @mouseenter="highlightMarker(index)"
                @mouseleave="unhighlightMarker(index)"
              >
                <td class="index-cell">{{ index + 1 }}</td>
                <td class="preview-cell">
                  <div 
                    class="marker-preview"
                    :style="{
                      width: `${marker.size}px`,
                      height: `${marker.size}px`,
                      backgroundColor: marker.color,
                      fontSize: `${Math.max(12, marker.size / 3)}px`
                    }"
                  >
                    {{ marker.text }}
                  </div>
                </td>
                <td>
                  <input
                    v-model="marker.text"
                    @change="updateMarkerStyle(index)"
                    class="text-edit"
                  />
                </td>
                <td class="coord-cell">
                  {{ marker.coords[0].toFixed(4) }}, {{ marker.coords[1].toFixed(4) }}
                </td>
                <td class="action-cell">
                  <button @click="centerOnMarker(index)" class="action-btn view">
                    <span class="icon">👁️</span>
                  </button>
                  <button @click="removeMarker(index)" class="action-btn delete">
                    <span class="icon">🗑️</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div v-if="markers.length === 0" class="empty-state">
            <div class="empty-icon">📍</div>
            <p>还没有添加任何标记</p>
            <p class="hint">点击地图或使用控制面板添加标记</p>
          </div>
        </div>
        
        <div class="panel-footer">
          <button @click="exportAsImage" class="export-btn">
            <span class="icon">🖼️</span> 导出为图片
          </button>
          <button @click="exportAsJson" class="export-btn">
            <span class="icon">📁</span> 导出数据
          </button>
        </div>
      </div>
    </div>
    
    <!-- 信息提示 -->
    <div v-if="showHint" class="hint-box">
      <p>💡 提示：点击地图任意位置添加标记</p>
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
import { Style, Fill, Stroke, Circle, Text } from 'ol/style'

export default {
  name: 'ImageStyleMarker',
  data() {
    return {
      map: null,
      vectorSource: null,
      markerText: '12mm',
      selectedColor: '#FF6B6B',
      markerSize: 40,
      markers: [
        {
          text: '12mm',
          color: '#FF6B6B',
          size: 40,
          coords: [120.155, 30.274]
        },
        {
          text: '5.2m',
          color: '#4ECDC4',
          size: 40,
          coords: [120.165, 30.284]
        },
        {
          text: '3.7cm',
          color: '#FFD166',
          size: 40,
          coords: [120.145, 30.264]
        },
        {
          text: '8mm',
          color: '#118AB2',
          size: 40,
          coords: [120.175, 30.294]
        }
      ],
      colorOptions: [
        '#FF6B6B', '#4ECDC4', '#FFD166', '#118AB2',
        '#06D6A0', '#EF476F', '#073B4C', '#7209B7'
      ],
      showPanel: true,
      showGrid: true,
      showHint: true,
      hoveredIndex: null
    }
  },
  mounted() {
    this.initMap()
    this.addMarkers()
    
    // 3秒后隐藏提示
    setTimeout(() => {
      this.showHint = false
    }, 3000)
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
      
      // 添加点击事件在地图上创建标记
      this.map.on('click', (event) => {
        const coords = toLonLat(event.coordinate)
        this.addMarker(coords)
      })
      
      // 添加双击事件移除标记
      this.map.on('dblclick', (event) => {
        const feature = this.map.forEachFeatureAtPixel(event.pixel, (feature) => {
          return feature
        })
        
        if (feature) {
          const index = feature.get('index')
          this.removeMarker(index)
        }
      })
      
      // 添加鼠标移动事件改变光标
      this.map.on('pointermove', (event) => {
        const pixel = this.map.getEventPixel(event.originalEvent)
        const hit = this.map.hasFeatureAtPixel(pixel)
        this.map.getTargetElement().style.cursor = hit ? 'pointer' : 'crosshair'
      })
    },

    getMarkerStyle(feature) {
      const properties = feature.getProperties()
      const text = properties.text || ''
      const color = properties.color || this.selectedColor
      const size = properties.size || this.markerSize
      const isHighlighted = properties.isHighlighted || false
      
      // 计算文本大小
      const textSize = Math.max(14, Math.floor(size / 3))
      
      return new Style({
        image: new Circle({
          radius: size / 2,
          fill: new Fill({
            color: color + (isHighlighted ? 'FF' : 'CC') // 高亮时完全显示，否则带透明度
          }),
          stroke: new Stroke({
            color: '#FFFFFF',
            width: isHighlighted ? 4 : 3
          })
        }),
        text: new Text({
          text: text,
          font: `bold ${textSize}px 'Microsoft YaHei', Arial, sans-serif`,
          fill: new Fill({
            color: '#FFFFFF'
          }),
          stroke: new Stroke({
            color: '#000000',
            width: 2
          }),
          offsetY: 0,
          padding: [2, 4],
          backgroundFill: new Fill({
            color: 'rgba(0, 0, 0, 0.3)'
          }),
          backgroundStroke: new Stroke({
            color: 'rgba(255, 255, 255, 0.5)',
            width: 1
          })
        })
      })
    },

    addMarker(coords) {
      const newMarker = {
        text: this.markerText || '标记',
        color: this.selectedColor,
        size: parseInt(this.markerSize),
        coords: coords
      }
      
      this.markers.push(newMarker)
      this.updateMarkers()
    },

    addMarkerAtCenter() {
      const center = this.map.getView().getCenter()
      const coords = toLonLat(center)
      this.addMarker(coords)
    },

    updateMarkers() {
      // 清除现有要素
      this.vectorSource.clear()
      
      // 添加标记要素
      this.markers.forEach((marker, index) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat(marker.coords)),
          text: marker.text,
          color: marker.color,
          size: marker.size,
          index: index,
          isHighlighted: this.hoveredIndex === index
        })
        
        this.vectorSource.addFeature(feature)
      })
    },

    updateMarkerStyle(index) {
      this.updateMarkers()
    },

    removeMarker(index) {
      this.markers.splice(index, 1)
      this.updateMarkers()
    },

    clearAllMarkers() {
      if (this.markers.length > 0 && confirm('确定要清空所有标记吗？')) {
        this.markers = []
        this.vectorSource.clear()
      }
    },

    centerOnMarker(index) {
      const marker = this.markers[index]
      this.map.getView().animate({
        center: fromLonLat(marker.coords),
        zoom: 15,
        duration: 1000
      })
    },

    highlightMarker(index) {
      this.hoveredIndex = index
      this.updateMarkers()
    },

    unhighlightMarker(index) {
      if (this.hoveredIndex === index) {
        this.hoveredIndex = null
        this.updateMarkers()
      }
    },

    togglePanel() {
      this.showPanel = !this.showPanel
    },

    toggleGrid() {
      this.showGrid = !this.showGrid
      // 这里可以添加网格图层的切换逻辑
    },

    exportAsImage() {
      alert('导出图片功能需要额外的实现，这里展示模拟功能')
      // 实际实现可以使用 html2canvas 或 map 的 getCanvas() 方法
    },

    exportAsJson() {
      const data = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        markers: this.markers.map(marker => ({
          ...marker,
          coords: marker.coords.map(coord => parseFloat(coord.toFixed(6)))
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
        this.updateMarkers()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.image-style-marker-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.ol-map {
  width: 100%;
  height: 100%;
  border-radius: 0;
}

.control-panel {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  width: 320px;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.panel-header {
  background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
  padding: 20px;
  color: white;
}

.panel-header h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
}

.panel-header p {
  margin: 0;
  font-size: 13px;
  opacity: 0.9;
}

.panel-body {
  padding: 20px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group:last-child {
  margin-bottom: 0;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #2d3748;
  font-weight: 500;
}

.text-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #2d3748;
  transition: all 0.3s ease;
  text-align: center;
}

.text-input:focus {
  outline: none;
  border-color: #4ECDC4;
  box-shadow: 0 0 0 3px rgba(78, 205, 196, 0.2);
}

.color-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.color-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.color-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.color-btn.active {
  transform: scale(1.2);
  box-shadow: 0 0 0 3px white, 0 0 0 5px currentColor;
}

.size-slider {
  width: calc(100% - 50px);
  height: 6px;
  border-radius: 3px;
  background: #e2e8f0;
  outline: none;
  -webkit-appearance: none;
}

.size-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4ECDC4;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.size-value {
  display: inline-block;
  width: 40px;
  text-align: right;
  font-weight: bold;
  color: #4ECDC4;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn .icon {
  font-size: 16px;
}

.btn.primary {
  background: linear-gradient(135deg, #4ECDC4 0%, #06D6A0 100%);
  color: white;
}

.btn.danger {
  background: linear-gradient(135deg, #FF6B6B 0%, #EF476F 100%);
  color: white;
}

.btn.secondary {
  background: linear-gradient(135deg, #FFD166 0%, #FF9E6D 100%);
  color: white;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.marker-panel {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  width: 500px;
  max-height: calc(100vh - 40px);
  display: flex;
  backdrop-filter: blur(10px);
}

.marker-panel.collapsed {
  width: auto;
}

.panel-toggle {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  padding: 20px 12px;
  background: linear-gradient(135deg, #118AB2 0%, #073B4C 100%);
  color: white;
  border-radius: 12px 0 0 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 14px;
}

.panel-toggle .icon {
  font-size: 16px;
}

.panel-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: 100%;
}

.table-wrapper {
  flex: 1;
  overflow: hidden;
  max-height: calc(100vh - 180px);
}

.marker-table {
  width: 100%;
  border-collapse: collapse;
}

.marker-table thead {
  position: sticky;
  top: 0;
  background: #f8fafc;
  z-index: 10;
}

.marker-table th {
  padding: 16px;
  text-align: left;
  font-size: 13px;
  color: #4a5568;
  font-weight: 600;
  border-bottom: 2px solid #e2e8f0;
}

.marker-table tbody tr {
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.3s ease;
}

.marker-table tbody tr:hover {
  background-color: rgba(78, 205, 196, 0.1);
}

.marker-table td {
  padding: 16px;
  vertical-align: middle;
}

.index-cell {
  font-weight: bold;
  color: #118AB2;
  font-size: 14px;
}

.preview-cell {
  padding: 8px 16px !important;
}

.marker-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 2px solid white;
}

.text-edit {
  width: 100%;
  padding: 8px 12px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  transition: border-color 0.3s ease;
}

.text-edit:focus {
  outline: none;
  border-color: #4ECDC4;
}

.coord-cell {
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 11px;
  color: #718096;
}

.action-cell {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.action-btn .icon {
  font-size: 16px;
}

.action-btn.view {
  background: #4ECDC4;
  color: white;
}

.action-btn.delete {
  background: #FF6B6B;
  color: white;
}

.action-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.empty-state {
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  margin: 8px 0;
  color: #a0aec0;
}

.empty-state .hint {
  font-size: 13px;
}

.panel-footer {
  padding: 16px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 10px;
}

.export-btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #f8fafc;
  color: #4a5568;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.export-btn:hover {
  background: #4ECDC4;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.hint-box {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  padding: 12px 24px;
  border-radius: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  animation: fadeInUp 0.5s ease-out;
  backdrop-filter: blur(10px);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.hint-box p {
  margin: 0;
  font-size: 14px;
  color: #2d3748;
  font-weight: 500;
}

/* 滚动条样式 */
.table-wrapper::-webkit-scrollbar {
  width: 6px;
}

.table-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.table-wrapper::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>