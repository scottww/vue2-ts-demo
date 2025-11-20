// HoverManager.js - hover 高亮管理（接受 vector layer 或 layerKey）
export default class HoverManager {
  /**
   * @param {ol.Map} map
   */
  constructor(map) {
    this.map = map;
    this.current = null;
    this.bound = false;
    this._handler = this._onPointerMove.bind(this);
  }

  bind(layer, getHoverStyle, getDefaultStyle) {
    // layer 可以是 VectorLayer 实例 或 layerKey（字符串）
    this.layer = layer;
    this.getHoverStyle = getHoverStyle;
    this.getDefaultStyle = getDefaultStyle;
    if (!this.bound) {
      this.map.on("pointermove", this._handler);
      this.bound = true;
    }
  }

  unbind() {
    if (this.bound) {
      this.map.un("pointermove", this._handler);
      this.bound = false;
    }
  }

  _onPointerMove(evt) {
    const pixel = evt.pixel;
    let hit = false;
    this.map.forEachFeatureAtPixel(pixel, (feature, layerFound) => {
      // 如果用户传的是 layerKey 字符串，要调用外部判断（此处假设 layer 是 layer 实例）
      if (this.layer && (this.layer === layerFound || this.layer === layerFound.get("key"))) {
        hit = true;
        if (this.current && this.current !== feature) {
          this.current.setStyle(this.getDefaultStyle(this.current));
        }
        feature.setStyle(this.getHoverStyle(feature));
        this.current = feature;
      }
    });

    if (!hit && this.current) {
      this.current.setStyle(this.getDefaultStyle(this.current));
      this.current = null;
    }

    this.map.getTargetElement().style.cursor = hit ? "pointer" : "";
  }
}
