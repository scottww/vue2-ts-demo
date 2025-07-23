import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Feature } from "ol";
import { Polygon, MultiPolygon } from "ol/geom";
import { Style, Stroke, Fill, Text } from "ol/style";

export class PolygonManager {
  constructor(map, popupManager) {
    this.map = map;
    this.popup = popupManager;
    this.vectorLayer = new VectorLayer({
      source: new VectorSource(),
      zIndex: 9
    });
    this.lastFeature = null;
    map.addLayer(this.vectorLayer);
  }

  addPolygons(polygonList = [], options = {}) {
    const {
      fillColor = "rgba(0, 128, 0, 0.3)",
      strokeColor = "#006600",
      strokeWidth = 2,
      hoverColor = "rgba(255, 165, 0, 0.4)",
      textStyle = {}
    } = options;

    const getPolygonStyle = (fill, stroke, label = "") =>
      new Style({
        stroke: new Stroke({ color: stroke, width: strokeWidth }),
        fill: new Fill({ color: fill }),
        text: new Text({
          text: label,
          font: textStyle.font || "12px sans-serif",
          fill: new Fill({ color: textStyle.color || "#000" }),
          offsetY: textStyle.offsetY || -10
        })
      });

    const hoverStyleFn = (feature) =>
      getPolygonStyle(hoverColor, strokeColor, feature.get("name"));

    polygonList.forEach((item) => {
      const coords = item.coordinates;
      const geometry =
        item.type === "MultiPolygon"
          ? new MultiPolygon(coords)
          : new Polygon(coords);

      const feature = new Feature({
        geometry,
        name: item.name || "",
        id: item.id || ""
      });

      const style = getPolygonStyle(fillColor, strokeColor, item.name);
      feature.setStyle(style);
      feature.set("defaultStyle", style);

      this.vectorLayer.getSource().addFeature(feature);
    });

    this._enableHover(hoverStyleFn);
    this._initClickEvent();
  }

  _enableHover(getHoverStyle) {
    this.map.on("pointermove", (evt) => {
      let hit = false;
      this.map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
        if (layer === this.vectorLayer) {
          hit = true;
          if (this.lastFeature && this.lastFeature !== feature) {
            this.lastFeature.setStyle(this.lastFeature.get("defaultStyle"));
          }
          feature.setStyle(getHoverStyle(feature));
          this.lastFeature = feature;
        }
      });

      if (!hit && this.lastFeature) {
        this.lastFeature.setStyle(this.lastFeature.get("defaultStyle"));
        this.lastFeature = null;
      }
      this.map.getTargetElement().style.cursor = hit ? "pointer" : "";
    });
  }

  _initClickEvent() {
    this.map.on("click", (evt) => {
      this.map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
        if (layer === this.vectorLayer) {
          const coord = evt.coordinate;
          const name = feature.get("name");
          this.popup.showPopup(coord, `<b>${name}</b><br>这是一个面`);
        }
      });
    });
  }
}
