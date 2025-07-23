export default class BaseMapService {
  constructor(target) {
    this.target = target;
  }

  initMap() {}
  setCenter(center, zoom) {}
  on(eventType, handler) {}
  off(eventType, handler) {}
  destroy() {}
}
