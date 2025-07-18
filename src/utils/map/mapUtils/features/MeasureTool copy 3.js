import { Draw } from "ol/interaction";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Stroke, Fill, Circle as CircleStyle } from "ol/style";
import { getLength, getArea } from "ol/sphere";
import { LineString } from "ol/geom";
import Overlay from "ol/Overlay";

function hexToRgba(hex, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export class MeasureTool {
  constructor(map, options = {}) {
    this.map = map;
    this.featureGroups = [];
    this.currentDraw = null;

    // 配置，支持主题色，默认蓝色
    this.options = Object.assign(
      {
        themeColor: "#3399FF",
        showDeleteButton: true,
      },
      options
    );
  }

  clearAll() {
    this.featureGroups.forEach(({ layer, overlays }) => {
      this.map.removeLayer(layer);
      overlays.forEach((ov) => this.map.removeOverlay(ov));
    });
    this.featureGroups = [];
  }

  createNodeOverlay(coord) {
    const node = document.createElement("div");
    Object.assign(node.style, {
      width: "10px",
      height: "10px",
      backgroundColor: hexToRgba(this.options.themeColor, 0.6),
      border: "2px solid #fff",
      borderRadius: "50%",
      position: "absolute",
      transform: "translate(-50%, -50%)",
      pointerEvents: "none",
      boxSizing: "border-box",
      zIndex: 1000,
    });
    return new Overlay({
      element: node,
      position: coord,
      positioning: "center-center",
      stopEvent: false,
    });
  }

  createLabelOverlay(coord, text) {
    const label = document.createElement("div");
    Object.assign(label.style, {
      fontSize: "12px",
      fontWeight: "bold",
      color: "#7a7a7a",
      backgroundColor: "#fff",
      border: "1px solid #7a7a7a",
      padding: "2px 4px",
      borderRadius: "4px",
      opacity: 0.8,
      whiteSpace: "nowrap",
      userSelect: "none",
      zIndex: 999,
      position: "absolute",
      transform: "translate(-50%, 0)",
    });
    label.innerHTML = text;
    return new Overlay({
      element: label,
      position: coord,
      positioning: "bottom-center",
      offset: [0, -6],
      stopEvent: false,
    });
  }

  createFinalLabelOverlay(coord, text) {
    const div = document.createElement("div");
    div.innerHTML = text;

    Object.assign(div.style, {
      position: "absolute",
      display: "inline",
      cursor: "inherit",
      backgroundColor: "rgb(255, 255, 255)",
      border: "1px solid rgb(255, 1, 3)",
      padding: "3px 5px",
      whiteSpace: "nowrap",
      fontSize: "12px",
      color: "rgb(51, 51, 51)",
      userSelect: "none",
      zIndex: 999,
    });

    return new Overlay({
      element: div,
      position: coord,
      positioning: "bottom-left",
      offset: [8, -8],
      stopEvent: false,
    });
  }

  formatLength(line) {
    const length = getLength(line, { projection: "EPSG:4326" });
    return length > 1000
      ? { value: (length / 1000).toFixed(2), unit: "km" }
      : { value: length.toFixed(2), unit: "m" };
  }

  formatArea(polygon) {
    const area = getArea(polygon, { projection: "EPSG:4326" });
    return area > 1000000
      ? { value: (area / 1000000).toFixed(2), unit: "km²" }
      : { value: area.toFixed(2), unit: "㎡" };
  }

  // 绘制时的样式
  createDrawStyle() {
    const c = this.options.themeColor;
    return new Style({
      stroke: new Stroke({
        color: c,
        width: 2,
        lineDash: [10, 10],
      }),
      fill: new Fill({
        color: hexToRgba(c, 0.2),
      }),
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({ color: hexToRgba(c, 0.6) }),
        stroke: new Stroke({ color: "#fff", width: 1 }),
      }),
    });
  }

  // 图层最终样式，实线实色
  createLayerStyle() {
    const c = this.options.themeColor;
    return new Style({
      stroke: new Stroke({
        color: c,
        width: 2,
      }),
      fill: new Fill({
        color: hexToRgba(c, 0.3),
      }),
    });
  }

  start(type) {
    if (this.currentDraw) {
      this.map.removeInteraction(this.currentDraw);
      this.currentDraw = null;
    }

    const source = new VectorSource();
    const layer = new VectorLayer({
      source,
      style: this.createLayerStyle(),
      zIndex: 10,
    });
    this.map.addLayer(layer);

    const draw = new Draw({
      source,
      type,
      style: this.createDrawStyle(),
    });
    this.map.addInteraction(draw);
    this.currentDraw = draw;

    const overlays = [];

    draw.on("drawstart", (e) => {
      const geom = e.feature.getGeometry();

      geom.on("change", () => {
        const coords =
          type === "Polygon"
            ? geom.getCoordinates()[0].slice(0, -1)
            : geom.getCoordinates();

        // 移除旧overlays
        overlays.forEach((ov) => this.map.removeOverlay(ov));
        overlays.length = 0;

        coords.forEach((c, i) => {
          const nodeOverlay = this.createNodeOverlay(c);
          this.map.addOverlay(nodeOverlay);
          overlays.push(nodeOverlay);

          if (type === "LineString") {
            if (i === 0) {
              const label = this.createLabelOverlay(c, "起点");
              this.map.addOverlay(label);
              overlays.push(label);
            } else {
              const line = new LineString(coords.slice(0, i + 1));
              const len = this.formatLength(line);
              const label = this.createLabelOverlay(
                c,
                `${len.value} ${len.unit}`
              );
              this.map.addOverlay(label);
              overlays.push(label);
            }
          }
        });
      });
    });

    draw.on("drawend", (e) => {
      const feature = e.feature;
      const geom = feature.getGeometry();
      const coords =
        type === "Polygon"
          ? geom.getCoordinates()[0].slice(0, -1)
          : geom.getCoordinates();

      // 清理绘制中的 overlays
      overlays.forEach((ov) => this.map.removeOverlay(ov));
      overlays.length = 0;

      coords.forEach((c, i) => {
        const nodeOverlay = this.createNodeOverlay(c);
        this.map.addOverlay(nodeOverlay);
        overlays.push(nodeOverlay);

        if (type === "LineString") {
          if (i === 0) {
            const label = this.createLabelOverlay(c, "起点");
            this.map.addOverlay(label);
            overlays.push(label);
          } else {
            const line = new LineString(coords.slice(0, i + 1));
            const len = this.formatLength(line);
            const label = this.createLabelOverlay(
              c,
              `${len.value} ${len.unit}`
            );
            this.map.addOverlay(label);
            overlays.push(label);
          }
        }
      });

      if (type === "Polygon") {
        const area = this.formatArea(geom);
        const center = geom.getInteriorPoint().getCoordinates();
        const label = this.createFinalLabelOverlay(
          center,
          `总面积：${area.value} ${area.unit}`
        );
        this.map.addOverlay(label);
        overlays.push(label);
      }

      if (type === "LineString") {
        const line = new LineString(coords);
        const lastCoord = coords[coords.length - 1];
        const length = this.formatLength(line);
        const label = this.createFinalLabelOverlay(
          lastCoord,
          `总长：${length.value} ${length.unit}`
        );
        this.map.addOverlay(label);
        overlays.push(label);
      }

      if (this.options.showDeleteButton) {
        const closeBtn = document.createElement("div");
        closeBtn.innerText = "✖";
        closeBtn.title = "清除";
        Object.assign(closeBtn.style, {
          color: "red",
          background: "#fff",
          border: "1px solid red",
          width: "14px",
          height: "14px",
          textAlign: "center",
          lineHeight: "12px",
          cursor: "pointer",
          fontSize: "12px",
          zIndex: 999,
          position: "absolute",
        });

        closeBtn.addEventListener("click", () => {
          this.map.removeLayer(layer);
          overlays.forEach((ov) => this.map.removeOverlay(ov));
          this.featureGroups = this.featureGroups.filter(
            (g) => g.feature !== feature
          );
        });

        const closeOverlay = new Overlay({
          element: closeBtn,
          positioning: "top-right",
          offset: [10, 10],
          stopEvent: false,
        });
        closeOverlay.setPosition(coords[coords.length - 1]);
        this.map.addOverlay(closeOverlay);
        overlays.push(closeOverlay);
      }

      this.featureGroups.push({ feature, layer, overlays });
      this.map.removeInteraction(draw);
      this.currentDraw = null;
    });
  }
}
