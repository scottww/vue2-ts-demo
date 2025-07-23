// map/core/MapLayerRegistry.js
export class MapLayerRegistry {
  constructor(map) {
    this.map = map;
    this.layerManagers = new Map(); // 用 name 做 key
  }

  /**
   * 注册一个图层
   * @param {string} name 图层唯一标识
   * @param {class} LayerClass 图层类
   * @param  {...any} args 其他构造参数
   * @returns 图层实例
   */
  register(name, LayerClass, ...args) {
    if (this.layerManagers.has(name)) {
      console.warn(`图层 "${name}" 已注册，跳过或请先 destroy 后再注册。`);
      return this.layerManagers.get(name);
    }

    const instance = new LayerClass(this.map, ...args);
    if (typeof instance.init === 'function') {
      instance.init();
    }

    this.layerManagers.set(name, instance);
    return instance;
  }

  /**
   * 获取图层实例
   */
  getLayer(name) {
    return this.layerManagers.get(name);
  }

  /**
   * 清理所有图层
   */
  destroy() {
    this.layerManagers.forEach((layer) => {
      if (typeof layer.destroy === 'function') {
        layer.destroy();
      }
    });
    this.layerManagers.clear();
  }
}
