<template>
  <div class="point-label-container">
    <!-- 地图容器 -->
    <div ref="mapContainer" class="ol-map"></div>
    
    <!-- 标签样式控制 -->
    <div class="label-controls">
      <div class="control-card">
        <h3 class="card-title">
          <span class="icon">🏷️</span>
          标签样式设置
        </h3>
        
        <div class="control-group">
          <label class="control-label">
            <span class="label-icon">📝</span>
            标签内容
          </label>
          <div class="label-content-input">
            <input 
              v-model="labelContent"
              class="content-input"
              placeholder="例如：站点名称 | 12mm"
            />
            <button @click="applyToAll" class="apply-btn">应用到所有</button>
          </div>
        </div>
        
        <div class="control-group">
          <label class="control-label">
            <span class="label-icon">🎨</span>
            文本样式
          </label>
          <div class="style-controls">
            <div class="style-row">
              <span class="style-label">字体大小</span>
              <input 
                type="range" 
                v-model="fontSize" 
                min="10" 
                max="24"
                class="style-slider"
              />
              <span class="style-value">{{ fontSize }}px</span>
            </div>
            <div class="style-row">
              <span class="style-label">字体粗细</span>
              <select v-model="fontWeight" class="style-select">
                <option value="normal">常规</option>
                <option value="bold">加粗</option>
                <option value="bolder">特粗</option>
              </select>
            </div>
            <div class="style-row">
              <span class="style-label">文本颜色</span>
              <input 
                type="color" 
                v-model="textColor"
                class="color-picker"
              />
            </div>
          </div>
        </div>
        
        <div class="control-group">
          <label class="control-label">
            <span class="label-icon">🔄</span>
            标签位置
          </label>
          <div class="position-controls">
            <div class="position-grid">
              <button 
                v-for="pos in positionOptions"
                :key="pos.value"
                :class="['pos-btn', { 'active': labelPosition === pos.value }]"
                @click="labelPosition = pos.value"
                :title="pos.label"
              >
                {{ pos.icon }}
              </button>
            </div>
          </div>
        </div>
        
        <div class="control-group">
          <label class="control-label">
            <span class="label-icon">📍</span>
            标记点样式
          </label>
          <div class="marker-controls">
            <div class="marker-row">
              <span class="marker-label">点大小</span>
              <input 
                type="range" 
                v-model="pointSize" 
                min="4" 
                max="20"
                class="marker-slider"
              />
              <span class="marker-value">{{ pointSize }}px</span>
            </div>
            <div class="marker-row">
              <span class="marker-label">点颜色</span>
              <input 
                type="color" 
                v-model="pointColor"
                class="color-picker"
              />
            </div>
          </div>
        </div>
        
        <div class="action-buttons">
          <button @click="addNewPoint" class="action-btn add">
            <span class="btn-icon">+</span>
            添加新点位
          </button>
          <button @click="exportLabels" class="action-btn export">
            <span class="btn-icon">📤</span>
            导出标签
          </button>
          <button @click="toggleLabels" class="action-btn toggle">
            <span class="btn-icon">{{ showLabels ? '👁️' : '👁️‍🗨️' }}</span>
            {{ showLabels ? '隐藏' : '显示' }}标签
          </button>
        </div>
      </div>
    </div>
    
    <!-- 标签列表 -->
    <div class="labels-panel" :class="{ 'collapsed': !showPanel }">
      <div class="panel-header" @click="togglePanel">
        <span class="panel-icon">{{ showPanel ? '📋' : '📝' }}</span>
        <h3 class="panel-title">点位标签 ({{ points.length }})</h3>
        <span class="panel-toggle">{{ showPanel ? '▼' : '▲' }}</span>
      </div>
      
      <div v-if="showPanel" class="panel-content">
        <div class="labels-list">
          <div 
            v-for="(point, index) in points"
            :key="index"
            class="label-item"
            :class="{ 'active': activePoint === index }"
            @mouseenter="highlightPoint(index)"
            @mouseleave="unhighlightPoint(index)"
          >
            <div class="label-preview">
              <div class="point-visual">
                <div 
                  class="point-dot"
                  :style="{ backgroundColor: point.color }"
                ></div>
                <div class="label-text">
                  {{ point.label }}
                </div>
              </div>
            </div>
            
            <div class="label-actions">
              <input 
                v-model="point.label"
                @change="updatePointLabel(index)"
                class="label-edit"
                placeholder="编辑标签..."
              />
              
              <div class="action-icons">
                <button 
                  @click="centerOnPoint(index)"
                  class="icon-btn locate"
                  title="定位"
                >
                  🔍
                </button>
                <button 
                  @click="editPoint(index)"
                  class="icon-btn edit"
                  title="编辑"
                >
                  ✏️
                </button>
                <button 
                  @click="deletePoint(index)"
                  class="icon-btn delete"
                  title="删除"
                >
                  🗑️
                </button>
              </div>
            </div>
            
            <div class="label-coords">
              <span class="coord-text">
                {{ point.coords[0].toFixed(4) }}, {{ point.coords[1].toFixed(4) }}
              </span>
            </div>
          </div>
          
          <div v-if="points.length === 0" class="empty-labels">
            <div class="empty-icon">📍</div>
            <p class="empty-text">暂无点位标签</p>
            <p class="empty-hint">点击"添加新点位"开始添加</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 提示信息 -->
    <div v-if="showInstructions" class="instructions">
      <div class="instructions-content">
        <p>💡 <strong>使用说明：</strong></p>
        <ul>
          <li>点击地图添加新的点位</li>
          <li>右侧面板可以编辑每个点位的标签</li>
          <li>左侧控制面板调整标签样式</li>
          <li>双击地图上的点位可以删除它</li>
        </ul>
        <button @click="showInstructions = false" class="close-instructions">
          知道了
        </button>
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
import { Style, Fill, Stroke, Circle, Text } from 'ol/style'

export default {
  name: 'PointLabelMap',
  data() {
    return {
      map: null,
      vectorSource: null,
      
      // 标签样式配置
      labelContent: '站点名称名称 | 12mm',
      fontSize: 14,
      fontWeight: 'bold',
      textColor: '#000000',
      labelPosition: 'top',
      pointSize: 8,
      pointColor: '#FF6B6B',
      
      // 点位数据
      points: [
        {
          label: '站点A | 12mm',
          coords: [120.155, 30.274],
          color: '#FF6B6B'
        },
        {
          label: '站点B | 1.2m',
          coords: [120.165, 30.284],
          color: '#4ECDC4'
        },
        {
          label: '站点C | 3.5cm',
          coords: [120.145, 30.264],
          color: '#FFD166'
        },
        {
          label: '站点D | 8mm',
          coords: [120.175, 30.294],
          color: '#118AB2'
        }
      ],
      
      // 位置选项
      positionOptions: [
        { value: 'top', label: '上方', icon: '↑' },
        { value: 'bottom', label: '下方', icon: '↓' },
        { value: 'left', label: '左侧', icon: '←' },
        { value: 'right', label: '右侧', icon: '→' },
        { value: 'top-left', label: '左上', icon: '↖' },
        { value: 'top-right', label: '右上', icon: '↗' },
        { value: 'bottom-left', label: '左下', icon: '↙' },
        { value: 'bottom-right', label: '右下', icon: '↘' }
      ],
      
      showLabels: true,
      showPanel: true,
      activePoint: null,
      showInstructions: true
    }
  },
  mounted() {
    this.initMap()
    this.renderPoints()
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
        style: (feature) => this.getPointStyle(feature)
      })

      this.map.addLayer(vectorLayer)
      
      // 添加点击事件
      this.map.on('click', (event) => {
        const coords = toLonLat(event.coordinate)
        this.addPoint(coords)
      })
      
      // 添加双击事件删除点位
      this.map.on('dblclick', (event) => {
        const feature = this.map.forEachFeatureAtPixel(event.pixel, (feature) => {
          return feature
        })
        
        if (feature) {
          const index = feature.get('index')
          this.deletePoint(index)
        }
      })
    },
    
    getPointStyle(feature) {
      const properties = feature.getProperties()
      const label = properties.label || ''
      const pointColor = properties.color || this.pointColor
      const isActive = properties.isActive || false
      
      if (!this.showLabels) {
        // 不显示标签时，只显示点
        return new Style({
          image: new Circle({
            radius: this.pointSize,
            fill: new Fill({
              color: pointColor
            }),
            stroke: new Stroke({
              color: '#FFFFFF',
              width: isActive ? 3 : 2
            })
          })
        })
      }
      
      // 计算文本偏移量
      const offset = this.getTextOffset()
      
      return new Style({
        image: new Circle({
          radius: this.pointSize,
          fill: new Fill({
            color: pointColor
          }),
          stroke: new Stroke({
            color: '#FFFFFF',
            width: isActive ? 3 : 2
          })
        }),
        text: new Text({
          text: label,
          font: `${this.fontWeight} ${this.fontSize}px "Microsoft YaHei", Arial, sans-serif`,
          fill: new Fill({
            color: this.textColor
          }),
          stroke: new Stroke({
            color: '#FFFFFF',
            width: 3
          }),
          offsetX: offset.x,
          offsetY: offset.y,
          padding: [4, 8],
          backgroundFill: new Fill({
            color: 'rgba(255, 255, 255, 0.8)'
          }),
          backgroundStroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.1)',
            width: 1
          })
        })
      })
    },
    
    getTextOffset() {
      const baseOffset = 20
      switch (this.labelPosition) {
        case 'top':
          return { x: 0, y: -baseOffset }
        case 'bottom':
          return { x: 0, y: baseOffset }
        case 'left':
          return { x: -baseOffset, y: 0 }
        case 'right':
          return { x: baseOffset, y: 0 }
        case 'top-left':
          return { x: -baseOffset, y: -baseOffset }
        case 'top-right':
          return { x: baseOffset, y: -baseOffset }
        case 'bottom-left':
          return { x: -baseOffset, y: baseOffset }
        case 'bottom-right':
          return { x: baseOffset, y: baseOffset }
        default:
          return { x: 0, y: -baseOffset }
      }
    },
    
    renderPoints() {
      // 清除现有要素
      this.vectorSource.clear()
      
      // 添加点位要素
      this.points.forEach((point, index) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat(point.coords)),
          label: point.label,
          color: point.color,
          index: index,
          isActive: this.activePoint === index
        })
        
        this.vectorSource.addFeature(feature)
      })
    },
    
    addPoint(coords) {
      const newPoint = {
        label: this.labelContent,
        coords: coords,
        color: this.pointColor
      }
      
      this.points.push(newPoint)
      this.renderPoints()
    },
    
    addNewPoint() {
      const center = this.map.getView().getCenter()
      const coords = toLonLat(center)
      
      // 添加一些随机偏移
      const newCoords = [
        coords[0] + (Math.random() - 0.5) * 0.01,
        coords[1] + (Math.random() - 0.5) * 0.01
      ]
      
      this.addPoint(newCoords)
    },
    
    updatePointLabel(index) {
      this.renderPoints()
    },
    
    centerOnPoint(index) {
      const point = this.points[index]
      this.map.getView().animate({
        center: fromLonLat(point.coords),
        zoom: 15,
        duration: 1000
      })
    },
    
    highlightPoint(index) {
      this.activePoint = index
      this.renderPoints()
    },
    
    unhighlightPoint(index) {
      if (this.activePoint === index) {
        this.activePoint = null
        this.renderPoints()
      }
    },
    
    editPoint(index) {
      this.activePoint = index
      const point = this.points[index]
      this.labelContent = point.label
      this.pointColor = point.color
      this.renderPoints()
    },
    
    deletePoint(index) {
      if (confirm('确定要删除这个点位吗？')) {
        this.points.splice(index, 1)
        if (this.activePoint === index) {
          this.activePoint = null
        }
        this.renderPoints()
      }
    },
    
    applyToAll() {
      this.points.forEach(point => {
        point.label = this.labelContent
      })
      this.renderPoints()
    },
    
    toggleLabels() {
      this.showLabels = !this.showLabels
      this.renderPoints()
    },
    
    togglePanel() {
      this.showPanel = !this.showPanel
    },
    
    exportLabels() {
      const data = {
        exportTime: new Date().toLocaleString(),
        style: {
          fontSize: this.fontSize,
          fontWeight: this.fontWeight,
          textColor: this.textColor,
          labelPosition: this.labelPosition
        },
        points: this.points.map(point => ({
          label: point.label,
          coords: point.coords.map(coord => parseFloat(coord.toFixed(6))),
          color: point.color
        }))
      }
      
      const dataStr = JSON.stringify(data, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      
      const link = document.createElement('a')
      link.href = URL.createObjectURL(dataBlob)
      link.download = `labels_${new Date().getTime()}.json`
      link.click()
    }
  },
  watch: {
    fontSize() { this.renderPoints() },
    fontWeight() { this.renderPoints() },
    textColor() { this.renderPoints() },
    labelPosition() { this.renderPoints() },
    pointSize() { this.renderPoints() },
    pointColor() { this.renderPoints() },
    points: {
      handler() { this.renderPoints() },
      deep: true
    }
  }
}
</script>

<style scoped>
.point-label-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.ol-map {
  width: 100%;
  height: 100%;
}

/* 标签样式控制 */
.label-controls {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 320px;
  z-index: 1000;
}

.control-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.card-title {
  margin: 0;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.control-group {
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.control-group:last-child {
  border-bottom: none;
}

.control-label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  font-weight: 600;
  color: #2d3748;
}

.label-icon {
  font-size: 18px;
}

.label-content-input {
  display: flex;
  gap: 10px;
}

.content-input {
  flex: 1;
  padding: 10px 14px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
}

.content-input:focus {
  outline: none;
  border-color: #667eea;
}

.apply-btn {
  padding: 10px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.apply-btn:hover {
  background: #5a67d8;
  transform: translateY(-2px);
}

.style-controls, .marker-controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.style-row, .marker-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.style-label, .marker-label {
  min-width: 70px;
  font-size: 13px;
  color: #4a5568;
}

.style-slider, .marker-slider {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: #e2e8f0;
  -webkit-appearance: none;
}

.style-slider::-webkit-slider-thumb,
.marker-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #667eea;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.style-value, .marker-value {
  min-width: 40px;
  font-weight: 600;
  color: #667eea;
  text-align: right;
}

.style-select {
  padding: 8px 12px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  color: #2d3748;
  background: white;
  flex: 1;
}

.color-picker {
  width: 40px;
  height: 40px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  background: transparent;
}

.position-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.pos-btn {
  width: 40px;
  height: 40px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pos-btn:hover {
  border-color: #667eea;
  transform: translateY(-2px);
}

.pos-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.action-btn {
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.action-btn.add {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
}

.action-btn.export {
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;
}

.action-btn.toggle {
  background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
  color: white;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.btn-icon {
  font-size: 16px;
}

/* 标签列表面板 */
.labels-panel {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 380px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.labels-panel.collapsed {
  width: auto;
}

.panel-header {
  padding: 20px;
  background: linear-gradient(135deg, #4ECDC4 0%, #06D6A0 100%);
  color: white;
  border-radius: 16px 16px 0 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel-icon {
  font-size: 20px;
}

.panel-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  flex: 1;
  text-align: center;
}

.panel-toggle {
  font-size: 12px;
}

.panel-content {
  max-height: calc(100vh - 200px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.labels-list {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.label-item {
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  background: white;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.label-item:hover {
  border-color: #4ECDC4;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.label-item.active {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

.label-preview {
  margin-bottom: 12px;
}

.point-visual {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background: #f8fafc;
  border-radius: 8px;
}

.point-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
}

.label-text {
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.label-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.label-edit {
  flex: 1;
  padding: 10px 14px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #2d3748;
}

.label-edit:focus {
  outline: none;
  border-color: #667eea;
}

.action-icons {
  display: flex;
  gap: 8px;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: #f8fafc;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.icon-btn.locate:hover {
  background: #4ECDC4;
  color: white;
}

.icon-btn.edit:hover {
  background: #667eea;
  color: white;
}

.icon-btn.delete:hover {
  background: #f56565;
  color: white;
}

.label-coords {
  padding: 8px;
  background: #f8fafc;
  border-radius: 6px;
}

.coord-text {
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 11px;
  color: #718096;
}

.empty-labels {
  text-align: center;
  padding: 40px 20px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-text {
  font-size: 16px;
  color: #4a5568;
  font-weight: 600;
  margin-bottom: 8px;
}

.empty-hint {
  font-size: 13px;
  color: #a0aec0;
}

/* 提示信息 */
.instructions {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  padding: 20px;
  z-index: 1000;
  backdrop-filter: blur(10px);
  max-width: 400px;
  animation: slideInUp 0.5s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.instructions-content p {
  margin: 0 0 10px 0;
  font-weight: 600;
  color: #2d3748;
}

.instructions-content ul {
  margin: 10px 0 20px 0;
  padding-left: 20px;
  color: #4a5568;
}

.instructions-content li {
  margin-bottom: 6px;
  font-size: 14px;
}

.close-instructions {
  width: 100%;
  padding: 10px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.close-instructions:hover {
  background: #5a67d8;
}

/* 滚动条样式 */
.labels-list::-webkit-scrollbar {
  width: 6px;
}

.labels-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.labels-list::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.labels-list::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>