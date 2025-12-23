import { Draw } from "ol/interaction";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import Overlay from "ol/Overlay";

export class CoordinatePicker {
  constructor(map) {
    this.map = map;
    this.isPicking = false;
    this.currentDraw = null;
    this.pickedCoordinates = [];

    this.tipOverlay = this.createTipOverlay();
    this.map.addOverlay(this.tipOverlay);

    this.currentLayer = null;
    this.instanceId = Math.random().toString(36).substr(2, 9);
    console.log(`CoordinatePicker: 创建了新实例，ID为${this.instanceId}`);

    this.eventListeners = {};

    // 在构造函数中
    this.handleOutsideClick = (evt) => {
      if (this.isPicking) {
        const mapElement = this.map.getTargetElement();
        if (!mapElement.contains(evt.target)) {
          console.log(
            `CoordinatePicker [${this.instanceId}]: 外部点击，自动停止拾取`
          );
          this.stop();
        }
      }
    };
    // document.addEventListener("click", this.handleOutsideClick);
  }

  // 事件触发
  triggerEvent(eventName, data) {
    if (this.eventListeners[eventName]) {
      this.eventListeners[eventName].forEach((listener) => listener(data));
    }
  }

  on(eventName, listener) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    this.eventListeners[eventName].push(listener);
  }

  off(eventName, listener) {
    if (this.eventListeners[eventName]) {
      this.eventListeners[eventName] = this.eventListeners[eventName].filter(
        (l) => l !== listener
      );
    }
  }

  createTipOverlay() {
    const el = document.createElement("div");
    Object.assign(el.style, {
      position: "absolute",
      fontSize: "12px",
      color: "#666",
      background: "#fff",
      border: "1px solid #ccc",
      padding: "2px 4px",
      whiteSpace: "nowrap",
      zIndex: 999,
      pointerEvents: "none"
    });
    return new Overlay({
      element: el,
      offset: [8, 8],
      positioning: "bottom-left",
      stopEvent: false
    });
  }

  formatCoordinate(coord) {
    return coord.map((c) => c.toFixed(6)).join(", ");
  }

  start() {
    if (this.isPicking) return;
    this.isPicking = true;

    // 添加点击地图外部结束拾取的事件监听
    document.addEventListener("mousedown", this.handleOutsideClick, true);

    const self = this;
    const source = new VectorSource();
    const layer = new VectorLayer({ source });
    this.map.addLayer(layer);
    this.currentLayer = layer;

    this.currentDraw = new Draw({ source, type: "Point" });
    this.map.addInteraction(this.currentDraw);

    this.currentDraw.on("drawend", function (evt) {
      const coordinate = evt.feature.getGeometry().getCoordinates();
      self.pickedCoordinates.push(coordinate);
      console.log("CoordinatePicker: 新坐标已添加", coordinate);
      // 触发内部 picked 事件
      self.triggerEvent("picked", coordinate);

      // 阻止事件冒泡，避免外部 mapService 单击监听触发
      if (evt.stopPropagation) evt.stopPropagation(); // ol 事件
      if (evt.originalEvent && evt.originalEvent.stopPropagation) {
        evt.originalEvent.stopPropagation(); // 原生 DOM 事件
      }

      self.stop();
    });

    this.pointerMoveHandler = function (evt) {
      if (!evt.dragging && self.isPicking) {
        self.tipOverlay.setPosition(evt.coordinate);
        self.tipOverlay.getElement().innerText = `坐标: ${self.formatCoordinate(
          evt.coordinate
        )}`;
      }
    };
    this.map.on("pointermove", this.pointerMoveHandler);

    console.log(`CoordinatePicker [${this.instanceId}]: 开始拾取`);
  }

  stop() {
    if (!this.isPicking) return;

    if (this.currentDraw) {
      this.map.removeInteraction(this.currentDraw);
      this.currentDraw = null;
    }

    if (this.currentLayer) {
      this.map.removeLayer(this.currentLayer);
      this.currentLayer = null;
    }

    if (this.pointerMoveHandler) {
      this.map.un("pointermove", this.pointerMoveHandler);
      this.pointerMoveHandler = null;
    }

    // 移除点击地图外部结束事件监听
    document.removeEventListener("mousedown", this.handleOutsideClick, true);

    this.tipOverlay.setPosition(undefined);
    this.isPicking = false;

    console.log(`CoordinatePicker [${this.instanceId}]: 停止拾取`);
  }

  getCoordinates() {
    console.log(
      `CoordinatePicker [${this.instanceId}]: 获取坐标列表`,
      this.pickedCoordinates
    );
    return [...this.pickedCoordinates];
  }

  clearCoordinates() {
    this.pickedCoordinates = [];
    console.log(`CoordinatePicker [${this.instanceId}]: 坐标列表已清空`);
  }

  // 销毁实例，移除事件监听
  destroy() {
    this.stop();
    this.map.removeOverlay(this.tipOverlay);
    this.tipOverlay = null;
    console.log(`CoordinatePicker [${this.instanceId}]: 已销毁`);
  }
}
