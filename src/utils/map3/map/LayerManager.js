// LayerManager.js - 统一图层管理（添加/获取/显隐/删除/获取 source）
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import ImageLayer from "ol/layer/Image";
import XYZ from "ol/source/XYZ";
import ImageStatic from "ol/source/ImageStatic";

export default class LayerManager {
  constructor(map) {
    this.map = map;
    this.layers = {}; // key -> layer
  }

  addLayer(key, layer) {
    if (!key || !layer) throw new Error("addLayer requires key and layer");
    this.layers[key] = layer;
    this.map.addLayer(layer);
    return layer;
  }

  getLayer(key) {
    return this.layers[key] || null;
  }

  removeLayer(key) {
    const layer = this.getLayer(key);
    if (!layer) return;
    this.map.removeLayer(layer);
    delete this.layers[key];
  }

  setVisible(key, visible) {
    const layer = this.getLayer(key);
    if (layer) layer.setVisible(!!visible);
  }

  toggleVisible(key) {
    const layer = this.getLayer(key);
    if (layer) layer.setVisible(!layer.getVisible());
  }

  getSource(key) {
    const layer = this.getLayer(key);
    return layer ? layer.getSource() : null;
  }

  // 便捷创建 Tile / Image / Vector
  addTileLayer(key, url, opts = {}) {
    const layer = new TileLayer({
      source: new XYZ({ url }),
      zIndex: opts.zIndex || 0,
      visible: opts.visible !== false
    });
    return this.addLayer(key, layer);
  }

  addImageLayer(key, url, extent, opts = {}) {
    const layer = new ImageLayer({
      source: new ImageStatic({
        url,
        imageExtent: extent,
        projection: opts.projection || "EPSG:4326"
      }),
      zIndex: opts.zIndex || 0,
      visible: opts.visible !== false
    });
    return this.addLayer(key, layer);
  }

  addVectorLayer(key, source, opts = {}) {
    const layer = new VectorLayer({
      source,
      zIndex: opts.zIndex || 10,
      visible: opts.visible !== false
    });
    return this.addLayer(key, layer);
  }
}
