import BaseMapService from "./BaseMapService";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";

import { Feature } from "ol";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";

export default class Map2DService extends BaseMapService {
  constructor(target, options = {}) {
    super(target);
    this.map = null;
    this.initMap(options);
  }

  initMap(options) {
    this.map = new Map({
      target: this.target,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://tile.osm.org/{z}/{x}/{y}.png"
          })
        })
      ],
      view: new View({
        center: options.center || [0, 0],
        zoom: options.zoom || 11,
        // projection: 'EPSG:3857',
        projection: "EPSG:4326"
      })
    });
  }

  setCenter(center, zoom) {
    this.map.getView().setCenter(center);
    if (zoom) this.map.getView().setZoom(zoom);
  }

  on(type, handler) {
    this.map.on(type, handler);

    // const eventMap = {
    //   LEFT_CLICK: "singleclick",
    //   DBL_CLICK: "dblclick",
    //   MOUSE_MOVE: "pointermove"
    // };

    // const realEvent = eventMap[type] || type;

    // this.map.on(realEvent, (evt) => {
    //   const coordinate = evt.coordinate;
    //   const lonLat = toLonLat(coordinate);
    //   handler({ coordinate, lonLat, originalEvent: evt });
    // });
  }

  off(type, handler) {
    this.map.un(type, handler);
  }

  destroy() {
    this.map.setTarget(null);
  }

  getMapInsatance() {
    return this.map;
  }

  //扩展
  addMarker(marker) {
    // this.map.addOverlay(marker);
  }
  //根据经纬度标记
  addMarkerByLngLat(lngLat, iconPath) {
    const point = new Feature(new Point(lngLat));
    point.setStyle(
      new Style({
        image: new Icon({ src: iconPath, anchor: [0.5, 1], scale: 1 })
      })
    );

    const vectorSource = new VectorSource({ features: [point] });
    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    this.map.addLayer(vectorLayer);
  }
}
