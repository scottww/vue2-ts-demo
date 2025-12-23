import { Draw, Select } from "ol/interaction";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Circle, Fill, Stroke } from "ol/style";
import Overlay from "ol/Overlay";
import { Point } from "ol/geom";
import Feature from "ol/Feature";

export class CoordinatePicker {
  constructor(map) {
    this.map = map;
    this.isPicking = false;
    this.currentDraw = null;
    this.pickedCoordinates = [];
    this.disabledInteractions = null;

    this.markersLayer = null;
    this.markersSource = null;

    this.liveTipOverlay = this.createLiveTipOverlay();
    this.map.addOverlay(this.liveTipOverlay);

    this.resultOverlay = this.createResultOverlay();
    this.map.addOverlay(this.resultOverlay);

    // 点击地图外部结束拾取的事件处理函数
    this.handleOutsideClick = (event) => {
      if (this.isPicking) {
        const mapElement = this.map.getTargetElement();
        if (!mapElement.contains(event.target)) {
          this.stop();
        }
      }
    };

    // 坐标拾取回调函数
    this.onCoordinatePicked = null;
    this.onPickingComplete = null;
  }

  createLiveTipOverlay() {
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
    el.innerText = "单击拾取坐标，双击结束拾取";
    return new Overlay({
      element: el,
      offset: [8, 8],
      positioning: "bottom-left",
      stopEvent: false,
      position: undefined
    });
  }

  createResultOverlay() {
    const el = document.createElement("div");
    Object.assign(el.style, {
      position: "absolute",
      fontSize: "12px",
      color: "#333",
      background: "#fff",
      border: "1px solid #999",
      padding: "4px 8px",
      borderRadius: "4px",
      whiteSpace: "nowrap",
      zIndex: 999,
      pointerEvents: "none"
    });
    return new Overlay({
      element: el,
      offset: [8, 8],
      positioning: "bottom-left",
      stopEvent: false,
      position: undefined
    });
  }

  createMarkerStyle() {
    return new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({ color: "#fff" }),
        stroke: new Stroke({ color: "#2196F3", width: 2 })
      })
    });
  }

  createLabelStyle(text) {
    return new Style({
      text: {
        text: text,
        font: "12px sans-serif",
        fill: new Fill({ color: "#333" }),
        stroke: new Stroke({ color: "#fff", width: 2 }),
        offsetY: -15
      }
    });
  }

  formatCoordinate(coord) {
    return coord.map((c) => c.toFixed(6)).join(", ");
  }

  clearResources() {
    // 移除绘制交互
    if (this.currentDraw) {
      this.map.removeInteraction(this.currentDraw);
      this.currentDraw = null;
    }

    // 移除标记图层
    if (this.markersLayer) {
      this.map.removeLayer(this.markersLayer);
      this.markersLayer = null;
      this.markersSource = null;
    }

    // 恢复之前禁用的交互
    if (this.disabledInteractions && this.disabledInteractions.length > 0) {
      this.disabledInteractions.forEach((interaction) => {
        if (interaction) {
          this.map.addInteraction(interaction);
        }
      });
      this.disabledInteractions = null;
    }

    // 移除点击地图外部结束拾取的事件监听
    document.removeEventListener("mousedown", this.handleOutsideClick, true);

    // 隐藏覆盖物
    this.liveTipOverlay.setPosition(undefined);
    this.resultOverlay.setPosition(undefined);

    // 重置状态
    this.isPicking = false;
    this.pickedCoordinates = [];
  }

  start(options = {}) {
    this.clearResources();
    this.isPicking = true;

    // 设置回调函数
    this.onCoordinatePicked = options.onCoordinatePicked || null;
    this.onPickingComplete = options.onPickingComplete || null;

    // 添加点击地图外部结束拾取的事件监听
    document.addEventListener("mousedown", this.handleOutsideClick, true);

    // 暂时禁用可能干扰的交互
    this.disabledInteractions = [];
    this.map.getInteractions().forEach((interaction) => {
      if (!interaction) return;

      const interactionType = interaction.constructor.name;
      if (interactionType === "Select" || interactionType === "Modify") {
        this.map.removeInteraction(interaction);
        this.disabledInteractions.push(interaction);
      }
    });

    // 创建标记图层
    this.markersSource = new VectorSource();
    this.markersLayer = new VectorLayer({
      source: this.markersSource,
      style: (feature) => {
        const styles = [this.createMarkerStyle()];
        const label = feature.get("label");
        if (label) {
          styles.push(this.createLabelStyle(label));
        }
        return styles;
      },
      zIndex: 20
    });
    this.map.addLayer(this.markersLayer);

    // 创建绘制交互（点类型）
    this.currentDraw = new Draw({
      source: this.markersSource,
      type: "Point",
      style: this.createMarkerStyle()
    });
    this.map.addInteraction(this.currentDraw);

    // 监听绘制事件
    this.currentDraw.on("drawend", (evt) => {
      const coordinate = evt.feature.getGeometry().getCoordinates();
      this.pickedCoordinates.push(coordinate);

      // 设置标记标签
      evt.feature.set("label", `P${this.pickedCoordinates.length}`);

      // 更新结果显示
      this.updateResultDisplay(coordinate);

      // 触发坐标拾取回调
      if (this.onCoordinatePicked) {
        this.onCoordinatePicked(coordinate, this.pickedCoordinates);
      }
    });

    // 监听地图指针移动
    this.map.on("pointermove", (evt) => {
      if (!evt.dragging && this.isPicking) {
        this.liveTipOverlay.setPosition(evt.coordinate);
        this.liveTipOverlay.getElement().innerText = `坐标: ${this.formatCoordinate(
          evt.coordinate
        )}`;
      }
    });

    // 显示提示信息
    this.liveTipOverlay.getElement().innerText = "单击拾取坐标，双击结束拾取";
  }

  stop() {
    this.clearResources();

    // 触发拾取完成回调
    if (this.onPickingComplete) {
      this.onPickingComplete(this.pickedCoordinates);
    }
  }

  updateResultDisplay(coordinate) {
    const formattedCoord = this.formatCoordinate(coordinate);
    const resultText = `已拾取 ${this.pickedCoordinates.length} 个坐标\n最新坐标: ${formattedCoord}`;
    this.resultOverlay.getElement().innerText = resultText;
    this.resultOverlay.setPosition(coordinate);
  }

  getPickedCoordinates() {
    return [...this.pickedCoordinates];
  }

  clearPickedCoordinates() {
    this.pickedCoordinates = [];
    if (this.markersSource) {
      this.markersSource.clear();
    }
    this.resultOverlay.setPosition(undefined);
  }
}
