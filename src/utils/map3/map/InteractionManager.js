// InteractionManager.js - 管理地图上的事件绑定（便于解绑）
export default class InteractionManager {
  constructor(map) {
    this.map = map;
    this.handlers = {}; // key -> { type, fn }
  }

  on(key, type, fn) {
    if (this.handlers[key]) this.off(key);
    this.handlers[key] = { type, fn };
    this.map.on(type, fn);
  }

  off(key) {
    const h = this.handlers[key];
    if (!h) return;
    this.map.un(h.type, h.fn);
    delete this.handlers[key];
  }

  clear() {
    Object.keys(this.handlers).forEach((k) => this.off(k));
  }
}
