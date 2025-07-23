// map/features/point/PointLayerManager.js
import { BaseLayerManager } from "@/map/core/BaseLayerManager";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Style, Icon } from "ol/style";

export default class PointLayerManager extends BaseLayerManager {
  constructor(map) {
    super(map);
    this.layer = null;
  }

  init() {
    const source = new VectorSource();
    const layer = new VectorLayer({
      source,
      style: new Style({
        image: new Icon({
          src: "https://openlayers.org/en/latest/examples/data/icon.png",
          scale: 0.6
        })
      })
    });

    this.layer = layer;
    this.map.addLayer(layer);

    // 示例：加一个点
    const point = new Feature({
      geometry: new Point([120, 30])
    });
    source.addFeature(point);
  }

  destroy() {
    if (this.layer) {
      this.map.removeLayer(this.layer);
      this.layer = null;
    }
  }
}
