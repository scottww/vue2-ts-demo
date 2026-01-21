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
      color: "#1890ff", // 主线颜色
      width: 8,
      arrowSize: 12,
      arrowInterval: 25,
      animationSpeed: 0.002, // 调小更平滑
      name: "__animated_route_layer__",
      arrowSrc: require("@/assets/images/oneMapNew/arrow1.svg"),
      zIndex: 10
    };

    this.instanceId = Math.random().toString(36).substr(2, 9);
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
      this.eventListeners[eventName] = this.eventListeners[eventName].filter(
        l => l !== listener
      );
    }
  }

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

  // 根据路线总长度获取坐标和角度
  getCoordinateAtLength(distance) {
    let traveled = 0;
    for (let i = 0; i < this.segmentLengths.length; i++) {
      if (traveled + this.segmentLengths[i] >= distance) {
        const frac = (distance - traveled) / this.segmentLengths[i];
        const start = this.coordinates[i];
        const end = this.coordinates[i + 1];
        const x = start[0] + (end[0] - start[0]) * frac;
        const y = start[1] + (end[1] - start[1]) * frac;
        const angle = Math.atan2(end[1] - start[1], end[0] - start[0]);
        return { coord: [x, y], angle };
      }
      traveled += this.segmentLengths[i];
    }
    // 如果超过长度，返回最后一个点
    const last = this.coordinates[this.coordinates.length - 1];
    const prev = this.coordinates[this.coordinates.length - 2];
    const angle = Math.atan2(last[1] - prev[1], last[0] - prev[0]);
    return { coord: last, angle };
  }

  initialize(coordinates, options = {}) {
    this.coordinates = coordinates;
    this.options = { ...this.options, ...options };
    if (coordinates.length < 2) return;

    this.calculateSegmentLengths(coordinates);

    this.vectorSource = new VectorSource();
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      name: this.options.name,
      zIndex: this.options.zIndex
    });

    const routeLine = new LineString(this.coordinates);
    this.routeFeature = new Feature({ geometry: routeLine });
    this.vectorSource.addFeature(this.routeFeature);
    this.map.addLayer(this.vectorLayer);

    this.startAnimation();
    this.triggerEvent("initialized", { layer: this.vectorLayer });
  }

  createArrowStyle() {
    const { color, width, arrowSize, arrowInterval, arrowSrc } = this.options;
    if (!this.routeFeature || this.coordinates.length < 2) return [];

    const styles = [];

    // 主线渐隐效果
    styles.push(
      new Style({
        stroke: new Stroke({
          color: color,
          width
        })
      })
    );

    // 箭头数量
    const totalArrowCount = Math.max(1, Math.floor(this.totalLength / arrowInterval));
    for (let k = 0; k < totalArrowCount; k++) {
      const distance = (k * arrowInterval + this.time * this.totalLength) % this.totalLength;
      const { coord, angle } = this.getCoordinateAtLength(distance);
      const frac = k / totalArrowCount; // 用于尾部渐隐
      const scale = Math.min(arrowSize / 10, width / 10) * (0.7 + 0.3 * Math.sin(this.time * 2 * Math.PI + k));
      styles.push(
        new Style({
          geometry: new Point(coord),
          image: new Icon({
            src: arrowSrc,
            rotation: -angle,
            rotateWithView: false,
            anchor: [0.5, 0.5],
            scale: scale,
            opacity: 0.3 + 0.7 * (1 - frac) // 尾部渐隐
          })
        })
      );
    }

    return styles;
  }

  setZIndex(zIndex) {
    if (this.vectorLayer) {
      this.vectorLayer.setZIndex(zIndex);
      this.options.zIndex = zIndex;
    }
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

  stopAnimation() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  start(coordinates, options = {}) {
    this.stop();
    this.initialize(coordinates, options);
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
  }

  updateCoordinates(coordinates) {
    this.coordinates = coordinates;
    if (coordinates.length < 2) return;
    this.calculateSegmentLengths(coordinates);
    if (this.routeFeature)
      this.routeFeature.setGeometry(new LineString(coordinates));
  }

  updateOptions(options) {
    this.options = { ...this.options, ...options };
  }

  getLayer() {
    return this.vectorLayer;
  }

  destroy() {
    this.stop();
  }
}

export default AnimatedRouteLayer;
