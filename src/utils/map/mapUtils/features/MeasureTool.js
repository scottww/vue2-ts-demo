// src/features/MeasureTool.js
import { Draw, Modify } from "ol/interaction";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Stroke, Fill, Circle as CircleStyle, Text } from "ol/style";
import { getLength, getArea } from "ol/sphere";
import { unByKey } from "ol/Observable";

export class MeasureTool {
  constructor(map, options = {}) {
    this.map = map;
    this.type = null;
    this.draw = null;
    this.drawEndKey = null;
    this.helpTooltip = null;
    this.measureLayer = new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        fill: new Fill({ color: "rgba(255, 255, 255, 0.4)" }),
        stroke: new Stroke({ color: "#ffcc33", width: 2 }),
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({ color: "#ffcc33" })
        })
      })
    });
    this.map.addLayer(this.measureLayer);
    this.options = options;
  }

  startMeasure(type = "LineString") {
    this.clear();

    this.type = type;
    const source = this.measureLayer.getSource();

    this.draw = new Draw({
      source,
      type,
      style: (feature) => this.getMeasureStyle(feature)
    });

    this.map.addInteraction(this.draw);

    // ✅ 独立并保存事件引用
    const drawEndFn = (evt) => {
      const geom = evt.feature.getGeometry();
      const label = this.formatMeasure(geom);
      evt.feature.set("label", label);
      evt.feature.setStyle(this.getMeasureStyle(evt.feature)); // 刷新样式
    };

    // ✅ 保存事件句柄以便解绑
    this.drawEndKey = this.draw.on("drawend", drawEndFn);
  }

  formatMeasure(geometry) {
    if (!geometry) return "";
    if (geometry.getType() === "Polygon") {
      const area = getArea(geometry);
      return area > 10000
        ? (area / 1000000).toFixed(2) + " km²"
        : area.toFixed(0) + " m²";
    } else if (geometry.getType() === "LineString") {
      const length = getLength(geometry);
      return length > 1000
        ? (length / 1000).toFixed(2) + " km"
        : length.toFixed(0) + " m";
    }
    return "";
  }

  getMeasureStyle(feature) {
    const geometry = feature.getGeometry();
    const text = feature.get("label") || this.formatMeasure(geometry);

    return new Style({
      fill: new Fill({ color: "rgba(255,255,255,0.2)" }),
      stroke: new Stroke({ color: "#ff0000", width: 2 }),
      text: new Text({
        font: "14px sans-serif",
        fill: new Fill({ color: "#000" }),
        backgroundFill: new Fill({ color: "rgba(255,255,255,0.6)" }),
        padding: [3, 3, 3, 3],
        offsetY: -20,
        textAlign: "center",
        text: text
      })
    });
  }

  clear() {
    // if (this.draw) {
    //   this.map.removeInteraction(this.draw);
    //   this.draw = null;
    // }
    // this.measureLayer.getSource().clear();

    if (this.draw) {
      this.map.removeInteraction(this.draw);

      // ✅ 解绑事件
      if (this.drawEndKey) {
        unByKey(this.drawEndKey);
        this.drawEndKey = null;
      }

      this.draw = null;
    }

    this.measureLayer.getSource().clear();
  }

  destroy() {
    this.clear();
    this.map.removeLayer(this.measureLayer);
  }
}
