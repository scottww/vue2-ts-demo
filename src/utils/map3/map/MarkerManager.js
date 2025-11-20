// MarkerManager.js - 管理 marker 图层和单个 marker 的创建与事件（集成 LayerManager）
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";

export default class MarkerManager {
  /**
   * @param {LayerManager} layerManager
   * @param {Object} options
   */
  constructor(layerManager, options = {}) {
    this.layerManager = layerManager;
    this.map = layerManager.map;
    this.markerLayers = {}; // key -> vectorLayer
    this.defaultOptions = options;
  }

  /**
   * 创建或获取 marker 图层（如果已存在则返回）
   * @param {string} layerKey
   */
  _ensureLayer(layerKey, zIndex = 10) {
    let layer = this.layerManager.getLayer(layerKey);
    if (!layer) {
      const src = new VectorSource();
      layer = this.layerManager.addVectorLayer(layerKey, src, { zIndex, visible: true });
      this.markerLayers[layerKey] = layer;
    }
    return layer;
  }

  /**
   * 添加单个 marker
   * @param {string} layerKey - marker 图层 key
   * @param {[number,number]} lngLat - 坐标（EPSG:4326）
   * @param {string} iconUrl
   * @param {Object} opts - { id, scale, anchor, data, onClick }
   */
  addMarker(layerKey, lngLat, iconUrl, opts = {}) {
    const { scale = 1, anchor = [0.5, 1], id = null, data = null, onClick = null } = opts;
    const layer = this._ensureLayer(layerKey, opts.zIndex || 10);
    const src = layer.getSource();

    const feat = new Feature({
      geometry: new Point(lngLat),
      id,
      data
    });

    feat.setStyle(new Style({ image: new Icon({ src: iconUrl, scale, anchor }) }));

    src.addFeature(feat);

    if (onClick) {
      // 绑定 map singleclick（简单实现：每次 click 都检查 feature）
      // 建议更复杂项目用 InteractionManager 单独管理
      const handler = (evt) => {
        this.map.forEachFeatureAtPixel(evt.pixel, (featureFound) => {
          if (featureFound === feat) {
            onClick(featureFound, evt.coordinate);
          }
        });
      };
      // 把 handler 暂存到 feature 上，方便移除（若需要）
      feat._clickHandler = handler;
      this.map.on("singleclick", handler);
    }

    return feat;
  }

  removeMarker(layerKey, feature) {
    const layer = this.layerManager.getLayer(layerKey);
    if (!layer) return;
    const src = layer.getSource();
    if (!src) return;
    if (feature._clickHandler) this.map.un("singleclick", feature._clickHandler);
    src.removeFeature(feature);
  }

  clearMarkers(layerKey) {
    const layer = this.layerManager.getLayer(layerKey);
    if (!layer) return;
    const src = layer.getSource();
    if (!src) return;
    // 移除可能注册的单击 handler（遍历 features）
    src.getFeatures().forEach((f) => {
      if (f._clickHandler) this.map.un("singleclick", f._clickHandler);
    });
    src.clear();
  }
}
