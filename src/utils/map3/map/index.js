// index.js - MapApp 单例，供应用全局使用
import MapCore from "./MapCore";
import LayerManager from "./LayerManager";
import FeatureManager from "./FeatureManager";
import MarkerManager from "./MarkerManager";
import HoverManager from "./HoverManager";
import InteractionManager from "./InteractionManager";
import StyleFactory from "./StyleFactory";

class MapApp {
  init(target, options = {}) {
    // 如果已经初始化过，先销毁（可选）
    if (this.map) {
      try {
        this.map.setTarget(null);
      } catch (e) {}
    }

    this.core = new MapCore(target, options.core || {});
    this.map = this.core.getMap();
    this.layers = new LayerManager(this.map);
    this.features = new FeatureManager(this.layers);
    this.markers = new MarkerManager(this.layers);
    this.hover = new HoverManager(this.map);
    this.interaction = new InteractionManager(this.map);
    this.style = new StyleFactory();
  }

  getMap() {
    return this.map;
  }

  destroy() {
    if (this.map) {
      this.map.setTarget(null);
    }
    // 进一步可扩展：移除所有 handlers / layers
  }
}

export default new MapApp();
