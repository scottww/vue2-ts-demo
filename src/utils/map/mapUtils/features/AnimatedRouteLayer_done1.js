// map2D/AnimatedRouteLayer.js

import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Feature from "ol/Feature";
import { LineString, Point } from "ol/geom";
import { Stroke, Style, Icon } from "ol/style";

export class AnimatedRouteLayer {
  constructor(map) {
    this.map = map;
    this.vectorSource = null;
    this.vectorLayer = null;
    this.routeFeature = null;
    this.time = 0;
    this.animationFrameId = null;
    this.coordinates = [];
    this.segmentLengths = [];
    this.totalLength = 0;

    this.options = {
      color: "#1890ff",
      width: 8,
      arrowSize: 20,
      arrowInterval: 20, // 每多少像素放一个箭头
      animationSpeed: 0.02, // 动画速度
      name: "animated_route",
      arrowSrc: require('@/assets/images/oneMapNew/arrow1.svg') // 默认朝右，白色箭头
    };

    this.instanceId = Math.random().toString(36).substr(2, 9);
    console.log(`AnimatedRouteLayer: 创建新实例 ID=${this.instanceId}`);

    this.eventListeners = {};
  }

  triggerEvent(eventName, data) {
    if (this.eventListeners[eventName]) {
      this.eventListeners[eventName].forEach(listener => listener(data));
    }
  }

  on(eventName, listener) {
    if (!this.eventListeners[eventName]) this.eventListeners[eventName] = [];
    this.eventListeners[eventName].push(listener);
  }

  off(eventName, listener) {
    if (this.eventListeners[eventName]) {
      this.eventListeners[eventName] = this.eventListeners[eventName].filter(l => l !== listener);
    }
  }

  // 计算每段长度
  calculateSegmentLengths(coords) {
    this.segmentLengths = [];
    this.totalLength = 0;
    for (let i = 0; i < coords.length - 1; i++) {
      const dx = coords[i + 1][0] - coords[i][0];
      const dy = coords[i + 1][1] - coords[i][1];
      const len = Math.sqrt(dx * dx + dy * dy);
      this.segmentLengths.push(len);
      this.totalLength += len;
    }
  }

  // 初始化图层
  initialize(coordinates, options = {}) {
    this.coordinates = coordinates;
    this.options = { ...this.options, ...options };
    if (coordinates.length < 2) return;

    this.calculateSegmentLengths(coordinates);

    this.vectorSource = new VectorSource();
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      name: this.options.name,
      zIndex: 10
    });

    const routeLine = new LineString(this.coordinates);
    this.routeFeature = new Feature({ geometry: routeLine });
    this.vectorSource.addFeature(this.routeFeature);
    this.map.addLayer(this.vectorLayer);

    this.startAnimation();
    this.triggerEvent("initialized", { layer: this.vectorLayer });
  }

  // 创建箭头样式（平滑每段分布）
  createArrowStyle() {
    const { color, width, arrowSize, arrowInterval, arrowSrc } = this.options;
    if (!this.routeFeature || this.coordinates.length < 2) return [];

    const styles = [];

    // 路线样式
    styles.push(
      new Style({
        stroke: new Stroke({ color, width })
      })
    );

    // 遍历每段线
    for (let i = 0; i < this.coordinates.length - 1; i++) {
      const start = this.coordinates[i];
      const end = this.coordinates[i + 1];
      const len = this.segmentLengths[i];
      const arrowCount = Math.max(1, Math.floor(len / arrowInterval));

      for (let j = 0; j < arrowCount; j++) {
        // fraction 插值 + 动画偏移
        const frac = ((j / arrowCount + this.time) % 1);
        const x = start[0] + (end[0] - start[0]) * frac;
        const y = start[1] + (end[1] - start[1]) * frac;
        // 计算箭头方向（弧度）
        // 注意：SVG箭头是朝右的，所以需要根据路线方向调整角度
        // OpenLayers中，Icon的rotation属性是顺时针旋转的角度（弧度）
        // 但Math.atan2返回的是逆时针角度，需要转换
        let angle = Math.atan2(end[1] - start[1], end[0] - start[0]);
        // 转换为顺时针角度
        angle = -angle;
        
        // 调试信息
        console.log(`起点: ${start}, 终点: ${end}`);
        console.log(`箭头角度: ${(angle * 180 / Math.PI).toFixed(2)}°`);

        // 调整箭头大小，确保在设置的线宽内
        const scale = Math.min(arrowSize / 10, width / 10);
        
        styles.push(
          new Style({
            geometry: new Point([x, y]),
            image: new Icon({
              src: arrowSrc,
              rotation: angle,
              rotateWithView: false, // 不要随视图旋转
              anchor: [0.5, 0.5], // 锚点设置为箭头中心，确保箭头在线路中心
              scale: scale
            })
          })
        );
      }
    }

    return styles;
  }

  updateAnimation() {
    this.time = (this.time + this.options.animationSpeed) % 1;
    if (this.routeFeature) {
      this.routeFeature.setStyle(this.createArrowStyle());
    }
    this.animationFrameId = requestAnimationFrame(this.updateAnimation.bind(this));
  }

  startAnimation() {
    this.stopAnimation();
    this.animationFrameId = requestAnimationFrame(this.updateAnimation.bind(this));
  }

  // 停止动画
  stopAnimation() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  // 测试动画是否运行
  testAnimation() {
    console.log(`AnimatedRouteLayer [${this.instanceId}]: 测试动画状态`, {
      time: this.time,
      animationFrameId: this.animationFrameId,
      routeFeature: !!this.routeFeature,
      vectorLayer: !!this.vectorLayer,
      coordinates: this.coordinates,
      options: this.options
    });
  }

  start(coordinates, options = {}) {
    this.stop();
    this.initialize(coordinates, options);
    console.log(`AnimatedRouteLayer [${this.instanceId}]: 开始显示动画路线`);
  }

  stop() {
    this.stopAnimation();
    if (this.vectorLayer) {
      this.map.removeLayer(this.vectorLayer);
      this.vectorLayer = null;
    }
    if (this.vectorSource) {
      this.vectorSource.clear();
      this.vectorSource = null;
    }
    this.routeFeature = null;
    console.log(`AnimatedRouteLayer [${this.instanceId}]: 停止显示动画路线`);
  }

  updateCoordinates(coordinates) {
    this.coordinates = coordinates;
    if (coordinates.length < 2) return;
    this.calculateSegmentLengths(coordinates);
    if (this.routeFeature) this.routeFeature.setGeometry(new LineString(coordinates));
  }

  updateOptions(options) {
    this.options = { ...this.options, ...options };
  }

  getLayer() {
    return this.vectorLayer;
  }

  destroy() {
    this.stop();
    console.log(`AnimatedRouteLayer [${this.instanceId}]: 销毁实例`);
  }
}

export default AnimatedRouteLayer;
