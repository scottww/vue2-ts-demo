import BaseMapService from './BaseMapService';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

export default class Map3DService extends BaseMapService {
  constructor(target, options = {}) {
    super(target);
    this.viewer = null;
    this.initMap(options);
  }

  initMap(options) {
    this.viewer = new Cesium.Viewer(this.target, {
      terrainProvider: Cesium.createWorldTerrain(),
      timeline: false,
      animation: false,
      baseLayerPicker: false,
      homeButton: false,
      geocoder: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      ...options.viewerOptions,
    });

    if (options.center) {
      this.setCenter(options.center);
    }
  }

  setCenter(center, zoom) {
    const [lon, lat, height = 10000] = center;
    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
    });
  }

  on(type, handler) {
    const handlerInstance = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);
    handlerInstance.setInputAction(handler, Cesium.ScreenSpaceEventType[type]);
    this._eventHandler = handlerInstance;
  }

  off() {
    if (this._eventHandler) {
      this._eventHandler.destroy();
    }
  }

  destroy() {
    if (this.viewer) {
      this.viewer.destroy();
      this.viewer = null;
    }
  }
}
