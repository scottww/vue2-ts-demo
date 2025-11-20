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
    // if (!key || !layer) throw new Error("addLayer requires key and layer");
    // this.layers[key] = layer;
    // this.map.addLayer(layer);
    // return layer;

    // 防止设置重复 key
    if (!key || !layer) throw new Error("addLayer requires key and layer");
    if (this.layers[key])
      throw new Error(`Layer with key "${key}" already exists`);
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

  addBaseLayer0(mapType, tk = "a76b9ea6e49fb0eecdb1ed34d1e75930") {
    // const tileUrl = `https://tile.osm.org/{z}/{x}/{y}.png`;
    // const tk = `a76b9ea6e49fb0eecdb1ed34d1e75930`;
    // switch (maptype) {
    //   case "TDT_vec": //矢量图
    //     tileUrl = `http://t{0-6}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=${tk}`;
    //   case "TDT_vec_anno": //矢量图注记
    //     tileUrl = `http://t{0-6}.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=${tk}`;
    //   case "TDT_img": //影像图
    //     tileUrl = `http://t{0-6}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=${tk}`;
    //   case "TDT_img_anno": //影像图注记
    //     tileUrl = `http://t{0-6}.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=${tk}`;
    // }

    const urls = {
      OSM: "https://tile.osm.org/{z}/{x}/{y}.png",
      //矢量图
      TDT_vec: `http://t{0-6}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=${tk}`,
      //矢量图注记
      TDT_vec_anno: `http://t{0-6}.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=${tk}`,
      //影像图
      TDT_img: `http://t{0-6}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=${tk}`,
      //影像图注记
      TDT_img_anno: `http://t{0-6}.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=${tk}`
    };

    const zIndexMap = {
      OSM: 0,
      TDT_vec: 0,
      TDT_vec_anno: 1,
      TDT_img: 0,
      TDT_img_anno: 1
    };
    const url = urls[mapType];
    if (!url) {
      console.warn(`未识别的地图类型: ${mapType}`);
      return null;
    }

    const tileLayer = new TileLayer({
      source: new XYZ({ url }),
      zIndex: zIndexMap[mapType] ?? 0
    });

    return tileLayer;
  }

  addBaseLayer(
    key,
    opts = {},
    tk = "a76b9ea6e49fb0eecdb1ed34d1e75930",
  ) {
    const urls = {
      OSM: "[https://tile.osm.org/{z}/{x}/{y}.png](https://tile.osm.org/{z}/{x}/{y}.png)",
      TDT_vec: `http://t{0-6}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=${tk}`,
      TDT_vec_anno: `http://t{0-6}.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=${tk}`,
      TDT_img: `http://t{0-6}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=${tk}`,
      TDT_img_anno: `http://t{0-6}.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=${tk}`
    };

    const zIndexMap = {
      OSM: 0,
      TDT_vec: 1,
      TDT_img: 2,
      TDT_vec_anno: 3,
      TDT_img_anno: 4
    };

    const url = urls[key];
    if (!url) {
      console.warn(`未识别的地图类型: ${key}`);
      return null;
    }

    const layer = new TileLayer({
      source: new XYZ({ url }),
      zIndex: opts.zIndex ?? zIndexMap[key] ?? 0,
      visible: opts.visible !== false
    });

    // 如果传了 key，直接加入管理器
    if (key) return this.addLayer(key, layer);
    return layer;
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
