import BaseMapService from "./BaseMapService";
import Map from "ol/Map";
import View from "ol/View";

export default class Map2DService extends BaseMapService {
  constructor(target, options = {}) {
    super(target);
    this.map = new Map({
      target: this.target,
      view: new View({
        center: options.center || [0, 0],
        zoom: options.zoom || 11,
        projection: "EPSG:4326"
      })
    });
  }

  getMapInstance() {
    return this.map;
  }

  setCenter(center, zoom) {
    this.map.getView().setCenter(center);
    if (zoom) this.map.getView().setZoom(zoom);
  }

  on(type, handler) {
    this.map.on(type, handler);
  }

  off(type, handler) {
    this.map.un(type, handler);
  }

  destroy() {
    this.map.setTarget(null);
  }
}
