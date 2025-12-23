import { Draw } from "ol/interaction";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";

export class CoordinatePicker {
  constructor(map) {
    this.map = map;
    this.isPicking = false;
    this.currentDraw = null;
    this.pickedCoordinates = [];
  }
  
  // 开始坐标拾取
  start() {
    // 清理之前的资源
    this.stop();
    
    this.isPicking = true;
    this.pickedCoordinates = [];
    
    // 创建简单的矢量数据源和图层
    const source = new VectorSource();
    const layer = new VectorLayer({ source });
    this.map.addLayer(layer);
    
    // 创建绘制交互（点类型）
    this.currentDraw = new Draw({
      source,
      type: 'Point'
    });
    this.map.addInteraction(this.currentDraw);
    
    // 监听绘制结束事件，获取坐标
    this.currentDraw.on('drawend', (evt) => {
      const coordinate = evt.feature.getGeometry().getCoordinates();
      this.pickedCoordinates.push(coordinate);
      console.log('Picked coordinate:', coordinate);
    });
  }
  
  // 停止坐标拾取
  stop() {
    if (this.currentDraw) {
      this.map.removeInteraction(this.currentDraw);
      this.currentDraw = null;
    }
    this.isPicking = false;
  }
  
  formatCoordinate(coord) {
    return coord.map((c) => c.toFixed(6)).join(", ");
  }

  // 获取已拾取的坐标列表
  getCoordinates() {
    return [...this.pickedCoordinates];
  }
  
  // 清除已拾取的坐标
  clearCoordinates() {
    this.pickedCoordinates = [];
  }
}