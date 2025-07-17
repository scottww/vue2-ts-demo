import { Draw } from "ol/interaction";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Stroke, Fill } from "ol/style";
import { getLength, getArea } from "ol/sphere";
import { LineString } from "ol/geom";
import Overlay from "ol/Overlay";

export class MeasureTool {
  constructor(map) {
    this.map = map;
    this.draw = null;
    this.drawLayer = null;
    this.drawSource = null;
    this.nodeOverlays = [];
  }

  clear() {
    if (this.draw) this.map.removeInteraction(this.draw);
    if (this.drawLayer) this.map.removeLayer(this.drawLayer);
    this.clearNodeOverlays();
  }

  clearNodeOverlays() {
    this.nodeOverlays.forEach((overlay) => this.map.removeOverlay(overlay));
    this.nodeOverlays = [];
  }

  createNodeOverlay(coord) {
    const node = document.createElement("div");
    Object.assign(node.style, {
      width: "10px",
      height: "10px",
      backgroundColor: "#fff",
      border: "2px solid red",
      borderRadius: "50%",
      position: "absolute",
      transform: "translate(-50%, -50%)"
    });
    const overlay = new Overlay({
      element: node,
      position: coord,
      positioning: "center-center",
      stopEvent: false
    });
    this.map.addOverlay(overlay);
    this.nodeOverlays.push(overlay);
  }

  createLabelOverlay(coord, text) {
    const label = document.createElement("div");
    Object.assign(label.style, {
      fontSize: "12px",
      fontWeight: "bold",
      color: "#fff",
      backgroundColor: "#000",
      padding: "2px 4px",
      borderRadius: "4px",
      opacity: 0.8
    });
    label.innerHTML = text;
    const overlay = new Overlay({
      element: label,
      position: coord,
      positioning: "bottom-center",
      offset: [0, -6],
      stopEvent: false
    });
    this.map.addOverlay(overlay);
    this.nodeOverlays.push(overlay);
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

  start(type) {
    this.clear();

    this.drawSource = new VectorSource();
    this.drawLayer = new VectorLayer({
      source: this.drawSource,
      style: new Style({
        stroke: new Stroke({ color: "#f00", width: 2 }),
        fill: new Fill({ color: "rgba(255,0,0,0.1)" })
      }),
      zIndex: 10
    });
    this.map.addLayer(this.drawLayer);

    this.draw = new Draw({
      source: this.drawSource,
      type
    });
    this.map.addInteraction(this.draw);

    this.draw.on("drawstart", (e) => {
      const geom = e.feature.getGeometry();

      geom.on("change", () => {
        const coords =
          type === "Polygon"
            ? geom.getCoordinates()[0].slice(0, -1)
            : geom.getCoordinates();

        this.clearNodeOverlays();

        coords.forEach((c, i) => {
          this.createNodeOverlay(c);

          if (type === "LineString") {
            if (i === 0) {
              this.createLabelOverlay(c, "起点");
            } else {
              const line = new LineString(coords.slice(0, i + 1));
              const total = this.formatLength(line);
              this.createLabelOverlay(c, `${total.value} ${total.unit}`);
            }
          }
        });
      });
    });

    this.draw.on("drawend", (e) => {
      const feature = e.feature;
      const geom = feature.getGeometry();
      const coords =
        type === "Polygon"
          ? geom.getCoordinates()[0].slice(0, -1)
          : geom.getCoordinates();

      this.clearNodeOverlays();

      coords.forEach((c, i) => {
        this.createNodeOverlay(c);

        if (type === "LineString") {
          if (i === 0) {
            this.createLabelOverlay(c, "起点");
          } else {
            const line = new LineString(coords.slice(0, i + 1));
            const total = this.formatLength(line);
            this.createLabelOverlay(c, `${total.value} ${total.unit}`);
          }
        }
      });

      if (type === "Polygon") {
        const areaInfo = this.formatArea(geom);
        const center = geom.getInteriorPoint().getCoordinates();
        this.createLabelOverlay(center, `${areaInfo.value} ${areaInfo.unit}`);
      }

      if (type === "LineString" && coords.length > 1) {
        const total = this.formatLength(new LineString(coords));
        const last = coords[coords.length - 1];
        this.createLabelOverlay(last, `总长：${total.value} ${total.unit}`);
      }

      // 关闭按钮
      const closeBtn = document.createElement("div");
      closeBtn.innerText = "✖";
      Object.assign(closeBtn.style, {
        color: "red",
        background: "#fff",
        border: "1px solid red",
        borderRadius: "50%",
        width: "18px",
        height: "18px",
        textAlign: "center",
        lineHeight: "16px",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: "bold"
      });

      closeBtn.addEventListener("click", () => {
        this.drawSource.removeFeature(feature);
        this.clearNodeOverlays();
        this.map.removeInteraction(this.draw);
      });

      const closeOverlay = new Overlay({
        element: closeBtn,
        positioning: "bottom-left",
        offset: [0, -10],
        stopEvent: false
      });
      closeOverlay.setPosition(coords[coords.length - 1]);
      this.map.addOverlay(closeOverlay);
      this.nodeOverlays.push(closeOverlay);
    });
  }
}
