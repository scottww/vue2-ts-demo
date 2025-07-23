import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Feature } from "ol";
import { LineString, MultiLineString } from "ol/geom";
import { Style, Stroke, Text, Fill } from "ol/style";

export class LineManager {
  constructor(map, popupManager) {
    this.map = map;
    this.popup = popupManager;
    this.vectorLayer = new VectorLayer({
      source: new VectorSource(),
      zIndex: 10
    });
    this.lastFeature = null;
    map.addLayer(this.vectorLayer);
  }

  addLines(lineList = [], options = {}) {
    const {
      color = "#0099FF",
      width = 3,
      hoverColor = "#FF9900",
      textStyle = {}
    } = options;

    const getLineStyle = (color, width, label = "") =>
      new Style({
        stroke: new Stroke({ color, width }),
        text: new Text({
          text: label,
          font: textStyle.font || "12px sans-serif",
          fill: new Fill({ color: textStyle.color || "#000" }),
          offsetY: textStyle.offsetY || -10
        })
      });

    const hoverStyleFn = (feature) =>
      getLineStyle(hoverColor, width + 1, feature.get("name"));

    lineList.forEach((item) => {
      const coords = item.coordinates;
      const geometry =
        item.type === "MultiLineString"
          ? new MultiLineString(coords)
          : new LineString(coords);

      const feature = new Feature({
        geometry,
        name: item.name || "",
        id: item.id || ""
      });

      const style = getLineStyle(color, width, item.name);
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
          this.popup.showPopup(coord, `<b>${name}</b><br>这是一条线`);
        }
      });
    });
  }
}
