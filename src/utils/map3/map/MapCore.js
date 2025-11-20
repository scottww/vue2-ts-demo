// MapCore.js - 负责创建 ol.Map 实例（最基础）
import Map from "ol/Map";
import View from "ol/View";
import { defaults as defaultControls } from "ol/control";

export default class MapCore {
  /**
   * @param {string|HTMLElement} target - 地图容器 id 或 dom
   * @param {Object} options - { center: [lng,lat], zoom: number, projection: string }
   */
  constructor(target, options = {}) {
    this.map = new Map({
      target,
      view: new View({
        center: options.center || [0, 0],
        zoom: options.zoom || 4,
        projection: options.projection || "EPSG:4326"
      }),
      controls: options.controls || defaultControls(),
      layers: options.layers || []
    });
  }

  getMap() {
    return this.map;
  }
}
